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
      q: "অ্যাসিনক্রোনাস ট্রান্সমিশন কী?",
      a: "যে ডেটা ট্রান্সমিশন মেথডে প্রেরক থেকে প্রাপকে ডেটা ক্যারেক্টার বাই ক্যারেক্টার পাঠানো হয়, তাকে অ্যাসিনক্রোনাস ট্রান্সমিশন বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "সিনক্রোনাস ট্রান্সমিশনে ডেটা কীভাবে পাঠানো হয়?",
      a: "সিনক্রোনাস ট্রান্সমিশনে ডেটা ব্লক বা প্যাকেট আকারে পাঠানো হয়, যেখানে প্রতিটি ব্লকে ৮০ থেকে ১৩২টি ক্যারেক্টার থাকে।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
