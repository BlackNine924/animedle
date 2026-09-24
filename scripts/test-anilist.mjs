async function test() {
  const query = `
    query ($search: String) {
      Character(search: $search) {
        id
        name {
          full
          native
        }
        image {
          large
        }
      }
    }
  `;
  const names = ['Morgan', 'Caesar Clown', 'Jesus Burgess', 'Shiryu', 'Van Augur', 'Avalo Pizarro', 'Catarina Devon', 'Sanjuan Wolf', 'Vasco Shot', 'Doc Q'];
  for (const name of names) {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { search: name } })
    });
    const data = await res.json();
    console.log(name, '->', data?.data?.Character?.image?.large, 'ID:', data?.data?.Character?.id);
    await new Promise(r => setTimeout(r, 600));
  }
}
test();
