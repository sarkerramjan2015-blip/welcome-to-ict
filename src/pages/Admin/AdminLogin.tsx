import React, { useState } from 'react';
import { Mail, KeyRound, MessageSquare, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFirebaseAuth } from '../../lib/firebase';
import { verifyFirebaseAdminUser } from '../../services/adminAuth';
import emailjs from '@emailjs/browser';

// ─── Constants ────────────────────────────────────────────────────────────────
const ADMIN_EMAIL_HINT = 'sarkerramjan2015@gmail.com';

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminLogin() {
  const navigate = useNavigate();

  // Step tracking: 'credentials' | 'otp'
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');

  // Credential fields
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  // OTP fields
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [verifiedAdminEmail, setVerifiedAdminEmail] = useState(ADMIN_EMAIL_HINT);

  // Error / loading
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  // ── Step 1: Validate credentials ──────────────────────────────────────────
  async function handleCredentialSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError('Please enter the admin email and password.');
      return;
    }

    const firebaseAuth = await getFirebaseAuth();

    if (!firebaseAuth) {
      setError('Firebase Auth কনফিগার করা নেই।');
      return;
    }

    setLoading(true);
    setLoadingText('OTP পাঠানো হচ্ছে, দয়া করে অপেক্ষা করুন...');
    
    try {
      const { signInWithEmailAndPassword, signOut } = await import('firebase/auth');
      const credential = await signInWithEmailAndPassword(firebaseAuth, trimmedEmail, password);
      const adminRecord = await verifyFirebaseAdminUser(credential.user, { throwOnFailure: true });

      if (!adminRecord) {
        await signOut(firebaseAuth).catch(() => undefined);
        setError('This Firebase account is not verified in Firestore admin/{uid}. Check the uid, email, and role fields.');
        return;
      }

      setVerifiedAdminEmail(adminRecord.email);

      // Generate a random 6-digit numeric code
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);

      try {
        await emailjs.send(
          'service_efeim7l',
          'template_fit0rsq',
          {
            otp_code: newOtp,
            email: adminRecord.email,
            time: '15 minutes'
          },
          'fXPRXq1rMmhQ2KrLF'
        );
        setStep('otp');
      } catch (emailErr) {
        setError('ইমেইল পাঠাতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      }
    } catch (err: any) {
      setError(err.message || 'Firebase অথেনটিকেশন ব্যর্থ হয়েছে।');
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  }

  // ── Step 2: Validate OTP ──────────────────────────────────────────────────
  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (otp.trim() !== generatedOtp) {
      setError('ভুল OTP প্রদান করা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('isAdmin');
      navigate('/admin/dashboard', { replace: true });
    }, 600);
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 flex items-center justify-center px-8 py-12 relative z-20">
      <div className="w-full max-w-md">
        <div className="bg-slate-950/8 dark:bg-white/[0.055] backdrop-blur-xl border border-slate-900/10 dark:border-white/10 rounded-3xl p-10 shadow-2xl shadow-black/25">

          {/* Brand logo */}
          <div className="relative mx-auto mb-6 h-28 w-28 overflow-hidden rounded-2xl border border-white/50 bg-white p-2 shadow-xl shadow-indigo-500/20">
            <img
              src="/ict_toppers_logo.jpeg"
              alt="ICT Toppers"
              className="h-full w-full rounded-xl object-contain"
            />
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/70" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-black text-center mb-2">অ্যাডমিন পোর্টাল</h1>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <StepDot active={step === 'credentials'} done={step === 'otp'} label="১" />
            <div className="w-8 h-px bg-slate-400/30" />
            <StepDot active={step === 'otp'} done={false} label="২" />
          </div>

            {/* ── STEP 1: Credentials ── */}
            {step === 'credentials' && (
              <form
                key="credentials"
                onSubmit={handleCredentialSubmit}
                className="space-y-4"
              >
                <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-4">
                  অ্যাডমিন পোর্টালে প্রবেশ করতে আপনার ইমেইল ও পাসওয়ার্ড প্রদান করুন।
                </p>

                {/* Email */}
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    placeholder="ইমেইল"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="admin-password"
                    type={showPass ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="পাসওয়ার্ড"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-10 py-3 rounded-xl border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Error */}
                {error && <ErrorBox message={error} />}

                {/* Submit */}
                <button
                  id="admin-credentials-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white px-4 py-3 font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Spinner />
                      <span className="ml-2 font-normal text-sm">{loadingText || 'অপেক্ষা করুন...'}</span>
                    </>
                  ) : (
                    <>চালিয়ে যান <ArrowRight size={16} /></>
                  )}
                </button>
              </form>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === 'otp' && (
              <form
                key="otp"
                onSubmit={handleOtpSubmit}
                className="space-y-4"
              >
                <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-4">
                  আপনার ইমেইল (<span className="font-semibold text-indigo-400">{verifiedAdminEmail}</span>)-এ একটি OTP পাঠানো হয়েছে। নিচে সেটি প্রদান করুন।
                </p>

                {/* OTP input */}
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="admin-otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="৬-ডিজিটের OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                    required
                    autoFocus
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 text-sm font-medium tracking-[0.3em] placeholder:tracking-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>

                {/* Error */}
                {error && <ErrorBox message={error} />}

                {/* Submit */}
                <button
                  id="admin-otp-submit"
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white px-4 py-3 font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? <Spinner /> : <><CheckCircle2 size={16} /> যাচাই করুন এবং লগইন করুন</>}
                </button>

                {/* Back link */}
                <button
                  type="button"
                  onClick={() => { setStep('credentials'); setError(''); setOtp(''); setGeneratedOtp(''); }}
                  className="w-full text-center text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-400 transition-colors pt-1"
                >
                  ← লগইন পেজে ফিরে যান
                </button>
              </form>
            )}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepDot({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300
        ${done   ? 'bg-indigo-500 border-indigo-500 text-white' :
          active ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' :
                   'bg-slate-500/10 border-slate-400/30 text-slate-400'}`}
    >
      {done ? <CheckCircle2 size={14} /> : label}
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl text-sm text-left font-medium break-words">
      {message}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
