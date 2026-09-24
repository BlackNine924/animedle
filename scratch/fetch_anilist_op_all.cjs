const fs = require('fs');

async function fetchAllOPAniList() {
  let page = 1;
  let hasNextPage = true;
  let allOPChars = [];

  while (hasNextPage) {
    const query = `
      query ($page: Int) {
        Media(id: 21) {
          characters(page: $page, perPage: 50) {
            pageInfo {
              hasNextPage
            }
            nodes {
              id
              name {
                full
                native
                alternative
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

    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { page } })
    });
    const data = await res.json();
    if (!data.data || !data.data.Media) {
      console.error('Error fetching page', page, data);
      break;
    }
    const chars = data.data.Media.characters.nodes;
    allOPChars.push(...chars);
    hasNextPage = data.data.Media.characters.pageInfo.hasNextPage;
    page++;
    console.log(`Fetched page ${page - 1}, total chars so far: ${allOPChars.length}`);
    await new Promise(r => setTimeout(r, 300));
  }

  fs.writeFileSync('scratch/anilist_op_all_chars.json', JSON.stringify(allOPChars, null, 2));
  console.log(`Done! Total fetched: ${allOPChars.length}`);
}

fetchAllOPAniList().catch(console.error);
