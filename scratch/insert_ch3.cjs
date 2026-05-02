const fs = require('fs');
const path = require('path');

const mcqs = [
  {
    question: '101101 এর 1\'s কমপ্লিমেন্ট কোনটি?',
    options: ['101100', '010010', '101000', '101111'],
    correctAnswer: '010010',
    explanation: "১-এর পরিপূরক (1's complement) বের করতে হলে বাইনারি সংখ্যার প্রতিটি ১-কে ০ এবং ০-কে ১ দ্বারা পরিবর্তন করতে হয়। 101101-এর পরিপূরক হলো 010010।",
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'একটি বইয়ের মূল্য (AA)16 হলে তার সমকক্ষ মান কোনটি?\\n\\ni. (170)10\\nii. (252)8\\niii. (10101010)2',
    options: ['i ও ii', 'i ও iii', 'ii ও iii', 'i, ii ও iii'],
    correctAnswer: 'i, ii ও iii',
    explanation: '(AA)16 কে দশমিকে রূপান্তর করলে হয় 10×16 + 10 = 170। অক্টালে 252 এবং বাইনারিতে 10101010। সুতরাং তিনটিই সঠিক।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'হায়ারোগ্লিফিক্স ভাষা হতে বর্তমান ইমোজি পর্যন্ত সবকিছু কোন কোডের অন্তর্ভুক্ত?',
    options: ['EBCDIC', 'ASCII-7', 'ASCII-8', 'UniCode'],
    correctAnswer: 'UniCode',
    explanation: 'ইউনিকোড (Unicode) বিশ্বের প্রায় সব ভাষার বর্ণ, চিহ্ন এবং ইমোজি সমর্থন করে। এটি একটি ১৬-বিট বা ৩২-বিট কোডিং ব্যবস্থা।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'বাইনারি ডেটা একদিকে বা উভয় দিকে স্থানান্তর করতে পারে কোন রেজিস্টার?',
    options: ['প্যারালাল', 'শিফট', 'বাফার', 'অ্যাকুমুলেটর'],
    correctAnswer: 'শিফট',
    explanation: 'শিফট রেজিস্টার ফ্লিপ-ফ্লপের সমন্বয়ে গঠিত যা ডেটাকে ডানে, বামে বা উভয় দিকে শিফট (স্থানান্তর) করতে পারে।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: '(10101)2 এর সমতুল্য মান—\\n\\ni. (21)10\\nii. (25)8\\niii. (15)16',
    options: ['i ও ii', 'i ও iii', 'ii ও iii', 'i, ii ও iii'],
    correctAnswer: 'i, ii ও iii',
    explanation: '(10101)2 কে দশমিকে নিলে 16+4+1 = 21 হয়। অক্টালে 010 101 = 25 এবং হেক্সাডেসিম্যালে 0001 0101 = 15।',
    boardQuestions: ['Dinajpur Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'এক বাইটের অর্ধেককে (৪ বিট) কী বলা হয়?',
    options: ['নিবল', 'কম্পিউটার শব্দ', 'ডেসিমাল', 'ক্যারেক্টার'],
    correctAnswer: 'নিবল',
    explanation: '৪ বিটের একটি গ্রুপকে এক নিবল (Nibble) বলা হয়। ৮ বিটে এক বাইট হয়।',
    boardQuestions: ['Dinajpur Board 2025', 'Barisal Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'হাফ অ্যাডারের ক্যারি (Carry) তৈরিতে কোন গেইট ব্যবহৃত হয়?',
    options: ['OR', 'XOR', 'AND', 'XNOR'],
    correctAnswer: 'AND',
    explanation: 'হাফ অ্যাডারের সাম (Sum) তৈরিতে XOR গেইট এবং ক্যারি (Carry) তৈরিতে AND গেইট ব্যবহৃত হয়।',
    boardQuestions: ['Comilla Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'কোন গেইটে সকল ইনপুট 1 হলে আউটপুট 0 হয়, অন্যথায় আউটপুট 1 হয়?',
    options: ['NAND', 'NOR', 'XNOR', 'AND'],
    correctAnswer: 'NAND',
    explanation: 'NAND গেইটে AND এর বিপরীত কাজ হয়। অর্থাৎ সবগুলো ইনপুট ১ হলেই কেবল আউটপুট ০ হয়।',
    boardQuestions: ['Comilla Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: '(101101.01)2 এর সমকক্ষ অক্টাল মান কোনটি?',
    options: ['(55.2)8', '(55.4)8', '(55.1)8', '(55.5)8'],
    correctAnswer: '(55.2)8',
    explanation: 'পূর্ণাংশ 101101 কে ৩ বিট করে সাজালে 101 101 = 55 হয়। আর ভগ্নাংশ .01 কে ৩ বিট করলে .010 = .2 হয়। উত্তর 55.2।',
    boardQuestions: ['Mymensingh Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'কোন সভ্যতায় সংখ্যা পদ্ধতি ষাটভিত্তিক (Base-60) ছিল?',
    options: ['সুমেরিয়ান-ব্যবলিয়ান', 'মিশরীয়', 'মায়ান', 'চীন'],
    correctAnswer: 'সুমেরিয়ান-ব্যবলিয়ান',
    explanation: 'প্রাচীন সুমেরিয়ান এবং ব্যাবিলনীয় সভ্যতায় ষাটভিত্তিক বা সেক্সাজেসিমাল (Sexagesimal) সংখ্যা পদ্ধতি প্রচলিত ছিল।',
    boardQuestions: ['Mymensingh Board 2025', 'Barisal Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'দুই ইনপুটের কোন গেইটে ইনপুট দুটি ভিন্ন হলে আউটপুট 1 হয়?',
    options: ['AND', 'NOR', 'XOR', 'XNOR'],
    correctAnswer: 'XOR',
    explanation: 'XOR গেইটে ইনপুটগুলো অসমান (যেমন ০ এবং ১) হলে আউটপুট ১ হয়। ইনপুট সমান হলে আউটপুট ০ হয়।',
    boardQuestions: ['Mymensingh Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'মিনিট এবং ঘণ্টার হিসাব, কোণের পরিমাণ ইত্যাদি কোন সংখ্যা পদ্ধতির উদাহরণ?',
    options: ['মায়ান', 'চীন', 'ভারতীয়', 'সুমেরিয়ান-ব্যবলিয়ান'],
    correctAnswer: 'সুমেরিয়ান-ব্যবলিয়ান',
    explanation: 'বর্তমান সময়ে ঘড়ির কাঁটার হিসাব (৬০ মিনিটে এক ঘণ্টা) এবং কোণের পরিমাপ (৩৬০ ডিগ্রি) সুমেরিয়ান-ব্যবলিয়ান সভ্যতার ষাটভিত্তিক সংখ্যা পদ্ধতি থেকে এসেছে।',
    boardQuestions: ['Sylhet Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'দুটি সংখ্যার পার্থক্য (52)10। তাদের মধ্যে বড় সংখ্যাটি (5D)16 হলে, অপর সংখ্যাটি বাইনারিতে কত?',
    options: ['(101100)2', '(101001)2', '(110010)2', '(100101)2'],
    correctAnswer: '(101001)2',
    explanation: 'বড় সংখ্যা (5D)16 = 5×16 + 13 = 93। পার্থক্য = 52, তাই অপর সংখ্যা = 93 - 52 = 41। 41-এর বাইনারি হলো 101001।',
    boardQuestions: ['Rajshahi Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: '5, 8, B ধারার পরবর্তী মান হেক্সাডেসিম্যালে কোনটি?',
    options: ['C', 'D', 'E', 'F'],
    correctAnswer: 'E',
    explanation: 'ধারাটি হলো 5, 8, 11 (B)। প্রতি পদে ৩ যোগ হচ্ছে। তাই পরবর্তী পদ 11 + 3 = 14, যা হেক্সাডেসিম্যালে E।',
    boardQuestions: ['Jessore Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'নিচের কোন লজিক বর্তনী গণনার কাজ করে?',
    options: ['এনকোডার', 'ডিকোডার', 'কাউন্টার', 'রেজিস্টার'],
    correctAnswer: 'কাউন্টার',
    explanation: 'কাউন্টার হলো এক ধরনের সিকোয়েনশিয়াল লজিক সার্কিট যা ইনপুটে আসা পালস গণনা করতে পারে।',
    boardQuestions: ['Jessore Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'EBCDIC কোড কত বিটের?',
    options: ['২', '৪', '৮', '১৬'],
    correctAnswer: '৮',
    explanation: 'EBCDIC (Extended Binary Coded Decimal Interchange Code) হলো একটি ৮-বিটের ক্যারেক্টার এনকোডিং পদ্ধতি।',
    boardQuestions: ['Barisal Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: '(BC)16 এর সমকক্ষ মান হবে—\\n\\ni. (10111100)2\\nii. (274)8\\niii. (188)10',
    options: ['i ও ii', 'ii ও iii', 'i ও iii', 'i, ii ও iii'],
    correctAnswer: 'i, ii ও iii',
    explanation: '(BC)16 = 11×16 + 12 = 188। এর বাইনারি 1011 1100 এবং অক্টালে 10 111 100 অর্থাৎ 274।',
    boardQuestions: ['Barisal Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: '৭ বিটের ASCII কোডের যান্ত্রিক নিয়ন্ত্রণ (Control Character) কোড কয়টি?',
    options: ['৩১', '৩২', '৯৬', '১২৭'],
    correctAnswer: '৩২',
    explanation: 'ASCII কোডে ০ থেকে ৩১ পর্যন্ত মোট ৩২টি নন-প্রিন্টেবল বা যান্ত্রিক নিয়ন্ত্রণ কোড (Control characters) থাকে।',
    boardQuestions: ['Chittagong Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'কোন সংখ্যা পদ্ধতিতে স্থানীয় মান (Positional value) নেই?',
    options: ['রোমান', 'বাইনারি', 'ডেসিমেল', 'অক্টাল'],
    correctAnswer: 'রোমান',
    explanation: 'রোমান, হায়ারোগ্লিফিক্স বা মায়ান সংখ্যা পদ্ধতিতে কোনো স্থানীয় মান থাকে না। এগুলো নন-পজিশনাল সংখ্যা পদ্ধতি।',
    boardQuestions: ['Chittagong Board 2025'],
    difficulty: 'Easy'
  }
];

const topicPath = path.join(__dirname, '../src/data/chapters/chapter3/topic2/mcqs.ts');
let content = fs.readFileSync(topicPath, 'utf-8');
const insertIndex = content.lastIndexOf('];');

let mcqString = mcqs.map(q => {
  return '  {\n    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),\n    question: ' + JSON.stringify(q.question) + ',\n    options: ' + JSON.stringify(q.options) + ',\n    correctAnswer: ' + JSON.stringify(q.correctAnswer) + ',\n    explanation: ' + JSON.stringify(q.explanation) + ',\n    boardQuestions: ' + JSON.stringify(q.boardQuestions) + ',\n    difficulty: "' + q.difficulty + '"\n  }';
}).join(',\n');

content = content.slice(0, insertIndex) + (content[insertIndex-1] === '[' ? '' : ',\n') + mcqString + '\n' + content.slice(insertIndex);
fs.writeFileSync(topicPath, content);
console.log('Chapter 3 MCQs inserted successfully!');
