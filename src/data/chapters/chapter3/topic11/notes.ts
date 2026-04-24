export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-violet-900 via-fuchsia-900 to-violet-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-fuchsia-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">বিশেষ লজিক গেইট 🎯</h2>
      <p class="text-fuchsia-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        ডিজিটাল ইলেকট্রনিক্সে গাণিতিক অপারেশন (যেমন- যোগ, বিয়োগ) এবং প্যারিটি চেক করার জন্য বিশেষ ধরনের গেইট ব্যবহার করা হয়। এগুলোকে এক্সক্লুসিভ গেইট বা বিশেষ গেইট বলা হয়।
      </p>
    </div>
  </div>

  <!-- Intro -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-violet-200/50 dark:border-violet-700/50">
    <div class="flex items-center gap-4 mb-4">
      <div class="p-3 bg-violet-100 dark:bg-violet-900/50 rounded-2xl">
        <span class="text-2xl">🧩</span>
      </div>
      <h3 class="text-2xl font-bold text-violet-800 dark:text-violet-300">বিশেষ গেইট পরিচিতি</h3>
    </div>
    <p class="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
      মৌলিক গেইট (AND, OR, NOT) এর সমন্বয়ে বিভিন্ন জটিল সার্কিট তৈরি করা যায়। তবে কিছু বিশেষ সার্কিটের (যেমন: অ্যাডার, সাবট্রাক্টর) ব্যবহার এত বেশি যে, সেগুলোকে আলাদা একটি গেইট হিসেবে বিবেচনা করা হয়। এগুলোই হলো বিশেষ গেইট।
    </p>
    <div class="flex flex-wrap gap-4 mt-6">
      <div class="px-6 py-3 bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-800 rounded-xl font-bold text-fuchsia-700 dark:text-fuchsia-300 flex items-center gap-2">
        <span class="text-xl">1️⃣</span> XOR (Exclusive-OR) গেইট
      </div>
      <div class="px-6 py-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2">
        <span class="text-xl">2️⃣</span> XNOR (Exclusive-NOR) গেইট
      </div>
    </div>
  </div>

  <!-- XOR Gate -->
  <div class="bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 p-6 md:p-8 rounded-3xl shadow-sm border border-fuchsia-200 dark:border-fuchsia-800/50">
    <h3 class="text-2xl font-bold text-fuchsia-800 dark:text-fuchsia-400 mb-6 flex items-center gap-3 border-b border-fuchsia-200 dark:border-fuchsia-800/50 pb-4">
      <span class="p-2 bg-fuchsia-200 dark:bg-fuchsia-800/50 rounded-xl">✖️</span> XOR (Exclusive-OR) গেইট
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          XOR গেইটের ক্ষেত্রে ইনপুটগুলো অসমান বা বিজোড় সংখ্যক 1 হলে আউটপুট 1 হয় এবং জোড় সংখ্যক 1 বা সবগুলো 0 হলে আউটপুট 0 হয়।
        </p>
        <div class="bg-white/60 dark:bg-slate-800/60 p-5 rounded-xl border border-fuchsia-100 dark:border-fuchsia-800/50 mb-4">
          <p class="text-sm text-fuchsia-600 dark:text-fuchsia-400 font-bold mb-1">লজিক ফাংশন:</p>
          <div class="font-mono text-xl font-bold text-fuchsia-800 dark:text-fuchsia-300">
            Y = A ⊕ B <br/>
            <span class="text-base text-slate-500 dark:text-slate-400 mt-2 block">= A'B + AB'</span>
          </div>
        </div>
        <div class="bg-fuchsia-100/50 dark:bg-fuchsia-900/30 p-4 rounded-xl border-l-4 border-fuchsia-500 text-sm text-slate-700 dark:text-slate-300">
          <strong>মনে রাখার উপায়:</strong> ইনপুট ভিন্ন হলে আউটপুট 1, ইনপুট একই হলে আউটপুট 0।
        </div>
      </div>

      <div>
        <table class="w-full text-sm text-center text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-fuchsia-100 dark:border-fuchsia-800/50">
          <thead class="bg-fuchsia-100 dark:bg-fuchsia-900/50 text-fuchsia-900 dark:text-fuchsia-200">
            <tr>
              <th class="px-4 py-3 border-r border-fuchsia-200 dark:border-fuchsia-800">A</th>
              <th class="px-4 py-3 border-r border-fuchsia-200 dark:border-fuchsia-800">B</th>
              <th class="px-4 py-3 bg-fuchsia-200/50 dark:bg-fuchsia-800/50">Y = A ⊕ B</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-fuchsia-50 dark:border-fuchsia-800/30">
              <td class="px-4 py-3 border-r border-fuchsia-100 dark:border-fuchsia-800/50">0</td>
              <td class="px-4 py-3 border-r border-fuchsia-100 dark:border-fuchsia-800/50">0</td>
              <td class="px-4 py-3 font-bold bg-fuchsia-50/50 dark:bg-fuchsia-900/20">0</td>
            </tr>
            <tr class="border-b border-fuchsia-50 dark:border-fuchsia-800/30">
              <td class="px-4 py-3 border-r border-fuchsia-100 dark:border-fuchsia-800/50">0</td>
              <td class="px-4 py-3 border-r border-fuchsia-100 dark:border-fuchsia-800/50">1</td>
              <td class="px-4 py-3 font-bold text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50/50 dark:bg-fuchsia-900/20">1</td>
            </tr>
            <tr class="border-b border-fuchsia-50 dark:border-fuchsia-800/30">
              <td class="px-4 py-3 border-r border-fuchsia-100 dark:border-fuchsia-800/50">1</td>
              <td class="px-4 py-3 border-r border-fuchsia-100 dark:border-fuchsia-800/50">0</td>
              <td class="px-4 py-3 font-bold text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50/50 dark:bg-fuchsia-900/20">1</td>
            </tr>
            <tr>
              <td class="px-4 py-3 border-r border-fuchsia-100 dark:border-fuchsia-800/50">1</td>
              <td class="px-4 py-3 border-r border-fuchsia-100 dark:border-fuchsia-800/50">1</td>
              <td class="px-4 py-3 font-bold bg-fuchsia-50/50 dark:bg-fuchsia-900/20">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- XNOR Gate -->
  <div class="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 md:p-8 rounded-3xl shadow-sm border border-purple-200 dark:border-purple-800/50">
    <h3 class="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-6 flex items-center gap-3 border-b border-purple-200 dark:border-purple-800/50 pb-4">
      <span class="p-2 bg-purple-200 dark:bg-purple-800/50 rounded-xl">⭕</span> XNOR (Exclusive-NOR) গেইট
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          XOR গেইটের আউটপুটকে NOT গেইটের মধ্য দিয়ে চালনা করলে XNOR গেইট পাওয়া যায়। এর ক্ষেত্রে ইনপুটগুলো সমান হলে (অর্থাৎ জোড় সংখ্যক 1 বা সবগুলো 0) আউটপুট 1 হয়।
        </p>
        <div class="bg-white/60 dark:bg-slate-800/60 p-5 rounded-xl border border-purple-100 dark:border-purple-800/50 mb-4">
          <p class="text-sm text-purple-600 dark:text-purple-400 font-bold mb-1">লজিক ফাংশন:</p>
          <div class="font-mono text-xl font-bold text-purple-800 dark:text-purple-300">
            Y = (A ⊕ B)' <br/>
            <span class="text-base text-slate-500 dark:text-slate-400 mt-2 block">= AB + A'B'</span>
          </div>
        </div>
        <div class="bg-purple-100/50 dark:bg-purple-900/30 p-4 rounded-xl border-l-4 border-purple-500 text-sm text-slate-700 dark:text-slate-300">
          <strong>মনে রাখার উপায়:</strong> ইনপুট একই হলে আউটপুট 1, ইনপুট ভিন্ন হলে আউটপুট 0। এটি XOR এর ঠিক উল্টো।
        </div>
      </div>

      <div>
        <table class="w-full text-sm text-center text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-purple-100 dark:border-purple-800/50">
          <thead class="bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-200">
            <tr>
              <th class="px-4 py-3 border-r border-purple-200 dark:border-purple-800">A</th>
              <th class="px-4 py-3 border-r border-purple-200 dark:border-purple-800">B</th>
              <th class="px-4 py-3 bg-purple-200/50 dark:bg-purple-800/50">Y = (A ⊕ B)'</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-purple-50 dark:border-purple-800/30">
              <td class="px-4 py-3 border-r border-purple-100 dark:border-purple-800/50">0</td>
              <td class="px-4 py-3 border-r border-purple-100 dark:border-purple-800/50">0</td>
              <td class="px-4 py-3 font-bold text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-900/20">1</td>
            </tr>
            <tr class="border-b border-purple-50 dark:border-purple-800/30">
              <td class="px-4 py-3 border-r border-purple-100 dark:border-purple-800/50">0</td>
              <td class="px-4 py-3 border-r border-purple-100 dark:border-purple-800/50">1</td>
              <td class="px-4 py-3 font-bold bg-purple-50/50 dark:bg-purple-900/20">0</td>
            </tr>
            <tr class="border-b border-purple-50 dark:border-purple-800/30">
              <td class="px-4 py-3 border-r border-purple-100 dark:border-purple-800/50">1</td>
              <td class="px-4 py-3 border-r border-purple-100 dark:border-purple-800/50">0</td>
              <td class="px-4 py-3 font-bold bg-purple-50/50 dark:bg-purple-900/20">0</td>
            </tr>
            <tr>
              <td class="px-4 py-3 border-r border-purple-100 dark:border-purple-800/50">1</td>
              <td class="px-4 py-3 border-r border-purple-100 dark:border-purple-800/50">1</td>
              <td class="px-4 py-3 font-bold text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-900/20">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Implementation with Basic Gates -->
  <div class="bg-slate-50 dark:bg-slate-800/80 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
    <h3 class="text-xl font-bold text-slate-800 dark:text-slate-300 mb-6 text-center">মৌলিক গেইট দিয়ে বিশেষ গেইট বাস্তবায়ন</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-lg text-slate-700 dark:text-slate-400 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">XOR বাস্তবায়ন (Y = A'B + AB')</h4>
        <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc ml-4">
          <li>প্রথমে A ও B কে NOT গেইট দিয়ে A' ও B' বের করতে হবে।</li>
          <li>এরপর দুটি AND গেইট ব্যবহার করে A'B এবং AB' বের করতে হবে।</li>
          <li>অবশেষে একটি OR গেইট দিয়ে দুটি গুণফল যোগ করতে হবে।</li>
          <li><span class="font-bold text-fuchsia-500">মোট গেইট:</span> 2টি NOT, 2টি AND, 1টি OR।</li>
        </ul>
      </div>
      
      <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-lg text-slate-700 dark:text-slate-400 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">XNOR বাস্তবায়ন (Y = AB + A'B')</h4>
        <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc ml-4">
          <li>প্রথমে A ও B কে NOT গেইট দিয়ে A' ও B' বের করতে হবে।</li>
          <li>এরপর দুটি AND গেইট ব্যবহার করে AB এবং A'B' বের করতে হবে।</li>
          <li>অবশেষে একটি OR গেইট দিয়ে দুটি গুণফল যোগ করতে হবে।</li>
          <li><span class="font-bold text-purple-500">মোট গেইট:</span> 2টি NOT, 2টি AND, 1টি OR।</li>
        </ul>
      </div>
    </div>
  </div>

</div>
`;
