import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const chars = JSON.parse(fs.readFileSync('src/data/animes/romance/characters.json'));

async function inspectRomance() {
  console.log(`Checking ${chars.length} romance avatars...`);
  for (const c of chars) {
    const p = path.resolve('public', c.avatar.replace(/^\//, ''));
    if (!fs.existsSync(p)) {
      console.log(`[MISSING] ${c.id}`);
      continue;
    }
  }
  console.log('All romance avatar files exist.');
}

inspectRomance();
