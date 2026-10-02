import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { SHANGRI_LA_CHARACTERS } from './data/shangri-la-characters.mjs';

const animeSlug = 'shangri-la-frontier';
const wikiDomain = 'shangrila-frontier';
const outAvatarsDir = path.resolve('public/avatars', animeSlug);
const charactersJsonPath = path.resolve('src/data/animes', animeSlug, 'characters.json');

const currentChars = JSON.parse(fs.readFileSync(charactersJsonPath, 'utf8'));

// Characters with curated custom avatar crops
const PRESERVED_CHARACTERS = new Set(['sunraku', 'lycagon', 'siegwurm', 'megu-hizutome', 'wezaemon']);

async function fetchWikiThumbnail(title) {
  const url = `https://${wikiDomain}.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=1000&format=json&redirects=1`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://shangrila-frontier.fandom.com/'
      }
    });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (err) {
    console.error(`Erro ao buscar wiki "${title}":`, err.message);
    return null;
  }
}

async function processAvatarTightSLF(buffer, outputPath) {
  const img = sharp(buffer);
  const meta = await img.metadata();
  const w = meta.width;
  const h = meta.height;
  const { data } = await img.raw().toBuffer({ resolveWithObject: true });

  let charMinY = h, charMaxY = 0, charMinX = w, charMaxX = 0;
  let transparentCount = 0;
  const channels = meta.channels;

  if (channels === 4) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const a = data[(y * w + x) * 4 + 3];
        if (a < 50) {
          transparentCount++;
        } else {
          if (y < charMinY) charMinY = y;
          if (y > charMaxY) charMaxY = y;
          if (x < charMinX) charMinX = x;
          if (x > charMaxX) charMaxX = x;
        }
      }
    }
  }

  const isFullBodyTransparent = (channels === 4 && transparentCount > (w * h * 0.08) && (charMaxY - charMinY) > 220);
  let left, top, cropW, cropH;

  if (isFullBodyTransparent) {
    const charH = charMaxY - charMinY;
    const charW = charMaxX - charMinX;

    // Scan skin tones in top 50%
    let firstFaceY = null;
    let faceMinX = w, faceMaxX = 0;
    for (let y = charMinY; y < Math.min(h, charMinY + Math.round(charH * 0.50)); y++) {
      let rowSkin = 0;
      let rMin = w, rMax = 0;
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        if (data[idx + 3] < 50) continue;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 175 && g > 115 && g < 225 && b > 80 && b < 210 && r >= g && g >= b) {
          rowSkin++;
          if (x < rMin) rMin = x;
          if (x > rMax) rMax = x;
        }
      }
      if (rowSkin >= 6 && firstFaceY === null) {
        firstFaceY = y;
      }
      if (firstFaceY !== null && y < firstFaceY + 130 && rowSkin >= 4) {
        if (faceMaxX > faceMinX) {
          const curCenter = (faceMinX + faceMaxX) / 2;
          if (Math.abs(rMin - curCenter) < 140 && Math.abs(rMax - curCenter) < 140) {
            if (rMin < faceMinX) faceMinX = rMin;
            if (rMax > faceMaxX) faceMaxX = rMax;
          }
        } else {
          if (rMin < faceMinX) faceMinX = rMin;
          if (rMax > faceMaxX) faceMaxX = rMax;
        }
      }
    }

    if (firstFaceY !== null && faceMaxX > faceMinX) {
      const faceCenterX = Math.round((faceMinX + faceMaxX) / 2);
      const faceCenterY = firstFaceY + 25;
      let boxSize = Math.round(charH * 0.23);
      const faceWidth = faceMaxX - faceMinX;
      boxSize = Math.max(boxSize, Math.round(faceWidth * 1.45));
      boxSize = Math.min(boxSize, w, h, Math.round(charH * 0.33));

      cropW = boxSize;
      cropH = boxSize;
      top = Math.max(charMinY, Math.min(h - boxSize, faceCenterY - Math.round(boxSize * 0.44)));
      left = Math.max(0, Math.min(w - boxSize, faceCenterX - Math.round(boxSize / 2)));
    } else {
      // Monster / no-skin mascot
      const boxSize = Math.min(w, h, Math.round(charH * 0.35));
      cropW = boxSize;
      cropH = boxSize;
      top = charMinY;
      const charCenterX = Math.round((charMinX + charMaxX) / 2);
      left = Math.max(0, Math.min(w - boxSize, charCenterX - Math.round(boxSize / 2)));
    }
  } else {
    // 3-channel
    if (h >= w) {
      cropW = w;
      cropH = w;
      top = Math.round((h - w) * 0.08);
      left = 0;
    } else {
      cropW = h;
      cropH = h;
      top = 0;
      left = Math.round((w - h) / 2);
    }
  }

  cropW = Math.max(1, Math.min(cropW, w - left));
  cropH = Math.max(1, Math.min(cropH, h - top));

  await sharp(buffer)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(240, 240, { fit: 'cover', position: 'top' })
    .png({ quality: 95 })
    .toFile(outputPath);
}

async function run() {
  console.log(`Starting Shangri-La Frontier avatar regeneration for ${currentChars.length} characters...`);
  let success = 0;

  for (let i = 0; i < currentChars.length; i++) {
    const char = currentChars[i];
    const outPath = path.join(outAvatarsDir, `${char.id}.png`);

    if (PRESERVED_CHARACTERS.has(char.id)) {
      console.log(`[${i + 1}/${currentChars.length}] ${char.name} (${char.id}) -> Curated avatar preserved.`);
      success++;
      continue;
    }

    const foundData = SHANGRI_LA_CHARACTERS.find(fc => fc.id === char.id);
    const wikiTitle = foundData?.wikiTitle || char.name;

    console.log(`[${i + 1}/${currentChars.length}] ${char.name} (${char.id}) -> Wiki: ${wikiTitle}`);

    let src = await fetchWikiThumbnail(wikiTitle);
    if (!src && wikiTitle !== char.name) {
      src = await fetchWikiThumbnail(char.name);
    }

    if (!src) {
      console.warn(`   ⚠️ Wiki thumbnail not found, checking existing avatar...`);
      if (fs.existsSync(outPath)) {
        try {
          const buf = fs.readFileSync(outPath);
          await processAvatarTightSLF(buf, outPath);
          console.log(`   ✓ Recropped existing ${char.id}.png`);
          success++;
        } catch (e) {
          console.error(`   ❌ Failed:`, e.message);
        }
      }
      continue;
    }

    try {
      const res = await fetch(src, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://shangrila-frontier.fandom.com/'
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await processAvatarTightSLF(buf, outPath);
      console.log(`   ✓ Saved ${char.id}.png`);
      success++;
    } catch (err) {
      console.error(`   ❌ Failed:`, err.message);
    }

    await new Promise(r => setTimeout(r, 60));
  }

  // Clean test files
  const testFiles = fs.readdirSync(outAvatarsDir).filter(f => f.startsWith('test-'));
  for (const tf of testFiles) {
    fs.unlinkSync(path.join(outAvatarsDir, tf));
  }

  console.log(`\n=== COMPLETED SHANGRI-LA FRONTIER: ${success}/${currentChars.length} SUCCESSFUL ===`);
}

run();
