import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  {
    q: "বাইনারি যোগ 1 + 1 = ? [ঢাকা বোর্ড ২০১৯]",
    options: ["10", "11", "2", "01"],
    correct: "10",
    explanation: "বাইনারি যোগে 1+1 = 10 (বাইনারি), অর্থাৎ যোগফল 0 এবং ক্যারি 1।"
  },
  {
    q: "বাইনারি যোগ 1 + 1 + 1 = ?",
    options: ["10", "11", "100", "01"],
    correct: "11",
    explanation: "বাইনারি যোগে 1+1+1 = 11 (বাইনারি), অর্থাৎ যোগফল 1 এবং ক্যারি 1।"
  },
  {
    q: "(1011)₂ + (1101)₂ = ? [রাজশাহী বোর্ড ২০২২]",
    options: ["11000", "11100", "11010", "10110"],
    correct: "11000",
    explanation: "বাইনারি যোগ: 1011 + 1101 = 11000 (দশমিকে 11+13=24=11000₂)।"
  },
  {
    q: "(111)₂ + (001)₂ = ?",
    options: ["1000", "1010", "1100", "110"],
    correct: "1000",
    explanation: "111 + 001 = 1000। দশমিকে 7+1=8, আর 8 = 1000 বাইনারিতে।"
  },
  {
    q: "অক্টাল যোগে 7 + 1 = ? [চট্টগ্রাম বোর্ড ২০১৮]",
    options: ["8", "10", "11", "9"],
    correct: "10",
    explanation: "অক্টাল সংখ্যা পদ্ধতিতে 7+1 = 10(অক্টাল), কারণ অক্টালে ৮ নেই, তাই ক্যারি হয়ে পরের ঘরে যায়।"
  },
  {
    q: "(17)₈ + (5)₈ = ? [দিনাজপুর বোর্ড ২০২০]",
    options: ["24", "22", "23", "25"],
    correct: "24",
    explanation: "অক্টাল যোগ: 7+5=12 (দশমিক), অক্টালে 12=14₈। তাই 1+4=14, এবং 1+1=2, ফলে 24₈।"
  },
  {
    q: "হেক্সাডেসিমেল যোগে A + B = ?",
    options: ["15", "1B", "AB", "15₁₆"],
    correct: "15",
    explanation: "হেক্সাডেসিমেলে A=10, B=11। 10+11=21 (দশমিক)। 21÷16 = 1 ভাগশেষ 5। তাই উত্তর 15₁₆।"
  },
  {
    q: "বাইনারি যোগে 0 + 0 = ?",
    options: ["0", "1", "10", "00"],
    correct: "0",
    explanation: "বাইনারি যোগের নিয়ম অনুযায়ী 0+0=0 (ক্যারি শূন্য)।"
  },
  {
    q: "(1010)₂ + (0101)₂ = ?",
    options: ["1111", "10000", "1001", "10101"],
    correct: "1111",
    explanation: "1010 + 0101 = 1111। দশমিকে 10+5=15=1111₂।"
  },
  {
    q: "বাইনারি যোগে 'ক্যারি' (Carry) কখন উৎপন্ন হয়? [কুমিল্লা বোর্ড ২০১৮]",
    options: ["0+0 হলে", "0+1 হলে", "1+0 হলে", "1+1 হলে"],
    correct: "1+1 হলে",
    explanation: "বাইনারি যোগে শুধুমাত্র 1+1 হলে ক্যারি উৎপন্ন হয় (যোগফল 0 এবং ক্যারি 1)।"
  },
  {
    q: "(77)₈ + (11)₈ = ?",
    options: ["88", "110", "100", "108"],
    correct: "110",
    explanation: "অক্টাল যোগ: 7+1=10₈, ক্যারি 1; 7+1+1=11₈, ক্যারি 1। তাই ফলাফল 110₈।"
  },
  {
    q: "হেক্সাডেসিমেলে F + 1 = ? [যশোর বোর্ড ২০২১]",
    options: ["G", "1F", "10", "11"],
    correct: "10",
    explanation: "হেক্সাডেসিমেলে F=15। 15+1=16, এবং 16÷16=1 ভাগশেষ 0। তাই F+1=10₁₆।"
  },
  {
    q: "(11111111)₂ + (00000001)₂ = ?",
    options: ["100000000", "11111110", "11111111", "100000001"],
    correct: "100000000",
    explanation: "255 + 1 = 256 = 100000000₂। 8-বিটের overflow হয়ে 9-বিটের ফলাফল হয়।"
  },
  {
    q: "বাইনারিতে (101)₂ + (011)₂ = ?",
    options: ["1000", "1010", "111", "1100"],
    correct: "1000",
    explanation: "101 + 011 = 1000। দশমিকে 5+3=8=1000₂।"
  },
  {
    q: "অক্টাল যোগ (25)₈ + (37)₈ = ?",
    options: ["62", "64", "72", "66"],
    correct: "64",
    explanation: "5+7=14 (দশমিক)=14₁₀। অক্টালে 14=16₈, তাই ৬ রেখে ১ carry। 2+3+1=6। ফলে 64₈।"
  },
  {
    q: "হেক্সাডেসিমেলে (1A)₁₆ + (2B)₁₆ = ?",
    options: ["45", "35", "3B", "45₁₆"],
    correct: "45",
    explanation: "A+B = 10+11=21=15₁₆, carry 1। 1+2+1=4। তাই ফলাফল 45₁₆।"
  },
  {
    q: "বাইনারি Half Adder-এ কয়টি আউটপুট থাকে?",
    options: ["১টি", "২টি", "৩টি", "৪টি"],
    correct: "২টি",
    explanation: "Half Adder-এ দুটি আউটপুট থাকে: Sum (যোগফল) এবং Carry (ক্যারি)।"
  },
  {
    q: "Full Adder-এ কয়টি ইনপুট থাকে? [বরিশাল বোর্ড ২০২১]",
    options: ["১টি", "২টি", "৩টি", "৪টি"],
    correct: "৩টি",
    explanation: "Full Adder-এ তিনটি ইনপুট থাকে: A, B এবং পূর্ববর্তী ঘরের Carry-in।"
  },
  {
    q: "(FF)₁₆ + (01)₁₆ = ?",
    options: ["100", "101", "FG", "1FF"],
    correct: "100",
    explanation: "FF=255, 01=1। 255+1=256=100₁₆।"
  },
  {
    q: "বাইনারিতে 1 + 1 + 1 + 1 = ?",
    options: ["100", "10", "11", "1000"],
    correct: "100",
    explanation: "1+1=10, 10+1=11, 11+1=100। দশমিকে 4=100₂।"
  },
  {
    q: "Half Adder-এ Sum আউটপুট তৈরিতে কোন গেইট ব্যবহার হয়? [সিলেট বোর্ড ২০২২]",
    options: ["AND", "OR", "XOR", "NAND"],
    correct: "XOR",
    explanation: "Half Adder-এ Sum = A XOR B। XOR গেইটটি বাইনারি যোগের Sum অংশ বাস্তবায়ন করে।"
  },
  {
    q: "অক্টাল যোগে (70)₈ + (10)₈ = ?",
    options: ["80", "100", "102", "108"],
    correct: "100",
    explanation: "0+0=0, 7+1=10₈। তাই ফলাফল 100₈।"
  },
  {
    q: "(ABC)₁₆ + (111)₁₆ = ?",
    options: ["BCD", "BCC", "BCD₁₆", "ACD"],
    correct: "BCD",
    explanation: "C+1=D, B+1=C, A+1=B। তাই ABC+111=BCD₁₆।"
  },
  {
    q: "বাইনারি (1100)₂ + (0011)₂ = ?",
    options: ["1111", "10011", "1001", "10000"],
    correct: "1111",
    explanation: "1100 + 0011 = 1111। দশমিকে 12+3=15=1111₂।"
  },
  {
    q: "হেক্সাডেসিমেলে (9)₁₆ + (9)₁₆ = ?",
    options: ["18", "12", "10", "11"],
    correct: "12",
    explanation: "9+9=18 দশমিক। 18÷16=1 ভাগশেষ 2। তাই 18₁₀=12₁₆।"
  }
