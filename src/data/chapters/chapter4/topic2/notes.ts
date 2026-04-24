export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-indigo-100 font-semibold text-sm mb-4 border border-white/30">
        অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি ও HTML
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">ওয়েবসাইটের কাঠামো ও IP/URL 🗺️</h2>
      <p class="text-indigo-100 leading-relaxed text-lg font-medium max-w-3xl">
        IP ঠিকানা, URL, ডোমেইন নেইম এবং ওয়েবসাইটের কাঠামো — লিনিয়ার, ট্রি, নেটওয়ার্ক ও হাইব্রিড।
      </p>
    </div>
  </div>

  <!-- IP Address -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 border-b border-indigo-100 dark:border-indigo-900/50 pb-3">🌐 আইপি অ্যাড্রেস (IP Address)</h3>
    <p class="text-slate-700 dark:text-slate-300 mb-4">IP Address এর পূর্ণরূপ <strong>Internet Protocol Address</strong>। ইন্টারনেটে যুক্ত প্রতিটি কম্পিউটার বা যন্ত্রের একটি অদ্বিতীয় অ্যাড্রেস থাকে এই অদ্বিতীয় অ্যাড্রেসকে বলা হয় IP Address।</p>
    <p class="text-slate-700 dark:text-slate-300 mb-5 font-semibold">আইপি অ্যাড্রেস দুই প্রকার — <span class="text-indigo-600 dark:text-indigo-400">IPV4</span> এবং <span class="text-indigo-600 dark:text-indigo-400">IPV6</span></p>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200">
          <tr>
            <th class="px-4 py-3 text-left rounded-tl-xl">বিষয়</th>
            <th class="px-4 py-3 text-center">IPV4</th>
            <th class="px-4 py-3 text-center rounded-tr-xl">IPV6</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-bold">আবিষ্কার</td><td class="px-4 py-2 text-center">১৯৮১ সালে</td><td class="px-4 py-2 text-center">১৯৯৯ সালে</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-indigo-50/30 dark:bg-indigo-900/10"><td class="px-4 py-2 font-bold">বিট সংখ্যা</td><td class="px-4 py-2 text-center">৩২ বিট</td><td class="px-4 py-2 text-center">১২৮ বিট</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-bold">মোট অ্যাড্রেস</td><td class="px-4 py-2 text-center">2³² সংখ্যক</td><td class="px-4 py-2 text-center">2¹²⁸ সংখ্যক</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-indigo-50/30 dark:bg-indigo-900/10"><td class="px-4 py-2 font-bold">উদাহরণ</td><td class="px-4 py-2 text-center font-mono text-xs">192.168.1.1</td><td class="px-4 py-2 text-center font-mono text-xs">2001:0db8::8a2e:0370:7334</td></tr>
          <tr><td class="px-4 py-2 font-bold">নিরাপত্তা</td><td class="px-4 py-2 text-center">আলাদা প্রযুক্তি লাগে</td><td class="px-4 py-2 text-center">ইন-বিল্ট সুরক্ষা (IPsec)</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- URL -->
  <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 md:p-8 rounded-3xl border border-blue-200 dark:border-blue-800/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5 flex items-center gap-3">🔗 URL (Uniform Resource Locator)</h3>
    <p class="text-slate-700 dark:text-slate-300 mb-4">প্রতিটি ওয়েবসাইটের একটি বিশেষ ও অনন্য ঠিকানা থাকে। URL এর পূর্ণরূপ <strong>Uniform/Universal Resource Locator</strong>।</p>
    <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl font-mono text-sm mb-5 border border-blue-200 dark:border-blue-800">
      <span class="text-green-600 dark:text-green-400">https://</span><span class="text-blue-600 dark:text-blue-400">www.</span><span class="text-purple-600 dark:text-purple-400">example</span><span class="text-orange-600 dark:text-orange-400">.org</span><span class="text-slate-600 dark:text-slate-400">/blog/post1.html</span>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl text-center"><p class="font-bold text-green-700 dark:text-green-300 text-xs">Protocol</p><p class="text-slate-600 dark:text-slate-400 text-xs">https://</p></div>
      <div class="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-center"><p class="font-bold text-blue-700 dark:text-blue-300 text-xs">Sub-domain</p><p class="text-slate-600 dark:text-slate-400 text-xs">www</p></div>
      <div class="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl text-center"><p class="font-bold text-purple-700 dark:text-purple-300 text-xs">Domain</p><p class="text-slate-600 dark:text-slate-400 text-xs">example</p></div>
      <div class="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl text-center"><p class="font-bold text-orange-700 dark:text-orange-300 text-xs">TLD</p><p class="text-slate-600 dark:text-slate-400 text-xs">.org</p></div>
    </div>
  </div>

  <!-- Domain Name -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">🏷️ ডোমেইন নেইম ও TLD</h3>
    <p class="text-slate-700 dark:text-slate-300 mb-4">ডোমেইন নাম একটি সহজ টেক্সট অ্যাড্রেস যা ওয়েবসাইটের আইপি অ্যাড্রেসের বদলে ব্যবহৃত হয়।</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-3">জেনেরিক ডোমেইন</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-slate-700 dark:text-slate-300">
            <thead class="bg-blue-100 dark:bg-blue-900/50"><tr><th class="px-3 py-2 text-left">TLD</th><th class="px-3 py-2 text-left">প্রতিষ্ঠানের ধরন</th></tr></thead>
            <tbody>
              <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-3 py-1.5 font-mono">.com</td><td class="px-3 py-1.5">বাণিজ্যিক প্রতিষ্ঠান</td></tr>
              <tr class="border-b border-slate-100 dark:border-slate-700 bg-blue-50/30"><td class="px-3 py-1.5 font-mono">.gov</td><td class="px-3 py-1.5">রাষ্ট্রীয় প্রতিষ্ঠান</td></tr>
              <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-3 py-1.5 font-mono">.edu</td><td class="px-3 py-1.5">শিক্ষা প্রতিষ্ঠান</td></tr>
              <tr class="border-b border-slate-100 dark:border-slate-700 bg-blue-50/30"><td class="px-3 py-1.5 font-mono">.org</td><td class="px-3 py-1.5">অলাভজনক প্রতিষ্ঠান</td></tr>
              <tr><td class="px-3 py-1.5 font-mono">.mil</td><td class="px-3 py-1.5">সেনাবাহিনী</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-3">কান্ট্রি ডোমেইন</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-slate-700 dark:text-slate-300">
            <thead class="bg-blue-100 dark:bg-blue-900/50"><tr><th class="px-3 py-2 text-left">TLD</th><th class="px-3 py-2 text-left">দেশ</th></tr></thead>
            <tbody>
              <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-3 py-1.5 font-mono">.uk</td><td class="px-3 py-1.5">United Kingdom</td></tr>
              <tr class="border-b border-slate-100 dark:border-slate-700 bg-blue-50/30"><td class="px-3 py-1.5 font-mono">.us</td><td class="px-3 py-1.5">United States</td></tr>
              <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-3 py-1.5 font-mono">.au</td><td class="px-3 py-1.5">Australia</td></tr>
              <tr class="border-b border-slate-100 dark:border-slate-700 bg-blue-50/30"><td class="px-3 py-1.5 font-mono">.bd</td><td class="px-3 py-1.5">Bangladesh</td></tr>
              <tr><td class="px-3 py-1.5 font-mono">.cn</td><td class="px-3 py-1.5">China</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-xs text-slate-700 dark:text-slate-300">
          <strong>DNS সার্ভার:</strong> সারা বিশ্বের ডোমেইন নেইম নিয়ন্ত্রণকারী প্রতিষ্ঠান। ICANN সকল IP ও Domain নিয়ন্ত্রণ করে।
        </div>
      </div>
    </div>
  </div>

  <!-- Website Structure -->
  <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 md:p-8 rounded-3xl border border-indigo-200 dark:border-indigo-800/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 flex items-center gap-3">🏗️ ওয়েবসাইটের কাঠামো</h3>
    <p class="text-slate-700 dark:text-slate-300 mb-5">ওয়েবসাইটের কাঠামো চার ধরনের:</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
        <h4 class="font-bold text-lg text-indigo-700 dark:text-indigo-300 mb-2">১. লিনিয়ার/সিকুয়েন্সিয়াল</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-2">পেজগুলো একটি নির্দিষ্ট অনুক্রমে সাজানো থাকে। Next, Previous, First, Last লিংক থাকে।</p>
        <p class="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">উদা: youtube.com, প্রশিক্ষণ সাইট</p>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
        <h4 class="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">২. ট্রি/হায়ারার্কিক্যাল</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-2">হোম পেইজে সব লিস্ট থাকে। শাখা-প্রশাখায় সাজানো। মেনু ও সাব-মেনু আছে।</p>
        <p class="text-xs text-purple-600 dark:text-purple-400 font-semibold">উদা: facebook.com, কর্পোরেট সাইট</p>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
        <h4 class="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">৩. নেটওয়ার্ক/ওয়েব লিঙ্কড</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-2">প্রতিটি পেইজ অন্য সব পেইজের সাথে লিংক থাকে। যেকোনো পেজ থেকে যেকোনো পেজে যাওয়া যায়।</p>
        <p class="text-xs text-blue-600 dark:text-blue-400 font-semibold">উদা: wikipedia.com</p>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
        <h4 class="font-bold text-lg text-green-700 dark:text-green-300 mb-2">৪. হাইব্রিড/কম্বিনেশনাল</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-2">একাধিক কাঠামোর সমন্বয়। লিনিয়ার ও ট্রি কাঠামোর মিশ্রণ। বড় ওয়েবসাইটের জন্য।</p>
        <p class="text-xs text-green-600 dark:text-green-400 font-semibold">উদা: google.com</p>
      </div>
    </div>
  </div>

</div>
`;
