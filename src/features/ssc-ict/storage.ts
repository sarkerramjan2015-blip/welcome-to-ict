import { defaultSscIctConfig } from './data';
import type {
  SscAccessState,
  SscChapterProgress,
  SscIctConfig,
  SscOrder,
  SscOrderType,
  SscPracticeAnswer,
  SscQuizAttempt,
  SscUserProgress,
} from './types';

const CONFIG_KEY = 'ssc-ict:config';
const ORDERS_KEY = 'ssc-ict:orders';
const ATTEMPTS_KEY = 'ssc-ict:quiz-attempts';
const CHANGE_EVENT = 'ssc-ict-storage';

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const preferExpandedList = <T,>(storedList: T[] | undefined, defaultList: T[]) =>
  storedList && storedList.length >= defaultList.length ? storedList : defaultList;

const safeRead = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
};

const safeWrite = <T,>(key: string, value: T) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

const makeId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const accessKey = (userId: string) => `ssc-ict:access:${userId}`;
const progressKey = (userId: string) => `ssc-ict:progress:${userId}`;

export const subscribeSscIctStorage = (callback: () => void) => {
  if (typeof window === 'undefined') return () => undefined;
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
};

export const getSscIctConfig = (): SscIctConfig => {
  const stored = safeRead<Partial<SscIctConfig> | null>(CONFIG_KEY, null);
  if (!stored) return clone(defaultSscIctConfig);

  const defaultBySlug = new Map(defaultSscIctConfig.chapters.map(chapter => [chapter.slug, chapter]));
  const storedChapters = Array.isArray(stored.chapters) ? stored.chapters : [];
  const mergedChapters = storedChapters.length
    ? storedChapters.map(chapter => ({
        ...(defaultBySlug.get(chapter.slug) || chapter),
        ...chapter,
        mcqs: preferExpandedList(chapter.mcqs, defaultBySlug.get(chapter.slug)?.mcqs || []),
        shortQuestions: chapter.shortQuestions?.length
          ? preferExpandedList(chapter.shortQuestions, defaultBySlug.get(chapter.slug)?.shortQuestions || [])
          : defaultBySlug.get(chapter.slug)?.shortQuestions || [],
        pdfPages: preferExpandedList(chapter.pdfPages, defaultBySlug.get(chapter.slug)?.pdfPages || []),
      }))
    : clone(defaultSscIctConfig.chapters);

  return {
    ...clone(defaultSscIctConfig),
    ...stored,
    chapters: mergedChapters.sort((a, b) => a.orderIndex - b.orderIndex),
    packagePlan: {
      ...defaultSscIctConfig.packagePlan,
      ...(stored.packagePlan || {}),
    },
    quizSettings: {
      ...defaultSscIctConfig.quizSettings,
      ...(stored.quizSettings || {}),
    },
    updatedAt: stored.updatedAt || new Date().toISOString(),
  };
};

export const saveSscIctConfig = (config: SscIctConfig) => {
  safeWrite(CONFIG_KEY, {
    ...config,
    updatedAt: new Date().toISOString(),
  });
};

export const resetSscIctConfig = () => {
  safeWrite(CONFIG_KEY, clone(defaultSscIctConfig));
};

export const getPublishedSscChapters = () =>
  getSscIctConfig().chapters.filter(chapter => chapter.isPublished);

export const findSscChapter = (slug: string) =>
  getSscIctConfig().chapters.find(chapter => chapter.slug === slug);

export const getSscOrders = (): SscOrder[] =>
  safeRead<SscOrder[]>(ORDERS_KEY, []).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

export const saveSscOrders = (orders: SscOrder[]) => {
  safeWrite(ORDERS_KEY, orders);
};

