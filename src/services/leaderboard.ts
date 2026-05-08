import { getFirebaseAuth } from '../lib/firebase';

export type LeaderboardEntry = {
  id: string;
  userId: string;
  name: string;
  score: number;
  total: number;
  rank: number;
  submittedAt: string | null;
  publishedAt: string | null;
};

export type StudentLeaderboard = {
  challenge: {
    id: string;
    title: string;
    startsAt: string | null;
  } | null;
  entries: LeaderboardEntry[];
  myResult: null | {
    submitted: boolean;
    published: boolean;
    score?: number;
    total?: number;
    rank?: number;
    resultVisibleAt?: string | null;
    publishedAt?: string | null;
  };
};

const getToken = async () => {
  const auth = await getFirebaseAuth();
  const token = await auth?.currentUser?.getIdToken();
  if (!token) throw new Error('Firebase login is required.');
  return token;
};

export const fetchLeaderboard = async (challengeId?: string): Promise<StudentLeaderboard> => {
  const token = await getToken();
  const query = challengeId ? `?challengeId=${encodeURIComponent(challengeId)}` : '';
  const response = await fetch(`/api/leaderboard${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    throw new Error(String(data?.error || response.statusText || 'Leaderboard request failed.'));
  }

  return {
    challenge: data.challenge || null,
    entries: data.entries || [],
    myResult: data.myResult || null,
  };
};
