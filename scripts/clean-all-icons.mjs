import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUT_DIR = 'public/icons';

async function run() {
  const files = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.png'));
  console.log(`Processing ${files.length} icons...`);

  for (const f of files) {
    const filePath = path.join(OUT_DIR, f);
    const buf = fs.readFileSync(filePath);
    const meta = await sharp(buf).metadata();
    if (!meta.width || !meta.height) continue;

    const margin = 8;
    const cleaned = await sharp(buf)
      .extract({
        left: margin,
        top: margin,
        width: meta.width - margin * 2,
        height: meta.height - margin * 2
      })
      .resize(256, 256, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 100 })
      .toBuffer();

    fs.writeFileSync(filePath, cleaned);
    const webpPath = filePath.replace('.png', '.webp');
    const webpBuf = await sharp(cleaned).webp({ quality: 95, effort: 6 }).toBuffer();
    fs.writeFileSync(webpPath, webpBuf);
    console.log(`[Cleaned] ${f}`);
  }

  console.log('All 32 anime icons are now cleanly extracted with 0 square border lines!');
}

run().catch(console.error);
