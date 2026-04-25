import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Register() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = await register({ name, email, role: 'student' });
    setLoading(false);
    navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center px-8 py-12 relative z-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 rounded-3xl p-10 shadow-2xl shadow-black/20">
          <h1 className="text-3xl font-black text-center mb-2">Create Account</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-8">Start tracking your ICT learning journey.</p>

          <button
            type="button"
            onClick={() => void loginWithGoogle()}
            className="mb-5 w-full rounded-xl border border-slate-900/10 dark:border-white/10 bg-white text-slate-800 px-4 py-3 font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-3"
          >
            <GoogleLogo />
            Sign up with Google
          </button>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <User size={18} className="absolute inset-y-0 left-4 my-auto text-slate-500" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-slate-900 dark:text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
            </div>
            <div className="relative">
              <Mail size={18} className="absolute inset-y-0 left-4 my-auto text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-slate-900 dark:text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Register'} <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already registered? <Link to="/login" className="font-bold text-sky-500 hover:text-sky-400">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
