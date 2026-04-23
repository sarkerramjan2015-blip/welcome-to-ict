import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ictSyllabus } from '../data/ict-syllabus';
import { FileText, PlayCircle, CheckCircle, Edit3, ArrowLeft, HelpCircle, Clock, Award, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import TopicView from '../components/ui/TopicView';

type Tab = 'notes' | 'video' | 'short_qs' | 'practice' | 'cq' | 'quiz';

const QuestionText = ({ text }: { text: string }) => {
  const match = text.match(/^(.*?)(?:\s*\[([^\]]+)\])?$/);
  if (!match) return <span>{text}</span>;
  
  const questionPart = match[1];
  const boardPart = match[2];
  
  return (
    <span>
      {questionPart}
      {boardPart && (
        <span className="inline-block ml-3 px-3 py-1 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-900/50 dark:to-orange-900/40 text-amber-800 dark:text-amber-300 text-[0.8rem] sm:text-xs font-black rounded-lg border border-amber-300/50 dark:border-amber-700/50 shadow-sm whitespace-nowrap tracking-wider align-middle mb-1 uppercase">
          {boardPart}
        </span>
      )}
    </span>
  );
};

export default function TopicDetails() {
  const { topicId } = useParams();
  const [activeTab, setActiveTab] = useState<Tab>('notes');

  // Find the topic from our static syllabus data
  let currentTopic = null;
  let parentChapter = null;

  for (const chapter of ictSyllabus) {
    const found = chapter.topics.find(t => t.id === topicId);
    if (found) {
      currentTopic = found;
      parentChapter = chapter;
      break;
    }
  }

  // Practice Mode State
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});

  // Quiz Mode State
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && !quizSubmitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !quizSubmitted) {
      handleQuizSubmit();
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, quizSubmitted]);

  const handleQuizSubmit = () => {
    if (!currentTopic) return;
    let newScore = 0;
    currentTopic.quizMcqs.forEach((mcq, idx) => {
      if (quizAnswers[idx] === mcq.correct) {
        newScore++;
      }
    });
    setScore(newScore);
    setQuizSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!currentTopic || !parentChapter) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">Topic not found.</h2>
        <Link to="/syllabus" className="text-teal-500 hover:text-teal-400 font-medium bg-teal-500/10 px-6 py-3 rounded-full">Go Back to Syllabus</Link>
      </div>
    );
  }

  const tabs = [
    { id: 'notes', label: 'স্পেশাল নোটস', icon: FileText },
    { id: 'video', label: 'ভিডিও লেকচার', icon: PlayCircle },
    { id: 'short_qs', label: 'জ্ঞানমূলক ও অনুধাবনমূলক', icon: HelpCircle },
    { id: 'practice', label: 'MCQ Practice Mode', icon: CheckCircle },
    { id: 'cq', label: 'CQ (সৃজনশীল)', icon: Edit3 },
    { id: 'quiz', label: 'MCQ Quiz Mode (10 Mins)', icon: Clock },
  ];

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    }
    if (newIndex !== index) {
      setActiveTab(tabs[newIndex].id as Tab);
      const btn = document.getElementById(`tab-${tabs[newIndex].id}`);
      if (btn) btn.focus();
    }
  };

  return (
    <div className="flex-1 flex flex-col px-4 md:px-8 py-8 md:py-12 max-w-6xl mx-auto w-full relative z-20">
      
      {/* Navigation Breadcrumb */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 flex items-center gap-4"
      >
        <Link 
          to={`/chapters/${parentChapter.id}/topics`}
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/60 dark:border-white/10 shadow-sm"
        >
          <ArrowLeft size={18} />
          <span className="font-medium text-sm hidden sm:inline">Back to {parentChapter.title}</span>
          <span className="font-medium text-sm sm:hidden">Back</span>
        </Link>
      </motion.div>

      {/* Persistent Premium Hero Header */}
      <div className="relative rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl ring-1 ring-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-800 z-0"></div>
        {currentTopic.thumbnail && (
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-40">
            <img src={currentTopic.thumbnail} alt={currentTopic.title} className="w-full h-full object-cover" draggable="false" />
          </div>
        )}
        <div className="relative z-10 px-8 py-12 md:px-16 md:py-20 flex flex-col justify-end text-white h-full bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-emerald-50 font-semibold text-sm mb-6 border border-white/30 shadow-sm">
              Topic Details
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-lg text-balance">
              {currentTopic.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-4" role="tablist">
        <AnimatePresence>
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id as Tab)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={cn(
                  "relative flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all whitespace-nowrap outline-none focus:ring-2 focus:ring-indigo-400 overflow-hidden",
                  isActive 
                    ? "text-white shadow-[0_0_20px_rgba(79,70,229,0.5)] scale-100 ring-1 ring-indigo-500/50" 
                    : "bg-slate-800/50 dark:bg-white/10 text-slate-400 dark:text-slate-400 hover:bg-slate-700/50 dark:hover:bg-white/20 hover:text-white dark:hover:text-white scale-95 hover:scale-100 backdrop-blur-md"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTabBadge" 
                    className="absolute inset-0 bg-indigo-600 z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={18} className={cn(isActive ? "animate-pulse" : "")}/> 
                  {tab.label}
                </span>
              </button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Main Tab Rendering wrapped in AnimatePresence for smooth switching */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: NOTES */}
          {activeTab === 'notes' && (
            <motion.div key="notes" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              <TopicView 
                topic={currentTopic}
                onTakeQuiz={() => {
                  setActiveTab('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            </motion.div>
          )}

          {/* TAB 2: VIDEO */}
          {activeTab === 'video' && (
            <motion.div key="video" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
              className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-glass-inset rounded-[2.5rem] p-8 md:p-12 mb-20"
            >
              <div className="w-full flex items-center justify-between mb-8 border-b border-indigo-500/10 dark:border-indigo-400/10 pb-6">
                <h2 className="text-2xl font-black text-indigo-700 dark:text-indigo-400 flex items-center gap-3">
                  <PlayCircle className="text-indigo-500" /> ভিডিও লেকচার
                </h2>
                {(!currentTopic.video_url || currentTopic.video_url.trim() === '') && (
                  <span className="text-xs font-bold px-4 py-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full border border-amber-500/20 animate-pulse">
                    Coming Soon
                  </span>
                )}
              </div>
              
              {currentTopic.video_url && currentTopic.video_url.trim() !== '' ? (
                <div className="relative aspect-video w-full lg:max-w-4xl mx-auto rounded-3xl overflow-hidden bg-slate-100/50 dark:bg-slate-950/50 backdrop-blur-3xl ring-1 ring-slate-900/5 dark:ring-white/10 shadow-2xl group">
                  <div className="absolute inset-0 flex items-center justify-center -z-10 bg-slate-200/50 dark:bg-slate-800/50 animate-pulse">
                    <PlayCircle className="w-12 h-12 text-slate-400 animate-bounce" />
                  </div>
                  <iframe 
                    className="w-full h-full relative z-10"
                    src={(() => {
                      const base = currentTopic.video_url;
                      const params = "rel=0&modestbranding=1&cc_load_policy=1";
                      return base.includes('?') ? `${base}&${params}` : `${base}?${params}`;
                    })()}
                    title="YouTube Topic Lecture" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="relative aspect-video w-full lg:max-w-4xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-slate-900/60 backdrop-blur-3xl ring-1 ring-white/10 shadow-2xl flex flex-col items-center justify-center text-center p-8">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                   <div className="w-24 h-24 mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative shadow-[0_0_50px_rgba(99,102,241,0.2)]">
                      <div className="absolute inset-0 rounded-full border-t-2 border-indigo-400 animate-spin opacity-70"></div>
                      <PlayCircle className="w-10 h-10 text-indigo-300 ml-1 opacity-50" />
                   </div>
                   <h3 className="text-3xl font-black text-white mb-4 tracking-tight drop-shadow-md">Video is Coming Soon!</h3>
                   <p className="text-indigo-200 text-lg max-w-lg mx-auto font-medium leading-relaxed opacity-80">
                      We are currently recording premium video lectures for this topic. Please stay tuned!
                   </p>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: SHORT QUESTIONS */}
          {activeTab === 'short_qs' && (
            <motion.div key="short_qs" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
              className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-glass-inset rounded-[2.5rem] p-8 md:p-10 mb-20"
            >
              <h2 className="text-2xl font-black mb-8 text-fuchsia-700 dark:text-fuchsia-400 border-b border-white/30 dark:border-white/10 pb-6 flex items-center gap-3">
                <HelpCircle /> জ্ঞানমূলক ও অনুধাবনমূলক প্রশ্ন
              </h2>
              {currentTopic.shortQuestions && currentTopic.shortQuestions.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {currentTopic.shortQuestions.map((sq, idx) => (
                    <div key={idx} className="bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex-1 pr-4 leading-relaxed">
                          <span className="text-fuchsia-600 dark:text-fuchsia-400 mr-2 border-b-2 border-fuchsia-500/30">প্র:</span> <QuestionText text={sq.q} />
                        </h3>
                        <span className={cn(
                          "text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm tracking-wide",
                          sq.type === 'জ্ঞানমূলক' ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 ring-1 ring-sky-500/20" : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 ring-1 ring-indigo-500/20"
                        )}>
                          {sq.type}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed border-l-4 border-fuchsia-500/30 pl-5 bg-fuchsia-50/30 dark:bg-slate-900/30 py-3 rounded-r-xl">
                        <span className="font-extrabold text-slate-900 dark:text-white mr-2">উ:</span> {sq.a}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center opacity-70">
                   <HelpCircle className="w-16 h-16 text-slate-400 mb-4" />
                   <p className="text-lg font-medium text-slate-500">No short questions available for this topic yet.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: PRACTICE MCQ */}
          {activeTab === 'practice' && (
            <motion.div key="practice" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
              className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-glass-inset rounded-[2.5rem] p-8 md:p-10 mb-20"
            >
              <h2 className="text-2xl font-black mb-8 text-sky-600 dark:text-sky-400 border-b border-white/30 dark:border-white/10 pb-6 flex items-center gap-3">
                <CheckCircle /> MCQ Practice Mode
              </h2>
              {currentTopic.practiceMcqs && currentTopic.practiceMcqs.length > 0 ? (
                <div className="flex flex-col gap-8">
                  {currentTopic.practiceMcqs.map((mcq, idx) => {
                    const selectedOption = practiceAnswers[idx];
                    const isAnswered = selectedOption !== undefined;
                    const isCorrect = selectedOption === mcq.correct;

                    return (
                      <div key={idx} className="bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100 leading-relaxed block">
                          <span className="text-slate-400 mr-2">{idx + 1}.</span> <QuestionText text={mcq.q} />
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          {mcq.options.map((opt, oIdx) => {
                            let btnClass = "bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 shadow-sm";
                            
                            if (isAnswered) {
                              if (opt === mcq.correct) {
                                btnClass = "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-400 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-400/50";
                              } else if (opt === selectedOption) {
                                btnClass = "bg-rose-100 dark:bg-rose-500/20 border-rose-400 dark:border-rose-500/50 text-rose-800 dark:text-rose-300 ring-2 ring-rose-400/50 opacity-90";
                              } else {
                                btnClass = "bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60 cursor-not-allowed";
                              }
                            }

                            return (
                              <button 
                                key={oIdx} 
                                disabled={isAnswered}
                                onClick={() => setPracticeAnswers(prev => ({ ...prev, [idx]: opt }))}
                                className={cn("px-6 py-4 rounded-2xl border font-bold text-left transition-all", btnClass)}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        
                        <AnimatePresence>
                          {isAnswered && !isCorrect && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/50 rounded-2xl p-5 mt-6 shadow-sm"
                            >
                              <h4 className="text-sm font-black text-sky-600 dark:text-sky-400 mb-2 tracking-wide uppercase">Explanation</h4>
                              <p className="text-slate-700 dark:text-slate-300">{mcq.explanation}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center opacity-70">
                   <HelpCircle className="w-16 h-16 text-slate-400 mb-4" />
                   <p className="text-lg font-medium text-slate-500">No practice MCQs available.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5: CQ */}
          {activeTab === 'cq' && (
            <motion.div key="cq" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
              className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-glass-inset rounded-[2.5rem] p-8 md:p-10 mb-20"
            >
              <h2 className="text-2xl font-black mb-8 text-indigo-600 dark:text-indigo-400 border-b border-white/30 dark:border-white/10 pb-6 flex items-center gap-3">
                <Edit3 /> Creative Questions (সৃজনশীল প্রশ্ন)
              </h2>
              {currentTopic.cqs && currentTopic.cqs.length > 0 ? (
                <div className="flex flex-col gap-10">
                  {currentTopic.cqs.map((cq, idx) => (
                    <div key={idx} className="bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-sm">
                      <div className="mb-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/30 rounded-2xl shadow-inner">
                        <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> উদ্দীপক (Stem)
                        </h4>
                        <p className="text-slate-800 dark:text-slate-200 leading-loose text-lg font-medium"><QuestionText text={cq.stem} /></p>
                      </div>
                      <div className="flex flex-col gap-5 pl-2">
                        <div className="bg-white dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                          <span className="font-black text-indigo-500 dark:text-indigo-400 text-lg mr-3">গ)</span>
                          <span className="text-slate-700 dark:text-slate-300 font-medium text-lg">{cq.qC}</span>
                          <span className="ml-4 text-[10px] font-black uppercase px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 shadow-sm">প্রয়োগ</span>
                        </div>
                        <div className="bg-white dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                          <span className="font-black text-indigo-500 dark:text-indigo-400 text-lg mr-3">ঘ)</span>
                          <span className="text-slate-700 dark:text-slate-300 font-medium text-lg">{cq.qD}</span>
                          <span className="ml-4 text-[10px] font-black uppercase px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 shadow-sm">উচ্চতর দক্ষতা</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center opacity-70">
                   <Edit3 className="w-16 h-16 text-slate-400 mb-4" />
                   <p className="text-lg font-medium text-slate-500">No creative questions available.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 6: QUIZ MODE */}
          {activeTab === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
              className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-glass-inset rounded-[2.5rem] p-6 md:p-12 mb-20"
            >
              {!quizStarted && !quizSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-24 h-24 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-[2rem] flex items-center justify-center mb-8 ring-4 ring-teal-500/20 shadow-xl rotate-3 hover:rotate-0 transition-all duration-300">
                    <Clock size={48} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">10-Minute Quiz Challenge</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-lg mb-10 text-lg leading-relaxed">
                    Test your knowledge on <span className="font-bold text-slate-800 dark:text-slate-200">"{currentTopic.title}"</span>. You have 10 minutes to answer {currentTopic.quizMcqs.length} questions. Answers will be revealed at the end.
                  </p>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="px-10 py-5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-black rounded-full shadow-2xl shadow-teal-500/40 transition-transform hover:scale-105 active:scale-95 text-lg flex items-center gap-3"
                  >
                    <PlayCircle />
                    Start Quiz Now
                  </button>
                </div>
              ) : quizSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="w-28 h-28 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-[2rem] flex items-center justify-center mb-8 ring-4 ring-emerald-500/20 shadow-xl">
                    <Award size={56} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Quiz Completed!</h2>
                  <p className="text-2xl text-slate-600 dark:text-slate-300 mb-10">
                    Your Score: <span className="text-emerald-500 font-black">{score}</span> / {currentTopic.quizMcqs.length}
                  </p>
                  
                  <div className="w-full text-left mt-8 flex flex-col gap-6">
                    <h3 className="text-2xl font-black border-b border-slate-900/10 dark:border-white/10 pb-6 text-slate-800 dark:text-slate-100">Performance Review</h3>
                    {currentTopic.quizMcqs.map((mcq, idx) => {
                      const selected = quizAnswers[idx];
                      
                      return (
                        <div key={idx} className="bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-sm">
                          <h4 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-200 leading-relaxed block">
                            <span className="text-slate-400 mr-2">{idx + 1}.</span> <QuestionText text={mcq.q} />
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {mcq.options.map((opt, oIdx) => {
                              let btnClass = "bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-400";
                              if (opt === mcq.correct) {
                                btnClass = "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-400 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 font-bold ring-2 ring-emerald-500/30";
                              } else if (opt === selected) {
                                btnClass = "bg-rose-50 dark:bg-rose-500/10 border-rose-300 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 opacity-90 ring-1 ring-rose-500/20";
                              }
                              return (
                                <div key={oIdx} className={cn("p-5 rounded-2xl border font-semibold", btnClass)}>
                                  {opt}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <button 
                    onClick={() => {
                      setQuizStarted(false);
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                      setTimeLeft(600);
                      setScore(0);
                    }}
                    className="mt-14 px-8 py-4 bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 text-slate-900 dark:text-white font-bold rounded-full transition-colors flex items-center gap-2"
                  >
                    <Clock size={18} />
                    Retake Quiz
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between border-b border-white/40 dark:border-white/10 pb-6 mb-8 sticky top-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl z-10 py-5 rounded-[2rem] px-6 shadow-xl ring-1 ring-white/50 dark:ring-white/10">
                    <h2 className="text-2xl font-black text-teal-600 dark:text-teal-400 tracking-tight">Quiz in Progress</h2>
                    <div className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-lg",
                      timeLeft < 60 ? "bg-rose-500/20 text-rose-600 dark:text-rose-400 animate-pulse ring-2 ring-rose-500/30" : "bg-teal-500/10 text-teal-700 dark:text-teal-300 ring-1 ring-teal-500/20"
                    )}>
                      <Clock size={20} />
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-10 mb-10">
                    {currentTopic.quizMcqs.map((mcq, idx) => (
                      <div key={idx} className="bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100 leading-relaxed block">
                          <span className="text-slate-400 mr-2">{idx + 1}.</span> <QuestionText text={mcq.q} />
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {mcq.options.map((opt, oIdx) => {
                            const isSelected = quizAnswers[idx] === opt;
                            return (
                              <button 
                                key={oIdx} 
                                onClick={() => setQuizAnswers(prev => ({ ...prev, [idx]: opt }))}
                                className={cn(
                                  "p-5 rounded-2xl border font-bold text-left transition-all active:scale-[0.98]",
                                  isSelected 
                                    ? "bg-teal-500/20 border-teal-500/50 text-teal-800 dark:text-teal-300 shadow-inner ring-2 ring-teal-500/30 scale-[1.02]" 
                                    : "bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 shadow-sm"
                                )}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end sticky bottom-6 z-10 px-4">
                    <button 
                      onClick={handleQuizSubmit}
                      className="px-12 py-5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-black text-lg rounded-full shadow-2xl shadow-teal-500/40 transition-transform hover:scale-105 flex items-center gap-3"
                    >
                      <CheckCircle />
                      Submit Final Answers
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
