import { meta } from './meta.js';
import { notes } from './notes.js';
import { practiceMcqs } from './mcqs.js';
import { questions } from './questions.js';
import { cqs } from './cqs.js';
import type { Topic } from '../../../ict-syllabus.js';

export const topic9: Topic = {
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
