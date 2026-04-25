import { ShortQuestion } from "../../../ict-syllabus";

export const questions: { knowledgeQuestions: ShortQuestion[]; analyticalQuestions: ShortQuestion[] } = {
  "knowledgeQuestions": [
    {
      "q": "কী ফিল্ড কী? [চট্টগ্রাম বোর্ড ২০১৭]",
      "a": "Record শনাক্তকরণ, অনুসন্ধান এবং table relation তৈরিতে ব্যবহৃত field-কে key field বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "প্রাইমারি কী কাকে বলে? [সিলেট বোর্ড ২০১৭]",
      "a": "টেবিলের প্রতিটি record-কে অদ্বিতীয়ভাবে শনাক্তকারী নির্বাচিত key field-কে primary key বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "ফরেন কী কাকে বলে? [বরিশাল বোর্ড ২০১৭]",
      "a": "এক table-এর primary key অন্য table-এ relation তৈরির জন্য ব্যবহৃত হলে তাকে foreign key বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "কম্পোজিট প্রাইমারি কী কী? [ঢাকা বোর্ড ২০১৬]",
      "a": "একাধিক field-এর সমন্বয়ে গঠিত primary key-কে composite primary key বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "ডেটাবেজ রিলেশন কী? [রাজশাহী বোর্ড ২০১৬]",
      "a": "বিভিন্ন data table-এর মধ্যকার logical relationship-কে database relation বলে।",
      "type": "জ্ঞানমূলক"
    }
  ],
  "analyticalQuestions": [
    {
      "q": "কম্পোজিট প্রাইমারি কী কেন ব্যবহার করা হয়? [দিনাজপুর বোর্ড ২০১৬]",
      "a": "যখন একক কোনো field record uniquely identify করতে পারে না, তখন একাধিক field একত্রে primary key হিসেবে ব্যবহার করা হয়।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "Primary key ও foreign key-এর data type একই হওয়া দরকার কেন? [কুমিল্লা বোর্ড ২০১৬]",
      "a": "Foreign key-এর value reference table-এর primary key value-এর সাথে মিলতে হয়; তাই data type, size ও format সামঞ্জস্যপূর্ণ হওয়া জরুরি।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "Primary key ও foreign key এক নয় - ব্যাখ্যা কর। [চট্টগ্রাম বোর্ড ২০১৬]",
      "a": "Primary key নিজ table-এর record uniquely identify করে; foreign key অন্য table-এর primary key reference করে relation তৈরি করে এবং duplicate/null হতে পারে।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "প্রাইমারি কী-এর অদ্বিতীয়তা বলতে কী বোঝায়? [সিলেট বোর্ড ২০১৬]",
      "a": "Primary key field-এর প্রতিটি মান ভিন্ন হতে হবে, যাতে প্রতিটি record আলাদাভাবে শনাক্ত করা যায়।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "দুটি table-এর মধ্যে relation তৈরির প্রধান শর্ত লেখ। [যশোর বোর্ড ২০১৬]",
      "a": "কমপক্ষে একটি common field থাকতে হবে; common field-এর data type/size/format একই হতে হবে এবং অন্তত একটি table-এ primary key থাকতে হবে।",
      "type": "অনুধাবনমূলক"
    }
  ]
};
