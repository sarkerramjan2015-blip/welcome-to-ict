import { ShortQuestion } from "../../../ict-syllabus";

export const questions: { knowledgeQuestions: ShortQuestion[]; analyticalQuestions: ShortQuestion[] } = {
  "knowledgeQuestions": [
    {
      "q": "ডেটা সিকিউরিটি কী? [মাদরাসা বোর্ড ২০১৯]",
      "a": "ডেটার গোপনীয়তা, অখণ্ডতা ও ব্যবহারযোগ্যতা রক্ষার ব্যবস্থা হলো data security।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "ডেটা এনক্রিপশন কী? [সমন্বিত বোর্ড ২০১৮]",
      "a": "Plain text-কে বিশেষ algorithm ও key ব্যবহার করে cipher text-এ পরিবর্তন করার প্রক্রিয়াকে encryption বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "ডেটা ডিক্রিপশন কী? [ঢাকা বোর্ড ২০১৭]",
      "a": "Cipher text-কে আবার plain text-এ রূপান্তর করার প্রক্রিয়াকে decryption বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "সাইফার টেক্সট কী? [রাজশাহী বোর্ড ২০১৭]",
      "a": "Encryption-এর পর তৈরি অপাঠযোগ্য coded data-কে cipher text বলে।",
      "type": "জ্ঞানমূলক"
    },
    {
      "q": "Plain text কী? [দিনাজপুর বোর্ড ২০১৭]",
      "a": "Encryption করার আগের মানুষের পাঠযোগ্য মূল data-কে plain text বলে।",
      "type": "জ্ঞানমূলক"
    }
  ],
  "analyticalQuestions": [
    {
      "q": "ডেটা সুরক্ষার পদ্ধতি ব্যাখ্যা কর। [কুমিল্লা বোর্ড ২০১৭]",
      "a": "ডেটা সুরক্ষায় access control, password, backup, firewall, antivirus এবং encryption/decryption ব্যবহৃত হয়। Encryption data-কে unreadable করে unauthorized reading ঠেকায়।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "ডেটা encryption করতে হয় কেন? [চট্টগ্রাম বোর্ড ২০১৭]",
      "a": "গুরুত্বপূর্ণ data স্থানান্তর বা সংরক্ষণের সময় unauthorized ব্যক্তি যেন মূল data বুঝতে না পারে, তাই encryption করা হয়।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "ডেটাবেজ নিরাপত্তায় encryption জরুরি কেন? [সিলেট বোর্ড ২০১৭]",
      "a": "Multi-user ও network environment-এ data leak হতে পারে। Encryption data চুরি হলেও readable রাখে না, ফলে confidentiality বজায় থাকে।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "Plain text ও cipher text এক নয় - ব্যাখ্যা কর। [বরিশাল বোর্ড ২০১৭]",
      "a": "Plain text পাঠযোগ্য মূল data; encryption algorithm ও key ব্যবহারের পর সেটি অপাঠযোগ্য cipher text হয়। তাই দুটি আলাদা অবস্থা।",
      "type": "অনুধাবনমূলক"
    },
    {
      "q": "ব্যক্তিগত পর্যায়ে data security কীভাবে নিশ্চিত করা যায়? [ঢাকা বোর্ড ২০১৬]",
      "a": "শক্তিশালী password, regular backup, antivirus, firewall, suspicious link এড়ানো, software update এবং important data encryption ব্যবহার করে।",
      "type": "অনুধাবনমূলক"
    }
  ]
};
