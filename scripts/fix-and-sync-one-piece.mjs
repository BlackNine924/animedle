import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const opDir = path.join(rootDir, 'src', 'data', 'animes', 'one-piece');
const opCharactersPath = path.join(opDir, 'characters.json');
const avatarsDir = path.join(rootDir, 'public', 'avatars', 'one-piece');

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// 10 New Characters to add/ensure
const newCharacters = [
  {
    id: "marshall-d-teach",
    name: "Marshall D. Teach (Barba Negra)",
    gender: "Masculino",
    species: "Humano",
    affiliation: [
      "Piratas do Barba Negra",
      "Quatro Imperadores",
      "Ex-Piratas do Barba Branca",
      "Ex-Shichibukai"
    ],
    fruitType: "Logia & Paramecia",
    haki: "Armamento & Observação",
    bounty: 3996000000,
    styleOrPower: "Logia & Paramecia (Yami Yami no Mi & Gura Gura no Mi)",
    debutArc: "Skypiea",
    status: "Vivo",
    quote: "O sonho dos homens nunca tem fim!",
    avatar: "https://s4.anilist.co/file/anilistcdn/character/large/b3331-7ZJDc4BNv9Yp.jpg",
    techniques: [
      "Black Hole",
      "Liberation",
      "Kurouzu",
      "Gekishin",
      "Shima Yurashi"
    ]
  },
  {
    id: "jesus-burgess",
    name: "Jesus Burgess",
    gender: "Masculino",
    species: "Humano",
    affiliation: [
      "Piratas do Barba Negra"
    ],
    fruitType: "Paramecia",
    haki: "Armamento & Observação",
    bounty: 20000000,
    styleOrPower: "Paramecia (Riki Riki no Mi)",
    debutArc: "Skypiea",
    status: "Vivo",
    quote: "Wiiiiihaha! Eu sou o Campeão!",
    avatar: "https://s4.anilist.co/file/anilistcdn/character/large/b9324-ZmlGx1pxRtYP.png",
    techniques: [
      "Hadou Elbow",
      "Galleon Lariat"
    ]
  },
  {
    id: "shiryu",
    name: "Shiryu",
    gender: "Masculino",
    species: "Humano",
    affiliation: [
      "Piratas do Barba Negra",
      "Ex-Guarda de Impel Down"
    ],
    fruitType: "Paramecia",
    haki: "Armamento & Observação",
    bounty: 0,
    styleOrPower: "Paramecia (Suke Suke no Mi)",
    debutArc: "Summit War (Marineford)",
    status: "Vivo",
    quote: "Espadas existem para cortar pessoas.",
    avatar: "https://s4.anilist.co/file/anilistcdn/character/large/b5922-DzYFLk6qzQif.png",
    techniques: [
      "Espadachim Mestre com Nodachi Raiu",
      "Invisibilidade Suke Suke"
    ]
  },
  {
    id: "van-augur",
    name: "Van Augur",
    gender: "Masculino",
    species: "Humano",
    affiliation: [
      "Piratas do Barba Negra"
    ],
    fruitType: "Paramecia",
    haki: "Armamento & Observação",
    bounty: 64000000,
    styleOrPower: "Paramecia (Wapu Wapu no Mi)",
    debutArc: "Skypiea",
    status: "Vivo",
    quote: "O destino governa todas as coisas deste mundo.",
    avatar: "https://s4.anilist.co/file/anilistcdn/character/large/b9325-Ev3MbRVNYXIt.png",
    techniques: [
      "Tiroteio de Extremo Alcance com Senriku",
      "Teletransporte Dimensional Instantâneo"
    ]
  },
  {
    id: "avalo-pizarro",
    name: "Avalo Pizarro",
    gender: "Masculino",
    species: "Humano",
    affiliation: [
      "Piratas do Barba Negra"
    ],
    fruitType: "Paramecia",
    haki: "Armamento & Observação",
    bounty: 0,
    styleOrPower: "Paramecia (Shima Shima no Mi)",
    debutArc: "Summit War (Marineford)",
    status: "Vivo",
    quote: "Nya haha! Ei Teach, deixe-me ser o capitão!",
    avatar: "https://s4.anilist.co/file/anilistcdn/character/large/b31182-pJB5DBtafLRS.jpg",
    techniques: [
      "Fusão e Controle Territorial da Ilha Hachinosu"
    ]
  },
  {
    id: "catarina-devon",
    name: "Catarina Devon",
    gender: "Feminino",
    species: "Humano",
    affiliation: [
      "Piratas do Barba Negra"
    ],
    fruitType: "Zoan Mítica",
    haki: "Armamento & Observação",
    bounty: 0,
    styleOrPower: "Zoan Mítica (Inu Inu no Mi: Modelo Kyubi no Kitsune)",
    debutArc: "Summit War (Marineford)",
    status: "Viva",
    quote: "Murunfuffu! Que cabeças lindas para minha coleção!",
    avatar: "https://s4.anilist.co/file/anilistcdn/character/large/b31181-02FkFHTCEZd1.jpg",
    techniques: [
      "Metamorfose Perfeita em Qualquer Pessoa",
      "Combate com Chicote e Lança"
    ]
  },
  {
    id: "sanjuan-wolf",
    name: "Sanjuan Wolf",
    gender: "Masculino",
    species: "Gigante",
    affiliation: [
      "Piratas do Barba Negra"
    ],
    fruitType: "Paramecia",
    haki: "Nenhum",
    bounty: 0,
    styleOrPower: "Paramecia (Deka Deka no Mi)",
    debutArc: "Summit War (Marineford)",
    status: "Vivo",
    quote: "Eles me encontraram... que vergonha!",
    avatar: "https://s4.anilist.co/file/anilistcdn/character/large/b31183-UC8Ha8SPZuOn.jpg",
    techniques: [
      "Tamanho Gigantesco Ultrapassando 180 Metros"
    ]
  },
  {
    id: "vasco-shot",
    name: "Vasco Shot",
    gender: "Masculino",
    species: "Humano",
    affiliation: [
      "Piratas do Barba Negra"
    ],
    fruitType: "Paramecia",
    haki: "Armamento & Observação",
    bounty: 0,
    styleOrPower: "Paramecia (Gabu Gabu no Mi)",
    debutArc: "Summit War (Marineford)",
    status: "Vivo",
    quote: "Toputoputopu... posso matar todos eles agora?",
    avatar: "https://s4.anilist.co/file/anilistcdn/character/large/b31180-oizvWyQt7UfK.jpg",
    techniques: [
      "Manipulação e Cuspe de Licor Flamejante"
    ]
  },
  {
    id: "doc-q",
    name: "Doc Q",
    gender: "Masculino",
    species: "Humano",
    affiliation: [
      "Piratas do Barba Negra"
    ],
    fruitType: "Paramecia",
    haki: "Nenhum",
    bounty: 72000000,
    styleOrPower: "Paramecia (Shiku Shiku no Mi)",
    debutArc: "Skypiea",
    status: "Vivo",
    quote: "Você é uma pessoa de sorte?",
    avatar: "https://s4.anilist.co/file/anilistcdn/character/large/b9326-TG3CYbA4Q33y.png",
    techniques: [
      "Infecção por Doenças (Shiku Shiku no Mi)",
      "Maçãs Explosivas em Conjunto com Stronger"
    ]
  },
  {
    id: "caesar-clown",
    name: "Caesar Clown",
    gender: "Masculino",
    species: "Humano",
    affiliation: [
      "Piratas Donquixote",
      "MADS",
      "Governo Mundial"
    ],
    fruitType: "Logia",
    haki: "Nenhum",
    bounty: 300000000,
    styleOrPower: "Logia (Gasu Gasu no Mi)",
    debutArc: "Dressrosa / Punk Hazard",
    status: "Vivo",
    quote: "Shurorororo! A ciência é a força suprema deste mundo!",
    avatar: "https://s4.anilist.co/file/anilistcdn/character/large/b61603-x8RTOk7DIFIZ.jpg",
    techniques: [
      "Gastanet",
      "Gas Robe",
      "Shinokuni",
      "Blue Sword",
      "Karakuni"
    ]
  }
];

