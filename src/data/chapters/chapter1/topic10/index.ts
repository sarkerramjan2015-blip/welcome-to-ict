import { Topic } from "../../../ict-syllabus";
// @ts-ignore
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { mcqs } from "./mcqs";
import { questions } from "./questions";
import { cqs } from "./cqs";

export const topic10: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [...questions.knowledgeQuestions, ...questions.analyticalQuestions],
  practiceMcqs: mcqs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(mcqs, 2)
};
