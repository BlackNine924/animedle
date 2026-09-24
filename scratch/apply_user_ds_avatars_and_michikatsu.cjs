const fs = require('fs');

const dsPath = 'src/data/animes/demon-slayer/characters.json';
const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

// Exact user provided URLs
const USER_DS_AVATARS = {
  'koyuki': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTonorBRO31WjYl3kTAzQr_y-Nl38OaBKB2D0IKMC6A90nRFdc759c0IR6W&s=10',
  'aizetsu': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCk4Vj-MhUEKQlo8ajMoLp-9ZeyHzWDlt9QOKelfK5BiTTx_y4B2byYTY&s=10',
  'kaigaku-demon': 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/6/6e/Kaigaku_claims_those_who_value_his_worth_matter.png/revision/latest?cb=20251030163105',
  'karaku': 'https://preview.redd.it/what-type-of-pleasure-is-karaku-v0-qoaq5p3mxxwe1.jpg?width=319&format=pjpg&auto=webp&s=39a39cc4d61df943cb1bc9384db9597a375db16f',
  'nezuko-kamado-human': 'https://i.pinimg.com/736x/a5/9d/2f/a59d2faa0197ba1254d21003d567b9a4.jpg',
  'nezuko-kamado-demon': 'https://i.pinimg.com/564x/d8/6a/e1/d86ae19c17d7cfa472ffb506ab36f1d0.jpg',
  'sekido': 'https://i.pinimg.com/236x/f2/90/5a/f2905a1ded96fa71a6aea746f9a76a10.jpg',
  'tanjiro-kamado-demon-king': 'https://i.pinimg.com/736x/4a/24/86/4a2486220d43f817e9319d761abfb720.jpg',
  'urogi': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw49RYiKGm5ZhYjbA1__T8PXH57PPyEglHpPHK7Z_mRNoH9gevWdcQJgiC&s=10',
  'zohakuten': 'https://i.scdn.co/image/ab67616d00001e025adf311de25e4bd643c2c697'
};

// Apply avatar overrides
chars.forEach(c => {
  if (USER_DS_AVATARS[c.id]) {
    c.avatar = USER_DS_AVATARS[c.id];
    console.log(`✓ Updated avatar for ${c.id}: ${c.avatar}`);
  }
});

// Add Michikatsu Tsugikuni if not present
let michikatsu = chars.find(c => c.id === 'michikatsu-tsugikuni');
if (!michikatsu) {
  michikatsu = {
    id: 'michikatsu-tsugikuni',
    name: 'Michikatsu Tsugikuni',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Caçadores de Demônios', 'Era Sengoku'],
    styleOrPower: 'Respiração da Lua - Quinta Forma: Gekko Shokou',
    ability: 'Corte da Lua Crescente',
    debutArc: 'Castelo Infinito',
    status: 'Falecido',
    avatar: 'https://i.pinimg.com/736x/d1/55/bb/d155bb5711842060309cb13dae39390c.jpg',
    quote: ''
  };
  chars.push(michikatsu);
  console.log('✓ Added Michikatsu Tsugikuni to Demon Slayer dataset!');
} else {
  michikatsu.avatar = 'https://i.pinimg.com/736x/d1/55/bb/d155bb5711842060309cb13dae39390c.jpg';
}

fs.writeFileSync(dsPath, JSON.stringify(chars, null, 2));
console.log('Saved Demon Slayer dataset with user avatars and Michikatsu!');
