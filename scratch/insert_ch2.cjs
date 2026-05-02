const fs = require('fs');
const path = require('path');

const mcqs = [
  {
    question: 'ফাইবার অপটিক ক্যাবলে ডেটা প্রেরণের জন্য কোন আলোক রশ্মি ব্যবহৃত হয়?',
    options: ['লেজার', 'গামা', 'বিটা', 'আলফা'],
    correctAnswer: 'লেজার',
    explanation: 'অপটিক্যাল ফাইবার ক্যাবলে ডেটা প্রেরণের জন্য লেজার বা এলইডি (LED) আলোক রশ্মি ব্যবহার করা হয়।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'LAN নেটওয়ার্ক তৈরি করতে সাধারণত কোন ধরনের ডিভাইস ব্যবহার করা হয়?',
    options: ['হাব', 'সুইচ', 'ব্রিজ', 'রাউটার'],
    correctAnswer: 'সুইচ',
    explanation: 'সুইচ একটি বুদ্ধিমান নেটওয়ার্ক ডিভাইস যা LAN তৈরিতে সবচেয়ে বেশি ব্যবহৃত হয়।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'ওয়াই-ফাই (Wi-Fi) নেটওয়ার্ক সাধারণত কোন ধরনের টপোলজি মেনে চলে?',
    options: ['স্টার', 'ট্রি', 'মেশ', 'হাইব্রিড'],
    correctAnswer: 'স্টার',
    explanation: 'ওয়াই-ফাই বা ওয়্যারলেস ল্যানে একটি কেন্দ্রীয় অ্যাক্সেস পয়েন্ট থাকে, যা স্টার টপোলজির মতো কাজ করে।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'রেডিও বা টেলিভিশন সম্প্রচারে ব্যবহৃত ডেটা ট্রান্সমিশন মোড কোনটি?',
    options: ['ব্রডকাস্ট', 'ইউনিকাস্ট', 'মাল্টিকাস্ট', 'টেলিকাস্ট'],
    correctAnswer: 'ব্রডকাস্ট',
    explanation: 'ব্রডকাস্ট মোডে একজন প্রেরক ডেটা পাঠালে নেটওয়ার্কের সবাই তা গ্রহণ করতে পারে (যেমন- টিভি, রেডিও)।',
    boardQuestions: ['Dinajpur Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'থিকনেট ক্যাবল (Thicknet cable) কী নামে পরিচিত?',
    options: ['10 Base-2', '10 Base-4', '10 Base-5', '10 Base-6'],
    correctAnswer: '10 Base-5',
    explanation: 'থিকনেট (Thicknet) কো-অ্যাক্সিয়াল ক্যাবলকে 10Base5 বলা হয়, যার ডেটা স্পিড 10 Mbps এবং রেঞ্জ 500 মিটার।',
    boardQuestions: ['Dinajpur Board 2025', 'Barisal Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'চতুর্থ প্রজন্মের (4G) মোবাইলের স্ট্যান্ডার্ড কোনটি?',
    options: ['UMTS', 'HSPA', 'WCDMA', 'LTE'],
    correctAnswer: 'LTE',
    explanation: 'LTE (Long Term Evolution) হলো চতুর্থ প্রজন্মের (4G) মোবাইল টেলিযোগাযোগ প্রযুক্তির একটি স্ট্যান্ডার্ড।',
    boardQuestions: ['Comilla Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'কোনটিকে প্রটোকল কনভার্টার (Protocol converter) বলে?',
    options: ['রাউটার', 'হাব', 'গেটওয়ে', 'মডেম'],
    correctAnswer: 'গেটওয়ে',
    explanation: 'ভিন্ন ভিন্ন প্রটোকল বিশিষ্ট নেটওয়ার্ককে সংযুক্ত করতে গেটওয়ে ব্যবহৃত হয়, তাই একে প্রটোকল কনভার্টার বলা হয়।',
    boardQuestions: ['Comilla Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'কোন প্রজন্মের মোবাইল ফোন নেটওয়ার্ক 4G নামে পরিচিত (LTE স্ট্যান্ডার্ড সম্পন্ন)?',
    options: ['২য়', '৩য়', '৪র্থ', '৫ম'],
    correctAnswer: '৪র্থ',
    explanation: 'LTE প্রযুক্তি ৪র্থ প্রজন্মের (4G) মোবাইল নেটওয়ার্কে ব্যবহার করা হয়, যা IP-ভিত্তিক প্যাকেট সুইচিং সাপোর্ট করে।',
    boardQuestions: ['Mymensingh Board 2025', 'Sylhet Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'একটি চ্যানেলের মধ্য দিয়ে ৫ সেকেন্ডে ৫০,০০০ বিট ডেটা স্থানান্তর হলে এর ব্যান্ডউইডথ কত?',
    options: ['১০০০০ Kbps', '১০০০০ Mbps', '১০০০০ Bps', '১০০০০ Gbps'],
    correctAnswer: '১০০০০ Bps',
    explanation: 'ব্যান্ডউইডথ = (মোট বিট / সময়) = (50,000 / 5) = 10,000 bps বা Bps।',
    boardQuestions: ['Mymensingh Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'অপটিক্যাল ফাইবার বা পরিশুদ্ধ কাঁচের তৈরি ক্যাবল ব্যবহারের ফলে নেটওয়ার্কে—\n\ni. শক্তির অপচয় কম হবে\nii. ডেটা বিদ্যুৎ চৌম্বক প্রভাবমুক্ত হবে\niii. ইনস্টলেশন ব্যয় কম হবে',
    options: ['i ও ii', 'i ও iii', 'ii ও iii', 'i, ii ও iii'],
    correctAnswer: 'i ও ii',
    explanation: 'অপটিক্যাল ফাইবারে বিদ্যুৎ চৌম্বকীয় প্রভাব (EMI) নেই এবং সিগন্যাল ক্ষয় কম হয়। তবে এর ইনস্টলেশন ব্যয় সাধারণ ক্যাবলের চেয়ে অনেক বেশি।',
    boardQuestions: ['Mymensingh Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'ব্যান্ডউইথ (Bandwidth) কী?',
    options: ['ডেটা স্থানান্তরের মাধ্যম', 'ডেটা স্থানান্তরের হার', 'ডেটা স্থানান্তরের দিক', 'ডেটা স্থানান্তরের পদ্ধতি'],
    correctAnswer: 'ডেটা স্থানান্তরের হার',
    explanation: 'প্রতি সেকেন্ডে যে পরিমাণ ডেটা এক স্থান থেকে অন্য স্থানে স্থানান্তরিত হয়, তাকে ব্যান্ডউইথ বা ডেটা স্থানান্তরের হার বলা হয়।',
    boardQuestions: ['Sylhet Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'সাধারণত পৃথিবীপৃষ্ঠ থেকে কত উচ্চতায় জিওস্টেশনারি (Geostationary) স্যাটেলাইটগুলো স্থাপন করা হয়?',
    options: ['প্রায় ৩৩,০০০ কি.মি.', 'প্রায় ৩৫,০০০ কি.মি.', 'প্রায় ৩৬,০০০ কি.মি.', 'প্রায় ৩৭,০০০ কি.মি.'],
    correctAnswer: 'প্রায় ৩৬,০০০ কি.মি.',
    explanation: 'জিওস্টেশনারি স্যাটেলাইটগুলো পৃথিবীপৃষ্ঠ থেকে প্রায় ৩৬ হাজার কিলোমিটার (২২,৩০০ মাইল) উপরে নিরক্ষরেখা বরাবর স্থাপন করা হয়।',
    boardQuestions: ['Sylhet Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'ক্যাবল টিভি নেটওয়ার্কিং এর ক্ষেত্রে কোন ক্যাবল ব্যবহৃত হয়?',
    options: ['টেলিফোন ক্যাবল', 'কো-অ্যাক্সিয়াল ক্যাবল', 'টুইস্টেড পেয়ার ক্যাবল', 'ফাইবার অপটিক ক্যাবল'],
    correctAnswer: 'কো-অ্যাক্সিয়াল ক্যাবল',
    explanation: 'ডিশ টিভি বা ক্যাবল টিভি নেটওয়ার্কিংয়ে কো-অ্যাক্সিয়াল ক্যাবল ব্যাপকভাবে ব্যবহৃত হয়।',
    boardQuestions: ['Sylhet Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: '10 BASE-2 নামে পরিচিত ক্যাবল কোনটি?',
    options: ['অপটিক্যাল ফাইবার', 'থিকনেট', 'টুইস্টেড পেয়ার', 'থিননেট'],
    correctAnswer: 'থিননেট',
    explanation: 'থিননেট (Thinnet) কো-অ্যাক্সিয়াল ক্যাবলকে 10Base2 বলা হয়। এর ট্রান্সমিশন রেট 10 Mbps এবং রেঞ্জ প্রায় 185 মিটার।',
    boardQuestions: ['Rajshahi Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'মেশ টপোলজিতে ৪৫টি তার (Link) দিয়ে সর্বোচ্চ কতটি নোডকে সংযুক্ত করা যায়?',
    options: ['৮টি', '৯টি', '১০টি', '১৫টি'],
    correctAnswer: '১০টি',
    explanation: 'মেশ টপোলজিতে তারের সংখ্যা C = n(n-1)/2। এখানে 45 = n(n-1)/2, সুতরাং n = 10। ১০টি নোডের জন্য ৪৫টি তার প্রয়োজন।',
    boardQuestions: ['Rajshahi Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'কোন ট্রান্সমিশন পদ্ধতিতে প্রেরকের সাথে প্রাইমারি মেমরির প্রয়োজন হয়?',
    options: ['প্যারালাল', 'সিনক্রোনাস', 'এসিনক্রোনাস', 'আইসো-ক্রোনাস'],
    correctAnswer: 'সিনক্রোনাস',
    explanation: 'সিনক্রোনাস ট্রান্সমিশনে ডেটাকে ব্লক আকারে পাঠানো হয়। তাই প্রেরকের প্রান্তে ডেটা সাময়িকভাবে সংরক্ষণের জন্য প্রাইমারি মেমরি বা বাফারের প্রয়োজন হয়।',
    boardQuestions: ['Barisal Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: '১০টি নোড বিশিষ্ট মেশ টপোলজিতে তারের সংখ্যা কত হবে?',
    options: ['৪৫', '৫০', '৫৫', '৬০'],
    correctAnswer: '৪৫',
    explanation: 'তারের সংখ্যা C = n(n-1)/2। এখানে n = 10, সুতরাং C = 10*9/2 = 45টি তার প্রয়োজন।',
    boardQuestions: ['Barisal Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'পিকোনেট (Piconet) এর সাথে সম্পর্কিত কোনটি?',
    options: ['Wi-fi', 'Bluetooth', 'WiMax', 'Optical Fiber'],
    correctAnswer: 'Bluetooth',
    explanation: 'ব্লুটুথ নেটওয়ার্কিং প্রযুক্তি পিকোনেট এবং স্ক্যাটারনেট তৈরি করে। একটি পিকোনেটে সর্বোচ্চ ৮টি ডিভাইস সংযুক্ত থাকতে পারে।',
    boardQuestions: ['Chittagong Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'একদিকে চলে এবং সকলে গ্রহণ করতে পারে, এই ধরনের মোডকে কী বলে?',
    options: ['হাফ ডুপ্লেক্স, মাল্টিকাস্ট', 'ফুল ডুপ্লেক্স, ইউনিকাস্ট', 'সিমপ্লেক্স, ব্রডকাস্ট', 'ফুল ডুপ্লেক্স, ব্রডকাস্ট'],
    correctAnswer: 'সিমপ্লেক্স, ব্রডকাস্ট',
    explanation: 'ডেটা শুধু এক দিকে গেলে তাকে সিমপ্লেক্স বলে। আর একজন পাঠালে সবাই তা গ্রহণ করতে পারলে তাকে ব্রডকাস্ট বলে (যেমন টিভি বা রেডিও)।',
    boardQuestions: ['Chittagong Board 2025'],
    difficulty: 'Easy'
  }
];

const topic1Path = path.join(__dirname, '../src/data/chapters/chapter2/topic1/mcqs.ts');
let t1Content = fs.readFileSync(topic1Path, 'utf-8');
const insertIndex = t1Content.lastIndexOf('];');

let mcqString = mcqs.map(q => {
  return '  {\n    id: "ch2-board-" + Math.random().toString(36).substr(2, 9),\n    question: ' + JSON.stringify(q.question) + ',\n    options: ' + JSON.stringify(q.options) + ',\n    correctAnswer: ' + JSON.stringify(q.correctAnswer) + ',\n    explanation: ' + JSON.stringify(q.explanation) + ',\n    boardQuestions: ' + JSON.stringify(q.boardQuestions) + ',\n    difficulty: "' + q.difficulty + '"\n  }';
}).join(',\n');

t1Content = t1Content.slice(0, insertIndex) + (t1Content[insertIndex-1] === '[' ? '' : ',\n') + mcqString + '\n' + t1Content.slice(insertIndex);
fs.writeFileSync(topic1Path, t1Content);
console.log('Chapter 2 MCQs inserted successfully!');
