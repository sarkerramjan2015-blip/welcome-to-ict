import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && questions.length > 0) {
      handleSubmit();
    }
  }, [timeLeft, questions]);

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
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const isAllAnswered = Object.keys(answers).length === questions.length;
    
    if (!isAllAnswered && timeLeft > 0) {
      alert(`Please answer all questions before submitting. You have answered ${Object.keys(answers).length} out of ${questions.length}.`);
      return;
    }

    if (!window.confirm("Are you sure you want to submit your exam? You cannot change your answers after submission.")) {
      return;
    }
    
    setSubmitting(true);
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });

    completeChallengeExam(challengeId, score, questions.length);
    setShowThankYou(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-900 dark:text-white text-xl">Loading Exam Environment...</div>;
  if (questions.length === 0) return <div className="p-8 text-center text-slate-900 dark:text-white">No questions available.</div>;

  if (showThankYou) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center mt-20">
        <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-2xl rounded-3xl p-12 border border-slate-900/10 dark:border-white/20 shadow-2xl shadow-indigo-500/10">
          <CheckCircle className="w-24 h-24 text-emerald-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Exam Completed!</h2>
          <p className="text-xl text-indigo-200 mb-8 font-medium">Your answers have been successfully recorded. Results will be published soon.</p>
          <button 
            onClick={onComplete}
            className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progressPercent = (Object.keys(answers).length / questions.length) * 100;
  const isAllAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="max-w-4xl mx-auto p-6 relative min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-4 z-50 bg-slate-900/5 dark:bg-white/10 backdrop-blur-2xl rounded-3xl p-5 border border-slate-900/10 dark:border-white/20 shadow-2xl shadow-black/20 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex-1 w-full">
          <div className="flex justify-between items-end mb-2">
            <span className="text-slate-900 dark:text-white font-bold text-lg">Question {currentIndex + 1} of {questions.length}</span>
            <span className="text-indigo-300 text-sm font-medium">{Object.keys(answers).length} Answered</span>
          </div>
          <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-sky-400 to-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 text-yellow-400 font-mono text-2xl bg-black/40 px-6 py-3 rounded-2xl border border-yellow-500/30 shadow-inner shrink-0">
          <Clock className="w-6 h-6 animate-pulse" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Main Question Area */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-slate-900/10 dark:border-white/20 shadow-2xl shadow-indigo-500/10 mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-medium text-slate-900 dark:text-white mb-8 leading-relaxed">
              {currentQuestion.question}
            </h2>

            <div className="grid gap-4">
              {currentQuestion.options.map((opt: string, idx: number) => {
                const isSelected = answers[currentQuestion.id] === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(currentQuestion.id, opt)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600/60 to-purple-600/60 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                        : 'bg-black/20 border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-slate-900/10 dark:hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <span className="text-lg">{opt}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-white bg-slate-900/10 dark:bg-white/20' : 'border-gray-500 group-hover:border-gray-400'
                    }`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation & Submit */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-auto pb-8">
        <div className="flex gap-4 w-full sm:w-auto">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex-1 sm:flex-none px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
              currentIndex === 0 
                ? 'bg-slate-900/5 dark:bg-white/5 text-gray-500 cursor-not-allowed border border-slate-900/5 dark:border-white/5' 
                : 'bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-900/20 dark:hover:bg-white/20 border border-slate-900/10 dark:border-white/20 shadow-lg'
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className={`flex-1 sm:flex-none px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border ${
              currentIndex === questions.length - 1
                ? 'bg-slate-900/5 dark:bg-white/5 text-gray-500 cursor-not-allowed border-slate-900/5 dark:border-white/5'
                : 'bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-900/20 dark:hover:bg-white/20 border-slate-900/10 dark:border-white/20 shadow-lg'
            }`}
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`w-full sm:w-auto px-10 py-4 flex items-center justify-center gap-3 rounded-2xl text-lg font-black transition-all shadow-xl ${
            isAllAnswered
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/25 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]'
              : 'bg-slate-900/5 dark:bg-white/10 text-slate-500 dark:text-gray-400 border border-slate-900/10 dark:border-white/10 cursor-not-allowed'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit Exam'}
          <CheckCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
