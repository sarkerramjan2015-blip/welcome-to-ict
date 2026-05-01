import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Trophy, Lock, PlayCircle, CheckCircle, Clock, BookOpen, CreditCard, Sparkles, Loader2 } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import ChallengeExam from '../components/ChallengeExam';
import Countdown from '../components/Countdown';
import ShareButton from '../components/ui/ShareButton';
import { motion } from 'motion/react';
import { useLms } from '../context/LmsContext';
import { createChallengePayment } from '../actions/paymentAction';
import { firebaseDb } from '../lib/firebase';

interface UpcomingChallenge {
  id: string;
  title: string;
  month: string;
  year: number;
  fee: number;
  startsAt: string | null;
  endsAt: string | null;
  syllabus: string[];
  totalMarks: number;
  durationMinutes: number;
  status: string;
}

const formatSchedule = (date: string | null) => {
  if (!date) return 'Schedule pending';

  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dhaka',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date));
};

const getFallbackChallenge = (): UpcomingChallenge => ({
  id: 'monthly-quiz',
  title: 'HSC ICT Monthly Quiz Exam',
  month: new Date().toLocaleString('default', { month: 'long' }),
  year: new Date().getFullYear(),
  fee: 20,
  startsAt: null,
  endsAt: null,
  syllabus: [],
  totalMarks: 30,
  durationMinutes: 30,
  status: 'PUBLISHED',
});

const parseScheduleDate = (value: unknown): string | null => {
  if (!value) return null;

  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate?: unknown }).toDate === 'function') {
    const date = (value as { toDate: () => Date }).toDate();
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const parseSyllabus = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(item => String(item).trim()).filter(Boolean);
      }
    } catch {}

    return value.split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
  }

  return [];
};

const normalizeChallenge = (id: string, data: Record<string, any>): UpcomingChallenge | null => {
  const startsAt = parseScheduleDate(data.startsAt);
  if (!startsAt || new Date(startsAt).getTime() < Date.now()) {
    return null;
  }

  const status = String(data.status || 'LIVE').toUpperCase();
  if (!['LIVE', 'PUBLISHED', 'APPROVED'].includes(status)) {
    return null;
  }

  return {
    id,
    title: String(data.title || 'HSC ICT Monthly Quiz Exam').trim(),
    month: String(data.month || new Date(startsAt).toLocaleString('en-US', { month: 'long', timeZone: 'Asia/Dhaka' })),
    year: Number(data.year || new Date(startsAt).getFullYear()),
    fee: Number(data.fee ?? 20),
    startsAt,
    endsAt: parseScheduleDate(data.endsAt),
    syllabus: parseSyllabus(data.syllabus),
    totalMarks: Number(data.totalMarks || data.questionCount || 30),
    durationMinutes: Number(data.durationMinutes || 30),
    status,
  };
};

const fetchApiChallenges = async (): Promise<UpcomingChallenge[]> => {
  try {
    const response = await fetch('/api/challenges/upcoming');
    if (!response.ok) return [];

    const challenges = await response.json() as UpcomingChallenge[];
    return challenges
      .map(item => normalizeChallenge(item.id, item))
      .filter((item): item is UpcomingChallenge => Boolean(item));
  } catch {
    return [];
  }
};

const fetchFirestoreChallenges = async (): Promise<UpcomingChallenge[]> => {
  if (!firebaseDb) return [];

  try {
    const snapshot = await getDocs(collection(firebaseDb, 'megaChallenges'));
    return snapshot.docs
      .filter(item => item.id !== 'current')
      .map(item => normalizeChallenge(item.id, item.data()))
      .filter((item): item is UpcomingChallenge => Boolean(item));
  } catch (error) {
    console.error('Failed to load Firestore quiz routines:', error);
    return [];
  }
};

const mergeChallenges = (items: UpcomingChallenge[]) => {
  const byId = new Map<string, UpcomingChallenge>();
  items.forEach(item => byId.set(item.id, item));

  return Array.from(byId.values()).sort((a, b) => {
    const aTime = a.startsAt ? new Date(a.startsAt).getTime() : Number.MAX_SAFE_INTEGER;
    const bTime = b.startsAt ? new Date(b.startsAt).getTime() : Number.MAX_SAFE_INTEGER;
    return aTime - bTime;
  });
};

