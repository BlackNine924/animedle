import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targets = [
  // Missing characters
  { search: 'Teach Marshall', id: 'marshall-d-teach' },
  { search: 'Jesus Burgess', id: 'jesus-burgess' },
  { search: 'Shiryu', id: 'shiryu' },
  { search: 'Van Augur', id: 'van-augur' },
  { search: 'Avalo Pizarro', id: 'avalo-pizarro' },
  { search: 'Catarina Devon', id: 'catarina-devon' },
  { search: 'Sanjuan Wolf', id: 'sanjuan-wolf' },
  { search: 'Vasco Shot', id: 'vasco-shot' },
  { search: 'Doc Q', id: 'doc-q' },
  { search: 'Caesar Clown', id: 'caesar-clown' },

  // Broken 43 characters
  { search: 'Morgan', id: 'morgan' },
  { search: 'Jango', id: 'jango' },
  { search: 'Kaku', id: 'kaku' },
  { search: 'Laffitte', id: 'lafitte' },
  { search: 'Killer', id: 'killer' },
  { search: 'Hina', id: 'hina' },
  { search: 'Kaidou', id: 'kaidou' },
  { search: 'Jack', id: 'jack' },
  { search: 'Loki', id: 'loki' },
  { search: 'Vegapunk', id: 'vegapunk' },
  { search: 'Lilith', id: 'lilith' },
  { search: 'S-Hawk', id: 's-hawk' },
  { search: 'S-Snake', id: 's-snake' },
  { search: 'S-Bear', id: 's-bear' },
  { search: 'S-Shark', id: 's-shark' },
  { search: 'Shaka', id: 'shaka' },
  { search: 'Edison', id: 'edison' },
  { search: 'Pythagoras', id: 'pythagoras' },
  { search: 'Atlas', id: 'atlas' },
  { search: 'Jaygarcia Saturn', id: 'jaygarcia-saturn' },
  { search: 'Topman Warcury', id: 'topman-warcury' },
  { search: 'Marcus Mars', id: 'marcus-mars' },
  { search: 'Ethanbaron V. Nusjuro', id: 'ethanbaron-v-nusjuro' },
  { search: 'Shepherd Ju Peter', id: 'shepherd-ju-peter' },
  { search: 'Shiki', id: 'shiki' },
  { search: 'Emet', id: 'emet' },
  { search: 'Figarland Garling', id: 'figarland-garling' },
  { search: 'Edward Weevil', id: 'edward-weevil' },
  { search: 'Buckingham Stussy', id: 'miss-bakkin' },
  { search: 'Issho', id: 'issho-fujitora' },
  { search: 'Aramaki', id: 'aramaki-ryokugyu' },
  { search: 'Doll', id: 'doll' },
  { search: 'Hibari', id: 'hibari' },
  { search: 'Kujaku', id: 'kujaku' },
  { search: 'Prince Grus', id: 'prince-grus' },
  { search: 'Oimo', id: 'oimo' },
  { search: 'Kashi', id: 'kashi' },
  { search: 'Tilestone', id: 'tilestone' },
  { search: 'Charlotte Lola', id: 'lola' },
  { search: 'Sommers', id: 'sommers' },
  { search: 'Ryuma', id: 'ryuma' },
  { search: 'Denjiro', id: 'denjiro' },
  { search: 'Ashura Doji', id: 'ashura-doji' }
];

async function findAniListImages() {
  const query = `
    query ($search: String) {
      Character(search: $search) {
        id
        name {
          full
        }
        image {
          large
        }
      }
    }
  `;

  const results = {};
  for (const item of targets) {
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { search: item.search } })
      });
      const json = await res.json();
      const char = json?.data?.Character;
      if (char && char.image && char.image.large) {
        results[item.id] = {
          name: char.name.full,
          image: char.image.large
        };
        console.log(`✅ [${item.id}] -> ${char.name.full}: ${char.image.large}`);
      } else {
        console.log(`❌ [${item.id}] Não encontrado em AniList: ${item.search}`);
      }
    } catch (e) {
      console.log(`⚠️ [${item.id}] Erro:`, e.message);
    }
    await new Promise(r => setTimeout(r, 400));
  }

  fs.writeFileSync(path.resolve(__dirname, 'op-resolved-avatars.json'), JSON.stringify(results, null, 2));
  console.log(`Salvo em scripts/op-resolved-avatars.json com ${Object.keys(results).length} resoluções.`);
}

findAniListImages();
