import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  {
    q: "BCD কোডের পূর্ণ নাম কী? [ঢাকা বোর্ড ২০২০]",
    options: ["Binary Coded Decimal", "Basic Computer Digit", "Binary Computer Data", "Base Coded Digit"],
    correct: "Binary Coded Decimal",
    explanation: "BCD এর পূর্ণ রূপ হলো Binary Coded Decimal। এতে প্রতিটি দশমিক অঙ্ককে ৪ বিটের বাইনারি দিয়ে প্রকাশ করা হয়।"
  },
  {
    q: "BCD কোডে প্রতিটি দশমিক অঙ্ককে কয়টি বিট দিয়ে প্রকাশ করা হয়? [রাজশাহী বোর্ড ২০১৯]",
    options: ["২টি", "৩টি", "৪টি", "৮টি"],
    correct: "৪টি",
    explanation: "BCD কোডে প্রতিটি দশমিক অঙ্ককে (০-৯) ৪ বিটের বাইনারি দিয়ে প্রকাশ করা হয়।"
  },
  {
    q: "(9)₁₀ এর BCD কোড কোনটি?",
    options: ["0111", "1000", "1001", "1010"],
    correct: "1001",
    explanation: "BCD কোডে ৯ = 1001₂ (দশমিক 9 = বাইনারি 1001)।"
  },
  {
    q: "ASCII কোডের পূর্ণ নাম কী? [চট্টগ্রাম বোর্ড ২০২১]",
    options: ["American Standard Code for Information Interchange", "Advanced System Code for Information Interchange", "American System Code for Integrated Information", "Automated System Computer Interchange"],
    correct: "American Standard Code for Information Interchange",
    explanation: "ASCII এর পূর্ণ নাম American Standard Code for Information Interchange।"
  },
  {
    q: "স্ট্যান্ডার্ড ASCII কোডে কয়টি বিট ব্যবহার করা হয়? [কুমিল্লা বোর্ড ২০২০]",
    options: ["৬টি", "৭টি", "৮টি", "১৬টি"],
    correct: "৭টি",
    explanation: "স্ট্যান্ডার্ড ASCII কোডে ৭টি বিট ব্যবহার করা হয়, যা দিয়ে মোট ২⁷ = ১২৮টি অক্ষর প্রকাশ করা যায়।"
  },
  {
    q: "Unicode কয়টি বিট ব্যবহার করে? [দিনাজপুর বোর্ড ২০২২]",
    options: ["৮টি", "১৬টি", "৩২টি", "সর্বোচ্চ ৩২টি পর্যন্ত"],
    correct: "সর্বোচ্চ ৩২টি পর্যন্ত",
    explanation: "Unicode বিভিন্ন এনকোডিং ফরম্যাটে (UTF-8, UTF-16, UTF-32) কাজ করে, সর্বোচ্চ ৩২ বিট পর্যন্ত ব্যবহার করে বিশ্বের সকল ভাষার অক্ষর প্রকাশ করতে পারে।"
  },
  {
    q: "BCD কোডে (25)₁₀ প্রকাশ পাবে কোনটিতে?",
    options: ["00100101", "00011001", "10100101", "00100110"],
    correct: "00100101",
    explanation: "BCD-তে প্রতিটি অঙ্ক আলাদাভাবে: 2=0010, 5=0101। তাই (25)₁₀ = 0010 0101 (BCD)।"
  },
  {
    q: "ASCII কোডে 'A' অক্ষরের মান কত? [যশোর বোর্ড ২০১৯]",
    options: ["৬৪", "৬৫", "৯৭", "৯৬"],
    correct: "৬৫",
    explanation: "ASCII কোডে 'A' (বড় হাতের) = ৬৫ (দশমিক) = 1000001 (বাইনারি)।"
  },
  {
    q: "ASCII কোডে 'a' (ছোট হাতের) অক্ষরের মান কত?",
    options: ["৬৫", "৯৭", "৯৬", "৬৬"],
    correct: "৯৭",
    explanation: "ASCII কোডে 'a' (ছোট হাতের) = ৯৭ (দশমিক) = 1100001 (বাইনারি)।"
  },
  {
    q: "EBCDIC কোডে কয়টি বিট ব্যবহার করা হয়? [বরিশাল বোর্ড ২০১৮]",
    options: ["৬টি", "৭টি", "৮টি", "১৬টি"],
    correct: "৮টি",
    explanation: "EBCDIC (Extended Binary Coded Decimal Interchange Code) কোডে ৮টি বিট ব্যবহার করা হয়, যা দিয়ে ২৫৬টি চিহ্ন প্রকাশ করা যায়।"
  },
  {
    q: "BCD কোডের একটি অসুবিধা কোনটি? [সিলেট বোর্ড ২০২০]",
    options: ["দ্রুত গণনা করা যায় না", "বেশি বিটের প্রয়োজন হয়", "ঋণাত্মক সংখ্যা প্রকাশ কঠিন", "ছোট সংখ্যা প্রকাশ করা যায় না"],
    correct: "বেশি বিটের প্রয়োজন হয়",
    explanation: "BCD কোডে প্রতিটি দশমিক অঙ্কের জন্য ৪ বিট প্রয়োজন, কিন্তু সরাসরি বাইনারিতে কম বিটে একই সংখ্যা প্রকাশ সম্ভব। তাই BCD-তে বেশি বিট খরচ হয়।"
  },
  {
    q: "Gray কোডের বৈশিষ্ট্য কোনটি? [ময়মনসিংহ বোর্ড ২০২২]",
    options: ["দ্রুততম কোড", "প্রতিটি ধাপে মাত্র একটি বিট পরিবর্তন হয়", "সকল বিট পরিবর্তন হয়", "ASCII এর বিকল্প"],
    correct: "প্রতিটি ধাপে মাত্র একটি বিট পরিবর্তন হয়",
    explanation: "Gray কোডের বিশেষত্ব হলো এক সংখ্যা থেকে পরের সংখ্যায় যাওয়ার সময় মাত্র একটি বিট পরিবর্তন হয়, যা ডিজিটাল সিস্টেমে ত্রুটি কমায়।"
  },
  {
    q: "Parity Bit ব্যবহারের উদ্দেশ্য কী?",
    options: ["ডেটা এনক্রিপ্ট করা", "ডেটা ট্রান্সমিশনে ত্রুটি সনাক্ত করা", "ডেটা কম্প্রেস করা", "দ্রুত প্রক্রিয়াকরণ"],
    correct: "ডেটা ট্রান্সমিশনে ত্রুটি সনাক্ত করা",
    explanation: "Parity Bit ডেটা ট্রান্সমিশনের সময় কোনো বিট পরিবর্তন হয়েছে কিনা তা সনাক্ত করতে ব্যবহৃত হয়।"
  },
  {
    q: "ASCII কোডে মোট কতটি অক্ষর প্রকাশ করা যায়?",
    options: ["৬৪", "১২৮", "২৫৬", "৫১২"],
    correct: "১২৮",
    explanation: "৭ বিটের ASCII কোডে মোট ২⁷ = ১২৮টি বিভিন্ন অক্ষর ও চিহ্ন প্রকাশ করা যায়।"
  },
  {
    q: "Extended ASCII কোডে কয়টি বিট ব্যবহার করা হয়? [কুমিল্লা বোর্ড ২০১৮]",
    options: ["৭টি", "৮টি", "১৬টি", "৩২টি"],
    correct: "৮টি",
    explanation: "Extended ASCII কোডে ৮টি বিট ব্যবহার করা হয়, যা দিয়ে ২⁸ = ২৫৬টি অক্ষর ও চিহ্ন প্রকাশ করা যায়।"
  },
  {
    q: "BCD কোডে (0110 1001)BCD = (?)₁₀",
    options: ["59", "69", "96", "109"],
    correct: "69",
    explanation: "BCD ভাগ করি: 0110=6, 1001=9। তাই BCD 0110 1001 = 69₁₀।"
  },
  {
    q: "Unicode কোন উদ্দেশ্যে তৈরি হয়েছে? [যশোর বোর্ড ২০২২]",
    options: ["শুধু ইংরেজি অক্ষর প্রকাশে", "বিশ্বের সকল ভাষার অক্ষর প্রকাশে", "শুধু সংখ্যা প্রকাশে", "গ্রাফিক্স প্রকাশে"],
    correct: "বিশ্বের সকল ভাষার অক্ষর প্রকাশে",
    explanation: "Unicode তৈরি হয়েছে বিশ্বের সকল ভাষার অক্ষর, চিহ্ন এবং ইমোজি প্রকাশ করতে।"
  },
  {
    q: "ASCII কোডে '0' (শূন্য অঙ্ক) এর মান কত?",
    options: ["৪৫", "৪৮", "৫০", "৫৬"],
    correct: "৪৮",
    explanation: "ASCII কোডে '0' (শূন্য অঙ্ক) এর মান ৪৮।"
  },
  {
    q: "BCD কোডে সর্বোচ্চ বৈধ অঙ্ক কোনটি?",
    options: ["৮", "৯", "১০", "১৫"],
    correct: "৯",
    explanation: "BCD কোডে শুধুমাত্র ০ থেকে ৯ পর্যন্ত দশমিক অঙ্ক ব্যবহার করা হয়। 1010 থেকে 1111 পর্যন্ত (10-15) BCD-তে অবৈধ।"
  },
  {
    q: "EBCDIC কোড কে ব্যবহার করে? [দিনাজপুর বোর্ড ২০১৯]",
    options: ["Microsoft", "IBM", "Apple", "Google"],
    correct: "IBM",
    explanation: "EBCDIC (Extended Binary Coded Decimal Interchange Code) IBM তাদের মেইনফ্রেম কম্পিউটারের জন্য তৈরি ও ব্যবহার করে।"
  },
  {
    q: "Gray কোডকে অন্যভাবে কী বলা হয়?",
    options: ["Excess-3 Code", "Reflected Binary Code", "BCD Code", "Weighted Code"],
    correct: "Reflected Binary Code",
    explanation: "Gray কোডকে Reflected Binary Code বা Unit Distance Code ও বলা হয়, কারণ এটি বাইনারির একটি বিশেষ রূপ যেখানে ধাপে ধাপে মাত্র এক বিট বদলায়।"
  },
  {
    q: "Excess-3 কোড পেতে BCD কোডের সাথে কী যোগ করতে হয়?",
    options: ["0010", "0011", "0100", "0001"],
    correct: "0011",
    explanation: "Excess-3 কোড পেতে BCD কোডের সাথে 0011 (তিন) যোগ করতে হয়।"
  },
  {
    q: "(5)₁₀ এর Excess-3 কোড কোনটি?",
    options: ["0101", "0111", "1000", "1001"],
    correct: "1000",
    explanation: "BCD(5) = 0101। Excess-3: 0101+0011 = 1000।"
  },
  {
    q: "UTF-8 এর পূর্ণ রূপ কী? [সিলেট বোর্ড ২০২১]",
    options: ["Universal Text Format-8", "Unicode Transformation Format-8", "Universal Transfer Format-8", "Unified Text Framework-8"],
    correct: "Unicode Transformation Format-8",
    explanation: "UTF-8 মানে Unicode Transformation Format-8। এটি Unicode-এর একটি variable-length encoding।"
  },
  {
    q: "কম্পিউটারে বাংলা হরফ প্রদর্শনের জন্য কোন কোড ব্যবহার করা হয়? [রাজশাহী বোর্ড ২০২০]",
    options: ["ASCII", "BCD", "EBCDIC", "Unicode"],
    correct: "Unicode",
    explanation: "বাংলাসহ বিশ্বের বিভিন্ন ভাষার হরফ প্রদর্শনের জন্য Unicode (বিশেষত UTF-8 বা UTF-16) ব্যবহার করা হয়।"
  }
];