// Clean avatar replacements (guaranteed face shots & reliable CDNs)
const avatarOverrides = {
  "morgan": "https://s4.anilist.co/file/anilistcdn/character/large/b9333-hMdvqj4LuuLn.jpg",
  "lafitte": "https://s4.anilist.co/file/anilistcdn/character/large/b9327-LSoZrnwtFNDE.png",
  "kaku": "https://s4.anilist.co/file/anilistcdn/character/large/b6183-gmHoUzp8Eh8E.png",
  "killer": "https://s4.anilist.co/file/anilistcdn/character/large/b18827-uvYXjeffe0gW.png",
  "hina": "https://s4.anilist.co/file/anilistcdn/character/large/b20091-tOTt36l8zDCw.png",
  "jango": "https://s4.anilist.co/file/anilistcdn/character/large/b4886-QwqBEUBwKgIr.png",
  "ryuma": "https://s4.anilist.co/file/anilistcdn/character/large/b17178-SczXHzLzZqzn.jpg",
  "vegapunk": "https://s4.anilist.co/file/anilistcdn/character/large/b282077-sPmt79g4douV.jpg",
  "edison": "https://s4.anilist.co/file/anilistcdn/character/large/b326793-xDVOVFqAOo4O.png",
  "pythagoras": "https://s4.anilist.co/file/anilistcdn/character/large/b326794-3cqUesvgztGh.png",
  "s-hawk": "https://s4.anilist.co/file/anilistcdn/character/large/b365031-jindAKqxqw1e.png",
  "s-snake": "https://s4.anilist.co/file/anilistcdn/character/large/b340682-4PziZcmcalQj.png",
  "jaygarcia-saturn": "https://s4.anilist.co/file/anilistcdn/character/large/b299038-H3xhQUX5Xv1p.png"
};

async function syncOnePiece() {
  console.log("Iniciando sincronização completa de One Piece...");
  const raw = fs.readFileSync(opCharactersPath, 'utf-8');
  let characters = JSON.parse(raw);

  // Apply overrides
  for (const char of characters) {
    if (avatarOverrides[char.id]) {
      char.avatar = avatarOverrides[char.id];
      console.log(`Substituído avatar para rosto focado: ${char.id} (${char.name})`);
    }
  }

  // Add missing characters if not already present
  for (const nc of newCharacters) {
    const existingIndex = characters.findIndex(c => c.id === nc.id);
    if (existingIndex >= 0) {
      characters[existingIndex] = { ...characters[existingIndex], ...nc };
      console.log(`Atualizado: ${nc.name}`);
    } else {
      characters.push(nc);
      console.log(`Adicionado: ${nc.name}`);
    }
  }

  // Save updated characters.json
  fs.writeFileSync(opCharactersPath, JSON.stringify(characters, null, 2));
  console.log(`characters.json salvo com ${characters.length} personagens.`);
}

syncOnePiece();
