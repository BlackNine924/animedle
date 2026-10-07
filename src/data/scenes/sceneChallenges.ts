import { SceneChallenge } from '../../types/anime';

/**
 * Banco de Desafios do Modo Cena (Inspirado no Modo Jutsu do Narutodle).
 * Clipes curtos em loop exibindo técnicas icônicas ou momentos marcantes.
 * O jogo inicia fortemente borrado e em Preto e Branco por padrão.
 */
export const SCENE_CHALLENGES: Record<string, SceneChallenge[]> = {
  'naruto': [
    {
      id: 'scene-naruto-rasengan',
      animeSlug: 'naruto',
      characterId: 'naruto-uzumaki',
      characterName: 'Naruto Uzumaki',
      videoUrl: 'https://c.tenor.com/2roX3uxz_68AAAAC/naruto-rasengan.gif',
      techniqueOrSceneName: 'Rasengan',
      description: 'Esfera espiral concentrada de chakra puro moldada na palma da mão.',
    },
    {
      id: 'scene-naruto-itachi-sharingan',
      animeSlug: 'naruto',
      characterId: 'itachi-uchiha',
      characterName: 'Itachi Uchiha',
      videoUrl: 'https://media.giphy.com/media/12p5byldHRiSm4/giphy.gif',
      techniqueOrSceneName: 'Mangekyō Sharingan / Genjutsu',
      description: 'Ativação visual dos olhos escarlates e ilusão hipnótica dos corvos.',
    },
    {
      id: 'scene-naruto-kakashi-raikiri',
      animeSlug: 'naruto',
      characterId: 'kakashi-hatake',
      characterName: 'Kakashi Hatake',
      videoUrl: 'https://media.giphy.com/media/doX7ytfiZH5OM/giphy.gif',
      techniqueOrSceneName: 'Raikiri / Corte Relâmpago',
      description: 'Lâmina perfurante elétrica concentrada na mão do Ninja Copiador.',
    },
  ],

  'one-piece': [
    {
      id: 'scene-op-luffy-gear2',
      animeSlug: 'one-piece',
      characterId: 'monkey-d-luffy',
      characterName: 'Monkey D. Luffy',
      videoUrl: 'https://media.giphy.com/media/tuCFp8rod0x3O/giphy.gif',
      techniqueOrSceneName: 'Gear Second (Vapor e Velocidade)',
      description: 'Aceleração do fluxo sanguíneo transformando o corpo em pura pressão a vapor.',
    },
    {
      id: 'scene-op-zoro-santoryu',
      animeSlug: 'one-piece',
      characterId: 'roronoa-zoro',
      characterName: 'Roronoa Zoro',
      videoUrl: 'https://media.giphy.com/media/4V9pnhxTv6eha/giphy.gif',
      techniqueOrSceneName: 'Estilo Três Espadas (Santōryū)',
      description: 'Corte devastador empunhando três espadas simultâneas em combate.',
    },
    {
      id: 'scene-op-sanji-diable',
      animeSlug: 'one-piece',
      characterId: 'sanji',
      characterName: 'Sanji',
      videoUrl: 'https://media.giphy.com/media/Gf1Rlu8WdBuSc/giphy.gif',
      techniqueOrSceneName: 'Diable Jambe (Perna do Diabo)',
      description: 'Fricção extrema giratória incendiando a perna com chamas incandescentes.',
    },
  ],

  'dragon-ball': [
    {
      id: 'scene-db-goku-kamehameha',
      animeSlug: 'dragon-ball',
      characterId: 'son-goku',
      characterName: 'Son Goku',
      videoUrl: 'https://media.giphy.com/media/fT3PPZwB2WDVC/giphy.gif',
      techniqueOrSceneName: 'Kamehameha Onda de Energia',
      description: 'Concentração de ki entre as mãos disparando uma torrente de energia celestial.',
    },
  ],
};

/**
 * Retorna os desafios de cena para um determinado anime.
 */
export function getSceneChallengesForAnime(animeSlug: string): SceneChallenge[] {
  const list = SCENE_CHALLENGES[animeSlug];
  if (list && list.length > 0) {
    return [...list];
  }

  // Fallback seguro usando o clipe clássico do acervo
  return [
    {
      id: `scene-fallback-${animeSlug}`,
      animeSlug,
      characterId: 'default',
      characterName: 'Personagem Misterioso',
      videoUrl: 'https://c.tenor.com/2roX3uxz_68AAAAC/naruto-rasengan.gif',
      techniqueOrSceneName: 'Cena Marcante',
      description: 'Ação épica do anime em exibição.',
    },
  ];
}
