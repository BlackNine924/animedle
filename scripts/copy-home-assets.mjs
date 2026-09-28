import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const SRC_ROOT = 'C:\\Users\\User\\Downloads\\ANIMEDLE';
const DEST_ROOT = 'public';

// Ensure destination folders exist
for (const dir of ['cards', 'wallpapers', 'logos']) {
  mkdirSync(join(DEST_ROOT, dir), { recursive: true });
}

let logoOk = 0, logoFail = 0;
let cardOk = 0, cardFail = 0;
let wallpaperOk = 0, wallpaperFail = 0;
let logoFileOk = 0, logoFileFail = 0;

function copy(src, dest, category) {
  try {
    copyFileSync(src, dest);
    return true;
  } catch (e) {
    console.error(`[MISSING] ${category}: ${src}`);
    return false;
  }
}

// ── Main logo ──────────────────────────────────────────────────────────────
{
  const src = join(SRC_ROOT, 'AnimeDLE Logo.png');
  const dest = join(DEST_ROOT, 'logo-main.png');
  if (copy(src, dest, 'logo')) logoOk++; else logoFail++;
}

// ── Cards ──────────────────────────────────────────────────────────────────
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
  ['Cavaleiros do Zod\u00edaco Card.png',        'cavaleiros-do-zodiaco.png'],
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
  ['Pok\u00e9mon Card.png',                      'pokemon.png'],
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

for (const [src, dest] of cards) {
  const ok = copy(
    join(SRC_ROOT, 'Cards', src),
    join(DEST_ROOT, 'cards', dest),
    'card'
  );
  if (ok) cardOk++; else cardFail++;
}

