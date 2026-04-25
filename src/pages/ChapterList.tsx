import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Grid, List, Search, ExternalLink } from 'lucide-react';
import { ictSyllabus } from '../data/ict-syllabus';
import { cn } from '../lib/utils';

const chapterImages = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80"
];

export default function ChapterList() {
  const [version, setVersion] = useState<'bangla' | 'english'>('bangla');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  // Filter topics based on search
  const filteredData = ictSyllabus.map(chapter => {
    return {
      ...chapter,
      topics: chapter.topics.filter(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        chapter.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };
  }).filter(chapter => chapter.topics.length > 0);

  return (
    <div className="flex-1 flex flex-col px-4 sm:px-6 md:px-10 lg:px-16 py-8 md:py-12 max-w-7xl mx-auto w-full relative z-20">
      <div className="mb-8 md:mb-12">
        <Link to="/" className="text-sky-400 hover:text-sky-300 text-sm font-medium mb-4 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 leading-tight">
          HSC ICT Syllabus
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl mb-6 md:mb-8 leading-8">
          Master the complete Bangladesh National Curriculum for Information and Communication Technology with our interactive, structured modules.
        </p>

        {/* Action Bar (Search + Version Select) */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center border-b border-slate-900/10 dark:border-white/10 pb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
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

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search topics or chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-white rounded-full py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500 transition-colors"
            />
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

          <AnimatePresence mode="popLayout">
            {searchQuery && filteredData.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="text-center py-12 px-4"
              >
                <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300">No topics found matching "{searchQuery}"</h3>
                <p className="text-slate-500 mt-2">Try a different keyword.</p>
              </motion.div>
            ) : null}

            {searchQuery && filteredData.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Search Results</h2>
                <div className="space-y-6">
                  {filteredData.map(chapter => (
                    <div key={chapter.id} className="bg-slate-900/5 dark:bg-white/5 rounded-2xl p-4 md:p-6 border border-slate-900/10 dark:border-white/10">
                      <h3 className="font-bold text-lg text-sky-500 mb-4">{chapter.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {chapter.topics.map(topic => (
                          <Link key={topic.id} to={`/topics/${topic.id}`} className="flex items-center justify-between gap-4 bg-white dark:bg-slate-900 shadow-sm border border-slate-900/10 dark:border-white/10 p-4 rounded-xl hover:border-sky-500 transition-colors group min-w-0">
                            <span className="font-semibold text-slate-700 dark:text-slate-200 break-words min-w-0">{topic.title}</span>
                            <ExternalLink size={16} className="text-slate-400 group-hover:text-sky-500" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chapters */}
          {!searchQuery && (
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
                    "moving-light-card p-[2px] transition-all duration-300 shadow-2xl shadow-black/30 group hover:-translate-y-1",
                    viewMode === 'grid' ? "h-full" : ""
                  )}
                >
                  <div className={cn(
                    "relative z-10 rounded-[1.375rem] bg-[#071426]/95 p-5 md:p-6 flex overflow-hidden h-full",
                    viewMode === 'grid' ? "flex-col items-start" : "flex-col md:flex-row md:items-center md:justify-between gap-4"
                  )}>
                    <Link to={`/chapters/${chapter.id}/topics`} className={cn("flex w-full min-w-0", viewMode === 'grid' ? "flex-col items-start mb-5" : "flex-col sm:flex-row items-start sm:items-center gap-5")}>
                      <div className={cn(
                        "overflow-hidden group-hover:scale-[1.02] transition-transform border border-white/10 bg-slate-950/60",
                        viewMode === 'grid' ? "w-full h-40 rounded-2xl mb-5" : "w-full sm:w-28 h-28 rounded-2xl shrink-0"
                      )}>
                        <img
                          src={chapterImages[index % chapterImages.length]}
                          alt={chapter.title}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="w-full min-w-0">
                        <div className="text-xs md:text-sm font-black text-yellow-300 mb-2 uppercase tracking-wider">Chapter {index + 1}</div>
                        <h2 className={cn(
                          "font-black text-white group-hover:text-yellow-100 transition-colors leading-snug break-words",
                          viewMode === 'grid' ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                        )}>{chapter.title.split(': ')[1] || chapter.title}</h2>
                        <p className="mt-3 text-xs md:text-sm text-slate-300 leading-6">{chapter.topics.length} topic lessons, board notes, MCQ and CQ practice.</p>
                      </div>
                    </Link>

                    <div className={cn(
                      "w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                      viewMode === 'grid' ? "mt-auto pt-4 border-t border-white/10" : "md:w-auto"
                    )}>
                      <Link to={`/chapters/${chapter.id}/topics`} className="flex items-center justify-center sm:justify-start text-sm font-black text-green-300 whitespace-nowrap rounded-full bg-white/5 px-4 py-2 border border-white/10 hover:bg-white/10">
                        Explore <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <select
                        onChange={(e) => {
                          if (e.target.value) navigate(`/topics/${e.target.value}`);
                        }}
                        className="bg-slate-950/70 border border-white/10 rounded-xl text-xs font-semibold py-2.5 px-3 text-slate-200 outline-none focus:ring-1 focus:ring-yellow-300 w-full sm:max-w-[170px]"
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
          )}
        </>
      )}
    </div>
  );
}
