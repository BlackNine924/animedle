import fs from 'fs';

const filePath = 'src/data/exclusiveChallenges.ts';
let content = fs.readFileSync(filePath, 'utf8');

const NEW_CHALLENGES = [
  {
    id: "exc-ds-respiracao-agua-geral",
    animeSlug: "demon-slayer",
    category: "Árvore das Respirações",
    questionTitle: "Quem domina esta técnica primordial das cinco respirações básicas?",
    targetTitle: "Respiração da Água (Mizu no Kokyū)",
    badgeTitle: "Cinco Respirações Básicas",
    targetCharacterId: "tanjiro-kamado",
    targetCharacterName: "Tanjiro Kamado",
    validCharacterIds: ["tanjiro-kamado", "giyu-tomioka", "sakonji-urokodaki", "sabito", "makomo", "murata"],
    clues: [
      {
        "label": "Flexibilidade e Adaptabilidade",
        "value": "Respiração conhecida por fluir como água e ser a mais fácil de ser aprendida por novatos"
      },
      {
        "label": "Mestre Cultivador Famoso",
        "value": "Sakonji Urokodaki (ex-Hashira da Água na Montanha Sagiri)"
      },
      {
        "label": "Posturas Clássicas",
        "value": "1ª Forma: Corte da Superfície da Água e 10ª Forma: Dragão da Mudança Constante"
      }
    ],
    contextExplanation: "A Respiração da Água é utilizada por Tanjiro, Giyu Tomioka, Sakonji Urokodaki, Sabito e Makomo, sendo a mais versátil do esquadrão."
  },
  {
    id: "exc-ds-respiracao-trovao-zenitsu",
    animeSlug: "demon-slayer",
    category: "Árvore das Respirações",
    questionTitle: "Quem utiliza a velocidade fulminante desta respiração elétrica?",
    targetTitle: "Respiração do Trovão: Primeira Forma - Lampejo e Trovão",
    badgeTitle: "Velocidade Extrema",
    targetCharacterId: "zenitsu-agatsuma",
    targetCharacterName: "Zenitsu Agatsuma",
    validCharacterIds: ["zenitsu-agatsuma", "kaigaku", "jigoro-kuwajima"],
    clues: [
      {
        "label": "Foco Físico",
        "value": "Concentra todo o oxigênio e força nas pernas para arranques em velocidade hipersônica"
      },
      {
        "label": "Mestre Cultivador",
        "value": "Jigoro Kuwajima (antigo Pilar do Rugido / Trovão)"
      },
      {
        "label": "Variações Notáveis",
        "value": "Seis Dobras (Rokuren), Oito Dobras, Velocidade de Deus e a 7ª Forma criada por ele"
      }
    ],
    contextExplanation: "Zenitsu dominou a 1ª Forma à perfeição absoluta, enquanto Kaigaku dominou da 2ª à 6ª forma e Kuwajima ensinou ambos."
  },
  {
    id: "exc-ds-hinokami-kagura-sol",
    animeSlug: "demon-slayer",
    category: "Árvore das Respirações",
    questionTitle: "A quem pertence esta dança sagrada de respiração original?",
    targetTitle: "Dança do Deus do Fogo (Hinokami Kagura / Respiração do Sol)",
    badgeTitle: "Respiração Original Primordial",
    targetCharacterId: "tanjiro-kamado",
    targetCharacterName: "Tanjiro Kamado",
    validCharacterIds: ["tanjiro-kamado", "yoriichi-tsugikuni", "tanjuro-kamado"],
    clues: [
      {
        "label": "Origem Histórica",
        "value": "A respiração primordial da Era Sengoku da qual todas as outras foram derivadas"
      },
      {
        "label": "Tradição Familiar",
        "value": "Transmitida de pai para filho através de brincos Hanafuda e uma dança ritualística no Ano Novo"
      },
      {
        "label": "Efeito Contra Demônios",
        "value": "Queima a nível celular impedindo totalmente a regeneração dos demônios e Muzan"
      }
    ],
    contextExplanation: "Criada por Yoriichi Tsugikuni e preservada pela família Kamado através de Tanjuro e Tanjiro como Hinokami Kagura."
  },
  {
    id: "exc-ds-respiracao-chamas-rengoku",
    animeSlug: "demon-slayer",
    category: "Árvore das Respirações",
    questionTitle: "Quem empunha o fervor inabalável da nona postura desta respiração?",
    targetTitle: "9ª Forma da Respiração das Chamas: Purgatório (Rengoku)",
    badgeTitle: "Chamas Ardentes",
    targetCharacterId: "kyojuro-rengoku",
    targetCharacterName: "Kyojuro Rengoku",
    validCharacterIds: ["kyojuro-rengoku", "shinjuro-rengoku"],
    clues: [
      {
        "label": "Linhagem dos Pilares",
        "value": "Transmitida pela família Rengoku há gerações de Hashiras das Chamas"
      },
      {
        "label": "Golpe Supremo",
        "value": "Um golpe devastador que rasga o solo e envolve o usuário em um turbilhão de fogo em forma de dragão"
      },
      {
        "label": "Citação Famosa",
        "value": "\"Aqueça seu coração! Se você se curvar e abaixar a cabeça, o tempo não esperará por você.\""
      }
    ],
    contextExplanation: "Kyojuro Rengoku executou a técnica proibida 'Rengoku' no clímax da batalha contra o Lua Superior Três Akaza no Trem do Infinito."
  },
  {
    id: "exc-ds-nevoa-oboro-muichiro",
    animeSlug: "demon-slayer",
    category: "Árvore das Respirações",
    questionTitle: "Quem criou a sétima postura ilusória desta respiração veloz?",
    targetTitle: "7ª Forma da Respiração da Névoa: Nuvens Obscuras (Oboro)",
    badgeTitle: "Mestre Prodígio",
    targetCharacterId: "muichiro-tokito",
    targetCharacterName: "Muichiro Tokito",
    validCharacterIds: ["muichiro-tokito"],
    clues: [
      {
        "label": "Título de Hashira",
        "value": "Pilar da Névoa que se tornou Hashira com apenas dois meses de treinamento"
      },
      {
        "label": "Efeito Visual Ilusório",
        "value": "Alterna entre movimentos extremamente lentos e acelerações súbitas como névoa densa"
      },
      {
        "label": "Confronto Decisivo",
        "value": "Decapitou Gyokko (Lua Superior 5) sozinho na Vila dos Ferreiros"
      }
    ],
    contextExplanation: "Muichiro Tokito criou Oboro sozinho para desorientar completamente os sentidos do inimigo antes de cortar sua cabeça."
  },
  {
    id: "exc-mha-one-for-all-allmight-deku",
    animeSlug: "my-hero-academia",
    category: "Individualidades Heróicas",
    questionTitle: "Quem é o portador desta Individualidade de acúmulo de poder sagrado?",
    targetTitle: "One For All (OFA)",
    badgeTitle: "Individualidade Acumuladora",
    targetCharacterId: "izuku-midoriya",
    targetCharacterName: "Izuku Midoriya (Deku)",
    validCharacterIds: ["izuku-midoriya", "all-might", "nana-shimura", "yoichi-shigaraki"],
    clues: [
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
    contextExplanation: "One For All foi empunhado pelo primeiro portador Yoichi, Nana Shimura, All Might (8º) e Izuku Midoriya (9º)."
  },
  {
    id: "exc-mha-all-for-one-quirk",
    animeSlug: "my-hero-academia",
    category: "Individualidades Heróicas",
    questionTitle: "A quem pertence esta individualidade que rouba e distribui poderes?",
    targetTitle: "All For One (AFO)",
    badgeTitle: "Soberano do Submundo",
    targetCharacterId: "all-for-one",
    targetCharacterName: "All For One",
    validCharacterIds: ["all-for-one", "tomura-shigaraki"],
    clues: [
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
    contextExplanation: "All For One governou as sombras por gerações antes de tentar tomar o corpo de Tomura Shigaraki."
  },
  {
    id: "exc-naruto-rasengan-geral",
    animeSlug: "naruto",
    category: "Jutsus Secretos & Kekkei Genkai",
    questionTitle: "Quem domina esta esfera perfeita de chakra puro sem selos de mão?",
    targetTitle: "Rasengan",
    badgeTitle: "Ninjutsu Rank-A Sem Selos",
    targetCharacterId: "naruto-uzumaki",
    targetCharacterName: "Naruto Uzumaki",
    validCharacterIds: ["naruto-uzumaki", "minato-namikaze", "jiraiya", "kakashi-hatake", "konohamaru-sarutobi"],
    clues: [
      {
        "label": "Criador Original",
        "value": "Minato Namikaze (Quarto Hokage), após 3 anos observando a Bijuudama"
      },
      {
        "label": "Mecânica",
        "value": "Mudança de forma suprema do chakra sem necessidade de nenhum selo de mão"
      },
      {
        "label": "Linhagem de Ensino",
        "value": "Minato -> Jiraiya -> Naruto -> Konohamaru"
      }
    ],
    contextExplanation: "O Rasengan foi dominado e aprimorado por Minato, Jiraiya, Kakashi, Naruto e Konohamaru."
  },
  {
    id: "exc-naruto-susanoo-geral",
    animeSlug: "naruto",
    category: "Jutsus Secretos & Kekkei Genkai",
    questionTitle: "A quem pertence o guerreiro colossal de chakra espiritual do Mangekyō Sharingan?",
    targetTitle: "Susanoo",
    badgeTitle: "Poder dos Deuses Uchiha",
    targetCharacterId: "sasuke-uchiha",
    targetCharacterName: "Sasuke Uchiha",
    validCharacterIds: ["sasuke-uchiha", "itachi-uchiha", "madara-uchiha", "kakashi-hatake", "shisui-uchiha"],
    clues: [
      {
        "label": "Condição de Liberação",
        "value": "Despertar o Mangekyō Sharingan em ambos os olhos"
      },
      {
        "label": "Estágio Máximo",
        "value": "Susanoo Perfeito (Kanseitai Susanoo) com armadura de Tengu alado"
      },
      {
        "label": "Cores Distintas",
        "value": "Púrpura (Sasuke), Vermelho/Laranja (Itachi), Azul (Madara) e Ciano (Kakashi)"
      }
    ],
    contextExplanation: "O Susanoo protege e ataca como uma extensão de chakra divino para aqueles do clã Uchiha e Kakashi que despertaram o Mangekyo duplo."
  },
  {
    id: "exc-one-piece-mera-mera",
    animeSlug: "one-piece",
    category: "Akuma no Mi",
    questionTitle: "A quem pertence esta famosa fruta do elemento fogo?",
    targetTitle: "Mera Mera no Mi (Fruta do Fogo)",
    badgeTitle: "Logia Elemental",
    targetCharacterId: "portgas-d-ace",
    targetCharacterName: "Portgas D. Ace",
    validCharacterIds: ["portgas-d-ace", "sabo"],
    clues: [
      {
        "label": "Tipo de Fruta",
        "value": "Logia que transforma o corpo do usuário em chamas vivas e calor extremo"
      },
      {
        "label": "Torneio em Dressrosa",
        "value": "Prêmio supremo do Coliseu Corrida disputado após a Batalha de Marineford"
      },
      {
        "label": "Vontade Herdada",
        "value": "Consumida pelo irmão jurado para carregar a chama de Ace"
      }
    ],
    contextExplanation: "A Mera Mera no Mi pertenceu ao Punhos de Fogo Ace e, após sua morte, foi recuperada e consumida por Sabo."
  },
  {
    id: "exc-one-piece-gura-gura",
    animeSlug: "one-piece",
    category: "Akuma no Mi",
    questionTitle: "Quem empunha a Paramecia mais destrutiva do mundo capaz de partir o mar?",
    targetTitle: "Gura Gura no Mi (Fruta do Terremoto)",
    badgeTitle: "Poder de Destruição Mundial",
    targetCharacterId: "edward-newgate",
    targetCharacterName: "Edward Newgate (Barba Branca)",
    validCharacterIds: ["edward-newgate", "marshall-d-teach"],
    clues: [
      {
        "label": "Classificação e Risco",
        "value": "A Paramecia mais poderosa, dita capaz de destruir o mundo inteiro com ondas de choque"
      },
      {
        "label": "Ato em Marineford",
        "value": "Roubada sob um pano negro após o sacrifício do Barba Branca"
      },
      {
        "label": "Efeito Físico",
        "value": "Racha o próprio espaço com punhos concentrados criando tsunamis gigantescos"
      }
    ],
    contextExplanation: "A Gura Gura no Mi foi o poder lendário do Barba Branca e foi roubada por Barba Negra através de um método misterioso."
  }
];

// Inserir os novos desafios antes do fechamento do array
const closingIdx = content.lastIndexOf('];');
if (closingIdx !== -1) {
  const formattedNew = NEW_CHALLENGES.map(ch => `  ${JSON.stringify(ch, null, 4)}`).join(',\n');
  content = content.slice(0, closingIdx).trimEnd();
  if (!content.endsWith(',')) content += ',';
  content += '\n' + formattedNew + '\n];\n' + content.slice(closingIdx + 2);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Sucesso! ${NEW_CHALLENGES.length} novos desafios exclusivos com múltiplas respostas adicionados!`);
} else {
  console.error("Não encontrou o fim do array em exclusiveChallenges.ts");
}
