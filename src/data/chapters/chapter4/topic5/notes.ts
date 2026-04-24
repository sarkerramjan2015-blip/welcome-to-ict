export const notes = `
<div class="space-y-10">
  <div class="bg-gradient-to-br from-violet-900 via-purple-900 to-violet-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-violet-100 font-semibold text-sm mb-4 border border-white/30">অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি ও HTML</div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">টেক্সট ফরমেটিং ট্যাগ ✍️</h2>
    <p class="text-violet-100 text-lg font-medium max-w-3xl">HTML ফরমেটিং ট্যাগ — b, i, u, sub, sup, del, strong, em, small, big ইত্যাদি।</p>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-violet-200/50 dark:border-violet-700/50">
    <h3 class="text-2xl font-bold text-violet-800 dark:text-violet-400 mb-5">📝 HTML ফরমেটিং ট্যাগসমূহ</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-violet-100 dark:bg-violet-900/50 text-violet-900 dark:text-violet-200">
          <tr>
            <th class="px-4 py-3 text-left rounded-tl-xl">ট্যাগ</th>
            <th class="px-4 py-3 text-left">কাজ</th>
            <th class="px-4 py-3 text-left rounded-tr-xl">উদাহরণ আউটপুট</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-violet-600">&lt;b&gt;</td><td class="px-4 py-2">টেক্সট বোল্ড করে</td><td class="px-4 py-2"><strong>বোল্ড টেক্সট</strong></td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-violet-50/30"><td class="px-4 py-2 font-mono text-violet-600">&lt;i&gt;</td><td class="px-4 py-2">টেক্সট ইটালিক করে</td><td class="px-4 py-2"><em>ইটালিক টেক্সট</em></td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-violet-600">&lt;u&gt;</td><td class="px-4 py-2">আন্ডারলাইন করে</td><td class="px-4 py-2"><u>আন্ডারলাইন</u></td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-violet-50/30"><td class="px-4 py-2 font-mono text-violet-600">&lt;strong&gt;</td><td class="px-4 py-2">গুরুত্বপূর্ণ টেক্সট বোল্ড</td><td class="px-4 py-2"><strong>গুরুত্বপূর্ণ</strong></td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-violet-600">&lt;em&gt;</td><td class="px-4 py-2">Emphasized ইটালিক</td><td class="px-4 py-2"><em>emphasized</em></td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-violet-50/30"><td class="px-4 py-2 font-mono text-violet-600">&lt;sub&gt;</td><td class="px-4 py-2">সাবস্ক্রিপ্ট (নিচে)</td><td class="px-4 py-2">H₂O (পানি)</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-violet-600">&lt;sup&gt;</td><td class="px-4 py-2">সুপারস্ক্রিপ্ট (উপরে)</td><td class="px-4 py-2">a² + b²</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-violet-50/30"><td class="px-4 py-2 font-mono text-violet-600">&lt;del&gt;</td><td class="px-4 py-2">কাটা লাইন (strikethrough)</td><td class="px-4 py-2"><del>বাতিল</del></td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-violet-600">&lt;small&gt;</td><td class="px-4 py-2">ছোট টেক্সট</td><td class="px-4 py-2"><small>ছোট</small></td></tr>
          <tr><td class="px-4 py-2 font-mono text-violet-600">&lt;big&gt;</td><td class="px-4 py-2">বড় টেক্সট</td><td class="px-4 py-2">বড়</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 md:p-8 rounded-3xl border border-violet-200 dark:border-violet-800/50">
    <h3 class="text-xl font-bold text-violet-800 dark:text-violet-400 mb-4">⚡ সমার্থক ট্যাগের তুলনা</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-violet-100 dark:bg-violet-900/50"><tr><th class="px-4 py-3 text-left">কাজ</th><th class="px-4 py-3 text-left">পুরনো ট্যাগ</th><th class="px-4 py-3 text-left">আধুনিক ট্যাগ</th></tr></thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2">বোল্ড</td><td class="px-4 py-2 font-mono">&lt;b&gt;</td><td class="px-4 py-2 font-mono">&lt;strong&gt;</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-violet-50/30"><td class="px-4 py-2">ইটালিক</td><td class="px-4 py-2 font-mono">&lt;i&gt;</td><td class="px-4 py-2 font-mono">&lt;em&gt;</td></tr>
          <tr><td class="px-4 py-2">কাটা</td><td class="px-4 py-2 font-mono">&lt;strike&gt;</td><td class="px-4 py-2 font-mono">&lt;del&gt;</td></tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 p-4 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
      <p class="text-sm text-violet-800 dark:text-violet-200 font-semibold">💡 সূত্র: (a+b)² = a²+2ab+b² ওয়েবপেইজে লিখতে:</p>
      <div class="bg-slate-900 p-3 rounded-xl font-mono text-xs mt-2 text-green-400">(a+b)&lt;sup&gt;2&lt;/sup&gt; = a&lt;sup&gt;2&lt;/sup&gt;+2ab+b&lt;sup&gt;2&lt;/sup&gt;</div>
    </div>
  </div>
</div>
`;
