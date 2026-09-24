const fs = require('fs');

async function inspectDSAvatars() {
  const charsToFix = [
    { id: 'nakime', name: 'Nakime Demon Slayer' },
    { id: 'doma', name: 'Doma Demon Slayer' },
    { id: 'karaku', name: 'Karaku Demon Slayer' },
    { id: 'sekido', name: 'Sekido Demon Slayer' },
    { id: 'urogi', name: 'Urogi Demon Slayer' },
    { id: 'aizetsu', name: 'Aizetsu Demon Slayer' },
    { id: 'zohakuten', name: 'Zohakuten Demon Slayer' },
    { id: 'daki', name: 'Daki Demon Slayer' },
    { id: 'giyu-tomioka', name: 'Giyu Tomioka' },
    { id: 'gyomei-himejima', name: 'Gyomei Himejima' },
    { id: 'hairo', name: 'Hairo Demon Slayer' },
    { id: 'kaigaku-demon', name: 'Kaigaku Demon Slayer' },
    { id: 'mother-spider-demon', name: 'Mother Spider Demon' },
    { id: 'father-spider-demon', name: 'Father Spider Demon' },
    { id: 'makio', name: 'Makio Demon Slayer' },
    { id: 'suma', name: 'Suma Demon Slayer' },
    { id: 'nezuko-kamado-demon', name: 'Nezuko Kamado' },
    { id: 'tanjiro-kamado-demon-king', name: 'Tanjiro Kamado' },
    { id: 'tanjuro-kamado', name: 'Tanjuro Kamado' }
  ];

  const query = `
    query ($search: String) {
      Character(search: $search) {
        id
        name { full native userPreferred }
        image { large }
        media {
          nodes {
            title { userPreferred }
          }
        }
      }
    }
  `;

  for (let item of charsToFix) {
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { search: item.name } })
      });
      const data = await res.json();
      if (data.data && data.data.Character) {
        const c = data.data.Character;
        console.log(`[ANI_SEARCH] ${item.id} -> ${c.name.full} (ID ${c.id}): ${c.image.large}`);
      } else {
        console.log(`[ANI_SEARCH FAILED] ${item.id}`);
      }
    } catch (e) {
      console.error(e);
    }
    await new Promise(r => setTimeout(r, 200));
  }
}

inspectDSAvatars().catch(console.error);
