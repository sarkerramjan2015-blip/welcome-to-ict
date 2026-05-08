import { getAdminDb, verifyRequest } from '../src/server/firebaseAdminAccess.js';

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

const cleanString = (value: unknown) => String(value || '').trim();

const queryValue = (req: any, key: string) => {
  const value = req.query?.[key];
  if (Array.isArray(value)) return cleanString(value[0]);
  return cleanString(value);
};

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

const listChallengeSets = async () => {
  const snapshot = await getAdminDb().collection('megaChallenges').get();
  return snapshot.docs
    .filter(item => item.id !== 'current')
    .map(item => {
      const data = item.data() || {};
      return {
        id: item.id,
        title: cleanString(data.title) || 'HSC ICT Monthly Quiz Exam',
        startsAt: toIsoDate(data.startsAt),
        updatedAt: toIsoDate(data.updatedAt),
      };
    })
    .sort((a, b) => new Date(b.startsAt || b.updatedAt || 0).getTime() - new Date(a.startsAt || a.updatedAt || 0).getTime());
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

const safePublishedEntry = (result: Record<string, any>, index: number) => ({
  id: result.id,
  userId: result.userId,
  name: publicName(result),
  score: Number(result.score || 0),
  total: Number(result.total || 0),
  rank: Number(result.rank || result.manualRank || index + 1),
  submittedAt: toIsoDate(result.submittedAt),
  publishedAt: toIsoDate(result.publishedAt),
});

export default async function leaderboard(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return json(res, 405, { success: false, error: 'Method not allowed.' });
    }

    const decoded = await verifyRequest(req);
    const challengeSets = await listChallengeSets();
    const requestedChallengeId = queryValue(req, 'challengeId');
    const challengeId = requestedChallengeId || challengeSets[0]?.id || '';

    if (!challengeId) {
      return json(res, 200, {
        success: true,
        challenge: null,
        entries: [],
        myResult: null,
      });
    }

    const db = getAdminDb();
    const challengeSnap = await db.collection('megaChallenges').doc(challengeId).get();
    const challenge = challengeSnap.exists
      ? {
          id: challengeSnap.id,
          title: cleanString(challengeSnap.data()?.title) || 'HSC ICT Monthly Quiz Exam',
          startsAt: toIsoDate(challengeSnap.data()?.startsAt),
        }
      : { id: challengeId, title: 'HSC ICT Monthly Quiz Exam', startsAt: null };

    const snapshot = await db.collection('challengeResults').where('challengeId', '==', challengeId).get();
    const allResults = snapshot.docs.map(serializeDoc);
    const publishedResults: Record<string, any>[] = sortResults(allResults.filter(item => item.published || item.resultStatus === 'published'))
      .map((item, index) => ({ ...item, computedRank: index + 1 }));

    const entries = publishedResults.slice(0, 20).map((item, index) => safePublishedEntry(item, index));
    const myStored = allResults.find(item => item.userId === decoded.uid) || null;
    const myPublishedIndex = publishedResults.findIndex(item => item.userId === decoded.uid);

    const myResult = myStored
      ? myStored.published || myStored.resultStatus === 'published'
        ? {
            submitted: true,
            published: true,
            score: Number(myStored.score || 0),
            total: Number(myStored.total || 0),
            rank: Number(myStored.rank || myStored.manualRank || (myPublishedIndex >= 0 ? myPublishedIndex + 1 : 0)),
            resultVisibleAt: toIsoDate(myStored.resultVisibleAt),
            publishedAt: toIsoDate(myStored.publishedAt),
          }
        : {
            submitted: true,
            published: false,
            total: Number(myStored.total || 0),
            resultVisibleAt: toIsoDate(myStored.resultVisibleAt),
          }
      : null;

    return json(res, 200, {
      success: true,
      challenge,
      entries,
      myResult,
    });
  } catch (error: any) {
    console.error('leaderboard error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Leaderboard request failed.',
    });
  }
}
