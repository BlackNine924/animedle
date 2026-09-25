import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'dragon-ball');
const dataDir = path.join(rootDir, 'src', 'data', 'animes', 'dragon-ball');

if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

export const DRAGON_BALL_ROSTER = [
  // --- Saga de Pilaf ---
  {
    id: 'son-goku',
    name: 'Son Goku',
    searchName: 'Son Goku',
    fandomName: 'Goku',
    gender: 'Masculino',
    species: 'Saiyajin',
    affiliation: ['Guerreiros Z', 'Escola Tartaruga'],
    origin: 'Planeta Vegeta',
    maxRelease: 'Instinto Superior',
    styleOrPower: 'Kamehameha',
    debutArc: 'Saga de Pilaf',
    status: 'Vivo',
    quote: 'Eu sou um Saiyajin criado na Terra! Pelo bem de todos que acreditaram em mim, eu não vou perder!',
    techniques: ['Kamehameha', 'Genki Dama', 'Kaiohken', 'Teletransporte', 'Instinto Superior']
  },
  {
    id: 'bulma',
    name: 'Bulma',
    searchName: 'Bulma',
    fandomName: 'Bulma',
    gender: 'Feminino',
    species: 'Humano',
    affiliation: ['Corporação Cápsula', 'Guerreiros Z'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Gênio Científico (Tecnologia Cápsula)',
    debutArc: 'Saga de Pilaf',
    status: 'Vivo',
    quote: 'Eu sou a jovem cientista mais genial do mundo inteiro!',
    techniques: ['Radar do Dragão', 'Cápsulas Hoi-Poi', 'Máquina do Tempo']
  },
  {
    id: 'mestre-kame',
    name: 'Mestre Kame',
    searchName: 'Muten Roshi',
    fandomName: 'Master Roshi',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Escola Tartaruga'],
    origin: 'Planeta Terra',
    maxRelease: 'Poder Máximo (Max Power)',
    styleOrPower: 'Kamehameha Original',
    debutArc: 'Saga de Pilaf',
    status: 'Vivo',
    quote: 'Mova-se bem, aprenda bem, brinque bem, coma bem e descanse bem! Esse é o estilo da Escola Tartaruga!',
    techniques: ['Kamehameha Original', 'Mafuba', 'Bankoku Bikkuri Sho', 'Zanzoken']
  },
  {
    id: 'yamcha',
    name: 'Yamcha',
    searchName: 'Yamcha',
    fandomName: 'Yamcha',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Guerreiros Z', 'Escola Tartaruga'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Rogafufuken (Punho do Lobo)',
    debutArc: 'Saga de Pilaf',
    status: 'Vivo',
    quote: 'O Lobo do Deserto não se rende tão facilmente!',
    techniques: ['Rogafufuken', 'Sokidan', 'Kamehameha']
  },
  {
    id: 'oolong',
    name: 'Oolong',
    searchName: 'Oolong',
    fandomName: 'Oolong',
    gender: 'Masculino',
    species: 'Animal Antropomórfico',
    affiliation: ['Guerreiros Z'],
    origin: 'Planeta Terra',
    maxRelease: 'Metamorfose',
    styleOrPower: 'Transformação Temporária',
    debutArc: 'Saga de Pilaf',
    status: 'Vivo',
    quote: 'Shenlong, realize o meu desejo!',
    techniques: ['Metamorfose', 'Disfarce']
  },
  {
    id: 'pual',
    name: 'Pual',
    searchName: 'Puar',
    fandomName: 'Puar',
    gender: 'Masculino',
    species: 'Animal Antropomórfico',
    affiliation: ['Guerreiros Z'],
    origin: 'Planeta Terra',
    maxRelease: 'Metamorfose Perfeita',
    styleOrPower: 'Transformação Ilimitada',
    debutArc: 'Saga de Pilaf',
    status: 'Vivo',
    quote: 'Yamcha, você consegue! Eu acredito em você!',
    techniques: ['Metamorfose Ilimitada', 'Voo']
  },
  {
    id: 'chichi',
    name: 'Chichi',
    searchName: 'Chi-Chi',
    fandomName: 'Chi-Chi',
    gender: 'Feminino',
    species: 'Humano',
    affiliation: ['Família Son'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Artes Marciais do Castelo de Fogo',
    debutArc: 'Saga de Pilaf',
    status: 'Vivo',
    quote: 'Goku! Volte já para casa e venha ajudar a cuidar da educação dos nossos filhos!',
    techniques: ['Artes Marciais do Castelo de Fogo', 'Ataque de Lâmina']
  },
  {
    id: 'rei-cutelo',
    name: 'Rei Cutelo',
    searchName: 'Gyumao',
    fandomName: 'Ox-King',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Escola Tartaruga', 'Montanha de Fogo'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Força Bruta e Artes Marciais da Tartaruga',
    debutArc: 'Saga de Pilaf',
    status: 'Vivo',
    quote: 'Eu sou Gyumao, o Rei Cutelo! Discípulo do Mestre Kame!',
    techniques: ['Golpe com Machado Gigante', 'Força Sobre-humana']
  },
  {
    id: 'pilaf',
    name: 'Pilaf',
    searchName: 'Emperor Pilaf',
    fandomName: 'Emperor Pilaf',
    gender: 'Masculino',
    species: 'Terráqueo',
    affiliation: ['Gangue de Pilaf'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Máquinas e Robôs de Combate',
    debutArc: 'Saga de Pilaf',
    status: 'Vivo',
    quote: 'Com as Esferas do Dragão, eu dominarei o mundo inteiro!',
    techniques: ['Pilaf Machine', 'Invenções Bélicas']
  },
  {
    id: 'shu',
    name: 'Shu',
    searchName: 'Shu',
    fandomName: 'Shu (Dragon Ball)',
    gender: 'Masculino',
    species: 'Animal Antropomórfico',
    affiliation: ['Gangue de Pilaf'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Ninjutsu e Armamento',
    debutArc: 'Saga de Pilaf',
    status: 'Vivo',
    quote: 'Sim, Grande Lorde Pilaf!',
    techniques: ['Uso de Katana Ninja', 'Armamentos da Gangue de Pilaf']
  },
  {
    id: 'mai',
    name: 'Mai',
    searchName: 'Mai',
    fandomName: 'Mai',
    gender: 'Feminino',
    species: 'Humano',
    affiliation: ['Gangue de Pilaf', 'Resistência do Futuro'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Tiro de Precisão e Estratégia',
    debutArc: 'Saga de Pilaf',
    status: 'Vivo',
    quote: 'Trunks! Nós vamos defender o que restou deste mundo até o fim!',
    techniques: ['Tiro de Precisão com Sniper', 'Granadas e Artilharia']
  },

  // --- 21º Torneio de Artes Marciais ---
  {
    id: 'kuririn',
    name: 'Kuririn',
    searchName: 'Krilin',
    fandomName: 'Krillin',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Guerreiros Z', 'Escola Tartaruga'],
    origin: 'Planeta Terra',
    maxRelease: 'Potencial Liberado',
    styleOrPower: 'Kienzan (Disco Cortante)',
    debutArc: '21º Torneio de Artes Marciais',
    status: 'Vivo',
    quote: 'Goku! Se eu puder ajudar nem que seja um pouco, eu vou lutar até o fim!',
    techniques: ['Kienzan', 'Taiyoken', 'Kamehameha', 'Kakusandan']
  },
  {
    id: 'lunch',
    name: 'Lunch',
    searchName: 'Launch',
    fandomName: 'Launch',
    gender: 'Feminino',
    species: 'Humano',
    affiliation: ['Kame House'],
    origin: 'Planeta Terra',
    maxRelease: 'Dupla Personalidade (Espirro)',
    styleOrPower: 'Disparo de Metralhadoras e Fúria',
    debutArc: '21º Torneio de Artes Marciais',
    status: 'Vivo',
    quote: 'Quem ousar se meter no meu caminho vai levar chumbo grosso!',
    techniques: ['Disparo de Metralhadora', 'Espirro Transformador']
  },
  {
    id: 'nam',
    name: 'Nam',
    searchName: 'Nam',
    fandomName: 'Nam',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Torneio de Artes Marciais'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Tenku Pekeji-Ken',
    debutArc: '21º Torneio de Artes Marciais',
    status: 'Vivo',
    quote: 'Eu preciso levar a água do torneio para salvar as crianças da minha vila sedenta!',
    techniques: ['Tenku Pekeji-Ken', 'Salto Aéreo Gigante']
  },

  // --- Exército Red Ribbon ---
  {
    id: 'mestre-karin',
    name: 'Mestre Karin',
    searchName: 'Karin',
    fandomName: 'Korin',
    gender: 'Masculino',
    species: 'Animal Antropomórfico',
    affiliation: ['Torre de Karin', 'Reino dos Deuses'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Sementes dos Deuses (Senzu)',
    debutArc: 'Exército Red Ribbon',
    status: 'Vivo',
    quote: 'Coma uma Semente dos Deuses e recupere todas as suas energias imediatamente!',
    techniques: ['Cultivo de Sementes dos Deuses', 'Água dos Deuses', 'Percepção de Ki']
  },
  {
    id: 'vovo-gohan',
    name: 'Vovô Gohan',
    searchName: 'Son Gohan (Grandpa)',
    fandomName: 'Grandpa Gohan',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Escola Tartaruga'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Kamehameha Clássico',
    debutArc: 'Exército Red Ribbon',
    status: 'Morto',
    quote: 'Goku, meu querido neto! Como você cresceu forte e bondoso!',
    techniques: ['Kamehameha', 'Zanzoken', 'Artes Marciais da Tartaruga']
  },
  {
    id: 'vovo-uranai',
    name: 'Vovó Uranai',
    searchName: 'Fortuneteller Baba',
    fandomName: 'Fortuneteller Baba',
    gender: 'Feminino',
    species: 'Humano',
    affiliation: ['Palácio da Vovó Uranai'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Clarividência na Bola de Cristal',
    debutArc: 'Exército Red Ribbon',
    status: 'Vivo',
    quote: 'Tragam dez milhões de zênis ou derrotem meus guerreiros para terem sua profecia!',
    techniques: ['Bola de Cristal de Clarividência', 'Invocação de Almas do Outro Mundo', 'Teletransporte Espiritual']
  },
  {
    id: 'tao-pai-pai',
    name: 'Tao Pai Pai',
    searchName: 'Tao Pai Pai',
    fandomName: 'Mercenary Tao',
    gender: 'Masculino',
    species: 'Ciborgue / Humano',
    affiliation: ['Escola Garça'],
    origin: 'Planeta Terra',
    maxRelease: 'Forma Ciborgue',
    styleOrPower: 'Dodonpa',
    debutArc: 'Exército Red Ribbon',
    status: 'Vivo',
    quote: 'Eu sou o maior assassino profissional do mundo: Mercenário Tao Pai Pai!',
    techniques: ['Dodonpa', 'Arremesso de Coluna com Voo', 'Lâmina Oculta Cibernética']
  },
  {
    id: 'general-blue',
    name: 'General Blue',
    searchName: 'General Blue',
    fandomName: 'General Blue',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Força Red Ribbon'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Telecinese Ocular Paralisante',
    debutArc: 'Exército Red Ribbon',
    status: 'Morto',
    quote: 'Pelo Exército Red Ribbon! Ninguém escapa do meu poder paralisante!',
    techniques: ['Olhar Telecinético Paralisante', 'Combate Corpo a Corpo']
  },
  {
    id: 'comandante-red',
    name: 'Comandante Red',
    searchName: 'Commander Red',
    fandomName: 'Commander Red',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Força Red Ribbon'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Liderança Militar',
    debutArc: 'Exército Red Ribbon',
    status: 'Morto',
    quote: 'Eu usarei as Esferas do Dragão para finalmente ficar mais alto!',
    techniques: ['Comando do Exército Red Ribbon', 'Controle Militar']
  },
  {
    id: 'conselheiro-black',
    name: 'Conselheiro Black',
    searchName: 'Staff Officer Black',
    fandomName: 'Staff Officer Black',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Força Red Ribbon'],
    origin: 'Planeta Terra',
    maxRelease: 'Battle Jacket (Robô Gigante)',
    styleOrPower: 'Pilotagem de Mecha Bélico',
    debutArc: 'Exército Red Ribbon',
    status: 'Morto',
    quote: 'Nós fundaremos o Exército Black Ribbon sobre suas cinzas!',
    techniques: ['Disparo de Mísseis Mecha', 'Canhão de Feixe de Plasma']
  },
  {
    id: 'androide-8',
    name: 'Androide 8',
    searchName: 'Android 8',
    fandomName: 'Android 8',
    gender: 'Masculino',
    species: 'Androide / Ciborgue',
    affiliation: ['Vila Jingle', 'Força Red Ribbon'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Superforça Cibernética e Pacifismo',
    debutArc: 'Exército Red Ribbon',
    status: 'Vivo',
    quote: 'Goku... Eu não gosto de violência, mas farei tudo para proteger as pessoas gentis!',
    techniques: ['Soco Destruidor de Aço', 'Resistência Blindada']
  },

  // --- 22º Torneio de Artes Marciais (Tenshinhan) ---
  {
    id: 'mestre-tsuru',
    name: 'Mestre Tsuru',
    searchName: 'Tsuru-sennin',
    fandomName: 'Master Shen',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Escola Garça'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Dodonpa e Bukujutsu (Arte do Voo)',
    debutArc: '22º Torneio de Artes Marciais (Tenshinhan)',
    status: 'Vivo',
    quote: 'A Escola Garça triunfará sobre a decrépita Escola Tartaruga de Roshi!',
    techniques: ['Dodonpa', 'Bukujutsu', 'Telepatia']
  },
  {
    id: 'tenshinhan',
    name: 'Tenshinhan',
    searchName: 'Tien Shinhan',
    fandomName: 'Tien Shinhan',
    gender: 'Masculino',
    species: 'Humano (Descendente de Três Olhos)',
    affiliation: ['Guerreiros Z', 'Escola Garça'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Kikoho (Canhão de Ki)',
    debutArc: '22º Torneio de Artes Marciais (Tenshinhan)',
    status: 'Vivo',
    quote: 'Kikoho! Mesmo que isso custe toda a minha energia vital, eu vou parar você!',
    techniques: ['Kikoho', 'Shin Kikoho', 'Dodonpa', 'Taiyoken', 'Shishin no Ken']
  },
  {
    id: 'chaos',
    name: 'Chaos',
    searchName: 'Chiaotzu',
    fandomName: 'Chiaotzu',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Guerreiros Z', 'Escola Garça'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Poderes Psíquicos e Paralisia Mental',
    debutArc: '22º Torneio de Artes Marciais (Tenshinhan)',
    status: 'Vivo',
    quote: 'Adeus, Ten-san... Não chore por mim!',
    techniques: ['Paralisia Telecinética', 'Dodonpa', 'Autodestruição Sacrificial']
  },

  // --- Piccolo Daimaoh ---
  {
    id: 'piccolo-daimaoh',
    name: 'Piccolo Daimaoh',
    searchName: 'King Piccolo',
    fandomName: 'King Piccolo',
    gender: 'Sem Gênero',
    species: 'Namekuseijin',
    affiliation: ['Clã Demônio'],
    origin: 'Namekusei',
    maxRelease: 'Juventude Restaurada',
    styleOrPower: 'Bakurikimaha (Onda Explosiva)',
    debutArc: 'Piccolo Daimaoh',
    status: 'Morto',
    quote: 'O mundo agora pertence ao Rei Demônio Piccolo! O terror e o caos prevalecerão!',
    techniques: ['Bakurikimaha', 'Geração de Ovos de Demônios', 'Raios Oculares']
  },
  {
    id: 'tambourine',
    name: 'Tambourine',
    searchName: 'Tambourine',
    fandomName: 'Tambourine',
    gender: 'Sem Gênero',
    species: 'Mutante Namekuseijin (Clã Demônio)',
    affiliation: ['Clã Demônio'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Voo com Asas e Feixes Oculares',
    debutArc: 'Piccolo Daimaoh',
    status: 'Morto',
    quote: 'Malditos artistas marciais, vocês serão todos exterminados pelo Rei Piccolo!',
    techniques: ['Feixe Ocular Destruidor', 'Ataque de Garras Aéreas']
  },
  {
    id: 'yajirobe',
    name: 'Yajirobe',
    searchName: 'Yajirobe',
    fandomName: 'Yajirobe',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Torre de Karin', 'Guerreiros Z'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Esgrima de Katana Samurai',
    debutArc: 'Piccolo Daimaoh',
    status: 'Vivo',
    quote: 'Cortei a cauda do macaco gigante! Agora o resto é com você, Goku!',
    techniques: ['Corte de Katana Veloz', 'Força Samurai']
  },
  {
    id: 'kami-sama',
    name: 'Kami-Sama',
    searchName: 'Kami',
    fandomName: 'Kami',
    gender: 'Sem Gênero',
    species: 'Namekuseijin',
    affiliation: ['Reino dos Deuses', 'Templo Sagrado'],
    origin: 'Namekusei',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Criação das Esferas do Dragão da Terra',
    debutArc: 'Piccolo Daimaoh',
    status: 'Vivo',
    quote: 'Enquanto eu viver, as Esferas do Dragão trarão esperança aos habitantes da Terra.',
    techniques: ['Criação das Esferas do Dragão', 'Mafuba Reverso', 'Visão Onipresente']
  },
  {
    id: 'sr-popo',
    name: 'Sr. Popo',
    searchName: 'Mr. Popo',
    fandomName: 'Mr. Popo',
    gender: 'Sem Gênero',
    species: 'Espírito Divino',
    affiliation: ['Templo Sagrado', 'Reino dos Deuses'],
    origin: 'Reinos Divinos',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Treinamento Espiritual da Sala do Tempo',
    debutArc: 'Piccolo Daimaoh',
    status: 'Vivo',
    quote: 'Seja calmo como o céu e rápido como o relâmpago!',
    techniques: ['Tapete Mágico Voador', 'Engolir Ataques de Ki', 'Guardião da Sala do Tempo']
  },

  // --- 23º Torneio de Artes Marciais (Piccolo Jr.) ---
  {
    id: 'piccolo',
    name: 'Piccolo',
    searchName: 'Piccolo',
    fandomName: 'Piccolo',
    gender: 'Sem Gênero',
    species: 'Namekuseijin',
    affiliation: ['Guerreiros Z'],
    origin: 'Namekusei',
    maxRelease: 'Piccolo Laranja (Orange)',
    styleOrPower: 'Makankosappo',
    debutArc: '23º Torneio de Artes Marciais (Piccolo Jr.)',
    status: 'Vivo',
    quote: 'Gohan, você foi a primeira pessoa que conversou comigo não como um demônio, mas como um amigo!',
    techniques: ['Makankosappo', 'Masenko', 'Hellzone Grenade', 'Regeneração Namekuseijin', 'Gigantificação']
  },

  // --- Saga dos Saiyajins ---
  {
    id: 'senhor-kaioh',
    name: 'Senhor Kaioh do Norte',
    searchName: 'King Kai',
    fandomName: 'King Kai',
    gender: 'Masculino',
    species: 'Divindade (Shinjin)',
    affiliation: ['Reino dos Deuses', 'Planeta Kaioh'],
    origin: 'Reinos Divinos',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Criação do Kaiohken e Genki Dama',
    debutArc: 'Saga dos Saiyajins',
    status: 'Morto',
    quote: 'Goku! Para dominar a Genki Dama, você deve reunir a energia de toda a natureza viva!',
    techniques: ['Kaiohken', 'Genki Dama', 'Telepatia Universal']
  },
  {
    id: 'raditz',
    name: 'Raditz',
    searchName: 'Raditz',
    fandomName: 'Raditz',
    gender: 'Masculino',
    species: 'Saiyajin',
    affiliation: ['Exército de Freeza', 'Saiyajins'],
    origin: 'Planeta Vegeta',
    maxRelease: 'Oozaru (Macaco Gigante)',
    styleOrPower: 'Double Sunday',
    debutArc: 'Saga dos Saiyajins',
    status: 'Morto',
    quote: 'Kakarotto! Você se esqueceu da sua verdadeira missão como um guerreiro Saiyajin?!',
    techniques: ['Double Sunday', 'Saturday Crush', 'Transformação Oozaru']
  },
  {
    id: 'nappa',
    name: 'Nappa',
    searchName: 'Nappa',
    fandomName: 'Nappa',
    gender: 'Masculino',
    species: 'Saiyajin',
    affiliation: ['Exército de Freeza', 'Saiyajins'],
    origin: 'Planeta Vegeta',
    maxRelease: 'Oozaru (Macaco Gigante)',
    styleOrPower: 'Explosão Gigante (Dois Dedos)',
    debutArc: 'Saga dos Saiyajins',
    status: 'Morto',
    quote: 'Vegeta, qual é o poder de luta de Kakarotto?! É mais de 8000!',
    techniques: ['Explosão Gigante de Dois Dedos', 'Bomber DX', 'Canhão Quebrador']
  },
  {
    id: 'vegeta',
    name: 'Vegeta',
    searchName: 'Vegeta',
    fandomName: 'Vegeta',
    gender: 'Masculino',
    species: 'Saiyajin',
    affiliation: ['Guerreiros Z', 'Família Real Saiyajin'],
    origin: 'Planeta Vegeta',
    maxRelease: 'Ultra Ego (Mega Instinto)',
    styleOrPower: 'Final Flash',
    debutArc: 'Saga dos Saiyajins',
    status: 'Vivo',
    quote: 'Eu sou o Príncipe de todos os Saiyajins! Meu orgulho jamais será quebrado por ninguém!',
    techniques: ['Final Flash', 'Big Bang Attack', 'Galick Gun', 'Final Explosion', 'Ultra Ego']
  },
  {
    id: 'son-gohan',
    name: 'Son Gohan',
    searchName: 'Son Gohan',
    fandomName: 'Gohan',
    gender: 'Masculino',
    species: 'Híbrido (Saiyajin / Humano)',
    affiliation: ['Guerreiros Z'],
    origin: 'Planeta Terra',
    maxRelease: 'Gohan Besta (Beast)',
    styleOrPower: 'Masenko e Makankosappo',
    debutArc: 'Saga dos Saiyajins',
    status: 'Vivo',
    quote: 'Eu nunca vou te perdoar por ferir meus amigos! Desperte... Gohan Besta!',
    techniques: ['Makankosappo (Beast)', 'Masenko', 'Kamehameha Paterno', 'Estado Definitivo (Ultimate Gohan)']
  },

  // --- Saga de Freeza (Namekusei) ---
  {
    id: 'bardock',
    name: 'Bardock',
    searchName: 'Bardock',
    fandomName: 'Bardock',
    gender: 'Masculino',
    species: 'Saiyajin',
    affiliation: ['Exército de Freeza', 'Saiyajins'],
    origin: 'Planeta Vegeta',
    maxRelease: 'Super Saiyajin',
    styleOrPower: 'Canhão Espiritual Final',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Morto',
    quote: 'Kakarotto... Você deve sobreviver e vingar o nosso povo Saiyajin!',
    techniques: ['Final Spirit Cannon', 'Rebellion Trigger', 'Visão Precoce do Futuro']
  },
  {
    id: 'dende',
    name: 'Dende',
    searchName: 'Dende',
    fandomName: 'Dende',
    gender: 'Sem Gênero',
    species: 'Namekuseijin',
    affiliation: ['Templo Sagrado', 'Reino dos Deuses'],
    origin: 'Namekusei',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Cura Divina e Aprimoramento de Shenlong',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Vivo',
    quote: 'Eu sou o novo Kami-Sama da Terra! Deixem as feridas de vocês comigo!',
    techniques: ['Cura Milagrosa', 'Invocação de Porunga', 'Aprimoramento das Esferas da Terra']
  },
  {
    id: 'grande-patriarca',
    name: 'Grande Patriarca',
    searchName: 'Grand Elder Guru',
    fandomName: 'Grand Elder Guru',
    gender: 'Sem Gênero',
    species: 'Namekuseijin',
    affiliation: ['Povo de Namekusei'],
    origin: 'Namekusei',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Liberação de Potencial Latente',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Morto',
    quote: 'Coloque sua mão sobre a minha mente... Eu despertarei o poder adormecido no seu interior.',
    techniques: ['Despertar de Potencial Latente', 'Criação das Esferas de Porunga', 'Telepatia']
  },
  {
    id: 'nail',
    name: 'Nail',
    searchName: 'Nail',
    fandomName: 'Nail',
    gender: 'Sem Gênero',
    species: 'Namekuseijin',
    affiliation: ['Povo de Namekusei'],
    origin: 'Namekusei',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Artes Marciais do Guerreiro Namekuseijin',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Vivo',
    quote: 'Eu sou o único Guerreiro do tipo combatente de Namekusei! Não permitirei que profane nosso Patriarca!',
    techniques: ['Canhão da Espada de Ki', 'Fusão Namekuseijin', 'Regeneração']
  },
  {
    id: 'zarbon',
    name: 'Zarbon',
    searchName: 'Zarbon',
    fandomName: 'Zarbon',
    gender: 'Masculino',
    species: 'Alienígena',
    affiliation: ['Exército de Freeza'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Forma Monstruosa de Batalha',
    styleOrPower: 'Canhão de Tiro Elegante',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Morto',
    quote: 'Eu odeio revelar a minha verdadeira forma hedionda, mas você não me deixa outra escolha!',
    techniques: ['Metamorfose Monstruosa', 'Elegant Blaster', 'Disparo de Bombardeio']
  },
  {
    id: 'dodoria',
    name: 'Dodoria',
    searchName: 'Dodoria',
    fandomName: 'Dodoria',
    gender: 'Masculino',
    species: 'Alienígena',
    affiliation: ['Exército de Freeza'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Canhão de Boca e Força Brutal',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Morto',
    quote: 'Vegeta, você não tem chance contra mim e o poder esmagador de Lorde Freeza!',
    techniques: ['Canhão de Boca de Ki', 'Investida Máxima']
  },
  {
    id: 'capitao-ginyu',
    name: 'Capitão Ginyu',
    searchName: 'Captain Ginyu',
    fandomName: 'Captain Ginyu',
    gender: 'Masculino',
    species: 'Alienígena',
    affiliation: ['Forças Especiais Ginyu', 'Exército de Freeza'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Troca de Corpos (Change!)',
    styleOrPower: 'Body Change (Troca de Corpos)',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Morto',
    quote: 'Nós somos as Forças Especiais Ginyu! Change! Seu corpo magnífico agora é meu!',
    techniques: ['Body Change', 'Galaxy Dynamite', 'Poses de Batalha Especiais']
  },
  {
    id: 'recoome',
    name: 'Recoome',
    searchName: 'Recoome',
    fandomName: 'Recoome',
    gender: 'Masculino',
    species: 'Alienígena',
    affiliation: ['Forças Especiais Ginyu', 'Exército de Freeza'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Recoome Eraser Gun',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Morto',
    quote: 'Recoome Kick! Recoome Mach Attack! O show das Forças Ginyu nunca falha!',
    techniques: ['Eraser Gun', 'Recoome Kick', 'Recoome Ultra Fighting Miracle Bomber']
  },
  {
    id: 'burter',
    name: 'Burter',
    searchName: 'Burter',
    fandomName: 'Burter',
    gender: 'Masculino',
    species: 'Alienígena',
    affiliation: ['Forças Especiais Ginyu', 'Exército de Freeza'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Velocidade Mais Rápida do Universo',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Morto',
    quote: 'Eu sou o vendaval azul! Não existe ser vivo mais veloz do que eu no universo!',
    techniques: ['Blue Hurricane', 'Speed Up', 'Ataque Combinado Purple Comet']
  },
  {
    id: 'jeice',
    name: 'Jeice',
    searchName: 'Jeice',
    fandomName: 'Jeice',
    gender: 'Masculino',
    species: 'Alienígena',
    affiliation: ['Forças Especiais Ginyu', 'Exército de Freeza'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Crusher Ball (Esfera de Plasma)',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Morto',
    quote: 'O Magma Vermelho das Forças Ginyu vai incinerar você!',
    techniques: ['Crusher Ball', 'Continuous Crusher Ball', 'Purple Comet Crash']
  },
  {
    id: 'guldo',
    name: 'Guldo',
    searchName: 'Guldo',
    fandomName: 'Guldo',
    gender: 'Masculino',
    species: 'Alienígena',
    affiliation: ['Forças Especiais Ginyu', 'Exército de Freeza'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Congelamento Temporal (Parar o Tempo)',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Morto',
    quote: 'Enquanto eu segurar o ar, o tempo de todo o universo fica completamente congelado!',
    techniques: ['Time Freeze', 'Paralisia Telecinética', 'Espinho Telecinético de Tronco']
  },
  {
    id: 'freeza',
    name: 'Freeza',
    searchName: 'Frieza',
    fandomName: 'Frieza',
    gender: 'Masculino',
    species: 'Raça Freeza',
    affiliation: ['Exército de Freeza'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Black Freeza',
    styleOrPower: 'Death Beam (Raio da Morte)',
    debutArc: 'Saga de Freeza (Namekusei)',
    status: 'Vivo',
    quote: 'Meu poder de luta é de quinhentos e trinta mil... Mas não se preocupe, eu pretendo torturá-lo bem devagar.',
    techniques: ['Death Beam', 'Death Ball', 'Supernova', 'Golden Freeza', 'Black Freeza']
  },

  // --- Saga dos Androides & Cell ---
  {
    id: 'rei-cold',
    name: 'Rei Cold',
    searchName: 'King Cold',
    fandomName: 'King Cold',
    gender: 'Masculino',
    species: 'Raça Freeza',
    affiliation: ['Exército de Freeza'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Segunda Forma',
    styleOrPower: 'Canhão de Super Raio Destruidor',
    debutArc: 'Saga dos Androides & Cell',
    status: 'Morto',
    quote: 'A nossa linhagem é a soberana suprema do universo!',
    techniques: ['Super Ray Cannon', 'Golpe de Espada do Destino']
  },
  {
    id: 'trunks-do-futuro',
    name: 'Trunks do Futuro',
    searchName: 'Future Trunks',
    fandomName: 'Future Trunks',
    gender: 'Masculino',
    species: 'Híbrido (Saiyajin / Humano)',
    affiliation: ['Guerreiros Z', 'Resistência do Futuro'],
    origin: 'Planeta Terra',
    maxRelease: 'Super Saiyajin Rage',
    styleOrPower: 'Burning Attack e Espada de Luz',
    debutArc: 'Saga dos Androides & Cell',
    status: 'Vivo',
    quote: 'Vocês estão prestes a descobrir que existe um outro Super Saiyajin bem aqui!',
    techniques: ['Burning Attack', 'Buster Cannon', 'Corte com Espada de Luz', 'Mafuba', 'Super Saiyajin Rage']
  },
  {
    id: 'dr-gero',
    name: 'Dr. Gero (Androide 20)',
    searchName: 'Dr. Gero',
    fandomName: 'Dr. Gero',
    gender: 'Masculino',
    species: 'Androide / Ciborgue',
    affiliation: ['Força Red Ribbon'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Absorção de Energia com Dispositivos nas Palmas',
    debutArc: 'Saga dos Androides & Cell',
    status: 'Morto',
    quote: 'Minhas criações mecânicas foram projetadas com dados perfeitos para aniquilar Son Goku!',
    techniques: ['Absorção de Ki pelas Palmas', 'Olhar Laser Perfurante', 'Bionic Punisher']
  },
  {
    id: 'androide-19',
    name: 'Androide 19',
    searchName: 'Android 19',
    fandomName: 'Android 19',
    gender: 'Sem Gênero',
    species: 'Androide',
    affiliation: ['Força Red Ribbon'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Drenagem de Ki Manual',
    debutArc: 'Saga dos Androides & Cell',
    status: 'Morto',
    quote: 'Alvo Son Goku localizado. Iniciando protocolo de absorção de poder.',
    techniques: ['Drenagem de Energia', 'Raios Oculares de Plasma', 'Canhão de Fótons']
  },
  {
    id: 'androide-18',
    name: 'Androide 18',
    searchName: 'Android 18',
    fandomName: 'Android 18',
    gender: 'Feminino',
    species: 'Ciborgue (Humana Modificada)',
    affiliation: ['Guerreiros Z', 'Universo 7'],
    origin: 'Planeta Terra',
    maxRelease: 'Energia Ilimitada',
    styleOrPower: 'Disparo de Esferas de Energia Infinita',
    debutArc: 'Saga dos Androides & Cell',
    status: 'Vivo',
    quote: 'Você fala demais para quem está prestes a ter o braço quebrado!',
    techniques: ['Infinity Bullet', 'Destructo Disc (Kienzan)', 'Sadistic 18', 'Accel Dance']
  },
  {
    id: 'androide-17',
    name: 'Androide 17',
    searchName: 'Android 17',
    fandomName: 'Android 17',
    gender: 'Masculino',
    species: 'Ciborgue (Humano Modificado)',
    affiliation: ['Guerreiros Z', 'Guarda-Florestal', 'Universo 7'],
    origin: 'Planeta Terra',
    maxRelease: 'Energia Ilimitada',
    styleOrPower: 'Android Barrier (Barreira de Energia)',
    debutArc: 'Saga dos Androides & Cell',
    status: 'Vivo',
    quote: 'Proteger a natureza da Ilha dos Monstros é meu trabalho. Mas salvar o universo com os Guerreiros Z não soa mal.',
    techniques: ['Android Barrier', 'Super Electric Strike', 'Endgame Blast', 'Velocidade Ilimitada']
  },
  {
    id: 'androide-16',
    name: 'Androide 16',
    searchName: 'Android 16',
    fandomName: 'Android 16',
    gender: 'Sem Gênero',
    species: 'Androide',
    affiliation: ['Força Red Ribbon'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Hell\'s Flash (Canhão Vulcânico)',
    debutArc: 'Saga dos Androides & Cell',
    status: 'Morto',
    quote: 'Gohan... Não é pecado lutar pela justiça. Liberte a sua fúria e proteja a natureza que eu tanto amei.',
    techniques: ['Hell\'s Flash', 'Rocket Punch', 'Autodestruição Nuclear']
  },
  {
    id: 'cell',
    name: 'Cell',
    searchName: 'Cell',
    fandomName: 'Cell',
    gender: 'Sem Gênero',
    species: 'Bio-Androide',
    affiliation: ['Força Red Ribbon'],
    origin: 'Planeta Terra',
    maxRelease: 'Cell Perfeito (Super Perfect Cell)',
    styleOrPower: 'Solar Kamehameha e Absorção Biológica',
    debutArc: 'Saga dos Androides & Cell',
    status: 'Morto',
    quote: 'Eu sou a criatura definitiva concebida pelo computador do Dr. Gero! Eu alcancei a perfeição!',
    techniques: ['Solar Kamehameha', 'Makankosappo', 'Regeneração Celular', 'Criação de Cell Juniores', 'Absorção Caudal']
  },
  {
    id: 'mr-satan',
    name: 'Mr. Satan',
    searchName: 'Mr. Satan',
    fandomName: 'Hercule Satan',
    gender: 'Masculino',
    species: 'Humano',
    affiliation: ['Campeão Mundial'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Dynamite Kick e Carisma Mundial',
    debutArc: 'Saga dos Androides & Cell',
    status: 'Vivo',
    quote: 'Eu sou o Campeão do Mundo, o invencível Mr. Satan! Povo da Terra, levantem suas mãos para ajudar Goku!',
    techniques: ['Dynamite Kick', 'Satan Miracle Special Ultra Super Megaton Punch', 'Carisma e Apelo Global']
  },
  {
    id: 'trunks',
    name: 'Trunks (Criança)',
    searchName: 'Trunks (Kid)',
    fandomName: 'Trunks',
    gender: 'Masculino',
    species: 'Híbrido (Saiyajin / Humano)',
    affiliation: ['Guerreiros Z', 'Corporação Cápsula'],
    origin: 'Planeta Terra',
    maxRelease: 'Super Saiyajin',
    styleOrPower: 'Final Cannon e Dança da Fusão',
    debutArc: 'Saga dos Androides & Cell',
    status: 'Vivo',
    quote: 'Papai, olha como eu sou forte! Já consigo lutar na gravidade pesada!',
    techniques: ['Final Cannon', 'Buster Blaster', 'Dança da Fusão']
  },

  // --- Saga de Majin Boo ---
  {
    id: 'son-goten',
    name: 'Son Goten',
    searchName: 'Son Goten',
    fandomName: 'Goten',
    gender: 'Masculino',
    species: 'Híbrido (Saiyajin / Humano)',
    affiliation: ['Guerreiros Z'],
    origin: 'Planeta Terra',
    maxRelease: 'Super Saiyajin',
    styleOrPower: 'Kamehameha e Fusão Metamoru',
    debutArc: 'Saga de Majin Boo',
    status: 'Vivo',
    quote: 'Olha, Trunks! Eu consigo virar Super Saiyajin também!',
    techniques: ['Kamehameha', 'Assault!', 'Dança da Fusão']
  },
  {
    id: 'gotenks',
    name: 'Gotenks',
    searchName: 'Gotenks',
    fandomName: 'Gotenks',
    gender: 'Masculino',
    species: 'Híbrido (Saiyajin / Humano - Fusão)',
    affiliation: ['Guerreiros Z'],
    origin: 'Planeta Terra',
    maxRelease: 'Super Saiyajin 3',
    styleOrPower: 'Super Ghost Kamikaze Attack',
    debutArc: 'Saga de Majin Boo',
    status: 'Vivo',
    quote: 'Eu sou a fusão suprema: o glorioso Ceifador da Justiça, Gotenks!',
    techniques: ['Super Ghost Kamikaze Attack', 'Galactic Donut', 'Ultra Buu Buu Volleyball', 'Super Saiyajin 3']
  },
  {
    id: 'vegetto',
    name: 'Vegetto',
    searchName: 'Vegito',
    fandomName: 'Vegito',
    gender: 'Masculino',
    species: 'Saiyajin (Fusão Potara)',
    affiliation: ['Guerreiros Z'],
    origin: 'Planeta Terra',
    maxRelease: 'Super Saiyajin Blue',
    styleOrPower: 'Final Kamehameha e Spirit Sword',
    debutArc: 'Saga de Majin Boo',
    status: 'Vivo',
    quote: 'Goku e Vegeta fundidos pelos Brincos Potara! Este é o nascimento de Vegetto!',
    techniques: ['Final Kamehameha', 'Spirit Sword', 'Big Bang Flash', 'Super Saiyajin Blue']
  },
  {
    id: 'videl',
    name: 'Videl',
    searchName: 'Videl',
    fandomName: 'Videl',
    gender: 'Feminino',
    species: 'Humano',
    affiliation: ['Guerreiros Z', 'Família Satan'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Bukujutsu (Voo) e Artes Marciais',
    debutArc: 'Saga de Majin Boo',
    status: 'Vivo',
    quote: 'Gohan, me ensine a controlar o meu Ki para que eu possa voar pelos céus!',
    techniques: ['Bukujutsu (Voo)', 'Eagle Kick', 'Controle Básico de Ki']
  },
  {
    id: 'shin',
    name: 'Shin (Supremo Kaioh)',
    searchName: 'Shin',
    fandomName: 'Shin',
    gender: 'Sem Gênero',
    species: 'Divindade (Shinjin / Kaioshin)',
    affiliation: ['Reino dos Deuses', 'Universo 7'],
    origin: 'Reinos Divinos',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Telecinese Divina e Brincos Potara',
    debutArc: 'Saga de Majin Boo',
    status: 'Vivo',
    quote: 'Nós somos os Supremos Senhores Kaioh, os deuses da criação deste universo.',
    techniques: ['Onda Invisível de Kiai', 'Telecinese Imobilizadora', 'Teletransporte Divino (Kai Kai)']
  },
  {
    id: 'kibito',
    name: 'Kibito',
    searchName: 'Kibito',
    fandomName: 'Kibito',
    gender: 'Sem Gênero',
    species: 'Divindade (Shinjin)',
    affiliation: ['Reino dos Deuses', 'Planeta Supremo Kaioshin'],
    origin: 'Reinos Divinos',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Cura Espiritual e Kai Kai',
    debutArc: 'Saga de Majin Boo',
    status: 'Vivo',
    quote: 'Como assistente do Supremo Senhor Kaioh, restaurarei toda a sua energia vital.',
    techniques: ['Kai Kai (Teletransporte Divino)', 'Cura Mística']
  },
  {
    id: 'ro-kaioshin',
    name: 'Velho Kaiohshin (Rō Kaiōshin)',
    searchName: 'Old Kai',
    fandomName: 'Old Kai',
    gender: 'Masculino',
    species: 'Divindade (Shinjin Fundido)',
    affiliation: ['Reino dos Deuses', 'Planeta Supremo Kaioshin'],
    origin: 'Reinos Divinos',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Ritual Místico de Despertar Supremo',
    debutArc: 'Saga de Majin Boo',
    status: 'Vivo',
    quote: 'Sente-se quieto e espere o ritual terminar! Eu liberarei o poder de Gohan além de todos os limites!',
    techniques: ['Despertar Místico de Potencial Latente', 'Doação de Vida Divina', 'Fusão Potara']
  },
  {
    id: 'babidi',
    name: 'Babidi',
    searchName: 'Babidi',
    fandomName: 'Babidi',
    gender: 'Masculino',
    species: 'Mago Alienígena',
    affiliation: ['Forças de Babidi'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Magia de Controle Mental Majin (Selo M)',
    debutArc: 'Saga de Majin Boo',
    status: 'Morto',
    quote: 'Paparapa! Desperte da sua esfera mágica, terrível Majin Boo!',
    techniques: ['Feitiço Paparapa', 'Controle da Maldade Alheia', 'Barreira de Feitiço']
  },
  {
    id: 'dabura',
    name: 'Dabura',
    searchName: 'Dabura',
    fandomName: 'Dabura',
    gender: 'Masculino',
    species: 'Demônio',
    affiliation: ['Reino dos Demônios', 'Forças de Babidi'],
    origin: 'Reinos Divinos',
    maxRelease: 'Majin',
    styleOrPower: 'Saliva Petrificante',
    debutArc: 'Saga de Majin Boo',
    status: 'Morto',
    quote: 'Minha saliva transformará todos vocês em simples estátuas de pedra inanimadas!',
    techniques: ['Saliva Petrificante', 'Espada de Trevas Mágica', 'Sopro de Chamas Malignas']
  },
  {
    id: 'majin-boo',
    name: 'Majin Boo',
    searchName: 'Majin Buu',
    fandomName: 'Good Buu',
    gender: 'Sem Gênero',
    species: 'Majin',
    affiliation: ['Guerreiros Z'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Forma Boo Gordo (Good Buu)',
    styleOrPower: 'Feixe de Transformação em Doces',
    debutArc: 'Saga de Majin Boo',
    status: 'Vivo',
    quote: 'Boo vai comer você! Transforme-se em chocolate delicioso!',
    techniques: ['Feixe de Doce', 'Regeneração Total das Células', 'Imitação Instantânea de Técnicas', 'Kamehameha']
  },
  {
    id: 'super-boo',
    name: 'Super Boo',
    searchName: 'Super Buu',
    fandomName: 'Super Buu',
    gender: 'Sem Gênero',
    species: 'Majin',
    affiliation: ['Majins'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Absorção de Gohan Definitivo',
    styleOrPower: 'Human Extinction Attack',
    debutArc: 'Saga de Majin Boo',
    status: 'Morto',
    quote: 'Eu vou exterminar todos os humanos da face da Terra de uma só vez!',
    techniques: ['Human Extinction Attack', 'Grito Dimensional (Vice Shout)', 'Absorção com Tecido Corporal']
  },
  {
    id: 'kid-boo',
    name: 'Kid Boo',
    searchName: 'Kid Buu',
    fandomName: 'Kid Buu',
    gender: 'Sem Gênero',
    species: 'Majin',
    affiliation: ['Majins'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Forma Pura Original',
    styleOrPower: 'Planet Burst',
    debutArc: 'Saga de Majin Boo',
    status: 'Morto',
    quote: 'A encarnação do puro caos e destruição irracional sem piedade!',
    techniques: ['Planet Burst', 'Teletransporte Kai Kai', 'Elasticidade Caótica']
  },
  {
    id: 'uub',
    name: 'Uub',
    searchName: 'Uub',
    fandomName: 'Uub',
    gender: 'Masculino',
    species: 'Humano (Reencarnação de Boo)',
    affiliation: ['Guerreiros Z'],
    origin: 'Planeta Terra',
    maxRelease: 'Poder Divino Desperto',
    styleOrPower: 'Poder Espiritual e Ki Divino',
    debutArc: 'Saga de Majin Boo',
    status: 'Vivo',
    quote: 'Eu vou lutar com todas as minhas forças para conseguir o prêmio e ajudar a minha aldeia!',
    techniques: ['Explosão de Ki Divino Primitivo', 'Kiai Esferoidal']
  },
  {
    id: 'pan',
    name: 'Pan',
    searchName: 'Pan',
    fandomName: 'Pan',
    gender: 'Feminino',
    species: 'Híbrido (Saiyajin / Humano)',
    affiliation: ['Família Son', 'Guerreiros Z'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Voo Natural e Artes Marciais',
    debutArc: 'Saga de Majin Boo',
    status: 'Vivo',
    quote: 'Tio Piccolo! Olha só, eu finalmente aprendi a voar pelo céu direitinho!',
    techniques: ['Bukujutsu (Voo)', 'Golpes Ágeis de Saiyajin']
  },

  // --- Saga do Deus da Destruição Bills ---
  {
    id: 'bills',
    name: 'Bills (Beerus)',
    searchName: 'Beerus',
    fandomName: 'Beerus',
    gender: 'Masculino',
    species: 'Divindade (Hakaishin)',
    affiliation: ['Reino dos Deuses', 'Universo 7'],
    origin: 'Reinos Divinos',
    maxRelease: 'Modo Deus da Destruição Completo',
    styleOrPower: 'Hakai (Destruição Absoluta)',
    debutArc: 'Saga do Deus da Destruição Bills',
    status: 'Vivo',
    quote: 'Antes da criação, deve haver a destruição! Hakai!',
    techniques: ['Hakai', 'Esfera da Destruição Solar', 'Instinto Superior Incompleto']
  },
  {
    id: 'whis',
    name: 'Whis',
    searchName: 'Whis',
    fandomName: 'Whis',
    gender: 'Masculino',
    species: 'Divindade (Anjo)',
    affiliation: ['Reino dos Deuses', 'Universo 7'],
    origin: 'Reinos Divinos',
    maxRelease: 'Instinto Superior Angelical',
    styleOrPower: 'Retrocesso Temporal (3 Minutos)',
    debutArc: 'Saga do Deus da Destruição Bills',
    status: 'Vivo',
    quote: 'O corpo deve pensar e se esquivar por conta própria, sem passar pelo raciocínio cerebral.',
    techniques: ['Retrocesso Temporal de Três Minutos', 'Teletransporte Cósmico', 'Criação de Barreiras Invulneráveis']
  },
  {
    id: 'jaco',
    name: 'Jaco',
    searchName: 'Jaco Teirimentenpoboshi',
    fandomName: 'Jaco',
    gender: 'Masculino',
    species: 'Alienígena',
    affiliation: ['Patrulha Galáctica'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Canhão Extintor e Mira Perfeita',
    debutArc: 'Saga do Deus da Destruição Bills',
    status: 'Vivo',
    quote: 'Eu sou Jaco, o Super Patrulheiro Galáctico de elite defensor do cosmos!',
    techniques: ['Disparo Laser Paralisante', 'Foguetes Propulsores', 'Visão Microscópica e Telescópica']
  },

  // --- Saga do Universo 6 ---
  {
    id: 'champa',
    name: 'Champa',
    searchName: 'Champa',
    fandomName: 'Champa',
    gender: 'Masculino',
    species: 'Divindade (Hakaishin)',
    affiliation: ['Reino dos Deuses', 'Universo 6'],
    origin: 'Reinos Divinos',
    maxRelease: 'Modo Deus da Destruição',
    styleOrPower: 'Hakai do Universo 6',
    debutArc: 'Saga do Universo 6',
    status: 'Vivo',
    quote: 'Meu Universo 6 tem guerreiros muito mais poderosos e refinados do que o seu, Bills!',
    techniques: ['Hakai', 'Super Esferas da Destruição']
  },
  {
    id: 'vados',
    name: 'Vados',
    searchName: 'Vados',
    fandomName: 'Vados',
    gender: 'Feminino',
    species: 'Divindade (Anjo)',
    affiliation: ['Reino dos Deuses', 'Universo 6'],
    origin: 'Reinos Divinos',
    maxRelease: 'Instinto Superior Angelical',
    styleOrPower: 'Manipulação Espacial Cósmica',
    debutArc: 'Saga do Universo 6',
    status: 'Vivo',
    quote: 'Como a irmã mais velha de Whis, devo admitir que meu poder é ligeiramente superior.',
    techniques: ['Construção de Domos Dimensionais', 'Manipulação Temporal', 'Cajado Angelical']
  },
  {
    id: 'hit',
    name: 'Hit',
    searchName: 'Hit',
    fandomName: 'Hit',
    gender: 'Masculino',
    species: 'Alienígena',
    affiliation: ['Universo 6'],
    origin: 'Planeta Sadala',
    maxRelease: 'Prisão Temporal (Time Cage)',
    styleOrPower: 'Salto no Tempo (Tokitobashi)',
    debutArc: 'Saga do Universo 6',
    status: 'Vivo',
    quote: 'Meu trabalho como assassino infalível é concluído em um décimo de segundo de salto temporal.',
    techniques: ['Tokitobashi (Salto no Tempo)', 'Golpe Perfurante Invisível', 'Armazenamento Temporal de Bolso']
  },
  {
    id: 'cabba',
    name: 'Cabba',
    searchName: 'Cabba',
    fandomName: 'Cabba',
    gender: 'Masculino',
    species: 'Saiyajin',
    affiliation: ['Universo 6', 'Forças de Defesa de Sadala'],
    origin: 'Planeta Sadala',
    maxRelease: 'Super Saiyajin 2',
    styleOrPower: 'Galick Cannon',
    debutArc: 'Saga do Universo 6',
    status: 'Vivo',
    quote: 'Mestre Vegeta! Por favor, ensine-me a transformar meu Ki em Super Saiyajin!',
    techniques: ['Galick Cannon', 'Impulse Edge', 'Super Saiyajin 2']
  },
  {
    id: 'frost',
    name: 'Frost',
    searchName: 'Frost',
    fandomName: 'Frost',
    gender: 'Masculino',
    species: 'Raça Freeza',
    affiliation: ['Universo 6'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Forma Final',
    styleOrPower: 'Agulha Venenosa Oculta',
    debutArc: 'Saga do Universo 6',
    status: 'Vivo',
    quote: 'Em uma batalha real, o vencedor é aquele que utiliza todos os truques necessários!',
    techniques: ['Agulha Venenosa Secreta', 'Chaos Beam', 'Metamorfose']
  },
  {
    id: 'zen-o',
    name: 'Zen\'o (Rei de Tudo)',
    searchName: 'Grand Zeno',
    fandomName: 'Grand Zeno',
    gender: 'Sem Gênero',
    species: 'Divindade Suprema',
    affiliation: ['Palácio de Zen\'o'],
    origin: 'Reinos Divinos',
    maxRelease: 'Apagamento Cósmico Instantâneo',
    styleOrPower: 'Apagamento Universal (Erase)',
    debutArc: 'Saga do Universo 6',
    status: 'Vivo',
    quote: 'Se você fizer algo ruim... Eu vou apagar o seu universo inteiro num piscar de olhos!',
    techniques: ['Apagamento Universal Absoluto', 'Invulnerabilidade Divina Total']
  },

  // --- Saga de Goku Black / Trunks do Futuro ---
  {
    id: 'zamasu',
    name: 'Zamasu',
    searchName: 'Zamasu',
    fandomName: 'Zamasu',
    gender: 'Masculino',
    species: 'Divindade (Kaioshin / Shinjin)',
    affiliation: ['Reino dos Deuses', 'Universo 10'],
    origin: 'Reinos Divinos',
    maxRelease: 'Corpo Imortal Indestrutível',
    styleOrPower: 'Lâmina Divina de Ki e Imortalidade',
    debutArc: 'Saga de Goku Black / Trunks do Futuro',
    status: 'Morto',
    quote: 'Meros mortais desafiando o plano dos deuses... O Plano Zero Mortais trará pureza ao cosmos!',
    techniques: ['Espada de Ki Divina', 'Imortalidade Absoluta', 'Anel do Tempo']
  },
  {
    id: 'goku-black',
    name: 'Goku Black',
    searchName: 'Goku Black',
    fandomName: 'Goku Black',
    gender: 'Masculino',
    species: 'Saiyajin (Corpo de Goku / Alma de Zamasu)',
    affiliation: ['Plano Zero Mortais'],
    origin: 'Planeta Terra',
    maxRelease: 'Super Saiyajin Rosé',
    styleOrPower: 'Black Kamehameha e Foice de Ki',
    debutArc: 'Saga de Goku Black / Trunks do Futuro',
    status: 'Morto',
    quote: 'Este é o Super Saiyajin Rosé! Minhas cores refletem a beleza sublime e a fúria dos deuses!',
    techniques: ['Black Kamehameha', 'Super Saiyajin Rosé', 'Lâmina Divina Violenta', 'Fenda Dimensional com Foice']
  },
  {
    id: 'daishinkan',
    name: 'Daishinkan (Sumo Sacerdote)',
    searchName: 'Grand Priest',
    fandomName: 'Grand Priest',
    gender: 'Masculino',
    species: 'Divindade (Anjo Supremo)',
    affiliation: ['Palácio de Zen\'o', 'Reino dos Deuses'],
    origin: 'Reinos Divinos',
    maxRelease: 'Instinto Superior Celestial Perfeito',
    styleOrPower: 'Poder Angelical Primordial',
    debutArc: 'Saga de Goku Black / Trunks do Futuro',
    status: 'Vivo',
    quote: 'Todos os deuses e anjos deste multiverso devem reverenciar as ordens de Lorde Zen\'o.',
    techniques: ['Criação do Mundo do Vazio', 'Imobilização Multiversal', 'Ressurreição Divina']
  },

  // --- Saga do Torneio do Poder ---
  {
    id: 'jiren',
    name: 'Jiren',
    searchName: 'Jiren',
    fandomName: 'Jiren',
    gender: 'Masculino',
    species: 'Alienígena',
    affiliation: ['Tropa do Orgulho', 'Universo 11'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Poder Máximo Desperto',
    styleOrPower: 'Overheat Magnetron e Ki Inquebrável',
    debutArc: 'Saga do Torneio do Poder',
    status: 'Vivo',
    quote: 'A força é a única verdade absoluta! A confiança não passa de uma ilusão descartável.',
    techniques: ['Power Impact', 'Overheat Magnetron', 'Barreira de Ki Ocular', 'Força Sobrepujante a Deuses']
  },
  {
    id: 'toppo',
    name: 'Toppo',
    searchName: 'Top',
    fandomName: 'Top',
    gender: 'Masculino',
    species: 'Alienígena / Candidato a Hakaishin',
    affiliation: ['Tropa do Orgulho', 'Universo 11'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Modo Deus da Destruição (Hakaishin)',
    styleOrPower: 'Justice Flash e Hakai',
    debutArc: 'Saga do Torneio do Poder',
    status: 'Vivo',
    quote: 'Pela Justiça Suprema! Se for preciso para salvar o Universo 11, eu abraçarei a Destruição!',
    techniques: ['Justice Flash', 'Hakai', 'Justice Rear Naked Choke', 'Aura de Destruição']
  },
  {
    id: 'dyspo',
    name: 'Dyspo',
    searchName: 'Dyspo',
    fandomName: 'Dyspo',
    gender: 'Masculino',
    species: 'Alienígena',
    affiliation: ['Tropa do Orgulho', 'Universo 11'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Modo Super Velocidade da Luz',
    styleOrPower: 'Velocidade Supersônica da Luz',
    debutArc: 'Saga do Torneio do Poder',
    status: 'Vivo',
    quote: 'Minha velocidade ultrapassa as ondas sonoras e atinge os limites da própria luz!',
    techniques: ['Super Maximum Light Speed Mode', 'Justice Cannon', 'Justice Crush']
  },
  {
    id: 'caulifla',
    name: 'Caulifla',
    searchName: 'Caulifla',
    fandomName: 'Caulifla',
    gender: 'Feminino',
    species: 'Saiyajin',
    affiliation: ['Universo 6', 'Gangue de Sadala'],
    origin: 'Planeta Sadala',
    maxRelease: 'Super Saiyajin 2',
    styleOrPower: 'Crush Cannon',
    debutArc: 'Saga do Torneio do Poder',
    status: 'Vivo',
    quote: 'Sentir o formigamento nas costas... É assim que se atinge o Super Saiyajin com facilidade!',
    techniques: ['Crush Cannon', 'Super Saiyajin 2', 'Golpes Selvagens de Rua']
  },
  {
    id: 'kale',
    name: 'Kale',
    searchName: 'Kale',
    fandomName: 'Kale',
    gender: 'Feminino',
    species: 'Saiyajin',
    affiliation: ['Universo 6'],
    origin: 'Planeta Sadala',
    maxRelease: 'Super Saiyajin Berserk',
    styleOrPower: 'Resist Blast e Fúria Berserk',
    debutArc: 'Saga do Torneio do Poder',
    status: 'Vivo',
    quote: 'Irmã Caulifla... Eu não permitirei que ninguém no multiverso machuque você!',
    techniques: ['Resist Blast', 'Gigantic Impact', 'Super Saiyajin Berserker']
  },
  {
    id: 'kefla',
    name: 'Kefla',
    searchName: 'Kefla',
    fandomName: 'Kefla',
    gender: 'Feminino',
    species: 'Saiyajin (Fusão Potara)',
    affiliation: ['Universo 6'],
    origin: 'Planeta Sadala',
    maxRelease: 'Super Saiyajin 2',
    styleOrPower: 'Gigantic Burst e Raios Cortantes',
    debutArc: 'Saga do Torneio do Poder',
    status: 'Vivo',
    quote: 'Sinta esse poder infinito! As duas guerreiras Saiyajins do Universo 6 são imbatíveis juntas!',
    techniques: ['Gigantic Burst', 'Ray Blast Laser', 'Super Saiyajin 2']
  },

  // --- Saga do Prisioneiro da Patrulha Galáctica (Moro) ---
  {
    id: 'moro',
    name: 'Moro (Devorador de Mundos)',
    searchName: 'Moro',
    fandomName: 'Moro',
    gender: 'Masculino',
    species: 'Mago Cósmico',
    affiliation: ['Prisioneiros da Patrulha Galáctica'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Fusão com a Terra (Planeta Moro)',
    styleOrPower: 'Drenagem Mágica de Energia Vital',
    debutArc: 'Saga do Prisioneiro da Patrulha Galáctica (Moro)',
    status: 'Morto',
    quote: 'A energia da vida dos planetas e de seus deuses existe para ser consumida e me rejuvenescer!',
    techniques: ['Drenagem de Energia Vital', 'Absorção Mágica de Seven-Three', 'Cópia de Habilidades Angelicais']
  },
  {
    id: 'meerus',
    name: 'Meerus',
    searchName: 'Merus',
    fandomName: 'Merus',
    gender: 'Masculino',
    species: 'Divindade (Anjo Aprendiz / Humano)',
    affiliation: ['Patrulha Galáctica'],
    origin: 'Reinos Divinos',
    maxRelease: 'Instinto Superior Angelical',
    styleOrPower: 'Perícia de Patrulheiro e Instinto',
    debutArc: 'Saga do Prisioneiro da Patrulha Galáctica (Moro)',
    status: 'Vivo',
    quote: 'Goku... Para dominar o Instinto Superior, seu coração deve estar em profunda tranquilidade.',
    techniques: ['Instinto Superior Angelical', 'Armas de Captura Galáctica', 'Bastão de Neutralização']
  },
  {
    id: 'broly',
    name: 'Broly (Super)',
    searchName: 'Broly',
    fandomName: 'Broly (DBS)',
    gender: 'Masculino',
    species: 'Saiyajin',
    affiliation: ['Guerreiros Z', 'Planeta Vampa'],
    origin: 'Planeta Vegeta',
    maxRelease: 'Super Saiyajin Poder Total (Full Power)',
    styleOrPower: 'Gigantic Roar e Ira Oozaru',
    debutArc: 'Saga do Prisioneiro da Patrulha Galáctica (Moro)',
    status: 'Vivo',
    quote: 'Um guerreiro de coração bondoso que esconde uma fúria destrutiva imensurável!',
    techniques: ['Gigantic Roar', 'Gigantic Meteor', 'Estado de Ira (Ikari)', 'Super Saiyajin Lendário']
  },
  {
    id: 'cheelai',
    name: 'Cheelai',
    searchName: 'Cheelai',
    fandomName: 'Cheelai',
    gender: 'Feminino',
    species: 'Alienígena',
    affiliation: ['Planeta de Bills', 'Exército de Freeza'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Pistola Laser e Coração Justo',
    debutArc: 'Saga do Prisioneiro da Patrulha Galáctica (Moro)',
    status: 'Vivo',
    quote: 'Shenlong! Por favor, mande Broly de volta para o planeta onde ele vivia em paz!',
    techniques: ['Disparo Laser Portátil', 'Uso do Radar de Esferas']
  },

  // --- Saga do Sobrevivente Granolah ---
  {
    id: 'granolah',
    name: 'Granolah',
    searchName: 'Granolah',
    fandomName: 'Granolah',
    gender: 'Masculino',
    species: 'Cerealiano',
    affiliation: ['Caçadores de Recompensa'],
    origin: 'Planeta Cereal',
    maxRelease: 'Maior Guerreiro do Universo',
    styleOrPower: 'Tiro nos Pontos Vitais e Olho Direito',
    debutArc: 'Saga do Sobrevivente Granolah',
    status: 'Vivo',
    quote: 'Com meu olho direito e a mira certeira de um Cerealiano, eu vingarei a extinção do meu povo!',
    techniques: ['Ataque aos Pontos Vitais', 'Tiros Perfurantes de Dois Dedos', 'Visão de Fluxo Sanguíneo']
  },
  {
    id: 'gas',
    name: 'Gas',
    searchName: 'Gas',
    fandomName: 'Gas',
    gender: 'Masculino',
    species: 'Heeter',
    affiliation: ['Heeters'],
    origin: 'Espaço Sideral / Desconhecido',
    maxRelease: 'Instinto Selvagem Berserk',
    styleOrPower: 'Materialização de Armas de Ki',
    debutArc: 'Saga do Sobrevivente Granolah',
    status: 'Morto',
    quote: 'Eu sou a arma suprema da família Heeter! Ninguém supera o meu novo poder absoluto!',
    techniques: ['Criação de Lanças e Escudos de Ki', 'Telecinese Gravitacional', 'Teletransporte Veloz']
  },

  // --- Saga Super Hero ---
  {
    id: 'gamma-1',
    name: 'Gamma 1',
    searchName: 'Gamma 1',
    fandomName: 'Gamma 1',
    gender: 'Sem Gênero',
    species: 'Androide',
    affiliation: ['Força Red Ribbon', 'Super-Heróis'],
    origin: 'Planeta Terra',
    maxRelease: 'Nenhuma',
    styleOrPower: 'Pistola de Raios Blaster e Cálculo Tático',
    debutArc: 'Saga Super Hero',
    status: 'Vivo',
    quote: 'Nós somos androides super-heróis defensores da verdadeira justiça!',
    techniques: ['Disparo Blaster de Precisão', 'Cálculo Tático Instantâneo', 'Voo com Capa Propulsora']
  },
  {
    id: 'gamma-2',
    name: 'Gamma 2',
    searchName: 'Gamma 2',
    fandomName: 'Gamma 2',
    gender: 'Sem Gênero',
    species: 'Androide',
    affiliation: ['Força Red Ribbon', 'Super-Heróis'],
    origin: 'Planeta Terra',
    maxRelease: 'Core Breaker',
    styleOrPower: 'Ataque Relâmpago Blaster e Sacrifício',
    debutArc: 'Saga Super Hero',
    status: 'Morto',
    quote: 'Um verdadeiro herói não hesita em arriscar a própria existência para salvar o planeta!',
    techniques: ['Core Breaker', 'Blaster Flash Estilizado', 'Golpe Heroico Espetacular']
  },
  {
    id: 'dr-hedo',
    name: 'Dr. Hedo',
    searchName: 'Dr. Hedo',
    fandomName: 'Dr. Hedo',
    gender: 'Masculino',
    species: 'Ciborgue (Humano Modificado)',
    affiliation: ['Corporação Cápsula', 'Força Red Ribbon'],
    origin: 'Planeta Terra',
    maxRelease: 'Pele Blindada',
    styleOrPower: 'Genialidade Bio-Cibernética de Androides',
    debutArc: 'Saga Super Hero',
    status: 'Vivo',
    quote: 'Eu sou o neto do Dr. Gero, mas meu sonho sempre foi criar super-heróis magníficos!',
    techniques: ['Engenharia de Bio-Androides', 'Pele Revestida à Prova de Balas']
  },
  {
    id: 'cell-max',
    name: 'Cell Max',
    searchName: 'Cell Max',
    fandomName: 'Cell Max',
    gender: 'Sem Gênero',
    species: 'Bio-Androide Gigante',
    affiliation: ['Força Red Ribbon'],
    origin: 'Planeta Terra',
    maxRelease: 'Forma Desperta Descontrolada',
    styleOrPower: 'Esfera Gigante de Aniquilação',
    debutArc: 'Saga Super Hero',
    status: 'Morto',
    quote: 'A monstruosidade biológica descontrolada criada para erradicar tudo em seu caminho!',
    techniques: ['Disparo Laser Contínuo da Cauda', 'Esfera Planetária Vermelha', 'Rugido Sônico']
  }
];

async function fetchFandomImage(name) {
  try {
    const pageUrl = `https://dragonball.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(name)}&pithumbsize=400&format=json`;
    const pageRes = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://dragonball.fandom.com/'
      },
      signal: AbortSignal.timeout(6000)
    });
    if (!pageRes.ok) return null;
    const pageData = await pageRes.json();
    const page = Object.values(pageData?.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (err) {
    return null;
  }
}

async function fetchAnilistImage(searchName) {
  const query = `query ($search: String) { Character(search: $search) { id name { full } image { large } } }`;
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { search: searchName } }),
      signal: AbortSignal.timeout(6000)
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.Character?.image?.large || null;
  } catch (err) {
    return null;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function buildDragonBall() {
  console.log(`\n=== CONSTRUINDO BANCO DE DRAGON BALL (${DRAGON_BALL_ROSTER.length} PERSONAGENS) ===\n`);

  const finalCharacters = [];

  for (let i = 0; i < DRAGON_BALL_ROSTER.length; i++) {
    const item = DRAGON_BALL_ROSTER[i];
    const localImgName = `${item.id}.png`;
    const localImgPath = path.join(avatarsDir, localImgName);

    console.log(`[${i + 1}/${DRAGON_BALL_ROSTER.length}] Processando ${item.name} (${item.id})...`);

    const avatarUrl = `/avatars/dragon-ball/${localImgName}`;
    const fileExists = fs.existsSync(localImgPath) && fs.statSync(localImgPath).size > 500;

    if (!fileExists) {
      await sleep(650); // Previne rate-limit do AniList

      let remoteUrl = null;

      // 1. Tenta Fandom primeiro (geralmente tem as imagens canônicas exatas de DB)
      if (item.fandomName) {
        remoteUrl = await fetchFandomImage(item.fandomName);
      }
      if (!remoteUrl) {
        remoteUrl = await fetchFandomImage(item.name);
      }

      // 2. Se não achar no Fandom, busca no AniList
      if (!remoteUrl) {
        remoteUrl = await fetchAnilistImage(item.searchName || item.name);
      }

      if (remoteUrl) {
        try {
          const imgRes = await fetch(remoteUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Referer': 'https://dragonball.fandom.com/'
            },
            signal: AbortSignal.timeout(8000)
          });
          if (imgRes.ok) {
            const buffer = Buffer.from(await imgRes.arrayBuffer());
            // Para Dragon Ball, position: 'center' preserva queixo, boca e expressão perfeitamente
            await sharp(buffer)
              .resize(240, 240, { fit: 'cover', position: 'center' })
              .png({ quality: 90 })
              .toFile(localImgPath);
            console.log(`   ✓ Avatar salvo: ${localImgName}`);
          } else {
            console.warn(`   ⚠️ Erro HTTP ao baixar: ${imgRes.status}`);
          }
        } catch (err) {
          console.warn(`   ⚠️ Falha ao salvar imagem local: ${err.message}`);
        }
      } else {
        console.warn(`   ❌ Não foi possível encontrar imagem para: ${item.name}`);
      }
    } else {
      console.log(`   ✓ Avatar já existe localmente.`);
    }

    const { searchName, fandomName, ...characterData } = item;
    finalCharacters.push({
      ...characterData,
      avatar: avatarUrl
    });
  }

  const jsonPath = path.join(dataDir, 'characters.json');
  fs.writeFileSync(jsonPath, JSON.stringify(finalCharacters, null, 2), 'utf8');
  console.log(`\n🎉 Banco criado com sucesso: ${finalCharacters.length} personagens em ${jsonPath}!\n`);
}

buildDragonBall();
