import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  { q: "HTML ফর্মে ব্যবহারকারীর কাছ থেকে তথ্য সংগ্রহ করার ট্যাগ কোনটি?", options: ["<form>", "<input>", "<table>", "<select>"], correct: "<form>", explanation: "<form> ট্যাগ ব্যবহারকারীর কাছ থেকে তথ্য সংগ্রহের জন্য।" },
  { q: "পাসওয়ার্ড ইনপুটে কোন type ব্যবহৃত হয়?", options: ["text", "hidden", "password", "secret"], correct: "password", explanation: "type='password' পাসওয়ার্ড লুকিয়ে তারকা (*) চিহ্নে দেখায়।" },
  { q: "ফর্মে একাধিক অপশন নির্বাচনের জন্য কোন input type?", options: ["radio", "checkbox", "select", "text"], correct: "checkbox", explanation: "checkbox দিয়ে একাধিক অপশন একসাথে নির্বাচন করা যায়।" },
  { q: "ফর্মে একটির মধ্যে একটি নির্বাচনের জন্য কোন input type?", options: ["radio", "checkbox", "select", "text"], correct: "radio", explanation: "radio button দিয়ে একসাথে একটি মাত্র অপশন নির্বাচন হয়।" },
  { q: "ফর্ম জমা দেওয়ার বাটন তৈরির type কোনটি? [কুমিল্লা বোর্ড ২০১৭]", options: ["button", "send", "submit", "go"], correct: "submit", explanation: "type='submit' ফর্ম জমা দেওয়ার বাটন তৈরি করে।" },
  { q: "ফর্ম পরিষ্কার করার বাটন type কোনটি?", options: ["clear", "delete", "reset", "cancel"], correct: "reset", explanation: "type='reset' ফর্মের সব ইনপুট পরিষ্কার করে।" },
  { q: "<form method='post'> ও <form method='get'> এর পার্থক্য কী?", options: ["কোনো পার্থক্য নেই", "get URL এ ডেটা পাঠায়, post লুকিয়ে পাঠায়", "post URL এ পাঠায়", "get নিরাপদ"], correct: "get URL এ ডেটা পাঠায়, post লুকিয়ে পাঠায়", explanation: "GET URL এ ডেটা যোগ করে পাঠায়। POST সার্ভারে লুকিয়ে পাঠায় — বেশি নিরাপদ।" },
  { q: "input tag কোন ধরনের?", options: ["কন্টেইনার", "এম্পটি", "ব্লক", "সেমি-এম্পটি"], correct: "এম্পটি", explanation: "<input> একটি এম্পটি ট্যাগ — এর কোনো ক্লোজিং ট্যাগ নেই।" },
  { q: "ফর্ম ডেটা কোথায় পাঠানো হবে তা কোন অ্যাট্রিবিউটে থাকে?", options: ["method", "action", "target", "name"], correct: "action", explanation: "action অ্যাট্রিবিউটে সার্ভার স্ক্রিপ্টের URL থাকে যেখানে ডেটা পাঠানো হয়।" },
  { q: "<textarea> ট্যাগের কাজ কী?", options: ["একক লাইন ইনপুট", "বহু লাইন টেক্সট ইনপুট", "ড্রপডাউন", "চেকবক্স"], correct: "বহু লাইন টেক্সট ইনপুট", explanation: "<textarea> বহু লাইনের টেক্সট ইনপুটের জন্য ব্যবহৃত হয়।" },
  { q: "<select> ট্যাগের কাজ কী? [দিনাজপুর বোর্ড ২০১৬]", options: ["রেডিও বাটন", "চেকবক্স", "ড্রপডাউন সিলেক্ট বক্স", "টেক্সট বক্স"], correct: "ড্রপডাউন সিলেক্ট বক্স", explanation: "<select> ট্যাগ ড্রপডাউন সিলেক্ট বক্স তৈরি করে।" },
  { q: "ফর্মে ইমেইল ইনপুটের type কী? [ঢাকা বোর্ড ২০২৩]", options: ["mail", "email", "e-mail", "input"], correct: "email", explanation: "type='email' ইমেইল ইনপুটের জন্য — স্বয়ংক্রিয় validation থাকে।" },
  { q: "<label> ট্যাগের কাজ?", options: ["ফর্ম submit করা", "input এর লেবেল বা শিরোনাম দেওয়া", "পাসওয়ার্ড লুকানো", "ড্রপডাউন তৈরি"], correct: "input এর লেবেল বা শিরোনাম দেওয়া", explanation: "<label> ইনপুট ফিল্ডের সাথে বর্ণনামূলক টেক্সট যোগ করে।" },
  { q: "ফর্মে নাম ইনপুটের জন্য কোন type?", options: ["email", "text", "password", "number"], correct: "text", explanation: "type='text' সাধারণ টেক্সট ইনপুটের জন্য।" },
  { q: "ব্যবহারকারীর মতামত সংগ্রহে কোন HTML ট্যাগ ব্যবহৃত হয়? [চট্টগ্রাম বোর্ড ২০২৪]", options: ["<p>", "<form>", "<table>", "<div>"], correct: "<form>", explanation: "<form> ট্যাগ ব্যবহারকারীর মতামত ও তথ্য সংগ্রহ করে।" },
];
