/**
 * export-and-upscale-cards.mjs
 *
 * Reads each card from C:\Users\User\Downloads\ANIMEDLE\Cards,
 * fits it inside a 1024x1536 canvas (no distortion, no crop, no quality loss),
 * and copies the result to public/cards/{slug}.png
 *
 * Algorithm:
 *   - Use sharp.resize with fit:'contain', background transparent
 *   - Canvas is always exactly 1024x1536
 *   - Image centered with transparent padding if needed (Lanczos kernel)
 */

import sharp from 'sharp';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

const DOWNLOADS_CARDS = 'C:\\Users\\User\\Downloads\\ANIMEDLE\\Cards';
const PUBLIC_CARDS = 'public/cards';

const TARGET_W = 1024;
const TARGET_H = 1536;

// Mapping: source filename → slug in public/cards/
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
  ['Hellsing Ultimate Card.png',                'hellsing-ultimate'],
  ['Hunter x Hunter Card.png',                  'hunter-x-hunter'],
  ['Inuyasha Card.png',                         'inuyasha'],
  ["Jojo's Bizarre Adventure Card.png",         'jojos-bizarre-adventure'],
  ['Jujutsu Kaisen Card.png',                   'jujutsu-kaisen'],
  ['Kaiju No.8 Card.png',                       'kaiju-no-8'],
  ['Kill La Kill Card.png',                     'kill-la-kill'],
  ['Kobayashi-san Card.png',                    'kobayashi-san'],
  ['Konosuba Card.png',                         'konosuba'],
  ['Kuroku No Basket Card.png',                 'kuroko-no-basket'],
  ['Mashle Card.png',                           'mashle'],
  ['Mob Psycho 100 Card.png',                   'mob-psycho-100'],
  ['Monster Card.png',                          'monster'],
  ['Mushoku Tensei Card.png',                   'mushoku-tensei'],
  ['Nanatsu No Taizai Card.png',                'nanatsu-no-taizai'],
  ['Naruto Card.png',                           'naruto'],
  ['Neon Genesis Evangelion Card.png',          'neon-genesis-evangelion'],
  ['No Game No Life Card.png',                  'no-game-no-life'],
  ['Noragami Card.png',                         'noragami'],
  ['One Piece Card.png',                        'one-piece'],
  ['One Punch Man Card.png',                    'one-punch-man'],
  ['Oshi No Ko Card.png',                       'oshi-no-ko'],
  ['Overlord Card.png',                         'overlord'],
  ['Parasyte Card.png',                         'parasyte'],
  ['Pokémon Card.png',                          'pokemon'],
  ['Record of Ragnarok Card.png',               'record-of-ragnarok'],
  ['ReZero Card.png',                           're-zero'],
  ['Romance Card.png',                          'romance'],
  ['Sailor Moon Card.png',                      'sailor-moon'],
  ['Sakamoto Days Card.png',                    'sakamoto-days'],
  ['Samurai X Card.png',                        'samurai-x'],
  ['Shangri-La Frontier Card.png',              'shangri-la-frontier'],
  ['Solo Leveling Card.png',                    'solo-leveling'],
  ['Soul Eater Card.png',                       'soul-eater'],
  ['Sousou No Frieren Card.png',                'frieren'],
  ['Spy x Family Card.png',                     'spy-x-family'],
  ['SteinsGate Card.png',                       'steins-gate'],
  ['Sword Art Online Card.png',                 'sword-art-online'],
  ['Tensei Shitara Slime Datta Ken Card.png',   'tensei-shitara-slime-datta-ken'],
  ['The Apothecary Diaries Card.png',           'the-apothecary-diaries'],
  ['The Promissed Neverland Card.png',          'the-promised-neverland'],
  ['Tokyo Ghoul Card.png',                      'tokyo-ghoul'],
  ['Tokyo Revengers Card.png',                  'tokyo-revengers'],
  ['Vinland Saga Card.png',                     'vinland-saga'],
  ['Violet Evergarden Card.png',                'violet-evergarden'],
  ['Wind Breaker Card.png',                     'wind-breaker'],
  ['Witch Hat Atelier Card.png',                'witch-hat-atelier'],
  ['Yu Yu Hakusho Card.png',                    'yu-yu-hakusho'],
  ['Yu-Gi-Oh Card.png',                         'yu-gi-oh'],
];

async function processCard(srcName, slug) {
  const srcPath = join(DOWNLOADS_CARDS, srcName);
  const destPath = join(PUBLIC_CARDS, `${slug}.png`);

  if (!existsSync(srcPath)) {
    console.warn(`  [MISSING] ${srcName}`);
    return false;
  }

  const meta = await sharp(srcPath).metadata();
  const srcW = meta.width;
  const srcH = meta.height;

  if (srcW === TARGET_W && srcH === TARGET_H) {
    // Already correct — just copy directly without re-encoding
    await sharp(srcPath)
      .png({ quality: 100, compressionLevel: 6 })
      .toFile(destPath);
    console.log(`  [OK - already 1024x1536] ${slug}`);
    return true;
  }

  // Scale to fit inside 1024x1536, maintaining aspect ratio (Lanczos kernel)
  await sharp(srcPath)
    .resize(TARGET_W, TARGET_H, {
      fit: 'contain',
      kernel: sharp.kernel.lanczos3,
      background: { r: 0, g: 0, b: 0, alpha: 0 }, // transparent background
    })
    .png({ quality: 100, compressionLevel: 6 })
    .toFile(destPath);

  const ratio = (srcW / srcH).toFixed(3);
  console.log(`  [SCALED ${srcW}x${srcH} → 1024x1536 (ratio ${ratio})] ${slug}`);
  return true;
}

async function main() {
  console.log(`\n=== Upscaling/Fitting all cards from Downloads → public/cards ===`);
  console.log(`Source: ${DOWNLOADS_CARDS}`);
  console.log(`Target: ${PUBLIC_CARDS} (${TARGET_W}x${TARGET_H})\n`);

  let ok = 0;
  let missing = 0;

  for (const [srcName, slug] of CARD_MAP) {
    const success = await processCard(srcName, slug);
    if (success) ok++; else missing++;
  }

  console.log(`\n=== Done ===`);
  console.log(`  Processed: ${ok} cards`);
  console.log(`  Missing:   ${missing} cards`);

  if (ok > 0) {
    // Verify final dimensions
    const destPath = join(PUBLIC_CARDS, `${CARD_MAP[0][1]}.png`);
    if (existsSync(destPath)) {
      const verify = await sharp(destPath).metadata();
      console.log(`\n  Verification: ${CARD_MAP[0][1]}.png → ${verify.width}x${verify.height}`);
    }
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
