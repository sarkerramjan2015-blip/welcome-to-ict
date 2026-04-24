export const notes = `
<div class="space-y-10">
  <section class="bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
    <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-full font-semibold text-sm mb-5 border border-white/25">
      <svg class="w-5 h-5 text-cyan-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h10"/><path d="M18 15l3 3-3 3"/></svg>
      অধ্যায় ৫
    </div>
    <h2 class="text-3xl md:text-4xl font-black mb-4">প্রোগ্রাম ডিজাইন মডেল ও সি প্রোগ্রামের গঠন</h2>
    <p class="text-cyan-100 text-lg font-medium max-w-3xl">কার্যকরী প্রোগ্রাম তৈরির নকশা, প্রোগ্রামিং প্যারাডাইম, সি ভাষার উৎপত্তি এবং একটি সি প্রোগ্রামের প্রতিটি অংশের বিশ্লেষণ।</p>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200/50">
    <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v4H4zM14 15h6v4h-6z"/><path d="M10 8h4M10 17h4"/></svg>
      প্রোগ্রাম ডিজাইন মডেল
    </h3>
    <p class="text-sm leading-7 text-slate-700 dark:text-slate-300 mb-5">প্রোগ্রাম ডিজাইন মডেল হলো কার্যকর, ত্রুটিমুক্ত ও রক্ষণাবেক্ষণযোগ্য প্রোগ্রাম তৈরির পরিকল্পনা ও নীতিমালা। কোডিংয়ের আগে সমস্যা বিশ্লেষণ, অ্যালগরিদম, ফ্লোচার্ট, সুডোকোড ও মডিউল পরিকল্পনা করা হয়।</p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-2">স্ট্রাকচার্ড প্রোগ্রামিং</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">১৯৬৬ সালে ধারণা, ১৯৭০ সালে ব্যাপক ব্যবহার। সমস্যাকে ছোট মডিউল বা ফাংশনে ভাগ করে top-down পদ্ধতিতে সমাধান করা হয়। মূল গঠন: sequence, decision ও loop। উদাহরণ: C, COBOL, Pascal।</p>
      </div>
      <div class="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-2">অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">ডেটা-কেন্দ্রিক পদ্ধতি। Object, Class, Encapsulation, Polymorphism ও Inheritance এর সাহায্যে বাস্তব জগতের বস্তু মডেল করা হয়। উদাহরণ: C++, Java, Python।</p>
      </div>
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-200">
        <h4 class="font-bold text-indigo-700 mb-2">ভিজ্যুয়াল প্রোগ্রামিং</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">চিত্রভিত্তিক নির্দেশ, ফর্ম, বাটন ও কন্ট্রোল ব্যবহার করে প্রোগ্রাম তৈরি করা হয়। এটি structured বা OOP ভিত্তিতে কাজ করতে পারে। উদাহরণ: Visual Basic।</p>
      </div>
      <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-200">
        <h4 class="font-bold text-slate-700 dark:text-slate-200 mb-2">ইভেন্ট ড্রাইভেন প্রোগ্রামিং</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">কীবোর্ড, মাউস ক্লিক, মেনু নির্বাচন বা বাটন ক্লিকের মতো event ঘটলে নির্দিষ্ট কোড চালানো হয়। GUI অ্যাপ্লিকেশনে এটি অত্যন্ত গুরুত্বপূর্ণ।</p>
      </div>
    </div>
  </section>

  <section class="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 md:p-8 rounded-3xl border border-cyan-200">
    <h3 class="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v18M16 3v18"/><path d="M3 8h18M3 16h18"/></svg>
      সি প্রোগ্রামিং ভাষার প্রাথমিক ধারণা
    </h3>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-2">উৎপত্তি</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">ডেনিস রিচি Bell Laboratories-এ UNIX অপারেটিং সিস্টেম তৈরির সময় C ভাষা উন্নয়ন করেন। ১৯৭২ সালে DEC PDP-11 কম্পিউটারে প্রথম বাস্তবায়িত হয়।</p>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-2">নামকরণ</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">Martin Richards-এর BCPL ভাষা সংক্ষেপে B নামে পরিচিত ছিল। B ভাষার উন্নয়নের ধারাবাহিকতায় C ভাষার বিকাশ ঘটে।</p>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-2">মধ্যম স্তরের ভাষা</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">C উচ্চস্তরের data type, function, control statement দেয়; আবার pointer ও memory access দিয়ে নিম্নস্তরের কাজও করতে পারে। তাই একে mid-level language বলা হয়।</p>
      </div>
    </div>
    <div class="mt-5 bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto">
      <pre><code class="language-c">#include &lt;stdio.h&gt;

int main()
{
    int x, y, sum;
    printf("x er man likh: ");
    scanf("%d", &amp;x);
    printf("y er man likh: ");
    scanf("%d", &amp;y);
    sum = x + y;
    printf("Jogfol = %d", sum);
    return 0;
}</code></pre>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50">
    <h3 class="text-2xl font-bold text-indigo-800 dark:text-indigo-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>
      সি প্রোগ্রামের অংশ বিশ্লেষণ
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div class="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200"><h4 class="font-bold text-indigo-700 mb-1">Header File</h4><p class="text-sm text-slate-700 dark:text-slate-300">stdio.h ফাইলে printf() ও scanf() এর prototype থাকে। math.h, string.h, conio.h প্রাসঙ্গিক কাজের জন্য ব্যবহৃত হয়।</p></div>
      <div class="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200"><h4 class="font-bold text-blue-700 mb-1">main() Function</h4><p class="text-sm text-slate-700 dark:text-slate-300">প্রতিটি C প্রোগ্রামে main() আবশ্যিক। এখান থেকেই program execution শুরু হয়।</p></div>
      <div class="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200"><h4 class="font-bold text-cyan-700 mb-1">Declaration</h4><p class="text-sm text-slate-700 dark:text-slate-300">int x, y, sum; লাইনে তিনটি integer variable ঘোষণা করা হয়েছে।</p></div>
      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200"><h4 class="font-bold text-slate-700 dark:text-slate-200 mb-1">Input, Process, Output</h4><p class="text-sm text-slate-700 dark:text-slate-300">scanf() ইনপুট নেয়, sum = x + y প্রক্রিয়াকরণ করে, printf() ফলাফল দেখায়। return 0 সফল সমাপ্তি নির্দেশ করে।</p></div>
    </div>
  </section>

  <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-200/50">
    <h3 class="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-5 flex items-center gap-3">
      <svg class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/><path d="M8 6v12M16 6v12"/></svg>
      অ্যালগরিদম, ফ্লোচার্ট ও C কোড: দুটি সংখ্যার যোগফল
    </h3>
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200">
        <h4 class="font-bold text-blue-700 mb-3">Algorithm</h4>
        <ol class="text-sm leading-7 text-slate-700 dark:text-slate-300 list-decimal list-inside">
          <li>শুরু।</li><li>a ও b এর মান গ্রহণ।</li><li>sum = a + b নির্ণয়।</li><li>sum প্রদর্শন।</li><li>শেষ।</li>
        </ol>
      </div>
      <div class="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-2xl border border-cyan-200">
        <h4 class="font-bold text-cyan-700 mb-3">Flowchart Description</h4>
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">Start → Input a,b → Process sum=a+b → Output sum → End। ইনপুটে সামন্তরিক, প্রসেসে আয়তক্ষেত্র এবং শুরু/শেষে terminal ব্যবহার করতে হবে।</p>
      </div>
      <div class="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto">
        <h4 class="font-bold text-cyan-200 mb-3">C Code</h4>
        <pre><code class="language-c">#include &lt;stdio.h&gt;
int main()
{
    int a, b, sum;
    scanf("%d %d", &amp;a, &amp;b);
    sum = a + b;
    printf("%d", sum);
    return 0;
}</code></pre>
      </div>
    </div>
  </section>
</div>
`;
