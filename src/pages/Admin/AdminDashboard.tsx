import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  BadgeCheck,
  Ban,
  BellRing,
  BookOpen,
  CalendarDays,
  CalendarClock,
  ChevronDown,
  CheckCircle,
  CreditCard,
  Database,
  DollarSign,
  ExternalLink,
  FileText,
  Globe2,
  GraduationCap,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  Loader2,
  LogOut,
  Mail,
  MessageCircle,
  Medal,
  Plus,
  Pencil,
  Save,
  Search,
  Sparkles,
  ShieldCheck,
  ReceiptText,
  RefreshCw,
  Smartphone,
  Trophy,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { useLms } from '../../context/LmsContext';
import { getFirebaseDb } from '../../lib/firebase';
import {
  approveManualPayment,
  fetchManualPayments,
  recordManualPaymentReminder,
  rejectManualPayment,
  type ManualPaymentRecord,
} from '../../services/manualPayment';
import {
  fetchAdminActivity,
  type AdminActivitySummary,
} from '../../services/adminActivity';
import {
  fetchAdminPracticeProgress,
  type AdminPracticeProgressSummary,
  type AdminPracticeStudent,
} from '../../services/adminPracticeProgress';
import {
  fetchAdminLeaderboard,
  publishAdminLeaderboard,
  updateAdminLeaderboardResult,
  type AdminLeaderboardChallengeSet,
  type AdminLeaderboardResult,
  type AdminPaymentSummary,
} from '../../services/adminLeaderboard';
import {
  fetchAdminFreeAccessGrants,
  grantAdminFreeAccess,
  revokeAdminFreeAccess,
  type AdminFreeAccessGrant,
} from '../../services/adminAccess';
import {
  fetchAdminChallengeDetails,
  fetchAdminChallengeSets,
  saveAdminQuizQuestion,
  type AdminChallengeDetails,
  type AdminChallengeSet,
  type AdminQuizQuestion,
} from '../../services/adminQuizQuestions';

type ActionType = 'chapter' | 'topic' | 'mcq' | 'cq' | 'quizQuestion' | 'course' | 'suggestion' | 'challenge';
type Notice = { type: 'success' | 'error'; text: string } | null;

const DEFAULT_ANALYTICS_DASHBOARD_URL = 'https://analytics.google.com/analytics/web/';

interface FormState {
  chapter: {
    title: string;
    slug: string;
    description: string;
    order: string;
    level: string;
    status: string;
  };
  topic: {
    title: string;
    slug: string;
    chapterId: string;
    importance: string;
    order: string;
    board_notes: string;
    video_url: string;
  };
  mcq: {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: string;
    explanation: string;
    chapterId: string;
    topicId: string;
    difficulty: string;
    source: string;
  };
  cq: {
    stem: string;
    qA: string;
    qB: string;
    qC: string;
    qD: string;
    chapterId: string;
    topicId: string;
    answerGuide: string;
  };
  quizQuestion: {
    challengeId: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: string;
    explanation: string;
    chapterId: string;
    topicId: string;
    order: string;
  };
  course: {
    title: string;
    type: string;
    fee: string;
    classCount: string;
    classDuration: string;
    status: string;
    description: string;
    features: string;
  };
  suggestion: {
    title: string;
    category: string;
    price: string;
    status: string;
    description: string;
    highlights: string;
    demoContent: string;
  };
  challenge: {
    title: string;
    challengeId: string;
    startsAt: string;
    endsAt: string;
    fee: string;
    totalMarks: string;
    durationMinutes: string;
    status: string;
    syllabus: string;
  };
}

interface MegaChallengeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topicId: string;
  chapterId: string;
}

interface AdminChapterRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  level: string;
  status: string;
}

interface AdminTopicRecord {
  id: string;
  title: string;
  slug: string;
  chapterId: string;
  importance: string;
  order: number;
  board_notes: string;
  video_url: string;
}

interface AdminContentQuestionRecord {
  id: string;
  chapterId: string;
  topicId: string;
}

const actionConfig: Record<ActionType, {
  label: string;
  title: string;
  description: string;
  collectionName: string;
  icon: typeof Plus;
  accentClass: string;
}> = {
  chapter: {
    label: 'Add Chapter',
    title: 'Add Chapter',
    description: 'Create a new HSC ICT chapter document in Firestore.',
    collectionName: 'chapters',
    icon: BookOpen,
    accentClass: 'text-indigo-400 bg-indigo-500/15',
  },
  topic: {
    label: 'Add Topic',
    title: 'Add Topic',
    description: 'Attach a topic to a chapter and store its notes metadata.',
    collectionName: 'topics',
    icon: FileText,
    accentClass: 'text-sky-400 bg-sky-500/15',
  },
  mcq: {
    label: 'Add MCQ',
    title: 'Add MCQ',
    description: 'Save a multiple-choice question to the mcqs collection.',
    collectionName: 'mcqs',
    icon: HelpCircle,
    accentClass: 'text-emerald-400 bg-emerald-500/15',
  },
  cq: {
    label: 'Add CQ',
    title: 'Add Creative Question',
    description: 'Save a full creative question set to the cqs collection.',
    collectionName: 'cqs',
    icon: Layers,
    accentClass: 'text-amber-400 bg-amber-500/15',
  },
  quizQuestion: {
    label: 'Add Quiz Q',
    title: 'Add Quiz Question',
    description: 'Create a question directly inside a published monthly quiz set.',
    collectionName: 'megaChallenges/{id}/questions',
    icon: Pencil,
    accentClass: 'text-cyan-400 bg-cyan-500/15',
  },
  course: {
    label: 'Manage Courses',
    title: 'Manage Courses',
    description: 'Publish or draft premium course cards in Firestore.',
    collectionName: 'courses',
    icon: GraduationCap,
    accentClass: 'text-pink-400 bg-pink-500/15',
  },
  suggestion: {
    label: 'Manage Suggestions',
    title: 'Manage Suggestions',
    description: 'Publish short suggestion products and demo content.',
    collectionName: 'suggestions',
    icon: Lightbulb,
    accentClass: 'text-violet-400 bg-violet-500/15',
  },
  challenge: {
    label: 'Quiz Routine',
    title: 'Publish Quiz Routine',
    description: 'Create a public monthly quiz schedule in Firestore.',
    collectionName: 'megaChallenges',
    icon: CalendarDays,
    accentClass: 'text-cyan-400 bg-cyan-500/15',
  },
};

const makeInitialForms = (): FormState => ({
  chapter: {
    title: '',
    slug: '',
    description: '',
    order: '1',
    level: 'HSC ICT',
    status: 'published',
  },
  topic: {
    title: '',
    slug: '',
    chapterId: '',
    importance: 'Medium',
    order: '1',
    board_notes: '',
    video_url: '',
  },
  mcq: {
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: 'A',
    explanation: '',
    chapterId: '',
    topicId: '',
    difficulty: 'Medium',
    source: 'Admin Dashboard',
  },
  cq: {
    stem: '',
    qA: '',
    qB: '',
    qC: '',
    qD: '',
    chapterId: '',
    topicId: '',
    answerGuide: '',
  },
  quizQuestion: {
    challengeId: '',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: 'A',
    explanation: '',
    chapterId: '',
    topicId: '',
    order: '',
  },
  course: {
    title: '',
    type: 'RECORDED',
    fee: '500',
    classCount: '30',
    classDuration: '1 Hour',
    status: 'published',
    description: '',
    features: '',
  },
  suggestion: {
    title: '',
    category: 'HSC ICT',
    price: '150',
    status: 'published',
    description: '',
    highlights: '',
    demoContent: '',
  },
  challenge: {
    title: 'HSC ICT Monthly Quiz Exam',
    challengeId: '',
    startsAt: '',
    endsAt: '',
    fee: '20',
    totalMarks: '30',
    durationMinutes: '30',
    status: 'LIVE',
    syllabus: '',
  },
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const parseList = (value: string) =>
  value
    .split(/\r?\n/)
    .map(item => item.trim())
    .filter(Boolean);

const toNumber = (value: string, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toIsoDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString();
};

const getCurrentChallengeId = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const parseStoredOptions = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(option => String(option).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(option => String(option).trim()).filter(Boolean);
      }
    } catch {
      return value.split(/\r?\n|,/).map(option => option.trim()).filter(Boolean);
    }
  }

  return [];
};

const normalizeMcq = (id: string, data: Record<string, any>): MegaChallengeQuestion | null => {
  const question = String(data.question || data.q || '').trim();
  const options = parseStoredOptions(data.options).slice(0, 4);
  const correctAnswer = String(data.correctAnswer || data.correct || data.answer || '').trim();

  if (!question || options.length < 2 || !correctAnswer) {
    return null;
  }

  return {
    id,
    question,
    options,
    correctAnswer,
    explanation: String(data.explanation || '').trim(),
    topicId: String(data.topicId || '').trim(),
    chapterId: String(data.chapterId || '').trim(),
  };
};

const shuffle = <T,>(items: T[]) =>
  [...items]
    .map(item => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

const buildFirestorePayload = (action: ActionType, forms: FormState) => {
  const nowFields = {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (action === 'chapter') {
    const form = forms.chapter;
    const title = form.title.trim();
    if (!title) throw new Error('Chapter title is required.');

    return {
      title,
      slug: form.slug.trim() || slugify(title),
      description: form.description.trim(),
      order: toNumber(form.order, 1),
      level: form.level.trim() || 'HSC ICT',
      status: form.status,
      ...nowFields,
    };
  }

  if (action === 'topic') {
    const form = forms.topic;
    const title = form.title.trim();
    if (!title) throw new Error('Topic title is required.');
    if (!form.chapterId.trim()) throw new Error('Chapter ID is required for a topic.');

    return {
      title,
      slug: form.slug.trim() || slugify(title),
      chapterId: form.chapterId.trim(),
      importance: form.importance,
      order: toNumber(form.order, 1),
      board_notes: form.board_notes.trim(),
      video_url: form.video_url.trim(),
      ...nowFields,
    };
  }

  if (action === 'mcq') {
    const form = forms.mcq;
    const options = [form.optionA, form.optionB, form.optionC, form.optionD].map(option => option.trim());
    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(form.correctOption);
    const correctAnswer = options[correctIndex];

    if (!form.question.trim()) throw new Error('MCQ question is required.');
    if (options.some(option => !option)) throw new Error('All four MCQ options are required.');
    if (!correctAnswer) throw new Error('Correct option is required.');

    return {
      question: form.question.trim(),
      q: form.question.trim(),
      options,
      correctAnswer,
      correct: correctAnswer,
      explanation: form.explanation.trim(),
      chapterId: form.chapterId.trim(),
      topicId: form.topicId.trim(),
      difficulty: form.difficulty,
      source: form.source.trim(),
      ...nowFields,
    };
  }

  if (action === 'cq') {
    const form = forms.cq;
    if (!form.stem.trim()) throw new Error('CQ stem is required.');
    if (!form.qC.trim() || !form.qD.trim()) throw new Error('CQ question C and D are required.');

    return {
      stem: form.stem.trim(),
      qA: form.qA.trim(),
      qB: form.qB.trim(),
      qC: form.qC.trim(),
      qD: form.qD.trim(),
      chapterId: form.chapterId.trim(),
      topicId: form.topicId.trim(),
      answerGuide: form.answerGuide.trim(),
      ...nowFields,
    };
  }

  if (action === 'quizQuestion') {
    const form = forms.quizQuestion;
    const options = [form.optionA, form.optionB, form.optionC, form.optionD].map(option => option.trim());
    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(form.correctOption);
    const correctAnswer = options[correctIndex];

    if (!form.challengeId.trim()) throw new Error('Quiz set is required.');
    if (!form.question.trim()) throw new Error('Quiz question is required.');
    if (options.some(option => !option)) throw new Error('All four quiz options are required.');
    if (!correctAnswer) throw new Error('Correct option is required.');

    return {
      challengeId: form.challengeId.trim(),
      question: form.question.trim(),
      q: form.question.trim(),
      options,
      correctAnswer,
      correct: correctAnswer,
      explanation: form.explanation.trim(),
      chapterId: form.chapterId.trim(),
      topicId: form.topicId.trim(),
      order: Math.max(1, toNumber(form.order, 1)),
    };
  }

  if (action === 'course') {
    const form = forms.course;
    if (!form.title.trim()) throw new Error('Course title is required.');

    return {
      title: form.title.trim(),
      type: form.type,
      fee: toNumber(form.fee, 0),
      classCount: toNumber(form.classCount, 0),
      classDuration: form.classDuration.trim(),
      status: form.status,
      description: form.description.trim(),
      features: parseList(form.features),
      ...nowFields,
    };
  }

  if (action === 'challenge') {
    const form = forms.challenge;
    const title = form.title.trim();
    const startsAt = toIsoDate(form.startsAt);
    const durationMinutes = Math.max(1, toNumber(form.durationMinutes, 30));

    if (!title) throw new Error('Quiz title is required.');
    if (!startsAt) throw new Error('Start date and time is required.');

    const startsAtDate = new Date(startsAt);
    const endsAt = form.endsAt.trim()
      ? toIsoDate(form.endsAt)
      : new Date(startsAtDate.getTime() + durationMinutes * 60 * 1000).toISOString();

    if (!endsAt) throw new Error('End date and time is invalid.');

    const generatedId = `quiz-${startsAtDate.toISOString().slice(0, 10)}-${slugify(title) || 'monthly-quiz'}`;
    const challengeId = form.challengeId.trim() || generatedId;

    return {
      id: challengeId,
      title,
      month: startsAtDate.toLocaleString('en-US', { month: 'long', timeZone: 'Asia/Dhaka' }),
      year: Number(startsAtDate.toLocaleString('en-US', { year: 'numeric', timeZone: 'Asia/Dhaka' })),
      fee: toNumber(form.fee, 20),
      startsAt,
      endsAt,
      totalMarks: Math.max(1, toNumber(form.totalMarks, 30)),
      durationMinutes,
      status: form.status,
      syllabus: parseList(form.syllabus),
      source: 'admin-dashboard',
      ...nowFields,
    };
  }

  const form = forms.suggestion;
  if (!form.title.trim()) throw new Error('Suggestion title is required.');

  return {
    title: form.title.trim(),
    category: form.category.trim() || 'HSC ICT',
    price: toNumber(form.price, 0),
    status: form.status,
    description: form.description.trim(),
    highlights: parseList(form.highlights),
    demoContent: form.demoContent.trim(),
    ...nowFields,
  };
};

const getManualPaymentLabel = (payment: ManualPaymentRecord) => {
  if (payment.courseTitle) return payment.courseTitle;
  if (payment.courseId.startsWith('premium-')) {
    return `ICT Toppers Premium - ${payment.courseId.replace('premium-', '')}`;
  }
  if (payment.courseId.startsWith('quiz-')) {
    return 'HSC ICT Monthly Quiz Exam';
  }
  return payment.courseId;
};

const formatPaymentDate = (value?: string | null) => {
  if (!value) return 'Just now';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Just now';
  return date.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Dhaka',
  });
};

