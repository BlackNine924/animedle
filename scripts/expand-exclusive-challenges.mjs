import fs from 'fs';

// Read current exclusiveChallenges.ts
const existingCode = fs.readFileSync('src/data/exclusiveChallenges.ts', 'utf8');

// Replace spoiler badges
let updatedCode = existingCode
  .replace(/"badgeTitle":\s*"Fruta do Diabo Logia"/g, '"badgeTitle": "Akuma no Mi"')
  .replace(/"badgeTitle":\s*"Fruta do Diabo Mítica"/g, '"badgeTitle": "Akuma no Mi"')
  .replace(/"badgeTitle":\s*"Fruta do Diabo Paramecia"/g, '"badgeTitle": "Akuma no Mi"');

// New challenges to inject for AoT (all 9 Titans), OPM, Tokyo Ghoul, SAO, and Romance
const newChallenges = [
  // --- ATTACK ON TITAN: ALL 9 TITANS ---
  {
    id: "exc-aot-tita-colossal-armin",
    animeSlug: "attack-on-titan",
    category: "Poder dos Nove Titãs",
    questionTitle: "Quem é o portador atual deste titã de destruição maciça?",
    targetTitle: "Titã Colossal (60 Metros)",
    badgeTitle: "Nove Titãs Originais",
    targetCharacterId: "armin-arlert",
    targetCharacterName: "Armin Arlert",
    clues: [
      { label: "Primeira Aparição do Portador", value: "Queda da Muralha Maria (Distrito de Shiganshina)" },
      { label: "Portador Anterior", value: "Bertholdt Hoover (guerreiro infiltrado de Marley)" },
      { label: "Habilidade Especial", value: "Explosão atômica na transformação e emissão de vapor superaquecido letal" }
    ],
    contextExplanation: "Armin Arlert herdou o Titã Colossal após a Batalha de Shiganshina, quando Levi escolheu injetar nele o soro de titã em vez de Erwin."
  },
  {
    id: "exc-aot-tita-femea-annie",
    animeSlug: "attack-on-titan",
    category: "Poder dos Nove Titãs",
    questionTitle: "A quem pertence este titã de combate marcial ágil?",
    targetTitle: "Titã Fêmea",
    badgeTitle: "Nove Titãs Originais",
    targetCharacterId: "annie-leonhart",
    targetCharacterName: "Annie Leonhart",
    clues: [
      { label: "Estilo de Combate", value: "Muay Thai e chutes de alta precisão com endurecimento de cristal" },
      { label: "Origem do Portador", value: "Zona de Internamento de Liberio (Guerreiros de Marley)" },
      { label: "Habilidade Única", value: "Atração de titãs puros por meio de grito estridente e auto-cristalização defensiva" }
    ],
    contextExplanation: "Annie Leonhart utilizou o Titã Fêmea para emboscar o Corpo de Reconhecimento na 57ª Expedição além dos Muros."
  },
  {
    id: "exc-aot-tita-mandibula-porco",
    animeSlug: "attack-on-titan",
    category: "Poder dos Nove Titãs",
    questionTitle: "Quem empunhava este titã de mandíbula esmagadora em Marley?",
    targetTitle: "Titã Mandíbula (Máscara Óssea)",
    badgeTitle: "Nove Titãs Originais",
    targetCharacterId: "porco-galliard",
    targetCharacterName: "Porco Galliard",
    clues: [
      { label: "Família e Antecessor", value: "Irmão mais novo de Marcel Galliard e sucessor de Ymir" },
      { label: "Confronto Decisivo", value: "Batalha do Distrito de Liberio contra o Titã de Ataque de Eren" },
      { label: "Poder das Garras e Dentes", value: "Capaz de triturar o cristal impenetrável do Titã Martelo de Guerra" }
    ],
    contextExplanation: "Porco Galliard usava sua agilidade feroz e máscara óssea para destruir linhas de defesa até seu sacrifício em Paradis."
  },
  {
    id: "exc-aot-tita-quadrupede-pieck",
    animeSlug: "attack-on-titan",
    category: "Poder dos Nove Titãs",
    questionTitle: "De quem é este titã quadrúpede de resistência infinita?",
    targetTitle: "Titã Quadrúpede (Cart Titan)",
    badgeTitle: "Nove Titãs Originais",
    targetCharacterId: "pieck-finger",
    targetCharacterName: "Pieck Finger",
    clues: [
      { label: "Armamento Acoplado", value: "Unidade Panzer com torres de metralhadoras operadas por soldados de Marley" },
      { label: "Resistência Fisiológica", value: "Capacidade de permanecer transformada por meses consecutivos sem fadiga" },
      { label: "Frase e Hábito", value: "Tem o hábito de andar de quatro mesmo em forma humana para se sentir confortável" }
    ],
    contextExplanation: "Pieck Finger é uma das mentes mais brilhantes do exército de Marley, providenciando suporte logístico e fogo pesado."
  },
  {
    id: "exc-aot-tita-martelo-lara",
    animeSlug: "attack-on-titan",
    category: "Poder dos Nove Titãs",
    questionTitle: "Qual nobre eldiana guardava em segredo o poder deste titã?",
    targetTitle: "Titã Martelo de Guerra",
    badgeTitle: "Nove Titãs Originais",
    targetCharacterId: "lara-tybur",
    targetCharacterName: "Lara Tybur",
    clues: [
      { label: "Clã Imperial", value: "Família Tybur (irmã de Willy Tybur)" },
      { label: "Localização do Portador", value: "Envolta em casulo de cristal subterrâneo conectada por cordão umbilical" },
      { label: "Criação de Armas", value: "Materializa espinhos gigantes, bestas e martelos descomunais de cristal endurecido" }
    ],
    contextExplanation: "Lara Tybur revelou o Titã Martelo durante o ataque a Liberio, sendo superada por Eren ao usar a mandíbula de Porco como quebra-nozes."
  },
  {
    id: "exc-aot-tita-bestial-zeke",
    animeSlug: "attack-on-titan",
    category: "Poder dos Nove Titãs",
    questionTitle: "A quem pertence este titã símio de arremesso devastador?",
    targetTitle: "Titã Bestial (17 Metros)",
    badgeTitle: "Nove Titãs Originais",
    targetCharacterId: "zeke-jaeger",
    targetCharacterName: "Zeke Jaeger",
    clues: [
      { label: "Linhagem Sanguínea", value: "Sangue Real Fritz herdado de sua mãe Dina Fritz" },
      { label: "Habilidade de Ativação", value: "Transforma qualquer um que consuma seu fluido espinhal em titã puro com um grito" },
      { label: "Apelido de Guerra", value: "O Garoto-Prodígio de Marley / Chefe dos Guerreiros" }
    ],
    contextExplanation: "Zeke Jaeger é meio-irmão de Eren e mentor do plano de eutanásia de Eldia, capaz de arremessar pedregulhos como artilharia."
  },

  // --- ONE PUNCH MAN ---
  {
    id: "exc-opm-soco-serio-saitama",
    animeSlug: "one-punch-man",
    category: "Golpes & Técnicas",
    questionTitle: "A quem pertence este golpe definitivo de força absoluta?",
    targetTitle: "Soco Sério (Serious Punch)",
    badgeTitle: "Golpes da Série Séria",
    targetCharacterId: "saitama",
    targetCharacterName: "Saitama",
    clues: [
      { label: "Treinamento Realizado", value: "100 flexões, 100 abdominais, 100 agachamentos e 10 km de corrida todos os dias" },
      { label: "Impacto no Céu", value: "Dividiu a atmosfera e as nuvens da Terra ao meio ao rebater o raio de Boros" },
      { label: "Profissão Declarada", value: "Um herói por hobby (registrado como Classe B na Associação)" }
    ],
    contextExplanation: "Saitama quebrou seu limitador de poder e derrota qualquer adversário com um único soco sério."
  },
  {
    id: "exc-opm-punho-rocha-bang",
    animeSlug: "one-punch-man",
    category: "Estilos Marciais",
    questionTitle: "Quem é o grande mestre criador deste estilo marcial?",
    targetTitle: "Punho da Água Corrente Espatifadora de Pedras",
    badgeTitle: "Artes Marciais de Heróis",
    targetCharacterId: "silver-fang",
    targetCharacterName: "Silver Fang (Bang)",
    clues: [
      { label: "Rank na Associação", value: "Herói Classe S - Rank 3" },
      { label: "Filosofia do Estilo", value: "Desvia a força do atacante como água corrente para contra-golpes esmagadores" },
      { label: "Ex-Discípulo Recluso", value: "Garou (O Caçador de Heróis)" }
    ],
    contextExplanation: "Silver Fang domina o Punho da Água Corrente, sendo um dos maiores mestres marciais vivos da Terra."
  },

  // --- TOKYO GHOUL ---
  {
    id: "exc-tg-quinque-jason-juuzou",
    animeSlug: "tokyo-ghoul",
    category: "Arsenal de Investigador",
    questionTitle: "Quem maneja esta terrível foice Quinque feita de Kakuja?",
    targetTitle: "13's Jason (Foice Quinque Rank S+)",
    badgeTitle: "Arsenal Quinque do CCG",
    targetCharacterId: "juuzou-suzuya",
    targetCharacterName: "Juuzou Suzuya",
    clues: [
      { label: "Origem do Kakuhou", value: "Extraído de Yakumo Oomori (Yamori / Jason do 13º Distrito)" },
      { label: "Características do Investigador", value: "Costuras na pele, cabelo branco com presilhas em XIII e falta de sensação de medo ou dor" },
      { label: "Promovido a", value: "Investigador de Classe Especial e Líder do Esquadrão Suzuya" }
    ],
    contextExplanation: "Juuzou empunha a foice 13's Jason com velocidade acrobática inacreditável para ceifar ghouls no campo de batalha."
  },
  {
    id: "exc-tg-kagune-coruja-eto",
    animeSlug: "tokyo-ghoul",
    category: "Biologia Ghoul",
    questionTitle: "A quem pertence o monstruoso Kakuja da Coruja de Um Olho Só?",
    targetTitle: "Kakuja da Coruja Caolha (One-Eyed Owl)",
    badgeTitle: "Ghouls Rank SSS",
    targetCharacterId: "eto-yoshimura",
    targetCharacterName: "Eto Yoshimura",
    clues: [
      { label: "Identidade Humana Pública", value: "Sen Takatsuki (Famosa autora bestseller de romances de terror psicológico)" },
      { label: "Organização Secreta", value: "Fundadora e Líder Suprema da Árvore Aogiri" },
      { label: "Linhagem Ghoul", value: "Filha de Kuzen Yoshimura e da humana Ukina (Híbrida Natural)" }
    ],
    contextExplanation: "Eto Yoshimura é a lendária Coruja de Um Olho Só, a mente por trás da Aogiri Tree e das maiores rebeliões de ghouls."
  },

  // --- SWORD ART ONLINE ---
  {
    id: "exc-sao-starburst-stream-kirito",
    animeSlug: "sword-art-online",
    category: "Sword Skills Exclusivas",
    questionTitle: "Quem desbloqueou e utilizou esta lendária Sword Skill de 16 golpes?",
    targetTitle: "Starburst Stream (Sequência de Explosão Estelar)",
    badgeTitle: "Sword Skills Exclusivas",
    targetCharacterId: "kirito",
    targetCharacterName: "Kirito",
    clues: [
      { label: "Habilidade Única Necessária", value: "Empunhadura Dupla (Dual Blades) concedida pelo sistema de Cardinal" },
      { label: "Armas Utilizadas", value: "Elucidator e Dark Repulser" },
      { label: "Chefe Derrotado", value: "O Demônio dos Olhos Azuis (The Gleam Eyes no 74º Andar de Aincrad)" }
    ],
    contextExplanation: "Kirito manteve sua habilidade de Empunhadura Dupla em segredo até salvar a tropa de combate contra The Gleam Eyes."
  },
  {
    id: "exc-sao-mothers-rosario-yuuki",
    animeSlug: "sword-art-online",
    category: "Sword Skills Exclusivas",
    questionTitle: "Quem criou a Sword Skill original de 11 acertos chamada Mother's Rosario?",
    targetTitle: "Mother's Rosario (11-Hit Combo)",
    badgeTitle: "Habilidade Original de Espada",
    targetCharacterId: "yuuki-konno",
    targetCharacterName: "Yuuki Konno",
    clues: [
      { label: "Título Lendário em ALO", value: "Zekken (A Espada Absoluta)" },
      { label: "Guilda em ALfheim Online", value: "Sleeping Knights" },
      { label: "Herdeira da Técnica", value: "Transmitiu a Sword Skill para Asuna Yuuki sob a grande árvore de ALO" }
    ],
    contextExplanation: "Yuuki Konno derrotou Kirito em duelo amistoso e confiou seu maior legado, Mother's Rosario, a Asuna."
  },

  // --- ROMANCE ---
  {
    id: "exc-romance-guarda-chuva-mahiru",
    animeSlug: "romance",
    category: "Confissões & Momentos Marcantes",
    questionTitle: "Qual 'anjo' da escola começou a cuidar do vizinho após este gesto de chuva?",
    targetTitle: "O Guarda-Chuva Emprestado em Dia Chuvoso",
    badgeTitle: "Romances Marcantes",
    targetCharacterId: "mahiru-shiina",
    targetCharacterName: "Mahiru Shiina",
    clues: [
      { label: "Apelido no Colégio", value: "O Anjo (Tenshi-sama)" },
      { label: "Comidas Preparadas", value: "Cozinha jantares caseiros balanceados todos os dias no apartamento vizinho de Amane" },
      { label: "Obra de Origem", value: "Meu Anjo de Vizinha Me Mima Demais (Otonari no Tenshi-sama)" }
    ],
    contextExplanation: "Mahiru Shiina recebeu o guarda-chuva de Amane no balanço de uma pracinha em um dia chuvoso, dando início ao romance."
  },
  {
    id: "exc-romance-russio-provocador-alya",
    animeSlug: "romance",
    category: "Confissões & Momentos Marcantes",
    questionTitle: "Quem disfarça seus sentimentos falando doces frases em russo?",
    targetTitle: "Sussurros Românticos em Idioma Russo",
    badgeTitle: "Romances Marcantes",
    targetCharacterId: "alya-kujou",
    targetCharacterName: "Alisa Mikhailovna Kujou (Alya)",
    clues: [
      { label: "Colega de Carteira", value: "Masachika Kuze (que entende russo perfeitamente em segredo)" },
      { label: "Apelido Escolar", value: "A Princesa Solitária / Aluna Exemplar do Ensino Médio" },
      { label: "Obra de Origem", value: "Alya Sometimes Hides Her Feelings in Russian (Roshidere)" }
    ],
    contextExplanation: "Alya acredita que Kuze não compreende suas confissões apaixonadas sussurradas em russo durante a aula."
  },
  {
    id: "exc-romance-badminton-chinatsu",
    animeSlug: "romance",
    category: "Confissões & Momentos Marcantes",
    questionTitle: "Quem é a senpai estrela do basquete que inspira o calouro do badminton?",
    targetTitle: "Treinos Matinais das 6h no Ginásio de Eimei",
    badgeTitle: "Romances Marcantes",
    targetCharacterId: "chinatsu-kano",
    targetCharacterName: "Chinatsu Kano",
    clues: [
      { label: "Esporte que Pratica", value: "Estrela titular da equipe de Basquete Feminino" },
      { label: "Situação Residencial", value: "Muda-se temporariamente para morar na mesma casa que Taiki Inomata" },
      { label: "Obra de Origem", value: "Blue Box (Ao no Hako)" }
    ],
    contextExplanation: "Chinatsu Kano treina todas as manhãs no ginásio ao lado de Taiki, nutrindo uma admiração mútua profunda e inspiradora."
  }
];

// Let's parse and append the challenges into EXCLUSIVE_CHALLENGES array in code
const insertionMarker = 'export const EXCLUSIVE_CHALLENGES: ExclusiveChallenge[] = [';
const insertIndex = updatedCode.indexOf(insertionMarker);

if (insertIndex !== -1) {
  const jsonStrings = newChallenges.map(c => '  ' + JSON.stringify(c, null, 2).replace(/\n/g, '\n  ')).join(',\n');
  const finalCode = updatedCode.slice(0, insertIndex + insertionMarker.length) + '\n' + jsonStrings + ',\n' + updatedCode.slice(insertIndex + insertionMarker.length);
  fs.writeFileSync('src/data/exclusiveChallenges.ts', finalCode, 'utf8');
  console.log(`Successfully added ${newChallenges.length} challenges and sanitized badges!`);
} else {
  console.error('Could not find insertion marker!');
}
