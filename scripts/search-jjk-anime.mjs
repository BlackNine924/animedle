import fs from 'fs';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://jujutsu-kaisen.fandom.com/'
};

async function searchCandidate(query) {
  const url = `https://jujutsu-kaisen.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
  const res = await fetch(url, { headers: defaultHeaders });
  const data = await res.json();
  const hits = (data.query?.search || []).map(s => s.title.replace(/^File:/, ''));
  return hits.filter(h => !h.endsWith('.gif') && !h.toLowerCase().includes('manga') && !h.toLowerCase().includes('stage'));
}

async function testAll() {
  const chars = [
    { id: 'yuji-itadori', q: 'Yuji Itadori anime' },
    { id: 'megumi-fushiguro', q: 'Megumi Fushiguro anime' },
    { id: 'yuta-okkotsu', q: 'Yuta Okkotsu anime' },
    { id: 'maki-zenin', q: 'Maki Zenin anime' },
    { id: 'toge-inumaki', q: 'Toge Inumaki anime' },
    { id: 'panda', q: 'Panda anime' },
    { id: 'aoi-todo', q: 'Aoi Todo anime' },
    { id: 'mai-zenin', q: 'Mai Zenin anime' },
    { id: 'noritoshi-kamo', q: 'Noritoshi Kamo anime' },
    { id: 'kokichi-muta', q: 'Kokichi Muta anime' },
    { id: 'yoshinobu-gakuganji', q: 'Yoshinobu Gakuganji anime' },
    { id: 'utahime-iori', q: 'Utahime Iori anime' },
    { id: 'kento-nanami', q: 'Kento Nanami anime' },
    { id: 'masamichi-yaga', q: 'Masamichi Yaga anime' },
    { id: 'takuma-ino', q: 'Takuma Ino anime' },
    { id: 'atsuya-kusakabe', q: 'Atsuya Kusakabe anime' },
    { id: 'mei-mei', q: 'Mei Mei anime' },
    { id: 'ui-ui', q: 'Ui Ui anime' },
    { id: 'yuki-tsukumo', q: 'Yuki Tsukumo anime' },
    { id: 'toji-fushiguro', q: 'Toji Fushiguro anime' },
    { id: 'naobito-zenin', q: 'Naobito Zenin anime' },
    { id: 'ogi-zenin', q: 'Ogi Zenin anime' },
    { id: 'jinichi-zenin', q: 'Jinichi Zenin anime' },
    { id: 'ryomen-sukuna', q: 'Ryomen Sukuna anime' },
    { id: 'suguru-geto', q: 'Suguru Geto anime' },
    { id: 'kenjaku', q: 'Kenjaku anime' },
    { id: 'uraume', q: 'Uraume anime' },
    { id: 'mahito', q: 'Mahito anime' },
    { id: 'jogo', q: 'Jogo anime' },
    { id: 'hanami', q: 'Hanami anime' },
    { id: 'dagon', q: 'Dagon anime' },
    { id: 'choso', q: 'Choso anime' },
    { id: 'eso', q: 'Eso anime' },
    { id: 'rika-orimoto', q: 'Rika Orimoto anime' },
    { id: 'smallpox-deity', q: 'Smallpox Deity anime' },
    { id: 'haruta-shigemo', q: 'Haruta Shigemo anime' },
    { id: 'jiro-awasaka', q: 'Jiro Awasaka anime' },
    { id: 'juzo-kumiya', q: 'Juzo Kumiya anime' },
    { id: 'junpei-yoshino', q: 'Junpei Yoshino anime' },
    { id: 'jin-itadori', q: 'Jin Itadori anime' },
    { id: 'kaori-itadori', q: 'Kaori Itadori anime' },
    { id: 'tsumiki-fushiguro', q: 'Tsumiki Fushiguro anime' },
    { id: 'mimiko-hasaba', q: 'Mimiko Hasaba anime' },
    { id: 'nanako-hasaba', q: 'Nanako Hasaba anime' },
    { id: 'larue', q: 'Larue anime' },
    { id: 'miguel', q: 'Miguel anime' },
    { id: 'finger-bearer', q: 'Finger Bearer anime' },
    { id: 'grasshopper-curse', q: 'Grasshopper Curse anime' },
    { id: 'nobuko-takada', q: 'Takada anime' },
    { id: 'yuko-ozawa', q: 'Yuko Ozawa anime' },
    { id: 'sasaki', q: 'Setsuko Sasaki anime' },
    { id: 'iguchi', q: 'Takeshi Iguchi anime' },
    { id: 'arata-nitta', q: 'Arata Nitta anime' },
    { id: 'akari-nitta', q: 'Akari Nitta anime' },
    { id: 'yu-haibara', q: 'Yu Haibara anime' },
    { id: 'misato-kuroi', q: 'Misato Kuroi anime' },
    { id: 'shiu-kong', q: 'Shiu Kong anime' },
    { id: 'tengen', q: 'Tengen anime' }
  ];

  const results = {};
  for (const c of chars) {
    const hits = await searchCandidate(c.q);
    results[c.id] = hits.slice(0, 3);
    console.log(`${c.id}: ${hits.slice(0, 2).join(' | ')}`);
  }

  fs.writeFileSync('scripts/jjk-anime-search-results.json', JSON.stringify(results, null, 2));
}

testAll();
