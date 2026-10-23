import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Let's create contact sheets of groups of 12 cards each to inspect the rest of the cards
async function generateCardInspectionSheets() {
  const cardsDir = 'public/cards';
  const allCards = fs.readdirSync(cardsDir).filter(f => f.endsWith('.png'));
  
  // Exclude the 19 recently updated/verified ones
  const recent19 = [
    'black-clover.png', 'blue-lock.png', 'bungo-stray-dogs.png', 'classroom-of-the-elite.png',
    'code-geass.png', 'dragon-ball.png', 'gintama.png', 'haikyuu.png',
    'inuyasha.png', 'konosuba.png', 'monster.png', 'neon-genesis-evangelion.png',
    're-zero.png', 'sakamoto-days.png', 'soul-eater.png', 'sword-art-online.png',
    'the-promised-neverland.png', 'tokyo-ghoul.png', 'yu-yu-hakusho.png'
  ];

  const candidates = allCards.filter(c => !recent19.includes(c));
  console.log(`Remaining cards to review: ${candidates.length}`);

  // Create thumbnail sheets for candidate review
  const thumbW = 200;
  const thumbH = 300;
  const cols = 5;

  for (let batchIdx = 0; batchIdx < Math.ceil(candidates.length / 10); batchIdx++) {
    const batch = candidates.slice(batchIdx * 10, (batchIdx + 1) * 10);
    const composites = [];
    for (let i = 0; i < batch.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const thumb = await sharp(path.join(cardsDir, batch[i]))
        .resize(thumbW, thumbH, { fit: 'fill' })
        .toBuffer();
      composites.push({
        input: thumb,
        left: col * (thumbW + 10) + 10,
        top: row * (thumbH + 30) + 25
      });
    }

    const sheetW = cols * (thumbW + 10) + 10;
    const sheetH = Math.ceil(batch.length / cols) * (thumbH + 30) + 25;

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
    .toFile(`C:/Users/User/.gemini/antigravity/brain/b9db9576-73d9-4de0-9dff-68fb4c09787d/review_remaining_cards_${batchIdx}.jpg`);
    console.log(`Sheet ${batchIdx} generated with: ${batch.join(', ')}`);
  }
}

generateCardInspectionSheets();
