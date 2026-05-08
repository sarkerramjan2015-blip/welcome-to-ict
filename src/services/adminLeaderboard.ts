import { getFirebaseAuth } from '../lib/firebase';

export type AdminLeaderboardResult = {
  id: string;
  userId: string;
  email: string;
  name: string;
  score: number;
  total: number;
  rank: number;
  manualRank: number | null;
  resultStatus: string;
  published: boolean;
  submittedAt: string | null;
  resultVisibleAt: string | null;
  publishedAt: string | null;
};

export type AdminLeaderboardChallengeSet = {
  id: string;
  title: string;
  status: string;
  startsAt: string | null;
  updatedAt: string | null;
};

export type AdminPaymentSummary = {
  currentMonthIncome: number;
  lifetimeIncome: number;
  currentMonthPaymentCount: number;
  lifetimePaymentCount: number;
  recentPayments: Array<{
    id: string;
    email: string;
    amount: number;
    source: string;
    itemTitle: string;
    paidAt: string | null;
  }>;
};

const getToken = async () => {
  const auth = await getFirebaseAuth();
  const token = await auth?.currentUser?.getIdToken();
  if (!token) throw new Error('Firebase admin session expired. Please log in again.');
  return token;
};

const requestAdminLeaderboard = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const token = await getToken();
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
    throw new Error(String(data?.error || response.statusText || 'Admin leaderboard request failed.'));
  }

  return data as T;
};

export const fetchAdminLeaderboard = async (challengeId?: string) => {
  const query = challengeId ? `?challengeId=${encodeURIComponent(challengeId)}` : '';
  return requestAdminLeaderboard<{
    challengeSets: AdminLeaderboardChallengeSet[];
    selectedChallengeId: string;
    results: AdminLeaderboardResult[];
    paymentSummary: AdminPaymentSummary;
  }>(`/api/adminLeaderboard${query}`);
};

export const publishAdminLeaderboard = async (challengeId: string) => {
  return requestAdminLeaderboard('/api/adminLeaderboard', {
    method: 'POST',
    body: JSON.stringify({ action: 'publishChallenge', challengeId }),
  });
};

export const updateAdminLeaderboardResult = async (payload: {
  challengeId: string;
  resultId: string;
  score: number;
  manualRank: number | '';
}) => {
  return requestAdminLeaderboard('/api/adminLeaderboard', {
    method: 'PATCH',
    body: JSON.stringify({ action: 'updateResult', ...payload }),
  });
};
