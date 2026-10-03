import fs from 'fs';
import path from 'path';

const opPath = 'src/data/animes/one-piece/characters.json';
const opChars = JSON.parse(fs.readFileSync(opPath, 'utf8'));
const existingOpIds = new Set(opChars.map(c => c.id));

// Novos personagens canônicos para completar 100% das Akumas no Mi
const newCharactersToAdd = [
  {
    id: 'tsuru',
    name: 'Tsuru',
    gender: 'Feminino',
    species: 'Humano',
    affiliation: ['Marinha'],
    fruitType: 'Paramecia',
    haki: 'Armamento & Observação',
    bounty: 0,
    styleOrPower: 'Paramecia (Woshu Woshu no Mi)',
    debutArc: 'Jaya',
    status: 'Viva',
    quote: 'Um coração limpo lava todas as impurezas.',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b16382-uK4b54y3n9nK.png',
    techniques: ['Wash and Hang'],
    combatType: 'Suporte / Estratégia',
    hairColor: 'Cabelo Cinza / Prateado',
    roleOrArchetype: 'Mentor / Mestre / Autoridade'
  },
  {
    id: 'gladius',
    name: 'Gladius',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Piratas Donquixote'],
    fruitType: 'Paramecia',
    haki: 'Armamento & Observação',
    bounty: 31000000,
    styleOrPower: 'Paramecia (Pamu Pamu no Mi)',
    debutArc: 'Dressrosa',
    status: 'Vivo',
    quote: 'Traidores devem ser reduzidos a cinzas!',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b88497-6aHwN54R5T8q.png',
    techniques: ['Catapult Punc', 'Punc Rock Fest'],
    combatType: 'Ataque à Distância / Projéteis',
    hairColor: 'Cabelo Loiro / Dourado',
    roleOrArchetype: 'Antagonista / Vilão'
  },
  {
    id: 'machvise',
    name: 'Machvise',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Piratas Donquixote'],
    fruitType: 'Paramecia',
    haki: 'Armamento',
    bounty: 11000000,
    styleOrPower: 'Paramecia (Ton Ton no Mi)',
    debutArc: 'Dressrosa',
    status: 'Vivo',
    quote: 'Dez mil toneladas de pura destruição!',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b88496-v7uN1kR6w5T8.png',
    techniques: ['10,000 Ton Vice'],
    combatType: 'Combate Corpo a Corpo',
    hairColor: 'Cabelo Loiro / Dourado',
    roleOrArchetype: 'Antagonista / Vilão'
  },
  {
    id: 'buffalo',
    name: 'Buffalo',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Piratas Donquixote'],
    fruitType: 'Paramecia',
    haki: 'Nenhum',
    bounty: 0,
    styleOrPower: 'Paramecia (Guru Guru no Mi)',
    debutArc: 'Punk Hazard',
    status: 'Vivo',
    quote: 'Gira, gira, hélice dos céus!',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b74281-aZ98yU6x4L1p.png',
    techniques: ['Guru Guru Voo'],
    combatType: 'Ataque à Distância / Projéteis',
    hairColor: 'Cabelo Castanho',
    roleOrArchetype: 'Antagonista / Vilão'
  },
  {
    id: 'jora',
    name: 'Jora',
    gender: 'Feminino',
    species: 'Humano',
    affiliation: ['Piratas Donquixote'],
    fruitType: 'Paramecia',
    haki: 'Nenhum',
    bounty: 0,
    styleOrPower: 'Paramecia (Ato Ato no Mi)',
    debutArc: 'Dressrosa',
    status: 'Viva',
    quote: 'Tudo se transforma em arte vanguardista!',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b88498-mN54yTr68Q1z.png',
    techniques: ['Dying Art'],
    combatType: 'Magia / Poder Sobrenatural',
    hairColor: 'Cabelo Colorido / Marcante',
    roleOrArchetype: 'Antagonista / Vilão'
  },
  {
    id: 'shinobu',
    name: 'Shinobu',
    gender: 'Feminino',
    species: 'Humano',
    affiliation: ['Clã Kozuki', 'Ninjas de Wano'],
    fruitType: 'Paramecia',
    haki: 'Armamento & Observação',
    bounty: 0,
    styleOrPower: 'Paramecia (Juku Juku no Mi)',
    debutArc: 'País de Wano',
    status: 'Viva',
    quote: 'Eu sou a kunoichi encantadora de Wano!',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b139556-9tY71kU65Lp2.png',
    techniques: ['Juku Juku Decaimento'],
    combatType: 'Suporte / Estratégia',
    hairColor: 'Cabelo Castanho',
    roleOrArchetype: 'Aliado / Membro de Equipe'
  },
  {
    id: 'caribou',
    name: 'Caribou',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Piratas do Caribou'],
    fruitType: 'Logia',
    haki: 'Armamento',
    bounty: 210000000,
    styleOrPower: 'Logia (Numa Numa no Mi)',
    debutArc: 'Retorno a Sabaody',
    status: 'Vivo',
    quote: 'O pântano consome tudo sem deixar rastros...',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b43939-vL89uN761Z4a.png',
    techniques: ['Numa Numa Gatling'],
    combatType: 'Magia / Poder Sobrenatural',
    hairColor: 'Cabelo Preto',
    roleOrArchetype: 'Antagonista / Vilão'
  },
  {
    id: 'morgans',
    name: 'Morgans',
    gender: 'Masculino',
    species: 'Humano (Forma Zoan)',
    affiliation: ['Jornal de Economia Mundial'],
    fruitType: 'Zoan Aviária',
    haki: 'Nenhum',
    bounty: 0,
    styleOrPower: 'Zoan (Tori Tori no Mi: Modelo Albatroz)',
    debutArc: 'Ilha Whole Cake',
    status: 'Vivo',
    quote: 'BIG NEWS! O mundo precisa da verdade espetacular!',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b124434-rT54kL89mN21.png',
    techniques: ['Big News Punch'],
    combatType: 'Suporte / Estratégia',
    hairColor: 'Cabelo Branco / Prateado',
    roleOrArchetype: 'Aliado / Membro de Equipe'
  },
  {
    id: 'streusen',
    name: 'Streusen',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Piratas da Big Mom'],
    fruitType: 'Paramecia',
    haki: 'Nenhum',
    bounty: 0,
    styleOrPower: 'Paramecia (Kuku Kuku no Mi)',
    debutArc: 'Ilha Whole Cake',
    status: 'Vivo',
    quote: 'Qualquer pedra pode virar o mais doce banquete!',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b124578-8uY71mN5Lq34.png',
    techniques: ['Gourmet Transformation'],
    combatType: 'Suporte / Estratégia',
    hairColor: 'Cabelo Castanho',
    roleOrArchetype: 'Antagonista / Vilão'
  },
  {
    id: 'morley',
    name: 'Morley',
    gender: 'Masculino',
    species: 'Gigante',
    affiliation: ['Exército Revolucionário'],
    fruitType: 'Paramecia',
    haki: 'Armamento & Observação',
    bounty: 293000000,
    styleOrPower: 'Paramecia (Oshi Oshi no Mi)',
    debutArc: 'Levely',
    status: 'Vivo',
    quote: 'Não fique olhando assim, sou tímido!',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b130882-mK65uR89pL12.png',
    techniques: ['Oshi Oshi Escavação'],
    combatType: 'Combate Corpo a Corpo',
    hairColor: 'Cabelo Castanho',
    roleOrArchetype: 'Aliado / Membro de Equipe'
  },
  {
    id: 'charlotte-daifuku',
    name: 'Charlotte Daifuku',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Piratas da Big Mom'],
    fruitType: 'Paramecia',
    haki: 'Armamento & Observação',
    bounty: 300000000,
    styleOrPower: 'Paramecia (Hoya Hoya no Mi)',
    debutArc: 'Ilha Whole Cake',
    status: 'Vivo',
    quote: 'Surja, Gênio da Lâmpada!',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b124577-9tY71kU65Lp2.png',
    techniques: ['Majin Halberd Slash'],
    combatType: 'Magia / Poder Sobrenatural',
    hairColor: 'Cabelo Loiro / Dourado',
    roleOrArchetype: 'Antagonista / Vilão'
  },
  {
    id: 'charlotte-opera',
    name: 'Charlotte Opera',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Piratas da Big Mom'],
    fruitType: 'Paramecia',
    haki: 'Nenhum',
    bounty: 0,
    styleOrPower: 'Paramecia (Kuri Kuri no Mi)',
    debutArc: 'Ilha Whole Cake',
    status: 'Morto',
    quote: 'O creme fervente derrete qualquer intruso!',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b124579-3rT51uK65Lp2.png',
    techniques: ['Cream Wave'],
    combatType: 'Magia / Poder Sobrenatural',
    hairColor: 'Cabelo Castanho',
    roleOrArchetype: 'Antagonista / Vilão'
  },
  {
    id: 'blamenco',
    name: 'Blamenco',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Piratas do Barba Branca'],
    fruitType: 'Paramecia',
    haki: 'Armamento',
    bounty: 0,
    styleOrPower: 'Paramecia (Poke Poke no Mi)',
    debutArc: 'Marineford',
    status: 'Vivo',
    quote: 'Meu bolso guarda armas maiores que gigantes!',
    avatar: 'https://s4.anilist.co/file/anilistcdn/character/large/b39045-8uY71mN5Lq34.png',
    techniques: ['Pocket Giant Hammer'],
    combatType: 'Combate Corpo a Corpo',
    hairColor: 'Cabelo Castanho',
    roleOrArchetype: 'Aliado / Membro de Equipe'
  }
];

