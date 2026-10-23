import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function check() {
  const dir = 'C:/Users/User/Downloads/Wallpapers anime';
  const files = fs.readdirSync(dir);
  console.log('--- WALLPAPERS IN DOWNLOADS ---');
  for (const f of files) {
    if (f.endsWith('.png') || f.endsWith('.jpg')) {
      const meta = await sharp(path.join(dir, f)).metadata();
      console.log(`${f.padEnd(45)}: ${meta.width}x${meta.height} (${meta.format})`);
    }
  }

  const cardsDir = 'C:/Users/User/Downloads/cards_anime_10_1024x1536';
  const cardFiles = fs.readdirSync(cardsDir);
  console.log('\n--- CARDS IN DOWNLOADS ---');
  for (const f of cardFiles) {
    if (f.endsWith('.png') || f.endsWith('.jpg')) {
      const meta = await sharp(path.join(cardsDir, f)).metadata();
      console.log(`${f.padEnd(40)}: ${meta.width}x${meta.height} (${meta.format})`);
    }
  }
}

check();
