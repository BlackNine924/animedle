import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/User/.gemini/antigravity/brain/b9db9576-73d9-4de0-9dff-68fb4c09787d';

const map = [
  ['Bungo Stray Dogs Card.png', 'bungo-stray-dogs'],
  ['Classroom of The Elite Card.png', 'classroom-of-the-elite'],
  ['Code Geass Card.png', 'code-geass'],
  ['Gintama Card.png', 'gintama'],
  ['Inuyasha Card.png', 'inuyasha'],
  ['Konosuba Card.png', 'konosuba'],
  ['Monster Card.png', 'monster'],
  ['Neon Genesis Evangelion Card.png', 'neon-genesis-evangelion'],
  ['ReZero Card.png', 're-zero'],
  ['The Promissed Neverland Card.png', 'the-promised-neverland']
];

async function compareSiteVsNew() {
  for (let s = 0; s < 2; s++) {
    const chunk = map.slice(s * 5, (s + 1) * 5);
    const w = 320, h = 480;
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
      const [newFile, siteId] = chunk[i];
      const sitePath = `public/cards/${siteId}.png`;
      const newPath = `C:/Users/User/Downloads/cards_anime_10_1024x1536/${newFile}`;

      // Top: Site card
      const siteBuf = await sharp(sitePath).resize(w, h, { fit: 'cover' }).toBuffer();
      composites.push({ input: siteBuf, left: i * w, top: 0 });

      // Bottom: New download card
      const newBuf = await sharp(newPath).resize(w, h, { fit: 'cover' }).toBuffer();
      composites.push({ input: newBuf, left: i * w, top: h });
    }

    await canvas.composite(composites).png().toFile(path.join(outDir, `site_vs_new_cards_${s}.png`));
    console.log(`Saved site_vs_new_cards_${s}.png`);
  }
}

compareSiteVsNew();
