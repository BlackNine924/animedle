import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/User/.gemini/antigravity/brain/b9db9576-73d9-4de0-9dff-68fb4c09787d';
const newDir = 'C:/Users/User/Downloads/cards_anime_10_1024x1536';
const publicDir = 'public/cards';

const targetCards = [
  ['Black Clover Card.png',          'black-clover'],
  ['Blue Lock Card.png',             'blue-lock'],
  ['Dragon Ball Card.png',           'dragon-ball'],
  ['Haikyuu Card.png',               'haikyuu'],
  ['Sakamoto Days Card.png',         'sakamoto-days'],
  ['Soul Eater Card.png',            'soul-eater'],
  ['Sword Art Online Card.png',      'sword-art-online'],
  ['The Promissed Neverland Card.png','the-promised-neverland'],
  ['Tokyo Ghoul Card.png',           'tokyo-ghoul'],
  ['Yu Yu Hakusho Card.png',         'yu-yu-hakusho']
];

async function createComparisons() {
  for (let s = 0; s < 2; s++) {
    const chunk = targetCards.slice(s * 5, (s + 1) * 5);
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
      const [fileName, slug] = chunk[i];
      const curPath = path.join(publicDir, `${slug}.png`);
      const newPath = path.join(newDir, fileName);

      // Top: Current on site
      const curBuf = await sharp(curPath).resize(w, h, { fit: 'cover' }).toBuffer();
      composites.push({ input: curBuf, left: i * w, top: 0 });

      // Bottom: New from ChatGPT in downloads
      const newBuf = await sharp(newPath).resize(w, h, { fit: 'cover' }).toBuffer();
      composites.push({ input: newBuf, left: i * w, top: h });
    }

    await canvas.composite(composites).png().toFile(path.join(outDir, `review_chatgpt_cards_${s}.png`));
    console.log(`Saved review_chatgpt_cards_${s}.png`);
  }
}

createComparisons();
