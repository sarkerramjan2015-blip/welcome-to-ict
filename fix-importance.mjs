import fs from 'fs';
for (let c=1; c<=6; c++) {
  for (let i=1; i<=20; i++) {
    const metaPath = `src/data/chapters/chapter${c}/topic${i}/meta.ts`;
    if (fs.existsSync(metaPath)) {
      let meta = fs.readFileSync(metaPath, 'utf8');
      if (meta.includes('importance: "",')) {
          meta = meta.replace(/importance:\s*"",\r?\n/, '');
      }
      fs.writeFileSync(metaPath, meta);
    }
  }
}
console.log('Fixed empty importance properties.');