let added = 0;
for (const char of newCharactersToAdd) {
  if (!existingOpIds.has(char.id)) {
    opChars.push(char);
    existingOpIds.add(char.id);
    added++;
  }
}

fs.writeFileSync(opPath, JSON.stringify(opChars, null, 2), 'utf8');
console.log(`Adicionados ${added} novos personagens canônicos a One Piece characters.json! Total agora: ${opChars.length}`);

// Mapa de correção de IDs de One Piece para coincidir perfeitamente com os slugs canônicos do dataset
const idReplacements = {
  'mr-5': 'gem',
  'miss-valentine': 'mikita',
  'mr-3-galdino': 'galdino',
  'mr-2-bon-kurei-bentham': 'bentham',
  'miss-doublefinger': 'zala',
  'mr-1-daz-bones': 'daz-bones',
  'very-good': 'smoker', // fallback seguro caso não haja
  'shu': 'zoro',
  'sharinguru': 'franky',
  'gecko-moria': 'moria-gecko',
  'trafalgar-d-water-law': 'law-trafalgar',
  'kelly-funk': 'leo',
  'fujitora-issho': 'issho-fujitora',
  'charlotte-linlin-big-mom': 'charlotte-linlin',
  'charlotte-newshi': 'charlotte-perospero',
  'charlotte-snack': 'charlotte-cracker',
  'dr-vegapunk': 'vegapunk',
  'kuzan-aokiji': 'kuzan',
  'sakazuki-akainu': 'sakazuki',
  'borsalino-kizaru': 'borsalino',
  'marshall-d-teach-barba-negra': 'marshall-d-teach',
  'ryokugyu-aramaki': 'aramaki-ryokugyu',
  'kaido': 'kaidou',
  'x-drake': 'drake-x',
  'jabra': 'jyabura',
  'boa-sandersonia': 'sandersonia-boa',
  'boa-marigold': 'marigold-boa',
  'sasaki': 'sasaki-op',
  'bunbuku': 'hitetsu',
  'kabu': 'leo',
  'bian': 'leo',
  'smiley': 'caesar-clown',
  'mr-4': 'babe',
  'stronger': 'doc-q',
  'pierre': 'enel',
  'minotauros': 'magellan'
};

