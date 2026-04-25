import React from 'react';
import { Topic } from '../../data/ict-syllabus';
import { motion } from 'motion/react';
import { BarChart3, Building2, Code2, Database, KeyRound, Layers3, Network, PlayCircle, ShieldCheck } from 'lucide-react';

interface TopicViewProps {
  topic: Topic;
  onTakeQuiz: () => void;
}

const topicVisuals = [
  { match: ['ডেটাবেজ', 'উপাত্ত', 'তথ্য'], Icon: Database, label: 'Structured data map' },
  { match: ['DBMS', 'RDBMS', 'DBA'], Icon: Layers3, label: 'Management layer' },
  { match: ['টাইপ', 'টেবিল'], Icon: Database, label: 'Table design system' },
  { match: ['কুয়েরি', 'SQL'], Icon: Code2, label: 'Query engine' },
  { match: ['সর্টিং', 'ইনডেক্সিং'], Icon: BarChart3, label: 'Fast lookup index' },
  { match: ['মডেল', 'কী', 'রিলেশন'], Icon: KeyRound, label: 'Relational key map' },
  { match: ['কর্পোরেট', 'সরকারি'], Icon: Building2, label: 'Institutional database' },
  { match: ['সিকিউরিটি', 'এনক্রিপশন'], Icon: ShieldCheck, label: 'Secure data vault' },
];

function TopicAnimatedVisual({ topic }: { topic: Topic }) {
  const visual = topicVisuals.find(item => item.match.some(key => topic.title.includes(key))) || {
    Icon: Network,
    label: 'Interactive ICT lesson',
  };
  const Icon = visual.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6 md:mb-8 overflow-hidden rounded-[2rem] border border-white/60 dark:border-white/10 bg-slate-950 text-white shadow-2xl"
    >
      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_280px] gap-0 min-h-48">
        <div className="relative z-10 p-5 md:p-8 flex flex-col justify-center">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300 mb-3">Topic Visual</span>
          <h2 className="text-2xl md:text-3xl font-black leading-tight break-words">{topic.title}</h2>
          <p className="mt-3 text-sm md:text-base text-slate-300 leading-7 max-w-2xl">{visual.label}</p>
        </div>
        <div className="relative min-h-44 md:min-h-full topic-visual-scan bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(16,185,129,0.22))] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 320 220" fill="none" aria-hidden="true">
            <path d="M40 40h70v44H40zM206 38h72v46h-72zM72 140h74v46H72zM212 136h58v40h-58z" stroke="currentColor" strokeWidth="2" />
            <path d="M110 62h96M242 84v52M146 163h66M75 84v56" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8">
              <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="3s" repeatCount="indefinite" />
            </path>
          </svg>
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-[2rem] bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl">
            <div className="absolute inset-3 rounded-[1.5rem] border border-emerald-300/40" style={{ animation: 'topic-orbit 6s linear infinite' }}></div>
            <Icon className="w-14 h-14 md:w-16 md:h-16 text-emerald-200" strokeWidth={1.7} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TopicView({ topic, onTakeQuiz }: TopicViewProps) {
  return (
    <div className="relative w-full pb-32">
      <TopicAnimatedVisual topic={topic} />

      {/* Glassmorphic Notes Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.4)] rounded-[1.75rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-10 lg:p-14 overflow-hidden"
      >
        <div 
          className="topic-notes prose prose-sm md:prose-lg prose-slate dark:prose-invert max-w-none prose-headings:text-teal-800 dark:prose-headings:text-teal-400 prose-a:text-emerald-600 hover:prose-a:text-emerald-500 prose-img:rounded-2xl prose-img:shadow-xl"
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
        <div className="pointer-events-auto flex items-center justify-between gap-3 md:gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl px-3 py-3 md:px-6 md:py-4 rounded-full border border-white/50 dark:border-slate-700 shadow-[0_20px_40px_-15px_rgba(13,148,136,0.3)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] max-w-2xl w-full">
          <div className="hidden sm:block pl-2">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Knowledge Check</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Evaluate your understanding</p>
          </div>
          <button 
            onClick={onTakeQuiz}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white px-5 md:px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 text-sm md:text-base"
          >
            <PlayCircle size={20} />
            <span>Take Quick Quiz</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
