import { QuizMCQ } from "./ict-syllabus";

export const generateQuiz = (topicName: string): QuizMCQ[] => {
  return Array.from({ length: 10 }).map((_, i) => ({
    q: `${topicName} সম্পর্কিত গুরুত্বপূর্ণ মডেল প্রশ্ন ${i + 1} কোনটি?`,
    options: ["সঠিক উত্তর ক", "ভুল উত্তর খ", "ভুল উত্তর গ", "ভুল উত্তর ঘ"],
    correct: "সঠিক উত্তর ক",
  }));
};
