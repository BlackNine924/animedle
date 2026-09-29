import sharp from 'sharp';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';

const SRC = 'C:\\Users\\User\\Downloads\\ANIMEDLE\\Cards';
const DEST_PUBLIC = 'public/cards';
const DEST_DOWNLOADS = 'C:\\Users\\User\\Downloads\\ANIMEDLE\\Cards_Padronizados';

mkdirSync(DEST_PUBLIC, { recursive: true });
mkdirSync(DEST_DOWNLOADS, { recursive: true });

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

const TARGET_FRAME_W = 914;
const TARGET_FRAME_H = 1424;
const CANVAS_W = 1024;
const CANVAS_H = 1536;
const LEFT_PAD = Math.floor((CANVAS_W - TARGET_FRAME_W) / 2); // 55px
const TOP_PAD = Math.floor((CANVAS_H - TARGET_FRAME_H) / 2);  // 56px

async function processCard(srcName, slug) {
  const srcPath = join(SRC, srcName);
  const destPublic = join(DEST_PUBLIC, `${slug}.png`);
  const destDownloads = join(DEST_DOWNLOADS, srcName);

  if (!existsSync(srcPath)) {
    console.warn(`[MISSING] ${srcName}`);
    return false;
  }

  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });

  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx] > 32 || data[idx+1] > 32 || data[idx+2] > 32) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Fallback if not detected properly
  if (minX >= maxX || minY >= maxY) {
    minX = 0; maxX = info.width - 1; minY = 0; maxY = info.height - 1;
  }

  const frameW = maxX - minX + 1;
  const frameH = maxY - minY + 1;

  // Extract the exact frame and scale to the standard 914x1424 frame size
  const extractedFrame = await sharp(srcPath)
    .extract({ left: minX, top: minY, width: frameW, height: frameH })
    .resize(TARGET_FRAME_W, TARGET_FRAME_H, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
    .toBuffer();

  // Composite onto 1024x1536 transparent canvas
  const canvasBuffer = await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: extractedFrame, left: LEFT_PAD, top: TOP_PAD }])
  .raw()
  .toBuffer({ resolveWithObject: true });

  const cData = canvasBuffer.data;
  const cWidth = canvasBuffer.info.width;
  const cHeight = canvasBuffer.info.height;

  // Clear outer corners with flood-fill
  const visited = new Uint8Array(cWidth * cHeight);
  const queue = [];

  function add(x, y) {
    const idx = y * cWidth + x;
    if (!visited[idx]) {
      visited[idx] = 1;
      queue.push(x, y);
    }
  }

  // Seed outer margins (anything outside the frame bounds)
  for (let x = 0; x < cWidth; x++) {
    add(x, 0);
    add(x, cHeight - 1);
  }
  for (let y = 0; y < cHeight; y++) {
    add(0, y);
    add(cWidth - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const ci = (cy * cWidth + cx) * 4;
    const r = cData[ci], g = cData[ci+1], b = cData[ci+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    // Stop at frame glowing border
    if (lum < 35) {
      if (cx > 0) add(cx - 1, cy);
      if (cx < cWidth - 1) add(cx + 1, cy);
      if (cy > 0) add(cx, cy - 1);
      if (cy < cHeight - 1) add(cx, cy + 1);
    }
  }

  for (let i = 0; i < cWidth * cHeight; i++) {
    if (visited[i]) {
      const ci = i * 4;
      const r = cData[ci], g = cData[ci+1], b = cData[ci+2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum < 20) {
        cData[ci + 3] = 0;
      } else {
        cData[ci + 3] = Math.min(255, Math.round(((lum - 20) / 15) * 255));
      }
    }
  }

  const finalPng = await sharp(cData, { raw: { width: cWidth, height: cHeight, channels: 4 } })
    .png({ quality: 100, compressionLevel: 6 })
    .toBuffer();

  // Save to public/cards
  await sharp(finalPng).toFile(destPublic);
  // Also save to Downloads/Cards_Padronizados
  await sharp(finalPng).toFile(destDownloads);

  console.log(`[OK] ${srcName} -> ${slug}.png (Frame: ${frameW}x${frameH} -> ${TARGET_FRAME_W}x${TARGET_FRAME_H})`);
  return true;
}

async function main() {
  console.log(`Starting standardization of all ${CARD_MAP.length} cards...`);
  console.log(`Standard frame: ${TARGET_FRAME_W}x${TARGET_FRAME_H} inside ${CANVAS_W}x${CANVAS_H} canvas.`);
  let count = 0;
  for (const [srcName, slug] of CARD_MAP) {
    await processCard(srcName, slug);
    count++;
  }
  console.log(`\nSuccessfully processed and standardized all ${count} cards!`);
}

main().catch(err => {
  console.error('Error during card standardization:', err);
  process.exit(1);
});
