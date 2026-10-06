import { VoiceChallenge } from '../../types/anime';

/**
 * Banco Central de Desafios de Voz & Som do AnimeDle.
 * Contém um acervo rico e expandido de personagens canônicos com clipes de voz autênticos (risadas, ataques, bordões).
 */
export const VOICE_CHALLENGES: Record<string, VoiceChallenge[]> = {
  'one-piece': [
    {
      id: 'voice-op-luffy',
      animeSlug: 'one-piece',
      characterId: 'monkey-d-luffy',
      characterName: 'Monkey D. Luffy',
      audioUrl: 'https://www.myinstants.com/media/sounds/luffy-laugh.mp3',
      category: 'risada',
    },
    {
      id: 'voice-op-brook',
      animeSlug: 'one-piece',
      characterId: 'brook',
      characterName: 'Brook',
      audioUrl: 'https://www.myinstants.com/media/sounds/brook-laugh.mp3',
      category: 'risada',
    },
    {
      id: 'voice-op-blackbeard',
      animeSlug: 'one-piece',
      characterId: 'marshall-d-teach',
      characterName: 'Marshall D. Teach (Barba Negra)',
      audioUrl: 'https://www.myinstants.com/media/sounds/zehahaha.mp3',
      category: 'risada',
    },
    {
      id: 'voice-op-doflamingo',
      animeSlug: 'one-piece',
      characterId: 'donquixote-doflamingo',
      characterName: 'Donquixote Doflamingo',
      audioUrl: 'https://www.myinstants.com/media/sounds/doflamingo-laugh.mp3',
      category: 'risada',
    },
    {
      id: 'voice-op-zoro',
      animeSlug: 'one-piece',
      characterId: 'roronoa-zoro',
      characterName: 'Roronoa Zoro',
      audioUrl: 'https://www.myinstants.com/media/sounds/zoro-onigiri.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-op-nami',
      animeSlug: 'one-piece',
      characterId: 'nami',
      characterName: 'Nami',
      audioUrl: 'https://www.myinstants.com/media/sounds/nami.mp3',
      category: 'fala',
    },
    {
      id: 'voice-op-usopp',
      animeSlug: 'one-piece',
      characterId: 'usopp',
      characterName: 'Usopp',
      audioUrl: 'https://www.myinstants.com/media/sounds/usopp.mp3',
      category: 'fala',
    },
    {
      id: 'voice-op-robin',
      animeSlug: 'one-piece',
      characterId: 'nico-robin',
      characterName: 'Nico Robin',
      audioUrl: 'https://www.myinstants.com/media/sounds/robin.mp3',
      category: 'fala',
    },
    {
      id: 'voice-op-law',
      animeSlug: 'one-piece',
      characterId: 'trafalgar-d-water-law',
      characterName: 'Trafalgar D. Water Law',
      audioUrl: 'https://www.myinstants.com/media/sounds/law-room.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-op-ace',
      animeSlug: 'one-piece',
      characterId: 'portgas-d-ace',
      characterName: 'Portgas D. Ace',
      audioUrl: 'https://www.myinstants.com/media/sounds/ace.mp3',
      category: 'fala',
    },
    {
      id: 'voice-op-crocodile',
      animeSlug: 'one-piece',
      characterId: 'crocodile',
      characterName: 'Crocodile',
      audioUrl: 'https://www.myinstants.com/media/sounds/crocodile.mp3',
      category: 'fala',
    },
  ],

  'naruto': [
    {
      id: 'voice-naruto-naruto',
      animeSlug: 'naruto',
      characterId: 'naruto-uzumaki',
      characterName: 'Naruto Uzumaki',
      audioUrl: 'https://www.myinstants.com/media/sounds/rasengan.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-naruto-sasuke',
      animeSlug: 'naruto',
      characterId: 'sasuke-uchiha',
      characterName: 'Sasuke Uchiha',
      audioUrl: 'https://www.myinstants.com/media/sounds/chidori.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-naruto-itachi',
      animeSlug: 'naruto',
      characterId: 'itachi-uchiha',
      characterName: 'Itachi Uchiha',
      audioUrl: 'https://www.myinstants.com/media/sounds/amaterasu.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-naruto-pain',
      animeSlug: 'naruto',
      characterId: 'pain-tendo',
      characterName: 'Pain',
      audioUrl: 'https://www.myinstants.com/media/sounds/pain-shinra-tensei.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-naruto-madara',
      animeSlug: 'naruto',
      characterId: 'madara-uchiha',
      characterName: 'Madara Uchiha',
      audioUrl: 'https://www.myinstants.com/media/sounds/madara.mp3',
      category: 'fala',
    },
    {
      id: 'voice-naruto-obito',
      animeSlug: 'naruto',
      characterId: 'obito-uchiha',
      characterName: 'Obito Uchiha',
      audioUrl: 'https://www.myinstants.com/media/sounds/obito.mp3',
      category: 'fala',
    },
    {
      id: 'voice-naruto-jiraiya',
      animeSlug: 'naruto',
      characterId: 'jiraiya',
      characterName: 'Jiraiya',
      audioUrl: 'https://www.myinstants.com/media/sounds/jiraiya.mp3',
      category: 'fala',
    },
    {
      id: 'voice-naruto-rock-lee',
      animeSlug: 'naruto',
      characterId: 'rock-lee',
      characterName: 'Rock Lee',
      audioUrl: 'https://www.myinstants.com/media/sounds/rock-lee.mp3',
      category: 'fala',
    },
  ],

  'bleach': [
    {
      id: 'voice-bleach-ichigo',
      animeSlug: 'bleach',
      characterId: 'ichigo-kurosaki',
      characterName: 'Ichigo Kurosaki',
      audioUrl: 'https://www.myinstants.com/media/sounds/bankai-ichigo.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-bleach-aizen',
      animeSlug: 'bleach',
      characterId: 'sosuke-aizen',
      characterName: 'Sōsuke Aizen',
      audioUrl: 'https://www.myinstants.com/media/sounds/aizen.mp3',
      category: 'fala',
    },
    {
      id: 'voice-bleach-rukia',
      animeSlug: 'bleach',
      characterId: 'rukia-kuchiki',
      characterName: 'Rukia Kuchiki',
      audioUrl: 'https://www.myinstants.com/media/sounds/rukia.mp3',
      category: 'fala',
    },
    {
      id: 'voice-bleach-ulquiorra',
      animeSlug: 'bleach',
      characterId: 'ulquiorra-cifer',
      characterName: 'Ulquiorra Cifer',
      audioUrl: 'https://www.myinstants.com/media/sounds/ulquiorra.mp3',
      category: 'fala',
    },
  ],

  'jujutsu-kaisen': [
    {
      id: 'voice-jjk-sukuna',
      animeSlug: 'jujutsu-kaisen',
      characterId: 'ryomen-sukuna',
      characterName: 'Ryomen Sukuna',
      audioUrl: 'https://www.myinstants.com/media/sounds/sukuna-laugh.mp3',
      category: 'risada',
    },
    {
      id: 'voice-jjk-gojo',
      animeSlug: 'jujutsu-kaisen',
      characterId: 'satoru-gojo',
      characterName: 'Satoru Gojo',
      audioUrl: 'https://www.myinstants.com/media/sounds/gojo-satoru.mp3',
      category: 'bordao',
    },
    {
      id: 'voice-jjk-yuji',
      animeSlug: 'jujutsu-kaisen',
      characterId: 'yuji-itadori',
      characterName: 'Yuji Itadori',
      audioUrl: 'https://www.myinstants.com/media/sounds/kokusen.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-jjk-toji',
      animeSlug: 'jujutsu-kaisen',
      characterId: 'toji-fushiguro',
      characterName: 'Toji Fushiguro',
      audioUrl: 'https://www.myinstants.com/media/sounds/toji.mp3',
      category: 'fala',
    },
    {
      id: 'voice-jjk-mahito',
      animeSlug: 'jujutsu-kaisen',
      characterId: 'mahito',
      characterName: 'Mahito',
      audioUrl: 'https://www.myinstants.com/media/sounds/mahito.mp3',
      category: 'fala',
    },
    {
      id: 'voice-jjk-geto',
      animeSlug: 'jujutsu-kaisen',
      characterId: 'suguru-geto',
      characterName: 'Suguru Geto',
      audioUrl: 'https://www.myinstants.com/media/sounds/geto-suguru.mp3',
      category: 'fala',
    },
    {
      id: 'voice-jjk-choso',
      animeSlug: 'jujutsu-kaisen',
      characterId: 'choso',
      characterName: 'Choso',
      audioUrl: 'https://www.myinstants.com/media/sounds/choso.mp3',
      category: 'fala',
    },
    {
      id: 'voice-jjk-panda',
      animeSlug: 'jujutsu-kaisen',
      characterId: 'panda',
      characterName: 'Panda',
      audioUrl: 'https://www.myinstants.com/media/sounds/panda.mp3',
      category: 'fala',
    },
  ],

  'dragon-ball': [
    {
      id: 'voice-db-goku',
      animeSlug: 'dragon-ball',
      characterId: 'son-goku',
      characterName: 'Son Goku',
      audioUrl: 'https://www.myinstants.com/media/sounds/kamehameha.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-db-vegeta',
      animeSlug: 'dragon-ball',
      characterId: 'vegeta',
      characterName: 'Vegeta',
      audioUrl: 'https://www.myinstants.com/media/sounds/vegeta-final-flash.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-db-gohan',
      animeSlug: 'dragon-ball',
      characterId: 'son-gohan',
      characterName: 'Son Gohan',
      audioUrl: 'https://www.myinstants.com/media/sounds/gohan.mp3',
      category: 'fala',
    },
    {
      id: 'voice-db-piccolo',
      animeSlug: 'dragon-ball',
      characterId: 'piccolo',
      characterName: 'Piccolo',
      audioUrl: 'https://www.myinstants.com/media/sounds/piccolo.mp3',
      category: 'fala',
    },
    {
      id: 'voice-db-trunks',
      animeSlug: 'dragon-ball',
      characterId: 'trunks',
      characterName: 'Trunks',
      audioUrl: 'https://www.myinstants.com/media/sounds/trunks.mp3',
      category: 'fala',
    },
    {
      id: 'voice-db-frieza',
      animeSlug: 'dragon-ball',
      characterId: 'freeza',
      characterName: 'Freeza',
      audioUrl: 'https://www.myinstants.com/media/sounds/frieza.mp3',
      category: 'fala',
    },
    {
      id: 'voice-db-buu',
      animeSlug: 'dragon-ball',
      characterId: 'majin-boo',
      characterName: 'Majin Buu',
      audioUrl: 'https://www.myinstants.com/media/sounds/majin-buu.mp3',
      category: 'fala',
    },
    {
      id: 'voice-db-beerus',
      animeSlug: 'dragon-ball',
      characterId: 'bills',
      characterName: 'Bills (Beerus)',
      audioUrl: 'https://www.myinstants.com/media/sounds/beerus.mp3',
      category: 'fala',
    },
  ],

  'demon-slayer': [
    {
      id: 'voice-ds-tanjiro',
      animeSlug: 'demon-slayer',
      characterId: 'tanjiro-kamado-human',
      characterName: 'Tanjiro Kamado',
      audioUrl: 'https://www.myinstants.com/media/sounds/tanjiro.mp3',
      category: 'fala',
    },
    {
      id: 'voice-ds-rengoku',
      animeSlug: 'demon-slayer',
      characterId: 'kyojuro-rengoku',
      characterName: 'Kyojuro Rengoku',
      audioUrl: 'https://www.myinstants.com/media/sounds/rengoku-umai.mp3',
      category: 'bordao',
    },
    {
      id: 'voice-ds-zenitsu',
      animeSlug: 'demon-slayer',
      characterId: 'zenitsu-agatsuma',
      characterName: 'Zenitsu Agatsuma',
      audioUrl: 'https://www.myinstants.com/media/sounds/zenitsu.mp3',
      category: 'fala',
    },
  ],

  'attack-on-titan': [
    {
      id: 'voice-aot-eren',
      animeSlug: 'attack-on-titan',
      characterId: 'eren-jaeger',
      characterName: 'Eren Jaeger',
      audioUrl: 'https://www.myinstants.com/media/sounds/eren-yeager.mp3',
      category: 'fala',
    },
    {
      id: 'voice-aot-mikasa',
      animeSlug: 'attack-on-titan',
      characterId: 'mikasa-ackerman',
      characterName: 'Mikasa Ackerman',
      audioUrl: 'https://www.myinstants.com/media/sounds/mikasa-eren.mp3',
      category: 'fala',
    },
    {
      id: 'voice-aot-armin',
      animeSlug: 'attack-on-titan',
      characterId: 'armin-arlert',
      characterName: 'Armin Arlert',
      audioUrl: 'https://www.myinstants.com/media/sounds/armin-scream.mp3',
      category: 'fala',
    },
    {
      id: 'voice-aot-levi',
      animeSlug: 'attack-on-titan',
      characterId: 'levi-ackerman',
      characterName: 'Levi Ackerman',
      audioUrl: 'https://www.myinstants.com/media/sounds/levi.mp3',
      category: 'fala',
    },
    {
      id: 'voice-aot-sasageyo',
      animeSlug: 'attack-on-titan',
      characterId: 'erwin-smith',
      characterName: 'Erwin Smith',
      audioUrl: 'https://www.myinstants.com/media/sounds/sasageyo.mp3',
      category: 'bordao',
    },
  ],

  'my-hero-academia': [
    {
      id: 'voice-mha-deku',
      animeSlug: 'my-hero-academia',
      characterId: 'izuku-midoriya',
      characterName: 'Izuku Midoriya',
      audioUrl: 'https://www.myinstants.com/media/sounds/deku.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-mha-kirishima',
      animeSlug: 'my-hero-academia',
      characterId: 'eijiro-kirishima',
      characterName: 'Eijiro Kirishima',
      audioUrl: 'https://www.myinstants.com/media/sounds/kirishima.mp3',
      category: 'fala',
    },
  ],

  'hunter-x-hunter': [
    {
      id: 'voice-hxh-gon',
      animeSlug: 'hunter-x-hunter',
      characterId: 'gon-freecss',
      characterName: 'Gon Freecss',
      audioUrl: 'https://www.myinstants.com/media/sounds/gon.mp3',
      category: 'fala',
    },
    {
      id: 'voice-hxh-killua',
      animeSlug: 'hunter-x-hunter',
      characterId: 'killua-zoldyck',
      characterName: 'Killua Zoldyck',
      audioUrl: 'https://www.myinstants.com/media/sounds/killua.mp3',
      category: 'fala',
    },
  ],

  'jojos-bizarre-adventure': [
    {
      id: 'voice-jojo-dio',
      animeSlug: 'jojos-bizarre-adventure',
      characterId: 'dio-brando',
      characterName: 'Dio Brando',
      audioUrl: 'https://www.myinstants.com/media/sounds/dio-za-warudo.mp3',
      category: 'ataque',
    },
    {
      id: 'voice-jojo-dio-kono',
      animeSlug: 'jojos-bizarre-adventure',
      characterId: 'dio-brando',
      characterName: 'Dio Brando',
      audioUrl: 'https://www.myinstants.com/media/sounds/kono-dio-da.mp3',
      category: 'bordao',
    },
    {
      id: 'voice-jojo-jotaro',
      animeSlug: 'jojos-bizarre-adventure',
      characterId: 'jotaro-kujo',
      characterName: 'Jotaro Kujo',
      audioUrl: 'https://www.myinstants.com/media/sounds/yare-yare-daze.mp3',
      category: 'bordao',
    },
    {
      id: 'voice-jojo-muda',
      animeSlug: 'jojos-bizarre-adventure',
      characterId: 'giorno-giovanna',
      characterName: 'Giorno Giovanna',
      audioUrl: 'https://www.myinstants.com/media/sounds/muda-muda-muda.mp3',
      category: 'ataque',
    },
  ],

  'blue-lock': [
    {
      id: 'voice-bl-isagi',
      animeSlug: 'blue-lock',
      characterId: 'yoichi-isagi',
      characterName: 'Yoichi Isagi',
      audioUrl: 'https://www.myinstants.com/media/sounds/isagi.mp3',
      category: 'fala',
    },
    {
      id: 'voice-bl-nagi',
      animeSlug: 'blue-lock',
      characterId: 'seishiro-nagi',
      characterName: 'Seishiro Nagi',
      audioUrl: 'https://www.myinstants.com/media/sounds/nagi.mp3',
      category: 'fala',
    },
    {
      id: 'voice-bl-rin',
      animeSlug: 'blue-lock',
      characterId: 'rin-itoshi',
      characterName: 'Rin Itoshi',
      audioUrl: 'https://www.myinstants.com/media/sounds/rin-itoshi.mp3',
      category: 'fala',
    },
  ],

  'haikyuu': [
    {
      id: 'voice-hq-hinata',
      animeSlug: 'haikyuu',
      characterId: 'shoyo-hinata',
      characterName: 'Shōyō Hinata',
      audioUrl: 'https://www.myinstants.com/media/sounds/hinata.mp3',
      category: 'fala',
    },
    {
      id: 'voice-hq-tanaka',
      animeSlug: 'haikyuu',
      characterId: 'ryunosuke-tanaka',
      characterName: 'Ryūnosuke Tanaka',
      audioUrl: 'https://www.myinstants.com/media/sounds/tanaka.mp3',
      category: 'fala',
    },
  ],

  'chainsaw-man': [
    {
      id: 'voice-csm-power',
      animeSlug: 'chainsaw-man',
      characterId: 'power',
      characterName: 'Power',
      audioUrl: 'https://www.myinstants.com/media/sounds/power.mp3',
      category: 'fala',
    },
    {
      id: 'voice-csm-kobeni',
      animeSlug: 'chainsaw-man',
      characterId: 'kobeni-higashiyama',
      characterName: 'Kobeni Higashiyama',
      audioUrl: 'https://www.myinstants.com/media/sounds/kobeni.mp3',
      category: 'fala',
    },
  ],

  'black-clover': [
    {
      id: 'voice-bc-yami',
      animeSlug: 'black-clover',
      characterId: 'yami-sukehiro',
      characterName: 'Yami Sukehiro',
      audioUrl: 'https://www.myinstants.com/media/sounds/yami.mp3',
      category: 'fala',
    },
    {
      id: 'voice-bc-noelle',
      animeSlug: 'black-clover',
      characterId: 'noelle-silva',
      characterName: 'Noelle Silva',
      audioUrl: 'https://www.myinstants.com/media/sounds/noelle.mp3',
      category: 'fala',
    },
  ],

  'frieren': [
    {
      id: 'voice-fr-himmel',
      animeSlug: 'frieren',
      characterId: 'himmel',
      characterName: 'Himmel',
      audioUrl: 'https://www.myinstants.com/media/sounds/himmel.mp3',
      category: 'fala',
    },
    {
      id: 'voice-fr-stark',
      animeSlug: 'frieren',
      characterId: 'stark',
      characterName: 'Stark',
      audioUrl: 'https://www.myinstants.com/media/sounds/stark.mp3',
      category: 'fala',
    },
  ],

  'dandadan': [
    {
      id: 'voice-ddd-momo',
      animeSlug: 'dandadan',
      characterId: 'momo-ayase',
      characterName: 'Momo Ayase',
      audioUrl: 'https://www.myinstants.com/media/sounds/momo.mp3',
      category: 'fala',
    },
    {
      id: 'voice-ddd-turbo',
      animeSlug: 'dandadan',
      characterId: 'turbo-granny',
      characterName: 'Velha Turbo',
      audioUrl: 'https://www.myinstants.com/media/sounds/turbo-granny.mp3',
      category: 'fala',
    },
  ],

  'cyberpunk-edgerunners': [
    {
      id: 'voice-cb-david',
      animeSlug: 'cyberpunk-edgerunners',
      characterId: 'david-martinez',
      characterName: 'David Martinez',
      audioUrl: 'https://www.myinstants.com/media/sounds/david.mp3',
      category: 'fala',
    },
    {
      id: 'voice-cb-lucy',
      animeSlug: 'cyberpunk-edgerunners',
      characterId: 'lucy',
      characterName: 'Lucy',
      audioUrl: 'https://www.myinstants.com/media/sounds/lucy.mp3',
      category: 'fala',
    },
  ],

  'berserk': [
    {
      id: 'voice-ber-guts',
      animeSlug: 'berserk',
      characterId: 'guts',
      characterName: 'Guts',
      audioUrl: 'https://www.myinstants.com/media/sounds/guts.mp3',
      category: 'fala',
    },
  ],

  'solo-leveling': [
    {
      id: 'voice-sl-jinwoo',
      animeSlug: 'solo-leveling',
      characterId: 'sung-jinwoo',
      characterName: 'Sung Jinwoo',
      audioUrl: 'https://www.myinstants.com/media/sounds/arise-solo-leveling.mp3',
      category: 'ataque',
    },
  ],

  'one-punch-man': [
    {
      id: 'voice-opm-saitama',
      animeSlug: 'one-punch-man',
      characterId: 'saitama',
      characterName: 'Saitama',
      audioUrl: 'https://www.myinstants.com/media/sounds/saitama-ok.mp3',
      category: 'bordao',
    },
    {
      id: 'voice-opm-tatsumaki',
      animeSlug: 'one-punch-man',
      characterId: 'tatsumaki',
      characterName: 'Tatsumaki',
      audioUrl: 'https://www.myinstants.com/media/sounds/tatsumaki.mp3',
      category: 'fala',
    },
  ],

  'fullmetal-alchemist': [
    {
      id: 'voice-fma-edward',
      animeSlug: 'fullmetal-alchemist',
      characterId: 'edward-elric',
      characterName: 'Edward Elric',
      audioUrl: 'https://www.myinstants.com/media/sounds/edward-elric.mp3',
      category: 'fala',
    },
  ],

  'fairy-tail': [
    {
      id: 'voice-ft-natsu',
      animeSlug: 'fairy-tail',
      characterId: 'natsu-dragneel',
      characterName: 'Natsu Dragneel',
      audioUrl: 'https://www.myinstants.com/media/sounds/fairy-tail.mp3',
      category: 'bordao',
    },
  ],

  'tokyo-ghoul': [
    {
      id: 'voice-tg-kaneki',
      animeSlug: 'tokyo-ghoul',
      characterId: 'ken-kaneki',
      characterName: 'Ken Kaneki',
      audioUrl: 'https://www.myinstants.com/media/sounds/kaneki.mp3',
      category: 'fala',
    },
  ],

  'sword-art-online': [
    {
      id: 'voice-sao-kirito',
      animeSlug: 'sword-art-online',
      characterId: 'kirito',
      characterName: 'Kirito',
      audioUrl: 'https://www.myinstants.com/media/sounds/starburst-stream.mp3',
      category: 'ataque',
    },
  ],

  'tensei-shitara-slime-datta-ken': [
    {
      id: 'voice-slime-rimuru',
      animeSlug: 'tensei-shitara-slime-datta-ken',
      characterId: 'rimuru-tempest',
      characterName: 'Rimuru Tempest',
      audioUrl: 'https://www.myinstants.com/media/sounds/rimuru.mp3',
      category: 'fala',
    },
  ],

  'romance': [
    {
      id: 'voice-romance-chika',
      animeSlug: 'romance',
      characterId: 'chika-fujiwara',
      characterName: 'Chika Fujiwara',
      audioUrl: 'https://www.myinstants.com/media/sounds/chika-fujiwara.mp3',
      category: 'bordao',
    },
    {
      id: 'voice-romance-kaguya',
      animeSlug: 'romance',
      characterId: 'kaguya-shinomiya',
      characterName: 'Kaguya Shinomiya',
      audioUrl: 'https://www.myinstants.com/media/sounds/kawaii.mp3',
      category: 'fala',
    },
  ],
};

/**
 * Retorna o desafio de voz para o anime.
 * Caso o anime não possua um clipe específico cadastrado, usa um clipe universal de fallback
 * para que o modo funcione com 100% de estabilidade sem quebrar.
 */
export function getVoiceChallengesForAnime(animeSlug: string): VoiceChallenge[] {
  const list = VOICE_CHALLENGES[animeSlug];
  if (list && list.length > 0) {
    return list;
  }

  // Fallback universal seguro caso o anime ainda não tenha clipes catalogados
  return [
    {
      id: `voice-universal-${animeSlug}`,
      animeSlug,
      characterId: 'default',
      characterName: 'Personagem Misterioso',
      audioUrl: 'https://www.myinstants.com/media/sounds/bankai-ichigo.mp3',
      category: 'fala',
    },
  ];
}
