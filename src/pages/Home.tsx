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
      <div className="mx-auto max-w-4xl">
        <div className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#071426]/95 p-4 shadow-xl shadow-black/25 backdrop-blur-3xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-950/30 sm:p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(239,29,38,0.16),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(18,161,80,0.15),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_46%)]" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="relative grid items-center gap-6 md:grid-cols-[0.56fr_1.44fr] md:gap-7">
            <div className="flex flex-col items-center text-center">
              <div className="mentor-photo-ring size-32 rounded-full sm:size-36 md:size-40">
                <div className="relative size-full overflow-hidden rounded-full border border-white/15 bg-[#071426] p-1.5 shadow-2xl shadow-black/35">
                  <img
                    src={bioImage}
                    alt="Mohammad Ramjan Mia Sarker"
                    className="size-full rounded-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="mt-5 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-700">
                ICT Mentor
              </div>
            </div>

            <div className="min-w-0 text-center md:text-left">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.26em] text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-700">মেন্টর পরিচিতি</p>
              <h2 className="text-2xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-700 sm:text-3xl md:text-[2.45rem]">
                মোহাম্মদ রমজান সরকার
              </h2>
              <p className="mentor-gradient-text mt-1 text-transparent bg-clip-text text-sm font-bold leading-7 sm:text-base">
                Mohammad Ramjan Mia Sarker
              </p>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.055] p-3 text-left shadow-inner">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-xl border border-red-300/20 bg-red-400/10 text-red-200">
                    <BookOpen className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.66rem] font-black uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-700">Primary Role</p>
                    <p className="mentor-gradient-text mt-1 break-words text-transparent bg-clip-text text-sm font-semibold leading-6 sm:text-[0.95rem]">
                      Assistant Teacher, Shamsul Hoque Khan School & College
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid gap-3">
                <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-xl border border-red-300/20 bg-red-400/10 text-red-200">
                    <BriefcaseBusiness className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.66rem] font-black uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-700">Leadership & Experience</p>
                    <p className="mentor-gradient-text mt-1 break-words text-transparent bg-clip-text text-sm font-medium leading-6 sm:text-[0.95rem]">
                      Head of ICT @ Troyee | Instructor @ Udvash–Unmesh Academic Care | Treasurer @ SHKSC Photography Club
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-xl border border-red-300/20 bg-red-400/10 text-red-200">
                    <GraduationCap className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.66rem] font-black uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-700">Academic Background</p>
                    <p className="mentor-gradient-text mt-1 break-words text-transparent bg-clip-text text-sm font-medium leading-6 sm:text-[0.95rem]">
                      EMCS (Computer Science), Cumilla University | B.Ed & B.A. (Hons) Philosophy, Jagannath University
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-xl border border-red-300/20 bg-red-400/10 text-red-200">
                    <Trophy className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.66rem] font-black uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-700">Key Achievement</p>
                    <p className="mentor-gradient-text mt-1 break-words text-transparent bg-clip-text text-sm font-medium leading-6 sm:text-[0.95rem]">
                      "Successfully guided 500+ students to top public universities using modern, analytical, and ICT-based teaching methods."
                    </p>
                  </div>
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
          <span className="text-slate-900 dark:text-white">ঘরে বসেই ICT এর</span><br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-500 to-red-600">সকল সমাধান</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 md:mb-12 leading-8 md:leading-relaxed"
        >
          ঘরে বসেই HSC ICT এর প্রস্তুতি নিতে চোখ রাখো আমাদের অধ্যায় ভিত্তিক কোর্স সমূহে। বোর্ড স্ট্যান্ডার্ড নোট, কুইজ ও সিকিউরিটি প্রশ্নের সমাধান সহ থাকছে আরও অনেক কিছু।
        </motion.p>
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
