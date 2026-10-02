import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const animeSlug = 'witch-hat-atelier';
const outAvatarsDir = path.resolve('public/avatars', animeSlug);
const charactersJsonPath = path.resolve('src/data/animes', animeSlug, 'characters.json');
const rawDir = path.resolve('temp/wha_raw');

fs.mkdirSync(outAvatarsDir, { recursive: true });

const currentChars = JSON.parse(fs.readFileSync(charactersJsonPath, 'utf8'));

// Individual precision crop configurations for all 29 Witch Hat Atelier characters
// Ensures tight facial centering, preserving pointy hats/hoods where applicable,
// framing bust/shoulders without showing torso/legs/feet.
const PRECISION_CROPS = {
  'coco': { boxSize: 330, top: 95, left: 170 },
  'agott': { boxSize: 340, top: 30, left: 185 },
  'tetia': { boxSize: 330, top: 42, left: 175 },
  'richeh': { boxSize: 330, top: 42, left: 165 },
  'qifrey': { boxSize: 360, top: 0, left: 155 },
  'olruggio': { boxSize: 360, top: 0, left: 165 },
  'beldaruit': { boxSize: 360, top: 40, left: 340 },
  'tartah': { boxSize: 280, top: 30, left: 180 },
  'custas': { boxSize: 240, top: 60, left: 215 },
  'iguin': { boxSize: 350, top: 20, left: 170 },
  'ininia': { boxSize: 360, top: 25, left: 210 },
  'sasaran': { boxSize: 340, top: 40, left: 340 },
  'utowin': { boxSize: 340, top: 5, left: 120 },
  'alaira': { boxSize: 340, top: 5, left: 150 },
  'luluci': { boxSize: 330, top: 25, left: 160 },
  'dagda': { boxSize: 250, top: 20, left: 210 },
  'nolnoa': { boxSize: 290, top: 20, left: 190 },
  'euini': { boxSize: 290, top: 25, left: 175 },
  'easthies': { boxSize: 340, top: 5, left: 240 },
  'galga': { boxSize: 320, top: 5, left: 180 },
  'deanreldy-ezrest': { boxSize: 330, top: 170, left: 340 },
  'zayamaia-ezrest': { boxSize: 280, top: 30, left: 100 },
  'princess-mia': { boxSize: 220, top: 40, left: 380 },
  'brushbuddy': { boxSize: 237, top: 0, left: 70 },
  'kukrow': { boxSize: 800, top: 0, left: 100 },
  'lagrah': { boxSize: 390, top: 10, left: 210 },
  'restys': { boxSize: 330, top: 15, left: 140 },
  'riliphin': { boxSize: 300, top: 110, left: 60 },
  'atwert': { boxSize: 340, top: 5, left: 210 }
};

async function processCharacter(char) {
  const rawPath = path.join(rawDir, `${char.id}.png`);
  const destPath = path.join(outAvatarsDir, `${char.id}.png`);

  if (!fs.existsSync(rawPath)) {
    throw new Error(`Raw file missing for ${char.id}`);
  }

  const cfg = PRECISION_CROPS[char.id];
  if (!cfg) {
    throw new Error(`Crop config missing for ${char.id}`);
  }

  const meta = await sharp(rawPath).metadata();
  const safeTop = Math.max(0, Math.min(meta.height - cfg.boxSize, cfg.top));
  const safeLeft = Math.max(0, Math.min(meta.width - cfg.boxSize, cfg.left));
  const safeW = Math.min(cfg.boxSize, meta.width - safeLeft);
  const safeH = Math.min(cfg.boxSize, meta.height - safeTop);

  await sharp(rawPath)
    .extract({ left: safeLeft, top: safeTop, width: safeW, height: safeH })
    .resize(240, 240, { fit: 'cover' })
    .png({ quality: 95 })
    .toFile(destPath);
}

async function run() {
  console.log(`=== REPROCESSANDO AVATARES DE WITCH HAT ATELIER (${currentChars.length} personagens) ===\n`);
  let successCount = 0;

  for (let i = 0; i < currentChars.length; i++) {
    const char = currentChars[i];
    try {
      await processCharacter(char);
      console.log(`[${i + 1}/${currentChars.length}] ✅ ${char.name} (${char.id})`);
      successCount++;
    } catch (err) {
      console.error(`[${i + 1}/${currentChars.length}] ❌ Erro em ${char.name} (${char.id}):`, err.message);
    }
  }

  // Remove test artifact files from public/avatars/witch-hat-atelier
  const existingFiles = fs.readdirSync(outAvatarsDir);
  for (const f of existingFiles) {
    if (f.startsWith('test-')) {
      fs.unlinkSync(path.join(outAvatarsDir, f));
      console.log(`Limpou arquivo de teste: ${f}`);
    }
  }

  console.log(`\n🎉 Concluído: ${successCount}/${currentChars.length} avatares reprocessados com sucesso!`);
}

run();
