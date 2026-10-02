import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const OPM_CHARACTERS = [
  // Heróis Classe S & Protagonista
  {
    id: "saitama",
    name: "Saitama",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Grupo de Saitama"],
    rankOrThreat: "Classe A (Ex-Classe B)",
    fightingStyle: "Força Sobre-humana Ilimitada",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Vivo",
    quote: "Eu sou apenas um cara que é herói por diversão.",
    techniques: ["Soco Normal", "Socos Normais Consecutivos", "Série Séria: Soco Sério", "Espirro Sério Cósmico"],
    wikiTitle: "Saitama"
  },
  {
    id: "blast",
    name: "Blast",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe S (Rank 1)",
    fightingStyle: "Manipulação Espaço-Temporal & Portais Dimensionais",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Não espere que alguém venha te salvar. Quando a hora chegar, você mesmo terá que se proteger.",
    techniques: ["Portais Dimensionais Cósmicos", "Canhão Gravitacional", "Manipulação de Espaço-Tempo"],
    wikiTitle: "Blast"
  },
  {
    id: "tatsumaki",
    name: "Tatsumaki (Tornado do Terror)",
    gender: "Feminino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe S (Rank 2)",
    fightingStyle: "Poder Psíquico / Esper",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Vocês da Classe S são todos patéticos. Se eu não fizer tudo sozinha, nada se resolve.",
    techniques: ["Psicocinese Suprema", "Barreira Telecinética Absoluta", "Torção Psíquica Continental", "Chuva de Meteoros Psíquica"],
    wikiTitle: "Tatsumaki"
  },
  {
    id: "bang",
    name: "Bang (Silver Fang)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Dojô do Punho da Água Corrente"],
    rankOrThreat: "Classe S (Rank 3)",
    fightingStyle: "Artes Marciais (Punho da Água Corrente Esmagadora de Pedras)",
    debutArc: "Arco do Exame de Heróis & Meteoro",
    status: "Vivo",
    quote: "A juventude é impetuosa, mas a água que flui pelas pedras nunca se cansa de polir seus limites.",
    techniques: ["Punho da Água Corrente Esmagadora de Pedras", "Presa Instantânea da Água Viva", "Punho Cruzado da Fenda do Dragão (com Bomb)"],
    wikiTitle: "Bang"
  },
  {
    id: "atomic-samurai",
    name: "Atomic Samurai (Kamikaze)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Conselho de Espadachins"],
    rankOrThreat: "Classe S (Rank 4)",
    fightingStyle: "Esgrima Suprema (Kenjutsu)",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Eu só reconheço os fortes. Se quer meu respeito, me mostre do que sua espada é capaz!",
    techniques: ["Corte Atômico (Atomic Slash)", "Corte Atômico Behemoth", "Espada Solar Sun Blade"],
    wikiTitle: "Kamikaze"
  },
  {
    id: "child-emperor",
    name: "Child Emperor (Isamu)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Ex-Assistente de Bofoi"],
    rankOrThreat: "Classe S (Rank 5)",
    fightingStyle: "Cibernética / Tecnologia / Intelecto Genial",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "A idade não define inteligência nem liderança tática em combate.",
    techniques: ["Mochila Escolar Multifuncional", "Robô Mecha Brave Giant", "Cão Rastreador Tecnológico", "Canhão do Milênio 1000x"],
    wikiTitle: "Child_Emperor"
  },
  {
    id: "metal-knight",
    name: "Metal Knight (Dr. Bofoi)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe S (Rank 6)",
    fightingStyle: "Cibernética / Armamento Pesado / Drones Remotos",
    debutArc: "Arco do Exame de Heróis & Meteoro",
    status: "Vivo",
    quote: "A segurança da humanidade não depende de sentimentos, e sim de superioridade bélica absoluta.",
    techniques: ["Robô Autônomo de Guerra Bofoi", "Mísseis de Fusão Termonuclear", "Drones de Reconstrução Instantânea da Cidade A"],
    wikiTitle: "Bofoi"
  },
  {
    id: "king",
    name: "King (O Homem Mais Forte da Terra)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Grupo de Saitama"],
    rankOrThreat: "Classe S (Rank 7)",
    fightingStyle: "Presença Intimidatória / Sorte Suprema",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Dizem que o King Engine ruge antes da batalha... mas na verdade é só meu coração quase explodindo de pavor!",
    techniques: ["Rugido do Motor King (King Engine)", "Canhão da Chama do Purgatório do Rei (Blefe)", "Habilidade Suprema em Videogames"],
    wikiTitle: "King"
  },
  {
    id: "zombieman",
    name: "Zombieman",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Ex-Cobaia da Casa da Evolução"],
    rankOrThreat: "Classe S (Rank 8)",
    fightingStyle: "Regeneração Celular Absoluta & Armamento Balístico",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Eu não posso morrer. Não importa quantas vezes me façam em pedaços, eu sempre volto para acabar com a luta.",
    techniques: ["Regeneração Imortal Infinita", "Canhão Desert Eagle Customizado", "Cutelo de Machete de Titânio", "Guerra de Atrito Biológica"],
    wikiTitle: "Zombieman"
  },
  {
    id: "drive-knight",
    name: "Drive Knight (Cavaleiro Mecânico)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe S (Rank 9)",
    fightingStyle: "Cibernética / Transformação Tática (Shogi Box)",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Cuidado com Metal Knight. Ele é o verdadeiro inimigo.",
    techniques: ["Transformação Tática: Torre (Rook)", "Transformação Tática: Cavalo (Knight)", "Transformação Tática: Ouro (Gold)", "Lança de Energia Térmica"],
    wikiTitle: "Drive_Knight"
  },
  {
    id: "pig-god",
    name: "Pig God (Deus Porco)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe S (Rank 10)",
    fightingStyle: "Digestão Absoluta & Força Corporal Massiva",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Mastigar, devorar e proteger meus companheiros. Meu estômago cuida de qualquer veneno.",
    techniques: ["Devoração Rápida de Monstros", "Resistência Extrema a Toxinas Digestivas", "Ataque Secreto Final (Armazenado)"],
    wikiTitle: "Pig_God"
  },
  {
    id: "superalloy-darkshine",
    name: "Superalloy Darkshine",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe S (Rank 11)",
    fightingStyle: "Músculos Impenetráveis & Fisiculturismo",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Meus músculos blindados refletem qualquer golpe com o brilho da perfeição!",
    techniques: ["Superalloy Bazooka", "Superalloy Double Bazooka", "Armadura Muscular Cintilante"],
    wikiTitle: "Superalloy_Darkshine"
  },
  {
    id: "watchdog-man",
    name: "Watchdog Man (Homem Cão de Guarda)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Protetor da Cidade Q"],
    rankOrThreat: "Classe S (Rank 12)",
    fightingStyle: "Combate Quadrúpede Feral & Força Animal",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "A Cidade Q está sob minha guarda. Nenhum monstro sai daqui com vida.",
    techniques: ["Ataque Canino Quádruplo Veloz", "Patada Esmagadora Feral", "Esquiva Instintiva de Predador"],
    wikiTitle: "Watchdog_Man"
  },
  {
    id: "flashy-flash",
    name: "Flashy Flash (Flash Veloz)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Vila Ninja (44ª Turma)"],
    rankOrThreat: "Classe S (Rank 13)",
    fightingStyle: "Ninjutsu da Vila Ninja & Velocidade da Luz",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Treinar até que seus movimentos fiquem além do alcance da percepção humana: esse é o caminho ninja.",
    techniques: ["Flashy Slash (Corte Luzente)", "Punhos Meteóricos da Velocidade da Luz", "Técnica Ninja da Vila Oculta: Passos Fluídos"],
    wikiTitle: "Flashy_Flash"
  },
  {
    id: "genos",
    name: "Genos (Cyborg Demoníaco)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Grupo de Saitama"],
    rankOrThreat: "Classe S (Rank 14)",
    fightingStyle: "Cibernética / Incineração / Armamento de Combate",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Vivo",
    quote: "Sensei Saitama, por favor, me ensine o segredo da sua força sobre-humana!",
    techniques: ["Canhão de Incineração", "Metralhadora de Golpes de Aço", "Modo Espada de Alta Voltagem", "Núcleo de Fusão Explosivo"],
    wikiTitle: "Genos"
  },
  {
    id: "metal-bat",
    name: "Metal Bat (Bad / Bastão de Metal)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe S (Rank 15)",
    fightingStyle: "Espírito de Luta Ilimitado & Bastão Indestrutível",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Enquanto eu tiver meu espírito de luta e uma promessa feita pra minha irmã Zenko, eu nunca caio!",
    techniques: ["Balanço de Dragão Selvagem", "Tornado do Furacão com Bastão", "Ressonância do Espírito de Luta"],
    wikiTitle: "Bad"
  },
  {
    id: "tanktop-master",
    name: "Tanktop Master (Mestre de Regata)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Exército Tanktop"],
    rankOrThreat: "Classe S (Rank 16)",
    fightingStyle: "Força Muscular Pura do Poder da Regata",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "A regata não é apenas uma peça de roupa... ela é a personificação da liberdade e força muscular!",
    techniques: ["Tanktop Punch", "Tanktop Tackle", "Arremesso de Poste Teleférico Tanktop"],
    wikiTitle: "Tanktop_Master"
  },
  {
    id: "puri-puri-prisoner",
    name: "Puri-Puri Prisoner",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Prisão Smelly Lid"],
    rankOrThreat: "Classe S (Rank 17)",
    fightingStyle: "Amor Apaixonado & Fisiologia Angelical Extrema",
    debutArc: "Arco do Rei dos Mares Profundos",
    status: "Vivo",
    quote: "O amor verdadeiro quebra qualquer corrente e supera qualquer dor monstruosa!",
    techniques: ["Angel Rush (Investida Angelical)", "Angel Dash", "Abraço do Amor Profundo", "Evolução do Amor Ceroulas"],
    wikiTitle: "Puri-Puri_Prisoner"
  },

  // Heróis Classe A
  {
    id: "amai-mask",
    name: "Amai Mask (Sweet Mask)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 1)",
    fightingStyle: "Artes Marciais Híbridas & Fisiologia Monstruosa Oculta",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Um herói deve ser belo, impecável e absolutamente impiedoso contra o mal!",
    techniques: ["Golpes Mortais Perfurantes de Mãos Vazias", "Regeneração Monstruosa Acelerada", "Chute Cortante Facial"],
    wikiTitle: "Sweet_Mask"
  },
  {
    id: "iaian",
    name: "Iaian",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Discípulos de Atomic Samurai"],
    rankOrThreat: "Classe A (Rank 2)",
    fightingStyle: "Esgrima Iaijutsu (Saque Rápido)",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Mestre Kamikaze confiou em nós para representar o espírito da lâmina!",
    techniques: ["Saque Rápido com Katana Única", "Corte Retalhador Espelhado", "Postura Defensiva do Espadachim de Aço"],
    wikiTitle: "Iaian"
  },
  {
    id: "okamaitachi",
    name: "Okamaitachi",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Discípulos de Atomic Samurai"],
    rankOrThreat: "Classe A (Rank 3)",
    fightingStyle: "Lâminas Eólicas Cortantes",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "A lâmina de uma donzela cortará até a brisa mais graciosa!",
    techniques: ["Corte de Ar Kamaitachi", "Dança das Pétalas Afiadas", "Espada Voadora Eólica"],
    wikiTitle: "Okamaitachi"
  },
  {
    id: "bushidrill",
    name: "Bushidrill",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Discípulos de Atomic Samurai"],
    rankOrThreat: "Classe A (Rank 4)",
    fightingStyle: "Lança Perfuradora Espiral / Broca",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Nenhuma carapaça monstruosa resiste à broca do espírito bushidô!",
    techniques: ["Perfuração Furiosa de Broca", "Espiral de Diamante", "Investida Rotatória Terrestre"],
    wikiTitle: "Bushidrill"
  },
  {
    id: "heavy-tank-fundoshi",
    name: "Heavy Tank Fundoshi",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 5)",
    fightingStyle: "Força Bruta Pesada de Fundoshi",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Meu fundoshi e minha tonelagem esmagam qualquer delinquente!",
    techniques: ["Soco Blindado Fundoshi", "Arremesso Sísmico de Peso Máximo"],
    wikiTitle: "Heavy_Tank_Fundoshi"
  },
  {
    id: "blue-fire",
    name: "Blue Fire",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 6)",
    fightingStyle: "Lança-Chamas Oculto nas Mangas",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Chamas azuis purificam os criminosos que ousam desafiar a Associação!",
    techniques: ["Rajada de Fogo Azul Oculta", "Incêndio Concentrado de Manga"],
    wikiTitle: "Blue_Fire"
  },
  {
    id: "magic-trick-man",
    name: "Magic Trick Man",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 7)",
    fightingStyle: "Ilusionismo e Cartas Afiadas Cortantes",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Para o meu próximo truque, farei o monstro desaparecer em pedaços!",
    techniques: ["Baralho de Lâminas Arremessáveis", "Ilusão de Fumaça com Cartola"],
    wikiTitle: "Magic_Trick_Man"
  },
  {
    id: "death-gatling",
    name: "Death Gatling",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 8)",
    fightingStyle: "Metralhadora Gatling no Braço Esquerdo",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Nós, heróis da Classe A, não somos inferiores à Classe S! Vou provar derrotando o Caçador de Heróis!",
    techniques: ["Fogo de Supressão Mortal", "Death Shower (Chuva da Morte Contínua)"],
    wikiTitle: "Death_Gatling"
  },
  {
    id: "tanktop-vegetarian",
    name: "Tanktop Vegetarian",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Exército Tanktop"],
    rankOrThreat: "Classe A (Rank 9)",
    fightingStyle: "Força Nutricional Vegetariana e Regata",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "A dieta vegana aliada ao poder da regata é imbatível!",
    techniques: ["Tanktop Punch Vegetal", "Bloqueio Orgânico Muscular"],
    wikiTitle: "Tanktop_Vegetarian"
  },
  {
    id: "stinger",
    name: "Stinger",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 10)",
    fightingStyle: "Lança de Broca de Bambu (Shoot Stinger)",
    debutArc: "Arco do Rei dos Mares Profundos",
    status: "Vivo",
    quote: "Hoje a Cidade J testemunhou o ápice da minha lança Shoot Stinger!",
    techniques: ["Shoot Stinger Espiral Gigante", "Perfurações Múltiplas Contínuas"],
    wikiTitle: "Stinger"
  },
  {
    id: "twin-tail",
    name: "Twin Tail",
    gender: "Feminino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 11)",
    fightingStyle: "Malabarismo Letal e Truques Circenses",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Combate de olhos vendados para amplificar meus outros sentidos circenses!",
    techniques: ["Malabarismo com Pesos e Facas Cortantes", "Acrobacias Circenses com Olhos Vendados"],
    wikiTitle: "Twin_Tail"
  },
  {
    id: "great-philosopher",
    name: "Great Philosopher",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 13)",
    fightingStyle: "Livro de Filosofia Gigante de 3 Toneladas",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "O peso do conhecimento filosófico esmagará qualquer ignorância!",
    techniques: ["Esmagamento do Tratado Filosófico de 3 Toneladas"],
    wikiTitle: "Great_Philosopher"
  },
  {
    id: "butterfly-dx",
    name: "Butterfly DX",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 16)",
    fightingStyle: "Voo com Asas Mecânicas e Mergulho Aéreo",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Voe como uma borboleta, ataque com precisão do alto dos céus!",
    techniques: ["Mergulho Alado Mortal", "Ataque Borboleta Supersônico"],
    wikiTitle: "Butterfly_DX"
  },
  {
    id: "lightning-genji",
    name: "Lightning Genji",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 17)",
    fightingStyle: "Bastões de Choque Elétricos e Patins Turbo",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "A velocidade dos patins e a descarga de milhões de volts te paralisarão!",
    techniques: ["Descarga Dupla de Alta Tensão", "Aceleração com Patins a Jato"],
    wikiTitle: "Lightning_Genji"
  },
  {
    id: "lightning-max",
    name: "Lightning Max",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 19)",
    fightingStyle: "Sapatos com Pólvora Explosiva & Artes Marciais",
    debutArc: "Arco do Rei dos Mares Profundos",
    status: "Vivo",
    quote: "Chute Relâmpago Voador! A força explosiva da pólvora impulsiona meu espírito marcial!",
    techniques: ["Lightning Flying Kick Explosivo", "Combinações com Pólvora Turbo nos Sapatos"],
    wikiTitle: "Lightning_Max"
  },
  {
    id: "one-shotter",
    name: "One-Shotter",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 22)",
    fightingStyle: "Rifle de Precisão Sniper de Longo Alcance",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Um disparo, uma baixa. O atirador de elite nunca erra o alvo.",
    techniques: ["Tiro de Precisão Penetrante à Distância Extrema", "Bala Rastreadora de Olho Mecânico"],
    wikiTitle: "One-Shotter"
  },
  {
    id: "heavy-kong",
    name: "Heavy Kong",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 34)",
    fightingStyle: "Estilo Primata Gorila e Força Bruta",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Sinta o peso do soco de um gorila enfurecido!",
    techniques: ["Pancada Esmagadora de Gorila", "Batida Sísmica no Solo"],
    wikiTitle: "Heavy_Kong"
  },
  {
    id: "feather",
    name: "Feather",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 34)",
    fightingStyle: "Acrobacias Aéreas e Lâminas de Garras",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Leve como uma pluma, afiado como uma lâmina de falcão.",
    techniques: ["Acrobacia das Asas de Rapina", "Garras Cortantes de Aço"],
    wikiTitle: "Feather"
  },
  {
    id: "air",
    name: "Air",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 35)",
    fightingStyle: "Bumerangue Gigante de Caça",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Meu bumerangue corta o vento e sempre retorna com a presa!",
    techniques: ["Arremesso Cortante de Bumerangue Australiano"],
    wikiTitle: "Air"
  },
  {
    id: "chain-n-toad",
    name: "Chain'n'toad",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 36)",
    fightingStyle: "Kusarigama (Foice com Corrente) com Máscara de Sapo",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "O estilo Kusarigama do sapo encurrala até os alvos mais ariscos!",
    techniques: ["Foice Giratória Envolvente", "Corrente Aprisionadora de Ferro"],
    wikiTitle: "Chain%27n%27toad"
  },
  {
    id: "sneck",
    name: "Sneck (Punho Mordida de Serpente)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 37)",
    fightingStyle: "Terno de Pele de Serpente e Punho Venenoso",
    debutArc: "Arco do Exame de Heróis & Meteoro",
    status: "Vivo",
    quote: "Eu sou o examinador do teste de heróis! Não ouse subestimar os veteranos da Classe A!",
    techniques: ["Mordida Rápida da Serpente", "Esquiva Serpenteante com Traje Especial"],
    wikiTitle: "Sneck"
  },
  {
    id: "golden-ball",
    name: "Golden Ball",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 26)",
    fightingStyle: "Estilingue Tático e Esferas de Ouro Cortantes",
    debutArc: "Arco do Rei dos Mares Profundos",
    status: "Vivo",
    quote: "Minhas esferas de liga de ouro puro atravessam concreto como se fosse manteiga.",
    techniques: ["Disparo de Balas Douradas de Ricochete", "Esfera de Perfuração Supersônica"],
    wikiTitle: "Golden_Ball"
  },
  {
    id: "spring-mustachio",
    name: "Spring Mustachio",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Conselho de Espadachins"],
    rankOrThreat: "Classe A (Rank 28)",
    fightingStyle: "Florete Espiral Extensível de Esgrima Nobre",
    debutArc: "Arco do Rei dos Mares Profundos",
    status: "Vivo",
    quote: "A nobreza da esgrima ocidental reside na pontada perfeita que perfura a armadura do monstro.",
    techniques: ["Perfuração da Rosa Espiral (Tomboy Rose)", "Estocada Ilimitada com Florete Retrátil"],
    wikiTitle: "Spring_Mustachio"
  },
  {
    id: "smile-man",
    name: "Smile Man",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 27)",
    fightingStyle: "Kendama Gigante de Aço",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Vivo",
    quote: "Mantenha sempre um sorriso no rosto enquanto defende os cidadãos indefesos!",
    techniques: ["Golpe Contundente de Kendama Pesado", "Truque de Ioiô Sísmico"],
    wikiTitle: "Smile_Man"
  },
  {
    id: "crescent-eyebrow",
    name: "Crescent Eyebrow",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 25)",
    fightingStyle: "Lança de Duas Pontas em Lua Crescente",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "Sob a luz da lua crescente, minha lança dita a justiça!",
    techniques: ["Estocada Dupla da Lua Crescente"],
    wikiTitle: "Crescent_Eyebrow"
  },
  {
    id: "narcisstory",
    name: "Narcisstory",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 29)",
    fightingStyle: "Rosas Venenosas Afiadas e Narcisismo",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "A beleza é o poder mais letal do universo.",
    techniques: ["Chuva de Pétalas Cortantes Espinhosas"],
    wikiTitle: "Narcisstory"
  },
  {
    id: "green",
    name: "Green",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe A (Rank 24)",
    fightingStyle: "Manipulação de Vinhas e Plantas Vivas pelo Corpo",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "As raízes da natureza me fornecem força inesgotável para imobilizar o mal.",
    techniques: ["Aprisionamento de Cipós Espinhosos", "Chicote Botânico Constritor"],
    wikiTitle: "Green"
  },

  // Heróis Classe B
  {
    id: "fubuki",
    name: "Fubuki (Blizzard do Inferno)",
    gender: "Feminino",
    affiliation: ["Associação de Heróis", "Grupo Fubuki"],
    rankOrThreat: "Classe B (Rank 1)",
    fightingStyle: "Poder Psíquico / Esper",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "A Classe B é meu reino. Junte-se ao Grupo Fubuki ou pereça sob a tempestade do inferno!",
    techniques: ["Tempestade do Inferno (Hell Storm)", "Cura Psíquica Celular", "Barreira Telecinética Defensiva"],
    wikiTitle: "Fubuki"
  },
  {
    id: "eyelashes",
    name: "Eyelashes",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Grupo Fubuki"],
    rankOrThreat: "Classe B (Rank 2)",
    fightingStyle: "Curvadores de Cílios de Aço Cortantes",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Tudo pela glória e honra de Lady Fubuki!",
    techniques: ["Corte Rápido de Curvador de Cílios Metálico", "Combate Tático do Grupo Fubuki"],
    wikiTitle: "Eyelashes"
  },
  {
    id: "mountain-ape",
    name: "Mountain Ape",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Grupo Fubuki"],
    rankOrThreat: "Classe B (Rank 3)",
    fightingStyle: "Músculos e Força Física de Primata",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Ninguém desrespeita a líder Fubuki na minha presença!",
    techniques: ["Investida Corporal da Montanha", "Abraço de Urso Esmagador"],
    wikiTitle: "Mountain_Ape"
  },
  {
    id: "captain-mizuki",
    name: "Captain Mizuki",
    gender: "Feminino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe B (Rank 71)",
    fightingStyle: "Atletismo Olímpico e Equipamento Esportivo de Combate",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Treinamento diário, medalhas e suor: nenhum monstro supera uma verdadeira atleta!",
    techniques: ["Arremesso de Dardo Perfurante", "Lançamento de Martelo Sísmico", "Vara de Salto Esmagadora de Carapaças"],
    wikiTitle: "Mizuki"
  },
  {
    id: "lily-of-the-three-section-staff",
    name: "Lily of the Three-Section Staff",
    gender: "Feminino",
    affiliation: ["Associação de Heróis", "Grupo Fubuki"],
    rankOrThreat: "Classe B (Rank 74)",
    fightingStyle: "Bastão de Três Seções (Sansetsukon)",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Vou apoiar a senhorita Fubuki com a precisão do meu bastão!",
    techniques: ["Dança Rotatória de Bastão Articulado", "Golpe Perfurante Triplo"],
    wikiTitle: "Lily"
  },
  {
    id: "needle-star",
    name: "Needle Star",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe B (Rank 60)",
    fightingStyle: "Mangual de Espinhos Estrelar (Morning Star)",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Minha bola de espinhos tritura os dentes desses monstros!",
    techniques: ["Golpe Contundente de Mangual Espinhoso"],
    wikiTitle: "Needle_Star"
  },
  {
    id: "darkness-blade",
    name: "Darkness Blade",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe B (Rank 50)",
    fightingStyle: "Espada Negra e Síndrome de Oitava Série (Chunibyo)",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "A escuridão ancestral aprisionada nesta lâmina finalmente acordará!",
    techniques: ["Corte das Trevas Noturnas Profundas"],
    wikiTitle: "Darkness_Blade"
  },
  {
    id: "tanktop-black-hole",
    name: "Tanktop Black Hole",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Exército Tanktop"],
    rankOrThreat: "Classe B (Rank 81)",
    fightingStyle: "Força de Aperto Muscular de 200kg",
    debutArc: "Arco do Exame de Heróis & Meteoro",
    status: "Vivo",
    quote: "Minhas mãos têm força de gravidade de um buraco negro! Você não é nada, novato Saitama!",
    techniques: ["Agarre de Esmagamento do Buraco Negro"],
    wikiTitle: "Tanktop_Black_Hole"
  },
  {
    id: "bone",
    name: "Bone",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe B (Rank 77)",
    fightingStyle: "Consumo Massivo de Leite e Fortalecimento Ósseo",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Beber litros diários de leite torna meus ossos mais duros que o titânio!",
    techniques: ["Cabeçada de Ossos Fortificados com Cálcio"],
    wikiTitle: "Bone"
  },
  {
    id: "shooter",
    name: "Shooter",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe B (Rank 99)",
    fightingStyle: "Arco e Flechas com Veneno Silvestre",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Cada flecha carrega toxina suficiente para derrubar um urso!",
    techniques: ["Chuva de Flechas Envenenadas"],
    wikiTitle: "Shooter"
  },

  // Heróis Classe C
  {
    id: "mumen-rider",
    name: "Mumen Rider (Satoru)",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe C (Rank 1)",
    fightingStyle: "Bicicleta da Justiça & Vontade Heroica Inabalável",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Vivo",
    quote: "Não importa se não tenho chance de vencer! Tenho que lutar aqui e agora, porque sou um herói!",
    techniques: ["Justice Crash (Arremesso da Bicicleta)", "Justice Tackle", "Justice Punch"],
    wikiTitle: "Mumen_Rider"
  },
  {
    id: "tanktop-tiger",
    name: "Tanktop Tiger",
    gender: "Masculino",
    affiliation: ["Associação de Heróis", "Exército Tanktop"],
    rankOrThreat: "Classe C (Rank 6)",
    fightingStyle: "Regata Estampada de Tigre e Fúria Selvagem",
    debutArc: "Arco do Exame de Heróis & Meteoro",
    status: "Vivo",
    quote: "A regata de tigre me dá a ferocidade das selvas!",
    techniques: ["Garras do Tigre de Regata"],
    wikiTitle: "Tanktop_Tiger"
  },
  {
    id: "d-pad",
    name: "D-Pad",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe C (Rank 22)",
    fightingStyle: "Controle de Videogame e Combinações de Botões",
    debutArc: "Arco do Rei dos Mares Profundos",
    status: "Vivo",
    quote: "Cima, baixo, esquerda, direita e soco! O combo perfeito!",
    techniques: ["Sequência de Golpes do Direcional D-Pad"],
    wikiTitle: "D-Pad"
  },
  {
    id: "gearsper",
    name: "Gearsper",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe C (Rank 133)",
    fightingStyle: "Poder Psíquico / Esper em Treinamento",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Mesmo que meu capacete queime meus neurônios, vou erguer essas torres para salvar a todos!",
    techniques: ["Onda Telecinética Desesperada de Sobrecarga", "Capacete Amplificador de Ondas Psíquicas"],
    wikiTitle: "Gearsper"
  },
  {
    id: "poison",
    name: "Poison",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe C (Rank 300)",
    fightingStyle: "Faca com Veneno Mortal de Anfíbio",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Um único arranhão com minha adaga e o veneno paralisará seus órgãos vitais.",
    techniques: ["Golpe Furtivo de Lâmina Envenenada"],
    wikiTitle: "Poison"
  },
  {
    id: "red-muffler",
    name: "Red Muffler",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe C (Rank 89)",
    fightingStyle: "Artes Marciais e Cachecol Vermelho",
    debutArc: "Arco do Rei dos Mares Profundos",
    status: "Vivo",
    quote: "O cachecol vermelho voa como o estandarte da coragem dos heróis da Classe C!",
    techniques: ["Chute Heroico do Cachecol Carmesim"],
    wikiTitle: "Red_Muffler"
  },
  {
    id: "armored-chief-clerk",
    name: "Armored Chief Clerk",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Classe C (Rank 111)",
    fightingStyle: "Armadura de Escritório e Escudo Protetor",
    debutArc: "Arco do Rei dos Mares Profundos",
    status: "Vivo",
    quote: "A burocracia e a defesa dos cidadãos andam de mãos dadas!",
    techniques: ["Barricada Protetora Blindada"],
    wikiTitle: "Armored_Chief_Clerk"
  },

  // Vilões, Monstros e Oponentes Épicos
  {
    id: "garou",
    name: "Garou (O Caçador de Heróis)",
    gender: "Masculino",
    affiliation: ["Caçador Solitário", "Ex-Discípulo de Bang"],
    rankOrThreat: "Nível Desastre: Dragão+ / Acima de Dragão",
    fightingStyle: "Artes Marciais Adaptativas (Punho Esmagador de Pedras & Punho Monstro)",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "O monstro sempre perde no final? Que se dane essa história! Eu vou vencer e me tornar o Terror Absoluto!",
    techniques: ["Punho da Água Corrente Esmagadora de Pedras", "Punho Cortante de Vento e Redemoinho de Ferro", "Punho Devastador do Monstro da Calamidade", "Adaptação e Evolução Instantânea em Batalha"],
    wikiTitle: "Garou"
  },
  {
    id: "cosmic-fear-garou",
    name: "Garou Cósmico (Cosmic Fear Garou)",
    gender: "Masculino",
    affiliation: ["Avatar Escolhido por Deus"],
    rankOrThreat: "Nível Desastre: Deus",
    fightingStyle: "Manipulação Cósmica e Fissão Nuclear Espacial",
    debutArc: "Arco de Garou Cósmico & Clímax",
    status: "Derrotado",
    quote: "Eu agora conheço todas as correntes de energia do cosmos. O próprio universo se move no ritmo dos meus punhos!",
    techniques: ["Modo Saitama", "Fissão Nuclear Consecutiva", "Explosão de Raios Gama", "Manipulação Espaço-Temporal Hiperdimensional"],
    wikiTitle: "Garou"
  },
  {
    id: "boros",
    name: "Lorde Boros (Dominador do Universo)",
    gender: "Masculino",
    affiliation: ["Ladrões da Matéria Negra"],
    rankOrThreat: "Nível Desastre: Dragão+ (Beirando Deus)",
    fightingStyle: "Energia Latente Cósmica & Regeneração Infinita",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Morto",
    quote: "Vim através dos confins da galáxia para encontrar alguém capaz de me proporcionar uma batalha de verdade!",
    techniques: ["Meteoric Burst (Estouro Meteórico)", "Canhão da Estrela em Colapso (Collapsing Star Roaring Cannon)", "Regeneração Vital Instantânea de Núcleo"],
    wikiTitle: "Boros"
  },
  {
    id: "melzargard",
    name: "Melzargard",
    gender: "Masculino",
    affiliation: ["Ladrões da Matéria Negra"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Múltiplas Cabeças, Metamorfose Corporal e Esferas Vitais",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Morto",
    quote: "Não adianta nos cortar, criaturas insignificantes. Nosso corpo se regenera infinitamente ao redor das nossas pérolas!",
    techniques: ["Divisão e Metamorfose em Asas e Martelos", "Regeneração Plasmática por Esferas"],
    wikiTitle: "Melzargard"
  },
  {
    id: "geryuganshoop",
    name: "Geryuganshoop",
    gender: "Masculino",
    affiliation: ["Ladrões da Matéria Negra"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Telecinese Cósmica Gravitacional Extrema",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Morto",
    quote: "Eu sou o maior telecinético de todo o universo! Minha gravidade rivaliza com a de um buraco negro!",
    techniques: ["Chuva de Escombros Telecinética Subluz", "Onda Gravitacional de Buraco Negro"],
    wikiTitle: "Geryuganshoop"
  },
  {
    id: "groribas",
    name: "Groribas",
    gender: "Masculino",
    affiliation: ["Ladrões da Matéria Negra"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Mordidas de Mandíbulas Múltiplas e Cuspe Ácido",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Morto",
    quote: "Eu possuo mais de vinte técnicas secretas mortais de mastigação...",
    techniques: ["Ácido Corrosivo Espesso", "Mordida Tripla Esmagadora de Mandíbulas"],
    wikiTitle: "Groribas"
  },
  {
    id: "orochi",
    name: "Rei dos Monstros Orochi",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Dragão+",
    fightingStyle: "Dragões de Fogo 생체, Absorção de Energia do Núcleo da Terra e Genialidade Marcial",
    debutArc: "Arco do Super Torneio de Artes Marciais",
    status: "Morto",
    quote: "Eu sou a personificação de todos os sacrifícios e do ápice da monstruosidade terrena.",
    techniques: ["Canhões de Chamas de Serpentes Gigantes", "Absorção de Magma do Núcleo da Terra", "Mimetismo Instantâneo de Artes Marciais"],
    wikiTitle: "Orochi"
  },
  {
    id: "psykos",
    name: "Psykos",
    gender: "Feminino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Dragão+",
    fightingStyle: "Poder Psíquico / Esper & Elixir Monstruoso",
    debutArc: "Arco do Super Torneio de Artes Marciais",
    status: "Vivo",
    quote: "A humanidade precisa ser erradicada. Eu vi o futuro da Terra no Terceiro Olho e nada mais importa além do caos!",
    techniques: ["Raio Telecinético Concentrado", "Fusão Psíquica Orochi-Psykos", "Corte Continental Psíquico"],
    wikiTitle: "Psykos"
  },
  {
    id: "gyoro-gyoro",
    name: "Gyoro Gyoro",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Demônio+",
    fightingStyle: "Marionete de Carne Psíquica com Olho Gigante",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Morto",
    quote: "A Associação de Monstros trará a nova ordem mundial onde os heróis serão devorados!",
    techniques: ["Controle Gravitacional de Marionete", "Raios Ópticos Telecinéticos"],
    wikiTitle: "Gyoro_Gyoro"
  },
  {
    id: "black-sperm",
    name: "Black Sperm (Golden Sperm / Platinum Sperm)",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Dragão+",
    fightingStyle: "Multiplicação em Trilhões de Clones e Fusões de Ouro e Platina",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Você está zombando de mim? Tenho 54 trilhões de células prontas para te esmagar!",
    techniques: ["Divisão Celular Infinita", "Fusão em Golden Sperm", "Forma Suprema Platinum Sperm (Velocidade Relativística)"],
    wikiTitle: "Black_Sperm"
  },
  {
    id: "homeless-emperor",
    name: "Homeless Emperor (Imperador Mendigo)",
    gender: "Masculino",
    affiliation: ["Associação de Monstros", "Abençoado por Deus"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Esferas de Energia Luminosa Pura Destrutiva concedidas por Deus",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Morto",
    quote: "A Mãe Natureza me escolheu através de Deus para purificar este mundo de parasitas humanos.",
    techniques: ["Bombardeio Contínuo de Orbes de Energia", "Orbe Gigante da Aniquilação Solar"],
    wikiTitle: "Homeless_Emperor"
  },
  {
    id: "fuhrer-ugly",
    name: "Fuhrer Ugly (Presidente Feio / Vomited)",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Força de Inferioridade Ugmon e Ácido Digestivo de Gums",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Morto",
    quote: "Eu odeio gente bonita e heróis populares! Vou esmagar seus rostos até ficarem piores do que o meu!",
    techniques: ["Soco da Baixa Autoestima Esmagador", "Ácido Monstruoso Derretedor Digestivo"],
    wikiTitle: "Fuhrer_Ugly"
  },
  {
    id: "gums",
    name: "Gums (Gengivas)",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Mandíbula Voraz Insaciável e Ácido Digestivo Letal",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Morto",
    quote: "Nhom... nhom... triturar e engolir tudo sem parar!",
    techniques: ["Mordida Trituradora Gigante", "Ácido Estomacal Dilacerador"],
    wikiTitle: "Gums"
  },
  {
    id: "nyan",
    name: "Nyan",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Flexibilidade Felina Extrema e Garras Cortantes de Aço",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Gatos entram em qualquer fresta de milímetros... inclusive dentro do seu corpo!",
    techniques: ["Penetração em Frestas Microscópicas", "Garras Retalhadoras Felinas"],
    wikiTitle: "Nyan"
  },
  {
    id: "overgrown-rover",
    name: "Overgrown Rover (Rover)",
    gender: "Masculino",
    affiliation: ["Associação de Monstros", "Animal de Estimação de Saitama"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Bombas de Energia Explosivas Bucais e Carapaça Blindada",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Au! Au! (Dispara salvas gigantescas de esferas de calor destrutivo)",
    techniques: ["Disparos Múltiplos de Bombas de Calor", "Carapaça Canina Impenetrável", "Comportamento de Cachorrinho Treinado por Saitama"],
    wikiTitle: "Overgrown_Rover"
  },
  {
    id: "elder-centipede",
    name: "Elder Centipede (Centopéia Anciã)",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Carapaça Blindada Gigantesca e Troca Contínua de Pele",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Morto",
    quote: "Blast... onde está você, Blast?! Eu voltei das profundezas para me vingar!",
    techniques: ["Marcha Sísmica Centopéica", "Muda Regenerativa Instantânea de Exoesqueleto"],
    wikiTitle: "Elder_Centipede"
  },
  {
    id: "gouketsu",
    name: "Gouketsu",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Artes Marciais Monstruosas e Força de Quatro Olhos",
    debutArc: "Arco do Super Torneio de Artes Marciais",
    status: "Morto",
    quote: "Vocês humanos são insetos frágeis. A Associação de Monstros é o ápice da força evoluída!",
    techniques: ["Impacto de Ar com Punho Monstruoso", "Pressão Esmagadora de Artes Marciais"],
    wikiTitle: "Gouketsu"
  },
  {
    id: "phoenix-man",
    name: "Phoenix Man (Homem Fênix)",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Dragão (Evoluído)",
    fightingStyle: "Ressurreição Térmica Infinita com Traje de Pássaro",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Derrotado",
    quote: "A cada vez que morro, as chamas da fênix me ressuscitam mais forte e imponente!",
    techniques: ["Ressurreição da Fênix Radiante", "Modo Fênix Flamejante Brilhante", "Espaço Espiritual da Fantasia Phoenix"],
    wikiTitle: "Phoenix_Man"
  },
  {
    id: "carnage-kabuto",
    name: "Carnage Kabuto (Escaravelho Carniceiro)",
    gender: "Masculino",
    affiliation: ["Casa da Evolução"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Fisiologia de Besouro Rinoceronte & Modo Carnage",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Morto",
    quote: "Meu instinto assassino não tem limites! No Modo Carnage eu fico em fúria por uma semana inteira!",
    techniques: ["Modo Carnage de Fúria Incontrolável", "Golpe de Pressão Supersônica com Chifre"],
    wikiTitle: "Carnage_Kabuto"
  },
  {
    id: "mosquito-girl",
    name: "Mosquito Girl (Garota Mosquito)",
    gender: "Feminino",
    affiliation: ["Casa da Evolução"],
    rankOrThreat: "Nível Desastre: Demônio+",
    fightingStyle: "Controle de Enxame de Mosquitos e Absorção de Sangue",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Vivo",
    quote: "Tragam-me mais sangue! Mais e mais até meu corpo se tingir de vermelho rubro!",
    techniques: ["Enxame Sugador de Sangue em Massa", "Transformação Rubra de Velocidade Hipersônica"],
    wikiTitle: "Mosquito_Girl"
  },
  {
    id: "beast-king",
    name: "Beast King (Rei das Feras)",
    gender: "Masculino",
    affiliation: ["Casa da Evolução"],
    rankOrThreat: "Nível Desastre: Demônio",
    fightingStyle: "Garras de Leão Feral e Rugidos Cortantes",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Morto",
    quote: "Eu sou o animal mais temível do topo da cadeia alimentar da Casa da Evolução!",
    techniques: ["Garras do Leão Cortador de Aço", "Fúria das Feras Selvagens"],
    wikiTitle: "Beast_King"
  },
  {
    id: "armored-gorilla",
    name: "Armored Gorilla (Gorila Blindado)",
    gender: "Masculino",
    affiliation: ["Casa da Evolução", "Loja de Takoyaki de Genus"],
    rankOrThreat: "Nível Desastre: Demônio",
    fightingStyle: "Cibernética Pesada de Gorila e Cozinha de Takoyaki",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Vivo",
    quote: "Desculpe, estava fingindo falar como um robô. Agora trabalho pacificamente vendendo takoyaki com o Dr. Genus.",
    techniques: ["Soco Blindado de Gorila Cibernético", "Preparo Especial de Takoyaki"],
    wikiTitle: "Armored_Gorilla"
  },
  {
    id: "deep-sea-king",
    name: "Deep Sea King (Rei dos Mares Profundos)",
    gender: "Masculino",
    affiliation: ["Povo do Mar Profundo"],
    rankOrThreat: "Nível Desastre: Demônio+",
    fightingStyle: "Fisiologia de Monstro Marinho, Ácido Bucal e Hidratação",
    debutArc: "Arco do Rei dos Mares Profundos",
    status: "Morto",
    quote: "A superfície pertence a nós, o Povo do Mar! Quando a chuva cai, minha verdadeira força desperta!",
    techniques: ["Soco Hidratado de Velocidade Oceânica", "Moreia Bucal Perfuradora", "Cuspe de Ácido Altamente Corrosivo"],
    wikiTitle: "Deep_Sea_King"
  },
  {
    id: "vaccine-man",
    name: "Vaccine Man (Homem Vacina)",
    gender: "Masculino",
    affiliation: ["Força da Mãe Terra"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Esferas de Energia de Antimatéria e Metamorfose Gigante",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Morto",
    quote: "Eu sou a vacina nascida da Mãe Terra para erradicar a praga humana que polui este planeta!",
    techniques: ["Disparos de Esferas Energéticas da Terra", "Metamorfose Monstruosa com Asas e Chifres"],
    wikiTitle: "Vaccine_Man"
  },
  {
    id: "crablante",
    name: "Crablante (Homem Caranguejo)",
    gender: "Masculino",
    affiliation: ["Monstro Transformado por Obsessão"],
    rankOrThreat: "Nível Desastre: Tigre",
    fightingStyle: "Pinças de Caranguejo Esmagadoras",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Morto",
    quote: "Comi tanto caranguejo que me transformei em um monstro caranguejo! Kkuku!",
    techniques: ["Ataque de Pinça Esmagadora de Concreto"],
    wikiTitle: "Crablante"
  },
  {
    id: "beefcake",
    name: "Beefcake (Marugori)",
    gender: "Masculino",
    affiliation: ["Irmãos Cientistas Mutantes"],
    rankOrThreat: "Nível Desastre: Demônio+ (Poder de Dragão)",
    fightingStyle: "Tamanho Colossal e Força Sísmica Esmagadora",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Morto",
    quote: "Bebi o esteroide Biceps Brachii do meu irmão! Agora sou o ser humano mais forte e gigantesco do mundo!",
    techniques: ["Onda de Choque Sísmica de Passadas Gigantes", "Pancadas Consecutivas Dilaceradoras de Cidades"],
    wikiTitle: "Marugori"
  },
  {
    id: "speed-o-sound-sonic",
    name: "Speed-o'-Sound Sonic (Sonic)",
    gender: "Masculino",
    affiliation: ["Vila Ninja (44ª Turma)", "Rival Autoproclamado de Saitama"],
    rankOrThreat: "Nível Desastre: Demônio+ / Dragão",
    fightingStyle: "Ninjutsu Assassinato da Velocidade do Som & Shurikens",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Vivo",
    quote: "Saitama! Eu juro que minhas técnicas ninja vão decepar seu pescoço na próxima vez!",
    techniques: ["Enterro de Dez Sombras (Ten Shadows Burial)", "Shuriken Explosiva Teleguiada", "Passos Silenciosos da Velocidade do Som"],
    wikiTitle: "Speed-o%27-Sound_Sonic"
  },
  {
    id: "hellfire-flame",
    name: "Hellfire Flame",
    gender: "Masculino",
    affiliation: ["Associação de Monstros", "Vila Ninja (37ª Turma)"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Ninjutsu de Fogo e Velocidade Hipersônica Monstruosa",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Os ninjas que consom células de monstro superam a própria luz!",
    techniques: ["Lâmina Flamejante de Ignição Ninja", "Transformação Monstruosa Hipersônica"],
    wikiTitle: "Hellfire_Flame"
  },
  {
    id: "gale-wind",
    name: "Gale Wind",
    gender: "Masculino",
    affiliation: ["Associação de Monstros", "Vila Ninja (37ª Turma)"],
    rankOrThreat: "Nível Desastre: Dragão",
    fightingStyle: "Ninjutsu de Vento e Esgrima Cortante Hipersônica",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Com nossas células de monstro, Flashy Flash não passa de uma lembrança do passado da vila!",
    techniques: ["Tornado Cortante de Vento Ninja", "Golpe Voador Hipersônico"],
    wikiTitle: "Gale_Wind"
  },
  {
    id: "royal-ripper",
    name: "Royal Ripper (Estripador Real)",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Demônio",
    fightingStyle: "Lâminas no Lugar das Mãos e Sadismo Insano",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Morto",
    quote: "Eu adoro cortar, fatiar e ver o medo nos olhos das crianças e dos heróis!",
    techniques: ["Frenesi de Lâminas Retalhadoras Enfaixadas"],
    wikiTitle: "Royal_Ripper"
  },
  {
    id: "bug-god",
    name: "Bug God (Deus Inseto)",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Demônio+",
    fightingStyle: "Exoesqueleto Impenetrável de Insetos e Braços Múltiplos",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Morto",
    quote: "Os insetos são perfeitos na natureza! Nenhuma técnica humana arranha minha carapaça divina!",
    techniques: ["Transformação Muscular em Inseto Primordial", "Socos Múltiplos com Quatro Punhos Blindados"],
    wikiTitle: "Bug_God"
  },
  {
    id: "awakened-cockroach",
    name: "Awakened Cockroach (Barata Despertada)",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Demônio",
    fightingStyle: "Velocidade de Esquiva Instintiva de Barata",
    debutArc: "Arco do Super Torneio de Artes Marciais",
    status: "Morto",
    quote: "Minhas seis pernas e instinto de sobrevivência me permitem desviar de qualquer ataque antes mesmo de ele acontecer!",
    techniques: ["Esquiva Perfeita de Barata", "Investida Cortante com Seis Membros"],
    wikiTitle: "Awakened_Cockroach"
  },
  {
    id: "pure-blood",
    name: "Pure Blood (Vampiro Puro-Sangue)",
    gender: "Masculino",
    affiliation: ["Associação de Monstros"],
    rankOrThreat: "Nível Desastre: Demônio",
    fightingStyle: "Fisiologia Vampírica, Regeneração por Sangue e Asas de Morcego",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Morto",
    quote: "Diferente dessas aberrações criadas artificialmente, eu sou um verdadeiro monstro puro de linhagem nobre!",
    techniques: ["Regeneração Instantânea por Ingestão Sanguínea", "Enxame de Morcegos Vorazes"],
    wikiTitle: "Pureblood"
  },
  {
    id: "manako",
    name: "Manako",
    gender: "Feminino",
    affiliation: ["Associação de Monstros (Desertora)", "Aliada de Saitama e Flash"],
    rankOrThreat: "Nível Desastre: Lobo",
    fightingStyle: "Iluminação com Grande Olho Único e Fuga Cômica",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Por favor, não me matem! Meu olho pode servir de lanterna nas cavernas escuras!",
    techniques: ["Feixe de Luz com Olho Lanterna", "Corrida Desesperada de Fuga"],
    wikiTitle: "Manako"
  },

  // Aliados, Civis, Cientistas e Entidades
  {
    id: "suiryu",
    name: "Suiryu",
    gender: "Masculino",
    affiliation: ["Lutador Autônomo", "Associação Neo Heróis"],
    rankOrThreat: "Classe A+ / Nível Dragão Marcial",
    fightingStyle: "Artes Marciais (Punho do Vazio / Void Fist)",
    debutArc: "Arco do Super Torneio de Artes Marciais",
    status: "Vivo",
    quote: "Eu só quero viver uma vida boa e divertida. Mas quando vi os heróis caírem... entendi o que significa proteger alguém.",
    techniques: ["Punho do Vazio (Void Fist)", "Chute Tremor de Terra do Tigre do Vazio", "Punho da Serpente Celestial do Vazio"],
    wikiTitle: "Suiryu"
  },
  {
    id: "suiko",
    name: "Suiko",
    gender: "Feminino",
    affiliation: ["Associação de Heróis (Classe A)"],
    rankOrThreat: "Classe A",
    fightingStyle: "Artes Marciais (Punho do Vazio / Void Fist)",
    debutArc: "Arco das Irmãs Psíquicas & Neo Heróis",
    status: "Vivo",
    quote: "Eu não sou despreocupada como meu irmão Suiryu. Eu luto para honrar nosso avô!",
    techniques: ["Estilo do Punho do Vazio Adaptado", "Combinações de Chutes Giratórios"],
    wikiTitle: "Suiko"
  },
  {
    id: "bomb",
    name: "Bomb",
    gender: "Masculino",
    affiliation: ["Dojô do Punho do Vento Cortante"],
    rankOrThreat: "Nível Classe S / Grão-Mestre Marcial",
    fightingStyle: "Artes Marciais (Punho do Vento Cortante de Redemoinho de Ferro)",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Bang é meu irmão mais novo, mas quando lutamos lado a lado, nem um monstro colossal nos detém!",
    techniques: ["Punho do Vento Cortante de Redemoinho de Ferro", "Corte Tornado Dilacerador"],
    wikiTitle: "Bomb"
  },
  {
    id: "dr-genus",
    name: "Dr. Genus",
    gender: "Masculino",
    affiliation: ["Ex-Líder da Casa da Evolução", "Loja de Takoyaki"],
    rankOrThreat: "Civil / Intelecto Científico Genial",
    fightingStyle: "Engenharia Genética, Clonagem e Teoria do Limitador",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Vivo",
    quote: "Saitama removeu seu Limitador por puro esforço e determinação... ele quebrou a própria lei biológica estabelecida por Deus.",
    techniques: ["Teoria da Remoção do Limitador Humano", "Clonagem Celular Perfeita e Juventude Eterna"],
    wikiTitle: "Genus"
  },
  {
    id: "dr-kuseno",
    name: "Dr. Kuseno",
    gender: "Masculino",
    affiliation: ["Cientista Aliado de Genos"],
    rankOrThreat: "Civil / Intelecto Científico Genial",
    fightingStyle: "Engenharia Cibernética e Criação de Núcleos de Energia",
    debutArc: "Arco da Introdução & Casa da Evolução",
    status: "Vivo",
    quote: "Genos, não se deixe consumir pelo ódio contra o Ciborgue Louco. Mantenha sua humanidade viva.",
    techniques: ["Armaduras e Upgrades Cibernéticos de Alta Performance para Genos"],
    wikiTitle: "Kuseno"
  },
  {
    id: "tareo",
    name: "Tareo",
    gender: "Masculino",
    affiliation: ["Civil / Fã de Heróis"],
    rankOrThreat: "Civil",
    fightingStyle: "Conhecimento Enciclopédico do Livro de Heróis e Monstros",
    debutArc: "Arco da Caçada aos Heróis (Garou)",
    status: "Vivo",
    quote: "Tio Garou! Não desista! Para mim você é muito mais legal do que qualquer outro herói!",
    techniques: ["Guia Ilustrado dos Heróis da Associação"],
    wikiTitle: "Tareo"
  },
  {
    id: "god",
    name: "Deus (God)",
    gender: "Assexuado",
    affiliation: ["Entidade Cósmica Primordial"],
    rankOrThreat: "Nível Desastre: Deus Absoluto",
    fightingStyle: "Concessão Cósmica de Poderes, Manipulação Espacial e Ilusões Mentais",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Abrace meu poder e se torne meu apóstolo para purificar as falhas desta criação.",
    techniques: ["Concessão do Poder Cósmico do Conhecimento Universal", "Retirada Instantânea de Vida e Poder"],
    wikiTitle: "God"
  },
  {
    id: "sitch",
    name: "Sitch",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Ministro de Operações de Emergência",
    fightingStyle: "Liderança Estratégica e Alerta da Profecia de Shibabawa",
    debutArc: "Arco da Invasão Alienígena (Lorde Boros)",
    status: "Vivo",
    quote: "A profecia de Shibabawa diz: A Terra está em perigo mortal! Preparem todos os heróis da Classe S!",
    techniques: ["Mobilização Geral de Heróis da Classe S", "Coordenação Tática de Desastres Nível Dragão e Deus"],
    wikiTitle: "Sitch"
  },
  {
    id: "sekingar",
    name: "Sekingar",
    gender: "Masculino",
    affiliation: ["Associação de Heróis"],
    rankOrThreat: "Diretor de Operações de Campo",
    fightingStyle: "Comando Tático e Olho Biônico com Laser",
    debutArc: "Arco da Invasão à Associação de Monstros",
    status: "Vivo",
    quote: "Eu mesmo estarei na linha de frente liderando os heróis da superfície!",
    techniques: ["Raio Laser Ocular Secreto", "Comando Tático de Esquadrões de Suporte"],
    wikiTitle: "Sekingar"
  }
];

const wikiHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://onepunchman.fandom.com/'
};

async function fetchWikiThumbnail(title) {
  const url = `https://onepunchman.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=600&format=json&redirects=1`;
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
    // Tall portrait: crop upper 75% for face
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
  const outDir = path.resolve('public/avatars/one-punch-man');
  const jsonDir = path.resolve('src/data/animes/one-punch-man');
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(jsonDir, { recursive: true });

  const finalChars = [];
  console.log(`Processing ${OPM_CHARACTERS.length} One Punch Man characters...`);

  for (let i = 0; i < OPM_CHARACTERS.length; i++) {
    const c = OPM_CHARACTERS[i];
    const outPath = path.join(outDir, `${c.id}.png`);
    const avatarRelative = `/avatars/one-punch-man/${c.id}.png`;

    finalChars.push({
      id: c.id,
      name: c.name,
      gender: c.gender,
      affiliation: c.affiliation,
      rankOrThreat: c.rankOrThreat,
      fightingStyle: c.fightingStyle,
      debutArc: c.debutArc,
      status: c.status,
      quote: c.quote,
      techniques: c.techniques,
      avatar: avatarRelative
    });

    if (fs.existsSync(outPath)) {
      console.log(`[${i+1}/${OPM_CHARACTERS.length}] ${c.name} -> already exists.`);
      continue;
    }

    const wikiTitle = c.wikiTitle || c.name;
    const thumbUrl = await fetchWikiThumbnail(wikiTitle);
    if (thumbUrl) {
      try {
        const res = await fetch(thumbUrl, { headers: wikiHeaders });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAvatar(buf, outPath);
        console.log(`[${i+1}/${OPM_CHARACTERS.length}] ${c.name} -> saved.`);
      } catch (err) {
        console.error(`Error saving ${c.name}:`, err.message);
      }
    } else {
      console.warn(`[${i+1}/${OPM_CHARACTERS.length}] ${c.name} -> No thumb found for ${wikiTitle}`);
    }
  }

  const jsonPath = path.join(jsonDir, 'characters.json');
  fs.writeFileSync(jsonPath, JSON.stringify(finalChars, null, 2), 'utf8');
  console.log(`Wrote ${finalChars.length} characters to ${jsonPath}`);
}

run();
