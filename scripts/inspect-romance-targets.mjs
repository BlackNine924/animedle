import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const truncatedList = [
  'hideki-nishimura',
  'yuu-natsume',
  'ryuuto-kashima',
  'ouka-shiunji',
  'carol-olston',
  'sana-sunomiya',
  'minami-fuyuki',
  'tsubasa-shiki',
  'sayuri-akino',
  'rena-natsukawa'
];

const transparentList = [
  'futaro-uesugi',
  'naoto-hachioji',
  'hayase-nagatoro',
  'tohru-honda',
  'kyo-sohma',
  'yuki-sohma',
  'shigure-sohma',
  'goro',
  'mitsuru',
  'futoshi',
  'taiki-inomata',
  'chinatsu-kano',
  'hina-chono',
  'kyo-kasahara',
  'karen-moriya',
  'nagi-umino',
  'erika-amano',
  'sachi-umino',
  'sakura'
];

async function check() {
  const chars = JSON.parse(fs.readFileSync('src/data/animes/romance/characters.json'));
  const charMap = new Map(chars.map(c => [c.id, c]));

  console.log('=== TRUNCATED LIST ===');
  for (const id of truncatedList) {
    const c = charMap.get(id);
    console.log(id, c?.name, c?.works?.[0]);
  }

  console.log('\n=== TRANSPARENT LIST ===');
  for (const id of transparentList) {
    const c = charMap.get(id);
    console.log(id, c?.name, c?.works?.[0]);
  }
}

check();
