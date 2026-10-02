import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUT_DIR = 'public/icons';

async function processDarkBg(inputFile, crop, slug) {
  const rawImg = await sharp(inputFile)
    .extract(crop)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = rawImg;
  const rgba = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * info.channels];
    const g = data[i * info.channels + 1];
    const b = data[i * info.channels + 2];
    const lum = (r + g + b) / 3;

    rgba[i * 4] = 255;
    rgba[i * 4 + 1] = 255;
    rgba[i * 4 + 2] = 255;

    if (lum < 50) {
      rgba[i * 4 + 3] = 0;
    } else if (lum < 110) {
      rgba[i * 4 + 3] = Math.round(((lum - 50) / 60) * 255);
    } else {
      rgba[i * 4 + 3] = 255;
    }
  }

  const padded = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .resize(220, 220, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 18, bottom: 18, left: 18, right: 18, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100 })
    .toBuffer();

  const destPng = path.join(OUT_DIR, `${slug}.png`);
  const destWebp = path.join(OUT_DIR, `${slug}.webp`);
  await sharp(padded).toFile(destPng);
  await sharp(padded).webp({ quality: 95, effort: 6 }).toFile(destWebp);
  console.log(`[OK] Generated clean ${slug}.png and ${slug}.webp`);
}

async function processKit1Alpha(crop, slug) {
  const raw = await sharp('C:/Users/User/Downloads/ANIMEDLE/Icons/Kit 1 Icons.png')
    .extract(crop)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = raw;
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const a = data[i * 4 + 3];
    if (a > 30) {
      out[i * 4] = 255;
      out[i * 4 + 1] = 255;
      out[i * 4 + 2] = 255;
      out[i * 4 + 3] = a;
    } else {
      out[i * 4 + 3] = 0;
    }
  }

  const clean = await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .resize(220, 220, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 18, bottom: 18, left: 18, right: 18, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100 })
    .toBuffer();

  const destPng = path.join(OUT_DIR, `${slug}.png`);
  const destWebp = path.join(OUT_DIR, `${slug}.webp`);
  await sharp(clean).toFile(destPng);
  await sharp(clean).webp({ quality: 95, effort: 6 }).toFile(destWebp);
  console.log(`[OK] Generated clean ${slug}.png and ${slug}.webp`);
}

async function run() {
  // 1. SAO: from Kit 4 Icons.png
  await processDarkBg('C:/Users/User/Downloads/ANIMEDLE/Icons/Kit 4 Icons.png', { left: 717, top: 901, width: 170, height: 175 }, 'sword-art-online');

  // 2. OPM: from Kit 4 Icons.png
  await processDarkBg('C:/Users/User/Downloads/ANIMEDLE/Icons/Kit 4 Icons.png', { left: 478, top: 901, width: 195, height: 175 }, 'one-punch-man');

  // 3. Tokyo Ghoul: from Kit 1 Icons.png
  await processKit1Alpha({ left: 5, top: Math.round(3 * 250.8 + 10), width: 199, height: 230 }, 'tokyo-ghoul');

  // 4. Romance: from Kit 1 Icons.png
  await processKit1Alpha({ left: Math.round(4 * 209 + 5), top: Math.round(3 * 250.8 + 10), width: 199, height: 230 }, 'romance');

  console.log('All 4 icons updated successfully!');
}

run().catch(console.error);
