import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targets = [
  { search: 'Patty', animeMatch: 'ONE PIECE', dest: 'public/avatars/one-piece/patty.png' },
  { search: 'Carne', animeMatch: 'ONE PIECE', dest: 'public/avatars/one-piece/carne.png' },
  { search: 'Maki Gamou', animeMatch: 'Nagatoro', dest: 'public/avatars/romance/maki-gamou.png' },
  { search: 'Kaijuu 9-gou', fallback: 'Kaiju No. 9', animeMatch: 'Kaiju', dest: 'public/avatars/kaiju-no-8/kaiju-no-9.png' },
  { search: 'Kaijuu 10-gou', fallback: 'Kaiju No. 10', animeMatch: 'Kaiju', dest: 'public/avatars/kaiju-no-8/kaiju-no-10.png' },
  { search: 'Sasaran', animeMatch: 'Tongari', dest: 'public/avatars/witch-hat-atelier/sasaran.png' },
  { search: 'Kazuki Mikadono', animeMatch: 'Mikadono', dest: 'public/avatars/romance/kazuki-mikadono.png' },
  { search: 'Miwa Mikadono', animeMatch: 'Mikadono', dest: 'public/avatars/romance/miwa-mikadono.png' },
];

const q = `
query ($search: String) {
  Page(page: 1, perPage: 10) {
    characters(search: $search) {
      id
      name { full }
      media(type: ANIME) {
        nodes {
          title { romaji english }
        }
      }
      image { large }
    }
  }
}
`;

async function downloadAvatar(target) {
  try {
    let res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q, variables: { search: target.search } })
    });
    let d = await res.json();
    let chars = d?.data?.Page?.characters || [];
    let match = chars.find(c => {
      const titles = c.media?.nodes?.map(n => `${n.title.romaji || ''} ${n.title.english || ''}`).join(' ') || '';
      return titles.toLowerCase().includes(target.animeMatch.toLowerCase());
    });

    if (!match && target.fallback) {
      res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, variables: { search: target.fallback } })
      });
      d = await res.json();
      chars = d?.data?.Page?.characters || [];
      match = chars.find(c => {
        const titles = c.media?.nodes?.map(n => `${n.title.romaji || ''} ${n.title.english || ''}`).join(' ') || '';
        return titles.toLowerCase().includes(target.animeMatch.toLowerCase());
      });
    }

    if (!match && chars.length > 0) {
      match = chars[0];
    }

    if (match && match.image?.large) {
      console.log(`Matched ${target.search} -> ${match.name.full} (${match.image.large})`);
      const imgRes = await fetch(match.image.large);
      const buf = Buffer.from(await imgRes.arrayBuffer());
      const processed = await sharp(buf)
        .resize(240, 240, { fit: 'cover', position: 'top' })
        .png({ quality: 95 })
        .toBuffer();
      fs.mkdirSync(path.dirname(target.dest), { recursive: true });
      fs.writeFileSync(target.dest, processed);
      console.log(`[SAVED] ${target.dest} (${processed.length} bytes)`);
    } else {
      console.log(`[NOT FOUND] ${target.search}`);
    }
  } catch (e) {
    console.error(`[ERROR] ${target.search}:`, e.message);
  }
}

async function run() {
  for (const t of targets) {
    await downloadAvatar(t);
    await new Promise(r => setTimeout(r, 400));
  }
}

run();
