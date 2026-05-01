import express from "express";
import { createServer as createViteServer } from "vite";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { createPayment, executePayment } from "./src/services/bkash";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const ai = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || "");

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // ==========================================
  // API ROUTES (Mimicking Server Actions)
  // ==========================================
  
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Get all Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await prisma.category.findMany({
        include: { versions: true }
      });
      if (categories.length === 0) throw new Error("Empty DB");
      res.json(categories);
    } catch (error) {
      console.error("Database connection error or empty, using fallback data.");
      // Fallback mock data if DB is not connected yet
      res.json([
        {
          id: "mock-cat-1",
          name: "HSC ICT",
          slug: "hsc-ict",
          isActive: true,
          versions: [
            {
              id: "mock-ver-1",
              name: "Bangla Version",
              slug: "hsc-ict-bangla",
              isActive: true
            }
          ]
        }
      ]);
    }
  });

  // Get Chapters by Version
  app.get("/api/versions/:versionId/chapters", async (req, res) => {
    try {
      const chapters = await prisma.chapter.findMany({
        where: { versionId: req.params.versionId },
        orderBy: { order: 'asc' }
      });
      if (chapters.length === 0) throw new Error("Empty DB");
      res.json(chapters);
    } catch (error) {
      res.json([
        {
          id: "mock-chap-1",
          title: "Information and Communication Technology: World and Bangladesh Perspective",
          slug: "hsc-ict-chap-1",
          order: 1
        },
        {
          id: "mock-chap-2",
          title: "Communication Systems and Networking",
          slug: "hsc-ict-chap-2",
          order: 2
        },
        {
          id: "mock-chap-3",
          title: "Number Systems and Digital Devices",
          slug: "hsc-ict-chap-3",
          order: 3
        }
      ]);
    }
  });

  // Get Topics by Chapter
  app.get("/api/chapters/:chapterId/topics", async (req, res) => {
    try {
      const topics = await prisma.topic.findMany({
        where: { chapterId: req.params.chapterId },
        orderBy: { order: 'asc' }
      });
      if (topics.length === 0) throw new Error("Empty DB");
      
      const parsedTopics = topics.map(t => ({
        ...t,
        visualizations: JSON.parse(t.visualizations)
      }));
      res.json(parsedTopics);
    } catch (error) {
      res.json([
        {
          id: "mock-topic-1",
          title: "Global Village Concept and Elements",
          slug: "global-village",
          order: 1
        },
        {
          id: "mock-topic-2",
          title: "Virtual Reality and its Applications",
          slug: "virtual-reality",
          order: 2
        },
        {
          id: "mock-topic-3",
          title: "Artificial Intelligence & Robotics",
          slug: "ai-robotics",
          order: 3
        }
      ]);
    }
  });

  // Get MCQs by Topic (Randomized, max 10)
  app.get("/api/topics/:topicId/mcqs", async (req, res) => {
    try {
      // In a real scenario, we'd fetch all and shuffle, or use raw SQL for random ordering
      const mcqs = await prisma.mCQ.findMany({
        where: { topicId: req.params.topicId },
      });
      if (mcqs.length === 0) throw new Error("Empty DB");
      
      // Shuffle and take 10
      const shuffled = mcqs.sort(() => 0.5 - Math.random()).slice(0, 10).map(m => ({
        ...m,
        options: JSON.parse(m.options)
      }));
      res.json(shuffled);
    } catch (error) {
      // Fallback mock data
      res.json([
        {
          id: "mock-mcq-1",
          question: "What is the primary concept of a Global Village?",
          options: ["Isolated communities", "Interconnected world via ICT", "Traditional farming", "Space exploration"],
          correctAnswer: "Interconnected world via ICT",
          explanation: "Global village describes the phenomenon of the entire world becoming more interconnected as the result of the propagation of media technologies."
        },
        {
          id: "mock-mcq-2",
          question: "Which technology is essential for Virtual Reality?",
          options: ["Typewriter", "Head-Mounted Display (HMD)", "Radio", "Telegraph"],
          correctAnswer: "Head-Mounted Display (HMD)",
          explanation: "An HMD is a display device, worn on the head or as part of a helmet, that has a small display optic in front of one or each eye."
        },
        {
          id: "mock-mcq-3",
          question: "What is the core component of Artificial Intelligence?",
          options: ["Machine Learning", "HTML", "CSS", "Photoshop"],
          correctAnswer: "Machine Learning",
          explanation: "Machine learning is a subset of AI that provides systems the ability to automatically learn and improve from experience without being explicitly programmed."
        }
      ]);
    }
  });

  // ==========================================
  // AUTH ROUTES & OAUTH
  // ==========================================
  
  // Real Google OAuth Flow Request
  app.get("/api/auth/google/url", (req, res) => {
    const originalHost = req.headers['x-forwarded-host'] || req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const redirectUri = `${protocol}://${originalHost}/auth/callback`;

    // Ensure they have configured Google
    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({ error: "Missing GOOGLE_CLIENT_ID" });
    }

    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent'
    });

    res.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
  });

  // Google OAuth Callback Path
  app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
    const { code } = req.query;
    if (!code) return res.send("No code provided.");

    try {
      const originalHost = req.headers['x-forwarded-host'] || req.headers.host;
      const protocol = req.headers['x-forwarded-proto'] || 'http';
      const redirectUri = `${protocol}://${originalHost}/auth/callback`;

      // 1. Exchange for token
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID || '',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
          code: String(code),
          grant_type: "authorization_code",
          redirect_uri: redirectUri
        })
      });

      const tokenData = await tokenResponse.json();
      if (!tokenData.access_token) throw new Error("Failed to get token");

      // 2. Fetch User Profile
      const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
      });
      const profileInfo = await profileResponse.json();

      // 3. Upsert User in Prisma
      let user = await prisma.user.findUnique({ where: { email: profileInfo.email } });
      if (!user) {
        user = await prisma.user.create({
          data: { 
            email: profileInfo.email, 
            name: profileInfo.name,
            profileImage: profileInfo.picture
          }
        });
      }

      // We will send the user data inside the message so the frontend can log them in
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ 
                  type: 'OAUTH_AUTH_SUCCESS', 
                  user: ${JSON.stringify(user)} 
                }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (err) {
      console.error(err);
      res.status(500).send("OAuth callback failed. Check console.");
    }
  });

  // Simulated Login Fallback (For when Google credentials are not set up)
  app.post("/api/auth/login", async (req, res) => {
    const { email, name } = req.body;
    try {
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({
          data: { email, name: name || "Student" }
        });
      }
      res.json({ token: `mock-token-${user.id}`, user });
    } catch (error) {
      res.status(500).json({ error: "Auth failed" });
    }
  });

  // ==========================================
  // PROFILE / USER ROUTES
  // ==========================================
  app.put("/api/user/profile", async (req, res) => {
    const { userId, name, phone, institution, district, upazila, bio, profileImage } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, phone, institution, district, upazila, bio, profileImage }
      });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // ==========================================
  // TASK ROUTES
  // ==========================================
  app.get("/api/tasks", async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "Missing userId" });
    try {
      const tasks = await prisma.task.findMany({
        where: { userId: String(userId) },
        orderBy: { createdAt: 'desc' }
      });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    const { userId, title, priority } = req.body;
    if (!userId || !title) return res.status(400).json({ error: "Missing required fields" });
    try {
      const task = await prisma.task.create({
        data: { userId, title, priority: priority || 'Medium' }
      });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to create task" });
    }
  });

  app.put("/api/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { title, priority, completed } = req.body;
    try {
      const task = await prisma.task.update({
        where: { id },
        data: { title, priority, completed }
      });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.task.delete({ where: { id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  });

  // ==========================================
  // CHALLENGE ROUTES
  // ==========================================

  const parseChallenge = (challenge: any) => ({
    ...challenge,
    syllabus: typeof challenge.syllabus === "string" ? JSON.parse(challenge.syllabus) : challenge.syllabus
  });

  app.get("/api/challenges/upcoming", async (req, res) => {
    try {
      const challenges = await prisma.challenge.findMany({
        where: {
          status: "LIVE",
          startsAt: { gte: new Date() }
        },
        orderBy: { startsAt: 'asc' }
      });

      res.json(challenges.map(parseChallenge));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch upcoming challenges" });
    }
  });

  app.get("/api/challenges/current", async (req, res) => {
    try {
      let challenge = await prisma.challenge.findFirst({
        where: {
          status: "LIVE",
          startsAt: { gte: new Date() }
        },
        orderBy: { startsAt: 'asc' }
      });

      if (!challenge) {
        const latestChallenge = await prisma.challenge.findFirst({
          where: { status: "LIVE" },
          orderBy: { startsAt: 'desc' }
        });

        return res.json(latestChallenge ? parseChallenge(latestChallenge) : null);
      }


      res.json(parseChallenge(challenge));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch current challenge" });
    }
  });

  app.post("/api/challenges/:id/enroll", async (req, res) => {
    const { userId } = req.body;
    try {
      const enrollment = await prisma.enrollment.upsert({
        where: { userId_challengeId: { userId, challengeId: req.params.id } },
        update: {},
        create: { userId, challengeId: req.params.id, paymentStatus: "PENDING" }
      });
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ error: "Enrollment failed" });
    }
  });

  app.post("/api/challenges/:id/pay/bkash/create", async (req, res) => {
    const { userId } = req.body;
    try {
      // Create pending enrollment
      await prisma.enrollment.upsert({
        where: { userId_challengeId: { userId, challengeId: req.params.id } },
        update: {},
        create: { userId, challengeId: req.params.id, paymentStatus: "PENDING" }
      });

      const invoiceId = `INV-${Date.now()}`;
      const bkashResponse = await createPayment(20, invoiceId);

      // Return the bkashURL to the client
      if (bkashResponse && bkashResponse.bkashURL) {
        // You could also store paymentID temporarily in DB to verify later
        res.json({ bkashURL: bkashResponse.bkashURL });
      } else {
        throw new Error(bkashResponse.statusMessage || "Failed to create payment");
      }
    } catch (error) {
      console.error(error);
      // Mock flow if dummy keys fail during development
      console.log("Mocking bKash Create Payment flow due to error");
      res.json({ bkashURL: `/api/challenges/${req.params.id}/pay/bkash/callback?paymentID=mock-${Date.now()}&status=success&userId=${userId}` });
    }
  });

  app.get("/api/challenges/:id/pay/bkash/callback", async (req, res) => {
    const { paymentID, status, userId } = req.query;

    try {
      if (status === 'success' && paymentID) {
        let isSuccess = false;
        
        // If it's a mock payment ID from our fallback
        if ((paymentID as string).startsWith('mock-')) {
          isSuccess = true;
        } else {
          // Execute actual payment
          const execResponse = await executePayment(paymentID as string);
          if (execResponse && execResponse.statusCode === '0000') {
            isSuccess = true;
          }
        }

        if (isSuccess && userId) {
          await prisma.enrollment.update({
            where: { userId_challengeId: { userId: String(userId), challengeId: req.params.id } },
            data: { paymentStatus: "PAID" }
          });
        }
      }
      
      // Redirect back to frontend
      res.redirect("/mega-challenge");
    } catch (error) {
      console.error(error);
      res.redirect("/mega-challenge?payment=failed");
    }
  });

  app.get("/api/challenges/:id/questions", async (req, res) => {
    const { userId } = req.query;
    try {
      const enrollment = await prisma.enrollment.findUnique({
        where: { userId_challengeId: { userId: String(userId), challengeId: req.params.id } }
      });
      if (!enrollment || enrollment.paymentStatus !== "PAID") {
        return res.status(403).json({ error: "Not enrolled or not paid" });
      }
      const questions = await prisma.challengeQuestion.findMany({
        where: { challengeId: req.params.id }
      });
      const parsed = questions.map(q => ({ ...q, options: JSON.parse(q.options) }));
      res.json(parsed);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.post("/api/challenges/:id/submit", async (req, res) => {
    const { userId, answers } = req.body;
    try {
      // Server-Side Anti-Cheat: Validate answers directly against DB
      const questions = await prisma.challengeQuestion.findMany({
        where: { challengeId: req.params.id }
      });

      let calculatedScore = 0;
      for (const q of questions) {
        if (answers[q.id] === q.correctAnswer) {
          calculatedScore++;
        }
      }

      const enrollment = await prisma.enrollment.update({
        where: { userId_challengeId: { userId, challengeId: req.params.id } },
        data: { score: calculatedScore }
      });
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit score securely" });
    }
  });

  app.get("/api/dashboard", async (req, res) => {
    const { userId } = req.query;
    try {
      const enrollments = await prisma.enrollment.findMany({
        where: { userId: String(userId) },
        include: { challenge: true },
        orderBy: { createdAt: 'desc' }
      });
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard" });
    }
  });

  // ==========================================
  // ADMIN ROUTES
  // ==========================================
  
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    // Hardcoded for Phase 7 demonstration. In production, compare with hashed DB password.
    if (email === "admin@ict.com" && password === "admin123") {
      res.json({ token: "mock-jwt-token-789" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.get("/api/admin/stats", async (req, res) => {
    try {
      const chapters = await prisma.chapter.count();
      const topics = await prisma.topic.count();
      const mcqs = await prisma.mCQ.count();
      res.json({ chapters, topics, mcqs });
    } catch (error) {
      res.json({ chapters: 6, topics: 24, mcqs: 350 }); // Fallback mock stats
    }
  });

  app.post("/api/admin/challenges/generate", async (req, res) => {
    try {
      let generatedQuestions: any[] = [];
      
      try {
        const prompt = `Generate 30 high-quality multiple-choice questions (MCQs) in Bengali for the HSC ICT syllabus. 
        Format the output strictly as a JSON array of objects, where each object has:
        - "question" (string)
        - "options" (array of 4 strings)
        - "correctAnswer" (string, must exactly match one of the options)
        - "explanation" (string)
        Do not include markdown blocks or any other text, just the JSON array.`;

        let text = "";
        const openAiKey = process.env.VITE_OPENAI_API_KEY;
        const apiBaseUrl = process.env.VITE_API_BASE_URL || "https://api.openai.com/v1";

        if (openAiKey) {
          console.log("Generating challenge using OpenAI...");
          const response = await fetch(`${apiBaseUrl}/chat/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${openAiKey}`
            },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: [
                { role: "system", content: "You are an expert ICT teacher." },
                { role: "user", content: prompt }
              ],
              temperature: 0.7
            })
          });

          if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.statusText}`);
          }

          const data = await response.json();
          text = data.choices[0].message.content || "[]";
        } else {
          console.log("Generating challenge using Gemini...");
          const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
          const result = await model.generateContent(prompt);
          text = result.response.text() || "[]";
        }

        // Clean up markdown if present
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        generatedQuestions = JSON.parse(text);
        
        if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
          throw new Error("Invalid AI response format");
        }
      } catch (aiError) {
        console.log("Using fallback dummy data for challenge generation (AI generation skipped).");
        // Fallback to 30 dummy questions
        generatedQuestions = Array.from({ length: 30 }).map((_, i) => ({
          question: `(Dummy) HSC ICT Model Question ${i + 1}: নিচের কোনটি ডেটা কমিউনিকেশনের মাধ্যম?`,
          options: ["ফাইবার অপটিক ক্যাবল", "কিবোর্ড", "মাউস", "মনিটর"],
          correctAnswer: "ফাইবার অপটিক ক্যাবল",
          explanation: "ফাইবার অপটিক ক্যাবল হলো একটি তার মাধ্যম যা ডেটা কমিউনিকেশনে ব্যবহৃত হয়।"
        }));
      }

      // Create a new challenge
      const challenge = await prisma.challenge.create({
        data: {
          month: new Date().toLocaleString('default', { month: 'long' }),
          year: new Date().getFullYear(),
          status: "LIVE", // Auto-live for demo purposes
          fee: 20.0
        }
      });

      // Insert questions
      for (const q of generatedQuestions) {
        await prisma.challengeQuestion.create({
          data: {
            question: q.question,
            options: JSON.stringify(q.options),
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            challengeId: challenge.id
          }
        });
      }

      res.json({ success: true, challenge });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate challenge" });
    }
  });

  app.get("/sitemap.xml", async (req, res) => {
    try {
      const topics = await prisma.topic.findMany({
        select: { id: true, updatedAt: true }
      });

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      const staticRoutes = [
        { path: '', freq: 'daily', priority: '1.0' },
        { path: 'syllabus', freq: 'weekly', priority: '0.9' },
        { path: 'suggestions', freq: 'weekly', priority: '0.8' },
      ];

      for (const route of staticRoutes) {
        xml += `  <url>\n`;
        xml += `    <loc>https://icttoppers.com/${route.path}</loc>\n`;
        xml += `    <changefreq>${route.freq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += `  </url>\n`;
      }

      for (const topic of topics) {
        xml += `  <url>\n`;
        xml += `    <loc>https://icttoppers.com/topics/${topic.id}</loc>\n`;
        xml += `    <lastmod>${topic.updatedAt.toISOString().split('T')[0]}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }

      xml += `</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error) {
      console.error("Sitemap generation error:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
