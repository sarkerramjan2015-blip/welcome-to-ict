import React from 'react';

export default function AnnouncementBar() {
  return (
    <div className="relative z-40 bg-red-600/10 dark:bg-red-900/20 backdrop-blur-md border-b border-red-500/20 py-2 flex items-center overflow-hidden">
      <div className="flex items-center px-4 w-full">
        {/* LIVE Badge */}
        <div className="flex-shrink-0 z-20 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center gap-1.5 border border-red-500/50">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white absolute"></span>
          <span className="ml-2">LIVE</span>
        </div>
        
        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden ml-4 relative h-6 flex items-center">
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-50 dark:from-[#020617] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-50 dark:from-[#020617] to-transparent z-10"></div>
          
          <div 
            className="whitespace-nowrap absolute text-red-600 dark:text-red-400 font-bold text-sm sm:text-base tracking-wide flex items-center animate-marquee"
          >
            নতুন HSC ICT শর্ট সাজেশন ২০২৬ আপলোড হয়েছে! এখনই সংগ্রহ করো।
          </div>
        </div>
      </div>
    </div>
  );
}
