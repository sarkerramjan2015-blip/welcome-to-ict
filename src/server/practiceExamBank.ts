import { createHash } from 'node:crypto';
import { ictSyllabus, type PracticeMCQ, type QuizMCQ } from '../data/ict-syllabus.js';

export type PracticeQuestion = {
  id: string;
  q: string;
  options: string[];
  correct: string;
  explanation: string;
};

export type PracticeTopicMeta = {
  topicId: string;
  topicTitle: string;
  chapterId: string;
  chapterTitle: string;
};

const cleanString = (value: unknown) => String(value || '').trim();

const hashText = (value: string) =>
  createHash('sha1').update(value).digest('hex').slice(0, 16);

const normalizeQuestion = (
  topicId: string,
  question: PracticeMCQ | QuizMCQ
): PracticeQuestion | null => {
  const q = cleanString(question.q);
  const options = Array.isArray(question.options)
    ? question.options.map(option => cleanString(option)).filter(Boolean).slice(0, 4)
    : [];
  const correct = cleanString(question.correct);

  if (!q || options.length < 2 || !correct || !options.includes(correct)) {
    return null;
  }

  const identity = `${topicId}|${q}|${options.join('|')}|${correct}`;

  return {
    id: `practice-${hashText(identity)}`,
    q,
    options,
    correct,
    explanation: cleanString('explanation' in question ? question.explanation : ''),
  };
};

const seededNumber = (seed: string) =>
  Number.parseInt(hashText(seed).slice(0, 8), 16) || 1;

const seededShuffle = <T,>(items: T[], seed: string) => {
  const next = [...items];
  let state = seededNumber(seed);

  for (let index = next.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
};

const dateKeyToDhakaNoon = (dateKey: string) =>
  new Date(`${dateKey}T12:00:00+06:00`);

const shiftDateKey = (dateKey: string, dayOffset: number) => {
  const date = dateKeyToDhakaNoon(dateKey);
  date.setUTCDate(date.getUTCDate() + dayOffset);
  return getDhakaDateKey(date);
};

const sameSelection = (left: PracticeQuestion[], right: PracticeQuestion[]) =>
  left.length === right.length &&
  left.every(item => right.some(candidate => candidate.id === item.id));

export const getDhakaDateKey = (value: Date | string = new Date()) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

export const getNextDhakaDayStartIso = (dateKey: string) =>
  new Date(`${shiftDateKey(dateKey, 1)}T00:00:00+06:00`).toISOString();

export const getPracticeTopicMeta = (topicId: string): PracticeTopicMeta | null => {
  for (const chapter of ictSyllabus) {
    const topic = chapter.topics.find(item => item.id === topicId);
    if (topic) {
      return {
        topicId: topic.id,
        topicTitle: topic.title,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
      };
    }
  }

  return null;
};

export const buildDailyPracticeQuestions = (topicId: string, dateKey: string) => {
  const topicMeta = getPracticeTopicMeta(topicId);
  if (!topicMeta) return [];

  const topic = ictSyllabus
    .flatMap(chapter => chapter.topics)
    .find(item => item.id === topicId);

  if (!topic) return [];

  const uniqueQuestions = new Map<string, PracticeQuestion>();
  [...topic.practiceMcqs, ...topic.quizMcqs]
    .map(question => normalizeQuestion(topicId, question))
    .filter((question): question is PracticeQuestion => Boolean(question))
    .forEach(question => uniqueQuestions.set(question.id, question));

  const pool = [...uniqueQuestions.values()];
  const count = Math.min(10, pool.length);
  if (!count) return [];

  const selected = seededShuffle(pool, `${topicId}:${dateKey}`).slice(0, count);
  const previous = seededShuffle(pool, `${topicId}:${shiftDateKey(dateKey, -1)}`).slice(0, count);

  if (pool.length > count && sameSelection(selected, previous)) {
    const replacement = seededShuffle(pool, `${topicId}:${dateKey}:replacement`)
      .find(question => !selected.some(item => item.id === question.id));

    if (replacement) {
      selected[selected.length - 1] = replacement;
    }
  }

  return selected;
};
