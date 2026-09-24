const fs = require('fs');

// 1. FIX ONE PIECE CHARACTERS DATA
const opPath = 'src/data/animes/one-piece/characters.json';
const opChars = JSON.parse(fs.readFileSync(opPath, 'utf8'));

// Exact corrections for One Piece characters with fruits, names, etc.
const OP_CORRECTIONS = {
  'sakazuki': {
    name: 'Sakazuki (Akainu)',
    fruitType: 'Logia',
    styleOrPower: 'Logia (Magu Magu no Mi)'
  },
  'borsalino': {
    name: 'Borsalino (Kizaru)',
    fruitType: 'Logia',
    styleOrPower: 'Logia (Pika Pika no Mi)'
  },
  'kuzan': {
    name: 'Kuzan (Aokiji)',
    fruitType: 'Logia',
    styleOrPower: 'Logia (Hie Hie no Mi)'
  },
  'teach-marshall': {
    name: 'Marshall D. Teach (Barba Negra)',
    fruitType: 'Logia & Paramecia',
    styleOrPower: 'Logia & Paramecia (Yami Yami no Mi & Gura Gura no Mi)'
  },
  'marshall-d-teach': {
    name: 'Marshall D. Teach (Barba Negra)',
    fruitType: 'Logia & Paramecia',
    styleOrPower: 'Logia & Paramecia (Yami Yami no Mi & Gura Gura no Mi)'
  },
  'shiki': {
    name: 'Shiki Leão Dourado',
    fruitType: 'Paramecia',
    styleOrPower: 'Paramecia (Fuwa Fuwa no Mi)'
  },
  's-bear': {
    fruitType: 'Paramecia',
    styleOrPower: 'Paramecia (Nikyu Nikyu no Mi Replicada)'
  },
  's-shark': {
    fruitType: 'Paramecia',
    styleOrPower: 'Paramecia (Sui Sui no Mi Replicada)'
  },
  'charlotte-oven': {
    fruitType: 'Paramecia',
    styleOrPower: 'Paramecia (Netsu Netsu no Mi)'
  },
  'charlotte-brulee': {
    fruitType: 'Paramecia',
    styleOrPower: 'Paramecia (Mira Mira no Mi)'
  },
  'charlotte-galette': {
    fruitType: 'Paramecia',
    styleOrPower: 'Paramecia (Bata Bata no Mi)'
  },
  'charlotte-mont-dor': {
    fruitType: 'Paramecia',
    styleOrPower: 'Paramecia (Hon Hon no Mi)'
  },
  'jaygarcia-saturn': {
    fruitType: 'Zoan Mítica',
    styleOrPower: 'Zoan Mítica (Gyuki / Ushi-Oni)'
  },
  'topman-warcury': {
    fruitType: 'Zoan Mítica',
    styleOrPower: 'Zoan Mítica (Fengxi)'
  },
  'marcus-mars': {
    fruitType: 'Zoan Mítica',
    styleOrPower: 'Zoan Mítica (Itsumade)'
  },
  'ethanbaron-v-nusjuro': {
    fruitType: 'Zoan Mítica',
    styleOrPower: 'Zoan Mítica (Bakotsu)'
  },
  'shepherd-ju-peter': {
    fruitType: 'Zoan Mítica',
    styleOrPower: 'Zoan Mítica (Verme de Areia)'
  },
  'figarland-garling': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' },
  'emet': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' },
  'gunko': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' },
  'shamrock': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' },
  'king-harold': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' },
  'scopper-gaban': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' },
  'shaka': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' },
  'edison': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' },
  'pythagoras': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' },
  'york': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' },
  'sommers': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' },
  'killingham': { fruitType: 'Nenhuma', styleOrPower: 'Nenhum' }
};

let opFixedCount = 0;
opChars.forEach(c => {
  if (OP_CORRECTIONS[c.id]) {
    Object.assign(c, OP_CORRECTIONS[c.id]);
    opFixedCount++;
  } else {
    // Ensure no undefined fruitType or styleOrPower remains
    if (!c.fruitType) c.fruitType = 'Nenhuma';
    if (!c.styleOrPower) c.styleOrPower = 'Nenhum';
  }
});

fs.writeFileSync(opPath, JSON.stringify(opChars, null, 2));
console.log(`✓ Updated One Piece dataset: ${opFixedCount} character fruit data corrected!`);

// 2. FIX JUJUTSU KAISEN DOMAIN EXPANSION KEYS
const jjkPath = 'src/data/animes/jujutsu-kaisen/characters.json';
const jjkChars = JSON.parse(fs.readFileSync(jjkPath, 'utf8'));
let jjkFixedCount = 0;

jjkChars.forEach(c => {
  if (c.domainExpansion === undefined) {
    c.domainExpansion = null;
    jjkFixedCount++;
  }
});

fs.writeFileSync(jjkPath, JSON.stringify(jjkChars, null, 2));
console.log(`✓ Updated Jujutsu Kaisen dataset: ${jjkFixedCount} undefined domainExpansion keys set to null!`);
