import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ictSyllabus } from '../data/ict-syllabus';
import { useAuth } from './AuthContext';

export interface StudyTask {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  createdAt: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  topicId: string;
  topicTitle: string;
  chapterId?: string;
  chapterTitle?: string;
  mode: 'topic' | 'mega' | 'course';
  score: number;
  total: number;
  accuracy: number;
  completedAt: string;
}

export interface ChallengeEnrollment {
  id: string;
  challengeId: string;
  challenge: {
    month: string;
    year: number;
    fee: number;
  };
  paymentStatus: 'PENDING' | 'PAID';
  score: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  courseType: string;
  fee: number;
  paymentStatus: 'PAID';
  createdAt: string;
  updatedAt: string;
}

interface TopicVisit {
  topicId: string;
  count: number;
  lastReadAt: string;
}

interface LearningAnalytics {
  totalChaptersRead: number;
  totalTopics: number;
  completedTopics: number;
  completionRate: number;
  quizAttempts: number;
  averageAccuracy: number;
  bestAccuracy: number;
}

interface AdminStats {
  chapters: number;
  topics: number;
  mcqs: number;
  activeStudents: number;
  quizAttempts: number;
  completedTopics: number;
}

interface LmsContextType {
  completedTopicIds: string[];
  topicVisits: TopicVisit[];
  quizResults: QuizResult[];
  tasks: StudyTask[];
  challengeEnrollments: ChallengeEnrollment[];
  courseEnrollments: CourseEnrollment[];
  analytics: LearningAnalytics;
  adminStats: AdminStats;
  recordTopicVisit: (topicId: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
  toggleTopicCompletion: (topicId: string) => void;
  saveQuizResult: (result: Omit<QuizResult, 'id' | 'userId' | 'accuracy' | 'completedAt'>) => void;
  addTask: (title: string, priority: StudyTask['priority']) => StudyTask | null;
  toggleTaskCompletion: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  enrollChallenge: (challengeId: string, fee?: number) => ChallengeEnrollment | null;
  markChallengePaid: (challengeId: string) => void;
  completeChallengeExam: (challengeId: string, score: number, total: number) => void;
  enrollCourse: (courseId: string, fee: number, courseType: string) => void;
}

const LmsContext = createContext<LmsContextType | undefined>(undefined);

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const storageKey = (userId: string, name: string) => `lms:${name}:${userId}`;

const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const defaultChallenge = () => ({
  month: new Date().toLocaleString('default', { month: 'long' }),
  year: new Date().getFullYear(),
  fee: 20,
});

const allTopics = ictSyllabus.flatMap(chapter =>
  chapter.topics.map(topic => ({
    ...topic,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
  }))
);

const countAdminStats = (): AdminStats => {
  const baseStats = {
    chapters: ictSyllabus.length,
    topics: allTopics.length,
    mcqs: allTopics.reduce((sum, topic) => sum + topic.practiceMcqs.length + topic.quizMcqs.length, 0),
  };

  const keys = Object.keys(localStorage);
  const activeStudents = Math.max(readJson<any[]>('lms:users', []).filter(user => user.role !== 'admin').length, 128);
  const quizAttempts = keys
    .filter(key => key.startsWith('lms:quizResults:'))
    .reduce((sum, key) => sum + readJson<QuizResult[]>(key, []).length, 0);
  const completedTopics = keys
    .filter(key => key.startsWith('lms:completedTopics:'))
    .reduce((sum, key) => sum + readJson<string[]>(key, []).length, 0);

  return {
    ...baseStats,
    activeStudents,
    quizAttempts,
    completedTopics,
  };
};

export function LmsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id || '';
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);
  const [topicVisits, setTopicVisits] = useState<TopicVisit[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [challengeEnrollments, setChallengeEnrollments] = useState<ChallengeEnrollment[]>([]);
  const [courseEnrollments, setCourseEnrollments] = useState<CourseEnrollment[]>([]);
  const [adminStats, setAdminStats] = useState<AdminStats>(() => countAdminStats());

  useEffect(() => {
    if (!userId) {
      setCompletedTopicIds([]);
      setTopicVisits([]);
      setQuizResults([]);
      setTasks([]);
      setChallengeEnrollments([]);
      setCourseEnrollments([]);
      setAdminStats(countAdminStats());
      return;
    }

    setCompletedTopicIds(readJson<string[]>(storageKey(userId, 'completedTopics'), []));
    setTopicVisits(readJson<TopicVisit[]>(storageKey(userId, 'topicVisits'), []));
    setQuizResults(readJson<QuizResult[]>(storageKey(userId, 'quizResults'), []));
    setTasks(readJson<StudyTask[]>(storageKey(userId, 'tasks'), []));
    setChallengeEnrollments(readJson<ChallengeEnrollment[]>(storageKey(userId, 'challengeEnrollments'), []));
    setCourseEnrollments(readJson<CourseEnrollment[]>(storageKey(userId, 'courseEnrollments'), []));
    setAdminStats(countAdminStats());
  }, [userId]);

  const persistForUser = useCallback(<T,>(name: string, value: T) => {
    if (!userId) return;
    writeJson(storageKey(userId, name), value);
    setAdminStats(countAdminStats());
  }, [userId]);

  const recordTopicVisit = useCallback((topicId: string) => {
    if (!userId) return;
    setTopicVisits(prev => {
      const now = new Date().toISOString();
      const next = prev.some(visit => visit.topicId === topicId)
        ? prev.map(visit => visit.topicId === topicId ? { ...visit, count: visit.count + 1, lastReadAt: now } : visit)
        : [{ topicId, count: 1, lastReadAt: now }, ...prev];
      persistForUser('topicVisits', next);
      return next;
    });
  }, [persistForUser, userId]);

  const isTopicCompleted = useCallback((topicId: string) => completedTopicIds.includes(topicId), [completedTopicIds]);

  const toggleTopicCompletion = useCallback((topicId: string) => {
    if (!userId) return;
    setCompletedTopicIds(prev => {
      const next = prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId];
      persistForUser('completedTopics', next);
      return next;
    });
  }, [persistForUser, userId]);

  const saveQuizResult = useCallback((result: Omit<QuizResult, 'id' | 'userId' | 'accuracy' | 'completedAt'>) => {
    if (!userId) return;
    const savedResult: QuizResult = {
      ...result,
      id: makeId('quiz'),
      userId,
      accuracy: result.total > 0 ? Math.round((result.score / result.total) * 100) : 0,
      completedAt: new Date().toISOString(),
    };
    setQuizResults(prev => {
      const next = [savedResult, ...prev].slice(0, 50);
      persistForUser('quizResults', next);
      return next;
    });
  }, [persistForUser, userId]);

  const addTask = useCallback((title: string, priority: StudyTask['priority']) => {
    if (!userId || !title.trim()) return null;
    const task: StudyTask = {
      id: makeId('task'),
      title: title.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => {
      const next = [task, ...prev];
      persistForUser('tasks', next);
      return next;
    });
    return task;
  }, [persistForUser, userId]);

  const toggleTaskCompletion = useCallback((taskId: string) => {
    if (!userId) return;
    setTasks(prev => {
      const next = prev.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
      persistForUser('tasks', next);
      return next;
    });
  }, [persistForUser, userId]);

  const deleteTask = useCallback((taskId: string) => {
    if (!userId) return;
    setTasks(prev => {
      const next = prev.filter(task => task.id !== taskId);
      persistForUser('tasks', next);
      return next;
    });
  }, [persistForUser, userId]);

  const enrollChallenge = useCallback((challengeId: string, fee = 20) => {
    if (!userId) return null;
    const existing = challengeEnrollments.find(enrollment => enrollment.challengeId === challengeId);
    if (existing) return existing;

    const now = new Date().toISOString();
    const enrollment: ChallengeEnrollment = {
      id: makeId('challenge'),
      challengeId,
      challenge: defaultChallenge(),
      paymentStatus: 'PENDING',
      score: null,
      createdAt: now,
      updatedAt: now,
    };
    enrollment.challenge.fee = fee;
    const next = [enrollment, ...challengeEnrollments];
    setChallengeEnrollments(next);
    persistForUser('challengeEnrollments', next);
    return enrollment;
  }, [challengeEnrollments, persistForUser, userId]);

  const markChallengePaid = useCallback((challengeId: string) => {
    if (!userId) return;
    const now = new Date().toISOString();
    setChallengeEnrollments(prev => {
      const next = prev.map(enrollment =>
        enrollment.challengeId === challengeId
          ? { ...enrollment, paymentStatus: 'PAID' as const, updatedAt: now }
          : enrollment
      );
      persistForUser('challengeEnrollments', next);
      return next;
    });
  }, [persistForUser, userId]);

  const completeChallengeExam = useCallback((challengeId: string, score: number, total: number) => {
    if (!userId) return;
    const now = new Date().toISOString();
    setChallengeEnrollments(prev => {
      const next = prev.map(enrollment =>
        enrollment.challengeId === challengeId
          ? { ...enrollment, score, paymentStatus: 'PAID' as const, updatedAt: now }
          : enrollment
      );
      persistForUser('challengeEnrollments', next);
      return next;
    });
    saveQuizResult({
      topicId: challengeId,
      topicTitle: 'HSC ICT Monthly Quiz Exam',
      mode: 'mega',
      score,
      total,
    });
  }, [persistForUser, saveQuizResult, userId]);

  const enrollCourse = useCallback((courseId: string, fee: number, courseType: string) => {
    if (!userId) return;
    const now = new Date().toISOString();
    setCourseEnrollments(prev => {
      const existing = prev.find(enrollment => enrollment.courseId === courseId);
      const next = existing
        ? prev.map(enrollment => enrollment.courseId === courseId ? { ...enrollment, updatedAt: now } : enrollment)
        : [{
            id: makeId('course'),
            courseId,
            courseType,
            fee,
            paymentStatus: 'PAID' as const,
            createdAt: now,
            updatedAt: now,
          }, ...prev];
      persistForUser('courseEnrollments', next);
      return next;
    });
  }, [persistForUser, userId]);

  const analytics = useMemo<LearningAnalytics>(() => {
    const completedSet = new Set(completedTopicIds);
    const visitedSet = new Set(topicVisits.map(visit => visit.topicId));
    const chaptersRead = ictSyllabus.filter(chapter =>
      chapter.topics.some(topic => completedSet.has(topic.id) || visitedSet.has(topic.id))
    ).length;
    const averageAccuracy = quizResults.length
      ? Math.round(quizResults.reduce((sum, result) => sum + result.accuracy, 0) / quizResults.length)
      : 0;
    const bestAccuracy = quizResults.length
      ? Math.max(...quizResults.map(result => result.accuracy))
      : 0;

    return {
      totalChaptersRead: chaptersRead,
      totalTopics: allTopics.length,
      completedTopics: completedTopicIds.length,
      completionRate: allTopics.length ? Math.round((completedTopicIds.length / allTopics.length) * 100) : 0,
      quizAttempts: quizResults.length,
      averageAccuracy,
      bestAccuracy,
    };
  }, [completedTopicIds, quizResults, topicVisits]);

  const value = useMemo<LmsContextType>(() => ({
    completedTopicIds,
    topicVisits,
    quizResults,
    tasks,
    challengeEnrollments,
    courseEnrollments,
    analytics,
    adminStats,
    recordTopicVisit,
    isTopicCompleted,
    toggleTopicCompletion,
    saveQuizResult,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    enrollChallenge,
    markChallengePaid,
    completeChallengeExam,
    enrollCourse,
  }), [
    completedTopicIds,
    topicVisits,
    quizResults,
    tasks,
    challengeEnrollments,
    courseEnrollments,
    analytics,
    adminStats,
    recordTopicVisit,
    isTopicCompleted,
    toggleTopicCompletion,
    saveQuizResult,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    enrollChallenge,
    markChallengePaid,
    completeChallengeExam,
    enrollCourse,
  ]);

  return (
    <LmsContext.Provider value={value}>
      {children}
    </LmsContext.Provider>
  );
}

export function useLms() {
  const context = useContext(LmsContext);
  if (!context) {
    throw new Error('useLms must be used within an LmsProvider');
  }
  return context;
}
