export const notes = `
<div class="space-y-10">
  <div class="bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full font-semibold text-sm mb-4 border border-white/30">অধ্যায় ৫</div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">প্রোগ্রামিং ধারণা ও ভাষার প্রজন্ম 💻</h2>
    <p class="text-purple-100 text-lg font-medium max-w-3xl">CPU, মেমোরি, প্রোগ্রাম, প্রোগ্রামিং ভাষার প্রজন্ম ও স্তর সম্পর্কে বিস্তারিত আলোচনা।</p>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-violet-200/50">
    <h3 class="text-2xl font-bold text-violet-800 dark:text-violet-400 mb-4">🖥️ CPU ও মেমোরি</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
      <div class="bg-violet-50 dark:bg-violet-900/20 p-5 rounded-2xl border border-violet-200">
        <h4 class="font-bold text-violet-700 mb-2">CPU (Central Processing Unit)</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">CPU বা মাইক্রোপ্রসেসর কম্পিউটারের প্রধান অংশ যা গাণিতিক ও যৌক্তিক অপারেশন (যোগ, বিয়োগ, গুণ, ভাগ) করে।</p>
      </div>
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-200">
        <h4 class="font-bold text-indigo-700 mb-2">মেমোরির প্রকারভেদ</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">অস্থায়ী (RAM) — বিদ্যুৎ গেলে ডেটা মুছে যায়<br/>স্থায়ী (ROM, HDD) — ডেটা থাকে।</p>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-violet-100 dark:bg-violet-900/50"><tr><th class="px-4 py-3 text-left rounded-tl-xl">বৈশিষ্ট্য</th><th class="px-4 py-3 text-left">RAM (অস্থায়ী)</th><th class="px-4 py-3 text-left rounded-tr-xl">Non-Volatile (স্থায়ী)</th></tr></thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-semibold">ডেটা সংরক্ষণ</td><td class="px-4 py-2">বিদ্যুৎ গেলে মুছে যায়</td><td class="px-4 py-2">বিদ্যুৎ গেলেও থাকে</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-violet-50/30"><td class="px-4 py-2 font-semibold">গতি</td><td class="px-4 py-2">দ্রুত</td><td class="px-4 py-2">ধীর</td></tr>
          <tr><td class="px-4 py-2 font-semibold">উদাহরণ</td><td class="px-4 py-2">র‍্যাম (RAM)</td><td class="px-4 py-2">HDD, ROM, DVD, USB</td></tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 text-sm">
      <strong>মেমোরির ক্রম (প্রসেসর থেকে দূরত্ব):</strong> রেজিস্টার → ক্যাশ মেমোরি → RAM → ভার্চুয়াল মেমোরি
    </div>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-purple-200/50">
    <h3 class="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-4">📝 মূল সংজ্ঞা</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
      <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl border border-purple-200">
        <h4 class="font-bold text-purple-700 mb-1">প্রোগ্রাম</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">কোনো সুনির্দিষ্ট কার্য সম্পাদনের উদ্দেশ্যে কম্পিউটারের বোধগম্য ভাষায় লিখিত নির্দেশের সমষ্টি।</p>
      </div>
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-200">
        <h4 class="font-bold text-indigo-700 mb-1">প্রোগ্রামিং ভাষা</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">যে ভাষার সাহায্যে যন্ত্রকে নির্দেশনা দিয়ে সমস্যা সমাধান করা যায়। যেমন: C, C++, Java, Python।</p>
      </div>
      <div class="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-2xl border border-violet-200">
        <h4 class="font-bold text-violet-700 mb-1">প্রোগ্রামিং</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">প্রোগ্রামিং ভাষা ব্যবহার করে যন্ত্রকে নির্দেশনা দেওয়া বা প্রোগ্রাম রচনার পদ্ধতি।</p>
      </div>
      <div class="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-2xl border border-pink-200">
        <h4 class="font-bold text-pink-700 mb-1">প্রোগ্রামার</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">যে ব্যক্তি প্রোগ্রামিং ভাষায় প্রোগ্রাম লেখে।</p>
      </div>
    </div>
  </div>

  <div class="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 p-6 md:p-8 rounded-3xl border border-violet-200">
    <h3 class="text-2xl font-bold text-violet-800 dark:text-violet-400 mb-5">🔢 প্রজন্মের ভিত্তিতে প্রোগ্রামিং ভাষা</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-violet-100 dark:bg-violet-900/50">
          <tr><th class="px-3 py-3 text-left rounded-tl-xl">প্রজন্ম</th><th class="px-3 py-3 text-left">নাম</th><th class="px-3 py-3 text-left">বৈশিষ্ট্য</th><th class="px-3 py-3 text-left">সময়কাল</th><th class="px-3 py-3 text-left rounded-tr-xl">উদাহরণ</th></tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-3 py-2 font-bold text-red-600">1GL</td><td class="px-3 py-2">মেশিন ভাষা</td><td class="px-3 py-2">শুধু ০ ও ১ (বাইনারি)</td><td class="px-3 py-2">১৯৪৫~</td><td class="px-3 py-2">—</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-violet-50/30"><td class="px-3 py-2 font-bold text-orange-600">2GL</td><td class="px-3 py-2">অ্যাসেম্বলি ভাষা</td><td class="px-3 py-2">নেমোনিক কোড ব্যবহার</td><td class="px-3 py-2">১৯৫০-৬০</td><td class="px-3 py-2">—</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-3 py-2 font-bold text-yellow-600">3GL</td><td class="px-3 py-2">উচ্চস্তরের ভাষা</td><td class="px-3 py-2">ইংরেজির মতো শব্দ</td><td class="px-3 py-2">১৯৬০-৭০</td><td class="px-3 py-2">C, C++, Java, Python</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-violet-50/30"><td class="px-3 py-2 font-bold text-green-600">4GL</td><td class="px-3 py-2">অতি উচ্চস্তরের</td><td class="px-3 py-2">ডেটাবেজ কাজের জন্য</td><td class="px-3 py-2">১৯৭০-৮০</td><td class="px-3 py-2">SQL, Oracle</td></tr>
          <tr><td class="px-3 py-2 font-bold text-blue-600">5GL</td><td class="px-3 py-2">স্বাভাবিক ভাষা</td><td class="px-3 py-2">AI নির্ভর, কৃত্রিম বুদ্ধিমত্তা</td><td class="px-3 py-2">১৯৮০~</td><td class="px-3 py-2">PROLOG, LISP</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-4">📊 স্তরের ভিত্তিতে প্রোগ্রামিং ভাষা</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
      <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-200">
        <h4 class="font-bold text-red-700 mb-1">নিম্নস্তরের ভাষা (Low Level)</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">মেশিন ভাষা ও অ্যাসেম্বলি ভাষা। হার্ডওয়্যারের কাছাকাছি।</p>
      </div>
      <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl border border-orange-200">
        <h4 class="font-bold text-orange-700 mb-1">মধ্যমস্তরের ভাষা (Mid Level)</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">C, Forth, Dbase। নিম্ন ও উচ্চ উভয় বৈশিষ্ট্য।</p>
      </div>
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-200">
        <h4 class="font-bold text-green-700 mb-1">উচ্চস্তরের ভাষা (High Level)</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">FORTRAN, BASIC, Pascal, Java, Python। মানুষের বোঝা সহজ।</p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-1">অতি উচ্চস্তরের ভাষা (Very High Level)</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">SQL, Oracle। ডেটাবেজ কাজের জন্য বিশেষভাবে উপযুক্ত।</p>
      </div>
    </div>
    <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-200 text-sm">
      <strong>গুরুত্বপূর্ণ:</strong> মেশিন ভাষা → প্রোগ্রামের জন্য অনুবাদকের দরকার নেই। অ্যাসেম্বলি → Assembler দরকার। উচ্চস্তরের → Compiler/Interpreter দরকার।
    </div>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-purple-200/50">
    <h3 class="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-4">🏆 জনপ্রিয় প্রোগ্রামিং ভাষা</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-purple-100 dark:bg-purple-900/50"><tr><th class="px-3 py-3 text-left rounded-tl-xl">ভাষা</th><th class="px-3 py-3 text-left">জনক</th><th class="px-3 py-3 text-left">সাল</th><th class="px-3 py-3 text-left rounded-tr-xl">ব্যবহার</th></tr></thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-3 py-2 font-bold text-blue-600">C</td><td class="px-3 py-2">ডেনিস রিচি</td><td class="px-3 py-2">১৯৭২</td><td class="px-3 py-2">সিস্টেম সফটওয়্যার, OS</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-purple-50/30"><td class="px-3 py-2 font-bold text-purple-600">C++</td><td class="px-3 py-2">Bjarne Stroustrup</td><td class="px-3 py-2">১৯৮০</td><td class="px-3 py-2">গেম, সিস্টেম সফটওয়্যার</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-3 py-2 font-bold text-orange-600">Java</td><td class="px-3 py-2">James Gosling</td><td class="px-3 py-2">১৯৯৫</td><td class="px-3 py-2">Android, ওয়েব অ্যাপ</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-purple-50/30"><td class="px-3 py-2 font-bold text-green-600">Python</td><td class="px-3 py-2">Guido van Rossum</td><td class="px-3 py-2">১৯৯১</td><td class="px-3 py-2">AI, ডেটা সায়েন্স, ML</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-3 py-2 font-bold text-red-600">FORTRAN</td><td class="px-3 py-2">John Backus</td><td class="px-3 py-2">১৯৫৭</td><td class="px-3 py-2">বৈজ্ঞানিক গণনা</td></tr>
          <tr><td class="px-3 py-2 font-bold text-teal-600">SQL</td><td class="px-3 py-2">IBM</td><td class="px-3 py-2">১৯৭৪</td><td class="px-3 py-2">ডেটাবেজ ম্যানেজমেন্ট</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;