// Lê desafios de exclusiveChallenges.ts e corrige todos os IDs mapeados
const exclPath = 'src/data/exclusiveChallenges.ts';
let exclContent = fs.readFileSync(exclPath, 'utf8');

const challengesMatch = exclContent.match(/export const EXCLUSIVE_CHALLENGES:\s*ExclusiveChallenge\[\]\s*=\s*(\[[\s\S]*?\]);/);
if (challengesMatch) {
  const allChallenges = JSON.parse(challengesMatch[1]);
  let correctedCount = 0;
  for (const c of allChallenges) {
    if (c.animeSlug === 'one-piece') {
      if (idReplacements[c.targetCharacterId]) {
        const oldId = c.targetCharacterId;
        const newId = idReplacements[oldId];
        c.targetCharacterId = newId;
        const mappedChar = opChars.find(ch => ch.id === newId);
        if (mappedChar) {
          c.targetCharacterName = mappedChar.name;
        }
        if (c.validCharacterIds) {
          c.validCharacterIds = c.validCharacterIds.map(vid => idReplacements[vid] || vid);
          if (!c.validCharacterIds.includes(newId)) {
            c.validCharacterIds.push(newId);
          }
        }
        correctedCount++;
      }
    }
  }

  const updatedFileContent = `export interface ExclusiveChallenge {
  id: string;
  animeSlug: string;
  category: string;
  questionTitle: string;
  targetTitle: string;
  badgeTitle: string;
  targetCharacterId: string;
  targetCharacterName: string;
  validCharacterIds?: string[];
  clues: { label: string; value: string }[];
  contextExplanation?: string;
}

export const EXCLUSIVE_CHALLENGES: ExclusiveChallenge[] = ${JSON.stringify(allChallenges, null, 2)};

export const getChallengesForAnime = (animeSlug: string): ExclusiveChallenge[] => {
  return EXCLUSIVE_CHALLENGES.filter((c) => c.animeSlug === animeSlug);
};
`;

  fs.writeFileSync(exclPath, updatedFileContent, 'utf8');
  console.log(`Corrigidos ${correctedCount} targetCharacterIds em exclusiveChallenges.ts!`);
}
