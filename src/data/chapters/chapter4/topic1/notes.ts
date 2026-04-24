export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-blue-100 font-semibold text-sm mb-4 border border-white/30">
        অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি ও HTML
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">ওয়েব ডিজাইন এর ধারণা 🌐</h2>
      <p class="text-blue-100 leading-relaxed text-lg font-medium max-w-3xl">
        ওয়েব পেইজ, ওয়েবসাইট, ওয়েব ব্রাউজার, সার্চ ইঞ্জিন এবং স্ট্যাটিক ও ডাইনামিক ওয়েবসাইটের মৌলিক ধারণা।
      </p>
    </div>
  </div>

  <!-- Basic Definitions -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50">
      <h3 class="text-lg font-bold text-blue-800 dark:text-blue-400 mb-3 flex items-center gap-2">🌍 ওয়েব পেইজ কী?</h3>
      <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">ওয়েব পেইজ হলো এক ধরনের ওয়েব ডকুমেন্ট যা সাধারণত HTML-এ লেখা হয় এবং বিভিন্ন দেশের সার্ভারে রাখা হয়। যেকোনো ইন্টারনেট ব্যবহারকারী ব্রাউজারের সাহায্যে URL এর মাধ্যমে যেকোনো জায়গা থেকে এটি দেখতে পারে। একটি ওয়েবপেইজে টেক্সট, ইমেজ, ফাইল, অডিও, ভিডিও এবং এনিমেশন থাকতে পারে।</p>
    </div>
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
      <h3 class="text-lg font-bold text-indigo-800 dark:text-indigo-400 mb-3 flex items-center gap-2">🏠 হোম পেইজ কী?</h3>
      <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">কোনো ওয়েবসাইটে প্রবেশ করলে প্রথম যে ওয়েব পেইজটি প্রদর্শিত হয় তাকে হোম পেইজ বলে।</p>
      <div class="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
        <h3 class="text-lg font-bold text-indigo-800 dark:text-indigo-400 mb-2 flex items-center gap-2">🔗 ওয়েব পোর্টাল কী?</h3>
        <p class="text-slate-700 dark:text-slate-300 text-sm">ওয়েব পোর্টাল হচ্ছে বিশেষভাবে পরিকল্পিত ওয়েবসাইট যা বিভিন্ন গুরুত্বপূর্ণ তথ্যের লিংকের সমাহার। যেমন: <strong>www.bangladesh.gov.bd</strong></p>
      </div>
    </div>
  </div>

  <!-- Website -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4 border-b border-blue-100 dark:border-blue-900/50 pb-3">🖥️ ওয়েবসাইট কী?</h3>
    <p class="text-slate-700 dark:text-slate-300 mb-5">একই ডোমেইনের অধীনে সার্ভারে রাখা এক বা একাধিক ওয়েবপেইজের সমষ্টিকে ওয়েবসাইট বলে।</p>
    <p class="text-slate-700 dark:text-slate-300 mb-4 font-semibold">গঠন বৈচিত্র্যের ওপর ভিত্তি করে ওয়েবসাইট দুই ভাগে বিভক্ত:</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="bg-green-50 dark:bg-green-900/20 p-5 rounded-2xl border border-green-200 dark:border-green-800">
        <h4 class="font-bold text-green-700 dark:text-green-300 mb-2">স্ট্যাটিক ওয়েবসাইট</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm">যে সকল ওয়েবসাইটের তথ্য সাধারণত পরিবর্তন হয় না তাদেরকে স্ট্যাটিক ওয়েবসাইট বলে। শুধুমাত্র HTML ও CSS দিয়ে তৈরি।</p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200 dark:border-blue-800">
        <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-2">ডাইনামিক ওয়েবসাইট</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm">যে সকল ওয়েবসাইটের তথ্য পরিবর্তনশীল তাদেরকে ডাইনামিক ওয়েবসাইট বলে। PHP, MySQL, JavaScript ইত্যাদি ব্যবহৃত হয়।</p>
      </div>
    </div>
  </div>

  <!-- Comparison Table -->
  <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 md:p-8 rounded-3xl border border-blue-200 dark:border-blue-800/50">
    <h3 class="text-xl font-bold text-blue-800 dark:text-blue-400 mb-5 flex items-center gap-2">⭐ স্ট্যাটিক ও ডাইনামিক ওয়েবসাইটের তুলনা</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-200">
          <tr>
            <th class="px-4 py-3 text-left rounded-tl-xl">স্ট্যাটিক ওয়েবসাইট</th>
            <th class="px-4 py-3 text-left rounded-tr-xl">ডাইনামিক ওয়েবসাইট</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2">আপডেট তথ্য প্রদর্শন করে না।</td><td class="px-4 py-2">আপডেট তথ্য প্রদর্শন করে।</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-blue-50/30 dark:bg-blue-900/10"><td class="px-4 py-2">রান টাইমে কন্টেন্ট পরিবর্তন যায় না।</td><td class="px-4 py-2">রান টাইমে কন্টেন্ট পরিবর্তন করা যায়।</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2">ব্যবহারকারী থেকে ইনপুট নেওয়া যায় না।</td><td class="px-4 py-2">ব্যবহারকারী থেকে ইনপুট নেওয়া যায়।</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-blue-50/30 dark:bg-blue-900/10"><td class="px-4 py-2">তুলনামূলক বেশি নিরাপদ।</td><td class="px-4 py-2">তুলনামূলক কম নিরাপদ।</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2">শুধুমাত্র HTML ও CSS ব্যবহার করে তৈরি।</td><td class="px-4 py-2">HTML, CSS সহ JavaScript, PHP, .Net ইত্যাদি ব্যবহার।</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-blue-50/30 dark:bg-blue-900/10"><td class="px-4 py-2">ডেটাবেজ সংযোগ থাকে না।</td><td class="px-4 py-2">ডেটাবেজ ব্যবহৃত হয়।</td></tr>
          <tr><td class="px-4 py-2">খরচ কম। উন্নয়ন সহজ।</td><td class="px-4 py-2">খরচ বেশি। উন্নয়ন তুলনামূলক জটিল।</td></tr>
        </tbody>
      </table>
    </div>
    <p class="mt-4 text-sm text-blue-700 dark:text-blue-300 font-semibold bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">✅ স্ট্যাটিক ও ডাইনামিক ওয়েবসাইটের মধ্যে ডাইনামিক বেশি সুবিধাজনক।</p>
  </div>

  <!-- Browser vs Search Engine -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 border-b border-indigo-100 dark:border-indigo-900/50 pb-3">🔍 ওয়েব ব্রাউজার বনাম সার্চ ইঞ্জিন</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200">
          <tr>
            <th class="px-4 py-3 text-left rounded-tl-xl">বিষয়</th>
            <th class="px-4 py-3 text-center">ওয়েব ব্রাউজার</th>
            <th class="px-4 py-3 text-center rounded-tr-xl">সার্চ ইঞ্জিন</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-bold">সংজ্ঞা</td><td class="px-4 py-2 text-center">ওয়েবসাইট পরিদর্শনের সফটওয়্যার</td><td class="px-4 py-2 text-center">তথ্য খোঁজার প্ল্যাটফর্ম</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-indigo-50/30 dark:bg-indigo-900/10"><td class="px-4 py-2 font-bold">কাজ</td><td class="px-4 py-2 text-center">URL দিয়ে সরাসরি ওয়েবপেজ দেখায়</td><td class="px-4 py-2 text-center">কীওয়ার্ডে তথ্য খুঁজে দেয়</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-bold">উদাহরণ</td><td class="px-4 py-2 text-center">Google Chrome, Firefox, Safari</td><td class="px-4 py-2 text-center">Google, Bing, Yahoo</td></tr>
          <tr><td class="px-4 py-2 font-bold">উদ্দেশ্য</td><td class="px-4 py-2 text-center">তথ্য দর্শন ও নেভিগেশন</td><td class="px-4 py-2 text-center">তথ্য অনুসন্ধান ও প্রাপ্তি</td></tr>
        </tbody>
      </table>
    </div>
  </div>

</div>
`;
