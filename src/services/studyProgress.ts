import type { User } from '../context/AuthContext';
import { getFirebaseIdToken } from './manualPayment';

const syncStudyProgress = async (
  action: 'visit' | 'completion',
  topicId: string,
  user: User | null,
  completed?: boolean
) => {
  const token = await getFirebaseIdToken();
  if (!token) return;

  await fetch('/api/studyProgress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      action,
      topicId,
      completed,
      name: user?.name,
      phone: user?.phone,
    }),
  }).catch(() => undefined);
};

export const syncTopicVisit = (topicId: string, user: User | null) =>
  syncStudyProgress('visit', topicId, user);

export const syncTopicCompletion = (topicId: string, completed: boolean, user: User | null) =>
  syncStudyProgress('completion', topicId, user, completed);
