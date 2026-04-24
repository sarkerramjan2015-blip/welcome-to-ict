export const questions = {
  knowledgeQuestions: [
    { q: "HTML লিস্ট কত প্রকার ও কী কী?", a: "HTML লিস্ট ৪ প্রকার:\n১. অর্ডারড লিস্ট (<ol>) — ক্রমিক সংখ্যা/অক্ষরে\n২. আনঅর্ডারড লিস্ট (<ul>) — বুলেট পয়েন্টে\n৩. ডেসক্রিপশন লিস্ট (<dl>) — শব্দ ও সংজ্ঞায়\n৪. নেস্টেড লিস্ট — লিস্টের ভেতরে লিস্ট", type: "জ্ঞানমূলক" as const },
    { q: "<ol> ট্যাগের type অ্যাট্রিবিউটের মানগুলো কী?", a: "<ol> ট্যাগের type মান:\n• 1 — সাধারণ সংখ্যা (1, 2, 3...)\n• A — বড় হাতে (A, B, C...)\n• a — ছোট হাতে (a, b, c...)\n• I — বড় রোমান (I, II, III...)\n• i — ছোট রোমান (i, ii, iii...)", type: "জ্ঞানমূলক" as const },
  ],
  analyticalQuestions: [
    { q: "নিচের আউটপুট পেতে HTML কোড লেখ:\n• Bangladesh\n  ○ Dhaka\n  ○ Rajshahi [বরিশাল বোর্ড ২০২৩]", a: "HTML কোড:\n<ul>\n  <li>Bangladesh</li>\n  <ul type='circle'>\n    <li>Dhaka</li>\n    <li>Rajshahi</li>\n  </ul>\n</ul>", type: "অনুধাবনমূলক" as const },
    { q: "XYZ College ওয়েবসাইটে ক্রমিক তালিকা দেখানোর HTML কোড লেখ। [যশোর বোর্ড ২০১৭]", a: "HTML কোড:\n<html>\n<body>\n<h2>XYZ College, Dhaka</h2>\n<p>Available Honor's Subject:</p>\n<ol>\n  <li>Bangla</li>\n  <li>English</li>\n  <li>Mathematics</li>\n  <li>Accounting</li>\n</ol>\n</body>\n</html>", type: "অনুধাবনমূলক" as const },
  ]
};
