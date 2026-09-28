import fs from 'fs';

const scripts = ['build-frieren', 'build-fma', 'build-haikyuu', 'build-hxh', 'build-kaiju'];

const newBlock = `async function processAvatar(buffer, outputPath) {
  const meta = await sharp(buffer).metadata();
  const width = meta.width;
  const height = meta.height;

  let pipeline = sharp(buffer);

  if (height > width * 2.5) {
    // Imagem muito alta (corpo inteiro): pega top 35% para focar no rosto
    const cropH = Math.round(height * 0.35);
    pipeline = pipeline.extract({ left: 0, top: 0, width, height: Math.max(cropH, 1) });
  } else if (height > width * 1.3) {
    // Imagem portrait: crop no topo focando no rosto
    const cropH = Math.round(width * 1.1);
    const top = Math.round(height * 0.03);
    const safeTop = Math.min(top, Math.max(0, height - cropH));
    const safeH = Math.min(cropH, height - safeTop);
    pipeline = pipeline.extract({ left: 0, top: safeTop, width, height: Math.max(safeH, 1) });
  }

  await pipeline
    .resize(240, 240, { fit: 'cover', position: 'top' })
    .png({ quality: 95 })
    .toFile(outputPath);
}`;

// Regex that matches the entire processAvatar function block
const regex = /async function processAvatar\(buffer, outputPath\) \{[\s\S]*?\n\}/;

for (const s of scripts) {
  const p = `scripts/${s}.mjs`;
  let content = fs.readFileSync(p, 'utf8');
  const before = content;
  content = content.replace(regex, newBlock);
  if (content === before) {
    console.log('NAO MUDOU:', s);
  } else {
    fs.writeFileSync(p, content, 'utf8');
    console.log('ATUALIZADO:', s);
  }
}
