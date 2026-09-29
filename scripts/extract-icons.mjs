import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ICONS_DIR = 'C:/Users/User/Downloads/ANIMEDLE/Icons';
const OUT_DIR = 'public/icons';

fs.mkdirSync(OUT_DIR, { recursive: true });

const ICONS_CONFIG = [
  { name: 'Attack On Titan', slug: 'attack-on-titan', kit: 3, col: 3, row: 2 },
  { name: 'Black Clover', slug: 'black-clover', kit: 4, col: 1, row: 3 },
  { name: 'Berserk', slug: 'berserk', kit: 2, col: 2, row: 1 },
  { name: 'Bleach', slug: 'bleach', kit: 3, col: 4, row: 2 },
  { name: 'Blue Lock', slug: 'blue-lock', kit: 3, col: 1, row: 5 },
  { name: 'Chainsaw Man', slug: 'chainsaw-man', kit: 4, col: 2, row: 4 },
  { name: 'DAN DA DAN', slug: 'dandadan', kit: 4, col: 5, row: 2 },
  { name: 'Demon Slayer', slug: 'demon-slayer', kit: 4, col: 2, row: 2 },
  { name: 'Dragon Ball', slug: 'dragon-ball', kit: 1, col: 1, row: 1 },
  { name: 'Fairy Tail', slug: 'fairy-tail', kit: 4, col: 6, row: 3 },
  { name: 'Frieren', slug: 'frieren', kit: 3, col: 4, row: 4 },
  { name: 'Fullmetal Alchemist', slug: 'fullmetal-alchemist', kit: 2, col: 5, row: 3 },
  { name: 'Haikyuu', slug: 'haikyuu', kit: 3, col: 4, row: 3 },
  { name: 'Hunter x Hunter', slug: 'hunter-x-hunter', kit: 3, col: 6, row: 2 },
  { name: 'Jojo\'s Bizarre Adventure', slug: 'jojos-bizarre-adventure', kit: 2, col: 3, row: 1 },
  { name: 'Jujutsu Kaisen', slug: 'jujutsu-kaisen', kit: 2, col: 1, row: 2 },
  { name: 'Kaiju No.8', slug: 'kaiju-no-8', kit: 1, col: 3, row: 3 },
  { name: 'Naruto', slug: 'naruto', kit: 2, col: 5, row: 5 },
  { name: 'One Piece', slug: 'one-piece', kit: 4, col: 6, row: 4 },
  { name: 'Record of Ragnarok', slug: 'record-of-ragnarok', kit: 1, col: 5, row: 1 },
  { name: 'Solo Leveling', slug: 'solo-leveling', kit: 3, col: 4, row: 1 },
  { name: 'Tensei Shitara Slime Datta Ken', slug: 'tensei-shitara-slime-datta-ken', kit: 4, col: 3, row: 4 },
];

async function extractIcon(item) {
  const kitPath = path.join(ICONS_DIR, `Kit ${item.kit} Icons.png`);
  const destPath = path.join(OUT_DIR, `${item.slug}.png`);

  if (!fs.existsSync(kitPath)) {
    console.error(`[MISSING KIT] ${kitPath}`);
    return;
  }

  // Kit 1, 2, 3: 1254x1254, 6x6 cells (209x209 each), already transparent
  // Kit 4: 1374x1145, 6 cols x 5 rows (229x229 each), background rgb(10, 19, 36)
  const cellW = item.kit === 4 ? 229 : 209;
  const cellH = item.kit === 4 ? 229 : 209;
  const left = (item.col - 1) * cellW;
  const top = (item.row - 1) * cellH;

  const rawBuffer = await sharp(kitPath)
    .extract({ left, top, width: cellW, height: cellH })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = rawBuffer;
  const rgba = Buffer.alloc(cellW * cellH * 4);

  if (item.kit === 4) {
    // Make dark background transparent
    for (let i = 0; i < cellW * cellH; i++) {
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];
      const dist = Math.sqrt((r - 10)**2 + (g - 19)**2 + (b - 36)**2);

      rgba[i * 4] = r;
      rgba[i * 4 + 1] = g;
      rgba[i * 4 + 2] = b;

      if (dist < 18) {
        rgba[i * 4 + 3] = 0;
      } else if (dist < 32) {
        rgba[i * 4 + 3] = Math.round(((dist - 18) / 14) * 255);
      } else {
        rgba[i * 4 + 3] = 255;
      }
    }
  } else {
    // Copy existing RGBA
    for (let i = 0; i < cellW * cellH; i++) {
      rgba[i * 4] = data[i * 4];
      rgba[i * 4 + 1] = data[i * 4 + 1];
      rgba[i * 4 + 2] = data[i * 4 + 2];
      rgba[i * 4 + 3] = data[i * 4 + 3];
    }
  }

  // Trim transparent padding so icon is centered and scaled nicely to standard 256x256
  const trimmed = await sharp(rgba, { raw: { width: cellW, height: cellH, channels: 4 } })
    .trim()
    .resize(256, 256, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'lanczos3'
    })
    .png({ quality: 100, compressionLevel: 8 })
    .toBuffer();

  await sharp(trimmed).toFile(destPath);
  console.log(`[ICON OK] ${item.name.padEnd(30)} -> ${item.slug}.png (Kit ${item.kit}, C:${item.col}, R:${item.row})`);
}

async function main() {
  console.log(`Starting extraction of ${ICONS_CONFIG.length} anime icons...`);
  for (const item of ICONS_CONFIG) {
    await extractIcon(item);
  }
  console.log('\nAll 22 icons extracted and saved to public/icons/ successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
