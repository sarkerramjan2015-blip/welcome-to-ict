import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, ReceiptText } from 'lucide-react';
import { verifyCoursePayment, type VerifyCoursePaymentResult } from '../actions/paymentAction';
import { useAuth } from '../context/AuthContext';
import { useLms } from '../context/LmsContext';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const { user, authReady } = useAuth();
  const { enrollCourse } = useLms();
  const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your payment with UddoktaPay...');
  const [result, setResult] = useState<VerifyCoursePaymentResult | null>(null);
  const hasVerifiedRef = useRef(false);

  const invoiceId = useMemo(
    () => searchParams.get('invoice_id') || searchParams.get('invoiceId') || '',
    [searchParams]
  );

  useEffect(() => {
    if (!authReady || hasVerifiedRef.current) return;

    if (!invoiceId) {
      setStatus('error');
      setMessage('Missing invoice_id. Please contact support if your payment was completed.');
      return;
    }

    hasVerifiedRef.current = true;

    const verify = async () => {
      try {
        const verified = await verifyCoursePayment(invoiceId);
        setResult(verified);

        if (!verified.enrolled) {
          setStatus('pending');
          setMessage(verified.message || 'Payment is not completed yet. Enrollment will remain pending.');
          return;
        }

        if (verified.enrollment && user) {
          enrollCourse(
            verified.enrollment.courseId,
            Number(verified.enrollment.amount || 0),
            verified.enrollment.courseType
          );
        }

        setStatus('success');
        setMessage('Payment verified. Your course enrollment is active.');
      } catch (error: any) {
        console.error('Payment verification failed:', error);
        setStatus('error');
        setMessage(error?.message || 'Payment verification failed. Please contact support.');
      }
    };

    void verify();
  }, [authReady, enrollCourse, invoiceId, user]);

  const isSuccess = status === 'success';
  const isPending = status === 'pending';
  const isError = status === 'error';
  const courseTitle = result?.enrollment?.courseTitle || result?.payment?.metadata?.courseTitle || 'ICT Course';

  return (
    <div className="flex-1 flex items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 backdrop-blur-2xl p-6 sm:p-8 text-center shadow-2xl shadow-black/10"
      >
        <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl ${
          isSuccess
            ? 'bg-emerald-500/15 text-emerald-400'
            : isPending
              ? 'bg-amber-500/15 text-amber-400'
              : isError
                ? 'bg-rose-500/15 text-rose-400'
                : 'bg-sky-500/15 text-sky-400'
        }`}>
          {status === 'loading' && <Loader2 className="h-10 w-10 animate-spin" />}
          {isSuccess && <CheckCircle2 className="h-10 w-10" />}
          {isPending && <ReceiptText className="h-10 w-10" />}
          {isError && <AlertCircle className="h-10 w-10" />}
        </div>

        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-sky-400">UddoktaPay Checkout</p>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {isSuccess ? 'Enrollment Confirmed' : isPending ? 'Payment Pending' : isError ? 'Verification Failed' : 'Verifying Payment'}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-7 text-slate-600 dark:text-slate-300">
          {message}
        </p>

        <div className="mt-8 rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/60 dark:bg-slate-950/40 p-5 text-left">
          <div className="grid gap-4 sm:grid-cols-2">
            <Detail label="Invoice ID" value={invoiceId || 'Unavailable'} />
            <Detail label="Payment Status" value={result?.payment?.status || (status === 'loading' ? 'Checking' : 'Unknown')} />
            <Detail label="Course" value={courseTitle} />
            <Detail label="Amount" value={result?.payment?.amount ? `Tk ${result.payment.amount}` : 'Checking'} />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 font-black text-white shadow-lg shadow-sky-500/20 transition-colors hover:bg-sky-400"
          >
            Go to Dashboard <ArrowRight size={18} />
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-900/10 bg-slate-900/5 px-6 py-3 font-black text-slate-700 transition-colors hover:bg-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            Back to Courses
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-bold text-slate-800 dark:text-slate-100">{value}</p>
    </div>
  );
}
