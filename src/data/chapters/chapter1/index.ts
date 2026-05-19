import type { Chapter } from "../../ict-syllabus.js";
import { topic1 } from "./topic1/index.js";
import { topic2 } from "./topic2/index.js";
import { topic3 } from "./topic3/index.js";
import { topic4 } from "./topic4/index.js";
import { topic5 } from "./topic5/index.js";
import { topic6 } from "./topic6/index.js";
import { topic7 } from "./topic7/index.js";
import { topic8 } from "./topic8/index.js";
import { topic9 } from "./topic9/index.js";

export const chapter1: Chapter = {
  id: "chap-1",
  title: "অধ্যায় ১: তথ্য ও যোগাযোগ প্রযুক্তি: বিশ্ব ও বাংলাদেশ প্রেক্ষিত",
  description:
    "বাংলাদেশের প্রেক্ষাপটে তথ্য ও যোগাযোগ প্রযুক্তির ব্যবহার এবং বিশ্বব্যাপী এর প্রভাব আলোচনা করা হয়েছে।",
  topics: [
    topic1,
    topic2,
    topic3,
    topic4,
    topic5,
    topic6,
    topic7,
    topic8,
    topic9,
  ],
};
