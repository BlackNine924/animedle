const fs = require('fs');

async function fetchAllDSSeasons() {
  const mediaIds = [101922, 110229, 129874, 145139, 166531];
  let allNodes = [];

  for (let mediaId of mediaIds) {
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const query = `
        query ($mediaId: Int, $page: Int) {
          Media(id: $mediaId) {
            characters(page: $page, perPage: 50) {
              pageInfo { hasNextPage }
              nodes {
                id
                name { full native userPreferred alternative }
                image { large }
              }
            }
          }
        }
      `;

      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { mediaId, page } })
      });
      const data = await res.json();
      if (data.data && data.data.Media) {
        allNodes.push(...data.data.Media.characters.nodes);
        hasNextPage = data.data.Media.characters.pageInfo.hasNextPage;
        page++;
      } else {
        break;
      }
      await new Promise(r => setTimeout(r, 200));
    }
  }

  console.log(`Fetched total ${allNodes.length} character nodes across all Demon Slayer seasons!`);
  fs.writeFileSync('scratch/all_ds_seasons_nodes.json', JSON.stringify(allNodes, null, 2));
}

fetchAllDSSeasons().catch(console.error);
