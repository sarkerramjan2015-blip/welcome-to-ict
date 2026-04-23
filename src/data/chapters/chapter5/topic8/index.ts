import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic8: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "কন্ট্রোল স্টেটমেন্ট কী?",
      a: "যে স্টেটমেন্টের সাহায্যে প্রোগ্রামের স্বাভাবিক প্রবাহকে পরিবর্তন বা নিয়ন্ত্রণ করা যায়, তাকে কন্ট্রোল স্টেটমেন্ট বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "if-else স্টেটমেন্ট কখন ব্যবহৃত হয়?",
      a: "যখন একটি শর্তের ওপর ভিত্তি করে দুটি ভিন্ন কাজের মধ্যে যেকোনো একটি কাজ সম্পন্ন করতে হয়, তখন if-else স্টেটমেন্ট ব্যবহৃত হয়।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
