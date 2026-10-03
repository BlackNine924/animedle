import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://chainsaw-man.fandom.com/'
};

const csmTargets = [
  { id: 'denji', search: 'Denji' },
  { id: 'pochita', search: 'Pochita' },
  { id: 'makima', search: 'Makima' },
  { id: 'power', search: 'Power' },
  { id: 'kishibe', search: 'Kishibe' },
  { id: 'himeno', search: 'Himeno' },
  { id: 'kobeni-higashiyama', search: 'Kobeni Higashiyama' },
  { id: 'hirokazu-arai', search: 'Hirokazu Arai' },
  { id: 'beam', search: 'Beam' },
  { id: 'galgali', search: 'Violence Fiend' },
  { id: 'angel-devil', search: 'Angel Devil' },
  { id: 'princi', search: 'Princi' },
  { id: 'akane-sawatari', search: 'Akane Sawatari' },
  { id: 'nomo', search: 'Nomo' },
  { id: 'typhoon-devil', search: 'Typhoon Devil' },
  { id: 'mold-devil', search: 'Mold Devil' },
  { id: 'skin-devil', search: 'Skin Devil' },
  { id: 'claw-devil', search: 'Claw Devil' },
  { id: 'teeth-devil', search: 'Teeth Devil' },
  { id: 'needle-devil', search: 'Needle Devil' },
  { id: 'car-devil', search: 'Car Devil' },
  { id: 'house-devil', search: 'House Devil' },
  { id: 'gravity-devil', search: 'Gravity Devil' },
  { id: 'tank-devil', search: 'Tank Devil' },
  { id: 'loneliness-fiend', search: 'Loneliness Fiend' },
  { id: 'shinohara', search: 'Shinohara' },
  { id: 'yokota', search: 'Yokota' },
  { id: 'mysterious-man', search: 'Mysterious Man' }
];

const outDir = path.resolve('public/avatars/chainsaw-man');

async function fetchFromAniList(name) {
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
      body: JSON.stringify({ query, variables: { search: name } })
    });
    const data = await res.json();
    return data.data?.Character?.image?.large || null;
  } catch (e) {
    return null;
  }
}

async function fetchFromFandom(name) {
  const titles = [
    `File:${name} anime design.png`,
    `File:${name} anime design front view.png`,
    `File:${name} anime.png`,
    name
  ];

  for (const t of titles) {
    try {
      const url = `https://chainsaw-man.fandom.com/api.php?action=query&prop=imageinfo|pageimages&iiprop=url&titles=${encodeURIComponent(t)}&pithumbsize=600&format=json&redirects=1`;
      const res = await fetch(url, { headers: defaultHeaders });
      const data = await res.json();
      const page = Object.values(data.query?.pages || {})[0];
      const found = page?.imageinfo?.[0]?.url || page?.thumbnail?.source;
      if (found) return found;
    } catch (e) {}
  }
  return null;
}

async function processAndSave(buf, outPath) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buf);
  pipeline = pipeline.flatten({ background: '#1c1c24' }).removeAlpha();

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
  console.log(`Starting CSM avatar upgrade for ${csmTargets.length} characters...`);
  let updated = 0;

  for (const t of csmTargets) {
    const outPath = path.join(outDir, `${t.id}.png`);
    let imgUrl = await fetchFromAniList(t.search);
    let ref = 'https://anilist.co/';

    if (!imgUrl) {
      imgUrl = await fetchFromFandom(t.search);
      ref = 'https://chainsaw-man.fandom.com/';
    }

    if (imgUrl) {
      try {
        const res = await fetch(imgUrl, {
          headers: { ...defaultHeaders, 'Referer': ref }
        });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAndSave(buf, outPath);
        updated++;
        console.log(`[${updated}/${csmTargets.length}] ${t.id} updated`);
      } catch (err) {
        console.error(`[ERR] ${t.id}: ${err.message}`);
      }
    } else {
      if (fs.existsSync(outPath)) {
        try {
          const buf = fs.readFileSync(outPath);
          await processAndSave(buf, outPath + '.tmp');
          fs.renameSync(outPath + '.tmp', outPath);
          console.log(`[RE-PROCESSED] ${t.id}`);
          updated++;
        } catch (e) {
          console.error(`[RE-PROCESS FAIL] ${t.id}: ${e.message}`);
        }
      }
    }
  }

  console.log(`\nCSM avatar processing complete! Updated ${updated}/${csmTargets.length} avatars.`);
}

run();
