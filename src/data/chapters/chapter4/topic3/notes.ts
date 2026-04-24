export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-emerald-100 font-semibold text-sm mb-4 border border-white/30">
        অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি ও HTML
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">HTML এর মৌলিক বিষয়সমূহ 📄</h2>
      <p class="text-emerald-100 leading-relaxed text-lg font-medium max-w-3xl">
        HTML এর সংজ্ঞা, বৈশিষ্ট্য, ট্যাগের প্রকারভেদ, এলিমেন্ট, অ্যাট্রিবিউট এবং ওয়েবপেজের মৌলিক কাঠামো।
      </p>
    </div>
  </div>

  <!-- HTML Basics -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/50">
    <h3 class="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-5 border-b border-emerald-100 dark:border-emerald-900/50 pb-3">📌 HTML এর মৌলিক তথ্য</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-3">
        <div class="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex gap-3">
          <span class="text-emerald-600 font-bold">পূর্ণরূপ:</span>
          <span class="text-slate-700 dark:text-slate-300">HyperText Markup Language</span>
        </div>
        <div class="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex gap-3">
          <span class="text-emerald-600 font-bold">আবিষ্কারক:</span>
          <span class="text-slate-700 dark:text-slate-300">টিম বার্নার্স-লি (১৯৮৯)</span>
        </div>
        <div class="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex gap-3">
          <span class="text-emerald-600 font-bold">সর্বশেষ ভার্সন:</span>
          <span class="text-slate-700 dark:text-slate-300">HTML 5</span>
        </div>
        <div class="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex gap-3">
          <span class="text-emerald-600 font-bold">ফাইল এক্সটেনশন:</span>
          <span class="text-slate-700 dark:text-slate-300 font-mono">.html অথবা .htm</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
          <p class="font-bold text-green-700 dark:text-green-300 mb-1">✅ HTML এর সুবিধা:</p>
          <ul class="text-slate-700 dark:text-slate-300 text-sm space-y-1 list-disc list-inside">
            <li>অধিকাংশ ব্রাউজার সাপোর্ট করে</li>
            <li>সিনটেক্স সহজ, শেখা সহজ</li>
            <li>যেকোনো টেক্সট এডিটরে কোড লেখা যায়</li>
            <li>কেস সেনসিটিভ নয়</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl">
          <p class="font-bold text-red-700 dark:text-red-300 mb-1">❌ HTML এর অসুবিধা:</p>
          <ul class="text-slate-700 dark:text-slate-300 text-sm space-y-1 list-disc list-inside">
            <li>শুধু স্ট্যাটিক ওয়েবপেইজ তৈরি যায়</li>
            <li>ছোট পেজেও অনেক কোড লিখতে হয়</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- HTML Structure -->
  <div class="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-6 md:p-8 rounded-3xl border border-emerald-200 dark:border-emerald-800/50">
    <h3 class="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-5">🏗️ HTML ডকুমেন্টের মৌলিক কাঠামো</h3>
    <div class="bg-slate-900 rounded-2xl p-5 font-mono text-sm overflow-x-auto">
      <p class="text-slate-400">&lt;!DOCTYPE html&gt;</p>
      <p class="text-green-400">&lt;html&gt;</p>
      <p class="text-blue-400 ml-4">&lt;head&gt;</p>
      <p class="text-yellow-400 ml-8">&lt;title&gt;<span class="text-white">Page Title</span>&lt;/title&gt;</p>
      <p class="text-blue-400 ml-4">&lt;/head&gt;</p>
      <p class="text-purple-400 ml-4">&lt;body&gt;</p>
      <p class="text-slate-300 ml-8">...ওয়েবপেজের মূল কনটেন্ট...</p>
      <p class="text-purple-400 ml-4">&lt;/body&gt;</p>
      <p class="text-green-400">&lt;/html&gt;</p>
    </div>
  </div>

  <!-- Tags -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-teal-200/50 dark:border-teal-700/50">
    <h3 class="text-2xl font-bold text-teal-800 dark:text-teal-400 mb-5">🏷️ HTML ট্যাগের প্রকারভেদ</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
      <div class="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-2xl border border-teal-200 dark:border-teal-800">
        <h4 class="font-bold text-teal-700 dark:text-teal-300 mb-2">১. কন্টেইনার ট্যাগ</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-2">ওপেনিং ট্যাগ ও ক্লোজিং ট্যাগ দুটোই থাকে।</p>
        <div class="bg-slate-900 rounded-xl p-3 font-mono text-sm text-green-400"><span class="text-blue-400">&lt;b&gt;</span><span class="text-white"> This </span><span class="text-blue-400">&lt;/b&gt;</span></div>
        <p class="text-xs text-teal-600 dark:text-teal-400 mt-2">উদা: &lt;b&gt;, &lt;i&gt;, &lt;p&gt;, &lt;h1&gt;, &lt;table&gt;</p>
      </div>
      <div class="bg-green-50 dark:bg-green-900/20 p-5 rounded-2xl border border-green-200 dark:border-green-800">
        <h4 class="font-bold text-green-700 dark:text-green-300 mb-2">২. এম্পটি ট্যাগ</h4>
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-2">শুধু ওপেনিং ট্যাগ থাকে, ক্লোজিং ট্যাগ নেই।</p>
        <div class="bg-slate-900 rounded-xl p-3 font-mono text-sm text-yellow-400">&lt;br&gt; &lt;hr&gt; &lt;img&gt; &lt;input&gt;</div>
        <p class="text-xs text-green-600 dark:text-green-400 mt-2">উদা: &lt;hr&gt;, &lt;img&gt;, &lt;br&gt;, &lt;meta&gt;, &lt;link&gt;</p>
      </div>
    </div>

    <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
      <h4 class="font-bold text-emerald-700 dark:text-emerald-300 mb-3">📖 মূল পরিভাষা</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-700 dark:text-slate-300">
        <div class="p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl"><strong>HTML এলিমেন্ট:</strong> ওপেনিং ট্যাগ থেকে ক্লোজিং ট্যাগ পর্যন্ত সকল কিছু।</div>
        <div class="p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl"><strong>HTML কনটেন্ট:</strong> ওপেনিং ও ক্লোজিং ট্যাগের মাঝের সব কিছু।</div>
        <div class="p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl"><strong>HTML অ্যাট্রিবিউট:</strong> Opening Tag-এর ভেতরে অতিরিক্ত তথ্য যা এলিমেন্টের বৈশিষ্ট্য নির্ধারণ করে।</div>
      </div>
    </div>
  </div>

  <!-- Heading Tags -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/50">
    <h3 class="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-5">📏 HTML হেডিং ট্যাগ (৬ ধরনের)</h3>
    <div class="space-y-2">
      <div class="flex items-center gap-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl"><span class="font-mono text-xs text-slate-500 w-16">&lt;h1&gt;</span><span class="text-2xl font-black text-emerald-700 dark:text-emerald-300">সবচেয়ে বড়</span></div>
      <div class="flex items-center gap-4 p-3 bg-emerald-50/70 dark:bg-emerald-900/15 rounded-xl"><span class="font-mono text-xs text-slate-500 w-16">&lt;h2&gt;</span><span class="text-xl font-bold text-emerald-700 dark:text-emerald-300">দ্বিতীয় বড়</span></div>
      <div class="flex items-center gap-4 p-3 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl"><span class="font-mono text-xs text-slate-500 w-16">&lt;h3&gt;</span><span class="text-lg font-bold text-emerald-700 dark:text-emerald-300">তৃতীয় বড়</span></div>
      <div class="flex items-center gap-4 p-3 bg-emerald-50/30 dark:bg-emerald-900/5 rounded-xl"><span class="font-mono text-xs text-slate-500 w-16">&lt;h6&gt;</span><span class="text-sm font-bold text-emerald-700 dark:text-emerald-300">সবচেয়ে ছোট</span></div>
    </div>
  </div>

</div>
`;
