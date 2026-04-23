import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic3: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "প্রাইমারি কি (Primary Key) কী?",
      a: "যে ফিল্ডের মান দিয়ে ডেটাবেজ টেবিলের প্রতিটি রেকর্ডকে অদ্বিতীয়ভাবে (Uniquely) শনাক্ত করা যায়, তাকে প্রাইমারি কি বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "ফরেন কি (Foreign Key) কেন ব্যবহার করা হয়?",
      a: "দুটি টেবিলের মধ্যে সম্পর্ক (Relation) স্থাপন করার জন্য একটি টেবিলের প্রাইমারি কি-কে অন্য টেবিলে ফরেন কি হিসেবে ব্যবহার করা হয়।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
