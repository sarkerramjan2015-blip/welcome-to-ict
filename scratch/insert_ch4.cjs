const fs = require('fs');
const path = require('path');

const mcqs = [
  {
    question: 'www.allNews.com একটি ওয়েবসাইট যার মাধ্যমে দেশ-বিদেশের খবর জানা যায়। এটি কোন প্রকৃতির প্রতিষ্ঠান?',
    options: ['শিক্ষা', 'বাণিজ্যিক', 'সরকারি', 'আন্তর্জাতিক'],
    correctAnswer: 'বাণিজ্যিক',
    explanation: 'সাধারণত .com ডোমেইন দিয়ে কমার্শিয়াল বা বাণিজ্যিক প্রতিষ্ঠান বোঝায়। নিউজ পোর্টালগুলো মূলত বাণিজ্যিক ওয়েবসাইট হিসেবে পরিচালিত হয়।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'ওয়েবসাইট ভিজিটের জন্য কোন ধরনের প্রোটোকল ব্যবহৃত হয়?',
    options: ['SMTP', 'VOIP', 'FTP', 'HTTP'],
    correctAnswer: 'HTTP',
    explanation: 'ওয়েব সার্ভার থেকে ক্লায়েন্ট ব্রাউজারে ডেটা আদান-প্রদানের জন্য HTTP (Hyper Text Transfer Protocol) ব্যবহৃত হয়।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: '"#FFFFFF" কোন রং নির্দেশ করে?',
    options: ['সাদা', 'নীল', 'সায়ান', 'লাল'],
    correctAnswer: 'সাদা',
    explanation: 'হেক্সাডেসিমাল কালার কোডে #FFFFFF দিয়ে সাদা রং (White) নির্দেশ করা হয়।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'নিচের কোন ট্যাগ ব্যবহার করলে টেবিল সেলের ব্যাকগ্রাউন্ড কালার সবুজ হবে?',
    options: ['<table bgcolor="green">', '<tr bgcolor="green">', '<td bgcolor="green">', '<tr td bgcolor="green">'],
    correctAnswer: '<td bgcolor="green">',
    explanation: 'টেবিলের নির্দিষ্ট একটি সেলের (Cell) ব্যাকগ্রাউন্ড রং পরিবর্তন করতে <td> ট্যাগের ভেতর bgcolor="green" অ্যাট্রিবিউট ব্যবহার করতে হয়।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'টেবিলে সেল তৈরির জন্য কোন ট্যাগ ব্যবহৃত হয়?',
    options: ['<td>', '<tr>', '<col>', '<tc>'],
    correctAnswer: '<td>',
    explanation: 'টেবিলের রো (Row) এর ভেতরে কলাম বা সেল তৈরির জন্য <td> (Table Data) ট্যাগ ব্যবহার করা হয়।',
    boardQuestions: ['Dinajpur Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'HTML-এ কোন ইমেজ ফরম্যাট সাপোর্ট করে?\\n\\ni. .gif\\nii. .png\\niii. .jpg',
    options: ['i ও ii', 'ii ও iii', 'i ও iii', 'i, ii ও iii'],
    correctAnswer: 'i, ii ও iii',
    explanation: 'HTML ডকুমেন্টে ছবি যুক্ত করার জন্য সাধারণত .gif, .png, এবং .jpg বা .jpeg ফরম্যাট ব্যাপকভাবে ব্যবহৃত এবং সমর্থিত।',
    boardQuestions: ['Dinajpur Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'HTML এর সবচেয়ে ছোট হেডিং কোনটি?',
    options: ['h1', 'h2', 'h4', 'h6'],
    correctAnswer: 'h6',
    explanation: 'HTML-এ <h1> থেকে <h6> পর্যন্ত ৬টি হেডিং ট্যাগ রয়েছে। এর মধ্যে <h1> সবচেয়ে বড় এবং <h6> সবচেয়ে ছোট হেডিং নির্দেশ করে।',
    boardQuestions: ['Dinajpur Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'হাইপারমিডিয়ার উপাদান হলো—\\n\\ni. টেক্সট\\nii. অডিও\\niii. ভিডিও',
    options: ['i ও ii', 'ii ও iii', 'i ও iii', 'i, ii ও iii'],
    correctAnswer: 'i, ii ও iii',
    explanation: 'হাইপারমিডিয়া হলো হাইপারটেক্সটের একটি উন্নত রূপ, যাতে টেক্সট, অডিও, ভিডিও, গ্রাফিক্স, এবং অ্যানিমেশন সংযুক্ত থাকতে পারে।',
    boardQuestions: ['Comilla Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: '<a> ট্যাগের অত্যন্ত গুরুত্বপূর্ণ অ্যাট্রিবিউট হলো—',
    options: ['face', 'type', 'target', 'align'],
    correctAnswer: 'target',
    explanation: '<a> ট্যাগে target অ্যাট্রিবিউটের মাধ্যমে নির্ধারণ করা হয় লিংকটি কোথায় খুলবে (যেমন _blank দিয়ে নতুন ট্যাবে)।',
    boardQuestions: ['Comilla Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: '<img> ট্যাগের আবশ্যিক অ্যাট্রিবিউট কোনটি?',
    options: ['src', 'href', 'target', 'border'],
    correctAnswer: 'src',
    explanation: 'ছবি যুক্ত করতে <img> ট্যাগের ভেতরে src (Source) অ্যাট্রিবিউট ব্যবহার করা বাধ্যতামূলক, যা ছবির অবস্থান নির্দেশ করে।',
    boardQuestions: ['Comilla Board 2025', 'Mymensingh Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'টেবিলে বর্ডার থেকে ডেটার দূরত্ব নির্ধারণের অ্যাট্রিবিউট হলো—',
    options: ['cellspacing', 'rowspan', 'colspan', 'cellpadding'],
    correctAnswer: 'cellpadding',
    explanation: 'সেলের বর্ডার বা সীমানা থেকে ভেতরের টেক্সটের দূরত্ব নির্ধারণ করতে cellpadding ব্যবহার করা হয়। আর দুটি সেলের মধ্যবর্তী দূরত্ব হলো cellspacing।',
    boardQuestions: ['Mymensingh Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'src অ্যাট্রিবিউট কোন ট্যাগে ব্যবহৃত হয়?',
    options: ['<div>', '<a>', '<img>', '<span>'],
    correctAnswer: '<img>',
    explanation: 'src (source) অ্যাট্রিবিউট মূলত <img> ট্যাগে ব্যবহৃত হয় ছবির লোকেশন বা পাথ বলে দেওয়ার জন্য।',
    boardQuestions: ['Sylhet Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'নিচের কোনটি ওয়েব ব্রাউজার?',
    options: ['Imo', 'Opera', 'Viber', 'Google'],
    correctAnswer: 'Opera',
    explanation: 'Opera একটি জনপ্রিয় ওয়েব ব্রাউজার। Google একটি সার্চ ইঞ্জিন, আর Imo ও Viber হলো মেসেজিং অ্যাপ।',
    boardQuestions: ['Sylhet Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'HTML ফাইল এডিট করার জন্য ব্যবহৃত টেক্সট এডিটর হলো—\\n\\ni. নোটপ্যাড++\\nii. সাবলাইম টেক্সট\\niii. নোটপ্যাড',
    options: ['i ও ii', 'ii ও iii', 'i ও iii', 'i, ii ও iii'],
    correctAnswer: 'i, ii ও iii',
    explanation: 'HTML কোড লেখার জন্য Notepad, Notepad++, Sublime Text, VS Code ইত্যাদি টেক্সট এডিটর ব্যবহার করা যায়।',
    boardQuestions: ['Rajshahi Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: '<font color="Red" face="Arial"> ICT </font>\\nউদ্দীপকে কনটেন্ট কোনটি?',
    options: ['Font', 'Color', 'Red', 'ICT'],
    correctAnswer: 'ICT',
    explanation: 'ওপেনিং এবং ক্লোজিং ট্যাগের মাঝখানে যা থাকে তাই হলো কনটেন্ট বা এলিমেন্ট কনটেন্ট। এখানে ICT হলো কনটেন্ট।',
    boardQuestions: ['Rajshahi Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'নতুন ট্যাবে ওয়েব পেইজ খুলতে <a> ট্যাগের কোন এট্রিবিউট ব্যবহৃত হয়?',
    options: ['target="_self"', 'target="_blank"', 'target="_parent"', 'target="_top"'],
    correctAnswer: 'target="_blank"',
    explanation: 'লিংক করা পেইজটি একটি নতুন উইন্ডো বা ট্যাবে ওপেন করার জন্য target="_blank" অ্যাট্রিবিউট ব্যবহার করতে হয়।',
    boardQuestions: ['Jessore Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'ক্রমযুক্ত (Ordered) তালিকা প্রকাশের জন্য ব্যবহৃত ট্যাগ কোনটি?',
    options: ['<ul>', '<ol>', '<br>', '<del>'],
    correctAnswer: '<ol>',
    explanation: 'ক্রমযুক্ত বা অর্ডারড লিস্ট তৈরি করতে <ol> (Ordered List) ট্যাগ এবং ক্রমহীন তালিকার জন্য <ul> (Unordered List) ট্যাগ ব্যবহৃত হয়।',
    boardQuestions: ['Jessore Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'নিচের কোনটি দেশীয় সার্চ ইঞ্জিন?',
    options: ['Twitter', 'YouTube', 'Pipilika', 'Wikipedia'],
    correctAnswer: 'Pipilika',
    explanation: 'পিপীলিকা (Pipilika) হলো বাংলাদেশের প্রথম নিজস্ব সার্চ ইঞ্জিন, যা বাংলা ভাষায় তথ্য অনুসন্ধানে বিশেষভাবে তৈরি করা হয়েছিল।',
    boardQuestions: ['Barisal Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'ইন্টারনেট সংযোগের ক্ষেত্রে সবচেয়ে গুরুত্বপূর্ণ হলো—',
    options: ['IP Address', 'Domain Name', 'Browser', 'Search Engine'],
    correctAnswer: 'IP Address',
    explanation: 'ইন্টারনেটে সংযুক্ত প্রতিটি ডিভাইসের একটি অনন্য আইডেন্টিটি থাকে যাকে IP Address বলা হয়। এটি ছাড়া ইন্টারনেটে যোগাযোগ অসম্ভব।',
    boardQuestions: ['Chittagong Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'WWW বা ওয়েবসাইট নিয়ে প্রথম কে চিন্তাভাবনা করেন?',
    options: ['মার্শাল ম্যাকলুহান', 'ডি মরগ্যান', 'টিম বার্নাস লি', 'লেডি অ্যাডা'],
    correctAnswer: 'টিম বার্নাস লি',
    explanation: 'স্যার টিম বার্নাস-লি (Tim Berners-Lee) ১৯৮৯ সালে ওয়ার্ল্ড ওয়াইড ওয়েব (WWW) উদ্ভাবন করেন।',
    boardQuestions: ['Chittagong Board 2025'],
    difficulty: 'Easy'
  }
];

const topicPath = path.join(__dirname, '../src/data/chapters/chapter4/analysis.ts'); 
// Assuming Web design is chapter 4. Let's see where to put it. 
// Wait, the prompt shows files in chapter4. Let's use chapter4/analysis.ts or similar. Actually wait, I need to append to mcqs.ts inside chapter 4 topics.
// I will just create topic1/mcqs.ts if it doesn't exist, or append to it.
const topic1Path = path.join(__dirname, '../src/data/chapters/chapter4/topic1/mcqs.ts');

if (!fs.existsSync(path.dirname(topic1Path))) {
  fs.mkdirSync(path.dirname(topic1Path), { recursive: true });
}

let content = fs.existsSync(topic1Path) ? fs.readFileSync(topic1Path, 'utf-8') : 'export const mcqs: PracticeMCQ[] = [\n];';

const insertIndex = content.lastIndexOf('];');

let mcqString = mcqs.map(q => {
  return '  {\n    id: "ch4-board-" + Math.random().toString(36).substr(2, 9),\n    question: ' + JSON.stringify(q.question) + ',\n    options: ' + JSON.stringify(q.options) + ',\n    correctAnswer: ' + JSON.stringify(q.correctAnswer) + ',\n    explanation: ' + JSON.stringify(q.explanation) + ',\n    boardQuestions: ' + JSON.stringify(q.boardQuestions) + ',\n    difficulty: "' + q.difficulty + '"\n  }';
}).join(',\n');

content = content.slice(0, insertIndex) + (content[insertIndex-1] === '[' || content[insertIndex-2] === '[' ? '' : ',\n') + mcqString + '\n' + content.slice(insertIndex);

// Add interface import if needed
if (!content.includes('PracticeMCQ')) {
  content = `import { PracticeMCQ } from '../../../../types/mcq';\n\n` + content;
}

fs.writeFileSync(topic1Path, content);
console.log('Chapter 4 MCQs inserted successfully!');
