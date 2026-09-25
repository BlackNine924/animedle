import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'bleach');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

const dataDir = path.join(rootDir, 'src', 'data', 'animes', 'bleach');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 75 personagens canônicos essenciais de Bleach
const BLEACH_ROSTER = [
  // --- Karakura & Principais ---
  {
    id: 'ichigo-kurosaki',
    name: 'Ichigo Kurosaki',
    searchName: 'Ichigo Kurosaki',
    gender: 'Masculino',
    species: 'Shinigami / Quincy / Hollow',
    affiliation: ['Karakura', 'Shinigami Substituto'],
    rank: 'Shinigami Substituto',
    styleOrPower: 'Zangetsu (Tensa Zangetsu)',
    maxRelease: 'Bankai',
    debutArc: 'Shinigami Substituto',
    status: 'Vivo',
    quote: 'Eu não estou lutando porque quero vencer... Estou lutando porque preciso vencer!',
    techniques: ['Getsuga Tensho', 'Getsuga Jujisho', 'Gran Rey Cero', 'Bankai: Tensa Zangetsu']
  },
  {
    id: 'rukia-kuchiki',
    name: 'Rukia Kuchiki',
    searchName: 'Rukia Kuchiki',
    gender: 'Feminino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (13ª Divisão)', 'Clã Kuchiki'],
    rank: 'Capitã',
    styleOrPower: 'Sode no Shirayuki',
    maxRelease: 'Bankai',
    debutArc: 'Shinigami Substituto',
    status: 'Viva',
    quote: 'Não se preocupe com o passado. Preocupe-se com o agora e o amanhã.',
    techniques: ['Some no Mai, Tsukishiro', 'Tsugi no Mai, Hakuren', 'San no Mai, Shirafune', 'Hakka no Togame']
  },
  {
    id: 'orihime-inoue',
    name: 'Orihime Inoue',
    searchName: 'Orihime Inoue',
    gender: 'Feminino',
    species: 'Humano / Fullbringer',
    affiliation: ['Karakura'],
    rank: 'Membro',
    styleOrPower: 'Shun Shun Rikka (Seis Flores do Escudo)',
    maxRelease: 'Fullbring Completo',
    debutArc: 'Shinigami Substituto',
    status: 'Viva',
    quote: 'Se eu pudesse nascer cinco vezes, ainda escolheria a mesma pessoa cinco vezes!',
    techniques: ['Santen Kesshun', 'Soten Kisshun', 'Koten Zanshun', 'Shiten Koshun']
  },
  {
    id: 'uryu-ishida',
    name: 'Uryu Ishida',
    searchName: 'Uryuu Ishida',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Karakura', 'Wandenreich / Schutzstaffel'],
    rank: 'Sternritter (Sucessor)',
    styleOrPower: 'The Antithesis (Schrift A)',
    maxRelease: 'Vollständig',
    debutArc: 'Shinigami Substituto',
    status: 'Vivo',
    quote: 'Eu juro pelo orgulho dos Quincy que vou derrotar você!',
    techniques: ['Licht Regen', 'Gintoki', 'Sprenger', 'The Antithesis']
  },
  {
    id: 'yasutora-sado',
    name: 'Yasutora Sado (Chad)',
    searchName: 'Yasutora Sado',
    gender: 'Masculino',
    species: 'Humano / Fullbringer',
    affiliation: ['Karakura'],
    rank: 'Membro',
    styleOrPower: 'Brazo Derecha del Gigante & Brazo Izquierda del Diablo',
    maxRelease: 'Fullbring Completo',
    debutArc: 'Shinigami Substituto',
    status: 'Vivo',
    quote: 'Se o Ichigo estiver lutando, eu vou lutar ao lado dele. É para isso que serve a minha força.',
    techniques: ['El Directo', 'La Muerte']
  },
  {
    id: 'kisuke-urahara',
    name: 'Kisuke Urahara',
    searchName: 'Kisuke Urahara',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Loja Urahara', 'Ex-Gotei 13 (12ª Divisão)'],
    rank: 'Ex-Capitão',
    styleOrPower: 'Benihime',
    maxRelease: 'Bankai',
    debutArc: 'Shinigami Substituto',
    status: 'Vivo',
    quote: 'Um guerreiro que perde a capacidade de ter medo de sua própria espada não é digno de segurá-la.',
    techniques: ['Nake, Benihime', 'Chikasumi no Tate', 'Kannonbiraki Benihime Aratame', 'Hado #99: Goryutenmetsu']
  },
  {
    id: 'yoruichi-shihoin',
    name: 'Yoruichi Shihoin',
    searchName: 'Yoruichi Shihouin',
    gender: 'Feminino',
    species: 'Shinigami',
    affiliation: ['Clã Shihoin', 'Ex-Gotei 13 (2ª Divisão)'],
    rank: 'Ex-Capitã',
    styleOrPower: 'Shunko (Técnica do Relâmpago Vazio)',
    maxRelease: 'Nenhuma',
    debutArc: 'Sociedade das Almas',
    status: 'Viva',
    quote: 'Coração e mente devem agir como um só. Hesitação na batalha é convite para a sepultura.',
    techniques: ['Shunko', 'Shunko: Raijin Senkei', 'Hankki', 'Utsusemi']
  },
  {
    id: 'isshin-kurosaki',
    name: 'Isshin Kurosaki',
    searchName: 'Isshin Kurosaki',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Clã Shiba', 'Ex-Gotei 13 (10ª Divisão)'],
    rank: 'Ex-Capitão',
    styleOrPower: 'Engetsu',
    maxRelease: 'Bankai',
    debutArc: 'Shinigami Substituto',
    status: 'Vivo',
    quote: 'Viva uma vida da qual possa se orgulhar, sem arrependimentos.',
    techniques: ['Getsuga Tensho', 'Agitowari', 'Onikopin']
  },
  {
    id: 'ryuken-ishida',
    name: 'Ryuken Ishida',
    searchName: 'Ryuuken Ishida',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Família Ishida'],
    rank: 'Último Quincy Puro',
    styleOrPower: 'Arco Espiritual Quincy / Prata Estelar',
    maxRelease: 'Nenhuma',
    debutArc: 'Shinigami Substituto',
    status: 'Vivo',
    quote: 'Eu não tenho interesse em contos de fadas de Shinigamis e Quincys.',
    techniques: ['Disparo de Flechas Espirituais', 'Hirenkyaku']
  },
  {
    id: 'kon',
    name: 'Kon',
    searchName: 'Kon',
    gender: 'Masculino',
    species: 'Alma Modificada',
    affiliation: ['Karakura'],
    rank: 'Membro',
    styleOrPower: 'Músculos de Perna Aprimorados',
    maxRelease: 'Nenhuma',
    debutArc: 'Shinigami Substituto',
    status: 'Vivo',
    quote: 'Eu sou o rei da selva! Uma obra-prima viva de alma modificada!',
    techniques: ['Salto Ampliado', 'Investida Desesperada']
  },

  // --- Gotei 13: Capitães & Tenentes ---
  {
    id: 'yamamoto-genryusai',
    name: 'Genryusai Shigekuni Yamamoto',
    searchName: 'Genryuusai Shigekuni Yamamoto',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (1ª Divisão)'],
    rank: 'Capitão-Comandante',
    styleOrPower: 'Ryujin Jakka',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Morto',
    quote: 'Por que o Gotei 13 permaneceu de pé por mil anos? Porque nenhum Shinigami mais forte que eu nasceu em mil anos.',
    techniques: ['Jokaku Enjo', 'Ennetsu Jigoku', 'Zanka no Tachi: Higashi', 'Zanka no Tachi: Minami (Kaka Jumanokushi Daisojin)']
  },
  {
    id: 'chojiro-sasakibe',
    name: 'Chojiro Sasakibe',
    searchName: 'Choujirou Sasakibe',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (1ª Divisão)'],
    rank: 'Tenente',
    styleOrPower: 'Gonryomaru',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Morto',
    quote: 'Meu senhor é apenas um: o Capitão-Comandante Yamamoto.',
    techniques: ['Koko Gonryo Rikyu']
  },
  {
    id: 'shunsui-kyoraku',
    name: 'Shunsui Kyoraku',
    searchName: 'Shunsui Kyouraku',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (1ª Divisão)', 'Ex-Gotei 13 (8ª Divisão)'],
    rank: 'Capitão-Comandante',
    styleOrPower: 'Katen Kyokotsu',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'Não importa se uma guerra é justa ou injusta. Uma vez que ela começa, ambos os lados são culpados.',
    techniques: ['Bushogoma', 'Takaoni', 'Kageoni', 'Irooni', 'Katen Kyokotsu: Karamatsu Shinju']
  },
  {
    id: 'nanao-ise',
    name: 'Nanao Ise',
    searchName: 'Nanao Ise',
    gender: 'Feminino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (1ª Divisão)'],
    rank: 'Tenente',
    styleOrPower: 'Shinken Hakkyoken',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Sociedade das Almas',
    status: 'Viva',
    quote: 'A lâmina da família Ise reflete a luz dos deuses e dispersa o seu poder.',
    techniques: ['Reflexão Divina', 'Hado e Bakudo de Alto Grau']
  },
  {
    id: 'soi-fon',
    name: 'Soi Fon',
    searchName: 'Sui-Feng',
    gender: 'Feminino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (2ª Divisão)', 'Onmitsukido'],
    rank: 'Capitã',
    styleOrPower: 'Suzumebachi',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Viva',
    quote: 'Uma morte certa em dois golpes. Essa é a picada de Suzumebachi.',
    techniques: ['Nigeki Kessatsu', 'Jakaho Raikoben', 'Mukyu Shunko']
  },
  {
    id: 'marechiyo-omaeda',
    name: 'Marechiyo Omaeda',
    searchName: 'Marechiyo Oomaeda',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (2ª Divisão)'],
    rank: 'Tenente',
    styleOrPower: 'Gegetsuburi',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'Quebre, Gegetsuburi!',
    techniques: ['Golpe Demolidor de Gegetsuburi']
  },
  {
    id: 'rojuro-otoribashi',
    name: 'Rojuro Otoribashi (Rose)',
    searchName: 'Roujuurou Ootoribashi',
    gender: 'Masculino',
    species: 'Vizard / Shinigami',
    affiliation: ['Gotei 13 (3ª Divisão)', 'Vizard'],
    rank: 'Capitão',
    styleOrPower: 'Kinshara',
    maxRelease: 'Bankai',
    debutArc: 'Batalha de Falsa Karakura',
    status: 'Vivo',
    quote: 'A verdadeira música não toca apenas nos ouvidos, ela engana o coração.',
    techniques: ['Kinshara Sogikyoku: Ju No Kyoku', 'Kinshara Butodan']
  },
  {
    id: 'izuru-kira',
    name: 'Izuru Kira',
    searchName: 'Izuru Kira',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (3ª Divisão)'],
    rank: 'Tenente',
    styleOrPower: 'Wabisuke',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'A batalha não é um lugar para heróis. A batalha é desespero e peso.',
    techniques: ['Dobra de Peso de Wabisuke', 'Bakudo #73: Tozansho']
  },
  {
    id: 'retsu-unohana',
    name: 'Retsu Unohana (Yachiru)',
    searchName: 'Retsu Unohana',
    gender: 'Feminino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (4ª Divisão)', 'Primeira Kenpachi'],
    rank: 'Capitã',
    styleOrPower: 'Minazuki',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Morta',
    quote: 'Eu sou a Primeira Kenpachi, Yachiru Unohana. E eu existo para despertar a sua verdadeira força.',
    techniques: ['Kaido Curativo', 'Minazuki (Ácido/Cura)', 'Bankai: Minazuki (Lâmina Sangrenta)']
  },
  {
    id: 'isane-kotetsu',
    name: 'Isane Kotetsu',
    searchName: 'Isane Kotetsu',
    gender: 'Feminino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (4ª Divisão)'],
    rank: 'Capitã',
    styleOrPower: 'Itegumo',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Sociedade das Almas',
    status: 'Viva',
    quote: 'Corra, Itegumo!',
    techniques: ['Bakudo #58: Kakushitsuijaku', 'Kaido']
  },
  {
    id: 'shinji-hirako',
    name: 'Shinji Hirako',
    searchName: 'Shinji Hirako',
    gender: 'Masculino',
    species: 'Vizard / Shinigami',
    affiliation: ['Gotei 13 (5ª Divisão)', 'Vizard'],
    rank: 'Capitão',
    styleOrPower: 'Sakanade',
    maxRelease: 'Bankai',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Vivo',
    quote: 'Bem-vindo ao mundo invertido. Cima é baixo, esquerda é direita, e a frente é atrás.',
    techniques: ['Inversão Sensorial', 'Cero do Vizard', 'Bankai: Sakasama Yokoshima Hapo Fusagari']
  },
  {
    id: 'momo-hinamori',
    name: 'Momo Hinamori',
    searchName: 'Momo Hinamori',
    gender: 'Feminino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (5ª Divisão)'],
    rank: 'Tenente',
    styleOrPower: 'Tobiume',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Sociedade das Almas',
    status: 'Viva',
    quote: 'Estale, Tobiume!',
    techniques: ['Esferas de Fogo de Tobiume', 'Redes de Kido Combinado']
  },
  {
    id: 'byakuya-kuchiki',
    name: 'Byakuya Kuchiki',
    searchName: 'Byakuya Kuchiki',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (6ª Divisão)', 'Clã Kuchiki'],
    rank: 'Capitão',
    styleOrPower: 'Senbonzakura',
    maxRelease: 'Bankai',
    debutArc: 'Shinigami Substituto',
    status: 'Vivo',
    quote: 'Espalhe-se, Senbonzakura. A lâmina que você não pode ver é a lâmina que ceifará a sua vida.',
    techniques: ['Senbonzakura Kageyoshi', 'Senkei', 'Gokei', 'Shukei: Hakuteiken', 'Hado #33: Sokatsui']
  },
  {
    id: 'renji-abarai',
    name: 'Renji Abarai',
    searchName: 'Renji Abarai',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (6ª Divisão)'],
    rank: 'Tenente',
    styleOrPower: 'Zabimaru',
    maxRelease: 'Bankai',
    debutArc: 'Shinigami Substituto',
    status: 'Vivo',
    quote: 'Uive, Zabimaru! Eu prometi que alcançaria você, e não vou desistir agora!',
    techniques: ['Higa Zekko', 'Hihio Zabimaru', 'Soo Zabimaru: Zaga Teppo']
  },
  {
    id: 'sajin-komamura',
    name: 'Sajin Komamura',
    searchName: 'Sajin Komamura',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (7ª Divisão)'],
    rank: 'Capitão',
    styleOrPower: 'Tenken',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'Minha vida pertence ao Comandante Yamamoto. Para honrá-lo, não temo me despojar de minha humanidade.',
    techniques: ['Kokujo Tengen Myoo', 'Kokujo Tengen Myoo: Dangai Joe', 'Técnica de Metamorfose Humana']
  },
  {
    id: 'tetsuzaemon-iba',
    name: 'Tetsuzaemon Iba',
    searchName: 'Tetsuzaemon Iba',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (7ª Divisão)'],
    rank: 'Capitão',
    styleOrPower: 'Lâmina Espiritual Dentada',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'Um homem não foge do dever, ele encara a luta de frente.',
    techniques: ['Corte de Shikai', 'Combate Corpo a Corpo Masculino']
  },
  {
    id: 'lisa-yadomaru',
    name: 'Lisa Yadomaru',
    searchName: 'Lisa Yadomaru',
    gender: 'Feminino',
    species: 'Vizard / Shinigami',
    affiliation: ['Gotei 13 (8ª Divisão)', 'Vizard'],
    rank: 'Capitã',
    styleOrPower: 'Haguro Tonbo',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Batalha de Falsa Karakura',
    status: 'Viva',
    quote: 'Destrua, Haguro Tonbo!',
    techniques: ['Golpe Giratório de Haguro Tonbo', 'Máscara Hollow de Vizard']
  },
  {
    id: 'kensei-muguruma',
    name: 'Kensei Muguruma',
    searchName: 'Kensei Muguruma',
    gender: 'Masculino',
    species: 'Vizard / Shinigami',
    affiliation: ['Gotei 13 (9ª Divisão)', 'Vizard'],
    rank: 'Capitão',
    styleOrPower: 'Tachikaze',
    maxRelease: 'Bankai',
    debutArc: 'Batalha de Falsa Karakura',
    status: 'Vivo',
    quote: 'Exploda, Tachikaze! Eu não preciso de armas extravagantes para acabar com você.',
    techniques: ['Bakusaitsuki', 'Tekken Tachikaze', 'Sandan Bakusaitsuki']
  },
  {
    id: 'shuhei-hisagi',
    name: 'Shuhei Hisagi',
    searchName: 'Shuuhei Hisagi',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (9ª Divisão)'],
    rank: 'Tenente',
    styleOrPower: 'Kazeshini',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'Eu tenho medo da minha própria foice. E aquele que não teme a sua lâmina não tem o direito de empunhá-la.',
    techniques: ['Colha, Kazeshini', 'Fushi no Kojyo', 'Hado #63: Raikoho']
  },
  {
    id: 'toshiro-hitsugaya',
    name: 'Toshiro Hitsugaya',
    searchName: 'Toushirou Hitsugaya',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (10ª Divisão)'],
    rank: 'Capitão',
    styleOrPower: 'Hyorinmaru',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'Ascenda aos céus congelados, Hyorinmaru! O dragão de gelo mais forte da Sociedade das Almas!',
    techniques: ['Ryusenka', 'Sennen Hyoro', 'Guncho Tsurara', 'Daiguren Hyorinmaru Completa (Forma Adulta)']
  },
  {
    id: 'rangiku-matsumoto',
    name: 'Rangiku Matsumoto',
    searchName: 'Rangiku Matsumoto',
    gender: 'Feminino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (10ª Divisão)'],
    rank: 'Tenente',
    styleOrPower: 'Haineko',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Sociedade das Almas',
    status: 'Viva',
    quote: 'Rosne, Haineko! As cinzas que cortam qualquer um que estiver no caminho!',
    techniques: ['Haineko no Hai', 'Bakudo #77: Tenteikura']
  },
  {
    id: 'kenpachi-zaraki',
    name: 'Kenpachi Zaraki',
    searchName: 'Kenpachi Zaraki',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (11ª Divisão)'],
    rank: 'Capitão',
    styleOrPower: 'Nozarashi',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'Lutar é a única coisa que me faz sentir vivo! Se você não vai me matar, eu vou te cortar em pedaços!',
    techniques: ['Engula, Nozarashi', 'Corte com Duas Mãos (Kendo)', 'Bankai Demoníaca de Nozarashi']
  },
  {
    id: 'yachiru-kusajishi',
    name: 'Yachiru Kusajishi',
    searchName: 'Yachiru Kusajishi',
    gender: 'Feminino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (11ª Divisão)'],
    rank: 'Tenente',
    styleOrPower: 'Sanpo Kenju',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Sociedade das Almas',
    status: 'Morta',
    quote: 'Kenny, vamos nos divertir e bater neles!',
    techniques: ['Sanpo Kenju (Criaturas Espirituais Gemeas)']
  },
  {
    id: 'ikkaku-madarame',
    name: 'Ikkaku Madarame',
    searchName: 'Ikkaku Madarame',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (11ª Divisão)'],
    rank: 'Tenente',
    styleOrPower: 'Hozukimaru',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'Não me mande ter calma! Uma luta é para ser decidida com sangue e glória!',
    techniques: ['Divida, Hozukimaru', 'Ryumon Hozukimaru']
  },
  {
    id: 'yumichika-ayasegawa',
    name: 'Yumichika Ayasegawa',
    searchName: 'Yumichika Ayasegawa',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (11ª Divisão)'],
    rank: 'Oficial',
    styleOrPower: 'Ruri\'iro Kujaku (Pavão Lazúli)',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'A beleza é a única lei absoluta. Tudo que é feio não merece respirar.',
    techniques: ['Drenagem Espiritual de Ruri\'iro Kujaku', 'Fuji Kujaku']
  },
  {
    id: 'mayuri-kurotsuchi',
    name: 'Mayuri Kurotsuchi',
    searchName: 'Mayuri Kurotsuchi',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (12ª Divisão)', 'Instituto de Pesquisa Shinigami'],
    rank: 'Capitão',
    styleOrPower: 'Ashisogi Jizo',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'Não existe nada mais detestável neste mundo do que a perfeição. A perfeição é a morte da ciência.',
    techniques: ['Konjiki Ashisogi Jizo', 'Konjiki Ashisogi Jizo: Makai Fukuin Shotai', 'Drogas de Percepção Temporal']
  },
  {
    id: 'nemu-kurotsuchi',
    name: 'Nemu Kurotsuchi (Nemuri VII)',
    searchName: 'Nemu Kurotsuchi',
    gender: 'Feminino',
    species: 'Alma Modificada / Shinigami',
    affiliation: ['Gotei 13 (12ª Divisão)'],
    rank: 'Tenente',
    styleOrPower: 'Manipulação de Células Gikon Juugou',
    maxRelease: 'Nenhuma',
    debutArc: 'Sociedade das Almas',
    status: 'Morta',
    quote: 'Mestre Mayuri, eu cumpri 100% de minhas diretrizes.',
    techniques: ['Sobrecarga Celular de Potência', 'Cura Anatômica Orgânica']
  },
  {
    id: 'jushiro-ukitake',
    name: 'Jushiro Ukitake',
    searchName: 'Juushirou Ukitake',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Gotei 13 (13ª Divisão)'],
    rank: 'Capitão',
    styleOrPower: 'Sogyo no Kotowari',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Sociedade das Almas',
    status: 'Morto',
    quote: 'Existem dois tipos de luta: a luta para proteger a vida e a luta para proteger o orgulho.',
    techniques: ['Absorção e Refração de Energia de Sogyo no Kotowari', 'Kamikake (Invocação de Mimihagi)']
  },

  // --- Traidores / Hueco Mundo ---
  {
    id: 'sosuke-aizen',
    name: 'Sosuke Aizen',
    searchName: 'Sousuke Aizen',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Ex-Gotei 13 (5ª Divisão)', 'Las Noches'],
    rank: 'Ex-Capitão',
    styleOrPower: 'Kyōka Suigetsu (Hipnose Absoluta)',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Sociedade das Almas',
    status: 'Vivo',
    quote: 'Desde o início, ninguém nunca esteve no topo do céu. Mas a partir de agora, eu me sentarei no trono.',
    techniques: ['Kanzen Saimin', 'Hado #90: Kurohitsugi', 'Fusão do Hogyoku', 'Fragor']
  },
  {
    id: 'gin-ichimaru',
    name: 'Gin Ichimaru',
    searchName: 'Gin Ichimaru',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Ex-Gotei 13 (3ª Divisão)', 'Las Noches'],
    rank: 'Ex-Capitão',
    styleOrPower: 'Shinso',
    maxRelease: 'Bankai',
    debutArc: 'Sociedade das Almas',
    status: 'Morto',
    quote: 'Eu sou uma cobra. Minha pele é fria e eu rastejo pelas sombras até dar o bote mortal.',
    techniques: ['Mire e Mate, Shinso', 'Kamishini no Yari', 'Korose, Kamishini no Yari (Veneno Celular)']
  },
  {
    id: 'kaname-tosen',
    name: 'Kaname Tosen',
    searchName: 'Kaname Tousen',
    gender: 'Masculino',
    species: 'Shinigami / Hollow',
    affiliation: ['Ex-Gotei 13 (9ª Divisão)', 'Las Noches'],
    rank: 'Ex-Capitão',
    styleOrPower: 'Suzumushi',
    maxRelease: 'Resurrección',
    debutArc: 'Sociedade das Almas',
    status: 'Morto',
    quote: 'A justiça que não teme derramar sangue para evitar mais sangue é o único caminho.',
    techniques: ['Suzumushi Nishiki: Benihiko', 'Bankai: Enma Korogi', 'Resurrección: Grillar Grillo', 'Los Nueve Aspectos']
  },

  // --- Guarda Real (Divisão Zero) ---
  {
    id: 'ichibe-hyosube',
    name: 'Ichibe Hyosube',
    searchName: 'Ichibee Hyousube',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Guarda Real (Divisão Zero)'],
    rank: 'Guarda Real',
    styleOrPower: 'Ichimonji (O Pincel das Trevas)',
    maxRelease: 'Bankai',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Vivo',
    quote: 'Eu sou o Monge que Dá Nomes. Qualquer coisa coberta pela minha tinta preta perde o seu nome e seu poder.',
    techniques: ['Apagamento de Nomes', 'Shirafude Ichimonji (Renomeação)', 'Futen Taisatsuryo']
  },
  {
    id: 'oetsu-nimaiya',
    name: 'Oetsu Nimaiya',
    searchName: 'Ouetsu Nimaiya',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Guarda Real (Divisão Zero)'],
    rank: 'Guarda Real',
    styleOrPower: 'Sayafushi (Criador de Todas as Zanpakutō)',
    maxRelease: 'Shikai Apenas',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Vivo',
    quote: 'Número Um Criador de Zanpakutō, Oetsu Nimaiya! Minha lâmina é tão afiada que nem mesmo uma bainha pode contê-la!',
    techniques: ['Corte Absoluto de Sayafushi', 'Controle da Forja Espiritual']
  },
  {
    id: 'tenjiro-kirinji',
    name: 'Tenjiro Kirinji',
    searchName: 'Tenjirou Kirinji',
    gender: 'Masculino',
    species: 'Shinigami',
    affiliation: ['Guarda Real (Divisão Zero)'],
    rank: 'Guarda Real',
    styleOrPower: 'Kinpika (Águas Termais Vermelhas e Brancas)',
    maxRelease: 'Shikai Apenas',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Vivo',
    quote: 'Demônio das Termas! A minha água não lava apenas feridas, ela expulsa o próprio sangue apodrecido!',
    techniques: ['Brilhe, Kinpika', 'Água Branca Espiritual', 'Água Vermelha Infernal']
  },
  {
    id: 'senjumaru-shutara',
    name: 'Senjumaru Shutara',
    searchName: 'Senjumaru Shutara',
    gender: 'Feminino',
    species: 'Shinigami',
    affiliation: ['Guarda Real (Divisão Zero)'],
    rank: 'Guarda Real',
    styleOrPower: 'Shigarami (Tecelã dos Destinos)',
    maxRelease: 'Bankai',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Viva',
    quote: 'Os fios do destino tecem o túmulo de todos aqueles que ousam invadir o Palácio Real.',
    techniques: ['Tecelagem Espiritual Oculta', 'Bankai: Shatatsu Karagara Shigaramino Tsuji']
  },
  {
    id: 'kirio-hikifune',
    name: 'Kirio Hikifune',
    searchName: 'Kirio Hikifune',
    gender: 'Feminino',
    species: 'Shinigami',
    affiliation: ['Guarda Real (Divisão Zero)'],
    rank: 'Guarda Real',
    styleOrPower: 'Kuryu (Árvore da Vida Espiritual & Gikon)',
    maxRelease: 'Shikai Apenas',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Viva',
    quote: 'A comida que eu preparo não é apenas alimento, é a essência condensada do poder de uma alma.',
    techniques: ['Gikon (Alma Provisória)', 'Jaula da Árvore Espiritual de Kuryu']
  },

  // --- Espadas & Arrancars ---
  {
    id: 'coyote-starrk',
    name: 'Coyote Starrk',
    searchName: 'Coyote Starrk',
    gender: 'Masculino',
    species: 'Arrancar / Hollow',
    affiliation: ['Espada / Hueco Mundo'],
    rank: 'Espada (1)',
    styleOrPower: 'Los Lobos',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Morto',
    quote: 'Por que eu tenho que lutar contra um cara tão forte? Eu só queria um lugar onde pudesse estar junto com meus companheiros.',
    techniques: ['Cero Metralleta', 'Lobos de Almas Espirituais', 'Colmillo']
  },
  {
    id: 'baraggan-louisenbairn',
    name: 'Baraggan Louisenbairn',
    searchName: 'Baraggan Louisenbairn',
    gender: 'Masculino',
    species: 'Arrancar / Hollow',
    affiliation: ['Espada / Hueco Mundo'],
    rank: 'Espada (2)',
    styleOrPower: 'Arrogante (O Envelhecimento Supremo)',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Morto',
    quote: 'O tempo é absoluto. Tudo envelhece, apodrece e morre sob a minha presença.',
    techniques: ['Respira', 'Gran Caida', 'Senescencia']
  },
  {
    id: 'tier-harribel',
    name: 'Tier Harribel',
    searchName: 'Tier Harribel',
    gender: 'Feminino',
    species: 'Arrancar / Hollow',
    affiliation: ['Espada / Hueco Mundo'],
    rank: 'Espada (3)',
    styleOrPower: 'Tiburón',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Viva',
    quote: 'Um sacrifício sem sentido é apenas tolo. Eu luto para que ninguém mais precise morrer à toa.',
    techniques: ['Ola Azul', 'Cascada', 'Tridente', 'Hirviendo']
  },
  {
    id: 'ulquiorra-cifer',
    name: 'Ulquiorra Cifer',
    searchName: 'Ulquiorra Cifer',
    gender: 'Masculino',
    species: 'Arrancar / Hollow',
    affiliation: ['Espada / Hueco Mundo'],
    rank: 'Espada (4)',
    styleOrPower: 'Murciélago',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Morto',
    quote: 'Se eu abrir seu peito, vou encontrar esse coração do qual você tanto fala?',
    techniques: ['Cero Oscuras', 'Lanza del Relámpago', 'Resurrección: Segunda Etapa', 'Solita Vista']
  },
  {
    id: 'nnoitra-gilga',
    name: 'Nnoitra Gilga',
    searchName: 'Nnoitra Gilga',
    gender: 'Masculino',
    species: 'Arrancar / Hollow',
    affiliation: ['Espada / Hueco Mundo'],
    rank: 'Espada (5)',
    styleOrPower: 'Santa Teresa',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Morto',
    quote: 'Não existe salvação na batalha. Apenas morrer antes mesmo de tocar o chão!',
    techniques: ['Santa Teresa (Seis Braços)', 'Hierro Supremo', 'Indice Radar']
  },
  {
    id: 'grimmjow-jaegerjaquez',
    name: 'Grimmjow Jaegerjaquez',
    searchName: 'Grimmjow Jaegerjaquez',
    gender: 'Masculino',
    species: 'Arrancar / Hollow',
    affiliation: ['Espada / Hueco Mundo'],
    rank: 'Espada (6)',
    styleOrPower: 'Pantera',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Vivo',
    quote: 'Eu sou um rei! Qualquer um que me olhar de cima vai ser dilacerado!',
    techniques: ['Garra de la Pantera', 'Desgarrón', 'Gran Rey Cero']
  },
  {
    id: 'zommari-rureaux',
    name: 'Zommari Rureaux',
    searchName: 'Zommari Rureaux',
    gender: 'Masculino',
    species: 'Arrancar / Hollow',
    affiliation: ['Espada / Hueco Mundo'],
    rank: 'Espada (7)',
    styleOrPower: 'Brujería',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Morto',
    quote: 'Quem deu aos Shinigamis o direito de julgar os Hollows como monstros?',
    techniques: ['Amor (Controle Corporal)', 'Gemelos Sonido', 'El Embrion']
  },
  {
    id: 'szayelaporro-granz',
    name: 'Szayelaporro Granz',
    searchName: 'Szayelaporro Granz',
    gender: 'Masculino',
    species: 'Arrancar / Hollow',
    affiliation: ['Espada / Hueco Mundo'],
    rank: 'Espada (8)',
    styleOrPower: 'Fornicarás',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Morto',
    quote: 'A ciência não tem limites para aqueles que compreendem a beleza da dissecação.',
    techniques: ['Bonecos de Vodu Vaginais', 'Clonagem Celular', 'Renascimento Gabriel']
  },
  {
    id: 'aaroniero-arruruerie',
    name: 'Aaroniero Arruruerie',
    searchName: 'Aaroniero Arruruerie',
    gender: 'Masculino',
    species: 'Arrancar / Hollow',
    affiliation: ['Espada / Hueco Mundo'],
    rank: 'Espada (9)',
    styleOrPower: 'Glotonería',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Morto',
    quote: 'Eu devorei 33.650 Hollows! Todas as suas forças e memórias são minhas!',
    techniques: ['Nejibana Copiada', 'Forma Monstruosa de 33.000 Hollows']
  },
  {
    id: 'yammy-llargo',
    name: 'Yammy Llargo',
    searchName: 'Yammy Llargo',
    gender: 'Masculino',
    species: 'Arrancar / Hollow',
    affiliation: ['Espada / Hueco Mundo'],
    rank: 'Espada (0)',
    styleOrPower: 'Ira',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Morto',
    quote: 'Quem disse que os Espadas iam de 1 a 10? Quando eu libero a minha ira, eu sou o Espada Zero!',
    techniques: ['Cero de Fúria', 'Bala Gigante', 'Transformação Colossal Titânica']
  },
  {
    id: 'nelliel-tu-odelschwanck',
    name: 'Nelliel Tu Odelschwanck (Nel)',
    searchName: 'Nelliel Tu Odelschwanck',
    gender: 'Feminino',
    species: 'Arrancar / Hollow',
    affiliation: ['Hueco Mundo', 'Ex-Espada'],
    rank: 'Ex-Espada',
    styleOrPower: 'Gamuza',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Viva',
    quote: 'Eu luto por aqueles que amo. Mas não tolero crueldade com os fracos.',
    techniques: ['Cero Doble', 'Lanzador Verde']
  },
  {
    id: 'wonderweiss-margela',
    name: 'Wonderweiss Margela',
    searchName: 'Wonderweiss Margela',
    gender: 'Masculino',
    species: 'Arrancar / Hollow',
    affiliation: ['Las Noches'],
    rank: 'Oficial',
    styleOrPower: 'Extinguir (Selamento de Chamas)',
    maxRelease: 'Resurrección',
    debutArc: 'Arrancar & Hueco Mundo',
    status: 'Morto',
    quote: 'Auuu... Waaa...',
    techniques: ['Vagido da Selagem de Chamas', 'Centenas de Punhos Extinguir']
  },

  // --- Wandenreich / Sternritter / Quincy ---
  {
    id: 'yhwach',
    name: 'Yhwach',
    searchName: 'Yhwach',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Wandenreich'],
    rank: 'Sternritter',
    styleOrPower: 'The Almighty (Schrift A)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morto',
    quote: 'Eu posso ver todos os futuros possíveis. E mais do que isso: eu posso alterá-los à minha vontade.',
    techniques: ['The Almighty', 'Auswählen', 'Sankt Altar', 'Zankt Bogen']
  },
  {
    id: 'jugram-haschwalth',
    name: 'Jugram Haschwalth',
    searchName: 'Jugram Haschwalth',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Wandenreich / Schutzstaffel'],
    rank: 'Sternritter',
    styleOrPower: 'The Balance (Schrift B)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morto',
    quote: 'A fortuna deve ser equilibrada pelo infortúnio. Esse é o peso da balança.',
    techniques: ['The Balance', 'Freund Schild (Escudo do Infortúnio)']
  },
  {
    id: 'gerard-valkyrie',
    name: 'Gerard Valkyrie',
    searchName: 'Gerard Valkyrie',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Wandenreich / Schutzstaffel'],
    rank: 'Sternritter',
    styleOrPower: 'The Miracle (Schrift M)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morto',
    quote: 'O milagre é algo que só acontece quando a situação é absolutamente desesperadora!',
    techniques: ['The Miracle (Regeneração e Crescimento Gigantesco)', 'Hoffnung (Espada da Esperança)', 'Aschetonig']
  },
  {
    id: 'lille-barro',
    name: 'Lille Barro',
    searchName: 'Lille Barro',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Wandenreich / Schutzstaffel'],
    rank: 'Sternritter',
    styleOrPower: 'The X-Axis (Schrift X)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morto',
    quote: 'Eu sou o primeiro Quincy a receber um Schrift de Sua Majestade. Minha mira nunca erra e nenhum obstáculo pode me deter.',
    techniques: ['The X-Axis (Perfuração Inviolável)', 'Vollständig: Jilliel', 'Intangibilidade Celestial']
  },
  {
    id: 'pernida-parnkgjas',
    name: 'Pernida Parnkgjas',
    searchName: 'Pernida Parnkgjas',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Wandenreich / Schutzstaffel'],
    rank: 'Sternritter',
    styleOrPower: 'The Compulsory (Schrift C)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morto',
    quote: 'Eu sou o Braço Esquerdo do Rei das Almas. A evolução e o controle são a minha natureza.',
    techniques: ['Nervos Invasivos de The Compulsory', 'Mimetismo Genético Adaptativo']
  },
  {
    id: 'askin-nakk-le-vaar',
    name: 'Askin Nakk Le Vaar',
    searchName: 'Askin Nakk Le Vaar',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Wandenreich / Schutzstaffel'],
    rank: 'Sternritter',
    styleOrPower: 'The Deathdealing (Schrift D)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morto',
    quote: 'A dose certa de qualquer substância é a diferença entre um remédio e um veneno mortal.',
    techniques: ['The Deathdealing', 'Dose Letal', 'Gift Bad', 'Gift Ring', 'Vollständig: Hasshein']
  },
  {
    id: 'bazz-b',
    name: 'Bazz-B (Bazzard Black)',
    searchName: 'Bazz-B',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Wandenreich'],
    rank: 'Sternritter',
    styleOrPower: 'The Heat (Schrift H)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morto',
    quote: 'Minhas chamas são quentes o suficiente para anular o fogo do próprio Comandante Yamamoto!',
    techniques: ['Burner Finger 1 a 4', 'Burning Full Fingers']
  },
  {
    id: 'bambietta-basterbine',
    name: 'Bambietta Basterbine',
    searchName: 'Bambietta Basterbine',
    gender: 'Feminino',
    species: 'Quincy',
    affiliation: ['Wandenreich'],
    rank: 'Sternritter',
    styleOrPower: 'The Explode (Schrift E)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morta',
    quote: 'Eu não atiro bombas. Minha energia transforma tudo que ela toca em bombas!',
    techniques: ['The Explode', 'Vollständig com Asas Bombardeadas']
  },
  {
    id: 'candice-catnipp',
    name: 'Candice Catnipp',
    searchName: 'Candice Catnipp',
    gender: 'Feminino',
    species: 'Quincy',
    affiliation: ['Wandenreich'],
    rank: 'Sternritter',
    styleOrPower: 'The Thunderbolt (Schrift T)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Viva',
    quote: 'Você estragou meu cabelo! Eu vou te desintegrar com cinco gigavolts de eletricidade!',
    techniques: ['Electrocution', 'Galvano Javelin']
  },
  {
    id: 'giselle-gewelle',
    name: 'Giselle Gewelle',
    searchName: 'Giselle Gewelle',
    gender: 'Feminino',
    species: 'Quincy',
    affiliation: ['Wandenreich'],
    rank: 'Sternritter',
    styleOrPower: 'The Zombie (Schrift Z)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Viva',
    quote: 'Uma gota do meu sangue e você vai ser meu zumbi para sempre!',
    techniques: ['Zumbificação Sanguínea', 'Comando de Marionetes']
  },
  {
    id: 'meninas-mcallon',
    name: 'Meninas McAllon',
    searchName: 'Meninas McAllon',
    gender: 'Feminino',
    species: 'Quincy',
    affiliation: ['Wandenreich'],
    rank: 'Sternritter',
    styleOrPower: 'The Power (Schrift P)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Viva',
    quote: 'Parece que eu sou apenas fofa, mas meus socos destroem quarteirões inteiros.',
    techniques: ['Superforça Muscular Esmagadora']
  },
  {
    id: 'liltotto-lamperd',
    name: 'Liltotto Lamperd',
    searchName: 'Liltotto Lamperd',
    gender: 'Feminino',
    species: 'Quincy',
    affiliation: ['Wandenreich'],
    rank: 'Sternritter',
    styleOrPower: 'The Glutton (Schrift G)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Viva',
    quote: 'Não fique no caminho. Eu como qualquer coisa que se mexer.',
    techniques: ['Mandíbula Monstruosa Canibal']
  },
  {
    id: 'as-nodt',
    name: 'As Nodt',
    searchName: 'As Nodt',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Wandenreich'],
    rank: 'Sternritter',
    styleOrPower: 'The Fear (Schrift F)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morto',
    quote: 'O medo é o primeiro sentimento que qualquer ser vivo experimenta ao nascer.',
    techniques: ['Espinhos do Pânico Induzido', 'Vollständig: Tatarforas']
  },
  {
    id: 'mask-de-masculine',
    name: 'Mask De Masculine',
    searchName: 'Mask De Masculine',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Wandenreich'],
    rank: 'Sternritter',
    styleOrPower: 'The Superstar (Schrift S)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morto',
    quote: 'Líder James, torça por mim! Quanto mais os fãs aplaudem, mais invencível o herói se torna!',
    techniques: ['Star Flash', 'Star Lariat', 'Star Laser Mortal']
  },
  {
    id: 'gremmy-thoumeaux',
    name: 'Gremmy Thoumeaux',
    searchName: 'Gremmy Thoumeaux',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Wandenreich'],
    rank: 'Sternritter',
    styleOrPower: 'The Visionary (Schrift V)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morto',
    quote: 'Qualquer coisa que eu imaginar se torna realidade. Minha imaginação é a arma definitiva.',
    techniques: ['Invocação de Meteoros', 'Vácuo Espacial', 'Armas Bélicas da Imaginação']
  },
  {
    id: 'quilge-opie',
    name: 'Quilge Opie',
    searchName: 'Quilge Opie',
    gender: 'Masculino',
    species: 'Quincy',
    affiliation: ['Wandenreich'],
    rank: 'Sternritter',
    styleOrPower: 'The Jail (Schrift J)',
    maxRelease: 'Vollständig',
    debutArc: 'A Guerra Sangrenta dos Mil Anos (TYBW)',
    status: 'Morto',
    quote: 'A prisão espiritual do Schrift J é indestrutível para qualquer ser que não seja um Quincy!',
    techniques: ['The Jail', 'Vollständig: Biskiel', 'Ransotengai']
  },

  // --- Xcution / Fullbringers ---
  {
    id: 'kugo-ginjo',
    name: 'Kugo Ginjo',
    searchName: 'Kuugo Ginjou',
    gender: 'Masculino',
    species: 'Humano / Fullbringer / Shinigami',
    affiliation: ['Xcution', 'Ex-Shinigami Substituto'],
    rank: 'Líder',
    styleOrPower: 'Cross of Scaffold',
    maxRelease: 'Fullbring Completo',
    debutArc: 'O Shinigami Perdido',
    status: 'Morto',
    quote: 'Eu fui o primeiro Shinigami Substituto antes de você, Ichigo.',
    techniques: ['Getsuga Tensho Roubado', 'Bankai de Cross of Scaffold']
  },
  {
    id: 'shukuro-tsukishima',
    name: 'Shukuro Tsukishima',
    searchName: 'Shuukurou Tsukishima',
    gender: 'Masculino',
    species: 'Humano / Fullbringer',
    affiliation: ['Xcution'],
    rank: 'Membro',
    styleOrPower: 'Book of the End',
    maxRelease: 'Fullbring Completo',
    debutArc: 'O Shinigami Perdido',
    status: 'Morto',
    quote: 'Eu sempre fiz parte do seu passado. Você não se lembra do quanto nos divertimos juntos?',
    techniques: ['Inserção no Passado de Book of the End', 'Corte Psíquico']
  },
  {
    id: 'riruka-dokugamine',
    name: 'Riruka Dokugamine',
    searchName: 'Riruka Dokugamine',
    gender: 'Feminino',
    species: 'Humano / Fullbringer',
    affiliation: ['Xcution'],
    rank: 'Membro',
    styleOrPower: 'Dollhouse',
    maxRelease: 'Fullbring Completo',
    debutArc: 'O Shinigami Perdido',
    status: 'Viva',
    quote: 'Tudo o que eu acho fofo pertence à minha casa de bonecas!',
    techniques: ['Encolhimento em Caixa Dollhouse', 'Disparo de Pelúcia']
  },
  {
    id: 'yukio-hans-vorarlberna',
    name: 'Yukio Hans Vorarlberna',
    searchName: 'Yukio Hans Vorarlberna',
    gender: 'Masculino',
    species: 'Humano / Fullbringer',
    affiliation: ['Xcution'],
    rank: 'Membro',
    styleOrPower: 'Invaders Must Die',
    maxRelease: 'Fullbring Completo',
    debutArc: 'O Shinigami Perdido',
    status: 'Vivo',
    quote: 'No meu videogame, eu sou o Deus que dita todas as regras e físicas.',
    techniques: ['Dimensão de Pixel Isolada', 'Monstros de 8-bits']
  },

  // --- Próxima Geração / Arco do Inferno ---
  {
    id: 'kazui-kurosaki',
    name: 'Kazui Kurosaki',
    searchName: 'Kazui Kurosaki',
    gender: 'Masculino',
    species: 'Humano / Shinigami',
    affiliation: ['Karakura'],
    rank: 'Membro',
    styleOrPower: 'Lâmina Espiritual do Luar',
    maxRelease: 'Shikai Apenas',
    debutArc: 'Arco do Inferno',
    status: 'Vivo',
    quote: 'Olha o peixe dourado gigante que eu encontrei!',
    techniques: ['Manto de Shinigami Instintivo', 'Abertura de Portões Espirituais']
  }
];

