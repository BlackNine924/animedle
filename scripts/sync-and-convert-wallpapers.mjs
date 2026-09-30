import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_WALLPAPERS = 'C:/Users/User/Downloads/ANIMEDLE/Wallpapers';
const SRC_ROOT = 'C:/Users/User/Downloads/ANIMEDLE';
const DEST_DIR = 'public/wallpapers';

fs.mkdirSync(DEST_DIR, { recursive: true });

const WALLPAPER_MAP = [
  ['Akame Ga Kill Wallpaper.png',                'akame-ga-kill'],
  ['Akira Wallpaper.png',                        'akira'],
  ['Assassination Classroom Wallpaper.png',      'assassination-classroom'],
  ['Attack On Titan Wallpaper.png',              'attack-on-titan'],
  ['Berserk Wallpaper.png',                      'berserk'],
  ['Black Clover Wallpaper.png',                 'black-clover'],
  ['Bleach Wallpaper.png',                       'bleach'],
  ['Blue Lock Wallpaper.png',                    'blue-lock'],
  ['Boku No Hero Wallpaper.png',                 'my-hero-academia'],
  ['Bungo Stray Dogs Wallpaper.png',             'bungo-stray-dogs'],
  ['Cavaleiros do Zodíaco Wallpaper.png',        'cavaleiros-do-zodiaco'],
  ['Chainsaw Man Wallpaper.png',                 'chainsaw-man'],
  ['Classroom of The Elite Wallpaper.png',       'classroom-of-the-elite'],
  ['Code Geas Wallpaper.png',                    'code-geass'],
  ['Cowboy Bebop Wallpaper.png',                 'cowboy-bebop'],
  ['Cyberpunk Edgerunners Wallpaper.png',        'cyberpunk-edgerunners'],
  ['Dandadan Wallpaper.png',                     'dandadan'],
  ['Death Note Wallpaper.png',                   'death-note'],
  ['Demon Slayer Wallpaper.png',                 'demon-slayer'],
  ['Digimon Wallpaper.png',                      'digimon'],
  ['Dr. Stone Wallpaper.png',                    'dr-stone'],
  ['Dragon Ball Wallpaper.png',                  'dragon-ball'],
  ['Fairy Tail Wallpaper.png',                   'fairy-tail'],
  ['Fate Wallpaper.png',                         'fate'],
  ['Fire Force Wallpaper.png',                   'fire-force'],
  ['Fullmetal Alchemist Wallpaper.png',          'fullmetal-alchemist'],
  ['Gachiakuta Wallpaper.png',                   'gachiakuta'],
  ['Gintama Wallpaper.png',                      'gintama'],
  ['Gurren Lagann Wallpaper.png',                'gurren-lagann'],
  ['Haikyuu Wallpaper.png',                      'haikyuu'],
  ['Hells Paradise Wallpaper.png',               'hells-paradise'],
  ["Hell's Paradise Wallpaper.png",              'hells-paradise'],
  ['Hellsing Ultimate Wallpaper.png',            'hellsing-ultimate'],
  ['Hunter x Hunter Wallpaper.png',              'hunter-x-hunter'],
  ['Inuyasha Wallpaper.png',                     'inuyasha'],
  ["Jojo's Bizarre Adventure Wallpaper.png",     'jojos-bizarre-adventure'],
  ['Jujutsu Kaisen Wallpaper.png',               'jujutsu-kaisen'],
  ['Kaiju No. 8 Wallpaper.png',                  'kaiju-no-8'],
  ['Kill La Kill Wallpaper.png',                 'kill-la-kill'],
  ['Kobayashi-san Wallpaper.png',                'kobayashi-san'],
  ['Konosuba Wallpaper.png',                     'konosuba'],
  ['Kuroku No Basket Wallpaper.png',             'kuroko-no-basket'],
  ['Mashle Wallpaper.png',                       'mashle'],
  ['Mob Psycho 100 Wallpaper.png',               'mob-psycho-100'],
  ['Monster Wallpaper.png',                      'monster'],
  ['Mushoku Tensei Wallpaper.png',               'mushoku-tensei'],
  ['Nanatsu No Taizai Wallpaper.png',            'nanatsu-no-taizai'],
  ['Naruto Wallpaper.png',                       'naruto'],
  ['Neon Genesis Evangelion Wallpaper.png',      'neon-genesis-evangelion'],
  ['No Game No Life Wallpaper.png',              'no-game-no-life'],
  ['Noragami Wallpaper.png',                     'noragami'],
  ['One Piece Wallpaper.png',                    'one-piece'],
  ['One Punch Man Wallpaper.png',                'one-punch-man'],
  ['Oshi No Ko Wallpaper.png',                   'oshi-no-ko'],
  ['Overlord Wallpaper.png',                     'overlord'],
  ['Parasyte Wallpaper.png',                     'parasyte'],
  ['Pokémon Wallpaper.png',                      'pokemon'],
  ['Pokemon Wallpaper.png',                      'pokemon'],
  ['Record of Ragnarok Wallpaper.png',           'record-of-ragnarok'],
  ['Rezero Wallpaper.png',                       're-zero.png'],
  ['Romance Wallpaper.png',                      'romance'],
  ['Sailor Moon Wallpaper.png',                  'sailor-moon'],
  ['Sakamoto Days Wallpaper.png',                'sakamoto-days'],
  ['Samurai X Wallpaper.png',                    'samurai-x'],
  ['Shangri-La Frontier Wallpaper.png',          'shangri-la-frontier'],
  ['Solo Leveling Wallpaper.png',                'solo-leveling'],
  ['Soul Eater Wallpaper.png',                   'soul-eater'],
  ['Sousou No Frieren Wallpaper.png',            'frieren'],
  ['Spy x Family Wallpaper.png',                 'spy-x-family'],
  ['SteinsGate Wallpaper.png',                   'steins-gate'],
  ['Sword Art Online Wallpaper.png',             'sword-art-online'],
  ['Tensei Shitara Slime Datta Ken Wallpaper.png','tensei-shitara-slime-datta-ken'],
  ['The Apothecary Diaries Wallpaper.png',        'the-apothecary-diaries'],
  ['The Promissed Neverland Wallpaper.png',       'the-promised-neverland'],
  ['Tokyo Ghoul Wallpaper.png',                  'tokyo-ghoul'],
  ['Tokyo Revengers Wallpapers.png',              'tokyo-revengers'],
  ['Tokyo Revengers Wallpaper.png',               'tokyo-revengers'],
  ['Vinland Saga Wallpaper.png',                 'vinland-saga'],
  ['Violet Evergarden Wallpaper.png',            'violet-evergarden'],
  ['Wind Breaker Wallpaper.png',                 'wind-breaker'],
  ['Witch Hat Atelier Wallpaper.png',            'witch-hat-atelier'],
  ['Yu Yu Hakusho Wallpaper.png',                'yu-yu-hakusho'],
  ['Yu-gi-Oh Wallpaper.png',                     'yu-gi-oh']
];

