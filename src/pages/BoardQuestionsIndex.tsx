import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronDown, FileQuestion, Layers, MapPinned } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { questionBankBoardYears, questionBankChapters } from '../data/boardQuestions';
import { cn } from '../lib/utils';

const defaultBoardYearSlug = 'dhaka-board-2025';
const siteUrl = 'https://icttoppers.com';

type AccordionKey = 'cq' | 'mcq';
type IconComponent = React.ComponentType<{ className?: string }>;

interface AccordionSectionProps {
  id: AccordionKey;
  title: string;
  subtitle: string;
  icon: IconComponent;
  open: boolean;
  onToggle: (id: AccordionKey) => void;
  tone: 'emerald' | 'indigo';
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  id,
  title,
  subtitle,
  icon: Icon,
  open,
  onToggle,
  tone,
  children,
}) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        className={cn(
          'flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-white transition-colors sm:px-7',
          tone === 'emerald'
            ? 'bg-emerald-700 hover:bg-emerald-600'
            : 'bg-indigo-700 hover:bg-indigo-600'
        )}
      >
        <span className="flex min-w-0 items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <Icon className="h-6 w-6" />
          </span>
          <span className="min-w-0">
            <span className="block text-xl font-black tracking-tight sm:text-2xl">{title}</span>
            <span className="mt-1 block text-sm font-semibold leading-6 text-white/80">{subtitle}</span>
          </span>
        </span>
        <ChevronDown className={cn('h-6 w-6 shrink-0 transition-transform duration-300', open && 'rotate-180')} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-6 md:p-7">
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
}

const CardLink: React.FC<CardLinkProps> = ({
  to,
  eyebrow,
  title,
  description,
  icon: Icon,
}) => {
  return (
    <Link
      to={to}
      className="group flex min-h-44 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-950/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-900/70"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="rounded-lg bg-slate-100 p-3 text-sky-600 transition-colors group-hover:bg-sky-50 dark:bg-slate-800 dark:text-sky-300 dark:group-hover:bg-slate-800/70">
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {eyebrow}
        </span>
      </div>
      <h3 className="text-lg font-black leading-snug text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-3 flex-1 text-sm font-medium leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      <span className="mt-5 text-sm font-black text-sky-600 dark:text-sky-300">Open PDF viewer</span>
    </Link>
  );
};

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
    <div className="w-full">
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

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-600 dark:text-sky-300">Question Bank</p>
          <h1 className="mt-4 text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl">
            {pageTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm font-medium leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            Find HSC ICT Board Question 2025 PDFs with Chapter-wise CQ practice and Board-wise MCQ preparation for Bangladesh education board exams.
          </p>
        </header>

        <div className="mt-9 space-y-5 md:mt-12">
          <AccordionSection
            id="cq"
            title="CQ Question Bank (Chapter-wise)"
            subtitle="Six HSC ICT chapters organized for creative-question PDF practice."
            icon={Layers}
            open={openSections.cq}
            onToggle={toggleSection}
            tone="emerald"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {questionBankChapters.map(chapter => (
                <CardLink
                  key={chapter.slug}
                  to={`/board-questions/${defaultBoardYearSlug}/${chapter.slug}`}
                  eyebrow="Chapter-wise CQ"
                  title={chapter.title}
                  description={chapter.description}
                  icon={BookOpen}
                />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            id="mcq"
            title="MCQ Question Bank (Board-wise)"
            subtitle="Board and year based HSC ICT MCQ question PDFs for fast revision."
            icon={FileQuestion}
            open={openSections.mcq}
            onToggle={toggleSection}
            tone="indigo"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {questionBankBoardYears.map(boardYear => (
                <CardLink
                  key={boardYear.boardYearSlug}
                  to={`/board-questions/${boardYear.boardYearSlug}/${boardYear.defaultChapterSlug}`}
                  eyebrow="Board-wise MCQ"
                  title={boardYear.title}
                  description={boardYear.description}
                  icon={MapPinned}
                />
              ))}
            </div>
          </AccordionSection>
        </div>
      </main>
    </div>
  );
}
