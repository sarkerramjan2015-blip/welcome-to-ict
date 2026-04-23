import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
    {
      q: "কোন লুপটি অন্তত একবার অবশ্যই এক্সিকিউট হয়?",
      options: ["for", "while", "do-while", "nested loop"],
      correct: "do-while",
      explanation:
        "do-while লুপে শর্ত শেষে চেক করা হয়, তাই শর্ত মিথ্যা হলেও প্রথমবার কাজ সম্পন্ন হয়।",
    },
    {
      q: "for(i=1; i<=10; i++) লুপটি কতবার চলবে?",
      options: ["৯ বার", "১০ বার", "১১ বার", "অসীম"],
      correct: "১০ বার",
      explanation:
        "i এর মান 1 থেকে শুরু হয়ে 10 পর্যন্ত চলবে (1, 2, ..., 10), অর্থাৎ মোট 10 বার।",
    },
  ];