// ── Wallpapers ─────────────────────────────────────────────────────────────
const wallpapers = [
  ['Akame Ga Kill Wallpaper.png',                'akame-ga-kill.png'],
  ['Akira Wallpaper.png',                        'akira.png'],
  ['Assassination Classroom Wallpaper.png',      'assassination-classroom.png'],
  ['Attack On Titan Wallpaper.png',              'attack-on-titan.png'],
  ['Berserk Wallpaper.png',                      'berserk.png'],
  ['Black Clover Wallpaper.png',                 'black-clover.png'],
  ['Bleach Wallpaper.png',                       'bleach.png'],
  ['Blue Lock Wallpaper.png',                    'blue-lock.png'],
  ['Boku No Hero Wallpaper.png',                 'my-hero-academia.png'],
  ['Bungo Stray Dogs Wallpaper.png',             'bungo-stray-dogs.png'],
  ['Cavaleiros do Zod\u00edaco Wallpaper.png',   'cavaleiros-do-zodiaco.png'],
  ['Chainsaw Man Wallpaper.png',                 'chainsaw-man.png'],
  ['Classroom of The Elite Wallpaper.png',       'classroom-of-the-elite.png'],
  ['Code Geas Wallpaper.png',                    'code-geass.png'],
  ['Cowboy Bebop Wallpaper.png',                 'cowboy-bebop.png'],
  ['Cyberpunk Edgerunners Wallpaper.png',        'cyberpunk-edgerunners.png'],
  ['Dandadan Wallpaper.png',                     'dandadan.png'],
  ['Death Note Wallpaper.png',                   'death-note.png'],
  ['Demon Slayer Wallpaper.png',                 'demon-slayer.png'],
  ['Digimon Wallpaper.png',                      'digimon.png'],
  ['Dr. Stone Wallpaper.png',                    'dr-stone.png'],
  ['Dragon Ball Wallpaper.png',                  'dragon-ball.png'],
  ['Fairy Tail Wallpaper.png',                   'fairy-tail.png'],
  ['Fate Wallpaper.png',                         'fate.png'],
  ['Fire Force Wallpaper.png',                   'fire-force.png'],
  ['Fullmetal Alchemist Wallpaper.png',          'fullmetal-alchemist.png'],
  ['Gachiakuta Wallpaper.png',                   'gachiakuta.png'],
  ['Gintama Wallpaper.png',                      'gintama.png'],
  ['Gurren Lagann Wallpaper.png',                'gurren-lagann.png'],
  ['Haikyuu Wallpaper.png',                      'haikyuu.png'],
  ['Hells Paradise Wallpaper.png',               'hells-paradise.png'],
  ['Hellsing Ultimate Wallpaper.png',            'hellsing-ultimate.png'],
  ['Hunter x Hunter Wallpaper.png',              'hunter-x-hunter.png'],
  ['Inuyasha Wallpaper.png',                     'inuyasha.png'],
  ["Jojo's Bizarre Adventure Wallpaper.png",     'jojos-bizarre-adventure.png'],
  ['Jujutsu Kaisen Wallpaper.png',               'jujutsu-kaisen.png'],
  ['Kaiju No. 8 Wallpaper.png',                  'kaiju-no-8.png'],
  ['Kill La Kill Wallpaper.png',                 'kill-la-kill.png'],
  ['Kobayashi-san Wallpaper.png',                'kobayashi-san.png'],
  ['Konosuba Wallpaper.png',                     'konosuba.png'],
  ['Kuroku No Basket Wallpaper.png',             'kuroko-no-basket.png'],
  ['Mashle Wallpaper.png',                       'mashle.png'],
  ['Mob Psycho 100 Wallpaper.png',               'mob-psycho-100.png'],
  ['Monster Wallpaper.png',                      'monster.png'],
  ['Mushoku Tensei Wallpaper.png',               'mushoku-tensei.png'],
  ['Nanatsu No Taizai Wallpaper.png',            'nanatsu-no-taizai.png'],
  ['Naruto Wallpaper.png',                       'naruto.png'],
  ['Neon Genesis Evangelion Wallpaper.png',      'neon-genesis-evangelion.png'],
  ['No Game No Life Wallpaper.png',              'no-game-no-life.png'],
  ['Noragami Wallpaper.png',                     'noragami.png'],
  ['One Piece Wallpaper.png',                    'one-piece.png'],
  ['One Punch Man Wallpaper.png',                'one-punch-man.png'],
  ['Oshi No Ko Wallpaper.png',                   'oshi-no-ko.png'],
  ['Overlord Wallpaper.png',                     'overlord.png'],
  ['Parasyte Wallpaper.png',                     'parasyte.png'],
  ['Pok\u00e9mon Wallpaper.png',                 'pokemon.png'],
  ['Record of Ragnarok Wallpaper.png',           'record-of-ragnarok.png'],
  ['Rezero Wallpaper.png',                       're-zero.png'],
  ['Romance Wallpaper.png',                      'romance.png'],
  ['Sailor Moon Wallpaper.png',                  'sailor-moon.png'],
  ['Sakamoto Days Wallpaper.png',                'sakamoto-days.png'],
  ['Samurai X Wallpaper.png',                    'samurai-x.png'],
  ['Shangri-La Frontier Wallpaper.png',          'shangri-la-frontier.png'],
  ['Solo Leveling Wallpaper.png',                'solo-leveling.png'],
  ['Soul Eater Wallpaper.png',                   'soul-eater.png'],
  ['Sousou No Frieren Wallpaper.png',            'frieren.png'],
  ['Spy x Family Wallpaper.png',                 'spy-x-family.png'],
  ['SteinsGate Wallpaper.png',                   'steins-gate.png'],
  ['Sword Art Online Wallpaper.png',             'sword-art-online.png'],
  ['Tensei Shitara Slime Datta Ken Wallpaper.png', 'tensei-shitara-slime-datta-ken.png'],
  ['The Apothecary Diaries Wallpaper.png',       'the-apothecary-diaries.png'],
  ['The Promissed Neverland Wallpaper.png',      'the-promised-neverland.png'],
  ['Tokyo Ghoul Wallpaper.png',                  'tokyo-ghoul.png'],
  ['Tokyo Revengers Wallpapers.png',             'tokyo-revengers.png'],
  ['Vinland Saga Wallpaper.png',                 'vinland-saga.png'],
  ['Violet Evergarden Wallpaper.png',            'violet-evergarden.png'],
  ['Wind Breaker Wallpaper.png',                 'wind-breaker.png'],
  ['Witch Hat Atelier Wallpaper.png',            'witch-hat-atelier.png'],
  ['Yu Yu Hakusho Wallpaper.png',                'yu-yu-hakusho.png'],
  ['Yu-gi-Oh Wallpaper.png',                     'yu-gi-oh.png'],
];

