import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, X } from 'lucide-react';

export default function ComingSoonToast({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/20 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl max-w-md w-full relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center text-sky-500 mb-2">
                <Info size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                দুঃখিত!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                পেমেন্ট সিস্টেমটি বর্তমানে ডেভেলপমেন্ট মোডে আছে। শীঘ্রই এই ফিচারটি চালু করা হবে। আমাদের সাথেই থাকুন!
              </p>
              
              <button 
                onClick={onClose}
                className="mt-6 w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-sky-500/25 transition-all active:scale-95"
              >
                ঠিক আছে
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
