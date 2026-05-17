import { FieldValue } from 'firebase-admin/firestore';
import { getAdminAuth, getAdminDb, httpError, requireAdmin, verifyRequest } from '../firebaseAdminAccess.js';

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
const normalizeEmail = (value: unknown) => cleanString(value).toLowerCase();

const toIsoDate = (value: any): string | null => {
  if (!value) return null;
  if (typeof value?.toDate === 'function') {
    return value.toDate().toISOString();
  }

  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const serializeGrant = (id: string, data: Record<string, any>) => ({
  uid: id,
  email: cleanString(data.email),
  isPremium: Boolean(data.isPremium),
  premiumPlan: cleanString(data.premiumPlan) || null,
  freeAccessGranted: Boolean(data.freeAccessGranted),
  freeAccessGrantedAt: toIsoDate(data.freeAccessGrantedAt),
  freeAccessGrantedBy: cleanString(data.freeAccessGrantedBy) || null,
  freeAccessGrantReason: cleanString(data.freeAccessGrantReason) || null,
  accessRevokedAt: toIsoDate(data.accessRevokedAt),
  accessRevokedBy: cleanString(data.accessRevokedBy) || null,
  pending: false,
});

const serializeInvite = (id: string, data: Record<string, any>) => ({
  uid: cleanString(data.redeemedByUid),
  email: cleanString(data.email || id),
  isPremium: false,
  premiumPlan: null,
  freeAccessGranted: Boolean(data.freeAccessGranted),
  freeAccessGrantedAt: toIsoDate(data.freeAccessGrantedAt),
  freeAccessGrantedBy: cleanString(data.freeAccessGrantedBy) || null,
  freeAccessGrantReason: cleanString(data.freeAccessGrantReason) || null,
  accessRevokedAt: toIsoDate(data.accessRevokedAt),
  accessRevokedBy: cleanString(data.accessRevokedBy) || null,
  pending: true,
});

const listFreeAccessGrants = async () => {
  const db = getAdminDb();
  const [studentSnapshot, inviteSnapshot] = await Promise.all([
    db.collection('students').where('freeAccessGranted', '==', true).get(),
    db.collection('freeAccessInvites').where('freeAccessGranted', '==', true).get(),
  ]);

  return [
    ...studentSnapshot.docs.map(item => serializeGrant(item.id, item.data() || {})),
    ...inviteSnapshot.docs.map(item => serializeInvite(item.id, item.data() || {})),
  ]
    .sort((a, b) => new Date(b.freeAccessGrantedAt || 0).getTime() - new Date(a.freeAccessGrantedAt || 0).getTime());
};

const grantFreeAccess = async (body: Record<string, any>, adminEmail: string) => {
  const email = normalizeEmail(body.email);
  const reason = cleanString(body.reason);

  if (!email) throw httpError(400, 'Student Gmail is required.');

  let authUser = null;
  try {
    authUser = await getAdminAuth().getUserByEmail(email);
  } catch {}

  if (!authUser) {
    const inviteRef = getAdminDb().collection('freeAccessInvites').doc(email);
    await inviteRef.set({
      email,
      freeAccessGranted: true,
      freeAccessGrantedAt: FieldValue.serverTimestamp(),
      freeAccessGrantedBy: adminEmail,
      freeAccessGrantReason: reason || null,
      redeemedByUid: null,
      redeemedAt: null,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    const updatedInvite = await inviteRef.get();
    return serializeInvite(updatedInvite.id, updatedInvite.data() || {});
  }

  const studentRef = getAdminDb().collection('students').doc(authUser.uid);
  const existingSnapshot = await studentRef.get();
  const existingData = existingSnapshot.data() || {};
  const hasPaidPremium = Boolean(existingData.premiumPaymentId);

  await studentRef.set({
    userId: authUser.uid,
    email,
    isPremium: true,
    premiumPlan: hasPaidPremium ? existingData.premiumPlan || null : 'granted',
    premiumSince: hasPaidPremium && existingData.premiumSince
      ? existingData.premiumSince
      : FieldValue.serverTimestamp(),
    freeAccessGranted: true,
    freeAccessGrantedAt: FieldValue.serverTimestamp(),
    freeAccessGrantedBy: adminEmail,
    freeAccessGrantReason: reason || null,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });

  const updated = await studentRef.get();
  return serializeGrant(updated.id, updated.data() || {});
};

const revokeFreeAccess = async (body: Record<string, any>, adminEmail: string) => {
  const uid = cleanString(body.uid);
  const email = normalizeEmail(body.email);

  if (!uid && email) {
    const inviteRef = getAdminDb().collection('freeAccessInvites').doc(email);
    const inviteSnap = await inviteRef.get();
    if (!inviteSnap.exists) throw httpError(404, 'Pending Gmail access invite was not found.');

    await inviteRef.set({
      freeAccessGranted: false,
      accessRevokedAt: FieldValue.serverTimestamp(),
      accessRevokedBy: adminEmail,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    const updatedInvite = await inviteRef.get();
    return serializeInvite(updatedInvite.id, updatedInvite.data() || {});
  }

  if (!uid) throw httpError(400, 'Student UID or pending Gmail is required.');

  const studentRef = getAdminDb().collection('students').doc(uid);
  const snapshot = await studentRef.get();
  if (!snapshot.exists) throw httpError(404, 'Student access record was not found.');

  const data = snapshot.data() || {};
  const hasPaidPremium = Boolean(data.premiumPaymentId);

  await studentRef.set({
    freeAccessGranted: false,
    freeAccessGrantReason: null,
    accessRevokedAt: FieldValue.serverTimestamp(),
    accessRevokedBy: adminEmail,
    ...(hasPaidPremium
      ? {}
      : {
          isPremium: false,
          premiumPlan: null,
          premiumSince: null,
        }),
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });

  const updated = await studentRef.get();
  return serializeGrant(updated.id, updated.data() || {});
};

export default async function adminAccess(req: any, res: any) {
  try {
    const decoded = await verifyRequest(req);
    const admin = await requireAdmin(decoded);

    if (req.method === 'GET') {
      return json(res, 200, {
        success: true,
        grants: await listFreeAccessGrants(),
      });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return json(res, 405, { success: false, error: 'Method not allowed.' });
    }

    const body = parseBody(req.body);
    const action = cleanString(body.action);

    if (action === 'grant') {
      return json(res, 200, {
        success: true,
        grant: await grantFreeAccess(body, admin.email),
      });
    }

    if (action === 'revoke') {
      return json(res, 200, {
        success: true,
        grant: await revokeFreeAccess(body, admin.email),
      });
    }

    return json(res, 400, { success: false, error: 'Unknown admin access action.' });
  } catch (error: any) {
    console.error('adminAccess error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Admin access request failed.',
    });
  }
}
