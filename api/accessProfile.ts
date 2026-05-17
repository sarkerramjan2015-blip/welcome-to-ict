import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, verifyRequest } from '../src/server/firebaseAdminAccess.js';

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

const toIsoDate = (value: any): string | null => {
  if (!value) return null;
  if (typeof value?.toDate === 'function') {
    return value.toDate().toISOString();
  }

  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const cleanString = (value: unknown) => String(value || '').trim();
const normalizeEmail = (value: unknown) => cleanString(value).toLowerCase();

export default async function accessProfile(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return json(res, 405, { success: false, error: 'Method not allowed.' });
    }

    const decoded = await verifyRequest(req);
    const db = getAdminDb();
    const studentRef = db.collection('students').doc(decoded.uid);
    let snapshot = await studentRef.get();
    let data = snapshot.data() || {};
    const email = normalizeEmail(decoded.email);

    if (!data.isPremium && email) {
      const inviteRef = db.collection('freeAccessInvites').doc(email);
      const inviteSnap = await inviteRef.get();
      const invite = inviteSnap.data() || {};

      if (invite.freeAccessGranted) {
        const batch = db.batch();
        batch.set(studentRef, {
          userId: decoded.uid,
          email,
          isPremium: true,
          premiumPlan: 'granted',
          premiumSince: FieldValue.serverTimestamp(),
          freeAccessGranted: true,
          freeAccessGrantedAt: invite.freeAccessGrantedAt || FieldValue.serverTimestamp(),
          freeAccessGrantedBy: invite.freeAccessGrantedBy || null,
          freeAccessGrantReason: invite.freeAccessGrantReason || null,
          updatedAt: FieldValue.serverTimestamp(),
        }, { merge: true });
        batch.set(inviteRef, {
          freeAccessGranted: false,
          redeemedByUid: decoded.uid,
          redeemedAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        }, { merge: true });
        await batch.commit();
        snapshot = await studentRef.get();
        data = snapshot.data() || {};
      }
    }

    return json(res, 200, {
      success: true,
      access: {
        isPremium: Boolean(data.isPremium),
        premiumPlan: data.premiumPlan || null,
        premiumSince: toIsoDate(data.premiumSince),
        freeAccessGranted: Boolean(data.freeAccessGranted),
      },
    });
  } catch (error: any) {
    console.error('accessProfile error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Access profile request failed.',
    });
  }
}
