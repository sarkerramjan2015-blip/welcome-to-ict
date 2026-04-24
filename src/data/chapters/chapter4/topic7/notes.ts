export const notes = `
<div class="space-y-10">
  <div class="bg-gradient-to-br from-purple-900 via-violet-900 to-purple-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full font-semibold text-sm mb-4 border border-white/30">অধ্যায় ৪</div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">ছবি ও টেবিল 🖼️📊</h2>
    <p class="text-purple-100 text-lg font-medium max-w-3xl">HTML-এ img ট্যাগ দিয়ে ছবি এবং table, tr, td ট্যাগ দিয়ে টেবিল তৈরি।</p>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-purple-200/50">
    <h3 class="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-4">🖼️ ছবি যোগ করা — &lt;img&gt; ট্যাগ</h3>
    <div class="bg-slate-900 p-4 rounded-2xl font-mono text-sm mb-4">
      <p class="text-white">&lt;<span class="text-blue-400">img</span> <span class="text-yellow-400">src</span>="<span class="text-green-400">image.jpg</span>" <span class="text-yellow-400">alt</span>="<span class="text-green-400">description</span>" <span class="text-yellow-400">width</span>="<span class="text-green-400">200</span>" <span class="text-yellow-400">height</span>="<span class="text-green-400">300</span>"&gt;</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
      <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl text-center text-sm"><strong>src</strong><br/><span class="text-xs text-slate-500">ছবির লোকেশন</span></div>
      <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl text-center text-sm"><strong>alt</strong><br/><span class="text-xs text-slate-500">বিকল্প টেক্সট</span></div>
      <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl text-center text-sm"><strong>width</strong><br/><span class="text-xs text-slate-500">প্রস্থ (px)</span></div>
      <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl text-center text-sm"><strong>height</strong><br/><span class="text-xs text-slate-500">উচ্চতা (px)</span></div>
    </div>
    <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-3">ছবির ফরম্যাটসমূহ:</h4>
    <div class="overflow-x-auto">
      <table class="w-full text-xs text-slate-700 dark:text-slate-300">
        <thead class="bg-purple-100 dark:bg-purple-900/50"><tr><th class="px-3 py-2 text-left">ফরম্যাট</th><th class="px-3 py-2 text-left">পূর্ণ নাম</th><th class="px-3 py-2 text-left">ব্যবহার</th></tr></thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-3 py-2 font-bold">JPG/JPEG</td><td class="px-3 py-2">Joint Photographic Group</td><td class="px-3 py-2">ফটোগ্রাফ</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-purple-50/30"><td class="px-3 py-2 font-bold">PNG</td><td class="px-3 py-2">Portable Network Graphics</td><td class="px-3 py-2">লোগো, আইকন</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-3 py-2 font-bold">GIF</td><td class="px-3 py-2">Graphics Interchange Format</td><td class="px-3 py-2">অ্যানিমেশন</td></tr>
          <tr><td class="px-3 py-2 font-bold">SVG</td><td class="px-3 py-2">Scalable Vector Graphics</td><td class="px-3 py-2">ভেক্টর গ্রাফিক্স</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 md:p-8 rounded-3xl border border-purple-200">
    <h3 class="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-4">📊 টেবিল তৈরি</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div class="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl text-center text-sm border"><strong class="font-mono">&lt;table&gt;</strong><br/><span class="text-xs text-slate-500">মূল ট্যাগ</span></div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl text-center text-sm border"><strong class="font-mono">&lt;tr&gt;</strong><br/><span class="text-xs text-slate-500">সারি (Row)</span></div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl text-center text-sm border"><strong class="font-mono">&lt;td&gt;</strong><br/><span class="text-xs text-slate-500">ডেটা সেল</span></div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl text-center text-sm border"><strong class="font-mono">&lt;th&gt;</strong><br/><span class="text-xs text-slate-500">হেডার সেল</span></div>
    </div>
    <div class="bg-slate-900 p-4 rounded-2xl font-mono text-xs">
      <p class="text-blue-400">&lt;table border="1"&gt;</p>
      <p class="text-green-400 ml-4">&lt;tr&gt;</p>
      <p class="text-yellow-400 ml-8">&lt;th&gt;<span class="text-white">নাম</span>&lt;/th&gt; &lt;th&gt;<span class="text-white">রোল</span>&lt;/th&gt;</p>
      <p class="text-green-400 ml-4">&lt;/tr&gt;</p>
      <p class="text-green-400 ml-4">&lt;tr&gt;</p>
      <p class="text-yellow-400 ml-8">&lt;td&gt;<span class="text-white">রাফি</span>&lt;/td&gt; &lt;td&gt;<span class="text-white">01</span>&lt;/td&gt;</p>
      <p class="text-green-400 ml-4">&lt;/tr&gt;</p>
      <p class="text-blue-400">&lt;/table&gt;</p>
    </div>
  </div>
</div>
`;
