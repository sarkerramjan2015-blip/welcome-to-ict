import { getFirebaseIdToken } from './manualPayment';

export type RecentAdminActivityUser = {
  uid: string;
  email: string;
  lastLoginAt: string | null;
  createdAt: string | null;
  activityAt: string | null;
  disabled: boolean;
};

export type AdminActivitySummary = {
  totalUsers: number;
  activeToday: number;
  newSignupsToday: number;
  analyticsDashboardUrl: string;
  recentUsers: RecentAdminActivityUser[];
};

export const fetchAdminActivity = async () => {
  const token = await getFirebaseIdToken();
  if (!token) {
    throw new Error('Firebase login token is missing. Please log out and sign in as admin again.');
  }

  const response = await fetch('/api/adminActivity', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const rawText = await response.text().catch(() => '');
  let data: Record<string, any> = {};

  if (rawText) {
    try {
      data = JSON.parse(rawText);
    } catch {
      data = {};
    }
  }

  if (!response.ok || data?.success === false) {
    throw new Error(String(
      data?.error ||
      data?.message ||
      rawText ||
      `Admin activity tracking failed with HTTP ${response.status}.`
    ));
  }

  return data as AdminActivitySummary & { success: true };
};
