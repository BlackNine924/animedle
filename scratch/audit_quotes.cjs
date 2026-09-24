const fs = require('fs');
const path = 'src/data/animes/one-piece/characters.json';
const chars = JSON.parse(fs.readFileSync(path, 'utf8'));

console.log(`=== AUDITING OP QUOTES (${chars.length} characters) ===`);
let count = 0;
chars.forEach(c => {
  if (c.quote && c.quote.trim() !== '' && c.quote.trim() !== '...') {
    console.log(`[${c.id}] ${c.name}: "${c.quote}"`);
    count++;
  }
});
console.log(`Total characters with quotes: ${count}`);
