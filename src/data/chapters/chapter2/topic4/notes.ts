export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-teal-900 via-emerald-800 to-green-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-emerald-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">তার মাধ্যম (Wired Medium) 🔌</h2>
      <p class="text-emerald-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        ডেটা আদান-প্রদানের জন্য প্রেরক ও প্রাপকের মধ্যে সংযোগ স্থাপনের প্রয়োজন হয়। এই মাধ্যমকে চ্যানেল বলে। তার (Wired/Guided) মাধ্যম হলো এমন মাধ্যম যেখানে ফিজিক্যাল ক্যাবলের মাধ্যমে ডেটা পরিবাহিত হয়। এর প্রধান তিনটি প্রকার হলো: টুইস্টেড পেয়ার, কো-এক্সিয়াল এবং ফাইবার অপটিক ক্যাবল।
      </p>
    </div>
  </div>

  <!-- Twisted Pair Cable -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/50">
    <h3 class="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-3 border-b border-emerald-100 dark:border-emerald-900/50 pb-4">
      <span class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">🧶</span> টুইস্টেড পেয়ার ক্যাবল (Twisted Pair Cable)
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="text-slate-700 dark:text-slate-300">
        <p class="mb-4">
          দুটি পরিবাহী কপার বা তামার তারকে একই অক্ষে পরস্পর সমভাবে পেঁচিয়ে টুইস্টেড পেয়ার ক্যাবল তৈরি করা হয়। তারদুটির মধ্যে একটি তথ্য প্রেরণে ব্যবহৃত হয় এবং অন্যটি গ্রাউন্ড রেফারেন্স।
        </p>
        <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li>🔹 <strong>রং:</strong> মোট ৪ জোড়া তার। প্রতি জোড়ায় একটি কমন (সাদা) ও একটি ভিন্ন রঙের (কমলা, সবুজ, নীল, বাদামী) তার থাকে।</li>
          <li>🔹 <strong>পেঁচানোর কারণ:</strong> নয়েজ (Noise), তড়িৎ চৌম্বকীয় প্রভাব (EMI) এবং ক্রসটক কমানোর জন্য। প্রতি ইঞ্চিতে ৩টি পূর্ণ প্যাচ থাকে।</li>
          <li>🔹 <strong>কানেক্টর:</strong> RJ-45 কানেক্টর।</li>
        </ul>
      </div>
      
      <!-- Types -->
      <div class="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
        <h4 class="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-3">প্রকারভেদ</h4>
        <div class="space-y-4">
          <div>
            <strong class="text-slate-800 dark:text-slate-200">১. STP (Shielded Twisted Pair):</strong>
            <p class="text-sm text-slate-600 dark:text-slate-400">প্রতি জোড়া তার অ্যালুমিনিয়াম ফয়েল ও শিল্ডিং দ্বারা আবৃত থাকে। ব্যান্ডউইথ ১৬-৫০০ Mbps, দূরত্ব ১০০ মি.</p>
          </div>
          <div>
            <strong class="text-slate-800 dark:text-slate-200">২. UTP (Unshielded Twisted Pair):</strong>
            <p class="text-sm text-slate-600 dark:text-slate-400">অ্যালুমিনিয়াম ফয়েল থাকে না। ব্যান্ডউইথ ১০ Mbps, দূরত্ব ১৫৫ মি.</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pros Cons -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800/30">
        <strong class="text-green-700 dark:text-green-400 flex items-center gap-2 mb-2"><span class="text-lg">✅</span> সুবিধা</strong>
        <ul class="list-disc ml-5 text-slate-600 dark:text-slate-400">
          <li>দামে খুব সস্তা ও ইনস্টল সহজ।</li>
          <li>অ্যানালগ ও ডিজিটাল উভয় ট্রান্সমিশনে ব্যবহৃত হয়।</li>
          <li>স্বল্প দূরত্বের LAN বা টেলিফোন লাইনে সর্বাধিক ব্যবহৃত।</li>
        </ul>
      </div>
      <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800/30">
        <strong class="text-red-700 dark:text-red-400 flex items-center gap-2 mb-2"><span class="text-lg">❌</span> অসুবিধা</strong>
        <ul class="list-disc ml-5 text-slate-600 dark:text-slate-400">
          <li>১০০ মিটারের বেশি দূরত্বে ডেটা পাঠানো কষ্টকর।</li>
          <li>ট্রান্সমিশন লস বেশি।</li>
          <li>তারের দৈর্ঘ্য বাড়লে ডেটা রেট কমে যায়।</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Co-axial Cable -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-sky-200/50 dark:border-sky-700/50 mt-8">
    <h3 class="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-6 flex items-center gap-3 border-b border-sky-100 dark:border-sky-900/50 pb-4">
      <span class="p-2 bg-sky-100 dark:bg-sky-900/50 rounded-xl">📺</span> কো-এক্সিয়াল ক্যাবল (Co-axial Cable)
    </h3>

    <p class="text-slate-700 dark:text-slate-300 mb-6">
      দুটি তড়িৎ পরিবাহী ও দুটি তড়িৎ অপরিবাহী স্তরের সাহায্যে কো-এক্সিয়াল ক্যাবল তৈরি হয়। দুটি পরিবাহী স্তর একই অক্ষ বরাবর থাকে বলে একে কো-এক্সিয়াল ক্যাবল বলা হয়। <strong>BNC কানেক্টর</strong> দিয়ে কানেকশন দেওয়া হয়।
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Parts -->
      <div class="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-100 dark:border-sky-800/30">
        <h4 class="text-lg font-bold text-sky-700 dark:text-sky-400 mb-3">ক্যাবলের বিভিন্ন অংশ</h4>
        <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li><strong>কপার ওয়্যার:</strong> এর মধ্য দিয়ে মূল ডেটা বা তড়িৎ সিগন্যাল প্রবাহিত হয়।</li>
          <li><strong>ফোমের ইনসুলেশন:</strong> কপার ওয়্যার যাতে বেঁকে না যায় সেজন্য অন্তরক স্তর।</li>
          <li><strong>কপার মেস:</strong> বাইরের তাপ, চাপ ও EMI থেকে কপার ওয়্যারকে রক্ষা করে এবং ব্যাতিচার রোধ করে।</li>
          <li><strong>আউট সাইড ইনসুলেশন:</strong> বাইরের আঘাত থেকে রক্ষার জন্য প্ল্যাস্টিকের জ্যাকেট।</li>
        </ul>
      </div>

      <!-- Types & Uses -->
      <div class="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-100 dark:border-sky-800/30">
        <h4 class="text-lg font-bold text-sky-700 dark:text-sky-400 mb-3">প্রকারভেদ ও ব্যবহার</h4>
        <div class="space-y-4">
          <div>
            <strong class="text-slate-800 dark:text-slate-200">প্রকারভেদ:</strong>
            <p class="text-sm text-slate-600 dark:text-slate-400">১. থিননেট (Thinnet): পুরুত্ব ০.২৫ ইঞ্চি, দূরত্ব ১৮৫ মি.<br>২. থিকনেট (Thicknet): পুরুত্ব ০.৫ ইঞ্চি, দূরত্ব ৫০০ মি.</p>
          </div>
          <div>
            <strong class="text-slate-800 dark:text-slate-200">ব্যবহার:</strong>
            <p class="text-sm text-slate-600 dark:text-slate-400">টেলিভিশন নেটওয়ার্ক, ডিশ/ক্যাবল টিভি, সিসিটিভি নেটওয়ার্ক।</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Fiber Optic Cable -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-fuchsia-200/50 dark:border-fuchsia-700/50 mt-8">
    <h3 class="text-2xl font-bold text-fuchsia-700 dark:text-fuchsia-400 mb-6 flex items-center gap-3 border-b border-fuchsia-100 dark:border-fuchsia-900/50 pb-4">
      <span class="p-2 bg-fuchsia-100 dark:bg-fuchsia-900/50 rounded-xl">⚡</span> ফাইবার অপটিক ক্যাবল (Fiber Optic Cable)
    </h3>

    <div class="bg-gradient-to-r from-fuchsia-900 to-purple-800 p-6 rounded-2xl text-white shadow-lg mb-8">
      <p class="text-fuchsia-50 text-lg leading-relaxed">
        ফাইবার অপটিক ক্যাবল অত্যন্ত সূক্ষ্ম কাঁচ (সিলিকা) বা প্লাস্টিকের তৈরি, যা তড়িৎ সিগন্যালের পরিবর্তে <strong>আলোক (Light) সিগন্যাল</strong> ট্রান্সমিট করে। এটি আলোর <strong>পূর্ণ অভ্যন্তরীণ প্রতিফলন</strong> পদ্ধতিতে ডেটা প্রেরণ করে। এর ডেটা ট্রান্সমিশন হার ১০০ Mbps থেকে ২ Gbps। কানেক্টর: SC, ST, MT-RJ।
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Parts -->
      <div class="bg-fuchsia-50 dark:bg-fuchsia-900/20 p-6 rounded-2xl border border-fuchsia-100 dark:border-fuchsia-800/30">
        <h4 class="text-lg font-bold text-fuchsia-700 dark:text-fuchsia-400 mb-3">ক্যাবলের বিভিন্ন অংশ</h4>
        <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <li><strong>কোর (Core):</strong> ভিতরের ডাই-ইলেকট্রিক পদার্থ, যার মধ্য দিয়ে আলো প্রবাহিত হয় (ব্যাস ৮-১০০ মাইক্রন)।</li>
          <li><strong>ক্ল্যাডিং (Cladding):</strong> কোরকে আবদ্ধ রাখা স্তর। কোরের প্রতিসরাঙ্ক ক্ল্যাডিংয়ের চেয়ে বেশি হয়, ফলে পূর্ণ অভ্যন্তরীণ প্রতিফলন ঘটে।</li>
          <li><strong>বাফার (Buffer):</strong> তন্তুকে ক্ষতিকর প্রভাব থেকে রক্ষা করে।</li>
          <li><strong>জ্যাকেট (Jacket):</strong> ক্যাবলকে ধারণ করে।</li>
        </ul>
      </div>

      <!-- Types -->
      <div class="bg-fuchsia-50 dark:bg-fuchsia-900/20 p-6 rounded-2xl border border-fuchsia-100 dark:border-fuchsia-800/30">
        <h4 class="text-lg font-bold text-fuchsia-700 dark:text-fuchsia-400 mb-3">প্রকারভেদ (কোরের গঠন অনুযায়ী)</h4>
        <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <li><strong>সিঙ্গেলমোড:</strong> একসাথে কেবল একটি আলোক সংকেত পাঠানো যায়। কোর ব্যাস ৮-১০ মাইক্রন। দীর্ঘ দূরত্বের জন্য।</li>
          <li><strong>মাল্টিমোড:</strong> একসাথে একাধিক আলোক সংকেত পাঠানো যায়। কোর ব্যাস ৫০-১০০ মাইক্রন। স্বল্প দূরত্বের জন্য। (স্টেপ ইনডেক্স ও গ্রেডেড ইনডেক্স)</li>
        </ul>
      </div>
    </div>

    <!-- Pros Cons Fiber -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800/30">
        <strong class="text-green-700 dark:text-green-400 flex items-center gap-2 mb-2"><span class="text-lg">✅</span> সুবিধা</strong>
        <ul class="list-disc ml-5 text-slate-600 dark:text-slate-400">
          <li>অধিক দূরত্বে গিগাবাইট রেঞ্জে ডেটা ট্রান্সমিট।</li>
          <li>বিদ্যুৎ চৌম্বক প্রভাব (EMI) হতে সম্পূর্ণ মুক্ত।</li>
          <li>ডেটা সংরক্ষণের নিরাপত্তা ও গোপনীয়তা সর্বোচ্চ।</li>
        </ul>
      </div>
      <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800/30">
        <strong class="text-red-700 dark:text-red-400 flex items-center gap-2 mb-2"><span class="text-lg">❌</span> অসুবিধা</strong>
        <ul class="list-disc ml-5 text-slate-600 dark:text-slate-400">
          <li>U-আকারে বাঁকানো যায় না।</li>
          <li>অত্যন্ত দামি এবং ইনস্টলেশন কঠিন।</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Exam Tips -->
  <div class="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-amber-200 dark:border-amber-800/50 mt-12">
    <h3 class="text-xl font-bold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
      <span class="animate-pulse">💡</span> Exam Master Tips
    </h3>
    <ul class="space-y-3 text-slate-700 dark:text-slate-300 text-sm md:text-base">
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>টুইস্টেড পেয়ার:</strong> সাদাসহ ৪ জোড়া তার। স্বল্প দূরত্বে (LAN)।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>কো-এক্সিয়াল:</strong> ডিশ/টিভি ক্যাবল, BNC কানেক্টর।</li>
      <li class="flex items-start gap-2"><span class="mt-1">📌</span> <strong>ফাইবার অপটিক:</strong> আলোর বেগে ডেটা, পূর্ণ অভ্যন্তরীণ প্রতিফলন, কোর ও ক্ল্যাডিং, EMI প্রভাবমুক্ত, সমুদ্রের তলদেশ (সাবমেরিন ক্যাবল), নেটওয়ার্ক ব্যাকবোন।</li>
    </ul>
  </div>

</div>
`;
