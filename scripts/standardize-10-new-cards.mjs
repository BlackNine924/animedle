import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = 'C:/Users/User/Downloads/cards_anime_10_1024x1536';
const DEST_PUBLIC = 'public/cards';
const DEST_DIST = 'dist/cards';
const DEST_PADRONIZADOS = 'C:/Users/User/Downloads/ANIMEDLE/Cards_Padronizados';

const CARD_MAP = [
  ['Bungo Stray Dogs Card.png',        'bungo-stray-dogs'],
  ['Classroom of The Elite Card.png',  'classroom-of-the-elite'],
  ['Code Geass Card.png',              'code-geass'],
  ['Gintama Card.png',                 'gintama'],
  ['Inuyasha Card.png',                'inuyasha'],
  ['Konosuba Card.png',                'konosuba'],
  ['Monster Card.png',                 'monster'],
  ['Neon Genesis Evangelion Card.png', 'neon-genesis-evangelion'],
  ['ReZero Card.png',                  're-zero'],
  ['The Promissed Neverland Card.png', 'the-promised-neverland']
];

const TARGET_FRAME_W = 1016;
const TARGET_FRAME_H = 1532;
const CANVAS_W = 1024;
const CANVAS_H = 1536;
const POS_X = 4;
const POS_Y = 2;

async function standardizeOne(srcFile, slug) {
  const srcPath = path.join(SRC_DIR, srcFile);
  if (!fs.existsSync(srcPath)) {
    console.error(`File not found: ${srcPath}`);
    return;
  }

  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });

  // 1. Detect frame bounds
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

  // 2. Extract frame & scale to standard card size
  const extractedFrame = await sharp(srcPath)
    .extract({ left: minX, top: minY, width: frameW, height: frameH })
    .resize(TARGET_FRAME_W, TARGET_FRAME_H, { fit: 'fill', kernel: 'lanczos3' })
    .toBuffer();

  // 3. Composite onto transparent 1024x1536 canvas
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

  // 4. Flood fill outer corners to transparent
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

  // 5. Generate PNG & WebP
  const finalPng = await sharp(cData, { raw: { width: cW, height: cH, channels: 4 } })
    .png({ quality: 95, compressionLevel: 7 })
    .toBuffer();

  const finalWebp = await sharp(finalPng)
    .webp({ quality: 90 })
    .toBuffer();

  // Save to public/cards
  fs.writeFileSync(path.join(DEST_PUBLIC, `${slug}.png`), finalPng);
  fs.writeFileSync(path.join(DEST_PUBLIC, `${slug}.webp`), finalWebp);

  // Save to dist/cards
  if (fs.existsSync(DEST_DIST)) {
    fs.writeFileSync(path.join(DEST_DIST, `${slug}.png`), finalPng);
    fs.writeFileSync(path.join(DEST_DIST, `${slug}.webp`), finalWebp);
  }

  // Save to Downloads/Cards_Padronizados
  if (fs.existsSync(DEST_PADRONIZADOS)) {
    fs.writeFileSync(path.join(DEST_PADRONIZADOS, `${slug}.png`), finalPng);
  }

  console.log(`✓ Standardized: ${slug} (orig: ${frameW}x${frameH} -> frame: ${TARGET_FRAME_W}x${TARGET_FRAME_H})`);
}

async function main() {
  console.log('Standardizing all 10 new cards to eliminate black side bars & enable transparency...');
  for (const [srcFile, slug] of CARD_MAP) {
    await standardizeOne(srcFile, slug);
  }
  console.log('All 10 cards standardized perfectly!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
