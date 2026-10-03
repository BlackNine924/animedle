async function searchMedia() {
  const query = `query {
    Media(search: "Kaoru Hana wa Rin to Saku") {
      id
      title { romaji english }
      characters {
        edges {
          role
          node {
            id
            name { full }
            image { large }
          }
        }
      }
    }
  }`;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  const edges = data.data?.Media?.characters?.edges || [];
  for (const edge of edges) {
    console.log(edge.node.name.full, '->', edge.role, '->', edge.node.image?.large);
  }
}
searchMedia();