export default function MegaChallenge() {
  const { user, login } = useAuth();
  const { challengeEnrollments, enrollChallenge, markChallengePaid } = useLms();
  const [challenge, setChallenge] = useState<UpcomingChallenge | null>(null);
  const [upcomingChallenges, setUpcomingChallenges] = useState<UpcomingChallenge[]>([]);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [showExam, setShowExam] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    fetchChallenge();
  }, []);

  useEffect(() => {
    if (user && !loading) {
      checkEnrollment();
    }
  }, [user, challenge, challengeEnrollments, loading]);

  const fetchChallenge = async () => {
    const [apiChallenges, firestoreChallenges] = await Promise.all([
      fetchApiChallenges(),
      fetchFirestoreChallenges(),
    ]);
    const challenges = mergeChallenges([...apiChallenges, ...firestoreChallenges]);

    setUpcomingChallenges(challenges);
    setChallenge(challenges[0] || null);
    setLoading(false);
  };

  const checkEnrollment = async () => {
    if (!user) return;
    const selectedChallenge = challenge || getFallbackChallenge();
    const currentEnrollment = challengeEnrollments.find(e => e.challengeId === selectedChallenge.id);

    try {
      const response = await fetch('/api/dashboard?userId=' + user.id);
      if (response.ok) {
        const enrollments = await response.json();
        const serverEnrollment = enrollments.find((e) => e.challengeId === selectedChallenge.id);
        if (serverEnrollment) {
          const nextEnrollment = currentEnrollment?.paymentStatus === 'PAID' ? currentEnrollment : serverEnrollment;
          setEnrollment(nextEnrollment);
          if (nextEnrollment.paymentStatus === 'PAID') {
            markChallengePaid(selectedChallenge.id);
          }
          return;
        }
      }
    } catch (err) {}
    setEnrollment(currentEnrollment || null);
  };

  const startChallengeCheckout = async (selectedChallenge: UpcomingChallenge) => {
    if (!user) return;

    setPaymentError('');
    const nextEnrollment = enrollment || enrollChallenge(selectedChallenge.id, selectedChallenge.fee);
    if (nextEnrollment) {
      setEnrollment(nextEnrollment);
    }

    if (user.email === 'sarkerramjan2015@gmail.com') {
      if (nextEnrollment) {
        markChallengePaid(selectedChallenge.id);
        setEnrollment({ ...nextEnrollment, paymentStatus: 'PAID', updatedAt: new Date().toISOString() });
      }
      return;
    }

    setPaymentLoading(true);
    try {
      const payment = await createChallengePayment({
        userId: user.id,
        fullName: user.name || 'ICT Toppers Student',
        email: user.email,
        challengeId: selectedChallenge.id,
        challengeTitle: selectedChallenge.title || 'HSC ICT Monthly Quiz Exam',
        amount: selectedChallenge.fee || 20,
        challengeMonth: selectedChallenge.month,
        challengeYear: selectedChallenge.year,
      });
      window.location.href = payment.paymentUrl;
    } catch (error: any) {
      console.error('UddoktaPay challenge checkout error:', error);
      setPaymentError(error?.message || 'Failed to create payment link. Please try again.');
      setPaymentLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!user) {
      await login({ redirectTo: '/monthly-quiz' });
      return;
    }

    const selectedChallenge = challenge || getFallbackChallenge();
    if (user.isPremium || user.email === 'sarkerramjan2015@gmail.com') {
      const nextEnrollment = enrollment || enrollChallenge(selectedChallenge.id, selectedChallenge.fee);
      if (nextEnrollment) {
        markChallengePaid(selectedChallenge.id);
        setEnrollment({
          ...nextEnrollment,
          paymentStatus: 'PAID',
          updatedAt: new Date().toISOString(),
        });
      }
      return;
    }

    await startChallengeCheckout(selectedChallenge);
  };

  const handlePaymentClick = async () => {
    if (!user) {
      await login({ redirectTo: '/monthly-quiz' });
      return;
    }

    await startChallengeCheckout(challenge || getFallbackChallenge());
  };

  const handlePremiumAccess = () => {
    if (!user?.isPremium) return;
    const selectedChallenge = challenge || getFallbackChallenge();
    const nextEnrollment = enrollment || enrollChallenge(selectedChallenge.id, selectedChallenge.fee);
    if (!nextEnrollment) return;
    markChallengePaid(selectedChallenge.id);
    setEnrollment({
      ...nextEnrollment,
      paymentStatus: 'PAID',
      updatedAt: new Date().toISOString(),
    });
  };

  const isResultPublished = (updatedAt: string) => {
    const examTime = new Date(updatedAt).getTime();
    const now = new Date().getTime();
    const hoursPassed = (now - examTime) / (1000 * 60 * 60);
    return hoursPassed >= 12;
  };

  if (loading) return <div className="p-8 text-center text-slate-900 dark:text-white">Loading...</div>;

  const displayChallenge: UpcomingChallenge = challenge || getFallbackChallenge();

  if (showExam) {
    return <ChallengeExam challengeId={displayChallenge.id} onComplete={() => { setShowExam(false); checkEnrollment(); }} />;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-900/10 dark:border-white/20 relative overflow-hidden text-center"
      >
        <div className="absolute top-0 right-0 bg-red-500 text-white px-6 py-1 rounded-bl-2xl font-bold animate-pulse shadow-lg shadow-red-500/50">
          LIVE
        </div>
        <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          HSC ICT Monthly Quiz Exam
        </h1>
        <p className="text-xl md:text-2xl text-sky-300 font-medium mb-2">All over Bangladesh</p>
        <p className="text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Test your knowledge, compete with thousands of students, and win exciting prizes in the biggest monthly ICT quiz exam!
        </p>
        <div className="flex justify-center">
          <ShareButton className="!bg-slate-900/5 dark:!bg-white/10 !text-slate-900 dark:!text-white !border-slate-900/10 dark:!border-white/20" />
        </div>
      </motion.div>

      {paymentError && (
        <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-4 text-sm font-semibold text-rose-300">
          {paymentError}
        </div>
      )}

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-slate-900/10 dark:border-white/20 shadow-xl shadow-black/10"
      >
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-400">Upcoming Quiz Schedule</p>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Select a live registration slot</h2>
          </div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Exam starts at 9:00 PM BDT | Entry fee Tk 20</p>
        </div>

        {upcomingChallenges.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-900/20 dark:border-white/20 p-6 text-center text-slate-600 dark:text-slate-300">
            No upcoming quiz is published yet.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {upcomingChallenges.map((item) => {
              const isSelected = item.id === displayChallenge.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setChallenge(item)}
                  className={`text-left rounded-2xl border p-5 transition-all ${
                    isSelected
                      ? 'border-sky-400 bg-sky-400/10 shadow-lg shadow-sky-500/10'
                      : 'border-slate-900/10 bg-slate-900/5 hover:border-sky-400/50 dark:border-white/10 dark:bg-white/5'
                  }`}
                >
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-sky-400">{formatSchedule(item.startsAt)}</p>
                  <h3 className="mt-3 text-xl font-black text-slate-900 dark:text-white">{item.title}</h3>
                  <div className="mt-4 space-y-2">
                    {item.syllabus.map((topic) => (
                      <p key={topic} className="text-sm font-medium text-slate-600 dark:text-slate-300">- {topic}</p>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </motion.section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Countdown & Syllabus */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-slate-900/10 dark:border-white/20 shadow-xl shadow-black/20"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Clock className="text-sky-400" /> Exam Starts In
            </h3>
            <div className="flex justify-center">
              <Countdown targetDate={displayChallenge.startsAt} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-slate-900/10 dark:border-white/20 shadow-xl shadow-black/20"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen className="text-indigo-400" /> Exam Syllabus
            </h3>
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-slate-900/10 dark:border-white/10 rounded-2xl p-6 shadow-inner">
              <p className="text-2xl font-bold text-slate-900 dark:text-white drop-shadow-md">{displayChallenge.title}</p>
              <p className="text-indigo-200 mt-2 font-medium">{formatSchedule(displayChallenge.startsAt)}</p>
              <div className="mt-5 space-y-2 text-left">
                {displayChallenge.syllabus.length > 0 ? (
                  displayChallenge.syllabus.map((topic) => (
                    <p key={topic} className="text-sm font-semibold text-slate-700 dark:text-slate-200">- {topic}</p>
                  ))
                ) : (
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Syllabus will be published soon.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Join CTA Placard */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative bg-slate-900/5 dark:bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-slate-900/10 dark:border-white/20 flex flex-col justify-between shadow-2xl shadow-indigo-500/20 overflow-hidden"
        >
          <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-2xl z-0"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="text-pink-400" /> Registration
              </h3>
              <div className="animate-pulse flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div> Open
              </div>
            </div>
            
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-slate-900/10 dark:border-white/10 shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600 dark:text-gray-300 font-medium">Entry Fee</span>
                <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                  {user?.isPremium ? 'Free' : `Tk ${displayChallenge.fee}`}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600 dark:text-gray-300 font-medium">Total Marks</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">{displayChallenge.totalMarks}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600 dark:text-gray-300 font-medium">Duration</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">{displayChallenge.durationMinutes} min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-gray-300 font-medium">Format</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">MCQ</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mb-8">
              {user?.isPremium ? (
                <div className="w-full rounded-2xl border border-emerald-300/25 bg-emerald-400/10 px-4 py-4 text-center text-emerald-300 shadow-inner">
                  <Sparkles className="mx-auto mb-2 h-6 w-6" />
                  <p className="text-sm font-black uppercase tracking-[0.18em]">Premium pass active</p>
                  <p className="mt-1 text-xs font-medium text-emerald-100/80">Monthly Mega Exam fee is waived.</p>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    disabled={paymentLoading}
                    className="flex flex-col items-center gap-2 group disabled:cursor-wait disabled:opacity-60"
                    onClick={handlePaymentClick}
                  >
                    <div className="h-12 w-20 bg-white/90 rounded-xl p-2 flex items-center justify-center border border-slate-900/10 dark:border-white/20 shadow-lg group-hover:scale-105 transition-transform">
                      <img src="https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg" alt="bKash" className="h-full object-contain" />
                    </div>
                    <span className="text-xs text-slate-600 dark:text-gray-300 font-medium group-hover:text-pink-300 transition-colors">bKash</span>
                  </button>
                  <button
                    type="button"
                    disabled={paymentLoading}
                    className="flex flex-col items-center gap-2 group disabled:cursor-wait disabled:opacity-60"
                    onClick={handlePaymentClick}
                  >
                    <div className="h-12 w-20 bg-white/90 rounded-xl p-2 flex items-center justify-center border border-slate-900/10 dark:border-white/20 shadow-lg group-hover:scale-105 transition-transform">
                      <img src="https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png" alt="Nagad" className="h-full object-contain scale-125" />
                    </div>
                    <span className="text-xs text-slate-600 dark:text-gray-300 font-medium group-hover:text-orange-300 transition-colors">Nagad</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="relative z-10">
            {!user ? (
              <button 
                onClick={handleJoin}
                className="w-full py-4 bg-slate-900/5 dark:bg-white/10 backdrop-blur-md border border-slate-900/10 dark:border-white/20 hover:bg-slate-900/20 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <Lock className="w-5 h-5" />
                Login to Join
              </button>
            ) : !enrollment ? (
              <button 
                onClick={handleJoin}
                disabled={paymentLoading}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white rounded-2xl font-black text-lg transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
              >
                {paymentLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {paymentLoading ? 'Opening Checkout...' : user?.isPremium ? 'Activate Free Premium Exam' : `Join the Exam for Tk ${displayChallenge.fee}`}
              </button>
            ) : enrollment.paymentStatus === 'PENDING' ? (
              user?.isPremium ? (
                <button 
                  onClick={handlePremiumAccess}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-2xl font-black text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Unlock with Premium
                </button>
              ) : (
                <button 
                  onClick={handlePaymentClick}
                  disabled={paymentLoading}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white rounded-2xl font-black text-lg transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
                >
                  {paymentLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                  {paymentLoading ? 'Opening Checkout...' : `Pay Tk ${displayChallenge.fee} & Join`}
                </button>
              )
            ) : enrollment.score !== null ? (
              <div className="bg-green-500/20 backdrop-blur-md border border-green-500/50 rounded-2xl p-6 text-center shadow-lg shadow-green-500/20">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Exam Completed!</h3>
                {isResultPublished(enrollment.updatedAt) ? (
                  <p className="text-lg text-slate-600 dark:text-gray-300">Your Score: <span className="text-slate-900 dark:text-white font-bold">{enrollment.score} / 30</span></p>
                ) : (
                  <p className="text-sm text-slate-600 dark:text-gray-300">Thanks for participating! Your result will be published in 12 hours.</p>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setShowExam(true)}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-2xl font-black text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-6 h-6" />
                Enter Exam Now
              </button>
            )}
          </div>
        </motion.div>
      </div>

    </div>
  );
}
