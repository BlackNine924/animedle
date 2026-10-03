import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://frieren.fandom.com/'
};

const chars = JSON.parse(fs.readFileSync('src/data/animes/frieren/characters.json'));
const outDir = path.resolve('public/avatars/frieren');

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
  const titles = [
    `File:${name} anime profile.png`,
    `File:${name} anime portrait.png`,
    `File:${name} anime character design.jpg`,
    `File:${name} anime.png`,
    name
  ];

  for (const t of titles) {
    try {
      const url = `https://frieren.fandom.com/api.php?action=query&prop=imageinfo|pageimages&iiprop=url&titles=${encodeURIComponent(t)}&pithumbsize=600&format=json&redirects=1`;
      const res = await fetch(url, { headers: defaultHeaders });
      const data = await res.json();
      const page = Object.values(data.query?.pages || {})[0];
      const found = page?.imageinfo?.[0]?.url || page?.thumbnail?.source;
      if (found) return found;
    } catch (e) {}
  }
  return null;
}

async function processAndSave(buf, outPath) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buf);
  pipeline = pipeline.flatten({ background: '#202534' }).removeAlpha();

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
  console.log(`Starting Frieren anime avatar processing for ${chars.length} characters...`);
  let updated = 0;

  for (const c of chars) {
    const outPath = path.join(outDir, `${c.id}.png`);
    const cleanName = c.name.replace(/\s*\([^)]*\)/g, '').trim();

    let imgUrl = await fetchFromAniList(cleanName);
    let ref = 'https://anilist.co/';

    if (!imgUrl) {
      imgUrl = await fetchFromFandom(cleanName);
      ref = 'https://frieren.fandom.com/';
    }

    if (imgUrl) {
      try {
        const res = await fetch(imgUrl, {
          headers: { ...defaultHeaders, 'Referer': ref }
        });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAndSave(buf, outPath);
        updated++;
        console.log(`[${updated}/${chars.length}] ${c.id} updated`);
      } catch (err) {
        console.error(`[ERR] ${c.id}: ${err.message}`);
      }
    } else {
      // Re-process existing image to remove transparency and frame properly
      if (fs.existsSync(outPath)) {
        try {
          const buf = fs.readFileSync(outPath);
          await processAndSave(buf, outPath + '.tmp');
          fs.renameSync(outPath + '.tmp', outPath);
          console.log(`[RE-PROCESSED] ${c.id}`);
          updated++;
        } catch (e) {
          console.error(`[RE-PROCESS FAIL] ${c.id}: ${e.message}`);
        }
      }
    }
  }

  console.log(`\nFrieren avatar processing complete! Updated ${updated}/${chars.length} avatars.`);
}

run();
