import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  {
    "q": "ডেটা টেবিলে ইমেজ সংযোজনের জন্য কোন ডেটা টাইপ ব্যবহার করতে হয়? [রাজশাহী বোর্ড ২০১৬]",
    "options": [
      "Calculated",
      "Lookup Wizard",
      "OLE Object",
      "Logical"
    ],
    "correct": "OLE Object",
    "explanation": "Image বা multimedia object রাখার জন্য OLE Object ব্যবহৃত হয়।"
  },
  {
    "q": "শিক্ষার্থীর বায়োডাটাতে Photograph কোন ডেটা টাইপ? [দিনাজপুর বোর্ড ২০১৬]",
    "options": [
      "Memo",
      "Hyperlink",
      "OLE Object",
      "Lookup Wizard"
    ],
    "correct": "OLE Object",
    "explanation": "Photograph object data হিসেবে OLE Object-এ রাখা যায়।"
  },
  {
    "q": "Date of Admission ফিল্ডের জন্য সাধারণত কত byte memory লাগে? [কুমিল্লা বোর্ড ২০১৬]",
    "options": [
      "1",
      "4",
      "8",
      "16"
    ],
    "correct": "8",
    "explanation": "Date/Time ফিল্ডে সাধারণত 8 byte লাগে।"
  },
  {
    "q": "শ্রমিকের বেতনের ডেটা টাইপ কী? [চট্টগ্রাম বোর্ড ২০১৬]",
    "options": [
      "Character",
      "Numeric",
      "Memo",
      "Currency"
    ],
    "correct": "Currency",
    "explanation": "বেতন monetary value, তাই Currency উপযুক্ত।"
  },
  {
    "q": "Yes/No ডেটার storage size সাধারণত কত? [সিলেট বোর্ড ২০১৬]",
    "options": [
      "১",
      "২",
      "৪",
      "৮"
    ],
    "correct": "১",
    "explanation": "বোর্ড প্রশ্নে Yes/No storage ১ হিসেবে ধরা হয়েছে।"
  },
  {
    "q": "Text ডেটা টাইপে সর্বোচ্চ কত character রাখা যায়? [যশোর বোর্ড ২০১৬]",
    "options": [
      "128",
      "255",
      "256",
      "512"
    ],
    "correct": "255",
    "explanation": "Short Text field সাধারণত 255 character ধারণ করে।"
  },
  {
    "q": "Name কোন ধরনের ডেটা? [মাদরাসা বোর্ড ২০১৬]",
    "options": [
      "Logical",
      "Number",
      "Text",
      "Currency"
    ],
    "correct": "Text",
    "explanation": "ব্যক্তির নাম alphabetic/text data।"
  },
  {
    "q": "ব্যক্তির নামের জন্য কোন ডেটা টাইপ উপযুক্ত? [ঢাকা বোর্ড ২০১৯]",
    "options": [
      "Text",
      "Record",
      "Number",
      "Value"
    ],
    "correct": "Text",
    "explanation": "নামের জন্য Text field ব্যবহৃত হয়।"
  },
  {
    "q": "Roll ফিল্ডের ডেটা টাইপ হতে পারে কোনগুলো? [রাজশাহী বোর্ড ২০১৯]",
    "options": [
      "Byte ও Integer",
      "Text ও Integer",
      "Byte, Text ও Integer",
      "Memo মাত্র"
    ],
    "correct": "Byte, Text ও Integer",
    "explanation": "Roll number numeric বা code হলে Text হতে পারে।"
  },
  {
    "q": "ডেটাবেজ থেকে web page link করার জন্য কোন ডেটা টাইপ? [দিনাজপুর বোর্ড ২০১৯]",
    "options": [
      "OLE Object",
      "Memo",
      "Hyperlink",
      "Lookup Wizard"
    ],
    "correct": "Hyperlink",
    "explanation": "URL বা file path রাখার জন্য Hyperlink ব্যবহৃত হয়।"
  },
  {
    "q": "সরাসরি data entry না করে list থেকে মান নিতে কোন data type? [কুমিল্লা বোর্ড ২০১৯]",
    "options": [
      "Memo",
      "Currency",
      "Lookup Wizard",
      "OLE Object"
    ],
    "correct": "Lookup Wizard",
    "explanation": "Lookup Wizard list/table থেকে value নির্বাচন করায়।"
  },
  {
    "q": "ধারাবাহিক serial number স্বয়ংক্রিয়ভাবে দিতে কোন data type? [চট্টগ্রাম বোর্ড ২০১৯]",
    "options": [
      "AutoNumber",
      "Memo",
      "Hyperlink",
      "OLE Object"
    ],
    "correct": "AutoNumber",
    "explanation": "AutoNumber field নিজে নিজে serial value দেয়।"
  },
  {
    "q": "মন্তব্য বা address-এর জন্য কোন data type বেশি উপযোগী? [সিলেট বোর্ড ২০১৯]",
    "options": [
      "Memo",
      "Currency",
      "Yes/No",
      "AutoNumber"
    ],
    "correct": "Memo",
    "explanation": "বর্ণনামূলক দীর্ঘ text রাখার জন্য Memo উপযোগী।"
  },
  {
    "q": "গাণিতিক কাজ করা যায় কোন data type-এ? [বরিশাল বোর্ড ২০১৯]",
    "options": [
      "Short Text",
      "Number",
      "Memo",
      "OLE Object"
    ],
    "correct": "Number",
    "explanation": "Number field-এ arithmetic operation করা যায়।"
  },
  {
    "q": "টাকার হিসাব রাখার জন্য কোন data type নির্বাচন করা উচিত? [মাদরাসা বোর্ড ২০১৯]",
    "options": [
      "Currency",
      "Memo",
      "Hyperlink",
      "Yes/No"
    ],
    "correct": "Currency",
    "explanation": "Currency monetary precision বজায় রাখে।"
  },
  {
    "q": "Date of Birth ফিল্ডের উপযুক্ত data type কোনটি? [সমন্বিত বোর্ড ২০১৮]",
    "options": [
      "Text",
      "Date/Time",
      "Memo",
      "OLE Object"
    ],
    "correct": "Date/Time",
    "explanation": "জন্মতারিখ date value, তাই Date/Time।"
  },
  {
    "q": "Logical field প্রকাশে কোন data type ব্যবহৃত হয়? [ঢাকা বোর্ড ২০১৭]",
    "options": [
      "Yes/No",
      "Currency",
      "Memo",
      "OLE Object"
    ],
    "correct": "Yes/No",
    "explanation": "Yes/No true/false logical data রাখে।"
  },
  {
    "q": "Short Text-এ সংখ্যা রাখা হলে কী করা যায় না? [রাজশাহী বোর্ড ২০১৭]",
    "options": [
      "সংরক্ষণ",
      "প্রদর্শন",
      "গাণিতিক operation",
      "সাজানো"
    ],
    "correct": "গাণিতিক operation",
    "explanation": "Text হিসেবে রাখা সংখ্যা arithmetic calculation-এ সরাসরি ব্যবহৃত হয় না।"
  },
  {
    "q": "Excel বা PowerPoint থেকে গ্রাফ link/embed করতে কোন type? [দিনাজপুর বোর্ড ২০১৭]",
    "options": [
      "Hyperlink",
      "OLE Object",
      "Number",
      "Yes/No"
    ],
    "correct": "OLE Object",
    "explanation": "OLE Object বাইরের application object embed/link করে।"
  },
  {
    "q": "ডেটাবেজ টেবিল তৈরি করার আগে কী নির্ধারণ জরুরি? [কুমিল্লা বোর্ড ২০১৭]",
    "options": [
      "ফিল্ড ও data type",
      "শুধু রং",
      "মনিটর size",
      "printer brand"
    ],
    "correct": "ফিল্ড ও data type",
    "explanation": "টেবিল design-এর মূল কাজ হলো field ও data type নির্বাচন।"
  }
];
