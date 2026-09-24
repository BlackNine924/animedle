const fs = require('fs');

async function fetchSpecificDSNodes() {
  const searches = {
    'daki': 'Warabihime',
    'suma': 'Uzui Suma',
    'doma': 'Upper Rank 2',
    'karaku': 'Hantengu Karaku',
    'sekido': 'Hantengu Sekido',
    'urogi': 'Hantengu Urogi',
    'aizetsu': 'Hantengu Aizetsu',
    'zohakuten': 'Hantengu Zohakuten',
    'mother-spider-demon': 'Spider Demon Mother',
    'father-spider-demon': 'Spider Demon Father'
  };

  const query = `
    query ($search: String) {
      Page(page: 1, perPage: 5) {
        characters(search: $search) {
          id
          name { full native userPreferred alternative }
          image { large }
        }
      }
    }
  `;

  for (let [key, term] of Object.entries(searches)) {
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { search: term } })
      });
      const data = await res.json();
      if (data.data && data.data.Page && data.data.Page.characters) {
        console.log(`=== ${key} ("${term}") ===`);
        data.data.Page.characters.forEach(c => {
          console.log(`  ID ${c.id}: ${c.name.full} -> ${c.image.large}`);
        });
      }
    } catch (e) {
      console.error(e);
    }
    await new Promise(r => setTimeout(r, 200));
  }
}

fetchSpecificDSNodes().catch(console.error);
