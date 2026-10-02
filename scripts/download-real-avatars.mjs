import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const query = `
query ($search: String) {
  Character(search: $search) {
    name { full }
    image { large }
  }
}
`;

const list = [
  { search: 'Fullbody', dest: 'public/avatars/one-piece/fullbody.png' },
  { search: 'Patty One Piece', fallback: 'Patty', dest: 'public/avatars/one-piece/patty.png' },
  { search: 'Carne One Piece', fallback: 'Carne', dest: 'public/avatars/one-piece/carne.png' },
  { search: 'Pearl One Piece', fallback: 'Pearl', dest: 'public/avatars/one-piece/pearl.png' },
  { search: 'Zambai', dest: 'public/avatars/one-piece/zambai.png' },
  { search: 'Hyouzou', dest: 'public/avatars/one-piece/hyouzou.png' },
  { search: 'Hanatarou Yamada', fallback: 'Hanataro Yamada', dest: 'public/avatars/bleach/hanataro-yamada.png' },
  { search: 'Jidanbou Ikkanzaka', fallback: 'Jidanbo', dest: 'public/avatars/bleach/jidanbo-ikkanzaka.png' },
  { search: 'Tessai Tsukabishi', dest: 'public/avatars/bleach/tessai-tsukabishi.png' },
  { search: 'Dordoni Alessandro Del Socaccio', fallback: 'Dordoni', dest: 'public/avatars/bleach/dordoni-alessandro.png' },
  { search: 'Cirucci Sanderwicci', dest: 'public/avatars/bleach/cirucci-sanderwicci.png' },
  { search: 'Ectoplasm', dest: 'public/avatars/my-hero-academia/ectoplasm.png' },
  { search: 'Eri', dest: 'public/avatars/my-hero-academia/eri.png' },
  { search: 'Ryou Inui', fallback: 'Hound Dog', dest: 'public/avatars/my-hero-academia/hound-dog.png' },
  { search: 'Dogged', dest: 'public/avatars/nanatsu-no-taizai/dogged.png' },
  { search: 'Hideki Nishimura', dest: 'public/avatars/romance/hideki-nishimura.png' },
  { search: 'Himari Inuzuka', dest: 'public/avatars/romance/himari-inuzuka.png' },
  { search: 'Niko Mikadono', dest: 'public/avatars/romance/niko-mikadono.png' },
  { search: 'Yosshi', dest: 'public/avatars/romance/yosshi.png' },
  { search: 'Yuu Ayatsuji', dest: 'public/avatars/romance/yuu-ayatsuji.png' },
  { search: 'Yuu Natsume', dest: 'public/avatars/romance/yuu-natsume.png' },
];

async function fetchAvatar(searchStr) {
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ query, variables: { search: searchStr } })
    });
    const json = await res.json();
    return json?.data?.Character?.image?.large || null;
  } catch (e) {
    return null;
  }
}

async function run() {
  for (const item of list) {
    let imgUrl = await fetchAvatar(item.search);
    if (!imgUrl && item.fallback) {
      imgUrl = await fetchAvatar(item.fallback);
    }

    if (imgUrl) {
      try {
        const imgRes = await fetch(imgUrl);
        const buf = Buffer.from(await imgRes.arrayBuffer());
        const processed = await sharp(buf)
          .resize(240, 240, { fit: 'cover', position: 'top' })
          .png({ quality: 95 })
          .toBuffer();

        fs.mkdirSync(path.dirname(item.dest), { recursive: true });
        fs.writeFileSync(item.dest, processed);
        console.log(`[OK] Saved real avatar for ${item.search} -> ${item.dest}`);
      } catch (err) {
        console.error(`[ERR] Failed to process image for ${item.search}:`, err.message);
      }
    } else {
      console.log(`[WARN] No avatar found for ${item.search}`);
    }

    // Rate limit polite delay (400ms)
    await new Promise((r) => setTimeout(r, 400));
  }
}

run().catch(console.error);
