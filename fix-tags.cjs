const fs = require('fs');
const path = require('path');

const topicsDir = 'd:/ict_final_website/welcome-to-ict/src/data/chapters/chapter1';

// Fix topic 1 and topic 2 (append [Self Practice] where missing)
['topic1', 'topic2'].forEach(topic => {
  ['mcqs.ts', 'questions.ts'].forEach(file => {
    const filePath = path.join(topicsDir, topic, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    const modifiedContent = content.replace(/q:\s*"([^"]+)"/g, (match, p1) => {
      if (!p1.includes('[')) {
        return `q: "${p1} [Self Practice]"`;
      }
      return match;
    });

    if (content !== modifiedContent) {
      fs.writeFileSync(filePath, modifiedContent, 'utf8');
      console.log(`Updated missing tags in ${topic}/${file}`);
    }
  });
});

// Fix topic 3 and topic 4 MCQs (replace fake tags with [Self Practice])
['topic3', 'topic4'].forEach(topic => {
  const file = 'mcqs.ts';
  const filePath = path.join(topicsDir, topic, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const modifiedContent = content.replace(/q:\s*"([^"]+)\[[^\]]+\]"/g, 'q: "$1[Self Practice]"');

  if (content !== modifiedContent) {
    fs.writeFileSync(filePath, modifiedContent, 'utf8');
    console.log(`Replaced fake tags in ${topic}/${file}`);
  }
});

// Also fix topic3/questions.ts missing tags just in case
['topic3', 'topic4'].forEach(topic => {
  const file = 'questions.ts';
  const filePath = path.join(topicsDir, topic, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const modifiedContent = content.replace(/q:\s*"([^"]+)"/g, (match, p1) => {
    if (!p1.includes('[')) {
      return `q: "${p1} [Self Practice]"`;
    }
    return match;
  });

  if (content !== modifiedContent) {
    fs.writeFileSync(filePath, modifiedContent, 'utf8');
    console.log(`Updated missing tags in ${topic}/${file}`);
  }
});
