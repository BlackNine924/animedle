import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

const remainingTG = [
  { id: 'yoshimura', search: 'Kuzen Yoshimura' },
  { id: 'iwao-kuroiwa', search: 'Iwao Kuroiwa' },
  { id: 'koori-ui', search: 'Koori Ui' },
  { id: 'hsiao-hai-ping', search: 'Hsiao Hai-ping' },
  { id: 'mirumo-tsukiyama', search: 'Mirumo Tsukiyama' },
  { id: 'kanae-von-rosewald', search: 'Kanae von Rosewald' },
  { id: 'eto-yoshimura', search: 'Eto Yoshimura' },
  { id: 'miza-kusakari', search: 'Miza Kusakari' },
  { id: 'nimura-furuta', search: 'Nimura Furuta' },
  { id: 'donato-porpora', search: 'Donato Porpora' },
  { id: 'seidou-takizawa', search: 'Seidou Takizawa' },
  { id: 'kimi-nishino', search: 'Kimi Nishino' },
  { id: 'yoriko-kosaka', search: 'Yoriko Kosaka' },
  { id: 'shinsanpei-aura', search: 'Shinsanpei Aura' },
  { id: 'hanbee-abara', search: 'Hanbee Abara' },
  { id: 'tsuneyoshi-washuu', search: 'Tsuneyoshi Washuu' },
  { id: 'yoshitoki-washuu', search: 'Yoshitoki Washuu' }
];

async function processAndSave(buf, outPath) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buf);
  pipeline = pipeline.flatten({ background: '#181a24' }).removeAlpha();

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

async function fixGreyTG() {
  for (const item of remainingTG) {
    const sUrl = `https://tokyoghoul.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(item.search)}&srnamespace=6&format=json`;
    const sRes = await fetch(sUrl, { headers: { ...defaultHeaders, 'Referer': 'https://tokyoghoul.fandom.com/' } });
    const sData = await sRes.json();
    const hits = sData.query?.search || [];

    let chosenUrl = null;

    for (const h of hits) {
      const title = h.title;
      // Fetch imageinfo
      const iiUrl = `https://tokyoghoul.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(title)}&format=json`;
      const iiRes = await fetch(iiUrl, { headers: { ...defaultHeaders, 'Referer': 'https://tokyoghoul.fandom.com/' } });
      const iiData = await iiRes.json();
      const p = Object.values(iiData.query?.pages || {})[0];
      const url = p?.imageinfo?.[0]?.url;
      if (!url) continue;

      try {
        const imgRes = await fetch(url, { headers: { ...defaultHeaders, 'Referer': 'https://tokyoghoul.fandom.com/' } });
        const buf = Buffer.from(await imgRes.arrayBuffer());
        const stats = await sharp(buf).stats();
        const isGrey = Math.abs(stats.channels[0].mean - stats.channels[1].mean) < 3 &&
                       Math.abs(stats.channels[1].mean - stats.channels[2].mean) < 3;
        if (!isGrey) {
          chosenUrl = url;
          const outPath = path.resolve('public/avatars/tokyo-ghoul', `${item.id}.png`);
          await processAndSave(buf, outPath);
          console.log(`[FOUND COLOR] ${item.id} -> ${title}`);
          break;
        }
      } catch (e) {}
    }

    if (!chosenUrl) {
      console.log(`[NO COLOR HIT] ${item.id}`);
    }
  }
}

fixGreyTG();
