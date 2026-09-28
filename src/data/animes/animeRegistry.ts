// Registry central de todos os 80 animes do AnimeDle
// Para marcar um anime como implementado, mude implemented: true
// e certifique-se de que existe src/data/animes/{slug}/characters.json

export type AnimeGenre = 'Shonen' | 'Seinen' | 'Isekai' | 'Esporte' | 'Clássico' | 'Romance';
export type AnimeType = 'individual' | 'colecao';

export interface AnimeEntry {
  slug: string;
  name: string;
  genre: AnimeGenre;
  type: AnimeType;
  implemented: boolean;
}

// Slugs com characters.json — detectados automaticamente pelo check de diretórios
const IMPLEMENTED_SLUGS = new Set([
  'attack-on-titan',
  'berserk',
  'black-clover',
  'bleach',
  'blue-lock',
  'chainsaw-man',
  'dandadan',
  'demon-slayer',
  'dragon-ball',
  'fairy-tail',
  'frieren',
  'fullmetal-alchemist',
  'haikyuu',
  'hunter-x-hunter',
  'jojos-bizarre-adventure',
  'jujutsu-kaisen',
  'kaiju-no-8',
  'naruto',
  'one-piece',
  'record-of-ragnarok',
  'solo-leveling',
  'tensei-shitara-slime-datta-ken',
]);

