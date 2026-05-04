const fs = require('node:fs');
const sharp = require('sharp');

const outputs = [
  {
    input: 'src/asset/bio_image.png',
    output: 'src/asset/bio_image-mentor.webp',
    transform: image => image.rotate().resize({ width: 384, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }),
  },
  {
    input: 'public/logo.jpeg',
    output: 'public/logo-128.webp',
    transform: image => image.rotate().resize(128, 128, { fit: 'cover' }).webp({ quality: 76, effort: 6 }),
  },
  {
    input: 'public/logo.jpeg',
    output: 'public/logo-256.webp',
    transform: image => image.rotate().resize(256, 256, { fit: 'cover' }).webp({ quality: 78, effort: 6 }),
  },
];

(async () => {
  for (const item of outputs) {
    await item.transform(sharp(item.input)).toFile(item.output);
    const metadata = await sharp(item.output).metadata();
    const sizeKiB = (fs.statSync(item.output).size / 1024).toFixed(1);
    console.log(`${item.output}\t${metadata.width}x${metadata.height}\t${sizeKiB} KiB`);
  }
})().catch(error => {
  console.error(error);
  process.exit(1);
});
