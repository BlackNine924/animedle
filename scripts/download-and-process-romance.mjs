import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://fandom.com/'
};

fs.mkdirSync('scripts/temp-romance', { recursive: true });

const candidates = [
  {
    id: 'anna-yamada',
    url: 'https://static.wikia.nocookie.net/bokuyaba/images/d/de/Yamada_Anna_Anime.png/revision/latest',
    // In Yamada_Anna_Anime.png, it's a full body/half body anime render
    crop: { topRatio: 0.05, heightRatio: 0.35, widthRatio: 0.70 }
  },
  {
    id: 'erika-amano',
    url: 'https://static.wikia.nocookie.net/cuckoo/images/f/f4/Blu-ray_S2_Erika_Amano.png/revision/latest',
    crop: { topRatio: 0.08, heightRatio: 0.32, widthRatio: 0.70 }
  },
  {
    id: 'sachi-umino',
    url: 'https://static.wikia.nocookie.net/cuckoo/images/8/83/Sachi-Anime.png/revision/latest',
    crop: { topRatio: 0.04, heightRatio: 0.30, widthRatio: 0.85 }
  },
  {
    id: 'nagi-umino',
    url: 'https://static.wikia.nocookie.net/cuckoo/images/5/51/Nagi%28anime%29.png/revision/latest',
    crop: { topRatio: 0.04, heightRatio: 0.30, widthRatio: 0.85 }
  },
  {
    id: 'hiro-segawa',
    url: 'https://static.wikia.nocookie.net/cuckoo/images/b/b1/Hiro-Anime.png/revision/latest',
    crop: { topRatio: 0.04, heightRatio: 0.30, widthRatio: 0.85 }
  },
  {
    id: 'sakura-nagatoro',
    url: 'https://static.wikia.nocookie.net/please-dont-bully-me-nagatoro/images/4/43/Sakura_Anime_Headshot.jpg/revision/latest',
    crop: 'center'
  },
  {
    id: 'hahari-hanazono',
    url: 'https://static.wikia.nocookie.net/100kanojo/images/a/a7/Hahari_Hanazono_in_Season_1_Intro.jpg/revision/latest',
    crop: { topRatio: 0.15, heightRatio: 0.70, widthRatio: 0.50 }
  },
  {
    id: 'shigure-sohma',
    url: 'https://static.wikia.nocookie.net/fruitsbasket/images/7/70/Shigure_-_Full_Body.png/revision/latest',
    crop: { topRatio: 0.03, heightRatio: 0.28, widthRatio: 0.85 }
  },
  {
    id: 'mitsuru-franxx',
    url: 'https://static.wikia.nocookie.net/darling-in-the-franxx/images/c/ca/02-KOD-23-Mitsuru.png/revision/latest',
    crop: { topRatio: 0.10, heightRatio: 0.40, widthRatio: 0.70 }
  },
  {
    id: 'chinatsu-kano',
    url: 'https://static.wikia.nocookie.net/blue-box/images/7/79/Chinatsu_Anime_2.png/revision/latest',
    crop: { topRatio: 0.05, heightRatio: 0.35, widthRatio: 0.80 }
  }
];

async function processAll() {
  for (const c of candidates) {
    try {
      console.log(`Fetching ${c.id}...`);
      const res = await fetch(c.url, { headers });
      if (!res.ok) {
        console.error(`Failed ${c.id}: ${res.status}`);
        continue;
      }
      const rawBuf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(`scripts/temp-romance/${c.id}-raw.png`, rawBuf);

      const meta = await sharp(rawBuf).metadata();
      const w = meta.width;
      const h = meta.height;

      let pipeline = sharp(rawBuf);

      if (c.crop === 'center') {
        const size = Math.min(w, h);
        pipeline = pipeline.extract({
          left: Math.round((w - size) / 2),
          top: Math.round((h - size) / 2),
          width: size,
          height: size
        });
      } else if (typeof c.crop === 'object') {
        const cropW = Math.round(w * c.crop.widthRatio);
        const cropH = Math.round(h * c.crop.heightRatio);
        const size = Math.min(cropW, cropH);
        const left = Math.max(0, Math.round((w - size) / 2));
        const top = Math.max(0, Math.round(h * c.crop.topRatio));
        pipeline = pipeline.extract({
          left,
          top,
          width: Math.min(size, w - left),
          height: Math.min(size, h - top)
        });
      }

      await pipeline
        .resize(240, 240)
        .png({ quality: 90 })
        .toFile(`scripts/temp-romance/${c.id}-cropped.png`);

      console.log(`[DONE] ${c.id}`);
    } catch (e) {
      console.error(`[ERROR] ${c.id}: ${e.message}`);
    }
  }
}

processAll();
