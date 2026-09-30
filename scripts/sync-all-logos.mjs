import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_LOGOS = 'C:/Users/User/Downloads/ANIMEDLE/Logos';
const DEST_LOGOS = 'public/logos';
const DEST_ROOT = 'public';

fs.mkdirSync(DEST_LOGOS, { recursive: true });

function norm(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  const files = fs.readdirSync(SRC_LOGOS);
  console.log(`Syncing ${files.length} logos from ${SRC_LOGOS}...`);

  for (const file of files) {
    if (!file.endsWith('.png')) continue;
    const srcPath = path.join(SRC_LOGOS, file);

    // derive slug from filename (e.g. "Shangri-La Frontier Logo.png" -> "shangri-la-frontier")
    let slug = file
      .replace(/\s*Logo\s*\.png$/i, '')
      .replace(/\.png$/i, '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Common manual aliases
    if (slug === 'boku-no-hero') slug = 'my-hero-academia';
    if (slug === 'sousou-no-frieren') slug = 'frieren';
    if (slug === 'jojo-s') slug = 'jojos-bizarre-adventure';
    if (slug === 'tokyo-revergers') slug = 'tokyo-revengers';
    if (slug === 'the-promissed-neverland') slug = 'the-promised-neverland';
    if (slug === 'record-of-ragnarok') slug = 'record-of-ragnarok';

    const destSub = path.join(DEST_LOGOS, `${slug}.png`);
    const destWebp = path.join(DEST_LOGOS, `${slug}.webp`);
    const destRoot = path.join(DEST_ROOT, `logo-${slug}.png`);

    try {
      const meta = await sharp(srcPath).metadata();
      let img = sharp(srcPath);

      // If logo has no alpha channel or is 3-channel RGB (black background)
      if (!meta.hasAlpha || meta.channels === 3) {
        const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
        const rgba = Buffer.alloc(info.width * info.height * 4);
        for (let i = 0; i < info.width * info.height; i++) {
          const r = data[i * info.channels];
          const g = data[i * info.channels + 1];
          const b = data[i * info.channels + 2];
          const max = Math.max(r, g, b);
          rgba[i * 4] = r;
          rgba[i * 4 + 1] = g;
          rgba[i * 4 + 2] = b;
          if (max < 8) {
            rgba[i * 4 + 3] = 0;
          } else if (max < 32) {
            rgba[i * 4 + 3] = Math.round(((max - 8) / 24) * 255);
          } else {
            rgba[i * 4 + 3] = 255;
          }
        }
        img = sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } });
      }

      const trimmedPng = await img.clone().trim().png({ quality: 95 }).toBuffer();
      const trimmedWebp = await img.clone().trim().webp({ quality: 95 }).toBuffer();

      fs.writeFileSync(destSub, trimmedPng);
      fs.writeFileSync(destWebp, trimmedWebp);
      fs.writeFileSync(destRoot, trimmedPng);
    } catch {
      fs.copyFileSync(srcPath, destSub);
      fs.copyFileSync(srcPath, destRoot);
    }
  }

  console.log('[OK] All logos synchronized, background-cleared, and standardized to PNG & WebP!');
}

run().catch(console.error);
