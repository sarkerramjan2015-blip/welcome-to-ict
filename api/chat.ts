import type { Request, Response } from 'express';
import https from 'https';
import http from 'http';
import { URL } from 'url';

// Simple in-memory rate limiter for serverless (resets on cold start, but better than nothing)
const ipRequestCounts = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function checkRateLimit(req: Request): boolean {
  // Try to get IP from Vercel headers, fallback to socket
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
             req.socket.remoteAddress || 
             'unknown';
             
  const now = Date.now();
  const record = ipRequestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  record.count++;
  return true;
}

const PICKU_SYSTEM_PROMPT = `You are Picku, an expert ICT assistant for HSC students in Bangladesh. \
You provide clear, accurate, and helpful answers about Information and Communication Technology. \
Always reply in Bangla unless the user writes in English. \
Be encouraging, friendly, and explain concepts simply so students easily understand. \
Do not mention OpenAI, ChatGPT, or any other AI company or tool.`;

/** Make an HTTP/HTTPS request using Node's built-in modules (avoids undici timeout issues). */
function nodeRequest(
  urlStr: string,
  method: string,
  headers: Record<string, string>,
  body: string,
): Promise<{ status: number; data: string }> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlStr);
    const isHttps = parsed.protocol === 'https:';
    const lib = isHttps ? https : http;

    const options: https.RequestOptions = {
      hostname: parsed.hostname,
      port: parsed.port || (isHttps ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method,
      timeout: 90_000,
      headers: {
        ...headers,
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = lib.request(options, (res) => {
      let raw = '';
      res.on('data', (chunk: Buffer) => { raw += chunk.toString(); });
      res.on('end', () => resolve({ status: res.statusCode ?? 500, data: raw }));
    });

    req.on('timeout', () => { req.destroy(); reject(new Error('Request timed out after 90s')); });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

export default async function chatHandler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!checkRateLimit(req)) {
    return res.status(429).json({ 
      error: 'Too many requests. Please wait a minute before sending another message.' 
    });
  }

  const { messages } = req.body as {
    messages: { role: 'user' | 'assistant'; content: string }[];
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' });
  }

  // Prefer the plain OPENAI_API_KEY; fall back to VITE_ prefixed version
  const rawKey = (
    process.env.OPENAI_API_KEY ??
    process.env.VITE_OPENAI_API_KEY ??
    ''
  ).replace(/['"]/g, '').trim();

  if (!rawKey) {
    console.error('[chat] No API key found in environment');
    return res.status(500).json({ error: 'AI service is not configured.' });
  }

  // Use the configured API base URL (agentrouter or openai)
  const apiBase = (process.env.API_BASE_URL ?? process.env.VITE_API_BASE_URL ?? 'https://api.openai.com/v1').replace(/\/$/, '');
  const endpoint = `${apiBase}/chat/completions`;

  // Pick model — agentrouter supports gpt-4o-mini; use it for speed
  const model = 'gpt-4o-mini';

  const requestBody = JSON.stringify({
    model,
    messages: [
      { role: 'system', content: PICKU_SYSTEM_PROMPT },
      ...messages,
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  try {
    const { status, data } = await nodeRequest(
      endpoint,
      'POST',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${rawKey}`,
        Accept: 'application/json',
      },
      requestBody,
    );

    if (status >= 300) {
      let friendlyMsg = `AI service error (${status}).`;
      try {
        const errJson = JSON.parse(data) as { error?: { message?: string } };
        if (errJson?.error?.message) friendlyMsg = errJson.error.message;
      } catch { /* ignore */ }
      return res.status(502).json({ error: friendlyMsg });
    }

    const parsed = JSON.parse(data) as {
      choices: { message: { content: string } }[];
    };
    const reply =
      parsed.choices?.[0]?.message?.content?.trim() ??
      'দুঃখিত, কোনো উত্তর পাওয়া যায়নি।';

    return res.status(200).json({ reply });

  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({
      error: `সংযোগ ব্যর্থ হয়েছে: ${errMsg}`,
    });
  }
}
