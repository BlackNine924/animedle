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

async function processAndSaveImage(imgBuffer, destPath) {
  const meta = await sharp(imgBuffer).metadata();
  const width = meta.width || 240;
  const height = meta.height || 240;

  let pipeline = sharp(imgBuffer);

  // If vertical portrait, crop top-biased so head/face fills the 240x240 frame
  if (height > width * 1.05) {
    const cropHeight = Math.min(height, Math.round(width * 1.15));
    pipeline = pipeline.extract({ left: 0, top: 0, width, height: cropHeight });
  }

  const outputBuffer = await pipeline
    .resize(240, 240, { fit: 'cover', position: 'top' })
    .png({ quality: 90 })
    .toBuffer();

  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(destPath, outputBuffer);
  return outputBuffer.length;
}

async function run() {
  const animes = ['one-piece', 'naruto', 'jujutsu-kaisen', 'demon-slayer'];

  for (const anime of animes) {
    const jsonPath = `src/data/animes/${anime}/characters.json`;
    const chars = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    let updatedCount = 0;

    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];
      if (!c.avatar || !c.avatar.startsWith('http')) continue;

      const destPath = `public/avatars/${anime}/${c.id}.png`;
      let downloaded = false;

      // Try current URL first
      try {
        const res = await fetch(c.avatar, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          if (buf.length > 500) {
            await processAndSaveImage(buf, destPath);
            downloaded = true;
          }
        }
      } catch (e) {}

      // If URL failed (like Caribou 404), search AniList by clean name
      if (!downloaded) {
        console.log(`Searching AniList for ${c.name} (${c.id})...`);
        // Clean name (remove parentheses like '(Barba Negra)' or '(104ª)')
        const cleanName = c.name.replace(/\(.*?\)/g, '').trim();
        const fallbackUrl = await searchAnilist(cleanName);
        if (fallbackUrl) {
          try {
            const res = await fetch(fallbackUrl);
            if (res.ok) {
              const buf = Buffer.from(await res.arrayBuffer());
              if (buf.length > 500) {
                await processAndSaveImage(buf, destPath);
                downloaded = true;
                console.log(`✓ Fetched & saved ${c.name} from AniList!`);
              }
            }
          } catch (e) {}
        }
      }

      if (downloaded) {
        c.avatar = `/avatars/${anime}/${c.id}.png`;
        updatedCount++;
      } else {
        console.error(`FAILED to get image for: ${c.name} (${c.id})`);
      }

      // Small delay to be polite to CDN
      await new Promise(r => setTimeout(r, 60));
    }

    fs.writeFileSync(jsonPath, JSON.stringify(chars, null, 2), 'utf-8');
    console.log(`\n==== [${anime}] Completed! ${updatedCount} avatars downloaded and converted to local! ====\n`);
  }
}

run();
