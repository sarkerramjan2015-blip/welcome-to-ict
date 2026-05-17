import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, httpError, verifyRequest } from '../src/server/firebaseAdminAccess.js';
import {
  buildDailyPracticeQuestions,
  getDhakaDateKey,
  getNextDhakaDayStartIso,
  getPracticeTopicMeta,
  type PracticeQuestion,
} from '../src/server/practiceExamBank.js';

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

const cleanString = (value: unknown) => String(value || '').trim();

const queryValue = (req: any, key: string) => {
  const value = req.query?.[key];
  if (Array.isArray(value)) return cleanString(value[0]);
  return cleanString(value);
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

const toIsoDate = (value: any): string | null => {
  if (!value) return null;
  if (typeof value?.toDate === 'function') return value.toDate().toISOString();
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const getAttemptId = (uid: string, topicId: string, dateKey: string) =>
  `${uid}__${topicId}__${dateKey}`;

const serializeQuestionStats = (question: Record<string, any>, stats: Record<string, any>) => {
  const attempts = Number(stats.attempts || 0);
  const correctCount = Number(stats.correctCount || 0);
  const wrongCount = Number(stats.wrongCount || 0);
  const optionCounts = question.options.map((_option: string, index: number) =>
    Number(stats.optionCounts?.[String(index)] || 0)
  );
  const maxCount = Math.max(...optionCounts, 0);
  const topIndex = maxCount > 0 ? optionCounts.findIndex((count: number) => count === maxCount) : -1;

  return {
    attempts,
    correctCount,
    wrongCount,
    correctPercent: attempts ? Math.round((correctCount / attempts) * 100) : 0,
    wrongPercent: attempts ? Math.round((wrongCount / attempts) * 100) : 0,
    topOption: topIndex >= 0
      ? {
          index: topIndex,
          label: question.options[topIndex],
          count: optionCounts[topIndex],
          percent: attempts ? Math.round((optionCounts[topIndex] / attempts) * 100) : 0,
        }
      : null,
    optionStats: question.options.map((label: string, index: number) => ({
      index,
      label,
      count: optionCounts[index],
      percent: attempts ? Math.round((optionCounts[index] / attempts) * 100) : 0,
    })),
  };
};

const publicQuestion = (question: PracticeQuestion) => ({
  id: question.id,
  q: question.q,
  options: question.options,
  explanation: question.explanation,
});

const serializeAttempt = (id: string, data: Record<string, any>) => ({
  id,
  userId: cleanString(data.userId),
  email: cleanString(data.email),
  name: cleanString(data.name) || null,
  topicId: cleanString(data.topicId),
  topicTitle: cleanString(data.topicTitle),
  chapterId: cleanString(data.chapterId),
  chapterTitle: cleanString(data.chapterTitle),
  dateKey: cleanString(data.dateKey),
  score: Number(data.score || 0),
  total: Number(data.total || 0),
  correctCount: Number(data.correctCount || 0),
  wrongCount: Number(data.wrongCount || 0),
  accuracy: Number(data.accuracy || 0),
  wrongPercent: Number(data.wrongPercent || 0),
  completedAt: toIsoDate(data.completedAt),
  questions: Array.isArray(data.questions) ? data.questions : [],
});

const loadStatsForQuestions = async (questions: Record<string, any>[]) => {
  if (!questions.length) return [];

  const db = getAdminDb();
  const statsSnapshots = await Promise.all(
    questions.map(question => db.collection('practiceQuestionStats').doc(question.id).get())
  );

  return questions.map((question, index) => ({
    ...question,
    stats: serializeQuestionStats(question, statsSnapshots[index].data() || {}),
  }));
};

const getTopicPayload = (topicId: string) => {
  const meta = getPracticeTopicMeta(topicId);
  if (!meta) throw httpError(404, 'Practice topic was not found.');
  return meta;
};

const getCurrentExam = async (uid: string, topicId: string) => {
  const dateKey = getDhakaDateKey(new Date());
  const questions = buildDailyPracticeQuestions(topicId, dateKey);
  if (!questions.length) throw httpError(404, 'No daily practice questions are available for this topic.');

  const attemptRef = getAdminDb().collection('practiceExamAttempts').doc(getAttemptId(uid, topicId, dateKey));
  const attemptSnap = await attemptRef.get();

  return {
    dateKey,
    questions,
    attemptRef,
    attemptSnap,
    nextEligibleAt: getNextDhakaDayStartIso(dateKey),
  };
};

const selectedOptionIndex = (question: PracticeQuestion, selectedOption: unknown) => {
  if (typeof selectedOption === 'number' && Number.isInteger(selectedOption)) {
    return selectedOption >= 0 && selectedOption < question.options.length ? selectedOption : -1;
  }

  return question.options.findIndex(option => option === cleanString(selectedOption));
};

export default async function practiceExam(req: any, res: any) {
  try {
    const decoded = await verifyRequest(req);
    const uid = cleanString(decoded.uid);
    const topicId = req.method === 'GET'
      ? queryValue(req, 'topicId')
      : cleanString(parseBody(req.body).topicId);

    if (!uid) throw httpError(401, 'Firebase login is required.');
    if (!topicId) throw httpError(400, 'Topic ID is required.');

    const topic = getTopicPayload(topicId);
    const exam = await getCurrentExam(uid, topicId);

    if (req.method === 'GET') {
      if (exam.attemptSnap.exists) {
        const attempt = serializeAttempt(exam.attemptSnap.id, exam.attemptSnap.data() || {});
        return json(res, 200, {
          success: true,
          canAttempt: false,
          topic,
          dateKey: exam.dateKey,
          nextEligibleAt: exam.nextEligibleAt,
          attempt,
          questions: await loadStatsForQuestions(attempt.questions),
        });
      }

      return json(res, 200, {
        success: true,
        canAttempt: true,
        topic,
        dateKey: exam.dateKey,
        nextEligibleAt: exam.nextEligibleAt,
        questions: exam.questions.map(publicQuestion),
      });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return json(res, 405, { success: false, error: 'Method not allowed.' });
    }

    if (exam.attemptSnap.exists) {
      const attempt = serializeAttempt(exam.attemptSnap.id, exam.attemptSnap.data() || {});
      return json(res, 409, {
        success: false,
        error: 'You already completed today\'s exam for this topic.',
        canAttempt: false,
        topic,
        dateKey: exam.dateKey,
        nextEligibleAt: exam.nextEligibleAt,
        attempt,
        questions: await loadStatsForQuestions(attempt.questions),
      });
    }

    const body = parseBody(req.body);
    const answers = (body.answers || {}) as Record<string, unknown>;
    const studentName = cleanString(body.name || decoded.name);
    const phone = cleanString(body.phone);

    const questionResults = exam.questions.map(question => {
      const chosenIndex = selectedOptionIndex(question, answers[question.id]);
      const correctIndex = question.options.findIndex(option => option === question.correct);
      const selectedOption = chosenIndex >= 0 ? question.options[chosenIndex] : null;
      const isCorrect = chosenIndex >= 0 && chosenIndex === correctIndex;

      return {
        id: question.id,
        q: question.q,
        options: question.options,
        explanation: question.explanation,
        correctOption: question.correct,
        correctIndex,
        selectedOption,
        selectedIndex: chosenIndex,
        isCorrect,
      };
    });

    const correctCount = questionResults.filter(question => question.isCorrect).length;
    const total = questionResults.length;
    const wrongCount = total - correctCount;
    const accuracy = total ? Math.round((correctCount / total) * 100) : 0;
    const wrongPercent = total ? Math.round((wrongCount / total) * 100) : 0;
    const db = getAdminDb();
    const batch = db.batch();

    batch.set(exam.attemptRef, {
      userId: uid,
      email: cleanString(decoded.email),
      name: studentName || null,
      phone: phone || null,
      ...topic,
      dateKey: exam.dateKey,
      score: correctCount,
      total,
      correctCount,
      wrongCount,
      accuracy,
      wrongPercent,
      questions: questionResults,
      completedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    batch.set(db.collection('students').doc(uid), {
      userId: uid,
      email: cleanString(decoded.email),
      ...(studentName ? { name: studentName } : {}),
      ...(phone ? { phone } : {}),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    questionResults.forEach(question => {
      const statPayload: Record<string, any> = {
        topicId,
        topicTitle: topic.topicTitle,
        chapterId: topic.chapterId,
        chapterTitle: topic.chapterTitle,
        question: question.q,
        options: question.options,
        correctOption: question.correctOption,
        attempts: FieldValue.increment(1),
        correctCount: FieldValue.increment(question.isCorrect ? 1 : 0),
        wrongCount: FieldValue.increment(question.isCorrect ? 0 : 1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (question.selectedIndex >= 0) {
        statPayload.optionCounts = {
          [String(question.selectedIndex)]: FieldValue.increment(1),
        };
      }

      batch.set(db.collection('practiceQuestionStats').doc(question.id), statPayload, { merge: true });
    });

    await batch.commit();
    const savedAttempt = await exam.attemptRef.get();
    const attempt = serializeAttempt(savedAttempt.id, savedAttempt.data() || {});

    return json(res, 200, {
      success: true,
      canAttempt: false,
      topic,
      dateKey: exam.dateKey,
      nextEligibleAt: exam.nextEligibleAt,
      attempt,
      questions: await loadStatsForQuestions(attempt.questions),
    });
  } catch (error: any) {
    console.error('practiceExam error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Practice exam request failed.',
    });
  }
}
