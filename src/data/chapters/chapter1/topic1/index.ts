import type { Topic } from "../../../ict-syllabus.js";
import { generateQuiz } from "../../../utils.js";
import { meta } from "./meta.js";
import { notes } from "./notes.js";
import { practiceMcqs } from "./mcqs.js";
import { questions } from "./questions.js";
import { cqs } from "./cqs.js";

export const topic1: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    ...questions.knowledgeQuestions,
    ...questions.analyticalQuestions
  ],
  practiceMcqs: practiceMcqs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMcqs, 10)
};
