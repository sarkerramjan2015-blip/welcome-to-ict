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

const stripWrappingQuotes = (value: string) => {
  const trimmed = value.trim();
  const first = trimmed[0];
  const last = trimmed[trimmed.length - 1];

  if ((first === '"' || first === "'") && first === last) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
};

const normalizePrivateKey = (value: unknown) =>
  stripWrappingQuotes(cleanString(value))
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n');

const normalizeServiceAccount = (value: Record<string, any>) => ({
  projectId: cleanString(value.projectId || value.project_id),
  clientEmail: cleanString(value.clientEmail || value.client_email),
  privateKey: normalizePrivateKey(value.privateKey || value.private_key),
});

const parseServiceAccountJson = (value: string) => {
  const parsed = JSON.parse(stripWrappingQuotes(value));
  return normalizeServiceAccount(parsed);
};

const getFirebaseServiceAccount = () => {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccount) {
    return parseServiceAccountJson(serviceAccount);
  }

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (serviceAccountPath) {
    const resolvedPath = path.resolve(stripWrappingQuotes(serviceAccountPath));
    return parseServiceAccountJson(fs.readFileSync(resolvedPath, 'utf8'));
  }

  const projectId = cleanString(process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID);
  const clientEmail = cleanString(process.env.FIREBASE_CLIENT_EMAIL);
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

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

// Firebase auth error codes that indicate the client must obtain a fresh token.
const TOKEN_EXPIRED_CODES = new Set([
  'auth/id-token-expired',
  'auth/id-token-revoked',
  'auth/argument-error',
  'auth/invalid-id-token',
  'auth/user-disabled',
]);

export const verifyRequest = async (req: any) => {
  const token = getBearerToken(req);
  if (!token) {
    throw httpError(401, 'Firebase login is required.');
  }

  try {
    return await getAdminAuth().verifyIdToken(token);
  } catch (err: any) {
    const code = String(err?.errorInfo?.code || err?.code || '');
    if (TOKEN_EXPIRED_CODES.has(code)) {
      throw httpError(401, 'Your login session has expired. Please refresh the page and try again.');
    }
    throw err;
  }
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
