import { getFirebaseAuth } from '../lib/firebase';

export type AdminChallengeSet = {
  id: string;
  title: string;
  status: string;
  startsAt: string | null;
  updatedAt: string | null;
  questionCount: number;
};

export type AdminQuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topicId: string;
  chapterId: string;
  order: number;
};

const getAdminToken = async () => {
  const auth = await getFirebaseAuth();
  const token = await auth?.currentUser?.getIdToken();
  if (!token) {
    throw new Error('Firebase admin session expired. Please log in again.');
  }
  return token;
};

const requestAdminQuiz = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const token = await getAdminToken();
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
    throw new Error(String(data?.error || response.statusText || 'Admin quiz question request failed.'));
  }

  return data as T;
};

export const fetchAdminChallengeSets = async () => {
  const data = await requestAdminQuiz<{ challengeSets: AdminChallengeSet[] }>('/api/adminQuizQuestions');
  return data.challengeSets || [];
};

export const fetchAdminChallengeQuestions = async (challengeId: string) => {
  const data = await requestAdminQuiz<{ questions: AdminQuizQuestion[] }>(
    `/api/adminQuizQuestions?challengeId=${encodeURIComponent(challengeId)}`
  );
  return data.questions || [];
};

export const saveAdminQuizQuestion = async (challengeId: string, question: AdminQuizQuestion) => {
  const data = await requestAdminQuiz<{ question: AdminQuizQuestion }>('/api/adminQuizQuestions', {
    method: 'PATCH',
    body: JSON.stringify({ challengeId, question }),
  });
  return data.question;
};
