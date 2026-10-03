const q = `
query {
  Page(page: 1, perPage: 10) {
    characters(search: "Gamo-chan") {
      id
      name { full }
      media(type: ANIME) {
        nodes {
          title { romaji english }
        }
      }
      image { large }
    }
  }
}
`;

fetch('https://graphql.anilist.co', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: q })
}).then(r => r.json()).then(d => {
  const chars = d?.data?.Page?.characters || [];
  for (const c of chars) {
    const titles = c.media?.nodes?.map(n => n.title.romaji || n.title.english).join(', ');
    console.log(c.id, c.name.full, '| Medias:', titles, '| Image:', c.image?.large);
  }
});
