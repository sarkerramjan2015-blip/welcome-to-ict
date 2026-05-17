import { getFirebaseAuth } from '../lib/firebase';

export type AdminFreeAccessGrant = {
  uid: string;
  email: string;
  isPremium: boolean;
  premiumPlan: string | null;
  freeAccessGranted: boolean;
  freeAccessGrantedAt: string | null;
  freeAccessGrantedBy: string | null;
  freeAccessGrantReason: string | null;
  accessRevokedAt: string | null;
  accessRevokedBy: string | null;
  pending: boolean;
};

const getAdminToken = async () => {
  const auth = await getFirebaseAuth();
  const token = await auth?.currentUser?.getIdToken();
  if (!token) {
    throw new Error('Firebase admin session expired. Please log in again.');
  }
  return token;
};

const requestAdminAccess = async <T>(init?: RequestInit): Promise<T> => {
  const token = await getAdminToken();
  const response = await fetch('/api/adminAccess', {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    throw new Error(String(data?.error || response.statusText || 'Admin access request failed.'));
  }

  return data as T;
};

export const fetchAdminFreeAccessGrants = async () => {
  const data = await requestAdminAccess<{ grants: AdminFreeAccessGrant[] }>();
  return data.grants || [];
};

export const grantAdminFreeAccess = async (email: string, reason: string) => {
  const data = await requestAdminAccess<{ grant: AdminFreeAccessGrant }>({
    method: 'POST',
    body: JSON.stringify({ action: 'grant', email, reason }),
  });
  return data.grant;
};

export const revokeAdminFreeAccess = async (grant: Pick<AdminFreeAccessGrant, 'uid' | 'email' | 'pending'>) => {
  const data = await requestAdminAccess<{ grant: AdminFreeAccessGrant }>({
    method: 'POST',
    body: JSON.stringify({
      action: 'revoke',
      ...(grant.pending ? { email: grant.email } : { uid: grant.uid }),
    }),
  });
  return data.grant;
};
