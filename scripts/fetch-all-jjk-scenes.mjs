import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { isFlatBackground, cropAnimeFrame } from './jjk-crop-helper.mjs';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://jujutsu-kaisen.fandom.com/'
};

// Custom verified queries or file preferences for specific characters
const customQueries = {
  'yuta-okkotsu': ['Yuta declares he will kill Yuji Itadori (Anime).png', 'Yuta saves a civilian from a Cursed Spirit (Anime).png', 'Yuta Okkotsu anime'],
  'toge-inumaki': ['Toge Inumaki in class (Anime).png', 'Toge Inumaki introduced (Anime).png', 'Toge Inumaki anime'],
  'panda': ['Panda in class (Anime).png', 'Panda (Anime 3).png', 'Panda anime'],
  'kinji-hakari': ['Kinji Hakari (Anime).png', 'Kinji Hakari Manga.png', 'Kinji Hakari'],
  'kirara-hoshi': ['Kirara Hoshi Manga.png', 'Kirara Hoshi'],
  'mai-zenin': ['Mai Zenin first appearance (Anime).png', 'Mai Zenin (Anime 4).png', 'Mai Zenin anime'],
  'kokichi-muta': ['Kokichi Muta first appearance (Anime).png', 'Kokichi Muta using Puppet Manipulation (Anime).png', 'Kokichi Muta anime'],
  'noritoshi-kamo': ['Noritoshi Kamo aiming at Yuji (Anime).png', 'Noritoshi Kamo anime'],
  'yoshinobu-gakuganji': ['Gojo taunts Principal Gakuganji.png', 'Yoshinobu Gakuganji anime'],
  'utahime-iori': ['Gojo meets with Utahime.png', 'Utahime Iori anime'],
  'arata-nitta': ['Aoi Todo and Arata with Yuji in Shibuya Station.png', 'Arata Nitta anime'],
  'masamichi-yaga': ['Gojo with one of Principal Yaga\'s dolls.png', 'Masamichi Yaga anime'],
  'takuma-ino': ['Nanami and Ino surrounded by Transfigured Humans (Anime).png', 'Takuma Ino anime'],
  'atsuya-kusakabe': ['Atsuya Kusakabe anime', 'Kusakabe anime'],
  'mei-mei': ['Mei Mei and Ui Ui anime', 'Mei Mei anime'],
  'ui-ui': ['Ui Ui anime', 'Mei Mei and Ui Ui anime'],
  'tengen': ['Tengen anime', 'Master Tengen anime'],
  'akari-nitta': ['Akari Nitta anime', 'Akari Nitta (Anime)'],
  'misato-kuroi': ['Misato Kuroi anime', 'Misato Kuroi'],
  'naoya-zenin': ['Naoya Zenin anime', 'Naoya Zenin'],
  'ogi-zenin': ['Ogi Zenin anime', 'Ogi Zenin'],
  'jinichi-zenin': ['Jinichi Zenin anime', 'Jinichi Zenin'],
  'ryomen-sukuna': ['Ryomen Sukuna anime', 'Sukuna anime scene'],
  'suguru-geto': ['Suguru Geto anime', 'Pseudo-Geto shows Prison Realm to Yuji (Anime).png'],
  'kenjaku': ['Pseudo-Geto shows Prison Realm to Yuji (Anime).png', 'Kenjaku anime'],
  'uraume': ['Uraume anime', 'Uraume (Anime)'],
  'mahito': ['Mahito pins Nanami to the school building (Anime).png', 'Mahito anime scene', 'Mahito anime'],
  'jogo': ['Gojo vs. Jogo.png', 'Jogo anime'],
  'hanami': ['Hanami anime', 'Hanami (Anime)'],
  'dagon': ['Dagon anime', 'Dagon (Anime)'],
  'choso': ['Choso anime', 'Choso anime scene'],
  'rika-orimoto': ['Rika Orimoto anime', 'Rika Orimoto (Anime)'],
  'hajime-kashimo': ['Hajime Kashimo anime', 'Hajime Kashimo'],
  'hiromi-higuruma': ['Hiromi Higuruma anime', 'Hiromi Higuruma'],
  'ryu-ishigori': ['Ryu Ishigori anime', 'Ryu Ishigori'],
  'takako-uro': ['Takako Uro anime', 'Takako Uro'],
  'fumihiko-takaba': ['Fumihiko Takaba anime', 'Fumihiko Takaba'],
  'hana-kurusu': ['Hana Kurusu', 'Angel Jujutsu Kaisen'],
  'yorozu': ['Yorozu', 'Yorozu Jujutsu Kaisen'],
  'reggie-star': ['Reggie Star anime', 'Reggie Star'],
  'dhruv-lakdawala': ['Dhruv Lakdawala anime', 'Dhruv Lakdawala'],
  'kurourushi': ['Kurourushi anime', 'Kurourushi'],
  'charles-bernard': ['Charles Bernard anime', 'Charles Bernard'],
  'hagane-daido': ['Hagane Daido', 'Daido Jujutsu Kaisen'],
  'rokujushi-miyo': ['Rokujushi Miyo', 'Miyo Jujutsu Kaisen'],
  'iori-hazenoki': ['Iori Hazenoki anime', 'Iori Hazenoki'],
  'haruta-shigemo': ['Kento Nanami vs. Haruta Shigemo (Anime).png', 'Haruta Shigemo anime'],
  'jiro-awasaka': ['Jiro Awasaka anime', 'Awasaka anime'],
  'junpei-yoshino': ['Junpei Yoshino anime', 'Junpei Yoshino'],
  'jin-itadori': ['Jin Itadori anime', 'Jin Itadori'],
  'kaori-itadori': ['Kaori Itadori anime', 'Kaori Itadori'],
  'tsumiki-fushiguro': ['Tsumiki wakes up (Anime).png', 'Tsumiki Fushiguro anime'],
  'mimiko-hasaba': ['Mimiko Hasaba anime', 'Mimiko Hasaba'],
  'nanako-hasaba': ['Nanako Hasaba anime', 'Nanako Hasaba'],
  'larue': ['Larue anime', 'Larue Jujutsu Kaisen'],
  'miguel': ['Miguel anime', 'Miguel (Prequel Anime)'],
  'remi': ['Remi anime', 'Remi Jujutsu Kaisen'],
  'haba': ['Haba anime', 'Haba Jujutsu Kaisen'],
  'hanyu': ['Hanyu anime', 'Hanyu Jujutsu Kaisen'],
  'amai-rin': ['Rin Amai anime', 'Amai Rin anime', 'Amai Rin'],
  'yuko-ozawa': ['Yuko Ozawa anime', 'Yuko Ozawa'],
  'sasaki': ['Setsuko Sasaki anime', 'Setsuko Sasaki'],
  'iguchi': ['Takeshi Iguchi anime', 'Takeshi Iguchi']
};

