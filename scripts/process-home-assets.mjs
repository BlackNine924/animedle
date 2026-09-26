import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/User/.gemini/antigravity/brain/0c29a8d4-9fc0-442f-bc4d-5de365cd99c6';

const cardMappings = [
  { slug: 'demon-slayer', file: 'card_tanjiro_1790384744080.jpg', crop: { top: 30, left: 100, width: 680, height: 800 } },
  { slug: 'jujutsu-kaisen', file: 'card_itadori_1790384777671.jpg', crop: { top: 40, left: 120, width: 680, height: 800 } },
  { slug: 'one-piece', file: 'card_luffy_1790384815123.jpg', crop: { top: 50, left: 100, width: 700, height: 820 } },
  { slug: 'naruto', file: 'card_naruto_1790384860932.jpg', crop: { top: 40, left: 100, width: 680, height: 800 } },
  { slug: 'solo-leveling', file: 'card_sungjinwoo_1790384904363.jpg', crop: { top: 30, left: 100, width: 680, height: 800 } },
  { slug: 'blue-lock', file: 'card_isagi_1790384951602.jpg', crop: { top: 30, left: 100, width: 680, height: 800 } },
  { slug: 'record-of-ragnarok', file: 'card_qinshihuang_1790385003877.jpg', crop: { top: 50, left: 100, width: 680, height: 800 } },
  { slug: 'bleach', file: 'card_ichigo_1790385061205.jpg', crop: { top: 30, left: 100, width: 680, height: 800 } },
  { slug: 'dragon-ball', file: 'card_goku_1790385127695.jpg', crop: { top: 20, left: 100, width: 680, height: 800 } },
  { slug: 'romance', file: 'card_marin_1790385193715.jpg', crop: { top: 80, left: 100, width: 680, height: 800 } },
];

async function processCards() {
  const targetDir = path.resolve('public/card-covers');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const item of cardMappings) {
    const inputPath = path.join(ARTIFACT_DIR, item.file);
    const outputPath = path.join(targetDir, `${item.slug}.png`);

    console.log(`Processando card ${item.slug} a partir de ${item.file}...`);
    const meta = await sharp(inputPath).metadata();

    // Redimensiona para 320x380 proporcional
    await sharp(inputPath)
      .resize({
        width: 340,
        height: 400,
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 95 })
      .toFile(outputPath);

    console.log(`Card salvo: ${outputPath}`);
  }

  // Processa silhuetas do Hero
  const gojoIn = path.join(ARTIFACT_DIR, 'hero_gojo_1790385263700.jpg');
  const gojoOut = path.resolve('public/hero-gojo.png');
  await sharp(gojoIn)
    .resize({ width: 480, height: 640, fit: 'cover' })
    .png({ quality: 90 })
    .toFile(gojoOut);
  console.log(`Hero Gojo salvo: ${gojoOut}`);

  const luffyIn = path.join(ARTIFACT_DIR, 'hero_luffy_1790385339060.jpg');
  const luffyOut = path.resolve('public/hero-luffy.png');
  await sharp(luffyIn)
    .resize({ width: 480, height: 640, fit: 'cover' })
    .png({ quality: 90 })
    .toFile(luffyOut);
  console.log(`Hero Luffy salvo: ${luffyOut}`);
}

processCards().catch(err => {
  console.error(err);
  process.exit(1);
});
