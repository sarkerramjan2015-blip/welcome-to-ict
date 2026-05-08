import { getFirebaseAuth } from '../lib/firebase';

export type ChallengeExamQuestion = {
  id: string;
  question: string;
  options: string[];
  topicId?: string;
  chapterId?: string;
  order?: number;
};

const getUserToken = async () => {
  const auth = await getFirebaseAuth();
  const token = await auth?.currentUser?.getIdToken();
  if (!token) {
    throw new Error('Firebase login is required to start the quiz.');
  }
  return token;
};

const requestChallengeExam = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const token = await getUserToken();
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    throw new Error(String(data?.error || response.statusText || 'Quiz request failed.'));
  }

  return data as T;
};

export const fetchChallengeExamQuestions = async (challengeId: string) => {
  return requestChallengeExam<{
    questions: ChallengeExamQuestion[];
    durationMinutes: number;
  }>(`/api/challengeExam?challengeId=${encodeURIComponent(challengeId)}`);
};

export const submitChallengeExam = async (challengeId: string, answers: Record<string, string>) => {
  return requestChallengeExam<{
    score: number;
    total: number;
  }>('/api/challengeExam', {
    method: 'POST',
    body: JSON.stringify({ challengeId, answers }),
  });
};
