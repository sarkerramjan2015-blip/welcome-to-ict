import { getFirebaseAuth } from '../lib/firebase';

export type AdminChallengeSet = {
  id: string;
  title: string;
  status: string;
  startsAt: string | null;
  updatedAt: string | null;
  questionCount: number;
};

export type AdminChallengeDetails = {
  id: string;
  title: string;
  status: string;
  startsAt: string | null;
  endsAt: string | null;
  updatedAt: string | null;
  fee: number;
  totalMarks: number;
  durationMinutes: number;
  syllabus: string[];
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

const normalizeSyllabus = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(item => String(item || '').trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(item => String(item || '').trim()).filter(Boolean);
      }
    } catch {}

    return value.split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
  }

  return [];
};

const normalizeChallengeDetails = (value: Record<string, any>, questions: AdminQuizQuestion[]): AdminChallengeDetails => ({
  id: String(value.id || ''),
  title: String(value.title || 'HSC ICT Monthly Quiz Exam'),
  status: String(value.status || 'DRAFT'),
  startsAt: value.startsAt || null,
  endsAt: value.endsAt || null,
  updatedAt: value.updatedAt || null,
  fee: Number(value.fee || 0),
  totalMarks: Number(value.totalMarks || questions.length || 0),
  durationMinutes: Number(value.durationMinutes || 30),
  syllabus: normalizeSyllabus(value.syllabus),
  questionCount: Number(value.questionCount || questions.length || 0),
});

export const fetchAdminChallengeDetails = async (challengeId: string) => {
  const data = await requestAdminQuiz<{ challenge: Record<string, any>; questions: AdminQuizQuestion[] }>(
    `/api/adminQuizQuestions?challengeId=${encodeURIComponent(challengeId)}`
  );
  const questions = data.questions || [];
  return {
    challenge: normalizeChallengeDetails(data.challenge || {}, questions),
    questions,
  };
};

export const saveAdminQuizQuestion = async (challengeId: string, question: AdminQuizQuestion) => {
  const data = await requestAdminQuiz<{ question: AdminQuizQuestion }>('/api/adminQuizQuestions', {
    method: 'PATCH',
    body: JSON.stringify({ challengeId, question }),
  });
  return data.question;
};
