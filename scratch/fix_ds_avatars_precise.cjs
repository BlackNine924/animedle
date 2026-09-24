const fs = require('fs');

async function fixDSAvatarsPrecise() {
  const dsPath = 'src/data/animes/demon-slayer/characters.json';
  const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

  // Exact AniList Character IDs for Demon Slayer:
  // Doma: 139736
  // Karaku: 272671
  // Sekido: 272670
  // Urogi: 272673
  // Aizetsu: 272672
  // Zohakuten: 272674
  // Makio: 227181
  // Suma: 227182
  // Hinatsuru: 227180
  // Gyokko: 139734
  // Daki: 139733
  // Gyutaro: 139735
  // Kokushibo: 147986
  // Akaza: 139732
  // Hantengu: 139731
  // Yoriichi Tsugikuni: 139038
  // Tanjuro Kamado: 139037
  // Shinjuro Rengoku: 193377
  // Ruka Rengoku: 193378
  // Senjuro Rengoku: 193379
  // Giyu Tomioka: 127518
  // Shinobu Kocho: 136070
  // Kyojuro Rengoku: 135317
  // Muichiro Tokito: 135315
  // Gyomei Himejima: 135314
  // Kanae Kocho: 139039
  // Jigoro Kuwajima: 139040

  const ANILIST_ID_MAP = {
    'doma': 139736,
    'karaku': 272671,
    'sekido': 272670,
    'urogi': 272673,
    'aizetsu': 272672,
    'zohakuten': 272674,
    'makio': 227181,
    'suma': 227182,
    'hinatsuru': 227180,
    'gyokko': 139734,
    'daki': 139733,
    'gyutaro': 139735,
    'kokushibo': 147986,
    'akaza': 139732,
    'hantengu': 139731,
    'yoriichi-tsugikuni': 139038,
    'tanjuro-kamado': 139037,
    'shinjuro-rengoku': 193377,
    'ruka-rengoku': 193378,
    'senjuro-rengoku': 193379,
    'giyu-tomioka': 127518,
    'shinobu-kocho': 136070,
    'kyojuro-rengoku': 135317,
    'muichiro-tokito': 135315,
    'gyomei-himejima': 135314,
    'kanae-kocho': 139039,
    'jigoro-kuwajima': 139040,
    'tanjiro-kamado-human': 126071,
    'tanjiro-kamado-demon-king': 126071
  };

  const query = `
    query ($id: Int) {
      Character(id: $id) {
        id
        name { full }
        image { large }
      }
    }
  `;

  for (let [charId, anilistId] of Object.entries(ANILIST_ID_MAP)) {
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { id: anilistId } })
      });
      const data = await res.json();
      if (data.data && data.data.Character && data.data.Character.image) {
        const char = chars.find(c => c.id === charId);
        if (char) {
          console.log(`[FIXED BY ID] ${charId} (${data.data.Character.name.full}): ${char.avatar} -> ${data.data.Character.image.large}`);
          char.avatar = data.data.Character.image.large;
        }
      }
    } catch (e) {
      console.error('Error fetching ID', anilistId, e);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync(dsPath, JSON.stringify(chars, null, 2));
  console.log('Saved exact fixes!');
}

fixDSAvatarsPrecise().catch(console.error);
