import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { AKAME_CHARACTERS } from './data/akame-characters.mjs';
import { CYBERPUNK_CHARACTERS } from './data/cyberpunk-characters.mjs';
import { SHANGRI_LA_CHARACTERS } from './data/shangri-la-characters.mjs';
import { WITCH_HAT_CHARACTERS } from './data/witch-hat-characters.mjs';
import { NANATSU_CHARACTERS } from './data/nanatsu-characters.mjs';
import { MHA_CHARACTERS } from './data/mha-characters.mjs';

const ANIMES = [
  { slug: 'akame-ga-kill', wiki: 'akamegakill', chars: AKAME_CHARACTERS },
  { slug: 'cyberpunk-edgerunners', wiki: 'cyberpunk', chars: CYBERPUNK_CHARACTERS },
  { slug: 'shangri-la-frontier', wiki: 'shangrila-frontier', chars: SHANGRI_LA_CHARACTERS },
  { slug: 'witch-hat-atelier', wiki: 'witch-hat-atelier', chars: WITCH_HAT_CHARACTERS },
  { slug: 'nanatsu-no-taizai', wiki: 'nanatsu-no-taizai', chars: NANATSU_CHARACTERS },
  { slug: 'my-hero-academia', wiki: 'myheroacademia', chars: MHA_CHARACTERS }
];

const ANILIST_QUERY = `query ($search: String) {
  Character(search: $search) {
    id
    name { full native }
    image { large }
  }
}`;

async function fetchAniListImage(name) {
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({ query: ANILIST_QUERY, variables: { search: name } })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.Character?.image?.large || null;
  } catch {
    return null;
  }
}

async function fetchWikiThumbnail(domain, title) {
  const url = `https://${domain}.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json&redirects=1`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': `https://${domain}.fandom.com/`
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch {
    return null;
  }
}

async function processAvatarTightFace(buffer, outputPath) {
  const { data, info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  let isFullBodyTransparent = false;
  let charMinY = h, charMaxY = 0, charMinX = w, charMaxX = 0;

  // ONLY treat as transparent character sprite if image actually has an alpha channel
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
    // Transparent character sheet sprite (like MHA, Witch Hat, Shangri-La)
    if (transparentCount > (w * h * 0.12) && charH > 350) {
      isFullBodyTransparent = true;
    }
  }

  let left, top, cropW, cropH;

  if (isFullBodyTransparent) {
    const charH = charMaxY - charMinY;

    // 1. Try to find face via top-most skin tone cluster (e.g. Deku with huge cape)
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
      // Skin face detected!
      const faceCenterX = Math.round((faceMinX + faceMaxX) / 2);
      const faceCenterY = firstFaceY + 30; // Eyes/nose level
      const boxSize = Math.min(w, h, Math.round(charH * 0.38));
      cropW = boxSize;
      cropH = boxSize;
      top = Math.max(0, Math.min(h - boxSize, faceCenterY - Math.round(boxSize * 0.45)));
      left = Math.max(0, Math.min(w - boxSize, faceCenterX - Math.round(boxSize / 2)));
    } else {
      // Pointed hat, mask, or non-human face (Beldaruit, Sunraku, Emul)
      const topSpan = Math.round(charH * 0.12);
      let topMinX = w, topMaxX = 0;
      for (let y = charMinY; y < charMinY + topSpan; y++) {
        for (let x = 0; x < w; x++) {
          if (data[(y * w + x) * 4 + 3] >= 40) {
            if (x < topMinX) topMinX = x;
            if (x > topMaxX) topMaxX = x;
          }
        }
      }
      const topW = topMaxX - topMinX;
      const topCenterX = topMaxX > topMinX ? Math.round((topMinX + topMaxX) / 2) : Math.round((charMinX + charMaxX) / 2);
      const hasPointyHat = topW < (charH * 0.16);

      const factor = hasPointyHat ? 0.45 : 0.38;
      const boxSize = Math.min(w, h, Math.round(charH * factor));
      cropW = boxSize;
      cropH = boxSize;
      top = charMinY;
      left = Math.max(0, Math.min(w - boxSize, topCenterX - Math.round(boxSize / 2)));
    }
  } else {
    // Standard bust portrait or anime scene screenshot (Cyberpunk, Akame, Nanatsu, etc.)
    // Keep full width/height square centered on upper body so chin/eyes/hair are never cut
    if (h >= w) {
      const side = w;
      cropW = side;
      cropH = side;
      const overflow = h - side;
      // 12% overflow offset starts slightly below the very top capturing head and face
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

async function processAnime(anime) {
  const { slug, wiki, chars } = anime;
  const outAvatarsDir = path.join('public', 'avatars', slug);
  const outJsonPath = path.join('src', 'data', 'animes', slug, 'characters.json');

  fs.mkdirSync(outAvatarsDir, { recursive: true });
  fs.mkdirSync(path.dirname(outJsonPath), { recursive: true });

  console.log(`\n========================================`);
  console.log(`  PROCESSANDO ${slug.toUpperCase()} (${chars.length} personagens)`);
  console.log(`========================================`);

  const finalChars = [];
  let success = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const outputPath = path.join(outAvatarsDir, `${char.id}.png`);

    const searchName = char.searchName || char.name.split('(')[0].trim();
    let imgUrl = null;

    // 1. Try Fandom Wiki first for official character infobox
    if (wiki) {
      const wikiTitle = char.wikiTitle || searchName;
      imgUrl = await fetchWikiThumbnail(wiki, wikiTitle);
      if (!imgUrl && char.wikiTitle !== char.name) {
        imgUrl = await fetchWikiThumbnail(wiki, char.name);
      }
    }

    // 2. Fallback to AniList
    if (!imgUrl) {
      imgUrl = await fetchAniListImage(searchName);
    }

    if (imgUrl) {
      try {
        const res = await fetch(imgUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': wiki ? `https://${wiki}.fandom.com/` : 'https://anilist.co'
          }
        });
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          await processAvatarTightFace(buf, outputPath);
          success++;
          process.stdout.write(`[${i+1}/${chars.length}] ${char.name} (Face OK)\n`);
        } else {
          process.stdout.write(`[${i+1}/${chars.length}] ${char.name} (HTTP ${res.status})\n`);
        }
      } catch (err) {
        console.warn(`[${i+1}/${chars.length}] ${char.name} (Erro): ${err.message}`);
      }
    } else {
      process.stdout.write(`[${i+1}/${chars.length}] ${char.name} (Sem nova URL, mantendo existente se houver)\n`);
    }

    const { wikiTitle: _, searchName: __, ...cleanChar } = char;
    finalChars.push({
      ...cleanChar,
      avatar: `/avatars/${slug}/${char.id}.png`
    });

    await new Promise(r => setTimeout(r, 60));
  }

  fs.writeFileSync(outJsonPath, JSON.stringify(finalChars, null, 2), 'utf8');
  console.log(`[CONCLUÍDO] ${slug}: ${success}/${chars.length} avatares com foco no rosto e characters.json atualizado!`);
}

async function run() {
  for (const anime of ANIMES) {
    await processAnime(anime);
  }
  console.log('\nTODOS OS 6 ANIMES FORAM PROCESSADOS COM SUCESSO!');
}

await run();
