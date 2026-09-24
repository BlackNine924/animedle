async function test() {
  const query = `
  query {
    Media(id: 129874) {
      characters(perPage: 50) {
        nodes {
          id
          name { full }
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
  const chars = data.data.Media.characters.nodes;
  chars.forEach(c => {
    console.log(`${c.name.full} => ${c.image.large}`);
  });
}
test();
