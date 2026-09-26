import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'dandadan');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Mapeamento dos 46 personagens com os títulos de página exatos no Dandadan Fandom Wiki
// ou URLs diretas de infobox de alta resolução
const CHARACTER_IMAGE_SOURCES = {
  'momo-ayase': { title: 'Momo Ayase' },
  'ken-takakura': { title: 'Okarun' },
  'seiko-ayase': { title: 'Seiko Ayase' },
  'turbo-vovó': { title: 'Turbo Granny' },
  'aira-shiratori': { title: 'Aira Shiratori' },
  'jin-enjoji': { title: 'Jiji' },
  'olho-maligno': { title: 'Evil Eye' },
  'vamola': { title: 'Bamora' },
  'kinta-sakata': { title: 'Kinta Sakata' },
  'rin-sawaki': { title: 'Rin Sawaki' },
  'unji-zuma': { title: 'Unji Zuma' },
  'daiki-hasegawa': { title: 'Masamichi Vega' },
  'manjiro': { title: 'Manjiro' },
  'chiquitita': { title: 'Chiquitita' },
  'pejin': { title: 'Mantisian' },
  'taro': { title: 'Taro' },
  'hana': { title: 'Hana' },
  'banga': { title: 'Banga' },
  'mai-kawabanga': { title: 'Mai Kawabanga' },
  'hakuto': { title: 'Female Unji Gang Member' },
  'suda-ko': { title: 'Suda Ko' },
  'futa-zuma': { title: 'Futa Zuma' },
  'koki-yukishiro': { title: 'Koki Yukishiro' },
  'alice-yukishiro': { title: 'Alice Yukishiro' },
  'acrobatic-silky': { title: 'Acrobatic Silky' },
  'kashima-reiko': { title: 'Reiko Kashima' },
  'onbusuman': { 
    directUrl: 'https://static.wikia.nocookie.net/dandadan/images/4/4b/Onbusuman_Infobox.png/revision/latest?cb=20241226050913' 
  },
  'guarda-chuva-youkai': { title: 'Fairy-Tale Card' },
  'typhoon-human': { title: 'Typhoon Human' },
  'guardiao-gelo-fogo': { title: 'Ice Flame Guardian Spirit' },
  'entidade-seis-maldicoes': { title: 'Lord of the Flies' },
  'rokuro-serpo': { title: 'Rokuro Serpo' },
  'serpoianos': { title: 'Serpo' },
  'flatwoods-monster': { title: 'Flatwoods Monster' },
  'nessie': { title: 'Nessie' },
  'dover-demon': { 
    directUrl: 'https://static.wikia.nocookie.net/dandadan/images/c/ca/Dover_Demon_Strong_Style_Twenty-Four_%28Anime%29.png/revision/latest?cb=20241128184453' 
  },
  'kur-emperor': { 
    directUrl: 'https://static.wikia.nocookie.net/dandadan/images/e/e1/Kur.png/revision/latest?cb=20230917065855' 
  },
  'clown-dragon-knight': { title: 'Clown Dragon Knight' },
  'coat-dragon-knight': { title: 'Coat Dragon Knight' },
  'diamond-dragon-knight': { title: 'Diamond Earring Dragon Knight' },
  'saint-germain': { title: 'Saint-Germain' },
  'natsu-kito': { title: 'Kito Family' },
  'jugenmu-kito': { title: 'Jugenmu Kito' },
  'tsubame-kito': { title: 'Tsubame' },
  'tsuchinoko': { title: 'Tsuchinoko (Mongolian Death Worm)' },
  'cursed-house-child': { title: 'Cursed House Child' }
};

async function fetchWikiThumbnail(title) {
  const url = `https://dandadan.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'AnimedleBot/1.0 (Windows NT 10.0; Win64; x64)' }
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

  // Se a imagem tiver proporção vertical (corpo inteiro ou 3/4), focar o terço superior no rosto
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
    // Imagem horizontal (ex: cena de batalha ou grupo), focar a região central/rosto
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
    // Imagem quadrada ou proporção equilibrada
    await sharp(buffer)
      .resize(240, 240, { fit: 'cover', position: 'center' })
      .png({ quality: 90 })
      .toFile(outputPath);
  }
}

async function buildAvatars() {
  console.log(`\n=== INICIANDO GERAÇÃO DE AVATARES DE DAN DA DAN (46 PERSONAGENS) ===\n`);

  const characters = JSON.parse(
    fs.readFileSync(path.join(rootDir, 'src', 'data', 'animes', 'dandadan', 'characters.json'), 'utf-8')
  );

  let successCount = 0;

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const outputPath = path.join(avatarsDir, `${char.id}.png`);
    const sourceInfo = CHARACTER_IMAGE_SOURCES[char.id];

    console.log(`[${i + 1}/${characters.length}] Processando ${char.name} (${char.id})...`);

    let imageUrl = sourceInfo?.directUrl || null;
    if (!imageUrl && sourceInfo?.title) {
      imageUrl = await fetchWikiThumbnail(sourceInfo.title);
    }
    if (!imageUrl) {
      imageUrl = await fetchWikiThumbnail(char.name);
    }

    if (!imageUrl) {
      console.warn(`   ⚠️ URL de imagem não encontrada para ${char.name}`);
      continue;
    }

    try {
      const res = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://dandadan.fandom.com/'
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
