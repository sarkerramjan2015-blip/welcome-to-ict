export const notes = `
<div class="space-y-10">
  <section class="bg-gradient-to-br from-slate-950 via-cyan-950 to-blue-950 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-full font-semibold text-sm mb-5 border border-white/25">
      <svg class="w-5 h-5 text-cyan-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 7h8M8 12h8M8 17h5"/><path d="M4 4h16v16H4z"/></svg>
      অধ্যায় ৫
    </div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">ইনপুট-আউটপুট স্টেটমেন্ট ও বেসিক C প্রোগ্রাম</h2>
    <p class="text-cyan-100 text-lg font-medium max-w-3xl">printf(), scanf(), getchar(), putchar() এবং HSC বোর্ডে বারবার আসা গাণিতিক সূত্রভিত্তিক C প্রোগ্রাম।</p>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-200/50">
    <h3 class="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v14H4z"/><path d="M7 9h10M7 13h6"/></svg>
      ইনপুট ও আউটপুট ফাংশন
    </h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-cyan-100 dark:bg-cyan-900/50">
          <tr><th class="px-4 py-3 text-left rounded-tl-xl">Function</th><th class="px-4 py-3 text-left">Syntax</th><th class="px-4 py-3 text-left">কাজ</th><th class="px-4 py-3 text-left rounded-tr-xl">Header</th></tr>
        </thead>
        <tbody>
          <tr class="border-b"><td class="px-4 py-3 font-mono">printf()</td><td class="px-4 py-3 font-mono">printf("format", value);</td><td class="px-4 py-3">ডেটা বা message output করে</td><td class="px-4 py-3 font-mono">stdio.h</td></tr>
          <tr class="border-b bg-cyan-50/40"><td class="px-4 py-3 font-mono">scanf()</td><td class="px-4 py-3 font-mono">scanf("%d", &amp;a);</td><td class="px-4 py-3">keyboard থেকে input নেয়</td><td class="px-4 py-3 font-mono">stdio.h</td></tr>
          <tr class="border-b"><td class="px-4 py-3 font-mono">getchar()</td><td class="px-4 py-3 font-mono">ch = getchar();</td><td class="px-4 py-3">একটি character input নেয়</td><td class="px-4 py-3 font-mono">stdio.h</td></tr>
          <tr><td class="px-4 py-3 font-mono">putchar()</td><td class="px-4 py-3 font-mono">putchar(ch);</td><td class="px-4 py-3">একটি character output করে</td><td class="px-4 py-3 font-mono">stdio.h</td></tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200"><h4 class="font-bold text-blue-700 mb-1">scanf()-এ &amp; কেন?</h4><p class="text-sm text-slate-700 dark:text-slate-300">ইনপুট মান চলকের মেমোরি address-এ সংরক্ষণ করতে &amp; address operator ব্যবহার করা হয়।</p></div>
      <div class="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200"><h4 class="font-bold text-indigo-700 mb-1">printf()-এ &amp; কখন নয়?</h4><p class="text-sm text-slate-700 dark:text-slate-300">সাধারণভাবে চলকের মান দেখাতে printf("%d", a) লেখা হয়; printf("%d", &amp;a) address দেখাতে পারে, তাই ভুল।</p></div>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/><path d="M8 6v12M16 6v12"/></svg>
      Algorithm, Flowchart ও C Code: তুলনামূলক লেআউট
    </h3>
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-3">দুটি সংখ্যার যোগফল</h4>
        <ol class="list-decimal list-inside text-sm leading-7 text-slate-700 dark:text-slate-300"><li>শুরু</li><li>a,b input</li><li>c=a+b</li><li>c output</li><li>শেষ</li></ol>
      </div>
      <div class="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">Flowchart Description</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">Start → Input a,b → Process c=a+b → Output c → End। ইনপুট/আউটপুটে parallelogram, processing-এ rectangle।</p>
      </div>
      <div class="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto">
        <pre><code class="language-c">#include &lt;stdio.h&gt;
int main()
{
    int a, b, c;
    scanf("%d %d", &amp;a, &amp;b);
    c = a + b;
    printf("Result = %d", c);
    return 0;
}</code></pre>
      </div>
    </div>
  </section>

  <section class="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 md:p-8 rounded-3xl border border-cyan-200">
    <h3 class="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v4H6zM6 10h12v4H6zM6 16h12v4H6z"/></svg>
      গুরুত্বপূর্ণ সূত্রভিত্তিক প্রোগ্রাম
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">দুটি সংখ্যার গড়</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">#include &lt;stdio.h&gt;
int main()
{
    float a, b, avg;
    scanf("%f %f", &amp;a, &amp;b);
    avg = (a + b) / 2;
    printf("%.2f", avg);
    return 0;
}</code></pre>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">সেলসিয়াস থেকে ফারেনহাইট</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">#include &lt;stdio.h&gt;
int main()
{
    float c, f;
    scanf("%f", &amp;c);
    f = (9 * c / 5) + 32;
    printf("%.2f", f);
    return 0;
}</code></pre>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">ত্রিভুজের ক্ষেত্রফল</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">#include &lt;stdio.h&gt;
int main()
{
    float b, h, area;
    scanf("%f %f", &amp;b, &amp;h);
    area = 0.5 * b * h;
    printf("%.2f", area);
    return 0;
}</code></pre>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">তিন বাহু দিয়ে ত্রিভুজের ক্ষেত্রফল</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">#include &lt;stdio.h&gt;
#include &lt;math.h&gt;
int main()
{
    float a, b, c, s, area;
    scanf("%f %f %f", &amp;a, &amp;b, &amp;c);
    s = (a + b + c) / 2;
    area = sqrt(s * (s-a) * (s-b) * (s-c));
    printf("%.2f", area);
    return 0;
}</code></pre>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">আয়তক্ষেত্র ও বৃত্তের ক্ষেত্রফল</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">area_rectangle = length * width;
area_circle = 3.1416 * r * r;</code></pre>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">ফারেনহাইট থেকে কেলভিন</h4>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto"><code class="language-c">kelvin = (fahrenheit - 32) * 5 / 9 + 273.15;</code></pre>
      </div>
    </div>
  </section>
</div>
`;
