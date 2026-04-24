export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-blue-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">সার্বজনীন গেইট 🌐</h2>
      <p class="text-blue-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        যে গেইটগুলোর মাধ্যমে ৩টি মৌলিক গেইট (AND, OR, NOT) সহ অন্যান্য সকল ডিজিটাল সার্কিট বাস্তবায়ন করা যায়, তাদেরকে সার্বজনীন গেইট (Universal Gates) বলে।
      </p>
    </div>
  </div>

  <!-- Introduction to Universal Gates -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 class="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">সার্বজনীনতা কী?</h3>
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          ডিজিটাল ইলেকট্রনিক্সে সার্বজনীনতা বলতে বোঝায় এমন একটি গেইটের বৈশিষ্ট্য, যা দিয়ে অন্য যেকোনো গেইট তৈরি করা সম্ভব। অর্থাৎ, শুধু একটি মাত্র ধরনের গেইট ব্যবহার করেই সম্পূর্ণ একটি ডিজিটাল সিস্টেম তৈরি করা যায়।
        </p>
        <div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
          <p class="font-bold text-blue-800 dark:text-blue-300 mb-2">সার্বজনীন গেইট প্রধানত দুটি:</p>
          <ul class="list-disc ml-5 text-slate-700 dark:text-slate-300 space-y-1">
            <li><strong>NAND গেইট</strong> (AND + NOT)</li>
            <li><strong>NOR গেইট</strong> (OR + NOT)</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center h-full">
        <div class="flex gap-4 items-center mb-6">
          <div class="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-lg font-bold">NAND</div>
          <span class="text-slate-400">বা</span>
          <div class="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-lg font-bold">NOR</div>
        </div>
        <div class="text-2xl text-slate-300">⬇️</div>
        <div class="flex gap-4 mt-6">
          <div class="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-300 dark:border-slate-600 shadow-sm font-bold text-sm">AND</div>
          <div class="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-300 dark:border-slate-600 shadow-sm font-bold text-sm">OR</div>
          <div class="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-300 dark:border-slate-600 shadow-sm font-bold text-sm">NOT</div>
        </div>
      </div>
    </div>
  </div>

  <!-- NAND Gate -->
  <div class="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 md:p-8 rounded-3xl shadow-sm border border-teal-200 dark:border-teal-800/50">
    <h3 class="text-2xl font-bold text-teal-800 dark:text-teal-400 mb-6 flex items-center gap-3 border-b border-teal-200 dark:border-teal-800/50 pb-4">
      <span class="p-2 bg-teal-200 dark:bg-teal-800/50 rounded-xl">🔹</span> NAND গেইট (NOT + AND)
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          AND গেইটের আউটপুটকে একটি NOT গেইটের মধ্য দিয়ে চালনা করলে NAND গেইট পাওয়া যায়। এটি AND গেইটের ঠিক বিপরীত কাজ করে।
        </p>
        <div class="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-teal-100 dark:border-teal-800/50 mb-4 text-center font-mono text-lg font-bold text-teal-700 dark:text-teal-300">
          লজিক ফাংশন: Y = (A . B)'
        </div>
        <ul class="list-disc ml-5 text-slate-700 dark:text-slate-300 space-y-1">
          <li>যেকোনো একটি ইনপুট 0 হলে আউটপুট 1 হয়।</li>
          <li>সবগুলো ইনপুট 1 হলেই কেবল আউটপুট 0 হয়।</li>
        </ul>
      </div>

      <div>
        <table class="w-full text-sm text-center text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-teal-100 dark:border-teal-800/50">
          <thead class="bg-teal-100 dark:bg-teal-900/50 text-teal-900 dark:text-teal-200">
            <tr>
              <th class="px-4 py-2 border-r border-teal-200 dark:border-teal-800">A</th>
              <th class="px-4 py-2 border-r border-teal-200 dark:border-teal-800">B</th>
              <th class="px-4 py-2 text-slate-500">A . B</th>
              <th class="px-4 py-2 bg-teal-200/50 dark:bg-teal-800/50">Y = (A.B)'</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-teal-50 dark:border-teal-800/30">
              <td class="px-4 py-2 border-r border-teal-100 dark:border-teal-800/50">0</td>
              <td class="px-4 py-2 border-r border-teal-100 dark:border-teal-800/50">0</td>
              <td class="px-4 py-2 text-slate-400 border-r border-teal-100 dark:border-teal-800/50">0</td>
              <td class="px-4 py-2 font-bold text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-900/20">1</td>
            </tr>
            <tr class="border-b border-teal-50 dark:border-teal-800/30">
              <td class="px-4 py-2 border-r border-teal-100 dark:border-teal-800/50">0</td>
              <td class="px-4 py-2 border-r border-teal-100 dark:border-teal-800/50">1</td>
              <td class="px-4 py-2 text-slate-400 border-r border-teal-100 dark:border-teal-800/50">0</td>
              <td class="px-4 py-2 font-bold text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-900/20">1</td>
            </tr>
            <tr class="border-b border-teal-50 dark:border-teal-800/30">
              <td class="px-4 py-2 border-r border-teal-100 dark:border-teal-800/50">1</td>
              <td class="px-4 py-2 border-r border-teal-100 dark:border-teal-800/50">0</td>
              <td class="px-4 py-2 text-slate-400 border-r border-teal-100 dark:border-teal-800/50">0</td>
              <td class="px-4 py-2 font-bold text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-900/20">1</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-r border-teal-100 dark:border-teal-800/50">1</td>
              <td class="px-4 py-2 border-r border-teal-100 dark:border-teal-800/50">1</td>
              <td class="px-4 py-2 text-slate-400 border-r border-teal-100 dark:border-teal-800/50">1</td>
              <td class="px-4 py-2 font-bold bg-teal-50/50 dark:bg-teal-900/20">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- NOR Gate -->
  <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 md:p-8 rounded-3xl shadow-sm border border-purple-200 dark:border-purple-800/50">
    <h3 class="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-6 flex items-center gap-3 border-b border-purple-200 dark:border-purple-800/50 pb-4">
      <span class="p-2 bg-purple-200 dark:bg-purple-800/50 rounded-xl">🔸</span> NOR গেইট (NOT + OR)
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          OR গেইটের আউটপুটকে একটি NOT গেইটের মধ্য দিয়ে চালনা করলে NOR গেইট পাওয়া যায়। এটি OR গেইটের ঠিক বিপরীত কাজ করে।
        </p>
        <div class="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-purple-100 dark:border-purple-800/50 mb-4 text-center font-mono text-lg font-bold text-purple-700 dark:text-purple-300">
          লজিক ফাংশন: Y = (A + B)'
        </div>
        <ul class="list-disc ml-5 text-slate-700 dark:text-slate-300 space-y-1">
          <li>যেকোনো একটি ইনপুট 1 হলে আউটপুট 0 হয়।</li>
          <li>সবগুলো ইনপুট 0 হলেই কেবল আউটপুট 1 হয়।</li>
        </ul>
      </div>

      <div>
        <table class="w-full text-sm text-center text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-purple-100 dark:border-purple-800/50">
          <thead class="bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-200">
            <tr>
              <th class="px-4 py-2 border-r border-purple-200 dark:border-purple-800">A</th>
              <th class="px-4 py-2 border-r border-purple-200 dark:border-purple-800">B</th>
              <th class="px-4 py-2 text-slate-500">A + B</th>
              <th class="px-4 py-2 bg-purple-200/50 dark:bg-purple-800/50">Y = (A+B)'</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-purple-50 dark:border-purple-800/30">
              <td class="px-4 py-2 border-r border-purple-100 dark:border-purple-800/50">0</td>
              <td class="px-4 py-2 border-r border-purple-100 dark:border-purple-800/50">0</td>
              <td class="px-4 py-2 text-slate-400 border-r border-purple-100 dark:border-purple-800/50">0</td>
              <td class="px-4 py-2 font-bold text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-900/20">1</td>
            </tr>
            <tr class="border-b border-purple-50 dark:border-purple-800/30">
              <td class="px-4 py-2 border-r border-purple-100 dark:border-purple-800/50">0</td>
              <td class="px-4 py-2 border-r border-purple-100 dark:border-purple-800/50">1</td>
              <td class="px-4 py-2 text-slate-400 border-r border-purple-100 dark:border-purple-800/50">1</td>
              <td class="px-4 py-2 font-bold bg-purple-50/50 dark:bg-purple-900/20">0</td>
            </tr>
            <tr class="border-b border-purple-50 dark:border-purple-800/30">
              <td class="px-4 py-2 border-r border-purple-100 dark:border-purple-800/50">1</td>
              <td class="px-4 py-2 border-r border-purple-100 dark:border-purple-800/50">0</td>
              <td class="px-4 py-2 text-slate-400 border-r border-purple-100 dark:border-purple-800/50">1</td>
              <td class="px-4 py-2 font-bold bg-purple-50/50 dark:bg-purple-900/20">0</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-r border-purple-100 dark:border-purple-800/50">1</td>
              <td class="px-4 py-2 border-r border-purple-100 dark:border-purple-800/50">1</td>
              <td class="px-4 py-2 text-slate-400 border-r border-purple-100 dark:border-purple-800/50">1</td>
              <td class="px-4 py-2 font-bold bg-purple-50/50 dark:bg-purple-900/20">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Universality Proof Examples -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
      সার্বজনীনতার প্রমাণ (সংক্ষিপ্ত)
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- NAND -->
      <div class="space-y-4">
        <h4 class="font-bold text-lg text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-4 py-2 rounded-lg">NAND গেইট দিয়ে মৌলিক গেইট বাস্তবায়ন</h4>
        <div class="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div>
            <strong class="text-slate-800 dark:text-slate-200">১. NOT গেইট:</strong> NAND গেইটের দুটি ইনপুট একত্রে যুক্ত করে একটি ইনপুট (A) দিলে আউটপুট হবে (A.A)' = A'
          </div>
          <hr class="border-slate-200 dark:border-slate-700"/>
          <div>
            <strong class="text-slate-800 dark:text-slate-200">২. AND গেইট:</strong> একটি NAND গেইটের আউটপুটকে আরেকটি NOT হিসেবে ব্যবহৃত NAND গেইটের মধ্য দিয়ে চালনা করলে AND গেইট পাওয়া যায়। (A.B)'' = A.B
          </div>
          <hr class="border-slate-200 dark:border-slate-700"/>
          <div>
            <strong class="text-slate-800 dark:text-slate-200">৩. OR গেইট:</strong> A ও B কে আলাদা আলাদা NOT (NAND দিয়ে তৈরি) এর মধ্য দিয়ে চালিয়ে তাদের আউটপুটকে আরেকটি NAND গেইটে দিলে OR গেইট পাওয়া যায়। (A'.B')' = A'' + B'' = A + B
          </div>
        </div>
      </div>

      <!-- NOR -->
      <div class="space-y-4">
        <h4 class="font-bold text-lg text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg">NOR গেইট দিয়ে মৌলিক গেইট বাস্তবায়ন</h4>
        <div class="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div>
            <strong class="text-slate-800 dark:text-slate-200">১. NOT গেইট:</strong> NOR গেইটের দুটি ইনপুট একত্রে যুক্ত করে একটি ইনপুট (A) দিলে আউটপুট হবে (A+A)' = A'
          </div>
          <hr class="border-slate-200 dark:border-slate-700"/>
          <div>
            <strong class="text-slate-800 dark:text-slate-200">২. OR গেইট:</strong> একটি NOR গেইটের আউটপুটকে আরেকটি NOT হিসেবে ব্যবহৃত NOR গেইটের মধ্য দিয়ে চালনা করলে OR গেইট পাওয়া যায়। (A+B)'' = A+B
          </div>
          <hr class="border-slate-200 dark:border-slate-700"/>
          <div>
            <strong class="text-slate-800 dark:text-slate-200">৩. AND গেইট:</strong> A ও B কে আলাদা আলাদা NOT (NOR দিয়ে তৈরি) এর মধ্য দিয়ে চালিয়ে তাদের আউটপুটকে আরেকটি NOR গেইটে দিলে AND গেইট পাওয়া যায়। (A'+B')' = A''.B'' = A.B
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
`;
