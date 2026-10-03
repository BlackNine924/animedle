import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://shingekinokyojin.fandom.com/'
};

const aotList = [
  { id: 'jean-kirstein', anilist: 'Jean Kirstein' },
  { id: 'sasha-braus', anilist: 'Sasha Braus' },
  { id: 'marco-bott', anilist: 'Marco Bott' },
  { id: 'floch-forster', fandomTitle: 'File:Floch Forster (Anime) character image.png' },
  { id: 'moblit-berner', fandomTitle: 'File:Moblit Berner (Anime) character image.png' },
  { id: 'oluo-bozado', anilist: 'Oruo Bozad' },
  { id: 'eld-jinn', anilist: 'Eld Gin' },
  { id: 'ilse-langnar', anilist: 'Ilse Langnar' },
  { id: 'niccolo', fandomTitle: 'File:Nicolo (Anime) character image.png' },
  { id: 'dina-fritz', anilist: 'Dina Fritz' }
];

async function getFandomUrl(title) {
  const url = 'https://shingekinokyojin.fandom.com/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url&format=json';
  const res = await fetch(url, { headers });
  const data = await res.json();
  return Object.values(data.query?.pages || {})[0]?.imageinfo?.[0]?.url;
}

async function getAniListUrl(search) {
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query ($search: String) { Character(search: $search) { id name { full } image { large } } }`,
      variables: { search }
    })
  });
  const data = await res.json();
  return data.data?.Character?.image?.large;
}

async function run() {
  fs.mkdirSync('scripts/temp-aot', { recursive: true });

  for (const item of aotList) {
    let imgUrl = null;
    if (item.fandomTitle) {
      imgUrl = await getFandomUrl(item.fandomTitle);
    } else if (item.anilist) {
      imgUrl = await getAniListUrl(item.anilist);
    }

    console.log(item.id, '->', imgUrl);
    if (!imgUrl) continue;

    try {
      const res = await fetch(imgUrl, { headers });
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(`scripts/temp-aot/${item.id}-raw.png`, buf);

      const meta = await sharp(buf).metadata();
      const w = meta.width;
      const h = meta.height;

      let pipeline = sharp(buf);
      if (h > w * 1.15) {
        // Vertical 230x345 portrait
        const cropSize = Math.round(w * 0.95);
        const left = Math.round((w - cropSize) / 2);
        const top = Math.round(h * 0.16); // Safe crop preserving chin!
        pipeline = pipeline.extract({
          left: Math.max(0, left),
          top: Math.max(0, top),
          width: Math.min(cropSize, w - left),
          height: Math.min(cropSize, h - top)
        });
      } else {
        const size = Math.min(w, h);
        pipeline = pipeline.extract({
          left: Math.round((w - size) / 2),
          top: 0,
          width: size,
          height: size
        });
      }

      await pipeline
        .resize(240, 240)
        .png({ quality: 90 })
        .toFile(`scripts/temp-aot/${item.id}.png`);

      console.log(`[OK] ${item.id}`);
    } catch (e) {
      console.error(`[ERR] ${item.id}:`, e.message);
    }
  }
}

run();
