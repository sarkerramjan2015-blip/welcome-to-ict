export const notes = `
<div class="space-y-10">
  <section class="bg-gradient-to-br from-slate-950 via-cyan-950 to-indigo-950 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-full font-semibold text-sm mb-5 border border-white/25">
      <svg class="w-5 h-5 text-cyan-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></svg>
      অধ্যায় ৫
    </div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">লুপ কন্ট্রোল স্টেটমেন্ট</h2>
    <p class="text-cyan-100 text-lg font-medium max-w-3xl">for, while, do-while, break, continue, goto এবং ধারার যোগফল, factorial, GCD, LCM, prime সহ HSC board-standard loop programs।</p>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-200/50">
    <h3 class="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
      লুপের ধারণা
    </h3>
    <p class="text-sm leading-7 text-slate-700 dark:text-slate-300 mb-5">প্রোগ্রামের এক বা একাধিক statement নির্দিষ্ট সংখ্যক বার বা নির্দিষ্ট condition পূরণ হওয়া পর্যন্ত পুনরাবৃত্তি করার জন্য loop control statement ব্যবহৃত হয়। একই কাজ বারবার করতে loop প্রোগ্রামকে সংক্ষিপ্ত, দ্রুত ও কার্যকর করে।</p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div class="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200"><h4 class="font-bold text-cyan-700 mb-2">for loop</h4><p class="text-sm text-slate-700 dark:text-slate-300">iteration count জানা থাকলে সবচেয়ে compact। initialization, condition, update একই লাইনে থাকে।</p></div>
      <div class="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200"><h4 class="font-bold text-blue-700 mb-2">while loop</h4><p class="text-sm text-slate-700 dark:text-slate-300">আগে condition পরীক্ষা করে, সত্য হলে body চালায়। condition শুরুতেই false হলে body একবারও চলবে না।</p></div>
      <div class="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200"><h4 class="font-bold text-indigo-700 mb-2">do-while loop</h4><p class="text-sm text-slate-700 dark:text-slate-300">আগে body একবার চলে, পরে condition পরীক্ষা করে। তাই অন্তত একবার execute হয়।</p></div>
      <div class="p-5 rounded-2xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200"><h4 class="font-bold text-sky-700 mb-2">break</h4><p class="text-sm text-slate-700 dark:text-slate-300">লুপ সম্পূর্ণ বন্ধ করে পরবর্তী statement-এ চলে যায়।</p></div>
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200"><h4 class="font-bold text-slate-700 dark:text-slate-200 mb-2">continue</h4><p class="text-sm text-slate-700 dark:text-slate-300">বর্তমান iteration বাদ দিয়ে পরবর্তী iteration শুরু করে।</p></div>
      <div class="p-5 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200"><h4 class="font-bold text-violet-700 mb-2">goto</h4><p class="text-sm text-slate-700 dark:text-slate-300">label-এ jump করে। HSC-তে if-goto দিয়ে series problem আসে, তবে structured code-এ সীমিত ব্যবহার উত্তম।</p></div>
    </div>
  </section>

  <section class="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 md:p-8 rounded-3xl border border-cyan-200">
    <h3 class="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/><path d="M8 6v12M16 6v12"/></svg>
      ১ থেকে n পর্যন্ত যোগফল: Algorithm, Flowchart, Code
    </h3>
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-4">
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">Algorithm</h4>
        <ol class="text-sm leading-7 list-decimal list-inside text-slate-700 dark:text-slate-300"><li>শুরু</li><li>n input</li><li>i=1, sum=0</li><li>i&lt;=n হলে sum=sum+i</li><li>i=i+1 করে পুনরাবৃত্তি</li><li>sum output</li><li>শেষ</li></ol>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-3">Flowchart</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">Start → Input n → i=1,sum=0 → Decision i&lt;=n? → Yes: sum=sum+i, i=i+1 → loop back → No: print sum → End।</p>
      </div>
      <pre class="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto"><code class="language-c">for (i = 1; i &lt;= n; i++)
{
    sum = sum + i;
}</code></pre>
      <pre class="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto"><code class="language-c">i = 1;
while (i &lt;= n)
{
    sum = sum + i;
    i++;
}</code></pre>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>
      বোর্ড-standard Series Patterns
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200"><h4 class="font-bold text-blue-700 mb-2">Even/Odd Terms</h4><pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">for (i = 2; i &lt;= n; i += 2) sum += i;   // even
for (i = 1; i &lt;= n; i += 2) sum += i;   // odd</code></pre></div>
      <div class="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200"><h4 class="font-bold text-cyan-700 mb-2">Arithmetic Series</h4><pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">for (i = 4; i &lt;= n; i += 3) sum += i;      // 4+7+10...
for (i = 10; i &lt;= 70; i += 6) sum += i;    // 10+16+22...</code></pre></div>
      <div class="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200"><h4 class="font-bold text-indigo-700 mb-2">Square Series</h4><pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">for (i = 9; i &lt;= 90; i += 3)
    sum += i * i;</code></pre></div>
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200"><h4 class="font-bold text-slate-700 dark:text-slate-200 mb-2">Print Word n Times</h4><pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">for (i = 1; i &lt;= n; i++)
    printf("SMART\\n");</code></pre></div>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h8"/></svg>
      উচ্চ গুরুত্বের C Programs
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-indigo-200">
        <h4 class="font-bold text-indigo-700 mb-3">Factorial</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">fact = 1;
for (i = 1; i &lt;= n; i++)
    fact = fact * i;</code></pre>
      </div>
      <div class="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-indigo-200">
        <h4 class="font-bold text-indigo-700 mb-3">GCD</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">while (b != 0)
{
    r = a % b;
    a = b;
    b = r;
}
printf("%d", a);</code></pre>
      </div>
      <div class="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-indigo-200">
        <h4 class="font-bold text-indigo-700 mb-3">LCM</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">gcd = a;
while (b != 0) {
    r = gcd % b;
    gcd = b;
    b = r;
}
lcm = (x * y) / gcd;</code></pre>
      </div>
      <div class="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-indigo-200">
        <h4 class="font-bold text-indigo-700 mb-3">Prime up to 30</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">for (n = 2; n &lt;= 30; n++) {
    prime = 1;
    for (i = 2; i &lt;= n / 2; i++)
        if (n % i == 0) prime = 0;
    if (prime) printf("%d ", n);
}</code></pre>
      </div>
    </div>
  </section>
</div>
`;
