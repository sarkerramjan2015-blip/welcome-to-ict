import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, Check, Crown, Headphones, ShieldCheck, Trophy, X, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PaymentGateway from './PaymentGateway';

export type PremiumPlan = 'monthly' | 'yearly';

interface PremiumSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  onUpgrade: (plan: PremiumPlan) => Promise<void> | void;
}

const plans = [
  {
    id: 'monthly' as const,
    name: 'Monthly',
    price: 75,
    caption: 'Perfect for focused exam months',
  },
  {
    id: 'yearly' as const,
    name: 'Yearly',
    price: 500,
    caption: 'Best value for serious toppers',
    badge: 'Save 400 BDT',
  },
];

function PaymentMark({ type }: { type: 'bkash' | 'nagad' }) {
  const isBkash = type === 'bkash';
  return (
    <div className={`flex items-center gap-2 rounded-2xl border px-3 py-2 ${isBkash ? 'border-pink-300/20 bg-pink-500/10 text-pink-100' : 'border-orange-300/20 bg-orange-500/10 text-orange-100'}`}>
      <div className={`flex size-8 items-center justify-center rounded-xl font-black ${isBkash ? 'bg-pink-500 text-white' : 'bg-orange-500 text-white'}`}>
        {isBkash ? 'bK' : 'N'}
      </div>
      <span className="text-sm font-black">{isBkash ? 'bKash' : 'Nagad'}</span>
    </div>
  );
}

export default function PremiumSubscriptionModal({ open, onClose }: PremiumSubscriptionModalProps) {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PremiumPlan>('yearly');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const selectedPlanInfo = plans.find(plan => plan.id === selectedPlan) ?? plans[1];

  const handleClose = () => {
    setShowPaymentForm(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.24 }}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[1.7rem] border border-red-400/20 bg-[#050505] p-4 text-white shadow-[0_40px_140px_rgba(0,0,0,0.75)] sm:p-6"
          >
            <div className="absolute inset-0 rounded-[1.7rem] bg-[radial-gradient(circle_at_16%_8%,rgba(239,68,68,0.22),transparent_28%),radial-gradient(circle_at_90%_18%,rgba(20,184,166,0.14),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_36%)]" />
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white"
              aria-label="Close premium subscription modal"
            >
              <X className="size-5" />
            </button>

            {showPaymentForm ? (
              <div className="relative z-10">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="mb-4 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-white transition hover:bg-white/15"
                >
                  <ArrowLeft className="size-4" />
                  Change Plan
                </button>
                <PaymentGateway
                  courseId={`premium-${selectedPlanInfo.id}`}
                  courseTitle={`ICT Toppers Premium - ${selectedPlanInfo.name}`}
                  amount={selectedPlanInfo.price}
                  paymentType="premium"
                  title="Premium Payment"
                  eyebrow="ICT Toppers Premium"
                  instructionText="Send Money using bKash or Nagad, then submit your sender number, TrxID, and screenshot. After review, your Premium access will be activated."
                  submitButtonLabel="Submit Premium Payment"
                  successTitle="Premium Payment Submitted"
                  successMessage="আপনার প্রিমিয়াম পেমেন্ট সফলভাবে সাবমিট হয়েছে! আমরা এটি রিভিউ করছি। অনুমোদনের পর আপনার প্রিমিয়াম অ্যাক্সেস চালু হবে।"
                  onSubmitted={(paymentId) => {
                    localStorage.setItem(
                      'ict-toppers:premium-payment-pending',
                      JSON.stringify({
                        paymentId,
                        plan: selectedPlanInfo.id,
                        submittedAt: new Date().toISOString(),
                      })
                    );
                    window.setTimeout(() => {
                      handleClose();
                      navigate('/dashboard');
                    }, 1400);
                  }}
                />
              </div>
            ) : (
            <div className="relative z-10 grid gap-6 md:grid-cols-[0.92fr_1.08fr]">
              <div className="flex flex-col justify-between rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-5">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-500/10 px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.22em] text-red-100">
                    <Crown className="size-4" />
                    ICT Toppers Premium
                  </div>
                  <h2 className="text-3xl font-black leading-tight sm:text-4xl">
                    Study clean. Score higher.
                  </h2>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
                    Remove distractions, unlock free monthly Mega Exams, and get priority support when your ICT preparation needs momentum.
                  </p>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    { icon: ShieldCheck, text: 'Ad-free experience' },
                    { icon: Trophy, text: 'Free Monthly Mega Exams' },
                    { icon: Headphones, text: 'Premium Support' },
                  ].map(perk => {
                    const Icon = perk.icon;
                    return (
                      <div key={perk.text} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-3">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-red-500/12 text-red-100">
                          <Icon className="size-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-100">{perk.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-white/10 bg-black/35 p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <PaymentMark type="bkash" />
                  <PaymentMark type="nagad" />
                </div>

                <div className="grid gap-3">
                  {plans.map(plan => {
                    const active = selectedPlan === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${active ? 'border-red-300/45 bg-red-500/10 shadow-2xl shadow-red-950/30' : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]'}`}
                      >
                        {plan.badge && (
                          <span className="absolute right-3 top-3 rounded-full bg-emerald-400 px-3 py-1 text-[0.64rem] font-black uppercase tracking-[0.14em] text-slate-950">
                            {plan.badge}
                          </span>
                        )}
                        <div className="flex items-center gap-3">
                          <div className={`flex size-8 items-center justify-center rounded-full border ${active ? 'border-red-200 bg-red-500 text-white' : 'border-white/15 bg-white/5 text-white/60'}`}>
                            {active && <Check className="size-4" />}
                          </div>
                          <div>
                            <h3 className="text-lg font-black">{plan.name}</h3>
                            <p className="text-xs font-medium text-slate-400">{plan.caption}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-end gap-2">
                          <span className="text-4xl font-black">{plan.price}</span>
                          <span className="pb-1 text-sm font-bold text-slate-400">BDT</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setShowPaymentForm(true)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-4 text-sm font-black text-white shadow-2xl shadow-red-950/35 transition hover:-translate-y-0.5 hover:bg-red-500 disabled:opacity-60"
                >
                  Continue with bKash/Nagad
                  <Zap className="size-4" />
                </button>
                <p className="mt-3 text-center text-xs font-medium text-slate-500">
                  Manual verification keeps Premium activation clean and secure.
                </p>
              </div>
            </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
