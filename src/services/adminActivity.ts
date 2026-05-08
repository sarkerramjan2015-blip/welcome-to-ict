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
  const response = await fetch('/api/adminActivity', {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    throw new Error(String(data?.error || data?.message || 'Admin activity tracking failed.'));
  }

  return data as AdminActivitySummary & { success: true };
};
