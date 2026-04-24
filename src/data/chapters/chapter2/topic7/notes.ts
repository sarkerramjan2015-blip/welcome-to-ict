export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-rose-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-indigo-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">মোবাইল যোগাযোগ ও প্রজন্ম 📱</h2>
      <p class="text-indigo-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        চলমান অবস্থায় তারবিহীন যে ফোন ব্যবহার করা হয় তাকে মোবাইল ফোন বলে। এটি সেলুলার নেটওয়ার্ক প্রযুক্তি ব্যবহার করে। আধুনিক মোবাইল ফোনের জনক হলেন মার্টিন কুপার।
      </p>
    </div>
  </div>

  <!-- GSM vs CDMA -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-rose-200/50 dark:border-rose-700/50">
    <h3 class="text-2xl font-bold text-rose-700 dark:text-rose-400 mb-6 flex items-center gap-3 border-b border-rose-100 dark:border-rose-900/50 pb-4">
      মোবাইল ফোন প্রযুক্তির প্রকারভেদ
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- GSM -->
      <div class="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-2xl border border-rose-100 dark:border-rose-800/30">
        <h4 class="text-xl font-bold text-rose-700 dark:text-rose-400 mb-3">জিএসএম (GSM)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Global System for Mobile Communication. এটি TDMA ও FDMA এর সম্মিলিত চ্যানেল অ্যাকসে পদ্ধতি।
        </p>
        <ul class="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc ml-5">
          <li>সেল কভারেজ এরিয়া ৩৫ কি.মি.।</li>
          <li>বিদ্যুৎ খরচ তুলনামূলক বেশি (২ ওয়াট)।</li>
          <li>ডেটা রেট তুলনামূলক কম (৫৬kbps)।</li>
          <li>আন্তর্জাতিক রোমিং সুবিধা আছে।</li>
          <li>যেকোনো হ্যান্ডসেটে SIM ব্যবহার করা যায়।</li>
        </ul>
      </div>

      <!-- CDMA -->
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">সিডিএমএ (CDMA)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Code Division Multiple Access. ডেটা ইউনিক কোডিং (স্প্রেড স্পেকট্রাম) পদ্ধতিতে পাঠানো হয়। একে 'গ্রিনফোন' প্রযুক্তিও বলে।
        </p>
        <ul class="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc ml-5">
          <li>সেল কভারেজ এরিয়া ১১০ কি.মি.।</li>
          <li>বিদ্যুৎ খরচ তুলনামূলক কম।</li>
          <li>ডেটা রেট তুলনামূলক বেশি (154kbps-614 kbps)।</li>
          <li>আন্তর্জাতিক রোমিং সুবিধা নেই।</li>
          <li>RUIM কার্ড যেকোনো হ্যান্ডসেটে ব্যবহার করা যায়।</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Mobile Generations -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-fuchsia-200/50 dark:border-fuchsia-700/50 mt-8">
    <h3 class="text-2xl font-bold text-fuchsia-700 dark:text-fuchsia-400 mb-6 flex items-center gap-3 border-b border-fuchsia-100 dark:border-fuchsia-900/50 pb-4">
      <span class="p-2 bg-fuchsia-100 dark:bg-fuchsia-900/50 rounded-xl">🚀</span> মোবাইল ফোনের বিভিন্ন প্রজন্ম
    </h3>
    
    <div class="space-y-6">
      <!-- 1G -->
      <div class="p-5 border-l-4 border-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-r-xl">
        <h4 class="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">প্রথম প্রজন্ম (1G) [১৯৫০-১৯৮৯]</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          এনালগ পদ্ধতির রেডিও সিগন্যাল ব্যবহৃত হয়। কথোপকথন চলা অবস্থায় ব্যবহারকারী স্থান পরিবর্তন করলে কল কেটে যায়। সেল সিগন্যাল এনকোডিং FDMA এবং রোমিং সুবিধা ছিল না।
        </p>
      </div>

      <!-- 2G -->
      <div class="p-5 border-l-4 border-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 rounded-r-xl">
        <h4 class="font-bold text-lg text-cyan-700 dark:text-cyan-400 mb-2">দ্বিতীয় প্রজন্ম (2G) [১৯৯০-২০০০]</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ডিজিটাল রেডিও সিগনাল ব্যবহৃত হয়। সর্বপ্রথম SMS, MMS এবং প্রিপেইড পদ্ধতি চালু হয়। কল চলা অবস্থায় স্থান পরিবর্তন করলেও কল কাটে না। সীমিত আন্তর্জাতিক রোমিং চালু হয়।
        </p>
      </div>

      <!-- 3G -->
      <div class="p-5 border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-r-xl">
        <h4 class="font-bold text-lg text-blue-700 dark:text-blue-400 mb-2">তৃতীয় প্রজন্ম (3G) [২০০১-২০০৮]</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          উচ্চ গতির ডেটা ট্রান্সফার (2 Mbps+), মডেম সংযোজন, ইন্টারনেট ব্রাউজিং, ভিডিও কল, মোবাইল ব্যাংকিং এবং ই-কমার্স চালু হয়। সার্কিট সুইচিং ও প্যাকেট সুইচিং উভয়ই ব্যবহৃত হয়।
        </p>
      </div>

      <!-- 4G -->
      <div class="p-5 border-l-4 border-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-r-xl">
        <h4 class="font-bold text-lg text-purple-700 dark:text-purple-400 mb-2">চতুর্থ প্রজন্ম (4G) [২০০৯-বর্তমান]</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          আইপি (IP) নির্ভর ওয়্যারলেস নেটওয়ার্ক সিস্টেম (প্যাকেট সুইচিং)। 3G এর চেয়ে প্রায় ৫০ গুণ বেশি গতির ব্রডব্যান্ড, উচ্চমানের টেলিভিশন এবং ভিডিও লিংক প্রদান করে।
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
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>1G:</strong> এনালগ সিগন্যাল, কল ড্রপ হতো।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>2G:</strong> ডিজিটাল সিগন্যাল, SMS/MMS শুরু, প্রিপেইড শুরু।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>3G:</strong> ইন্টারনেট ব্রাউজিং, ভিডিও কল, মোবাইল ব্যাংকিং।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>4G:</strong> IP ভিত্তিক নেটওয়ার্ক, আল্ট্রা ব্রডব্যান্ড গতি, সার্কিট সুইচিং নেই, কেবল প্যাকেট সুইচিং।</li>
    </ul>
  </div>

</div>
`;
