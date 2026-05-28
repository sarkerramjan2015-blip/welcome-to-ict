import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, httpError, requireAdmin, verifyRequest } from '../src/server/firebaseAdminAccess.js';

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

const parseBody = (body: unknown) => {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body as Record<string, any>;
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

const toTime = (value: any) => {
  const iso = toIsoDate(value);
  return iso ? new Date(iso).getTime() : 0;
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

const getDhakaMonthKey = (value: any) => {
  const iso = toIsoDate(value);
  if (!iso) return '';
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
  }).format(new Date(iso));
};

const currentDhakaMonthKey = () => getDhakaMonthKey(new Date());

const listChallengeSets = async () => {
  const snapshot = await getAdminDb().collection('megaChallenges').get();
  return snapshot.docs
    .filter(item => item.id !== 'current')
    .map(item => {
      const data = item.data() || {};
      return {
        id: item.id,
        title: cleanString(data.title) || 'HSC ICT Monthly Quiz Exam',
        status: cleanString(data.status) || 'DRAFT',
        level: cleanString(data.level) || 'HSC',
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
    return toTime(a.submittedAt) - toTime(b.submittedAt);
  });

const serializeResult = (result: Record<string, any>, index: number) => ({
  id: result.id,
  userId: cleanString(result.userId),
  email: cleanString(result.email) || 'No email',
  name: publicName(result),
  score: Number(result.score || 0),
  total: Number(result.total || 0),
  rank: Number(result.rank || result.manualRank || index + 1),
  manualRank: Number(result.manualRank || 0) || null,
  resultStatus: cleanString(result.resultStatus) || 'pending',
  published: Boolean(result.published || result.resultStatus === 'published'),
  submittedAt: toIsoDate(result.submittedAt),
  resultVisibleAt: toIsoDate(result.resultVisibleAt),
  publishedAt: toIsoDate(result.publishedAt),
});

const recalculateRanks = async (challengeId: string, publish = false) => {
  const db = getAdminDb();
  const snapshot = await db.collection('challengeResults').where('challengeId', '==', challengeId).get();
  const sortedDocs = sortResults(snapshot.docs.map(doc => ({ ref: doc.ref, ...serializeDoc(doc) })));
  const batch = db.batch();
  const publishedAt = FieldValue.serverTimestamp();

  sortedDocs.forEach((item, index) => {
    batch.set(item.ref, {
      rank: Number(item.manualRank || 0) || index + 1,
      ...(publish ? {
        resultStatus: 'published',
        published: true,
        publishedAt,
      } : {}),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  });

  await batch.commit();
};

const getResults = async (challengeId: string) => {
  if (!challengeId) return [];
  const snapshot = await getAdminDb().collection('challengeResults').where('challengeId', '==', challengeId).get();
  return sortResults(snapshot.docs.map(serializeDoc)).map(serializeResult);
};

const getPaymentDate = (item: Record<string, any>) =>
  item.approvedAt || item.purchasedAt || item.enrolledAt || item.createdAt || item.updatedAt;

const getPaymentAmount = (item: Record<string, any>) =>
  Number(item.amount || item.chargedAmount || item.fee || 0);

const getPaymentSummary = async () => {
  const db = getAdminDb();
  const monthKey = currentDhakaMonthKey();
  const rows: Record<string, any>[] = [];

  const manualPayments = await db.collection('payments').get();
  manualPayments.docs.map(serializeDoc).forEach(item => {
    if (cleanString(item.status).toLowerCase() === 'approved') {
      rows.push({ ...item, source: 'manual' });
    }
  });

  for (const collectionName of ['courseEnrollments', 'productPurchases', 'challengeEnrollments']) {
    const snapshot = await db.collection(collectionName).get();
    snapshot.docs.map(serializeDoc).forEach(item => {
      if (cleanString(item.provider) === 'uddoktapay') {
        rows.push({ ...item, source: collectionName });
      }
    });
  }

  const uniqueRows = Array.from(new Map(rows.map(item => [
    cleanString(item.invoiceId || item.paymentId || item.id),
    item,
  ])).values());
  const currentMonthRows = uniqueRows.filter(item => getDhakaMonthKey(getPaymentDate(item)) === monthKey);
  const sum = (items: Record<string, any>[]) => items.reduce((total, item) => total + getPaymentAmount(item), 0);

  return {
    currentMonthIncome: sum(currentMonthRows),
    lifetimeIncome: sum(uniqueRows),
    currentMonthPaymentCount: currentMonthRows.length,
    lifetimePaymentCount: uniqueRows.length,
    recentPayments: uniqueRows
      .sort((a, b) => toTime(getPaymentDate(b)) - toTime(getPaymentDate(a)))
      .slice(0, 8)
      .map(item => ({
        id: cleanString(item.invoiceId || item.paymentId || item.id),
        email: cleanString(item.email) || 'No email',
        amount: getPaymentAmount(item),
        source: cleanString(item.source),
        itemTitle: cleanString(item.courseTitle || item.itemTitle || item.challengeTitle || item.courseId || item.itemId) || 'ICT Toppers Payment',
        paidAt: toIsoDate(getPaymentDate(item)),
      })),
  };
};

const updateResult = async (body: Record<string, any>) => {
  const challengeId = cleanString(body.challengeId);
  const resultId = cleanString(body.resultId);
  if (!challengeId || !resultId) throw httpError(400, 'Challenge ID and result ID are required.');

  const score = Number(body.score);
  const manualRank = Number(body.manualRank);
  const payload: Record<string, any> = {
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (Number.isFinite(score) && score >= 0) payload.score = score;
  payload.manualRank = Number.isFinite(manualRank) && manualRank > 0 ? manualRank : FieldValue.delete();

  await getAdminDb().collection('challengeResults').doc(resultId).set(payload, { merge: true });
  await recalculateRanks(challengeId, false);
};

export default async function adminLeaderboard(req: any, res: any) {
  try {
    const decoded = await verifyRequest(req);
    await requireAdmin(decoded);

    if (req.method === 'GET') {
      const challengeSets = await listChallengeSets();
      const challengeId = queryValue(req, 'challengeId') || challengeSets[0]?.id || '';
      const [results, paymentSummary] = await Promise.all([
        getResults(challengeId),
        getPaymentSummary(),
      ]);

      return json(res, 200, {
        success: true,
        challengeSets,
        selectedChallengeId: challengeId,
        results,
        paymentSummary,
      });
    }

    if (req.method === 'PATCH' || req.method === 'POST') {
      const body = parseBody(req.body);
      const action = cleanString(body.action);
      const challengeId = cleanString(body.challengeId);

      if (action === 'publishChallenge') {
        if (!challengeId) throw httpError(400, 'Challenge ID is required.');
        await recalculateRanks(challengeId, true);
        return json(res, 200, { success: true });
      }

      if (action === 'updateResult') {
        await updateResult(body);
        return json(res, 200, { success: true });
      }

      return json(res, 400, { success: false, error: 'Unknown leaderboard action.' });
    }

    res.setHeader('Allow', 'GET, PATCH, POST');
    return json(res, 405, { success: false, error: 'Method not allowed.' });
  } catch (error: any) {
    console.error('adminLeaderboard error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Admin leaderboard request failed.',
    });
  }
}
