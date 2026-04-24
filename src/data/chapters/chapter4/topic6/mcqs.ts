import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  { q: "হাইপারলিংক তৈরির ট্যাগ কোনটি?", options: ["<a>", "<img>", "<p>", "<br>"], correct: "<a>", explanation: "<a> (anchor) ট্যাগ হাইপারলিংক তৈরি করে।" },
  { q: "<a> ট্যাগের প্রধান অ্যাট্রিবিউট কোনটি?", options: ["src", "href", "alt", "type"], correct: "href", explanation: "href অ্যাট্রিবিউট লিংকের গন্তব্য URL নির্ধারণ করে।" },
  { q: "নতুন ট্যাবে লিংক খুলতে target এর মান কী হবে?", options: ["_self", "_blank", "_top", "_parent"], correct: "_blank", explanation: "target='_blank' লিখলে লিংক নতুন ট্যাবে খোলে।" },
  { q: "লোকাল হাইপারলিংক কোনটি?", options: ["অন্য ওয়েবসাইটের লিংক", "একই সাইটের অন্য পেজের লিংক", "একই পেজের সেকশনের লিংক", "ইমেইল লিংক"], correct: "একই সাইটের অন্য পেজের লিংক", explanation: "লোকাল হাইপারলিংক একই ওয়েবসাইটের বিভিন্ন পেজের মধ্যে লিংক করে।" },
  { q: "'ourboard' লেখায় ক্লিক করলে www.e-board.edu.bd খুলবে — কোড কোনটি?", options: ["<a src='www.e-board.edu.bd'>ourboard</a>", "<a href='www.e-board.edu.bd'>ourboard</a>", "<link href='www.e-board.edu.bd'>ourboard</link>", "<url>www.e-board.edu.bd</url>"], correct: "<a href='www.e-board.edu.bd'>ourboard</a>", explanation: "<a href='URL'>text</a> হলো সঠিক হাইপারলিংক সিনট্যাক্স।" },
  { q: "গ্লোবাল হাইপারলিংক কোনটি?", options: ["একই পেজের লিংক", "একই সাইটের অন্য পেজের লিংক", "সম্পূর্ণ ভিন্ন ওয়েবসাইটের লিংক", "ইন্টারনাল লিংক"], correct: "সম্পূর্ণ ভিন্ন ওয়েবসাইটের লিংক", explanation: "গ্লোবাল লিংক অন্য ওয়েবসাইটের সাথে লিংক করে।" },
  { q: "title অ্যাট্রিবিউট <a> ট্যাগে কী করে?", options: ["ছবি দেখায়", "মাউস hover-এ tooltip দেখায়", "পেজ রিফ্রেশ করে", "নতুন উইন্ডো খোলে"], correct: "মাউস hover-এ tooltip দেখায়", explanation: "title অ্যাট্রিবিউট লিংকের উপর মাউস নিয়ে গেলে tooltip টেক্সট দেখায়।" },
  { q: "ইন্টারনাল হাইপারলিংক কোথায় যায়?", options: ["অন্য ওয়েবসাইটে", "একই সাইটের অন্য পেজে", "একই পেজের ভিন্ন সেকশনে", "ইমেইলে"], correct: "একই পেজের ভিন্ন সেকশনে", explanation: "ইন্টারনাল লিংক একই ওয়েবপেজের বিভিন্ন সেকশনের মধ্যে নেভিগেট করে।" },
  { q: "<a> ট্যাগের কাজ কী? [কুমিল্লা বোর্ড ২০২৪]", options: ["ছবি যোগ করে", "হাইপারলিংক তৈরি করে", "তালিকা তৈরি করে", "টেবিল তৈরি করে"], correct: "হাইপারলিংক তৈরি করে", explanation: "<a> (anchor) ট্যাগ হাইপারলিংক তৈরি করে ব্যবহারকারীকে এক পেজ থেকে অন্য পেজে নিয়ে যায়।" },
  { q: "হাইপারলিংক কত প্রকার?", options: ["২", "৩", "৪", "৫"], correct: "৩", explanation: "হাইপারলিংক ৩ প্রকার — গ্লোবাল, লোকাল এবং ইন্টারনাল।" },
  { q: "<a href='notice.html'>Notice</a> এটি কোন ধরনের লিংক?", options: ["গ্লোবাল", "লোকাল", "ইন্টারনাল", "এক্সটার্নাল"], correct: "লোকাল", explanation: "notice.html — একই সাইটের অন্য পেজের লিংক, তাই এটি লোকাল হাইপারলিংক।" },
  { q: "target='_self' মানে কী?", options: ["নতুন ট্যাবে খুলবে", "একই ট্যাবে খুলবে", "নতুন উইন্ডোতে খুলবে", "পপআপে খুলবে"], correct: "একই ট্যাবে খুলবে", explanation: "target='_self' মানে লিংক একই ট্যাবে বা উইন্ডোতে খুলবে।" },
  { q: "Science এ ক্লিক করলে www.science.org নতুন ট্যাবে খুলবে — সঠিক কোড?", options: ["<a href='www.science.org'>Science</a>", "<a href='www.science.org' target='_blank'>Science</a>", "<a src='www.science.org' new>Science</a>", "<link href='www.science.org'>Science</link>"], correct: "<a href='www.science.org' target='_blank'>Science</a>", explanation: "target='_blank' নতুন ট্যাবে খোলার জন্য।" },
  { q: "হাইপারলিংক তৈরির ট্যাগের সিনট্যাক্স কোনটি? [রাজশাহী বোর্ড ২০২৪]", options: ["<link href='URL'>text</link>", "<a href='URL'>text</a>", "<img src='URL'>text</img>", "<url>text</url>"], correct: "<a href='URL'>text</a>", explanation: "<a href='URL'>link text</a> হলো সঠিক হাইপারলিংক সিনট্যাক্স।" },
  { q: "<a> ট্যাগের full name কী?", options: ["action tag", "anchor tag", "address tag", "alias tag"], correct: "anchor tag", explanation: "<a> ট্যাগকে anchor tag বলে।" },
];
