import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Target, Star, BarChart3, BookOpen, AlertCircle } from 'lucide-react';
interface ChapterAnalysisData {
  title: string;
  conclusion: string;
  topImportantTopics: string[];
  analysisTable: { topic: string; go: string; gha: string }[];
  importantQuestions: string[];
}

interface ChapterAnalysisProps {
  isOpen: boolean;
  onClose: () => void;
  data?: ChapterAnalysisData | null;
}

export default function ChapterAnalysis({ isOpen, onClose, data }: ChapterAnalysisProps) {

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-white/40 dark:border-white/20 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.3)] scrollbar-hide"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/20 rounded-full transition-colors z-10 text-slate-800 dark:text-white backdrop-blur-md"
            >
              <X size={20} />
            </button>

            {data ? (
              <div className="p-6 md:p-10 space-y-10">
                {/* Header */}
                <div className="text-center space-y-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -z-10"></div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 mb-2 border border-indigo-500/20 dark:border-indigo-500/30 shadow-lg">
                    <BarChart3 size={32} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-400">
                    {data.title}
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                    {data.conclusion}
                  </p>
                </div>

                {/* Top Important Topics */}
                <div className="space-y-5 relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-rose-500/10 rounded-lg">
                      <Star className="text-rose-500 dark:text-rose-400" size={24} />
                    </div>
                    সবচেয়ে গুরুত্বপূর্ণ টপিকসমূহ
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {data.topImportantTopics.map((topic, i) => (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i}
                        className="px-4 py-2 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 dark:border-rose-500/50 font-bold shadow-[0_4px_15px_rgba(244,63,94,0.05)] backdrop-blur-md"
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Analysis Table */}
                <div className="space-y-5">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-teal-500/10 rounded-lg">
                      <BookOpen className="text-teal-500 dark:text-teal-400" size={24} />
                    </div>
                    বোর্ড প্রশ্ন বিশ্লেষণ
                  </h3>
                  <div className="overflow-x-auto rounded-[1.5rem] border border-white/50 dark:border-white/10 shadow-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-teal-500/20 dark:bg-teal-500/20 text-teal-900 dark:text-teal-100 border-b border-white/30 dark:border-white/10 backdrop-blur-md">
                          <th className="p-5 font-bold text-lg whitespace-nowrap">টপিক</th>
                          <th className="p-5 font-bold text-lg whitespace-nowrap border-l border-white/30 dark:border-white/10">প্রয়োগ (গ)</th>
                          <th className="p-5 font-bold text-lg whitespace-nowrap border-l border-white/30 dark:border-white/10">উচ্চতর দক্ষতা (ঘ)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/30 dark:divide-white/5">
                        {data.analysisTable.map((row, i) => (
                          <tr key={i} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors group">
                            <td className="p-5 font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                              {row.topic}
                            </td>
                            <td className="p-5 text-slate-700 dark:text-slate-300 border-l border-white/30 dark:border-white/5 leading-relaxed text-sm font-medium">
                              {row.go}
                            </td>
                            <td className="p-5 text-slate-700 dark:text-slate-300 border-l border-white/30 dark:border-white/5 leading-relaxed text-sm font-medium">
                              {row.gha}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Important Questions */}
                <div className="space-y-5">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <Target className="text-amber-500 dark:text-amber-400" size={24} />
                    </div>
                    গুরুত্বপূর্ণ প্রশ্নসমূহ
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {data.importantQuestions.map((q, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i}
                        className="flex items-start gap-3 p-5 rounded-[1.25rem] bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/30 hover:bg-amber-500/20 dark:hover:bg-amber-500/20 transition-colors shadow-sm backdrop-blur-md group"
                      >
                        <div className="mt-1 shrink-0">
                          <Star className="text-amber-600 dark:text-amber-500 w-5 h-5 fill-amber-500/20 group-hover:fill-amber-500/50 transition-colors" />
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 font-bold leading-relaxed text-sm md:text-base">
                          {q}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-16 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-24 h-24 bg-slate-900/5 dark:bg-white/5 rounded-[2rem] flex items-center justify-center border border-slate-900/10 dark:border-white/10 shadow-lg">
                  <AlertCircle className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  তথ্য পাওয়া যায়নি
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm font-medium">
                  এই অধ্যায়ের বোর্ড প্রশ্ন বিশ্লেষণ খুব শিগগিরই যুক্ত করা হবে। অন্য অধ্যায় চেক করুন।
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
