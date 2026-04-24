import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  { q: "তালিকা তৈরির জন্য ব্যবহৃত আবশ্যক ট্যাগ হচ্ছে- [ঢাকা বোর্ড ২০২৪]\ni. <ol>\nii. <ul>\niii. <li>", options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"], correct: "i, ii ও iii", explanation: "তালিকার জন্য <ol>, <ul> ও <li> — তিনটিই প্রয়োজন।" },
  { q: "<ol type='a' start='4'> চালু হলে কি দেখাবে? [বরিশাল বোর্ড ২০২৪]", options: ["1.2.3.4.", "a.b.c.", "d.e.f.", "4.5.6."], correct: "d.e.f.", explanation: "type='a' ছোট হাতে। start='4' মানে চতুর্থ অক্ষর 'd' থেকে শুরু।" },
  { q: "লিস্ট তৈরিতে ব্যবহৃত হয় কোনটি? [রাজশাহী বোর্ড ২০২৩]", options: ["<ul>", "<tr>", "<td>", "<hr>"], correct: "<ul>", explanation: "<ul> আনঅর্ডারড লিস্ট তৈরিতে ব্যবহৃত হয়।" },
  { q: "লিস্টে আইটেম যুক্ত করার ট্যাগ কোনটি? [ময়মনসিংহ বোর্ড ২০২৩]", options: ["<ol>", "<li>", "<ul>", "<dt>"], correct: "<li>", explanation: "<li> (List Item) ট্যাগ লিস্টে আইটেম যুক্ত করে।" },
  { q: "কনটেইনার ট্যাগ হলো- [কুমিল্লা বোর্ড ২০১৭]\ni. <br>\nii. <ol>\niii. <img>", options: ["i ও ii", "i ও iii", "ii ও iii", "শুধু ii"], correct: "শুধু ii", explanation: "<ol> কনটেইনার ট্যাগ। <br> ও <img> এম্পটি ট্যাগ।" },
  { q: "অর্ডারড লিস্টে রোমান সংখ্যা ব্যবহারের type value কী?", options: ["1", "A", "i", "a"], correct: "i", explanation: "type='i' রোমান সংখ্যায় (i, ii, iii...) তালিকা দেখায়।" },
  { q: "আনঅর্ডারড লিস্টে বুলেটের ধরন পরিবর্তনের অ্যাট্রিবিউট?", options: ["start", "type", "value", "format"], correct: "type", explanation: "type অ্যাট্রিবিউটে disc, circle, square দিয়ে বুলেটের ধরন পরিবর্তন হয়।" },
  { q: "ডেসক্রিপশন লিস্টের ট্যাগ কোনটি?", options: ["<ul>", "<ol>", "<dl>", "<li>"], correct: "<dl>", explanation: "<dl> (Description List) শব্দ ও সংজ্ঞার তালিকা তৈরি করে।" },
  { q: "নেস্টেড লিস্ট কী?", options: ["একটি তালিকার ভেতরে আরেকটি তালিকা", "দুটি আলাদা তালিকা", "শুধু অর্ডারড", "শুধু আনঅর্ডারড"], correct: "একটি তালিকার ভেতরে আরেকটি তালিকা", explanation: "নেস্টেড লিস্টে একটি লিস্টের ভেতরে আরেকটি লিস্ট থাকে।" },
  { q: "<ul type='disc'> <li>Book</li> </ul> এর আউটপুট কেমন? [ময়মনসিংহ বোর্ড ২০২৩]", options: ["• Book", "■ Book", "○ Book", "1. Book"], correct: "• Book", explanation: "type='disc' বৃত্তাকার বুলেট দেখায় — • Book।" },
  { q: "অর্ডারড লিস্টে ক্যাপিটাল অক্ষরের type value?", options: ["A", "a", "1", "I"], correct: "A", explanation: "type='A' বড় হাতে (A, B, C...) তালিকা দেখায়।" },
  { q: "<dl> ট্যাগে শব্দ লেখার ট্যাগ?", options: ["<dt>", "<dd>", "<li>", "<term>"], correct: "<dt>", explanation: "<dt> (Definition Term) শব্দ বা বিষয় লেখে।" },
  { q: "<dl> ট্যাগে সংজ্ঞা লেখার ট্যাগ?", options: ["<dt>", "<dd>", "<li>", "<def>"], correct: "<dd>", explanation: "<dd> (Definition Description) বিষয়ের বর্ণনা বা সংজ্ঞা লেখে।" },
  { q: "<ol> ট্যাগের start অ্যাট্রিবিউটের কাজ?", options: ["তালিকার রঙ", "তালিকা কোথা থেকে শুরু হবে", "বুলেটের আকার", "তালিকার প্রস্থ"], correct: "তালিকা কোথা থেকে শুরু হবে", explanation: "start অ্যাট্রিবিউটে কোন সংখ্যা/অক্ষর থেকে তালিকা শুরু হবে তা নির্ধারণ হয়।" },
  { q: "<ul type='square'> তালিকায় বুলেট কেমন হবে?", options: ["●", "■", "○", "→"], correct: "■", explanation: "type='square' বর্গাকার বুলেট (■) দেখায়।" },
];
