import fs from 'fs';
import path from 'path';

// Carrega os IDs de personagens de cada anime para validação estrita
function getAnimeCharMap(slug) {
  const p = path.join('src/data/animes', slug, 'characters.json');
  if (!fs.existsSync(p)) return new Map();
  const list = JSON.parse(fs.readFileSync(p, 'utf8'));
  const map = new Map();
  for (const c of list) {
    map.set(c.id, c.name);
  }
  return map;
}

const opMap = getAnimeCharMap('one-piece');
const narutoMap = getAnimeCharMap('naruto');
const jjkMap = getAnimeCharMap('jujutsu-kaisen');
const dsMap = getAnimeCharMap('demon-slayer');

// Importa os desafios anteriores de One Piece do JSON auxiliar
const opChallenges = JSON.parse(fs.readFileSync('scripts/op-challenges-out.json', 'utf8'));

// Adiciona mais ~25 Akumas no Mi canônicas para fechar o catálogo completo de ~135 a 140 frutas
const extraOpFruits = [
  {
    targetTitle: 'Kyuubi no Kitsune / Inu Inu no Mi: Modelo Raposa de Nove Caudas',
    badgeTitle: 'Zoan Mítica Metamórfica',
    charId: 'catarina-devon',
    valid: ['catarina-devon'],
    clues: [
      { label: 'Metamorfose Perfeita', value: 'Transforma-se na cópia idêntica de qualquer pessoa, incluindo roupas e voz' },
      { label: 'Caçadora da Lua Crescente', value: 'A mulher pirata mais perigosa já encarcerada no Nível 6 de Impel Down' },
      { label: 'Toque de Saturn', value: 'Tocou nos pés do Gorosei São Jaygarcia Saturn para copiar sua aparência' }
    ]
  },
  {
    targetTitle: 'Ryu Ryu no Mi: Modelo Triceratops',
    badgeTitle: 'Zoan Ancestral Mecânica / Chifres',
    charId: 'sasaki',
    valid: ['sasaki'],
    clues: [
      { label: 'Gola Rotatória de Voo', value: 'Gira a carapaça óssea do pescoço como uma serra voadora com propulsão' },
      { label: 'Líder dos Tobiroppo', value: 'Comandante da divisão blindada de Kaido e ex-capitão pirata' },
      { label: 'Duelo com o Franky Shogun', value: 'Teve seu chifre quebrado e barriga cortada pela espada Rouba-Raio' }
    ]
  },
  {
    targetTitle: 'Inu Inu no Mi: Modelo Tanuki',
    badgeTitle: 'Zoan Canídea Transformada em Objeto',
    charId: 'bunbuku',
    valid: ['bunbuku', 'hitetsu'],
    clues: [
      { label: 'Chaleira Viva', value: 'Uma chaleira de chá que comeu uma fruta Zoan e virou um tanuki companheiro' },
      { label: 'Companheiro em Wano', value: 'Animal de estimação de Tenguyama Hitetsu (Kozuki Sukiyaki)' },
      { label: 'Queimaduras na Barriga', value: 'Senta no fogo para ferver chá, mas às vezes sente calor demais' }
    ]
  },
  {
    targetTitle: 'Mushi Mushi no Mi: Modelo Besouro Rinoceronte',
    badgeTitle: 'Zoan Inseto',
    charId: 'kabu',
    valid: ['kabu'],
    clues: [
      { label: 'Força de Inseto', value: 'Transforma-se em um besouro kabutomushi com carapaça dura e chifre' },
      { label: 'Esquadrão Tontatta', value: 'Líder do Esquadrão dos Besouros Amarelos na rebelião contra Doflamingo' },
      { label: 'Porte Pequeno', value: 'Guerreiro anão da tribo Tontatta dotado de força proporcional espantosa' }
    ]
  },
  {
    targetTitle: 'Mushi Mushi no Mi: Modelo Vespa',
    badgeTitle: 'Zoan Inseto Voador',
    charId: 'bian',
    valid: ['bian'],
    clues: [
      { label: 'Ferrão Aéreo', value: 'Transforma-se numa vespa com ferrão veloz e voo de alta mobilidade' },
      { label: 'Comandante Tontatta', value: 'Líder do Esquadrão das Vespas Rosas no Reino de Tontatta' },
      { label: 'Mensageira de Ataque', value: 'Transportou guerreiros e bombas nas costas durante a Operação SOP' }
    ]
  },
  {
    targetTitle: 'Sara Sara no Mi: Modelo Axolotle',
    badgeTitle: 'Zoan Anfíbia',
    charId: 'smiley',
    valid: ['smiley', 'caesar-clown'],
    clues: [
      { label: 'Gelatina Tóxica', value: 'Fruta consumida pela massa concentrada de gás venenoso H2S de Punk Hazard' },
      { label: 'Renascimento em Fruta', value: 'Mostrou pela primeira vez uma fruta renascendo em uma maçã próxima após sua morte' },
      { label: 'Criador em Punk Hazard', value: 'Alimentada com doces químicos por Caesar Clown para detonar a ilha' }
    ]
  },
  {
    targetTitle: 'Zou Zou no Mi (Fruta do Elefante)',
    badgeTitle: 'Zoan Animal em Objeto',
    charId: 'spandam',
    valid: ['spandam', 'funkfreed'],
    clues: [
      { label: 'Espada Elefante', value: 'A espada Funkfreed comeu a fruta Zoan através da tecnologia de Vegapunk' },
      { label: 'Lâmina que Vira Tromba', value: 'Estica uma tromba de aço cortante com presas de marfim' },
      { label: 'Chefe da CP9', value: 'Pertencia ao covarde Spandam que acionou por engano o Buster Call' }
    ]
  },
  {
    targetTitle: 'Inu Inu no Mi: Modelo Dachshund',
    badgeTitle: 'Zoan Canina em Objeto',
    charId: 'mr-4',
    valid: ['mr-4', 'lassoo'],
    clues: [
      { label: 'Canhão Cachorro', value: 'Um canhão que comeu uma fruta Zoan e espirra bolas de beisebol com bombas' },
      { label: 'Resfriado Crônico', value: 'O cachorro-canhão Lassoo vive resfriado e espirra projéteis explosivos' },
      { label: 'Parceiro em Alabasta', value: 'Arma de estimação do Mr. 4 na Baroque Works' }
    ]
  },
  {
    targetTitle: 'Tama Tama no Mi (Fruta do Ovo)',
    badgeTitle: 'Paramecia / Zoan Evolutiva Ciclo da Vida',
    charId: 'tamago',
    valid: ['tamago'],
    clues: [
      { label: 'Ciclo Ovo-Pinto-Galo', value: 'Ao sofrer ferimentos mortais, racha a casca e renasce mais forte como Visconde e Conde' },
      { label: 'Pernas Longas', value: 'Membro da tribo das Pernas Longas e combatente dos Piratas da Big Mom' },
      { label: 'Xícara de Chá na Cabeça', value: 'Usa smoking requintado e equilibra uma xícara de chá quente sobre o chapéu' }
    ]
  },
  {
    targetTitle: 'Poke Poke no Mi (Fruta dos Bolsos)',
    badgeTitle: 'Paramecia Dimensional',
    charId: 'blamenco',
    valid: ['blamenco'],
    clues: [
      { label: 'Bolsos no Queixo', value: 'Guarda marretas gigantescas e arsenais dentro de bolsos na própria pele do queixo' },
      { label: 'Comandante da 6ª Divisão', value: 'Veterano dos Piratas do Barba Branca presente na Guerra de Marineford' },
      { label: 'Arma Favorita', value: 'Puxa um martelo maior que o próprio corpo para esmagar fuzileiros' }
    ]
  },
  {
    targetTitle: 'Kuri Kuri no Mi (Fruta do Creme)',
    badgeTitle: 'Paramecia de Confeitaria / Creme',
    charId: 'charlotte-opera',
    valid: ['charlotte-opera'],
    clues: [
      { label: 'Creme Cáustico', value: 'Produz creme doce superaquecido que queima e dissolve a pele dos oponentes' },
      { label: 'Quinto Filho de Big Mom', value: 'Ministro da Nata e irmão quíntuplo de Counter, Cadenza, Cabaletta e Gala' },
      { label: 'Castigo Mortal', value: 'Teve sua vida sugada por Big Mom durante um de seus ataques de fúria gastronômica' }
    ]
  },
  {
    targetTitle: 'Bata Bata no Mi (Fruta da Manteiga)',
    badgeTitle: 'Paramecia Láctea',
    charId: 'charlotte-galette',
    valid: ['charlotte-galette'],
    clues: [
      { label: 'Manteiga Prisão', value: 'Gera manteiga viscosa e espessa para imobilizar e prender mãos e pés de prisioneiros' },
      { label: 'Ministra da Manteiga', value: 'Filha de Big Mom com cabelo púrpura e sobretudo escuro' },
      { label: 'Contenção de Luffy', value: 'Ajudou o exército enfurecido de Big Mom a subjugar Luffy e Nami após Cracker' }
    ]
  },
  {
    targetTitle: 'Gocha Gocha no Mi (Fruta da Fusão)',
    badgeTitle: 'Paramecia de Fusão Corporal',
    charId: 'charlotte-newshi',
    valid: ['charlotte-newshi'],
    clues: [
      { label: 'Fusão de Dez Irmãos', value: 'Permite fundir múltiplos irmãos em um único guerreiro gigante armado com foice' },
      { label: 'Irmão Dodecagêmeo', value: 'Um dos dez irmãos gêmeos da família Charlotte encarregados de caçar os Mugiwaras' },
      { label: 'Emboscada em Cacao Island', value: 'Tentou impedir a fuga de Sanji e Luffy das docas de Cacao Island' }
    ]
  },
  {
    targetTitle: 'Toki Toki no Mi (Fruta do Tempo)',
    badgeTitle: 'Paramecia Cronológica Temporal',
    charId: 'kozuki-toki',
    valid: ['kozuki-toki'],
    clues: [
      { label: 'Salto para o Futuro', value: 'Permite avançar pessoas no tempo para o futuro, sem jamais poder retornar ao passado' },
      { label: 'Vinda do Século Perdido', value: 'Nasceu há mais de 800 anos e saltou no tempo até encontrar Kozuki Oden' },
      { label: 'Profecia de Wano', value: 'Proferiu em chamas o poema profético de que em 20 anos a lua traria a vingança' }
    ]
  },
  {
    targetTitle: 'Tori Tori no Mi: Modelo Albatroz',
    badgeTitle: 'Zoan Aviária Jornalística',
    charId: 'morgans',
    valid: ['morgans'],
    clues: [
      { label: 'Forma Híbrida Permanente', value: 'Permanece o tempo todo transformado em albatroz humanizado de terno e cartola' },
      { label: 'Presidente do Jornal', value: 'Líder do Jornal de Economia Mundial que controla as notícias do mundo (Big News)' },
      { label: 'Defesa das Fake News', value: 'Recusou propinas do Governo Mundial declarando que ama notícias bombásticas' }
    ]
  },
  {
    targetTitle: 'Bishi Bishi no Mi (Fruta do Biscoito Salgado / Salgadinho)',
    badgeTitle: 'Paramecia de Criação Alimentar',
    charId: 'charlotte-snack',
    valid: ['charlotte-snack'],
    clues: [
      { label: 'Ex-General da Doçura', value: 'Perdeu seu posto de quarto General da Doçura após ser derrotado por Urouge' },
      { label: 'Recompensa de 600 Milhões', value: 'Empunha uma espada larga e enfrentou a frota da Germa 66 na fuga de Whole Cake' },
      { label: 'Ministro dos Fritos', value: 'Filho robusto de Big Mom posicionado no porto para afundar o Sunny' }
    ]
  },
  {
    targetTitle: 'Uma Uma no Mi: Modelo Pégaso',
    badgeTitle: 'Zoan Mítica Alada',
    charId: 'stronger',
    valid: ['stronger', 'doc-q'],
    clues: [
      { label: 'Cavalo Alado dos Céus', value: 'Transforma um cavalo doente em um imenso pégaso com asas brancas plumadas' },
      { label: 'Montaria de Doc Q', value: 'Cavalo decrépito de estimação do médico dos Piratas do Barba Negra' },
      { label: 'Combate Aéreo contra Law', value: 'Sobrevoou o mar transportando Barba Negra na emboscada contra os Heart Pirates' }
    ]
  },
  {
    targetTitle: 'Uma Uma no Mi (Fruta do Cavalo)',
    badgeTitle: 'Zoan Equina',
    charId: 'pierre',
    valid: ['pierre', 'gan-fall'],
    clues: [
      { label: 'Pássaro que Virou Cavalo', value: 'Fruta consumida por um pássaro que se transforma num pégaso com bolinhas rosas' },
      { label: 'Montaria do Deus Gan Fall', value: 'Cavaleiro dos Céus e ex-deus de Skypiea que socorria pessoas ao soprar o apito' },
      { label: 'Aparência Desajeitada', value: 'Forma híbrida com asas de pássaro e corpo de cavalo manchado' }
    ]
  },
  {
    targetTitle: 'Ushi Ushi no Mi: Modelo Touro / Minotauro',
    badgeTitle: 'Zoan Desperta Bestial',
    charId: 'minotauros',
    valid: ['minotauros'],
    clues: [
      { label: 'Fera Desperta de Impel Down', value: 'Zoan Desperta cujos usuários perderam a consciência humana para os instintos da besta' },
      { label: 'Guardião Torturador', value: 'Uma das quatro feras carcereiras de Impel Down armada com clava de espinhos' },
      { label: 'Regeneração Monstruosa', value: 'Recupera-se de ferimentos quase imediatamente após ser derrotado no Nível 3' }
    ]
  },
  {
    targetTitle: 'Kumo Kumo no Mi (Fruta da Aranha Onigumo)',
    badgeTitle: 'Zoan Aracnídea',
    charId: 'onigumo',
    valid: ['onigumo'],
    clues: [
      { label: 'Oito Braços de Aranha', value: 'Brota membros negros de aranha das costas empunhando oito espadas simultâneas' },
      { label: 'Vice-Almirante Sinistro', value: 'Veterano do Buster Call e Marineford conhecido como Onigumo da Aranha' },
      { label: 'Algema de Seastone', value: 'Foi quem algemou Marco a Fênix com algemas de Kairouseki em Marineford' }
    ]
  }
];

