import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Clock, CheckCircle, Lock, ShieldAlert, Download, Facebook, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { ictSyllabus } from '../data/ict-syllabus';
import { useLms } from '../context/LmsContext';

interface Props {
  challengeId: string;
  onComplete: () => void;
}

export default function ChallengeExam({ challengeId, onComplete }: Props) {
  const { completeChallengeExam } = useLms();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const scorecardRef = useRef<HTMLDivElement>(null);
  
  const [offenseCount, setOffenseCount] = useState(0);
  const [showCheatWarning, setShowCheatWarning] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmit = useCallback(async (forceSubmit = false) => {
    if (submitting || showThankYou) return;

    if (!forceSubmit) {
      const isAllAnswered = Object.keys(answers).length === questions.length;
      if (!isAllAnswered && timeLeft > 0) {
        alert(`Please answer all questions before submitting. You have answered ${Object.keys(answers).length} out of ${questions.length}.`);
        return;
      }
      if (!window.confirm("Are you sure you want to submit your exam? You cannot change your answers after submission.")) {
        return;
      }
    }
    
    setSubmitting(true);
    const secureScore = await completeChallengeExam(challengeId, answers, questions.length);

    setFinalScore(secureScore);
    setShowThankYou(true);
  }, [answers, questions, timeLeft, submitting, showThankYou, challengeId, completeChallengeExam]);

  useEffect(() => {
    if (questions.length > 0 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && questions.length > 0 && !submitting && !showThankYou) {
      handleSubmit(true);
    }
  }, [timeLeft, questions, handleSubmit, submitting, showThankYou]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !submitting && !showThankYou) {
        setOffenseCount(prev => {
          const newCount = prev + 1;
          if (newCount === 1) {
            setShowCheatWarning(true);
          } else if (newCount >= 2) {
            handleSubmit(true);
          }
          return newCount;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [submitting, showThankYou, handleSubmit]);

  const fetchQuestions = async () => {
    const generatedQuestions = ictSyllabus
      .flatMap(chapter => chapter.topics.flatMap(topic => topic.quizMcqs.map((mcq, index) => ({
        id: `${topic.id}-${index}`,
        question: mcq.q,
        options: mcq.options,
        correctAnswer: mcq.correct,
      }))))
      .slice(0, 30);
    setQuestions(generatedQuestions);
    setLoading(false);
  };

  const handleSelect = (questionId: string, option: string) => {
    if (answers[questionId]) return;
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-900 dark:text-white text-xl font-medium tracking-tight">Loading Exam Environment...</div>;
  if (questions.length === 0) return <div className="p-8 text-center text-slate-900 dark:text-white">No questions available.</div>;

  if (showThankYou) {
    const timeTakenSeconds = (30 * 60) - timeLeft;
    const timeTakenStr = `${Math.floor(timeTakenSeconds / 60)}m ${timeTakenSeconds % 60}s`;

    const handleDownloadScorecard = async () => {
      if (!scorecardRef.current) return;
      try {
        const canvas = await html2canvas(scorecardRef.current, { scale: 2, useCORS: true, backgroundColor: null });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `ict-toppers-scorecard-${challengeId}.png`;
        link.click();
      } catch (err) {
        console.error("Failed to generate scorecard", err);
        alert("Failed to download score card. Please try again.");
      }
    };

    const handleFacebookShare = () => {
      handleDownloadScorecard();
      setTimeout(() => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400');
      }, 1500);
    };

    return (
      <div className="max-w-3xl mx-auto p-6 text-center mt-10">
        <div className="flex justify-center mb-8">
          <div 
            ref={scorecardRef}
            className="w-[400px] sm:w-[500px] max-w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 rounded-[2rem] p-8 border border-indigo-500/30 shadow-[0_0_50px_rgba(79,70,229,0.2)] relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full"></div>
            
            <Trophy className="w-20 h-20 text-amber-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
            
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">ICT Mega Quiz</h2>
            <p className="text-indigo-300 font-bold tracking-widest uppercase text-xs mb-6">Achievement Unlocked</p>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-inner mb-6">
              <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-2 tracking-tighter">
                ${finalScore} <span className="text-3xl text-slate-400 font-medium">/ ${questions.length}</span>
              </div>
              <p className="text-slate-300 font-medium">Total Marks Scored</p>
            </div>
            
            <div className="flex justify-between items-center bg-black/20 rounded-xl p-4 border border-white/5 mb-6">
              <div className="text-left">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Time Taken</p>
                <p className="text-lg text-white font-bold">${timeTakenStr}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Accuracy</p>
                <p className="text-lg text-white font-bold">${Math.round((finalScore / questions.length) * 100)}%</p>
              </div>
            </div>
            
            <p className="text-sm font-bold text-indigo-200 mt-4 italic">
              "I just took a test on ICT Toppers!"
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center text-white font-black text-xs">ICT</div>
              <span className="text-xs font-bold text-slate-400 tracking-wider">WWW.ICT-TOPPERS.COM</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button 
            onClick={handleDownloadScorecard}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" /> Download Score Card
          </button>
          
          <button 
            onClick={handleFacebookShare}
            className="w-full sm:w-auto px-8 py-4 bg-[#1877F2] hover:bg-[#1864D2] text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:shadow-[0_0_30px_rgba(24,119,242,0.5)] flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <Facebook className="w-5 h-5" fill="currentColor" /> Share on Facebook
          </button>
        </div>
        
        <button 
          onClick={onComplete}
          className="mt-8 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-semibold underline underline-offset-4 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const progressPercent = (Object.keys(answers).length / questions.length) * 100;
  const isAllAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 relative min-h-screen flex flex-col font-sans">
      <AnimatePresence>
        {showCheatWarning && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 border-2 border-red-500 rounded-3xl p-8 md:p-12 max-w-2xl text-center shadow-[0_0_50px_rgba(239,68,68,0.2)]"
            >
              <ShieldAlert className="w-24 h-24 text-red-500 mx-auto mb-6 animate-pulse drop-shadow-md" />
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Warning: Tab Switching Prohibited</h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-red-200 mb-8 font-medium leading-relaxed">
                We detected that you switched tabs or minimized the window. This is strictly prohibited. <br/><br/>
                <strong className="text-red-600 dark:text-red-400">If you do this one more time, your exam will be automatically submitted immediately!</strong>
              </p>
              <button 
                onClick={() => setShowCheatWarning(false)}
                className="w-full px-10 py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:-translate-y-0.5"
              >
                I Understand, Continue Exam
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-4 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 shadow-lg shadow-indigo-900/5 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center transition-all">
        <div className="flex-1 w-full">
          <div className="flex justify-between items-end mb-3">
            <span className="text-indigo-950 dark:text-white font-bold text-lg md:text-xl tracking-tight">Exam Progress</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">{Object.keys(answers).length} / {questions.length} Answered</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 font-mono text-2xl md:text-3xl font-bold bg-amber-50 dark:bg-amber-950/30 px-6 py-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm shrink-0 tracking-widest">
          <Clock className="w-6 h-6 md:w-8 md:h-8 animate-pulse" strokeWidth={2.5} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6 md:gap-8 pb-12">
        {questions.map((q, qIndex) => {
          const isQuestionLocked = !!answers[q.id];
          return (
            <motion.div 
              key={q.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (qIndex % 5) * 0.1 }}
              className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-10 border transition-all duration-500 ${
                isQuestionLocked 
                  ? 'border-emerald-200 dark:border-emerald-900/50 shadow-md shadow-emerald-500/5' 
                  : 'border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1'
              }`}
            >
              <div className="flex justify-between items-start gap-4 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed tracking-tight">
                  <span className="text-indigo-600 dark:text-indigo-400 font-black mr-3 text-2xl md:text-3xl">${qIndex + 1}.</span> 
                  {q.question}
                </h2>
                <AnimatePresence>
                  {isQuestionLocked && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                      className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800 font-bold text-sm shrink-0 shadow-sm"
                    >
                      <Lock className="w-4 h-4" /> Locked
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {q.options.map((opt: string, idx: number) => {
                  const isSelected = answers[q.id] === opt;
                  
                  let buttonClass = 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-700';
                  let iconBorderClass = 'border-slate-300 dark:border-slate-600 group-hover:border-indigo-400';
                  
                  if (isSelected) {
                    buttonClass = 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/25';
                    iconBorderClass = 'border-white bg-indigo-700';
                  } else if (isQuestionLocked) {
                    buttonClass = 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-70 cursor-not-allowed';
                    iconBorderClass = 'border-slate-200 dark:border-slate-800';
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={!isQuestionLocked ? { scale: 1.02 } : {}}
                      whileTap={!isQuestionLocked ? { scale: 0.98 } : {}}
                      disabled={isQuestionLocked}
                      onClick={() => handleSelect(q.id, opt)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-colors duration-300 flex items-center justify-between group ${buttonClass}`}
                    >
                      <span className={`text-base md:text-lg leading-tight ${isSelected ? 'font-semibold' : 'font-medium'}`}>{opt}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ml-4 ${iconBorderClass}`}>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                              exit={{ scale: 0 }}
                              className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 pb-12">
        <button
          onClick={() => handleSubmit(false)}
          disabled={submitting}
          className={`w-full px-10 py-6 flex items-center justify-center gap-3 rounded-2xl text-2xl font-black transition-all shadow-xl ${
            isAllAnswered
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/25 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1'
              : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 cursor-not-allowed'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit Exam'}
          <CheckCircle className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
