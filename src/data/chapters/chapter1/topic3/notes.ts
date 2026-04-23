export const notes = `
    <div class="space-y-8">
      <!-- Premium Hero Card -->
      <div class="bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-800 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 right-0 p-8 opacity-20">
          <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        </div>
        <div class="relative z-10">
          <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-indigo-100 font-semibold text-sm mb-4 border border-white/30 truncate">
            অধ্যায় ১: তথ্য ও যোগাযোগ প্রযুক্তি
          </div>
          <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">ভার্চুয়াল রিয়েলিটি (Virtual Reality) 🕶️</h2>
          <p class="text-indigo-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl">
            প্রকৃত অর্থে <strong>বাস্তব নয় কিন্তু বাস্তবের চেতনার উদ্বেগকারী</strong> বিজ্ঞাননির্ভর কল্পনাকে ভার্চুয়াল রিয়েলিটি বলে। কম্পিউটার প্রযুক্তির সাহায্যে কৃত্রিম পরিবেশকে এমনভাবে তৈরি ও উপস্থাপন করা হয়, যা ব্যবহারকারীর কাছে সত্য ও বাস্তব বলে মনে হয়।
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Key Components Box -->
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 hover:-translate-y-1 transition-transform duration-300">
          <h3 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 flex items-center gap-3">
            <span class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">⚙️</span> প্রয়োজনীয় উপাদানসমূহ
          </h3>
          <ul class="space-y-4 text-slate-700 dark:text-slate-300">
            <li class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl"><span class="text-indigo-500 font-bold text-xl">১</span> <strong>HMD (Head Mounted Display):</strong> চোখ ও কানকে আবৃত করা বিশেষ হেলমেট যা ত্রিমাত্রিক দৃশ্য দেখায়।</li>
            <li class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl"><span class="text-indigo-500 font-bold text-xl">২</span> <strong>Data Glove (ডেটা গ্লাভস):</strong> স্পর্শের অনুভূতি পাওয়ার জন্য হাতে পরার বিশেষ দস্তানা।</li>
            <li class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl"><span class="text-indigo-500 font-bold text-xl">৩</span> <strong>Body Suit (বডি স্যুট):</strong> পুরো শরীরের নড়াচড়া ট্র্যাক করা এবং অনুভূতি পাওয়ার জন্য বিশেষ পোশাক।</li>
            <li class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-indigo-200 dark:border-indigo-800/50 relative overflow-hidden">
               <div class="absolute inset-0 bg-indigo-500/5 dark:bg-indigo-400/10 animate-pulse"></div>
               <span class="text-indigo-600 dark:text-indigo-400 font-bold text-xl relative z-10">৪</span> <strong class="relative z-10">সফটওয়্যার/প্রোগ্রাম:</strong> C++, Java, Python, OpenGL, Direct3D, Java3D, <strong>VRML</strong> ইত্যাদি।
            </li>
          </ul>
        </div>

        <!-- Concept Matrix -->
        <div class="flex flex-col gap-6">
          <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/50 hover:-translate-y-1 transition-transform duration-300">
            <h3 class="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-3">
              <span class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">✅</span> ইতিবাচক প্রভাব
            </h3>
            <ul class="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
              <li class="flex items-start gap-2"><span class="text-emerald-500 font-bold mt-1">•</span> শিক্ষা ও প্রশিক্ষণ ক্ষেত্রে জটিল বিষয়গুলো ত্রিমাত্রিক চিত্রের মাধ্যমে আকর্ষণীয় ও হৃদয়গ্রাহী করা যায়।</li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 font-bold mt-1">•</span> ঝুঁকিপূর্ণ উৎপাদন ব্যবস্থায় ভার্চুয়াল রিয়েলিটি প্রয়োগ করে পরীক্ষা নিরীক্ষার মাধ্যমে সহজ ও সরল করা সম্ভব।</li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 font-bold mt-1">•</span> বাস্তবায়নের পূর্বে ভার্চুয়াল রিয়েলিটির সিমুলেশনের মাধ্যমে পরীক্ষা নিরীক্ষা করে খরচ কমানো যায়।</li>
            </ul>
          </div>

          <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-rose-200/50 dark:border-rose-700/50 hover:-translate-y-1 transition-transform duration-300">
            <h3 class="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-3">
              <span class="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-xl">❌</span> নেতিবাচক প্রভাব
            </h3>
            <ul class="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
              <li class="flex items-start gap-2"><span class="text-rose-500 font-bold mt-1">•</span> বাস্তবের স্বাদ পাওয়ায় কল্পনার রাজ্যে বিচরণ করতে পারে।</li>
              <li class="flex items-start gap-2"><span class="text-rose-500 font-bold mt-1">•</span> যেহেতু ভার্চুয়াল রিয়েলিটি একটি কম্পিউটার সিস্টেম তাই এটি স্বাস্থ্যের জন্য ক্ষতিকর।</li>
              <li class="flex items-start gap-2"><span class="text-rose-500 font-bold mt-1">•</span> ভার্চুয়াল রিয়েলিটি ব্যয়বহুল হওয়ায় সবাই এই প্রযুক্তি ব্যবহারে সুবিধা পায় না। ফলে ডিজিটাল বৈষম্য তৈরি হয়।</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Exam Master Tips -->
      <div class="bg-gradient-to-r from-amber-200 via-orange-100 to-amber-200 dark:from-amber-900/40 dark:to-orange-900/40 p-1 rounded-3xl shadow-xl">
        <div class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 rounded-[1.4rem] h-full">
          <h3 class="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-3">
            <span class="animate-bounce">💡</span> Exam Master Tips
          </h3>
          <ul class="space-y-3 text-slate-700 dark:text-slate-300">
            <li class="flex items-start gap-3"><span class="text-amber-500 font-bold">✓</span> <strong>MCQ হ্যাক:</strong> ভার্চুয়াল রিয়েলিটিতে <em>ত্রিমাত্রিক (3D)</em> ইমেজ তৈরি হয় এবং সবচেয়ে জনপ্রিয় প্রোগ্রামিং ভাষা বা সফটওয়্যার হলো <em>VRML (Virtual Reality Modeling Language)</em>।</li>
            <li class="flex items-start gap-3"><span class="text-amber-500 font-bold">✓</span> <strong>CQ হ্যাক:</strong> উদ্দীপকে যদি <strong>কৃত্রিম পরিবেশ, সিমুলেশন, রোগী ছাড়াই অপারেশন, আসল গাড়ি বা বিমান না চালিয়ে প্রশিক্ষণ</strong> ইত্যাদি শব্দের উল্লেখ থাকে, তবে চোখ বন্ধ করে বুঝে নিবে এটি <em>"ভার্চুয়াল রিয়েলিটি (VR)"</em> নিয়ে আলোচনা করছে।</li>
          </ul>
        </div>
      </div>
    </div>
  `;
