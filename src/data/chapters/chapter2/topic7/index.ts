import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic7: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "মোবাইল প্রজন্ম কী?",
      a: "মোবাইল যোগাযোগ প্রযুক্তির ক্রমান্বয়ে বিকাশ ও উন্নতির ধাপগুলোকে মোবাইল প্রজন্ম বা Mobile Generation বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "3G এবং 4G এর মধ্যে পার্থক্য কী?",
      a: "3G তে ভিডিও কলিং ও ব্রডব্যান্ড ইন্টারনেট সুবিধা যুক্ত হয়, অন্যদিকে 4G তে আল্ট্রা ব্রডব্যান্ড ইন্টারনেট এবং সম্পূর্ণ IP ভিত্তিক নেটওয়ার্ক ব্যবহৃত হয়।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
