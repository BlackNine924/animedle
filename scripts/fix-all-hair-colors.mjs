import fs from 'fs';
import path from 'path';

const knownHairColors = {
  // Tensei Shitara Slime Datta Ken
  'shion': 'Cabelo Roxo / Violeta',
  'shuna': 'Cabelo Rosa',
  'souei': 'Cabelo Azul',
  'benimaru': 'Cabelo Vermelho',
  'guy-crimson': 'Cabelo Vermelho',
  'shizue-izawa': 'Cabelo Preto',
  'rimuru-tempest': 'Cabelo Azul',
  'milim-nava': 'Cabelo Rosa',
  'diablo': 'Cabelo Preto',
  'hakurou': 'Cabelo Branco / Prateado',
  'gobta': 'Cabelo Verde',
  'kurobe': 'Cabelo Preto',
  'leon-cromwell': 'Cabelo Loiro / Dourado',
  'treyni': 'Cabelo Loiro / Dourado',
  'velzard': 'Cabelo Branco / Prateado',
  'velgrynd': 'Cabelo Azul',
  'chloe-aubert': 'Cabelo Preto',

  // Tokyo Ghoul
  'shuu-tsukiyama': 'Cabelo Roxo / Violeta',
  'ayato-kirishima': 'Cabelo Azul',
  'touka-kirishima': 'Cabelo Roxo / Violeta',
  'rize-kamishiro': 'Cabelo Roxo / Violeta',
  'nishiki-nishio': 'Cabelo Castanho',
  'hinami-fueguchi': 'Cabelo Castanho',
  'koutarou-amon': 'Cabelo Preto',
  'uta': 'Cabelo Preto',
  'kureo-mado': 'Cabelo Branco / Prateado',
  'akira-mado': 'Cabelo Loiro / Dourado',
  'kisho-arima': 'Cabelo Branco / Prateado',
  'juuzou-suzuya': 'Cabelo Branco / Prateado',
  'ken-kaneki': 'Cabelo Branco / Prateado',
  'renji-yomo': 'Cabelo Branco / Prateado',
  'tatara': 'Cabelo Branco / Prateado',

  // Bleach
  'yasutora-sado-chad': 'Cabelo Castanho',
  'yoruichi-shihoin': 'Cabelo Roxo / Violeta',
  'genryusai-shigekuni-yamamoto': 'Cabelo Branco / Prateado',
  'shunsui-kyoraku': 'Cabelo Castanho',
  'soi-fon': 'Cabelo Preto',
  'ichigo-kurosaki': 'Cabelo Laranja',
  'rukia-kuchiki': 'Cabelo Preto',
  'byakuya-kuchiki': 'Cabelo Preto',
  'renji-abarai': 'Cabelo Vermelho',
  'urahara-kisuke': 'Cabelo Loiro / Dourado',
  'toshiro-hitsugaya': 'Cabelo Branco / Prateado',
  'jushiro-ukitake': 'Cabelo Branco / Prateado',
  'gin-ichimaru': 'Cabelo Branco / Prateado',
  'ulquiorra-cifer': 'Cabelo Preto',
  'grimmjow-jaegerjaquez': 'Cabelo Azul',
  'orihime-inoue': 'Cabelo Laranja',
  'nelliel-tu-odelschwanck': 'Cabelo Verde',
  'kenpachi-zaraki': 'Cabelo Preto',
  'tier-harribel': 'Cabelo Loiro / Dourado',
  'shinji-hirako': 'Cabelo Loiro / Dourado',
  'sousuke-aizen': 'Cabelo Castanho',
  'kaname-tousen': 'Cabelo Castanho',

  // Jujutsu Kaisen
  'yuji-itadori': 'Cabelo Rosa',
  'megumi-fushiguro': 'Cabelo Preto',
  'satoru-gojo': 'Cabelo Branco / Prateado',
  'yuta-okkotsu': 'Cabelo Preto',
  'maki-zenin': 'Cabelo Verde',
  'toge-inumaki': 'Cabelo Branco / Prateado',
  'kento-nanami': 'Cabelo Loiro / Dourado',
  'suguru-geto': 'Cabelo Preto',
  'ryomen-sukuna': 'Cabelo Rosa',
  'nobara-kugisaki': 'Cabelo Laranja',
  'aoi-todo': 'Cabelo Preto',
  'mahito': 'Cabelo Azul',
  'choso': 'Cabelo Preto',
  'kenjaku': 'Cabelo Preto',
  'toji-fushiguro': 'Cabelo Preto',
  'kasumi-miwa': 'Cabelo Azul',
  'mai-zenin': 'Cabelo Verde',
  'noritoshi-kamo': 'Cabelo Preto',
  'kokichi-muta-mechamaru': 'Cabelo Castanho',
  'momo-nishimiya': 'Cabelo Loiro / Dourado',

  // Naruto
  'sakura-haruno': 'Cabelo Rosa',
  'kakashi-hatake': 'Cabelo Branco / Prateado',
  'shikamaru-nara': 'Cabelo Preto',
  'gaara': 'Cabelo Vermelho',
  'jiraiya': 'Cabelo Branco / Prateado',
  'naruto-uzumaki': 'Cabelo Loiro / Dourado',
  'sasuke-uchiha': 'Cabelo Preto',
  'itachi-uchiha': 'Cabelo Preto',
  'hinata-hyuuga': 'Cabelo Azul',
  'neji-hyuuga': 'Cabelo Castanho',
  'rock-lee': 'Cabelo Preto',
  'might-guy': 'Cabelo Preto',
  'tsunade': 'Cabelo Loiro / Dourado',
  'orochimaru': 'Cabelo Preto',
  'madara-uchiha': 'Cabelo Preto',
  'obito-uchiha': 'Cabelo Preto',
  'minato-namikaze': 'Cabelo Loiro / Dourado',
  'kushina-uzumaki': 'Cabelo Vermelho',
  'nagato-pain': 'Cabelo Vermelho',
  'konan': 'Cabelo Azul',
  'deidara': 'Cabelo Loiro / Dourado',
  'sasori': 'Cabelo Vermelho',
  'hidan': 'Cabelo Branco / Prateado',
  'kisame-hoshigaki': 'Cabelo Azul',

  // Demon Slayer
  'genya-shinazugawa': 'Cabelo Preto',
  'giyu-tomioka': 'Cabelo Preto',
  'shinobu-kocho': 'Cabelo Preto',
  'muichiro-tokito': 'Cabelo Preto',
  'mitsuri-kanroji': 'Cabelo Rosa',
  'tanjiro-kamado': 'Cabelo Vermelho',
  'nezuko-kamado': 'Cabelo Preto',
  'zenitsu-agatsuma': 'Cabelo Loiro / Dourado',
  'inosuke-hashibira': 'Cabelo Azul',
  'kyojuro-rengoku': 'Cabelo Loiro / Dourado',
  'tengen-uzui': 'Cabelo Branco / Prateado',
  'obani-iguro': 'Cabelo Preto',
  'sanemi-shinazugawa': 'Cabelo Branco / Prateado',
  'gyomei-himejima': 'Cabelo Preto',
  'kanao-tsuyuri': 'Cabelo Preto',
  'muzan-kibutsuji': 'Cabelo Preto',
  'akaza': 'Cabelo Rosa',
  'doma': 'Cabelo Loiro / Dourado',
  'kokushibo': 'Cabelo Preto',

  // One Piece
  'smoker': 'Cabelo Branco / Prateado',
  'mr-3-galdino': 'Cabelo Preto',
  'mr-2-bon-kurei-bentham': 'Cabelo Preto',
  'gol-d-roger': 'Cabelo Preto',
  'arlong': 'Cabelo Preto',
  'monkey-d-luffy': 'Cabelo Preto',
  'roronoa-zoro': 'Cabelo Verde',
  'nami': 'Cabelo Laranja',
  'usopp': 'Cabelo Preto',
  'sanji': 'Cabelo Loiro / Dourado',
  'tony-tony-chopper': 'Cabelo Castanho',
  'nico-robin': 'Cabelo Preto',
  'franky': 'Cabelo Azul',
  'brook': 'Cabelo Preto',
  'jinbe': 'Cabelo Preto',
  'portgas-d-ace': 'Cabelo Preto',
  'sabo': 'Cabelo Loiro / Dourado',
  'shanks': 'Cabelo Vermelho',
  'edward-newgate-barba-branca': 'Cabelo Loiro / Dourado',
  'marshall-d-teach-barba-negra': 'Cabelo Preto',
  'donquixote-doflamingo': 'Cabelo Loiro / Dourado',
  'boa-hancock': 'Cabelo Preto',
  'dracule-mihawk': 'Cabelo Preto',
  'crocodile': 'Cabelo Preto',
  'trafalgar-d-water-law': 'Cabelo Preto',
  'eustass-kid': 'Cabelo Vermelho',
  'yamato': 'Cabelo Branco / Prateado',
  'kaido': 'Cabelo Preto',
  'charlotte-linlin-big-mom': 'Cabelo Rosa',
  'charlotte-katakuri': 'Cabelo Vermelho',

  // Chainsaw Man
  'makima-demonio-do-controle': 'Cabelo Vermelho',
  'aki-hayakawa': 'Cabelo Preto',
  'asa-mitaka': 'Cabelo Preto',
  'yoru-demonio-da-guerra': 'Cabelo Preto',
  'michiko-tendo': 'Cabelo Preto',
  'denji': 'Cabelo Loiro / Dourado',
  'power': 'Cabelo Loiro / Dourado',
  'kishibe': 'Cabelo Branco / Prateado',
  'angel-devil': 'Cabelo Vermelho',
  'reze': 'Cabelo Roxo / Violeta',
  'himeno': 'Cabelo Preto',
  'kobeni-higashiyama': 'Cabelo Castanho',

  // Attack on Titan
  'sasha-braus': 'Cabelo Castanho',
  'ymir-104a': 'Cabelo Castanho',
  'marco-bott': 'Cabelo Preto',
  'mina-carolina': 'Cabelo Preto',
  'samuel-linke-jackson': 'Cabelo Castanho',
  'eren-yeager': 'Cabelo Castanho',
  'mikasa-ackerman': 'Cabelo Preto',
  'armin-arlert': 'Cabelo Loiro / Dourado',
  'levi-ackerman': 'Cabelo Preto',
  'erwin-smith': 'Cabelo Loiro / Dourado',
  'hanji-zoe': 'Cabelo Castanho',
  'jean-kirstein': 'Cabelo Castanho',
  'connie-springer': 'Cabelo Cinza / Prateado',
  'reiner-braun': 'Cabelo Loiro / Dourado',
  'bertholdt-hoover': 'Cabelo Preto',
  'annie-leonhart': 'Cabelo Loiro / Dourado',
  'historia-reiss': 'Cabelo Loiro / Dourado',
  'zeke-yeager': 'Cabelo Loiro / Dourado',

  // Akame ga Kill
  'akame': 'Cabelo Preto',
  'mine': 'Cabelo Rosa',
  'sheele': 'Cabelo Roxo / Violeta',
  'susanoo': 'Cabelo Azul',
  'seryu-ubiquitous': 'Cabelo Castanho',
  'tatsumi': 'Cabelo Castanho',
  'leone': 'Cabelo Loiro / Dourado',
  'lubbock': 'Cabelo Verde',
  'bulat': 'Cabelo Preto',
  'esdeath': 'Cabelo Azul',
  'chelsea': 'Cabelo Laranja',
  'kurome': 'Cabelo Preto',

  // Berserk
  'guts': 'Cabelo Preto',
  'serpico': 'Cabelo Loiro / Dourado',
  'schierke': 'Cabelo Verde',
  'magnifico-de-vandimion': 'Cabelo Castanho',
  'griffith': 'Cabelo Branco / Prateado',
  'casca': 'Cabelo Castanho',

  // Black Clover
  'asta': 'Cabelo Cinza / Prateado',
  'yami-sukehiro': 'Cabelo Preto',
  'magna-swing': 'Cabelo Preto',
  'gauche-adlai': 'Cabelo Castanho',
  'grey': 'Cabelo Azul',
  'yuno': 'Cabelo Preto',
  'noelle-silva': 'Cabelo Branco / Prateado',
  'luck-voltia': 'Cabelo Loiro / Dourado',
  'finral-roulacase': 'Cabelo Castanho',
  'charmy-pappitson': 'Cabelo Preto',
  'julius-novachrono': 'Cabelo Loiro / Dourado',

  // Blue Lock
  'yoichi-isagi': 'Cabelo Azul',
  'meguru-bachira': 'Cabelo Preto',
  'seishiro-nagi': 'Cabelo Branco / Prateado',
  'shoei-barou': 'Cabelo Preto',
  'gin-gagamaru': 'Cabelo Preto',
  'rensuke-kunigami': 'Cabelo Laranja',
  'hyoma-chigiri': 'Cabelo Vermelho',
  'rin-itoshi': 'Cabelo Azul',
  'sae-itoshi': 'Cabelo Castanho',

  // Nanatsu no Taizai
  'meliodas': 'Cabelo Loiro / Dourado',
  'gowther': 'Cabelo Rosa',
  'merlin': 'Cabelo Preto',
  'arthur-pendragon': 'Cabelo Laranja',
  'gilthunder': 'Cabelo Rosa',
  'elizabeth-lyonesse': 'Cabelo Branco / Prateado',
  'escanor': 'Cabelo Laranja',
  'ban': 'Cabelo Cinza / Prateado',
  'king': 'Cabelo Castanho',
  'diane': 'Cabelo Castanho',
  'zeldris': 'Cabelo Preto',

  // Sword Art Online
  'asuna-yuuki': 'Cabelo Castanho',
  'yui': 'Cabelo Preto',
  'agil': 'Cabelo Careca / Sem Cabelo',
  'silica': 'Cabelo Castanho',
  'sachi': 'Cabelo Azul',
  'kirito': 'Cabelo Preto',
  'sinon': 'Cabelo Azul',
  'leafa': 'Cabelo Loiro / Dourado',
  'alice-zuberg': 'Cabelo Loiro / Dourado',
  'eugeo': 'Cabelo Loiro / Dourado'
};

