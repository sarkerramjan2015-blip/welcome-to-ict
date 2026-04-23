import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
    {
      q: "বহু বিকল্প থেকে একটি নির্দিষ্ট ব্লক এক্সিকিউট করতে কোনটি ব্যবহৃত হয়?",
      options: ["if", "switch", "for", "while"],
      correct: "switch",
      explanation:
        "অনেকগুলো Case বা বিকল্প থেকে নির্দিষ্ট একটি বেছে নিতে switch স্টেটমেন্ট ব্যবহৃত হয়।",
    },
    {
      q: "switch স্টেটমেন্টে প্রতিটি case এর শেষে কোনটি ব্যবহার করা উচিত?",
      options: ["continue", "break", "stop", "exit"],
      correct: "break",
      explanation:
        "break ব্যবহার না করলে পরবর্তী case গুলোও এক্সিকিউট হয়ে যায় (যাকে fall-through বলে)।",
    },
  ];
