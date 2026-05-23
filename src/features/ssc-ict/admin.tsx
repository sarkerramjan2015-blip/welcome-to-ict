import React, { useMemo, useState } from 'react';
import {
  BadgeCheck,
  BookOpen,
  FileQuestion,
  ListChecks,
  Package,
  Plus,
  RotateCcw,
  Save,
  Settings,
  Trash2,
  WalletCards,
} from 'lucide-react';
import type { SscChapter, SscMcq, SscShortQuestion } from './types';
import { useSscIct } from './hooks';
import {
  getSscOrders,
  getSscIctConfig,
  resetSscIctConfig,
  saveSscIctConfig,
  updateSscOrderStatus,
} from './storage';

type AdminTab = 'chapters' | 'questions' | 'package' | 'orders';

const pageWrap = 'mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:px-10 lg:px-16';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `chapter-${Date.now()}`;

const emptyMcq = (chapterSlug: string): SscMcq => ({
  id: `ssc-${chapterSlug}-q-${Date.now()}`,
  question: '',
  options: ['', '', '', ''],
  correctIndex: 0,
  explanation: '',
  difficulty: 'Medium',
  isPublished: true,
});

const emptyShort = (chapterSlug: string): SscShortQuestion => ({
  id: `ssc-${chapterSlug}-s-${Date.now()}`,
  question: '',
  answer: '',
  importance: 'Medium',
  isPublished: true,
});

