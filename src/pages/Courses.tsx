import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, CheckCircle, Clock, CreditCard, Info, Video, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLms } from '../context/LmsContext';

type CourseType = 'RECORDED' | 'LIVE';

interface SelectedCourse {
  courseId: string;
  title: string;
  fee: number;
  type: CourseType;
}

const courseCards: SelectedCourse[] = [
  {
    courseId: 'recorded-1',
    title: 'ICT Full Course Recorded',
    fee: 500,
    type: 'RECORDED',
  },
  {
    courseId: 'live-1',
    title: 'HSC ICT Live Course',
    fee: 1500,
    type: 'LIVE',
  },
];

export default function Courses() {
  const { user, login } = useAuth();
  const { enrollCourse } = useLms();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<SelectedCourse | null>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, minutes: 30, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBuy = async (course: SelectedCourse) => {
    if (!user) {
      await login({ redirectTo: `${location.pathname}${location.search}${location.hash}` });
      return;
    }

    if (user.email === 'sarkerramjan2015@gmail.com') {
      enrollCourse(course.courseId, course.fee, course.type);
      navigate(course.type === 'RECORDED' ? '/course-player' : '/live-course-dashboard');
      return;
    }

    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedCourse(null);
  };

  const recordedCourse = courseCards[0];
  const liveCourse = courseCards[1];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-10 md:space-y-12 w-full">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">Our Premium Courses</h1>
        <p className="text-base md:text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto leading-8">
          Master HSC ICT with our comprehensive recorded and live courses.
        </p>
      </div>

      <div className="rounded-3xl border border-amber-400/25 bg-amber-400/10 px-5 py-4 text-sm font-bold text-amber-700 shadow-inner dark:text-amber-200">
        Course checkout is under construction right now. Premium upgrade and Quiz Exam registration payments are active.
      </div>

      <div className="grid md:grid-cols-2 gap-5 md:gap-8">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-5 md:p-8 border border-slate-900/10 dark:border-white/10 flex flex-col h-full min-w-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
              <Video className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white break-words">{recordedCourse.title}</h2>
              <div className="text-3xl font-black text-sky-400 mt-1">BDT {recordedCourse.fee}</div>
            </div>
          </div>

          <div className="space-y-4 mb-8 flex-1">
            {['30 Classes', 'Class Duration: 1 Hour', 'Full Syllabus Covered', 'Lifetime Access to Recordings'].map(feature => (
              <div key={feature} className="flex items-center gap-3 text-slate-600 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleBuy(recordedCourse)}
            className="w-full py-4 px-4 bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/20 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-xl font-bold text-base md:text-lg transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Buy Course
          </button>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-indigo-600/40 to-purple-600/40 backdrop-blur-xl rounded-3xl p-5 md:p-8 pt-14 md:pt-12 border border-indigo-500/30 flex flex-col h-full relative overflow-hidden min-w-0"
        >
          <div className="absolute top-0 right-0 left-0 sm:left-auto bg-red-500 text-white px-4 py-1.5 sm:rounded-bl-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            Starts in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-slate-900/5 dark:bg-white/10 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white break-words">{liveCourse.title}</h2>
              <div className="text-3xl font-black text-pink-400 mt-1">BDT {liveCourse.fee}</div>
            </div>
          </div>

          <div className="space-y-4 mb-8 flex-1">
            {[
              '35 Live Classes',
              'Class Duration: 1 Hour',
              'Board Question Solve',
              'Test Paper Solve',
              'University Admission Question Solve',
            ].map(feature => (
              <div key={feature} className="flex items-center gap-3 text-gray-200">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleBuy(liveCourse)}
            className="w-full py-4 px-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white rounded-xl font-bold text-base md:text-lg transition-all shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Buy Course
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showPaymentModal && selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePaymentModal}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-300/20 bg-slate-950 p-6 text-white shadow-2xl"
            >
              <button
                type="button"
                onClick={closePaymentModal}
                className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-white/10 p-2 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Close payment modal"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-200">
                  <Info className="h-8 w-8" />
                </div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-amber-200">Coming Soon</p>
                <h3 className="mb-3 text-2xl font-black">{selectedCourse.title}</h3>
                <p className="mb-6 text-sm font-semibold leading-7 text-slate-300">
                  এই কোর্স পেমেন্ট মেথডটি আপাতত আন্ডার কনস্ট্রাকশন। Premium upgrade এবং Quiz Exam registration এখন চালু আছে।
                </p>
                <button
                  type="button"
                  onClick={closePaymentModal}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 font-black text-slate-950 transition hover:brightness-110"
                >
                  ঠিক আছে
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
