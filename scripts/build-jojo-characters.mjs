import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'jojos-bizarre-adventure');
const dataDir = path.join(rootDir, 'src', 'data', 'animes', 'jojos-bizarre-adventure');

if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

export const JOJO_ROSTER = [
  // ==========================================
  // PARTE 1: PHANTOM BLOOD
  // ==========================================
  {
    id: 'jonathan-joestar',
    name: 'Jonathan Joestar',
    anilistName: 'Jonathan Joestar',
    fandomTitle: 'Jonathan Joestar',
    gender: 'Masculino',
    species: 'Usuário de Hamon',
    affiliation: ['Família Joestar', 'Grupo Joestar'],
    origin: 'Inglaterra',
    stand: 'Nenhum',
    styleOrPower: 'Hamon (Ondulação)',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'O coração bate forte, o calor queima como fogo! Gravada pela coragem... Sunlight Yellow Overdrive!',
    techniques: ['Sunlight Yellow Overdrive', 'Zoom Punch', 'Scarlet Overdrive', 'Metal Silver Overdrive']
  },
  {
    id: 'dio-brando',
    name: 'Dio Brando',
    anilistName: 'Dio Brando',
    fandomTitle: 'Dio Brando',
    gender: 'Masculino',
    species: 'Vampiro',
    affiliation: ['Antagonistas Principais'],
    origin: 'Inglaterra',
    stand: 'Nenhum',
    styleOrPower: 'Poderes Vampíricos (Máscara de Pedra)',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'Eu rejeito a minha humanidade, JoJo! Vou transcender a humanidade!',
    techniques: ['Space Ripper Stingy Eyes', 'Toque Congelante Vaporizador', 'Regeneração Celular Vampírica']
  },
  {
    id: 'william-zeppeli',
    name: 'William A. Zeppeli',
    anilistName: 'William Zeppeli',
    fandomTitle: 'William Anthonio Zeppeli',
    gender: 'Masculino',
    species: 'Usuário de Hamon',
    affiliation: ['Grupo Joestar', 'Família Zeppeli'],
    origin: 'Itália',
    stand: 'Nenhum',
    styleOrPower: 'Hamon (Ondulação)',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'A coragem humana é saber o que é o medo e ainda assim torná-lo seu aliado!',
    techniques: ['Zoom Punch', 'Hamon Cutter', 'Sunlight Yellow Overdrive', 'Ultimate Deep Pass Overdrive']
  },
  {
    id: 'speedwagon',
    name: 'Robert E. O. Speedwagon',
    anilistName: 'Robert E.O. Speedwagon',
    fandomTitle: 'Robert E. O. Speedwagon',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Fundação Speedwagon', 'Grupo Joestar'],
    origin: 'Inglaterra',
    stand: 'Nenhum',
    styleOrPower: 'Lâminas no Chapéu',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'Até mesmo na sarjeta de Ogre Street, o cavalheirismo de Jonathan Joestar brilhou como o sol!',
    techniques: ['Lançamento de Chapéu com Lâminas', 'Calor Corporal de Salvamento']
  },
  {
    id: 'erina-pendleton',
    name: 'Erina Pendleton',
    anilistName: 'Erina Joestar',
    fandomTitle: 'Erina Pendleton',
    gender: 'Feminino',
    species: 'Humano Comum',
    affiliation: ['Família Joestar'],
    origin: 'Inglaterra',
    stand: 'Nenhum',
    styleOrPower: 'Nenhuma',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'Eu sempre acreditei e amei o homem nobre que você foi, Jonathan.',
    techniques: ['Cuidado Médico Tradicional']
  },
  {
    id: 'bruford',
    name: 'Bruford',
    anilistName: 'Bruford',
    fandomTitle: 'Bruford',
    gender: 'Masculino',
    species: 'Zumbi',
    affiliation: ['Cavaleiros das Trevas'],
    origin: 'Inglaterra',
    stand: 'Nenhum',
    styleOrPower: 'Dança Macabra dos Cabelos',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'Minha alma finalmente se libertou do ódio... receba a espada da Sorte e da Coragem!',
    techniques: ['Dança Macabra', 'Espada Luck & Pluck']
  },
  {
    id: 'tarkus',
    name: 'Tarkus',
    anilistName: 'Tarkus',
    fandomTitle: 'Tarkus',
    gender: 'Masculino',
    species: 'Zumbi',
    affiliation: ['Cavaleiros das Trevas'],
    origin: 'Inglaterra',
    stand: 'Nenhum',
    styleOrPower: 'Força Bruta e Correntes da Morte',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'Eu esmagarei seus ossos como gravetos quebrados!',
    techniques: ['Combate com Correntes', 'Esmagamento Brutal']
  },
  {
    id: 'dire',
    name: 'Dire',
    anilistName: 'Dire',
    fandomTitle: 'Dire',
    gender: 'Masculino',
    species: 'Usuário de Hamon',
    affiliation: ['Mestres de Hamon'],
    origin: 'Inglaterra',
    stand: 'Nenhum',
    styleOrPower: 'Thunder Cross Split Attack',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'Você caiu na armadilha, tolo! Thunder Cross Split Attack!',
    techniques: ['Thunder Cross Split Attack', 'Hamon Rose']
  },

  // ==========================================
  // PARTE 2: BATTLE TENDENCY
  // ==========================================
  {
    id: 'joseph-joestar',
    name: 'Joseph Joestar',
    anilistName: 'Joseph Joestar',
    fandomTitle: 'Joseph Joestar',
    gender: 'Masculino',
    species: 'Usuário de Hamon',
    affiliation: ['Família Joestar', 'Grupo Joestar'],
    origin: 'Inglaterra',
    stand: 'Hermit Purple',
    styleOrPower: 'Hamon com Clackers',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Vivo',
    quote: 'Sua próxima frase será: "Como você sabia?!"',
    techniques: ['Clacker Volley', 'Overdrive com Clackers', 'Estratégia de Fuga Sagrada', 'Hermit Purple']
  },
  {
    id: 'caesar-zeppeli',
    name: 'Caesar Anthonio Zeppeli',
    anilistName: 'Caesar Zeppeli',
    fandomTitle: 'Caesar Anthonio Zeppeli',
    gender: 'Masculino',
    species: 'Usuário de Hamon',
    affiliation: ['Grupo Joestar', 'Família Zeppeli'],
    origin: 'Itália',
    stand: 'Nenhum',
    styleOrPower: 'Hamon de Bolhas de Sabão',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Morto',
    quote: 'JoJo! Este é o meu último Hamon! Pegue-o de mim!',
    techniques: ['Bubble Launcher', 'Bubble Barrier', 'Bubble Cutter', 'Bubble Cutter Gliding']
  },
  {
    id: 'lisa-lisa',
    name: 'Lisa Lisa',
    anilistName: 'Lisa Lisa',
    fandomTitle: 'Lisa Lisa',
    gender: 'Feminino',
    species: 'Usuário de Hamon',
    affiliation: ['Mestres de Hamon', 'Grupo Joestar', 'Família Joestar'],
    origin: 'Itália',
    stand: 'Nenhum',
    styleOrPower: 'Hamon com Cachecol Condutor',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Vivo',
    quote: 'Não se atreva a chorar diante de um guerreiro caído enquanto a batalha não terminar.',
    techniques: ['Snake Muffler', 'Super Aja Overdrive']
  },
  {
    id: 'rudol-von-stroheim',
    name: 'Rudol von Stroheim',
    anilistName: 'Rudol von Stroheim',
    fandomTitle: 'Rudol von Stroheim',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Exército Alemão', 'Grupo Joestar'],
    origin: 'Alemanha',
    stand: 'Nenhum',
    styleOrPower: 'Cibernética de Combate Alemã',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Morto',
    quote: 'A ciência alemã é a melhor do mundo inteiro!',
    techniques: ['Metralhadora Abdominal 800 tiros/min', 'Canhão de Luz Ultravioleta', 'Dedo-Projétil']
  },
  {
    id: 'kars',
    name: 'Kars',
    anilistName: 'Kars',
    fandomTitle: 'Kars',
    gender: 'Masculino',
    species: 'Homem do Pilar',
    affiliation: ['Homens do Pilar', 'Antagonistas Principais'],
    origin: 'México',
    stand: 'Nenhum',
    styleOrPower: 'Modo de Luz (Lâminas de Osso Brilhante)',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Aposentado',
    quote: 'Eu conquistei o próprio Sol! Eu sou a forma suprema de toda a vida orgânica!',
    techniques: ['Lâminas de Luz Resplandecentes', 'Mutações de DNA Animal', 'Imortalidade Absoluta']
  },
  {
    id: 'esidisi',
    name: 'Esidisi',
    anilistName: 'Esidisi',
    fandomTitle: 'Esidisi',
    gender: 'Masculino',
    species: 'Homem do Pilar',
    affiliation: ['Homens do Pilar'],
    origin: 'México',
    stand: 'Nenhum',
    styleOrPower: 'Modo de Fogo (Sangue Fervente)',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Morto',
    quote: 'Quando fico furioso, eu choro até aliviar minha mente... Agora posso te despedaçar com calma.',
    techniques: ['Vasos Sanguíneos Extensíveis Ferventes', 'Agulhas Térmicas de Sangue']
  },
  {
    id: 'wamuu',
    name: 'Wamuu',
    anilistName: 'Wamuu',
    fandomTitle: 'Wamuu',
    gender: 'Masculino',
    species: 'Homem do Pilar',
    affiliation: ['Homens do Pilar'],
    origin: 'México',
    stand: 'Nenhum',
    styleOrPower: 'Modo de Vento (Tempestade de Areia Sagrada)',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Morto',
    quote: 'Para mim, lutar com dignidade é a única verdade existencial!',
    techniques: ['Kamisuna Arashi (Tempestade de Areia Divina)', 'Final Mode: Atmospheric Rift']
  },
  {
    id: 'santana',
    name: 'Santana',
    anilistName: 'Santana',
    fandomTitle: 'Santana',
    gender: 'Masculino',
    species: 'Homem do Pilar',
    affiliation: ['Homens do Pilar'],
    origin: 'México',
    stand: 'Nenhum',
    styleOrPower: 'Maleabilidade Esquelética e Absorção',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Aposentado',
    quote: 'Ele se infiltrou pelas frestas de ventilação deslocando todas as articulações corporais!',
    techniques: ['Invasão Corpórea', 'Costelas de Aprisionamento']
  },
  {
    id: 'smokey-brown',
    name: 'Smokey Brown',
    anilistName: 'Smokey Brown',
    fandomTitle: 'Smokey Brown',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Grupo Joestar'],
    origin: 'EUA',
    stand: 'Nenhum',
    styleOrPower: 'Nenhuma',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Vivo',
    quote: 'Joseph nunca me julgou pela cor da minha pele, ele simplesmente me protegeu.',
    techniques: ['Corrida Tática']
  },
  {
    id: 'suzi-q',
    name: 'Suzi Q',
    anilistName: 'Suzi Q',
    fandomTitle: 'Suzi Q',
    gender: 'Feminino',
    species: 'Humano Comum',
    affiliation: ['Família Joestar'],
    origin: 'Itália',
    stand: 'Nenhum',
    styleOrPower: 'Nenhuma',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Vivo',
    quote: 'Joseph! Você esqueceu de me enviar um telegrama dizendo que sobreviveu à erupção vulcânica?!',
    techniques: ['Assistência Doméstica']
  },

  // ==========================================
  // PARTE 3: STARDUST CRUSADERS
  // ==========================================
  {
    id: 'jotaro-kujo',
    name: 'Jotaro Kujo',
    anilistName: 'Joutarou Kuujou',
    fandomTitle: 'Jotaro Kujo',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Cruzados da Poeira Estelar', 'Grupo Joestar', 'Família Joestar'],
    origin: 'Japão',
    stand: 'Star Platinum',
    styleOrPower: 'Star Platinum',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Yare yare daze... Você não pode pagar pelo que fez com dinheiro!',
    techniques: ['Ora Ora Rush', 'Star Finger', 'Star Platinum: The World (Parar o Tempo)']
  },
  {
    id: 'noriaki-kakyoin',
    name: 'Noriaki Kakyoin',
    anilistName: 'Noriaki Kakyouin',
    fandomTitle: 'Noriaki Kakyoin',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Cruzados da Poeira Estelar', 'Grupo Joestar'],
    origin: 'Japão',
    stand: 'Hierophant Green',
    styleOrPower: 'Hierophant Green',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Esta é a minha mensagem final... decifre o segredo do Stand de DIO!',
    techniques: ['Emerald Splash', 'Tentáculos de Hierophant', 'Barreira de Esmeralda de 20 Metros']
  },
  {
    id: 'jean-pierre-polnareff',
    name: 'Jean Pierre Polnareff',
    anilistName: 'Jean-Pierre Polnareff',
    fandomTitle: 'Jean Pierre Polnareff',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Cruzados da Poeira Estelar', 'Grupo Joestar'],
    origin: 'França',
    stand: 'Silver Chariot',
    styleOrPower: 'Silver Chariot',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Meu nome é Jean Pierre Polnareff! Pela honra da minha irmã assassinada, você encontrará a ponta da minha lâmina!',
    techniques: ['Esgrima Ultrarrápida com Rapieira', 'Remoção de Armadura de Prata', 'Disparo de Lâmina']
  },
  {
    id: 'muhammad-avdol',
    name: 'Muhammad Avdol',
    anilistName: 'Mohammed Avdol',
    fandomTitle: 'Muhammad Avdol',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Cruzados da Poeira Estelar', 'Grupo Joestar'],
    origin: 'Egito',
    stand: "Magician's Red",
    styleOrPower: "Magician's Red",
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'YES, I AM! O fogo ardente de Magician\'s Red reduzirá tudo a cinzas!',
    techniques: ['Crossfire Hurricane', 'Crossfire Hurricane Special', 'Detecção de Calor Vital']
  },
  {
    id: 'iggy',
    name: 'Iggy',
    anilistName: 'Iggy',
    fandomTitle: 'Iggy',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Cruzados da Poeira Estelar', 'Grupo Joestar'],
    origin: 'EUA',
    stand: 'The Fool',
    styleOrPower: 'The Fool',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Um cão livre e orgulhoso que preferiu morrer lutando a deixar um companheiro ser destruído.',
    techniques: ['Manipulação de Areia Metamórfica', 'Asas de Areia para Voo', 'Clone de Areia']
  },
  {
    id: 'dio',
    name: 'DIO',
    anilistName: 'DIO',
    fandomTitle: 'DIO',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Antagonistas Principais'],
    origin: 'Inglaterra',
    stand: 'The World',
    styleOrPower: 'The World',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Za Warudo! Toki yo Tomare! Nove segundos é o meu limite atual!',
    techniques: ['Parada Temporal (The World)', 'Muda Muda Rush', 'Lançamento Massivo de Facas', 'Road Roller Da!']
  },
  {
    id: 'vanilla-ice',
    name: 'Vanilla Ice',
    anilistName: 'Vanilla Ice',
    fandomTitle: 'Vanilla Ice',
    gender: 'Masculino',
    species: 'Vampiro',
    affiliation: ['Servos de DIO'],
    origin: 'Egito',
    stand: 'Cream',
    styleOrPower: 'Cream',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Por Lord DIO, até a minha própria cabeça eu corto sem hesitação!',
    techniques: ['Vórtice do Vácuo Dimensional', 'Invisibilidade de Absorção Esférica']
  },
  {
    id: 'hol-horse',
    name: 'Hol Horse',
    anilistName: 'Hol Horse',
    fandomTitle: 'Hol Horse',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO'],
    origin: 'EUA',
    stand: 'Emperor',
    styleOrPower: 'Emperor',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Vivo',
    quote: 'O número dois é sempre mais seguro do que ser o número um!',
    techniques: ['Balas de Stand Teleguiadas', 'Disparo Rápido do Revólver Emperor']
  },
  {
    id: 'enya-geil',
    name: 'Enya Geil',
    anilistName: 'Enya Geil',
    fandomTitle: 'Enya the Hag',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Servos de DIO'],
    origin: 'Egito',
    stand: 'Justice',
    styleOrPower: 'Justice',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Com o poder de Justice, transformarei cada cadáver desta cidade na minha marionete!',
    techniques: ['Névoa de Controle de Cadáveres', 'Ilusão de Cidade Fantasma']
  },
  {
    id: 'j-geil',
    name: 'J. Geil',
    anilistName: 'J. Geil',
    fandomTitle: 'J. Geil',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO'],
    origin: 'Egito',
    stand: 'Hanged Man',
    styleOrPower: 'Hanged Man',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'O homem das duas mãos direitas que se move através dos reflexos de luz.',
    techniques: ['Ataque na Velocidade da Luz por Superfícies Reflexivas']
  },
  {
    id: 'daniel-j-darby',
    name: 'Daniel J. D\'Arby',
    anilistName: 'Daniel J. D\'Arby',
    fandomTitle: 'Daniel J. D\'Arby',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Deuses Egípcios', 'Servos de DIO'],
    origin: 'EUA',
    stand: 'Osiris',
    styleOrPower: 'Osiris',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Aposentado',
    quote: 'GOOD! Quando você admite a derrota em seu coração, sua alma se torna minha ficha de pôquer!',
    techniques: ['Roubo de Alma por Apostas', 'Fichas de Alma de Osiris']
  },
  {
    id: 'terrence-t-darby',
    name: 'Terrence T. D\'Arby',
    anilistName: 'Telence T. D\'Arby',
    fandomTitle: 'Telence T. D\'Arby',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Deuses Egípcios', 'Servos de DIO'],
    origin: 'EUA',
    stand: 'Atum',
    styleOrPower: 'Atum',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Aposentado',
    quote: 'Atum me responde com SIM ou NÃO diretamente pela vibração da sua alma!',
    techniques: ['Leitura de Almas (Sim ou Não)', 'Conversão de Almas em Bonecos de Videogame']
  },
  {
    id: 'pet-shop',
    name: 'Pet Shop',
    anilistName: 'Pet Shop',
    fandomTitle: 'Pet Shop',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Deuses Egípcios', 'Servos de DIO'],
    origin: 'Egito',
    stand: 'Horus',
    styleOrPower: 'Horus',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'O falcão sentinela impiedoso que congela seus alvos até o zero absoluto.',
    techniques: ['Estalagmites Gigantes de Gelo Criogênico', 'Mísseis de Gelo Teleguiados']
  },
  {
    id: 'mariah',
    name: 'Mariah',
    anilistName: 'Mariah',
    fandomTitle: 'Mariah',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Deuses Egípcios', 'Servos de DIO'],
    origin: 'Egito',
    stand: 'Bastet',
    styleOrPower: 'Bastet',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Aposentado',
    quote: 'Basta tocar na minha tomada para que seu corpo se torne o ímã mais destrutivo do mundo!',
    techniques: ['Magnetização Corporal Exponencial']
  },
  {
    id: 'alessi',
    name: 'Alessi',
    anilistName: 'Alessi',
    fandomTitle: 'Alessi',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Deuses Egípcios', 'Servos de DIO'],
    origin: 'Egito',
    stand: 'Sethan',
    styleOrPower: 'Sethan',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Aposentado',
    quote: 'Sethan faz você regredir à infância em questão de segundos!',
    techniques: ['Regressão de Idade por Sombra', 'Ataque com Machado e Pistola']
  },
  {
    id: 'oingo',
    name: 'Oingo',
    anilistName: 'Oingo',
    fandomTitle: 'Oingo',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Deuses Egípcios', 'Servos de DIO'],
    origin: 'Egito',
    stand: 'Khnum',
    styleOrPower: 'Khnum',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Aposentado',
    quote: 'Khnum me permite alterar meu rosto, altura, cheiro e voz para qualquer pessoa!',
    techniques: ['Metamorfose Facial Perfeita', 'Disfarce']
  },
  {
    id: 'boingo',
    name: 'Boingo',
    anilistName: 'Boingo',
    fandomTitle: 'Boingo',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Deuses Egípcios', 'Servos de DIO'],
    origin: 'Egito',
    stand: 'Tohth',
    styleOrPower: 'Tohth',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Aposentado',
    quote: 'As previsões em quadrinhos de Tohth nunca falham! É o destino absoluto!',
    techniques: ['Previsão em Quadrinhos do Futuro Iminente']
  },
  {
    id: 'steely-dan',
    name: 'Steely Dan',
    anilistName: 'Dan of Steel',
    fandomTitle: 'Steely Dan',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO'],
    origin: 'EUA',
    stand: 'Lovers',
    styleOrPower: 'Lovers',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Aposentado',
    quote: 'Qualquer dano que eu receba é multiplicado e transmitido direto para o cérebro da vítima!',
    techniques: ['Transmissão Microscópica de Dor Cerebral', 'Clonagem Celular de Lovers']
  },

  // ==========================================
  // PARTE 4: DIAMOND IS UNBREAKABLE
  // ==========================================
  {
    id: 'josuke-higashikata',
    name: 'Josuke Higashikata',
    anilistName: 'Jousuke Higashikata',
    fandomTitle: 'Josuke Higashikata',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Família Joestar', 'Grupo de Morioh'],
    origin: 'Japão',
    stand: 'Crazy Diamond',
    styleOrPower: 'Crazy Diamond',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'O que foi que você acabou de falar sobre o meu cabelo?! Doraaa!',
    techniques: ['Dora Dora Rush', 'Restauração e Cura Molecular', 'Reconstrução Distorcida de Objetos']
  },
  {
    id: 'okuyasu-nijimura',
    name: 'Okuyasu Nijimura',
    anilistName: 'Okuyasu Nijimura',
    fandomTitle: 'Okuyasu Nijimura',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Grupo de Morioh'],
    origin: 'Japão',
    stand: 'The Hand',
    styleOrPower: 'The Hand',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'A mão direita de The Hand apaga o próprio espaço e o que estiver nele da existência!',
    techniques: ['Eliminação Espacial pela Mão Direita', 'Teletransporte por Vácuo Espacial']
  },
  {
    id: 'koichi-hirose',
    name: 'Koichi Hirose',
    anilistName: 'Kouichi Hirose',
    fandomTitle: 'Koichi Hirose',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Grupo de Morioh'],
    origin: 'Japão',
    stand: 'Echoes',
    styleOrPower: 'Echoes (Act 1, 2 e 3)',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: '3 FREEZE! Sinta o peso insuportável da gravidade contra o chão!',
    techniques: ['Echoes ACT1 (Efeitos Sonoros)', 'Echoes ACT2 (Onomatopeias Tácteis)', 'Echoes ACT3 (3 Freeze - Gravidade)']
  },
  {
    id: 'rohan-kishibe',
    name: 'Rohan Kishibe',
    anilistName: 'Rohan Kishibe',
    fandomTitle: 'Rohan Kishibe',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Grupo de Morioh'],
    origin: 'Japão',
    stand: 'Heaven\'s Door',
    styleOrPower: 'Heaven\'s Door',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'Daga kotowaru! (Mas eu recuso!) Uma das coisas que Rohan Kishibe mais adora é dizer não a quem pensa ter vantagem!',
    techniques: ['Heaven\'s Door (Transformar em Livro)', 'Edição de Memória e Comandos Absolutos']
  },
  {
    id: 'yoshikage-kira',
    name: 'Yoshikage Kira',
    anilistName: 'Yoshikage Kira',
    fandomTitle: 'Yoshikage Kira',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Antagonistas Principais'],
    origin: 'Japão',
    stand: 'Killer Queen',
    styleOrPower: 'Killer Queen',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Morto',
    quote: 'Eu só quero ter uma vida tranquila... Killer Queen já tocou naquela maçaneta!',
    techniques: ['Primeira Bomba (Transmutação Explosiva)', 'Sheer Heart Attack (Segunda Bomba Teleguiada)', 'Bites the Dust (Terceira Bomba / Loop Temporal)']
  },
  {
    id: 'reimi-sugimoto',
    name: 'Reimi Sugimoto',
    anilistName: 'Reimi Sugimoto',
    fandomTitle: 'Reimi Sugimoto',
    gender: 'Feminino',
    species: 'Humano Comum',
    affiliation: ['Grupo de Morioh'],
    origin: 'Japão',
    stand: 'Nenhum',
    styleOrPower: 'Espírito Guardião de Morioh',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Morto',
    quote: 'Enquanto aquele assassino estiver solto pelas ruas de Morioh, minha alma não poderá descansar.',
    techniques: ['Conexão Espiritual do Beco Sem Saída']
  },
  {
    id: 'shigekiyo-yangu',
    name: 'Shigekiyo Yangu (Shigechi)',
    anilistName: 'Shigekiyo Yangu',
    fandomTitle: 'Shigekiyo Yangu',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Grupo de Morioh'],
    origin: 'Japão',
    stand: 'Harvest',
    styleOrPower: 'Harvest',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Morto',
    quote: 'Eu tenho que avisar o Josuke e o Okuyasu... tenho que proteger meus pais!',
    techniques: ['Coleta Massiva de Harvest (500 Unidades)', 'Injeção de Substâncias por Agulhas']
  },
  {
    id: 'yukako-yamagishi',
    name: 'Yukako Yamagishi',
    anilistName: 'Yukako Yamagishi',
    fandomTitle: 'Yukako Yamagishi',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Grupo de Morioh'],
    origin: 'Japão',
    stand: 'Love Deluxe',
    styleOrPower: 'Love Deluxe',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'Meu amor por você é perfeito, Koichi! Meus cabelos farão de você o homem ideal!',
    techniques: ['Manipulação Capilar Destrutiva', 'Implante de Fios de Controle']
  },
  {
    id: 'mikitaka-hazekura',
    name: 'Mikitaka Hazekura',
    anilistName: 'Mikitaka Hazekura',
    fandomTitle: 'Mikitaka Hazekura',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Grupo de Morioh'],
    origin: 'Japão',
    stand: 'Earth Wind and Fire',
    styleOrPower: 'Earth Wind and Fire',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'Eu sou um alienígena vindo de Magelan! Ou será que sou apenas um usuário de Stand excêntrico?',
    techniques: ['Metamorfose em Qualquer Objeto Inanimado']
  },
  {
    id: 'keicho-nijimura',
    name: 'Keicho Nijimura',
    anilistName: 'Keichou Nijimura',
    fandomTitle: 'Keicho Nijimura',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Irmãos Nijimura'],
    origin: 'Japão',
    stand: 'Bad Company',
    styleOrPower: 'Bad Company',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Morto',
    quote: 'Eu preciso encontrar alguém com poder suficiente para conceder uma morte digna ao meu pai.',
    techniques: ['Exército em Miniatura (Infantaria, Tanques e Helicópteros Apache)']
  },
  {
    id: 'akira-otoishi',
    name: 'Akira Otoishi',
    anilistName: 'Akira Otoishi',
    fandomTitle: 'Akira Otoishi',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Vilões de Morioh'],
    origin: 'Japão',
    stand: 'Red Hot Chili Pepper',
    styleOrPower: 'Red Hot Chili Pepper',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'Minha guitarra e Red Hot Chili Pepper vão eletrocutar o mundo do Rock!',
    techniques: ['Absorção de Energia Elétrica', 'Viagem por Fios de Alta Tensão']
  },
  {
    id: 'yuya-fungami',
    name: 'Yuya Fungami',
    anilistName: 'Yuuya Fungami',
    fandomTitle: 'Yuya Fungami',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Grupo de Morioh'],
    origin: 'Japão',
    stand: 'Highway Star',
    styleOrPower: 'Highway Star',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'Highway Star persegue você a exatamente 60 km/h pelo rastro do seu aroma!',
    techniques: ['Perseguição Implacável a 60 km/h', 'Drenagem de Nutrientes Vitais', 'Olfato Apuradíssimo']
  },
  {
    id: 'tonio-trussardi',
    name: 'Tonio Trussardi',
    anilistName: 'Tonio Trussardi',
    fandomTitle: 'Tonio Trussardi',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Moradores de Morioh'],
    origin: 'Itália',
    stand: 'Pearl Jam',
    styleOrPower: 'Pearl Jam',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'Minha culinária italiana não apenas encanta o paladar, ela cura o corpo e a mente!',
    techniques: ['Culinária Terapêutica Molecular', 'Purificação Corporal de Toxinas']
  },
  {
    id: 'aya-tsuji',
    name: 'Aya Tsuji',
    anilistName: 'Aya Tsuji',
    fandomTitle: 'Aya Tsuji',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Moradores de Morioh'],
    origin: 'Japão',
    stand: 'Cinderella',
    styleOrPower: 'Cinderella',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Morto',
    quote: 'Com o poder de Cinderella, posso remodelar a fisionomia e o destino amoroso de qualquer mulher.',
    techniques: ['Remodelação Estética Facial e Corporal', 'Troca de Rosto Biológica']
  },
  {
    id: 'hayato-kawajiri',
    name: 'Hayato Kawajiri',
    anilistName: 'Hayato Kawajiri',
    fandomTitle: 'Hayato Kawajiri',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Grupo de Morioh'],
    origin: 'Japão',
    stand: 'Nenhum',
    styleOrPower: 'Inteligência e Coragem Sem Stand',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'Eu não sou usuário de Stand, mas não vou deixar esse assassino vencer!',
    techniques: ['Dedução Lógica Genial', 'Gravação e Espionagem Doméstica']
  },

  // ==========================================
  // PARTE 5: GOLDEN WIND
  // ==========================================
  {
    id: 'giorno-giovanna',
    name: 'Giorno Giovanna',
    anilistName: 'Giorno Giovanna',
    fandomTitle: 'Giorno Giovanna',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'Equipe Bucciarati', 'Família Joestar'],
    origin: 'Itália',
    stand: 'Gold Experience',
    styleOrPower: 'Gold Experience',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Vivo',
    quote: 'Eu, Giorno Giovanna, tenho um sonho que sei ser justo!',
    techniques: ['Criação de Vida Orgânica', 'Reflexo de Dano Vital', 'Cura de Tecidos e Órgãos', 'Gold Experience Requiem (Retorno ao Zero)']
  },
  {
    id: 'bruno-bucciarati',
    name: 'Bruno Bucciarati',
    anilistName: 'Bruno Bucciarati',
    fandomTitle: 'Bruno Bucciarati',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'Equipe Bucciarati'],
    origin: 'Itália',
    stand: 'Sticky Fingers',
    styleOrPower: 'Sticky Fingers',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Arrivederci! O seu destino foi selado no momento em que você traiu a confiança dos inocentes!',
    techniques: ['Abertura de Zíperes em Qualquer Superfície', 'Desmembramento Tático sem Dano', 'Ari Ari Rush']
  },
  {
    id: 'guido-mista',
    name: 'Guido Mista',
    anilistName: 'Guido Mista',
    fandomTitle: 'Guido Mista',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'Equipe Bucciarati'],
    origin: 'Itália',
    stand: 'Sex Pistols',
    styleOrPower: 'Sex Pistols',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Vivo',
    quote: 'Passe-a-passa! O número 4 dá um azar terrível, mas os Pistols nunca erram o alvo!',
    techniques: ['Redirecionamento Balístico com Sex Pistols (1 a 7, sem o 4)', 'Tiro de Precisão Extrema']
  },
  {
    id: 'narancia-ghirga',
    name: 'Narancia Ghirga',
    anilistName: 'Narancia Ghirga',
    fandomTitle: 'Narancia Ghirga',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'Equipe Bucciarati'],
    origin: 'Itália',
    stand: 'Aerosmith',
    styleOrPower: 'Aerosmith',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Volare via! Bucciarati me deu um lar e uma razão para viver!',
    techniques: ['Bombardeio Aéreo e Metralhadoras de Aerosmith', 'Rastreador de Dióxido de Carbono (Respiração)']
  },
  {
    id: 'pannacotta-fugo',
    name: 'Pannacotta Fugo',
    anilistName: 'Pannacotta Fugo',
    fandomTitle: 'Pannacotta Fugo',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'Equipe Bucciarati'],
    origin: 'Itália',
    stand: 'Purple Haze',
    styleOrPower: 'Purple Haze',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Vivo',
    quote: 'As cápsulas de Purple Haze liberam um vírus carnívoro que liquefaz carne e ossos em 30 segundos!',
    techniques: ['Vírus Carnívoro das Cápsulas das Mãos', 'Fúria Descontrolada']
  },
  {
    id: 'leone-abbacchio',
    name: 'Leone Abbacchio',
    anilistName: 'Leone Abbacchio',
    fandomTitle: 'Leone Abbacchio',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'Equipe Bucciarati'],
    origin: 'Itália',
    stand: 'Moody Blues',
    styleOrPower: 'Moody Blues',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Moody Blues rebobina o tempo e reproduz com exatidão cada movimento e palavra ocorrida no passado!',
    techniques: ['Replay Cronológico de Passos e Ações', 'Gravação Facial e Corporal']
  },
  {
    id: 'trish-una',
    name: 'Trish Una',
    anilistName: 'Trish Una',
    fandomTitle: 'Trish Una',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'Equipe Bucciarati'],
    origin: 'Itália',
    stand: 'Spice Girl',
    styleOrPower: 'Spice Girl',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Vivo',
    quote: 'WANNABEEE! Spice Girl torna qualquer objeto inquebrável ao torná-lo macio como borracha!',
    techniques: ['Amaciamento de Matéria tornando-a Elástica e Indestrutível']
  },
  {
    id: 'diavolo',
    name: 'Diavolo',
    anilistName: 'Diavolo',
    fandomTitle: 'Diavolo',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'Antagonistas Principais'],
    origin: 'Itália',
    stand: 'King Crimson',
    styleOrPower: 'King Crimson',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'O tempo é apagado, e apenas os resultados permanecem! Ninguém pode escapar do clímax do destino!',
    techniques: ['Apagamento Temporal (Salto no Tempo)', 'Previsão do Futuro Iminente com Epitaph', 'Golpe Perfurante Letal']
  },
  {
    id: 'vinegar-doppio',
    name: 'Vinegar Doppio',
    anilistName: 'Vinegar Doppio',
    fandomTitle: 'Vinegar Doppio',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione'],
    origin: 'Itália',
    stand: 'Epitaph',
    styleOrPower: 'Epitaph',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Tururururu... Alô, Chefe? É o Doppio!',
    techniques: ['Previsão Visual de 10 Segundos com Epitaph', 'Braço Parcial de King Crimson']
  },
  {
    id: 'risotto-nero',
    name: 'Risotto Nero',
    anilistName: 'Risotto Nero',
    fandomTitle: 'Risotto Nero',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'La Squadra Esecuzioni'],
    origin: 'Itália',
    stand: 'Metallica',
    styleOrPower: 'Metallica',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Metallica manipula o ferro dentro do seu corpo, transformando seu próprio sangue em lâminas de barbear!',
    techniques: ['Materialização de Ferro Orgânico Interno', 'Camuflagem Óptica por Partículas de Ferro']
  },
  {
    id: 'prosciutto',
    name: 'Prosciutto',
    anilistName: 'Prosciutto',
    fandomTitle: 'Prosciutto',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'La Squadra Esecuzioni'],
    origin: 'Itália',
    stand: 'The Grateful Dead',
    styleOrPower: 'The Grateful Dead',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Um verdadeiro homem não diz que vai matar; quando ele pensa nisso, o ato já está concluído!',
    techniques: ['Envelhecimento Acelerado por Temperatura Corporal']
  },
  {
    id: 'pesci',
    name: 'Pesci',
    anilistName: 'Pesci',
    fandomTitle: 'Pesci',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'La Squadra Esecuzioni'],
    origin: 'Itália',
    stand: 'Beach Boy',
    styleOrPower: 'Beach Boy',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Aniki me ensinou a ter determinação de aço! Beach Boy vai pescar seu coração!',
    techniques: ['Linha e Anzol Intangíveis Através de Paredes', 'Sensoriamento de Batimentos Cardíacos']
  },
  {
    id: 'ghiaccio',
    name: 'Ghiaccio',
    anilistName: 'Ghiaccio',
    fandomTitle: 'Ghiaccio',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'La Squadra Esecuzioni'],
    origin: 'Itália',
    stand: 'White Album',
    styleOrPower: 'White Album',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Por que todo mundo fala "Veneza" em vez de "Venezia"?! Isso me deixa furioso!',
    techniques: ['Armadura de Gelo Criogênico', 'Gently Weeps (Reflexo de Projéteis por Ar Congelado)']
  },
  {
    id: 'illuso',
    name: 'Illuso',
    anilistName: 'Illuso',
    fandomTitle: 'Illuso',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'La Squadra Esecuzioni'],
    origin: 'Itália',
    stand: 'Man in the Mirror',
    styleOrPower: 'Man in the Mirror',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'No meu mundo dos espelhos, apenas eu decido quem e o que tem permissão para entrar!',
    techniques: ['Arrasto Seletivo para a Dimensão dos Espelhos']
  },
  {
    id: 'melone',
    name: 'Melone',
    anilistName: 'Melone',
    fandomTitle: 'Melone',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'La Squadra Esecuzioni'],
    origin: 'Itália',
    stand: 'Baby Face',
    styleOrPower: 'Baby Face',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Molto bene! Os dados genéticos estão perfeitamente sincronizados!',
    techniques: ['Geração de Homúnculo Rastreador Remoto', 'Decomposição de Matéria em Blocos Cúbicos']
  },
  {
    id: 'formaggio',
    name: 'Formaggio',
    anilistName: 'Formaggio',
    fandomTitle: 'Formaggio',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'La Squadra Esecuzioni'],
    origin: 'Itália',
    stand: 'Little Feet',
    styleOrPower: 'Little Feet',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Um corte da lâmina de Little Feet é o suficiente para fazer você encolher até virar comida de rato!',
    techniques: ['Encolhimento Progressivo de Alvos', 'Autoencolhimento Instantâneo']
  },
  {
    id: 'cioccolata',
    name: 'Cioccolata',
    anilistName: 'Cioccolata',
    fandomTitle: 'Cioccolata',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'Guarda de Elite'],
    origin: 'Itália',
    stand: 'Green Day',
    styleOrPower: 'Green Day',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Bom garoto, Secco! O mofo de Green Day devora quem descer de altitude!',
    techniques: ['Mofo Necrótico Devorador de Descida', 'Cirurgia de Desmembramento Vivo Autônomo']
  },
  {
    id: 'secco',
    name: 'Secco',
    anilistName: 'Secco',
    fandomTitle: 'Secco',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione', 'Guarda de Elite'],
    origin: 'Itália',
    stand: 'Oasis',
    styleOrPower: 'Oasis',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Cioccolata me dá cubinhos de açúcar! Eu nado pelo asfalto como se fosse lama líquida!',
    techniques: ['Liquefação de Solo e Concreto', 'Natação Subterrânea e Cuspe Balístico de Pedra']
  },

  // ==========================================
  // PARTE 6: STONE OCEAN
  // ==========================================
  {
    id: 'jolyne-cujoh',
    name: 'Jolyne Cujoh',
    anilistName: 'Jolyne Kuujou',
    fandomTitle: 'Jolyne Cujoh',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Família Joestar', 'Grupo da Prisão Green Dolphin Street'],
    origin: 'EUA',
    stand: 'Stone Free',
    styleOrPower: 'Stone Free',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Yare yare dawa... Eu vou cortar as amarras desse destino injusto!',
    techniques: ['Decomposição Corporal em Linhas', 'Ora Ora Rush', 'Transmissão de Som por Cordas']
  },
  {
    id: 'ermes-costello',
    name: 'Ermes Costello',
    anilistName: 'Ermes Costello',
    fandomTitle: 'Ermes Costello',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Grupo da Prisão Green Dolphin Street'],
    origin: 'EUA',
    stand: 'Kiss',
    styleOrPower: 'Kiss',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Adesivos de Kiss! Quando retiro o selo, as duas cópias colidem e causam um impacto devastador!',
    techniques: ['Duplicação de Objetos por Adesivos', 'Dano por Colisão ao Remover Adesivo']
  },
  {
    id: 'foo-fighters',
    name: 'Foo Fighters (F.F.)',
    anilistName: 'Foo Fighters',
    fandomTitle: 'Foo Fighters (Character)',
    gender: 'Sem Gênero',
    species: 'Usuário de Stand',
    affiliation: ['Grupo da Prisão Green Dolphin Street'],
    origin: 'EUA',
    stand: 'Foo Fighters',
    styleOrPower: 'Foo Fighters',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Eu não sou apenas plâncton... Eu vivi, tive amigos e encontrei meu intelecto humano!',
    techniques: ['Disparo Balístico de Plâncton pelos Dedos', 'Cura Celular de Ferimentos por Plâncton']
  },
  {
    id: 'weather-report',
    name: 'Weather Report',
    anilistName: 'Weather Report',
    fandomTitle: 'Weather Report (Character)',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Grupo da Prisão Green Dolphin Street'],
    origin: 'EUA',
    stand: 'Weather Report',
    styleOrPower: 'Weather Report',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Heavy Weather... o arco-íris subliminar que faz qualquer ser vivo acreditar que é um caracol!',
    techniques: ['Manipulação Climática e Atmosférica', 'Chuva de Sapos Venenosos', 'Heavy Weather (Caracóis Subliminares)']
  },
  {
    id: 'narciso-anasui',
    name: 'Narciso Anasui',
    anilistName: 'Narciso Anasui',
    fandomTitle: 'Narciso Anasui',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Grupo da Prisão Green Dolphin Street'],
    origin: 'EUA',
    stand: 'Diver Down',
    styleOrPower: 'Diver Down',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Diver Down mergulha na estrutura interna das coisas para reconfigurá-las ou absorver danos!',
    techniques: ['Armazenamento de Energia de Impacto em Estruturas', 'Mergulho Corpóreo e Reconfiguração']
  },
  {
    id: 'emporio-alnino',
    name: 'Emporio Alniño',
    anilistName: 'Emporio Alnino',
    fandomTitle: 'Emporio Alniño',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Grupo da Prisão Green Dolphin Street'],
    origin: 'EUA',
    stand: 'Burning Down the House',
    styleOrPower: 'Burning Down the House',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Vivo',
    quote: 'Meu nome é Emporio... A justiça prevalecerá contra o falso paraíso de Pucci!',
    techniques: ['Habitação e Interação com Objetos Fantasmas da Sala de Música Queimada', 'Oxigênio Puro de Weather Report']
  },
  {
    id: 'enrico-pucci',
    name: 'Enrico Pucci',
    anilistName: 'Enrico Pucci',
    fandomTitle: 'Enrico Pucci',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Antagonistas Principais'],
    origin: 'EUA',
    stand: 'Whitesnake',
    styleOrPower: 'Whitesnake (C-MOON / Made in Heaven)',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: '1, 2, 3, 5, 7, 11, 13... Contar números primos acalma a mente. Chegamos ao Paraíso!',
    techniques: ['Whitesnake (Extração de Discos de Stand e Memória)', 'C-MOON (Gravidade Inversa Repulsiva)', 'Made in Heaven (Aceleração Universal Infinita)']
  },
  {
    id: 'donatello-versus',
    name: 'Donatello Versus',
    anilistName: 'Donatello Versus',
    fandomTitle: 'Donatello Versus',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Filhos de DIO'],
    origin: 'EUA',
    stand: 'Under World',
    styleOrPower: 'Under World',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Under World escava as memórias do solo terrestre e reencena tragédias do passado!',
    techniques: ['Escavação de Memórias do Subsolo', 'Recriação de Catástrofes Históricas']
  },
  {
    id: 'rikiel',
    name: 'Rikiel',
    anilistName: 'Rikiel',
    fandomTitle: 'Rikiel',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Filhos de DIO'],
    origin: 'EUA',
    stand: 'Sky High',
    styleOrPower: 'Sky High',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Eu comando os Rods, as misteriosas criaturas voadoras que drenam o calor dos nervos humanos!',
    techniques: ['Controle de Rods Criptozoológicos', 'Drenagem de Temperatura e Paralisia de Órgãos']
  },
  {
    id: 'ungalo',
    name: 'Ungalo',
    anilistName: 'Ungalo',
    fandomTitle: 'Ungalo',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Filhos de DIO'],
    origin: 'EUA',
    stand: 'Bohemian Rhapsody',
    styleOrPower: 'Bohemian Rhapsody',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Aposentado',
    quote: 'Todos os personagens de histórias de ficção e contos de fadas ganharam vida no mundo real!',
    techniques: ['Materialização Mundial de Personagens Fictícios']
  },
  {
    id: 'johngalli-a',
    name: 'Johngalli A.',
    anilistName: 'Johngalli A.',
    fandomTitle: 'Johngalli A.',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Discípulos de DIO'],
    origin: 'EUA',
    stand: 'Manhattan Transfer',
    styleOrPower: 'Manhattan Transfer',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Mesmo cego, as correntes de ar revelam onde meu rifle deve disparar com perfeição.',
    techniques: ['Rastreamento de Correntes de Ar', 'Redirecionamento de Tiros de Sniper']
  },
  {
    id: 'sports-maxx',
    name: 'Sports Maxx',
    anilistName: 'Sports Maxx',
    fandomTitle: 'Sports Maxx',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Criminosos de Green Dolphin'],
    origin: 'EUA',
    stand: 'Limp Bizkit',
    styleOrPower: 'Limp Bizkit',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Limp Bizkit ressuscita os mortos como zumbis completamente invisíveis!',
    techniques: ['Ressurreição Zumbi Invisível']
  },
  {
    id: 'miraschon',
    name: 'Miraschon',
    anilistName: 'Miraschon',
    fandomTitle: 'Miraschon',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Detentas de Green Dolphin'],
    origin: 'EUA',
    stand: 'Marilyn Manson',
    styleOrPower: 'Marilyn Manson',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Aposentado',
    quote: 'Quando você trapaceia em uma aposta, Marilyn Manson cobra o equivalente em órgãos e ouro!',
    techniques: ['Cobrador de Apostas Inflexível de Órgãos Vitais']
  },

  // ==========================================
  // PARTE 7: STEEL BALL RUN
  // ==========================================
  {
    id: 'johnny-joestar',
    name: 'Johnny Joestar',
    anilistName: 'Johnny Joestar',
    fandomTitle: 'Johnny Joestar',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Família Joestar', 'Corredores da Steel Ball Run'],
    origin: 'EUA',
    stand: 'Tusk',
    styleOrPower: 'Tusk (ACT 1, 2, 3 e 4)',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Eu só quero recuperar minhas pernas... e o Spin me mostrou o caminho para recomeçar do zero!',
    techniques: ['Tiro de Unhas Giratórias (ACT1/ACT2)', 'Vórtices de Rotação Espacial (ACT3)', 'Rotação Áurea Infinita (ACT4 - Chumimin!)']
  },
  {
    id: 'gyro-zeppeli',
    name: 'Gyro Zeppeli',
    anilistName: 'Gyro Zeppeli',
    fandomTitle: 'Gyro Zeppeli',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Família Zeppeli', 'Corredores da Steel Ball Run'],
    origin: 'Itália',
    stand: 'Ball Breaker',
    styleOrPower: 'Spin das Esferas de Aço (Ball Breaker)',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Nyo-ho! Lição 5, Johnny: O caminho mais curto foi na verdade um desvio!',
    techniques: ['Rotação de Esferas de Aço', 'Retângulo Áureo dos Cavalos', 'Ball Breaker (Envelhecimento Celular Dimensional)']
  },
  {
    id: 'funny-valentine',
    name: 'Funny Valentine',
    anilistName: 'Funny Valentine',
    fandomTitle: 'Funny Valentine',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Antagonistas Principais', 'Governo dos EUA'],
    origin: 'EUA',
    stand: 'Dirty Deeds Done Dirt Cheap',
    styleOrPower: 'Dirty Deeds Done Dirt Cheap (D4C)',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Dojyaaa~n! O meu coração e minhas ações são absolutamente límpidos e pertencem à Justiça!',
    techniques: ['D4C (Salto entre Dimensões Paralelas)', 'Substituição Corporal Instantânea', 'D4C Love Train (Redirecionamento de Misérias)']
  },
  {
    id: 'diego-brando',
    name: 'Diego Brando',
    anilistName: 'Diego Brando',
    fandomTitle: 'Diego Brando',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Corredores da Steel Ball Run'],
    origin: 'Inglaterra',
    stand: 'Scary Monsters',
    styleOrPower: 'Scary Monsters',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Eu subirei ao topo desta sociedade podre a qualquer custo!',
    techniques: ['Transformação em Dinossauro (Deinonychus)', 'Fossilização de Criaturas', 'THE WORLD de Outro Universo (Parar o Tempo)']
  },
  {
    id: 'hot-pants',
    name: 'Hot Pants',
    anilistName: 'Hot Pants',
    fandomTitle: 'Hot Pants',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Corredores da Steel Ball Run'],
    origin: 'EUA',
    stand: 'Cream Starter',
    styleOrPower: 'Cream Starter',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Cream Starter manipula carne orgânica em formato de spray para curar feridas ou sufocar oponentes.',
    techniques: ['Spray de Carne Regenerativo e Ofensivo', 'Disfarce Facial com Carne']
  },
  {
    id: 'mountain-tim',
    name: 'Mountain Tim',
    anilistName: 'Mountain Tim',
    fandomTitle: 'Mountain Tim',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Corredores da Steel Ball Run'],
    origin: 'EUA',
    stand: 'Oh! Lonesome Me',
    styleOrPower: 'Oh! Lonesome Me',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Eu viajo através das cordas do meu laço como partes do meu próprio corpo.',
    techniques: ['Desmembramento e Transporte por Cordas de Laço']
  },
  {
    id: 'wekapipo',
    name: 'Wekapipo',
    anilistName: 'Wekapipo',
    fandomTitle: 'Wekapipo',
    gender: 'Masculino',
    species: 'Usuário de Spin',
    affiliation: ['Guarda Real Napolitana'],
    origin: 'Itália',
    stand: 'Nenhum',
    styleOrPower: 'Wrecking Ball (Esferas de Aço Satélites)',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'As microesferas de Wrecking Ball causam ataxia do hemisfério esquerdo no cérebro do alvo!',
    techniques: ['Wrecking Ball', 'Ataxia Sensorial do Lado Esquerdo']
  },
  {
    id: 'ringo-roadagain',
    name: 'Ringo Roadagain',
    anilistName: 'Ringo Roadagain',
    fandomTitle: 'Ringo Roadagain',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Gunslingers'],
    origin: 'EUA',
    stand: 'Mandom',
    styleOrPower: 'Mandom',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Bem-vindo ao verdadeiro Mundo dos Homens. O ponteiro do meu relógio volta exatamente 6 segundos!',
    techniques: ['Rebobinar o Tempo em 6 Segundos pelo Relógio de Pulso', 'Duelo Rápido com Revólver']
  },
  {
    id: 'blackmore',
    name: 'Blackmore',
    anilistName: 'Blackmore',
    fandomTitle: 'Blackmore',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Agentes de Valentine'],
    origin: 'EUA',
    stand: 'Catch the Rainbow',
    styleOrPower: 'Catch the Rainbow',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Perdoe-me, Senhor... As gotas de chuva congeladas no ar são o meu chão e as minhas lâminas.',
    techniques: ['Caminhar sobre Gotas de Chuva', 'Gotas de Chuva como Lâminas Cortantes']
  },
  {
    id: 'lucy-steel',
    name: 'Lucy Steel',
    anilistName: 'Lucy Steel',
    fandomTitle: 'Lucy Steel',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Organizadores da SBR'],
    origin: 'EUA',
    stand: 'Ticket to Ride',
    styleOrPower: 'Ticket to Ride',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Com apenas 14 anos, arrisquei minha vida pelo homem que amo e pelo futuro da nossa nação.',
    techniques: ['Lágrimas de Lâmina de Vidro Divina', 'Conexão com o Cadáver Sagrado']
  },
  {
    id: 'steven-steel',
    name: 'Steven Steel',
    anilistName: 'Steven Steel',
    fandomTitle: 'Steven Steel',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Organizadores da SBR'],
    origin: 'EUA',
    stand: 'Nenhum',
    styleOrPower: 'Nenhuma',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'A Steel Ball Run é a maior corrida a cavalo que a humanidade já testemunhou!',
    techniques: ['Organização e Logística Esportiva Continental']
  },

  // ==========================================
  // PARTE 8: JOJOLION
  // ==========================================
  {
    id: 'josuke-higashikata-gappy',
    name: 'Josuke Higashikata (Gappy)',
    anilistName: 'Jousuke Higashikata',
    fandomTitle: 'Josuke Higashikata (JJL)',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Família Higashikata', 'Família Joestar'],
    origin: 'Japão',
    stand: 'Soft & Wet',
    styleOrPower: 'Soft & Wet',
    debutArc: 'Parte 8: JoJolion',
    status: 'Vivo',
    quote: 'Quem sou eu? Minhas bolhas roubam algo do mundo: fricção, visão, som... e além com Go Beyond!',
    techniques: ['Roubo de Propriedades Físicas por Bolhas de Sabão', 'Soft & Wet: Go Beyond (Fios Rotacionais Invisíveis que não existem)']
  },
  {
    id: 'yasuho-hirose',
    name: 'Yasuho Hirose',
    anilistName: 'Yasuho Hirose',
    fandomTitle: 'Yasuho Hirose',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Aliados de Morioh'],
    origin: 'Japão',
    stand: 'Paisley Park',
    styleOrPower: 'Paisley Park',
    debutArc: 'Parte 8: JoJolion',
    status: 'Vivo',
    quote: 'Paisley Park nos guia através dos dispositivos eletrônicos pelo caminho mais seguro e correto!',
    techniques: ['Navegação e Hackeamento por Dispositivos Digitais', 'Direcionamento de Escolhas Ótimas']
  },
  {
    id: 'rai-mamezuku',
    name: 'Rai Mamezuku',
    anilistName: 'Rai Mamezuku',
    fandomTitle: 'Rai Mamezuku',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Aliados de Morioh'],
    origin: 'Japão',
    stand: 'Dog Style',
    styleOrPower: 'Dog Style',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'O cultivo da fruta Locacaca e os segredos do Spin revelam a essência oculta do mundo.',
    techniques: ['Desdobramento do Corpo em Tiras de Fita Espiral', 'Plantio e Botânica Avançada de Frutas']
  },
  {
    id: 'norisuke-higashikata-iv',
    name: 'Norisuke Higashikata IV',
    anilistName: 'Norisuke Higashikata IV',
    fandomTitle: 'Norisuke Higashikata IV',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Família Higashikata'],
    origin: 'Japão',
    stand: 'King Nothing',
    styleOrPower: 'King Nothing',
    debutArc: 'Parte 8: JoJolion',
    status: 'Vivo',
    quote: 'Pela proteção e longevidade da Família Higashikata, qualquer sacrifício de pai é válido.',
    techniques: ['Rastreamento de Odores em Formato de Quebra-Cabeças de Cartas']
  },
  {
    id: 'jobin-higashikata',
    name: 'Jobin Higashikata',
    anilistName: 'Joushuu Higashikata',
    fandomTitle: 'Jobin Higashikata',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Família Higashikata', 'Locacaca Organization'],
    origin: 'Japão',
    stand: 'Speed King',
    styleOrPower: 'Speed King',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'Todos os dias devem ser as férias de verão! Speed King acumula calor térmico em qualquer ponto!',
    techniques: ['Acúmulo e Transferência de Calor Pontual Térmico']
  },
  {
    id: 'joshu-higashikata',
    name: 'Joshu Higashikata',
    anilistName: 'Joushuu Higashikata',
    fandomTitle: 'Joshu Higashikata',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Família Higashikata'],
    origin: 'Japão',
    stand: 'Nut King Call',
    styleOrPower: 'Nut King Call',
    debutArc: 'Parte 8: JoJolion',
    status: 'Vivo',
    quote: 'Nut King Call prende porcas e parafusos em juntas para soltar partes inteiras sem sangrar!',
    techniques: ['Desmontagem e Junção de Articulações por Porcas e Parafusos']
  },
  {
    id: 'daiya-higashikata',
    name: 'Daiya Higashikata',
    anilistName: 'Daiya Higashikata',
    fandomTitle: 'Daiya Higashikata',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Família Higashikata'],
    origin: 'Japão',
    stand: 'California King Bed',
    styleOrPower: 'California King Bed',
    debutArc: 'Parte 8: JoJolion',
    status: 'Vivo',
    quote: 'Se você se preocupar comigo ou quebrar uma regra, uma lembrança sua vira minha peça de xadrez!',
    techniques: ['Roubo de Memórias em Formato de Peças de Xadrez']
  },
  {
    id: 'hato-higashikata',
    name: 'Hato Higashikata',
    anilistName: 'Hato Higashikata',
    fandomTitle: 'Hato Higashikata',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Família Higashikata'],
    origin: 'Japão',
    stand: 'Walking Heart',
    styleOrPower: 'Walking Heart',
    debutArc: 'Parte 8: JoJolion',
    status: 'Vivo',
    quote: 'Meus calcanhares se estendem como estacas perfurantes gigantes para escalar paredes e espetar inimigos!',
    techniques: ['Extensão e Endurecimento dos Calcanhares como Lanças']
  },
  {
    id: 'tooru',
    name: 'Tooru',
    anilistName: 'Tooru',
    fandomTitle: 'Toru',
    gender: 'Masculino',
    species: 'Rocha Humana',
    affiliation: ['Antagonistas Principais', 'Locacaca Organization'],
    origin: 'Japão',
    stand: 'Wonder of U',
    styleOrPower: 'Wonder of U',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'Você pretendia me perseguir? O próprio fluxo do fluxo da Calamidade colidirá mortalmente contra você!',
    techniques: ['Fluxo Inevitável da Calamidade Cósmica', 'Materialização Ilusória como Diretor Médico Satoru Akefu']
  },
  {
    id: 'tamaki-damo',
    name: 'Tamaki Damo',
    anilistName: 'Tamaki Damo',
    fandomTitle: 'Tamaki Damo',
    gender: 'Masculino',
    species: 'Rocha Humana',
    affiliation: ['Locacaca Organization'],
    origin: 'Japão',
    stand: 'Vitamin C',
    styleOrPower: 'Vitamin C',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'Vitamin C derrete os tecidos de qualquer um que encoste em suas impressões digitais!',
    techniques: ['Amolecimento e Liquefação de Tecidos Orgânicos por Impressões Digitais']
  },
  {
    id: 'yotsuyu-yagiyama',
    name: 'Yotsuyu Yagiyama',
    anilistName: 'Yotsuyu Yagiyama',
    fandomTitle: 'Yotsuyu Yagiyama',
    gender: 'Masculino',
    species: 'Rocha Humana',
    affiliation: ['Locacaca Organization'],
    origin: 'Japão',
    stand: 'I Am a Rock',
    styleOrPower: 'I Am a Rock',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'Quando toco em alguém, múltiplos objetos do mesmo tipo convergem em velocidade mortal contra o alvo!',
    techniques: ['Atração Magnética Balística de Múltiplos Objetos']
  },

  // ==========================================
  // PARTE 9: THE JOJOLANDS
  // ==========================================
  {
    id: 'jodio-joestar',
    name: 'Jodio Joestar',
    anilistName: 'Jodio Joestar',
    fandomTitle: 'Jodio Joestar',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Gangue de Jodio', 'Família Joestar'],
    origin: 'EUA',
    stand: 'November Rain',
    styleOrPower: 'November Rain',
    debutArc: 'Parte 9: The JOJOLands',
    status: 'Vivo',
    quote: 'Esta é a história de como eu me tornei podre de rico através do mecanismo do mundo!',
    techniques: ['Chuva Pesada de Gotas com Pressão Esmagadora (November Rain)']
  },
  {
    id: 'dragona-joestar',
    name: 'Dragona Joestar',
    anilistName: 'Dragona Joestar',
    fandomTitle: 'Dragona Joestar',
    gender: 'Sem Gênero',
    species: 'Usuário de Stand',
    affiliation: ['Gangue de Jodio', 'Família Joestar'],
    origin: 'EUA',
    stand: 'Smooth Operators',
    styleOrPower: 'Smooth Operators',
    debutArc: 'Parte 9: The JOJOLands',
    status: 'Vivo',
    quote: 'Os pequenos tanques de Smooth Operators deslizam e deslocam coisas de lugar sem rasgar nada!',
    techniques: ['Deslocamento e Reposicionamento de Superfícies com Lagartas Mecânicas']
  },
  {
    id: 'paco-laburantes',
    name: 'Paco Laburantes',
    anilistName: 'Paco Laburantes',
    fandomTitle: 'Paco Laburantes',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Gangue de Jodio'],
    origin: 'EUA',
    stand: 'The Hustle',
    styleOrPower: 'The Hustle',
    debutArc: 'Parte 9: The JOJOLands',
    status: 'Vivo',
    quote: 'The Hustle permite que meus próprios músculos agarrem qualquer coisa como dedos extras!',
    techniques: ['Preensão Muscular e Furto por Contração de Pele e Fibras']
  },
  {
    id: 'usagi-alohaoe',
    name: 'Usagi Alohaoe',
    anilistName: 'Usagi Alohaoe',
    fandomTitle: 'Usagi Alohaoe',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Gangue de Jodio'],
    origin: 'EUA',
    stand: 'THE MATTEKUDASAI',
    styleOrPower: 'THE MATTEKUDASAI',
    debutArc: 'Parte 9: The JOJOLands',
    status: 'Vivo',
    quote: 'THE MATTEKUDASAI se transforma em qualquer coisa que outra pessoa desejar que exista!',
    techniques: ['Materialização de Desejos de Terceiros a partir de Objetos Existentes']
  },
  {
    id: 'charming-man',
    name: 'Charming Man',
    anilistName: 'Charming Man',
    fandomTitle: 'Charming Man',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Gangue de Jodio'],
    origin: 'EUA',
    stand: 'Bigmouth Strikes Again',
    styleOrPower: 'Bigmouth Strikes Again',
    debutArc: 'Parte 9: The JOJOLands',
    status: 'Vivo',
    quote: 'Minha pele de areia se dissolve e camufla perfeitamente no ambiente para investigar o mistério das Rocha de Lava.',
    techniques: ['Dispersão Cutânea em Grãos de Areia / Camuflagem Mímica']
  },
  {
    id: 'meryl-may-qi',
    name: 'Meryl May Qi',
    anilistName: 'Meryl May Qi',
    fandomTitle: 'Meryl May Qi',
    gender: 'Feminino',
    species: 'Humano Comum',
    affiliation: ['Gangue de Jodio'],
    origin: 'EUA',
    stand: 'Nenhum',
    styleOrPower: 'Comandante de Operações Clandestinas',
    debutArc: 'Parte 9: The JOJOLands',
    status: 'Vivo',
    quote: 'Eu sou diretora de escola de dia e a chefe que coordena os seus golpes de noite.',
    techniques: ['Planejamento de Assaltos e Redes Clandestinas']
  },
  {
    id: 'bobby-jean',
    name: 'Bobby Jean',
    anilistName: 'Bobby Jean',
    fandomTitle: 'Bobby Jean',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['HOWLER'],
    origin: 'EUA',
    stand: 'Glory Days',
    styleOrPower: 'Glory Days',
    debutArc: 'Parte 9: The JOJOLands',
    status: 'Vivo',
    quote: 'Glory Days desacelera as balas no ar para que alcancem velocidade fatal de surpresa.',
    techniques: ['Controle de Velocidade Balística em Disparos Silenciosos']
  }
];

