import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Crown,
  Eye,
  FileQuestion,
  FileText,
  GraduationCap,
  ListChecks,
  Lock,
  Maximize2,
  Minus,
  MousePointer2,
  Palette,
  PlayCircle,
  Plus,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PaymentGateway from '../../components/PaymentGateway';
import type { SscChapter, SscChapterProgress, SscMcq, SscPackagePlan, SscPracticeAnswer, SscQuizAttempt } from './types';
import { isSscIctReviewMode } from './config';
import {
  createSscOrder,
  getSscCourseIdForChapter,
  getSscCourseIdForPackage,
  getSscChapterProgress,
  saveSscPdfProgress,
} from './storage';

export const money = (amount: number) => `৳${amount.toLocaleString('en-US')}`;

function SscPremiumStyles() {
  return (
    <style>
      {`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800;900&display=swap');
        .ssc-hind, .ssc-hind * {
          font-family: 'Hind Siliguri', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          letter-spacing: 0;
        }
        .ssc-gradient-loop {
          background-size: 220% 220%;
          animation: ssc-gradient-drift 6.5s ease-in-out infinite;
        }
        .ssc-highlight-sweep::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-120%) skewX(-18deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.42), transparent);
          animation: ssc-sweep 4.5s ease-in-out infinite;
          pointer-events: none;
        }
        .ssc-text-loop {
          background-size: 240% 240%;
          animation: ssc-gradient-drift 7s ease-in-out infinite;
        }
        .ssc-soft-float {
          animation: ssc-soft-float 2.8s ease-in-out infinite;
        }
        .ssc-shine-loop {
          isolation: isolate;
        }
        .ssc-shine-loop::before {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-130%) skewX(-16deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.34), transparent);
          animation: ssc-sweep 5.2s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        @keyframes ssc-gradient-drift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes ssc-sweep {
          0%, 38% { transform: translateX(-130%) skewX(-16deg); opacity: 0; }
          48% { opacity: 1; }
          68%, 100% { transform: translateX(130%) skewX(-16deg); opacity: 0; }
        }
        @keyframes ssc-soft-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}
    </style>
  );
}

export function SscSectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="ssc-hind relative mx-auto mb-8 max-w-3xl text-center">
      <SscPremiumStyles />
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-gradient-to-r from-cyan-400/12 via-emerald-400/12 to-amber-300/12 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-700 shadow-sm dark:border-white/10 dark:text-cyan-200">
          <Sparkles className="h-4 w-4 animate-pulse" />
          {eyebrow}
        </p>
      )}
      <h1 className="ssc-gradient-loop bg-gradient-to-r from-cyan-600 via-emerald-500 to-amber-500 bg-clip-text text-3xl font-black leading-tight text-transparent dark:from-cyan-300 dark:via-emerald-300 dark:to-amber-200 md:text-5xl">
        {title}
      </h1>
      {text && (
        <p className="mx-auto mt-4 max-w-2xl rounded-3xl border border-slate-900/10 bg-white/70 px-5 py-4 text-sm font-bold leading-7 text-slate-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/7 dark:text-slate-200 md:text-base">
          {text}
        </p>
      )}
    </div>
  );
}

export function SscStatusBadge({
  unlocked,
  pending,
}: {
  unlocked: boolean;
  pending?: boolean;
}) {
  if (unlocked) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-600 dark:text-emerald-200">
        <BadgeCheck className="h-3.5 w-3.5" />
        Unlocked
      </span>
    );
  }

  if (pending) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/35 bg-amber-400/15 px-3 py-1 text-xs font-black text-amber-600 dark:text-amber-200">
        <ReceiptText className="h-3.5 w-3.5" />
        Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/50 bg-slate-900/5 px-3 py-1 text-xs font-black text-slate-500 dark:border-white/10 dark:bg-white/7 dark:text-slate-300">
      <Lock className="h-3.5 w-3.5" />
      Locked
    </span>
  );
}

export function SscFeatureList() {
  const features = ['Flipbook PDF', 'MCQ Practice', 'Exam Quiz', 'Short Notes', 'Progress Tracking'];
  return (
    <div className="grid gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
      {features.map(feature => (
        <div key={feature} className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
}

export function SscChapterCard({
  chapter,
  unlocked,
  pending,
  onUnlock,
}: {
  chapter: SscChapter;
  unlocked: boolean;
  pending: boolean;
  onUnlock: (chapter: SscChapter) => void;
}) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-900/10 bg-white/75 p-5 shadow-xl shadow-slate-950/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-sky-400/35 hover:shadow-2xl hover:shadow-sky-500/10 dark:border-white/10 dark:bg-white/7">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-500">
          <BookOpen className="h-6 w-6" />
        </div>
        <SscStatusBadge unlocked={unlocked} pending={pending} />
      </div>

      <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
        Chapter {chapter.orderIndex.toString().padStart(2, '0')}
      </p>
      <h2 className="text-xl font-black leading-tight text-slate-950 dark:text-white">
        {chapter.title}
      </h2>
      <p className="mt-3 min-h-20 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
        {chapter.description}
      </p>

      <div className="mt-4 rounded-2xl border border-slate-900/10 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/35">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Chapter price</span>
          <span className="text-2xl font-black text-slate-950 dark:text-white">{money(chapter.price)}</span>
        </div>
        <SscFeatureList />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to={`/ssc-ict/chapter/${chapter.slug}/preview`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:bg-sky-50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
        >
          <Eye className="h-4 w-4" />
          Free Preview
        </Link>
        {unlocked ? (
          <Link
            to={`/ssc-ict/chapter/${chapter.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-400"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onUnlock(chapter)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500"
          >
            <Lock className="h-4 w-4" />
            Unlock
          </button>
        )}
      </div>
    </article>
  );
}

