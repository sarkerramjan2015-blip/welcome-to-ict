import type { UserRecord } from 'firebase-admin/auth';
import { getAdminAuth, requireAdmin, verifyRequest } from '../src/server/firebaseAdminAccess.js';

const DEFAULT_ANALYTICS_DASHBOARD_URL = 'https://analytics.google.com/analytics/web/';

type RecentAuthUser = {
  uid: string;
  email: string;
  lastLoginAt: string | null;
  createdAt: string | null;
  activityAt: string | null;
  disabled: boolean;
};

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

const toIsoDate = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const toTime = (value?: string | null) => {
  const isoDate = toIsoDate(value);
  return isoDate ? new Date(isoDate).getTime() : 0;
};

const getDhakaDateKey = (value: Date | string | null | undefined) => {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

const serializeUser = (user: UserRecord): RecentAuthUser => {
  const lastLoginAt = toIsoDate(user.metadata.lastSignInTime);
  const createdAt = toIsoDate(user.metadata.creationTime);
  const activityAt = lastLoginAt || createdAt;

  return {
    uid: user.uid,
    email: user.email || 'No email',
    lastLoginAt,
    createdAt,
    activityAt,
    disabled: user.disabled,
  };
};

const getAuthActivity = async () => {
  const auth = getAdminAuth();
  const todayKey = getDhakaDateKey(new Date());
  const users: RecentAuthUser[] = [];
  let pageToken: string | undefined;
  let totalUsers = 0;
  let activeToday = 0;
  let newSignupsToday = 0;

  do {
    const page = await auth.listUsers(1000, pageToken);

    for (const authUser of page.users) {
      totalUsers += 1;

      if (getDhakaDateKey(authUser.metadata.lastSignInTime) === todayKey) {
        activeToday += 1;
      }

      if (getDhakaDateKey(authUser.metadata.creationTime) === todayKey) {
        newSignupsToday += 1;
      }

      users.push(serializeUser(authUser));
    }

    pageToken = page.pageToken;
  } while (pageToken);

  const recentUsers = users
    .sort((a, b) => toTime(b.activityAt) - toTime(a.activityAt))
    .slice(0, 10);

  return {
    totalUsers,
    activeToday,
    newSignupsToday,
    recentUsers,
  };
};

export default async function adminActivity(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return json(res, 405, { success: false, error: 'Method not allowed.' });
    }

    const decoded = await verifyRequest(req);
    await requireAdmin(decoded);

    const activity = await getAuthActivity();

    return json(res, 200, {
      success: true,
      analyticsDashboardUrl:
        process.env.GA_DASHBOARD_URL ||
        process.env.VITE_GA_DASHBOARD_URL ||
        DEFAULT_ANALYTICS_DASHBOARD_URL,
      ...activity,
    });
  } catch (error: any) {
    console.error('adminActivity error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Admin activity tracking failed.',
    });
  }
}
