import type { CQ, PracticeMCQ, ShortQuestion, Topic } from "../../ict-syllabus";
// @ts-ignore
import { generateQuiz } from "../../utils";

type ExtraMcqRow = [
  id: string,
  q: string,
  options: string[],
  correct: string,
  explanation: string,
  boardQuestions?: string[],
  difficulty?: string
];

const rowsToMcqs = (rows: ExtraMcqRow[]): PracticeMCQ[] =>
  rows.map(([id, q, options, correct, explanation, boardQuestions, difficulty]) => ({
    id,
    q,
    options,
    correct,
    explanation,
    ...(boardQuestions?.length ? { boardQuestions } : {}),
    ...(difficulty ? { difficulty } : {}),
  }));

const topic1CleanBaseCount = 14;

const extraMcqRows: Record<string, ExtraMcqRow[]> = {
  "topic-2-1": [
    ["ch2-t1-e01", "কমিউনিকেশন সিস্টেমের প্রধান উদ্দেশ্য কোনটি?", ["ডেটা সংরক্ষণ", "তথ্য আদান-প্রদান", "প্রোগ্রাম লেখা", "ডেটা মুছে ফেলা"], "তথ্য আদান-প্রদান", "কমিউনিকেশন সিস্টেমের মূল কাজ হলো নির্দিষ্ট উদ্দেশ্যে ব্যক্তি বা যন্ত্রের মধ্যে তথ্য আদান-প্রদান করা।", ["Board Book"], "Easy"],
    ["ch2-t1-e02", "ডেটা কমিউনিকেশনে উৎস বা Source-এর উদাহরণ কোনটি?", ["মাইক্রোফোন", "রাউটার", "মডেম", "টেলিফোন এক্সচেঞ্জ"], "মাইক্রোফোন", "মাইক্রোফোন, ক্যামেরা ও কীবোর্ড তথ্য উৎস হিসেবে কাজ করতে পারে।", ["Board Book"], "Easy"],
    ["ch2-t1-e03", "ডেটা কমিউনিকেশনে Transmitter-এর কাজ কী?", ["ডেটা মুছে ফেলা", "ডেটাকে প্রেরণযোগ্য সংকেতে রূপান্তর করা", "ডেটা গ্রহণ করে প্রদর্শন করা", "নয়েজ সৃষ্টি করা"], "ডেটাকে প্রেরণযোগ্য সংকেতে রূপান্তর করা", "ট্রান্সমিটার উৎস থেকে পাওয়া ডেটাকে মাধ্যম দিয়ে পাঠানোর উপযোগী সংকেতে রূপান্তর করে।", ["Board Book"], "Medium"],
    ["ch2-t1-e04", "ডেটা কমিউনিকেশনে নয়েজ বলতে কী বোঝায়?", ["প্রয়োজনীয় সংকেত", "অপ্রত্যাশিত বৈদ্যুতিক সংকেত", "ডেটা সংরক্ষণ পদ্ধতি", "মাধ্যমের গতি"], "অপ্রত্যাশিত বৈদ্যুতিক সংকেত", "উৎস থেকে গন্তব্যে ডেটা পাঠানোর সময় অনাকাঙ্ক্ষিত সংকেত যুক্ত হলে তাকে নয়েজ বলা হয়।", ["Board Book"], "Medium"],
    ["ch2-t1-e05", "১ Byte সমান কত bit?", ["৪ bit", "৮ bit", "১৬ bit", "১০২৪ bit"], "৮ bit", "ডেটা পরিমাপে ১ Byte = ৮ bit। bps হিসাবের সময় bit ও Byte আলাদা করে বুঝতে হয়।", ["Board Book"], "Easy"],
    ["ch2-t1-e06", "একটি নেটওয়ার্কের ব্যান্ডউইথ মূলত নির্ভর করে কোন দুটির উপর?", ["ডিজাইন ও রং", "মাধ্যম ও যন্ত্রপাতি", "ফাইলের নাম ও ফোল্ডার", "কীবোর্ড ও মাউস"], "মাধ্যম ও যন্ত্রপাতি", "ফাইবার অপটিক, টার্মিনাল ইকুইপমেন্ট ও নেটওয়ার্ক ডিভাইস ব্যান্ডউইথকে প্রভাবিত করে।", ["Board Book"], "Medium"],
    ["ch2-t1-e07", "একটি নেটওয়ার্ক অনেক ব্যবহারকারী একসাথে ব্যবহার করলে কী ঘটে?", ["ব্যান্ডউইথ ভাগ হয়ে যায়", "মাধ্যম বদলে যায়", "প্রটোকল বন্ধ হয়", "সব ব্যবহারকারী একই গতি পায় না"], "ব্যান্ডউইথ ভাগ হয়ে যায়", "একই নেটওয়ার্কের মোট ব্যান্ডউইথ ব্যবহারকারীদের মাঝে ভাগ হয়।", ["Board Book"], "Easy"],
    ["ch2-t1-e08", "ন্যারো ব্যান্ড সাধারণত কোন কাজে ব্যবহৃত হয়?", ["টেলিগ্রাফি", "HD ভিডিও কনফারেন্স", "ক্লাউড গেমিং", "ফাইবার ব্যাকবোন"], "টেলিগ্রাফি", "ন্যারো ব্যান্ডের গতি 45-300 bps, তাই অত্যন্ত ধীরগতির কাজে ব্যবহৃত হয়।", ["যশোর বোর্ড ২০২৫"], "Easy"],
    ["ch2-t1-e09", "ভয়েস ব্যান্ডের গতি সাধারণত কোন রেঞ্জে থাকে?", ["45-300 bps", "1200-9600 bps", "1 Mbps বা বেশি", "1 Gbps বা বেশি"], "1200-9600 bps", "ভয়েস ব্যান্ড টেলিফোন ও কম্পিউটার-পেরিফেরাল ডেটা আদান-প্রদানে ব্যবহৃত হয়।", ["বরিশাল বোর্ড ২০২৫"], "Easy"],
    ["ch2-t1-e10", "ব্রডব্যান্ড বলতে সাধারণত কোন গতি বোঝায়?", ["300 bps", "9600 bps", "1 Mbps বা তার বেশি", "45 bps"], "1 Mbps বা তার বেশি", "ব্রডব্যান্ড উচ্চগতিসম্পন্ন ডেটা ট্রান্সমিশনের ব্যান্ড।", ["ঢাকা বোর্ড ২০২৫"], "Easy"],
    ["ch2-t1-e11", "১০ সেকেন্ডে ৮০,০০০ bit ডেটা গেলে ব্যান্ডউইথ কত?", ["৮০০ bps", "৮০০০ bps", "৮০,০০০ bps", "৮ Mbps"], "৮০০০ bps", "ব্যান্ডউইথ = মোট bit / সময় = 80,000 / 10 = 8,000 bps।", ["ময়মনসিংহ বোর্ড ২০২৫"], "Medium"],
    ["ch2-t1-e12", "ব্যান্ডউইথ ম্যানেজমেন্ট কেন গুরুত্বপূর্ণ?", ["রং ঠিক রাখতে", "ব্যবহারকারীদের ন্যায্য গতি ও সার্ভিস বজায় রাখতে", "কেবল নাম বদলাতে", "অফলাইন কাজ করতে"], "ব্যবহারকারীদের ন্যায্য গতি ও সার্ভিস বজায় রাখতে", "একজন ব্যবহারকারী বেশি ব্যান্ডউইথ দখল করলে অন্যদের সেবা কমে যায়, তাই ব্যবস্থাপনা দরকার।", ["Board Book"], "Medium"],
  ],
  "topic-2-2": [
    ["ch2-t2-e01", "প্যারালাল ট্রান্সমিশনে একসাথে কী পাঠানো হয়?", ["একটি bit", "একাধিক bit", "শুধু header", "শুধু stop bit"], "একাধিক bit", "প্যারালাল পদ্ধতিতে একাধিক লাইনে একই সময়ে একাধিক bit পাঠানো হয়।", ["Board Book"], "Easy"],
    ["ch2-t2-e02", "সিরিয়াল ট্রান্সমিশনে এক সময়ে কত bit যায়?", ["একটি", "আটটি", "ষোলটি", "বত্রিশটি"], "একটি", "সিরিয়াল ট্রান্সমিশনে ধারাবাহিকভাবে একটির পর একটি bit পাঠানো হয়।", ["Board Book"], "Easy"],
    ["ch2-t2-e03", "n bit ডেটা প্যারালালভাবে পাঠাতে সাধারণত কতটি ডেটা লাইন প্রয়োজন?", ["১টি", "nটি", "২nটি", "n-1টি"], "nটি", "প্যারালাল ট্রান্সমিশনে প্রতিটি bit-এর জন্য আলাদা লাইন লাগে।", ["Board Book"], "Medium"],
    ["ch2-t2-e04", "সিরিয়াল ট্রান্সমিশন তুলনামূলক নির্ভরযোগ্য কেন?", ["একাধিক medium লাগে", "একটি bit পাঠানোর পর পরের bit পাঠানো হয়", "এতে clock লাগে না", "এতে receiver লাগে না"], "একটি bit পাঠানোর পর পরের bit পাঠানো হয়", "ধারাবাহিক bit প্রবাহের কারণে নয়েজ কম এবং দীর্ঘ দূরত্বে ব্যবহার সুবিধাজনক।", ["Board Book"], "Medium"],
    ["ch2-t2-e05", "বিট সিনক্রোনাইজেশনের প্রধান কাজ কী?", ["ডেটা মুছে ফেলা", "bit-এর শুরু ও শেষ শনাক্ত করা", "ফাইল কমপ্রেস করা", "মাধ্যম পরিবর্তন করা"], "bit-এর শুরু ও শেষ শনাক্ত করা", "প্রেরক ও প্রাপকের clock মিল রেখে bit শনাক্ত করার পদ্ধতি হলো bit synchronization।", ["কুমিল্লা বোর্ড ২০২৫"], "Easy"],
    ["ch2-t2-e06", "অ্যাসিনক্রোনাস ট্রান্সমিশনে ডেটা কীভাবে পাঠানো হয়?", ["ব্লক আকারে", "ক্যারেক্টার বাই ক্যারেক্টার", "শুধু wave আকারে", "সব receiver-এ একসাথে"], "ক্যারেক্টার বাই ক্যারেক্টার", "এ পদ্ধতিতে প্রতিবারে একটি করে character পাঠানো হয়।", ["ময়মনসিংহ বোর্ড ২০২৫"], "Easy"],
    ["ch2-t2-e07", "অ্যাসিনক্রোনাস ট্রান্সমিশনে start bit কেন ব্যবহৃত হয়?", ["ডেটা শেষ বোঝাতে", "ডেটা শুরু বোঝাতে", "মাধ্যম বদলাতে", "ডেটা মুছতে"], "ডেটা শুরু বোঝাতে", "Start bit দেখে receiver বুঝতে পারে character আসতে শুরু করেছে।", ["ঢাকা বোর্ড ২০২৫"], "Easy"],
    ["ch2-t2-e08", "অ্যাসিনক্রোনাস ট্রান্সমিশনে stop bit-এর কাজ কী?", ["character শেষ হয়েছে বোঝানো", "মাধ্যম তৈরি করা", "প্রটোকল বদলানো", "নেটওয়ার্ক বড় করা"], "character শেষ হয়েছে বোঝানো", "Stop bit receiver-কে character শেষ হওয়ার সংকেত দেয়।", ["ঢাকা বোর্ড ২০২৫"], "Easy"],
    ["ch2-t2-e09", "কোন ট্রান্সমিশনে প্রাইমারি স্টোরেজ প্রয়োজন হয় না?", ["সিনক্রোনাস", "অ্যাসিনক্রোনাস", "আইসোক্রোনাস", "ব্রডকাস্ট"], "অ্যাসিনক্রোনাস", "অ্যাসিনক্রোনাসে character পৃথকভাবে যায়, তাই বড় block ধরে রাখার জন্য buffer দরকার হয় না।", ["সিলেট বোর্ড ২০২৫"], "Medium"],
    ["ch2-t2-e10", "সিনক্রোনাস ট্রান্সমিশনে ডেটা সাধারণত কী আকারে পাঠানো হয়?", ["ব্লক বা packet", "একটি character", "শুধু stop bit", "শুধু voice"], "ব্লক বা packet", "সিনক্রোনাস পদ্ধতিতে ডেটা block বা packet আকারে পাঠানো হয়।", ["বরিশাল বোর্ড ২০২৫"], "Easy"],
    ["ch2-t2-e11", "সিনক্রোনাস ট্রান্সমিশনে block-এর শুরুতে কী থাকে?", ["Trailer", "Header", "Stop bit", "Parity-less gap"], "Header", "Block-এর শুরুতে header এবং শেষে trailer থাকে।", ["Board Book"], "Medium"],
    ["ch2-t2-e12", "কোন ট্রান্সমিশনে প্রেরকের পাশে buffer/primary memory প্রয়োজন হয়?", ["সিমপ্লেক্স", "সিনক্রোনাস", "ব্রডকাস্ট", "ইউনিকাস্ট"], "সিনক্রোনাস", "সিনক্রোনাসে block আকারে ডেটা জমিয়ে পাঠানো হয়, তাই buffer দরকার হয়।", ["বরিশাল বোর্ড ২০২৫"], "Medium"],
    ["ch2-t2-e13", "অ্যাসিনক্রোনাস ট্রান্সমিশনে character-এর মাঝের সময় ব্যবধান কেমন হতে পারে?", ["সবসময় সমান", "অসমান", "শূন্য", "নেই"], "অসমান", "প্রেরক যখন খুশি character পাঠাতে পারে, তাই ব্যবধান সমান না-ও হতে পারে।", ["ময়মনসিংহ বোর্ড ২০২৫"], "Easy"],
    ["ch2-t2-e14", "সিনক্রোনাস ট্রান্সমিশনের blockগুলোর মাঝের সময় বিরতি সাধারণত কেমন?", ["সমান", "অসীম", "এলোমেলো", "শূন্য নয়েজ"], "সমান", "সিনক্রোনাস পদ্ধতিতে timing নিয়ন্ত্রিত থাকে, তাই block gap সমান থাকে।", ["Board Book"], "Easy"],
    ["ch2-t2-e15", "আইসোক্রোনাস ট্রান্সমিশন কোন ধরনের কাজের জন্য উপযোগী?", ["রিয়েল টাইম অডিও-ভিডিও", "কাগজ ছাপানো", "ডেটা আর্কাইভ", "শুধু keyboard input"], "রিয়েল টাইম অডিও-ভিডিও", "লাইভ audio/video-তে delay কম রাখতে isochronous পদ্ধতি সুবিধাজনক।", ["চট্টগ্রাম বোর্ড ২০২৫"], "Medium"],
    ["ch2-t2-e16", "আইসোক্রোনাস পদ্ধতিতে blockগুলোর মাঝের সময় ব্যবধানের লক্ষ্য কী?", ["অনেক বড় রাখা", "শূন্যের কাছাকাছি রাখা", "অবশ্যই অসমান রাখা", "random রাখা"], "শূন্যের কাছাকাছি রাখা", "Isochronous synchronous-এর উন্নত রূপ, যেখানে delay অত্যন্ত কম রাখা হয়।", ["Board Book"], "Medium"],
    ["ch2-t2-e17", "আইসোক্রোনাস ট্রান্সমিশনের একটি সীমাবদ্ধতা কোনটি?", ["ভুল সংশোধনের সুযোগ কম", "গতি কম", "real-time চলে না", "block যায় না"], "ভুল সংশোধনের সুযোগ কম", "রিয়েল টাইম প্রবাহ বজায় রাখতে error correction-এর সুযোগ সীমিত।", ["Board Book"], "Medium"],
    ["ch2-t2-e18", "কীবোর্ড থেকে CPU-তে ডেটা যাওয়ার পদ্ধতি কোনটি?", ["অ্যাসিনক্রোনাস", "আইসোক্রোনাস", "মাল্টিকাস্ট", "ব্রডকাস্ট"], "অ্যাসিনক্রোনাস", "key press-এর সময় ব্যবধান অসমান হওয়ায় keyboard input অ্যাসিনক্রোনাস ট্রান্সমিশনের উদাহরণ।", ["সিলেট বোর্ড ২০২৫"], "Easy"],
  ],
  "topic-2-3": [
    ["ch2-t3-e01", "ডেটা ট্রান্সমিশন মোড কিসের দিক নির্দেশ করে?", ["ডেটা প্রবাহের দিক", "মাধ্যমের রং", "ফাইলের আকার", "সার্ভারের নাম"], "ডেটা প্রবাহের দিক", "প্রেরক ও প্রাপকের মধ্যে ডেটা কোন দিকে প্রবাহিত হবে সেটিই transmission mode।", ["Board Book"], "Easy"],
    ["ch2-t3-e02", "সিমপ্লেক্স মোডে যোগাযোগ কেমন?", ["একমুখী", "উভয়মুখী একই সময়ে", "উভয়মুখী পালাক্রমে", "শুধু নির্দিষ্ট group"], "একমুখী", "সিমপ্লেক্সে একদিকে ডেটা যায়, যেমন keyboard থেকে CPU।", ["চট্টগ্রাম বোর্ড ২০২৫"], "Easy"],
    ["ch2-t3-e03", "হাফ-ডুপ্লেক্স মোডের উদাহরণ কোনটি?", ["ওয়াকি-টকি", "টেলিভিশন", "মোবাইল ফোন", "ফুল-ডুপ্লেক্স টেলিফোন"], "ওয়াকি-টকি", "হাফ-ডুপ্লেক্সে দুই দিকেই ডেটা যায়, কিন্তু একই সময়ে নয়।", ["Board Book"], "Easy"],
    ["ch2-t3-e04", "ফুল-ডুপ্লেক্স মোডে কী সম্ভব?", ["একই সময়ে উভয় দিকে ডেটা আদান-প্রদান", "শুধু একদিকে ডেটা", "শুধু broadcast", "শুধু storage"], "একই সময়ে উভয় দিকে ডেটা আদান-প্রদান", "টেলিফোন বা মোবাইলে দুই পক্ষ একই সময়ে কথা বলতে ও শুনতে পারে।", ["Board Book"], "Easy"],
    ["ch2-t3-e05", "রেডিও সম্প্রচারে ট্রান্সমিশন মোড কোনটি?", ["সিমপ্লেক্স", "হাফ-ডুপ্লেক্স", "ফুল-ডুপ্লেক্স", "মেশ"], "সিমপ্লেক্স", "রেডিওতে broadcaster পাঠায়, শ্রোতা শুধু গ্রহণ করে।", ["দিনাজপুর বোর্ড ২০২৫"], "Easy"],
    ["ch2-t3-e06", "ডেটা ডেলিভারি মোড নির্ধারণে কোন বিষয়টি বিবেচ্য?", ["প্রাপক সংখ্যা ও গ্রহণ অধিকার", "তার পুরুত্ব", "ক্যাবল রং", "ডিভাইসের দাম"], "প্রাপক সংখ্যা ও গ্রহণ অধিকার", "Unicast, broadcast ও multicast প্রাপকের ধরন অনুযায়ী আলাদা হয়।", ["Board Book"], "Medium"],
    ["ch2-t3-e07", "একজন প্রেরক থেকে একজন প্রাপকের কাছে ডেটা পাঠানোকে কী বলে?", ["Unicast", "Broadcast", "Multicast", "Roaming"], "Unicast", "Unicast হলো one-to-one ডেটা ডেলিভারি।", ["Board Book"], "Easy"],
    ["ch2-t3-e08", "একজন প্রেরক থেকে নেটওয়ার্কের সকল প্রাপকের কাছে ডেটা পাঠানো কোন মোড?", ["Broadcast", "Unicast", "Multicast", "Isochronous"], "Broadcast", "Broadcast-এ নেটওয়ার্কের সব ডিভাইস ডেটা পায়।", ["চট্টগ্রাম বোর্ড ২০২৫"], "Easy"],
    ["ch2-t3-e09", "নির্বাচিত কয়েকজন প্রাপকের কাছে ডেটা পাঠানোকে কী বলে?", ["Multicast", "Unicast", "Simplex", "Full-duplex"], "Multicast", "Multicast-এ একটি নির্দিষ্ট group ডেটা গ্রহণ করে।", ["Board Book"], "Easy"],
    ["ch2-t3-e10", "ই-মেইল একজন নির্দিষ্ট ব্যক্তিকে পাঠালে সেটি কোন delivery mode?", ["Unicast", "Broadcast", "Multicast", "Half-duplex"], "Unicast", "একজন প্রেরক থেকে একজন নির্দিষ্ট প্রাপকের কাছে ডেটা পাঠানো unicast।", ["সিলেট বোর্ড ২০২৫"], "Easy"],
    ["ch2-t3-e11", "লাইভ online class একদল শিক্ষার্থী দেখলে delivery mode কী?", ["Multicast", "Unicast", "Simplex", "Piconet"], "Multicast", "নির্দিষ্ট group বা class সদস্যদের কাছে ডেটা গেলে সেটি multicast।", ["Board-focused"], "Medium"],
    ["ch2-t3-e12", "মোবাইল ফোনে কথোপকথন সাধারণত কোন transmission mode?", ["Full-duplex", "Simplex", "Broadcast", "Asynchronous"], "Full-duplex", "মোবাইল ফোন একই সময়ে কথ বলা ও শোনা সমর্থন করে।", ["দিনাজপুর বোর্ড ২০২৫"], "Easy"],
    ["ch2-t3-e13", "টেলিভিশন সম্প্রচারের ক্ষেত্রে সঠিক যুগল কোনটি?", ["সিমপ্লেক্স ও ব্রডকাস্ট", "ফুল-ডুপ্লেক্স ও ইউনিকাস্ট", "হাফ-ডুপ্লেক্স ও মাল্টিকাস্ট", "সিনক্রোনাস ও ইউনিকাস্ট"], "সিমপ্লেক্স ও ব্রডকাস্ট", "টিভিতে ডেটা একদিকে যায় এবং বহু দর্শক গ্রহণ করে।", ["ময়মনসিংহ বোর্ড ২০২৫"], "Medium"],
    ["ch2-t3-e14", "দুইজন security guard একই সময়ে কথা বলতে না পারলে তারা কোন mode ব্যবহার করছে?", ["Half-duplex", "Full-duplex", "Broadcast", "Unicast"], "Half-duplex", "দুই দিকে যোগাযোগ হয়, কিন্তু একই সময়ে নয়।", ["Board-focused"], "Easy"],
    ["ch2-t3-e15", "প্রেরক ও প্রাপক হিসেবে একই ডিভাইস কখন কাজ করতে পারে?", ["হাফ-ডুপ্লেক্স বা ফুল-ডুপ্লেক্সে", "শুধু সিমপ্লেক্সে", "শুধু ব্রডকাস্টে", "শুধু বাস টপোলজিতে"], "হাফ-ডুপ্লেক্স বা ফুল-ডুপ্লেক্সে", "দুইমুখী যোগাযোগে একই ডিভাইস কখনো প্রেরক, কখনো প্রাপক হিসেবে কাজ করে।", ["রাজশাহী বোর্ড ২০২৫"], "Medium"],
  ],
  "topic-2-4": [
    ["ch2-t4-e01", "ফাইবার অপটিক ক্যাবলে ডেটা পাঠাতে সাধারণত কোন আলো ব্যবহার করা হয়?", ["লেজার বা LED", "গামা রশ্মি", "এক্স-রে", "বিটা রশ্মি"], "লেজার বা LED", "অপটিক্যাল ফাইবারে বৈদ্যুতিক সংকেতের বদলে আলো সংকেত ব্যবহার করা হয়।", ["ঢাকা বোর্ড ২০২৫"], "Easy"],
    ["ch2-t4-e02", "10Base2 নামে পরিচিত coaxial cable কোনটি?", ["Thinnet", "Thicknet", "UTP", "Single mode fiber"], "Thinnet", "Thinnet coaxial cable 10Base2 নামে পরিচিত।", ["রাজশাহী বোর্ড ২০২৫"], "Medium"],
    ["ch2-t4-e03", "10Base5 নামে পরিচিত cable কোনটি?", ["Thicknet", "Thinnet", "STP", "Infrared"], "Thicknet", "Thicknet coaxial cable 10Base5 নামে পরিচিত এবং দূরত্ব বেশি কভার করতে পারে।", ["দিনাজপুর বোর্ড ২০২৫"], "Medium"],
    ["ch2-t4-e04", "ক্যাবল টিভি নেটওয়ার্কে সাধারণত কোন cable ব্যবহৃত হয়?", ["Co-axial cable", "Twisted pair", "Infrared", "Bluetooth"], "Co-axial cable", "Cable TV ও dish TV সংযোগে coaxial cable বেশি ব্যবহৃত হয়।", ["সিলেট বোর্ড ২০২৫"], "Easy"],
    ["ch2-t4-e05", "অপটিক্যাল ফাইবার EMI প্রভাবমুক্ত কেন?", ["এতে আলো সংকেত ব্যবহৃত হয়", "এতে তামা বেশি থাকে", "এতে radio wave লাগে", "এতে hub লাগে না"], "এতে আলো সংকেত ব্যবহৃত হয়", "আলো সংকেত দিয়ে ডেটা যাওয়ায় electromagnetic interference-এর প্রভাব কম।", ["রাজশাহী বোর্ড ২০২৫"], "Medium"],
  ],
  "topic-2-5": [
    ["ch2-t5-e01", "জিওস্টেশনারি স্যাটেলাইট সাধারণত কত উচ্চতায় স্থাপন করা হয়?", ["প্রায় ৩৬,০০০ কি.মি.", "প্রায় ৩,৬০০ কি.মি.", "প্রায় ৩০০ কি.মি.", "প্রায় ১০০ কি.মি."], "প্রায় ৩৬,০০০ কি.মি.", "জিওস্টেশনারি স্যাটেলাইট নিরক্ষরেখার উপরে প্রায় 36,000 km উচ্চতায় থাকে।", ["সিলেট বোর্ড ২০২৫"], "Easy"],
    ["ch2-t5-e02", "VSAT কোন ধরনের যোগাযোগের সাথে সম্পর্কিত?", ["Satellite communication", "Twisted pair LAN", "Infrared remote only", "Co-axial cable"], "Satellite communication", "VSAT ছোট satellite earth station হিসেবে ব্যবহৃত হয়।", ["ময়মনসিংহ বোর্ড ২০২৫"], "Medium"],
    ["ch2-t5-e03", "টেরেস্ট্রিয়াল মাইক্রোওয়েভ যোগাযোগে কোন শর্ত গুরুত্বপূর্ণ?", ["Line of sight", "Start bit", "MAC table", "Cloud region"], "Line of sight", "মাইক্রোওয়েভে টাওয়ারগুলোর মধ্যে সরাসরি দৃষ্টিরেখা প্রয়োজন হয়।", ["Board Book"], "Easy"],
    ["ch2-t5-e04", "টিভি রিমোট কন্ট্রোলে সাধারণত কোন মাধ্যম ব্যবহৃত হয়?", ["Infrared", "WiMAX", "Coaxial", "Fiber"], "Infrared", "স্বল্প দূরত্বে line-of-sight নিয়ন্ত্রণে infrared ব্যবহৃত হয়।", ["Board-focused"], "Easy"],
    ["ch2-t5-e05", "রেডিও ওয়েভের একটি বৈশিষ্ট্য কোনটি?", ["বড় এলাকা কভার করতে পারে", "শুধু cable-এ চলে", "শুধু ১০ মিটার যায়", "সবসময় fiber লাগে"], "বড় এলাকা কভার করতে পারে", "রেডিও ওয়েভ বিভিন্ন দিকে ছড়িয়ে পড়ে এবং সম্প্রচারে ব্যবহৃত হয়।", ["দিনাজপুর বোর্ড ২০২৫"], "Easy"],
    ["ch2-t5-e06", "দুর্গম এলাকায় tower বসিয়ে wireless broadband দিতে কোন মাধ্যমটি বেশি প্রাসঙ্গিক?", ["Microwave/WiMAX ভিত্তিক wireless link", "Keyboard cable", "Parallel printer port", "PAN only"], "Microwave/WiMAX ভিত্তিক wireless link", "দীর্ঘ দূরত্বে tower নির্ভর microwave বা WiMAX সংযোগ ব্যবহার করা যায়।", ["কুমিল্লা বোর্ড ২০২৫"], "Medium"],
  ],
  "topic-2-6": [
    ["ch2-t6-e01", "Wi-Fi-এর IEEE standard কোনটি?", ["802.11", "802.15", "802.16", "802.3"], "802.11", "Wi-Fi হলো IEEE 802.11 standard-এর wireless LAN প্রযুক্তি।", ["ঢাকা বোর্ড ২০২৫"], "Easy"],
    ["ch2-t6-e02", "WiMAX-এর IEEE standard কোনটি?", ["802.16", "802.11", "802.15", "802.5"], "802.16", "WiMAX হলো IEEE 802.16 standard-এর wireless MAN প্রযুক্তি।", ["ঢাকা বোর্ড ২০২৫"], "Easy"],
    ["ch2-t6-e03", "Bluetooth-এর IEEE standard কোনটি?", ["802.15", "802.11", "802.16", "802.20"], "802.15", "Bluetooth ব্যক্তিগত স্বল্প দূরত্বের WPAN প্রযুক্তি।", ["বরিশাল বোর্ড ২০২৫"], "Easy"],
    ["ch2-t6-e04", "Piconet কোন প্রযুক্তির সাথে সম্পর্কিত?", ["Bluetooth", "WiMAX", "Satellite", "Coaxial"], "Bluetooth", "Bluetooth ছোট নেটওয়ার্কে piconet গঠন করে।", ["চট্টগ্রাম বোর্ড ২০২৫"], "Easy"],
    ["ch2-t6-e05", "Wi-Fi সাধারণত কোন frequency band ব্যবহার করে?", ["2.4 GHz ও 5 GHz", "2-66 GHz", "45-300 bps", "36,000 km"], "2.4 GHz ও 5 GHz", "Wi-Fi সাধারণত 2.4 GHz ও 5 GHz band-এ কাজ করে।", ["সিলেট বোর্ড ২০২৫"], "Medium"],
    ["ch2-t6-e06", "WiMAX ব্যবহারে কর্তৃপক্ষের অনুমোদন কেন প্রয়োজন হতে পারে?", ["বিস্তৃত licensed wireless coverage-এর জন্য", "keyboard input-এর জন্য", "একটি mouse চালাতে", "শুধু image দেখাতে"], "বিস্তৃত licensed wireless coverage-এর জন্য", "WiMAX বড় এলাকায় wireless broadband দেয়, তাই spectrum/authority approval দরকার হতে পারে।", ["কুমিল্লা বোর্ড ২০২৫"], "Medium"],
  ],
  "topic-2-7": [
    ["ch2-t7-e01", "রোমিং কী?", ["নিজ অপারেটরের coverage-এর বাইরে থেকেও service পাওয়া", "Bluetooth pair করা", "cloud backup করা", "hub broadcast করা"], "নিজ অপারেটরের coverage-এর বাইরে থেকেও service পাওয়া", "কভারেজ এলাকার বাইরে থেকেও service পাওয়া roaming।", ["ঢাকা বোর্ড ২০২৫"], "Easy"],
    ["ch2-t7-e02", "১ম প্রজন্মের মোবাইল যোগাযোগে কোন system ব্যবহৃত হয়?", ["Analog", "Packet switched IP", "5G NR", "LTE"], "Analog", "1G মোবাইলে analog voice communication ব্যবহৃত হয়েছিল।", ["Board Book"], "Easy"],
    ["ch2-t7-e03", "২য় প্রজন্মের মোবাইল ফোনকে কী বলা হয়?", ["Digital cellular network", "Analog broadcast", "Fiber network", "Cloud service"], "Digital cellular network", "2G-তে analog-এর বদলে digital transmission চালু হয়।", ["Board Book"], "Easy"],
    ["ch2-t7-e04", "GSM কোন প্রজন্মের গুরুত্বপূর্ণ standard?", ["2G", "1G", "4G", "5G"], "2G", "GSM ও CDMA 2G mobile technology-এর গুরুত্বপূর্ণ standard।", ["Board Book"], "Easy"],
    ["ch2-t7-e05", "ভিডিও call কোন প্রজন্মে জনপ্রিয়ভাবে শুরু হয়?", ["3G", "1G", "2G", "PAN"], "3G", "3G-তে video call, mobile internet ও multimedia service বিস্তৃত হয়।", ["ময়মনসিংহ বোর্ড ২০২৫"], "Easy"],
    ["ch2-t7-e06", "3G-তে ডেটা পাঠাতে কোন switching ধারণা বেশি গুরুত্বপূর্ণ?", ["Packet switching", "Only analog switching", "Manual switching", "Bus switching"], "Packet switching", "3G-তে data transmission packet switching ভিত্তিক হয়।", ["Board Book"], "Medium"],
    ["ch2-t7-e07", "4G মোবাইলের প্রধান standard কোনটি?", ["LTE", "GSM", "AMPS", "TACS"], "LTE", "Long Term Evolution বা LTE 4G মোবাইল network-এর standard।", ["ঢাকা বোর্ড ২০২৫"], "Easy"],
    ["ch2-t7-e08", "4G নেটওয়ার্ক কোন ভিত্তিতে কাজ করে?", ["Internet Protocol ভিত্তিক", "শুধু analog voice", "শুধু infrared", "শুধু piconet"], "Internet Protocol ভিত্তিক", "4G-তে IP based network ব্যবহার হয়।", ["ঢাকা বোর্ড ২০২৫"], "Medium"],
    ["ch2-t7-e09", "5G standard-এর একটি উদাহরণ কোনটি?", ["5G NR", "AMPS", "10Base2", "GSM only"], "5G NR", "5G NR এবং MIMO 5G প্রজন্মের গুরুত্বপূর্ণ standard/technology।", ["Board Book"], "Easy"],
    ["ch2-t7-e10", "মোবাইল ফোনকে সেলুলার ফোন বলা হয় কেন?", ["এটি বিভিন্ন cell ও base station-এর মাধ্যমে কাজ করে", "এতে শুধু cable লাগে", "এটি শুধু offline চলে", "এটি hub ছাড়া চলে না"], "এটি বিভিন্ন cell ও base station-এর মাধ্যমে কাজ করে", "পুরো অঞ্চল cell-এ ভাগ থাকে এবং প্রতিটি cell-এ base station থাকে।", ["ময়মনসিংহ বোর্ড ২০২৫"], "Medium"],
    ["ch2-t7-e11", "Mobile switching center-এর কাজ কী?", ["কলের গন্তব্য cell খুঁজে সংযোগ দেওয়া", "fiber cable বানানো", "web page design", "MCQ তৈরি করা"], "কলের গন্তব্য cell খুঁজে সংযোগ দেওয়া", "কল কোন cell-এ পৌঁছাবে তা switching center নির্ধারণ করে।", ["Board Book"], "Medium"],
  ],
  "topic-2-8": [
    ["ch2-t8-e01", "PAN-এর পূর্ণরূপ কোনটি?", ["Personal Area Network", "Public Access Network", "Parallel Area Node", "Packet Access Network"], "Personal Area Network", "PAN ব্যক্তিগত স্বল্প দূরত্বের ডিভাইস নেটওয়ার্ক।", ["Board-focused"], "Easy"],
    ["ch2-t8-e02", "একই ভবনের কম্পিউটার সংযোগে কোন network বেশি উপযোগী?", ["LAN", "WAN", "MAN", "Satellite only"], "LAN", "Local Area Network ছোট এলাকা যেমন room, floor বা building কভার করে।", ["যশোর বোর্ড ২০২৫"], "Easy"],
    ["ch2-t8-e03", "বিশ্ববিদ্যালয় ক্যাম্পাসের একাধিক ভবন যুক্ত হলে কোন network হতে পারে?", ["CAN", "PAN", "Bluetooth only", "Simplex"], "CAN", "Campus Area Network একটি campus-এর একাধিক building যুক্ত করে।", ["Board-focused"], "Medium"],
    ["ch2-t8-e04", "সিটি কর্পোরেশন এলাকায় network গঠন করলে কোনটি প্রাসঙ্গিক?", ["MAN", "PAN", "Piconet", "Start bit"], "MAN", "Metropolitan Area Network একটি শহর বা মহানগর এলাকা কভার করে।", ["Board-focused"], "Easy"],
    ["ch2-t8-e05", "দেশ বা মহাদেশ জুড়ে network হলে সেটি কোনটি?", ["WAN", "LAN", "PAN", "CAN"], "WAN", "Wide Area Network বৃহৎ ভৌগোলিক অঞ্চল কভার করে, যেমন internet।", ["দিনাজপুর বোর্ড ২০২৫"], "Easy"],
    ["ch2-t8-e06", "নেটওয়ার্কে resource sharing বলতে কী বোঝায়?", ["হার্ডওয়্যার, সফটওয়্যার ও তথ্য ভাগাভাগি", "শুধু monitor বদলানো", "নেটওয়ার্ক বন্ধ করা", "সুইচ খুলে ফেলা"], "হার্ডওয়্যার, সফটওয়্যার ও তথ্য ভাগাভাগি", "Printer, storage, software ও data network-এ share করা যায়।", ["Board-focused"], "Easy"],
    ["ch2-t8-e07", "Client-server network-এ server-এর ভূমিকা কী?", ["service প্রদান ও নিয়ন্ত্রণ", "শুধু signal নষ্ট করা", "সব device বিচ্ছিন্ন করা", "শুধু radio চালানো"], "service প্রদান ও নিয়ন্ত্রণ", "Server resource, access ও service management করে।", ["রাজশাহী বোর্ড ২০২৫"], "Medium"],
    ["ch2-t8-e08", "Peer-to-peer network-এর বৈশিষ্ট্য কোনটি?", ["সব computer প্রায় সমমানের ভূমিকা নেয়", "একটি dedicated server বাধ্যতামূলক", "শুধু WAN চলে", "শুধু 5G লাগে"], "সব computer প্রায় সমমানের ভূমিকা নেয়", "Peer-to-peer network-এ আলাদা server ছাড়া device resource share করতে পারে।", ["রাজশাহী বোর্ড ২০২৫"], "Medium"],
    ["ch2-t8-e09", "Private network বলতে কী বোঝায়?", ["নির্দিষ্ট ব্যক্তি/প্রতিষ্ঠানের নিয়ন্ত্রিত network", "সবার জন্য উন্মুক্ত radio", "শুধু cloud storage", "শুধু TV broadcast"], "নির্দিষ্ট ব্যক্তি/প্রতিষ্ঠানের নিয়ন্ত্রিত network", "Private network মালিকানাধীন ও access নিয়ন্ত্রিত থাকে।", ["কুমিল্লা বোর্ড ২০২৫"], "Easy"],
  ],
  "topic-2-9": [
    ["ch2-t9-e01", "NIC-এর পূর্ণরূপ কী?", ["Network Interface Card", "Network Internet Cloud", "Node Input Cable", "New IP Controller"], "Network Interface Card", "কম্পিউটারকে network-এ যুক্ত করতে NIC ব্যবহার করা হয়।", ["চট্টগ্রাম বোর্ড ২০২৫"], "Easy"],
    ["ch2-t9-e02", "MAC address কত bit-এর?", ["৪৮ bit", "৮ bit", "১৬ bit", "৬৪ bit"], "৪৮ bit", "NIC-এ 48 bit-এর অদ্বিতীয় MAC address থাকে।", ["ময়মনসিংহ বোর্ড ২০২৫"], "Easy"],
    ["ch2-t9-e03", "Modulation কোন কাজকে বোঝায়?", ["ডিজিটাল সংকেতকে analog সংকেতে রূপান্তর", "analog সংকেতকে digital করা", "MAC table বানানো", "ক্লাউড ভাড়া করা"], "ডিজিটাল সংকেতকে analog সংকেতে রূপান্তর", "Modem-এর modulator অংশ digital signal-কে analog signal-এ রূপান্তর করে।", ["Board-focused"], "Medium"],
    ["ch2-t9-e04", "Demodulation কোন কাজকে বোঝায়?", ["analog সংকেতকে digital সংকেতে রূপান্তর", "digital সংকেতকে analog করা", "wire কাটা", "network বন্ধ করা"], "analog সংকেতকে digital সংকেতে রূপান্তর", "Modem-এর demodulator অংশ analog signal-কে digital signal-এ ফেরায়।", ["Board-focused"], "Medium"],
    ["ch2-t9-e05", "Repeater-এর প্রধান কাজ কী?", ["দুর্বল signal পুনরুজ্জীবিত করা", "protocol অনুবাদ করা", "cloud server ভাড়া দেওয়া", "প্রাপক বেছে নেওয়া"], "দুর্বল signal পুনরুজ্জীবিত করা", "Repeater signal regenerate করে network distance বাড়াতে সাহায্য করে।", ["রাজশাহী বোর্ড ২০২৫"], "Easy"],
    ["ch2-t9-e06", "Hub ডেটা পাঠালে সাধারণত কী করে?", ["সব port-এ broadcast করে", "শুধু নির্দিষ্ট port-এ পাঠায়", "protocol convert করে", "IP route ঠিক করে"], "সব port-এ broadcast করে", "Hub intelligent নয়, তাই incoming signal সব port-এ পাঠায়।", ["ময়মনসিংহ বোর্ড ২০২৫"], "Easy"],
    ["ch2-t9-e07", "Switch নির্দিষ্ট port-এ data পাঠাতে কী ব্যবহার করে?", ["MAC address table", "Satellite orbit", "Start bit", "Cloud model"], "MAC address table", "Switch MAC address শিখে নির্দিষ্ট port-এ frame forward করে।", ["ময়মনসিংহ বোর্ড ২০২৫"], "Medium"],
    ["ch2-t9-e08", "Router কোন layer-এর address দেখে path নির্ধারণ করে?", ["IP address", "MAC address only", "Start bit", "Fiber core"], "IP address", "Router IP address দেখে network-to-network data path নির্ধারণ করে।", ["Board-focused"], "Medium"],
    ["ch2-t9-e09", "Gateway-কে protocol converter বলা হয় কেন?", ["ভিন্ন protocol network যুক্ত করে", "সব port broadcast করে", "নেটওয়ার্কে আলো পাঠায়", "শুধু signal amplify করে"], "ভিন্ন protocol network যুক্ত করে", "Gateway ভিন্নধর্মী protocol-যুক্ত network-এর মধ্যে data exchange সম্ভব করে।", ["কুমিল্লা বোর্ড ২০২৫"], "Easy"],
    ["ch2-t9-e10", "Hub-এর তুলনায় Switch বেশি সুবিধাজনক কেন?", ["নির্দিষ্ট device-এ data পাঠিয়ে collision ও traffic কমায়", "সবসময় বেশি cable লাগে", "এটি analog only", "এটি cloud service"], "নির্দিষ্ট device-এ data পাঠিয়ে collision ও traffic কমায়", "Switch intelligent forwarding করে, তাই security ও performance বাড়ে।", ["যশোর বোর্ড ২০২৫"], "Medium"],
  ],
  "topic-2-10": [
    ["ch2-t10-e01", "নেটওয়ার্ক টপোলজি কী?", ["নেটওয়ার্কে device সংযুক্তির বিন্যাস", "ডেটার unit", "মোবাইল generation", "cloud price"], "নেটওয়ার্কে device সংযুক্তির বিন্যাস", "ক্যাবল, node ও network device যেভাবে যুক্ত থাকে সেটিই topology।", ["Board-focused"], "Easy"],
    ["ch2-t10-e02", "Bus topology-তে সব node কীসের সাথে যুক্ত থাকে?", ["একটি প্রধান cable", "একটি satellite", "একটি piconet", "একটি cloud account"], "একটি প্রধান cable", "Bus topology-তে backbone cable-এর সাথে সব node যুক্ত থাকে।", ["Board-focused"], "Easy"],
    ["ch2-t10-e03", "Ring topology-তে deviceগুলো কীভাবে যুক্ত থাকে?", ["চক্রাকারে", "একটি central device-এ", "সবাই সবার সাথে", "শুধু wireless tower-এ"], "চক্রাকারে", "Ring topology-তে প্রথম ও শেষ node যুক্ত হয়ে ring গঠন করে।", ["বরিশাল বোর্ড ২০২৫"], "Easy"],
    ["ch2-t10-e04", "Star topology-তে কেন্দ্রীয় device হিসেবে কী ব্যবহৃত হতে পারে?", ["Hub বা Switch", "Satellite only", "Stop bit", "Fiber core"], "Hub বা Switch", "Star topology-তে সব node hub/switch-এর সাথে যুক্ত থাকে।", ["যশোর বোর্ড ২০২৫"], "Easy"],
    ["ch2-t10-e05", "Tree topology মূলত কোন ধারণার সম্প্রসারণ?", ["Star topology", "Simplex mode", "Infrared", "Cloud SaaS"], "Star topology", "Tree topology-তে স্তরভিত্তিকভাবে একাধিক star network যুক্ত থাকে।", ["Board-focused"], "Medium"],
    ["ch2-t10-e06", "Mesh topology-তে nটি node-এর জন্য link সংখ্যা কত?", ["n(n-1)/2", "n-1", "n", "2n"], "n(n-1)/2", "Full mesh-এ প্রতিটি node অন্য সব node-এর সাথে সরাসরি যুক্ত থাকে।", ["রাজশাহী বোর্ড ২০২৫"], "Medium"],
    ["ch2-t10-e07", "৪৫টি link দিয়ে full mesh-এ সর্বোচ্চ কত node যুক্ত করা যায়?", ["১০", "৯", "১৫", "৪৫"], "১০", "n(n-1)/2 = 45 হলে n = 10।", ["রাজশাহী বোর্ড ২০২৫"], "Medium"],
    ["ch2-t10-e08", "Hybrid topology বলতে কী বোঝায়?", ["দুই বা ততোধিক topology-এর সমন্বয়", "শুধু bus topology", "শুধু piconet", "শুধু simplex"], "দুই বা ততোধিক topology-এর সমন্বয়", "বাস্তব network-এ star, bus, ring ইত্যাদির মিশ্রণে hybrid topology তৈরি হয়।", ["Board-focused"], "Medium"],
    ["ch2-t10-e09", "Bus topology-তে Terminator কেন প্রয়োজন?", ["signal reflection রোধ করতে", "MAC address বানাতে", "cloud billing করতে", "Wi-Fi range বাড়াতে"], "signal reflection রোধ করতে", "Bus cable-এর দুই প্রান্তে terminator signal reflection কমায়।", ["Board-focused"], "Hard"],
    ["ch2-t10-e10", "নির্ভরযোগ্যতা সবচেয়ে বেশি দরকার হলে কোন topology সুবিধাজনক?", ["Mesh", "Bus", "Simplex", "Piconet"], "Mesh", "Mesh topology-তে বিকল্প link থাকে, তাই link fail হলেও communication চলতে পারে।", ["কুমিল্লা বোর্ড ২০২৫"], "Medium"],
    ["ch2-t10-e11", "Star topology-র প্রধান দুর্বলতা কোনটি?", ["Central device নষ্ট হলে network প্রভাবিত হয়", "কোনো cable লাগে না", "সব node সবার সাথে সরাসরি যুক্ত", "broadcast সবসময় বন্ধ"], "Central device নষ্ট হলে network প্রভাবিত হয়", "সব node central hub/switch-এর উপর নির্ভর করে।", ["যশোর বোর্ড ২০২৫"], "Medium"],
  ],
  "topic-2-11": [
    ["ch2-t11-e01", "ক্লাউড কম্পিউটিং কী?", ["ইন্টারনেটভিত্তিক computing resource ব্যবহারের ব্যবস্থা", "শুধু local hard disk", "শুধু Bluetooth", "শুধু coaxial cable"], "ইন্টারনেটভিত্তিক computing resource ব্যবহারের ব্যবস্থা", "Cloud computing-এ server, storage, software ইত্যাদি অনলাইনে ব্যবহার করা যায়।", ["Board-focused"], "Easy"],
    ["ch2-t11-e02", "Pay as you go কোন প্রযুক্তির billing ধারণা?", ["Cloud computing", "Bus topology", "Infrared", "1G"], "Cloud computing", "ব্যবহার অনুযায়ী মূল্য পরিশোধ cloud service-এর গুরুত্বপূর্ণ বৈশিষ্ট্য।", ["চট্টগ্রাম বোর্ড ২০২৫"], "Easy"],
    ["ch2-t11-e03", "On-demand service বলতে কী বোঝায়?", ["প্রয়োজনে resource পাওয়া", "অবশ্যই offline থাকা", "সব cable খুলে ফেলা", "শুধু radio দেখা"], "প্রয়োজনে resource পাওয়া", "Cloud service প্রয়োজনমতো resource বরাদ্দ করতে পারে।", ["চট্টগ্রাম বোর্ড ২০২৫"], "Easy"],
    ["ch2-t11-e04", "SaaS-এর উদাহরণ কোনটি?", ["Browser-এ ব্যবহারযোগ্য software service", "raw virtual machine only", "network cable", "hub"], "Browser-এ ব্যবহারযোগ্য software service", "Software as a Service-এ software install না করে online service হিসেবে ব্যবহৃত হয়।", ["Board-focused"], "Medium"],
    ["ch2-t11-e05", "PaaS মূলত কাদের জন্য বেশি উপযোগী?", ["Developer", "শুধু TV viewer", "শুধু radio listener", "শুধু cable installer"], "Developer", "Platform as a Service developer-কে application build/deploy environment দেয়।", ["Board-focused"], "Medium"],
    ["ch2-t11-e06", "IaaS কী সরবরাহ করে?", ["Virtual server, storage ও network resource", "শুধু প্রস্তুত app", "শুধু keyboard", "শুধু infrared"], "Virtual server, storage ও network resource", "Infrastructure as a Service virtual infrastructure ভাড়ায় দেয়।", ["Board-focused"], "Medium"],
    ["ch2-t11-e07", "Public cloud কার জন্য উন্মুক্ত?", ["সাধারণ ব্যবহারকারী বা প্রতিষ্ঠান", "শুধু একটি গোপন LAN", "শুধু একটি keyboard", "শুধু offline PC"], "সাধারণ ব্যবহারকারী বা প্রতিষ্ঠান", "Public cloud provider-এর shared infrastructure বহু ব্যবহারকারী ব্যবহার করে।", ["Board-focused"], "Easy"],
    ["ch2-t11-e08", "Private cloud কার নিয়ন্ত্রণে থাকে?", ["একটি নির্দিষ্ট প্রতিষ্ঠান", "সবাই", "শুধু WiMAX tower", "শুধু router"], "একটি নির্দিষ্ট প্রতিষ্ঠান", "Private cloud নির্দিষ্ট প্রতিষ্ঠানের security ও control অনুযায়ী ব্যবহৃত হয়।", ["Board-focused"], "Medium"],
    ["ch2-t11-e09", "Hybrid cloud কী?", ["Public ও private cloud-এর সমন্বয়", "শুধু bus topology", "শুধু 2G", "শুধু piconet"], "Public ও private cloud-এর সমন্বয়", "Hybrid cloud public ও private resource একসাথে ব্যবহার করে।", ["Board-focused"], "Medium"],
    ["ch2-t11-e10", "Community cloud কারা ব্যবহার করে?", ["একই ধরনের প্রয়োজন থাকা কয়েকটি প্রতিষ্ঠান", "শুধু একজন ব্যক্তি", "শুধু modem", "শুধু TV channel"], "একই ধরনের প্রয়োজন থাকা কয়েকটি প্রতিষ্ঠান", "একই policy বা কাজের প্রতিষ্ঠানগুলো community cloud share করতে পারে।", ["Board-focused"], "Medium"],
    ["ch2-t11-e11", "Cloud computing-এর বড় সুবিধা কোনটি?", ["Software auto update", "সবসময় নিজের server কিনতে হয়", "internet লাগে না", "security risk নেই"], "Software auto update", "Cloud service provider software update ও maintenance করে।", ["বরিশাল বোর্ড ২০২৫"], "Easy"],
    ["ch2-t11-e12", "Cloud ব্যবহার করলে hardware খরচ কেন কমতে পারে?", ["নিজস্ব server infrastructure কম লাগে", "সব device কিনতে হয়", "কেবল দ্বিগুণ লাগে", "network বন্ধ থাকে"], "নিজস্ব server infrastructure কম লাগে", "Resource ভাড়ায় ব্যবহার করায় upfront hardware cost কমতে পারে।", ["দিনাজপুর বোর্ড ২০২৫"], "Medium"],
    ["ch2-t11-e13", "Cloud-এর scalability বলতে কী বোঝায়?", ["প্রয়োজনে resource বাড়ানো-কমানো", "শুধু monitor বড় করা", "cable ছোট করা", "radio frequency বদলানো"], "প্রয়োজনে resource বাড়ানো-কমানো", "চাহিদা অনুযায়ী computing resource বাড়ানো বা কমানো যায়।", ["Board-focused"], "Medium"],
    ["ch2-t11-e14", "Cloud service 24x7 বলতে কী বোঝায়?", ["সার্বক্ষণিক online access", "শুধু office hour", "শুধু local file", "শুধু cable TV"], "সার্বক্ষণিক online access", "Internet থাকলে যেকোনো সময় cloud service ব্যবহার করা যায়।", ["চট্টগ্রাম বোর্ড ২০২৫"], "Easy"],
    ["ch2-t11-e15", "Cloud computing-এর একটি ঝুঁকি কোনটি?", ["তথ্যের গোপনীয়তা ভঙ্গ হতে পারে", "কখনো internet লাগে না", "সব data local থাকে", "software update হয় না"], "তথ্যের গোপনীয়তা ভঙ্গ হতে পারে", "তথ্য provider-এর server-এ থাকায় privacy ও security risk থাকে।", ["সিলেট বোর্ড ২০২৫"], "Medium"],
    ["ch2-t11-e16", "Cloud ব্যবহার করতে কোনটি অপরিহার্য?", ["Internet connection", "Parallel printer port", "Thicknet only", "AMPS"], "Internet connection", "Cloud resource access করতে network/internet connection দরকার।", ["Board-focused"], "Easy"],
    ["ch2-t11-e17", "Cloud provider কীভাবে লাভবান হয়?", ["resource ও service ভাড়ায় দিয়ে", "সব service free দিয়ে", "keyboard বিক্রি করে", "topology এঁকে"], "resource ও service ভাড়ায় দিয়ে", "Provider infrastructure, platform বা software ভাড়ায় দিয়ে আয় করে।", ["Board-focused"], "Medium"],
    ["ch2-t11-e18", "Cloud user কীভাবে লাভবান হয়?", ["কম খরচে দ্রুত resource পায়", "সবসময় server room বানাতে হয়", "software manually update করতে হয়", "ডেটা ভাগ করা যায় না"], "কম খরচে দ্রুত resource পায়", "ব্যবহারকারী কম খরচে storage, software ও computing power পেতে পারে।", ["ঢাকা বোর্ড ২০২৫"], "Medium"],
    ["ch2-t11-e19", "Cloud backup-এর সুবিধা কী?", ["local device নষ্ট হলেও data recover করা যায়", "data সবসময় হারায়", "network লাগে না", "শুধু analog voice"], "local device নষ্ট হলেও data recover করা যায়", "Cloud backup remote server-এ data রাখে, তাই recovery সহজ হয়।", ["Board-focused"], "Easy"],
    ["ch2-t11-e20", "Vendor lock-in বলতে কী বোঝায়?", ["এক provider-এর service থেকে অন্যটিতে যাওয়া কঠিন হওয়া", "সব provider একই হওয়া", "Wi-Fi range কমা", "ring topology ভাঙা"], "এক provider-এর service থেকে অন্যটিতে যাওয়া কঠিন হওয়া", "নির্দিষ্ট cloud platform-এ dependency তৈরি হলে migration কঠিন হতে পারে।", ["Board-focused"], "Hard"],
    ["ch2-t11-e21", "Cloud-এ data কোথায় সংরক্ষিত থাকে?", ["Central/remote server-এ", "শুধু keyboard-এ", "শুধু monitor-এ", "শুধু coaxial cable-এ"], "Central/remote server-এ", "Cloud storage provider-এর remote server infrastructure-এ data রাখে।", ["বরিশাল বোর্ড ২০২৫"], "Easy"],
    ["ch2-t11-e22", "Cloud service উদ্যোক্তাদের জন্য সহায়ক কেন?", ["কম বিনিয়োগে online service চালু করা যায়", "প্রত্যেককে data center বানাতে হয়", "কোনো automation নেই", "service শুধু offline"], "কম বিনিয়োগে online service চালু করা যায়", "On-demand resource, pay-as-you-go cost ও 24x7 availability উদ্যোক্তাদের দ্রুত service চালু করতে সহায়তা করে।", ["চট্টগ্রাম বোর্ড ২০২৫"], "Medium"],
  ],
};

