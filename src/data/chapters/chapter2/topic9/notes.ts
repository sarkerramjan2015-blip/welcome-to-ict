export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16c0 1.1.9 2 2 2h4v-2H6v-5l8 5 8-5v5h-4v2h4c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-4v2h4v5l-8 5-8-5V8h4V6H6c-1.1 0-2 .9-2 2v8zM12 2L4 7l8 5 8-5-8-5z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-indigo-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">নেটওয়ার্ক ডিভাইসসমূহ 🔌</h2>
      <p class="text-indigo-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        কম্পিউটার, প্রিন্টার এবং অন্যান্য ডিভাইসকে একটি নেটওয়ার্কের সাথে যুক্ত করে ডেটা আদান-প্রদান করতে যেসব হার্ডওয়্যার ব্যবহার করা হয়, তাদের নেটওয়ার্ক ডিভাইস বলে। যেমন: মডেম, হাব, সুইচ, রাউটার ইত্যাদি।
      </p>
    </div>
  </div>

  <!-- Network Devices Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    
    <!-- Modem -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-rose-200/50 dark:border-rose-700/50">
      <h3 class="text-2xl font-bold text-rose-700 dark:text-rose-400 mb-4 flex items-center gap-3">
        <span class="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-xl">📡</span> মডেম (Modem)
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Modem শব্দটি Modulator ও Demodulator এর সংক্ষিপ্ত রূপ। এটি প্রেরক ও প্রাপক উভয় হিসেবেই কাজ করে।
      </p>
      <ul class="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc ml-5">
        <li><strong>মডুলেশন (Modulation):</strong> প্রেরক কম্পিউটারের ডিজিটাল সিগন্যালকে অ্যানালগ সিগন্যালে রূপান্তর করে টেলিফোন লাইনে পাঠায়।</li>
        <li><strong>ডিমডুলেশন (Demodulation):</strong> টেলিফোন লাইন থেকে প্রাপ্ত অ্যানালগ সিগন্যালকে প্রাপক কম্পিউটারের জন্য ডিজিটাল সিগন্যালে রূপান্তর করে।</li>
      </ul>
    </div>

    <!-- NIC -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/50">
      <h3 class="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-3">
        <span class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">🎛️</span> নিক (NIC)
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
        NIC বা Network Interface Card। এটি কম্পিউটারকে নেটওয়ার্কের সাথে যুক্ত করে। একে ল্যান কার্ডও বলে।
      </p>
      <ul class="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc ml-5">
        <li>এতে একটি ৪৮ বিট বা ৬ বাইটের অদ্বিতীয় কোড থাকে যাকে MAC অ্যাড্রেস বলে।</li>
        <li>RJ45 সকেটের মাধ্যমে ক্যাবল যুক্ত করা হয়।</li>
      </ul>
    </div>

    <!-- Hub vs Switch -->
    <div class="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50">
      <h3 class="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6 flex items-center gap-3 border-b border-blue-100 dark:border-blue-900/50 pb-4">
        হাব বনাম সুইচ (LAN Devices)
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Hub -->
        <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/30">
          <h4 class="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">হাব (Hub)</h4>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">স্টার টপোলজির কেন্দ্রীয় ডিভাইস। প্রেরকের ডেটা সকল পোর্টে ব্রডকাস্ট করে।</p>
          <ul class="text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc ml-5">
            <li class="text-red-600 dark:text-red-400">ডেটা ফিল্টারিং সম্ভব নয়।</li>
            <li class="text-red-600 dark:text-red-400">ট্রাফিক বৃদ্ধি পায়, ডেটা কলিশনের (সংঘর্ষ) সম্ভাবনা থাকে।</li>
            <li class="text-green-600 dark:text-green-400">দাম তুলনামূলক কম।</li>
          </ul>
        </div>
        <!-- Switch -->
        <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
          <h4 class="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2">সুইচ (Switch)</h4>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">হাবের মতোই, তবে এটি MAC অ্যাড্রেস ব্যবহার করে শুধুমাত্র নির্দিষ্ট প্রাপকের কাছে ডেটা পাঠায়।</p>
          <ul class="text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc ml-5">
            <li class="text-green-600 dark:text-green-400">ডেটা ফিল্টারিং সম্ভব।</li>
            <li class="text-green-600 dark:text-green-400">ডেটার সংঘর্ষ হয় না এবং দ্রুত কাজ করে।</li>
            <li class="text-red-600 dark:text-red-400">দাম হাবের চেয়ে বেশি।</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Router, Gateway, Repeater, Bridge -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- Router -->
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-purple-200/50 dark:border-purple-700/50 flex flex-col md:flex-row gap-6 items-start">
        <div class="bg-purple-100 dark:bg-purple-900/50 p-4 rounded-2xl text-3xl">🚥</div>
        <div>
          <h4 class="font-bold text-xl text-purple-700 dark:text-purple-400 mb-2">রাউটার (Router)</h4>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">
            WAN ডিভাইস। একই প্রটোকল বিশিষ্ট একাধিক নেটওয়ার্ককে (যেমন একাধিক LAN) সংযুক্ত করে। রাউটিং টেবিল (Routing Table) ব্যবহার করে ডেটা পাঠানোর সবচেয়ে সহজ ও কম দূরত্বের পথটি খুঁজে নেয়। ডেটা ফিল্টারিং সম্ভব।
          </p>
        </div>
      </div>

      <!-- Gateway -->
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-amber-200/50 dark:border-amber-700/50 flex flex-col md:flex-row gap-6 items-start">
        <div class="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-2xl text-3xl">🚪</div>
        <div>
          <h4 class="font-bold text-xl text-amber-700 dark:text-amber-400 mb-2">গেটওয়ে (Gateway)</h4>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">
            WAN ডিভাইস। এটি ভিন্ন প্রটোকল বিশিষ্ট দুই বা ততোধিক নেটওয়ার্ককে যুক্ত করে। একে "প্রটোকল কনভার্টার" বা অনুবাদকও বলা হয়।
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Repeater -->
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-cyan-200/50 dark:border-cyan-700/50">
          <h4 class="font-bold text-lg text-cyan-700 dark:text-cyan-400 mb-2">রিপিটার (Repeater)</h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            নির্দিষ্ট দূরত্ব অতিক্রম করার পর দুর্বল হয়ে পড়া সিগন্যালকে শক্তিশালী (বিবর্ধিত) করে গন্তব্যে পাঠানোর কাজ করে।
          </p>
        </div>
        <!-- Bridge -->
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-teal-200/50 dark:border-teal-700/50">
          <h4 class="font-bold text-lg text-teal-700 dark:text-teal-400 mb-2">ব্রিজ (Bridge)</h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            একটি বড় নেটওয়ার্ককে ছোট ছোট অংশে (সেগমেন্টে) বিভক্ত করে বা ছোট নেটওয়ার্কগুলোকে যুক্ত করে। একই প্রটোকলে কাজ করে।
          </p>
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
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>মডেম:</strong> মডুলেশন (ডিজিটাল ➔ অ্যানালগ) + ডিমডুলেশন (অ্যানালগ ➔ ডিজিটাল)।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>হাব vs সুইচ:</strong> হাব ডেটা ব্রডকাস্ট করে (সবার কাছে পাঠায়)। সুইচ MAC অ্যাড্রেস চিনে নির্দিষ্ট নোডে পাঠায় (বুদ্ধিমান)।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>রাউটার vs গেটওয়ে:</strong> রাউটার একই প্রটোকলে কাজ করে, রাউটিং টেবিল দিয়ে পথ খোঁজে। গেটওয়ে ভিন্ন প্রটোকলের মাঝে অনুবাদ করে।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>রিপিটার:</strong> দুর্বল সিগন্যালকে সবল (Boost) করে।</li>
    </ul>
  </div>

</div>
`;
