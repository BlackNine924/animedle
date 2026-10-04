import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function run() {
  const dirs = fs.readdirSync('public/avatars').filter(d => fs.statSync('public/avatars/' + d).isDirectory());
  let processed = 0;

  for (const dir of dirs) {
    const files = fs.readdirSync('public/avatars/' + dir).filter(f => f.endsWith('.png'));
    for (const f of files) {
      const p = path.join('public/avatars', dir, f);
      try {
        const stats = await sharp(p).stats();
        if (!stats.isOpaque) {
          const buf = await sharp(p)
            .flatten({ background: '#121929' })
            .resize(240, 240)
            .png({ quality: 95 })
            .toBuffer();

          fs.writeFileSync(p, buf);
          processed++;
          console.log(`[FLATTENED TO OPAQUE] ${dir}/${f}`);
        }
      } catch (err) {
        console.error(`Error processing ${dir}/${f}:`, err.message);
      }
    }
  }

  console.log(`Successfully flattened ${processed} transparent avatars into opaque portraits!`);
}

run();
