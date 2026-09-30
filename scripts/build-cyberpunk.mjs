import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { CYBERPUNK_CHARACTERS } from './data/cyberpunk-characters.mjs';

const animeSlug = 'cyberpunk-edgerunners';
const wikiDomain = 'cyberpunk';
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
        'Referer': 'https://cyberpunk.fandom.com/'
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

  // Se o retrato for vertical (altura > largura * 1.15), focar estritamente no topo/rosto
  if (height > width * 1.15) {
    const size = Math.round(width * 0.90);
    const top = Math.round(height * 0.04);
    const left = Math.round((width - size) / 2);

    await sharp(buffer)
      .extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: Math.min(size, width),
        height: Math.min(size, height - top)
      })
      .resize(240, 240, { fit: 'cover' })
      .png({ quality: 95 })
      .toFile(outputPath);
  } else {
    const size = Math.min(width, height);
    const left = Math.round((width - size) / 2);
    const top = Math.round((height - size) / 2);

    await sharp(buffer)
      .extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: size,
        height: size
      })
      .resize(240, 240, { fit: 'cover' })
      .png({ quality: 95 })
      .toFile(outputPath);
  }
}

async function run() {
  console.log(`=== PROCESSANDO ${CYBERPUNK_CHARACTERS.length} PERSONAGENS DE ${animeSlug.toUpperCase()} ===\n`);
  const finalCharacters = [];
  let successCount = 0;

  for (let i = 0; i < CYBERPUNK_CHARACTERS.length; i++) {
    const char = CYBERPUNK_CHARACTERS[i];
    const outputPath = path.join(outAvatarsDir, `${char.id}.png`);
    const wikiTitle = char.wikiTitle || char.name;

    console.log(`[${i + 1}/${CYBERPUNK_CHARACTERS.length}] Buscando ${char.name} (${wikiTitle})...`);
    let imgUrl = await fetchWikiThumbnail(wikiTitle);

    if (!imgUrl && char.wikiTitle !== char.name) {
      imgUrl = await fetchWikiThumbnail(char.name);
    }

    if (imgUrl) {
      try {
        const imgRes = await fetch(imgUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://cyberpunk.fandom.com/'
          }
        });
        const buf = Buffer.from(await imgRes.arrayBuffer());
        await processAvatar(buf, outputPath);
        console.log(`   ✅ Avatar salvo: ${outputPath}`);
        successCount++;
      } catch (err) {
        console.error(`   ❌ Falha ao processar imagem de ${char.name}:`, err.message);
      }
    } else {
      console.warn(`   ⚠️ Imagem não encontrada para ${char.name}`);
    }

    const { wikiTitle: _, ...charClean } = char;
    finalCharacters.push({
      ...charClean,
      avatar: `/avatars/${animeSlug}/${char.id}.png`
    });
  }

  fs.writeFileSync(outJsonPath, JSON.stringify(finalCharacters, null, 2), 'utf8');
  console.log(`\nSalvo ${finalCharacters.length} personagens em ${outJsonPath}! Sucesso de avatares: ${successCount}/${CYBERPUNK_CHARACTERS.length}`);
}

run().catch(console.error);
