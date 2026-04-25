import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Countdown from '../components/Countdown';
import { BookOpen, BriefcaseBusiness, CreditCard, GraduationCap, NotebookTabs, Rocket, Timer, Trophy } from 'lucide-react';
import bioImage from '@/src/asset/bio_image.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

function WhatsAppIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.02 3.2c-7.08 0-12.84 5.7-12.84 12.72 0 2.24.6 4.42 1.73 6.34L3.2 28.8l6.7-1.73a12.95 12.95 0 0 0 6.12 1.55c7.08 0 12.84-5.7 12.84-12.72S23.1 3.2 16.02 3.2Zm0 23.2c-1.94 0-3.82-.53-5.46-1.53l-.4-.24-3.96 1.02 1.06-3.82-.26-.4a10.26 10.26 0 0 1-1.6-5.5c0-5.78 4.76-10.48 10.62-10.48s10.62 4.7 10.62 10.48S21.88 26.4 16.02 26.4Zm5.82-7.84c-.32-.16-1.9-.93-2.2-1.04-.3-.1-.52-.16-.74.16-.22.32-.84 1.04-1.03 1.25-.19.22-.38.24-.7.08-.32-.16-1.35-.49-2.57-1.57a9.65 9.65 0 0 1-1.78-2.2c-.18-.32-.02-.5.14-.65.14-.14.32-.38.48-.57.16-.19.22-.32.32-.54.1-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.02-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.32-1.14 1.1-1.14 2.7s1.17 3.13 1.33 3.35c.16.22 2.3 3.48 5.58 4.88.78.33 1.39.53 1.86.68.78.25 1.5.21 2.06.13.63-.09 1.9-.77 2.17-1.51.27-.75.27-1.39.19-1.52-.08-.13-.3-.21-.62-.37Z"
      />
    </svg>
  );
}

