export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-5.66-3.66c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41 1.87-1.87 4.36-2.93 7.07-2.93s5.2.1.06 7.07 2.93c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0-2.26-2.26-5.26-3.51-8.48-3.51s-6.22 1.25-8.48 3.51zm-5.66-5.66c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41C2.5 7.05 6.96 5 12 5s9.5 2.05 12.73 5.27c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0C20.45 8.81 16.39 7 12 7s-8.45 1.81-11.32 4.68z"/></svg>
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-blue-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">তারবিহীন মাধ্যম (Wireless Medium) 📡</h2>
      <p class="text-blue-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        তারবিহীন যোগাযোগ ব্যবস্থায় তড়িৎ চৌম্বকীয় তরঙ্গের সাহায্যে দূরবর্তী স্থানে তথ্যের আদান-প্রদান করা হয়। একে আনগাইডেড মিডিয়াও বলে। অ্যান্টেনা (Antenna) ডেটা আদান-প্রদানে বিশেষ ভূমিকা পালন করে।
      </p>
    </div>
  </div>

  <!-- Intro & Spectrum -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
      ইলেকট্রোম্যাগনেটিক স্পেকট্রাম ও অ্যান্টেনা
    </h3>
    <div class="text-slate-700 dark:text-slate-300 space-y-4">
      <p>
        তড়িৎ চৌম্বকীয় তরঙ্গের কম্পাঙ্ক বা তরঙ্গ দৈর্ঘ্যের সম্পূর্ণ রেঞ্জকে <strong>ইলেকট্রোম্যাগনেটিক স্পেকট্রাম</strong> বলা হয়। এই তরঙ্গের সাহায্যে ডেটা প্রেরণ করতে দুই ধরণের মডুলেশন হয়: অ্যানালগ ও ডিজিটাল।
      </p>
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <strong class="text-indigo-700 dark:text-indigo-400 block mb-2">অ্যান্টেনার প্রকারভেদ:</strong>
        <ul class="list-disc ml-5 space-y-2">
          <li><strong>দিকযুক্ত (Directional) অ্যান্টেনা:</strong> তরঙ্গকে টর্চলাইটের আলোর মত একদিকে প্রেরণ করে (Line of Sight)।</li>
          <li><strong>দিকবিহীন (Omni Directional) অ্যান্টেনা:</strong> তরঙ্গকে বাল্বের আলোর মত চারদিকে প্রেরণ করে।</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Radio Wave -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-200/50 dark:border-cyan-700/50 mt-8">
    <h3 class="text-2xl font-bold text-cyan-700 dark:text-cyan-400 mb-6 flex items-center gap-3 border-b border-cyan-100 dark:border-cyan-900/50 pb-4">
      <span class="p-2 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl">📻</span> রেডিও ওয়েভ (Radio Wave)
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="text-slate-700 dark:text-slate-300">
        <p class="mb-4">
          <strong>3KHz হতে 300GHz</strong> ফ্রিকোয়েন্সির ইলেকট্রোম্যাগনেটিক স্পেকট্রামকে রেডিও ওয়েভ বলা হয়। এটি দেওয়াল বা বিল্ডিং ভেদ করতে পারে এবং বায়ুমণ্ডল দ্বারা শোষিত হয় না।
        </p>
        <p class="text-sm">
          <strong>ব্যবহার:</strong> রেডিও/বেতার যন্ত্র, মোবাইল যোগাযোগের লিংক, টেলিভিশন ব্রডকাস্টিং, ইন্টারনেট সংযোগ, ওয়াইড এরিয়া নেটওয়ার্ক ইত্যাদি।
        </p>
      </div>
      <div class="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800/30">
        <h4 class="font-bold text-cyan-700 dark:text-cyan-400 mb-2">প্রকারভেদ</h4>
        <ul class="text-sm space-y-2 text-slate-600 dark:text-slate-400">
          <li><strong>১. লো-পাওয়ার সিঙ্গেল ফ্রিকোয়েন্সি:</strong> ৭০ মিটার রেঞ্জ (১-১০ Mbps)।</li>
          <li><strong>২. হাই-পাওয়ার সিঙ্গেল ফ্রিকোয়েন্সি:</strong> অধিক দূরত্ব, বাধা ভেদ করতে পারে।</li>
          <li><strong>৩. স্প্রেড স্পেকট্রাম:</strong> একাধিক ফ্রিকোয়েন্সি ব্যবহার করে।</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Microwave -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-violet-200/50 dark:border-violet-700/50 mt-8">
    <h3 class="text-2xl font-bold text-violet-700 dark:text-violet-400 mb-6 flex items-center gap-3 border-b border-violet-100 dark:border-violet-900/50 pb-4">
      <span class="p-2 bg-violet-100 dark:bg-violet-900/50 rounded-xl">🛰️</span> মাইক্রোওয়েভ (Microwave)
    </h3>
    <div class="text-slate-700 dark:text-slate-300 mb-6">
      <p class="mb-4">
        <strong>300MHz হতে 300GHz</strong> ফ্রিকোয়েন্সির ইলেকট্রোম্যাগনেটিক স্পেকট্রামকে মাইক্রোওয়েভ বলে। <strong>বৈশিষ্ট্য:</strong> এটি বাঁকা পথে চলতে পারে না (Line of Sight)। তাই প্রেরক ও প্রাপক অ্যান্টেনা মুখোমুখি থাকতে হয়। বাধা থাকলে ডেটা ট্রান্সমিট হয় না।
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Terrestrial -->
      <div class="bg-violet-50 dark:bg-violet-900/20 p-6 rounded-2xl border border-violet-100 dark:border-violet-800/30">
        <h4 class="text-lg font-bold text-violet-700 dark:text-violet-400 mb-2">১. টেরেস্ট্রিয়াল মাইক্রোওয়েভ</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ভূপৃষ্ঠেই ট্রান্সমিটার ও রিসিভার বসানো হয়। দৃষ্টি রেখায় (Line of Sight) যোগাযোগ করে। বাধা না থাকলে ১ থেকে ৫০ মাইল পর্যন্ত ডেটা চলতে পারে।
        </p>
      </div>

      <!-- Satellite -->
      <div class="bg-violet-50 dark:bg-violet-900/20 p-6 rounded-2xl border border-violet-100 dark:border-violet-800/30">
        <h4 class="text-lg font-bold text-violet-700 dark:text-violet-400 mb-2">২. স্যাটেলাইট মাইক্রোওয়েভ</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ভূ-পৃষ্ঠে থাকে অ্যান্টেনা (VSAT) এবং মহাশূন্যে থাকে স্যাটেলাইট (৩৬,০০০ কিমি উঁচুতে)। ট্রান্সপন্ডার দ্বারা ক্ষীণ সিগন্যালকে অ্যামপ্লিফাই করে আবার পৃথিবীতে পাঠানো হয়। আন্তঃমহাদেশীয় যোগাযোগ, টিভি সিগন্যাল, আবহাওয়ার জন্য ব্যবহৃত হয়।
        </p>
      </div>
    </div>
  </div>

  <!-- Infrared -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-rose-200/50 dark:border-rose-700/50 mt-8">
    <h3 class="text-2xl font-bold text-rose-700 dark:text-rose-400 mb-6 flex items-center gap-3 border-b border-rose-100 dark:border-rose-900/50 pb-4">
      <span class="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-xl">🕹️</span> ইনফ্রারেড (Infrared)
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div class="text-slate-700 dark:text-slate-300">
        <p class="mb-4">
          <strong>300GHz হতে 400THz</strong> রেঞ্জ। এটি খুব নিকটবর্তী (প্রায় ১০ মিটার) দুটি ডিভাইসের মধ্যে যোগাযোগে ব্যবহৃত হয়।
        </p>
        <p class="text-sm">
          <strong>ব্যবহার:</strong> টিভি/এসির রিমোট কন্ট্রোল, তারবিহীন কীবোর্ড/মাউস/প্রিন্টার।
        </p>
      </div>
      <div class="flex flex-col gap-3 text-sm">
        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800/30">
          <strong class="text-green-700 dark:text-green-400">✅ সুবিধা:</strong> দামে সস্তা, বিদ্যুৎ খরচ কম।
        </div>
        <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800/30">
          <strong class="text-red-700 dark:text-red-400">❌ অসুবিধা:</strong> বেশি দূরে বা কোনো প্রতিবন্ধক (দেয়াল) থাকলে কাজ করে না।
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
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>রেডিও ওয়েভ:</strong> দেয়াল ভেদ করতে পারে (TV, Radio, Mobile)। দিকহীন ট্রান্সমিশন।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>মাইক্রোওয়েভ:</strong> দেয়াল ভেদ করতে পারে না, সরল রেখায় চলে। টাওয়ার বসাতে হয় (টেরেস্ট্রিয়াল)। মহাসাগর বা মহাদেশ পাড়ি দিতে স্যাটেলাইট ব্যবহৃত হয় (Geo-Satellite: 36,000 km)।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>ইনফ্রারেড:</strong> রিমোট কন্ট্রোল। রেঞ্জ ১০ মিটার। বাধা পেলে কাজ করে না।</li>
    </ul>
  </div>

</div>
`;
