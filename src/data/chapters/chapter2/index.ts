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
import { topic10 } from "./topic10/index.js";
import { topic11 } from "./topic11/index.js";
import { enhanceChapter2Topic } from "./enhancements.js";

export const chapter2: Chapter = {
  id: "chap-2",
  title: "অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং",
  description:
    "ডেটা কমিউনিকেশন, ট্রান্সমিশন মিডিয়া, নেটওয়ার্কিং এবং মোবাইল যোগাযোগ ব্যবস্থার ধারণা ও প্রকারভেদ আলোচনা করা হয়েছে।",
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
    topic10,
    topic11,
  ].map(enhanceChapter2Topic),
};
