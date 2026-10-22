import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/User/.gemini/antigravity/brain/b9db9576-73d9-4de0-9dff-68fb4c09787d';

async function compareCards() {
  const newDir = 'C:/Users/User/Downloads/cards_anime_10_1024x1536';
  const oldDir = 'C:/Users/User/Downloads/ANIMEDLE/Cards';
  const files = fs.readdirSync(newDir).filter(f => f.endsWith('.png'));

  for (let s = 0; s < 2; s++) {
    const chunk = files.slice(s * 5, (s + 1) * 5);
    const w = 300, h = 450;
    const canvas = sharp({
      create: {
        width: 5 * w,
        height: 2 * h,
        channels: 4,
        background: { r: 15, g: 15, b: 20, alpha: 1 }
      }
    });

    const composites = [];
    for (let i = 0; i < chunk.length; i++) {
      const f = chunk[i];
      const oldBuf = await sharp(path.join(oldDir, f)).resize(w, h, { fit: 'cover' }).toBuffer();
      composites.push({ input: oldBuf, left: i * w, top: 0 });

      const newBuf = await sharp(path.join(newDir, f)).resize(w, h, { fit: 'cover' }).toBuffer();
      composites.push({ input: newBuf, left: i * w, top: h });
    }

    await canvas.composite(composites).png().toFile(path.join(outDir, `compare_10cards_${s}.png`));
    console.log(`Saved compare_10cards_${s}.png`);
  }
}

async function compareWalls() {
  const newDir = 'C:/Users/User/Downloads/Wallpapers anime';
  const oldDir = 'C:/Users/User/Downloads/ANIMEDLE/Wallpapers';
  const files = fs.readdirSync(newDir).filter(f => f.endsWith('.png'));

  const w = 550, h = 309;
  const canvas = sharp({
    create: {
      width: 2 * w,
      height: files.length * h,
      channels: 4,
      background: { r: 15, g: 15, b: 20, alpha: 1 }
    }
  });

  const composites = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const oldBuf = await sharp(path.join(oldDir, f)).resize(w, h, { fit: 'cover' }).toBuffer();
    composites.push({ input: oldBuf, left: 0, top: i * h });

    const newBuf = await sharp(path.join(newDir, f)).resize(w, h, { fit: 'cover' }).toBuffer();
    composites.push({ input: newBuf, left: w, top: i * h });
  }

  await canvas.composite(composites).png().toFile(path.join(outDir, `compare_4walls.png`));
  console.log(`Saved compare_4walls.png`);
}

async function run() {
  await compareCards();
  await compareWalls();
}

run();
