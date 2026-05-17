import { getFirebaseIdToken } from './manualPayment';

export type AdminPracticeRecentAttempt = {
  id: string;
  topicId: string;
  topicTitle: string;
  accuracy: number;
  score: number;
  total: number;
  completedAt: string | null;
};

export type AdminPracticeStudent = {
  uid: string;
  email: string;
  name: string;
  phone: string | null;
  topicsVisited: number;
  topicsCompleted: number;
  totalVisits: number;
  practiceAttempts: number;
  averageAccuracy: number;
  bestAccuracy: number;
  lastStudyAt: string | null;
  lastAttemptAt: string | null;
  lastActivityAt: string | null;
  lastTopicTitle: string | null;
  weakestTopic: {
    title: string;
    averageAccuracy: number;
  } | null;
  recentAttempts: AdminPracticeRecentAttempt[];
};

export type AdminPracticeProgressSummary = {
  trackedStudents: number;
  studiedTopics: number;
  completedTopics: number;
  practiceAttempts: number;
  averageAccuracy: number;
};

export const fetchAdminPracticeProgress = async () => {
  const token = await getFirebaseIdToken();
  if (!token) {
    throw new Error('Firebase admin session expired. Please log in again.');
  }

  const response = await fetch('/api/adminPracticeProgress', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    throw new Error(String(data?.error || response.statusText || 'Failed to load student progress.'));
  }

  return data as {
    success: true;
    summary: AdminPracticeProgressSummary;
    students: AdminPracticeStudent[];
  };
};
