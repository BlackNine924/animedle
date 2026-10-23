import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CARDS_SRC_DIR = 'C:/Users/User/Downloads/cards_anime_10_1024x1536';
const WALLPAPERS_SRC_DIR = 'C:/Users/User/Downloads/Wallpapers anime';

const DEST_PUBLIC_CARDS = 'public/cards';
const DEST_DIST_CARDS = 'dist/cards';

const DEST_PUBLIC_WALLPAPERS = 'public/wallpapers';
const DEST_DIST_WALLPAPERS = 'dist/wallpapers';

const CARD_MAP = [
  ['Black Clover Card.png',            'black-clover'],
  ['Blue Lock Card.png',               'blue-lock'],
  ['Bungo Stray Dogs Card.png',        'bungo-stray-dogs'],
  ['Classroom of The Elite Card.png',  'classroom-of-the-elite'],
  ['Code Geass Card.png',              'code-geass'],
  ['Dragon Ball Card.png',             'dragon-ball'],
  ['Gintama Card.png',                 'gintama'],
  ['Haikyuu Card.png',                 'haikyuu'],
  ['Inuyasha Card.png',                'inuyasha'],
  ['Konosuba Card.png',                'konosuba'],
  ['Monster Card.png',                 'monster'],
  ['Neon Genesis Evangelion Card.png', 'neon-genesis-evangelion'],
  ['ReZero Card.png',                  're-zero'],
  ['Sakamoto Days Card.png',           'sakamoto-days'],
  ['Soul Eater Card.png',              'soul-eater'],
  ['Sword Art Online Card.png',        'sword-art-online'],
  ['The Promissed Neverland Card.png', 'the-promised-neverland'],
  ['Tokyo Ghoul Card.png',             'tokyo-ghoul'],
  ['Yu Yu Hakusho Card.png',           'yu-yu-hakusho']
];

const WALLPAPER_MAP = [
  ['Fate Wallpaper.png',               'fate'],
  ['Nanatsu No Taizai Wallpaper.png',  'nanatsu-no-taizai'],
  ['One Piece Wallpaper.png',          'one-piece'],
  ['Romance Wallpaper.png',            'romance'],
  ['Tokyo Revengers Wallpaper.png',    'tokyo-revengers']
];

const TARGET_FRAME_W = 1016;
const TARGET_FRAME_H = 1532;
const CANVAS_W = 1024;
const CANVAS_H = 1536;
const POS_X = 4;
const POS_Y = 2;

