export const questions = {
  knowledgeQuestions: [
    { q: "কন্ডিশনাল কন্ট্রোল স্টেটমেন্ট কী? [কুমিল্লা বোর্ড ২০২৪]", a: "যে control statement কোনো শর্ত সত্য বা মিথ্যা হওয়ার উপর নির্ভর করে statement কার্যকর করে তাকে conditional control statement বলে।", type: "জ্ঞানমূলক" as const },
    { q: "if statement কী? [বোর্ড অনুশীলনী ২০২৪]", a: "if statement-এ condition সত্য হলে নির্দিষ্ট block-এর statement execute হয়।", type: "জ্ঞানমূলক" as const },
    { q: "if-else statement কী? [বোর্ড অনুশীলনী ২০২৪]", a: "condition সত্য হলে if block এবং মিথ্যা হলে else block execute হয় যে statement-এ, তাকে if-else statement বলে।", type: "জ্ঞানমূলক" as const },
    { q: "else-if ladder কী? [বোর্ড অনুশীলনী ২০২৪]", a: "একাধিক condition ধারাবাহিকভাবে যাচাই করার জন্য if-এর পরে এক বা একাধিক else-if ব্যবহৃত হলে তাকে else-if ladder বলে।", type: "জ্ঞানমূলক" as const },
    { q: "switch statement কী? [বোর্ড অনুশীলনী ২০২৪]", a: "একটি expression-এর মান অনুযায়ী একাধিক case থেকে নির্দিষ্ট block execute করার statement হলো switch।", type: "জ্ঞানমূলক" as const },
    { q: "nested if কী? [যশোর বোর্ড ২০১৭]", a: "একটি if বা else block-এর ভিতরে আরেকটি if statement ব্যবহার করাকে nested if বলে।", type: "জ্ঞানমূলক" as const },
  ],
  analyticalQuestions: [
    { q: "ধনাত্মক ও ঋণাত্মক সংখ্যা নির্ণয়ে if-else কেন প্রয়োজন? [বোর্ড অনুশীলনী ২০২৪]", a: "সংখ্যা শূন্যের চেয়ে বড়/সমান নাকি ছোট তা যাচাই করতে condition লাগে। condition সত্য হলে positive এবং মিথ্যা হলে negative branch execute হয়, তাই if-else উপযোগী।", type: "অনুধাবনমূলক" as const },
    { q: "লিপ ইয়ার নির্ণয়ের শর্ত ব্যাখ্যা কর। [কুমিল্লা বোর্ড ২০২৪]", a: "কোনো বছর ৪০০ দ্বারা বিভাজ্য হলে leap year। আবার ১০০ দ্বারা বিভাজ্য না হয়ে ৪ দ্বারা বিভাজ্য হলেও leap year। তাই condition: (y%400==0) || ((y%100!=0)&&(y%4==0))।", type: "অনুধাবনমূলক" as const },
    { q: "switch statement কখন else-if এর বিকল্প হিসেবে ব্যবহার করা যায়? [বোর্ড অনুশীলনী ২০২৪]", a: "একটি expression-এর নির্দিষ্ট discrete মানের উপর ভিত্তি করে অনেকগুলো branch নির্বাচন করতে হলে switch ব্যবহার করা যায়। এতে case, break ও default ব্যবহৃত হয়।", type: "অনুধাবনমূলক" as const },
    { q: "তিনটি সংখ্যার মধ্যে বড় সংখ্যা নির্ণয়ে nested if কীভাবে কাজ করে? [চট্টগ্রাম বোর্ড ২০১৯]", a: "প্রথমে a কে b ও c-এর সাথে তুলনা করা যায়। a বড় না হলে b ও c তুলনা করা হয়। এই ধারাবাহিক decision-ই nested বা else-if কাঠামোতে সমাধান হয়।", type: "অনুধাবনমূলক" as const },
    { q: "5 ও 7 দ্বারা বিভাজ্যতার প্রোগ্রামে && operator কেন আগে পরীক্ষা করা উচিত? [চট্টগ্রাম বোর্ড ২০২৪]", a: "যদি আগে শুধু 5 বা শুধু 7 পরীক্ষা করা হয়, তাহলে উভয় দ্বারা বিভাজ্য সংখ্যাও Flower বা River branch-এ চলে যেতে পারে। তাই 5 ও 7 উভয়ের condition আগে পরীক্ষা করলে Good সঠিকভাবে দেখায়।", type: "অনুধাবনমূলক" as const },
  ],
};
