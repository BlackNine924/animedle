import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'public', 'card-covers');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 10 card covers:
// 1. demon-slayer -> Tanjiro
// 2. jujutsu-kaisen -> Itadori
// 3. one-piece -> Luffy
// 4. naruto -> Naruto
// 5. solo-leveling -> Sung Jin-woo
// 6. blue-lock -> Yoichi Isagi
// 7. record-of-ragnarok -> Qin Shi Huang
// 8. bleach -> Ichigo
// 9. dragon-ball -> Goku
// 10. romance -> Marin Kitagawa

const SOURCES = {
  'demon-slayer': { url: 'https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png', crop: { top: 0, left: 0 } },
  'jujutsu-kaisen': { url: 'https://s4.anilist.co/file/anilistcdn/character/large/b127212-FVm2tD0erQ5B.png', crop: { top: 0, left: 0 } },
  'one-piece': { url: 'https://s4.anilist.co/file/anilistcdn/character/large/b40-MNypXsxSRb1R.png', crop: { top: 0, left: 0 } },
  'naruto': { url: 'https://s4.anilist.co/file/anilistcdn/character/large/b17-phjcWCkRuIhu.png', crop: { top: 0, left: 0 } },
  'solo-leveling': { local: 'public/avatars/solo-leveling/sung-jinwoo.png' },
  'blue-lock': { local: 'public/avatars/blue-lock/yoichi-isagi.png' },
  'record-of-ragnarok': { local: 'public/avatars/record-of-ragnarok/qin-shi-huang.png' },
  'bleach': { local: 'public/avatars/bleach/ichigo-kurosaki.png' },
  'dragon-ball': { local: 'public/avatars/dragon-ball/son-goku.png' },
  'romance': { anilistSearch: 'Marin Kitagawa' }
};

async function getAnilistImage(name) {
  const query = `query ($search: String) { Character(search: $search) { id name { full } image { large } } }`;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { search: name } })
  });
  const data = await res.json();
  return data?.data?.Character?.image?.large;
}

async function prepareCardCovers() {
  for (const [slug, cfg] of Object.entries(SOURCES)) {
    const dest = path.join(outDir, `${slug}.png`);
    let buffer = null;

    if (cfg.local) {
      buffer = fs.readFileSync(path.join(rootDir, cfg.local));
    } else {
      let remoteUrl = cfg.url;
      if (!remoteUrl && cfg.anilistSearch) {
        remoteUrl = await getAnilistImage(cfg.anilistSearch);
        console.log(`Found Marin: ${remoteUrl}`);
      }
      if (remoteUrl) {
        const res = await fetch(remoteUrl);
        buffer = Buffer.from(await res.arrayBuffer());
      }
    }

    if (buffer) {
      await sharp(buffer)
        .resize(240, 240, { fit: 'cover', position: 'top' })
        .png({ quality: 90 })
        .toFile(dest);
      console.log(`✓ Card cover salvo: ${slug}.png`);
    } else {
      console.warn(`❌ Falha ao obter imagem para: ${slug}`);
    }
  }
}

prepareCardCovers();
