import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirNovos = 'C:/Users/User/Downloads/ANIMEDLE/Novos Card';
const dirCards = 'C:/Users/User/Downloads/ANIMEDLE/Cards';
const dirPublic = 'public/cards';
const dirExport = 'C:/Users/User/Downloads/ANIMEDLE/Cards_Padronizados';

fs.mkdirSync(dirPublic, { recursive: true });
fs.mkdirSync(dirExport, { recursive: true });

const CARD_MAP = [
  ['Akame Ga Kill Card.png',                    'akame-ga-kill'],
  ['Akira Card.png',                            'akira'],
  ['Assassination Classroom Card.png',          'assassination-classroom'],
  ['Attack On Titan Card.png',                  'attack-on-titan'],
  ['Berserk Card.png',                          'berserk'],
  ['Black Clover Card.png',                     'black-clover'],
  ['Bleach Card.png',                           'bleach'],
  ['Blue Lock Card.png',                        'blue-lock'],
  ['Boku No Hero Card.png',                     'my-hero-academia'],
  ['Bungo Stray Dogs Card.png',                 'bungo-stray-dogs'],
  ['Cavaleiros do Zodíaco Card.png',            'cavaleiros-do-zodiaco'],
  ['Chainsaw Man Card.png',                     'chainsaw-man'],
  ['Classroom of The Elite Card.png',           'classroom-of-the-elite'],
  ['Code Geas Card.png',                        'code-geass'],
  ['Cowboy Bebop Card.png',                     'cowboy-bebop'],
  ['Cyberpunk Edgerunners Card.png',            'cyberpunk-edgerunners'],
  ['Dan da Dan Card.png',                       'dandadan'],
  ['Death Note Card.png',                       'death-note'],
  ['Demon Slayer Card.png',                     'demon-slayer'],
  ['Digimon Card.png',                          'digimon'],
  ['Dr. Stone Card.png',                        'dr-stone'],
  ['Dragon Ball Card.png',                      'dragon-ball'],
  ['Fairy Tail Card.png',                       'fairy-tail'],
  ['Fate Card.png',                             'fate'],
  ['Fire Force Card.png',                       'fire-force'],
  ['Fullmetal Alchemist Card.png',              'fullmetal-alchemist'],
  ['Gachiakuta Card.png',                       'gachiakuta'],
  ['Gintama Card.png',                          'gintama'],
  ['Gurren Lagann Card.png',                    'gurren-lagann'],
  ['Haikyuu Card.png',                          'haikyuu'],
  ['Hells Paradise Card.png',                   'hells-paradise'],
  ['Hellsing Card.png',                         'hellsing-ultimate'],
  ['Hunter x Hunter Card.png',                  'hunter-x-hunter'],
  ['Inuyasha Card.png',                         'inuyasha'],
  ["Jojo's Bizarre Adventure Card.png",         'jojos-bizarre-adventure'],
  ['Jujutsu Kaisen Card.png',                   'jujutsu-kaisen'],
  ['Kaiju No.8 Card.png',                       'kaiju-no-8'],
  ['Kill La Kill Card.png',                     'kill-la-kill'],
  ['Kobayashi-san Card.png',                    'kobayashi-san'],
  ['Konosuba Card.png',                         'konosuba'],
  ['Kuroko No Basket Card.png',                 'kuroko-no-basket'],
  ['Mashle Card.png',                           'mashle'],
  ['Mob Psycho 100 Card.png',                   'mob-psycho-100'],
  ['Monster Card.png',                          'monster'],
  ['Mushoku Tensei Card.png',                   'mushoku-tensei'],
  ['Nanatsu No Taizai Card.png',                'nanatsu-no-taizai'],
  ['Naruto Card.png',                           'naruto'],
  ['Neon Genesis Evangelion Card.png',          'neon-genesis-evangelion'],
  ['No Game No Life Card.png',                   'no-game-no-life'],
  ['Noragami Card.png',                         'noragami'],
  ['One Piece Card.png',                        'one-piece'],
  ['One Punch Man Card.png',                    'one-punch-man'],
  ['Oshi No Ko Card.png',                       'oshi-no-ko'],
  ['Overlord Card.png',                         'overlord'],
  ['Parasyte Card.png',                          'parasyte'],
  ['Pokémon Card.png',                          'pokemon'],
  ['Record of Ragnarok Card.png',               'record-of-ragnarok'],
  ['ReZero Card.png',                            're-zero'],
  ['Romance Card.png',                          'romance'],
  ['Sailor Moon Card.png',                       'sailor-moon'],
  ['Sakamoto Days Card.png',                     'sakamoto-days'],
  ['Samurai X Card.png',                         'samurai-x'],
  ['Shangri-La Frontier Card.png',               'shangri-la-frontier'],
  ['Solo Leveling Card.png',                     'solo-leveling'],
  ['Soul Eater Card.png',                        'soul-eater'],
  ['Sousou No Frieren Card.png',                 'frieren'],
  ['Spy x Family Card.png',                      'spy-x-family'],
  ['SteinsGate Card.png',                        'steins-gate'],
  ['Sword Art Online Card.png',                  'sword-art-online'],
  ['Tensei Shitara Slime Datta Ken Card.png',   'tensei-shitara-slime-datta-ken'],
  ['The Apothecary Diaries Card.png',            'the-apothecary-diaries'],
  ['The Promissed Neverland Card.png',          'the-promised-neverland'],
  ['Tokyo Ghoul Card.png',                       'tokyo-ghoul'],
  ['Tokyo Revengers Card.png',                  'tokyo-revengers'],
  ['Vinland Saga Card.png',                      'vinland-saga'],
  ['Violet Evergarden Card.png',                 'violet-evergarden'],
  ['Wind Breaker Card.png',                      'wind-breaker'],
  ['Witch Hat Atelier Card.png',                'witch-hat-atelier'],
  ['Yu Yu Hakusho Card.png',                     'yu-yu-hakusho'],
  ['Yu-Gi-Oh Card.png',                          'yu-gi-oh'],
];

