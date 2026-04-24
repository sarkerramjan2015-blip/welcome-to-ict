export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-blue-900 via-sky-900 to-blue-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.36 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-blue-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">ক্লাউড কম্পিউটিং ☁️</h2>
      <p class="text-blue-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        ক্লাউড কম্পিউটিং হলো ইন্টারনেট ভিত্তিক একটি বিশেষ পরিসেবা, যেখানে কম্পিউটিং সেবা, সার্ভার, স্টোরেজ, সফটওয়্যার প্রভৃতি সেবা ক্রেতার চাহিদামাত্র ও সুবিধা অনুযায়ী ভাড়া দেওয়া হয়। উদাহরণ: AWS, Google Drive, Dropbox।
      </p>
    </div>
  </div>

  <!-- Key Features -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50">
    <h3 class="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6 flex items-center gap-3 border-b border-blue-100 dark:border-blue-900/50 pb-4">
      <span class="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">✨</span> ক্লাউড কম্পিউটিং-এর মূল বৈশিষ্ট্য
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/30">
        <h4 class="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">১. অন-ডিমান্ড (On-Demand)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ক্রেতা যখন চাইবে, তখনই সেবা দিতে হবে। ক্রেতা তার ইচ্ছা অনুযায়ী যখন খুশি তার চাহিদা বাড়াতে বা কমাতে পারবে।
        </p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/30">
        <h4 class="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">২. রিসোর্স স্কেলেবিলিটি</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ছোট বা বড় যেকোনো ক্রেতার সকল ধরণের চাহিদাই মেটাতে হবে।
        </p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/30">
        <h4 class="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">৩. পে-অ্যাজ-ইউ-গো</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ক্রেতাকে আগে থেকে কোনো পেমেন্ট করতে হবে না। যতটুকু রিসোর্স যত সময়ের জন্য ব্যবহার করবে, কেবলমাত্র তার জন্যই পেমেন্ট দিতে হবে।
        </p>
      </div>
    </div>
  </div>

  <!-- Service Models -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 flex items-center gap-3 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
      <span class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">🛠️</span> ক্লাউড কম্পিউটিং এর সার্ভিস মডেল (Service Models)
    </h3>
    <div class="space-y-6">
      
      <!-- SaaS -->
      <div class="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
          <span class="bg-indigo-200 dark:bg-indigo-800 px-2 py-1 rounded text-sm">SaaS</span> সফটওয়্যার সেবা (Software as a Service)
        </h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          সফটওয়্যার সরাসরি ইন্টারনেটে ব্যবহার করা যায়, ইনস্টল করার প্রয়োজন নেই। সফটওয়্যারটি চলছে ক্লাউডের উপর ভিত্তি করে এবং ব্যবহারকারী মাসিক সাবস্ক্রিপশন দিয়ে এটি ব্যবহার করে।
        </p>
        <p class="text-sm font-semibold mt-2 text-indigo-700 dark:text-indigo-400">উদাহরণ: Google Docs, Microsoft 365, Dropbox</p>
      </div>

      <!-- PaaS -->
      <div class="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
          <span class="bg-indigo-200 dark:bg-indigo-800 px-2 py-1 rounded text-sm">PaaS</span> প্লাটফর্মভিত্তিক সেবা (Platform as a Service)
        </h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          এখানে রানটাইম পরিবেশ সরবরাহ করা হয়, যার উপর ভিত্তি করে ব্যবহারকারী (ডেভেলপার) নিজের অ্যাপ্লিকেশন তৈরি করতে পারে। তবে অপারেটিং সিস্টেম ও হার্ডওয়্যারের নিয়ন্ত্রণ ইউজারের থাকে না।
        </p>
        <p class="text-sm font-semibold mt-2 text-indigo-700 dark:text-indigo-400">উদাহরণ: Google App Engine</p>
      </div>

      <!-- IaaS -->
      <div class="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
          <span class="bg-indigo-200 dark:bg-indigo-800 px-2 py-1 rounded text-sm">IaaS</span> অবকাঠামোগত সেবা (Infrastructure as a Service)
        </h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ভার্চুয়াল মেশিন, সার্ভার, স্টোরেজ ইত্যাদি অবকাঠামো ভাড়া দেওয়া হয়। ক্লায়েন্ট নিজের ইচ্ছামতো অপারেটিং সিস্টেম ও সফটওয়্যার ইন্সটল করতে পারে। সিস্টেমের পুরো নিয়ন্ত্রণ ক্লায়েন্ট এর হাতে থাকে।
        </p>
        <p class="text-sm font-semibold mt-2 text-indigo-700 dark:text-indigo-400">উদাহরণ: Amazon EC2</p>
      </div>

    </div>
  </div>

  <!-- Deployment Models -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-teal-200/50 dark:border-teal-700/50">
    <h3 class="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-6 flex items-center gap-3 border-b border-teal-100 dark:border-teal-900/50 pb-4">
      <span class="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-xl">🌐</span> ক্লাউড স্থাপনা মডেল (Deployment Models)
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="bg-teal-50 dark:bg-teal-900/10 p-5 rounded-2xl border border-teal-100 dark:border-teal-800/30">
        <h4 class="font-bold text-lg text-teal-800 dark:text-teal-300 mb-2">১. পাবলিক ক্লাউড</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          সবার জন্য উন্মুক্ত। যে টাকা দিবে, সেই সার্ভিস পাবে। তবে নিরাপত্তা ঝুঁকি থাকতে পারে। (যেমন- আমাজনের EC2)
        </p>
      </div>

      <div class="bg-teal-50 dark:bg-teal-900/10 p-5 rounded-2xl border border-teal-100 dark:border-teal-800/30">
        <h4 class="font-bold text-lg text-teal-800 dark:text-teal-300 mb-2">২. প্রাইভেট ক্লাউড</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          কোনো বড় সংস্থা নিজেদের অভ্যন্তরীণ ব্যবহারের জন্য যে ক্লাউড তৈরি করে। এটি অধিক সুরক্ষিত।
        </p>
      </div>

      <div class="bg-teal-50 dark:bg-teal-900/10 p-5 rounded-2xl border border-teal-100 dark:border-teal-800/30">
        <h4 class="font-bold text-lg text-teal-800 dark:text-teal-300 mb-2">৩. কমিউনিটি ক্লাউড</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          কোনো বিশেষ কমিউনিটির (যেমন- সেনা সদস্য) জন্য তৈরি ক্লাউড। সিকিউরিটি ভালো কিন্তু খরচ বেশি।
        </p>
      </div>

      <div class="bg-teal-50 dark:bg-teal-900/10 p-5 rounded-2xl border border-teal-100 dark:border-teal-800/30">
        <h4 class="font-bold text-lg text-teal-800 dark:text-teal-300 mb-2">৪. হাইব্রিড ক্লাউড</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          পাবলিক এবং প্রাইভেট ক্লাউডের সংমিশ্রণ। জটিল কাজ প্রাইভেট এবং সাধারণ কাজ পাবলিক ক্লাউডে করা হয়।
        </p>
      </div>

    </div>
  </div>

  <!-- Pros & Cons -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-3xl border border-green-200 dark:border-green-800/50">
      <h4 class="font-bold text-xl text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
        <span>✅</span> সুবিধা
      </h4>
      <ul class="list-disc ml-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
        <li>যেকোনো স্থান থেকে যেকোনো সময় ব্যবহারযোগ্য।</li>
        <li>নিজস্ব হার্ডওয়্যার, সফটওয়্যার বা ডেটা সেন্টারের প্রয়োজন নেই (খরচ কম)।</li>
        <li>সফটওয়্যার আপডেট স্বয়ংক্রিয়ভাবে হয়।</li>
        <li>ডেটা ব্যাকআপ বা প্রসেস সম্পর্কে চিন্তা করতে হয় না।</li>
      </ul>
    </div>
    
    <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-3xl border border-red-200 dark:border-red-800/50">
      <h4 class="font-bold text-xl text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
        <span>❌</span> অসুবিধা
      </h4>
      <ul class="list-disc ml-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
        <li>তথ্যের উপর ব্যবহারকারীর নিয়ন্ত্রণ থাকে না।</li>
        <li>গোপনীয়তা ভঙ্গের এবং হ্যাকিং হওয়ার ঝুঁকি থাকে।</li>
        <li>ইন্টারনেট সংযোগ বিঘ্নিত হলে সেবা পাওয়া যায় না।</li>
      </ul>
    </div>
  </div>

</div>
`;
