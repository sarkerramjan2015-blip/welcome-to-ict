import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic9: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "রাউটার কী?",
      a: "রাউটার হলো একটি বুদ্ধিমান নেটওয়ার্ক ডিভাইস যা ডেটা প্যাকেটকে গন্তব্যে পৌঁছানোর জন্য সবচেয়ে সহজ ও দ্রুততম পথ নির্ধারণ করে দেয়।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "হাব এবং সুইচের মধ্যে পার্থক্য কী?",
      a: "হাব ডেটা গ্রহণ করে নেটওয়ার্কের সকল পোর্টে ব্রডকাস্ট করে, কিন্তু সুইচ ম্যাক অ্যাড্রেস ব্যবহার করে কেবল নির্দিষ্ট গন্তব্য পোর্টে ডেটা পাঠায়।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
