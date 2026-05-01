import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertTriangle, ArrowLeft, CreditCard, XCircle } from 'lucide-react';

export default function PaymentStatusPage({ type }: { type: 'cancel' | 'fail' }) {
  const isCancel = type === 'cancel';

  return (
    <div className="flex-1 flex items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 backdrop-blur-2xl p-6 sm:p-8 text-center shadow-2xl shadow-black/10"
      >
        <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl ${
          isCancel ? 'bg-amber-500/15 text-amber-400' : 'bg-rose-500/15 text-rose-400'
        }`}>
          {isCancel ? <AlertTriangle className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
        </div>

        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-sky-400">UddoktaPay Checkout</p>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {isCancel ? 'Payment Canceled' : 'Payment Failed'}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-7 text-slate-600 dark:text-slate-300">
          {isCancel
            ? 'Your checkout was canceled before payment was completed. No enrollment was created.'
            : 'The payment could not be completed or verified. Please try again from the courses page.'}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 font-black text-white shadow-lg shadow-sky-500/20 transition-colors hover:bg-sky-400"
          >
            <CreditCard size={18} /> Try Again
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-slate-900/5 px-6 py-3 font-black text-slate-700 transition-colors hover:bg-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <ArrowLeft size={18} /> Back Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
