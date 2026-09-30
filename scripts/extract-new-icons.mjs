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

  const destPng = path.join(OUT_DIR, `${slug}.png`);
  const destWebp = path.join(OUT_DIR, `${slug}.webp`);
  await sharp(cropped).toFile(destPng);
  await sharp(cropped).webp({ quality: 95, effort: 6 }).toFile(destWebp);
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
  // Sample background color from the 4 corners of the cell
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

    // Make icon pure white if it's the silhouette or keep brightness
    const lum = (r + g + b) / 3;
    rgba[i * 4] = 255;
    rgba[i * 4 + 1] = 255;
    rgba[i * 4 + 2] = 255;

    if (dist < 22) {
      rgba[i * 4 + 3] = 0;
    } else if (dist < 45) {
      rgba[i * 4 + 3] = Math.round(((dist - 22) / 23) * 255);
    } else {
      rgba[i * 4 + 3] = Math.min(255, Math.round((lum / 255) * 255 * 1.2));
    }
  }

  const cropped = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .resize(256, 256, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'lanczos3'
    })
    .png({ quality: 100 })
    .toBuffer();

  const destPng = path.join(OUT_DIR, `${slug}.png`);
  const destWebp = path.join(OUT_DIR, `${slug}.webp`);
  await sharp(cropped).toFile(destPng);
  await sharp(cropped).webp({ quality: 95, effort: 6 }).toFile(destWebp);
  console.log(`[OK] Extracted ${slug} from ${path.basename(kitPath)} (Col ${col}, Row ${row})`);
}

async function extractBbox(sourcePath, bbox, isDarkBg, slug) {
  const { left, top, width, height } = bbox;
  const cell = await sharp(sourcePath)
    .extract({ left, top, width, height })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = cell;
  let finalBuffer;

  if (isDarkBg) {
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
      const lum = (r + g + b) / 3;

      rgba[i * 4] = 255;
      rgba[i * 4 + 1] = 255;
      rgba[i * 4 + 2] = 255;

      if (dist < 22) {
        rgba[i * 4 + 3] = 0;
      } else if (dist < 45) {
        rgba[i * 4 + 3] = Math.round(((dist - 22) / 23) * 255);
      } else {
        rgba[i * 4 + 3] = Math.min(255, Math.round((lum / 255) * 255 * 1.2));
      }
    }
    finalBuffer = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim()
      .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100 })
      .toBuffer();
  } else {
    finalBuffer = await sharp(sourcePath)
      .extract({ left, top, width, height })
      .trim()
      .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100 })
      .toBuffer();
  }

  const destPng = path.join(OUT_DIR, `${slug}.png`);
  const destWebp = path.join(OUT_DIR, `${slug}.webp`);
  await sharp(finalBuffer).toFile(destPng);
  await sharp(finalBuffer).webp({ quality: 95, effort: 6 }).toFile(destWebp);
  console.log(`[OK] Extracted ${slug} from bbox in ${path.basename(sourcePath)}`);
}

async function run() {
  // 1. Akame Ga Kill: Kit Icons 5, Coluna 5, Linha 3 (Kit 5 is 5x5, dark background)
  await extractDarkBackground(path.join(ICONS_DIR, 'Kit 5 Icons.png'), 5, 3, 5, 5, 'akame-ga-kill');

  // 2. Boku No Hero Academia: Kit Icons 2, Coluna 2, Linha 5 (Kit 2 is 6x6, transparent)
  await extractKitTransparent(2, 2, 5, 6, 6, 'my-hero-academia');

  // 3. Cyberpunk: Edgerunners: Cyberpunk Edgerunners Icons, 1st icon (has dark background)
  // First icon is in left third of 1254x1254 image
  await extractBbox(
    path.join(ICONS_DIR, 'Cyberpunk Edgerunners Icons.png'),
    { left: 10, top: 250, width: 420, height: 750 },
    true,
    'cyberpunk-edgerunners'
  );

  // 4. Nanatsu No Taizai: Kit Icons 3, Coluna 2, Linha 3 (Kit 3 is 6x6, transparent)
  await extractKitTransparent(3, 2, 3, 6, 6, 'nanatsu-no-taizai');

  // 5. Shangri-La Frontier: Kit Icons 8, Coluna 2, Linha 5 (Kit 8 is 5x5, dark background)
  await extractDarkBackground(path.join(ICONS_DIR, 'Kit 8 Icons.png'), 2, 5, 5, 5, 'shangri-la-frontier');

  // 6. Witch Hat Atelier: Witch Hat Atelier Icons, 3rd icon (transparent)
  // 3rd icon is in right third of 1254x1254 image
  await extractBbox(
    path.join(ICONS_DIR, 'Witch Hat Atelier Icons.png'),
    { left: 820, top: 350, width: 420, height: 650 },
    false,
    'witch-hat-atelier'
  );

  console.log('All 6 icons extracted successfully!');
}

run().catch(console.error);
