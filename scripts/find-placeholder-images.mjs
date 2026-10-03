import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const targetBuf = fs.readFileSync('public/avatars/chainsaw-man/teeth-devil.png');
const targetHash = crypto.createHash('md5').update(targetBuf).digest('hex');

console.log('Target hash for teeth-devil placeholder:', targetHash);

async function findPlaceholders() {
  const baseDir = path.resolve('public/avatars');
  const animes = fs.readdirSync(baseDir);
  const matches = [];
  const allImages = [];

  for (const anime of animes) {
    const animePath = path.join(baseDir, anime);
    if (!fs.statSync(animePath).isDirectory()) continue;

    const files = fs.readdirSync(animePath);
    for (const f of files) {
      if (!f.endsWith('.png') && !f.endsWith('.jpg') && !f.endsWith('.webp')) continue;
      const fullPath = path.join(animePath, f);
      const buf = fs.readFileSync(fullPath);
      const hash = crypto.createHash('md5').update(buf).digest('hex');

      allImages.push({ anime, file: f, path: fullPath, hash, size: buf.length });

      if (hash === targetHash) {
        matches.push({ anime, file: f, path: fullPath });
      }
    }
  }

  console.log(`Scanned ${allImages.length} avatar files. Exact teeth-devil matches: ${matches.length}`);
  console.log(matches);

  // Also check for duplicate hashes across different characters (which could be other placeholders)
  const hashMap = new Map();
  for (const img of allImages) {
    if (!hashMap.has(img.hash)) hashMap.set(img.hash, []);
    hashMap.get(img.hash).push(img);
  }

  console.log('\n=== POTENTIAL PLACEHOLDER GROUPS (Duplicates) ===');
  for (const [hash, group] of hashMap.entries()) {
    if (group.length > 1) {
      console.log(`Hash ${hash} (count: ${group.length}, size: ${group[0].size} bytes):`);
      for (const item of group) {
        console.log(`  - ${item.anime}/${item.file}`);
      }
    }
  }
}

findPlaceholders();
