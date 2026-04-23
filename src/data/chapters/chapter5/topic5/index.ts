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
      q: "চলক (Variable) কী?",
      a: "চলক হলো কম্পিউটারের মেমরির একটি নির্দিষ্ট স্থানের নাম, যেখানে ডেটা সংরক্ষণ করা হয় এবং যার মান পরিবর্তনশীল।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "int এবং float ডেটা টাইপের মধ্যে পার্থক্য কী?",
      a: "int ব্যবহৃত হয় পূর্ণসংখ্যা (যেমন: ৫, -১০) সংরক্ষণের জন্য, আর float ব্যবহৃত হয় ভগ্নাংশ বা দশমিক যুক্ত সংখ্যা (যেমন: ৩.১৪) সংরক্ষণের জন্য।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
