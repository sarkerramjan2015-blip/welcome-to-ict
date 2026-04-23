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
      q: "লিস্ট তৈরি বলতে কী বোঝায়?",
      a: "এটি ওয়েব ডিজাইন ও HTML এর একটি মৌলিক ধারণা।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "এর ব্যবহার কোথায় দেখা যায়?",
      a: "ওয়েবপেইজ তৈরি ও ডিজাইনে।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
