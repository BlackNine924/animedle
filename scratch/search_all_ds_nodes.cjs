const fs = require('fs');

async function searchMedia145139() {
  // 145139 is Swordsmith Village Arc
  const query = `
    query {
      Media(id: 145139) {
        characters(page: 1, perPage: 50) {
          nodes {
            id
            name { full userPreferred native alternative }
            image { large }
          }
        }
      }
    }
  `;

  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  if (data.data && data.data.Media) {
    console.log('=== SWORDSMITH VILLAGE ARC CHARACTERS ===');
    data.data.Media.characters.nodes.forEach(c => {
      console.log(`ID ${c.id}: ${c.name.full} (${(c.name.alternative || []).join(', ')}) -> ${c.image.large}`);
    });
  }
}

searchMedia145139().catch(console.error);