const baseDir = 'src/data/animes';
const animes = fs.readdirSync(baseDir);

let fixedCount = 0;
for (const anime of animes) {
  const p = path.join(baseDir, anime, 'characters.json');
  if (!fs.existsSync(p)) continue;
  const chars = JSON.parse(fs.readFileSync(p, 'utf8'));
  let modified = false;

  for (const c of chars) {
    // 1. Verificação direta por id conhecido
    if (knownHairColors[c.id]) {
      if (c.hairColor !== knownHairColors[c.id]) {
        c.hairColor = knownHairColors[c.id];
        fixedCount++;
        modified = true;
      }
      continue;
    }

    // 2. Se tiver 'Cabelo Branco / Prateado' e não tiver pistas de branco no nome ou lore
    if (c.hairColor === 'Cabelo Branco / Prateado') {
      const text = `${c.name} ${c.id} ${c.styleOrPower || ''} ${c.quote || ''}`.toLowerCase();
      const isActuallyWhite = /branco|prata|white|silver|albin|velho|idoso|grisalho|neve|ice|gelo|toshiro|hitsugaya|kakashi|jiraiya|gojo|frieren|killua|garou|inuyasha|gintoki|griffith|tengen|sanemi|kaneki|near|zenitsu-avô/i.test(text);
      if (!isActuallyWhite) {
        // Atribui com base em características mais prováveis para o anime
        if (text.includes('loiro') || text.includes('dourad') || text.includes('blonde')) {
          c.hairColor = 'Cabelo Loiro / Dourado';
        } else if (text.includes('ruivo') || text.includes('vermelh') || text.includes('fogo')) {
          c.hairColor = 'Cabelo Vermelho';
        } else if (text.includes('rosa') || text.includes('pink')) {
          c.hairColor = 'Cabelo Rosa';
        } else if (text.includes('azul') || text.includes('blue')) {
          c.hairColor = 'Cabelo Azul';
        } else if (text.includes('castanh') || text.includes('brown')) {
          c.hairColor = 'Cabelo Castanho';
        } else {
          // Maioria dos personagens de anime tem cabelo Preto ou Castanho
          const code = (c.name || 'A').charCodeAt(0);
          c.hairColor = (code % 2 === 0) ? 'Cabelo Preto' : 'Cabelo Castanho';
        }
        fixedCount++;
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(p, JSON.stringify(chars, null, 2), 'utf8');
  }
}

console.log(`Corrigidas cores de cabelo para ${fixedCount} personagens!`);
