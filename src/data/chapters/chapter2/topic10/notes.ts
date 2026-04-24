export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19.33 10.22A5.96 5.96 0 0 0 14 6c-2.48 0-4.63 1.51-5.54 3.65A6.992 6.992 0 0 0 2 16c0 3.87 3.13 7 7 7h10c3.87 0 7-3.13 7-7 0-3.05-1.98-5.66-4.67-6.78z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-indigo-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">নেটওয়ার্ক টপোলজি 🕸️</h2>
      <p class="text-indigo-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        একটি নেটওয়ার্কের কম্পিউটার ও ডিভাইসসমূহ একে অপরের সাথে কীভাবে যুক্ত, তার জ্যামিতিক উপস্থাপনাকেই নেটওয়ার্ক টপোলজি বলে। এটি মূলত ৬ প্রকার।
      </p>
    </div>
  </div>

  <!-- Topology Details -->
  <div class="space-y-6">
    
    <!-- Bus Topology -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-sky-200/50 dark:border-sky-700/50">
      <div class="flex items-center gap-3 mb-4">
        <span class="p-3 bg-sky-100 dark:bg-sky-900/50 rounded-2xl text-2xl">🚌</span>
        <h3 class="text-2xl font-bold text-sky-700 dark:text-sky-400">বাস টপোলজি (Bus Topology)</h3>
      </div>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
        সকল ডিভাইস একটি মূল ক্যাবল বা ব্যাকবোনের সাথে যুক্ত থাকে। ডেটা প্রবাহ দ্বিমুখী।
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl">
          <strong class="text-green-700 dark:text-green-400">সুবিধা:</strong>
          <ul class="list-disc ml-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
            <li>ইন্সটলেশন সহজ ও সাশ্রয়ী।</li>
            <li>কোনো একটি নোড নষ্ট হলেও নেটওয়ার্ক সচল থাকে।</li>
            <li>হাব বা সুইচের প্রয়োজন নেই।</li>
          </ul>
        </div>
        <div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl">
          <strong class="text-red-700 dark:text-red-400">অসুবিধা:</strong>
          <ul class="list-disc ml-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
            <li>মূল ক্যাবল নষ্ট হলে পুরো নেটওয়ার্ক অচল।</li>
            <li>ট্রাফিক বাড়লে ডেটা কলিশন বাড়ে ও গতি কমে যায়।</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Ring Topology -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-amber-200/50 dark:border-amber-700/50">
      <div class="flex items-center gap-3 mb-4">
        <span class="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-2xl text-2xl">💍</span>
        <h3 class="text-2xl font-bold text-amber-700 dark:text-amber-400">রিং টপোলজি (Ring Topology)</h3>
      </div>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
        প্রতিটি কম্পিউটার তার পাশের ২টির সাথে যুক্ত হয়ে একটি বৃত্ত বা লুপ তৈরি করে। ডেটা একমুখী প্রবাহিত হয়।
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl">
          <strong class="text-green-700 dark:text-green-400">সুবিধা:</strong>
          <ul class="list-disc ml-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
            <li>কেন্দ্রীয় কোনো সার্ভার বা ডিভাইসের উপর নির্ভরতা নেই।</li>
            <li>ডেটা কলিশন হয় না।</li>
          </ul>
        </div>
        <div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl">
          <strong class="text-red-700 dark:text-red-400">অসুবিধা:</strong>
          <ul class="list-disc ml-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
            <li>একটি কম্পিউটার নষ্ট হলে পুরো নেটওয়ার্ক অকার্যকর হয়ে যায়।</li>
            <li>নতুন কম্পিউটার যুক্ত করলে কার্যক্রম ব্যাহত হয়।</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Star Topology -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/50">
      <div class="flex items-center gap-3 mb-4">
        <span class="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl text-2xl">⭐</span>
        <h3 class="text-2xl font-bold text-emerald-700 dark:text-emerald-400">স্টার টপোলজি (Star Topology)</h3>
      </div>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
        সব কম্পিউটার একটি কেন্দ্রীয় ডিভাইসের (হাব/সুইচ) সাথে সরাসরি যুক্ত থাকে। এটি সর্বাধিক জনপ্রিয় টপোলজি।
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl">
          <strong class="text-green-700 dark:text-green-400">সুবিধা:</strong>
          <ul class="list-disc ml-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
            <li>কোনো নোড নষ্ট হলে বাকি নেটওয়ার্ক সচল থাকে।</li>
            <li>নতুন নোড যুক্ত করা খুব সহজ ও সমস্যা নিরূপণ সহজ।</li>
            <li>ডেটা চলাচলের গতি অনেক বেশি।</li>
          </ul>
        </div>
        <div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl">
          <strong class="text-red-700 dark:text-red-400">অসুবিধা:</strong>
          <ul class="list-disc ml-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
            <li>কেন্দ্রীয় ডিভাইস (হাব/সুইচ) নষ্ট হলে পুরো নেটওয়ার্ক অচল।</li>
            <li>ক্যাবল বেশি লাগে, তাই খরচ বেশি।</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Tree Topology -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-teal-200/50 dark:border-teal-700/50">
      <div class="flex items-center gap-3 mb-4">
        <span class="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-2xl text-2xl">🌳</span>
        <h3 class="text-2xl font-bold text-teal-700 dark:text-teal-400">ট্রি টপোলজি (Tree Topology)</h3>
      </div>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
        একাধিক স্টার টপোলজির সমন্বয়ে তৈরি। কম্পিউটারগুলো গাছের শাখা-প্রশাখার মতো স্তরে স্তরে সাজানো থাকে।
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl">
          <strong class="text-green-700 dark:text-green-400">সুবিধা:</strong>
          <ul class="list-disc ml-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
            <li>অফিস ব্যবস্থাপনায় বা বড় নেটওয়ার্ক গঠনে খুবই উপযোগী।</li>
            <li>শাখা-প্রশাখা বাড়িয়ে সহজে সম্প্রসারণ করা যায়।</li>
          </ul>
        </div>
        <div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl">
          <strong class="text-red-700 dark:text-red-400">অসুবিধা:</strong>
          <ul class="list-disc ml-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
            <li>রুট বা সার্ভারে সমস্যা হলে পুরো নেটওয়ার্ক অচল হয়।</li>
            <li>বাস্তবায়ন ব্যয় বেশি।</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Mesh Topology -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-purple-200/50 dark:border-purple-700/50">
      <div class="flex items-center gap-3 mb-4">
        <span class="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-2xl text-2xl">🕸️</span>
        <h3 class="text-2xl font-bold text-purple-700 dark:text-purple-400">মেশ টপোলজি (Mesh Topology)</h3>
      </div>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
        প্রতিটি কম্পিউটার নেটওয়ার্কের অন্য সকল কম্পিউটারের সাথে সরাসরি যুক্ত থাকে। এখানে কোনো হাব/সুইচ লাগে না। n সংখ্যক নোডের জন্য তারের সংখ্যা = (n × (n-1)) / 2
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl">
          <strong class="text-green-700 dark:text-green-400">সুবিধা:</strong>
          <ul class="list-disc ml-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
            <li>ডেটা কমিউনিকেশনে সর্বোচ্চ নিশ্চয়তা ও নিরাপত্তা থাকে।</li>
            <li>একটি লাইন নষ্ট হলে বিকল্প পথে ডেটা পাঠানো যায় (সবচেয়ে নির্ভরযোগ্য)।</li>
            <li>অত্যন্ত দ্রুতগতি সম্পন্ন।</li>
          </ul>
        </div>
        <div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl">
          <strong class="text-red-700 dark:text-red-400">অসুবিধা:</strong>
          <ul class="list-disc ml-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300">
            <li>অনেক বেশি তার বা ক্যাবল লাগে, তাই অত্যন্ত ব্যয়বহুল।</li>
            <li>ইনস্টলেশন অনেক জটিল।</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Hybrid Topology -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-pink-200/50 dark:border-pink-700/50">
      <div class="flex items-center gap-3 mb-4">
        <span class="p-3 bg-pink-100 dark:bg-pink-900/50 rounded-2xl text-2xl">🔗</span>
        <h3 class="text-2xl font-bold text-pink-700 dark:text-pink-400">হাইব্রিড টপোলজি (Hybrid Topology)</h3>
      </div>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
        ভিন্ন ধরনের একাধিক টপোলজির (যেমন- বাস + রিং) সমন্বয়ে নতুন টপোলজি তৈরি হলে তাকে হাইব্রিড বলে। ইন্টারনেট নিজেই একটি হাইব্রিড টপোলজির উদাহরণ।
      </p>
    </div>

  </div>

  <!-- Exam Tips -->
  <div class="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-amber-200 dark:border-amber-800/50 mt-12">
    <h3 class="text-xl font-bold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
      <span class="animate-pulse">💡</span> Exam Master Tips
    </h3>
    <ul class="space-y-3 text-slate-700 dark:text-slate-300 text-sm md:text-base">
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>সবচেয়ে নির্ভরযোগ্য:</strong> মেশ টপোলজি (কারণ বিকল্প পথ থাকে)।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>সবচেয়ে জনপ্রিয়:</strong> স্টার টপোলজি।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>একটি নষ্ট হলে পুরো নেটওয়ার্ক অচল:</strong> রিং টপোলজি।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>কেন্দ্রীয় ডিভাইস নষ্ট হলে পুরো নেটওয়ার্ক অচল:</strong> স্টার টপোলজি।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>ব্যাকবোন ক্যাবল নষ্ট হলে পুরো নেটওয়ার্ক অচল:</strong> বাস টপোলজি।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>রিং থেকে মেশ বানাতে:</strong> রিং টপোলজিতে n টি ডিভাইস থাকলে, তাকে মেশ বানাতে n(n-3)/2 টি অতিরিক্ত তার লাগে।</li>
    </ul>
  </div>

</div>
`;
