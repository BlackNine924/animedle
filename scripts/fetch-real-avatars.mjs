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

const directUrls = [
  {
    name: 'Patty (One Piece)',
    url: 'https://static.wikia.nocookie.net/onepiece/images/4/41/Patty_Anime_Pre_Timeskip_Infobox.png',
    dest: 'public/avatars/one-piece/patty.png'
  },
  {
    name: 'Carne (One Piece)',
    url: 'https://static.wikia.nocookie.net/onepiece/images/a/a2/Carne_Anime_Pre_Timeskip_Infobox.png',
    dest: 'public/avatars/one-piece/carne.png'
  },
  {
    name: 'Kaiju No. 9',
    url: 'https://static.wikia.nocookie.net/kaijuno8/images/b/b2/Kaiju_No._9_Manga_Infobox.png',
    dest: 'public/avatars/kaiju-no-8/kaiju-no-9.png'
  },
  {
    name: 'Kaiju No. 10',
    url: 'https://static.wikia.nocookie.net/kaijuno8/images/3/3b/Kaiju_No._10_Manga_Infobox.png',
    dest: 'public/avatars/kaiju-no-8/kaiju-no-10.png'
  },
  {
    name: 'Sasaran (Witch Hat)',
    url: 'https://static.wikia.nocookie.net/witch-hat-atelier/images/0/05/Sasaran_Infobox.png',
    dest: 'public/avatars/witch-hat-atelier/sasaran.png'
  },
  {
    name: 'Kazuki Mikadono',
    url: 'https://static.wikia.nocookie.net/mikadono-sanshimai-wa-angai-choroi/images/9/90/Kazuki_Mikadono_Infobox.png',
    dest: 'public/avatars/romance/kazuki-mikadono.png'
  },
  {
    name: 'Miwa Mikadono',
    url: 'https://static.wikia.nocookie.net/mikadono-sanshimai-wa-angai-choroi/images/1/18/Miwa_Mikadono_Infobox.png',
    dest: 'public/avatars/romance/miwa-mikadono.png'
  }
];

const anilistLookups = [
  { search: 'Ganju Shiba', dest: 'public/avatars/bleach/ganju-shiba.png' },
  { search: 'Kuukaku Shiba', fallback: 'Kukaku Shiba', dest: 'public/avatars/bleach/kukaku-shiba.png' },
  { search: 'Stoltz', dest: 'public/avatars/frieren/stoltz.png' },
  { search: 'Kouta Izumi', fallback: 'Kota Izumi', dest: 'public/avatars/my-hero-academia/kota-izumi.png' },
  { search: 'Ken Takagi', fallback: 'Rock Lock', dest: 'public/avatars/my-hero-academia/rock-lock.png' },
  { search: 'Sekijirou Kan', fallback: 'Vlad King', dest: 'public/avatars/my-hero-academia/vlad-king.png' },
  { search: 'Buchi', dest: 'public/avatars/one-piece/buchi.png' },
  { search: 'Nezumi', dest: 'public/avatars/one-piece/capitao-nezumi.png' },
  { search: 'Chaka', dest: 'public/avatars/one-piece/chaka.png' },
  { search: 'Kokoro', dest: 'public/avatars/one-piece/kokoro.png' },
  { search: 'Koza', dest: 'public/avatars/one-piece/koza.png' },
  { search: 'Yasuie Shimotsuki', fallback: 'Tonoyasu', dest: 'public/avatars/one-piece/yasuie.png' },
  { search: 'Ako Tamaki', dest: 'public/avatars/romance/ako-tamaki.png' },
  { search: 'Arata Shiunji', dest: 'public/avatars/romance/arata-shiunji.png' },
  { search: 'Atsushi Ootani', dest: 'public/avatars/romance/atsushi-ootani.png' },
  { search: 'Banri Shiunji', dest: 'public/avatars/romance/banri-shiunji.png' },
  { search: 'Carol Olston', dest: 'public/avatars/romance/carol-olston.png' },
  { search: 'Maki Gamou', dest: 'public/avatars/romance/maki-gamou.png' },
  { search: 'Medaka Kuroiwa', dest: 'public/avatars/romance/medaka-kuroiwa.png' },
  { search: 'Misuzu Gundou', dest: 'public/avatars/romance/misuzu-gundou.png' },
  { search: 'Mona Kawai', dest: 'public/avatars/romance/mona-kawai.png' },
  { search: 'Ouka Shiunji', dest: 'public/avatars/romance/ouka-shiunji.png' },
  { search: 'Runa Shirakawa', dest: 'public/avatars/romance/runa-shirakawa.png' },
  { search: 'Ryuuto Kashima', dest: 'public/avatars/romance/ryuuto-kashima.png' },
  { search: 'Shino Kiryuu', dest: 'public/avatars/romance/shino-kiryuu.png' }
];

async function processImage(buffer, dest) {
  const processed = await sharp(buffer)
    .resize(240, 240, { fit: 'cover', position: 'top' })
    .png({ quality: 95 })
    .toBuffer();
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, processed);
}

async function fetchFromAniList(search) {
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ query, variables: { search } })
    });
    const json = await res.json();
    return json?.data?.Character?.image?.large || null;
  } catch (e) {
    return null;
  }
}

async function run() {
  console.log('Downloading direct avatars...');
  for (const item of directUrls) {
    try {
      const res = await fetch(item.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        await processImage(buf, item.dest);
        console.log(`[OK Direct] ${item.name} -> ${item.dest}`);
      } else {
        console.log(`[WARN Direct] HTTP ${res.status} for ${item.name}`);
      }
    } catch (e) {
      console.log(`[ERR Direct] ${item.name}: ${e.message}`);
    }
  }

  console.log('\nDownloading AniList avatars...');
  for (const item of anilistLookups) {
    let imgUrl = await fetchFromAniList(item.search);
    if (!imgUrl && item.fallback) {
      imgUrl = await fetchFromAniList(item.fallback);
    }

    if (imgUrl) {
      try {
        const res = await fetch(imgUrl);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          await processImage(buf, item.dest);
          console.log(`[OK AniList] ${item.search} -> ${item.dest}`);
        }
      } catch (e) {
        console.log(`[ERR AniList download] ${item.search}: ${e.message}`);
      }
    } else {
      console.log(`[NOT FOUND] ${item.search}`);
    }
    // Respect rate limit
    await new Promise((r) => setTimeout(r, 400));
  }
}

run();