const RAW_REGISTRY: Omit<AnimeEntry, 'implemented'>[] = [
  // ── Shonen ───────────────────────────────────────────────────────────
  { slug: 'akame-ga-kill',              name: 'Akame Ga Kill',                        genre: 'Shonen',   type: 'individual' },
  { slug: 'assassination-classroom',    name: 'Assassination Classroom',              genre: 'Shonen',   type: 'individual' },
  { slug: 'attack-on-titan',            name: 'Attack on Titan',                      genre: 'Shonen',   type: 'individual' },
  { slug: 'black-clover',               name: 'Black Clover',                         genre: 'Shonen',   type: 'individual' },
  { slug: 'bleach',                     name: 'Bleach',                               genre: 'Shonen',   type: 'individual' },
  { slug: 'blue-lock',                  name: 'Blue Lock',                            genre: 'Esporte',  type: 'individual' },
  { slug: 'my-hero-academia',           name: 'Boku no Hero Academia',                genre: 'Shonen',   type: 'individual' },
  { slug: 'chainsaw-man',               name: 'Chainsaw Man',                         genre: 'Shonen',   type: 'individual' },
  { slug: 'dandadan',                   name: 'Dan Da Dan',                           genre: 'Shonen',   type: 'individual' },
  { slug: 'death-note',                 name: 'Death Note',                           genre: 'Shonen',   type: 'individual' },
  { slug: 'demon-slayer',               name: 'Demon Slayer',                         genre: 'Shonen',   type: 'individual' },
  { slug: 'dr-stone',                   name: 'Dr. Stone',                            genre: 'Shonen',   type: 'individual' },
  { slug: 'dragon-ball',                name: 'Dragon Ball',                          genre: 'Clássico', type: 'individual' },
  { slug: 'fairy-tail',                 name: 'Fairy Tail',                           genre: 'Shonen',   type: 'individual' },
  { slug: 'fire-force',                 name: 'Fire Force',                           genre: 'Shonen',   type: 'individual' },
  { slug: 'fullmetal-alchemist',        name: 'Fullmetal Alchemist',                  genre: 'Shonen',   type: 'individual' },
  { slug: 'gachiakuta',                 name: 'Gachiakuta',                           genre: 'Shonen',   type: 'individual' },
  { slug: 'gintama',                    name: 'Gintama',                              genre: 'Shonen',   type: 'individual' },
  { slug: 'gurren-lagann',              name: 'Gurren Lagann',                        genre: 'Shonen',   type: 'individual' },
  { slug: 'haikyuu',                    name: 'Haikyuu!!',                            genre: 'Esporte',  type: 'individual' },
  { slug: 'hells-paradise',             name: "Hell's Paradise",                      genre: 'Shonen',   type: 'individual' },
  { slug: 'hunter-x-hunter',            name: 'Hunter x Hunter',                      genre: 'Shonen',   type: 'individual' },
  { slug: 'jojos-bizarre-adventure',    name: "JoJo's Bizarre Adventure",             genre: 'Shonen',   type: 'individual' },
  { slug: 'jujutsu-kaisen',             name: 'Jujutsu Kaisen',                       genre: 'Shonen',   type: 'individual' },
  { slug: 'kaiju-no-8',                 name: 'Kaiju No.8',                           genre: 'Shonen',   type: 'individual' },
  { slug: 'kill-la-kill',               name: 'Kill la Kill',                         genre: 'Shonen',   type: 'individual' },
  { slug: 'kuroko-no-basket',           name: 'Kuroko no Basket',                     genre: 'Esporte',  type: 'individual' },
  { slug: 'mashle',                     name: 'Mashle',                               genre: 'Shonen',   type: 'individual' },
  { slug: 'mob-psycho-100',             name: 'Mob Psycho 100',                       genre: 'Shonen',   type: 'individual' },
  { slug: 'nanatsu-no-taizai',          name: 'Nanatsu no Taizai',                    genre: 'Shonen',   type: 'individual' },
  { slug: 'naruto',                     name: 'Naruto',                               genre: 'Shonen',   type: 'individual' },
  { slug: 'noragami',                   name: 'Noragami',                             genre: 'Shonen',   type: 'individual' },
  { slug: 'one-piece',                  name: 'One Piece',                            genre: 'Shonen',   type: 'individual' },
  { slug: 'one-punch-man',              name: 'One Punch Man',                        genre: 'Shonen',   type: 'individual' },
  { slug: 'sakamoto-days',              name: 'Sakamoto Days',                        genre: 'Shonen',   type: 'individual' },
  { slug: 'soul-eater',                 name: 'Soul Eater',                           genre: 'Shonen',   type: 'individual' },
  { slug: 'spy-x-family',               name: 'Spy x Family',                         genre: 'Shonen',   type: 'individual' },
  { slug: 'the-promised-neverland',     name: 'The Promised Neverland',               genre: 'Shonen',   type: 'individual' },
  { slug: 'wind-breaker',               name: 'Wind Breaker',                         genre: 'Shonen',   type: 'individual' },
  // ── Seinen ───────────────────────────────────────────────────────────
  { slug: 'berserk',                    name: 'Berserk',                              genre: 'Seinen',   type: 'individual' },
  { slug: 'bungo-stray-dogs',           name: 'Bungo Stray Dogs',                     genre: 'Seinen',   type: 'individual' },
  { slug: 'classroom-of-the-elite',     name: 'Classroom of the Elite',               genre: 'Seinen',   type: 'individual' },
  { slug: 'code-geass',                 name: 'Code Geass',                           genre: 'Seinen',   type: 'individual' },
  { slug: 'cyberpunk-edgerunners',      name: 'Cyberpunk: Edgerunners',               genre: 'Seinen',   type: 'individual' },
  { slug: 'fate',                       name: 'Fate',                                 genre: 'Seinen',   type: 'individual' },
  { slug: 'frieren',                    name: 'Sousou no Frieren',                    genre: 'Seinen',   type: 'individual' },
  { slug: 'hellsing-ultimate',          name: 'Hellsing Ultimate',                    genre: 'Seinen',   type: 'individual' },
  { slug: 'kobayashi-san',              name: 'Kobayashi-san Chi no Maid Dragon',     genre: 'Seinen',   type: 'individual' },
  { slug: 'monster',                    name: 'Monster',                              genre: 'Seinen',   type: 'individual' },
  { slug: 'mushoku-tensei',             name: 'Mushoku Tensei',                       genre: 'Isekai',   type: 'individual' },
  { slug: 'oshi-no-ko',                 name: 'Oshi no Ko',                           genre: 'Seinen',   type: 'individual' },
  { slug: 'parasyte',                   name: 'Parasyte',                             genre: 'Seinen',   type: 'individual' },
  { slug: 'record-of-ragnarok',         name: 'Record of Ragnarok',                   genre: 'Seinen',   type: 'individual' },
  { slug: 'solo-leveling',              name: 'Solo Leveling',                        genre: 'Seinen',   type: 'individual' },
  { slug: 'the-apothecary-diaries',     name: 'The Apothecary Diaries',               genre: 'Seinen',   type: 'individual' },
  { slug: 'tokyo-ghoul',                name: 'Tokyo Ghoul',                          genre: 'Seinen',   type: 'individual' },
  { slug: 'tokyo-revengers',            name: 'Tokyo Revengers',                      genre: 'Seinen',   type: 'individual' },
  { slug: 'violet-evergarden',          name: 'Violet Evergarden',                    genre: 'Seinen',   type: 'individual' },
  { slug: 'vinland-saga',               name: 'Vinland Saga',                         genre: 'Seinen',   type: 'individual' },
  { slug: 'witch-hat-atelier',          name: 'Witch Hat Atelier',                    genre: 'Seinen',   type: 'individual' },
  // ── Isekai ───────────────────────────────────────────────────────────
  { slug: 'konosuba',                   name: 'Konosuba',                             genre: 'Isekai',   type: 'individual' },
  { slug: 'no-game-no-life',            name: 'No Game No Life',                      genre: 'Isekai',   type: 'individual' },
  { slug: 'overlord',                   name: 'Overlord',                             genre: 'Isekai',   type: 'individual' },
  { slug: 're-zero',                    name: 'Re:Zero',                              genre: 'Isekai',   type: 'individual' },
  { slug: 'shangri-la-frontier',        name: 'Shangri-La Frontier',                  genre: 'Isekai',   type: 'individual' },
  { slug: 'sword-art-online',           name: 'Sword Art Online',                     genre: 'Isekai',   type: 'individual' },
  { slug: 'tensei-shitara-slime-datta-ken', name: 'Tensei Shitara Slime Datta Ken',  genre: 'Isekai',   type: 'individual' },
  // ── Clássico ─────────────────────────────────────────────────────────
  { slug: 'akira',                      name: 'Akira',                                genre: 'Clássico', type: 'individual' },
  { slug: 'cavaleiros-do-zodiaco',      name: 'Cavaleiros do Zodíaco',                genre: 'Clássico', type: 'individual' },
  { slug: 'cowboy-bebop',               name: 'Cowboy Bebop',                         genre: 'Clássico', type: 'individual' },
  { slug: 'digimon',                    name: 'Digimon',                              genre: 'Clássico', type: 'individual' },
  { slug: 'inuyasha',                   name: 'Inuyasha',                             genre: 'Clássico', type: 'individual' },
  { slug: 'neon-genesis-evangelion',    name: 'Neon Genesis Evangelion',              genre: 'Clássico', type: 'individual' },
  { slug: 'pokemon',                    name: 'Pokémon',                              genre: 'Clássico', type: 'individual' },
  { slug: 'sailor-moon',                name: 'Sailor Moon',                          genre: 'Clássico', type: 'individual' },
  { slug: 'samurai-x',                  name: 'Samurai X',                            genre: 'Clássico', type: 'individual' },
  { slug: 'yu-gi-oh',                   name: 'Yu-Gi-Oh!',                            genre: 'Clássico', type: 'individual' },
  { slug: 'yu-yu-hakusho',              name: 'Yu Yu Hakusho',                        genre: 'Clássico', type: 'individual' },
  // ── Coleção de Romance ───────────────────────────────────────────────
  { slug: 'romance',                    name: 'Romance',                              genre: 'Romance',  type: 'colecao'    },
];

// Resolve implemented flag automaticamente pelo IMPLEMENTED_SLUGS set
export const ANIME_REGISTRY: AnimeEntry[] = RAW_REGISTRY.map(entry => ({
  ...entry,
  implemented: IMPLEMENTED_SLUGS.has(entry.slug),
}));

// Helpers
export function getAnimeBySlug(slug: string): AnimeEntry | undefined {
  return ANIME_REGISTRY.find(a => a.slug === slug);
}

export const AVAILABLE_ANIMES = ANIME_REGISTRY
  .filter(a => a.implemented && a.type === 'individual')
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

export const COLLECTION_ANIMES = ANIME_REGISTRY
  .filter(a => a.type === 'colecao')
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

export const COMING_SOON_ANIMES = ANIME_REGISTRY
  .filter(a => !a.implemented && a.type === 'individual')
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

export const ALL_GENRES: AnimeGenre[] = ['Shonen', 'Seinen', 'Clássico', 'Isekai', 'Esporte', 'Romance'];
