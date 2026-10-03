import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

const chars = JSON.parse(fs.readFileSync('src/data/animes/tokyo-ghoul/characters.json'));
const outDir = path.resolve('public/avatars/tokyo-ghoul');

async function fetchFromAniList(name) {
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
      body: JSON.stringify({ query, variables: { search: name } })
    });
    const data = await res.json();
    return data.data?.Character?.image?.large || null;
  } catch (e) {
    return null;
  }
}

async function fetchFromFandom(name) {
  // First search for anime file
  try {
    const sUrl = `https://tokyoghoul.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(name + ' anime')}&srnamespace=6&format=json`;
    const sRes = await fetch(sUrl, {
      headers: { ...defaultHeaders, 'Referer': 'https://tokyoghoul.fandom.com/' }
    });
    const sData = await sRes.json();
    const hits = sData.query?.search || [];
    
    // Pick the best hit that doesn't say "manga"
    let chosen = null;
    for (const hit of hits) {
      const t = hit.title.toLowerCase();
      if (!t.includes('manga') && !t.includes('vol') && !t.includes('chapter')) {
        chosen = hit.title;
        break;
      }
    }
    if (!chosen && hits.length > 0) chosen = hits[0].title;

    if (chosen) {
      const iiUrl = `https://tokyoghoul.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(chosen)}&format=json`;
      const iiRes = await fetch(iiUrl, {
        headers: { ...defaultHeaders, 'Referer': 'https://tokyoghoul.fandom.com/' }
      });
      const iiData = await iiRes.json();
      const page = Object.values(iiData.query?.pages || {})[0];
      return page?.imageinfo?.[0]?.url || null;
    }
  } catch (e) {}

  // Fallback to page thumbnail
  try {
    const pUrl = `https://tokyoghoul.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(name)}&pithumbsize=600&format=json&redirects=1`;
    const pRes = await fetch(pUrl, {
      headers: { ...defaultHeaders, 'Referer': 'https://tokyoghoul.fandom.com/' }
    });
    const pData = await pRes.json();
    const page = Object.values(pData.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (e) {
    return null;
  }
}

async function processAndSave(buf, outPath) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buf);
  pipeline = pipeline.flatten({ background: '#181a24' }).removeAlpha();

  if (h > w * 1.15) {
    const cropSize = Math.round(w * 0.88);
    const left = Math.round((w - cropSize) / 2);
    const top = Math.round(h * 0.08);
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
  console.log(`Starting Tokyo Ghoul Anime Avatar migration for ${chars.length} characters...`);
  let updated = 0;

  for (const c of chars) {
    const outPath = path.join(outDir, `${c.id}.png`);
    const cleanName = c.name.replace(/\s*\([^)]*\)/g, '').trim();

    // Prefer AniList or Fandom anime
    let imgUrl = await fetchFromAniList(cleanName);
    let referer = 'https://anilist.co/';

    if (!imgUrl) {
      imgUrl = await fetchFromFandom(cleanName);
      referer = 'https://tokyoghoul.fandom.com/';
    }

    if (imgUrl) {
      try {
        const res = await fetch(imgUrl, {
          headers: { ...defaultHeaders, 'Referer': referer }
        });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAndSave(buf, outPath);
        updated++;
        console.log(`[${updated}/${chars.length}] ${c.id} updated from ${imgUrl.slice(0, 60)}...`);
      } catch (err) {
        console.error(`[ERR] ${c.id}: ${err.message}`);
      }
    } else {
      console.log(`[SKIP] No source found for ${c.id}`);
    }
  }

  console.log(`\nMigration completed! Updated ${updated}/${chars.length} avatars.`);
}

run();
