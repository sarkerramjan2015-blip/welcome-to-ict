import { ShortQuestion } from "../../../ict-syllabus";

export const questions: { knowledgeQuestions: ShortQuestion[]; analyticalQuestions: ShortQuestion[] } = {
  "knowledgeQuestions": [
    {
      "q": "কুয়েরি কী? [সিলেট বোর্ড ২০১৬]",
      "a": "শর্ত সাপেক্ষে ডেটাবেজ থেকে প্রয়োজনীয় তথ্য খুঁজে বের করাকে কুয়েরি বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "কুয়েরি ভাষা কী? [যশোর বোর্ড ২০১৬]",
      "a": "কুয়েরি করার জন্য ব্যবহৃত ভাষাকে কুয়েরি ভাষা বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "SQL কী? [মাদরাসা বোর্ড ২০১৬]",
      "a": "Structured Query Language হলো relational database পরিচালনার একটি non-procedural query language।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "DDL ও DML কী? [ঢাকা বোর্ড ২০১৯]",
      "a": "DDL database structure তৈরি/পরিবর্তন করে; DML table-এর data insert, update ও delete করে।",
      "type": "জ্ঞানমূলক"
    }
  ],
  "analyticalQuestions": [
    {
      "q": "ডেটাবেজে কুয়েরির প্রয়োজনীয়তা ব্যাখ্যা কর। [রাজশাহী বোর্ড ২০১৯]",
      "a": "কুয়েরি দিয়ে বিশাল ডেটাবেজ থেকে নির্দিষ্ট field বা record দ্রুত বের করা যায় এবং প্রয়োজনে update, delete, insert operation করা যায়।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "SQL-কে ডেটাবেজের হাতিয়ার বলা হয় কেন? [দিনাজপুর বোর্ড ২০১৯]",
      "a": "SQL দিয়ে table তৈরি, পরিবর্তন, delete, data query, insert, update ও access control করা যায়; তাই এটি database ব্যবস্থাপনার শক্তিশালী হাতিয়ার।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "SQL non-procedural language কেন? [কুমিল্লা বোর্ড ২০১৯]",
      "a": "SQL-এ ব্যবহারকারী কী data দরকার তা বলে; data কীভাবে খুঁজে আনবে তা DBMS query optimizer নির্ধারণ করে। তাই SQL non-procedural।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "SQL-কে অতি উচ্চস্তরের ভাষা বলা হয় কেন? [চট্টগ্রাম বোর্ড ২০১৯]",
      "a": "SQL কমান্ডগুলো মানুষের ভাষার কাছাকাছি এবং database কাজ সরাসরি প্রকাশ করে, তাই একে অতি উচ্চস্তরের ভাষা বলা হয়।",
      "type": "অনুধাবনমূলক"
    }
  ]
};
