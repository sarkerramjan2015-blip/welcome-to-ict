const fs = require('fs');
const file = './src/data/ict-syllabus.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/photo-1627398225081-24c89544eb1a/g, 'photo-1498050108023-c5249f4df085');
fs.writeFileSync(file, content);
console.log('Replaced broken image URLs');
