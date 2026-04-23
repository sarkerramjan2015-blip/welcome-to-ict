const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
      file = dir + '/' + file;
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) { 
          results = results.concat(walkDir(file));
      } else {
          if (file.endsWith('.tsx')) {
              results.push(file);
          }
      }
  });
  return results;
}

function restoreWhiteTextOnSolidBackgrounds(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Revert buttons and elements with solid generic backgrounds
  const solidBgRegex = /(bg-(?:sky|blue|indigo|green|emerald|red|pink|purple|teal)-(?:500|600)|from-(?:sky|blue|indigo|green|emerald|red|pink|purple|teal)-(?:500|600))([^>]*?)text-slate-900 dark:text-white/g;
  
  // Keep replacing until no more matches
  let prevContent;
  do {
      prevContent = content;
      content = content.replace(solidBgRegex, '$1$2text-white');
  } while (content !== prevContent);

  // Restore the live badge specifically
  content = content.replace(/bg-red-500 text-slate-900 dark:text-white/g, 'bg-red-500 text-white');

  fs.writeFileSync(filePath, content, 'utf-8');
}

const files = walkDir('./src');
files.forEach(restoreWhiteTextOnSolidBackgrounds);
console.log('Restoration complete.');
