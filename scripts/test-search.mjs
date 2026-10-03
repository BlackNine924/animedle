const q = `
query {
  media: Media(search: "Keikenzumi", type: ANIME) {
    characters {
      nodes {
        id
        name { full }
        image { large }
      }
    }
  }
}
`;
fetch('https://graphql.anilist.co', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: q })
}).then(r => r.json()).then(d => {
  console.log('Keikenzumi chars:', d.data?.media?.characters?.nodes);
});
