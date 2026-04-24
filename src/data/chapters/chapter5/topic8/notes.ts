export const notes = `
<div class="space-y-10">
  <section class="bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-full font-semibold text-sm mb-5 border border-white/25">
      <svg class="w-5 h-5 text-indigo-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v5"/><path d="M6 13h12"/><path d="M8 21l4-8 4 8"/><circle cx="12" cy="10" r="2"/></svg>
      অধ্যায় ৫
    </div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">কন্ডিশনাল কন্ট্রোল স্টেটমেন্ট</h2>
    <p class="text-indigo-100 text-lg font-medium max-w-3xl">if, if-else, else-if, nested if এবং switch ব্যবহার করে শর্তভিত্তিক প্রোগ্রাম তৈরি ও বোর্ড-standard C problem solving।</p>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5h14v5H5zM5 14h14v5H5z"/><path d="M12 10v4"/></svg>
      কন্ট্রোল স্টেটমেন্টের ধারণা
    </h3>
    <p class="text-sm leading-7 text-slate-700 dark:text-slate-300 mb-5">Control statement প্রোগ্রামের স্বাভাবিক ধারাবাহিক execution পরিবর্তন করে। C ভাষায় প্রধানত conditional control, loop control এবং jumping control statement ব্যবহৃত হয়। Conditional control statement কোনো condition সত্য বা মিথ্যা হওয়ার উপর নির্ভর করে আলাদা statement চালায়।</p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      <div class="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200"><h4 class="font-bold text-indigo-700">if</h4><p class="text-sm text-slate-700 dark:text-slate-300">শর্ত সত্য হলে block চলে।</p></div>
      <div class="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200"><h4 class="font-bold text-blue-700">if-else</h4><p class="text-sm text-slate-700 dark:text-slate-300">সত্য হলে if, মিথ্যা হলে else।</p></div>
      <div class="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200"><h4 class="font-bold text-cyan-700">else-if</h4><p class="text-sm text-slate-700 dark:text-slate-300">একাধিক শর্ত পরীক্ষা।</p></div>
      <div class="p-4 rounded-2xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200"><h4 class="font-bold text-sky-700">nested if</h4><p class="text-sm text-slate-700 dark:text-slate-300">if-এর ভিতরে if।</p></div>
      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200"><h4 class="font-bold text-slate-700 dark:text-slate-200">switch</h4><p class="text-sm text-slate-700 dark:text-slate-300">একাধিক case থেকে নির্বাচন।</p></div>
    </div>
  </section>

  <section class="bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 p-6 md:p-8 rounded-3xl border border-indigo-200">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v4H6zM6 10h12v4H6zM6 16h12v4H6z"/></svg>
      Syntax Cards
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <pre class="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto"><code class="language-c">if (condition) {
    statement;
} else {
    statement;
}</code></pre>
      <pre class="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto"><code class="language-c">if (condition1) {
    statement;
} else if (condition2) {
    statement;
} else {
    statement;
}</code></pre>
      <pre class="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto"><code class="language-c">switch (expression) {
case 1:
    statement;
    break;
default:
    statement;
}</code></pre>
      <pre class="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto"><code class="language-c">if (condition1) {
    if (condition2) {
        statement;
    }
}</code></pre>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/><path d="M8 6v12M16 6v12"/></svg>
      জোড়-বিজোড়: Algorithm, Flowchart, C Code
    </h3>
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-3">Algorithm</h4>
        <ol class="text-sm leading-7 list-decimal list-inside text-slate-700 dark:text-slate-300"><li>শুরু</li><li>n input</li><li>যদি n%2==0 হয়, Even print</li><li>অন্যথায় Odd print</li><li>শেষ</li></ol>
      </div>
      <div class="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">Flowchart Description</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">Start → Input n → Decision n%2==0? → Yes: Even → No: Odd → End। Decision symbol হলো diamond।</p>
      </div>
      <div class="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto">
        <pre><code class="language-c">#include &lt;stdio.h&gt;
int main()
{
    int n;
    scanf("%d", &amp;n);
    if (n % 2 == 0)
        printf("Even");
    else
        printf("Odd");
    return 0;
}</code></pre>
      </div>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-200/50">
    <h3 class="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>
      গুরুত্বপূর্ণ Conditional Programs
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="bg-white/80 dark:bg-slate-900/40 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">Leap Year</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">if ((y % 400 == 0) || ((y % 100 != 0) &amp;&amp; (y % 4 == 0)))
    printf("Leap year");
else
    printf("Not leap year");</code></pre>
      </div>
      <div class="bg-white/80 dark:bg-slate-900/40 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">Largest of Three</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">if (a &gt;= b &amp;&amp; a &gt;= c)
    printf("%d", a);
else if (b &gt;= a &amp;&amp; b &gt;= c)
    printf("%d", b);
else
    printf("%d", c);</code></pre>
      </div>
      <div class="bg-white/80 dark:bg-slate-900/40 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">Divisible by 5 and 7</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">if (n % 5 == 0 &amp;&amp; n % 7 == 0)
    printf("Good");
else if (n % 5 == 0)
    printf("Flower");
else if (n % 7 == 0)
    printf("River");
else
    printf("Try again");</code></pre>
      </div>
      <div class="bg-white/80 dark:bg-slate-900/40 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">Group by Roll</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">if (roll &gt;= 1 &amp;&amp; roll &lt;= 50)
    printf("A");
else if (roll &lt;= 100)
    printf("B");
else if (roll &lt;= 200)
    printf("C");
else
    printf("Invalid");</code></pre>
      </div>
    </div>
  </section>
</div>
`;