for (const [src, dest] of wallpapers) {
  const ok = copy(
    join(SRC_ROOT, 'Wallpapers', src),
    join(DEST_ROOT, 'wallpapers', dest),
    'wallpaper'
  );
  if (ok) wallpaperOk++; else wallpaperFail++;
}

// ── Logos ──────────────────────────────────────────────────────────────────
const logos = [
  ['Akame Ga Kill Logo.png',                     'akame-ga-kill.png'],
  ['Akira Logo.png',                             'akira.png'],
  ['Assassination Classroom Logo.png',           'assassination-classroom.png'],
  ['Attack On TItan Logo.png',                   'attack-on-titan.png'],
  ['Berserk Logo.png',                           'berserk.png'],
  ['Black Clover Logo.png',                      'black-clover.png'],
  ['Bleach Logo.png',                            'bleach.png'],
  ['Blue Lock Logo.png',                         'blue-lock.png'],
  ['Boku No Hero Logo.png',                      'my-hero-academia.png'],
  ['Bungo Stray Dogs Logo.png',                  'bungo-stray-dogs.png'],
  ['Cavaleiros do Zod\u00edaco Logo.png',        'cavaleiros-do-zodiaco.png'],
  ['Chainsaw Man Logo.png',                      'chainsaw-man.png'],
  ['Classroom of The Elite Logo.png',            'classroom-of-the-elite.png'],
  ['Code Geas Logo.png',                         'code-geass.png'],
  ['Cowboy Bebop Logo.png',                      'cowboy-bebop.png'],
  ['Cyberpunk Edgerunners Logo.png',             'cyberpunk-edgerunners.png'],
  ['Dan da Dan Logo.png',                        'dandadan.png'],
  ['Death Note Logo.png',                        'death-note.png'],
  ['Demon Slayer Logo.png',                      'demon-slayer.png'],
  ['Digimon Logo.png',                           'digimon.png'],
  ['Dr. Stone Logo.png',                         'dr-stone.png'],
  ['Dragon Ball Logo.png',                       'dragon-ball.png'],
  ['Fairy Tail Logo.png',                        'fairy-tail.png'],
  ['Fate Logo.png',                              'fate.png'],
  ['Fire Force Logo.png',                        'fire-force.png'],
  ['Fullmetal Alchemist Logo.png',               'fullmetal-alchemist.png'],
  ['Gachiakuta Logo.png',                        'gachiakuta.png'],
  ['Gintama Logo.png',                           'gintama.png'],
  ['Gurren Lagann Logo.png',                     'gurren-lagann.png'],
  ['Haikyuu Logo.png',                           'haikyuu.png'],
  ['Hells Paradise Logo.png',                    'hells-paradise.png'],
  ['Hellsing Ultimate Logo.png',                 'hellsing-ultimate.png'],
  ['Hunter x Hunter Logo.png',                   'hunter-x-hunter.png'],
  ['Inuyasha Logo.png',                          'inuyasha.png'],
  ["Jojo's Logo.png",                            'jojos-bizarre-adventure.png'],
  ['Jujutsu Kaisen Logo.png',                    'jujutsu-kaisen.png'],
  ['Kaiju No. 8 Logo.png',                       'kaiju-no-8.png'],
  ['Kill La Kill Logo.png',                      'kill-la-kill.png'],
  ['Kobayashi-san Logo.png',                     'kobayashi-san.png'],
  ['Konosuba Logo.png',                          'konosuba.png'],
  ['Kuroku No Basket Logo.png',                  'kuroko-no-basket.png'],
  ['Mashle Logo.png',                            'mashle.png'],
  ['Mob Psycho 100 Logo.png',                    'mob-psycho-100.png'],
  ['Monster Logo.png',                           'monster.png'],
  ['Mushoku Tensei Logo.png',                    'mushoku-tensei.png'],
  ['Nanatsu No Taizai Logo.png',                 'nanatsu-no-taizai.png'],
  ['Naruto Logo.png',                            'naruto.png'],
  ['Neon Genesis Evangelion Logo.png',           'neon-genesis-evangelion.png'],
  ['No Game No Life Logo.png',                   'no-game-no-life.png'],
  ['Noragami Logo.png',                          'noragami.png'],
  ['One Piece Logo.png',                         'one-piece.png'],
  ['One Punch Man Logo.png',                     'one-punch-man.png'],
  ['Oshi No Ko Logo.png',                        'oshi-no-ko.png'],
  ['Overlord Logo.png',                          'overlord.png'],
  ['Parasyte Logo.png',                          'parasyte.png'],
  ['Pok\u00e9mon Logo.png',                      'pokemon.png'],
  ['Record of Ragnarok Logo.png',                'record-of-ragnarok.png'],
  ['ReZero Logo.png',                            're-zero.png'],
  ['Romance Logo.png',                           'romance.png'],
  ['Sailor Moon Logo.png',                       'sailor-moon.png'],
  ['Sakamoto Days Logo.png',                     'sakamoto-days.png'],
  ['Samurai X Logo.png',                         'samurai-x.png'],
  ['Shangri-La Frontier Logo.png',               'shangri-la-frontier.png'],
  ['Solo Leveling Logo.png',                     'solo-leveling.png'],
  ['Soul Eater Logo.png',                        'soul-eater.png'],
  ['Sousou No Frieren.png',                      'frieren.png'],
  ['Spy x Family Logo.png',                      'spy-x-family.png'],
  ['Steins Gate Logo.png',                       'steins-gate.png'],
  ['Sword Art Online Logo.png',                  'sword-art-online.png'],
  ['Tensei Shitara Slime Datta Ken Logo.png',    'tensei-shitara-slime-datta-ken.png'],
  ['The Apothecary Diaries Logo.png',            'the-apothecary-diaries.png'],
  ['The Promissed Neverland Logo.png',           'the-promised-neverland.png'],
  ['Tokyo Ghoul Logo.png',                       'tokyo-ghoul.png'],
  ['Tokyo Revergers Logo.png',                   'tokyo-revengers.png'],
  ['Vinland Saga Logo.png',                      'vinland-saga.png'],
  ['Violet Evergarden Logo.png',                 'violet-evergarden.png'],
  ['Wind Breaker Logo.png',                      'wind-breaker.png'],
  ['Witch Hat Atelier Logo.png',                 'witch-hat-atelier.png'],
  ['Yu Yu Hakusho Logo.png',                     'yu-yu-hakusho.png'],
  ['Yu-Gi-Oh Logo.png',                          'yu-gi-oh.png'],
];

for (const [src, dest] of logos) {
  const ok = copy(
    join(SRC_ROOT, 'Logos', src),
    join(DEST_ROOT, 'logos', dest),
    'logo'
  );
  if (ok) logoFileOk++; else logoFileFail++;
}

// ── Summary ────────────────────────────────────────────────────────────────
console.log('\n══════════════════════════════════════');
console.log('           COPY SUMMARY');
console.log('══════════════════════════════════════');
console.log(`Main logo : ${logoOk} copied, ${logoFail} failed`);
console.log(`Cards     : ${cardOk} copied, ${cardFail} failed`);
console.log(`Wallpapers: ${wallpaperOk} copied, ${wallpaperFail} failed`);
console.log(`Logos     : ${logoFileOk} copied, ${logoFileFail} failed`);
console.log('══════════════════════════════════════');
