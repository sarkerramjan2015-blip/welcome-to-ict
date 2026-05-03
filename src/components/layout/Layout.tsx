import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  BookOpen,
  Brain,
  Crown,
  Facebook,
  FileQuestion,
  Home as HomeIcon,
  LayoutDashboard,
  Lightbulb,
  LogIn,
  Menu,
  Moon,
  Sparkles,
  Sun,
  Trophy,
  Users,
  Video,
  UserPlus,
  X,
} from 'lucide-react';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import PremiumSubscriptionModal, { type PremiumPlan } from '../PremiumSubscriptionModal';
import AnnouncementBar from '../ui/AnnouncementBar';
import AIChatbot from '../ui/AIChatbot';

const PREMIUM_PROMPT_INTERVAL_MS = 24 * 60 * 60 * 1000;
const DEFAULT_SEO_TITLE = 'ICT Toppers | 1st Time in Bangladesh: Interactive HSC ICT Platform';

const getPremiumPromptKey = (userId: string) => `ict-toppers:premium-prompt:${userId}`;

type IconComponent = React.ComponentType<{ className?: string }>;

interface NavItem {
  to: string;
  label: string;
  icon?: IconComponent;
  badge?: string;
}

function SEO({ title, disabled = false }: { title?: string; disabled?: boolean }) {
  useEffect(() => {
    if (disabled) return;

    if (title) {
      document.title = `${title} | ICT Toppers`;
    } else {
      document.title = DEFAULT_SEO_TITLE;
    }
  }, [disabled, title]);
  return null;
}

const mainNavLinks: NavItem[] = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/#mentor-section', label: 'Mentor', icon: Users },
  { to: '/courses', label: 'Courses', icon: Video },
  { to: '/syllabus', label: 'Chapters', icon: BookOpen },
  { to: '/mcq-practice', label: 'MCQ Practice', icon: Brain },
  { to: '/board-questions', label: 'Board Questions', icon: FileQuestion },
  { to: '/suggestions', label: 'Suggestions', icon: Lightbulb },
  { to: '/monthly-quiz', label: 'Quiz Exam', icon: Trophy, badge: 'LIVE' },
  { to: '/admin', label: 'Admin', icon: LogIn },
];

const getPageTitle = (pathname: string, isBoardQuestionPage: boolean) => {
  if (pathname.includes('mcq-practice')) return 'Free HSC ICT MCQ Practice';
  if (pathname.includes('chapters')) return 'HSC Chapters';
  if (pathname.includes('topics')) return 'Topics';
  if (pathname.includes('monthly-quiz')) return 'Join the biggest HSC ICT Quiz in Bangladesh';
  if (pathname.includes('quiz')) return 'Quiz';
  if (pathname.includes('admin')) return 'Admin Portal';
  if (pathname.includes('dashboard')) return 'Student Dashboard';
  if (pathname.includes('privacy')) return 'Privacy Policy';
  if (pathname.includes('terms')) return 'Terms and Conditions';
  if (isBoardQuestionPage) return 'HSC ICT Board Question PDF';
  return '';
};

const isActivePath = (pathname: string, currentHash: string, to: string) => {
  const [pathPart, hashPart] = to.split('#');
  const pathOnly = pathPart || '/';

  if (hashPart) {
    return pathname === pathOnly && currentHash === `#${hashPart}`;
  }

  if (pathOnly === '/') return pathname === '/' && !currentHash;
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
};

