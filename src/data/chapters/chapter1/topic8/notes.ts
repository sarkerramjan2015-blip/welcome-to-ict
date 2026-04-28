export const notes = `
<div class="space-y-10">

  <!-- Hero Section: AI & Robotics -->
  <div class="bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-800 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2M7.5 13A2.5 2.5 0 005 15.5 2.5 2.5 0 007.5 18a2.5 2.5 0 002.5-2.5A2.5 2.5 0 007.5 13m9 0a2.5 2.5 0 00-2.5 2.5 2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5A2.5 2.5 0 0016.5 13z"/></svg>
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-blue-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ১: তথ্য ও যোগাযোগ প্রযুক্তি
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">কৃত্রিম বুদ্ধিমত্তা ও রোবটিকস 🤖</h2>
      <p class="text-blue-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        মানুষ যেভাবে চিন্তা-ভাবনা করে সিদ্ধান্ত নেয়, কৃত্রিম উপায়ে কোনো যন্ত্র যদি সেভাবে চিন্তা-ভাবনা করে সিদ্ধান্ত নিতে পারে, তখন সেই যন্ত্রের বুদ্ধিমত্তাকে <strong>কৃত্রিম বুদ্ধিমত্তা (Artificial Intelligence)</strong> বলে। আর প্রযুক্তির যে শাখায় রোবটের নকশা, গঠন ও কাজ সম্পর্কে আলোচনা করা হয়, তাকে <strong>রোবটিকস</strong> বলে।
      </p>
    </div>
  </div>

  <!-- AI Concepts Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
    <!-- AI Basics -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50 hover:-translate-y-1 transition-transform duration-300">
      <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-3 border-b border-blue-100 dark:border-blue-900/50 pb-4">
        <span class="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">🧠</span> আর্টিফিসিয়াল ইনটেলিজেন্স (AI)
      </h3>
      <ul class="space-y-4 text-sm md:text-base text-slate-700 dark:text-slate-300">
        <li class="flex items-start gap-3">
            <span class="text-blue-500 font-bold mt-1">🔹</span> 
            <span><strong>জনক:</strong> ব্রিটিশ বিজ্ঞানী ও গণিতবিদ <strong>অ্যালান টুরিং</strong> এবং ১৯৫৫ সালে <strong>জন ম্যাকার্থি (John McCarthy)</strong> প্রথম AI এর ধারণা দেন।</span>
        </li>
        <li class="flex items-start gap-3">
            <span class="text-blue-500 font-bold mt-1">🔹</span> 
            <span><strong>প্রোগ্রামিং ভাষা:</strong> AI তৈরির জন্য LISP, CLISP, PROLOG, C++, Java ইত্যাদি ভাষা ব্যবহার করা হয়।</span>
        </li>
        <li class="flex items-start gap-3">
            <span class="text-blue-500 font-bold mt-1">🔹</span> 
            <span><strong>দুর্বল AI (Weak AI):</strong> নির্দিষ্ট কাজ সম্পাদনের জন্য (যেমন- দাবা খেলা, Apple Siri, Amazon Alexa)।</span>
        </li>
        <li class="flex items-start gap-3">
            <span class="text-blue-500 font-bold mt-1">🔹</span> 
            <span><strong>শক্তিশালী AI (Strong AI):</strong> মানুষের মতো স্বাধীনভাবে জটিল সমস্যার সমাধান করতে পারে (যেমন- স্বচালিত গাড়ি)।</span>
        </li>
      </ul>
    </div>

    <!-- Machine Learning -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50 hover:-translate-y-1 transition-transform duration-300">
      <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 flex items-center gap-3 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
        <span class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">📈</span> মেশিন লার্নিং (Machine Learning)
      </h3>
      <p class="text-sm md:text-base text-slate-700 dark:text-slate-300 mb-4">
        প্রোগ্রামিং ছাড়াই ডেটা দেখে কম্পিউটারের নিজে থেকেই শিখতে পারার ক্ষমতাকে মেশিন লার্নিং বলে। এটি প্রধানত তিন প্রকার:
      </p>
      <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
        <li class="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
          <strong>১. সুপারভাইজড লার্নিং:</strong> ইনপুট ও আউটপুট লেবেল দেওয়া থাকে। উদাহরণ: স্প্যাম ডিটেকশন।
        </li>
        <li class="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
          <strong>২. আনসুপারভাইজড লার্নিং:</strong> কোনো আউটপুট লেবেল থাকে না, সিস্টেম নিজে প্যাটার্ন খুঁজে নেয়। উদাহরণ: কাস্টমার সেগমেন্টেশন।
        </li>
        <li class="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
          <strong>৩. রিইনফোর্সমেন্ট লার্নিং:</strong> পরিবেশের সাথে ইন্টারঅ্যাক্ট করে পুরস্কার বা শাস্তির মাধ্যমে নিজে নিজে শেখে।
        </li>
      </ul>
    </div>
  </div>

  <!-- Expert System Highlight -->
  <div class="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-[2rem] p-6 md:p-8 shadow-md border border-cyan-100 dark:border-cyan-800/30">
    <h3 class="text-xl font-bold text-cyan-700 dark:text-cyan-400 mb-4 flex items-center gap-2">
      <span class="text-2xl">🎓</span> এক্সপার্ট সিস্টেম (Expert System)
    </h3>
    <p class="text-slate-700 dark:text-slate-300 mb-4 text-sm md:text-base leading-relaxed">
      এক্সপার্ট সিস্টেম হলো কৃত্রিম বুদ্ধিমত্তা সমৃদ্ধ এমন একটি সফটওয়্যার যা মানব বিশেষজ্ঞের মতো কোনো নির্দিষ্ট বিষয়ে জটিল সমস্যার সমাধান করতে পারে। এর প্রধান উপাদান তিনটি: <strong>নলেজবেজ (Knowledge Base), ইনফারেন্স ইঞ্জিন এবং ইউজার ইন্টারফেস।</strong>
    </p>
    <div class="flex flex-wrap gap-3">
      <span class="px-3 py-1 bg-white dark:bg-slate-800 border border-cyan-200 dark:border-cyan-700 rounded-full text-xs font-semibold text-cyan-600 dark:text-cyan-400">Deep blue: দাবা খেলার বিচারক</span>
      <span class="px-3 py-1 bg-white dark:bg-slate-800 border border-cyan-200 dark:border-cyan-700 rounded-full text-xs font-semibold text-cyan-600 dark:text-cyan-400">Mycin: চিকিৎসা পরামর্শ</span>
      <span class="px-3 py-1 bg-white dark:bg-slate-800 border border-cyan-200 dark:border-cyan-700 rounded-full text-xs font-semibold text-cyan-600 dark:text-cyan-400">Prospector: খনিজ অনুসন্ধান</span>
    </div>
  </div>

  <!-- Robotics Section -->
  <div class="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-8 border border-white/40 dark:border-white/10 shadow-lg mt-10">
    <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">⚙️ রোবটিকস ও রোবট</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 class="font-bold text-blue-600 dark:text-blue-400 mb-4">রোবটের প্রধান উপাদানসমূহ</h4>
        <ul class="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li class="flex gap-2"><strong>১. প্রসেসর:</strong> মস্তিষ্কস্বরূপ, যা প্রোগ্রাম রান করে সব নিয়ন্ত্রণ করে।</li>
          <li class="flex gap-2"><strong>২. পাওয়ার সিস্টেম:</strong> রিচার্জেবল লেড এসিড ব্যাটারি দিয়ে শক্তি পায়।</li>
          <li class="flex gap-2"><strong>৩. অ্যাকচুয়েটর:</strong> রোবটের পেশিসদৃশ অংশ যা অঙ্গ-প্রত্যঙ্গ নাড়াতে সাহায্য করে (বৈদ্যুতিক মোটর)।</li>
          <li class="flex gap-2"><strong>৪. সেন্সর:</strong> পারিপার্শ্বিক অবস্থা বোঝার ইনপুট যন্ত্র (চোখ/কান হিসেবে কাজ করে)।</li>
          <li class="flex gap-2"><strong>৫. ম্যানিপুলেটর:</strong> কোনো বস্তু ধরা বা সরানোর অঙ্গ (যেমন- গ্রিপার)।</li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-4">রোবটের ব্যবহার ও বৈশিষ্ট্য</h4>
        <ul class="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li class="flex items-start gap-2"><span class="text-indigo-500 mt-1">✔️</span> <strong>ঝুঁকিপূর্ণ কাজ:</strong> খনির অভ্যন্তরে, গভীর সমুদ্রে বা বিস্ফোরক নিষ্ক্রিয়করণে।</li>
          <li class="flex items-start gap-2"><span class="text-indigo-500 mt-1">✔️</span> <strong>শিল্পকারখানায়:</strong> ওয়েল্ডিং, ভারি মাল তোলা, গাড়ি তৈরি ও সংযোজনে।</li>
          <li class="flex items-start gap-2"><span class="text-indigo-500 mt-1">✔️</span> <strong>চিকিৎসায়:</strong> অত্যন্ত সূক্ষ্ম ও জটিল সার্জারিতে ডাক্তারদের সহায়তা করতে।</li>
          <li class="flex items-start gap-2"><span class="text-indigo-500 mt-1">✔️</span> <strong>বৈশিষ্ট্য:</strong> এরা ক্লান্তিহীন, দ্রুত এবং ৩৬০ ডিগ্রি কোণে কাজ করতে সক্ষম।</li>
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
      <li class="flex gap-2"><span>📌</span> <strong>MCQ হ্যাক:</strong> AI তৈরিতে ব্যবহৃত ভাষা - PROLOG, LISP। রোবটের পেশি বলা হয় - অ্যাকচুয়েটর (Actuator) কে।</li>
      <li class="flex gap-2"><span>📌</span> <strong>CQ হ্যাক:</strong> উদ্দীপকে যদি "চালকবিহীন গাড়ি", "মানুষের মতো চিন্তা করতে পারা যন্ত্র", বা "ডাক্তারের অনুপস্থিতিতে যন্ত্রের সাহায্যে জটিল অপারেশন" এর কথা বলা হয়, তবে সেটি <strong>আর্টিফিসিয়াল ইনটেলিজেন্স বা রোবটিকস</strong>। আর যদি "বিপজ্জনক কাজ যেমন খনি বা কারখানায় ওয়েল্ডিং করা" বোঝায়, তবে সেটি <strong>রোবট</strong>।</li>
    </ul>
  </div>

</div>
`;
