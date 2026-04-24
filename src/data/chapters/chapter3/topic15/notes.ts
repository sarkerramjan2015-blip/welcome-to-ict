export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-amber-900 via-orange-900 to-amber-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-orange-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">অ্যাডার (Adder) ➕</h2>
      <p class="text-orange-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        অ্যাডার হলো এমন একটি সমবায় লজিক সার্কিট যা বাইনারি সংখ্যা যোগ করার কাজ সম্পাদন করে। কম্পিউটারের সিপিইউতে যাবতীয় গাণিতিক কাজ এই অ্যাডারের মাধ্যমেই সম্পন্ন হয়।
      </p>
    </div>
  </div>

  <!-- Introduction to Adder -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-orange-200/50 dark:border-orange-700/50">
    <h3 class="text-2xl font-bold text-orange-800 dark:text-orange-400 mb-4 border-b border-orange-100 dark:border-orange-900/50 pb-2">
      অ্যাডারের প্রকারভেদ
    </h3>
    <p class="text-slate-700 dark:text-slate-300 mb-6">
      যেকোনো গাণিতিক সার্কিটে মূলত যোগের কাজই করা হয়। এমনকি বিয়োগ, গুণ বা ভাগের কাজও যোগের মাধ্যমে (২ এর পরিপূরক পদ্ধতিতে) সম্পন্ন করা হয়। বাইনারি যোগের ক্ষেত্রে দুটি জিনিস পাওয়া যায়: একটি যোগফল (Sum) এবং অন্যটি হাতে থাকা সংখ্যা (Carry)।
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-200 dark:border-amber-800">
        <h4 class="font-bold text-lg text-amber-800 dark:text-amber-300 mb-2">১. হাফ অ্যাডার (Half Adder)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm">
          যে সমবায় সার্কিট দুটি বাইনারি বিট যোগ করে একটি যোগফল (Sum) এবং একটি ক্যারি (Carry) আউটপুট প্রদান করে।
        </p>
      </div>
      <div class="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-2xl border border-orange-200 dark:border-orange-800">
        <h4 class="font-bold text-lg text-orange-800 dark:text-orange-300 mb-2">২. ফুল অ্যাডার (Full Adder)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm">
          যে সমবায় সার্কিট দুটি বাইনারি বিটের সাথে পূর্ববর্তী পজিশনের ক্যারি (Carry in) সহ মোট তিনটি বিট যোগ করে একটি যোগফল (Sum) এবং একটি ক্যারি (Carry out) প্রদান করে।
        </p>
      </div>
    </div>
  </div>

  <!-- Half Adder -->
  <div class="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 md:p-8 rounded-3xl shadow-sm border border-amber-200 dark:border-amber-800/50">
    <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-200 dark:border-amber-800/50 pb-4">
      <span class="p-2 bg-amber-200 dark:bg-amber-800/50 rounded-xl">🌓</span> হাফ অ্যাডার (Half Adder)
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          হাফ অ্যাডারে <strong>দুটি ইনপুট (A ও B)</strong> এবং <strong>দুটি আউটপুট (S এবং C)</strong> থাকে।
        </p>
        
        <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-amber-100 dark:border-amber-800 shadow-inner mb-4">
          <h4 class="font-bold text-center mb-3 text-amber-700 dark:text-amber-300">হাফ অ্যাডারের সত্যক সারণি</h4>
          <table class="w-full text-center text-slate-700 dark:text-slate-300">
            <thead class="bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200">
              <tr>
                <th colspan="2" class="px-3 py-2 border-r border-amber-200 dark:border-amber-800">Inputs</th>
                <th colspan="2" class="px-3 py-2">Outputs</th>
              </tr>
              <tr class="border-b border-amber-200 dark:border-amber-800">
                <th class="px-3 py-1 border-r border-amber-200 dark:border-amber-800">A</th>
                <th class="px-3 py-1 border-r border-amber-200 dark:border-amber-800">B</th>
                <th class="px-3 py-1 border-r border-amber-200 dark:border-amber-800">Sum (S)</th>
                <th class="px-3 py-1">Carry (C)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-amber-50 dark:border-amber-800/30">
                <td class="px-3 py-2 border-r border-amber-100 dark:border-amber-800/50">0</td>
                <td class="px-3 py-2 border-r border-amber-100 dark:border-amber-800/50">0</td>
                <td class="px-3 py-2 font-bold border-r border-amber-100 dark:border-amber-800/50">0</td>
                <td class="px-3 py-2">0</td>
              </tr>
              <tr class="border-b border-amber-50 dark:border-amber-800/30">
                <td class="px-3 py-2 border-r border-amber-100 dark:border-amber-800/50">0</td>
                <td class="px-3 py-2 border-r border-amber-100 dark:border-amber-800/50">1</td>
                <td class="px-3 py-2 font-bold text-amber-600 dark:text-amber-400 border-r border-amber-100 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/20">1</td>
                <td class="px-3 py-2">0</td>
              </tr>
              <tr class="border-b border-amber-50 dark:border-amber-800/30">
                <td class="px-3 py-2 border-r border-amber-100 dark:border-amber-800/50">1</td>
                <td class="px-3 py-2 border-r border-amber-100 dark:border-amber-800/50">0</td>
                <td class="px-3 py-2 font-bold text-amber-600 dark:text-amber-400 border-r border-amber-100 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/20">1</td>
                <td class="px-3 py-2">0</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border-r border-amber-100 dark:border-amber-800/50">1</td>
                <td class="px-3 py-2 border-r border-amber-100 dark:border-amber-800/50">1</td>
                <td class="px-3 py-2 font-bold border-r border-amber-100 dark:border-amber-800/50">0</td>
                <td class="px-3 py-2 font-bold text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/20">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex flex-col justify-center">
        <h4 class="font-bold text-lg text-amber-800 dark:text-amber-400 mb-3">লজিক সমীকরণ</h4>
        <div class="bg-white/60 dark:bg-slate-800/60 p-5 rounded-xl border border-amber-100 dark:border-amber-800 mb-6 font-mono text-lg text-slate-800 dark:text-slate-300 shadow-sm">
          <div class="mb-4">
            <strong class="text-amber-700 dark:text-amber-400">S (Sum)</strong> = A'B + AB' <br/>
            <span class="ml-10 text-xl font-bold">= A ⊕ B</span> <span class="text-sm text-slate-500 font-normal ml-2">(XOR গেইট)</span>
          </div>
          <div>
            <strong class="text-amber-700 dark:text-amber-400">C (Carry)</strong> = AB <br/>
            <span class="ml-10 text-sm text-slate-500 font-normal">(AND গেইট)</span>
          </div>
        </div>
        
        <div class="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl border-l-4 border-amber-500 text-sm text-slate-700 dark:text-slate-300">
          <strong class="block mb-1">লজিক সার্কিট তৈরি:</strong>
          সমীকরণ থেকে দেখা যাচ্ছে যে, একটি হাফ অ্যাডার তৈরি করতে <strong>১টি XOR গেইট (S এর জন্য)</strong> এবং <strong>১টি AND গেইট (C এর জন্য)</strong> প্রয়োজন।
        </div>
      </div>
    </div>
  </div>

  <!-- Full Adder -->
  <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 md:p-8 rounded-3xl shadow-sm border border-orange-200 dark:border-orange-800/50">
    <h3 class="text-2xl font-bold text-orange-800 dark:text-orange-400 mb-6 flex items-center gap-3 border-b border-orange-200 dark:border-orange-800/50 pb-4">
      <span class="p-2 bg-orange-200 dark:bg-orange-800/50 rounded-xl">🌕</span> ফুল অ্যাডার (Full Adder)
    </h3>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          ফুল অ্যাডারে <strong>তিনটি ইনপুট (A, B এবং C<sub>in</sub>)</strong> এবং <strong>দুটি আউটপুট (S এবং C<sub>out</sub>)</strong> থাকে।
        </p>
        
        <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-orange-100 dark:border-orange-800 shadow-inner mb-4 overflow-x-auto">
          <h4 class="font-bold text-center mb-3 text-orange-700 dark:text-orange-300">ফুল অ্যাডারের সত্যক সারণি</h4>
          <table class="w-full text-sm text-center text-slate-700 dark:text-slate-300">
            <thead class="bg-orange-100 dark:bg-orange-900/50 text-orange-900 dark:text-orange-200">
              <tr>
                <th colspan="3" class="px-2 py-2 border-r border-b border-orange-200 dark:border-orange-800">Inputs</th>
                <th colspan="2" class="px-2 py-2 border-b border-orange-200 dark:border-orange-800">Outputs</th>
              </tr>
              <tr>
                <th class="px-2 py-1 border-r border-orange-200 dark:border-orange-800">A</th>
                <th class="px-2 py-1 border-r border-orange-200 dark:border-orange-800">B</th>
                <th class="px-2 py-1 border-r border-orange-200 dark:border-orange-800">C<sub>in</sub></th>
                <th class="px-2 py-1 border-r border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400">Sum (S)</th>
                <th class="px-2 py-1 text-orange-600 dark:text-orange-400">C<sub>out</sub></th>
              </tr>
            </thead>
            <tbody>
              <!-- 000 -->
              <tr class="border-b border-orange-50 dark:border-orange-800/30">
                <td>0</td><td>0</td><td class="border-r border-orange-100 dark:border-orange-800/50">0</td>
                <td class="font-bold border-r border-orange-100 dark:border-orange-800/50">0</td><td>0</td>
              </tr>
              <!-- 001 -->
              <tr class="border-b border-orange-50 dark:border-orange-800/30">
                <td>0</td><td>0</td><td class="border-r border-orange-100 dark:border-orange-800/50">1</td>
                <td class="font-bold text-orange-600 dark:text-orange-400 border-r border-orange-100 dark:border-orange-800/50 bg-orange-50/50 dark:bg-orange-900/20">1</td><td>0</td>
              </tr>
              <!-- 010 -->
              <tr class="border-b border-orange-50 dark:border-orange-800/30">
                <td>0</td><td>1</td><td class="border-r border-orange-100 dark:border-orange-800/50">0</td>
                <td class="font-bold text-orange-600 dark:text-orange-400 border-r border-orange-100 dark:border-orange-800/50 bg-orange-50/50 dark:bg-orange-900/20">1</td><td>0</td>
              </tr>
              <!-- 011 -->
              <tr class="border-b border-orange-50 dark:border-orange-800/30">
                <td>0</td><td>1</td><td class="border-r border-orange-100 dark:border-orange-800/50">1</td>
                <td class="font-bold border-r border-orange-100 dark:border-orange-800/50">0</td><td class="font-bold text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/20">1</td>
              </tr>
              <!-- 100 -->
              <tr class="border-b border-orange-50 dark:border-orange-800/30">
                <td>1</td><td>0</td><td class="border-r border-orange-100 dark:border-orange-800/50">0</td>
                <td class="font-bold text-orange-600 dark:text-orange-400 border-r border-orange-100 dark:border-orange-800/50 bg-orange-50/50 dark:bg-orange-900/20">1</td><td>0</td>
              </tr>
              <!-- 101 -->
              <tr class="border-b border-orange-50 dark:border-orange-800/30">
                <td>1</td><td>0</td><td class="border-r border-orange-100 dark:border-orange-800/50">1</td>
                <td class="font-bold border-r border-orange-100 dark:border-orange-800/50">0</td><td class="font-bold text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/20">1</td>
              </tr>
              <!-- 110 -->
              <tr class="border-b border-orange-50 dark:border-orange-800/30">
                <td>1</td><td>1</td><td class="border-r border-orange-100 dark:border-orange-800/50">0</td>
                <td class="font-bold border-r border-orange-100 dark:border-orange-800/50">0</td><td class="font-bold text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/20">1</td>
              </tr>
              <!-- 111 -->
              <tr>
                <td>1</td><td>1</td><td class="border-r border-orange-100 dark:border-orange-800/50">1</td>
                <td class="font-bold text-orange-600 dark:text-orange-400 border-r border-orange-100 dark:border-orange-800/50 bg-orange-50/50 dark:bg-orange-900/20">1</td><td class="font-bold text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/20">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex flex-col justify-center">
        <h4 class="font-bold text-lg text-orange-800 dark:text-orange-400 mb-3">সরলীকৃত লজিক সমীকরণ</h4>
        <div class="bg-white/60 dark:bg-slate-800/60 p-5 rounded-xl border border-orange-100 dark:border-orange-800 mb-6 font-mono text-slate-800 dark:text-slate-300 shadow-sm text-sm">
          <div class="mb-4">
            <strong class="text-orange-700 dark:text-orange-400">S</strong> = A'B'C<sub>i</sub> + A'BC<sub>i</sub>' + AB'C<sub>i</sub>' + ABC<sub>i</sub> <br/>
            <span class="ml-6">= C<sub>i</sub>(A'B' + AB) + C<sub>i</sub>'(A'B + AB')</span> <br/>
            <span class="ml-6 text-lg font-bold text-orange-600 dark:text-orange-400">= A ⊕ B ⊕ C<sub>in</sub></span>
          </div>
          <div>
            <strong class="text-orange-700 dark:text-orange-400">C<sub>o</sub></strong> = A'BC<sub>i</sub> + AB'C<sub>i</sub> + ABC<sub>i</sub>' + ABC<sub>i</sub> <br/>
            <span class="ml-8">= C<sub>i</sub>(A'B + AB') + AB(C<sub>i</sub>' + C<sub>i</sub>)</span> <br/>
            <span class="ml-8 text-lg font-bold text-orange-600 dark:text-orange-400">= C<sub>in</sub>(A ⊕ B) + AB</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Half Adder to Full Adder -->
  <div class="bg-slate-50 dark:bg-slate-800/80 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
    <h3 class="text-xl font-bold text-slate-800 dark:text-slate-300 mb-6 border-b border-slate-200 dark:border-slate-700 pb-3 flex items-center gap-2">
      <span class="text-2xl">🔗</span> হাফ অ্যাডার দিয়ে ফুল অ্যাডার বাস্তবায়ন
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          দুটি হাফ অ্যাডার এবং একটি OR গেইট ব্যবহার করে একটি ফুল অ্যাডার তৈরি করা যায়।
        </p>
        <ul class="list-decimal ml-5 text-slate-700 dark:text-slate-300 space-y-2">
          <li><strong>প্রথম হাফ অ্যাডার:</strong> ইনপুট A ও B গ্রহণ করে একটি সাম (A ⊕ B) এবং ক্যারি (AB) তৈরি করে।</li>
          <li><strong>দ্বিতীয় হাফ অ্যাডার:</strong> প্রথমটির সাম (A ⊕ B) এবং ক্যারি-ইন (C<sub>in</sub>) গ্রহণ করে চূড়ান্ত সাম <strong>S = (A ⊕ B) ⊕ C<sub>in</sub></strong> তৈরি করে। এর ক্যারি হয় C<sub>in</sub>(A ⊕ B)।</li>
          <li><strong>OR গেইট:</strong> উভয় হাফ অ্যাডারের ক্যারিকে একটি OR গেইটে যুক্ত করলে চূড়ান্ত ক্যারি-আউট <strong>C<sub>out</sub> = C<sub>in</sub>(A ⊕ B) + AB</strong> পাওয়া যায়।</li>
        </ul>
      </div>
      <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-inner">
        <div class="font-bold text-slate-800 dark:text-slate-200 mb-4">সার্কিট ব্লক ডায়াগ্রাম</div>
        <div class="flex flex-col items-center gap-4">
          <div class="flex gap-4">
            <div class="px-6 py-4 bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-400 rounded-xl font-bold">HA 1</div>
            <div class="px-6 py-4 bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-400 rounded-xl font-bold">HA 2</div>
          </div>
          <div class="text-2xl text-slate-400">➕</div>
          <div class="px-8 py-3 bg-slate-200 dark:bg-slate-800 border-2 border-slate-400 rounded-full font-bold">OR Gate</div>
          <div class="text-xl text-slate-400">⬇️</div>
          <div class="font-bold text-orange-600 dark:text-orange-400">Full Adder</div>
        </div>
      </div>
    </div>
  </div>

</div>
`;
