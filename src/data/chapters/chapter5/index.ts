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

export const chapter5: Chapter = {
  id: "chapter-5",
  title: "অধ্যায় ৫: প্রোগ্রামিং ভাষা",
  description:
    "সি প্রোগ্রামিং ভাষা, অ্যালগরিদম, ফ্লোচার্ট, ডেটা টাইপ, অপারেটর এবং কন্ট্রোল স্টেটমেন্টের ধারণা দেওয়া হয়েছে।",
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
  ],
};
