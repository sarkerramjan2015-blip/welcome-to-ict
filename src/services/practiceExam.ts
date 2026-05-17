import { getFirebaseIdToken } from './manualPayment';

export type PracticeQuestionStat = {
  attempts: number;
  correctCount: number;
  wrongCount: number;
  correctPercent: number;
  wrongPercent: number;
  topOption: {
    index: number;
    label: string;
    count: number;
    percent: number;
  } | null;
  optionStats: Array<{
    index: number;
    label: string;
    count: number;
    percent: number;
  }>;
};

export type DailyPracticeQuestion = {
  id: string;
  q: string;
  options: string[];
  explanation?: string;
  correctOption?: string;
  correctIndex?: number;
  selectedOption?: string | null;
  selectedIndex?: number;
  isCorrect?: boolean;
  stats?: PracticeQuestionStat;
};

export type DailyPracticeAttempt = {
  id: string;
  userId: string;
  email: string;
  name: string | null;
  topicId: string;
  topicTitle: string;
  chapterId: string;
  chapterTitle: string;
  dateKey: string;
  score: number;
  total: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  wrongPercent: number;
  completedAt: string | null;
  questions: DailyPracticeQuestion[];
};

export type DailyPracticeExam = {
  canAttempt: boolean;
  topic: {
    topicId: string;
    topicTitle: string;
    chapterId: string;
    chapterTitle: string;
  };
  dateKey: string;
  nextEligibleAt: string;
  attempt?: DailyPracticeAttempt;
  questions: DailyPracticeQuestion[];
};

const requestPracticeExam = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const token = await getFirebaseIdToken();
  if (!token) {
    throw new Error('Please log in to take the daily topic exam.');
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    const error = new Error(String(data?.error || response.statusText || 'Practice exam request failed.'));
    Object.assign(error, { data });
    throw error;
  }

  return data as T;
};

export const fetchDailyPracticeExam = async (topicId: string) => {
  const data = await requestPracticeExam<DailyPracticeExam & { success: true }>(
    `/api/practiceExam?topicId=${encodeURIComponent(topicId)}`
  );
  return data;
};

export const submitDailyPracticeExam = async ({
  topicId,
  answers,
  name,
  phone,
}: {
  topicId: string;
  answers: Record<string, string>;
  name?: string | null;
  phone?: string | null;
}) => {
  const data = await requestPracticeExam<DailyPracticeExam & { success: true }>('/api/practiceExam', {
    method: 'POST',
    body: JSON.stringify({ topicId, answers, name, phone }),
  });
  return data;
};
