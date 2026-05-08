import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, httpError, isAdminToken, verifyRequest } from '../src/server/firebaseAdminAccess.js';

type FullQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topicId: string;
  chapterId: string;
  order: number;
};

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

const parseBody = (body: unknown) => {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body as Record<string, any>;
};

const cleanString = (value: unknown) => String(value || '').trim();

const queryValue = (req: any, key: string) => {
  const value = req.query?.[key];
  if (Array.isArray(value)) return cleanString(value[0]);
  return cleanString(value);
};

const parseOptions = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(option => cleanString(option)).filter(Boolean).slice(0, 4);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(option => cleanString(option)).filter(Boolean).slice(0, 4);
      }
    } catch {}

    return value.split(/\r?\n|,/).map(option => option.trim()).filter(Boolean).slice(0, 4);
  }

  return [];
};

const getNextDayNinePmDhaka = (value: Date) => {
  const dhakaDate = new Date(value.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
  dhakaDate.setDate(dhakaDate.getDate() + 1);
  dhakaDate.setHours(21, 0, 0, 0);

  const yyyy = dhakaDate.getFullYear();
  const mm = String(dhakaDate.getMonth() + 1).padStart(2, '0');
  const dd = String(dhakaDate.getDate()).padStart(2, '0');
  return new Date(`${yyyy}-${mm}-${dd}T21:00:00+06:00`).toISOString();
};

const normalizeQuestion = (id: string, data: Record<string, any>, index = 0): FullQuestion | null => {
  const question = cleanString(data.question || data.q);
  const options = parseOptions(data.options);
  const correctAnswer = cleanString(data.correctAnswer || data.correct || data.answer);

  if (!question || options.length < 2 || !correctAnswer) {
    return null;
  }

  return {
    id: cleanString(data.id) || id,
    question,
    options,
    correctAnswer,
    explanation: cleanString(data.explanation),
    topicId: cleanString(data.topicId),
    chapterId: cleanString(data.chapterId),
    order: Number(data.order || index + 1),
  };
};

const toSafeQuestion = (question: FullQuestion) => ({
  id: question.id,
  question: question.question,
  options: question.options,
  topicId: question.topicId,
  chapterId: question.chapterId,
  order: question.order,
});

const getChallengeQuestions = async (challengeId: string) => {
  const db = getAdminDb();
  const challengeRef = db.collection('megaChallenges').doc(challengeId);
  const challengeSnap = await challengeRef.get();

  if (!challengeSnap.exists) {
    throw httpError(404, 'This quiz is not available yet.');
  }

  const subcollectionSnap = await challengeRef.collection('questions').get();
  const subcollectionQuestions = subcollectionSnap.docs
    .map((item, index) => normalizeQuestion(item.id, item.data(), index))
    .filter((item): item is FullQuestion => Boolean(item))
    .sort((a, b) => a.order - b.order);

  if (subcollectionQuestions.length) {
    return {
      challenge: challengeSnap.data() || {},
      questions: subcollectionQuestions,
    };
  }

  const data = challengeSnap.data() || {};
  const embeddedQuestions = Array.isArray(data.questions)
    ? data.questions
        .map((item: Record<string, any>, index: number) => normalizeQuestion(cleanString(item.id) || `q-${index + 1}`, item, index))
        .filter((item: FullQuestion | null): item is FullQuestion => Boolean(item))
    : [];

  return {
    challenge: data,
    questions: embeddedQuestions,
  };
};

const assertCanAccessChallenge = async (uid: string, challengeId: string, adminBypass: boolean) => {
  if (adminBypass) return;

  const db = getAdminDb();
  const studentSnap = await db.collection('students').doc(uid).get();
  const student = studentSnap.data() || {};
  const enrolledChallenges = Array.isArray(student.enrolledChallenges) ? student.enrolledChallenges.map(cleanString) : [];

  if (student.isPremium || enrolledChallenges.includes(challengeId)) {
    return;
  }

  const enrollmentSnap = await studentSnap.ref.collection('challengeEnrollments').doc(challengeId).get();
  const enrollment = enrollmentSnap.data() || {};

  if (cleanString(enrollment.paymentStatus).toUpperCase() === 'PAID') {
    return;
  }

  throw httpError(403, 'Quiz access requires an approved payment or premium account.');
};

const handleGetQuestions = async (req: any, res: any) => {
  const decoded = await verifyRequest(req);
  const challengeId = queryValue(req, 'challengeId');
  if (!challengeId) throw httpError(400, 'Challenge ID is required.');

  const adminBypass = await isAdminToken(decoded);
  await assertCanAccessChallenge(decoded.uid, challengeId, adminBypass);

  const { challenge, questions } = await getChallengeQuestions(challengeId);
  if (!questions.length) {
    throw httpError(404, 'No questions have been published for this quiz yet.');
  }

  return json(res, 200, {
    success: true,
    challengeId,
    durationMinutes: Number(challenge.durationMinutes || 30),
    questions: questions.map(toSafeQuestion),
  });
};

const handleSubmit = async (req: any, res: any) => {
  const decoded = await verifyRequest(req);
  const body = parseBody(req.body);
  const challengeId = cleanString(body.challengeId);
  const answers = (body.answers || {}) as Record<string, string>;

  if (!challengeId) throw httpError(400, 'Challenge ID is required.');
  if (!answers || typeof answers !== 'object') throw httpError(400, 'Answers are required.');

  const adminBypass = await isAdminToken(decoded);
  await assertCanAccessChallenge(decoded.uid, challengeId, adminBypass);

  const { questions } = await getChallengeQuestions(challengeId);
  if (!questions.length) {
    throw httpError(404, 'No questions have been published for this quiz yet.');
  }

  const normalizedAnswers = new Map(
    Object.entries(answers).map(([key, value]) => [cleanString(key), cleanString(value)])
  );
  const score = questions.reduce((total, question) => (
    normalizedAnswers.get(question.id) === question.correctAnswer ? total + 1 : total
  ), 0);

  const db = getAdminDb();
  const submittedAt = new Date();
  const resultVisibleAt = getNextDayNinePmDhaka(submittedAt);
  const resultPayload = {
    userId: decoded.uid,
    email: decoded.email || null,
    name: cleanString((decoded as any).name) || cleanString(decoded.email).split('@')[0],
    challengeId,
    score,
    total: questions.length,
    answers: Object.fromEntries(normalizedAnswers),
    resultStatus: adminBypass ? 'published' : 'pending',
    published: adminBypass,
    resultVisibleAt,
    ...(adminBypass ? { publishedAt: FieldValue.serverTimestamp() } : {}),
    submittedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const batch = db.batch();
  batch.set(
    db.collection('students').doc(decoded.uid).collection('challengeEnrollments').doc(challengeId),
    {
      score: adminBypass ? score : null,
      paymentStatus: 'PAID',
      resultStatus: adminBypass ? 'published' : 'pending',
      resultVisibleAt,
      updatedAt: FieldValue.serverTimestamp(),
      submittedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  batch.set(
    db.collection('challengeResults').doc(`${decoded.uid}_${challengeId}`),
    resultPayload,
    { merge: true }
  );
  await batch.commit();

  return json(res, 200, {
    success: true,
    ...(adminBypass ? { score } : {}),
    total: questions.length,
    published: adminBypass,
    resultStatus: adminBypass ? 'published' : 'pending',
    resultVisibleAt,
    message: adminBypass
      ? 'Result published.'
      : 'Exam submitted. Result will be published after admin approval.',
  });
};

export default async function challengeExam(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      return await handleGetQuestions(req, res);
    }

    if (req.method === 'POST') {
      return await handleSubmit(req, res);
    }

    res.setHeader('Allow', 'GET, POST');
    return json(res, 405, { success: false, error: 'Method not allowed.' });
  } catch (error: any) {
    console.error('challengeExam error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Quiz exam request failed.',
    });
  }
}
