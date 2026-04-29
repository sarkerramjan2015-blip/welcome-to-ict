import React from 'react';
import { ShieldCheck, Target, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export default function Terms() {
  return (
    <div className="flex-1 flex flex-col px-4 sm:px-6 md:px-12 py-10 md:py-16 max-w-5xl mx-auto w-full relative z-20">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 md:mb-16 text-center"
      >
        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl ring-1 ring-teal-500/20 rotate-3">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
          Terms & Conditions
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
          শর্তাবলী ও নিয়মকানুন - ICT Toppers
        </p>
      </motion.div>

      {/* Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 md:p-12 shadow-2xl"
      >
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-li:text-slate-600 dark:prose-li:text-slate-300">
          
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-teal-500" size={28} />
            <h2 className="m-0 text-2xl text-teal-700 dark:text-teal-400 border-none">আমাদের মিশন ও ভিশন (Mission & Vision)</h2>
          </div>
          
          <h3 className="text-xl text-slate-800 dark:text-slate-200 mt-8 mb-4">আমাদের লক্ষ্য (Mission):</h3>
          <p>
            মাধ্যমিক স্তরের (৮ম, ৯ম ও ১০ম শ্রেণি) শিক্ষার্থীদের জন্য তথ্য ও যোগাযোগ প্রযুক্তি (ICT) এবং বাংলাদেশ ও বিশ্ব পরিচয় (BGS)-এর মতো বিষয়গুলোকে আরও সহজ, আনন্দদায়ক এবং বোধগম্য করে তোলা। আধুনিক প্রযুক্তির সাহায্যে বোর্ড স্ট্যান্ডার্ড প্রশ্ন, নোট এবং কুইজের মাধ্যমে শিক্ষার্থীদের পরীক্ষার ভীতি দূর করা এবং তাদের শতভাগ প্রস্তুতির নিশ্চয়তা দেওয়া।
          </p>

          <h3 className="text-xl text-slate-800 dark:text-slate-200 mt-8 mb-4">আমাদের রূপকল্প (Vision):</h3>
          <p>
            সঠিক প্রযুক্তিগত জ্ঞান এবং দেশপ্রেমের মূল্যবোধ সম্পন্ন একটি স্মার্ট ও দক্ষ প্রজন্ম গড়ে তোলা। এমন একটি ডিজিটাল লার্নিং পরিবেশ তৈরি করা, যেখানে শিক্ষার্থীরা মুখস্থ বিদ্যার বদলে বিষয়বস্তু গভীরভাবে বুঝতে শিখবে এবং ভবিষ্যতের চ্যালেঞ্জ মোকাবেলায় প্রস্তুত হবে।
          </p>

          <hr className="my-12 border-slate-200 dark:border-slate-800" />

          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-indigo-500" size={28} />
            <h2 className="m-0 text-2xl text-indigo-700 dark:text-indigo-400 border-none">শর্তাবলী (Terms and Conditions)</h2>
          </div>
          
          <p className="mb-8 font-medium">
            ICT Toppers-এ আপনাকে স্বাগতম। এই ওয়েবসাইটটি ব্যবহারের মাধ্যমে আপনি নিম্নলিখিত শর্তাবলীতে সম্মত হচ্ছেন:
          </p>

          <ul className="space-y-6 list-none pl-0">
            <li className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-0 mb-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">১</span>
                ব্যবহারকারীর আচরণ
              </h4>
              <p className="m-0">
                এই প্ল্যাটফর্মটি শুধুমাত্র পড়াশোনার উদ্দেশ্যে তৈরি করা হয়েছে। কোনো প্রকার অনৈতিক কাজ, স্প্যামিং বা সিস্টেমের ক্ষতি করার চেষ্টা করা হলে তা আইনত দণ্ডনীয় অপরাধ হিসেবে গণ্য হবে।
              </p>
            </li>

            <li className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-0 mb-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">২</span>
                কন্টেন্ট মালিকানা
              </h4>
              <p className="m-0">
                ICT Toppers-এর যাবতীয় লেকচার নোট, MCQ, সৃজনশীল প্রশ্ন (CQ) এবং অন্যান্য ডিজিটাল সামগ্রী সম্পূর্ণভাবে আমাদের মেধা সম্পদ। এগুলো পূর্বানুমতি ছাড়া অন্য কোনো ওয়েবসাইট, অ্যাপ বা বাণিজ্যিক উদ্দেশ্যে কপি করা বা প্রকাশ করা সম্পূর্ণ নিষিদ্ধ।
              </p>
            </li>

            <li className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-0 mb-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">৩</span>
                ডেটা ও প্রাইভেসি (Google Standard)
              </h4>
              <p className="m-0">
                আমরা ব্যবহারকারীর গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দিই। গুগল স্ট্যান্ডার্ড নীতিমালা অনুযায়ী আমরা আপনার ডেটা নিরাপদ রাখার চেষ্টা করি। আপনার লার্নিং প্রগ্রেস ট্র্যাক করার জন্য শুধুমাত্র প্রয়োজনীয় তথ্য (যেমন local storage ডেটা) ব্যবহার করা হয়, যা সম্পূর্ণ সুরক্ষিত।
              </p>
            </li>

            <li className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-0 mb-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">৪</span>
                ফিডব্যাক ও পরামর্শ
              </h4>
              <p className="m-0">
                শিক্ষার্থীরা তাদের যেকোনো গঠনমূলক পরামর্শ বা ফিডব্যাক আমাদের সাথে শেয়ার করতে পারবে। তবে যেকোনো আপত্তিকর বা কুরুচিপূর্ণ মন্তব্যের ক্ষেত্রে ইউজার অ্যাক্সেস স্থায়ীভাবে ব্লক করা হতে পারে।
              </p>
            </li>

            <li className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-0 mb-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">৫</span>
                আইনি এখতিয়ার
              </h4>
              <p className="m-0">
                এই ওয়েবসাইটের ব্যবহার সংক্রান্ত যেকোনো বিবাদ বা আইনি পদক্ষেপ গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইন অনুযায়ী পরিচালিত ও সমাধান করা হবে।
              </p>
            </li>
          </ul>

        </div>
      </motion.div>
    </div>
  );
}
