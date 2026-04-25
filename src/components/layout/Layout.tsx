import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Facebook, Sun, Moon, Menu, X } from 'lucide-react';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

// Dynamic SEO Component
function SEO({ title }: { title?: string }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Welcome to ICT`;
    } else {
      document.title = 'Welcome to ICT | Master ICT with Liquid Clarity';
    }
  }, [title]);
  return null;
}

export default function Layout() {
  const location = useLocation();
  const { user, userRole, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [securityToastVisible, setSecurityToastVisible] = useState(false);
  
  // Determine title based on route
  let pageTitle = "";
  if (location.pathname.includes("chapters")) pageTitle = "HSC Chapters";
  if (location.pathname.includes("topics")) pageTitle = "Topics";
  if (location.pathname.includes("quiz")) pageTitle = "Quiz";
  if (location.pathname.includes("admin")) pageTitle = "Admin Portal";
  if (location.pathname.includes("monthly-quiz")) pageTitle = "Join the biggest HSC ICT Quiz in Bangladesh";
  if (location.pathname.includes("dashboard")) pageTitle = "Student Dashboard";

  // Anti-theft script (Phase 8)
  useEffect(() => {
    let toastTimer: ReturnType<typeof setTimeout> | undefined;
    const showSecurityToast = () => {
      setSecurityToastVisible(true);
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => setSecurityToastVisible(false), 1800);
    };

    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tagName = target.tagName.toLowerCase();
      return tagName === 'input' || tagName === 'textarea' || target.isContentEditable;
    };

    const blockEvent = (e: Event) => {
      e.preventDefault();
      showSecurityToast();
    };

    const handleContextMenu = (e: MouseEvent) => blockEvent(e);
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && ['u', 's', 'p'].includes(key)) ||
        (e.ctrlKey && ['c', 'x', 'v'].includes(key) && !isEditableTarget(e.target))
      ) {
        blockEvent(e);
      }
    };

    const handleClipboard = (e: ClipboardEvent) => {
      if (isEditableTarget(e.target)) return;
      blockEvent(e);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleClipboard);
    document.addEventListener('cut', handleClipboard);
    document.addEventListener('paste', handleClipboard);
    document.addEventListener('dragstart', blockEvent);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleClipboard);
      document.removeEventListener('cut', handleClipboard);
      document.removeEventListener('paste', handleClipboard);
      document.removeEventListener('dragstart', blockEvent);
      if (toastTimer) clearTimeout(toastTimer);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/#mentor-section', label: 'Meet Ramjan' },
    { to: '/courses', label: 'Courses' },
    { to: '/suggestions', label: 'ICT Short Suggestion' },
    { to: '/syllabus', label: 'HSC ICT' },
    { to: '/monthly-quiz', label: 'Quiz Exam', live: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 relative overflow-x-hidden flex flex-col font-sans select-none">
      <SEO title={pageTitle} />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(120deg,rgba(14,165,233,0.10),transparent_28%,rgba(99,102,241,0.08)_58%,transparent_78%),linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(120deg,rgba(14,165,233,0.14),transparent_28%,rgba(16,185,129,0.08)_58%,transparent_78%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:auto,32px_32px,32px_32px]"></div>

      {/* Header */}
      <header className="px-4 sm:px-6 md:px-10 lg:px-16 py-3 md:py-5 flex items-center justify-between gap-3 border-b border-slate-900/10 dark:border-white/10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <Link to="/" className="min-w-0 text-xl sm:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 truncate">
          Welcome to ICT
        </Link>
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-medium text-sm text-slate-600 dark:text-slate-300">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap">
              {link.label}
              {link.live && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">LIVE</span>}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-4">
              <Link to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-500 border border-slate-900/10 dark:border-white/20 flex items-center justify-center font-bold text-white shadow-sm group-hover:scale-105 transition-transform">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    user.name?.charAt(0)?.toUpperCase() || 'S'
                  )}
                </div>
                <span>{userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard'}</span>
              </Link>
              <button onClick={logout} className="px-4 py-2 bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/20 dark:hover:bg-white/20 rounded-lg text-slate-900 dark:text-white transition-colors">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/admin" className="hover:text-slate-900 dark:hover:text-white transition-colors">Admin</Link>
              <button 
                onClick={() => login()} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
              >
                Sign in with Google
              </button>
            </div>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-900/5 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/10 dark:hover:bg-white/20 transition-all flex items-center justify-center border border-slate-900/10 dark:border-white/10 shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-900/5 dark:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-900/10 dark:border-white/10"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="p-2.5 rounded-xl bg-slate-900/5 dark:bg-white/10 text-slate-800 dark:text-white border border-slate-900/10 dark:border-white/10"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute left-3 right-3 top-[calc(100%+0.5rem)] rounded-3xl border border-white/50 dark:border-white/10 bg-white/90 dark:bg-slate-950/95 backdrop-blur-2xl shadow-2xl p-3 lg:hidden"
            >
              <div className="grid gap-1">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10"
                  >
                    <span>{link.label}</span>
                    {link.live && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">LIVE</span>}
                  </Link>
                ))}
                <div className="h-px bg-slate-900/10 dark:bg-white/10 my-2"></div>
                {user ? (
                  <>
                    <Link to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-500 border border-slate-900/10 dark:border-white/20 flex items-center justify-center font-bold text-white">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt={user.name || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          user.name?.charAt(0)?.toUpperCase() || 'S'
                        )}
                      </div>
                      {userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                    </Link>
                    <button onClick={logout} className="w-full text-left rounded-2xl px-4 py-3 text-sm font-bold text-rose-600 dark:text-rose-300 hover:bg-rose-500/10">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/admin" className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10">Admin</Link>
                    <button onClick={() => login()} className="w-full rounded-2xl px-4 py-3 bg-blue-600 text-white text-sm font-black">Sign in with Google</button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="watermarked-content flex-1 flex flex-col relative z-10" data-protected-content="true">
        <Outlet />
      </main>

      <AnimatePresence>
        {securityToastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed left-1/2 bottom-24 z-[80] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-red-400/25 bg-slate-950/90 px-5 py-4 text-center text-sm font-black text-red-100 shadow-2xl shadow-red-950/40 backdrop-blur-2xl"
          >
            কন্টেন্ট কপি করা নিষেধ!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button for Facebook */}
      <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 group"
      >
        <div className="absolute -inset-2 rounded-full border-2 border-dotted border-sky-400 animate-spin-slow opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 rounded-full blur opacity-70 group-hover:opacity-100 animate-spin-slow transition duration-1000"></div>
        <div className="relative bg-blue-600/80 backdrop-blur-md border border-slate-900/10 dark:border-white/20 text-white p-3 md:p-4 rounded-full shadow-lg transition-transform group-hover:scale-110 flex items-center justify-center">
          <Facebook className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </a>

      <Footer />
    </div>
  );
}
