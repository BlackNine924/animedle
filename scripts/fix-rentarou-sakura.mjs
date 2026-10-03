import sharp from 'sharp';
import fs from 'fs';

async function fix2() {
  const items = [
    { id: 'rentarou-aijou', name: 'Rentarou Aijou', wiki: '100kanojo' },
    { id: 'sakura-nagatoro', name: 'Sakura', wiki: 'nagatoro' }
  ];

  for (const it of items) {
    const url = `https://${it.wiki}.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(it.name)}&pithumbsize=600&format=json&redirects=1`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': `https://${it.wiki}.fandom.com/` } });
    const data = await res.json();
    const p = Object.values(data.query?.pages || {})[0];
    const src = p?.thumbnail?.source;
    console.log(it.id, src);
    if (src) {
      const iRes = await fetch(src, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': `https://${it.wiki}.fandom.com/` } });
      const buf = Buffer.from(await iRes.arrayBuffer());
      const outPath = 'public/avatars/romance/' + it.id + '.png';
      await sharp(buf).flatten({ background: '#242838' }).removeAlpha().resize(240, 240, { fit: 'cover' }).png().toFile(outPath);
      console.log('Fixed', it.id);
    }
  }
}
fix2();
