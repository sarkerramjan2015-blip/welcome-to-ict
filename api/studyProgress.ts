import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, httpError, verifyRequest } from '../src/server/firebaseAdminAccess.js';
import { getPracticeTopicMeta } from '../src/server/practiceExamBank.js';

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

const cleanString = (value: unknown) => String(value || '').trim();

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

const getProgressId = (uid: string, topicId: string) =>
  `${uid}__${topicId}`;

export default async function studyProgress(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return json(res, 405, { success: false, error: 'Method not allowed.' });
    }

    const decoded = await verifyRequest(req);
    const uid = cleanString(decoded.uid);
    const body = parseBody(req.body);
    const action = cleanString(body.action);
    const topicId = cleanString(body.topicId);
    const topic = getPracticeTopicMeta(topicId);

    if (!uid) throw httpError(401, 'Firebase login is required.');
    if (!topicId || !topic) throw httpError(404, 'Study topic was not found.');
    if (!['visit', 'completion'].includes(action)) throw httpError(400, 'Unknown study progress action.');

    const db = getAdminDb();
    const progressRef = db.collection('studentTopicProgress').doc(getProgressId(uid, topicId));
    const snapshot = await progressRef.get();
    const studentName = cleanString(body.name || decoded.name);
    const phone = cleanString(body.phone);
    const basePayload = {
      userId: uid,
      email: cleanString(decoded.email),
      ...(studentName ? { name: studentName } : {}),
      ...(phone ? { phone } : {}),
      ...topic,
      updatedAt: FieldValue.serverTimestamp(),
    };

    const batch = db.batch();
    batch.set(db.collection('students').doc(uid), {
      userId: uid,
      email: cleanString(decoded.email),
      ...(studentName ? { name: studentName } : {}),
      ...(phone ? { phone } : {}),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    if (action === 'visit') {
      batch.set(progressRef, {
        ...basePayload,
        ...(snapshot.exists ? {} : { firstVisitedAt: FieldValue.serverTimestamp() }),
        visitCount: FieldValue.increment(1),
        lastVisitedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
    }

    if (action === 'completion') {
      const completed = Boolean(body.completed);
      batch.set(progressRef, {
        ...basePayload,
        completed,
        completedAt: completed ? FieldValue.serverTimestamp() : null,
      }, { merge: true });
    }

    await batch.commit();
    return json(res, 200, { success: true });
  } catch (error: any) {
    console.error('studyProgress error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Study progress update failed.',
    });
  }
}