extraOpFruits.forEach((item, idx) => {
  const targetChar = opMap.get(item.charId) || item.charId;
  opChallenges.push({
    id: `exc-op-${opChallenges.length + 1}-${item.charId}`,
    animeSlug: 'one-piece',
    category: 'Akuma no Mi',
    questionTitle: 'A quem pertence ou já pertenceu esta Akuma no Mi?',
    targetTitle: item.targetTitle,
    badgeTitle: item.badgeTitle,
    targetCharacterId: item.charId,
    targetCharacterName: targetChar,
    validCharacterIds: item.valid || [item.charId],
    clues: item.clues
  });
});

console.log('Total Final de Akumas no Mi para One Piece:', opChallenges.length);

// 2. NARUTO: JUTSUS SECRETOS, DŌJUTSU, KEKKEI GENKAI & INVOCAÇÃO (~32 Desafios)
const narutoRaw = [
  {
    targetTitle: 'Rasengan (Esfera Espiral)',
    badgeTitle: 'Ninjutsu de Mudança de Forma',
    charId: 'naruto-uzumaki',
    valid: ['naruto-uzumaki', 'minato-namikaze', 'jiraiya', 'kakashi-hatake', 'konohamaru-sarutobi'],
    clues: [
      { label: 'Criador Original', value: 'Criado pelo Quarto Hokage Minato Namikaze após 3 anos observando a Bijuudama' },
      { label: 'Mecânica do Chakra', value: 'Rotação, densidade e contenção extrema de chakra concentrado na palma da mão' },
      { label: 'Evolução Máxima', value: 'Combinado por Naruto com o Estilo Vento para criar o Rasenshuriken' }
    ]
  },
  {
    targetTitle: 'Chidori / Raikiri (Lâmina Relâmpago)',
    badgeTitle: 'Ninjutsu de Estilo Raio',
    charId: 'kakashi-hatake',
    valid: ['kakashi-hatake', 'sasuke-uchiha'],
    clues: [
      { label: 'Som Característico', value: 'Som agudo ensurdecedor comparado ao chilrear de mil pássaros' },
      { label: 'Necessidade do Sharingan', value: 'Exige o Sharingan para compensar o efeito de visão em túnel na arrancada' },
      { label: 'Variações Famosas', value: 'Chidori Nagashi, Chidori Senbon e Kirin desenvolvidos por Sasuke Uchiha' }
    ]
  },
  {
    targetTitle: 'Kamui (Poder Espacial do Mangekyou Sharingan)',
    badgeTitle: 'Dōjutsu Espaço-Temporal',
    charId: 'kakashi-hatake',
    valid: ['kakashi-hatake', 'obito-uchiha'],
    clues: [
      { label: 'Dimensão Exclusiva', value: 'Conecta o usuário a uma dimensão de bolso paralela com blocos cúbicos' },
      { label: 'Intangibilidade e Teletransporte', value: 'Permite atravessar matéria sólida enviando partes do corpo para outra dimensão' },
      { label: 'Origem Compartilhada', value: 'Pertencia originalmente ao par de olhos de Obito Uchiha doado a Kakashi na Ponte Kannabi' }
    ]
  },
  {
    targetTitle: 'Hiraishin no Jutsu (Técnica do Deus Voador do Trovão)',
    badgeTitle: 'Ninjutsu Espaço-Temporal Lendário',
    charId: 'minato-namikaze',
    valid: ['minato-namikaze', 'tobirama-senju'],
    clues: [
      { label: 'Selos de Teletransporte', value: 'Permite teletransportar-se instantaneamente para qualquer fórmula de selo demarcada' },
      { label: 'Kunais Especiais', value: 'Minato espalhava kunais de três pontas pelo campo de batalha para abater exércitos' },
      { label: 'Criador Pioneiro', value: 'Desenvolvido originalmente pelo Segundo Hokage Tobirama Senju' }
    ]
  },
  {
    targetTitle: 'Edo Tensei (Reencarnação do Mundo Impuro)',
    badgeTitle: 'Kinjutsu Proibido de Ressurreição',
    charId: 'orochimaru',
    valid: ['orochimaru', 'kabuto-yakushi', 'tobirama-senju'],
    clues: [
      { label: 'Sacrifício Vivo', value: 'Exige um corpo humano vivo como receptáculo para a alma do falecido invocada do Além' },
      { label: 'Regeneração Infinita', value: 'Cadáveres ressuscitados possuem chakra infinito e corpos imunes a ferimentos convencionais' },
      { label: 'A Quarta Grande Guerra', value: 'Kabuto ressuscitou dezenas de heróis e vilões lendários mudando o rumo da guerra' }
    ]
  },
  {
    targetTitle: 'Kage Bunshin no Jutsu (Técnica dos Clones das Sombras)',
    badgeTitle: 'Ninjutsu de Divisão de Chakra',
    charId: 'naruto-uzumaki',
    valid: ['naruto-uzumaki', 'tobirama-senju', 'kakashi-hatake', 'itachi-uchiha', 'hiruzen-sarutobi'],
    clues: [
      { label: 'Distribuição Equivalente', value: 'Divide o chakra do usuário igualmente entre réplicas físicas reais tangíveis' },
      { label: 'Transferência de Experiência', value: 'Ao desfazer o clone, todas as memórias e aprendizados retornam instantaneamente ao original' },
      { label: 'Pergaminho Sagrado', value: 'Primeiro jutsu proibido roubado e dominado por Naruto no primeiro capítulo' }
    ]
  },
  {
    targetTitle: 'Susanoo (O Guerreiro Espiritual Destruidor)',
    badgeTitle: 'Dōjutsu do Mangekyou Sharingan Definitivo',
    charId: 'sasuke-uchiha',
    valid: ['sasuke-uchiha', 'itachi-uchiha', 'madara-uchiha', 'kakashi-hatake', 'shisui-uchiha'],
    clues: [
      { label: 'Armadura Divina', value: 'Manifesta um gigantesco guerreiro espectral de chakra que protege e ataca' },
      { label: 'Armas Míticas de Itachi', value: 'Equipado com a lendária Espada de Totsuka e o Escelho de Yata' },
      { label: 'Forma Perfeita', value: 'Madara e Sasuke atingiram a forma de Susanoo Perfeito com armadura de samurai e asas' }
    ]
  },
  {
    targetTitle: 'Mokuton: Shin Suusenju (Várias Milhares de Mãos Verdadeiras)',
    badgeTitle: 'Kekkei Genkai do Estilo Madeira',
    charId: 'hashirama-senju',
    valid: ['hashirama-senju', 'yamato', 'madara-uchiha', 'danzo-shimura'],
    clues: [
      { label: 'Titã de Madeira Budista', value: 'Invoca uma estátua de proporções colossais com milhares de braços de madeira' },
      { label: 'Supressão de Bijuu', value: 'Capaz de capturar a Kyuubi vestida com a armadura do Susanoo de Madara' },
      { label: 'Fusão Elemental', value: 'Combinação das naturezas de chakra de Terra e Água exclusiva do Primeiro Hokage' }
    ]
  },
  {
    targetTitle: 'Byakugou no In (Selo da Força de Uma Centena)',
    badgeTitle: 'Fuinjutsu Médico de Regeneração',
    charId: 'tsunade-senju',
    valid: ['tsunade-senju', 'sakura-haruno', 'mito-uzumaki'],
    clues: [
      { label: 'Losango na Testa', value: 'Selo em formato de diamante que armazena chakra concentrado por anos diários' },
      { label: 'Regeneração Mitótica', value: 'Ao ser liberado, força a mitose celular instantânea regenerando órgãos e ferimentos mortais' },
      { label: 'Invocação de Katsuyu', value: 'Permite invocar grandes porções da lesma Katsuyu da Floresta Shikkotsu' }
    ]
  },
  {
    targetTitle: 'Hachimon Tonkou (Formação dos Oito Portões Internos)',
    badgeTitle: 'Taijutsu Proibido da Liberação Corporal',
    charId: 'might-guy',
    valid: ['might-guy', 'rock-lee'],
    clues: [
      { label: 'Oitavo Portão da Morte', value: 'Abertura do Portão da Morte no coração com sangue fervendo em vapor vermelho' },
      { label: 'Golpe Notcturne Guy', value: 'Distorceu o próprio espaço ao desferir o chute supremo que quase matou Madara Rikudou' },
      { label: 'Reconhecimento Lendário', value: 'Proclamado por Madara Uchiha como o mais forte em Taijutsu que ele já enfrentou' }
    ]
  },
  {
    targetTitle: 'Amaterasu (Chamas Negras Eternas)',
    badgeTitle: 'Dōjutsu do Mangekyou Sharingan de Fogo',
    charId: 'itachi-uchiha',
    valid: ['itachi-uchiha', 'sasuke-uchiha'],
    clues: [
      { label: 'Fogo Inextinguível', value: 'Chamas negras que queimam na linha de visão do usuário por sete dias e sete noites' },
      { label: 'Consumo de Qualquer Coisa', value: 'Capazes de queimar o próprio fogo normal e qualquer superfície sólida' },
      { label: 'Manipulação de Forma Kagutsuchi', value: 'Sasuke combinou o Amaterasu com a técnica Kagutsuchi para moldar espadas de fogo negro' }
    ]
  },
  {
    targetTitle: 'Tsukuyomi (Pesadelo da Lua Ilusória)',
    badgeTitle: 'Genjutsu Supremo do Olho Esquerdo',
    charId: 'itachi-uchiha',
    valid: ['itachi-uchiha'],
    clues: [
      { label: 'Controle Temporal e Espacial', value: 'Controla a percepção do tempo, fazendo 1 segundo parecer 72 horas de tortura mental' },
      { label: 'Colapso Psicológico', value: 'Deixou Kakashi Hatake em coma no hospital de Konoha após um único olhar' },
      { label: 'Exclusividade Genética', value: 'Pertence exclusivamente ao Mangekyou Sharingan esquerdo de Itachi Uchiha' }
    ]
  },
  {
    targetTitle: 'Shinra Tensei (Julgamento Divino / Repulsão Celestial)',
    badgeTitle: 'Poder do Rinnegan / Caminho Deva',
    charId: 'pain-nagato',
    valid: ['pain-nagato', 'madara-uchiha', 'sasuke-uchiha'],
    clues: [
      { label: 'Repulsão Gravitacional', value: 'Força gravitacional repulsiva capaz de desviar qualquer ataque ou pulverizar vilas' },
      { label: 'Destruição de Konoha', value: 'Devastou Konoha inteira criando uma gigantesca cratera vazia no solo' },
      { label: 'Intervalo de Recarga', value: 'Possui uma vulnerabilidade estrita de exatamente 5 segundos de intervalo entre os usos normais' }
    ]
  },
  {
    targetTitle: 'Chibaku Tensei (Devastação Planetária)',
    badgeTitle: 'Técnica de Gravidade do Rinnegan',
    charId: 'pain-nagato',
    valid: ['pain-nagato', 'madara-uchiha', 'sasuke-uchiha', 'kaguya-otsutsuki'],
    clues: [
      { label: 'Núcleo de Atração Negra', value: 'Cria uma esfera negra de gravidade que atrai montanhas e solo formando um pequeno meteoro' },
      { label: 'Criação da Lua', value: 'Técnica originalmente utilizada por Hagoromo e Hamura para selar Kaguya Otsutsuki e criar a Lua' },
      { label: 'Prisão para Bijuus', value: 'Sasuke prendeu as nove Bijuus em meteoros Chibaku Tensei com um estalar de dedos' }
    ]
  },
  {
    targetTitle: 'Kirin (Besta Relâmpago dos Céus)',
    badgeTitle: 'Ninjutsu de Raio Natural',
    charId: 'sasuke-uchiha',
    valid: ['sasuke-uchiha'],
    clues: [
      { label: 'Nuvens de Tempestade Naturais', value: 'Aquece a atmosfera com jatos de fogo para canalizar raios reais das nuvens cumulus' },
      { label: 'Velocidade de 1 Milésimo de Segundo', value: 'Golpe relâmpago que desaba dos céus na velocidade natural da eletricidade' },
      { label: 'Duelo Fraterno', value: 'Utilizado por Sasuke contra o Susanoo de Itachi no esconderijo Uchiha' }
    ]
  },
  {
    targetTitle: 'Kotoamatsukami (Ilusão Suprema do Olho de Shisui)',
    badgeTitle: 'Genjutsu Mais Poderoso do Mundo Ninja',
    charId: 'shisui-uchiha',
    valid: ['shisui-uchiha', 'danzo-shimura'],
    clues: [
      { label: 'Manipulação Mental Invisível', value: 'Controla a mente do alvo sem que a própria vítima jamais perceba que está sendo manipulada' },
      { label: 'Tempo de Espera de 10 Anos', value: 'Exige uma década inteira para recarregar sem as células de Hashirama Senju' },
      { label: 'Quebra do Edo Tensei', value: 'Libertou Itachi Uchiha do controle absoluto do Edo Tensei de Kabuto na Quarta Guerra' }
    ]
  },
  {
    targetTitle: 'Izanagi (A Troca do Destino pela Cegueira)',
    badgeTitle: 'Kinjutsu do Clã Uchiha',
    charId: 'danzo-shimura',
    valid: ['danzo-shimura', 'obito-uchiha', 'madara-uchiha', 'itachi-uchiha'],
    clues: [
      { label: 'Reescrever a Realidade', value: 'Transforma ferimentos e a própria morte em mera ilusão, ressuscitando o usuário' },
      { label: 'Cegueira Definitiva', value: 'O olho Sharingan utilizado na técnica perde a luz para sempre após o encerramento' },
      { label: 'Braço com Dez Olhos', value: 'Danzo implantou dez Sharingans no braço direito reforçado com células de Hashirama' }
    ]
  },
  {
    targetTitle: 'Izanami (O Ciclo Infinito do Destino)',
    badgeTitle: 'Kinjutsu de Salvação do Clã Uchiha',
    charId: 'itachi-uchiha',
    valid: ['itachi-uchiha'],
    clues: [
      { label: 'Loop Temporal Infinito', value: 'Prende a mente da vítima em uma repetição infinita de sensações corporais até que aceite seu destino' },
      { label: 'Criado para Parar o Izanagi', value: 'Desenvolvido no passado para punir membros do clã Uchiha arrogantes que abusavam do Izanagi' },
      { label: 'Redenção de Kabuto', value: 'Itachi cegou seu olho direito para fazer Kabuto Yakushi aceitar sua verdadeira identidade' }
    ]
  },
  {
    targetTitle: 'Sabaku Kyuu / Sabaku Sousou (Caixão de Areia / Enterro de Areia)',
    badgeTitle: 'Ninjutsu Terrestre de Areia',
    charId: 'gaara',
    valid: ['gaara'],
    clues: [
      { label: 'Esmagamento sob Pressão', value: 'Envolve o corpo da vítima em areia espessa esmagando seus ossos sob pressão colossal' },
      { label: 'Cabaça de Areia nas Costas', value: 'Carrega areia enriquecida com chakra infundida com o amor protetor de sua mãe Karura' }
    ]
  },
  {
    targetTitle: 'Kikamushi no Jutsu (Insetos Parasitas Kikaichu)',
    badgeTitle: 'Hiden Secreto do Clã Aburame',
    charId: 'shino-aburame',
    valid: ['shino-aburame'],
    clues: [
      { label: 'Simbiose Corporal', value: 'Insetos que vivem sob a pele do usuário alimentando-se de chakra e obedecendo ordens' },
      { label: 'Drenagem Silenciosa', value: 'Enxames que cobrem o oponente drenando todo o seu chakra sem fazer ruído' },
      { label: 'Personalidade Estoica', value: 'Gênio analítico que usa capuz e óculos escuros e nunca subestima adversários' }
    ]
  },
  {
    targetTitle: 'Kagemane no Jutsu (Técnica de Possessão da Sombra)',
    badgeTitle: 'Hiden Secreto do Clã Nara',
    charId: 'shikamaru-nara',
    valid: ['shikamaru-nara'],
    clues: [
      { label: 'Mimetismo Corporal', value: 'Estica a própria sombra para conectar à sombra do alvo, forçando-o a imitar seus movimentos' },
      { label: 'Estratégia de 200 de QI', value: 'Utilizada para prender oponentes enquanto calcula dezenas de jogadas à frente como no Shogi' },
      { label: 'Aliança Ino-Shika-Cho', value: 'Pilar tático central da lendária formação de três clãs de Konoha' }
    ]
  },
  {
    targetTitle: 'Shintenshin no Jutsu (Técnica de Transferência de Mente)',
    badgeTitle: 'Hiden Secreto do Clã Yamanaka',
    charId: 'ino-yamanaka',
    valid: ['ino-yamanaka'],
    clues: [
      { label: 'Projeção Espiritual', value: 'Dispara a própria consciência em linha reta assumindo o controle total do corpo do alvo' },
      { label: 'Vulnerabilidade do Corpo Original', value: 'O corpo físico do usuário cai inconsciente e vulnerável enquanto a mente estiver fora' },
      { label: 'Rede Sensorial da Guerra', value: 'Ino conectou a mente de milhares de shinobis durante a batalha contra o Juubi' }
    ]
  },
  {
    targetTitle: 'Baika no Jutsu (Técnica do Multi-Tamanho)',
    badgeTitle: 'Hiden Secreto do Clã Akimichi',
    charId: 'chouji-akimichi',
    valid: ['chouji-akimichi'],
    clues: [
      { label: 'Expansão Gigantesca', value: 'Converte calorias corporais em chakra para inflar o corpo como uma rocha gigante (Nikudan Sensha)' },
      { label: 'Asas de Borboleta', value: 'Queima as últimas calorias corporais manifestando imensas asas de borboleta de puro chakra' },
      { label: 'Pílulas Especiais', value: 'Três pílulas de cores verde, amarela e vermelha que amplificam a força cem vezes' }
    ]
  },
  {
    targetTitle: 'Juuken: Hakke Rokujuuyon Shou (Oito Trigramas Sessenta e Quatro Golpes)',
    badgeTitle: 'Taijutsu do Byakugan do Clã Hyuuga',
    charId: 'neji-hyuuga',
    valid: ['neji-hyuuga', 'hinata-hyuuga'],
    clues: [
      { label: 'Bloqueio de Tenketsu', value: 'Atinge com precisão cirúrgica os 64 pontos vitais de chakra paralisando o fluxo de energia' },
      { label: 'Visão de 360 Graus', value: 'Guiado pelo Byakugan que enxerga o sistema circulatório de chakra através de qualquer barreira' },
      { label: 'Ponto Cego Único', value: 'Possui um diminuto ponto cego atrás da primeira vértebra torácica no pescoço' }
    ]
  },
  {
    targetTitle: 'Shikotsumyaku (Manipulação Óssea Macabra)',
    badgeTitle: 'Kekkei Genkai do Clã Kaguya',
    charId: 'kimimaro',
    valid: ['kimimaro'],
    clues: [
      { label: 'Ossos Mais Duros que Aço', value: 'Projeta e extrai os próprios ossos da pele usando-os como espadas, balas e lanças' },
      { label: 'Dança das Samambaias (Sawarabi no Mai)', value: 'Brota uma colossal floresta de lâminas ósseas gigantescas perfurando o solo' },
      { label: 'Último Sobrevivente', value: 'Último membro vivo de seu clã bárbaro e o seguidor mais devoto de Orochimaru' }
    ]
  },
  {
    targetTitle: 'Jinton: Genkai Hakuri no Jutsu (Estilo Poeira / Desmantelamento Atômico)',
    badgeTitle: 'Kekkei Tōta (Fusão de Três Elementos)',
    charId: 'oonoki',
    valid: ['oonoki', 'mu'],
    clues: [
      { label: 'Estrutura Geométrica Transparente', value: 'Cria cubos e cones de energia tridimensional que pulverizam matéria a nível atômico' },
      { label: 'Três Elementos Combinados', value: 'Fusão avançada simultânea de Terra, Vento e Fogo exclusiva dos Tsuchikages' },
      { label: 'Terceiro Tsuchikage', value: 'Veterano governante de Iwagakure que sofre constantemente com dores na coluna' }
    ]
  },
  {
    targetTitle: 'Kibaku Nendo (Argila Explosiva C4 Karura)',
    badgeTitle: 'Kekkei Genkai do Estilo Explosão (Bakuton)',
    charId: 'deidara',
    valid: ['deidara'],
    clues: [
      { label: 'Bocas nas Palmas das Mãos', value: 'Mastiga argila infundida com chakra em bocas nas palmas das mãos criando esculturas vivas' },
      { label: 'C0: Auto-Destruição Artística', value: 'Abre a boca selada no peito para transformar o próprio corpo numa explosão de 10 km' },
      { label: 'Filosofia da Arte', value: 'Defendia fervorosamente que a verdadeira arte é uma explosão efêmera (Katsu!)' }
    ]
  },
  {
    targetTitle: 'Kugutsu no Jutsu: Hitokugutsu (Marionetes Humanas)',
    badgeTitle: 'Técnica Secreta dos Marionetistas',
    charId: 'sasori',
    valid: ['sasori'],
    clues: [
      { label: 'Marionetes Feitas de Cadáveres', value: 'Transforma corpos de ninjas mortos em marionetes capazes de usar seus jutsus originais' },
      { label: 'Marionete do Terceiro Kazekage', value: 'Manipulava o corpo do Terceiro Kazekage com a poderosa técnica da Areia de Ferro' },
      { label: 'Coração de Madeira', value: 'Transformou seu próprio corpo numa marionete mantendo viva apenas uma cápsula de carne no peito' }
    ]
  },
  {
    targetTitle: 'Jujutsu: Shuji Hyoketsu (Possessão da Morte por Sangue)',
    badgeTitle: 'Ritual Vodu da Fé de Jashin',
    charId: 'hidan',
    valid: ['hidan'],
    clues: [
      { label: 'Círculo de Sangue com Triângulo', value: 'Ao ingerir o sangue da vítima sobre o selo no chão, transforma seu corpo num boneco de vodu' },
      { label: 'Imortalidade Absoluta', value: 'Completamente incapaz de morrer mesmo decapitado ou desmembrado em pedaços' },
      { label: 'Foice de Três Lâminas', value: 'Empunha uma foice vermelha com corda para coletar gotas de sangue de seus alvos' }
    ]
  },
  {
    targetTitle: 'Suiton: Daikoudan no Jutsu (Projétil do Grande Tubarão Devorador)',
    badgeTitle: 'Ninjutsu de Absorção Aquática',
    charId: 'kisame-hoshigaki',
    valid: ['kisame-hoshigaki'],
    clues: [
      { label: 'Absorção de Chakra Inimigo', value: 'Tubarão de água colossal que cresce e fica mais potente ao devorar o chakra do ataque rival' },
      { label: 'A Besta sem Cauda', value: 'Possuía reservas monstruosas de chakra comparáveis às de uma própria Bijuu' },
      { label: 'Fusão com a Samehada', value: 'Fundiu-se com a espada Samehada transformando-se num tubarão humanóide com guelras' }
    ]
  },
  {
    targetTitle: 'Senpō: Modo Sábio dos Sapos (Sage Mode)',
    badgeTitle: 'Senjutsu da Energia Natural',
    charId: 'jiraiya',
    valid: ['jiraiya', 'naruto-uzumaki', 'minato-namikaze'],
    clues: [
      { label: 'Equilíbrio da Energia Natural', value: 'Absorve a energia da atmosfera combinando-a com chakra físico e espiritual' },
      { label: 'Fukusaku e Shima nos Ombros', value: 'Invocava os dois sapos anciões do Monte Myoboku nos ombros para manter o fluxo' },
      { label: 'Rasengan Gigante e Chōōdama', value: 'Amplifica a força física e os ninjutsus para dimensões monumentais' }
    ]
  },
  {
    targetTitle: 'Amenotejikara (Teletransporte Espacial do Rinnegan Supremo)',
    badgeTitle: 'Dōjutsu Espaço-Temporal com Tomoe',
    charId: 'sasuke-uchiha',
    valid: ['sasuke-uchiha'],
    clues: [
      { label: 'Troca de Lugar Instantânea', value: 'Troca de posição com qualquer pessoa ou objeto dentro de seu campo de visão num milissegundo' },
      { label: 'Rinnegan com Seis Tomoes', value: 'Despertado no olho esquerdo após receber o chakra do Rikudou Sennin' },
      { label: 'Tática contra Madara e Kaguya', value: 'Usado para transportar espadas e Chidori diretamente atrás da guarda dos oponentes' }
    ]
  }
];

