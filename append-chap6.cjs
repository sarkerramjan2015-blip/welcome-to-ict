const fs = require('fs');
const path = require('path');

const chap6 = {
  id: "chap-6",
  title: "অধ্যায় ৬: ডেটাবেজ ম্যানেজমেন্ট সিস্টেম",
  topics: [
    {
      id: "c6-t1",
      title: "ডেটাবেজ এর প্রাথমিক ধারণা",
      board_notes: "ডেটাবেজ (Database) হলো পরস্পর সম্পর্কযুক্ত ডেটার একটি সুসংগঠিত সংগ্রহ, যা সহজে অ্যাক্সেস, পরিচালনা এবং আপডেট করা যায়। ডেটা (Data) হলো তথ্যের ক্ষুদ্রতম একক, আর ইনফরমেশন (Information) হলো প্রক্রিয়াজাত ডেটা। একটি ডেটাবেজ টেবিল, রেকর্ড (সারি) এবং ফিল্ড (কলাম) নিয়ে গঠিত হয়।",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
      shortQuestions: [
        { q: "ডেটাবেজ কী?", a: "ডেটাবেজ হলো পরস্পর সম্পর্কযুক্ত ডেটার একটি সুসংগঠিত সংগ্রহ, যা সহজে অ্যাক্সেস, পরিচালনা এবং আপডেট করা যায়।", type: "জ্ঞানমূলক" },
        { q: "ডেটা ও ইনফরমেশনের মধ্যে পার্থক্য কী?", a: "ডেটা হলো তথ্যের কাঁচামাল বা ক্ষুদ্রতম একক, আর ইনফরমেশন হলো ডেটাকে প্রক্রিয়াজাত করার পর প্রাপ্ত অর্থপূর্ণ ফলাফল।", type: "অনুধাবনমূলক" }
      ],
      practiceMcqs: [
        { q: "ডেটাবেজের ক্ষুদ্রতম একক কোনটি?", options: ["রেকর্ড", "ফিল্ড", "টেবিল", "ডেটা"], correct: "ডেটা", explanation: "ডেটাবেজের সবচেয়ে ক্ষুদ্রতম একক হলো ডেটা বা উপাত্ত।" },
        { q: "পরস্পর সম্পর্কযুক্ত কয়েকটি ফিল্ড নিয়ে কী গঠিত হয়?", options: ["টেবিল", "ডেটাবেজ", "রেকর্ড", "ফাইল"], correct: "রেকর্ড", explanation: "একটি টেবিলের একটি সারিতে থাকা পরস্পর সম্পর্কযুক্ত ফিল্ডগুলোর সমষ্টিকে রেকর্ড বলে।" }
      ],
      cqs: [
        {
          stem: "একটি কলেজের অধ্যক্ষ ছাত্রদের তথ্য সংরক্ষণের জন্য একটি সিস্টেম তৈরি করতে চাইলেন। সেখানে ছাত্রদের নাম, রোল, ঠিকানা ইত্যাদি আলাদা আলাদা কলামে এবং প্রতিটি ছাত্রের সম্পূর্ণ তথ্য আলাদা সারিতে রাখা হবে।",
          qC: "অধ্যক্ষের তৈরি করা সিস্টেমে কলাম ও সারিগুলোকে ডেটাবেজের ভাষায় কী বলা হয়? ব্যাখ্যা করো।",
          qD: "উক্ত সিস্টেমটি ম্যানুয়াল ফাইলিং সিস্টেমের চেয়ে কতটা সুবিধাজনক? বিশ্লেষণ করো।"
        }
      ],
      quizMcqs: [
        { q: "ডেটাবেজ শব্দের অর্থ কী?", options: ["উপাত্তের ঘাঁটি", "তথ্যের ঘাঁটি", "উপাত্তের বিন্যাস", "তথ্যের বিন্যাস"], correct: "উপাত্তের ঘাঁটি" },
        { q: "পরস্পর সম্পর্কযুক্ত কয়েকটি রেকর্ড নিয়ে কী গঠিত হয়?", options: ["ফিল্ড", "টেবিল বা ফাইল", "ডেটাবেজ", "কলাম"], correct: "টেবিল বা ফাইল" },
        { q: "নিচের কোনটি ডেটাবেজ প্রোগ্রাম নয়?", options: ["Oracle", "MySQL", "MS Access", "MS Word"], correct: "MS Word" },
        { q: "ডেটাবেজের সারিকে (Row) কী বলা হয়?", options: ["ফিল্ড", "রেকর্ড", "টেবিল", "অ্যাট্রিবিউট"], correct: "রেকর্ড" },
        { q: "ডেটাবেজের কলামকে (Column) কী বলা হয়?", options: ["রেকর্ড", "টাপল", "ফিল্ড", "এনটিটি"], correct: "ফিল্ড" },
        { q: "প্রক্রিয়াজাত ডেটাকে কী বলে?", options: ["ইনফরমেশন", "রেকর্ড", "ফাইল", "টেবিল"], correct: "ইনফরমেশন" },
        { q: "ডেটাবেজ অ্যাডমিনিস্ট্রেটর (DBA) এর কাজ কী?", options: ["ডেটাবেজ তৈরি ও নিয়ন্ত্রণ", "ডেটা এন্ট্রি করা", "হার্ডওয়্যার মেরামত", "নেটওয়ার্ক তৈরি"], correct: "ডেটাবেজ তৈরি ও নিয়ন্ত্রণ" },
        { q: "DBMS এর পূর্ণরূপ কী?", options: ["Data Base Management System", "Data Basic Management System", "Data Base Manipulation System", "Data Base Maintenance System"], correct: "Data Base Management System" },
        { q: "RDBMS এর পূর্ণরূপ কী?", options: ["Relational Database Management System", "Regional Database Management System", "Rational Database Management System", "Relational Data Manipulation System"], correct: "Relational Database Management System" },
        { q: "কোনটি ডেটাবেজের সুবিধা নয়?", options: ["ডেটার ডুপ্লিকেশন কমানো", "ডেটার নিরাপত্তা", "ডেটা শেয়ারিং", "ডেটাবেজ তৈরি করা সহজ ও সস্তা"], correct: "ডেটাবেজ তৈরি করা সহজ ও সস্তা" }
      ]
    },
    {
      id: "c6-t2",
      title: "ডেটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS)",
      board_notes: "DBMS হলো এমন একটি সফটওয়্যার যা ডেটাবেজ তৈরি, পরিচালনা, নিয়ন্ত্রণ এবং ডেটা অ্যাক্সেস করার সুবিধা প্রদান করে। এর প্রধান কাজগুলো হলো: নতুন ডেটাবেজ তৈরি করা, ডেটা ইনপুট করা, ডেটা আপডেট বা ডিলিট করা এবং ডেটার নিরাপত্তা নিশ্চিত করা। জনপ্রিয় কয়েকটি DBMS হলো: MySQL, Oracle, Microsoft Access এবং SQL Server।",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      shortQuestions: [
        { q: "DBMS কী?", a: "DBMS (Database Management System) হলো এমন একটি সফটওয়্যার যা ব্যবহারকারীকে ডেটাবেজ তৈরি, পরিচালনা এবং নিয়ন্ত্রণ করার সুবিধা দেয়।", type: "জ্ঞানমূলক" },
        { q: "RDBMS বলতে কী বোঝায়?", a: "RDBMS (Relational Database Management System) হলো এমন একটি DBMS যেখানে ডেটাগুলো পরস্পর সম্পর্কযুক্ত একাধিক টেবিলে সংরক্ষিত থাকে।", type: "অনুধাবনমূলক" }
      ],
      practiceMcqs: [
        { q: "নিচের কোনটি DBMS সফটওয়্যার?", options: ["MS Excel", "Oracle", "Photoshop", "PowerPoint"], correct: "Oracle", explanation: "Oracle হলো একটি অত্যন্ত জনপ্রিয় এবং শক্তিশালী ডেটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS)।" },
        { q: "ডেটাবেজের নিরাপত্তা নিশ্চিত করা কার কাজ?", options: ["অপারেটিং সিস্টেম", "DBMS", "অ্যান্টিভাইরাস", "কম্পাইলার"], correct: "DBMS", explanation: "ডেটাবেজে কে অ্যাক্সেস করতে পারবে এবং কে পারবে না, তা নিয়ন্ত্রণ করে ডেটাবেজের নিরাপত্তা নিশ্চিত করা DBMS এর অন্যতম প্রধান কাজ।" }
      ],
      cqs: [
        {
          stem: "একটি ব্যাংকের ম্যানেজার তাদের গ্রাহকদের তথ্য সংরক্ষণের জন্য এমন একটি সফটওয়্যার ব্যবহার করেন যা দিয়ে সহজে নতুন গ্রাহকের তথ্য যুক্ত করা যায়, পুরোনো তথ্য আপডেট করা যায় এবং গ্রাহকদের তথ্যের নিরাপত্তা নিশ্চিত করা যায়।",
          qC: "ম্যানেজারের ব্যবহৃত সফটওয়্যারটি কোন ধরনের? এর কার্যাবলি ব্যাখ্যা করো।",
          qD: "উক্ত সফটওয়্যারটি ব্যাংকিং সেক্টরে ডেটা ব্যবস্থাপনায় কী ধরনের ভূমিকা পালন করে? বিশ্লেষণ করো।"
        }
      ],
      quizMcqs: [
        { q: "DBMS এর প্রধান কাজ কী?", options: ["ডেটাবেজ পরিচালনা করা", "ছবি এডিট করা", "গান শোনা", "ইন্টারনেট ব্রাউজ করা"], correct: "ডেটাবেজ পরিচালনা করা" },
        { q: "নিচের কোনটি RDBMS এর উদাহরণ?", options: ["MS Word", "MySQL", "Notepad", "Paint"], correct: "MySQL" },
        { q: "ডেটাবেজে একই ডেটা বারবার আসাকে কী বলে?", options: ["Data Redundancy", "Data Inconsistency", "Data Security", "Data Integrity"], correct: "Data Redundancy" },
        { q: "DBMS ডেটা রিডানডেন্সি (Redundancy) কী করে?", options: ["বাড়ায়", "কমায়", "অপরিবর্তিত রাখে", "নিশ্চিত করে"], correct: "কমায়" },
        { q: "ডেটাবেজ থেকে নির্দিষ্ট তথ্য খুঁজে বের করাকে কী বলে?", options: ["সর্টিং", "কোয়েরি", "ইনডেক্সিং", "রিপোর্টিং"], correct: "কোয়েরি" },
        { q: "ডেটাবেজ ফাইল সেভ করার এক্সটেনশন কোনটি (MS Access 2007+)?", options: [".mdb", ".accdb", ".dbf", ".sql"], correct: ".accdb" },
        { q: "ডেটাবেজ টেবিলের ডেটাকে নির্দিষ্ট ক্রমানুসারে সাজানোকে কী বলে?", options: ["কোয়েরি", "সর্টিং", "ইনডেক্সিং", "ফিল্টারিং"], correct: "সর্টিং" },
        { q: "ডেটাবেজের লজিক্যাল স্ট্রাকচারকে কী বলা হয়?", options: ["স্কিমা (Schema)", "ইনস্ট্যান্স", "রেকর্ড", "টেবিল"], correct: "স্কিমা (Schema)" },
        { q: "কোনটি ডেটাবেজ ল্যাঙ্গুয়েজ নয়?", options: ["DDL", "DML", "DCL", "HTML"], correct: "HTML" },
        { q: "SQL এর পূর্ণরূপ কী?", options: ["Structured Query Language", "Standard Query Language", "Simple Query Language", "Sequential Query Language"], correct: "Structured Query Language" }
      ]
    },
    {
      id: "c6-t3",
      title: "কি (Key) এবং এর প্রকারভেদ",
      board_notes: "ডেটাবেজ টেবিলে রেকর্ডগুলোকে অদ্বিতীয়ভাবে (Uniquely) শনাক্ত করার জন্য যে ফিল্ড ব্যবহার করা হয়, তাকে কি (Key) বলে। প্রধান কি-গুলো হলো: প্রাইমারি কি (Primary Key), কম্পোজিট প্রাইমারি কি (Composite Primary Key) এবং ফরেন কি (Foreign Key)। প্রাইমারি কি-এর মান কখনো ফাঁকা (Null) বা ডুপ্লিকেট হতে পারে না। একটি টেবিলের প্রাইমারি কি যখন অন্য টেবিলে সাধারণ ফিল্ড হিসেবে ব্যবহৃত হয়ে দুটি টেবিলের মধ্যে সম্পর্ক স্থাপন করে, তখন তাকে ফরেন কি বলে।",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
      shortQuestions: [
        { q: "প্রাইমারি কি (Primary Key) কী?", a: "যে ফিল্ডের মান দিয়ে ডেটাবেজ টেবিলের প্রতিটি রেকর্ডকে অদ্বিতীয়ভাবে (Uniquely) শনাক্ত করা যায়, তাকে প্রাইমারি কি বলে।", type: "জ্ঞানমূলক" },
        { q: "ফরেন কি (Foreign Key) কেন ব্যবহার করা হয়?", a: "দুটি টেবিলের মধ্যে সম্পর্ক (Relation) স্থাপন করার জন্য একটি টেবিলের প্রাইমারি কি-কে অন্য টেবিলে ফরেন কি হিসেবে ব্যবহার করা হয়।", type: "অনুধাবনমূলক" }
      ],
      practiceMcqs: [
        { q: "কোন কি-এর মান কখনো ডুপ্লিকেট হতে পারে না?", options: ["ফরেন কি", "প্রাইমারি কি", "ক্যান্ডিডেট কি", "সুপার কি"], correct: "প্রাইমারি কি", explanation: "প্রাইমারি কি-এর প্রধান শর্ত হলো এর মান অদ্বিতীয় (Unique) হতে হবে এবং ফাঁকা (Null) থাকা যাবে না।" },
        { q: "দুটি টেবিলের মধ্যে সম্পর্ক স্থাপনে কোনটি ব্যবহৃত হয়?", options: ["প্রাইমারি কি", "ফরেন কি", "কম্পোজিট কি", "ক্যান্ডিডেট কি"], correct: "ফরেন কি", explanation: "একটি টেবিলের প্রাইমারি কি অন্য টেবিলে ফরেন কি হিসেবে কাজ করে এবং টেবিল দুটির মধ্যে রিলেশন তৈরি করে।" }
      ],
      cqs: [
        {
          stem: "টেবিল-১ এ 'Roll', 'Name', 'Class' ফিল্ড আছে। টেবিল-২ এ 'Roll', 'Subject', 'Marks' ফিল্ড আছে। 'Roll' ফিল্ডের মান দিয়ে যেকোনো ছাত্রকে অদ্বিতীয়ভাবে শনাক্ত করা যায়।",
          qC: "উদ্দীপকের টেবিল-১ এ 'Roll' ফিল্ডটি কোন ধরনের কি? ব্যাখ্যা করো।",
          qD: "টেবিল-১ এবং টেবিল-২ এর মধ্যে সম্পর্ক স্থাপনে 'Roll' ফিল্ডের ভূমিকা বিশ্লেষণ করো।"
        }
      ],
      quizMcqs: [
        { q: "রেকর্ড শনাক্তকরণের জন্য ব্যবহৃত ফিল্ডকে কী বলে?", options: ["অ্যাট্রিবিউট", "কি (Key)", "টাপল", "এনটিটি"], correct: "কি (Key)" },
        { q: "প্রাইমারি কি-এর বৈশিষ্ট্য কোনটি?", options: ["মান ডুপ্লিকেট হতে পারে", "মান Null হতে পারে", "মান অদ্বিতীয় (Unique) হয়", "এটি ব্যবহার করা বাধ্যতামূলক নয়"], correct: "মান অদ্বিতীয় (Unique) হয়" },
        { q: "একাধিক ফিল্ডের সমন্বয়ে গঠিত প্রাইমারি কি-কে কী বলে?", options: ["ফরেন কি", "কম্পোজিট প্রাইমারি কি", "ক্যান্ডিডেট কি", "সুপার কি"], correct: "কম্পোজিট প্রাইমারি কি" },
        { q: "স্টুডেন্ট টেবিলে কোনটি প্রাইমারি কি হতে পারে?", options: ["Name", "Address", "Roll_No", "Age"], correct: "Roll_No" },
        { q: "যেসব ফিল্ড প্রাইমারি কি হওয়ার যোগ্যতা রাখে, তাদের কী বলে?", options: ["ফরেন কি", "ক্যান্ডিডেট কি", "কম্পোজিট কি", "সুপার কি"], correct: "ক্যান্ডিডেট কি" },
        { q: "একটি টেবিলে কয়টি প্রাইমারি কি থাকতে পারে?", options: ["১টি", "২টি", "৩টি", "অসংখ্য"], correct: "১টি" },
        { q: "ফরেন কি-এর মান কোথা থেকে আসে?", options: ["ব্যবহারকারীর ইনপুট থেকে", "অন্য টেবিলের প্রাইমারি কি থেকে", "সিস্টেম জেনারেট করে", "র‍্যান্ডমভাবে তৈরি হয়"], correct: "অন্য টেবিলের প্রাইমারি কি থেকে" },
        { q: "ফরেন কি-এর মান কি ডুপ্লিকেট হতে পারে?", options: ["হ্যাঁ", "না", "কখনোই না", "শর্তসাপেক্ষে"], correct: "হ্যাঁ" },
        { q: "প্রাইমারি কি এবং ফরেন কি-এর ডেটা টাইপ কেমন হতে হয়?", options: ["ভিন্ন", "একই", "যেকোনো একটি", "নির্ভর করে না"], correct: "একই" },
        { q: "ডেটাবেজ রিলেশনশিপ তৈরি করার প্রধান শর্ত কী?", options: ["টেবিলগুলোর নাম একই হতে হবে", "টেবিলগুলোতে একটি কমন ফিল্ড (Key) থাকতে হবে", "টেবিলগুলোতে সমান সংখ্যক ফিল্ড থাকতে হবে", "টেবিলগুলোতে সমান সংখ্যক রেকর্ড থাকতে হবে"], correct: "টেবিলগুলোতে একটি কমন ফিল্ড (Key) থাকতে হবে" }
      ]
    },
    {
      id: "c6-t4",
      title: "ডেটাবেজ রিলেশনশিপ",
      board_notes: "একাধিক ডেটাবেজ টেবিলের মধ্যে কমন ফিল্ডের (Primary Key ও Foreign Key) ভিত্তিতে যে সম্পর্ক তৈরি করা হয়, তাকে ডেটাবেজ রিলেশনশিপ বলে। রিলেশনশিপ প্রধানত চার প্রকার: One-to-One (একটি রেকর্ডের সাথে অন্য টেবিলের একটি রেকর্ডের সম্পর্ক), One-to-Many (একটি রেকর্ডের সাথে একাধিক রেকর্ডের সম্পর্ক), Many-to-One (একাধিক রেকর্ডের সাথে একটি রেকর্ডের সম্পর্ক) এবং Many-to-Many (একাধিক রেকর্ডের সাথে একাধিক রেকর্ডের সম্পর্ক)।",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      shortQuestions: [
        { q: "ডেটাবেজ রিলেশনশিপ কী?", a: "ডেটাবেজের একটি টেবিলের রেকর্ডের সাথে অন্য এক বা একাধিক টেবিলের রেকর্ডের সম্পর্ককে ডেটাবেজ রিলেশনশিপ বলে।", type: "জ্ঞানমূলক" },
        { q: "One-to-Many রিলেশনশিপ বলতে কী বোঝায়?", a: "যখন প্রথম টেবিলের একটি রেকর্ডের সাথে দ্বিতীয় টেবিলের একাধিক রেকর্ডের সম্পর্ক থাকে, তখন তাকে One-to-Many রিলেশনশিপ বলে।", type: "অনুধাবনমূলক" }
      ],
      practiceMcqs: [
        { q: "একজন কাস্টমার একাধিক অর্ডার করতে পারে। এটি কোন ধরনের রিলেশনশিপ?", options: ["One-to-One", "One-to-Many", "Many-to-Many", "Many-to-One"], correct: "One-to-Many", explanation: "একজন কাস্টমার (One) একাধিক অর্ডার (Many) করতে পারে, তাই এটি One-to-Many রিলেশনশিপ।" },
        { q: "Many-to-Many রিলেশনশিপ স্থাপনের জন্য অতিরিক্ত কয়টি টেবিল প্রয়োজন হয়?", options: ["১টি", "২টি", "৩টি", "প্রয়োজন নেই"], correct: "১টি", explanation: "Many-to-Many রিলেশনশিপ সরাসরি তৈরি করা যায় না। এর জন্য একটি তৃতীয় টেবিল (Junction Table) তৈরি করতে হয়।" }
      ],
      cqs: [
        {
          stem: "কলেজের ডেটাবেজে 'Teacher' এবং 'Department' নামে দুটি টেবিল আছে। একটি ডিপার্টমেন্টে অনেক শিক্ষক থাকতে পারেন, কিন্তু একজন শিক্ষক কেবল একটি ডিপার্টমেন্টেরই অন্তর্ভুক্ত।",
          qC: "উদ্দীপকের টেবিল দুটির মধ্যে কোন ধরনের রিলেশনশিপ বিদ্যমান? ব্যাখ্যা করো।",
          qD: "উক্ত রিলেশনশিপ তৈরির শর্তাবলি এবং এর প্রয়োজনীয়তা বিশ্লেষণ করো।"
        }
      ],
      quizMcqs: [
        { q: "ডেটাবেজ রিলেশনশিপ কত প্রকার?", options: ["২", "৩", "৪", "৫"], correct: "৪" },
        { q: "একজন ব্যক্তির একটি পাসপোর্ট থাকতে পারে। এটি কোন রিলেশনশিপ?", options: ["One-to-One", "One-to-Many", "Many-to-One", "Many-to-Many"], correct: "One-to-One" },
        { q: "একটি ক্লাসে অনেক ছাত্র থাকে। এটি কোন রিলেশনশিপ?", options: ["One-to-One", "One-to-Many", "Many-to-One", "Many-to-Many"], correct: "One-to-Many" },
        { q: "অনেক ছাত্র একটি বিষয়ে পড়াশোনা করে। এটি কোন রিলেশনশিপ?", options: ["One-to-One", "One-to-Many", "Many-to-One", "Many-to-Many"], correct: "Many-to-One" },
        { q: "অনেক ছাত্র অনেক বিষয়ে পড়াশোনা করে। এটি কোন রিলেশনশিপ?", options: ["One-to-One", "One-to-Many", "Many-to-One", "Many-to-Many"], correct: "Many-to-Many" },
        { q: "Junction Table বা Link Table কোন রিলেশনশিপে ব্যবহৃত হয়?", options: ["One-to-One", "One-to-Many", "Many-to-One", "Many-to-Many"], correct: "Many-to-Many" },
        { q: "রিলেশনশিপ তৈরির জন্য টেবিলগুলোর মধ্যে কী থাকা আবশ্যক?", options: ["একই নাম", "কমন ফিল্ড", "সমান রেকর্ড", "সমান ফিল্ড"], correct: "কমন ফিল্ড" },
        { q: "Entity Relationship (ER) মডেলে রিলেশনশিপ বোঝাতে কোন চিহ্ন ব্যবহৃত হয়?", options: ["আয়তক্ষেত্র", "ডিম্বাকৃতি", "রম্বস", "সরলরেখা"], correct: "রম্বস" },
        { q: "ER মডেলে এনটিটি (Entity) বোঝাতে কোন চিহ্ন ব্যবহৃত হয়?", options: ["আয়তক্ষেত্র", "ডিম্বাকৃতি", "রম্বস", "ত্রিভুজ"], correct: "আয়তক্ষেত্র" },
        { q: "ER মডেলে অ্যাট্রিবিউট (Attribute) বোঝাতে কোন চিহ্ন ব্যবহৃত হয়?", options: ["আয়তক্ষেত্র", "ডিম্বাকৃতি", "রম্বস", "ত্রিভুজ"], correct: "ডিম্বাকৃতি" }
      ]
    },
    {
      id: "c6-t5",
      title: "SQL (Structured Query Language)",
      board_notes: "SQL হলো রিলেশনাল ডেটাবেজ ম্যানেজমেন্ট সিস্টেমে (RDBMS) ডেটা তৈরি, পরিবর্তন, মুছে ফেলা এবং খুঁজে বের করার জন্য ব্যবহৃত একটি স্ট্যান্ডার্ড ভাষা। SQL এর প্রধান কমান্ডগুলো হলো: DDL (Data Definition Language - CREATE, ALTER, DROP), DML (Data Manipulation Language - INSERT, UPDATE, DELETE) এবং DQL (Data Query Language - SELECT)।",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
      shortQuestions: [
        { q: "SQL কী?", a: "SQL (Structured Query Language) হলো রিলেশনাল ডেটাবেজ পরিচালনা করার জন্য ব্যবহৃত একটি স্ট্যান্ডার্ড প্রোগ্রামিং ভাষা।", type: "জ্ঞানমূলক" },
        { q: "DDL এবং DML এর মধ্যে পার্থক্য কী?", a: "DDL (যেমন CREATE) ডেটাবেজের স্ট্রাকচার বা টেবিল তৈরি করতে ব্যবহৃত হয়, আর DML (যেমন INSERT) টেবিলের ভেতরের ডেটা নিয়ে কাজ করতে ব্যবহৃত হয়।", type: "অনুধাবনমূলক" }
      ],
      practiceMcqs: [
        { q: "ডেটাবেজ থেকে তথ্য খুঁজে বের করার জন্য কোন SQL কমান্ড ব্যবহৃত হয়?", options: ["INSERT", "UPDATE", "SELECT", "DELETE"], correct: "SELECT", explanation: "SELECT কমান্ড ব্যবহার করে ডেটাবেজ টেবিল থেকে নির্দিষ্ট শর্ত অনুযায়ী ডেটা খুঁজে বের করা বা প্রদর্শন করা হয়।" },
        { q: "নতুন টেবিল তৈরি করার জন্য কোন কমান্ড ব্যবহৃত হয়?", options: ["CREATE", "ALTER", "INSERT", "ADD"], correct: "CREATE", explanation: "CREATE TABLE কমান্ড ব্যবহার করে ডেটাবেজে নতুন টেবিল তৈরি করা হয়।" }
      ],
      cqs: [
        {
          stem: "একটি কোম্পানির ডেটাবেজে 'Employee' নামে একটি টেবিল আছে। ম্যানেজার চাইলেন টেবিল থেকে যাদের বেতন ৫০,০০০ টাকার বেশি, তাদের নাম ও পদবি দেখতে।",
          qC: "ম্যানেজারের চাহিদা অনুযায়ী তথ্য প্রদর্শনের জন্য প্রয়োজনীয় SQL কমান্ডটি লিখ।",
          qD: "ডেটাবেজ ব্যবস্থাপনায় SQL এর গুরুত্ব বিশ্লেষণ করো।"
        }
      ],
      quizMcqs: [
        { q: "SQL এর পূর্ণরূপ কী?", options: ["Structured Query Language", "Standard Query Language", "Simple Query Language", "Sequential Query Language"], correct: "Structured Query Language" },
        { q: "টেবিলে নতুন ডেটা যুক্ত করার জন্য কোন কমান্ড ব্যবহৃত হয়?", options: ["ADD", "INSERT", "UPDATE", "CREATE"], correct: "INSERT" },
        { q: "টেবিলের বিদ্যমান ডেটা পরিবর্তন করার জন্য কোন কমান্ড ব্যবহৃত হয়?", options: ["CHANGE", "MODIFY", "UPDATE", "ALTER"], correct: "UPDATE" },
        { q: "টেবিল থেকে ডেটা মুছে ফেলার জন্য কোন কমান্ড ব্যবহৃত হয়?", options: ["REMOVE", "DROP", "DELETE", "CLEAR"], correct: "DELETE" },
        { q: "সম্পূর্ণ টেবিল বা ডেটাবেজ মুছে ফেলার জন্য কোন কমান্ড ব্যবহৃত হয়?", options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"], correct: "DROP" },
        { q: "টেবিলের স্ট্রাকচার পরিবর্তন করার জন্য কোন কমান্ড ব্যবহৃত হয়?", options: ["UPDATE", "CHANGE", "ALTER", "MODIFY"], correct: "ALTER" },
        { q: "SELECT কমান্ডের সাথে শর্ত জুড়ে দেওয়ার জন্য কোনটি ব্যবহৃত হয়?", options: ["IF", "WHERE", "WHEN", "CONDITION"], correct: "WHERE" },
        { q: "ডেটাকে নির্দিষ্ট ক্রমানুসারে সাজানোর জন্য কোন ক্লজ ব্যবহৃত হয়?", options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"], correct: "ORDER BY" },
        { q: "CREATE কমান্ডটি SQL এর কোন ক্যাটাগরির অন্তর্ভুক্ত?", options: ["DDL", "DML", "DCL", "TCL"], correct: "DDL" },
        { q: "INSERT কমান্ডটি SQL এর কোন ক্যাটাগরির অন্তর্ভুক্ত?", options: ["DDL", "DML", "DCL", "TCL"], correct: "DML" }
      ]
    }
  ]
};

// Read the file
const filePath = path.join(__dirname, 'src', 'data', 'ict-syllabus.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find the last index of '];'
const lastIndex = content.lastIndexOf('];');

if (lastIndex !== -1) {
  // Insert the new chapter
  const newContent = content.substring(0, lastIndex) + '  ,\n' + JSON.stringify(chap6, null, 2) + '\n];\n';
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Chapter 6 appended successfully!');
} else {
  console.error('Could not find the end of the syllabusData array.');
}
