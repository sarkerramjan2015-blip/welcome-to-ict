export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-purple-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">বুলিয়ান অ্যালজেবরা ও উপপাদ্য 🧮</h2>
      <p class="text-purple-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        ইংরেজ গণিতবিদ জর্জ বুল গণিত ও যুক্তির মধ্যে সম্পর্ক স্থাপন করে বুলিয়ান অ্যালজেবরা তৈরি করেন। এটি সত্য (True) ও মিথ্যা (False) এই দুটি স্তরের উপর ভিত্তি করে তৈরি।
      </p>
    </div>
  </div>

  <!-- Fundamentals -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 flex items-center gap-3 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
      <span class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-xl">💡</span> বুলিয়ান অ্যালজেবরার ভিত্তি
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-3">লজিক লেভেল (Logic Levels)</h4>
        <ul class="space-y-3 text-slate-700 dark:text-slate-300">
          <li class="flex items-start gap-2">
            <span class="text-indigo-500 mt-1">●</span>
            <span>ডিজিটাল ডিভাইসে বিদ্যুতের উপস্থিতি ১ (সত্য) এবং অনুপস্থিতি ০ (মিথ্যা) ধরা হয়।</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-indigo-500 mt-1">●</span>
            <span>ভোল্টেজ ০ থেকে ০.৮ V হলে <strong>লজিক ০</strong> ধরা হয়।</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-indigo-500 mt-1">●</span>
            <span>ভোল্টেজ ২ থেকে ৫ V হলে <strong>লজিক ১</strong> ধরা হয়।</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-red-500 mt-1">●</span>
            <span>০.৮ থেকে ২ ভোল্ট সংজ্ঞায়িত নয় (Invalid/Undefined)।</span>
          </li>
        </ul>
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-2xl border border-purple-100 dark:border-purple-800/30">
        <h4 class="font-bold text-lg text-purple-800 dark:text-purple-300 mb-3">মৌলিক অপারেশন ও চলক</h4>
        <ul class="space-y-3 text-slate-700 dark:text-slate-300">
          <li class="flex items-start gap-2">
            <span class="text-purple-500 mt-1">●</span>
            <span><strong>AND (.):</strong> যৌক্তিক গুণ (Logical Multiplication)।</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-purple-500 mt-1">●</span>
            <span><strong>OR (+):</strong> যৌক্তিক যোগ (Logical Addition)।</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-purple-500 mt-1">●</span>
            <span><strong>NOT (' বা ¯):</strong> যৌক্তিক পূরক (Logical Inversion)।</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-purple-500 mt-1">●</span>
            <span><strong>চলক (Variable):</strong> যার মান পরিবর্তনশীল (যেমন: A, B)।</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-purple-500 mt-1">●</span>
            <span><strong>ধ্রুবক (Constant):</strong> যার মান অপরিবর্তনশীল (যেমন: 0, 1)।</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Postulates -->
  <div class="bg-gradient-to-r from-sky-100 to-cyan-100 dark:from-sky-900/30 dark:to-cyan-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-sky-200 dark:border-sky-800/50">
    <h3 class="text-xl font-bold text-sky-800 dark:text-sky-400 mb-4 flex items-center gap-2">
      <span class="p-1.5 bg-sky-200 dark:bg-sky-800/50 rounded-xl">📐</span> বুলিয়ান স্বতঃসিদ্ধ (Postulates)
    </h3>
    <p class="text-slate-700 dark:text-slate-300 mb-6">
      বুলিয়ান অ্যালজেবরায় যোগ ও গুণের জন্য বিশেষ কিছু নিয়ম সত্য হিসেবে মেনে নেওয়া হয়। এই নিয়মগুলোকে বলা হয় বুলিয়ান স্বতঃসিদ্ধ।
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- OR -->
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-sky-200 dark:border-sky-700">
        <h4 class="font-bold text-sky-700 dark:text-sky-400 text-center mb-3 border-b border-sky-100 dark:border-sky-800 pb-2">যোগের স্বতঃসিদ্ধ (OR)</h4>
        <div class="space-y-2 font-mono text-center text-slate-800 dark:text-slate-200">
          <div>0 + 0 = 0</div>
          <div>0 + 1 = 1</div>
          <div>1 + 0 = 1</div>
          <div class="text-red-500 dark:text-red-400 font-bold">1 + 1 = 1</div>
        </div>
      </div>
      
      <!-- AND -->
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-sky-200 dark:border-sky-700">
        <h4 class="font-bold text-sky-700 dark:text-sky-400 text-center mb-3 border-b border-sky-100 dark:border-sky-800 pb-2">গুণের স্বতঃসিদ্ধ (AND)</h4>
        <div class="space-y-2 font-mono text-center text-slate-800 dark:text-slate-200">
          <div>0 . 0 = 0</div>
          <div>0 . 1 = 0</div>
          <div>1 . 0 = 0</div>
          <div>1 . 1 = 1</div>
        </div>
      </div>

      <!-- NOT -->
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-sky-200 dark:border-sky-700">
        <h4 class="font-bold text-sky-700 dark:text-sky-400 text-center mb-3 border-b border-sky-100 dark:border-sky-800 pb-2">পূরকের স্বতঃসিদ্ধ (NOT)</h4>
        <div class="space-y-2 font-mono text-center text-slate-800 dark:text-slate-200">
          <div>0' = 1</div>
          <div>1' = 0</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Dual Principle & De Morgan's -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/50">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div>
        <h3 class="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4 border-b border-emerald-100 dark:border-emerald-900/50 pb-2">
          দ্বৈতনীতি (Dual Principle)
        </h3>
        <p class="text-slate-700 dark:text-slate-300 mb-3">
          বুলিয়ান অ্যালজেবরার সমীকরণ দুটি নিয়ম মেনে চলে:
        </p>
        <ul class="space-y-2 text-slate-700 dark:text-slate-300 ml-4 list-disc">
          <li><strong>0</strong> এবং <strong>1</strong> পরস্পর বিনিময় করা যায়।</li>
          <li><strong>OR (+)</strong> এবং <strong>AND (.)</strong> পরস্পর বিনিময় করা যায়।</li>
        </ul>
        <div class="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl font-mono text-sm border border-emerald-100 dark:border-emerald-800">
          উদাহরণ: 1 + 0 = 1 এর দ্বৈত রূপ হবে 0 . 1 = 0
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4 border-b border-emerald-100 dark:border-emerald-900/50 pb-2">
          ডি-মরগ্যানের উপপাদ্য (De Morgan's)
        </h3>
        <p class="text-slate-700 dark:text-slate-300 mb-3">
          ফরাসি গণিতবিদ ডি মরগ্যান বুলিয়ান ফাংশন সরলীকরণ করার জন্য দুটি সূত্র আবিষ্কার করেন:
        </p>
        <div class="space-y-4 font-mono text-center bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div>
            <span class="block text-xs text-slate-500 mb-1">প্রথম উপপাদ্য (যৌক্তিক যোগের পূরক = পূরকের যৌক্তিক গুণ)</span>
            <strong>(A + B)' = A' . B'</strong>
          </div>
          <hr class="border-slate-200 dark:border-slate-700" />
          <div>
            <span class="block text-xs text-slate-500 mb-1">দ্বিতীয় উপপাদ্য (যৌক্তিক গুণের পূরক = পূরকের যৌক্তিক যোগ)</span>
            <strong>(A . B)' = A' + B'</strong>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Key Theorems -->
  <div class="bg-indigo-50 dark:bg-slate-800/80 p-6 md:p-8 rounded-3xl shadow-sm border border-indigo-100 dark:border-indigo-800">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 text-center">গুরুত্বপূর্ণ বুলিয়ান উপপাদ্য</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono text-sm md:text-base">
      <div class="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-800">
        <span class="block text-xs text-indigo-400 mb-1">Identity</span>
        A + 0 = A<br/>A . 1 = A
      </div>
      <div class="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-800">
        <span class="block text-xs text-indigo-400 mb-1">Domination</span>
        A + 1 = 1<br/>A . 0 = 0
      </div>
      <div class="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-800">
        <span class="block text-xs text-indigo-400 mb-1">Idempotent</span>
        A + A = A<br/>A . A = A
      </div>
      <div class="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-800">
        <span class="block text-xs text-indigo-400 mb-1">Complement</span>
        A + A' = 1<br/>A . A' = 0
      </div>
      <div class="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-800">
        <span class="block text-xs text-indigo-400 mb-1">Involution</span>
        (A')' = A
      </div>
      <div class="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-800">
        <span class="block text-xs text-indigo-400 mb-1">Absorption</span>
        A + AB = A<br/>A(A+B) = A
      </div>
      <div class="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-800 col-span-1 sm:col-span-2">
        <span class="block text-xs text-indigo-400 mb-1">Distributive</span>
        A(B+C) = AB + AC<br/>
        A + BC = (A+B)(A+C)
      </div>
    </div>
  </div>

</div>
`;
