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

console.log('Carregados:');
console.log('One Piece:', opMap.size);
console.log('Naruto:', narutoMap.size);
console.log('Jujutsu Kaisen:', jjkMap.size);
console.log('Demon Slayer:', dsMap.size);

// 1. ONE PIECE: EXCLUSIVAMENTE AKUMAS NO MI (Sem Haki, Sem Espadas)
// Todas as principais Akumas no Mi do mangá de One Piece (~130 a 160)
const opRaw = [
  // Paramecias Fundamentais e Icônicas
  {
    targetTitle: 'Gomu Gomu no Mi / Hito Hito no Mi: Modelo Nika',
    badgeTitle: 'Zoan Mítica / Deus do Sol',
    charId: 'monkey-d-luffy',
    valid: ['monkey-d-luffy'],
    clues: [
      { label: 'Natureza Real', value: 'Fruta mítica lendária do Deus do Sol que traz liberdade e risos' },
      { label: 'Propriedade Física', value: 'Concede ao corpo propriedades completas de borracha e elasticidade' },
      { label: 'Despertar', value: 'Gear 5: transformação em guerreiro albino com liberdade absoluta de moldar o ambiente' }
    ]
  },
  {
    targetTitle: 'Bara Bara no Mi (Fruta dos Pedaços)',
    badgeTitle: 'Paramecia de Separação',
    charId: 'buggy',
    valid: ['buggy'],
    clues: [
      { label: 'Imunidade Crucial', value: 'Imunidade total e absoluta contra cortes e lâminas de qualquer espadachim' },
      { label: 'Peculiaridade de Voo', value: 'Partes corporais flutuam livremente contanto que os pés estejam no chão' },
      { label: 'Consumo Acidental', value: 'Engolida por susto ao ser surpreendido por Shanks nos tempos de grumete' }
    ]
  },
  {
    targetTitle: 'Sube Sube no Mi (Fruta do Escorregão)',
    badgeTitle: 'Paramecia Físico-Corporal',
    charId: 'alvida',
    valid: ['alvida'],
    clues: [
      { label: 'Efeito Corporal', value: 'Pele perfeitamente lisa e sedosa que faz ataques escorregarem' },
      { label: 'Transformação Visual', value: 'Alterou drasticamente a silhueta da usuária para um visual esguio' },
      { label: 'Primeiro Inimigo', value: 'Primeira capitã pirata derrotada por Luffy no início de sua jornada' }
    ]
  },
  {
    targetTitle: 'Bomu Bomu no Mi (Fruta da Bomba)',
    badgeTitle: 'Paramecia Explosiva',
    charId: 'mr-5',
    valid: ['mr-5'],
    clues: [
      { label: 'Capacidade Letal', value: 'Qualquer secreção ou parte do corpo pode detonar como explosivo' },
      { label: 'Afiliação Secreta', value: 'Oficial da Baroque Works que atuava em conjunto com Miss Valentine' },
      { label: 'Munição Inusitada', value: 'Dispara projéteis de meleca explosiva e bafo inflamável' }
    ]
  },
  {
    targetTitle: 'Kilo Kilo no Mi (Fruta do Quilo)',
    badgeTitle: 'Paramecia de Gravidade / Massa',
    charId: 'miss-valentine',
    valid: ['miss-valentine'],
    clues: [
      { label: 'Faixa de Peso', value: 'Altera o próprio peso corporal de 1 quilograma até 10.000 quilos à vontade' },
      { label: 'Acessório de Combate', value: 'Usa um guarda-chuva para flutuar ao ficar leve e esmagar os inimigos' },
      { label: 'Organização', value: 'Parceira de combate do Mr. 5 durante a saga de Alabasta e Little Garden' }
    ]
  },
  {
    targetTitle: 'Doru Doru no Mi (Fruta da Cera)',
    badgeTitle: 'Paramecia de Criação e Modelagem',
    charId: 'mr-3-galdino',
    valid: ['mr-3-galdino'],
    clues: [
      { label: 'Resistência Estrutural', value: 'Cera tão rígida e densa após secar que rivaliza com aço temperado' },
      { label: 'Momento Histórico', value: 'Criou a chave de cera que libertou Portgas D. Ace na Guerra de Marineford' },
      { label: 'Penteado Característico', value: 'Cabelo em formato de pavio e número 3 que acende com fogo' }
    ]
  },
  {
    targetTitle: 'Baku Baku no Mi (Fruta da Mastigação)',
    badgeTitle: 'Paramecia de Consumo / Fusão',
    charId: 'wapol',
    valid: ['wapol'],
    clues: [
      { label: 'Metabolismo Único', value: 'Capaz de engolir qualquer matéria sólida e fundi-la ao seu próprio corpo' },
      { label: 'Invenção Industrial', value: 'Criou a lendária liga metálica Wapometal após ser banido de seu reino' },
      { label: 'Antigo Reinado', value: 'Ex-rei tirano do Reino de Drum que fugiu ao ser invadido por Barba Negra' }
    ]
  },
  {
    targetTitle: 'Mane Mane no Mi (Fruta do Clone / Cópia)',
    badgeTitle: 'Paramecia de Mimetismo',
    charId: 'mr-2-bon-kurei-bentham',
    valid: ['mr-2-bon-kurei-bentham', 'kurozumi-higurashi'],
    clues: [
      { label: 'Mecânica de Toque', value: 'Tocar a face de alguém com a mão direita memoriza o rosto e voz' },
      { label: 'Usuários Históricos', value: 'Empunhada por Bentham (Mr. 2) e no passado por Kurozumi Higurashi em Wano' },
      { label: 'Sacrifício Heroico', value: 'Permitiu abrir os Portões da Justiça de Impel Down fingindo ser Magellan' }
    ]
  },
  {
    targetTitle: 'Toge Toge no Mi (Fruta dos Espinhos)',
    badgeTitle: 'Paramecia de Projeção Corporal',
    charId: 'miss-doublefinger',
    valid: ['miss-doublefinger'],
    clues: [
      { label: 'Poder Perfurante', value: 'Brota espinhos pontiagudos de qualquer parte da anatomia corporal' },
      { label: 'Identidade Disfarçada', value: 'Dona do café Spiders em Alabasta e Oficial número 2 da Baroque Works' },
      { label: 'Duelo Marcante', value: 'Enfrentou Nami no primeiro teste do Clima-Tact em Alubarna' }
    ]
  },
  {
    targetTitle: 'Supa Supa no Mi (Fruta da Lâmina de Aço)',
    badgeTitle: 'Paramecia de Mutação Metálica',
    charId: 'mr-1-daz-bones',
    valid: ['mr-1-daz-bones'],
    clues: [
      { label: 'Dureza Metálica', value: 'Transforma o corpo em lâminas de aço afiado e indestrutível' },
      { label: 'Batalha Lendária', value: 'Forçou Roronoa Zoro a aprender a cortar o ferro para superá-lo' },
      { label: 'Lealdade Contínua', value: 'Braço direito e executor mais leal de Crocodile desde Alabasta até a Cross Guild' }
    ]
  },
  {
    targetTitle: 'Ori Ori no Mi (Fruta da Prisão / Jaula)',
    badgeTitle: 'Paramecia de Confinamento',
    charId: 'hina',
    valid: ['hina'],
    clues: [
      { label: 'Mecanismo de Captura', value: 'Membros corporais geram argolas de ferro que prendem quem as atravessa' },
      { label: 'Patente na Marinha', value: 'Oficial da Marinha conhecida como Hina da Jaula Negra, amiga de Smoker' },
      { label: 'Modo de Falar', value: 'Frequente hábito de falar de si mesma na terceira pessoa' }
    ]
  },
  {
    targetTitle: 'Bane Bane no Mi (Fruta da Mola)',
    badgeTitle: 'Paramecia de Propulsão',
    charId: 'bellamy',
    valid: ['bellamy'],
    clues: [
      { label: 'Mecanismo de Salto', value: 'Transforma pernas e braços em molas espirais de alta compressão' },
      { label: 'Alcunha Pirata', value: 'Bellamy, a Hiena de Jaya e Dressrosa' },
      { label: 'Nocaute Icônico', value: 'Derrubado por Monkey D. Luffy com apenas um soco direto em Mock Town' }
    ]
  },
  {
    targetTitle: 'Noro Noro no Mi (Fruta da Lentidão)',
    badgeTitle: 'Paramecia de Alteração Temporal',
    charId: 'foxy',
    valid: ['foxy'],
    clues: [
      { label: 'Efeito Temporal', value: 'Feixes de fótons Noro que reduzem a velocidade de qualquer alvo por 30 segundos' },
      { label: 'Competição Pirata', value: 'Especialista nos jogos de aposta do Davy Back Fight em Long Ring Long Land' },
      { label: 'Aparência Marcante', value: 'Capitão com nariz partido e risada característica Fehfehfeh' }
    ]
  },
  {
    targetTitle: 'Doa Doa no Mi (Fruta da Porta)',
    badgeTitle: 'Paramecia Dimensional',
    charId: 'blueno',
    valid: ['blueno'],
    clues: [
      { label: 'Dimensão Própria', value: 'Cria portas em qualquer superfície, incluindo o próprio ar e rostos' },
      { label: 'Refúgio Seguro', value: 'Acesso a uma dimensão paralela de bolso invisível aos olhos externos' },
      { label: 'Disfarce Urbano', value: 'Agente da CP9 disfarçado como barman na cidade de Water 7' }
    ]
  },
  {
    targetTitle: 'Awa Awa no Mi (Fruta do Sabão)',
    badgeTitle: 'Paramecia de Fluido Limpador',
    charId: 'kalifa',
    valid: ['kalifa'],
    clues: [
      { label: 'Efeito Redutor', value: 'Bolhas de sabão que lavam a força e deixam o corpo liso e escorregadio' },
      { label: 'Origem da Fruta', value: 'Presenteada por Spandam junto com a fruta de Kaku em Enies Lobby' },
      { label: 'Secretária Infiltrada', value: 'Atuava como secretária particular do prefeito Iceburg em Water 7' }
    ]
  },
  {
    targetTitle: 'Beri Beri no Mi (Fruta das Esferas / Bagas)',
    badgeTitle: 'Paramecia de Desmembramento',
    charId: 'very-good',
    valid: ['very-good'],
    clues: [
      { label: 'Divisão Esférica', value: 'Divide o corpo em inúmeras esferas redondas como cachos de frutas' },
      { label: 'Imunidade Contundente', value: 'Extremamente resistente a golpes de impacto e socos contundentes' },
      { label: 'Operação Militar', value: 'Capitão da Marinha participante do Buster Call em Enies Lobby' }
    ]
  },
  {
    targetTitle: 'Sabi Sabi no Mi (Fruta da Ferrugem)',
    badgeTitle: 'Paramecia Corrosiva',
    charId: 'shu',
    valid: ['shu'],
    clues: [
      { label: 'Corrosão Instantânea', value: 'Enferruja e desintegra instantaneamente qualquer metal com o toque' },
      { label: 'Arma Destruída', value: 'Destruiu a lendária katana Yubashiri de Zoro durante Enies Lobby' },
      { label: 'Oficial da Marinha', value: 'Capitão da Marinha mobilizado durante a fuga dos Chapéus de Palha' }
    ]
  },
  {
    targetTitle: 'Shari Shari no Mi (Fruta da Roda)',
    badgeTitle: 'Paramecia Motora',
    charId: 'sharinguru',
    valid: ['sharinguru'],
    clues: [
      { label: 'Rotação Mecânica', value: 'Transforma membros corporais em rodas que giram em velocidades vertiginosas' },
      { label: 'Impacto Físico', value: 'Utiliza as rodas giratórias como armas cortantes e de atropelamento' },
      { label: 'Confronto em Enies Lobby', value: 'Enfrentou Franky na ponte da hesitação durante o Buster Call' }
    ]
  },
  {
    targetTitle: 'Yomi Yomi no Mi (Fruta da Ressurreição)',
    badgeTitle: 'Paramecia Espiritual',
    charId: 'brook',
    valid: ['brook'],
    clues: [
      { label: 'Segunda Vida', value: 'Concede uma segunda vida após a morte e controle total da alma' },
      { label: 'Forma Física Resultante', value: 'Corpo esquelético devido à alma ter demorado um ano para achar o cadáver na névoa' },
      { label: 'Poder do Frio', value: 'Canaliza os calafrios do submundo para congelar suas lâminas de esgrima' }
    ]
  },
  {
    targetTitle: 'Kage Kage no Mi (Fruta das Sombras)',
    badgeTitle: 'Paramecia de Manipulação Espiritual',
    charId: 'gecko-moria',
    valid: ['gecko-moria'],
    clues: [
      { label: 'Exército Zumbi', value: 'Rouba sombras de pessoas vivas para animar cadáveres construídos por Hogback' },
      { label: 'Habilidade Doppelman', value: 'Cria um clone de sombra tangível capaz de trocar de lugar com o usuário' },
      { label: 'Navio Território', value: 'Comandava a maior ilha-navio do mundo, Thriller Bark, no Triângulo Florian' }
    ]
  },
  {
    targetTitle: 'Horo Horo no Mi (Fruta dos Fantasmas)',
    badgeTitle: 'Paramecia Ectoplásmica',
    charId: 'perona',
    valid: ['perona'],
    clues: [
      { label: 'Fantasmas Negativos', value: 'Fantasmas que drenam a vontade de viver de qualquer um, tornando-o deprimido' },
      { label: 'Única Imunidade', value: 'Usopp foi imune aos fantasmas por já possuir negatividade natural extrema' },
      { label: 'Projeção Astral', value: 'Capaz de projetar a própria consciência como um holograma intangível gigante' }
    ]
  },
  {
    targetTitle: 'Suke Suke no Mi (Fruta da Invisibilidade)',
    badgeTitle: 'Paramecia Óptica',
    charId: 'shiryu',
    valid: ['shiryu', 'absalom'],
    clues: [
      { label: 'Efeito Óptico', value: 'Torna o usuário e qualquer objeto ou pessoa em contato completamente invisíveis' },
      { label: 'Sucessão Trágica', value: 'Pertencia a Absalom em Thriller Bark antes de ser roubada por Barba Negra para Shiryu' },
      { label: 'Espadachim Letal', value: 'Agora empunhada pelo assassino ex-chefe carcereiro de Impel Down' }
    ]
  },
  {
    targetTitle: 'Nikyu Nikyu no Mi (Fruta da Pata)',
    badgeTitle: 'Paramecia de Repulsão Conceitual',
    charId: 'bartholomew-kuma',
    valid: ['bartholomew-kuma'],
    clues: [
      { label: 'Almofadas nas Mãos', value: 'Patas carnosas capazes de repelir qualquer matéria, dor física e até memórias' },
      { label: 'Viagem de Três Dias', value: 'Envia pessoas voando pelos céus até ilhas distantes em bolhas de ar por 3 dias' },
      { label: 'Linhagem Buccaneer', value: 'Portador pacifista e mártir do Reino de Sorbet e do Exército Revolucionário' }
    ]
  },
  {
    targetTitle: 'Mero Mero no Mi (Fruta da Paixão / Petrificação)',
    badgeTitle: 'Paramecia Emocional',
    charId: 'boa-hancock',
    valid: ['boa-hancock'],
    clues: [
      { label: 'Petrificação', value: 'Transforma em pedra qualquer pessoa que nutra pensamentos lascivos ou de atração' },
      { label: 'Raio de Flechas', value: 'Dispara flechas e beijos em forma de coração capazes de quebrar e petrificar rochas' },
      { label: 'Imperatriz Pirata', value: 'Usuária e soberana de Amazon Lily, a Imperatriz de Kuja' }
    ]
  },
  {
    targetTitle: 'Doku Doku no Mi (Fruta do Veneno)',
    badgeTitle: 'Paramecia de Tóxicos',
    charId: 'magellan',
    valid: ['magellan'],
    clues: [
      { label: 'Golpe Kinjite', value: 'Técnica proibida Veneno do Julgamento do Inferno (Venom Demon) corrosivo' },
      { label: 'Consequência Digestiva', value: 'Usuário sofre de diarreia crônica por ingerir comida envenenada' },
      { label: 'Fortaleza Submarina', value: 'Diretor supremo da prisão de segurança máxima Impel Down' }
    ]
  },
  {
    targetTitle: 'Horu Horu no Mi (Fruta dos Hormônios)',
    badgeTitle: 'Paramecia Bioquímica',
    charId: 'emporio-ivankov',
    valid: ['emporio-ivankov'],
    clues: [
      { label: 'Injeção nas Unhas', value: 'Altera gênero, temperatura, crescimento, vigor e pigmentação através de hormônios' },
      { label: 'Rainha de Kamabakka', value: 'Monarca do Reino dos Okamas e comandante do Exército Revolucionário' },
      { label: 'Salvamento de Luffy', value: 'Curou Luffy do veneno letal de Magellan através dos hormônios de cura e tensão' }
    ]
  },
  {
    targetTitle: 'Choki Choki no Mi (Fruta da Tesoura)',
    badgeTitle: 'Paramecia de Transformação',
    charId: 'inazuma',
    valid: ['inazuma'],
    clues: [
      { label: 'Corte Maleável', value: 'Transforma as mãos em lâminas que cortam qualquer substância sólida como se fosse papel' },
      { label: 'Construção da Rampa', value: 'Cortou o solo de Marineford criando uma ponte para Luffy alcançar o cadafalso' },
      { label: 'Companheiro Revolucionário', value: 'Braço direito de Emporio Ivankov com jaqueta de duas cores e taça de vinho' }
    ]
  },
  {
    targetTitle: 'Gura Gura no Mi (Fruta do Terremoto)',
    badgeTitle: 'Paramecia Mais Destrutiva do Mundo',
    charId: 'edward-newgate-barba-branca',
    valid: ['edward-newgate-barba-branca', 'marshall-d-teach-barba-negra'],
    clues: [
      { label: 'Poder de Destruição', value: 'Capaz de rachar o próprio ar e gerar maremotos e tsunamis colossais' },
      { label: 'Transferência Obscura', value: 'Roubada do corpo do Barba Branca sob um pano negro durante Marineford' },
      { label: 'Ameaça Planetária', value: 'Dita por Sengoku como possuidora do poder capaz de destruir o mundo inteiro' }
    ]
  },
  {
    targetTitle: 'Ope Ope no Mi (Fruta da Operação)',
    badgeTitle: 'Paramecia Suprema da Medicina',
    charId: 'trafalgar-d-water-law',
    valid: ['trafalgar-d-water-law'],
    clues: [
      { label: 'Esfera Espacial', value: 'Habilidade ROOM: domínio espacial onde o cirurgião pode decepar e teleportar sem ferir' },
      { label: 'Cirurgia da Juventude Perene', value: 'Capaz de conceder vida eterna a alguém em troca do sacrifício da vida do usuário' },
      { label: 'Preço no Submundo', value: 'O Governo Mundial tentou comprá-la por 5 bilhões de Berries no passado' }
    ]
  },
  {
    targetTitle: 'Shiro Shiro no Mi (Fruta do Castelo)',
    badgeTitle: 'Paramecia Arquitetônica',
    charId: 'capone-bege',
    valid: ['capone-bege'],
    clues: [
      { label: 'Corpo Fortaleza', value: 'Transforma o interior do corpo em uma fortaleza viva com canhões e cavalaria' },
      { label: 'Forma Big Father', value: 'Gigantesca fortaleza blindada com esteiras de tanque de guerra' },
      { label: 'Chefe da Máfia', value: 'Líder dos Firetank Pirates vindo do West Blue e infiltrado na família Charlotte' }
    ]
  },
  {
    targetTitle: 'Wara Wara no Mi (Fruta da Palha)',
    badgeTitle: 'Paramecia de Vodu',
    charId: 'basil-hawkins',
    valid: ['basil-hawkins'],
    clues: [
      { label: 'Redirecionamento de Dano', value: 'Bonecos de palha no corpo transferem ferimentos mortais para terceiros' },
      { label: 'Forma Monstruosa', value: 'Transforma-se em um demônio gigante de palha (Goumame) armado com pregos' },
      { label: 'Leitura de Tarô', value: 'Supernova obcecado por porcentagens e adivinhações do destino' }
    ]
  },
  {
    targetTitle: 'Oto Oto no Mi (Fruta da Música / Som)',
    badgeTitle: 'Paramecia Acústica',
    charId: 'scratchmen-apoo',
    valid: ['scratchmen-apoo'],
    clues: [
      { label: 'Membros Instrumentos', value: 'Transforma partes do corpo em pratos, flautas, trompetes e tambores' },
      { label: 'Som Cortante e Explosivo', value: 'Golpes sonoros que explodem ou fatiam qualquer um que ouça a melodia' },
      { label: 'Tribo de Origem', value: 'Supernova pertencente à tribo dos braços longos' }
    ]
  },
  {
    targetTitle: 'Jiki Jiki no Mi (Fruta do Magnetismo)',
    badgeTitle: 'Paramecia Eletromagnética',
    charId: 'eustass-kid',
    valid: ['eustass-kid'],
    clues: [
      { label: 'Manipulação Férrea', value: 'Atrai e repele metais construindo gigantescos braços e feras mecânicas' },
      { label: 'Despertar Magnético', value: 'Assign: transforma qualquer outro ser vivo ou objeto num ímã poderoso' },
      { label: 'Canhão Final', value: 'Damned Punk: canhão eletromagnético de trilho usado contra Big Mom' }
    ]
  },
  {
    targetTitle: 'Ito Ito no Mi (Fruta do Fio)',
    badgeTitle: 'Paramecia Têxtil / Estrutural',
    charId: 'donquixote-doflamingo',
    valid: ['donquixote-doflamingo'],
    clues: [
      { label: 'Técnica Torikago', value: 'Gaiola de pássaros gigante com fios cortantes que fecham sobre a ilha' },
      { label: 'Marionetes Humanas', value: 'Parasite: controla os movimentos de inimigos conectando fios na coluna' },
      { label: 'Voo Aéreo', value: 'Flutua pelos céus enganchando fios microscópicos nas nuvens' }
    ]
  },
  {
    targetTitle: 'Bari Bari no Mi (Fruta da Barreira)',
    badgeTitle: 'Paramecia Defensiva Indestrutível',
    charId: 'bartolomeo',
    valid: ['bartolomeo', 'kurozumi-semimaru'],
    clues: [
      { label: 'Gesto dos Dedos', value: 'Cruzar os dedos indicador e médio gera escudos completamente inquebráveis' },
      { label: 'Defesa Absoluta', value: 'Bloqueou o King Punch de Elizabello e os cortes de Oden no passado de Wano' },
      { label: 'Fã Número Um', value: 'Usuário atual lidera o fã-clube Barto Club em devoção total aos Mugiwaras' }
    ]
  },
  {
    targetTitle: 'Buki Buki no Mi (Fruta das Armas)',
    badgeTitle: 'Paramecia Bélica',
    charId: 'baby-5',
    valid: ['baby-5'],
    clues: [
      { label: 'Arsenal Vivo', value: 'Transforma qualquer parte do corpo em lâminas, pistolas, mísseis ou foices' },
      { label: 'Necessidade Psicológica', value: 'Incapaz de recusar qualquer pedido por necessidade obsessiva de se sentir útil' },
      { label: 'Casamento em Dressrosa', value: 'Ex-assassina da família Donquixote que se casou com Sai da Armada Happo' }
    ]
  },
  {
    targetTitle: 'Guru Guru no Mi (Fruta da Rotação / Hélice)',
    badgeTitle: 'Paramecia Propulsora',
    charId: 'buffalo',
    valid: ['buffalo'],
    clues: [
      { label: 'Voo Rotativo', value: 'Gira cabelos e membros como hélices gerando sustentação de voo e ventanias' },
      { label: 'Combinação Aérea', value: 'Servia de plataforma voadora para Baby 5 atirar durante missões em Punk Hazard' },
      { label: 'Oficial de Pica', value: 'Membro com visual rechonchudo e trança no cabelo da tripulação de Doflamingo' }
    ]
  },
  {
    targetTitle: 'Nui Nui no Mi (Fruta da Costura)',
    badgeTitle: 'Paramecia Têxtil',
    charId: 'leo',
    valid: ['leo'],
    clues: [
      { label: 'Agulha e Linha', value: 'Costura qualquer objeto, metal ou pessoas no próprio solo sem causar ferimentos' },
      { label: 'Líder dos Anões', value: 'Guerreiro e líder dos Tontattas do Reino de Tontatta em Dressrosa' },
      { label: 'Grande Frota', value: 'Capitão da 5ª Divisão da Grande Frota dos Chapéus de Palha' }
    ]
  },
  {
    targetTitle: 'Giro Giro no Mi (Fruta do Olhar)',
    badgeTitle: 'Paramecia Sensorial / Clarividência',
    charId: 'viola',
    valid: ['viola'],
    clues: [
      { label: 'Visão de 4.000 km', value: 'Permite enxergar através de tudo e ver a mente e memórias das pessoas' },
      { label: 'Lágrimas Ofensivas', value: 'Transforma lágrimas em grandes baleias de ferro para esmagar alvos' },
      { label: 'Princesa de Dressrosa', value: 'Filha do Rei Riku que atuava infiltrada na família Donquixote como Violet' }
    ]
  },
  {
    targetTitle: 'Ato Ato no Mi (Fruta da Arte)',
    badgeTitle: 'Paramecia de Transfiguração',
    charId: 'jora',
    valid: ['jora'],
    clues: [
      { label: 'Distorção Artística', value: 'Transforma seres vivos e armas em pinturas cubistas e abstratas sem função' },
      { label: 'Alvo Emboscado', value: 'Quase destruiu o Thousand Sunny transformando Nami, Chopper e Brook em arte' },
      { label: 'Estilo de Pintura', value: 'Adora citar estilos artísticos pós-modernos e estética surrealista' }
    ]
  },
  {
    targetTitle: 'Jake Jake no Mi (Fruta da Jaqueta)',
    badgeTitle: 'Paramecia Simbiótica',
    charId: 'kelly-funk',
    valid: ['kelly-funk'],
    clues: [
      { label: 'Possessão Corporal', value: 'Transforma o usuário em uma jaqueta que, ao ser vestida, controla o hospedeiro' },
      { label: 'Dupla de Irmãos', value: 'Veste o corpo de seu irmão gigante e poderoso Bobby Funk no Coliseu Corrida' },
      { label: 'Assassinos de Mogaro', value: 'Gladiadores mercenários conhecidos pelas lutas brutais e sem regras' }
    ]
  },
  {
    targetTitle: 'Pamu Pamu no Mi (Fruta da Ruptura)',
    badgeTitle: 'Paramecia de Expansão e Estalo',
    charId: 'gladius',
    valid: ['gladius'],
    clues: [
      { label: 'Inchaço Explosivo', value: 'Faz qualquer matéria inorgânica ou o próprio corpo inchar até estourar em estilhaços' },
      { label: 'Cabelo Espinhoso', value: 'Dispara agulhas envenenadas de seus próprios cabelos inflados' },
      { label: 'Oficial de Diamante', value: 'Membro com máscara e óculos steampunk da família Donquixote' }
    ]
  },
  {
    targetTitle: 'Sui Sui no Mi (Fruta do Nado)',
    badgeTitle: 'Paramecia de Translocação',
    charId: 'senor-pink',
    valid: ['senor-pink'],
    clues: [
      { label: 'Nado em Sólidos', value: 'Permite nadar no chão, paredes de concreto e pedras como se fossem água' },
      { label: 'Vestimenta Excêntrica', value: 'Usa fraldas, chupeta e touca de bebê em homenagem ao amor por sua falecida esposa Lucianne' },
      { label: 'Duelo de Homens', value: 'Travou uma lendária e honrada batalha de troca de socos contra Franky' }
    ]
  },
  {
    targetTitle: 'Ton Ton no Mi (Fruta das Toneladas)',
    badgeTitle: 'Paramecia de Massa Superior',
    charId: 'machvise',
    valid: ['machvise'],
    clues: [
      { label: 'Massa Extrema', value: 'Aumenta o próprio peso corporal em dezenas de milhares de toneladas métricas' },
      { label: 'Golpe Aéreo', value: 'Desaba como um meteorito usando um escudo de ferro preso às costas' },
      { label: 'Derrota em Dressrosa', value: 'Teve seus ossos esmagados pelo gigante Hajrudin empurrando-o contra o teto' }
    ]
  },
  {
    targetTitle: 'Hira Hira no Mi (Fruta da Bandeira)',
    badgeTitle: 'Paramecia de Maleabilidade',
    charId: 'diamante',
    valid: ['diamante'],
    clues: [
      { label: 'Ondulação Metálica', value: 'Torna qualquer material flexível e esvoaçante como pano sem perder sua dureza' },
      { label: 'Lâmina Dobrável', value: 'Dobra espadas em formatos imprevisíveis de serpente para surpreender inimigos' },
      { label: 'Herói do Coliseu', value: 'Oficial comandante executivo do Coliseu Corrida em Dressrosa' }
    ]
  },
  {
    targetTitle: 'Ishi Ishi no Mi (Fruta da Pedra)',
    badgeTitle: 'Paramecia de Assimilação Terrena',
    charId: 'pica',
    valid: ['pica'],
    clues: [
      { label: 'Golem Continental', value: 'Funde-se à rocha criando um titã de pedra do tamanho de montanhas inteiras' },
      { label: 'Contraste Cômico', value: 'Apesar do porte gigante assustador, possui uma voz agudíssima e cômica' },
      { label: 'Corte Tri-Dimensional', value: 'Teve seu golem fatiado no ar pelo Sanzen Sekai de Roronoa Zoro' }
    ]
  },
  {
    targetTitle: 'Fude Fude no Mi (Fruta do Pincel / Desenho)',
    badgeTitle: 'Paramecia Artística Materializadora',
    charId: 'kanjuro',
    valid: ['kanjuro'],
    clues: [
      { label: 'Tinta Viva', value: 'Qualquer desenho feito com tinta e seu pincel ganha vida e substância real' },
      { label: 'Disfarce de Incompetente', value: 'Desenhava mal de propósito para não levantar suspeitas de que era um traidor' },
      { label: 'Traidor de Wano', value: 'Membro do clã Kurozumi que traiu a confiança dos Bainhas Vermelhas' }
    ]
  },
  {
    targetTitle: 'Beta Beta no Mi (Fruta da Viscosidade / Muco)',
    badgeTitle: 'Paramecia Viscosa Inflamável',
    charId: 'trebol',
    valid: ['trebol'],
    clues: [
      { label: 'Propriedade Falsa de Logia', value: 'Parece Logia, mas é uma Paramecia secretada sobre um corpo extremamente franzino' },
      { label: 'Substância Altamente Combustível', value: 'O muco grudento explode violentamente ao contato com a menor fagulha' },
      { label: 'Mentor do Crime', value: 'Foi quem entregou a arma e a fruta Ito Ito para Doflamingo quando jovem' }
    ]
  },
  {
    targetTitle: 'Hobi Hobi no Mi (Fruta do Brinquedo)',
    badgeTitle: 'Paramecia de Apagamento Memorial',
    charId: 'sugar',
    valid: ['sugar'],
    clues: [
      { label: 'Toque Amnésico', value: 'Transforma pessoas em brinquedos e apaga sua memória da mente de todo o mundo' },
      { label: 'Juventude Congelada', value: 'O usuário para de envelhecer no instante exato em que consome o fruto' },
      { label: 'Rosto do Pânico', value: 'Desmaiou duas vezes após presenciar as expressões apavorantes de God Usopp' }
    ]
  },
  {
    targetTitle: 'Zushi Zushi no Mi (Fruta da Gravidade)',
    badgeTitle: 'Paramecia Gravitacional',
    charId: 'fujitora-issho',
    valid: ['fujitora-issho'],
    clues: [
      { label: 'Invocação de Meteoros', value: 'Manipula forças de gravidade puxando meteoritos incandescentes do espaço' },
      { label: 'Cegueira Autoimposta', value: 'Usuário é um Almirante cego da Marinha que empunha uma espada shikomi-zue' },
      { label: 'Pressão Vertical', value: 'Cria crateras gigantescas esmagando inimigos contra o piso com gravidade pura' }
    ]
  },
  {
    targetTitle: 'Soru Soru no Mi (Fruta das Almas)',
    badgeTitle: 'Paramecia Espiritual Superior',
    charId: 'charlotte-linlin-big-mom',
    valid: ['charlotte-linlin-big-mom', 'mother-carmel'],
    clues: [
      { label: 'Criação de Homies', value: 'Injeta fragmentos de almas humanas em nuvens, fogo e espadas (Zeus, Prometeus, Hera)' },
      { label: 'Soul Pocus', value: 'Arranca a expectativa de vida inteira de quem sentir medo da usuária' },
      { label: 'Origem Misteriosa', value: 'Adquirida após o desaparecimento de Mãe Carmel no aniversário de infância em Elbaf' }
    ]
  },
  {
    targetTitle: 'Pero Pero no Mi (Fruta do Doce / Pirulito)',
    badgeTitle: 'Paramecia de Caramelo',
    charId: 'charlotte-perospero',
    valid: ['charlotte-perospero'],
    clues: [
      { label: 'Caramelo Endurecido', value: 'Cria construções complexas de doce e réplicas de ferrovia e laboratório' },
      { label: 'Primogênito da Família', value: 'Filho mais velho de Big Mom com chapéu pontudo e língua gigantesca' },
      { label: 'Perda do Braço', value: 'Perdeu um braço na explosão de sacrifício de Pedro em Whole Cake Island' }
    ]
  },
  {
    targetTitle: 'Mira Mira no Mi (Fruta do Espelho)',
    badgeTitle: 'Paramecia Dimensional Espelhada',
    charId: 'charlotte-brulee',
    valid: ['charlotte-brulee'],
    clues: [
      { label: 'Dimensão Mirror World', value: 'Permite entrar nos espelhos e transitar por qualquer espelho da ilha' },
      { label: 'Reflexo de Golpes', value: 'Reflete projéteis e ataques de volta para o agressor através da superfície espelhada' },
      { label: 'Irmã Protetora', value: 'Irmã de Katakuri que foi cortada no rosto na infância, gerando o complexo do irmão' }
    ]
  },
  {
    targetTitle: 'Mochi Mochi no Mi (Fruta do Mochi)',
    badgeTitle: 'Paramecia Especial (Comportamento de Logia)',
    charId: 'charlotte-katakuri',
    valid: ['charlotte-katakuri'],
    clues: [
      { label: 'Paramecia Especial', value: 'Permite gerar, controlar e se transformar em massa de arroz mochi' },
      { label: 'Visão do Futuro', value: 'Combinada com Haki da Observação avançado para moldar o corpo antes dos golpes' },
      { label: 'Lanche das Quatro', value: 'Hora sagrada em que come rosquinhas sem testemunhas para relaxar a boca' }
    ]
  },
  {
    targetTitle: 'Bisu Bisu no Mi (Fruta do Biscoito)',
    badgeTitle: 'Paramecia de Criação Alimentar',
    charId: 'charlotte-cracker',
    valid: ['charlotte-cracker'],
    clues: [
      { label: 'Armaduras Infinitas', value: 'Bate palmas para criar guerreiros armados de biscoito extremamente duros' },
      { label: 'Fraqueza à Água', value: 'Os biscoitos amolecem e perdem toda a rigidez ao contato com chuva ou líquidos' },
      { label: 'General da Doçura', value: 'Comandante da Doçura que Luffy derrotou após 11 horas comendo com o Gear 4 Tankman' }
    ]
  },
  {
    targetTitle: 'Buku Buku no Mi (Fruta do Livro)',
    badgeTitle: 'Paramecia Literária',
    charId: 'charlotte-mont-dor',
    valid: ['charlotte-mont-dor'],
    clues: [
      { label: 'Prisão em Páginas', value: 'Prende criaturas vivas para sempre dentro das páginas de livros como espécimes' },
      { label: 'Ilusão de Voo', value: 'Flutua sobre livros abertos controlando a biblioteca de Whole Cake' },
      { label: 'Ministro dos Queijos', value: 'Irmão encarregado do sistema de comunicação e alarmes de Totto Land' }
    ]
  },
  {
    targetTitle: 'Hoya Hoya no Mi (Fruta do Gênio da Lâmpada)',
    badgeTitle: 'Paramecia de Evocação',
    charId: 'charlotte-daifuku',
    valid: ['charlotte-daifuku'],
    clues: [
      { label: 'Fricção Abdominal', value: 'Esfregar a própria barriga liberta um colossal guerreiro gênio armado com alabarda' },
      { label: 'Irmão Trigêmeo', value: 'Irmão trigêmeo de Katakuri e Oven, comandante naval da frota de Totto Land' },
      { label: 'Alcance Físico', value: 'O gênio luta a média distância enquanto o usuário comanda imóvel' }
    ]
  },
  {
    targetTitle: 'Netsu Netsu no Mi (Fruta do Calor)',
    badgeTitle: 'Paramecia Térmica',
    charId: 'charlotte-oven',
    valid: ['charlotte-oven'],
    clues: [
      { label: 'Superaquecimento Oceânico', value: 'Ferve porções inteiras do mar até o ponto de ebulição mergulhando os braços' },
      { label: 'Armas Incandescentes', value: 'Aquece a temperatura corporal a milhares de graus derretendo lâminas inimigas' },
      { label: 'Ministro dos Assados', value: 'Irmão de porte massivo que defendeu as docas de Cacao Island' }
    ]
  },
  {
    targetTitle: 'Kuku Kuku no Mi (Fruta do Cozinheiro)',
    badgeTitle: 'Paramecia Gourmet',
    charId: 'streusen',
    valid: ['streusen'],
    clues: [
      { label: 'Transformação em Alimento', value: 'Transforma qualquer matéria inanimada como madeira ou pedras em comida saborosa' },
      { label: 'Fundador Secreto', value: 'Ex-pirata que encontrou Charlotte Linlin criança e fundou a tripulação com ela' },
      { label: 'Salvação de Whole Cake', value: 'Transformou o castelo destruído que desabava em bolo gigante amortecendo a queda' }
    ]
  },
  {
    targetTitle: 'Memo Memo no Mi (Fruta da Memória)',
    badgeTitle: 'Paramecia Mnemônica',
    charId: 'charlotte-pudding',
    valid: ['charlotte-pudding'],
    clues: [
      { label: 'Fita de Cinema', value: 'Puxa memórias em formato de tiras de filme cinematográfico cortando ou adicionando fatos' },
      { label: 'Terceiro Olho', value: 'Membro da tribo dos Três Olhos capaz de despertar a leitura de Poneglyphs' },
      { label: 'Amor por Sanji', value: 'Noiva forçada de Sanji que se apaixonou de verdade após ele elogiar seu terceiro olho' }
    ]
  },
  {
    targetTitle: 'Shibo Shibo no Mi (Fruta da Extração / Suco)',
    badgeTitle: 'Paramecia Hidrostática',
    charId: 'charlotte-smoothie',
    valid: ['charlotte-smoothie'],
    clues: [
      { label: 'Torção de Líquidos', value: 'Espreme líquidos e sucos de seres vivos e rochas torcendo-os com as mãos ou espada' },
      { label: 'Gigantismo Hídrico', value: 'Absorve umidade e venenos para crescer até proporções colossais' },
      { label: 'General de Três Olhos/Pernas Longas', value: 'Segunda filha de Big Mom e General da Doçura de 932 milhões de Berries' }
    ]
  },
  {
    targetTitle: 'Fuku Fuku no Mi (Fruta da Roupa)',
    badgeTitle: 'Paramecia Têxtil',
    charId: 'kinemon',
    valid: ['kinemon'],
    clues: [
      { label: 'Folha na Cabeça', value: 'Colocar uma folha ou pedra sobre a cabeça materializa trajes e agasalhos térmicos' },
      { label: 'Líder dos Bainhas', value: 'Líder dos Nove Bainhas Vermelhas de Kozuki Oden' },
      { label: 'Corte do Fogo', value: 'Conhecido como Kin\'emon do Fogo Raposo' }
    ]
  },
  {
    targetTitle: 'Maki Maki no Mi (Fruta do Pergaminho)',
    badgeTitle: 'Paramecia Ninja',
    charId: 'raizo',
    valid: ['raizo'],
    clues: [
      { label: 'Armazenamento Absoluto', value: 'Desenrola pergaminhos que absorvem água e fogo inimigo para devolver em seguida' },
      { label: 'Apagou Onigashima', value: 'Guardou a água do banho de Zunesha para inundar e extinguir o incêndio do castelo' },
      { label: 'Ninja de Wano', value: 'Bainha Vermelha de visual cômico e mestre do Ninjutsu' }
    ]
  },
  {
    targetTitle: 'Juku Juku no Mi (Fruta do Amadurecimento)',
    badgeTitle: 'Paramecia Temporal Orgânica',
    charId: 'shinobu',
    valid: ['shinobu'],
    clues: [
      { label: 'Envelhecimento Físico', value: 'Amadurece e decai qualquer matéria inanimada ou faz pessoas avançarem na idade' },
      { label: 'Crescimento de Momonosuke', value: 'Envelheceu Kozuki Momonosuke 20 anos permitindo que ele virasse um dragão adulto' },
      { label: 'Kunoichi Protetora', value: 'Guerreira leal a Kozuki Oden desde a época de sua juventude' }
    ]
  },
  {
    targetTitle: 'Nomi Nomi no Mi (Fruta do Cérebro)',
    badgeTitle: 'Paramecia Cerebral',
    charId: 'dr-vegapunk',
    valid: ['dr-vegapunk'],
    clues: [
      { label: 'Memória Infinita', value: 'Capacidade de armazenar informações ilimitadas, fazendo o cérebro crescer sem parar' },
      { label: 'Antena Punk Records', value: 'Cortou o próprio cérebro gigante colocando-o em um domo conectado aos Satélites' },
      { label: 'Maior Cientista do Mundo', value: 'Criador dos Pacifistas, Serafins e das armas tecnológicas mais avançadas' }
    ]
  },
  {
    targetTitle: 'Wapu Wapu no Mi (Fruta do Teletransporte)',
    badgeTitle: 'Paramecia Espacial',
    charId: 'van-augur',
    valid: ['van-augur'],
    clues: [
      { label: 'Translocação Instantânea', value: 'Teletransporta a si mesmo e a companheiros para qualquer ponto visível no horizonte' },
      { label: 'Atirador de Elite', value: 'Franco-atirador de Barba Negra armado com o rifle Senriku' },
      { label: 'Frase Famosa', value: 'Afirma constantemente que tudo no mundo é determinado pelo destino e sina' }
    ]
  },
  {
    targetTitle: 'Riki Riki no Mi (Fruta da Força)',
    badgeTitle: 'Paramecia de Aumento Físico',
    charId: 'jesus-burgess',
    valid: ['jesus-burgess'],
    clues: [
      { label: 'Superforça Extrema', value: 'Concede força sobre-humana suficiente para levantar montanhas inteiras no ar' },
      { label: 'Timoneiro Pirata', value: 'Capitão da 1ª Nau dos Piratas do Barba Negra conhecido como O Campeão' },
      { label: 'Máscara de Lucha', value: 'Usa máscara de luta livre mexicana e gritava Weahaha' }
    ]
  },
  {
    targetTitle: 'Shiku Shiku no Mi (Fruta da Doença)',
    badgeTitle: 'Paramecia Patológica',
    charId: 'doc-q',
    valid: ['doc-q'],
    clues: [
      { label: 'Infecção por Enfermidades', value: 'Espalha vírus e doenças contagiosas instantâneas, incluindo a Doença da Feminilização' },
      { label: 'Médico Doente', value: 'Médico da tripulação de Barba Negra que anda montado no cavalo Stronger' },
      { label: 'Maçãs Explosivas', value: 'Costumava distribuir cestas de maçãs contendo bombas sorteadas pelo destino' }
    ]
  },
  {
    targetTitle: 'Shima Shima no Mi (Fruta da Ilha)',
    badgeTitle: 'Paramecia de Assimilação Geográfica',
    charId: 'avalo-pizarro',
    valid: ['avalo-pizarro'],
    clues: [
      { label: 'Ilha Viva', value: 'Funde-se à massa de terra de uma ilha inteira controlando suas montanhas e solo' },
      { label: 'Prisioneiro do Nível 6', value: 'Ex-rei corrupto do North Blue libertado de Impel Down por Barba Negra' },
      { label: 'Batalha de Hachinosu', value: 'Tentou esmagar o navio da Marinha com uma mão rochosa colossal de Hachinosu' }
    ]
  },
  {
    targetTitle: 'Deka Deka no Mi (Fruta do Gigantismo)',
    badgeTitle: 'Paramecia de Tamanho',
    charId: 'sanjuan-wolf',
    valid: ['sanjuan-wolf'],
    clues: [
      { label: 'Gigante Além do Limite', value: 'Aumenta o corpo de um gigante natural até a assustadora altura de 180 metros' },
      { label: 'Andarilho no Oceano', value: 'Tamanho tão colossal que caminha no fundo do mar com a cabeça fora d\'água' },
      { label: 'Alcunha Temida', value: 'Conhecido mundialmente como O Encouraçado Colossal' }
    ]
  },
  {
    targetTitle: 'Gabu Gabu no Mi (Fruta do Licor)',
    badgeTitle: 'Paramecia Alcoólica',
    charId: 'vasco-shot',
    valid: ['vasco-shot'],
    clues: [
      { label: 'Manipulação Alcoólica', value: 'Produz e cospe jatos de licor de alto teor inflamável criando fogo devastador' },
      { label: 'Prisioneiro Perverso', value: 'Um dos criminosos mais vis da história libertados do Nível 6 de Impel Down' },
      { label: 'Aparência Bizarra', value: 'Usa chapéu de bobo da corte e tem nariz comprido e garrafa de bebida' }
    ]
  },
  {
    targetTitle: 'Kobu Kobu no Mi (Fruta do Encorajamento)',
    badgeTitle: 'Paramecia de Moral / Liderança',
    charId: 'belo-betty',
    valid: ['belo-betty'],
    clues: [
      { label: 'Despertar de Força Civil', value: 'Agitar sua bandeira desperta a força interior e coragem de populações oprimidas' },
      { label: 'Exército Revolucionário', value: 'Comandante do Exército do Leste sob liderança de Monkey D. Dragon' },
      { label: 'Libertação do Reino de Lulusia', value: 'Liderou civis com vassouras e pedras para derrotar piratas invasores' }
    ]
  },
  {
    targetTitle: 'Oshi Oshi no Mi (Fruta do Empurrão / Escavação)',
    badgeTitle: 'Paramecia Terrestre',
    charId: 'morley',
    valid: ['morley'],
    clues: [
      { label: 'Moldagem de Rocha', value: 'Empurra e molda a rocha sólida como se fosse argila maleável sem quebrar' },
      { label: 'Criador do Nível 5.5', value: 'Escavou secretamente o esconderijo secreto dos prisioneiros em Impel Down' },
      { label: 'Gigante Okama', value: 'Comandante do Exército do Oeste dos Revolucionários que usa um tridente' }
    ]
  },
  {
    targetTitle: 'Gunyo Gunyo no Mi (Fruta da Argila)',
    badgeTitle: 'Paramecia de Modelagem Mineral',
    charId: 'prince-grus',
    valid: ['prince-grus'],
    clues: [
      { label: 'Soldados de Argila', value: 'Gera e molda argila para criar guerreiros resistentes e redes de amortecimento' },
      { label: 'Membro da SWORD', value: 'Contra-Almirante da Marinha pertencente à unidade secreta de Koby e Helmeppo' },
      { label: 'Invasão a Hachinosu', value: 'Utilizou a argila para amortecer o navio da Marinha atirado por Garp' }
    ]
  },
  {
    targetTitle: 'Hana Hana no Mi (Fruta da Flor)',
    badgeTitle: 'Paramecia de Projeção Corporal',
    charId: 'nico-robin',
    valid: ['nico-robin'],
    clues: [
      { label: 'Florescer de Membros', value: 'Brota cópias perfeitas de qualquer membro de seu corpo em qualquer superfície visível' },
      { label: 'Forma Demonio Fleur', value: 'Cria uma gigante demoníaca alada com pele negra endurecida por Haki' },
      { label: 'Única Arqueóloga', value: 'Única sobrevivente do massacre de Ohara capaz de decifrar Poneglyphs' }
    ]
  },
  {
    targetTitle: 'Kira Kira no Mi (Fruta do Diamante)',
    badgeTitle: 'Paramecia de Dureza Mineral',
    charId: 'jozu',
    valid: ['jozu'],
    clues: [
      { label: 'Dureza Imbatível', value: 'Transforma o corpo em diamante puro, tornando-o imune até aos cortes de Mihawk' },
      { label: 'Comandante da 3ª Divisão', value: 'Veterano dos Piratas do Barba Branca conhecido como Jozu do Diamante' },
      { label: 'Arremesso de Iceberg', value: 'Arrancou com as próprias mãos um gigantesco bloco de gelo em Marineford' }
    ]
  },
  {
    targetTitle: 'Woshu Woshu no Mi (Fruta da Lavagem)',
    badgeTitle: 'Paramecia Moral / Purificadora',
    charId: 'tsuru',
    valid: ['tsuru'],
    clues: [
      { label: 'Varal Humano', value: 'Lava e pendura criminosos em varais como roupas, limpando parcialmente sua maldade' },
      { label: 'Grande Estrategista', value: 'Vice-Almirante veterana da Marinha contemporânea de Sengoku e Garp' },
      { label: 'Respeito de Doflamingo', value: 'Uma das poucas figuras da Marinha que Doflamingo sempre evitou enfrentar' }
    ]
  },

  // Logias Lendárias
  {
    targetTitle: 'Moku Moku no Mi (Fruta da Fumaça)',
    badgeTitle: 'Logia de Fumaça',
    charId: 'smoker',
    valid: ['smoker'],
    clues: [
      { label: 'Primeira Logia Apresentada', value: 'Primeira fruta do tipo Logia a ser introduzida na história (Loguetown)' },
      { label: 'Arma com Kairouseki', value: 'Usuário empunha um jitte com ponta de pedra do mar para anular outros usuários' },
      { label: 'Alcunha da Marinha', value: 'Smoker, o Caçador Branco e líder do infame esquadrão G-5' }
    ]
  },
  {
    targetTitle: 'Suna Suna no Mi (Fruta da Areia)',
    badgeTitle: 'Logia Terrestre / Desértica',
    charId: 'crocodile',
    valid: ['crocodile'],
    clues: [
      { label: 'Desidratação Absoluta', value: 'Drena instantaneamente toda a umidade e líquidos de qualquer ser com a mão direita' },
      { label: 'Fraqueza Elementar', value: 'Torna-se tangível e perde sua intangibilidade ao contato com água ou sangue' },
      { label: 'Líder da Baroque Works', value: 'Ex-Shichibukai que tentou conquistar Alabasta e reativar a arma Pluton' }
    ]
  },
  {
    targetTitle: 'Goro Goro no Mi (Fruta do Trovão / Relâmpago)',
    badgeTitle: 'Logia de Eletricidade',
    charId: 'enel',
    valid: ['enel'],
    clues: [
      { label: 'Potência Elétrica', value: 'Gera descargas elétricas colossais de até 200 milhões de Volts' },
      { label: 'Fraqueza Natural', value: 'Seus raios foram completamente ineficazes contra o corpo de borracha de Luffy' },
      { label: 'Deus de Skypiea', value: 'Autoproclamado Deus da ilha do céu que viajou para a Lua na arca Maxim' }
    ]
  },
  {
    targetTitle: 'Hie Hie no Mi (Fruta do Gelo)',
    badgeTitle: 'Logia Criogênica',
    charId: 'kuzan-aokiji',
    valid: ['kuzan-aokiji'],
    clues: [
      { label: 'Ice Age', value: 'Capaz de congelar oceanos inteiros instantaneamente por semanas com o Ice Age' },
      { label: 'Bicicleta no Mar', value: 'Costuma passear sobre o mar pedalando em uma trilha fina de gelo congelado' },
      { label: 'Duelo de Punk Hazard', value: 'Disputou o posto de Almirante de Frota em um duelo mortal de 10 dias contra Akainu' }
    ]
  },
  {
    targetTitle: 'Magu Magu no Mi (Fruta do Magma)',
    badgeTitle: 'Logia de Maior Poder Ofensivo',
    charId: 'sakazuki-akainu',
    valid: ['sakazuki-akainu'],
    clues: [
      { label: 'Calor Queimador Supremo', value: 'Magma mais quente que o próprio fogo, capaz de queimar as chamas de Ace' },
      { label: 'Golpe Mortal', value: 'Responsável pelo golpe fatal que perfurou o peito de Portgas D. Ace em Marineford' },
      { label: 'Justiça Absoluta', value: 'Atual Almirante de Frota da Marinha que persegue piratas com crueldade inflexível' }
    ]
  },
  {
    targetTitle: 'Pika Pika no Mi (Fruta da Luz)',
    badgeTitle: 'Logia Fotônica',
    charId: 'borsalino-kizaru',
    valid: ['borsalino-kizaru'],
    clues: [
      { label: 'Velocidade da Luz', value: 'Permite mover-se e chutar na velocidade da luz perguntando: Você já foi chutado na velocidade da luz?' },
      { label: 'Espada de Luz', value: 'Materializa a espada sagrada Ama no Murakumo feita inteiramente de fótons' },
      { label: 'Espelho Yata no Kagami', value: 'Teletransporta-se em reflexos em zigue-zague para emboscar alvos instantaneamente' }
    ]
  },
  {
    targetTitle: 'Yami Yami no Mi (Fruta da Escuridão)',
    badgeTitle: 'Logia Singular de Gravidade e Trevas',
    charId: 'marshall-d-teach-barba-negra',
    valid: ['marshall-d-teach-barba-negra'],
    clues: [
      { label: 'Anulação de Akuma no Mi', value: 'Anula totalmente os poderes de qualquer outro usuário de fruta ao tocá-lo' },
      { label: 'Ausência de Intangibilidade', value: 'Ao contrário de outras Logias, absorve mais dano e dor física devido à gravidade' },
      { label: 'Assassinato de Thatch', value: 'Matou seu companheiro de tripulação na 4ª divisão de Barba Branca para roubá-la' }
    ]
  },
  {
    targetTitle: 'Mera Mera no Mi (Fruta do Fogo)',
    badgeTitle: 'Logia Ígnea Lendária',
    charId: 'portgas-d-ace',
    valid: ['portgas-d-ace', 'sabo'],
    clues: [
      { label: 'Sucessão de Irmãos', value: 'Pertenceu originalmente a Ace antes de ser herdada por Sabo no Coliseu Corrida' },
      { label: 'Técnica Hiken', value: 'Famosa técnica Punho de Fogo capaz de pulverizar armadas de navios com um golpe' },
      { label: 'Prêmio em Dressrosa', value: 'Colocada como prêmio principal do torneio de gladiadores por Donquixote Doflamingo' }
    ]
  },
  {
    targetTitle: 'Yuki Yuki no Mi (Fruta da Neve)',
    badgeTitle: 'Logia de Neve',
    charId: 'monet',
    valid: ['monet'],
    clues: [
      { label: 'Tempestades Gélidas', value: 'Transforma o corpo em neve macia e fria criando nevascas e monstros dentados' },
      { label: 'Aparência de Harpia', value: 'Usuária modificada por Law com asas e garras de pássaro no lugar de membros' },
      { label: 'Assistente de Caesar', value: 'Infiltrada como secretária leal a Doflamingo no laboratório de Punk Hazard' }
    ]
  },
  {
    targetTitle: 'Gasu Gasu no Mi (Fruta do Gás)',
    badgeTitle: 'Logia de Gases e Asfixia',
    charId: 'caesar-clown',
    valid: ['caesar-clown'],
    clues: [
      { label: 'Drenagem de Oxigênio', value: 'Remove instantaneamente todo o oxigênio ao redor asfixiando os inimigos' },
      { label: 'Cientista Louco', value: 'Especialista em armas químicas de destruição em massa como o Shinokuni' },
      { label: 'Arma Shinokuni', value: 'Gera um monstro venenoso que petrifica qualquer ser vivo com gás petrificante' }
    ]
  },
  {
    targetTitle: 'Numa Numa no Mi (Fruta do Pântano)',
    badgeTitle: 'Logia Lodosa',
    charId: 'caribou',
    valid: ['caribou'],
    clues: [
      { label: 'Pântano Sem Fundo', value: 'Armazena arsenais infinitos e pessoas dentro do lodo pantanoso de seu corpo' },
      { label: 'Segredo das Armas Ancestrais', value: 'Descobriu que Shirahoshi é Poseidon e que Pluton está lacrada em Wano' },
      { label: 'Infiltração no Navio', value: 'Trafegou escondido em um barril no Thousand Sunny rumo à Ilha dos Tritões' }
    ]
  },
  {
    targetTitle: 'Mori Mori no Mi (Fruta da Floresta)',
    badgeTitle: 'Logia Vegetal',
    charId: 'ryokugyu-aramaki',
    valid: ['ryokugyu-aramaki'],
    clues: [
      { label: 'Mãe de Toda a Vida', value: 'Gera florestas exuberantes e raízes gigantescas que drenam os nutrientes dos inimigos' },
      { label: 'Almirante Touro Verde', value: 'Almirante da Marinha que jejuou por 3 anos porque faz fotossíntese natural' },
      { label: 'Ataque a Wano', value: 'Invadiu Wano sozinho após a queda de Kaido, sendo contido pelo Haki de Shanks' }
    ]
  },
  {
    targetTitle: 'Susu Susu no Mi (Fruta da Fuligem)',
    badgeTitle: 'Logia de Fuligem e Fumaça Escura',
    charId: 'karasu',
    valid: ['karasu'],
    clues: [
      { label: 'Corvos de Fuligem', value: 'Divide seu corpo de fuligem em bandos de corvos voadores que transportam aliados' },
      { label: 'Comandante do Norte', value: 'Líder militar do Exército Revolucionário que usa uma máscara em formato de bico' },
      { label: 'Invasão a Mary Geoise', value: 'Lutou contra os Almirantes da Marinha Fujitora e Ryokugyu na Terra Sagrada' }
    ]
  },

  // Zoans Míticas e Ancestrais Lendárias
  {
    targetTitle: 'Tori Tori no Mi: Modelo Fênix',
    badgeTitle: 'Zoan Mítica Imortal',
    charId: 'marco',
    valid: ['marco'],
    clues: [
      { label: 'Chamas Azuis da Ressurreição', value: 'Fogo azul celestial que não queima, mas regenera ferimentos mortais instantaneamente' },
      { label: 'Primeiro Comandante', value: 'Braço direito de Edward Newgate e médico dos Piratas do Barba Branca' },
      { label: 'Bloqueio a Almirantes', value: 'Bloqueou o ataque de magma de Akainu e as rajadas de luz de Kizaru em Marineford' }
    ]
  },
  {
    targetTitle: 'Hito Hito no Mi: Modelo Daibutsu (Grande Buda)',
    badgeTitle: 'Zoan Mítica Dourada',
    charId: 'sengoku',
    valid: ['sengoku'],
    clues: [
      { label: 'Estátua de Ouro Maciço', value: 'Transforma-se em um imenso Buda de ouro reluzente de poder descomunal' },
      { label: 'Ondas de Choque', value: 'Dispara ondas de choque devastadoras a partir da palma de suas mãos' },
      { label: 'Ex-Almirante de Frota', value: 'Comandou as forças da Marinha durante a Guerra dos Maiorais em Marineford' }
    ]
  },
  {
    targetTitle: 'Uo Uo no Mi: Modelo Seiryu (Dragão Azul)',
    badgeTitle: 'Zoan Mítica dos Céus',
    charId: 'kaido',
    valid: ['kaido'],
    clues: [
      { label: 'Dragão Oriental Imperial', value: 'Transforma-se em um dragão celestial capaz de cuspir rajadas de fogo Boro Breath' },
      { label: 'Ilha Flutuante', value: 'Levantou a ilha inteira de Onigashima pelos céus usando nuvens de chamas (Homuragumo)' },
      { label: 'Criatura Mais Forte', value: 'Governava Wano e chefiava os Piratas das Feras antes de ser derrotado no magma' }
    ]
  },
  {
    targetTitle: 'Inu Inu no Mi: Modelo Okuchi no Makami (Lobo Divino)',
    badgeTitle: 'Zoan Mítica Guardiã',
    charId: 'yamato',
    valid: ['yamato'],
    clues: [
      { label: 'Divindade Guardiã de Wano', value: 'Transforma-se no lobo sagrado com poderes de gelo protetores' },
      { label: 'Defesa de Gelo', value: 'Namuji Hyoga: armadura e espelho de gelo que anula rajadas de chamas de Kaido' },
      { label: 'Herdeira de Oden', value: 'Filho de Kaido que se autoidentifica com o lendário samurai Kozuki Oden' }
    ]
  },
  {
    targetTitle: 'Hebi Hebi no Mi: Modelo Yamata no Orochi',
    badgeTitle: 'Zoan Mítica de Múltiplas Vidas',
    charId: 'kurozumi-orochi',
    valid: ['kurozumi-orochi'],
    clues: [
      { label: 'Oito Cabeças', value: 'Serpente mitológica de 8 cabeças que permite sobreviver a decapitações repetidas' },
      { label: 'Shogun Tirano', value: 'Xogum covarde de Wano que conspirou com Kaido para executar Kozuki Oden' },
      { label: 'Decapitação Final', value: 'Teve suas cabeças cortadas sucessivamente pelos Bainhas Vermelhas e por Denjiro' }
    ]
  },
  {
    targetTitle: 'Ryu Ryu no Mi: Modelo Pteranodonte',
    badgeTitle: 'Zoan Ancestral dos Céus',
    charId: 'king',
    valid: ['king'],
    clues: [
      { label: 'Voo Pré-Histórico', value: 'Puxa a crista para trás e dispara seu bico como uma catapulta supersônica' },
      { label: 'Linhagem Lunaria', value: 'Último sobrevivente dos Lunares, povo dos deuses que vivia sobre a Red Line' },
      { label: 'Chama nas Costas', value: 'Fogo nas costas que confere invulnerabilidade total a dano quando aceso' }
    ]
  },
  {
    targetTitle: 'Ryu Ryu no Mi: Modelo Braquiossauro',
    badgeTitle: 'Zoan Ancestral Mecânica',
    charId: 'queen',
    valid: ['queen'],
    clues: [
      { label: 'Pescoço Serpenteante', value: 'Separa o pescoço e cauda como uma anaconda mecânica deixando o torso como canhão' },
      { label: 'Cientista do MADS', value: 'Ex-colega de laboratório de Vegapunk e Judge especializado em vírus como o Ice Demon' },
      { label: 'Grande Astro das Feras', value: 'Comandante gordinho que adora dançar o funk da tripulação de Kaido' }
    ]
  },
  {
    targetTitle: 'Zou Zou no Mi: Modelo Mamute',
    badgeTitle: 'Zoan Ancestral de Destruição',
    charId: 'jack',
    valid: ['jack'],
    clues: [
      { label: 'Resistência Colossal', value: 'Mamute gigante de pele impenetrável que lutou por 5 dias seguidos em Zou' },
      { label: 'Origem Homem-Peixe', value: 'Meio homem-peixe que sobreviveu respirando no fundo do mar após ser naufragado por Zunesha' },
      { label: 'Alcunha da Seca', value: 'Conhecido como Jack a Seca porque por onde passa a terra fica estéril' }
    ]
  },
  {
    targetTitle: 'Ryu Ryu no Mi: Modelo Alossauro',
    badgeTitle: 'Zoan Ancestral Carnívora',
    charId: 'x-drake',
    valid: ['x-drake'],
    clues: [
      { label: 'Dinossauro Carnívoro', value: 'Transforma-se em um feroz carnívoro pré-histórico com mandíbulas esmagadoras' },
      { label: 'Capitão da SWORD', value: 'Agente infiltrado da força especial secreta da Marinha disfarçado de pirata' },
      { label: 'Líder dos Tobiroppo', value: 'Um dos Seis Voadores mais fortes da tripulação dos Piratas das Feras' }
    ]
  },
  {
    targetTitle: 'Ryu Ryu no Mi: Modelo Espinossauro',
    badgeTitle: 'Zoan Ancestral Aquática/Terrestre',
    charId: 'page-one',
    valid: ['page-one'],
    clues: [
      { label: 'Predador Feroz', value: 'Transforma-se em um espinossauro dotado de vela dorsal e cauda pesada' },
      { label: 'Irmão de Ulti', value: 'Irmão mais novo constantemente mimado e sufocado pelo afeto agressivo de Ulti' },
      { label: 'Confronto em Wano', value: 'Primeiro dinossauro a enfrentar o traje Raid Suit Stealth Black de Sanji' }
    ]
  },
  {
    targetTitle: 'Ryu Ryu no Mi: Modelo Paquicefalossauro',
    badgeTitle: 'Zoan Ancestral de Cabeçada',
    charId: 'ulti',
    valid: ['ulti'],
    clues: [
      { label: 'Crânio Blindado', value: 'Crânio denso reforçado capaz de desferir cabeçadas de força sísmica (Ul-Meteor)' },
      { label: 'Personalidade Volátil', value: 'Fala de forma insolente até mesmo com o Yonkou Kaido sem qualquer medo' },
      { label: 'Perseguição a Nami', value: 'Perseguiu furiosamente Nami e Usopp exigindo que admitissem que Luffy não seria rei' }
    ]
  },
  {
    targetTitle: 'Kumo Kumo no Mi: Modelo Rosamygale Grauvogeli',
    badgeTitle: 'Zoan Ancestral Aracnídea',
    charId: 'black-maria',
    valid: ['black-maria'],
    clues: [
      { label: 'Aranha Pré-Histórica', value: 'Transforma a metade inferior numa gigantesca aranha venenosa que cospe teias inflamáveis' },
      { label: 'Bordel de Onigashima', value: 'Comanda o pavilhão de cortesãs e torturou Sanji para atrair Nico Robin' },
      { label: 'Combate Feminino', value: 'Derrotada pelo golpe Demonio Fleur de Nico Robin em um duelo mortal' }
    ]
  },
  {
    targetTitle: 'Neko Neko no Mi: Modelo Tigre-Dentes-de-Sabre',
    badgeTitle: 'Zoan Ancestral Felina',
    charId: 'whos-who',
    valid: ['whos-who'],
    clues: [
      { label: 'Caninos Fatais', value: 'Felino ancestral com caninos gigantescos combinados com as técnicas do Rokushiki' },
      { label: 'Ex-Agente da CP9', value: 'Foi preso pelo Governo Mundial por ter deixado os piratas de Shanks roubarem a fruta Gomu Gomu' },
      { label: 'Rancor contra Jinbe', value: 'Derrotado pelo mestre de Karatê Homem-Peixe Jinbe após revelar a lenda de Nika' }
    ]
  },

  // Zoans Convencionais Clássicas
  {
    targetTitle: 'Hito Hito no Mi (Fruta do Humano)',
    badgeTitle: 'Zoan Humanoide',
    charId: 'tony-tony-chopper',
    valid: ['tony-tony-chopper'],
    clues: [
      { label: 'Inteligência Racional', value: 'Concedeu fala, raciocínio humano e capacidade médica a uma rena de nariz azul' },
      { label: 'Rumble Ball', value: 'Crias pílulas químicas que expandem as formas da Zoan para 7 pontos de transformação' },
      { label: 'Monster Point', value: 'Forma colossal descontrolada no passado, agora dominada por 30 minutos de combate' }
    ]
  },
  {
    targetTitle: 'Neko Neko no Mi: Modelo Leopardo',
    badgeTitle: 'Zoan Carnívora Feroz',
    charId: 'rob-lucci',
    valid: ['rob-lucci'],
    clues: [
      { label: 'Predador Assassino', value: 'Concede reflexos e ferocidade de leopardo amplificando o Rokushiki' },
      { label: 'Despertar com Chamas Negras', value: 'Alcançou o Despertar da Zoan mantendo a sanidade e ganhando nuvens negras nos ombros' },
      { label: 'Justiça Sombria', value: 'Líder dos assassinos da CP0 que jurou fidelidade aos Dragões Celestiais' }
    ]
  },
  {
    targetTitle: 'Ushi Ushi no Mi: Modelo Girafa',
    badgeTitle: 'Zoan Herbívora Herbácea',
    charId: 'kaku',
    valid: ['kaku'],
    clues: [
      { label: 'Pescoço Articulado', value: 'Transforma o usuário numa girafa capaz de retrair o pescoço como uma bala (Pasta Machine)' },
      { label: 'Quatro Espadas', value: 'Combina Rankyaku com duas espadas para criar a técnica do Estilo de Quatro Lâminas' },
      { label: 'Ex-Carpinteiro', value: 'Trabalhava na Galley-La inspecionando caravelas pulando de telhado em telhado' }
    ]
  },
  {
    targetTitle: 'Inu Inu no Mi: Modelo Lobo',
    badgeTitle: 'Zoan Carnívora',
    charId: 'jabra',
    valid: ['jabra'],
    clues: [
      { label: 'Lobo Predador', value: 'Permite mover-se e golpear com presas e garras com o Tekkai ativo em movimento (Tekkai Kenpo)' },
      { label: 'Rival de Lucci', value: 'Membro veterano da CP9 em Enies Lobby que mentiu fingindo ser irmão de Robin' },
      { label: 'Derrota com Diable Jambe', value: 'Primeiro inimigo a ser derrotado pelo chute flamejante Diable Jambe de Sanji' }
    ]
  },
  {
    targetTitle: 'Tori Tori no Mi: Modelo Falcão',
    badgeTitle: 'Zoan Aérea Protetora',
    charId: 'pell',
    valid: ['pell'],
    clues: [
      { label: 'Uma das 5 Voadoras', value: 'Uma das únicas cinco frutas conhecidas no mundo que conferem o dom do voo' },
      { label: 'Guardião de Alabasta', value: 'Guerreiro de elite que jurou proteger a princesa Vivi e o palácio de Alubarna' },
      { label: 'Sacrifício da Bomba', value: 'Carregou a bomba colossal de Crocodile pelos céus para salvar a capital' }
    ]
  },
  {
    targetTitle: 'Inu Inu no Mi: Modelo Chacal',
    badgeTitle: 'Zoan Protetora de Alabasta',
    charId: 'chaka',
    valid: ['chaka'],
    clues: [
      { label: 'Divindade Guardiã', value: 'Transforma-se em um chacal veloz empunhando sua espada com golpes cortantes' },
      { label: 'Comandante da Guarda Real', value: 'Liderou o exército de Alabasta junto com Pell na contenção da rebelião' },
      { label: 'Enfrentou Crocodile', value: 'Tentou impedir Crocodile de tomar o palácio real de Alabasta' }
    ]
  },
  {
    targetTitle: 'Ushi Ushi no Mi: Modelo Bisão',
    badgeTitle: 'Zoan Robusta',
    charId: 'dalton',
    valid: ['dalton'],
    clues: [
      { label: 'Carga com Chifres', value: 'Transforma-se em um bisão maciço armado com sua espada de duas pontas' },
      { label: 'Rei de Sakura', value: 'Ex-capitão da guarda que liderou o povo de Drum após a deposição do tirano Wapol' },
      { label: 'Coração Nobre', value: 'Foi salvo por Hiluluk e jurou proteger os cidadãos das doenças e tiranias' }
    ]
  },
  {
    targetTitle: 'Mogu Mogu no Mi (Fruta da Toupeira)',
    badgeTitle: 'Zoan Escavadora',
    charId: 'miss-merry-christmas',
    valid: ['miss-merry-christmas'],
    clues: [
      { label: 'Túneis Subterrâneos', value: 'Garras de toupeira que cavam túneis de alta velocidade sob a areia' },
      { label: 'Dupla com Mr. 4', value: 'Puxava inimigos pelos pés enquanto Mr. 4 os rebatia com um taco de 4 toneladas' },
      { label: 'Oficial Barulhenta', value: 'Oficial da Baroque Works que falava em ritmo alucinadamente acelerado' }
    ]
  },
  {
    targetTitle: 'Hebi Hebi no Mi: Modelo Anaconda',
    badgeTitle: 'Zoan Réptil',
    charId: 'boa-sandersonia',
    valid: ['boa-sandersonia'],
    clues: [
      { label: 'Corpo Serpenteante', value: 'Transforma-se em anaconda gigante com premonição de movimentos pelo Haki' },
      { label: 'Irmã da Imperatriz', value: 'Segunda irmã de Boa Hancock com cabelos verdes volumosos' },
      { label: 'Marca dos Dragões', value: 'Carrega a marca dos escravos de Mary Geoise escondida nas costas' }
    ]
  },
  {
    targetTitle: 'Hebi Hebi no Mi: Modelo Cobra Real',
    badgeTitle: 'Zoan Ofídica Venenosa',
    charId: 'boa-marigold',
    valid: ['boa-marigold'],
    clues: [
      { label: 'Respingo de Veneno', value: 'Cospe jatos de veneno letal e manipula fósforo em chamas sobre a cauda' },
      { label: 'Irmã Gorgon', value: 'Irmã mais nova de Hancock e usuária de Busoshoku Haki defensivo' },
      { label: 'Arena de Kuja', value: 'Lutou com Sandersonia contra Monkey D. Luffy na arena de Amazon Lily' }
    ]
  }
];

// Monta lista completa de One Piece
const opChallenges = opRaw.map((item, idx) => {
  const targetChar = opMap.get(item.charId) || item.charId;
  return {
    id: `exc-op-${idx + 1}-${item.charId}`,
    animeSlug: 'one-piece',
    category: 'Akuma no Mi',
    questionTitle: 'A quem pertence ou já pertenceu esta Akuma no Mi?',
    targetTitle: item.targetTitle,
    badgeTitle: item.badgeTitle,
    targetCharacterId: item.charId,
    targetCharacterName: targetChar,
    validCharacterIds: item.valid || [item.charId],
    clues: item.clues
  };
});

console.log('One Piece Akuma no Mi geradas:', opChallenges.length);

// Salva em arquivo auxiliar para conferência
fs.writeFileSync('scripts/op-challenges-out.json', JSON.stringify(opChallenges, null, 2), 'utf8');
