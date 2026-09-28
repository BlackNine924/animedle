import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';
import { HXH_CHARACTERS } from './data/hxh-characters.mjs';

const avatarsDir = path.resolve('public/avatars/hunter-x-hunter');
const charactersJsonPath = path.resolve('src/data/animes/hunter-x-hunter/characters.json');

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

const jsonDir = path.dirname(charactersJsonPath);
if (!fs.existsSync(jsonDir)) {
  fs.mkdirSync(jsonDir, { recursive: true });
}

async function fetchWikiThumbnail(title) {
  const url = `https://hunterxhunter.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json&redirects=1`;

  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (!pages) return resolve(null);
          const page = Object.values(pages)[0];
          resolve(page?.thumbnail?.source || null);
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://hunterxhunter.fandom.com/'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function processAvatar(buffer, outputPath) {
  const meta = await sharp(buffer).metadata();
  const width = meta.width;
  const height = meta.height;

  let pipeline = sharp(buffer);

  if (height > width * 2.5) {
    // Imagem muito alta (corpo inteiro): pega top 35% para focar no rosto
    const cropH = Math.round(height * 0.35);
    pipeline = pipeline.extract({ left: 0, top: 0, width, height: Math.max(cropH, 1) });
  } else if (height > width * 1.3) {
    // Imagem portrait: crop no topo focando no rosto
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

async function buildHxH() {
  console.log(`\n=== INICIANDO INTEGRAÇÃO DE HUNTER X HUNTER (${HXH_CHARACTERS.length} PERSONAGENS) ===\n`);

  let success = 0;
  const missing = [];

  for (let i = 0; i < HXH_CHARACTERS.length; i++) {
    const char = HXH_CHARACTERS[i];
    const out = path.join(avatarsDir, `${char.id}.png`);
    const wikiTitle = char.wikiTitle || char.name;

    console.log(`[${i + 1}/${HXH_CHARACTERS.length}] Processando ${char.name} (${char.id}) [Wiki: ${wikiTitle}]...`);

    let imageUrl = await fetchWikiThumbnail(wikiTitle);
    if (!imageUrl) {
      console.warn(`   ⚠️ Imagem não encontrada para ${char.name}`);
      missing.push({ id: char.id, name: char.name, wikiTitle });
      continue;
    }

    try {
      const buf = await downloadBuffer(imageUrl);
      await processAvatar(buf, out);
      console.log(`   ✓ Avatar salvo em: ${char.id}.png`);
      success++;
    } catch (err) {
      console.error(`   ❌ Falha ao processar avatar de ${char.name}:`, err.message);
      missing.push({ id: char.id, name: char.name, wikiTitle, error: err.message });
    }

    await new Promise(r => setTimeout(r, 80));
  }

  const clean = HXH_CHARACTERS.map(c => {
    const { wikiTitle, ...cleanChar } = c;
    return cleanChar;
  });

  fs.writeFileSync(charactersJsonPath, JSON.stringify(clean, null, 2), 'utf8');
  console.log(`\n=== RESULTADO: ${clean.length} personagens salvos em ${charactersJsonPath} (${success} avatares) ===\n`);

  if (missing.length > 0) {
    console.log('Avisos:', missing);
  }
}

buildHxH().catch(console.error);
