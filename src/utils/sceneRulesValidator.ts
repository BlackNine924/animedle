/**
 * Diretrizes e Validador Oficial de Cenas do Modo Cena (Animedle)
 * Centraliza as regras de qualidade, dificuldade e animação para que todas as cenas sigam o padrão Ouro (ex: Law).
 */

export interface SceneRuleCheck {
  id: string;
  title: string;
  description: string;
  passed: boolean;
  reason?: string;
}

export interface SceneCandidateMetadata {
  characterId: string;
  animeId: string;
  /** Fonte original do vídeo (deve ser 'official_anime', nunca 'game' | 'fanmade' | 'manga_mmv' | 'live_action') */
  sourceType: 'official_anime' | 'game' | 'fanmade' | 'manga_mmv' | 'live_action';
  /** Quantidade de personagens visíveis nos frames do corte */
  visibleCharactersCount: number;
  /** Tipo de enquadramento predominante */
  shotFraming: 'wide_dynamic' | 'medium_action' | 'extreme_closeup_face' | 'static_portrait';
  /** Quantidade total de frames no WebP animado */
  frameCount: number;
  /** Taxa de quadros por segundo (padrão: 12) */
  fps: number;
  /** Proporção (0 a 1) de frames com movimento real entre si (evita cenas congeladas) */
  motionRatio: number;
  /** Indica se há legendas, marcas d'água (@) ou HUD visíveis */
  hasSubtitlesOrWatermark: boolean;
  /** Largura e altura do arquivo gerado */
  width: number;
  height: number;
}

export const SCENE_MODE_RULES_CONFIG = {
  GOLD_STANDARD_REFERENCES: [
    'public/scenes/one-piece/law-trafalgar.webp',
    'public/scenes/one-piece/borsalino.webp',
  ],
  MIN_FRAMES: 20,
  MAX_FRAMES: 220,
  TARGET_FPS: 12,
  MIN_DURATION_SEC: 1.8,
  MAX_DURATION_SEC: 8.0,
  MIN_MOTION_RATIO: 0.75,
  TARGET_WIDTH: 480,
  TARGET_HEIGHT: 270,
  MAX_VISIBLE_CHARACTERS: 1,
} as const;

/**
 * Valida se uma cena candidata cumpre todas as regras canônicas do Modo Cena.
 */
export function validateSceneCandidate(meta: SceneCandidateMetadata): {
  isValid: boolean;
  checks: SceneRuleCheck[];
} {
  const durationSec = meta.fps > 0 ? meta.frameCount / meta.fps : 0;

  const checks: SceneRuleCheck[] = [
    {
      id: 'OFFICIAL_ANIME_ONLY',
      title: 'Apenas Anime Oficial',
      description: 'Terminalmente proibido cenas de jogos, fanmades, mangá colorido (MMV) ou live-action.',
      passed: meta.sourceType === 'official_anime',
      reason:
        meta.sourceType !== 'official_anime'
          ? `Fonte inválida detectada: "${meta.sourceType}". Apenas episódios/filmes oficiais do anime são permitidos.`
          : undefined,
    },
    {
      id: 'SINGLE_CHARACTER_ONLY',
      title: '100% Solo (Apenas 1 Personagem)',
      description: 'Apenas o personagem secreto pode aparecer em todos os frames do corte.',
      passed: meta.visibleCharactersCount === SCENE_MODE_RULES_CONFIG.MAX_VISIBLE_CHARACTERS,
      reason:
        meta.visibleCharactersCount !== 1
          ? `Foram detectados ${meta.visibleCharactersCount} personagens na cena. Deve haver exatamente 1.`
          : undefined,
    },
    {
      id: 'NO_OBVIOUS_CLOSEUP',
      title: 'Não Entregar de Cara (Plano Dinâmico)',
      description:
        'Evitar close-up frontal estático no rosto; priorizar plano aberto/médio dinâmico usando técnica (padrão Law).',
      passed:
        meta.shotFraming === 'wide_dynamic' || meta.shotFraming === 'medium_action',
      reason:
        meta.shotFraming === 'extreme_closeup_face' || meta.shotFraming === 'static_portrait'
          ? `Enquadramento "${meta.shotFraming}" entrega demais o personagem ou é parado demais.`
          : undefined,
    },
    {
      id: 'FLUID_ANIMATION_NOT_STATIC',
      title: 'Movimento Real (Não Parecer Imagem Estática)',
      description: `Mínimo de ${SCENE_MODE_RULES_CONFIG.MIN_FRAMES} frames (${SCENE_MODE_RULES_CONFIG.MIN_DURATION_SEC}s+) e pelo menos ${SCENE_MODE_RULES_CONFIG.MIN_MOTION_RATIO * 100}% de quadros em movimento real.`,
      passed:
        meta.frameCount >= SCENE_MODE_RULES_CONFIG.MIN_FRAMES &&
        durationSec >= SCENE_MODE_RULES_CONFIG.MIN_DURATION_SEC &&
        meta.motionRatio >= SCENE_MODE_RULES_CONFIG.MIN_MOTION_RATIO,
      reason:
        meta.frameCount < SCENE_MODE_RULES_CONFIG.MIN_FRAMES
          ? `Poucos quadros (${meta.frameCount}). Mínimo exigido: ${SCENE_MODE_RULES_CONFIG.MIN_FRAMES}.`
          : meta.motionRatio < SCENE_MODE_RULES_CONFIG.MIN_MOTION_RATIO
          ? `Cena muito parada (variação de movimento de ${(meta.motionRatio * 100).toFixed(0)}%, mínimo ${SCENE_MODE_RULES_CONFIG.MIN_MOTION_RATIO * 100}%).`
          : undefined,
    },
    {
      id: 'CLEAN_VISUALS',
      title: 'Limpeza Visual (Sem Legendas ou Marcas d\'Água)',
      description: 'Proibido conter legendas embutidas, créditos ou marcas d\'água (@handles).',
      passed: !meta.hasSubtitlesOrWatermark,
      reason: meta.hasSubtitlesOrWatermark
        ? 'A cena contém legendas, HUD ou marca d\'água visível.'
        : undefined,
    },
    {
      id: 'STANDARD_DIMENSIONS',
      title: 'Resolução Padronizada 16:9 (480x270)',
      description: 'Formato WebP animado em 480x270 para encaixe perfeito no Modo Cena.',
      passed:
        meta.width === SCENE_MODE_RULES_CONFIG.TARGET_WIDTH &&
        meta.height === SCENE_MODE_RULES_CONFIG.TARGET_HEIGHT,
      reason:
        meta.width !== SCENE_MODE_RULES_CONFIG.TARGET_WIDTH ||
        meta.height !== SCENE_MODE_RULES_CONFIG.TARGET_HEIGHT
          ? `Dimensão atual ${meta.width}x${meta.height} difere do padrão ${SCENE_MODE_RULES_CONFIG.TARGET_WIDTH}x${SCENE_MODE_RULES_CONFIG.TARGET_HEIGHT}.`
          : undefined,
    },
  ];

  return {
    isValid: checks.every((c) => c.passed),
    checks,
  };
}
