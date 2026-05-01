import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  BookOpen,
  CheckCircle,
  Database,
  FileText,
  Globe2,
  GraduationCap,
  HelpCircle,
  Layers,
  Lightbulb,
  Loader2,
  LogOut,
  Plus,
  Save,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { useLms } from '../../context/LmsContext';
import { firebaseDb } from '../../lib/firebase';

type ActionType = 'chapter' | 'topic' | 'mcq' | 'cq' | 'course' | 'suggestion';
type Notice = { type: 'success' | 'error'; text: string } | null;

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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { adminStats } = useLms();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [forms, setForms] = useState<FormState>(() => makeInitialForms());
  const [notice, setNotice] = useState<Notice>(null);
  const [trafficTotal, setTrafficTotal] = useState<number | null>(null);

  useEffect(() => {
    if (!firebaseDb) {
      setTrafficTotal(0);
      return;
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
  }, []);

  const statCards = useMemo(() => ([
    { label: 'Total Chapters', value: adminStats.chapters, icon: BookOpen, iconClass: 'bg-indigo-500/20 text-indigo-400', delay: 0.1 },
    { label: 'Total Topics', value: adminStats.topics, icon: FileText, iconClass: 'bg-sky-500/20 text-sky-400', delay: 0.2 },
    { label: 'Total MCQs', value: adminStats.mcqs, icon: HelpCircle, iconClass: 'bg-emerald-500/20 text-emerald-400', delay: 0.3 },
    { label: 'Total Website Traffic', value: trafficTotal === null ? '...' : trafficTotal, icon: Globe2, iconClass: 'bg-cyan-500/20 text-cyan-400', delay: 0.4 },
    { label: 'Active Students', value: adminStats.activeStudents, icon: Users, iconClass: 'bg-pink-500/20 text-pink-400', delay: 0.5 },
    { label: 'Quiz Attempts', value: adminStats.quizAttempts, icon: Activity, iconClass: 'bg-amber-500/20 text-amber-400', delay: 0.6 },
    { label: 'Completed Topics', value: adminStats.completedTopics, icon: CheckCircle, iconClass: 'bg-green-500/20 text-green-400', delay: 0.7 },
  ]), [adminStats, trafficTotal]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const requireAdminSession = () => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      setNotice({ type: 'error', text: 'Unauthorized: manual admin session required.' });
      return false;
    }
    return true;
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
    setActiveAction(action);
  };

  const closeAction = () => {
    if (isSaving) return;
    setActiveAction(null);
  };

  const saveAction = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!activeAction || !requireAdminSession()) return;

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
      const saved = await addDoc(collection(firebaseDb, collectionName), payload);
      const resetForms = makeInitialForms();

      setForms(prev => ({
        ...prev,
        [submittedAction]: resetForms[submittedAction],
      }));
      setActiveAction(null);
      setNotice({
        type: 'success',
        text: `${actionConfig[submittedAction].label} saved to Firestore/${collectionName} with ID ${saved.id}.`,
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

      const selectedQuestions = shuffle(mcqs).slice(0, 30);
      const challengeId = getCurrentChallengeId();
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
            <TextInput label="Chapter ID" value={form.chapterId} onChange={value => updateForm(action, 'chapterId', value)} placeholder="chap-3" required />
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
            <TextInput label="Chapter ID" value={form.chapterId} onChange={value => updateForm(action, 'chapterId', value)} placeholder="chap-2" />
            <TextInput label="Topic ID" value={form.topicId} onChange={value => updateForm(action, 'topicId', value)} placeholder="topic-2-1" />
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
            <TextInput label="Chapter ID" value={form.chapterId} onChange={value => updateForm(action, 'chapterId', value)} placeholder="chap-4" />
            <TextInput label="Topic ID" value={form.topicId} onChange={value => updateForm(action, 'topicId', value)} placeholder="topic-4-1" />
          </div>
          <TextInput label="Question A" value={form.qA} onChange={value => updateForm(action, 'qA', value)} placeholder="Knowledge question" />
          <TextInput label="Question B" value={form.qB} onChange={value => updateForm(action, 'qB', value)} placeholder="Comprehension question" />
          <TextInput label="Question C" value={form.qC} onChange={value => updateForm(action, 'qC', value)} placeholder="Application question" required />
          <TextInput label="Question D" value={form.qD} onChange={value => updateForm(action, 'qD', value)} placeholder="Higher-order question" required />
          <TextAreaInput label="Answer Guide" value={form.answerGuide} onChange={value => updateForm(action, 'answerGuide', value)} placeholder="Optional answer hints or marking guide." rows={4} />
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

      {!firebaseDb && (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
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

      <h2 className="text-xl font-bold mb-6 text-yellow-400">Mega Challenge Management</h2>
      <div className="bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-3xl p-6 md:p-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/15 text-yellow-300">
          <Trophy size={32} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Current Month Question Set</h3>
        <p className="text-slate-600 dark:text-gray-300 my-4 max-w-2xl mx-auto">
          Pick 30 random MCQs from the Firestore mcqs collection and publish them to megaChallenges/{getCurrentChallengeId()}.
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
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
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
