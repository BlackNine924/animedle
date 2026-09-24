const fs = require('fs');

async function fetchDemonSlayerAniList() {
  let page = 1;
  let hasNextPage = true;
  let allChars = [];

  while (hasNextPage) {
    const query = `
      query ($page: Int) {
        Media(id: 101922) {
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
      console.error('Error fetching DS page', page, data);
      break;
    }
    const nodes = data.data.Media.characters.nodes;
    allChars.push(...nodes);
    hasNextPage = data.data.Media.characters.pageInfo.hasNextPage;
    page++;
    console.log(`Fetched DS page ${page - 1}, total chars: ${allChars.length}`);
    await new Promise(r => setTimeout(r, 300));
  }

  fs.writeFileSync('scratch/anilist_ds_chars.json', JSON.stringify(allChars, null, 2));
  console.log(`Done fetching Demon Slayer! Total: ${allChars.length}`);
}

fetchDemonSlayerAniList().catch(console.error);
