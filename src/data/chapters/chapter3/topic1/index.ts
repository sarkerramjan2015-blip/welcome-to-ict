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
      q: "সংখ্যা পদ্ধতির ধারণা ও এর প্রকারভেদ বলতে কী বোঝায়?",
      a: "এটি ডিজিটাল লজিক ও সংখ্যা পদ্ধতির একটি মৌলিক ধারণা।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "এর ব্যবহার কোথায় দেখা যায়?",
      a: "কম্পিউটার আর্কিটেকচার ও ডিজিটাল সার্কিট ডিজাইনে।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
