import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const SAO_CHARACTERS = [
  // Núcleo Principal & Aincrad
  {
    id: "kirito",
    name: "Kirito (Kazuto Kirigaya / O Espadachim Negro)",
    gender: "Masculino",
    affiliation: ["Cavaleiros do Juramento de Sangue", "Gatos Negros do Luar", "Jogadores Solo de Linha de Frente"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Dual Blades (Espadas Duplas: Elucidator & Dark Repulser)",
    debutArc: "Arco Aincrad (SAO)",
    status: "Vivo",
    quote: "Neste mundo, uma única espada pode te levar a qualquer lugar que você queira ir. Mesmo sendo um mundo virtual, eu me sinto mais vivo aqui do que na realidade.",
    techniques: ["Starburst Stream (16 Golpes)", "The Eclipse (27 Golpes)", "Aincrad Style: Sonic Leap", "Armament Full Control: Noite Estrelada"],
    wikiTitle: "Kirigaya Kazuto"
  },
  {
    id: "asuna",
    name: "Asuna (Asuna Yuuki / O Relâmpago / Deusa Stacia)",
    gender: "Feminino",
    affiliation: ["Cavaleiros do Juramento de Sangue (Sublíder)"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Florete (Rapier: Lambent Light) / Artes Sagradas Divinas",
    debutArc: "Arco Aincrad (SAO)",
    status: "Vivo",
    quote: "Eu não vou morrer, porque eu sou aquela que vai te proteger. Até o dia em que pudermos voltar juntos ao mundo real.",
    techniques: ["Linear", "Shooting Star", "Flashing Penetrator", "Mother's Rosario (Herdado de Yuuki)", "Criação Geográfica de Stacia"],
    wikiTitle: "Yuuki Asuna"
  },
  {
    id: "yui",
    name: "Yui (MHCP-0001 / Filha Adotiva)",
    gender: "Feminino",
    affiliation: ["Programa de Aconselhamento de Saúde Mental do Sistema Cardinal"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Navegação do Sistema & Acesso a Privilégios de Administrador",
    debutArc: "Arco Aincrad (SAO)",
    status: "IA Ativa",
    quote: "Papai! Mamãe! Eu finalmente encontrei o que estava procurando: corações humanos cheios de amor e esperança!",
    techniques: ["Objeto Imortal de Sistema", "Manipulação de Dados e Hack de Servidores", "Forma de Fada de Navegação Pixie"],
    wikiTitle: "Yui"
  },
  {
    id: "klein",
    name: "Klein (Ryoutarou Tsuboi)",
    gender: "Masculino",
    affiliation: ["Guilda Fuurinkazan (Líder)"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Katana (Estilo Samurai de Uma Mão)",
    debutArc: "Arco Aincrad (SAO)",
    status: "Vivo",
    quote: "Kirito! Prometa que não vai morrer lá na frente sozinho! A gente se vê no mundo real para tomar uma cerveja juntos!",
    techniques: ["Tsujikaze", "Gengetsu (Lua Ilusória)", "Hizaguruma", "Liderança Protetora Fuurinkazan"],
    wikiTitle: "Tsuboi Ryoutarou"
  },
  {
    id: "agil",
    name: "Agil (Andrew Gilbert Mills)",
    gender: "Masculino",
    affiliation: ["Comerciantes de Aincrad", "Dicey Cafe"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Machado de Duas Mãos & Escudo Pesado",
    debutArc: "Arco Aincrad (SAO)",
    status: "Vivo",
    quote: "Compre barato, venda caro, e apoie os jogadores de nível baixo a continuarem vivos.",
    techniques: ["Whirlwind", "Lumberjack Strike", "Negociação Mercantil de Itens Raros"],
    wikiTitle: "Andrew Gilbert Mills"
  },
  {
    id: "silica",
    name: "Silica (Keiko Ayano)",
    gender: "Feminino",
    affiliation: ["Domadora de Feras de Aincrad"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Adaga Curta & Cura com Dragão Emplumado Pina",
    debutArc: "Arco Aincrad (SAO)",
    status: "Vivo",
    quote: "Pina me salvou tantas vezes... eu vou ficar forte para nunca mais deixar nenhum amigo se perder!",
    techniques: ["Fad Edge", "Rapid Bite", "Hálito de Cura e Bolhas de Pina"],
    wikiTitle: "Ayano Keiko"
  },
  {
    id: "pina",
    name: "Pina",
    gender: "Feminino",
    affiliation: ["Mascote / Familiar de Silica"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Dragão Emplumado Alado de Suporte e Cura",
    debutArc: "Arco Aincrad (SAO)",
    status: "Vivo",
    quote: "Kyuu! (Solta uma rajada de penas luminosas restaurando HP)",
    techniques: ["Hálito de Restauração de HP", "Cegueira com Rajada de Bolhas", "Ressurreição com Flor de Pneuma"],
    wikiTitle: "Pina"
  },
  {
    id: "lisbeth",
    name: "Lisbeth (Rika Shinozaki)",
    gender: "Feminino",
    affiliation: ["Ferreira de Aincrad (48º Andar)"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Maça Pesada de Uma Mão & Ferraria Divina",
    debutArc: "Arco Aincrad (SAO)",
    status: "Vivo",
    quote: "Uma arma carrega o coração do ferreiro que a forjou! Dark Repulser foi feita para você nunca perder!",
    techniques: ["Forja de Minério Cristalino de Dragão", "Golpe Sísmico de Maça Pesada"],
    wikiTitle: "Shinozaki Rika"
  },
  {
    id: "sachi",
    name: "Sachi",
    gender: "Feminino",
    affiliation: ["Guilda Gatos Negros do Luar"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Lança Longa e Escudo Redondo",
    debutArc: "Arco Aincrad (SAO)",
    status: "Morto",
    quote: "Mesmo que eu morra, por favor continue vivendo, Kirito. Viva para ver o final deste mundo... Feliz Natal.",
    techniques: ["Estocada Defensiva de Lança", "Mensagem de Cristal Gravada"],
    wikiTitle: "Sachi"
  },
  {
    id: "keita",
    name: "Keita",
    gender: "Masculino",
    affiliation: ["Guilda Gatos Negros do Luar (Líder)"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Espada de Uma Mão e Escudo",
    debutArc: "Arco Aincrad (SAO)",
    status: "Morto",
    quote: "Nós íamos comprar uma casa no andar de baixo... Por que vocês entraram naquela sala da armadilha?!",
    techniques: ["Liderança de Guilda Colegial Amadora"],
    wikiTitle: "Keita"
  },
  {
    id: "heathcliff",
    name: "Heathcliff (Akihiko Kayaba)",
    gender: "Masculino",
    affiliation: ["Cavaleiros do Juramento de Sangue (Comandante)", "Criador do NerveGear e SAO"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Holy Sword (Espada Santa Liberator & Escudo Indestrutível)",
    debutArc: "Arco Aincrad (SAO)",
    status: "Morto",
    quote: "Naquele dia, quando criei este mundo flutuante de ferro e pedras... meu único sonho era desafiar as leis da realidade.",
    techniques: ["Objeto Imortal (Desativado no Clímax)", "Divine Sword", "Reflexos Perfeitos de Administrador do Sistema"],
    wikiTitle: "Kayaba Akihiko"
  },
  {
    id: "kuradeel",
    name: "Kuradeel",
    gender: "Masculino",
    affiliation: ["Cavaleiros do Juramento de Sangue", "Laughing Coffin (Caixão Risonho)"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Espada de Duas Mãos & Veneno Paralisante",
    debutArc: "Arco Aincrad (SAO)",
    status: "Morto",
    quote: "Neste mundo não existem leis da polícia! O sangue dos jogadores fracos é o meu combustível!",
    techniques: ["Água Paralisante Dissimulada", "Corte Assassino Desleal"],
    wikiTitle: "Kuradeel"
  },
  {
    id: "diabel",
    name: "Diabel (O Cavaleiro Nobre)",
    gender: "Masculino",
    affiliation: ["Líder da Primeira Raid de Chefe (1º Andar)", "Ex-Beta Tester"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Espada Longa de Cavaleiro e Escudo",
    debutArc: "Arco Aincrad (SAO)",
    status: "Morto",
    quote: "Derrotem o chefe do 1º andar... por favor, libertem todos deste jogo da morte!",
    techniques: ["Comando Tático de Raid de 44 Homens", "Investida de Cavaleiro Nobre"],
    wikiTitle: "Diabel"
  },
  {
    id: "kibaou",
    name: "Kibaou",
    gender: "Masculino",
    affiliation: ["Aincrad Liberation Squad (ALS / Exército)"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Espada Curta Curva e Escudo",
    debutArc: "Arco Aincrad (SAO)",
    status: "Vivo",
    quote: "Vocês, Beta Testers egoístas! Deixaram os novatos morrerem para ficarem com todos os itens bons!",
    techniques: ["Discursos Inflamados no Dialeto de Kansai", "Carga Militar do Exército de Aincrad"],
    wikiTitle: "Kibaou"
  },
  {
    id: "rosalia",
    name: "Rosalia",
    gender: "Feminino",
    affiliation: ["Guilda Laranja Assassina Titan's Hand (Líder)"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Lança Cruzada e Emboscadas Laranja",
    debutArc: "Arco Aincrad (SAO)",
    status: "Preso no Jogo",
    quote: "Qual o problema em matar jogadores verdes? Seus itens e cristais pertencem aos mais espertos!",
    techniques: ["Emboscada com Corredores Assassinos Laranja", "Espetada de Lança Cruzada"],
    wikiTitle: "Rosalia"
  },
  {
    id: "poh",
    name: "PoH (Prince of Hell / Vassago Casals)",
    gender: "Masculino",
    affiliation: ["Laughing Coffin (Fundador / Líder)", "Terrorista Mercenário"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Adaga Grande de Açougueiro (Mate Chopper)",
    debutArc: "Arco Aincrad (SAO)",
    status: "Morto",
    quote: "It's showtime! Vamos matar, esfaquear e rir enquanto o HP deles se esvai até zero!",
    techniques: ["Mate Chopper (Lâmina Voraz que Consome Recursos Espirituais)", "Invisibilidade com Manto de Camuflagem", "Incitação ao Ódio Coletivo Mental"],
    wikiTitle: "Vassago Casals"
  },
  {
    id: "red-eyed-xaxa",
    name: "Red-Eyed XaXa (Shoichi Shinkawa / Death Gun)",
    gender: "Masculino",
    affiliation: ["Laughing Coffin (Sublíder)", "GGO (Death Gun)"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Espada Curta Assassina e Veneno de Tarântula Negra",
    debutArc: "Arco Aincrad (SAO)",
    status: "Preso no Jogo",
    quote: "Nossos olhos vermelhos nunca se fecharão. O terror do Caixão Risonho ecoará para sempre!",
    techniques: ["Lâmina Oculta com Veneno Paralisante", "Disfarce Assassino Espectral"],
    wikiTitle: "Shinkawa Shouichi"
  },
  {
    id: "johnny-black",
    name: "Johnny Black (Atsushi Kanamoto)",
    gender: "Masculino",
    affiliation: ["Laughing Coffin", "Cúmplice de Death Gun"],
    origin: "Sword Art Online (Aincrad)",
    styleOrPower: "Kukri Duplo Envenenado & Succinylcholine (Mundo Real)",
    debutArc: "Arco Aincrad (SAO)",
    status: "Preso no Jogo",
    quote: "Mais um corte... e o veneno faz o coração parar de bater!",
    techniques: ["Ataque Furtivo com Foice Kukri Envenenada", "Injeção Letal de Toxina Paralisante"],
    wikiTitle: "Kanamoto Atsushi"
  },

  // Fairy Dance (ALfheim Online)
  {
    id: "leafa",
    name: "Leafa (Suguha Kirigaya / Deusa Terraria)",
    gender: "Feminino",
    affiliation: ["Raça Sylph (ALfheim Online)", "Irmã / Prima de Kirito"],
    origin: "ALfheim Online (ALO)",
    styleOrPower: "Katana de Vento & Magia de Regeneração Infinita Terraria",
    debutArc: "Arco Fairy Dance (ALO)",
    status: "Vivo",
    quote: "Mesmo que você esteja tão longe e ame outra pessoa... eu estarei voando ao seu lado no céu azul.",
    techniques: ["Voo Veloz com Asas de Fada Sylph", "Corte Tornado de Vento", "Regeneração Absoluta da Terra de Terraria"],
    wikiTitle: "Kirigaya Suguha"
  },
  {
    id: "recon",
    name: "Recon (Shinichi Nagata)",
    gender: "Masculino",
    affiliation: ["Raça Sylph (ALfheim Online)"],
    origin: "ALfheim Online (ALO)",
    styleOrPower: "Adaga e Magia de Camuflagem / Autodestruição",
    debutArc: "Arco Fairy Dance (ALO)",
    status: "Vivo",
    quote: "Leafa, eu vou abrir caminho para você mesmo que tenha que explodir todo o meu MP!",
    techniques: ["Feitiço de Autodestruição Sacrificial", "Magia Furtiva de Ilusão Óptica Sylph"],
    wikiTitle: "Nagata Shinichi"
  },
  {
    id: "sakuya",
    name: "Sakuya",
    gender: "Feminino",
    affiliation: ["Lorde Governadora dos Sylphs"],
    origin: "ALfheim Online (ALO)",
    styleOrPower: "Katana Longa e Alta Diplomacia Feérica",
    debutArc: "Arco Fairy Dance (ALO)",
    status: "Vivo",
    quote: "A aliança entre Sylphs e Cait Sith voará unida até o topo da Árvore do Mundo!",
    techniques: ["Magia de Vento em Área de Alto Nível", "Corte Gracioso de Espada Oriental"],
    wikiTitle: "Sakuya"
  },
  {
    id: "alicia-rue",
    name: "Alicia Rue",
    gender: "Feminino",
    affiliation: ["Lorde Governadora dos Cait Sith"],
    origin: "ALfheim Online (ALO)",
    styleOrPower: "Garras / Garras com Esporões e Domadora de Feras Aladas",
    debutArc: "Arco Fairy Dance (ALO)",
    status: "Vivo",
    quote: "Nenhum guerreiro Salamander assustará as garras dos nossos felinos voadores!",
    techniques: ["Agilidade Felina Alada", "Magia de Suporte em Grupo"],
    wikiTitle: "Alicia Rue"
  },
  {
    id: "eugene",
    name: "General Eugene",
    gender: "Masculino",
    affiliation: ["Líder Militar dos Salamanders"],
    origin: "ALfheim Online (ALO)",
    styleOrPower: "Demonic Sword Gram (Espada Etérea que Atravessa Armaduras)",
    debutArc: "Arco Fairy Dance (ALO)",
    status: "Vivo",
    quote: "A espada Gram ignora qualquer bloqueio de escudo ou lâmina! Renda-se, Spriggan!",
    techniques: ["Corte Intangível Fantasma com Gram", "Voo Pesado com Propulsão de Chamas Salamander"],
    wikiTitle: "Eugene"
  },
  {
    id: "oberon",
    name: "Oberon (Sugou Nobuyuki / O Rei das Fadas)",
    gender: "Masculino",
    affiliation: ["Diretor de Pesquisa da RCT", "Vilão de Fairy Dance"],
    origin: "ALfheim Online (ALO)",
    styleOrPower: "Comandos de Administrador & Manipulação Sensorial Nervosa",
    debutArc: "Arco Fairy Dance (ALO)",
    status: "Preso no Jogo",
    quote: "Neste mundo de fadas eu sou Deus! Eu posso alterar a dor, a memória e a vontade de qualquer um!",
    techniques: ["Comando de Gravidade Ilimitada de Administrador", "Manipulação Ilícita de Conexões Neurais"],
    wikiTitle: "Sugou Nobuyuki"
  },

  // Phantom Bullet (Gun Gale Online)
  {
    id: "sinon",
    name: "Sinon (Shino Asada / Deusa Solus)",
    gender: "Feminino",
    affiliation: ["Gun Gale Online (Sniper Top)", "Deusa Solus em Underworld"],
    origin: "Gun Gale Online (GGO)",
    styleOrPower: "Rifle Sniper Pesado Anti-Material (PGM Ultima Ratio Hecate II)",
    debutArc: "Arco Phantom Bullet (GGO)",
    status: "Vivo",
    quote: "Uma bala... um disparo no coração. Se eu conseguir superar meu medo da arma aqui, poderei viver no mundo real.",
    techniques: ["Disparo Preciso de Sniper a Quilômetros de Distância", "Pistola Automática MP7", "Voo Livre e Arco Solar de Solus"],
    wikiTitle: "Asada Shino"
  },
  {
    id: "death-gun",
    name: "Death Gun (Sterben / O Atirador Fantasma)",
    gender: "Masculino",
    affiliation: ["Irmãos Shinkawa & Johnny Black"],
    origin: "Gun Gale Online (GGO)",
    styleOrPower: "Rifle Silencioso L115A3 & Manto de Invisibilidade Óptica Metamaterial",
    debutArc: "Arco Phantom Bullet (GGO)",
    status: "Derrotado",
    quote: "Meu nome, e o nome desta arma... é Death Gun! Onde eu miro, a morte é real!",
    techniques: ["Camuflagem Óptica Invisível Total", "Estocada de Sabre de Baioneta Estelar", "Bala Rastreadora de Parada Cardíaca no Mundo Real"],
    wikiTitle: "Death Gun"
  },
  {
    id: "spiegel",
    name: "Spiegel (Kyouji Shinkawa)",
    gender: "Masculino",
    affiliation: ["Amigo de Shino em GGO", "Cúmplice de Death Gun"],
    origin: "Gun Gale Online (GGO)",
    styleOrPower: "Submetralhadora e Apoio Tático",
    debutArc: "Arco Phantom Bullet (GGO)",
    status: "Preso no Jogo",
    quote: "Shino-san... nós seremos renascidos juntos no mundo onde os fracos se tornam deuses!",
    techniques: ["Combate Tático com Armas Leves de GGO"],
    wikiTitle: "Shinkawa Kyouji"
  },

  // Mother's Rosario (Sleeping Knights)
  {
    id: "yuuki",
    name: "Yuuki (Yuuki Konno / Zekken / Espada Absoluta)",
    gender: "Feminino",
    affiliation: ["Guilda Sleeping Knights (Líder)"],
    origin: "ALfheim Online (ALO)",
    styleOrPower: "Espada de Uma Mão (Original Sword Skill de 11 Golpes: Mother's Rosario)",
    debutArc: "Arco Mother's Rosario",
    status: "Morto",
    quote: "Às vezes lutar com todas as forças é a única maneira de dizer o quanto você realmente se importa com alguém. Obrigada por me encontrar, Asuna!",
    techniques: ["Original Sword Skill: Mother's Rosario (11 Golpes Consecutivos)", "Velocidade de Reação Absoluta com Medicuboid"],
    wikiTitle: "Konno Yuuki"
  },
  {
    id: "siune",
    name: "Siune (An Si-eun)",
    gender: "Feminino",
    affiliation: ["Guilda Sleeping Knights (Sublíder)"],
    origin: "ALfheim Online (ALO)",
    styleOrPower: "Maga de Suporte e Cura Undine",
    debutArc: "Arco Mother's Rosario",
    status: "Vivo",
    quote: "Nós queríamos gravar nossos nomes no Monumento dos Espadachins antes de partirmos deste mundo.",
    techniques: ["Magia de Alta Regeneração Aquática Undine"],
    wikiTitle: "Siune"
  },

  // Ordinal Scale
  {
    id: "eiji",
    name: "Eiji (Eiji Nochizawa / Nautilus)",
    gender: "Masculino",
    affiliation: ["Ex-Cavaleiros do Juramento de Sangue", "Ordinal Scale (Rank 2)"],
    origin: "Mundo Real / Ordinal Scale",
    styleOrPower: "Espada Curta & Exoesqueleto de AR de Alta Potência",
    debutArc: "Arco Ordinal Scale",
    status: "Vivo",
    quote: "Em Aincrad eu congelei de medo e deixei a Yuna morrer... Desta vez eu vou lutar até recuperar todas as memórias dela!",
    techniques: ["Acrobacias Amplificadas pelo Traje Augma", "Esgrima Veloz de Realidade Aumentada"],
    wikiTitle: "Nochizawa Eiji"
  },
  {
    id: "yuna",
    name: "Yuna (Shigemura Yuuna)",
    gender: "Feminino",
    affiliation: ["Idol de Realidade Aumentada de Ordinal Scale"],
    origin: "Mundo Real / Ordinal Scale",
    styleOrPower: "Canto de Bônus de AR e IA Espectral",
    debutArc: "Arco Ordinal Scale",
    status: "Morto",
    quote: "Vamos cantar juntos para que todas as nossas memórias brilhem no palco!",
    techniques: ["Buffs de Canção de Batalha de Realidade Aumentada", "Manifestação Holográfica Musical"],
    wikiTitle: "Shigemura Yuuna"
  },

  // Alicization (Underworld / Cavaleiros da Integridade)
  {
    id: "eugeo",
    name: "Eugeo (Cavaleiro da Rosa Azul)",
    gender: "Masculino",
    affiliation: ["Cortador de Madeira Sagrada de Rulid", "Academia de Espadachins", "Cavaleiro da Integridade Provisório"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Espada da Rosa Azul (Blue Rose Sword) / Estilo Aincrad",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Morto",
    quote: "Fique calmo, Kirito. Meu coração... a minha Rosa Azul sempre florescerá ao seu lado.",
    techniques: ["Armament Full Control: Congelamento da Rosa Azul", "Florescer Glacial Sagrado", "Espada Vermelha Sangue de Fusão com Kirito"],
    wikiTitle: "Eugeo"
  },
  {
    id: "alice-zuberg",
    name: "Alice Zuberg (Alice Synthesis Thirty)",
    gender: "Feminino",
    affiliation: ["Igreja do Axioma (Cavaleira da Integridade)", "Herdeira da Vontade Humana"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Espada do Osmanthus Dourado (Fragrant Olive Sword)",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Vivo",
    quote: "Eu não sou uma marionete sem alma da Catedral Central! Eu sou Alice, e lutarei para salvar os povos do Reino Humano!",
    techniques: ["Armament Full Control: Enxame de Pétalas Douradas Lacerantes", "Artes Sagradas Elementais de Luz", "Dança das Lâminas de Osmanthus"],
    wikiTitle: "Alice Zuberg"
  },
  {
    id: "bercouli",
    name: "Bercouli Synthesis One",
    gender: "Masculino",
    affiliation: ["Cavaleiros da Integridade (Comandante Supremo Lendário)"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Espada do Corte Temporal (Time Splitting Sword)",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Morto",
    quote: "Garoto, uma espada que corta o passado e o futuro não perdoa nem a sombra dos deuses!",
    techniques: ["Armament Full Control: Corte do Vazio Passado no Tempo", "Urashagiri (Corte Temporal Retrógrado)"],
    wikiTitle: "Bercouli Synthesis One"
  },
  {
    id: "fanatio",
    name: "Fanatio Synthesis Two",
    gender: "Feminino",
    affiliation: ["Cavaleiros da Integridade (Vice-Comandante)"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Heaven Piercing Sword (Espada Refletora de Luz Solar)",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Vivo",
    quote: "Bercouli-sama... Eu lutei com todo o meu orgulho para refletir a luz da sua honra!",
    techniques: ["Armament Full Control: Raios de Luz Térmica Laser Concentrados", "Reflexão Múltipla de Lâminas Solares"],
    wikiTitle: "Fanatio Synthesis Two"
  },
  {
    id: "deusolbert",
    name: "Deusolbert Synthesis Seven",
    gender: "Masculino",
    affiliation: ["Cavaleiros da Integridade"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Arco Conflagrado Flamejante (Conflagrant Flame Bow)",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Vivo",
    quote: "Minhas flechas incandescentes queimarão qualquer invasor do Dark Territory!",
    techniques: ["Armament Full Control: Disparos de Flechas Incandescentes de Pássaro de Fogo"],
    wikiTitle: "Deusolbert Synthesis Seven"
  },
  {
    id: "eldrie",
    name: "Eldrie Synthesis Thirty-One",
    gender: "Masculino",
    affiliation: ["Cavaleiros da Integridade (Discípulo de Alice)"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Frost Scale Whip (Chicote da Serpente Glacial)",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Morto",
    quote: "Mestra Alice... Eu nunca permitirei que esses monstros toquem um único fio dos seus cabelos dourados!",
    techniques: ["Armament Full Control: Chicote Metamorfo em Cobras Glaciais Múltiplas", "Sacrifício Espiritual com Fios de Vida"],
    wikiTitle: "Eldrie Woolsburg"
  },
  {
    id: "sheyta",
    name: "Sheyta Synthesis Twelve (A Cavaleira Silenciosa)",
    gender: "Feminino",
    affiliation: ["Cavaleiros da Integridade"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Black Lily Sword (Espada do Lírio Negro de Espessura Zero)",
    debutArc: "Arco War of Underworld",
    status: "Vivo",
    quote: "...Tudo o que eu quero... é cortar. Mas agora quero cortar ao lado do líder dos pugilistas.",
    techniques: ["Armament Full Control: Lâmina de Fio Zero que Corta Qualquer Matéria"],
    wikiTitle: "Sheyta Synthesis Twelve"
  },
  {
    id: "linel",
    name: "Linel Synthesis Twenty-Eight",
    gender: "Feminino",
    affiliation: ["Catedral Central (Irmãs Assassinas da Igreja do Axioma)"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Adaga Envenenada com Óleo de Paralisia de Rubil",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Vivo",
    quote: "Fizel e eu nos matamos dezenas de vezes nos experimentos de Administrator para sermos perfeitas!",
    techniques: ["Golpe Furtivo Paralisante com Adaga Untada"],
    wikiTitle: "Linel Synthesis Twenty-Eight"
  },
  {
    id: "fizel",
    name: "Fizel Synthesis Twenty-Nine",
    gender: "Feminino",
    affiliation: ["Catedral Central (Irmãs Assassinas da Igreja do Axioma)"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Adaga Envenenada com Óleo de Paralisia de Rubil",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Vivo",
    quote: "Irmã Linel, vamos pedir novos doces para Administrator depois de congelar esses invasores!",
    techniques: ["Golpe Furtivo Paralisante com Adaga Untada"],
    wikiTitle: "Fizel Synthesis Twenty-Nine"
  },
  {
    id: "quinella",
    name: "Quinella (Administrator / Pontífice Suprema)",
    gender: "Feminino",
    affiliation: ["Igreja do Axioma (Governante Absoluta do Underworld)"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Manipulação Total do Código do Sistema Cardinal & Espada de Prata",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Morto",
    quote: "Eu sou o próprio mundo. Eu sou a soberana eterna que congelará o tempo para que a humanidade nunca mude.",
    techniques: ["Golems Gigantes de Espadas Humanas (Sword Golem)", "Manipulação de Módulos de Fluctlight e Memórias", "Artes Sagradas Absolutas"],
    wikiTitle: "Quinella"
  },
  {
    id: "cardinal",
    name: "Cardinal (Lyceris / Sub-Processo do Sistema)",
    gender: "Feminino",
    affiliation: ["Biblioteca da Grande Catedral"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Sub-Processo de Verificação de Erros do Sistema Cardinal",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Morto",
    quote: "Kirito, Eugeo... Salvem este mundo da insanidade de Quinella antes que o Dark Territory invada tudo.",
    techniques: ["Artes Sagradas Primordiais de Espaço e Cura", "Criação de Portais na Biblioteca Infinita"],
    wikiTitle: "Cardinal"
  },
  {
    id: "selka-zuberg",
    name: "Selka Zuberg",
    gender: "Feminino",
    affiliation: ["Igreja da Vila Rulid (Irmã de Alice)"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Artes Sagradas de Cura e Aprendiz de Freira",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Vivo",
    quote: "Minha irmã Alice foi levada pelos cavaleiros há anos... Eu aprendi artes sagradas para poder reencontrá-la.",
    techniques: ["Artes Sagradas de Cura de Ferimentos Graves"],
    wikiTitle: "Selka Zuberg"
  },
  {
    id: "sortiliena-serlut",
    name: "Sortiliena Serlut (Liena-senpai)",
    gender: "Feminino",
    affiliation: ["Academia de Espadachins Imperiais (Mestra de Kirito)"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Chicote de Couro e Espada Flexível Serlut",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Vivo",
    quote: "Kirito, você me mostrou que a força de uma espada vem da imaginação e do espírito inquebrável.",
    techniques: ["Estilo de Espada Flexível da Família Serlut"],
    wikiTitle: "Sortiliena Serlut"
  },
  {
    id: "ronie-arabel",
    name: "Ronie Arabel",
    gender: "Feminino",
    affiliation: ["Academia de Espadachins (Pajem de Kirito)"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Espada Longa e Artes Sagradas de Fogo",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Vivo",
    quote: "Kirito-senpai! Eu e Tiese vamos cuidar de você e protegê-lo até sua consciência despertar!",
    techniques: ["Artes Sagradas Elementais Térmicas", "Espada Básica de Cavalaria"],
    wikiTitle: "Ronie Arabel"
  },
  {
    id: "tiese-shtolienen",
    name: "Tiese Shtolienen",
    gender: "Feminino",
    affiliation: ["Academia de Espadachins (Pajem de Eugeo)"],
    origin: "Underworld (Alicization)",
    styleOrPower: "Espada Longa e Artes Sagradas de Gelo",
    debutArc: "Arco Alicization (Human Realm)",
    status: "Vivo",
    quote: "Eugeo-senpai... por favor retorne são e salvo para mim!",
    techniques: ["Artes Sagradas Elementais Glaciais", "Guarda da Espada da Rosa Azul"],
    wikiTitle: "Tiese Shtolienen"
  },

  // Dark Territory & Invasores
  {
    id: "gabriel-miller",
    name: "Gabriel Miller (Subtilizer / Imperador Vecta)",
    gender: "Masculino",
    affiliation: ["Glowgen Defense Systems (Líder Mercenário)", "Imperador do Dark Territory"],
    origin: "Mundo Real / Underworld",
    styleOrPower: "Vazio da Alma / Aniquilação Espiritual Sem Forma",
    debutArc: "Arco War of Underworld",
    status: "Morto",
    quote: "Sua alma... o sabor da sua alma é a única coisa que pode preencher o vazio infinito do meu peito!",
    techniques: ["Devoração Espiritual de Fluctlights", "Comandos do Deus da Escuridão Vecta", "Forma Angelical do Vazio Infinito"],
    wikiTitle: "Gabriel Miller"
  },
  {
    id: "iskahn",
    name: "Iskahn",
    gender: "Masculino",
    affiliation: ["Guilda dos Pugilistas do Dark Territory (Campeão Geral)"],
    origin: "Underworld (Dark Territory)",
    styleOrPower: "Punhos Desarmados Infundidos com Força Espiritual Incandescente",
    debutArc: "Arco War of Underworld",
    status: "Vivo",
    quote: "Nós, pugilistas, não lutamos com truques covardes! Punho contra punho, e os verdadeiros homens se entendem no sangue!",
    techniques: ["Punhos Incandescentes Esmagadores de Rochas", "Artes Marciais do Dark Territory"],
    wikiTitle: "Iskahn"
  },
  {
    id: "shasta",
    name: "Shasta",
    gender: "Masculino",
    affiliation: ["Cavaleiros das Trevas do Dark Territory (Comandante Supremo)"],
    origin: "Underworld (Dark Territory)",
    styleOrPower: "Espada do Tufão das Sombras (Vontade Pacifista)",
    debutArc: "Arco War of Underworld",
    status: "Morto",
    quote: "Lipia... eu juro que vou trazer paz entre o Dark Territory e o Reino Humano!",
    techniques: ["Tornado de Vontade Espiritual Pura do Cavaleiro das Trevas"],
    wikiTitle: "Shasta"
  },
  {
    id: "seijirou-kikuoka",
    name: "Seijirou Kikuoka (Chrysheight)",
    gender: "Masculino",
    affiliation: ["Ministério de Assuntos Internos / Rath (Projeto Alicization)"],
    origin: "Mundo Real",
    styleOrPower: "Inteligência Estratégica Governamental & Mago Sylph em ALO",
    debutArc: "Arco Aincrad (SAO)",
    status: "Vivo",
    quote: "Kazuto-kun, o futuro da inteligência artificial e da segurança militar do Japão depende do Underworld.",
    techniques: ["Coordenação e Recursos Estratégicos da Rath Ocean Turtle"],
    wikiTitle: "Kikuoka Seijirou"
  }
];

const wikiHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://swordartonline.fandom.com/'
};

async function fetchWikiThumbnail(title) {
  const url = `https://swordartonline.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=600&format=json&redirects=1`;
  try {
    const res = await fetch(url, { headers: wikiHeaders });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (e) {
    console.error(`Erro ao buscar wiki "${title}":`, e.message);
    return null;
  }
}

async function processAvatar(buffer, outputPath) {
  const img = sharp(buffer);
  const meta = await img.metadata();
  const w = meta.width;
  const h = meta.height;

  let left, top, size;
  if (w > h) {
    size = h;
    left = Math.round((w - h) / 2);
    top = 0;
  } else {
    size = Math.min(w, h);
    left = 0;
    top = Math.round((h - size) * 0.12);
  }

  await sharp(buffer)
    .extract({ left, top, width: size, height: size })
    .resize(240, 240, { fit: 'cover' })
    .png({ quality: 95 })
    .toFile(outputPath);
}

async function run() {
  const outDir = path.resolve('public/avatars/sword-art-online');
  const jsonDir = path.resolve('src/data/animes/sword-art-online');
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(jsonDir, { recursive: true });

  const finalChars = [];
  console.log(`Processing ${SAO_CHARACTERS.length} Sword Art Online characters...`);

  for (let i = 0; i < SAO_CHARACTERS.length; i++) {
    const c = SAO_CHARACTERS[i];
    const outPath = path.join(outDir, `${c.id}.png`);
    const avatarRelative = `/avatars/sword-art-online/${c.id}.png`;

    finalChars.push({
      id: c.id,
      name: c.name,
      gender: c.gender,
      affiliation: c.affiliation,
      origin: c.origin,
      styleOrPower: c.styleOrPower,
      debutArc: c.debutArc,
      status: c.status,
      quote: c.quote,
      techniques: c.techniques,
      avatar: avatarRelative
    });

    if (fs.existsSync(outPath)) {
      console.log(`[${i+1}/${SAO_CHARACTERS.length}] ${c.name} -> already exists.`);
      continue;
    }

    const wikiTitle = c.wikiTitle || c.name;
    const thumbUrl = await fetchWikiThumbnail(wikiTitle);
    if (thumbUrl) {
      try {
        const res = await fetch(thumbUrl, { headers: wikiHeaders });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAvatar(buf, outPath);
        console.log(`[${i+1}/${SAO_CHARACTERS.length}] ${c.name} -> saved.`);
      } catch (err) {
        console.error(`Error saving ${c.name}:`, err.message);
      }
    } else {
      console.warn(`[${i+1}/${SAO_CHARACTERS.length}] ${c.name} -> No thumb found for ${wikiTitle}`);
    }
  }

  const jsonPath = path.join(jsonDir, 'characters.json');
  fs.writeFileSync(jsonPath, JSON.stringify(finalChars, null, 2), 'utf8');
  console.log(`Wrote ${finalChars.length} characters to ${jsonPath}`);
}

run();
