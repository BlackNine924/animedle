const fs = require('fs');

async function fix15BrokenDS() {
  const dsPath = 'src/data/animes/demon-slayer/characters.json';
  const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

  const brokenIds = [
    'tanjiro-kamado-human',
    'tanjiro-kamado-demon-king',
    'jigoro-kuwajima',
    'aizetsu',
    'zohakuten',
    'temple-demon',
    'hand-demon',
    'swamp-demon',
    'mother-spider-demon',
    'father-spider-demon',
    'shinjuro-rengoku',
    'suma',
    'keizo',
    'koyuki',
    'hairo'
  ];

  // Specific query terms for AniList search API
  const SEARCH_MAP = {
    'tanjiro-kamado-human': 'Tanjirou Kamado',
    'tanjiro-kamado-demon-king': 'Tanjirou Kamado',
    'jigoro-kuwajima': 'Jigorou Kuwajima',
    'aizetsu': 'Aizetsu',
    'zohakuten': 'Zohakuten',
    'temple-demon': 'Temple Demon',
    'hand-demon': 'Hand Demon',
    'swamp-demon': 'Swamp Demon',
    'mother-spider-demon': 'Mother Spider Demon',
    'father-spider-demon': 'Father Spider Demon',
    'shinjuro-rengoku': 'Shinjurou Rengoku',
    'suma': 'Suma',
    'keizo': 'Keizou',
    'koyuki': 'Koyuki',
    'hairo': 'Hairo'
  };

  const query = `
    query ($search: String) {
      Character(search: $search) {
        id
        name { full }
        image { large }
      }
    }
  `;

  for (let id of brokenIds) {
    const term = SEARCH_MAP[id] || id;
    console.log(`Searching AniList for: ${term}...`);
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { search: term } })
      });
      const data = await res.json();
      if (data.data && data.data.Character && data.data.Character.image) {
        const imageUrl = data.data.Character.image.large;
        // Verify HEAD 200 OK
        const headRes = await fetch(imageUrl, { method: 'HEAD' });
        if (headRes.status === 200) {
          const char = chars.find(c => c.id === id);
          if (char) {
            console.log(`✓ [200 OK FIXED] ${id}: ${imageUrl}`);
            char.avatar = imageUrl;
          }
        } else {
          console.error(`❌ HEAD returned ${headRes.status} for ${id}: ${imageUrl}`);
        }
      } else {
        console.error(`❌ Search returned no character for ${term}`);
      }
    } catch (e) {
      console.error(`Error searching for ${term}:`, e);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync(dsPath, JSON.stringify(chars, null, 2));
  console.log('Finished 15 broken avatars fix!');
}

fix15BrokenDS().catch(console.error);
