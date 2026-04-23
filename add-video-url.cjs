const fs = require("fs");

let content = fs.readFileSync("src/data/ict-syllabus.ts", "utf8");

// A simple approach: we find all instances of 'board_notes' and check if 'video_url' follows.
// Or even simpler: let's use a regex to see if any topic is missing video_url.
// A topic usually has an 'id' containing 'topic-', then a 'title', 'thumbnail', 'board_notes', etc.

let updated = content.replace(/(board_notes:\s*[\s\S]*?,)(?!\s*video_url:)/g, '$1\n        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",');
updated = updated.replace(/("board_notes":\s*[\s\S]*?,)(?!\s*"video_url":)/g, '$1\n            "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",');

if (updated !== content) {
    fs.writeFileSync("src/data/ict-syllabus.ts", updated, "utf8");
    console.log("Updated missing video_urls.");
} else {
    console.log("No missing video_urls found or regex didn't match.");
}
