import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Download,
  FileQuestion,
  Layers,
  MapPinned,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { questionBankBoardYears, questionBankChapters } from '../data/boardQuestions';
import { cn } from '../lib/utils';

const defaultBoardYearSlug = 'dhaka-board-2025';
const siteUrl = 'https://icttoppers.com';

type AccordionKey = 'cq' | 'mcq';
type IconComponent = React.ComponentType<{ className?: string }>;

const tickerItems = [
  'HSC ICT Board Question 2025',
  'Chapter-wise CQ PDF',
  'Board-wise MCQ Practice',
  'Dhaka Board ICT Question',
  '100% Free PDF Download',
  'Mobile-ready Flipbook Viewer',
];

interface AccordionSectionProps {
  id: AccordionKey;
  title: string;
  subtitle: string;
  badge: string;
  icon: IconComponent;
  open: boolean;
  onToggle: (id: AccordionKey) => void;
  tone: 'blueRed' | 'redBlue';
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  id,
  title,
  subtitle,
  badge,
  icon: Icon,
  open,
  onToggle,
  tone,
  children,
}) => {
  return (
    <section className="group overflow-hidden rounded-[1.45rem] border border-yellow-200/90 bg-white/92 shadow-[0_24px_90px_-58px_rgba(29,78,216,0.72)] ring-1 ring-blue-950/5 backdrop-blur-xl">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        className={cn(
          'shine-sweep flex w-full items-center justify-between gap-4 px-4 py-5 text-left text-white transition-all duration-300 sm:px-7',
          tone === 'blueRed'
            ? 'bg-gradient-to-r from-blue-800 via-blue-700 to-red-700 hover:from-blue-700 hover:to-red-600'
            : 'bg-gradient-to-r from-red-700 via-blue-700 to-blue-800 hover:from-red-600 hover:to-blue-700'
        )}
      >
        <span className="flex min-w-0 items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-300 text-blue-950 shadow-lg shadow-yellow-950/10 ring-1 ring-white/30">
            <Icon className="h-6 w-6" />
          </span>
          <span className="min-w-0">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-yellow-100">
              {badge}
            </span>
            <span className="mt-2 block text-xl font-black leading-tight tracking-normal sm:text-2xl md:text-3xl">{title}</span>
            <span className="mt-1 block text-sm font-semibold leading-6 text-white/82">{subtitle}</span>
          </span>
        </span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-inner">
          <ChevronDown className={cn('h-6 w-6 transition-transform duration-300', open && 'rotate-180')} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-br from-white via-blue-50/80 to-yellow-50 p-4 sm:p-6 md:p-7">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface CardLinkProps {
  to: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: IconComponent;
  accent: 'blue' | 'red';
}

const CardLink: React.FC<CardLinkProps> = ({
  to,
  eyebrow,
  title,
  description,
  icon: Icon,
  accent,
}) => {
  return (
    <Link
      to={to}
      className="group relative flex min-h-48 flex-col overflow-hidden rounded-2xl border border-white bg-white p-5 shadow-[0_18px_48px_-32px_rgba(15,23,42,0.68)] ring-1 ring-blue-950/5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-200 hover:shadow-[0_28px_70px_-36px_rgba(185,28,28,0.58)]"
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-700 via-red-600 to-yellow-300" />
      <span className="pointer-events-none absolute -left-20 top-0 h-full w-16 rotate-12 bg-white/55 blur-md transition-transform duration-700 group-hover:translate-x-[28rem]" />

      <div className="mb-5 flex items-start justify-between gap-4">
        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg',
            accent === 'blue'
              ? 'bg-gradient-to-br from-blue-700 to-blue-500 shadow-blue-900/20'
              : 'bg-gradient-to-br from-red-600 to-blue-700 shadow-red-900/20'
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-[0.64rem] font-black uppercase tracking-[0.14em] text-yellow-800">
          {eyebrow}
        </span>
      </div>

      <h3 className="text-lg font-black leading-snug tracking-normal text-slate-950">{title}</h3>
      <p className="mt-3 flex-1 text-sm font-semibold leading-6 text-slate-600">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-red-600 transition-colors group-hover:text-blue-700">
        Open PDF viewer <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

const Ticker = () => (
  <div className="mt-6 overflow-hidden rounded-2xl border border-yellow-200 bg-white/75 py-3 shadow-inner">
    <div className="board-question-marquee flex w-max items-center gap-4 whitespace-nowrap text-xs font-black uppercase tracking-[0.16em] text-blue-800">
      {[...tickerItems, ...tickerItems].map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          <span>{item}</span>
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-red-600 to-yellow-300" />
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default function BoardQuestionsIndex() {
  const [openSections, setOpenSections] = useState<Record<AccordionKey, boolean>>({
    cq: true,
    mcq: true,
  });

  const toggleSection = (id: AccordionKey) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const pageTitle = 'HSC ICT Board Question Bank (CQ & MCQ) - 100% Free PDF Download';
  const metaDescription = 'Explore HSC ICT Board Question 2025 PDFs for free with chapter-wise CQ and board-wise MCQ question banks in a clean mobile-friendly viewer.';

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: metaDescription,
    url: `${siteUrl}/board-questions`,
    about: ['HSC ICT Board Question 2025', 'Chapter-wise CQ', 'Board-wise MCQ', 'Bangladesh HSC ICT'],
    isPartOf: {
      '@type': 'WebSite',
      name: 'ICT Toppers',
      url: siteUrl,
    },
  };

  return (
    <div className="w-full bg-[linear-gradient(135deg,#ffffff_0%,#eff6ff_34%,#fff7cc_67%,#fff_100%)] text-slate-950">
      <Helmet>
        <title>{pageTitle} | ICT Toppers</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content="HSC ICT Board Question 2025, HSC ICT Question Bank, Chapter-wise CQ, Board-wise MCQ, ICT Board Question PDF Bangladesh" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/board-questions`} />
        <link rel="canonical" href={`${siteUrl}/board-questions`} />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 md:py-9">
        <header className="relative overflow-hidden rounded-[1.6rem] border border-white bg-white/90 p-5 shadow-[0_28px_90px_-52px_rgba(29,78,216,0.65)] ring-1 ring-blue-950/5 backdrop-blur-xl sm:p-7 md:p-10">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-700 via-red-600 to-yellow-300" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />

          <div className="relative mx-auto max-w-5xl text-center">
            <span className="shine-sweep inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-800 shadow-sm">
              <Sparkles className="h-4 w-4 text-red-600" /> Question Bank
            </span>
            <h1 className="mx-auto mt-5 max-w-5xl text-[2rem] font-black leading-[1.08] tracking-normal text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
              {pageTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 md:text-lg">
              Find HSC ICT Board Question 2025 PDFs with Chapter-wise CQ practice and Board-wise MCQ preparation for Bangladesh education board exams.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-4 text-left shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">CQ Bank</p>
                <p className="mt-2 text-2xl font-black text-slate-950">6 Chapters</p>
              </div>
              <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-white to-red-50 p-4 text-left shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-red-600">MCQ Bank</p>
                <p className="mt-2 text-2xl font-black text-slate-950">Board-wise</p>
              </div>
              <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-white to-yellow-50 p-4 text-left shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-yellow-700">Access</p>
                <p className="mt-2 text-2xl font-black text-slate-950">Free PDF</p>
              </div>
            </div>

            <Ticker />

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#cq-bank"
                className="shine-sweep inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-red-600 px-5 py-3 text-sm font-black text-white shadow-xl shadow-blue-900/20 transition-all hover:-translate-y-0.5 hover:from-blue-600 hover:to-red-500"
              >
                <Layers className="h-4 w-4" /> Browse CQ
              </a>
              <a
                href="#mcq-bank"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-300 px-5 py-3 text-sm font-black text-blue-950 shadow-xl shadow-yellow-900/10 transition-all hover:-translate-y-0.5 hover:bg-yellow-200"
              >
                <Download className="h-4 w-4" /> Browse MCQ PDFs
              </a>
            </div>
          </div>
        </header>

        <div className="mt-7 space-y-5 md:mt-9">
          <div id="cq-bank">
            <AccordionSection
              id="cq"
              title="CQ Question Bank (Chapter-wise)"
              subtitle="Six HSC ICT chapters organized for creative-question PDF practice."
              badge="Chapter-wise CQ"
              icon={Layers}
              open={openSections.cq}
              onToggle={toggleSection}
              tone="blueRed"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {questionBankChapters.map(chapter => (
                  <CardLink
                    key={chapter.slug}
                    to={`/board-questions/${defaultBoardYearSlug}/${chapter.slug}`}
                    eyebrow="CQ PDF"
                    title={chapter.title}
                    description={chapter.description}
                    icon={BookOpen}
                    accent="blue"
                  />
                ))}
              </div>
            </AccordionSection>
          </div>

          <div id="mcq-bank">
            <AccordionSection
              id="mcq"
              title="MCQ Question Bank (Board-wise)"
              subtitle="Board and year based HSC ICT MCQ question PDFs for fast revision."
              badge="Board-wise MCQ"
              icon={FileQuestion}
              open={openSections.mcq}
              onToggle={toggleSection}
              tone="redBlue"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {questionBankBoardYears.map(boardYear => (
                  <CardLink
                    key={boardYear.boardYearSlug}
                    to={`/board-questions/${boardYear.boardYearSlug}/${boardYear.defaultChapterSlug}`}
                    eyebrow="MCQ PDF"
                    title={boardYear.title}
                    description={boardYear.description}
                    icon={MapPinned}
                    accent="red"
                  />
                ))}
              </div>
            </AccordionSection>
          </div>
        </div>
      </main>
    </div>
  );
}
