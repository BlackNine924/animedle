const fs = require('fs');
const opPath = 'src/data/animes/one-piece/characters.json';
const chars = JSON.parse(fs.readFileSync(opPath, 'utf8'));

console.log(`=== ONE PIECE DATASET VALIDATION (Total: ${chars.length}) ===`);

let errors = [];

chars.forEach((c, idx) => {
  if (!c.id) errors.push(`Char #${idx} missing id`);
  if (!c.name) errors.push(`Char #${idx} missing name`);
  if (!c.avatar || c.avatar.trim() === '') errors.push(`Char ${c.id} missing avatar`);
  if (!c.gender) errors.push(`Char ${c.id} missing gender`);
  if (!c.species) errors.push(`Char ${c.id} missing species`);
  if (!c.affiliation || !Array.isArray(c.affiliation) || c.affiliation.length === 0) errors.push(`Char ${c.id} missing affiliation`);
  if (c.bounty === undefined || c.bounty === null) errors.push(`Char ${c.id} missing bounty`);
  if (!c.debutArc) errors.push(`Char ${c.id} missing debutArc`);
  if (!c.status) errors.push(`Char ${c.id} missing status`);
});

// Specific avatar check for key characters
const EXPECTED_AVATARS = {
  'marcus-mars': 'b354400-BvIWQjE0TtW6.png',
  'corazon': 'b120536-PxdNxEhQwE8d.png',
  'edward-newgate-barba-branca': 'b2751-NnzW0N2vCTjX.jpg',
  'shiki': 'Shiki_Anime_Infobox.png',
  'king': '8fea1bead12e7b81c3501abf2a60cb29.jpg',
  'atlas': '4e15dcd833a2c7382010ca287fba0ae1.jpg',
  'loki': 'Loki_Portrait.png',
  'ragnir': 'Ragnir_Manga_Infobox.png'
};

Object.entries(EXPECTED_AVATARS).forEach(([id, substring]) => {
  const char = chars.find(c => c.id === id);
  if (!char) {
    errors.push(`Missing expected character ID: ${id}`);
  } else if (!char.avatar.includes(substring)) {
    errors.push(`Character ${char.id} avatar does not match expected substring '${substring}': ${char.avatar}`);
  } else {
    console.log(`✓ ${char.id} avatar verified: ${char.avatar}`);
  }
});

if (errors.length === 0) {
  console.log('✅ ALL ONE PIECE CHARACTERS VALIDATED PERFECTLY!');
} else {
  console.error('❌ VALIDATION ERRORS FOUND:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}
