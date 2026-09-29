import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const SRC = 'public/cards';
const DEST = 'C:\\Users\\User\\Downloads\\ANIMEDLE\\Cards_1024x1536';
mkdirSync(DEST, { recursive: true });

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

let copied = 0;
for (const [destName, slug] of CARD_MAP) {
  const srcFile = join(SRC, `${slug}.png`);
  const destFile = join(DEST, destName);
  if (existsSync(srcFile)) {
    copyFileSync(srcFile, destFile);
    copied++;
  } else {
    console.warn(`[MISSING] ${srcFile}`);
  }
}

console.log(`Exported ${copied}/${CARD_MAP.length} cards to ${DEST}`);
