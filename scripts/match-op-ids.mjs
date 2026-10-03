import fs from 'fs';

const op = JSON.parse(fs.readFileSync('src/data/animes/one-piece/characters.json', 'utf8'));

const targets = [
  'law', 'akainu', 'aokiji', 'kizaru', 'kaido', 'moria', 'teach', 'linlin', 'big mom', 
  'fujitora', 'vegapunk', 'tsuru', 'drake', 'jabra', 'sandersonia', 'marigold',
  'mr. 5', 'valentine', 'mr. 3', 'galdino', 'bon kurei', 'doublefinger', 'mr. 1', 'daz',
  'very good', 'shu', 'sharinguru', 'buffalo', 'jora', 'funk', 'gladius', 'machvise',
  'kanjuro', 'daifuku', 'streusen', 'shinobu', 'morley', 'caribou', 'ryokugyu', 'aramaki',
  'sasaki', 'kabu', 'bian', 'smiley', 'mr. 4', 'blamenco', 'opera', 'morgans', 'snack'
];

for (const t of targets) {
  const matches = op.filter(c => c.name.toLowerCase().includes(t) || c.id.toLowerCase().includes(t.replace(/[\.\s]/g, '')));
  if (matches.length > 0) {
    console.log(`[MATCH] '${t}' -> ${matches.map(c => `${c.id} (${c.name})`).join(', ')}`);
  } else {
    console.log(`[NOT IN DATASET] '${t}'`);
  }
}
