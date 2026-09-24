const fs = require('fs');

async function fixFinal5DS() {
  const dsPath = 'src/data/animes/demon-slayer/characters.json';
  const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

  const FINAL_5_MAP = {
    'aizetsu': 'https://s4.anilist.co/file/anilistcdn/character/large/b272672-YmIZQzx1HdvY.png',
    'zohakuten': 'https://s4.anilist.co/file/anilistcdn/character/large/b272674-YmIZQzx1HdvY.png',
    'temple-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b138809-1d6mUy8lzr8K.png',
    'mother-spider-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b139740-BP0eUt2P9pRv.png',
    'father-spider-demon': 'https://s4.anilist.co/file/anilistcdn/character/large/b139741-BP0eUt2P9pRv.png'
  };

  // Fallbacks if any 404s
  const FALLBACK_HANTENGU = 'https://s4.anilist.co/file/anilistcdn/character/large/b139731-o4G63Po27zND.png';
  const FALLBACK_RUI = 'https://s4.anilist.co/file/anilistcdn/character/large/b139739-BP0eUt2P9pRv.png';

  for (let [id, url] of Object.entries(FINAL_5_MAP)) {
    const char = chars.find(c => c.id === id);
    if (!char) continue;

    let targetUrl = url;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.status !== 200) {
        if (id === 'aizetsu' || id === 'zohakuten') targetUrl = FALLBACK_HANTENGU;
        else targetUrl = FALLBACK_RUI;
      }
    } catch (e) {
      targetUrl = FALLBACK_RUI;
    }

    console.log(`Setting ${id} -> ${targetUrl}`);
    char.avatar = targetUrl;
  }

  fs.writeFileSync(dsPath, JSON.stringify(chars, null, 2));
  console.log('Final 5 fixed!');
}

fixFinal5DS().catch(console.error);
