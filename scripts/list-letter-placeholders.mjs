import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function listAllPlaceholders() {
  const baseDir = path.resolve('public/avatars');
  const animes = fs.readdirSync(baseDir);
  const letterList = [];

  for (const anime of animes) {
    const animePath = path.join(baseDir, anime);
    if (!fs.statSync(animePath).isDirectory()) continue;

    const files = fs.readdirSync(animePath);
    for (const f of files) {
      if (!f.endsWith('.png')) continue;
      const fullPath = path.join(animePath, f);
      const buf = fs.readFileSync(fullPath);

      try {
        const img = sharp(buf);
        const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
        if (info.channels === 4 && data[3] === 0) {
          const centerAlpha = data[(120 * info.width + 120) * info.channels + 3];
          if (centerAlpha > 200) {
            letterList.push({ anime, id: f.replace('.png', ''), file: f, path: fullPath });
          }
        }
      } catch (e) {}
    }
  }

  console.log(`Total letter SVG placeholders: ${letterList.length}`);
  const byAnime = {};
  for (const item of letterList) {
    if (!byAnime[item.anime]) byAnime[item.anime] = [];
    byAnime[item.anime].push(item.id);
  }
  for (const [anime, ids] of Object.entries(byAnime)) {
    console.log(`${anime} (${ids.length}): ${ids.join(', ')}`);
  }

  fs.writeFileSync('scripts/letter-placeholders.json', JSON.stringify(byAnime, null, 2));
}

listAllPlaceholders();
