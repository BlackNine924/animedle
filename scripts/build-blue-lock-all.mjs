import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { charactersData } from './blue-lock-characters-data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'blue-lock');
const dataDir = path.join(rootDir, 'src', 'data', 'animes', 'blue-lock');

if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const anilist = JSON.parse(fs.readFileSync(path.join(rootDir, 'scripts', 'anilist_bluelock.json'), 'utf-8'));

function norm(s) {
  if (!s) return '';
  return s.toLowerCase()
    .replace(/ou/g, 'o')
    .replace(/uu/g, 'u')
    .replace(/aa/g, 'a')
    .replace(/ee/g, 'e')
    .replace(/ii/g, 'i')
    .replace(/[^a-z]/g, '');
}

function findAniListImage(name) {
  const cn = norm(name);
  const found = anilist.find(a => {
    if (norm(a.name) === cn || norm(a.userPreferred) === cn) return true;
    if (a.alternatives && a.alternatives.some(alt => norm(alt) === cn)) return true;
    const parts = name.split(' ');
    if (parts.length === 2) {
      const reversed = norm(parts[1] + parts[0]);
      if (norm(a.name) === reversed || norm(a.userPreferred) === reversed) return true;
    }
    return false;
  });

  return found ? found.image : null;
}

// Special overrides or wiki paths when needed
const WIKI_IMAGES = {
  'lockhart': 'static.wikia.nocookie.net/bluelock/images/6/66/Lockhart.png/revision/latest',
  'coach-fox': 'static.wikia.nocookie.net/bluelock/images/e/e0/FoxPortrait.png/revision/latest',
  'achanpong': 'static.wikia.nocookie.net/bluelock/images/e/e1/Achanpong.png/revision/latest',
  'rooke': 'static.wikia.nocookie.net/bluelock/images/1/1b/Rook.png/revision/latest',
  'ignacio-lara': 'static.wikia.nocookie.net/bluelock/images/f/f7/Ignacio_Lara.png/revision/latest',
  'yasumori-hoichi': 'static.wikia.nocookie.net/bluelock/images/4/46/Yasumori_Hoichi.png/revision/latest',
  'ryo-nameoka': 'static.wikia.nocookie.net/bluelock/images/b/bd/Ryo_Nameoka.png/revision/latest',
  'julien-loki': 'static.wikia.nocookie.net/bluelock/images/2/21/Julian_Loki.png/revision/latest',
  'hibiki-okawa': 'static.wikia.nocookie.net/bluelock/images/b/bc/Hibiki_Okawa.png/revision/latest'
};

async function fetchImageBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function processAndSaveAvatar(buffer, outputPath) {
  const metadata = await sharp(buffer).metadata();
  const width = metadata.width;
  const height = metadata.height;

  const side = Math.min(width, height);
  let left = Math.floor((width - side) / 2);
  let top = 0;

  if (height > width) {
    // Face is typically in the upper 40-50%
    top = Math.min(Math.floor(height * 0.05), height - side);
  }

  await sharp(buffer)
    .extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: side,
      height: side
    })
    .resize(256, 256, { fit: 'cover' })
    .png({ quality: 90 })
    .toFile(outputPath);
}

async function main() {
  console.log(`Processing ${charactersData.length} Blue Lock characters...`);
  const finalCharacters = [];
  let successfulAvatars = 0;

  for (let i = 0; i < charactersData.length; i++) {
    const c = charactersData[i];
    const avatarFilename = `${c.id}.png`;
    const avatarPath = path.join(avatarsDir, avatarFilename);
    const avatarUrl = `/avatars/blue-lock/${avatarFilename}`;

    console.log(`[${i + 1}/${charactersData.length}] ${c.name} (${c.id})...`);

    let gotImage = false;

    // 1. Try AniList first
    const anilistUrl = findAniListImage(c.name);
    if (anilistUrl) {
      try {
        const buf = await fetchImageBuffer(anilistUrl);
        await processAndSaveAvatar(buf, avatarPath);
        console.log(`  ✓ Got from AniList: ${avatarFilename}`);
        gotImage = true;
      } catch (e) {
        console.warn(`  ⚠️ AniList fetch error for ${c.name}: ${e.message}`);
      }
    }

    // 2. If not from AniList or failed, try wsrv proxy of Wikia
    if (!gotImage) {
      let wikiPath = WIKI_IMAGES[c.id];
      if (!wikiPath && c.wikiTitle) {
        wikiPath = `static.wikia.nocookie.net/bluelock/images/${encodeURIComponent(c.wikiTitle.replace(/ /g, '_'))}.png/revision/latest`;
      }

      if (wikiPath) {
        try {
          const wsrvUrl = `https://wsrv.nl/?url=${encodeURIComponent(wikiPath)}`;
          const buf = await fetchImageBuffer(wsrvUrl);
          await processAndSaveAvatar(buf, avatarPath);
          console.log(`  ✓ Got from Wiki/wsrv: ${avatarFilename}`);
          gotImage = true;
        } catch (e) {
          console.warn(`  ⚠️ Wiki proxy error for ${c.name}: ${e.message}`);
        }
      }
    }

    if (gotImage) {
      successfulAvatars++;
    } else {
      console.error(`  ❌ NO AVATAR FOR ${c.name}!`);
    }

    finalCharacters.push({
      id: c.id,
      name: c.name,
      gender: c.gender,
      species: "Humano",
      country: c.country,
      position: c.position,
      affiliation: c.affiliation,
      bounty: c.bounty,
      styleOrPower: c.styleOrPower,
      debutArc: c.debutArc,
      status: c.status,
      quote: c.quote,
      avatar: avatarUrl
    });
  }

  // Write characters.json
  const jsonPath = path.join(dataDir, 'characters.json');
  fs.writeFileSync(jsonPath, JSON.stringify(finalCharacters, null, 2), 'utf-8');
  console.log(`\n🎉 Generated ${finalCharacters.length} characters (${successfulAvatars} avatars saved) in ${jsonPath}`);
}

main();
