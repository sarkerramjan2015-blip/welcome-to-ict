import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic5: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "ইনফ্রারেড কী?",
      a: "ইনফ্রারেড হলো এক ধরনের ইলেকট্রোম্যাগনেটিক রেডিয়েশন, যা খুব কাছাকাছি দূরত্বের ডিভাইসের মধ্যে ডেটা আদান-প্রদানে ব্যবহৃত হয়।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "মাইক্রোওয়েভ কমিউনিকেশনে Line of Sight কেন প্রয়োজন?",
      a: "মাইক্রোওয়েভ সিগন্যাল বাঁকা পথে বা কোনো বাধা ভেদ করে চলতে পারে না, তাই প্রেরক ও প্রাপক অ্যান্টেনাকে সরাসরি দৃষ্টিরেখায় (Line of Sight) থাকতে হয়।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