// Helper para buscar no AniList
async function fetchAnilistImage(searchName) {
  const query = `query ($search: String) { Character(search: $search) { id name { full } image { large } } }`;
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { search: searchName } }),
      signal: AbortSignal.timeout(6000)
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.Character?.image?.large || null;
  } catch (err) {
    return null;
  }
}

// Helper para buscar no Fandom (com fallback para thumbnail de alta resolução ou infobox)
async function fetchFandomImage(title) {
  try {
    const pageUrl = `https://jojo.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`;
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://jojo.fandom.com/'
      },
      signal: AbortSignal.timeout(6000)
    });
    if (!res.ok) return null;
    const data = await res.json();
    const page = Object.values(data?.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (err) {
    return null;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function processImage(buffer, localImgPath) {
  const meta = await sharp(buffer).metadata();
  const width = meta.width;
  const height = meta.height;

  // Se a imagem for muito vertical (ex: corpo inteiro de wikia onde height > 1.25 * width),
  // o rosto fica no terço superior. Recortamos com foco no topo/rosto.
  if (height > width * 1.2) {
    const size = Math.round(width * 0.95);
    const top = Math.round(height * 0.03); // Começa logo abaixo do topo
    const left = Math.round((width - size) / 2);

    await sharp(buffer)
      .extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: Math.min(size, width),
        height: Math.min(size, height - top)
      })
      .resize(240, 240, { fit: 'cover' })
      .png({ quality: 90 })
      .toFile(localImgPath);
  } else {
    // Para imagens já em formato busto / card, o center crop mantém o rosto 100% no meio
    await sharp(buffer)
      .resize(240, 240, { fit: 'cover', position: 'center' })
      .png({ quality: 90 })
      .toFile(localImgPath);
  }
}