function MentorSection() {
  return (
    <motion.section
      id="mentor-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      className="scroll-mt-28 px-4 sm:px-6 md:px-16 mb-10 md:mb-14 w-full"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mentor-cinema-card group relative overflow-hidden rounded-[1.35rem] border border-red-500/20 bg-[#050505] p-3 text-white shadow-[0_26px_90px_rgba(0,0,0,0.55)] backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1 hover:border-red-400/35 sm:p-4">
          <a
            href="https://wa.me/8801518657869"
            target="_blank"
            rel="noopener noreferrer"
            className="mentor-wa-button absolute right-3 top-3 z-20 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-500 px-3 py-2 text-xs font-black text-white shadow-lg shadow-emerald-950/40 transition-all duration-300 hover:scale-105 hover:bg-emerald-400 hover:shadow-emerald-400/30"
            aria-label="Message mentor on WhatsApp"
          >
            <WhatsAppIcon className="size-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <div className="relative z-10 grid items-center gap-4 pr-12 sm:pr-28 md:grid-cols-[8.5rem_1fr] md:gap-5 md:pr-28">
            <div className="flex flex-col items-center text-center md:items-start">
              <div className="relative">
                <div className="mentor-cinema-aura" />
                <div className="mentor-cinema-photo relative size-24 overflow-hidden rounded-2xl border border-red-200/15 bg-black p-1 shadow-2xl shadow-red-950/35 sm:size-28 md:size-32">
                  <img
                    src={bioImage}
                    alt="Mohammad Ramjan Mia Sarker"
                    className="size-full rounded-[1rem] object-cover object-center"
                  />
                </div>
              </div>
              <div className="mt-3 rounded-full border border-red-400/20 bg-red-950/30 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.2em] text-red-100">
                ICT Mentor
              </div>
            </div>

            <div className="min-w-0 text-center md:text-left">
              <p className="mentor-cinema-kicker mb-1 text-[0.68rem] font-black uppercase tracking-[0.28em] text-red-300">Mentor Profile</p>
              <h2 className="mentor-cinema-name text-2xl font-black leading-tight text-white sm:text-3xl">
                মোহাম্মদ রমজান সরকার
              </h2>
              <p className="mentor-cinema-copy mt-1 text-sm font-bold leading-6 text-red-50/90">
                Mohammad Ramjan Mia Sarker
              </p>

              <div className="mt-4 grid gap-3 text-left sm:grid-cols-2">
                <div className="min-w-0 border-l border-red-400/35 pl-3">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-red-300/90">Primary Role</p>
                  <p className="mentor-cinema-copy mt-1 break-words text-sm font-semibold leading-6 text-white/82">
                    Assistant Teacher, Shamsul Hoque Khan School & College
                  </p>
                </div>
                <div className="min-w-0 border-l border-red-400/35 pl-3">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-red-300/90">Leadership</p>
                  <p className="mentor-cinema-copy mt-1 break-words text-sm font-medium leading-6 text-white/78" style={{ animationDelay: '0.25s' }}>
                    Head of ICT @ Troyee | Instructor @ Udvash-Unmesh Academic Care
                  </p>
                </div>
                <div className="min-w-0 border-l border-red-400/35 pl-3">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-red-300/90">Academic Background</p>
                  <p className="mentor-cinema-copy mt-1 break-words text-sm font-medium leading-6 text-white/78" style={{ animationDelay: '0.5s' }}>
                    EMCS, Cumilla University | B.Ed & B.A. (Hons), Jagannath University
                  </p>
                </div>
                <div className="min-w-0 border-l border-red-400/35 pl-3">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-red-300/90">Student Impact</p>
                  <p className="mentor-cinema-copy mt-1 break-words text-sm font-medium leading-6 text-white/78" style={{ animationDelay: '0.75s' }}>
                    500+ students guided through analytical, exam-focused ICT learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col"
    >
      <section className="px-4 sm:px-6 md:px-16 mt-8 md:mt-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 break-words"
        >
          <span className="text-slate-900 dark:text-white">ICT Toppers</span><br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-500 to-red-600">ঘরে বসেই ICT Mastery</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 md:mb-12 leading-8 md:leading-relaxed"
        >
          Bangladesh's first interactive ICT platform experience for serious students: chapter-wise smart notes, instant MCQ/CQ practice, progress tracking, and mentor support এক জায়গায়। বাসা থেকেই confusion কমাও, confidence বাড়াও, exam-ready হও।
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.45 }}
          className="mb-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link to="/syllabus" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 text-sm font-black text-white shadow-2xl shadow-red-950/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-red-500/25 sm:w-auto">
            Start HSC ICT <Rocket className="size-4" />
          </Link>
          <Link to="/monthly-quiz" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-900/10 bg-white/75 px-6 py-3.5 text-sm font-black text-slate-900 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/30 hover:text-red-600 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-red-100 sm:w-auto">
            Join Quiz Exam <Trophy className="size-4" />
          </Link>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="px-4 sm:px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto w-full pb-14 md:pb-16"
      >
        <motion.div variants={itemVariants} className="block group h-full">
          <Link to="/syllabus" className="relative rounded-3xl overflow-hidden p-[2px] h-full block">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,#38bdf8_360deg)] animate-spin-slow"></div>
            <div className="absolute inset-0 bg-[conic-gradient(from_180deg,transparent_0_300deg,#818cf8_360deg)] animate-spin-slow"></div>
            <div className="relative bg-gradient-to-br from-slate-100 dark:from-slate-900 to-indigo-50 dark:to-indigo-950 rounded-[22px] border border-dashed border-slate-900/10 dark:border-white/20 p-6 md:p-8 text-center flex flex-col items-center shadow-2xl shadow-black/20 h-full transition-all duration-300 group-hover:from-white dark:group-hover:from-slate-800 group-hover:to-indigo-100 dark:group-hover:to-indigo-900">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl mb-6 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-50">HSC ICT</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">6 Chapters. Comprehensive Notes & MCQ.</p>
              <div className="mt-auto text-[0.7rem] font-bold uppercase px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Available Now
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="block group h-full">
          <div className="relative rounded-3xl overflow-hidden p-[2px] h-full block opacity-60 cursor-not-allowed">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,#f43f5e_360deg)] animate-spin-slow"></div>
            <div className="absolute inset-0 bg-[conic-gradient(from_180deg,transparent_0_300deg,#fb7185_360deg)] animate-spin-slow"></div>
            <div className="relative bg-gradient-to-br from-slate-100 dark:from-slate-900 to-rose-950 rounded-[22px] border border-dashed border-slate-900/10 dark:border-white/20 p-6 md:p-8 text-center flex flex-col items-center shadow-2xl shadow-black/20 h-full transition-all duration-300">
              <div className="w-16 h-16 bg-slate-900/5 dark:bg-white/5 rounded-2xl mb-6 flex items-center justify-center text-rose-400">
                <NotebookTabs className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-50">SSC ICT</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Targeted for 2024 & 2025 candidates.</p>
              <div className="mt-auto text-[0.7rem] font-bold uppercase px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                Coming Soon
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="block group h-full">
          <div className="relative rounded-3xl overflow-hidden p-[2px] h-full block opacity-60 cursor-not-allowed">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,#f43f5e_360deg)] animate-spin-slow"></div>
            <div className="absolute inset-0 bg-[conic-gradient(from_180deg,transparent_0_300deg,#fb7185_360deg)] animate-spin-slow"></div>
            <div className="relative bg-gradient-to-br from-slate-100 dark:from-slate-900 to-purple-950 rounded-[22px] border border-dashed border-slate-900/10 dark:border-white/20 p-6 md:p-8 text-center flex flex-col items-center shadow-2xl shadow-black/20 h-full transition-all duration-300">
              <div className="w-16 h-16 bg-slate-900/5 dark:bg-white/5 rounded-2xl mb-6 flex items-center justify-center text-purple-400">
                <BriefcaseBusiness className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-50">Job IT</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">IT preparation for BCS & Bank jobs.</p>
              <div className="mt-auto text-[0.7rem] font-bold uppercase px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                Coming Soon
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="block group h-full">
          <div className="relative rounded-3xl overflow-hidden p-[2px] h-full block opacity-60 cursor-not-allowed">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,#f43f5e_360deg)] animate-spin-slow"></div>
            <div className="absolute inset-0 bg-[conic-gradient(from_180deg,transparent_0_300deg,#fb7185_360deg)] animate-spin-slow"></div>
            <div className="relative bg-gradient-to-br from-slate-100 dark:from-slate-900 to-emerald-950 rounded-[22px] border border-dashed border-slate-900/10 dark:border-white/20 p-6 md:p-8 text-center flex flex-col items-center shadow-2xl shadow-black/20 h-full transition-all duration-300">
              <div className="w-16 h-16 bg-slate-900/5 dark:bg-white/5 rounded-2xl mb-6 flex items-center justify-center text-emerald-400">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-50">NTRCA ICT</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Teaching registration exam prep.</p>
              <div className="mt-auto text-[0.7rem] font-bold uppercase px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                Coming Soon
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Quiz Exam Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="px-4 sm:px-6 md:px-16 mb-20 max-w-4xl mx-auto w-full"
      >
        <Link to="/monthly-quiz" className="block group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white/[0.08] backdrop-blur-3xl border border-slate-900/10 dark:border-white/20 rounded-3xl p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden shadow-2xl shadow-indigo-500/10">
            <div className="absolute top-0 right-0 bg-sky-500/80 backdrop-blur-md text-white px-6 py-1 rounded-bl-2xl font-bold font-mono text-xs shadow-lg border-b border-l border-slate-900/10 dark:border-white/10 uppercase">
              Upcoming
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 break-words">HSC ICT Monthly Quiz Exam</h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-6 font-medium leading-8">Join the biggest HSC ICT Quiz in Bangladesh. Test your skills, compete with thousands, and win exciting prizes!</p>
              
              <div className="mb-6">
                <Countdown />
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <span className="inline-flex items-center gap-2 bg-slate-900/5 dark:bg-white/10 px-4 py-2 rounded-full text-sm font-semibold border border-slate-900/10 dark:border-white/10 shadow-inner"><Trophy className="w-4 h-4 text-amber-400" /> 30 Marks</span>
                <span className="inline-flex items-center gap-2 bg-slate-900/5 dark:bg-white/10 px-4 py-2 rounded-full text-sm font-semibold border border-slate-900/10 dark:border-white/10 shadow-inner"><Timer className="w-4 h-4 text-sky-400" /> 30 Minutes</span>
                <span className="inline-flex items-center gap-2 bg-slate-900/5 dark:bg-white/10 px-4 py-2 rounded-full text-sm font-semibold border border-slate-900/10 dark:border-white/10 shadow-inner"><CreditCard className="w-4 h-4 text-emerald-400" /> 20 TK Entry</span>
              </div>
            </div>
            
            <div className="shrink-0 w-full md:w-auto">
              <div className="w-full text-center px-8 py-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl font-bold text-lg text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border border-slate-900/10 dark:border-white/20">
                Join Quiz Exam <Rocket className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>
      </motion.section>

      <MentorSection />
    </motion.div>
  );
}
