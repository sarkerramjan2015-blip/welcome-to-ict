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
      q: "ডেটাবেজ কী?",
      a: "ডেটাবেজ হলো পরস্পর সম্পর্কযুক্ত ডেটার একটি সুসংগঠিত সংগ্রহ, যা সহজে অ্যাক্সেস, পরিচালনা এবং আপডেট করা যায়।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "ডেটা ও ইনফরমেশনের মধ্যে পার্থক্য কী?",
      a: "ডেটা হলো তথ্যের কাঁচামাল বা ক্ষুদ্রতম একক, আর ইনফরমেশন হলো ডেটাকে প্রক্রিয়াজাত করার পর প্রাপ্ত অর্থপূর্ণ ফলাফল।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
