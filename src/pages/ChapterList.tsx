import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Grid, List, Search, ExternalLink } from 'lucide-react';
import { ictSyllabus } from '../data/ict-syllabus';
import { cn } from '../lib/utils';

const chapterImages = [
  "https://picsum.photos/seed/global/400/300",
  "https://picsum.photos/seed/network/400/300",
  "https://picsum.photos/seed/math/400/300",
  "https://picsum.photos/seed/code/400/300",
  "https://picsum.photos/seed/programming/400/300",
  "https://picsum.photos/seed/database/400/300"
];

const chapterGradients = [
  "from-blue-900/40 to-sky-900/40 hover:from-blue-800/50 hover:to-sky-800/50 border-blue-500/20",
  "from-purple-900/40 to-fuchsia-900/40 hover:from-purple-800/50 hover:to-fuchsia-800/50 border-purple-500/20",
  "from-emerald-900/40 to-teal-900/40 hover:from-emerald-800/50 hover:to-teal-800/50 border-emerald-500/20",
  "from-orange-900/40 to-red-900/40 hover:from-orange-800/50 hover:to-red-800/50 border-orange-500/20",
  "from-indigo-900/40 to-violet-900/40 hover:from-indigo-800/50 hover:to-violet-800/50 border-indigo-500/20",
  "from-pink-900/40 to-rose-900/40 hover:from-pink-800/50 hover:to-rose-800/50 border-pink-500/20"
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
    <div className="flex-1 flex flex-col px-8 md:px-16 py-12 max-w-7xl mx-auto w-full relative z-20">
      <div className="mb-12">
        <Link to="/" className="text-sky-400 hover:text-sky-300 text-sm font-medium mb-4 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
          HSC ICT Syllabus
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mb-8">
          Master the complete Bangladesh National Curriculum for Information and Communication Technology with our interactive, structured modules.
        </p>

        {/* Action Bar (Search + Version Select) */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-slate-900/10 dark:border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setVersion('bangla')}
              className={cn(
                "px-6 py-2.5 rounded-full font-bold text-sm transition-all",
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
                "px-6 py-2.5 rounded-full font-bold text-sm transition-all",
                version === 'english' 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                  : "bg-slate-900/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-900/10 dark:hover:bg-white/10"
              )}
            >
              English Version <span className="ml-2 text-[0.65rem] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">Coming Soon</span>
            </button>
          </div>

          <div className="relative w-full md:w-72">
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
                className="text-center py-12"
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
                    <div key={chapter.id} className="bg-slate-900/5 dark:bg-white/5 rounded-2xl p-6 border border-slate-900/10 dark:border-white/10">
                      <h3 className="font-bold text-lg text-sky-500 mb-4">{chapter.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {chapter.topics.map(topic => (
                          <Link key={topic.id} to={`/topics/${topic.id}`} className="flex items-center justify-between bg-white dark:bg-slate-900 shadow-sm border border-slate-900/10 dark:border-white/10 p-4 rounded-xl hover:border-sky-500 transition-colors group">
                            <span className="font-semibold text-slate-700 dark:text-slate-200">{topic.title}</span>
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
                    "bg-gradient-to-br backdrop-blur-xl border rounded-3xl p-8 transition-all duration-300 shadow-xl shadow-black/20 flex relative group",
                    chapterGradients[index % chapterGradients.length],
                    viewMode === 'grid' ? "flex-col h-full items-start" : "flex-row items-center justify-between"
                  )}
                >
                  <Link to={`/chapters/${chapter.id}/topics`} className={cn("flex w-full", viewMode === 'grid' ? "flex-col items-start mb-6" : "items-center gap-6")}>
                    <div className={cn(
                      "overflow-hidden group-hover:scale-105 transition-transform",
                      viewMode === 'grid' ? "w-full h-40 rounded-2xl mb-6" : "w-24 h-24 rounded-2xl shrink-0"
                    )}>
                      <img 
                        src={chapterImages[index % chapterImages.length]} 
                        alt={chapter.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="w-full">
                      <div className="text-sm font-bold text-sky-400 mb-1 uppercase tracking-wider">Chapter {index + 1}</div>
                      <h2 className={cn(
                        "font-bold text-slate-900 dark:text-slate-50 group-hover:text-slate-900 dark:group-hover:text-white transition-colors",
                        viewMode === 'grid' ? "text-2xl" : "text-xl"
                      )}>{chapter.title.split(': ')[1] || chapter.title}</h2>
                    </div>
                  </Link>

                  {/* Quick Jump Dropdown Container */}
                  <div className={cn(
                    "w-full flex items-center justify-between gap-4",
                    viewMode === 'grid' ? "mt-auto pt-4 border-t border-white/10" : ""
                  )}>
                    <Link to={`/chapters/${chapter.id}/topics`} className="flex items-center text-sm font-semibold text-sky-500 whitespace-nowrap">
                      Explore <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <select 
                      onChange={(e) => {
                        if (e.target.value) navigate(`/topics/${e.target.value}`);
                      }}
                      className="bg-slate-900/10 dark:bg-black/20 border border-slate-900/10 dark:border-white/10 rounded-lg text-xs font-semibold py-2 px-2 text-slate-700 dark:text-slate-300 outline-none focus:ring-1 focus:ring-sky-500 max-w-[150px] truncate"
                      defaultValue=""
                    >
                      <option value="" disabled>Quick Jump to...</option>
                      {chapter.topics.map(t => (
                        <option key={t.id} value={t.id}>{t.title}</option>
                      ))}
                    </select>
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
