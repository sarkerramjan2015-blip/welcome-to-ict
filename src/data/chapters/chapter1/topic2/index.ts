import { meta } from './meta';
import { notes } from './notes';
import { practiceMcqs } from './mcqs';
import { questions } from './questions';
import { cqs } from './cqs';
import { Topic } from '../../../ict-syllabus';

export const topic2: Topic = {
  ...meta,
  board_notes: notes,
  practiceMcqs: practiceMcqs,
  quizMcqs: practiceMcqs.slice(0, 10),
  shortQuestions: [
    ...questions.knowledgeQuestions,
    ...questions.analyticalQuestions
  ],
  cqs: cqs,
};
