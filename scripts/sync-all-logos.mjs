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
    const destRoot = path.join(DEST_ROOT, `logo-${slug}.png`);

    // Standardize to trimmed transparent PNG
    try {
      const trimmed = await sharp(srcPath).trim().toBuffer();
      fs.writeFileSync(destSub, trimmed);
      fs.writeFileSync(destRoot, trimmed);
    } catch {
      fs.copyFileSync(srcPath, destSub);
      fs.copyFileSync(srcPath, destRoot);
    }
  }

  console.log('[OK] All logos synchronized and standardized!');
}

run().catch(console.error);
