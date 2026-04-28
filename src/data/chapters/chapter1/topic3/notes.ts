export const notes = `
    <div class="space-y-8">
      <!-- Premium Hero Card: Biometrics -->
      <div class="bg-gradient-to-br from-teal-700 via-emerald-700 to-sky-800 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 right-0 p-8 opacity-20">
          <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        </div>
        <div class="relative z-10">
          <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-teal-100 font-semibold text-sm mb-4 border border-white/30 truncate">
            অধ্যায় ১: তথ্য ও যোগাযোগ প্রযুক্তি
          </div>
          <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">বায়োমেট্রিক্স (Biometrics) 👁️</h2>
          <p class="text-teal-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-4">
            বায়োমেট্রিক্স হলো জীববিজ্ঞান এবং প্রযুক্তির একটি শাখা যার সাহায্যে মানুষের <strong>বায়োলজিক্যাল ডেটা বিশ্লেষণ করে মানবদেহের অদ্বিতীয় বৈশিষ্ট্য সনাক্তকরণ</strong> করে এবং তাকে চিহ্নিত করে। 
          </p>
          <div class="bg-white/10 p-4 rounded-2xl inline-block border border-white/20">
            <span class="text-emerald-300 font-bold">Bio</span> = Life (জীবন) | <span class="text-sky-300 font-bold">Metric</span> = To measure (পরিমাপ করা)
          </div>
        </div>
      </div>

      <!-- Biometrics Types -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-teal-200/50 dark:border-teal-700/50 hover:-translate-y-1 transition-transform duration-300">
          <h3 class="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4 flex items-center gap-3">
            <span class="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-xl">🧬</span> শরীরবৃত্তীয় পদ্ধতি (Physiological)
          </h3>
          <ul class="space-y-3 text-slate-700 dark:text-slate-300 font-medium">
            <li class="flex items-center gap-2"><span class="text-teal-500 font-bold">১.</span> ফিংগার প্রিন্ট (Finger print)</li>
            <li class="flex items-center gap-2"><span class="text-teal-500 font-bold">২.</span> হ্যান্ড জিওমেট্রি (Hand Geometry)</li>
            <li class="flex items-center gap-2"><span class="text-teal-500 font-bold">৩.</span> আইরিস এবং রেটিনা স্ক্যান (Iris & Retina Scan)</li>
            <li class="flex items-center gap-2"><span class="text-teal-500 font-bold">৪.</span> ফেইস রিকগনিশন (Face Recognition)</li>
            <li class="flex items-center gap-2"><span class="text-teal-500 font-bold">৫.</span> ডিএনএ (DNA)</li>
          </ul>
        </div>
        
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-sky-200/50 dark:border-sky-700/50 hover:-translate-y-1 transition-transform duration-300">
          <h3 class="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-3">
            <span class="p-2 bg-sky-100 dark:bg-sky-900/50 rounded-xl">🗣️</span> আচরণগত পদ্ধতি (Behavioral)
          </h3>
          <ul class="space-y-3 text-slate-700 dark:text-slate-300 font-medium">
            <li class="flex items-center gap-2"><span class="text-sky-500 font-bold">১.</span> সিগনেচার ভেরিফেকেশন (Signature Verification)</li>
            <li class="flex items-center gap-2"><span class="text-sky-500 font-bold">২.</span> ভয়েস রিকগনিশন (Voice Recognition)</li>
            <li class="flex items-center gap-2"><span class="text-sky-500 font-bold">৩.</span> টাইপিং কীস্ট্রোক (Keystroke Verification)</li>
          </ul>
        </div>
      </div>

      <!-- Detail Blocks for Biometrics -->
      <div class="bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-6 md:p-8 shadow-inner border border-slate-200/60 dark:border-slate-700/60 space-y-8">
        
        <!-- Fingerprint -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h4 class="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-3 border-b border-indigo-100 dark:border-indigo-900 pb-2">👆 ফিংগার প্রিন্ট বায়োমেট্রিক্স</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div>
                <strong class="text-emerald-600 dark:text-emerald-400 block mb-2">✅ সুবিধা:</strong>
                <ul class="list-disc ml-5 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                  <li>খরচ তুলনামূলক কম।</li>
                  <li>সনাক্তকরণের জন্য সময় কম লাগে।</li>
                  <li>সূক্ষ্মতার পরিমাণ প্রায় শতভাগ।</li>
                </ul>
             </div>
             <div>
                <strong class="text-rose-600 dark:text-rose-400 block mb-2">❌ অসুবিধা:</strong>
                <ul class="list-disc ml-5 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                  <li>আঙ্গুলে কোন প্রকার আস্তর লাগানো থাকলে সনাক্তকরণে সমস্যা হয়।</li>
                  <li>ছোট বাচ্চাদের জন্য উপযুক্ত নয়।</li>
                </ul>
             </div>
          </div>
          <strong class="text-slate-800 dark:text-slate-200 text-sm">ব্যবহার:</strong> <span class="text-sm text-slate-600 dark:text-slate-400">ওয়েবসাইটে ইউজার নেইম/পাসওয়ার্ডের বিকল্প, প্রবেশাধিকার নিয়ন্ত্রণ, ব্যাংকিং পেমেন্ট, ডিএনএ সনাক্তকরণে।</span>
        </div>

        <!-- Face Recognition -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h4 class="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-3 border-b border-indigo-100 dark:border-indigo-900 pb-2">👤 ফেইস রিকগনিশন</h4>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">এই পদ্ধতিতে কোনো ব্যাক্তিকে চিহ্নিত করার জন্য মানুষের মুখের গঠন প্রকৃতি পরীক্ষা করা হয়।</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div>
                <strong class="text-emerald-600 dark:text-emerald-400 block mb-2">✅ সুবিধা:</strong>
                <ul class="list-disc ml-5 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                  <li>সিস্টেম সহজে ব্যবহারযোগ্য।</li>
                  <li>সঠিক ফলাফল পাওয়া যায়।</li>
                </ul>
             </div>
             <div>
                <strong class="text-rose-600 dark:text-rose-400 block mb-2">❌ অসুবিধা:</strong>
                <ul class="list-disc ml-5 text-sm space-y-1 text-slate-600 dark:text-slate-400">
                  <li>ক্যামেরা ছাড়া ব্যবহার করা যায় না এবং আলোর পার্থক্যের কারণে জটিলতার সৃষ্টি হয়।</li>
                  <li>মেকআপ, গহনা ইত্যাদির কারণে অনেক সময় সনাক্তকরণে সমস্যা হয়।</li>
                </ul>
             </div>
          </div>
          <strong class="text-slate-800 dark:text-slate-200 text-sm">ব্যবহার:</strong> <span class="text-sm text-slate-600 dark:text-slate-400">কোন বিল্ডিং/কক্ষের প্রবেশদ্বারে, আইডি নম্বর সনাক্তকরণে।</span>
        </div>

        <!-- Other Methods Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
             <strong class="text-blue-700 dark:text-blue-400 block mb-1">🗣️ ভয়েস রিকগনিশন</strong>
             <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">কণ্ঠস্বরের বৈশিষ্ট্য বিশ্লেষণ করে চিহ্নিত করা যায়। কণ্ঠের ধ্বনি, সুরের উচ্চতা, মূর্ছনা, স্পন্দনের দ্রুততা ইত্যাদি বিশ্লেষণ করা হয়।</p>
           </div>
           <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/50">
             <strong class="text-amber-700 dark:text-amber-400 block mb-1">✋ হ্যান্ড জিওমেট্রি</strong>
             <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">হাতের আকৃতি ও ছাপ ভিন্ন হয়। তালুর দৈর্ঘ্য, প্রস্থ, পুরুত্ব, রেখাসমূহ পরিমাপ করা হয় এবং <strong>৩১০০০ এর বেশি পয়েন্ট</strong> চিহ্নিত করতে পারে।</p>
           </div>
           <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800/50">
             <strong class="text-purple-700 dark:text-purple-400 block mb-1">👁️ আইরিস ও রেটিনা স্ক্যান</strong>
             <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">আইরিস স্ক্যানে চোখের মনির রঙিন বলয় বিশ্লেষণ করা হয় এবং রেটিনা স্ক্যানে মনিতে রঙের লেয়ারের পরিমাণ পরিমাপ করা হয়।</p>
           </div>
           <div class="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
             <strong class="text-emerald-700 dark:text-emerald-400 block mb-1">✍️ সিগনেচার ভেরিফিকেশন</strong>
             <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">অটোমেশন পদ্ধতিতে স্বাক্ষরের আকার, লেখার গতি, সময় এবং কলমের চাপ ইত্যাদি ডেটা বিশ্লেষণ করে ভেরিফাই করা হয়।</p>
           </div>
        </div>

        <div class="bg-white/80 dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
           <strong class="text-indigo-600 dark:text-indigo-400 block mb-3 text-lg">🏢 বায়োমেট্রিক্স ব্যবহারের ক্ষেত্রসমূহ:</strong>
           <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-sm text-slate-700 dark:text-slate-300">
             <li>১. প্রবেশাধিকার নিয়ন্ত্রণ</li>
             <li>২. অফিসের সময় ও উপস্থিতি</li>
             <li>৩. পাসপোর্ট তৈরি</li>
             <li>৪. ড্রাইভিং লাইসেন্স তৈরি</li>
             <li>৫. ব্যাংকের লেনদেন নিরাপত্তায়</li>
             <li>৬. এটিএম (ATM) বুথে নিরাপত্তায়</li>
             <li>৭. আবাসিক নিরাপত্তায়</li>
             <li>৮. ডাটাবেজ নিয়ন্ত্রণে</li>
           </ul>
        </div>
      </div>

      <!-- Premium Hero Card: Bioinformatics -->
      <div class="bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-800 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden mt-12">
        <div class="relative z-10">
          <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">বায়োইনফরমেটিক্স (Bioinformatics) 🧬</h2>
          <p class="text-purple-100 leading-relaxed text-lg font-medium max-w-3xl">
            বায়োইনফরমেট্রিক্স বা জৈব তথ্যবিজ্ঞান একটি <strong>আন্তঃশাস্ত্রীয় ক্ষেত্র (জীববিজ্ঞান, পরিসংখ্যান ও কম্পিউটার বিজ্ঞান)</strong> যেখানে জীববিজ্ঞান সংক্রান্ত কাজে ব্যবহৃত ডেটার সংরক্ষণ, আহরণ, সাজানো, ব্যবস্থাপনা, সংগঠন এবং বিশ্লেষণ ইত্যাদি কাজের জন্য বিভিন্ন পদ্ধতির আবিষ্কার এবং উন্নয়ন করে।
          </p>
        </div>
      </div>

      <!-- Bioinformatics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-purple-200/50 dark:border-purple-700/50 hover:-translate-y-1 transition-transform duration-300">
          <h3 class="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-3">
            <span class="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">🎯</span> বায়োইনফরমেটিক্স এর উদ্দেশ্য
          </h3>
          <ul class="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <li class="flex items-start gap-2"><span class="text-purple-500 font-bold mt-1">১।</span> জৈবিক প্রক্রিয়া সঠিকভাবে অনুধাবন করা। অর্থাৎ জীন বিষয়ক তথ্যানুসন্ধান করে জ্ঞান তৈরি করা।</li>
            <li class="flex items-start gap-2"><span class="text-purple-500 font-bold mt-1">২।</span> রোগ-বালাইয়ের কারণ হিসেবে জীনের প্রভাব সম্পর্কিত জ্ঞান আহরণ করা।</li>
            <li class="flex items-start gap-2"><span class="text-purple-500 font-bold mt-1">৩।</span> ঔষধের গুণাগুণ উন্নত ও নতুন ঔষধ আবিষ্কারের প্রচেষ্টা করা।</li>
          </ul>
        </div>

        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-fuchsia-200/50 dark:border-fuchsia-700/50 hover:-translate-y-1 transition-transform duration-300">
          <h3 class="text-xl font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-4 flex items-center gap-3">
            <span class="p-2 bg-fuchsia-100 dark:bg-fuchsia-900/50 rounded-xl">🧩</span> চারটি প্রধান উপাদানের সমন্বয়
          </h3>
          <ul class="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <li class="flex items-start gap-2"><span class="text-fuchsia-500 font-bold mt-1">১।</span> <strong>আণবিক জীববিদ্যা ও মেডিসিন:</strong> ডেটা উৎস বিশ্লেষণের কাজ করে।</li>
            <li class="flex items-start gap-2"><span class="text-fuchsia-500 font-bold mt-1">২।</span> <strong>ডেটাবেজ:</strong> নিরাপদ ডেটা সংরক্ষণ ও ডেটা রিট্রিভ করা।</li>
            <li class="flex items-start gap-2"><span class="text-fuchsia-500 font-bold mt-1">৩।</span> <strong>প্রোগ্রাম:</strong> উপাত্ত বিশ্লেষণ অ্যালগরিদম যার মাধ্যমে এটি সুনির্দিষ্ট করা হয়।</li>
            <li class="flex items-start gap-2"><span class="text-fuchsia-500 font-bold mt-1">৪।</span> <strong>গণিত ও পরিসংখ্যান:</strong> এর সাহায্যে সম্ভাব্যতা যাচাই করা।</li>
          </ul>
        </div>
      </div>

      <!-- Tool Processes & Software -->
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50">
         <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <strong class="text-indigo-600 dark:text-indigo-400 block mb-3 text-lg">⚙️ প্রধান তিনটি প্রক্রিয়া:</strong>
               <div class="space-y-3">
                 <div class="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800/30 text-sm text-slate-700 dark:text-slate-300">
                    <span class="font-bold text-indigo-500">১.</span> ডিএনএ সিকোয়েন্স প্রোটিন সিকোয়েন্স নির্ণয় করে। (DNA sequence determines protein sequence)
                 </div>
                 <div class="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800/30 text-sm text-slate-700 dark:text-slate-300">
                    <span class="font-bold text-indigo-500">২.</span> প্রোটিন সিকোয়েন্স প্রোটিন গঠন/কাঠামো নির্ণয় করে। (Protein sequence determines protein structure)
                 </div>
                 <div class="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800/30 text-sm text-slate-700 dark:text-slate-300">
                    <span class="font-bold text-indigo-500">৩.</span> প্রোটিন কাঠামো প্রোটিনের কাজ নির্ণয় করে। (Protein structure determines protein function)
                 </div>
               </div>
            </div>
            <div>
               <strong class="text-fuchsia-600 dark:text-fuchsia-400 block mb-3 text-lg">💻 ওপেনসোর্স সফটওয়্যার:</strong>
               <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-fuchsia-50 dark:bg-fuchsia-900/20 p-4 rounded-xl border border-fuchsia-100 dark:border-fuchsia-800/30 h-[calc(100%-2rem)]">
                 Bioconductor, BioPerl, Biopython, BioJava, BioRuby, Biclipse, EMBOSS, Taverna Workbench, UGENE ইত্যাদি।
               </p>
            </div>
         </div>

         <div class="mt-8">
            <strong class="text-emerald-600 dark:text-emerald-400 block mb-3 text-lg">🔬 ব্যবহার ও গবেষণার ক্ষেত্রসমূহ:</strong>
            <div class="flex flex-wrap gap-2">
               <span class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-600">প্যাটার্ন রিকগনিশন</span>
               <span class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-600">ডেটা মাইনিং</span>
               <span class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-600">মেশিন ল্যাংগুয়েজ অ্যালগোরিদম</span>
               <span class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-600">ভিজুয়ালাইজেশন</span>
               <span class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-600">সিকুয়েন্স এলাইনমেন্ট</span>
               <span class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-600">ডিএনএ ম্যাপিং ও এনালাইসিস</span>
               <span class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-600">জিন ফাইন্ডিং</span>
               <span class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-600">ড্রাগ আবিস্কার</span>
               <span class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-600">জিন থেরাপি</span>
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
            <li class="flex items-start gap-3"><span class="text-amber-500 font-bold">✓</span> <strong>MCQ হ্যাক:</strong> আচরণগত বায়োমেট্রিক্স হলো ৩টি (সিগনেচার, ভয়েস ও টাইপিং)। বাকি সব শরীরবৃত্তীয়। আর ডিএনএ, জিন বা ড্রাগ ডিজাইনিং নিয়ে কথা থাকলে সেটা <em>বায়োইনফরমেটিক্স</em>।</li>
            <li class="flex items-start gap-3"><span class="text-amber-500 font-bold">✓</span> <strong>CQ হ্যাক:</strong> উদ্দীপকে যদি আঙ্গুলের ছাপ, রেটিনা বা ফেস স্ক্যান করে কোথাও প্রবেশ বা হাজিরার কথা বলা হয়, তবে সেটি <strong>বায়োমেট্রিক্স</strong>। আর যদি কম্পিউটার বা প্রযুক্তির সাহায্যে কোন কৃষি গবেষণা, নতুন ধান/মাছের জাত উদ্ভাবন, জিন গবেষণা বা ডেটাবেজে সংরক্ষণ বোঝায়, তবে সেটি <strong>বায়োইনফরমেটিক্স</strong>।</li>
          </ul>
        </div>
      </div>
    </div>
  `;