export const createSscOrder = ({
  userId,
  userName,
  userEmail,
  type,
  chapterSlug,
  packageId,
  amount,
  paymentMethod,
  transactionId,
  status = 'pending',
}: {
  userId: string;
  userName: string;
  userEmail?: string | null;
  type: SscOrderType;
  chapterSlug?: string;
  packageId?: string;
  amount: number;
  paymentMethod: SscOrder['paymentMethod'];
  transactionId?: string | null;
  status?: SscOrder['status'];
}) => {
  const now = new Date().toISOString();
  const order: SscOrder = {
    id: makeId('ssc-order'),
    userId,
    userName,
    userEmail,
    type,
    chapterSlug,
    packageId,
    amount,
    paymentMethod,
    transactionId: transactionId || null,
    status,
    createdAt: now,
    updatedAt: now,
  };

  saveSscOrders([order, ...getSscOrders()]);
  if (status === 'paid') {
    grantSscAccess(userId, type, chapterSlug);
  } else {
    markSscAccessPending(userId, type, chapterSlug);
  }
  return order;
};

export const updateSscOrderStatus = (orderId: string, status: SscOrder['status']) => {
  const now = new Date().toISOString();
  const orders = getSscOrders().map(order => order.id === orderId ? { ...order, status, updatedAt: now } : order);
  saveSscOrders(orders);
  const order = orders.find(item => item.id === orderId);
  if (order && status === 'paid') {
    grantSscAccess(order.userId, order.type, order.chapterSlug);
  }
  return order || null;
};

export const getSscAccess = (userId: string): SscAccessState => {
  const fallback: SscAccessState = {
    userId,
    fullPackage: false,
    chapterSlugs: [],
    pendingChapterSlugs: [],
    pendingPackage: false,
    updatedAt: new Date(0).toISOString(),
  };
  if (!userId) return fallback;
  return { ...fallback, ...safeRead<Partial<SscAccessState>>(accessKey(userId), fallback), userId };
};

export const saveSscAccess = (access: SscAccessState) => {
  if (!access.userId) return;
  safeWrite(accessKey(access.userId), {
    ...access,
    chapterSlugs: Array.from(new Set(access.chapterSlugs)),
    pendingChapterSlugs: Array.from(new Set(access.pendingChapterSlugs)),
    updatedAt: new Date().toISOString(),
  });
};

export const markSscAccessPending = (userId: string, type: SscOrderType, chapterSlug?: string) => {
  const access = getSscAccess(userId);
  if (type === 'package') {
    saveSscAccess({ ...access, pendingPackage: true });
    return;
  }
  if (!chapterSlug) return;
  saveSscAccess({
    ...access,
    pendingChapterSlugs: Array.from(new Set([...access.pendingChapterSlugs, chapterSlug])),
  });
};

export const grantSscAccess = (userId: string, type: SscOrderType, chapterSlug?: string) => {
  const access = getSscAccess(userId);
  if (type === 'package') {
    saveSscAccess({
      ...access,
      fullPackage: true,
      pendingPackage: false,
      pendingChapterSlugs: [],
    });
    return;
  }
  if (!chapterSlug) return;
  saveSscAccess({
    ...access,
    chapterSlugs: Array.from(new Set([...access.chapterSlugs, chapterSlug])),
    pendingChapterSlugs: access.pendingChapterSlugs.filter(slug => slug !== chapterSlug),
  });
};

export const revokeSscAccess = (userId: string, chapterSlug?: string) => {
  const access = getSscAccess(userId);
  if (!chapterSlug) {
    saveSscAccess({ ...access, fullPackage: false });
    return;
  }
  saveSscAccess({
    ...access,
    chapterSlugs: access.chapterSlugs.filter(slug => slug !== chapterSlug),
  });
};

export const getSscProgress = (userId: string): SscUserProgress => {
  const fallback: SscUserProgress = {
    userId,
    chapters: {},
    dailyPracticeDates: [],
    updatedAt: new Date(0).toISOString(),
  };
  if (!userId) return fallback;
  return { ...fallback, ...safeRead<Partial<SscUserProgress>>(progressKey(userId), fallback), userId };
};

