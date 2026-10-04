import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const animes = fs.readdirSync('src/data/animes').filter(d => fs.statSync('src/data/animes/' + d).isDirectory());

async function inspectCandidates() {
  const flagged = [];

  for (const anime of animes) {
    const jsonPath = path.join('src/data/animes', anime, 'characters.json');
    if (!fs.existsSync(jsonPath)) continue;
    const chars = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    for (const c of chars) {
      if (!c.avatar) continue;
      const avatarPath = path.join('public', c.avatar.replace(/^\//, ''));
      if (!fs.existsSync(avatarPath)) continue;

      try {
        const img = sharp(avatarPath);
        const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

        let exactWhite = 0;
        let exactNavy = 0;
        let greyPixels = 0;
        let total = info.width * info.height;

        for (let i = 0; i < data.length; i += info.channels) {
          const r = data[i], g = data[i+1], b = data[i+2];
          if (r === 255 && g === 255 && b === 255) exactWhite++;
          if ((r === 18 && (g === 26 || g === 25) && (b === 45 || b === 41))) exactNavy++;
          if (Math.abs(r - g) < 4 && Math.abs(g - b) < 4 && Math.abs(r - b) < 4) {
            greyPixels++;
          }
        }

        const whitePct = (exactWhite / total) * 100;
        const navyPct = (exactNavy / total) * 100;
        const greyPct = (greyPixels / total) * 100;

        const isGreyscale = greyPct > 85;
        const isFlatWhite = whitePct > 15;
        const isFlatNavy = navyPct > 10;

        if (isFlatNavy) {
          flagged.push({
            anime,
            id: c.id,
            name: c.name,
            avatar: c.avatar,
            issue: 'FUNDO_DISCONEXO_NAVY',
            detail: `Fundo plano artificial #121A2D (${navyPct.toFixed(1)}% sólido)`
          });
        } else if (isFlatWhite) {
          flagged.push({
            anime,
            id: c.id,
            name: c.name,
            avatar: c.avatar,
            issue: 'FUNDO_DISCONEXO_BRANCO',
            detail: `Fundo branco liso / design sheet (${whitePct.toFixed(1)}% branco puro)`
          });
        } else if (isGreyscale) {
          flagged.push({
            anime,
            id: c.id,
            name: c.name,
            avatar: c.avatar,
            issue: 'MANGA_PB',
            detail: `Mangá preto e branco (${greyPct.toFixed(1)}% cinza)`
          });
        }
      } catch (err) {}
    }
  }

  console.log('Total flagged candidates across all 32 animes:', flagged.length);
  fs.writeFileSync('scripts/audit-candidates-all.json', JSON.stringify(flagged, null, 2));
}

inspectCandidates();
