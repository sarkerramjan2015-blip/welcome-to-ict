import React, { useId, useMemo, useState } from 'react';
import {
  BadgeCheck,
  CheckCircle2,
  Clipboard,
  CreditCard,
  FileImage,
  Loader2,
  ReceiptText,
  Send,
  ShieldCheck,
  Smartphone,
  Upload,
  WalletCards,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { type ManualPaymentMethod, submitManualPayment } from '../services/manualPayment';

interface PaymentGatewayProps {
  courseId: string;
  courseTitle?: string;
  amount?: number;
  paymentType?: 'premium' | 'quiz' | 'course';
  className?: string;
  title?: string;
  eyebrow?: string;
  instructionText?: string;
  pendingLabel?: string;
  submitButtonLabel?: string;
  successTitle?: string;
  successMessage?: string;
  onSubmitted?: (paymentId: string) => void;
}

type FormErrors = Partial<Record<'senderNumber' | 'trxId' | 'screenshot' | 'root', string>>;

const MAX_SCREENSHOT_SIZE = 15 * 1024 * 1024;

const paymentAccounts: Array<{
  method: ManualPaymentMethod;
  number: string;
  label: string;
  accent: string;
}> = [
  {
    method: 'bKash',
    number: '01777408383',
    label: 'bKash Personal',
    accent: 'from-pink-500 to-rose-500 text-pink-100 border-pink-300/20 bg-pink-500/10',
  },
  {
    method: 'Nagad',
    number: '01518657869',
    label: 'Nagad Personal',
    accent: 'from-orange-500 to-amber-500 text-orange-100 border-orange-300/20 bg-orange-500/10',
  },
];

const getErrorMessage = (error: unknown) => {
  const code = typeof error === 'object' && error && 'code' in error
    ? String((error as { code?: unknown }).code)
    : '';

  if (code === 'storage/unauthorized') {
    return 'Screenshot upload permission is blocked. Please check Firebase Storage rules for payment_screenshots.';
  }

  if (code === 'permission-denied') {
    return 'Payment save permission is blocked. Please check Firestore rules for the payments collection.';
  }

  return error instanceof Error ? error.message : 'Payment submission failed. Please try again.';
};

export default function PaymentGateway({
  courseId,
  courseTitle,
  amount,
  paymentType,
  className = '',
  title = 'Payment Gateway',
  eyebrow = 'Manual Payment',
  instructionText = 'Send Money to your preferred personal number below, then submit the sender number, TrxID, and payment screenshot for manual verification.',
  pendingLabel = 'Pending Review',
  submitButtonLabel = 'Submit for Verification',
  successTitle = 'Payment Submitted',
  successMessage = 'আপনার পেমেন্ট সফলভাবে সাবমিট হয়েছে! আমরা এটি রিভিউ করছি। কিছুক্ষণের মধ্যেই ড্যাশবোর্ডে কোর্স অ্যাক্সেস পেয়ে যাবেন।',
  onSubmitted,
}: PaymentGatewayProps) {
  const { user } = useAuth();
  const [method, setMethod] = useState<ManualPaymentMethod>('bKash');
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submittedPaymentId, setSubmittedPaymentId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState('');
  const screenshotInputId = useId();

  const selectedAccount = useMemo(
    () => paymentAccounts.find(account => account.method === method) ?? paymentAccounts[0],
    [method]
  );

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    const cleanSenderNumber = senderNumber.trim();
    const cleanTrxId = trxId.trim();

    if (!/^01\d{9}$/.test(cleanSenderNumber)) {
      nextErrors.senderNumber = 'Enter a valid 11-digit sender number.';
    }

    if (!cleanTrxId) {
      nextErrors.trxId = 'Transaction ID is required.';
    }

    if (!screenshot) {
      nextErrors.screenshot = 'Upload the payment screenshot.';
    } else if (!screenshot.type.startsWith('image/')) {
      nextErrors.screenshot = 'Only image files are accepted.';
    } else if (screenshot.size > MAX_SCREENSHOT_SIZE) {
      nextErrors.screenshot = 'Screenshot must be under 15MB.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleScreenshotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setUploadProgress(0);

    if (file && !file.type.startsWith('image/')) {
      setScreenshot(null);
      setErrors(prev => ({ ...prev, screenshot: 'Only image files are accepted.', root: undefined }));
      return;
    }

    if (file && file.size > MAX_SCREENSHOT_SIZE) {
      setScreenshot(null);
      setErrors(prev => ({ ...prev, screenshot: 'Screenshot must be under 15MB.', root: undefined }));
      return;
    }

    setScreenshot(file);
    setErrors(prev => ({ ...prev, screenshot: undefined, root: undefined }));
  };

  const copyNumber = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(number);
      window.setTimeout(() => setCopiedNumber(''), 1600);
    } catch {
      setCopiedNumber('');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors(prev => ({ ...prev, root: undefined }));

    if (!user) {
      setErrors(prev => ({ ...prev, root: 'Please login before submitting your payment.' }));
      return;
    }

    const isValid = validateForm();
    if (!isValid || !screenshot) {
      setErrors(prev => ({
        ...prev,
        root: prev.root || 'Please fill the required fields and upload a valid screenshot.',
      }));
      return;
    }

    setSubmitting(true);
    setUploadProgress(2);
    setSubmitStatus('Starting payment submission...');

    try {
      const result = await submitManualPayment({
        userId: user.id,
        courseId,
        courseTitle,
        amount,
        paymentType,
        method,
        senderNumber,
        trxId,
        screenshotFile: screenshot,
        onProgress: setUploadProgress,
        onStatus: setSubmitStatus,
      });

      setSubmittedPaymentId(result.paymentId);
      onSubmitted?.(result.paymentId);
    } catch (error) {
      setErrors(prev => ({ ...prev, root: getErrorMessage(error) }));
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
      setSubmitStatus('');
    }
  };

  if (submittedPaymentId) {
    return (
      <section className={`relative overflow-hidden rounded-[1.75rem] border border-emerald-300/20 bg-slate-950/95 p-6 text-white shadow-2xl shadow-emerald-950/30 sm:p-8 ${className}`}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400" />
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-300/25 bg-emerald-400/15 text-emerald-200 shadow-2xl shadow-emerald-950/40">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-100">
            <ShieldCheck className="h-4 w-4" />
            {pendingLabel}
          </div>
          <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl">
            {successTitle}
          </h2>
          <p className="mt-4 max-w-xl text-base font-semibold leading-8 text-slate-200">
            {successMessage}
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-300">
            Reference ID: <span className="text-cyan-200">{submittedPaymentId}</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/95 p-4 text-white shadow-2xl shadow-slate-950/60 sm:p-6 lg:p-8 ${className}`}>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-cyan-300 to-amber-400" />

      <div className="relative grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/12 text-cyan-200">
              <WalletCards className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">{eyebrow}</p>
              <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl">{title}</h2>
            </div>
          </div>

          {courseTitle && (
            <div className="mb-4 rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Selected Course</p>
              <p className="mt-1 text-lg font-black text-white">{courseTitle}</p>
              {typeof amount === 'number' && (
                <p className="mt-2 text-3xl font-black text-amber-200">BDT {amount.toLocaleString('en-US')}</p>
              )}
            </div>
          )}

          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-black text-cyan-100">
              <Send className="h-4 w-4" />
              Send Money First
            </div>
            <p className="text-sm font-medium leading-7 text-slate-300">
              {instructionText}
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            {paymentAccounts.map(account => (
              <div
                key={account.method}
                className={`rounded-2xl border p-4 ${account.accent}`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${account.accent.split(' ').slice(0, 2).join(' ')} text-sm font-black text-white`}>
                      {account.method === 'bKash' ? 'bK' : 'N'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.16em] opacity-80">{account.label}</p>
                      <p className="font-mono text-xl font-black tracking-wide text-white">{account.number}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyNumber(account.number)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-xs font-black text-white transition hover:bg-black/40"
                  >
                    <Clipboard className="h-4 w-4" />
                    {copiedNumber === account.number ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-white/10 bg-black/30 p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Verification Form</p>
              <h3 className="mt-1 text-xl font-black text-white">Submit Payment Info</h3>
            </div>
            <div className="hidden rounded-2xl border border-amber-300/20 bg-amber-400/10 px-3 py-2 text-xs font-black text-amber-100 sm:block">
              Status: Pending
            </div>
          </div>

          {errors.root && (
            <div className="mb-5 rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm font-bold text-rose-200">
              {errors.root}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="mb-3 block text-sm font-bold text-slate-200">Payment Method</label>
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Payment method">
                {paymentAccounts.map(account => {
                  const active = method === account.method;
                  return (
                    <button
                      key={account.method}
                      type="button"
                      onClick={() => setMethod(account.method)}
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                        active
                          ? 'border-cyan-200/50 bg-cyan-300/12 text-white shadow-lg shadow-cyan-950/30'
                          : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/[0.07]'
                      }`}
                      role="radio"
                      aria-checked={active}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <CreditCard className="h-4 w-4 shrink-0" />
                        <span className="truncate text-sm font-black">{account.method}</span>
                      </span>
                      {active && <BadgeCheck className="h-5 w-5 shrink-0 text-cyan-200" />}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-500">
                Selected receiving number: <span className="font-mono text-slate-300">{selectedAccount.number}</span>
              </p>
            </div>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-200">
                <Smartphone className="h-4 w-4 text-cyan-200" />
                Sender Number
              </span>
              <input
                type="tel"
                inputMode="numeric"
                value={senderNumber}
                onChange={event => {
                  setSenderNumber(event.target.value.replace(/\D/g, '').slice(0, 11));
                  setErrors(prev => ({ ...prev, senderNumber: undefined, root: undefined }));
                }}
                placeholder="01XXXXXXXXX"
                maxLength={11}
                aria-invalid={Boolean(errors.senderNumber)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-400/10"
              />
              {errors.senderNumber && <p className="mt-2 text-xs font-bold text-rose-300">{errors.senderNumber}</p>}
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-200">
                <ReceiptText className="h-4 w-4 text-amber-200" />
                Transaction ID (TrxID)
              </span>
              <input
                type="text"
                value={trxId}
                onChange={event => {
                  setTrxId(event.target.value.trimStart());
                  setErrors(prev => ({ ...prev, trxId: undefined, root: undefined }));
                }}
                placeholder="Enter transaction ID"
                aria-invalid={Boolean(errors.trxId)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-amber-300/70 focus:ring-4 focus:ring-amber-400/10"
              />
              {errors.trxId && <p className="mt-2 text-xs font-bold text-rose-300">{errors.trxId}</p>}
            </label>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-200">
                <FileImage className="h-4 w-4 text-emerald-200" />
                Payment Screenshot
              </div>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/*"
                onChange={handleScreenshotChange}
                aria-invalid={Boolean(errors.screenshot)}
                className="sr-only"
                id={screenshotInputId}
                disabled={submitting}
              />
              <label
                htmlFor={screenshotInputId}
                className={`block cursor-pointer rounded-2xl border border-dashed p-4 transition ${
                  screenshot
                    ? 'border-emerald-300/40 bg-emerald-400/10'
                    : 'border-white/15 bg-slate-950/55 hover:border-emerald-200/45 hover:bg-slate-950/80'
                } ${submitting ? 'pointer-events-none opacity-70' : ''}`}
              >
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200">
                    {screenshot ? <CheckCircle2 className="h-6 w-6" /> : <Upload className="h-6 w-6" />}
                  </div>
                  <div className="min-w-0">
                    <div className="break-all text-sm font-black text-white">
                      {screenshot ? screenshot.name : 'Upload screenshot image'}
                    </div>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {screenshot
                        ? `${(screenshot.size / 1024 / 1024).toFixed(2)}MB selected. Click here to change.`
                        : 'PNG, JPG, WEBP up to 15MB. Large screenshots will be compressed before upload.'}
                    </p>
                  </div>
                </div>
              </label>
              {errors.screenshot && <p className="mt-2 text-xs font-bold text-rose-300">{errors.screenshot}</p>}
              {submitting && uploadProgress > 0 && (
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>{submitStatus || 'Uploading screenshot'}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 transition-[width] duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-5 py-4 text-sm font-black text-white shadow-2xl shadow-sky-950/35 transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
              {submitting ? (submitStatus || 'Uploading & Saving...') : submitButtonLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
