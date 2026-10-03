import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

const chars = JSON.parse(fs.readFileSync('src/data/animes/my-hero-academia/characters.json'));
const outDir = path.resolve('public/avatars/my-hero-academia');

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

async function processAndSave(buf, outPath) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buf);
  pipeline = pipeline.flatten({ background: '#1c2230' }).removeAlpha();

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
  console.log(`Starting MHA avatar upgrade for ${chars.length} characters...`);
  let updated = 0;

  for (const c of chars) {
    const outPath = path.join(outDir, `${c.id}.png`);
    const cleanName = c.name.replace(/\s*\([^)]*\)/g, '').trim();

    const imgUrl = await fetchFromAniList(cleanName);

    if (imgUrl) {
      try {
        const res = await fetch(imgUrl, { headers: defaultHeaders });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAndSave(buf, outPath);
        updated++;
        console.log(`[${updated}/${chars.length}] ${c.id} updated`);
      } catch (err) {
        console.error(`[ERR] ${c.id}: ${err.message}`);
      }
    } else {
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

  console.log(`\nMHA avatar processing complete! Updated ${updated}/${chars.length} avatars.`);
}

run();
