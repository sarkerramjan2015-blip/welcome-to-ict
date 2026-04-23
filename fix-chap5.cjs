const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'ict-syllabus.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The description property is at line 4139 or so. Let's just remove it from the JSON.
// We can parse the file, but since it's a TS file, we can't easily parse it as JSON.
// Let's use regex to remove the "description": "..." line from chapter-5.

content = content.replace(/"description": "সি প্রোগ্রামিং, অ্যালগরিদম, ফ্লোচার্ট এবং প্রোগ্রামিং এর মৌলিক ধারণাসমূহ।",\n/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Removed description property');