export function SscPackageCard({
  plan,
  unlocked,
  pending,
  onBuy,
}: {
  plan: SscPackagePlan;
  unlocked: boolean;
  pending: boolean;
  onBuy: () => void;
}) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/25 bg-slate-950 p-6 text-white shadow-2xl shadow-amber-950/25 md:p-8">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300" />
      <div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-100">
            <Crown className="h-4 w-4" />
            Best Value
          </div>
          <h2 className="text-3xl font-black leading-tight md:text-4xl">{plan.title}</h2>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-300 md:text-base">
            একবার payment করলেই সব chapter unlock: All PDFs, all MCQ practice, all quiz exams, leaderboard access, smart dashboard and result share card.
          </p>
          <div className="mt-5 grid gap-2 text-sm font-bold text-slate-200 sm:grid-cols-2">
            {['All Chapter PDFs', 'All MCQ Practice', 'All Quiz Exams', 'Leaderboard Access', 'Result Share Card', 'Smart Dashboard'].map(item => (
              <span key={item} className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-200" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Full Package</p>
          <div className="mt-2 flex items-end justify-center gap-2">
            <span className="text-4xl font-black">{money(plan.price)}</span>
            {plan.compareAtPrice && (
              <span className="pb-1 text-sm font-bold text-slate-500 line-through">{money(plan.compareAtPrice)}</span>
            )}
          </div>
          <div className="mt-4">
            <SscStatusBadge unlocked={unlocked} pending={pending} />
          </div>
          {unlocked ? (
            <Link
              to="/ssc-ict/dashboard"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-400"
            >
              Open Dashboard
            </Link>
          ) : (
            <button
              type="button"
              onClick={onBuy}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-sky-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:brightness-110"
            >
              Buy Full Package
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export function SscPaymentModal({
  chapter,
  packagePlan,
  open,
  onClose,
  onSubmitted,
}: {
  chapter?: SscChapter | null;
  packagePlan?: SscPackagePlan | null;
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}) {
  const { user, login } = useAuth();
  const location = useLocation();

  if (!open) return null;

  const isPackage = Boolean(packagePlan);
  const title = isPackage ? packagePlan?.title || 'SSC ICT Complete Package' : chapter?.title || 'SSC ICT Chapter';
  const amount = isPackage ? packagePlan?.price || 0 : chapter?.price || 100;
  const courseId = isPackage ? getSscCourseIdForPackage() : getSscCourseIdForChapter(chapter?.slug || '');

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close payment overlay"
      />
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[1.75rem] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-white/10 p-2 text-slate-300 transition hover:bg-white/20 hover:text-white"
          aria-label="Close payment modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!user ? (
          <section className="rounded-[1.75rem] border border-white/10 bg-slate-950 p-8 text-center text-white">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-400/12 text-sky-200">
              <Lock className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black">Login required</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-300">
              Full chapter access, payment verification, quiz attempts and dashboard progress are connected with your student account.
            </p>
            <button
              type="button"
              onClick={() => void login({ redirectTo: location.pathname })}
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-400"
            >
              Login / Register
            </button>
          </section>
        ) : (
          <PaymentGateway
            courseId={courseId}
            courseTitle={title}
            amount={amount}
            paymentType="course"
            title="SSC ICT Payment"
            eyebrow={isPackage ? 'Full Package' : 'Chapter Access'}
            instructionText="Send Money using bKash or Nagad, then submit sender number, TrxID and screenshot. Approved payment unlocks the selected SSC ICT access."
            submitButtonLabel="Submit SSC ICT Payment"
            successTitle="Payment Submitted"
            successMessage="Your SSC ICT payment request has been submitted. After admin approval the correct chapter/package will unlock automatically."
            onSubmitted={(paymentId) => {
              createSscOrder({
                userId: user.id,
                userName: user.name || user.email,
                userEmail: user.email,
                type: isPackage ? 'package' : 'chapter',
                chapterSlug: chapter?.slug,
                packageId: packagePlan?.id,
                amount,
                paymentMethod: 'manual',
                transactionId: paymentId,
                status: 'pending',
              });
              onSubmitted();
            }}
          />
        )}
      </div>
    </div>
  );
}

export function SscLockedPanel({
  chapter,
  onUnlock,
}: {
  chapter: SscChapter;
  onUnlock: () => void;
}) {
  return (
    <section className="rounded-[1.75rem] border border-slate-900/10 bg-white/80 p-6 text-center shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/7 md:p-8">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-500/12 text-rose-500">
        <Lock className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-black text-slate-950 dark:text-white">Full chapter locked</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
        এই chapter-এর full PDF, MCQ practice, quiz এবং result tracking unlock করতে {money(chapter.price)} payment করুন।
      </p>
      <button
        type="button"
        onClick={onUnlock}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500"
      >
        Unlock Chapter {money(chapter.price)}
      </button>
    </section>
  );
}

export function SscChapterToolNav({
  chapter,
  className = '',
}: {
  chapter: SscChapter;
  className?: string;
}) {
  const location = useLocation();
  const tools = [
    { to: 'read', label: 'Reader', text: 'Smart notes', icon: BookOpen, color: 'from-cyan-500 to-sky-500' },
    { to: 'practice', label: 'Practice', text: 'MCQ stack', icon: Target, color: 'from-emerald-500 to-teal-500' },
    { to: 'quiz', label: 'Quiz', text: 'Timed exam', icon: PlayCircle, color: 'from-amber-500 to-orange-500' },
    { to: 'short-questions', label: 'Shorts', text: 'Concept Q/A', icon: FileQuestion, color: 'from-indigo-500 to-cyan-500' },
  ];

  return (
    <nav className={`ssc-hind rounded-[1.75rem] border border-slate-900/10 bg-white/80 p-2 shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/7 ${className}`} aria-label="SSC chapter tools">
      <SscPremiumStyles />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map(tool => {
          const Icon = tool.icon;
          const active = location.pathname.endsWith(`/${tool.to}`);
          return (
            <Link
              key={tool.to}
              to={`/ssc-ict/chapter/${chapter.slug}/${tool.to}`}
              className={`group flex items-center gap-3 rounded-3xl px-4 py-3 transition hover:-translate-y-0.5 ${
                active
                  ? `bg-gradient-to-r ${tool.color} text-white shadow-lg shadow-slate-950/15`
                  : 'bg-slate-900/[0.035] text-slate-700 hover:bg-white hover:shadow-md dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${active ? 'bg-white/18 text-white' : `bg-gradient-to-br ${tool.color} text-white`}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-black">{tool.label}</span>
                <span className={`block text-xs font-bold ${active ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>{tool.text}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

const readerAccentSets = [
  {
    soft: 'from-cyan-500/12 via-sky-400/12 to-emerald-400/12',
    solid: 'from-cyan-500 via-sky-500 to-emerald-500',
    text: 'from-cyan-700 via-sky-600 to-emerald-600 dark:from-cyan-200 dark:via-sky-200 dark:to-emerald-200',
    border: 'border-cyan-200/70 dark:border-cyan-300/20',
    icon: 'text-cyan-600 dark:text-cyan-200',
  },
  {
    soft: 'from-emerald-500/12 via-teal-400/12 to-cyan-400/12',
    solid: 'from-emerald-500 via-teal-500 to-cyan-500',
    text: 'from-emerald-700 via-teal-600 to-cyan-600 dark:from-emerald-200 dark:via-teal-200 dark:to-cyan-200',
    border: 'border-emerald-200/70 dark:border-emerald-300/20',
    icon: 'text-emerald-600 dark:text-emerald-200',
  },
  {
    soft: 'from-indigo-500/10 via-sky-400/12 to-cyan-400/12',
    solid: 'from-indigo-500 via-sky-500 to-cyan-500',
    text: 'from-indigo-700 via-sky-600 to-cyan-600 dark:from-indigo-200 dark:via-sky-200 dark:to-cyan-200',
    border: 'border-indigo-200/70 dark:border-indigo-300/20',
    icon: 'text-indigo-600 dark:text-indigo-200',
  },
  {
    soft: 'from-amber-400/12 via-orange-400/10 to-rose-400/10',
    solid: 'from-amber-500 via-orange-500 to-rose-500',
    text: 'from-amber-700 via-orange-600 to-rose-600 dark:from-amber-200 dark:via-orange-200 dark:to-rose-200',
    border: 'border-amber-200/70 dark:border-amber-300/20',
    icon: 'text-amber-600 dark:text-amber-200',
  },
];

function renderSmartText(text: string) {
  return text;
}

function renderFlipbookLine(rawLine: string, index: number, motionEnabled: boolean) {
  const line = rawLine.trim();
  const accent = readerAccentSets[index % readerAccentSets.length];
  if (!line) {
    return <div key={index} className="h-3" />;
  }

  if (line.startsWith('# ')) {
    return (
      <div key={index} className="mb-7">
        <span className={`mb-3 inline-flex items-center gap-2 rounded-full border ${accent.border} bg-gradient-to-r ${accent.soft} px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${accent.icon}`}>
          <GraduationCap className="h-4 w-4" />
          Smart Note Page
        </span>
        <h1 className={`ssc-gradient-text max-w-3xl bg-gradient-to-r ${accent.text} bg-clip-text text-3xl font-black leading-tight text-transparent md:text-5xl ${motionEnabled ? 'ssc-text-loop' : ''}`}>
          {renderSmartText(line.slice(2))}
        </h1>
      </div>
    );
  }

  if (line.startsWith('## ')) {
    return (
      <h2 key={index} className={`mb-4 mt-7 inline-flex items-center gap-2 rounded-2xl border ${accent.border} bg-gradient-to-r ${accent.soft} px-4 py-2 text-sm font-black uppercase tracking-[0.14em] ${accent.icon}`}>
        <FileText className="h-4 w-4" />
        {renderSmartText(line.slice(3))}
      </h2>
    );
  }

  if (line.startsWith('! ')) {
    return (
      <div key={index} className={`ssc-important-card relative my-5 overflow-hidden rounded-3xl border ${accent.border} bg-gradient-to-br ${accent.soft} p-5 text-sm font-black leading-7 text-slate-900 shadow-lg shadow-slate-950/5 dark:text-white ${motionEnabled ? 'ssc-shine-loop' : ''}`}>
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.solid}`} />
        <span className={`mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.16em] ${accent.icon}`}>
          <Sparkles className={`h-4 w-4 ${motionEnabled ? 'animate-pulse' : ''}`} />
          Most Important
        </span>
        <p>{renderSmartText(line.slice(2))}</p>
      </div>
    );
  }

  if (line.startsWith('? ')) {
    return (
      <div key={index} className={`my-5 rounded-3xl border ${accent.border} bg-white/85 p-5 text-sm font-bold leading-7 text-slate-800 shadow-sm dark:bg-slate-950/45 dark:text-slate-100`}>
        <span className={`mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] ${accent.icon}`}>
          <MousePointer2 className={`h-4 w-4 ${motionEnabled ? 'ssc-soft-float' : ''}`} />
          Exam Tip
        </span>
        {renderSmartText(line.slice(2))}
      </div>
    );
  }

  if (line.startsWith('- ')) {
    return (
      <div key={index} className="group mb-3 grid grid-cols-[auto_1fr] gap-3 rounded-3xl border border-slate-900/10 bg-white/75 px-4 py-3 text-base font-semibold leading-7 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300/60 hover:shadow-lg hover:shadow-sky-500/10 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200">
        <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.solid} text-xs font-black text-white shadow-md`}>
          {index + 1}
        </span>
        <span>{renderSmartText(line.slice(2))}</span>
      </div>
    );
  }

  return (
    <p key={index} className="mb-4 max-w-3xl text-base font-semibold leading-8 text-slate-700 dark:text-slate-200 md:text-lg">
      {renderSmartText(line)}
    </p>
  );
}

function getConceptCoach(title: string, pageIndex: number) {
  const text = title.toLowerCase();
  if (text.includes('ব্যক্তিত্ব') || text.includes('timeline') || text.includes('ইতিহাস')) {
    return {
      label: 'Timeline Coach',
      title: 'ব্যক্তিত্ব মনে রাখার সহজ পথ',
      body: 'Babbage থেকে Ada, তারপর Maxwell/Bose/Marconi, পরে microprocessor ও web/social media। পরীক্ষায় সাল, আবিষ্কার ও অবদান আলাদা করে মিলাও।',
      steps: ['Person', 'Year', 'Contribution'],
    };
  }
  if (text.includes('গভর্ন্যান্স') || text.includes('সার্ভিস') || text.includes('পূর্জি') || text.includes('পর্চা')) {
    return {
      label: 'Service Map',
      title: 'ই-সেবা প্রশ্নে keyword ধরো',
      body: 'স্বল্প সময়, কম খরচ, হয়রানি কম, online/mobile service, 24x7 availability - এই clue দেখলেই e-governance/e-service option যাচাই করো।',
      steps: ['Citizen', 'Digital Request', 'Service Result'],
    };
  }
  if (text.includes('কমার্স') || text.includes('কর্মক্ষেত্র')) {
    return {
      label: 'Money Flow',
      title: 'লেনদেন ও কর্মক্ষেত্রের logic',
      body: 'E-commerce মানে online buying/selling, COD মানে পণ্য হাতে পাওয়ার পর payment, outsourcing মানে online কাজের বিনিময়ে আয়।',
      steps: ['Order', 'Payment', 'Delivery'],
    };
  }
  if (text.includes('ডিজিটাল') || text.includes('বাংলাদেশ')) {
    return {
      label: 'Vision Map',
      title: 'Digital Bangladesh বুঝার core idea',
      body: 'Human resource, connectivity, e-service এবং citizen life quality - এই চারটা pillar ধরে প্রশ্ন পড়লে confusing option বাদ দেওয়া সহজ হয়।',
      steps: ['People', 'Connectivity', 'Service'],
    };
  }
  return {
    label: `Page ${pageIndex + 1} Coach`,
    title: 'MCQ করার আগে mini-plan',
    body: 'প্রথমে heading পড়ো, তারপর Most Important box, শেষে bullet point থেকে keyword ধরো। এরপর practice page-এ গিয়ে explanation দেখে ভুল answer revise করো।',
    steps: ['Read', 'Recall', 'Practice'],
  };
}

function SscConceptCoach({
  title,
  pageIndex,
  motionEnabled,
}: {
  title: string;
  pageIndex: number;
  motionEnabled: boolean;
}) {
  const coach = getConceptCoach(title, pageIndex);
  const accent = readerAccentSets[pageIndex % readerAccentSets.length];
  return (
    <div className={`my-8 overflow-hidden rounded-[1.75rem] border ${accent.border} bg-gradient-to-br ${accent.soft} p-5 shadow-lg shadow-slate-950/5`}>
      <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${accent.solid} opacity-18 blur-xl ${motionEnabled ? 'animate-pulse' : ''}`} />
          <div className={`relative flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br ${accent.solid} text-white shadow-xl ${motionEnabled ? 'ssc-soft-float' : ''}`}>
            <GraduationCap className="h-9 w-9" />
          </div>
          <span className="absolute -right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-slate-950 shadow-md">ICT</span>
        </div>
        <div>
          <p className={`mb-2 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${accent.icon} dark:bg-white/10`}>
            <MousePointer2 className="h-4 w-4" />
            {coach.label}
          </p>
          <h3 className="text-2xl font-black leading-tight text-slate-950 dark:text-white">{coach.title}</h3>
          <p className="mt-2 text-sm font-bold leading-7 text-slate-700 dark:text-slate-200">{coach.body}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {coach.steps.map((step, index) => (
              <div key={step} className="rounded-2xl bg-white/72 px-4 py-3 text-sm font-black text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-100">
                <span className={`mr-2 inline-flex h-6 w-6 items-center justify-center rounded-xl bg-gradient-to-br ${readerAccentSets[index % readerAccentSets.length].solid} text-xs text-white`}>{index + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SscFlipbookReader({
  chapter,
  userId,
  previewOnly = false,
}: {
  chapter: SscChapter;
  userId: string;
  watermark?: string;
  previewOnly?: boolean;
}) {
  const saved = userId ? getSscChapterProgress(userId, chapter.slug).pdfLastPage : 0;
  const maxPageCount = previewOnly && !isSscIctReviewMode ? Math.min(chapter.previewPageLimit, chapter.pdfPages.length) : chapter.pdfPages.length;
  const [page, setPage] = useState(Math.min(saved, Math.max(maxPageCount - 1, 0)));
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setPage(current => Math.min(current, Math.max(maxPageCount - 1, 0)));
  }, [maxPageCount]);

  useEffect(() => {
    if (!userId || previewOnly) return;
    saveSscPdfProgress(userId, chapter.slug, page);
  }, [chapter.slug, page, previewOnly, userId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, button, a')) return;
      if (event.key === 'ArrowRight') {
        setPage(current => Math.min(current + 1, maxPageCount - 1));
      }
      if (event.key === 'ArrowLeft') {
        setPage(current => Math.max(current - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [maxPageCount]);

  const nextPage = () => setPage(current => Math.min(current + 1, maxPageCount - 1));
  const prevPage = () => setPage(current => Math.max(current - 1, 0));
  const currentPageTitle = chapter.pdfPages[page]
    ?.split('\n')
    .find(line => line.trim().startsWith('# '))
    ?.trim()
    .replace(/^#\s*/, '') || `Page ${page + 1}`;
  const accent = readerAccentSets[page % readerAccentSets.length];
  const pageTitles = chapter.pdfPages.slice(0, maxPageCount).map((content, index) =>
    content
      .split('\n')
      .find(line => line.trim().startsWith('# '))
      ?.trim()
      .replace(/^#\s*/, '') || `Page ${index + 1}`
  );
  const readerTools = [
    { to: 'read', label: 'Reader', icon: BookOpen, color: 'from-sky-500 to-cyan-400' },
    { to: 'practice', label: 'Practice', icon: Target, color: 'from-emerald-500 to-lime-400' },
    { to: 'quiz', label: 'Quiz', icon: PlayCircle, color: 'from-amber-400 to-rose-500' },
    { to: 'short-questions', label: 'Shorts', icon: FileQuestion, color: 'from-violet-500 to-fuchsia-500' },
  ];

  return (
    <section
      ref={readerRef}
      onContextMenu={event => event.preventDefault()}
      className={`ssc-hind relative overflow-hidden rounded-[2rem] border border-slate-900/10 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_30%),linear-gradient(135deg,rgba(248,250,252,0.96),rgba(226,232,240,0.78))] p-4 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.98),rgba(15,23,42,0.9))] ${fullscreen ? 'fixed inset-3 z-[95] overflow-y-auto' : ''}`}
    >
      <SscPremiumStyles />
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent.solid}`} />
      <div className="mb-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <p className={`mb-3 inline-flex items-center gap-2 rounded-full border ${accent.border} bg-gradient-to-r ${accent.soft} px-4 py-2 text-xs font-black uppercase tracking-[0.16em] ${accent.icon}`}>
            <Sparkles className="h-4 w-4 animate-pulse" />
            {isSscIctReviewMode ? 'Review Mode' : previewOnly ? 'Free Preview' : 'Premium Protected Reader'}
          </p>
          <h2 className={`ssc-gradient-loop bg-gradient-to-r ${accent.text} bg-clip-text text-2xl font-black leading-tight text-transparent md:text-4xl`}>{chapter.pdfTitle}</h2>
          <p className="mt-2 max-w-3xl text-sm font-bold leading-7 text-slate-600 dark:text-slate-300">{currentPageTitle}</p>
        </div>

        <div className="grid grid-cols-4 gap-2 rounded-3xl border border-slate-900/10 bg-white/75 p-2 shadow-sm dark:border-white/10 dark:bg-white/7">
          {readerTools.map(tool => {
            const Icon = tool.icon;
            const active = location.pathname.endsWith(`/${tool.to}`);
            return (
              <Link
                key={tool.to}
                to={`/ssc-ict/chapter/${chapter.slug}/${tool.to}`}
                className={`flex min-w-16 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-black transition hover:-translate-y-0.5 ${
                  active
                    ? `bg-gradient-to-br ${tool.color} text-white shadow-lg shadow-slate-950/15`
                    : 'text-slate-500 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tool.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex gap-2 overflow-x-auto pb-1">
        {pageTitles.map((title, index) => (
          <button
            key={title}
            type="button"
            onClick={() => setPage(index)}
            className={`group flex min-w-[9.5rem] items-center gap-3 rounded-3xl border px-3 py-3 text-left transition hover:-translate-y-0.5 ${
              page === index
                ? `border-transparent bg-gradient-to-br ${readerAccentSets[index % readerAccentSets.length].solid} text-white shadow-xl shadow-slate-950/15`
                : 'border-slate-900/10 bg-white/75 text-slate-600 hover:border-sky-300/60 dark:border-white/10 dark:bg-white/7 dark:text-slate-200'
            }`}
            aria-label={`Open flipbook page ${index + 1}`}
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-xs font-black ${page === index ? 'bg-white/20 text-white' : 'bg-slate-900/5 text-slate-500 dark:bg-white/10 dark:text-slate-300'}`}>
              {index + 1}
            </span>
            <span className="line-clamp-2 text-xs font-black leading-5">{title}</span>
          </button>
        ))}
        </div>
        <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
          <button type="button" onClick={() => setMotionEnabled(value => !value)} className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-black transition ${motionEnabled ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-white/75 text-slate-500 dark:bg-white/10 dark:text-slate-300'}`}>
            <Palette className="h-4 w-4" />
            Motion
          </button>
          <button type="button" onClick={() => setFocusMode(value => !value)} className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-black transition ${focusMode ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/75 text-slate-500 dark:bg-white/10 dark:text-slate-300'}`}>
            <ListChecks className="h-4 w-4" />
            Focus
          </button>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[16rem_1fr]">
        <aside className={`space-y-3 ${focusMode ? 'hidden xl:block' : ''}`}>
          <div className="rounded-3xl border border-slate-900/10 bg-white/75 p-4 shadow-sm dark:border-white/10 dark:bg-white/7">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Reader Flow</p>
            <div className="mt-4 space-y-3">
              {['Read smart note', 'Use visual anchors', 'Practice MCQ', 'Revise wrong answers'].map((item, index) => (
                <div key={item} className="grid grid-cols-[auto_1fr] gap-3">
                  <span className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-2xl bg-gradient-to-br ${readerAccentSets[index % readerAccentSets.length].solid} text-xs font-black text-white`}>
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold leading-6 text-slate-600 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-900/10 bg-white/75 p-4 shadow-sm dark:border-white/10 dark:bg-white/7">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Progress</p>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div className={`h-full rounded-full bg-gradient-to-r ${accent.solid}`} style={{ width: `${((page + 1) / maxPageCount) * 100}%` }} />
            </div>
            <p className="mt-2 text-sm font-black text-slate-700 dark:text-slate-200">{page + 1}/{maxPageCount} pages</p>
          </div>
        </aside>

        <div className="relative mx-auto flex min-h-[560px] w-full max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-3 shadow-inner dark:border-white/10 dark:bg-slate-950/60 md:p-5">
        <article
          className={`relative z-0 min-h-[510px] w-full origin-top rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#fff_0%,#f8fafc_100%)] p-6 text-slate-900 shadow-2xl shadow-slate-950/10 transition-transform dark:border-white/10 dark:bg-[linear-gradient(180deg,#111827_0%,#020617_100%)] dark:text-white md:p-10 ${focusMode ? 'max-w-3xl' : ''}`}
          style={{ transform: `scale(${zoom})` }}
        >
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-white/10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${accent.soft} px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${accent.icon}`}>
                <BookOpen className="h-4 w-4" />
                SSC ICT
              </p>
              <h3 className={`mt-3 bg-gradient-to-r ${accent.text} bg-clip-text text-2xl font-black leading-tight text-transparent md:text-3xl`}>{chapter.title}</h3>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
              <Sparkles className={`h-4 w-4 ${motionEnabled ? 'animate-pulse' : ''}`} />
              Page {page + 1}/{maxPageCount}
            </div>
          </div>
          <div className="space-y-1">
            {chapter.pdfPages[page]?.split('\n').map((line, index) => renderFlipbookLine(line, index, motionEnabled))}
          </div>
          <div className={`ssc-highlight-sweep relative mt-10 overflow-hidden rounded-3xl border ${accent.border} bg-gradient-to-r ${accent.soft} p-5 text-sm font-black leading-7 text-slate-900 shadow-sm dark:text-white`}>
            Key exam idea: note পড়ার পর MCQ practice-এ গিয়ে explanation দেখে weak point mark করো।
          </div>
        </article>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[auto_1fr_auto] md:items-center">
        <button type="button" onClick={prevPage} disabled={page === 0} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:bg-slate-50 disabled:opacity-40 dark:border-white/10 dark:bg-white/10 dark:text-white">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>
        <div className="min-w-0">
          <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <div className={`h-full rounded-full bg-gradient-to-r ${accent.solid}`} style={{ width: `${((page + 1) / maxPageCount) * 100}%` }} />
          </div>
        </div>
        <button type="button" onClick={nextPage} disabled={page >= maxPageCount - 1} className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${accent.solid} px-4 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:brightness-110 disabled:opacity-40`}>
          Next
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setZoom(value => Math.max(0.84, value - 0.08))} className="rounded-2xl border border-slate-900/10 bg-white p-3 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white" aria-label="Zoom out">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-16 text-center text-xs font-black text-slate-500 dark:text-slate-300">{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => setZoom(value => Math.min(1.22, value + 0.08))} className="rounded-2xl border border-slate-900/10 bg-white p-3 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white" aria-label="Zoom in">
            <Plus className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => setFullscreen(value => !value)} className="rounded-2xl border border-slate-900/10 bg-white p-3 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white" aria-label="Toggle fullscreen">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
        <p className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <ShieldCheck className="h-4 w-4" />
          Protected reader. Direct public PDF URL, download and print controls are not exposed.
        </p>
      </div>
    </section>
  );
}

export function SscPremiumMcqStack({
  questions,
  progress,
  onChooseAnswer,
  onToggleBookmark,
}: {
  questions: SscMcq[];
  progress: SscChapterProgress;
  onChooseAnswer: (question: SscMcq, selectedIndex: number) => void;
  onToggleBookmark: (question: SscMcq) => void;
}) {
  const [openBreakdowns, setOpenBreakdowns] = useState<Record<string, boolean>>({});
  const [localAnswers, setLocalAnswers] = useState<Record<string, SscPracticeAnswer>>({});
  const [localBookmarkIds, setLocalBookmarkIds] = useState<string[]>([]);
  const mergedAnswers: Record<string, SscPracticeAnswer> = { ...localAnswers, ...progress.practiceAnswers };
  const attempted = Object.values(mergedAnswers);
  const correct = attempted.filter(answer => answer.isCorrect).length;
  const wrong = attempted.filter(answer => !answer.isCorrect).length;
  const accuracy = attempted.length ? Math.round((correct / attempted.length) * 100) : 0;

  const toggleBreakdown = (questionId: string) => {
    setOpenBreakdowns(current => ({ ...current, [questionId]: !current[questionId] }));
  };
  const handleChooseAnswer = (question: SscMcq, selectedIndex: number) => {
    setLocalAnswers(current => ({
      ...current,
      [question.id]: {
        questionId: question.id,
        selectedIndex,
        isCorrect: selectedIndex === question.correctIndex,
        attemptedAt: new Date().toISOString(),
      },
    }));
    setOpenBreakdowns(current => ({ ...current, [question.id]: true }));
    onChooseAnswer(question, selectedIndex);
  };
  const handleBookmark = (question: SscMcq) => {
    setLocalBookmarkIds(current =>
      current.includes(question.id)
        ? current.filter(id => id !== question.id)
        : [...current, question.id]
    );
    onToggleBookmark(question);
  };

  return (
    <section className="ssc-hind space-y-5">
      <SscPremiumStyles />
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-900/10 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300" />
        <div className="relative grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-amber-100">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Vertical MCQ Studio
            </p>
            <h2 className="ssc-gradient-loop mt-3 bg-gradient-to-r from-cyan-200 via-emerald-200 to-amber-100 bg-clip-text text-3xl font-black leading-tight text-transparent md:text-4xl">
              Curated questions, stacked niche-niche for fast revision.
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-slate-300">
              Tap any option to get instant green or red feedback. Open each breakdown for answer logic, accuracy and revision guidance.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              ['Attempted', attempted.length, 'text-white'],
              ['Correct', correct, 'text-emerald-300'],
              ['Accuracy', `${accuracy}%`, 'text-amber-200'],
            ].map(([label, value, color]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.08] px-4 py-3">
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</p>
                <p className={`mt-1 text-2xl font-black ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {questions.map((question, questionIndex) => {
        const saved = mergedAnswers[question.id];
        const isBookmarked = progress.bookmarkedQuestionIds.includes(question.id) || localBookmarkIds.includes(question.id);
        const breakdownOpen = Boolean(openBreakdowns[question.id] || saved);
        const accent = readerAccentSets[questionIndex % readerAccentSets.length];
        const selectedOption = saved ? question.options[saved.selectedIndex] : null;
        const correctOption = question.options[question.correctIndex];

        return (
          <article
            key={question.id}
            className={`relative overflow-hidden rounded-[2rem] border bg-white/85 p-5 shadow-xl shadow-slate-950/5 transition hover:-translate-y-0.5 hover:shadow-2xl dark:bg-white/7 md:p-6 ${
              saved?.isCorrect
                ? 'border-emerald-300/55'
                : saved
                  ? 'border-rose-300/55'
                  : `${accent.border} hover:border-sky-300/60`
            }`}
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${saved?.isCorrect ? 'from-emerald-400 via-lime-300 to-sky-400' : saved ? 'from-rose-500 via-orange-400 to-amber-300' : accent.solid}`} />
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${accent.soft} px-3 py-1 text-xs font-black ${accent.icon}`}>
                  <Target className="h-4 w-4" />
                  MCQ {String(questionIndex + 1).padStart(3, '0')}
                </span>
                <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-black text-slate-500 dark:bg-white/10 dark:text-slate-300">{question.difficulty}</span>
                {saved && (
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${saved.isCorrect ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-200' : 'bg-rose-500/12 text-rose-600 dark:text-rose-200'}`}>
                    {saved.isCorrect ? 'Solved Correctly' : 'Needs Revision'}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => handleBookmark(question)} className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-black transition ${isBookmarked ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-900/5 text-slate-500 hover:bg-amber-400/12 dark:bg-white/10 dark:text-slate-300'}`}>
                  <Sparkles className="h-4 w-4" />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button type="button" onClick={() => toggleBreakdown(question.id)} className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-3 py-2 text-xs font-black text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950">
                  <ListChecks className="h-4 w-4" />
                  Breakdown
                </button>
              </div>
            </div>

            <h3 className="max-w-5xl text-xl font-black leading-9 text-slate-950 dark:text-white md:text-2xl">
              {renderSmartText(question.question)}
            </h3>

            <div className="mt-5 grid gap-3">
              {question.options.map((option, optionIndex) => {
                const selected = saved?.selectedIndex === optionIndex;
                const correctAnswer = saved && question.correctIndex === optionIndex;
                const wrongSelection = selected && saved && !saved.isCorrect;
                return (
                  <button
                    key={`${question.id}-${option}`}
                    type="button"
                    onClick={() => handleChooseAnswer(question, optionIndex)}
                    className={`group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-3xl border px-4 py-4 text-left text-sm font-black leading-7 transition hover:-translate-y-0.5 ${
                      correctAnswer
                        ? 'border-emerald-300/60 bg-emerald-400/15 text-emerald-800 shadow-lg shadow-emerald-500/10 dark:text-emerald-100'
                        : wrongSelection
                          ? 'border-rose-300/60 bg-rose-400/15 text-rose-800 shadow-lg shadow-rose-500/10 dark:text-rose-100'
                          : selected
                            ? `border-transparent bg-gradient-to-r ${accent.soft} text-slate-900 dark:text-white`
                            : 'border-slate-900/10 bg-slate-50/90 text-slate-700 hover:border-sky-300 dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-200'
                    }`}
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-2xl text-xs font-black ${correctAnswer ? 'bg-emerald-500 text-white' : wrongSelection ? 'bg-rose-500 text-white' : `bg-gradient-to-br ${accent.solid} text-white`}`}>
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span>{renderSmartText(option)}</span>
                    {correctAnswer ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : wrongSelection ? <X className="h-5 w-5 text-rose-500" /> : <MousePointer2 className="h-5 w-5 text-slate-300 group-hover:text-sky-500" />}
                  </button>
                );
              })}
            </div>

            {breakdownOpen && (
              <div className={`ssc-shine-loop relative mt-5 overflow-hidden rounded-3xl border p-5 ${saved?.isCorrect ? 'border-emerald-300/35 bg-emerald-400/10' : saved ? 'border-rose-300/35 bg-rose-400/10' : 'border-sky-300/30 bg-sky-400/10'}`}>
                <div className="relative grid gap-4 lg:grid-cols-[1fr_auto]">
                  <div>
                    <p className={`text-xs font-black uppercase tracking-[0.16em] ${saved?.isCorrect ? 'text-emerald-600 dark:text-emerald-200' : saved ? 'text-rose-600 dark:text-rose-200' : 'text-sky-600 dark:text-sky-200'}`}>
                      Answer Analytics
                    </p>
                    <p className="mt-2 text-sm font-bold leading-7 text-slate-700 dark:text-slate-200">{question.explanation}</p>
                  </div>
                  <div className="grid min-w-56 gap-2 text-sm font-black">
                    <div className="rounded-2xl bg-white/80 px-4 py-3 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                      Correct: <span className="text-emerald-600 dark:text-emerald-200">{correctOption}</span>
                    </div>
                    <div className="rounded-2xl bg-white/80 px-4 py-3 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                      Selected: <span className={saved?.isCorrect ? 'text-emerald-600 dark:text-emerald-200' : 'text-rose-600 dark:text-rose-200'}>{selectedOption || 'Not answered'}</span>
                    </div>
                    <div className="rounded-2xl bg-white/80 px-4 py-3 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                      Result: <span className={saved?.isCorrect ? 'text-emerald-600 dark:text-emerald-200' : 'text-rose-600 dark:text-rose-200'}>{saved ? saved.isCorrect ? 'Success' : 'Error' : 'Pending'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}

export function SscResultCard({
  attempt,
}: {
  attempt: SscQuizAttempt;
}) {
  const accuracy = attempt.total ? Math.round((attempt.correctCount / attempt.total) * 100) : 0;
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/35 md:p-8">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-amber-300 to-emerald-300" />
      <div className="relative">
        <div className="mb-8 flex items-center gap-4">
          <img src="/logo-128.webp" alt="ICT Toppers" className="h-14 w-14 rounded-2xl object-cover" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-200">ICT Toppers</p>
            <h2 className="text-2xl font-black">SSC ICT Quiz Result</h2>
          </div>
        </div>
        <p className="text-sm font-bold text-slate-400">Student</p>
        <h3 className="mt-1 text-3xl font-black">{attempt.displayName || 'ICT Student'}</h3>
        <p className="mt-2 text-sm font-semibold text-slate-300">{attempt.quizTitle}</p>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Score</p>
            <p className="mt-2 text-3xl font-black text-emerald-300">{attempt.score}/{attempt.total}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Rank</p>
            <p className="mt-2 text-3xl font-black text-amber-300">#{attempt.rankSnapshot || '-'}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Accuracy</p>
            <p className="mt-2 text-3xl font-black text-sky-300">{accuracy}%</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Time</p>
            <p className="mt-2 text-3xl font-black text-white">{Math.floor(attempt.timeTakenSeconds / 60)}m</p>
          </div>
        </div>

        <div className="mt-6 grid gap-2 text-sm font-bold text-slate-300 sm:grid-cols-3">
          <span>Correct: {attempt.correctCount}</span>
          <span>Wrong: {attempt.wrongCount}</span>
          <span>Skipped: {attempt.skippedCount}</span>
        </div>
        <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-slate-400">
          Challenge yourself at ICT Toppers
        </p>
      </div>
    </div>
  );
}

export function SscEmptyState({
  icon = <FileText className="h-8 w-8" />,
  title,
  text,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-slate-900/15 bg-white/60 p-8 text-center dark:border-white/15 dark:bg-white/5">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-500/12 text-sky-500">
        {icon}
      </div>
      <h2 className="text-2xl font-black text-slate-950 dark:text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function SscRankIcon() {
  return <Trophy className="h-5 w-5 text-amber-400" />;
}
