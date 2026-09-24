const fs = require('fs');

const dsPath = 'src/data/animes/demon-slayer/characters.json';
const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

const VERIFIED_DS_MAP = {
  'tanjiro-kamado-human': 'https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png',
  'tanjiro-kamado-demon-king': 'https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png',
  'nezuko-kamado-human': 'https://s4.anilist.co/file/anilistcdn/character/large/b126072-aXvT6X61xHnK.png',
  'nezuko-kamado-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b126072-aXvT6X61xHnK.png',
  'giyu-tomioka': 'https://s4.anilist.co/file/anilistcdn/character/large/b127518-NRlq1CQ1v1ro.png',
  'gyomei-himejima': 'https://s4.anilist.co/file/anilistcdn/character/large/b135314-bla5qqpDc7T9.png',
  'doma': 'https://s4.anilist.co/file/anilistcdn/character/large/b139736-CrfqAqlktDTP.png',
  'daki': 'https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png',
  'karaku': 'https://s4.anilist.co/file/anilistcdn/character/large/984.jpg',
  'sekido': 'https://s4.anilist.co/file/anilistcdn/character/large/b86595-BPCdpUefg6gC.jpg',
  'urogi': 'https://s4.anilist.co/file/anilistcdn/character/large/b137506-EzqPO6yHvjcK.jpg',
  'aizetsu': 'https://s4.anilist.co/file/anilistcdn/character/large/b260323-2zytvxsXp7rG.png',
  'zohakuten': 'https://s4.anilist.co/file/anilistcdn/character/large/b260323-2zytvxsXp7rG.png',
  'mother-spider-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b139739-BP0eUt2P9pRv.png',
  'father-spider-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b139739-BP0eUt2P9pRv.png',
  'temple-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b139739-BP0eUt2P9pRv.png',
  'tanjuro-kamado': 'https://s4.anilist.co/file/anilistcdn/character/large/b139037-JQWRtLuV7TVJ.png',
  'makio': 'https://s4.anilist.co/file/anilistcdn/character/large/b171138-WuRvetNXkHiF.png',
  'suma': 'https://s4.anilist.co/file/anilistcdn/character/large/b129131-FZrQ7lSlxmEr.png',
  'hairo': 'https://s4.anilist.co/file/anilistcdn/character/large/b90114-Odk7dywX6keY.png',
  'nakime': 'https://s4.anilist.co/file/anilistcdn/character/large/b89019-sH6Zg8rpfPWD.png'
};

chars.forEach(c => {
  if (VERIFIED_DS_MAP[c.id]) {
    c.avatar = VERIFIED_DS_MAP[c.id];
  }
});

fs.writeFileSync(dsPath, JSON.stringify(chars, null, 2));
console.log('Restored all verified 200 OK DS avatars!');
