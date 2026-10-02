// Script to generate comprehensive canonical exclusive challenges for all 32 animes
import fs from 'fs';
import path from 'path';

const animesDir = './src/data/animes';

function loadCharacters(slug) {
  try {
    const raw = fs.readFileSync(path.join(animesDir, slug, 'characters.json'), 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// Helper to find character ID safely
function getCharId(chars, searchTerms) {
  for (const term of searchTerms) {
    const found = chars.find(c => c.name.toLowerCase().includes(term.toLowerCase()) || c.id.toLowerCase().includes(term.toLowerCase()));
    if (found) return { id: found.id, name: found.name };
  }
  return null;
}

const animeList = [
  'one-piece',
  'dragon-ball',
  'bleach',
  'jujutsu-kaisen',
  'naruto',
  'demon-slayer',
  'attack-on-titan',
  'hunter-x-hunter',
  'chainsaw-man',
  'solo-leveling',
  'my-hero-academia',
  'black-clover',
  'blue-lock',
  'dandadan',
  'fairy-tail',
  'frieren',
  'fullmetal-alchemist',
  'haikyuu',
  'jojos-bizarre-adventure',
  'kaiju-no-8',
  'nanatsu-no-taizai',
  'one-punch-man',
  'record-of-ragnarok',
  'romance',
  'shangri-la-frontier',
  'sword-art-online',
  'tensei-shitara-slime-datta-ken',
  'tokyo-ghoul',
  'witch-hat-atelier',
  'berserk',
  'cyberpunk-edgerunners',
  'akame-ga-kill'
];

console.log('Checking all 32 animes exist...');
for (const a of animeList) {
  const chars = loadCharacters(a);
  if (chars.length === 0) {
    console.error('Anime has 0 characters:', a);
  } else {
    console.log(`✓ ${a}: ${chars.length} characters`);
  }
}
