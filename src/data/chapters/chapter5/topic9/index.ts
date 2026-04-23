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
      q: "লুপ (Loop) কী?",
      a: "প্রোগ্রামের কোনো নির্দিষ্ট অংশ বা স্টেটমেন্টকে শর্ত সাপেক্ষে বারবার এক্সিকিউট করার প্রক্রিয়াকে লুপ বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "while এবং do-while লুপের মধ্যে প্রধান পার্থক্য কী?",
      a: "while লুপে শর্ত আগে চেক করা হয়, কিন্তু do-while লুপে কাজ অন্তত একবার সম্পন্ন হওয়ার পর শর্ত চেক করা হয়।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
