export const notes = `
<div class="space-y-10">
  <div class="bg-gradient-to-br from-teal-900 via-cyan-900 to-teal-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full font-semibold text-sm mb-4 border border-white/30">অধ্যায় ৪</div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">তালিকা তৈরি (HTML List) 📋</h2>
    <p class="text-teal-100 text-lg font-medium max-w-3xl">অর্ডারড, আনঅর্ডারড, ডেসক্রিপশন ও নেস্টেড লিস্ট।</p>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-teal-200/50">
    <h3 class="text-2xl font-bold text-teal-800 dark:text-teal-400 mb-5">📋 HTML লিস্টের প্রকারভেদ</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-2xl border border-teal-200">
        <h4 class="font-bold text-teal-700 mb-2">১. অর্ডারড লিস্ট (&lt;ol&gt;)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-2">ক্রমিক সংখ্যা/অক্ষরে তালিকা।</p>
        <div class="bg-slate-900 p-3 rounded-xl font-mono text-xs text-green-400">&lt;ol type="1" start="1"&gt;\n  &lt;li&gt;আম&lt;/li&gt;\n  &lt;li&gt;কাঁঠাল&lt;/li&gt;\n&lt;/ol&gt;</div>
        <p class="text-xs text-teal-600 mt-2">type: 1, A, a, I, i</p>
      </div>
      <div class="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-2">২. আনঅর্ডারড লিস্ট (&lt;ul&gt;)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-2">বুলেট পয়েন্টে তালিকা।</p>
        <div class="bg-slate-900 p-3 rounded-xl font-mono text-xs text-green-400">&lt;ul type="disc"&gt;\n  &lt;li&gt;কমলা&lt;/li&gt;\n  &lt;li&gt;আপেল&lt;/li&gt;\n&lt;/ul&gt;</div>
        <p class="text-xs text-cyan-600 mt-2">type: disc, circle, square</p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-2">৩. ডেসক্রিপশন লিস্ট (&lt;dl&gt;)</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-2">শব্দ ও সংজ্ঞার তালিকা।</p>
        <div class="bg-slate-900 p-3 rounded-xl font-mono text-xs text-green-400">&lt;dl&gt;\n  &lt;dt&gt;HTML&lt;/dt&gt;\n  &lt;dd&gt;Markup Language&lt;/dd&gt;\n&lt;/dl&gt;</div>
      </div>
      <div class="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-2xl border border-purple-200">
        <h4 class="font-bold text-purple-700 mb-2">৪. নেস্টেড লিস্ট</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-2">একটি লিস্টের ভেতরে আরেকটি লিস্ট।</p>
        <div class="bg-slate-900 p-3 rounded-xl font-mono text-xs text-green-400">&lt;ul&gt;\n  &lt;li&gt;ফল&lt;/li&gt;\n  &lt;ol&gt;\n    &lt;li&gt;আম&lt;/li&gt;\n  &lt;/ol&gt;\n&lt;/ul&gt;</div>
      </div>
    </div>
  </div>
</div>
`;
