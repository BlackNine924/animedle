import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { FAIRY_TAIL_CHARACTERS } from './data/ft-characters.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'fairy-tail');
const charactersJsonPath = path.join(rootDir, 'src', 'data', 'animes', 'fairy-tail', 'characters.json');

fs.mkdirSync(avatarsDir, { recursive: true });
fs.mkdirSync(path.dirname(charactersJsonPath), { recursive: true });

async function fetchWikiThumbnail(title) {
  const url = `https://fairytail.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json&redirects=1`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'AnimedleBot/1.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://fairytail.fandom.com/'
      }
    });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (err) {
    console.error(`Erro ao buscar wiki para "${title}":`, err.message);
    return null;
  }
}

async function processAvatar(buffer, outputPath) {
  const meta = await sharp(buffer).metadata();
  const width = meta.width;
  const height = meta.height;

  // Se for retrato vertical, focar estritamente no topo/rosto
  if (height > width * 1.25) {
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
      .png({ quality: 90 })
      .toFile(outputPath);
  } else if (width > height * 1.25) {
    const size = Math.min(height, Math.round(width * 0.70));
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
      .png({ quality: 90 })
      .toFile(outputPath);
  } else {
    // Para imagens quadradas (padrão de 800x800 e 520x520 do Fandom de Fairy Tail)
    await sharp(buffer)
      .resize(240, 240, { fit: 'cover', position: 'center' })
      .png({ quality: 90 })
      .toFile(outputPath);
  }
}

async function buildFairyTail() {
  console.log(`\n=== INICIANDO INTEGRAÇÃO DE FAIRY TAIL (${FAIRY_TAIL_CHARACTERS.length} PERSONAGENS) ===\n`);

  let successCount = 0;
  const missing = [];

  for (let i = 0; i < FAIRY_TAIL_CHARACTERS.length; i++) {
    const char = FAIRY_TAIL_CHARACTERS[i];
    const outputPath = path.join(avatarsDir, `${char.id}.png`);
    const wikiTitle = char.wikiTitle || char.name;

    console.log(`[${i + 1}/${FAIRY_TAIL_CHARACTERS.length}] Processando ${char.name} (${char.id}) [Wiki: ${wikiTitle}]...`);

    let imageUrl = await fetchWikiThumbnail(wikiTitle);

    if (!imageUrl && char.wikiTitle && char.wikiTitle !== char.name) {
      imageUrl = await fetchWikiThumbnail(char.name);
    }

    if (!imageUrl) {
      console.warn(`   ⚠️ URL de imagem não encontrada para ${char.name} (${wikiTitle})`);
      missing.push({ id: char.id, name: char.name, wikiTitle });
      continue;
    }

    try {
      const res = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://fairytail.fandom.com/'
        }
      });

      if (!res.ok) {
        console.warn(`   ⚠️ Erro HTTP ${res.status} ao baixar imagem de ${char.name}`);
        missing.push({ id: char.id, name: char.name, wikiTitle });
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      await processAvatar(buffer, outputPath);
      console.log(`   ✓ Avatar salvo em: ${char.id}.png`);
      successCount++;
    } catch (err) {
      console.error(`   ❌ Falha ao processar avatar de ${char.name}:`, err.message);
      missing.push({ id: char.id, name: char.name, wikiTitle });
    }

    await new Promise(r => setTimeout(r, 90));
  }

  // Grava characters.json limpando wikiTitle
  const cleanCharacters = FAIRY_TAIL_CHARACTERS.map(c => {
    const { wikiTitle, ...cleanChar } = c;
    return cleanChar;
  });

  fs.writeFileSync(charactersJsonPath, JSON.stringify(cleanCharacters, null, 2), 'utf-8');
  console.log(`\n=== RESULTADO: ${cleanCharacters.length} personagens salvos em ${charactersJsonPath} (${successCount} avatares gerados) ===\n`);

  if (missing.length > 0) {
    console.log(`Avisos: ${missing.length} imagens faltantes:`, JSON.stringify(missing, null, 2));
  }
}

buildFairyTail().catch(console.error);
