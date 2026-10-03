import fs from 'fs';
import path from 'path';

// Helper to check valid IDs
function getAnimeIds(slug) {
  const p = path.join('src/data/animes', slug, 'characters.json');
  if (!fs.existsSync(p)) return new Set();
  const list = JSON.parse(fs.readFileSync(p, 'utf8'));
  return new Set(list.map(c => c.id));
}

const opIds = getAnimeIds('one-piece');
const narutoIds = getAnimeIds('naruto');
const jjkIds = getAnimeIds('jujutsu-kaisen');
const dsIds = getAnimeIds('demon-slayer');

console.log('One Piece IDs:', opIds.size);
console.log('Naruto IDs:', narutoIds.size);
console.log('JJK IDs:', jjkIds.size);
console.log('Demon Slayer IDs:', dsIds.size);
