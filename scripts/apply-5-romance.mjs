import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const items = [
  { id: 'toru-ishikawa', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b66961-VZV5IwKUwYfp.png' },
  { id: 'ryuuto-kashima', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b263824-b78Bn8aYLMoW.png' },
  { id: 'hina-chono', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b218648-kXxXy8lPkeGV.png' },
  { id: 'kyo-kasahara', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b218647-A2ngPlh7Yucn.png' },
  { id: 'karen-matsuoka', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b288217-mQ8wZIn5B3Dj.png' }
];

async function apply() {
  for (const item of items) {
    const res = await fetch(item.url);
    const buf = Buffer.from(await res.arrayBuffer());
    const meta = await sharp(buf).metadata();
    const w = meta.width;
    const h = meta.height;

    let pipeline = sharp(buf);
    const stats = await sharp(buf).stats();
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
    }

    const outPath = path.resolve('public/avatars/romance', `${item.id}.png`);
    await pipeline
      .resize(240, 240, { fit: 'cover' })
      .png({ quality: 90 })
      .toFile(outPath);
    console.log('[SAVED]', item.id);
  }
}

apply();
