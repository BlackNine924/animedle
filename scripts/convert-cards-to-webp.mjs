import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'public/cards';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

console.log(`Converting ${files.length} cards to optimized WebP...`);

async function convertAll() {
  let totalPng = 0;
  let totalWebp = 0;

  for (const f of files) {
    const pngPath = path.join(dir, f);
    const webpPath = path.join(dir, f.replace('.png', '.webp'));

    const pngSize = fs.statSync(pngPath).size;
    totalPng += pngSize;

    await sharp(pngPath)
      .webp({ quality: 85, effort: 4 })
      .toFile(webpPath);

    const webpSize = fs.statSync(webpPath).size;
    totalWebp += webpSize;

    console.log(`${f.padEnd(32)} -> ${(webpSize/1024).toFixed(1)} KB (was ${(pngSize/1024).toFixed(1)} KB)`);
  }

  console.log(`\nConversion complete!`);
  console.log(`Total PNG: ${(totalPng/(1024*1024)).toFixed(2)} MB`);
  console.log(`Total WebP: ${(totalWebp/(1024*1024)).toFixed(2)} MB`);
  console.log(`Total saved: ${(((totalPng - totalWebp) / totalPng) * 100).toFixed(1)}%`);
}

convertAll().catch(err => {
  console.error(err);
  process.exit(1);
});
