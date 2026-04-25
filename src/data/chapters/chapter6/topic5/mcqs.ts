import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  {
    "q": "অধ্যক্ষ ফলাফলের data ঊর্ধ্বক্রম ও নিম্নক্রমে সাজালেন। পদ্ধতিটি কী? [রাজশাহী বোর্ড ২০১৭]",
    "options": [
      "সর্টিং",
      "সার্চিং",
      "ইনডেক্সিং",
      "কুয়েরি"
    ],
    "correct": "সর্টিং",
    "explanation": "Ascending/descending order-এ সাজানো sorting।"
  },
  {
    "q": "সর্টিং-এর প্রধান উদ্দেশ্য কী? [দিনাজপুর বোর্ড ২০১৭]",
    "options": [
      "ডেটা encrypt",
      "Query output সাজানো",
      "Password দেওয়া",
      "Table delete"
    ],
    "correct": "Query output সাজানো",
    "explanation": "Sorting result presentation উন্নত করে।"
  },
  {
    "q": "সর্টিংয়ের জন্য field data type হতে পারে কোনগুলো? [কুমিল্লা বোর্ড ২০১৭]",
    "options": [
      "Text ও Currency",
      "Text ও OLE Object",
      "Currency ও OLE Object",
      "সবগুলো"
    ],
    "correct": "Text ও Currency",
    "explanation": "Text, Number, Date, Currency sort করা যায়; OLE Object সাধারণত নয়।"
  },
  {
    "q": "ডেটাবেজ সাজানোর প্রক্রিয়া কোনগুলো? [চট্টগ্রাম বোর্ড ২০১৭]",
    "options": [
      "সর্টিং ও ইনডেক্সিং",
      "সর্টিং ও কুয়েরি",
      "ইনডেক্সিং ও কুয়েরি",
      "সবগুলো"
    ],
    "correct": "সর্টিং ও ইনডেক্সিং",
    "explanation": "Sorting ও indexing উভয়ই data order/search সংগঠনের সাথে সম্পর্কিত।"
  },
  {
    "q": "ইনডেক্স করা যায় কোনটির উপর? [সিলেট বোর্ড ২০১৭]",
    "options": [
      "একটি field",
      "দুইটি field",
      "একাধিক field",
      "সবগুলো"
    ],
    "correct": "সবগুলো",
    "explanation": "এক বা একাধিক field-এ index করা যায়।"
  },
  {
    "q": "যদি database-এ প্রচুর তথ্য থাকে তবে data দ্রুত খুঁজতে কী দরকার? [বরিশাল বোর্ড ২০১৭]",
    "options": [
      "ইনডেক্সিং",
      "শুধু color",
      "speaker",
      "monitor"
    ],
    "correct": "ইনডেক্সিং",
    "explanation": "Large database-এ index search speed বাড়ায়।"
  },
  {
    "q": "ডেটাবেজে record সংযোজন ও সংশোধন করলে কী হয়? [ঢাকা বোর্ড ২০১৬]",
    "options": [
      "Index file update হয়",
      "Sorted file সবসময় update হয়",
      "নতুন করে index করতে হয়",
      "Record address মুছে যায়"
    ],
    "correct": "Index file update হয়",
    "explanation": "DBMS index maintain করে।"
  },
  {
    "q": "ইনডেক্সিং-এর ফলে কোনটি হয়? [রাজশাহী বোর্ড ২০১৬]",
    "options": [
      "Data খুঁজে পাওয়া সহজ",
      "মূল file অপরিবর্তিত",
      "Data entry-তে কিছু সময় বেশি",
      "সবগুলো"
    ],
    "correct": "সবগুলো",
    "explanation": "Index search দ্রুত করে কিন্তু maintenance overhead থাকে।"
  },
  {
    "q": "Name ভিত্তিতে A-Z sorted table-এ নতুন record দিলে কী হতে পারে? [দিনাজপুর বোর্ড ২০১৬]",
    "options": [
      "নতুন record আনসর্টেড থাকতে পারে",
      "সব record মুছে যাবে",
      "সব record encrypt হবে",
      "field বাদ যাবে"
    ],
    "correct": "নতুন record আনসর্টেড থাকতে পারে",
    "explanation": "Static sorted output হলে নতুন data পরে sort refresh দরকার।"
  },
  {
    "q": "Ascending order বোঝায় কোনটি? [কুমিল্লা বোর্ড ২০১৬]",
    "options": [
      "ছোট থেকে বড়",
      "বড় থেকে ছোট",
      "এলোমেলো",
      "শুধু encrypted"
    ],
    "correct": "ছোট থেকে বড়",
    "explanation": "Ascending order low-to-high।"
  },
  {
    "q": "Descending order বোঝায় কোনটি? [চট্টগ্রাম বোর্ড ২০১৬]",
    "options": [
      "ছোট থেকে বড়",
      "বড় থেকে ছোট",
      "শুধু A-Z",
      "শুধু date"
    ],
    "correct": "বড় থেকে ছোট",
    "explanation": "Descending order high-to-low।"
  },
  {
    "q": "ORDER BY GPA DESC কী করবে? [সিলেট বোর্ড ২০১৬]",
    "options": [
      "GPA নিম্নক্রমে সাজাবে",
      "GPA delete করবে",
      "GPA encrypt করবে",
      "GPA add করবে"
    ],
    "correct": "GPA নিম্নক্রমে সাজাবে",
    "explanation": "DESC descending order নির্দেশ করে।"
  },
  {
    "q": "ORDER BY field_name ASC কী বোঝায়? [যশোর বোর্ড ২০১৬]",
    "options": [
      "ঊর্ধ্বক্রম",
      "নিম্নক্রম",
      "Delete",
      "Rollback"
    ],
    "correct": "ঊর্ধ্বক্রম",
    "explanation": "ASC ascending order।"
  },
  {
    "q": "ইনডেক্সিং মূল file-এ কী করে? [মাদরাসা বোর্ড ২০১৬]",
    "options": [
      "কোনো পরিবর্তন না করে সূচি তৈরি করে",
      "সব record মুছে দেয়",
      "সব field OLE করে",
      "সব password বাদ দেয়"
    ],
    "correct": "কোনো পরিবর্তন না করে সূচি তৈরি করে",
    "explanation": "Index আলাদা structure।"
  },
  {
    "q": "Index বেশি হলে অসুবিধা কী? [ঢাকা বোর্ড ২০১৯]",
    "options": [
      "Update সময় বাড়ে",
      "Search অসম্ভব হয়",
      "Data type বদলে যায়",
      "Table দেখা যায় না"
    ],
    "correct": "Update সময় বাড়ে",
    "explanation": "প্রতিটি data change-এ index update করতে হয়।"
  },
  {
    "q": "কোন data type-এ সাধারণ sorting করা যায় না? [রাজশাহী বোর্ড ২০১৯]",
    "options": [
      "Text",
      "Number",
      "Currency",
      "OLE Object"
    ],
    "correct": "OLE Object",
    "explanation": "Object data সরাসরি alphabetical/numeric sort key নয়।"
  },
  {
    "q": "Sorting কোন ক্ষেত্রে বেশি ব্যবহৃত? [দিনাজপুর বোর্ড ২০১৯]",
    "options": [
      "Result সাজিয়ে উপস্থাপন",
      "Cryptography",
      "User permission",
      "Backup restore"
    ],
    "correct": "Result সাজিয়ে উপস্থাপন",
    "explanation": "Sorting output order ঠিক করে।"
  },
  {
    "q": "Indexing কোন ক্ষেত্রে বেশি ব্যবহৃত? [কুমিল্লা বোর্ড ২০১৯]",
    "options": [
      "দ্রুত search",
      "ছবি আঁকা",
      "Video play",
      "Printer setup"
    ],
    "correct": "দ্রুত search",
    "explanation": "Index search operation দ্রুত করে।"
  },
  {
    "q": "একাধিক field-এর উপর sort করা যায় কি? [চট্টগ্রাম বোর্ড ২০১৯]",
    "options": [
      "হ্যাঁ",
      "না",
      "শুধু OLE-তে",
      "শুধু Memo-তে"
    ],
    "correct": "হ্যাঁ",
    "explanation": "Multi-column sorting সম্ভব।"
  },
  {
    "q": "Index file কী সংরক্ষণ করে? [সিলেট বোর্ড ২০১৯]",
    "options": [
      "Key value ও record location",
      "শুধু wallpaper",
      "শুধু audio",
      "শুধু font"
    ],
    "correct": "Key value ও record location",
    "explanation": "Index table key থেকে location map করে।"
  }
];
