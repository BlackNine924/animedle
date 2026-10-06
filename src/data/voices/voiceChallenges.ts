import { VoiceChallenge } from '../../types/anime';

/**
 * Banco Central de Desafios de Voz & Som do AnimeDle.
 * Cada desafio mapeia a um personagem canônico com clipe de voz autêntico (risadas, ataques, bordões).
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
      subtitle: 'Shishishishi! Ore wa Monkey D. Luffy, Kaizoku-ō ni naru otoko da!',
    },
    {
      id: 'voice-op-brook',
      animeSlug: 'one-piece',
      characterId: 'brook',
      characterName: 'Brook',
      audioUrl: 'https://www.myinstants.com/media/sounds/brook-laugh.mp3',
      category: 'risada',
      subtitle: 'Yohohoho! Yohohoho! Pantsu misete moratte yoroshii desu ka?',
    },
    {
      id: 'voice-op-blackbeard',
      animeSlug: 'one-piece',
      characterId: 'marshall-d-teach',
      characterName: 'Marshall D. Teach (Barba Negra)',
      audioUrl: 'https://www.myinstants.com/media/sounds/zehahaha.mp3',
      category: 'risada',
      subtitle: 'Zehahaha! Hito no yume wa... owaranai!',
    },
    {
      id: 'voice-op-doflamingo',
      animeSlug: 'one-piece',
      characterId: 'donquixote-doflamingo',
      characterName: 'Donquixote Doflamingo',
      audioUrl: 'https://www.myinstants.com/media/sounds/doflamingo-laugh.mp3',
      category: 'risada',
      subtitle: 'Fuffuffuffu! Seigi wa katsu tte? Sorya sou darou! Katta yatsu dake ga seigi da!',
    },
    {
      id: 'voice-op-zoro',
      animeSlug: 'one-piece',
      characterId: 'roronoa-zoro',
      characterName: 'Roronoa Zoro',
      audioUrl: 'https://www.myinstants.com/media/sounds/zoro-onigiri.mp3',
      category: 'ataque',
      subtitle: 'Santōryū... Oni Giri!',
    },
  ],

  'naruto': [
    {
      id: 'voice-naruto-sasuke',
      animeSlug: 'naruto',
      characterId: 'sasuke-uchiha',
      characterName: 'Sasuke Uchiha',
      audioUrl: 'https://www.myinstants.com/media/sounds/chidori.mp3',
      category: 'ataque',
      subtitle: 'Chidori!',
    },
    {
      id: 'voice-naruto-itachi',
      animeSlug: 'naruto',
      characterId: 'itachi-uchiha',
      characterName: 'Itachi Uchiha',
      audioUrl: 'https://www.myinstants.com/media/sounds/amaterasu.mp3',
      category: 'ataque',
      subtitle: 'Amaterasu!',
    },
    {
      id: 'voice-naruto-pain',
      animeSlug: 'naruto',
      characterId: 'pain-tendo',
      characterName: 'Pain',
      audioUrl: 'https://www.myinstants.com/media/sounds/pain-shinra-tensei.mp3',
      category: 'ataque',
      subtitle: 'Koko yori... sekai ni itami o. Shinra Tensei!',
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
      subtitle: 'Bankai! Tensa Zangetsu!',
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
      subtitle: 'Hahahahaha! Ganbare ganbare!',
    },
    {
      id: 'voice-jjk-gojo',
      animeSlug: 'jujutsu-kaisen',
      characterId: 'satoru-gojo',
      characterName: 'Satoru Gojo',
      audioUrl: 'https://www.myinstants.com/media/sounds/gojo-satoru.mp3',
      category: 'bordao',
      subtitle: 'Daijōbu, boku saikyō dakara.',
    },
    {
      id: 'voice-jjk-yuji',
      animeSlug: 'jujutsu-kaisen',
      characterId: 'yuji-itadori',
      characterName: 'Yuji Itadori',
      audioUrl: 'https://www.myinstants.com/media/sounds/kokusen.mp3',
      category: 'ataque',
      subtitle: 'Kokusen!',
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
      subtitle: 'Ka... me... ha... me... HA!',
    },
    {
      id: 'voice-db-vegeta',
      animeSlug: 'dragon-ball',
      characterId: 'vegeta',
      characterName: 'Vegeta',
      audioUrl: 'https://www.myinstants.com/media/sounds/vegeta-final-flash.mp3',
      category: 'ataque',
      subtitle: 'Final... FLASH!',
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
      subtitle: 'Nezuko wa ore ga kanarazu tasukeru!',
    },
    {
      id: 'voice-ds-rengoku',
      animeSlug: 'demon-slayer',
      characterId: 'kyojuro-rengoku',
      characterName: 'Kyojuro Rengoku',
      audioUrl: 'https://www.myinstants.com/media/sounds/rengoku-umai.mp3',
      category: 'bordao',
      subtitle: 'Umai! Umai! Umai!',
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
      subtitle: 'Tatakae... Tatakae!',
    },
    {
      id: 'voice-aot-mikasa',
      animeSlug: 'attack-on-titan',
      characterId: 'mikasa-ackerman',
      characterName: 'Mikasa Ackerman',
      audioUrl: 'https://www.myinstants.com/media/sounds/mikasa-eren.mp3',
      category: 'fala',
      subtitle: 'Eren!',
    },
    {
      id: 'voice-aot-armin',
      animeSlug: 'attack-on-titan',
      characterId: 'armin-arlert',
      characterName: 'Armin Arlert',
      audioUrl: 'https://www.myinstants.com/media/sounds/armin-scream.mp3',
      category: 'fala',
      subtitle: 'Hito o kaeru koto ga dekiru no wa, nanika o suteru koto ga dekiru mono dake da!',
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
      subtitle: 'Smash!',
    },
  ],

  'hunter-x-hunter': [
    {
      id: 'voice-hxh-killua',
      animeSlug: 'hunter-x-hunter',
      characterId: 'killua-zoldyck',
      characterName: 'Killua Zoldyck',
      audioUrl: 'https://www.myinstants.com/media/sounds/killua.mp3',
      category: 'fala',
      subtitle: 'Baka!',
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
      subtitle: 'Za Warudo! Toki yo tomare!',
    },
    {
      id: 'voice-jojo-dio-kono',
      animeSlug: 'jojos-bizarre-adventure',
      characterId: 'dio-brando',
      characterName: 'Dio Brando',
      audioUrl: 'https://www.myinstants.com/media/sounds/kono-dio-da.mp3',
      category: 'bordao',
      subtitle: 'Kono Dio da!',
    },
    {
      id: 'voice-jojo-jotaro',
      animeSlug: 'jojos-bizarre-adventure',
      characterId: 'jotaro-kujo',
      characterName: 'Jotaro Kujo',
      audioUrl: 'https://www.myinstants.com/media/sounds/yare-yare-daze.mp3',
      category: 'bordao',
      subtitle: 'Yare yare daze...',
    },
    {
      id: 'voice-jojo-muda',
      animeSlug: 'jojos-bizarre-adventure',
      characterId: 'giorno-giovanna',
      characterName: 'Giorno Giovanna',
      audioUrl: 'https://www.myinstants.com/media/sounds/muda-muda-muda.mp3',
      category: 'ataque',
      subtitle: 'Muda muda muda muda muda muda!',
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
      subtitle: 'Erga-se (Arise)!',
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
      subtitle: 'Sōka. (OK.)',
    },
    {
      id: 'voice-opm-tatsumaki',
      animeSlug: 'one-punch-man',
      characterId: 'tatsumaki',
      characterName: 'Tatsumaki',
      audioUrl: 'https://www.myinstants.com/media/sounds/tatsumaki.mp3',
      category: 'fala',
      subtitle: 'Anata, watashi o dare da to omotte iru no?',
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
      subtitle: 'Dare ga mame tsubu hodo chiisai tte ka?!',
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
      subtitle: 'Moete kita zo!',
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
      subtitle: '1000 hiku 7 wa?',
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
      subtitle: 'Starburst... Stream!',
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
      subtitle: 'Ore wa warui suraimu ja nai yo!',
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
      subtitle: 'Shukipi~!',
    },
    {
      id: 'voice-romance-kaguya',
      animeSlug: 'romance',
      characterId: 'kaguya-shinomiya',
      characterName: 'Kaguya Shinomiya',
      audioUrl: 'https://www.myinstants.com/media/sounds/kawaii.mp3',
      category: 'fala',
      subtitle: 'O-kawaii koto...',
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
      subtitle: 'Desafio Vocal Especial',
    },
  ];
}
