import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, httpError, requireAdmin, verifyRequest } from '../src/server/firebaseAdminAccess.js';

type AdminAction = 'chapter' | 'topic' | 'mcq' | 'cq' | 'quizQuestion' | 'course' | 'suggestion' | 'challenge';

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

const cleanString = (value: unknown) => String(value || '').trim();
const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};
const parseList = (value: unknown) =>
  cleanString(value)
    .split(/\r?\n/)
    .map(item => item.trim())
    .filter(Boolean);
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
const toIsoDate = (value: unknown) => {
  const date = new Date(cleanString(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
const parseOptions = (form: Record<string, any>) =>
  [form.optionA, form.optionB, form.optionC, form.optionD].map(option => cleanString(option));
const getDhakaMonth = (date: Date) =>
  date.toLocaleString('en-US', { month: 'long', timeZone: 'Asia/Dhaka' });
const getDhakaYear = (date: Date) =>
  Number(date.toLocaleString('en-US', { year: 'numeric', timeZone: 'Asia/Dhaka' }));
const currentChallengeId = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const serializeDoc = (doc: any) => ({
  id: doc.id,
  ...Object.fromEntries(
    Object.entries(doc.data() || {}).map(([key, value]: [string, any]) => [
      key,
      typeof value?.toDate === 'function' ? value.toDate().toISOString() : value,
    ])
  ),
});

const parseStoredOptions = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(option => cleanString(option)).filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(option => cleanString(option)).filter(Boolean);
      }
    } catch {}

    return value.split(/\r?\n|,/).map(option => option.trim()).filter(Boolean);
  }

  return [];
};

const normalizeMcq = (id: string, data: Record<string, any>) => {
  const question = cleanString(data.question || data.q);
  const options = parseStoredOptions(data.options).slice(0, 4);
  const correctAnswer = cleanString(data.correctAnswer || data.correct || data.answer);

  if (!question || options.length < 2 || !correctAnswer) return null;

  return {
    id,
    question,
    q: question,
    options,
    correctAnswer,
    correct: correctAnswer,
    explanation: cleanString(data.explanation),
    topicId: cleanString(data.topicId),
    chapterId: cleanString(data.chapterId),
  };
};

