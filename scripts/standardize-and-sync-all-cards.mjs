import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirCards = 'C:/Users/User/Downloads/ANIMEDLE/Cards';
const dirPublic = 'public/cards';
const dirDownloadsPadronizados = 'C:/Users/User/Downloads/ANIMEDLE/Cards_Padronizados';

fs.mkdirSync(dirPublic, { recursive: true });
fs.mkdirSync(dirDownloadsPadronizados, { recursive: true });

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

const TARGET_FRAME_W = 1016;
const TARGET_FRAME_H = 1532;
const CANVAS_W = 1024;
const CANVAS_H = 1536;
const POS_X = 4;
const POS_Y = 2;

function norm(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}

const filesInDir = fs.readdirSync(dirCards);

async function standardizeCard(srcPath, slug, displayName) {
  const destPublicPng = path.join(dirPublic, `${slug}.png`);
  const destPublicWebp = path.join(dirPublic, `${slug}.webp`);
  const destDownloads = path.join(dirDownloadsPadronizados, displayName);

  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });

  let minY = info.height, maxY = 0;
  for (let y = 0; y < info.height; y++) {
    let nonBlackCount = 0;
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx] > 32 || data[idx+1] > 32 || data[idx+2] > 32) nonBlackCount++;
    }
    if (nonBlackCount >= 15) {
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  let minX = info.width, maxX = 0;
  for (let x = 0; x < info.width; x++) {
    let nonBlackCount = 0;
    for (let y = 0; y < info.height; y++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx] > 32 || data[idx+1] > 32 || data[idx+2] > 32) nonBlackCount++;
    }
    if (nonBlackCount >= 15) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }

  if (minX >= maxX || minY >= maxY) {
    minX = 0; maxX = info.width - 1; minY = 0; maxY = info.height - 1;
  }

  const frameW = maxX - minX + 1;
  const frameH = maxY - minY + 1;

  const extractedFrame = await sharp(srcPath)
    .extract({ left: minX, top: minY, width: frameW, height: frameH })
    .resize(TARGET_FRAME_W, TARGET_FRAME_H, { fit: 'fill', kernel: 'lanczos3' })
    .toBuffer();

  const canvas = await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: extractedFrame, left: POS_X, top: POS_Y }])
  .raw()
  .toBuffer({ resolveWithObject: true });

  const cData = canvas.data;
  const cW = CANVAS_W;
  const cH = CANVAS_H;

  const visited = new Uint8Array(cW * cH);
  const queue = [];

  function add(x, y) {
    const idx = y * cW + x;
    if (!visited[idx]) {
      visited[idx] = 1;
      queue.push(x, y);
    }
  }

  for (let x = 0; x < cW; x++) {
    add(x, 0);
    add(x, cH - 1);
  }
  for (let y = 0; y < cH; y++) {
    add(0, y);
    add(cW - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const ci = (cy * cW + cx) * 4;
    const r = cData[ci], g = cData[ci+1], b = cData[ci+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (lum <= 40 || (r < 45 && g < 45 && b < 45)) {
      cData[ci + 3] = 0;
      if (cx > 0) add(cx - 1, cy);
      if (cx < cW - 1) add(cx + 1, cy);
      if (cy > 0) add(cx, cy - 1);
      if (cy < cH - 1) add(cx, cy + 1);
    }
  }

  const finalPng = await sharp(cData, { raw: { width: cW, height: cH, channels: 4 } })
    .png({ quality: 95, compressionLevel: 7 })
    .toBuffer();

  const finalWebp = await sharp(cData, { raw: { width: cW, height: cH, channels: 4 } })
    .webp({ quality: 85, effort: 5 })
    .toBuffer();

  await sharp(finalPng).toFile(destPublicPng);
  await sharp(finalWebp).toFile(destPublicWebp);
  await sharp(finalPng).toFile(destDownloads);
}

async function run() {
  console.log(`Starting standardization of ALL ${CARD_MAP.length} cards to:`);
  console.log(`Canvas: ${CANVAS_W}x${CANVAS_H} | Frame: ${TARGET_FRAME_W}x${TARGET_FRAME_H} | PNG + WebP`);

  let count = 0;
  for (const [name, slug] of CARD_MAP) {
    const match = filesInDir.find(f => norm(f) === norm(name));
    if (!match) {
      console.error(`[ERROR NOT FOUND] ${name}`);
      continue;
    }

    const srcPath = path.join(dirCards, match);
    await standardizeCard(srcPath, slug, name);
    count++;
    if (count % 10 === 0 || count === CARD_MAP.length) {
      console.log(`[${count}/${CARD_MAP.length}] Standardized & synced PNG+WebP!`);
    }
  }
  console.log(`\nSUCCESS! All ${count} cards processed cleanly.`);
}

run().catch(console.error);