export default function Layout() {
  const location = useLocation();
  const { user, authReady, authError, userRole, logout, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [securityToastVisible, setSecurityToastVisible] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const isBoardQuestionPage = location.pathname === '/board-questions' || location.pathname.startsWith('/board-questions/');
  const isHomePage = location.pathname === '/';
  const pageTitle = getPageTitle(location.pathname, isBoardQuestionPage);
  const dashboardPath = userRole === 'admin' ? '/admin/dashboard' : '/dashboard';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  useEffect(() => {
    if (isBoardQuestionPage || !authReady || !user || user.role === 'admin' || user.isPremium) {
      setPremiumModalOpen(false);
      return;
    }

    const promptKey = getPremiumPromptKey(user.id);
    const lastShown = Number(localStorage.getItem(promptKey) || '0');
    const shouldShow = Date.now() - lastShown >= PREMIUM_PROMPT_INTERVAL_MS;

    if (shouldShow) {
      localStorage.setItem(promptKey, String(Date.now()));
      setPremiumModalOpen(true);
    }
  }, [authReady, isBoardQuestionPage, user?.id, user?.isPremium, user?.role]);

  const handlePremiumUpgrade = async (plan: PremiumPlan) => {
    await updateProfile({
      isPremium: true,
      premiumPlan: plan,
      premiumSince: new Date().toISOString(),
    });
    localStorage.setItem(
      `ict-toppers:premium-payment:${user?.id || 'guest'}`,
      JSON.stringify({
        plan,
        activatedAt: new Date().toISOString(),
      })
    );
    setPremiumModalOpen(false);
  };

  const linkClass = (to: string) =>
    `inline-flex min-h-11 items-center rounded-full px-2.5 py-2 text-xs font-black transition-all 2xl:px-4 2xl:text-sm ${
      isActivePath(location.pathname, location.hash, to)
        ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
        : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
    }`;

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-50 font-sans text-slate-900 select-none dark:bg-[#020617] dark:text-slate-50">
      <SEO title={pageTitle} disabled={isBoardQuestionPage} />
      {!isBoardQuestionPage && <div className="premium-mesh-bg" aria-hidden="true"></div>}

      <motion.header
        animate={{ paddingTop: isScrolled ? 8 : 14, paddingBottom: isScrolled ? 8 : 14 }}
        transition={{ duration: 0.2 }}
        className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-slate-900/10 bg-slate-50/88 px-4 shadow-sm shadow-slate-950/0 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/88 sm:px-6 md:px-10 lg:px-16"
      >
        <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <span className="logo-dotted-shine flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-900/10 dark:bg-white/10 dark:ring-white/10 sm:h-10 sm:w-10">
            <span className="logo-shine-sweep h-full w-full overflow-hidden rounded-full">
              <img src="/logo.jpeg" alt="ICT Toppers" className="h-full w-full rounded-full object-cover" />
            </span>
          </span>
          <span className="whitespace-nowrap text-lg font-black tracking-tight text-slate-950 dark:text-white sm:text-xl">ICT Toppers</span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex">
          {mainNavLinks.map(link => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>
              <span className="whitespace-nowrap">{link.label}</span>
              {link.badge && (
                <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[0.58rem] font-black leading-none text-white shadow-sm shadow-red-500/30">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          {user ? (
            <>
              <Link to={dashboardPath} className={linkClass(dashboardPath)}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                {userRole === 'admin' ? 'Admin' : 'Dashboard'}
              </Link>
              {userRole !== 'admin' && (
                <button
                  onClick={() => !user.isPremium && setPremiumModalOpen(true)}
                  disabled={user.isPremium}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition-all ${
                    user.isPremium
                      ? 'border border-amber-300/30 bg-amber-400/15 text-amber-700 dark:text-amber-200'
                      : 'bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950'
                  }`}
                >
                  <Crown className="h-4 w-4" />
                  {user.isPremium ? 'Premium' : 'Upgrade'}
                </button>
              )}
              <button
                onClick={logout}
                className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-black text-rose-600 transition-all hover:bg-rose-500/10 dark:text-rose-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-sky-600 px-5 py-2 text-sm font-black text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-500"
              >
                <Sparkles className="h-4 w-4" /> Join Free
              </Link>
              <Link
                to="/login"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-black text-slate-950 transition-all hover:bg-sky-50 dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                <LogIn className="h-4 w-4" /> Login
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-950 dark:border-white/10 dark:bg-white/10 dark:text-slate-300 dark:hover:text-white"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-white"
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
              className="absolute left-3 right-3 top-[calc(100%+0.5rem)] rounded-3xl border border-white/70 bg-white/95 p-3 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/95 xl:hidden"
            >
              <div className="grid gap-1">
                {mainNavLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black ${
                        isActivePath(location.pathname, location.hash, link.to)
                          ? 'bg-sky-600 text-white'
                          : 'text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10'
                      }`}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span className="flex-1">{link.label}</span>
                      {link.badge && (
                        <span className="rounded-full bg-red-500 px-2 py-1 text-[0.62rem] font-black leading-none text-white">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
                <div className="my-2 h-px bg-slate-900/10 dark:bg-white/10" />
                {user ? (
                  <>
                    <Link
                      to={dashboardPath}
                      className="flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      {userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                    </Link>
                    {userRole !== 'admin' && (
                      <button
                        onClick={() => !user.isPremium && setPremiumModalOpen(true)}
                        disabled={user.isPremium}
                        className={`min-h-12 rounded-2xl px-4 py-3 text-left text-sm font-black ${
                          user.isPremium ? 'bg-amber-400/10 text-amber-700 dark:text-amber-200' : 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                        }`}
                      >
                        {user.isPremium ? 'Premium Active' : 'Upgrade to Premium'}
                      </button>
                    )}
                    <button
                      onClick={logout}
                      className="min-h-12 rounded-2xl px-4 py-3 text-left text-sm font-black text-rose-600 hover:bg-rose-500/10 dark:text-rose-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/register"
                      className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-black text-white"
                    >
                      <UserPlus className="h-5 w-5" /> Join Free
                    </Link>
                    <Link
                      to="/login"
                      className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-950 dark:border-white/10 dark:bg-white/10 dark:text-white"
                    >
                      <LogIn className="h-5 w-5" /> Login
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {!isBoardQuestionPage && <AnnouncementBar />}

      <main className="relative z-10 flex flex-1 flex-col" data-protected-content="true">
        <section className="flex flex-1 flex-col" aria-label="ICT Toppers page content">
          <Outlet />
        </section>
      </main>

      <AnimatePresence>
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="fixed left-1/2 top-24 z-[85] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-2xl border border-rose-400/25 bg-slate-950/95 px-5 py-4 text-left text-sm font-bold text-rose-100 shadow-2xl shadow-rose-950/35 backdrop-blur-2xl break-words"
          >
            {authError}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {securityToastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed left-1/2 bottom-24 z-[80] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-red-400/25 bg-slate-950/90 px-5 py-4 text-center text-sm font-black text-red-100 shadow-2xl shadow-red-950/40 backdrop-blur-2xl"
          >
            কনটেন্ট কপি করা নিষেধ!
          </motion.div>
        )}
      </AnimatePresence>

      {!isBoardQuestionPage && (
        <PremiumSubscriptionModal
          open={premiumModalOpen}
          onClose={() => setPremiumModalOpen(false)}
          onUpgrade={handlePremiumUpgrade}
        />
      )}

      {!location.pathname.startsWith('/topics/') && !isBoardQuestionPage && (
        <a
          href="https://www.facebook.com/ramjansarker02/"
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed right-5 z-40 hidden md:block md:bottom-8 group ${isHomePage ? 'md:bottom-28 lg:bottom-8' : ''}`}
          aria-label="ICT Toppers Facebook page"
        >
          <div className="absolute -inset-2 rounded-full border-2 border-dotted border-sky-400 opacity-70 transition-opacity duration-500 animate-spin-slow group-hover:opacity-100" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 opacity-70 blur transition duration-1000 animate-spin-slow group-hover:opacity-100" />
          <div className="relative flex items-center justify-center rounded-full border border-slate-900/10 bg-blue-600/80 p-3 text-white shadow-lg backdrop-blur-md transition-transform group-hover:scale-110 dark:border-white/20 md:p-4">
            <Facebook className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        </a>
      )}

      {!isBoardQuestionPage && (
        <div className="hidden md:block">
          <AIChatbot />
        </div>
      )}

      <Footer />
    </div>
  );
}
