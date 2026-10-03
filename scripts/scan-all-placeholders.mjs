import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function scanForPlaceholders() {
  const baseDir = path.resolve('public/avatars');
  const animes = fs.readdirSync(baseDir);
  const letterPlaceholders = [];
  const noImagePlaceholders = [];

  for (const anime of animes) {
    const animePath = path.join(baseDir, anime);
    if (!fs.statSync(animePath).isDirectory()) continue;

    const files = fs.readdirSync(animePath);
    for (const f of files) {
      if (!f.endsWith('.png')) continue;
      const fullPath = path.join(animePath, f);
      const buf = fs.readFileSync(fullPath);

      // Check for teeth-devil placeholder (size ~4588 bytes, or MD5 954c3571295d0b18de4ccc501b3794b3)
      if (buf.length >= 4500 && buf.length <= 4700) {
        noImagePlaceholders.push({ anime, file: f });
      }

      // Check for letter SVG placeholders (they have round circle rx=120, transparent corners if not flattened, or exact file sizes ~8-12KB)
      // We can check pixel at (5, 5) which is transparent in the letter SVGs!
      try {
        const img = sharp(buf);
        const meta = await img.metadata();
        const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
        // (0,0) pixel in raw buffer
        // If 4 channels and alpha at (0,0) is 0:
        if (info.channels === 4 && data[3] === 0) {
          // Check center pixel vs corner pixel
          const centerAlpha = data[(120 * info.width + 120) * info.channels + 3];
          if (centerAlpha > 200) {
            letterPlaceholders.push({ anime, file: f, reason: 'round_corner_transparent' });
          }
        }
      } catch (e) {}
    }
  }

  console.log(`Found ${noImagePlaceholders.length} "No Image Available" placeholders:`);
  console.log(noImagePlaceholders);

  console.log(`Found ${letterPlaceholders.length} letter/circular SVG placeholders:`);
  console.log(letterPlaceholders);
}

scanForPlaceholders();
