import fs from 'fs';

const path = 'src/data/animes/jujutsu-kaisen/characters.json';
const characters = JSON.parse(fs.readFileSync(path, 'utf8'));

const CANON_FIXES = {
  'yuji-itadori': {
    styleOrPower: 'Punho Divergente / Kokusen',
    ability: 'Punho Divergente & Kokusen',
    domainExpansion: null
  },
  'nobara-kugisaki': {
    styleOrPower: 'Técnica da Boneca de Palha',
    ability: 'Ressonância & Grampo (Kanzashi)'
  },
  'ryomen-sukuna': {
    styleOrPower: 'Santuário (Mizushi) / Cortes (Desmantelar e Clivar)',
    ability: 'Clivar, Desmantelar & Flecha de Fogo (Fuga)',
    domainExpansion: 'Santuário Malevolente (Fukuma Mizushi)'
  },
  'hiromi-higuruma': {
    styleOrPower: 'Sentença Mortal (Judgeman)',
    ability: 'Espada do Carrasco & Confisco Judicial',
    domainExpansion: 'Sentença Mortal (Deadly Sentencing)'
  },
  'fumihiko-takaba': {
    styleOrPower: 'Comediante (Comedian)',
    ability: 'Materialização da Realidade Cômica',
    domainExpansion: null
  },
  'hajime-kashimo': {
    styleOrPower: 'Liberação da Besta Mítica (Genju Kohaku)',
    ability: 'Descarga Elétrica Pura & Besta Mítica',
    domainExpansion: null
  },
  'yorozu': {
    styleOrPower: 'Técnica de Construção',
    ability: 'Metal Líquido & Esfera Perfeita',
    domainExpansion: 'Três Vezes Aflição (Three-Fold Affliction)'
  },
  'takako-uro': {
    styleOrPower: 'Manipulação do Céu',
    ability: 'Dobra Espacial Celestial & Thin Ice Breaker',
    domainExpansion: null
  },
  'reggie-star': {
    styleOrPower: 'Recriação por Contrato',
    ability: 'Invocação e Efeitos por Recibos de Compra',
    domainExpansion: null
  },
  'naoya-zenin': {
    styleOrPower: 'Feitiçaria de Projeção',
    ability: '24 Quadros por Segundo',
    domainExpansion: 'Palácio da Lua Célula Temporal (Time Cell Moon Palace)'
  },
  'ogi-zenin': {
    styleOrPower: 'Espírito Ardente',
    ability: 'Lâminas de Chamas Amaldiçoadas',
    domainExpansion: null
  },
  'jinichi-zenin': {
    styleOrPower: 'Projéteis de Punhos Cadentes',
    ability: 'Invocação de Punhos Gigantes',
    domainExpansion: null
  },
  'toge-inumaki': {
    styleOrPower: 'Fala Amaldiçoada',
    ability: 'Comandos Vocais de Alta Tensão'
  },
  'panda': {
    styleOrPower: 'Cadáver Mutante Abrupto',
    ability: 'Três Núcleos (Panda, Gorila, Triceratops)'
  },
  'kento-nanami': {
    styleOrPower: 'Técnica da Proporção 7:3',
    ability: 'Corte de Linha Crítica 7:3'
  },
  'aoi-todo': {
    styleOrPower: 'Boogie Woogie',
    ability: 'Troca Instantânea de Posição por Palmas'
  },
  'kinji-hakari': {
    styleOrPower: 'Trem do Amor Puro (Caça-Níqueis)',
    ability: 'Jackpot de Energia Amaldiçoada Infinita',
    domainExpansion: 'Aposta Ociosa da Morte (Idle Death Gamble)'
  },
  'kirara-hoshi': {
    styleOrPower: 'Amor Rendezvous (Constelação Cruzeiro do Sul)',
    ability: 'Atração e Repulsão por Estrelas Marcadas'
  },
  'yuta-okkotsu': {
    styleOrPower: 'Cópia Incondicional de Técnicas',
    ability: 'Manifestação Completa de Rika & Técnicas Copiadas',
    domainExpansion: 'Amor Mútuo Autêntico (All-Encompassing Unequivocal Love)'
  },
  'yuki-tsukumo': {
    styleOrPower: 'Star Rage (Fúria Estelar / Bom-Ba-Ye)',
    ability: 'Massa Virtual Infinita & Garuda'
  },
  'kenjaku': {
    styleOrPower: 'Troca de Corpos & Gravidade',
    ability: 'Manipulação de Maldições & Sistema Antigravidade',
    domainExpansion: 'Proliferação de Ventres (Womb Profusion)'
  },
  'charles-bernard': {
    styleOrPower: 'Pena de Mangaká (G-Pen)',
    ability: 'Previsão do Futuro em Painéis de Tinta'
  },
  'iori-hazenoki': {
    styleOrPower: 'Explosão de Partes Corporais',
    ability: 'Detonação de Dentes e Olhos como Bombas'
  },
  'jiro-awasaka': {
    styleOrPower: 'Inversa (Inverse)',
    ability: 'Inversão Proporcional de Impactos'
  },
  'haruta-shigemo': {
    styleOrPower: 'Armazenamento de Milagres',
    ability: 'Consumo de Pequenos Milagres para Sobreviver'
  },
  'kurourushi': {
    styleOrPower: 'Espada da Vida Partenogenética',
    ability: 'Enxames de Baratas Devoradoras'
  },
  'vovo-ogami': {
    styleOrPower: 'Técnica Mediúnica (Séance)',
    ability: 'Invocação e Incorporação de Corpos e Almas de Mortos'
  },
  'junpei-yoshino': {
    styleOrPower: 'Moon Dregs (Água-Viva Venenosa)',
    ability: 'Tentáculos e Toxinas de Shikigami'
  },
  'kaori-itadori': {
    styleOrPower: 'Sistema Antigravidade',
    ability: 'Nulificação e Inversão da Gravidade'
  },
  'miguel': {
    styleOrPower: 'Hakuna Laana',
    ability: 'Evasão Rítmica de Feitiços & Chicote Negro'
  },
  'larue': {
    styleOrPower: 'Heart Catch',
    ability: 'Mão Gigante Virtual de Agarrar'
  },
  'toji-fushiguro': {
    styleOrPower: 'Restrição Celestial Pura (Zero Energia)',
    ability: 'Sentidos Sobre-humanos e Maestria com Armas Amaldiçoadas',
    domainExpansion: null
  },
  'maki-zenin': {
    styleOrPower: 'Restrição Celestial Pura (Zero Energia)',
    ability: 'Físico Sobre-humano Divino e Imunidade a Barreiras',
    domainExpansion: null
  },
  'wasuke-itadori': {
    styleOrPower: 'Nenhum (Civil)',
    ability: 'Civil sem energia amaldiçoada'
  },
  'jin-itadori': {
    styleOrPower: 'Nenhum (Civil)',
    ability: 'Civil sem energia amaldiçoada'
  },
  'tsumiki-fushiguro': {
    styleOrPower: 'Nenhum (Civil)',
    ability: 'Civil sem energia amaldiçoada'
  },
  'riko-amanai': {
    styleOrPower: 'Recipiente de Plasma Estelar (Sem Técnica)',
    ability: 'Recipiente de Plasma Estelar para Tengen'
  },
  'shiu-kong': {
    styleOrPower: 'Nenhum (Civil)',
    ability: 'Corretor civil'
  },
  'takada-chan': {
    styleOrPower: 'Nenhum (Civil)',
    ability: 'Idol pop'
  },
  'yuko-ozawa': {
    styleOrPower: 'Nenhum (Civil)',
    ability: 'Civil'
  },
  'setsuko-sasaki': {
    styleOrPower: 'Nenhum (Civil)',
    ability: 'Estudante civil'
  },
  'takeshi-iguchi': {
    styleOrPower: 'Nenhum (Civil)',
    ability: 'Estudante civil'
  }
};

let patched = 0;
for (const char of characters) {
  if (CANON_FIXES[char.id]) {
    Object.assign(char, CANON_FIXES[char.id]);
    patched++;
  }
}

fs.writeFileSync(path, JSON.stringify(characters, null, 2), 'utf8');
console.log(`Successfully patched ${patched} JJK characters with accurate canon abilities!`);
