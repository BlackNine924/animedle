async function searchOP(name) {
  const query = `query ($search: String) {
    Page(page: 1, perPage: 10) {
      characters(search: $search) {
        id
        name { full }
        media(perPage: 3) {
          nodes {
            title { english romaji }
          }
        }
      }
    }
  }`;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { search: name } })
  });
  const data = await res.json();
  const found = data.data?.Page?.characters?.filter((c) =>
    c.media?.nodes?.some((m) =>
      (m.title.romaji || '').toLowerCase().includes('one piece') ||
      (m.title.english || '').toLowerCase().includes('one piece')
    )
  );
  console.log(name, '->', found);
}

await searchOP('Shu');
