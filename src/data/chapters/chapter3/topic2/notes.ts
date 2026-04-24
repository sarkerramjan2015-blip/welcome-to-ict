export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-sky-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sky-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">বিভিন্ন সংখ্যা পদ্ধতির যোগ ➕</h2>
      <p class="text-sky-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        যেকোনো সংখ্যা পদ্ধতির যোগ করার একটি সাধারণ নিয়ম (Universal Rule) রয়েছে। এই নিয়মটি জানলে বাইনারি, অক্টাল বা হেক্সাডেসিমেল যেকোনো যোগ খুব সহজেই করা সম্ভব।
      </p>
    </div>
  </div>

  <!-- Universal Rule -->
  <div class="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-amber-200 dark:border-amber-800/50">
    <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-400 mb-4 flex items-center gap-2 border-b border-amber-200 dark:border-amber-800/50 pb-4">
      <span class="p-2 bg-amber-200 dark:bg-amber-800/50 rounded-xl">🎯</span> সাধারণ নিয়ম (Universal Rule)
    </h3>
    <ul class="space-y-4 text-slate-700 dark:text-slate-300 text-sm md:text-base">
      <li class="flex items-start gap-3">
        <span class="mt-1 bg-amber-200 dark:bg-amber-700 text-amber-900 dark:text-amber-100 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0">১</span> 
        <span>যেকোনো সংখ্যা পদ্ধতির যোগ করতে হলে, ডান দিক থেকে স্বাভাবিক নিয়মে (দশমিকের মতো) যোগ করতে হবে।</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="mt-1 bg-amber-200 dark:bg-amber-700 text-amber-900 dark:text-amber-100 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0">২</span> 
        <span>যোগফল যদি সেই সংখ্যা পদ্ধতির <strong>ভিত্তি (Base) এর সমান বা বড় হয়</strong>, তবে যোগফলকে ভিত্তি দিয়ে ভাগ করতে হবে।</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="mt-1 bg-amber-200 dark:bg-amber-700 text-amber-900 dark:text-amber-100 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0">৩</span> 
        <span>ভাগের <strong>ভাগশেষ (Remainder)</strong> নিচে বসবে।</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="mt-1 bg-amber-200 dark:bg-amber-700 text-amber-900 dark:text-amber-100 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0">৪</span> 
        <span>ভাগের <strong>ভাগফল (Quotient)</strong> হাতে থাকবে এবং বাম পাশের সংখ্যার সাথে যোগ হবে (Carry)।</span>
      </li>
    </ul>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    <!-- Octal Addition -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/50">
      <h4 class="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
        <span class="p-1.5 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">➑</span> অক্টাল যোগ
      </h4>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">অক্টালের ভিত্তি ৮। যোগফল ৮ বা তার বেশি হলে ৮ দিয়ে ভাগ করতে হবে।</p>
      
      <div class="font-mono text-lg bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl text-center space-y-1">
        <div class="text-slate-600 dark:text-slate-300">&nbsp;&nbsp;5 4 2</div>
        <div class="text-slate-600 dark:text-slate-300">+ 6 4 0</div>
        <div class="border-t-2 border-slate-300 dark:border-slate-600 my-1 w-24 mx-auto"></div>
        <div class="font-bold text-emerald-600 dark:text-emerald-400">1 4 0 2</div>
      </div>
      <div class="mt-4 text-xs text-slate-600 dark:text-slate-400 space-y-1">
        <p><strong>ব্যাখ্যা:</strong></p>
        <p>• 2 + 0 = 2 (৮ এর চেয়ে ছোট, তাই 2 বসবে)।</p>
        <p>• 4 + 4 = 8 (৮ এর সমান। ৮÷৮ = ভাগফল ১, ভাগশেষ ০। তাই ০ বসবে, হাতে ১)।</p>
        <p>• 5 + 6 + 1(হাতে) = 12 (৮ এর বড়। ১২÷৮ = ভাগফল ১, ভাগশেষ ৪। তাই ৪ বসবে, হাতে ১ বামে বসবে)।</p>
      </div>
    </div>

    <!-- Hexadecimal Addition -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-rose-200/50 dark:border-rose-700/50">
      <h4 class="text-xl font-bold text-rose-700 dark:text-rose-400 mb-4 flex items-center gap-2">
        <span class="p-1.5 bg-rose-100 dark:bg-rose-900/50 rounded-lg">⓰</span> হেক্সাডেসিমেল যোগ
      </h4>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">ভিত্তি ১৬। যোগফল ১৬ বা তার বেশি হলে ১৬ দিয়ে ভাগ করতে হবে। (A=10, B=11...F=15)</p>
      
      <div class="font-mono text-lg bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl text-center space-y-1">
        <div class="text-slate-600 dark:text-slate-300">&nbsp;&nbsp;5 8 A B</div>
        <div class="text-slate-600 dark:text-slate-300">+ 3 B 7 8</div>
        <div class="border-t-2 border-slate-300 dark:border-slate-600 my-1 w-32 mx-auto"></div>
        <div class="font-bold text-rose-600 dark:text-rose-400">&nbsp;&nbsp;9 4 2 3</div>
      </div>
      <div class="mt-4 text-xs text-slate-600 dark:text-slate-400 space-y-1">
        <p><strong>ব্যাখ্যা:</strong></p>
        <p>• B(11)+8 = 19 (১৬ এর বড়। ১৯÷১৬ = ভাগফল ১, ভাগশেষ ৩। তাই ৩ বসবে, হাতে ১)।</p>
        <p>• A(10)+7+1 = 18 (১৮÷১৬ = ভাগফল ১, ভাগশেষ ২। ২ বসবে, হাতে ১)।</p>
        <p>• 8+B(11)+1 = 20 (২০÷১৬ = ভাগফল ১, ভাগশেষ ৪। ৪ বসবে, হাতে ১)।</p>
        <p>• 5+3+1 = 9 (১৬ এর ছোট, তাই 9 বসবে)।</p>
      </div>
    </div>

    <!-- Binary Addition -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50">
      <h4 class="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
        <span class="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg">➋</span> বাইনারি যোগ
      </h4>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">বাইনারির ভিত্তি ২। যোগফল ২ বা তার বেশি হলে ২ দিয়ে ভাগ করতে হবে।</p>
      
      <div class="font-mono text-lg bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl text-center space-y-1">
        <div class="text-slate-600 dark:text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;1 0 1 0 1</div>
        <div class="text-slate-600 dark:text-slate-300">+ &nbsp;&nbsp;1 1 0 0 1</div>
        <div class="border-t-2 border-slate-300 dark:border-slate-600 my-1 w-32 mx-auto"></div>
        <div class="font-bold text-blue-600 dark:text-blue-400">&nbsp;&nbsp;1 0 1 1 1 0</div>
      </div>
      <div class="mt-4 text-xs text-slate-600 dark:text-slate-400 space-y-1">
        <p><strong>শর্টকাট নিয়ম:</strong></p>
        <p>• 0 + 0 = 0</p>
        <p>• 0 + 1 = 1</p>
        <p>• 1 + 0 = 1</p>
        <p>• 1 + 1 = 10 (0 বসবে, হাতে 1)</p>
        <p>• 1 + 1 + 1 = 11 (1 বসবে, হাতে 1)</p>
      </div>
    </div>

  </div>

</div>
`;