async function standardizeCard(srcFile, slug) {
  const srcPath = path.join(CARDS_SRC_DIR, srcFile);
  if (!fs.existsSync(srcPath)) {
    console.error(`Card file not found: ${srcPath}`);
    return;
  }

  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });

  let minY = info.height, maxY = 0;
  for (let y = 0; y < info.height; y++) {
    let nonBlackCount = 0;
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx] > 32 || data[idx+1] > 32 || data[idx+2] > 32) nonBlackCount++;
    }
    if (nonBlackCount >= 15) {
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  let minX = info.width, maxX = 0;
  for (let x = 0; x < info.width; x++) {
    let nonBlackCount = 0;
    for (let y = 0; y < info.height; y++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx] > 32 || data[idx+1] > 32 || data[idx+2] > 32) nonBlackCount++;
    }
    if (nonBlackCount >= 15) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }

  if (minX >= maxX || minY >= maxY) {
    minX = 0; maxX = info.width - 1; minY = 0; maxY = info.height - 1;
  }

  const frameW = maxX - minX + 1;
  const frameH = maxY - minY + 1;

  const extractedFrame = await sharp(srcPath)
    .extract({ left: minX, top: minY, width: frameW, height: frameH })
    .resize(TARGET_FRAME_W, TARGET_FRAME_H, { fit: 'fill', kernel: 'lanczos3' })
    .toBuffer();

  const canvas = await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: extractedFrame, left: POS_X, top: POS_Y }])
  .raw()
  .toBuffer({ resolveWithObject: true });

  const cData = canvas.data;
  const cW = CANVAS_W;
  const cH = CANVAS_H;

  const visited = new Uint8Array(cW * cH);
  const queue = [];

  function add(x, y) {
    const idx = y * cW + x;
    if (!visited[idx]) {
      visited[idx] = 1;
      queue.push(x, y);
    }
  }

  for (let x = 0; x < cW; x++) {
    add(x, 0);
    add(x, cH - 1);
  }
  for (let y = 0; y < cH; y++) {
    add(0, y);
    add(cW - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const ci = (cy * cW + cx) * 4;
    const lum = 0.299 * cData[ci] + 0.587 * cData[ci+1] + 0.114 * cData[ci+2];

    if (lum < 38) {
      if (cx > 0) add(cx - 1, cy);
      if (cx < cW - 1) add(cx + 1, cy);
      if (cy > 0) add(cx, cy - 1);
      if (cy < cH - 1) add(cx, cy + 1);
    }
  }

  for (let i = 0; i < cW * cH; i++) {
    if (visited[i]) {
      const ci = i * 4;
      const lum = 0.299 * cData[ci] + 0.587 * cData[ci+1] + 0.114 * cData[ci+2];
      if (lum < 22) {
        cData[ci + 3] = 0;
      } else {
        cData[ci + 3] = Math.min(255, Math.round(((lum - 22) / 16) * 255));
      }
    }
  }

  const finalPng = await sharp(cData, { raw: { width: cW, height: cH, channels: 4 } })
    .png({ quality: 95, compressionLevel: 7 })
    .toBuffer();

  const finalWebp = await sharp(finalPng)
    .webp({ quality: 90 })
    .toBuffer();

  const writeSafe = (targetPath, buffer) => {
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        fs.writeFileSync(targetPath, buffer);
        return;
      } catch (e) {
        if (attempt === 4) throw e;
        const start = Date.now();
        while (Date.now() - start < 200) {}
      }
    }
  };

  writeSafe(path.join(DEST_PUBLIC_CARDS, `${slug}.png`), finalPng);
  writeSafe(path.join(DEST_PUBLIC_CARDS, `${slug}.webp`), finalWebp);

  if (fs.existsSync(DEST_DIST_CARDS)) {
    writeSafe(path.join(DEST_DIST_CARDS, `${slug}.png`), finalPng);
    writeSafe(path.join(DEST_DIST_CARDS, `${slug}.webp`), finalWebp);
  }

  console.log(`✓ Card standardized: ${slug} (detected frame: ${frameW}x${frameH} -> 1016x1532)`);
}

async function standardizeWallpaper(srcFile, slug) {
  const srcPath = path.join(WALLPAPERS_SRC_DIR, srcFile);
  if (!fs.existsSync(srcPath)) {
    console.error(`Wallpaper file not found: ${srcPath}`);
    return;
  }

  // Resize cleanly to standard 1920x1080 (16:9)
  const pngBuffer = await sharp(srcPath)
    .resize(1920, 1080, { fit: 'cover', position: 'center' })
    .png({ quality: 95 })
    .toBuffer();

  const webpBuffer = await sharp(pngBuffer)
    .webp({ quality: 90 })
    .toBuffer();

  const writeSafe = (targetPath, buffer) => {
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        fs.writeFileSync(targetPath, buffer);
        return;
      } catch (e) {
        if (attempt === 4) throw e;
        const start = Date.now();
        while (Date.now() - start < 200) {}
      }
    }
  };

  writeSafe(path.join(DEST_PUBLIC_WALLPAPERS, `${slug}.png`), pngBuffer);
  writeSafe(path.join(DEST_PUBLIC_WALLPAPERS, `${slug}.webp`), webpBuffer);

  if (fs.existsSync(DEST_DIST_WALLPAPERS)) {
    writeSafe(path.join(DEST_DIST_WALLPAPERS, `${slug}.png`), pngBuffer);
    writeSafe(path.join(DEST_DIST_WALLPAPERS, `${slug}.webp`), webpBuffer);
  }

  console.log(`✓ Wallpaper updated: ${slug} (1920x1080)`);
}

async function main() {
  console.log('=== STANDARDIZING & UPDATING CARDS ===');
  for (const [file, slug] of CARD_MAP) {
    await standardizeCard(file, slug);
  }

  console.log('\n=== UPDATING NEW WALLPAPERS ===');
  for (const [file, slug] of WALLPAPER_MAP) {
    await standardizeWallpaper(file, slug);
  }

  console.log('\nAll cards and wallpapers processed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
