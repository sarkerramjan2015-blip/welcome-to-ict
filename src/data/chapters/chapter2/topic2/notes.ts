export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-blue-900 via-indigo-800 to-violet-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.05 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z"/></svg>
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-indigo-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">ডেটা ট্রান্সমিশন মেথড 🔄</h2>
      <p class="text-indigo-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        ডেটা ট্রান্সমিশন বলতে ডেটা পরিবহন বা ডেটার স্থানান্তরকে বুঝায়। ডেটা কমিউনিকেশন সিস্টেমে বিভিন্ন ডিভাইসের সাথে লিঙ্ক স্থাপনের জন্য ব্যবহৃত পদ্ধতি এবং ডেটা ট্রান্সমিশনের জন্য সময়ের সাথে বিট সিনক্রোনাইজেশনকে <strong>ডেটা ট্রান্সমিশন মেথড</strong> বলা হয়।
      </p>
    </div>
  </div>

  <!-- Parallel & Serial -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 flex items-center gap-3 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
      <span class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">🔌</span> ট্রান্সমিশন পদ্ধতির প্রকারভেদ
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
      <!-- Parallel -->
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-3">১. সমান্তরাল (Parallel) ট্রান্সমিশন</h4>
        <p class="text-slate-700 dark:text-slate-300 mb-3">প্রেরক ও প্রাপকের মধ্যে সমান্তরালে ডেটা চলাচল করলে তাকে সমান্তরাল ডেটা ট্রান্সমিশন বলে।</p>
        <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li>✅ <strong>সুবিধা:</strong> দ্রুত গতি সম্পন্ন পদ্ধতি।</li>
          <li>❌ <strong>অসুবিধা:</strong> ব্যয় সাপেক্ষ, কারণ n বিট ডেটার জন্য n টি লাইন বা চ্যানেল প্রয়োজন।</li>
          <li>🎯 <strong>ব্যবহার:</strong> ভিডিও স্ট্রিমিং, প্যারালাল প্রিন্টার পোর্ট ও ক্যাবল।</li>
        </ul>
      </div>

      <!-- Serial -->
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-3">২. অনুক্রম (Serial) ট্রান্সমিশন</h4>
        <p class="text-slate-700 dark:text-slate-300 mb-3">প্রেরক ও প্রাপকের মধ্যে ধারাবাহিক ভাবে একটি বিটের পর অপর বিট চলাচল করলে তাকে সিরিয়াল ট্রান্সমিশন বলে।</p>
        <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li>✅ <strong>সুবিধা:</strong> ব্যয় কম, ডেটা চলাচলের জন্য একটি লাইন প্রয়োজন।</li>
          <li>❌ <strong>অসুবিধা:</strong> একই সময়ে একটি বিট স্থানান্তরিত হয়, ফলে ধীর গতি।</li>
          <li>🎯 <strong>ব্যবহার:</strong> মডেম, মাউস, USB ইত্যাদি।</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Bit Synchronization & Serial Methods -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50">
    <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30 mb-8">
      <h4 class="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2"><span class="text-2xl">⏱️</span> বিট সিনক্রোনাইজেশন (Bit Synchronization)</h4>
      <p class="text-slate-700 dark:text-slate-300">
        সিরিয়াল ডেটা ট্রান্সমিশন পদ্ধতিতে সিগন্যাল পাঠানোর সময় বিভিন্ন বিটের মধ্যে সমন্বয়ের জন্য ব্যবহৃত পদ্ধতিকে <strong>বিট সিনক্রোনাইজেশন</strong> বলে। বিট সিনক্রোনাইজেশনের উপর ভিত্তি করে সিরিয়াল ট্রান্সমিশন <strong>তিন</strong> প্রকার:
      </p>
    </div>

    <!-- Asynchronous, Synchronous, Isochronous -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Asynchronous -->
      <div class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800/30 shadow-sm hover:-translate-y-1 transition-transform duration-300">
        <h4 class="text-lg font-bold text-orange-700 dark:text-orange-400 mb-3">অ্যাসিনক্রোনাস (Asynchronous)</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300 mb-4 pb-4 border-b border-orange-200/50 dark:border-orange-800/30">
          ডেটা <strong>ক্যারেক্টার বাই ক্যারেক্টার</strong> পাঠানো হয়। প্রেরক যেকোন সময় ডেটা পাঠাতে পারে।
        </p>
        <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li>🔹 প্রতিটি ক্যারেক্টারের মাঝে সময়ের ব্যবধান অসমান।</li>
          <li>🔹 শুরুতে Start Bit এবং শেষে Stop Bit থাকে।</li>
          <li>✅ প্রাইমারি মেমোরি প্রয়োজন হয় না। খরচ কম।</li>
          <li>❌ দক্ষতা ও গতি কম।</li>
          <li>🎯 <strong>ব্যবহার:</strong> কীবোর্ড থেকে কম্পিউটার, কার্ড রিডার।</li>
        </ul>
      </div>

      <!-- Synchronous -->
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800/30 shadow-sm hover:-translate-y-1 transition-transform duration-300">
        <h4 class="text-lg font-bold text-green-700 dark:text-green-400 mb-3">সিনক্রোনাস (Synchronous)</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300 mb-4 pb-4 border-b border-green-200/50 dark:border-green-800/30">
          ডেটা <strong>ব্লক বা প্যাকেট আকারে</strong> (৮০-১৩২ ক্যারেক্টার) পাঠানো হয়।
        </p>
        <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li>🔹 দুটি ব্লকের মাঝখানে সময় বিরতি <strong>সমান</strong> হয়।</li>
          <li>🔹 ব্লকের শুরুতে হেডার এবং শেষে ট্রেইলর থাকে।</li>
          <li>✅ দক্ষতা ও গতি অনেক বেশি।</li>
          <li>❌ প্রাইমারি স্টোরেজ প্রয়োজন। ব্যয়বহুল।</li>
          <li>🎯 <strong>ব্যবহার:</strong> কম্পিউটার টু কম্পিউটার, দূরবর্তী স্থান।</li>
        </ul>
      </div>

      <!-- Isochronous -->
      <div class="bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800/30 shadow-sm hover:-translate-y-1 transition-transform duration-300">
        <h4 class="text-lg font-bold text-purple-700 dark:text-purple-400 mb-3">আইসোক্রোনাস (Isochronous)</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300 mb-4 pb-4 border-b border-purple-200/50 dark:border-purple-800/30">
          এটি সিনক্রোনাসের একটি উন্নত ভার্সন। ডেটা <strong>ব্লক আকারে</strong> পাঠানো হয়।
        </p>
        <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li>🔹 দুটি ব্লকের মধ্যে সময়ের পার্থক্য <strong>০ (শূন্য)</strong> করার চেষ্টা করা হয়।</li>
          <li>✅ ট্রান্সমিশন গতি সবচেয়ে বেশি।</li>
          <li>❌ ভুল সংশোধন করার ব্যবস্থা নেই। ব্যয়বহুল।</li>
          <li>🎯 <strong>ব্যবহার:</strong> রিয়েল টাইম অ্যাপ্লিকেশন, অডিও/ভিডিও কল।</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Exam Tips -->
  <div class="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-amber-200 dark:border-amber-800/50 mt-12">
    <h3 class="text-xl font-bold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
      <span class="animate-pulse">💡</span> Exam Master Tips
    </h3>
    <ul class="space-y-3 text-slate-700 dark:text-slate-300 text-sm md:text-base">
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>MCQ হ্যাক:</strong> কীবোর্ড থেকে সিপিইউ = অ্যাসিনক্রোনাস। রিয়েল টাইম/লাইভ স্ট্রিমিং/ভিডিও কল = আইসোক্রোনাস।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>CQ হ্যাক:</strong> উদ্দীপকে যদি "স্টার্ট ও স্টপ বিট" বা "ক্যারেক্টার বাই ক্যারেক্টার" বলা হয় তবে সেটি অ্যাসিনক্রোনাস। আর যদি "সমান বিরতি", "হেডার ও ট্রেইলর", "ব্লক আকারে" বলা হয় তবে সেটি সিনক্রোনাস।</li>
    </ul>
  </div>

</div>
`;
