async function testIds() {
  const ids = [
    { name: 'Kaidou', id: 12513 },
    { name: 'Kaku', id: 8410 },
    { name: 'Killer', id: 16301 },
    { name: 'Hina', id: 13404 },
    { name: 'Jack', id: 90919 },
    { name: 'Fujitora', id: 85489 },
    { name: 'Ryokugyu', id: 134118 },
    { name: 'Denjiro', id: 156321 },
    { name: 'Ashura Doji', id: 156323 },
    { name: 'Shiki', id: 28263 },
    { name: 'Ryuma', id: 15003 },
    { name: 'Jango', id: 8416 },
    { name: 'Laffitte', id: 9323 }
  ];

  const query = `
    query ($id: Int) {
      Character(id: $id) {
        id
        name { full }
        image { large }
      }
    }
  `;

  for (const item of ids) {
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { id: item.id } })
      });
      const json = await res.json();
      console.log(item.name, '->', json?.data?.Character?.name?.full, json?.data?.Character?.image?.large);
    } catch (e) {
      console.error(e);
    }
    await new Promise(r => setTimeout(r, 600));
  }
}
testIds();
