import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

const romanceTargets = [
  // Truncated / misaligned framing
  { id: 'hideki-nishimura', search: 'Hideki Nishimura', domain: 'netogenomegane' },
  { id: 'yuu-natsume', search: 'Yuu Natsume', domain: 'justbecause' },
  { id: 'ryuuto-kashima', search: 'Ryuto Kashima', domain: 'ourdatingstory' },
  { id: 'ouka-shiunji', search: 'Ouka Shiunji', domain: 'shiunjifamily' },
  { id: 'carol-olston', search: 'Carol Olston', domain: 'tomochan-wa-onnanoko' },
  { id: 'sana-sunomiya', search: 'Sana Sunomiya', domain: 'nagatoro' },
  { id: 'minami-fuyuki', search: 'Minami Fuyuki', domain: 'dosankogals' },
  { id: 'tsubasa-shiki', search: 'Tsubasa Shiki', domain: 'dosankogals' },
  { id: 'sayuri-akino', search: 'Sayuri Akino', domain: 'dosankogals' },
  { id: 'rena-natsukawa', search: 'Rena Natsukawa', domain: 'dosankogals' },

  // Transparent renders needing scenery / solid anime visual
  { id: 'toru-ishikawa', search: 'Toru Ishikawa', domain: 'horimiya' },
  { id: 'futaro-uesugi', search: 'Futaro Uesugi', domain: '5hanayome' },
  { id: 'naoto-hachioji', search: 'Naoto Hachioji', domain: 'nagatoro' },
  { id: 'hayase-nagatoro', search: 'Hayase Nagatoro', domain: 'nagatoro' },
  { id: 'tohru-honda', search: 'Tohru Honda', domain: 'fruitsbasket' },
  { id: 'kyo-sohma', search: 'Kyo Sohma', domain: 'fruitsbasket' },
  { id: 'yuki-sohma', search: 'Yuki Sohma', domain: 'fruitsbasket' },
  { id: 'shigure-sohma', search: 'Shigure Sohma', domain: 'fruitsbasket' },
  { id: 'goro-franxx', search: 'Goro', domain: 'darling-in-the-franxx' },
  { id: 'mitsuru-franxx', search: 'Mitsuru', domain: 'darling-in-the-franxx' },
  { id: 'futoshi-franxx', search: 'Futoshi', domain: 'darling-in-the-franxx' },
  { id: 'taiki-inomata', search: 'Taiki Inomata', domain: 'aoharubox' },
  { id: 'chinatsu-kano', search: 'Chinatsu Kano', domain: 'aoharubox' },
  { id: 'hina-chono', search: 'Hina Chono', domain: 'aoharubox' },
  { id: 'kyo-kasahara', search: 'Kyo Kasahara', domain: 'aoharubox' },
  { id: 'karen-matsuoka', search: 'Karen Moriya', domain: 'aoharubox' },
  { id: 'nagi-umino', search: 'Nagi Umino', domain: 'cuckoo' },
  { id: 'erika-amano', search: 'Erika Amano', domain: 'cuckoo' },
  { id: 'sachi-umino', search: 'Sachi Umino', domain: 'cuckoo' },
  { id: 'hiro-segawa', search: 'Hiro Segawa', domain: 'cuckoo' },
  { id: 'hahari-hanazono', search: 'Hahari Hanazono', domain: '100kanojo' }
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

async function processAndSave(buf, outPath) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;

  // Check if image is transparent
  const stats = await sharp(buf).stats();
  let pipeline = sharp(buf);

  if (!stats.isOpaque) {
    // Flatten against a soft aesthetic background gradient/color so it is not transparent
    pipeline = pipeline.flatten({ background: { r: 35, g: 39, b: 55 } });
  }

  // Proper headshot framing
  if (h > w * 1.15) {
    const cropSize = Math.round(w * 0.88);
    const left = Math.round((w - cropSize) / 2);
    const top = Math.round(h * 0.08); // Capture hair down to neck/shoulders, fully showing mouth and chin!
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
  const outDir = path.resolve('public/avatars/romance');

  for (const t of romanceTargets) {
    const outPath = path.join(outDir, `${t.id}.png`);
    let imgUrl = null;

    // First try AniList
    imgUrl = await fetchFromAniList(t.search);

    // If not found or needed, try Fandom
    if (!imgUrl && t.domain) {
      imgUrl = await fetchFromFandom(t.domain, t.search);
    }

    if (imgUrl) {
      try {
        const res = await fetch(imgUrl, { headers: defaultHeaders });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAndSave(buf, outPath);
        console.log(`[OK] ${t.id} -> ${imgUrl.slice(0, 60)}...`);
      } catch (err) {
        console.error(`[ERR] ${t.id}: ${err.message}`);
      }
    } else {
      console.log(`[SKIP] No online URL for ${t.id}, re-processing existing file...`);
      if (fs.existsSync(outPath)) {
        try {
          const buf = fs.readFileSync(outPath);
          await processAndSave(buf, outPath + '.tmp');
          fs.renameSync(outPath + '.tmp', outPath);
          console.log(`[RE-PROCESSED] ${t.id}`);
        } catch (e) {
          console.error(`[RE-PROCESS FAIL] ${t.id}: ${e.message}`);
        }
      }
    }
  }
}

run();
