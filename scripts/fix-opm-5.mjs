import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const wikiHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://onepunchman.fandom.com/'
};

async function fix(id, wikiTitle) {
  const url = `https://onepunchman.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(wikiTitle)}&pithumbsize=600&format=json&redirects=1`;
  const res = await fetch(url, { headers: wikiHeaders });
  const data = await res.json();
  const page = Object.values(data.query?.pages || {})[0];
  const thumbUrl = page?.thumbnail?.source;
  console.log(id, 'thumb:', thumbUrl);
  if (thumbUrl) {
    const imgRes = await fetch(thumbUrl, { headers: wikiHeaders });
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const img = sharp(buf);
    const meta = await img.metadata();
    const w = meta.width;
    const h = meta.height;
    let left = 0, top = 0, size = Math.min(w, h);
    if (w > h) {
      left = Math.round((w - h) / 2);
    } else {
      top = Math.round((h - size) * 0.12);
    }
    const outPath = path.resolve('public/avatars/one-punch-man', `${id}.png`);
    await sharp(buf)
      .extract({ left, top, width: size, height: size })
      .resize(240, 240, { fit: 'cover' })
      .png({ quality: 95 })
      .toFile(outPath);
    console.log('Saved', outPath);
  }
}

async function run() {
  await fix('one-shotter', 'One Shotter');
  await fix('chain-n-toad', "Chain'n'toad");
  await fix('crescent-eyebrow', 'Crescent Eyebroll');
  await fix('narcisstory', 'Narcisstoic');
  await fix('speed-o-sound-sonic', "Speed-o'-Sound Sonic");
}
run();
