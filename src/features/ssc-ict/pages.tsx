import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { Link, Navigate, useNavigate, useParams, useBlocker } from 'react-router-dom';
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
  FileQuestion,
  Gauge,
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
  SscChapterSubHeader,
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
      <section className="relative mb-8 overflow-hidden rounded-2xl border border-slate-900/10 bg-white/75 p-5 shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40 md:p-8 lg:p-10">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px] dark:bg-cyan-500/10" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-emerald-500/15 blur-[100px] dark:bg-emerald-500/10" />
        <div className="pointer-events-none absolute left-1/3 top-1/4 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5" />

        <div className="relative grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-sky-300/40 bg-gradient-to-r from-sky-400/12 via-emerald-400/12 to-indigo-400/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-sky-600 dark:text-sky-300">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Premium SSC Module
            </div>
            <h1 className="bg-gradient-to-r from-sky-600 via-emerald-500 to-indigo-600 bg-clip-text text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-transparent dark:from-sky-300 dark:via-emerald-300 dark:to-indigo-300">
              SSC ICT Complete Preparation
            </h1>
            <p className="mt-3 max-w-xl text-xs sm:text-sm font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
              Chapter-wise smart PDF flipbook, MCQ practice, timed quiz, dashboard progress, leaderboard rank and shareable result card.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-900/10 bg-slate-950 p-4 text-white shadow-xl dark:border-white/10">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-sky-200">Quick Snapshot</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {[
                ['Chapters', chapters.length],
                ['Per Chapter', money(chapters[0]?.price || 100)],
                ['MCQs', chapters.reduce((sum, chapter) => sum + chapter.mcqs.length, 0)],
                ['Access', hasPackageAccess ? 'Full' : access.chapterSlugs.length],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">{label}</p>
                  <p className="mt-1 text-2xl font-black">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/10 p-3 text-xs font-bold leading-relaxed text-amber-50">
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

      <section className="mt-8">
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
      <div className="mb-6">
        <Link to="/ssc-ict" className="inline-flex items-center gap-2 text-sm font-black text-sky-600 dark:text-sky-300">
          <ChevronLeft className="h-4 w-4" />
          Back to SSC ICT
        </Link>
      </div>
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
            className="group rounded-2xl border border-slate-900/10 bg-white/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-sky-400/35 dark:border-white/10 dark:bg-white/7"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-sky-600 dark:bg-sky-500/20 dark:text-sky-300 border border-sky-500/10">
                Ch {chapter.orderIndex.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-black text-sky-600 dark:text-sky-300">{money(chapter.price)}</span>
            </div>
            <h2 className="mt-2 text-sm font-black text-slate-950 dark:text-white transition group-hover:text-sky-500 duration-300 line-clamp-1">{chapter.title}</h2>
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
      <div className="mb-3">
        <Link to="/ssc-ict" className="inline-flex items-center gap-2 text-xs font-black text-sky-600 dark:text-sky-300">
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to SSC ICT
        </Link>
      </div>
      <section className="rounded-2xl border border-slate-900/10 bg-gradient-to-r from-white/80 to-slate-50/80 p-3.5 shadow-md backdrop-blur-xl dark:border-white/10 dark:from-slate-950/45 dark:to-slate-900/45 md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-sky-600 dark:bg-sky-500/20 dark:text-sky-300 border border-sky-500/10 mb-1.5">
              Chapter {chapter.orderIndex.toString().padStart(2, '0')}
            </span>
            <h1 className="text-base sm:text-lg font-black leading-tight text-slate-950 dark:text-white">{chapter.title}</h1>
            <p className="mt-1 max-w-3xl text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">{chapter.description}</p>
          </div>
          <div className="shrink-0 flex items-center justify-between gap-3 rounded-xl border border-slate-900/10 bg-slate-50/50 px-3 py-1.5 dark:border-white/10 dark:bg-slate-950/30 md:flex-col md:justify-center md:gap-1">
            <SscStatusBadge unlocked={unlocked} pending={isChapterPending(chapter.slug)} />
            <p className="text-sm font-black text-slate-950 dark:text-white md:text-base">{money(chapter.price)}</p>
          </div>
        </div>
      </section>

      <div className="mt-3.5 grid gap-2.5 grid-cols-2 md:grid-cols-4">
        {actions.map(action => {
          const Icon = action.icon;
          return (
            <Link
              key={action.to}
              to={`/ssc-ict/chapter/${chapter.slug}/${action.to}`}
              className={`rounded-xl border p-2.5 transition hover:-translate-y-0.5 ${
                unlocked
                  ? 'border-slate-900/10 bg-white/70 hover:border-sky-400/35 dark:border-white/10 dark:bg-white/7'
                  : 'border-slate-900/10 bg-white/45 opacity-85 dark:border-white/10 dark:bg-white/5'
              }`}
            >
              <Icon className="mb-2 h-5 w-5 text-sky-500" />
              <h2 className="text-xs font-black text-slate-950 dark:text-white">{action.title}</h2>
              <p className="mt-1 text-[10px] font-semibold leading-relaxed text-slate-500 dark:text-slate-400">{action.text}</p>
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
        <SscChapterSubHeader chapter={chapter} activeTab="read" />
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
      <SscChapterSubHeader chapter={chapter} activeTab="read" />
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
      <SscChapterSubHeader chapter={chapter} activeTab="practice" />
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-sky-600 dark:bg-sky-500/20 dark:text-sky-300 border border-sky-500/10">
            Practice Mode
          </span>
          <h1 className="mt-1 text-base sm:text-lg font-black text-slate-950 dark:text-white">{chapter.title}</h1>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="rounded-xl bg-white/70 px-3 py-1.5 dark:bg-white/7"><p className="text-[10px] font-black text-slate-500">Attempted</p><p className="text-base font-black text-slate-950 dark:text-white">{attempted.length}</p></div>
          <div className="rounded-xl bg-white/70 px-3 py-1.5 dark:bg-white/7"><p className="text-[10px] font-black text-slate-500">Correct</p><p className="text-base font-black text-emerald-500">{correct}</p></div>
          <div className="rounded-xl bg-white/70 px-3 py-1.5 dark:bg-white/7"><p className="text-[10px] font-black text-slate-500">Wrong</p><p className="text-base font-black text-rose-500">{wrong}</p></div>
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search MCQ..." className="w-full rounded-2xl border border-slate-900/10 bg-white/75 py-3 pl-11 pr-4 text-sm font-semibold outline-none focus:border-sky-400 dark:border-white/10 dark:bg-white/7 dark:text-white" />
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide shrink-0">
          {(['all', 'wrong', 'unattempted', 'bookmarked'] as PracticeFilter[]).map(item => (
            <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-2xl px-4 py-2.5 text-xs font-black capitalize whitespace-nowrap ${filter === item ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/15' : 'bg-white/70 text-slate-600 dark:bg-white/7 dark:text-slate-300'}`}>
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
      <SscChapterSubHeader chapter={chapter} activeTab="short-questions" />
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
            <article key={item.id} className="rounded-2xl border border-slate-900/10 bg-white/75 p-4 transition duration-300 hover:border-sky-300/40 dark:border-white/10 dark:bg-white/7">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <span className={`mb-2 inline-flex rounded-full px-2 py-0.5 text-[9px] font-black tracking-wider uppercase ${item.importance === 'High' ? 'bg-rose-500/12 text-rose-600 dark:text-rose-300' : 'bg-sky-500/12 text-sky-600 dark:text-sky-300'}`}>{item.importance} Importance</span>
                  <h2 className="text-sm sm:text-base font-black text-slate-950 dark:text-white leading-snug">{item.question}</h2>
                </div>
                <div className="flex gap-1.5 shrink-0 mt-2 md:mt-0">
                  <button type="button" onClick={() => setOpenIds(prev => open ? prev.filter(id => id !== item.id) : [...prev, item.id])} className="rounded-xl bg-sky-600 px-3 py-1.5 text-xs font-black text-white hover:bg-sky-500 active:scale-95 duration-200 transition-all shadow-md shadow-sky-600/10">{open ? 'Hide' : 'Show'} Answer</button>
                  <button type="button" onClick={() => { toggleSscShortLearned(userId, chapter.slug, item.id); setTick(tick + 1); }} className={`rounded-xl px-3 py-1.5 text-xs font-black hover:bg-emerald-400 active:scale-95 duration-200 transition-all ${learned ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' : 'bg-slate-900/5 text-slate-600 dark:bg-white/7 dark:text-slate-300'}`}>{learned ? 'Learned' : 'Mark'}</button>
                </div>
              </div>
              {open && <p className="mt-3.5 rounded-xl bg-slate-900/5 p-3.5 text-xs sm:text-sm font-semibold leading-relaxed text-slate-700 dark:bg-white/5 dark:text-slate-200 border border-slate-900/5 dark:border-white/5 shadow-inner">{item.answer}</p>}
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
  
  const questions = useMemo(() => {
    if (!chapter) return [];
    return chapter.mcqs.filter(mcq => mcq.isPublished).slice(0, config.quizSettings.totalQuestions);
  }, [chapter, config.quizSettings.totalQuestions]);

  const durationSeconds = useMemo(() => Math.ceil(questions.length * 30), [questions.length]);
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const submittedRef = useRef(false);
  const navigate = useNavigate();

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      started && !submittedRef.current && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const proceed = window.confirm(
        'পরীক্ষা চলাকালীন সময়ে অন্য কোনো পেজে গেলে আপনার পরীক্ষা বাতিল হয়ে যাবে। আপনি কি নিশ্চিত?'
      );
      if (proceed) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);

  // Synchronize global layout exam active state
  useEffect(() => {
    if (started && !submittedRef.current) {
      (window as any).isSscExamActive = true;
      window.dispatchEvent(new CustomEvent('ssc-exam-status', { detail: { active: true } }));
    } else {
      (window as any).isSscExamActive = false;
      window.dispatchEvent(new CustomEvent('ssc-exam-status', { detail: { active: false } }));
    }
    return () => {
      (window as any).isSscExamActive = false;
      window.dispatchEvent(new CustomEvent('ssc-exam-status', { detail: { active: false } }));
    };
  }, [started]);

  useEffect(() => {
    setTimeLeft(durationSeconds);
  }, [durationSeconds]);

  const submitQuiz = useCallback(() => {
    if (!chapter || submittedRef.current) return;
    submittedRef.current = true;
    (window as any).isSscExamActive = false;
    window.dispatchEvent(new CustomEvent('ssc-exam-status', { detail: { active: false } }));
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
      timeTakenSeconds: durationSeconds - timeLeft,
      answers,
    });
    navigate(`/ssc-ict/result/${attempt.id}`);
  }, [answers, chapter, config.quizSettings, navigate, questions, timeLeft, user, userId, durationSeconds]);

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

  // Page leave block
  useEffect(() => {
    if (!started || submittedRef.current) return undefined;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'পরীক্ষা চলাকালীন সময়ে পেজ রিফ্রেশ বা লিভ করলে আপনার প্রোগ্রেস বাতিল হয়ে যাবে। আপনি কি নিশ্চিত?';
      return e.returnValue;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [started]);

  if (!chapter) return <ChapterNotFound />;
  if (!hasChapterAccess(chapter.slug)) {
    return <div className={pageWrap}><SscLockedPanel chapter={chapter} onUnlock={() => setSelectedChapter(chapter)} /><ChapterPaymentHost selectedChapter={selectedChapter} onClose={() => setSelectedChapter(null)} /></div>;
  }

  if (!started) {
    return (
      <div className={pageWrap}>
        <SscChapterSubHeader chapter={chapter} activeTab="quiz" />
        <section className="mx-auto max-w-2xl rounded-2xl border border-slate-900/10 bg-white/80 p-6 text-center shadow-lg shadow-slate-950/5 dark:border-white/10 dark:bg-white/7">
          <Trophy className="mx-auto mb-4 h-12 w-12 text-amber-400" />
          <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">{chapter.title} Quiz</h1>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
            {questions.length} MCQ, {Math.ceil(questions.length / 2)} minutes. Leaderboard rank uses higher score, lower time, then earlier submission.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 text-center">
            <div className="rounded-2xl bg-slate-900/5 p-4 dark:bg-white/7">
              <Clock className="mx-auto mb-2 h-5 w-5 text-sky-500" />
              <p className="text-xs sm:text-sm font-black">{Math.ceil(questions.length / 2)} min</p>
            </div>
            <div className="rounded-2xl bg-slate-900/5 p-4 dark:bg-white/7">
              <Target className="mx-auto mb-2 h-5 w-5 text-emerald-500" />
              <p className="text-xs sm:text-sm font-black">{questions.length} marks</p>
            </div>
            <div className="rounded-2xl bg-slate-900/5 p-4 dark:bg-white/7">
              <Gauge className="mx-auto mb-2 h-5 w-5 text-amber-500" />
              <p className="text-xs sm:text-sm font-black">{config.quizSettings.negativeMarkingEnabled ? 'Negative' : 'No negative'}</p>
            </div>
          </div>

          {/* Exam Rules Screen */}
          <div className="mt-8 rounded-3xl border border-slate-900/10 bg-slate-50/80 p-6 text-left dark:border-white/10 dark:bg-slate-950/35">
            <h3 className="text-lg font-black text-slate-950 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              পরীক্ষার নিয়মাবলী (Quiz Rules):
            </h3>
            <ul className="space-y-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-[10px] font-black text-sky-600 dark:bg-sky-500/20 dark:text-sky-300 mt-0.5">১</span>
                <span><strong>প্রশ্ন প্রতি সময়:</strong> প্রতিটি MCQ প্রশ্নের জন্য ৩০ সেকেন্ড বরাদ্দ (মোট সময়: প্রশ্নের সংখ্যার অর্ধেক)।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-black text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 mt-0.5">২</span>
                <span><strong>উত্তর লক হবে:</strong> একটি MCQ তে ক্লিক করলে সেটি সাথে সাথে লক হয়ে যাবে, কোনোভাবেই উত্তর পরিবর্তন করা যাবে না।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-[10px] font-black text-amber-600 dark:bg-amber-500/20 dark:text-amber-300 mt-0.5">৩</span>
                <span><strong>সব উত্তর দেওয়া বাধ্যতামূলক:</strong> সাবমিট করতে হলে সব প্রশ্নের উত্তর প্রদান করতে হবে। সব প্রশ্নের উত্তর দেওয়ার পূর্বে সাবমিট বা বের হওয়া যাবে না।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-[10px] font-black text-rose-600 dark:bg-rose-500/20 dark:text-rose-300 mt-0.5">৪</span>
                <span><strong>লিডারবোর্ড ও শেয়ার:</strong> পরীক্ষা শেষ হলে আপনার স্কোর ও টাইম অনুযায়ী লিডারবোর্ডে র‍্যাংক আসবে। এছাড়া আপনি সুন্দর ফটোকার্ড ডাউনলোড এবং বন্ধুদের সাথে শেয়ার করতে পারবেন।</span>
              </li>
            </ul>
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
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className={pageWrap}>
      {/* Hide full navigation bar tabs to prevent leaving during exam */}
      <SscChapterSubHeader chapter={chapter} activeTab="quiz" hideNav={true} />
      
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-900/10 bg-white/75 p-3.5 dark:border-white/10 dark:bg-white/7 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-rose-600 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-500/10 animate-pulse">
            Quiz Running
          </span>
          <h1 className="mt-1 text-base sm:text-lg font-black text-slate-950 dark:text-white">{chapter.title}</h1>
        </div>
        <div className={`rounded-xl px-4 py-2 text-xl font-black shrink-0 text-center ${timeLeft < 60 ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-950 text-white'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>
      
      <section className="rounded-2xl border border-slate-900/10 bg-white/80 p-4 sm:p-5 shadow-lg shadow-slate-950/5 dark:border-white/10 dark:bg-white/7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-black text-sky-600 dark:text-sky-300">Question {current + 1}/{questions.length}</span>
          <span className="text-[10px] font-black text-slate-400">{Object.keys(answers).length} answered</span>
        </div>
        
        <h2 className="text-lg sm:text-xl font-black leading-normal text-slate-950 dark:text-white">{question.question}</h2>
        
        <div className="mt-5 grid gap-2.5">
          {question.options.map((option, index) => {
            const isAnswered = answers[question.id] !== undefined;
            const isSelected = answers[question.id] === index;
            return (
              <button
                key={option}
                type="button"
                disabled={isAnswered}
                onClick={() => {
                  if (!isAnswered) {
                    setAnswers(prev => ({ ...prev, [question.id]: index }));
                  }
                }}
                className={`w-full rounded-xl border px-4 py-3 text-left text-xs sm:text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99] ${
                  isSelected
                    ? 'border-sky-400 bg-sky-500/15 text-sky-700 dark:text-sky-200 font-extrabold shadow-sm'
                    : isAnswered
                      ? 'border-slate-200 bg-slate-100/50 text-slate-400 cursor-not-allowed dark:border-white/5 dark:bg-white/5 dark:text-slate-500'
                      : 'border-slate-900/10 bg-slate-50 text-slate-700 hover:border-sky-300 dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-200'
                }`}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            );
          })}
        </div>
        
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {questions.map((item, index) => (
              <button key={item.id} type="button" onClick={() => setCurrent(index)} className={`h-8 w-8 shrink-0 rounded-lg text-xs font-black transition-all hover:-translate-y-0.5 active:scale-90 ${current === index ? 'bg-sky-600 text-white' : answers[item.id] !== undefined ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-200' : 'bg-slate-900/5 text-slate-500 dark:bg-white/7'}`}>
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-2 w-full sm:w-auto [&>button]:flex-1 sm:[&>button]:flex-none">
            <button type="button" onClick={() => setCurrent(value => Math.max(0, value - 1))} className="rounded-xl border border-slate-900/10 bg-white px-4 py-2.5 text-xs sm:text-sm font-black text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white transition-all hover:bg-slate-55 active:scale-95">Previous</button>
            {current < questions.length - 1 ? (
              <button type="button" onClick={() => setCurrent(value => Math.min(questions.length - 1, value + 1))} className="rounded-xl bg-sky-600 px-4 py-2.5 text-xs sm:text-sm font-black text-white transition-all hover:bg-sky-500 active:scale-95">Next</button>
            ) : (
              <button
                type="button"
                disabled={!allAnswered}
                onClick={submitQuiz}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black text-white transition-all ${
                  allAnswered
                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-md shadow-emerald-500/20 active:scale-95'
                    : 'bg-slate-300 dark:bg-white/10 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            )}
          </div>
        </div>

        {!allAnswered && (
          <p className="text-[10px] font-bold text-amber-500 mt-2 text-center md:text-right">
            *সব প্রশ্নের উত্তর দিয়ে সাবমিট করতে হবে ({Object.keys(answers).length}/{questions.length} সম্পন্ন)
          </p>
        )}
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
        <SscEmptyState
          title="Result not found"
          text="This result card may be from another browser or has been cleared."
          action={<Link to="/ssc-ict/dashboard" className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white">Open Dashboard</Link>}
        />
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

  const chapterAttempts = rankSscAttempts(
    getSscAttempts().filter(item => item.chapterSlug === attempt.chapterSlug)
  );

  return (
    <div className={pageWrap}>
      <SscSectionHeader eyebrow="Quiz Result" title="Your SSC ICT result card is ready" text="Public result page phone/email hide করে।  শুধু score, rank এবং quiz information দেখা যায়।" />
      
      <div className="mb-6">
        <Link to={`/ssc-ict/chapter/${attempt.chapterSlug}/quiz`} className="inline-flex items-center gap-2 text-sm font-black text-sky-600 dark:text-sky-300">
          <ChevronLeft className="h-4 w-4" />
          Back to Quiz Home
        </Link>
      </div>

      <div ref={cardRef} className="mx-auto max-w-4xl">
        <SscResultCard attempt={attempt} />
      </div>

      <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-3 border-b border-slate-900/10 pb-8 dark:border-white/10">
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

      {/* Chapter Specific Leaderboard */}
      <div className="mx-auto mt-12 max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-slate-900/10 pb-4 dark:border-white/10">
          <h2 className="text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500 animate-bounce" />
            Chapter Leaderboard - {attempt.chapterTitle}
          </h2>
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-900/5 dark:bg-white/10 px-3 py-1 rounded-full">
            {chapterAttempts.length} Attempts
          </span>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-900/10 bg-white/75 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/7">
          <div className="grid grid-cols-[56px_1fr_64px_64px] sm:grid-cols-[72px_1fr_80px_90px_110px] gap-2 sm:gap-3 bg-slate-900/5 px-3 sm:px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-slate-500 dark:bg-white/7">
            <span>Rank</span><span>Student</span><span>Score</span><span>Time</span><span className="hidden sm:inline">Date</span>
          </div>
          {chapterAttempts.length === 0 ? (
            <SscEmptyState title="No quiz attempts yet" text="Complete a chapter quiz to appear on the leaderboard." />
          ) : (
            <div className="divide-y divide-slate-900/10 dark:divide-white/10">
              {chapterAttempts.map(item => (
                <div key={item.id} className={`grid grid-cols-[56px_1fr_64px_64px] sm:grid-cols-[72px_1fr_80px_90px_110px] gap-2 sm:gap-3 px-3 sm:px-4 py-4 text-sm font-bold ${item.id === attempt.id ? 'bg-amber-400/12' : item.userId === attempt.userId ? 'bg-sky-500/8' : ''}`}>
                  <span className="inline-flex items-center gap-1 text-amber-500 font-extrabold"><Medal className="h-4 w-4 shrink-0" />#{item.rankSnapshot}</span>
                  <span className="min-w-0 truncate text-slate-800 dark:text-slate-100">{item.displayName}</span>
                  <span className="text-emerald-600 dark:text-emerald-300">{item.score}/{item.total}</span>
                  <span className="text-slate-600 dark:text-slate-300">{formatTime(item.timeTakenSeconds)}</span>
                  <span className="hidden sm:inline text-slate-500">{new Date(item.submittedAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
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
      <div className="mb-6">
        <Link to="/ssc-ict" className="inline-flex items-center gap-2 text-sm font-black text-sky-600 dark:text-sky-300">
          <ChevronLeft className="h-4 w-4" />
          Back to SSC ICT
        </Link>
      </div>
      <SscSectionHeader eyebrow="Leaderboard" title="SSC ICT competitive rank" text="Tie-breaker: higher score, lower time, then earlier submission." />
      <div className="mb-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => setScope('all')} className={`rounded-2xl px-4 py-3 text-sm font-black ${scope === 'all' ? 'bg-sky-600 text-white' : 'bg-white/70 text-slate-600 dark:bg-white/7 dark:text-slate-300'}`}>All SSC ICT</button>
        {config.chapters.filter(chapter => chapter.isPublished).map(chapter => (
          <button key={chapter.slug} type="button" onClick={() => setScope(chapter.slug)} className={`rounded-2xl px-4 py-3 text-sm font-black ${scope === chapter.slug ? 'bg-sky-600 text-white' : 'bg-white/70 text-slate-600 dark:bg-white/7 dark:text-slate-300'}`}>Ch {chapter.orderIndex}</button>
        ))}
      </div>
      <div className="overflow-hidden rounded-[1.75rem] border border-slate-900/10 bg-white/75 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/7">
        <div className="grid grid-cols-[56px_1fr_64px_64px] sm:grid-cols-[72px_1fr_80px_90px_110px] gap-2 sm:gap-3 bg-slate-900/5 px-3 sm:px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-slate-500 dark:bg-white/7">
          <span>Rank</span><span>Student</span><span>Score</span><span>Time</span><span className="hidden sm:inline">Date</span>
        </div>
        {attempts.length === 0 ? (
          <SscEmptyState title="No quiz attempts yet" text="Complete a chapter quiz to appear on the leaderboard." />
        ) : (
          <div className="divide-y divide-slate-900/10 dark:divide-white/10">
            {attempts.map(attempt => (
              <div key={attempt.id} className={`grid grid-cols-[56px_1fr_64px_64px] sm:grid-cols-[72px_1fr_80px_90px_110px] gap-2 sm:gap-3 px-3 sm:px-4 py-4 text-sm font-bold ${attempt.userId === userId ? 'bg-amber-400/12' : ''}`}>
                <span className="inline-flex items-center gap-1 text-amber-500"><Medal className="h-4 w-4 shrink-0" />#{attempt.rankSnapshot}</span>
                <span className="min-w-0 truncate text-slate-800 dark:text-slate-100">{attempt.displayName}</span>
                <span className="text-emerald-600 dark:text-emerald-300">{attempt.score}/{attempt.total}</span>
                <span className="text-slate-600 dark:text-slate-300">{formatTime(attempt.timeTakenSeconds)}</span>
                <span className="hidden sm:inline text-slate-500">{new Date(attempt.submittedAt).toLocaleDateString()}</span>
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
      <div className="mb-6">
        <Link to="/ssc-ict" className="inline-flex items-center gap-2 text-sm font-black text-sky-600 dark:text-sky-300">
          <ChevronLeft className="h-4 w-4" />
          Back to SSC ICT
        </Link>
      </div>
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

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ['Purchased', purchased.length, 'chapters', BookOpen],
          ['Quiz Attempts', attempts.length, 'submitted', Trophy],
          ['Best Score', bestScore, 'marks', Medal],
          ['Accuracy', `${averageAccuracy}%`, 'average', BarChart3],
        ].map(([label, value, suffix, Icon]) => (
          <div key={String(label)} className="rounded-3xl border border-slate-900/10 bg-white/75 p-4 sm:p-5 shadow-lg shadow-slate-950/5 dark:border-white/10 dark:bg-white/7">
            <Icon className="mb-4 h-6 w-6 text-sky-500" />
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">{value}</p>
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
