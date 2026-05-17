import type { User as FirebaseUser } from 'firebase/auth';
export const ADMIN_COLLECTION = 'admin';
export const ADMIN_ROLE = 'admin';

export type VerifiedAdminRecord = {
  uid: string;
  email: string;
  role: typeof ADMIN_ROLE;
};

type AdminVerificationAttempt = {
  source: string;
  message: string;
};

type AdminVerificationOptions = {
  throwOnFailure?: boolean;
};

export class AdminVerificationError extends Error {
  uid: string;
  email: string;
  attempts: AdminVerificationAttempt[];

  constructor(uid: string, email: string, attempts: AdminVerificationAttempt[]) {
    const attemptSummary = attempts.map(attempt => `${attempt.source}: ${attempt.message}`).join(' | ');
    super(`Admin verification failed for signed-in Firebase user uid="${uid}", email="${email}". ${attemptSummary}`);
    this.name = 'AdminVerificationError';
    this.uid = uid;
    this.email = email;
    this.attempts = attempts;
  }
}

const cleanString = (value: unknown) => String(value || '').trim();
const normalizeEmail = (value: unknown) => cleanString(value).toLowerCase();

const getErrorMessage = (error: unknown) => {
  const code = typeof error === 'object' && error && 'code' in error
    ? String((error as { code?: unknown }).code)
    : '';
  const message = error instanceof Error
    ? error.message
    : typeof error === 'object' && error && 'message' in error
      ? String((error as { message?: unknown }).message)
      : String(error || 'Unknown error');

  if (code === 'permission-denied') {
    return 'Client Firestore read was denied by security rules for admin/{uid}.';
  }

  return code ? `${code}: ${message}` : message;
};

const validateAdminRecord = (
  data: Record<string, unknown>,
  uid: string,
  email: string
): VerifiedAdminRecord | null => {
  const documentUid = cleanString(data.uid || uid);
  const documentEmail = normalizeEmail(data.email);
  const documentRole = cleanString(data.role).toLowerCase();

  if (
    documentUid !== uid ||
    documentEmail !== normalizeEmail(email) ||
    documentRole !== ADMIN_ROLE
  ) {
    return null;
  }

  return {
    uid,
    email: documentEmail,
    role: ADMIN_ROLE,
  };
};

const verifyViaApi = async (firebaseUser: FirebaseUser) => {
  const token = await firebaseUser.getIdToken();
  const response = await fetch('/api/adminAuth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false || !data?.admin) {
    throw new Error(`/api/adminAuth returned HTTP ${response.status}: ${String(data?.error || response.statusText || 'Admin verification failed.')}`);
  }

  const adminRecord = validateAdminRecord(
    data.user as Record<string, unknown>,
    firebaseUser.uid,
    firebaseUser.email || ''
  );

  if (!adminRecord) {
    throw new Error('/api/adminAuth succeeded, but the returned admin payload did not match this signed-in Firebase account.');
  }

  return adminRecord;
};

export const verifyFirebaseAdminUser = async (
  firebaseUser: FirebaseUser,
  options: AdminVerificationOptions = {}
) => {
  if (!firebaseUser.uid || !firebaseUser.email) {
    return null;
  }

  const attempts: AdminVerificationAttempt[] = [];

  try {
    return await verifyViaApi(firebaseUser);
  } catch (error) {
    attempts.push({
      source: 'Server API /api/adminAuth',
      message: getErrorMessage(error),
    });
    console.warn('API admin verification failed:', error);
    if (options.throwOnFailure) {
      throw new AdminVerificationError(firebaseUser.uid, firebaseUser.email, attempts);
    }
  }

  return null;
};
