export const notes = `
<div class="space-y-10">
  <section class="bg-gradient-to-br from-slate-950 via-blue-950 to-sky-950 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-full font-semibold text-sm mb-5 border border-white/25">
      <svg class="w-5 h-5 text-sky-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>
      অধ্যায় ৫
    </div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">অ্যারে ও ফাংশন</h2>
    <p class="text-sky-100 text-lg font-medium max-w-3xl">একই ধরনের একাধিক ডেটা সংরক্ষণ, একমাত্রিক ও দ্বিমাত্রিক অ্যারে, library/user-defined function এবং recursion।</p>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-sky-200/50">
    <h3 class="text-2xl font-bold text-sky-800 dark:text-sky-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M4 10h16M4 16h16M10 4v16M16 4v16"/></svg>
      অ্যারে
    </h3>
    <p class="text-sm leading-7 text-slate-700 dark:text-slate-300 mb-5">অ্যারে হলো একই data type-এর একাধিক চলকের সমাবেশ, যা একই নামের অধীনে ধারাবাহিক memory location-এ সংরক্ষিত থাকে। এটি derived data type। একই ধরনের অনেক ডেটা নিয়ে কাজ করতে array declaration করা হয়।</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="p-5 rounded-2xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200">
        <h4 class="font-bold text-sky-700 mb-3">একমাত্রিক অ্যারে</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">int id[5];
int id[5] = {101, 102, 103, 104, 105};</code></pre>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300 mt-3">id[0] থেকে id[4] পর্যন্ত মোট ৫টি element থাকবে।</p>
      </div>
      <div class="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-3">দ্বিমাত্রিক অ্যারে</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">int mark[3][4];</code></pre>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300 mt-3">এখানে ৩টি row ও ৪টি column, মোট ১২টি integer সংরক্ষণ করা যাবে।</p>
      </div>
    </div>
  </section>

  <section class="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 p-6 md:p-8 rounded-3xl border border-sky-200">
    <h3 class="text-2xl font-bold text-sky-800 dark:text-sky-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      অ্যারের মান নির্ধারণ
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-sky-200"><h4 class="font-bold text-sky-700 mb-2">Declaration-এর সময়</h4><pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">int id[5] = {101,102,103,104,105};</code></pre></div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-sky-200"><h4 class="font-bold text-sky-700 mb-2">Declaration-এর পরে</h4><pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">id[0] = 101;
id[1] = 102;</code></pre></div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-sky-200"><h4 class="font-bold text-sky-700 mb-2">Runtime input</h4><pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">for (i = 0; i &lt; 5; i++)
    scanf("%d", &amp;id[i]);</code></pre></div>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>
      অ্যারের সুবিধা ও সীমাবদ্ধতা
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-2">সুবিধা</h4>
        <ul class="text-sm leading-7 list-disc list-inside text-slate-700 dark:text-slate-300"><li>এক নামের মাধ্যমে একই ধরনের একাধিক ডেটা রাখা যায়।</li><li>loop ব্যবহার করে input, output ও processing সহজ।</li><li>ধারাবাহিক memory ব্যবহারে access দ্রুত হয়।</li></ul>
      </div>
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200">
        <h4 class="font-bold text-slate-700 dark:text-slate-200 mb-2">অসুবিধা</h4>
        <ul class="text-sm leading-7 list-disc list-inside text-slate-700 dark:text-slate-300"><li>size আগে থেকে জানা থাকতে হয়।</li><li>static structure, runtime-এ সহজে size পরিবর্তন করা যায় না।</li><li>মাঝখানে insert/delete তুলনামূলক কঠিন।</li></ul>
      </div>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h8M8 12h8M8 18h8"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></svg>
      ফাংশন
    </h3>
    <p class="text-sm leading-7 text-slate-700 dark:text-slate-300 mb-5">নির্দিষ্ট কাজ সম্পাদনের জন্য statement-এর block-কে function বলে। Function input নিতে পারে, processing করতে পারে এবং output/return value দিতে পারে। প্রতিটি C প্রোগ্রামে main() function আবশ্যিক।</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200">
        <h4 class="font-bold text-indigo-700 mb-3">Function Syntax</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">return_type function_name(parameter_list)
{
    statements;
    return value;
}</code></pre>
      </div>
      <div class="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-3">Recursive Factorial</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">int fact(int n)
{
    if (n == 0) return 1;
    return n * fact(n - 1);
}</code></pre>
      </div>
    </div>
    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200"><h4 class="font-bold text-cyan-700 mb-1">Library Function</h4><p class="text-sm text-slate-700 dark:text-slate-300">আগে থেকে তৈরি function: printf(), scanf(), sqrt(), strlen(), strcpy()। Header file include করে ব্যবহার করতে হয়।</p></div>
      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200"><h4 class="font-bold text-slate-700 dark:text-slate-200 mb-1">User-defined Function</h4><p class="text-sm text-slate-700 dark:text-slate-300">প্রোগ্রামার নিজে তৈরি করে। যেমন sum(), average(), fact()। কোড পুনর্ব্যবহার ও debugging সহজ করে।</p></div>
    </div>
  </section>

  <section class="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 p-6 md:p-8 rounded-3xl border border-blue-200">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>
      গুরুত্বপূর্ণ Library Functions
    </h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-blue-100 dark:bg-blue-900/50"><tr><th class="px-4 py-3 text-left rounded-tl-xl">Header</th><th class="px-4 py-3 text-left">Functions</th><th class="px-4 py-3 text-left rounded-tr-xl">কাজ</th></tr></thead>
        <tbody>
          <tr class="border-b"><td class="px-4 py-2 font-mono">stdio.h</td><td class="px-4 py-2 font-mono">scanf(), getchar(), printf(), puts()</td><td class="px-4 py-2">input/output</td></tr>
          <tr class="border-b bg-blue-50/40"><td class="px-4 py-2 font-mono">conio.h</td><td class="px-4 py-2 font-mono">getch(), clrscr()</td><td class="px-4 py-2">console input/control</td></tr>
          <tr class="border-b"><td class="px-4 py-2 font-mono">math.h</td><td class="px-4 py-2 font-mono">sqrt(), pow(), sin(), cos()</td><td class="px-4 py-2">গাণিতিক কাজ</td></tr>
          <tr><td class="px-4 py-2 font-mono">string.h</td><td class="px-4 py-2 font-mono">strlen(), strcpy(), strcat(), strcmp()</td><td class="px-4 py-2">string processing</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
`;