async function fetchFandomImage(name) {
  try {
    const searchUrl = `https://bleach.fandom.com/api.php?action=opensearch&search=${encodeURIComponent(name)}&limit=1&format=json`;
    const searchRes = await fetch(searchUrl, { headers: { 'User-Agent': 'Animedle/1.0' }, signal: AbortSignal.timeout(5000) });
    const searchData = await searchRes.json();
    const exactTitle = searchData?.[1]?.[0];
    if (!exactTitle) return null;

    const pageUrl = `https://bleach.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(exactTitle)}&pithumbsize=350&format=json`;
    const pageRes = await fetch(pageUrl, { headers: { 'User-Agent': 'Animedle/1.0' }, signal: AbortSignal.timeout(5000) });
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

async function buildAll() {
  console.log('\n=== CONSTRUINDO BANCO DE PERSONAGENS DE BLEACH ===\n');

  const finalCharacters = [];

  for (let i = 0; i < BLEACH_ROSTER.length; i++) {
    const item = BLEACH_ROSTER[i];
    const localImgName = `${item.id}.png`;
    const localImgPath = path.join(avatarsDir, localImgName);

    console.log(`[${i + 1}/${BLEACH_ROSTER.length}] Processando ${item.name} (${item.id})...`);

    let avatarUrl = `/avatars/bleach/${localImgName}`;

    // Se o arquivo local ainda não existe ou tem tamanho muito pequeno
    let fileExists = fs.existsSync(localImgPath) && fs.statSync(localImgPath).size > 500;

    if (!fileExists) {
      await sleep(650); // Previne rate-limit
      let remoteUrl = await fetchAnilistImage(item.searchName || item.name);
      
      if (!remoteUrl && item.searchName) {
        remoteUrl = await fetchAnilistImage(item.name);
      }

      // Fallback para Fandom
      if (!remoteUrl) {
        remoteUrl = await fetchFandomImage(item.searchName || item.name);
      }
      if (!remoteUrl) {
        remoteUrl = await fetchFandomImage(item.name.split(' ')[0]);
      }

      if (remoteUrl) {
        try {
          const imgRes = await fetch(remoteUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Referer': 'https://bleach.fandom.com/'
            },
            signal: AbortSignal.timeout(8000)
          });
          if (imgRes.ok) {
            const buffer = Buffer.from(await imgRes.arrayBuffer());
            await sharp(buffer)
              .resize(240, 240, { fit: 'cover', position: 'top' })
              .png({ quality: 90 })
              .toFile(localImgPath);
            console.log(`   ✓ Imagem gerada localmente: ${localImgName}`);
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
      console.log(`   ✓ Imagem local já existente.`);
    }

    // Monta o objeto oficial do personagem
    const { searchName, ...characterData } = item;
    finalCharacters.push({
      ...characterData,
      avatar: avatarUrl
    });
  }

  // Escreve em src/data/animes/bleach/characters.json
  const jsonPath = path.join(dataDir, 'characters.json');
  fs.writeFileSync(jsonPath, JSON.stringify(finalCharacters, null, 2), 'utf8');
  console.log(`\n🎉 Banco criado com sucesso: ${finalCharacters.length} personagens salvos em ${jsonPath}!\n`);
}

buildAll();
