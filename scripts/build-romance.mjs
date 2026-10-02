import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Array massivo com todas as obras clássicas + 22 novas obras
export const ROMANCE_CHARACTERS = [
  // ── 1. Kaguya-sama: Love Is War ──────────────────────────────────────
  {
    id: "kaguya-shinomiya",
    name: "Kaguya Shinomiya",
    gender: "Feminino",
    origin: "Kaguya-sama: Love Is War",
    role: "Heroína Principal",
    archetype: "Tsundere / Ojou-sama",
    status: "Namorando",
    debutArc: "Ensino Médio (Academia Shuchiin)",
    quote: "O Kawaii Koto... Se você realmente quer que eu saia com você, Presidente, terá que confessar primeiro!",
    techniques: ["Guerra Psicológica de Confissão", "Arquearia Tradicional Kyudo", "Persona Gelo Kaguya"],
    wikiDomain: "kaguyasama",
    wikiTitle: "Kaguya_Shinomiya"
  },
  {
    id: "miyuki-shirogane",
    name: "Miyuki Shirogane",
    gender: "Masculino",
    origin: "Kaguya-sama: Love Is War",
    role: "Protagonista Masculino",
    archetype: "Deredere / Trabalhador Incansável",
    status: "Namorando",
    debutArc: "Ensino Médio (Academia Shuchiin)",
    quote: "O primeiro a confessar o amor é o perdedor da relação! Eu farei Shinomiya se confessar custe o que custar!",
    techniques: ["Estudo Diário de 14 Horas", "Olhar Intimidatório de Falta de Sono", "Treinamento Secreto com Fujiwara"],
    wikiDomain: "kaguyasama",
    wikiTitle: "Miyuki_Shirogane"
  },
  {
    id: "chika-fujiwara",
    name: "Chika Fujiwara",
    gender: "Feminino",
    origin: "Kaguya-sama: Love Is War",
    role: "Cupido / Secretária Caótica",
    archetype: "Bakadere / Agente do Caos",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio (Academia Shuchiin)",
    quote: "Love Detective Chika! Eu resolvo qualquer dilema amoroso com jogos de tabuleiro e doces!",
    techniques: ["Chika Dance", "Trapaças Criativas em Jogos", "Jornal Dobrado Corretivo"],
    wikiDomain: "kaguyasama",
    wikiTitle: "Chika_Fujiwara"
  },
  {
    id: "yuu-ishigami",
    name: "Yuu Ishigami",
    gender: "Masculino",
    origin: "Kaguya-sama: Love Is War",
    role: "Tesoureiro / Melhor Amigo",
    archetype: "Nerd / Introvertido Realista",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio (Academia Shuchiin)",
    quote: "Eu quero ir para casa e morrer... Mas obrigado por acreditarem em mim.",
    techniques: ["Contabilidade Forense de Dados", "Gamer Hardcore", "Percepção Social Afiada"],
    wikiDomain: "kaguyasama",
    wikiTitle: "Yuu_Ishigami"
  },
  {
    id: "miko-iino",
    name: "Miko Iino",
    gender: "Feminino",
    origin: "Kaguya-sama: Love Is War",
    role: "Heroína / Comitê de Moral",
    archetype: "Tsundere / Idealista Rígida",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio (Academia Shuchiin)",
    quote: "A moral e a ordem dos alunos devem ser preservadas com punho de ferro!",
    techniques: ["Inspeção de Moral Escolar", "Audição de Áudios de Relaxamento Estranhos"],
    wikiDomain: "kaguyasama",
    wikiTitle: "Miko_Iino"
  },
  {
    id: "ai-hayasaka",
    name: "Ai Hayasaka",
    gender: "Feminino",
    origin: "Kaguya-sama: Love Is War",
    role: "Serva Fiel / Falsa Gyaru",
    archetype: "Kuudere / Gyaru Camaleônica",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio (Academia Shuchiin)",
    quote: "Kaguya-sama... você realmente não tem salvação quando o assunto é o Presidente.",
    techniques: ["Múltiplas Identidades (Gyaru, Valet, Maid)", "Hacking e Espionagem Doméstica"],
    wikiDomain: "kaguyasama",
    wikiTitle: "Ai_Hayasaka"
  },

  // ── 2. Horimiya ────────────────────────────────────────────────────────
  {
    id: "izumi-miyamura",
    name: "Izumi Miyamura",
    gender: "Masculino",
    origin: "Horimiya",
    role: "Protagonista Masculino",
    archetype: "Dandere / Piercings e Tatuagens Ocultas",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Eu costumava pensar que estava sozinho no escuro, até você me puxar para a sua luz, Hori-san.",
    techniques: ["Transformação Estilo Piercing/Tatuagem", "Cozinha e Confeitaria Familiar"],
    wikiDomain: "horimiya",
    wikiTitle: "Izumi_Miyamura"
  },
  {
    id: "kyouko-hori",
    name: "Kyouko Hori",
    gender: "Feminino",
    origin: "Horimiya",
    role: "Heroína Principal",
    archetype: "Deredere / Dona de Casa Dedicada",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Miyamura é meu e de mais ninguém! E eu adoro quando ele age com firmeza comigo...",
    techniques: ["Administração Doméstica e Cuidados com Souta", "Notas Perfeitas de Liderança Escolar"],
    wikiDomain: "horimiya",
    wikiTitle: "Kyouko_Hori"
  },
  {
    id: "toru-ishikawa",
    name: "Toru Ishikawa",
    gender: "Masculino",
    origin: "Horimiya",
    role: "Melhor Amigo / Cupido",
    archetype: "Deredere / Confiável e Honesto",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Eu fui rejeitado pela Hori, mas o Miyamura é o cara mais legal do mundo para ser meu melhor amigo.",
    techniques: ["Apoio Emocional aos Amigos", "Sonhos Surreais com Bichos de Pelúcia"],
    wikiDomain: "horimiya",
    wikiTitle: "Tohru_Ishikawa"
  },
  {
    id: "yuki-yoshikawa",
    name: "Yuki Yoshikawa",
    gender: "Feminino",
    origin: "Horimiya",
    role: "Melhor Amiga / Cupido",
    archetype: "Deredere / Insegura e Meiga",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Eu sempre acabo fingindo que não quero as coisas que mais amo... mas com o Toru é diferente.",
    techniques: ["Mangás Shoujo", "Casacos com Mangas Longas Fofas"],
    wikiDomain: "horimiya",
    wikiTitle: "Yuki_Yoshikawa"
  },

  // ── 3. Toradora! ───────────────────────────────────────────────────────
  {
    id: "taiga-aisaka",
    name: "Taiga Aisaka (Tigresa de Bolso)",
    gender: "Feminino",
    origin: "Toradora!",
    role: "Heroína Principal",
    archetype: "Tsundere Suprema (Rainha do Bokken)",
    status: "Casados",
    quote: "Desde tempos antigos, o dragão é a única criatura igual ao tigre! Ryuuji, você é meu dragão!",
    techniques: ["Espada de Madeira Bokken", "Chutes Voadores de Taiga", "Tigresa em Fúria"],
    wikiDomain: "tora-dora",
    wikiTitle: "Taiga_Aisaka"
  },
  {
    id: "ryuuji-takasu",
    name: "Ryuuji Takasu",
    gender: "Masculino",
    origin: "Toradora!",
    role: "Protagonista Masculino",
    archetype: "Deredere / Olhar de Delinquente",
    status: "Casados",
    quote: "Mesmo que meus olhos assustem todo mundo, eu vou limpar cada canto da sua casa e cuidar da sua comida, Taiga!",
    techniques: ["Obsessão por Limpeza e Desinfetante", "Culinária de Restaurante de Alto Padrão", "Olhar Aterrorizante Herdado do Pai"],
    wikiDomain: "tora-dora",
    wikiTitle: "Ryuuji_Takasu"
  },
  {
    id: "minori-kushieda",
    name: "Minori Kushieda",
    gender: "Feminino",
    origin: "Toradora!",
    role: "Heroína / Melhor Amiga",
    archetype: "Deredere / Energia Solar Inesgotável",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio",
    quote: "Acreditar em fantasmas é como acreditar no amor... Se você nunca viu um, isso não significa que ele não exista!",
    techniques: ["Capitã do Clube de Softball", "Trabalhar em Três Empregos de Meio-Período ao Mesmo Tempo"],
    wikiDomain: "tora-dora",
    wikiTitle: "Minori_Kushieda"
  },
  {
    id: "ami-kawashima",
    name: "Ami Kawashima",
    gender: "Feminino",
    origin: "Toradora!",
    role: "Rival / Modelo Falsa",
    archetype: "Do-S / Tsundere Madura",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio",
    quote: "Vocês estão brincando de casinha feliz enquanto a realidade está prestes a quebrar todos vocês em pedaços.",
    techniques: ["Dupla Personalidade de Modelo Fofa / Princesa Sádica", "Percepção Psicológica Adulta"],
    wikiDomain: "tora-dora",
    wikiTitle: "Ami_Kawashima"
  },

  // ── 4. Sono Bisque Doll (My Dress-Up Darling) ──────────────────────────
  {
    id: "marin-kitagawa",
    name: "Marin Kitagawa",
    gender: "Feminino",
    origin: "Sono Bisque Doll wa Koi wo Suru",
    role: "Heroína Principal",
    archetype: "Gyaru / Otaku Apaixonada",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Gojo-kun! Não tem nada mais incrível no mundo do que amar intensamente o que você gosta!",
    techniques: ["Cosplays Deslumbrantes (Shizuku-tan, Black Lobelia)", "Expressões de Paixão Incontrolável por Gojo"],
    wikiDomain: "sono-bisque-doll-wa-koi-wo-suru",
    wikiTitle: "Marin_Kitagawa"
  },
  {
    id: "wakana-gojo",
    name: "Wakana Gojo",
    gender: "Masculino",
    origin: "Sono Bisque Doll wa Koi wo Suru",
    role: "Protagonista Masculino",
    archetype: "Dandere / Artesão Dedicado",
    status: "Namorando",
    debutArc: "Ensino Médio / Ateliê Familiar",
    quote: "Quando olho para os trajes que fiz para você, Kitagawa-san... você é tão linda que tira o meu fôlego.",
    techniques: ["Confecção de Bonecas Hina Tradicionais", "Costura Profissional e Modelagem de Cosplays", "Maquiagem Artística Facial"],
    wikiDomain: "sono-bisque-doll-wa-koi-wo-suru",
    wikiTitle: "Wakana_Gojo"
  },
  {
    id: "sajuna-inui",
    name: "Sajuna Inui (Juju)",
    gender: "Feminino",
    origin: "Sono Bisque Doll wa Koi wo Suru",
    role: "Cosplayer Veterana",
    archetype: "Tsundere / Ojou-sama Reservada",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio",
    quote: "Eu não faço cosplay para me exibir. Eu faço para me tornar a garota mágica que sempre admirei nas telas.",
    techniques: ["Direção Fotográfica Profissional de Cosplay", "Composição de Cenários de Terror e Fantasia"],
    wikiDomain: "sono-bisque-doll-wa-koi-wo-suru",
    wikiTitle: "Sajuna_Inui"
  },

  // ── 5. The Quintessential Quintuplets (5-toubun) ───────────────────────
  {
    id: "futaro-uesugi",
    name: "Futaro Uesugi",
    gender: "Masculino",
    origin: "The Quintessential Quintuplets",
    role: "Protagonista Masculino",
    archetype: "Nerd / Tutor Incansável",
    status: "Casados",
    debutArc: "Ensino Médio",
    quote: "Eu vou fazer todas as cinco tirarem nota máxima e se formarem juntas com orgulho!",
    techniques: ["Plano de Estudos Customizado Quíntuplo", "Resistência Econômica Extrema"],
    wikiDomain: "5hanayome",
    wikiTitle: "Futaro_Uesugi"
  },
  {
    id: "miku-nakano",
    name: "Miku Nakano",
    gender: "Feminino",
    origin: "The Quintessential Quintuplets",
    role: "Terceira Irmã Quíntupla",
    archetype: "Kuudere / Dandere Histórica",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "Futaro... eu gosto de generais do período Sengoku. E eu gosto de você.",
    techniques: ["Conhecimento Enciclopédico dos Generais Sengoku", "Aprimoramento Contínuo em Confeitaria e Pães"],
    wikiDomain: "5hanayome",
    wikiTitle: "Miku_Nakano"
  },
  {
    id: "nino-nakano",
    name: "Nino Nakano",
    gender: "Feminino",
    origin: "The Quintessential Quintuplets",
    role: "Segunda Irmã Quíntupla",
    archetype: "Tsundere / Atacante Implacável",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "Eu não vou recuar nem fingir! Eu amo você, Futaro, e vou fazer você olhar só pra mim!",
    techniques: ["Confissão Direta na Garupa da Moto", "Cozinha Gourmet de Alta Qualidade"],
    wikiDomain: "5hanayome",
    wikiTitle: "Nino_Nakano"
  },
  {
    id: "yotsuba-nakano",
    name: "Yotsuba Nakano",
    gender: "Feminino",
    origin: "The Quintessential Quintuplets",
    role: "Quarta Irmã Quíntupla (A Noiva)",
    archetype: "Deredere / Energia Atlética Abnegada",
    status: "Casados",
    debutArc: "Ensino Médio",
    quote: "Eu sempre estive ao seu lado desde o início em Kyoto... e agora posso te amar sem culpa.",
    techniques: ["Faixa de Cabelo de Orelhas de Coelho", "Atletismo de Alta Performance e Suporte a Clubes"],
    wikiDomain: "5hanayome",
    wikiTitle: "Yotsuba_Nakano"
  },
  {
    id: "ichika-nakano",
    name: "Ichika Nakano",
    gender: "Feminino",
    origin: "The Quintessential Quintuplets",
    role: "Primeira Irmã Quíntupla",
    archetype: "Onee-san / Atriz Charmosa",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "Como a irmã mais velha, eu deveria ceder... Mas no amor, mentiras também são permitidas.",
    techniques: ["Atuação Profissional de Cinema", "Charme Sedutor de Irmã Mais Velha"],
    wikiDomain: "5hanayome",
    wikiTitle: "Ichika_Nakano"
  },
  {
    id: "itsuki-nakano",
    name: "Itsuki Nakano",
    gender: "Feminino",
    origin: "The Quintessential Quintuplets",
    role: "Quinta Irmã Quíntupla",
    archetype: "Tsundere / Glutona Dedicada",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "Uesugi-kun! O estômago cheio é o primeiro passo para o sucesso nos estudos!",
    techniques: ["Devoração Rápida de Doces e Almoço", "Preparo para a Carreira de Professora"],
    wikiDomain: "5hanayome",
    wikiTitle: "Itsuki_Nakano"
  },

  // ── 6. Rent-a-Girlfriend (Kanojo, Okarishimasu) ────────────────────────
  {
    id: "chizuru-mizuhara",
    name: "Chizuru Mizuhara (Ichinose)",
    gender: "Feminino",
    origin: "Rent-a-Girlfriend",
    role: "Heroína Principal / Namorada de Aluguel",
    archetype: "Tsundere / Atriz Perfeccionista",
    status: "Noivado Falso / Coabitação",
    debutArc: "Universitário / Coabitação",
    quote: "Eu sou uma namorada de aluguel profissional Diamond. Não confunda serviço com sentimentos reais... a não ser que você não consiga evitar.",
    techniques: ["Atuação de Namorada Impecável Nota 5 Estrelas", "Carreira de Atriz de Teatro", "Vida Disfarçada com Óculos e Tranças"],
    wikiDomain: "kanojo-okarishimasu",
    wikiTitle: "Chizuru_Ichinose"
  },
  {
    id: "kazuya-kinoshita",
    name: "Kazuya Kinoshita",
    gender: "Masculino",
    origin: "Rent-a-Girlfriend",
    role: "Protagonista Masculino",
    archetype: "Nerd / Desajeitado Persistente",
    status: "Noivado Falso / Coabitação",
    debutArc: "Universitário / Coabitação",
    quote: "Mizuhara! Eu vou produzir um filme inteiro para você se tornar a maior estrela do Japão!",
    techniques: ["Financiamento Coletivo de Longa-Metragem", "Capacidade Infinita de Pagar Aluguel por Encontro"],
    wikiDomain: "kanojo-okarishimasu",
    wikiTitle: "Kazuya_Kinoshita"
  },
  {
    id: "ruka-sarashina",
    name: "Ruka Sarashina",
    gender: "Feminino",
    origin: "Rent-a-Girlfriend",
    role: "Falsa Namorada / Concorrente",
    archetype: "Deredere / Apaixonada Implacável",
    status: "Em Disputa / Harém",
    debutArc: "Universitário",
    quote: "Kazuya-kun faz meu batimento cardíaco finalmente passar de 90 BPM! Eu sou sua namorada de verdade!",
    techniques: ["Monitor Cardíaco no Pulso", "Ataque Frontal Inabalável de Ciúmes"],
    wikiDomain: "kanojo-okarishimasu",
    wikiTitle: "Ruka_Sarashina"
  },
  {
    id: "mami-nanami",
    name: "Mami Nanami",
    gender: "Feminino",
    origin: "Rent-a-Girlfriend",
    role: "Ex-Namorada / Antagonista",
    archetype: "Yandere / Do-S Manipuladora",
    status: "Solteiro(a)",
    debutArc: "Universitário",
    quote: "Kazu-kun... você achou mesmo que encontraria o amor verdadeiro depois de terminar comigo?",
    techniques: ["Manipulação Psicológica em Redes Sociais", "Sorriso Falso Inocente"],
    wikiDomain: "kanojo-okarishimasu",
    wikiTitle: "Mami_Nanami"
  },
  {
    id: "sumi-sakurasawa",
    name: "Sumi Sakurasawa",
    gender: "Feminino",
    origin: "Rent-a-Girlfriend",
    role: "Namorada de Aluguel Tímida",
    archetype: "Dandere Extrema / Pura e Meiga",
    status: "Paixão Não Correspondida",
    debutArc: "Universitário",
    quote: "... (Acena timidamente com cartazes fofos para se comunicar)",
    techniques: ["Comunicação Gestual Fofa", "Esforço Monumental para Falar em Público"],
    wikiDomain: "kanojo-okarishimasu",
    wikiTitle: "Sumi_Sakurasawa"
  },

  // ── 7. Meu Anjo de Vizinha Me Mima Demais ──────────────────────────────
  {
    id: "mahiru-shiina",
    name: "Mahiru Shiina (O Anjo)",
    gender: "Feminino",
    origin: "Meu Anjo de Vizinha Me Mima Demais",
    role: "Heroína Principal / Vizinha",
    archetype: "Kuudere / Deredere Doméstica",
    status: "Namorando",
    debutArc: "Coabitação / Vida Sob o Mesmo Teto",
    quote: "Fujimiya-san, se você continuar comendo porcarias e deixando seu quarto imundo, terei que vir aqui cozinhar todos os dias!",
    techniques: ["Culinária Caseira Perfeita de Conforto", "Guarda-Chuva Sob a Tempestade", "Aura Angelical da Escola"],
    wikiDomain: "otonari-no-tenshi-sama",
    wikiTitle: "Mahiru_Shiina"
  },
  {
    id: "amane-fujimiya",
    name: "Amane Fujimiya",
    gender: "Masculino",
    origin: "Meu Anjo de Vizinha Me Mima Demais",
    role: "Protagonista Masculino",
    archetype: "Dandere / Reservado Carinhoso",
    status: "Namorando",
    debutArc: "Coabitação / Vida Sob o Mesmo Teto",
    quote: "Shiina... você não é um anjo inalcançável. Você é apenas uma garota preciosa que eu quero fazer feliz todos os dias.",
    techniques: ["Cuidado Afetuoso e Paciência", "Limpeza Mútua de Apartamento"],
    wikiDomain: "otonari-no-tenshi-sama",
    wikiTitle: "Amane_Fujimiya"
  },

  // ── 8. Alya Sometimes Hides Her Feelings in Russian (Roshidere) ────────
  {
    id: "alya-kujou",
    name: "Alisa Mikhailovna Kujou (Alya)",
    gender: "Feminino",
    origin: "Alya Sometimes Hides Her Feelings in Russian",
    role: "Heroína Principal",
    archetype: "Tsundere Russa / Ojou-sama",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "Iskrenne govorya, ya lyublyu tebya... (Mas em japonês: Você é tão preguiçoso, Kuze-kun!)",
    techniques: ["Confissões de Amor Apaixonadas em Russo", "Cabelos Prateados Deslumbrantes", "Candidatura à Presidência do Conselho Estudantil"],
    wikiDomain: "roshidere",
    wikiTitle: "Alisa_Mikhailovna_Kujou"
  },
  {
    id: "masachika-kuze",
    name: "Masachika Kuze",
    gender: "Masculino",
    origin: "Alya Sometimes Hides Her Feelings in Russian",
    role: "Protagonista Masculino",
    archetype: "Deredere / Otaku Fluente em Russo",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "Ela acha que não entendo russo... Mas cada palavra fofa e embaraçosa que ela sussurra vai direto no meu coração!",
    techniques: ["Fluência Secreta em Língua Russa", "Estratégia Eleitoral Escolar de Alto Q.I."],
    wikiDomain: "roshidere",
    wikiTitle: "Masachika_Kuze"
  },
  {
    id: "yuki-suou",
    name: "Yuki Suou",
    gender: "Feminino",
    origin: "Alya Sometimes Hides Her Feelings in Russian",
    role: "Irmã Falsa / Nobre Rival",
    archetype: "Do-S / Otaku Camuflada",
    status: "Irmã / Família",
    debutArc: "Ensino Médio",
    quote: "Meu querido irmão Masachika... quando as portas se fecham, nós somos otakus inseparáveis!",
    techniques: ["Comportamento Perfeito da Aristocracia Suou", "Provocações Provocantes ao Irmão"],
    wikiDomain: "roshidere",
    wikiTitle: "Yuki_Suou"
  },

  // ── 9. Don't Toy with Me, Miss Nagatoro ────────────────────────────────
  {
    id: "hayase-nagatoro",
    name: "Hayase Nagatoro",
    gender: "Feminino",
    origin: "Don't Toy with Me Miss Nagatoro",
    role: "Heroína Principal",
    archetype: "Do-S / Gyaru Brincalhona",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Kimo-kimo... Senpai, você é tão pervertido e tímido! Mas só eu tenho o direito de zoar com você!",
    techniques: ["Provocações Físicas e Caretas Flexíveis", "Faixa Preta de Judô Tradicional"],
    wikiDomain: "nagatoro",
    wikiTitle: "Hayase_Nagatoro"
  },
  {
    id: "naoto-hachioji",
    name: "Naoto Hachioji (Senpai)",
    gender: "Masculino",
    origin: "Don't Toy with Me Miss Nagatoro",
    role: "Protagonista Masculino",
    archetype: "Dandere / Artista Tímido",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Nagatoro... eu quero desenhar você mais do que qualquer paisagem do mundo.",
    techniques: ["Pintura a Óleo e Retratos Vivos", "Coragem de Declarar seus Sentimentos"],
    wikiDomain: "nagatoro",
    wikiTitle: "Naoto_Hachiouji"
  },

  // ── 10. The 100 Girlfriends Who Really, Really Love You ────────────────
  {
    id: "rentarou-aijou",
    name: "Rentarou Aijou (O Monstro do Amor)",
    gender: "Masculino",
    origin: "The 100 Girlfriends Who Really Love You",
    role: "Protagonista Masculino Supremo",
    archetype: "Deredere Divino / Amor Infinito",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "Se qualquer uma das minhas 100 namoradas chorar, eu desafiarei os próprios deuses para fazê-la sorrir!",
    techniques: ["Amor Absoluto por 100 Almas Gêmeas", "Força Sobre-humana Alimentada pelo Amor", "Monólogo de Confissão de Duas Páginas Sem Fôlego"],
    wikiDomain: "100kanojo",
    wikiTitle: "Rentarou_Aijou"
  },
  {
    id: "hakari-hanazono",
    name: "Hakari Hanazono",
    gender: "Feminino",
    origin: "The 100 Girlfriends Who Really Love You",
    role: "Heroína do Harém (1ª Namorada)",
    archetype: "Deredere / Apaixonada Ojou-sama",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "Rentarou-kun! Meu coração e meu corpo estão fervendo de amor por você!",
    techniques: ["Ataque de Afeto Ultra-Sedutor", "Planejamento Romântico Conspiratório com Karane"],
    wikiDomain: "100kanojo",
    wikiTitle: "Hakari_Hanazono"
  },
  {
    id: "karane-inda",
    name: "Karane Inda",
    gender: "Feminino",
    origin: "The 100 Girlfriends Who Really Love You",
    role: "Heroína do Harém (2ª Namorada)",
    archetype: "Tsundere de Força Brutal",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "N-Não é como se eu quisesse beijar você, seu idiota! Hmph!",
    techniques: ["Soco Tsundere que Quebra Concreto", "Twintails Eletrizadas de Vergonha"],
    wikiDomain: "100kanojo",
    wikiTitle: "Karane_Inda"
  },
  {
    id: "shizuka-yoshimoto",
    name: "Shizuka Yoshimoto",
    gender: "Feminino",
    origin: "The 100 Girlfriends Who Really Love You",
    role: "Heroína do Harém (3ª Namorada)",
    archetype: "Dandere / Rato de Biblioteca",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "... (Usa aplicativo de celular para ler passagens de livros românticos)",
    techniques: ["Comunicação por Textos de Livro com Voz Digital", "Fofura Animal Silvestre"],
    wikiDomain: "100kanojo",
    wikiTitle: "Shizuka_Yoshimoto"
  },
  {
    id: "nano-eiai",
    name: "Nano Eiai",
    gender: "Feminino",
    origin: "The 100 Girlfriends Who Really Love You",
    role: "Heroína do Harém (4ª Namorada)",
    archetype: "Kuudere / Eficiência Lógica Pura",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "Sentimentos amorosos são ineficientes... a não ser quando se trata de Rentarou.",
    techniques: ["Cálculo Otimizado de Tempo e Eficiência", "Memória Fotográfica Absoluta"],
    wikiDomain: "100kanojo",
    wikiTitle: "Nano_Eiai"
  },
  {
    id: "kusuri-yakuzen",
    name: "Kusuri Yakuzen",
    gender: "Feminino",
    origin: "The 100 Girlfriends Who Really Love You",
    role: "Heroína do Harém (5ª Namorada)",
    archetype: "Cientista Maluca / Bakadere",
    status: "Em Disputa / Harém",
    debutArc: "Ensino Médio",
    quote: "Yay, nanoda! Minhas drogas químicas resolvem qualquer problema, nanoda!",
    techniques: ["Elixires Químicos Bizarros", "Metamorfose entre Forma Infantil e Adulta"],
    wikiDomain: "100kanojo",
    wikiTitle: "Kusuri_Yakuzen"
  },

  // ── 11. TONIKAWA: Over The Moon For You ─────────────────────────────────
  {
    id: "tsukasa-yuzaki",
    name: "Tsukasa Yuzaki (Tsukuyomi)",
    gender: "Feminino",
    origin: "TONIKAWA: Over The Moon For You",
    role: "Heroína Principal / Esposa",
    archetype: "Kuudere / Deredere Apaixonada",
    status: "Casados",
    quote: "Eu só concordei em sair com você se a gente se casasse primeiro! Agora somos marido e mulher para sempre.",
    techniques: ["Imortalidade da Princesa da Lua Kaguyahime", "Culinária e Vida a Dois Aconchegante", "Amor por Filmes e Jogos Retrô"],
    wikiDomain: "tonikaku-kawaii",
    wikiTitle: "Tsukasa_Yuzaki"
  },
  {
    id: "nasa-yuzaki",
    name: "Nasa Yuzaki",
    gender: "Masculino",
    origin: "TONIKAWA: Over The Moon For You",
    role: "Protagonista Masculino / Marido",
    archetype: "Gênio Prático / Amor Devoto",
    status: "Casados",
    quote: "Meu nome é Nasa, e eu vou voar mais rápido que a luz para provar que meu amor pela minha esposa é infinito!",
    techniques: ["Cálculo Mental Instantâneo de Engenharia", "Devoção Inabalável à Esposa Tsukasa"],
    wikiDomain: "tonikaku-kawaii",
    wikiTitle: "Nasa_Yuzaki"
  },

  // ── 12. More than a Married Couple, but Not Lovers (Fuufu Ijou) ────────
  {
    id: "akari-watanabe",
    name: "Akari Watanabe",
    gender: "Feminino",
    origin: "More than a Married Couple but Not Lovers",
    role: "Heroína Principal / Falsa Esposa",
    archetype: "Gyaru / Tsundere Doce",
    status: "Noivado Falso / Coabitação",
    debutArc: "Coabitação / Treinamento de Casais",
    quote: "Jiro! Não pense que só porque estamos fingindo ser casados você pode olhar pras minhas pernas... bobo!",
    techniques: ["Moda Gyaru Estilosa", "Cuidados Amorosos e Jantares em Coabitação"],
    wikiDomain: "fuufu-ijou",
    wikiTitle: "Akari_Watanabe"
  },
  {
    id: "jiro-yakuin",
    name: "Jiro Yakuin",
    gender: "Masculino",
    origin: "More than a Married Couple but Not Lovers",
    role: "Protagonista Masculino",
    archetype: "Dandere / Gamer Introvertido",
    status: "Noivado Falso / Coabitação",
    debutArc: "Coabitação / Treinamento de Casais",
    quote: "Nosso objetivo era conseguir nota A para trocar de parceiros... mas por que não quero me separar de você, Akari?",
    techniques: ["Treinamento Prático de Casamento Escolar", "Apoio Sincero nas Dificuldades"],
    wikiDomain: "fuufu-ijou",
    wikiTitle: "Jirou_Yakuin"
  },

  // ── 13. Tomo-chan Is a Girl! ───────────────────────────────────────────
  {
    id: "tomo-aizawa",
    name: "Tomo Aizawa",
    gender: "Feminino",
    origin: "Tomo-chan Is a Girl",
    role: "Heroína Principal",
    archetype: "Tomboy / Tsundere Forte",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Jun! Eu me confessei pra você! Quando é que você vai começar a me ver como uma garota de verdade?!",
    techniques: ["Golpes Demolidores de Karatê Tradicional", "Esforço para Usar Saias e Agir Fofo"],
    wikiDomain: "tomo-chan-wa-onnanoko",
    wikiTitle: "Tomo_Aizawa"
  },
  {
    id: "junichirou-kubota",
    name: "Junichirou Kubota (Jun)",
    gender: "Masculino",
    origin: "Tomo-chan Is a Girl",
    role: "Protagonista Masculino",
    archetype: "Deredere / Cabeça-Dura Leal",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Tomo é meu melhor amigo desde criança... Mas agora meu coração dispara toda vez que olho nos olhos dela!",
    techniques: ["Resistência e Músculos de Judô", "Instinto Protetor Inabalável"],
    wikiDomain: "tomo-chan-wa-onnanoko",
    wikiTitle: "Junichirou_Kubota"
  },

  // ── 14. Shikimori's Not Just a Cutie ───────────────────────────────────
  {
    id: "micchon-shikimori",
    name: "Micchon Shikimori",
    gender: "Feminino",
    origin: "Shikimori's Not Just a Cutie",
    role: "Heroína Principal",
    archetype: "Deredere / Protetora Incrível (Ikemen)",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Izumi-san, eu não sou apenas uma garota fofa. Eu vou te proteger de qualquer azar deste mundo!",
    techniques: ["Olhar Frio Badass de Guarda-Costas", "Reflexos Atléticos Instantâneos de Proteção"],
    wikiDomain: "shikimori",
    wikiTitle: "Micchon_Shikimori"
  },
  {
    id: "yuu-izumi",
    name: "Yuu Izumi",
    gender: "Masculino",
    origin: "Shikimori's Not Just a Cutie",
    role: "Protagonista Masculino",
    archetype: "Dandere / Imã de Azar",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Eu atraio todos os acidentes possíveis, mas ter a Shikimori-san ao meu lado é a maior sorte da minha vida!",
    techniques: ["Resiliência Inabalável contra Má Sorte Extrema", "Gentileza Infinita com Todos"],
    wikiDomain: "shikimori",
    wikiTitle: "Yuu_Izumi"
  },

  // ── 15. The Duke of Death and His Maid ─────────────────────────────────
  {
    id: "duke-bocchan",
    name: "Duke (Bocchan)",
    gender: "Masculino",
    origin: "The Duke of Death and His Maid",
    role: "Protagonista Masculino",
    archetype: "Deredere / Amaldiçoado Solitário",
    status: "Casados",
    debutArc: "Mansão Isolada / Época Vitoriana",
    quote: "Eu fui amaldiçoado: tudo o que eu tocar morrerá na hora. Alice... meu maior desejo é poder segurar sua mão.",
    techniques: ["Música e Piano de Concerto", "Toque da Morte Vegetal e Animal (Maldição Quebrada)"],
    wikiDomain: "shinigami-bocchan",
    wikiTitle: "Bocchan"
  },
  {
    id: "alice-lendrott",
    name: "Alice Lendrott",
    gender: "Feminino",
    origin: "The Duke of Death and His Maid",
    role: "Heroína Principal / Criada",
    archetype: "Do-S / Provocadora Romântica",
    status: "Casados",
    debutArc: "Mansão Isolada / Época Vitoriana",
    quote: "Bocchan, você fica tão fofo quando fica corado com as minhas provocações!",
    techniques: ["Vestido Vitoriano com Espartilho", "Provocações no Limite da Distância de Segurança"],
    wikiDomain: "shinigami-bocchan",
    wikiTitle: "Alice_Lendrott"
  },

  // ── 16. Masamune-kun's Revenge ─────────────────────────────────────────
  {
    id: "masamune-makabe",
    name: "Masamune Makabe",
    gender: "Masculino",
    origin: "Masamune-kun's Revenge",
    role: "Protagonista Masculino",
    archetype: "Deredere / Narcisista Falso",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Eu mudei meu corpo e meu nome por 8 anos para fazer a Princesa Brutal se apaixonar e então rejeitá-la!",
    techniques: ["Musculação e Dieta Rígida Sem Calorias", "Plano de Vingança do Porquinho"],
    wikiDomain: "masamune-kuns-revenge",
    wikiTitle: "Masamune_Makabe"
  },
  {
    id: "aki-adagaki",
    name: "Aki Adagaki (A Princesa Brutal)",
    gender: "Feminino",
    origin: "Masamune-kun's Revenge",
    role: "Heroína Principal",
    archetype: "Tsundere / Ojou-sama com Apetite Voraz",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Homens são patéticos e merecem apelidos humilhantes! Mas... por que você nunca desiste de mim, Makabe?",
    techniques: ["Apelidos Destruidores de Autoestima", "Lanches Escondidos de Três Porções"],
    wikiDomain: "masamune-kuns-revenge",
    wikiTitle: "Aki_Adagaki"
  },

  // ── 17. Oregairu (Yahari Ore no Seishun Love Come) ─────────────────────
  {
    id: "hachiman-hikigaya",
    name: "Hachiman Hikigaya",
    gender: "Masculino",
    origin: "Oregairu",
    role: "Protagonista Masculino",
    archetype: "Nerd / Olhos de Peixe Morto Cínico",
    status: "Namorando",
    debutArc: "Ensino Médio (Clube de Serviços)",
    quote: "A juventude é uma ilusão criada por hipócritas... Mas mesmo assim, eu quero algo genuíno!",
    techniques: ["Auto-Sacrifício Social para Resolver Conflitos", "Olhos de Peixe Podre Intransponíveis"],
    wikiDomain: "oregairu",
    wikiTitle: "Hachiman_Hikigaya"
  },
  {
    id: "yukino-yukinoshita",
    name: "Yukino Yukinoshita",
    gender: "Feminino",
    origin: "Oregairu",
    role: "Heroína Principal",
    archetype: "Kuudere / Donzela de Gelo",
    status: "Namorando",
    debutArc: "Ensino Médio (Clube de Serviços)",
    quote: "Se você se machucar para salvar os outros de novo, Hikigaya-kun... eu nunca vou perdoar você.",
    techniques: ["Língua Afiada Lógica Imbatível", "Amor Secreto por Pan-san (O Panda)"],
    wikiDomain: "oregairu",
    wikiTitle: "Yukino_Yukinoshita"
  },
  {
    id: "yui-yuigahama",
    name: "Yui Yuigahama",
    gender: "Feminino",
    origin: "Oregairu",
    role: "Heroína / Membro do Clube",
    archetype: "Deredere / Doce e Compreensiva",
    status: "Paixão Não Correspondida",
    debutArc: "Ensino Médio (Clube de Serviços)",
    quote: "Yahallo! Eu quero tudo... Eu quero que nós três continuemos juntos pra sempre!",
    techniques: ["Sable Cookies Queimados", "Leitura de Atmosfera Social Escolar"],
    wikiDomain: "oregairu",
    wikiTitle: "Yui_Yuigahama"
  },

  // ── 18. Bunny Girl Senpai ──────────────────────────────────────────────
  {
    id: "mai-sakurajima",
    name: "Mai Sakurajima",
    gender: "Feminino",
    origin: "Rascal Does Not Dream of Bunny Girl Senpai",
    role: "Heroína Principal",
    archetype: "Kuudere / Tsundere Madura",
    status: "Namorando",
    debutArc: "Ensino Médio / Síndrome da Puberdade",
    quote: "Sakuta... se eu esquecer de você ou desaparecer da vista de todos, você ainda vai se lembrar de mim?",
    techniques: ["Fantasia de Coelhinha na Biblioteca", "Atriz Nacional Famosa", "Pisar no Pé de Sakuta com Carinho"],
    wikiDomain: "aobuta",
    wikiTitle: "Mai_Sakurajima"
  },
  {
    id: "sakuta-azusagawa",
    name: "Sakuta Azusagawa",
    gender: "Masculino",
    origin: "Rascal Does Not Dream of Bunny Girl Senpai",
    role: "Protagonista Masculino",
    archetype: "Deredere / Cara de Pau Sem Vergonha",
    status: "Namorando",
    debutArc: "Ensino Médio / Síndrome da Puberdade",
    quote: "Mai-san! Eu amo você mais do que a minha própria vida! Eu gritarei seu nome no meio do pátio escolar!",
    techniques: ["Declaração aos Berros no Pátio", "Resolução da Síndrome da Puberdade"],
    wikiDomain: "aobuta",
    wikiTitle: "Sakuta_Azusagawa"
  },

  // ── 19. Shigatsu wa Kimi no Uso ────────────────────────────────────────
  {
    id: "kaori-miyazono",
    name: "Kaori Miyazono",
    gender: "Feminino",
    origin: "Shigatsu wa Kimi no Uso",
    role: "Heroína Principal",
    archetype: "Deredere / Espírito Livre Musical",
    status: "Paixão Não Correspondida",
    debutArc: "Ensino Médio / Concertos Musicais",
    quote: "Kousei... você conseguiu me alcançar? A primavera que te conheci foi uma mentira cheia de cores.",
    techniques: ["Violino Apaixonado e Rebelde", "Carta de Despedida de Abril"],
    wikiDomain: "shigatsu-wa-kimi-no-uso",
    wikiTitle: "Kaori_Miyazono"
  },
  {
    id: "kousei-arima",
    name: "Kousei Arima",
    gender: "Masculino",
    origin: "Shigatsu wa Kimi no Uso",
    role: "Protagonista Masculino",
    archetype: "Dandere / Pianista Prodigioso",
    status: "Solteiro(a)",
    debutArc: "Ensino Médio / Concertos Musicais",
    quote: "A música transcende as palavras... Quando toco, eu consigo ver você sorrindo no palco de novo.",
    techniques: ["Piano de Metrônomo Humano", "Tocar com as Cores de Kaori"],
    wikiDomain: "shigatsu-wa-kimi-no-uso",
    wikiTitle: "Kousei_Arima"
  },

  // ── 20. Kimi ni Todoke ─────────────────────────────────────────────────
  {
    id: "sawako-kuronuma",
    name: "Sawako Kuronuma (Sadako)",
    gender: "Feminino",
    origin: "Kimi ni Todoke",
    role: "Heroína Principal",
    archetype: "Dandere / Pura e Radiante",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Kazehaya-kun é como o sol que iluminou todas as sombras ao meu redor.",
    techniques: ["Aura Espiritual Involuntária", "Doces e Chocolates Feitos à Mão"],
    wikiDomain: "kiminitodoke",
    wikiTitle: "Sawako_Kuronuma"
  },
  {
    id: "shouta-kazehaya",
    name: "Shouta Kazehaya",
    gender: "Masculino",
    origin: "Kimi ni Todoke",
    role: "Protagonista Masculino",
    archetype: "Deredere / Menino de Ouro Popular",
    status: "Namorando",
    debutArc: "Ensino Médio",
    quote: "Kuronuma... eu não consigo tirar meus olhos de você desde o dia em que nos vimos sob as cerejeiras.",
    techniques: ["Sorriso Solar que Conquista a Todos", "Honestidade Emocional Cristalina"],
    wikiDomain: "kiminitodoke",
    wikiTitle: "Shouta_Kazehaya"
  },

  // ── 21. The Dangers in My Heart (BokuYaba) ─────────────────────────────
  {
    id: "anna-yamada",
    name: "Anna Yamada",
    gender: "Feminino",
    origin: "The Dangers in My Heart",
    role: "Heroína Principal",
    archetype: "Deredere / Modelo Alta e Glutona",
    status: "Namorando",
    debutArc: "Ensino Médio (Biblioteca Escolar)",
    quote: "Ichikawa... se esconda aqui comigo na biblioteca para dividirmos meus doces!",
    techniques: ["Comer Lanches Secretos na Biblioteca", "Abraço de Altura Protetor"],
    wikiDomain: "bokuyaba",
    wikiTitle: "Anna_Yamada"
  },
  {
    id: "kyotaro-ichikawa",
    name: "Kyotaro Ichikawa",
    gender: "Masculino",
    origin: "The Dangers in My Heart",
    role: "Protagonista Masculino",
    archetype: "Dandere / Chunibyo em Cura",
    status: "Namorando",
    debutArc: "Ensino Médio (Biblioteca Escolar)",
    quote: "Eu costumava pensar em coisas sombrias... Mas agora eu só quero proteger o sorriso puro da Yamada.",
    techniques: ["Leitura de Enciclopédias de Casos Estranhos", "Cavalheirismo Silencioso"],
    wikiDomain: "bokuyaba",
    wikiTitle: "Kyotaro_Ichikawa"
  },

  // ── 22. Nisekoi ────────────────────────────────────────────────────────
  {
    id: "chitoge-kirisaki",
    name: "Chitoge Kirisaki",
    gender: "Feminino",
    origin: "Nisekoi",
    role: "Heroína Principal / Falsa Namorada",
    archetype: "Tsundere / Meia-Americana Forte",
    status: "Casados",
    debutArc: "Ensino Médio",
    quote: "Moyashi! (Seu palmito magrelo!) Não pense que gosto de fingir ser sua namorada!",
    techniques: ["Soco de Gorila Feroz", "Fita de Cabelo Vermelha Lendária"],
    wikiDomain: "nisekoi",
    wikiTitle: "Chitoge_Kirisaki"
  },
  {
    id: "raku-ichijou",
    name: "Raku Ichijou",
    gender: "Masculino",
    origin: "Nisekoi",
    role: "Protagonista Masculino",
    archetype: "Deredere / Herdeiro Yakuza Cuidadoso",
    status: "Casados",
    debutArc: "Ensino Médio",
    quote: "Eu só queria encontrar a garota da promessa do cadeado de dez anos atrás!",
    techniques: ["Cadeado da Promessa de Infância", "Cozinha Doméstica que Acalma Yakuzas"],
    wikiDomain: "nisekoi",
    wikiTitle: "Raku_Ichijou"
  },
  {
    id: "kosaki-onodera",
    name: "Kosaki Onodera",
    gender: "Feminino",
    origin: "Nisekoi",
    role: "Heroína / A Paixão de Infância",
    archetype: "Dandere / Doce e Gentil",
    status: "Paixão Não Correspondida",
    debutArc: "Ensino Médio",
    quote: "Ichijou-kun... se eu dissesse que você é a pessoa da minha promessa, você acreditaria?",
    techniques: ["Chave da Promessa", "Confeitaria Doce Japonesa Familiar"],
    wikiDomain: "nisekoi",
    wikiTitle: "Kosaki_Onodera"
  },

  // ── 23. Clannad ────────────────────────────────────────────────────────
  {
    id: "nagisa-furukawa",
    name: "Nagisa Furukawa (Okazaki)",
    gender: "Feminino",
    origin: "Clannad",
    role: "Heroína Principal / Esposa",
    archetype: "Dandere / Doce e Frágil",
    status: "Casados",
    quote: "Dango, dango, dango, dango, dango daikazoku... Tomoya-kun, o clube de teatro renasceu!",
    techniques: ["Canção da Grande Família Dango", "Teatro Dramático Emocional"],
    wikiDomain: "clannad",
    wikiTitle: "Nagisa_Furukawa"
  },
  {
    id: "tomoya-okazaki",
    name: "Tomoya Okazaki",
    gender: "Masculino",
    origin: "Clannad",
    role: "Protagonista Masculino",
    archetype: "Deredere / Pai Protetor Redimido",
    status: "Casados",
    quote: "Nagisa... você mudou a minha vida inteira. Eu nunca me arrependerei de ter te conhecido naquela ladeira de cerejeiras.",
    techniques: ["Trabalho Duro de Eletricista", "Amor Eterno por Ushio e Nagisa"],
    wikiDomain: "clannad",
    wikiTitle: "Tomoya_Okazaki"
  },

  // ── 24. Fruits Basket ──────────────────────────────────────────────────
  {
    id: "tohru-honda",
    name: "Tohru Honda",
    gender: "Feminino",
    origin: "Fruits Basket",
    role: "Heroína Principal",
    archetype: "Deredere / Bondade Curativa Absoluta",
    status: "Casados",
    quote: "A maldição não pode apagar o amor e o calor que vocês têm no coração!",
    techniques: ["Abraço Curador de Almas Feridas", "Cozinha Caseira que Conforta o Clã Sohma"],
    wikiDomain: "fruitsbasket",
    wikiTitle: "Tohru_Honda"
  },
  {
    id: "kyo-sohma",
    name: "Kyo Sohma (O Gato Amaldiçoado)",
    gender: "Masculino",
    origin: "Fruits Basket",
    role: "Protagonista Masculino",
    archetype: "Tsundere Feral / Redimido",
    status: "Casados",
    quote: "Tohru... quando você me viu na minha forma verdadeira e não fugiu de medo... eu soube que nunca mais te soltaria.",
    techniques: ["Artes Marciais do Estilo Sohma", "Superação da Forma Verdadeira Monstruosa"],
    wikiDomain: "fruitsbasket",
    wikiTitle: "Kyo_Sohma"
  }
];

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

