import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic11: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "ক্লাউড কম্পিউটিং কী?",
      a: "ইন্টারনেটভিত্তিক কম্পিউটিং সেবা, যেখানে ব্যবহারকারী তার প্রয়োজন অনুযায়ী স্টোরেজ, প্রসেসিং পাওয়ার বা সফটওয়্যার ভাড়া নিতে পারে, তাকে ক্লাউড কম্পিউটিং বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "SaaS বলতে কী বোঝায়?",
      a: "SaaS (Software as a Service) হলো ক্লাউড কম্পিউটিংয়ের এমন একটি মডেল যেখানে ব্যবহারকারী ইন্টারনেটের মাধ্যমে ক্লাউড প্রোভাইডারের সফটওয়্যার ব্যবহার করতে পারে (যেমন: Google Docs)।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
