export const notes = `
<div class="space-y-10">
  <div class="bg-gradient-to-br from-rose-900 via-pink-900 to-rose-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-rose-100 font-semibold text-sm mb-4 border border-white/30">অধ্যায় ৪</div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">হাইপারলিংক 🔗</h2>
    <p class="text-rose-100 text-lg font-medium max-w-3xl">হাইপারলিংক কী, anchor ট্যাগ, href, target অ্যাট্রিবিউট এবং বিভিন্ন ধরনের হাইপারলিংক।</p>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-rose-200/50">
    <h3 class="text-2xl font-bold text-rose-800 dark:text-rose-400 mb-4">🔗 হাইপারলিংক কী?</h3>
    <p class="text-slate-700 dark:text-slate-300 mb-4">হাইপারলিংক হল একটি লিঙ্ক যা ওয়েবপেজের কোনো টেক্সট বা ছবিতে ক্লিক করে ব্যবহারকারীকে অন্য পেজে নিয়ে যায়।</p>
    <div class="bg-slate-900 p-4 rounded-2xl font-mono text-sm mb-4">
      <p class="text-white">&lt;<span class="text-blue-400">a</span> <span class="text-yellow-400">href</span>="<span class="text-green-400">URL</span>"&gt; link text &lt;/<span class="text-blue-400">a</span>&gt;</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
      <div class="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-2xl border border-rose-200"><h4 class="font-bold text-rose-700 mb-2">গ্লোবাল লিংক</h4><p class="text-sm text-slate-600 dark:text-slate-400">অন্য ওয়েবসাইটের সাথে লিংক</p></div>
      <div class="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-2xl border border-pink-200"><h4 class="font-bold text-pink-700 mb-2">লোকাল লিংক</h4><p class="text-sm text-slate-600 dark:text-slate-400">একই সাইটের অন্য পেজে</p></div>
      <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl border border-purple-200"><h4 class="font-bold text-purple-700 mb-2">ইন্টারনাল লিংক</h4><p class="text-sm text-slate-600 dark:text-slate-400">একই পেজের ভিন্ন সেকশনে</p></div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-rose-100 dark:bg-rose-900/50"><tr><th class="px-4 py-3 text-left rounded-tl-xl">অ্যাট্রিবিউট</th><th class="px-4 py-3 text-left">কাজ</th><th class="px-4 py-3 text-left rounded-tr-xl">উদাহরণ</th></tr></thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-rose-600">href</td><td class="px-4 py-2">লিংকের গন্তব্য URL</td><td class="px-4 py-2 font-mono text-xs">href="https://google.com"</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-rose-50/30"><td class="px-4 py-2 font-mono text-rose-600">target</td><td class="px-4 py-2">লিংক কোথায় খুলবে</td><td class="px-4 py-2 font-mono text-xs">target="_blank" (নতুন ট্যাবে)</td></tr>
          <tr><td class="px-4 py-2 font-mono text-rose-600">title</td><td class="px-4 py-2">মাউস hover-এ tooltip</td><td class="px-4 py-2 font-mono text-xs">title="Go to Google"</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;
