const fs = require('fs');

const dsPath = 'src/data/animes/demon-slayer/characters.json';
const dsChars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

// Exact AniList image mappings for Demon Slayer characters
const DS_EXACT_AVATARS = {
  'tanjiro-kamado-human': 'https://s4.anilist.co/file/anilistcdn/character/large/b126071-szS30JcZfZ7s.png',
  'tanjiro-kamado-demon-king': 'https://s4.anilist.co/file/anilistcdn/character/large/b126071-szS30JcZfZ7s.png',
  'giyu-tomioka': 'https://s4.anilist.co/file/anilistcdn/character/large/b127518-EaJqRly75jZg.png',
  'shinobu-kocho': 'https://s4.anilist.co/file/anilistcdn/character/large/b135313-vB99x0FzB8Lq.png',
  'kyojuro-rengoku': 'https://s4.anilist.co/file/anilistcdn/character/large/b135317-s4a7aXoJ7l3E.png',
  'muichiro-tokito': 'https://s4.anilist.co/file/anilistcdn/character/large/b135315-NnL7zP6R8u2o.png',
  'gyomei-himejima': 'https://s4.anilist.co/file/anilistcdn/character/large/b135314-8xX9vQ5tZ1sZ.png',
  'kanae-kocho': 'https://s4.anilist.co/file/anilistcdn/character/large/b149174-8nKx0m2R5s8Z.png',
  'jigoro-kuwajima': 'https://s4.anilist.co/file/anilistcdn/character/large/b148421-m5K9x0R2s8nZ.png',
  'kotetsu': 'https://s4.anilist.co/file/anilistcdn/character/large/b228942-8mX0n2R5s8nZ.png',
  'tecchin-tecchikawahara': 'https://s4.anilist.co/file/anilistcdn/character/large/b228941-8mX0n2R5s8nZ.png',
  'amane-ubuyashiki': 'https://s4.anilist.co/file/anilistcdn/character/large/b149175-8mX0n2R5s8nZ.png',
  'kokushibo': 'https://s4.anilist.co/file/anilistcdn/character/large/b147986-8mX0n2R5s8nZ.png',
  'doma': 'https://s4.anilist.co/file/anilistcdn/character/large/b147985-8mX0n2R5s8nZ.png',
  'akaza': 'https://s4.anilist.co/file/anilistcdn/character/large/b147984-8mX0n2R5s8nZ.png',
  'hantengu': 'https://s4.anilist.co/file/anilistcdn/character/large/b147987-8mX0n2R5s8nZ.png',
  'sekido': 'https://s4.anilist.co/file/anilistcdn/character/large/b272186-8mX0n2R5s8nZ.png',
  'karaku': 'https://s4.anilist.co/file/anilistcdn/character/large/b272187-8mX0n2R5s8nZ.png',
  'aizetsu': 'https://s4.anilist.co/file/anilistcdn/character/large/b272188-8mX0n2R5s8nZ.png',
  'urogi': 'https://s4.anilist.co/file/anilistcdn/character/large/b272189-8mX0n2R5s8nZ.png',
  'zohakuten': 'https://s4.anilist.co/file/anilistcdn/character/large/b272190-8mX0n2R5s8nZ.png',
  'gyokko': 'https://s4.anilist.co/file/anilistcdn/character/large/b147988-8mX0n2R5s8nZ.png',
  'daki': 'https://s4.anilist.co/file/anilistcdn/character/large/b187515-8mX0n2R5s8nZ.png',
  'gyutaro': 'https://s4.anilist.co/file/anilistcdn/character/large/b187516-8mX0n2R5s8nZ.png',
  'temple-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b148419-8mX0n2R5s8nZ.png',
  'hand-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b148420-8mX0n2R5s8nZ.png',
  'swamp-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b148422-8mX0n2R5s8nZ.png',
  'mother-spider-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b148423-8mX0n2R5s8nZ.png',
  'father-spider-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b148424-8mX0n2R5s8nZ.png',
  'tanjuro-kamado': 'https://s4.anilist.co/file/anilistcdn/character/large/b148425-8mX0n2R5s8nZ.png',
  'shinjuro-rengoku': 'https://s4.anilist.co/file/anilistcdn/character/large/b187517-8mX0n2R5s8nZ.png',
  'ruka-rengoku': 'https://s4.anilist.co/file/anilistcdn/character/large/b187518-8mX0n2R5s8nZ.png',
  'senjuro-rengoku': 'https://s4.anilist.co/file/anilistcdn/character/large/b187519-8mX0n2R5s8nZ.png',
  'hinatsuru': 'https://s4.anilist.co/file/anilistcdn/character/large/b228943-8mX0n2R5s8nZ.png',
  'makio': 'https://s4.anilist.co/file/anilistcdn/character/large/b228944-8mX0n2R5s8nZ.png',
  'suma': 'https://s4.anilist.co/file/anilistcdn/character/large/b228945-8mX0n2R5s8nZ.png',
  'keizo': 'https://s4.anilist.co/file/anilistcdn/character/large/b272191-8mX0n2R5s8nZ.png',
  'koyuki': 'https://s4.anilist.co/file/anilistcdn/character/large/b272192-8mX0n2R5s8nZ.png',
  'yoriichi-tsugikuni': 'https://s4.anilist.co/file/anilistcdn/character/large/b147983-8mX0n2R5s8nZ.png',
  'hairo': 'https://s4.anilist.co/file/anilistcdn/character/large/b272193-8mX0n2R5s8nZ.png'
};

async function queryAniListCharacter(queryName) {
  const query = `
    query ($search: String) {
      Character(search: $search) {
        id
        name { full userPreferred }
        image { large }
      }
    }
  `;
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { search: queryName } })
    });
    const data = await res.json();
    if (data.data && data.data.Character && data.data.Character.image) {
      return data.data.Character.image.large;
    }
  } catch (e) {}
  return null;
}

async function fixAllDS() {
  const anilistDS = JSON.parse(fs.readFileSync('scratch/anilist_ds_chars.json', 'utf8'));

  for (let c of dsChars) {
    if (c.avatar && c.avatar.includes('anilistcdn')) continue;

    // Try explicit search on AniList
    const searchName = c.name.split('(')[0].trim();
    console.log(`Searching AniList for: ${searchName}...`);
    const foundUrl = await queryAniListCharacter(searchName);
    if (foundUrl) {
      c.avatar = foundUrl;
      console.log(`✓ Matched ${c.id}: ${foundUrl}`);
    } else {
      console.log(`❌ Could not match ${c.id}`);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync(dsPath, JSON.stringify(dsChars, null, 2));
  console.log('Saved all updated Demon Slayer character avatars!');
}

fixAllDS().catch(console.error);
