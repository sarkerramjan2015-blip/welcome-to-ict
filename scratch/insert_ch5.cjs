const fs = require('fs');
const path = require('path');

const mcqs = [
  {
    question: 'সি (C) ভাষায় ক্যারেক্টার ইনপুট/আউটপুটের জন্য কোন ফরম্যাট স্পেসিফায়ার ব্যবহৃত হয়?',
    options: ['%c', '%f', '%lf', '%d'],
    correctAnswer: '%c',
    explanation: 'সি ভাষায় ক্যারেক্টার (Character) ডেটা টাইপের জন্য %c, পূর্ণসংখ্যার জন্য %d এবং ভগ্নাংশের জন্য %f ব্যবহৃত হয়।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'x = 10 এবং y = 20 হলে z = (x > y) ? x : y কন্ডিশনাল এক্সপ্রেশনের ফলাফল কোনটি?',
    options: ['10', '20', '30', '50'],
    correctAnswer: '20',
    explanation: 'এটি একটি টার্নারি অপারেটর (Ternary Operator)। (x > y) অর্থাৎ (10 > 20) মিথ্যা (False)। তাই এক্সপ্রেশনটি কোলোনের (:) ডানপাশের মান অর্থাৎ y (20) রিটার্ন করবে।',
    boardQuestions: ['Dhaka Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'সি ভাষায় সমজাতীয় ডেটা সংরক্ষণের জন্য কোনটি ব্যবহৃত হয়?',
    options: ['ফাংশন', 'পয়েন্টার', 'স্ট্রাকচার', 'অ্যারে'],
    correctAnswer: 'অ্যারে',
    explanation: 'একই ধরনের (সমজাতীয়) অনেকগুলো ডেটা একসঙ্গে সংরক্ষণের জন্য অ্যারে (Array) ব্যবহার করা হয়।',
    boardQuestions: ['Dinajpur Board 2025', 'Barisal Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'লাইব্রেরি ফাংশনে getch() এর জন্য কোন হেডার ফাইলটি ব্যবহৃত হয়?',
    options: ['graphics.h', 'math.h', 'stdio.h', 'conio.h'],
    correctAnswer: 'conio.h',
    explanation: 'getch(), clrscr() ইত্যাদি ফাংশনগুলো conio.h (Console Input Output) হেডার ফাইলের অন্তর্ভুক্ত।',
    boardQuestions: ['Dinajpur Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'While লুপের শর্ত কখন পরীক্ষা করা হয়?',
    options: ['লুপের শুরুতে', 'লুপের শেষে', 'লুপের মাঝখানে', 'যে কোনো সময়'],
    correctAnswer: 'লুপের শুরুতে',
    explanation: 'While লুপ একটি Entry-controlled লুপ, তাই লুপের বডিতে প্রবেশের শুরুতেই শর্ত বা কন্ডিশন চেক করা হয়।',
    boardQuestions: ['Dinajpur Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'double ডেটা টাইপের জন্য সি ভাষায় মেমোরিতে কয় বাইট জায়গা প্রয়োজন?',
    options: ['২', '৪', '৮', '১০'],
    correctAnswer: '৮',
    explanation: 'সি ভাষায় int নেয় ২ বা ৪ বাইট, float নেয় ৪ বাইট এবং double নেয় ৮ বাইট (৬৪ বিট) জায়গা।',
    boardQuestions: ['Comilla Board 2025', 'Mymensingh Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'সি ভাষায় গাণিতিক কাজের জন্য sqrt() ফাংশন ব্যবহারের প্রয়োজনীয় হেডার ফাইল কোনটি?',
    options: ['<stdio.h>', '<conio.h>', '<string.h>', '<math.h>'],
    correctAnswer: '<math.h>',
    explanation: 'sqrt(), pow(), sin(), cos() ইত্যাদি গাণিতিক ফাংশনগুলো <math.h> হেডার ফাইলে থাকে।',
    boardQuestions: ['Comilla Board 2025', 'Mymensingh Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'সি প্রোগ্রামিংয়ে একটি স্ট্রিংয়ের দৈর্ঘ্য (Length) বের করার জন্য কোন ফাংশনটি ব্যবহার করা হয়?',
    options: ['String()', 'strlen()', 'strcmp()', 'charlen()'],
    correctAnswer: 'strlen()',
    explanation: 'স্ট্রিংয়ের দৈর্ঘ্য বের করতে strlen() ফাংশনটি <string.h> হেডার ফাইলের অধীনে ব্যবহার করা হয়।',
    boardQuestions: ['Mymensingh Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'উচ্চ স্তরের ভাষায় লেখা কোডকে মেশিন কোডে রূপান্তর করার জন্য প্রয়োজনীয় অনুবাদক প্রোগ্রাম হলো—\\n\\ni. অ্যাসেম্বলার\\nii. কম্পাইলার\\niii. ইন্টারপ্রেটার',
    options: ['i ও ii', 'ii ও iii', 'i ও iii', 'i, ii ও iii'],
    correctAnswer: 'ii ও iii',
    explanation: 'কম্পাইলার ও ইন্টারপ্রেটার উচ্চ স্তরের ভাষাকে মেশিন ভাষায় রূপান্তর করে। আর অ্যাসেম্বলার ব্যবহৃত হয় অ্যাসেম্বলি ভাষাকে রূপান্তর করতে।',
    boardQuestions: ['Sylhet Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'সি প্রোগ্রামিং ভাষায় ভাগশেষ নির্ণয় করার জন্য কোন গাণিতিক অপারেটর ব্যবহৃত হয়?',
    options: ['%', '/', '&', '\\\\'],
    correctAnswer: '%',
    explanation: 'ভাগশেষ বা মডিউলাস (Modulus) নির্ণয় করার জন্য সি ভাষায় % অপারেটর ব্যবহৃত হয়।',
    boardQuestions: ['Sylhet Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'সি ভাষায় POW(5, (7 % 3)) + (6/3) * 2 + 5 এক্সপ্রেশনটির মান কত হবে?',
    options: ['14', '31', '34', '40'],
    correctAnswer: '14',
    explanation: 'প্রথমে 7 % 3 = 1। এরপর POW(5, 1) = 5। তারপর 6/3 = 2। তাহলে 5 + (2 * 2) + 5 = 5 + 4 + 5 = 14।',
    boardQuestions: ['Rajshahi Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'সি ভাষায় নিচের কোনটি লজিক্যাল অপারেটর?',
    options: ['&', '!', '=', '>'],
    correctAnswer: '!',
    explanation: 'সি ভাষায় লজিক্যাল অপারেটর হলো && (Logical AND), || (Logical OR) এবং ! (Logical NOT)।',
    boardQuestions: ['Rajshahi Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'নতুন লাইনের শুরুতে আউটপুট প্রদর্শনের জন্য নিচের কোন এস্কেপ সিকোয়েন্স (Escape sequence) টি ব্যবহৃত হয়?',
    options: ['//n', '\\\\\\\\n', '/n', '\\\\n'],
    correctAnswer: '\\\\n',
    explanation: 'আউটপুটে নতুন লাইন (New Line) তৈরি করতে \\\\n (Backslash n) এস্কেপ সিকোয়েন্স ব্যবহৃত হয়।',
    boardQuestions: ['Rajshahi Board 2025'],
    difficulty: 'Easy'
  },
  {
    question: 'নিচের কোনগুলো সি ভাষার সঠিক কীওয়ার্ড (Keyword)?\\n\\ni. scan\\nii. double\\niii. float',
    options: ['i ও ii', 'i ও iii', 'ii ও iii', 'i, ii ও iii'],
    correctAnswer: 'ii ও iii',
    explanation: 'double এবং float সি ভাষার ডেটা টাইপ কীওয়ার্ড। কিন্তু scan কোনো কীওয়ার্ড নয়, এটি scanf ফাংশনের অংশ।',
    boardQuestions: ['Jessore Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'for(k=7; k<49; k=k+7) printf("Exam\\\\n"); কোডটি রান করলে Exam লেখাটি কতবার প্রদর্শিত হবে?',
    options: ['6', '7', '25', '49'],
    correctAnswer: '6',
    explanation: 'k এর মান যথাক্রমে 7, 14, 21, 28, 35, 42 হলে লুপটি কাজ করবে। অর্থাৎ লুপটি মোট ৬ বার ঘুরবে।',
    boardQuestions: ['Jessore Board 2025'],
    difficulty: 'Hard'
  },
  {
    question: 'নিচের কোন ল্যাংগুয়েজটি মূলত কৃত্রিম বুদ্ধিমত্তায় (AI) ব্যবহার করা হয়?',
    options: ['LISP', 'CSS', 'HTML', 'SQL'],
    correctAnswer: 'LISP',
    explanation: 'LISP (LISt Processing) হলো প্রাচীনতম হাই-লেভেল প্রোগ্রামিং ল্যাঙ্গুয়েজগুলোর একটি, যা কৃত্রিম বুদ্ধিমত্তার গবেষণায় ব্যাপকভাবে ব্যবহৃত হতো।',
    boardQuestions: ['Barisal Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'সি (C) ভাষাকে বলা হয়—\\n\\ni. general purpose language\\nii. mid-level language\\niii. case sensitive language',
    options: ['i ও ii', 'ii ও iii', 'i ও iii', 'i, ii ও iii'],
    correctAnswer: 'i, ii ও iii',
    explanation: 'সি একটি জেনারেল পারপাস, মিড-লেভেল এবং কেস-সেনসিটিভ প্রোগ্রামিং ভাষা।',
    boardQuestions: ['Barisal Board 2025'],
    difficulty: 'Medium'
  },
  {
    question: 'নিচের কোনটি রিলেশনাল অপারেটর?',
    options: ['!=', '+=', '=', '%='],
    correctAnswer: '!=',
    explanation: '!= হলো Not Equal রিলেশনাল অপারেটর। বাকিগুলো অ্যাসাইনমেন্ট অপারেটর।',
    boardQuestions: ['Comilla Board 2025', 'Chittagong Board 2025'],
    difficulty: 'Easy'
  }
];

const topicPath = path.join(__dirname, '../src/data/chapters/chapter5/topic1/mcqs.ts');
if (!fs.existsSync(path.dirname(topicPath))) {
  fs.mkdirSync(path.dirname(topicPath), { recursive: true });
}

let content = fs.existsSync(topicPath) ? fs.readFileSync(topicPath, 'utf-8') : 'export const mcqs: PracticeMCQ[] = [\n];';
const insertIndex = content.lastIndexOf('];');

let mcqString = mcqs.map(q => {
  return '  {\n    id: "ch5-board-" + Math.random().toString(36).substr(2, 9),\n    question: ' + JSON.stringify(q.question) + ',\n    options: ' + JSON.stringify(q.options) + ',\n    correctAnswer: ' + JSON.stringify(q.correctAnswer) + ',\n    explanation: ' + JSON.stringify(q.explanation) + ',\n    boardQuestions: ' + JSON.stringify(q.boardQuestions) + ',\n    difficulty: "' + q.difficulty + '"\n  }';
}).join(',\n');

content = content.slice(0, insertIndex) + (content[insertIndex-1] === '[' || content[insertIndex-2] === '[' ? '' : ',\n') + mcqString + '\n' + content.slice(insertIndex);

// Add interface import if needed
if (!content.includes('PracticeMCQ')) {
  content = `import { PracticeMCQ } from '../../../../types/mcq';\n\n` + content;
}

fs.writeFileSync(topicPath, content);
console.log('Chapter 5 MCQs inserted successfully!');