type ConceptVisual = {
  title: string;
  badge: string;
  text: string;
  variant: string;
  accent?: string;
};

const conceptSvg = (variant: string, accent = "#0f766e") => {
  const base = `xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img" aria-hidden="true"`;
  const node = (x: number, y: number, label: string, fill = "#ffffff") =>
    `<rect x="${x}" y="${y}" width="68" height="42" rx="12" fill="${fill}" stroke="${accent}" stroke-width="2"/><text x="${x + 34}" y="${y + 26}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#0f172a">${label}</text>`;
  const arrow = (x1: number, y1: number, x2: number, y2OrColor: number | string = y1, color = accent) => {
    const y2 = typeof y2OrColor === "number" ? y2OrColor : y1;
    const stroke = typeof y2OrColor === "string" ? y2OrColor : color;
    const path = y2 === y1 ? `M${x1} ${y1}H${x2}` : `M${x1} ${y1}L${x2} ${y2}`;
    return `<path d="${path}" stroke="${stroke}" stroke-width="4" stroke-linecap="round" marker-end="url(#arrow)"/>`;
  };
  const defs = `<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M1 1 9 5 1 9Z" fill="${accent}"/></marker></defs>`;

  switch (variant) {
    case "chain":
      return `<svg ${base}>${defs}<rect width="320" height="180" rx="24" fill="#f8fafc"/>${node(14, 68, "Source", "#ecfeff")}${arrow(82, 89, 111)}${node(112, 68, "Medium", "#f0fdf4")}${arrow(180, 89, 209)}${node(210, 68, "Receiver", "#fff7ed")}<path d="M160 42v-18M160 138v18" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6 6"/><text x="160" y="30" text-anchor="middle" font-family="Arial" font-size="12" font-weight="700" fill="#64748b">Noise can enter</text></svg>`;
    case "bandwidth":
      return `<svg ${base}><rect width="320" height="180" rx="24" fill="#f8fafc"/><text x="160" y="36" text-anchor="middle" font-family="Arial" font-size="18" font-weight="800" fill="#0f172a">Bandwidth = bits / second</text><rect x="46" y="118" width="48" height="26" rx="8" fill="#bae6fd"/><rect x="108" y="94" width="48" height="50" rx="8" fill="#67e8f9"/><rect x="170" y="66" width="48" height="78" rx="8" fill="#5eead4"/><rect x="232" y="42" width="48" height="102" rx="8" fill="#34d399"/><path d="M36 145h254" stroke="#0f172a" stroke-width="3"/><text x="70" y="162" text-anchor="middle" font-family="Arial" font-size="11" fill="#334155">Narrow</text><text x="132" y="162" text-anchor="middle" font-family="Arial" font-size="11" fill="#334155">Voice</text><text x="218" y="162" text-anchor="middle" font-family="Arial" font-size="11" fill="#334155">Broadband</text></svg>`;
    case "range":
      return `<svg ${base}>${defs}<rect width="320" height="180" rx="24" fill="#f8fafc"/><path d="M48 132h224" stroke="#cbd5e1" stroke-width="14" stroke-linecap="round"/><path d="M48 132h60" stroke="#f97316" stroke-width="14" stroke-linecap="round"/><path d="M108 132h70" stroke="#06b6d4" stroke-width="14"/><path d="M178 132h94" stroke="#16a34a" stroke-width="14" stroke-linecap="round"/><text x="78" y="84" text-anchor="middle" font-family="Arial" font-size="13" font-weight="800" fill="#9a3412">45-300 bps</text><text x="143" y="61" text-anchor="middle" font-family="Arial" font-size="13" font-weight="800" fill="#0e7490">1200-9600</text><text x="224" y="40" text-anchor="middle" font-family="Arial" font-size="13" font-weight="800" fill="#15803d">1 Mbps+</text>${arrow(66, 92, 102, "#f97316")}${arrow(137, 70, 165, "#06b6d4")}${arrow(214, 50, 258, "#16a34a")}</svg>`;
    case "parallel":
      return `<svg ${base}>${defs}<rect width="320" height="180" rx="24" fill="#f8fafc"/>${node(28, 68, "Sender", "#eef2ff")}${node(224, 68, "Receiver", "#ecfdf5")}${[54,78,102,126].map(y => arrow(96, y, 224)).join("")}<text x="160" y="38" text-anchor="middle" font-family="Arial" font-size="14" font-weight="800" fill="#334155">Many bits at the same time</text></svg>`;
    case "serial":
      return `<svg ${base}>${defs}<rect width="320" height="180" rx="24" fill="#f8fafc"/>${node(28, 68, "Sender", "#eef2ff")}${node(224, 68, "Receiver", "#ecfdf5")}${arrow(96, 89, 224)}${[122,148,174,200].map((x, i) => `<circle cx="${x}" cy="89" r="9" fill="${i % 2 ? "#38bdf8" : "#22c55e"}"/><text x="${x}" y="93" text-anchor="middle" font-family="Arial" font-size="10" font-weight="800" fill="white">${i}</text>`).join("")}<text x="160" y="38" text-anchor="middle" font-family="Arial" font-size="14" font-weight="800" fill="#334155">One bit after another</text></svg>`;
    case "async":
      return `<svg ${base}><rect width="320" height="180" rx="24" fill="#f8fafc"/><text x="160" y="36" text-anchor="middle" font-family="Arial" font-size="16" font-weight="800" fill="#0f172a">Asynchronous character frame</text><g font-family="Arial" font-size="12" font-weight="800" text-anchor="middle">${["Start","Data","Stop"].map((label, i) => `<rect x="${50 + i * 75}" y="76" width="${i === 1 ? 90 : 58}" height="48" rx="12" fill="${i === 1 ? "#dbeafe" : "#fed7aa"}" stroke="${accent}" stroke-width="2"/><text x="${79 + i * 75 + (i === 1 ? 16 : 0)}" y="105" fill="#0f172a">${label}</text>`).join("")}</g></svg>`;
    case "sync":
      return `<svg ${base}><rect width="320" height="180" rx="24" fill="#f8fafc"/><text x="160" y="36" text-anchor="middle" font-family="Arial" font-size="16" font-weight="800" fill="#0f172a">Synchronous block</text><rect x="38" y="76" width="64" height="48" rx="10" fill="#bfdbfe"/><rect x="104" y="76" width="112" height="48" rx="10" fill="#bbf7d0"/><rect x="218" y="76" width="64" height="48" rx="10" fill="#fecaca"/><g font-family="Arial" font-size="12" font-weight="800" fill="#0f172a" text-anchor="middle"><text x="70" y="105">Header</text><text x="160" y="105">Data block</text><text x="250" y="105">Trailer</text></g></svg>`;
    case "simplex":
      return `<svg ${base}>${defs}<rect width="320" height="180" rx="24" fill="#f8fafc"/>${node(44, 70, "TV / KB", "#dbeafe")}${node(208, 70, "Viewer / PC", "#ecfdf5")}${arrow(112, 91, 208)}<text x="160" y="42" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#0f172a">One direction only</text></svg>`;
    case "halfDuplex":
      return `<svg ${base}>${defs}<rect width="320" height="180" rx="24" fill="#f8fafc"/>${node(44, 70, "A", "#ffedd5")}${node(208, 70, "B", "#ffedd5")}${arrow(112, 78, 208, "#f97316")}<path d="M208 106H112" stroke="#f97316" stroke-width="4" stroke-linecap="round" marker-end="url(#arrow)"/><text x="160" y="42" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#0f172a">Both ways, one at a time</text></svg>`;
    case "fullDuplex":
      return `<svg ${base}>${defs}<rect width="320" height="180" rx="24" fill="#f8fafc"/>${node(44, 70, "Phone A", "#dcfce7")}${node(208, 70, "Phone B", "#dcfce7")}${arrow(112, 78, 208, "#16a34a")}<path d="M208 106H112" stroke="#16a34a" stroke-width="4" stroke-linecap="round" marker-end="url(#arrow)"/><text x="160" y="42" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#0f172a">Both ways at once</text></svg>`;
    case "unicast":
    case "multicast":
    case "broadcast": {
      const targets = variant === "unicast" ? [0] : variant === "multicast" ? [0, 2] : [0, 1, 2, 3];
      return `<svg ${base}>${defs}<rect width="320" height="180" rx="24" fill="#f8fafc"/>${node(28, 68, "Sender", "#ecfeff")}${[42,78,114,150].map((y, i) => `<circle cx="252" cy="${y}" r="16" fill="${targets.includes(i) ? "#86efac" : "#e2e8f0"}" stroke="${targets.includes(i) ? "#16a34a" : "#94a3b8"}" stroke-width="2"/>${targets.includes(i) ? `<path d="M96 89Q160 ${y} 236 ${y}" fill="none" stroke="${accent}" stroke-width="3" marker-end="url(#arrow)"/>` : ""}`).join("")}<text x="160" y="30" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#0f172a">${variant}</text></svg>`;
    }
    case "twistedPair":
      return `<svg ${base}><rect width="320" height="180" rx="24" fill="#f8fafc"/><path d="M42 82C72 42 102 122 132 82S192 42 222 82 282 122 298 82" fill="none" stroke="#f97316" stroke-width="6" stroke-linecap="round"/><path d="M42 104C72 144 102 64 132 104s60 40 90 0 60-40 76 0" fill="none" stroke="#2563eb" stroke-width="6" stroke-linecap="round"/><text x="160" y="38" text-anchor="middle" font-family="Arial" font-size="16" font-weight="800" fill="#0f172a">Twisted pair reduces noise</text></svg>`;
    case "coaxial":
      return `<svg ${base}><rect width="320" height="180" rx="24" fill="#f8fafc"/><circle cx="160" cy="95" r="58" fill="#e2e8f0" stroke="#334155" stroke-width="4"/><circle cx="160" cy="95" r="42" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/><circle cx="160" cy="95" r="22" fill="#fed7aa" stroke="#ea580c" stroke-width="3"/><circle cx="160" cy="95" r="8" fill="#b45309"/><text x="160" y="35" text-anchor="middle" font-family="Arial" font-size="16" font-weight="800" fill="#0f172a">Co-axial layers</text></svg>`;
    case "fiber":
      return `<svg ${base}><rect width="320" height="180" rx="24" fill="#f8fafc"/><rect x="38" y="70" width="244" height="48" rx="24" fill="#e0f2fe" stroke="#0284c7" stroke-width="4"/><rect x="58" y="84" width="204" height="20" rx="10" fill="#fef9c3" stroke="#facc15" stroke-width="2"/><path d="M66 94 96 84 126 104 156 84 186 104 216 84 254 94" fill="none" stroke="#f97316" stroke-width="4"/><text x="160" y="38" text-anchor="middle" font-family="Arial" font-size="16" font-weight="800" fill="#0f172a">Light through core</text></svg>`;
    case "wireless":
      return `<svg ${base}><rect width="320" height="180" rx="24" fill="#f8fafc"/><circle cx="160" cy="104" r="18" fill="${accent}"/><path d="M120 88a56 56 0 0 1 80 0M94 66a94 94 0 0 1 132 0M68 44a132 132 0 0 1 184 0" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/><text x="160" y="148" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#0f172a">Unguided signal</text></svg>`;
    case "satellite":
      return `<svg ${base}>${defs}<rect width="320" height="180" rx="24" fill="#f8fafc"/><circle cx="160" cy="42" r="18" fill="#facc15"/><path d="M88 132Q160 56 232 132" fill="none" stroke="${accent}" stroke-width="4" stroke-dasharray="8 7"/><rect x="54" y="130" width="68" height="20" rx="8" fill="#cbd5e1"/><rect x="198" y="130" width="68" height="20" rx="8" fill="#cbd5e1"/><text x="160" y="168" text-anchor="middle" font-family="Arial" font-size="14" font-weight="800" fill="#0f172a">Earth station - satellite - station</text></svg>`;
    case "generation":
      return `<svg ${base}><rect width="320" height="180" rx="24" fill="#f8fafc"/><path d="M42 116h236" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/><g font-family="Arial" font-size="13" font-weight="900" text-anchor="middle">${["1G","2G","3G","4G","5G"].map((g, i) => `<circle cx="${62 + i * 49}" cy="116" r="20" fill="${i < 2 ? "#fed7aa" : i < 4 ? "#bae6fd" : "#bbf7d0"}" stroke="${accent}" stroke-width="2"/><text x="${62 + i * 49}" y="121" fill="#0f172a">${g}</text>`).join("")}</g><text x="160" y="54" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#0f172a">Voice to ultra-fast data</text></svg>`;
    case "networkTypes":
      return `<svg ${base}><rect width="320" height="180" rx="24" fill="#f8fafc"/><g font-family="Arial" font-size="13" font-weight="900" text-anchor="middle" fill="#0f172a">${["PAN","LAN","MAN","WAN"].map((g, i) => `<circle cx="${64 + i * 64}" cy="${112 - i * 18}" r="${22 + i * 4}" fill="none" stroke="${accent}" stroke-width="4"/><text x="${64 + i * 64}" y="${117 - i * 18}">${g}</text>`).join("")}</g><text x="160" y="38" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#0f172a">Coverage grows</text></svg>`;
    case "devices":
      return `<svg ${base}>${defs}<rect width="320" height="180" rx="24" fill="#f8fafc"/>${node(18, 70, "LAN", "#ecfeff")}${node(126, 70, "Router", "#fef3c7")}${node(234, 70, "WAN", "#dcfce7")}${arrow(86, 91, 126)}${arrow(194, 91, 234)}<text x="160" y="38" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#0f172a">Device joins networks</text></svg>`;
    case "topology":
      return `<svg ${base}><rect width="320" height="180" rx="24" fill="#f8fafc"/><circle cx="160" cy="92" r="20" fill="${accent}"/><g stroke="${accent}" stroke-width="4">${[30,90,150,210,270].map(a => { const rad = a * Math.PI / 180; const x = 160 + Math.cos(rad) * 78; const y = 92 + Math.sin(rad) * 50; return `<path d="M160 92L${x.toFixed(1)} ${y.toFixed(1)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12" fill="#fff"/>`; }).join("")}</g><text x="160" y="30" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#0f172a">Physical layout</text></svg>`;
    case "cloud":
      return `<svg ${base}>${defs}<rect width="320" height="180" rx="24" fill="#f8fafc"/><path d="M122 84a38 38 0 0 1 73-14 32 32 0 1 1 7 63h-92a28 28 0 0 1 12-49Z" fill="#dbeafe" stroke="${accent}" stroke-width="4"/><text x="160" y="108" text-anchor="middle" font-family="Arial" font-size="16" font-weight="900" fill="#0f172a">Cloud</text><text x="160" y="38" text-anchor="middle" font-family="Arial" font-size="15" font-weight="800" fill="#0f172a">On-demand resource</text></svg>`;
    default:
      return `<svg ${base}><rect width="320" height="180" rx="24" fill="#f8fafc"/><circle cx="160" cy="90" r="48" fill="#ccfbf1" stroke="${accent}" stroke-width="4"/><text x="160" y="96" text-anchor="middle" font-family="Arial" font-size="16" font-weight="900" fill="#0f172a">ICT</text></svg>`;
  }
};

