import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  { q: "টেক্সটকে বাঁকা করতে কোন ট্যাগ ব্যবহৃত হয়?", options: ["<i>", "<u>", "<th>", "<b>"], correct: "<i>", explanation: "<i> ট্যাগ টেক্সটকে ইটালিক (বাঁকা) করে।" },
  { q: "HTML এর কোন ট্যাগ ব্যবহার করে প্যারাগ্রাফ তৈরি করা যায়?", options: ["<p>", "<img>", "<th>", "<br>"], correct: "<p>", explanation: "<p> ট্যাগ প্যারাগ্রাফ তৈরিতে ব্যবহৃত হয়।" },
  { q: "HTML এ লাইন ব্রেকের জন্য কোন ট্যাগ ব্যবহৃত হয়?", options: ["<dt>", "<hr>", "<br>", "<tr>"], correct: "<br>", explanation: "<br> ট্যাগ লাইন ব্রেক করতে ব্যবহৃত হয়। এটি এম্পটি ট্যাগ।" },
  { q: "সবচেয়ে বড় হেডিং প্রদর্শিত হয় কোনটিতে?", options: ["<h1>", "<h4>", "<h5>", "<h6>"], correct: "<h1>", explanation: "<h1> ট্যাগ সবচেয়ে বড় হেডিং তৈরি করে।" },
  { q: "নিচের কোনটি ফরমেটিং ট্যাগ? [বরিশাল বোর্ড ২০২৪]", options: ["<sup></sup>", "<body></body>", "<table></table>", "<html></html>"], correct: "<sup></sup>", explanation: "<sup> একটি টেক্সট ফরমেটিং ট্যাগ — সুপারস্ক্রিপ্ট করে।" },
  { q: "X=a²+b² সমীকরণে সুপারস্ক্রিপ্টের জন্য কোন ট্যাগ দরকার?", options: ["<sup>", "<sub>", "<li>", "<h2>"], correct: "<sup>", explanation: "<sup> ট্যাগ সুপারস্ক্রিপ্ট তৈরি করে। a<sup>2</sup> লিখলে a² দেখাবে।" },
  { q: "H₂O লেখার জন্য কোন ট্যাগ দরকার?", options: ["<sup>", "<sub>", "<img>", "<jpg>"], correct: "<sub>", explanation: "<sub> ট্যাগ সাবস্ক্রিপ্ট তৈরি করে। H<sub>2</sub>O লিখলে H₂O দেখাবে।" },
  { q: "<font> ট্যাগ এর কাজ হলো- [বরিশাল বোর্ড]\ni. টেক্সটের ধরন ঠিক করা\nii. টেক্সটের আকার ঠিক করা\niii. টেক্সটের রং ঠিক করা", options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"], correct: "i, ii ও iii", explanation: "<font> ট্যাগ টেক্সটের ধরন (face), আকার (size) ও রং (color) — তিনটিই নিয়ন্ত্রণ করে।" },
  { q: "হেডিং ট্যাগ কয়টি? [বরিশাল বোর্ড ২০১৬]", options: ["2", "4", "6", "8"], correct: "6", explanation: "HTML এ ৬টি হেডিং ট্যাগ আছে — <h1> থেকে <h6> পর্যন্ত।" },
  { q: "নিচের কোন হেডিং ট্যাগের সাইজ সবচেয়ে ছোট? [চট্টগ্রাম ২০১৭; কুমিল্লা ২০১৬]", options: ["h1", "h3", "h5", "h6"], correct: "h6", explanation: "<h6> ট্যাগ সবচেয়ে ছোট হেডিং তৈরি করে।" },
  { q: "<font> ট্যাগে অ্যাট্রিবিউট হিসাবে ব্যবহৃত হয়- [সিলেট বোর্ড ২০১৬]\ni. size\nii. color\niii. face", options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"], correct: "i, ii ও iii", explanation: "font ট্যাগের তিনটি প্রধান অ্যাট্রিবিউট — size, color এবং face।" },
  { q: "HTML কোড <p> H <sup> 2 </sup> 0 </p> এর ফলাফল কোনটি?", options: ["H₂O", "H²O", "HO²", "H₂O"], correct: "H²O", explanation: "<sup> ট্যাগ সুপারস্ক্রিপ্ট করে তাই 2 উপরে যাবে — H²O।" },
  { q: "<br> ট্যাগের কাজ কী? [কুমিল্লা বোর্ড ২০২৩]", options: ["বোল্ড করা", "লাইন ব্রেক করা", "টেবিল তৈরি", "লিংক করা"], correct: "লাইন ব্রেক করা", explanation: "<br> ট্যাগ HTML-এ লাইন ব্রেক তৈরি করে। এটি Self-closing ট্যাগ।" },
  { q: "<font> ট্যাগ ব্যাখ্যা — কোনটি সঠিক? [রাজশাহী বোর্ড ২০২৪]", options: ["এটি HTML5 এ recommended", "color, face, size অ্যাট্রিবিউট থাকে", "এটি একটি এম্পটি ট্যাগ", "এটি body-র বাইরে থাকে"], correct: "color, face, size অ্যাট্রিবিউট থাকে", explanation: "<font> ট্যাগের অ্যাট্রিবিউট হলো color, face ও size। HTML5 এ deprecated।" },
  { q: "<a> ট্যাগ সম্পর্কে সঠিক তথ্য? [কুমিল্লা বোর্ড ২০২৪]", options: ["ছবি যুক্ত করে", "হাইপারলিংক তৈরি করে", "টেবিল তৈরি করে", "লিস্ট তৈরি করে"], correct: "হাইপারলিংক তৈরি করে", explanation: "<a> ট্যাগ (anchor tag) হাইপারলিংক তৈরি করতে ব্যবহৃত হয়।" },
  { q: "স্টাইল অ্যাট্রিবিউটের ক্ষেত্রে নিচের কোনটি সঠিক? [রাজশাহী বোর্ড ২০২৩]", options: ["color: red, float: left", "color: red; float = left", "color: red; float: left", "\"color: red\" \"float: left\""], correct: "color: red; float: left", explanation: "CSS style অ্যাট্রিবিউটে semicolon (;) দিয়ে আলাদা করতে হয়।" },
  { q: "কোন html ট্যাগটি ড্রপ ডাউন বক্স তৈরিতে ব্যবহৃত হয়? [দিনাজপুর বোর্ড ২০১৬]", options: ["<option>", "<frame>", "<select>", "<input>"], correct: "<select>", explanation: "<select> ট্যাগ ড্রপ ডাউন বক্স তৈরিতে ব্যবহৃত হয়। এর ভেতরে <option> ট্যাগ থাকে।" },
  { q: "HTML এর body অংশে থাকে- [দিনাজপুর বোর্ড ২০১৬]\ni. ছবি\nii. টেবিল\niii. ওয়েব পেজ টাইটেল", options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"], correct: "i ও ii", explanation: "body অংশে ছবি, টেবিল সহ মূল কনটেন্ট থাকে। টাইটেল <head> অংশে থাকে।" },
  { q: "কোনটি ফরমেটিং ট্যাগ? [রাজশাহী বোর্ড ২০২৩]", options: ["<ol></ol>", "<h1></h1>", "<big></big>", "<a></a>"], correct: "<big></big>", explanation: "<big> একটি টেক্সট ফরমেটিং ট্যাগ যা টেক্সটকে বড় করে দেখায়।" },
  { q: "সবচেয়ে বড় হেডিং ট্যাগ কোনটি? [ঢাকা বোর্ড ২০২৪]", options: ["<h1>", "<h3>", "<h2>", "<h6>"], correct: "<h1>", explanation: "<h1> সবচেয়ে বড় হেডিং ট্যাগ।" },
];
