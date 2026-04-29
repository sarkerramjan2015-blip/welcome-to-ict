import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface ProgressTrackerProps {
  current: number;
  total: number;
  title?: string;
}

export default function ProgressTracker({ current, total, title = "Your Progress" }: ProgressTrackerProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.2)] relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-transparent pointer-events-none"></div>
      
      {/* Animated subtle glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 rounded-3xl -z-10"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-950/50 border border-white/10 flex items-center justify-center shadow-inner relative overflow-hidden">
             <div className="absolute inset-0 bg-emerald-500/10"></div>
            <CheckCircle2 className="text-emerald-400 w-6 h-6 relative z-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
            <p className="text-sm text-slate-300 font-medium mt-1">
              {current} of {total} completed
            </p>
          </div>
        </div>
        <div className="text-left md:text-right flex items-end gap-2 md:block">
          <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="relative h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-white/10 shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
        >
          {/* Inner highlight for 3D effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
          {/* Glowing dot at the end */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(52,211,153,1)] scale-[0.6]"></div>
        </motion.div>
      </div>
    </motion.div>
  );
}
