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
      q: "DBMS কী?",
      a: "DBMS (Database Management System) হলো এমন একটি সফটওয়্যার যা ব্যবহারকারীকে ডেটাবেজ তৈরি, পরিচালনা এবং নিয়ন্ত্রণ করার সুবিধা দেয়।",
      type: "জ্ঞানমূলক",
    },
    {
      q: "RDBMS বলতে কী বোঝায়?",
      a: "RDBMS (Relational Database Management System) হলো এমন একটি DBMS যেখানে ডেটাগুলো পরস্পর সম্পর্কযুক্ত একাধিক টেবিলে সংরক্ষিত থাকে।",
      type: "অনুধাবনমূলক",
    },
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 2)
};
