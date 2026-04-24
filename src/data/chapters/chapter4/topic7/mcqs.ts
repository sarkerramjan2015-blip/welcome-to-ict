import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  { q: "ওয়েবপেজে ছবি যোগ করার ট্যাগ কোনটি?", options: ["<img>", "<pic>", "<src>", "<image>"], correct: "<img>", explanation: "<img> ট্যাগ ওয়েবপেজে ছবি যোগ করতে ব্যবহৃত হয়।" },
  { q: "<img> ট্যাগের প্রধান অ্যাট্রিবিউট কোনটি?", options: ["href", "src", "alt", "type"], correct: "src", explanation: "src (source) অ্যাট্রিবিউট ছবির লোকেশন/URL নির্ধারণ করে।" },
  { q: "<img> ট্যাগের alt অ্যাট্রিবিউটের কাজ কী?", options: ["ছবির আকার", "ছবি না দেখালে বিকল্প টেক্সট", "ছবির রং", "ছবির শিরোনাম"], correct: "ছবি না দেখালে বিকল্প টেক্সট", explanation: "alt = Alternative। ছবি লোড না হলে বিকল্প বর্ণনা দেখায়।" },
  { q: "E ড্রাইভের photo ফোল্ডারে logo.jpg ছবি 200×300 আকারে দেখানোর কোড?", options: ["<img src='E:/photo/logo.jpg' width='200' height='300'>", "<img src='logo.jpg' size='200x300'>", "<picture path='E:/photo/logo.jpg'>", "<img link='E:/photo/logo.jpg'>"], correct: "<img src='E:/photo/logo.jpg' width='200' height='300'>", explanation: "সঠিক img ট্যাগে src, width ও height অ্যাট্রিবিউট ব্যবহার করতে হয়।" },
  { q: "টেবিল তৈরিতে কোন ট্যাগ ব্যবহৃত হয়?", options: ["<tr>", "<td>", "<table>", "<th>"], correct: "<table>", explanation: "<table> ট্যাগ টেবিল তৈরির মূল ট্যাগ। <tr> রো, <td> সেল।" },
  { q: "টেবিলের হেডার সেল তৈরির ট্যাগ কোনটি?", options: ["<td>", "<tr>", "<th>", "<head>"], correct: "<th>", explanation: "<th> (table header) ট্যাগ হেডার সেল তৈরি করে — সাধারণত বোল্ড হয়।" },
  { q: "টেবিলের রো তৈরির ট্যাগ কোনটি?", options: ["<td>", "<tr>", "<th>", "<table>"], correct: "<tr>", explanation: "<tr> (table row) ট্যাগ টেবিলের সারি তৈরি করে।" },
  { q: "JPG ফরম্যাটের পূর্ণ নাম কী?", options: ["Joint Photographic Group", "Joint Processing Group", "Java Photo Group", "Joint Picture Gallery"], correct: "Joint Photographic Group", explanation: "JPG = Joint Photographic Group। ফটোগ্রাফের জন্য আদর্শ ফরম্যাট।" },
  { q: "PNG ফরম্যাটের পূর্ণ নাম কী?", options: ["Portable Network Graphics", "Photo Network Group", "Picture Network Group", "Portable New Graphics"], correct: "Portable Network Graphics", explanation: "PNG = Portable Network Graphics। লোগো ও আইকনের জন্য সেরা।" },
  { q: "GIF ফরম্যাট কীসের জন্য উপযুক্ত?", options: ["বড় ফটো", "অ্যানিমেটেড ছবি", "ভেক্টর গ্রাফিক্স", "ডকুমেন্ট"], correct: "অ্যানিমেটেড ছবি", explanation: "GIF (Graphics Interchange Format) অ্যানিমেটেড ছবির জন্য উপযুক্ত।" },
  { q: "<img> ট্যাগ কোন ধরনের?", options: ["কন্টেইনার", "এম্পটি", "ব্লক", "ইনলাইন"], correct: "এম্পটি", explanation: "<img> একটি এম্পটি ট্যাগ — এর কোনো ক্লোজিং ট্যাগ নেই।" },
  { q: "টেবিলে কলস্প্যান দিতে কোন অ্যাট্রিবিউট?", options: ["rowspan", "colspan", "span", "merge"], correct: "colspan", explanation: "colspan অ্যাট্রিবিউট একটি সেলকে একাধিক কলামে বিস্তৃত করে।" },
  { q: "SVG ফরম্যাটের বৈশিষ্ট্য কী?", options: ["অ্যানিমেশনের জন্য", "ভেক্টর গ্রাফিক্স — যেকোনো আকারে স্পষ্ট", "ছোট ফটোর জন্য", "ডকুমেন্টের জন্য"], correct: "ভেক্টর গ্রাফিক্স — যেকোনো আকারে স্পষ্ট", explanation: "SVG = Scalable Vector Graphics। যেকোনো রেজোলিউশনে স্পষ্ট থাকে।" },
  { q: "ছবির width ও height কোন অ্যাট্রিবিউটে দেওয়া হয়?", options: ["size", "dimension", "width ও height", "scale"], correct: "width ও height", explanation: "width (প্রস্থ) এবং height (উচ্চতা) অ্যাট্রিবিউটে পিক্সেলে সাইজ দেওয়া হয়।" },
  { q: "টেবিলের ডেটা সেল তৈরির ট্যাগ কোনটি?", options: ["<th>", "<tr>", "<td>", "<tb>"], correct: "<td>", explanation: "<td> (table data) ট্যাগ টেবিলের ডেটা সেল তৈরি করে।" },
];
