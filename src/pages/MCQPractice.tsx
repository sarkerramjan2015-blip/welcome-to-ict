import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  Flame,
  Search,
  Target,
  Timer,
} from 'lucide-react';
import { ictSyllabus } from '../data/ict-syllabus';
import { useLms } from '../context/LmsContext';
import { cn } from '../lib/utils';

const allTopics = ictSyllabus.flatMap(chapter =>
  chapter.topics.map(topic => ({
    ...topic,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterShortTitle: chapter.title.split(': ')[1] || chapter.title,
    mcqCount: topic.practiceMcqs.length + topic.quizMcqs.length,
  }))
);

const totalMcqs = allTopics.reduce((sum, topic) => sum + topic.mcqCount, 0);
const highPriorityTopics = allTopics.filter(topic => topic.importance === 'High').slice(0, 8);

export default function MCQPractice() {
  const { completedTopicIds, quizResults, analytics } = useLms();
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return allTopics.filter(topic => {
      const chapterMatches = selectedChapter === 'all' || topic.chapterId === selectedChapter;
      const queryMatches =
        !normalizedQuery ||
        topic.title.toLowerCase().includes(normalizedQuery) ||
        topic.chapterTitle.toLowerCase().includes(normalizedQuery);

      return chapterMatches && queryMatches && topic.mcqCount > 0;
    });
  }, [searchQuery, selectedChapter]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#eff8ff_44%,#f8fafc_100%)] px-4 py-8 text-slate-950 dark:bg-[linear-gradient(180deg,#020617_0%,#071426_44%,#020617_100%)] dark:text-white sm:px-6 md:px-10 lg:px-16">
      <Helmet>
        <title>Free HSC ICT MCQ Practice | ICT Toppers</title>
        <meta
          name="description"
          content="Practice HSC ICT MCQ chapter-wise with quick topic filters, high-priority board topics, and quiz links on ICT Toppers."
        />
        <link rel="canonical" href="https://icttoppers.com/mcq-practice" />
      </Helmet>

      <main className="mx-auto max-w-7xl">
        <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-sky-700 shadow-sm dark:border-sky-400/20 dark:bg-white/10 dark:text-sky-200">
              <Brain className="h-4 w-4" /> Free MCQ Practice
            </p>
            <h1 className="max-w-4xl text-[2.45rem] font-black leading-[1.08] tracking-normal text-slate-950 dark:text-white sm:text-5xl md:text-6xl">
              HSC ICT MCQ practice, chapter-wise and fast
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
              Board-focused topics থেকে practice শুরু করো, তারপর timed quiz mode-এ নিজের preparation check করো.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-[2rem] border border-white/75 bg-white/80 p-5 shadow-2xl shadow-sky-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-white/10"
          >
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-sky-50 p-4 dark:bg-sky-400/10">
                <BookOpen className="mb-3 h-5 w-5 text-sky-600 dark:text-sky-200" />
                <p className="text-2xl font-black">{ictSyllabus.length}</p>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Chapters</p>
              </div>
              <div className="rounded-2xl bg-violet-50 p-4 dark:bg-violet-400/10">
                <Brain className="mb-3 h-5 w-5 text-violet-600 dark:text-violet-200" />
                <p className="text-2xl font-black">{totalMcqs}+</p>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">MCQ</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-400/10">
                <BarChart3 className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-200" />
                <p className="text-2xl font-black">{analytics.quizAttempts}</p>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Attempts</p>
              </div>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${analytics.completionRate}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400"
              />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-500 dark:text-slate-400">
              Topic completion: {analytics.completionRate}%
            </p>
          </motion.div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/75 bg-white/80 p-5 shadow-xl shadow-slate-950/5 backdrop-blur-2xl dark:border-white/10 dark:bg-white/10 md:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">Choose your practice path</h2>
              <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Search or filter by chapter, then open practice or quiz directly.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                  placeholder="Search topics..."
                  className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white sm:w-72"
                />
              </div>
              <select
                value={selectedChapter}
                onChange={event => setSelectedChapter(event.target.value)}
                className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
              >
                <option value="all">All Chapters</option>
                {ictSyllabus.map(chapter => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <Flame className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">High-priority topics</h2>
          </div>
          <div className="-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 scrollbar-hide">
            {(highPriorityTopics.length ? highPriorityTopics : allTopics.slice(0, 8)).map(topic => (
              <Link
                key={`priority-${topic.id}`}
                to={`/topics/${topic.id}#practice`}
                className="group flex min-h-52 w-[82vw] shrink-0 snap-start flex-col rounded-[1.5rem] border border-white/75 bg-white/80 p-5 shadow-lg shadow-slate-950/5 backdrop-blur-xl transition-all hover:-translate-y-1 dark:border-white/10 dark:bg-white/10 sm:w-80"
              >
                <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-black text-orange-700 dark:bg-orange-400/10 dark:text-orange-200">
                  <Target className="h-4 w-4" /> High focus
                </span>
                <h3 className="text-lg font-black leading-snug text-slate-950 dark:text-white">{topic.title}</h3>
                <p className="mt-3 flex-1 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
                  {topic.chapterShortTitle}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-black text-sky-700 dark:text-sky-200">
                  Practice now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTopics.map(topic => {
            const latestResult = quizResults.find(result => result.topicId === topic.id);
            const isCompleted = completedTopicIds.includes(topic.id);

            return (
              <motion.article
                key={topic.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.32 }}
                className="flex min-h-72 flex-col rounded-[1.5rem] border border-white/75 bg-white/82 p-5 shadow-xl shadow-slate-950/5 backdrop-blur-2xl dark:border-white/10 dark:bg-white/10"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <span className="rounded-full bg-sky-100 px-3 py-1.5 text-xs font-black text-sky-800 dark:bg-sky-400/10 dark:text-sky-200">
                    {topic.chapterShortTitle}
                  </span>
                  {isCompleted && <CheckCircle2 className="h-6 w-6 text-emerald-500" />}
                </div>
                <h3 className="text-xl font-black leading-snug text-slate-950 dark:text-white">{topic.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700 dark:bg-slate-950/50 dark:text-slate-200">
                    <Brain className="h-4 w-4" /> {topic.mcqCount} MCQ
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700 dark:bg-slate-950/50 dark:text-slate-200">
                    <Timer className="h-4 w-4" /> 10 min quiz
                  </span>
                  {latestResult && (
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-black',
                        latestResult.accuracy >= 70
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-400/10 dark:text-amber-200'
                      )}
                    >
                      {latestResult.accuracy}% last score
                    </span>
                  )}
                </div>
                <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
                  <Link
                    to={`/topics/${topic.id}#practice`}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition-all hover:bg-sky-500"
                  >
                    Practice <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={`/topics/${topic.id}#quiz`}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-950 transition-all hover:bg-sky-50 dark:border-white/10 dark:bg-white/10 dark:text-white"
                  >
                    Quiz Mode
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </section>

        {filteredTopics.length === 0 && (
          <div className="mt-10 rounded-[1.5rem] border border-dashed border-slate-300 p-10 text-center dark:border-white/15">
            <h2 className="text-2xl font-black">No matching MCQ topics found</h2>
            <p className="mt-2 font-semibold text-slate-500 dark:text-slate-400">Try another keyword or choose all chapters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
