import fs from 'fs';
import path from 'path';

const CANON_HAIR_FIXES = {
  // Fairy Tail
  'natsu-dragneel': 'Cabelo Rosa',
  'happy': 'Cabelo Careca / Sem Cabelo',
  'erza-scarlet': 'Cabelo Vermelho',
  'wendy-marvell': 'Cabelo Azul',
  'elfman-strauss': 'Cabelo Branco / Prateado',
  'bickslow': 'Cabelo Preto',
  'evergreen': 'Cabelo Castanho',
  'wakaba-mine': 'Cabelo Castanho',
  'bisca-connell': 'Cabelo Verde',
  'warren-rocko': 'Cabelo Castanho',
  'kinana': 'Cabelo Roxo / Violeta',
  'warrod-sequen': 'Cabelo Careca / Sem Cabelo',
  'zera': 'Cabelo Castanho',
  'toby-horhorta': 'Cabelo Castanho',
  'hibiki-lates': 'Cabelo Castanho',
  'eve-tearm': 'Cabelo Branco / Prateado',
  'bob': 'Cabelo Careca / Sem Cabelo',
  'nichiya': 'Cabelo Careca / Sem Cabelo',
  'beth-vanderwood': 'Cabelo Castanho',
  'bacchus-groh': 'Cabelo Castanho',
  'totomaru': 'Cabelo Colorido / Marcante',
  'erigor': 'Cabelo Branco / Prateado',
  'kageyama': 'Cabelo Preto',
  'wally-buchanan': 'Cabelo Laranja',
  'kurohebi': 'Cabelo Careca / Sem Cabelo',
  'nullpudding': 'Cabelo Careca / Sem Cabelo',
  'brain-zero': 'Cabelo Branco / Prateado',
  'hoteye': 'Cabelo Laranja',
  'klodoa': 'Cabelo Careca / Sem Cabelo',
  'bluenote-stinger': 'Cabelo Azul',
  'zancrow': 'Cabelo Loiro / Dourado',
  'kain-hikaru': 'Cabelo Careca / Sem Cabelo',
  'zoldeo': 'Cabelo Careca / Sem Cabelo',
  'kyoka': 'Cabelo Roxo / Violeta',
  'tempester': 'Cabelo Castanho',
  'torafuzar': 'Cabelo Careca / Sem Cabelo',
  'ezel': 'Cabelo Careca / Sem Cabelo',
  'keyes': 'Cabelo Careca / Sem Cabelo',
  'brandish-u': 'Cabelo Verde',
  'bloodman': 'Cabelo Careca / Sem Cabelo',
  'wahl-icht': 'Cabelo Careca / Sem Cabelo',
  'neinhart': 'Cabelo Rosa',
  'zirconis': 'Cabelo Careca / Sem Cabelo',
  'horologium': 'Cabelo Careca / Sem Cabelo',
  'kamika': 'Cabelo Verde',
  'kama': 'Cabelo Branco / Prateado',
  'neppa': 'Cabelo Careca / Sem Cabelo',
  'belno': 'Cabelo Branco / Prateado',
  'wolfheim': 'Cabelo Branco / Prateado',
  'hyberion': 'Cabelo Vermelho',

  // Fullmetal Alchemist
  'winry-rockbell': 'Cabelo Loiro / Dourado',
  'trisha-elric': 'Cabelo Castanho',
  'nina-tucker': 'Cabelo Castanho',
  'heymans-breda': 'Cabelo Castanho',
  'kain-fuery': 'Cabelo Castanho',
  'barry-o-acougueiro': 'Cabelo Careca / Sem Cabelo',
  'heinkel': 'Cabelo Loiro / Dourado',
  'zampano': 'Cabelo Careca / Sem Cabelo',
  'basque-grand': 'Cabelo Careca / Sem Cabelo',

  // Hunter x Hunter
  'hisoka-morow': 'Cabelo Vermelho',
  'zeno-zoldyck': 'Cabelo Branco / Prateado',
  'tsubone': 'Cabelo Branco / Prateado',
  'bonolenov-ndongo': 'Cabelo Careca / Sem Cabelo',
  'kortopi': 'Cabelo Azul',
  'kite': 'Cabelo Branco / Prateado',
  'biscuit-krueger': 'Cabelo Loiro / Dourado',
  'wing': 'Cabelo Castanho',
  'zushi': 'Cabelo Castanho',
  'neferpitou': 'Cabelo Branco / Prateado',
  'komugi': 'Cabelo Branco / Prateado',
  'knuckle-bine': 'Cabelo Preto',
  'knov': 'Cabelo Preto',
  'welfin': 'Cabelo Branco / Prateado',
  'zazan': 'Cabelo Rosa',
  'tserriednich-hui-guo-rou': 'Cabelo Castanho',
  'hanzo': 'Cabelo Careca / Sem Cabelo',
  'tonpa': 'Cabelo Castanho',

  // JoJo's Bizarre Adventure
  'william-a-zeppeli': 'Cabelo Branco / Prateado',
  'erina-pendleton': 'Cabelo Loiro / Dourado',
  'kars': 'Cabelo Roxo / Violeta',
  'esidisi': 'Cabelo Branco / Prateado',
  'wamuu': 'Cabelo Loiro / Dourado',
  'noriaki-kakyoin': 'Cabelo Vermelho',
  'hol-horse': 'Cabelo Loiro / Dourado',
  'enya-geil': 'Cabelo Branco / Prateado',
  'terrence-t-darby': 'Cabelo Castanho',
  'boingo': 'Cabelo Castanho',
  'koichi-hirose': 'Cabelo Branco / Prateado',
  'keicho-nijimura': 'Cabelo Loiro / Dourado',
  'tonio-trussardi': 'Cabelo Castanho',
  'trish-una': 'Cabelo Rosa',
  'weather-report': 'Cabelo Branco / Prateado',
  'narciso-anasui': 'Cabelo Rosa',
  'enrico-pucci': 'Cabelo Branco / Prateado',
  'hot-pants': 'Cabelo Rosa',
  'wekapipo': 'Cabelo Loiro / Dourado',
  'blackmore': 'Cabelo Branco / Prateado',
  'norisuke-higashikata-iv': 'Cabelo Roxo / Violeta',
  'hato-higashikata': 'Cabelo Loiro / Dourado',
  'tamaki-damo': 'Cabelo Careca / Sem Cabelo',
  'tonpetty': 'Cabelo Branco / Prateado',
  'wired-beck': 'Cabelo Careca / Sem Cabelo',
  'holy-kujo': 'Cabelo Loiro / Dourado',
  'ken-oyanagi': 'Cabelo Castanho',
  'toyo-hiro-kanedaichi': 'Cabelo Careca / Sem Cabelo',
  'tiziano': 'Cabelo Loiro / Dourado',
  'kenzou': 'Cabelo Branco / Prateado',
  'tsurugi-higashikata': 'Cabelo Castanho',
  'holy-joestar-kira': 'Cabelo Loiro / Dourado',
  'karera-sakunami': 'Cabelo Castanho',
  'wu-tomoki': 'Cabelo Branco / Prateado',

  // Kaiju No. 8
  'kikoru-shinomiya': 'Cabelo Loiro / Dourado',
  'haruichi-izumo': 'Cabelo Loiro / Dourado',
  'hikari-shinomiya': 'Cabelo Loiro / Dourado',
  'kaiju-n-10': 'Cabelo Careca / Sem Cabelo',
  'kaiju-n-11': 'Cabelo Careca / Sem Cabelo',
  'kaiju-no-10': 'Cabelo Careca / Sem Cabelo',
  'keiji-itami': 'Cabelo Branco / Prateado',
  'konomi-okonogi': 'Cabelo Castanho',

  // Nanatsu no Taizai
  'elizabeth-liones': 'Cabelo Branco / Prateado',
  'hawk': 'Cabelo Careca / Sem Cabelo',
  'merlin': 'Cabelo Preto',
  'howzer': 'Cabelo Loiro / Dourado',
  'hendrickson': 'Cabelo Branco / Prateado',
  'zaratras': 'Cabelo Branco / Prateado',
  'elaine': 'Cabelo Loiro / Dourado',
  'bartra-liones': 'Cabelo Branco / Prateado',
  'estarossa': 'Cabelo Branco / Prateado',
  'tarmiel': 'Cabelo Branco / Prateado',
  'wild': 'Cabelo Careca / Sem Cabelo',
  'zhivago': 'Cabelo Branco / Prateado',

  // Naruto
  'tsunade-senju': 'Cabelo Loiro / Dourado',
  'hiruzen-sarutobi': 'Cabelo Branco / Prateado',
  'terceiro-kazekage': 'Cabelo Azul',
  'terceiro-raikage': 'Cabelo Loiro / Dourado',
  'kushimaru-kuriarare': 'Cabelo Branco / Prateado',
  'karin-uzumaki': 'Cabelo Vermelho',
  'kaguya-otsutsuki': 'Cabelo Branco / Prateado',
  'hagoromo-otsutsuki': 'Cabelo Branco / Prateado',
  'hamura-otsutsuki': 'Cabelo Branco / Prateado',
  'kabuto-yakushi': 'Cabelo Branco / Prateado',
  'kimimaro': 'Cabelo Branco / Prateado',
  'han': 'Cabelo Castanho',
  'karui': 'Cabelo Vermelho',
  'ebisu': 'Cabelo Castanho',
  'tayuya': 'Cabelo Vermelho',
  'katsuyu': 'Cabelo Careca / Sem Cabelo',
  'kamatari': 'Cabelo Careca / Sem Cabelo',
  'baku': 'Cabelo Careca / Sem Cabelo',
  'enma': 'Cabelo Branco / Prateado',
  'baki': 'Cabelo Careca / Sem Cabelo',
  'toneri-otsutsuki': 'Cabelo Branco / Prateado',
  'kinkaku': 'Cabelo Loiro / Dourado',
  'tonton': 'Cabelo Careca / Sem Cabelo',
  'son-goku': 'Cabelo Careca / Sem Cabelo',
  'kokuo': 'Cabelo Careca / Sem Cabelo',
  'hanzo-da-salamandra': 'Cabelo Castanho',

  // One-Punch Man
  'tatsumaki': 'Cabelo Verde',
  'black-sperm': 'Cabelo Careca / Sem Cabelo',
  'watchdog-man': 'Cabelo Branco / Prateado',
  'tanktop-master': 'Cabelo Loiro / Dourado',
  'tanktop-vegetarian': 'Cabelo Castanho',
  'twin-tail': 'Cabelo Loiro / Dourado',
  'butterfly-dx': 'Cabelo Careca / Sem Cabelo',
  'heavy-kong': 'Cabelo Careca / Sem Cabelo',
  'narcisstory': 'Cabelo Loiro / Dourado',
  'tanktop-black-hole': 'Cabelo Careca / Sem Cabelo',
  'bone': 'Cabelo Careca / Sem Cabelo',
  'tanktop-tiger': 'Cabelo Castanho',
  'homeless-emperor': 'Cabelo Castanho',
  'nyan': 'Cabelo Careca / Sem Cabelo',
  'elder-centipede': 'Cabelo Careca / Sem Cabelo',
  'beast-king': 'Cabelo Careca / Sem Cabelo',
  'beefcake': 'Cabelo Careca / Sem Cabelo',
  'hellfire-flame': 'Cabelo Loiro / Dourado',
  'bug-god': 'Cabelo Careca / Sem Cabelo',
  'bomb': 'Cabelo Branco / Prateado',

  // Record of Ragnarok
  'thor': 'Cabelo Vermelho',
  'zeus': 'Cabelo Branco / Prateado',
  'hercules': 'Cabelo Laranja',
  'buda': 'Cabelo Colorido / Marcante',
  'hades': 'Cabelo Branco / Prateado',
  'nikola-tesla': 'Cabelo Castanho',
  'brunhilde': 'Cabelo Azul',
  'hermes': 'Cabelo Loiro / Dourado',
  'heimdall': 'Cabelo Branco / Prateado',

  // Sword Art Online
  'klein': 'Cabelo Vermelho',
  'keita': 'Cabelo Castanho',
  'heathcliff': 'Cabelo Branco / Prateado',
  'kuradeel': 'Cabelo Branco / Prateado',
  'kibaou': 'Cabelo Castanho',
  'bercouli-synthesis-one': 'Cabelo Azul',
  'eldrie-synthesis-thirty-one': 'Cabelo Roxo / Violeta',
  'quinella': 'Cabelo Branco / Prateado',
  'tiese-shtolienen': 'Cabelo Vermelho',

  // Haikyuu
  'kei-tsukishima': 'Cabelo Loiro / Dourado',
  'koshi-sugawara': 'Cabelo Branco / Prateado',
  'hitoka-yachi': 'Cabelo Loiro / Dourado',
  'keishin-ukai': 'Cabelo Loiro / Dourado',
  'kentaro-kyotani': 'Cabelo Loiro / Dourado',
  'kenma-kozume': 'Cabelo Colorido / Marcante',
  'kotaro-bokuto': 'Cabelo Branco / Prateado',
  'eita-semi': 'Cabelo Branco / Prateado',
  'korai-hoshiumi': 'Cabelo Branco / Prateado',
  'takanobu-aone': 'Cabelo Branco / Prateado',
  'tadashi-yamaguchi': 'Cabelo Verde',
  'toru-oikawa': 'Cabelo Castanho',
  'hajime-iwaizumi': 'Cabelo Castanho',
  'taketora-yamamoto': 'Cabelo Loiro / Dourado',
  'wakatoshi-ushijima': 'Cabelo Castanho',
  'kenjiro-shirabu': 'Cabelo Castanho',
  'tanji-washijo': 'Cabelo Branco / Prateado',
  'kenji-futakuchi': 'Cabelo Castanho',
  'kanji-koganegawa': 'Cabelo Loiro / Dourado',

  // Tokyo Ghoul
  'kuzen-yoshimura': 'Cabelo Branco / Prateado',
  'kishou-arima': 'Cabelo Branco / Prateado',
  'kousuke-houji': 'Cabelo Branco / Prateado',
  'koori-ui': 'Cabelo Branco / Prateado',
  'kuki-urie': 'Cabelo Roxo / Violeta',
  'toru-mutsuki': 'Cabelo Verde',
  'eto-yoshimura': 'Cabelo Verde',
  'noro': 'Cabelo Careca / Sem Cabelo',
  'naki': 'Cabelo Loiro / Dourado',
  'nico': 'Cabelo Rosa',
  'nashiro-yasuhisa': 'Cabelo Branco / Prateado',
  'big-madam': 'Cabelo Loiro / Dourado',
  'nutcracker': 'Cabelo Roxo / Violeta',
  'kiyoko-aura': 'Cabelo Azul',
  'hanbee-abara': 'Cabelo Castanho',
  'tsuneyoshi-washuu': 'Cabelo Branco / Prateado',

  // Witch Hat Atelier
  'qifrey': 'Cabelo Branco / Prateado',
  'beldaruit': 'Cabelo Branco / Prateado',
  'tartah': 'Cabelo Castanho',
  'nolnoa': 'Cabelo Castanho',
  'euini': 'Cabelo Verde',
  'easthies': 'Cabelo Loiro / Dourado',
  'zayamaia-ezrest': 'Cabelo Loiro / Dourado',
  'kukrow': 'Cabelo Loiro / Dourado'
};

const animesDir = 'src/data/animes';
const animes = fs.readdirSync(animesDir).filter(f => fs.statSync(path.join(animesDir, f)).isDirectory());

let totalFixed = 0;

for (const anime of animes) {
  const p = path.join(animesDir, anime, 'characters.json');
  if (!fs.existsSync(p)) continue;
  const chars = JSON.parse(fs.readFileSync(p, 'utf-8'));
  let changed = false;

  for (const c of chars) {
    if (CANON_HAIR_FIXES[c.id]) {
      const correct = CANON_HAIR_FIXES[c.id];
      if (c.hairColor !== correct) {
        c.hairColor = correct;
        changed = true;
        totalFixed++;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(p, JSON.stringify(chars, null, 2), 'utf-8');
  }
}

console.log(`Additional hair colors fixed: ${totalFixed}`);
