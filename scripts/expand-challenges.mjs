import fs from 'fs';

const content = fs.readFileSync('src/data/exclusiveChallenges.ts', 'utf8');
const start = content.indexOf(' = [') + 3;
const end = content.lastIndexOf('];');
const challenges = JSON.parse(content.slice(start, end + 1));

// Fixes
for (const ch of challenges) {
  if (ch.id === 'exc-ds-respiracao-agua-geral') {
    ch.targetCharacterId = 'tanjiro-kamado-human';
    ch.targetCharacterName = 'Tanjiro Kamado (Caçador)';
    ch.validCharacterIds = ['tanjiro-kamado-human', 'giyu-tomioka', 'sakonji-urokodaki', 'sabito', 'makomo', 'murata'];
  }
  if (ch.id === 'exc-ds-hinokami-kagura-sol') {
    ch.targetCharacterId = 'tanjiro-kamado-human';
    ch.targetCharacterName = 'Tanjiro Kamado (Caçador)';
    ch.validCharacterIds = ['tanjiro-kamado-human', 'yoriichi-tsugikuni', 'tanjuro-kamado'];
  }
  if (ch.id === 'exc-ds-respiracao-trovao-zenitsu') {
    ch.validCharacterIds = ['zenitsu-agatsuma', 'jigoro-kuwajima'];
  }
  if (ch.id === 'exc-one-piece-gura-gura') {
    ch.targetCharacterId = 'edward-newgate-barba-branca';
    ch.targetCharacterName = 'Edward Newgate (Barba Branca)';
    ch.validCharacterIds = ['edward-newgate-barba-branca', 'marshall-d-teach'];
  }
}