export const getSscChapterProgress = (userId: string, chapterSlug: string): SscChapterProgress => {
  const progress = getSscProgress(userId);
  return progress.chapters[chapterSlug] || {
    chapterSlug,
    pdfLastPage: 0,
    practiceAnswers: {},
    bookmarkedQuestionIds: [],
    learnedShortQuestionIds: [],
    lastActivityAt: new Date(0).toISOString(),
  };
};

export const saveSscChapterProgress = (userId: string, chapterProgress: SscChapterProgress) => {
  if (!userId) return;
  const progress = getSscProgress(userId);
  safeWrite(progressKey(userId), {
    ...progress,
    chapters: {
      ...progress.chapters,
      [chapterProgress.chapterSlug]: {
        ...chapterProgress,
        lastActivityAt: new Date().toISOString(),
      },
    },
    updatedAt: new Date().toISOString(),
  });
};

export const saveSscPdfProgress = (userId: string, chapterSlug: string, pageIndex: number) => {
  const progress = getSscChapterProgress(userId, chapterSlug);
  saveSscChapterProgress(userId, { ...progress, pdfLastPage: pageIndex });
};

export const saveSscPracticeAnswer = (
  userId: string,
  chapterSlug: string,
  answer: Omit<SscPracticeAnswer, 'attemptedAt'>
) => {
  const progress = getSscChapterProgress(userId, chapterSlug);
  saveSscChapterProgress(userId, {
    ...progress,
    practiceAnswers: {
      ...progress.practiceAnswers,
      [answer.questionId]: {
        ...answer,
        attemptedAt: new Date().toISOString(),
      },
    },
  });
};

export const toggleSscBookmark = (userId: string, chapterSlug: string, questionId: string) => {
  const progress = getSscChapterProgress(userId, chapterSlug);
  const next = progress.bookmarkedQuestionIds.includes(questionId)
    ? progress.bookmarkedQuestionIds.filter(id => id !== questionId)
    : [...progress.bookmarkedQuestionIds, questionId];
  saveSscChapterProgress(userId, { ...progress, bookmarkedQuestionIds: next });
};

export const toggleSscShortLearned = (userId: string, chapterSlug: string, questionId: string) => {
  const progress = getSscChapterProgress(userId, chapterSlug);
  const next = progress.learnedShortQuestionIds.includes(questionId)
    ? progress.learnedShortQuestionIds.filter(id => id !== questionId)
    : [...progress.learnedShortQuestionIds, questionId];
  saveSscChapterProgress(userId, { ...progress, learnedShortQuestionIds: next });
};

export const getSscAttempts = (): SscQuizAttempt[] =>
  safeRead<SscQuizAttempt[]>(ATTEMPTS_KEY, []);

export const saveSscAttempt = (attempt: Omit<SscQuizAttempt, 'id' | 'submittedAt' | 'rankSnapshot'>) => {
  const now = new Date().toISOString();
  const draft: SscQuizAttempt = {
    ...attempt,
    id: makeId('ssc-attempt'),
    submittedAt: now,
  };
  const attempts = [draft, ...getSscAttempts()];
  const ranked = rankSscAttempts(attempts.filter(item => item.chapterSlug === draft.chapterSlug));
  const rank = ranked.find(item => item.id === draft.id)?.rankSnapshot || 1;
  const saved = { ...draft, rankSnapshot: rank };
  safeWrite(ATTEMPTS_KEY, attempts.map(item => item.id === draft.id ? saved : item));
  return saved;
};

export const findSscAttempt = (attemptId: string) =>
  getSscAttempts().find(attempt => attempt.id === attemptId);

export const rankSscAttempts = (attempts: SscQuizAttempt[]) =>
  [...attempts]
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.timeTakenSeconds !== b.timeTakenSeconds) return a.timeTakenSeconds - b.timeTakenSeconds;
      return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
    })
    .map((attempt, index) => ({ ...attempt, rankSnapshot: index + 1 }));

export const getSscCourseIdForChapter = (chapterSlug: string) => `ssc-ict:chapter:${chapterSlug}`;
export const getSscCourseIdForPackage = () => 'ssc-ict:package:full';
