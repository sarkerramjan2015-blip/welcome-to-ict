export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-fuchsia-900 via-rose-900 to-fuchsia-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-rose-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">মৌলিক লজিক গেইট 🔌</h2>
      <p class="text-rose-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        লজিক গেট হলো একটি ডিজিটাল সার্কিট যা এক বা একাধিক ইনপুট নিয়ে একটি আউটপুট তৈরি করে। এটি ইনপুটের ভিত্তিতে সিদ্ধান্ত নিয়ে আউটপুট নির্ধারণ করে।
      </p>
    </div>
  </div>

  <!-- Introduction -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-rose-200/50 dark:border-rose-700/50">
    <h3 class="text-2xl font-bold text-rose-700 dark:text-rose-400 mb-6 flex items-center gap-3 border-b border-rose-100 dark:border-rose-900/50 pb-4">
      <span class="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-xl text-xl">🔍</span> লজিক গেইটের প্রকারভেদ
    </h3>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div class="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-2xl border border-rose-100 dark:border-rose-800/30">
        <h4 class="font-bold text-lg text-rose-800 dark:text-rose-300 mb-2">১. মৌলিক গেইট</h4>
        <ul class="text-slate-700 dark:text-slate-300 list-disc ml-5 mt-2 space-y-1">
          <li>AND (যৌক্তিক গুণ)</li>
          <li>OR (যৌক্তিক যোগ)</li>
          <li>NOT (যৌক্তিক পূরক)</li>
        </ul>
      </div>

      <div class="bg-fuchsia-50 dark:bg-fuchsia-900/10 p-5 rounded-2xl border border-fuchsia-100 dark:border-fuchsia-800/30">
        <h4 class="font-bold text-lg text-fuchsia-800 dark:text-fuchsia-300 mb-2">২. সার্বজনীন গেইট</h4>
        <ul class="text-slate-700 dark:text-slate-300 list-disc ml-5 mt-2 space-y-1">
          <li>NAND</li>
          <li>NOR</li>
        </ul>
      </div>

      <div class="bg-pink-50 dark:bg-pink-900/10 p-5 rounded-2xl border border-pink-100 dark:border-pink-800/30">
        <h4 class="font-bold text-lg text-pink-800 dark:text-pink-300 mb-2">৩. বিশেষ গেইট</h4>
        <ul class="text-slate-700 dark:text-slate-300 list-disc ml-5 mt-2 space-y-1">
          <li>XOR (Exclusive OR)</li>
          <li>XNOR (Exclusive NOR)</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Basic Gates Deep Dive -->
  <div class="space-y-6">
    
    <!-- OR Gate -->
    <div class="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-orange-200 dark:border-orange-800/50">
      <h3 class="text-xl font-bold text-orange-800 dark:text-orange-400 mb-4 flex items-center gap-2">
        <span class="p-1.5 bg-orange-200 dark:bg-orange-800/50 rounded-xl">➕</span> OR গেইট (যৌক্তিক যোগ)
      </h3>
      <p class="text-slate-700 dark:text-slate-300 mb-4">
        OR গেইটের ক্ষেত্রে ইনপুটগুলোর যেকোনো একটি 1 (ON) হলেই আউটপুট 1 (ON) হয়। এর কাজ হলো বুলিয়ান যোগ করা।
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div class="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl flex justify-center">
          <!-- Note: Actual SVG symbol for OR gate would go here -->
          <div class="text-center">
            <p class="font-mono text-lg font-bold text-orange-700 dark:text-orange-400 mb-2">লজিক ফাংশন: Y = A + B</p>
            <div class="relative w-32 h-16 bg-white dark:bg-slate-700 rounded-r-full border-2 border-orange-500 flex items-center justify-center shadow-sm">
              <span class="absolute -left-6 top-2 text-sm font-bold">A</span>
              <span class="absolute -left-6 bottom-2 text-sm font-bold">B</span>
              <span class="absolute -left-1 top-3 w-4 h-px bg-slate-800 dark:bg-slate-200"></span>
              <span class="absolute -left-1 bottom-3 w-4 h-px bg-slate-800 dark:bg-slate-200"></span>
              <span class="absolute -right-6 text-sm font-bold">Y</span>
              <span class="absolute -right-2 w-4 h-px bg-slate-800 dark:bg-slate-200"></span>
              <span class="font-bold text-orange-500">OR</span>
            </div>
          </div>
        </div>
        
        <div>
          <table class="w-full text-sm text-center text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm">
            <thead class="bg-orange-200/50 dark:bg-orange-900/50 text-orange-900 dark:text-orange-200">
              <tr>
                <th class="px-4 py-2 border-r border-orange-200 dark:border-orange-800">A</th>
                <th class="px-4 py-2 border-r border-orange-200 dark:border-orange-800">B</th>
                <th class="px-4 py-2">Y = A + B</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-orange-100 dark:border-orange-800/30">
                <td class="px-4 py-2 border-r border-orange-200 dark:border-orange-800">0</td>
                <td class="px-4 py-2 border-r border-orange-200 dark:border-orange-800">0</td>
                <td class="px-4 py-2 font-bold">0</td>
              </tr>
              <tr class="border-b border-orange-100 dark:border-orange-800/30">
                <td class="px-4 py-2 border-r border-orange-200 dark:border-orange-800">0</td>
                <td class="px-4 py-2 border-r border-orange-200 dark:border-orange-800">1</td>
                <td class="px-4 py-2 font-bold text-orange-600 dark:text-orange-400">1</td>
              </tr>
              <tr class="border-b border-orange-100 dark:border-orange-800/30">
                <td class="px-4 py-2 border-r border-orange-200 dark:border-orange-800">1</td>
                <td class="px-4 py-2 border-r border-orange-200 dark:border-orange-800">0</td>
                <td class="px-4 py-2 font-bold text-orange-600 dark:text-orange-400">1</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border-r border-orange-200 dark:border-orange-800">1</td>
                <td class="px-4 py-2 border-r border-orange-200 dark:border-orange-800">1</td>
                <td class="px-4 py-2 font-bold text-orange-600 dark:text-orange-400">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- AND Gate -->
    <div class="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-emerald-200 dark:border-emerald-800/50">
      <h3 class="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
        <span class="p-1.5 bg-emerald-200 dark:bg-emerald-800/50 rounded-xl">✖️</span> AND গেইট (যৌক্তিক গুণ)
      </h3>
      <p class="text-slate-700 dark:text-slate-300 mb-4">
        AND গেইটের ক্ষেত্রে ইনপুটগুলোর <strong>সবগুলো 1 (ON) হলেই কেবল</strong> আউটপুট 1 (ON) হয়। এর কাজ হলো বুলিয়ান গুণ করা।
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div class="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl flex justify-center">
          <div class="text-center">
            <p class="font-mono text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-2">লজিক ফাংশন: Y = A . B</p>
            <div class="relative w-32 h-16 bg-white dark:bg-slate-700 rounded-r-full rounded-l-none border-2 border-emerald-500 flex items-center justify-center shadow-sm">
              <span class="absolute -left-6 top-2 text-sm font-bold">A</span>
              <span class="absolute -left-6 bottom-2 text-sm font-bold">B</span>
              <span class="absolute -left-0 top-3 w-4 h-px bg-slate-800 dark:bg-slate-200"></span>
              <span class="absolute -left-0 bottom-3 w-4 h-px bg-slate-800 dark:bg-slate-200"></span>
              <span class="absolute -right-6 text-sm font-bold">Y</span>
              <span class="absolute -right-2 w-4 h-px bg-slate-800 dark:bg-slate-200"></span>
              <span class="font-bold text-emerald-500">AND</span>
            </div>
          </div>
        </div>
        
        <div>
          <table class="w-full text-sm text-center text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm">
            <thead class="bg-emerald-200/50 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200">
              <tr>
                <th class="px-4 py-2 border-r border-emerald-200 dark:border-emerald-800">A</th>
                <th class="px-4 py-2 border-r border-emerald-200 dark:border-emerald-800">B</th>
                <th class="px-4 py-2">Y = A . B</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-emerald-100 dark:border-emerald-800/30">
                <td class="px-4 py-2 border-r border-emerald-200 dark:border-emerald-800">0</td>
                <td class="px-4 py-2 border-r border-emerald-200 dark:border-emerald-800">0</td>
                <td class="px-4 py-2 font-bold">0</td>
              </tr>
              <tr class="border-b border-emerald-100 dark:border-emerald-800/30">
                <td class="px-4 py-2 border-r border-emerald-200 dark:border-emerald-800">0</td>
                <td class="px-4 py-2 border-r border-emerald-200 dark:border-emerald-800">1</td>
                <td class="px-4 py-2 font-bold">0</td>
              </tr>
              <tr class="border-b border-emerald-100 dark:border-emerald-800/30">
                <td class="px-4 py-2 border-r border-emerald-200 dark:border-emerald-800">1</td>
                <td class="px-4 py-2 border-r border-emerald-200 dark:border-emerald-800">0</td>
                <td class="px-4 py-2 font-bold">0</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border-r border-emerald-200 dark:border-emerald-800">1</td>
                <td class="px-4 py-2 border-r border-emerald-200 dark:border-emerald-800">1</td>
                <td class="px-4 py-2 font-bold text-emerald-600 dark:text-emerald-400">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- NOT Gate -->
    <div class="bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-red-200 dark:border-red-800/50">
      <h3 class="text-xl font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
        <span class="p-1.5 bg-red-200 dark:bg-red-800/50 rounded-xl">🔄</span> NOT গেইট (যৌক্তিক পূরক)
      </h3>
      <p class="text-slate-700 dark:text-slate-300 mb-4">
        NOT গেইটের <strong>শুধুমাত্র একটি ইনপুট এবং একটি আউটপুট থাকে</strong>। এটি ইনপুটকে উল্টে দেয় (Invert)। ইনপুট 1 হলে আউটপুট 0, ইনপুট 0 হলে আউটপুট 1 হয়।
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div class="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl flex justify-center">
          <div class="text-center">
            <p class="font-mono text-lg font-bold text-red-700 dark:text-red-400 mb-2">লজিক ফাংশন: Y = A'</p>
            <div class="relative w-24 h-16 flex items-center justify-center">
              <span class="absolute -left-6 text-sm font-bold">A</span>
              <span class="absolute -left-2 w-4 h-px bg-slate-800 dark:bg-slate-200"></span>
              <!-- Triangle -->
              <div class="w-0 h-0 border-t-[16px] border-t-transparent border-l-[24px] border-l-red-500 border-b-[16px] border-b-transparent"></div>
              <!-- Bubble -->
              <div class="w-3 h-3 border-2 border-red-500 rounded-full bg-white dark:bg-slate-700 -ml-[2px] z-10"></div>
              
              <span class="absolute -right-6 text-sm font-bold">Y</span>
              <span class="absolute -right-2 w-4 h-px bg-slate-800 dark:bg-slate-200"></span>
            </div>
          </div>
        </div>
        
        <div>
          <table class="w-full text-sm text-center text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm">
            <thead class="bg-red-200/50 dark:bg-red-900/50 text-red-900 dark:text-red-200">
              <tr>
                <th class="px-4 py-2 border-r border-red-200 dark:border-red-800">A</th>
                <th class="px-4 py-2">Y = A'</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-red-100 dark:border-red-800/30">
                <td class="px-4 py-2 border-r border-red-200 dark:border-red-800">0</td>
                <td class="px-4 py-2 font-bold text-red-600 dark:text-red-400">1</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border-r border-red-200 dark:border-red-800">1</td>
                <td class="px-4 py-2 font-bold">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</div>
`;
