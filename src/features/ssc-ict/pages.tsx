import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Clock,
  Download,
  Eye,
  FileQuestion,
  Gauge,
  Layers,
  Lock,
  Medal,
  PlayCircle,
  Search,
  Share2,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from 'lucide-react';
import {
  SscChapterCard,
  SscEmptyState,
  SscFlipbookReader,
  SscLockedPanel,
  SscPackageCard,
  SscPaymentModal,
  SscPremiumMcqStack,
  SscResultCard,
  SscSectionHeader,
  SscStatusBadge,
  money,
} from './components';
import { useSscIct } from './hooks';
import type { SscChapter, SscMcq, SscQuizAttempt } from './types';
import {
  findSscAttempt,
  getSscChapterProgress,
  getSscAttempts,
  rankSscAttempts,
  saveSscAttempt,
  saveSscPracticeAnswer,
  toggleSscBookmark,
  toggleSscShortLearned,
} from './storage';
import { isSscIctReviewMode } from './config';

const pageWrap = 'mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:px-10 lg:px-16';

const getDisplayName = (user: ReturnType<typeof useSscIct>['user']) =>
  user?.name || user?.email?.split('@')[0] || 'ICT Student';

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
};

function useChapter() {
  const { chapterSlug = '' } = useParams();
  const ssc = useSscIct();
  const chapter = ssc.config.chapters.find(item => item.slug === chapterSlug);
  return { ...ssc, chapter, chapterSlug };
}

function FeaturePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-xs font-black text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/7 dark:text-slate-200">
      {icon}
      {label}
    </span>
  );
}

