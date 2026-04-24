export const questions = {
  knowledgeQuestions: [
    { q: "লুপ কী? [চট্টগ্রাম বোর্ড ২০২৩]", a: "একই কাজ বা একই ধরনের কাজ বারবার সম্পাদনের প্রোগ্রামিং কাঠামোকে loop বলে।", type: "জ্ঞানমূলক" as const },
    { q: "for loop কী? [যশোর বোর্ড ২০১৯]", a: "যে loop-এ initialization, condition এবং increment/decrement একই statement-এ লেখা যায় তাকে for loop বলে।", type: "জ্ঞানমূলক" as const },
    { q: "while loop কী? [সিলেট বোর্ড ২০২৩]", a: "যে loop আগে condition পরীক্ষা করে এবং condition সত্য থাকলে body execute করে তাকে while loop বলে।", type: "জ্ঞানমূলক" as const },
    { q: "do-while loop কী? [সিলেট বোর্ড ২০১৭]", a: "যে loop আগে body execute করে পরে condition পরীক্ষা করে তাকে do-while loop বলে; এটি অন্তত একবার চলে।", type: "জ্ঞানমূলক" as const },
    { q: "break statement কী? [চট্টগ্রাম বোর্ড ২০১৭]", a: "লুপ বা switch থেকে তাৎক্ষণিকভাবে বের হয়ে আসার জন্য break statement ব্যবহৃত হয়।", type: "জ্ঞানমূলক" as const },
    { q: "continue statement কী? [ঢাকা বোর্ড ২০২৪]", a: "লুপের বর্তমান iteration বাদ দিয়ে পরবর্তী iteration শুরু করতে continue statement ব্যবহৃত হয়।", type: "জ্ঞানমূলক" as const },
  ],
  analyticalQuestions: [
    { q: "for এবং do loop-এর মধ্যে কোনটি ব্যবহার করা সহজ? [যশোর বোর্ড ২০২৩]", a: "সাধারণ গণনাভিত্তিক পুনরাবৃত্তিতে for loop সহজ, কারণ initialization, condition ও update একই জায়গায় থাকে। তবে body অন্তত একবার চালাতে হলে do-while সহজ ও প্রয়োজনীয়।", type: "অনুধাবনমূলক" as const },
    { q: "একটি loop-এ i++, i=i+1 এবং i+=1 একই কাজ করে-ব্যাখ্যা কর। [চট্টগ্রাম বোর্ড ২০২৪]", a: "তিনটি statement-ই i চলকের মান ১ করে বাড়ায়। i++ হলো সংক্ষিপ্ত increment, i=i+1 পূর্ণ assignment, i+=1 compound assignment।", type: "অনুধাবনমূলক" as const },
    { q: "while loop condition শুরুতেই false হলে body কেন চলে না? [বরিশাল বোর্ড ২০২৪]", a: "while হলো entry-controlled loop। body execute করার আগে condition পরীক্ষা হয়। condition false হলে control সরাসরি loop-এর বাইরে চলে যায়।", type: "অনুধাবনমূলক" as const },
    { q: "continue ব্যবহারে output সংখ্যা কমে যায় কেন? [ঢাকা বোর্ড ২০২৪; রাজশাহী বোর্ড ২০২৪]", a: "continue বর্তমান iteration-এর অবশিষ্ট statement বাদ দেয়। তাই যে iteration-এ continue ঘটে, সেখানে print statement থাকলে সেটি execute হয় না।", type: "অনুধাবনমূলক" as const },
    { q: "Factorial নির্ণয়ে loop প্রয়োজন কেন? [কুমিল্লা বোর্ড ২০২৩]", a: "n! নির্ণয়ে 1 থেকে n পর্যন্ত ধারাবাহিক গুণ করতে হয়। একই multiplication বারবার করতে loop সবচেয়ে উপযোগী।", type: "অনুধাবনমূলক" as const },
    { q: "GCD নির্ণয়ে modulus operator ও loop কীভাবে সহায়তা করে? [বরিশাল বোর্ড ২০১৭]", a: "Euclidean পদ্ধতিতে বড় সংখ্যাকে ছোট দিয়ে ভাগ করে ভাগশেষ নেওয়া হয়। ভাগশেষ শূন্য না হওয়া পর্যন্ত একই কাজ পুনরাবৃত্তি হয়, তাই modulus ও loop লাগে।", type: "অনুধাবনমূলক" as const },
  ],
};
