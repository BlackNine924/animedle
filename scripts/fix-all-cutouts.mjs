import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function searchAnilist(characterName) {
  try {
    const query = `query ($search: String) {
      Character(search: $search) {
        id
        name { full }
        image { large }
      }
    }`;
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { search: characterName } })
    });
    const data = await res.json();
    return data.data?.Character?.image?.large;
  } catch {
    return null;
  }
}

async function processHeadshot(imgBuffer, destPath) {
  const meta = await sharp(imgBuffer).metadata();
  const width = meta.width || 240;
  const height = meta.height || 240;

  let pipeline = sharp(imgBuffer);

  // If vertical portrait, crop top-biased (face is at upper ~50-60%)
  if (height > width * 1.05) {
    const cropHeight = Math.min(height, Math.round(width * 1.15));
    pipeline = pipeline.extract({ left: 0, top: 0, width, height: cropHeight });
  }

  const outputBuffer = await pipeline
    .resize(240, 240, { fit: 'cover', position: 'top' })
    .png({ quality: 90 })
    .toBuffer();

  fs.writeFileSync(destPath, outputBuffer);
  return outputBuffer.length;
}

async function fixAnimes(targetAnimes) {
  for (const anime of targetAnimes) {
    const p = `src/data/animes/${anime}/characters.json`;
    if (!fs.existsSync(p)) continue;
    const chars = JSON.parse(fs.readFileSync(p, 'utf-8'));
    let fixed = 0;

    for (const c of chars) {
      if (!c.avatar || c.avatar.startsWith('http')) continue;
      const localPath = 'public' + c.avatar;
      if (!fs.existsSync(localPath)) continue;

      let needsFix = false;
      try {
        const meta = await sharp(localPath).metadata();
        if (meta.hasAlpha) {
          needsFix = true;
        }
      } catch (e) {}

      if (needsFix) {
        const cleanName = c.name.replace(/\(.*?\)/g, '').trim();
        const url = await searchAnilist(cleanName);
        if (url) {
          try {
            const res = await fetch(url);
            if (res.ok) {
              const buf = Buffer.from(await res.arrayBuffer());
              if (buf.length > 500) {
                await processHeadshot(buf, localPath);
                fixed++;
                console.log(`[${anime}] Fixed headshot for: ${c.name}`);
              }
            }
          } catch (err) {}
        }
        await new Promise(r => setTimeout(r, 60));
      }
    }
    console.log(`==== Finished ${anime}: ${fixed} cutouts replaced with authentic headshots! ====`);
  }
}

// Run for Romance and other animes with transparent cutouts
const targets = [
  'romance',
  'my-hero-academia',
  'frieren',
  'chainsaw-man',
  'dandadan',
  'record-of-ragnarok',
  'shangri-la-frontier',
  'solo-leveling',
  'witch-hat-atelier',
  'kaiju-no-8',
  'tensei-shitara-slime-datta-ken',
  'black-clover',
  'bleach',
  'demon-slayer',
  'dragon-ball',
  'fairy-tail',
  'hunter-x-hunter',
  'jojos-bizarre-adventure',
  'jujutsu-kaisen',
  'nanatsu-no-taizai',
  'naruto',
  'one-piece'
];

fixAnimes(targets);
