export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-purple-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">সংখ্যা পদ্ধতির পরিচিতি 🔢</h2>
      <p class="text-purple-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        বিভিন্ন সাংকেতিক চিহ্ন বা মৌলিক চিহ্ন ব্যবহার করে সংখ্যা লেখা ও প্রকাশ করার পদ্ধতিকেই সংখ্যা পদ্ধতি বলে। এর সাহায্যে সহজেই সংখ্যা গণনা ও প্রকাশ করা যায়।
      </p>
    </div>
  </div>

  <!-- Key Concepts -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
      মৌলিক ধারণাসমূহ
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2">ডিজিট বা অঙ্ক (Digit)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          কোনো সংখ্যা পদ্ধতি লিখে প্রকাশ করার জন্য যে সমস্ত মৌলিক চিহ্ন বা সাংকেতিক চিহ্ন ব্যবহার করা হয়, তাকে ডিজিট বা অঙ্ক বলে। "সংখ্যা তৈরির ক্ষুদ্রতম প্রতীকই হচ্ছে ডিজিট।" (যেমন: ৬২ সংখ্যাটি ৬ ও ২ এই দুটি ডিজিট নিয়ে গঠিত)।
        </p>
      </div>

      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2">সংখ্যা পদ্ধতির ভিত্তি (Base)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          কোনো সংখ্যা পদ্ধতিতে ব্যবহৃত মোট অঙ্ক বা প্রতীকসমূহের সংখ্যাকে ঐ সংখ্যা পদ্ধতির বেস (Base) বা ভিত্তি বলে। যেমন, দশমিক সংখ্যা পদ্ধতিতে ১০টি অঙ্ক থাকে, তাই এর ভিত্তি ১০।
        </p>
      </div>

      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2">র‍্যাডিক্স পয়েন্ট (Radix Point)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          পজিশনাল সংখ্যা পদ্ধতিতে প্রতিটি সংখ্যাকে যে বিন্দু (Dot) দিয়ে পূর্ণাংশ ও ভগ্নাংশে ভাগ করা হয় তাকে র‍্যাডিক্স পয়েন্ট বলে। এর বামের অংশ পূর্ণ সংখ্যা (Integer) এবং ডানের অংশ ভগ্নাংশ (Fraction)।
        </p>
      </div>

      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2">স্থানীয় মান (Positional Value)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          কোনো সংখ্যা পদ্ধতিতে একটি সংখ্যায় কোনো অঙ্কের পজিশন বা অবস্থানকে তার স্থানীয় মান বলা হয়।
        </p>
      </div>

    </div>
  </div>

  <!-- Types of Number Systems -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-purple-200/50 dark:border-purple-700/50">
    <h3 class="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6 flex items-center gap-3 border-b border-purple-100 dark:border-purple-900/50 pb-4">
      <span class="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">📊</span> সংখ্যা পদ্ধতির প্রকারভেদ
    </h3>
    <p class="text-slate-700 dark:text-slate-300 mb-6">
      উপস্থাপন বা প্রকাশের উপর ভিত্তি করে সংখ্যা পদ্ধতি প্রধানত ২ প্রকার:
    </p>

    <div class="space-y-6">
      <div class="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-2xl border border-purple-100 dark:border-purple-800/30">
        <h4 class="font-bold text-lg text-purple-800 dark:text-purple-300 mb-2">১. নন-পজিশনাল (অস্থানিক) সংখ্যা পদ্ধতি</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          যে সংখ্যা পদ্ধতিতে সংখ্যার মান ব্যবহৃত অঙ্ক বা চিহ্নসমূহের অবস্থানের উপর নির্ভর করে না, তাকে নন-পজিশনাল সংখ্যা পদ্ধতি বলে। এতে অঙ্কের কোনো স্থানীয় মান থাকে না। উদাহরণ: হায়ারোগ্লিফিক্স, মায়ান, রোমান সংখ্যা, ট্যালি।
        </p>
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-2xl border border-purple-100 dark:border-purple-800/30">
        <h4 class="font-bold text-lg text-purple-800 dark:text-purple-300 mb-2">২. পজিশনাল (স্থানিক) সংখ্যা পদ্ধতি</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
          যে সংখ্যা পদ্ধতি প্রকাশ করার জন্য মৌলিক চিহ্ন, বেস বা ভিত্তি এবং অঙ্কের অবস্থান বা স্থানীয় মান প্রয়োজন হয়, তাকে পজিশনাল সংখ্যা পদ্ধতি বলে। এটি ৪ প্রকার:
        </p>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-slate-600 dark:text-slate-300">
            <thead class="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-700 dark:text-slate-200">
              <tr>
                <th class="px-4 py-3 rounded-tl-xl">নাম</th>
                <th class="px-4 py-3">ভিত্তি (Base)</th>
                <th class="px-4 py-3">প্রতীক বা অঙ্কসমূহ</th>
                <th class="px-4 py-3 rounded-tr-xl">উদাহরণ</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
                <td class="px-4 py-3 font-semibold text-sky-600 dark:text-sky-400">বাইনারি (Binary)</td>
                <td class="px-4 py-3">২</td>
                <td class="px-4 py-3">0, 1</td>
                <td class="px-4 py-3">(1011)₂</td>
              </tr>
              <tr class="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
                <td class="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">অক্টাল (Octal)</td>
                <td class="px-4 py-3">৮</td>
                <td class="px-4 py-3">0, 1, 2, 3, 4, 5, 6, 7</td>
                <td class="px-4 py-3">(57)₈</td>
              </tr>
              <tr class="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
                <td class="px-4 py-3 font-semibold text-amber-600 dark:text-amber-400">দশমিক (Decimal)</td>
                <td class="px-4 py-3">১০</td>
                <td class="px-4 py-3">0, 1, 2, 3, 4, 5, 6, 7, 8, 9</td>
                <td class="px-4 py-3">(54)₁₀</td>
              </tr>
              <tr class="bg-white dark:bg-slate-800">
                <td class="px-4 py-3 font-semibold text-pink-600 dark:text-pink-400 rounded-bl-xl">হেক্সাডেসিমেল (Hexadecimal)</td>
                <td class="px-4 py-3">১৬</td>
                <td class="px-4 py-3">0-9 এবং A-F (A=10, B=11, C=12, D=13, E=14, F=15)</td>
                <td class="px-4 py-3 rounded-br-xl">(A5B)₁₆</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Bits and Bytes -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-sky-200/50 dark:border-sky-700/50">
    <h3 class="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-6 flex items-center gap-3 border-b border-sky-100 dark:border-sky-900/50 pb-4">
      <span class="p-2 bg-sky-100 dark:bg-sky-900/50 rounded-xl">💾</span> বিট, বাইট এবং নিবল
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-2xl border border-sky-100 dark:border-sky-800/30">
        <h4 class="font-bold text-lg text-sky-800 dark:text-sky-300 mb-2">বিট (Bit)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Binary Digit শব্দের সংক্ষিপ্ত রূপ। বাইনারি সংখ্যা পদ্ধতির 0 এবং 1 এই দুটি মৌলিক অঙ্ককে বিট বলে। ডেটা পরিমাপের ক্ষুদ্রতম একক।
        </p>
      </div>
      <div class="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-2xl border border-sky-100 dark:border-sky-800/30">
        <h4 class="font-bold text-lg text-sky-800 dark:text-sky-300 mb-2">বাইট (Byte)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ৮টি বিটের গ্রুপ নিয়ে গঠিত শব্দকে বাইট বলে। ১ বাইট = ১ ক্যারেক্টার বা অক্ষর। (8 Bits = 1 Byte)
        </p>
      </div>
      <div class="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-2xl border border-sky-100 dark:border-sky-800/30">
        <h4 class="font-bold text-lg text-sky-800 dark:text-sky-300 mb-2">নিবল (Nibble)</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          এক বাইটের অর্ধেককে নিবল বলা হয়। অর্থাৎ ৪ বিট = ১ নিবল। (1 Byte = 2 Nibbles)
        </p>
      </div>
    </div>
  </div>

  <!-- Historical Timeline -->
  <div class="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-amber-200 dark:border-amber-800/50">
    <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4 flex items-center gap-2">
      <span>📜</span> সংখ্যা পদ্ধতির ইতিহাস
    </h3>
    <ul class="space-y-3 text-slate-700 dark:text-slate-300 text-sm">
      <li class="flex items-start gap-2"><span class="mt-0.5">🔹</span> <strong>খ্রিস্টপূর্ব ৫০০০:</strong> মিশরীয় (হায়ারোগ্লিফিক্স) এবং সুমেরীয় সভ্যতায় সর্বপ্রথম লিখিত চিহ্নের ব্যবহার শুরু।</li>
      <li class="flex items-start gap-2"><span class="mt-0.5">🔹</span> <strong>খ্রিস্টপূর্ব ৩০০০:</strong> সুমেরীয় এবং ব্যাবিলনীয় নাম্বার সিস্টেমের উদ্ভব। তাদের ভিত্তি ছিল ৬০।</li>
      <li class="flex items-start gap-2"><span class="mt-0.5">🔹</span> <strong>খ্রিস্টপূর্ব ২৫০০:</strong> চাইনিজ নাম্বার সিস্টেমের উদ্ভব।</li>
      <li class="flex items-start gap-2"><span class="mt-0.5">🔹</span> <strong>শূন্য (০) এর আবিষ্কার:</strong> হিন্দু নাম্বার সিস্টেম বা ভারতীয় উপমহাদেশ থেকে শূন্যের ধারণা আসে। আরবরা এটি আয়ত্ত করে ইউরোপে ছড়িয়ে দেয় (Hindu-Arabic System)।</li>
      <li class="flex items-start gap-2"><span class="mt-0.5">🔹</span> <strong>মায়ান সভ্যতা:</strong> ২০ ভিত্তিক (কুড়িভিত্তিক) সংখ্যা পদ্ধতি ব্যবহার করত।</li>
    </ul>
  </div>

</div>
`;
