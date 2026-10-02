import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

const items = [
  // Kaguya
  { id: 'kaguya-shinomiya', domain: 'kaguyasama-wa-kokurasetai', title: 'Kaguya Shinomiya' },
  { id: 'miyuki-shirogane', domain: 'kaguyasama-wa-kokurasetai', title: 'Miyuki Shirogane' },
  { id: 'chika-fujiwara', domain: 'kaguyasama-wa-kokurasetai', title: 'Chika Fujiwara' },
  { id: 'yuu-ishigami', domain: 'kaguyasama-wa-kokurasetai', title: 'Yu Ishigami' },
  { id: 'miko-iino', domain: 'kaguyasama-wa-kokurasetai', title: 'Miko Iino' },
  { id: 'ai-hayasaka', domain: 'kaguyasama-wa-kokurasetai', title: 'Ai Hayasaka' },
  // Horimiya
  { id: 'toru-ishikawa', domain: 'horimiya', title: 'Tōru Ishikawa' },
  // Otonari no Tenshi
  { id: 'mahiru-shiina', domain: 'otonari-no-tenshi', title: 'Mahiru Shiina' },
  { id: 'amane-fujimiya', domain: 'otonari-no-tenshi', title: 'Amane Fujimiya' },
  // Tonikaku
  { id: 'tsukasa-yuzaki', domain: 'tonikaku-kawaii', title: 'Yuzaki Tsukasa' },
  // Fuufu Ijou
  { id: 'jiro-yakuin', domain: 'more-than-a-married-couple-but-not-lovers', title: 'Jirō Yakuin' },
  // Tomo-chan
  { id: 'tomo-aizawa', domain: 'tomochan-wa-onnanoko', title: 'Tomo Aizawa' },
  { id: 'junichirou-kubota', domain: 'tomochan-wa-onnanoko', title: 'Junichirou Kubota' },
  // Shikimori
  { id: 'micchon-shikimori', domain: 'shikimoris-not-just-a-cutie', title: 'Miyako Shikimori' },
  { id: 'yuu-izumi', domain: 'shikimoris-not-just-a-cutie', title: 'Yu Izumi' },
  // Shinigami Bocchan
  { id: 'duke-bocchan', domain: 'the-duke-of-death-and-his-maid', title: 'Bocchan' },
  { id: 'alice-lendrott', domain: 'the-duke-of-death-and-his-maid', title: 'Alice Lendrott' },
  // Masamune-kun
  { id: 'masamune-makabe', domain: 'masamunekuns-revenge', title: 'Masamune Makabe' },
  { id: 'aki-adagaki', domain: 'masamunekuns-revenge', title: 'Aki Adagaki' },
  // Bokuyaba
  { id: 'kyotaro-ichikawa', domain: 'bokuyaba', title: 'Ichikawa Kyoutarou' }
];

async function run() {
  const outDir = path.resolve('public/avatars/romance');

  for (const item of items) {
    const url = `https://${item.domain}.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(item.title)}&pithumbsize=600&format=json&redirects=1`;
    try {
      const res = await fetch(url, { headers: { ...defaultHeaders, 'Referer': `https://${item.domain}.fandom.com/` } });
      const data = await res.json();
      const page = Object.values(data.query?.pages || {})[0];
      const thumbUrl = page?.thumbnail?.source;
      console.log(item.id, '->', thumbUrl);
      if (thumbUrl) {
        const imgRes = await fetch(thumbUrl, { headers: { ...defaultHeaders, 'Referer': `https://${item.domain}.fandom.com/` } });
        const buf = Buffer.from(await imgRes.arrayBuffer());
        const img = sharp(buf);
        const meta = await img.metadata();
        const w = meta.width, h = meta.height;
        let left = 0, top = 0, size = Math.min(w, h);
        if (w > h) {
          left = Math.round((w - h) / 2);
        } else {
          top = Math.round((h - size) * 0.12);
        }
        const outPath = path.join(outDir, `${item.id}.png`);
        await sharp(buf)
          .extract({ left, top, width: size, height: size })
          .resize(240, 240, { fit: 'cover' })
          .png({ quality: 95 })
          .toFile(outPath);
        console.log(`Saved ${outPath}`);
      }
    } catch (e) {
      console.error(`Error on ${item.id}:`, e.message);
    }
  }
}

run();
