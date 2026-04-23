import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Facebook, Sun, Moon } from 'lucide-react';
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
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
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
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'c')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 relative overflow-hidden flex flex-col font-sans select-none">
      <SEO title={pageTitle} />
      {/* Background Decorations (Liquid Glassmorphism) */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[80px] -top-[100px] -right-[100px] opacity-40 -z-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-sky-500 rounded-full blur-[80px] -bottom-[50px] -left-[50px] opacity-30 -z-10"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 -z-10"></div>

      {/* Header */}
      <header className="px-8 md:px-16 py-6 flex items-center justify-between border-b border-slate-900/10 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
          Welcome to ICT
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
          <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
          <Link to="/courses" className="hover:text-slate-900 dark:hover:text-white transition-colors">Courses</Link>
          <Link to="/suggestions" className="hover:text-slate-900 dark:hover:text-white transition-colors">ICT Short Suggestion</Link>
          <Link to="/syllabus" className="hover:text-slate-900 dark:hover:text-white transition-colors">HSC ICT</Link>
          <Link to="/monthly-quiz" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2">
            Quiz Exam
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">LIVE</span>
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-500 border border-slate-900/10 dark:border-white/20 flex items-center justify-center font-bold text-white shadow-sm group-hover:scale-105 transition-transform">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    user.name?.charAt(0)?.toUpperCase() || 'S'
                  )}
                </div>
                <span>Dashboard</span>
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
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10">
        <Outlet />
      </main>

      {/* Floating Action Button for Facebook */}
      <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="absolute -inset-2 rounded-full border-2 border-dotted border-sky-400 animate-spin-slow opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 rounded-full blur opacity-70 group-hover:opacity-100 animate-spin-slow transition duration-1000"></div>
        <div className="relative bg-blue-600/80 backdrop-blur-md border border-slate-900/10 dark:border-white/20 text-white p-4 rounded-full shadow-lg transition-transform group-hover:scale-110 flex items-center justify-center">
          <Facebook className="w-6 h-6" />
        </div>
      </a>

      <Footer />
    </div>
  );
}