// 25+ new Bleach challenges
const newBleach = [
  {
    id: 'exc-bleach-yamamoto-zanka',
    animeSlug: 'bleach',
    category: 'Bankai Suprema',
    questionTitle: 'A quem pertence a Bankai que concentra chamas a 15 milhões de graus?',
    targetTitle: 'Zanka no Tachi (Espada da Longa Chama Remanescente)',
    badgeTitle: 'Capitão Comandante do Gotei 13',
    targetCharacterId: 'yamamoto-genryusai',
    targetCharacterName: 'Genryusai Shigekuni Yamamoto',
    clues: [
      { label: 'Efeito de Ativação', value: 'Seca a umidade de toda a Soul Society instantaneamente ao ser liberada' },
      { label: 'Forma Sul (Minami)', value: 'Invoca os esqueletos calcinados de todos que já foram mortos pelas suas chamas' },
      { label: 'Forma Oeste (Nishi)', value: 'Cobre o corpo com uma armadura invisível de calor puro a 15.000.000 °C' }
    ]
  },
  {
    id: 'exc-bleach-shunsui-karamatsu',
    animeSlug: 'bleach',
    category: 'Bankai Teatral',
    questionTitle: 'Qual shinigami performa uma peça trágica de 4 atos que afoga ambos em desespero?',
    targetTitle: 'Katen Kyokotsu: Karamatsu Shinju (Pinheiro Lovers Suicide)',
    badgeTitle: 'Capitão da 8ª Divisão / Comandante',
    targetCharacterId: 'shunsui-kyoraku',
    targetCharacterName: 'Shunsui Kyoraku',
    clues: [
      { label: 'Aura da Bankai', value: 'Muda a atmosfera tornando o ambiente sombrio, gélido e melancólico' },
      { label: 'Terceiro Ato (Dan San)', value: 'Afoga os duelistas num abismo sem fim até que a reiatsu de um se esgote' },
      { label: 'Ato Final (Shime no Dan)', value: 'Envolve a garganta do oponente com um fio de luz branca e corta a cabeça' }
    ]
  },
  {
    id: 'exc-bleach-unohana-minazuki',
    animeSlug: 'bleach',
    category: 'Bankai Ancestral',
    questionTitle: 'Quem liberta uma lâmina viscosa de sangue puro para saciar seu desejo insaciável de batalha?',
    targetTitle: 'Minazuki (O Fim de Todas as Coisas)',
    badgeTitle: 'Primeira Kenpachi / Capitã da 4ª Divisão',
    targetCharacterId: 'retsu-unohana',
    targetCharacterName: 'Retsu Unohana (Yachiru)',
    clues: [
      { label: 'Disfarce de Séculos', value: 'Sua Shikai cura dentro do estômago de uma arraia gigante voadora' },
      { label: 'Verdadeira Natureza', value: 'A Bankai derrete a carne e ossos em sangue enquanto regenera e corta incessantemente' },
      { label: 'Títulos Lendários', value: 'Mestra das 8.000 escolas de espada e fundadora da 11ª Divisão' }
    ]
  },
  {
    id: 'exc-bleach-shinji-sakashima',
    animeSlug: 'bleach',
    category: 'Bankai de Inversão',
    questionTitle: 'Qual líder Vizard possui uma Bankai proibida que inverte aliados e inimigos em batalha em massa?',
    targetTitle: 'Sakashima Yokoshima Happofusagari',
    badgeTitle: 'Capitão da 5ª Divisão',
    targetCharacterId: 'shinji-hirako',
    targetCharacterName: 'Shinji Hirako',
    clues: [
      { label: 'Estrutura Floral', value: 'Fecha-se dentro de uma flor dourada enquanto um aroma hipnótico se espalha' },
      { label: 'Regra Crítica', value: 'Não pode ser usada perto de aliados, pois força todos ao redor a se matarem' },
      { label: 'Poder de Shikai', value: 'Sakanade: inverte todos os sentidos espaciais (cima, baixo, frente e trás)' }
    ]
  },
  {
    id: 'exc-bleach-renji-soo-zabimaru',
    animeSlug: 'bleach',
    category: 'Bankai Verdadeira',
    questionTitle: 'Qual tenente aprendeu o verdadeiro nome de sua Zanpakuto com o Esquadrão Zero?',
    targetTitle: 'Soo Zabimaru (Dois Reis da Cauda de Serpente)',
    badgeTitle: 'Tenente da 6ª Divisão',
    targetCharacterId: 'renji-abarai',
    targetCharacterName: 'Renji Abarai',
    clues: [
      { label: 'Evolução de Forma', value: 'Substituiu a gigantesca serpente óssea esquelética por uma manopla e crânio anatômico' },
      { label: 'Técnica de Finalização', value: 'Zaga Teppo: uma mandíbula espiritual esmaga e incinera o alvo' },
      { label: 'Treinamento Real', value: 'Renascido no Palácio Real de Ichibei Hyosube' }
    ]
  },
  {
    id: 'exc-bleach-sajin-dangai-joe',
    animeSlug: 'bleach',
    category: 'Técnica de Transmutação Humana',
    questionTitle: 'Quem sacrificou seu próprio coração para despojar sua armadura e se tornar imortal?',
    targetTitle: 'Kokujo Tengen Myo\'o: Dangai Joe',
    badgeTitle: 'Capitão da 7ª Divisão',
    targetCharacterId: 'sajin-komamura',
    targetCharacterName: 'Sajin Komamura',
    clues: [
      { label: 'Aparência da Bankai', value: 'Um gigante samurai colossal que espelha os golpes do seu mestre' },
      { label: 'Dangai Joe', value: 'Despojado da armadura, expondo musculatura em chamas pura e invulnerável à dor' },
      { label: 'Preço Trágico', value: 'Converteu seu usuário permanentemente em um lobo quadrúpede sem fala' }
    ]
  },
  {
    id: 'exc-bleach-kensei-tekken',
    animeSlug: 'bleach',
    category: 'Bankai Corporal',
    questionTitle: 'Qual capitão Vizard comprime a força de tufões em soqueiras de lâminas contínuas?',
    targetTitle: 'Tekken Tachikaze (Vento Cortante de Punho de Ferro)',
    badgeTitle: 'Capitão da 9ª Divisão',
    targetCharacterId: 'kensei-muguruma',
    targetCharacterName: 'Kensei Muguruma',
    clues: [
      { label: 'Mecanismo de Dano', value: 'O impacto do soco nunca cessa, explodindo energia de vento sem parar dentro do alvo' },
      { label: 'Visual de Batalha', value: 'Braçadeiras blindadas de metal cobrindo os antebraços e punhos' },
      { label: 'Passado', value: 'Salvo por Kisuke Urahara durante o incidente de holowificação há 100 anos' }
    ]
  },
  {
    id: 'exc-bleach-kenpachi-nozarashi',
    animeSlug: 'bleach',
    category: 'Despertar de Shikai & Bankai',
    questionTitle: 'Quem transformou sua espada gasta num cutelo descomunal capaz de cortar até um meteoro?',
    targetTitle: 'Nozarashi (Devore / Engula)',
    badgeTitle: '11º Kenpachi',
    targetCharacterId: 'kenpachi-zaraki',
    targetCharacterName: 'Kenpachi Zaraki',
    clues: [
      { label: 'Comando de Liberação', value: 'Beba / Engula (Nome revelado por Yachiru no leito de morte de Unohana)' },
      { label: 'Forma Demoníaca', value: 'Sua Bankai transforma sua pele em vermelho carmesim e lhe dá chifres de oni gigante' },
      { label: 'Feito Absurdo', value: 'Destruiu o vácuo espacial criado pela imaginação de Gremmy Thoumeaux' }
    ]
  },
  {
    id: 'exc-bleach-ikkaku-ryumon',
    animeSlug: 'bleach',
    category: 'Bankai Secreta',
    questionTitle: 'Qual 3º oficial manteve em segredo três lâminas pesadas ligadas por correntes com um brasão de dragão?',
    targetTitle: 'Ryumon Hozukimaru (Dragão com Crista da Lâmpada do Demônio)',
    badgeTitle: '3º Oficial da 11ª Divisão',
    targetCharacterId: 'ikkaku-madarame',
    targetCharacterName: 'Ikkaku Madarame',
    clues: [
      { label: 'Despertar Gradual', value: 'O dragão gravado na lâmina central precisa se preencher de vermelho com o combate' },
      { label: 'Segredo de Fidelidade', value: 'Escondeu sua Bankai para não ser promovido a capitão e continuar sob as ordens de Zaraki' },
      { label: 'Combate Clássico', value: 'Usada pela primeira vez contra o Arrancar Edorad Leones na cidade de Karakura' }
    ]
  },
  {
    id: 'exc-bleach-mayuri-matai',
    animeSlug: 'bleach',
    category: 'Bankai Modificada',
    questionTitle: 'Qual cientista reconfigura sua Bankai para dar à luz bebês gigantes com venenos adaptativos?',
    targetTitle: 'Konjiki Ashisogi Jizo: Matai Fukuin Shotai',
    badgeTitle: 'Presidente do Departamento de P&D',
    targetCharacterId: 'mayuri-kurotsuchi',
    targetCharacterName: 'Mayuri Kurotsuchi',
    clues: [
      { label: 'Matai Fukuin Shotai', value: 'Um bebê obeso e pálido gigante que gera novas variantes de veneno com base nos dados do inimigo' },
      { label: 'Combate Decisivo', value: 'Criou nervos sintéticos com camadas de carne para derrotar Pernida Parnkgjas' },
      { label: 'Customização Constante', value: 'Instalou mecanismos de autodestruição caso a própria Bankai tente atacá-lo' }
    ]
  },
  {
    id: 'exc-bleach-gin-kamishini',
    animeSlug: 'bleach',
    category: 'Bankai Assassina',
    questionTitle: 'Qual traidor possuía uma espada que se estende a 500 vezes a velocidade do som com veneno celular?',
    targetTitle: 'Kamishini no Yari (Lança Matadora de Deuses)',
    badgeTitle: 'Ex-Capitão da 3ª Divisão',
    targetCharacterId: 'gin-ichimaru',
    targetCharacterName: 'Gin Ichimaru',
    clues: [
      { label: 'A Falsa Verdade', value: 'Mentiu dizendo que a velocidade era seu trunfo; o verdadeiro poder é se transformar em pó momentaneamente' },
      { label: 'Veneno Letal', value: 'Deixa um fragmento milimétrico de poeira dentro do peito que dissolve as células do alvo' },
      { label: 'Objetivo de Vida', value: 'Esperou mais de 100 anos ao lado de Aizen para encontrar o momento de matá-lo por Rangiku' }
    ]
  },
  {
    id: 'exc-bleach-tosen-enma-korogi',
    animeSlug: 'bleach',
    category: 'Bankai Sensorial',
    questionTitle: 'Quem cria uma cúpula negra gigante que priva o inimigo de visão, audição, olfato e reiatsu?',
    targetTitle: 'Suzumushi Tsuishiki: Enma Korogi (Grilo do Julgamento)',
    badgeTitle: 'Ex-Capitão da 9ª Divisão',
    targetCharacterId: 'kaname-tosen',
    targetCharacterName: 'Kaname Tosen',
    clues: [
      { label: 'Privação dos Sentidos', value: 'Apenas quem estiver tocando a empunhadura da espada mantém a percepção sensorial' },
      { label: 'Ideologia de Justiça', value: 'Seguiu a justiça que acreditava causar o menor derramamento de sangue' },
      { label: 'Luta Marcante', value: 'Derrotado por Kenpachi Zaraki, que permitiu ser perfurado para segurar a lâmina' }
    ]
  },
  {
    id: 'exc-bleach-urahara-benihime',
    animeSlug: 'bleach',
    category: 'Bankai de Reestruturação',
    questionTitle: 'Qual inventor genial invoca uma mulher gigante com fios cirúrgicos que rasga e costura tudo o que toca?',
    targetTitle: 'Kannonbiraki Benihime Aratame (Modificação da Princesa Carmesim de Kannon)',
    badgeTitle: 'Criador do Hogyoku Original',
    targetCharacterId: 'kisuke-urahara',
    targetCharacterName: 'Kisuke Urahara',
    clues: [
      { label: 'Reestruturação Cirúrgica', value: 'Costura e repara órgãos destruídos de aliados e disseca fisicamente o corpo de inimigos' },
      { label: 'Combate em Warwelt', value: 'Usada para furar a barreira de Askin Nakk Le Vaar permitindo a entrada de Grimmjow' },
      { label: 'Frase Icônica', value: 'Sua Shikai responde ao comando: Cante, Benihime!' }
    ]
  },
  {
    id: 'exc-bleach-rukia-hakka-no-togame',
    animeSlug: 'bleach',
    category: 'Bankai do Zero Absoluto',
    questionTitle: 'Qual Shinigami congela tudo ao seu redor à temperatura de zero absoluto em um manto branco imaculado?',
    targetTitle: 'Hakka no Togame (Punição Branca da Névoa)',
    badgeTitle: 'Capitã da 13ª Divisão',
    targetCharacterId: 'rukia-kuchiki',
    targetCharacterName: 'Rukia Kuchiki',
    clues: [
      { label: 'Zero Absoluto', value: 'Reduz a temperatura do próprio corpo a -273,15 °C parando o fluxo molecular' },
      { label: 'Vitória Decisiva', value: 'Aniquilou As Nodt pulverizando-o em cristais de gelo sublime' },
      { label: 'Risco Extremo', value: 'Qualquer movimento brusco ao descongelar pode estilhaçar seu próprio corpo' }
    ]
  },
  {
    id: 'exc-bleach-soi-fon-jakuho',
    animeSlug: 'bleach',
    category: 'Bankai de Artilharia Pesada',
    questionTitle: 'Qual líder do Onmitsukido detesta sua Bankai porque um míssil dourado estrondoso contradiz seu estilo furtivo?',
    targetTitle: 'Jakuho Raikoben (Chicote do Trovão de Vespa)',
    badgeTitle: 'Capitã da 2ª Divisão / Comandante da Guarda',
    targetCharacterId: 'soi-fon',
    targetCharacterName: 'Soi Fon',
    clues: [
      { label: 'Contradição com Assassinato', value: 'Demasiado pesada para carregar e seu tiro gera um recuo e explosão que arruínam o sigilo' },
      { label: 'Morte em Duas Etapas', value: 'Sua Shikai Suzumebachi mata instantaneamente se acertar a mesma marca borboleta duas vezes' },
      { label: 'Amarração em Aço', value: 'Precisa se amarrar em cabos de aço pesados antes de disparar o projétil' }
    ]
  },
  {
    id: 'exc-bleach-rose-kinshara',
    animeSlug: 'bleach',
    category: 'Bankai Ilusória de Som',
    questionTitle: 'Qual capitão maestro cria dançarinos de ilusão que causam danos físicos reais caso o alvo ouça a música?',
    targetTitle: 'Kinshara Butodan (Trupe de Dança do Salgueiro Dourado)',
    badgeTitle: 'Capitão da 3ª Divisão',
    targetCharacterId: 'rojuro-otoribashi',
    targetCharacterName: 'Rojuro Otoribashi (Rose)',
    clues: [
      { label: 'Ato do Redemoinho e Chamas', value: 'Engana o cérebro com melodias sonoras gerando sensação de afogamento e fogo real' },
      { label: 'Fraqueza Exposta', value: 'Mask De Masculine furou os próprios tímpanos para anular o efeito da música' },
      { label: 'Natureza Vizard', value: 'Empunha uma Shikai parecida com um chicote fino com uma flor de ouro na ponta' }
    ]
  },
  {
    id: 'exc-bleach-sasakibe-koko-gonryo',
    animeSlug: 'bleach',
    category: 'Bankai de Tempestade e Raios',
    questionTitle: 'Qual tenente leal dominou uma Bankai de raios cósmicos que marcou o rosto de Yamamoto para sempre?',
    targetTitle: 'Koko Gonryo Rikyu (Palácio Brilhante do Dragão Amarelo)',
    badgeTitle: 'Tenente da 1ª Divisão por 2.000 anos',
    targetCharacterId: 'chojiro-sasakibe',
    targetCharacterName: 'Chojiro Sasakibe',
    clues: [
      { label: 'Manipulação Climática', value: 'Conecta o céu com uma cúpula de relâmpagos violeta canalizados pelo florete' },
      { label: 'Roubo por Driscoll Berci', value: 'Sua Bankai foi roubada pelo Sternritter O antes do início da Guerra Sangrenta' },
      { label: 'Cicatriz Lendária', value: 'O único Shinigami além de Yhwach a deixar uma cicatriz permanente no rosto de Genryusai' }
    ]
  },
  {
    id: 'exc-bleach-hisagi-kazeshini',
    animeSlug: 'bleach',
    category: 'Shikai Mortal de Dupla Lâmina',
    questionTitle: 'Quem empunha duas foices curvas presas por uma corrente longa que tem a forma de algo feito para colher vidas?',
    targetTitle: 'Kazeshini (Vento Ceifador)',
    badgeTitle: 'Tenente da 9ª Divisão',
    targetCharacterId: 'shuhei-hisagi',
    targetCharacterName: 'Shuhei Hisagi',
    clues: [
      { label: 'Comando de Liberação', value: 'Ceife / Rasgue, Kazeshini!' },
      { label: 'Filosofia de Luta', value: 'Afirma temer a própria arma porque ela não foi feita para cortar, mas sim para arrancar vidas' },
      { label: 'Tatuagem 69', value: 'Homenagem gravada na face esquerda ao capitão Kensei Muguruma que o salvou quando criança' }
    ]
  },
  {
    id: 'exc-bleach-kira-wabisuke',
    animeSlug: 'bleach',
    category: 'Shikai de Gravidade Geométrica',
    questionTitle: 'Qual shinigami melancólico empunha uma lâmina com gancho quadrado que dobra o peso de tudo o que atinge a cada golpe?',
    targetTitle: 'Wabisuke (O Penitente)',
    badgeTitle: 'Tenente da 3ª Divisão',
    targetCharacterId: 'izuru-kira',
    targetCharacterName: 'Izuru Kira',
    clues: [
      { label: 'Multiplicação de Peso', value: 'A cada golpe o peso do objeto ou adversário dobra (2x, 4x, 8x, 16x) até que ele se curve ao chão' },
      { label: 'Forma da Lâmina', value: 'Formato de gancho reto em ângulo reto de 90 graus, lembrando uma guilhotina pronta para decapitar' },
      { label: 'Comando Triste', value: 'Erga sua cabeça, Wabisuke!' }
    ]
  },
  {
    id: 'exc-bleach-aizen-kyoka-suigetsu',
    animeSlug: 'bleach',
    category: 'Hipnose Absoluta (Kanzen Saimin)',
    questionTitle: 'A quem pertence a lâmina que controla completamente os cinco sentidos de qualquer um que testemunhe sua liberação?',
    targetTitle: 'Kyoka Suigetsu (Flor no Espelho, Lua na Água)',
    badgeTitle: 'Ex-Capitão da 5ª Divisão / Rei do Hueco Mundo',
    targetCharacterId: 'sosuke-aizen',
    targetCharacterName: 'Sosuke Aizen',
    clues: [
      { label: 'Condição de Ativação', value: 'Basta ver o momento da liberação Shikai uma única vez para ficar sob controle pela vida inteira' },
      { label: 'Comando Falso e Real', value: 'Quebre, Kyoka Suigetsu! - fingiu durante décadas que sua espada era do elemento água' },
      { label: 'Unico Ponto Fraco', value: 'Apenas tocar na lâmina física antes da ativação da hipnose anula o controle' }
    ]
  },
  {
    id: 'exc-bleach-yhwach-almighty',
    animeSlug: 'bleach',
    category: 'Schrift Imperial A',
    questionTitle: 'Qual progenitor dos Quincy possui olhos com múltiplas pupilas capazes de ver e reescrever o futuro?',
    targetTitle: 'Schrift A: The Almighty (O Todo-Poderoso)',
    badgeTitle: 'Rei do Wandenreich / Filho do Rei das Almas',
    targetCharacterId: 'yhwach',
    targetCharacterName: 'Yhwach',
    clues: [
      { label: 'Reescrita Temporal', value: 'Não prevê apenas o futuro, mas pode reescrever uma linha temporal onde foi morto para ressuscitar' },
      { label: 'Auswahlen', value: 'Lança feixes de luz sagrada que roubam a força e vida de seus súditos subordinados' },
      { label: 'Derrota Final', value: 'Interrompido pela flecha de prata estagnada disparada por Uryu Ishida' }
    ]
  },
  {
    id: 'exc-bleach-jugram-the-balance',
    animeSlug: 'bleach',
    category: 'Schrift B de Retribuição',
    questionTitle: 'Quem carrega um escudo que transfere toda má sorte ou ferimentos sofridos diretamente para seu oponente?',
    targetTitle: 'Schrift B: The Balance (O Equilíbrio)',
    badgeTitle: 'Grão-Mestre dos Sternritter',
    targetCharacterId: 'jugram-haschwalth',
    targetCharacterName: 'Jugram Haschwalth',
    clues: [
      { label: 'Escudo Freund Schild', value: 'Absorve os danos corporais sofridos e os reflete em dobro como infortúnio ao agressor' },
      { label: 'Substituto da Noite', value: 'Assume os poderes do The Almighty durante as horas em que Yhwach dorme' },
      { label: 'Amizade de Infância', value: 'Cresceu ao lado de Bazz-B caçando animais na floresta dos Quincy' }
    ]
  },
  {
    id: 'exc-bleach-gerard-the-miracle',
    animeSlug: 'bleach',
    category: 'Schrift M da Glória',
    questionTitle: 'Qual membro da Guarda Real dos Quincy cresce colossalmente a cada golpe letal que recebe?',
    targetTitle: 'Schrift M: The Miracle (O Milagre)',
    badgeTitle: 'O Coração do Rei das Almas',
    targetCharacterId: 'gerard-valkyrie',
    targetCharacterName: 'Gerard Valkyrie',
    clues: [
      { label: 'Conversão de Dano em Tamanho', value: 'Qualquer ferimento mortal ou corte se transforma em gigantismo sagrado e poder incalculável' },
      { label: 'Espada Hoffnung', value: 'Se a lâmina sofrer um único arranhão, o dano é refletido imediatamente no corpo do agressor' },
      { label: 'Voz da Esperança', value: 'Impossível de ser morto por golpes físicos normais dos capitães do Gotei 13' }
    ]
  },
  {
    id: 'exc-bleach-lille-the-x-axis',
    animeSlug: 'bleach',
    category: 'Schrift X Intangível',
    questionTitle: 'Qual atirador de elite dispara tiros que atravessam tudo sem projétil físico e se transforma num querubim intangível?',
    targetTitle: 'Schrift X: The X-Axis (O Eixo X)',
    badgeTitle: 'Líder da Guarda de Elite Schutzstaffel',
    targetCharacterId: 'lille-barro',
    targetCharacterName: 'Lille Barro',
    clues: [
      { label: 'Intangibilidade Total', value: 'Quando ambos os olhos estão abertos, qualquer ataque inimigo atravessa seu corpo como luz' },
      { label: 'Arma Rifle Diagramme', value: 'Não atira balas; ele simplesmente perfura o espaço entre o cano e o alvo instantaneamente' },
      { label: 'Forma Final de Ave Divina', value: 'Transforma-se numa criatura angélica de múltiplos olhos e asas de luz luminosa' }
    ]
  },
  {
    id: 'exc-bleach-askin-the-deathdealing',
    animeSlug: 'bleach',
    category: 'Schrift D de Toxicidade',
    questionTitle: 'Quem manipula a dose letal de qualquer substância ingerida ou presente no ar, incluindo sangue e reiatsu?',
    targetTitle: 'Schrift D: The Deathdealing (O Distribuidor da Morte)',
    badgeTitle: 'Sternritter D da Guarda Schutzstaffel',
    targetCharacterId: 'askin-nakk-le-vaar',
    targetCharacterName: 'Askin Nakk Le Vaar',
    clues: [
      { label: 'Dose Letal', value: 'Pode tornar a própria água ou sangue do inimigo venenosos ao abaixar a dosagem tolerada pelo corpo' },
      { label: 'Gift Ball Deluxe', value: 'Uma esfera massiva de veneno sufocante que engoliu Ichigo, Chad e Orihime' },
      { label: 'Ponto Fraco', value: 'Surpreendido pelas garras de Pantera de Grimmjow arrancando seu coração por trás' }
    ]
  },
  {
    id: 'exc-bleach-bambietta-the-explode',
    animeSlug: 'bleach',
    category: 'Schrift E Explosivo',
    questionTitle: 'Qual Sternritter não atira bombas, mas transforma qualquer matéria que sua reiatsu tocar em uma bomba?',
    targetTitle: 'Schrift E: The Explode (A Explosão)',
    badgeTitle: 'Líder dos Bambies',
    targetCharacterId: 'bambietta-basterbine',
    targetCharacterName: 'Bambietta Basterbine',
    clues: [
      { label: 'Propriedade de Dano', value: 'Seus projéteis não podem ser bloqueados por espadas, pois a própria espada se transforma numa bomba' },
      { label: 'Derrota para Komamura', value: 'Seus ataques foram inúteis contra o gigante sem alma e sem dor Dangai Joe' },
      { label: 'Destino Sinistro', value: 'Zumbificada por Giselle Gewelle após sofrer ferimentos graves' }
    ]
  },
  {
    id: 'exc-bleach-ulquiorra-murcielago',
    animeSlug: 'bleach',
    category: 'Resurrección de Segunda Etapa',
    questionTitle: 'Qual Espada alcançou em segredo uma Segunda Etapa com asas de demônio e lanças de raio verde destruidoras?',
    targetTitle: 'Murciélago / Segunda Etapa',
    badgeTitle: '4º Espada (O Nada)',
    targetCharacterId: 'ulquiorra-cifer',
    targetCharacterName: 'Ulquiorra Cifer',
    clues: [
      { label: 'Segredo de Aizen', value: 'Nem mesmo Sosuke Aizen havia testemunhado a sua forma de Segunda Etapa' },
      { label: 'Lanza del Relámpago', value: 'Gera uma lança colossal de energia concentrada com raio de explosão que ofusca Las Noches' },
      { label: 'Percebendo o Coração', value: 'Desintegrou-se em cinzas ao tocar a mão de Orihime Inoue no topo da cúpula' }
    ]
  },
  {
    id: 'exc-bleach-grimmjow-pantera',
    animeSlug: 'bleach',
    category: 'Resurrección Selvagem',
    questionTitle: 'Quem ruge ao comando "Triture" para assumir a agilidade de um felino veloz com garras e disparos de projéteis Desgarrón?',
    targetTitle: 'Pantera (Rei dos Felinos)',
    badgeTitle: '6º Espada (A Destruição)',
    targetCharacterId: 'grimmjow-jaegerjaquez',
    targetCharacterName: 'Grimmjow Jaegerjaquez',
    clues: [
      { label: 'Comando de Liberação', value: 'Triture, Pantera!' },
      { label: 'Desgarrón', value: 'Gera dez garras colossais de reishi azul afiadas como lâminas nos dedos das mãos' },
      { label: 'Rivalidade Lendária', value: 'Batalhou até a exaustão total contra o Hollow Ichigo no deserto de Las Noches' }
    ]
  },
  {
    id: 'exc-bleach-starrk-los-lobos',
    animeSlug: 'bleach',
    category: 'Resurrección de Divisão de Alma',
    questionTitle: 'Qual Espada solitário divide sua alma em pistolas gêmeas de Cero e matilhas de lobos que explodem ao morder?',
    targetTitle: 'Los Lobos (A Matilha de Lobos)',
    badgeTitle: '1º Espada (A Solidão)',
    targetCharacterId: 'coyote-starrk',
    targetCharacterName: 'Coyote Starrk',
    clues: [
      { label: 'Fusão com Lilynette', value: 'Sua Zanpakuto não é uma espada convencional, mas sim a alma da sua parceira Lilynette Gingerbuck' },
      { label: 'Metralhadora de Ceros', value: 'Cero Metralleta: dispara mais de 1.000 feixes azuis simultâneos em frações de segundo' },
      { label: 'Lobos Espirituais', value: 'Lobos feitos de fragmentos de sua própria alma que detonam com impacto devastador' }
    ]
  },
  {
    id: 'exc-bleach-baraggan-arrogante',
    animeSlug: 'bleach',
    category: 'Resurrección da Senescência',
    questionTitle: 'Qual antigo rei do Hueco Mundo apodrece e envelhece instantaneamente qualquer matéria ou Kido com a fumaça Respira?',
    targetTitle: 'Arrogante (O Grande Imperador da Morte)',
    badgeTitle: '2º Espada (A Senescência / Envelhecimento)',
    targetCharacterId: 'baraggan-louisenbairn',
    targetCharacterName: 'Baraggan Louisenbairn',
    clues: [
      { label: 'Respira', value: 'Uma névoa negra corrosiva que desfaz ossos, pedras e encantamentos mágicos pelo envelhecimento temporal' },
      { label: 'Coroa de Caveira', value: 'Assume a forma de um esqueleto com coroa de ouro e um machado de batalha negro' },
      { label: 'Derrota com o Próprio Poder', value: 'Hachigen Ushoda teletransportou a própria mão infectada para dentro do estômago de Baraggan' }
    ]
  }
];

const combined = [...challenges, ...newBleach];
console.log('Total new challenges:', combined.length);

const outContent = 'export interface ExclusiveChallenge {\n  id: string;\n  animeSlug: string;\n  category: string;\n  questionTitle: string;\n  targetTitle: string;\n  badgeTitle: string;\n  targetCharacterId: string;\n  targetCharacterName: string;\n  validCharacterIds?: string[];\n  clues: { label: string; value: string }[];\n  contextExplanation?: string;\n}\n\nexport const EXCLUSIVE_CHALLENGES: ExclusiveChallenge[] = ' + JSON.stringify(combined, null, 2) + ';\n\nexport const getChallengesForAnime = (animeSlug: string): ExclusiveChallenge[] => {\n  return EXCLUSIVE_CHALLENGES.filter((c) => c.animeSlug === animeSlug);\n};\n';

fs.writeFileSync('src/data/exclusiveChallenges.ts', outContent, 'utf8');
console.log('Updated src/data/exclusiveChallenges.ts successfully!');
