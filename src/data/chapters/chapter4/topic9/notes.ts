export const notes = `
<div class="space-y-10">
  <div class="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full font-semibold text-sm mb-4 border border-white/30">অধ্যায় ৪</div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">HTML ফর্ম (Form) 📝</h2>
    <p class="text-blue-100 text-lg font-medium max-w-3xl">ফর্মের সংজ্ঞা, form ট্যাগ, input ট্যাগ ও input type — text, password, radio, checkbox, submit ইত্যাদি।</p>
  </div>

  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">📝 HTML ফর্ম কী?</h3>
    <p class="text-slate-700 dark:text-slate-300 mb-4">ফর্ম হলো একটি ওয়েবপেইজের সেই অংশ যা ব্যবহারকারীর কাছ থেকে তথ্য সংগ্রহ করে। যেমন: লগইন, রেজিস্ট্রেশন ফর্ম।</p>
    <div class="bg-slate-900 p-4 rounded-2xl font-mono text-sm mb-5">
      <p class="text-blue-400">&lt;form <span class="text-yellow-400">action</span>="<span class="text-green-400">submit.php</span>" <span class="text-yellow-400">method</span>="<span class="text-green-400">post</span>"&gt;</p>
      <p class="text-white ml-4">...form elements...</p>
      <p class="text-blue-400">&lt;/form&gt;</p>
    </div>

    <h3 class="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">⌨️ &lt;input&gt; ট্যাগের প্রকারভেদ</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-slate-700 dark:text-slate-300">
        <thead class="bg-blue-100 dark:bg-blue-900/50">
          <tr><th class="px-4 py-3 text-left rounded-tl-xl">type</th><th class="px-4 py-3 text-left">কাজ</th><th class="px-4 py-3 text-left rounded-tr-xl">উদাহরণ</th></tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-blue-600">text</td><td class="px-4 py-2">সাধারণ টেক্সট ইনপুট</td><td class="px-4 py-2 font-mono text-xs">type="text"</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-blue-50/30"><td class="px-4 py-2 font-mono text-blue-600">password</td><td class="px-4 py-2">পাসওয়ার্ড (লুকানো)</td><td class="px-4 py-2 font-mono text-xs">type="password"</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-blue-600">radio</td><td class="px-4 py-2">একটির মধ্যে একটি বেছে নেওয়া</td><td class="px-4 py-2 font-mono text-xs">type="radio"</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-blue-50/30"><td class="px-4 py-2 font-mono text-blue-600">checkbox</td><td class="px-4 py-2">একাধিক বেছে নেওয়া</td><td class="px-4 py-2 font-mono text-xs">type="checkbox"</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700"><td class="px-4 py-2 font-mono text-blue-600">submit</td><td class="px-4 py-2">ফর্ম জমা দেওয়া</td><td class="px-4 py-2 font-mono text-xs">type="submit"</td></tr>
          <tr class="border-b border-slate-100 dark:border-slate-700 bg-blue-50/30"><td class="px-4 py-2 font-mono text-blue-600">reset</td><td class="px-4 py-2">ফর্ম রিসেট</td><td class="px-4 py-2 font-mono text-xs">type="reset"</td></tr>
          <tr><td class="px-4 py-2 font-mono text-blue-600">email</td><td class="px-4 py-2">ইমেইল ইনপুট</td><td class="px-4 py-2 font-mono text-xs">type="email"</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 md:p-8 rounded-3xl border border-blue-200">
    <h3 class="text-xl font-bold text-blue-800 dark:text-blue-400 mb-4">💡 ফর্ম উদাহরণ</h3>
    <div class="bg-slate-900 p-4 rounded-2xl font-mono text-xs overflow-x-auto">
      <p class="text-blue-400">&lt;form action="login.php" method="post"&gt;</p>
      <p class="text-white ml-4">&lt;label&gt;নাম:&lt;/label&gt;</p>
      <p class="text-white ml-4">&lt;<span class="text-yellow-400">input</span> <span class="text-green-400">type="text" name="name"</span>&gt;&lt;br&gt;</p>
      <p class="text-white ml-4">&lt;label&gt;পাসওয়ার্ড:&lt;/label&gt;</p>
      <p class="text-white ml-4">&lt;<span class="text-yellow-400">input</span> <span class="text-green-400">type="password" name="pass"</span>&gt;&lt;br&gt;</p>
      <p class="text-white ml-4">&lt;<span class="text-yellow-400">input</span> <span class="text-green-400">type="submit" value="লগইন"</span>&gt;</p>
      <p class="text-blue-400">&lt;/form&gt;</p>
    </div>
  </div>
</div>
`;
