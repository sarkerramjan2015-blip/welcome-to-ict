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
      q: "সিমপ্লেক্স মোড কী?",
      a: "যে ট্রান্সমিশন মোডে ডেটা কেবল একদিকে প্রবাহিত হতে পারে (যেমন: রেডিও, টেলিভিশন), তাকে সিমপ্লেক্স মোড বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "ব্রডকাস্ট মোড বলতে কী বোঝায়?",
      a: "নেটওয়ার্কের কোনো একটি নোড থেকে ডেটা পাঠালে যদি নেটওয়ার্কের অধীনস্থ সকল নোড সেই ডেটা গ্রহণ করে, তবে তাকে ব্রডকাস্ট মোড বলে।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