// Monta lista de Naruto
const narutoChallenges = narutoRaw.map((item, idx) => {
  const targetChar = narutoMap.get(item.charId) || item.charId;
  return {
    id: `exc-naruto-${idx + 1}-${item.charId}`,
    animeSlug: 'naruto',
    category: 'Jutsus Secretos & Kekkei Genkai',
    questionTitle: 'A quem pertence esta técnica ou jutsu lendário?',
    targetTitle: item.targetTitle,
    badgeTitle: item.badgeTitle,
    targetCharacterId: item.charId,
    targetCharacterName: targetChar,
    validCharacterIds: item.valid || [item.charId],
    clues: item.clues
  };
});

console.log('Naruto desafios gerados:', narutoChallenges.length);

// 3. JUJUTSU KAISEN: EXPANSÕES DE DOMÍNIO & TÉCNICAS INATAS (~25 Desafios)
const jjkRaw = [
  {
    targetTitle: 'Muryoukousho (Vazio Imensurável / Immeasurable Void)',
    badgeTitle: 'Expansão de Domínio Suprema',
    charId: 'satoru-gojo',
    valid: ['satoru-gojo'],
    clues: [
      { label: 'Sobrecarga de Informação', value: 'Inunda o cérebro da vítima com todo o conhecimento do universo paralisando-a instantaneamente' },
      { label: 'Sinal de Mão Único', value: 'Ativada com o gesto do mudra de Taishakuten cruzando o dedo médio sobre o indicador' },
      { label: 'Domínio de 0.2 Segundos', value: 'Executou um domínio relâmpago de 0.2 segundos na estação de Shibuya para não matar civis' }
    ]
  },
  {
    targetTitle: 'Fukuma Mizushi (Santuário Malevolente / Malevolent Shrine)',
    badgeTitle: 'Expansão de Domínio Aberta Sem Barreira',
    charId: 'ryomen-sukuna',
    valid: ['ryomen-sukuna', 'yuji-itadori'],
    clues: [
      { label: 'Domínio sem Barreira Externa', value: 'Pinta sua técnica no ar como um artista desenhando no céu sem fechar barreira física' },
      { label: 'Cortes Desmantelar e Clivar', value: 'Chuva incessante de cortes Dismantle e Cleave num raio de destruição de até 200 metros' },
      { label: 'Rei das Maldições', value: 'Santuário budista sinistro com chifres e caveiras do feiticeiro da Era Heian' }
    ]
  },
  {
    targetTitle: 'Chimera Shadow Garden (Jardim das Sombras Quiméricas)',
    badgeTitle: 'Expansão de Domínio de Sombras',
    charId: 'megumi-fushiguro',
    valid: ['megumi-fushiguro', 'ryomen-sukuna'],
    clues: [
      { label: 'Inundação de Fluido Escuro', value: 'Cobre o solo com sombras líquidas viscosas invocando dezenas de shikigamis simultâneos' },
      { label: 'Domínio Incompleto', value: 'Inicialmente precisava de um espaço fechado como cavernas para servir de barreira física' },
      { label: 'Técnica das Dez Sombras', value: 'Técnica herdada do clã Zenin capaz de invocar o temido General Mahoraga' }
    ]
  },
  {
    targetTitle: 'Idle Death Gamble (Aposta Mortal Ociosa / Pachinko)',
    badgeTitle: 'Expansão de Domínio de Roleta Pachinko',
    charId: 'kinji-hakari',
    valid: ['kinji-hakari'],
    clues: [
      { label: 'Premiação do Jackpot', value: 'Ao acertar o Jackpot de 777 na roleta do mangá romântico ganha 4 minutos e 11 segundos de invencibilidade' },
      { label: 'Energia Amaldiçoada Infinita', value: 'Chakra e energia infinita jorrando no corpo com Técnica Reversa automática instantânea' },
      { label: 'Música Tema de Anime', value: 'A música Pure Love Train toca nos céus enquanto o usuário se torna literalmente imortal' }
    ]
  },
  {
    targetTitle: 'Horizon of the Captivating Skandha (Horizonte do Canto Cativante)',
    badgeTitle: 'Expansão de Domínio Tropical Oceânica',
    charId: 'dagon',
    valid: ['dagon'],
    clues: [
      { label: 'Praia Tropical Paradisíaca', value: 'Manifesta uma praia paradisíaca ensolarada que servia de refúgio para o grupo de Geto' },
      { label: 'Enxame da Morte (Death Swarm)', value: 'Invoca enxames infinitos de peixes e monstros marinhos vorazes com acerto garantido' },
      { label: 'Maldição do Desastre Marinho', value: 'Espírito amaldiçoado especial nascido do medo humano pelos oceanos e profundezas' }
    ]
  },
  {
    targetTitle: 'Self-Embodiment of Perfection (Autoincorporação da Perfeição)',
    badgeTitle: 'Expansão de Domínio das Mãos Gigantes',
    charId: 'mahito',
    valid: ['mahito'],
    clues: [
      { label: 'Toque da Alma Garantido', value: 'Coloca qualquer inimigo preso dentro da palma de suas mãos espirituais instantaneamente' },
      { label: 'Transfiguração Imediata', value: 'Transfigura a alma do alvo sem precisar encostar fisicamente com as mãos de carne' },
      { label: 'Duelo com Sukuna', value: 'Quase morreu após tocar acidentalmente na alma de Ryomen Sukuna dentro de Yuji Itadori' }
    ]
  },
  {
    targetTitle: 'Womb Profusion (Profusão do Ventre)',
    badgeTitle: 'Expansão de Domínio de Almas Amaldiçoadas',
    charId: 'kenjaku',
    valid: ['kenjaku', 'suguru-geto'],
    clues: [
      { label: 'Pilar Monstruoso de Faces', value: 'Cria uma colossal torre de rostos deformados sem fechar barreira externa' },
      { label: 'Domínio Aberto Lendário', value: 'Segundo feiticeiro na história capaz de manifestar um domínio sem barreiras fechadas' },
      { label: 'Gravidade Antigravitacional', value: 'Disparou uma onda esmagadora de gravidade revertida que destruiu a barreira de Yuki Tsukumo' }
    ]
  },
  {
    targetTitle: 'Authentic Mutual Love (Amor Mútuo Verdadeiro)',
    badgeTitle: 'Expansão de Domínio de Espadas e Cópias',
    charId: 'yuta-okkotsu',
    valid: ['yuta-okkotsu'],
    clues: [
      { label: 'Campo de Espadas Infinitas', value: 'Cobre o solo com centenas de katanas, cada uma contendo uma técnica copiada diferente' },
      { label: 'Ligação com Rika', value: 'A Rainha das Maldições Rika atua com poder pleno fora da barreira do domínio' },
      { label: 'Batalha Decisiva em Shinjuku', value: 'Encurralou Sukuna utilizando cortes Dismantle e fala amaldiçoada copiados' }
    ]
  },
  {
    targetTitle: 'Boogie Woogie (Troca de Posição com Palmas)',
    badgeTitle: 'Técnica Inata de Translocação',
    charId: 'aoi-todo',
    valid: ['aoi-todo'],
    clues: [
      { label: 'Bater de Palmas', value: 'Troca instantaneamente de lugar com qualquer pessoa ou objeto que possua energia amaldiçoada' },
      { label: 'QI de 530.000', value: 'Afirma possuir uma inteligência genial capaz de planejar centenas de trocas táticas por segundo' },
      { label: 'Amigo de Alma', value: 'Considera Yuji Itadori seu melhor amigo (Besto Friendo) por terem o mesmo gosto para mulheres' }
    ]
  },
  {
    targetTitle: 'Ratio Technique (Técnica dos Sete Pontos Três)',
    badgeTitle: 'Técnica Inata de Ponto Fraco',
    charId: 'kento-nanami',
    valid: ['kento-nanami'],
    clues: [
      { label: 'Divisão 7:3', value: 'Divide o corpo do alvo na proporção 7 para 3, forçando um ponto fraco crítico de corte' },
      { label: 'Faca com Pano Selado', value: 'Empunha uma lâmina sem fio enrolada em um tecido com padrão manchado' },
      { label: 'Voto das Horas Extras', value: 'Limita seu chakra durante o horário comercial e ganha um surto de energia ao fazer hora extra' }
    ]
  },
  {
    targetTitle: 'Técnica das Dez Sombras (Ten Shadows)',
    badgeTitle: 'Técnica Inata Hereditária do Clã Zenin',
    charId: 'megumi-fushiguro',
    valid: ['megumi-fushiguro', 'ryomen-sukuna'],
    clues: [
      { label: 'Marionetes de Sombra', value: 'Usa sombras das mãos para invocar cães divinos, sapos, elefantes e serpentes' },
      { label: 'General Mahoraga', value: 'Espada de Oito Empunhaduras que se adapta a qualquer fenômeno ou golpe sofrido' },
      { label: 'Disputa de Clãs', value: 'Técnica cujo usuário do passado matou o patriarca dos Seis Olhos do clã Gojo em um duelo' }
    ]
  },
  {
    targetTitle: 'Manipulação de Sangue (Blood Manipulation)',
    badgeTitle: 'Técnica Inata Hereditária do Clã Kamo',
    charId: 'choso',
    valid: ['choso', 'noritoshi-kamo', 'yuji-itadori'],
    clues: [
      { label: 'Flecha Perfurante (Piercing Blood)', value: 'Dispara um jato de sangue supersônico pressurizado capaz de perfurar concreto' },
      { label: 'Pintura da Morte', value: 'Choso não sofre de anemia por converter energia amaldiçoada diretamente em sangue fresco' },
      { label: 'Endurecimento Escarlate', value: 'Aumenta a circulação e pulsação cardíaca para ganhar velocidade e reflexos sobre-humanos' }
    ]
  },
  {
    targetTitle: 'Fala Amaldiçoada (Cursed Speech)',
    badgeTitle: 'Técnica Inata Hereditária do Clã Inumaki',
    charId: 'toge-inumaki',
    valid: ['toge-inumaki', 'yuta-okkotsu'],
    clues: [
      { label: 'Comandos Vocais Fatais', value: 'Imbui palavras com energia forçando o alvo a obedecer ordens como Não se Mova ou Exploda' },
      { label: 'Vocabulário de Ingredientes', value: 'Comunica-se exclusivamente com recheios de bolinhos de arroz onigiri para não ferir ninguém' },
      { label: 'Rebote na Garganta', value: 'Comandos fortes contra inimigos superiores causam tosse de sangue e desgaste severo da garganta' }
    ]
  },
  {
    targetTitle: 'Limitless / Mukagen (O Infinito Intocável)',
    badgeTitle: 'Técnica Inata Hereditária do Clã Gojo',
    charId: 'satoru-gojo',
    valid: ['satoru-gojo'],
    clues: [
      { label: 'Conceito da Convergência', value: 'Cria uma barreira infinita onde nada pode tocar o usuário devido à desaceleração infinitesimal' },
      { label: 'Azul e Vermelho', value: 'Atração (Azul) e Repulsão (Vermelho) combinadas na técnica secreta Vazio Roxo (Murasaki)' },
      { label: 'Exigência dos Seis Olhos', value: 'Exige o Dōjutsu dos Seis Olhos (Rikugan) para processar o fluxo microscópico de energia' }
    ]
  },
  {
    targetTitle: 'Transfiguração Ociosa (Idle Transfiguration)',
    badgeTitle: 'Técnica Inata de Manipulação de Alma',
    charId: 'mahito',
    valid: ['mahito'],
    clues: [
      { label: 'Mudar a Forma da Alma', value: 'Toca a alma das pessoas moldando a carne humana em monstros deformados e armas vivas' },
      { label: 'Imunidade Física', value: 'Ataques convencionais não causam dano a menos que o atacante possa enxergar os contornos da alma' },
      { label: 'Nascido do Ódio Humano', value: 'Espírito amaldiçoado de aparência jovem e cicatrizes que representa o desprezo entre humanos' }
    ]
  },
  {
    targetTitle: 'Coffin of the Iron Mountain (Caixão da Montanha de Ferro)',
    badgeTitle: 'Expansão de Domínio Vulcânica',
    charId: 'jogo',
    valid: ['jogo'],
    clues: [
      { label: 'Interior de Vulcão Ativo', value: 'Manifesta uma câmara magmática com rochas incandescentes que incineram feiticeiros comuns ao entrar' },
      { label: 'Meteoro Flamejante', value: 'Lança pedras vulcânicas gigantescas e jatos de chamas com acerto garantido' },
      { label: 'Desastre de Fogo', value: 'Espírito amaldiçoado especial de grau especial nascido do medo da terra e chamas' }
    ]
  },
  {
    targetTitle: 'Deadly Sentencing (Julgamento Mortal)',
    badgeTitle: 'Expansão de Domínio Jurídica do Tribunal',
    charId: 'hiromi-higuruma',
    valid: ['hiromi-higuruma'],
    clues: [
      { label: 'Proibição de Violência', value: 'Um tribunal solene onde toda a violência física é estritamente proibida por regras do domínio' },
      { label: 'Shikigami Judgeman', value: 'O juiz espiritual avalia os crimes da vítima confiscando sua técnica ou energia amaldiçoada' },
      { label: 'Espada do Carrasco', value: 'Pena de morte concede uma espada de luz dourada que mata com um único corte de raspão' }
    ]
  },
  {
    targetTitle: 'Star Rage (Massa Virtual / Bom-Ba-Ye)',
    badgeTitle: 'Técnica Inata de Física Teórica',
    charId: 'yuki-tsukumo',
    valid: ['yuki-tsukumo'],
    clues: [
      { label: 'Massa Virtual Infinita', value: 'Adiciona massa imaginária incomensurável a si mesma e ao shikigami Garuda sem perder agilidade' },
      { label: 'Buraco Negro Final', value: 'Em seu golpe suicida final acumulou tanta massa que colapsou num buraco negro real' },
      { label: 'Feiticeira de Grau Especial', value: 'Recusava missões tradicionais para pesquisar formas de erradicar a energia amaldiçoada' }
    ]
  },
  {
    targetTitle: 'Comedian (Comédia de Distorção da Realidade)',
    badgeTitle: 'Técnica Inata que Rivaliza com Gojo',
    charId: 'fumihiko-takaba',
    valid: ['fumihiko-takaba'],
    clues: [
      { label: 'Realização do que Achar Engraçado', value: 'Qualquer situação que o usuário achar genuinamente hilária se torna a realidade física absoluta' },
      { label: 'Ignorância do Próprio Poder', value: 'Funciona apenas porque o usuário não tem a menor ideia de que possui uma técnica amaldiçoada' },
      { label: 'Duelo com Kenjaku', value: 'Travou uma batalha de esquetes de comédia stand-up que neutralizou Kenjaku completamente' }
    ]
  },
  {
    targetTitle: 'Restrição Celestial Física (Zero Energia Amaldiçoada)',
    badgeTitle: 'Pacto Divino de Nascimento',
    charId: 'toji-fushiguro',
    valid: ['toji-fushiguro', 'maki-zenin'],
    clues: [
      { label: 'Zero Absoluto de Energia', value: 'Ausência total de energia amaldiçoada em troca de sentidos e força física sobre-humanos supremos' },
      { label: 'Invisibilidade para Barreiras', value: 'Completamente imune ao rastreamento e reconhecimento de barreiras e domínios comuns' },
      { label: 'Assassino de Feiticeiros', value: 'Conhecido mundialmente como o Caçador de Feiticeiros que derrotou Gojo no passado' }
    ]
  },
  {
    targetTitle: 'Mythical Amber Beast (Besta Mítica de Âmbar)',
    badgeTitle: 'Liberação de Energia Amaldiçoada Elétrica',
    charId: 'hajime-kashimo',
    valid: ['hajime-kashimo'],
    clues: [
      { label: 'Uso Único e Fatal', value: 'Técnica de disparo único que vaporiza a carne do usuário após o encerramento do combate' },
      { label: 'Fenômenos Eletromagnéticos', value: 'Converte o corpo em eletricidade disparando raios-X e ondas sonoras supersônicas' },
      { label: 'Deus do Trovão de 400 Anos Atrás', value: 'Guerreiro mais forte de sua era ressuscitado no Jogo do Abate para lutar contra Sukuna' }
    ]
  },
  {
    targetTitle: 'Técnica da Construção (Criação de Matéria com Esfera Perfeita)',
    badgeTitle: 'Técnica Inata de Síntese Material',
    charId: 'yorozu',
    valid: ['yorozu', 'mai-zenin'],
    clues: [
      { label: 'Criação a Partir do Nada', value: 'Cria qualquer substância física do zero, exceto armas amaldiçoadas de grau especial' },
      { label: 'Armadura de Inseto Metálico', value: 'Desenvolveu uma couraça biônica inspirada em insetos pré-históricos de alta mobilidade' },
      { label: 'Esfera Perfeita (True Sphere)', value: 'Esfera matemática perfeita sem área de contato que exerce pressão infinita ao toque' }
    ]
  },
  {
    targetTitle: 'Manipulação de Pássaros (Bird Strike)',
    badgeTitle: 'Técnica Inata de Corvos Suicidas',
    charId: 'mei-mei',
    valid: ['mei-mei'],
    clues: [
      { label: 'Pacto de Morte dos Corvos', value: 'Força corvos a cometerem suicídio removendo seu limite de energia num projétil devastador' },
      { label: 'Machado Gigante de Batalha', value: 'Empunha um pesado machado medieval com força e agilidade surpreendentes' },
      { label: 'Sobrevivência Única de Gojo', value: 'Afirma que Satoru Gojo foi a única pessoa viva a sobreviver ao impacto de um Bird Strike' }
    ]
  },
  {
    targetTitle: 'Black Flash (Kokusen / Clarão Negro)',
    badgeTitle: 'Fenômeno Supremo de Impacto Amaldiçoado',
    charId: 'yuji-itadori',
    valid: ['yuji-itadori', 'satoru-gojo', 'kento-nanami', 'aoi-todo', 'nobara-kugisaki', 'ryomen-sukuna'],
    clues: [
      { label: 'Distorção Espacial no Impacto', value: 'Ocorre quando a energia amaldiçoada colide em um milionésimo de segundo após o soco' },
      { label: 'Poder Elevado à Potência de 2.5', value: 'Multiplica a força destrutiva do golpe exponencialmente criando faíscas negras' },
      { label: 'Estado da Zona (The Zone)', value: 'Coloca o feiticeiro num estado mental sublime onde manipular energia fica tão natural quanto respirar' }
    ]
  },
  {
    targetTitle: 'Ressonância e Grampo de Palha (Straw Doll Technique)',
    badgeTitle: 'Técnica Inata de Maldição Vodu',
    charId: 'nobara-kugisaki',
    valid: ['nobara-kugisaki'],
    clues: [
      { label: 'Conexão Espiritual Vodu', value: 'Crava pregos imbuídos de energia num boneco de palha ou membro decepado atingindo o corpo real' },
      { label: 'Técnica Hairpin (Grampo)', value: 'Detona pregos fincados em objetos ou terreno circundante como minas explosivas' },
      { label: 'Dano na Alma de Mahito', value: 'Uma das raras técnicas capazes de atingir diretamente a alma de Mahito causando-lhe dor real' }
    ]
  },
  {
    targetTitle: 'Técnica das Chamas / Fuga (Open / Kamino)',
    badgeTitle: 'Técnica Oculta das Forjas de Fogo',
    charId: 'ryomen-sukuna',
    valid: ['ryomen-sukuna'],
    clues: [
      { label: 'Comando Sagrado Aberto', value: 'Pronuncia a palavra Abrir (Fuga) para manifestar uma flecha colossal de chamas puras' },
      { label: 'Destruição de Mahoraga e Jogo', value: 'Usada para carbonizar instantaneamente a maldição de fogo Jogo e o General Mahoraga em Shibuya' },
      { label: 'Combustão Termobárica', value: 'Desperta uma onda de choque termobárica devastadora alimentada pelos detritos dos cortes do domínio' }
    ]
  },
  {
    targetTitle: 'Anti-Gravity System (Sistema Antigravidade Revertido)',
    badgeTitle: 'Técnica Inata Gravitacional Herdada',
    charId: 'kenjaku',
    valid: ['kenjaku', 'kaori-itadori'],
    clues: [
      { label: 'Origem de Kaori Itadori', value: 'Técnica pertencente ao corpo da mãe de Yuji Itadori roubado por Kenjaku no passado' },
      { label: 'Técnica Reversa Gravitacional', value: 'Ao aplicar a energia reversa, transformou a antigravidade numa força esmagadora de gravidade pesada' },
      { label: 'Sobrevivência ao Buraco Negro', value: 'Usou seu próprio corpo como domínio para sobreviver ao buraco negro criado por Yuki Tsukumo' }
    ]
  }
];

