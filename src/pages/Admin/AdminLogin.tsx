import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, KeyRound, MessageSquare, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Constants ────────────────────────────────────────────────────────────────
const VALID_USER_ID  = 'noman02';
const VALID_PASSWORD = '172002@aA';
const MOCK_OTP       = '123456';
const WHATSAPP_NUM   = '01518657869';

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminLogin() {
  const navigate = useNavigate();

  // Step tracking: 'credentials' | 'otp'
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');

  // Credential fields
  const [userId,   setUserId]   = useState('');
  const [password, setPassword] = useState('');
  const [showPass,  setShowPass] = useState(false);

  // OTP field
  const [otp, setOtp] = useState('');

  // Error / loading
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  // ── Step 1: Validate credentials ──────────────────────────────────────────
  function handleCredentialSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (userId.trim() !== VALID_USER_ID || password !== VALID_PASSWORD) {
      setError('Invalid User ID or Password. Please try again.');
      return;
    }

    // Mock: simulate sending OTP to WhatsApp
    console.log(`Sending OTP to ${WHATSAPP_NUM}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 800);
  }

  // ── Step 2: Validate OTP ──────────────────────────────────────────────────
  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (otp.trim() !== MOCK_OTP) {
      setError('Incorrect OTP. Please check your WhatsApp and try again.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    }, 600);
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 flex items-center justify-center px-8 py-12 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 rounded-3xl p-10 shadow-2xl shadow-black/20">

          {/* Icon */}
          <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-black text-center mb-2">Admin Portal</h1>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <StepDot active={step === 'credentials'} done={step === 'otp'} label="1" />
            <div className="w-8 h-px bg-slate-400/30" />
            <StepDot active={step === 'otp'} done={false} label="2" />
          </div>

          <AnimatePresence mode="wait">

            {/* ── STEP 1: Credentials ── */}
            {step === 'credentials' && (
              <motion.form
                key="credentials"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleCredentialSubmit}
                className="space-y-4"
              >
                <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-4">
                  Enter your admin credentials to continue.
                </p>

                {/* User ID */}
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="admin-userid"
                    type="text"
                    autoComplete="username"
                    placeholder="User ID"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
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
                    placeholder="Password"
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
                  {loading ? <Spinner /> : <>Continue <ArrowRight size={16} /></>}
                </button>
              </motion.form>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === 'otp' && (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleOtpSubmit}
                className="space-y-4"
              >
                <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-4">
                  An OTP has been sent to your WhatsApp&nbsp;
                  <span className="font-semibold text-indigo-400">+880 {WHATSAPP_NUM}</span>.
                  Enter it below.
                </p>

                {/* OTP input */}
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="admin-otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="6-digit OTP"
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
                  {loading ? <Spinner /> : <><CheckCircle2 size={16} /> Verify & Login</>}
                </button>

                {/* Back link */}
                <button
                  type="button"
                  onClick={() => { setStep('credentials'); setError(''); setOtp(''); }}
                  className="w-full text-center text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-400 transition-colors pt-1"
                >
                  ← Back to credentials
                </button>
              </motion.form>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
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
