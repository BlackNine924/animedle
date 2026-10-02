// Base de Desafios Exclusivos Canônicos para todos os Animes do AnimeDLE
// Gerado automaticamente com validação canônica de personagens e atributos.

export interface ExclusiveChallenge {
  id: string;
  animeSlug: string;
  category: string;
  questionTitle: string;
  targetTitle: string;
  badgeTitle: string;
  targetCharacterId: string;
  targetCharacterName: string;
  clues: { label: string; value: string }[];
  contextExplanation?: string;
}

export const EXCLUSIVE_CHALLENGES: ExclusiveChallenge[] = [
  {
    "id": "exc-one-piece-monkey-d-luffy-8dp7e",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence esta Fruta do Diabo?",
    "targetTitle": "Hito Hito no Mi: Modelo Nika (Gomu Gomu no Mi)",
    "badgeTitle": "Fruta do Diabo Mítica",
    "targetCharacterId": "monkey-d-luffy",
    "targetCharacterName": "Monkey D. Luffy",
    "clues": [
      {
        "label": "Tipo da Fruta",
        "value": "Zoan Mítica (anteriormente catalogada como Paramecia de Borracha)"
      },
      {
        "label": "Primeira Aparição / Arco",
        "value": "Arco Romance Dawn (Vila Foosha)"
      },
      {
        "label": "Forma Despertada / Usuário Anterior",
        "value": "Despertar: Gear 5 (Guerreiro da Libertação Nika) / Usuário de 800 anos atrás: Joy Boy"
      }
    ],
    "contextExplanation": "A fruta de Luffy foi roubada do Governo Mundial por Shanks e permite ao usuário lutar com liberdade total e corpo emborrachado."
  },
  {
    "id": "exc-one-piece-law-trafalgar-ff58x",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence esta Fruta do Diabo?",
    "targetTitle": "Ope Ope no Mi",
    "badgeTitle": "Fruta do Diabo Paramecia",
    "targetCharacterId": "law-trafalgar",
    "targetCharacterName": "Law Trafalgar",
    "clues": [
      {
        "label": "Tipo da Fruta",
        "value": "Paramecia (Fruta da Operação Cirúrgica)"
      },
      {
        "label": "Primeira Aparição / Arco",
        "value": "Arco Arquipélago de Sabaody"
      },
      {
        "label": "Forma Despertada / Usuário Anterior",
        "value": "Despertar: KROOM & Re-ROOM / Capacidade suprema: Operação da Juventude Perene em troca da própria vida"
      }
    ],
    "contextExplanation": "Trafalgar Law usa a Ope Ope no Mi para criar espaços esféricos chamados ROOM onde manipula tudo cirurgicamente."
  },
  {
    "id": "exc-one-piece-sabo-ajlop",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence esta Fruta do Diabo?",
    "targetTitle": "Mera Mera no Mi",
    "badgeTitle": "Fruta do Diabo Logia",
    "targetCharacterId": "sabo",
    "targetCharacterName": "Sabo",
    "clues": [
      {
        "label": "Tipo da Fruta",
        "value": "Logia (Fruta do Fogo)"
      },
      {
        "label": "Primeira Aparição / Arco",
        "value": "Arco Alabasta (Portgas D. Ace) e Arco Dressrosa (Sabo)"
      },
      {
        "label": "Forma Despertada / Usuário Anterior",
        "value": "Usuário Anterior: Portgas D. Ace / Portador Atual: Sabo (Irmãos de Juramento de Luffy)"
      }
    ],
    "contextExplanation": "A Mera Mera no Mi concede o poder do fogo puro, herdada por Sabo no Coliseu Corrida em Dressrosa em memória de Ace."
  },
  {
    "id": "exc-one-piece-donquixote-doflamingo-8pjyy",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence esta Fruta do Diabo?",
    "targetTitle": "Ito Ito no Mi",
    "badgeTitle": "Fruta do Diabo Paramecia",
    "targetCharacterId": "donquixote-doflamingo",
    "targetCharacterName": "Donquixote Doflamingo",
    "clues": [
      {
        "label": "Tipo da Fruta",
        "value": "Paramecia (Fruta dos Fios)"
      },
      {
        "label": "Primeira Aparição / Arco",
        "value": "Arco Jaya (Primeira aparição na reunião de Mary Geoise)"
      },
      {
        "label": "Forma Despertada / Usuário Anterior",
        "value": "Despertar: Transmuta prédios e o solo ao redor em incontáveis fios brancos afiados (Torikago / Gaiola de Pássaros)"
      }
    ],
    "contextExplanation": "Donquixote Doflamingo controla fios afiados quase invisíveis para cortar, criar clones e manipular pessoas como marionetes."
  },
  {
    "id": "exc-one-piece-marshall-d-teach-tyqjq",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence esta Fruta do Diabo?",
    "targetTitle": "Yami Yami no Mi",
    "badgeTitle": "Fruta do Diabo Logia",
    "targetCharacterId": "marshall-d-teach",
    "targetCharacterName": "Marshall D. Teach (Barba Negra)",
    "clues": [
      {
        "label": "Tipo da Fruta",
        "value": "Logia Especial (Fruta da Escuridão com atração gravitacional infinita)"
      },
      {
        "label": "Primeira Aparição / Arco",
        "value": "Arco Ilha de Banaro (Confronto contra Ace)"
      },
      {
        "label": "Forma Despertada / Usuário Anterior",
        "value": "Usuário Anterior: Thatch (Comandante da 4ª Divisão dos Piratas do Barba Branca)"
      }
    ],
    "contextExplanation": "Marshall D. Teach matou Thatch para roubar esta fruta, capaz de absorver qualquer coisa na escuridão e anular os poderes de outros usuários de Akuma no Mi ao toque."
  },
  {
    "id": "exc-dragon-ball-vegetto-do2dd",
    "animeSlug": "dragon-ball",
    "category": "Fusões & Transformações",
    "questionTitle": "Qual guerreiro resulta desta fusão lendária?",
    "targetTitle": "Son Goku + Vegeta (Brincos Potara)",
    "badgeTitle": "Fusão Potara",
    "targetCharacterId": "vegetto",
    "targetCharacterName": "Vegetto",
    "clues": [
      {
        "label": "Método de Fusão",
        "value": "Brincos Mágicos Potara concedidos pelos Kaiohshins"
      },
      {
        "label": "Duração e Condição",
        "value": "1 hora para mortais (permanente se envolver um Kaiohshin)"
      },
      {
        "label": "Batalha Chave",
        "value": "Batalha contra Majin Boo (com Gohan absorvido) e Zamasu Fundido em DBS"
      }
    ],
    "contextExplanation": "Vegetto é a fusão Potara de Goku e Vegeta, combinando o gênio tático de Vegeta e o poder ilimitado de Goku."
  },
  {
    "id": "exc-dragon-ball-piccolo-q9n9o",
    "animeSlug": "dragon-ball",
    "category": "Fusões & Transformações",
    "questionTitle": "Qual guerreiro resulta desta união Namekuseijin?",
    "targetTitle": "Piccolo + Kami-Sama (Fusão Namekuseijin)",
    "badgeTitle": "Assimilação Namekuseijin",
    "targetCharacterId": "piccolo",
    "targetCharacterName": "Piccolo",
    "clues": [
      {
        "label": "Método de Fusão",
        "value": "Assimilação espiritual mística da raça Namekuseijin"
      },
      {
        "label": "Condição e Duração",
        "value": "Fusão irreversível e eterna que reuniu as duas metades do Filho de Katas"
      },
      {
        "label": "Batalha Chave",
        "value": "Saga dos Androides (luta contra Imperfect Cell no Distrito de Ginger Town)"
      }
    ],
    "contextExplanation": "Ao se fundir com Kami-Sama, Piccolo se tornou o Super Namekuseijin mais poderoso da Terra."
  },
  {
    "id": "exc-dragon-ball-gotenks-neauw",
    "animeSlug": "dragon-ball",
    "category": "Fusões & Transformações",
    "questionTitle": "Qual guerreiro resulta desta fusão lendária?",
    "targetTitle": "Son Goten + Trunks (Dança Metamoru)",
    "badgeTitle": "Fusão Metamoru",
    "targetCharacterId": "gotenks",
    "targetCharacterName": "Gotenks",
    "clues": [
      {
        "label": "Método de Fusão",
        "value": "Dança Metamoru ensinada por Goku e supervisionada por Piccolo"
      },
      {
        "label": "Duração e Condição",
        "value": "30 minutos (em Super Saiyajin 3 a energia esgota em 5 minutos)"
      },
      {
        "label": "Batalha Chave",
        "value": "Confronto na Sala do Tempo contra Super Boo"
      }
    ],
    "contextExplanation": "Gotenks é a fusão de Goten e Trunks, célebre por suas técnicas cômicas como os Fantasmas Kamikaze e os Donuts Galácticos."
  },
  {
    "id": "exc-dragon-ball-son-goku-vlxdj",
    "animeSlug": "dragon-ball",
    "category": "Fusões & Transformações",
    "questionTitle": "A quem pertence esta transformação divina?",
    "targetTitle": "Instinto Superior (Ultra Instinct / Migatte no Gokui)",
    "badgeTitle": "Estado Divino dos Anjos",
    "targetCharacterId": "son-goku",
    "targetCharacterName": "Son Goku",
    "clues": [
      {
        "label": "Princípio do Poder",
        "value": "O corpo reage, esquiva e ataca de forma totalmente autônoma sem passar pelo raciocínio mental"
      },
      {
        "label": "Características Visuais",
        "value": "Cabelos prateados brilhantes, íris prateada e aura de calor cósmico"
      },
      {
        "label": "Estreia na História",
        "value": "Torneio do Poder na batalha final contra Jiren do Universo 11"
      }
    ],
    "contextExplanation": "O Instinto Superior é a técnica dos Deuses da Destruição e dos Anjos, dominada por Goku no ápice do Torneio do Poder."
  },
  {
    "id": "exc-bleach-byakuya-kuchiki-jbq9x",
    "animeSlug": "bleach",
    "category": "BankaiDLE",
    "questionTitle": "De quem é esta Bankai lendária?",
    "targetTitle": "Senbonzakura Kageyoshi",
    "badgeTitle": "Liberação de Bankai",
    "targetCharacterId": "byakuya-kuchiki",
    "targetCharacterName": "Byakuya Kuchiki",
    "clues": [
      {
        "label": "Divisão no Gotei 13",
        "value": "6ª Divisão (Capitão)"
      },
      {
        "label": "Comando de Liberação da Shikai",
        "value": "\"Espalhe-se (Chire)\""
      },
      {
        "label": "Forma e Mecânica da Bankai",
        "value": "Duas fileiras de espadas gigantes afundam no solo gerando milhões de pétalas de cerejeira laminadas"
      }
    ],
    "contextExplanation": "Byakuya Kuchiki comanda Senbonzakura Kageyoshi, cuja velocidade e poder dobram quando guiadas pelas mãos."
  },
  {
    "id": "exc-bleach-ichigo-kurosaki-w11xk",
    "animeSlug": "bleach",
    "category": "BankaiDLE",
    "questionTitle": "De quem é esta Bankai lendária?",
    "targetTitle": "Tensa Zangetsu",
    "badgeTitle": "Liberação de Bankai",
    "targetCharacterId": "ichigo-kurosaki",
    "targetCharacterName": "Ichigo Kurosaki",
    "clues": [
      {
        "label": "Divisão / Afiliação",
        "value": "Shinigami Substituto da Cidade de Karakura"
      },
      {
        "label": "Característica Única",
        "value": "Lâmina daito negra compacta que condensa toda a energia espiritual para velocidade extrema"
      },
      {
        "label": "Técnica Principal",
        "value": "Getsuga Tensho Negro (Kuroi Getsuga)"
      }
    ],
    "contextExplanation": "Ichigo Kurosaki condensou seu poder em Tensa Zangetsu durante o resgate de Rukia na Soul Society."
  },
  {
    "id": "exc-bleach-toshiro-hitsugaya-539qy",
    "animeSlug": "bleach",
    "category": "BankaiDLE",
    "questionTitle": "De quem é esta Bankai lendária?",
    "targetTitle": "Daiguren Hyorinmaru",
    "badgeTitle": "Liberação de Bankai",
    "targetCharacterId": "toshiro-hitsugaya",
    "targetCharacterName": "Toshiro Hitsugaya",
    "clues": [
      {
        "label": "Divisão no Gotei 13",
        "value": "10ª Divisão"
      },
      {
        "label": "Comando de Liberação da Shikai",
        "value": "\"Sente-se sobre os Céus Congelados (Sōten ni Zase)\""
      },
      {
        "label": "Mecânica das Flores de Gelo",
        "value": "Quando todas as 12 pétalas de gelo se esvaem, a Bankai atinge sua forma adulta suprema"
      }
    ],
    "contextExplanation": "Hitsugaya empunha a mais forte Zanpakuto do elemento gelo de toda a Soul Society."
  },
  {
    "id": "exc-bleach-as-nodt-gu2n1",
    "animeSlug": "bleach",
    "category": "BankaiDLE",
    "questionTitle": "A qual membro do Wandenreich pertence este Schrift?",
    "targetTitle": "Schrift F: The Fear (O Medo)",
    "badgeTitle": "Schrift Quincy",
    "targetCharacterId": "as-nodt",
    "targetCharacterName": "As Nodt",
    "clues": [
      {
        "label": "Grupo / Organização",
        "value": "Wandenreich / Sternritter F"
      },
      {
        "label": "Efeito e Princípio",
        "value": "Espinhos negros de reishi que induzem medo irracional primitivo no alvo, paralisando o coração"
      },
      {
        "label": "Forma Vollständig",
        "value": "Tatarforas (O Julgamento de Deus)"
      }
    ],
    "contextExplanation": "As Nodt recebeu o Schrift F de Yhwach, roubou temporariamente a Bankai de Byakuya e foi derrotado pela Bankai de Rukia."
  },
  {
    "id": "exc-jujutsu-kaisen-satoru-gojo-jctqx",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica inata suprema?",
    "targetTitle": "Técnica do Infinito (Mukagen / Ilimitado)",
    "badgeTitle": "Técnica Herdada",
    "targetCharacterId": "satoru-gojo",
    "targetCharacterName": "Satoru Gojo",
    "clues": [
      {
        "label": "Clã de Origem",
        "value": "Clã Gojo (requer os Seis Olhos / Rikugan para controle perfeito)"
      },
      {
        "label": "Variações Notáveis",
        "value": "Azul (Atração), Vermelho (Repulsão) e Vazio Roxo (Massa Imaginária)"
      },
      {
        "label": "Expansão de Domínio Associada",
        "value": "Muryōkusho (Vazio Imensurável que inunda a mente com dados infinitos)"
      }
    ],
    "contextExplanation": "Satoru Gojo herdou a técnica do Infinito, que torna impossível qualquer ataque tocá-lo ao desacelerar a distância infinitamente."
  },
  {
    "id": "exc-jujutsu-kaisen-ryomen-sukuna-0k1ub",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta Expansão de Domínio sem barreira?",
    "targetTitle": "Fukuma Mizushi (Santuário Malevolente)",
    "badgeTitle": "Expansão de Domínio",
    "targetCharacterId": "ryomen-sukuna",
    "targetCharacterName": "Ryomen Sukuna",
    "clues": [
      {
        "label": "Mecânica do Domínio",
        "value": "Domínio divino sem barreira fechada, cobrindo um raio de até 200 metros com pacto vinculativo"
      },
      {
        "label": "Técnicas de Ataque",
        "value": "Chuva contínua e incessante de Desmantelar (contra inanimados) e Cortar (contra seres com energia)"
      },
      {
        "label": "Usuário",
        "value": "O Rei das Maldições da Era Heian"
      }
    ],
    "contextExplanation": "O Fukuma Mizushi de Sukuna destrói tudo dentro de seu raio como uma verdadeira obra de arte divina e macabra."
  },
  {
    "id": "exc-jujutsu-kaisen-suguru-geto-1hvvo",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica inata?",
    "targetTitle": "Manipulação de Maldições (Jurei Sōju)",
    "badgeTitle": "Técnica Inata",
    "targetCharacterId": "suguru-geto",
    "targetCharacterName": "Suguru Geto",
    "clues": [
      {
        "label": "Método de Absorção",
        "value": "Consome espíritos amaldiçoados derrotados na forma de esferas negras que possuem sabor repugnante"
      },
      {
        "label": "Técnica Máxima",
        "value": "Uzumaki Supremo (condensa milhares de maldições e extrai suas técnicas inatas permanentemente)"
      },
      {
        "label": "Primeira Aparição",
        "value": "Jujutsu Kaisen 0 (durante o Desfile Noturno dos Cem Demônios)"
      }
    ],
    "contextExplanation": "Suguru Geto e posteriormente Kenjaku dominaram a Manipulação de Maldições para acumular exércitos sobrenaturais."
  },
  {
    "id": "exc-attack-on-titan-reiner-braun-02wju",
    "animeSlug": "attack-on-titan",
    "category": "Memórias dos Titãs",
    "questionTitle": "A quem pertence este Titã Original?",
    "targetTitle": "Titã Blindado (Armored Titan)",
    "badgeTitle": "Nove Titãs Originais",
    "targetCharacterId": "reiner-braun",
    "targetCharacterName": "Reiner Braun",
    "clues": [
      {
        "label": "Habilidade Primária",
        "value": "Placas endurecidas de armadura óssea que cobrem 99% do corpo resistindo a canhões normais"
      },
      {
        "label": "Origem do Portador",
        "value": "Unidade de Guerreiros Honorários de Marley (Liberio)"
      },
      {
        "label": "Momento Histórico",
        "value": "Rompeu a muralha interna de Maria no Distrito de Shiganshina no Ano 845"
      }
    ],
    "contextExplanation": "Reiner Braun era o portador do Titã Blindado, dividido entre sua identidade de soldado eldia e guerreiro de Marley."
  },
  {
    "id": "exc-attack-on-titan-bertholdt-hoover-yv9m2",
    "animeSlug": "attack-on-titan",
    "category": "Memórias dos Titãs",
    "questionTitle": "A quem pertence este Titã Original?",
    "targetTitle": "Titã Colossal (Colossus Titan)",
    "badgeTitle": "Nove Titãs Originais",
    "targetCharacterId": "bertholdt-hoover",
    "targetCharacterName": "Bertholdt Hoover",
    "clues": [
      {
        "label": "Estatura e Efeito",
        "value": "60 metros de altura com explosão semelhante a ogiva na transformação e emissão de vapor escaldante"
      },
      {
        "label": "Sucessão de Portadores",
        "value": "Portador Inicial: Bertholdt Hoover / Portador Posterior: Armin Arlert"
      },
      {
        "label": "Momento Histórico",
        "value": "Sua cabeça surgiu acima da Muralha Maria no Ano 845, dando início ao conflito"
      }
    ],
    "contextExplanation": "O Titã Colossal é o \"Deus da Destruição\", transferido para Armin após a sangrenta Batalha de Shiganshina."
  },
  {
    "id": "exc-attack-on-titan-zeke-jaeger-pl9yp",
    "animeSlug": "attack-on-titan",
    "category": "Memórias dos Titãs",
    "questionTitle": "A quem pertence este Titã Original?",
    "targetTitle": "Titã Bestial (Beast Titan)",
    "badgeTitle": "Nove Titãs Originais",
    "targetCharacterId": "zeke-jaeger",
    "targetCharacterName": "Zeke Jaeger",
    "clues": [
      {
        "label": "Aparência e Habilidade",
        "value": "Forma simiesca de 17 metros com arremessos supersônicos de pedras estilhaçadas com precisão de artilharia"
      },
      {
        "label": "Linhagem Sanguínea",
        "value": "Sangue Real Fritz/Reiss herdado de sua mãe Dina Fritz"
      },
      {
        "label": "Grito Especial",
        "value": "Transforma qualquer Eldiano que ingeriu seu fluido espinhal em Titã Puro sob seu comando"
      }
    ],
    "contextExplanation": "Zeke Jaeger usou suas habilidades de sangue real e intelecto para dizimar a Tropa de Exploração na Batalha de Shiganshina."
  },
  {
    "id": "exc-naruto-minato-namikaze-vnayo",
    "animeSlug": "naruto",
    "category": "Pergaminho Ninja",
    "questionTitle": "De quem é este Kinjutsu / Técnica Lendária?",
    "targetTitle": "Hiraishin no Jutsu (Técnica do Deus Voador do Trovão)",
    "badgeTitle": "Jutsu Espaço-Tempo",
    "targetCharacterId": "minato-namikaze",
    "targetCharacterName": "Minato Namikaze",
    "clues": [
      {
        "label": "Criador e Aprimorador",
        "value": "Criado pelo Segundo Hokage (Tobirama) e aperfeiçoado pelo Quarto Hokage (Minato Namikaze)"
      },
      {
        "label": "Requisito de Ativação",
        "value": "Marcação com fórmula / selo especial de teletransporte instantâneo em kunais ou corpos"
      },
      {
        "label": "Fama Mundial",
        "value": "Concedeu o apelido de \"Relâmpago Amarelo de Konoha\" na Terceira Guerra Ninja"
      }
    ],
    "contextExplanation": "O Hiraishin permite ao usuário se teletransportar instantaneamente para qualquer local marcado, superando a velocidade da luz."
  },
  {
    "id": "exc-naruto-kakashi-hatake-ndisv",
    "animeSlug": "naruto",
    "category": "Pergaminho Ninja",
    "questionTitle": "A quem pertence este Doujutsu / Ninjutsu?",
    "targetTitle": "Kamui (Distorção Espaço-Temporal do Mangekyo)",
    "badgeTitle": "Kekkei Genkai Doujutsu",
    "targetCharacterId": "kakashi-hatake",
    "targetCharacterName": "Kakashi Hatake",
    "clues": [
      {
        "label": "Doujutsu Necessário",
        "value": "Mangekyo Sharingan (Olho esquerdo para longo alcance / Olho direito para intangibilidade pessoal)"
      },
      {
        "label": "Dimensão Própria",
        "value": "Dimensão do Kamui de blocos flutuantes onde nada do mundo exterior pode penetrar"
      },
      {
        "label": "Portadores Gêmeos",
        "value": "Obito Uchiha e Kakashi Hatake"
      }
    ],
    "contextExplanation": "O Kamui distorce o espaço e transfere matéria diretamente entre a dimensão real e a dimensão dimensional particular do Sharingan de Obito."
  },
  {
    "id": "exc-naruto-naruto-uzumaki-ewlps",
    "animeSlug": "naruto",
    "category": "Pergaminho Ninja",
    "questionTitle": "De quem é este Ninjutsu de Rank S?",
    "targetTitle": "Fuuton: Rasenshuriken",
    "badgeTitle": "Ninjutsu de Vento",
    "targetCharacterId": "naruto-uzumaki",
    "targetCharacterName": "Naruto Uzumaki",
    "clues": [
      {
        "label": "Transformação da Natureza",
        "value": "Elemento Vento (Fuuton) infundido na forma esférica do Rasengan"
      },
      {
        "label": "Efeito Celular",
        "value": "Milhões de micro-lâminas de vento cortam a rede de canais de chakra no nível celular"
      },
      {
        "label": "Primeira Aparição",
        "value": "Batalha contra Kakuzu da Akatsuki"
      }
    ],
    "contextExplanation": "Naruto Uzumaki completou o jutsu que nem mesmo Minato ou Kakashi conseguiram: infundir elemento natural no Rasengan."
  },
  {
    "id": "exc-demon-slayer-giyu-tomioka-3fdki",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações",
    "questionTitle": "A quem pertence esta Postura de Respiração?",
    "targetTitle": "11ª Forma: Calmaria (Nagi)",
    "badgeTitle": "Respiração da Água",
    "targetCharacterId": "giyu-tomioka",
    "targetCharacterName": "Giyu Tomioka",
    "clues": [
      {
        "label": "Derivação Base",
        "value": "Respiração da Água (uma das cinco respirações primárias derivadas do Sol)"
      },
      {
        "label": "Autoria da Postura",
        "value": "Forma exclusiva criada pelo próprio Hashira da Água, inexistente nos registros antigos"
      },
      {
        "label": "Efeito de Combate",
        "value": "Cessa todo o movimento perceptível do usuário e anula qualquer golpe inimigo que entra no raio de alcance"
      }
    ],
    "contextExplanation": "Giyu Tomioka criou a Calmaria para desviar de qualquer ataque veloz, demonstrada no Monte Natagumo contra Rui."
  },
  {
    "id": "exc-demon-slayer-akaza-qp9e9",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações",
    "questionTitle": "A quem pertence este Kekkijutsu de Sangue?",
    "targetTitle": "Bússola Destrutiva (Hakai Satsu: Rashin)",
    "badgeTitle": "Arte Demoníaca de Sangue",
    "targetCharacterId": "akaza",
    "targetCharacterName": "Akaza",
    "clues": [
      {
        "label": "Patente nos Doze Kizuki",
        "value": "Lua Superior Três (Jogen no San)"
      },
      {
        "label": "Mecânica do Efeito",
        "value": "Detecta o \"espírito de luta\" (Touki) de qualquer oponente calculando seus movimentos com precisão matemática perfeita"
      },
      {
        "label": "Batalha Emblemática",
        "value": "Trem do Infinito (contra o Hashira das Chamas Kyojuro Rengoku)"
      }
    ],
    "contextExplanation": "Akaza utiliza a Bússola Destrutiva de artes marciais Soryu desenvolvidas ainda em sua vida humana."
  },
  {
    "id": "exc-hunter-x-hunter-kurapika-o40yf",
    "animeSlug": "hunter-x-hunter",
    "category": "Regras do Nen",
    "questionTitle": "A quem pertence esta Habilidade de Hatsu com Restrição?",
    "targetTitle": "Emperor Time (Tempo do Imperador)",
    "badgeTitle": "Especialização com Juramento",
    "targetCharacterId": "kurapika",
    "targetCharacterName": "Kurapika",
    "clues": [
      {
        "label": "Gatilho de Ativação",
        "value": "Olhos Escarlates da Tribo Kurta brilhando ativamente"
      },
      {
        "label": "Efeito e Restrição",
        "value": "100% de afinidade e eficiência em todas as 5 categorias de Nen ao custo de 1 hora de vida por segundo ativo"
      },
      {
        "label": "Conjunto de Armas",
        "value": "Cinco correntes com funções distintas (incluindo Chain Jail restrita à Trupe Fantasma)"
      }
    ],
    "contextExplanation": "Kurapika colocou uma lâmina de Nen em seu próprio coração para punir a Trupe Fantasma sob juramento de morte."
  },
  {
    "id": "exc-hunter-x-hunter-hisoka-morow-9nf3h",
    "animeSlug": "hunter-x-hunter",
    "category": "Regras do Nen",
    "questionTitle": "A quem pertence esta Habilidade de Nen versátil?",
    "targetTitle": "Bungee Gum (Goma Elástica)",
    "badgeTitle": "Transformação de Nen",
    "targetCharacterId": "hisoka-morow",
    "targetCharacterName": "Hisoka Morow (O Mágico)",
    "clues": [
      {
        "label": "Propriedades do Nen",
        "value": "Possui as propriedades combinadas tanto de borracha quanto de chiclete"
      },
      {
        "label": "Técnica Complementar",
        "value": "Textura Surpresa (Texture Surprise para forjar ferimentos e tatuagens)"
      },
      {
        "label": "Usuário",
        "value": "Mágico e lutador sádico do Exame Hunter e da Arena Celestial"
      }
    ],
    "contextExplanation": "Hisoka Morow usa a Bungee Gum para puxar adversários, refletir projéteis e até reiniciar os próprios batimentos cardíacos."
  },
  {
    "id": "exc-chainsaw-man-makima-7c725",
    "animeSlug": "chainsaw-man",
    "category": "MedoDLE",
    "questionTitle": "Qual entidade encarna este medo primordial?",
    "targetTitle": "O Medo do Controle (Control Devil)",
    "badgeTitle": "Quatro Cavaleiros do Apocalipse",
    "targetCharacterId": "makima",
    "targetCharacterName": "Makima (Demônio do Controle)",
    "clues": [
      {
        "label": "Tipo de Entidade",
        "value": "Demônio Puro em forma humana com olhos circulares amarelos concêntricos"
      },
      {
        "label": "Habilidade Primária",
        "value": "Controle absoluto sobre qualquer ser que ela considere inferior a si mesma"
      },
      {
        "label": "Alvo de Obsessão",
        "value": "O Homem-Motosserra (Chainsaw Man / Pochita)"
      }
    ],
    "contextExplanation": "Makima governou a Segurança Pública para tentar quebrar o contrato de Denji e controlar o poder do Chainsaw Man."
  },
  {
    "id": "exc-chainsaw-man-reze-tzieo",
    "animeSlug": "chainsaw-man",
    "category": "MedoDLE",
    "questionTitle": "A quem pertence este poder demoníaco?",
    "targetTitle": "O Medo da Bomba (Bomb Devil)",
    "badgeTitle": "Híbrido de Demônio",
    "targetCharacterId": "reze",
    "targetCharacterName": "Reze (Bomb Girl)",
    "clues": [
      {
        "label": "Gatilho de Transformação",
        "value": "Puxar o pino de granada localizado na garganta"
      },
      {
        "label": "Origem",
        "value": "Agente da União Soviética treinada desde a infância"
      },
      {
        "label": "Arco de Aparição",
        "value": "Arco da Garota-Bomba (Bomb Girl Arc)"
      }
    ],
    "contextExplanation": "Reze seduziu Denji em Tóquio para roubar seu coração do Chainsaw Man com explosões devastadoras."
  },
  {
    "id": "exc-solo-leveling-igris-b0qp2",
    "animeSlug": "solo-leveling",
    "category": "Exército de Sombras",
    "questionTitle": "Qual cavaleiro leal integra o Exército de Sombras?",
    "targetTitle": "Igris, o Cavaleiro Sangrento (Blood-Red Commander Igris)",
    "badgeTitle": "Comandante das Sombras",
    "targetCharacterId": "igris",
    "targetCharacterName": "Igris",
    "clues": [
      {
        "label": "Identidade em Vida",
        "value": "Guardião do Trono na Dungeon de Mudança de Classe"
      },
      {
        "label": "Arma e Habilidade",
        "value": "Espada longa de duas mãos e posterior domínio de relâmpagos arcanos"
      },
      {
        "label": "Patente no Exército",
        "value": "Cavaleiro de Elite promovido a Comandante e General"
      }
    ],
    "contextExplanation": "Igris foi o primeiro grande chefe erguido por Sung Jinwoo, famoso por sua lealdade inabalável e elegância com a espada."
  },
  {
    "id": "exc-solo-leveling-beru-2yvjc",
    "animeSlug": "solo-leveling",
    "category": "Exército de Sombras",
    "questionTitle": "Qual monstro insaciável virou a Sombra mais forte?",
    "targetTitle": "Beru, o Rei Formiga (Shadow Beru)",
    "badgeTitle": "Marechal das Sombras",
    "targetCharacterId": "beru",
    "targetCharacterName": "Beru",
    "clues": [
      {
        "label": "Identidade em Vida",
        "value": "Rei Formiga da Dungeon de Rank S na Ilha de Jeju que massacrou os caçadores coreanos e japoneses"
      },
      {
        "label": "Habilidades Notáveis",
        "value": "Cura regenerativa, voo supersônico, veneno e absorção de habilidades dos inimigos que devora"
      },
      {
        "label": "Personalidade como Sombra",
        "value": "Devoção fanática por Jinwoo e fã de doramas coreanos na TV"
      }
    ],
    "contextExplanation": "Beru foi erguido por Jinwoo no clímax do Raid da Ilha de Jeju para ser o mais feroz guerreiro do Exército das Sombras."
  },
  {
    "id": "exc-my-hero-academia-izuku-midoriya-9k91t",
    "animeSlug": "my-hero-academia",
    "category": "Individualidades",
    "questionTitle": "A quem pertence esta Individualidade lendária?",
    "targetTitle": "One For All",
    "badgeTitle": "Individualidade Acumuladora",
    "targetCharacterId": "izuku-midoriya",
    "targetCharacterName": "Izuku Midoriya (Deku)",
    "clues": [
      {
        "label": "Tipo de Individualidade",
        "value": "Emissora / Mutável por transferência voluntária de DNA"
      },
      {
        "label": "Fatores Combinados",
        "value": "Acumulação de força física geracional + Transferência de individualidades dos portadores anteriores"
      },
      {
        "label": "9º Portador",
        "value": "Izuku Midoriya (Deku)"
      }
    ],
    "contextExplanation": "O One For All foi passado de geração em geração para cultivar poder e derrubar o império sombrio de All For One."
  },
  {
    "id": "exc-my-hero-academia-tomura-shigaraki-qsf6b",
    "animeSlug": "my-hero-academia",
    "category": "Individualidades",
    "questionTitle": "A quem pertence esta Individualidade destrutiva?",
    "targetTitle": "Decay (Desintegração)",
    "badgeTitle": "Individualidade Emissora",
    "targetCharacterId": "tomura-shigaraki",
    "targetCharacterName": "Tomura Shigaraki (Tenko Shimura)",
    "clues": [
      {
        "label": "Condição Inicial",
        "value": "Tocar o alvo com todos os cinco dedos da mão"
      },
      {
        "label": "Evolução no Despertar",
        "value": "Desintegração em cadeia que se propaga por toda a cidade através do solo"
      },
      {
        "label": "Líder de Facção",
        "value": "Liga dos Vilões / Frente de Libertação Paranormal"
      }
    ],
    "contextExplanation": "Tomura Shigaraki despertou o Decay em sua infância trágica, transformando em cinzas tudo o que seus dedos tocam."
  },
  {
    "id": "exc-black-clover-asta-ychge",
    "animeSlug": "black-clover",
    "category": "Grimório Incompleto",
    "questionTitle": "A quem pertence este grimório de cinco folhas?",
    "targetTitle": "Anti-Magia & Espadas Matadoras de Demônios",
    "badgeTitle": "Grimório de 5 Folhas",
    "targetCharacterId": "asta",
    "targetCharacterName": "Asta",
    "clues": [
      {
        "label": "Trevo do Grimório",
        "value": "Cinco Folhas (Dentro da quinta folha reside um demônio: Liebe)"
      },
      {
        "label": "Propriedade Única",
        "value": "Anula, rebate e corta qualquer tipo de feitiço ou energia mágica"
      },
      {
        "label": "Esquadrão",
        "value": "Touros Negros (Black Bulls)"
      }
    ],
    "contextExplanation": "Asta não tem um pingo de mana no corpo, o que lhe permite empunhar as espadas de ferro negro imbuídas com a Anti-Magia."
  },
  {
    "id": "exc-blue-lock-yoichi-isagi-9hyjg",
    "animeSlug": "blue-lock",
    "category": "Fórmula do Gol",
    "questionTitle": "De quem é esta fórmula do gol?",
    "targetTitle": "Chute Direto no Ponto Cego (Direct Shot)",
    "badgeTitle": "Arma do Egoísta",
    "targetCharacterId": "yoichi-isagi",
    "targetCharacterName": "Yoichi Isagi",
    "clues": [
      {
        "label": "Leitura de Jogo",
        "value": "Metavisão (Spatial Awareness) mapeando os pontos cegos e rotas de todos os jogadores em campo"
      },
      {
        "label": "Finalização",
        "value": "Chute de primeira sem dominar a bola para impedir qualquer interferência do zagueiro"
      },
      {
        "label": "Momento Histórico",
        "value": "Gol da vitória contra a Seleção Japonesa Sub-20 no Estádio Nacional"
      }
    ],
    "contextExplanation": "Yoichi Isagi combinou o Chute Direto com a Metavisão para se tornar o protagonista supremo do projeto Blue Lock."
  },
  {
    "id": "exc-dandadan-turbo-vovó-cpmgw",
    "animeSlug": "dandadan",
    "category": "Arquivo do Oculto",
    "questionTitle": "Qual entidade sobrenatural assombra este arquivo?",
    "targetTitle": "Turbo Baba (A Vovó Turbo de Shonan)",
    "badgeTitle": "Yokai de Alta Velocidade",
    "targetCharacterId": "turbo-vovó",
    "targetCharacterName": "Turbo Vovó",
    "clues": [
      {
        "label": "Local da Ocorrência",
        "value": "Túnel assombrado de Shonan"
      },
      {
        "label": "Habilidade Primária",
        "value": "Velocidade de 100 km/h e maldição que rouba partes íntimas masculinas"
      },
      {
        "label": "Forma Atual",
        "value": "Espírito aprisionado no corpo de um gato maneki-neko de porcelana"
      }
    ],
    "contextExplanation": "Turbo Baba amaldiçoou Okarun no início da história, mas teve sua consciência selada em um boneco de gato por Vovó Seiko."
  },
  {
    "id": "exc-fairy-tail-natsu-dragneel-vdj91",
    "animeSlug": "fairy-tail",
    "category": "Conexões de Guilda",
    "questionTitle": "A quem pertence esta magia da Fairy Tail?",
    "targetTitle": "Dragon Slayer do Fogo",
    "badgeTitle": "Magia Perdida dos Dragões",
    "targetCharacterId": "natsu-dragneel",
    "targetCharacterName": "Natsu Dragneel (Salamander / E.N.D.)",
    "clues": [
      {
        "label": "Dragão Mentor",
        "value": "Igneel, o Rei dos Dragões de Fogo"
      },
      {
        "label": "Propriedade de Combate",
        "value": "Devora chamas externas para regenerar vigor e força física"
      },
      {
        "label": "Marca da Guilda",
        "value": "Ombro direito em cor vermelha brilhante"
      }
    ],
    "contextExplanation": "Natsu Dragneel é o Dragon Slayer do Fogo e a identidade do demônio supremo E.N.D. criado por Zeref."
  },
  {
    "id": "exc-frieren-frieren-17mnv",
    "animeSlug": "frieren",
    "category": "Grimório de Viagem",
    "questionTitle": "A quem pertence este feitiço de combate lendário?",
    "targetTitle": "Zoltraak (Magia Assassina Original / Magia de Ataque Geral)",
    "badgeTitle": "Grimório da Era Mítica",
    "targetCharacterId": "frieren",
    "targetCharacterName": "Frieren",
    "clues": [
      {
        "label": "Origem Histórica",
        "value": "Criada pelo demônio Qual como feitiço devastador, decifrada e adaptada pela humanidade como feitiço de ataque padrão"
      },
      {
        "label": "Mecânica do Feitiço",
        "value": "Feixe concentrado de mana pura que perfura escudos e matéria com velocidade e precisão absurda"
      },
      {
        "label": "Usuária e Especialista",
        "value": "A maga elfa do grupo dos heróis que derrotou o Rei Demônio"
      }
    ],
    "contextExplanation": "Frieren dedicou décadas ao estudo do Zoltraak para neutralizar os demônios que ameaçavam o continente."
  },
  {
    "id": "exc-fullmetal-alchemist-roy-mustang-d3x84",
    "animeSlug": "fullmetal-alchemist",
    "category": "Troca Equivalente",
    "questionTitle": "A quem pertence esta alquimia militar?",
    "targetTitle": "Alquimia das Chamas (Flame Alchemy)",
    "badgeTitle": "Alquimista Federal",
    "targetCharacterId": "roy-mustang",
    "targetCharacterName": "Roy Mustang (Alquimista das Chamas)",
    "clues": [
      {
        "label": "Equipamento Especial",
        "value": "Luvas de tecido de ignição gravadas com o círculo de transmutação"
      },
      {
        "label": "Mecânica Química",
        "value": "Altera a concentração de oxigênio no ar e gera faísca ao estalar os dedos"
      },
      {
        "label": "Posto Militar",
        "value": "Coronel das Forças Armadas de Amestris com ambição de virar Führer"
      }
    ],
    "contextExplanation": "Roy Mustang domina a Alquimia das Chamas herdada do pai de Riza Hawkeye, incinerando homúnculos como Envy e Lust."
  },
  {
    "id": "exc-haikyuu-shoyo-hinata-ugexd",
    "animeSlug": "haikyuu",
    "category": "RallyDLE",
    "questionTitle": "Quem executa este ataque rápido milimétrico?",
    "targetTitle": "Ataque Rápido Louco / Monstruoso (Minus Tempo)",
    "badgeTitle": "Jogada de Ponto Decisivo",
    "targetCharacterId": "shoyo-hinata",
    "targetCharacterName": "Shōyō Hinata",
    "clues": [
      {
        "label": "Time / Colégio",
        "value": "Colégio Karasuno (Os Corvos)"
      },
      {
        "label": "Mecânica da Jogada",
        "value": "O atacante salta de olhos fechados com velocidade total e a bola do levantador encontra a mão no ar"
      },
      {
        "label": "Posição dos Atletas",
        "value": "Levantador prodígio + Bloqueador Central veloz de baixa estatura"
      }
    ],
    "contextExplanation": "A dupla Hinata e Kageyama revolucionou o ataque do Karasuno com a cortada em tempo negativo."
  },
  {
    "id": "exc-jojos-bizarre-adventure-jotaro-kujo-m2u51",
    "animeSlug": "jojos-bizarre-adventure",
    "category": "StandLab",
    "questionTitle": "Qual Stand e usuário correspondem a este poder?",
    "targetTitle": "Star Platinum: The World",
    "badgeTitle": "Stand de Curto Alcance",
    "targetCharacterId": "jotaro-kujo",
    "targetCharacterName": "Jotaro Kujo",
    "clues": [
      {
        "label": "Tipo de Stand",
        "value": "Curto alcance com força, velocidade e precisão sobre-humanas"
      },
      {
        "label": "Poder Máximo",
        "value": "Capacidade de paralisar o fluxo do tempo por até 5 segundos"
      },
      {
        "label": "Grito de Ataque",
        "value": "\"ORA ORA ORA ORA!\""
      }
    ],
    "contextExplanation": "Jotaro Kujo despertou Star Platinum em Stardust Crusaders, dominando a parada do tempo na luta contra DIO."
  },
  {
    "id": "exc-kaiju-no-8-kafka-hibino-jvnf1",
    "animeSlug": "kaiju-no-8",
    "category": "Alarme Kaiju",
    "questionTitle": "Qual indivíduo corresponde a este registro de calamidade?",
    "targetTitle": "Kaiju Nº 8 (Fortitude 9.8)",
    "badgeTitle": "Kaiju Identificado",
    "targetCharacterId": "kafka-hibino",
    "targetCharacterName": "Kafka Hibino",
    "clues": [
      {
        "label": "Nível de Fortitude",
        "value": "9.8 (o nível mais alto já registrado nos anais da Força de Defesa)"
      },
      {
        "label": "Identidade Humana",
        "value": "Faxineiro de carcaças da Monster Sweeper integrado à Terceira Divisão"
      },
      {
        "label": "Habilidade Corporal",
        "value": "Golpes que vaporizam kaijus gigantescos com emissão explosiva de energia"
      }
    ],
    "contextExplanation": "Kafka Hibino engoliu um pequeno kaiju parasita que fundiu com seu corpo, tornando-o o temido Kaiju Nº 8."
  },
  {
    "id": "exc-nanatsu-no-taizai-meliodas-775fu",
    "animeSlug": "nanatsu-no-taizai",
    "category": "Pecados & Emblemas",
    "questionTitle": "Qual membro dos Sete Pecados Capitais porta este emblema?",
    "targetTitle": "Pecado da Ira do Dragão & Espada Lostvayne",
    "badgeTitle": "Sete Pecados Capitais",
    "targetCharacterId": "meliodas",
    "targetCharacterName": "Meliodas",
    "clues": [
      {
        "label": "Símbolo Tatuado",
        "value": "Dragão Ouroboros no braço esquerdo"
      },
      {
        "label": "Habilidade Mágica",
        "value": "Full Counter (Reflexão Total que devolve feitiços com mais que o dobro da potência)"
      },
      {
        "label": "Verdadeira Linhagem",
        "value": "Líder dos Dez Mandamentos e filho primogênito do Rei Demônio"
      }
    ],
    "contextExplanation": "Meliodas lidera os Sete Pecados Capitais e carrega a maldição da imortalidade por seu amor por Elizabeth."
  },
  {
    "id": "exc-one-punch-man-saitama-0go6b",
    "animeSlug": "one-punch-man",
    "category": "Registro de Heróis",
    "questionTitle": "A quem pertence este poder avassalador?",
    "targetTitle": "Soco Sério (Serious Punch)",
    "badgeTitle": "Classe B / Herói por Hobby",
    "targetCharacterId": "saitama",
    "targetCharacterName": "Saitama",
    "clues": [
      {
        "label": "Classe na Associação",
        "value": "Iniciou na Classe C e avançou para a Classe A após a Batalha dos Monstros"
      },
      {
        "label": "Rotina de Treinamento",
        "value": "100 flexões, 100 abdominais, 100 agachamentos e corrida de 10km todos os dias"
      },
      {
        "label": "Efeito em Combate",
        "value": "Derrota deuses e ameaças cósmicas com um único golpe sem esforço aparente"
      }
    ],
    "contextExplanation": "Saitama quebrou seu Limitador biológico através de pura determinação e busca desesperadamente um oponente digno."
  },
  {
    "id": "exc-record-of-ragnarok-jack-o-estripador-1lybk",
    "animeSlug": "record-of-ragnarok",
    "category": "VölundrDLE",
    "questionTitle": "Qual humano forjou este Völundr com a Valquíria?",
    "targetTitle": "Luvas de Transformação Divina (Hlökk + Humano)",
    "badgeTitle": "Völundr do Ragnarok",
    "targetCharacterId": "jack-o-estripador",
    "targetCharacterName": "Jack, o Estripador",
    "clues": [
      {
        "label": "Valquíria Parceira",
        "value": "Hlökk (A 11ª irmã das Valquírias forçada sob coerção)"
      },
      {
        "label": "Habilidade da Arma",
        "value": "Qualquer objeto inanimado tocado pelas luvas se transforma em arma divina capaz de ferir deuses"
      },
      {
        "label": "Oponente Divino",
        "value": "Hércules (Heracles, Deus da Força) na 4ª Rodada em Londres"
      }
    ],
    "contextExplanation": "Jack, o Estripador utilizou suas luvas para transformar toda a cidade de Londres em uma armadilha letal contra Hércules."
  },
  {
    "id": "exc-romance-kaguya-shinomiya-zzs4h",
    "animeSlug": "romance",
    "category": "Confissões de Romance",
    "questionTitle": "Qual protagonista comanda esta guerra do amor?",
    "targetTitle": "Guerra Intelectual de Confissão de Amor",
    "badgeTitle": "Conselho Estudantil Shuchiin",
    "targetCharacterId": "kaguya-shinomiya",
    "targetCharacterName": "Kaguya Shinomiya",
    "clues": [
      {
        "label": "Obra",
        "value": "Kaguya-sama: Love Is War"
      },
      {
        "label": "Lema Filosófico",
        "value": "\"O amor é uma guerra. Aquele que se confessa primeiro é o perdedor!\""
      },
      {
        "label": "Papel no Conselho",
        "value": "Vice-Presidente herdeira do Conglomerado Shinomiya"
      }
    ],
    "contextExplanation": "Kaguya Shinomiya e Miyuki Shirogane armam esquemas diários para obrigar o outro a declarar seus sentimentos."
  },
  {
    "id": "exc-shangri-la-frontier-sunraku-kpkcp",
    "animeSlug": "shangri-la-frontier",
    "category": "Diário de Raid",
    "questionTitle": "Qual jogador lendário desafiou este monstro único?",
    "targetTitle": "Maldição de Lycagon, o Predador Noturno",
    "badgeTitle": "Monstro Único de Shanfro",
    "targetCharacterId": "sunraku",
    "targetCharacterName": "Sunraku (Rakuro Hizutome)",
    "clues": [
      {
        "label": "Condição de Batalha",
        "value": "Marcado com cicatrizes pretas no torso e pernas que impedem equipar armaduras nessas partes"
      },
      {
        "label": "Estilo de Combate",
        "value": "Dois punhais gêmeos, cabeça de pássaro azul e evasão com parry milimétrico"
      },
      {
        "label": "Origem como Jogador",
        "value": "Caçador de lixo de jogos bugados (Kusoge Hunter)"
      }
    ],
    "contextExplanation": "Sunraku enfrentou Lycagon logo nas primeiras horas de jogo, ganhando a maldição que o tornou famoso em todo o servidor."
  },
  {
    "id": "exc-sword-art-online-kirito-f2ljc",
    "animeSlug": "sword-art-online",
    "category": "Sword Skills",
    "questionTitle": "A quem pertence esta Sword Skill exclusiva de SAO?",
    "targetTitle": "Starburst Stream (Sequência de 16 Golpes)",
    "badgeTitle": "Habilidade Única: Empunhadura Dupla",
    "targetCharacterId": "kirito",
    "targetCharacterName": "Kirito (Kazuto Kirigaya / O Espadachim Negro)",
    "clues": [
      {
        "label": "Mundo Virtual",
        "value": "Aincrad (Sword Art Online Original)"
      },
      {
        "label": "Armas Utilizadas",
        "value": "Elucidator (espada preta) e Dark Repulser (espada verde de cristal)"
      },
      {
        "label": "Batalha Emblemática",
        "value": "74º Andar contra o Chefe The Gleam Eyes salvando o exército"
      }
    ],
    "contextExplanation": "Kirito recebeu a habilidade única Dual Blades por ter o melhor tempo de reação entre os 10.000 jogadores de SAO."
  },
  {
    "id": "exc-tensei-shitara-slime-datta-ken-benimaru-mingf",
    "animeSlug": "tensei-shitara-slime-datta-ken",
    "category": "Nomeação & Evolução",
    "questionTitle": "Qual guerreiro Kijin evoluiu sob o comando de Rimuru?",
    "targetTitle": "Evolução de Ogre para Kijin (Chamas Negras)",
    "badgeTitle": "Nomeação de Rimuru",
    "targetCharacterId": "benimaru",
    "targetCharacterName": "Benimaru",
    "clues": [
      {
        "label": "Espécie Original",
        "value": "Príncipe dos Ogres cujo vilarejo foi destruído por Orcs"
      },
      {
        "label": "Nome Concedido",
        "value": "Recebeu o nome \"Benimaru\", ganhando chamas negras ardentes e chifre vermelho refinado"
      },
      {
        "label": "Função na Federação",
        "value": "Comandante Supremo das Forças Militares de Tempest"
      }
    ],
    "contextExplanation": "Benimaru tornou-se o general de Rimuru e um dos Doze Lordes Protetores da Federação de Tempest."
  },
  {
    "id": "exc-tokyo-ghoul-ken-kaneki-yad75",
    "animeSlug": "tokyo-ghoul",
    "category": "Dossiê Ghoul",
    "questionTitle": "A quem pertence este Kagune Rinkaku?",
    "targetTitle": "Kagune Rinkaku / A Centopeia (Centipede Kakuja)",
    "badgeTitle": "Ghoul de Um Olho (Rank SS / SSS)",
    "targetCharacterId": "ken-kaneki",
    "targetCharacterName": "Ken Kaneki (Haise Sasaki / O Rei Caolho)",
    "clues": [
      {
        "label": "Tipo de Kagune",
        "value": "Rinkaku com quatro tentáculos avermelhados de escamas brilhantes"
      },
      {
        "label": "Origem do Órgão Kakuhou",
        "value": "Transplante de órgãos de Rize Kamishiro por Dr. Kanou"
      },
      {
        "label": "Máscara e Codinome",
        "value": "Máscara de couro preta com zíper nos dentes / O Ghoul de Um Olho (Eye Patch)"
      }
    ],
    "contextExplanation": "Kaneki Ken tornou-se um meio-ghoul após o acidente com vigas de aço e desenvolveu o Kakuja da Centopeia sob tortura de Jason."
  },
  {
    "id": "exc-witch-hat-atelier-coco-jf63d",
    "animeSlug": "witch-hat-atelier",
    "category": "Oficina de Glifos",
    "questionTitle": "Qual jovem aprendiz desenhou este milagre de glifos?",
    "targetTitle": "Magia de Voo das Botas Aladas de Vento",
    "badgeTitle": "Glifo de Atelier",
    "targetCharacterId": "coco",
    "targetCharacterName": "Coco",
    "clues": [
      {
        "label": "Origem da Bruxa",
        "value": "Menina não-nascida no meio mágico que descobriu os segredos do desenho de tinta de prata"
      },
      {
        "label": "Mestre do Atelier",
        "value": "Qifrey, o bruxo de capa escura"
      },
      {
        "label": "Sonho e Objetivo",
        "value": "Descobrir o contra-feitiço para reverter a petrificação de sua mãe"
      }
    ],
    "contextExplanation": "Coco descobriu por acaso o segredo da magia desenhada e busca restaurar sua mãe petrificada."
  },
  {
    "id": "exc-berserk-guts-ug7lw",
    "animeSlug": "berserk",
    "category": "Brasões & Alianças",
    "questionTitle": "A quem pertence este legado de ferro e sangue?",
    "targetTitle": "A Espada Dragonslayer & A Marca do Sacrifício",
    "badgeTitle": "Espadachim Negro",
    "targetCharacterId": "guts",
    "targetCharacterName": "Guts",
    "clues": [
      {
        "label": "Grupo de Origem",
        "value": "Capitão da Tropa de Assalto do Bando do Falcão na Era de Ouro"
      },
      {
        "label": "Arma Lendária",
        "value": "Dragonslayer forjada pelo ferreiro Godo (uma gigantesca chapa de ferro maciço de 200kg)"
      },
      {
        "label": "Maldição Gravada",
        "value": "Marca do Sacrifício no pescoço atraindo demônios e almas penadas todas as noites"
      }
    ],
    "contextExplanation": "Guts sobreviveu ao Eclipse de Griffith e vaga pelo mundo combatendo apóstolos e a Mão de Deus."
  },
  {
    "id": "exc-cyberpunk-edgerunners-david-martinez-lxzea",
    "animeSlug": "cyberpunk-edgerunners",
    "category": "Conexões de Night City",
    "questionTitle": "A qual edgerunner lendário pertence este implante militar?",
    "targetTitle": "Cyberware Sandevistan Militar",
    "badgeTitle": "Implante Cibernético Militar",
    "targetCharacterId": "david-martinez",
    "targetCharacterName": "David Martinez",
    "clues": [
      {
        "label": "Tipo de Implante",
        "value": "Acelerador neural Sandevistan de grau militar instalado na coluna vertebral"
      },
      {
        "label": "Distrito de Origem",
        "value": "Santo Domingo / Rancho Coronado (Night City)"
      },
      {
        "label": "Parceira de Netrunning",
        "value": "Lucy (Kushinada), a netrunner com sonho de viajar para a Lua"
      }
    ],
    "contextExplanation": "David Martinez instalou o Sandevistan deixado por sua mãe e liderou sua equipe até a torre da Arasaka."
  },
  {
    "id": "exc-akame-ga-kill-akame-p33gv",
    "animeSlug": "akame-ga-kill",
    "category": "TeiguDLE",
    "questionTitle": "A quem pertence esta Teigu lendária de um único corte?",
    "targetTitle": "Murasame: Espada de Um Golpe (Ichigeki Hissatsu: Murasame)",
    "badgeTitle": "Teigu Imperial",
    "targetCharacterId": "akame",
    "targetCharacterName": "Akame",
    "clues": [
      {
        "label": "Tipo de Arma",
        "value": "Katana longa tradicional forjada pelo Primeiro Imperador"
      },
      {
        "label": "Veneno Maldito",
        "value": "Qualquer corte mesmo superficial injeta uma maldição biológica que para o coração em segundos"
      },
      {
        "label": "Facção do Portador",
        "value": "Divisão de assassinos Night Raid do Exército Revolucionário"
      }
    ],
    "contextExplanation": "Akame empunha Murasame com maestria cirúrgica, sussurrando \"Enterre\" antes de desferir o golpe letal."
  }
];

export const getChallengesForAnime = (animeSlug: string): ExclusiveChallenge[] => {
  return EXCLUSIVE_CHALLENGES.filter((c) => c.animeSlug === animeSlug);
};
