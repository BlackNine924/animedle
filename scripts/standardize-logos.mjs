import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const logos = [
  'logo-bleach.png',
  'logo-blue-lock.png',
  'logo-demon-slayer.png',
  'logo-dragon-ball.png',
  'logo-jujutsu-kaisen.png',
  'logo-naruto.png',
  'logo-one-piece.png',
  'logo-record-of-ragnarok.png',
  'logo-solo-leveling.png',
  'logo.png'
];

async function standardizeLogos() {
  // 384x384 is over 10x larger than the 36x36 display size (w-9 h-9),
  // providing ultra-crisp Retina clarity while shrinking file sizes from 750KB to ~25KB.
  const targetCanvas = 384;
  const contentTarget = 360; // exact same 3.1% margin all around

  for (const filename of logos) {
    const filePath = path.join('public', filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    // 1. Trim transparency to get pure bounding box of the artwork
    const trimmed = await sharp(filePath).trim().toBuffer({ resolveWithObject: true });

    // 2. Resize content to fit inside contentTarget x contentTarget preserving aspect ratio
    const resized = await sharp(trimmed.data)
      .resize(contentTarget, contentTarget, { fit: 'inside' })
      .toBuffer({ resolveWithObject: true });

    // 3. Composite into centered square canvas of 384 x 384
    const left = Math.round((targetCanvas - resized.info.width) / 2);
    const top = Math.round((targetCanvas - resized.info.height) / 2);

    const standardized = await sharp({
      create: {
        width: targetCanvas,
        height: targetCanvas,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{ input: resized.data, left, top }])
      .png({ compressionLevel: 9, quality: 95 })
      .toBuffer();

    fs.writeFileSync(filePath, standardized);
    console.log(`Optimized ${filename}: ${(standardized.length / 1024).toFixed(1)} KB`);
  }
}

standardizeLogos();
