import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, httpError, requireAdmin, verifyRequest } from '../src/server/firebaseAdminAccess.js';

type QuizQuestion = {
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

const toIsoDate = (value: any): string | null => {
  if (!value) return null;
  if (typeof value?.toDate === 'function') {
    return value.toDate().toISOString();
  }

  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const serializeValue = (value: any): any => {
  if (!value) return value;
  if (typeof value.toDate === 'function') return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(serializeValue);
  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, serializeValue(nested)])
    );
  }
  return value;
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

const normalizeQuestion = (id: string, data: Record<string, any>, index = 0): QuizQuestion | null => {
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

const normalizeEditableQuestion = (value: Record<string, any>): QuizQuestion => {
  const id = cleanString(value.id);
  const question = cleanString(value.question || value.q);
  const options = parseOptions(value.options);
  const correctAnswer = cleanString(value.correctAnswer || value.correct || value.answer);

  if (!id) throw httpError(400, 'Question ID is required.');
  if (!question) throw httpError(400, 'Question text is required.');
  if (options.length < 2) throw httpError(400, 'At least two options are required.');
  if (!correctAnswer) throw httpError(400, 'Correct answer is required.');
  if (!options.includes(correctAnswer)) {
    throw httpError(400, 'Correct answer must exactly match one of the options.');
  }

  return {
    id,
    question,
    options,
    correctAnswer,
    explanation: cleanString(value.explanation),
    topicId: cleanString(value.topicId),
    chapterId: cleanString(value.chapterId),
    order: Number(value.order || 0),
  };
};

const resolveChallengeSnapshot = async (challengeId: string) => {
  const db = getAdminDb();
  const challengeRef = db.collection('megaChallenges').doc(challengeId);
  const challengeSnap = await challengeRef.get();

  if (challengeSnap.exists) {
    return { challengeRef, challengeSnap, logicalId: challengeSnap.id };
  }

  const currentRef = db.collection('megaChallenges').doc('current');
  const currentSnap = await currentRef.get();
  if (currentSnap.exists && cleanString(currentSnap.data()?.currentChallengeId) === challengeId) {
    return { challengeRef: currentRef, challengeSnap: currentSnap, logicalId: challengeId };
  }

  throw httpError(404, `No quiz routine was found for ${challengeId}.`);
};

const getChallengeQuestions = async (challengeId: string) => {
  const { challengeRef, challengeSnap, logicalId } = await resolveChallengeSnapshot(challengeId);

  const subcollectionSnap = await challengeRef.collection('questions').get();
  const subcollectionQuestions = subcollectionSnap.docs
    .map((item, index) => normalizeQuestion(item.id, item.data(), index))
    .filter((item): item is QuizQuestion => Boolean(item))
    .sort((a, b) => a.order - b.order);

  if (subcollectionQuestions.length) {
    return {
      challenge: {
        id: logicalId,
        ...serializeValue(challengeSnap.data() || {}),
      },
      questions: subcollectionQuestions,
    };
  }

  const embeddedQuestions = Array.isArray(challengeSnap.data()?.questions)
    ? challengeSnap.data()?.questions
        .map((item: Record<string, any>, index: number) => normalizeQuestion(cleanString(item.id) || `q-${index + 1}`, item, index))
        .filter((item: QuizQuestion | null): item is QuizQuestion => Boolean(item))
    : [];

  return {
    challenge: {
      id: logicalId,
      ...serializeValue(challengeSnap.data() || {}),
    },
    questions: embeddedQuestions,
  };
};

const listChallengeSets = async () => {
  const snapshot = await getAdminDb().collection('megaChallenges').get();
  const currentDoc = snapshot.docs.find(item => item.id === 'current');
  const items = await Promise.all(
    snapshot.docs
      .filter(item => item.id !== 'current')
      .map(async item => {
        const data = item.data() || {};
        const questionCount = Number(data.questionCount || (Array.isArray(data.questions) ? data.questions.length : 0));
        const subcollectionSnap = questionCount ? null : await item.ref.collection('questions').limit(100).get();

        return {
          id: item.id,
          title: cleanString(data.title) || 'HSC ICT Monthly Quiz Exam',
          status: cleanString(data.status) || 'DRAFT',
          startsAt: toIsoDate(data.startsAt),
          updatedAt: toIsoDate(data.updatedAt),
          questionCount: questionCount || subcollectionSnap?.size || 0,
        };
      })
  );

  const currentChallengeId = cleanString(currentDoc?.data()?.currentChallengeId);
  if (currentDoc && currentChallengeId && !items.some(item => item.id === currentChallengeId)) {
    const data = currentDoc.data() || {};
    items.push({
      id: currentChallengeId,
      title: cleanString(data.title) || 'HSC ICT Monthly Quiz Exam',
      status: cleanString(data.status) || 'DRAFT',
      startsAt: toIsoDate(data.startsAt),
      updatedAt: toIsoDate(data.updatedAt),
      questionCount: Number(data.questionCount || (Array.isArray(data.questions) ? data.questions.length : 0)),
    });
  }

  if (currentDoc && !currentChallengeId && !items.some(item => item.id === 'current')) {
    const data = currentDoc.data() || {};
    const hasLegacyRoutineData = Boolean(
      cleanString(data.title) ||
      data.startsAt ||
      data.updatedAt ||
      Array.isArray(data.questions)
    );

    if (hasLegacyRoutineData) {
      items.push({
        id: 'current',
        title: cleanString(data.title) || 'HSC ICT Monthly Quiz Exam',
        status: cleanString(data.status) || 'DRAFT',
        startsAt: toIsoDate(data.startsAt),
        updatedAt: toIsoDate(data.updatedAt),
        questionCount: Number(data.questionCount || (Array.isArray(data.questions) ? data.questions.length : 0)),
      });
    }
  }

  return items.sort((a, b) => {
    const aTime = new Date(a.startsAt || a.updatedAt || 0).getTime();
    const bTime = new Date(b.startsAt || b.updatedAt || 0).getTime();
    return bTime - aTime;
  });
};

const updateQuestion = async (body: Record<string, any>) => {
  const challengeId = cleanString(body.challengeId);
  const question = normalizeEditableQuestion(body.question || body);

  if (!challengeId) {
    throw httpError(400, 'Challenge ID is required.');
  }

  const db = getAdminDb();
  const challengeRef = db.collection('megaChallenges').doc(challengeId);
  const challengeSnap = await challengeRef.get();
  if (!challengeSnap.exists) {
    throw httpError(404, `No quiz routine was found for ${challengeId}.`);
  }

  const payload = {
    ...question,
    q: question.question,
    correct: question.correctAnswer,
    updatedAt: FieldValue.serverTimestamp(),
  };

  await challengeRef.collection('questions').doc(question.id).set(
    {
      ...payload,
      challengeId,
    },
    { merge: true }
  );

  const data = challengeSnap.data() || {};
  if (Array.isArray(data.questions)) {
    const nextQuestions = data.questions.map((item: Record<string, any>, index: number) => {
      const existingId = cleanString(item.id) || `q-${index + 1}`;
      return existingId === question.id
        ? {
            ...item,
            ...question,
            q: question.question,
            correct: question.correctAnswer,
          }
        : item;
    });

    await challengeRef.set(
      {
        questions: nextQuestions,
        questionCount: nextQuestions.length,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  } else {
    const questionsSnap = await challengeRef.collection('questions').get();
    await challengeRef.set(
      {
        questionCount: questionsSnap.size,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  const currentSnap = await db.collection('megaChallenges').doc('current').get();
  if (currentSnap.exists && currentSnap.data()?.currentChallengeId === challengeId && Array.isArray(currentSnap.data()?.questions)) {
    const nextCurrentQuestions = currentSnap.data()?.questions.map((item: Record<string, any>, index: number) => {
      const existingId = cleanString(item.id) || `q-${index + 1}`;
      return existingId === question.id
        ? {
            ...item,
            ...question,
            q: question.question,
            correct: question.correctAnswer,
          }
        : item;
    });

    await currentSnap.ref.set(
      {
        questions: nextCurrentQuestions,
        questionCount: nextCurrentQuestions.length,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  return question;
};

export default async function adminQuizQuestions(req: any, res: any) {
  try {
    const decoded = await verifyRequest(req);
    await requireAdmin(decoded);

    if (req.method === 'GET') {
      const challengeId = queryValue(req, 'challengeId');
      if (challengeId) {
        const result = await getChallengeQuestions(challengeId);
        return json(res, 200, { success: true, ...result });
      }

      const challengeSets = await listChallengeSets();
      return json(res, 200, { success: true, challengeSets });
    }

    if (req.method === 'PATCH' || req.method === 'POST') {
      const question = await updateQuestion(parseBody(req.body));
      return json(res, 200, { success: true, question });
    }

    res.setHeader('Allow', 'GET, PATCH, POST');
    return json(res, 405, { success: false, error: 'Method not allowed.' });
  } catch (error: any) {
    console.error('adminQuizQuestions error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Admin quiz question request failed.',
    });
  }
}
