export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-rose-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-rose-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">বিভিন্ন সংখ্যা পদ্ধতির বিয়োগ ➖</h2>
      <p class="text-rose-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        যেকোনো সংখ্যা পদ্ধতির বিয়োগ করার একটি সাধারণ নিয়ম (Universal Rule) রয়েছে। যোগের মতোই এই নিয়মটি জানলে বাইনারি, অক্টাল বা হেক্সাডেসিমেল যেকোনো বিয়োগ খুব সহজেই করা সম্ভব।
      </p>
    </div>
  </div>

  <!-- Universal Rule -->
  <div class="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-emerald-200 dark:border-emerald-800/50">
    <h3 class="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2 border-b border-emerald-200 dark:border-emerald-800/50 pb-4">
      <span class="p-2 bg-emerald-200 dark:bg-emerald-800/50 rounded-xl">🎯</span> সাধারণ নিয়ম (Universal Rule)
    </h3>
    <ul class="space-y-4 text-slate-700 dark:text-slate-300 text-sm md:text-base">
      <li class="flex items-start gap-3">
        <span class="mt-1 bg-emerald-200 dark:bg-emerald-700 text-emerald-900 dark:text-emerald-100 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0">১</span> 
        <span>ডান দিক থেকে স্বাভাবিক নিয়মে বিয়োগ শুরু করতে হবে।</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="mt-1 bg-emerald-200 dark:bg-emerald-700 text-emerald-900 dark:text-emerald-100 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0">২</span> 
        <span>যদি উপরের ডিজিটটি নিচের ডিজিটের চেয়ে ছোট হয়, তাহলে <strong>উপরের ছোট ডিজিটের সাথে সেই সংখ্যা পদ্ধতির ভিত্তি (Base) যোগ করতে হবে</strong>।</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="mt-1 bg-emerald-200 dark:bg-emerald-700 text-emerald-900 dark:text-emerald-100 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0">৩</span> 
        <span>যখনই উপরের ডিজিটের সাথে ভিত্তি যোগ করা হবে, তখনই <strong>হাতে ১ (Carry = 1) থাকবে</strong>।</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="mt-1 bg-emerald-200 dark:bg-emerald-700 text-emerald-900 dark:text-emerald-100 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0">৪</span> 
        <span>হাতে থাকা ১ বাম পাশের নিচের ডিজিটের সাথে যোগ হবে এবং তারপর আবার উপরেরটি থেকে বিয়োগ হবে।</span>
      </li>
    </ul>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    <!-- Octal Subtraction -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-sky-200/50 dark:border-sky-700/50">
      <h4 class="text-xl font-bold text-sky-700 dark:text-sky-400 mb-4 flex items-center gap-2">
        <span class="p-1.5 bg-sky-100 dark:bg-sky-900/50 rounded-lg">➑</span> অক্টাল বিয়োগ
      </h4>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">অক্টালের ভিত্তি ৮। উপরের সংখ্যা ছোট হলে তার সাথে ৮ যোগ করতে হবে।</p>
      
      <div class="font-mono text-lg bg-sky-50 dark:bg-sky-900/10 p-4 rounded-xl text-center space-y-1">
        <div class="text-slate-600 dark:text-slate-300">&nbsp;&nbsp;4 7 0 1</div>
        <div class="text-slate-600 dark:text-slate-300">- 3 1 0 5</div>
        <div class="border-t-2 border-slate-300 dark:border-slate-600 my-1 w-28 mx-auto"></div>
        <div class="font-bold text-sky-600 dark:text-sky-400">1 5 7 4</div>
      </div>
      <div class="mt-4 text-xs text-slate-600 dark:text-slate-400 space-y-1">
        <p><strong>ব্যাখ্যা:</strong></p>
        <p>• 1 থেকে 5 বিয়োগ করা যায় না। তাই 1 এর সাথে ভিত্তি 8 যোগ করলে হয় 9। 9-5 = 4। হাতে 1।</p>
        <p>• নিচের 0 এর সাথে হাতের 1 যোগ হয়ে 1 হলো। উপরে 0 থেকে 1 বিয়োগ যায় না। তাই 0+8=8। 8-1 = 7। হাতে 1।</p>
        <p>• নিচের 1 এর সাথে হাতের 1 যোগ হয়ে 2 হলো। 7-2 = 5। হাতে কিছু নেই।</p>
        <p>• 4-3 = 1।</p>
      </div>
    </div>

    <!-- Hexadecimal Subtraction -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-purple-200/50 dark:border-purple-700/50">
      <h4 class="text-xl font-bold text-purple-700 dark:text-purple-400 mb-4 flex items-center gap-2">
        <span class="p-1.5 bg-purple-100 dark:bg-purple-900/50 rounded-lg">⓰</span> হেক্সাডেসিমেল বিয়োগ
      </h4>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">ভিত্তি ১৬। উপরের সংখ্যা ছোট হলে তার সাথে ১৬ যোগ করতে হবে। (A=10...F=15)</p>
      
      <div class="font-mono text-lg bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl text-center space-y-1">
        <div class="text-slate-600 dark:text-slate-300">&nbsp;&nbsp;1 8 A B</div>
        <div class="text-slate-600 dark:text-slate-300">- &nbsp;&nbsp;B 7 8</div>
        <div class="border-t-2 border-slate-300 dark:border-slate-600 my-1 w-32 mx-auto"></div>
        <div class="font-bold text-purple-600 dark:text-purple-400">&nbsp;&nbsp;&nbsp;&nbsp;D 3 3</div>
      </div>
      <div class="mt-4 text-xs text-slate-600 dark:text-slate-400 space-y-1">
        <p><strong>ব্যাখ্যা:</strong></p>
        <p>• B(11) থেকে 8 গেলে 3। হাতে কিছু নেই।</p>
        <p>• A(10) থেকে 7 গেলে 3। হাতে কিছু নেই।</p>
        <p>• 8 থেকে B(11) যায় না। 8+16 = 24। 24 - 11 = 13(D)। হাতে 1।</p>
        <p>• নিচের 0 এর সাথে 1 যোগ হয়ে 1 হলো। 1-1 = 0।</p>
      </div>
    </div>

    <!-- Binary Subtraction -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-pink-200/50 dark:border-pink-700/50">
      <h4 class="text-xl font-bold text-pink-700 dark:text-pink-400 mb-4 flex items-center gap-2">
        <span class="p-1.5 bg-pink-100 dark:bg-pink-900/50 rounded-lg">➋</span> বাইনারি বিয়োগ
      </h4>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">বাইনারির ভিত্তি ২। উপরের সংখ্যা ছোট (0) হলে তার সাথে ২ যোগ করতে হবে।</p>
      
      <div class="font-mono text-lg bg-pink-50 dark:bg-pink-900/10 p-4 rounded-xl text-center space-y-1">
        <div class="text-slate-600 dark:text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;1 1 1 1 1 0</div>
        <div class="text-slate-600 dark:text-slate-300">- &nbsp;&nbsp;1 1 0 0 1 1</div>
        <div class="border-t-2 border-slate-300 dark:border-slate-600 my-1 w-32 mx-auto"></div>
        <div class="font-bold text-pink-600 dark:text-pink-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 0 1 1</div>
      </div>
      <div class="mt-4 text-xs text-slate-600 dark:text-slate-400 space-y-1">
        <p><strong>শর্টকাট নিয়ম:</strong></p>
        <p>• 0 - 0 = 0</p>
        <p>• 1 - 0 = 1</p>
        <p>• 1 - 1 = 0</p>
        <p>• 0 - 1 = 1 (কারণ 0 এর সাথে ২ যোগ হবে, 2-1=1। এক্ষেত্রে হাতে 1 থাকবে যা বামের নিচের সংখ্যার সাথে যোগ হবে)</p>
      </div>
    </div>

  </div>

</div>
`;
