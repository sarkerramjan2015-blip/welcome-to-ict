import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface ProgressTrackerProps {
  current: number;
  total: number;
  title?: string;
}

export default function ProgressTracker({ current, total }: ProgressTrackerProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-full py-2 px-4 mb-8 w-fit shadow-sm group"
    >
      <div className="flex items-center gap-1.5">
        <CheckCircle2 className="text-indigo-400 w-4 h-4" />
        <span className="text-xs font-medium text-slate-400 tracking-wide">
          <span className="text-white font-bold">{current}</span> / {total}
        </span>
      </div>
      
      <div className="w-20 sm:w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, type: "spring", bounce: 0 }}
          className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)]"
        />
      </div>
      
      <span className="text-xs font-black text-indigo-300">{percentage}%</span>
    </motion.div>
  );
}
