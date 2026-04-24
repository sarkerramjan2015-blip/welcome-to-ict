export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-blue-800 to-sky-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-blue-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">ডেটা ট্রান্সমিশন মোড ও ডেলিভারি মোড 📡</h2>
      <p class="text-blue-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        উৎস থেকে গন্তব্যে ডেটা স্থানান্তরের ক্ষেত্রে ডেটা প্রবাহের দিককে ডেটা ট্রান্সমিশন মোড বলে। অন্যদিকে প্রাপকের সংখ্যা ও ডেটা গ্রহণের অধিকারের ওপর ভিত্তি করে ডেটা বিতরণ করার পদ্ধতিকে ডেটা ডেলিভারি মোড বলে।
      </p>
    </div>
  </div>

  <!-- Data Transmission Modes -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50">
    <h3 class="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6 flex items-center gap-3 border-b border-blue-100 dark:border-blue-900/50 pb-4">
      <span class="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">↔️</span> ডেটা ট্রান্সমিশন মোড (প্রবাহের দিকের ওপর ভিত্তি করে)
    </h3>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Simplex -->
      <div class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
        <h4 class="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <span class="text-blue-500">➡️</span> সিমপ্লেক্স (Simplex)
        </h4>
        <p class="text-sm text-slate-700 dark:text-slate-300 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          ডেটা শুধুমাত্র <strong>একদিকে</strong> প্রবাহিত হয়। একপক্ষ কেবল ডেটা পাঠাতে পারে, গ্রহণ করতে পারে না।
        </p>
        <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li>✅ পুরো ব্যান্ডউইথ ব্যবহার করা যায়।</li>
          <li>❌ ডিভাইসসমূহের মধ্যে আন্তঃযোগাযোগ নেই।</li>
          <li>🎯 <strong>উদাহরণ:</strong> কীবোর্ড থেকে কম্পিউটার, রেডিও, টিভি সম্প্রচার।</li>
        </ul>
      </div>

      <!-- Half Duplex -->
      <div class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
        <h4 class="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <span class="text-amber-500">↔️ (একবারে একজন)</span> হাফ-ডুপ্লেক্স (Half-Duplex)
        </h4>
        <p class="text-sm text-slate-700 dark:text-slate-300 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          উভয় দিকে ডেটা আদান-প্রদান করা যায়, তবে <strong>একই সময়ে নয়</strong>। একজন পাঠানো শেষ করলে অন্যজন পাঠাতে পারে।
        </p>
        <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li>✅ ত্রুটি শনাক্তকরণ সম্ভব।</li>
          <li>❌ ডেটা প্রেরণে বিলম্ব হতে পারে।</li>
          <li>🎯 <strong>উদাহরণ:</strong> ওয়াকি-টকি, ওয়েব ব্রাউজিং।</li>
        </ul>
      </div>

      <!-- Full Duplex -->
      <div class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
        <h4 class="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <span class="text-green-500">⇄ (একই সাথে)</span> ফুল-ডুপ্লেক্স (Full-Duplex)
        </h4>
        <p class="text-sm text-slate-700 dark:text-slate-300 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          একই সময়ে <strong>উভয় দিকে</strong> যুগপৎ ডেটা আদান-প্রদান করা যায়।
        </p>
        <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li>✅ যোগাযোগ সবচেয়ে দ্রুত।</li>
          <li>❌ চ্যানেল দুটি অংশে বিভক্ত হয়।</li>
          <li>🎯 <strong>উদাহরণ:</strong> মোবাইল ফোন, টেলিফোন নেটওয়ার্ক।</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Data Delivery Modes -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/50 mt-8">
    <h3 class="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-3 border-b border-emerald-100 dark:border-emerald-900/50 pb-4">
      <span class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">🌐</span> ডেটা ডেলিভারি মোড (প্রাপকের সংখ্যার ওপর ভিত্তি করে)
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Unicast -->
      <div class="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
        <h4 class="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-3">১. ইউনিকাস্ট (Unicast)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-3"><strong>পয়েন্ট-টু-পয়েন্ট (One-to-One):</strong> একটি প্রেরক শুধুমাত্র একটি নির্দিষ্ট প্রাপককে ডেটা পাঠায়।</p>
        <div class="bg-white/50 dark:bg-slate-800 p-3 rounded-lg text-sm text-slate-600 dark:text-slate-400">
          <strong>উদাহরণ:</strong> ওয়েবসাইট ব্রাউজ করা, FTP সার্ভার থেকে ডাউনলোড করা, এক বন্ধুকে SMS করা।
        </div>
      </div>

      <!-- Multicast -->
      <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800/30">
        <h4 class="text-lg font-bold text-teal-700 dark:text-teal-400 mb-3">২. মাল্টিকাস্ট (Multicast)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-3"><strong>পয়েন্ট-টু-সিলেক্টেড মাল্টিপয়েন্ট (One-to-Selected):</strong> একটি প্রেরক শুধুমাত্র নির্দিষ্ট একটি গ্রুপের সদস্যদের কাছে ডেটা পাঠায়।</p>
        <div class="bg-white/50 dark:bg-slate-800 p-3 rounded-lg text-sm text-slate-600 dark:text-slate-400">
          <strong>উদাহরণ:</strong> ভিডিও কনফারেন্স, গ্রুপ SMS, মেসেঞ্জার গ্রুপ চ্যাট।
        </div>
      </div>

      <!-- Broadcast -->
      <div class="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800/30">
        <h4 class="text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-3">৩. ব্রডকাস্ট (Broadcast)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-3"><strong>পয়েন্ট-টু-মাল্টিপয়েন্ট (One-to-All):</strong> একটি প্রেরক নেটওয়ার্কের অধীনস্ত সকল নোডকে একসাথে ডেটা পাঠায়।</p>
        <div class="bg-white/50 dark:bg-slate-800 p-3 rounded-lg text-sm text-slate-600 dark:text-slate-400">
          <strong>উদাহরণ:</strong> টিভি বা রেডিও সম্প্রচার।
        </div>
      </div>
    </div>
  </div>

  <!-- Exam Tips -->
  <div class="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-amber-200 dark:border-amber-800/50 mt-12">
    <h3 class="text-xl font-bold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
      <span class="animate-pulse">💡</span> Exam Master Tips
    </h3>
    <ul class="space-y-3 text-slate-700 dark:text-slate-300 text-sm md:text-base">
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>টেলিভিশন/রেডিও:</strong> এটি ট্রান্সমিশন মোডের দিক দিয়ে সিমপ্লেক্স এবং ডেলিভারি মোডের দিক দিয়ে ব্রডকাস্ট।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>ওয়াকিটকি:</strong> ডেটা আদান-প্রদান করা যায় কিন্তু একসাথে নয়। তাই এটি হাফ-ডুপ্লেক্স।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>মোবাইল ফোন:</strong> যুগপৎ কথা বলা ও শোনা যায় বলে এটি ফুল-ডুপ্লেক্স। আর যদি মাল্টিপল মানুষ একসাথে কলে যুক্ত থাকে (যেমন কনফারেন্স), তবে তা মাল্টিকাস্ট ডেলিভারি মোড।</li>
    </ul>
  </div>

</div>
`;
