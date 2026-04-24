export const questions = {
  knowledgeQuestions: [
    { q: "সাবস্ক্রিপ্ট ও সুপারস্ক্রিপ্ট ট্যাগ কী?", a: "সাবস্ক্রিপ্ট: <sub> ট্যাগ টেক্সটকে নিচের দিকে ছোট করে দেখায়। যেমন H₂O।\nসুপারস্ক্রিপ্ট: <sup> ট্যাগ টেক্সটকে উপরের দিকে ছোট করে দেখায়। যেমন a²।", type: "জ্ঞানমূলক" as const },
    { q: "HTML ফরমেটিং ট্যাগ কী কী?", a: "প্রধান HTML ফরমেটিং ট্যাগ:\n<b> — বোল্ড, <i> — ইটালিক, <u> — আন্ডারলাইন\n<strong> — গুরুত্বপূর্ণ বোল্ড, <em> — emphasized ইটালিক\n<sub> — সাবস্ক্রিপ্ট, <sup> — সুপারস্ক্রিপ্ট\n<del> — কাটা লাইন, <small> — ছোট, <big> — বড়", type: "জ্ঞানমূলক" as const },
  ],
  analyticalQuestions: [
    { q: "<b> ও <strong>, <i> ও <em> ট্যাগের পার্থক্য ব্যাখ্যা কর।", a: "<b> শুধু টেক্সট বোল্ড করে — visual। <strong> semantic গুরুত্ব বোঝায়।\n<i> শুধু ইটালিক করে — visual। <em> emphasis বোঝায় — semantic।\nHTML5 এ semantic ট্যাগ (<strong>, <em>) বেশি recommended।", type: "অনুধাবনমূলক" as const },
    { q: "(a+b)²=a²+2ab+b² ওয়েবপেইজে দেখানোর HTML কোড লেখ।", a: "HTML কোড:\n<p>(a+b)<sup>2</sup>=a<sup>2</sup>+2ab+b<sup>2</sup></p>\nএখানে <sup> ট্যাগ ব্যবহার করে বর্গ চিহ্ন সুপারস্ক্রিপ্টে দেখানো হয়েছে।", type: "অনুধাবনমূলক" as const },
  ]
};
