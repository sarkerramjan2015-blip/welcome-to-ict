import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { questions } from "./questions";
import { cqs } from "./cqs";

export const topic2: Topic = {
  ...meta,
  board_notes: notes,
  shortQuestions: [
    ...questions.knowledgeQuestions,
    ...questions.analyticalQuestions,
  ],
  practiceMcqs: practiceMCQs,
  cqs: cqs,
  // @ts-ignore
  quizMcqs: generateQuiz(practiceMCQs, 10)
};
