export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg> 
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM12 5.83l2.88 2.88L12 11.59V5.83zm0 12.34v-5.76l2.88 2.88L12 18.17z"/></svg>
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-indigo-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">ওয়্যারলেস কমিউনিকেশন ও হটস্পট 🛜</h2>
      <p class="text-indigo-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        কোনো ফিজিক্যাল ক্যাবল ছাড়াই রেডিও ফ্রিকোয়েন্সি ব্যবহার করে ডেটা ট্রান্সফার করার পদ্ধতি। এর মাধ্যমে মোবিলিটি বা গতিশীলতা পাওয়া যায়, তবে ডেটার নিরাপত্তা ঝুঁকি থেকে যায়।
      </p>
    </div>
  </div>

  <!-- Hotspot & Access Points -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
      হটস্পট (Hotspot) কী?
    </h3>
    <div class="text-slate-700 dark:text-slate-300">
      <p class="mb-4">
        হটস্পট হলো এমন একটি নির্দিষ্ট জায়গা যেখানে ওয়্যারলেস নেটওয়ার্কের মাধ্যমে ইন্টারনেট সেবা দেওয়া হয়। ওয়্যারলেস কমিউনিকেশনের জন্য <strong>তিনটি প্রধান প্রযুক্তি</strong> ব্যবহৃত হয়: ব্লুটুথ, ওয়াই-ফাই এবং ওয়াইম্যাক্স।
      </p>
    </div>
  </div>

  <!-- Bluetooth -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50 mt-8">
    <h3 class="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6 flex items-center gap-3 border-b border-blue-100 dark:border-blue-900/50 pb-4">
      <span class="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">🦷</span> ব্লুটুথ (Bluetooth)
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="text-slate-700 dark:text-slate-300">
        <ul class="space-y-3">
          <li><strong>স্ট্যান্ডার্ড:</strong> IEEE 802.15.1</li>
          <li><strong>নেটওয়ার্কের ধরন:</strong> WPAN (Wireless Personal Area Network)</li>
          <li><strong>কভারেজ এরিয়া:</strong> ১০ থেকে ১০০ মিটার (স্বল্প দূরত্ব)।</li>
          <li><strong>ফ্রিকোয়েন্সি:</strong> ২.৪ GHz রেডিও ওয়েভ।</li>
          <li><strong>ডেটা ট্রান্সমিশন মোড:</strong> হাফ-ডুপ্লেক্স।</li>
        </ul>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30">
        <h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">পিকোনেট (Piconet)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ব্লুটুথের মাধ্যমে তৈরি নেটওয়ার্ককে <strong>পিকোনেট</strong> বলে। এটি সর্বোচ্চ ৮টি যন্ত্রের সাথে সংযুক্ত হতে পারে, যার মধ্যে ১টি 'মাস্টার' এবং বাকিগুলো 'স্লেভ' ডিভাইস হিসেবে কাজ করে। একাধিক পিকোনেট মিলে স্ক্যাটারনেট গঠিত হয়।
        </p>
      </div>
    </div>
  </div>

  <!-- Wi-Fi -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-sky-200/50 dark:border-sky-700/50 mt-8">
    <h3 class="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-6 flex items-center gap-3 border-b border-sky-100 dark:border-sky-900/50 pb-4">
      <span class="p-2 bg-sky-100 dark:bg-sky-900/50 rounded-xl">📶</span> ওয়াই-ফাই (Wi-Fi)
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="text-slate-700 dark:text-slate-300">
        <p class="mb-4"><strong>Wi-Fi</strong> (Wireless Fidelity) হলো এমন একটি প্রযুক্তি যা একটি কক্ষ বা বিল্ডিংয়ে ইন্টারনেট অ্যাক্সেস প্রদান করে।</p>
        <ul class="space-y-3 text-sm">
          <li><strong>স্ট্যান্ডার্ড:</strong> IEEE 802.11</li>
          <li><strong>নেটওয়ার্কের ধরন:</strong> WLAN (Wireless Local Area Network)</li>
          <li><strong>কভারেজ এরিয়া:</strong> ইনডোরে ৩২ মি. এবং আউটডোরে ৯৫ মিটার।</li>
          <li><strong>ডেটা ট্রান্সমিশন মোড:</strong> হাফ-ডুপ্লেক্স।</li>
        </ul>
      </div>
      <div class="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-100 dark:border-sky-800/30 text-sm text-slate-600 dark:text-slate-400">
        <strong class="text-sky-700 dark:text-sky-400">সুবিধা ও অসুবিধা:</strong><br/>
        সহজেই নতুন ব্যবহারকারী যুক্ত করা যায় এবং সস্তা। তবে সীমানা নির্দিষ্ট, অন্যান্য ডিভাইসের কারণে সিগন্যাল জ্যাম হতে পারে এবং ডেটা নিরাপত্তার ঝুঁকি থাকে (এজন্য পাসওয়ার্ড বা WPA2 এনক্রিপশন প্রয়োজন)।
      </div>
    </div>
  </div>

  <!-- WiMAX -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-teal-200/50 dark:border-teal-700/50 mt-8">
    <h3 class="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-6 flex items-center gap-3 border-b border-teal-100 dark:border-teal-900/50 pb-4">
      <span class="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-xl">🗼</span> ওয়াইম্যাক্স (WiMAX)
    </h3>
    <div class="text-slate-700 dark:text-slate-300 mb-6">
      <p class="mb-4">
        <strong>WiMAX</strong> (Worldwide Interoperability for Microwave Access) হলো উচ্চ গতির ব্রডব্যান্ড প্রযুক্তি যা বিস্তৃত এলাকাজুড়ে ইন্টারনেট প্রদান করে। এতে মাইক্রোওয়েভ ব্যবহৃত হয়।
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800/30">
        <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <li><strong>স্ট্যান্ডার্ড:</strong> IEEE 802.16</li>
          <li><strong>নেটওয়ার্কের ধরন:</strong> WMAN (Wireless Metropolitan Area Network)</li>
          <li><strong>কভারেজ এরিয়া:</strong> ১০ কিমি থেকে ৬০ কিলোমিটার পর্যন্ত।</li>
          <li><strong>গতি ও মোড:</strong> 70Mbps, ফুল-ডুপ্লেক্স মোড।</li>
        </ul>
      </div>
      <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800/30">
        <h4 class="text-lg font-bold text-teal-700 dark:text-teal-400 mb-2">উপাদান</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          এর দুটি অংশ থাকে: ১. বেস স্টেশন (টাওয়ার) ২. রিসিভার (অ্যান্টেনাসহ)। একটি বেস স্টেশন থেকে হাজার হাজার মানুষ ইন্টারনেট সেবা পেতে পারে। তবে এটি বেশ ব্যয়বহুল।
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
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>IEEE 802.15 (Bluetooth):</strong> রিমোট, মাউস, হেডফোন, মোবাইল থেকে মোবাইলে ডেটা বা ছবি ট্রান্সফার। এটি WPAN (Personal)।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>IEEE 802.11 (Wi-Fi):</strong> রাউটারের মাধ্যমে বাসায়, অফিসে, স্কুলে ইন্টারনেট শেয়ারিং। এটি WLAN (Local)।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>IEEE 802.16 (WiMAX):</strong> পুরো একটি শহর বা বিস্তৃত এলাকায় টাওয়ারের মাধ্যমে ব্রডব্যান্ড ইন্টারনেট। এটি WMAN (Metropolitan)।</li>
    </ul>
  </div>

</div>
`;