,
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "101101 এর 1's কমপ্লিমেন্ট কোনটি?",
    options: ["101100","010010","101000","101111"],
    correct: "010010",
    explanation: "১-এর পরিপূরক (1's complement) বের করতে হলে বাইনারি সংখ্যার প্রতিটি ১-কে ০ এবং ০-কে ১ দ্বারা পরিবর্তন করতে হয়। 101101-এর পরিপূরক হলো 010010।",
    boardQuestions: ["Dhaka Board 2025"],
    difficulty: "Easy"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "একটি বইয়ের মূল্য (AA)16 হলে তার সমকক্ষ মান কোনটি?\\n\\ni. (170)10\\nii. (252)8\\niii. (10101010)2",
    options: ["i ও ii","i ও iii","ii ও iii","i, ii ও iii"],
    correct: "i, ii ও iii",
    explanation: "(AA)16 কে দশমিকে রূপান্তর করলে হয় 10×16 + 10 = 170। অক্টালে 252 এবং বাইনারিতে 10101010। সুতরাং তিনটিই সঠিক।",
    boardQuestions: ["Dhaka Board 2025"],
    difficulty: "Medium"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "হায়ারোগ্লিফিক্স ভাষা হতে বর্তমান ইমোজি পর্যন্ত সবকিছু কোন কোডের অন্তর্ভুক্ত?",
    options: ["EBCDIC","ASCII-7","ASCII-8","UniCode"],
    correct: "UniCode",
    explanation: "ইউনিকোড (Unicode) বিশ্বের প্রায় সব ভাষার বর্ণ, চিহ্ন এবং ইমোজি সমর্থন করে। এটি একটি ১৬-বিট বা ৩২-বিট কোডিং ব্যবস্থা।",
    boardQuestions: ["Dhaka Board 2025"],
    difficulty: "Medium"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "বাইনারি ডেটা একদিকে বা উভয় দিকে স্থানান্তর করতে পারে কোন রেজিস্টার?",
    options: ["প্যারালাল","শিফট","বাফার","অ্যাকুমুলেটর"],
    correct: "শিফট",
    explanation: "শিফট রেজিস্টার ফ্লিপ-ফ্লপের সমন্বয়ে গঠিত যা ডেটাকে ডানে, বামে বা উভয় দিকে শিফট (স্থানান্তর) করতে পারে।",
    boardQuestions: ["Dhaka Board 2025"],
    difficulty: "Hard"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "(10101)2 এর সমতুল্য মান—\\n\\ni. (21)10\\nii. (25)8\\niii. (15)16",
    options: ["i ও ii","i ও iii","ii ও iii","i, ii ও iii"],
    correct: "i, ii ও iii",
    explanation: "(10101)2 কে দশমিকে নিলে 16+4+1 = 21 হয়। অক্টালে 010 101 = 25 এবং হেক্সাডেসিম্যালে 0001 0101 = 15।",
    boardQuestions: ["Dinajpur Board 2025"],
    difficulty: "Medium"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "এক বাইটের অর্ধেককে (৪ বিট) কী বলা হয়?",
    options: ["নিবল","কম্পিউটার শব্দ","ডেসিমাল","ক্যারেক্টার"],
    correct: "নিবল",
    explanation: "৪ বিটের একটি গ্রুপকে এক নিবল (Nibble) বলা হয়। ৮ বিটে এক বাইট হয়।",
    boardQuestions: ["Dinajpur Board 2025","Barisal Board 2025"],
    difficulty: "Easy"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "হাফ অ্যাডারের ক্যারি (Carry) তৈরিতে কোন গেইট ব্যবহৃত হয়?",
    options: ["OR","XOR","AND","XNOR"],
    correct: "AND",
    explanation: "হাফ অ্যাডারের সাম (Sum) তৈরিতে XOR গেইট এবং ক্যারি (Carry) তৈরিতে AND গেইট ব্যবহৃত হয়।",
    boardQuestions: ["Comilla Board 2025"],
    difficulty: "Medium"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "কোন গেইটে সকল ইনপুট 1 হলে আউটপুট 0 হয়, অন্যথায় আউটপুট 1 হয়?",
    options: ["NAND","NOR","XNOR","AND"],
    correct: "NAND",
    explanation: "NAND গেইটে AND এর বিপরীত কাজ হয়। অর্থাৎ সবগুলো ইনপুট ১ হলেই কেবল আউটপুট ০ হয়।",
    boardQuestions: ["Comilla Board 2025"],
    difficulty: "Medium"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "(101101.01)2 এর সমকক্ষ অক্টাল মান কোনটি?",
    options: ["(55.2)8","(55.4)8","(55.1)8","(55.5)8"],
    correct: "(55.2)8",
    explanation: "পূর্ণাংশ 101101 কে ৩ বিট করে সাজালে 101 101 = 55 হয়। আর ভগ্নাংশ .01 কে ৩ বিট করলে .010 = .2 হয়। উত্তর 55.2।",
    boardQuestions: ["Mymensingh Board 2025"],
    difficulty: "Hard"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "কোন সভ্যতায় সংখ্যা পদ্ধতি ষাটভিত্তিক (Base-60) ছিল?",
    options: ["সুমেরিয়ান-ব্যবলিয়ান","মিশরীয়","মায়ান","চীন"],
    correct: "সুমেরিয়ান-ব্যবলিয়ান",
    explanation: "প্রাচীন সুমেরিয়ান এবং ব্যাবিলনীয় সভ্যতায় ষাটভিত্তিক বা সেক্সাজেসিমাল (Sexagesimal) সংখ্যা পদ্ধতি প্রচলিত ছিল।",
    boardQuestions: ["Mymensingh Board 2025","Barisal Board 2025"],
    difficulty: "Medium"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "দুই ইনপুটের কোন গেইটে ইনপুট দুটি ভিন্ন হলে আউটপুট 1 হয়?",
    options: ["AND","NOR","XOR","XNOR"],
    correct: "XOR",
    explanation: "XOR গেইটে ইনপুটগুলো অসমান (যেমন ০ এবং ১) হলে আউটপুট ১ হয়। ইনপুট সমান হলে আউটপুট ০ হয়।",
    boardQuestions: ["Mymensingh Board 2025"],
    difficulty: "Medium"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "মিনিট এবং ঘণ্টার হিসাব, কোণের পরিমাণ ইত্যাদি কোন সংখ্যা পদ্ধতির উদাহরণ?",
    options: ["মায়ান","চীন","ভারতীয়","সুমেরিয়ান-ব্যবলিয়ান"],
    correct: "সুমেরিয়ান-ব্যবলিয়ান",
    explanation: "বর্তমান সময়ে ঘড়ির কাঁটার হিসাব (৬০ মিনিটে এক ঘণ্টা) এবং কোণের পরিমাপ (৩৬০ ডিগ্রি) সুমেরিয়ান-ব্যবলিয়ান সভ্যতার ষাটভিত্তিক সংখ্যা পদ্ধতি থেকে এসেছে।",
    boardQuestions: ["Sylhet Board 2025"],
    difficulty: "Easy"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "দুটি সংখ্যার পার্থক্য (52)10। তাদের মধ্যে বড় সংখ্যাটি (5D)16 হলে, অপর সংখ্যাটি বাইনারিতে কত?",
    options: ["(101100)2","(101001)2","(110010)2","(100101)2"],
    correct: "(101001)2",
    explanation: "বড় সংখ্যা (5D)16 = 5×16 + 13 = 93। পার্থক্য = 52, তাই অপর সংখ্যা = 93 - 52 = 41। 41-এর বাইনারি হলো 101001।",
    boardQuestions: ["Rajshahi Board 2025"],
    difficulty: "Hard"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "5, 8, B ধারার পরবর্তী মান হেক্সাডেসিম্যালে কোনটি?",
    options: ["C","D","E","F"],
    correct: "E",
    explanation: "ধারাটি হলো 5, 8, 11 (B)। প্রতি পদে ৩ যোগ হচ্ছে। তাই পরবর্তী পদ 11 + 3 = 14, যা হেক্সাডেসিম্যালে E।",
    boardQuestions: ["Jessore Board 2025"],
    difficulty: "Medium"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "নিচের কোন লজিক বর্তনী গণনার কাজ করে?",
    options: ["এনকোডার","ডিকোডার","কাউন্টার","রেজিস্টার"],
    correct: "কাউন্টার",
    explanation: "কাউন্টার হলো এক ধরনের সিকোয়েনশিয়াল লজিক সার্কিট যা ইনপুটে আসা পালস গণনা করতে পারে।",
    boardQuestions: ["Jessore Board 2025"],
    difficulty: "Easy"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "EBCDIC কোড কত বিটের?",
    options: ["২","৪","৮","১৬"],
    correct: "৮",
    explanation: "EBCDIC (Extended Binary Coded Decimal Interchange Code) হলো একটি ৮-বিটের ক্যারেক্টার এনকোডিং পদ্ধতি।",
    boardQuestions: ["Barisal Board 2025"],
    difficulty: "Medium"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "(BC)16 এর সমকক্ষ মান হবে—\\n\\ni. (10111100)2\\nii. (274)8\\niii. (188)10",
    options: ["i ও ii","ii ও iii","i ও iii","i, ii ও iii"],
    correct: "i, ii ও iii",
    explanation: "(BC)16 = 11×16 + 12 = 188। এর বাইনারি 1011 1100 এবং অক্টালে 10 111 100 অর্থাৎ 274।",
    boardQuestions: ["Barisal Board 2025"],
    difficulty: "Medium"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "৭ বিটের ASCII কোডের যান্ত্রিক নিয়ন্ত্রণ (Control Character) কোড কয়টি?",
    options: ["৩১","৩২","৯৬","১২৭"],
    correct: "৩২",
    explanation: "ASCII কোডে ০ থেকে ৩১ পর্যন্ত মোট ৩২টি নন-প্রিন্টেবল বা যান্ত্রিক নিয়ন্ত্রণ কোড (Control characters) থাকে।",
    boardQuestions: ["Chittagong Board 2025"],
    difficulty: "Hard"
  },
  {
    id: "ch3-board-" + Math.random().toString(36).substr(2, 9),
    q: "কোন সংখ্যা পদ্ধতিতে স্থানীয় মান (Positional value) নেই?",
    options: ["রোমান","বাইনারি","ডেসিমেল","অক্টাল"],
    correct: "রোমান",
    explanation: "রোমান, হায়ারোগ্লিফিক্স বা মায়ান সংখ্যা পদ্ধতিতে কোনো স্থানীয় মান থাকে না। এগুলো নন-পজিশনাল সংখ্যা পদ্ধতি।",
    boardQuestions: ["Chittagong Board 2025"],
    difficulty: "Easy"
  }
];
