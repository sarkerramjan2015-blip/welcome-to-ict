import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";

export const topic4: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    {
      q: "ফাইবার অপটিক ক্যাবল কী?",
      a: "ফাইবার অপটিক ক্যাবল হলো অত্যন্ত সরু, নমনীয় কাঁচ বা প্লাস্টিকের তন্তু, যার মধ্য দিয়ে আলোর বেগে ডেটা ট্রান্সমিট করা যায়।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "টুইস্টেড পেয়ার ক্যাবলে তারগুলো পেঁচানো থাকে কেন?",
      a: "ইলেক্ট্রোম্যাগনেটিক ইন্টারফারেন্স (EMI) এবং ক্রসটক কমানোর জন্য টুইস্টেড পেয়ার ক্যাবলে তারগুলো একে অপরের সাথে পেঁচানো থাকে।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
