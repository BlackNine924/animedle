import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CARDS_DIR = 'C:/Users/User/Downloads/cards_anime_10_1024x1536';
const WALLS_DIR = 'C:/Users/User/Downloads/Wallpapers anime';

const cardMappings = [
  ['Bungo Stray Dogs Card.png',        'bungo-stray-dogs'],
  ['Classroom of The Elite Card.png',  'classroom-of-the-elite'],
  ['Code Geass Card.png',              'code-geass'],
  ['Gintama Card.png',                 'gintama'],
  ['Inuyasha Card.png',                'inuyasha'],
  ['Konosuba Card.png',                'konosuba'],
  ['Monster Card.png',                 'monster'],
  ['Neon Genesis Evangelion Card.png', 'neon-genesis-evangelion'],
  ['ReZero Card.png',                  're-zero'],
  ['The Promissed Neverland Card.png', 'the-promised-neverland']
];

const wallMappings = [
  ['Akame Ga Kill Wallpaper.png',             'akame-ga-kill'],
  ['Duel Disk azul com cinco painéis.png',    'yu-gi-oh'],
  ['Enterrada de Kagami na baía japonesa.png','kuroko-no-basket'],
  ['Inuyasha e Kagome na trilha.png',         'inuyasha'],
  ['Kaiju No.8 Wallpaper.png',                'kaiju-no-8'],
  ['Nanatsu No Taizai Wallpaper.png',         'nanatsu-no-taizai'],
  ['Parasyte Wallpaper.png',                  'parasyte']
];

async function applyCards() {
  console.log('--- Applying 10 Cards ---');
  for (const [file, slug] of cardMappings) {
    const src = path.join(CARDS_DIR, file);
    if (!fs.existsSync(src)) {
      console.error(`Missing card file: ${src}`);
      continue;
    }

    const publicPng = path.join('public', 'cards', `${slug}.png`);
    const publicWebp = path.join('public', 'cards', `${slug}.webp`);
    const distPng = path.join('dist', 'cards', `${slug}.png`);
    const distWebp = path.join('dist', 'cards', `${slug}.webp`);

    const image = sharp(src).resize(1024, 1536, { fit: 'cover' });

    await image.clone().png({ quality: 90 }).toFile(publicPng);
    await image.clone().webp({ quality: 85 }).toFile(publicWebp);

    if (fs.existsSync('dist/cards')) {
      fs.copyFileSync(publicPng, distPng);
      fs.copyFileSync(publicWebp, distWebp);
    }
    console.log(`✓ Card applied: ${slug}`);
  }
}

async function applyWallpapers() {
  console.log('--- Applying Wallpapers ---');
  for (const [file, slug] of wallMappings) {
    const src = path.join(WALLS_DIR, file);
    if (!fs.existsSync(src)) {
      console.error(`Missing wall file: ${src}`);
      continue;
    }

    const publicPng = path.join('public', 'wallpapers', `${slug}.png`);
    const publicWebp = path.join('public', 'wallpapers', `${slug}.webp`);
    const distPng = path.join('dist', 'wallpapers', `${slug}.png`);
    const distWebp = path.join('dist', 'wallpapers', `${slug}.webp`);

    // Standard wallpaper size
    const image = sharp(src).resize(1672, 941, { fit: 'cover' });

    await image.clone().png({ quality: 90 }).toFile(publicPng);
    await image.clone().webp({ quality: 85 }).toFile(publicWebp);

    if (fs.existsSync('dist/wallpapers')) {
      fs.copyFileSync(publicPng, distPng);
      fs.copyFileSync(publicWebp, distWebp);
    }
    console.log(`✓ Wallpaper applied: ${slug}`);
  }
}

async function run() {
  await applyCards();
  await applyWallpapers();
  console.log('--- ALL ASSETS SUCCESSFULLY APPLIED ---');
}

run();
