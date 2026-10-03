import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

const targets = [
  // Nanatsu no Taizai
  { anime: 'nanatsu-no-taizai', id: 'meliodas', search: 'Meliodas', fandom: 'nanatsu-no-taizai' },
  { anime: 'nanatsu-no-taizai', id: 'gowther', search: 'Gowther', fandom: 'nanatsu-no-taizai' },
  { anime: 'nanatsu-no-taizai', id: 'hawk', search: 'Hawk', fandom: 'nanatsu-no-taizai' },
  { anime: 'nanatsu-no-taizai', id: 'zeldris', search: 'Zeldris', fandom: 'nanatsu-no-taizai' },

  // Fullmetal Alchemist
  { anime: 'fullmetal-alchemist', id: 'alphonse-elric', search: 'Alphonse Elric', fandom: 'fma' },

  // One Piece
  { anime: 'one-piece', id: 'wadatsumi', search: 'Wadatsumi', fandom: 'onepiece' },
  { anime: 'one-piece', id: 'wiper', search: 'Wiper', fandom: 'onepiece' },

  // Naruto
  { anime: 'naruto', id: 'hanzo', search: 'Hanzo', fandom: 'naruto' },

  // One Punch Man
  { anime: 'one-punch-man', id: 'captain-mizuki', search: 'Captain Mizuki', fandom: 'onepunchman' },

  // Solo Leveling
  { anime: 'solo-leveling', id: 'song-chiyul', search: 'Song Chi-Yul', fandom: 'solo-leveling' },
  { anime: 'solo-leveling', id: 'woo-jinchul', search: 'Woo Jin-Chul', fandom: 'solo-leveling' },

  // Hunter x Hunter
  { anime: 'hunter-x-hunter', id: 'colt', search: 'Colt', fandom: 'hunterxhunter' },
  { anime: 'hunter-x-hunter', id: 'milluki-zoldyck', search: 'Milluki Zoldyck', fandom: 'hunterxhunter' },
  { anime: 'hunter-x-hunter', id: 'razor', search: 'Razor', fandom: 'hunterxhunter' },
  { anime: 'hunter-x-hunter', id: 'zazan', search: 'Zazan', fandom: 'hunterxhunter' },

  // Bleach
  { anime: 'bleach', id: 'pernida-parnkgjas', search: 'Pernida Parnkgjas', fandom: 'bleach' },

  // Demon Slayer
  { anime: 'demon-slayer', id: 'kiyo-terauchi', search: 'Kiyo Terauchi', fandom: 'kimetsu-no-yaiba' },
  { anime: 'demon-slayer', id: 'mukago', search: 'Mukago', fandom: 'kimetsu-no-yaiba' },
  { anime: 'demon-slayer', id: 'naho-takada', search: 'Naho Takada', fandom: 'kimetsu-no-yaiba' },
  { anime: 'demon-slayer', id: 'sumi-nakahara', search: 'Sumi Nakahara', fandom: 'kimetsu-no-yaiba' },

  // Dragon Ball
  { anime: 'dragon-ball', id: 'granolah', search: 'Granolah', fandom: 'dragonball' },
  { anime: 'dragon-ball', id: 'gas', search: 'Gas', fandom: 'dragonball' }
];

async function fetchFromAniList(search) {
  const query = `
    query ($search: String) {
      Character(search: $search) {
        id
        name { full }
        image { large }
      }
    }
  `;
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { search } })
    });
    const data = await res.json();
    return data.data?.Character?.image?.large || null;
  } catch (e) {
    return null;
  }
}

async function fetchFromFandom(domain, search) {
  try {
    const url = `https://${domain}.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(search)}&pithumbsize=600&format=json&redirects=1`;
    const res = await fetch(url, { headers: { ...defaultHeaders, 'Referer': `https://${domain}.fandom.com/` } });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (e) {
    return null;
  }
}

async function processAndSave(buf, outPath, domain) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buf);
  pipeline = pipeline.flatten({ background: '#181a24' }).removeAlpha();

  if (h > w * 1.15) {
    const cropSize = Math.round(w * 0.88);
    const left = Math.round((w - cropSize) / 2);
    const top = Math.round(h * 0.12);
    pipeline = pipeline.extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: cropSize,
      height: Math.min(cropSize, h - top)
    });
  } else if (w > h * 1.15) {
    const cropSize = Math.round(h * 0.90);
    const left = Math.round((w - cropSize) / 2);
    const top = Math.round((h - cropSize) / 2);
    pipeline = pipeline.extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: cropSize,
      height: cropSize
    });
  }

  await pipeline
    .resize(240, 240, { fit: 'cover' })
    .png({ quality: 90 })
    .toFile(outPath);
}

async function run() {
  for (const t of targets) {
    const outPath = path.resolve('public/avatars', t.anime, `${t.id}.png`);
    let imgUrl = await fetchFromAniList(t.search);
    let ref = 'https://anilist.co/';

    if (!imgUrl && t.fandom) {
      imgUrl = await fetchFromFandom(t.fandom, t.search);
      ref = `https://${t.fandom}.fandom.com/`;
    }

    if (imgUrl) {
      try {
        const res = await fetch(imgUrl, { headers: { ...defaultHeaders, 'Referer': ref } });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAndSave(buf, outPath, t.fandom);
        console.log(`[OK] ${t.anime}/${t.id} updated`);
      } catch (e) {
        console.error(`[ERR] ${t.id}: ${e.message}`);
      }
    } else {
      console.log(`[NOT FOUND] ${t.id}`);
    }
  }
}

run();
