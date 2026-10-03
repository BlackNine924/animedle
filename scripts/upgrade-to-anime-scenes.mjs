import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

// Target characters to upgrade to actual anime screenshots with scenery
const animeTargets = [
  // Nagatoro
  { domain: 'please-dont-bully-me-nagatoro', search: 'Nagatoro anime', charId: 'hayase-nagatoro', folder: 'romance' },
  { domain: 'please-dont-bully-me-nagatoro', search: 'Naoto anime', charId: 'naoto-hachioji', folder: 'romance' },

  // Quintessential Quintuplets
  { domain: '5toubun-no-hanayome', search: 'Futaro anime', charId: 'futaro-uesugi', folder: 'romance' },
  { domain: '5toubun-no-hanayome', search: 'Miku anime', charId: 'miku-nakano', folder: 'romance' },
  { domain: '5toubun-no-hanayome', search: 'Nino anime', charId: 'nino-nakano', folder: 'romance' },
  { domain: '5toubun-no-hanayome', search: 'Yotsuba anime', charId: 'yotsuba-nakano', folder: 'romance' },
  { domain: '5toubun-no-hanayome', search: 'Ichika anime', charId: 'ichika-nakano', folder: 'romance' },
  { domain: '5toubun-no-hanayome', search: 'Itsuki anime', charId: 'itsuki-nakano', folder: 'romance' },

  // Fruits Basket
  { domain: 'fruitsbasket', search: 'Tohru anime 2019', charId: 'tohru-honda', folder: 'romance' },
  { domain: 'fruitsbasket', search: 'Kyo anime 2019', charId: 'kyo-sohma', folder: 'romance' },
  { domain: 'fruitsbasket', search: 'Yuki anime 2019', charId: 'yuki-sohma', folder: 'romance' },
  { domain: 'fruitsbasket', search: 'Shigure anime 2019', charId: 'shigure-sohma', folder: 'romance' },

  // A Couple of Cuckoos
  { domain: 'cuckoo', search: 'Nagi anime', charId: 'nagi-umino', folder: 'romance' },
  { domain: 'cuckoo', search: 'Erika anime', charId: 'erika-amano', folder: 'romance' },
  { domain: 'cuckoo', search: 'Sachi anime', charId: 'sachi-umino', folder: 'romance' },
  { domain: 'cuckoo', search: 'Hiro anime', charId: 'hiro-segawa', folder: 'romance' },

  // Darling in the Franxx
  { domain: 'darling-in-the-franxx', search: 'Goro anime', charId: 'goro', folder: 'romance' },
  { domain: 'darling-in-the-franxx', search: 'Mitsuru anime', charId: 'mitsuru', folder: 'romance' },
  { domain: 'darling-in-the-franxx', search: 'Futoshi anime', charId: 'futoshi', folder: 'romance' },

  // 100 Kanojo
  { domain: '100kanojo', search: 'Hahari anime', charId: 'hahari-hanazono', folder: 'romance' }
];

async function processAndSave(buf, outPath) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buf);
  pipeline = pipeline.flatten({ background: '#1c1e28' }).removeAlpha();

  if (w > h * 1.2) {
    // Landscape screenshot from anime: center crop around 65% width to catch the character's head
    const size = Math.min(h, Math.round(w * 0.70));
    const left = Math.round((w - size) / 2);
    const top = Math.round((h - size) / 2);
    pipeline = pipeline.extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: size,
      height: size
    });
  } else if (h > w * 1.15) {
    const size = Math.round(w * 0.88);
    const left = Math.round((w - size) / 2);
    const top = Math.round(h * 0.15); // proper chin clearance
    pipeline = pipeline.extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: size,
      height: Math.min(size, h - top)
    });
  }

  await pipeline
    .resize(240, 240, { fit: 'cover' })
    .png({ quality: 90 })
    .toFile(outPath);
}

async function run() {
  for (const t of animeTargets) {
    const outPath = path.resolve('public/avatars', t.folder, `${t.charId}.png`);
    const sUrl = `https://${t.domain}.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(t.search)}&srnamespace=6&format=json`;
    try {
      const res = await fetch(sUrl, {
        headers: { ...defaultHeaders, 'Referer': `https://${t.domain}.fandom.com/` }
      });
      const data = await res.json();
      const hits = data.query?.search || [];

      for (const h of hits) {
        if (h.title.includes('NoPic') || h.title.includes('NoImage') || h.title.includes('Manga') || h.title.includes('vol')) continue;

        const iiUrl = `https://${t.domain}.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(h.title)}&format=json`;
        const iiRes = await fetch(iiUrl, {
          headers: { ...defaultHeaders, 'Referer': `https://${t.domain}.fandom.com/` }
        });
        const iiData = await iiRes.json();
        const p = Object.values(iiData.query?.pages || {})[0];
        const u = p?.imageinfo?.[0]?.url;
        if (u) {
          const imgRes = await fetch(u, {
            headers: { ...defaultHeaders, 'Referer': `https://${t.domain}.fandom.com/` }
          });
          const buf = Buffer.from(await imgRes.arrayBuffer());
          const stats = await sharp(buf).stats();
          // Prefer opaque images with scenery
          if (stats.isOpaque) {
            await processAndSave(buf, outPath);
            console.log(`[UPGRADED ANIME SCENE] ${t.charId} -> ${h.title}`);
            break;
          }
        }
      }
    } catch (e) {
      console.error(`Error ${t.charId}:`, e.message);
    }
  }
}

run();
