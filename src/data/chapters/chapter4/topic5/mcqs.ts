import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  { q: "টেক্সটকে বোল্ড করতে কোন ট্যাগ ব্যবহৃত হয়?", options: ["<b>", "<i>", "<u>", "<p>"], correct: "<b>", explanation: "<b> ট্যাগ টেক্সট বোল্ড করে।" },
  { q: "X² সমীকরণ ওয়েব পেইজে প্রদর্শনের জন্য কোন ট্যাগ ব্যবহার করবে?", options: ["<sup>", "<sub>", "<img>", "<jpg>"], correct: "<sup>", explanation: "<sup> ট্যাগ সুপারস্ক্রিপ্ট তৈরি করে — X<sup>2</sup> লিখলে X² দেখাবে।" },
  { q: "H₂O লেখার জন্য সাবস্ক্রিপ্টে কোন ট্যাগ প্রয়োজন?", options: ["<sup>", "<sub>", "<del>", "<em>"], correct: "<sub>", explanation: "<sub> ট্যাগ সাবস্ক্রিপ্ট করে — H<sub>2</sub>O।" },
  { q: "<del> ট্যাগের কাজ কী?", options: ["বোল্ড করা", "ইটালিক করা", "কাটা লাইন দেখানো", "আন্ডারলাইন করা"], correct: "কাটা লাইন দেখানো", explanation: "<del> ট্যাগ টেক্সটের উপর কাটা লাইন যোগ করে।" },
  { q: "সবচেয়ে বড় হেডিং ট্যাগ কোনটি? [ঢাকা বোর্ড ২০২৩]", options: ["<h1>", "<h2>", "<h5>", "<h6>"], correct: "<h1>", explanation: "<h1> সবচেয়ে বড় HTML হেডিং।" },
  { q: "নিচের কোনটি ফরমেটিং ট্যাগ নয়?", options: ["<b>", "<i>", "<u>", "<table>"], correct: "<table>", explanation: "<table> ট্যাগ ফরমেটিং নয় — এটি টেবিল তৈরির ট্যাগ।" },
  { q: "<strong> ও <b> ট্যাগের মধ্যে পার্থক্য?", options: ["কোনো পার্থক্য নেই", "<strong> semantic অর্থ বহন করে", "<b> আধুনিক", "<strong> আন্ডারলাইন করে"], correct: "<strong> semantic অর্থ বহন করে", explanation: "<strong> semantic importance বোঝায়। <b> শুধু visual bold।" },
  { q: "<em> ও <i> ট্যাগের মধ্যে পার্থক্য?", options: ["একই কাজ করে", "<em> semantic ইটালিক", "<i> আধুনিক", "ভিন্ন দেখায়"], correct: "<em> semantic ইটালিক", explanation: "<em> semantic emphasis বোঝায়। <i> শুধু visual italic।" },
  { q: "(a+b)²=a²+2ab+b² HTML-এ লিখতে কোন ট্যাগ লাগবে?", options: ["<sub>", "<sup>", "<del>", "<u>"], correct: "<sup>", explanation: "²=বর্গ লিখতে <sup>2</sup> ব্যবহার করতে হবে।" },
  { q: "<small> ট্যাগের কাজ কী?", options: ["টেক্সট বড় করে", "টেক্সট ছোট করে", "টেক্সট কাটে", "টেক্সট বাঁকায়"], correct: "টেক্সট ছোট করে", explanation: "<small> ট্যাগ টেক্সটকে তুলনামূলক ছোট করে দেখায়।" },
  { q: "<big> ট্যাগের কাজ কী?", options: ["টেক্সট বড় করে", "টেক্সট ছোট করে", "কাটা লাইন", "আন্ডারলাইন"], correct: "টেক্সট বড় করে", explanation: "<big> ট্যাগ টেক্সটকে বড় করে দেখায়।" },
  { q: "কোন ট্যাগটি HTML5-এ deprecated?", options: ["<b>", "<i>", "<strike>", "<strong>"], correct: "<strike>", explanation: "<strike> HTML5-এ deprecated। এর পরিবর্তে <del> ব্যবহার করতে হয়।" },
  { q: "কাটা (Strikethrough) ট্যাগ কোনটি?", options: ["<u>", "<del>", "<em>", "<strong>"], correct: "<del>", explanation: "<del> টেক্সটের উপর কাটা লাইন দেখায় — বাতিল বিষয় প্রকাশে ব্যবহৃত হয়।" },
  { q: "আন্ডারলাইন ট্যাগ কোনটি?", options: ["<b>", "<i>", "<u>", "<del>"], correct: "<u>", explanation: "<u> ট্যাগ টেক্সটের নিচে লাইন আঁকে।" },
  { q: "2H₂+O₂=2H₂O তে সঠিক ট্যাগ কোনটি?", options: ["<sup>", "<sub>", "<del>", "<em>"], correct: "<sub>", explanation: "রাসায়নিক সূত্রে সাবস্ক্রিপ্টের জন্য <sub> ট্যাগ।" },
  { q: "নিচের কোনটি HTML ফরমেটিং ট্যাগ? [বরিশাল বোর্ড ২০২৪]", options: ["<b>", "<br>", "<li>", "<a>"], correct: "<b>", explanation: "<b> টেক্সট ফরমেটিং ট্যাগ — বোল্ড করে।" },
  { q: "HTML কোড <p> H <sup> 2 </sup> O </p> এর ফলাফল?", options: ["H₂O", "H²O", "H2O", "HO2"], correct: "H²O", explanation: "<sup> দিয়ে সুপারস্ক্রিপ্ট হয় — H²O।" },
  { q: "<ins> ট্যাগের কাজ কী?", options: ["মুছে ফেলা", "নতুন সংযোজন চিহ্নিত করা", "ইটালিক করা", "বোল্ড করা"], correct: "নতুন সংযোজন চিহ্নিত করা", explanation: "<ins> ট্যাগ নতুন সংযোজিত বিষয় চিহ্নিত করে — আন্ডারলাইনসহ দেখায়।" },
  { q: "কোনটি ফরমেটিং ট্যাগ? [রাজশাহী বোর্ড ২০২৩]", options: ["<ol></ol>", "<h1></h1>", "<big></big>", "<a></a>"], correct: "<big></big>", explanation: "<big> একটি টেক্সট ফরমেটিং ট্যাগ।" },
  { q: "একই কাজের সমার্থক ট্যাগ — কোনটি সঠিক জোড়া?", options: ["<b> ও <em>", "<i> ও <em>", "<del> ও <u>", "<sup> ও <sub>"], correct: "<i> ও <em>", explanation: "<i> ও <em> উভয়ই ইটালিক করে, তবে <em> semantic।" },
];
