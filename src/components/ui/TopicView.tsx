import React from 'react';
import { Topic } from '../../data/ict-syllabus';
import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';

interface TopicViewProps {
  topic: Topic;
  onTakeQuiz: () => void;
}

export default function TopicView({ topic, onTakeQuiz }: TopicViewProps) {
  return (
    <div className="relative w-full pb-32">
      {/* Glassmorphic Notes Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.4)] rounded-[2.5rem] p-8 md:p-12 lg:p-16"
      >
        <div 
          className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:text-teal-800 dark:prose-headings:text-teal-400 prose-a:text-emerald-600 hover:prose-a:text-emerald-500 prose-img:rounded-2xl prose-img:shadow-xl"
          dangerouslySetInnerHTML={{ __html: topic.board_notes }}
        />
      </motion.div>

      {/* Sticky Bottom Floating Bar (Apple CTA Style) */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <div className="pointer-events-auto flex items-center justify-between gap-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl px-3 py-3 md:px-6 md:py-4 rounded-full border border-white/50 dark:border-slate-700 shadow-[0_20px_40px_-15px_rgba(13,148,136,0.3)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] max-w-2xl w-full">
          <div className="hidden sm:block pl-2">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Knowledge Check</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Evaluate your understanding</p>
          </div>
          <button 
            onClick={onTakeQuiz}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <PlayCircle size={20} />
            <span>Take Quick Quiz</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
