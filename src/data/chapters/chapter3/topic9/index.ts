import { Topic } from "../../../ict-syllabus";
import { generateQuiz } from "../../../utils";
import { meta } from "./meta";
import { notes } from "./notes";
import { practiceMCQs } from "./mcqs";
import { cqs } from "./cqs";
import { questions } from "./questions";

export const topic9: Topic = {
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
