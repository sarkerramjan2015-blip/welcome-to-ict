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
      q: "অ্যারে (Array) কী?",
      a: "অ্যারে হলো একই ডেটা টাইপের একাধিক ভ্যালু বা ডেটার একটি সংগ্রহ, যা মেমরিতে ধারাবাহিকভাবে সংরক্ষিত থাকে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "ফাংশন ব্যবহারের প্রধান সুবিধা কী?",
      a: "ফাংশন ব্যবহারের প্রধান সুবিধা হলো কোডের পুনঃব্যবহারযোগ্যতা (Reusability) বৃদ্ধি পায় এবং বড় প্রোগ্রামকে ছোট ছোট অংশে ভাগ করে সহজে সমাধান করা যায়।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
