export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-pink-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/><path d="M11 5v14h2V5h-2z" transform="translate(14,0) scale(0.5) translate(-14,0)" opacity="0.5"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-pink-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">চিহ্নযুক্ত সংখ্যা ও ২-এর পরিপূরক (+/-)</h2>
      <p class="text-pink-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        কম্পিউটার সরাসরি যোগ, বিয়োগ, গুণ বা ভাগ করতে পারে না। সে শুধু "যোগ" করতে পারে। ২-এর পরিপূরক (2's Complement) পদ্ধতির মাধ্যমে কম্পিউটার বিয়োগের কাজও যোগের সাহায্যে করে থাকে!
      </p>
    </div>
  </div>

  <!-- Signed Numbers -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 flex items-center gap-3 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
      <span class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-xl">🔢</span> চিহ্নযুক্ত সংখ্যা (Signed Numbers)
    </h3>
    <div class="space-y-4 text-slate-700 dark:text-slate-300">
      <p>
        বাস্তব জীবনে আমরা সংখ্যার আগে '+' বা '-' চিহ্ন ব্যবহার করে ধনাত্মক বা ঋণাত্মক সংখ্যা বোঝাই। কিন্তু কম্পিউটারে ধনাত্মক বা ঋণাত্মক সংখ্যা বোঝানোর জন্য সংখ্যার সর্ববামের বিট (Most Significant Bit - MSB) কে <strong>চিহ্ন বিট (Sign Bit)</strong> হিসেবে ব্যবহার করা হয়।
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div class="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/30 flex items-center gap-4">
          <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-full flex items-center justify-center font-bold text-2xl shrink-0">0</div>
          <div>
            <h4 class="font-bold text-emerald-800 dark:text-emerald-400">ধনাত্মক সংখ্যা (+)</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">চিহ্ন বিট 0 হলে সংখ্যাটি ধনাত্মক (Positive)।</p>
          </div>
        </div>
        
        <div class="bg-rose-50 dark:bg-rose-900/20 p-5 rounded-2xl border border-rose-200 dark:border-rose-800/30 flex items-center gap-4">
          <div class="w-12 h-12 bg-rose-100 dark:bg-rose-800 text-rose-700 dark:text-rose-300 rounded-full flex items-center justify-center font-bold text-2xl shrink-0">1</div>
          <div>
            <h4 class="font-bold text-rose-800 dark:text-rose-400">ঋণাত্মক সংখ্যা (-)</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400">চিহ্ন বিট 1 হলে সংখ্যাটি ঋণাত্মক (Negative)।</p>
          </div>
        </div>
      </div>
      
      <p class="text-sm bg-slate-100 dark:bg-slate-700 p-3 rounded-lg mt-4 border border-slate-200 dark:border-slate-600">
        <strong>নোট:</strong> সাধারণত ৮ বিট রেজিস্টারের ক্ষেত্রে সর্ববামের (৮ম) বিটটি হলো চিহ্ন বিট এবং বাকি ৭টি বিট হলো ডেটা বিট বা সংখ্যার মান।
      </p>
    </div>
  </div>

  <!-- 1's and 2's Complement -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-pink-200/50 dark:border-pink-700/50">
    <h3 class="text-2xl font-bold text-pink-700 dark:text-pink-400 mb-6 flex items-center gap-3 border-b border-pink-100 dark:border-pink-900/50 pb-4">
      <span class="p-2 bg-pink-100 dark:bg-pink-900/50 rounded-xl text-xl">🔄</span> পরিপূরক গঠন (Complement)
    </h3>
    
    <div class="space-y-6">
      <div class="bg-pink-50 dark:bg-pink-900/10 p-5 rounded-2xl border border-pink-100 dark:border-pink-800/30">
        <h4 class="font-bold text-lg text-pink-800 dark:text-pink-300 mb-2">১ এর পরিপূরক (1's Complement)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
          কোনো বাইনারি সংখ্যার 0 এর স্থলে 1 এবং 1 এর স্থলে 0 বসালে যে নতুন সংখ্যা পাওয়া যায়, তাকে ঐ সংখ্যার ১ এর পরিপূরক বলে। এটি মূলত বিটগুলোকে উল্টে দেওয়া (Invert)।
        </p>
        <div class="font-mono text-sm bg-white dark:bg-slate-800 p-3 rounded-xl border border-pink-200 dark:border-pink-800">
          মূল সংখ্যা: &nbsp;&nbsp;&nbsp;1 0 1 1 0 0 1 0<br/>
          ১ এর পরিপূরক: 0 1 0 0 1 1 0 1
        </div>
      </div>

      <div class="bg-fuchsia-50 dark:bg-fuchsia-900/10 p-5 rounded-2xl border border-fuchsia-100 dark:border-fuchsia-800/30">
        <h4 class="font-bold text-lg text-fuchsia-800 dark:text-fuchsia-300 mb-2">২ এর পরিপূরক (2's Complement)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
          কোনো বাইনারি সংখ্যার ১ এর পরিপূরকের সাথে বাইনারি নিয়মে 1 যোগ করলে যে সংখ্যা পাওয়া যায়, তাকে ২ এর পরিপূরক বলে। 
          <strong>(২ এর পরিপূরক = ১ এর পরিপূরক + ১)</strong>। 
          কোনো ধনাত্মক সংখ্যার ২ এর পরিপূরক করলে তার ঋণাত্মক মান পাওয়া যায়।
        </p>
        <div class="font-mono text-sm bg-white dark:bg-slate-800 p-4 rounded-xl border border-fuchsia-200 dark:border-fuchsia-800 flex flex-col items-center">
          <div class="text-left w-64">
            <div class="flex justify-between"><span>(+22)₁₀ এর মান</span><span>= 00010110</span></div>
            <div class="flex justify-between text-slate-500"><span>১ এর পরিপূরক</span><span>= 11101001</span></div>
            <div class="flex justify-between text-slate-500"><span>যোগ ১</span><span>+ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1</span></div>
            <div class="border-t-2 border-slate-300 dark:border-slate-600 my-1"></div>
            <div class="flex justify-between font-bold text-fuchsia-600 dark:text-fuchsia-400">
              <span>(-22)₁₀ এর মান</span><span>= 11101010</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Advantages of 2's Complement -->
  <div class="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-blue-200 dark:border-blue-800/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4 flex items-center gap-2 border-b border-blue-200 dark:border-blue-800/50 pb-4">
      <span class="p-2 bg-blue-200 dark:bg-blue-800/50 rounded-xl">🌟</span> ২ এর পরিপূরকের গুরুত্ব ও সুবিধা
    </h3>
    <ul class="space-y-3 text-slate-700 dark:text-slate-300 text-sm md:text-base">
      <li class="flex items-start gap-2"><span class="mt-0.5 text-blue-500">✅</span> <strong>বিয়োগের কাজ যোগের মাধ্যমে:</strong> ২ এর পরিপূরক পদ্ধতিতে যোগ ও বিয়োগের জন্য একই বর্তনী (Adder Circuit) ব্যবহার করা যায়। আলাদা সাবট্রাক্টর (Subtractor) বর্তনীর প্রয়োজন হয় না।</li>
      <li class="flex items-start gap-2"><span class="mt-0.5 text-blue-500">✅</span> <strong>সার্কিটের সরলতা:</strong> একই বর্তনী দিয়ে যোগ-বিয়োগ করা যায় বলে কম্পিউটারের হার্ডওয়্যার বা সার্কিটের পরিমাণ কমে যায় এবং জটিলতা হ্রাস পায়।</li>
      <li class="flex items-start gap-2"><span class="mt-0.5 text-blue-500">✅</span> <strong>খরচ কম ও দ্রুতগতি:</strong> সার্কিট সহজ হওয়ায় কম্পিউটারের দাম কমে এবং কাজের গতি বৃদ্ধি পায়।</li>
      <li class="flex items-start gap-2"><span class="mt-0.5 text-blue-500">✅</span> <strong>শূন্যের (0) একটিই মান:</strong> প্রকৃত মান গঠন বা ১ এর পরিপূরক গঠনে +0 এবং -0 এর জন্য দুটি আলাদা কোড থাকে। কিন্তু ২ এর পরিপূরক পদ্ধতিতে +0 এবং -0 বলতে কিছু নেই, শুধু 0 এর একটিই মান থাকে, যা গাণিতিক জটিলতা দূর করে।</li>
    </ul>
  </div>

</div>
`;
