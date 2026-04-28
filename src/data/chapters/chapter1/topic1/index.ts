import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMcqs } from "./mcqs";
import { questions } from "./questions";
import { cqs } from "./cqs";

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
