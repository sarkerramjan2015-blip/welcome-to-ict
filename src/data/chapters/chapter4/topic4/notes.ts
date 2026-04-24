export const notes = `
<div class="space-y-10">
  <div class="bg-gradient-to-br from-orange-900 via-amber-900 to-orange-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-orange-100 font-semibold text-sm mb-4 border border-white/30">অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি ও HTML</div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">HTML ট্যাগ ও সিনট্যাক্স 🏷️</h2>
    <p class="text-orange-100 text-lg font-medium max-w-3xl">HTML ট্যাগের সিনট্যাক্স, অ্যাট্রিবিউট, হেডিং ট্যাগ এবং বেসিক HTML কোড কাঠামো।</p>
  </div>

  <!-- HTML Syntax -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-orange-200/50 dark:border-orange-700/50">
    <h3 class="text-2xl font-bold text-orange-800 dark:text-orange-400 mb-5">📋 HTML সিনট্যাক্সের নিয়মাবলী</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
      <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl">
        <p class="font-bold text-orange-700 dark:text-orange-300 mb-2">ট্যাগের গঠন:</p>
        <div class="bg-slate-900 p-3 rounded-xl font-mono text-sm"><span class="text-blue-400">&lt;tagname</span> <span class="text-yellow-400">attribute="value"</span><span class="text-blue-400">&gt;</span><span class="text-white">content</span><span class="text-blue-400">&lt;/tagname&gt;</span></div>
      </div>
      <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl">
        <p class="font-bold text-orange-700 dark:text-orange-300 mb-2">উদাহরণ:</p>
        <div class="bg-slate-900 p-3 rounded-xl font-mono text-sm"><span class="text-blue-400">&lt;p</span> <span class="text-yellow-400">align="center"</span><span class="text-blue-400">&gt;</span><span class="text-white">Bangladesh</span><span class="text-blue-400">&lt;/p&gt;</span></div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-center border border-blue-200 dark:border-blue-800">
        <p class="font-bold text-blue-700 dark:text-blue-300">অ্যাট্রিবিউট</p>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1"><span class="font-mono">align</span> — Opening ট্যাগে থাকে</p>
      </div>
      <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl text-center border border-yellow-200 dark:border-yellow-800">
        <p class="font-bold text-yellow-700 dark:text-yellow-300">অ্যাট্রিবিউট ভ্যালু</p>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1"><span class="font-mono">"center"</span> — অ্যাট্রিবিউটের মান</p>
      </div>
      <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl text-center border border-green-200 dark:border-green-800">
        <p class="font-bold text-green-700 dark:text-green-300">কনটেন্ট</p>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1"><span class="font-mono">Bangladesh</span> — দুই ট্যাগের মাঝে</p>
      </div>
    </div>
  </div>

  <!-- Important Tags -->
  <div class="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 md:p-8 rounded-3xl border border-orange-200 dark:border-orange-800/50">
    <h3 class="text-2xl font-bold text-orange-800 dark:text-orange-400 mb-5">🔖 গুরুত্বপূর্ণ HTML ট্যাগসমূহ</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-orange-100 dark:bg-orange-900/50 text-orange-900 dark:text-orange-200">
          <tr>
            <th class="px-4 py-3 text-left rounded-tl-xl">ট্যাগ</th>
            <th class="px-4 py-3 text-left">কাজ</th>
            <th class="px-4 py-3 text-left rounded-tr-xl">প্রকার</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-orange-600">&lt;html&gt;</td><td class="px-4 py-2">HTML ডকুমেন্টের শুরু ও শেষ চিহ্নিত করে</td><td class="px-4 py-2">কন্টেইনার</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-orange-50/30"><td class="px-4 py-2 font-mono text-orange-600">&lt;head&gt;</td><td class="px-4 py-2">ডকুমেন্টের হেডার তথ্য (title, meta)</td><td class="px-4 py-2">কন্টেইনার</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-orange-600">&lt;body&gt;</td><td class="px-4 py-2">দৃশ্যমান কনটেন্ট রাখার স্থান</td><td class="px-4 py-2">কন্টেইনার</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-orange-50/30"><td class="px-4 py-2 font-mono text-orange-600">&lt;p&gt;</td><td class="px-4 py-2">প্যারাগ্রাফ তৈরি করে</td><td class="px-4 py-2">কন্টেইনার</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-orange-600">&lt;br&gt;</td><td class="px-4 py-2">লাইন ব্রেক করে</td><td class="px-4 py-2">এম্পটি</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-orange-50/30"><td class="px-4 py-2 font-mono text-orange-600">&lt;hr&gt;</td><td class="px-4 py-2">অনুভূমিক রেখা তৈরি করে</td><td class="px-4 py-2">এম্পটি</td></tr>
          <tr><td class="px-4 py-2 font-mono text-orange-600">&lt;h1&gt;–&lt;h6&gt;</td><td class="px-4 py-2">হেডিং তৈরি করে (৬ ধরনের)</td><td class="px-4 py-2">কন্টেইনার</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Font Tag -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-amber-200/50 dark:border-amber-700/50">
    <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-400 mb-4">🔤 &lt;font&gt; ট্যাগ ও অ্যাট্রিবিউট</h3>
    <p class="text-slate-700 dark:text-slate-300 mb-4">font ট্যাগের অ্যাট্রিবিউট <strong>color, face, size</strong> ব্যবহার করে টেক্সটের রং, ফন্ট ও সাইজ পরিবর্তন করা যায়।</p>
    <div class="bg-slate-900 p-4 rounded-2xl font-mono text-sm mb-4">
      <p class="text-blue-400">&lt;font <span class="text-yellow-400">color="red" face="Arial" size="5"</span>&gt;<span class="text-white">বাংলাদেশ</span>&lt;/font&gt;</p>
    </div>
    <div class="grid grid-cols-3 gap-3">
      <div class="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center text-sm"><strong>color</strong><br/><span class="text-slate-600 dark:text-slate-400">টেক্সটের রং</span></div>
      <div class="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center text-sm"><strong>face</strong><br/><span class="text-slate-600 dark:text-slate-400">টেক্সটের ফন্ট</span></div>
      <div class="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center text-sm"><strong>size</strong><br/><span class="text-slate-600 dark:text-slate-400">টেক্সটের সাইজ</span></div>
    </div>
  </div>
</div>
`;
