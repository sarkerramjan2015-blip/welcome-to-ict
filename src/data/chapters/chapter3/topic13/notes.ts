export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-indigo-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">এনকোডার (Encoder) 🎹</h2>
      <p class="text-indigo-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        এনকোডার এমন একটি লজিক বা সমবায় সার্কিট, যা মানুষের বোধগম্য ভাষাকে কম্পিউটারের বোধগম্য ভাষায় (মেশিন ভাষা বা বাইনারি) রূপান্তর করে।
      </p>
    </div>
  </div>

  <!-- What is Encoder -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50 dark:border-blue-700/50">
    <div class="flex flex-col md:flex-row gap-8 items-center">
      <div class="flex-1">
        <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4 border-b border-blue-100 dark:border-blue-900/50 pb-2">
          এনকোডারের বৈশিষ্ট্য
        </h3>
        <ul class="space-y-3 text-slate-700 dark:text-slate-300 ml-4 list-disc">
          <li>এটি বর্ণ, অঙ্ক বা চিহ্নকে বাইনারি কোডে (0 ও 1) রূপান্তর করে।</li>
          <li>এনকোডারে <strong>সর্বোচ্চ 2<sup>n</sup> টি ইনপুট</strong> থাকলে আউটপুট হবে <strong>n টি</strong>।</li>
          <li>যেকোনো মুহূর্তে শুধুমাত্র একটি ইনপুট 1 (High) হতে পারে এবং বাকি সব ইনপুট 0 (Low) থাকে।</li>
          <li>কিবোর্ড, মাউস ইত্যাদি ইনপুট ডিভাইসে এনকোডার যুক্ত থাকে।</li>
        </ul>
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 text-sm text-slate-700 dark:text-slate-300">
          <strong>উদাহরণ:</strong> একটি ৮-টু-৩ (8 to 3) এনকোডারে ৮টি (2<sup>3</sup>) ইনপুট এবং ৩টি আউটপুট থাকে।
        </div>
      </div>
      
      <div class="md:w-1/3 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
        <div class="w-full flex justify-between items-center relative">
          <div class="flex flex-col gap-2">
            <span class="w-8 h-1 bg-blue-500 rounded-full"></span>
            <span class="w-8 h-1 bg-blue-500 rounded-full"></span>
            <span class="w-8 h-1 bg-blue-500 rounded-full"></span>
            <span class="w-8 h-1 bg-blue-500 rounded-full"></span>
          </div>
          <div class="px-6 py-8 bg-blue-100 dark:bg-blue-900/50 rounded-xl border-2 border-blue-500 font-bold text-blue-800 dark:text-blue-300 text-center mx-2 z-10 shadow-sm">
            Encoder <br/> <span class="text-xs font-normal">2<sup>n</sup> to n</span>
          </div>
          <div class="flex flex-col gap-4">
            <span class="w-8 h-1 bg-indigo-500 rounded-full"></span>
            <span class="w-8 h-1 bg-indigo-500 rounded-full"></span>
          </div>
        </div>
        <div class="w-full flex justify-between text-xs mt-4 font-bold text-slate-500">
          <span>ইনপুট (2<sup>n</sup>)</span>
          <span>আউটপুট (n)</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 8 to 3 Encoder Details -->
  <div class="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 p-6 md:p-8 rounded-3xl shadow-sm border border-sky-200 dark:border-sky-800/50">
    <h3 class="text-2xl font-bold text-sky-800 dark:text-sky-400 mb-6 flex items-center gap-3 border-b border-sky-200 dark:border-sky-800/50 pb-4">
      <span class="p-2 bg-sky-200 dark:bg-sky-800/50 rounded-xl">🔢</span> ৮-টু-৩ (অক্টাল টু বাইনারি) এনকোডার
    </h3>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          এই এনকোডারে ৮টি (D0 থেকে D7) ইনপুট লাইন এবং ৩টি (x, y, z) আউটপুট লাইন থাকে। এটি অক্টাল সংখ্যাকে সমতুল্য ৩ বিটের বাইনারি কোডে রূপান্তর করে।
        </p>
        
        <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-sky-100 dark:border-sky-800 shadow-inner mb-4 overflow-x-auto">
          <h4 class="font-bold text-center mb-3 text-sky-700 dark:text-sky-300">সত্যক সারণি (Truth Table)</h4>
          <table class="w-full text-xs md:text-sm text-center text-slate-700 dark:text-slate-300">
            <thead class="bg-sky-100 dark:bg-sky-900/50 text-sky-900 dark:text-sky-200">
              <tr>
                <th colspan="8" class="px-2 py-2 border-b border-r border-sky-200 dark:border-sky-800">Inputs (8)</th>
                <th colspan="3" class="px-2 py-2 border-b border-sky-200 dark:border-sky-800">Outputs (3)</th>
              </tr>
              <tr>
                <th class="px-1 py-1 border-r border-sky-200 dark:border-sky-800">D0</th>
                <th class="px-1 py-1 border-r border-sky-200 dark:border-sky-800">D1</th>
                <th class="px-1 py-1 border-r border-sky-200 dark:border-sky-800">D2</th>
                <th class="px-1 py-1 border-r border-sky-200 dark:border-sky-800">D3</th>
                <th class="px-1 py-1 border-r border-sky-200 dark:border-sky-800">D4</th>
                <th class="px-1 py-1 border-r border-sky-200 dark:border-sky-800">D5</th>
                <th class="px-1 py-1 border-r border-sky-200 dark:border-sky-800">D6</th>
                <th class="px-1 py-1 border-r border-sky-200 dark:border-sky-800">D7</th>
                <th class="px-1 py-1 border-r border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400">x</th>
                <th class="px-1 py-1 border-r border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400">y</th>
                <th class="px-1 py-1 text-sky-600 dark:text-sky-400">z</th>
              </tr>
            </thead>
            <tbody>
              <!-- D0 active -->
              <tr class="border-b border-sky-50 dark:border-sky-800/30">
                <td class="font-bold text-sky-600 dark:text-sky-400">1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="border-r border-sky-200 dark:border-sky-800">0</td>
                <td class="font-bold">0</td><td class="font-bold">0</td><td class="font-bold">0</td>
              </tr>
              <!-- D1 active -->
              <tr class="border-b border-sky-50 dark:border-sky-800/30">
                <td>0</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="border-r border-sky-200 dark:border-sky-800">0</td>
                <td class="font-bold">0</td><td class="font-bold">0</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td>
              </tr>
              <!-- D2 active -->
              <tr class="border-b border-sky-50 dark:border-sky-800/30">
                <td>0</td><td>0</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="border-r border-sky-200 dark:border-sky-800">0</td>
                <td class="font-bold">0</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td><td class="font-bold">0</td>
              </tr>
              <!-- D3 active -->
              <tr class="border-b border-sky-50 dark:border-sky-800/30">
                <td>0</td><td>0</td><td>0</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td><td>0</td><td>0</td><td>0</td><td class="border-r border-sky-200 dark:border-sky-800">0</td>
                <td class="font-bold">0</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td>
              </tr>
              <!-- D4 active -->
              <tr class="border-b border-sky-50 dark:border-sky-800/30">
                <td>0</td><td>0</td><td>0</td><td>0</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td><td>0</td><td>0</td><td class="border-r border-sky-200 dark:border-sky-800">0</td>
                <td class="font-bold text-sky-600 dark:text-sky-400">1</td><td class="font-bold">0</td><td class="font-bold">0</td>
              </tr>
              <!-- D5 active -->
              <tr class="border-b border-sky-50 dark:border-sky-800/30">
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td><td>0</td><td class="border-r border-sky-200 dark:border-sky-800">0</td>
                <td class="font-bold text-sky-600 dark:text-sky-400">1</td><td class="font-bold">0</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td>
              </tr>
              <!-- D6 active -->
              <tr class="border-b border-sky-50 dark:border-sky-800/30">
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td><td class="border-r border-sky-200 dark:border-sky-800">0</td>
                <td class="font-bold text-sky-600 dark:text-sky-400">1</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td><td class="font-bold">0</td>
              </tr>
              <!-- D7 active -->
              <tr>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class="font-bold text-sky-600 dark:text-sky-400 border-r border-sky-200 dark:border-sky-800">1</td>
                <td class="font-bold text-sky-600 dark:text-sky-400">1</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td><td class="font-bold text-sky-600 dark:text-sky-400">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex flex-col justify-center">
        <h4 class="font-bold text-lg text-sky-800 dark:text-sky-400 mb-3">লজিক ফাংশন ও সার্কিট</h4>
        <div class="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-sky-100 dark:border-sky-800 mb-6 font-mono text-slate-800 dark:text-slate-300">
          <p class="mb-2 text-sm text-slate-500">সত্যক সারণি থেকে আউটপুটগুলোর জন্য সমীকরণ (যেখানে 1 আছে সেগুলো যোগ করে):</p>
          <div class="space-y-2">
            <div><span class="text-sky-600 dark:text-sky-400 font-bold">x</span> = D4 + D5 + D6 + D7</div>
            <div><span class="text-sky-600 dark:text-sky-400 font-bold">y</span> = D2 + D3 + D6 + D7</div>
            <div><span class="text-sky-600 dark:text-sky-400 font-bold">z</span> = D1 + D3 + D5 + D7</div>
          </div>
        </div>
        
        <div class="p-4 bg-sky-100 dark:bg-sky-900/30 rounded-xl border-l-4 border-sky-500 text-sm text-slate-700 dark:text-slate-300">
          <strong class="block mb-1">লজিক সার্কিট তৈরি:</strong>
          সমীকরণগুলো থেকে দেখা যাচ্ছে যে, শুধুমাত্র OR গেইট ব্যবহার করেই এই এনকোডার বাস্তবায়ন করা সম্ভব। তিনটি আউটপুটের জন্য তিনটি ৪-ইনপুট বিশিষ্ট OR গেইট প্রয়োজন।
        </div>
      </div>
    </div>
  </div>

</div>
`;
