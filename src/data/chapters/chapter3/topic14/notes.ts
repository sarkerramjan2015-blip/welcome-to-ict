export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-rose-900 via-pink-900 to-rose-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-pink-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">ডিকোডার (Decoder) 🖥️</h2>
      <p class="text-pink-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        ডিকোডার হলো এমন একটি সমবায় লজিক সার্কিট, যা কম্পিউটারের বোধগম্য ভাষাকে (মেশিন কোড) মানুষের বোধগম্য ভাষায় রূপান্তর করে। এটি মূলত এনকোডারের ঠিক বিপরীত কাজ করে।
      </p>
    </div>
  </div>

  <!-- What is Decoder -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-rose-200/50 dark:border-rose-700/50">
    <div class="flex flex-col md:flex-row gap-8 items-center">
      <div class="flex-1">
        <h3 class="text-2xl font-bold text-rose-800 dark:text-rose-400 mb-4 border-b border-rose-100 dark:border-rose-900/50 pb-2">
          ডিকোডারের বৈশিষ্ট্য
        </h3>
        <ul class="space-y-3 text-slate-700 dark:text-slate-300 ml-4 list-disc">
          <li>এটি বাইনারি কোডকে বর্ণ, অঙ্ক বা চিহ্নে রূপান্তর করে।</li>
          <li>ডিকোডারে <strong>n টি ইনপুট</strong> থাকলে আউটপুট হবে সর্বোচ্চ <strong>2<sup>n</sup> টি</strong>।</li>
          <li>যেকোনো মুহূর্তে শুধুমাত্র একটি আউটপুট লাইন 1 (High) হতে পারে এবং বাকি সব আউটপুট 0 (Low) থাকে।</li>
          <li>মনিটর, প্রিন্টার ইত্যাদি আউটপুট ডিভাইসে ডিকোডার যুক্ত থাকে।</li>
        </ul>
        <div class="mt-6 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800 text-sm text-slate-700 dark:text-slate-300">
          <strong>উদাহরণ:</strong> একটি ৩-টু-৮ (3 to 8) ডিকোডারে ৩টি ইনপুট এবং ৮টি (2<sup>3</sup>) আউটপুট থাকে।
        </div>
      </div>
      
      <div class="md:w-1/3 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
        <div class="w-full flex justify-between items-center relative">
          <div class="flex flex-col gap-4">
            <span class="w-8 h-1 bg-rose-500 rounded-full"></span>
            <span class="w-8 h-1 bg-rose-500 rounded-full"></span>
          </div>
          <div class="px-6 py-8 bg-rose-100 dark:bg-rose-900/50 rounded-xl border-2 border-rose-500 font-bold text-rose-800 dark:text-rose-300 text-center mx-2 z-10 shadow-sm">
            Decoder <br/> <span class="text-xs font-normal">n to 2<sup>n</sup></span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="w-8 h-1 bg-pink-500 rounded-full"></span>
            <span class="w-8 h-1 bg-pink-500 rounded-full"></span>
            <span class="w-8 h-1 bg-pink-500 rounded-full"></span>
            <span class="w-8 h-1 bg-pink-500 rounded-full"></span>
          </div>
        </div>
        <div class="w-full flex justify-between text-xs mt-4 font-bold text-slate-500">
          <span>ইনপুট (n)</span>
          <span>আউটপুট (2<sup>n</sup>)</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 3 to 8 Decoder Details -->
  <div class="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-6 md:p-8 rounded-3xl shadow-sm border border-pink-200 dark:border-pink-800/50">
    <h3 class="text-2xl font-bold text-pink-800 dark:text-pink-400 mb-6 flex items-center gap-3 border-b border-pink-200 dark:border-pink-800/50 pb-4">
      <span class="p-2 bg-pink-200 dark:bg-pink-800/50 rounded-xl">🔢</span> ৩-টু-৮ (বাইনারি টু অক্টাল) ডিকোডার
    </h3>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          এই ডিকোডারে ৩টি (x, y, z) ইনপুট লাইন এবং ৮টি (D0 থেকে D7) আউটপুট লাইন থাকে। এটি ৩ বিটের বাইনারি কোড গ্রহণ করে সমতুল্য অক্টাল মানের লাইনটিকে সক্রিয় (1) করে।
        </p>
        
        <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-pink-100 dark:border-pink-800 shadow-inner mb-4 overflow-x-auto">
          <h4 class="font-bold text-center mb-3 text-pink-700 dark:text-pink-300">সত্যক সারণি (Truth Table)</h4>
          <table class="w-full text-xs md:text-sm text-center text-slate-700 dark:text-slate-300">
            <thead class="bg-pink-100 dark:bg-pink-900/50 text-pink-900 dark:text-pink-200">
              <tr>
                <th colspan="3" class="px-2 py-2 border-b border-r border-pink-200 dark:border-pink-800">Inputs (3)</th>
                <th colspan="8" class="px-2 py-2 border-b border-pink-200 dark:border-pink-800">Outputs (8)</th>
              </tr>
              <tr>
                <th class="px-1 py-1 border-r border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400">x</th>
                <th class="px-1 py-1 border-r border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400">y</th>
                <th class="px-1 py-1 border-r border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400">z</th>
                <th class="px-1 py-1 border-r border-pink-200 dark:border-pink-800">D0</th>
                <th class="px-1 py-1 border-r border-pink-200 dark:border-pink-800">D1</th>
                <th class="px-1 py-1 border-r border-pink-200 dark:border-pink-800">D2</th>
                <th class="px-1 py-1 border-r border-pink-200 dark:border-pink-800">D3</th>
                <th class="px-1 py-1 border-r border-pink-200 dark:border-pink-800">D4</th>
                <th class="px-1 py-1 border-r border-pink-200 dark:border-pink-800">D5</th>
                <th class="px-1 py-1 border-r border-pink-200 dark:border-pink-800">D6</th>
                <th class="px-1 py-1">D7</th>
              </tr>
            </thead>
            <tbody>
              <!-- 000 -->
              <tr class="border-b border-pink-50 dark:border-pink-800/30">
                <td class="font-bold">0</td><td class="font-bold">0</td><td class="font-bold border-r border-pink-200 dark:border-pink-800">0</td>
                <td class="font-bold text-pink-600 dark:text-pink-400 bg-pink-50/50 dark:bg-pink-900/20">1</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>
              <!-- 001 -->
              <tr class="border-b border-pink-50 dark:border-pink-800/30">
                <td class="font-bold">0</td><td class="font-bold">0</td><td class="font-bold text-pink-600 dark:text-pink-400 border-r border-pink-200 dark:border-pink-800">1</td>
                <td>0</td><td class="font-bold text-pink-600 dark:text-pink-400 bg-pink-50/50 dark:bg-pink-900/20">1</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>
              <!-- 010 -->
              <tr class="border-b border-pink-50 dark:border-pink-800/30">
                <td class="font-bold">0</td><td class="font-bold text-pink-600 dark:text-pink-400">1</td><td class="font-bold border-r border-pink-200 dark:border-pink-800">0</td>
                <td>0</td><td>0</td><td class="font-bold text-pink-600 dark:text-pink-400 bg-pink-50/50 dark:bg-pink-900/20">1</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>
              <!-- 011 -->
              <tr class="border-b border-pink-50 dark:border-pink-800/30">
                <td class="font-bold">0</td><td class="font-bold text-pink-600 dark:text-pink-400">1</td><td class="font-bold text-pink-600 dark:text-pink-400 border-r border-pink-200 dark:border-pink-800">1</td>
                <td>0</td><td>0</td><td>0</td><td class="font-bold text-pink-600 dark:text-pink-400 bg-pink-50/50 dark:bg-pink-900/20">1</td>
                <td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>
              <!-- 100 -->
              <tr class="border-b border-pink-50 dark:border-pink-800/30">
                <td class="font-bold text-pink-600 dark:text-pink-400">1</td><td class="font-bold">0</td><td class="font-bold border-r border-pink-200 dark:border-pink-800">0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td class="font-bold text-pink-600 dark:text-pink-400 bg-pink-50/50 dark:bg-pink-900/20">1</td>
                <td>0</td><td>0</td><td>0</td>
              </tr>
              <!-- 101 -->
              <tr class="border-b border-pink-50 dark:border-pink-800/30">
                <td class="font-bold text-pink-600 dark:text-pink-400">1</td><td class="font-bold">0</td><td class="font-bold text-pink-600 dark:text-pink-400 border-r border-pink-200 dark:border-pink-800">1</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="font-bold text-pink-600 dark:text-pink-400 bg-pink-50/50 dark:bg-pink-900/20">1</td>
                <td>0</td><td>0</td>
              </tr>
              <!-- 110 -->
              <tr class="border-b border-pink-50 dark:border-pink-800/30">
                <td class="font-bold text-pink-600 dark:text-pink-400">1</td><td class="font-bold text-pink-600 dark:text-pink-400">1</td><td class="font-bold border-r border-pink-200 dark:border-pink-800">0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="font-bold text-pink-600 dark:text-pink-400 bg-pink-50/50 dark:bg-pink-900/20">1</td>
                <td>0</td>
              </tr>
              <!-- 111 -->
              <tr>
                <td class="font-bold text-pink-600 dark:text-pink-400">1</td><td class="font-bold text-pink-600 dark:text-pink-400">1</td><td class="font-bold text-pink-600 dark:text-pink-400 border-r border-pink-200 dark:border-pink-800">1</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="font-bold text-pink-600 dark:text-pink-400 bg-pink-50/50 dark:bg-pink-900/20">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex flex-col justify-center">
        <h4 class="font-bold text-lg text-pink-800 dark:text-pink-400 mb-3">লজিক ফাংশন ও সার্কিট</h4>
        <div class="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-pink-100 dark:border-pink-800 mb-6 font-mono text-slate-800 dark:text-slate-300">
          <p class="mb-2 text-sm text-slate-500">সত্যক সারণি থেকে আউটপুটগুলোর জন্য সমীকরণ (ইনপুট 0 হলে পূরক বা ' বসবে):</p>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div><span class="text-pink-600 dark:text-pink-400 font-bold">D0</span> = x'y'z'</div>
            <div><span class="text-pink-600 dark:text-pink-400 font-bold">D1</span> = x'y'z</div>
            <div><span class="text-pink-600 dark:text-pink-400 font-bold">D2</span> = x'yz'</div>
            <div><span class="text-pink-600 dark:text-pink-400 font-bold">D3</span> = x'yz</div>
            <div><span class="text-pink-600 dark:text-pink-400 font-bold">D4</span> = xy'z'</div>
            <div><span class="text-pink-600 dark:text-pink-400 font-bold">D5</span> = xy'z</div>
            <div><span class="text-pink-600 dark:text-pink-400 font-bold">D6</span> = xyz'</div>
            <div><span class="text-pink-600 dark:text-pink-400 font-bold">D7</span> = xyz</div>
          </div>
        </div>
        
        <div class="p-4 bg-pink-100 dark:bg-pink-900/30 rounded-xl border-l-4 border-pink-500 text-sm text-slate-700 dark:text-slate-300">
          <strong class="block mb-1">লজিক সার্কিট তৈরি:</strong>
          সমীকরণগুলো থেকে দেখা যাচ্ছে যে, ডিকোডার বাস্তবায়নের জন্য ৩টি NOT গেইট (ইনপুটগুলোর পূরক করার জন্য) এবং ৮টি ৩-ইনপুট বিশিষ্ট AND গেইট প্রয়োজন।
        </div>
      </div>
    </div>
  </div>

</div>
`;
