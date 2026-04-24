export const notes = `
<div class="space-y-10">
  <section class="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-full font-semibold text-sm mb-5 border border-white/25">
      <svg class="w-5 h-5 text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8h12M6 16h12"/><path d="M8 6v4M16 14v4"/></svg>
      অধ্যায় ৫
    </div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">অপারেটর ও এক্সপ্রেশন</h2>
    <p class="text-blue-100 text-lg font-medium max-w-3xl">Arithmetic, relational, logical, assignment, increment-decrement ও bitwise operator ব্যবহার করে expression বিশ্লেষণ এবং output tracing।</p>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/><path d="M8 6v12M16 6v12"/></svg>
      অপারেটরের প্রকারভেদ
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div class="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200"><h4 class="font-bold text-blue-700 mb-2">Arithmetic</h4><p class="text-sm text-slate-700 dark:text-slate-300 font-mono">+, -, *, /, %</p><p class="text-sm text-slate-700 dark:text-slate-300 mt-2">যোগ, বিয়োগ, গুণ, ভাগ ও ভাগশেষ।</p></div>
      <div class="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200"><h4 class="font-bold text-cyan-700 mb-2">Relational</h4><p class="text-sm text-slate-700 dark:text-slate-300 font-mono">==, !=, &gt;, &lt;, &gt;=, &lt;=</p><p class="text-sm text-slate-700 dark:text-slate-300 mt-2">দুই মানের সম্পর্ক তুলনা করে সত্য/মিথ্যা ফল দেয়।</p></div>
      <div class="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200"><h4 class="font-bold text-indigo-700 mb-2">Logical</h4><p class="text-sm text-slate-700 dark:text-slate-300 font-mono">&amp;&amp;, ||, !</p><p class="text-sm text-slate-700 dark:text-slate-300 mt-2">একাধিক শর্তকে যুক্ত করে।</p></div>
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200"><h4 class="font-bold text-slate-700 dark:text-slate-200 mb-2">Assignment</h4><p class="text-sm text-slate-700 dark:text-slate-300 font-mono">=, +=, -=, *=, /=, %=</p><p class="text-sm text-slate-700 dark:text-slate-300 mt-2">চলকে মান সংরক্ষণ বা পরিবর্তন করে।</p></div>
      <div class="p-5 rounded-2xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200"><h4 class="font-bold text-sky-700 mb-2">Increment ও Decrement</h4><p class="text-sm text-slate-700 dark:text-slate-300 font-mono">++, --</p><p class="text-sm text-slate-700 dark:text-slate-300 mt-2">চলকের মান ১ করে বাড়ায় বা কমায়।</p></div>
      <div class="p-5 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200"><h4 class="font-bold text-violet-700 mb-2">Bitwise</h4><p class="text-sm text-slate-700 dark:text-slate-300 font-mono">&amp;, |, ^, ~, &lt;&lt;, &gt;&gt;</p><p class="text-sm text-slate-700 dark:text-slate-300 mt-2">বাইনারি bit স্তরে কাজ করে।</p></div>
    </div>
  </section>

  <section class="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 md:p-8 rounded-3xl border border-blue-200">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 17h16"/><path d="M8 12h8"/></svg>
      Arithmetic ও Relational Operator
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="overflow-x-auto bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-blue-200">
        <table class="w-full text-sm text-slate-700 dark:text-slate-300">
          <thead class="bg-blue-100 dark:bg-blue-900/50"><tr><th class="px-4 py-3 text-left">Symbol</th><th class="px-4 py-3 text-left">কাজ</th><th class="px-4 py-3 text-left">উদাহরণ</th></tr></thead>
          <tbody><tr class="border-b"><td class="px-4 py-2 font-mono">+</td><td class="px-4 py-2">যোগ</td><td class="px-4 py-2">10+5=15</td></tr><tr class="border-b"><td class="px-4 py-2 font-mono">-</td><td class="px-4 py-2">বিয়োগ</td><td class="px-4 py-2">10-5=5</td></tr><tr class="border-b"><td class="px-4 py-2 font-mono">*</td><td class="px-4 py-2">গুণ</td><td class="px-4 py-2">10*5=50</td></tr><tr class="border-b"><td class="px-4 py-2 font-mono">/</td><td class="px-4 py-2">ভাগ</td><td class="px-4 py-2">10/5=2</td></tr><tr><td class="px-4 py-2 font-mono">%</td><td class="px-4 py-2">ভাগশেষ</td><td class="px-4 py-2">10%3=1</td></tr></tbody>
        </table>
      </div>
      <div class="overflow-x-auto bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-cyan-200">
        <table class="w-full text-sm text-slate-700 dark:text-slate-300">
          <thead class="bg-cyan-100 dark:bg-cyan-900/50"><tr><th class="px-4 py-3 text-left">Symbol</th><th class="px-4 py-3 text-left">কাজ</th><th class="px-4 py-3 text-left">উদাহরণ</th></tr></thead>
          <tbody><tr class="border-b"><td class="px-4 py-2 font-mono">==</td><td class="px-4 py-2">সমান</td><td class="px-4 py-2">a==b</td></tr><tr class="border-b"><td class="px-4 py-2 font-mono">!=</td><td class="px-4 py-2">অসমান</td><td class="px-4 py-2">a!=b</td></tr><tr class="border-b"><td class="px-4 py-2 font-mono">&gt;</td><td class="px-4 py-2">বড়</td><td class="px-4 py-2">a&gt;b</td></tr><tr class="border-b"><td class="px-4 py-2 font-mono">&lt;</td><td class="px-4 py-2">ছোট</td><td class="px-4 py-2">a&lt;b</td></tr><tr><td class="px-4 py-2 font-mono">&gt;=, &lt;=</td><td class="px-4 py-2">বড়/ছোট বা সমান</td><td class="px-4 py-2">a&gt;=b</td></tr></tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 7h10v10H7z"/><path d="M4 4l16 16"/></svg>
      Prefix ও Postfix তুলনা
    </h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-indigo-100 dark:bg-indigo-900/50"><tr><th class="px-4 py-3 text-left rounded-tl-xl">Expression</th><th class="px-4 py-3 text-left">কাজ</th><th class="px-4 py-3 text-left rounded-tr-xl">ফলাফল</th></tr></thead>
        <tbody>
          <tr class="border-b"><td class="px-4 py-2 font-mono">b = a++</td><td class="px-4 py-2">আগে a ব্যবহার, পরে a বাড়ে</td><td class="px-4 py-2">a=5 হলে b=5, পরে a=6</td></tr>
          <tr class="border-b bg-indigo-50/40"><td class="px-4 py-2 font-mono">b = ++a</td><td class="px-4 py-2">আগে a বাড়ে, পরে ব্যবহার</td><td class="px-4 py-2">a=5 হলে a=6, b=6</td></tr>
          <tr class="border-b"><td class="px-4 py-2 font-mono">b = a--</td><td class="px-4 py-2">আগে a ব্যবহার, পরে a কমে</td><td class="px-4 py-2">a=5 হলে b=5, পরে a=4</td></tr>
          <tr><td class="px-4 py-2 font-mono">b = --a</td><td class="px-4 py-2">আগে a কমে, পরে ব্যবহার</td><td class="px-4 py-2">a=5 হলে a=4, b=4</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h6M8 16h7"/></svg>
      Output Tracing: Algorithm, Flowchart, C Code
    </h3>
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-3">Algorithm</h4>
        <ol class="text-sm leading-7 list-decimal list-inside text-slate-700 dark:text-slate-300"><li>a=2 ধরি।</li><li>++a করলে a=3।</li><li>b-তে a সংরক্ষণ।</li><li>b output।</li></ol>
      </div>
      <div class="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">Flowchart Description</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">Start → Assign a=2 → Process b=++a → Output b → End। Prefix operator হলে output-এর আগে মান পরিবর্তিত হয়।</p>
      </div>
      <div class="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto">
        <pre><code class="language-c">#include &lt;stdio.h&gt;
int main()
{
    int a = 2, b;
    b = ++a;
    printf("%d", b);
    return 0;
}</code></pre>
      </div>
    </div>
  </section>
</div>
`;
