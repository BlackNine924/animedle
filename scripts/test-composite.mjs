import sharp from 'sharp';
import fs from 'fs';

const defaultHeaders = { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://please-dont-bully-me-nagatoro.fandom.com/' };

async function makeNagatoro() {
  const bgUrl = 'https://static.wikia.nocookie.net/please-dont-bully-me-nagatoro/images/f/fa/The_President_enjoy_the_atmosphere_of_the_art_club_room_for_the_last_time_feeling_it_on_her_skin.jpg/revision/latest?cb=20201026195614';
  const rBg = await fetch(bgUrl, { headers: defaultHeaders });
  const bufBg = Buffer.from(await rBg.arrayBuffer());

  const bgResized = await sharp(bufBg)
    .resize(240, 240, { fit: 'cover' })
    .blur(1) // slight blur for portrait depth of field
    .toBuffer();

  const nagatoroHead = await sharp('scripts/nagatoro-headshot-raw.png')
    .extract({ left: 130, top: 25, width: 280, height: 280 })
    .resize(240, 240)
    .toBuffer();

  await sharp(bgResized)
    .composite([{ input: nagatoroHead, blend: 'over' }])
    .png()
    .toFile('public/avatars/romance/hayase-nagatoro.png');

  console.log('[PERFECT COMPOSITE] hayase-nagatoro created with anime background!');
}

makeNagatoro();
