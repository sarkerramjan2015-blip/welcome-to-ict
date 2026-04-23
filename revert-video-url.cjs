const fs = require("fs");

let content = fs.readFileSync("src/data/ict-syllabus.ts", "utf8");

content = content.replace(/\n        video_url: "https:\/\/www\.youtube\.com\/embed\/dQw4w9WgXcQ",/g, "");
content = content.replace(/\n            "video_url": "https:\/\/www\.youtube\.com\/embed\/dQw4w9WgXcQ",/g, "");

fs.writeFileSync("src/data/ict-syllabus.ts", content, "utf8");
console.log("Reverted accidental video_url injections!!");
