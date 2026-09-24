const fs = require('fs');

const dsPath = 'src/data/animes/demon-slayer/characters.json';
const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

// Exact verified visual avatars for Demon Slayer characters
const EXACT_DS_VISUAL_AVATARS = {
  'nakime': 'https://s4.anilist.co/file/anilistcdn/character/large/b139736-CrfqAqlktDTP.png',
  'doma': 'https://s4.anilist.co/file/anilistcdn/character/large/b144591-v2yrXtHorZFS.png',
  'daki': 'https://s4.anilist.co/file/anilistcdn/character/large/b139734-ZEy1ccFcwjaK.jpg',
  'gyutaro': 'https://s4.anilist.co/file/anilistcdn/character/large/b139735-o4G63Po27zND.png',
  'giyu-tomioka': 'https://s4.anilist.co/file/anilistcdn/character/large/b130050-qsLThJs5VIbz.png',
  'gyomei-himejima': 'https://s4.anilist.co/file/anilistcdn/character/large/b137778-H4Uzb9cSCvZ6.jpg',
  'muichiro-tokito': 'https://s4.anilist.co/file/anilistcdn/character/large/b136069-6PLglx4tETUX.png',
  'mitsuri-kanroji': 'https://s4.anilist.co/file/anilistcdn/character/large/b136072-xVwyRUKdpybi.png',
  'tengen-uzui': 'https://s4.anilist.co/file/anilistcdn/character/large/b136071-99Kexnnn2PiV.png',
  'sanemi-shinazugawa': 'https://s4.anilist.co/file/anilistcdn/character/large/b137774-O1iYrnGLB71l.png',
  'obanai-iguro': 'https://s4.anilist.co/file/anilistcdn/character/large/b137777-kGViiNyx0wa7.jpg',
  'akaza': 'https://s4.anilist.co/file/anilistcdn/character/large/b141694-0COi0GVXPuEn.png',
  'kokushibo': 'https://s4.anilist.co/file/anilistcdn/character/large/b141918-Bfgq88XJFOPz.png',
  'kaigaku-human': 'https://s4.anilist.co/file/anilistcdn/character/large/b165862-G9PpuvlEsfdN.jpg',
  'kaigaku-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b165862-G9PpuvlEsfdN.jpg',
  'mother-spider-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b141692-WQtsdIB6qfUF.png',
  'father-spider-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b141693-18yNfOx3iopF.png',
  'makio': 'https://s4.anilist.co/file/anilistcdn/character/large/b250554-tPaaPn3oAwNf.jpg',
  'suma': 'https://s4.anilist.co/file/anilistcdn/character/large/b250555-WuRvetNXkHiF.png',
  'hinatsuru': 'https://s4.anilist.co/file/anilistcdn/character/large/b250556-tZ6egykZTk4Y.jpg',
  'hairo': 'https://s4.anilist.co/file/anilistcdn/character/large/b194462-1O0lBhOkAvPQ.jpg',
  'nezuko-kamado-human': 'https://s4.anilist.co/file/anilistcdn/character/large/126072-Eg0bMZ2BmF6B.jpg',
  'nezuko-kamado-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/126072-Eg0bMZ2BmF6B.jpg',
  'tanjiro-kamado-human': 'https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png',
  'tanjiro-kamado-demon-king': 'https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png',
  'tanjuro-kamado': 'https://s4.anilist.co/file/anilistcdn/character/large/b206330-dDKOKM4O2pVg.png',
  'sekido': 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/8/8c/Sekido_anime.png/revision/latest?cb=20230423171542',
  'karaku': 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/b/b5/Karaku_anime.png/revision/latest?cb=20230423171610',
  'aizetsu': 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/7/77/Aizetsu_anime.png/revision/latest?cb=20230423171638',
  'urogi': 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/5/53/Urogi_anime.png/revision/latest?cb=20230423171708',
  'zohakuten': 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/d/d4/Zohakuten_anime.png/revision/latest?cb=20230528172015'
};

let appliedCount = 0;
chars.forEach(c => {
  if (EXACT_DS_VISUAL_AVATARS[c.id]) {
    c.avatar = EXACT_DS_VISUAL_AVATARS[c.id];
    appliedCount++;
  }
});

fs.writeFileSync(dsPath, JSON.stringify(chars, null, 2));
console.log(`✓ Applied ${appliedCount} exact visual Demon Slayer character avatars!`);
