export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-teal-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">লজিক ফাংশন সরলীকরণ 🧮</h2>
      <p class="text-teal-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        বুলিয়ান উপপাদ্য ব্যবহার করে কোনো লজিক ফাংশনকে তার সবচেয়ে ছোট বা সহজ রূপে প্রকাশ করাকে সরলীকরণ বলা হয়। এটি কম খরচে এবং কম গেইট ব্যবহার করে সার্কিট তৈরিতে সাহায্য করে।
      </p>
    </div>
  </div>

  <!-- Why Simplify? -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/50">
    <div class="flex flex-col md:flex-row gap-6 items-center">
      <div class="flex-1">
        <h3 class="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
          <span class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-xl">💡</span> সরলীকরণ কেন প্রয়োজন?
        </h3>
        <ul class="space-y-3 text-slate-700 dark:text-slate-300">
          <li class="flex items-start gap-2">
            <span class="text-emerald-500 mt-1">✓</span>
            <span><strong>গেইট সংখ্যা হ্রাস:</strong> সরলীকরণের ফলে সার্কিটে ব্যবহৃত লজিক গেইটের পরিমাণ কমে যায়।</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-emerald-500 mt-1">✓</span>
            <span><strong>খরচ সাশ্রয়:</strong> গেইটের পরিমাণ কমে যাওয়ায় সার্কিট তৈরির খরচ কমে।</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-emerald-500 mt-1">✓</span>
            <span><strong>আকার হ্রাস:</strong> সার্কিটের আকার ছোট হয়, ফলে আধুনিক ছোট ডিভাইসে ব্যবহার করা সহজ হয়।</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-emerald-500 mt-1">✓</span>
            <span><strong>গতি বৃদ্ধি:</strong> সিগন্যাল কম গেইট অতিক্রম করায় প্রক্রিয়াকরণের গতি বাড়ে (Delay কমে)।</span>
          </li>
        </ul>
      </div>
      
      <div class="md:w-1/3 bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
        <div class="text-4xl mb-2">📉</div>
        <div class="font-bold text-emerald-800 dark:text-emerald-300">মূল লক্ষ্য</div>
        <div class="text-sm text-slate-600 dark:text-slate-400 mt-2">
          জটিল সমীকরণ ➡️ উপপাদ্য প্রয়োগ ➡️ সরল সমীকরণ ➡️ কম গেইটের সার্কিট
        </div>
      </div>
    </div>
  </div>

  <!-- Examples of Simplification -->
  <div class="space-y-6">
    <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-200 pl-2">বুলিয়ান সরলীকরণের উদাহরণ</h3>
    
    <!-- Example 1 -->
    <div class="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 p-6 rounded-3xl shadow-sm border border-sky-200 dark:border-sky-800/50">
      <div class="flex justify-between items-start mb-4">
        <h4 class="font-bold text-lg text-sky-800 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/50 px-3 py-1 rounded-lg inline-block">উদাহরণ ১</h4>
      </div>
      <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl font-mono text-slate-800 dark:text-slate-300 overflow-x-auto shadow-inner border border-slate-100 dark:border-slate-800">
        <div class="text-sky-600 dark:text-sky-400 mb-2 font-bold text-lg">Y = A(A' + B)</div>
        <table class="w-full text-left">
          <tbody>
            <tr>
              <td class="py-1 pr-4">= A.A' + A.B</td>
              <td class="py-1 text-slate-500 text-sm">; গুণ করে (Distributive Law)</td>
            </tr>
            <tr>
              <td class="py-1 pr-4">= 0 + AB</td>
              <td class="py-1 text-slate-500 text-sm">; যেহেতু A.A' = 0 (Complement Law)</td>
            </tr>
            <tr class="font-bold text-sky-700 dark:text-sky-400 border-t border-slate-200 dark:border-slate-800 mt-2">
              <td class="pt-2 pr-4">= AB</td>
              <td class="pt-2 text-slate-500 text-sm font-normal">; (Identity Law) [উত্তর]</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Example 2 -->
    <div class="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 p-6 rounded-3xl shadow-sm border border-indigo-200 dark:border-indigo-800/50">
      <div class="flex justify-between items-start mb-4">
        <h4 class="font-bold text-lg text-indigo-800 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-lg inline-block">উদাহরণ ২</h4>
      </div>
      <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl font-mono text-slate-800 dark:text-slate-300 overflow-x-auto shadow-inner border border-slate-100 dark:border-slate-800">
        <div class="text-indigo-600 dark:text-indigo-400 mb-2 font-bold text-lg">Y = (A + B)(A + C)</div>
        <table class="w-full text-left">
          <tbody>
            <tr>
              <td class="py-1 pr-4">= A.A + A.C + A.B + B.C</td>
              <td class="py-1 text-slate-500 text-sm">; গুণ করে</td>
            </tr>
            <tr>
              <td class="py-1 pr-4">= A + AC + AB + BC</td>
              <td class="py-1 text-slate-500 text-sm">; যেহেতু A.A = A</td>
            </tr>
            <tr>
              <td class="py-1 pr-4">= A(1 + C) + AB + BC</td>
              <td class="py-1 text-slate-500 text-sm">; প্রথম দুটি পদ থেকে A কমন নিয়ে</td>
            </tr>
            <tr>
              <td class="py-1 pr-4">= A(1) + AB + BC</td>
              <td class="py-1 text-slate-500 text-sm">; যেহেতু 1 + C = 1 (Domination Law)</td>
            </tr>
            <tr>
              <td class="py-1 pr-4">= A + AB + BC</td>
              <td class="py-1 text-slate-500 text-sm">;</td>
            </tr>
            <tr>
              <td class="py-1 pr-4">= A(1 + B) + BC</td>
              <td class="py-1 text-slate-500 text-sm">; আবার A কমন নিয়ে</td>
            </tr>
            <tr>
              <td class="py-1 pr-4">= A(1) + BC</td>
              <td class="py-1 text-slate-500 text-sm">; যেহেতু 1 + B = 1</td>
            </tr>
            <tr class="font-bold text-indigo-700 dark:text-indigo-400 border-t border-slate-200 dark:border-slate-800 mt-2">
              <td class="pt-2 pr-4">= A + BC</td>
              <td class="pt-2 text-slate-500 text-sm font-normal">; [উত্তর] (এটি বিভাজন উপপাদ্যও বটে)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Example 3 (De Morgan's) -->
    <div class="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-6 rounded-3xl shadow-sm border border-teal-200 dark:border-teal-800/50">
      <div class="flex justify-between items-start mb-4">
        <h4 class="font-bold text-lg text-teal-800 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/50 px-3 py-1 rounded-lg inline-block">উদাহরণ ৩ (ডি-মরগ্যান)</h4>
      </div>
      <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl font-mono text-slate-800 dark:text-slate-300 overflow-x-auto shadow-inner border border-slate-100 dark:border-slate-800">
        <div class="text-teal-600 dark:text-teal-400 mb-2 font-bold text-lg">Y = (A + B')' . (A' + B)'</div>
        <table class="w-full text-left">
          <tbody>
            <tr>
              <td class="py-1 pr-4">= (A' . B'') . (A'' . B')</td>
              <td class="py-1 text-slate-500 text-sm">; ডি-মরগ্যানের ১ম উপপাদ্য প্রয়োগ</td>
            </tr>
            <tr>
              <td class="py-1 pr-4">= (A' . B) . (A . B')</td>
              <td class="py-1 text-slate-500 text-sm">; দ্বৈত পূরক (X'' = X)</td>
            </tr>
            <tr>
              <td class="py-1 pr-4">= A' . B . A . B'</td>
              <td class="py-1 text-slate-500 text-sm">;</td>
            </tr>
            <tr>
              <td class="py-1 pr-4">= A.A' . B.B'</td>
              <td class="py-1 text-slate-500 text-sm">; সাজিয়ে লিখে</td>
            </tr>
            <tr>
              <td class="py-1 pr-4">= 0 . 0</td>
              <td class="py-1 text-slate-500 text-sm">; যেহেতু X.X' = 0</td>
            </tr>
            <tr class="font-bold text-teal-700 dark:text-teal-400 border-t border-slate-200 dark:border-slate-800 mt-2">
              <td class="pt-2 pr-4">= 0</td>
              <td class="pt-2 text-slate-500 text-sm font-normal">; [উত্তর]</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Implementation Tips -->
  <div class="bg-slate-50 dark:bg-slate-800/80 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
    <h3 class="text-xl font-bold text-slate-800 dark:text-slate-300 mb-4 flex items-center gap-2">
      <span class="text-2xl">🛠️</span> সার্কিট বাস্তবায়নের নিয়ম
    </h3>
    <p class="text-slate-700 dark:text-slate-400 mb-4">যেকোনো বুলিয়ান সমীকরণ থেকে লজিক সার্কিট আঁকার জন্য নিচের ধাপগুলো অনুসরণ করতে হয়:</p>
    
    <ol class="list-decimal ml-5 text-slate-700 dark:text-slate-300 space-y-3 font-medium">
      <li>সমীকরণটি যদি জটিল হয়, তবে প্রথমে বুলিয়ান উপপাদ্য ব্যবহার করে তা <strong>সরলীকরণ</strong> করে নিতে হবে।</li>
      <li>সমীকরণে কয়টি ভিন্ন ভিন্ন <strong>চলক</strong> (Variable) আছে তা নির্ধারণ করে, প্রত্যেকটির জন্য একটি করে সোজা দাগ (ইনপুট লাইন) টানতে হবে।</li>
      <li>চলকগুলোর যদি <strong>পূরক (Complement)</strong> বা প্রাইম (') থাকে, তবে সেই চলকের লাইন থেকে NOT গেইট যুক্ত করে পূরক লাইন তৈরি করতে হবে।</li>
      <li>বুলিয়ান গুণ থাকলে <strong>AND গেইট</strong>, যোগ থাকলে <strong>OR গেইট</strong> এবং পূরক থাকলে <strong>NOT গেইট</strong> ব্যবহার করে ধাপে ধাপে আউটপুট বের করতে হবে।</li>
      <li>ব্র্যাকেট (Bracket) এর ভেতরের কাজ আগে করতে হবে।</li>
    </ol>
  </div>

</div>
`;
