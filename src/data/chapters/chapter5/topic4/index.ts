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
      q: "সি (C) ভাষাকে মিডল লেভেল ভাষা বলা হয় কেন?",
      a: "সি ভাষায় উচ্চ স্তরের ভাষার সুবিধার পাশাপাশি নিম্ন স্তরের ভাষার (হার্ডওয়্যার নিয়ন্ত্রণ) সুবিধাও পাওয়া যায়, তাই একে মিডল লেভেল ভাষা বলে।",
      type: "অনুধাবনমূলক",
    },
    {
      q: "main() ফাংশন কী?",
      a: "main() হলো সি প্রোগ্রামের প্রধান ফাংশন, যেখান থেকে প্রোগ্রামের এক্সিকিউশন শুরু হয়।",
      type: "জ্ঞানমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
