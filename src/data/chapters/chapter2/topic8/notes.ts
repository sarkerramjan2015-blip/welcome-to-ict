export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-sky-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-indigo-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">কম্পিউটার নেটওয়ার্ক 🌐</h2>
      <p class="text-indigo-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        কম্পিউটার নেটওয়ার্ক হলো এমন একটি সিস্টেম যেখানে একাধিক কম্পিউটার একে অপরের সাথে সংযুক্ত হয়ে তথ্য, হার্ডওয়্যার, এবং সফটওয়্যার রিসোর্স শেয়ার করে। এর মূল উদ্দেশ্য হলো রিসোর্স শেয়ারিং এর মাধ্যমে খরচ কমানো এবং যোগাযোগ সহজ করা।
      </p>
    </div>
  </div>

  <!-- Ownership & Control -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-sky-200/50 dark:border-sky-700/50">
    <h3 class="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-6 flex items-center gap-3 border-b border-sky-100 dark:border-sky-900/50 pb-4">
      মালিকানা ও নিয়ন্ত্রণ কাঠামোর ভিত্তিতে নেটওয়ার্ক
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-100 dark:border-sky-800/30">
        <h4 class="font-bold text-sky-700 dark:text-sky-400 mb-2">প্রাইভেট vs পাবলিক নেটওয়ার্ক</h4>
        <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-3">
          <li><strong>প্রাইভেট নেটওয়ার্ক:</strong> কোনো ব্যক্তি বা প্রতিষ্ঠানের নিজস্ব নেটওয়ার্ক। নিরাপত্তা অত্যন্ত মজবুত। যেকেউ ব্যবহার করতে পারে না (যেমন- ব্যাংকের নিজস্ব নেটওয়ার্ক)।</li>
          <li><strong>পাবলিক নেটওয়ার্ক:</strong> যেকেউ অর্থের বিনিময়ে ব্যবহার করতে পারে। ট্রাফিক বেশি থাকে (যেমন- মোবাইল নেটওয়ার্ক, ইন্টারনেট)।</li>
        </ul>
      </div>
      
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30">
        <h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">সার্ভিস প্রদান কাঠামো</h4>
        <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-3">
          <li><strong>ক্লায়েন্ট সার্ভার:</strong> একটি কেন্দ্রীয় সার্ভার থাকে যা সব রিসোর্স ও নিরাপত্তা নিয়ন্ত্রণ করে। বাকিরা (ক্লায়েন্ট) সার্ভার থেকে সেবা নেয়।</li>
          <li><strong>পিয়ার-টু-পিয়ার (P2P):</strong> কোনো সার্ভার নেই। প্রতিটি কম্পিউটার নিজেই ক্লায়েন্ট এবং সার্ভার হিসেবে কাজ করে (সর্বাধিক ২৫টি কম্পিউটারে ভালো)।</li>
          <li><strong>হাইব্রিড নেটওয়ার্ক:</strong> ক্লায়েন্ট-সার্ভার এবং P2P এর মিশ্রণ।</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Geographical Span (PAN, LAN, CAN, MAN, WAN) -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/50 mt-8">
    <h3 class="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-3 border-b border-emerald-100 dark:border-emerald-900/50 pb-4">
      <span class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">🗺️</span> ভৌগলিক বিস্তৃতির ভিত্তিতে নেটওয়ার্ক
    </h3>
    
    <div class="space-y-6">
      
      <!-- PAN -->
      <div class="p-5 border-l-4 border-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-r-xl">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">⌚</span>
          <h4 class="font-bold text-lg text-slate-700 dark:text-slate-300">প্যান (PAN - Personal Area Network)</h4>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          কোনো ব্যক্তির নিকটবর্তী বিভিন্ন ডিভাইসের (১০ মিটারের মধ্যে) সংযোগ। যেমন- ল্যাপটপের সাথে ব্লুটুথ মাউস, কীবোর্ড, মোবাইল বা প্রিন্টারের সংযোগ। এটি তারযুক্ত (USB) বা তারবিহীন (Bluetooth, IR) হতে পারে।
        </p>
      </div>

      <!-- LAN -->
      <div class="p-5 border-l-4 border-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 rounded-r-xl">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">🏢</span>
          <h4 class="font-bold text-lg text-cyan-700 dark:text-cyan-400">ল্যান (LAN - Local Area Network)</h4>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          সাধারণত ১ কি.মি. বা তার কম পরিসরের জায়গায় (একটি বিল্ডিং, অফিস বা স্কুলে) কম্পিউটারগুলো সংযুক্ত করা হয়। এতে অনেকগুলো কম্পিউটার একটি প্রিন্টার বা সার্ভার শেয়ার করতে পারে। তারবিহীন হলে তাকে WLAN (যেমন- Wi-Fi) বলে।
        </p>
      </div>

      <!-- CAN -->
      <div class="p-5 border-l-4 border-teal-400 bg-teal-50 dark:bg-teal-900/20 rounded-r-xl">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">🎓</span>
          <h4 class="font-bold text-lg text-teal-700 dark:text-teal-400">ক্যান (CAN - Campus Area Network)</h4>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          একটি শিক্ষা প্রতিষ্ঠান (বিশ্ববিদ্যালয়) বা কর্পোরেট ক্যাম্পাসের একাধিক ভবন বা ল্যানের (LAN) সংযোগ। এর বিস্তৃতি ১ থেকে ৫ কি.মি. পর্যন্ত হতে পারে (যেমন- প্রশাসনিক ভবন, লাইব্রেরি ও আবাসিক হলের নেটওয়ার্ক)।
        </p>
      </div>

      <!-- MAN -->
      <div class="p-5 border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-r-xl">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">🏙️</span>
          <h4 class="font-bold text-lg text-blue-700 dark:text-blue-400">ম্যান (MAN - Metropolitan Area Network)</h4>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          একটি শহর বা মেট্রোপলিটন এলাকার বিভিন্ন স্থানে অবস্থিত নেটওয়ার্ক (LAN বা CAN) এর সংযোগ। এর বিস্তৃতি সর্বোচ্চ ৫০ কি.মি. হতে পারে। যেমন- শহরের বিভিন্ন ব্যাংক শাখার সংযোগ। ব্যাকবোন হিসেবে ফাইবার অপটিক ব্যবহৃত হয়।
        </p>
      </div>

      <!-- WAN -->
      <div class="p-5 border-l-4 border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-r-xl">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">🌍</span>
          <h4 class="font-bold text-lg text-indigo-700 dark:text-indigo-400">ওয়ান (WAN - Wide Area Network)</h4>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          একটি দেশ, মহাদেশ বা বিশ্বব্যাপী বিস্তৃত নেটওয়ার্ক। বিশ্বের বিভিন্ন শহরের LAN বা MAN এর সংযোগ নিয়ে WAN গঠিত হয়। ইন্টারনেটের সবচেয়ে বড় উদাহরণ হলো WAN।
        </p>
      </div>

    </div>
  </div>

  <!-- Exam Tips -->
  <div class="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-amber-200 dark:border-amber-800/50 mt-12">
    <h3 class="text-xl font-bold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
      <span class="animate-pulse">💡</span> Exam Master Tips
    </h3>
    <ul class="space-y-3 text-slate-700 dark:text-slate-300 text-sm md:text-base">
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>রিসোর্স শেয়ারিং:</strong> একটি প্রিন্টার ৫টি কম্পিউটারে শেয়ার করা হলো "হার্ডওয়্যার রিসোর্স শেয়ার"।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>টপোলজি বা বিস্তৃতি চেনার উপায়:</strong>
        <ul class="ml-6 mt-1 list-disc text-slate-600 dark:text-slate-400">
          <li>রুমের ভেতর বা ব্লুটুথ = PAN</li>
          <li>একই বিল্ডিং, ল্যাব বা অফিস = LAN</li>
          <li>বিশ্ববিদ্যালয়ের বিভিন্ন বিল্ডিং = CAN</li>
          <li>একই শহরের বিভিন্ন শাখা = MAN</li>
          <li>দেশ বা পৃথিবী জুড়ে শাখা = WAN</li>
        </ul>
      </li>
    </ul>
  </div>

</div>
`;
