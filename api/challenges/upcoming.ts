import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const getFirebaseServiceAccount = () => {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccount) {
    return JSON.parse(serviceAccount.replace(/\n/g, '\\n'));
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return {
    projectId,
    clientEmail,
    privateKey,
  };
};

const getAdminDb = () => {
  const serviceAccount = getFirebaseServiceAccount();
  if (!serviceAccount) {
    return null;
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  return getFirestore();
};

const parseScheduleDate = (value: unknown): string | null => {
  if (!value) return null;

  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate?: unknown }).toDate === 'function') {
    const date = (value as { toDate: () => Date }).toDate();
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const parseSyllabus = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(item => String(item).trim()).filter(Boolean);
      }
    } catch {}

    return value.split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
  }

  return [];
};

const normalizeChallenge = (id: string, data: Record<string, any>) => {
  const startsAt = parseScheduleDate(data.startsAt);
  if (!startsAt || new Date(startsAt).getTime() < Date.now()) {
    return null;
  }

  const status = String(data.status || 'LIVE').toUpperCase();
  if (!['LIVE', 'PUBLISHED', 'APPROVED'].includes(status)) {
    return null;
  }

  return {
    id,
    title: String(data.title || 'HSC ICT Monthly Quiz Exam').trim(),
    month: String(data.month || new Date(startsAt).toLocaleString('en-US', { month: 'long', timeZone: 'Asia/Dhaka' })),
    year: Number(data.year || new Date(startsAt).getFullYear()),
    fee: Number(data.fee ?? 20),
    startsAt,
    endsAt: parseScheduleDate(data.endsAt),
    syllabus: parseSyllabus(data.syllabus),
    totalMarks: Number(data.totalMarks || data.questionCount || 30),
    durationMinutes: Number(data.durationMinutes || 30),
    status,
  };
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const adminDb = getAdminDb();
    if (!adminDb) {
      return res.status(200).json([]);
    }

    const snapshot = await adminDb.collection('megaChallenges').get();
    const challenges = snapshot.docs
      .filter(item => item.id !== 'current')
      .map(item => normalizeChallenge(item.id, item.data()))
      .filter(Boolean)
      .sort((a: any, b: any) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

    return res.status(200).json(challenges);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to fetch upcoming quiz routines:', error);
    }
    return res.status(200).json([]);
  }
}
