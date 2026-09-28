import sharp from 'sharp';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

const SRC_DIR = 'C:\\Users\\User\\Downloads\\ANIMEDLE\\Cards';
const DEST_DIR = 'public/cards';

// Import mapping from copy-home-assets.mjs
const cards = [
  ['Akame Ga Kill Card.png',                     'akame-ga-kill.png'],
  ['Akira Card.png',                             'akira.png'],
  ['Assassination Classroom Card.png',           'assassination-classroom.png'],
  ['Attack On Titan Card.png',                   'attack-on-titan.png'],
  ['Berserk Card.png',                           'berserk.png'],
  ['Black Clover Card.png',                      'black-clover.png'],
  ['Bleach Card.png',                            'bleach.png'],
  ['Blue Lock Card.png',                         'blue-lock.png'],
  ['Boku No Hero Card.png',                      'my-hero-academia.png'],
  ['Bungo Stray Dogs Card.png',                  'bungo-stray-dogs.png'],
  ['Cavaleiros do Zodíaco Card.png',             'cavaleiros-do-zodiaco.png'],
  ['Chainsaw Man Card.png',                      'chainsaw-man.png'],
  ['Classroom of The Elite Card.png',            'classroom-of-the-elite.png'],
  ['Code Geas Card.png',                         'code-geass.png'],
  ['Cowboy Bebop Card.png',                      'cowboy-bebop.png'],
  ['Cyberpunk Edgerunners Card.png',             'cyberpunk-edgerunners.png'],
  ['Dan da Dan Card.png',                        'dandadan.png'],
  ['Death Note Card.png',                        'death-note.png'],
  ['Demon Slayer Card.png',                      'demon-slayer.png'],
  ['Digimon Card.png',                           'digimon.png'],
  ['Dr. Stone Card.png',                         'dr-stone.png'],
  ['Dragon Ball Card.png',                       'dragon-ball.png'],
  ['Fairy Tail Card.png',                        'fairy-tail.png'],
  ['Fate Card.png',                              'fate.png'],
  ['Fire Force Card.png',                        'fire-force.png'],
  ['Fullmetal Alchemist Card.png',               'fullmetal-alchemist.png'],
  ['Gachiakuta Card.png',                        'gachiakuta.png'],
  ['Gintama Card.png',                           'gintama.png'],
  ['Gurren Lagann Card.png',                     'gurren-lagann.png'],
  ['Haikyuu Card.png',                           'haikyuu.png'],
  ['Hells Paradise Card.png',                    'hells-paradise.png'],
  ['Hellsing Ultimate Card.png',                 'hellsing-ultimate.png'],
  ['Hunter x Hunter Card.png',                   'hunter-x-hunter.png'],
  ['Inuyasha Card.png',                          'inuyasha.png'],
  ["Jojo's Bizarre Adventure Card.png",          'jojos-bizarre-adventure.png'],
  ['Jujutsu Kaisen Card.png',                    'jujutsu-kaisen.png'],
  ['Kaiju No.8 Card.png',                        'kaiju-no-8.png'],
  ['Kill La Kill Card.png',                      'kill-la-kill.png'],
  ['Kobayashi-san Card.png',                     'kobayashi-san.png'],
  ['Konosuba Card.png',                          'konosuba.png'],
  ['Kuroku No Basket Card.png',                  'kuroko-no-basket.png'],
  ['Mashle Card.png',                            'mashle.png'],
  ['Mob Psycho 100 Card.png',                    'mob-psycho-100.png'],
  ['Monster Card.png',                           'monster.png'],
  ['Mushoku Tensei Card.png',                    'mushoku-tensei.png'],
  ['Nanatsu No Taizai Card.png',                 'nanatsu-no-taizai.png'],
  ['Naruto Card.png',                            'naruto.png'],
  ['Neon Genesis Evangelion Card.png',           'neon-genesis-evangelion.png'],
  ['No Game No Life Card.png',                   'no-game-no-life.png'],
  ['Noragami Card.png',                          'noragami.png'],
  ['One Piece Card.png',                         'one-piece.png'],
  ['One Punch Man Card.png',                     'one-punch-man.png'],
  ['Oshi No Ko Card.png',                        'oshi-no-ko.png'],
  ['Overlord Card.png',                          'overlord.png'],
  ['Parasyte Card.png',                          'parasyte.png'],
  ['Pokémon Card.png',                           'pokemon.png'],
  ['Record of Ragnarok Card.png',                'record-of-ragnarok.png'],
  ['ReZero Card.png',                            're-zero.png'],
  ['Romance Card.png',                           'romance.png'],
  ['Sailor Moon Card.png',                       'sailor-moon.png'],
  ['Sakamoto Days Card.png',                     'sakamoto-days.png'],
  ['Samurai X Card.png',                         'samurai-x.png'],
  ['Shangri-La Frontier Card.png',               'shangri-la-frontier.png'],
  ['Solo Leveling Card.png',                     'solo-leveling.png'],
  ['Soul Eater Card.png',                        'soul-eater.png'],
  ['Sousou No Frieren Card.png',                 'frieren.png'],
  ['Spy x Family Card.png',                      'spy-x-family.png'],
  ['SteinsGate Card.png',                        'steins-gate.png'],
  ['Sword Art Online Card.png',                  'sword-art-online.png'],
  ['Tensei Shitara Slime Datta Ken Card.png',    'tensei-shitara-slime-datta-ken.png'],
  ['The Apothecary Diaries Card.png',            'the-apothecary-diaries.png'],
  ['The Promissed Neverland Card.png',           'the-promised-neverland.png'],
  ['Tokyo Ghoul Card.png',                       'tokyo-ghoul.png'],
  ['Tokyo Revergers Card.png',                   'tokyo-revengers.png'],
  ['Vinland Saga Card.png',                      'vinland-saga.png'],
  ['Violet Evergarden Card.png',                 'violet-evergarden.png'],
  ['Wind Breaker Card.png',                      'wind-breaker.png'],
  ['Witch Hat Atelier Card.png',                 'witch-hat-atelier.png'],
  ['Yu Yu Hakusho Card.png',                     'yu-yu-hakusho.png'],
  ['Yu-Gi-Oh Card.png',                          'yu-gi-oh.png'],
];