async function fetchWikiThumbnail(domain, title) {
  const url = `https://${domain}.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=600&format=json&redirects=1`;
  try {
    const res = await fetch(url, {
      headers: {
        ...defaultHeaders,
        'Referer': `https://${domain}.fandom.com/`
      }
    });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (e) {
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
  const outDir = path.resolve('public/avatars/romance');
  const jsonDir = path.resolve('src/data/animes/romance');
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(jsonDir, { recursive: true });

  const finalChars = [];
  console.log(`Processing ${ROMANCE_CHARACTERS.length} Romance characters...`);

  for (let i = 0; i < ROMANCE_CHARACTERS.length; i++) {
    const c = ROMANCE_CHARACTERS[i];
    const outPath = path.join(outDir, `${c.id}.png`);
    const avatarRelative = `/avatars/romance/${c.id}.png`;

    finalChars.push({
      id: c.id,
      name: c.name,
      gender: c.gender,
      origin: c.origin,
      role: c.role,
      archetype: c.archetype,
      status: c.status,
      debutArc: c.debutArc,
      quote: c.quote,
      techniques: c.techniques,
      avatar: avatarRelative
    });

    if (fs.existsSync(outPath)) {
      console.log(`[${i+1}/${ROMANCE_CHARACTERS.length}] ${c.name} -> already exists.`);
      continue;
    }

    const domain = c.wikiDomain || 'kaguya';
    const title = c.wikiTitle || c.name;
    const thumbUrl = await fetchWikiThumbnail(domain, title);
    if (thumbUrl) {
      try {
        const res = await fetch(thumbUrl, {
          headers: {
            ...defaultHeaders,
            'Referer': `https://${domain}.fandom.com/`
          }
        });
        const buf = Buffer.from(await res.arrayBuffer());
        await processAvatar(buf, outPath);
        console.log(`[${i+1}/${ROMANCE_CHARACTERS.length}] ${c.name} -> saved.`);
      } catch (err) {
        console.error(`Error saving ${c.name}:`, err.message);
      }
    } else {
      console.warn(`[${i+1}/${ROMANCE_CHARACTERS.length}] ${c.name} -> No thumb found on ${domain} for ${title}`);
    }
  }

  const jsonPath = path.join(jsonDir, 'characters.json');
  fs.writeFileSync(jsonPath, JSON.stringify(finalChars, null, 2), 'utf8');
  console.log(`Wrote ${finalChars.length} characters to ${jsonPath}`);
}

run();
