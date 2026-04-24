export const notes = `
<div class="space-y-10">
  <section class="bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-full font-semibold text-sm mb-5 border border-white/25">
      <svg class="w-5 h-5 text-cyan-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h10M4 18h16"/><path d="M18 9l3 3-3 3"/></svg>
      অধ্যায় ৫
    </div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">অ্যালগরিদম, ফ্লোচার্ট ও ডিবাগিং</h2>
    <p class="text-cyan-100 text-lg font-medium max-w-3xl">প্রোগ্রাম লেখার আগে সমস্যাকে ধাপে ধাপে সাজানো, চিত্রে প্রকাশ করা এবং ভুল শনাক্ত করার প্রিমিয়াম বোর্ড নোট।</p>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M8.5 14a6 6 0 1 1 7 0c-.8.6-1.5 1.5-1.5 2.5h-4c0-1-.7-1.9-1.5-2.5Z"/></svg>
      অ্যালগরিদম
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-200">
        <h4 class="font-bold text-indigo-700 mb-2">সংজ্ঞা</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">কোনো নির্দিষ্ট সমস্যা সমাধানের জন্য যুক্তিসম্মত, সসীম সংখ্যক, পর্যায়ক্রমিক ধাপের বর্ণনাকে অ্যালগরিদম বলে। প্রোগ্রামিংয়ের আগে কাগজে-কলমে সমাধান সাজাতে এটি ব্যবহৃত হয়। অ্যালগরিদম শব্দটি আরব গণিতবিদ আল-খারিজমীর নাম থেকে এসেছে।</p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-2">তৈরির শর্ত</h4>
        <ul class="text-sm leading-7 text-slate-700 dark:text-slate-300 list-disc list-inside">
          <li>ইনপুট ও আউটপুট স্পষ্টভাবে নির্ধারণ করতে হবে।</li>
          <li>প্রতিটি ধাপ নির্দিষ্ট ও দ্ব্যর্থহীন হতে হবে।</li>
          <li>সসীম সংখ্যক ধাপে সমাধান শেষ হতে হবে।</li>
          <li>ব্যাপকভাবে প্রয়োগযোগ্য হতে হবে।</li>
          <li>কোনো নির্দিষ্ট প্রোগ্রামিং ভাষার কোড থাকা যাবে না।</li>
        </ul>
      </div>
    </div>
    <div class="mt-5 bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
      <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-3">অ্যালগরিদমের সুবিধা</h4>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
        <div class="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border">উদ্দেশ্য বোঝা সহজ</div>
        <div class="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border">ভাষা নিরপেক্ষ</div>
        <div class="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border">ডিবাগিং সহজ</div>
        <div class="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border">নির্দিষ্ট পদ্ধতি দেয়</div>
        <div class="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border">পরিবর্তন সহজ</div>
      </div>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-200/50">
    <h3 class="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="5" rx="2"/><path d="M12 8v4"/><path d="M8 12h8"/><path d="M8 16h8"/><rect x="4" y="16" width="16" height="5" rx="2"/></svg>
      ফ্লোচার্ট
    </h3>
    <p class="text-sm leading-7 text-slate-700 dark:text-slate-300 mb-5">ফ্লোচার্ট হলো অ্যালগরিদমের চিত্ররূপ। বিশেষ প্রতীক ব্যবহার করে কোনো সিস্টেম বা প্রোগ্রামের কাজের প্রবাহ দেখানো হয়। এটি প্রোগ্রামার ও ব্যবহারকারীর মধ্যে যোগাযোগ সহজ করে।</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-2">সিস্টেম ফ্লোচার্ট</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">ডেটা গ্রহণ, প্রক্রিয়াকরণ, সংরক্ষণ এবং ফলাফল প্রদর্শনের সামগ্রিক প্রবাহ দেখায়।</p>
      </div>
      <div class="p-5 rounded-2xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200">
        <h4 class="font-bold text-sky-700 mb-2">প্রোগ্রাম ফ্লোচার্ট</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300">একটি প্রোগ্রামের ধাপ, সিদ্ধান্ত, পুনরাবৃত্তি ও আউটপুটের বিস্তারিত প্রবাহ দেখায়।</p>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-cyan-100 dark:bg-cyan-900/50">
          <tr><th class="px-4 py-3 text-left rounded-tl-xl">চিহ্ন</th><th class="px-4 py-3 text-left">নাম</th><th class="px-4 py-3 text-left rounded-tr-xl">ব্যবহার</th></tr>
        </thead>
        <tbody>
          <tr class="border-b"><td class="px-4 py-3 font-mono">Oval</td><td class="px-4 py-3">Terminal / ডিম্বক</td><td class="px-4 py-3">শুরু ও শেষ</td></tr>
          <tr class="border-b bg-cyan-50/40"><td class="px-4 py-3 font-mono">Parallelogram</td><td class="px-4 py-3">সামন্তরিক</td><td class="px-4 py-3">ইনপুট ও আউটপুট</td></tr>
          <tr class="border-b"><td class="px-4 py-3 font-mono">Rectangle</td><td class="px-4 py-3">আয়তক্ষেত্র</td><td class="px-4 py-3">প্রক্রিয়াকরণ</td></tr>
          <tr class="border-b bg-cyan-50/40"><td class="px-4 py-3 font-mono">Diamond</td><td class="px-4 py-3">হীরক / রম্বস</td><td class="px-4 py-3">শর্ত বা সিদ্ধান্ত</td></tr>
          <tr class="border-b"><td class="px-4 py-3 font-mono">Circle</td><td class="px-4 py-3">সংযোগ প্রতীক</td><td class="px-4 py-3">একাধিক শাখা যুক্ত করা</td></tr>
          <tr><td class="px-4 py-3 font-mono">Arrow</td><td class="px-4 py-3">তীর চিহ্ন</td><td class="px-4 py-3">প্রবাহের দিক</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-900/60 dark:to-indigo-900/20 p-6 md:p-8 rounded-3xl border border-indigo-200">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>
      অ্যালগরিদম ও ফ্লোচার্টের পার্থক্য
    </h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-indigo-100 dark:bg-indigo-900/50">
          <tr><th class="px-4 py-3 text-left rounded-tl-xl">অ্যালগরিদম</th><th class="px-4 py-3 text-left rounded-tr-xl">ফ্লোচার্ট</th></tr>
        </thead>
        <tbody>
          <tr class="border-b"><td class="px-4 py-3">ভাষাভিত্তিক ও বর্ণনামূলক।</td><td class="px-4 py-3">চিত্রভিত্তিক উপস্থাপন।</td></tr>
          <tr class="border-b bg-indigo-50/40"><td class="px-4 py-3">প্রোগ্রামের প্রবাহ বোঝা তুলনামূলক কঠিন।</td><td class="px-4 py-3">প্রবাহের দিক সহজে বোঝা যায়।</td></tr>
          <tr><td class="px-4 py-3">ভুল শনাক্ত করা কিছুটা কঠিন।</td><td class="px-4 py-3">ভুল-ত্রুটি খুঁজে বের করা সহজ।</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-rose-200/50">
    <h3 class="text-2xl font-bold text-rose-800 dark:text-rose-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l9 16H3L12 3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      বাগ, ডিবাগিং ও Error
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200"><h4 class="font-bold text-rose-700 mb-1">Bug</h4><p class="text-sm text-slate-700 dark:text-slate-300">প্রোগ্রামের ভুল বা ত্রুটি।</p></div>
      <div class="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200"><h4 class="font-bold text-orange-700 mb-1">Debugging</h4><p class="text-sm text-slate-700 dark:text-slate-300">ভুল-ত্রুটি শনাক্ত ও সংশোধনের প্রক্রিয়া।</p></div>
      <div class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200"><h4 class="font-bold text-amber-700 mb-1">Syntax / Runtime Error</h4><p class="text-sm text-slate-700 dark:text-slate-300">Syntax error নিয়ম ভাঙলে; runtime error প্রোগ্রাম চলার সময় দেখা দেয়।</p></div>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-slate-200/70">
    <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-slate-600 dark:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 7h8M8 12h8M8 17h6"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
      বোর্ড-স্ট্যান্ডার্ড তুলনামূলক লেআউট
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200">
        <h4 class="font-bold text-indigo-700 mb-3">অ্যালগরিদম: দুটি সংখ্যার গড়</h4>
        <ol class="list-decimal list-inside text-sm leading-7 text-slate-700 dark:text-slate-300">
          <li>শুরু।</li><li>a ও b গ্রহণ।</li><li>avg = (a + b) / 2 নির্ণয়।</li><li>avg প্রদর্শন।</li><li>শেষ।</li>
        </ol>
      </div>
      <div class="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">ফ্লোচার্ট বিবরণ</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">Terminal: Start → Input: a,b → Process: avg=(a+b)/2 → Output: avg → Terminal: End</p>
      </div>
      <div class="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
        <div class="px-4 py-2 bg-slate-900 text-slate-300 text-xs font-bold">C Code</div>
        <pre class="p-4 text-xs text-green-300 overflow-x-auto"><code class="language-c">#include &lt;stdio.h&gt;
int main() {
  float a, b, avg;
  scanf("%f %f", &amp;a, &amp;b);
  avg = (a + b) / 2;
  printf("Average = %.2f", avg);
  return 0;
}</code></pre>
      </div>
    </div>
  </section>
</div>
`;
