import type { Topic } from "../../../ict-syllabus.js";
// @ts-ignore
import { generateQuiz } from "../../../utils.js";
import { meta } from "./meta.js";
import { notes } from "./notes.js";
import { mcqs } from "./mcqs.js";
import { questions } from "./questions.js";
import { cqs } from "./cqs.js";

export const topic1: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [...questions.knowledgeQuestions, ...questions.analyticalQuestions],
  practiceMcqs: mcqs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(mcqs, 2)
};