async function buildJoJo() {
  console.log(`\n=== CONSTRUINDO BANCO DE JOJO'S BIZARRE ADVENTURE (${JOJO_ROSTER.length} PERSONAGENS) ===\n`);

  const finalCharacters = [];

  for (let i = 0; i < JOJO_ROSTER.length; i++) {
    const item = JOJO_ROSTER[i];
    const localImgName = `${item.id}.png`;
    const localImgPath = path.join(avatarsDir, localImgName);

    console.log(`[${i + 1}/${JOJO_ROSTER.length}] Processando ${item.name} (${item.id})...`);

    const avatarUrl = `/avatars/jojos-bizarre-adventure/${localImgName}`;
    const fileExists = fs.existsSync(localImgPath) && fs.statSync(localImgPath).size > 1000;

    if (!fileExists) {
      await sleep(400); // Evita sobrecarga de requisições

      let remoteUrl = null;

      // 1. Tenta AniList primeiro (ideal para avatares de rosto)
      if (item.anilistName) {
        remoteUrl = await fetchAnilistImage(item.anilistName);
      }

      // 2. Se não achar no AniList, tenta JoJo Fandom
      if (!remoteUrl && item.fandomTitle) {
        remoteUrl = await fetchFandomImage(item.fandomTitle);
      }
      if (!remoteUrl) {
        remoteUrl = await fetchFandomImage(item.name);
      }

      if (remoteUrl) {
        try {
          const imgRes = await fetch(remoteUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Referer': 'https://jojo.fandom.com/'
            },
            signal: AbortSignal.timeout(8000)
          });
          if (imgRes.ok) {
            const buffer = Buffer.from(await imgRes.arrayBuffer());
            await processImage(buffer, localImgPath);
            console.log(`   ✓ Avatar salvo: ${localImgName}`);
          } else {
            console.warn(`   ⚠️ Erro HTTP ao baixar: ${imgRes.status}`);
          }
        } catch (err) {
          console.warn(`   ⚠️ Falha ao salvar imagem local: ${err.message}`);
        }
      } else {
        console.warn(`   ❌ Não foi possível encontrar imagem para: ${item.name}`);
      }
    } else {
      console.log(`   ✓ Avatar já existe localmente.`);
    }

    const { anilistName, fandomTitle, ...characterData } = item;
    finalCharacters.push({
      ...characterData,
      avatar: avatarUrl
    });
  }

  const jsonPath = path.join(dataDir, 'characters.json');
  fs.writeFileSync(jsonPath, JSON.stringify(finalCharacters, null, 2), 'utf8');
  console.log(`\n🎉 Banco criado com sucesso: ${finalCharacters.length} personagens em ${jsonPath}!\n`);
}

buildJoJo();
