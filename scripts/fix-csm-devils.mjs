import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://chainsaw-man.fandom.com/'
};

async function processAndSave(buf, outPath, cropOpts = {}) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buf);
  pipeline = pipeline.flatten({ background: '#1c1c24' }).removeAlpha();

  if (cropOpts.extract) {
    pipeline = pipeline.extract(cropOpts.extract);
  } else if (h > w * 1.15) {
    const cropSize = Math.round(w * 0.88);
    const left = Math.round((w - cropSize) / 2);
    const top = Math.round(h * 0.15); // Better chin clearance!
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

async function fixCSMDevils() {
  const outDir = path.resolve('public/avatars/chainsaw-man');

  // 1. Teeth Devil: Teeth Devil Effigy
  console.log('Fixing teeth-devil...');
  try {
    const res = await fetch('https://static.wikia.nocookie.net/chainsaw-man/images/1/18/Teeth_Devil_Effigy.png/revision/latest?cb=20260604063835', { headers: defaultHeaders });
    const buf = Buffer.from(await res.arrayBuffer());
    await processAndSave(buf, path.join(outDir, 'teeth-devil.png'));
    console.log('[OK] teeth-devil updated');
  } catch (e) {
    console.error('teeth-devil err:', e.message);
  }

  // 2. Car Devil: Kobeni's car from CSM anime
  console.log('Fixing car-devil...');
  try {
    const sUrl = 'https://chainsaw-man.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url&titles=File:Denji_tosing_the_car_back_at_the_Bat_Devil.png&format=json';
    const sRes = await fetch(sUrl, { headers: defaultHeaders });
    const sData = await sRes.json();
    const p = Object.values(sData.query?.pages || {})[0];
    const url = p?.imageinfo?.[0]?.url;
    if (url) {
      const res = await fetch(url, { headers: defaultHeaders });
      const buf = Buffer.from(await res.arrayBuffer());
      await processAndSave(buf, path.join(outDir, 'car-devil.png'));
      console.log('[OK] car-devil updated');
    }
  } catch (e) {
    console.error('car-devil err:', e.message);
  }

  // 3. Other devils from specific manga files on fandom:
  // Let's search images for devil appearances:
  const searches = [
    { id: 'skin-devil', query: 'Aldo' },
    { id: 'claw-devil', query: 'Katana' },
    { id: 'needle-devil', query: 'Public Safety' },
    { id: 'mold-devil', query: 'Akane Sawatari' },
    { id: 'gravity-devil', query: 'Falling Devil' },
    { id: 'house-devil', query: 'Kanbayashi' },
    { id: 'loneliness-fiend', query: 'Aging Devil' },
    { id: 'death-devil', query: 'Four Horsemen' }
  ];

  for (const s of searches) {
    try {
      const sUrl = `https://chainsaw-man.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(s.query)}&srnamespace=6&format=json`;
      const sRes = await fetch(sUrl, { headers: defaultHeaders });
      const sData = await sRes.json();
      const hits = sData.query?.search || [];
      for (const h of hits) {
        if (h.title.includes('NoPic') || h.title.includes('NoImage')) continue;
        const iiUrl = `https://chainsaw-man.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(h.title)}&format=json`;
        const iiRes = await fetch(iiUrl, { headers: defaultHeaders });
        const iiData = await iiRes.json();
        const p = Object.values(iiData.query?.pages || {})[0];
        const u = p?.imageinfo?.[0]?.url;
        if (u) {
          const res = await fetch(u, { headers: defaultHeaders });
          const buf = Buffer.from(await res.arrayBuffer());
          await processAndSave(buf, path.join(outDir, `${s.id}.png`));
          console.log(`[OK] ${s.id} updated with ${h.title}`);
          break;
        }
      }
    } catch (e) {
      console.error(`${s.id} err:`, e.message);
    }
  }
}

fixCSMDevils();
