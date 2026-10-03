import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

const targets = [
  { id: 'futaro-uesugi', search: 'Futaro Uesugi', domain: '5hanayome' },
  { id: 'naoto-hachioji', search: 'Naoto Hachioji', domain: 'nagatoro' },
  { id: 'yuki-sohma', search: 'Yuki Sohma', domain: 'fruitsbasket' },
  { id: 'shigure-sohma', search: 'Shigure Sohma', domain: 'fruitsbasket' },
  { id: 'hahari-hanazono', search: 'Hahari Hanazono', domain: '100kanojo' },
  { id: 'toru-ishikawa', search: 'Tohru Ishikawa', domain: 'horimiya' },
  { id: 'ryuuto-kashima', search: 'Ryuto Kashima', domain: 'our-dating-story' },
  { id: 'hina-chono', search: 'Hina Chono', domain: 'aoharubox' },
  { id: 'kyo-kasahara', search: 'Kyo Kasahara', domain: 'aoharubox' }
];

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

  const stats = await sharp(buf).stats();
  let pipeline = sharp(buf);

  if (!stats.isOpaque) {
    pipeline = pipeline.flatten({ background: { r: 35, g: 39, b: 55 } });
  }

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
  const outDir = path.resolve('public/avatars/romance');

  for (const t of targets) {
    const outPath = path.join(outDir, `${t.id}.png`);
    const imgUrl = await fetchFromFandom(t.domain, t.search);

    if (imgUrl) {
      try {
        const res = await fetch(imgUrl, {
          headers: {
            ...defaultHeaders,
            'Referer': `https://${t.domain}.fandom.com/`
          }
        });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAndSave(buf, outPath);
        console.log(`[OK] ${t.id} -> ${imgUrl.slice(0, 60)}...`);
      } catch (err) {
        console.error(`[ERR] ${t.id}: ${err.message}`);
      }
    } else {
      console.log(`[SKIP] No online URL for ${t.id}`);
    }
  }
}

run();