async function getImageUrl(fileTitle) {
  try {
    const fullTitle = fileTitle.startsWith('File:') ? fileTitle : `File:${fileTitle}`;
    const url = `https://jujutsu-kaisen.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url|size&titles=${encodeURIComponent(fullTitle)}&format=json`;
    const res = await fetch(url, { headers: defaultHeaders });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    const info = page?.imageinfo?.[0];
    return info ? { url: info.url, width: info.width, height: info.height } : null;
  } catch (e) {
    return null;
  }
}

async function searchCandidates(query) {
  try {
    const url = `https://jujutsu-kaisen.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
    const res = await fetch(url, { headers: defaultHeaders });
    const data = await res.json();
    const hits = (data.query?.search || []).map(s => s.title.replace(/^File:/, ''));
    return hits.filter(h => !h.endsWith('.gif') && !h.endsWith('.svg'));
  } catch (e) {
    return [];
  }
}

async function tryFindOpaqueScene(queries) {
  for (const q of queries) {
    // If it looks like a direct filename (e.g. ends with .png)
    if (q.endsWith('.png') || q.endsWith('.jpg') || q.endsWith('.jpeg')) {
      const info = await getImageUrl(q);
      if (info) {
        const res = await fetch(info.url, { headers: defaultHeaders });
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          const check = await isFlatBackground(buf);
          if (!check.isFlat) {
            return { buf, title: q };
          }
        }
      }
    }

    // Otherwise search
    const hits = await searchCandidates(q);
    for (const h of hits) {
      const info = await getImageUrl(h);
      if (!info || info.width < 300) continue;
      const res = await fetch(info.url, { headers: defaultHeaders });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      const check = await isFlatBackground(buf);
      if (!check.isFlat) {
        return { buf, title: h };
      }
    }
  }
  return null;
}

async function processBatch() {
  const characters = JSON.parse(fs.readFileSync('src/data/animes/jujutsu-kaisen/characters.json', 'utf8'));
  console.log(`Checking ${characters.length} characters...`);

  // Characters we manually updated and verified:
  const manuallyVerified = ['yuji-itadori', 'toji-fushiguro', 'megumi-fushiguro', 'satoru-gojo', 'naobito-zenin', 'aoi-todo', 'kento-nanami'];

  let flatCount = 0;
  let replacedCount = 0;

  for (const c of characters) {
    if (manuallyVerified.includes(c.id)) {
      console.log(`[SKIPPED - VERIFIED] ${c.id}`);
      continue;
    }

    const currentPath = path.resolve('public/avatars/jujutsu-kaisen', `${c.id}.png`);
    if (!fs.existsSync(currentPath)) {
      console.log(`[MISSING FILE] ${c.id}`);
      continue;
    }

    const currentBuf = fs.readFileSync(currentPath);
    const check = await isFlatBackground(currentBuf);

    if (check.isFlat || customQueries[c.id]) {
      flatCount++;
      console.log(`\n🔍 [NEEDS SCENERY] ${c.id} (${check.reason})`);

      const queries = customQueries[c.id] || [`${c.name} anime`, `${c.name}`];
      const match = await tryFindOpaqueScene(queries);

      if (match) {
        const cropped = await cropAnimeFrame(match.buf);
        fs.writeFileSync(currentPath, cropped);
        console.log(`✅ [REPLACED] ${c.id} with "${match.title}"`);
        replacedCount++;
      } else {
        console.warn(`⚠️ [NO SCENERY FOUND] ${c.id}`);
      }
      await new Promise(r => setTimeout(r, 200));
    } else {
      console.log(`[OK SCENERY] ${c.id}`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Finished processing: ${replacedCount} replaced out of ${flatCount} flat avatars.`);
}

processBatch();
