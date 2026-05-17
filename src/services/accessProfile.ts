import type { User as FirebaseUser } from 'firebase/auth';

export type AccessProfile = {
  isPremium: boolean;
  premiumPlan: 'monthly' | 'yearly' | 'granted' | null;
  premiumSince: string | null;
  freeAccessGranted: boolean;
};

export const fetchAccessProfile = async (firebaseUser: FirebaseUser): Promise<AccessProfile | null> => {
  const token = await firebaseUser.getIdToken();
  const response = await fetch('/api/accessProfile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    return null;
  }

  return data.access || null;
};