const conceptVisualsByKey: Record<string, ConceptVisual[]> = {
  "topic-2-1": [
    { title: "Communication system", badge: "Flow", text: "Source, transmitter, medium, receiver and destination sit in one data path. Noise affects the medium, so decoding matters.", variant: "chain" },
    { title: "Bandwidth calculation", badge: "bps", text: "Board math clue: bandwidth means total transmitted bits divided by total time in seconds.", variant: "bandwidth", accent: "#0284c7" },
    { title: "Narrow, voice and broadband", badge: "Range", text: "45-300 bps, 1200-9600 bps and 1 Mbps+ are the must-remember speed bands.", variant: "range", accent: "#16a34a" },
  ],
  "topic-2-2": [
    { title: "Parallel transmission", badge: "Multi", text: "Multiple bits travel through multiple lines at the same time; fast for short distance, costly for long distance.", variant: "parallel", accent: "#2563eb" },
    { title: "Serial transmission", badge: "One", text: "Bits travel one after another through one line; reliable and common for longer distance.", variant: "serial", accent: "#0f766e" },
    { title: "Asynchronous frame", badge: "Start", text: "Character-by-character transfer uses start and stop bits to identify each character.", variant: "async", accent: "#f97316" },
    { title: "Synchronous block", badge: "Block", text: "Data goes as a block or packet with header, data and trailer; buffer is important.", variant: "sync", accent: "#7c3aed" },
  ],
  "topic-2-3": [
    { title: "Simplex", badge: "One way", text: "Only one direction: keyboard to computer, radio or TV broadcast. Sender does not receive through the same path.", variant: "simplex", accent: "#2563eb" },
    { title: "Half-duplex", badge: "Turn", text: "Both directions are possible but not at the same time. Walkie-talkie is the board-friendly clue.", variant: "halfDuplex", accent: "#f97316" },
    { title: "Full-duplex", badge: "Both", text: "Both sides send and receive at the same time. Mobile or telephone call is the key example.", variant: "fullDuplex", accent: "#16a34a" },
    { title: "Unicast", badge: "1:1", text: "One sender sends to exactly one receiver, such as browsing a web page.", variant: "unicast", accent: "#0f766e" },
    { title: "Multicast", badge: "1:Group", text: "One sender sends to a selected group, such as video conference or group message.", variant: "multicast", accent: "#7c3aed" },
    { title: "Broadcast", badge: "1:All", text: "One sender sends to all receivers, such as TV or radio broadcast.", variant: "broadcast", accent: "#0891b2" },
  ],
  "topic-2-4": [
    { title: "Twisted pair cable", badge: "RJ-45", text: "Paired copper wires are twisted to reduce noise, EMI and crosstalk. UTP is cheaper, STP has shielding.", variant: "twistedPair", accent: "#f97316" },
    { title: "Co-axial cable", badge: "BNC", text: "Central copper conductor, insulation, mesh shield and jacket share the same axis. Cable TV is the common clue.", variant: "coaxial", accent: "#0284c7" },
    { title: "Optical fiber", badge: "Light", text: "Core and cladding guide light through total internal reflection. High bandwidth and EMI-free.", variant: "fiber", accent: "#c026d3" },
  ],
  "topic-2-5": [
    { title: "Radio wave", badge: "RF", text: "Omnidirectional, can cover wide areas and is used in broadcast/mobile communication.", variant: "wireless", accent: "#0891b2" },
    { title: "Microwave link", badge: "LOS", text: "High frequency, mostly line-of-sight. Used in terrestrial towers and satellite links.", variant: "wireless", accent: "#7c3aed" },
    { title: "Satellite microwave", badge: "Orbit", text: "Earth station sends uplink and receives downlink through satellite, useful for long distance.", variant: "satellite", accent: "#ea580c" },
    { title: "Infrared and Bluetooth", badge: "Short", text: "Infrared needs short range and line-of-sight; Bluetooth handles short-range personal connections.", variant: "wireless", accent: "#16a34a" },
  ],
  "topic-2-6": [
    { title: "Wi-Fi", badge: "LAN", text: "Wireless LAN standard for internet access in home, school or office through an access point.", variant: "wireless", accent: "#0284c7" },
    { title: "Bluetooth", badge: "PAN", text: "Short-range, low-power device connection such as headset, keyboard or file transfer.", variant: "wireless", accent: "#2563eb" },
    { title: "WiMAX", badge: "MAN", text: "Broadband wireless access over a wider metropolitan area than Wi-Fi.", variant: "wireless", accent: "#7c3aed" },
    { title: "Hotspot", badge: "AP", text: "A Wi-Fi access point shares internet with nearby authenticated devices.", variant: "devices", accent: "#0f766e" },
  ],
  "topic-2-7": [
    { title: "Mobile generations", badge: "1G-5G", text: "1G voice, 2G digital voice/SMS, 3G data, 4G high-speed IP, 5G low latency and massive connectivity.", variant: "generation", accent: "#0f766e" },
    { title: "Cellular idea", badge: "Cell", text: "The coverage area is divided into cells; base stations manage users inside each cell.", variant: "wireless", accent: "#0284c7" },
    { title: "Handoff", badge: "Move", text: "When a user moves from one cell to another, connection transfers between base stations.", variant: "devices", accent: "#f97316" },
  ],
  "topic-2-8": [
    { title: "PAN to WAN", badge: "Area", text: "PAN is personal, LAN is local, MAN is city-wide and WAN covers country or global distance.", variant: "networkTypes", accent: "#0f766e" },
    { title: "LAN", badge: "Local", text: "Fast, privately owned and limited to room, building or campus.", variant: "devices", accent: "#0284c7" },
    { title: "WAN", badge: "Global", text: "Connects distant LAN/MAN networks through public or leased communication links.", variant: "chain", accent: "#7c3aed" },
  ],
  "topic-2-9": [
    { title: "NIC and Modem", badge: "Access", text: "NIC identifies a network device; modem converts digital and analog signals when needed.", variant: "devices", accent: "#0f766e" },
    { title: "Hub and Switch", badge: "LAN", text: "Hub broadcasts to all ports; switch uses MAC address to forward to the right port.", variant: "broadcast", accent: "#f97316" },
    { title: "Router and Gateway", badge: "Path", text: "Router selects paths between networks; gateway converts protocols between different networks.", variant: "devices", accent: "#2563eb" },
    { title: "Repeater and Bridge", badge: "Link", text: "Repeater regenerates weak signals; bridge divides or joins LAN segments.", variant: "chain", accent: "#7c3aed" },
  ],
  "topic-2-10": [
    { title: "Bus topology", badge: "Backbone", text: "All nodes share one backbone cable and terminators reduce signal reflection.", variant: "chain", accent: "#f97316" },
    { title: "Star topology", badge: "Center", text: "Every node connects to a central hub or switch; easy to manage but center failure matters.", variant: "topology", accent: "#0284c7" },
    { title: "Ring and Mesh", badge: "Path", text: "Ring passes data around a loop; mesh keeps multiple alternative links for reliability.", variant: "topology", accent: "#7c3aed" },
    { title: "Tree and Hybrid", badge: "Mix", text: "Tree is hierarchical; hybrid combines two or more topology patterns.", variant: "devices", accent: "#16a34a" },
  ],
  "topic-2-11": [
    { title: "Cloud computing", badge: "Cloud", text: "Server, storage, software and platform resources are used online on demand.", variant: "cloud", accent: "#0284c7" },
    { title: "Service models", badge: "SPI", text: "SaaS gives software, PaaS gives platform, IaaS gives infrastructure.", variant: "devices", accent: "#7c3aed" },
    { title: "Deployment models", badge: "Types", text: "Public, private, hybrid and community cloud differ by ownership, access and control.", variant: "networkTypes", accent: "#0f766e" },
    { title: "Pay as you go", badge: "Cost", text: "Users pay according to usage; startup cost decreases and scaling becomes easier.", variant: "bandwidth", accent: "#16a34a" },
  ],
};

