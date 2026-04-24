export const notes = `
<div class="space-y-10">

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20">
      <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg> 
    </div>
    <div class="relative z-10">
      <div class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-purple-100 font-semibold text-sm mb-4 border border-white/30 truncate">
        অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tight">কম্পিউটার কোড (Computer Code) ⌨️</h2>
      <p class="text-purple-100 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mb-6">
        কম্পিউটার আমাদের ভাষা (A, B, ?, +, -, অ, আ) বোঝে না। সে শুধু 0 এবং 1 বোঝে। তাই মানুষের ব্যবহৃত অক্ষর, অঙ্ক বা গাণিতিক চিহ্নগুলোকে কম্পিউটারের বোধগম্য (0,1) ভাষায় রূপান্তর করার জন্য ব্যবহৃত সংকেতকেই কোড (Code) বলা হয়।
      </p>
    </div>
  </div>

  <!-- Types of Codes -->
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200/50 dark:border-indigo-700/50">
    <h3 class="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 flex items-center gap-3 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
      <span class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-xl">🔠</span> বিভিন্ন প্রকার কোড
    </h3>
    
    <div class="space-y-6">
      
      <!-- BCD Code -->
      <div class="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2">১. BCD (Binary Coded Decimal) কোড</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
          দশমিক সংখ্যার (0-9) প্রতিটি অঙ্ককে সমতুল্য <strong>৪-বিট বাইনারি</strong> সংখ্যা দ্বারা প্রকাশ করার পদ্ধতিকেই BCD কোড বলে। এটি কোনো সংখ্যা পদ্ধতি নয়, এটি কেবল দশমিক সংখ্যাকে প্রকাশ করার একটি কোড। সবচেয়ে জনপ্রিয় BCD কোড হলো 8421 কোড।
        </p>
        <div class="font-mono text-sm bg-white dark:bg-slate-800 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800/50">
          উদাহরণ: (137)₁₀ কে BCD কোডে রূপান্তর<br/>
          1 = 0001, 3 = 0011, 7 = 0111<br/>
          সুতরাং, (137)₁₀ = (0001 0011 0111)BCD
        </div>
      </div>

      <!-- Alphanumeric Code -->
      <div class="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-2xl border border-purple-100 dark:border-purple-800/30">
        <h4 class="font-bold text-lg text-purple-800 dark:text-purple-300 mb-2">২. আলফানিউমেরিক (Alphanumeric) কোড</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
          অক্ষর (A-Z, a-z), অঙ্ক (0-9) এবং গাণিতিক ও বিশেষ চিহ্নগুলোকে ($, #, @, +, -, /) কম্পিউটারে প্রকাশের জন্য ব্যবহৃত কোডকে আলফানিউমেরিক কোড বলে। 
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-purple-200 dark:border-purple-800/50">
            <h5 class="font-bold text-purple-700 dark:text-purple-400">ASCII</h5>
            <p class="text-xs text-slate-500 mt-1">American Standard Code for Information Interchange. এটি ৭ বিট (ASCII-7) বা ৮ বিট (ASCII-8) এর হতে পারে। এটি দিয়ে 2⁸ = 256 টি চিহ্ন প্রকাশ করা যায়।</p>
          </div>
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-purple-200 dark:border-purple-800/50">
            <h5 class="font-bold text-purple-700 dark:text-purple-400">EBCDIC</h5>
            <p class="text-xs text-slate-500 mt-1">Extended Binary Coded Decimal Interchange Code. এটি ৮ বিটের কোড। প্রধানত IBM মেইনফ্রেম কম্পিউটারে ব্যবহৃত হয়। 256 টি চিহ্ন প্রকাশ করা যায়।</p>
          </div>
          <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-purple-200 dark:border-purple-800/50">
            <h5 class="font-bold text-purple-700 dark:text-purple-400">Unicode</h5>
            <p class="text-xs text-slate-500 mt-1">বিশ্বের সকল ভাষাকে (বাংলা, চাইনিজ, আরবি ইত্যাদি) কম্পিউটারে প্রকাশের জন্য এটি তৈরি। এটি <strong>১৬ বিট</strong> এর কোড। এর মাধ্যমে 2¹⁶ = 65,536 টি চিহ্ন প্রকাশ করা যায়!</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- BCD vs Binary -->
  <div class="bg-gradient-to-r from-sky-100 to-cyan-100 dark:from-sky-900/30 dark:to-cyan-900/30 p-6 md:p-8 rounded-3xl shadow-md border border-sky-200 dark:border-sky-800/50">
    <h3 class="text-xl font-bold text-sky-800 dark:text-sky-400 mb-4 flex items-center gap-2">
      <span class="p-1.5 bg-sky-200 dark:bg-sky-800/50 rounded-xl">⚖️</span> BCD এবং বাইনারি সংখ্যার পার্থক্য
    </h3>
    <div class="overflow-x-auto bg-white/50 dark:bg-slate-800/50 rounded-2xl">
      <table class="w-full text-sm text-left text-slate-700 dark:text-slate-300">
        <thead class="text-xs uppercase bg-sky-200/50 dark:bg-sky-900/50 text-sky-900 dark:text-sky-200">
          <tr>
            <th class="px-4 py-3">পার্থক্যর বিষয়</th>
            <th class="px-4 py-3 border-l border-sky-200 dark:border-sky-800">BCD কোড</th>
            <th class="px-4 py-3 border-l border-sky-200 dark:border-sky-800">বাইনারি সংখ্যা</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-sky-100 dark:border-sky-800/30">
            <td class="px-4 py-3 font-semibold">সংজ্ঞা</td>
            <td class="px-4 py-3 border-l border-sky-200 dark:border-sky-800">এটি কোনো গাণিতিক সংখ্যা পদ্ধতি নয়, এটি একটি কোডিং পদ্ধতি।</td>
            <td class="px-4 py-3 border-l border-sky-200 dark:border-sky-800">এটি একটি পজিশনাল বা স্থানিক গাণিতিক সংখ্যা পদ্ধতি।</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-semibold">প্রকাশ</td>
            <td class="px-4 py-3 border-l border-sky-200 dark:border-sky-800">দশমিকের প্রতিটি অঙ্ককে আলাদাভাবে ৪ বিট দিয়ে প্রকাশ করা হয়।</td>
            <td class="px-4 py-3 border-l border-sky-200 dark:border-sky-800">সম্পূর্ণ সংখ্যাটিকে ২ দিয়ে বারবার ভাগ করে প্রকাশ করা হয়।</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</div>
`;
