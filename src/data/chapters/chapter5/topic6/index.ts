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
      q: "scanf() ফাংশনের কাজ কী?",
      a: "scanf() হলো একটি লাইব্রেরি ফাংশন যা কীবোর্ড থেকে ইনপুট নেওয়ার জন্য ব্যবহৃত হয়।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "scanf() এ '&' (অ্যামপারস্যান্ড) চিহ্ন কেন ব্যবহার করা হয়?",
      a: "অ্যামপারস্যান্ড (&) চিহ্নটি চলকের মেমরি অ্যাড্রেস বা ঠিকানা নির্দেশ করে, যেখানে ইনপুট করা মানটি সংরক্ষিত হবে।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
