import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DOWNLOADS_BASE = 'C:/Users/User/Downloads/ANIMEDLE';
const OUT_DIR = path.resolve('public/icons/titles');

export function normalizeTitleSlug(str) {
  return str
    .replace(/\.(png|webp|jpg|jpeg)$/i, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ºª°]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const entries = fs.readdirSync(DOWNLOADS_BASE);
  const titulosFolder = entries.find((d) => d.startsWith('T') && d.endsWith('tulos'));
  if (!titulosFolder) {
    throw new Error('Pasta Títulos não encontrada em Downloads/ANIMEDLE');
  }

  const srcDir = path.join(DOWNLOADS_BASE, titulosFolder);
  const files = fs.readdirSync(srcDir).filter((f) => /\.(png|webp|jpg|jpeg)$/i.test(f));

  console.log(`Encontrados ${files.length} ícones de títulos em ${srcDir}`);

  for (const file of files) {
    const inputPath = path.join(srcDir, file);
    const slug = normalizeTitleSlug(file);

    const processedBuffer = await sharp(inputPath)
      .trim()
      .resize(260, 260, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .extend({
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ quality: 95, compressionLevel: 9 })
      .toBuffer();

    const outPng = path.join(OUT_DIR, `${slug}.png`);
    const outWebp = path.join(OUT_DIR, `${slug}.webp`);

    await sharp(processedBuffer).toFile(outPng);
    await sharp(processedBuffer).webp({ quality: 92, effort: 6 }).toFile(outWebp);

    console.log(`[OK] ${file} -> ${slug}.webp / .png`);
  }

  console.log(`Concluído! ${files.length} ícones gerados em ${OUT_DIR}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
