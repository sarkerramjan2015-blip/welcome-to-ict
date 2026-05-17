import { getAdminDb, requireAdmin, verifyRequest } from '../src/server/firebaseAdminAccess.js';

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

const cleanString = (value: unknown) => String(value || '').trim();

const toIsoDate = (value: any): string | null => {
  if (!value) return null;
  if (typeof value?.toDate === 'function') return value.toDate().toISOString();
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const toTime = (value: any) => {
  const iso = toIsoDate(value);
  return iso ? new Date(iso).getTime() : 0;
};

const serializeDoc = (doc: any) => {
  const data = doc.data() || {};
  return {
    id: doc.id,
    ...Object.fromEntries(
      Object.entries(data).map(([key, value]: [string, any]) => [
        key,
        typeof value?.toDate === 'function' ? value.toDate().toISOString() : value,
      ])
    ),
  } as Record<string, any>;
};

type StudentAccumulator = {
  uid: string;
  email: string;
  name: string;
  phone: string;
  topicsVisited: Set<string>;
  topicsCompleted: Set<string>;
  totalVisits: number;
  practiceAttempts: number;
  accuracyTotal: number;
  bestAccuracy: number;
  lastStudyAt: string | null;
  lastAttemptAt: string | null;
  lastTopicTitle: string;
  topicAttempts: Map<string, { title: string; totalAccuracy: number; attempts: number }>;
  recentAttempts: Array<{
    id: string;
    topicId: string;
    topicTitle: string;
    accuracy: number;
    score: number;
    total: number;
    completedAt: string | null;
  }>;
};

const makeStudent = (uid: string): StudentAccumulator => ({
  uid,
  email: '',
  name: '',
  phone: '',
  topicsVisited: new Set(),
  topicsCompleted: new Set(),
  totalVisits: 0,
  practiceAttempts: 0,
  accuracyTotal: 0,
  bestAccuracy: 0,
  lastStudyAt: null,
  lastAttemptAt: null,
  lastTopicTitle: '',
  topicAttempts: new Map(),
  recentAttempts: [],
});

const preferLatest = (current: string | null, candidate: string | null) =>
  toTime(candidate) > toTime(current) ? candidate : current;

export default async function adminPracticeProgress(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return json(res, 405, { success: false, error: 'Method not allowed.' });
    }

    const decoded = await verifyRequest(req);
    await requireAdmin(decoded);

    const db = getAdminDb();
    const [progressSnapshot, attemptSnapshot, studentSnapshot] = await Promise.all([
      db.collection('studentTopicProgress').get(),
      db.collection('practiceExamAttempts').get(),
      db.collection('students').get(),
    ]);
    const studentProfiles = new Map(studentSnapshot.docs.map(doc => [doc.id, serializeDoc(doc)]));
    const students = new Map<string, StudentAccumulator>();

    const touch = (uid: string) => {
      if (!students.has(uid)) {
        students.set(uid, makeStudent(uid));
      }
      return students.get(uid)!;
    };

    progressSnapshot.docs.map(serializeDoc).forEach(progress => {
      const uid = cleanString(progress.userId);
      if (!uid) return;
      const student = touch(uid);
      student.email = student.email || cleanString(progress.email);
      student.name = student.name || cleanString(progress.name);
      student.phone = student.phone || cleanString(progress.phone);
      student.topicsVisited.add(cleanString(progress.topicId));
      if (progress.completed) {
        student.topicsCompleted.add(cleanString(progress.topicId));
      }
      student.totalVisits += Number(progress.visitCount || 0);
      student.lastStudyAt = preferLatest(student.lastStudyAt, toIsoDate(progress.lastVisitedAt || progress.completedAt));
      if (toTime(progress.lastVisitedAt || progress.completedAt) >= toTime(student.lastStudyAt)) {
        student.lastTopicTitle = cleanString(progress.topicTitle) || student.lastTopicTitle;
      }
    });

    attemptSnapshot.docs.map(serializeDoc).forEach(attempt => {
      const uid = cleanString(attempt.userId);
      if (!uid) return;
      const student = touch(uid);
      const accuracy = Number(attempt.accuracy || 0);
      const topicId = cleanString(attempt.topicId);
      const topicTitle = cleanString(attempt.topicTitle);
      const completedAt = toIsoDate(attempt.completedAt);
      student.email = student.email || cleanString(attempt.email);
      student.name = student.name || cleanString(attempt.name);
      student.phone = student.phone || cleanString(attempt.phone);
      student.practiceAttempts += 1;
      student.accuracyTotal += accuracy;
      student.bestAccuracy = Math.max(student.bestAccuracy, accuracy);
      student.lastAttemptAt = preferLatest(student.lastAttemptAt, completedAt);
      student.lastTopicTitle = toTime(completedAt) >= toTime(student.lastStudyAt)
        ? topicTitle || student.lastTopicTitle
        : student.lastTopicTitle;
      student.recentAttempts.push({
        id: cleanString(attempt.id),
        topicId,
        topicTitle,
        accuracy,
        score: Number(attempt.score || 0),
        total: Number(attempt.total || 0),
        completedAt,
      });

      const topicSummary = student.topicAttempts.get(topicId) || {
        title: topicTitle,
        totalAccuracy: 0,
        attempts: 0,
      };
      topicSummary.totalAccuracy += accuracy;
      topicSummary.attempts += 1;
      student.topicAttempts.set(topicId, topicSummary);
    });

    studentProfiles.forEach((profile, uid) => {
      const student = students.get(uid);
      if (!student) return;
      student.email = cleanString(profile.email) || student.email;
      student.name = cleanString(profile.name) || student.name;
      student.phone = cleanString(profile.phone) || student.phone;
    });

    const rows = [...students.values()].map(student => {
      const weakestTopic = [...student.topicAttempts.values()]
        .map(topic => ({
          title: topic.title,
          averageAccuracy: topic.attempts ? Math.round(topic.totalAccuracy / topic.attempts) : 0,
        }))
        .sort((a, b) => a.averageAccuracy - b.averageAccuracy)[0] || null;

      const averageAccuracy = student.practiceAttempts
        ? Math.round(student.accuracyTotal / student.practiceAttempts)
        : 0;
      const lastActivityAt = preferLatest(student.lastStudyAt, student.lastAttemptAt);

      return {
        uid: student.uid,
        email: student.email || 'No email',
        name: student.name || student.email.split('@')[0] || 'ICT Student',
        phone: student.phone || null,
        topicsVisited: student.topicsVisited.size,
        topicsCompleted: student.topicsCompleted.size,
        totalVisits: student.totalVisits,
        practiceAttempts: student.practiceAttempts,
        averageAccuracy,
        bestAccuracy: student.bestAccuracy,
        lastStudyAt: student.lastStudyAt,
        lastAttemptAt: student.lastAttemptAt,
        lastActivityAt,
        lastTopicTitle: student.lastTopicTitle || null,
        weakestTopic,
        recentAttempts: student.recentAttempts
          .sort((a, b) => toTime(b.completedAt) - toTime(a.completedAt))
          .slice(0, 3),
      };
    }).sort((a, b) => toTime(b.lastActivityAt) - toTime(a.lastActivityAt));

    const practiceAttempts = rows.reduce((sum, item) => sum + item.practiceAttempts, 0);
    const weightedAccuracyTotal = rows.reduce((sum, item) => sum + item.averageAccuracy * item.practiceAttempts, 0);

    return json(res, 200, {
      success: true,
      summary: {
        trackedStudents: rows.length,
        studiedTopics: rows.reduce((sum, item) => sum + item.topicsVisited, 0),
        completedTopics: rows.reduce((sum, item) => sum + item.topicsCompleted, 0),
        practiceAttempts,
        averageAccuracy: practiceAttempts ? Math.round(weightedAccuracyTotal / practiceAttempts) : 0,
      },
      students: rows,
    });
  } catch (error: any) {
    console.error('adminPracticeProgress error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Admin practice progress request failed.',
    });
  }
}
