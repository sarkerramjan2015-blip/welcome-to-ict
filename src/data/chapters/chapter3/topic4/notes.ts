export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L15.17 10H4v2h11.17l-4.58 4.59L12 18l7-7-7-7z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-teal-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">সংখ্যা পদ্ধতির রূপান্তর 🔄</h2>
      <p class="text-teal-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        এক সংখ্যা পদ্ধতি থেকে অন্য সংখ্যা পদ্ধতিতে পরিবর্তন করাকে রূপান্তর বা Conversion বলে। মূলত ৩টি সাধারণ নিয়মের মাধ্যমে ১২ প্রকার রূপান্তর খুব সহজেই করা যায়।
      </p>
    </div>
  </div>

  <!-- Rules Overview -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-3xl border border-indigo-200 dark:border-indigo-800/50 shadow-sm text-center">
      <div class="w-16 h-16 bg-indigo-200 dark:bg-indigo-800 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto shadow-inner">1️⃣</div>
      <h3 class="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2">দশমিক থেকে অন্য যেকোনো পদ্ধতি</h3>
      <p class="text-sm text-slate-600 dark:text-slate-400">ভাগ ও গুণের নিয়ম। পূর্ণাংশকে ভাগ এবং ভগ্নাংশকে গুণ করতে হয়।</p>
    </div>
    <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-3xl border border-teal-200 dark:border-teal-800/50 shadow-sm text-center">
      <div class="w-16 h-16 bg-teal-200 dark:bg-teal-800 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto shadow-inner">2️⃣</div>
      <h3 class="font-bold text-lg text-teal-800 dark:text-teal-300 mb-2">অন্য যেকোনো পদ্ধতি থেকে দশমিক</h3>
      <p class="text-sm text-slate-600 dark:text-slate-400">পাওয়ার বা ঘাতের গুণনের নিয়ম। বেস এর উপর পাওয়ার দিয়ে গুণ করে যোগ করতে হয়।</p>
    </div>
    <div class="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-3xl border border-rose-200 dark:border-rose-800/50 shadow-sm text-center">
      <div class="w-16 h-16 bg-rose-200 dark:bg-rose-800 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto shadow-inner">3️⃣</div>
      <h3 class="font-bold text-lg text-rose-800 dark:text-rose-300 mb-2">বাইনারি, অক্টাল ও হেক্সা এর পারস্পরিক</h3>
      <p class="text-sm text-slate-600 dark:text-slate-400">বিট গ্রুপিং নিয়ম। অক্টাল ৩ বিট এবং হেক্সাডেসিমেল ৪ বিট করে গ্রুপ করতে হয়।</p>
    </div>
  </div>

  <!-- Rule 1 -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 flex items-center gap-3 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
      <span class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-xl">1️⃣</span> নিয়ম ১: দশমিক থেকে অন্য পদ্ধতি (ভাগ-গুণ)
    </h3>
    <div class="space-y-4 text-slate-700 dark:text-slate-300">
      <p>দশমিক সংখ্যাকে বাইনারি, অক্টাল বা হেক্সাডেসিমেলে নিতে হলে:</p>
      <ul class="list-disc list-inside ml-4 space-y-2">
        <li><strong>পূর্ণ সংখ্যার ক্ষেত্রে:</strong> যে পদ্ধতিতে যাব, তার <strong>বেস (Base)</strong> দিয়ে দশমিক পূর্ণ সংখ্যাটিকে বার বার ভাগ করতে হবে, যতক্ষণ না ভাগফল ০ হয়। ভাগশেষগুলো নিচ থেকে উপরে সাজালে (MSB থেকে LSB) উত্তর পাওয়া যায়।</li>
        <li><strong>ভগ্নাংশের ক্ষেত্রে:</strong> যে পদ্ধতিতে যাব, তার <strong>বেস (Base)</strong> দিয়ে দশমিক ভগ্নাংশটিকে বার বার গুণ করতে হবে, যতক্ষণ না ভগ্নাংশ .00 হয় (বা ৩-৪ বার করা যায়)। পূর্ণ সংখ্যাগুলো উপর থেকে নিচে সাজালে উত্তর পাওয়া যায়।</li>
      </ul>
      
      <div class="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-2xl mt-4 border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="font-bold text-indigo-800 dark:text-indigo-300 mb-2">উদাহরণ: (25)₁₀ কে বাইনারিতে রূপান্তর</h4>
        <div class="font-mono text-sm space-y-1">
          <p>25 ÷ 2 = 12, ভাগশেষ 1 (LSD)</p>
          <p>12 ÷ 2 = 6, ভাগশেষ 0</p>
          <p>6 ÷ 2 = 3, ভাগশেষ 0</p>
          <p>3 ÷ 2 = 1, ভাগশেষ 1</p>
          <p>1 ÷ 2 = 0, ভাগশেষ 1 (MSD)</p>
          <p class="font-bold text-indigo-600 dark:text-indigo-400 mt-2">নিচ থেকে উপরে: (11001)₂</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Rule 2 -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-teal-200/50 dark:border-teal-700/50">
    <h3 class="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-6 flex items-center gap-3 border-b border-teal-100 dark:border-teal-900/50 pb-4">
      <span class="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-xl text-xl">2️⃣</span> নিয়ম ২: অন্য পদ্ধতি থেকে দশমিক (পাওয়ারের গুণ)
    </h3>
    <div class="space-y-4 text-slate-700 dark:text-slate-300">
      <p>বাইনারি, অক্টাল বা হেক্সাডেসিমেল থেকে দশমিকে নিতে হলে:</p>
      <ul class="list-disc list-inside ml-4 space-y-2">
        <li>সংখ্যার প্রতিটি অঙ্ককে ওই সংখ্যা পদ্ধতির <strong>বেস (Base)</strong> দ্বারা গুণ করতে হবে।</li>
        <li>প্রতিটি গুণের পর যোগ (+) চিহ্ন দিতে হবে।</li>
        <li>বেসগুলোর উপর ডানদিক থেকে বামদিকে পাওয়ার (0, 1, 2, ...) বসাতে হবে (পূর্ণাংশের জন্য)।</li>
        <li>ভগ্নাংশের ক্ষেত্রে দশমিকের পর বাম থেকে ডানে পাওয়ার (-1, -2, -3, ...) বসাতে হবে।</li>
        <li>সবগুলো গুণ করে যোগ করলেই দশমিক সংখ্যা পাওয়া যাবে।</li>
      </ul>

      <div class="bg-teal-50 dark:bg-teal-900/10 p-5 rounded-2xl mt-4 border border-teal-100 dark:border-teal-800/30">
        <h4 class="font-bold text-teal-800 dark:text-teal-300 mb-2">উদাহরণ: (101)₂ কে দশমিকে রূপান্তর</h4>
        <div class="font-mono text-sm space-y-1">
          <p>= 1×2² + 0×2¹ + 1×2⁰</p>
          <p>= 1×4 + 0×2 + 1×1</p>
          <p>= 4 + 0 + 1</p>
          <p class="font-bold text-teal-600 dark:text-teal-400 mt-2">= (5)₁₀</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Rule 3 -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-rose-200/50 dark:border-rose-700/50">
    <h3 class="text-2xl font-bold text-rose-700 dark:text-rose-400 mb-6 flex items-center gap-3 border-b border-rose-100 dark:border-rose-900/50 pb-4">
      <span class="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-xl text-xl">3️⃣</span> নিয়ম ৩: বাইনারি, অক্টাল ও হেক্সা এর পারস্পরিক সম্পর্ক (বিট গ্রুপিং)
    </h3>
    <div class="space-y-4 text-slate-700 dark:text-slate-300">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-bold text-lg text-rose-800 dark:text-rose-300 mb-2 border-b border-rose-200 dark:border-rose-800/30 pb-2">অক্টাল ↔ বাইনারি (৩ বিটের সম্পর্ক)</h4>
          <p class="text-sm mb-2">অক্টালের ১টি ডিজিট = বাইনারির ৩টি বিট। (কারণ 2³ = 8)</p>
          <ul class="list-disc list-inside text-sm space-y-1">
            <li><strong>অক্টাল থেকে বাইনারি:</strong> অক্টালের প্রতিটি ডিজিটকে আলাদা করে তার ৩-বিটের বাইনারি মান লিখতে হয় (যেমন: 421 কোড ব্যবহার করে)।</li>
            <li><strong>বাইনারি থেকে অক্টাল:</strong> বাইনারি সংখ্যাটিকে ডান থেকে বামে ৩টি করে বিটের গ্রুপ করতে হয়। ভগ্নাংশের ক্ষেত্রে বাম থেকে ডানে গ্রুপ করতে হয়। কম পড়লে শূন্য দিয়ে গ্রুপ পূর্ণ করতে হয়। তারপর প্রতি গ্রুপের সমতুল্য অক্টাল মান লিখতে হয়।</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-lg text-rose-800 dark:text-rose-300 mb-2 border-b border-rose-200 dark:border-rose-800/30 pb-2">হেক্সাডেসিমেল ↔ বাইনারি (৪ বিটের সম্পর্ক)</h4>
          <p class="text-sm mb-2">হেক্সাডেসিমেলের ১টি ডিজিট = বাইনারির ৪টি বিট। (কারণ 2⁴ = 16)</p>
          <ul class="list-disc list-inside text-sm space-y-1">
            <li><strong>হেক্সা থেকে বাইনারি:</strong> হেক্সার প্রতিটি ডিজিটকে আলাদা করে তার ৪-বিটের বাইনারি মান লিখতে হয় (যেমন: 8421 কোড ব্যবহার করে)।</li>
            <li><strong>বাইনারি থেকে হেক্সা:</strong> বাইনারি সংখ্যাটিকে ৪টি করে বিটের গ্রুপ করতে হয়। তারপর প্রতি গ্রুপের সমতুল্য হেক্সা মান লিখতে হয়।</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-2xl mt-4 border border-rose-100 dark:border-rose-800/30">
        <h4 class="font-bold text-rose-800 dark:text-rose-300 mb-2">অক্টাল ↔ হেক্সাডেসিমেল সরাসরি রূপান্তর</h4>
        <p class="text-sm">অক্টাল থেকে সরাসরি হেক্সাতে বা হেক্সা থেকে সরাসরি অক্টালে যাওয়া যায় না। মাঝে <strong>বাইনারি</strong> হয়ে যেতে হয়।</p>
        <p class="font-mono text-sm mt-2 text-center bg-white dark:bg-slate-800 py-2 rounded-lg border border-rose-200 dark:border-rose-700/50">অক্টাল ↔ [বাইনারি] ↔ হেক্সাডেসিমেল</p>
      </div>
    </div>
  </div>

</div>
`;
