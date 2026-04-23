import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
    {
      q: "একজন কাস্টমার একাধিক অর্ডার করতে পারে। এটি কোন ধরনের রিলেশনশিপ?",
      options: ["One-to-One", "One-to-Many", "Many-to-Many", "Many-to-One"],
      correct: "One-to-Many",
      explanation:
        "একজন কাস্টমার (One) একাধিক অর্ডার (Many) করতে পারে, তাই এটি One-to-Many রিলেশনশিপ।",
    },
    {
      q: "Many-to-Many রিলেশনশিপ স্থাপনের জন্য অতিরিক্ত কয়টি টেবিল প্রয়োজন হয়?",
      options: ["১টি", "২টি", "৩টি", "প্রয়োজন নেই"],
      correct: "১টি",
      explanation:
        "Many-to-Many রিলেশনশিপ সরাসরি তৈরি করা যায় না। এর জন্য একটি তৃতীয় টেবিল (Junction Table) তৈরি করতে হয়।",
    },
  ];
