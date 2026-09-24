const fs = require('fs');

async function auditDSAvatars() {
  const dsPath = 'src/data/animes/demon-slayer/characters.json';
  const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

  // Fetch Media 101922 (Demon Slayer) character nodes from AniList
  let page = 1;
  let hasNextPage = true;
  let allDSNodes = [];

  while (hasNextPage) {
    const query = `
      query ($page: Int) {
        Media(id: 101922) {
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
      body: JSON.stringify({ query, variables: { page } })
    });
    const data = await res.json();
    if (data.data && data.data.Media) {
      allDSNodes.push(...data.data.Media.characters.nodes);
      hasNextPage = data.data.Media.characters.pageInfo.hasNextPage;
      page++;
    } else {
      break;
    }
  }

  console.log(`Fetched ${allDSNodes.length} official Demon Slayer character nodes from AniList Media 101922.`);
  fs.writeFileSync('scratch/official_ds_nodes.json', JSON.stringify(allDSNodes, null, 2));

  function normalize(str) {
    if (!str) return '';
    return str.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function getNodeNames(node) {
    const names = [];
    if (node.name.full) names.push(normalize(node.name.full));
    if (node.name.native) names.push(normalize(node.name.native));
    if (node.name.userPreferred) names.push(normalize(node.name.userPreferred));
    if (node.name.alternative) {
      node.name.alternative.forEach(alt => names.push(normalize(alt)));
    }
    return names;
  }

  let updatedCount = 0;
  let notFoundInDSMedia = [];

  chars.forEach(c => {
    const cNorm = normalize(c.name);
    const cClean = normalize(c.name.split('(')[0]);

    // Find node in official Demon Slayer Media 101922
    let match = allDSNodes.find(node => {
      const names = getNodeNames(node);
      return names.includes(cNorm) || names.includes(cClean);
    });

    if (match && match.image && match.image.large) {
      if (c.avatar !== match.image.large) {
        console.log(`[UPDATE] ${c.id} (${c.name}): ${c.avatar} -> ${match.image.large}`);
        c.avatar = match.image.large;
        updatedCount++;
      }
    } else {
      notFoundInDSMedia.push(c);
    }
  });

  console.log(`\nUpdated ${updatedCount} avatars from Media 101922!`);
  console.log(`Not found in Media 101922 (${notFoundInDSMedia.length} characters):`);
  notFoundInDSMedia.forEach(u => console.log(` - ${u.id}: "${u.name}" (current avatar: ${u.avatar})`));

  fs.writeFileSync(dsPath, JSON.stringify(chars, null, 2));
}

auditDSAvatars().catch(console.error);
