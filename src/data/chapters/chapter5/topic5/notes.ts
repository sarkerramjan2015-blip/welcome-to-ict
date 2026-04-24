export const notes = `
<div class="space-y-10">
  <section class="bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-950 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-full font-semibold text-sm mb-5 border border-white/25">
      <svg class="w-5 h-5 text-sky-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h10M4 17h16"/><circle cx="18" cy="12" r="2"/></svg>
      অধ্যায় ৫
    </div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">ডেটা টাইপ, টোকেন, চলক ও কিওয়ার্ড</h2>
    <p class="text-sky-100 text-lg font-medium max-w-3xl">C ভাষার মৌলিক ডেটা ধারণা, ফরম্যাট স্পেসিফায়ার, চলক নামকরণ, ধ্রুবক, স্ট্রিং এবং ৩২টি সংরক্ষিত শব্দের বোর্ড নোট।</p>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-sky-200/50">
    <h3 class="text-2xl font-bold text-sky-800 dark:text-sky-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h8"/></svg>
      ডেটা টাইপ
    </h3>
    <p class="text-sm leading-7 text-slate-700 dark:text-slate-300 mb-5">ডেটা টাইপ প্রোগ্রামে ব্যবহৃত ডেটার ধরন নির্ধারণ করে। প্রতিটি টাইপ ভিন্ন পরিমাণ মেমোরি নেয় এবং ভিন্ন ফরম্যাট স্পেসিফায়ার দিয়ে input/output করা হয়।</p>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-sky-100 dark:bg-sky-900/50">
          <tr><th class="px-4 py-3 text-left rounded-tl-xl">Data Type</th><th class="px-4 py-3 text-left">বর্ণনা</th><th class="px-4 py-3 text-left">উদাহরণ</th><th class="px-4 py-3 text-left">সাইজ</th><th class="px-4 py-3 text-left rounded-tr-xl">Specifier</th></tr>
        </thead>
        <tbody>
          <tr class="border-b"><td class="px-4 py-3 font-mono">char</td><td class="px-4 py-3">একটি অক্ষর</td><td class="px-4 py-3">'A'</td><td class="px-4 py-3">১ byte / ৮ bit</td><td class="px-4 py-3 font-mono">%c</td></tr>
          <tr class="border-b bg-sky-50/40"><td class="px-4 py-3 font-mono">int</td><td class="px-4 py-3">পূর্ণসংখ্যা</td><td class="px-4 py-3">10, -5</td><td class="px-4 py-3">২ বা ৪ byte</td><td class="px-4 py-3 font-mono">%d</td></tr>
          <tr class="border-b"><td class="px-4 py-3 font-mono">float</td><td class="px-4 py-3">ছোট দশমিক সংখ্যা</td><td class="px-4 py-3">3.14</td><td class="px-4 py-3">৪ byte / ৩২ bit</td><td class="px-4 py-3 font-mono">%f</td></tr>
          <tr><td class="px-4 py-3 font-mono">double</td><td class="px-4 py-3">বড় দশমিক সংখ্যা</td><td class="px-4 py-3">3.14159</td><td class="px-4 py-3">৮ byte / ৬৪ bit</td><td class="px-4 py-3 font-mono">%lf</td></tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5 p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200">
      <h4 class="font-bold text-indigo-700 mb-2">ডেটা টাইপ মডিফায়ার</h4>
      <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">signed ও unsigned সাধারণত char এবং int-এর সাথে ব্যবহৃত হয়। short ও long int বা double-এর ব্যাপ্তি ও মেমোরি পরিসর পরিবর্তন করে। বড় পূর্ণসংখ্যার জন্য long integer দরকার হতে পারে।</p>
    </div>
  </section>

  <section class="bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-900/20 dark:to-sky-900/20 p-6 md:p-8 rounded-3xl border border-indigo-200">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v4H6zM6 10h12v4H6zM6 16h12v4H6z"/></svg>
      টোকেন
    </h3>
    <p class="text-sm leading-7 text-slate-700 dark:text-slate-300 mb-5">C প্রোগ্রামের ক্ষুদ্রতম অর্থবোধক উপাদানকে token বলে। Compiler টোকেন চিনে expression ও statement তৈরি করে।</p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border"><h4 class="font-bold text-indigo-700">Keywords</h4><p class="text-sm text-slate-700 dark:text-slate-300">int, while, for, return</p></div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border"><h4 class="font-bold text-indigo-700">Identifiers</h4><p class="text-sm text-slate-700 dark:text-slate-300">main, total, student_name</p></div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border"><h4 class="font-bold text-indigo-700">Constants</h4><p class="text-sm text-slate-700 dark:text-slate-300">10, 3.1416, 'A'</p></div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border"><h4 class="font-bold text-indigo-700">Strings</h4><p class="text-sm text-slate-700 dark:text-slate-300">"hello", "total"</p></div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border"><h4 class="font-bold text-indigo-700">Special Symbols</h4><p class="text-sm text-slate-700 dark:text-slate-300">(), {}, [], #, ;, ,, &amp;</p></div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border"><h4 class="font-bold text-indigo-700">Operators</h4><p class="text-sm text-slate-700 dark:text-slate-300">+, -, *, /, %, =</p></div>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-200/50">
    <h3 class="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h9"/><path d="M15 18h5v-5"/></svg>
      চলক, ধ্রুবক ও স্ট্রিং
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-2">চলক</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">চলক হলো মেমোরি লোকেশনের নাম। প্রোগ্রাম চলাকালীন এর মান পরিবর্তিত হতে পারে। Format: <span class="font-mono">data_type variable_name;</span> যেমন <span class="font-mono">int number;</span></p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-2">ধ্রুবক</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">যে মান প্রোগ্রাম চলাকালীন পরিবর্তিত হয় না তাকে constant বলে। লেখা যায়: <span class="font-mono">const float pi = 3.1416;</span> বা <span class="font-mono">#define pi 3.1416</span></p>
      </div>
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-200">
        <h4 class="font-bold text-indigo-700 mb-2">স্ট্রিং</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">একাধিক character-এর সমষ্টি, যার শেষে null character থাকে। যেমন <span class="font-mono">char name[] = "demo";</span></p>
      </div>
    </div>
    <div class="mt-5 overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-cyan-100 dark:bg-cyan-900/50"><tr><th class="px-4 py-3 text-left rounded-tl-xl">সঠিক চলক</th><th class="px-4 py-3 text-left">ভুল চলক</th><th class="px-4 py-3 text-left rounded-tr-xl">কারণ</th></tr></thead>
        <tbody>
          <tr class="border-b"><td class="px-4 py-2 font-mono">age</td><td class="px-4 py-2 font-mono">1st_number</td><td class="px-4 py-2">সংখ্যা দিয়ে শুরু করা যাবে না।</td></tr>
          <tr class="border-b bg-cyan-50/40"><td class="px-4 py-2 font-mono">student_name</td><td class="px-4 py-2 font-mono">student name</td><td class="px-4 py-2">space ব্যবহার করা যাবে না।</td></tr>
          <tr class="border-b"><td class="px-4 py-2 font-mono">totalAmount</td><td class="px-4 py-2 font-mono">total-amount</td><td class="px-4 py-2">hyphen ব্যবহার করা যাবে না।</td></tr>
          <tr><td class="px-4 py-2 font-mono">value1</td><td class="px-4 py-2 font-mono">int</td><td class="px-4 py-2">keyword চলকের নাম হতে পারে না।</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/><path d="M7 4v16M17 4v16"/></svg>
      C ভাষার ৩২টি কিওয়ার্ড
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div class="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200"><h4 class="font-bold text-indigo-700 mb-1">Data Type</h4><p class="font-mono">int, float, char, double, void, long, short, unsigned, signed</p></div>
      <div class="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200"><h4 class="font-bold text-blue-700 mb-1">Control Flow</h4><p class="font-mono">if, else, switch, case, default, for, while, do, break, continue, goto</p></div>
      <div class="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200"><h4 class="font-bold text-cyan-700 mb-1">Storage Class</h4><p class="font-mono">auto, static, extern, register, const, volatile</p></div>
      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200"><h4 class="font-bold text-slate-700 dark:text-slate-200 mb-1">Structure ও অন্যান্য</h4><p class="font-mono">struct, union, enum, typedef, return, sizeof</p></div>
    </div>
  </section>
</div>
`;
