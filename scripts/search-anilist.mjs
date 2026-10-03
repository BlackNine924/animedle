const names = ['Anna Yamada', 'Kyotaro Ichikawa', 'Taiki Inomata', 'Chinatsu Kano', 'Hina Chono'];

for (const name of names) {
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query ($search: String) {
        Character(search: $search) {
          id
          name { full }
          image { large }
          media(type: ANIME, sort: POPULARITY_DESC, perPage: 1) {
            nodes {
              title { romaji }
              bannerImage
            }
          }
        }
      }`,
      variables: { search: name }
    })
  });
  const data = await res.json();
  console.log(name, '->', data.data?.Character?.image?.large);
}