const formatActivityDate = (value?: string | null) => {
  if (!value) return 'Never';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Never';
  return date.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Dhaka',
  });
};

const formatCurrency = (value?: number | null) =>
  `BDT ${Number(value || 0).toLocaleString('en-US')}`;

const getFreeAccessGrantKey = (grant: Pick<AdminFreeAccessGrant, 'uid' | 'email' | 'pending'>) =>
  grant.pending ? `invite:${grant.email}` : `student:${grant.uid}`;

const toDateTimeLocal = (value?: string | null) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const pad = (part: number) => String(part).padStart(2, '0');
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('-') + `T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const compareByOrderThenTitle = <T extends { order?: number; title?: string }>(a: T, b: T) => {
  const orderDiff = Number(a.order || 0) - Number(b.order || 0);
  if (orderDiff !== 0) return orderDiff;
  return String(a.title || '').localeCompare(String(b.title || ''));
};

const normalizeBdWhatsAppNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (/^8801\d{9}$/.test(digits)) return digits;
  if (/^01\d{9}$/.test(digits)) return `88${digits}`;
  return '';
};

const buildPendingPaymentReminderUrl = (payment: ManualPaymentRecord) => {
  const phone = normalizeBdWhatsAppNumber(payment.senderNumber);
  if (!phone) return '';

  const message = [
    'Assalamu Alaikum,',
    `Your payment for ${getManualPaymentLabel(payment)} is still pending review.`,
    `Reference: ${payment.id}.`,
    'If any payment detail needs correction, please reply here. - ICT Toppers',
  ].join(' ');

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

const buildStudentProgressEmailHref = (student: AdminPracticeStudent) => {
  const subject = `ICT Toppers study follow-up`;
  const body = [
    `Assalamu Alaikum ${student.name || 'ICT Student'},`,
    '',
    'We reviewed your ICT Toppers progress and wanted to help you move forward.',
    student.weakestTopic
      ? `Current weak topic: ${student.weakestTopic.title} (${student.weakestTopic.averageAccuracy}% average accuracy).`
      : '',
    'Please reply if you need support from the ICT Toppers team.',
  ].filter(Boolean).join('\n');

  return `mailto:${student.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const buildStudentProgressWhatsappUrl = (student: AdminPracticeStudent) => {
  const phone = normalizeBdWhatsAppNumber(student.phone || '');
  if (!phone) return '';

  const message = [
    `Assalamu Alaikum ${student.name || 'ICT Student'},`,
    'ICT Toppers theke bolchi.',
    student.weakestTopic
      ? `Tomar weak topic ekhon ${student.weakestTopic.title} (${student.weakestTopic.averageAccuracy}% accuracy).`
      : 'Tomar recent study progress niye follow-up kortesi.',
    'Help lagle ekhanei reply dio.',
  ].join(' ');

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { adminStats } = useLms();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [forms, setForms] = useState<FormState>(() => makeInitialForms());
  const [notice, setNotice] = useState<Notice>(null);
  const [trafficTotal, setTrafficTotal] = useState<number | null>(null);
  const [firebaseDb, setFirebaseDb] = useState<Firestore | null | undefined>(undefined);
  const [manualPayments, setManualPayments] = useState<ManualPaymentRecord[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [paymentActionId, setPaymentActionId] = useState('');
  const [activitySummary, setActivitySummary] = useState<AdminActivitySummary | null>(null);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState('');
  const [recentUsersExpanded, setRecentUsersExpanded] = useState(false);
  const [studentProgressSummary, setStudentProgressSummary] = useState<AdminPracticeProgressSummary | null>(null);
  const [studentProgressRows, setStudentProgressRows] = useState<AdminPracticeStudent[]>([]);
  const [studentProgressLoading, setStudentProgressLoading] = useState(false);
  const [studentProgressError, setStudentProgressError] = useState('');
  const [studentProgressQuery, setStudentProgressQuery] = useState('');
  const [leaderboardSets, setLeaderboardSets] = useState<AdminLeaderboardChallengeSet[]>([]);
  const [selectedLeaderboardChallengeId, setSelectedLeaderboardChallengeId] = useState('');
  const [leaderboardResults, setLeaderboardResults] = useState<AdminLeaderboardResult[]>([]);
  const [paymentSummary, setPaymentSummary] = useState<AdminPaymentSummary | null>(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState('');
  const [savingLeaderboardResultId, setSavingLeaderboardResultId] = useState('');
  const [publishingLeaderboard, setPublishingLeaderboard] = useState(false);
  const [challengeSets, setChallengeSets] = useState<AdminChallengeSet[]>([]);
  const [selectedQuestionChallengeId, setSelectedQuestionChallengeId] = useState('');
  const [quizQuestions, setQuizQuestions] = useState<AdminQuizQuestion[]>([]);
  const [selectedChallengeDetails, setSelectedChallengeDetails] = useState<AdminChallengeDetails | null>(null);
  const [nextChallengeDetails, setNextChallengeDetails] = useState<AdminChallengeDetails | null>(null);
  const [nextChallengeQuestions, setNextChallengeQuestions] = useState<AdminQuizQuestion[]>([]);
  const [quizQuestionsLoading, setQuizQuestionsLoading] = useState(false);
  const [quizQuestionsError, setQuizQuestionsError] = useState('');
  const [savingQuestionId, setSavingQuestionId] = useState('');
  const [freeAccessGrants, setFreeAccessGrants] = useState<AdminFreeAccessGrant[]>([]);
  const [freeAccessEmail, setFreeAccessEmail] = useState('');
  const [freeAccessReason, setFreeAccessReason] = useState('');
  const [freeAccessLoading, setFreeAccessLoading] = useState(false);
  const [freeAccessActionId, setFreeAccessActionId] = useState('');
  const [freeAccessError, setFreeAccessError] = useState('');
  const [chapters, setChapters] = useState<AdminChapterRecord[]>([]);
  const [topics, setTopics] = useState<AdminTopicRecord[]>([]);
  const [contentMcqs, setContentMcqs] = useState<AdminContentQuestionRecord[]>([]);
  const [contentCqs, setContentCqs] = useState<AdminContentQuestionRecord[]>([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError] = useState('');
  const [contentSearch, setContentSearch] = useState('');
  const [selectedContentChapterId, setSelectedContentChapterId] = useState('');
  const [selectedContentTopicId, setSelectedContentTopicId] = useState('');
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    let mounted = true;
    void getFirebaseDb().then(db => {
      if (mounted) setFirebaseDb(db);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (firebaseDb === undefined) {
      return undefined;
    }

    if (!firebaseDb) {
      setTrafficTotal(0);
      return undefined;
    }

    return onSnapshot(
      doc(firebaseDb, 'stats', 'traffic'),
      snapshot => {
        setTrafficTotal(Number(snapshot.data()?.pageViews || 0));
      },
      error => {
        console.error('Failed to read traffic stats:', error);
        setTrafficTotal(0);
      }
    );
  }, [firebaseDb]);

  const statCards = useMemo(() => ([
    { label: 'Total Chapters', value: adminStats.chapters, icon: BookOpen, iconClass: 'bg-indigo-500/20 text-indigo-400', delay: 0.1 },
    { label: 'Total Topics', value: adminStats.topics, icon: FileText, iconClass: 'bg-sky-500/20 text-sky-400', delay: 0.2 },
    { label: 'Total MCQs', value: adminStats.mcqs, icon: HelpCircle, iconClass: 'bg-emerald-500/20 text-emerald-400', delay: 0.3 },
    { label: 'Total Website Traffic', value: trafficTotal === null ? '...' : trafficTotal, icon: Globe2, iconClass: 'bg-cyan-500/20 text-cyan-400', delay: 0.4 },
    { label: 'Active Students', value: adminStats.activeStudents, icon: Users, iconClass: 'bg-pink-500/20 text-pink-400', delay: 0.5 },
    { label: 'Quiz Attempts', value: adminStats.quizAttempts, icon: Activity, iconClass: 'bg-amber-500/20 text-amber-400', delay: 0.6 },
    { label: 'Completed Topics', value: adminStats.completedTopics, icon: CheckCircle, iconClass: 'bg-green-500/20 text-green-400', delay: 0.7 },
  ]), [adminStats, trafficTotal]);

  const selectedContentChapter = useMemo(
    () => chapters.find(chapter => chapter.id === selectedContentChapterId) || null,
    [chapters, selectedContentChapterId]
  );

  const selectedContentTopic = useMemo(
    () => topics.find(topic => topic.id === selectedContentTopicId) || null,
    [selectedContentTopicId, topics]
  );

  const chapterScopedTopics = useMemo(
    () => topics.filter(topic => !selectedContentChapterId || topic.chapterId === selectedContentChapterId),
    [selectedContentChapterId, topics]
  );

  const visibleContentTopics = useMemo(() => {
    const query = contentSearch.trim().toLowerCase();
    if (!query) return chapterScopedTopics;

    return chapterScopedTopics.filter(topic =>
      [topic.title, topic.slug, topic.id]
        .some(value => value.toLowerCase().includes(query))
    );
  }, [chapterScopedTopics, contentSearch]);

  const topicQuestionStats = useMemo(() => {
    const stats = new Map<string, { mcqs: number; cqs: number }>();

    const touch = (topicId: string) => {
      if (!topicId) return null;
      const current = stats.get(topicId) || { mcqs: 0, cqs: 0 };
      stats.set(topicId, current);
      return current;
    };

    contentMcqs.forEach(question => {
      const current = touch(question.topicId);
      if (current) current.mcqs += 1;
    });

    contentCqs.forEach(question => {
      const current = touch(question.topicId);
      if (current) current.cqs += 1;
    });

    return stats;
  }, [contentCqs, contentMcqs]);

  const scopedContentStats = useMemo(() => {
    const scopedTopicIds = new Set(chapterScopedTopics.map(topic => topic.id));
    const scopedTopics = selectedContentTopicId
      ? chapterScopedTopics.filter(topic => topic.id === selectedContentTopicId)
      : chapterScopedTopics;
    const filteredMcqs = contentMcqs.filter(question => (
      selectedContentTopicId
        ? question.topicId === selectedContentTopicId
        : scopedTopicIds.has(question.topicId) || (!question.topicId && question.chapterId === selectedContentChapterId)
    ));
    const filteredCqs = contentCqs.filter(question => (
      selectedContentTopicId
        ? question.topicId === selectedContentTopicId
        : scopedTopicIds.has(question.topicId) || (!question.topicId && question.chapterId === selectedContentChapterId)
    ));

    return {
      chapters: chapters.length,
      topics: scopedTopics.length,
      mcqs: selectedContentChapterId || selectedContentTopicId ? filteredMcqs.length : contentMcqs.length,
      cqs: selectedContentChapterId || selectedContentTopicId ? filteredCqs.length : contentCqs.length,
      notesReady: scopedTopics.filter(topic => topic.board_notes.trim()).length,
      videosReady: scopedTopics.filter(topic => topic.video_url.trim()).length,
    };
  }, [
    chapterScopedTopics,
    chapters.length,
    contentCqs,
    contentMcqs,
    selectedContentChapterId,
    selectedContentTopicId,
  ]);

  const activityCards = useMemo(() => ([
    {
      label: 'Total Users',
      value: activityLoading && !activitySummary ? '...' : Number(activitySummary?.totalUsers || 0).toLocaleString('en-US'),
      description: 'Firebase Authentication accounts',
      icon: Users,
      iconClass: 'bg-sky-500/15 text-sky-300',
    },
    {
      label: 'Active Today',
      value: activityLoading && !activitySummary ? '...' : Number(activitySummary?.activeToday || 0).toLocaleString('en-US'),
      description: 'Users with a login today',
      icon: Activity,
      iconClass: 'bg-emerald-500/15 text-emerald-300',
    },
    {
      label: 'New Signups',
      value: activityLoading && !activitySummary ? '...' : Number(activitySummary?.newSignupsToday || 0).toLocaleString('en-US'),
      description: 'Accounts created today',
      icon: UserPlus,
      iconClass: 'bg-violet-500/15 text-violet-300',
    },
  ]), [activityLoading, activitySummary]);

  const visibleStudentProgressRows = useMemo(() => {
    const query = studentProgressQuery.trim().toLowerCase();
    if (!query) return studentProgressRows;

    return studentProgressRows.filter(student =>
      [
        student.name,
        student.email,
        student.lastTopicTitle || '',
        student.weakestTopic?.title || '',
      ].some(value => value.toLowerCase().includes(query))
    );
  }, [studentProgressQuery, studentProgressRows]);

  const nextChallengeSet = useMemo(() => {
    const now = Date.now();
    const upcoming = challengeSets
      .filter(item => item.startsAt && new Date(item.startsAt).getTime() >= now)
      .sort((a, b) => new Date(a.startsAt || 0).getTime() - new Date(b.startsAt || 0).getTime());

    return upcoming[0] || challengeSets[0] || null;
  }, [challengeSets]);

  const analyticsDashboardUrl = activitySummary?.analyticsDashboardUrl || DEFAULT_ANALYTICS_DASHBOARD_URL;

  const handleLogout = () => {
    logout();
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const requireAdminSession = () => {
    if (!isAdmin) {
      setNotice({ type: 'error', text: 'Unauthorized: verified Firestore admin role required.' });
      return false;
    }
    return true;
  };

  const loadContentLibrary = useCallback(async () => {
    if (!isAdmin || firebaseDb === undefined) {
      return;
    }

    if (!firebaseDb) {
      setChapters([]);
      setTopics([]);
      setContentMcqs([]);
      setContentCqs([]);
      return;
    }

    setContentLoading(true);
    try {
      const [chapterSnapshot, topicSnapshot, mcqSnapshot, cqSnapshot] = await Promise.all([
        getDocs(collection(firebaseDb, 'chapters')),
        getDocs(collection(firebaseDb, 'topics')),
        getDocs(collection(firebaseDb, 'mcqs')),
        getDocs(collection(firebaseDb, 'cqs')),
      ]);

      const nextChapters = chapterSnapshot.docs
        .map(item => {
          const data = item.data() || {};
          return {
            id: item.id,
            title: String(data.title || ''),
            slug: String(data.slug || ''),
            description: String(data.description || ''),
            order: Number(data.order || 0),
            level: String(data.level || ''),
            status: String(data.status || ''),
          };
        })
        .sort(compareByOrderThenTitle);

      const nextTopics = topicSnapshot.docs
        .map(item => {
          const data = item.data() || {};
          return {
            id: item.id,
            title: String(data.title || ''),
            slug: String(data.slug || ''),
            chapterId: String(data.chapterId || ''),
            importance: String(data.importance || ''),
            order: Number(data.order || 0),
            board_notes: String(data.board_notes || ''),
            video_url: String(data.video_url || ''),
          };
        })
        .sort(compareByOrderThenTitle);

      const mapQuestion = (id: string, data: Record<string, any>) => ({
        id,
        chapterId: String(data.chapterId || ''),
        topicId: String(data.topicId || ''),
      });

      setChapters(nextChapters);
      setTopics(nextTopics);
      setContentMcqs(mcqSnapshot.docs.map(item => mapQuestion(item.id, item.data())));
      setContentCqs(cqSnapshot.docs.map(item => mapQuestion(item.id, item.data())));
      setSelectedContentChapterId(current => (
        current && nextChapters.some(item => item.id === current)
          ? current
          : nextChapters[0]?.id || ''
      ));
      setContentError('');
    } catch (error: any) {
      setContentError(error?.message || 'Failed to load chapter/topic content inventory.');
      setChapters([]);
      setTopics([]);
      setContentMcqs([]);
      setContentCqs([]);
    } finally {
      setContentLoading(false);
    }
  }, [firebaseDb, isAdmin]);

  useEffect(() => {
    void loadContentLibrary();
  }, [loadContentLibrary]);

  useEffect(() => {
    if (!selectedContentTopicId) return;

    const selectedTopic = topics.find(topic => topic.id === selectedContentTopicId);
    if (selectedTopic && selectedContentChapterId && selectedTopic.chapterId !== selectedContentChapterId) {
      setSelectedContentTopicId('');
    }
  }, [selectedContentChapterId, selectedContentTopicId, topics]);

  const loadManualPayments = useCallback(async () => {
    if (!isAdmin) {
      setManualPayments([]);
      return;
    }

    setPaymentsLoading(true);
    try {
      const payments = await fetchManualPayments({ status: 'pending' });
      setManualPayments(payments);
    } catch (error: any) {
      setNotice({
        type: 'error',
        text: error?.message || 'Failed to load pending manual payments.',
      });
      setManualPayments([]);
    } finally {
      setPaymentsLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    void loadManualPayments();
  }, [loadManualPayments]);

  const loadAdminActivity = useCallback(async () => {
    if (!isAdmin) {
      setActivitySummary(null);
      return;
    }

    setActivityLoading(true);
    try {
      const summary = await fetchAdminActivity();
      setActivitySummary(summary);
      setActivityError('');
    } catch (error: any) {
      setActivityError(error?.message || 'Failed to load admin activity tracking.');
      setActivitySummary(null);
    } finally {
      setActivityLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    void loadAdminActivity();
  }, [loadAdminActivity]);

  const loadStudentProgress = useCallback(async () => {
    if (!isAdmin) {
      setStudentProgressSummary(null);
      setStudentProgressRows([]);
      return;
    }

    setStudentProgressLoading(true);
    try {
      const data = await fetchAdminPracticeProgress();
      setStudentProgressSummary(data.summary);
      setStudentProgressRows(data.students);
      setStudentProgressError('');
    } catch (error: any) {
      setStudentProgressSummary(null);
      setStudentProgressRows([]);
      setStudentProgressError(error?.message || 'Failed to load student progress.');
    } finally {
      setStudentProgressLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    void loadStudentProgress();
  }, [loadStudentProgress]);

  const loadFreeAccessGrants = useCallback(async () => {
    if (!isAdmin) {
      setFreeAccessGrants([]);
      return;
    }

    setFreeAccessLoading(true);
    try {
      const grants = await fetchAdminFreeAccessGrants();
      setFreeAccessGrants(grants);
      setFreeAccessError('');
    } catch (error: any) {
      setFreeAccessGrants([]);
      setFreeAccessError(error?.message || 'Failed to load free-access grants.');
    } finally {
      setFreeAccessLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    void loadFreeAccessGrants();
  }, [loadFreeAccessGrants]);

  const loadAdminLeaderboard = useCallback(async (challengeId = selectedLeaderboardChallengeId) => {
    if (!isAdmin) {
      setLeaderboardSets([]);
      setLeaderboardResults([]);
      setPaymentSummary(null);
      return;
    }

    setLeaderboardLoading(true);
    try {
      const data = await fetchAdminLeaderboard(challengeId || undefined);
      setLeaderboardSets(data.challengeSets || []);
      setLeaderboardResults(data.results || []);
      setPaymentSummary(data.paymentSummary || null);
      setSelectedLeaderboardChallengeId(data.selectedChallengeId || data.challengeSets?.[0]?.id || '');
      setLeaderboardError('');
    } catch (error: any) {
      setLeaderboardError(error?.message || 'Failed to load admin leaderboard.');
      setLeaderboardResults([]);
    } finally {
      setLeaderboardLoading(false);
    }
  }, [isAdmin, selectedLeaderboardChallengeId]);

  useEffect(() => {
    void loadAdminLeaderboard();
  }, [loadAdminLeaderboard]);

  const updateLeaderboardResult = (resultId: string, updates: Partial<AdminLeaderboardResult>) => {
    setLeaderboardResults(prev => prev.map(result =>
      result.id === resultId ? { ...result, ...updates } : result
    ));
  };

  const saveLeaderboardResult = async (result: AdminLeaderboardResult) => {
    if (!requireAdminSession() || !selectedLeaderboardChallengeId) return;

    setSavingLeaderboardResultId(result.id);
    try {
      await updateAdminLeaderboardResult({
        challengeId: selectedLeaderboardChallengeId,
        resultId: result.id,
        score: result.score,
        manualRank: result.manualRank || '',
      });
      setNotice({ type: 'success', text: `Merit list updated for ${result.email}.` });
      await loadAdminLeaderboard(selectedLeaderboardChallengeId);
    } catch (error: any) {
      setNotice({ type: 'error', text: error?.message || 'Failed to update merit list.' });
    } finally {
      setSavingLeaderboardResultId('');
    }
  };

  const publishLeaderboardResults = async () => {
    if (!requireAdminSession() || !selectedLeaderboardChallengeId) return;

    setPublishingLeaderboard(true);
    try {
      await publishAdminLeaderboard(selectedLeaderboardChallengeId);
      setNotice({ type: 'success', text: 'Leaderboard results published successfully.' });
      await loadAdminLeaderboard(selectedLeaderboardChallengeId);
    } catch (error: any) {
      setNotice({ type: 'error', text: error?.message || 'Failed to publish leaderboard results.' });
    } finally {
      setPublishingLeaderboard(false);
    }
  };

  const grantFreeAccess = async () => {
    if (!requireAdminSession()) return;

    const email = freeAccessEmail.trim();
    if (!email) {
      setFreeAccessError('Student Gmail is required.');
      return;
    }

    setFreeAccessActionId('grant');
    try {
      const grant = await grantAdminFreeAccess(email, freeAccessReason);
      const grantKey = getFreeAccessGrantKey(grant);
      setFreeAccessGrants(prev => [grant, ...prev.filter(item => getFreeAccessGrantKey(item) !== grantKey)]);
      setFreeAccessEmail('');
      setFreeAccessReason('');
      setFreeAccessError('');
      setNotice({ type: 'success', text: `Free full access granted to ${grant.email}.` });
    } catch (error: any) {
      setFreeAccessError(error?.message || 'Failed to grant free access.');
    } finally {
      setFreeAccessActionId('');
    }
  };

  const revokeFreeAccess = async (grant: AdminFreeAccessGrant) => {
    if (!requireAdminSession()) return;

    const grantKey = getFreeAccessGrantKey(grant);
    setFreeAccessActionId(grantKey);
    try {
      await revokeAdminFreeAccess(grant);
      setFreeAccessGrants(prev => prev.filter(item => getFreeAccessGrantKey(item) !== grantKey));
      setNotice({ type: 'success', text: `Free full access revoked for ${grant.email}.` });
    } catch (error: any) {
      setFreeAccessError(error?.message || 'Failed to revoke free access.');
    } finally {
      setFreeAccessActionId('');
    }
  };

  const loadQuizQuestionSets = useCallback(async () => {
    if (!isAdmin) {
      setChallengeSets([]);
      setSelectedQuestionChallengeId('');
      setQuizQuestions([]);
      return;
    }

    setQuizQuestionsLoading(true);
    try {
      const sets = await fetchAdminChallengeSets();
      setChallengeSets(sets);
      setSelectedQuestionChallengeId(current => (
        current && sets.some(item => item.id === current)
          ? current
          : (() => {
              const now = Date.now();
              const upcoming = sets
                .filter(item => item.startsAt && new Date(item.startsAt).getTime() >= now)
                .sort((a, b) => new Date(a.startsAt || 0).getTime() - new Date(b.startsAt || 0).getTime());
              return upcoming[0]?.id || sets[0]?.id || '';
            })()
      ));
      setQuizQuestionsError('');
    } catch (error: any) {
      setQuizQuestionsError(error?.message || 'Failed to load quiz question sets.');
      setChallengeSets([]);
      setSelectedQuestionChallengeId('');
      setQuizQuestions([]);
    } finally {
      setQuizQuestionsLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    void loadQuizQuestionSets();
  }, [loadQuizQuestionSets]);

  const loadQuizQuestions = useCallback(async () => {
    if (!isAdmin || !selectedQuestionChallengeId) {
      setQuizQuestions([]);
      setSelectedChallengeDetails(null);
      return;
    }

    setQuizQuestionsLoading(true);
    try {
      const data = await fetchAdminChallengeDetails(selectedQuestionChallengeId);
      setQuizQuestions(data.questions);
      setSelectedChallengeDetails(data.challenge);
      setQuizQuestionsError('');
    } catch (error: any) {
      setQuizQuestions([]);
      setSelectedChallengeDetails(null);
      setQuizQuestionsError(error?.message || 'Failed to load quiz questions.');
    } finally {
      setQuizQuestionsLoading(false);
    }
  }, [isAdmin, selectedQuestionChallengeId]);

  useEffect(() => {
    void loadQuizQuestions();
  }, [loadQuizQuestions]);

  const loadNextChallengeOverview = useCallback(async () => {
    if (!isAdmin || !nextChallengeSet?.id) {
      setNextChallengeDetails(null);
      setNextChallengeQuestions([]);
      return;
    }

    try {
      const data = await fetchAdminChallengeDetails(nextChallengeSet.id);
      setNextChallengeDetails(data.challenge);
      setNextChallengeQuestions(data.questions);
    } catch {
      setNextChallengeDetails(null);
      setNextChallengeQuestions([]);
    }
  }, [isAdmin, nextChallengeSet?.id]);

  useEffect(() => {
    void loadNextChallengeOverview();
  }, [loadNextChallengeOverview]);

  const updateQuizQuestion = (questionId: string, updates: Partial<AdminQuizQuestion>) => {
    setQuizQuestions(prev => prev.map(question =>
      question.id === questionId ? { ...question, ...updates } : question
    ));
  };

  const updateQuizQuestionOption = (questionId: string, optionIndex: number, value: string) => {
    setQuizQuestions(prev => prev.map(question => {
      if (question.id !== questionId) return question;

      const options = [...question.options, '', '', '', ''].slice(0, 4);
      const previousValue = options[optionIndex];
      options[optionIndex] = value;

      return {
        ...question,
        options,
        correctAnswer: question.correctAnswer === previousValue ? value : question.correctAnswer,
      };
    }));
  };

  const saveQuizQuestion = async (question: AdminQuizQuestion) => {
    if (!requireAdminSession() || !selectedQuestionChallengeId) return;

    setSavingQuestionId(question.id);
    try {
      const savedQuestion = await saveAdminQuizQuestion(selectedQuestionChallengeId, {
        ...question,
        options: question.options.map(option => option.trim()).filter(Boolean),
      });

      setQuizQuestions(prev => prev.map(item => item.id === savedQuestion.id ? savedQuestion : item));
      setNotice({
        type: 'success',
        text: `Question ${question.order || question.id} saved successfully.`,
      });
      if (nextChallengeSet?.id === selectedQuestionChallengeId) {
        await loadNextChallengeOverview();
      }
    } catch (error: any) {
      setNotice({
        type: 'error',
        text: error?.message || 'Failed to save quiz question.',
      });
    } finally {
      setSavingQuestionId('');
    }
  };

  const handleManualPaymentDecision = async (paymentId: string, action: 'approve' | 'reject') => {
    if (!requireAdminSession()) return;

    setPaymentActionId(`${action}:${paymentId}`);
    try {
      if (action === 'approve') {
        await approveManualPayment(paymentId);
      } else {
        await rejectManualPayment(paymentId);
      }

      setNotice({
        type: 'success',
        text: `Payment request ${action === 'approve' ? 'approved' : 'rejected'} successfully.`,
      });
      await loadManualPayments();
    } catch (error: any) {
      setNotice({
        type: 'error',
        text: error?.message || `Failed to ${action} payment request.`,
      });
    } finally {
      setPaymentActionId('');
    }
  };

  const handleManualPaymentReminder = async (payment: ManualPaymentRecord) => {
    if (!requireAdminSession()) return;

    const reminderUrl = buildPendingPaymentReminderUrl(payment);
    if (!reminderUrl) {
      setNotice({
        type: 'error',
        text: 'This payment does not have a valid Bangladeshi WhatsApp number.',
      });
      return;
    }

    window.open(reminderUrl, '_blank', 'noopener,noreferrer');

    try {
      const updatedPayment = await recordManualPaymentReminder(payment.id);
      setManualPayments(prev => prev.map(item => item.id === updatedPayment.id ? updatedPayment : item));
      setNotice({
        type: 'success',
        text: 'WhatsApp reminder opened and follow-up was logged.',
      });
    } catch (error: any) {
      setNotice({
        type: 'error',
        text: error?.message || 'WhatsApp opened, but the reminder log could not be saved.',
      });
    }
  };

  const updateForm = (action: ActionType, field: string, value: string) => {
    setForms(prev => ({
      ...prev,
      [action]: {
        ...prev[action],
        [field]: value,
      },
    }));
  };

  const openAction = (action: ActionType) => {
    setNotice(null);
    if (action === 'quizQuestion') {
      setForms(prev => ({
        ...prev,
        quizQuestion: {
          ...prev.quizQuestion,
          challengeId: prev.quizQuestion.challengeId || selectedQuestionChallengeId || challengeSets[0]?.id || '',
          chapterId: prev.quizQuestion.chapterId || selectedContentChapterId,
          topicId: prev.quizQuestion.topicId || selectedContentTopicId,
          order: prev.quizQuestion.order || String(quizQuestions.length + 1 || 1),
        },
      }));
    }
    setActiveAction(action);
  };

  const openChallengeEditor = (challenge: AdminChallengeDetails | null) => {
    if (!challenge) {
      openAction('challenge');
      return;
    }

    setForms(prev => ({
      ...prev,
      challenge: {
        title: challenge.title,
        challengeId: challenge.id,
        startsAt: toDateTimeLocal(challenge.startsAt),
        endsAt: toDateTimeLocal(challenge.endsAt),
        fee: String(challenge.fee || 0),
        totalMarks: String(challenge.totalMarks || 0),
        durationMinutes: String(challenge.durationMinutes || 30),
        status: challenge.status,
        syllabus: challenge.syllabus.join('\n'),
      },
    }));
    openAction('challenge');
  };

  const openScopedAction = (action: Extract<ActionType, 'topic' | 'mcq' | 'cq' | 'quizQuestion'>) => {
    setForms(prev => ({
      ...prev,
      ...(action === 'topic'
        ? {
            topic: {
              ...prev.topic,
              chapterId: selectedContentChapterId,
            },
          }
        : {}),
      ...(action === 'mcq'
        ? {
            mcq: {
              ...prev.mcq,
              chapterId: selectedContentChapterId,
              topicId: selectedContentTopicId,
            },
          }
        : {}),
      ...(action === 'cq'
        ? {
            cq: {
              ...prev.cq,
              chapterId: selectedContentChapterId,
              topicId: selectedContentTopicId,
            },
          }
        : {}),
      ...(action === 'quizQuestion'
        ? {
            quizQuestion: {
              ...prev.quizQuestion,
              challengeId: selectedQuestionChallengeId || challengeSets[0]?.id || '',
              chapterId: selectedContentChapterId,
              topicId: selectedContentTopicId,
              order: String(quizQuestions.length + 1 || 1),
            },
          }
        : {}),
    }));
    openAction(action);
  };

  const closeAction = () => {
    if (isSaving) return;
    setActiveAction(null);
  };

  const saveAction = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!activeAction || !requireAdminSession()) return;

    if (firebaseDb === undefined) {
      setNotice({ type: 'error', text: 'Firebase is still loading. Please try again in a moment.' });
      return;
    }

    if (!firebaseDb) {
      setNotice({ type: 'error', text: 'Firebase is not configured. Check your VITE_FIREBASE_* environment variables.' });
      return;
    }

    const submittedAction = activeAction;
    setIsSaving(true);
    setNotice(null);

    try {
      const payload = buildFirestorePayload(submittedAction, forms);
      const collectionName = actionConfig[submittedAction].collectionName;
      let savedId = '';
      let quizChallengeId = '';

      if (submittedAction === 'quizQuestion') {
        const quizPayload = payload as ReturnType<typeof buildFirestorePayload> & {
          challengeId: string;
          question: string;
          q: string;
          options: string[];
          correctAnswer: string;
          correct: string;
          explanation: string;
          chapterId: string;
          topicId: string;
          order: number;
        };
        quizChallengeId = quizPayload.challengeId;
        const challengeRef = doc(firebaseDb, 'megaChallenges', quizPayload.challengeId);
        const challengeSnap = await getDoc(challengeRef);

        if (!challengeSnap.exists()) {
          throw new Error('Choose an existing quiz routine before adding quiz questions.');
        }

        const questionRef = doc(collection(firebaseDb, 'megaChallenges', quizPayload.challengeId, 'questions'));
        savedId = questionRef.id;
        const embeddedQuestion = {
          id: savedId,
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

        await setDoc(questionRef, {
          ...embeddedQuestion,
          challengeId: quizPayload.challengeId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }, { merge: true });

        const challengeData = challengeSnap.data() || {};
        await setDoc(challengeRef, {
          questionCount: Array.isArray(challengeData.questions)
            ? challengeData.questions.length + 1
            : increment(1),
          ...(Array.isArray(challengeData.questions)
            ? { questions: [...challengeData.questions, embeddedQuestion] }
            : {}),
          updatedAt: serverTimestamp(),
        }, { merge: true });

        const currentRef = doc(firebaseDb, 'megaChallenges', 'current');
        const currentSnap = await getDoc(currentRef);
        if (
          currentSnap.exists() &&
          currentSnap.data()?.currentChallengeId === quizPayload.challengeId &&
          Array.isArray(currentSnap.data()?.questions)
        ) {
          await setDoc(currentRef, {
            questions: [...currentSnap.data()?.questions, embeddedQuestion],
            questionCount: currentSnap.data()?.questions.length + 1,
            updatedAt: serverTimestamp(),
          }, { merge: true });
        }

        await loadQuizQuestionSets();
        if (selectedQuestionChallengeId === quizPayload.challengeId) {
          await loadQuizQuestions();
        }
        if (nextChallengeSet?.id === quizPayload.challengeId) {
          await loadNextChallengeOverview();
        }
      } else if (submittedAction === 'challenge') {
        savedId = String((payload as { id: string }).id);
        await setDoc(doc(firebaseDb, collectionName, savedId), payload, { merge: true });
        if ((payload as { status?: string }).status === 'LIVE') {
          await setDoc(
            doc(firebaseDb, collectionName, 'current'),
            {
              currentChallengeId: savedId,
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
        }
      } else {
        const saved = await addDoc(collection(firebaseDb, collectionName), payload);
        savedId = saved.id;
      }

      if (['chapter', 'topic', 'mcq', 'cq'].includes(submittedAction)) {
        await loadContentLibrary();
      }
      if (submittedAction === 'challenge') {
        await loadQuizQuestionSets();
        await loadNextChallengeOverview();
      }

      const resetForms = makeInitialForms();

      setForms(prev => ({
        ...prev,
        [submittedAction]: resetForms[submittedAction],
      }));
      setActiveAction(null);
      setNotice({
        type: 'success',
        text: submittedAction === 'quizQuestion'
          ? `Quiz question saved to ${quizChallengeId} with ID ${savedId}.`
          : `${actionConfig[submittedAction].label} saved to Firestore/${collectionName} with ID ${savedId}.`,
      });
    } catch (error: any) {
      setNotice({
        type: 'error',
        text: error?.message || 'Failed to save data to Firestore.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const generateChallenge = async () => {
    if (!requireAdminSession()) return;

    if (firebaseDb === undefined) {
      setNotice({ type: 'error', text: 'Firebase is still loading. Please try again in a moment.' });
      return;
    }

    if (!firebaseDb) {
      setNotice({ type: 'error', text: 'Firebase is not configured. Challenge generation needs Firestore access.' });
      return;
    }

    setIsGenerating(true);
    setNotice(null);

    try {
      const snapshot = await getDocs(collection(firebaseDb, 'mcqs'));
      const mcqs = snapshot.docs
        .map(item => normalizeMcq(item.id, item.data()))
        .filter((item): item is MegaChallengeQuestion => Boolean(item));

      if (mcqs.length < 30) {
        throw new Error(`At least 30 valid MCQs are required in Firestore/mcqs. Found ${mcqs.length}.`);
      }

      const selectedQuestions = [...mcqs].sort(() => Math.random() - 0.5).slice(0, 30);
      const currentRef = doc(firebaseDb, 'megaChallenges', 'current');
      const currentSnap = await getDoc(currentRef);
      let challengeId = getCurrentChallengeId();
      
      if (currentSnap.exists() && currentSnap.data().currentChallengeId) {
        challengeId = currentSnap.data().currentChallengeId;
      }
      
      const now = new Date();
      const month = now.toLocaleString('default', { month: 'long' });
      const year = now.getFullYear();
      const challengePayload = {
        id: challengeId,
        title: 'HSC ICT Monthly Quiz Exam',
        month,
        year,
        status: 'LIVE',
        sourceCollection: 'mcqs',
        questionCount: selectedQuestions.length,
        totalMarks: selectedQuestions.length,
        durationMinutes: 30,
        questions: selectedQuestions,
        updatedAt: serverTimestamp(),
      };

      await setDoc(
        doc(firebaseDb, 'megaChallenges', challengeId),
        {
          ...challengePayload,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      await setDoc(
        doc(firebaseDb, 'megaChallenges', 'current'),
        {
          ...challengePayload,
          currentChallengeId: challengeId,
        },
        { merge: true }
      );

      const batch = writeBatch(firebaseDb);
      selectedQuestions.forEach((question, index) => {
        batch.set(
          doc(firebaseDb, 'megaChallenges', challengeId, 'questions', question.id),
          {
            ...question,
            challengeId,
            order: index + 1,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      });
      await batch.commit();

      setNotice({
        type: 'success',
        text: `Mega Challenge ${challengeId} is live with ${selectedQuestions.length} random MCQs from Firestore.`,
      });
    } catch (error: any) {
      console.error('Challenge generation error:', error);
      setNotice({
        type: 'error',
        text: error?.message || 'Error generating challenge from Firestore MCQs.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderActionForm = (action: ActionType) => {
    if (action === 'chapter') {
      const form = forms.chapter;
      return (
        <>
          <TextInput label="Chapter Title" value={form.title} onChange={value => updateForm(action, 'title', value)} placeholder="Chapter 1: Information and Communication Technology" required />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Slug" value={form.slug} onChange={value => updateForm(action, 'slug', value)} placeholder="hsc-ict-chapter-1" />
            <TextInput label="Order" type="number" value={form.order} onChange={value => updateForm(action, 'order', value)} required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Level" value={form.level} onChange={value => updateForm(action, 'level', value)} />
            <SelectInput label="Status" value={form.status} onChange={value => updateForm(action, 'status', value)} options={['published', 'draft']} />
          </div>
          <TextAreaInput label="Description" value={form.description} onChange={value => updateForm(action, 'description', value)} placeholder="Short summary of this chapter." />
        </>
      );
    }

    if (action === 'topic') {
      const form = forms.topic;
      return (
        <>
          <TextInput label="Topic Title" value={form.title} onChange={value => updateForm(action, 'title', value)} placeholder="Logic Gates" required />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Chapter ID" value={form.chapterId} onChange={value => updateForm(action, 'chapterId', value)} placeholder="chap-3" listId="admin-chapter-options" required />
            <TextInput label="Order" type="number" value={form.order} onChange={value => updateForm(action, 'order', value)} required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Slug" value={form.slug} onChange={value => updateForm(action, 'slug', value)} placeholder="logic-gates" />
            <SelectInput label="Importance" value={form.importance} onChange={value => updateForm(action, 'importance', value)} options={['High', 'Medium', 'Low']} />
          </div>
          <TextInput label="Video URL" value={form.video_url} onChange={value => updateForm(action, 'video_url', value)} placeholder="https://youtube.com/..." />
          <TextAreaInput label="Lecture Notes" value={form.board_notes} onChange={value => updateForm(action, 'board_notes', value)} placeholder="Paste notes, HTML, or markdown content." rows={5} />
        </>
      );
    }

    if (action === 'mcq') {
      const form = forms.mcq;
      return (
        <>
          <TextAreaInput label="Question" value={form.question} onChange={value => updateForm(action, 'question', value)} placeholder="Which one is a valid ICT concept?" required rows={4} />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Option A" value={form.optionA} onChange={value => updateForm(action, 'optionA', value)} required />
            <TextInput label="Option B" value={form.optionB} onChange={value => updateForm(action, 'optionB', value)} required />
            <TextInput label="Option C" value={form.optionC} onChange={value => updateForm(action, 'optionC', value)} required />
            <TextInput label="Option D" value={form.optionD} onChange={value => updateForm(action, 'optionD', value)} required />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <SelectInput label="Correct Option" value={form.correctOption} onChange={value => updateForm(action, 'correctOption', value)} options={['A', 'B', 'C', 'D']} />
            <SelectInput label="Difficulty" value={form.difficulty} onChange={value => updateForm(action, 'difficulty', value)} options={['Easy', 'Medium', 'Hard']} />
            <TextInput label="Source" value={form.source} onChange={value => updateForm(action, 'source', value)} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Chapter ID" value={form.chapterId} onChange={value => updateForm(action, 'chapterId', value)} placeholder="chap-2" listId="admin-chapter-options" />
            <TextInput label="Topic ID" value={form.topicId} onChange={value => updateForm(action, 'topicId', value)} placeholder="topic-2-1" listId="admin-topic-options" />
          </div>
          <TextAreaInput label="Explanation" value={form.explanation} onChange={value => updateForm(action, 'explanation', value)} placeholder="Why this answer is correct." rows={4} />
        </>
      );
    }

    if (action === 'cq') {
      const form = forms.cq;
      return (
        <>
          <TextAreaInput label="Stem" value={form.stem} onChange={value => updateForm(action, 'stem', value)} placeholder="Creative question scenario / uddipok." required rows={5} />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Chapter ID" value={form.chapterId} onChange={value => updateForm(action, 'chapterId', value)} placeholder="chap-4" listId="admin-chapter-options" />
            <TextInput label="Topic ID" value={form.topicId} onChange={value => updateForm(action, 'topicId', value)} placeholder="topic-4-1" listId="admin-topic-options" />
          </div>
          <TextInput label="Question A" value={form.qA} onChange={value => updateForm(action, 'qA', value)} placeholder="Knowledge question" />
          <TextInput label="Question B" value={form.qB} onChange={value => updateForm(action, 'qB', value)} placeholder="Comprehension question" />
          <TextInput label="Question C" value={form.qC} onChange={value => updateForm(action, 'qC', value)} placeholder="Application question" required />
          <TextInput label="Question D" value={form.qD} onChange={value => updateForm(action, 'qD', value)} placeholder="Higher-order question" required />
          <TextAreaInput label="Answer Guide" value={form.answerGuide} onChange={value => updateForm(action, 'answerGuide', value)} placeholder="Optional answer hints or marking guide." rows={4} />
        </>
      );
    }

    if (action === 'quizQuestion') {
      const form = forms.quizQuestion;
      return (
        <>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-600 dark:text-gray-300">Quiz Set</span>
            <select
              value={form.challengeId}
              onChange={event => updateForm(action, 'challengeId', event.target.value)}
              required
              className="w-full rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
            >
              <option value="">Select published quiz set</option>
              {challengeSets.map(item => (
                <option key={item.id} value={item.id}>
                  {item.title} - {item.id}
                </option>
              ))}
            </select>
          </label>
          <TextAreaInput label="Question" value={form.question} onChange={value => updateForm(action, 'question', value)} placeholder="Write the monthly quiz question." required rows={4} />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Option A" value={form.optionA} onChange={value => updateForm(action, 'optionA', value)} required />
            <TextInput label="Option B" value={form.optionB} onChange={value => updateForm(action, 'optionB', value)} required />
            <TextInput label="Option C" value={form.optionC} onChange={value => updateForm(action, 'optionC', value)} required />
            <TextInput label="Option D" value={form.optionD} onChange={value => updateForm(action, 'optionD', value)} required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <SelectInput label="Correct Option" value={form.correctOption} onChange={value => updateForm(action, 'correctOption', value)} options={['A', 'B', 'C', 'D']} />
            <TextInput label="Question Order" type="number" value={form.order} onChange={value => updateForm(action, 'order', value)} placeholder="1" required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Chapter ID" value={form.chapterId} onChange={value => updateForm(action, 'chapterId', value)} placeholder="chap-2" listId="admin-chapter-options" />
            <TextInput label="Topic ID" value={form.topicId} onChange={value => updateForm(action, 'topicId', value)} placeholder="topic-2-1" listId="admin-topic-options" />
          </div>
          <TextAreaInput label="Explanation" value={form.explanation} onChange={value => updateForm(action, 'explanation', value)} placeholder="Why the answer is correct." rows={4} />
        </>
      );
    }

    if (action === 'course') {
      const form = forms.course;
      return (
        <>
          <TextInput label="Course Title" value={form.title} onChange={value => updateForm(action, 'title', value)} placeholder="ICT Full Course Recorded" required />
          <div className="grid gap-4 md:grid-cols-3">
            <SelectInput label="Type" value={form.type} onChange={value => updateForm(action, 'type', value)} options={['RECORDED', 'LIVE']} />
            <TextInput label="Fee" type="number" value={form.fee} onChange={value => updateForm(action, 'fee', value)} required />
            <SelectInput label="Status" value={form.status} onChange={value => updateForm(action, 'status', value)} options={['published', 'draft', 'archived']} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Class Count" type="number" value={form.classCount} onChange={value => updateForm(action, 'classCount', value)} />
            <TextInput label="Class Duration" value={form.classDuration} onChange={value => updateForm(action, 'classDuration', value)} />
          </div>
          <TextAreaInput label="Description" value={form.description} onChange={value => updateForm(action, 'description', value)} placeholder="Course overview." rows={4} />
          <TextAreaInput label="Features" value={form.features} onChange={value => updateForm(action, 'features', value)} placeholder="One feature per line." rows={5} />
        </>
      );
    }

    if (action === 'challenge') {
      const form = forms.challenge;
      return (
        <>
          <TextInput label="Quiz Title" value={form.title} onChange={value => updateForm(action, 'title', value)} placeholder="HSC ICT Monthly Quiz Exam" required />
          <TextInput label="Routine ID (optional)" value={form.challengeId} onChange={value => updateForm(action, 'challengeId', value)} placeholder="quiz-2026-05-15-number-systems" />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Starts At" type="datetime-local" value={form.startsAt} onChange={value => updateForm(action, 'startsAt', value)} required />
            <TextInput label="Ends At (optional)" type="datetime-local" value={form.endsAt} onChange={value => updateForm(action, 'endsAt', value)} />
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <TextInput label="Fee" type="number" value={form.fee} onChange={value => updateForm(action, 'fee', value)} required />
            <TextInput label="Total Marks" type="number" value={form.totalMarks} onChange={value => updateForm(action, 'totalMarks', value)} required />
            <TextInput label="Duration (minutes)" type="number" value={form.durationMinutes} onChange={value => updateForm(action, 'durationMinutes', value)} required />
            <SelectInput label="Status" value={form.status} onChange={value => updateForm(action, 'status', value)} options={['LIVE', 'DRAFT']} />
          </div>
          <TextAreaInput label="Syllabus / Topics" value={form.syllabus} onChange={value => updateForm(action, 'syllabus', value)} placeholder="One topic per line." rows={6} />
        </>
      );
    }

    const form = forms.suggestion;
    return (
      <>
        <TextInput label="Suggestion Title" value={form.title} onChange={value => updateForm(action, 'title', value)} placeholder="HSC ICT Master Suggestion" required />
        <div className="grid gap-4 md:grid-cols-3">
          <TextInput label="Category" value={form.category} onChange={value => updateForm(action, 'category', value)} />
          <TextInput label="Price" type="number" value={form.price} onChange={value => updateForm(action, 'price', value)} required />
          <SelectInput label="Status" value={form.status} onChange={value => updateForm(action, 'status', value)} options={['published', 'draft', 'archived']} />
        </div>
        <TextAreaInput label="Description" value={form.description} onChange={value => updateForm(action, 'description', value)} placeholder="Suggestion product overview." rows={4} />
        <TextAreaInput label="Highlights" value={form.highlights} onChange={value => updateForm(action, 'highlights', value)} placeholder="One highlight per line." rows={5} />
        <TextAreaInput label="Demo Content" value={form.demoContent} onChange={value => updateForm(action, 'demoContent', value)} placeholder="Short demo text shown before purchase." rows={5} />
      </>
    );
  };

  const activeConfig = activeAction ? actionConfig[activeAction] : null;

  return (
    <div className="flex-1 flex flex-col px-5 sm:px-8 md:px-16 py-8 relative z-20">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Database className="text-sky-400" /> Admin Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage Firestore content, quiz inventory, and monthly challenge operations.</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full md:w-auto px-4 py-2 rounded-xl bg-slate-900/5 dark:bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-900/10 dark:border-white/10 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {firebaseDb === null && (
        <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-300">
          Firestore is not configured. Add the VITE_FIREBASE_* environment variables before using admin write actions.
        </div>
      )}

      {notice && (
        <div className={`mb-6 rounded-2xl border px-5 py-4 text-sm font-semibold ${
          notice.type === 'success'
            ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
            : 'border-rose-400/30 bg-rose-400/10 text-rose-300'
        }`}>
          {notice.text}
        </div>
      )}

      <datalist id="admin-chapter-options">
        {chapters.map(chapter => (
          <option key={chapter.id} value={chapter.id} label={`${chapter.title} (${chapter.id})`} />
        ))}
      </datalist>
      <datalist id="admin-topic-options">
        {topics.map(topic => (
          <option key={topic.id} value={topic.id} label={`${topic.title} (${topic.id})`} />
        ))}
      </datalist>

      <section className="mb-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-sky-400">Activity Tracking</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Firebase Auth activity and analytics access.</p>
          </div>
          <button
            type="button"
            onClick={loadAdminActivity}
            disabled={activityLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-900/10 disabled:cursor-wait disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {activityLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </button>
        </div>

        {activityError && (
          <div className="mb-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-4 text-sm font-semibold text-rose-300">
            {activityError}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1.2fr]">
          {activityCards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-3xl border border-slate-900/10 bg-slate-900/5 p-5 dark:border-white/10 dark:bg-white/5"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconClass}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {activityLoading && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{card.value}</div>
                <div className="mt-1 text-sm font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{card.label}</div>
                <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{card.description}</p>
              </div>
            );
          })}

          <a
            href={analyticsDashboardUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl border border-sky-400/20 bg-sky-400/10 p-5 transition hover:border-sky-300/40 hover:bg-sky-400/15"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300">
                <Globe2 className="h-6 w-6" />
              </div>
              <ExternalLink className="h-4 w-4 text-sky-300" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">GA</div>
            <div className="mt-1 text-sm font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Live Visitors</div>
            <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Open Google Analytics realtime dashboard.</p>
          </a>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-900/10 bg-slate-900/5 dark:border-white/10 dark:bg-white/5">
          <button
            type="button"
            onClick={() => setRecentUsersExpanded(value => !value)}
            className="flex w-full flex-col gap-2 border-b border-slate-900/10 px-5 py-4 text-left transition hover:bg-slate-900/5 dark:border-white/10 dark:hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Recent Logins / Signups</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Latest 10 Firebase Auth users sorted by recent activity.</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-black text-sky-500 dark:text-sky-300">
              {recentUsersExpanded ? 'Hide' : 'Show'}
              <ChevronDown className={`h-4 w-4 transition-transform ${recentUsersExpanded ? 'rotate-180' : ''}`} />
            </span>
          </button>
          {recentUsersExpanded && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-900/5 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Last Login</th>
                  <th className="px-5 py-3">Created</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/10 dark:divide-white/10">
                {activityLoading && !activitySummary ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center font-bold text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading recent users...
                      </span>
                    </td>
                  </tr>
                ) : activitySummary?.recentUsers.length ? (
                  activitySummary.recentUsers.map(recentUser => (
                    <tr key={recentUser.uid} className="text-slate-700 dark:text-slate-200">
                      <td className="px-5 py-4">
                        <div className="font-bold">{recentUser.email}</div>
                        <div className="mt-1 max-w-[260px] truncate text-xs font-semibold text-slate-500 dark:text-slate-400">{recentUser.uid}</div>
                      </td>
                      <td className="px-5 py-4 font-semibold">{formatActivityDate(recentUser.lastLoginAt)}</td>
                      <td className="px-5 py-4 font-semibold">{formatActivityDate(recentUser.createdAt)}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-black ${
                          recentUser.disabled
                            ? 'bg-rose-500/10 text-rose-400'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {recentUser.disabled ? 'Disabled' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center font-bold text-slate-500 dark:text-slate-400">
                      No recent users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-emerald-400">
              <BarChart3 className="h-5 w-5" />
              Student Progress
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Track reading activity, daily topic-exam results, weak topics, and reach students directly.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={studentProgressQuery}
                onChange={event => setStudentProgressQuery(event.target.value)}
                placeholder="Search student or topic..."
                className="min-h-[42px] rounded-xl border border-slate-900/10 bg-white py-2 pl-10 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={() => void loadStudentProgress()}
              disabled={studentProgressLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-900/10 disabled:cursor-wait disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              {studentProgressLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { label: 'Tracked Students', value: studentProgressSummary?.trackedStudents || 0 },
            { label: 'Studied Topics', value: studentProgressSummary?.studiedTopics || 0 },
            { label: 'Completed Topics', value: studentProgressSummary?.completedTopics || 0 },
            { label: 'Practice Attempts', value: studentProgressSummary?.practiceAttempts || 0 },
            { label: 'Avg Accuracy', value: `${studentProgressSummary?.averageAccuracy || 0}%` },
          ].map(item => (
            <div key={item.label} className="rounded-2xl border border-slate-900/10 bg-slate-900/5 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{item.label}</div>
              <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{item.value}</div>
            </div>
          ))}
        </div>

        {studentProgressError && (
          <div className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-4 text-sm font-semibold text-rose-300">
            {studentProgressError}
          </div>
        )}

        <div className="mt-5 overflow-hidden rounded-3xl border border-slate-900/10 dark:border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] text-left text-sm">
              <thead className="bg-slate-900/5 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Study</th>
                  <th className="px-5 py-4">Exam Result</th>
                  <th className="px-5 py-4">Weak Topic</th>
                  <th className="px-5 py-4">Last Activity</th>
                  <th className="px-5 py-4 text-right">Reach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/10 dark:divide-white/10">
                {studentProgressLoading && studentProgressRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center font-bold text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading student progress...
                      </span>
                    </td>
                  </tr>
                ) : visibleStudentProgressRows.length ? (
                  visibleStudentProgressRows.map(student => {
                    const whatsappUrl = buildStudentProgressWhatsappUrl(student);

                    return (
                      <tr key={student.uid} className="text-slate-700 dark:text-slate-200">
                        <td className="px-5 py-4">
                          <div className="font-black">{student.name}</div>
                          <div className="mt-1 max-w-[260px] truncate text-xs font-semibold text-slate-500 dark:text-slate-400">{student.email}</div>
                        </td>
                        <td className="px-5 py-4 font-semibold">
                          <div>{student.topicsVisited} read / {student.topicsCompleted} completed</div>
                          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{student.totalVisits} total visits</div>
                        </td>
                        <td className="px-5 py-4 font-semibold">
                          <div>{student.practiceAttempts} attempts</div>
                          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Avg {student.averageAccuracy}% | Best {student.bestAccuracy}%
                          </div>
                        </td>
                        <td className="px-5 py-4 font-semibold">
                          {student.weakestTopic ? (
                            <>
                              <div>{student.weakestTopic.title}</div>
                              <div className="mt-1 text-xs text-rose-500 dark:text-rose-300">
                                {student.weakestTopic.averageAccuracy}% avg accuracy
                              </div>
                            </>
                          ) : (
                            <span className="text-slate-400">No exam yet</span>
                          )}
                        </td>
                        <td className="px-5 py-4 font-semibold">
                          <div>{formatActivityDate(student.lastActivityAt)}</div>
                          <div className="mt-1 max-w-[240px] truncate text-xs text-slate-500 dark:text-slate-400">
                            {student.lastTopicTitle || 'No recent topic'}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="inline-flex gap-2">
                            <a
                              href={buildStudentProgressEmailHref(student)}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-400/25 bg-sky-500/10 px-3 py-2 text-xs font-black text-sky-500 transition hover:bg-sky-500/15 dark:text-sky-300"
                            >
                              <Mail className="h-4 w-4" />
                              Email
                            </a>
                            {whatsappUrl && (
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-xs font-black text-emerald-500 transition hover:bg-emerald-500/15 dark:text-emerald-300"
                              >
                                <MessageCircle className="h-4 w-4" />
                                WhatsApp
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center font-bold text-slate-500 dark:text-slate-400">
                      No synced student progress found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-cyan-400">
              <CalendarClock className="h-5 w-5" />
              Next Quiz Exam Control
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              See the next exam date, syllabus, published questions, and edit the routine from one place.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadNextChallengeOverview()}
            disabled={!nextChallengeSet}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-900/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        <div className="rounded-3xl border border-slate-900/10 bg-slate-900/5 p-5 dark:border-white/10 dark:bg-white/5 md:p-6">
          {!nextChallengeDetails ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                <CalendarDays className="h-6 w-6" />
              </div>
              <p className="font-bold text-slate-700 dark:text-slate-200">No quiz routine found yet.</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Use the Quiz Routine action to publish the next exam.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-slate-900/10 bg-white/75 p-5 dark:border-white/10 dark:bg-slate-950/55">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-500 dark:text-cyan-300">Upcoming Routine</p>
                      <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{nextChallengeDetails.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">ID: {nextChallengeDetails.id}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openChallengeEditor(nextChallengeDetails)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-black text-white transition hover:bg-cyan-400"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit Routine
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: 'Starts', value: formatActivityDate(nextChallengeDetails.startsAt) },
                      { label: 'Ends', value: formatActivityDate(nextChallengeDetails.endsAt) },
                      { label: 'Fee', value: formatCurrency(nextChallengeDetails.fee) },
                      { label: 'Duration', value: `${nextChallengeDetails.durationMinutes} minutes` },
                      { label: 'Marks', value: String(nextChallengeDetails.totalMarks) },
                      { label: 'Questions', value: String(nextChallengeQuestions.length || nextChallengeDetails.questionCount) },
                    ].map(item => (
                      <div key={item.label} className="rounded-2xl border border-slate-900/10 bg-slate-900/5 p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{item.label}</div>
                        <div className="mt-1 font-black text-slate-900 dark:text-white">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-900/10 bg-white/75 p-5 dark:border-white/10 dark:bg-slate-950/55">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-500 dark:text-violet-300">Syllabus</p>
                      <h3 className="mt-1 text-lg font-black text-slate-900 dark:text-white">What students will face</h3>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${
                      nextChallengeDetails.status === 'LIVE'
                        ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-300'
                        : 'bg-amber-500/10 text-amber-500 dark:text-amber-300'
                    }`}>
                      {nextChallengeDetails.status}
                    </span>
                  </div>

                  {nextChallengeDetails.syllabus.length ? (
                    <div className="grid gap-2">
                      {nextChallengeDetails.syllabus.map(item => (
                        <div key={item} className="rounded-xl border border-slate-900/10 bg-slate-900/5 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-4 text-sm font-semibold text-amber-600 dark:text-amber-300">
                      No syllabus added yet. Edit the routine and add one topic per line.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-900/10 dark:border-white/10">
                <div className="flex flex-col gap-3 border-b border-slate-900/10 bg-slate-900/5 px-4 py-3 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white">Published Questions</p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Preview of the next exam question set.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedQuestionChallengeId(nextChallengeDetails.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-500 transition hover:bg-cyan-400/15 dark:text-cyan-300"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Open Full Question Editor
                  </button>
                </div>
                <div className="grid gap-3 p-4">
                  {nextChallengeQuestions.length ? (
                    nextChallengeQuestions.slice(0, 5).map((question, index) => (
                      <div key={question.id} className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/55">
                        <div className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-500 dark:text-cyan-300">
                          Question {question.order || index + 1}
                        </div>
                        <p className="font-bold text-slate-900 dark:text-white">{question.question}</p>
                        <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                          Answer: {question.correctAnswer}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-5 text-sm font-semibold text-amber-600 dark:text-amber-300">
                      No questions published yet for the next exam.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-amber-400">
              <Medal className="h-5 w-5" />
              Results, Leaderboard & Income
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Review submitted quiz results, edit merit positions, publish leaderboard, and track payment income.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadAdminLeaderboard(selectedLeaderboardChallengeId)}
            disabled={leaderboardLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-900/10 disabled:cursor-wait disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {leaderboardLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </button>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            { label: 'This Month Income', value: formatCurrency(paymentSummary?.currentMonthIncome), hint: `${paymentSummary?.currentMonthPaymentCount || 0} approved payments`, tone: 'text-emerald-300 bg-emerald-500/15' },
            { label: 'Lifetime Income', value: formatCurrency(paymentSummary?.lifetimeIncome), hint: `${paymentSummary?.lifetimePaymentCount || 0} total payments`, tone: 'text-amber-300 bg-amber-500/15' },
            { label: 'Submitted Results', value: leaderboardResults.length.toLocaleString('en-US'), hint: 'Current selected quiz', tone: 'text-sky-300 bg-sky-500/15' },
            { label: 'Published Results', value: leaderboardResults.filter(item => item.published).length.toLocaleString('en-US'), hint: 'Visible to students', tone: 'text-violet-300 bg-violet-500/15' },
          ].map(card => (
            <div key={card.label} className="rounded-3xl border border-slate-900/10 bg-slate-900/5 p-5 dark:border-white/10 dark:bg-white/5">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${card.tone}`}>
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{card.value}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{card.label}</div>
              <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{card.hint}</p>
            </div>
          ))}
        </div>

        {leaderboardError && (
          <div className="mb-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-4 text-sm font-semibold text-rose-300">
            {leaderboardError}
          </div>
        )}

        <div className="overflow-hidden rounded-3xl border border-slate-900/10 bg-slate-900/5 dark:border-white/10 dark:bg-white/5">
          <div className="grid gap-4 border-b border-slate-900/10 p-5 dark:border-white/10 lg:grid-cols-[1fr_auto] lg:items-end">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600 dark:text-gray-300">Quiz Result Set</span>
              <select
                value={selectedLeaderboardChallengeId}
                onChange={event => {
                  setSelectedLeaderboardChallengeId(event.target.value);
                  void loadAdminLeaderboard(event.target.value);
                }}
                disabled={leaderboardLoading || leaderboardSets.length === 0}
                className="w-full rounded-xl border border-slate-900/10 bg-white px-4 py-3 font-bold text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
              >
                {leaderboardSets.length === 0 ? (
                  <option value="">No quiz set found</option>
                ) : (
                  leaderboardSets.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.title} - {item.id}
                    </option>
                  ))
                )}
              </select>
            </label>

            <button
              type="button"
              onClick={() => void publishLeaderboardResults()}
              disabled={!selectedLeaderboardChallengeId || publishingLeaderboard || leaderboardResults.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-60"
            >
              {publishingLeaderboard ? <Loader2 className="h-4 w-4 animate-spin" /> : <BadgeCheck className="h-4 w-4" />}
              Publish Result
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-900/5 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3">Rank</th>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Score</th>
                  <th className="px-5 py-3">Manual Rank</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Submitted</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/10 dark:divide-white/10">
                {leaderboardLoading && leaderboardResults.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center font-bold text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading results...
                      </span>
                    </td>
                  </tr>
                ) : leaderboardResults.length ? (
                  leaderboardResults.map(result => (
                    <tr key={result.id} className="text-slate-700 dark:text-slate-200">
                      <td className="px-5 py-4 font-black text-amber-500 dark:text-amber-300">#{result.rank}</td>
                      <td className="px-5 py-4">
                        <div className="font-bold">{result.name}</div>
                        <div className="mt-1 max-w-[260px] truncate text-xs font-semibold text-slate-500 dark:text-slate-400">{result.email}</div>
                      </td>
                      <td className="px-5 py-4">
                        <input
                          type="number"
                          min="0"
                          value={result.score}
                          onChange={event => updateLeaderboardResult(result.id, { score: Number(event.target.value) })}
                          className="w-20 rounded-xl border border-slate-900/10 bg-white px-3 py-2 font-bold text-slate-900 outline-none focus:border-amber-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                        />
                        <span className="ml-1 font-bold text-slate-400">/ {result.total}</span>
                      </td>
                      <td className="px-5 py-4">
                        <input
                          type="number"
                          min="1"
                          value={result.manualRank || ''}
                          onChange={event => updateLeaderboardResult(result.id, { manualRank: event.target.value ? Number(event.target.value) : null })}
                          placeholder="Auto"
                          className="w-24 rounded-xl border border-slate-900/10 bg-white px-3 py-2 font-bold text-slate-900 outline-none focus:border-amber-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-black ${result.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {result.published ? 'Published' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold">{formatActivityDate(result.submittedAt)}</td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => void saveLeaderboardResult(result)}
                          disabled={Boolean(savingLeaderboardResultId)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-black text-white transition hover:bg-sky-400 disabled:cursor-wait disabled:opacity-60"
                        >
                          {savingLeaderboardResultId === result.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Save
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center font-bold text-slate-500 dark:text-slate-400">
                      No submitted results found for this quiz yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {paymentSummary?.recentPayments?.length ? (
          <div className="mt-5 rounded-3xl border border-slate-900/10 bg-slate-900/5 p-5 dark:border-white/10 dark:bg-white/5">
            <h3 className="mb-4 text-lg font-black text-slate-900 dark:text-white">Recent Approved Payments</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {paymentSummary.recentPayments.map(payment => (
                <div key={payment.id} className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/55">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-black text-slate-900 dark:text-white">{payment.itemTitle}</p>
                      <p className="mt-1 truncate text-xs font-semibold text-slate-500 dark:text-slate-400">{payment.email}</p>
                    </div>
                    <span className="shrink-0 font-black text-emerald-500 dark:text-emerald-300">{formatCurrency(payment.amount)}</span>
                  </div>
                  <p className="mt-3 text-xs font-bold text-slate-500 dark:text-slate-400">{formatActivityDate(payment.paidAt)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {statCards.map(stat => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay }}
              className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-md border border-slate-900/10 dark:border-white/10 rounded-3xl p-6 flex items-center gap-6"
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.iconClass} flex items-center justify-center shrink-0`}>
                <Icon size={28} />
              </div>
              <div className="min-w-0">
                <div className="text-3xl font-black break-words">{stat.value}</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-4 mb-12 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8">
        {(Object.keys(actionConfig) as ActionType[]).map((action) => {
          const config = actionConfig[action];
          const Icon = config.icon;
          return (
            <motion.button
              key={action}
              onClick={() => openAction(action)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-slate-900/5 dark:bg-white/5 hover:bg-slate-900/10 dark:hover:bg-white/10 border border-slate-900/10 dark:border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 font-semibold transition-colors text-center text-sm min-h-32"
            >
              <span className={`h-11 w-11 rounded-2xl flex items-center justify-center ${config.accentClass}`}>
                <Icon size={20} />
              </span>
              {config.label}
            </motion.button>
          );
        })}
      </div>

      <section className="mb-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              Free Full Access
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Grant premium-level access to any Gmail without payment. Existing users get it now; new users receive it after first login.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadFreeAccessGrants()}
            disabled={freeAccessLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-900/10 disabled:cursor-wait disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {freeAccessLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </button>
        </div>

        <div className="rounded-3xl border border-slate-900/10 bg-slate-900/5 p-5 dark:border-white/10 dark:bg-white/5 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600 dark:text-gray-300">Student Gmail</span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={freeAccessEmail}
                  onChange={event => setFreeAccessEmail(event.target.value)}
                  placeholder="student@gmail.com"
                  className="w-full rounded-xl border border-slate-900/10 bg-white py-3 pl-10 pr-4 font-semibold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
                />
              </span>
            </label>
            <TextInput
              label="Reason / Note"
              value={freeAccessReason}
              onChange={setFreeAccessReason}
              placeholder="Scholarship, mentor gift, special permission..."
            />
            <button
              type="button"
              onClick={() => void grantFreeAccess()}
              disabled={freeAccessActionId === 'grant'}
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-60"
            >
              {freeAccessActionId === 'grant' ? <Loader2 className="h-4 w-4 animate-spin" /> : <BadgeCheck className="h-4 w-4" />}
              Grant Access
            </button>
          </div>

          {freeAccessError && (
            <div className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-4 text-sm font-semibold text-rose-300">
              {freeAccessError}
            </div>
          )}

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-900/10 dark:border-white/10">
            <div className="border-b border-slate-900/10 bg-slate-900/5 px-4 py-3 text-sm font-black text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              Active Free Access Grants
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-white/60 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:bg-slate-950/40 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Gmail</th>
                    <th className="px-4 py-3">Granted</th>
                    <th className="px-4 py-3">By</th>
                    <th className="px-4 py-3">Reason</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/10 dark:divide-white/10">
                  {freeAccessLoading && freeAccessGrants.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center font-bold text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading grants...
                        </span>
                      </td>
                    </tr>
                  ) : freeAccessGrants.length ? (
                    freeAccessGrants.map(grant => {
                      const grantKey = getFreeAccessGrantKey(grant);

                      return (
                      <tr key={grantKey} className="text-slate-700 dark:text-slate-200">
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black">{grant.email}</span>
                            <span className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase ${
                              grant.pending
                                ? 'bg-amber-400/15 text-amber-500 dark:text-amber-300'
                                : 'bg-emerald-400/15 text-emerald-500 dark:text-emerald-300'
                            }`}>
                              {grant.pending ? 'Pending signup' : 'Active'}
                            </span>
                          </div>
                          <div className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {grant.uid || 'Access will attach after first login'}
                          </div>
                        </td>
                        <td className="px-4 py-4 font-semibold">{formatActivityDate(grant.freeAccessGrantedAt)}</td>
                        <td className="px-4 py-4 font-semibold">{grant.freeAccessGrantedBy || '-'}</td>
                        <td className="px-4 py-4 font-semibold">{grant.freeAccessGrantReason || '-'}</td>
                        <td className="px-4 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => void revokeFreeAccess(grant)}
                            disabled={Boolean(freeAccessActionId)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-2.5 text-sm font-black text-rose-500 transition hover:bg-rose-500/15 disabled:cursor-wait disabled:opacity-60 dark:text-rose-300"
                          >
                            {freeAccessActionId === grantKey ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />}
                            Revoke
                          </button>
                        </td>
                      </tr>
                    );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center font-bold text-slate-500 dark:text-slate-400">
                        No free-access grants yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-indigo-400">Content Studio</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Work chapter-wise or topic-wise, then jump straight into notes, MCQs, CQs, or quiz questions with the selected scope prefilled.
            </p>
          </div>
          <button
            type="button"
            onClick={loadContentLibrary}
            disabled={contentLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-900/10 disabled:cursor-wait disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {contentLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </button>
        </div>

        {contentError && (
          <div className="mb-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-4 text-sm font-semibold text-rose-300">
            {contentError}
          </div>
        )}

        <div className="rounded-3xl border border-slate-900/10 bg-slate-900/5 p-5 dark:border-white/10 dark:bg-white/5 md:p-6">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(240px,0.8fr)]">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600 dark:text-gray-300">Chapter</span>
              <select
                value={selectedContentChapterId}
                onChange={event => setSelectedContentChapterId(event.target.value)}
                className="w-full rounded-xl border border-slate-900/10 bg-white px-4 py-3 font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
              >
                <option value="">All chapters</option>
                {chapters.map(chapter => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.title || chapter.id}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600 dark:text-gray-300">Topic</span>
              <select
                value={selectedContentTopicId}
                onChange={event => setSelectedContentTopicId(event.target.value)}
                className="w-full rounded-xl border border-slate-900/10 bg-white px-4 py-3 font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
              >
                <option value="">All topics in scope</option>
                {chapterScopedTopics.map(topic => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title || topic.id}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600 dark:text-gray-300">Search Topic</span>
              <span className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={contentSearch}
                  onChange={event => setContentSearch(event.target.value)}
                  placeholder="Title, slug, or ID"
                  className="w-full rounded-xl border border-slate-900/10 bg-white py-3 pl-10 pr-4 font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
                />
              </span>
            </label>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            {[
              { label: 'Firestore Chapters', value: scopedContentStats.chapters, tone: 'text-indigo-500 dark:text-indigo-300' },
              { label: 'Topics in Scope', value: scopedContentStats.topics, tone: 'text-sky-500 dark:text-sky-300' },
              { label: 'MCQs in Scope', value: scopedContentStats.mcqs, tone: 'text-emerald-500 dark:text-emerald-300' },
              { label: 'CQs in Scope', value: scopedContentStats.cqs, tone: 'text-amber-500 dark:text-amber-300' },
              { label: 'Notes Ready', value: scopedContentStats.notesReady, tone: 'text-violet-500 dark:text-violet-300' },
              { label: 'Videos Ready', value: scopedContentStats.videosReady, tone: 'text-cyan-500 dark:text-cyan-300' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/55">
                <div className={`text-2xl font-black ${item.tone}`}>{contentLoading ? '...' : item.value}</div>
                <div className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openScopedAction('topic')}
              className="inline-flex items-center gap-2 rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-2.5 text-sm font-black text-sky-500 transition hover:bg-sky-400/15 dark:text-sky-300"
            >
              <FileText className="h-4 w-4" />
              Add Topic Here
            </button>
            <button
              type="button"
              onClick={() => openScopedAction('mcq')}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2.5 text-sm font-black text-emerald-500 transition hover:bg-emerald-400/15 dark:text-emerald-300"
            >
              <HelpCircle className="h-4 w-4" />
              Add MCQ Here
            </button>
            <button
              type="button"
              onClick={() => openScopedAction('cq')}
              className="inline-flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-2.5 text-sm font-black text-amber-500 transition hover:bg-amber-400/15 dark:text-amber-300"
            >
              <Layers className="h-4 w-4" />
              Add CQ Here
            </button>
            <button
              type="button"
              onClick={() => openScopedAction('quizQuestion')}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-black text-cyan-500 transition hover:bg-cyan-400/15 dark:text-cyan-300"
            >
              <Pencil className="h-4 w-4" />
              Add Quiz Q Here
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-900/10 dark:border-white/10">
            <div className="border-b border-slate-900/10 bg-slate-900/5 px-4 py-3 text-sm font-black text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              {selectedContentTopic
                ? `Selected Topic: ${selectedContentTopic.title || selectedContentTopic.id}`
                : selectedContentChapter
                  ? `Topics in ${selectedContentChapter.title || selectedContentChapter.id}`
                  : 'All Topics'}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-white/60 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:bg-slate-950/40 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Topic</th>
                    <th className="px-4 py-3">Importance</th>
                    <th className="px-4 py-3">Notes</th>
                    <th className="px-4 py-3">Video</th>
                    <th className="px-4 py-3">MCQ</th>
                    <th className="px-4 py-3">CQ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/10 dark:divide-white/10">
                  {contentLoading && visibleContentTopics.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center font-bold text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading content inventory...
                        </span>
                      </td>
                    </tr>
                  ) : visibleContentTopics.length ? (
                    visibleContentTopics
                      .filter(topic => !selectedContentTopicId || topic.id === selectedContentTopicId)
                      .map(topic => {
                        const stats = topicQuestionStats.get(topic.id) || { mcqs: 0, cqs: 0 };
                        return (
                          <tr key={topic.id} className="text-slate-700 dark:text-slate-200">
                            <td className="px-4 py-4">
                              <div className="font-black">{topic.title || topic.id}</div>
                              <div className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{topic.id}</div>
                            </td>
                            <td className="px-4 py-4 font-bold">{topic.importance || '-'}</td>
                            <td className="px-4 py-4">
                              <span className={`rounded-full px-3 py-1 text-xs font-black ${
                                topic.board_notes.trim()
                                  ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-300'
                                  : 'bg-slate-500/10 text-slate-500 dark:text-slate-400'
                              }`}>
                                {topic.board_notes.trim() ? 'Ready' : 'Missing'}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`rounded-full px-3 py-1 text-xs font-black ${
                                topic.video_url.trim()
                                  ? 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-300'
                                  : 'bg-slate-500/10 text-slate-500 dark:text-slate-400'
                              }`}>
                                {topic.video_url.trim() ? 'Ready' : 'Missing'}
                              </span>
                            </td>
                            <td className="px-4 py-4 font-black text-emerald-500 dark:text-emerald-300">{stats.mcqs}</td>
                            <td className="px-4 py-4 font-black text-amber-500 dark:text-amber-300">{stats.cqs}</td>
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center font-bold text-slate-500 dark:text-slate-400">
                        No topics found for this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-emerald-400">Manual Payment Approvals</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Review bKash/Nagad submissions. Approved premium payments disappear from the student's pending badge.
            </p>
          </div>
          <button
            type="button"
            onClick={loadManualPayments}
            disabled={paymentsLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-900/10 disabled:cursor-wait disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {paymentsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </button>
        </div>

        <div className="rounded-3xl border border-slate-900/10 bg-slate-900/5 p-5 dark:border-white/10 dark:bg-white/5 md:p-6">
          {paymentsLoading && manualPayments.length === 0 ? (
            <div className="flex items-center justify-center gap-3 py-10 text-sm font-bold text-slate-500 dark:text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading pending payments...
            </div>
          ) : manualPayments.length === 0 ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <p className="font-bold text-slate-700 dark:text-slate-200">No pending manual payments.</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">New submissions will appear here for approval.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {manualPayments.map(payment => {
                const approveKey = `approve:${payment.id}`;
                const rejectKey = `reject:${payment.id}`;
                return (
                  <div
                    key={payment.id}
                    className="grid gap-4 rounded-2xl border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/60 lg:grid-cols-[112px_1fr_auto]"
                  >
                    <a
                      href={payment.screenshotUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-28 w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-900/10 bg-slate-900/5 text-slate-400 dark:border-white/10 dark:bg-white/5 lg:w-28"
                    >
                      {payment.screenshotUrl ? (
                        <img src={payment.screenshotUrl} alt="Payment screenshot" className="h-full w-full object-cover" />
                      ) : (
                        <ImageIcon className="h-7 w-7" />
                      )}
                    </a>

                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] text-amber-500 dark:text-amber-300">
                          Status: Pending
                        </span>
                        <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] text-sky-500 dark:text-sky-300">
                          {payment.paymentType || 'manual'}
                        </span>
                      </div>
                      <h3 className="truncate text-lg font-black text-slate-900 dark:text-white">
                        {getManualPaymentLabel(payment)}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Submitted: {formatPaymentDate(payment.createdAt)} - Ref: {payment.id}
                      </p>
                      {payment.lastReminderAt && (
                        <p className="mt-1 inline-flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                          <BellRing className="h-3.5 w-3.5" />
                          Last reminder: {formatPaymentDate(payment.lastReminderAt)}
                          {payment.reminderCount ? ` (${payment.reminderCount})` : ''}
                        </p>
                      )}

                      <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 sm:grid-cols-2 xl:grid-cols-4">
                        <span className="inline-flex min-w-0 items-center gap-2">
                          <CreditCard className="h-4 w-4 shrink-0 text-pink-400" />
                          {payment.method}
                        </span>
                        <span className="inline-flex min-w-0 items-center gap-2">
                          <Smartphone className="h-4 w-4 shrink-0 text-cyan-400" />
                          {payment.senderNumber}
                        </span>
                        <span className="inline-flex min-w-0 items-center gap-2">
                          <ReceiptText className="h-4 w-4 shrink-0 text-amber-400" />
                          <span className="truncate">{payment.trxId}</span>
                        </span>
                        <span className="font-black text-emerald-500 dark:text-emerald-300">
                          BDT {Number(payment.amount || 0).toLocaleString('en-US')}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col lg:items-stretch lg:justify-center">
                      <button
                        type="button"
                        onClick={() => void handleManualPaymentReminder(payment)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-500/10 px-4 py-3 text-sm font-black text-cyan-500 transition hover:bg-cyan-500/15 dark:text-cyan-300"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => handleManualPaymentDecision(payment.id, 'approve')}
                        disabled={Boolean(paymentActionId)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-60"
                      >
                        {paymentActionId === approveKey ? <Loader2 className="h-4 w-4 animate-spin" /> : <BadgeCheck className="h-4 w-4" />}
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleManualPaymentDecision(payment.id, 'reject')}
                        disabled={Boolean(paymentActionId)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm font-black text-rose-500 transition hover:bg-rose-500/15 disabled:cursor-wait disabled:opacity-60 dark:text-rose-300"
                      >
                        {paymentActionId === rejectKey ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />}
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <section className="mb-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-cyan-400">
              <Pencil className="h-5 w-5" />
              Quiz Question Review & Edit
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              See exactly which monthly quiz questions are published, then edit wording, options, answer, and explanation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              void loadQuizQuestionSets();
              void loadQuizQuestions();
            }}
            disabled={quizQuestionsLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-900/10 disabled:cursor-wait disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {quizQuestionsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </button>
        </div>

        <div className="rounded-3xl border border-slate-900/10 bg-slate-900/5 p-5 dark:border-white/10 dark:bg-white/5 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600 dark:text-gray-300">Published Quiz Set</span>
              <select
                value={selectedQuestionChallengeId}
                onChange={event => setSelectedQuestionChallengeId(event.target.value)}
                disabled={quizQuestionsLoading || challengeSets.length === 0}
                className="w-full rounded-xl border border-slate-900/10 bg-white px-4 py-3 font-bold text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
              >
                {challengeSets.length === 0 ? (
                  <option value="">No quiz set found</option>
                ) : (
                  challengeSets.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.title} - {item.id}
                    </option>
                  ))
                )}
              </select>
            </label>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-black text-cyan-500 dark:text-cyan-200">
              {quizQuestionsLoading ? 'Loading...' : `${quizQuestions.length} Questions`}
            </div>
          </div>

          {quizQuestionsError && (
            <div className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-4 text-sm font-semibold text-rose-300">
              {quizQuestionsError}
            </div>
          )}

          {selectedQuestionChallengeId && (
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-slate-950/50">
                Status: {selectedChallengeDetails?.status || 'Unknown'}
              </span>
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-slate-950/50">
                Starts: {formatActivityDate(selectedChallengeDetails?.startsAt)}
              </span>
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-slate-950/50">
                Ends: {formatActivityDate(selectedChallengeDetails?.endsAt)}
              </span>
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-slate-950/50">
                Syllabus: {selectedChallengeDetails?.syllabus.length || 0} topics
              </span>
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-slate-950/50">
                ID: {selectedQuestionChallengeId}
              </span>
            </div>
          )}

          <div className="mt-6 grid gap-4">
            {quizQuestionsLoading && quizQuestions.length === 0 ? (
              <div className="flex items-center justify-center gap-3 py-10 text-sm font-bold text-slate-500 dark:text-slate-400">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading quiz questions...
              </div>
            ) : quizQuestions.length === 0 ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <p className="font-bold text-slate-700 dark:text-slate-200">No questions found for this quiz set.</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Generate challenge questions first, then they will appear here.</p>
              </div>
            ) : (
              quizQuestions.map((question, index) => {
                const options = [...question.options, '', '', '', ''].slice(0, 4);
                const saving = savingQuestionId === question.id;

                return (
                  <div
                    key={question.id}
                    className="rounded-2xl border border-slate-900/10 bg-white/75 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/55 md:p-5"
                  >
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-500 dark:text-cyan-300">
                          Question {question.order || index + 1}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">ID: {question.id}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => void saveQuizQuestion(question)}
                        disabled={saving || Boolean(savingQuestionId)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-400 disabled:cursor-wait disabled:opacity-60"
                      >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save
                      </button>
                    </div>

                    <div className="grid gap-4">
                      <TextAreaInput
                        label="Question"
                        value={question.question}
                        onChange={value => updateQuizQuestion(question.id, { question: value })}
                        rows={3}
                      />

                      <div className="grid gap-3 md:grid-cols-2">
                        {options.map((option, optionIndex) => (
                          <div key={`${question.id}-option-${optionIndex}`}>
                            <TextInput
                              label={`Option ${String.fromCharCode(65 + optionIndex)}`}
                              value={option}
                              onChange={value => updateQuizQuestionOption(question.id, optionIndex, value)}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <label className="block md:col-span-1">
                          <span className="mb-2 block text-sm font-semibold text-slate-600 dark:text-gray-300">Correct Answer</span>
                          <select
                            value={question.correctAnswer}
                            onChange={event => updateQuizQuestion(question.id, { correctAnswer: event.target.value })}
                            className="w-full rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
                          >
                            {!options.includes(question.correctAnswer) && question.correctAnswer && (
                              <option value={question.correctAnswer}>{question.correctAnswer}</option>
                            )}
                            {options.filter(Boolean).map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </label>
                        <TextInput
                          label="Chapter ID"
                          value={question.chapterId}
                          onChange={value => updateQuizQuestion(question.id, { chapterId: value })}
                        />
                        <TextInput
                          label="Topic ID"
                          value={question.topicId}
                          onChange={value => updateQuizQuestion(question.id, { topicId: value })}
                        />
                      </div>

                      <TextAreaInput
                        label="Explanation"
                        value={question.explanation}
                        onChange={value => updateQuizQuestion(question.id, { explanation: value })}
                        rows={3}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <h2 className="text-xl font-bold mb-6 text-yellow-400">Mega Challenge Management</h2>
      <div className="bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-3xl p-6 md:p-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/15 text-yellow-300">
          <Trophy size={32} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Current Month Question Set</h3>
        <p className="text-slate-600 dark:text-gray-300 my-4 max-w-2xl mx-auto">
          Pick 30 random MCQs from the Firestore mcqs collection and publish them to megaChallenges/{getCurrentChallengeId()}. Use the Quiz Routine action above to publish the public exam date.
        </p>
        <button
          onClick={generateChallenge}
          disabled={isGenerating}
          className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-wait inline-flex items-center gap-2"
        >
          {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          {isGenerating ? 'Generating Challenge...' : 'Generate Challenge Questions'}
        </button>
      </div>

      <AnimatePresence>
        {activeAction && activeConfig && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-900/10 dark:border-white/10 rounded-3xl w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-900/10 dark:border-white/10 p-5 md:p-6">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${activeConfig.accentClass}`}>
                    <activeConfig.icon size={22} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">{activeConfig.title}</h2>
                    <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{activeConfig.description}</p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-sky-400">Firestore/{activeConfig.collectionName}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeAction}
                  className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-900/5 dark:bg-white/5 rounded-full transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={saveAction} className="overflow-y-auto p-5 md:p-6">
                <div className="space-y-4">
                  {renderActionForm(activeAction)}
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeAction}
                    disabled={isSaving}
                    className="px-6 py-3 rounded-xl font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-3 rounded-xl font-bold bg-sky-500 hover:bg-sky-400 text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 disabled:opacity-60 disabled:cursor-wait"
                  >
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {isSaving ? 'Saving...' : 'Save to Firestore'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  listId,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  listId?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-2 text-slate-600 dark:text-gray-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        list={listId}
        required={required}
        className="w-full bg-white dark:bg-slate-900/70 border border-slate-900/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
      />
    </label>
  );
}

function TextAreaInput({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-2 text-slate-600 dark:text-gray-300">{label}</span>
      <textarea
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full resize-y bg-white dark:bg-slate-900/70 border border-slate-900/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-2 text-slate-600 dark:text-gray-300">{label}</span>
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        className="w-full bg-white dark:bg-slate-900/70 border border-slate-900/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer"
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
