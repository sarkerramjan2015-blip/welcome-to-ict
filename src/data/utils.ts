import { PracticeMCQ, QuizMCQ } from "./ict-syllabus";

export const generateQuiz = (
  source: string | PracticeMCQ[],
  count = 10
): QuizMCQ[] => {
  if (Array.isArray(source)) {
    return source.slice(0, count).map(({ q, options, correct }) => ({
      q,
      options,
      correct,
    }));
  }

  return Array.from({ length: count }).map((_, i) => ({
    q: `${source} সম্পর্কিত গুরুত্বপূর্ণ মডেল প্রশ্ন ${i + 1} কোনটি?`,
    options: ["সঠিক উত্তর ক", "ভুল উত্তর খ", "ভুল উত্তর গ", "ভুল উত্তর ঘ"],
    correct: "সঠিক উত্তর ক",
  }));
};
