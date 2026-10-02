import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ICONS_DIR = 'C:/Users/User/Downloads/ANIMEDLE/Icons';
const OUT_DIR = 'public/icons';

fs.mkdirSync(OUT_DIR, { recursive: true });

async function extractKitTransparent(kitNum, col, row, totalCols, totalRows, slug) {
  const kitPath = path.join(ICONS_DIR, `Kit ${kitNum} Icons.png`);
  const meta = await sharp(kitPath).metadata();
  const cellW = Math.floor(meta.width / totalCols);
  const cellH = Math.floor(meta.height / totalRows);
  const left = (col - 1) * cellW;
  const top = (row - 1) * cellH;
  const width = Math.min(cellW, meta.width - left);
  const height = Math.min(cellH, meta.height - top);

  const cropped = await sharp(kitPath)
    .extract({ left, top, width, height })
    .trim()
    .resize(256, 256, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'lanczos3'
    })
    .png({ quality: 100 })
    .toBuffer();

  await sharp(cropped).toFile(path.join(OUT_DIR, `${slug}.png`));
  await sharp(cropped).webp({ quality: 95, effort: 6 }).toFile(path.join(OUT_DIR, `${slug}.webp`));
  console.log(`[OK] Extracted ${slug} from Kit ${kitNum} (Col ${col}, Row ${row})`);
}

async function extractDarkBackground(kitPath, col, row, totalCols, totalRows, slug) {
  const meta = await sharp(kitPath).metadata();
  const cellW = Math.floor(meta.width / totalCols);
  const cellH = Math.floor(meta.height / totalRows);
  const left = (col - 1) * cellW;
  const top = (row - 1) * cellH;
  const width = Math.min(cellW, meta.width - left);
  const height = Math.min(cellH, meta.height - top);

  const cell = await sharp(kitPath)
    .extract({ left, top, width, height })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = cell;
  const corners = [
    0,
    (info.width - 1),
    (info.height - 1) * info.width,
    (info.height - 1) * info.width + (info.width - 1)
  ];
  let bgR = 0, bgG = 0, bgB = 0;
  for (const idx of corners) {
    bgR += data[idx * info.channels];
    bgG += data[idx * info.channels + 1];
    bgB += data[idx * info.channels + 2];
  }
  bgR /= corners.length;
  bgG /= corners.length;
  bgB /= corners.length;

  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * info.channels];
    const g = data[i * info.channels + 1];
    const b = data[i * info.channels + 2];
    const dist = Math.sqrt((r - bgR)**2 + (g - bgG)**2 + (b - bgB)**2);

    rgba[i * 4] = 255;
    rgba[i * 4 + 1] = 255;
    rgba[i * 4 + 2] = 255;

    if (dist < 28) {
      rgba[i * 4 + 3] = 0;
    } else if (dist < 55) {
      rgba[i * 4 + 3] = Math.round(((dist - 28) / 27) * 255);
    } else {
      rgba[i * 4 + 3] = 255;
    }
  }

  const cropped = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100 })
    .toBuffer();

  await sharp(cropped).toFile(path.join(OUT_DIR, `${slug}.png`));
  await sharp(cropped).webp({ quality: 95, effort: 6 }).toFile(path.join(OUT_DIR, `${slug}.webp`));
  console.log(`[OK] Extracted ${slug} from Kit 4 (Col ${col}, Row ${row})`);
}

async function main() {
  // One Punch Man: Kit Icons 4, Coluna 3, Linha 5.
  await extractDarkBackground(path.join(ICONS_DIR, 'Kit 4 Icons.png'), 3, 5, 6, 5, 'one-punch-man');

  // Tokyo Ghoul: Kit Icons 1, Coluna 1, Linha 4.
  await extractKitTransparent(1, 1, 4, 6, 6, 'tokyo-ghoul');

  // Sword Art Online: Kit Icons 4, Coluna 4, Linha 5.
  await extractDarkBackground(path.join(ICONS_DIR, 'Kit 4 Icons.png'), 4, 5, 6, 5, 'sword-art-online');

  // Romance: Kit Icons 3, Coluna 5, Linha 4.
  await extractKitTransparent(3, 5, 4, 6, 6, 'romance');

  console.log('All 4 new anime icons successfully extracted!');
}

main().catch(console.error);
