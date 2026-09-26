import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const inputPath = 'C:/Users/User/.gemini/antigravity/brain/0c29a8d4-9fc0-442f-bc4d-5de365cd99c6/.user_uploaded/media_1790384539463.png';
const outputPath = path.resolve('public/logo.png');

async function processLogo() {
  const TARGET_SIZE = 512;
  const SAFE_PADDING = 18; // ~3.5%
  const INNER_MAX = TARGET_SIZE - (SAFE_PADDING * 2); // 476

  console.log('Lendo logo em:', inputPath);
  const trimmed = await sharp(inputPath).trim().toBuffer({ resolveWithObject: true });
  console.log(`Dimensões após trim: ${trimmed.info.width}x${trimmed.info.height}`);

  const resized = await sharp(trimmed.data)
    .resize({
      width: INNER_MAX,
      height: INNER_MAX,
      fit: 'inside',
      withoutEnlargement: false
    })
    .toBuffer({ resolveWithObject: true });

  const left = Math.round((TARGET_SIZE - resized.info.width) / 2);
  const top = Math.round((TARGET_SIZE - resized.info.height) / 2);

  await sharp({
    create: {
      width: TARGET_SIZE,
      height: TARGET_SIZE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{
      input: resized.data,
      left: left,
      top: top
    }])
    .png()
    .toFile(outputPath);

  console.log(`Sucesso! Logo padronizada gerada em: ${outputPath} (${TARGET_SIZE}x${TARGET_SIZE})`);
}

processLogo().catch(err => {
  console.error('Erro ao processar logo:', err);
  process.exit(1);
});
