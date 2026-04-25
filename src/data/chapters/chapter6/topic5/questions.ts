import { ShortQuestion } from "../../../ict-syllabus";

export const questions: { knowledgeQuestions: ShortQuestion[]; analyticalQuestions: ShortQuestion[] } = {
  "knowledgeQuestions": [
    {
      "q": "ডেটা সর্টিং কী? [সিলেট বোর্ড ২০১৯]",
      "a": "ডেটাবেজের recordগুলোকে এক বা একাধিক field-এর মান অনুযায়ী ঊর্ধ্বক্রম বা নিম্নক্রমে সাজানোকে sorting বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "ইনডেক্সিং কী? [বরিশাল বোর্ড ২০১৯]",
      "a": "ডেটা দ্রুত খুঁজে বের করার জন্য নির্দিষ্ট field-এর উপর সূচি তৈরি করার প্রক্রিয়াকে indexing বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "Ascending Order কী? [মাদরাসা বোর্ড ২০১৯]",
      "a": "ছোট থেকে বড় বা A থেকে Z ক্রমে data সাজানোকে ascending order বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "Descending Order কী? [সমন্বিত বোর্ড ২০১৮]",
      "a": "বড় থেকে ছোট বা Z থেকে A ক্রমে data সাজানোকে descending order বলে।",
      "type": "জ্ঞানমূলক"
    }
  ],
  "analyticalQuestions": [
    {
      "q": "সর্টিং ও ইনডেক্সিং এক নয় - ব্যাখ্যা কর। [ঢাকা বোর্ড ২০১৭]",
      "a": "Sorting record সাজিয়ে output দেখায়, কিন্তু indexing মূল file পরিবর্তন না করে দ্রুত search-এর জন্য index file তৈরি করে। তাই দুটির উদ্দেশ্য ও প্রক্রিয়া আলাদা।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "ইনডেক্স করা টেবিলে data entry হলে index file স্বয়ংক্রিয়ভাবে update হয় - ব্যাখ্যা কর। [রাজশাহী বোর্ড ২০১৭]",
      "a": "DBMS নতুন record-এর key value ও location index file-এ যুক্ত করে; তাই মূল file না বদলিয়েও search order সঠিক থাকে।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "ইনডেক্সিং database system-এর কাজের গতি বাড়ায় কেন? [দিনাজপুর বোর্ড ২০১৭]",
      "a": "Index key value সাজিয়ে রাখে; DBMS পুরো table scan না করে index দেখে record location পায়, ফলে search দ্রুত হয়।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "ইনডেক্সিং মূল file পরিবর্তন করে না - ব্যাখ্যা কর। [কুমিল্লা বোর্ড ২০১৭]",
      "a": "Index একটি আলাদা logical structure বা file; এতে key ও address থাকে, কিন্তু মূল table-এর physical record order বদলানো হয় না।",
      "type": "অনুধাবনমূলক"
    }
  ]
};
