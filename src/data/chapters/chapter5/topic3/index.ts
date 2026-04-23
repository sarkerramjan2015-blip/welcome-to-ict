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
      q: "অ্যালগরিদম কী?",
      a: "কোনো একটি নির্দিষ্ট সমস্যা সমাধানের জন্য সসীম সংখ্যক ধাপে যুক্তিসম্মতভাবে সমাধান করার পদ্ধতিকে অ্যালগরিদম বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "ফ্লোচার্টে রম্বস চিহ্ন কী কাজে ব্যবহৃত হয়?",
      a: "ফ্লোচার্টে রম্বস চিহ্নটি সিদ্ধান্ত গ্রহণের (Decision making) কাজে ব্যবহৃত হয়।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
