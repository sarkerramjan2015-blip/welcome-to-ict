import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Grid, List, ExternalLink, Check } from 'lucide-react';
import { ictSyllabus } from '../data/ict-syllabus';
import { cn } from '../lib/utils';
import ProgressTracker from '../components/ui/ProgressTracker';

const chapterImages = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80"
];

const headerTexts = ["HSC ICT Syllabus", "Digital Journey", "Board Exam Prep"];

export default function ChapterList() {
  const [version, setVersion] = useState<'bangla' | 'english'>('bangla');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % headerTexts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  const navigate = useNavigate();

  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ict_completed_chapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('ict_completed_chapters', JSON.stringify(completedChapters));
  }, [completedChapters]);

  const toggleChapter = (chapterId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCompletedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  useEffect(() => {
    // Dynamic SEO Meta Tags
    document.title = "HSC ICT Syllabus | Chapters & Modules";
    
    // Create chapter summaries for keywords/description
    const allTitles = ictSyllabus.map(c => c.title.split(':')[1] || c.title).join(', ');
    const descContent = `Explore HSC ICT Chapters: ${allTitles}. Master the complete Bangladesh National Curriculum with interactive lessons.`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = descContent;
      document.head.appendChild(meta);
    }

    return () => {
      // Cleanup slightly if needed
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col px-4 sm:px-6 md:px-10 lg:px-16 py-8 md:py-12 max-w-7xl mx-auto w-full relative z-20">
      <div className="mb-8 md:mb-12">
        <Link to="/" className="text-sky-400 hover:text-sky-300 text-sm font-medium mb-4 inline-block">
          &larr; Back to Home
        </Link>
        <div className="h-12 sm:h-14 md:h-16 overflow-hidden mb-4 relative">
          <AnimatePresence mode="popLayout">
            <motion.h1 
              key={textIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 leading-tight absolute"
            >
              {headerTexts[textIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl mb-6 md:mb-8 leading-8">
          Master the complete Bangladesh National Curriculum for Information and Communication Technology with our interactive, structured modules.
        </p>

        {/* Action Bar (Version Select Only) */}
        <div className="flex border-b border-slate-900/10 dark:border-white/10 pb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full sm:w-auto">
            <button 
              onClick={() => setVersion('bangla')}
              className={cn(
                "px-5 md:px-6 py-2.5 rounded-full font-bold text-sm transition-all",
                version === 'bangla' 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                  : "bg-slate-900/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-900/10 dark:hover:bg-white/10"
              )}
            >
              Bangla Version
            </button>
            <button 
              onClick={() => setVersion('english')}
              className={cn(
                "px-5 md:px-6 py-2.5 rounded-full font-bold text-sm transition-all break-words",
                version === 'english' 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                  : "bg-slate-900/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-900/10 dark:hover:bg-white/10"
              )}
            >
              English Version <span className="ml-2 text-[0.65rem] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">Coming Soon</span>
            </button>
          </div>
        </div>
      </div>

      {version === 'english' ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-600 dark:text-slate-300 mb-2">English Version Content is under development</h2>
            <p className="text-slate-500">Please check back later or switch to Bangla Version.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Progress Tracker */}
          <div className="mb-6">
            <ProgressTracker 
              current={completedChapters.length} 
              total={ictSyllabus.length} 
              title="Syllabus Progress" 
            />
          </div>

          {/* View Toggle */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center bg-slate-900/5 dark:bg-white/5 rounded-lg p-1 border border-slate-900/10 dark:border-white/10">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === 'grid' ? "bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Grid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === 'list' ? "bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Chapters */}
          <div className={cn(
              "gap-6",
              viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col"
            )}>
              {ictSyllabus.map((chapter, index) => (
                <motion.div 
                  key={chapter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "premium-glow-card p-[1px] transition-all duration-500 shadow-2xl shadow-indigo-900/10 group hover:-translate-y-2 hover:shadow-indigo-500/20 rounded-[1.5rem]",
                    viewMode === 'grid' ? "h-full" : ""
                  )}
                >
                  <div className={cn(
                    "relative z-10 rounded-[calc(1.5rem-1px)] bg-[#0A0F1C]/95 backdrop-blur-xl border border-white/5 p-4 flex overflow-hidden h-full",
                    viewMode === 'grid' ? "flex-col items-start" : "flex-col md:flex-row md:items-center md:justify-between gap-4"
                  )}>
                    <Link to={`/chapters/${chapter.id}/topics`} className={cn("flex w-full min-w-0 relative", viewMode === 'grid' ? "flex-col items-start mb-4" : "flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5")}>
                      <button
                        onClick={(e) => toggleChapter(chapter.id, e)}
                        title={completedChapters.includes(chapter.id) ? "Mark as Incomplete" : "Mark as Complete"}
                        className={cn(
                          "absolute z-20 w-8 h-8 rounded-full border backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg",
                          viewMode === 'grid' ? "top-2 right-2" : "top-2 right-2 sm:top-auto sm:bottom-2 sm:right-2",
                          completedChapters.includes(chapter.id)
                            ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                            : "bg-slate-900/60 border-white/20 text-white/30 hover:bg-white/20 hover:border-white/40 hover:text-white"
                        )}
                      >
                        <Check size={16} strokeWidth={completedChapters.includes(chapter.id) ? 3 : 2} />
                      </button>
                      <div className={cn(
                        "overflow-hidden group-hover:scale-[1.02] transition-transform border border-white/10 bg-slate-950/40",
                        viewMode === 'grid' ? "w-full h-24 md:h-32 rounded-2xl mb-4" : "w-full sm:w-28 h-32 sm:h-28 rounded-2xl shrink-0"
                      )}>
                        <img
                          src={chapterImages[index % chapterImages.length]}
                          alt={chapter.title}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="w-full min-w-0">
                        <div className="text-[10px] md:text-xs font-black text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md inline-block mb-3 uppercase tracking-wider">Chapter {index + 1}</div>
                        <h2 className={cn(
                          "font-bold text-white group-hover:text-indigo-200 transition-colors leading-snug break-words",
                          viewMode === 'grid' ? "text-lg md:text-xl" : "text-base md:text-lg"
                        )}>{chapter.title.split(': ')[1] || chapter.title}</h2>
                        <p className="mt-2 text-xs md:text-sm text-slate-400 leading-relaxed">{chapter.topics.length} topic lessons, board notes, MCQ and CQ practice.</p>
                      </div>
                    </Link>

                    <div className={cn(
                      "w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                      viewMode === 'grid' ? "mt-auto pt-4 border-t border-white/10" : "md:w-auto"
                    )}>
                      <Link to={`/chapters/${chapter.id}/topics`} className="flex items-center justify-center sm:justify-start text-sm font-bold text-white whitespace-nowrap rounded-xl bg-indigo-600 px-4 py-2.5 shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all">
                        Explore <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <select
                        onChange={(e) => {
                          if (e.target.value) navigate(`/topics/${e.target.value}`);
                        }}
                        className="bg-slate-800/50 border border-white/10 rounded-xl text-xs font-semibold py-2.5 px-3 text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500 w-full sm:max-w-[170px]"
                        defaultValue=""
                        aria-label={`Quick jump for ${chapter.title}`}
                      >
                        <option value="" disabled>Quick Jump to...</option>
                        {chapter.topics.map(t => (
                          <option key={t.id} value={t.id}>{t.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
        </>
      )}
    </div>
  );
}
