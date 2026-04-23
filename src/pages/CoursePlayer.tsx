import React, { useState } from 'react';
import { PlayCircle, CheckCircle, Lock, AlertCircle } from 'lucide-react';

const dummyVideos = [
  { id: 1, title: 'Chapter 1: Global Village', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?modestbranding=1&rel=0' },
  { id: 2, title: 'Chapter 1: Virtual Reality', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?modestbranding=1&rel=0' },
  { id: 3, title: 'Chapter 2: Data Communication', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?modestbranding=1&rel=0' },
];

export default function CoursePlayer() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [unlockedUpTo, setUnlockedUpTo] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleQuizSubmit = () => {
    // Mocking a random score between 8 and 20
    const score = Math.floor(Math.random() * 13) + 8;
    setQuizScore(score);

    if (score >= 12) {
      setUnlockedUpTo(prev => Math.max(prev, currentVideo + 1));
    }
  };

  const handleNextVideo = () => {
    setShowQuiz(false);
    setQuizScore(null);
    setCurrentVideo(prev => prev + 1);
  };

  const handleRetry = () => {
    setShowQuiz(false);
    setQuizScore(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        {showQuiz ? (
          <div className="bg-slate-900/5 dark:bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-slate-900/10 dark:border-white/20 text-center">
            {quizScore === null ? (
              <>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Mini Quiz: {dummyVideos[currentVideo].title}</h2>
                <p className="text-slate-600 dark:text-gray-300 mb-8">You must score at least 12 out of 20 to unlock the next class.</p>
                <button 
                  onClick={handleQuizSubmit}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors"
                >
                  Submit Quiz (Mock)
                </button>
              </>
            ) : quizScore >= 12 ? (
              <>
                <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Congratulations!</h2>
                <p className="text-xl text-slate-600 dark:text-gray-300 mb-8">You scored {quizScore}/20. The next class is unlocked.</p>
                <button 
                  onClick={handleNextVideo}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-colors"
                >
                  Go to Next Class
                </button>
              </>
            ) : (
              <>
                <AlertCircle className="w-20 h-20 text-red-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Keep Trying!</h2>
                <p className="text-xl text-slate-600 dark:text-gray-300 mb-8">You scored {quizScore}/20. You need 12 to pass.</p>
                <button 
                  onClick={handleRetry}
                  className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-slate-900 dark:text-white rounded-xl font-bold transition-colors"
                >
                  Continue Previous Class Again
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="bg-black rounded-3xl overflow-hidden aspect-video border border-slate-900/10 dark:border-white/10">
            <iframe 
              src={dummyVideos[currentVideo].url} 
              className="w-full h-full"
              allowFullScreen
              title="Course Video"
            ></iframe>
          </div>
        )}

        {!showQuiz && (
          <div className="flex justify-between items-center bg-slate-900/5 dark:bg-white/5 p-6 rounded-2xl border border-slate-900/10 dark:border-white/10">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{dummyVideos[currentVideo].title}</h2>
            <button 
              onClick={() => setShowQuiz(true)}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors"
            >
              Take Quiz to Unlock Next
            </button>
          </div>
        )}
      </div>

      <div className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-slate-900/10 dark:border-white/10 h-fit">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Course Content</h3>
        <div className="space-y-3">
          {dummyVideos.map((video, idx) => (
            <button
              key={video.id}
              onClick={() => {
                if (idx <= unlockedUpTo) {
                  setCurrentVideo(idx);
                  setShowQuiz(false);
                  setQuizScore(null);
                }
              }}
              disabled={idx > unlockedUpTo}
              className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-colors ${
                currentVideo === idx 
                  ? 'bg-blue-600/40 border border-blue-500/50 text-white' 
                  : idx <= unlockedUpTo
                    ? 'bg-slate-900/5 dark:bg-white/5 hover:bg-slate-900/10 dark:hover:bg-white/10 text-slate-600 dark:text-gray-300'
                    : 'bg-slate-900/5 dark:bg-white/5 opacity-50 cursor-not-allowed text-gray-500'
              }`}
            >
              {idx <= unlockedUpTo ? <PlayCircle className="w-5 h-5 shrink-0" /> : <Lock className="w-5 h-5 shrink-0" />}
              <span className="font-medium truncate">{video.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
