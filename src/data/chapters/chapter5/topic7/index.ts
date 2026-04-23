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
      q: "অপারেটর কী?",
      a: "প্রোগ্রামে গাণিতিক, যৌক্তিক বা তুলনামূলক কাজ করার জন্য যেসব বিশেষ গাণিতিক চিহ্ন ব্যবহৃত হয়, তাদের অপারেটর বলে।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "মডুলাস (%) অপারেটরের কাজ কী?",
      a: "মডুলাস (%) অপারেটর দুটি পূর্ণসংখ্যার ভাগের ভাগশেষ (Remainder) নির্ণয় করতে ব্যবহৃত হয়।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
