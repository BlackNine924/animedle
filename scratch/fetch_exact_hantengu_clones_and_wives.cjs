const fs = require('fs');

async function fetchExactClones() {
  const charSearches = {
    'daki': 'Daki',
    'karaku': 'Karaku',
    'sekido': 'Sekido',
    'urogi': 'Urogi',
    'aizetsu': 'Aizetsu',
    'zohakuten': 'Zohakuten',
    'makio': 'Makio',
    'suma': 'Suma',
    'hinatsuru': 'Hinatsuru',
    'hairo': 'Hairo'
  };

  const query = `
    query ($search: String) {
      Page(page: 1, perPage: 10) {
        characters(search: $search) {
          id
          name { full userPreferred native }
          image { large }
          media {
            nodes {
              title { userPreferred }
            }
          }
        }
      }
    }
  `;

  for (let [charKey, searchName] of Object.entries(charSearches)) {
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { search: searchName } })
      });
      const data = await res.json();
      if (data.data && data.data.Page && data.data.Page.characters) {
        const nodes = data.data.Page.characters;
        const dsMatch = nodes.find(n => {
          const titles = n.media.nodes.map(m => m.title.userPreferred.toLowerCase());
          return titles.some(t => t.includes('kimetsu') || t.includes('demon slayer'));
        });
        if (dsMatch) {
          console.log(`✓ [DS MATCH] ${charKey} -> ${dsMatch.name.full} (ID ${dsMatch.id}): ${dsMatch.image.large}`);
        } else {
          console.log(`❌ [NO DS MATCH] ${charKey} (nodes found: ${nodes.map(n => n.name.full).join(', ')})`);
        }
      }
    } catch (e) {
      console.error(e);
    }
    await new Promise(r => setTimeout(r, 200));
  }
}

fetchExactClones().catch(console.error);