export default function SscIctAdminPage() {
  const { config, refresh } = useSscIct();
  const [draft, setDraft] = useState(config);
  const [tab, setTab] = useState<AdminTab>('chapters');
  const [selectedSlug, setSelectedSlug] = useState(config.chapters[0]?.slug || '');
  const orders = getSscOrders();
  const selectedChapter = useMemo(
    () => draft.chapters.find(chapter => chapter.slug === selectedSlug) || draft.chapters[0],
    [draft.chapters, selectedSlug]
  );

  const persist = () => {
    saveSscIctConfig({
      ...draft,
      chapters: draft.chapters
        .map((chapter, index) => ({ ...chapter, orderIndex: index + 1 }))
        .sort((a, b) => a.orderIndex - b.orderIndex),
    });
    refresh();
  };

  const updateChapter = (slug: string, patch: Partial<SscChapter>) => {
    setDraft(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter => chapter.slug === slug ? { ...chapter, ...patch } : chapter),
    }));
  };

  const addChapter = () => {
    const nextIndex = draft.chapters.length + 1;
    const chapter: SscChapter = {
      id: `ssc-chapter-${Date.now()}`,
      title: `New SSC ICT Chapter ${nextIndex}`,
      slug: `new-ssc-chapter-${nextIndex}`,
      description: 'Add chapter description here.',
      price: 100,
      orderIndex: nextIndex,
      isPublished: false,
      freePreviewEnabled: true,
      pdfTitle: `Chapter ${nextIndex} Smart PDF Notes`,
      pdfPages: ['Add protected PDF page content here.'],
      previewPageLimit: 1,
      mcqs: [],
      shortQuestions: [],
    };
    setDraft(prev => ({ ...prev, chapters: [...prev.chapters, chapter] }));
    setSelectedSlug(chapter.slug);
  };

  const deleteChapter = (slug: string) => {
    const next = draft.chapters.filter(chapter => chapter.slug !== slug);
    setDraft(prev => ({ ...prev, chapters: next }));
    setSelectedSlug(next[0]?.slug || '');
  };

  const updateSelectedChapter = (patch: Partial<SscChapter>) => {
    if (!selectedChapter) return;
    updateChapter(selectedChapter.slug, patch);
  };

  const updateMcq = (questionId: string, patch: Partial<SscMcq>) => {
    if (!selectedChapter) return;
    updateSelectedChapter({
      mcqs: selectedChapter.mcqs.map(mcq => mcq.id === questionId ? { ...mcq, ...patch } : mcq),
    });
  };

  const updateShort = (questionId: string, patch: Partial<SscShortQuestion>) => {
    if (!selectedChapter) return;
    updateSelectedChapter({
      shortQuestions: selectedChapter.shortQuestions.map(item => item.id === questionId ? { ...item, ...patch } : item),
    });
  };

  const tabs: Array<{ id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'chapters', label: 'Chapters', icon: BookOpen },
    { id: 'questions', label: 'Questions', icon: FileQuestion },
    { id: 'package', label: 'Package', icon: Package },
    { id: 'orders', label: 'Orders', icon: WalletCards },
  ];

  return (
    <div className={pageWrap}>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">Admin Console</p>
          <h1 className="text-4xl font-black text-slate-950 dark:text-white">SSC ICT Management</h1>
          <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
            Manage chapter pricing, preview limits, PDFs, MCQs, short questions, package settings and orders.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              resetSscIctConfig();
              setDraft(getSscIctConfig());
              refresh();
            }}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-sm font-black text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            type="button"
            onClick={persist}
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-600/20"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-black ${
                tab === item.id
                  ? 'bg-sky-600 text-white'
                  : 'border border-slate-900/10 bg-white/70 text-slate-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {tab === 'chapters' && (
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <section className="rounded-[1.75rem] border border-slate-900/10 bg-white/75 p-4 dark:border-white/10 dark:bg-white/7">
            <button
              type="button"
              onClick={addChapter}
              className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-black text-white"
            >
              <Plus className="h-4 w-4" />
              Add Chapter
            </button>
            <div className="space-y-2">
              {draft.chapters.map(chapter => (
                <button
                  key={chapter.slug}
                  type="button"
                  onClick={() => setSelectedSlug(chapter.slug)}
                  className={`w-full rounded-2xl p-4 text-left transition ${
                    selectedSlug === chapter.slug
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-900/5 text-slate-700 dark:bg-white/7 dark:text-slate-200'
                  }`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.16em] opacity-70">Chapter {chapter.orderIndex}</p>
                  <p className="mt-1 font-black">{chapter.title}</p>
                </button>
              ))}
            </div>
          </section>

          {selectedChapter && (
            <section className="rounded-[1.75rem] border border-slate-900/10 bg-white/75 p-5 dark:border-white/10 dark:bg-white/7 md:p-8">
              <div className="mb-5 flex items-start justify-between gap-3">
                <h2 className="text-2xl font-black text-slate-950 dark:text-white">Chapter Details</h2>
                <button
                  type="button"
                  onClick={() => deleteChapter(selectedChapter.slug)}
                  className="rounded-2xl bg-rose-500/10 p-3 text-rose-500"
                  aria-label="Delete chapter"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Title</span>
                  <input value={selectedChapter.title} onChange={event => updateSelectedChapter({ title: event.target.value })} className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950/50 dark:text-white" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Slug</span>
                  <input value={selectedChapter.slug} onChange={event => {
                    const slug = slugify(event.target.value);
                    updateChapter(selectedChapter.slug, { slug });
                    setSelectedSlug(slug);
                  }} className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950/50 dark:text-white" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Price</span>
                  <input type="number" min={0} value={selectedChapter.price} onChange={event => updateSelectedChapter({ price: Number(event.target.value) || 0 })} className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950/50 dark:text-white" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Preview Page Limit</span>
                  <input type="number" min={1} value={selectedChapter.previewPageLimit} onChange={event => updateSelectedChapter({ previewPageLimit: Number(event.target.value) || 1 })} className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950/50 dark:text-white" />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Description</span>
                  <textarea value={selectedChapter.description} onChange={event => updateSelectedChapter({ description: event.target.value })} rows={3} className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950/50 dark:text-white" />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Protected PDF Pages (one page per line)</span>
                  <textarea value={selectedChapter.pdfPages.join('\n')} onChange={event => updateSelectedChapter({ pdfPages: event.target.value.split('\n').filter(Boolean) })} rows={6} className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950/50 dark:text-white" />
                </label>
                <label className="flex items-center gap-3 rounded-2xl bg-slate-900/5 p-4 font-bold text-slate-700 dark:bg-white/7 dark:text-slate-200">
                  <input type="checkbox" checked={selectedChapter.isPublished} onChange={event => updateSelectedChapter({ isPublished: event.target.checked })} />
                  Published
                </label>
                <label className="flex items-center gap-3 rounded-2xl bg-slate-900/5 p-4 font-bold text-slate-700 dark:bg-white/7 dark:text-slate-200">
                  <input type="checkbox" checked={selectedChapter.freePreviewEnabled} onChange={event => updateSelectedChapter({ freePreviewEnabled: event.target.checked })} />
                  Free preview enabled
                </label>
              </div>
            </section>
          )}
        </div>
      )}

      {tab === 'questions' && selectedChapter && (
        <section className="rounded-[1.75rem] border border-slate-900/10 bg-white/75 p-5 dark:border-white/10 dark:bg-white/7 md:p-8">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">Question Bank</p>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">{selectedChapter.title}</h2>
            </div>
            <select value={selectedSlug} onChange={event => setSelectedSlug(event.target.value)} className="rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-bold dark:border-white/10 dark:bg-slate-950 dark:text-white">
              {draft.chapters.map(chapter => <option key={chapter.slug} value={chapter.slug}>{chapter.title}</option>)}
            </select>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            <button type="button" onClick={() => updateSelectedChapter({ mcqs: [...selectedChapter.mcqs, emptyMcq(selectedChapter.slug)] })} className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-black text-white">
              <Plus className="h-4 w-4" />
              Add MCQ
            </button>
            <button type="button" onClick={() => updateSelectedChapter({ shortQuestions: [...selectedChapter.shortQuestions, emptyShort(selectedChapter.slug)] })} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-white">
              <Plus className="h-4 w-4" />
              Add Short Question
            </button>
          </div>

          <div className="space-y-5">
            {selectedChapter.mcqs.map((mcq, index) => (
              <div key={mcq.id} className="rounded-3xl border border-slate-900/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="font-black text-slate-950 dark:text-white">MCQ {index + 1}</p>
                  <button type="button" onClick={() => updateSelectedChapter({ mcqs: selectedChapter.mcqs.filter(item => item.id !== mcq.id) })} className="rounded-xl bg-rose-500/10 p-2 text-rose-500"><Trash2 className="h-4 w-4" /></button>
                </div>
                <input value={mcq.question} onChange={event => updateMcq(mcq.id, { question: event.target.value })} placeholder="Question" className="mb-3 w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950 dark:text-white" />
                <div className="grid gap-3 md:grid-cols-2">
                  {mcq.options.map((option, optionIndex) => (
                    <input key={optionIndex} value={option} onChange={event => updateMcq(mcq.id, { options: mcq.options.map((item, i) => i === optionIndex ? event.target.value : item) })} placeholder={`Option ${optionIndex + 1}`} className="rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950 dark:text-white" />
                  ))}
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-[180px_1fr]">
                  <select value={mcq.correctIndex} onChange={event => updateMcq(mcq.id, { correctIndex: Number(event.target.value) })} className="rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-bold dark:border-white/10 dark:bg-slate-950 dark:text-white">
                    {mcq.options.map((_, i) => <option key={i} value={i}>Correct {String.fromCharCode(65 + i)}</option>)}
                  </select>
                  <input value={mcq.explanation} onChange={event => updateMcq(mcq.id, { explanation: event.target.value })} placeholder="Explanation" className="rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950 dark:text-white" />
                </div>
              </div>
            ))}

            {selectedChapter.shortQuestions.map((item, index) => (
              <div key={item.id} className="rounded-3xl border border-emerald-300/15 bg-emerald-400/5 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="font-black text-slate-950 dark:text-white">Short Question {index + 1}</p>
                  <button type="button" onClick={() => updateSelectedChapter({ shortQuestions: selectedChapter.shortQuestions.filter(question => question.id !== item.id) })} className="rounded-xl bg-rose-500/10 p-2 text-rose-500"><Trash2 className="h-4 w-4" /></button>
                </div>
                <input value={item.question} onChange={event => updateShort(item.id, { question: event.target.value })} placeholder="Question" className="mb-3 w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950 dark:text-white" />
                <textarea value={item.answer} onChange={event => updateShort(item.id, { answer: event.target.value })} placeholder="Answer" rows={3} className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950 dark:text-white" />
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'package' && (
        <section className="rounded-[1.75rem] border border-slate-900/10 bg-white/75 p-5 dark:border-white/10 dark:bg-white/7 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Settings className="h-7 w-7 text-sky-500" />
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Package & Quiz Settings</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Package Title</span>
              <input value={draft.packagePlan.title} onChange={event => setDraft(prev => ({ ...prev, packagePlan: { ...prev.packagePlan, title: event.target.value } }))} className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950/50 dark:text-white" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Package Price</span>
              <input type="number" min={0} value={draft.packagePlan.price} onChange={event => setDraft(prev => ({ ...prev, packagePlan: { ...prev.packagePlan, price: Number(event.target.value) || 0 } }))} className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950/50 dark:text-white" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Quiz Timer (minutes)</span>
              <input type="number" min={1} value={draft.quizSettings.durationMinutes} onChange={event => setDraft(prev => ({ ...prev, quizSettings: { ...prev.quizSettings, durationMinutes: Number(event.target.value) || 1 } }))} className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950/50 dark:text-white" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Total Questions</span>
              <input type="number" min={1} value={draft.quizSettings.totalQuestions} onChange={event => setDraft(prev => ({ ...prev, quizSettings: { ...prev.quizSettings, totalQuestions: Number(event.target.value) || 1 } }))} className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 font-semibold dark:border-white/10 dark:bg-slate-950/50 dark:text-white" />
            </label>
            <label className="flex items-center gap-3 rounded-2xl bg-slate-900/5 p-4 font-bold text-slate-700 dark:bg-white/7 dark:text-slate-200">
              <input type="checkbox" checked={draft.packagePlan.isPublished} onChange={event => setDraft(prev => ({ ...prev, packagePlan: { ...prev.packagePlan, isPublished: event.target.checked } }))} />
              Package published
            </label>
            <label className="flex items-center gap-3 rounded-2xl bg-slate-900/5 p-4 font-bold text-slate-700 dark:bg-white/7 dark:text-slate-200">
              <input type="checkbox" checked={draft.quizSettings.negativeMarkingEnabled} onChange={event => setDraft(prev => ({ ...prev, quizSettings: { ...prev.quizSettings, negativeMarkingEnabled: event.target.checked } }))} />
              Negative marking
            </label>
          </div>
        </section>
      )}

      {tab === 'orders' && (
        <section className="rounded-[1.75rem] border border-slate-900/10 bg-white/75 p-5 dark:border-white/10 dark:bg-white/7 md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <ListChecks className="h-7 w-7 text-sky-500" />
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Orders & Manual Access</h2>
          </div>
          {orders.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-900/15 p-8 text-center text-sm font-bold text-slate-500 dark:border-white/15">
              No local SSC ICT orders yet. Existing Firebase manual payments are still managed from the main admin payment workflow.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="grid gap-3 rounded-3xl border border-slate-900/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35 md:grid-cols-[1fr_120px_140px_220px] md:items-center">
                  <div>
                    <p className="font-black text-slate-950 dark:text-white">{order.userName}</p>
                    <p className="text-xs font-bold text-slate-500">{order.type === 'package' ? 'Full Package' : order.chapterSlug} · {order.userEmail || 'No email'}</p>
                  </div>
                  <p className="font-black text-sky-600 dark:text-sky-300">৳{order.amount}</p>
                  <span className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-black ${order.status === 'paid' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-200' : 'bg-amber-500/15 text-amber-600 dark:text-amber-200'}`}>
                    {order.status === 'paid' && <BadgeCheck className="h-4 w-4" />}
                    {order.status}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => { updateSscOrderStatus(order.id, 'paid'); refresh(); }} className="rounded-2xl bg-emerald-500 px-4 py-2 text-xs font-black text-white">Approve</button>
                    <button type="button" onClick={() => { updateSscOrderStatus(order.id, 'failed'); refresh(); }} className="rounded-2xl bg-rose-500 px-4 py-2 text-xs font-black text-white">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
