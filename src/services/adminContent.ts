import { getFirebaseIdToken } from './manualPayment';

export type AdminContentChapter = {
  id: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  level: string;
  status: string;
};

export type AdminContentTopic = {
  id: string;
  title: string;
  slug: string;
  chapterId: string;
  importance: string;
  order: number;
  board_notes: string;
  video_url: string;
};

export type AdminContentQuestion = {
  id: string;
  chapterId: string;
  topicId: string;
};

const requestAdminContent = async <T>(init?: RequestInit): Promise<T> => {
  const token = await getFirebaseIdToken();
  if (!token) {
    throw new Error('Firebase admin session expired. Please log in again.');
  }

  const response = await fetch('/api/adminContent', {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    throw new Error(String(data?.error || response.statusText || 'Admin content request failed.'));
  }

  return data as T;
};

export const fetchAdminContentLibrary = async () => {
  const data = await requestAdminContent<{
    chapters: AdminContentChapter[];
    topics: AdminContentTopic[];
    mcqs: AdminContentQuestion[];
    cqs: AdminContentQuestion[];
  }>();
  return {
    chapters: data.chapters || [],
    topics: data.topics || [],
    mcqs: data.mcqs || [],
    cqs: data.cqs || [],
  };
};

export const saveAdminContentAction = async (action: string, form: Record<string, any>) =>
  requestAdminContent<{ savedId: string; challengeId?: string }>({
    method: 'POST',
    body: JSON.stringify({ action, form }),
  });

export const generateAdminChallengeQuestions = async () =>
  requestAdminContent<{ challengeId: string; questionCount: number }>({
    method: 'POST',
    body: JSON.stringify({ mode: 'generateChallenge' }),
  });
