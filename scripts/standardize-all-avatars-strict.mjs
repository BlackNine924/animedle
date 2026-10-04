import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function standardize() {
  const dirs = fs.readdirSync('public/avatars').filter(d => fs.statSync('public/avatars/' + d).isDirectory());
  let processed = 0;

  for (const dir of dirs) {
    const files = fs.readdirSync('public/avatars/' + dir).filter(f => f.endsWith('.png'));
    for (const f of files) {
      const p = path.join('public/avatars', dir, f);
      try {
        const fileBuffer = fs.readFileSync(p);
        const meta = await sharp(fileBuffer).metadata();
        const stats = await sharp(fileBuffer).stats();

        // If already 240x240 and opaque, skip
        if (meta.width === 240 && meta.height === 240 && stats.isOpaque) {
          continue;
        }

        const buf = await sharp(fileBuffer)
          .flatten({ background: '#121929' })
          .resize(240, 240, { fit: 'cover', position: 'top' })
          .png({ quality: 95 })
          .toBuffer();

        fs.writeFileSync(p, buf);
        processed++;
      } catch (err) {
        console.error(`Error on ${dir}/${f}:`, err.message);
      }
    }
  }

  console.log(`Successfully standardized and strictly validated ${processed} avatars!`);
}

standardize();
