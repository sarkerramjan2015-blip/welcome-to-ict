const fs = require('fs');
const path = require('path');

const mcqs = [
  {
    question: 'ক্লাউড কম্পিউটিং এর সুফল কোনটি?',
    options: ['সাশ্রয়ী ও সহজলভ্য', 'লাইসেন্স ফি লাগে', 'অ্যাপ্লিকেশনের উপর নিয়ন্ত্রণ রাখা যায়', 'তথ্যের গোপনীয়তা বজায় থাকে'],
    correctAnswer: 'সাশ্রয়ী ও সহজলভ্য',
    explanation: 'ক্লাউড কম্পিউটিং ব্যবহারে হার্ডওয়্যার বা সফটওয়্যার কেনার খরচ কমে যায়, ফলে এটি সাশ্রয়ী ও সহজলভ্য।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'জৈবিক বৈশিষ্ট্যের নকশা বা বিন্যাসকে কী বলে?',
    options: ['জিন', 'জিনোম', 'নিউক্লিয়াস', 'ক্রোমোজোম'],
    correctAnswer: 'জিনোম',
    explanation: 'কোনো জীবের সম্পূর্ণ ডিএনএ বিন্যাস বা নকশাকে জিনোম বলা হয়।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'কোনটি আন্তঃশাস্ত্রীয় বিজ্ঞান?',
    options: ['রোবটিক্স', 'বায়োমেট্রিক্স', 'বায়োইনফরমেটিক্স', 'জেনেটিক ইঞ্জিনিয়ারিং'],
    correctAnswer: 'বায়োইনফরমেটিক্স',
    explanation: 'বায়োইনফরমেটিক্স হলো জীববিদ্যা, কম্পিউটার বিজ্ঞান, গণিত এবং পরিসংখ্যানের সমন্বয়ে গঠিত একটি আন্তঃশাস্ত্রীয় বিজ্ঞান।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'হার্ডওয়্যার ও সফটওয়্যারের সমন্বয়ে কৃত্রিম পরিবেশের চিত্রায়নকে কী বলে?',
    options: ['রোবটিক্স', 'বায়োমেট্রিক্স', 'ভার্চুয়াল রিয়েলিটি', 'কৃত্রিম বুদ্ধিমত্তা'],
    correctAnswer: 'ভার্চুয়াল রিয়েলিটি',
    explanation: 'ভার্চুয়াল রিয়েলিটি হলো হার্ডওয়্যার ও সফটওয়্যারের মাধ্যমে তৈরি এমন এক কৃত্রিম পরিবেশ, যা বাস্তবের মতো অনুভূতি প্রদান করে।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'উদ্ভাবিত উন্নত জাতের ধান যা প্রাকৃতিক বিপর্যয়ে নষ্ট হয় না—এখানে কোন প্রযুক্তির ব্যবহার করা হয়েছে?',
    options: ['বায়োমেট্রিক্স', 'ন্যানোটেকনোলজি', 'বায়োইনফরমেটিক্স', 'জেনেটিক ইঞ্জিনিয়ারিং'],
    correctAnswer: 'জেনেটিক ইঞ্জিনিয়ারিং',
    explanation: 'জেনেটিক ইঞ্জিনিয়ারিং বা রিকম্বিন্যান্ট ডিএনএ প্রযুক্তির মাধ্যমে জীবের জিনগত বৈশিষ্ট্য পরিবর্তন করে উন্নত জাতের শস্য উদ্ভাবন করা যায়।',
    boardQuestions: ['Dinajpur Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'আচরণগত বায়োমেট্রিক বৈশিষ্ট্য কোনটি?',
    options: ['ফিঙ্গার প্রিন্ট', 'আইরিশ', 'হ্যান্ড জিওমেট্রি', 'সিগনেচার'],
    correctAnswer: 'সিগনেচার',
    explanation: 'ফিঙ্গার প্রিন্ট, আইরিশ এবং হ্যান্ড জিওমেট্রি হলো শারীরবৃত্তীয় বৈশিষ্ট্য। অন্যদিকে সিগনেচার বা স্বাক্ষর হলো আচরণগত বৈশিষ্ট্য।',
    boardQuestions: ['Comilla Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'জিনোম সিকুয়েন্সিংয়ের ইলেক্ট্রনিক ডেটাবেজ তৈরির বিষয়টি নিচের কোন প্রযুক্তির সাথে সম্পর্কিত?',
    options: ['জেনেটিক ইঞ্জিনিয়ারিং', 'ন্যানোটেকনোলজি', 'বায়োইনফরমেটিক্স', 'আর্টিফিসিয়াল ইনটেলিজেন্স'],
    correctAnswer: 'বায়োইনফরমেটিক্স',
    explanation: 'জিনোম সিকোয়েন্সিংয়ের বিপুল পরিমাণ ডেটা সংরক্ষণ ও বিশ্লেষণের জন্য কম্পিউটার বিজ্ঞান ও জীববিজ্ঞানের সমন্বিত শাখা বায়োইনফরমেটিক্স ব্যবহৃত হয়।',
    boardQuestions: ['Comilla Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'কৃত্রিম বুদ্ধিমত্তার ক্ষেত্র হলো—\\n\\ni. ডিপ লার্নিং\\nii. এনএলপি\\niii. এইচএমডি',
    options: ['i ও ii', 'i ও iii', 'ii ও iii', 'i, ii ও iii'],
    correctAnswer: 'i ও ii',
    explanation: 'ডিপ লার্নিং এবং ন্যাচারাল ল্যাঙ্গুয়েজ প্রসেসিং (NLP) কৃত্রিম বুদ্ধিমত্তার ক্ষেত্র। তবে HMD (Head Mounted Display) ভার্চুয়াল রিয়েলিটিতে ব্যবহৃত হয়।',
    boardQuestions: ['Comilla Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'কম্পিউটারকে দিয়ে কথা বলানো ও শোনানোর কৌশল কোনটি?',
    options: ['মেশিন লার্নিং', 'ইমেজ প্রসেসিং', 'স্পীচ প্রসেসিং', 'ন্যাচারাল ল্যাঙ্গুয়েজ প্রসেসিং'],
    correctAnswer: 'স্পীচ প্রসেসিং',
    explanation: 'মানুষের কণ্ঠস্বর কম্পিউটারে ইনপুট দেওয়া এবং কম্পিউটার থেকে কণ্ঠস্বর আউটপুট পাওয়ার প্রক্রিয়াকে স্পিচ প্রসেসিং বলা হয়।',
    boardQuestions: ['Mymensingh Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'জাতীয় পরিচয়পত্র (NID) তৈরিতে নিচের কোন প্রযুক্তি ব্যবহৃত হয়?',
    options: ['কৃত্রিম বুদ্ধিমত্তা', 'বায়োমেট্রিক্স', 'জেনেটিক ইঞ্জিনিয়ারিং', 'বায়োইনফরমেটিক্স'],
    correctAnswer: 'বায়োমেট্রিক্স',
    explanation: 'জাতীয় পরিচয়পত্রে আঙুলের ছাপ ও চোখের আইরিশ সংরক্ষণ করা হয়, যা বায়োমেট্রিক্স প্রযুক্তির অংশ।',
    boardQuestions: ['Mymensingh Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'আর্টিফিশিয়াল ইন্টেলিজেন্স-এ করা হয় কোনটিকে সবচেয়ে সফল ক্ষেত্র হিসেবে বিবেচনা?',
    options: ['রোবটিক্স', 'স্পিচ', 'ভিশন', 'মেশিন লার্নিং'],
    correctAnswer: 'মেশিন লার্নিং',
    explanation: 'মেশিন লার্নিং হলো কৃত্রিম বুদ্ধিমত্তার একটি শাখা যা বর্তমানে সবচেয়ে সফল ও বহুল ব্যবহৃত।',
    boardQuestions: ['Sylhet Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'মসৃণ ত্বকের জন্য এন্টি-এজিং ক্রিম তৈরিতে কোন প্রযুক্তি ব্যবহার করা হয়?',
    options: ['ন্যানোটেকনোলজি', 'বায়োইনফরমেটিক্স', 'বায়োমেট্রিক্স', 'জেনেটিক ইঞ্জিনিয়ারিং'],
    correctAnswer: 'ন্যানোটেকনোলজি',
    explanation: 'প্রসাধন ও এন্টি-এজিং ক্রিম তৈরিতে ন্যানোপার্টিকেল বা ন্যানোটেকনোলজি ব্যবহার করা হয় যাতে এটি ত্বকের গভীরে প্রবেশ করতে পারে।',
    boardQuestions: ['Rajshahi Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'টেনিস বলের স্থায়িত্ব বৃদ্ধির প্রযুক্তি কোনটি?',
    options: ['কৃত্রিম বুদ্ধিমত্তা', 'রোবোটিক্স', 'ন্যানোটেকনোলজি', 'বায়োইনফরমেটিক্স'],
    correctAnswer: 'ন্যানোটেকনোলজি',
    explanation: 'খেলার সামগ্রী যেমন টেনিস বল, র‍্যাকেট ইত্যাদিকে টেকসই ও মজবুত করতে ন্যানোটেকনোলজি ব্যবহৃত হয়।',
    boardQuestions: ['Jessore Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'কৃত্রিম বুদ্ধিমত্তার লুক্কায়িত স্তরের (Hidden layer) প্রযুক্তি কোনটি?',
    options: ['জেনেটিক ইঞ্জিনিয়ারিং', 'বায়োমেট্রিক্স', 'কৃত্রিম বুদ্ধিমত্তা', 'রোবোটিক্স'],
    correctAnswer: 'কৃত্রিম বুদ্ধিমত্তা',
    explanation: 'নিউরাল নেটওয়ার্কে ইনপুট লেয়ার, হিডেন লেয়ার (লুক্কায়িত স্তর) এবং আউটপুট লেয়ার থাকে, যা কৃত্রিম বুদ্ধিমত্তার একটি অংশ।',
    boardQuestions: ['Jessore Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'নিউরাল নেটওয়ার্ক প্রধানত কয়টি স্তরে বিভক্ত?',
    options: ['২', '৩', '৪', '৫'],
    correctAnswer: '৩',
    explanation: 'নিউরাল নেটওয়ার্ক মূলত তিনটি স্তরে বিভক্ত: ইনপুট স্তর, হিডেন বা লুক্কায়িত স্তর এবং আউটপুট স্তর।',
    boardQuestions: ['Chittagong Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'খাদ্য দ্রব্য প্যাকেটজাত করতে এবং দীর্ঘক্ষণ সতেজ রাখতে ব্যাপকভাবে ব্যবহৃত হচ্ছে কোন প্রযুক্তি?',
    options: ['ন্যানোটেকনোলজি', 'কৃত্রিম বুদ্ধিমত্তা', 'জেনেটিক ইঞ্জিনিয়ারিং', 'রোবোটিকস'],
    correctAnswer: 'ন্যানোটেকনোলজি',
    explanation: 'খাদ্যকে ব্যাকটেরিয়া মুক্ত রাখতে এবং দীর্ঘস্থায়ী করতে ফুড প্যাকেজিংয়ে ন্যানোটেকনোলজি ব্যবহার করা হচ্ছে।',
    boardQuestions: ['Chittagong Board 2025'],
    difficulty: 'Medium'
  }
];

const targetFile = path.join(__dirname, '../src/data/chapters/chapter1/topic7/mcqs.ts');
let content = fs.readFileSync(targetFile, 'utf-8');

const insertIndex = content.lastIndexOf('];');
if (insertIndex === -1) throw new Error("Could not find end of array in topic7/mcqs.ts");

let mcqString = mcqs.map(q => `
  {
    id: 'ch1-t7-board-' + Math.random().toString(36).substr(2, 9),
    question: \`${q.question}\`,
    options: ${JSON.stringify(q.options)},
    correctAnswer: \`${q.correctAnswer}\`,
    explanation: \`${q.explanation}\`,
    boardQuestions: ${JSON.stringify(q.boardQuestions)},
    difficulty: '${q.difficulty}'
  }`).join(',');

content = content.slice(0, insertIndex) + (content[insertIndex-1] === '[' ? '' : ',') + mcqString + '\\n' + content.slice(insertIndex);

fs.writeFileSync(targetFile, content);
console.log('Chapter 1 MCQs inserted successfully!');
