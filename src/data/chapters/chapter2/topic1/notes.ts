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
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">ডেটা কমিউনিকেশন সিস্টেম ও ব্যান্ডউইথ 📡</h2>
      <p class="text-indigo-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        নেটওয়ার্কের এক যন্ত্র থেকে অন্য যন্ত্রে নির্ভরযোগ্যভাবে ডেটা বা তথ্যের আদান-প্রদানই হচ্ছে <strong>ডেটা কমিউনিকেশন</strong>। আর যে পরিমাণ ডেটা প্রতি সেকেন্ডে স্থানান্তরিত হয়, তাকে বলে <strong>ব্যান্ডউইথ (Bandwidth)</strong>।
      </p>
    </div>
  </div>

  <!-- 5 Basic Elements of Data Communication -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 flex items-center gap-3 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
      <span class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">🔗</span> ডেটা কমিউনিকেশনের ৫টি মৌলিক উপাদান
    </h3>
    
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 overflow-x-auto">
      <div class="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
        <div class="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-center min-w-[100px]">১. উৎস</div>
        <span class="text-indigo-500">➡️</span>
        <div class="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-center min-w-[100px]">২. প্রেরক</div>
        <span class="text-indigo-500">➡️</span>
        <div class="bg-indigo-500 text-white p-3 rounded-lg shadow-sm text-center min-w-[100px]">৩. মাধ্যম</div>
        <span class="text-indigo-500">➡️</span>
        <div class="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-center min-w-[100px]">৪. প্রাপক</div>
        <span class="text-indigo-500">➡️</span>
        <div class="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-center min-w-[100px]">৫. গন্তব্য</div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base text-slate-700 dark:text-slate-300">
      <div class="space-y-4">
        <p><strong>১. উৎস (Source):</strong> যে ডিভাইস হতে ডেটা পাঠানো হয়। যেমন: কম্পিউটার, মাইক্রোফোন, মোবাইল ফোন।</p>
        <p><strong>২. প্রেরক (Transmitter):</strong> যে যন্ত্র ডেটাকে মাধ্যমের মধ্য দিয়ে প্রেরণের উপযোগী করে (এনকোড করে)। যেমন: মডেম, রাউটার।</p>
        <p class="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800/50"><strong>৩. মাধ্যম (Medium):</strong> যার মধ্য দিয়ে ডেটা স্থানান্তর হয় (কমিউনিকেশন চ্যানেল)। যেমন: ক্যাবল বা রেডিও ওয়েব।</p>
      </div>
      <div class="space-y-4">
        <p><strong>৪. প্রাপক (Receiver):</strong> মাধ্যম থেকে ডেটা সিগন্যাল গ্রহণ করে গন্তব্যের উপযোগী করে (ডিকোড করে)। যেমন: মডেম।</p>
        <p><strong>৫. গন্তব্য (Destination):</strong> ট্রান্সমিশনের পর ডেটা সর্বশেষ যে যন্ত্রে পৌঁছায়। যেমন: সার্ভার, লাউড স্পিকার, কম্পিউটার।</p>
      </div>
    </div>
  </div>

  <!-- Bandwidth & Data Transmission Speed -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Narrow Band -->
    <div class="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 p-6 md:p-8 rounded-3xl shadow-md border border-rose-100 dark:border-rose-800/30 hover:-translate-y-1 transition-transform duration-300">
      <div class="text-3xl mb-4">🐢</div>
      <h3 class="text-xl font-bold text-rose-700 dark:text-rose-400 mb-2">ন্যারো ব্যান্ড (Narrow Band)</h3>
      <p class="text-rose-600 dark:text-rose-300 font-bold mb-4 bg-rose-100/50 dark:bg-rose-900/30 inline-block px-3 py-1 rounded-full text-sm">৪৫ - ৩০০ bps</p>
      <p class="text-sm text-slate-700 dark:text-slate-300">
        অত্যন্ত ধীরগতিতে ডেটা স্থানান্তরের ক্ষেত্রে ব্যবহৃত হয়। সাধারণত <strong>টেলিগ্রাফিতে</strong> ন্যারো ব্যান্ড ব্যবহৃত হয়।
      </p>
    </div>

    <!-- Voice Band -->
    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 md:p-8 rounded-3xl shadow-md border border-blue-100 dark:border-blue-800/30 hover:-translate-y-1 transition-transform duration-300">
      <div class="text-3xl mb-4">🚶</div>
      <h3 class="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">ভয়েস ব্যান্ড (Voice Band)</h3>
      <p class="text-blue-600 dark:text-blue-300 font-bold mb-4 bg-blue-100/50 dark:bg-blue-900/30 inline-block px-3 py-1 rounded-full text-sm">১২০০ - ৯৬০০ bps</p>
      <p class="text-sm text-slate-700 dark:text-slate-300">
        সাধারণত <strong>টেলিফোনে</strong> বেশি ব্যবহৃত হয়। এছাড়া কম্পিউটার থেকে <strong>প্রিন্টারে বা কার্ড রিডারে</strong> ডেটা স্থানান্তরে ব্যবহৃত হয়।
      </p>
    </div>

    <!-- Broad Band -->
    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 md:p-8 rounded-3xl shadow-md border border-emerald-100 dark:border-emerald-800/30 hover:-translate-y-1 transition-transform duration-300">
      <div class="text-3xl mb-4">🚀</div>
      <h3 class="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">ব্রড ব্যান্ড (Broad Band)</h3>
      <p class="text-emerald-600 dark:text-emerald-300 font-bold mb-4 bg-emerald-100/50 dark:bg-emerald-900/30 inline-block px-3 py-1 rounded-full text-sm">১ Mbps বা এর অধিক</p>
      <p class="text-sm text-slate-700 dark:text-slate-300">
        উচ্চগতিসম্পন্ন ডেটা ট্রান্সমিশনে ব্যবহৃত হয়। যেমন: কো-এক্সিয়াল ক্যাবল, <strong>ফাইবার অপটিক ক্যাবল</strong>, স্যাটেলাইট, মাইক্রোওয়েভ ইত্যাদি।
      </p>
    </div>
  </div>

  <!-- Bandwidth Calculation Box -->
  <div class="bg-slate-900 text-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-700 overflow-hidden relative mt-10">
    <div class="absolute -right-10 -top-10 opacity-10">
      <span class="text-9xl font-black">bps</span>
    </div>
    <h3 class="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
      <span class="text-2xl">🧮</span> ব্যান্ডউইথ পরিমাপের একক ও সূত্র
    </h3>
    <div class="bg-slate-800/80 p-5 rounded-2xl border border-slate-600 font-mono text-sm md:text-base">
      <p class="mb-2 text-yellow-300">// bps = bit per second</p>
      <p class="mb-1"><span class="text-purple-400">১ বাইট (Byte)</span> = ৮ বিট (bit)</p>
      <p class="mb-1"><span class="text-purple-400">১ কিলোবাইট (KB)</span> = ১০২৪ বাইট (B)</p>
      <p class="mb-1"><span class="text-purple-400">১ মেগাবাইট (MB)</span> = ১০২৪ কিলোবাইট (KB)</p>
      <div class="mt-4 pt-4 border-t border-slate-600">
        <p class="text-green-400 font-bold">💡 Bandwidth = Total Bits / Time (in seconds)</p>
        <p class="text-slate-400 text-sm mt-2">Example: 5 সেকেন্ডে 9000 bit স্থানান্তরিত হলে, ব্যান্ডউইথ = 9000 / 5 = 1800 bps.</p>
      </div>
    </div>
  </div>

  <!-- Exam Tips -->
  <div class="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-amber-200 dark:border-amber-800/50 mt-12">
    <h3 class="text-xl font-bold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
      <span class="animate-pulse">💡</span> Exam Master Tips
    </h3>
    <ul class="space-y-3 text-slate-700 dark:text-slate-300 text-sm md:text-base">
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>MCQ হ্যাক:</strong> কম্পিউটার থেকে প্রিন্টারে বা কীবোর্ডে ডেটা স্থানান্তর = Voice Band (9600 bps)। HD ভিডিও কনফারেন্সিং = Broad Band (1 Mbps)। bps-এ 'b' ছোট হাতের হলে bit, আর 'B' বড় হাতের হলে Byte।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>CQ হ্যাক:</strong> উদ্দীপকে যদি "ডেটা ট্রান্সফার অত্যন্ত ধীরগতিতে (যেমন 300 bps)" বোঝায়, তবে সেটি ন্যারো ব্যান্ড। আর যদি "ডেটা ট্রান্সফার অনেক দ্রুত (যেমন অপটিক্যাল ফাইবার, আলোর বেগে)" বলা হয়, তবে সেটি ব্রড ব্যান্ড।</li>
    </ul>
  </div>

</div>
`;
