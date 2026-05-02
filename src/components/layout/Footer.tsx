import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Facebook, Mail, MapPin, MessageCircle, Send, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Chapters', to: '/syllabus' },
  { label: 'MCQ Practice', to: '/mcq-practice' },
  { label: 'Board Questions', to: '/board-questions' },
  { label: 'Suggestions', to: '/suggestions' },
];

const policyLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
];

const footerFaqs = [
  { q: 'Free practice?', a: 'MCQ Practice and Chapters are open for students.' },
  { q: 'Payment active?', a: 'Quiz Exam and ICT Short Suggestion checkout are active.' },
  { q: 'Need help?', a: 'Use WhatsApp or the feedback form for support.' },
];

export default function Footer() {
  const [name, setName] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !suggestion.trim()) {
      showToast('দয়া করে আপনার নাম এবং পরামর্শ লিখুন।');
      return;
    }

    const text = encodeURIComponent(`আসসালামু আলাইকুম, আমি ${name.trim()}। ICT Toppers সম্পর্কে আমার পরামর্শ হলো: ${suggestion.trim()}`);
    window.open(`https://wa.me/8801518657869?text=${text}`, '_blank');

    setName('');
    setSuggestion('');
  };

  return (
    <footer className="relative z-20 mt-auto border-t border-slate-900/10 bg-white/82 px-4 pb-28 pt-12 text-slate-900 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/82 dark:text-white sm:px-6 md:px-16 md:pb-10 md:pt-16">
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-red-400/50 bg-red-500/90 px-5 py-3 font-bold text-white shadow-2xl backdrop-blur-md md:bottom-8"
          >
            <span className="flex-1">{toastMsg}</span>
            <button onClick={() => setToastMsg('')} className="rounded-full p-1 transition-colors hover:bg-white/20" aria-label="Close message">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.15fr_0.75fr_0.8fr_0.8fr_1.1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/10 dark:bg-white/10 dark:ring-white/10">
              <img src="/logo.jpeg" alt="ICT Toppers" className="h-full w-full object-cover" />
            </span>
            <span className="text-2xl font-black">ICT Toppers</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">
            HSC ICT chapter lessons, free MCQ practice, written questions, board-question preparation, and student progress tools in one place.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-base font-black">Quick Links</h4>
          <ul className="space-y-3 text-sm font-bold text-slate-600 dark:text-slate-300">
            {quickLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-sky-600 dark:hover:text-sky-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="mb-3 mt-7 text-base font-black">FAQ</h4>
          <ul className="space-y-3 text-xs font-semibold leading-6 text-slate-600 dark:text-slate-300">
            {footerFaqs.map(item => (
              <li key={item.q}>
                <span className="block font-black text-slate-800 dark:text-slate-100">{item.q}</span>
                <span>{item.a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-base font-black">Contact</h4>
          <ul className="space-y-3 text-sm font-bold text-slate-600 dark:text-slate-300">
            <li>
              <a href="mailto:sarkerramjan2015@gmail.com" className="inline-flex items-start gap-2 transition-colors hover:text-sky-600 dark:hover:text-sky-300">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" /> sarkerramjan2015@gmail.com
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-base font-black">Social</h4>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/ramjansarker02/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-black text-white transition hover:bg-blue-500"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
            <a
              href="https://wa.me/8801518657869"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-400"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>

          <h4 className="mb-4 mt-7 text-base font-black">Policies</h4>
          <ul className="space-y-3 text-sm font-bold text-slate-600 dark:text-slate-300">
            {policyLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to} className="inline-flex items-center gap-2 transition-colors hover:text-sky-600 dark:hover:text-sky-300">
                  <ShieldCheck className="h-4 w-4" /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 flex items-center gap-2 text-base font-black">
            <MessageCircle className="h-5 w-5 text-sky-500" /> Suggestion / Feedback
          </h4>
          <form onSubmit={handleFeedbackSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="min-h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:focus:ring-sky-400/20"
            />
            <textarea
              placeholder="Your suggestion..."
              value={suggestion}
              onChange={e => setSuggestion(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:focus:ring-sky-400/20"
            />
            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-sky-600/20 transition-all hover:bg-sky-500 active:scale-[0.98]"
            >
              <Send size={16} /> Submit
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-900/10 pt-6 text-center text-sm font-bold text-slate-500 dark:border-white/10 dark:text-slate-400">
        &copy; 2026 All rights reserved ICT Toppers
      </div>
    </footer>
  );
}
