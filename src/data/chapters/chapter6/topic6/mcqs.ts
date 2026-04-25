import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  {
    "q": "Relational data model-এর প্রবর্তক কে? [বরিশাল বোর্ড ২০১৯]",
    "options": [
      "George Boole",
      "Marshall McLuhan",
      "Karel Capek",
      "E. F. Codd"
    ],
    "correct": "E. F. Codd",
    "explanation": "Relational model প্রবর্তন করেন Edgar F. Codd।"
  },
  {
    "q": "Many-to-Many relation তৈরিতে কোন table ব্যবহৃত হয়? [মাদরাসা বোর্ড ২০১৯]",
    "options": [
      "Main table",
      "Junction table",
      "Report table",
      "Form table"
    ],
    "correct": "Junction table",
    "explanation": "Many-to-many ভাঙতে junction/bridge table লাগে।"
  },
  {
    "q": "ডেটাবেজের ভিত্তি কোনটি? [সমন্বিত বোর্ড ২০১৮]",
    "options": [
      "ফিল্ড",
      "রেকর্ড",
      "টেবিল",
      "কুয়েরি"
    ],
    "correct": "ফিল্ড",
    "explanation": "Field হলো data collection-এর মৌলিক column structure।"
  },
  {
    "q": "Primary key হতে পারে কোন field? [ঢাকা বোর্ড ২০১৭]",
    "options": [
      "Name",
      "Address",
      "Fee",
      "Mobile No."
    ],
    "correct": "Mobile No.",
    "explanation": "Mobile No সাধারণত unique হতে পারে।"
  },
  {
    "q": "Foreign key-এর সাথে primary key-এর relation কিরূপ? [রাজশাহী বোর্ড ২০১৭]",
    "options": [
      "One to One",
      "One to Many",
      "Many to One",
      "Many to Many"
    ],
    "correct": "One to Many",
    "explanation": "এক primary key value অনেক foreign key record-এ reference হতে পারে।"
  },
  {
    "q": "একটি record-এর সাথে অনেকগুলো record সম্পর্কযুক্ত হয় কোন relation-এ? [দিনাজপুর বোর্ড ২০১৭]",
    "options": [
      "One to One",
      "One to Many",
      "Many to One",
      "Many to Many"
    ],
    "correct": "One to Many",
    "explanation": "One-to-many relation-এ parent-এর এক record child-এর অনেক record-এর সাথে যুক্ত।"
  },
  {
    "q": "কোনো table-এর Roll field primary key কেন? [কুমিল্লা বোর্ড ২০১৭]",
    "options": [
      "Roll সংখ্যা দিয়ে লেখা",
      "একাধিক ছাত্রের একই Roll হতে পারে না",
      "Roll পরিবর্তনশীল",
      "প্রতি Roll value"
    ],
    "correct": "একাধিক ছাত্রের একই Roll হতে পারে না",
    "explanation": "Unique identifier হওয়ায় Roll primary key হতে পারে।"
  },
  {
    "q": "Roll field relation তৈরিতে কেন গুরুত্বপূর্ণ? [চট্টগ্রাম বোর্ড ২০১৭]",
    "options": [
      "Common field হিসেবে",
      "OLE object হিসেবে",
      "শুধু text হিসেবে",
      "password হিসেবে"
    ],
    "correct": "Common field হিসেবে",
    "explanation": "দুটি table-এর common key relation তৈরি করে।"
  },
  {
    "q": "Candidate key কী? [সিলেট বোর্ড ২০১৭]",
    "options": [
      "Record uniquely identify করতে পারে এমন field",
      "সব duplicate field",
      "শুধু Memo",
      "শুধু foreign value"
    ],
    "correct": "Record uniquely identify করতে পারে এমন field",
    "explanation": "Primary key হওয়ার যোগ্য key হলো candidate key।"
  },
  {
    "q": "Composite key গঠিত হয় কী দিয়ে? [বরিশাল বোর্ড ২০১৭]",
    "options": [
      "একাধিক field",
      "একটি fixed image",
      "শুধু Memo",
      "শুধু password"
    ],
    "correct": "একাধিক field",
    "explanation": "Composite key multiple attributes নিয়ে গঠিত।"
  },
  {
    "q": "এক table-এর primary key অন্য table-এ ব্যবহৃত হলে সেটি কী? [ঢাকা বোর্ড ২০১৬]",
    "options": [
      "Foreign key",
      "Memo key",
      "Sort key",
      "Cipher key"
    ],
    "correct": "Foreign key",
    "explanation": "Foreign key referenced primary key।"
  },
  {
    "q": "Primary key-এর মান কেমন হয়? [রাজশাহী বোর্ড ২০১৬]",
    "options": [
      "Unique ও Not Null",
      "Duplicate",
      "শুধু Null",
      "সবসময় text"
    ],
    "correct": "Unique ও Not Null",
    "explanation": "Primary key duplicate/null হতে পারে না।"
  },
  {
    "q": "Foreign key-এর মান কী হতে পারে? [দিনাজপুর বোর্ড ২০১৬]",
    "options": [
      "Referenced primary key value",
      "যেকোনো unrelated value",
      "শুধু ছবি",
      "শুধু date"
    ],
    "correct": "Referenced primary key value",
    "explanation": "Referential integrity বজায় রাখতে foreign key reference table-এর value নেয়।"
  },
  {
    "q": "ER diagram কী প্রকাশ করে? [কুমিল্লা বোর্ড ২০১৬]",
    "options": [
      "Entity ও relationship",
      "শুধু color",
      "শুধু encryption key",
      "শুধু sound"
    ],
    "correct": "Entity ও relationship",
    "explanation": "ERD database design-এর graphical model।"
  },
  {
    "q": "Composite attribute কী? [চট্টগ্রাম বোর্ড ২০১৬]",
    "options": [
      "একাধিক simple attribute-এর সমন্বয়",
      "একটি indivisible attribute",
      "অন্য field থেকে নির্ধারিত",
      "শুধু one value"
    ],
    "correct": "একাধিক simple attribute-এর সমন্বয়",
    "explanation": "Address হতে পারে House, Road, City ইত্যাদির সমন্বয়।"
  },
  {
    "q": "Derived attribute কী? [সিলেট বোর্ড ২০১৬]",
    "options": [
      "অন্য attribute থেকে নির্ধারিত",
      "একটি মাত্র মান",
      "শুধু OLE",
      "শুধু hyperlink"
    ],
    "correct": "অন্য attribute থেকে নির্ধারিত",
    "explanation": "Age DOB থেকে derived হতে পারে।"
  },
  {
    "q": "Network model কোন relation support করে? [যশোর বোর্ড ২০১৬]",
    "options": [
      "Many-to-Many",
      "শুধু One-to-One",
      "শুধু Unary",
      "কোনো relation নয়"
    ],
    "correct": "Many-to-Many",
    "explanation": "Network model বহু parent-child relation support করে।"
  },
  {
    "q": "Hierarchical model-এর structure কেমন? [মাদরাসা বোর্ড ২০১৬]",
    "options": [
      "গাছের মতো",
      "শুধু table",
      "শুধু graph chart",
      "শুধু list"
    ],
    "correct": "গাছের মতো",
    "explanation": "Hierarchical database tree structure ব্যবহার করে।"
  },
  {
    "q": "One-to-One relation-এর উদাহরণ কোনটি? [ঢাকা বোর্ড ২০১৯]",
    "options": [
      "এক ব্যক্তি ও একটি জাতীয় পরিচয় record",
      "এক শিক্ষক ও অনেক class",
      "অনেক student ও অনেক course",
      "অনেক invoice ও এক customer"
    ],
    "correct": "এক ব্যক্তি ও একটি জাতীয় পরিচয় record",
    "explanation": "এক entity-এর এক record অন্য entity-এর এক record-এর সাথে যুক্ত।"
  },
  {
    "q": "Many-to-Many relation বাস্তবায়নে কী দরকার? [রাজশাহী বোর্ড ২০১৯]",
    "options": [
      "তৃতীয় junction table",
      "শুধু password",
      "শুধু report",
      "শুধু image field"
    ],
    "correct": "তৃতীয় junction table",
    "explanation": "Bridge table দুটি foreign key ধারণ করে।"
  },
  {
    "q": "Table relation তৈরির সময় common field-এর data type কেমন হওয়া উচিত? [দিনাজপুর বোর্ড ২০১৯]",
    "options": [
      "একই",
      "ভিন্ন",
      "শুধু Memo",
      "অপ্রাসঙ্গিক"
    ],
    "correct": "একই",
    "explanation": "Matching data type relation integrity বজায় রাখে।"
  }
];
