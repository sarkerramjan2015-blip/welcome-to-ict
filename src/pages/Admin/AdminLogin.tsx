import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFirebaseAuth, getGoogleProvider } from '../../lib/firebase';
import { AdminVerificationError, verifyFirebaseAdminUser } from '../../services/adminAuth';

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const redirectTimerRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => () => {
    if (redirectTimerRef.current) {
      window.clearTimeout(redirectTimerRef.current);
    }
  }, []);

  const rejectInvalidAdmin = async (auth: Awaited<ReturnType<typeof getFirebaseAuth>>, signOut: (auth: any) => Promise<void>) => {
    if (auth) {
      await signOut(auth).catch(() => undefined);
    }
    setError('Invalid email. Only the approved admin email can access this portal.');
    if (redirectTimerRef.current) {
      window.clearTimeout(redirectTimerRef.current);
    }
    redirectTimerRef.current = window.setTimeout(() => {
      navigate('/', { replace: true });
    }, 2200);
  };

  const handleGoogleAdminLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const [{ signInWithPopup, signOut }, auth, provider] = await Promise.all([
        import('firebase/auth'),
        getFirebaseAuth(),
        getGoogleProvider(),
      ]);

      if (!auth || !provider) {
        setError('Firebase Auth is not configured. Check the VITE_FIREBASE_* environment variables.');
        return;
      }

      const credential = await signInWithPopup(auth, provider);
      const adminRecord = await verifyFirebaseAdminUser(credential.user, { throwOnFailure: true });

      if (!adminRecord) {
        await rejectInvalidAdmin(auth, signOut);
        return;
      }

      localStorage.removeItem('isAdmin');
      navigate('/admin/dashboard', { replace: true });
    } catch (loginError: any) {
      if (loginError?.code === 'auth/popup-closed-by-user') {
        return;
      }

      if (loginError instanceof AdminVerificationError) {
        const auth = await getFirebaseAuth();
        const { signOut } = await import('firebase/auth');
        await rejectInvalidAdmin(auth, signOut);
        return;
      }

      setError(loginError?.message || 'Google admin verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-20 flex flex-1 items-center justify-center px-8 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-900/10 bg-slate-950/8 p-10 shadow-2xl shadow-black/25 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]">
          <div className="relative mx-auto mb-6 h-28 w-28 overflow-hidden rounded-2xl border border-white/50 bg-white p-2 shadow-xl shadow-indigo-500/20">
            <img
              src="/ict_toppers_logo.jpeg"
              alt="ICT Toppers"
              className="h-full w-full rounded-xl object-contain"
            />
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/70" />
          </div>

          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black">Admin Portal</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Sign in with the approved Google account to continue.
            </p>
          </div>

          <button
            id="admin-google-submit"
            type="button"
            onClick={() => void handleGoogleAdminLogin()}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-900/10 bg-white px-4 py-3 font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60 dark:border-white/10"
          >
            {loading ? <Spinner /> : <GoogleLogo />}
            {loading ? 'Verifying Google account...' : 'Continue with Google'}
          </button>

          {error && <ErrorBox message={error} />}
        </div>
      </div>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="mt-5 break-words rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-left text-sm font-medium text-rose-400">
      {message}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
