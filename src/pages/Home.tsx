import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Countdown from '../components/Countdown';
import { BookOpen, BriefcaseBusiness, CreditCard, GraduationCap, NotebookTabs, Rocket, Timer, Trophy, Video, Users, Star, User, ChevronDown, Zap, ArrowRight } from 'lucide-react';
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
      className="scroll-mt-28 px-4 sm:px-6 md:px-16 mb-16 md:mb-20 w-full"
    >
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-red-500/20 bg-slate-50/50 dark:bg-slate-900/40 p-6 md:p-10 shadow-2xl shadow-red-900/10 backdrop-blur-3xl transition-all duration-500 hover:border-red-400/35">
          <a
            href="https://wa.me/8801518657869"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:bg-emerald-400"
            aria-label="Message mentor on WhatsApp"
          >
            <WhatsAppIcon className="size-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
                <div className="relative size-36 sm:size-48 overflow-hidden rounded-[2rem] border-2 border-red-200/20 bg-black/5 p-1 shadow-xl">
                  <img
                    src={bioImage}
                    alt="Md. Ramjan Sarker"
                    className="size-full rounded-[1.8rem] object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left pt-2">
              <p className="mb-2 text-[0.7rem] font-black uppercase tracking-[0.2em] text-red-500 dark:text-red-400">About the Mentor</p>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight text-slate-900 dark:text-white mb-3">
                Md. Ramjan Sarker
              </h2>
              <div className="inline-block rounded-full border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/10 px-4 py-1.5 text-sm font-bold text-slate-700 dark:text-gray-200 mb-5 shadow-inner">
                সহকারী শিক্ষক, সামসুল হক খান স্কুল এন্ড কলেজ, ঢাকা।
              </div>

              <div className="space-y-5 text-slate-600 dark:text-gray-300">
                <p className="font-semibold flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <GraduationCap className="size-5" />
                  </span>
                  বি.এ (অনার্স), বি.এড (জগন্নাথ বিশ্ববিদ্যালয়) | ই.এম.সি.এস (কুমিল্লা বিশ্ববিদ্যালয়)।
                </p>
                <div className="relative border-l-2 border-red-500/50 pl-5 italic font-medium leading-relaxed bg-slate-900/5 dark:bg-white/5 py-3 rounded-r-xl">
                  "বিগত কয়েক বছর ধরে আমি মাধ্যমিক ও উচ্চ মাধ্যমিক স্তরের শিক্ষার্থীদের ICT এবং বাংলাদেশ ও বিশ্ব পরিচয় সহজভাবে বুঝিয়ে আসছি। আমার লক্ষ্য হলো প্রযুক্তির সঠিক ব্যবহারের মাধ্যমে পড়াশোনাকে সবার জন্য আনন্দদায়ক করা।"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "কোর্সগুলো কি সবার জন্য উন্মুক্ত?", a: "আমাদের কিছু ফ্রি কন্টেন্ট আছে, তবে প্রিমিয়াম ভিডিও ও সাজেশনের জন্য এনরোল করতে হবে।" },
    { q: "কিভাবে কুইজে অংশ নেব?", a: "'Quiz Exam' ট্যাবে গিয়ে সরাসরি লাইভ কুইজে অংশ নেওয়া যাবে।" },
    { q: "পেমেন্ট পদ্ধতি কী?", a: "বিকাশ বা নগদের মাধ্যমে খুব সহজেই পেমেন্ট করা যাবে।" },
    { q: "এখানে কি HSC ICT-এর সম্পূর্ণ সিলেবাস কভার করা হয়েছে?", a: "হ্যাঁ, ১ম থেকে ৬ষ্ঠ অধ্যায় পর্যন্ত প্রতিটি টপিকের বিস্তারিত নোট, ভিডিও এবং বোর্ড স্ট্যান্ডার্ড প্রশ্ন এখানে পাওয়া যাবে।" },
    { q: "৩য় অধ্যায় (সংখ্যা পদ্ধতি) এবং ৫ম অধ্যায় (সি প্রোগ্রামিং) কি সহজভাবে বুঝানো হয়েছে?", a: "অবশ্যই! কঠিন টপিকগুলো রিয়েল-লাইফ উদাহরণ এবং লজিক গেট/কোডিং প্র্যাকটিসের মাধ্যমে সহজভাবে বুঝানো হয়েছে।" },
    { q: "এখান থেকে কি বোর্ড পরীক্ষার জন্য স্পেশাল সাজেশন পাওয়া যাবে?", a: "আমাদের 'ICT Short Suggestion' সেকশনে পরীক্ষার জন্য ১০০% কমন উপযোগী সৃজনশীল ও বহুনির্বাচনী প্রশ্নের স্পেশাল পিডিএফ ও সলিউশন দেওয়া হয়।" },
    { q: "আমি কি লেকচার নোটগুলো পিডিএফ (PDF) আকারে ডাউনলোড করতে পারব?", a: "হ্যাঁ, প্রতিটি গুরুত্বপূর্ণ অধ্যায়ের নোট এবং সাজেশন আমাদের এনরোল করা স্টুডেন্টরা ডাউনলোড করার সুযোগ পাবে।" },
    { q: "কোনো টপিক বুঝতে সমস্যা হলে সমাধানের উপায় কী?", a: "আমাদের আছে ডেডিকেটেড মেন্টর সাপোর্ট। তোমরা সরাসরি হোয়াটসঅ্যাপে বা কমেন্ট সেকশনে প্রশ্ন করলে আমরা দ্রুত সমাধান দিয়ে দেব।" },
    { q: "কুইজ টেস্ট দেওয়ার পর কি আমার রেজাল্ট বা প্রগ্রেস দেখতে পারব?", a: "হ্যাঁ, প্রতিটি কুইজের পর অটোমেটেড রেজাল্ট শিট এবং তোমার ভুলের সঠিক ব্যাখ্যা সাথে সাথেই দেখতে পারবে।" }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55 }}
      className="px-4 sm:px-6 md:px-16 mb-20 max-w-4xl mx-auto w-full"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-slate-600 dark:text-gray-300">যেকোনো প্রশ্নের উত্তর পেয়ে যাও এখানে</p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-md border border-slate-900/10 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
            <button 
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-slate-900 dark:text-white hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors"
            >
              <span className="pr-4">{faq.q}</span>
              <ChevronDown className={`size-5 shrink-0 transition-transform duration-300 ${openIdx === idx ? 'rotate-180 text-sky-500' : 'text-slate-400'}`} />
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-5 text-slate-600 dark:text-gray-300 leading-relaxed border-t border-slate-900/5 dark:border-white/5 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default function Home() {
  const phrases = [
    "ঘরে বসেই ICT Mastery",
    "বোর্ড পরীক্ষার ১০০% প্রস্তুতি",
    "সহজ নোটে জটিল টপিক সমাধান",
    "স্মার্ট কুইজে নিজের মেধা যাচাই"
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col"
    >
      <Helmet>
        <title>ICT Toppers | Interactive HSC ICT Platform in Bangladesh</title>
        <meta name="description" content="Practice HSC ICT MCQ, board questions, chapter-wise lessons, smart suggestions, and monthly exams from home with ICT Toppers." />
        <meta property="og:title" content="ICT Toppers | Interactive HSC ICT Platform in Bangladesh" />
        <meta property="og:description" content="Practice HSC ICT MCQ, board questions, chapter-wise lessons, smart suggestions, and monthly exams from home with ICT Toppers." />
        <meta property="og:image" content="https://icttoppers.com/logo.jpeg" />
        <meta property="og:image:secure_url" content="https://icttoppers.com/logo.jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ICT Toppers Logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://icttoppers.com/logo.jpeg" />
        <link rel="canonical" href="https://icttoppers.com/" />
      </Helmet>

      <section className="px-4 sm:px-6 md:px-16 mt-8 md:mt-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 break-words">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-2 sm:mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
              className="relative flex items-center justify-center overflow-hidden rounded-[1.2rem] sm:rounded-[1.5rem] p-[3px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-slate-900/5 dark:ring-white/10"
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,#38bdf8_360deg)] animate-[spin_3s_linear_infinite]"></div>
              <div className="absolute inset-0 bg-[conic-gradient(from_180deg,transparent_0_300deg,#f43f5e_360deg)] animate-[spin_3s_linear_infinite]"></div>
              
              <div className="relative rounded-[1.1rem] sm:rounded-[1.35rem] bg-gradient-to-br from-white to-slate-50/95 p-1.5 sm:p-2 md:p-2.5 backdrop-blur-xl dark:from-slate-800 dark:to-slate-900/95 overflow-hidden flex items-center justify-center">
                <motion.div
                  animate={{ 
                    y: [-4, 4, -4],
                    boxShadow: [
                      "0px 0px 0px 0px rgba(56, 189, 248, 0)",
                      "0px 10px 20px -5px rgba(56, 189, 248, 0.4)",
                      "0px 0px 0px 0px rgba(56, 189, 248, 0)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-[1.1rem] sm:rounded-[1.35rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-transparent to-pink-400/20 opacity-50 mix-blend-overlay"></div>
                <img 
                  src="/logo.jpeg" 
                  alt="ICT Toppers Logo" 
                  className="relative z-10 h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-xl sm:rounded-[1.1rem] object-cover shadow-sm"
                />
              </div>
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-900 dark:text-white block bg-clip-text"
            >
              ICT Toppers
            </motion.span>
          </div>
          <div className="h-24 sm:h-28 md:h-24 lg:h-32 flex items-center justify-center mt-2 px-2 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -50, filter: "blur(8px)", scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-500 to-red-600 inline-block w-full max-w-full drop-shadow-sm"
              >
                {phrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="text-base md:text-[1.15rem] text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed md:leading-[1.8] font-medium px-2"
        >
          ICT কি কঠিন লাগে? আর নয় দুশ্চিন্তা! বাংলাদেশের প্রথম <span className="text-sky-500 dark:text-sky-400 font-bold">ইন্টারঅ্যাকটিভ লার্নিং প্ল্যাটফর্মে</span> জটিল সব অধ্যায় বুঝে নাও একদম পানির মতো <span className="text-amber-600 dark:text-amber-400 font-bold">সহজ ভাষায়</span>। স্মার্ট নোট, আনলিমিটেড কুইজ আর মেন্টর সাপোর্ট—সবকিছু এখন <span className="text-sky-500 dark:text-sky-400 font-bold">এক জায়গায়</span>। বাসা থেকেই কনফিউশন কমাও, কনফিডেন্স বাড়াও এবং বোর্ড পরীক্ষার জন্য নিজেকে <span className="text-amber-600 dark:text-amber-400 font-bold">১০০% প্রস্তুত</span> করো।
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.45 }}
          className="mb-12 flex flex-row items-center justify-center gap-2 md:gap-4 px-2 md:px-0"
        >
          <Link to="/syllabus" className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 p-[2px] font-black text-white shadow-[0_0_40px_rgba(225,29,72,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(225,29,72,0.6)] overflow-hidden flex-1 md:flex-none">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_2s_infinite]"></div>
            <div className="relative flex items-center justify-center gap-1.5 md:gap-2 bg-gradient-to-r from-red-600 to-rose-600 px-3 py-2.5 md:px-8 md:py-4 rounded-[14px] w-full border border-white/10">
              <Zap className="size-3.5 md:size-5 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)] group-hover:scale-125 transition-transform duration-300 shrink-0" />
              <span className="tracking-wide text-[10px] md:text-base leading-none whitespace-nowrap">Start HSC ICT</span>
            </div>
          </Link>
          <Link to="/monthly-quiz" className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-2xl border border-slate-900/10 bg-white/75 px-3 py-2.5 md:px-8 md:py-4 font-black text-slate-900 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-400/30 hover:text-red-600 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-red-400 flex-1 md:flex-none shadow-xl hover:shadow-red-500/20 leading-none">
            <span className="tracking-wide text-[10px] md:text-base whitespace-nowrap">Join Quiz</span>
            <Trophy className="size-3.5 md:size-5 text-amber-500 group-hover:scale-110 transition-transform shrink-0" />
          </Link>
        </motion.div>
      </section>

      {/* Stats Counter Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="px-2 sm:px-6 md:px-16 mb-16 max-w-5xl mx-auto w-full grid grid-cols-3 gap-2 md:gap-6"
      >
        <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-xl border border-sky-500/20 rounded-xl md:rounded-2xl p-2 md:p-6 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(56,189,248,0.1)] hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-shadow group">
          <Video className="w-4 h-4 md:w-10 md:h-10 text-sky-400 mb-1 md:mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-xs md:text-3xl font-black text-slate-900 dark:text-white mb-0.5 md:mb-1 leading-none">১০০+</h3>
          <p className="text-[8px] md:text-base text-slate-600 dark:text-gray-300 font-bold leading-none">ভিডিও লেসন</p>
        </div>
        <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-xl border border-indigo-500/20 rounded-xl md:rounded-2xl p-2 md:p-6 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-shadow group">
          <BookOpen className="w-4 h-4 md:w-10 md:h-10 text-indigo-400 mb-1 md:mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-xs md:text-3xl font-black text-slate-900 dark:text-white mb-0.5 md:mb-1 leading-none">৫০০০+</h3>
          <p className="text-[8px] md:text-base text-slate-600 dark:text-gray-300 font-bold leading-none">প্র্যাকটিস MCQ</p>
        </div>
        <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-xl border border-emerald-500/20 rounded-xl md:rounded-2xl p-2 md:p-6 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-shadow group">
          <Users className="w-4 h-4 md:w-10 md:h-10 text-emerald-400 mb-1 md:mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-xs md:text-3xl font-black text-slate-900 dark:text-white mb-0.5 md:mb-1 leading-none">১০০০+</h3>
          <p className="text-[8px] md:text-base text-slate-600 dark:text-gray-300 font-bold leading-none">সাকসেস স্টুডেন্ট</p>
        </div>
      </motion.section>

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
      <FAQSection />
    </motion.div>
  );
}