async function processAll() {
  console.log(`Processing and standardizing ${cards.length} cards to 800x1200 (2:3 aspect ratio)...`);

  let count = 0;
  for (const [srcName, destName] of cards) {
    const srcPath = join(SRC_DIR, srcName);
    const destPath = join(DEST_DIR, destName);

    if (!existsSync(srcPath)) {
      console.warn(`[WARN] Not found: ${srcPath}`);
      continue;
    }

    const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });

    // Baseline dark background from top-left (average of 5x5)
    let bgR = 0, bgG = 0, bgB = 0;
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const i = (y * info.width + x) * 3;
        bgR += data[i]; bgG += data[i+1]; bgB += data[i+2];
      }
    }
    bgR = Math.round(bgR / 25);
    bgG = Math.round(bgG / 25);
    bgB = Math.round(bgB / 25);

    function isContent(r, g, b) {
      const diff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      return diff > 30 || lum > 40;
    }

    // Top
    let top = 0;
    for (let y = 0; y < Math.floor(info.height * 0.15); y++) {
      let c = 0;
      for (let x = Math.floor(info.width * 0.2); x < Math.floor(info.width * 0.8); x += 4) {
        const i = (y * info.width + x) * 3;
        if (isContent(data[i], data[i+1], data[i+2])) c++;
      }
      if (c > 5) { top = Math.max(0, y - 2); break; }
    }

    // Bottom
    let bottom = info.height;
    for (let y = info.height - 1; y > Math.floor(info.height * 0.85); y--) {
      let c = 0;
      for (let x = Math.floor(info.width * 0.2); x < Math.floor(info.width * 0.8); x += 4) {
        const i = (y * info.width + x) * 3;
        if (isContent(data[i], data[i+1], data[i+2])) c++;
      }
      if (c > 5) { bottom = Math.min(info.height, y + 2); break; }
    }

    // Left
    let left = 0;
    for (let x = 0; x < Math.floor(info.width * 0.15); x++) {
      let c = 0;
      for (let y = Math.floor(info.height * 0.2); y < Math.floor(info.height * 0.8); y += 4) {
        const i = (y * info.width + x) * 3;
        if (isContent(data[i], data[i+1], data[i+2])) c++;
      }
      if (c > 5) { left = Math.max(0, x - 2); break; }
    }

    // Right
    let right = info.width;
    for (let x = info.width - 1; x > Math.floor(info.width * 0.85); x--) {
      let c = 0;
      for (let y = Math.floor(info.height * 0.2); y < Math.floor(info.height * 0.8); y += 4) {
        const i = (y * info.width + x) * 3;
        if (isContent(data[i], data[i+1], data[i+2])) c++;
      }
      if (c > 5) { right = Math.min(info.width, x + 2); break; }
    }

    const cutW = right - left;
    const cutH = bottom - top;

    // Crop the outer black margin and resize to standardized 800x1200
    await sharp(srcPath)
      .extract({ left, top, width: cutW, height: cutH })
      .resize(800, 1200, {
        fit: 'cover',
        position: 'center',
      })
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(destPath);

    count++;
  }

  console.log(`Successfully processed and standardized ${count} cards to 800x1200!`);
}

processAll().catch(console.error);
