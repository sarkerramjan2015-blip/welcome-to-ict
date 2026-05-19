import type { Topic } from "../../../ict-syllabus.js";
import { generateQuiz } from "../../../utils.js";
import { meta } from "./meta.js";
import { notes } from "./notes.js";
import { practiceMCQs } from "./mcqs.js";
import { questions } from "./questions.js";
import { cqs } from "./cqs.js";

export const topic8: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    ...questions.knowledgeQuestions,
    ...questions.analyticalQuestions,
  ],
  practiceMcqs: practiceMCQs,
  cqs,
  quizMcqs: generateQuiz(practiceMCQs, 10),
};
