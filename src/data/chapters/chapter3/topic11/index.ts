import type { Topic } from "../../../ict-syllabus.js";
import { generateQuiz } from "../../../utils.js";
import { meta } from "./meta.js";
import { notes } from "./notes.js";
import { practiceMCQs } from "./mcqs.js";
import { cqs } from "./cqs.js";
import { questions } from "./questions.js";

export const topic11: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    ...questions.knowledgeQuestions,
    ...questions.analyticalQuestions
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 5)
};
