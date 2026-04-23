import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic6: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "ওয়াই-ফাই (Wi-Fi) কী?",
      a: "ওয়াই-ফাই হলো একটি জনপ্রিয় তারবিহীন নেটওয়ার্কিং প্রযুক্তি, যা রেডিও ওয়েভ ব্যবহার করে কাছাকাছি দূরত্বের ডিভাইসগুলোকে ইন্টারনেটের সাথে যুক্ত করে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "ব্লুটুথ ও ওয়াই-ফাই এর মধ্যে পার্থক্য কী?",
      a: "ব্লুটুথ স্বল্প দূরত্বে (PAN) ডেটা আদান-প্রদানে ব্যবহৃত হয়, অন্যদিকে ওয়াই-ফাই তুলনামূলক বেশি দূরত্বে (LAN) উচ্চ গতির ইন্টারনেট সংযোগ প্রদানে ব্যবহৃত হয়।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
