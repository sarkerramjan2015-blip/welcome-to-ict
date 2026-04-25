import React from 'react';
import { Crown, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdBannerProps {
  placement?: 'inline' | 'dashboard';
  className?: string;
}

export default function AdBanner({ placement = 'inline', className = '' }: AdBannerProps) {
  const { user } = useAuth();

  if (user?.isPremium || user?.role === 'admin') {
    return null;
  }

  return (
    <aside
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/85 px-5 py-4 text-center text-white shadow-2xl shadow-black/25 backdrop-blur-2xl ${placement === 'dashboard' ? 'mt-8' : 'my-8'} ${className}`}
      aria-label="Advertisement"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(239,68,68,0.13),transparent_28%,rgba(20,184,166,0.10)_68%,transparent)]" />
      <div className="relative flex flex-col items-center justify-between gap-3 sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-red-200">
            <Sparkles className="size-5" />
          </div>
          <div>
            <p className="text-[0.66rem] font-black uppercase tracking-[0.24em] text-slate-400">
              Advertisement
            </p>
            <p className="text-sm font-bold text-slate-100">
              Upgrade to Premium for an ad-free learning experience.
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-500/10 px-4 py-2 text-xs font-black text-red-100">
          <Crown className="size-4" />
          Upgrade to remove
        </div>
      </div>
    </aside>
  );
}