// Monta lista de JJK
const jjkChallenges = jjkRaw.map((item, idx) => {
  const targetChar = jjkMap.get(item.charId) || item.charId;
  return {
    id: `exc-jjk-${idx + 1}-${item.charId}`,
    animeSlug: 'jujutsu-kaisen',
    category: 'Técnicas & Domínios',
    questionTitle: 'A quem pertence esta técnica ou Expansão de Domínio?',
    targetTitle: item.targetTitle,
    badgeTitle: item.badgeTitle,
    targetCharacterId: item.charId,
    targetCharacterName: targetChar,
    validCharacterIds: item.valid || [item.charId],
    clues: item.clues
  };
});

console.log('JJK desafios gerados:', jjkChallenges.length);

// 4. DEMON SLAYER: ÁRVORE DAS RESPIRAÇÕES & KEKKIJUTSU (~25 Desafios)
const dsRaw = [
  {
    targetTitle: 'Respiração da Água (Water Breathing)',
    badgeTitle: 'Respiração Elemental Básica',
    charId: 'giyu-tomioka',
    valid: ['giyu-tomioka', 'tanjiro-kamado-human', 'sakonji-urokodaki', 'sabito', 'makomo', 'murata'],
    clues: [
      { label: 'Onze Formas', value: 'Possui 10 formas clássicas ensinadas por Urokodaki e a Décima Primeira Forma (Calmaria) criada por Giyu' },
      { label: 'Fluidez e Adaptação', value: 'Estilo de esgrima flexível que se adapta suavemente a qualquer postura e terreno' },
      { label: 'Mestre da Máscara de Tengu', value: 'Ensinada pelo ex-Hashira Sakonji Urokodaki na montanha Sagiri' }
    ]
  },
  {
    targetTitle: 'Hinokami Kagura / Respiração do Sol (Sun Breathing)',
    badgeTitle: 'Respiração Primordial de Todas as Respirações',
    charId: 'tanjiro-kamado-human',
    valid: ['tanjiro-kamado-human', 'tanjiro-kamado-demon-king', 'yoriichi-tsugikuni', 'tanjuro-kamado'],
    clues: [
      { label: 'Origem Histórica', value: 'A respiração original criada pelo lendário espadachim Yoriichi Tsugikuni na Era Sengoku' },
      { label: 'Dança Ritual da Família', value: 'Passada de pai para filho na família Kamado como uma dança sagrada de Ano Novo' },
      { label: 'Treze Formas Contínuas', value: 'A décima terceira forma consiste em encadear os 12 movimentos em um ciclo perpétuo contra Muzan' }
    ]
  },
  {
    targetTitle: 'Respiração da Chama (Flame Breathing)',
    badgeTitle: 'Respiração das Chamas Apaixonadas',
    charId: 'kyojuro-rengoku',
    valid: ['kyojuro-rengoku', 'shinjuro-rengoku'],
    clues: [
      { label: 'Nona Forma Rengoku', value: 'Investida avassaladora de poder destrutivo que rasga o solo criando um dragão de fogo' },
      { label: 'Linhagem de Hashiras', value: 'Praticada por gerações sucessivas de guerreiros de coração fervoroso do clã Rengoku' },
      { label: 'Batalha do Trem Infinito', value: 'Lutou com bravura feroz contra a Lua Superior Três Akaza protegendo 200 passageiros' }
    ]
  },
  {
    targetTitle: 'Respiração do Trovão (Thunder Breathing)',
    badgeTitle: 'Respiração de Velocidade Relâmpago',
    charId: 'zenitsu-agatsuma',
    valid: ['zenitsu-agatsuma', 'kaigaku', 'jigoro-kuwajima'],
    clues: [
      { label: 'Primeira Forma Iaijutsu', value: 'Hekireki Issen: velocidade fulminante sacando e guardando a espada num piscar de olhos' },
      { label: 'Sétima Forma Honoikazuchi no Kami', value: 'Criada exclusivamente por Zenitsu para derrotar seu antigo colega de treino Kaigaku' },
      { label: 'Atingido por Raio', value: 'Zenitsu teve seus cabelos tingidos de loiro após ser atingido por um raio de verdade numa árvore' }
    ]
  },
  {
    targetTitle: 'Respiração da Besta (Beast Breathing)',
    badgeTitle: 'Respiração Selvagem Autodidata',
    charId: 'inosuke-hashibira',
    valid: ['inosuke-hashibira'],
    clues: [
      { label: 'Espadas Denteadas', value: 'Usa duas katanas Nichirin com lâminas deliberadamente lascadas para rasgar a carne dos demônios' },
      { label: 'Sentido Espacial de Radar', value: 'Sensibilidade tátil sobre-humana na pele capaz de localizar demônios a quilômetros de distância' },
      { label: 'Criado por Javalis', value: 'Desenvolveu o estilo sozinho sobrevivendo nas montanhas selvagens com uma máscara de javali' }
    ]
  },
  {
    targetTitle: 'Respiração do Inseto (Insect Breathing)',
    badgeTitle: 'Respiração de Estocada Venenosa',
    charId: 'shinobu-kocho',
    valid: ['shinobu-kocho'],
    clues: [
      { label: 'Veneno de Glicínia', value: 'Substitui a força física de decapitação por perfurações rápidas injetando veneno de glicínia mortal' },
      { label: 'Ponta de Agulha', value: 'Lâmina modificada sem fio central terminando em uma ponta fina como ferrão de abelha' },
      { label: 'Dança das Borboletas', value: 'Movimentos graciosos que mimetizam borboletas, libélulas e centopeias' }
    ]
  },
  {
    targetTitle: 'Respiração da Névoa (Mist Breathing)',
    badgeTitle: 'Respiração de Ilusão e Ocultamento',
    charId: 'muichiro-tokito',
    valid: ['muichiro-tokito'],
    clues: [
      { label: 'Sétima Forma Oboro (Névoa Oculta)', value: 'Muda bruscamente o ritmo dos passos entre lentidão e arrancada súbita desorientando o oponente' },
      { label: 'Hashira Prodígio', value: 'Tornou-se Hashira em apenas dois meses após empunhar uma espada pela primeira vez' },
      { label: 'Descendente de Kokushibo', value: 'Linhagem de sangue descendente da família de espadachins Tsugikuni da Era Sengoku' }
    ]
  },
  {
    targetTitle: 'Respiração do Amor (Love Breathing)',
    badgeTitle: 'Respiração de Agilidade Acrobática',
    charId: 'mitsuri-kanroji',
    valid: ['mitsuri-kanroji'],
    clues: [
      { label: 'Espada em Fita Maleável', value: 'Empunha uma katana Nichirin tão fina e elástica que chicoteia como uma fita de ginástica rítmica' },
      { label: 'Densidade Muscular Óctupla', value: 'Possui constituição física com músculos 8 vezes mais densos que o normal humano' },
      { label: 'Treinada por Rengoku', value: 'Derivou seu estilo próprio após treinar sob a tutela de Kyojuro Rengoku' }
    ]
  },
  {
    targetTitle: 'Respiração da Serpente (Serpent Breathing)',
    badgeTitle: 'Respiração Ondulante Sinuosa',
    charId: 'obanai-iguro',
    valid: ['obanai-iguro'],
    clues: [
      { label: 'Lâmina Ondulada Kris', value: 'Espada de formato serpentino que desfere cortes curvos contornando qualquer bloqueio' },
      { label: 'Serpente Kaburamaru', value: 'Luta auxiliado por sua serpente branca que guia seus olhos cegados pelo veneno' },
      { label: 'Amor por Mitsuri', value: 'Jurou renascer em um mundo sem demônios para declarar seu amor à Hashira do Amor' }
    ]
  },
  {
    targetTitle: 'Respiração do Vento (Wind Breathing)',
    badgeTitle: 'Respiração de Ventanias Cortantes Ferozes',
    charId: 'sanemi-shinazugawa',
    valid: ['sanemi-shinazugawa'],
    clues: [
      { label: 'Garras de Ventania', value: 'Cortes acrobáticos ferozes que arremessam lâminas de ar pressurizado a distância' },
      { label: 'Sangue Raro Marechi', value: 'Possui sangue inebriante extremamente raro que embriaga e desorienta demônios no ar' },
      { label: 'Cicatrizes no Corpo', value: 'Corpo coberto de cicatrizes de combate feroz contra criaturas da noite' }
    ]
  },
  {
    targetTitle: 'Respiração da Pedra (Stone Breathing)',
    badgeTitle: 'Respiração de Força Terrena Monumental',
    charId: 'gyomei-himejima',
    valid: ['gyomei-himejima'],
    clues: [
      { label: 'Mangual e Machado com Corrente', value: 'Não usa katanas; empunha um pesado machado e mangual pontiagudo ligados por corrente de aço puro' },
      { label: 'Hashira Mais Forte', value: 'Reconhecido unanimemente pelos companheiros e por Muzan como o Caçador mais poderoso' },
      { label: 'Cegueira Espiritual', value: 'Guerreiro cego que enxerga o Mundo Transparente guiado pelos sons das correntes' }
    ]
  },
  {
    targetTitle: 'Respiração do Som (Sound Breathing)',
    badgeTitle: 'Respiração de Ritmo e Partitura',
    charId: 'tengen-uzui',
    valid: ['tengen-uzui'],
    clues: [
      { label: 'Espadas Duplas com Corrente', value: 'Duas espadas colossais unidas por corrente com bombas de pólvora de alta potência' },
      { label: 'Técnica da Partitura Musical', value: 'Lê os hábitos de ataque do inimigo como notas musicais para contra-atacar em ritmo perfeito' },
      { label: 'Ex-Ninja Shinobi', value: 'Autoproclamado Deus dos Festivais que possui três esposas kunoichi leais' }
    ]
  },
  {
    targetTitle: 'Respiração da Lua (Moon Breathing)',
    badgeTitle: 'Respiração Proibida dos Demônios',
    charId: 'kokushibo',
    valid: ['kokushibo'],
    clues: [
      { label: 'Lâminas Crescentes Caóticas', value: 'Desfere dezenas de lâminas em meia-lua que mudam constantemente de tamanho e trajetória' },
      { label: 'Espada de Carne e Olhos', value: 'Empunha a espada Kyokokukamusari forjada a partir de sua própria carne e sangue' },
      { label: 'Lua Superior Um', value: 'Irmão gêmeo de Yoriichi Tsugikuni que serviu a Muzan por mais de quatro séculos' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu de Fios de Sangue Cortantes',
    badgeTitle: 'Arte Demoníaca Aracnídea',
    charId: 'rui',
    valid: ['rui'],
    clues: [
      { label: 'Teias de Aço Carmesim', value: 'Fios endurecidos com sangue capazes de fatiar lâminas Nichirin comuns ao toque' },
      { label: 'Família Falsa da Montanha Natagumo', value: 'Impunha papéis familiares cruéis a outros demônios sob ameaça de tortura' },
      { label: 'Lua Inferior Cinco', value: 'Primeiro membro dos Doze Kizuki que forçou Tanjiro a despertar o Hinokami Kagura' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu da Morte Destrutiva (Agulha de Bússola)',
    badgeTitle: 'Arte Demoníaca Marcial Marcial Soryu',
    charId: 'akaza',
    valid: ['akaza'],
    clues: [
      { label: 'Detecção do Espírito de Luta', value: 'Bússola de flocos de neve que rastreia a intenção assassina de qualquer oponente' },
      { label: 'Ondas de Choque com os Punhos', value: 'Dispara ondas de impacto destruidoras no ar através de socos marciais vazios' },
      { label: 'Lua Superior Três', value: 'Demônio obcecado pela força que se recusava estritamente a matar ou devorar mulheres' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu de Gelo e Lótus Congelante',
    badgeTitle: 'Arte Demoníaca Criogênica',
    charId: 'doma',
    valid: ['doma'],
    clues: [
      { label: 'Pó de Gelo Necrosante', value: 'Pó gélido que destrói os alvéolos pulmonares de qualquer caçador que respire o ar' },
      { label: 'Leques Dourados Afiados', value: 'Empunha dois leques de ouro maciço para dispersar técnicas de lótus de gelo' },
      { label: 'Lua Superior Dois', value: 'Líder do Culto do Paraíso Eterno desprovido de qualquer emoção humana genuína' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu dos Vasos e Criaturas Marinhas',
    badgeTitle: 'Arte Demoníaca Artística Grotesca',
    charId: 'gyokko',
    valid: ['gyokko'],
    clues: [
      { label: 'Teletransporte entre Vasos', value: 'Surge e desaparece instantaneamente entre potes de porcelana espalhados no campo' },
      { label: 'Prisão de Água Asfixiante', value: 'Prende caçadores em esferas d\'água impenetráveis para sufocar a respiração' },
      { label: 'Lua Superior Cinco', value: 'Monstro com bocas no lugar de olhos que atacou a Vila dos Ferreiros' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu das Foices de Sangue e Veneno',
    badgeTitle: 'Arte Demoníaca de Lâminas Sangrentas',
    charId: 'gyutaro',
    valid: ['gyutaro', 'daki'],
    clues: [
      { label: 'Foices de Sangue Curvas', value: 'Lâminas de sangue tóxico impregnadas de veneno mortal e mortalidade imediata' },
      { label: 'Vidas Conectadas', value: 'Só pode ser morto se for decapitado simultaneamente com sua irmã Daki' },
      { label: 'Verdadeira Lua Superior Seis', value: 'Irmão protetor do Distrito do Entretenimento que vivia escondido dentro do corpo de Daki' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu das Faixas de Obi Voadoras',
    badgeTitle: 'Arte Demoníaca Têxtil Ocultadora',
    charId: 'daki',
    valid: ['daki', 'gyutaro'],
    clues: [
      { label: 'Faixas de Seda Cortantes', value: 'Faixas de pano afiadas como lâminas que armazenam pessoas vivas em seu interior' },
      { label: 'Disfarce de Oiran Warabihime', value: 'Cortesã de elite mais famosa do Distrito da Luz Vermelha em Yoshiwara' },
      { label: 'Terceiro Olho de Gyutaro', value: 'Recebeu o terceiro olho na testa para ser controlada nos reflexos por seu irmão' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu do Castelo Infinito (Espaço Fortaleza)',
    badgeTitle: 'Arte Demoníaca Espaço-Temporal',
    charId: 'nakime',
    valid: ['nakime'],
    clues: [
      { label: 'Toque da Biwa', value: 'Tocar as cordas de seu instrumento musical biwa manipula a gravidade e salas do castelo' },
      { label: 'Olho Único Rastreador', value: 'Envia globos oculares independentes por todo o Japão para espionar a sede dos Caçadores' },
      { label: 'Nova Lua Superior Quatro', value: 'Promovida por Muzan Kibutsuji após a morte de Hantengu na Vila dos Ferreiros' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu dos Sonhos Forçados e Hipnose',
    badgeTitle: 'Arte Demoníaca Onírica',
    charId: 'enmu',
    valid: ['enmu'],
    clues: [
      { label: 'Sono Hipo-Induzido', value: 'Mergulha vítimas em sonhos doces para destruir seus núcleos espirituais enquanto dormem' },
      { label: 'Fusão com a Locomotiva', value: 'Fundiu sua carne ao trem a vapor inteiro transformando os vagões em seu próprio corpo' },
      { label: 'Lua Inferior Um', value: 'Único demônio inferior poupado por Muzan no massacre da reunião de demônios' }
    ]
  },
  {
    targetTitle: 'Respiração da Flor (Flower Breathing)',
    badgeTitle: 'Respiração Graciosa das Flores',
    charId: 'kanao-tsuyuri',
    valid: ['kanao-tsuyuri'],
    clues: [
      { label: 'Olhos Escarlates Equinos (Higan Shugan)', value: 'Concentra o fluxo sanguíneo nos olhos aumentando a percepção cinética ao ponto de enxergar tudo em câmera lenta' },
      { label: 'Risco de Cegueira', value: 'A pressão sanguínea extrema nos vasos oculares pode levar à cegueira permanente se usada por muito tempo' },
      { label: 'Vingança de Shinobu', value: 'Usada por Kanao Tsuyuri para desferir o corte final decisivo que decapitou a Lua Superior Dois Doma' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu de Sangue Explosivo (Bakketsu)',
    badgeTitle: 'Arte Demoníaca Ígnea Anti-Demônio',
    charId: 'nezuko-kamado-human',
    valid: ['nezuko-kamado-human', 'nezuko-kamado-demon'],
    clues: [
      { label: 'Chamas Rosas Puras', value: 'Chamas ardentes cor de rosa que queimam e incineram exclusivamente outros demônios sem ferir humanos' },
      { label: 'Lâmina Nichirin Vermelha', value: 'Banha a espada de Tanjiro com seu sangue em chamas para despertar a lendária espada vermelha' },
      { label: 'Cura de Venenos Demoníacos', value: 'Queimou e neutralizou completamente o veneno letal de Gyutaro salvando a vida de Inosuke e Tengen' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu das Flechas Direcionais (Kouketsu)',
    badgeTitle: 'Arte Demoníaca de Vetores Invisíveis',
    charId: 'yahaba',
    valid: ['yahaba'],
    clues: [
      { label: 'Flechas Vetoriais nas Mãos', value: 'Olhos desenhados nas palmas das mãos que disparam vetores cinéticos invisíveis aos olhos comuns' },
      { label: 'Manipulação de Trajetória', value: 'Altera violentamente a trajetória de espadas, corpos e objetos arremessando-os contra paredes' },
      { label: 'Dupla em Asakusa', value: 'Enviado por Muzan junto com Susamaru para assassinar Tanjiro Kamado em Tóquio' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu das Bolas de Temari Pesadas',
    badgeTitle: 'Arte Demoníaca Balística de Seis Braços',
    charId: 'susamaru',
    valid: ['susamaru'],
    clues: [
      { label: 'Bolas de Handebol Destrutivas', value: 'Arremessa bolas de brinquedo temari tão pesadas e velozes que arrancam membros e destroem casas' },
      { label: 'Seis Braços Musculosos', value: 'Brota quatro braços adicionais do tronco para rebater múltiplas bolas com precisão mortal' },
      { label: 'Morte pela Maldição de Muzan', value: 'Foi destruída de dentro para fora pelas células de Muzan ao pronunciar o nome dele em voz alta' }
    ]
  },
  {
    targetTitle: 'Kekkijutsu dos Tambores de Rotação da Mansão',
    badgeTitle: 'Arte Demoníaca Acústica e Gravitacional',
    charId: 'kyogai',
    valid: ['kyogai'],
    clues: [
      { label: 'Tambores Tsuzumi no Corpo', value: 'Batidas nos tambores embutidos em seu peito e ombros giram as salas da mansão em 90 graus' },
      { label: 'Garras de Vento Cortante', value: 'Bater no tambor central do peito dispara três lâminas de ar pressurizado através do cômodo' },
      { label: 'Ex-Lua Inferior Seis', value: 'Perdeu seu número e foi rebaixado por Muzan Kibutsuji por ter atingido seu limite de força' }
    ]
  },
  {
    targetTitle: 'Regeneração e Controle Celular Biológico Absoluto',
    badgeTitle: 'Progenitor e Rei de Todos os Demônios',
    charId: 'muzan-kibutsuji',
    valid: ['muzan-kibutsuji'],
    clues: [
      { label: 'Sete Corações e Cinco Cérebros', value: 'Possui uma anatomia monstruosa com 7 corações pulsantes e 5 cérebros independentes móveis' },
      { label: 'Chicotes de Carne e Mandíbulas', value: 'Brota dezenas de tentáculos espinhosos com bocas vorazes das costas e pernas com alcance devastador' },
      { label: 'Sangue de Transformação', value: 'Seu sangue puro é a única substância capaz de transformar seres humanos comuns em demônios da noite' }
    ]
  },
  {
    targetTitle: 'Respiração da Água: Décima Primeira Forma - Calmaria (Nagi)',
    badgeTitle: 'Criação Exclusiva de Hashira',
    charId: 'giyu-tomioka',
    valid: ['giyu-tomioka'],
    clues: [
      { label: 'Quietude Absoluta da Água', value: 'O espadachim entra em um estado de calma espiritual onde qualquer ataque inimigo é dissipado sem efeito' },
      { label: 'Anulação Total de Fios', value: 'Cortou todas as teias de sangue reforçadas de Rui num piscar de olhos sem mover os pés' },
      { label: 'Feito Único do Pilar da Água', value: 'Uma forma inédita que não existia nos pergaminhos originais ensinados por Urokodaki' }
    ]
  },
  {
    targetTitle: 'Respiração das Chamas: Segunda Forma - Sol Poente Ascendente',
    badgeTitle: 'Estilo Herdado da Família Rengoku',
    charId: 'shinjuro-rengoku',
    valid: ['shinjuro-rengoku', 'kyojuro-rengoku'],
    clues: [
      { label: 'Corte Vertical Ascendente', value: 'Um arco de fogo vertical fulminante desferido de baixo para cima com potência devastadora' },
      { label: 'Antigo Hashira das Chamas', value: 'Pai de Kyojuro e ex-Hashira que abandonou o posto após a trágica morte de sua esposa Ruka' },
      { label: 'Proteção do Quartel-General', value: 'Retomou sua espada para proteger a nova liderança da família Ubuyashiki na batalha final' }
    ]
  },
  {
    targetTitle: 'Lâmina Carmesim Nichirin (Red Nichirin Blade)',
    badgeTitle: 'Poder Máximo dos Caçadores de Demônios',
    charId: 'tanjiro-kamado-human',
    valid: ['tanjiro-kamado-human', 'tanjiro-kamado-demon-king', 'yoriichi-tsugikuni', 'giyu-tomioka', 'sanemi-shinazugawa', 'muichiro-tokito', 'obanai-iguro', 'gyomei-himejima'],
    clues: [
      { label: 'Inibição Celular de Demônios', value: 'Ao ficar incandescente e vermelha, queima as células dos demônios impedindo sua regeneração instantânea' },
      { label: 'Pressão Extrema ou Colisão', value: 'Despertada segurando a empunhadura com força descomunal ou chocando duas espadas com intensidade sísmica' },
      { label: 'Pesadelo de Muzan', value: 'A mesma cor que a lâmina de Yoriichi Tsugikuni possuía ao cortar Muzan no passado' }
    ]
  }
];

// Monta lista de Demon Slayer
const dsChallenges = dsRaw.map((item, idx) => {
  const targetChar = dsMap.get(item.charId) || item.charId;
  return {
    id: `exc-ds-${idx + 1}-${item.charId}`,
    animeSlug: 'demon-slayer',
    category: 'Árvore das Respirações & Kekkijutsu',
    questionTitle: 'A quem pertence esta Respiração ou Kekkijutsu?',
    targetTitle: item.targetTitle,
    badgeTitle: item.badgeTitle,
    targetCharacterId: item.charId,
    targetCharacterName: targetChar,
    validCharacterIds: item.valid || [item.charId],
    clues: item.clues
  };
});

console.log('Demon Slayer desafios gerados:', dsChallenges.length);

// 5. Integração com o arquivo `src/data/exclusiveChallenges.ts`
const existingChallengesPath = 'src/data/exclusiveChallenges.ts';
const fileContent = fs.readFileSync(existingChallengesPath, 'utf8');

// Parse dos desafios existentes
const arrayMatch = fileContent.match(/export const EXCLUSIVE_CHALLENGES:\s*ExclusiveChallenge\[\]\s*=\s*(\[[\s\S]*?\]);/);
if (!arrayMatch) {
  console.error('Não foi possível localizar o array EXCLUSIVE_CHALLENGES!');
  process.exit(1);
}

const existingList = JSON.parse(arrayMatch[1]);
console.log('Total de desafios existentes antes:', existingList.length);

// Mantém todos os desafios dos OUTROS animes (Bleach, AOT, OPM, Solo Leveling, etc.)
const otherChallenges = existingList.filter(c => 
  c.animeSlug !== 'one-piece' && 
  c.animeSlug !== 'naruto' && 
  c.animeSlug !== 'jujutsu-kaisen' && 
  c.animeSlug !== 'demon-slayer'
);

console.log('Outros animes preservados:', otherChallenges.length);

// Junta tudo ordenado
const combined = [
  ...otherChallenges,
  ...opChallenges,
  ...narutoChallenges,
  ...jjkChallenges,
  ...dsChallenges
];

console.log('Novo Total Combinado de Desafios Exclusivos:', combined.length);

// Escreve de volta no arquivo
const newFileContent = `export interface ExclusiveChallenge {
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

export const EXCLUSIVE_CHALLENGES: ExclusiveChallenge[] = ${JSON.stringify(combined, null, 2)};

export const getChallengesForAnime = (animeSlug: string): ExclusiveChallenge[] => {
  return EXCLUSIVE_CHALLENGES.filter((c) => c.animeSlug === animeSlug);
};
`;

fs.writeFileSync(existingChallengesPath, newFileContent, 'utf8');
console.log('Arquivo src/data/exclusiveChallenges.ts atualizado com sucesso!');
