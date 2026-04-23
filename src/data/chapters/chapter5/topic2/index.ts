import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic2: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "অনুবাদক প্রোগ্রাম কী?",
      a: "যে প্রোগ্রাম উৎস প্রোগ্রামকে (মানুষের লেখা কোড) মেশিন ভাষায় রূপান্তর করে, তাকে অনুবাদক প্রোগ্রাম বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "কম্পাইলার ও ইন্টারপ্রেটারের মধ্যে পার্থক্য কী?",
      a: "কম্পাইলার সম্পূর্ণ প্রোগ্রাম একসাথে অনুবাদ করে, কিন্তু ইন্টারপ্রেটার লাইন বাই লাইন অনুবাদ করে।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
