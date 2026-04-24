export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-teal-900 via-cyan-900 to-teal-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-cyan-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">বাইনারি অ্যাডার (Binary Adder) 🔢</h2>
      <p class="text-cyan-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        হাফ অ্যাডার ও ফুল অ্যাডার সমন্বিত করে বহু বিটের বাইনারি সংখ্যা যোগ করার জন্য বাইনারি অ্যাডার তৈরি করা হয়। এটি কম্পিউটারের গাণিতিক ইউনিটের মূল ভিত্তি।
      </p>
    </div>
  </div>

  <!-- Binary Addition Rules -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-teal-200/50 dark:border-teal-700/50">
    <h3 class="text-2xl font-bold text-teal-800 dark:text-teal-400 mb-4 border-b border-teal-100 dark:border-teal-900/50 pb-2">
      বাইনারি যোগের মৌলিক নিয়ম
    </h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-2xl border border-teal-200 dark:border-teal-800 text-center">
        <div class="text-3xl font-black text-teal-700 dark:text-teal-300 font-mono">0+0</div>
        <div class="text-xl font-bold text-slate-700 dark:text-slate-300 mt-2">= 0</div>
        <div class="text-xs text-slate-500 mt-1">Carry = 0</div>
      </div>
      <div class="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-2xl border border-teal-200 dark:border-teal-800 text-center">
        <div class="text-3xl font-black text-teal-700 dark:text-teal-300 font-mono">0+1</div>
        <div class="text-xl font-bold text-slate-700 dark:text-slate-300 mt-2">= 1</div>
        <div class="text-xs text-slate-500 mt-1">Carry = 0</div>
      </div>
      <div class="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-2xl border border-teal-200 dark:border-teal-800 text-center">
        <div class="text-3xl font-black text-teal-700 dark:text-teal-300 font-mono">1+0</div>
        <div class="text-xl font-bold text-slate-700 dark:text-slate-300 mt-2">= 1</div>
        <div class="text-xs text-slate-500 mt-1">Carry = 0</div>
      </div>
      <div class="bg-cyan-100 dark:bg-cyan-900/30 p-4 rounded-2xl border-2 border-cyan-400 text-center">
        <div class="text-3xl font-black text-cyan-700 dark:text-cyan-300 font-mono">1+1</div>
        <div class="text-xl font-bold text-cyan-700 dark:text-cyan-300 mt-2">= 10</div>
        <div class="text-xs text-cyan-600 dark:text-cyan-400 font-bold mt-1">Sum=0, Carry=1</div>
      </div>
    </div>
    <div class="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-800 text-sm text-slate-700 dark:text-slate-300">
      <strong>গুরুত্বপূর্ণ:</strong> বাইনারিতে ১+১ = ১০ (দশমিকের ২)। এখানে যোগফল (Sum) = 0 এবং ক্যারি (Carry) = 1।
    </div>
  </div>

  <!-- 4-bit Binary Adder -->
  <div class="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 md:p-8 rounded-3xl shadow-sm border border-teal-200 dark:border-teal-800/50">
    <h3 class="text-2xl font-bold text-teal-800 dark:text-teal-400 mb-6 flex items-center gap-3 border-b border-teal-200 dark:border-teal-800/50 pb-4">
      <span class="p-2 bg-teal-200 dark:bg-teal-800/50 rounded-xl">🔗</span> ৪-বিট রিপল ক্যারি অ্যাডার (Ripple Carry Adder)
    </h3>

    <p class="text-slate-700 dark:text-slate-300 mb-6">
      একটি হাফ অ্যাডার এবং তিনটি ফুল অ্যাডার ক্যাসকেড (একটির ক্যারি আউট পরেরটির ক্যারি-ইনে যুক্ত) করে একটি ৪-বিট বাইনারি অ্যাডার তৈরি করা যায়।
    </p>

    <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-teal-100 dark:border-teal-800 shadow-inner mb-6 overflow-x-auto">
      <h4 class="font-bold text-center mb-4 text-teal-700 dark:text-teal-300">৪-বিট যোগের উদাহরণ: (1011)₂ + (0111)₂</h4>
      <div class="font-mono text-center space-y-1 text-lg text-slate-800 dark:text-slate-200">
        <div class="text-sm text-slate-500 mb-2">ক্যারি:   <span class="text-teal-600 dark:text-teal-400 font-bold">1 1 1 1 0</span></div>
        <div>&nbsp;&nbsp;&nbsp;1 0 1 1</div>
        <div>+ 0 1 1 1</div>
        <div class="border-t-2 border-teal-500 pt-1 font-black text-teal-700 dark:text-teal-300">1 0 0 1 0</div>
      </div>
      <p class="text-center text-sm text-slate-500 mt-3">(১১)₁₀ + (৭)₁₀ = (১৮)₁₀ = (10010)₂</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-teal-200 dark:border-teal-700 text-center shadow-sm">
        <div class="text-sm font-bold text-slate-500 mb-2">বিট ০ (LSB)</div>
        <div class="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-xl border-2 border-teal-400 font-bold text-teal-800 dark:text-teal-300">
          Half Adder
        </div>
        <div class="text-xs text-slate-500 mt-2">Cin = 0</div>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-teal-200 dark:border-teal-700 text-center shadow-sm">
        <div class="text-sm font-bold text-slate-500 mb-2">বিট ১</div>
        <div class="p-3 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl border-2 border-cyan-400 font-bold text-cyan-800 dark:text-cyan-300">
          Full Adder
        </div>
        <div class="text-xs text-slate-500 mt-2">Cin = C₀</div>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-teal-200 dark:border-teal-700 text-center shadow-sm">
        <div class="text-sm font-bold text-slate-500 mb-2">বিট ২</div>
        <div class="p-3 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl border-2 border-cyan-400 font-bold text-cyan-800 dark:text-cyan-300">
          Full Adder
        </div>
        <div class="text-xs text-slate-500 mt-2">Cin = C₁</div>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-teal-200 dark:border-teal-700 text-center shadow-sm">
        <div class="text-sm font-bold text-slate-500 mb-2">বিট ৩ (MSB)</div>
        <div class="p-3 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl border-2 border-cyan-400 font-bold text-cyan-800 dark:text-cyan-300">
          Full Adder
        </div>
        <div class="text-xs text-slate-500 mt-2">Cin = C₂</div>
      </div>
    </div>
  </div>

  <!-- Adder Applications & Summary -->
  <div class="bg-slate-50 dark:bg-slate-800/80 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
    <h3 class="text-xl font-bold text-slate-800 dark:text-slate-300 mb-6 border-b border-slate-200 dark:border-slate-700 pb-3 flex items-center gap-2">
      <span class="text-2xl">📊</span> হাফ অ্যাডার ও ফুল অ্যাডারের তুলনামূলক চিত্র
    </h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-teal-100 dark:bg-teal-900/50 text-teal-900 dark:text-teal-200">
          <tr>
            <th class="px-4 py-3 text-left rounded-tl-xl">বৈশিষ্ট্য</th>
            <th class="px-4 py-3 text-center">হাফ অ্যাডার</th>
            <th class="px-4 py-3 text-center rounded-tr-xl">ফুল অ্যাডার</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700">
            <td class="px-4 py-3 font-bold">ইনপুট সংখ্যা</td>
            <td class="px-4 py-3 text-center">২টি (A, B)</td>
            <td class="px-4 py-3 text-center">৩টি (A, B, Cᵢₙ)</td>
          </tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <td class="px-4 py-3 font-bold">আউটপুট সংখ্যা</td>
            <td class="px-4 py-3 text-center">২টি (S, C)</td>
            <td class="px-4 py-3 text-center">২টি (S, Cₒᵤₜ)</td>
          </tr>
          <tr class="border-b border-slate-100 dark:border-slate-700">
            <td class="px-4 py-3 font-bold">Carry-in</td>
            <td class="px-4 py-3 text-center text-red-500">নেই</td>
            <td class="px-4 py-3 text-center text-green-600">আছে</td>
          </tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <td class="px-4 py-3 font-bold">Sum সমীকরণ</td>
            <td class="px-4 py-3 text-center font-mono text-sm">S = A ⊕ B</td>
            <td class="px-4 py-3 text-center font-mono text-sm">S = A ⊕ B ⊕ Cᵢₙ</td>
          </tr>
          <tr class="border-b border-slate-100 dark:border-slate-700">
            <td class="px-4 py-3 font-bold">Carry সমীকরণ</td>
            <td class="px-4 py-3 text-center font-mono text-sm">C = AB</td>
            <td class="px-4 py-3 text-center font-mono text-sm">Cₒ = AB + Cᵢₙ(A⊕B)</td>
          </tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <td class="px-4 py-3 font-bold">গেইট প্রয়োজন</td>
            <td class="px-4 py-3 text-center">১ XOR + ১ AND</td>
            <td class="px-4 py-3 text-center">২ HA + ১ OR</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-bold rounded-bl-xl">ব্যবহার</td>
            <td class="px-4 py-3 text-center">একক বিট যোগ</td>
            <td class="px-4 py-3 text-center rounded-br-xl">মাল্টি-বিট যোগ</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Key Points -->
  <div class="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 p-6 rounded-3xl border border-cyan-200 dark:border-cyan-800/50">
    <h3 class="text-xl font-bold text-cyan-800 dark:text-cyan-400 mb-4 flex items-center gap-2">
      <span>⭐</span> বোর্ড পরীক্ষার গুরুত্বপূর্ণ তথ্য
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-cyan-100 dark:border-cyan-800">
        <ul class="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
          <li class="flex gap-2"><span class="text-cyan-500 font-bold">✓</span> হাফ অ্যাডার: ২ ইনপুট, ২ আউটপুট</li>
          <li class="flex gap-2"><span class="text-cyan-500 font-bold">✓</span> ফুল অ্যাডার: ৩ ইনপুট, ২ আউটপুট</li>
          <li class="flex gap-2"><span class="text-cyan-500 font-bold">✓</span> S = A ⊕ B (XOR গেইট)</li>
          <li class="flex gap-2"><span class="text-cyan-500 font-bold">✓</span> C = A · B (AND গেইট)</li>
        </ul>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-cyan-100 dark:border-cyan-800">
        <ul class="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
          <li class="flex gap-2"><span class="text-teal-500 font-bold">✓</span> ২ HA + ১ OR = ১ ফুল অ্যাডার</li>
          <li class="flex gap-2"><span class="text-teal-500 font-bold">✓</span> ৪-বিট অ্যাডার: ১ HA + ৩ FA</li>
          <li class="flex gap-2"><span class="text-teal-500 font-bold">✓</span> বাইনারিতে ১+১ = Sum:0, Carry:1</li>
          <li class="flex gap-2"><span class="text-teal-500 font-bold">✓</span> ALU তে অ্যাডার ব্যবহৃত হয়</li>
        </ul>
      </div>
    </div>
  </div>

</div>
`;
