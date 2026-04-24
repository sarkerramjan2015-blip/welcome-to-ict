export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-violet-900 via-purple-900 to-violet-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-purple-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">রেজিস্টার ও কাউন্টার 🔄</h2>
      <p class="text-purple-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        রেজিস্টার ও কাউন্টার হলো ক্রমিক লজিক সার্কিট (Sequential Circuit) যা ফ্লিপ-ফ্লপের সমন্বয়ে তৈরি। এরা ডেটা সংরক্ষণ ও গণনার কাজ করে।
      </p>
    </div>
  </div>

  <!-- Flip-Flop intro -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-violet-200/50 dark:border-violet-700/50">
    <h3 class="text-2xl font-bold text-violet-800 dark:text-violet-400 mb-4 border-b border-violet-100 dark:border-violet-900/50 pb-2">
      ফ্লিপ-ফ্লপ (Flip-Flop) — রেজিস্টার ও কাউন্টারের ভিত্তি
    </h3>
    <p class="text-slate-700 dark:text-slate-300 mb-4">
      ফ্লিপ-ফ্লপ হলো সবচেয়ে সহজ স্মৃতি উপাদান (Memory Element) — এটি একটি বিট (0 বা 1) সংরক্ষণ করতে পারে। রেজিস্টার ও কাউন্টার এই ফ্লিপ-ফ্লপ দিয়ে তৈরি।
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-2xl border border-violet-200 dark:border-violet-800">
        <h4 class="font-bold text-violet-700 dark:text-violet-300 mb-2">SR ফ্লিপ-ফ্লপ</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">Set-Reset ফ্লিপ-ফ্লপ। সবচেয়ে মৌলিক ধরন।</p>
      </div>
      <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl border border-purple-200 dark:border-purple-800">
        <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-2">D ফ্লিপ-ফ্লপ</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">Data ফ্লিপ-ফ্লপ। রেজিস্টারে সবচেয়ে বেশি ব্যবহৃত।</p>
      </div>
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800">
        <h4 class="font-bold text-indigo-700 dark:text-indigo-300 mb-2">JK ফ্লিপ-ফ্লপ</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">সবচেয়ে বহুমুখী ফ্লিপ-ফ্লপ। কাউন্টারে ব্যবহৃত।</p>
      </div>
    </div>
  </div>

  <!-- Register -->
  <div class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 md:p-8 rounded-3xl shadow-sm border border-violet-200 dark:border-violet-800/50">
    <h3 class="text-2xl font-bold text-violet-800 dark:text-violet-400 mb-6 flex items-center gap-3 border-b border-violet-200 dark:border-violet-800/50 pb-4">
      <span class="p-2 bg-violet-200 dark:bg-violet-800/50 rounded-xl">🗄️</span> রেজিস্টার (Register)
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          <strong>রেজিস্টার</strong> হলো একাধিক ফ্লিপ-ফ্লপের সমষ্টি যা একটি বাইনারি তথ্য (বিট) সাময়িকভাবে সংরক্ষণ করতে পারে। n-বিট রেজিস্টারে n টি ফ্লিপ-ফ্লপ থাকে।
        </p>
        <div class="bg-violet-100 dark:bg-violet-900/30 p-4 rounded-xl border-l-4 border-violet-500 mb-4 text-sm text-slate-700 dark:text-slate-300">
          <strong>উদাহরণ:</strong> ৪-বিট রেজিস্টারে ৪টি ফ্লিপ-ফ্লপ আছে এবং এটি ৪-বিটের একটি সংখ্যা (0000 থেকে 1111) ধারণ করতে পারে।
        </div>
        <h4 class="font-bold text-violet-800 dark:text-violet-300 mb-2">রেজিস্টারের ব্যবহার:</h4>
        <ul class="list-disc ml-5 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
          <li>CPU-র ভেতরে অস্থায়ী ডেটা সংরক্ষণে</li>
          <li>গাণিতিক ও লজিক অপারেশনের মধ্যবর্তী ফলাফল ধরে রাখতে</li>
          <li>ডেটা স্থানান্তর (Data Transfer) এ</li>
          <li>প্রোগ্রাম কাউন্টার হিসেবে</li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold text-lg text-violet-800 dark:text-violet-400 mb-3">শিফট রেজিস্টার (Shift Register)</h4>
        <p class="text-slate-700 dark:text-slate-300 mb-3 text-sm">
          শিফট রেজিস্টারে প্রতিটি ক্লক পালসে ডেটা এক বিট করে বামে বা ডানে সরে যায়।
        </p>
        <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-violet-100 dark:border-violet-800 shadow-inner">
          <div class="text-sm font-bold text-violet-700 dark:text-violet-300 mb-3 text-center">৪-বিট শিফট রেজিস্টার</div>
          <div class="flex justify-center gap-2 items-center">
            <div class="w-12 h-12 bg-violet-200 dark:bg-violet-900/50 border-2 border-violet-500 rounded-lg flex items-center justify-center font-bold text-violet-800 dark:text-violet-300">D₃</div>
            <div class="text-violet-400 text-xl">→</div>
            <div class="w-12 h-12 bg-violet-200 dark:bg-violet-900/50 border-2 border-violet-500 rounded-lg flex items-center justify-center font-bold text-violet-800 dark:text-violet-300">D₂</div>
            <div class="text-violet-400 text-xl">→</div>
            <div class="w-12 h-12 bg-violet-200 dark:bg-violet-900/50 border-2 border-violet-500 rounded-lg flex items-center justify-center font-bold text-violet-800 dark:text-violet-300">D₁</div>
            <div class="text-violet-400 text-xl">→</div>
            <div class="w-12 h-12 bg-violet-200 dark:bg-violet-900/50 border-2 border-violet-500 rounded-lg flex items-center justify-center font-bold text-violet-800 dark:text-violet-300">D₀</div>
          </div>
          <div class="text-center text-xs text-slate-500 mt-2">ক্লক পালসে ডানে শিফট →</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Counter -->
  <div class="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 md:p-8 rounded-3xl shadow-sm border border-purple-200 dark:border-purple-800/50">
    <h3 class="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-6 flex items-center gap-3 border-b border-purple-200 dark:border-purple-800/50 pb-4">
      <span class="p-2 bg-purple-200 dark:bg-purple-800/50 rounded-xl">🔢</span> কাউন্টার (Counter)
    </h3>

    <p class="text-slate-700 dark:text-slate-300 mb-6">
      <strong>কাউন্টার</strong> হলো একটি ক্রমিক লজিক সার্কিট যা ক্লক পালসের সংখ্যা গণনা করে এবং প্রতিটি ক্লক পালসে একটি নির্দিষ্ট ক্রমে তার অবস্থা পরিবর্তন করে।
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-purple-100 dark:border-purple-800 shadow-sm">
        <h4 class="font-bold text-lg text-purple-700 dark:text-purple-300 mb-3">১. আপ কাউন্টার (Up Counter)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-3">প্রতি ক্লকে সংখ্যা ১ বাড়ে। 0→1→2→3→...→15→0</p>
        <div class="font-mono text-sm text-center bg-purple-50 dark:bg-purple-900/30 p-3 rounded-xl">
          <span class="text-purple-600 dark:text-purple-400">0000 → 0001 → 0010 → 0011 → ... → 1111 → 0000</span>
        </div>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-purple-100 dark:border-purple-800 shadow-sm">
        <h4 class="font-bold text-lg text-purple-700 dark:text-purple-300 mb-3">২. ডাউন কাউন্টার (Down Counter)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-3">প্রতি ক্লকে সংখ্যা ১ কমে। 15→14→...→1→0→15</p>
        <div class="font-mono text-sm text-center bg-purple-50 dark:bg-purple-900/30 p-3 rounded-xl">
          <span class="text-purple-600 dark:text-purple-400">1111 → 1110 → 1101 → ... → 0001 → 0000 → 1111</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-purple-100 dark:border-purple-800 shadow-sm">
        <h4 class="font-bold text-lg text-indigo-700 dark:text-indigo-300 mb-3">৩. রিপল কাউন্টার (Ripple/Asynchronous)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm">প্রতিটি ফ্লিপ-ফ্লপ আগেরটির আউটপুটে ট্রিগার হয়। সহজ কিন্তু ধীর — ক্যারি রিপল করে যায়।</p>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-purple-100 dark:border-purple-800 shadow-sm">
        <h4 class="font-bold text-lg text-indigo-700 dark:text-indigo-300 mb-3">৪. সিঙ্ক্রোনাস কাউন্টার (Synchronous)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm">সব ফ্লিপ-ফ্লপ একই ক্লক পালসে ট্রিগার হয়। দ্রুত এবং নির্ভরযোগ্য — আধুনিক কম্পিউটারে ব্যবহৃত।</p>
      </div>
    </div>
  </div>

  <!-- Modulus -->
  <div class="bg-slate-50 dark:bg-slate-800/80 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
    <h3 class="text-xl font-bold text-slate-800 dark:text-slate-300 mb-4 border-b border-slate-200 dark:border-slate-700 pb-3 flex items-center gap-2">
      <span class="text-2xl">🔵</span> মডুলাস (Modulus) ও কাউন্টারের বিট সংখ্যা
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p class="text-slate-700 dark:text-slate-300 mb-3">
          কাউন্টারের <strong>মডুলাস</strong> হলো সেটির মোট স্বতন্ত্র অবস্থার (State) সংখ্যা। n-বিট কাউন্টারের মডুলাস = 2ⁿ।
        </p>
        <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
          <table class="w-full text-sm text-slate-700 dark:text-slate-300 text-center">
            <thead class="bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-200">
              <tr>
                <th class="px-3 py-2">বিট সংখ্যা (n)</th>
                <th class="px-3 py-2">মডুলাস (2ⁿ)</th>
                <th class="px-3 py-2">গণনার পরিসর</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-slate-100 dark:border-slate-700"><td class="py-2">২</td><td>৪</td><td>0 - 3</td></tr>
              <tr class="border-b border-slate-100 dark:border-slate-700 bg-purple-50/30 dark:bg-purple-900/10"><td class="py-2">৩</td><td>৮</td><td>0 - 7</td></tr>
              <tr class="border-b border-slate-100 dark:border-slate-700"><td class="py-2">৪</td><td>১৬</td><td>0 - 15</td></tr>
              <tr class="bg-purple-50/30 dark:bg-purple-900/10"><td class="py-2">৮</td><td>২৫৬</td><td>0 - 255</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h4 class="font-bold text-slate-700 dark:text-slate-300 mb-3">কাউন্টারের প্রয়োগ:</h4>
        <ul class="space-y-3 text-slate-700 dark:text-slate-300">
          <li class="flex gap-2 items-start">
            <span class="text-purple-500 font-bold text-lg leading-5">•</span>
            <span><strong>ডিজিটাল ঘড়ি:</strong> সেকেন্ড, মিনিট, ঘণ্টা গণনা করে</span>
          </li>
          <li class="flex gap-2 items-start">
            <span class="text-purple-500 font-bold text-lg leading-5">•</span>
            <span><strong>ফ্রিকোয়েন্সি বিভাজন:</strong> উচ্চ কম্পাঙ্ককে কমায়</span>
          </li>
          <li class="flex gap-2 items-start">
            <span class="text-purple-500 font-bold text-lg leading-5">•</span>
            <span><strong>Program Counter:</strong> পরবর্তী নির্দেশনার ঠিকানা ধরে রাখে</span>
          </li>
          <li class="flex gap-2 items-start">
            <span class="text-purple-500 font-bold text-lg leading-5">•</span>
            <span><strong>টাইমার সার্কিট:</strong> নির্দিষ্ট সময় গণনা করে</span>
          </li>
          <li class="flex gap-2 items-start">
            <span class="text-purple-500 font-bold text-lg leading-5">•</span>
            <span><strong>ডিজিটাল ডিসপ্লে:</strong> ০-৯ পর্যন্ত সংখ্যা প্রদর্শন</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Key Differences -->
  <div class="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 p-6 rounded-3xl border border-violet-200 dark:border-violet-800/50">
    <h3 class="text-xl font-bold text-violet-800 dark:text-violet-400 mb-4 flex items-center gap-2">
      <span>⭐</span> রেজিস্টার ও কাউন্টারের তুলনা
    </h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-violet-100 dark:bg-violet-900/50 text-violet-900 dark:text-violet-200">
          <tr>
            <th class="px-4 py-3 text-left rounded-tl-xl">বৈশিষ্ট্য</th>
            <th class="px-4 py-3 text-center">রেজিস্টার</th>
            <th class="px-4 py-3 text-center rounded-tr-xl">কাউন্টার</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700">
            <td class="px-4 py-3 font-bold">মূল কাজ</td>
            <td class="px-4 py-3 text-center">ডেটা সংরক্ষণ</td>
            <td class="px-4 py-3 text-center">ইভেন্ট গণনা</td>
          </tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <td class="px-4 py-3 font-bold">গঠন</td>
            <td class="px-4 py-3 text-center">D ফ্লিপ-ফ্লপ</td>
            <td class="px-4 py-3 text-center">JK বা T ফ্লিপ-ফ্লপ</td>
          </tr>
          <tr class="border-b border-slate-100 dark:border-slate-700">
            <td class="px-4 py-3 font-bold">অবস্থা পরিবর্তন</td>
            <td class="px-4 py-3 text-center">ইনপুটের উপর নির্ভর</td>
            <td class="px-4 py-3 text-center">স্বয়ংক্রিয়</td>
          </tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <td class="px-4 py-3 font-bold">ব্যবহার</td>
            <td class="px-4 py-3 text-center">CPU রেজিস্টার, বাফার</td>
            <td class="px-4 py-3 text-center">ঘড়ি, টাইমার</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-bold rounded-bl-xl">সার্কিট ধরন</td>
            <td class="px-4 py-3 text-center">ক্রমিক লজিক</td>
            <td class="px-4 py-3 text-center rounded-br-xl">ক্রমিক লজিক</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</div>
`;
