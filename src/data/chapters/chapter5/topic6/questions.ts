export const questions = {
  knowledgeQuestions: [
    { q: "printf() কী? [কুমিল্লা বোর্ড ২০২৪]", a: "C ভাষায় ডেটা বা message আউটপুট ডিভাইসে প্রদর্শনের জন্য ব্যবহৃত library function হলো printf().", type: "জ্ঞানমূলক" as const },
    { q: "scanf() কী? [ঢাকা বোর্ড ২০১৬]", a: "ব্যবহারকারীর কাছ থেকে keyboard input নিয়ে নির্দিষ্ট চলকের address-এ সংরক্ষণ করার function হলো scanf().", type: "জ্ঞানমূলক" as const },
    { q: "getchar() কী? [বোর্ড অনুশীলনী ২০২৪]", a: "C ভাষায় একটি character input নেওয়ার জন্য getchar() function ব্যবহৃত হয়।", type: "জ্ঞানমূলক" as const },
    { q: "putchar() কী? [বোর্ড অনুশীলনী ২০২৪]", a: "একটি character output প্রদর্শনের জন্য putchar() function ব্যবহৃত হয়।", type: "জ্ঞানমূলক" as const },
    { q: "scanf() এর জন্য কোন header file লাগে? [বরিশাল বোর্ড ২০২৪]", a: "scanf() function ব্যবহারের জন্য stdio.h header file সংযুক্ত করতে হয়।", type: "জ্ঞানমূলক" as const },
    { q: "আউটপুট স্টেটমেন্ট কী? [কুমিল্লা বোর্ড ২০১৭]", a: "যে statement আউটপুট ডিভাইসে ফলাফল বা message প্রদর্শন করে তাকে output statement বলে। যেমন printf(), puts().", type: "জ্ঞানমূলক" as const },
  ],
  analyticalQuestions: [
    { q: "scanf(\"%d %d\", &a, &b); ব্যাখ্যা কর। [ময়মনসিংহ বোর্ড ২০২৪]", a: "এটি দুটি integer input নেয়। %d %d দ্বারা দুটি পূর্ণসংখ্যা প্রত্যাশিত, আর &a ও &b দ্বারা input মান a ও b চলকের memory address-এ সংরক্ষিত হয়।", type: "অনুধাবনমূলক" as const },
    { q: "scanf(\"%f\", &a) ব্যাখ্যা কর। [চট্টগ্রাম বোর্ড ২০২৩; কুমিল্লা বোর্ড ২০১৯; রাজশাহী বোর্ড ২০১৬]", a: "scanf() ব্যবহারকারীর কাছ থেকে float মান নেয়। %f float data type নির্দেশ করে এবং &a input মানটি a চলকের ঠিকানায় সংরক্ষণ করে।", type: "অনুধাবনমূলক" as const },
    { q: "সি ভাষায় scanf(\"%d\", &a); বলতে কী বোঝায়? [সিলেট বোর্ড ২০২৩]", a: "stdio.h হেডার ফাইলের scanf function দ্বারা integer input নেওয়া হয়। %d integer নির্দেশ করে এবং &a দ্বারা মানটি a চলকের memory location-এ জমা হয়।", type: "অনুধাবনমূলক" as const },
    { q: "printf(\"%d%x\", a, b); স্টেটমেন্টটি ব্যাখ্যা কর। [রাজশাহী বোর্ড ২০১৭]", a: "এটি a-কে decimal integer হিসেবে এবং b-কে hexadecimal format-এ output দেখাতে পারে। printf() আউটপুটের জন্য ব্যবহৃত হয়; সাধারণ মান দেখাতে চলকের আগে & ব্যবহার করা হয় না।", type: "অনুধাবনমূলক" as const },
    { q: "C ভাষায় Header file ব্যবহার করা কেন দরকার? [বরিশাল বোর্ড ২০২৩]", a: "printf(), scanf() ইত্যাদি standard library function ব্যবহার করতে compiler-কে function prototype জানাতে হয়। stdio.h এই prototype সরবরাহ করে।", type: "অনুধাবনমূলক" as const },
    { q: "দুটি সংখ্যার গড় নির্ণয়ে avg = a + b ভুল কেন? [বোর্ড অনুশীলনী ২০২৪]", a: "দুটি সংখ্যার গড় নির্ণয়ের জন্য যোগফলকে ২ দিয়ে ভাগ করতে হয়। তাই সঠিক expression হলো avg = (a + b) / 2।", type: "অনুধাবনমূলক" as const },
  ],
};
