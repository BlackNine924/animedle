import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Naruto
const narutoPath = path.join(rootDir, 'src', 'data', 'animes', 'naruto', 'characters.json');
const narutoChars = JSON.parse(fs.readFileSync(narutoPath, 'utf-8'));
const narutoAvatarsDir = path.join(rootDir, 'public', 'avatars', 'naruto');

// a-quarto-raikage is already in public/avatars/naruto/a-quarto-raikage.png
const aRaikage = narutoChars.find(c => c.id === 'a-quarto-raikage');
if (aRaikage) aRaikage.avatar = '/avatars/naruto/a-quarto-raikage.png';

// Fix other 3 naruto via download
const narutoDownloads = [
  { id: 'kin-tsuchi', url: 'https://images.weserv.nl/?url=static.wikia.nocookie.net/naruto/images/7/76/Kin1.png' },
  { id: 'kinkaku', url: 'https://images.weserv.nl/?url=static.wikia.nocookie.net/naruto/images/5/52/Kinkaku.png' },
  { id: 'ginkaku', url: 'https://images.weserv.nl/?url=static.wikia.nocookie.net/naruto/images/a/a9/Ginkaku.png' }
];

for (const item of narutoDownloads) {
  try {
    const res = await fetch(item.url);
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      const localFile = path.join(narutoAvatarsDir, `${item.id}.png`);
      fs.writeFileSync(localFile, Buffer.from(buffer));
      const c = narutoChars.find(x => x.id === item.id);
      if (c) c.avatar = `/avatars/naruto/${item.id}.png`;
      console.log(`Saved Naruto local avatar: ${item.id}`);
    }
  } catch (e) {
    console.error(`Error downloading Naruto ${item.id}:`, e.message);
  }
}
fs.writeFileSync(narutoPath, JSON.stringify(narutoChars, null, 2));

// 2. Demon Slayer
const dsPath = path.join(rootDir, 'src', 'data', 'animes', 'demon-slayer', 'characters.json');
const dsChars = JSON.parse(fs.readFileSync(dsPath, 'utf-8'));
const dsAvatarsDir = path.join(rootDir, 'public', 'avatars', 'demon-slayer');
if (!fs.existsSync(dsAvatarsDir)) fs.mkdirSync(dsAvatarsDir, { recursive: true });

const dsDownloads = [
  { id: 'kotetsu', url: 'https://images.weserv.nl/?url=static.wikia.nocookie.net/kimetsu-no-yaiba/images/8/8f/Kotetsu_Anime.png' },
  { id: 'kaigaku-demon', url: 'https://images.weserv.nl/?url=static.wikia.nocookie.net/kimetsu-no-yaiba/images/0/07/Kaigaku_Demon_Anime.png' }
];

for (const item of dsDownloads) {
  try {
    const res = await fetch(item.url);
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      const localFile = path.join(dsAvatarsDir, `${item.id}.png`);
      fs.writeFileSync(localFile, Buffer.from(buffer));
      const c = dsChars.find(x => x.id === item.id);
      if (c) c.avatar = `/avatars/demon-slayer/${item.id}.png`;
      console.log(`Saved Demon Slayer local avatar: ${item.id}`);
    }
  } catch (e) {
    console.error(`Error downloading DS ${item.id}:`, e.message);
  }
}
fs.writeFileSync(dsPath, JSON.stringify(dsChars, null, 2));

console.log('Cleanup finished!');
