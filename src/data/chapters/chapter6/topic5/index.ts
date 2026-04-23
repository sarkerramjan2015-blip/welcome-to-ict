import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic5: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "SQL কী?",
      a: "SQL (Structured Query Language) হলো রিলেশনাল ডেটাবেজ পরিচালনা করার জন্য ব্যবহৃত একটি স্ট্যান্ডার্ড প্রোগ্রামিং ভাষা।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "DDL এবং DML এর মধ্যে পার্থক্য কী?",
      a: "DDL (যেমন CREATE) ডেটাবেজের স্ট্রাকচার বা টেবিল তৈরি করতে ব্যবহৃত হয়, আর DML (যেমন INSERT) টেবিলের ভেতরের ডেটা নিয়ে কাজ করতে ব্যবহৃত হয়।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
