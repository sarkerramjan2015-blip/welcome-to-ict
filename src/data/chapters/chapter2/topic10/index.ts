import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic10: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "নেটওয়ার্ক টপোলজি কী?",
      a: "একটি কম্পিউটার নেটওয়ার্কে কম্পিউটার বা নোডগুলো একে অপরের সাথে ফিজিক্যালি বা লজিক্যালি যেভাবে সংযুক্ত থাকে, তার জ্যামিতিক বিন্যাসকে নেটওয়ার্ক টপোলজি বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "স্টার টপোলজির সুবিধা কী?",
      a: "স্টার টপোলজিতে কোনো একটি কম্পিউটার নষ্ট হলে পুরো নেটওয়ার্ক অচল হয় না এবং নতুন কম্পিউটার যুক্ত করা বা বাদ দেওয়া খুব সহজ।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
