const fs = require('fs');

const opPath = 'src/data/animes/one-piece/characters.json';
const chars = JSON.parse(fs.readFileSync(opPath, 'utf8'));
const anilistAll = JSON.parse(fs.readFileSync('scratch/anilist_op_all_chars.json', 'utf8'));

// Exact explicit overrides provided by user / verified AniList IDs
const EXPLICIT_OVERRIDES = {
  'marcus-mars': 'https://s4.anilist.co/file/anilistcdn/character/large/b354400-BvIWQjE0TtW6.png',
  'corazon': 'https://s4.anilist.co/file/anilistcdn/character/large/b120536-PxdNxEhQwE8d.png',
  'edward-newgate-barba-branca': 'https://s4.anilist.co/file/anilistcdn/character/large/b2751-NnzW0N2vCTjX.jpg',
  'shiki': 'https://s4.anilist.co/file/anilistcdn/character/large/b3105-lI0m8vJ3JQK1.png',
  'king': 'https://i.pinimg.com/736x/8f/ea/1b/8fea1bead12e7b81c3501abf2a60cb29.jpg',
  'vegapunk-atlas': 'https://i.pinimg.com/736x/4e/15/dc/4e15dcd833a2c7382010ca287fba0ae1.jpg',
  'loki': 'https://static.wikia.nocookie.net/onepiece/images/b/b7/Loki_Portrait.png/revision/latest/scale-to-width-down/250?cb=20250324035241&path-prefix=pt',
  'ragnir': 'https://static.wikia.nocookie.net/onepiece/images/e/e4/Ragnir_Manga_Infobox.png/revision/latest?cb=20260710204315'
};

function normalizeName(str) {
  if (!str) return '';
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getAniListNames(node) {
  const names = [];
  if (node.name.full) names.push(normalizeName(node.name.full));
  if (node.name.native) names.push(normalizeName(node.name.native));
  if (node.name.userPreferred) names.push(normalizeName(node.name.userPreferred));
  if (node.name.alternative) {
    node.name.alternative.forEach(alt => names.push(normalizeName(alt)));
  }
  return names;
}

let fixedCount = 0;

chars.forEach(c => {
  if (EXPLICIT_OVERRIDES[c.id]) {
    if (c.avatar !== EXPLICIT_OVERRIDES[c.id]) {
      console.log(`[OVERRIDE FIX] ${c.id} (${c.name}): ${c.avatar} -> ${EXPLICIT_OVERRIDES[c.id]}`);
      c.avatar = EXPLICIT_OVERRIDES[c.id];
      fixedCount++;
    }
    return;
  }

  const cNorm = normalizeName(c.name);
  // Also try clean name without nicknames like (Seraphim) or (Sparking Red) or (Barba Branca)
  const cClean = normalizeName(c.name.split('(')[0]);

  // Find exact match in AniList
  let match = anilistAll.find(node => {
    const nodeNames = getAniListNames(node);
    return nodeNames.includes(cNorm) || nodeNames.includes(cClean);
  });

  if (match && match.image && match.image.large) {
    if (c.avatar !== match.image.large) {
      console.log(`[MATCH UPDATE] ${c.id} (${c.name}): ${c.avatar} -> ${match.image.large}`);
      c.avatar = match.image.large;
      fixedCount++;
    }
  } else {
    console.log(`[NO EXACT MATCH IN 750 LIST] ${c.id} (${c.name}) keeping current avatar: ${c.avatar}`);
  }
});

fs.writeFileSync(opPath, JSON.stringify(chars, null, 2));
console.log(`Total avatars updated/verified: ${fixedCount}`);
