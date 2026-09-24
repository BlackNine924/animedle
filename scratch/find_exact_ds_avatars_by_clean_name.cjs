const fs = require('fs');

async function findExactDSAvatars() {
  const dsPath = 'src/data/animes/demon-slayer/characters.json';
  const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

  const CLEAN_NAMES = {
    'nakime': 'Nakime',
    'doma': 'Douma',
    'karaku': 'Karaku',
    'sekido': 'Sekido',
    'urogi': 'Urogi',
    'aizetsu': 'Aizetsu',
    'zohakuten': 'Zohakuten',
    'daki': 'Daki',
    'gyutaro': 'Gyuutarou',
    'giyu-tomioka': 'Giyuu Tomioka',
    'gyomei-himejima': 'Gyoumei Himejima',
    'hairo': 'Hairo',
    'kaigaku-demon': 'Kaigaku',
    'mother-spider-demon': 'Rui Mother',
    'father-spider-demon': 'Rui Father',
    'makio': 'Makio',
    'suma': 'Suma',
    'nezuko-kamado-human': 'Nezuko Kamado',
    'nezuko-kamado-demon': 'Nezuko Kamado',
    'tanjiro-kamado-human': 'Tanjirou Kamado',
    'tanjiro-kamado-demon-king': 'Tanjirou Kamado',
    'tanjuro-kamado': 'Tanjuurou Kamado',
    'kyojuro-rengoku': 'Kyoujurou Rengoku',
    'muichiro-tokito': 'Muichirou Tokitou',
    'shinobu-kocho': 'Shinobu Kochou',
    'kokushibo': 'Kokushibou',
    'akaza': 'Akaza',
    'hantengu': 'Hantengu'
  };

  const query = `
    query ($search: String) {
      Character(search: $search) {
        id
        name { full native userPreferred }
        image { large }
      }
    }
  `;

  const results = {};
  for (let [id, searchName] of Object.entries(CLEAN_NAMES)) {
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { search: searchName } })
      });
      const data = await res.json();
      if (data.data && data.data.Character) {
        const c = data.data.Character;
        console.log(`[MATCH] ${id} ("${searchName}") => ${c.name.full} (ID ${c.id}): ${c.image.large}`);
        results[id] = c.image.large;
      } else {
        console.log(`[FAILED] ${id} ("${searchName}")`);
      }
    } catch (e) {
      console.error(e);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync('scratch/exact_clean_ds_matches.json', JSON.stringify(results, null, 2));
}

findExactDSAvatars().catch(console.error);
