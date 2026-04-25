import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Video, CheckCircle, CreditCard, Clock } from 'lucide-react';
import MockPaymentPopup from '../components/MockPaymentPopup';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLms } from '../context/LmsContext';

export default function Courses() {
  const { user, login } = useAuth();
  const { enrollCourse } = useLms();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{id: string, fee: number, type: string} | null>(null);
  
  // Dummy Countdown State (5 days from now)
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

  const handleJoin = async (courseId: string, fee: number, type: string) => {
    if (!user) {
      await login();
      return;
    }
    setSelectedCourse({ id: courseId, fee, type });
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    if (selectedCourse) {
      enrollCourse(selectedCourse.id, selectedCourse.fee, selectedCourse.type);
    }
    if (selectedCourse?.type === 'RECORDED') {
      navigate('/course-player');
    } else {
      navigate('/live-course-dashboard');
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-10 md:space-y-12 w-full">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">Our Premium Courses</h1>
        <p className="text-base md:text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto leading-8">
          Master HSC ICT with our comprehensive recorded and live courses.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 md:gap-8">
        {/* Course 1: Recorded */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-5 md:p-8 border border-slate-900/10 dark:border-white/10 flex flex-col h-full min-w-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
              <Video className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white break-words">ICT Full Course Recorded</h2>
              <div className="text-3xl font-black text-sky-400 mt-1">৳ 500</div>
            </div>
          </div>

          <div className="space-y-4 mb-8 flex-1">
            <div className="flex items-center gap-3 text-slate-600 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>30 Classes</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>Class Duration: 1 Hour</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>Full Syllabus Covered</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>Lifetime Access to Recordings</span>
            </div>
          </div>

          <button 
            onClick={() => handleJoin('recorded-1', 500, 'RECORDED')}
            className="w-full py-4 px-4 bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/20 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-xl font-bold text-base md:text-lg transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Join Now (bKash / Nagad)
          </button>
        </motion.div>

        {/* Course 2: Live */}
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
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white break-words">HSC ICT Live Course</h2>
              <div className="text-3xl font-black text-pink-400 mt-1">৳ 1500</div>
            </div>
          </div>

          <div className="space-y-4 mb-8 flex-1">
            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>35 Live Classes</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>Class Duration: 1 Hour</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>Board Question Solve</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>Test Paper Solve</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span>University Admission Question Solve</span>
            </div>
          </div>

          <button 
            onClick={() => handleJoin('live-1', 1500, 'LIVE')}
            className="w-full py-4 px-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white rounded-xl font-bold text-base md:text-lg transition-all shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Join Now (bKash / Nagad)
          </button>
        </motion.div>
      </div>

      {showPayment && selectedCourse && (
        <MockPaymentPopup 
          challengeId={selectedCourse.id} 
          fee={selectedCourse.fee} 
          onClose={() => setShowPayment(false)} 
          onSuccess={handlePaymentSuccess} 
        />
      )}
    </div>
  );
}
