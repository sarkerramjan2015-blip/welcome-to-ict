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

function applyDarkMode(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  content = content.replace(/(?<![:-])text-white\b/g, 'text-slate-900 dark:text-white');
  content = content.replace(/(?<![:-])text-slate-50\b/g, 'text-slate-900 dark:text-slate-50');
  content = content.replace(/(?<![:-])bg-slate-900(?!\/)\b/g, 'bg-slate-50 dark:bg-slate-900');
  content = content.replace(/(?<![:-])bg-slate-900\/50\b/g, 'bg-slate-50/50 dark:bg-slate-900/50');
  content = content.replace(/(?<![:-])bg-slate-900\/80\b/g, 'bg-slate-50/80 dark:bg-slate-900/80');
  content = content.replace(/(?<![:-])bg-slate-950(?!\/)\b/g, 'bg-slate-100 dark:bg-slate-950');
  content = content.replace(/(?<![:-])bg-slate-950\/80\b/g, 'bg-slate-100/80 dark:bg-slate-950/80');
  content = content.replace(/(?<![:-])bg-white\/10\b/g, 'bg-slate-900/5 dark:bg-white/10');
  content = content.replace(/(?<![:-])bg-white\/5\b/g, 'bg-slate-900/5 dark:bg-white/5');
  content = content.replace(/(?<![:-])border-white\/20\b/g, 'border-slate-900/10 dark:border-white/20');
  content = content.replace(/(?<![:-])border-white\/10\b/g, 'border-slate-900/10 dark:border-white/10');
  content = content.replace(/(?<![:-])border-white\/5\b/g, 'border-slate-900/5 dark:border-white/5');
  content = content.replace(/(?<![:-])text-gray-300\b/g, 'text-slate-600 dark:text-gray-300');
  content = content.replace(/(?<![:-])text-gray-400\b/g, 'text-slate-500 dark:text-gray-400');
  content = content.replace(/(?<![:-])text-slate-300\b/g, 'text-slate-600 dark:text-slate-300');
  content = content.replace(/(?<![:-])text-slate-400\b/g, 'text-slate-500 dark:text-slate-400');
  content = content.replace(/(?<![:-])group-hover:text-white\b/g, 'group-hover:text-slate-900 dark:group-hover:text-white');
  content = content.replace(/(?<![:-])from-slate-900\b/g, 'from-slate-100 dark:from-slate-900');
  content = content.replace(/(?<![:-])to-slate-900\b/g, 'to-slate-100 dark:to-slate-900');
  content = content.replace(/(?<![:-])from-indigo-950\b/g, 'from-indigo-100 dark:from-indigo-950');
  content = content.replace(/(?<![:-])to-indigo-950\b/g, 'to-indigo-50 dark:to-indigo-950');
  content = content.replace(/(?<![:-])from-slate-800\b/g, 'from-white dark:from-slate-800');
  content = content.replace(/(?<![:-])to-indigo-900\b/g, 'to-indigo-100 dark:to-indigo-900');
  content = content.replace(/(?<![:-])group-hover:from-slate-800\b/g, 'group-hover:from-white dark:group-hover:from-slate-800');
  content = content.replace(/(?<![:-])group-hover:to-indigo-900\b/g, 'group-hover:to-indigo-100 dark:group-hover:to-indigo-900');
  content = content.replace(/(?<![:-])hover:bg-white\/10\b/g, 'hover:bg-slate-900/10 dark:hover:bg-white/10');
  content = content.replace(/(?<![:-])hover:bg-white\/20\b/g, 'hover:bg-slate-900/20 dark:hover:bg-white/20');
  content = content.replace(/(?<![:-])bg-white\/20\b/g, 'bg-slate-900/10 dark:bg-white/20');
  content = content.replace(/(?<![:-])hover:text-white\b/g, 'hover:text-slate-900 dark:hover:text-white');

  fs.writeFileSync(filePath, content, 'utf-8');
}

const files = walkDir('./src');
files.forEach(applyDarkMode);
console.log('Update complete.');
