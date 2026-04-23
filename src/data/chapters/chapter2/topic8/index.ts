import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic8: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "LAN কী?",
      a: "LAN (Local Area Network) হলো একটি নির্দিষ্ট ছোট এলাকা, যেমন একটি বিল্ডিং বা ক্যাম্পাসের মধ্যে অবস্থিত কম্পিউটারগুলোর নেটওয়ার্ক।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "MAN এবং WAN এর মধ্যে পার্থক্য কী?",
      a: "MAN একটি শহরের মধ্যে সীমাবদ্ধ থাকে, অন্যদিকে WAN পুরো দেশ বা বিশ্বব্যাপী বিস্তৃত থাকে।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
