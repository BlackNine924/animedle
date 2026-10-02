import fs from 'fs';
import path from 'path';

// Helper para carregar e salvar characters.json
function loadChars(slug) {
  const p = path.join('src/data/animes', slug, 'characters.json');
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function saveChars(slug, chars) {
  const p = path.join('src/data/animes', slug, 'characters.json');
  fs.writeFileSync(p, JSON.stringify(chars, null, 2), 'utf8');
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. NOVOS PERSONAGENS DE ROMANCE
// ─────────────────────────────────────────────────────────────────────────────
const NEW_ROMANCE = [
  // ── Girlfriend, Girlfriend (Kanojo mo Kanojo)
  {
    id: "naoya-mukai",
    name: "Naoya Mukai",
    gender: "Masculino",
    origin: "Girlfriend, Girlfriend",
    role: "Protagonista Masculino",
    archetype: "Deredere / Honestidade Brutal",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Eu não consigo escolher entre vocês duas! Eu amo a Saki e a Nagisa de verdade, então vou me esforçar o dobro para fazer ambas felizes!",
    techniques: ["Curva de 90 Graus Pedindo Desculpas", "Dedicação Extrema ao Namoro Duplo"],
    avatar: "/avatars/romance/naoya-mukai.png"
  },
  {
    id: "saki-saki",
    name: "Saki Saki",
    gender: "Feminino",
    origin: "Girlfriend, Girlfriend",
    role: "Heroína Principal / Primeira Namorada",
    archetype: "Tsundere / Enérgica e Insegura",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Naoya! Você não tem vergonha na cara de propor ter duas namoradas ao mesmo tempo?! Mas... eu não quero terminar com você!",
    techniques: ["Golpes Cômicos de Frustração", "Amor Genuíno por Nagisa e Naoya"],
    avatar: "/avatars/romance/saki-saki.png"
  },
  {
    id: "nagisa-minase",
    name: "Nagisa Minase",
    gender: "Feminino",
    origin: "Girlfriend, Girlfriend",
    role: "Segunda Namorada",
    archetype: "Dandere / Dedicação Culinária Absoluta",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Eu passei meses cozinhando e me aperfeiçoando só para ter a coragem de me confessar para você, Naoya-kun!",
    techniques: ["Culinária Gourmet Caseira", "Bento Perfeito com Corações"],
    avatar: "/avatars/romance/nagisa-minase.png"
  },
  {
    id: "rika-hoshizaki",
    name: "Rika Hoshizaki (Mirika)",
    gender: "Feminino",
    origin: "Girlfriend, Girlfriend",
    role: "Terceira Pretendente / MeTuber Famosa",
    archetype: "Tsundere / MeTuber Provocadora",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio",
    quote: "Eu sou a MeTuber número um! Não tem como você não se apaixonar por uma garota fofa e famosa como eu!",
    techniques: ["Transmissões ao Vivo Atraentes", "Acampamento Teimoso no Jardim"],
    avatar: "/avatars/romance/rika-hoshizaki.png"
  },
  {
    id: "shino-kiryuu",
    name: "Shino Kiryuu",
    gender: "Feminino",
    origin: "Girlfriend, Girlfriend",
    role: "Quarta Pretendente / Amiga de Infância",
    archetype: "Kuudere / Racional e Esgrimista",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio",
    quote: "Relacionamento poliamoroso é moralmente inaceitável! Eu vou proteger a Saki... mesmo que meu coração bata mais forte pelo Naoya.",
    techniques: ["Postura Rígida de Esgrima Tradicional", "Esconder Sentimentos com Frieza"],
    avatar: "/avatars/romance/shino-kiryuu.png"
  },

  // ── A Couple of Cuckoos (Kakkou no Iinazuke)
  {
    id: "nagi-umino",
    name: "Nagi Umino",
    gender: "Masculino",
    origin: "A Couple of Cuckoos",
    role: "Protagonista Masculino",
    archetype: "Nerd / Estudioso Incansável",
    status: "Noivo(a)",
    debutArc: "Ensino Médio",
    quote: "Nós fomos trocados na maternidade e agora nossos pais querem que nos casemos?! Eu só quero tirar a nota máxima!",
    techniques: ["Cronograma de Estudos de 16 Horas", "Cozinha Doméstica do Restaurante Familiar"],
    avatar: "/avatars/romance/nagi-umino.png"
  },
  {
    id: "erika-amano",
    name: "Erika Amano",
    gender: "Feminino",
    origin: "A Couple of Cuckoos",
    role: "Heroína Principal / Noiva Trocada",
    archetype: "Ojou-sama / Influenciadora Fofa",
    status: "Noivo(a)",
    debutArc: "Ensino Médio",
    quote: "Finja ser meu namorado para afastar esse casamento arranjado! Espera... você é o garoto com quem me trocaram?!",
    techniques: ["Fotos Virais de Moda no Instagram", "Carisma Inocente de Mansão"],
    avatar: "/avatars/romance/erika-amano.png"
  },
  {
    id: "sachi-umino",
    name: "Sachi Umino",
    gender: "Feminino",
    origin: "A Couple of Cuckoos",
    role: "Irmã Não-Biológica",
    archetype: "Tsundere / Complexo de Irmão Protetora",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio",
    quote: "Você sempre vai ser meu irmão mais velho, Nagi! Eu não vou deixar nenhuma garota estranha roubar você!",
    techniques: ["Olhar Ciumento com Beicinho", "Apoio no Restaurante Umino"],
    avatar: "/avatars/romance/sachi-umino.png"
  },
  {
    id: "hiro-segawa",
    name: "Hiro Segawa",
    gender: "Feminino",
    origin: "A Couple of Cuckoos",
    role: "A Primeira Colocada Escolar / Miko",
    archetype: "Deredere / Competitiva Intelectual",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio (Santuário Xintoísta)",
    quote: "Se você quiser que eu saia com você, Umino-kun, terá que me superar no ranking das provas pelo menos uma vez!",
    techniques: ["Primeiro Lugar Invicto em Todas as Matérias", "Rituais Sagrados do Templo"],
    avatar: "/avatars/romance/hiro-segawa.png"
  },

  // ── Hokkaido Gals Are Super Adorable (Dosanko Gal wa Namara Menkoi)
  {
    id: "tsubasa-shiki",
    name: "Tsubasa Shiki",
    gender: "Masculino",
    origin: "Hokkaido Gals Are Super Adorable",
    role: "Protagonista Masculino",
    archetype: "Dandere / Estudante Disciplinado",
    status: "Namorando",
    debutArc: "Kitami (Hokkaido)",
    quote: "Eu me mudei de Tóquio para o gelo de Hokkaido esperando isolamento, mas o sorriso caloroso da Fuyuki mudou meu mundo.",
    techniques: ["Caminhada Congelante na Neve de Kitami", "Lealdade Emocional Tímida"],
    avatar: "/avatars/romance/tsubasa-shiki.png"
  },
  {
    id: "minami-fuyuki",
    name: "Minami Fuyuki",
    gender: "Feminino",
    origin: "Hokkaido Gals Are Super Adorable",
    role: "Heroína Principal / Gyaru de Hokkaido",
    archetype: "Gyaru / Namara Menkoi e Calorosa",
    status: "Namorando",
    debutArc: "Kitami (Hokkaido)",
    quote: "Namara menkoi! Está um frio de rachar aqui fora, Shiki-chi! Segura a minha mão no bolso do casaco!",
    techniques: ["Dialeto Doce de Hokkaido (Dosanko-ben)", "Aquecer Mãos no Mesmo Bolso"],
    avatar: "/avatars/romance/minami-fuyuki.png"
  },
  {
    id: "sayuri-akino",
    name: "Sayuri Akino",
    gender: "Feminino",
    origin: "Hokkaido Gals Are Super Adorable",
    role: "Heroína / Colega Gamer Tímida",
    archetype: "Kuudere / Dandere Gamer",
    status: "Solteiro(a)",
    debutArc: "Kitami (Hokkaido)",
    quote: "Eu sempre tive vergonha de suar ou de me aproximar das pessoas... mas jogar com você me fez esquecer todo o medo.",
    techniques: ["Habilidade de Mestre em Jogos de Luta", "Cabelo Preto Tradicional Reservado"],
    avatar: "/avatars/romance/sayuri-akino.png"
  },
  {
    id: "rena-natsukawa",
    name: "Rena Natsukawa",
    gender: "Feminino",
    origin: "Hokkaido Gals Are Super Adorable",
    role: "Senpai / Vizinha Madura",
    archetype: "Onee-san / Bela e Confiante",
    status: "Solteiro(a)",
    debutArc: "Kitami (Hokkaido)",
    quote: "Você é fofo demais quando fica sem jeito com as senpais, Tsubasa-kun!",
    techniques: ["Cosplay Perfeito Artesanal", "Aura Protetora de Irmã Mais Velha"],
    avatar: "/avatars/romance/rena-natsukawa.png"
  },

  // ── Dealing with Mikadono Sisters Is a Breeze (Mikadono Sanshimai)
  {
    id: "yuu-ayatsuji",
    name: "Yuu Ayatsuji",
    gender: "Masculino",
    origin: "Dealing with Mikadono Sisters Is a Breeze",
    role: "Protagonista Masculino",
    archetype: "Deredere / Mestre do Lar Protetor",
    status: "Solteiro(a)",
    debutArc: "Mansão Mikadono",
    quote: "Vocês três são gênios em seus talentos mundiais, mas em casa são um desastre! Deixem a comida e o cuidado comigo!",
    techniques: ["Banquete Caseiro que Acalma Prodígios", "Gestão Doméstica Inabalável"],
    avatar: "/avatars/romance/yuu-ayatsuji.png"
  },
  {
    id: "miwa-mikadono",
    name: "Miwa Mikadono",
    gender: "Feminino",
    origin: "Dealing with Mikadono Sisters Is a Breeze",
    role: "Segunda Irmã / Mestre de Shogi",
    archetype: "Kuudere / Gênio Estrategista Frágil",
    status: "Solteiro(a)",
    debutArc: "Mansão Mikadono",
    quote: "No tabuleiro eu antecipo vinte jogadas... Mas perto do Yuu, meu coração faz movimentos que não consigo prever.",
    techniques: ["Visão de Jogo Absoluta em Shogi", "Expressão Serena Escondendo Paixão"],
    avatar: "/avatars/romance/miwa-mikadono.png"
  },
  {
    id: "niko-mikadono",
    name: "Niko Mikadono",
    gender: "Feminino",
    origin: "Dealing with Mikadono Sisters Is a Breeze",
    role: "Terceira Irmã / Campeã de Artes Marciais",
    archetype: "Tsundere / Atleta Musculosa e Tímida",
    status: "Solteiro(a)",
    debutArc: "Mansão Mikadono",
    quote: "Eu consigo derrubar faixas pretas adultos com um golpe! Então por que eu tremo toda vez que você elogia meu kimono?!",
    techniques: ["Golpe de Judô Imparável", "Vergonha Extrema com Roupas Fofas"],
    avatar: "/avatars/romance/niko-mikadono.png"
  },
  {
    id: "kazuki-mikadono",
    name: "Kazuki Mikadono",
    gender: "Feminino",
    origin: "Dealing with Mikadono Sisters Is a Breeze",
    role: "Primeira Irmã / Atriz Prodigiosa",
    archetype: "Deredere / Camaleoa Dramática",
    status: "Solteiro(a)",
    debutArc: "Mansão Mikadono",
    quote: "Eu encaro qualquer personagem no palco com perfeição. Mas o papel de garota apaixonada por você é o mais difícil de atuar!",
    techniques: ["Atuação Teatral Magnética", "Sorriso Cativante de Cinema"],
    avatar: "/avatars/romance/kazuki-mikadono.png"
  },

  // ── The Shiunji Family Children (Shiunji-ke no Kodomotachi)
  {
    id: "arata-shiunji",
    name: "Arata Shiunji",
    gender: "Masculino",
    origin: "The Shiunji Family Children",
    role: "Protagonista Masculino",
    archetype: "Deredere / Irmão Mais Velho Dedicado",
    status: "Solteiro(a)",
    debutArc: "Mansão Shiunji",
    quote: "Nós crescemos como sete irmãos... Descobrir que não compartilhamos laços de sangue mudou o significado dos olhares de vocês.",
    techniques: ["Cuidado Fraternal que Vira Tensão Romântica", "Honestidade Familiar Protetora"],
    avatar: "/avatars/romance/arata-shiunji.png"
  },
  {
    id: "banri-shiunji",
    name: "Banri Shiunji",
    gender: "Feminino",
    origin: "The Shiunji Family Children",
    role: "Primeira Filha",
    archetype: "Onee-san / Gentil e Universitária",
    status: "Solteiro(a)",
    debutArc: "Mansão Shiunji",
    quote: "Arata... agora que sabemos que não somos irmãos biológicos, eu não preciso mais esconder o quanto te acho especial.",
    techniques: ["Aura de Maturidade Elegante", "Conselhos Carinhosos"],
    avatar: "/avatars/romance/banri-shiunji.png"
  },
  {
    id: "ouka-shiunji",
    name: "Ouka Shiunji",
    gender: "Feminino",
    origin: "The Shiunji Family Children",
    role: "Quarta Filha",
    archetype: "Tsundere / Competitiva e Teimosa",
    status: "Solteiro(a)",
    debutArc: "Mansão Shiunji",
    quote: "Não pense que só porque não somos parentes de sangue eu vou agir diferente com você, idiota!",
    techniques: ["Pisar Firme Desconversando Sentimentos", "Expressão Vermelha ao Olhar de Perto"],
    avatar: "/avatars/romance/ouka-shiunji.png"
  },

  // ── Lovely Complex
  {
    id: "risa-koizumi",
    name: "Risa Koizumi",
    gender: "Feminino",
    origin: "Lovely Complex",
    role: "Heroína Principal / Alta e Engraçada",
    archetype: "Bakadere / Expressiva e Determinada",
    status: "Namorando",
    debutArc: "Ensino Médio (Osaka)",
    quote: "O que tem se eu sou mais alta que você, Ootani?! O tamanho do meu amor é muito maior do que qualquer diferença de altura!",
    techniques: ["Dupla Cômica All Hanshin Kyojin", "Declaração Apaixonada aos Prantos no Terraço"],
    avatar: "/avatars/romance/risa-koizumi.png"
  },
  {
    id: "atsushi-ootani",
    name: "Atsushi Ootani",
    gender: "Masculino",
    origin: "Lovely Complex",
    role: "Protagonista Masculino / Baixinho Enérgico",
    archetype: "Tsundere / Capitão de Basquete Orgulhoso",
    status: "Namorando",
    debutArc: "Ensino Médio (Osaka)",
    quote: "Koizumi! Você é uma gigante barulhenta... mas eu não consigo mais imaginar a minha vida sem as suas palhaçadas.",
    techniques: ["Arremessos de Três Pontos Velozes", "Beijo no Pátio na Festa de Aniversário"],
    avatar: "/avatars/romance/atsushi-ootani.png"
  },

  // ── Medaka Kuroiwa is Impervious to My Charms
  {
    id: "medaka-kuroiwa",
    name: "Medaka Kuroiwa",
    gender: "Masculino",
    origin: "Medaka Kuroiwa is Impervious to My Charms",
    role: "Protagonista Masculino / Futuro Monge",
    archetype: "Kuudere / Disciplina de Ferro Antissedução",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio",
    quote: "Eu sou um aspirante a monge do templo! As regras budistas proíbem pensamentos impuros com mulheres!",
    techniques: ["Mantras de Meditação para Bloquear Encantos", "Expressão de Pedra Indomável"],
    avatar: "/avatars/romance/medaka-kuroiwa.png"
  },
  {
    id: "mona-kawai",
    name: "Mona Kawai",
    gender: "Feminino",
    origin: "Medaka Kuroiwa is Impervious to My Charms",
    role: "Heroína Principal / Rainha da Escola",
    archetype: "Deredere / Sedutora Obstinada",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio",
    quote: "Todo garoto nesta escola se ajoelha pelo meu sorriso! Kuroiwa, eu juro que vou fazer você se apaixonar por mim!",
    techniques: ["Olhar Cativante 100% Eficaz", "Sorriso Radiante com Dialeto de Kansai Secreto"],
    avatar: "/avatars/romance/mona-kawai.png"
  },

  // ── Our Dating Story (Keikenzumi na Kimi to...)
  {
    id: "ryuuto-kashima",
    name: "Ryuuto Kashima",
    gender: "Masculino",
    origin: "Our Dating Story: The Experienced You and The Inexperienced Me",
    role: "Protagonista Masculino",
    archetype: "Dandere / Honesto e Respeitoso",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Eu perdi um jogo de punição e confessei meu amor por você... mas quero te conhecer de verdade e com respeito, Shirakawa-san.",
    techniques: ["Honestidade Pura que Conquista Gyarus", "Respeito ao Tempo da Companheira"],
    avatar: "/avatars/romance/ryuuto-kashima.png"
  },
  {
    id: "runa-shirakawa",
    name: "Runa Shirakawa",
    gender: "Feminino",
    origin: "Our Dating Story: The Experienced You and The Inexperienced Me",
    role: "Heroína Principal / Gyaru Doce",
    archetype: "Gyaru / Inocente e Franca",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Todo mundo só me julgava pela minha aparência... Kashima-kun, você foi o primeiro a se importar com o meu coração.",
    techniques: ["Maquiagem Gyaru Encantadora", "Carinho Espontâneo e Doce"],
    avatar: "/avatars/romance/runa-shirakawa.png"
  },

  // ── And You Thought There Is Never a Girl Online? (Netoge no Yome)
  {
    id: "hideki-nishimura",
    name: "Hideki Nishimura (Lucian)",
    gender: "Masculino",
    origin: "And you thought there is never a girl online?",
    role: "Protagonista Masculino / Cavaleiro Online",
    archetype: "Deredere / Jogador Sensato",
    status: "Casados no Jogo / Namorando",
    debutArc: "Jogo de MMORPG & Clube Escolar",
    quote: "Ako! O jogo é o jogo e a realidade é a realidade! Você não pode me chamar de marido no meio da sala de aula!",
    techniques: ["Armadura de Cavaleiro do MMORPG", "Paciência Infinita para Ensinar a Realidade"],
    avatar: "/avatars/romance/hideki-nishimura.png"
  },
  {
    id: "ako-tamaki",
    name: "Ako Tamaki (Ako)",
    gender: "Feminino",
    origin: "And you thought there is never a girl online?",
    role: "Heroína Principal / Sacerdotisa Devota",
    archetype: "Yandere / Dandere Viciada em Games",
    status: "Casados no Jogo / Namorando",
    debutArc: "Jogo de MMORPG & Clube Escolar",
    quote: "Lucian é o meu marido no jogo e na vida real pra sempre! Pessoas normais da realidade não entendem o nosso amor!",
    techniques: ["Cura e Suporte no MMORPG", "Apego Cego Inseparável ao Marido"],
    avatar: "/avatars/romance/ako-tamaki.png"
  },

  // ── Can a Boy-Girl Friendship Survive? (Danjo no Yuujou)
  {
    id: "yuu-natsume",
    name: "Yuu Natsume",
    gender: "Masculino",
    origin: "Can a Boy-Girl Friendship Survive?",
    role: "Protagonista Masculino",
    archetype: "Dandere / Artesão e Botânico",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio",
    quote: "Nós juramos que amizade entre homem e mulher existe para sempre! Então por que cada toque entre nós parece faísca agora?",
    techniques: ["Acessórios de Flores Secas Feitos à Mão", "Pacto de Amizade Inabalável"],
    avatar: "/avatars/romance/yuu-natsume.png"
  },
  {
    id: "himari-inuzuka",
    name: "Himari Inuzuka",
    gender: "Feminino",
    origin: "Can a Boy-Girl Friendship Survive?",
    role: "Heroína Principal / Melhor Amiga de Infância",
    archetype: "Tsundere / Enérgica e Protetora",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio",
    quote: "Yuu é meu melhor amigo e parceiro de negócios! Amor? Isso estragaria tudo... Mas por que sinto ciúmes quando outras chegam perto?",
    techniques: ["Vendas e Empreendedorismo Estudantil", "Cumplicidade de Mais de Dez Anos"],
    avatar: "/avatars/romance/himari-inuzuka.png"
  },

  // ── Personagens adicionais de obras existentes
  {
    id: "maki-gamou",
    name: "Maki Gamou (Gamo-chan)",
    gender: "Feminino",
    origin: "Don't Toy with Me Miss Nagatoro",
    role: "Melhor Amiga da Nagatoro / Líder do Grupo",
    archetype: "Gyaru / Provocadora Líder",
    status: "Solteiro(a)",
    debutArc: "Clube de Arte",
    quote: "Paisen! Você está vermelho que nem um pimentão de novo! Deixa a Hayacchi cuidar do restante!",
    techniques: ["Provocações em Dupla com Nagatoro", "Apoio Secreto ao Romance dos Dois"],
    avatar: "/avatars/romance/maki-gamou.png"
  },
  {
    id: "yosshi",
    name: "Yosshi",
    gender: "Feminino",
    origin: "Don't Toy with Me Miss Nagatoro",
    role: "Amiga Enérgica do Grupo",
    archetype: "Gyaru / Fiel e Cômica",
    status: "Solteiro(a)",
    debutArc: "Clube de Arte",
    quote: "Isso mesmo, isso mesmo! Paisen é um alvo fácil demais!",
    techniques: ["Repetir as Frases da Gamo-chan", "Ahoge Saltitante Inconfundível"],
    avatar: "/avatars/romance/yosshi.png"
  },
  {
    id: "sakura-nagatoro",
    name: "Sakura",
    gender: "Feminino",
    origin: "Don't Toy with Me Miss Nagatoro",
    role: "Amiga Doce e Flertadora",
    archetype: "Gyaru / Conquistadora Gentil",
    status: "Solteiro(a)",
    debutArc: "Clube de Arte",
    quote: "Paisen é tão doce e fofo! Se a Hayase não quiser, eu posso ficar com ele?",
    techniques: ["Flertes Suaves Desconcertantes", "Conselhos Amorosos Perspicazes"],
    avatar: "/avatars/romance/sakura-nagatoro.png"
  },
  {
    id: "sana-sunomiya",
    name: "Sana Sunomiya (Presidente)",
    gender: "Feminino",
    origin: "Don't Toy with Me Miss Nagatoro",
    role: "Ex-Presidente do Clube de Arte",
    archetype: "Kuudere / Artista da Beleza Corporal",
    status: "Solteiro(a)",
    debutArc: "Clube de Arte",
    quote: "A verdadeira arte reside na paixão e na nudez pura da alma! Mostre-me sua convicção, Hachioji!",
    techniques: ["Pintura a Óleo de Nudez Artística", "Discursos Imponentes sobre o Amor e Arte"],
    avatar: "/avatars/romance/sana-sunomiya.png"
  },
  {
    id: "hahari-hanazono",
    name: "Hahari Hanazono",
    gender: "Feminino",
    origin: "The 100 Girlfriends Who Really Love You",
    role: "Namorada / Mãe da Hakari / Presidente da Escola",
    archetype: "Yandere / Rica e Sedutora Voraz",
    status: "Namorando",
    debutArc: "Mansão Hanazono",
    quote: "Rentarou-chan! Eu pretendia separar você da minha filha, mas agora meu coração pertence a você também!",
    techniques: ["Comprar a Escola Inteira por Capricho", "Amor Materno e Romântico Explosivo"],
    avatar: "/avatars/romance/hahari-hanazono.png"
  },
  {
    id: "maria-mikhailovna-kujou",
    name: "Maria Mikhailovna Kujou (Masha)",
    gender: "Feminino",
    origin: "Alya Sometimes Hides Her Feelings in Russian",
    role: "Irmã Mais Velha da Alya / Presidente do Conselho",
    archetype: "Deredere / Carinho Maternal e Fofo",
    status: "Solteiro(a)",
    debutArc: "Conselho Estudantil",
    quote: "Kuze-kun! Você é tão gentil e atencioso... Alya tem muita sorte de ter você ao lado dela.",
    techniques: ["Abraços Suaves e Calmantes", "Russo Fluente Doce"],
    avatar: "/avatars/romance/maria-mikhailovna-kujou.png"
  },
  {
    id: "misuzu-gundou",
    name: "Misuzu Gundou",
    gender: "Feminino",
    origin: "Tomo-chan Is a Girl",
    role: "Melhor Amiga de Infância da Tomo",
    archetype: "Kuudere / Estrategista Sádica",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio",
    quote: "Você quer ser tratada como mulher pelo Jun, Tomo? Então pare de bater nele e use a cabeça pelo menos uma vez.",
    techniques: ["Manipulação Psicológica Fria", "Olhar Desdenhoso Mortal"],
    avatar: "/avatars/romance/misuzu-gundou.png"
  },
  {
    id: "carol-olston",
    name: "Carol Olston",
    gender: "Feminino",
    origin: "Tomo-chan Is a Girl",
    role: "Colega Britânica Rica e Avoada",
    archetype: "Bakadere / Fofa e Inesperadamente Esperta",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Tomo-chan! Eu posso te ensinar a arte da fofura e do charme feminino ocidental!",
    techniques: ["Aura Angelical de Algodão-Doce", "Família Nobre com Guarda-Costas"],
    avatar: "/avatars/romance/carol-olston.png"
  },
  {
    id: "yuki-sohma",
    name: "Yuki Sohma (O Rato)",
    gender: "Masculino",
    origin: "Fruits Basket",
    role: "Príncipe da Escola / O Rato do Zodíaco",
    archetype: "Kuudere / Nobre e Elegante",
    status: "Namorando",
    debutArc: "Mansão Shigure",
    quote: "Tohru-san me ensinou que eu não sou um monstro defeituoso... Ela foi o céu aberto para a minha liberdade.",
    techniques: ["Artes Marciais Elegantes do Clã Sohma", "Fã-Clube Escolar Devoto 'Príncipe Yuki'"],
    avatar: "/avatars/romance/yuki-sohma.png"
  },
  {
    id: "shigure-sohma",
    name: "Shigure Sohma (O Cão)",
    gender: "Masculino",
    origin: "Fruits Basket",
    role: "Guardião da Mansão / O Cão do Zodíaco",
    archetype: "Do-S / Escritor Cínico e Manipulador",
    status: "Namorando",
    debutArc: "Mansão Shigure",
    quote: "Eu faria qualquer coisa, manipularia qualquer pessoa... tudo para ter Akito em meus braços e quebrar esse laço eterno.",
    techniques: ["Manipulação Emocional Subterrânea", "Romances Literários de Sucesso"],
    avatar: "/avatars/romance/shigure-sohma.png"
  }
];

// Executar inserção em Romance com garantia estrita de NÃO-DUPLICAÇÃO
const romanceCurrent = loadChars('romance');
const existingRomanceIds = new Set(romanceCurrent.map(c => c.id.toLowerCase()));
const existingRomanceNames = new Set(romanceCurrent.map(c => c.name.toLowerCase()));

let addedRomance = 0;
for (const c of NEW_ROMANCE) {
  const normId = c.id.toLowerCase();
  const normName = c.name.toLowerCase();
  if (existingRomanceIds.has(normId) || existingRomanceNames.has(normName)) {
    console.log(`[ROMANCE SKIP] Já existe: ${c.name} (${c.id})`);
    continue;
  }
  romanceCurrent.push(c);
  existingRomanceIds.add(normId);
  existingRomanceNames.add(normName);
  addedRomance++;
}

saveChars('romance', romanceCurrent);
console.log(`=== ROMANCE CONCLUÍDO: ${addedRomance} adicionados. Total atual: ${romanceCurrent.length} ===`);
