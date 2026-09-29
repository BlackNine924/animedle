import sharp from 'sharp';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

const SRC = 'C:\\Users\\User\\Downloads\\ANIMEDLE\\Cards';
const DEST = 'public/cards';

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

async function processCard(srcName, slug) {
  const srcPath = join(SRC, srcName);
  const destPath = join(DEST, `${slug}.png`);

  if (!existsSync(srcPath)) {
    console.warn(`[MISSING] ${srcName}`);
    return false;
  }

  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });

  let minX = 0, maxX = info.width - 1, minY = 0, maxY = info.height - 1;

  // If card is not already 1024x1536, detect black margins
  if (info.width !== 1024 || info.height !== 1536) {
    // Left margin
    for (let x = 0; x < info.width * 0.25; x++) {
      let nonBlack = 0;
      for (let y = 0; y < info.height; y++) {
        const idx = (y * info.width + x) * info.channels;
        if (data[idx] > 28 || data[idx+1] > 28 || data[idx+2] > 28) nonBlack++;
      }
      if (nonBlack > info.height * 0.08) {
        minX = Math.max(0, x - 2);
        break;
      }
    }

    // Right margin
    for (let x = info.width - 1; x >= info.width * 0.75; x--) {
      let nonBlack = 0;
      for (let y = 0; y < info.height; y++) {
        const idx = (y * info.width + x) * info.channels;
        if (data[idx] > 28 || data[idx+1] > 28 || data[idx+2] > 28) nonBlack++;
      }
      if (nonBlack > info.height * 0.08) {
        maxX = Math.min(info.width - 1, x + 2);
        break;
      }
    }

    // Top margin
    for (let y = 0; y < info.height * 0.2; y++) {
      let nonBlack = 0;
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * info.channels;
        if (data[idx] > 28 || data[idx+1] > 28 || data[idx+2] > 28) nonBlack++;
      }
      if (nonBlack > info.width * 0.08) {
        minY = Math.max(0, y - 2);
        break;
      }
    }

    // Bottom margin
    for (let y = info.height - 1; y >= info.height * 0.8; y--) {
      let nonBlack = 0;
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * info.channels;
        if (data[idx] > 28 || data[idx+1] > 28 || data[idx+2] > 28) nonBlack++;
      }
      if (nonBlack > info.width * 0.08) {
        maxY = Math.min(info.height - 1, y + 2);
        break;
      }
    }
  }

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  // Crop to the detected frame and resize to exact 1024x1536
  let pipeline = sharp(srcPath);
  if (cropW < info.width || cropH < info.height) {
    pipeline = pipeline.extract({ left: minX, top: minY, width: cropW, height: cropH });
  }

  // Resize to 1024x1536 (cover ensures full fill without any black bars)
  const resized = await pipeline
    .resize(1024, 1536, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rData = resized.data;
  const rWidth = resized.info.width;
  const rHeight = resized.info.height;
  const rChannels = resized.info.channels;

  // Create RGBA buffer and flood-fill transparency on the 4 corner zones
  const rgba = Buffer.alloc(rWidth * rHeight * 4);
  const visited = new Uint8Array(rWidth * rHeight);
  const queue = [];

  function add(x, y) {
    const idx = y * rWidth + x;
    if (!visited[idx]) {
      visited[idx] = 1;
      queue.push(x, y);
    }
  }

  // Corner boundaries (outer 10% width, 7% height)
  const cornerW = Math.floor(rWidth * 0.10);
  const cornerH = Math.floor(rHeight * 0.07);

  for (let x = 0; x < cornerW; x++) {
    add(x, 0);
    add(rWidth - 1 - x, 0);
    add(x, rHeight - 1);
    add(rWidth - 1 - x, rHeight - 1);
  }
  for (let y = 0; y < cornerH; y++) {
    add(0, y);
    add(0, rHeight - 1 - y);
    add(rWidth - 1, y);
    add(rWidth - 1, rHeight - 1 - y);
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const inCornerZone =
      (cx < cornerW && (cy < cornerH || cy > rHeight - 1 - cornerH)) ||
      (cx > rWidth - 1 - cornerW && (cy < cornerH || cy > rHeight - 1 - cornerH));

    if (!inCornerZone) continue;

    const ci = (cy * rWidth + cx) * rChannels;
    const r = rData[ci], g = rData[ci+1], b = rData[ci+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (lum < 42) {
      if (cx > 0) add(cx - 1, cy);
      if (cx < rWidth - 1) add(cx + 1, cy);
      if (cy > 0) add(cx, cy - 1);
      if (cy < rHeight - 1) add(cx, cy + 1);
    }
  }

  for (let i = 0; i < rWidth * rHeight; i++) {
    const srcIdx = i * rChannels;
    const destIdx = i * 4;
    rgba[destIdx] = rData[srcIdx];
    rgba[destIdx + 1] = rData[srcIdx + 1];
    rgba[destIdx + 2] = rData[srcIdx + 2];

    if (visited[i]) {
      const r = rData[srcIdx], g = rData[srcIdx+1], b = rData[srcIdx+2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum < 28) {
        rgba[destIdx + 3] = 0; // Transparent
      } else {
        rgba[destIdx + 3] = Math.min(255, Math.round(((lum - 28) / 14) * 255));
      }
    } else {
      rgba[destIdx + 3] = rChannels === 4 ? rData[srcIdx + 3] : 255;
    }
  }

  await sharp(rgba, { raw: { width: rWidth, height: rHeight, channels: 4 } })
    .png({ quality: 100, compressionLevel: 6 })
    .toFile(destPath);

  console.log(`[DONE] ${srcName} -> ${slug}.png (cropped ${cropW}x${cropH} -> 1024x1536)`);
  return true;
}

async function main() {
  console.log('Starting full card standardization and corner transparency...');
  let count = 0;
  for (const [srcName, slug] of CARD_MAP) {
    await processCard(srcName, slug);
    count++;
  }
  console.log(`Finished processing all ${count} cards!`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
