import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic1: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "প্রোগ্রাম কী?",
      a: "কম্পিউটারের মাধ্যমে কোনো সমস্যা সমাধানের জন্য ধারাবাহিকভাবে সাজানো নির্দেশমালার সমষ্টিকে প্রোগ্রাম বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "মেশিন ভাষা বলতে কী বোঝায়?",
      a: "যে ভাষায় শুধুমাত্র ০ এবং ১ ব্যবহার করে নির্দেশ দেওয়া হয় এবং যা কম্পিউটার সরাসরি বুঝতে পারে, তাকে মেশিন ভাষা বলে।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
