import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const checks = [
  'taiga-aisaka', 'ryuuji-takasu', 'marin-kitagawa', 'wakana-gojo',
  'mai-sakurajima', 'sakuta-azusagawa', 'kaori-miyazono', 'kousei-arima',
  'sawako-kuronuma', 'shouta-kazehaya', 'anna-yamada', 'kyotaro-ichikawa',
  'nagisa-furukawa', 'tomoya-okazaki', 'zero-two', 'hiro', 'ichigo-franxx',
  'hachiman-hikigaya', 'yukino-yukinoshita', 'yui-yuigahama',
  'chizuru-mizuhara', 'kazuya-kinoshita', 'alya-kujou', 'masachika-kuze',
  'tsukasa-yuzaki', 'nasa-yuzaki', 'akari-watanabe', 'jiro-yakuin',
  'futaro-uesugi', 'miku-nakano', 'nino-nakano', 'yotsuba-nakano', 'ichika-nakano', 'itsuki-nakano'
];

async function checkRomanceHeroes() {
  for (const id of checks) {
    const p = path.resolve('public/avatars/romance', `${id}.png`);
    if (!fs.existsSync(p)) {
      console.log(`[MISSING] ${id}`);
      continue;
    }
    const meta = await sharp(p).metadata();
    const stats = await sharp(p).stats();
    // Check if bottom 30 rows have face/color
    const raw = await sharp(p).raw().toBuffer({ resolveWithObject: true });
    console.log(`${id}: ${meta.width}x${meta.height}, channels: ${meta.channels}, opaque: ${stats.isOpaque}`);
  }
}

checkRomanceHeroes();
