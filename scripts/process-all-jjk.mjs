import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://jujutsu-kaisen.fandom.com/'
};

async function getImageUrl(fileTitle) {
  try {
    const fullTitle = fileTitle.startsWith('File:') ? fileTitle : `File:${fileTitle}`;
    const url = `https://jujutsu-kaisen.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(fullTitle)}&format=json`;
    const res = await fetch(url, { headers: defaultHeaders });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.imageinfo?.[0]?.url || null;
  } catch (e) {
    return null;
  }
}

async function searchCandidate(query) {
  try {
    const url = `https://jujutsu-kaisen.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
    const res = await fetch(url, { headers: defaultHeaders });
    const data = await res.json();
    const hits = (data.query?.search || []).map(s => s.title.replace(/^File:/, ''));
    return hits.filter(h => !h.endsWith('.gif') && !h.toLowerCase().includes('manga') && !h.toLowerCase().includes('stage'));
  } catch (e) {
    return [];
  }
}

// Smart cropping function designed for anime screenshots and character visuals
async function smartCropAndSave(buf, outPath) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });

  let pipeline = sharp(buf);

  // Check if image has transparency or is a character cutout
  const stats = await sharp(buf).stats();
  const hasTransparency = !stats.isOpaque;

  if (hasTransparency) {
    // Flatten onto #121A2D (as approved by user for transparent cutouts)
    pipeline = pipeline.flatten({ background: '#121A2D' });

    // Find bounding box of visible content
    let minX = w, maxX = 0, minY = h, maxY = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const a = data[(y * w + x) * info.channels + (info.channels - 1)];
        if (a > 20) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const charW = maxX - minX;
    const charH = maxY - minY;

    if (charH > charW * 1.5) {
      // Full body or 3/4 body visual: head is in the top 25-30% of character height
      const cropSize = Math.round(Math.min(charW * 1.3, charH * 0.32, w));
      const centerX = Math.round((minX + maxX) / 2);
      const left = Math.max(0, Math.min(w - cropSize, Math.round(centerX - cropSize / 2)));
      const top = Math.max(0, Math.min(h - cropSize, Math.round(minY + charH * 0.01)));

      pipeline = pipeline.extract({
        left,
        top,
        width: cropSize,
        height: cropSize
      });
    } else {
      const size = Math.min(w, h);
      const left = Math.round((w - size) / 2);
      const top = Math.round((h - size) * 0.1);
      pipeline = pipeline.extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: size,
        height: size
      });
    }
  } else if (w > h * 1.2) {
    // Landscape anime screenshot (16:9)
    // Find skin cluster to focus on the face
    let skinXSum = 0, skinYSum = 0, skinCount = 0;
    for (let y = Math.round(h * 0.1); y < Math.round(h * 0.85); y++) {
      for (let x = Math.round(w * 0.15); x < Math.round(w * 0.85); x++) {
        const idx = (y * w + x) * info.channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 150 && g > 100 && b > 80 && r > g && g > b && (r - b) > 30) {
          skinXSum += x;
          skinYSum += y;
          skinCount++;
        }
      }
    }

    let centerX = Math.round(w / 2);
    let centerY = Math.round(h / 2);
    if (skinCount > 100) {
      centerX = Math.round(skinXSum / skinCount);
      centerY = Math.round(skinYSum / skinCount);
    }

    const cropSize = Math.round(h * 0.90);
    const left = Math.max(0, Math.min(w - cropSize, Math.round(centerX - cropSize / 2)));
    const top = Math.max(0, Math.min(h - cropSize, Math.round(centerY - cropSize / 2)));

    pipeline = pipeline.extract({
      left,
      top,
      width: cropSize,
      height: cropSize
    });
  } else if (h > w * 1.2) {
    // Portrait image
    const cropSize = w;
    const top = Math.round((h - cropSize) * 0.1);
    pipeline = pipeline.extract({
      left: 0,
      top: Math.max(0, Math.min(top, h - cropSize)),
      width: cropSize,
      height: cropSize
    });
  }

  await pipeline
    .resize(240, 240, { fit: 'cover' })
    .png({ quality: 90 })
    .toFile(outPath);
}

// Master list of 81 targets with their verified anime files or search queries
const targets = [
  { id: 'yuji-itadori', file: 'Yuji Itadori (Anime).png', fallback: 'Yuji Itadori anime' },
  { id: 'megumi-fushiguro', file: 'Megumi Fushiguro (Anime).png', fallback: 'Megumi Fushiguro anime' },
  { id: 'yuta-okkotsu', file: 'Yuta Okkotsu (Anime).png', fallback: 'Yuta Okkotsu anime' },
  { id: 'maki-zenin', file: 'Maki Zenin introduced (Anime).png', fallback: 'Maki Zenin anime' },
  { id: 'toge-inumaki', file: 'Toge Inumaki (Anime).png', fallback: 'Toge Inumaki anime' },
  { id: 'panda', file: 'Panda (Anime 2).png', fallback: 'Panda anime' },
  { id: 'kinji-hakari', file: 'Kinji Hakari (Anime).png', fallback: 'Kinji Hakari anime' },
  { id: 'kirara-hoshi', file: 'Kirara Hoshi (Anime).png', fallback: 'Kirara Hoshi anime' },
  { id: 'aoi-todo', file: 'Aoi Todo (Anime).png', fallback: 'Aoi Todo anime' },
  { id: 'mai-zenin', file: 'Mai Zenin (Anime).png', fallback: 'Mai Zenin anime' },
  { id: 'kokichi-muta', file: 'Kokichi Muta (Anime).png', fallback: 'Kokichi Muta anime' },
  { id: 'noritoshi-kamo', file: 'Noritoshi Kamo (Anime).png', fallback: 'Noritoshi Kamo anime' },
  { id: 'yoshinobu-gakuganji', file: 'Yoshinobu Gakuganji (Anime).png', fallback: 'Gakuganji anime' },
  { id: 'utahime-iori', file: 'Utahime Iori (Anime 2).png', fallback: 'Utahime Iori anime' },
  { id: 'arata-nitta', file: 'Arata Nitta (Anime).png', fallback: 'Arata Nitta anime' },
  { id: 'kento-nanami', file: 'Kento Nanami (Anime 2).png', fallback: 'Kento Nanami anime' },
  { id: 'masamichi-yaga', file: 'Masamichi Yaga (Prequel Anime).png', fallback: 'Masamichi Yaga anime' },
  { id: 'takuma-ino', file: 'Takuma Ino (Anime).png', fallback: 'Takuma Ino anime' },
  { id: 'atsuya-kusakabe', file: 'Atsuya Kusakabe (Anime).png', fallback: 'Atsuya Kusakabe anime' },
  { id: 'mei-mei', file: 'Mei Mei (Anime).png', fallback: 'Mei Mei anime' },
  { id: 'ui-ui', file: 'Ui Ui (Anime).png', fallback: 'Ui Ui anime' },
  { id: 'yuki-tsukumo', file: 'Yuki Tsukumo comes to the rescue (Anime).png', fallback: 'Yuki Tsukumo anime' },
  { id: 'tengen', file: 'Tengen (Anime).png', fallback: 'Master Tengen anime' },
  { id: 'akari-nitta', file: 'Akari Nitta (Anime).png', fallback: 'Akari Nitta anime' },
  { id: 'yu-haibara', file: 'Yu Haibara in 2007 (Anime).png', fallback: 'Yu Haibara anime' },
  { id: 'misato-kuroi', file: 'Misato Kuroi (Anime).png', fallback: 'Misato Kuroi anime' },
  { id: 'toji-fushiguro', file: 'Toji Fushiguro (Anime).png', fallback: 'Toji Fushiguro anime' },
  { id: 'naobito-zenin', file: 'Naobito Zenin (Anime 2).png', fallback: 'Naobito Zenin anime' },
  { id: 'naoya-zenin', file: 'Naoya Zenin.png', fallback: 'Naoya Zenin anime' },
  { id: 'ogi-zenin', file: 'Ogi Zenin (Anime).png', fallback: 'Ogi Zenin anime' },
  { id: 'jinichi-zenin', file: 'Jinichi Zenin (Anime).png', fallback: 'Jinichi Zenin anime' },
  { id: 'shiu-kong', file: 'Toji and Shiu Kong (Anime).png', fallback: 'Shiu Kong anime' },
  { id: 'ryomen-sukuna', file: 'Ryomen Sukuna (Anime).png', fallback: 'Ryomen Sukuna anime' },
  { id: 'suguru-geto', file: 'Suguru Geto (Prequel Anime).png', fallback: 'Suguru Geto anime' },
  { id: 'kenjaku', file: 'Kenjaku (Anime).png', fallback: 'Kenjaku anime' },
  { id: 'uraume', file: 'Uraume (Anime 1).png', fallback: 'Uraume anime' },
  { id: 'mahito', file: 'Mahito (Anime).png', fallback: 'Mahito anime' },
  { id: 'jogo', file: 'Jogo (Anime).png', fallback: 'Jogo anime' },
  { id: 'hanami', file: 'Hanami (Anime).png', fallback: 'Hanami anime' },
  { id: 'dagon', file: 'Dagon (Anime).png', fallback: 'Dagon anime' },
  { id: 'choso', file: 'Choso (Anime 2).png', fallback: 'Choso anime' },
  { id: 'eso', file: 'Eso first appearance (Anime).png', fallback: 'Eso anime' },
  { id: 'rika-orimoto', file: 'Rika Orimoto (Anime).png', fallback: 'Rika Orimoto anime' },
  { id: 'smallpox-deity', file: 'Smallpox Deity Gravestone Technique (Anime).png', fallback: 'Smallpox Deity anime' },
  { id: 'hajime-kashimo', file: 'Hajime Kashimo (Anime).png', fallback: 'Hajime Kashimo anime' },
  { id: 'hiromi-higuruma', file: 'Hiromi Higuruma (Anime).png', fallback: 'Hiromi Higuruma anime' },
  { id: 'ryu-ishigori', file: 'Ryu Ishigori (Anime).png', fallback: 'Ryu Ishigori anime' },
  { id: 'takako-uro', file: 'Takako Uro (Anime).png', fallback: 'Takako Uro anime' },
  { id: 'fumihiko-takaba', file: 'Fumihiko Takaba (Anime).png', fallback: 'Fumihiko Takaba anime' },
  { id: 'hana-kurusu', file: 'Hana Kurusu.png', fallback: 'Hana Kurusu' },
  { id: 'yorozu', file: 'Yorozu.png', fallback: 'Yorozu' },
  { id: 'reggie-star', file: 'Reggie Star (Anime).png', fallback: 'Reggie Star anime' },
  { id: 'dhruv-lakdawala', file: 'Dhruv Lakdawala.png', fallback: 'Dhruv Lakdawala' },
  { id: 'kurourushi', file: 'Kurourushi (Anime).png', fallback: 'Kurourushi anime' },
  { id: 'charles-bernard', file: 'Charles Bernard.png', fallback: 'Charles Bernard' },
  { id: 'hagane-daido', file: 'Hagane Daido.png', fallback: 'Hagane Daido' },
  { id: 'rokujushi-miyo', file: 'Rokujushi Miyo.png', fallback: 'Rokujushi Miyo' },
  { id: 'iori-hazenoki', file: 'Iori Hazenoki (Anime).png', fallback: 'Iori Hazenoki anime' },
  { id: 'haruta-shigemo', file: 'Haruta Shigemo (Anime).png', fallback: 'Haruta Shigemo anime' },
  { id: 'jiro-awasaka', file: 'Jiro Awasaka (Anime).png', fallback: 'Jiro Awasaka anime' },
  { id: 'juzo-kumiya', file: 'Juzo Kumiya (Anime).png', fallback: 'Juzo Kumiya anime' },
  { id: 'junpei-yoshino', file: 'Junpei Yoshino (Anime).png', fallback: 'Junpei Yoshino anime' },
  { id: 'jin-itadori', file: 'Jin Itadori (Anime).png', fallback: 'Jin Itadori anime' },
  { id: 'kaori-itadori', file: 'Kaori Itadori (Anime).png', fallback: 'Kaori Itadori anime' },
  { id: 'tsumiki-fushiguro', file: 'Tsumiki Fushiguro (Anime).png', fallback: 'Tsumiki Fushiguro anime' },
  { id: 'mimiko-hasaba', file: 'Mimiko Hasaba (Anime 2).png', fallback: 'Mimiko Hasaba anime' },
  { id: 'nanako-hasaba', file: 'Nanako Hasaba (Anime).png', fallback: 'Nanako Hasaba anime' },
  { id: 'larue', file: 'Larue (Anime).png', fallback: 'Larue anime' },
  { id: 'miguel', file: 'Miguel (Anime).png', fallback: 'Miguel anime' },
  { id: 'finger-bearer', file: 'Finger Bearer (Anime).png', fallback: 'Finger Bearer anime' },
  { id: 'grasshopper-curse', file: 'Grasshopper Curse (Anime).png', fallback: 'Grasshopper Curse anime' },
  { id: 'remi', file: 'Remi (Anime).png', fallback: 'Remi anime' },
  { id: 'haba', file: 'Haba.png', fallback: 'Haba' },
  { id: 'hanyu', file: 'Hanyu (Anime).png', fallback: 'Hanyu anime' },
  { id: 'amai-rin', file: 'Rin Amai (Anime).png', fallback: 'Rin Amai anime' },
  { id: 'nobuko-takada', file: 'Takada Anime.png', fallback: 'Takada anime' },
  { id: 'yuko-ozawa', file: 'Yuko Ozawa (Anime).png', fallback: 'Yuko Ozawa anime' },
  { id: 'sasaki', file: 'Setsuko Sasaki (Anime).png', fallback: 'Setsuko Sasaki anime' },
  { id: 'iguchi', file: 'Takeshi Iguchi (Anime).png', fallback: 'Takeshi Iguchi anime' }
];

async function run() {
  console.log(`Starting processing of ${targets.length} characters...`);
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    const outPath = path.resolve('public/avatars/jujutsu-kaisen', `${t.id}.png`);
    console.log(`[${i + 1}/${targets.length}] Processing ${t.id}...`);

    let url = null;
    if (t.file) {
      url = await getImageUrl(t.file);
    }
    if (!url && t.fallback) {
      const hits = await searchCandidate(t.fallback);
      if (hits.length > 0) {
        url = await getImageUrl(hits[0]);
      }
    }

    if (!url) {
      console.warn(`❌ No URL found for ${t.id}`);
      failCount++;
      continue;
    }

    try {
      const res = await fetch(url, { headers: defaultHeaders });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await smartCropAndSave(buf, outPath);
      console.log(`✅ Updated ${t.id} successfully.`);
      successCount++;
    } catch (err) {
      console.error(`❌ Error updating ${t.id}:`, err.message);
      failCount++;
    }

    // Small delay to be polite to wiki API
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n--- Completed JJK Processing ---`);
  console.log(`Success: ${successCount}, Failed: ${failCount}`);
}

run();