function ChapterNotFound() {
  return (
    <div className={pageWrap}>
      <SscEmptyState
        title="Chapter not found"
        text="This SSC ICT chapter is unavailable or unpublished."
        action={<Link to="/ssc-ict" className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white">Back to SSC ICT</Link>}
      />
    </div>
  );
}

function ChapterPaymentHost({
  selectedChapter,
  selectedPackage,
  onClose,
}: {
  selectedChapter?: SscChapter | null;
  selectedPackage?: ReturnType<typeof useSscIct>['config']['packagePlan'] | null;
  onClose: () => void;
}) {
  const { refresh } = useSscIct();
  return (
    <SscPaymentModal
      open={Boolean(selectedChapter || selectedPackage)}
      chapter={selectedChapter}
      packagePlan={selectedPackage}
      onClose={onClose}
      onSubmitted={() => {
        refresh();
      }}
    />
  );
}

export function SscIctLanding() {
  const { config, hasChapterAccess, hasPackageAccess, isChapterPending, access } = useSscIct();
  const [selectedChapter, setSelectedChapter] = useState<SscChapter | null>(null);
  const [packageOpen, setPackageOpen] = useState(false);
  const chapters = config.chapters.filter(chapter => chapter.isPublished);

  return (
    <div className={pageWrap}>
      <section className="mb-12 overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white/76 p-6 shadow-2xl shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/7 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-200">
              <Sparkles className="h-4 w-4" />
              Premium SSC Module
            </div>
            <h1 className="text-4xl font-black leading-tight text-slate-950 dark:text-white md:text-6xl">
              SSC ICT Complete Preparation
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">
              Chapter-wise smart PDF flipbook, MCQ practice, timed quiz, dashboard progress, leaderboard rank and shareable result card.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/ssc-ict/chapter/ict-and-bangladesh/preview" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500">
                <Eye className="h-4 w-4" />
                Start Free Preview
              </Link>
              <Link to="/ssc-ict/packages" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white px-6 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/10 dark:text-white">
                <Layers className="h-4 w-4" />
                View Packages
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              <FeaturePill icon={<BookOpen className="h-4 w-4 text-sky-500" />} label="Protected flipbook" />
              <FeaturePill icon={<Target className="h-4 w-4 text-emerald-500" />} label="MCQ focused" />
              <FeaturePill icon={<Trophy className="h-4 w-4 text-amber-500" />} label="Leaderboard rank" />
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-900/10 bg-slate-950 p-5 text-white shadow-2xl dark:border-white/10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">Quick Snapshot</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ['Chapters', chapters.length],
                ['Per Chapter', money(chapters[0]?.price || 100)],
                ['MCQs', chapters.reduce((sum, chapter) => sum + chapter.mcqs.length, 0)],
                ['Access', hasPackageAccess ? 'Full' : access.chapterSlugs.length],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-black">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm font-bold leading-7 text-amber-50">
              Free preview is available for every chapter. Full content unlocks after payment approval.
            </p>
          </div>
        </div>
      </section>

      <SscPackageCard
        plan={config.packagePlan}
        unlocked={hasPackageAccess}
        pending={access.pendingPackage}
        onBuy={() => setPackageOpen(true)}
      />

      <section className="mt-12">
        <SscSectionHeader
          eyebrow="Chapter Wise Access"
          title="Choose the chapter you need"
          text="প্রতিটি chapter-এর জন্য PDF, MCQ practice, quiz, short notes এবং progress tracking আলাদা ভাবে unlock করা যাবে।"
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {chapters.map(chapter => (
            <React.Fragment key={chapter.id}>
              <SscChapterCard
                chapter={chapter}
                unlocked={hasChapterAccess(chapter.slug)}
                pending={isChapterPending(chapter.slug)}
                onUnlock={setSelectedChapter}
              />
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-5">
        {[
          ['Smart PDF', 'Chapter-wise protected flipbook with resume progress.'],
          ['MCQ Practice', 'Instant answer, explanation, bookmarks and wrong-only filters.'],
          ['Timed Quiz', 'Competitive exam mode with timer and auto-submit.'],
          ['Dashboard', 'Weak chapters, accuracy, best score and continue learning.'],
          ['Leaderboard', 'Score, time and submission based rank motivation.'],
        ].map(([title, text]) => (
          <div key={title} className="rounded-3xl border border-slate-900/10 bg-white/70 p-5 shadow-lg shadow-slate-950/5 dark:border-white/10 dark:bg-white/7">
            <h3 className="font-black text-slate-950 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{text}</p>
          </div>
        ))}
      </section>

      <ChapterPaymentHost
        selectedChapter={selectedChapter}
        selectedPackage={packageOpen ? config.packagePlan : null}
        onClose={() => {
          setSelectedChapter(null);
          setPackageOpen(false);
        }}
      />
    </div>
  );
}

export function SscPackagesPage() {
  const { config, hasPackageAccess, access } = useSscIct();
  const [packageOpen, setPackageOpen] = useState(false);

  return (
    <div className={pageWrap}>
      <SscSectionHeader
        eyebrow="SSC ICT Packages"
        title="Pick chapter access or unlock everything"
        text="Per chapter access is useful for targeted preparation. Full package is best for complete SSC ICT revision."
      />
      <SscPackageCard
        plan={config.packagePlan}
        unlocked={hasPackageAccess}
        pending={access.pendingPackage}
        onBuy={() => setPackageOpen(true)}
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {config.chapters.filter(chapter => chapter.isPublished).map(chapter => (
          <Link
            key={chapter.id}
            to={`/ssc-ict/chapter/${chapter.slug}`}
            className="rounded-3xl border border-slate-900/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:border-sky-400/35 dark:border-white/10 dark:bg-white/7"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Single Chapter</p>
            <h2 className="mt-2 text-lg font-black text-slate-950 dark:text-white">{chapter.title}</h2>
            <p className="mt-3 text-2xl font-black text-sky-600 dark:text-sky-300">{money(chapter.price)}</p>
          </Link>
        ))}
      </div>
      <ChapterPaymentHost selectedPackage={packageOpen ? config.packagePlan : null} onClose={() => setPackageOpen(false)} />
    </div>
  );
}

export function SscChapterPage() {
  const { chapter, hasChapterAccess, isChapterPending } = useChapter();
  const [selectedChapter, setSelectedChapter] = useState<SscChapter | null>(null);
  if (!chapter) return <ChapterNotFound />;

  const unlocked = hasChapterAccess(chapter.slug);
  const actions = [
    { to: 'read', icon: BookOpen, title: 'Read Flipbook', text: 'Resume protected PDF reading.' },
    { to: 'practice', icon: Target, title: 'MCQ Practice', text: 'Practice with instant explanation.' },
    { to: 'quiz', icon: PlayCircle, title: 'Quiz Exam', text: 'Timed quiz with leaderboard rank.' },
    { to: 'short-questions', icon: FileQuestion, title: 'Short Notes', text: 'Important concept questions.' },
  ];

  return (
    <div className={pageWrap}>
      <div className="mb-6">
        <Link to="/ssc-ict" className="inline-flex items-center gap-2 text-sm font-black text-sky-600 dark:text-sky-300">
          <ChevronLeft className="h-4 w-4" />
          Back to SSC ICT
        </Link>
      </div>
      <section className="rounded-[2rem] border border-slate-900/10 bg-white/76 p-6 shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/7 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">Chapter {chapter.orderIndex.toString().padStart(2, '0')}</p>
            <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 dark:text-white md:text-5xl">{chapter.title}</h1>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{chapter.description}</p>
          </div>
          <div className="shrink-0 rounded-3xl border border-slate-900/10 bg-slate-50 p-5 text-center dark:border-white/10 dark:bg-slate-950/35">
            <SscStatusBadge unlocked={unlocked} pending={isChapterPending(chapter.slug)} />
            <p className="mt-3 text-3xl font-black text-slate-950 dark:text-white">{money(chapter.price)}</p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {actions.map(action => {
          const Icon = action.icon;
          return (
            <Link
              key={action.to}
              to={`/ssc-ict/chapter/${chapter.slug}/${action.to}`}
              className={`rounded-3xl border p-5 transition hover:-translate-y-1 ${
                unlocked
                  ? 'border-slate-900/10 bg-white/70 hover:border-sky-400/35 dark:border-white/10 dark:bg-white/7'
                  : 'border-slate-900/10 bg-white/45 opacity-85 dark:border-white/10 dark:bg-white/5'
              }`}
            >
              <Icon className="mb-4 h-7 w-7 text-sky-500" />
              <h2 className="font-black text-slate-950 dark:text-white">{action.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{action.text}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        {unlocked ? (
          <SscFlipbookReader chapter={chapter} userId="" watermark="ICT Toppers Preview" previewOnly />
        ) : (
          <SscLockedPanel chapter={chapter} onUnlock={() => setSelectedChapter(chapter)} />
        )}
      </div>
      <ChapterPaymentHost selectedChapter={selectedChapter} onClose={() => setSelectedChapter(null)} />
    </div>
  );
}

export function SscPreviewPage() {
  const { chapter } = useChapter();
  const [selectedChapter, setSelectedChapter] = useState<SscChapter | null>(null);
  if (!chapter) return <ChapterNotFound />;
  const sampleMcqs = chapter.mcqs.filter(mcq => mcq.isPublished).slice(0, isSscIctReviewMode ? 10 : 5);
  const sampleShorts = chapter.shortQuestions.filter(item => item.isPublished).slice(0, isSscIctReviewMode ? 5 : 2);

  return (
    <div className={pageWrap}>
      <SscSectionHeader
        eyebrow={isSscIctReviewMode ? 'Review Mode' : 'Free Preview'}
        title={chapter.title}
        text={isSscIctReviewMode ? 'Local review active: full reader, MCQ practice, quiz and short-question pages are unlocked on localhost.' : 'Preview pages, sample MCQ and important short questions দেখে chapter unlock করার সিদ্ধান্ত নাও।'}
      />
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <SscFlipbookReader chapter={chapter} userId="" watermark="Free Preview" previewOnly />
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-900/10 bg-white/75 p-5 dark:border-white/10 dark:bg-white/7">
            <h2 className="mb-4 text-xl font-black text-slate-950 dark:text-white">Sample MCQ</h2>
            <div className="space-y-4">
              {sampleMcqs.map((mcq, index) => (
                <div key={mcq.id} className="rounded-2xl bg-slate-900/5 p-4 dark:bg-white/7">
                  <p className="font-bold text-slate-900 dark:text-white">{index + 1}. {mcq.question}</p>
                  <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">Answer: {mcq.options[mcq.correctIndex]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-900/10 bg-white/75 p-5 dark:border-white/10 dark:bg-white/7">
            <h2 className="mb-4 text-xl font-black text-slate-950 dark:text-white">Short Questions</h2>
            <div className="space-y-3">
              {sampleShorts.map(item => (
                <div key={item.id} className="rounded-2xl bg-slate-900/5 p-4 dark:bg-white/7">
                  <p className="font-bold text-slate-900 dark:text-white">{item.question}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
          {isSscIctReviewMode ? (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 shadow-sm dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-100">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">Review Mode Active</p>
              <h2 className="mt-2 text-xl font-black">All SSC chapter tools are open locally.</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <Link to={`/ssc-ict/chapter/${chapter.slug}/read`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-3 py-3 text-xs font-black text-white shadow-lg shadow-emerald-600/20">
                  <BookOpen className="h-4 w-4" /> Reader
                </Link>
                <Link to={`/ssc-ict/chapter/${chapter.slug}/practice`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-3 py-3 text-xs font-black text-white shadow-lg shadow-sky-600/20">
                  <Target className="h-4 w-4" /> Practice
                </Link>
                <Link to={`/ssc-ict/chapter/${chapter.slug}/short-questions`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-3 py-3 text-xs font-black text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-950">
                  <FileQuestion className="h-4 w-4" /> Shorts
                </Link>
              </div>
            </div>
          ) : (
            <SscLockedPanel chapter={chapter} onUnlock={() => setSelectedChapter(chapter)} />
          )}
        </div>
      </div>
      <ChapterPaymentHost selectedChapter={selectedChapter} onClose={() => setSelectedChapter(null)} />
    </div>
  );
}

export function SscReaderPage() {
  const { chapter, user, userId, hasChapterAccess } = useChapter();
  const [selectedChapter, setSelectedChapter] = useState<SscChapter | null>(null);
  if (!chapter) return <ChapterNotFound />;
  if (!hasChapterAccess(chapter.slug)) {
    return (
      <div className={pageWrap}>
        <SscFlipbookReader chapter={chapter} userId="" watermark="Free Preview" previewOnly />
        <div className="mt-6">
          <SscLockedPanel chapter={chapter} onUnlock={() => setSelectedChapter(chapter)} />
        </div>
        <ChapterPaymentHost selectedChapter={selectedChapter} onClose={() => setSelectedChapter(null)} />
      </div>
    );
  }

  return (
    <div className={pageWrap}>
      <SscFlipbookReader
        chapter={chapter}
        userId={userId}
        watermark={getDisplayName(user)}
      />
    </div>
  );
}

type PracticeFilter = 'all' | 'wrong' | 'unattempted' | 'bookmarked';

const filterPracticeQuestions = (questions: SscMcq[], progress: ReturnType<typeof getSscChapterProgress>, filter: PracticeFilter) => {
  if (filter === 'wrong') {
    return questions.filter(question => progress.practiceAnswers[question.id]?.isCorrect === false);
  }
  if (filter === 'unattempted') {
    return questions.filter(question => !progress.practiceAnswers[question.id]);
  }
  if (filter === 'bookmarked') {
    return questions.filter(question => progress.bookmarkedQuestionIds.includes(question.id));
  }
  return questions;
};

export function SscPracticePage() {
  const { chapter, userId, hasChapterAccess } = useChapter();
  const [selectedChapter, setSelectedChapter] = useState<SscChapter | null>(null);
  const [filter, setFilter] = useState<PracticeFilter>('all');
  const [current, setCurrent] = useState(0);
  const [query, setQuery] = useState('');
  const [tick, setTick] = useState(0);

  if (!chapter) return <ChapterNotFound />;
  if (!hasChapterAccess(chapter.slug)) {
    return <div className={pageWrap}><SscLockedPanel chapter={chapter} onUnlock={() => setSelectedChapter(chapter)} /><ChapterPaymentHost selectedChapter={selectedChapter} onClose={() => setSelectedChapter(null)} /></div>;
  }

  const progress = getSscChapterProgress(userId, chapter.slug);
  const published = chapter.mcqs.filter(mcq => mcq.isPublished && mcq.question.toLowerCase().includes(query.toLowerCase()));
  const questions = filterPracticeQuestions(published, progress, filter);
  const attempted = Object.values(progress.practiceAnswers);
  const correct = attempted.filter(answer => answer.isCorrect).length;
  const wrong = attempted.filter(answer => !answer.isCorrect).length;

  const chooseAnswer = (question: SscMcq, selectedIndex: number) => {
    saveSscPracticeAnswer(userId, chapter.slug, {
      questionId: question.id,
      selectedIndex,
      isCorrect: selectedIndex === question.correctIndex,
    });
    setTick(value => value + 1);
  };

  const toggleBookmark = (question: SscMcq) => {
    toggleSscBookmark(userId, chapter.slug, question.id);
    setTick(value => value + 1);
  };

  useEffect(() => {
    setCurrent(0);
  }, [filter, query, tick]);

  return (
    <div className={pageWrap}>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">Practice Mode</p>
          <h1 className="text-3xl font-black text-slate-950 dark:text-white">{chapter.title}</h1>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-white/70 px-4 py-3 dark:bg-white/7"><p className="text-xs font-black text-slate-500">Attempted</p><p className="text-xl font-black text-slate-950 dark:text-white">{attempted.length}</p></div>
          <div className="rounded-2xl bg-white/70 px-4 py-3 dark:bg-white/7"><p className="text-xs font-black text-slate-500">Correct</p><p className="text-xl font-black text-emerald-500">{correct}</p></div>
          <div className="rounded-2xl bg-white/70 px-4 py-3 dark:bg-white/7"><p className="text-xs font-black text-slate-500">Wrong</p><p className="text-xl font-black text-rose-500">{wrong}</p></div>
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search MCQ..." className="w-full rounded-2xl border border-slate-900/10 bg-white/75 py-3 pl-11 pr-4 text-sm font-semibold outline-none focus:border-sky-400 dark:border-white/10 dark:bg-white/7 dark:text-white" />
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(['all', 'wrong', 'unattempted', 'bookmarked'] as PracticeFilter[]).map(item => (
            <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-2xl px-3 py-3 text-xs font-black capitalize ${filter === item ? 'bg-sky-600 text-white' : 'bg-white/70 text-slate-600 dark:bg-white/7 dark:text-slate-300'}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      {!questions.length ? (
        <SscEmptyState title="No questions found" text="Try another filter or search keyword." />
      ) : (
        <SscPremiumMcqStack
          questions={questions}
          progress={progress}
          onChooseAnswer={chooseAnswer}
          onToggleBookmark={toggleBookmark}
        />
      )}
    </div>
  );
}

export function SscShortQuestionsPage() {
  const { chapter, userId, hasChapterAccess } = useChapter();
  const [selectedChapter, setSelectedChapter] = useState<SscChapter | null>(null);
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [tick, setTick] = useState(0);
  if (!chapter) return <ChapterNotFound />;
  if (!hasChapterAccess(chapter.slug)) {
    return <div className={pageWrap}><SscLockedPanel chapter={chapter} onUnlock={() => setSelectedChapter(chapter)} /><ChapterPaymentHost selectedChapter={selectedChapter} onClose={() => setSelectedChapter(null)} /></div>;
  }
  const progress = getSscChapterProgress(userId, chapter.slug);
  const questions = chapter.shortQuestions.filter(item =>
    item.isPublished && `${item.question} ${item.answer}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={pageWrap}>
      <SscSectionHeader eyebrow="Concept Short Notes" title={chapter.title} text="Short answer বাদ গেলেও concept revision-এর জন্য important short notes রাখা হয়েছে।" />
      <label className="relative mb-5 block">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search short questions..." className="w-full rounded-2xl border border-slate-900/10 bg-white/75 py-3 pl-11 pr-4 text-sm font-semibold outline-none focus:border-sky-400 dark:border-white/10 dark:bg-white/7 dark:text-white" />
      </label>
      <div className="space-y-3">
        {questions.map(item => {
          const open = openIds.includes(item.id);
          const learned = progress.learnedShortQuestionIds.includes(item.id);
          return (
            <article key={item.id} className="rounded-3xl border border-slate-900/10 bg-white/75 p-5 dark:border-white/10 dark:bg-white/7">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <span className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-black ${item.importance === 'High' ? 'bg-rose-500/12 text-rose-500' : 'bg-sky-500/12 text-sky-500'}`}>{item.importance}</span>
                  <h2 className="text-xl font-black text-slate-950 dark:text-white">{item.question}</h2>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setOpenIds(prev => open ? prev.filter(id => id !== item.id) : [...prev, item.id])} className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-black text-white">{open ? 'Hide' : 'Show'} Answer</button>
                  <button type="button" onClick={() => { toggleSscShortLearned(userId, chapter.slug, item.id); setTick(tick + 1); }} className={`rounded-2xl px-4 py-2 text-sm font-black ${learned ? 'bg-emerald-500 text-white' : 'bg-slate-900/5 text-slate-600 dark:bg-white/7 dark:text-slate-300'}`}>{learned ? 'Learned' : 'Mark'}</button>
                </div>
              </div>
              {open && <p className="mt-4 rounded-2xl bg-slate-900/5 p-4 text-sm font-semibold leading-7 text-slate-700 dark:bg-white/7 dark:text-slate-200">{item.answer}</p>}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function SscQuizPage() {
  const { chapter, user, userId, config, hasChapterAccess } = useChapter();
  const [selectedChapter, setSelectedChapter] = useState<SscChapter | null>(null);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(config.quizSettings.durationMinutes * 60);
  const submittedRef = useRef(false);
  const navigate = useNavigate();

  const questions = useMemo(() => {
    if (!chapter) return [];
    return chapter.mcqs.filter(mcq => mcq.isPublished).slice(0, config.quizSettings.totalQuestions);
  }, [chapter, config.quizSettings.totalQuestions]);

  const submitQuiz = useCallback(() => {
    if (!chapter || submittedRef.current) return;
    submittedRef.current = true;
    const correctCount = questions.filter(question => answers[question.id] === question.correctIndex).length;
    const skippedCount = questions.filter(question => answers[question.id] === undefined).length;
    const wrongCount = questions.length - correctCount - skippedCount;
    const rawScore = config.quizSettings.negativeMarkingEnabled
      ? Math.max(0, correctCount - wrongCount * config.quizSettings.negativeMarkValue)
      : correctCount;
    const attempt = saveSscAttempt({
      userId,
      displayName: getDisplayName(user),
      chapterSlug: chapter.slug,
      chapterTitle: chapter.title,
      quizTitle: `${chapter.title} Quiz`,
      score: Number(rawScore.toFixed(2)),
      total: questions.length,
      correctCount,
      wrongCount,
      skippedCount,
      timeTakenSeconds: config.quizSettings.durationMinutes * 60 - timeLeft,
      answers,
    });
    navigate(`/ssc-ict/result/${attempt.id}`);
  }, [answers, chapter, config.quizSettings, navigate, questions, timeLeft, user, userId]);

  useEffect(() => {
    if (!started || submittedRef.current) return undefined;
    const interval = window.setInterval(() => {
      setTimeLeft(value => {
        if (value <= 1) {
          window.clearInterval(interval);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [started]);

  useEffect(() => {
    if (started && timeLeft === 0) submitQuiz();
  }, [started, submitQuiz, timeLeft]);

  if (!chapter) return <ChapterNotFound />;
  if (!hasChapterAccess(chapter.slug)) {
    return <div className={pageWrap}><SscLockedPanel chapter={chapter} onUnlock={() => setSelectedChapter(chapter)} /><ChapterPaymentHost selectedChapter={selectedChapter} onClose={() => setSelectedChapter(null)} /></div>;
  }

  if (!started) {
    return (
      <div className={pageWrap}>
        <section className="mx-auto max-w-3xl rounded-[1.75rem] border border-slate-900/10 bg-white/80 p-8 text-center shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/7">
          <Trophy className="mx-auto mb-5 h-16 w-16 text-amber-400" />
          <h1 className="text-3xl font-black text-slate-950 dark:text-white">{chapter.title} Quiz</h1>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
            {questions.length} MCQ, {config.quizSettings.durationMinutes} minutes. Leaderboard rank uses higher score, lower time, then earlier submission.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-slate-900/5 p-4 dark:bg-white/7"><Clock className="mx-auto mb-2 h-5 w-5 text-sky-500" /><p className="font-black">{config.quizSettings.durationMinutes} min</p></div>
            <div className="rounded-2xl bg-slate-900/5 p-4 dark:bg-white/7"><Target className="mx-auto mb-2 h-5 w-5 text-emerald-500" /><p className="font-black">{questions.length} marks</p></div>
            <div className="rounded-2xl bg-slate-900/5 p-4 dark:bg-white/7"><Gauge className="mx-auto mb-2 h-5 w-5 text-amber-500" /><p className="font-black">{config.quizSettings.negativeMarkingEnabled ? 'Negative' : 'No negative'}</p></div>
          </div>
          <button type="button" onClick={() => setStarted(true)} className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-7 py-4 text-sm font-black text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500">
            <PlayCircle className="h-5 w-5" />
            Start Quiz
          </button>
        </section>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className={pageWrap}>
      <div className="mb-5 flex flex-col gap-3 rounded-3xl border border-slate-900/10 bg-white/75 p-4 dark:border-white/10 dark:bg-white/7 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">Quiz Running</p>
          <h1 className="font-black text-slate-950 dark:text-white">{chapter.title}</h1>
        </div>
        <div className={`rounded-2xl px-5 py-3 text-2xl font-black ${timeLeft < 60 ? 'bg-rose-500 text-white' : 'bg-slate-950 text-white'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>
      <section className="rounded-[1.75rem] border border-slate-900/10 bg-white/80 p-5 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/7 md:p-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-black text-sky-600 dark:text-sky-300">Question {current + 1}/{questions.length}</span>
          <span className="text-xs font-black text-slate-500">{Object.keys(answers).length} answered</span>
        </div>
        <h2 className="text-2xl font-black leading-9 text-slate-950 dark:text-white">{question.question}</h2>
        <div className="mt-6 grid gap-3">
          {question.options.map((option, index) => (
            <button key={option} type="button" onClick={() => setAnswers(prev => ({ ...prev, [question.id]: index }))} className={`rounded-2xl border px-5 py-4 text-left text-sm font-bold transition ${answers[question.id] === index ? 'border-sky-300 bg-sky-500/15 text-sky-700 dark:text-sky-100' : 'border-slate-900/10 bg-slate-50 text-slate-700 hover:border-sky-300 dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-200'}`}>
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>
        <div className="mt-7 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 overflow-x-auto">
            {questions.map((item, index) => (
              <button key={item.id} type="button" onClick={() => setCurrent(index)} className={`h-10 w-10 shrink-0 rounded-xl text-sm font-black ${current === index ? 'bg-sky-600 text-white' : answers[item.id] !== undefined ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-200' : 'bg-slate-900/5 text-slate-500 dark:bg-white/7'}`}>
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setCurrent(value => Math.max(0, value - 1))} className="rounded-2xl border border-slate-900/10 bg-white px-5 py-3 text-sm font-black text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white">Previous</button>
            {current < questions.length - 1 ? (
              <button type="button" onClick={() => setCurrent(value => Math.min(questions.length - 1, value + 1))} className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white">Next</button>
            ) : (
              <button type="button" onClick={submitQuiz} className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white">Submit</button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export function SscResultPage() {
  const { attemptId = '' } = useParams();
  const [attempt, setAttempt] = useState<SscQuizAttempt | undefined>(() => findSscAttempt(attemptId));
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAttempt(findSscAttempt(attemptId));
  }, [attemptId]);

  if (!attempt) {
    return (
      <div className={pageWrap}>
        <SscEmptyState title="Result not found" text="This result card may be from another browser or has been cleared." action={<Link to="/ssc-ict/dashboard" className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white">Open Dashboard</Link>} />
      </div>
    );
  }

  const shareText = `${attempt.displayName} scored ${attempt.score}/${attempt.total} in ${attempt.quizTitle} at ICT Toppers. Rank #${attempt.rankSnapshot || '-'}`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2 });
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `ict-toppers-ssc-result-${attempt.id}.png`;
    link.click();
  };

  return (
    <div className={pageWrap}>
      <SscSectionHeader eyebrow="Quiz Result" title="Your SSC ICT result card is ready" text="Public result page phone/email hide করে। শুধু score, rank এবং quiz information দেখা যায়।" />
      <div ref={cardRef} className="mx-auto max-w-4xl">
        <SscResultCard attempt={attempt} />
      </div>
      <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-3">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#1877F2] px-5 py-3 text-sm font-black text-white">
          <Share2 className="h-4 w-4" />
          Facebook
        </a>
        <a href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white">
          <Share2 className="h-4 w-4" />
          WhatsApp
        </a>
        <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-2xl border border-slate-900/10 bg-white px-5 py-3 text-sm font-black text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-white">
          <Clipboard className="h-4 w-4" />
          {copied ? 'Copied' : 'Copy Link'}
        </button>
        <button type="button" onClick={() => void downloadCard()} className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950">
          <Download className="h-4 w-4" />
          Download Card
        </button>
      </div>
    </div>
  );
}

export function SscLeaderboardPage() {
  const { config, userId } = useSscIct();
  const [scope, setScope] = useState('all');
  const attempts = rankSscAttempts(
    getSscAttempts().filter(attempt => scope === 'all' || attempt.chapterSlug === scope)
  );

  return (
    <div className={pageWrap}>
      <SscSectionHeader eyebrow="Leaderboard" title="SSC ICT competitive rank" text="Tie-breaker: higher score, lower time, then earlier submission." />
      <div className="mb-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => setScope('all')} className={`rounded-2xl px-4 py-3 text-sm font-black ${scope === 'all' ? 'bg-sky-600 text-white' : 'bg-white/70 text-slate-600 dark:bg-white/7 dark:text-slate-300'}`}>All SSC ICT</button>
        {config.chapters.filter(chapter => chapter.isPublished).map(chapter => (
          <button key={chapter.slug} type="button" onClick={() => setScope(chapter.slug)} className={`rounded-2xl px-4 py-3 text-sm font-black ${scope === chapter.slug ? 'bg-sky-600 text-white' : 'bg-white/70 text-slate-600 dark:bg-white/7 dark:text-slate-300'}`}>Ch {chapter.orderIndex}</button>
        ))}
      </div>
      <div className="overflow-hidden rounded-[1.75rem] border border-slate-900/10 bg-white/75 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/7">
        <div className="grid grid-cols-[72px_1fr_80px_90px_110px] gap-3 bg-slate-900/5 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-slate-500 dark:bg-white/7">
          <span>Rank</span><span>Student</span><span>Score</span><span>Time</span><span>Date</span>
        </div>
        {attempts.length === 0 ? (
          <SscEmptyState title="No quiz attempts yet" text="Complete a chapter quiz to appear on the leaderboard." />
        ) : (
          <div className="divide-y divide-slate-900/10 dark:divide-white/10">
            {attempts.map(attempt => (
              <div key={attempt.id} className={`grid grid-cols-[72px_1fr_80px_90px_110px] gap-3 px-4 py-4 text-sm font-bold ${attempt.userId === userId ? 'bg-amber-400/12' : ''}`}>
                <span className="inline-flex items-center gap-1 text-amber-500"><Medal className="h-4 w-4" />#{attempt.rankSnapshot}</span>
                <span className="min-w-0 truncate text-slate-800 dark:text-slate-100">{attempt.displayName}</span>
                <span className="text-emerald-600 dark:text-emerald-300">{attempt.score}/{attempt.total}</span>
                <span className="text-slate-600 dark:text-slate-300">{formatTime(attempt.timeTakenSeconds)}</span>
                <span className="text-slate-500">{new Date(attempt.submittedAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function SscDashboardPage() {
  const { config, user, userId, access, hasChapterAccess } = useSscIct();
  if (!user) {
    return (
      <div className={pageWrap}>
        <SscEmptyState title="Login required" text="Your SSC ICT dashboard needs a student account." action={<Link to="/login" className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white">Login</Link>} />
      </div>
    );
  }

  const attempts = getSscAttempts().filter(attempt => attempt.userId === userId);
  const purchased = config.chapters.filter(chapter => hasChapterAccess(chapter.slug));
  const progressRows = config.chapters.filter(chapter => chapter.isPublished).map(chapter => {
    const progress = getSscChapterProgress(userId, chapter.slug);
    const attempted = Object.values(progress.practiceAnswers);
    const correct = attempted.filter(item => item.isCorrect).length;
    const pdfPercent = chapter.pdfPages.length ? Math.round(((progress.pdfLastPage + 1) / chapter.pdfPages.length) * 100) : 0;
    const practicePercent = chapter.mcqs.length ? Math.round((attempted.length / chapter.mcqs.length) * 100) : 0;
    const learnedPercent = chapter.shortQuestions.length ? Math.round((progress.learnedShortQuestionIds.length / chapter.shortQuestions.length) * 100) : 0;
    const completion = hasChapterAccess(chapter.slug) ? Math.round((pdfPercent + practicePercent + learnedPercent) / 3) : 0;
    return { chapter, progress, attempted, correct, pdfPercent, practicePercent, learnedPercent, completion };
  });
  const totalCorrect = attempts.reduce((sum, attempt) => sum + attempt.correctCount, 0);
  const totalQuestions = attempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const bestScore = attempts.length ? Math.max(...attempts.map(attempt => attempt.score)) : 0;
  const averageAccuracy = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const latest = progressRows
    .filter(row => row.progress.lastActivityAt && new Date(row.progress.lastActivityAt).getTime() > 0)
    .sort((a, b) => new Date(b.progress.lastActivityAt).getTime() - new Date(a.progress.lastActivityAt).getTime())[0];

  return (
    <div className={pageWrap}>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">Student Dashboard</p>
          <h1 className="text-4xl font-black text-slate-950 dark:text-white">Welcome, {getDisplayName(user)}</h1>
        </div>
        <Link to={latest ? `/ssc-ict/chapter/${latest.chapter.slug}/read` : '/ssc-ict'} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white">
          Continue where you left off
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Purchased', purchased.length, 'chapters', BookOpen],
          ['Quiz Attempts', attempts.length, 'submitted', Trophy],
          ['Best Score', bestScore, 'marks', Medal],
          ['Accuracy', `${averageAccuracy}%`, 'average', BarChart3],
        ].map(([label, value, suffix, Icon]) => (
          <div key={String(label)} className="rounded-3xl border border-slate-900/10 bg-white/75 p-5 shadow-lg shadow-slate-950/5 dark:border-white/10 dark:bg-white/7">
            <Icon className="mb-4 h-6 w-6 text-sky-500" />
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{value}</p>
            <p className="text-xs font-bold text-slate-500">{suffix}</p>
          </div>
        ))}
      </div>

      {(access.pendingPackage || access.pendingChapterSlugs.length > 0) && (
        <div className="mt-6 rounded-3xl border border-amber-300/30 bg-amber-400/10 p-5 text-sm font-bold leading-7 text-amber-700 dark:text-amber-100">
          Payment verification pending. Admin approval হলে selected chapter/package automatically unlock হবে।
        </div>
      )}

      <section className="mt-8 rounded-[1.75rem] border border-slate-900/10 bg-white/75 p-5 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/7 md:p-8">
        <h2 className="mb-5 text-2xl font-black text-slate-950 dark:text-white">Chapter Progress</h2>
        <div className="space-y-4">
          {progressRows.map(row => (
            <div key={row.chapter.slug} className="rounded-2xl border border-slate-900/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35">
              <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-black text-slate-950 dark:text-white">{row.chapter.title}</h3>
                  <p className="text-xs font-bold text-slate-500">{row.attempted.length} practice attempts · {row.correct} correct</p>
                </div>
                <SscStatusBadge unlocked={hasChapterAccess(row.chapter.slug)} pending={access.pendingChapterSlugs.includes(row.chapter.slug)} />
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400" style={{ width: `${row.completion}%` }} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-black text-slate-500">
                <span>PDF {row.pdfPercent}%</span>
                <span>Practice {row.practicePercent}%</span>
                <span>Short Notes {row.learnedPercent}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-slate-900/10 bg-white/75 p-5 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/7 md:p-8">
        <h2 className="mb-5 text-2xl font-black text-slate-950 dark:text-white">Recent Quiz Attempts</h2>
        {attempts.length === 0 ? (
          <SscEmptyState title="No attempts yet" text="Take a chapter quiz to build your performance history." />
        ) : (
          <div className="space-y-3">
            {attempts.slice(0, 8).map(attempt => (
              <Link key={attempt.id} to={`/ssc-ict/result/${attempt.id}`} className="grid gap-3 rounded-2xl border border-slate-900/10 bg-slate-50 p-4 text-sm font-bold dark:border-white/10 dark:bg-slate-950/35 md:grid-cols-[1fr_96px_96px_96px]">
                <span className="text-slate-900 dark:text-white">{attempt.quizTitle}</span>
                <span className="text-emerald-600 dark:text-emerald-300">{attempt.score}/{attempt.total}</span>
                <span className="text-amber-600 dark:text-amber-300">Rank #{attempt.rankSnapshot}</span>
                <span className="text-slate-500">{formatTime(attempt.timeTakenSeconds)}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export function SscFeatureDisabledPage() {
  return <Navigate to="/" replace />;
}
