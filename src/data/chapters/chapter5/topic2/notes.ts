export const notes = `
<div class="space-y-10">
  <div class="bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full font-semibold text-sm mb-4 border border-white/30">অধ্যায় ৫</div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">অনুবাদক প্রোগ্রাম</h2>
    <p class="text-cyan-100 text-lg font-medium max-w-3xl">Source Program থেকে Object Program তৈরি করার সফটওয়্যার, তার ধরন, কাজ এবং Compiler-Interpreter পার্থক্য।</p>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-200/50">
    <h3 class="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-4">মূল ধারণা</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-2">অনুবাদক প্রোগ্রাম</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">উৎস প্রোগ্রামকে কম্পিউটারের বোধগম্য মেশিন ভাষা বা বস্তু প্রোগ্রামে রূপান্তর করার সফটওয়্যারকে অনুবাদক প্রোগ্রাম বলে।</p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-2">কেন প্রয়োজন?</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">মানুষ সাধারণত উচ্চস্তর বা অ্যাসেম্বলি ভাষায় প্রোগ্রাম লেখে, কিন্তু কম্পিউটার সরাসরি মেশিন ভাষা বুঝতে পারে। তাই অনুবাদক দরকার।</p>
      </div>
    </div>
    <div class="mt-5 bg-slate-900 p-4 rounded-2xl font-mono text-sm text-green-400 overflow-x-auto">
      Source Program &nbsp;→&nbsp; Translator Program &nbsp;→&nbsp; Object Program
    </div>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5">অনুবাদক প্রোগ্রামের প্রকারভেদ</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200">
        <div class="bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold mb-3">১</div>
        <h4 class="font-bold text-blue-700 mb-2">কম্পাইলার</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">সম্পূর্ণ প্রোগ্রাম একবারে অনুবাদ করে। ভুল থাকলে সব ভুল একত্রে দেখায় এবং সঠিক হলে Object Code তৈরি করে।</p>
      </div>
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-200">
        <div class="bg-indigo-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold mb-3">২</div>
        <h4 class="font-bold text-indigo-700 mb-2">ইন্টারপ্রেটার</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">প্রোগ্রাম লাইন বাই লাইন অনুবাদ ও নির্বাহ করে। কোনো লাইনে ভুল পেলে অনুবাদ বন্ধ করে দেয়।</p>
      </div>
      <div class="bg-violet-50 dark:bg-violet-900/20 p-5 rounded-2xl border border-violet-200">
        <div class="bg-violet-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold mb-3">৩</div>
        <h4 class="font-bold text-violet-700 mb-2">অ্যাসেম্বলার</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">অ্যাসেম্বলি ভাষার নেমোনিক কোডকে মেশিন ভাষায় রূপান্তর করে। এটি দ্বিতীয় প্রজন্মের ভাষার জন্য ব্যবহৃত হয়।</p>
      </div>
    </div>
  </div>

  <div class="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 md:p-8 rounded-3xl border border-cyan-200">
    <h3 class="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-5">কম্পাইলার বনাম ইন্টারপ্রেটার</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-cyan-100 dark:bg-cyan-900/50">
          <tr><th class="px-4 py-3 text-left rounded-tl-xl">বিষয়</th><th class="px-4 py-3 text-left">কম্পাইলার</th><th class="px-4 py-3 text-left rounded-tr-xl">ইন্টারপ্রেটার</th></tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-semibold">অনুবাদ পদ্ধতি</td><td class="px-4 py-2">সম্পূর্ণ প্রোগ্রাম একসাথে</td><td class="px-4 py-2">লাইন বাই লাইন</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-cyan-50/40"><td class="px-4 py-2 font-semibold">ভুল প্রদর্শন</td><td class="px-4 py-2">সব ভুল একত্রে দেখায়</td><td class="px-4 py-2">এক লাইনে ভুল পেলে থেমে যায়</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-semibold">Object Program</td><td class="px-4 py-2">তৈরি করে</td><td class="px-4 py-2">সাধারণত তৈরি করে না</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-cyan-50/40"><td class="px-4 py-2 font-semibold">নির্বাহের গতি</td><td class="px-4 py-2">দ্রুত</td><td class="px-4 py-2">তুলনামূলক ধীর</td></tr>
          <tr><td class="px-4 py-2 font-semibold">উদাহরণ</td><td class="px-4 py-2">C, C++</td><td class="px-4 py-2">Python, BASIC</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-4">পরীক্ষায় মনে রাখবে</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-200">
        <h4 class="font-bold text-green-700 mb-1">ডিবাগিং</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">লাইন ধরে ভুল ধরার জন্য ইন্টারপ্রেটার সুবিধাজনক।</p>
      </div>
      <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border border-amber-200">
        <h4 class="font-bold text-amber-700 mb-1">দ্রুত নির্বাহ</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">কম্পাইল করা প্রোগ্রাম দ্রুত চলে, কারণ অনুবাদ আগে সম্পন্ন হয়।</p>
      </div>
      <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl border border-purple-200">
        <h4 class="font-bold text-purple-700 mb-1">অ্যাসেম্বলি ভাষা</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">নেমোনিক কোডকে মেশিন কোডে রূপান্তরের জন্য অ্যাসেম্বলার লাগে।</p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-1">মূল শব্দ</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">Source Program, Object Program, Compiler, Interpreter ও Assembler আলাদা করে চিনতে হবে।</p>
      </div>
    </div>
  </div>
</div>
`;
