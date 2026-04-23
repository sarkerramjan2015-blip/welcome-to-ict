import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic4: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "ডেটাবেজ রিলেশনশিপ কী?",
      a: "ডেটাবেজের একটি টেবিলের রেকর্ডের সাথে অন্য এক বা একাধিক টেবিলের রেকর্ডের সম্পর্ককে ডেটাবেজ রিলেশনশিপ বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "One-to-Many রিলেশনশিপ বলতে কী বোঝায়?",
      a: "যখন প্রথম টেবিলের একটি রেকর্ডের সাথে দ্বিতীয় টেবিলের একাধিক রেকর্ডের সম্পর্ক থাকে, তখন তাকে One-to-Many রিলেশনশিপ বলে।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
