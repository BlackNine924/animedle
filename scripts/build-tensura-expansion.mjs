import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'tensei-shitara-slime-datta-ken');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Mapeamento dos 65 personagens com os títulos de página exatos no Tensura Fandom Wiki
const TENSURA_TITLE_MAP = {
  'rimuru-tempest': 'Rimuru Tempest',
  'veldora-tempest': 'Veldora Tempest',
  'benimaru': 'Benimaru',
  'shuna': 'Shuna',
  'shion': 'Shion',
  'souei': 'Souei',
  'hakuro': 'Hakurou',
  'kurobe': 'Kurobe',
  'ranga': 'Ranga',
  'gobta': 'Gobta',
  'rigurd': 'Rigurd',
  'geld': 'Geld Junior',
  'orc-disaster-geld': 'Geld Senior',
  'gabiru': 'Gabiru',
  'souka': 'Souka',
  'diablo': 'Diablo',
  'zegion': 'Zegion',
  'apito': 'Apito',
  'kumara': 'Kumara',
  'adalman': 'Adalmann',
  'albert': 'Albert',
  'wenti': 'Venti',
  'beretta': 'Beretta',
  'treyni': 'Treyni',
  'testarossa': 'Testarossa',
  'ultima': 'Ultima',
  'carrera': 'Carrera',
  'moss': 'Moss',
  'veyron': 'Veyron',
  'esprit': 'Esprit',
  'guy-crimson': 'Guy Crimson',
  'milim-nava': 'Milim Nava',
  'ramiris': 'Ramiris',
  'luminous-valentine': 'Luminous Twilight Valentine',
  'leon-cromwell': 'Leon Cromwell',
  'dagruel': 'Dagruel',
  'dino': 'Dino',
  'carrion': 'Carrion',
  'frey': 'Frey',
  'clayman': 'Clayman',
  'yuuki-kagurazaka': 'Yuuki Kagurazaka',
  'laplace': 'Laplace',
  'tear': 'Tear',
  'footman': 'Footman',
  'mariabell-rosso': 'Mariabell Rosso',
  'granbell-rosso': 'Granbell Rosso',
  'hinata-sakaguchi': 'Hinata Sakaguchi',
  'roy-valentin': 'Roy Valentin',
  'louis-valentin': 'Louis Valentin',
  'arnaud-bauman': 'Arnaud Bauman',
  'velgrynd': 'Velgrynd',
  'velzard': 'Velzard',
  'chloe-aubert': 'Chloe Aubert',
  'shizue-izawa': 'Shizu',
  'gazel-dwargo': 'Gazel Dwargo',
  'kaijin': 'Kaijin',
  'youm-farmenas': 'Youm Farmenas',
  'myuran': 'Mjur Farmenas',
  'masayuki-honjou': 'Masayuki Rudra Nam Ul Nasca',
  'albis': 'Albis',
  'suphia': 'Suphia',
  'phobio': 'Phobio',
  'eren': 'Elyun Grimwald',
  'kabal': 'Kaval',
  'gido': 'Gido'
};

async function fetchWikiThumbnail(title) {
  const url = `https://tensura.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'AnimedleBot/1.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://tensura.fandom.com/'
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

  // Imagem vertical (estilo ilustração LN de corpo inteiro / 3/4): focar estritamente o rosto no topo
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
      .png({ quality: 90 })
      .toFile(outputPath);
  } else if (width > height * 1.25) {
    // Imagem horizontal: centralizar corte no quadrado
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
    // Imagem equilibrada / quadrada
    await sharp(buffer)
      .resize(240, 240, { fit: 'cover', position: 'center' })
      .png({ quality: 90 })
      .toFile(outputPath);
  }
}

async function buildAvatars() {
  console.log(`\n=== INICIANDO GERAÇÃO DE AVATARES DE TENSURA (65 PERSONAGENS) ===\n`);

  const characters = JSON.parse(
    fs.readFileSync(path.join(rootDir, 'src', 'data', 'animes', 'tensei-shitara-slime-datta-ken', 'characters.json'), 'utf-8')
  );

  let successCount = 0;

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const outputPath = path.join(avatarsDir, `${char.id}.png`);
    const wikiTitle = TENSURA_TITLE_MAP[char.id] || char.name;

    console.log(`[${i + 1}/${characters.length}] Processando ${char.name} (${char.id}) [Wiki: ${wikiTitle}]...`);

    const imageUrl = await fetchWikiThumbnail(wikiTitle);

    if (!imageUrl) {
      console.warn(`   ⚠️ URL de imagem não encontrada para ${char.name} (${wikiTitle})`);
      continue;
    }

    try {
      const res = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://tensura.fandom.com/'
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

    // Intervalo breve para requisições respeitosas à API
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n=== PROCESSO CONCLUÍDO: ${successCount} de ${characters.length} avatares criados! ===\n`);
}

buildAvatars().catch(console.error);
