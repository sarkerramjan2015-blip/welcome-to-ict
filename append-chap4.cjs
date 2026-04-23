const fs = require('fs');

const generateQuiz = (topicName) => {
  return Array.from({ length: 10 }).map((_, i) => ({
    q: `${topicName} সম্পর্কিত গুরুত্বপূর্ণ মডেল প্রশ্ন ${i + 1} কোনটি?`,
    options: ["সঠিক উত্তর ক", "ভুল উত্তর খ", "ভুল উত্তর গ", "ভুল উত্তর ঘ"],
    correct: "সঠিক উত্তর ক"
  }));
};

const chap4Topics = [
  "ওয়েব ডিজাইন এর ধারণা",
  "ওয়েবসাইটের কাঠামো",
  "HTML এর মৌলিক বিষয়সমূহ",
  "HTML ট্যাগ ও সিনট্যাক্স",
  "টেক্সট ফরমেটিং",
  "হাইপারলিংক",
  "ইমেজ বা ছবি যুক্ত করা",
  "টেবিল তৈরি",
  "লিস্ট তৈরি",
  "ওয়েবপেইজ পাবলিশিং"
].map((title, idx) => ({
  id: `topic-4-${idx + 1}`,
  title,
  thumbnail: "https://images.unsplash.com/photo-1627398225081-24c89544eb1a?auto=format&fit=crop&w=800&q=80",
  board_notes: `${title} এর বিস্তারিত আলোচনা। ওয়েব ডিজাইন এবং HTML এর এই টপিকটি থেকে প্রতি বছর বোর্ডে প্রশ্ন আসে। মনোযোগ দিয়ে অধ্যয়ন করা প্রয়োজন।`,
  video_url: "https://www.youtube.com/embed/0G1XQ_l_u9Q",
  shortQuestions: [
    { q: `${title} বলতে কী বোঝায়?`, a: "এটি ওয়েব ডিজাইন ও HTML এর একটি মৌলিক ধারণা।", type: "জ্ঞানমূলক" },
    { q: "এর ব্যবহার কোথায় দেখা যায়?", a: "ওয়েবপেইজ তৈরি ও ডিজাইনে।", type: "অনুধাবনমূলক" }
  ],
  practiceMcqs: [
    {
      q: `${title} এর মূল কাজ কী?`,
      options: ["ওয়েবপেইজ তৈরি", "ডেটাবেজ তৈরি", "নেটওয়ার্কিং", "সবগুলো"],
      correct: "ওয়েবপেইজ তৈরি",
      explanation: "HTML এবং ওয়েব ডিজাইনের মূল কাজ হলো ওয়েবপেইজ তৈরি ও প্রদর্শন করা।"
    }
  ],
  cqs: [
    {
      stem: "শিক্ষক ক্লাসে এমন একটি কোড লিখলেন যা দিয়ে ইন্টারনেটে তথ্য প্রদর্শন করা যায়।",
      qC: "উদ্দীপকের কোডটি ব্যাখ্যা কর।",
      qD: "উক্ত কোড ব্যবহার করে কীভাবে একটি পূর্ণাঙ্গ ওয়েবসাইট তৈরি করা যায় তা বিশ্লেষণ কর।"
    }
  ],
  quizMcqs: generateQuiz(title)
}));

const fileContent = fs.readFileSync('./src/data/ict-syllabus.ts', 'utf-8');

// Replace the empty topics array for chap-4
const chap4Regex = /\{\s*id:\s*"chap-4",\s*title:\s*"অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি এবং HTML",\s*topics:\s*\[\]\s*\}/;

const replacement = `{
    id: "chap-4",
    title: "অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি এবং HTML",
    topics: ${JSON.stringify(chap4Topics, null, 6)}
  }`;

const newFileContent = fileContent.replace(chap4Regex, replacement);

fs.writeFileSync('./src/data/ict-syllabus.ts', newFileContent);
console.log("Successfully generated Chapter 4 data!");
