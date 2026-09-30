import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { SHANGRI_LA_CHARACTERS } from './data/shangri-la-characters.mjs';

const animeSlug = 'shangri-la-frontier';
const wikiDomain = 'shangrila-frontier'; // Note: without dash between shangri and la
const outAvatarsDir = path.join('public', 'avatars', animeSlug);
const outJsonPath = path.join('src', 'data', 'animes', animeSlug, 'characters.json');

fs.mkdirSync(outAvatarsDir, { recursive: true });
fs.mkdirSync(path.dirname(outJsonPath), { recursive: true });

async function fetchWikiThumbnail(title) {
  const url = `https://${wikiDomain}.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json&redirects=1`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://shangrila-frontier.fandom.com/'
      }
    });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (err) {
    console.error(`Erro ao buscar wiki "${title}":`, err.message);
    return null;
  }
}

async function processAvatar(buffer, outputPath) {
  const meta = await sharp(buffer).metadata();
  const width = meta.width;
  const height = meta.height;

  let pipeline = sharp(buffer);

  if (height > width * 2.2) {
    const cropH = Math.round(height * 0.32);
    pipeline = pipeline.extract({ left: 0, top: 0, width, height: Math.max(cropH, 1) });
  } else if (height > width * 1.2) {
    const cropH = Math.round(width * 1.1);
    const top = Math.round(height * 0.03);
    const safeTop = Math.min(top, Math.max(0, height - cropH));
    const safeH = Math.min(cropH, height - safeTop);
    pipeline = pipeline.extract({ left: 0, top: safeTop, width, height: Math.max(safeH, 1) });
  }

  await pipeline
    .resize(240, 240, { fit: 'cover', position: 'top' })
    .png({ quality: 95 })
    .toFile(outputPath);
}

async function run() {
  console.log(`=== PROCESSANDO ${SHANGRI_LA_CHARACTERS.length} PERSONAGENS DE ${animeSlug.toUpperCase()} ===\n`);
  const finalCharacters = [];
  let successCount = 0;

  for (let i = 0; i < SHANGRI_LA_CHARACTERS.length; i++) {
    const char = SHANGRI_LA_CHARACTERS[i];
    const outputPath = path.join(outAvatarsDir, `${char.id}.png`);
    const wikiTitle = char.wikiTitle || char.name;

    console.log(`[${i + 1}/${SHANGRI_LA_CHARACTERS.length}] Buscando ${char.name} (${wikiTitle})...`);
    let imgUrl = await fetchWikiThumbnail(wikiTitle);

    if (!imgUrl && char.wikiTitle !== char.name) {
      imgUrl = await fetchWikiThumbnail(char.name);
    }

    if (imgUrl) {
      try {
        const imgRes = await fetch(imgUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://shangrila-frontier.fandom.com/'
          }
        });
        const buf = Buffer.from(await imgRes.arrayBuffer());
        await processAvatar(buf, outputPath);
        console.log(`   ✅ Avatar salvo: ${outputPath}`);
        successCount++;
      } catch (err) {
        console.error(`   ❌ Falha ao processar avatar de ${char.name}:`, err.message);
      }
    } else {
      console.warn(`   ⚠️ Nenhuma thumbnail encontrada para ${char.name}`);
    }

    const { wikiTitle: _, ...charClean } = char;
    finalCharacters.push({
      ...charClean,
      avatar: `/avatars/${animeSlug}/${char.id}.png`
    });
  }

  fs.writeFileSync(outJsonPath, JSON.stringify(finalCharacters, null, 2), 'utf8');
  console.log(`\n🎉 Concluído com sucesso!`);
  console.log(`- Avatars gerados: ${successCount}/${SHANGRI_LA_CHARACTERS.length}`);
  console.log(`- Arquivo JSON salvo em: ${outJsonPath}`);
}

run();
