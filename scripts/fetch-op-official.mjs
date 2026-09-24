import fs from 'fs';

async function fetchAllOnePieceCharacters() {
  const query = `
    query ($page: Int) {
      Media(id: 21, type: ANIME) {
        id
        characters(page: $page, perPage: 25) {
          pageInfo {
            hasNextPage
            currentPage
            total
          }
          nodes {
            id
            name {
              full
              native
              alternative
            }
            image {
              large
            }
          }
        }
      }
    }
  `;

  let page = 1;
  let hasNextPage = true;
  const allCharacters = [];

  while (hasNextPage && page <= 30) {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { page } })
    });
    const json = await res.json();
    if (json.errors) {
      console.error('AniList error:', json.errors);
      break;
    }
    const data = json?.data?.Media?.characters;
    if (!data) {
      console.log('No data:', json);
      break;
    }
    
    allCharacters.push(...data.nodes);
    hasNextPage = data.pageInfo.hasNextPage;
    console.log(`Fetched page ${page}/${Math.ceil(data.pageInfo.total / 25)}, total so far: ${allCharacters.length}`);
    page++;
    await new Promise(r => setTimeout(r, 700));
  }

  fs.writeFileSync('scripts/op_anilist_official.json', JSON.stringify(allCharacters, null, 2));
  console.log(`Done! Saved ${allCharacters.length} official One Piece characters to scripts/op_anilist_official.json`);
}

fetchAllOnePieceCharacters();
