import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

const dandadanTargets = [
  { id: 'momo-ayase', search: 'Momo Ayase' },
  { id: 'ken-takakura', search: 'Ken Takakura' },
  { id: 'turbo-vovó', search: 'Turbo Granny' },
  { id: 'seiko-ayase', search: 'Seiko Ayase' },
  { id: 'aira-shiratori', search: 'Aira Shiratori' },
  { id: 'jin-enjoji', search: 'Jin Enjoji' },
  { id: 'kinta-sakata', search: 'Kinta Sakata' },
  { id: 'vamola', search: 'Vamola' },
  { id: 'pejin', search: 'Pejin' },
  { id: 'rokuro-serpo', search: 'Rokuro' },
  { id: 'taro', search: 'Taro' },
  { id: 'hana', search: 'Hana' },
  { id: 'mika-adachi', search: 'Mika Adachi' },
  { id: 'unji-zuma', search: 'Unji Zuma' },
  { id: 'koki-yukishiro', search: 'Koki Yukishiro' },
  { id: 'chiquitita', search: 'Chiquitita' },
  { id: 'manjiro', search: 'Manjiro' },
  { id: 'saint-germain', search: 'Saint-Germain' },
  { id: 'olho-maligno', search: 'Evil Eye' },
  { id: 'flatwoods-monster', search: 'Flatwoods Monster' },
  { id: 'acrobatic-silky', search: 'Acrobatic Silky' },
  { id: 'nessie', search: 'Nessie' },
  { id: 'suda-ko', search: 'Suda-ko' },
  { id: 'head-exosuit-kur', search: 'Kur' }
];

const kaijuTargets = [
  { id: 'kafka-hibino', search: 'Kafka Hibino' },
  { id: 'reno-ichikawa', search: 'Reno Ichikawa' },
  { id: 'mina-ashiro', search: 'Mina Ashiro' },
  { id: 'kikoru-shinomiya', search: 'Kikoru Shinomiya' },
  { id: 'soshiro-hoshina', search: 'Soshiro Hoshina' },
  { id: 'aoi-kaguragi', search: 'Aoi Kaguragi' },
  { id: 'iharu-furuhashi', search: 'Iharu Furuhashi' },
  { id: 'haruichi-izumo', search: 'Haruichi Izumo' },
  { id: 'gen-narumi', search: 'Gen Narumi' },
  { id: 'isao-shinomiya', search: 'Isao Shinomiya' }
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

async function processAndSave(buf, outPath) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buf);
  pipeline = pipeline.flatten({ background: '#1c1e28' }).removeAlpha();

  if (h > w * 1.15) {
    const cropSize = Math.round(w * 0.88);
    const left = Math.round((w - cropSize) / 2);
    const top = Math.round(h * 0.12);
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
  console.log('Fixing Dandadan avatars...');
  for (const t of dandadanTargets) {
    const outPath = path.resolve('public/avatars/dandadan', `${t.id}.png`);
    const imgUrl = await fetchFromAniList(t.search);
    if (imgUrl) {
      try {
        const res = await fetch(imgUrl, { headers: defaultHeaders });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAndSave(buf, outPath);
        console.log(`[OK] dandadan/${t.id}`);
      } catch (e) {
        console.error(`[ERR] ${t.id}: ${e.message}`);
      }
    }
  }

  console.log('Fixing Kaiju No. 8 avatars...');
  for (const t of kaijuTargets) {
    const outPath = path.resolve('public/avatars/kaiju-no-8', `${t.id}.png`);
    const imgUrl = await fetchFromAniList(t.search);
    if (imgUrl) {
      try {
        const res = await fetch(imgUrl, { headers: defaultHeaders });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAndSave(buf, outPath);
        console.log(`[OK] kaiju-no-8/${t.id}`);
      } catch (e) {
        console.error(`[ERR] ${t.id}: ${e.message}`);
      }
    }
  }
}

run();
