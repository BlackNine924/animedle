const fs = require('fs');

const dsPath = 'src/data/animes/demon-slayer/characters.json';
const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

// Specific Breathing Forms and Kekkijutsu Techniques for Demon Slayer combatants
const SPECIFIC_DS_TECHNIQUES = {
  'tanjiro-kamado-human': 'Respiração do Sol (Hinokami Kagura: Enbu - Dança da Névoa Solar)',
  'tanjiro-kamado-demon-king': 'Kekkijutsu: Esferas de Sangue e Tentáculos Ósseos Primal',
  'nezuko-kamado-human': 'Nenhum',
  'nezuko-kamado-demon': 'Kekkijutsu: Bakketsu (Sangue Explosivo)',
  'zenitsu-agatsuma': 'Respiração do Trovão - Primeira Forma: Hekireki Ittokou (Lampejo do Trovão)',
  'inosuke-hashibira': 'Respiração da Fera - Quinta Presa: Kuruizaki (Mutilação Frenética)',
  'kanao-tsuyuri': 'Respiração da Flor - Forma Final: Higan Shugan (Olhos Vermelhos da Equinócio)',
  'genya-shinazugawa': 'Transformação Oni por Consumo de Carne & Tiro de Calibre Demoníaco',
  'giyu-tomioka': 'Respiração da Água - Décima Primeira Forma: Nagi (Calmaria)',
  'shinobu-kocho': 'Respiração do Inseto - Dança das Borboletas: Tawamure (Capricho)',
  'kyojuro-rengoku': 'Respiração das Chamas - Nona Forma: Rengoku (Chamas Ferozes)',
  'tengen-uzui': 'Respiração do Som - Quinta Forma: Kyouren Muken (Sinfonia Despertada)',
  'muichiro-tokito': 'Respiração da Névoa - Sétima Forma: Oboro (Névoa Esparsa)',
  'mitsuri-kanroji': 'Respiração do Amor - Quinta Forma: Yurameku Renjou (Afeição Tremulante)',
  'obanai-iguro': 'Respiração da Serpente - Quinta Forma: Enen Chōchō (Serpente Deslizante)',
  'sanemi-shinazugawa': 'Respiração do Vento - Oitava Forma: Hatsukaze Kiri (Corte da Brisa Primordial)',
  'gyomei-himejima': 'Respiração da Rocha - Quinta Forma: Gankyo Kousoku (Fissura da Rocha Arcana)',
  'kanae-kocho': 'Respiração da Flor - Quinta Forma: Peônia da Inocência',
  'sakonji-urokodaki': 'Respiração da Água - Segunda Forma: Mizuguruma (Roda d\'Água)',
  'sabito': 'Respiração da Água - Oitava Forma: Taki Tsubo (Jarro da Cachoeira)',
  'makomo': 'Respiração da Água - Primeira Forma: Minamogiri (Corte de Superfície)',
  'jigoro-kuwajima': 'Respiração do Trovão - Técnica Mestra de Seis Dobras',
  'hotaru-haganezuka': 'Nenhum',
  'kozo-kanamori': 'Nenhum',
  'kotetsu': 'Nenhum',
  'tecchin-tecchikawahara': 'Nenhum',
  'kagaya-ubuyashiki': 'Nenhum',
  'amane-ubuyashiki': 'Nenhum',
  'kiriya-ubuyashiki': 'Nenhum',
  'kanata-ubuyashiki': 'Nenhum',
  'aoi-kanzaki': 'Respiração da Água (Técnica Suporte de Enfermagem)',
  'murata': 'Respiração da Água - Primeira Forma: Minamogiri',
  'tamayo': 'Kekkijutsu: Aroma Visual de Alucinação (Enkou no Shi)',
  'yushiro': 'Kekkijutsu: Talismã de Invisibilidade e Percepção',
  'chachamaru': 'Nenhum',
  'muzan-kibutsuji': 'Kekkijutsu: Tentáculos Negros de Sangue e Espinhos Psíquicos',
  'kokushibo': 'Respiração da Lua - Sétima Forma: Kakyō - Jyōko no Tsuki (Espelho do Infortúnio)',
  'doma': 'Kekkijutsu: Suiren Bosatsu (Lótus do Gelo Celestial)',
  'akaza': 'Kekkijutsu: Hakushiki - Destruição do Caos (Hakushiki Ratsu)',
  'hantengu': 'Kekkijutsu: Divisão de Emoções Primal',
  'sekido': 'Kekkijutsu: Cajado de Raios e Trovões Vermelhos',
  'karaku': 'Kekkijutsu: Leque de Rajadas de Vento Devastadoras',
  'aizetsu': 'Kekkijutsu: Lança de Sangue de Perfuração Chocante',
  'urogi': 'Kekkijutsu: Obras Sonoras e Garras Voadoras de Pássaro',
  'zohakuten': 'Kekkijutsu: Dragões de Madeira e Trovão Ressonante',
  'gyokko': 'Kekkijutsu: Vaso dos Peixes Assassinos e Prisão d\'Água',
  'daki': 'Kekkijutsu: Faixas de Seda Cortantes (Obi)',
  'gyutaro': 'Kekkijutsu: Hoches de Sangue Venenoso (Tobichi Kama)',
  'kaigaku-human': 'Respiração do Trovão - Quarta Forma: Enrai (Trovão Distante)',
  'kaigaku-demon': 'Respiração do Trovão Negro - Sexta Forma: Denrai (Raios Remotos)',
  'enmu': 'Kekkijutsu: Hipnose do Trem dos Sonhos (Sokushin Nemuri)',
  'rui': 'Kekkijutsu: Teias de Sangue Cortante (Kokushirou)',
  'kyogai': 'Kekkijutsu: Tambores de Mudança Espacial e Cortes de Ar',
  'susamaru': 'Kekkijutsu: Temari Voador de Broca',
  'yahaba': 'Kekkijutsu: Flechas Direcionais Vermelhas (Kokushisou)',
  'temple-demon': 'Kekkijutsu: Presas e Garras Vorazes',
  'hand-demon': 'Kekkijutsu: Braços Gigantescos de Mutação de Carne',
  'swamp-demon': 'Kekkijutsu: Pântano Negro de Tripla Divisão',
  'mother-spider-demon': 'Kekkijutsu: Manipulação de Fios de Marionete de Sangue',
  'father-spider-demon': 'Kekkijutsu: Mutação de Pele de Rocha e Força Bruta',
  'tanjuro-kamado': 'Dança do Deus do Fogo (Hinokami Kagura Pasivo)',
  'kie-kamado': 'Nenhum',
  'takeo-kamado': 'Nenhum',
  'hanako-kamado': 'Nenhum',
  'shigeru-kamado': 'Nenhum',
  'rokuta-kamado': 'Nenhum',
  'shinjuro-rengoku': 'Respiração das Chamas - Primeira Forma: Shiranui (Fogo Desconhecido)',
  'ruka-rengoku': 'Nenhum',
  'senjuro-rengoku': 'Nenhum',
  'hinatsuru': 'Nenhum',
  'makio': 'Nenhum',
  'suma': 'Nenhum',
  'keizo': 'Nenhum',
  'koyuki': 'Nenhum',
  'yoriichi-tsugikuni': 'Respiração do Sol - Décima Terceira Forma (Dança Solar Suprema)',
  'hairo': 'Kekkijutsu: Invocação de Armas e Sombras Cortantes',
  'nakime': 'Kekkijutsu: Biwa de Reposicionamento do Castelo Infinito'
};

let techniqueCount = 0;
chars.forEach(c => {
  if (SPECIFIC_DS_TECHNIQUES[c.id]) {
    c.styleOrPower = SPECIFIC_DS_TECHNIQUES[c.id];
    if (c.styleOrPower !== 'Nenhum') techniqueCount++;
  }
});

fs.writeFileSync(dsPath, JSON.stringify(chars, null, 2));
console.log(`✓ Updated Demon Slayer technique definitions! ${techniqueCount} active combatants with specific Breathing Forms / Kekkijutsu.`);
