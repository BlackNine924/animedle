import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateWallpaperSheets() {
  const dir = 'public/wallpapers';
  const allWalls = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  console.log(`Total wallpapers to review: ${allWalls.length}`);

  const thumbW = 320;
  const thumbH = 180;
  const cols = 4;
  const perBatch = 8;

  for (let batchIdx = 0; batchIdx < Math.ceil(allWalls.length / perBatch); batchIdx++) {
    const batch = allWalls.slice(batchIdx * perBatch, (batchIdx + 1) * perBatch);
    const composites = [];
    for (let i = 0; i < batch.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const thumb = await sharp(path.join(dir, batch[i]))
        .resize(thumbW, thumbH, { fit: 'cover' })
        .toBuffer();
      composites.push({
        input: thumb,
        left: col * (thumbW + 15) + 15,
        top: row * (thumbH + 20) + 15
      });
    }

    const sheetW = cols * (thumbW + 15) + 15;
    const sheetH = Math.ceil(batch.length / cols) * (thumbH + 20) + 15;

    await sharp({
      create: {
        width: sheetW,
        height: sheetH,
        channels: 4,
        background: { r: 18, g: 20, b: 24, alpha: 1 }
      }
    })
    .composite(composites)
    .jpeg({ quality: 85 })
    .toFile(`C:/Users/User/.gemini/antigravity/brain/b9db9576-73d9-4de0-9dff-68fb4c09787d/review_wallpapers_${batchIdx}.jpg`);
    console.log(`Wallpaper Sheet ${batchIdx} generated with: ${batch.join(', ')}`);
  }
}

generateWallpaperSheets();
