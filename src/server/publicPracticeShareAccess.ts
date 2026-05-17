import { getAdminAuth, getAdminDb } from './firebaseAdminAccess.js';

export type PublicPracticeResult = {
  attemptId: string;
  userId: string;
  name: string;
  profileImage: string | null;
  topicId: string;
  topicTitle: string;
  chapterTitle: string;
  score: number;
  total: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  wrongPercent: number;
  completedAt: string | null;
};

const cleanString = (value: unknown) => String(value || '').trim();

const toIsoDate = (value: any): string | null => {
  if (!value) return null;
  if (typeof value?.toDate === 'function') return value.toDate().toISOString();
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

export const getPublicPracticeResult = async (attemptId: string): Promise<PublicPracticeResult | null> => {
  const normalizedAttemptId = cleanString(attemptId);
  if (!normalizedAttemptId) return null;

  const snapshot = await getAdminDb().collection('practiceExamAttempts').doc(normalizedAttemptId).get();
  if (!snapshot.exists) return null;

  const data = snapshot.data() || {};
  const userId = cleanString(data.userId);
  const storedProfileImage = cleanString(data.profileImage);
  const studentProfileSnap = userId && !storedProfileImage
    ? await getAdminDb().collection('students').doc(userId).get()
    : null;
  const authProfile = userId && !storedProfileImage && !cleanString(studentProfileSnap?.data()?.profileImage)
    ? await getAdminAuth().getUser(userId).catch(() => null)
    : null;
  const name =
    cleanString(data.name) ||
    cleanString(data.email).split('@')[0] ||
    'ICT Student';

  return {
    attemptId: snapshot.id,
    userId,
    name,
    profileImage:
      storedProfileImage ||
      cleanString(studentProfileSnap?.data()?.profileImage) ||
      cleanString(authProfile?.photoURL) ||
      null,
    topicId: cleanString(data.topicId),
    topicTitle: cleanString(data.topicTitle) || 'Daily Topic Practice Exam',
    chapterTitle: cleanString(data.chapterTitle) || 'HSC ICT',
    score: Number(data.score || 0),
    total: Number(data.total || 0),
    correctCount: Number(data.correctCount || 0),
    wrongCount: Number(data.wrongCount || 0),
    accuracy: Number(data.accuracy || 0),
    wrongPercent: Number(data.wrongPercent || 0),
    completedAt: toIsoDate(data.completedAt),
  };
};