const visualCard = (visual: ConceptVisual) => `
  <article class="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-md dark:border-slate-700 dark:bg-slate-900/80 md:grid-cols-[190px_1fr] md:items-center">
    <div class="overflow-hidden rounded-xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      ${conceptSvg(visual.variant, visual.accent)}
    </div>
    <div>
      <span class="mb-2 inline-flex rounded-lg bg-teal-100 px-2.5 py-1 text-xs font-black uppercase tracking-wide text-teal-700 dark:bg-teal-900/40 dark:text-teal-200">${visual.badge}</span>
      <h4 class="mb-2 text-lg font-black text-slate-900 dark:text-white">${visual.title}</h4>
      <p class="m-0 text-sm leading-7 text-slate-700 dark:text-slate-300">${visual.text}</p>
    </div>
  </article>`;

type InlineVisual = {
  heading: string;
  title: string;
  caption: string;
  variant: string;
};

const realStyleSvg = (variant: string, title: string) => {
  const device = (x: number, y: number, label: string, fill = "#e0f2fe") =>
    `<rect x="${x}" y="${y}" width="86" height="54" rx="12" fill="${fill}" stroke="#334155" stroke-width="3"/><rect x="${x + 28}" y="${y + 58}" width="30" height="8" rx="3" fill="#64748b"/><text x="${x + 43}" y="${y + 33}" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#0f172a">${label}</text>`;
  const label = `<rect x="20" y="18" width="300" height="40" rx="14" fill="rgba(15,23,42,.88)"/><text x="170" y="44" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="#fff">${title}</text>`;
  const base = (body: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 320" role="img" aria-label="${title}"><defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#f8fafc"/><stop offset="1" stop-color="#dbeafe"/></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0f172a" flood-opacity=".22"/></filter><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M1 1 9 5 1 9Z" fill="#0f766e"/></marker></defs><rect width="520" height="320" rx="34" fill="url(#bg)"/>${label}${body}</svg>`;
  const node = (cx: number, cy: number, text: string, fill = "#ffffff", stroke = "#334155") =>
    `<circle cx="${cx}" cy="${cy}" r="26" fill="${fill}" stroke="${stroke}" stroke-width="4" filter="url(#shadow)"/><text x="${cx}" y="${cy + 5}" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#0f172a">${text}</text>`;
  const box = (x: number, y: number, w: number, h: number, text: string, fill = "#ffffff", stroke = "#334155") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="3" filter="url(#shadow)"/><text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#0f172a">${text}</text>`;
  const path = (d: string, stroke = "#0f766e", width = 6, extra = "") =>
    `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;

  switch (variant) {
    case "communication":
      return base(`${box(30, 132, 74, 54, "Source", "#dcfce7")}<path d="M104 159h38" stroke="#0f766e" stroke-width="7" marker-end="url(#arrow)"/>${box(150, 132, 92, 54, "Transmitter", "#e0f2fe")}<path d="M242 159h35" stroke="#0f766e" stroke-width="7" marker-end="url(#arrow)"/>${box(285, 132, 76, 54, "Medium", "#fef3c7")}<path d="M361 159h35" stroke="#0f766e" stroke-width="7" marker-end="url(#arrow)"/>${box(404, 132, 86, 54, "Receiver", "#dbeafe")}<path d="M320 110v-38" stroke="#ef4444" stroke-width="5" stroke-dasharray="8 8"/><text x="320" y="96" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900" fill="#ef4444">Noise</text><text x="260" y="238" text-anchor="middle" font-family="Arial" font-size="16" font-weight="900" fill="#334155">Source -> Transmitter -> Medium -> Receiver -> Destination</text>`);
    case "band-narrow":
      return base(`${box(82, 142, 104, 58, "Telegraph", "#fed7aa", "#f97316")}<rect x="228" y="151" width="96" height="24" rx="12" fill="#fdba74" stroke="#9a3412" stroke-width="3"/><path d="M196 164h32" stroke="#f97316" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="104" text-anchor="middle" font-family="Arial" font-size="20" font-weight="900" fill="#9a3412">45-300 bps</text><text x="260" y="238" text-anchor="middle" font-family="Arial" font-size="16" font-weight="900" fill="#334155">Very slow data transfer</text>`);
    case "band-voice":
      return base(`${device(82, 132, "Phone", "#dbeafe")}<rect x="222" y="138" width="132" height="46" rx="23" fill="#7dd3fc" stroke="#075985" stroke-width="3"/><path d="M176 159h42" stroke="#0284c7" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="104" text-anchor="middle" font-family="Arial" font-size="20" font-weight="900" fill="#075985">1200-9600 bps</text><text x="260" y="238" text-anchor="middle" font-family="Arial" font-size="16" font-weight="900" fill="#334155">Telephone, printer or card reader speed range</text>`);
    case "band-broadband":
      return base(`${box(68, 136, 94, 62, "Fiber", "#dcfce7", "#16a34a")}<rect x="210" y="130" width="188" height="62" rx="31" fill="#86efac" stroke="#166534" stroke-width="4"/><path d="M172 160h34" stroke="#16a34a" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="104" text-anchor="middle" font-family="Arial" font-size="20" font-weight="900" fill="#166534">1 Mbps or more</text><text x="260" y="238" text-anchor="middle" font-family="Arial" font-size="16" font-weight="900" fill="#334155">High-speed data, video and internet</text>`);
    case "bandwidth":
      return base(`<rect x="72" y="212" width="72" height="46" rx="12" fill="#fed7aa" filter="url(#shadow)"/><rect x="190" y="174" width="72" height="84" rx="12" fill="#7dd3fc" filter="url(#shadow)"/><rect x="308" y="112" width="92" height="146" rx="12" fill="#86efac" filter="url(#shadow)"/><text x="108" y="282" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900" fill="#7c2d12">Narrow</text><text x="226" y="282" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900" fill="#075985">Voice</text><text x="354" y="282" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900" fill="#166534">Broadband</text><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="20" font-weight="900" fill="#0f172a">Bandwidth = bits / second</text>`);
    case "parallel":
      return base(`${device(60, 132, "Sender", "#eef2ff")}${device(374, 132, "Receiver", "#ecfdf5")}${[124,148,172,196].map(y => `<path d="M148 ${y}h226" stroke="#2563eb" stroke-width="6" marker-end="url(#arrow)"/>`).join("")}<text x="260" y="95" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">Many wires, many bits at once</text>`);
    case "serial":
      return base(`${device(60, 132, "Sender", "#eef2ff")}${device(374, 132, "Receiver", "#ecfdf5")}<path d="M148 160h226" stroke="#0f766e" stroke-width="7" marker-end="url(#arrow)"/>${[0,1,0,1,1].map((bit, i) => `<circle cx="${185 + i * 38}" cy="160" r="14" fill="${bit ? "#22c55e" : "#38bdf8"}"/><text x="${185 + i * 38}" y="165" text-anchor="middle" font-family="Arial" font-size="13" font-weight="900" fill="#fff">${bit}</text>`).join("")}<text x="260" y="95" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#134e4a">One wire, bits one by one</text>`);
    case "async":
      return base(`<text x="260" y="94" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#9a3412">Character frame with Start and Stop bit</text><rect x="80" y="142" width="86" height="70" rx="14" fill="#fed7aa" filter="url(#shadow)"/><rect x="178" y="142" width="154" height="70" rx="14" fill="#dbeafe" filter="url(#shadow)"/><rect x="344" y="142" width="86" height="70" rx="14" fill="#fed7aa" filter="url(#shadow)"/><text x="123" y="183" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900">Start</text><text x="255" y="183" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900">Data bits</text><text x="387" y="183" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900">Stop</text>`);
    case "sync":
      return base(`<text x="260" y="94" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#166534">Block / packet transfer</text><rect x="74" y="142" width="100" height="70" rx="14" fill="#bfdbfe" filter="url(#shadow)"/><rect x="184" y="142" width="152" height="70" rx="14" fill="#bbf7d0" filter="url(#shadow)"/><rect x="346" y="142" width="100" height="70" rx="14" fill="#fecaca" filter="url(#shadow)"/><text x="124" y="183" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900">Header</text><text x="260" y="183" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900">Data block</text><text x="396" y="183" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900">Trailer</text>`);
    case "bit-sync":
      return base(`${device(66, 132, "Sender", "#eef2ff")}${device(368, 132, "Receiver", "#ecfdf5")}<path d="M156 160h204" stroke="#0f766e" stroke-width="7" marker-end="url(#arrow)"/><path d="M174 118h120M174 118v-18M214 118v-18M254 118v-18M294 118v-18" stroke="#2563eb" stroke-width="5"/><path d="M224 214h120M224 214v-18M264 214v-18M304 214v-18M344 214v-18" stroke="#2563eb" stroke-width="5"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">Sender and receiver clocks match</text>`);
    case "iso":
      return base(`<rect x="76" y="124" width="160" height="96" rx="20" fill="#111827" filter="url(#shadow)"/><circle cx="156" cy="172" r="32" fill="#22d3ee"/><polygon points="146,154 146,190 182,172" fill="#fff"/><rect x="286" y="124" width="96" height="96" rx="22" fill="#10b981" filter="url(#shadow)"/><path d="M318 160v44M350 146v58" stroke="#fff" stroke-width="12" stroke-linecap="round"/><text x="260" y="258" text-anchor="middle" font-family="Arial" font-size="17" font-weight="900" fill="#0f172a">Real-time audio/video, very low delay</text>`);
    case "simplex":
      return base(`${device(58, 132, "TV", "#dbeafe")}<path d="M154 160h190" stroke="#2563eb" stroke-width="8" marker-end="url(#arrow)"/>${device(356, 132, "Viewer", "#ecfdf5")}<text x="260" y="94" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">One-way data flow</text>`);
    case "half":
      return base(`${device(58, 132, "Walkie A", "#ffedd5")}${device(356, 132, "Walkie B", "#ffedd5")}<path d="M154 144h190" stroke="#f97316" stroke-width="7" marker-end="url(#arrow)"/><path d="M356 184H166" stroke="#f97316" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="94" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#9a3412">Both ways, one at a time</text>`);
    case "full":
      return base(`${device(58, 132, "Phone A", "#dcfce7")}${device(356, 132, "Phone B", "#dcfce7")}<path d="M154 144h190" stroke="#16a34a" stroke-width="7" marker-end="url(#arrow)"/><path d="M356 184H166" stroke="#16a34a" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="94" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#166534">Both ways at the same time</text>`);
    case "unicast":
      return base(`${node(116, 160, "S", "#ecfeff", "#0f766e")}${node(388, 160, "R1", "#bbf7d0", "#16a34a")}${node(388, 102, "R2", "#e2e8f0", "#94a3b8")}${node(388, 218, "R3", "#e2e8f0", "#94a3b8")}<path d="M144 160h214" stroke="#0f766e" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#134e4a">One sender -> one receiver</text>`);
    case "multicast":
      return base(`${node(112, 160, "S", "#ecfeff", "#0f766e")}${node(386, 96, "G1", "#ddd6fe", "#7c3aed")}${node(386, 160, "G2", "#ddd6fe", "#7c3aed")}${node(386, 224, "N", "#e2e8f0", "#94a3b8")}<path d="M140 160Q238 92 358 96" stroke="#7c3aed" stroke-width="6" marker-end="url(#arrow)"/><path d="M140 160h218" stroke="#7c3aed" stroke-width="6" marker-end="url(#arrow)"/><text x="260" y="72" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#4c1d95">One sender -> selected group</text>`);
    case "broadcast":
      return base(`${node(112, 160, "S", "#ecfeff", "#0f766e")}${[86,136,186,236].map((y, i) => `${node(386, y, `R${i + 1}`, "#cffafe", "#0891b2")}<path d="M140 160Q250 ${y} 358 ${y}" stroke="#0891b2" stroke-width="5" marker-end="url(#arrow)"/>`).join("")}<text x="260" y="72" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#155e75">One sender -> all receivers</text>`);
    case "twisted":
      return base(`<path d="M64 150C118 72 172 230 226 150S334 72 456 150" fill="none" stroke="#f97316" stroke-width="15" stroke-linecap="round" filter="url(#shadow)"/><path d="M64 190C118 268 172 110 226 190s108 78 230 0" fill="none" stroke="#2563eb" stroke-width="15" stroke-linecap="round" filter="url(#shadow)"/><text x="260" y="105" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#0f172a">Twisted copper pairs reduce EMI/crosstalk</text>`);
    case "coax":
      return base(`<circle cx="260" cy="174" r="94" fill="#111827" filter="url(#shadow)"/><circle cx="260" cy="174" r="74" fill="#e2e8f0"/><circle cx="260" cy="174" r="52" fill="#fef3c7"/><circle cx="260" cy="174" r="25" fill="#f97316"/><circle cx="260" cy="174" r="9" fill="#7c2d12"/><text x="112" y="132" font-family="Arial" font-size="14" font-weight="900" fill="#334155">Outer jacket</text><text x="352" y="212" font-family="Arial" font-size="14" font-weight="900" fill="#334155">Copper core</text>`);
    case "fiber":
      return base(`<rect x="60" y="136" width="400" height="82" rx="41" fill="#0f172a" filter="url(#shadow)"/><rect x="86" y="154" width="348" height="46" rx="23" fill="#bae6fd"/><rect x="112" y="166" width="296" height="22" rx="11" fill="#fef08a"/><path d="M120 177 170 160 220 194 270 160 320 194 390 177" fill="none" stroke="#f97316" stroke-width="7"/><text x="260" y="105" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#0f172a">Light signal through core and cladding</text>`);
    case "radio":
      return base(`<rect x="104" y="150" width="34" height="92" rx="8" fill="#64748b"/><path d="M121 150 86 242M121 150l35 92" stroke="#475569" stroke-width="7" stroke-linecap="round"/><path d="M70 120a72 72 0 0 1 102 0M50 94a104 104 0 0 1 142 0" fill="none" stroke="#0891b2" stroke-width="7" stroke-linecap="round"/><rect x="330" y="166" width="42" height="76" rx="8" fill="#64748b"/><path d="M351 166l86-56" stroke="#7c3aed" stroke-width="12" stroke-linecap="round"/><path d="M416 94l42-20M424 116l48 4M404 74l20-42" stroke="#7c3aed" stroke-width="6" stroke-linecap="round"/><text x="120" y="278" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900">Omnidirectional</text><text x="370" y="278" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900">Directional</text>`);
    case "antenna":
      return base(`<rect x="104" y="150" width="34" height="92" rx="8" fill="#64748b"/><path d="M121 150 86 242M121 150l35 92" stroke="#475569" stroke-width="7" stroke-linecap="round"/><path d="M70 120a72 72 0 0 1 102 0M50 94a104 104 0 0 1 142 0" fill="none" stroke="#0891b2" stroke-width="7" stroke-linecap="round"/><rect x="330" y="166" width="42" height="76" rx="8" fill="#64748b"/><path d="M351 166l86-56" stroke="#7c3aed" stroke-width="12" stroke-linecap="round"/><path d="M416 94l42-20M424 116l48 4M404 74l20-42" stroke="#7c3aed" stroke-width="6" stroke-linecap="round"/><text x="120" y="278" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900">Omnidirectional</text><text x="370" y="278" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900">Directional</text>`);
    case "radio-wave":
      return base(`<rect x="84" y="146" width="48" height="118" rx="10" fill="#64748b" filter="url(#shadow)"/><path d="M108 146 72 264M108 146l36 118" stroke="#475569" stroke-width="7" stroke-linecap="round"/><rect x="306" y="122" width="38" height="132" fill="#cbd5e1"/><rect x="344" y="122" width="44" height="132" fill="#e2e8f0"/><path d="M150 154C218 98 286 100 354 154" stroke="#0891b2" stroke-width="7" fill="none" marker-end="url(#arrow)"/><path d="M150 190C218 240 286 238 354 190" stroke="#0891b2" stroke-width="7" fill="none" marker-end="url(#arrow)"/><text x="260" y="94" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#155e75">Radio waves spread in all directions</text>`);
    case "microwave":
      return base(`<rect x="94" y="176" width="44" height="84" fill="#64748b"/><circle cx="116" cy="152" r="34" fill="#e2e8f0" stroke="#475569" stroke-width="7"/><rect x="382" y="176" width="44" height="84" fill="#64748b"/><circle cx="404" cy="152" r="34" fill="#e2e8f0" stroke="#475569" stroke-width="7"/><path d="M152 152h216" stroke="#7c3aed" stroke-width="8" stroke-dasharray="14 12" marker-end="url(#arrow)"/><text x="260" y="100" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#4c1d95">Line-of-sight tower link</text>`);
    case "satellite":
      return base(`<circle cx="260" cy="93" r="28" fill="#facc15" filter="url(#shadow)"/><rect x="236" y="74" width="48" height="38" rx="8" fill="#94a3b8"/><path d="M116 238Q260 112 404 238" stroke="#ea580c" stroke-width="8" fill="none" stroke-dasharray="12 12"/><path d="M82 234h92l-46 34Z" fill="#cbd5e1" stroke="#475569" stroke-width="5"/><path d="M346 234h92l-46 34Z" fill="#cbd5e1" stroke="#475569" stroke-width="5"/><text x="260" y="294" text-anchor="middle" font-family="Arial" font-size="16" font-weight="900" fill="#0f172a">Uplink and downlink through satellite</text>`);
    case "infrared":
      return base(`<rect x="96" y="130" width="92" height="154" rx="30" fill="#111827" filter="url(#shadow)"/><circle cx="142" cy="164" r="15" fill="#ef4444"/><rect x="332" y="128" width="98" height="70" rx="12" fill="#334155" filter="url(#shadow)"/><rect x="348" y="144" width="66" height="34" rx="8" fill="#93c5fd"/><path d="M190 164h130" stroke="#ef4444" stroke-width="8" stroke-dasharray="10 12" marker-end="url(#arrow)"/><text x="260" y="104" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#991b1b">Short range line-of-sight</text>`);
    case "wifi":
      return base(`<rect x="184" y="184" width="152" height="60" rx="18" fill="#0f172a" filter="url(#shadow)"/><circle cx="216" cy="214" r="7" fill="#22c55e"/><path d="M260 184v-52M226 130a52 52 0 0 1 68 0M202 104a88 88 0 0 1 116 0" fill="none" stroke="#0284c7" stroke-width="9" stroke-linecap="round"/><text x="260" y="280" text-anchor="middle" font-family="Arial" font-size="16" font-weight="900" fill="#0f172a">Wi-Fi router / access point</text>`);
    case "hotspot":
      return base(`<rect x="214" y="156" width="92" height="62" rx="18" fill="#0f172a" filter="url(#shadow)"/><circle cx="238" cy="187" r="7" fill="#22c55e"/><path d="M260 156v-50M228 110a52 52 0 0 1 64 0M200 86a92 92 0 0 1 120 0" fill="none" stroke="#0284c7" stroke-width="8" stroke-linecap="round"/>${device(72, 198, "Phone", "#dbeafe")}${device(362, 198, "Laptop", "#dcfce7")}<text x="260" y="268" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900" fill="#0f172a">Hotspot shares internet nearby</text>`);
    case "bluetooth":
      return base(`${device(76, 148, "Phone", "#dbeafe")}${device(330, 148, "Headset", "#e0e7ff")}<path d="M180 170h140" stroke="#2563eb" stroke-width="8" stroke-dasharray="12 10" marker-end="url(#arrow)"/><text x="260" y="104" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">Short-range PAN connection</text>`);
    case "piconet":
      return base(`${node(260, 160, "M", "#bfdbfe", "#2563eb")}${[110,180,340,410].map((x, i) => `${node(x, i % 2 ? 224 : 96, `S${i + 1}`, "#e0e7ff", "#7c3aed")}<path d="M260 160L${x} ${i % 2 ? 224 : 96}" stroke="#7c3aed" stroke-width="5" stroke-dasharray="9 8"/>`).join("")}<text x="260" y="72" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">Bluetooth piconet: one master, slaves</text>`);
    case "wimax":
      return base(`<rect x="230" y="132" width="60" height="134" rx="12" fill="#475569" filter="url(#shadow)"/><path d="M260 132 198 266M260 132l62 134" stroke="#475569" stroke-width="8"/><path d="M154 96a150 150 0 0 1 212 0M114 66a210 210 0 0 1 292 0" fill="none" stroke="#0f766e" stroke-width="9" stroke-linecap="round"/><text x="260" y="292" text-anchor="middle" font-family="Arial" font-size="16" font-weight="900" fill="#0f172a">City-wide wireless broadband</text>`);
    case "generations":
      return base(`${["1G","2G","3G","4G","5G"].map((g, i) => `<rect x="${56 + i * 82}" y="${192 - i * 18}" width="58" height="${62 + i * 18}" rx="14" fill="${i < 2 ? "#fed7aa" : i < 4 ? "#bae6fd" : "#bbf7d0"}" stroke="#334155" stroke-width="3"/><text x="${85 + i * 82}" y="${226 - i * 18}" text-anchor="middle" font-family="Arial" font-size="17" font-weight="900" fill="#0f172a">${g}</text>`).join("")}<text x="260" y="105" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#0f172a">Voice to ultra-fast mobile data</text>`);
    case "gsm":
      return base(`${box(80, 136, 92, 64, "SIM", "#fecdd3", "#e11d48")}${box(220, 124, 92, 88, "GSM", "#ffe4e6", "#be123c")}${box(360, 136, 92, 64, "Cell", "#fecdd3", "#e11d48")}<path d="M172 160h44M312 160h44" stroke="#be123c" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#9f1239">2G digital cellular, SIM based</text><text x="260" y="250" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900" fill="#334155">Uses TDMA + FDMA channel access</text>`);
    case "cdma":
      return base(`${box(62, 136, 86, 64, "User A", "#e0e7ff", "#4f46e5")}${box(216, 118, 88, 100, "Same band", "#ede9fe", "#7c3aed")}${box(372, 136, 86, 64, "User B", "#e0e7ff", "#4f46e5")}<path d="M148 150h68M304 150h68" stroke="#7c3aed" stroke-width="6" marker-end="url(#arrow)"/><path d="M148 186h68M304 186h68" stroke="#7c3aed" stroke-width="6" stroke-dasharray="9 8" marker-end="url(#arrow)"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#4c1d95">Code Division Multiple Access</text><text x="260" y="250" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900" fill="#334155">Different codes share the same frequency band</text>`);
    case "generation-1g":
      return base(`${device(92, 132, "Analog", "#f1f5f9")}<path d="M190 160c30-40 58 40 88 0s58-40 88 0" stroke="#64748b" stroke-width="7" fill="none"/>${device(366, 132, "Voice", "#f1f5f9")}<text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#334155">1G: analog voice only</text><text x="260" y="238" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900" fill="#334155">No SMS, no packet data; call drop was common</text>`);
    case "generation-2g":
      return base(`${device(82, 132, "Phone", "#cffafe")}${box(224, 124, 82, 72, "SMS", "#bae6fd", "#0284c7")}${box(350, 124, 82, 72, "GSM/CDMA", "#bae6fd", "#0284c7")}<path d="M176 160h44M306 160h40" stroke="#0284c7" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#075985">2G: digital voice, SMS and MMS</text>`);
    case "generation-3g":
      return base(`${device(78, 132, "Phone", "#dbeafe")}${box(216, 124, 88, 72, "Packet data", "#bfdbfe", "#2563eb")}${box(350, 124, 90, 72, "Video call", "#bfdbfe", "#2563eb")}<path d="M172 160h40M304 160h42" stroke="#2563eb" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">3G: internet and video calling</text>`);
    case "generation-4g":
      return base(`${box(72, 134, 84, 68, "LTE", "#ede9fe", "#7c3aed")}${box(218, 118, 84, 100, "All-IP", "#ddd6fe", "#7c3aed")}${box(362, 134, 84, 68, "Video", "#ede9fe", "#7c3aed")}<path d="M156 160h58M302 160h56" stroke="#7c3aed" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#4c1d95">4G: LTE and high-speed IP network</text>`);
    case "area":
      return base(`<circle cx="144" cy="192" r="38" fill="none" stroke="#f97316" stroke-width="8"/><circle cx="216" cy="192" r="58" fill="none" stroke="#0284c7" stroke-width="8"/><circle cx="302" cy="192" r="78" fill="none" stroke="#16a34a" stroke-width="8"/><circle cx="260" cy="192" r="108" fill="none" stroke="#7c3aed" stroke-width="8"/><text x="144" y="198" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900">PAN</text><text x="216" y="198" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900">LAN</text><text x="302" y="198" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900">MAN</text><text x="260" y="292" text-anchor="middle" font-family="Arial" font-size="16" font-weight="900">Coverage area comparison</text>`);
    case "area-pan":
      return base(`${node(260, 160, "User", "#f1f5f9", "#64748b")}${node(198, 112, "Phone", "#fed7aa", "#f97316")}${node(326, 112, "Watch", "#fed7aa", "#f97316")}${node(260, 236, "Mouse", "#fed7aa", "#f97316")}<circle cx="260" cy="160" r="118" fill="none" stroke="#f97316" stroke-width="6" stroke-dasharray="12 10"/><text x="260" y="82" text-anchor="middle" font-family="Arial" font-size="17" font-weight="900" fill="#9a3412">PAN: around one person, about 10 m</text>`);
    case "area-lan":
      return base(`${box(90, 128, 120, 90, "Building", "#cffafe", "#0891b2")}${node(110, 164, "PC1", "#fff", "#0891b2")}${node(190, 164, "PC2", "#fff", "#0891b2")}${box(300, 142, 110, 58, "Switch", "#e0f2fe", "#0891b2")}<path d="M216 164h80" stroke="#0891b2" stroke-width="6" marker-end="url(#arrow)"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="17" font-weight="900" fill="#155e75">LAN: room, lab, office or building</text>`);
    case "area-can":
      return base(`${box(70, 150, 86, 76, "Block A", "#ccfbf1", "#0f766e")}${box(218, 116, 86, 76, "Library", "#ccfbf1", "#0f766e")}${box(366, 150, 86, 76, "Hall", "#ccfbf1", "#0f766e")}<path d="M156 180h62M304 150l62 30" stroke="#0f766e" stroke-width="6" marker-end="url(#arrow)"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="17" font-weight="900" fill="#134e4a">CAN: campus buildings connected</text>`);
    case "area-man":
      return base(`${box(72, 146, 78, 70, "Bank A", "#dbeafe", "#2563eb")}${box(220, 116, 78, 70, "ISP", "#dbeafe", "#2563eb")}${box(370, 146, 78, 70, "Bank B", "#dbeafe", "#2563eb")}<path d="M150 168Q220 96 298 146M298 146Q352 182 370 168" stroke="#2563eb" stroke-width="6" marker-end="url(#arrow)"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="17" font-weight="900" fill="#1e3a8a">MAN: city or metropolitan network</text>`);
    case "area-wan":
      return base(`<circle cx="260" cy="168" r="86" fill="#bfdbfe" stroke="#2563eb" stroke-width="5" filter="url(#shadow)"/><path d="M174 168h172M260 82v172M194 112c38 26 94 26 132 0M194 224c38-26 94-26 132 0" stroke="#1e40af" stroke-width="4" fill="none"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="17" font-weight="900" fill="#1e3a8a">WAN: country, continent or worldwide</text><text x="260" y="274" text-anchor="middle" font-family="Arial" font-size="15" font-weight="900" fill="#334155">Internet is the largest WAN example</text>`);
    case "devices":
      return base(`${device(58, 132, "LAN", "#ecfdf5")}${device(218, 132, "Device", "#fef3c7")}${device(378, 132, "WAN", "#dbeafe")}<path d="M144 160h74M304 160h74" stroke="#0f766e" stroke-width="8" marker-end="url(#arrow)"/><text x="260" y="96" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#0f172a">Network device connects traffic</text>`);
    case "device-modem":
      return base(`${box(58, 132, 88, 62, "Digital", "#dbeafe", "#2563eb")}${box(216, 122, 88, 82, "Modem", "#fef3c7", "#f59e0b")}${box(374, 132, 88, 62, "Analog", "#fed7aa", "#f97316")}<path d="M146 160h66M304 160h66" stroke="#0f766e" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#92400e">Modulator + Demodulator</text>`);
    case "device-nic":
      return base(`${device(90, 130, "PC", "#dbeafe")}${box(252, 122, 96, 76, "NIC", "#dcfce7", "#16a34a")}<path d="M176 160h72" stroke="#16a34a" stroke-width="7" marker-end="url(#arrow)"/><rect x="366" y="142" width="62" height="40" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="3"/><text x="397" y="168" text-anchor="middle" font-family="Arial" font-size="12" font-weight="900">RJ-45</text><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#166534">NIC gives network interface + MAC address</text>`);
    case "device-hub":
      return base(`${node(260, 162, "Hub", "#bfdbfe", "#2563eb")}${node(112, 98, "A", "#fee2e2", "#dc2626")}${[102,162,222].map((y, i) => `${node(408, y, `P${i + 1}`, "#dbeafe", "#2563eb")}<path d="M286 162Q340 ${y} 382 ${y}" stroke="#2563eb" stroke-width="5" marker-end="url(#arrow)"/>`).join("")}<path d="M138 98Q190 130 236 156" stroke="#dc2626" stroke-width="6" marker-end="url(#arrow)"/><text x="260" y="76" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">Hub broadcasts to every port</text>`);
    case "device-switch":
      return base(`${node(260, 162, "Switch", "#c7d2fe", "#4f46e5")}${node(112, 98, "A", "#fee2e2", "#dc2626")}${[102,162,222].map((y, i) => `${node(408, y, `P${i + 1}`, i === 1 ? "#bbf7d0" : "#e2e8f0", i === 1 ? "#16a34a" : "#94a3b8")} ${i === 1 ? `<path d="M286 162h96" stroke="#16a34a" stroke-width="6" marker-end="url(#arrow)"/>` : ""}`).join("")}<path d="M138 98Q190 130 236 156" stroke="#dc2626" stroke-width="6" marker-end="url(#arrow)"/><text x="260" y="76" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#3730a3">Switch sends to selected MAC port</text>`);
    case "device-router":
      return base(`${box(64, 132, 96, 64, "LAN A", "#dcfce7", "#16a34a")}${node(260, 164, "Router", "#fef3c7", "#f59e0b")}${box(358, 102, 96, 58, "LAN B", "#dbeafe", "#2563eb")}${box(358, 196, 96, 58, "Internet", "#dbeafe", "#2563eb")}<path d="M160 164h72M288 154l66-28M288 174l66 44" stroke="#0f766e" stroke-width="6" marker-end="url(#arrow)"/><text x="260" y="78" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#92400e">Router chooses path between networks</text>`);
    case "device-gateway":
      return base(`${box(58, 132, 116, 64, "Protocol A", "#e0f2fe", "#0891b2")}${box(214, 118, 92, 92, "Gateway", "#fef3c7", "#f59e0b")}${box(346, 132, 116, 64, "Protocol B", "#ede9fe", "#7c3aed")}<path d="M174 164h36M306 164h36" stroke="#0f766e" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="86" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#92400e">Gateway converts protocols</text>`);
    case "device-repeater":
      return base(`<path d="M64 168c46-38 76 38 122 0" stroke="#94a3b8" stroke-width="5" fill="none"/><rect x="218" y="128" width="84" height="78" rx="16" fill="#cffafe" stroke="#0891b2" stroke-width="4" filter="url(#shadow)"/><text x="260" y="172" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900">Repeater</text><path d="M318 168c52-58 96 58 148 0" stroke="#0891b2" stroke-width="8" fill="none"/><text x="260" y="86" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#155e75">Weak signal is regenerated</text>`);
    case "device-bridge":
      return base(`${box(62, 132, 112, 64, "LAN segment A", "#ccfbf1", "#0f766e")}${box(218, 122, 84, 84, "Bridge", "#fef3c7", "#f59e0b")}${box(346, 132, 112, 64, "LAN segment B", "#ccfbf1", "#0f766e")}<path d="M174 164h40M302 164h40" stroke="#0f766e" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="86" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#134e4a">Bridge joins LAN segments</text>`);
    case "topology":
      return base(`<circle cx="260" cy="170" r="28" fill="#0f766e" filter="url(#shadow)"/><g stroke="#0f766e" stroke-width="7">${[20,80,140,200,260,320].map(a => { const r = a * Math.PI / 180; const x = 260 + Math.cos(r) * 130; const y = 170 + Math.sin(r) * 76; return `<path d="M260 170L${x.toFixed(1)} ${y.toFixed(1)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="22" fill="#fff" filter="url(#shadow)"/>`; }).join("")}</g><text x="260" y="94" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#0f172a">Network layout / topology</text>`);
    case "topology-bus":
      return base(`<path d="M76 170h368" stroke="#0f766e" stroke-width="10" stroke-linecap="round"/><text x="76" y="150" text-anchor="middle" font-family="Arial" font-size="13" font-weight="900">T</text><text x="444" y="150" text-anchor="middle" font-family="Arial" font-size="13" font-weight="900">T</text>${[130,205,280,355].map((x, i) => `<path d="M${x} 170v42" stroke="#0f766e" stroke-width="5"/><circle cx="${x}" cy="226" r="20" fill="#fff" stroke="#0f766e" stroke-width="4"/><text x="${x}" y="231" text-anchor="middle" font-family="Arial" font-size="12" font-weight="900">N${i + 1}</text>`).join("")}<text x="260" y="94" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#134e4a">Single backbone cable</text>`);
    case "topology-ring":
      return base(`${[0,1,2,3,4,5].map(i => { const a = (Math.PI * 2 * i) / 6 - Math.PI / 2; const x = 260 + Math.cos(a) * 120; const y = 170 + Math.sin(a) * 72; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="22" fill="#fff" stroke="#f59e0b" stroke-width="4"/><text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="middle" font-family="Arial" font-size="12" font-weight="900">N${i + 1}</text>`; }).join("")}<ellipse cx="260" cy="170" rx="120" ry="72" fill="none" stroke="#f59e0b" stroke-width="8"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#92400e">Closed loop connection</text>`);
    case "topology-star":
      return base(`${node(260, 170, "Switch", "#bbf7d0", "#16a34a")}${[35,95,155,215,275,335].map((a, i) => { const r = a * Math.PI / 180; const x = 260 + Math.cos(r) * 132; const y = 170 + Math.sin(r) * 78; return `<path d="M260 170L${x.toFixed(1)} ${y.toFixed(1)}" stroke="#16a34a" stroke-width="6"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="20" fill="#fff" stroke="#16a34a" stroke-width="4"/><text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="middle" font-family="Arial" font-size="12" font-weight="900">N${i + 1}</text>`; }).join("")}<text x="260" y="88" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#166534">All nodes connect to central device</text>`);
    case "topology-tree":
      return base(`${node(260, 96, "Root", "#ccfbf1", "#0f766e")}${node(170, 168, "S1", "#ccfbf1", "#0f766e")}${node(350, 168, "S2", "#ccfbf1", "#0f766e")}${[110,230,310,430].map((x, i) => node(x, 238, `N${i + 1}`, "#fff", "#0f766e")).join("")}<path d="M260 122L170 142M260 122l90 20M170 194l-60 18M170 194l60 18M350 194l-40 18M350 194l80 18" stroke="#0f766e" stroke-width="6" fill="none"/><text x="260" y="70" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#134e4a">Hierarchical star arrangement</text>`);
    case "topology-mesh":
      return base(`${[[128,118],[260,92],[392,118],[176,230],[344,230]].map(([x,y], i) => `<circle cx="${x}" cy="${y}" r="22" fill="#fff" stroke="#7c3aed" stroke-width="4"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-family="Arial" font-size="12" font-weight="900">N${i + 1}</text>`).join("")}<path d="M128 118L260 92 392 118 344 230 176 230 128 118M128 118l216 112M392 118L176 230M260 92L176 230M260 92l84 138" stroke="#7c3aed" stroke-width="5" fill="none"/><text x="260" y="68" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#4c1d95">Multiple redundant links</text>`);
    case "topology-hybrid":
      return base(`${node(170, 154, "S", "#bbf7d0", "#16a34a")}${[90,170,250].map((x, i) => `${node(x, 232, `N${i + 1}`, "#fff", "#16a34a")}<path d="M170 154L${x} 232" stroke="#16a34a" stroke-width="5"/>`).join("")}<path d="M286 154h150" stroke="#0f766e" stroke-width="9" stroke-linecap="round"/><path d="M286 154h-90" stroke="#0f766e" stroke-width="6"/><path d="M330 154v64M390 154v64" stroke="#0f766e" stroke-width="5"/><circle cx="330" cy="232" r="20" fill="#fff" stroke="#0f766e" stroke-width="4"/><circle cx="390" cy="232" r="20" fill="#fff" stroke="#0f766e" stroke-width="4"/><text x="260" y="86" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#134e4a">Combination of star and bus</text>`);
    case "cloud":
      return base(`<path d="M180 170a64 64 0 0 1 124-24 54 54 0 1 1 18 106H164a46 46 0 0 1 16-82Z" fill="#bfdbfe" stroke="#2563eb" stroke-width="8" filter="url(#shadow)"/><text x="260" y="212" text-anchor="middle" font-family="Arial" font-size="26" font-weight="900" fill="#1e3a8a">Cloud</text><text x="260" y="98" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#0f172a">Online resource service</text>`);
    case "cloud-ondemand":
      return base(`<path d="M180 166a58 58 0 0 1 112-22 48 48 0 1 1 16 96H164a42 42 0 0 1 16-74Z" fill="#bfdbfe" stroke="#2563eb" stroke-width="7" filter="url(#shadow)"/><text x="260" y="196" text-anchor="middle" font-family="Arial" font-size="22" font-weight="900" fill="#1e3a8a">Cloud</text><path d="M94 238h74M120 218v40M352 238h74M389 212v52" stroke="#16a34a" stroke-width="7" stroke-linecap="round"/><text x="260" y="92" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">Resources scale when needed</text>`);
    case "cloud-saas":
      return base(`${device(78, 134, "User", "#dbeafe")}${box(224, 120, 112, 84, "Ready App", "#dcfce7", "#16a34a")}${box(370, 136, 78, 52, "Browser", "#fef3c7", "#f59e0b")}<path d="M170 160h50M336 160h30" stroke="#16a34a" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="88" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#166534">SaaS: use software online</text>`);
    case "cloud-paas":
      return base(`${device(72, 132, "Dev", "#ede9fe")}${box(210, 116, 120, 96, "Platform", "#ddd6fe", "#7c3aed")}${box(370, 134, 84, 60, "App", "#f5d0fe", "#a21caf")}<path d="M164 160h42M330 160h36" stroke="#7c3aed" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="86" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#4c1d95">PaaS: build and deploy applications</text>`);
    case "cloud-iaas":
      return base(`${box(78, 120, 86, 72, "VM", "#dbeafe", "#2563eb")}${box(216, 120, 86, 72, "Storage", "#dbeafe", "#2563eb")}${box(354, 120, 86, 72, "Network", "#dbeafe", "#2563eb")}<path d="M121 210h276" stroke="#2563eb" stroke-width="7"/><text x="260" y="86" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">IaaS: virtual infrastructure</text>`);
    case "cloud-public":
      return base(`${node(106, 124, "U1", "#dbeafe", "#2563eb")}${node(106, 202, "U2", "#dbeafe", "#2563eb")}${node(414, 164, "U3", "#dbeafe", "#2563eb")}<path d="M190 150a58 58 0 0 1 112-22 48 48 0 1 1 16 96H174a42 42 0 0 1 16-74Z" fill="#bfdbfe" stroke="#2563eb" stroke-width="7" filter="url(#shadow)"/><text x="260" y="182" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">Provider</text><text x="260" y="86" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">Public cloud: shared provider service</text>`);
    case "cloud-private":
      return base(`${box(92, 118, 122, 88, "One org", "#dcfce7", "#16a34a")}<path d="M292 150a50 50 0 0 1 96-18 42 42 0 1 1 14 82H282a36 36 0 0 1 10-64Z" fill="#bbf7d0" stroke="#16a34a" stroke-width="7" filter="url(#shadow)"/><rect x="324" y="144" width="52" height="42" rx="8" fill="#166534"/><circle cx="350" cy="168" r="8" fill="#bbf7d0"/><text x="260" y="86" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#166534">Private cloud: controlled by one organization</text>`);
    case "cloud-community":
      return base(`${node(126, 132, "Org A", "#ccfbf1", "#0f766e")}${node(126, 212, "Org B", "#ccfbf1", "#0f766e")}${node(394, 172, "Org C", "#ccfbf1", "#0f766e")}<path d="M200 150a54 54 0 0 1 104-20 44 44 0 1 1 16 86H190a38 38 0 0 1 10-66Z" fill="#ccfbf1" stroke="#0f766e" stroke-width="7" filter="url(#shadow)"/><text x="260" y="178" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#134e4a">Shared</text><text x="260" y="86" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#134e4a">Community cloud: shared by similar groups</text>`);
    case "cloud-hybrid":
      return base(`${box(72, 132, 114, 76, "Private", "#dcfce7", "#16a34a")}<path d="M304 150a50 50 0 0 1 96-18 42 42 0 1 1 14 82H294a36 36 0 0 1 10-64Z" fill="#bfdbfe" stroke="#2563eb" stroke-width="7" filter="url(#shadow)"/><text x="360" y="180" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#1e3a8a">Public</text><path d="M186 168h100" stroke="#0f766e" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="86" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#0f172a">Hybrid cloud: private + public</text>`);
    case "cloud-paygo":
      return base(`${box(92, 126, 100, 78, "Usage", "#fef3c7", "#f59e0b")}${box(242, 118, 92, 94, "Meter", "#ffedd5", "#f97316")}${box(382, 132, 72, 66, "Bill", "#dcfce7", "#16a34a")}<path d="M192 164h46M334 164h44" stroke="#f97316" stroke-width="7" marker-end="url(#arrow)"/><text x="260" y="86" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#92400e">Pay only for used resources</text>`);
    default:
      return base(`${device(76, 132, "A", "#ecfeff")}${device(356, 132, "B", "#fef3c7")}<path d="M162 160h184" stroke="#0f766e" stroke-width="8" marker-end="url(#arrow)"/><text x="260" y="96" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="#0f172a">Important ICT concept</text>`);
  }
};

const inlineRealVisual = ({ title, caption, variant }: InlineVisual) => `
  <figure class="note-inline-real-image not-prose my-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900 md:float-right md:ml-5 md:w-64 max-w-full">
    ${realStyleSvg(variant, title)}
    <figcaption class="border-t border-slate-100 px-3 py-2 text-center text-xs font-black text-slate-700 dark:border-slate-800 dark:text-slate-200">${caption}</figcaption>
  </figure>`;

const insertAfterHeading = (html: string, visual: InlineVisual) => {
  const headingRegex = /<h([2-4])\b[^>]*>[\s\S]*?<\/h\1>/g;
  let match: RegExpExecArray | null;
  let close = -1;

  while ((match = headingRegex.exec(html))) {
    if (match[0].includes(visual.heading)) {
      close = match.index + match[0].length;
      break;
    }
  }

  if (close === -1) return html;
  return `${html.slice(0, close)}${inlineRealVisual(visual)}${html.slice(close)}`;
};

const inlineVisualsByTopic: Record<string, InlineVisual[]> = {
  "topic-2-1": [
    { heading: "ডেটা কমিউনিকেশন সিস্টেম", title: "Data Communication System", caption: "Source to receiver communication path", variant: "communication" },
    { heading: "Narrow Band", title: "Narrow Band", caption: "45-300 bps slow data band", variant: "band-narrow" },
    { heading: "Voice Band", title: "Voice Band", caption: "1200-9600 bps voice band", variant: "band-voice" },
    { heading: "Broad Band", title: "Broadband", caption: "1 Mbps or more high-speed band", variant: "band-broadband" },
  ],
  "topic-2-2": [
    { heading: "Parallel", title: "Parallel Transmission", caption: "Multiple bits travel together", variant: "parallel" },
    { heading: "Serial", title: "Serial Transmission", caption: "Bits travel one after another", variant: "serial" },
    { heading: "Bit Synchronization", title: "Bit Synchronization", caption: "Sender and receiver timing alignment", variant: "bit-sync" },
    { heading: "Asynchronous", title: "Asynchronous", caption: "Start bit, data bits and stop bit", variant: "async" },
    { heading: "Synchronous", title: "Synchronous", caption: "Header, block data and trailer", variant: "sync" },
    { heading: "Isochronous", title: "Isochronous", caption: "Real-time audio/video transfer", variant: "iso" },
  ],
  "topic-2-3": [
    { heading: "Simplex", title: "Simplex Mode", caption: "One-way data flow", variant: "simplex" },
    { heading: "Half-Duplex", title: "Half-Duplex Mode", caption: "Both directions, one at a time", variant: "half" },
    { heading: "Full-Duplex", title: "Full-Duplex Mode", caption: "Both directions at the same time", variant: "full" },
    { heading: "Unicast", title: "Unicast", caption: "One sender to one receiver", variant: "unicast" },
    { heading: "Multicast", title: "Multicast", caption: "One sender to selected receivers", variant: "multicast" },
    { heading: "Broadcast", title: "Broadcast", caption: "One sender to all receivers", variant: "broadcast" },
  ],
  "topic-2-4": [
    { heading: "Twisted Pair Cable", title: "Twisted Pair Cable", caption: "Twisted copper pairs with RJ-45 use", variant: "twisted" },
    { heading: "Co-axial Cable", title: "Co-axial Cable", caption: "Copper core, insulation and shield layers", variant: "coax" },
    { heading: "Fiber Optic Cable", title: "Fiber Optic Cable", caption: "Light signal through fiber core", variant: "fiber" },
  ],
  "topic-2-5": [
    { heading: "অ্যান্টেনা", title: "Antenna", caption: "Directional and omnidirectional signal", variant: "radio" },
    { heading: "Radio Wave", title: "Radio Wave", caption: "Radio signal spreads through air", variant: "radio-wave" },
    { heading: "Microwave", title: "Microwave Link", caption: "Line-of-sight tower communication", variant: "microwave" },
    { heading: "Satellite", title: "Satellite Microwave", caption: "Uplink and downlink via satellite", variant: "satellite" },
    { heading: "Infrared", title: "Infrared", caption: "Short-range remote control signal", variant: "infrared" },
  ],
  "topic-2-6": [
    { heading: "Hotspot", title: "Hotspot", caption: "Access point shares internet nearby", variant: "hotspot" },
    { heading: "Bluetooth", title: "Bluetooth", caption: "Short-range WPAN connection", variant: "bluetooth" },
    { heading: "Piconet", title: "Piconet", caption: "Bluetooth master and slave devices", variant: "piconet" },
    { heading: "Wi-Fi", title: "Wi-Fi", caption: "Wireless LAN through router/AP", variant: "wifi" },
    { heading: "WiMAX", title: "WiMAX", caption: "City-wide wireless broadband", variant: "wimax" },
  ],
  "topic-2-7": [
    { heading: "GSM", title: "GSM", caption: "SIM-based 2G digital cellular network", variant: "gsm" },
    { heading: "CDMA", title: "CDMA", caption: "Code-based cellular access", variant: "cdma" },
    { heading: "প্রথম প্রজন্ম (1G)", title: "1G to 5G", caption: "Mobile generation evolution", variant: "generations" },
    { heading: "দ্বিতীয় প্রজন্ম (2G)", title: "2G", caption: "Digital voice and SMS generation", variant: "generations" },
    { heading: "তৃতীয় প্রজন্ম (3G)", title: "3G", caption: "Mobile internet and video call", variant: "generations" },
    { heading: "চতুর্থ প্রজন্ম (4G)", title: "4G", caption: "High-speed IP mobile broadband", variant: "generations" },
  ],
  "topic-2-8": [
    { heading: "PAN - Personal", title: "PAN", caption: "Personal area network around one user", variant: "area-pan" },
    { heading: "LAN - Local", title: "LAN", caption: "Local area network in building or lab", variant: "area-lan" },
    { heading: "CAN - Campus", title: "CAN", caption: "Campus area network across buildings", variant: "area-can" },
    { heading: "MAN - Metropolitan", title: "MAN", caption: "City-wide metropolitan network", variant: "area-man" },
    { heading: "WAN - Wide", title: "WAN", caption: "Country or global wide area network", variant: "area-wan" },
  ],
  "topic-2-9": [
    { heading: "Modem", title: "Modem", caption: "Digital-to-analog and analog-to-digital conversion", variant: "device-modem" },
    { heading: "NIC", title: "NIC", caption: "Network interface card with MAC address", variant: "device-nic" },
    { heading: "Hub", title: "Hub", caption: "Broadcasts data to all ports", variant: "device-hub" },
    { heading: "Switch", title: "Switch", caption: "Forwards data to selected MAC port", variant: "device-switch" },
    { heading: "Router", title: "Router", caption: "Chooses path between networks", variant: "device-router" },
    { heading: "Gateway", title: "Gateway", caption: "Protocol converter between networks", variant: "device-gateway" },
    { heading: "Repeater", title: "Repeater", caption: "Regenerates weak signal", variant: "device-repeater" },
    { heading: "Bridge", title: "Bridge", caption: "Connects LAN segments", variant: "device-bridge" },
  ],
  "topic-2-10": [
    { heading: "Bus Topology", title: "Bus Topology", caption: "Single backbone cable layout", variant: "topology-bus" },
    { heading: "Ring Topology", title: "Ring Topology", caption: "Nodes connected in a loop", variant: "topology-ring" },
    { heading: "Star Topology", title: "Star Topology", caption: "Nodes connect to central device", variant: "topology-star" },
    { heading: "Tree Topology", title: "Tree Topology", caption: "Hierarchical network layout", variant: "topology-tree" },
    { heading: "Mesh Topology", title: "Mesh Topology", caption: "Multiple redundant links", variant: "topology-mesh" },
    { heading: "Hybrid Topology", title: "Hybrid Topology", caption: "Combination of multiple topologies", variant: "topology-hybrid" },
  ],
  "topic-2-11": [
    { heading: "On-Demand", title: "On-Demand Cloud", caption: "Resources when needed", variant: "cloud-ondemand" },
    { heading: "SaaS", title: "SaaS", caption: "Software as an online service", variant: "cloud-saas" },
    { heading: "PaaS", title: "PaaS", caption: "Platform for developers", variant: "cloud-paas" },
    { heading: "IaaS", title: "IaaS", caption: "Virtual server, storage and network", variant: "cloud-iaas" },
    { heading: "পাবলিক ক্লাউড", title: "Public Cloud", caption: "Shared provider cloud", variant: "cloud" },
    { heading: "প্রাইভেট ক্লাউড", title: "Private Cloud", caption: "Controlled by one organization", variant: "cloud" },
    { heading: "হাইব্রিড ক্লাউড", title: "Hybrid Cloud", caption: "Public and private cloud mix", variant: "cloud" },
    { heading: "পে-অ্যাজ-ইউ-গো", title: "Pay As You Go", caption: "Pay according to resource usage", variant: "bandwidth" },
  ],
};

const inlineVisualOverridesByTitle: Record<string, Partial<InlineVisual>> = {
  "1G to 5G": { heading: "(1G)", title: "1G", caption: "Analog voice-only generation", variant: "generation-1g" },
  "2G": { heading: "(2G)", caption: "Digital voice, SMS and MMS generation", variant: "generation-2g" },
  "3G": { heading: "(3G)", caption: "Mobile internet and video call generation", variant: "generation-3g" },
  "4G": { heading: "(4G)", caption: "LTE and high-speed IP mobile broadband", variant: "generation-4g" },
  "Satellite Microwave": { heading: "স্যাটেলাইট", variant: "satellite" },
  "Public Cloud": { heading: "পাবলিক ক্লাউড", variant: "cloud-public" },
  "Private Cloud": { heading: "প্রাইভেট ক্লাউড", variant: "cloud-private" },
  "Hybrid Cloud": { heading: "হাইব্রিড ক্লাউড", variant: "cloud-hybrid" },
  "Pay As You Go": { heading: "পে-অ্যাজ-ইউ-গো", variant: "cloud-paygo" },
};

const extraInlineVisualsByTopic: Record<string, InlineVisual[]> = {
  "topic-2-11": [
    { heading: "কমিউনিটি ক্লাউড", title: "Community Cloud", caption: "Shared by similar organizations", variant: "cloud-community" },
  ],
};

const normalizeInlineVisual = (visual: InlineVisual): InlineVisual => ({
  ...visual,
  ...(inlineVisualOverridesByTitle[visual.title] ?? {}),
});

const addInlineVisuals = (topicId: string, notes: string) =>
  [...(inlineVisualsByTopic[topicId] ?? []), ...(extraInlineVisualsByTopic[topicId] ?? [])]
    .map(normalizeInlineVisual)
    .reduce((html, visual) => insertAfterHeading(html, visual), notes);

const noteIcon = `
  <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-200" aria-hidden="true">
    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-1.5Z"></path>
      <path d="M8 7h6"></path>
      <path d="M8 11h8"></path>
      <path d="M8 15h5"></path>
    </svg>
  </span>`;

const noteBlock = (
  title: string,
  _visualKey: string,
  _alt: string,
  _caption: string,
  points: string[],
  boardFocus: string[]
) => {
  return `
<section class="mt-10 rounded-[2rem] border border-teal-200/70 bg-white/85 p-5 shadow-xl dark:border-teal-800/50 dark:bg-slate-900/70 md:p-8">
  <h3 class="mb-5 flex items-center gap-3 text-2xl font-black text-teal-800 dark:text-teal-200">
    ${noteIcon}
    ${title}
  </h3>
  <div class="grid gap-5 md:grid-cols-2">
    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70">
      <h4 class="mb-3 text-lg font-black text-slate-900 dark:text-white">Most important source-backed notes</h4>
      <ul class="space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
        ${points.map(point => `<li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-teal-500"></span><span>${point}</span></li>`).join("")}
      </ul>
    </div>
    <div class="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-900/20">
      <h4 class="mb-3 text-lg font-black text-amber-800 dark:text-amber-200">Board focus</h4>
      <ul class="space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
        ${boardFocus.map(point => `<li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500"></span><span>${point}</span></li>`).join("")}
      </ul>
    </div>
  </div>
</section>`;
};

const noteEnhancements: Record<string, string> = {
  "topic-2-1": noteBlock(
    "Special Note Update: কমিউনিকেশন সিস্টেম ও ব্যান্ডউইথ",
    "topic-2-1",
    "ন্যারো ব্যান্ড, ভয়েস ব্যান্ড ও ব্রডব্যান্ডের তুলনা",
    "ব্যান্ডউইথ range ও ব্যবহার এক ছবিতে",
    [
      "ডেটা কমিউনিকেশনের ৫ উপাদান: Source, Transmitter, Medium, Receiver, Destination।",
      "Medium-এ noise যুক্ত হতে পারে, তাই receiver signal decode করে গন্তব্যে পৌঁছে দেয়।",
      "Bandwidth হলো প্রতি সেকেন্ডে স্থানান্তরিত bit-এর পরিমাণ; ১ Byte = ৮ bit।",
      "Network bandwidth medium, terminal equipment এবং একসাথে ব্যবহারকারীর সংখ্যার উপর নির্ভর করে।",
    ],
    [
      "গণিত প্রশ্নে সূত্র: Bandwidth = total bit / time.",
      "ন্যারো: 45-300 bps, ভয়েস: 1200-9600 bps, ব্রড: 1 Mbps বা বেশি।",
      "২০২৫ CQ-তে bandwidth, LTE, Wi-Fi/WiMAX context-এ basic definition বারবার এসেছে।",
    ]
  ),
  "topic-2-2": noteBlock(
    "Special Note Update: ডেটা ট্রান্সমিশন মেথড",
    "topic-2-2",
    "প্যারালাল ও সিরিয়াল ট্রান্সমিশন মেথডের শ্রেণিবিভাগ",
    "Parallel, Serial, Asynchronous, Synchronous, Isochronous",
    [
      "Parallel transmission দ্রুত হলেও দূরত্ব বাড়লে খরচ ও line management কঠিন হয়।",
      "Serial transmission কম খরচে নির্ভরযোগ্য; bit synchronization দিয়ে bit-এর শুরু-শেষ বোঝা যায়।",
      "Asynchronous character-by-character, start/stop bit থাকে, primary memory দরকার হয় না।",
      "Synchronous block/packet আকারে যায়; header, trailer এবং buffer দরকার হয়।",
      "Isochronous real-time audio/video-র জন্য, delay খুব কম কিন্তু error correction সীমিত।",
    ],
    [
      "ঢাকা ২০২৫: asynchronous-এ start/stop bit কেন লাগে।",
      "সিলেট ২০২৫: keyboard input থেকে asynchronous চিহ্নিত করার প্রশ্ন।",
      "ময়মনসিংহ ২০২৫: অসম বিরতি ও start/stop bit clue দেখলেই asynchronous।",
    ]
  ),
  "topic-2-3": noteBlock(
    "Special Note Update: ট্রান্সমিশন ও ডেলিভারি মোড",
    "topic-2-3",
    "সিমপ্লেক্স, হাফ-ডুপ্লেক্স ও ফুল-ডুপ্লেক্সের তুলনা",
    "মোড মনে রাখার compact comparison",
    [
      "Transmission mode ডেটা প্রবাহের দিক বোঝায়: Simplex, Half-duplex, Full-duplex।",
      "Delivery mode প্রাপকের সংখ্যা/অধিকার বোঝায়: Unicast, Broadcast, Multicast।",
      "TV/Radio: simplex + broadcast; walkie-talkie: half-duplex; mobile call: full-duplex।",
      "Video conference সাধারণত selected group communication, তাই multicast ধারণা প্রাসঙ্গিক।",
    ],
    [
      "চট্টগ্রাম ২০২৫: real-time method ও medium analysis এসেছে।",
      "দিনাজপুর ২০২৫: TV ও mobile call থেকে mode বের করতে হবে।",
      "ময়মনসিংহ ২০২৫: TV ক্ষেত্রে simplex + broadcast একসাথে বিশ্লেষণ করতে হবে।",
    ]
  ),
  "topic-2-4": noteBlock(
    "Special Note Update: তার মাধ্যম",
    "topic-2-4",
    "তার ও তারবিহীন মাধ্যমের শ্রেণিবিভাগ",
    "Twisted pair, coaxial ও optical fiber কোথায় বসে",
    [
      "Twisted pair দুই বা ততোধিক তার পেঁচানো; UTP সস্তা, STP noise কমায়।",
      "Co-axial cable cable TV ও broadband distribution-এ ব্যবহৃত হয়; Thinnet = 10Base2, Thicknet = 10Base5।",
      "Optical fiber-এর core, cladding, buffer coating ও jacket থাকে।",
      "Fiber-এ laser/LED আলো ব্যবহৃত হয়; bandwidth বেশি, EMI প্রভাব কম, installation cost বেশি।",
    ],
    [
      "রাজশাহী ২০২৫: EMI প্রভাবমুক্ত medium মানে optical fiber।",
      "কুমিল্লা ২০২৫: EMI-free cable-এর গঠন লিখতে হবে।",
      "সিলেট ২০২৫: single mode fiber long distance/high bandwidth-এ বেশি উপযোগী।",
    ]
  ),
  "topic-2-5": noteBlock(
    "Special Note Update: তারবিহীন মাধ্যম",
    "topic-2-5",
    "টেরেস্ট্রিয়াল ও স্যাটেলাইট মাইক্রোওয়েভ ধারণা",
    "Line-of-sight ও satellite link চিহ্নিত করার visual",
    [
      "Radio wave বড় এলাকা কভার করে এবং broadcast communication-এ ব্যবহৃত হয়।",
      "Terrestrial microwave-এ tower-to-tower line of sight দরকার।",
      "Satellite microwave দীর্ঘ দূরত্বে signal relay করে; geostationary satellite প্রায় 36,000 km উচ্চতায় থাকে।",
      "Infrared স্বল্প দূরত্বে, line-of-sight ভিত্তিক; remote control এর common example।",
    ],
    [
      "সিলেট ২০২৫: geostationary satellite definition/height গুরুত্বপূর্ণ।",
      "ময়মনসিংহ ২০২৫: VSAT প্রশ্নে satellite communication লিখতে হবে।",
      "কুমিল্লা ২০২৫: দুর্গম এলাকায় tower-based wireless internet clue থেকে microwave/WiMAX ভাবতে হবে।",
    ]
  ),
  "topic-2-6": noteBlock(
    "Special Note Update: Bluetooth, Wi-Fi, WiMAX",
    "topic-2-6",
    "Bluetooth, Wi-Fi ও WiMAX পরিবেশ",
    "Wireless standard ও coverage মনে রাখার visual",
    [
      "Bluetooth: IEEE 802.15, WPAN, 2.4-2.45 GHz, piconet, স্বল্প দূরত্ব।",
      "Wi-Fi: IEEE 802.11, WLAN, 2.4/5 GHz, সাধারণত 50-300 meter coverage।",
      "WiMAX: IEEE 802.16, WMAN, 2-66 GHz, বড় এলাকা ও tower-based broadband।",
      "Bluetooth/Wi-Fi সাধারণত unlicensed band, WiMAX-এ authority approval প্রয়োজন হতে পারে।",
    ],
    [
      "ঢাকা ২০২৫: LTE, IEEE 802.11 ও 802.16 একই stem-এ এসেছে।",
      "বরিশাল ২০২৫: IEEE 802.15 বনাম 802.11 থেকে Bluetooth/Wi-Fi identify করতে হবে।",
      "সিলেট ২০২৫: Wi-Fi ও WiMAX তুলনামূলক বিশ্লেষণ এসেছে।",
    ]
  ),
  "topic-2-7": noteBlock(
    "Special Note Update: মোবাইল যোগাযোগ",
    "topic-2-7",
    "1G থেকে 5G mobile generation timeline",
    "Generation, standard ও clue একসাথে",
    [
      "Mobile network cell-ভিত্তিক; প্রতিটি cell-এ base station থাকে।",
      "Roaming হলো coverage-এর বাইরে থেকেও service পাওয়া।",
      "1G analog, 2G digital GSM/CDMA, 3G packet switching + video call, 4G LTE + IP, 5G NR/MIMO।",
      "4G-তে চলমান device-এ প্রায় 100 Mbps এবং স্থির device-এ 1 Gbps পর্যন্ত ধারণা board book-এ আছে।",
    ],
    [
      "ঢাকা ২০২৫: LTE standard দেখলেই 4G লিখতে হবে।",
      "ময়মনসিংহ ২০২৫: LTE প্রজন্ম ও mobile generation explanation এসেছে।",
      "Roaming, cell, base station, switching center short answer-ready রাখো।",
    ]
  ),
  "topic-2-8": noteBlock(
    "Special Note Update: নেটওয়ার্কের ধরন",
    "topic-2-8",
    "PAN, LAN, CAN, MAN, WAN coverage diagram",
    "Coverage clue থেকে network type নির্ণয়",
    [
      "PAN ব্যক্তিগত স্বল্প দূরত্ব; LAN room/building; CAN campus; MAN city; WAN country/world।",
      "Network resource sharing-এ hardware, software ও information ভাগাভাগি করা যায়।",
      "Client-server network-এ server service প্রদান ও control করে; peer-to-peer-এ deviceগুলো প্রায় সমান ভূমিকা নেয়।",
      "Private network নির্দিষ্ট ব্যক্তি/প্রতিষ্ঠানের নিয়ন্ত্রিত network।",
    ],
    [
      "রাজশাহী ২০২৫: server-based branch/head office stem থেকে client-server vs peer-to-peer আলোচনা।",
      "যশোর ২০২৫: কলেজ/office device connection থেকে LAN/star clue।",
      "দিনাজপুর ২০২৫: WAN definition common short question।",
    ]
  ),
  "topic-2-9": noteBlock(
    "Special Note Update: নেটওয়ার্ক ডিভাইস",
    "topic-2-9",
    "NIC, hub, switch, modem, router ইত্যাদি device",
    "Device দেখে কাজ মনে রাখার visual",
    [
      "NIC computer-কে network-এ যুক্ত করে; MAC address 48 bit।",
      "Modem digital-to-analog modulation এবং analog-to-digital demodulation করে।",
      "Hub সব port-এ broadcast করে, Switch MAC table দেখে নির্দিষ্ট port-এ পাঠায়।",
      "Gateway ভিন্ন protocol network যুক্ত করে, তাই protocol converter বলা হয়।",
      "Repeater signal regenerate করে; Router IP address দেখে path নির্বাচন করে।",
    ],
    [
      "কুমিল্লা ২০২৫: gateway = protocol converter.",
      "যশোর ২০২৫: central device বদলে switch ব্যবহারের সুবিধা।",
      "ময়মনসিংহ ২০২৫: Device-1 broadcast এবং Device-2 MAC address clue থেকে hub vs switch।",
    ]
  ),
  "topic-2-10": noteBlock(
    "Special Note Update: নেটওয়ার্ক টপোলজি",
    "topic-2-10",
    "বিভিন্ন নেটওয়ার্ক টপোলজির চিত্র",
    "Bus, ring, star, tree, mesh ও hybrid একসাথে",
    [
      "Bus: এক backbone cable; দুই প্রান্তে terminator।",
      "Ring: nodeগুলো চক্রাকারে; একটি node/link সমস্যা হলে প্রভাব পড়তে পারে।",
      "Star: central hub/switch; সহজ management কিন্তু central device critical।",
      "Mesh: সব node সরাসরি যুক্ত; link formula n(n-1)/2; reliability বেশি।",
      "Hybrid: দুই বা ততোধিক topology-এর সমন্বয়।",
    ],
    [
      "কুমিল্লা ২০২৫: তিনটি চিত্র থেকে topology চিহ্নিত ও তুলনা।",
      "রাজশাহী/বরিশাল ২০২৫: mesh link formula ও ring/mesh comparison।",
      "যশোর/ময়মনসিংহ ২০২৫: star topology এবং hub-switch device analysis।",
    ]
  ),
  "topic-2-11": noteBlock(
    "Special Note Update: ক্লাউড কম্পিউটিং",
    "topic-2-11",
    "ক্লাউডে বহু client ও server সংযোগ",
    "On-demand online service ধারণা",
    [
      "Cloud computing হলো internet-এর মাধ্যমে server, storage, software ও computing resource ব্যবহার।",
      "Service model: SaaS, PaaS, IaaS; deployment model: public, private, hybrid, community।",
      "মূল সুবিধা: pay-as-you-go, scalability, auto update, কম hardware cost, 24x7 access।",
      "ঝুঁকি: internet dependency, privacy/security risk, provider control ও vendor lock-in।",
    ],
    [
      "চট্টগ্রাম ২০২৫: 24x7, on demand, pay as you go clue থেকে cloud computing।",
      "বরিশাল/দিনাজপুর ২০২৫: cloud সুবিধা ও ব্যবহার।",
      "সিলেট ২০২৫: cloud-এ তথ্যের গোপনীয়তা ভঙ্গ হতে পারে - ব্যাখ্যা।",
    ]
  ),
};

const KNOWLEDGE: ShortQuestion["type"] = "জ্ঞানমূলক";
const UNDERSTANDING: ShortQuestion["type"] = "অনুধাবনমূলক";

const extraShortQuestions: Record<string, ShortQuestion[]> = {
  "topic-2-1": [
    { q: "ডেটা কমিউনিকেশন কী?", a: "এক স্থান থেকে অন্য স্থানে নির্ভরযোগ্যভাবে ডেটা বা তথ্য আদান-প্রদানের প্রক্রিয়াকে ডেটা কমিউনিকেশন বলে।", type: KNOWLEDGE },
    { q: "ব্যান্ডউইথ কী?", a: "প্রতি সেকেন্ডে কোনো চ্যানেলের মাধ্যমে যত বিট ডেটা স্থানান্তরিত হতে পারে তাকে ব্যান্ডউইথ বলে।", type: KNOWLEDGE },
    { q: "ডেটা কমিউনিকেশনে নয়েজ ক্ষতিকর কেন?", a: "নয়েজ মূল সংকেতের সঙ্গে অনাকাঙ্ক্ষিত সংকেত যোগ করে, ফলে প্রাপক ভুল বা বিকৃত ডেটা পেতে পারে।", type: UNDERSTANDING },
    { q: "ব্রডব্যান্ডকে উচ্চগতির ব্যান্ড বলা হয় কেন?", a: "ব্রডব্যান্ডে ১ Mbps বা তার বেশি গতিতে ডেটা আদান-প্রদান করা যায়, তাই বড় ফাইল, ভিডিও ও ইন্টারনেট সেবা দ্রুত চলে।", type: UNDERSTANDING },
  ],
  "topic-2-2": [
    { q: "প্যারালাল ট্রান্সমিশন কী?", a: "যে পদ্ধতিতে একাধিক লাইনের মাধ্যমে একসাথে একাধিক বিট পাঠানো হয় তাকে প্যারালাল ট্রান্সমিশন বলে।", type: KNOWLEDGE },
    { q: "বিট সিনক্রোনাইজেশন কী?", a: "প্রেরক ও প্রাপকের সময় মিলিয়ে প্রতিটি বিটের শুরু ও শেষ শনাক্ত করার পদ্ধতিকে বিট সিনক্রোনাইজেশন বলে।", type: KNOWLEDGE },
    { q: "অ্যাসিনক্রোনাস ট্রান্সমিশনে start ও stop bit কেন লাগে?", a: "প্রতিটি character আলাদাভাবে পাঠানো হয়, তাই start bit চরিত্রের শুরু এবং stop bit চরিত্রের শেষ নির্দেশ করে।", type: UNDERSTANDING },
    { q: "সিনক্রোনাস ট্রান্সমিশনে buffer কেন প্রয়োজন?", a: "এ পদ্ধতিতে ডেটা block বা packet আকারে পাঠানো হয়; ব্লক জমা ও নিয়ন্ত্রিতভাবে পাঠাতে buffer দরকার হয়।", type: UNDERSTANDING },
  ],
  "topic-2-3": [
    { q: "সিমপ্লেক্স মোড কী?", a: "যে মোডে ডেটা কেবল একদিকে প্রবাহিত হয় তাকে সিমপ্লেক্স মোড বলে।", type: KNOWLEDGE },
    { q: "ইউনিকাস্ট কী?", a: "একজন প্রেরক থেকে নির্দিষ্ট একজন প্রাপকের কাছে ডেটা পাঠানোর পদ্ধতিকে ইউনিকাস্ট বলে।", type: KNOWLEDGE },
    { q: "টিভি সম্প্রচারকে simplex ও broadcast বলা হয় কেন?", a: "টিভিতে তথ্য কেন্দ্র থেকে দর্শকের দিকে একমুখী যায়, তাই simplex; একই সঙ্গে বহু দর্শকের কাছে যায়, তাই broadcast।", type: UNDERSTANDING },
    { q: "ভিডিও কনফারেন্সে multicast ধারণা প্রাসঙ্গিক কেন?", a: "ভিডিও কনফারেন্সে নির্দিষ্ট নির্বাচিত গ্রুপের সদস্যদের কাছে ডেটা পৌঁছায়, তাই এটি multicast ধারণার সঙ্গে মেলে।", type: UNDERSTANDING },
  ],
  "topic-2-4": [
    { q: "টুইস্টেড পেয়ার ক্যাবল কী?", a: "দুটি বা ততোধিক তামার তার পরস্পর পেঁচিয়ে তৈরি যে guided medium, তাকে টুইস্টেড পেয়ার ক্যাবল বলে।", type: KNOWLEDGE },
    { q: "অপটিক্যাল ফাইবার কী?", a: "কাঁচ বা প্লাস্টিকের সূক্ষ্ম তন্তুর মাধ্যমে আলোক সংকেত ব্যবহার করে ডেটা পাঠানোর মাধ্যমকে অপটিক্যাল ফাইবার বলে।", type: KNOWLEDGE },
    { q: "টুইস্টেড পেয়ার ক্যাবল পেঁচানো থাকে কেন?", a: "তার পেঁচানো থাকলে noise, EMI ও crosstalk কমে, ফলে স্বল্প দূরত্বের LAN যোগাযোগ স্থিতিশীল হয়।", type: UNDERSTANDING },
    { q: "অপটিক্যাল ফাইবার EMI-প্রভাবমুক্ত কেন?", a: "এতে বৈদ্যুতিক সংকেত নয়, আলোক সংকেত ব্যবহৃত হয়; তাই তড়িৎ-চৌম্বকীয় প্রভাব ডেটা বিকৃত করতে পারে না।", type: UNDERSTANDING },
  ],
  "topic-2-5": [
    { q: "বেতার মাধ্যম কী?", a: "যে মাধ্যমে কোনো physical cable ছাড়াই electromagnetic wave ব্যবহার করে ডেটা পাঠানো হয় তাকে বেতার মাধ্যম বলে।", type: KNOWLEDGE },
    { q: "মাইক্রোওয়েভ কী?", a: "উচ্চ কম্পাঙ্কের একধরনের electromagnetic wave, যা line-of-sight যোগাযোগে ব্যবহৃত হয়।", type: KNOWLEDGE },
    { q: "স্যাটেলাইট মাইক্রোওয়েভ দূরপাল্লার যোগাযোগে উপযোগী কেন?", a: "উপগ্রহ earth station থেকে uplink গ্রহণ করে দূরের station-এ downlink পাঠায়, ফলে দীর্ঘ দূরত্ব অতিক্রম করা যায়।", type: UNDERSTANDING },
    { q: "ইনফ্রারেড স্বল্প দূরত্বে সীমাবদ্ধ কেন?", a: "ইনফ্রারেড সরলরেখায় চলে এবং দেয়াল ভেদ করতে পারে না, তাই নিকটবর্তী line-of-sight যোগাযোগে বেশি উপযোগী।", type: UNDERSTANDING },
  ],
  "topic-2-6": [
    { q: "Wi-Fi কী?", a: "Wireless LAN প্রযুক্তির মাধ্যমে কাছাকাছি ডিভাইসকে access point দিয়ে internet বা network-এ যুক্ত করার ব্যবস্থা Wi-Fi।", type: KNOWLEDGE },
    { q: "Bluetooth কী?", a: "স্বল্প দূরত্বে কম শক্তিতে device-to-device data transfer-এর wireless personal area network প্রযুক্তি Bluetooth।", type: KNOWLEDGE },
    { q: "WiMAX-কে metropolitan broadband প্রযুক্তি বলা হয় কেন?", a: "WiMAX Wi-Fi-এর তুলনায় বড় এলাকায় broadband wireless access দিতে পারে, তাই শহরভিত্তিক সংযোগে উপযোগী।", type: UNDERSTANDING },
    { q: "Hotspot কীভাবে কাজ করে?", a: "একটি access point internet connection share করে এবং কাছাকাছি wireless device authentication-এর মাধ্যমে সেটি ব্যবহার করে।", type: UNDERSTANDING },
  ],
  "topic-2-7": [
    { q: "মোবাইল প্রজন্ম কী?", a: "মোবাইল যোগাযোগ প্রযুক্তির ধাপে ধাপে উন্নত সংস্করণগুলোকে মোবাইল প্রজন্ম বলে।", type: KNOWLEDGE },
    { q: "4G কী?", a: "উচ্চগতির packet-switched IP based mobile communication প্রযুক্তির চতুর্থ প্রজন্মকে 4G বলে।", type: KNOWLEDGE },
    { q: "2G থেকে 3G-তে উন্নতি গুরুত্বপূর্ণ কেন?", a: "2G মূলত digital voice ও SMS-এ সীমিত ছিল; 3G mobile internet, multimedia ও video service-এর সুযোগ বাড়ায়।", type: UNDERSTANDING },
    { q: "5G-তে low latency গুরুত্বপূর্ণ কেন?", a: "কম latency থাকলে real-time application, IoT, smart service ও দ্রুত প্রতিক্রিয়ার কাজ ভালোভাবে করা যায়।", type: UNDERSTANDING },
  ],
  "topic-2-8": [
    { q: "LAN কী?", a: "সীমিত এলাকার যেমন room, building বা campus-এর computer network-কে LAN বলে।", type: KNOWLEDGE },
    { q: "WAN কী?", a: "বিস্তৃত ভৌগোলিক এলাকার একাধিক network সংযুক্ত করে গঠিত network-কে WAN বলে।", type: KNOWLEDGE },
    { q: "PAN ও LAN-এর মধ্যে পার্থক্য কেন করা হয়?", a: "PAN ব্যক্তিগত ডিভাইসের খুব ছোট পরিসরের network, আর LAN room/building/campus পর্যায়ে একাধিক computer যুক্ত করে।", type: UNDERSTANDING },
    { q: "MAN শহরভিত্তিক network কেন?", a: "MAN সাধারণত একই শহরের বিভিন্ন LAN বা প্রতিষ্ঠানকে সংযুক্ত করে, তাই এর coverage LAN-এর চেয়ে বড় কিন্তু WAN-এর চেয়ে ছোট।", type: UNDERSTANDING },
  ],
  "topic-2-9": [
    { q: "NIC কী?", a: "কম্পিউটার বা ডিভাইসকে network-এ যুক্ত করার interface card বা adapter-কে NIC বলে।", type: KNOWLEDGE },
    { q: "Router কী?", a: "যে device ভিন্ন network-এর মধ্যে data packet-এর পথ নির্বাচন করে পাঠায় তাকে router বলে।", type: KNOWLEDGE },
    { q: "Switch hub-এর চেয়ে কার্যকর কেন?", a: "Hub data সব port-এ পাঠায়, কিন্তু switch MAC address দেখে নির্দিষ্ট port-এ পাঠায়; তাই collision ও অপ্রয়োজনীয় traffic কমে।", type: UNDERSTANDING },
    { q: "Gateway-কে protocol converter বলা হয় কেন?", a: "Gateway ভিন্ন protocol ব্যবহৃত network-এর মধ্যে data format বা protocol রূপান্তর করে যোগাযোগ সম্ভব করে।", type: UNDERSTANDING },
  ],
  "topic-2-10": [
    { q: "Network topology কী?", a: "Network-এর node ও link কীভাবে সাজানো বা সংযুক্ত থাকে তার বিন্যাসকে network topology বলে।", type: KNOWLEDGE },
    { q: "Star topology কী?", a: "যে topology-তে সব node একটি central hub বা switch-এর সঙ্গে যুক্ত থাকে তাকে star topology বলে।", type: KNOWLEDGE },
    { q: "Bus topology-তে terminator কেন লাগে?", a: "Backbone cable-এর শেষ প্রান্তে signal reflection বন্ধ করতে terminator ব্যবহার করা হয়।", type: UNDERSTANDING },
    { q: "Mesh topology নির্ভরযোগ্য কেন?", a: "Mesh topology-তে একাধিক alternative link থাকে, তাই একটি link নষ্ট হলেও অন্য পথে data চলাচল করতে পারে।", type: UNDERSTANDING },
  ],
  "topic-2-11": [
    { q: "Cloud computing কী?", a: "Internet-এর মাধ্যমে server, storage, software বা computing resource ব্যবহার করার প্রযুক্তিকে cloud computing বলে।", type: KNOWLEDGE },
    { q: "SaaS কী?", a: "Software as a Service হলো এমন cloud service যেখানে browser বা internet-এর মাধ্যমে software ব্যবহার করা যায়।", type: KNOWLEDGE },
    { q: "Pay as you go পদ্ধতি ব্যবহারকারীর জন্য সুবিধাজনক কেন?", a: "ব্যবহারকারী যত resource ব্যবহার করে ততটুকুর জন্য মূল্য দেয়, ফলে শুরুতে বড় hardware investment কম লাগে।", type: UNDERSTANDING },
    { q: "Public cloud ও private cloud-এর পার্থক্য কেন গুরুত্বপূর্ণ?", a: "Public cloud বহু ব্যবহারকারীর জন্য shared, আর private cloud নির্দিষ্ট প্রতিষ্ঠানের control ও security অনুযায়ী ব্যবহৃত হয়।", type: UNDERSTANDING },
  ],
};

const cqExtras: Record<string, CQ[]> = {
  "topic-2-2": [
    {
      stem: "দৃশ্যকল্প-১: রাফি তার অ্যাসাইনমেন্ট কী বোর্ডের সাহায্যে টাইপ করছে। দৃশ্যকল্প-২: পপি কম্পিউটার ব্যবহার করে বন্ধুকে ইমেইল করল। [সিলেট বোর্ড-২০২৫]",
      qA: "গেটওয়ে কী?",
      qB: "সিঙ্গেল মোড ফাইবার মাল্টিমোড ফাইবার এর চেয়ে কোন ক্ষেত্রে বেশি উপযোগী? ব্যাখ্যা কর।",
      qC: "দৃশ্যকল্প-১ এ কোন ডেটা ট্রান্সমিশন মেথড ব্যবহৃত হচ্ছে? ব্যাখ্যা কর।",
      qD: "দৃশ্যকল্প-১ এবং দৃশ্যকল্প-২ এ ব্যবহৃত ডেটা ট্রান্সমিশন মেথড দুইটির তুলনামূলক বিশ্লেষণ কর।",
    },
    {
      stem: "দৃশ্যকল্প-১: আইসিটি শিক্ষক শ্রেণিকক্ষে পাঠদানের সময় অসম বিরতিতে ডেটা ট্রান্সমিশনের কথা আলোচনা করলেন যেখানে ব্লক সমন্বয়ের জন্য স্টার্ট ও স্টপ বিট পাঠানো হয়। [ময়মনসিংহ বোর্ড-২০২৫]",
      qA: "NIC কী?",
      qB: "LTE স্ট্যান্ডার্ড সম্বলিত মোবাইল ফোনের প্রজন্ম সম্পর্কে ব্যাখ্যা কর।",
      qC: "দৃশ্যকল্প-১ এর ডেটা ট্রান্সমিশন মেথড ব্যাখ্যা কর।",
      qD: "দৃশ্যকল্প-২ এর ডিভাইসটির ক্ষেত্রে ডেটা ট্রান্সমিশন মোড ও ডেটা ডিস্ট্রিবিউশন মোড বিশ্লেষণ কর।",
    },
  ],
  "topic-2-3": [
    {
      stem: "দৃশ্যকল্প-১: সিয়াদ টেলিভিশনে বিশ্বকাপের ফাইনাল ম্যাচটি উপভোগ করছিল। বিদ্যুৎ চলে গেলে সে বন্ধুর কাছে মোবাইলে কল করল। [দিনাজপুর বোর্ড-২০২৫]",
      image: "/chapter2/cq/dinajpur-2025-tv-phone-modes.svg",
      imageAlt: "টিভি সম্প্রচার ও মোবাইল কলের ট্রান্সমিশন মোড",
      qA: "WAN কী?",
      qB: "ক্লাউড কম্পিউটিংয়ের সুবিধাসমূহ ব্যাখ্যা কর।",
      qC: "দৃশ্যকল্প-১ এ সিয়াদ কোন কোন ডেটা ট্রান্সমিশন মোড ব্যবহার করেছে ব্যাখ্যা কর।",
      qD: "দৃশ্যকল্প-২ এর টপোলজিদ্বয়ের মধ্যে কোনটি বেশি উপযোগী? বিশ্লেষণপূর্বক মতামত দাও।",
    },
  ],
  "topic-2-4": [
    {
      stem: "জালাল সাহেব মূল অফিসের ২০ টি কম্পিউটারকে EMI প্রভাবমুক্ত মাধ্যম ব্যবহার করে নেটওয়ার্ক গঠন করেন। তিনি শাখা অফিসকে IEEE 802.11 প্রযুক্তির মাধ্যমে এবং দুই অফিসকে IEEE 802.16 প্রযুক্তি দিয়ে যুক্ত করেন। [রাজশাহী বোর্ড-২০২৫]",
      qA: "রিপিটার কী?",
      qB: "প্রেরক ও প্রাপক হিসাবে একই ডিভাইস ব্যবহৃত হয়- ব্যাখ্যা কর।",
      qC: "মূল অফিসে ব্যবহৃত মাধ্যমটির গঠন বর্ণনা কর।",
      qD: "উদ্দীপকে উল্লিখিত স্ট্যান্ডার্ড দুইটির দ্বারা নির্দেশিত প্রযুক্তিদ্বয়ের তুলনামূলক আলোচনা কর।",
    },
    {
      stem: "প্রেরক ও প্রাপক নিরাপত্তার সাথে এমন একটি মাধ্যমে ডেটা আদান-প্রদান করে যেখানে আলো সংকেত ব্যবহৃত হয়। [চট্টগ্রাম বোর্ড-২০২৫]",
      image: "/chapter2/cq/chattogram-2025-fiber-medium.svg",
      imageAlt: "ফাইবার অপটিক মাধ্যমে প্রেরক থেকে প্রাপক পর্যন্ত আলো সংকেত",
      qA: "ব্লুটুথ কী?",
      qB: "রিয়েল টাইম ডেটা ট্রান্সমিশন মেথড ব্যাখ্যা কর।",
      qC: "উদ্দীপকে প্রদর্শিত ডিভাইসের কার্যপদ্ধতির বর্ণনা দাও।",
      qD: "নিরাপত্তার সাথে ডেটা ট্রান্সমিশনে উদ্দীপকে উল্লিখিত মাধ্যমটির গুরুত্ব বিশ্লেষণ কর।",
    },
  ],
  "topic-2-6": [
    {
      stem: "জনাব মামুন LTE স্ট্যান্ডার্ডে কাজ করে এমন মোবাইল ফোন ব্যবহার করেন। তিনি তার দুটি অফিসের জন্য IEEE 802.11 এবং IEEE 802.16 স্ট্যান্ডার্ড ব্যবহার করেন। তিনি হেড অফিস হতে 60 km দূরে একটি নতুন অফিস স্থাপন করবেন। [ঢাকা বোর্ড-২০২৫]",
      qA: "রোমিং কী?",
      qB: "অ্যাসিনক্রোনাস ট্রান্সমিশনে Start bit ও Stop bit ব্যবহারের কারণ কী?",
      qC: "জনাব মামুন যে প্রজন্মের মোবাইল ফোন ব্যবহার করেন তার বৈশিষ্ট্য বর্ণনা কর।",
      qD: "হেড অফিস ও নতুন অফিসের মধ্যে নেটওয়ার্ক সংযোগের ক্ষেত্রে IEEE 802.11 ও IEEE 802.16 এর মধ্যে কোনটি উপযুক্ত হবে? বিশ্লেষণ কর।",
    },
    {
      stem: "সারাদেশে EMI প্রভাবমুক্ত ক্যাবলের মাধ্যমে ইন্টারনেট সংযোগ এবং 802.11 standard-এর প্রযুক্তি ব্যবহার করে মোবাইল ফোনে broadband internet ব্যবহার করা হচ্ছে। দুর্গম এলাকায় tower বসিয়ে wireless high speed internet দেওয়া হচ্ছে। [কুমিল্লা বোর্ড-২০২৫]",
      qA: "প্রাইভেট নেটওয়ার্ক কী?",
      qB: "সর্বোচ্চ ৮টি ডিভাইস নিয়ে গঠিত নেটওয়ার্কটি ব্যাখ্যা কর।",
      qC: "উদ্দীপকে উল্লিখিত ক্যাবলটির গঠন বর্ণনা কর।",
      qD: "মোবাইল ফোনে ইন্টারনেট ব্যবহারের প্রযুক্তির সাথে পার্বত্য অঞ্চলে ইন্টারনেট সেবা প্রদানে ব্যবহৃত প্রযুক্তির তুলনামূলক আলোচনা কর।",
    },
    {
      stem: "আইসিটি শিক্ষক IEEE 802.15 standard প্রযুক্তি ব্যবহার করে ছবিগুলো তার মোবাইলে সংগ্রহ করেন। পরবর্তীতে তিনি IEEE 802.11 standard প্রযুক্তির সাহায্যে ছাত্রের মোবাইলে ছবিগুলো প্রেরণ করেন। [বরিশাল বোর্ড-২০২৫]",
      qA: "ব্যান্ডউইথ কী?",
      qB: "ক্লাউড কম্পিউটিংয়ের ব্যবহার সুবিধাজনক - ব্যাখ্যা কর।",
      qC: "আইসিটি শিক্ষক তাঁর মোবাইলে ছবিগুলো সংগ্রহের জন্য কোন প্রযুক্তি ব্যবহার করেন? ব্যাখ্যা কর।",
      qD: "WiMAX এর সাথে নাহিদের মোবাইলে ছবিগুলো স্থানান্তরে ব্যবহৃত প্রযুক্তিটির তুলনামূলক বিশ্লেষণ কর।",
    },
    {
      stem: "সেজুতি অফিসের অভ্যন্তরে ল্যাপটপগুলোকে তারবিহীন প্রযুক্তির মাধ্যমে একটি কেন্দ্রীয় ডিভাইসের সাথে যুক্ত করে ডেটা আদান-প্রদান করে। কিন্তু সে অন্য তারবিহীন প্রযুক্তি ব্যবহার করে বিভিন্ন জেলার শাখা অফিসের সাথে ডেটা আদান-প্রদান করে। [সিলেট বোর্ড-২০২৫]",
      qA: "জিওস্টেশনারি স্যাটেলাইট কী?",
      qB: "ক্লাউড কম্পিউটিং এ গ্রাহকের তথ্যের গোপনীয়তা ভঙ্গ হতে পারে - বুঝিয়ে লেখ।",
      qC: "উদ্দীপকে কোন নেটওয়ার্ক টপোলজিকে নির্দেশ করা হচ্ছে? ব্যাখ্যা কর।",
      qD: "সেজুতির ব্যবহৃত প্রযুক্তি দুটির মধ্যে তুলনামূলক বিশ্লেষণ কর।",
    },
  ],
  "topic-2-8": [
    {
      stem: "রহিমের শাখা অফিসের ১০টি কম্পিউটার একটি সার্ভার কম্পিউটারের মাধ্যমে যুক্ত এবং তাঁর মূল অফিসে ৫০টি কম্পিউটার ৫টি সার্ভার কম্পিউটারের মাধ্যমে যুক্ত। [রাজশাহী বোর্ড-২০২৫]",
      qA: "পিকোনেট কী?",
      qB: "মোবাইল ফোনকে সেলুলার ফোনও বলে- ব্যাখ্যা কর।",
      qC: "উদ্দীপকে শাখা অফিসের নেটওয়ার্ক টপোলজিটি ব্যাখ্যা কর।",
      qD: "সার্ভিস প্রদান ও নিয়ন্ত্রণ কাঠামো অনুযায়ী উদ্দীপকের নেটওয়ার্কের ধরন উল্লেখপূর্বক তুলনামূলক আলোচনা কর।",
    },
  ],
  "topic-2-9": [
    {
      stem: "প্রতিটি ডিভাইসে broadcast করে এমন Device-1 এবং MAC address ব্যবহার করে নির্দিষ্ট port-এ signal পাঠায় এমন Device-2 দেখানো হয়েছে। [ময়মনসিংহ বোর্ড-২০২৫]",
      image: "/chapter2/cq/mymensingh-2025-hub-switch.svg",
      imageAlt: "Device-1 hub এবং Device-2 switch-এর কার্যপদ্ধতির তুলনা",
      qA: "VSAT কী?",
      qB: "IEEE 802.11 ব্যাখ্যা কর।",
      qC: "উদ্দীপকে উল্লিখিত নেটওয়ার্ক টপোলজি ব্যাখ্যা কর।",
      qD: "উদ্দীপকে Device-1 এবং Device-2 এর মধ্যে কোনটি বেশি সুবিধাজনক- বিশ্লেষণ কর।",
    },
  ],
  "topic-2-10": [
    {
      stem: "চিত্র-১, চিত্র-২ এবং চিত্র-৩ এ তিন ধরনের টপোলজি দেখানো হয়েছে। [কুমিল্লা বোর্ড-২০২৫]",
      image: "/chapter2/cq/comilla-2025-topologies.svg",
      imageAlt: "বাস, স্টার ও মেশ টপোলজির তিনটি চিত্র",
      qA: "বিট সিনক্রোনাইজেশন কী?",
      qB: "ভিন্নধর্মী প্রটোকলবিশিষ্ট নেটওয়ার্কের মধ্যে সংযোগ স্থাপনে ব্যবহৃত ডিভাইসটি ব্যাখ্যা কর।",
      qC: "চিত্র-১ এর টপোলজির বর্ণনা দাও।",
      qD: "চিত্র-২ এবং চিত্র-৩ এর মধ্যে কোন টপোলজির ব্যবহার সুবিধাজনক? যুক্তিসহ তোমার মতামত দাও।",
    },
    {
      stem: "কলেজের পাঁচটি কম্পিউটারকে একটি কেন্দ্রীয় ডিভাইসের মাধ্যমে যুক্ত করে একটি নেটওয়ার্ক টপোলজি তৈরি করা হয়। একজন ICT বিশেষজ্ঞ কেন্দ্রীয় ডিভাইসটির পরিবর্তে নতুন একটি ডিভাইস ব্যবহারের সুবিধা ব্যক্ত করলেন। [যশোর বোর্ড-২০২৫]",
      image: "/chapter2/cq/jessore-2025-star-switch.svg",
      imageAlt: "স্টার টপোলজিতে পাঁচটি কম্পিউটার ও কেন্দ্রীয় switch",
      qA: "ব্যান্ড উইথ কী?",
      qB: "স্বল্প দূরত্বের মধ্যে তারবিহীনভাবে দুটি ডিভাইসের মধ্যে ডেটা আদান-প্রদান সম্ভব - ব্যাখ্যা কর।",
      qC: "উদ্দীপকে কলেজটির নেটওয়ার্ক টপোলজিটি বর্ণনা কর।",
      qD: "নেটওয়ার্ক টপোলজির জন্য পূর্বের ডিভাইসের তুলনায় নতুন ডিভাইস ব্যবহারের সুবিধা ব্যাখ্যা কর।",
    },
    {
      stem: "আসাদ ও বাসার দুইটি নেটওয়ার্ক তৈরি করেন। আসাদের নেটওয়ার্কে ডিভাইসগুলো চক্রাকারে পর পর সংযুক্ত থাকে। বাসারের নেটওয়ার্কে প্রতিটি ডিভাইস পরস্পরের সাথে সংযুক্ত থাকে। [বরিশাল বোর্ড-২০২৫]",
      qA: "মোবাইল প্রজন্ম কী?",
      qB: "ভিন্নধর্মী প্রটোকলভুক্ত নেটওয়ার্কে গেটওয়ের ভূমিকা অপরিসীম- ব্যাখ্যা কর।",
      qC: "উদ্দীপকে আসাদের নেটওয়ার্ক কাঠামোটি কোন ধরনের? ব্যাখ্যা কর।",
      qD: "উদ্দীপকে বাসারের নেটওয়ার্ক টপোলজির সাথে স্টার নেটওয়ার্ক টপোলজির তুলনামূলক বিশ্লেষণ কর।",
    },
  ],
  "topic-2-11": [
    {
      stem: "একটি কল সেন্টারে তিনটি LAN নেটওয়ার্ককে ফাইবার অপটিক ক্যাবল দিয়ে একটি নেটওয়ার্ক টপোলজির আওতায় আনা হয়। একটি বিশেষ online সেবামূলক প্রযুক্তির সাহায্যে client-দের 24x7 ঘণ্টা On Demand service দেওয়া হয় এবং Pay as You go পদ্ধতিতে মূল্য পরিশোধ করা যায়। [চট্টগ্রাম বোর্ড-২০২৫]",
      image: "/chapter2/cq/chattogram-2025-lan-cloud.svg",
      imageAlt: "তিনটি LAN ফাইবার ব্যাকবোন এবং cloud service",
      qA: "NIC কী?",
      qB: "গেটওয়েকে প্রটোকল কনভার্টার বলা হয়- ব্যাখ্যা কর।",
      qC: "চিত্র অঙ্কনপূর্বক উদ্দীপকের উল্লিখিত নেটওয়ার্ক টপোলজিটি ব্যাখ্যা কর।",
      qD: "উদ্যোক্তাদের ব্যবসায়িক সুযোগ সৃষ্টিতে উদ্দীপকের online সেবামূলক প্রযুক্তিটি সহায়ক ভূমিকা পালন করবে - বিশ্লেষণ করে মতামত দাও।",
    },
  ],
};

const missingCqImages: Array<[string, Pick<CQ, "image" | "imageAlt">]> = [
  [
    "ডেটা কমিউনিকেশনের মৌলিক উপাদান",
    {
      image: "/chapter2/cq/data-communication-components.svg",
      imageAlt: "ডেটা কমিউনিকেশনের Source, Transmitter, Medium, Receiver এবং Destination",
    },
  ],
  [
    "জনাব মামুন LTE স্ট্যান্ডার্ডে কাজ করে",
    {
      image: "/chapter2/cq/dhaka-2025-wireless-standards.svg",
      imageAlt: "LTE, IEEE 802.11 Wi-Fi এবং IEEE 802.16 WiMAX সংযোগ",
    },
  ],
  [
    "জালাল সাহেব মূল অফিসের ২০ টি কম্পিউটারকে EMI",
    {
      image: "/chapter2/cq/rajshahi-2025-office-network.svg",
      imageAlt: "মূল অফিসের EMI-free fiber, শাখা অফিসের Wi-Fi এবং WiMAX link",
    },
  ],
  [
    "রহিমের শাখা অফিসের ১০টি কম্পিউটার",
    {
      image: "/chapter2/cq/rajshahi-2025-server-networks.svg",
      imageAlt: "শাখা অফিস ও মূল অফিসের server-based network চিত্র",
    },
  ],
  [
    "আসাদ ও বাসার দুইটি নেটওয়ার্ক তৈরি করেন",
    {
      image: "/chapter2/cq/barishal-2025-ring-mesh.svg",
      imageAlt: "আসাদের ring topology এবং বাসারের mesh topology",
    },
  ],
];

const addMissingCqImages = (cqs: CQ[]) =>
  cqs.map(cq => {
    if (cq.image) return cq;
    const match = missingCqImages.find(([needle]) => cq.stem.includes(needle));
    return match ? { ...cq, ...match[1] } : cq;
  });

const withUniqueMcqs = (mcqs: PracticeMCQ[]) => {
  const seen = new Set<string>();
  return mcqs.filter(mcq => {
    const key = `${mcq.q}::${mcq.correct}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const withUniqueShortQuestions = (questions: ShortQuestion[]) => {
  const seen = new Set<string>();
  return questions.filter(question => {
    const key = question.q;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const enhanceChapter2Topic = (topic: Topic): Topic => {
  const baseMcqs =
    topic.id === "topic-2-1" ? topic.practiceMcqs.slice(0, topic1CleanBaseCount) : topic.practiceMcqs;
  const practiceMcqs = withUniqueMcqs([...baseMcqs, ...rowsToMcqs(extraMcqRows[topic.id] ?? [])]);
  const shortQuestions = withUniqueShortQuestions([
    ...topic.shortQuestions,
    ...(extraShortQuestions[topic.id] ?? []),
  ]);
  const boardNotes = addInlineVisuals(topic.id, `${topic.board_notes}\n${noteEnhancements[topic.id] ?? ""}`);

  return {
    ...topic,
    board_notes: boardNotes,
    shortQuestions,
    practiceMcqs,
    cqs: addMissingCqImages([...topic.cqs, ...(cqExtras[topic.id] ?? [])]),
    quizMcqs: generateQuiz(practiceMcqs, 10),
  };
};