function norm(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  const rootFiles = fs.readdirSync(SRC_ROOT);
  const wpFiles = fs.existsSync(SRC_WALLPAPERS) ? fs.readdirSync(SRC_WALLPAPERS) : [];

  let count = 0;
  for (const [rawName, slug] of WALLPAPER_MAP) {
    let cleanSlug = slug.endsWith('.png') ? slug.slice(0, -4) : slug;

    // Check in root first (where new files were dropped), then in Wallpapers
    let foundPath = null;
    const rootMatch = rootFiles.find(f => norm(f) === norm(rawName));
    if (rootMatch) {
      foundPath = path.join(SRC_ROOT, rootMatch);
    } else {
      const wpMatch = wpFiles.find(f => norm(f) === norm(rawName));
      if (wpMatch) {
        foundPath = path.join(SRC_WALLPAPERS, wpMatch);
      }
    }

    if (!foundPath) {
      continue;
    }

    const destPng = path.join(DEST_DIR, `${cleanSlug}.png`);
    const destWebp = path.join(DEST_DIR, `${cleanSlug}.webp`);

    // Copy PNG
    fs.copyFileSync(foundPath, destPng);

    // Generate WebP for ultra-fast loading
    try {
      await sharp(foundPath)
        .webp({ quality: 85, effort: 4 })
        .toFile(destWebp);
      count++;
    } catch (err) {
      console.error(`Error converting ${rawName} to webp:`, err.message);
    }
  }

  console.log(`[OK] Successfully synchronized and converted ${count} wallpapers to PNG & WebP!`);
}

run().catch(console.error);
