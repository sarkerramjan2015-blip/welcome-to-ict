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

export const chapter4: Chapter = {
  id: "chap-4",
  title: "অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি এবং HTML",
  description:
    "ওয়েব ডিজাইন, HTML ট্যাগ, সিনট্যাক্স এবং ওয়েবপেইজ পাবলিশিং এর মৌলিক বিষয়গুলো আলোচনা করা হয়েছে।",
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
