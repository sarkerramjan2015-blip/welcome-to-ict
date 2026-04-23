export const notes = `
# বায়োইনফরমেটিক্স (Bioinformatics)

<div className="p-6 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 backdrop-blur-md">
  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">প্রাথমিক ধারণা</h3>
  <p className="text-gray-300 leading-relaxed mb-4">
    বায়োইনফরমেট্রিক্স বা জৈব তথ্যবিজ্ঞান একটি আন্তঃশাস্ত্রীয় ক্ষেত্র অর্থাৎ <strong>জীববিজ্ঞান, পরিসংখ্যান ও কম্পিউটার বিজ্ঞানের একটি শাখা</strong>। যেখানে জীববিজ্ঞান সংক্রান্ত কাজে ব্যবহৃত ডেটার সংরক্ষণ, আহরণ, সাজানো, ব্যবস্থাপনা, সংগঠন এবং বিশ্লেষণ ইত্যাদি কাজের জন্য বিভিন্ন পদ্ধতির আবিষ্কার এবং উন্নয়ন করা হয়।
  </p>
  <p className="text-gray-300 leading-relaxed">
    বায়োইনফরমেট্রিক্স মূলত কম্পিউটার বিজ্ঞান, গণিত শাস্ত্র এবং প্রকৌশল বিদ্যাকে কাজে লাগিয়ে বায়োলজিক্যাল ডেটা বিশ্লেষণ করতে ব্যবহার করা হয়।
  </p>
</div>

### বায়োইনফরমেটিক্স এর প্রধান উদ্দেশ্যসমূহ

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
    <div className="text-indigo-400 mb-2">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
    </div>
    <h4 className="font-semibold text-white mb-2">প্রক্রিয়া অনুধাবন</h4>
    <p className="text-sm text-gray-400">জৈবিক প্রক্রিয়া সঠিকভাবে অনুধাবন করা। অর্থাৎ জীন বিষয়ক তথ্যানুসন্ধান করে জ্ঞান তৈরি করা।</p>
  </div>
  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
    <div className="text-purple-400 mb-2">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
    </div>
    <h4 className="font-semibold text-white mb-2">রোগ নির্ণয়</h4>
    <p className="text-sm text-gray-400">রোগ-বালাইয়ের কারণ হিসেবে জীনের প্রভাব সম্পর্কিত জ্ঞান আহরণ করা।</p>
  </div>
  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
    <div className="text-pink-400 mb-2">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div>
    <h4 className="font-semibold text-white mb-2">ঔষধ আবিষ্কার</h4>
    <p className="text-sm text-gray-400">ঔষধের গুণাগুণ উন্নত করা ও নতুন ঔষধ আবিষ্কারের প্রচেষ্টা করা।</p>
  </div>
</div>

### বায়োইনফরমেটিক্স এর উপাদান ও কৌশল

সাধারণত চারটি ভিন্ন ভিন্ন শাখার উপাদান ও কৌশলের সমন্বয়ে বায়োইনফরমেটিক্স পদ্ধতি কাজ করে থাকে:

1. **আণবিক জীববিদ্যা ও মেডিসিন:** ডেটা উৎস বিশ্লেষণের কাজ করে।
2. **ডেটাবেজ:** নিরাপদ ডেটা সংরক্ষণ ও ডেটা রিট্রিভ করা।
3. **প্রোগ্রাম:** উপাত্ত বিশ্লেষণ অ্যালগরিদম যার মাধ্যমে বায়োইনফরমেটিক্স কঠোরভাবে সুনির্দিষ্ট করা হয়।
4. **গণিত ও পরিসংখ্যান:** এর সাহায্যে সম্ভাব্যতা যাচাই করা।

<div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/20">
  <h3 className="text-lg font-bold text-blue-300 mb-4">একটি বায়োইনফরমেটিক্স টুলস এর তিনটি প্রধান প্রক্রিয়া:</h3>
  <ol className="list-decimal pl-6 space-y-3 text-gray-300">
    <li><strong className="text-white">DNA sequence determines protein sequence:</strong> ডিএনএ সিকোয়েন্স প্রোটিন সিকোয়েন্স নির্ণয় করে।</li>
    <li><strong className="text-white">Protein sequence determines protein structure:</strong> প্রোটিন সিকোয়েন্স প্রোটিন গঠন বা কাঠামো নির্ণয় করে।</li>
    <li><strong className="text-white">Protein structure determines protein function:</strong> প্রোটিন গঠন বা কাঠামো প্রোটিনের কাজ নির্ণয় করে।</li>
  </ol>
</div>

### বায়োইনফরমেটিক্স এর ব্যবহার ও গবেষণার ক্ষেত্র

বায়োইনফরমেটিক্স বিভিন্ন গবেষণার ক্ষেত্রে ব্যাপক হারে ব্যবহৃত হচ্ছে। উল্লেখযোগ্য ক্ষেত্রগুলো হলো:

<div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">প্যাটার্ন রিকগনিশন</div>
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">ডেটা মাইনিং</div>
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">মেশিন ল্যাংগুয়েজ</div>
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">ভিজুয়ালাইজেশন</div>
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">সিকুয়েন্স এলাইনমেন্ট</div>
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">ডিএনএ ম্যাপিং</div>
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">ডিএনএ এনালাইসিস</div>
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">জিন ফাইন্ডিং</div>
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">জিনোম সমাগম</div>
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">মলিকুলার মেডিসিন</div>
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">ড্রাগ আবিস্কার</div>
  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm text-gray-300">প্রোটিন সিকোয়েন্স</div>
</div>

<div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-8">
  <h4 className="font-semibold text-green-400 mb-2">ওপেনসোর্স সফটওয়্যার সামগ্রী</h4>
  <p className="text-gray-300 text-sm leading-relaxed">
    বায়োইনফরমেটিক্সে ব্যবহৃত জনপ্রিয় ওপেনসোর্স টুলস: 
    <span className="text-white font-medium"> Bioconductor, BioPerl, Biopython, BioJava, BioRuby, Biclipse, EMBOSS, Taverna Workbench, UGENE </span> ইত্যাদি।
  </p>
</div>
`;
