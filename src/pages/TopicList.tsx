import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { FileText, ArrowLeft, Search, BarChart3 } from 'lucide-react';
import { ictSyllabus } from '../data/ict-syllabus';
import ChapterAnalysis from '../components/ui/ChapterAnalysis';
import { chapter1Analysis } from '../data/chapters/chapter1/analysis';
import { chapter2Analysis } from '../data/chapters/chapter2/analysis';
import { chapter3Analysis } from '../data/chapters/chapter3/analysis';
import { chapter4Analysis } from '../data/chapters/chapter4/analysis';
import { chapter5Analysis } from '../data/chapters/chapter5/analysis';
import { chapter6Analysis } from '../data/chapters/chapter6/analysis';

export default function TopicList() {
  const { chapterId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  
  const chapter = ictSyllabus.find(c => c.id === chapterId);
  const analysisData = 
    (chapterId === '1' || chapterId === 'chapter1' || chapterId === 'chap-1' || chapterId === 'chapter-1') ? chapter1Analysis : 
    (chapterId === '2' || chapterId === 'chapter2' || chapterId === 'chap-2' || chapterId === 'chapter-2') ? chapter2Analysis : 
    (chapterId === '3' || chapterId === 'chapter3' || chapterId === 'chap-3' || chapterId === 'chapter-3') ? chapter3Analysis : 
    (chapterId === '4' || chapterId === 'chapter4' || chapterId === 'chap-4' || chapterId === 'chapter-4') ? chapter4Analysis : 
    (chapterId === '5' || chapterId === 'chapter5' || chapterId === 'chap-5' || chapterId === 'chapter-5') ? chapter5Analysis : 
    (chapterId === '6' || chapterId === 'chapter6' || chapterId === 'chap-6' || chapterId === 'chapter-6') ? chapter6Analysis : 
    null;

  if (!chapter) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Chapter not found.</h2>
        <Link to="/syllabus" className="text-sky-400 hover:text-sky-300">Go Back to Syllabus</Link>
      </div>
    );
  }

  const filteredTopics = chapter.topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col px-8 md:px-16 py-12 max-w-7xl mx-auto w-full relative z-20">
      <div className="mb-12">
        <Link to="/syllabus" className="text-sky-400 hover:text-sky-300 text-sm font-medium mb-4 flex items-center gap-2 w-fit">
          <ArrowLeft size={16} /> Back to Chapters
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
              {chapter.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl">
              Select a topic below to explore board notes, video lectures, practice MCQs, and creative questions.
            </p>
          </div>
          
          <button 
            onClick={() => setIsAnalysisOpen(true)}
            className="relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-slate-800 font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:-translate-y-1 transition-all duration-300 whitespace-nowrap shrink-0 border border-white/10 group"
          >
            {/* Shimmer Effect */}
            <div 
              className="absolute inset-0 w-[200%] -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent" 
              style={{ animation: 'shimmer 2.5s infinite linear' }}
            ></div>
            <style>{`
              @keyframes shimmer {
                0% { transform: translateX(-100%) skewX(-15deg); }
                100% { transform: translateX(50%) skewX(-15deg); }
              }
            `}</style>
            
            <BarChart3 size={20} className="text-red-500 relative z-10" />
            <span className="relative z-10 bg-gradient-to-r from-red-500 to-white text-transparent bg-clip-text font-bold">
              চ্যাপ্টার অ্যানালাইসিস (Board Tracker)
            </span>
          </button>
        </div>
      </div>

      <div className="mb-10 relative z-20">
        <div className="relative max-w-lg w-full group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 dark:group-focus-within:text-sky-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search topics by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/30 dark:bg-slate-900/40 backdrop-blur-md border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-white rounded-full py-4 pl-12 pr-6 outline-none focus:border-indigo-400 dark:focus:border-sky-400 focus:bg-white/50 dark:focus:bg-slate-900/60 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.1)] transition-all placeholder-slate-500 dark:placeholder-slate-400 font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={`/topics/${topic.id}`} className="group block h-full">
                  <div className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl shadow-black/20 hover:bg-slate-900/10 dark:hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                    <div className="h-40 w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-slate-900 via-transparent to-transparent z-10"></div>
                      <img 
                        src={topic.thumbnail} 
                        alt={topic.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-sky-400 border border-slate-900/10 dark:border-white/10">
                        Topic {chapter.topics.findIndex(t => t.id === topic.id) + 1}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                          {topic.title}
                        </h3>
                        {topic.importance && (
                          <span className={`shrink-0 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border ${
                            topic.importance === 'High' ? 'bg-red-500/20 text-red-500 border-red-500/50' : 
                            topic.importance === 'Medium' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' : 
                            'bg-green-500/20 text-green-500 border-green-500/50'
                          }`}>
                            {topic.importance}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-auto flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <FileText size={14} className="text-indigo-400" /> Notes
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> MCQ
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> CQ
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="col-span-full py-24 flex flex-col items-center justify-center text-center w-full"
            >
              <div className="w-24 h-24 mb-6 rounded-3xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 flex items-center justify-center rotate-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.04)]">
                <Search className="w-10 h-10 text-slate-400 group-hover:rotate-6 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                আপনার খোঁজা টপিকটি পাওয়া যায়নি...
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                অন্য কোনো কিওয়ার্ড লিখে আবার চেষ্টা করুন অথবা সম্পূর্ণ সিলেবাস ব্রাউজ করুন।
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ChapterAnalysis 
        isOpen={isAnalysisOpen} 
        onClose={() => setIsAnalysisOpen(false)} 
        data={analysisData} 
      />
    </div>
  );
}
