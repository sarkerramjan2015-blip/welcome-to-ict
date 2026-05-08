import { getAdminDb } from './firebaseAdminAccess.js';

export type PublicRankResult = {
  challengeId: string;
  challengeTitle: string;
  userId: string;
  name: string;
  score: number;
  total: number;
  rank: number;
  submittedAt: string | null;
  publishedAt: string | null;
};

const cleanString = (value: unknown) => String(value || '').trim();

const toIsoDate = (value: any): string | null => {
  if (!value) return null;
  if (typeof value?.toDate === 'function') return value.toDate().toISOString();
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const serializeDoc = (doc: any) => {
  const data = doc.data() || {};
  return Object.fromEntries(
    Object.entries({ id: doc.id, ...data }).map(([key, value]: [string, any]) => [
      key,
      typeof value?.toDate === 'function' ? value.toDate().toISOString() : value,
    ])
  ) as Record<string, any>;
};

const publicName = (result: Record<string, any>) =>
  cleanString(result.name) ||
  cleanString(result.displayName) ||
  cleanString(result.email).split('@')[0] ||
  'ICT Student';

const sortResults = (items: Record<string, any>[]) =>
  [...items].sort((a, b) => {
    const aManual = Number(a.manualRank || 0);
    const bManual = Number(b.manualRank || 0);
    if (aManual > 0 || bManual > 0) return (aManual || Number.MAX_SAFE_INTEGER) - (bManual || Number.MAX_SAFE_INTEGER);
    if (Number(b.score || 0) !== Number(a.score || 0)) return Number(b.score || 0) - Number(a.score || 0);
    return new Date(a.submittedAt || 0).getTime() - new Date(b.submittedAt || 0).getTime();
  });

export const getPublicRankResult = async (challengeId: string, userId: string): Promise<PublicRankResult | null> => {
  const db = getAdminDb();
  const normalizedChallengeId = cleanString(challengeId);
  const normalizedUserId = cleanString(userId);

  if (!normalizedChallengeId || !normalizedUserId) {
    return null;
  }

  const challengeSnap = await db.collection('megaChallenges').doc(normalizedChallengeId).get();
  const challengeTitle = challengeSnap.exists
    ? cleanString(challengeSnap.data()?.title) || 'HSC ICT Monthly Quiz Exam'
    : 'HSC ICT Monthly Quiz Exam';

  const snapshot = await db.collection('challengeResults').where('challengeId', '==', normalizedChallengeId).get();
  const publishedResults = sortResults(
    snapshot.docs
      .map(serializeDoc)
      .filter(item => item.published || item.resultStatus === 'published')
  );

  const index = publishedResults.findIndex(item => item.userId === normalizedUserId);
  if (index < 0) {
    return null;
  }

  const result = publishedResults[index];

  return {
    challengeId: normalizedChallengeId,
    challengeTitle,
    userId: normalizedUserId,
    name: publicName(result),
    score: Number(result.score || 0),
    total: Number(result.total || 0),
    rank: Number(result.rank || result.manualRank || index + 1),
    submittedAt: toIsoDate(result.submittedAt),
    publishedAt: toIsoDate(result.publishedAt),
  };
};
