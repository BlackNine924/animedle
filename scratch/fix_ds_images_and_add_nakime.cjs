const fs = require('fs');

const dsPath = 'src/data/animes/demon-slayer/characters.json';
const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

// 1. Add Nakime if not present
let nakime = chars.find(c => c.id === 'nakime');
if (!nakime) {
  nakime = {
    id: 'nakime',
    name: 'Nakime (Lua Superior 4)',
    gender: 'Feminino',
    species: 'Oni',
    affiliation: ['Doze Kizuki', 'Luas Superiores'],
    styleOrPower: 'Kekkijutsu (Manipulação do Castelo Infinito)',
    ability: 'Kekkijutsu: Controle Espacial e Biwa de Portal',
    debutArc: 'Trem Infinito',
    status: 'Falecido',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b89019-sH6Zg8rpfPWD.png',
    quote: ''
  };
  chars.push(nakime);
  console.log('✓ Added Nakime to Demon Slayer dataset!');
} else {
  nakime.avatar = 'https://s4.anilist.co/file/anilistcdn/character/large/b89019-sH6Zg8rpfPWD.png';
}

// 2. Exact Avatar Mappings for Demon Slayer Characters
const EXACT_DS_AVATARS = {
  'nakime': 'https://s4.anilist.co/file/anilistcdn/character/large/b89019-sH6Zg8rpfPWD.png',
  'doma': 'https://s4.anilist.co/file/anilistcdn/character/large/b139736-CrfqAqlktDTP.png',
  'giyu-tomioka': 'https://s4.anilist.co/file/anilistcdn/character/large/b127518-EaJqRly75jZg.png',
  'gyomei-himejima': 'https://s4.anilist.co/file/anilistcdn/character/large/b135314-8xX9vQ5tZ1sZ.png',
  'daki': 'https://s4.anilist.co/file/anilistcdn/character/large/b139733-vB99x0FzB8Lq.png',
  'kaigaku-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b165862-G9PpuvlEsfdN.jpg',
  'makio': 'https://s4.anilist.co/file/anilistcdn/character/large/b227181-WuRvetNXkHiF.png',
  'suma': 'https://s4.anilist.co/file/anilistcdn/character/large/b227182-WuRvetNXkHiF.png',
  'nezuko-kamado-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b126072-aXvT6X61xHnK.png',
  'tanjiro-kamado-demon-king': 'https://s4.anilist.co/file/anilistcdn/character/large/b126071-szS30JcZfZ7s.png',
  'tanjuro-kamado': 'https://s4.anilist.co/file/anilistcdn/character/large/b139037-fKj5Qx2vB9Lq.png',
  'mother-spider-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b149176-YmIZQzx1HdvY.png',
  'father-spider-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b149177-YmIZQzx1HdvY.png',
  'karaku': 'https://s4.anilist.co/file/anilistcdn/character/large/b272671-YmIZQzx1HdvY.png',
  'sekido': 'https://s4.anilist.co/file/anilistcdn/character/large/b272670-YmIZQzx1HdvY.png',
  'urogi': 'https://s4.anilist.co/file/anilistcdn/character/large/b272673-H4U97bsHIJyR.png',
  'aizetsu': 'https://s4.anilist.co/file/anilistcdn/character/large/b272672-YmIZQzx1HdvY.png',
  'zohakuten': 'https://s4.anilist.co/file/anilistcdn/character/large/b272674-YmIZQzx1HdvY.png',
  'hairo': 'https://s4.anilist.co/file/anilistcdn/character/large/b149170-8xX9vQ5tZ1sZ.png'
};

chars.forEach(c => {
  if (EXACT_DS_AVATARS[c.id]) {
    c.avatar = EXACT_DS_AVATARS[c.id];
  }
});

fs.writeFileSync(dsPath, JSON.stringify(chars, null, 2));
console.log('Saved DS characters with Nakime and exact avatar corrections!');