const buildPayload = (action: AdminAction, form: Record<string, any>) => {
  const nowFields = {
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (action === 'chapter') {
    const title = cleanString(form.title);
    if (!title) throw httpError(400, 'Chapter title is required.');
    return {
      title,
      slug: cleanString(form.slug) || slugify(title),
      description: cleanString(form.description),
      order: toNumber(form.order, 1),
      level: cleanString(form.level) || 'HSC ICT',
      status: cleanString(form.status) || 'published',
      ...nowFields,
    };
  }

  if (action === 'topic') {
    const title = cleanString(form.title);
    const chapterId = cleanString(form.chapterId);
    if (!title) throw httpError(400, 'Topic title is required.');
    if (!chapterId) throw httpError(400, 'Chapter ID is required for a topic.');
    return {
      title,
      slug: cleanString(form.slug) || slugify(title),
      chapterId,
      importance: cleanString(form.importance) || 'Medium',
      order: toNumber(form.order, 1),
      board_notes: cleanString(form.board_notes),
      video_url: cleanString(form.video_url),
      ...nowFields,
    };
  }

  if (action === 'mcq') {
    const options = parseOptions(form);
    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(cleanString(form.correctOption));
    const correctAnswer = options[correctIndex];
    if (!cleanString(form.question)) throw httpError(400, 'MCQ question is required.');
    if (options.some(option => !option)) throw httpError(400, 'All four MCQ options are required.');
    if (!correctAnswer) throw httpError(400, 'Correct option is required.');
    return {
      question: cleanString(form.question),
      q: cleanString(form.question),
      options,
      correctAnswer,
      correct: correctAnswer,
      explanation: cleanString(form.explanation),
      chapterId: cleanString(form.chapterId),
      topicId: cleanString(form.topicId),
      difficulty: cleanString(form.difficulty) || 'Medium',
      source: cleanString(form.source) || 'Admin Dashboard',
      ...nowFields,
    };
  }

  if (action === 'cq') {
    if (!cleanString(form.stem)) throw httpError(400, 'CQ stem is required.');
    if (!cleanString(form.qC) || !cleanString(form.qD)) throw httpError(400, 'CQ question C and D are required.');
    return {
      stem: cleanString(form.stem),
      qA: cleanString(form.qA),
      qB: cleanString(form.qB),
      qC: cleanString(form.qC),
      qD: cleanString(form.qD),
      chapterId: cleanString(form.chapterId),
      topicId: cleanString(form.topicId),
      answerGuide: cleanString(form.answerGuide),
      ...nowFields,
    };
  }

  if (action === 'quizQuestion') {
    const options = parseOptions(form);
    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(cleanString(form.correctOption));
    const correctAnswer = options[correctIndex];
    if (!cleanString(form.challengeId)) throw httpError(400, 'Quiz set is required.');
    if (!cleanString(form.question)) throw httpError(400, 'Quiz question is required.');
    if (options.some(option => !option)) throw httpError(400, 'All four quiz options are required.');
    if (!correctAnswer) throw httpError(400, 'Correct option is required.');
    return {
      challengeId: cleanString(form.challengeId),
      question: cleanString(form.question),
      q: cleanString(form.question),
      options,
      correctAnswer,
      correct: correctAnswer,
      explanation: cleanString(form.explanation),
      chapterId: cleanString(form.chapterId),
      topicId: cleanString(form.topicId),
      order: Math.max(1, toNumber(form.order, 1)),
    };
  }

  if (action === 'course') {
    if (!cleanString(form.title)) throw httpError(400, 'Course title is required.');
    return {
      title: cleanString(form.title),
      type: cleanString(form.type) || 'RECORDED',
      fee: toNumber(form.fee, 0),
      classCount: toNumber(form.classCount, 0),
      classDuration: cleanString(form.classDuration),
      status: cleanString(form.status) || 'published',
      description: cleanString(form.description),
      features: parseList(form.features),
      ...nowFields,
    };
  }

  if (action === 'suggestion') {
    if (!cleanString(form.title)) throw httpError(400, 'Suggestion title is required.');
    return {
      title: cleanString(form.title),
      category: cleanString(form.category) || 'HSC ICT',
      price: toNumber(form.price, 0),
      status: cleanString(form.status) || 'published',
      description: cleanString(form.description),
      highlights: parseList(form.highlights),
      demoContent: cleanString(form.demoContent),
      ...nowFields,
    };
  }

  const title = cleanString(form.title);
  const startsAt = toIsoDate(form.startsAt);
  const durationMinutes = Math.max(1, toNumber(form.durationMinutes, 30));
  if (!title) throw httpError(400, 'Quiz title is required.');
  if (!startsAt) throw httpError(400, 'Start date and time is required.');
  const startsAtDate = new Date(startsAt);
  const endsAt = cleanString(form.endsAt)
    ? toIsoDate(form.endsAt)
    : new Date(startsAtDate.getTime() + durationMinutes * 60 * 1000).toISOString();
  if (!endsAt) throw httpError(400, 'End date and time is invalid.');
  const id = cleanString(form.challengeId) || `quiz-${startsAt.slice(0, 10)}-${slugify(title) || 'monthly-quiz'}`;

  return {
    id,
    title,
    month: getDhakaMonth(startsAtDate),
    year: getDhakaYear(startsAtDate),
    fee: toNumber(form.fee, 20),
    startsAt,
    endsAt,
    totalMarks: Math.max(1, toNumber(form.totalMarks, 30)),
    durationMinutes,
    status: cleanString(form.status) || 'LIVE',
    syllabus: parseList(form.syllabus),
    source: 'admin-dashboard',
    ...nowFields,
  };
};

const getLibrary = async () => {
  const db = getAdminDb();
  const [chapters, topics, mcqs, cqs] = await Promise.all([
    db.collection('chapters').get(),
    db.collection('topics').get(),
    db.collection('mcqs').get(),
    db.collection('cqs').get(),
  ]);

  return {
    chapters: chapters.docs.map(serializeDoc),
    topics: topics.docs.map(serializeDoc),
    mcqs: mcqs.docs.map(serializeDoc),
    cqs: cqs.docs.map(serializeDoc),
  };
};

const saveAction = async (action: AdminAction, form: Record<string, any>) => {
  const db = getAdminDb();
  const payload = buildPayload(action, form);

  if (action === 'quizQuestion') {
    const quizPayload = payload as Record<string, any> & { challengeId: string };
    const challengeRef = db.collection('megaChallenges').doc(quizPayload.challengeId);
    let challengeSnap = await challengeRef.get();
    const currentRef = db.collection('megaChallenges').doc('current');
    const currentSnap = await currentRef.get();

    if (!challengeSnap.exists && currentSnap.exists && currentSnap.data()?.currentChallengeId === quizPayload.challengeId) {
      await challengeRef.set({
        ...(currentSnap.data() || {}),
        id: quizPayload.challengeId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
      challengeSnap = await challengeRef.get();
    }

    if (!challengeSnap.exists) throw httpError(404, 'Choose an existing quiz routine before adding quiz questions.');

    const questionRef = challengeRef.collection('questions').doc();
    const embeddedQuestion = {
      id: questionRef.id,
      question: quizPayload.question,
      q: quizPayload.q,
      options: quizPayload.options,
      correctAnswer: quizPayload.correctAnswer,
      correct: quizPayload.correct,
      explanation: quizPayload.explanation,
      chapterId: quizPayload.chapterId,
      topicId: quizPayload.topicId,
      order: quizPayload.order,
    };
    const challengeData = challengeSnap.data() || {};
    await questionRef.set({
      ...embeddedQuestion,
      challengeId: quizPayload.challengeId,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    await challengeRef.set({
      questionCount: Array.isArray(challengeData.questions)
        ? challengeData.questions.length + 1
        : FieldValue.increment(1),
      ...(Array.isArray(challengeData.questions)
        ? { questions: [...challengeData.questions, embeddedQuestion] }
        : {}),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    if (
      currentSnap.exists &&
      currentSnap.data()?.currentChallengeId === quizPayload.challengeId &&
      Array.isArray(currentSnap.data()?.questions)
    ) {
      await currentRef.set({
        questions: [...currentSnap.data()?.questions, embeddedQuestion],
        questionCount: currentSnap.data()?.questions.length + 1,
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
    }

    return {
      savedId: questionRef.id,
      challengeId: quizPayload.challengeId,
    };
  }

  if (action === 'challenge') {
    const challengePayload = payload as Record<string, any> & { id: string; status?: string };
    await db.collection('megaChallenges').doc(challengePayload.id).set({
      ...challengePayload,
      createdAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    if (challengePayload.status === 'LIVE') {
      await db.collection('megaChallenges').doc('current').set({
        currentChallengeId: challengePayload.id,
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
    }
    return { savedId: challengePayload.id };
  }

  const collectionMap: Record<Exclude<AdminAction, 'quizQuestion' | 'challenge'>, string> = {
    chapter: 'chapters',
    topic: 'topics',
    mcq: 'mcqs',
    cq: 'cqs',
    course: 'courses',
    suggestion: 'suggestions',
  };
  const ref = db.collection(collectionMap[action as keyof typeof collectionMap]).doc();
  await ref.set({
    ...payload,
    createdAt: FieldValue.serverTimestamp(),
  });
  return { savedId: ref.id };
};

const generateChallenge = async () => {
  const db = getAdminDb();
  const mcqSnapshot = await db.collection('mcqs').get();
  const mcqs = mcqSnapshot.docs
    .map(item => normalizeMcq(item.id, item.data() || {}))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (mcqs.length < 30) throw httpError(400, `At least 30 valid MCQs are required in Firestore/mcqs. Found ${mcqs.length}.`);

  const selectedQuestions = [...mcqs].sort(() => Math.random() - 0.5).slice(0, 30);
  const currentRef = db.collection('megaChallenges').doc('current');
  const currentSnap = await currentRef.get();
  const challengeId = cleanString(currentSnap.data()?.currentChallengeId) || currentChallengeId();
  const now = new Date();
  const challengePayload = {
    id: challengeId,
    title: 'HSC ICT Monthly Quiz Exam',
    month: getDhakaMonth(now),
    year: getDhakaYear(now),
    status: 'LIVE',
    sourceCollection: 'mcqs',
    questionCount: selectedQuestions.length,
    totalMarks: selectedQuestions.length,
    durationMinutes: 30,
    questions: selectedQuestions,
    updatedAt: FieldValue.serverTimestamp(),
  };
  const challengeRef = db.collection('megaChallenges').doc(challengeId);
  const batch = db.batch();

  batch.set(challengeRef, {
    ...challengePayload,
    createdAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  batch.set(currentRef, {
    ...challengePayload,
    currentChallengeId: challengeId,
  }, { merge: true });
  selectedQuestions.forEach((question, index) => {
    batch.set(challengeRef.collection('questions').doc(question.id), {
      ...question,
      challengeId,
      order: index + 1,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  });
  await batch.commit();

  return {
    challengeId,
    questionCount: selectedQuestions.length,
  };
};

export default async function adminContent(req: any, res: any) {
  try {
    const decoded = await verifyRequest(req);
    await requireAdmin(decoded);

    if (req.method === 'GET') {
      return json(res, 200, {
        success: true,
        ...(await getLibrary()),
      });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return json(res, 405, { success: false, error: 'Method not allowed.' });
    }

    const body = parseBody(req.body);
    const mode = cleanString(body.mode);
    if (mode === 'generateChallenge') {
      return json(res, 200, {
        success: true,
        ...(await generateChallenge()),
      });
    }

    const action = cleanString(body.action) as AdminAction;
    if (!['chapter', 'topic', 'mcq', 'cq', 'quizQuestion', 'course', 'suggestion', 'challenge'].includes(action)) {
      throw httpError(400, 'Unknown admin content action.');
    }

    return json(res, 200, {
      success: true,
      ...(await saveAction(action, body.form || {})),
    });
  } catch (error: any) {
    console.error('adminContent error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Admin content request failed.',
    });
  }
}
