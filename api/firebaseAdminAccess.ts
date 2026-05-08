import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'node:fs';
import path from 'node:path';

export const ADMIN_COLLECTION = 'admin';
export const ADMIN_ROLE = 'admin';

type VerifiedAdmin = {
  uid: string;
  email: string;
  role: typeof ADMIN_ROLE;
};

export const httpError = (status: number, message: string) =>
  Object.assign(new Error(message), { status });

const cleanString = (value: unknown) => String(value || '').trim();
const normalizeEmail = (value: unknown) => cleanString(value).toLowerCase();

const getFirebaseServiceAccount = () => {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccount) {
    const parsed = JSON.parse(serviceAccount);
    if (parsed.private_key) {
      parsed.private_key = String(parsed.private_key).replace(/\\n/g, '\n');
    }
    return parsed;
  }

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (serviceAccountPath) {
    const resolvedPath = path.resolve(serviceAccountPath);
    const parsed = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
    if (parsed.private_key) {
      parsed.private_key = String(parsed.private_key).replace(/\\n/g, '\n');
    }
    return parsed;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw httpError(
      500,
      'Missing Firebase Admin credentials. Set FIREBASE_SERVICE_ACCOUNT_KEY, FIREBASE_SERVICE_ACCOUNT_PATH, GOOGLE_APPLICATION_CREDENTIALS, or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.'
    );
  }

  return {
    projectId,
    clientEmail,
    privateKey,
  };
};

export const getAdminApp = (): App => {
  if (!getApps().length) {
    initializeApp({
      credential: cert(getFirebaseServiceAccount()),
    });
  }

  return getApps()[0];
};

export const getAdminDb = () => getFirestore(getAdminApp());
export const getAdminAuth = () => getAuth(getAdminApp());

const getBearerToken = (req: any) => {
  const header = String(req.headers?.authorization || req.headers?.Authorization || '');
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || '';
};

export const verifyRequest = async (req: any) => {
  const token = getBearerToken(req);
  if (!token) {
    throw httpError(401, 'Firebase login is required.');
  }

  return getAdminAuth().verifyIdToken(token);
};

export const getVerifiedAdmin = async (decoded: DecodedIdToken): Promise<VerifiedAdmin | null> => {
  const uid = cleanString(decoded.uid);
  const decodedEmail = normalizeEmail(decoded.email);

  if (!uid || !decodedEmail) {
    return null;
  }

  const snapshot = await getAdminDb().collection(ADMIN_COLLECTION).doc(uid).get();

  if (!snapshot.exists) {
    return null;
  }

  const data = snapshot.data() || {};
  const documentUid = cleanString(data.uid || snapshot.id);
  const documentEmail = normalizeEmail(data.email);
  const documentRole = cleanString(data.role).toLowerCase();

  if (
    snapshot.id !== uid ||
    documentUid !== uid ||
    documentEmail !== decodedEmail ||
    documentRole !== ADMIN_ROLE
  ) {
    return null;
  }

  return {
    uid,
    email: decodedEmail,
    role: ADMIN_ROLE,
  };
};

export const isAdminToken = async (decoded: DecodedIdToken) =>
  Boolean(await getVerifiedAdmin(decoded));

export const requireAdmin = async (decoded: DecodedIdToken) => {
  const admin = await getVerifiedAdmin(decoded);

  if (!admin) {
    throw httpError(403, 'Admin approval is required for this action.');
  }

  return admin;
};
