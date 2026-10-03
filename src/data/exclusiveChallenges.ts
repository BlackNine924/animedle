export interface ExclusiveChallenge {
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

export const EXCLUSIVE_CHALLENGES: ExclusiveChallenge[] = [
  {
    "id": "exc-aot-tita-colossal-armin",
    "animeSlug": "attack-on-titan",
    "category": "Poder dos Nove Titãs",
    "questionTitle": "Quem é o portador atual deste titã de destruição maciça?",
    "targetTitle": "Titã Colossal",
    "badgeTitle": "Nove Titãs Originais",
    "targetCharacterId": "armin-arlert",
    "targetCharacterName": "Armin Arlert",
    "validCharacterIds": [
      "armin-arlert",
      "bertholdt-hoover"
    ],
    "clues": [
      {
        "label": "Primeira Aparição do Portador",
        "value": "Queda da Muralha Maria (Distrito de Shiganshina)"
      },
      {
        "label": "Portador Anterior",
        "value": "Bertholdt Hoover (guerreiro infiltrado de Marley)"
      },
      {
        "label": "Habilidade Especial",
        "value": "Explosão atômica na transformação e emissão de vapor superaquecido letal"
      }
    ],
    "contextExplanation": "Armin Arlert herdou o Titã Colossal após a Batalha de Shiganshina, quando Levi escolheu injetar nele o soro de titã em vez de Erwin."
  },
  {
    "id": "exc-aot-tita-femea-annie",
    "animeSlug": "attack-on-titan",
    "category": "Poder dos Nove Titãs",
    "questionTitle": "A quem pertence este titã de combate marcial ágil?",
    "targetTitle": "Titã Fêmea",
    "badgeTitle": "Nove Titãs Originais",
    "targetCharacterId": "annie-leonhart",
    "targetCharacterName": "Annie Leonhart",
    "clues": [
      {
        "label": "Estilo de Combate",
        "value": "Muay Thai e chutes de alta precisão com endurecimento de cristal"
      },
      {
        "label": "Origem do Portador",
        "value": "Zona de Internamento de Liberio (Guerreiros de Marley)"
      },
      {
        "label": "Habilidade Única",
        "value": "Atração de titãs puros por meio de grito estridente e auto-cristalização defensiva"
      }
    ],
    "contextExplanation": "Annie Leonhart utilizou o Titã Fêmea para emboscar o Corpo de Reconhecimento na 57ª Expedição além dos Muros."
  },
  {
    "id": "exc-aot-tita-mandibula-porco",
    "animeSlug": "attack-on-titan",
    "category": "Poder dos Nove Titãs",
    "questionTitle": "Quem empunhava este titã de mandíbula esmagadora em Marley?",
    "targetTitle": "Titã Mandíbula",
    "badgeTitle": "Nove Titãs Originais",
    "targetCharacterId": "porco-galliard",
    "targetCharacterName": "Porco Galliard",
    "validCharacterIds": [
      "porco-galliard",
      "ymir-104",
      "falco-grice",
      "marcel-galliard"
    ],
    "clues": [
      {
        "label": "Família e Antecessor",
        "value": "Irmão mais novo de Marcel Galliard e sucessor de Ymir"
      },
      {
        "label": "Confronto Decisivo",
        "value": "Batalha do Distrito de Liberio contra o Titã de Ataque de Eren"
      },
      {
        "label": "Poder das Garras e Dentes",
        "value": "Capaz de triturar o cristal impenetrável do Titã Martelo de Guerra"
      }
    ],
    "contextExplanation": "Porco Galliard usava sua agilidade feroz e máscara óssea para destruir linhas de defesa até seu sacrifício em Paradis."
  },
  {
    "id": "exc-aot-tita-quadrupede-pieck",
    "animeSlug": "attack-on-titan",
    "category": "Poder dos Nove Titãs",
    "questionTitle": "De quem é este titã quadrúpede de resistência infinita?",
    "targetTitle": "Titã Quadrúpede",
    "badgeTitle": "Nove Titãs Originais",
    "targetCharacterId": "pieck-finger",
    "targetCharacterName": "Pieck Finger",
    "clues": [
      {
        "label": "Armamento Acoplado",
        "value": "Unidade Panzer com torres de metralhadoras operadas por soldados de Marley"
      },
      {
        "label": "Resistência Fisiológica",
        "value": "Capacidade de permanecer transformada por meses consecutivos sem fadiga"
      },
      {
        "label": "Frase e Hábito",
        "value": "Tem o hábito de andar de quatro mesmo em forma humana para se sentir confortável"
      }
    ],
    "contextExplanation": "Pieck Finger é uma das mentes mais brilhantes do exército de Marley, providenciando suporte logístico e fogo pesado."
  },
  {
    "id": "exc-aot-tita-martelo-lara",
    "animeSlug": "attack-on-titan",
    "category": "Poder dos Nove Titãs",
    "questionTitle": "Qual nobre eldiana guardava em segredo o poder deste titã?",
    "targetTitle": "Titã Martelo de Guerra",
    "badgeTitle": "Nove Titãs Originais",
    "targetCharacterId": "lara-tybur",
    "targetCharacterName": "Lara Tybur",
    "validCharacterIds": [
      "lara-tybur",
      "eren-jaeger"
    ],
    "clues": [
      {
        "label": "Clã Imperial",
        "value": "Família Tybur (irmã de Willy Tybur)"
      },
      {
        "label": "Localização do Portador",
        "value": "Envolta em casulo de cristal subterrâneo conectada por cordão umbilical"
      },
      {
        "label": "Criação de Armas",
        "value": "Materializa espinhos gigantes, bestas e martelos descomunais de cristal endurecido"
      }
    ],
    "contextExplanation": "Lara Tybur revelou o Titã Martelo durante o ataque a Liberio, sendo superada por Eren ao usar a mandíbula de Porco como quebra-nozes."
  },
  {
    "id": "exc-aot-tita-bestial-zeke",
    "animeSlug": "attack-on-titan",
    "category": "Poder dos Nove Titãs",
    "questionTitle": "A quem pertence este titã símio de arremesso devastador?",
    "targetTitle": "Titã Bestial",
    "badgeTitle": "Nove Titãs Originais",
    "targetCharacterId": "zeke-jaeger",
    "targetCharacterName": "Zeke Jaeger",
    "validCharacterIds": [
      "zeke-jaeger",
      "tom-ksaver"
    ],
    "clues": [
      {
        "label": "Linhagem Sanguínea",
        "value": "Sangue Real Fritz herdado de sua mãe Dina Fritz"
      },
      {
        "label": "Habilidade de Ativação",
        "value": "Transforma qualquer um que consuma seu fluido espinhal em titã puro com um grito"
      },
      {
        "label": "Apelido de Guerra",
        "value": "O Garoto-Prodígio de Marley / Chefe dos Guerreiros"
      }
    ],
    "contextExplanation": "Zeke Jaeger é meio-irmão de Eren e mentor do plano de eutanásia de Eldia, capaz de arremessar pedregulhos como artilharia."
  },
  {
    "id": "exc-opm-soco-serio-saitama",
    "animeSlug": "one-punch-man",
    "category": "Golpes & Técnicas",
    "questionTitle": "A quem pertence este golpe definitivo de força absoluta?",
    "targetTitle": "Soco Sério (Serious Punch)",
    "badgeTitle": "Golpes da Série Séria",
    "targetCharacterId": "saitama",
    "targetCharacterName": "Saitama",
    "clues": [
      {
        "label": "Treinamento Realizado",
        "value": "100 flexões, 100 abdominais, 100 agachamentos e 10 km de corrida todos os dias"
      },
      {
        "label": "Impacto no Céu",
        "value": "Dividiu a atmosfera e as nuvens da Terra ao meio ao rebater o raio de Boros"
      },
      {
        "label": "Profissão Declarada",
        "value": "Um herói por hobby (registrado como Classe B na Associação)"
      }
    ],
    "contextExplanation": "Saitama quebrou seu limitador de poder e derrota qualquer adversário com um único soco sério."
  },
  {
    "id": "exc-opm-punho-rocha-bang",
    "animeSlug": "one-punch-man",
    "category": "Estilos Marciais",
    "questionTitle": "Quem é o grande mestre criador deste estilo marcial?",
    "targetTitle": "Punho da Água Corrente Espatifadora de Pedras",
    "badgeTitle": "Artes Marciais de Heróis",
    "targetCharacterId": "bang",
    "targetCharacterName": "Silver Fang (Bang)",
    "clues": [
      {
        "label": "Rank na Associação",
        "value": "Herói Classe S - Rank 3"
      },
      {
        "label": "Filosofia do Estilo",
        "value": "Desvia a força do atacante como água corrente para contra-golpes esmagadores"
      },
      {
        "label": "Ex-Discípulo Recluso",
        "value": "Garou (O Caçador de Heróis)"
      }
    ],
    "contextExplanation": "Silver Fang domina o Punho da Água Corrente, sendo um dos maiores mestres marciais vivos da Terra."
  },
  {
    "id": "exc-tg-quinque-jason-juuzou",
    "animeSlug": "tokyo-ghoul",
    "category": "Arsenal de Investigador",
    "questionTitle": "Quem maneja esta terrível foice Quinque feita de Kakuja?",
    "targetTitle": "13's Jason (Foice Quinque Rank S+)",
    "badgeTitle": "Arsenal Quinque do CCG",
    "targetCharacterId": "juuzou-suzuya",
    "targetCharacterName": "Juuzou Suzuya",
    "clues": [
      {
        "label": "Origem do Kakuhou",
        "value": "Extraído de Yakumo Oomori (Yamori / Jason do 13º Distrito)"
      },
      {
        "label": "Características do Investigador",
        "value": "Costuras na pele, cabelo branco com presilhas em XIII e falta de sensação de medo ou dor"
      },
      {
        "label": "Promovido a",
        "value": "Investigador de Classe Especial e Líder do Esquadrão Suzuya"
      }
    ],
    "contextExplanation": "Juuzou empunha a foice 13's Jason com velocidade acrobática inacreditável para ceifar ghouls no campo de batalha."
  },
  {
    "id": "exc-tg-kagune-coruja-eto",
    "animeSlug": "tokyo-ghoul",
    "category": "Biologia Ghoul",
    "questionTitle": "A quem pertence o monstruoso Kakuja da Coruja de Um Olho Só?",
    "targetTitle": "Kakuja da Coruja Caolha (One-Eyed Owl)",
    "badgeTitle": "Ghouls Rank SSS",
    "targetCharacterId": "eto-yoshimura",
    "targetCharacterName": "Eto Yoshimura",
    "clues": [
      {
        "label": "Identidade Humana Pública",
        "value": "Sen Takatsuki (Famosa autora bestseller de romances de terror psicológico)"
      },
      {
        "label": "Organização Secreta",
        "value": "Fundadora e Líder Suprema da Árvore Aogiri"
      },
      {
        "label": "Linhagem Ghoul",
        "value": "Filha de Kuzen Yoshimura e da humana Ukina (Híbrida Natural)"
      }
    ],
    "contextExplanation": "Eto Yoshimura é a lendária Coruja de Um Olho Só, a mente por trás da Aogiri Tree e das maiores rebeliões de ghouls."
  },
  {
    "id": "exc-sao-starburst-stream-kirito",
    "animeSlug": "sword-art-online",
    "category": "Sword Skills Exclusivas",
    "questionTitle": "Quem desbloqueou e utilizou esta lendária Sword Skill de 16 golpes?",
    "targetTitle": "Starburst Stream (Sequência de Explosão Estelar)",
    "badgeTitle": "Sword Skills Exclusivas",
    "targetCharacterId": "kirito",
    "targetCharacterName": "Kirito",
    "clues": [
      {
        "label": "Habilidade Única Necessária",
        "value": "Empunhadura Dupla (Dual Blades) concedida pelo sistema de Cardinal"
      },
      {
        "label": "Armas Utilizadas",
        "value": "Elucidator e Dark Repulser"
      },
      {
        "label": "Chefe Derrotado",
        "value": "O Demônio dos Olhos Azuis (The Gleam Eyes no 74º Andar de Aincrad)"
      }
    ],
    "contextExplanation": "Kirito manteve sua habilidade de Empunhadura Dupla em segredo até salvar a tropa de combate contra The Gleam Eyes."
  },
  {
    "id": "exc-sao-mothers-rosario-yuuki",
    "animeSlug": "sword-art-online",
    "category": "Sword Skills Exclusivas",
    "questionTitle": "Quem criou a Sword Skill original de 11 acertos chamada Mother's Rosario?",
    "targetTitle": "Mother's Rosario (11-Hit Combo)",
    "badgeTitle": "Habilidade Original de Espada",
    "targetCharacterId": "yuuki",
    "targetCharacterName": "Yuuki Konno",
    "clues": [
      {
        "label": "Título Lendário em ALO",
        "value": "Zekken (A Espada Absoluta)"
      },
      {
        "label": "Guilda em ALfheim Online",
        "value": "Sleeping Knights"
      },
      {
        "label": "Herdeira da Técnica",
        "value": "Transmitiu a Sword Skill para Asuna Yuuki sob a grande árvore de ALO"
      }
    ],
    "contextExplanation": "Yuuki Konno derrotou Kirito em duelo amistoso e confiou seu maior legado, Mother's Rosario, a Asuna."
  },
  {
    "id": "exc-romance-guarda-chuva-mahiru",
    "animeSlug": "romance",
    "category": "Confissões & Momentos Marcantes",
    "questionTitle": "Qual 'anjo' da escola começou a cuidar do vizinho após este gesto de chuva?",
    "targetTitle": "O Guarda-Chuva Emprestado em Dia Chuvoso",
    "badgeTitle": "Romances Marcantes",
    "targetCharacterId": "mahiru-shiina",
    "targetCharacterName": "Mahiru Shiina",
    "clues": [
      {
        "label": "Apelido no Colégio",
        "value": "O Anjo (Tenshi-sama)"
      },
      {
        "label": "Comidas Preparadas",
        "value": "Cozinha jantares caseiros balanceados todos os dias no apartamento vizinho de Amane"
      },
      {
        "label": "Obra de Origem",
        "value": "Meu Anjo de Vizinha Me Mima Demais (Otonari no Tenshi-sama)"
      }
    ],
    "contextExplanation": "Mahiru Shiina recebeu o guarda-chuva de Amane no balanço de uma pracinha em um dia chuvoso, dando início ao romance."
  },
  {
    "id": "exc-romance-russio-provocador-alya",
    "animeSlug": "romance",
    "category": "Confissões & Momentos Marcantes",
    "questionTitle": "Quem disfarça seus sentimentos falando doces frases em russo?",
    "targetTitle": "Sussurros Românticos em Idioma Russo",
    "badgeTitle": "Romances Marcantes",
    "targetCharacterId": "alya-kujou",
    "targetCharacterName": "Alisa Mikhailovna Kujou (Alya)",
    "clues": [
      {
        "label": "Colega de Carteira",
        "value": "Masachika Kuze (que entende russo perfeitamente em segredo)"
      },
      {
        "label": "Apelido Escolar",
        "value": "A Princesa Solitária / Aluna Exemplar do Ensino Médio"
      },
      {
        "label": "Obra de Origem",
        "value": "Alya Sometimes Hides Her Feelings in Russian (Roshidere)"
      }
    ],
    "contextExplanation": "Alya acredita que Kuze não compreende suas confissões apaixonadas sussurradas em russo durante a aula."
  },
  {
    "id": "exc-romance-badminton-chinatsu",
    "animeSlug": "romance",
    "category": "Confissões & Momentos Marcantes",
    "questionTitle": "Quem é a senpai estrela do basquete que inspira o calouro do badminton?",
    "targetTitle": "Treinos Matinais das 6h no Ginásio de Eimei",
    "badgeTitle": "Romances Marcantes",
    "targetCharacterId": "chinatsu-kano",
    "targetCharacterName": "Chinatsu Kano",
    "clues": [
      {
        "label": "Esporte que Pratica",
        "value": "Estrela titular da equipe de Basquete Feminino"
      },
      {
        "label": "Situação Residencial",
        "value": "Muda-se temporariamente para morar na mesma casa que Taiki Inomata"
      },
      {
        "label": "Obra de Origem",
        "value": "Blue Box (Ao no Hako)"
      }
    ],
    "contextExplanation": "Chinatsu Kano treina todas as manhãs no ginásio ao lado de Taiki, nutrindo uma admiração mútua profunda e inspiradora."
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
    "id": "exc-attack-on-titan-reiner-braun-02wju",
    "animeSlug": "attack-on-titan",
    "category": "Memórias dos Titãs",
    "questionTitle": "A quem pertence este Titã Original?",
    "targetTitle": "Titã Blindado",
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
    "targetTitle": "Titã Colossal",
    "badgeTitle": "Nove Titãs Originais",
    "targetCharacterId": "bertholdt-hoover",
    "targetCharacterName": "Bertholdt Hoover",
    "validCharacterIds": [
      "armin-arlert",
      "bertholdt-hoover"
    ],
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
    "targetTitle": "Titã Bestial",
    "badgeTitle": "Nove Titãs Originais",
    "targetCharacterId": "zeke-jaeger",
    "targetCharacterName": "Zeke Jaeger",
    "validCharacterIds": [
      "zeke-jaeger",
      "tom-ksaver"
    ],
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
    "validCharacterIds": [
      "izuku-midoriya",
      "all-might",
      "nana-shimura",
      "yoichi-shigaraki"
    ],
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
  },
  {
    "id": "exc-mha-one-for-all-allmight-deku",
    "animeSlug": "my-hero-academia",
    "category": "Individualidades Heróicas",
    "questionTitle": "Quem é o portador desta Individualidade de acúmulo de poder sagrado?",
    "targetTitle": "One For All (OFA)",
    "badgeTitle": "Individualidade Acumuladora",
    "targetCharacterId": "izuku-midoriya",
    "targetCharacterName": "Izuku Midoriya (Deku)",
    "validCharacterIds": [
      "izuku-midoriya",
      "all-might",
      "nana-shimura",
      "yoichi-shigaraki"
    ],
    "clues": [
      {
        "label": "Origem Histórica",
        "value": "Criada da fusão forçada do poder de estocar energia com o poder latente de passar adiante"
      },
      {
        "label": "Número de Gerações",
        "value": "Passada por 9 gerações para derrotar a tirania do All For One"
      },
      {
        "label": "Fatores Adicionais",
        "value": "Blackwhip, Float, Danger Sense, Smokescreen e Fa Jin dos antecessores"
      }
    ],
    "contextExplanation": "One For All foi empunhado pelo primeiro portador Yoichi, Nana Shimura, All Might (8º) e Izuku Midoriya (9º)."
  },
  {
    "id": "exc-mha-all-for-one-quirk",
    "animeSlug": "my-hero-academia",
    "category": "Individualidades Heróicas",
    "questionTitle": "A quem pertence esta individualidade que rouba e distribui poderes?",
    "targetTitle": "All For One (AFO)",
    "badgeTitle": "Soberano do Submundo",
    "targetCharacterId": "all-for-one",
    "targetCharacterName": "All For One",
    "validCharacterIds": [
      "all-for-one",
      "tomura-shigaraki"
    ],
    "clues": [
      {
        "label": "Capacidade Única",
        "value": "Roubar Quirks de outras pessoas, utilizá-las ou transferi-las forçadamente"
      },
      {
        "label": "Nêmesis Histórico",
        "value": "Arquivilão que dominou o Japão durante o surgimento dos meta-humanos"
      },
      {
        "label": "Sucessor Escolhido",
        "value": "Transferiu uma réplica perfeita para Tomura Shigaraki no hospital de Jaku"
      }
    ],
    "contextExplanation": "All For One governou as sombras por gerações antes de tentar tomar o corpo de Tomura Shigaraki."
  },
  {
    "id": "exc-bleach-yamamoto-zanka",
    "animeSlug": "bleach",
    "category": "Bankai Suprema",
    "questionTitle": "A quem pertence a Bankai que concentra chamas a 15 milhões de graus?",
    "targetTitle": "Zanka no Tachi (Espada da Longa Chama Remanescente)",
    "badgeTitle": "Capitão Comandante do Gotei 13",
    "targetCharacterId": "yamamoto-genryusai",
    "targetCharacterName": "Genryusai Shigekuni Yamamoto",
    "clues": [
      {
        "label": "Efeito de Ativação",
        "value": "Seca a umidade de toda a Soul Society instantaneamente ao ser liberada"
      },
      {
        "label": "Forma Sul (Minami)",
        "value": "Invoca os esqueletos calcinados de todos que já foram mortos pelas suas chamas"
      },
      {
        "label": "Forma Oeste (Nishi)",
        "value": "Cobre o corpo com uma armadura invisível de calor puro a 15.000.000 °C"
      }
    ]
  },
  {
    "id": "exc-bleach-shunsui-karamatsu",
    "animeSlug": "bleach",
    "category": "Bankai Teatral",
    "questionTitle": "Qual shinigami performa uma peça trágica de 4 atos que afoga ambos em desespero?",
    "targetTitle": "Katen Kyokotsu: Karamatsu Shinju (Pinheiro Lovers Suicide)",
    "badgeTitle": "Capitão da 8ª Divisão / Comandante",
    "targetCharacterId": "shunsui-kyoraku",
    "targetCharacterName": "Shunsui Kyoraku",
    "clues": [
      {
        "label": "Aura da Bankai",
        "value": "Muda a atmosfera tornando o ambiente sombrio, gélido e melancólico"
      },
      {
        "label": "Terceiro Ato (Dan San)",
        "value": "Afoga os duelistas num abismo sem fim até que a reiatsu de um se esgote"
      },
      {
        "label": "Ato Final (Shime no Dan)",
        "value": "Envolve a garganta do oponente com um fio de luz branca e corta a cabeça"
      }
    ]
  },
  {
    "id": "exc-bleach-unohana-minazuki",
    "animeSlug": "bleach",
    "category": "Bankai Ancestral",
    "questionTitle": "Quem liberta uma lâmina viscosa de sangue puro para saciar seu desejo insaciável de batalha?",
    "targetTitle": "Minazuki (O Fim de Todas as Coisas)",
    "badgeTitle": "Primeira Kenpachi / Capitã da 4ª Divisão",
    "targetCharacterId": "retsu-unohana",
    "targetCharacterName": "Retsu Unohana (Yachiru)",
    "clues": [
      {
        "label": "Disfarce de Séculos",
        "value": "Sua Shikai cura dentro do estômago de uma arraia gigante voadora"
      },
      {
        "label": "Verdadeira Natureza",
        "value": "A Bankai derrete a carne e ossos em sangue enquanto regenera e corta incessantemente"
      },
      {
        "label": "Títulos Lendários",
        "value": "Mestra das 8.000 escolas de espada e fundadora da 11ª Divisão"
      }
    ]
  },
  {
    "id": "exc-bleach-shinji-sakashima",
    "animeSlug": "bleach",
    "category": "Bankai de Inversão",
    "questionTitle": "Qual líder Vizard possui uma Bankai proibida que inverte aliados e inimigos em batalha em massa?",
    "targetTitle": "Sakashima Yokoshima Happofusagari",
    "badgeTitle": "Capitão da 5ª Divisão",
    "targetCharacterId": "shinji-hirako",
    "targetCharacterName": "Shinji Hirako",
    "clues": [
      {
        "label": "Estrutura Floral",
        "value": "Fecha-se dentro de uma flor dourada enquanto um aroma hipnótico se espalha"
      },
      {
        "label": "Regra Crítica",
        "value": "Não pode ser usada perto de aliados, pois força todos ao redor a se matarem"
      },
      {
        "label": "Poder de Shikai",
        "value": "Sakanade: inverte todos os sentidos espaciais (cima, baixo, frente e trás)"
      }
    ]
  },
  {
    "id": "exc-bleach-renji-soo-zabimaru",
    "animeSlug": "bleach",
    "category": "Bankai Verdadeira",
    "questionTitle": "Qual tenente aprendeu o verdadeiro nome de sua Zanpakuto com o Esquadrão Zero?",
    "targetTitle": "Soo Zabimaru (Dois Reis da Cauda de Serpente)",
    "badgeTitle": "Tenente da 6ª Divisão",
    "targetCharacterId": "renji-abarai",
    "targetCharacterName": "Renji Abarai",
    "clues": [
      {
        "label": "Evolução de Forma",
        "value": "Substituiu a gigantesca serpente óssea esquelética por uma manopla e crânio anatômico"
      },
      {
        "label": "Técnica de Finalização",
        "value": "Zaga Teppo: uma mandíbula espiritual esmaga e incinera o alvo"
      },
      {
        "label": "Treinamento Real",
        "value": "Renascido no Palácio Real de Ichibei Hyosube"
      }
    ]
  },
  {
    "id": "exc-bleach-sajin-dangai-joe",
    "animeSlug": "bleach",
    "category": "Técnica de Transmutação Humana",
    "questionTitle": "Quem sacrificou seu próprio coração para despojar sua armadura e se tornar imortal?",
    "targetTitle": "Kokujo Tengen Myo'o: Dangai Joe",
    "badgeTitle": "Capitão da 7ª Divisão",
    "targetCharacterId": "sajin-komamura",
    "targetCharacterName": "Sajin Komamura",
    "clues": [
      {
        "label": "Aparência da Bankai",
        "value": "Um gigante samurai colossal que espelha os golpes do seu mestre"
      },
      {
        "label": "Dangai Joe",
        "value": "Despojado da armadura, expondo musculatura em chamas pura e invulnerável à dor"
      },
      {
        "label": "Preço Trágico",
        "value": "Converteu seu usuário permanentemente em um lobo quadrúpede sem fala"
      }
    ]
  },
  {
    "id": "exc-bleach-kensei-tekken",
    "animeSlug": "bleach",
    "category": "Bankai Corporal",
    "questionTitle": "Qual capitão Vizard comprime a força de tufões em soqueiras de lâminas contínuas?",
    "targetTitle": "Tekken Tachikaze (Vento Cortante de Punho de Ferro)",
    "badgeTitle": "Capitão da 9ª Divisão",
    "targetCharacterId": "kensei-muguruma",
    "targetCharacterName": "Kensei Muguruma",
    "clues": [
      {
        "label": "Mecanismo de Dano",
        "value": "O impacto do soco nunca cessa, explodindo energia de vento sem parar dentro do alvo"
      },
      {
        "label": "Visual de Batalha",
        "value": "Braçadeiras blindadas de metal cobrindo os antebraços e punhos"
      },
      {
        "label": "Passado",
        "value": "Salvo por Kisuke Urahara durante o incidente de holowificação há 100 anos"
      }
    ]
  },
  {
    "id": "exc-bleach-kenpachi-nozarashi",
    "animeSlug": "bleach",
    "category": "Despertar de Shikai & Bankai",
    "questionTitle": "Quem transformou sua espada gasta num cutelo descomunal capaz de cortar até um meteoro?",
    "targetTitle": "Nozarashi (Devore / Engula)",
    "badgeTitle": "11º Kenpachi",
    "targetCharacterId": "kenpachi-zaraki",
    "targetCharacterName": "Kenpachi Zaraki",
    "clues": [
      {
        "label": "Comando de Liberação",
        "value": "Beba / Engula (Nome revelado por Yachiru no leito de morte de Unohana)"
      },
      {
        "label": "Forma Demoníaca",
        "value": "Sua Bankai transforma sua pele em vermelho carmesim e lhe dá chifres de oni gigante"
      },
      {
        "label": "Feito Absurdo",
        "value": "Destruiu o vácuo espacial criado pela imaginação de Gremmy Thoumeaux"
      }
    ]
  },
  {
    "id": "exc-bleach-ikkaku-ryumon",
    "animeSlug": "bleach",
    "category": "Bankai Secreta",
    "questionTitle": "Qual 3º oficial manteve em segredo três lâminas pesadas ligadas por correntes com um brasão de dragão?",
    "targetTitle": "Ryumon Hozukimaru (Dragão com Crista da Lâmpada do Demônio)",
    "badgeTitle": "3º Oficial da 11ª Divisão",
    "targetCharacterId": "ikkaku-madarame",
    "targetCharacterName": "Ikkaku Madarame",
    "clues": [
      {
        "label": "Despertar Gradual",
        "value": "O dragão gravado na lâmina central precisa se preencher de vermelho com o combate"
      },
      {
        "label": "Segredo de Fidelidade",
        "value": "Escondeu sua Bankai para não ser promovido a capitão e continuar sob as ordens de Zaraki"
      },
      {
        "label": "Combate Clássico",
        "value": "Usada pela primeira vez contra o Arrancar Edorad Leones na cidade de Karakura"
      }
    ]
  },
  {
    "id": "exc-bleach-mayuri-matai",
    "animeSlug": "bleach",
    "category": "Bankai Modificada",
    "questionTitle": "Qual cientista reconfigura sua Bankai para dar à luz bebês gigantes com venenos adaptativos?",
    "targetTitle": "Konjiki Ashisogi Jizo: Matai Fukuin Shotai",
    "badgeTitle": "Presidente do Departamento de P&D",
    "targetCharacterId": "mayuri-kurotsuchi",
    "targetCharacterName": "Mayuri Kurotsuchi",
    "clues": [
      {
        "label": "Matai Fukuin Shotai",
        "value": "Um bebê obeso e pálido gigante que gera novas variantes de veneno com base nos dados do inimigo"
      },
      {
        "label": "Combate Decisivo",
        "value": "Criou nervos sintéticos com camadas de carne para derrotar Pernida Parnkgjas"
      },
      {
        "label": "Customização Constante",
        "value": "Instalou mecanismos de autodestruição caso a própria Bankai tente atacá-lo"
      }
    ]
  },
  {
    "id": "exc-bleach-gin-kamishini",
    "animeSlug": "bleach",
    "category": "Bankai Assassina",
    "questionTitle": "Qual traidor possuía uma espada que se estende a 500 vezes a velocidade do som com veneno celular?",
    "targetTitle": "Kamishini no Yari (Lança Matadora de Deuses)",
    "badgeTitle": "Ex-Capitão da 3ª Divisão",
    "targetCharacterId": "gin-ichimaru",
    "targetCharacterName": "Gin Ichimaru",
    "clues": [
      {
        "label": "A Falsa Verdade",
        "value": "Mentiu dizendo que a velocidade era seu trunfo; o verdadeiro poder é se transformar em pó momentaneamente"
      },
      {
        "label": "Veneno Letal",
        "value": "Deixa um fragmento milimétrico de poeira dentro do peito que dissolve as células do alvo"
      },
      {
        "label": "Objetivo de Vida",
        "value": "Esperou mais de 100 anos ao lado de Aizen para encontrar o momento de matá-lo por Rangiku"
      }
    ]
  },
  {
    "id": "exc-bleach-tosen-enma-korogi",
    "animeSlug": "bleach",
    "category": "Bankai Sensorial",
    "questionTitle": "Quem cria uma cúpula negra gigante que priva o inimigo de visão, audição, olfato e reiatsu?",
    "targetTitle": "Suzumushi Tsuishiki: Enma Korogi (Grilo do Julgamento)",
    "badgeTitle": "Ex-Capitão da 9ª Divisão",
    "targetCharacterId": "kaname-tosen",
    "targetCharacterName": "Kaname Tosen",
    "clues": [
      {
        "label": "Privação dos Sentidos",
        "value": "Apenas quem estiver tocando a empunhadura da espada mantém a percepção sensorial"
      },
      {
        "label": "Ideologia de Justiça",
        "value": "Seguiu a justiça que acreditava causar o menor derramamento de sangue"
      },
      {
        "label": "Luta Marcante",
        "value": "Derrotado por Kenpachi Zaraki, que permitiu ser perfurado para segurar a lâmina"
      }
    ]
  },
  {
    "id": "exc-bleach-urahara-benihime",
    "animeSlug": "bleach",
    "category": "Bankai de Reestruturação",
    "questionTitle": "Qual inventor genial invoca uma mulher gigante com fios cirúrgicos que rasga e costura tudo o que toca?",
    "targetTitle": "Kannonbiraki Benihime Aratame (Modificação da Princesa Carmesim de Kannon)",
    "badgeTitle": "Criador do Hogyoku Original",
    "targetCharacterId": "kisuke-urahara",
    "targetCharacterName": "Kisuke Urahara",
    "clues": [
      {
        "label": "Reestruturação Cirúrgica",
        "value": "Costura e repara órgãos destruídos de aliados e disseca fisicamente o corpo de inimigos"
      },
      {
        "label": "Combate em Warwelt",
        "value": "Usada para furar a barreira de Askin Nakk Le Vaar permitindo a entrada de Grimmjow"
      },
      {
        "label": "Frase Icônica",
        "value": "Sua Shikai responde ao comando: Cante, Benihime!"
      }
    ]
  },
  {
    "id": "exc-bleach-rukia-hakka-no-togame",
    "animeSlug": "bleach",
    "category": "Bankai do Zero Absoluto",
    "questionTitle": "Qual Shinigami congela tudo ao seu redor à temperatura de zero absoluto em um manto branco imaculado?",
    "targetTitle": "Hakka no Togame (Punição Branca da Névoa)",
    "badgeTitle": "Capitã da 13ª Divisão",
    "targetCharacterId": "rukia-kuchiki",
    "targetCharacterName": "Rukia Kuchiki",
    "clues": [
      {
        "label": "Zero Absoluto",
        "value": "Reduz a temperatura do próprio corpo a -273,15 °C parando o fluxo molecular"
      },
      {
        "label": "Vitória Decisiva",
        "value": "Aniquilou As Nodt pulverizando-o em cristais de gelo sublime"
      },
      {
        "label": "Risco Extremo",
        "value": "Qualquer movimento brusco ao descongelar pode estilhaçar seu próprio corpo"
      }
    ]
  },
  {
    "id": "exc-bleach-soi-fon-jakuho",
    "animeSlug": "bleach",
    "category": "Bankai de Artilharia Pesada",
    "questionTitle": "Qual líder do Onmitsukido detesta sua Bankai porque um míssil dourado estrondoso contradiz seu estilo furtivo?",
    "targetTitle": "Jakuho Raikoben (Chicote do Trovão de Vespa)",
    "badgeTitle": "Capitã da 2ª Divisão / Comandante da Guarda",
    "targetCharacterId": "soi-fon",
    "targetCharacterName": "Soi Fon",
    "clues": [
      {
        "label": "Contradição com Assassinato",
        "value": "Demasiado pesada para carregar e seu tiro gera um recuo e explosão que arruínam o sigilo"
      },
      {
        "label": "Morte em Duas Etapas",
        "value": "Sua Shikai Suzumebachi mata instantaneamente se acertar a mesma marca borboleta duas vezes"
      },
      {
        "label": "Amarração em Aço",
        "value": "Precisa se amarrar em cabos de aço pesados antes de disparar o projétil"
      }
    ]
  },
  {
    "id": "exc-bleach-rose-kinshara",
    "animeSlug": "bleach",
    "category": "Bankai Ilusória de Som",
    "questionTitle": "Qual capitão maestro cria dançarinos de ilusão que causam danos físicos reais caso o alvo ouça a música?",
    "targetTitle": "Kinshara Butodan (Trupe de Dança do Salgueiro Dourado)",
    "badgeTitle": "Capitão da 3ª Divisão",
    "targetCharacterId": "rojuro-otoribashi",
    "targetCharacterName": "Rojuro Otoribashi (Rose)",
    "clues": [
      {
        "label": "Ato do Redemoinho e Chamas",
        "value": "Engana o cérebro com melodias sonoras gerando sensação de afogamento e fogo real"
      },
      {
        "label": "Fraqueza Exposta",
        "value": "Mask De Masculine furou os próprios tímpanos para anular o efeito da música"
      },
      {
        "label": "Natureza Vizard",
        "value": "Empunha uma Shikai parecida com um chicote fino com uma flor de ouro na ponta"
      }
    ]
  },
  {
    "id": "exc-bleach-sasakibe-koko-gonryo",
    "animeSlug": "bleach",
    "category": "Bankai de Tempestade e Raios",
    "questionTitle": "Qual tenente leal dominou uma Bankai de raios cósmicos que marcou o rosto de Yamamoto para sempre?",
    "targetTitle": "Koko Gonryo Rikyu (Palácio Brilhante do Dragão Amarelo)",
    "badgeTitle": "Tenente da 1ª Divisão por 2.000 anos",
    "targetCharacterId": "chojiro-sasakibe",
    "targetCharacterName": "Chojiro Sasakibe",
    "clues": [
      {
        "label": "Manipulação Climática",
        "value": "Conecta o céu com uma cúpula de relâmpagos violeta canalizados pelo florete"
      },
      {
        "label": "Roubo por Driscoll Berci",
        "value": "Sua Bankai foi roubada pelo Sternritter O antes do início da Guerra Sangrenta"
      },
      {
        "label": "Cicatriz Lendária",
        "value": "O único Shinigami além de Yhwach a deixar uma cicatriz permanente no rosto de Genryusai"
      }
    ]
  },
  {
    "id": "exc-bleach-hisagi-kazeshini",
    "animeSlug": "bleach",
    "category": "Shikai Mortal de Dupla Lâmina",
    "questionTitle": "Quem empunha duas foices curvas presas por uma corrente longa que tem a forma de algo feito para colher vidas?",
    "targetTitle": "Kazeshini (Vento Ceifador)",
    "badgeTitle": "Tenente da 9ª Divisão",
    "targetCharacterId": "shuhei-hisagi",
    "targetCharacterName": "Shuhei Hisagi",
    "clues": [
      {
        "label": "Comando de Liberação",
        "value": "Ceife / Rasgue, Kazeshini!"
      },
      {
        "label": "Filosofia de Luta",
        "value": "Afirma temer a própria arma porque ela não foi feita para cortar, mas sim para arrancar vidas"
      },
      {
        "label": "Tatuagem 69",
        "value": "Homenagem gravada na face esquerda ao capitão Kensei Muguruma que o salvou quando criança"
      }
    ]
  },
  {
    "id": "exc-bleach-kira-wabisuke",
    "animeSlug": "bleach",
    "category": "Shikai de Gravidade Geométrica",
    "questionTitle": "Qual shinigami melancólico empunha uma lâmina com gancho quadrado que dobra o peso de tudo o que atinge a cada golpe?",
    "targetTitle": "Wabisuke (O Penitente)",
    "badgeTitle": "Tenente da 3ª Divisão",
    "targetCharacterId": "izuru-kira",
    "targetCharacterName": "Izuru Kira",
    "clues": [
      {
        "label": "Multiplicação de Peso",
        "value": "A cada golpe o peso do objeto ou adversário dobra (2x, 4x, 8x, 16x) até que ele se curve ao chão"
      },
      {
        "label": "Forma da Lâmina",
        "value": "Formato de gancho reto em ângulo reto de 90 graus, lembrando uma guilhotina pronta para decapitar"
      },
      {
        "label": "Comando Triste",
        "value": "Erga sua cabeça, Wabisuke!"
      }
    ]
  },
  {
    "id": "exc-bleach-aizen-kyoka-suigetsu",
    "animeSlug": "bleach",
    "category": "Hipnose Absoluta (Kanzen Saimin)",
    "questionTitle": "A quem pertence a lâmina que controla completamente os cinco sentidos de qualquer um que testemunhe sua liberação?",
    "targetTitle": "Kyoka Suigetsu (Flor no Espelho, Lua na Água)",
    "badgeTitle": "Ex-Capitão da 5ª Divisão / Rei do Hueco Mundo",
    "targetCharacterId": "sosuke-aizen",
    "targetCharacterName": "Sosuke Aizen",
    "clues": [
      {
        "label": "Condição de Ativação",
        "value": "Basta ver o momento da liberação Shikai uma única vez para ficar sob controle pela vida inteira"
      },
      {
        "label": "Comando Falso e Real",
        "value": "Quebre, Kyoka Suigetsu! - fingiu durante décadas que sua espada era do elemento água"
      },
      {
        "label": "Unico Ponto Fraco",
        "value": "Apenas tocar na lâmina física antes da ativação da hipnose anula o controle"
      }
    ]
  },
  {
    "id": "exc-bleach-yhwach-almighty",
    "animeSlug": "bleach",
    "category": "Schrift Imperial A",
    "questionTitle": "Qual progenitor dos Quincy possui olhos com múltiplas pupilas capazes de ver e reescrever o futuro?",
    "targetTitle": "Schrift A: The Almighty (O Todo-Poderoso)",
    "badgeTitle": "Rei do Wandenreich / Filho do Rei das Almas",
    "targetCharacterId": "yhwach",
    "targetCharacterName": "Yhwach",
    "clues": [
      {
        "label": "Reescrita Temporal",
        "value": "Não prevê apenas o futuro, mas pode reescrever uma linha temporal onde foi morto para ressuscitar"
      },
      {
        "label": "Auswahlen",
        "value": "Lança feixes de luz sagrada que roubam a força e vida de seus súditos subordinados"
      },
      {
        "label": "Derrota Final",
        "value": "Interrompido pela flecha de prata estagnada disparada por Uryu Ishida"
      }
    ]
  },
  {
    "id": "exc-bleach-jugram-the-balance",
    "animeSlug": "bleach",
    "category": "Schrift B de Retribuição",
    "questionTitle": "Quem carrega um escudo que transfere toda má sorte ou ferimentos sofridos diretamente para seu oponente?",
    "targetTitle": "Schrift B: The Balance (O Equilíbrio)",
    "badgeTitle": "Grão-Mestre dos Sternritter",
    "targetCharacterId": "jugram-haschwalth",
    "targetCharacterName": "Jugram Haschwalth",
    "clues": [
      {
        "label": "Escudo Freund Schild",
        "value": "Absorve os danos corporais sofridos e os reflete em dobro como infortúnio ao agressor"
      },
      {
        "label": "Substituto da Noite",
        "value": "Assume os poderes do The Almighty durante as horas em que Yhwach dorme"
      },
      {
        "label": "Amizade de Infância",
        "value": "Cresceu ao lado de Bazz-B caçando animais na floresta dos Quincy"
      }
    ]
  },
  {
    "id": "exc-bleach-gerard-the-miracle",
    "animeSlug": "bleach",
    "category": "Schrift M da Glória",
    "questionTitle": "Qual membro da Guarda Real dos Quincy cresce colossalmente a cada golpe letal que recebe?",
    "targetTitle": "Schrift M: The Miracle (O Milagre)",
    "badgeTitle": "O Coração do Rei das Almas",
    "targetCharacterId": "gerard-valkyrie",
    "targetCharacterName": "Gerard Valkyrie",
    "clues": [
      {
        "label": "Conversão de Dano em Tamanho",
        "value": "Qualquer ferimento mortal ou corte se transforma em gigantismo sagrado e poder incalculável"
      },
      {
        "label": "Espada Hoffnung",
        "value": "Se a lâmina sofrer um único arranhão, o dano é refletido imediatamente no corpo do agressor"
      },
      {
        "label": "Voz da Esperança",
        "value": "Impossível de ser morto por golpes físicos normais dos capitães do Gotei 13"
      }
    ]
  },
  {
    "id": "exc-bleach-lille-the-x-axis",
    "animeSlug": "bleach",
    "category": "Schrift X Intangível",
    "questionTitle": "Qual atirador de elite dispara tiros que atravessam tudo sem projétil físico e se transforma num querubim intangível?",
    "targetTitle": "Schrift X: The X-Axis (O Eixo X)",
    "badgeTitle": "Líder da Guarda de Elite Schutzstaffel",
    "targetCharacterId": "lille-barro",
    "targetCharacterName": "Lille Barro",
    "clues": [
      {
        "label": "Intangibilidade Total",
        "value": "Quando ambos os olhos estão abertos, qualquer ataque inimigo atravessa seu corpo como luz"
      },
      {
        "label": "Arma Rifle Diagramme",
        "value": "Não atira balas; ele simplesmente perfura o espaço entre o cano e o alvo instantaneamente"
      },
      {
        "label": "Forma Final de Ave Divina",
        "value": "Transforma-se numa criatura angélica de múltiplos olhos e asas de luz luminosa"
      }
    ]
  },
  {
    "id": "exc-bleach-askin-the-deathdealing",
    "animeSlug": "bleach",
    "category": "Schrift D de Toxicidade",
    "questionTitle": "Quem manipula a dose letal de qualquer substância ingerida ou presente no ar, incluindo sangue e reiatsu?",
    "targetTitle": "Schrift D: The Deathdealing (O Distribuidor da Morte)",
    "badgeTitle": "Sternritter D da Guarda Schutzstaffel",
    "targetCharacterId": "askin-nakk-le-vaar",
    "targetCharacterName": "Askin Nakk Le Vaar",
    "clues": [
      {
        "label": "Dose Letal",
        "value": "Pode tornar a própria água ou sangue do inimigo venenosos ao abaixar a dosagem tolerada pelo corpo"
      },
      {
        "label": "Gift Ball Deluxe",
        "value": "Uma esfera massiva de veneno sufocante que engoliu Ichigo, Chad e Orihime"
      },
      {
        "label": "Ponto Fraco",
        "value": "Surpreendido pelas garras de Pantera de Grimmjow arrancando seu coração por trás"
      }
    ]
  },
  {
    "id": "exc-bleach-bambietta-the-explode",
    "animeSlug": "bleach",
    "category": "Schrift E Explosivo",
    "questionTitle": "Qual Sternritter não atira bombas, mas transforma qualquer matéria que sua reiatsu tocar em uma bomba?",
    "targetTitle": "Schrift E: The Explode (A Explosão)",
    "badgeTitle": "Líder dos Bambies",
    "targetCharacterId": "bambietta-basterbine",
    "targetCharacterName": "Bambietta Basterbine",
    "clues": [
      {
        "label": "Propriedade de Dano",
        "value": "Seus projéteis não podem ser bloqueados por espadas, pois a própria espada se transforma numa bomba"
      },
      {
        "label": "Derrota para Komamura",
        "value": "Seus ataques foram inúteis contra o gigante sem alma e sem dor Dangai Joe"
      },
      {
        "label": "Destino Sinistro",
        "value": "Zumbificada por Giselle Gewelle após sofrer ferimentos graves"
      }
    ]
  },
  {
    "id": "exc-bleach-ulquiorra-murcielago",
    "animeSlug": "bleach",
    "category": "Resurrección de Segunda Etapa",
    "questionTitle": "Qual Espada alcançou em segredo uma Segunda Etapa com asas de demônio e lanças de raio verde destruidoras?",
    "targetTitle": "Murciélago / Segunda Etapa",
    "badgeTitle": "4º Espada (O Nada)",
    "targetCharacterId": "ulquiorra-cifer",
    "targetCharacterName": "Ulquiorra Cifer",
    "clues": [
      {
        "label": "Segredo de Aizen",
        "value": "Nem mesmo Sosuke Aizen havia testemunhado a sua forma de Segunda Etapa"
      },
      {
        "label": "Lanza del Relámpago",
        "value": "Gera uma lança colossal de energia concentrada com raio de explosão que ofusca Las Noches"
      },
      {
        "label": "Percebendo o Coração",
        "value": "Desintegrou-se em cinzas ao tocar a mão de Orihime Inoue no topo da cúpula"
      }
    ]
  },
  {
    "id": "exc-bleach-grimmjow-pantera",
    "animeSlug": "bleach",
    "category": "Resurrección Selvagem",
    "questionTitle": "Quem ruge ao comando \"Triture\" para assumir a agilidade de um felino veloz com garras e disparos de projéteis Desgarrón?",
    "targetTitle": "Pantera (Rei dos Felinos)",
    "badgeTitle": "6º Espada (A Destruição)",
    "targetCharacterId": "grimmjow-jaegerjaquez",
    "targetCharacterName": "Grimmjow Jaegerjaquez",
    "clues": [
      {
        "label": "Comando de Liberação",
        "value": "Triture, Pantera!"
      },
      {
        "label": "Desgarrón",
        "value": "Gera dez garras colossais de reishi azul afiadas como lâminas nos dedos das mãos"
      },
      {
        "label": "Rivalidade Lendária",
        "value": "Batalhou até a exaustão total contra o Hollow Ichigo no deserto de Las Noches"
      }
    ]
  },
  {
    "id": "exc-bleach-starrk-los-lobos",
    "animeSlug": "bleach",
    "category": "Resurrección de Divisão de Alma",
    "questionTitle": "Qual Espada solitário divide sua alma em pistolas gêmeas de Cero e matilhas de lobos que explodem ao morder?",
    "targetTitle": "Los Lobos (A Matilha de Lobos)",
    "badgeTitle": "1º Espada (A Solidão)",
    "targetCharacterId": "coyote-starrk",
    "targetCharacterName": "Coyote Starrk",
    "clues": [
      {
        "label": "Fusão com Lilynette",
        "value": "Sua Zanpakuto não é uma espada convencional, mas sim a alma da sua parceira Lilynette Gingerbuck"
      },
      {
        "label": "Metralhadora de Ceros",
        "value": "Cero Metralleta: dispara mais de 1.000 feixes azuis simultâneos em frações de segundo"
      },
      {
        "label": "Lobos Espirituais",
        "value": "Lobos feitos de fragmentos de sua própria alma que detonam com impacto devastador"
      }
    ]
  },
  {
    "id": "exc-bleach-baraggan-arrogante",
    "animeSlug": "bleach",
    "category": "Resurrección da Senescência",
    "questionTitle": "Qual antigo rei do Hueco Mundo apodrece e envelhece instantaneamente qualquer matéria ou Kido com a fumaça Respira?",
    "targetTitle": "Arrogante (O Grande Imperador da Morte)",
    "badgeTitle": "2º Espada (A Senescência / Envelhecimento)",
    "targetCharacterId": "baraggan-louisenbairn",
    "targetCharacterName": "Baraggan Louisenbairn",
    "clues": [
      {
        "label": "Respira",
        "value": "Uma névoa negra corrosiva que desfaz ossos, pedras e encantamentos mágicos pelo envelhecimento temporal"
      },
      {
        "label": "Coroa de Caveira",
        "value": "Assume a forma de um esqueleto com coroa de ouro e um machado de batalha negro"
      },
      {
        "label": "Derrota com o Próprio Poder",
        "value": "Hachigen Ushoda teletransportou a própria mão infectada para dentro do estômago de Baraggan"
      }
    ]
  },
  {
    "id": "exc-op-1-monkey-d-luffy",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Gomu Gomu no Mi / Hito Hito no Mi: Modelo Nika",
    "badgeTitle": "Zoan Mítica / Deus do Sol",
    "targetCharacterId": "monkey-d-luffy",
    "targetCharacterName": "Monkey D. Luffy",
    "validCharacterIds": [
      "monkey-d-luffy"
    ],
    "clues": [
      {
        "label": "Natureza Real",
        "value": "Fruta mítica lendária do Deus do Sol que traz liberdade e risos"
      },
      {
        "label": "Propriedade Física",
        "value": "Concede ao corpo propriedades completas de borracha e elasticidade"
      },
      {
        "label": "Despertar",
        "value": "Gear 5: transformação em guerreiro albino com liberdade absoluta de moldar o ambiente"
      }
    ]
  },
  {
    "id": "exc-op-2-buggy",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Bara Bara no Mi (Fruta dos Pedaços)",
    "badgeTitle": "Paramecia de Separação",
    "targetCharacterId": "buggy",
    "targetCharacterName": "Buggy",
    "validCharacterIds": [
      "buggy"
    ],
    "clues": [
      {
        "label": "Imunidade Crucial",
        "value": "Imunidade total e absoluta contra cortes e lâminas de qualquer espadachim"
      },
      {
        "label": "Peculiaridade de Voo",
        "value": "Partes corporais flutuam livremente contanto que os pés estejam no chão"
      },
      {
        "label": "Consumo Acidental",
        "value": "Engolida por susto ao ser surpreendido por Shanks nos tempos de grumete"
      }
    ]
  },
  {
    "id": "exc-op-3-alvida",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Sube Sube no Mi (Fruta do Escorregão)",
    "badgeTitle": "Paramecia Físico-Corporal",
    "targetCharacterId": "alvida",
    "targetCharacterName": "Alvida",
    "validCharacterIds": [
      "alvida"
    ],
    "clues": [
      {
        "label": "Efeito Corporal",
        "value": "Pele perfeitamente lisa e sedosa que faz ataques escorregarem"
      },
      {
        "label": "Transformação Visual",
        "value": "Alterou drasticamente a silhueta da usuária para um visual esguio"
      },
      {
        "label": "Primeiro Inimigo",
        "value": "Primeira capitã pirata derrotada por Luffy no início de sua jornada"
      }
    ]
  },
  {
    "id": "exc-op-4-mr-5",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Bomu Bomu no Mi (Fruta da Bomba)",
    "badgeTitle": "Paramecia Explosiva",
    "targetCharacterId": "gem",
    "targetCharacterName": "Mr. 5 (Gem)",
    "validCharacterIds": [
      "gem"
    ],
    "clues": [
      {
        "label": "Capacidade Letal",
        "value": "Qualquer secreção ou parte do corpo pode detonar como explosivo"
      },
      {
        "label": "Afiliação Secreta",
        "value": "Oficial da Baroque Works que atuava em conjunto com Miss Valentine"
      },
      {
        "label": "Munição Inusitada",
        "value": "Dispara projéteis de meleca explosiva e bafo inflamável"
      }
    ]
  },
  {
    "id": "exc-op-5-miss-valentine",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Kilo Kilo no Mi (Fruta do Quilo)",
    "badgeTitle": "Paramecia de Gravidade / Massa",
    "targetCharacterId": "mikita",
    "targetCharacterName": "Miss Valentine (Mikita)",
    "validCharacterIds": [
      "mikita"
    ],
    "clues": [
      {
        "label": "Faixa de Peso",
        "value": "Altera o próprio peso corporal de 1 quilograma até 10.000 quilos à vontade"
      },
      {
        "label": "Acessório de Combate",
        "value": "Usa um guarda-chuva para flutuar ao ficar leve e esmagar os inimigos"
      },
      {
        "label": "Organização",
        "value": "Parceira de combate do Mr. 5 durante a saga de Alabasta e Little Garden"
      }
    ]
  },
  {
    "id": "exc-op-6-mr-3-galdino",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Doru Doru no Mi (Fruta da Cera)",
    "badgeTitle": "Paramecia de Criação e Modelagem",
    "targetCharacterId": "galdino",
    "targetCharacterName": "Mr. 3 (Galdino)",
    "validCharacterIds": [
      "galdino"
    ],
    "clues": [
      {
        "label": "Resistência Estrutural",
        "value": "Cera tão rígida e densa após secar que rivaliza com aço temperado"
      },
      {
        "label": "Momento Histórico",
        "value": "Criou a chave de cera que libertou Portgas D. Ace na Guerra de Marineford"
      },
      {
        "label": "Penteado Característico",
        "value": "Cabelo em formato de pavio e número 3 que acende com fogo"
      }
    ]
  },
  {
    "id": "exc-op-7-wapol",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Baku Baku no Mi (Fruta da Mastigação)",
    "badgeTitle": "Paramecia de Consumo / Fusão",
    "targetCharacterId": "wapol",
    "targetCharacterName": "Wapol",
    "validCharacterIds": [
      "wapol"
    ],
    "clues": [
      {
        "label": "Metabolismo Único",
        "value": "Capaz de engolir qualquer matéria sólida e fundi-la ao seu próprio corpo"
      },
      {
        "label": "Invenção Industrial",
        "value": "Criou a lendária liga metálica Wapometal após ser banido de seu reino"
      },
      {
        "label": "Antigo Reinado",
        "value": "Ex-rei tirano do Reino de Drum que fugiu ao ser invadido por Barba Negra"
      }
    ]
  },
  {
    "id": "exc-op-8-mr-2-bon-kurei-bentham",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Mane Mane no Mi (Fruta do Clone / Cópia)",
    "badgeTitle": "Paramecia de Mimetismo",
    "targetCharacterId": "bentham",
    "targetCharacterName": "Mr. 2 Bon Kurei (Bentham)",
    "validCharacterIds": [
      "bentham"
    ],
    "clues": [
      {
        "label": "Mecânica de Toque",
        "value": "Tocar a face de alguém com a mão direita memoriza o rosto e voz"
      },
      {
        "label": "Usuários Históricos",
        "value": "Empunhada por Bentham (Mr. 2) e no passado por Kurozumi Higurashi em Wano"
      },
      {
        "label": "Sacrifício Heroico",
        "value": "Permitiu abrir os Portões da Justiça de Impel Down fingindo ser Magellan"
      }
    ]
  },
  {
    "id": "exc-op-9-miss-doublefinger",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Toge Toge no Mi (Fruta dos Espinhos)",
    "badgeTitle": "Paramecia de Projeção Corporal",
    "targetCharacterId": "zala",
    "targetCharacterName": "Miss Doublefinger (Zala)",
    "validCharacterIds": [
      "zala"
    ],
    "clues": [
      {
        "label": "Poder Perfurante",
        "value": "Brota espinhos pontiagudos de qualquer parte da anatomia corporal"
      },
      {
        "label": "Identidade Disfarçada",
        "value": "Dona do café Spiders em Alabasta e Oficial número 2 da Baroque Works"
      },
      {
        "label": "Duelo Marcante",
        "value": "Enfrentou Nami no primeiro teste do Clima-Tact em Alubarna"
      }
    ]
  },
  {
    "id": "exc-op-10-mr-1-daz-bones",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Supa Supa no Mi (Fruta da Lâmina de Aço)",
    "badgeTitle": "Paramecia de Mutação Metálica",
    "targetCharacterId": "daz-bones",
    "targetCharacterName": "Mr. 1 (Daz Bones)",
    "validCharacterIds": [
      "daz-bones"
    ],
    "clues": [
      {
        "label": "Dureza Metálica",
        "value": "Transforma o corpo em lâminas de aço afiado e indestrutível"
      },
      {
        "label": "Batalha Lendária",
        "value": "Forçou Roronoa Zoro a aprender a cortar o ferro para superá-lo"
      },
      {
        "label": "Lealdade Contínua",
        "value": "Braço direito e executor mais leal de Crocodile desde Alabasta até a Cross Guild"
      }
    ]
  },
  {
    "id": "exc-op-11-hina",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ori Ori no Mi (Fruta da Prisão / Jaula)",
    "badgeTitle": "Paramecia de Confinamento",
    "targetCharacterId": "hina",
    "targetCharacterName": "Hina",
    "validCharacterIds": [
      "hina"
    ],
    "clues": [
      {
        "label": "Mecanismo de Captura",
        "value": "Membros corporais geram argolas de ferro que prendem quem as atravessa"
      },
      {
        "label": "Patente na Marinha",
        "value": "Oficial da Marinha conhecida como Hina da Jaula Negra, amiga de Smoker"
      },
      {
        "label": "Modo de Falar",
        "value": "Frequente hábito de falar de si mesma na terceira pessoa"
      }
    ]
  },
  {
    "id": "exc-op-12-bellamy",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Bane Bane no Mi (Fruta da Mola)",
    "badgeTitle": "Paramecia de Propulsão",
    "targetCharacterId": "bellamy",
    "targetCharacterName": "Bellamy",
    "validCharacterIds": [
      "bellamy"
    ],
    "clues": [
      {
        "label": "Mecanismo de Salto",
        "value": "Transforma pernas e braços em molas espirais de alta compressão"
      },
      {
        "label": "Alcunha Pirata",
        "value": "Bellamy, a Hiena de Jaya e Dressrosa"
      },
      {
        "label": "Nocaute Icônico",
        "value": "Derrubado por Monkey D. Luffy com apenas um soco direto em Mock Town"
      }
    ]
  },
  {
    "id": "exc-op-13-foxy",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Noro Noro no Mi (Fruta da Lentidão)",
    "badgeTitle": "Paramecia de Alteração Temporal",
    "targetCharacterId": "foxy",
    "targetCharacterName": "Foxy",
    "validCharacterIds": [
      "foxy"
    ],
    "clues": [
      {
        "label": "Efeito Temporal",
        "value": "Feixes de fótons Noro que reduzem a velocidade de qualquer alvo por 30 segundos"
      },
      {
        "label": "Competição Pirata",
        "value": "Especialista nos jogos de aposta do Davy Back Fight em Long Ring Long Land"
      },
      {
        "label": "Aparência Marcante",
        "value": "Capitão com nariz partido e risada característica Fehfehfeh"
      }
    ]
  },
  {
    "id": "exc-op-14-blueno",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Doa Doa no Mi (Fruta da Porta)",
    "badgeTitle": "Paramecia Dimensional",
    "targetCharacterId": "blueno",
    "targetCharacterName": "Blueno",
    "validCharacterIds": [
      "blueno"
    ],
    "clues": [
      {
        "label": "Dimensão Própria",
        "value": "Cria portas em qualquer superfície, incluindo o próprio ar e rostos"
      },
      {
        "label": "Refúgio Seguro",
        "value": "Acesso a uma dimensão paralela de bolso invisível aos olhos externos"
      },
      {
        "label": "Disfarce Urbano",
        "value": "Agente da CP9 disfarçado como barman na cidade de Water 7"
      }
    ]
  },
  {
    "id": "exc-op-15-kalifa",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Awa Awa no Mi (Fruta do Sabão)",
    "badgeTitle": "Paramecia de Fluido Limpador",
    "targetCharacterId": "kalifa",
    "targetCharacterName": "Kalifa",
    "validCharacterIds": [
      "kalifa"
    ],
    "clues": [
      {
        "label": "Efeito Redutor",
        "value": "Bolhas de sabão que lavam a força e deixam o corpo liso e escorregadio"
      },
      {
        "label": "Origem da Fruta",
        "value": "Presenteada por Spandam junto com a fruta de Kaku em Enies Lobby"
      },
      {
        "label": "Secretária Infiltrada",
        "value": "Atuava como secretária particular do prefeito Iceburg em Water 7"
      }
    ]
  },
  {
    "id": "exc-op-16-very-good",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Beri Beri no Mi (Fruta das Esferas / Bagas)",
    "badgeTitle": "Paramecia de Desmembramento",
    "targetCharacterId": "smoker",
    "targetCharacterName": "Smoker",
    "validCharacterIds": [
      "smoker"
    ],
    "clues": [
      {
        "label": "Divisão Esférica",
        "value": "Divide o corpo em inúmeras esferas redondas como cachos de frutas"
      },
      {
        "label": "Imunidade Contundente",
        "value": "Extremamente resistente a golpes de impacto e socos contundentes"
      },
      {
        "label": "Operação Militar",
        "value": "Capitão da Marinha participante do Buster Call em Enies Lobby"
      }
    ]
  },
  {
    "id": "exc-op-18-sharinguru",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Shari Shari no Mi (Fruta da Roda)",
    "badgeTitle": "Paramecia Motora",
    "targetCharacterId": "franky",
    "targetCharacterName": "Franky",
    "validCharacterIds": [
      "franky"
    ],
    "clues": [
      {
        "label": "Rotação Mecânica",
        "value": "Transforma membros corporais em rodas que giram em velocidades vertiginosas"
      },
      {
        "label": "Impacto Físico",
        "value": "Utiliza as rodas giratórias como armas cortantes e de atropelamento"
      },
      {
        "label": "Confronto em Enies Lobby",
        "value": "Enfrentou Franky na ponte da hesitação durante o Buster Call"
      }
    ]
  },
  {
    "id": "exc-op-19-brook",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Yomi Yomi no Mi (Fruta da Ressurreição)",
    "badgeTitle": "Paramecia Espiritual",
    "targetCharacterId": "brook",
    "targetCharacterName": "Brook",
    "validCharacterIds": [
      "brook"
    ],
    "clues": [
      {
        "label": "Segunda Vida",
        "value": "Concede uma segunda vida após a morte e controle total da alma"
      },
      {
        "label": "Forma Física Resultante",
        "value": "Corpo esquelético devido à alma ter demorado um ano para achar o cadáver na névoa"
      },
      {
        "label": "Poder do Frio",
        "value": "Canaliza os calafrios do submundo para congelar suas lâminas de esgrima"
      }
    ]
  },
  {
    "id": "exc-op-20-gecko-moria",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Kage Kage no Mi (Fruta das Sombras)",
    "badgeTitle": "Paramecia de Manipulação Espiritual",
    "targetCharacterId": "moria-gecko",
    "targetCharacterName": "Moria Gecko",
    "validCharacterIds": [
      "moria-gecko"
    ],
    "clues": [
      {
        "label": "Exército Zumbi",
        "value": "Rouba sombras de pessoas vivas para animar cadáveres construídos por Hogback"
      },
      {
        "label": "Habilidade Doppelman",
        "value": "Cria um clone de sombra tangível capaz de trocar de lugar com o usuário"
      },
      {
        "label": "Navio Território",
        "value": "Comandava a maior ilha-navio do mundo, Thriller Bark, no Triângulo Florian"
      }
    ]
  },
  {
    "id": "exc-op-21-perona",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Horo Horo no Mi (Fruta dos Fantasmas)",
    "badgeTitle": "Paramecia Ectoplásmica",
    "targetCharacterId": "perona",
    "targetCharacterName": "Perona",
    "validCharacterIds": [
      "perona"
    ],
    "clues": [
      {
        "label": "Fantasmas Negativos",
        "value": "Fantasmas que drenam a vontade de viver de qualquer um, tornando-o deprimido"
      },
      {
        "label": "Única Imunidade",
        "value": "Usopp foi imune aos fantasmas por já possuir negatividade natural extrema"
      },
      {
        "label": "Projeção Astral",
        "value": "Capaz de projetar a própria consciência como um holograma intangível gigante"
      }
    ]
  },
  {
    "id": "exc-op-22-shiryu",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Suke Suke no Mi (Fruta da Invisibilidade)",
    "badgeTitle": "Paramecia Óptica",
    "targetCharacterId": "shiryu",
    "targetCharacterName": "Shiryu",
    "validCharacterIds": [
      "shiryu",
      "absalom"
    ],
    "clues": [
      {
        "label": "Efeito Óptico",
        "value": "Torna o usuário e qualquer objeto ou pessoa em contato completamente invisíveis"
      },
      {
        "label": "Sucessão Trágica",
        "value": "Pertencia a Absalom em Thriller Bark antes de ser roubada por Barba Negra para Shiryu"
      },
      {
        "label": "Espadachim Letal",
        "value": "Agora empunhada pelo assassino ex-chefe carcereiro de Impel Down"
      }
    ]
  },
  {
    "id": "exc-op-23-bartholomew-kuma",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Nikyu Nikyu no Mi (Fruta da Pata)",
    "badgeTitle": "Paramecia de Repulsão Conceitual",
    "targetCharacterId": "bartholomew-kuma",
    "targetCharacterName": "Bartholomew Kuma",
    "validCharacterIds": [
      "bartholomew-kuma"
    ],
    "clues": [
      {
        "label": "Almofadas nas Mãos",
        "value": "Patas carnosas capazes de repelir qualquer matéria, dor física e até memórias"
      },
      {
        "label": "Viagem de Três Dias",
        "value": "Envia pessoas voando pelos céus até ilhas distantes em bolhas de ar por 3 dias"
      },
      {
        "label": "Linhagem Buccaneer",
        "value": "Portador pacifista e mártir do Reino de Sorbet e do Exército Revolucionário"
      }
    ]
  },
  {
    "id": "exc-op-24-boa-hancock",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Mero Mero no Mi (Fruta da Paixão / Petrificação)",
    "badgeTitle": "Paramecia Emocional",
    "targetCharacterId": "boa-hancock",
    "targetCharacterName": "Boa Hancock",
    "validCharacterIds": [
      "boa-hancock"
    ],
    "clues": [
      {
        "label": "Petrificação",
        "value": "Transforma em pedra qualquer pessoa que nutra pensamentos lascivos ou de atração"
      },
      {
        "label": "Raio de Flechas",
        "value": "Dispara flechas e beijos em forma de coração capazes de quebrar e petrificar rochas"
      },
      {
        "label": "Imperatriz Pirata",
        "value": "Usuária e soberana de Amazon Lily, a Imperatriz de Kuja"
      }
    ]
  },
  {
    "id": "exc-op-25-magellan",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Doku Doku no Mi (Fruta do Veneno)",
    "badgeTitle": "Paramecia de Tóxicos",
    "targetCharacterId": "magellan",
    "targetCharacterName": "Magellan",
    "validCharacterIds": [
      "magellan"
    ],
    "clues": [
      {
        "label": "Golpe Kinjite",
        "value": "Técnica proibida Veneno do Julgamento do Inferno (Venom Demon) corrosivo"
      },
      {
        "label": "Consequência Digestiva",
        "value": "Usuário sofre de diarreia crônica por ingerir comida envenenada"
      },
      {
        "label": "Fortaleza Submarina",
        "value": "Diretor supremo da prisão de segurança máxima Impel Down"
      }
    ]
  },
  {
    "id": "exc-op-26-emporio-ivankov",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Horu Horu no Mi (Fruta dos Hormônios)",
    "badgeTitle": "Paramecia Bioquímica",
    "targetCharacterId": "emporio-ivankov",
    "targetCharacterName": "Emporio Ivankov",
    "validCharacterIds": [
      "emporio-ivankov"
    ],
    "clues": [
      {
        "label": "Injeção nas Unhas",
        "value": "Altera gênero, temperatura, crescimento, vigor e pigmentação através de hormônios"
      },
      {
        "label": "Rainha de Kamabakka",
        "value": "Monarca do Reino dos Okamas e comandante do Exército Revolucionário"
      },
      {
        "label": "Salvamento de Luffy",
        "value": "Curou Luffy do veneno letal de Magellan através dos hormônios de cura e tensão"
      }
    ]
  },
  {
    "id": "exc-op-27-inazuma",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Choki Choki no Mi (Fruta da Tesoura)",
    "badgeTitle": "Paramecia de Transformação",
    "targetCharacterId": "inazuma",
    "targetCharacterName": "Inazuma",
    "validCharacterIds": [
      "inazuma"
    ],
    "clues": [
      {
        "label": "Corte Maleável",
        "value": "Transforma as mãos em lâminas que cortam qualquer substância sólida como se fosse papel"
      },
      {
        "label": "Construção da Rampa",
        "value": "Cortou o solo de Marineford criando uma ponte para Luffy alcançar o cadafalso"
      },
      {
        "label": "Companheiro Revolucionário",
        "value": "Braço direito de Emporio Ivankov com jaqueta de duas cores e taça de vinho"
      }
    ]
  },
  {
    "id": "exc-op-28-edward-newgate-barba-branca",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Gura Gura no Mi (Fruta do Terremoto)",
    "badgeTitle": "Paramecia Mais Destrutiva do Mundo",
    "targetCharacterId": "edward-newgate-barba-branca",
    "targetCharacterName": "Edward Newgate (Barba Branca)",
    "validCharacterIds": [
      "edward-newgate-barba-branca",
      "marshall-d-teach"
    ],
    "clues": [
      {
        "label": "Poder de Destruição",
        "value": "Capaz de rachar o próprio ar e gerar maremotos e tsunamis colossais"
      },
      {
        "label": "Transferência Obscura",
        "value": "Roubada do corpo do Barba Branca sob um pano negro durante Marineford"
      },
      {
        "label": "Ameaça Planetária",
        "value": "Dita por Sengoku como possuidora do poder capaz de destruir o mundo inteiro"
      }
    ]
  },
  {
    "id": "exc-op-29-trafalgar-d-water-law",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ope Ope no Mi (Fruta da Operação)",
    "badgeTitle": "Paramecia Suprema da Medicina",
    "targetCharacterId": "law-trafalgar",
    "targetCharacterName": "Law Trafalgar",
    "validCharacterIds": [
      "law-trafalgar"
    ],
    "clues": [
      {
        "label": "Esfera Espacial",
        "value": "Habilidade ROOM: domínio espacial onde o cirurgião pode decepar e teleportar sem ferir"
      },
      {
        "label": "Cirurgia da Juventude Perene",
        "value": "Capaz de conceder vida eterna a alguém em troca do sacrifício da vida do usuário"
      },
      {
        "label": "Preço no Submundo",
        "value": "O Governo Mundial tentou comprá-la por 5 bilhões de Berries no passado"
      }
    ]
  },
  {
    "id": "exc-op-30-capone-bege",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Shiro Shiro no Mi (Fruta do Castelo)",
    "badgeTitle": "Paramecia Arquitetônica",
    "targetCharacterId": "capone-bege",
    "targetCharacterName": "Capone Bege",
    "validCharacterIds": [
      "capone-bege"
    ],
    "clues": [
      {
        "label": "Corpo Fortaleza",
        "value": "Transforma o interior do corpo em uma fortaleza viva com canhões e cavalaria"
      },
      {
        "label": "Forma Big Father",
        "value": "Gigantesca fortaleza blindada com esteiras de tanque de guerra"
      },
      {
        "label": "Chefe da Máfia",
        "value": "Líder dos Firetank Pirates vindo do West Blue e infiltrado na família Charlotte"
      }
    ]
  },
  {
    "id": "exc-op-31-basil-hawkins",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Wara Wara no Mi (Fruta da Palha)",
    "badgeTitle": "Paramecia de Vodu",
    "targetCharacterId": "basil-hawkins",
    "targetCharacterName": "Basil Hawkins",
    "validCharacterIds": [
      "basil-hawkins"
    ],
    "clues": [
      {
        "label": "Redirecionamento de Dano",
        "value": "Bonecos de palha no corpo transferem ferimentos mortais para terceiros"
      },
      {
        "label": "Forma Monstruosa",
        "value": "Transforma-se em um demônio gigante de palha (Goumame) armado com pregos"
      },
      {
        "label": "Leitura de Tarô",
        "value": "Supernova obcecado por porcentagens e adivinhações do destino"
      }
    ]
  },
  {
    "id": "exc-op-32-scratchmen-apoo",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Oto Oto no Mi (Fruta da Música / Som)",
    "badgeTitle": "Paramecia Acústica",
    "targetCharacterId": "scratchmen-apoo",
    "targetCharacterName": "Scratchmen Apoo",
    "validCharacterIds": [
      "scratchmen-apoo"
    ],
    "clues": [
      {
        "label": "Membros Instrumentos",
        "value": "Transforma partes do corpo em pratos, flautas, trompetes e tambores"
      },
      {
        "label": "Som Cortante e Explosivo",
        "value": "Golpes sonoros que explodem ou fatiam qualquer um que ouça a melodia"
      },
      {
        "label": "Tribo de Origem",
        "value": "Supernova pertencente à tribo dos braços longos"
      }
    ]
  },
  {
    "id": "exc-op-33-eustass-kid",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Jiki Jiki no Mi (Fruta do Magnetismo)",
    "badgeTitle": "Paramecia Eletromagnética",
    "targetCharacterId": "eustass-kid",
    "targetCharacterName": "Eustass Kid",
    "validCharacterIds": [
      "eustass-kid"
    ],
    "clues": [
      {
        "label": "Manipulação Férrea",
        "value": "Atrai e repele metais construindo gigantescos braços e feras mecânicas"
      },
      {
        "label": "Despertar Magnético",
        "value": "Assign: transforma qualquer outro ser vivo ou objeto num ímã poderoso"
      },
      {
        "label": "Canhão Final",
        "value": "Damned Punk: canhão eletromagnético de trilho usado contra Big Mom"
      }
    ]
  },
  {
    "id": "exc-op-34-donquixote-doflamingo",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ito Ito no Mi (Fruta do Fio)",
    "badgeTitle": "Paramecia Têxtil / Estrutural",
    "targetCharacterId": "donquixote-doflamingo",
    "targetCharacterName": "Donquixote Doflamingo",
    "validCharacterIds": [
      "donquixote-doflamingo"
    ],
    "clues": [
      {
        "label": "Técnica Torikago",
        "value": "Gaiola de pássaros gigante com fios cortantes que fecham sobre a ilha"
      },
      {
        "label": "Marionetes Humanas",
        "value": "Parasite: controla os movimentos de inimigos conectando fios na coluna"
      },
      {
        "label": "Voo Aéreo",
        "value": "Flutua pelos céus enganchando fios microscópicos nas nuvens"
      }
    ]
  },
  {
    "id": "exc-op-35-bartolomeo",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Bari Bari no Mi (Fruta da Barreira)",
    "badgeTitle": "Paramecia Defensiva Indestrutível",
    "targetCharacterId": "bartolomeo",
    "targetCharacterName": "Bartolomeo",
    "validCharacterIds": [
      "bartolomeo"
    ],
    "clues": [
      {
        "label": "Gesto dos Dedos",
        "value": "Cruzar os dedos indicador e médio gera escudos completamente inquebráveis"
      },
      {
        "label": "Defesa Absoluta",
        "value": "Bloqueou o King Punch de Elizabello e os cortes de Oden no passado de Wano"
      },
      {
        "label": "Fã Número Um",
        "value": "Usuário atual lidera o fã-clube Barto Club em devoção total aos Mugiwaras"
      }
    ]
  },
  {
    "id": "exc-op-36-baby-5",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Buki Buki no Mi (Fruta das Armas)",
    "badgeTitle": "Paramecia Bélica",
    "targetCharacterId": "baby-5",
    "targetCharacterName": "Baby 5",
    "validCharacterIds": [
      "baby-5"
    ],
    "clues": [
      {
        "label": "Arsenal Vivo",
        "value": "Transforma qualquer parte do corpo em lâminas, pistolas, mísseis ou foices"
      },
      {
        "label": "Necessidade Psicológica",
        "value": "Incapaz de recusar qualquer pedido por necessidade obsessiva de se sentir útil"
      },
      {
        "label": "Casamento em Dressrosa",
        "value": "Ex-assassina da família Donquixote que se casou com Sai da Armada Happo"
      }
    ]
  },
  {
    "id": "exc-op-37-buffalo",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Guru Guru no Mi (Fruta da Rotação / Hélice)",
    "badgeTitle": "Paramecia Propulsora",
    "targetCharacterId": "buffalo",
    "targetCharacterName": "buffalo",
    "validCharacterIds": [
      "buffalo"
    ],
    "clues": [
      {
        "label": "Voo Rotativo",
        "value": "Gira cabelos e membros como hélices gerando sustentação de voo e ventanias"
      },
      {
        "label": "Combinação Aérea",
        "value": "Servia de plataforma voadora para Baby 5 atirar durante missões em Punk Hazard"
      },
      {
        "label": "Oficial de Pica",
        "value": "Membro com visual rechonchudo e trança no cabelo da tripulação de Doflamingo"
      }
    ]
  },
  {
    "id": "exc-op-38-leo",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Nui Nui no Mi (Fruta da Costura)",
    "badgeTitle": "Paramecia Têxtil",
    "targetCharacterId": "leo",
    "targetCharacterName": "Leo",
    "validCharacterIds": [
      "leo"
    ],
    "clues": [
      {
        "label": "Agulha e Linha",
        "value": "Costura qualquer objeto, metal ou pessoas no próprio solo sem causar ferimentos"
      },
      {
        "label": "Líder dos Anões",
        "value": "Guerreiro e líder dos Tontattas do Reino de Tontatta em Dressrosa"
      },
      {
        "label": "Grande Frota",
        "value": "Capitão da 5ª Divisão da Grande Frota dos Chapéus de Palha"
      }
    ]
  },
  {
    "id": "exc-op-39-viola",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Giro Giro no Mi (Fruta do Olhar)",
    "badgeTitle": "Paramecia Sensorial / Clarividência",
    "targetCharacterId": "viola",
    "targetCharacterName": "Viola",
    "validCharacterIds": [
      "viola"
    ],
    "clues": [
      {
        "label": "Visão de 4.000 km",
        "value": "Permite enxergar através de tudo e ver a mente e memórias das pessoas"
      },
      {
        "label": "Lágrimas Ofensivas",
        "value": "Transforma lágrimas em grandes baleias de ferro para esmagar alvos"
      },
      {
        "label": "Princesa de Dressrosa",
        "value": "Filha do Rei Riku que atuava infiltrada na família Donquixote como Violet"
      }
    ]
  },
  {
    "id": "exc-op-40-jora",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ato Ato no Mi (Fruta da Arte)",
    "badgeTitle": "Paramecia de Transfiguração",
    "targetCharacterId": "jora",
    "targetCharacterName": "jora",
    "validCharacterIds": [
      "jora"
    ],
    "clues": [
      {
        "label": "Distorção Artística",
        "value": "Transforma seres vivos e armas em pinturas cubistas e abstratas sem função"
      },
      {
        "label": "Alvo Emboscado",
        "value": "Quase destruiu o Thousand Sunny transformando Nami, Chopper e Brook em arte"
      },
      {
        "label": "Estilo de Pintura",
        "value": "Adora citar estilos artísticos pós-modernos e estética surrealista"
      }
    ]
  },
  {
    "id": "exc-op-41-kelly-funk",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Jake Jake no Mi (Fruta da Jaqueta)",
    "badgeTitle": "Paramecia Simbiótica",
    "targetCharacterId": "leo",
    "targetCharacterName": "Leo",
    "validCharacterIds": [
      "leo"
    ],
    "clues": [
      {
        "label": "Possessão Corporal",
        "value": "Transforma o usuário em uma jaqueta que, ao ser vestida, controla o hospedeiro"
      },
      {
        "label": "Dupla de Irmãos",
        "value": "Veste o corpo de seu irmão gigante e poderoso Bobby Funk no Coliseu Corrida"
      },
      {
        "label": "Assassinos de Mogaro",
        "value": "Gladiadores mercenários conhecidos pelas lutas brutais e sem regras"
      }
    ]
  },
  {
    "id": "exc-op-42-gladius",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Pamu Pamu no Mi (Fruta da Ruptura)",
    "badgeTitle": "Paramecia de Expansão e Estalo",
    "targetCharacterId": "gladius",
    "targetCharacterName": "gladius",
    "validCharacterIds": [
      "gladius"
    ],
    "clues": [
      {
        "label": "Inchaço Explosivo",
        "value": "Faz qualquer matéria inorgânica ou o próprio corpo inchar até estourar em estilhaços"
      },
      {
        "label": "Cabelo Espinhoso",
        "value": "Dispara agulhas envenenadas de seus próprios cabelos inflados"
      },
      {
        "label": "Oficial de Diamante",
        "value": "Membro com máscara e óculos steampunk da família Donquixote"
      }
    ]
  },
  {
    "id": "exc-op-43-senor-pink",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Sui Sui no Mi (Fruta do Nado)",
    "badgeTitle": "Paramecia de Translocação",
    "targetCharacterId": "senor-pink",
    "targetCharacterName": "Senor Pink",
    "validCharacterIds": [
      "senor-pink"
    ],
    "clues": [
      {
        "label": "Nado em Sólidos",
        "value": "Permite nadar no chão, paredes de concreto e pedras como se fossem água"
      },
      {
        "label": "Vestimenta Excêntrica",
        "value": "Usa fraldas, chupeta e touca de bebê em homenagem ao amor por sua falecida esposa Lucianne"
      },
      {
        "label": "Duelo de Homens",
        "value": "Travou uma lendária e honrada batalha de troca de socos contra Franky"
      }
    ]
  },
  {
    "id": "exc-op-44-machvise",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ton Ton no Mi (Fruta das Toneladas)",
    "badgeTitle": "Paramecia de Massa Superior",
    "targetCharacterId": "machvise",
    "targetCharacterName": "machvise",
    "validCharacterIds": [
      "machvise"
    ],
    "clues": [
      {
        "label": "Massa Extrema",
        "value": "Aumenta o próprio peso corporal em dezenas de milhares de toneladas métricas"
      },
      {
        "label": "Golpe Aéreo",
        "value": "Desaba como um meteorito usando um escudo de ferro preso às costas"
      },
      {
        "label": "Derrota em Dressrosa",
        "value": "Teve seus ossos esmagados pelo gigante Hajrudin empurrando-o contra o teto"
      }
    ]
  },
  {
    "id": "exc-op-45-diamante",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Hira Hira no Mi (Fruta da Bandeira)",
    "badgeTitle": "Paramecia de Maleabilidade",
    "targetCharacterId": "diamante",
    "targetCharacterName": "Diamante",
    "validCharacterIds": [
      "diamante"
    ],
    "clues": [
      {
        "label": "Ondulação Metálica",
        "value": "Torna qualquer material flexível e esvoaçante como pano sem perder sua dureza"
      },
      {
        "label": "Lâmina Dobrável",
        "value": "Dobra espadas em formatos imprevisíveis de serpente para surpreender inimigos"
      },
      {
        "label": "Herói do Coliseu",
        "value": "Oficial comandante executivo do Coliseu Corrida em Dressrosa"
      }
    ]
  },
  {
    "id": "exc-op-46-pica",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ishi Ishi no Mi (Fruta da Pedra)",
    "badgeTitle": "Paramecia de Assimilação Terrena",
    "targetCharacterId": "pica",
    "targetCharacterName": "Pica",
    "validCharacterIds": [
      "pica"
    ],
    "clues": [
      {
        "label": "Golem Continental",
        "value": "Funde-se à rocha criando um titã de pedra do tamanho de montanhas inteiras"
      },
      {
        "label": "Contraste Cômico",
        "value": "Apesar do porte gigante assustador, possui uma voz agudíssima e cômica"
      },
      {
        "label": "Corte Tri-Dimensional",
        "value": "Teve seu golem fatiado no ar pelo Sanzen Sekai de Roronoa Zoro"
      }
    ]
  },
  {
    "id": "exc-op-47-kanjuro",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Fude Fude no Mi (Fruta do Pincel / Desenho)",
    "badgeTitle": "Paramecia Artística Materializadora",
    "targetCharacterId": "kurozumi-kanjuro",
    "targetCharacterName": "kanjuro",
    "validCharacterIds": [
      "kurozumi-kanjuro"
    ],
    "clues": [
      {
        "label": "Tinta Viva",
        "value": "Qualquer desenho feito com tinta e seu pincel ganha vida e substância real"
      },
      {
        "label": "Disfarce de Incompetente",
        "value": "Desenhava mal de propósito para não levantar suspeitas de que era um traidor"
      },
      {
        "label": "Traidor de Wano",
        "value": "Membro do clã Kurozumi que traiu a confiança dos Bainhas Vermelhas"
      }
    ]
  },
  {
    "id": "exc-op-48-trebol",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Beta Beta no Mi (Fruta da Viscosidade / Muco)",
    "badgeTitle": "Paramecia Viscosa Inflamável",
    "targetCharacterId": "trebol",
    "targetCharacterName": "Trebol",
    "validCharacterIds": [
      "trebol"
    ],
    "clues": [
      {
        "label": "Propriedade Falsa de Logia",
        "value": "Parece Logia, mas é uma Paramecia secretada sobre um corpo extremamente franzino"
      },
      {
        "label": "Substância Altamente Combustível",
        "value": "O muco grudento explode violentamente ao contato com a menor fagulha"
      },
      {
        "label": "Mentor do Crime",
        "value": "Foi quem entregou a arma e a fruta Ito Ito para Doflamingo quando jovem"
      }
    ]
  },
  {
    "id": "exc-op-49-sugar",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Hobi Hobi no Mi (Fruta do Brinquedo)",
    "badgeTitle": "Paramecia de Apagamento Memorial",
    "targetCharacterId": "sugar",
    "targetCharacterName": "Sugar",
    "validCharacterIds": [
      "sugar"
    ],
    "clues": [
      {
        "label": "Toque Amnésico",
        "value": "Transforma pessoas em brinquedos e apaga sua memória da mente de todo o mundo"
      },
      {
        "label": "Juventude Congelada",
        "value": "O usuário para de envelhecer no instante exato em que consome o fruto"
      },
      {
        "label": "Rosto do Pânico",
        "value": "Desmaiou duas vezes após presenciar as expressões apavorantes de God Usopp"
      }
    ]
  },
  {
    "id": "exc-op-50-fujitora-issho",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Zushi Zushi no Mi (Fruta da Gravidade)",
    "badgeTitle": "Paramecia Gravitacional",
    "targetCharacterId": "issho-fujitora",
    "targetCharacterName": "Issho (Fujitora)",
    "validCharacterIds": [
      "issho-fujitora"
    ],
    "clues": [
      {
        "label": "Invocação de Meteoros",
        "value": "Manipula forças de gravidade puxando meteoritos incandescentes do espaço"
      },
      {
        "label": "Cegueira Autoimposta",
        "value": "Usuário é um Almirante cego da Marinha que empunha uma espada shikomi-zue"
      },
      {
        "label": "Pressão Vertical",
        "value": "Cria crateras gigantescas esmagando inimigos contra o piso com gravidade pura"
      }
    ]
  },
  {
    "id": "exc-op-51-charlotte-linlin-big-mom",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Soru Soru no Mi (Fruta das Almas)",
    "badgeTitle": "Paramecia Espiritual Superior",
    "targetCharacterId": "charlotte-linlin",
    "targetCharacterName": "Charlotte Linlin (Big Mom)",
    "validCharacterIds": [
      "charlotte-linlin"
    ],
    "clues": [
      {
        "label": "Criação de Homies",
        "value": "Injeta fragmentos de almas humanas em nuvens, fogo e espadas (Zeus, Prometeus, Hera)"
      },
      {
        "label": "Soul Pocus",
        "value": "Arranca a expectativa de vida inteira de quem sentir medo da usuária"
      },
      {
        "label": "Origem Misteriosa",
        "value": "Adquirida após o desaparecimento de Mãe Carmel no aniversário de infância em Elbaf"
      }
    ]
  },
  {
    "id": "exc-op-52-charlotte-perospero",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Pero Pero no Mi (Fruta do Doce / Pirulito)",
    "badgeTitle": "Paramecia de Caramelo",
    "targetCharacterId": "charlotte-perospero",
    "targetCharacterName": "Charlotte Perospero",
    "validCharacterIds": [
      "charlotte-perospero"
    ],
    "clues": [
      {
        "label": "Caramelo Endurecido",
        "value": "Cria construções complexas de doce e réplicas de ferrovia e laboratório"
      },
      {
        "label": "Primogênito da Família",
        "value": "Filho mais velho de Big Mom com chapéu pontudo e língua gigantesca"
      },
      {
        "label": "Perda do Braço",
        "value": "Perdeu um braço na explosão de sacrifício de Pedro em Whole Cake Island"
      }
    ]
  },
  {
    "id": "exc-op-53-charlotte-brulee",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Mira Mira no Mi (Fruta do Espelho)",
    "badgeTitle": "Paramecia Dimensional Espelhada",
    "targetCharacterId": "charlotte-brulee",
    "targetCharacterName": "Charlotte Brulee",
    "validCharacterIds": [
      "charlotte-brulee"
    ],
    "clues": [
      {
        "label": "Dimensão Mirror World",
        "value": "Permite entrar nos espelhos e transitar por qualquer espelho da ilha"
      },
      {
        "label": "Reflexo de Golpes",
        "value": "Reflete projéteis e ataques de volta para o agressor através da superfície espelhada"
      },
      {
        "label": "Irmã Protetora",
        "value": "Irmã de Katakuri que foi cortada no rosto na infância, gerando o complexo do irmão"
      }
    ]
  },
  {
    "id": "exc-op-54-charlotte-katakuri",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Mochi Mochi no Mi (Fruta do Mochi)",
    "badgeTitle": "Paramecia Especial (Comportamento de Logia)",
    "targetCharacterId": "charlotte-katakuri",
    "targetCharacterName": "Charlotte Katakuri",
    "validCharacterIds": [
      "charlotte-katakuri"
    ],
    "clues": [
      {
        "label": "Paramecia Especial",
        "value": "Permite gerar, controlar e se transformar em massa de arroz mochi"
      },
      {
        "label": "Visão do Futuro",
        "value": "Combinada com Haki da Observação avançado para moldar o corpo antes dos golpes"
      },
      {
        "label": "Lanche das Quatro",
        "value": "Hora sagrada em que come rosquinhas sem testemunhas para relaxar a boca"
      }
    ]
  },
  {
    "id": "exc-op-55-charlotte-cracker",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Bisu Bisu no Mi (Fruta do Biscoito)",
    "badgeTitle": "Paramecia de Criação Alimentar",
    "targetCharacterId": "charlotte-cracker",
    "targetCharacterName": "Charlotte Cracker",
    "validCharacterIds": [
      "charlotte-cracker"
    ],
    "clues": [
      {
        "label": "Armaduras Infinitas",
        "value": "Bate palmas para criar guerreiros armados de biscoito extremamente duros"
      },
      {
        "label": "Fraqueza à Água",
        "value": "Os biscoitos amolecem e perdem toda a rigidez ao contato com chuva ou líquidos"
      },
      {
        "label": "General da Doçura",
        "value": "Comandante da Doçura que Luffy derrotou após 11 horas comendo com o Gear 4 Tankman"
      }
    ]
  },
  {
    "id": "exc-op-56-charlotte-mont-dor",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Buku Buku no Mi (Fruta do Livro)",
    "badgeTitle": "Paramecia Literária",
    "targetCharacterId": "charlotte-mont-dor",
    "targetCharacterName": "Charlotte Mont-d'Or",
    "validCharacterIds": [
      "charlotte-mont-dor"
    ],
    "clues": [
      {
        "label": "Prisão em Páginas",
        "value": "Prende criaturas vivas para sempre dentro das páginas de livros como espécimes"
      },
      {
        "label": "Ilusão de Voo",
        "value": "Flutua sobre livros abertos controlando a biblioteca de Whole Cake"
      },
      {
        "label": "Ministro dos Queijos",
        "value": "Irmão encarregado do sistema de comunicação e alarmes de Totto Land"
      }
    ]
  },
  {
    "id": "exc-op-57-charlotte-daifuku",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Hoya Hoya no Mi (Fruta do Gênio da Lâmpada)",
    "badgeTitle": "Paramecia de Evocação",
    "targetCharacterId": "charlotte-daifuku",
    "targetCharacterName": "charlotte-daifuku",
    "validCharacterIds": [
      "charlotte-daifuku"
    ],
    "clues": [
      {
        "label": "Fricção Abdominal",
        "value": "Esfregar a própria barriga liberta um colossal guerreiro gênio armado com alabarda"
      },
      {
        "label": "Irmão Trigêmeo",
        "value": "Irmão trigêmeo de Katakuri e Oven, comandante naval da frota de Totto Land"
      },
      {
        "label": "Alcance Físico",
        "value": "O gênio luta a média distância enquanto o usuário comanda imóvel"
      }
    ]
  },
  {
    "id": "exc-op-58-charlotte-oven",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Netsu Netsu no Mi (Fruta do Calor)",
    "badgeTitle": "Paramecia Térmica",
    "targetCharacterId": "charlotte-oven",
    "targetCharacterName": "Charlotte Oven",
    "validCharacterIds": [
      "charlotte-oven"
    ],
    "clues": [
      {
        "label": "Superaquecimento Oceânico",
        "value": "Ferve porções inteiras do mar até o ponto de ebulição mergulhando os braços"
      },
      {
        "label": "Armas Incandescentes",
        "value": "Aquece a temperatura corporal a milhares de graus derretendo lâminas inimigas"
      },
      {
        "label": "Ministro dos Assados",
        "value": "Irmão de porte massivo que defendeu as docas de Cacao Island"
      }
    ]
  },
  {
    "id": "exc-op-59-streusen",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Kuku Kuku no Mi (Fruta do Cozinheiro)",
    "badgeTitle": "Paramecia Gourmet",
    "targetCharacterId": "streusen",
    "targetCharacterName": "streusen",
    "validCharacterIds": [
      "streusen"
    ],
    "clues": [
      {
        "label": "Transformação em Alimento",
        "value": "Transforma qualquer matéria inanimada como madeira ou pedras em comida saborosa"
      },
      {
        "label": "Fundador Secreto",
        "value": "Ex-pirata que encontrou Charlotte Linlin criança e fundou a tripulação com ela"
      },
      {
        "label": "Salvação de Whole Cake",
        "value": "Transformou o castelo destruído que desabava em bolo gigante amortecendo a queda"
      }
    ]
  },
  {
    "id": "exc-op-60-charlotte-pudding",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Memo Memo no Mi (Fruta da Memória)",
    "badgeTitle": "Paramecia Mnemônica",
    "targetCharacterId": "charlotte-pudding",
    "targetCharacterName": "Charlotte Pudding",
    "validCharacterIds": [
      "charlotte-pudding"
    ],
    "clues": [
      {
        "label": "Fita de Cinema",
        "value": "Puxa memórias em formato de tiras de filme cinematográfico cortando ou adicionando fatos"
      },
      {
        "label": "Terceiro Olho",
        "value": "Membro da tribo dos Três Olhos capaz de despertar a leitura de Poneglyphs"
      },
      {
        "label": "Amor por Sanji",
        "value": "Noiva forçada de Sanji que se apaixonou de verdade após ele elogiar seu terceiro olho"
      }
    ]
  },
  {
    "id": "exc-op-61-charlotte-smoothie",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Shibo Shibo no Mi (Fruta da Extração / Suco)",
    "badgeTitle": "Paramecia Hidrostática",
    "targetCharacterId": "charlotte-smoothie",
    "targetCharacterName": "Charlotte Smoothie",
    "validCharacterIds": [
      "charlotte-smoothie"
    ],
    "clues": [
      {
        "label": "Torção de Líquidos",
        "value": "Espreme líquidos e sucos de seres vivos e rochas torcendo-os com as mãos ou espada"
      },
      {
        "label": "Gigantismo Hídrico",
        "value": "Absorve umidade e venenos para crescer até proporções colossais"
      },
      {
        "label": "General de Três Olhos/Pernas Longas",
        "value": "Segunda filha de Big Mom e General da Doçura de 932 milhões de Berries"
      }
    ]
  },
  {
    "id": "exc-op-62-kinemon",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Fuku Fuku no Mi (Fruta da Roupa)",
    "badgeTitle": "Paramecia Têxtil",
    "targetCharacterId": "kinemon",
    "targetCharacterName": "Kin'emon",
    "validCharacterIds": [
      "kinemon"
    ],
    "clues": [
      {
        "label": "Folha na Cabeça",
        "value": "Colocar uma folha ou pedra sobre a cabeça materializa trajes e agasalhos térmicos"
      },
      {
        "label": "Líder dos Bainhas",
        "value": "Líder dos Nove Bainhas Vermelhas de Kozuki Oden"
      },
      {
        "label": "Corte do Fogo",
        "value": "Conhecido como Kin'emon do Fogo Raposo"
      }
    ]
  },
  {
    "id": "exc-op-63-raizo",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Maki Maki no Mi (Fruta do Pergaminho)",
    "badgeTitle": "Paramecia Ninja",
    "targetCharacterId": "raizo",
    "targetCharacterName": "Raizo",
    "validCharacterIds": [
      "raizo"
    ],
    "clues": [
      {
        "label": "Armazenamento Absoluto",
        "value": "Desenrola pergaminhos que absorvem água e fogo inimigo para devolver em seguida"
      },
      {
        "label": "Apagou Onigashima",
        "value": "Guardou a água do banho de Zunesha para inundar e extinguir o incêndio do castelo"
      },
      {
        "label": "Ninja de Wano",
        "value": "Bainha Vermelha de visual cômico e mestre do Ninjutsu"
      }
    ]
  },
  {
    "id": "exc-op-64-shinobu",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Juku Juku no Mi (Fruta do Amadurecimento)",
    "badgeTitle": "Paramecia Temporal Orgânica",
    "targetCharacterId": "shinobu",
    "targetCharacterName": "shinobu",
    "validCharacterIds": [
      "shinobu"
    ],
    "clues": [
      {
        "label": "Envelhecimento Físico",
        "value": "Amadurece e decai qualquer matéria inanimada ou faz pessoas avançarem na idade"
      },
      {
        "label": "Crescimento de Momonosuke",
        "value": "Envelheceu Kozuki Momonosuke 20 anos permitindo que ele virasse um dragão adulto"
      },
      {
        "label": "Kunoichi Protetora",
        "value": "Guerreira leal a Kozuki Oden desde a época de sua juventude"
      }
    ]
  },
  {
    "id": "exc-op-65-dr-vegapunk",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Nomi Nomi no Mi (Fruta do Cérebro)",
    "badgeTitle": "Paramecia Cerebral",
    "targetCharacterId": "vegapunk",
    "targetCharacterName": "Vegapunk",
    "validCharacterIds": [
      "vegapunk"
    ],
    "clues": [
      {
        "label": "Memória Infinita",
        "value": "Capacidade de armazenar informações ilimitadas, fazendo o cérebro crescer sem parar"
      },
      {
        "label": "Antena Punk Records",
        "value": "Cortou o próprio cérebro gigante colocando-o em um domo conectado aos Satélites"
      },
      {
        "label": "Maior Cientista do Mundo",
        "value": "Criador dos Pacifistas, Serafins e das armas tecnológicas mais avançadas"
      }
    ]
  },
  {
    "id": "exc-op-66-van-augur",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Wapu Wapu no Mi (Fruta do Teletransporte)",
    "badgeTitle": "Paramecia Espacial",
    "targetCharacterId": "van-augur",
    "targetCharacterName": "Van Augur",
    "validCharacterIds": [
      "van-augur"
    ],
    "clues": [
      {
        "label": "Translocação Instantânea",
        "value": "Teletransporta a si mesmo e a companheiros para qualquer ponto visível no horizonte"
      },
      {
        "label": "Atirador de Elite",
        "value": "Franco-atirador de Barba Negra armado com o rifle Senriku"
      },
      {
        "label": "Frase Famosa",
        "value": "Afirma constantemente que tudo no mundo é determinado pelo destino e sina"
      }
    ]
  },
  {
    "id": "exc-op-67-jesus-burgess",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Riki Riki no Mi (Fruta da Força)",
    "badgeTitle": "Paramecia de Aumento Físico",
    "targetCharacterId": "jesus-burgess",
    "targetCharacterName": "Jesus Burgess",
    "validCharacterIds": [
      "jesus-burgess"
    ],
    "clues": [
      {
        "label": "Superforça Extrema",
        "value": "Concede força sobre-humana suficiente para levantar montanhas inteiras no ar"
      },
      {
        "label": "Timoneiro Pirata",
        "value": "Capitão da 1ª Nau dos Piratas do Barba Negra conhecido como O Campeão"
      },
      {
        "label": "Máscara de Lucha",
        "value": "Usa máscara de luta livre mexicana e gritava Weahaha"
      }
    ]
  },
  {
    "id": "exc-op-68-doc-q",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Shiku Shiku no Mi (Fruta da Doença)",
    "badgeTitle": "Paramecia Patológica",
    "targetCharacterId": "doc-q",
    "targetCharacterName": "Doc Q",
    "validCharacterIds": [
      "doc-q"
    ],
    "clues": [
      {
        "label": "Infecção por Enfermidades",
        "value": "Espalha vírus e doenças contagiosas instantâneas, incluindo a Doença da Feminilização"
      },
      {
        "label": "Médico Doente",
        "value": "Médico da tripulação de Barba Negra que anda montado no cavalo Stronger"
      },
      {
        "label": "Maçãs Explosivas",
        "value": "Costumava distribuir cestas de maçãs contendo bombas sorteadas pelo destino"
      }
    ]
  },
  {
    "id": "exc-op-69-avalo-pizarro",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Shima Shima no Mi (Fruta da Ilha)",
    "badgeTitle": "Paramecia de Assimilação Geográfica",
    "targetCharacterId": "avalo-pizarro",
    "targetCharacterName": "Avalo Pizarro",
    "validCharacterIds": [
      "avalo-pizarro"
    ],
    "clues": [
      {
        "label": "Ilha Viva",
        "value": "Funde-se à massa de terra de uma ilha inteira controlando suas montanhas e solo"
      },
      {
        "label": "Prisioneiro do Nível 6",
        "value": "Ex-rei corrupto do North Blue libertado de Impel Down por Barba Negra"
      },
      {
        "label": "Batalha de Hachinosu",
        "value": "Tentou esmagar o navio da Marinha com uma mão rochosa colossal de Hachinosu"
      }
    ]
  },
  {
    "id": "exc-op-70-sanjuan-wolf",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Deka Deka no Mi (Fruta do Gigantismo)",
    "badgeTitle": "Paramecia de Tamanho",
    "targetCharacterId": "sanjuan-wolf",
    "targetCharacterName": "Sanjuan Wolf",
    "validCharacterIds": [
      "sanjuan-wolf"
    ],
    "clues": [
      {
        "label": "Gigante Além do Limite",
        "value": "Aumenta o corpo de um gigante natural até a assustadora altura de 180 metros"
      },
      {
        "label": "Andarilho no Oceano",
        "value": "Tamanho tão colossal que caminha no fundo do mar com a cabeça fora d'água"
      },
      {
        "label": "Alcunha Temida",
        "value": "Conhecido mundialmente como O Encouraçado Colossal"
      }
    ]
  },
  {
    "id": "exc-op-71-vasco-shot",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Gabu Gabu no Mi (Fruta do Licor)",
    "badgeTitle": "Paramecia Alcoólica",
    "targetCharacterId": "vasco-shot",
    "targetCharacterName": "Vasco Shot",
    "validCharacterIds": [
      "vasco-shot"
    ],
    "clues": [
      {
        "label": "Manipulação Alcoólica",
        "value": "Produz e cospe jatos de licor de alto teor inflamável criando fogo devastador"
      },
      {
        "label": "Prisioneiro Perverso",
        "value": "Um dos criminosos mais vis da história libertados do Nível 6 de Impel Down"
      },
      {
        "label": "Aparência Bizarra",
        "value": "Usa chapéu de bobo da corte e tem nariz comprido e garrafa de bebida"
      }
    ]
  },
  {
    "id": "exc-op-72-belo-betty",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Kobu Kobu no Mi (Fruta do Encorajamento)",
    "badgeTitle": "Paramecia de Moral / Liderança",
    "targetCharacterId": "belo-betty",
    "targetCharacterName": "Belo Betty",
    "validCharacterIds": [
      "belo-betty"
    ],
    "clues": [
      {
        "label": "Despertar de Força Civil",
        "value": "Agitar sua bandeira desperta a força interior e coragem de populações oprimidas"
      },
      {
        "label": "Exército Revolucionário",
        "value": "Comandante do Exército do Leste sob liderança de Monkey D. Dragon"
      },
      {
        "label": "Libertação do Reino de Lulusia",
        "value": "Liderou civis com vassouras e pedras para derrotar piratas invasores"
      }
    ]
  },
  {
    "id": "exc-op-73-morley",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Oshi Oshi no Mi (Fruta do Empurrão / Escavação)",
    "badgeTitle": "Paramecia Terrestre",
    "targetCharacterId": "morley",
    "targetCharacterName": "morley",
    "validCharacterIds": [
      "morley"
    ],
    "clues": [
      {
        "label": "Moldagem de Rocha",
        "value": "Empurra e molda a rocha sólida como se fosse argila maleável sem quebrar"
      },
      {
        "label": "Criador do Nível 5.5",
        "value": "Escavou secretamente o esconderijo secreto dos prisioneiros em Impel Down"
      },
      {
        "label": "Gigante Okama",
        "value": "Comandante do Exército do Oeste dos Revolucionários que usa um tridente"
      }
    ]
  },
  {
    "id": "exc-op-74-prince-grus",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Gunyo Gunyo no Mi (Fruta da Argila)",
    "badgeTitle": "Paramecia de Modelagem Mineral",
    "targetCharacterId": "prince-grus",
    "targetCharacterName": "Prince Grus",
    "validCharacterIds": [
      "prince-grus"
    ],
    "clues": [
      {
        "label": "Soldados de Argila",
        "value": "Gera e molda argila para criar guerreiros resistentes e redes de amortecimento"
      },
      {
        "label": "Membro da SWORD",
        "value": "Contra-Almirante da Marinha pertencente à unidade secreta de Koby e Helmeppo"
      },
      {
        "label": "Invasão a Hachinosu",
        "value": "Utilizou a argila para amortecer o navio da Marinha atirado por Garp"
      }
    ]
  },
  {
    "id": "exc-op-75-nico-robin",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Hana Hana no Mi (Fruta da Flor)",
    "badgeTitle": "Paramecia de Projeção Corporal",
    "targetCharacterId": "nico-robin",
    "targetCharacterName": "Nico Robin",
    "validCharacterIds": [
      "nico-robin"
    ],
    "clues": [
      {
        "label": "Florescer de Membros",
        "value": "Brota cópias perfeitas de qualquer membro de seu corpo em qualquer superfície visível"
      },
      {
        "label": "Forma Demonio Fleur",
        "value": "Cria uma gigante demoníaca alada com pele negra endurecida por Haki"
      },
      {
        "label": "Única Arqueóloga",
        "value": "Única sobrevivente do massacre de Ohara capaz de decifrar Poneglyphs"
      }
    ]
  },
  {
    "id": "exc-op-76-jozu",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Kira Kira no Mi (Fruta do Diamante)",
    "badgeTitle": "Paramecia de Dureza Mineral",
    "targetCharacterId": "jozu",
    "targetCharacterName": "Jozu",
    "validCharacterIds": [
      "jozu"
    ],
    "clues": [
      {
        "label": "Dureza Imbatível",
        "value": "Transforma o corpo em diamante puro, tornando-o imune até aos cortes de Mihawk"
      },
      {
        "label": "Comandante da 3ª Divisão",
        "value": "Veterano dos Piratas do Barba Branca conhecido como Jozu do Diamante"
      },
      {
        "label": "Arremesso de Iceberg",
        "value": "Arrancou com as próprias mãos um gigantesco bloco de gelo em Marineford"
      }
    ]
  },
  {
    "id": "exc-op-77-tsuru",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Woshu Woshu no Mi (Fruta da Lavagem)",
    "badgeTitle": "Paramecia Moral / Purificadora",
    "targetCharacterId": "tsuru",
    "targetCharacterName": "tsuru",
    "validCharacterIds": [
      "tsuru"
    ],
    "clues": [
      {
        "label": "Varal Humano",
        "value": "Lava e pendura criminosos em varais como roupas, limpando parcialmente sua maldade"
      },
      {
        "label": "Grande Estrategista",
        "value": "Vice-Almirante veterana da Marinha contemporânea de Sengoku e Garp"
      },
      {
        "label": "Respeito de Doflamingo",
        "value": "Uma das poucas figuras da Marinha que Doflamingo sempre evitou enfrentar"
      }
    ]
  },
  {
    "id": "exc-op-78-smoker",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Moku Moku no Mi (Fruta da Fumaça)",
    "badgeTitle": "Logia de Fumaça",
    "targetCharacterId": "smoker",
    "targetCharacterName": "Smoker",
    "validCharacterIds": [
      "smoker"
    ],
    "clues": [
      {
        "label": "Primeira Logia Apresentada",
        "value": "Primeira fruta do tipo Logia a ser introduzida na história (Loguetown)"
      },
      {
        "label": "Arma com Kairouseki",
        "value": "Usuário empunha um jitte com ponta de pedra do mar para anular outros usuários"
      },
      {
        "label": "Alcunha da Marinha",
        "value": "Smoker, o Caçador Branco e líder do infame esquadrão G-5"
      }
    ]
  },
  {
    "id": "exc-op-79-crocodile",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Suna Suna no Mi (Fruta da Areia)",
    "badgeTitle": "Logia Terrestre / Desértica",
    "targetCharacterId": "crocodile",
    "targetCharacterName": "Crocodile (Mr. 0)",
    "validCharacterIds": [
      "crocodile"
    ],
    "clues": [
      {
        "label": "Desidratação Absoluta",
        "value": "Drena instantaneamente toda a umidade e líquidos de qualquer ser com a mão direita"
      },
      {
        "label": "Fraqueza Elementar",
        "value": "Torna-se tangível e perde sua intangibilidade ao contato com água ou sangue"
      },
      {
        "label": "Líder da Baroque Works",
        "value": "Ex-Shichibukai que tentou conquistar Alabasta e reativar a arma Pluton"
      }
    ]
  },
  {
    "id": "exc-op-80-enel",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Goro Goro no Mi (Fruta do Trovão / Relâmpago)",
    "badgeTitle": "Logia de Eletricidade",
    "targetCharacterId": "enel",
    "targetCharacterName": "Enel",
    "validCharacterIds": [
      "enel"
    ],
    "clues": [
      {
        "label": "Potência Elétrica",
        "value": "Gera descargas elétricas colossais de até 200 milhões de Volts"
      },
      {
        "label": "Fraqueza Natural",
        "value": "Seus raios foram completamente ineficazes contra o corpo de borracha de Luffy"
      },
      {
        "label": "Deus de Skypiea",
        "value": "Autoproclamado Deus da ilha do céu que viajou para a Lua na arca Maxim"
      }
    ]
  },
  {
    "id": "exc-op-81-kuzan-aokiji",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Hie Hie no Mi (Fruta do Gelo)",
    "badgeTitle": "Logia Criogênica",
    "targetCharacterId": "kuzan",
    "targetCharacterName": "Kuzan (Aokiji)",
    "validCharacterIds": [
      "kuzan"
    ],
    "clues": [
      {
        "label": "Ice Age",
        "value": "Capaz de congelar oceanos inteiros instantaneamente por semanas com o Ice Age"
      },
      {
        "label": "Bicicleta no Mar",
        "value": "Costuma passear sobre o mar pedalando em uma trilha fina de gelo congelado"
      },
      {
        "label": "Duelo de Punk Hazard",
        "value": "Disputou o posto de Almirante de Frota em um duelo mortal de 10 dias contra Akainu"
      }
    ]
  },
  {
    "id": "exc-op-82-sakazuki-akainu",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Magu Magu no Mi (Fruta do Magma)",
    "badgeTitle": "Logia de Maior Poder Ofensivo",
    "targetCharacterId": "sakazuki",
    "targetCharacterName": "Sakazuki (Akainu)",
    "validCharacterIds": [
      "sakazuki"
    ],
    "clues": [
      {
        "label": "Calor Queimador Supremo",
        "value": "Magma mais quente que o próprio fogo, capaz de queimar as chamas de Ace"
      },
      {
        "label": "Golpe Mortal",
        "value": "Responsável pelo golpe fatal que perfurou o peito de Portgas D. Ace em Marineford"
      },
      {
        "label": "Justiça Absoluta",
        "value": "Atual Almirante de Frota da Marinha que persegue piratas com crueldade inflexível"
      }
    ]
  },
  {
    "id": "exc-op-83-borsalino-kizaru",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Pika Pika no Mi (Fruta da Luz)",
    "badgeTitle": "Logia Fotônica",
    "targetCharacterId": "borsalino",
    "targetCharacterName": "Borsalino (Kizaru)",
    "validCharacterIds": [
      "borsalino"
    ],
    "clues": [
      {
        "label": "Velocidade da Luz",
        "value": "Permite mover-se e chutar na velocidade da luz perguntando: Você já foi chutado na velocidade da luz?"
      },
      {
        "label": "Espada de Luz",
        "value": "Materializa a espada sagrada Ama no Murakumo feita inteiramente de fótons"
      },
      {
        "label": "Espelho Yata no Kagami",
        "value": "Teletransporta-se em reflexos em zigue-zague para emboscar alvos instantaneamente"
      }
    ]
  },
  {
    "id": "exc-op-84-marshall-d-teach-barba-negra",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Yami Yami no Mi (Fruta da Escuridão)",
    "badgeTitle": "Logia Singular de Gravidade e Trevas",
    "targetCharacterId": "marshall-d-teach",
    "targetCharacterName": "Marshall D. Teach (Barba Negra)",
    "validCharacterIds": [
      "marshall-d-teach"
    ],
    "clues": [
      {
        "label": "Anulação de Akuma no Mi",
        "value": "Anula totalmente os poderes de qualquer outro usuário de fruta ao tocá-lo"
      },
      {
        "label": "Ausência de Intangibilidade",
        "value": "Ao contrário de outras Logias, absorve mais dano e dor física devido à gravidade"
      },
      {
        "label": "Assassinato de Thatch",
        "value": "Matou seu companheiro de tripulação na 4ª divisão de Barba Branca para roubá-la"
      }
    ]
  },
  {
    "id": "exc-op-85-portgas-d-ace",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Mera Mera no Mi (Fruta do Fogo)",
    "badgeTitle": "Logia Ígnea Lendária",
    "targetCharacterId": "portgas-d-ace",
    "targetCharacterName": "Portgas D. Ace",
    "validCharacterIds": [
      "portgas-d-ace",
      "sabo"
    ],
    "clues": [
      {
        "label": "Sucessão de Irmãos",
        "value": "Pertenceu originalmente a Ace antes de ser herdada por Sabo no Coliseu Corrida"
      },
      {
        "label": "Técnica Hiken",
        "value": "Famosa técnica Punho de Fogo capaz de pulverizar armadas de navios com um golpe"
      },
      {
        "label": "Prêmio em Dressrosa",
        "value": "Colocada como prêmio principal do torneio de gladiadores por Donquixote Doflamingo"
      }
    ]
  },
  {
    "id": "exc-op-86-monet",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Yuki Yuki no Mi (Fruta da Neve)",
    "badgeTitle": "Logia de Neve",
    "targetCharacterId": "monet",
    "targetCharacterName": "Monet",
    "validCharacterIds": [
      "monet"
    ],
    "clues": [
      {
        "label": "Tempestades Gélidas",
        "value": "Transforma o corpo em neve macia e fria criando nevascas e monstros dentados"
      },
      {
        "label": "Aparência de Harpia",
        "value": "Usuária modificada por Law com asas e garras de pássaro no lugar de membros"
      },
      {
        "label": "Assistente de Caesar",
        "value": "Infiltrada como secretária leal a Doflamingo no laboratório de Punk Hazard"
      }
    ]
  },
  {
    "id": "exc-op-87-caesar-clown",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Gasu Gasu no Mi (Fruta do Gás)",
    "badgeTitle": "Logia de Gases e Asfixia",
    "targetCharacterId": "caesar-clown",
    "targetCharacterName": "Caesar Clown",
    "validCharacterIds": [
      "caesar-clown"
    ],
    "clues": [
      {
        "label": "Drenagem de Oxigênio",
        "value": "Remove instantaneamente todo o oxigênio ao redor asfixiando os inimigos"
      },
      {
        "label": "Cientista Louco",
        "value": "Especialista em armas químicas de destruição em massa como o Shinokuni"
      },
      {
        "label": "Arma Shinokuni",
        "value": "Gera um monstro venenoso que petrifica qualquer ser vivo com gás petrificante"
      }
    ]
  },
  {
    "id": "exc-op-88-caribou",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Numa Numa no Mi (Fruta do Pântano)",
    "badgeTitle": "Logia Lodosa",
    "targetCharacterId": "caribou",
    "targetCharacterName": "caribou",
    "validCharacterIds": [
      "caribou"
    ],
    "clues": [
      {
        "label": "Pântano Sem Fundo",
        "value": "Armazena arsenais infinitos e pessoas dentro do lodo pantanoso de seu corpo"
      },
      {
        "label": "Segredo das Armas Ancestrais",
        "value": "Descobriu que Shirahoshi é Poseidon e que Pluton está lacrada em Wano"
      },
      {
        "label": "Infiltração no Navio",
        "value": "Trafegou escondido em um barril no Thousand Sunny rumo à Ilha dos Tritões"
      }
    ]
  },
  {
    "id": "exc-op-89-ryokugyu-aramaki",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Mori Mori no Mi (Fruta da Floresta)",
    "badgeTitle": "Logia Vegetal",
    "targetCharacterId": "aramaki-ryokugyu",
    "targetCharacterName": "Aramaki (Ryokugyu)",
    "validCharacterIds": [
      "aramaki-ryokugyu"
    ],
    "clues": [
      {
        "label": "Mãe de Toda a Vida",
        "value": "Gera florestas exuberantes e raízes gigantescas que drenam os nutrientes dos inimigos"
      },
      {
        "label": "Almirante Touro Verde",
        "value": "Almirante da Marinha que jejuou por 3 anos porque faz fotossíntese natural"
      },
      {
        "label": "Ataque a Wano",
        "value": "Invadiu Wano sozinho após a queda de Kaido, sendo contido pelo Haki de Shanks"
      }
    ]
  },
  {
    "id": "exc-op-90-karasu",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Susu Susu no Mi (Fruta da Fuligem)",
    "badgeTitle": "Logia de Fuligem e Fumaça Escura",
    "targetCharacterId": "karasu",
    "targetCharacterName": "Karasu",
    "validCharacterIds": [
      "karasu"
    ],
    "clues": [
      {
        "label": "Corvos de Fuligem",
        "value": "Divide seu corpo de fuligem em bandos de corvos voadores que transportam aliados"
      },
      {
        "label": "Comandante do Norte",
        "value": "Líder militar do Exército Revolucionário que usa uma máscara em formato de bico"
      },
      {
        "label": "Invasão a Mary Geoise",
        "value": "Lutou contra os Almirantes da Marinha Fujitora e Ryokugyu na Terra Sagrada"
      }
    ]
  },
  {
    "id": "exc-op-91-marco",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Tori Tori no Mi: Modelo Fênix",
    "badgeTitle": "Zoan Mítica Imortal",
    "targetCharacterId": "marco",
    "targetCharacterName": "Marco",
    "validCharacterIds": [
      "marco"
    ],
    "clues": [
      {
        "label": "Chamas Azuis da Ressurreição",
        "value": "Fogo azul celestial que não queima, mas regenera ferimentos mortais instantaneamente"
      },
      {
        "label": "Primeiro Comandante",
        "value": "Braço direito de Edward Newgate e médico dos Piratas do Barba Branca"
      },
      {
        "label": "Bloqueio a Almirantes",
        "value": "Bloqueou o ataque de magma de Akainu e as rajadas de luz de Kizaru em Marineford"
      }
    ]
  },
  {
    "id": "exc-op-92-sengoku",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Hito Hito no Mi: Modelo Daibutsu (Grande Buda)",
    "badgeTitle": "Zoan Mítica Dourada",
    "targetCharacterId": "sengoku",
    "targetCharacterName": "Sengoku",
    "validCharacterIds": [
      "sengoku"
    ],
    "clues": [
      {
        "label": "Estátua de Ouro Maciço",
        "value": "Transforma-se em um imenso Buda de ouro reluzente de poder descomunal"
      },
      {
        "label": "Ondas de Choque",
        "value": "Dispara ondas de choque devastadoras a partir da palma de suas mãos"
      },
      {
        "label": "Ex-Almirante de Frota",
        "value": "Comandou as forças da Marinha durante a Guerra dos Maiorais em Marineford"
      }
    ]
  },
  {
    "id": "exc-op-93-kaido",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Uo Uo no Mi: Modelo Seiryu (Dragão Azul)",
    "badgeTitle": "Zoan Mítica dos Céus",
    "targetCharacterId": "kaidou",
    "targetCharacterName": "Kaidou",
    "validCharacterIds": [
      "kaidou"
    ],
    "clues": [
      {
        "label": "Dragão Oriental Imperial",
        "value": "Transforma-se em um dragão celestial capaz de cuspir rajadas de fogo Boro Breath"
      },
      {
        "label": "Ilha Flutuante",
        "value": "Levantou a ilha inteira de Onigashima pelos céus usando nuvens de chamas (Homuragumo)"
      },
      {
        "label": "Criatura Mais Forte",
        "value": "Governava Wano e chefiava os Piratas das Feras antes de ser derrotado no magma"
      }
    ]
  },
  {
    "id": "exc-op-94-yamato",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Inu Inu no Mi: Modelo Okuchi no Makami (Lobo Divino)",
    "badgeTitle": "Zoan Mítica Guardiã",
    "targetCharacterId": "yamato",
    "targetCharacterName": "Yamato",
    "validCharacterIds": [
      "yamato"
    ],
    "clues": [
      {
        "label": "Divindade Guardiã de Wano",
        "value": "Transforma-se no lobo sagrado com poderes de gelo protetores"
      },
      {
        "label": "Defesa de Gelo",
        "value": "Namuji Hyoga: armadura e espelho de gelo que anula rajadas de chamas de Kaido"
      },
      {
        "label": "Herdeira de Oden",
        "value": "Filho de Kaido que se autoidentifica com o lendário samurai Kozuki Oden"
      }
    ]
  },
  {
    "id": "exc-op-95-kurozumi-orochi",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Hebi Hebi no Mi: Modelo Yamata no Orochi",
    "badgeTitle": "Zoan Mítica de Múltiplas Vidas",
    "targetCharacterId": "kurozumi-orochi",
    "targetCharacterName": "Kurozumi Orochi",
    "validCharacterIds": [
      "kurozumi-orochi"
    ],
    "clues": [
      {
        "label": "Oito Cabeças",
        "value": "Serpente mitológica de 8 cabeças que permite sobreviver a decapitações repetidas"
      },
      {
        "label": "Shogun Tirano",
        "value": "Xogum covarde de Wano que conspirou com Kaido para executar Kozuki Oden"
      },
      {
        "label": "Decapitação Final",
        "value": "Teve suas cabeças cortadas sucessivamente pelos Bainhas Vermelhas e por Denjiro"
      }
    ]
  },
  {
    "id": "exc-op-96-king",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ryu Ryu no Mi: Modelo Pteranodonte",
    "badgeTitle": "Zoan Ancestral dos Céus",
    "targetCharacterId": "king",
    "targetCharacterName": "King",
    "validCharacterIds": [
      "king"
    ],
    "clues": [
      {
        "label": "Voo Pré-Histórico",
        "value": "Puxa a crista para trás e dispara seu bico como uma catapulta supersônica"
      },
      {
        "label": "Linhagem Lunaria",
        "value": "Último sobrevivente dos Lunares, povo dos deuses que vivia sobre a Red Line"
      },
      {
        "label": "Chama nas Costas",
        "value": "Fogo nas costas que confere invulnerabilidade total a dano quando aceso"
      }
    ]
  },
  {
    "id": "exc-op-97-queen",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ryu Ryu no Mi: Modelo Braquiossauro",
    "badgeTitle": "Zoan Ancestral Mecânica",
    "targetCharacterId": "queen",
    "targetCharacterName": "Queen",
    "validCharacterIds": [
      "queen"
    ],
    "clues": [
      {
        "label": "Pescoço Serpenteante",
        "value": "Separa o pescoço e cauda como uma anaconda mecânica deixando o torso como canhão"
      },
      {
        "label": "Cientista do MADS",
        "value": "Ex-colega de laboratório de Vegapunk e Judge especializado em vírus como o Ice Demon"
      },
      {
        "label": "Grande Astro das Feras",
        "value": "Comandante gordinho que adora dançar o funk da tripulação de Kaido"
      }
    ]
  },
  {
    "id": "exc-op-98-jack",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Zou Zou no Mi: Modelo Mamute",
    "badgeTitle": "Zoan Ancestral de Destruição",
    "targetCharacterId": "jack",
    "targetCharacterName": "Jack",
    "validCharacterIds": [
      "jack"
    ],
    "clues": [
      {
        "label": "Resistência Colossal",
        "value": "Mamute gigante de pele impenetrável que lutou por 5 dias seguidos em Zou"
      },
      {
        "label": "Origem Homem-Peixe",
        "value": "Meio homem-peixe que sobreviveu respirando no fundo do mar após ser naufragado por Zunesha"
      },
      {
        "label": "Alcunha da Seca",
        "value": "Conhecido como Jack a Seca porque por onde passa a terra fica estéril"
      }
    ]
  },
  {
    "id": "exc-op-99-x-drake",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ryu Ryu no Mi: Modelo Alossauro",
    "badgeTitle": "Zoan Ancestral Carnívora",
    "targetCharacterId": "drake-x",
    "targetCharacterName": "Drake X.",
    "validCharacterIds": [
      "drake-x"
    ],
    "clues": [
      {
        "label": "Dinossauro Carnívoro",
        "value": "Transforma-se em um feroz carnívoro pré-histórico com mandíbulas esmagadoras"
      },
      {
        "label": "Capitão da SWORD",
        "value": "Agente infiltrado da força especial secreta da Marinha disfarçado de pirata"
      },
      {
        "label": "Líder dos Tobiroppo",
        "value": "Um dos Seis Voadores mais fortes da tripulação dos Piratas das Feras"
      }
    ]
  },
  {
    "id": "exc-op-100-page-one",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ryu Ryu no Mi: Modelo Espinossauro",
    "badgeTitle": "Zoan Ancestral Aquática/Terrestre",
    "targetCharacterId": "page-one",
    "targetCharacterName": "Page One",
    "validCharacterIds": [
      "page-one"
    ],
    "clues": [
      {
        "label": "Predador Feroz",
        "value": "Transforma-se em um espinossauro dotado de vela dorsal e cauda pesada"
      },
      {
        "label": "Irmão de Ulti",
        "value": "Irmão mais novo constantemente mimado e sufocado pelo afeto agressivo de Ulti"
      },
      {
        "label": "Confronto em Wano",
        "value": "Primeiro dinossauro a enfrentar o traje Raid Suit Stealth Black de Sanji"
      }
    ]
  },
  {
    "id": "exc-op-101-ulti",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ryu Ryu no Mi: Modelo Paquicefalossauro",
    "badgeTitle": "Zoan Ancestral de Cabeçada",
    "targetCharacterId": "ulti",
    "targetCharacterName": "Ulti",
    "validCharacterIds": [
      "ulti"
    ],
    "clues": [
      {
        "label": "Crânio Blindado",
        "value": "Crânio denso reforçado capaz de desferir cabeçadas de força sísmica (Ul-Meteor)"
      },
      {
        "label": "Personalidade Volátil",
        "value": "Fala de forma insolente até mesmo com o Yonkou Kaido sem qualquer medo"
      },
      {
        "label": "Perseguição a Nami",
        "value": "Perseguiu furiosamente Nami e Usopp exigindo que admitissem que Luffy não seria rei"
      }
    ]
  },
  {
    "id": "exc-op-102-black-maria",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Kumo Kumo no Mi: Modelo Rosamygale Grauvogeli",
    "badgeTitle": "Zoan Ancestral Aracnídea",
    "targetCharacterId": "black-maria",
    "targetCharacterName": "Black Maria",
    "validCharacterIds": [
      "black-maria"
    ],
    "clues": [
      {
        "label": "Aranha Pré-Histórica",
        "value": "Transforma a metade inferior numa gigantesca aranha venenosa que cospe teias inflamáveis"
      },
      {
        "label": "Bordel de Onigashima",
        "value": "Comanda o pavilhão de cortesãs e torturou Sanji para atrair Nico Robin"
      },
      {
        "label": "Combate Feminino",
        "value": "Derrotada pelo golpe Demonio Fleur de Nico Robin em um duelo mortal"
      }
    ]
  },
  {
    "id": "exc-op-103-whos-who",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Neko Neko no Mi: Modelo Tigre-Dentes-de-Sabre",
    "badgeTitle": "Zoan Ancestral Felina",
    "targetCharacterId": "whos-who",
    "targetCharacterName": "Who's-Who",
    "validCharacterIds": [
      "whos-who"
    ],
    "clues": [
      {
        "label": "Caninos Fatais",
        "value": "Felino ancestral com caninos gigantescos combinados com as técnicas do Rokushiki"
      },
      {
        "label": "Ex-Agente da CP9",
        "value": "Foi preso pelo Governo Mundial por ter deixado os piratas de Shanks roubarem a fruta Gomu Gomu"
      },
      {
        "label": "Rancor contra Jinbe",
        "value": "Derrotado pelo mestre de Karatê Homem-Peixe Jinbe após revelar a lenda de Nika"
      }
    ]
  },
  {
    "id": "exc-op-104-tony-tony-chopper",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Hito Hito no Mi (Fruta do Humano)",
    "badgeTitle": "Zoan Humanoide",
    "targetCharacterId": "tony-tony-chopper",
    "targetCharacterName": "Tony Tony Chopper",
    "validCharacterIds": [
      "tony-tony-chopper"
    ],
    "clues": [
      {
        "label": "Inteligência Racional",
        "value": "Concedeu fala, raciocínio humano e capacidade médica a uma rena de nariz azul"
      },
      {
        "label": "Rumble Ball",
        "value": "Crias pílulas químicas que expandem as formas da Zoan para 7 pontos de transformação"
      },
      {
        "label": "Monster Point",
        "value": "Forma colossal descontrolada no passado, agora dominada por 30 minutos de combate"
      }
    ]
  },
  {
    "id": "exc-op-105-rob-lucci",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Neko Neko no Mi: Modelo Leopardo",
    "badgeTitle": "Zoan Carnívora Feroz",
    "targetCharacterId": "rob-lucci",
    "targetCharacterName": "Rob Lucci",
    "validCharacterIds": [
      "rob-lucci"
    ],
    "clues": [
      {
        "label": "Predador Assassino",
        "value": "Concede reflexos e ferocidade de leopardo amplificando o Rokushiki"
      },
      {
        "label": "Despertar com Chamas Negras",
        "value": "Alcançou o Despertar da Zoan mantendo a sanidade e ganhando nuvens negras nos ombros"
      },
      {
        "label": "Justiça Sombria",
        "value": "Líder dos assassinos da CP0 que jurou fidelidade aos Dragões Celestiais"
      }
    ]
  },
  {
    "id": "exc-op-106-kaku",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ushi Ushi no Mi: Modelo Girafa",
    "badgeTitle": "Zoan Herbívora Herbácea",
    "targetCharacterId": "kaku",
    "targetCharacterName": "Kaku",
    "validCharacterIds": [
      "kaku"
    ],
    "clues": [
      {
        "label": "Pescoço Articulado",
        "value": "Transforma o usuário numa girafa capaz de retrair o pescoço como uma bala (Pasta Machine)"
      },
      {
        "label": "Quatro Espadas",
        "value": "Combina Rankyaku com duas espadas para criar a técnica do Estilo de Quatro Lâminas"
      },
      {
        "label": "Ex-Carpinteiro",
        "value": "Trabalhava na Galley-La inspecionando caravelas pulando de telhado em telhado"
      }
    ]
  },
  {
    "id": "exc-op-107-jabra",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Inu Inu no Mi: Modelo Lobo",
    "badgeTitle": "Zoan Carnívora",
    "targetCharacterId": "jyabura",
    "targetCharacterName": "Jabra",
    "validCharacterIds": [
      "jyabura"
    ],
    "clues": [
      {
        "label": "Lobo Predador",
        "value": "Permite mover-se e golpear com presas e garras com o Tekkai ativo em movimento (Tekkai Kenpo)"
      },
      {
        "label": "Rival de Lucci",
        "value": "Membro veterano da CP9 em Enies Lobby que mentiu fingindo ser irmão de Robin"
      },
      {
        "label": "Derrota com Diable Jambe",
        "value": "Primeiro inimigo a ser derrotado pelo chute flamejante Diable Jambe de Sanji"
      }
    ]
  },
  {
    "id": "exc-op-108-pell",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Tori Tori no Mi: Modelo Falcão",
    "badgeTitle": "Zoan Aérea Protetora",
    "targetCharacterId": "pell",
    "targetCharacterName": "Pell",
    "validCharacterIds": [
      "pell"
    ],
    "clues": [
      {
        "label": "Uma das 5 Voadoras",
        "value": "Uma das únicas cinco frutas conhecidas no mundo que conferem o dom do voo"
      },
      {
        "label": "Guardião de Alabasta",
        "value": "Guerreiro de elite que jurou proteger a princesa Vivi e o palácio de Alubarna"
      },
      {
        "label": "Sacrifício da Bomba",
        "value": "Carregou a bomba colossal de Crocodile pelos céus para salvar a capital"
      }
    ]
  },
  {
    "id": "exc-op-109-chaka",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Inu Inu no Mi: Modelo Chacal",
    "badgeTitle": "Zoan Protetora de Alabasta",
    "targetCharacterId": "chaka",
    "targetCharacterName": "Chaka (O Chacal)",
    "validCharacterIds": [
      "chaka"
    ],
    "clues": [
      {
        "label": "Divindade Guardiã",
        "value": "Transforma-se em um chacal veloz empunhando sua espada com golpes cortantes"
      },
      {
        "label": "Comandante da Guarda Real",
        "value": "Liderou o exército de Alabasta junto com Pell na contenção da rebelião"
      },
      {
        "label": "Enfrentou Crocodile",
        "value": "Tentou impedir Crocodile de tomar o palácio real de Alabasta"
      }
    ]
  },
  {
    "id": "exc-op-110-dalton",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ushi Ushi no Mi: Modelo Bisão",
    "badgeTitle": "Zoan Robusta",
    "targetCharacterId": "dalton",
    "targetCharacterName": "Dalton",
    "validCharacterIds": [
      "dalton"
    ],
    "clues": [
      {
        "label": "Carga com Chifres",
        "value": "Transforma-se em um bisão maciço armado com sua espada de duas pontas"
      },
      {
        "label": "Rei de Sakura",
        "value": "Ex-capitão da guarda que liderou o povo de Drum após a deposição do tirano Wapol"
      },
      {
        "label": "Coração Nobre",
        "value": "Foi salvo por Hiluluk e jurou proteger os cidadãos das doenças e tiranias"
      }
    ]
  },
  {
    "id": "exc-op-111-miss-merry-christmas",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Mogu Mogu no Mi (Fruta da Toupeira)",
    "badgeTitle": "Zoan Escavadora",
    "targetCharacterId": "miss-merry-christmas",
    "targetCharacterName": "Miss Merry Christmas (Dromia)",
    "validCharacterIds": [
      "miss-merry-christmas"
    ],
    "clues": [
      {
        "label": "Túneis Subterrâneos",
        "value": "Garras de toupeira que cavam túneis de alta velocidade sob a areia"
      },
      {
        "label": "Dupla com Mr. 4",
        "value": "Puxava inimigos pelos pés enquanto Mr. 4 os rebatia com um taco de 4 toneladas"
      },
      {
        "label": "Oficial Barulhenta",
        "value": "Oficial da Baroque Works que falava em ritmo alucinadamente acelerado"
      }
    ]
  },
  {
    "id": "exc-op-112-boa-sandersonia",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Hebi Hebi no Mi: Modelo Anaconda",
    "badgeTitle": "Zoan Réptil",
    "targetCharacterId": "sandersonia-boa",
    "targetCharacterName": "Sandersonia Boa",
    "validCharacterIds": [
      "sandersonia-boa"
    ],
    "clues": [
      {
        "label": "Corpo Serpenteante",
        "value": "Transforma-se em anaconda gigante com premonição de movimentos pelo Haki"
      },
      {
        "label": "Irmã da Imperatriz",
        "value": "Segunda irmã de Boa Hancock com cabelos verdes volumosos"
      },
      {
        "label": "Marca dos Dragões",
        "value": "Carrega a marca dos escravos de Mary Geoise escondida nas costas"
      }
    ]
  },
  {
    "id": "exc-op-113-boa-marigold",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Hebi Hebi no Mi: Modelo Cobra Real",
    "badgeTitle": "Zoan Ofídica Venenosa",
    "targetCharacterId": "marigold-boa",
    "targetCharacterName": "Marigold Boa",
    "validCharacterIds": [
      "marigold-boa"
    ],
    "clues": [
      {
        "label": "Respingo de Veneno",
        "value": "Cospe jatos de veneno letal e manipula fósforo em chamas sobre a cauda"
      },
      {
        "label": "Irmã Gorgon",
        "value": "Irmã mais nova de Hancock e usuária de Busoshoku Haki defensivo"
      },
      {
        "label": "Arena de Kuja",
        "value": "Lutou com Sandersonia contra Monkey D. Luffy na arena de Amazon Lily"
      }
    ]
  },
  {
    "id": "exc-op-114-catarina-devon",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Kyuubi no Kitsune / Inu Inu no Mi: Modelo Raposa de Nove Caudas",
    "badgeTitle": "Zoan Mítica Metamórfica",
    "targetCharacterId": "catarina-devon",
    "targetCharacterName": "Catarina Devon",
    "validCharacterIds": [
      "catarina-devon"
    ],
    "clues": [
      {
        "label": "Metamorfose Perfeita",
        "value": "Transforma-se na cópia idêntica de qualquer pessoa, incluindo roupas e voz"
      },
      {
        "label": "Caçadora da Lua Crescente",
        "value": "A mulher pirata mais perigosa já encarcerada no Nível 6 de Impel Down"
      },
      {
        "label": "Toque de Saturn",
        "value": "Tocou nos pés do Gorosei São Jaygarcia Saturn para copiar sua aparência"
      }
    ]
  },
  {
    "id": "exc-op-115-sasaki",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ryu Ryu no Mi: Modelo Triceratops",
    "badgeTitle": "Zoan Ancestral Mecânica / Chifres",
    "targetCharacterId": "sasaki-op",
    "targetCharacterName": "Sasaki",
    "validCharacterIds": [
      "sasaki-op"
    ],
    "clues": [
      {
        "label": "Gola Rotatória de Voo",
        "value": "Gira a carapaça óssea do pescoço como uma serra voadora com propulsão"
      },
      {
        "label": "Líder dos Tobiroppo",
        "value": "Comandante da divisão blindada de Kaido e ex-capitão pirata"
      },
      {
        "label": "Duelo com o Franky Shogun",
        "value": "Teve seu chifre quebrado e barriga cortada pela espada Rouba-Raio"
      }
    ]
  },
  {
    "id": "exc-op-117-kabu",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Mushi Mushi no Mi: Modelo Besouro Rinoceronte",
    "badgeTitle": "Zoan Inseto",
    "targetCharacterId": "leo",
    "targetCharacterName": "Leo",
    "validCharacterIds": [
      "leo"
    ],
    "clues": [
      {
        "label": "Força de Inseto",
        "value": "Transforma-se em um besouro kabutomushi com carapaça dura e chifre"
      },
      {
        "label": "Esquadrão Tontatta",
        "value": "Líder do Esquadrão dos Besouros Amarelos na rebelião contra Doflamingo"
      },
      {
        "label": "Porte Pequeno",
        "value": "Guerreiro anão da tribo Tontatta dotado de força proporcional espantosa"
      }
    ]
  },
  {
    "id": "exc-op-118-bian",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Mushi Mushi no Mi: Modelo Vespa",
    "badgeTitle": "Zoan Inseto Voador",
    "targetCharacterId": "leo",
    "targetCharacterName": "Leo",
    "validCharacterIds": [
      "leo"
    ],
    "clues": [
      {
        "label": "Ferrão Aéreo",
        "value": "Transforma-se numa vespa com ferrão veloz e voo de alta mobilidade"
      },
      {
        "label": "Comandante Tontatta",
        "value": "Líder do Esquadrão das Vespas Rosas no Reino de Tontatta"
      },
      {
        "label": "Mensageira de Ataque",
        "value": "Transportou guerreiros e bombas nas costas durante a Operação SOP"
      }
    ]
  },
  {
    "id": "exc-op-119-smiley",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Sara Sara no Mi: Modelo Axolotle",
    "badgeTitle": "Zoan Anfíbia",
    "targetCharacterId": "caesar-clown",
    "targetCharacterName": "Caesar Clown",
    "validCharacterIds": [
      "caesar-clown",
      "caesar-clown"
    ],
    "clues": [
      {
        "label": "Gelatina Tóxica",
        "value": "Fruta consumida pela massa concentrada de gás venenoso H2S de Punk Hazard"
      },
      {
        "label": "Renascimento em Fruta",
        "value": "Mostrou pela primeira vez uma fruta renascendo em uma maçã próxima após sua morte"
      },
      {
        "label": "Criador em Punk Hazard",
        "value": "Alimentada com doces químicos por Caesar Clown para detonar a ilha"
      }
    ]
  },
  {
    "id": "exc-op-120-spandam",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Zou Zou no Mi (Fruta do Elefante)",
    "badgeTitle": "Zoan Animal em Objeto",
    "targetCharacterId": "spandam",
    "targetCharacterName": "Spandam",
    "validCharacterIds": [
      "spandam"
    ],
    "clues": [
      {
        "label": "Espada Elefante",
        "value": "A espada Funkfreed comeu a fruta Zoan através da tecnologia de Vegapunk"
      },
      {
        "label": "Lâmina que Vira Tromba",
        "value": "Estica uma tromba de aço cortante com presas de marfim"
      },
      {
        "label": "Chefe da CP9",
        "value": "Pertencia ao covarde Spandam que acionou por engano o Buster Call"
      }
    ]
  },
  {
    "id": "exc-op-121-mr-4",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Inu Inu no Mi: Modelo Dachshund",
    "badgeTitle": "Zoan Canina em Objeto",
    "targetCharacterId": "babe",
    "targetCharacterName": "Mr. 4 (Babe)",
    "validCharacterIds": [
      "babe"
    ],
    "clues": [
      {
        "label": "Canhão Cachorro",
        "value": "Um canhão que comeu uma fruta Zoan e espirra bolas de beisebol com bombas"
      },
      {
        "label": "Resfriado Crônico",
        "value": "O cachorro-canhão Lassoo vive resfriado e espirra projéteis explosivos"
      },
      {
        "label": "Parceiro em Alabasta",
        "value": "Arma de estimação do Mr. 4 na Baroque Works"
      }
    ]
  },
  {
    "id": "exc-op-122-tamago",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Tama Tama no Mi (Fruta do Ovo)",
    "badgeTitle": "Paramecia / Zoan Evolutiva Ciclo da Vida",
    "targetCharacterId": "tamago",
    "targetCharacterName": "Barão Tamago",
    "validCharacterIds": [
      "tamago"
    ],
    "clues": [
      {
        "label": "Ciclo Ovo-Pinto-Galo",
        "value": "Ao sofrer ferimentos mortais, racha a casca e renasce mais forte como Visconde e Conde"
      },
      {
        "label": "Pernas Longas",
        "value": "Membro da tribo das Pernas Longas e combatente dos Piratas da Big Mom"
      },
      {
        "label": "Xícara de Chá na Cabeça",
        "value": "Usa smoking requintado e equilibra uma xícara de chá quente sobre o chapéu"
      }
    ]
  },
  {
    "id": "exc-op-123-blamenco",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Poke Poke no Mi (Fruta dos Bolsos)",
    "badgeTitle": "Paramecia Dimensional",
    "targetCharacterId": "blamenco",
    "targetCharacterName": "blamenco",
    "validCharacterIds": [
      "blamenco"
    ],
    "clues": [
      {
        "label": "Bolsos no Queixo",
        "value": "Guarda marretas gigantescas e arsenais dentro de bolsos na própria pele do queixo"
      },
      {
        "label": "Comandante da 6ª Divisão",
        "value": "Veterano dos Piratas do Barba Branca presente na Guerra de Marineford"
      },
      {
        "label": "Arma Favorita",
        "value": "Puxa um martelo maior que o próprio corpo para esmagar fuzileiros"
      }
    ]
  },
  {
    "id": "exc-op-124-charlotte-opera",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Kuri Kuri no Mi (Fruta do Creme)",
    "badgeTitle": "Paramecia de Confeitaria / Creme",
    "targetCharacterId": "charlotte-opera",
    "targetCharacterName": "charlotte-opera",
    "validCharacterIds": [
      "charlotte-opera"
    ],
    "clues": [
      {
        "label": "Creme Cáustico",
        "value": "Produz creme doce superaquecido que queima e dissolve a pele dos oponentes"
      },
      {
        "label": "Quinto Filho de Big Mom",
        "value": "Ministro da Nata e irmão quíntuplo de Counter, Cadenza, Cabaletta e Gala"
      },
      {
        "label": "Castigo Mortal",
        "value": "Teve sua vida sugada por Big Mom durante um de seus ataques de fúria gastronômica"
      }
    ]
  },
  {
    "id": "exc-op-125-charlotte-galette",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Bata Bata no Mi (Fruta da Manteiga)",
    "badgeTitle": "Paramecia Láctea",
    "targetCharacterId": "charlotte-galette",
    "targetCharacterName": "Charlotte Galette",
    "validCharacterIds": [
      "charlotte-galette"
    ],
    "clues": [
      {
        "label": "Manteiga Prisão",
        "value": "Gera manteiga viscosa e espessa para imobilizar e prender mãos e pés de prisioneiros"
      },
      {
        "label": "Ministra da Manteiga",
        "value": "Filha de Big Mom com cabelo púrpura e sobretudo escuro"
      },
      {
        "label": "Contenção de Luffy",
        "value": "Ajudou o exército enfurecido de Big Mom a subjugar Luffy e Nami após Cracker"
      }
    ]
  },
  {
    "id": "exc-op-126-charlotte-newshi",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Gocha Gocha no Mi (Fruta da Fusão)",
    "badgeTitle": "Paramecia de Fusão Corporal",
    "targetCharacterId": "charlotte-perospero",
    "targetCharacterName": "Charlotte Perospero",
    "validCharacterIds": [
      "charlotte-perospero"
    ],
    "clues": [
      {
        "label": "Fusão de Dez Irmãos",
        "value": "Permite fundir múltiplos irmãos em um único guerreiro gigante armado com foice"
      },
      {
        "label": "Irmão Dodecagêmeo",
        "value": "Um dos dez irmãos gêmeos da família Charlotte encarregados de caçar os Mugiwaras"
      },
      {
        "label": "Emboscada em Cacao Island",
        "value": "Tentou impedir a fuga de Sanji e Luffy das docas de Cacao Island"
      }
    ]
  },
  {
    "id": "exc-op-127-kozuki-toki",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Toki Toki no Mi (Fruta do Tempo)",
    "badgeTitle": "Paramecia Cronológica Temporal",
    "targetCharacterId": "kozuki-toki",
    "targetCharacterName": "Kozuki Toki",
    "validCharacterIds": [
      "kozuki-toki"
    ],
    "clues": [
      {
        "label": "Salto para o Futuro",
        "value": "Permite avançar pessoas no tempo para o futuro, sem jamais poder retornar ao passado"
      },
      {
        "label": "Vinda do Século Perdido",
        "value": "Nasceu há mais de 800 anos e saltou no tempo até encontrar Kozuki Oden"
      },
      {
        "label": "Profecia de Wano",
        "value": "Proferiu em chamas o poema profético de que em 20 anos a lua traria a vingança"
      }
    ]
  },
  {
    "id": "exc-op-128-morgans",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Tori Tori no Mi: Modelo Albatroz",
    "badgeTitle": "Zoan Aviária Jornalística",
    "targetCharacterId": "morgans",
    "targetCharacterName": "morgans",
    "validCharacterIds": [
      "morgans"
    ],
    "clues": [
      {
        "label": "Forma Híbrida Permanente",
        "value": "Permanece o tempo todo transformado em albatroz humanizado de terno e cartola"
      },
      {
        "label": "Presidente do Jornal",
        "value": "Líder do Jornal de Economia Mundial que controla as notícias do mundo (Big News)"
      },
      {
        "label": "Defesa das Fake News",
        "value": "Recusou propinas do Governo Mundial declarando que ama notícias bombásticas"
      }
    ]
  },
  {
    "id": "exc-op-129-charlotte-snack",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Bishi Bishi no Mi (Fruta do Biscoito Salgado / Salgadinho)",
    "badgeTitle": "Paramecia de Criação Alimentar",
    "targetCharacterId": "charlotte-cracker",
    "targetCharacterName": "Charlotte Cracker",
    "validCharacterIds": [
      "charlotte-cracker"
    ],
    "clues": [
      {
        "label": "Ex-General da Doçura",
        "value": "Perdeu seu posto de quarto General da Doçura após ser derrotado por Urouge"
      },
      {
        "label": "Recompensa de 600 Milhões",
        "value": "Empunha uma espada larga e enfrentou a frota da Germa 66 na fuga de Whole Cake"
      },
      {
        "label": "Ministro dos Fritos",
        "value": "Filho robusto de Big Mom posicionado no porto para afundar o Sunny"
      }
    ]
  },
  {
    "id": "exc-op-130-stronger",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Uma Uma no Mi: Modelo Pégaso",
    "badgeTitle": "Zoan Mítica Alada",
    "targetCharacterId": "doc-q",
    "targetCharacterName": "Doc Q",
    "validCharacterIds": [
      "doc-q",
      "doc-q"
    ],
    "clues": [
      {
        "label": "Cavalo Alado dos Céus",
        "value": "Transforma um cavalo doente em um imenso pégaso com asas brancas plumadas"
      },
      {
        "label": "Montaria de Doc Q",
        "value": "Cavalo decrépito de estimação do médico dos Piratas do Barba Negra"
      },
      {
        "label": "Combate Aéreo contra Law",
        "value": "Sobrevoou o mar transportando Barba Negra na emboscada contra os Heart Pirates"
      }
    ]
  },
  {
    "id": "exc-op-131-pierre",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Uma Uma no Mi (Fruta do Cavalo)",
    "badgeTitle": "Zoan Equina",
    "targetCharacterId": "enel",
    "targetCharacterName": "Enel",
    "validCharacterIds": [
      "enel"
    ],
    "clues": [
      {
        "label": "Pássaro que Virou Cavalo",
        "value": "Fruta consumida por um pássaro que se transforma num pégaso com bolinhas rosas"
      },
      {
        "label": "Montaria do Deus Gan Fall",
        "value": "Cavaleiro dos Céus e ex-deus de Skypiea que socorria pessoas ao soprar o apito"
      },
      {
        "label": "Aparência Desajeitada",
        "value": "Forma híbrida com asas de pássaro e corpo de cavalo manchado"
      }
    ]
  },
  {
    "id": "exc-op-132-minotauros",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Ushi Ushi no Mi: Modelo Touro / Minotauro",
    "badgeTitle": "Zoan Desperta Bestial",
    "targetCharacterId": "magellan",
    "targetCharacterName": "Magellan",
    "validCharacterIds": [
      "magellan"
    ],
    "clues": [
      {
        "label": "Fera Desperta de Impel Down",
        "value": "Zoan Desperta cujos usuários perderam a consciência humana para os instintos da besta"
      },
      {
        "label": "Guardião Torturador",
        "value": "Uma das quatro feras carcereiras de Impel Down armada com clava de espinhos"
      },
      {
        "label": "Regeneração Monstruosa",
        "value": "Recupera-se de ferimentos quase imediatamente após ser derrotado no Nível 3"
      }
    ]
  },
  {
    "id": "exc-op-133-onigumo",
    "animeSlug": "one-piece",
    "category": "Akuma no Mi",
    "questionTitle": "A quem pertence ou já pertenceu esta Akuma no Mi?",
    "targetTitle": "Kumo Kumo no Mi (Fruta da Aranha Onigumo)",
    "badgeTitle": "Zoan Aracnídea",
    "targetCharacterId": "onigumo",
    "targetCharacterName": "Onigumo",
    "validCharacterIds": [
      "onigumo"
    ],
    "clues": [
      {
        "label": "Oito Braços de Aranha",
        "value": "Brota membros negros de aranha das costas empunhando oito espadas simultâneas"
      },
      {
        "label": "Vice-Almirante Sinistro",
        "value": "Veterano do Buster Call e Marineford conhecido como Onigumo da Aranha"
      },
      {
        "label": "Algema de Seastone",
        "value": "Foi quem algemou Marco a Fênix com algemas de Kairouseki em Marineford"
      }
    ]
  },
  {
    "id": "exc-naruto-1-naruto-uzumaki",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Rasengan (Esfera Espiral)",
    "badgeTitle": "Ninjutsu de Mudança de Forma",
    "targetCharacterId": "naruto-uzumaki",
    "targetCharacterName": "Naruto Uzumaki",
    "validCharacterIds": [
      "naruto-uzumaki",
      "minato-namikaze",
      "jiraiya",
      "kakashi-hatake",
      "konohamaru-sarutobi"
    ],
    "clues": [
      {
        "label": "Criador Original",
        "value": "Criado pelo Quarto Hokage Minato Namikaze após 3 anos observando a Bijuudama"
      },
      {
        "label": "Mecânica do Chakra",
        "value": "Rotação, densidade e contenção extrema de chakra concentrado na palma da mão"
      },
      {
        "label": "Evolução Máxima",
        "value": "Combinado por Naruto com o Estilo Vento para criar o Rasenshuriken"
      }
    ]
  },
  {
    "id": "exc-naruto-2-kakashi-hatake",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Chidori / Raikiri (Lâmina Relâmpago)",
    "badgeTitle": "Ninjutsu de Estilo Raio",
    "targetCharacterId": "kakashi-hatake",
    "targetCharacterName": "Kakashi Hatake",
    "validCharacterIds": [
      "kakashi-hatake",
      "sasuke-uchiha"
    ],
    "clues": [
      {
        "label": "Som Característico",
        "value": "Som agudo ensurdecedor comparado ao chilrear de mil pássaros"
      },
      {
        "label": "Necessidade do Sharingan",
        "value": "Exige o Sharingan para compensar o efeito de visão em túnel na arrancada"
      },
      {
        "label": "Variações Famosas",
        "value": "Chidori Nagashi, Chidori Senbon e Kirin desenvolvidos por Sasuke Uchiha"
      }
    ]
  },
  {
    "id": "exc-naruto-3-kakashi-hatake",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Kamui (Poder Espacial do Mangekyou Sharingan)",
    "badgeTitle": "Dōjutsu Espaço-Temporal",
    "targetCharacterId": "kakashi-hatake",
    "targetCharacterName": "Kakashi Hatake",
    "validCharacterIds": [
      "kakashi-hatake",
      "obito-uchiha"
    ],
    "clues": [
      {
        "label": "Dimensão Exclusiva",
        "value": "Conecta o usuário a uma dimensão de bolso paralela com blocos cúbicos"
      },
      {
        "label": "Intangibilidade e Teletransporte",
        "value": "Permite atravessar matéria sólida enviando partes do corpo para outra dimensão"
      },
      {
        "label": "Origem Compartilhada",
        "value": "Pertencia originalmente ao par de olhos de Obito Uchiha doado a Kakashi na Ponte Kannabi"
      }
    ]
  },
  {
    "id": "exc-naruto-4-minato-namikaze",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Hiraishin no Jutsu (Técnica do Deus Voador do Trovão)",
    "badgeTitle": "Ninjutsu Espaço-Temporal Lendário",
    "targetCharacterId": "minato-namikaze",
    "targetCharacterName": "Minato Namikaze",
    "validCharacterIds": [
      "minato-namikaze",
      "tobirama-senju"
    ],
    "clues": [
      {
        "label": "Selos de Teletransporte",
        "value": "Permite teletransportar-se instantaneamente para qualquer fórmula de selo demarcada"
      },
      {
        "label": "Kunais Especiais",
        "value": "Minato espalhava kunais de três pontas pelo campo de batalha para abater exércitos"
      },
      {
        "label": "Criador Pioneiro",
        "value": "Desenvolvido originalmente pelo Segundo Hokage Tobirama Senju"
      }
    ]
  },
  {
    "id": "exc-naruto-5-orochimaru",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Edo Tensei (Reencarnação do Mundo Impuro)",
    "badgeTitle": "Kinjutsu Proibido de Ressurreição",
    "targetCharacterId": "orochimaru",
    "targetCharacterName": "Orochimaru",
    "validCharacterIds": [
      "orochimaru",
      "kabuto-yakushi",
      "tobirama-senju"
    ],
    "clues": [
      {
        "label": "Sacrifício Vivo",
        "value": "Exige um corpo humano vivo como receptáculo para a alma do falecido invocada do Além"
      },
      {
        "label": "Regeneração Infinita",
        "value": "Cadáveres ressuscitados possuem chakra infinito e corpos imunes a ferimentos convencionais"
      },
      {
        "label": "A Quarta Grande Guerra",
        "value": "Kabuto ressuscitou dezenas de heróis e vilões lendários mudando o rumo da guerra"
      }
    ]
  },
  {
    "id": "exc-naruto-6-naruto-uzumaki",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Kage Bunshin no Jutsu (Técnica dos Clones das Sombras)",
    "badgeTitle": "Ninjutsu de Divisão de Chakra",
    "targetCharacterId": "naruto-uzumaki",
    "targetCharacterName": "Naruto Uzumaki",
    "validCharacterIds": [
      "naruto-uzumaki",
      "tobirama-senju",
      "kakashi-hatake",
      "itachi-uchiha",
      "hiruzen-sarutobi"
    ],
    "clues": [
      {
        "label": "Distribuição Equivalente",
        "value": "Divide o chakra do usuário igualmente entre réplicas físicas reais tangíveis"
      },
      {
        "label": "Transferência de Experiência",
        "value": "Ao desfazer o clone, todas as memórias e aprendizados retornam instantaneamente ao original"
      },
      {
        "label": "Pergaminho Sagrado",
        "value": "Primeiro jutsu proibido roubado e dominado por Naruto no primeiro capítulo"
      }
    ]
  },
  {
    "id": "exc-naruto-7-sasuke-uchiha",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Susanoo (O Guerreiro Espiritual Destruidor)",
    "badgeTitle": "Dōjutsu do Mangekyou Sharingan Definitivo",
    "targetCharacterId": "sasuke-uchiha",
    "targetCharacterName": "Sasuke Uchiha",
    "validCharacterIds": [
      "sasuke-uchiha",
      "itachi-uchiha",
      "madara-uchiha",
      "kakashi-hatake",
      "shisui-uchiha"
    ],
    "clues": [
      {
        "label": "Armadura Divina",
        "value": "Manifesta um gigantesco guerreiro espectral de chakra que protege e ataca"
      },
      {
        "label": "Armas Míticas de Itachi",
        "value": "Equipado com a lendária Espada de Totsuka e o Escelho de Yata"
      },
      {
        "label": "Forma Perfeita",
        "value": "Madara e Sasuke atingiram a forma de Susanoo Perfeito com armadura de samurai e asas"
      }
    ]
  },
  {
    "id": "exc-naruto-8-hashirama-senju",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Mokuton: Shin Suusenju (Várias Milhares de Mãos Verdadeiras)",
    "badgeTitle": "Kekkei Genkai do Estilo Madeira",
    "targetCharacterId": "hashirama-senju",
    "targetCharacterName": "Hashirama Senju",
    "validCharacterIds": [
      "hashirama-senju",
      "yamato",
      "madara-uchiha",
      "danzo-shimura"
    ],
    "clues": [
      {
        "label": "Titã de Madeira Budista",
        "value": "Invoca uma estátua de proporções colossais com milhares de braços de madeira"
      },
      {
        "label": "Supressão de Bijuu",
        "value": "Capaz de capturar a Kyuubi vestida com a armadura do Susanoo de Madara"
      },
      {
        "label": "Fusão Elemental",
        "value": "Combinação das naturezas de chakra de Terra e Água exclusiva do Primeiro Hokage"
      }
    ]
  },
  {
    "id": "exc-naruto-9-tsunade-senju",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Byakugou no In (Selo da Força de Uma Centena)",
    "badgeTitle": "Fuinjutsu Médico de Regeneração",
    "targetCharacterId": "tsunade-senju",
    "targetCharacterName": "Tsunade Senju",
    "validCharacterIds": [
      "tsunade-senju",
      "sakura-haruno",
      "mito-uzumaki"
    ],
    "clues": [
      {
        "label": "Losango na Testa",
        "value": "Selo em formato de diamante que armazena chakra concentrado por anos diários"
      },
      {
        "label": "Regeneração Mitótica",
        "value": "Ao ser liberado, força a mitose celular instantânea regenerando órgãos e ferimentos mortais"
      },
      {
        "label": "Invocação de Katsuyu",
        "value": "Permite invocar grandes porções da lesma Katsuyu da Floresta Shikkotsu"
      }
    ]
  },
  {
    "id": "exc-naruto-10-might-guy",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Hachimon Tonkou (Formação dos Oito Portões Internos)",
    "badgeTitle": "Taijutsu Proibido da Liberação Corporal",
    "targetCharacterId": "might-guy",
    "targetCharacterName": "Might Guy",
    "validCharacterIds": [
      "might-guy",
      "rock-lee"
    ],
    "clues": [
      {
        "label": "Oitavo Portão da Morte",
        "value": "Abertura do Portão da Morte no coração com sangue fervendo em vapor vermelho"
      },
      {
        "label": "Golpe Notcturne Guy",
        "value": "Distorceu o próprio espaço ao desferir o chute supremo que quase matou Madara Rikudou"
      },
      {
        "label": "Reconhecimento Lendário",
        "value": "Proclamado por Madara Uchiha como o mais forte em Taijutsu que ele já enfrentou"
      }
    ]
  },
  {
    "id": "exc-naruto-11-itachi-uchiha",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Amaterasu (Chamas Negras Eternas)",
    "badgeTitle": "Dōjutsu do Mangekyou Sharingan de Fogo",
    "targetCharacterId": "itachi-uchiha",
    "targetCharacterName": "Itachi Uchiha",
    "validCharacterIds": [
      "itachi-uchiha",
      "sasuke-uchiha"
    ],
    "clues": [
      {
        "label": "Fogo Inextinguível",
        "value": "Chamas negras que queimam na linha de visão do usuário por sete dias e sete noites"
      },
      {
        "label": "Consumo de Qualquer Coisa",
        "value": "Capazes de queimar o próprio fogo normal e qualquer superfície sólida"
      },
      {
        "label": "Manipulação de Forma Kagutsuchi",
        "value": "Sasuke combinou o Amaterasu com a técnica Kagutsuchi para moldar espadas de fogo negro"
      }
    ]
  },
  {
    "id": "exc-naruto-12-itachi-uchiha",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Tsukuyomi (Pesadelo da Lua Ilusória)",
    "badgeTitle": "Genjutsu Supremo do Olho Esquerdo",
    "targetCharacterId": "itachi-uchiha",
    "targetCharacterName": "Itachi Uchiha",
    "validCharacterIds": [
      "itachi-uchiha"
    ],
    "clues": [
      {
        "label": "Controle Temporal e Espacial",
        "value": "Controla a percepção do tempo, fazendo 1 segundo parecer 72 horas de tortura mental"
      },
      {
        "label": "Colapso Psicológico",
        "value": "Deixou Kakashi Hatake em coma no hospital de Konoha após um único olhar"
      },
      {
        "label": "Exclusividade Genética",
        "value": "Pertence exclusivamente ao Mangekyou Sharingan esquerdo de Itachi Uchiha"
      }
    ]
  },
  {
    "id": "exc-naruto-13-pain-nagato",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Shinra Tensei (Julgamento Divino / Repulsão Celestial)",
    "badgeTitle": "Poder do Rinnegan / Caminho Deva",
    "targetCharacterId": "pain-nagato",
    "targetCharacterName": "Pain (Nagato)",
    "validCharacterIds": [
      "pain-nagato",
      "madara-uchiha",
      "sasuke-uchiha"
    ],
    "clues": [
      {
        "label": "Repulsão Gravitacional",
        "value": "Força gravitacional repulsiva capaz de desviar qualquer ataque ou pulverizar vilas"
      },
      {
        "label": "Destruição de Konoha",
        "value": "Devastou Konoha inteira criando uma gigantesca cratera vazia no solo"
      },
      {
        "label": "Intervalo de Recarga",
        "value": "Possui uma vulnerabilidade estrita de exatamente 5 segundos de intervalo entre os usos normais"
      }
    ]
  },
  {
    "id": "exc-naruto-14-pain-nagato",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Chibaku Tensei (Devastação Planetária)",
    "badgeTitle": "Técnica de Gravidade do Rinnegan",
    "targetCharacterId": "pain-nagato",
    "targetCharacterName": "Pain (Nagato)",
    "validCharacterIds": [
      "pain-nagato",
      "madara-uchiha",
      "sasuke-uchiha",
      "kaguya-otsutsuki"
    ],
    "clues": [
      {
        "label": "Núcleo de Atração Negra",
        "value": "Cria uma esfera negra de gravidade que atrai montanhas e solo formando um pequeno meteoro"
      },
      {
        "label": "Criação da Lua",
        "value": "Técnica originalmente utilizada por Hagoromo e Hamura para selar Kaguya Otsutsuki e criar a Lua"
      },
      {
        "label": "Prisão para Bijuus",
        "value": "Sasuke prendeu as nove Bijuus em meteoros Chibaku Tensei com um estalar de dedos"
      }
    ]
  },
  {
    "id": "exc-naruto-15-sasuke-uchiha",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Kirin (Besta Relâmpago dos Céus)",
    "badgeTitle": "Ninjutsu de Raio Natural",
    "targetCharacterId": "sasuke-uchiha",
    "targetCharacterName": "Sasuke Uchiha",
    "validCharacterIds": [
      "sasuke-uchiha"
    ],
    "clues": [
      {
        "label": "Nuvens de Tempestade Naturais",
        "value": "Aquece a atmosfera com jatos de fogo para canalizar raios reais das nuvens cumulus"
      },
      {
        "label": "Velocidade de 1 Milésimo de Segundo",
        "value": "Golpe relâmpago que desaba dos céus na velocidade natural da eletricidade"
      },
      {
        "label": "Duelo Fraterno",
        "value": "Utilizado por Sasuke contra o Susanoo de Itachi no esconderijo Uchiha"
      }
    ]
  },
  {
    "id": "exc-naruto-16-shisui-uchiha",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Kotoamatsukami (Ilusão Suprema do Olho de Shisui)",
    "badgeTitle": "Genjutsu Mais Poderoso do Mundo Ninja",
    "targetCharacterId": "shisui-uchiha",
    "targetCharacterName": "Shisui Uchiha",
    "validCharacterIds": [
      "shisui-uchiha",
      "danzo-shimura"
    ],
    "clues": [
      {
        "label": "Manipulação Mental Invisível",
        "value": "Controla a mente do alvo sem que a própria vítima jamais perceba que está sendo manipulada"
      },
      {
        "label": "Tempo de Espera de 10 Anos",
        "value": "Exige uma década inteira para recarregar sem as células de Hashirama Senju"
      },
      {
        "label": "Quebra do Edo Tensei",
        "value": "Libertou Itachi Uchiha do controle absoluto do Edo Tensei de Kabuto na Quarta Guerra"
      }
    ]
  },
  {
    "id": "exc-naruto-17-danzo-shimura",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Izanagi (A Troca do Destino pela Cegueira)",
    "badgeTitle": "Kinjutsu do Clã Uchiha",
    "targetCharacterId": "danzo-shimura",
    "targetCharacterName": "Danzo Shimura",
    "validCharacterIds": [
      "danzo-shimura",
      "obito-uchiha",
      "madara-uchiha",
      "itachi-uchiha"
    ],
    "clues": [
      {
        "label": "Reescrever a Realidade",
        "value": "Transforma ferimentos e a própria morte em mera ilusão, ressuscitando o usuário"
      },
      {
        "label": "Cegueira Definitiva",
        "value": "O olho Sharingan utilizado na técnica perde a luz para sempre após o encerramento"
      },
      {
        "label": "Braço com Dez Olhos",
        "value": "Danzo implantou dez Sharingans no braço direito reforçado com células de Hashirama"
      }
    ]
  },
  {
    "id": "exc-naruto-18-itachi-uchiha",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Izanami (O Ciclo Infinito do Destino)",
    "badgeTitle": "Kinjutsu de Salvação do Clã Uchiha",
    "targetCharacterId": "itachi-uchiha",
    "targetCharacterName": "Itachi Uchiha",
    "validCharacterIds": [
      "itachi-uchiha"
    ],
    "clues": [
      {
        "label": "Loop Temporal Infinito",
        "value": "Prende a mente da vítima em uma repetição infinita de sensações corporais até que aceite seu destino"
      },
      {
        "label": "Criado para Parar o Izanagi",
        "value": "Desenvolvido no passado para punir membros do clã Uchiha arrogantes que abusavam do Izanagi"
      },
      {
        "label": "Redenção de Kabuto",
        "value": "Itachi cegou seu olho direito para fazer Kabuto Yakushi aceitar sua verdadeira identidade"
      }
    ]
  },
  {
    "id": "exc-naruto-19-gaara",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Sabaku Kyuu / Sabaku Sousou (Caixão de Areia / Enterro de Areia)",
    "badgeTitle": "Ninjutsu Terrestre de Areia",
    "targetCharacterId": "gaara",
    "targetCharacterName": "Gaara",
    "validCharacterIds": [
      "gaara"
    ],
    "clues": [
      {
        "label": "Esmagamento sob Pressão",
        "value": "Envolve o corpo da vítima em areia espessa esmagando seus ossos sob pressão colossal"
      },
      {
        "label": "Cabaça de Areia nas Costas",
        "value": "Carrega areia enriquecida com chakra infundida com o amor protetor de sua mãe Karura"
      }
    ]
  },
  {
    "id": "exc-naruto-20-shino-aburame",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Kikamushi no Jutsu (Insetos Parasitas Kikaichu)",
    "badgeTitle": "Hiden Secreto do Clã Aburame",
    "targetCharacterId": "shino-aburame",
    "targetCharacterName": "Shino Aburame",
    "validCharacterIds": [
      "shino-aburame"
    ],
    "clues": [
      {
        "label": "Simbiose Corporal",
        "value": "Insetos que vivem sob a pele do usuário alimentando-se de chakra e obedecendo ordens"
      },
      {
        "label": "Drenagem Silenciosa",
        "value": "Enxames que cobrem o oponente drenando todo o seu chakra sem fazer ruído"
      },
      {
        "label": "Personalidade Estoica",
        "value": "Gênio analítico que usa capuz e óculos escuros e nunca subestima adversários"
      }
    ]
  },
  {
    "id": "exc-naruto-21-shikamaru-nara",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Kagemane no Jutsu (Técnica de Possessão da Sombra)",
    "badgeTitle": "Hiden Secreto do Clã Nara",
    "targetCharacterId": "shikamaru-nara",
    "targetCharacterName": "Shikamaru Nara",
    "validCharacterIds": [
      "shikamaru-nara"
    ],
    "clues": [
      {
        "label": "Mimetismo Corporal",
        "value": "Estica a própria sombra para conectar à sombra do alvo, forçando-o a imitar seus movimentos"
      },
      {
        "label": "Estratégia de 200 de QI",
        "value": "Utilizada para prender oponentes enquanto calcula dezenas de jogadas à frente como no Shogi"
      },
      {
        "label": "Aliança Ino-Shika-Cho",
        "value": "Pilar tático central da lendária formação de três clãs de Konoha"
      }
    ]
  },
  {
    "id": "exc-naruto-22-ino-yamanaka",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Shintenshin no Jutsu (Técnica de Transferência de Mente)",
    "badgeTitle": "Hiden Secreto do Clã Yamanaka",
    "targetCharacterId": "ino-yamanaka",
    "targetCharacterName": "Ino Yamanaka",
    "validCharacterIds": [
      "ino-yamanaka"
    ],
    "clues": [
      {
        "label": "Projeção Espiritual",
        "value": "Dispara a própria consciência em linha reta assumindo o controle total do corpo do alvo"
      },
      {
        "label": "Vulnerabilidade do Corpo Original",
        "value": "O corpo físico do usuário cai inconsciente e vulnerável enquanto a mente estiver fora"
      },
      {
        "label": "Rede Sensorial da Guerra",
        "value": "Ino conectou a mente de milhares de shinobis durante a batalha contra o Juubi"
      }
    ]
  },
  {
    "id": "exc-naruto-23-chouji-akimichi",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Baika no Jutsu (Técnica do Multi-Tamanho)",
    "badgeTitle": "Hiden Secreto do Clã Akimichi",
    "targetCharacterId": "chouji-akimichi",
    "targetCharacterName": "Chouji Akimichi",
    "validCharacterIds": [
      "chouji-akimichi"
    ],
    "clues": [
      {
        "label": "Expansão Gigantesca",
        "value": "Converte calorias corporais em chakra para inflar o corpo como uma rocha gigante (Nikudan Sensha)"
      },
      {
        "label": "Asas de Borboleta",
        "value": "Queima as últimas calorias corporais manifestando imensas asas de borboleta de puro chakra"
      },
      {
        "label": "Pílulas Especiais",
        "value": "Três pílulas de cores verde, amarela e vermelha que amplificam a força cem vezes"
      }
    ]
  },
  {
    "id": "exc-naruto-24-neji-hyuuga",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Juuken: Hakke Rokujuuyon Shou (Oito Trigramas Sessenta e Quatro Golpes)",
    "badgeTitle": "Taijutsu do Byakugan do Clã Hyuuga",
    "targetCharacterId": "neji-hyuuga",
    "targetCharacterName": "Neji Hyuuga",
    "validCharacterIds": [
      "neji-hyuuga",
      "hinata-hyuuga"
    ],
    "clues": [
      {
        "label": "Bloqueio de Tenketsu",
        "value": "Atinge com precisão cirúrgica os 64 pontos vitais de chakra paralisando o fluxo de energia"
      },
      {
        "label": "Visão de 360 Graus",
        "value": "Guiado pelo Byakugan que enxerga o sistema circulatório de chakra através de qualquer barreira"
      },
      {
        "label": "Ponto Cego Único",
        "value": "Possui um diminuto ponto cego atrás da primeira vértebra torácica no pescoço"
      }
    ]
  },
  {
    "id": "exc-naruto-25-kimimaro",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Shikotsumyaku (Manipulação Óssea Macabra)",
    "badgeTitle": "Kekkei Genkai do Clã Kaguya",
    "targetCharacterId": "kimimaro",
    "targetCharacterName": "Kimimaro",
    "validCharacterIds": [
      "kimimaro"
    ],
    "clues": [
      {
        "label": "Ossos Mais Duros que Aço",
        "value": "Projeta e extrai os próprios ossos da pele usando-os como espadas, balas e lanças"
      },
      {
        "label": "Dança das Samambaias (Sawarabi no Mai)",
        "value": "Brota uma colossal floresta de lâminas ósseas gigantescas perfurando o solo"
      },
      {
        "label": "Último Sobrevivente",
        "value": "Último membro vivo de seu clã bárbaro e o seguidor mais devoto de Orochimaru"
      }
    ]
  },
  {
    "id": "exc-naruto-26-oonoki",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Jinton: Genkai Hakuri no Jutsu (Estilo Poeira / Desmantelamento Atômico)",
    "badgeTitle": "Kekkei Tōta (Fusão de Três Elementos)",
    "targetCharacterId": "oonoki",
    "targetCharacterName": "Oonoki",
    "validCharacterIds": [
      "oonoki",
      "mu"
    ],
    "clues": [
      {
        "label": "Estrutura Geométrica Transparente",
        "value": "Cria cubos e cones de energia tridimensional que pulverizam matéria a nível atômico"
      },
      {
        "label": "Três Elementos Combinados",
        "value": "Fusão avançada simultânea de Terra, Vento e Fogo exclusiva dos Tsuchikages"
      },
      {
        "label": "Terceiro Tsuchikage",
        "value": "Veterano governante de Iwagakure que sofre constantemente com dores na coluna"
      }
    ]
  },
  {
    "id": "exc-naruto-27-deidara",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Kibaku Nendo (Argila Explosiva C4 Karura)",
    "badgeTitle": "Kekkei Genkai do Estilo Explosão (Bakuton)",
    "targetCharacterId": "deidara",
    "targetCharacterName": "Deidara",
    "validCharacterIds": [
      "deidara"
    ],
    "clues": [
      {
        "label": "Bocas nas Palmas das Mãos",
        "value": "Mastiga argila infundida com chakra em bocas nas palmas das mãos criando esculturas vivas"
      },
      {
        "label": "C0: Auto-Destruição Artística",
        "value": "Abre a boca selada no peito para transformar o próprio corpo numa explosão de 10 km"
      },
      {
        "label": "Filosofia da Arte",
        "value": "Defendia fervorosamente que a verdadeira arte é uma explosão efêmera (Katsu!)"
      }
    ]
  },
  {
    "id": "exc-naruto-28-sasori",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Kugutsu no Jutsu: Hitokugutsu (Marionetes Humanas)",
    "badgeTitle": "Técnica Secreta dos Marionetistas",
    "targetCharacterId": "sasori",
    "targetCharacterName": "Sasori",
    "validCharacterIds": [
      "sasori"
    ],
    "clues": [
      {
        "label": "Marionetes Feitas de Cadáveres",
        "value": "Transforma corpos de ninjas mortos em marionetes capazes de usar seus jutsus originais"
      },
      {
        "label": "Marionete do Terceiro Kazekage",
        "value": "Manipulava o corpo do Terceiro Kazekage com a poderosa técnica da Areia de Ferro"
      },
      {
        "label": "Coração de Madeira",
        "value": "Transformou seu próprio corpo numa marionete mantendo viva apenas uma cápsula de carne no peito"
      }
    ]
  },
  {
    "id": "exc-naruto-29-hidan",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Jujutsu: Shuji Hyoketsu (Possessão da Morte por Sangue)",
    "badgeTitle": "Ritual Vodu da Fé de Jashin",
    "targetCharacterId": "hidan",
    "targetCharacterName": "Hidan",
    "validCharacterIds": [
      "hidan"
    ],
    "clues": [
      {
        "label": "Círculo de Sangue com Triângulo",
        "value": "Ao ingerir o sangue da vítima sobre o selo no chão, transforma seu corpo num boneco de vodu"
      },
      {
        "label": "Imortalidade Absoluta",
        "value": "Completamente incapaz de morrer mesmo decapitado ou desmembrado em pedaços"
      },
      {
        "label": "Foice de Três Lâminas",
        "value": "Empunha uma foice vermelha com corda para coletar gotas de sangue de seus alvos"
      }
    ]
  },
  {
    "id": "exc-naruto-30-kisame-hoshigaki",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Suiton: Daikoudan no Jutsu (Projétil do Grande Tubarão Devorador)",
    "badgeTitle": "Ninjutsu de Absorção Aquática",
    "targetCharacterId": "kisame-hoshigaki",
    "targetCharacterName": "Kisame Hoshigaki",
    "validCharacterIds": [
      "kisame-hoshigaki"
    ],
    "clues": [
      {
        "label": "Absorção de Chakra Inimigo",
        "value": "Tubarão de água colossal que cresce e fica mais potente ao devorar o chakra do ataque rival"
      },
      {
        "label": "A Besta sem Cauda",
        "value": "Possuía reservas monstruosas de chakra comparáveis às de uma própria Bijuu"
      },
      {
        "label": "Fusão com a Samehada",
        "value": "Fundiu-se com a espada Samehada transformando-se num tubarão humanóide com guelras"
      }
    ]
  },
  {
    "id": "exc-naruto-31-jiraiya",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Senpō: Modo Sábio dos Sapos (Sage Mode)",
    "badgeTitle": "Senjutsu da Energia Natural",
    "targetCharacterId": "jiraiya",
    "targetCharacterName": "Jiraiya",
    "validCharacterIds": [
      "jiraiya",
      "naruto-uzumaki",
      "minato-namikaze"
    ],
    "clues": [
      {
        "label": "Equilíbrio da Energia Natural",
        "value": "Absorve a energia da atmosfera combinando-a com chakra físico e espiritual"
      },
      {
        "label": "Fukusaku e Shima nos Ombros",
        "value": "Invocava os dois sapos anciões do Monte Myoboku nos ombros para manter o fluxo"
      },
      {
        "label": "Rasengan Gigante e Chōōdama",
        "value": "Amplifica a força física e os ninjutsus para dimensões monumentais"
      }
    ]
  },
  {
    "id": "exc-naruto-32-sasuke-uchiha",
    "animeSlug": "naruto",
    "category": "Jutsus Secretos & Kekkei Genkai",
    "questionTitle": "A quem pertence esta técnica ou jutsu lendário?",
    "targetTitle": "Amenotejikara (Teletransporte Espacial do Rinnegan Supremo)",
    "badgeTitle": "Dōjutsu Espaço-Temporal com Tomoe",
    "targetCharacterId": "sasuke-uchiha",
    "targetCharacterName": "Sasuke Uchiha",
    "validCharacterIds": [
      "sasuke-uchiha"
    ],
    "clues": [
      {
        "label": "Troca de Lugar Instantânea",
        "value": "Troca de posição com qualquer pessoa ou objeto dentro de seu campo de visão num milissegundo"
      },
      {
        "label": "Rinnegan com Seis Tomoes",
        "value": "Despertado no olho esquerdo após receber o chakra do Rikudou Sennin"
      },
      {
        "label": "Tática contra Madara e Kaguya",
        "value": "Usado para transportar espadas e Chidori diretamente atrás da guarda dos oponentes"
      }
    ]
  },
  {
    "id": "exc-jjk-1-satoru-gojo",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Muryoukousho (Vazio Imensurável / Immeasurable Void)",
    "badgeTitle": "Expansão de Domínio Suprema",
    "targetCharacterId": "satoru-gojo",
    "targetCharacterName": "Satoru Gojo",
    "validCharacterIds": [
      "satoru-gojo"
    ],
    "clues": [
      {
        "label": "Sobrecarga de Informação",
        "value": "Inunda o cérebro da vítima com todo o conhecimento do universo paralisando-a instantaneamente"
      },
      {
        "label": "Sinal de Mão Único",
        "value": "Ativada com o gesto do mudra de Taishakuten cruzando o dedo médio sobre o indicador"
      },
      {
        "label": "Domínio de 0.2 Segundos",
        "value": "Executou um domínio relâmpago de 0.2 segundos na estação de Shibuya para não matar civis"
      }
    ]
  },
  {
    "id": "exc-jjk-2-ryomen-sukuna",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Fukuma Mizushi (Santuário Malevolente / Malevolent Shrine)",
    "badgeTitle": "Expansão de Domínio Aberta Sem Barreira",
    "targetCharacterId": "ryomen-sukuna",
    "targetCharacterName": "Ryomen Sukuna",
    "validCharacterIds": [
      "ryomen-sukuna",
      "yuji-itadori"
    ],
    "clues": [
      {
        "label": "Domínio sem Barreira Externa",
        "value": "Pinta sua técnica no ar como um artista desenhando no céu sem fechar barreira física"
      },
      {
        "label": "Cortes Desmantelar e Clivar",
        "value": "Chuva incessante de cortes Dismantle e Cleave num raio de destruição de até 200 metros"
      },
      {
        "label": "Rei das Maldições",
        "value": "Santuário budista sinistro com chifres e caveiras do feiticeiro da Era Heian"
      }
    ]
  },
  {
    "id": "exc-jjk-3-megumi-fushiguro",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Chimera Shadow Garden (Jardim das Sombras Quiméricas)",
    "badgeTitle": "Expansão de Domínio de Sombras",
    "targetCharacterId": "megumi-fushiguro",
    "targetCharacterName": "Megumi Fushiguro",
    "validCharacterIds": [
      "megumi-fushiguro",
      "ryomen-sukuna"
    ],
    "clues": [
      {
        "label": "Inundação de Fluido Escuro",
        "value": "Cobre o solo com sombras líquidas viscosas invocando dezenas de shikigamis simultâneos"
      },
      {
        "label": "Domínio Incompleto",
        "value": "Inicialmente precisava de um espaço fechado como cavernas para servir de barreira física"
      },
      {
        "label": "Técnica das Dez Sombras",
        "value": "Técnica herdada do clã Zenin capaz de invocar o temido General Mahoraga"
      }
    ]
  },
  {
    "id": "exc-jjk-4-kinji-hakari",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Idle Death Gamble (Aposta Mortal Ociosa / Pachinko)",
    "badgeTitle": "Expansão de Domínio de Roleta Pachinko",
    "targetCharacterId": "kinji-hakari",
    "targetCharacterName": "Kinji Hakari",
    "validCharacterIds": [
      "kinji-hakari"
    ],
    "clues": [
      {
        "label": "Premiação do Jackpot",
        "value": "Ao acertar o Jackpot de 777 na roleta do mangá romântico ganha 4 minutos e 11 segundos de invencibilidade"
      },
      {
        "label": "Energia Amaldiçoada Infinita",
        "value": "Chakra e energia infinita jorrando no corpo com Técnica Reversa automática instantânea"
      },
      {
        "label": "Música Tema de Anime",
        "value": "A música Pure Love Train toca nos céus enquanto o usuário se torna literalmente imortal"
      }
    ]
  },
  {
    "id": "exc-jjk-5-dagon",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Horizon of the Captivating Skandha (Horizonte do Canto Cativante)",
    "badgeTitle": "Expansão de Domínio Tropical Oceânica",
    "targetCharacterId": "dagon",
    "targetCharacterName": "Dagon",
    "validCharacterIds": [
      "dagon"
    ],
    "clues": [
      {
        "label": "Praia Tropical Paradisíaca",
        "value": "Manifesta uma praia paradisíaca ensolarada que servia de refúgio para o grupo de Geto"
      },
      {
        "label": "Enxame da Morte (Death Swarm)",
        "value": "Invoca enxames infinitos de peixes e monstros marinhos vorazes com acerto garantido"
      },
      {
        "label": "Maldição do Desastre Marinho",
        "value": "Espírito amaldiçoado especial nascido do medo humano pelos oceanos e profundezas"
      }
    ]
  },
  {
    "id": "exc-jjk-6-mahito",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Self-Embodiment of Perfection (Autoincorporação da Perfeição)",
    "badgeTitle": "Expansão de Domínio das Mãos Gigantes",
    "targetCharacterId": "mahito",
    "targetCharacterName": "Mahito",
    "validCharacterIds": [
      "mahito"
    ],
    "clues": [
      {
        "label": "Toque da Alma Garantido",
        "value": "Coloca qualquer inimigo preso dentro da palma de suas mãos espirituais instantaneamente"
      },
      {
        "label": "Transfiguração Imediata",
        "value": "Transfigura a alma do alvo sem precisar encostar fisicamente com as mãos de carne"
      },
      {
        "label": "Duelo com Sukuna",
        "value": "Quase morreu após tocar acidentalmente na alma de Ryomen Sukuna dentro de Yuji Itadori"
      }
    ]
  },
  {
    "id": "exc-jjk-7-kenjaku",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Womb Profusion (Profusão do Ventre)",
    "badgeTitle": "Expansão de Domínio de Almas Amaldiçoadas",
    "targetCharacterId": "kenjaku",
    "targetCharacterName": "Kenjaku",
    "validCharacterIds": [
      "kenjaku",
      "suguru-geto"
    ],
    "clues": [
      {
        "label": "Pilar Monstruoso de Faces",
        "value": "Cria uma colossal torre de rostos deformados sem fechar barreira externa"
      },
      {
        "label": "Domínio Aberto Lendário",
        "value": "Segundo feiticeiro na história capaz de manifestar um domínio sem barreiras fechadas"
      },
      {
        "label": "Gravidade Antigravitacional",
        "value": "Disparou uma onda esmagadora de gravidade revertida que destruiu a barreira de Yuki Tsukumo"
      }
    ]
  },
  {
    "id": "exc-jjk-8-yuta-okkotsu",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Authentic Mutual Love (Amor Mútuo Verdadeiro)",
    "badgeTitle": "Expansão de Domínio de Espadas e Cópias",
    "targetCharacterId": "yuta-okkotsu",
    "targetCharacterName": "Yuta Okkotsu",
    "validCharacterIds": [
      "yuta-okkotsu"
    ],
    "clues": [
      {
        "label": "Campo de Espadas Infinitas",
        "value": "Cobre o solo com centenas de katanas, cada uma contendo uma técnica copiada diferente"
      },
      {
        "label": "Ligação com Rika",
        "value": "A Rainha das Maldições Rika atua com poder pleno fora da barreira do domínio"
      },
      {
        "label": "Batalha Decisiva em Shinjuku",
        "value": "Encurralou Sukuna utilizando cortes Dismantle e fala amaldiçoada copiados"
      }
    ]
  },
  {
    "id": "exc-jjk-9-aoi-todo",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Boogie Woogie (Troca de Posição com Palmas)",
    "badgeTitle": "Técnica Inata de Translocação",
    "targetCharacterId": "aoi-todo",
    "targetCharacterName": "Aoi Todo",
    "validCharacterIds": [
      "aoi-todo"
    ],
    "clues": [
      {
        "label": "Bater de Palmas",
        "value": "Troca instantaneamente de lugar com qualquer pessoa ou objeto que possua energia amaldiçoada"
      },
      {
        "label": "QI de 530.000",
        "value": "Afirma possuir uma inteligência genial capaz de planejar centenas de trocas táticas por segundo"
      },
      {
        "label": "Amigo de Alma",
        "value": "Considera Yuji Itadori seu melhor amigo (Besto Friendo) por terem o mesmo gosto para mulheres"
      }
    ]
  },
  {
    "id": "exc-jjk-10-kento-nanami",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Ratio Technique (Técnica dos Sete Pontos Três)",
    "badgeTitle": "Técnica Inata de Ponto Fraco",
    "targetCharacterId": "kento-nanami",
    "targetCharacterName": "Kento Nanami",
    "validCharacterIds": [
      "kento-nanami"
    ],
    "clues": [
      {
        "label": "Divisão 7:3",
        "value": "Divide o corpo do alvo na proporção 7 para 3, forçando um ponto fraco crítico de corte"
      },
      {
        "label": "Faca com Pano Selado",
        "value": "Empunha uma lâmina sem fio enrolada em um tecido com padrão manchado"
      },
      {
        "label": "Voto das Horas Extras",
        "value": "Limita seu chakra durante o horário comercial e ganha um surto de energia ao fazer hora extra"
      }
    ]
  },
  {
    "id": "exc-jjk-11-megumi-fushiguro",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Técnica das Dez Sombras (Ten Shadows)",
    "badgeTitle": "Técnica Inata Hereditária do Clã Zenin",
    "targetCharacterId": "megumi-fushiguro",
    "targetCharacterName": "Megumi Fushiguro",
    "validCharacterIds": [
      "megumi-fushiguro",
      "ryomen-sukuna"
    ],
    "clues": [
      {
        "label": "Marionetes de Sombra",
        "value": "Usa sombras das mãos para invocar cães divinos, sapos, elefantes e serpentes"
      },
      {
        "label": "General Mahoraga",
        "value": "Espada de Oito Empunhaduras que se adapta a qualquer fenômeno ou golpe sofrido"
      },
      {
        "label": "Disputa de Clãs",
        "value": "Técnica cujo usuário do passado matou o patriarca dos Seis Olhos do clã Gojo em um duelo"
      }
    ]
  },
  {
    "id": "exc-jjk-12-choso",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Manipulação de Sangue (Blood Manipulation)",
    "badgeTitle": "Técnica Inata Hereditária do Clã Kamo",
    "targetCharacterId": "choso",
    "targetCharacterName": "Choso",
    "validCharacterIds": [
      "choso",
      "noritoshi-kamo",
      "yuji-itadori"
    ],
    "clues": [
      {
        "label": "Flecha Perfurante (Piercing Blood)",
        "value": "Dispara um jato de sangue supersônico pressurizado capaz de perfurar concreto"
      },
      {
        "label": "Pintura da Morte",
        "value": "Choso não sofre de anemia por converter energia amaldiçoada diretamente em sangue fresco"
      },
      {
        "label": "Endurecimento Escarlate",
        "value": "Aumenta a circulação e pulsação cardíaca para ganhar velocidade e reflexos sobre-humanos"
      }
    ]
  },
  {
    "id": "exc-jjk-13-toge-inumaki",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Fala Amaldiçoada (Cursed Speech)",
    "badgeTitle": "Técnica Inata Hereditária do Clã Inumaki",
    "targetCharacterId": "toge-inumaki",
    "targetCharacterName": "Toge Inumaki",
    "validCharacterIds": [
      "toge-inumaki",
      "yuta-okkotsu"
    ],
    "clues": [
      {
        "label": "Comandos Vocais Fatais",
        "value": "Imbui palavras com energia forçando o alvo a obedecer ordens como Não se Mova ou Exploda"
      },
      {
        "label": "Vocabulário de Ingredientes",
        "value": "Comunica-se exclusivamente com recheios de bolinhos de arroz onigiri para não ferir ninguém"
      },
      {
        "label": "Rebote na Garganta",
        "value": "Comandos fortes contra inimigos superiores causam tosse de sangue e desgaste severo da garganta"
      }
    ]
  },
  {
    "id": "exc-jjk-14-satoru-gojo",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Limitless / Mukagen (O Infinito Intocável)",
    "badgeTitle": "Técnica Inata Hereditária do Clã Gojo",
    "targetCharacterId": "satoru-gojo",
    "targetCharacterName": "Satoru Gojo",
    "validCharacterIds": [
      "satoru-gojo"
    ],
    "clues": [
      {
        "label": "Conceito da Convergência",
        "value": "Cria uma barreira infinita onde nada pode tocar o usuário devido à desaceleração infinitesimal"
      },
      {
        "label": "Azul e Vermelho",
        "value": "Atração (Azul) e Repulsão (Vermelho) combinadas na técnica secreta Vazio Roxo (Murasaki)"
      },
      {
        "label": "Exigência dos Seis Olhos",
        "value": "Exige o Dōjutsu dos Seis Olhos (Rikugan) para processar o fluxo microscópico de energia"
      }
    ]
  },
  {
    "id": "exc-jjk-15-mahito",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Transfiguração Ociosa (Idle Transfiguration)",
    "badgeTitle": "Técnica Inata de Manipulação de Alma",
    "targetCharacterId": "mahito",
    "targetCharacterName": "Mahito",
    "validCharacterIds": [
      "mahito"
    ],
    "clues": [
      {
        "label": "Mudar a Forma da Alma",
        "value": "Toca a alma das pessoas moldando a carne humana em monstros deformados e armas vivas"
      },
      {
        "label": "Imunidade Física",
        "value": "Ataques convencionais não causam dano a menos que o atacante possa enxergar os contornos da alma"
      },
      {
        "label": "Nascido do Ódio Humano",
        "value": "Espírito amaldiçoado de aparência jovem e cicatrizes que representa o desprezo entre humanos"
      }
    ]
  },
  {
    "id": "exc-jjk-16-jogo",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Coffin of the Iron Mountain (Caixão da Montanha de Ferro)",
    "badgeTitle": "Expansão de Domínio Vulcânica",
    "targetCharacterId": "jogo",
    "targetCharacterName": "Jogo",
    "validCharacterIds": [
      "jogo"
    ],
    "clues": [
      {
        "label": "Interior de Vulcão Ativo",
        "value": "Manifesta uma câmara magmática com rochas incandescentes que incineram feiticeiros comuns ao entrar"
      },
      {
        "label": "Meteoro Flamejante",
        "value": "Lança pedras vulcânicas gigantescas e jatos de chamas com acerto garantido"
      },
      {
        "label": "Desastre de Fogo",
        "value": "Espírito amaldiçoado especial de grau especial nascido do medo da terra e chamas"
      }
    ]
  },
  {
    "id": "exc-jjk-17-hiromi-higuruma",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Deadly Sentencing (Julgamento Mortal)",
    "badgeTitle": "Expansão de Domínio Jurídica do Tribunal",
    "targetCharacterId": "hiromi-higuruma",
    "targetCharacterName": "Hiromi Higuruma",
    "validCharacterIds": [
      "hiromi-higuruma"
    ],
    "clues": [
      {
        "label": "Proibição de Violência",
        "value": "Um tribunal solene onde toda a violência física é estritamente proibida por regras do domínio"
      },
      {
        "label": "Shikigami Judgeman",
        "value": "O juiz espiritual avalia os crimes da vítima confiscando sua técnica ou energia amaldiçoada"
      },
      {
        "label": "Espada do Carrasco",
        "value": "Pena de morte concede uma espada de luz dourada que mata com um único corte de raspão"
      }
    ]
  },
  {
    "id": "exc-jjk-18-yuki-tsukumo",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Star Rage (Massa Virtual / Bom-Ba-Ye)",
    "badgeTitle": "Técnica Inata de Física Teórica",
    "targetCharacterId": "yuki-tsukumo",
    "targetCharacterName": "Yuki Tsukumo",
    "validCharacterIds": [
      "yuki-tsukumo"
    ],
    "clues": [
      {
        "label": "Massa Virtual Infinita",
        "value": "Adiciona massa imaginária incomensurável a si mesma e ao shikigami Garuda sem perder agilidade"
      },
      {
        "label": "Buraco Negro Final",
        "value": "Em seu golpe suicida final acumulou tanta massa que colapsou num buraco negro real"
      },
      {
        "label": "Feiticeira de Grau Especial",
        "value": "Recusava missões tradicionais para pesquisar formas de erradicar a energia amaldiçoada"
      }
    ]
  },
  {
    "id": "exc-jjk-19-fumihiko-takaba",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Comedian (Comédia de Distorção da Realidade)",
    "badgeTitle": "Técnica Inata que Rivaliza com Gojo",
    "targetCharacterId": "fumihiko-takaba",
    "targetCharacterName": "Fumihiko Takaba",
    "validCharacterIds": [
      "fumihiko-takaba"
    ],
    "clues": [
      {
        "label": "Realização do que Achar Engraçado",
        "value": "Qualquer situação que o usuário achar genuinamente hilária se torna a realidade física absoluta"
      },
      {
        "label": "Ignorância do Próprio Poder",
        "value": "Funciona apenas porque o usuário não tem a menor ideia de que possui uma técnica amaldiçoada"
      },
      {
        "label": "Duelo com Kenjaku",
        "value": "Travou uma batalha de esquetes de comédia stand-up que neutralizou Kenjaku completamente"
      }
    ]
  },
  {
    "id": "exc-jjk-20-toji-fushiguro",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Restrição Celestial Física (Zero Energia Amaldiçoada)",
    "badgeTitle": "Pacto Divino de Nascimento",
    "targetCharacterId": "toji-fushiguro",
    "targetCharacterName": "Toji Fushiguro",
    "validCharacterIds": [
      "toji-fushiguro",
      "maki-zenin"
    ],
    "clues": [
      {
        "label": "Zero Absoluto de Energia",
        "value": "Ausência total de energia amaldiçoada em troca de sentidos e força física sobre-humanos supremos"
      },
      {
        "label": "Invisibilidade para Barreiras",
        "value": "Completamente imune ao rastreamento e reconhecimento de barreiras e domínios comuns"
      },
      {
        "label": "Assassino de Feiticeiros",
        "value": "Conhecido mundialmente como o Caçador de Feiticeiros que derrotou Gojo no passado"
      }
    ]
  },
  {
    "id": "exc-jjk-21-hajime-kashimo",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Mythical Amber Beast (Besta Mítica de Âmbar)",
    "badgeTitle": "Liberação de Energia Amaldiçoada Elétrica",
    "targetCharacterId": "hajime-kashimo",
    "targetCharacterName": "Hajime Kashimo",
    "validCharacterIds": [
      "hajime-kashimo"
    ],
    "clues": [
      {
        "label": "Uso Único e Fatal",
        "value": "Técnica de disparo único que vaporiza a carne do usuário após o encerramento do combate"
      },
      {
        "label": "Fenômenos Eletromagnéticos",
        "value": "Converte o corpo em eletricidade disparando raios-X e ondas sonoras supersônicas"
      },
      {
        "label": "Deus do Trovão de 400 Anos Atrás",
        "value": "Guerreiro mais forte de sua era ressuscitado no Jogo do Abate para lutar contra Sukuna"
      }
    ]
  },
  {
    "id": "exc-jjk-22-yorozu",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Técnica da Construção (Criação de Matéria com Esfera Perfeita)",
    "badgeTitle": "Técnica Inata de Síntese Material",
    "targetCharacterId": "yorozu",
    "targetCharacterName": "Yorozu",
    "validCharacterIds": [
      "yorozu",
      "mai-zenin"
    ],
    "clues": [
      {
        "label": "Criação a Partir do Nada",
        "value": "Cria qualquer substância física do zero, exceto armas amaldiçoadas de grau especial"
      },
      {
        "label": "Armadura de Inseto Metálico",
        "value": "Desenvolveu uma couraça biônica inspirada em insetos pré-históricos de alta mobilidade"
      },
      {
        "label": "Esfera Perfeita (True Sphere)",
        "value": "Esfera matemática perfeita sem área de contato que exerce pressão infinita ao toque"
      }
    ]
  },
  {
    "id": "exc-jjk-23-mei-mei",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Manipulação de Pássaros (Bird Strike)",
    "badgeTitle": "Técnica Inata de Corvos Suicidas",
    "targetCharacterId": "mei-mei",
    "targetCharacterName": "Mei Mei",
    "validCharacterIds": [
      "mei-mei"
    ],
    "clues": [
      {
        "label": "Pacto de Morte dos Corvos",
        "value": "Força corvos a cometerem suicídio removendo seu limite de energia num projétil devastador"
      },
      {
        "label": "Machado Gigante de Batalha",
        "value": "Empunha um pesado machado medieval com força e agilidade surpreendentes"
      },
      {
        "label": "Sobrevivência Única de Gojo",
        "value": "Afirma que Satoru Gojo foi a única pessoa viva a sobreviver ao impacto de um Bird Strike"
      }
    ]
  },
  {
    "id": "exc-jjk-24-yuji-itadori",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Black Flash (Kokusen / Clarão Negro)",
    "badgeTitle": "Fenômeno Supremo de Impacto Amaldiçoado",
    "targetCharacterId": "yuji-itadori",
    "targetCharacterName": "Yuji Itadori",
    "validCharacterIds": [
      "yuji-itadori",
      "satoru-gojo",
      "kento-nanami",
      "aoi-todo",
      "nobara-kugisaki",
      "ryomen-sukuna"
    ],
    "clues": [
      {
        "label": "Distorção Espacial no Impacto",
        "value": "Ocorre quando a energia amaldiçoada colide em um milionésimo de segundo após o soco"
      },
      {
        "label": "Poder Elevado à Potência de 2.5",
        "value": "Multiplica a força destrutiva do golpe exponencialmente criando faíscas negras"
      },
      {
        "label": "Estado da Zona (The Zone)",
        "value": "Coloca o feiticeiro num estado mental sublime onde manipular energia fica tão natural quanto respirar"
      }
    ]
  },
  {
    "id": "exc-jjk-25-nobara-kugisaki",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Ressonância e Grampo de Palha (Straw Doll Technique)",
    "badgeTitle": "Técnica Inata de Maldição Vodu",
    "targetCharacterId": "nobara-kugisaki",
    "targetCharacterName": "Nobara Kugisaki",
    "validCharacterIds": [
      "nobara-kugisaki"
    ],
    "clues": [
      {
        "label": "Conexão Espiritual Vodu",
        "value": "Crava pregos imbuídos de energia num boneco de palha ou membro decepado atingindo o corpo real"
      },
      {
        "label": "Técnica Hairpin (Grampo)",
        "value": "Detona pregos fincados em objetos ou terreno circundante como minas explosivas"
      },
      {
        "label": "Dano na Alma de Mahito",
        "value": "Uma das raras técnicas capazes de atingir diretamente a alma de Mahito causando-lhe dor real"
      }
    ]
  },
  {
    "id": "exc-jjk-26-ryomen-sukuna",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Técnica das Chamas / Fuga (Open / Kamino)",
    "badgeTitle": "Técnica Oculta das Forjas de Fogo",
    "targetCharacterId": "ryomen-sukuna",
    "targetCharacterName": "Ryomen Sukuna",
    "validCharacterIds": [
      "ryomen-sukuna"
    ],
    "clues": [
      {
        "label": "Comando Sagrado Aberto",
        "value": "Pronuncia a palavra Abrir (Fuga) para manifestar uma flecha colossal de chamas puras"
      },
      {
        "label": "Destruição de Mahoraga e Jogo",
        "value": "Usada para carbonizar instantaneamente a maldição de fogo Jogo e o General Mahoraga em Shibuya"
      },
      {
        "label": "Combustão Termobárica",
        "value": "Desperta uma onda de choque termobárica devastadora alimentada pelos detritos dos cortes do domínio"
      }
    ]
  },
  {
    "id": "exc-jjk-27-kenjaku",
    "animeSlug": "jujutsu-kaisen",
    "category": "Técnicas & Domínios",
    "questionTitle": "A quem pertence esta técnica ou Expansão de Domínio?",
    "targetTitle": "Anti-Gravity System (Sistema Antigravidade Revertido)",
    "badgeTitle": "Técnica Inata Gravitacional Herdada",
    "targetCharacterId": "kenjaku",
    "targetCharacterName": "Kenjaku",
    "validCharacterIds": [
      "kenjaku",
      "kaori-itadori"
    ],
    "clues": [
      {
        "label": "Origem de Kaori Itadori",
        "value": "Técnica pertencente ao corpo da mãe de Yuji Itadori roubado por Kenjaku no passado"
      },
      {
        "label": "Técnica Reversa Gravitacional",
        "value": "Ao aplicar a energia reversa, transformou a antigravidade numa força esmagadora de gravidade pesada"
      },
      {
        "label": "Sobrevivência ao Buraco Negro",
        "value": "Usou seu próprio corpo como domínio para sobreviver ao buraco negro criado por Yuki Tsukumo"
      }
    ]
  },
  {
    "id": "exc-ds-1-giyu-tomioka",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração da Água (Water Breathing)",
    "badgeTitle": "Respiração Elemental Básica",
    "targetCharacterId": "giyu-tomioka",
    "targetCharacterName": "Giyu Tomioka",
    "validCharacterIds": [
      "giyu-tomioka",
      "tanjiro-kamado-human",
      "sakonji-urokodaki",
      "sabito",
      "makomo",
      "murata"
    ],
    "clues": [
      {
        "label": "Onze Formas",
        "value": "Possui 10 formas clássicas ensinadas por Urokodaki e a Décima Primeira Forma (Calmaria) criada por Giyu"
      },
      {
        "label": "Fluidez e Adaptação",
        "value": "Estilo de esgrima flexível que se adapta suavemente a qualquer postura e terreno"
      },
      {
        "label": "Mestre da Máscara de Tengu",
        "value": "Ensinada pelo ex-Hashira Sakonji Urokodaki na montanha Sagiri"
      }
    ]
  },
  {
    "id": "exc-ds-2-tanjiro-kamado-human",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Hinokami Kagura / Respiração do Sol (Sun Breathing)",
    "badgeTitle": "Respiração Primordial de Todas as Respirações",
    "targetCharacterId": "tanjiro-kamado-human",
    "targetCharacterName": "Tanjiro Kamado (Caçador)",
    "validCharacterIds": [
      "tanjiro-kamado-human",
      "tanjiro-kamado-demon-king",
      "yoriichi-tsugikuni",
      "tanjuro-kamado"
    ],
    "clues": [
      {
        "label": "Origem Histórica",
        "value": "A respiração original criada pelo lendário espadachim Yoriichi Tsugikuni na Era Sengoku"
      },
      {
        "label": "Dança Ritual da Família",
        "value": "Passada de pai para filho na família Kamado como uma dança sagrada de Ano Novo"
      },
      {
        "label": "Treze Formas Contínuas",
        "value": "A décima terceira forma consiste em encadear os 12 movimentos em um ciclo perpétuo contra Muzan"
      }
    ]
  },
  {
    "id": "exc-ds-3-kyojuro-rengoku",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração da Chama (Flame Breathing)",
    "badgeTitle": "Respiração das Chamas Apaixonadas",
    "targetCharacterId": "kyojuro-rengoku",
    "targetCharacterName": "Kyojuro Rengoku",
    "validCharacterIds": [
      "kyojuro-rengoku",
      "shinjuro-rengoku"
    ],
    "clues": [
      {
        "label": "Nona Forma Rengoku",
        "value": "Investida avassaladora de poder destrutivo que rasga o solo criando um dragão de fogo"
      },
      {
        "label": "Linhagem de Hashiras",
        "value": "Praticada por gerações sucessivas de guerreiros de coração fervoroso do clã Rengoku"
      },
      {
        "label": "Batalha do Trem Infinito",
        "value": "Lutou com bravura feroz contra a Lua Superior Três Akaza protegendo 200 passageiros"
      }
    ]
  },
  {
    "id": "exc-ds-4-zenitsu-agatsuma",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração do Trovão (Thunder Breathing)",
    "badgeTitle": "Respiração de Velocidade Relâmpago",
    "targetCharacterId": "zenitsu-agatsuma",
    "targetCharacterName": "Zenitsu Agatsuma",
    "validCharacterIds": [
      "zenitsu-agatsuma",
      "jigoro-kuwajima",
      "kaigaku-human",
      "kaigaku-demon"
    ],
    "clues": [
      {
        "label": "Primeira Forma Iaijutsu",
        "value": "Hekireki Issen: velocidade fulminante sacando e guardando a espada num piscar de olhos"
      },
      {
        "label": "Sétima Forma Honoikazuchi no Kami",
        "value": "Criada exclusivamente por Zenitsu para derrotar seu antigo colega de treino Kaigaku"
      },
      {
        "label": "Atingido por Raio",
        "value": "Zenitsu teve seus cabelos tingidos de loiro após ser atingido por um raio de verdade numa árvore"
      }
    ]
  },
  {
    "id": "exc-ds-5-inosuke-hashibira",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração da Besta (Beast Breathing)",
    "badgeTitle": "Respiração Selvagem Autodidata",
    "targetCharacterId": "inosuke-hashibira",
    "targetCharacterName": "Inosuke Hashibira",
    "validCharacterIds": [
      "inosuke-hashibira"
    ],
    "clues": [
      {
        "label": "Espadas Denteadas",
        "value": "Usa duas katanas Nichirin com lâminas deliberadamente lascadas para rasgar a carne dos demônios"
      },
      {
        "label": "Sentido Espacial de Radar",
        "value": "Sensibilidade tátil sobre-humana na pele capaz de localizar demônios a quilômetros de distância"
      },
      {
        "label": "Criado por Javalis",
        "value": "Desenvolveu o estilo sozinho sobrevivendo nas montanhas selvagens com uma máscara de javali"
      }
    ]
  },
  {
    "id": "exc-ds-6-shinobu-kocho",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração do Inseto (Insect Breathing)",
    "badgeTitle": "Respiração de Estocada Venenosa",
    "targetCharacterId": "shinobu-kocho",
    "targetCharacterName": "Shinobu Kocho",
    "validCharacterIds": [
      "shinobu-kocho"
    ],
    "clues": [
      {
        "label": "Veneno de Glicínia",
        "value": "Substitui a força física de decapitação por perfurações rápidas injetando veneno de glicínia mortal"
      },
      {
        "label": "Ponta de Agulha",
        "value": "Lâmina modificada sem fio central terminando em uma ponta fina como ferrão de abelha"
      },
      {
        "label": "Dança das Borboletas",
        "value": "Movimentos graciosos que mimetizam borboletas, libélulas e centopeias"
      }
    ]
  },
  {
    "id": "exc-ds-7-muichiro-tokito",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração da Névoa (Mist Breathing)",
    "badgeTitle": "Respiração de Ilusão e Ocultamento",
    "targetCharacterId": "muichiro-tokito",
    "targetCharacterName": "Muichiro Tokito",
    "validCharacterIds": [
      "muichiro-tokito"
    ],
    "clues": [
      {
        "label": "Sétima Forma Oboro (Névoa Oculta)",
        "value": "Muda bruscamente o ritmo dos passos entre lentidão e arrancada súbita desorientando o oponente"
      },
      {
        "label": "Hashira Prodígio",
        "value": "Tornou-se Hashira em apenas dois meses após empunhar uma espada pela primeira vez"
      },
      {
        "label": "Descendente de Kokushibo",
        "value": "Linhagem de sangue descendente da família de espadachins Tsugikuni da Era Sengoku"
      }
    ]
  },
  {
    "id": "exc-ds-8-mitsuri-kanroji",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração do Amor (Love Breathing)",
    "badgeTitle": "Respiração de Agilidade Acrobática",
    "targetCharacterId": "mitsuri-kanroji",
    "targetCharacterName": "Mitsuri Kanroji",
    "validCharacterIds": [
      "mitsuri-kanroji"
    ],
    "clues": [
      {
        "label": "Espada em Fita Maleável",
        "value": "Empunha uma katana Nichirin tão fina e elástica que chicoteia como uma fita de ginástica rítmica"
      },
      {
        "label": "Densidade Muscular Óctupla",
        "value": "Possui constituição física com músculos 8 vezes mais densos que o normal humano"
      },
      {
        "label": "Treinada por Rengoku",
        "value": "Derivou seu estilo próprio após treinar sob a tutela de Kyojuro Rengoku"
      }
    ]
  },
  {
    "id": "exc-ds-9-obanai-iguro",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração da Serpente (Serpent Breathing)",
    "badgeTitle": "Respiração Ondulante Sinuosa",
    "targetCharacterId": "obanai-iguro",
    "targetCharacterName": "Obanai Iguro",
    "validCharacterIds": [
      "obanai-iguro"
    ],
    "clues": [
      {
        "label": "Lâmina Ondulada Kris",
        "value": "Espada de formato serpentino que desfere cortes curvos contornando qualquer bloqueio"
      },
      {
        "label": "Serpente Kaburamaru",
        "value": "Luta auxiliado por sua serpente branca que guia seus olhos cegados pelo veneno"
      },
      {
        "label": "Amor por Mitsuri",
        "value": "Jurou renascer em um mundo sem demônios para declarar seu amor à Hashira do Amor"
      }
    ]
  },
  {
    "id": "exc-ds-10-sanemi-shinazugawa",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração do Vento (Wind Breathing)",
    "badgeTitle": "Respiração de Ventanias Cortantes Ferozes",
    "targetCharacterId": "sanemi-shinazugawa",
    "targetCharacterName": "Sanemi Shinazugawa",
    "validCharacterIds": [
      "sanemi-shinazugawa"
    ],
    "clues": [
      {
        "label": "Garras de Ventania",
        "value": "Cortes acrobáticos ferozes que arremessam lâminas de ar pressurizado a distância"
      },
      {
        "label": "Sangue Raro Marechi",
        "value": "Possui sangue inebriante extremamente raro que embriaga e desorienta demônios no ar"
      },
      {
        "label": "Cicatrizes no Corpo",
        "value": "Corpo coberto de cicatrizes de combate feroz contra criaturas da noite"
      }
    ]
  },
  {
    "id": "exc-ds-11-gyomei-himejima",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração da Pedra (Stone Breathing)",
    "badgeTitle": "Respiração de Força Terrena Monumental",
    "targetCharacterId": "gyomei-himejima",
    "targetCharacterName": "Gyomei Himejima",
    "validCharacterIds": [
      "gyomei-himejima"
    ],
    "clues": [
      {
        "label": "Mangual e Machado com Corrente",
        "value": "Não usa katanas; empunha um pesado machado e mangual pontiagudo ligados por corrente de aço puro"
      },
      {
        "label": "Hashira Mais Forte",
        "value": "Reconhecido unanimemente pelos companheiros e por Muzan como o Caçador mais poderoso"
      },
      {
        "label": "Cegueira Espiritual",
        "value": "Guerreiro cego que enxerga o Mundo Transparente guiado pelos sons das correntes"
      }
    ]
  },
  {
    "id": "exc-ds-12-tengen-uzui",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração do Som (Sound Breathing)",
    "badgeTitle": "Respiração de Ritmo e Partitura",
    "targetCharacterId": "tengen-uzui",
    "targetCharacterName": "Tengen Uzui",
    "validCharacterIds": [
      "tengen-uzui"
    ],
    "clues": [
      {
        "label": "Espadas Duplas com Corrente",
        "value": "Duas espadas colossais unidas por corrente com bombas de pólvora de alta potência"
      },
      {
        "label": "Técnica da Partitura Musical",
        "value": "Lê os hábitos de ataque do inimigo como notas musicais para contra-atacar em ritmo perfeito"
      },
      {
        "label": "Ex-Ninja Shinobi",
        "value": "Autoproclamado Deus dos Festivais que possui três esposas kunoichi leais"
      }
    ]
  },
  {
    "id": "exc-ds-13-kokushibo",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração da Lua (Moon Breathing)",
    "badgeTitle": "Respiração Proibida dos Demônios",
    "targetCharacterId": "kokushibo",
    "targetCharacterName": "Kokushibo",
    "validCharacterIds": [
      "kokushibo"
    ],
    "clues": [
      {
        "label": "Lâminas Crescentes Caóticas",
        "value": "Desfere dezenas de lâminas em meia-lua que mudam constantemente de tamanho e trajetória"
      },
      {
        "label": "Espada de Carne e Olhos",
        "value": "Empunha a espada Kyokokukamusari forjada a partir de sua própria carne e sangue"
      },
      {
        "label": "Lua Superior Um",
        "value": "Irmão gêmeo de Yoriichi Tsugikuni que serviu a Muzan por mais de quatro séculos"
      }
    ]
  },
  {
    "id": "exc-ds-14-rui",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu de Fios de Sangue Cortantes",
    "badgeTitle": "Arte Demoníaca Aracnídea",
    "targetCharacterId": "rui",
    "targetCharacterName": "Rui",
    "validCharacterIds": [
      "rui"
    ],
    "clues": [
      {
        "label": "Teias de Aço Carmesim",
        "value": "Fios endurecidos com sangue capazes de fatiar lâminas Nichirin comuns ao toque"
      },
      {
        "label": "Família Falsa da Montanha Natagumo",
        "value": "Impunha papéis familiares cruéis a outros demônios sob ameaça de tortura"
      },
      {
        "label": "Lua Inferior Cinco",
        "value": "Primeiro membro dos Doze Kizuki que forçou Tanjiro a despertar o Hinokami Kagura"
      }
    ]
  },
  {
    "id": "exc-ds-15-akaza",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu da Morte Destrutiva (Agulha de Bússola)",
    "badgeTitle": "Arte Demoníaca Marcial Marcial Soryu",
    "targetCharacterId": "akaza",
    "targetCharacterName": "Akaza",
    "validCharacterIds": [
      "akaza"
    ],
    "clues": [
      {
        "label": "Detecção do Espírito de Luta",
        "value": "Bússola de flocos de neve que rastreia a intenção assassina de qualquer oponente"
      },
      {
        "label": "Ondas de Choque com os Punhos",
        "value": "Dispara ondas de impacto destruidoras no ar através de socos marciais vazios"
      },
      {
        "label": "Lua Superior Três",
        "value": "Demônio obcecado pela força que se recusava estritamente a matar ou devorar mulheres"
      }
    ]
  },
  {
    "id": "exc-ds-16-doma",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu de Gelo e Lótus Congelante",
    "badgeTitle": "Arte Demoníaca Criogênica",
    "targetCharacterId": "doma",
    "targetCharacterName": "Doma",
    "validCharacterIds": [
      "doma"
    ],
    "clues": [
      {
        "label": "Pó de Gelo Necrosante",
        "value": "Pó gélido que destrói os alvéolos pulmonares de qualquer caçador que respire o ar"
      },
      {
        "label": "Leques Dourados Afiados",
        "value": "Empunha dois leques de ouro maciço para dispersar técnicas de lótus de gelo"
      },
      {
        "label": "Lua Superior Dois",
        "value": "Líder do Culto do Paraíso Eterno desprovido de qualquer emoção humana genuína"
      }
    ]
  },
  {
    "id": "exc-ds-17-gyokko",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu dos Vasos e Criaturas Marinhas",
    "badgeTitle": "Arte Demoníaca Artística Grotesca",
    "targetCharacterId": "gyokko",
    "targetCharacterName": "Gyokko",
    "validCharacterIds": [
      "gyokko"
    ],
    "clues": [
      {
        "label": "Teletransporte entre Vasos",
        "value": "Surge e desaparece instantaneamente entre potes de porcelana espalhados no campo"
      },
      {
        "label": "Prisão de Água Asfixiante",
        "value": "Prende caçadores em esferas d'água impenetráveis para sufocar a respiração"
      },
      {
        "label": "Lua Superior Cinco",
        "value": "Monstro com bocas no lugar de olhos que atacou a Vila dos Ferreiros"
      }
    ]
  },
  {
    "id": "exc-ds-18-gyutaro",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu das Foices de Sangue e Veneno",
    "badgeTitle": "Arte Demoníaca de Lâminas Sangrentas",
    "targetCharacterId": "gyutaro",
    "targetCharacterName": "Gyutaro",
    "validCharacterIds": [
      "gyutaro",
      "daki"
    ],
    "clues": [
      {
        "label": "Foices de Sangue Curvas",
        "value": "Lâminas de sangue tóxico impregnadas de veneno mortal e mortalidade imediata"
      },
      {
        "label": "Vidas Conectadas",
        "value": "Só pode ser morto se for decapitado simultaneamente com sua irmã Daki"
      },
      {
        "label": "Verdadeira Lua Superior Seis",
        "value": "Irmão protetor do Distrito do Entretenimento que vivia escondido dentro do corpo de Daki"
      }
    ]
  },
  {
    "id": "exc-ds-19-daki",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu das Faixas de Obi Voadoras",
    "badgeTitle": "Arte Demoníaca Têxtil Ocultadora",
    "targetCharacterId": "daki",
    "targetCharacterName": "Daki",
    "validCharacterIds": [
      "daki",
      "gyutaro"
    ],
    "clues": [
      {
        "label": "Faixas de Seda Cortantes",
        "value": "Faixas de pano afiadas como lâminas que armazenam pessoas vivas em seu interior"
      },
      {
        "label": "Disfarce de Oiran Warabihime",
        "value": "Cortesã de elite mais famosa do Distrito da Luz Vermelha em Yoshiwara"
      },
      {
        "label": "Terceiro Olho de Gyutaro",
        "value": "Recebeu o terceiro olho na testa para ser controlada nos reflexos por seu irmão"
      }
    ]
  },
  {
    "id": "exc-ds-20-nakime",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu do Castelo Infinito (Espaço Fortaleza)",
    "badgeTitle": "Arte Demoníaca Espaço-Temporal",
    "targetCharacterId": "nakime",
    "targetCharacterName": "Nakime",
    "validCharacterIds": [
      "nakime"
    ],
    "clues": [
      {
        "label": "Toque da Biwa",
        "value": "Tocar as cordas de seu instrumento musical biwa manipula a gravidade e salas do castelo"
      },
      {
        "label": "Olho Único Rastreador",
        "value": "Envia globos oculares independentes por todo o Japão para espionar a sede dos Caçadores"
      },
      {
        "label": "Nova Lua Superior Quatro",
        "value": "Promovida por Muzan Kibutsuji após a morte de Hantengu na Vila dos Ferreiros"
      }
    ]
  },
  {
    "id": "exc-ds-21-enmu",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu dos Sonhos Forçados e Hipnose",
    "badgeTitle": "Arte Demoníaca Onírica",
    "targetCharacterId": "enmu",
    "targetCharacterName": "Enmu",
    "validCharacterIds": [
      "enmu"
    ],
    "clues": [
      {
        "label": "Sono Hipo-Induzido",
        "value": "Mergulha vítimas em sonhos doces para destruir seus núcleos espirituais enquanto dormem"
      },
      {
        "label": "Fusão com a Locomotiva",
        "value": "Fundiu sua carne ao trem a vapor inteiro transformando os vagões em seu próprio corpo"
      },
      {
        "label": "Lua Inferior Um",
        "value": "Único demônio inferior poupado por Muzan no massacre da reunião de demônios"
      }
    ]
  },
  {
    "id": "exc-ds-22-kanao-tsuyuri",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração da Flor (Flower Breathing)",
    "badgeTitle": "Respiração Graciosa das Flores",
    "targetCharacterId": "kanao-tsuyuri",
    "targetCharacterName": "Kanao Tsuyuri",
    "validCharacterIds": [
      "kanao-tsuyuri"
    ],
    "clues": [
      {
        "label": "Olhos Escarlates Equinos (Higan Shugan)",
        "value": "Concentra o fluxo sanguíneo nos olhos aumentando a percepção cinética ao ponto de enxergar tudo em câmera lenta"
      },
      {
        "label": "Risco de Cegueira",
        "value": "A pressão sanguínea extrema nos vasos oculares pode levar à cegueira permanente se usada por muito tempo"
      },
      {
        "label": "Vingança de Shinobu",
        "value": "Usada por Kanao Tsuyuri para desferir o corte final decisivo que decapitou a Lua Superior Dois Doma"
      }
    ]
  },
  {
    "id": "exc-ds-23-nezuko-kamado-human",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu de Sangue Explosivo (Bakketsu)",
    "badgeTitle": "Arte Demoníaca Ígnea Anti-Demônio",
    "targetCharacterId": "nezuko-kamado-human",
    "targetCharacterName": "Nezuko Kamado (Humana)",
    "validCharacterIds": [
      "nezuko-kamado-human",
      "nezuko-kamado-demon"
    ],
    "clues": [
      {
        "label": "Chamas Rosas Puras",
        "value": "Chamas ardentes cor de rosa que queimam e incineram exclusivamente outros demônios sem ferir humanos"
      },
      {
        "label": "Lâmina Nichirin Vermelha",
        "value": "Banha a espada de Tanjiro com seu sangue em chamas para despertar a lendária espada vermelha"
      },
      {
        "label": "Cura de Venenos Demoníacos",
        "value": "Queimou e neutralizou completamente o veneno letal de Gyutaro salvando a vida de Inosuke e Tengen"
      }
    ]
  },
  {
    "id": "exc-ds-24-yahaba",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu das Flechas Direcionais (Kouketsu)",
    "badgeTitle": "Arte Demoníaca de Vetores Invisíveis",
    "targetCharacterId": "yahaba",
    "targetCharacterName": "Yahaba",
    "validCharacterIds": [
      "yahaba"
    ],
    "clues": [
      {
        "label": "Flechas Vetoriais nas Mãos",
        "value": "Olhos desenhados nas palmas das mãos que disparam vetores cinéticos invisíveis aos olhos comuns"
      },
      {
        "label": "Manipulação de Trajetória",
        "value": "Altera violentamente a trajetória de espadas, corpos e objetos arremessando-os contra paredes"
      },
      {
        "label": "Dupla em Asakusa",
        "value": "Enviado por Muzan junto com Susamaru para assassinar Tanjiro Kamado em Tóquio"
      }
    ]
  },
  {
    "id": "exc-ds-25-susamaru",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu das Bolas de Temari Pesadas",
    "badgeTitle": "Arte Demoníaca Balística de Seis Braços",
    "targetCharacterId": "susamaru",
    "targetCharacterName": "Susamaru",
    "validCharacterIds": [
      "susamaru"
    ],
    "clues": [
      {
        "label": "Bolas de Handebol Destrutivas",
        "value": "Arremessa bolas de brinquedo temari tão pesadas e velozes que arrancam membros e destroem casas"
      },
      {
        "label": "Seis Braços Musculosos",
        "value": "Brota quatro braços adicionais do tronco para rebater múltiplas bolas com precisão mortal"
      },
      {
        "label": "Morte pela Maldição de Muzan",
        "value": "Foi destruída de dentro para fora pelas células de Muzan ao pronunciar o nome dele em voz alta"
      }
    ]
  },
  {
    "id": "exc-ds-26-kyogai",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Kekkijutsu dos Tambores de Rotação da Mansão",
    "badgeTitle": "Arte Demoníaca Acústica e Gravitacional",
    "targetCharacterId": "kyogai",
    "targetCharacterName": "Kyogai",
    "validCharacterIds": [
      "kyogai"
    ],
    "clues": [
      {
        "label": "Tambores Tsuzumi no Corpo",
        "value": "Batidas nos tambores embutidos em seu peito e ombros giram as salas da mansão em 90 graus"
      },
      {
        "label": "Garras de Vento Cortante",
        "value": "Bater no tambor central do peito dispara três lâminas de ar pressurizado através do cômodo"
      },
      {
        "label": "Ex-Lua Inferior Seis",
        "value": "Perdeu seu número e foi rebaixado por Muzan Kibutsuji por ter atingido seu limite de força"
      }
    ]
  },
  {
    "id": "exc-ds-27-muzan-kibutsuji",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Regeneração e Controle Celular Biológico Absoluto",
    "badgeTitle": "Progenitor e Rei de Todos os Demônios",
    "targetCharacterId": "muzan-kibutsuji",
    "targetCharacterName": "Muzan Kibutsuji",
    "validCharacterIds": [
      "muzan-kibutsuji"
    ],
    "clues": [
      {
        "label": "Sete Corações e Cinco Cérebros",
        "value": "Possui uma anatomia monstruosa com 7 corações pulsantes e 5 cérebros independentes móveis"
      },
      {
        "label": "Chicotes de Carne e Mandíbulas",
        "value": "Brota dezenas de tentáculos espinhosos com bocas vorazes das costas e pernas com alcance devastador"
      },
      {
        "label": "Sangue de Transformação",
        "value": "Seu sangue puro é a única substância capaz de transformar seres humanos comuns em demônios da noite"
      }
    ]
  },
  {
    "id": "exc-ds-28-giyu-tomioka",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração da Água: Décima Primeira Forma - Calmaria (Nagi)",
    "badgeTitle": "Criação Exclusiva de Hashira",
    "targetCharacterId": "giyu-tomioka",
    "targetCharacterName": "Giyu Tomioka",
    "validCharacterIds": [
      "giyu-tomioka"
    ],
    "clues": [
      {
        "label": "Quietude Absoluta da Água",
        "value": "O espadachim entra em um estado de calma espiritual onde qualquer ataque inimigo é dissipado sem efeito"
      },
      {
        "label": "Anulação Total de Fios",
        "value": "Cortou todas as teias de sangue reforçadas de Rui num piscar de olhos sem mover os pés"
      },
      {
        "label": "Feito Único do Pilar da Água",
        "value": "Uma forma inédita que não existia nos pergaminhos originais ensinados por Urokodaki"
      }
    ]
  },
  {
    "id": "exc-ds-29-shinjuro-rengoku",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Respiração das Chamas: Segunda Forma - Sol Poente Ascendente",
    "badgeTitle": "Estilo Herdado da Família Rengoku",
    "targetCharacterId": "shinjuro-rengoku",
    "targetCharacterName": "Shinjuro Rengoku",
    "validCharacterIds": [
      "shinjuro-rengoku",
      "kyojuro-rengoku"
    ],
    "clues": [
      {
        "label": "Corte Vertical Ascendente",
        "value": "Um arco de fogo vertical fulminante desferido de baixo para cima com potência devastadora"
      },
      {
        "label": "Antigo Hashira das Chamas",
        "value": "Pai de Kyojuro e ex-Hashira que abandonou o posto após a trágica morte de sua esposa Ruka"
      },
      {
        "label": "Proteção do Quartel-General",
        "value": "Retomou sua espada para proteger a nova liderança da família Ubuyashiki na batalha final"
      }
    ]
  },
  {
    "id": "exc-ds-30-tanjiro-kamado-human",
    "animeSlug": "demon-slayer",
    "category": "Árvore das Respirações & Kekkijutsu",
    "questionTitle": "A quem pertence esta Respiração ou Kekkijutsu?",
    "targetTitle": "Lâmina Carmesim Nichirin (Red Nichirin Blade)",
    "badgeTitle": "Poder Máximo dos Caçadores de Demônios",
    "targetCharacterId": "tanjiro-kamado-human",
    "targetCharacterName": "Tanjiro Kamado (Caçador)",
    "validCharacterIds": [
      "tanjiro-kamado-human",
      "tanjiro-kamado-demon-king",
      "yoriichi-tsugikuni",
      "giyu-tomioka",
      "sanemi-shinazugawa",
      "muichiro-tokito",
      "obanai-iguro",
      "gyomei-himejima"
    ],
    "clues": [
      {
        "label": "Inibição Celular de Demônios",
        "value": "Ao ficar incandescente e vermelha, queima as células dos demônios impedindo sua regeneração instantânea"
      },
      {
        "label": "Pressão Extrema ou Colisão",
        "value": "Despertada segurando a empunhadura com força descomunal ou chocando duas espadas com intensidade sísmica"
      },
      {
        "label": "Pesadelo de Muzan",
        "value": "A mesma cor que a lâmina de Yoriichi Tsugikuni possuía ao cortar Muzan no passado"
      }
    ]
  }
];

export function getChallengesForAnime(animeSlug: string): ExclusiveChallenge[] {
  return EXCLUSIVE_CHALLENGES.filter(c => c.animeSlug === animeSlug);
}
