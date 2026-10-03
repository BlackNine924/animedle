import fs from 'fs';

const chars = JSON.parse(fs.readFileSync('src/data/animes/one-piece/characters.json', 'utf8'));
console.log('Total OP characters in dataset:', chars.length);

const allIds = new Set(chars.map(c => c.id));
console.log('Sample IDs:', chars.slice(0, 20).map(c => c.id));
