import fs from 'fs';
import path from 'path';

const list = [
  { id: 'taiki-inomata', search: 'Taiki Inomata' },
  { id: 'hina-chono', search: 'Hina Chouno' },
  { id: 'kyo-kasahara', search: 'Kyou Kasahara' },
  { id: 'karen-matsuoka', search: 'Karen Moriya' },
  { id: 'shino-kiryuu', search: 'Shino Kiryuu' },
  { id: 'minami-fuyuki', search: 'Minami Fuyuki' },
  { id: 'sayuri-akino', search: 'Sayuri Akino' },
  { id: 'rena-natsukawa', search: 'Rena Natsukawa' },
  { id: 'miwa-mikadono', search: 'Miwa Mikadono' },
  { id: 'niko-mikadono', search: 'Niko Mikadono' },
  { id: 'kazuki-mikadono', search: 'Kazuki Mikadono' },
  { id: 'medaka-kuroiwa', search: 'Medaka Kuroiwa' },
  { id: 'mona-kawai', search: 'Mona Kawai' },
  { id: 'runa-shirakawa', search: 'Runa Shirakawa' },
  { id: 'yuu-natsume', search: 'Yuu Natsume' }
];

fs.mkdirSync('scripts/temp-romance/raw', { recursive: true });

async function run() {
  for (const item of list) {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query ($search: String) { Character(search: $search) { id name { full } image { large } } }`,
        variables: { search: item.search }
      })
    });
    const data = await res.json();
    const url = data.data?.Character?.image?.large;
    console.log(item.id, '->', url);
    if (url) {
      const imgRes = await fetch(url);
      const buf = Buffer.from(await imgRes.arrayBuffer());
      fs.writeFileSync(`scripts/temp-romance/raw/${item.id}.jpg`, buf);
    }
  }
}

run();
