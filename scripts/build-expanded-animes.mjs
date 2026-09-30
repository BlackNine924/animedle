import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { AKAME_CHARACTERS } from './data/akame-characters.mjs';
import { CYBERPUNK_CHARACTERS } from './data/cyberpunk-characters.mjs';
import { SHANGRI_LA_CHARACTERS } from './data/shangri-la-characters.mjs';
import { WITCH_HAT_CHARACTERS } from './data/witch-hat-characters.mjs';
import { NANATSU_CHARACTERS } from './data/nanatsu-characters.mjs';
import { MHA_CHARACTERS } from './data/mha-characters.mjs';

const ANIMES = [
  { slug: 'akame-ga-kill', wiki: 'akamegakill', chars: AKAME_CHARACTERS },
  { slug: 'cyberpunk-edgerunners', wiki: 'cyberpunk', chars: CYBERPUNK_CHARACTERS },
  { slug: 'shangri-la-frontier', wiki: 'shangrila-frontier', chars: SHANGRI_LA_CHARACTERS },
  { slug: 'witch-hat-atelier', wiki: 'witch-hat-atelier', chars: WITCH_HAT_CHARACTERS },
  { slug: 'nanatsu-no-taizai', wiki: 'nanatsu-no-taizai', chars: NANATSU_CHARACTERS },
  { slug: 'my-hero-academia', wiki: 'myheroacademia', chars: MHA_CHARACTERS }
];

const ANILIST_QUERY = `query ($search: String) {
  Character(search: $search) {
    id
    name { full native }
    image { large }
  }
}`;

async function fetchAniListImage(name) {
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({ query: ANILIST_QUERY, variables: { search: name } })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.Character?.image?.large || null;
  } catch {
    return null;
  }
}

async function fetchWikiThumbnail(domain, title) {
  const url = `https://${domain}.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json&redirects=1`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': `https://${domain}.fandom.com/`
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch {
    return null;
  }
}

async function processAvatarTightFace(buffer, outputPath) {
  const meta = await sharp(buffer).metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buffer);

  if (h > w * 1.8) {
    // Tall full-body character sprite
    // Head and face occupy roughly the top 28% of height, centered horizontally
    const size = Math.min(w, Math.round(h * 0.28));
    const top = Math.round(h * 0.01);
    const left = Math.max(0, Math.round((w - size) / 2));
    pipeline = pipeline.extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: Math.min(size, w - Math.max(0, left)),
      height: Math.min(size, h - Math.max(0, top))
    });
  } else if (h >= w) {
    // Portrait / bust / half-body (e.g. 600x800, 230x345, 400x500)
    // Use full width 'w' as square side, so face and chin are never cut off
    const side = w;
    // Offset slightly from top (between 0 and 15% of vertical overflow)
    const overflow = h - side;
    const top = Math.max(0, Math.min(Math.round(overflow * 0.12), overflow));
    pipeline = pipeline.extract({
      left: 0,
      top: top,
      width: side,
      height: Math.min(side, h - top)
    });
  } else {
    // Landscape / wide illustration (w > h)
    const side = h;
    const left = Math.max(0, Math.round((w - side) / 2));
    pipeline = pipeline.extract({
      left: left,
      top: 0,
      width: Math.min(side, w - left),
      height: side
    });
  }

  await pipeline
    .resize(240, 240, { fit: 'cover', position: 'top' })
    .png({ quality: 95 })
    .toFile(outputPath);
}

async function processAnime(anime) {
  const { slug, wiki, chars } = anime;
  const outAvatarsDir = path.join('public', 'avatars', slug);
  const outJsonPath = path.join('src', 'data', 'animes', slug, 'characters.json');

  fs.mkdirSync(outAvatarsDir, { recursive: true });
  fs.mkdirSync(path.dirname(outJsonPath), { recursive: true });

  console.log(`\n========================================`);
  console.log(`  PROCESSANDO ${slug.toUpperCase()} (${chars.length} personagens)`);
  console.log(`========================================`);

  const finalChars = [];
  let success = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const outputPath = path.join(outAvatarsDir, `${char.id}.png`);

    const searchName = char.searchName || char.name.split('(')[0].trim();
    let imgUrl = null;

    // 1. Try Fandom Wiki first for official character infobox
    if (wiki) {
      const wikiTitle = char.wikiTitle || searchName;
      imgUrl = await fetchWikiThumbnail(wiki, wikiTitle);
      if (!imgUrl && char.wikiTitle !== char.name) {
        imgUrl = await fetchWikiThumbnail(wiki, char.name);
      }
    }

    // 2. Fallback to AniList
    if (!imgUrl) {
      imgUrl = await fetchAniListImage(searchName);
    }

    if (imgUrl) {
      try {
        const res = await fetch(imgUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': wiki ? `https://${wiki}.fandom.com/` : 'https://anilist.co'
          }
        });
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          await processAvatarTightFace(buf, outputPath);
          success++;
          process.stdout.write(`[${i+1}/${chars.length}] ${char.name} (Face OK)\n`);
        } else {
          process.stdout.write(`[${i+1}/${chars.length}] ${char.name} (HTTP ${res.status})\n`);
        }
      } catch (err) {
        console.warn(`[${i+1}/${chars.length}] ${char.name} (Erro): ${err.message}`);
      }
    } else {
      process.stdout.write(`[${i+1}/${chars.length}] ${char.name} (Sem nova URL, mantendo existente se houver)\n`);
    }

    const { wikiTitle: _, searchName: __, ...cleanChar } = char;
    finalChars.push({
      ...cleanChar,
      avatar: `/avatars/${slug}/${char.id}.png`
    });

    await new Promise(r => setTimeout(r, 60));
  }

  fs.writeFileSync(outJsonPath, JSON.stringify(finalChars, null, 2), 'utf8');
  console.log(`[CONCLUÍDO] ${slug}: ${success}/${chars.length} avatares com foco no rosto e characters.json atualizado!`);
}

async function run() {
  for (const anime of ANIMES) {
    await processAnime(anime);
  }
  console.log('\nTODOS OS 6 ANIMES FORAM PROCESSADOS COM SUCESSO!');
}

await run();