const novosFiles = fs.readdirSync(dirNovos);
const cardsFiles = fs.readdirSync(dirCards);

async function processSingleCard(srcPath, slug, isNovos) {
  const destPublic = path.join(dirPublic, `${slug}.png`);
  const destExport = path.join(dirExport, `${slug}.png`);

  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
  
  // Create RGBA buffer
  const rgba = Buffer.alloc(info.width * info.height * 4);
  const visited = new Uint8Array(info.width * info.height);
  const queue = [];

  function add(x, y) {
    const idx = y * info.width + x;
    if (!visited[idx]) {
      visited[idx] = 1;
      queue.push(x, y);
    }
  }

  // Flood fill corner zones
  const cornerW = Math.floor(info.width * 0.12);
  const cornerH = Math.floor(info.height * 0.08);

  for (let x = 0; x < cornerW; x++) {
    add(x, 0);
    add(info.width - 1 - x, 0);
    add(x, info.height - 1);
    add(info.width - 1 - x, info.height - 1);
  }
  for (let y = 0; y < cornerH; y++) {
    add(0, y);
    add(0, info.height - 1 - y);
    add(info.width - 1, y);
    add(info.width - 1, info.height - 1 - y);
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const inCornerZone = (cx < cornerW && (cy < cornerH || cy > info.height - 1 - cornerH)) ||
                         (cx > info.width - 1 - cornerW && (cy < cornerH || cy > info.height - 1 - cornerH));
    if (!inCornerZone) continue;

    const ci = (cy * info.width + cx) * info.channels;
    const r = data[ci], g = data[ci+1], b = data[ci+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (lum < 38) {
      if (cx > 0) add(cx - 1, cy);
      if (cx < info.width - 1) add(cx + 1, cy);
      if (cy > 0) add(cx, cy - 1);
      if (cy < info.height - 1) add(cx, cy + 1);
    }
  }

  for (let i = 0; i < info.width * info.height; i++) {
    const srcIdx = i * info.channels;
    const destIdx = i * 4;
    rgba[destIdx] = data[srcIdx];
    rgba[destIdx + 1] = data[srcIdx + 1];
    rgba[destIdx + 2] = data[srcIdx + 2];

    if (visited[i]) {
      const r = data[srcIdx], g = data[srcIdx+1], b = data[srcIdx+2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum < 24) {
        rgba[destIdx + 3] = 0;
      } else {
        rgba[destIdx + 3] = Math.min(255, Math.round(((lum - 24) / 14) * 255));
      }
    } else {
      rgba[destIdx + 3] = info.channels === 4 ? data[srcIdx + 3] : 255;
    }
  }

  const outBuffer = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  await sharp(outBuffer).toFile(destPublic);
  await sharp(outBuffer).toFile(destExport);
}

async function main() {
  console.log('Processing all 80 cards with prioritized Novos Card...');
  let novosCount = 0;
  let cardsCount = 0;

  for (const [name, slug] of CARD_MAP) {
    const fileInNovos = novosFiles.find(f => f.toLowerCase() === name.toLowerCase());
    const fileInCards = cardsFiles.find(f => f.toLowerCase() === name.toLowerCase());

    if (fileInNovos) {
      const srcPath = path.join(dirNovos, fileInNovos);
      await processSingleCard(srcPath, slug, true);
      novosCount++;
      console.log(`[NOVOS CARD ${novosCount}/42] ${name} -> ${slug}.png`);
    } else if (fileInCards) {
      const srcPath = path.join(dirCards, fileInCards);
      await processSingleCard(srcPath, slug, false);
      cardsCount++;
      console.log(`[CARDS ${cardsCount}/38] ${name} -> ${slug}.png`);
    } else {
      console.error(`[ERROR] Missing card: ${name}`);
    }
  }

  console.log(`\nCompleted successfully!`);
  console.log(`Updated from Novos Card: ${novosCount}`);
  console.log(`Retained from Cards: ${cardsCount}`);
  console.log(`Total: ${novosCount + cardsCount}/80`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
