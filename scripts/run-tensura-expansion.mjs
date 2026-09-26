import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'tensei-shitara-slime-datta-ken');
const charactersJsonPath = path.join(rootDir, 'src', 'data', 'animes', 'tensei-shitara-slime-datta-ken', 'characters.json');

export const NEW_TENSURA_CHARACTERS = [
  {
    "id": "misery",
    "name": "Misery (Mizari)",
    "wikiTitle": "Misery",
    "gender": "Feminino",
    "species": "Demônio Progenitor",
    "affiliation": ["Octagrama (Lordes Demônios)"],
    "disasterRank": "Rank S (Desastre)",
    "styleOrPower": "Magia de Sangue & Servidão Primordial",
    "debutArc": "Arco de Walpurgis & O Banquete dos Lordes",
    "status": "Vivo",
    "quote": "Como serva do Lorde Guy, gerencio a ordem do submundo para que os lordes não destruam a criação.",
    "techniques": ["Magia de Sangue Primordial", "Comando de Demônios Menores", "Barreira Sagrada de Gelo Escarlate"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/misery.png"
  },
  {
    "id": "rain",
    "name": "Rain (Rein)",
    "wikiTitle": "Rain",
    "gender": "Feminino",
    "species": "Demônio Progenitor",
    "affiliation": ["Octagrama (Lordes Demônios)"],
    "disasterRank": "Rank S (Desastre)",
    "styleOrPower": "Pintura Arcana & Névoa Primordial",
    "debutArc": "Arco de Walpurgis & O Banquete dos Lordes",
    "status": "Vivo",
    "quote": "Servir ao Lorde Guy dá tanto trabalho... Mas pelo menos sobra tempo para minhas pinturas!",
    "techniques": ["Pintura Arcana de Criação", "Névoa Ilusória Azul", "Disparo de Água Ácida da Morte"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/rain.png"
  },
  {
    "id": "charybdis",
    "name": "Charybdis (Caríbdis)",
    "wikiTitle": "Charybdis",
    "gender": "Sem Gênero",
    "species": "Monstro Mítico",
    "affiliation": ["Independente"],
    "disasterRank": "Rank Especial S (Catástrofe)",
    "styleOrPower": "Megalodonte dos Céus & Bloqueio Mágico",
    "debutArc": "Arco do Rei das Feras & Charybdis",
    "status": "Morto",
    "quote": "*rugido ensurdecedor de baleia cósmica disparando milhares de escamas teleguiadas*",
    "techniques": ["Interferência Mágica de Escamas", "Disparo Teleguiado de Espinhos", "Voo Celestial de Megalodonte"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/charybdis.png"
  },
  {
    "id": "ifrit",
    "name": "Ifrit (Charis)",
    "wikiTitle": "Ifrit",
    "gender": "Masculino",
    "species": "Espírito Maior do Fogo",
    "affiliation": ["Federação Jura Tempest"],
    "disasterRank": "Rank Especial A (Calamidade)",
    "styleOrPower": "Chamas Negras & Pirocinese Maior",
    "debutArc": "Arco de Estabelecimento na Floresta de Jura",
    "status": "Vivo",
    "quote": "Depois de tantas partidas de shogi com o Lorde Veldora, meu espírito de guerreiro renasceu com honra!",
    "techniques": ["Pirocinese de Chamas Negras", "Corpo Flamejante Incandescente", "Multiplicação de Labaredas Vivas"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/ifrit.png"
  },
  {
    "id": "kenya-misaki",
    "name": "Kenya Misaki",
    "wikiTitle": "Kenya Misaki",
    "gender": "Masculino",
    "species": "Humano (Outromundista)",
    "affiliation": ["Guilda Livre / Ingracia"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Espírito Maior da Luz & Espada Solar",
    "debutArc": "Arco de Ingracia & Alunos de Shizu",
    "status": "Vivo",
    "quote": "Rimuru-sensei, eu vou treinar muito até me tornar um Herói mais forte que você!",
    "techniques": ["Espada Flamejante da Luz", "Investida Heroica", "Canalização de Espírito Sagrado"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/kenya-misaki.png"
  },
  {
    "id": "ryota-sekiguchi",
    "name": "Ryota Sekiguchi",
    "wikiTitle": "Ryota Sekiguchi",
    "gender": "Masculino",
    "species": "Humano (Outromundista)",
    "affiliation": ["Guilda Livre / Ingracia"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Espírito da Água & Modo Berserk",
    "debutArc": "Arco de Ingracia & Alunos de Shizu",
    "status": "Vivo",
    "quote": "Eu sou meio medroso, mas quando meus amigos precisam de mim, a força da água não para!",
    "techniques": ["Onda de Choque Aquática", "Fúria do Berserk Controlada", "Barreira Protetora Fluida"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/ryota-sekiguchi.png"
  },
  {
    "id": "gale-gibson",
    "name": "Gale Gibson",
    "wikiTitle": "Gale Gibson",
    "gender": "Masculino",
    "species": "Humano (Outromundista)",
    "affiliation": ["Guilda Livre / Ingracia"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Espírito da Terra & Projétil Sísmico",
    "debutArc": "Arco de Ingracia & Alunos de Shizu",
    "status": "Vivo",
    "quote": "Como o mais velho do grupo, eu vou proteger a Alice e todos os meus colegas!",
    "techniques": ["Projéteis de Rocha Mágica", "Muralha de Terra", "Golpe de Impacto Rochoso"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/gale-gibson.png"
  },
  {
    "id": "alice-rondo",
    "name": "Alice Rondo",
    "wikiTitle": "Alice Rondo",
    "gender": "Feminino",
    "species": "Humano (Outromundista)",
    "affiliation": ["Guilda Livre / Ingracia"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Manipulação de Marionetes & Brinquedos Vivos",
    "debutArc": "Arco de Ingracia & Alunos de Shizu",
    "status": "Vivo",
    "quote": "Vão, meus brinquedos fofinhos! Não deixem nenhum monstro mau chegar perto do sensei!",
    "techniques": ["Controle de Bonecas Vivas", "Fios Invisíveis de Marionete", "Ataque Rotativo de Pelúcias"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/alice-rondo.png"
  },
  {
    "id": "garm",
    "name": "Garm",
    "wikiTitle": "Garm",
    "gender": "Masculino",
    "species": "Anão",
    "affiliation": ["Federação Jura Tempest"],
    "disasterRank": "Rank B ou Inferior",
    "styleOrPower": "Forja de Armaduras & Alfaiataria Superior",
    "debutArc": "Arco de Estabelecimento na Floresta de Jura",
    "status": "Vivo",
    "quote": "Uma boa couraça de magisteel deve abraçar o corpo com o conforto de uma segunda pele!",
    "techniques": ["Forja de Armaduras Leves", "Alfaiataria de Fio Mágico", "Criação de Vestes Nobres"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/garm.png"
  },
  {
    "id": "dord",
    "name": "Dord (Dold)",
    "wikiTitle": "Dord",
    "gender": "Masculino",
    "species": "Anão",
    "affiliation": ["Federação Jura Tempest"],
    "disasterRank": "Rank B ou Inferior",
    "styleOrPower": "Ourivesaria Mística & Artefatos de Magisteel",
    "debutArc": "Arco de Estabelecimento na Floresta de Jura",
    "status": "Vivo",
    "quote": "A precisão dos detalhes é o que transforma um pedaço de minério em uma obra-prima de Tempest.",
    "techniques": ["Ourivesaria de Jóias Mágicas", "Encantamento de Acessórios", "Escultura de Magisteel"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/dord.png"
  },
  {
    "id": "myrd",
    "name": "Myrd",
    "wikiTitle": "Myrd",
    "gender": "Masculino",
    "species": "Anão",
    "affiliation": ["Federação Jura Tempest"],
    "disasterRank": "Rank B ou Inferior",
    "styleOrPower": "Engenharia Civil Divina & Arquitetura Silenciosa",
    "debutArc": "Arco de Estabelecimento na Floresta de Jura",
    "status": "Vivo",
    "quote": "*acenos silenciosos e gestos precisos indicando a estrutura perfeita das fundações de Tempest*",
    "techniques": ["Arquitetura Monumental de Magisteel", "Planejamento Urbano Rápido", "Estruturação de Aquedutos Mágicos"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/myrd.png"
  },
  {
    "id": "edmaris",
    "name": "Marius Falmuth (Rei Edmaris)",
    "wikiTitle": "Marius Falmuth",
    "gender": "Masculino",
    "species": "Humano",
    "affiliation": ["Reino de Farmenas"],
    "disasterRank": "Rank B ou Inferior",
    "styleOrPower": "Decreto Real & Negociação Diplomática",
    "debutArc": "Arco do Despertar do Lorde Demônio",
    "status": "Vivo",
    "quote": "A ambição cegou meus olhos... Mas com a ajuda do Lorde Rimuru e Youm, pagarei minhas dívidas com a paz.",
    "techniques": ["Administração Real de Falmuth", "Decreto de Renúncia", "Mediação Nobre de Farmenas"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/edmaris.png"
  },
  {
    "id": "razen",
    "name": "Razen",
    "wikiTitle": "Razen",
    "gender": "Masculino",
    "species": "Humano",
    "affiliation": ["Reino de Farmenas"],
    "disasterRank": "Rank Especial A (Calamidade)",
    "styleOrPower": "Grão-Mago de Falmuth & Troca de Almas",
    "debutArc": "Arco do Despertar do Lorde Demônio",
    "status": "Vivo",
    "quote": "Passei séculos acumulando magias proibidas... mas perante o Primordial Negro, toda a minha soberba desmoronou.",
    "techniques": ["Transferência de Alma Espiritual", "Magia de Fogo Nuclear", "Invocação Arcana de Quimeras", "Encantamento Gehenna"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/razen.png"
  },
  {
    "id": "shogo-taguchi",
    "name": "Shogo Taguchi",
    "wikiTitle": "Shogo Taguchi",
    "gender": "Masculino",
    "species": "Humano (Outromundista)",
    "affiliation": ["Independente"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Berserker & Punhos de Karma",
    "debutArc": "Arco do Despertar do Lorde Demônio",
    "status": "Morto",
    "quote": "Neste mundo eu posso esmagar quem eu quiser sem que a polícia venha me prender!",
    "techniques": ["Berserker (Fúria Destruidora)", "Usurpador de Vida", "Punho de Choque Marcial"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/shogo-taguchi.png"
  },
  {
    "id": "kyoya-tachibana",
    "name": "Kyoya Tachibana",
    "wikiTitle": "Kyoya Tachibana",
    "gender": "Masculino",
    "species": "Humano (Outromundista)",
    "affiliation": ["Independente"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "All-Seeing Eye & Corte Espacial",
    "debutArc": "Arco do Despertar do Lorde Demônio",
    "status": "Morto",
    "quote": "Com o meu olho, vejo todos os seus movimentos em câmera lenta. Você já está fatiado.",
    "techniques": ["All-Seeing Eye (Olho Que Tudo Vê)", "Corte do Vácuo Invisível", "Aceleração Temporal Sensorial"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/kyoya-tachibana.png"
  },
  {
    "id": "kirara-mizutani",
    "name": "Kirara Mizutani",
    "wikiTitle": "Kirara Mizutani",
    "gender": "Feminino",
    "species": "Humano (Outromundista)",
    "affiliation": ["Independente"],
    "disasterRank": "Rank B ou Inferior",
    "styleOrPower": "Bewilder (Manipulação Vocal Hipnótica)",
    "debutArc": "Arco do Despertar do Lorde Demônio",
    "status": "Morto",
    "quote": "Basta eu sussurrar com a minha voz doce que vocês monstros se matarão uns aos outros!",
    "techniques": ["Bewilder (Hipnose por Ressonância Vocal)", "Manipulação Psicológica", "Sugestão Mental Forçada"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/kirara-mizutani.png"
  },
  {
    "id": "leonard-jester",
    "name": "Leonard Jester",
    "wikiTitle": "Leonard Jester",
    "gender": "Masculino",
    "species": "Humano",
    "affiliation": ["Império Sagrado de Lubelios"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Esgrima Sagrada da Luz & Liderança Santa",
    "debutArc": "Arco do Confronto Santo-Monstro",
    "status": "Vivo",
    "quote": "A espada da justiça não vacilará perante as artimanhas dos monstros... a menos que a verdade me mostre o contrário.",
    "techniques": ["Corte Divino da Luz", "Disparo Sagrado Astral", "Comando de Regimento Santo"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/leonard-jester.png"
  },
  {
    "id": "bacchus",
    "name": "Bacchus",
    "wikiTitle": "Bacchus",
    "gender": "Masculino",
    "species": "Humano",
    "affiliation": ["Império Sagrado de Lubelios"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Maça Sagrada da Terra & Impacto Pesado",
    "debutArc": "Arco do Confronto Santo-Monstro",
    "status": "Vivo",
    "quote": "Um brinde com bom vinho e um golpe de maça que racha a terra! Este é o estilo de Bacchus!",
    "techniques": ["Golpe Esmagador da Terra", "Muralha Sísmica Sagrada", "Endurecimento Corporal de Rocha"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/bacchus.png"
  },
  {
    "id": "litus",
    "name": "Litus",
    "wikiTitle": "Litus",
    "gender": "Feminino",
    "species": "Humano",
    "affiliation": ["Império Sagrado de Lubelios"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Lança da Água Pura & Espírito Ondulante",
    "debutArc": "Arco do Confronto Santo-Monstro",
    "status": "Vivo",
    "quote": "A correnteza purificadora de Lubelios afogará as impurezas do mal!",
    "techniques": ["Estocada da Lança Espiral", "Vórtice Aquático Sagrado", "Cura com Água Benta"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/litus.png"
  },
  {
    "id": "fritz",
    "name": "Fritz",
    "wikiTitle": "Fritz",
    "gender": "Masculino",
    "species": "Humano",
    "affiliation": ["Império Sagrado de Lubelios"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Lâminas de Vento Afiadas & Magia Rápida",
    "debutArc": "Arco do Confronto Santo-Monstro",
    "status": "Vivo",
    "quote": "Muito lento! A brisa da minha lâmina corta antes mesmo que você perceba o balançar do aço!",
    "techniques": ["Rajada Ciclônica de Lâminas", "Passo Rápido do Vento", "Disparo Aéreo Mágico"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/fritz.png"
  },
  {
    "id": "abiru",
    "name": "Abiru",
    "wikiTitle": "Abiru",
    "gender": "Masculino",
    "species": "Dragonewt",
    "affiliation": ["Federação Jura Tempest"],
    "disasterRank": "Rank Especial A (Calamidade)",
    "styleOrPower": "Tridente do Dragão da Água & Liderança dos Pântanos",
    "debutArc": "Arco do Ataque dos Ogros & Lorde dos Orcs",
    "status": "Vivo",
    "quote": "Como chefe dos Homens-Lagarto, confio o futuro dos nossos guerreiros à generosidade do Lorde Rimuru.",
    "techniques": ["Estocada do Tridente Dracônico", "Comando das Tribos do Pântano", "Escamas de Defesa Aquática"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/abiru.png"
  },
  {
    "id": "trya",
    "name": "Trya",
    "wikiTitle": "Trya",
    "gender": "Feminino",
    "species": "Dríade",
    "affiliation": ["Federação Jura Tempest"],
    "disasterRank": "Rank Especial A (Calamidade)",
    "styleOrPower": "Previsão dos Ventos & Magia da Natureza",
    "debutArc": "Arco do Rei das Feras & Charybdis",
    "status": "Vivo",
    "quote": "Irmã Treyni! O despertar de Charybdis trará calamidade aos céus de Jura se não avisarmos Tempest!",
    "techniques": ["Mensageira dos Ventos Espirituais", "Bênção das Folhas de Jura", "Encantamento de Cura Natural"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/trya.png"
  },
  {
    "id": "rigur",
    "name": "Rigur",
    "wikiTitle": "Rigur",
    "gender": "Masculino",
    "species": "Hobgoblin",
    "affiliation": ["Federação Jura Tempest"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Liderança de Caça & Montaria de Lobo",
    "debutArc": "Arco de Estabelecimento na Floresta de Jura",
    "status": "Vivo",
    "quote": "Honrarei o nome do meu irmão falecido protegendo cada palmo das patrulhas de Tempest!",
    "techniques": ["Tiro Certeiro com Arco Goblin", "Patrulha Rápida com Lobos", "Táticas de Caça em Equipe"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/rigur.png"
  },
  {
    "id": "haruna",
    "name": "Haruna",
    "wikiTitle": "Haruna",
    "gender": "Feminino",
    "species": "Hobgoblin",
    "affiliation": ["Federação Jura Tempest"],
    "disasterRank": "Rank B ou Inferior",
    "styleOrPower": "Culinária Real de Tempest & Cuidados Domésticos",
    "debutArc": "Arco de Estabelecimento na Floresta de Jura",
    "status": "Vivo",
    "quote": "Lorde Rimuru, as melhores refeições de Tempest estão prontas! Por favor, aproveite com a gente!",
    "techniques": ["Preparo de Banquetes de Tempest", "Supervisão Doméstica Real", "Acolhimento Nobre de Hóspedes"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/haruna.png"
  },
  {
    "id": "elmesia",
    "name": "Elmesia El Ru Sarion",
    "wikiTitle": "Elmesia El Ru Sarion",
    "gender": "Feminino",
    "species": "Elfo",
    "affiliation": ["Dinastia Feiticeira de Sarion"],
    "disasterRank": "Rank Especial S (Catástrofe)",
    "styleOrPower": "Magia Suprema de Sarion & Intelecto Milenar",
    "debutArc": "Arco do Festival de Fundação de Tempest",
    "status": "Vivo",
    "quote": "Rimuru-kun, nossa parceria comercial renderá mais lucros do que qualquer guerra boba dos humanos!",
    "techniques": ["Feitiçaria Elemental Ancestral", "Barreira Mística Imperial", "Negociação Financeira Continental"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/elmesia.png"
  },
  {
    "id": "erald-grimwald",
    "name": "Erald Grimwald",
    "wikiTitle": "Erald Grimwald",
    "gender": "Masculino",
    "species": "Elfo",
    "affiliation": ["Dinastia Feiticeira de Sarion"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Diplomacia Arcana & Magia de Proteção",
    "debutArc": "Arco do Festival de Fundação de Tempest",
    "status": "Vivo",
    "quote": "Quem se atreve a tentar levar a minha preciosa filhinha Eren para perigos desnecessários?!",
    "techniques": ["Escudo Élfico de Alta Densidade", "Diplomacia Internacional de Sarion", "Feitiços de Vento Mágico"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/erald-grimwald.png"
  },
  {
    "id": "bernie",
    "name": "Bernie",
    "wikiTitle": "Bernie",
    "gender": "Masculino",
    "species": "Humano (Outromundista)",
    "affiliation": ["Guilda Livre / Ingracia", "Império Oriental"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Magia de Combate Moderna & Estratégia Tática",
    "debutArc": "Arco do Festival de Fundação de Tempest",
    "status": "Vivo",
    "quote": "Como estrategista da equipe de Masayuki, calculo as probabilidades para que a sorte dele brilhe.",
    "techniques": ["Projeção de Feixes Mágicos", "Análise Tática de Batalha", "Magia Dimensional de Suporte"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/bernie.png"
  },
  {
    "id": "jiwu",
    "name": "Jiwu",
    "wikiTitle": "Jiwu",
    "gender": "Feminino",
    "species": "Humano",
    "affiliation": ["Guilda Livre / Ingracia", "Império Oriental"],
    "disasterRank": "Rank A (Perigo)",
    "styleOrPower": "Kung Fu Oriental & Artes Marciais Místicas",
    "debutArc": "Arco do Festival de Fundação de Tempest",
    "status": "Vivo",
    "quote": "A proteção do Herói Masayuki está em minhas mãos. Meus punhos abrirão caminho!",
    "techniques": ["Artes Marciais do Dragão Oculto", "Golpe de Palma Espiritual", "Esquiva Fluida de Chi"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/jiwu.png"
  },
  {
    "id": "rudra",
    "name": "Rudra Nam Ul Nasca",
    "wikiTitle": "Rudra Nam Ul Nasca",
    "gender": "Masculino",
    "species": "Humano (Santo)",
    "affiliation": ["Império Oriental"],
    "disasterRank": "Rank Especial S (Catástrofe)",
    "styleOrPower": "Michael (Senhor da Justiça)",
    "debutArc": "Arco da Conspiração dos Rosso & Donzelas Demoníacas",
    "status": "Vivo",
    "quote": "Guy, nosso jogo milenar pela unificação do mundo caminha para o seu movimento de xeque-mate.",
    "techniques": ["Michael (Senhor da Justiça)", "Castelo Guardião dos Leais", "Subjugação Imperial Absoluta", "Espada Dourada do Imperador"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/rudra.png"
  },
  {
    "id": "tatsuya-kondou",
    "name": "Tatsuya Kondou",
    "wikiTitle": "Tatsuya Kondou",
    "gender": "Masculino",
    "species": "Humano (Outromundista / Santo)",
    "affiliation": ["Império Oriental"],
    "disasterRank": "Rank S (Desastre)",
    "styleOrPower": "Tiroteio com Balas de Maldição & Sandalphon",
    "debutArc": "Arco da Conspiração dos Rosso & Donzelas Demoníacas",
    "status": "Vivo",
    "quote": "Em nome de Sua Majestade Rudra, o Departamento de Informações erradicará todas as ameaças.",
    "techniques": ["Sandalphon (Senhor da Execução)", "Tiro com Bala Necrótica Amaldiçoada", "Infiltração Tática Imperial"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/tatsuya-kondou.png"
  },
  {
    "id": "damrada",
    "name": "Damrada",
    "wikiTitle": "Damrada",
    "gender": "Masculino",
    "species": "Humano",
    "affiliation": ["Império Oriental"],
    "disasterRank": "Rank S (Desastre)",
    "styleOrPower": "Mestre dos Mercadores das Sombras & Punhos de Ferro",
    "debutArc": "Arco do Despertar do Lorde Demônio",
    "status": "Vivo",
    "quote": "Comprar, vender ou assassinar. Tudo tem um preço justo nos mercados ocultos do oriente.",
    "techniques": ["Punho de Ferro Espiritual", "Deslocamento Sombrio de Negócios", "Arte Marcial Imperial Secreta"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/damrada.png"
  },
  {
    "id": "calgurio",
    "name": "Calgurio Heath",
    "wikiTitle": "Calgurio Heath",
    "gender": "Masculino",
    "species": "Humano",
    "affiliation": ["Império Oriental"],
    "disasterRank": "Rank Especial A (Calamidade)",
    "styleOrPower": "Comando de Exército Mecanizado & Canhões de Magisteel",
    "debutArc": "Arco da Conspiração dos Rosso & Donzelas Demoníacas",
    "status": "Vivo",
    "quote": "A tecnologia dos tanques e zepelins de batalha do Império esmagará qualquer bando de monstros da floresta!",
    "techniques": ["Bombardeio Mecanizado Imperial", "Comando de Divisão Blindada", "Estratégia Ofensiva Pesada"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/calgurio.png"
  },
  {
    "id": "kagali",
    "name": "Kagali (Kazalim)",
    "wikiTitle": "Kagali",
    "gender": "Feminino",
    "species": "Elfo",
    "affiliation": ["Aliança dos Palhaços Moderados", "Guilda Livre / Ingracia"],
    "disasterRank": "Rank S (Desastre)",
    "styleOrPower": "Maldição Espiritual de Regente & Criação de Majins",
    "debutArc": "Arco de Ingracia & Alunos de Shizu",
    "status": "Vivo",
    "quote": "Mesmo perdendo meu trono no passado para Leon, a Aliança dos Palhaços reescreverá a história do mundo!",
    "techniques": ["Regente da Maldição (Plunderer)", "Criação de Homúnculos e Majins", "Manipulação Espiritual Sombria"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/kagali.png"
  },
  {
    "id": "feldway",
    "name": "Feldway",
    "wikiTitle": "Feldway",
    "gender": "Sem Gênero",
    "species": "Anjo Caído",
    "affiliation": ["Independente"],
    "disasterRank": "Rank Especial S (Catástrofe)",
    "styleOrPower": "Líder dos Phantom & Asas da Destruição Divina",
    "debutArc": "Arco da Conspiração dos Rosso & Donzelas Demoníacas",
    "status": "Vivo",
    "quote": "Pela glória do criador Veldanava, este mundo manchado de impurezas será restaurado à pureza do vazio.",
    "techniques": ["Comando dos Anjos do Caos (Phantom)", "Lâmina Divina Primordial", "Purificação Cósmica Celestial"],
    "avatar": "/avatars/tensei-shitara-slime-datta-ken/feldway.png"
  }
];

async function fetchWikiThumbnail(title) {
  const url = `https://tensura.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'AnimedleBot/1.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://tensura.fandom.com/'
      }
    });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (err) {
    console.error(`Erro ao buscar wiki para "${title}":`, err.message);
    return null;
  }
}

async function processAvatar(buffer, outputPath) {
  const meta = await sharp(buffer).metadata();
  const width = meta.width;
  const height = meta.height;

  if (height > width * 1.15) {
    const size = Math.round(width * 0.90);
    const top = Math.round(height * 0.04);
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
      .toFile(outputPath);
  } else if (width > height * 1.25) {
    const size = Math.min(height, Math.round(width * 0.65));
    const left = Math.round((width - size) / 2);
    const top = Math.round((height - size) / 2);

    await sharp(buffer)
      .extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: size,
        height: size
      })
      .resize(240, 240, { fit: 'cover' })
      .png({ quality: 90 })
      .toFile(outputPath);
  } else {
    await sharp(buffer)
      .resize(240, 240, { fit: 'cover', position: 'center' })
      .png({ quality: 90 })
      .toFile(outputPath);
  }
}

async function runTensuraExpansion() {
  console.log(`\n=== INICIANDO EXPANSÃO DE TENSURA (+${NEW_TENSURA_CHARACTERS.length} PERSONAGENS) ===\n`);

  let successCount = 0;

  for (let i = 0; i < NEW_TENSURA_CHARACTERS.length; i++) {
    const char = NEW_TENSURA_CHARACTERS[i];
    const outputPath = path.join(avatarsDir, `${char.id}.png`);
    const wikiTitle = char.wikiTitle || char.name;

    console.log(`[${i + 1}/${NEW_TENSURA_CHARACTERS.length}] Processando ${char.name} (${char.id}) [Wiki: ${wikiTitle}]...`);

    const imageUrl = await fetchWikiThumbnail(wikiTitle);

    if (!imageUrl) {
      console.warn(`   ⚠️ URL de imagem não encontrada para ${char.name} (${wikiTitle})`);
      continue;
    }

    try {
      const res = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://tensura.fandom.com/'
        }
      });

      if (!res.ok) {
        console.warn(`   ⚠️ Erro HTTP ${res.status} ao baixar imagem de ${char.name}`);
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      await processAvatar(buffer, outputPath);
      console.log(`   ✓ Avatar salvo em: ${char.id}.png`);
      successCount++;
    } catch (err) {
      console.error(`   ❌ Falha ao processar avatar de ${char.name}:`, err.message);
    }

    await new Promise(r => setTimeout(r, 200));
  }

  // Mesclar com a base existente de 65 personagens
  const existingChars = JSON.parse(fs.readFileSync(charactersJsonPath, 'utf-8'));
  const existingIds = new Set(existingChars.map(c => c.id));

  const charsToAdd = [];
  for (const item of NEW_TENSURA_CHARACTERS) {
    if (existingIds.has(item.id)) {
      console.warn(`ID duplicado ignorado: ${item.id}`);
      continue;
    }
    const { wikiTitle, ...cleanChar } = item;
    charsToAdd.push(cleanChar);
  }

  const merged = [...existingChars, ...charsToAdd];
  fs.writeFileSync(charactersJsonPath, JSON.stringify(merged, null, 2), 'utf-8');

  console.log(`\n=== SUCESSO: ${charsToAdd.length} novos personagens adicionados! Total agora: ${merged.length} personagens em ${charactersJsonPath} ===\n`);
}

runTensuraExpansion().catch(console.error);
