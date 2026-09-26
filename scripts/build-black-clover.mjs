import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { ALL_BC_CHARACTERS } from './data/bc-characters.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'black-clover');
const charactersJsonPath = path.join(rootDir, 'src', 'data', 'animes', 'black-clover', 'characters.json');

fs.mkdirSync(avatarsDir, { recursive: true });
fs.mkdirSync(path.dirname(charactersJsonPath), { recursive: true });

async function fetchWikiThumbnail(title) {
  const url = `https://blackclover.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json&redirects=1`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'AnimedleBot/1.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://blackclover.fandom.com/'
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

  if (height > width * 1.25) {
    const size = Math.round(width * 0.90);
    const top = Math.round(height * 0.03);
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
    const size = Math.min(height, Math.round(width * 0.65));
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
    await sharp(buffer)
      .resize(240, 240, { fit: 'cover', position: 'center' })
      .png({ quality: 90 })
      .toFile(outputPath);
  }
}

async function buildBlackClover() {
  console.log(`\n=== INICIANDO INTEGRAÇÃO DE BLACK CLOVER (${ALL_BC_CHARACTERS.length} PERSONAGENS) ===\n`);

  let successCount = 0;

  for (let i = 0; i < ALL_BC_CHARACTERS.length; i++) {
    const char = ALL_BC_CHARACTERS[i];
    const outputPath = path.join(avatarsDir, `${char.id}.png`);
    const wikiTitle = char.wikiTitle || char.name;

    console.log(`[${i + 1}/${ALL_BC_CHARACTERS.length}] Processando ${char.name} (${char.id}) [Wiki: ${wikiTitle}]...`);

    const imageUrl = await fetchWikiThumbnail(wikiTitle);

    if (!imageUrl) {
      console.warn(`   ⚠️ URL de imagem não encontrada para ${char.name} (${wikiTitle})`);
      continue;
    }

    try {
      const res = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://blackclover.fandom.com/'
        }
      });

      if (!res.ok) {
        console.warn(`   ⚠️ Erro HTTP ${res.status} ao baixar imagem de ${char.name}`);
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      await processAvatar(buffer, outputPath);
      console.log(`   ✓ Avatar salvo em: ${char.id}.png`);
      successCount++;
    } catch (err) {
      console.error(`   ❌ Falha ao processar avatar de ${char.name}:`, err.message);
    }

    await new Promise(r => setTimeout(r, 120));
  }

  // Grava characters.json limpando wikiTitle
  const cleanCharacters = ALL_BC_CHARACTERS.map(c => {
    const { wikiTitle, ...cleanChar } = c;
    return cleanChar;
  });

  fs.writeFileSync(charactersJsonPath, JSON.stringify(cleanCharacters, null, 2), 'utf-8');
  console.log(`\n=== SUCESSO: ${cleanCharacters.length} personagens salvos em ${charactersJsonPath} (${successCount} avatares gerados) ===\n`);
}

buildBlackClover().catch(console.error);
