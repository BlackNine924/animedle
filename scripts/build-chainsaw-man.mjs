import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { CSM_CHARACTERS } from './data/csm-characters.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'chainsaw-man');
const charactersJsonPath = path.join(rootDir, 'src', 'data', 'animes', 'chainsaw-man', 'characters.json');

fs.mkdirSync(avatarsDir, { recursive: true });
fs.mkdirSync(path.dirname(charactersJsonPath), { recursive: true });

async function fetchWikiThumbnail(title) {
  const url = `https://chainsaw-man.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json&redirects=1`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'AnimedleBot/1.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://chainsaw-man.fandom.com/'
      }
    });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (err) {
    console.error(`Erro ao buscar wiki para "${title}":`, err.message);
    return null;
  }
}

async function processAvatar(buffer, outputPath) {
  const { data, info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  let isFullBodyTransparent = false;
  let charMinY = h, charMaxY = 0, charMinX = w, charMaxX = 0;

  if (info.channels === 4) {
    let transparentCount = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        if (data[idx + 3] < 40) {
          transparentCount++;
        } else {
          if (y < charMinY) charMinY = y;
          if (y > charMaxY) charMaxY = y;
          if (x < charMinX) charMinX = x;
          if (x > charMaxX) charMaxX = x;
        }
      }
    }

    const charH = charMaxY - charMinY;
    if (transparentCount > (w * h * 0.12) && charH > 350) {
      isFullBodyTransparent = true;
    }
  }

  let left, top, cropW, cropH;

  if (isFullBodyTransparent) {
    const charH = charMaxY - charMinY;
    const charW = charMaxX - charMinX;

    // Check if small mascot creature like Pochita
    const isMascot = (charW / charH) > 0.50 && charH < 600;

    if (isMascot) {
      const boxSize = Math.min(w, h, Math.round(charH * 0.65));
      cropW = boxSize;
      cropH = boxSize;
      top = charMinY + Math.round(charH * 0.07);
      left = Math.max(0, Math.min(w - boxSize, Math.round((charMinX + charMaxX) / 2) - Math.round(boxSize / 2)));
    } else {
      // 1. Detect human face via skin tone cluster
      let firstFaceY = null;
      let faceMinX = w, faceMaxX = 0;

      for (let y = charMinY; y < Math.min(h, charMinY + Math.round(charH * 0.55)); y++) {
        let rowSkin = 0;
        let rowMinX = w, rowMaxX = 0;
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          if (data[idx + 3] < 50) continue;
          const r = data[idx], g = data[idx+1], b = data[idx+2];
          if (r > 190 && g > 130 && g < 210 && b > 100 && b < 185 && r > g && g > b) {
            rowSkin++;
            if (x < rowMinX) rowMinX = x;
            if (x > rowMaxX) rowMaxX = x;
          }
        }
        if (rowSkin >= 10 && firstFaceY === null) {
          firstFaceY = y;
        }
        if (firstFaceY !== null && y < firstFaceY + 120 && rowSkin >= 5) {
          if (rowMinX < faceMinX) faceMinX = rowMinX;
          if (rowMaxX > faceMaxX) faceMaxX = rowMaxX;
        }
      }

      if (firstFaceY !== null && faceMaxX > faceMinX) {
        // Human face centered tight (captures face, hair, neck and collar - no torso/pants)
        const faceCenterX = Math.round((faceMinX + faceMaxX) / 2);
        const faceCenterY = firstFaceY + 30;
        const boxSize = Math.min(w, h, Math.round(charH * 0.28));
        cropW = boxSize;
        cropH = boxSize;
        top = Math.max(0, Math.min(h - boxSize, faceCenterY - Math.round(boxSize * 0.45)));
        left = Math.max(0, Math.min(w - boxSize, faceCenterX - Math.round(boxSize / 2)));
      } else {
        // Demon head / mask without skin tone (Darkness Devil, Katana Man, Gun Devil, etc.)
        const topSpan = Math.round(charH * 0.15);
        let topMinX = w, topMaxX = 0;
        for (let y = charMinY; y < charMinY + topSpan; y++) {
          for (let x = 0; x < w; x++) {
            if (data[(y * w + x) * 4 + 3] >= 40) {
              if (x < topMinX) topMinX = x;
              if (x > topMaxX) topMaxX = x;
            }
          }
        }
        const topCenterX = topMaxX > topMinX ? Math.round((topMinX + topMaxX) / 2) : Math.round((charMinX + charMaxX) / 2);
        const boxSize = Math.min(w, h, Math.round(charH * 0.35));
        cropW = boxSize;
        cropH = boxSize;
        top = charMinY;
        left = Math.max(0, Math.min(w - boxSize, topCenterX - Math.round(boxSize / 2)));
      }
    }
  } else {
    // 3-channel scene screenshot or bust shot
    if (h >= w) {
      const side = w;
      cropW = side;
      cropH = side;
      const overflow = h - side;
      top = Math.max(0, Math.min(Math.round(overflow * 0.12), overflow));
      left = 0;
    } else {
      const side = h;
      cropW = side;
      cropH = side;
      top = 0;
      left = Math.round((w - side) / 2);
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

async function buildChainsawMan() {
  console.log(`\n=== INICIANDO INTEGRAÇÃO DE CHAINSAW MAN (${CSM_CHARACTERS.length} PERSONAGENS) ===\n`);

  let successCount = 0;
  const missing = [];

  for (let i = 0; i < CSM_CHARACTERS.length; i++) {
    const char = CSM_CHARACTERS[i];
    const outputPath = path.join(avatarsDir, `${char.id}.png`);
    const wikiTitle = char.wikiTitle || char.name;

    console.log(`[${i + 1}/${CSM_CHARACTERS.length}] Processando ${char.name} (${char.id}) [Wiki: ${wikiTitle}]...`);

    let imageUrl = await fetchWikiThumbnail(wikiTitle);

    if (!imageUrl && char.wikiTitle && char.wikiTitle !== char.name) {
      imageUrl = await fetchWikiThumbnail(char.name);
    }

    if (!imageUrl) {
      console.warn(`   ⚠️ URL de imagem não encontrada para ${char.name} (${wikiTitle})`);
      missing.push({ id: char.id, name: char.name, wikiTitle });
      continue;
    }

    try {
      const res = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://chainsaw-man.fandom.com/'
        }
      });

      if (!res.ok) {
        console.warn(`   ⚠️ Erro HTTP ${res.status} ao baixar imagem de ${char.name}`);
        missing.push({ id: char.id, name: char.name, wikiTitle });
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      await processAvatar(buffer, outputPath);
      console.log(`   ✓ Avatar salvo em: ${char.id}.png`);
      successCount++;
    } catch (err) {
      console.error(`   ❌ Falha ao processar avatar de ${char.name}:`, err.message);
      missing.push({ id: char.id, name: char.name, wikiTitle });
    }

    await new Promise(r => setTimeout(r, 100));
  }

  // Grava characters.json limpando wikiTitle
  const cleanCharacters = CSM_CHARACTERS.map(c => {
    const { wikiTitle, ...cleanChar } = c;
    return cleanChar;
  });

  fs.writeFileSync(charactersJsonPath, JSON.stringify(cleanCharacters, null, 2), 'utf-8');
  console.log(`\n=== RESULTADO: ${cleanCharacters.length} personagens salvos em ${charactersJsonPath} (${successCount} avatares gerados) ===\n`);

  if (missing.length > 0) {
    console.log(`Avisos: ${missing.length} imagens faltantes:`, JSON.stringify(missing, null, 2));
  }
}

buildChainsawMan().catch(console.error);
