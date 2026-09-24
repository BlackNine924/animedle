const fs = require('fs');

const animeIds = [101922, 129874, 142329, 145139, 166240];

const query = `
query ($id: Int) {
  Media(id: $id) {
    title { romaji english }
    characters(perPage: 100) {
      nodes {
        id
        name {
          full
          userPreferred
        }
        image {
          large
        }
      }
    }
  }
}
`;

async function getAllMediaCharacters() {
  const characterMap = new Map();

  for (const id of animeIds) {
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { id } })
      });
      const data = await res.json();
      if (data.data && data.data.Media) {
        const nodes = data.data.Media.characters.nodes;
        nodes.forEach(c => {
          if (!characterMap.has(c.name.userPreferred)) {
            characterMap.set(c.name.userPreferred, c.image.large);
          }
        });
      }
      await new Promise(r => setTimeout(r, 300));
    } catch(e) {
      console.error(e);
    }
  }

  console.log(`Buscados ${characterMap.size} personagens únicos do AniList!`);
  characterMap.forEach((img, name) => {
    console.log(`"${name}" => "${img}"`);
  });
}

getAllMediaCharacters();
