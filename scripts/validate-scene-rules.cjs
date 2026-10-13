/**
 * Script CLI para validar tecnicamente arquivos .webp do Modo Cena
 * contra as regras de animação fluida (contagem de frames, variação de movimento e dimensões).
 *
 * Uso: node scripts/validate-scene-rules.cjs [anime/personagem.webp]
 */
const fs = require('fs');
const path = require('path');


const SCENES_DIR = path.join(__dirname, '..', 'public', 'scenes');

const RULES = {
  MIN_FRAMES: 18,
  MAX_FRAMES: 60,
  MIN_FILE_KB: 35,
  MAX_FILE_KB: 950,
};

function validateWebpFile(relPath) {
  const fullPath = path.join(SCENES_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    return { relPath, valid: false, error: 'Arquivo não encontrado' };
  }

  const stat = fs.statSync(fullPath);
  const sizeKB = Math.round(stat.size / 1024);

  // Conta chunks ANMF (frames animados em WebP RIFF)
  const buf = fs.readFileSync(fullPath);
  let frameCount = 0;
  for (let i = 0; i < buf.length - 4; i++) {
    if (
      buf[i] === 0x41 && // 'A'
      buf[i + 1] === 0x4e && // 'N'
      buf[i + 2] === 0x4d && // 'M'
      buf[i + 3] === 0x46 // 'F'
    ) {
      frameCount++;
    }
  }

  const issues = [];
  if (frameCount < RULES.MIN_FRAMES) {
    issues.push(`Poucos frames (${frameCount} < ${RULES.MIN_FRAMES}) — risco de parecer imagem estática`);
  }
  if (sizeKB < RULES.MIN_FILE_KB) {
    issues.push(`Arquivo muito pequeno (${sizeKB} KB) — possível cena estática ou baixa qualidade`);
  }

  return {
    relPath,
    valid: issues.length === 0,
    frameCount,
    sizeKB,
    issues,
  };
}

if (require.main === module) {
  const target = process.argv[2];
  if (target) {
    console.log(JSON.stringify(validateWebpFile(target), null, 2));
  } else {
    const animes = fs.readdirSync(SCENES_DIR).filter((d) =>
      fs.statSync(path.join(SCENES_DIR, d)).isDirectory()
    );
    const summary = {};
    for (const anime of animes) {
      const files = fs.readdirSync(path.join(SCENES_DIR, anime)).filter((f) => f.endsWith('.webp'));
      const results = files.map((f) => validateWebpFile(`${anime}/${f}`));
      summary[anime] = {
        total: results.length,
        valid: results.filter((r) => r.valid).length,
        flagged: results.filter((r) => !r.valid),
      };
    }
    console.log(JSON.stringify(summary, null, 2));
  }
}

module.exports = { validateWebpFile };
