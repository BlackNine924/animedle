import { Character, GameMode } from '../types/anime';
import { AVAILABLE_ANIMES, COLLECTION_ANIMES } from '../data/animes/animeRegistry';

// ============================================================================
// A4: NAVEGAÇÃO INTELIGENTE ENTRE MODOS PENDENTES E PRÓXIMO ANIME
// ============================================================================

export type DailyModeStatus = 'won' | 'lost' | 'pending';

export interface ModeMeta {
  id: GameMode;
  label: string;
  shortLabel: string;
}

export const ORDERED_SIX_MODES: ModeMeta[] = [
  { id: 'classic', label: 'Modo Clássico', shortLabel: 'Clássico' },
  { id: 'wanted', label: 'Modo Procurado', shortLabel: 'Procurado' },
  { id: 'scene', label: 'Modo Cena', shortLabel: 'Cena' },
  { id: 'ability', label: 'Modo Exclusivo', shortLabel: 'Exclusivo' },
  { id: 'zoom', label: 'Modo Zoom', shortLabel: 'Zoom' },
  { id: 'grid', label: 'Modo Grid 3×3', shortLabel: 'Grid' },
];

export function getDailyModeStatuses(slug: string, todayStr: string): Record<GameMode, DailyModeStatus> {
  const statuses: Record<GameMode, DailyModeStatus> = {
    classic: 'pending',
    wanted: 'pending',
    scene: 'pending',
    ability: 'pending',
    zoom: 'pending',
    grid: 'pending',
    voice: 'pending',
  };

  try {
    const coreModes: GameMode[] = ['classic', 'wanted', 'scene', 'zoom'];
    for (const m of coreModes) {
      const raw = localStorage.getItem(`animedle_progress_${slug}_${m}_${todayStr}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.isWon) {
          statuses[m] = 'won';
        } else if (parsed?.isLost || parsed?.isSurrendered) {
          statuses[m] = 'lost';
        }
      }
    }

    // Modo Exclusivo ('ability')
    const exclRaw = localStorage.getItem(`animedle_${slug}_exclusive_daily_${todayStr}`);
    if (exclRaw) {
      const parsed = JSON.parse(exclRaw);
      if (parsed?.won || parsed?.isWon) {
        statuses.ability = 'won';
      } else if (parsed?.completed) {
        statuses.ability = 'lost';
      }
    } else {
      const fallbackAbility = localStorage.getItem(`animedle_progress_${slug}_ability_${todayStr}`);
      if (fallbackAbility) {
        const parsed = JSON.parse(fallbackAbility);
        if (parsed?.isWon) statuses.ability = 'won';
        else if (parsed?.isLost || parsed?.isSurrendered) statuses.ability = 'lost';
      }
    }

    // Modo Grid ('grid')
    const isoToday = new Date().toISOString().slice(0, 10);
    const gridSeed = `daily_${slug}_${todayStr}`;
    const legacySeed = `daily_${slug}_${isoToday}`;
    const gridCellsRaw =
      localStorage.getItem(`animedle_grid_${gridSeed}`) ||
      localStorage.getItem(`animedle_grid_${legacySeed}`);
    const gridGuessesRaw =
      localStorage.getItem(`animedle_grid_guesses_${gridSeed}`) ??
      localStorage.getItem(`animedle_grid_guesses_${legacySeed}`);
    const gridSurrRaw =
      localStorage.getItem(`animedle_grid_surrendered_${gridSeed}`) ||
      localStorage.getItem(`animedle_grid_surrendered_${legacySeed}`);

    if (gridCellsRaw) {
      const parsedCells = JSON.parse(gridCellsRaw);
      const filledCount = Array.isArray(parsedCells) ? parsedCells.filter(Boolean).length : 0;
      const guessesLeft = gridGuessesRaw !== null ? parseInt(gridGuessesRaw, 10) : 9;
      const isSurr = gridSurrRaw === 'true';

      if (filledCount === 9) {
        statuses.grid = 'won';
      } else if (guessesLeft <= 0 || isSurr) {
        statuses.grid = 'lost';
      }
    }
  } catch {
    // ignore storage errors
  }

  return statuses;
}

export interface NextPendingAction {
  type: 'mode' | 'anime' | 'home';
  nextMode?: GameMode;
  nextModeLabel?: string;
  nextAnimeSlug?: string;
  nextAnimeName?: string;
  remainingInCurrentAnime: number;
  statuses: Record<GameMode, DailyModeStatus>;
}

export function getNextPendingDestination(
  currentSlug: string,
  currentMode: string,
  todayStr: string
): NextPendingAction {
  const normalizedCurrentMode: GameMode =
    currentMode === 'exclusive' ? 'ability' : (currentMode as GameMode);

  const statuses = getDailyModeStatuses(currentSlug, todayStr);
  // Modos ainda pendentes no anime atual
  const pendingModes = ORDERED_SIX_MODES.filter((m) => statuses[m.id] === 'pending');

  if (pendingModes.length > 0) {
    const currentIdx = ORDERED_SIX_MODES.findIndex((m) => m.id === normalizedCurrentMode);
    let chosen: ModeMeta = pendingModes[0];
    if (currentIdx >= 0) {
      for (let offset = 1; offset <= ORDERED_SIX_MODES.length; offset++) {
        const candidate = ORDERED_SIX_MODES[(currentIdx + offset) % ORDERED_SIX_MODES.length];
        if (statuses[candidate.id] === 'pending') {
          chosen = candidate;
          break;
        }
      }
    }

    return {
      type: 'mode',
      nextMode: chosen.id,
      nextModeLabel: chosen.shortLabel,
      remainingInCurrentAnime: pendingModes.length,
      statuses,
    };
  }

  // Todos os 6 modos deste anime foram jogados hoje -> Busca o próximo anime da lista que tenha modo pendente!
  const allImplemented = [...AVAILABLE_ANIMES, ...COLLECTION_ANIMES];
  const currentAnimeIdx = allImplemented.findIndex((a) => a.slug === currentSlug);

  for (let offset = 1; offset <= allImplemented.length; offset++) {
    const idx = currentAnimeIdx >= 0 ? (currentAnimeIdx + offset) % allImplemented.length : offset - 1;
    const candidateAnime = allImplemented[idx];
    if (!candidateAnime || candidateAnime.slug === currentSlug) continue;

    const candStatuses = getDailyModeStatuses(candidateAnime.slug, todayStr);
    const firstPending = ORDERED_SIX_MODES.find((m) => candStatuses[m.id] === 'pending');
    if (firstPending) {
      return {
        type: 'anime',
        nextAnimeSlug: candidateAnime.slug,
        nextAnimeName: candidateAnime.name,
        nextMode: firstPending.id,
        nextModeLabel: firstPending.shortLabel,
        remainingInCurrentAnime: 0,
        statuses,
      };
    }
  }

  return {
    type: 'home',
    remainingInCurrentAnime: 0,
    statuses,
  };
}

// ============================================================================
// C1: PORCENTAGEM DE RARIDADE / ESCOLHA POPULAR NO MODO GRADE (RARITY SCORE)
// ============================================================================

export type RarityTier = 'ultra_rare' | 'epic' | 'uncommon' | 'common';

export interface CellRarityInfo {
  percentage: number;
  formatted: string;
  tier: RarityTier;
  label: string;
  pillClasses: string;
  ringClasses: string;
  validPoolSize: number;
}

function deterministicHash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function calculateGridCellRarity(
  chosenChar: Character,
  validMatches: Character[],
  allCharacters: Character[]
): CellRarityInfo {
  const poolSize = Math.max(1, validMatches.length);
  const rosterSize = Math.max(15, allCharacters.length);
  const h = deterministicHash(`${chosenChar.id}_${poolSize}`);
  const jitter = ((h % 100) / 100) * 0.8; // 0.0 .. 0.8

  let percentage = 15.0;

  // Regra estrita definida pelo usuário:
  // Quando uma célula só tem 1 único personagem possível na resposta (ou 2 num elenco grande),
  // é classificado como ULTRA-RARO (< 3.0%), pois lembrar o único personagem do elenco inteiro
  // que cumpre aquele cruzamento específico é um feito raríssimo!
  if (poolSize === 1) {
    percentage = Number((0.4 + ((h % 14) / 10)).toFixed(1)); // 0.4% a 1.7%
  } else if (poolSize === 2) {
    const isFirst = validMatches[0]?.id === chosenChar.id;
    percentage = Number((isFirst ? 1.8 + jitter * 0.8 : 1.1 + jitter * 0.7).toFixed(1)); // 1.1% a 2.5%
  } else {
    // Calcula proeminência de cada candidato válido dentro da célula
    const scored = validMatches.map((c) => {
      const rosterIndex = allCharacters.findIndex((ac) => ac.id === c.id);
      const roleStr = `${c.roleOrArchetype || ''} ${c.role || ''}`.toLowerCase();
      let weight = 10;
      if (roleStr.includes('protagonista') || roleStr.includes('principal')) weight += 35;
      else if (roleStr.includes('antagonista') || roleStr.includes('vilão') || roleStr.includes('deuteragonista')) weight += 22;
      else if (roleStr.includes('secundário') || roleStr.includes('suporte')) weight += 8;

      if (Array.isArray(c.techniques) && c.techniques.length > 0) {
        weight += Math.min(18, c.techniques.length * 3);
      }
      // Personagens cadastrados no topo ou com IDs curtos/clássicos costumam ser mais lembrados
      const charHash = deterministicHash(c.id) % 25;
      weight += charHash;
      if (rosterIndex >= 0 && rosterIndex < 15) weight += 10;

      return { id: c.id, weight };
    });

    // Ordena do mais popular (maior peso) para o mais obscuro (menor peso)
    scored.sort((a, b) => b.weight - a.weight);
    const rankIndex = Math.max(0, scored.findIndex((s) => s.id === chosenChar.id));
    const rankPercentile = poolSize > 1 ? rankIndex / (poolSize - 1) : 0; // 0 = mais óbvio, 1 = mais obscuro

    // Fator de escassez da célula em relação ao elenco total
    const cellDensity = Math.min(1, poolSize / Math.max(12, rosterSize * 0.25));

    if (poolSize <= 4) {
      // Célula bem restrita (3 ou 4 opções): varia de ~1.9% (Ultra-Raro) até ~11% (Incomum)
      const base = 9.5 - rankPercentile * 7.6;
      percentage = Number(Math.max(1.2, base + jitter).toFixed(1));
    } else {
      // Célula média ou ampla (5+ opções):
      // O #1 mais popular fica entre 28% e 56%, os intermediários entre 8% e 24%, e os mais obscuros entre 1.4% e 7.5%
      const maxPop = 26 + cellDensity * 28; // 26% a 54%
      const minPop = Math.max(1.3, 4.2 - cellDensity * 2.5); // 1.7% a 4.2%
      const curve = Math.pow(1 - rankPercentile, 2.1); // curva exponencial realista de escolha popular
      percentage = Number((minPop + (maxPop - minPop) * curve + jitter * 0.5).toFixed(1));
    }
  }

  let tier: RarityTier = 'common';
  let label = 'Comum';
  let pillClasses = 'bg-slate-800/95 text-slate-200 border-slate-500/60';
  let ringClasses = 'border-emerald-400';

  if (percentage < 3.0) {
    tier = 'ultra_rare';
    label = 'Ultra-Raro';
    pillClasses = 'bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 border-white shadow-[0_0_10px_rgba(34,211,238,0.75)]';
    ringClasses = 'border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)]';
  } else if (percentage < 10.0) {
    tier = 'epic';
    label = 'Épico';
    pillClasses = 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white border-purple-300/80 shadow-[0_0_8px_rgba(168,85,247,0.5)]';
    ringClasses = 'border-purple-400';
  } else if (percentage < 25.0) {
    tier = 'uncommon';
    label = 'Incomum';
    pillClasses = 'bg-sky-600/95 text-white border-sky-300/70';
    ringClasses = 'border-sky-400';
  }

  return {
    percentage,
    formatted: `${percentage.toFixed(1)}%`,
    tier,
    label,
    pillClasses,
    ringClasses,
    validPoolSize: poolSize,
  };
}

export interface GridRaritySummary {
  averageRarity: number;
  totalRarityScore: number;
  rankTitle: string;
  rankBadgeColor: string;
  rarestPick: { char: Character; info: CellRarityInfo } | null;
}

export function summarizeGridRarity(
  cells: (Character | null)[],
  cellRarities: (CellRarityInfo | null)[]
): GridRaritySummary | null {
  const filled: { char: Character; info: CellRarityInfo }[] = [];
  cells.forEach((c, idx) => {
    const r = cellRarities[idx];
    if (c && r) filled.push({ char: c, info: r });
  });

  if (filled.length === 0) return null;

  const sum = filled.reduce((acc, item) => acc + item.info.percentage, 0);
  const avg = Number((sum / filled.length).toFixed(1));
  // Se deixou células em branco, cada célula vazia adiciona penalidade de +50 no score total de raridade
  const missingPenalty = (9 - filled.length) * 50;
  const totalRarityScore = Number((sum + missingPenalty).toFixed(1));

  const sortedByRarest = [...filled].sort((a, b) => a.info.percentage - b.info.percentage);
  const rarestPick = sortedByRarest[0] || null;

  let rankTitle = 'C • Escolhas Populares';
  let rankBadgeColor = 'bg-slate-700/80 text-slate-200 border-slate-500/50';

  if (avg < 4.5 && filled.length === 9) {
    rankTitle = 'S+ • Enciclopédia Viva (Ultra-Raro)';
    rankBadgeColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50';
  } else if (avg < 9.5) {
    rankTitle = 'S • Caçador de Raridades';
    rankBadgeColor = 'bg-purple-500/20 text-purple-300 border-purple-400/50';
  } else if (avg < 18.0) {
    rankTitle = 'A • Conhecedor Profundo';
    rankBadgeColor = 'bg-amber-500/20 text-amber-300 border-amber-400/50';
  } else if (avg < 28.0) {
    rankTitle = 'B • Estratégico';
    rankBadgeColor = 'bg-sky-500/20 text-sky-300 border-sky-400/50';
  }

  return {
    averageRarity: avg,
    totalRarityScore,
    rankTitle,
    rankBadgeColor,
    rarestPick,
  };
}

// ============================================================================
// E2: MODO SOBREVIVÊNCIA / STREAK INFINITO (3 CORAÇÕES + CURA A CADA 5 ACERTOS)
// ============================================================================

export interface SurvivalState {
  active: boolean;
  hearts: number; // 0 a 3 (máximo estrito: 3)
  streak: number; // vitórias acumuladas na run atual
  consecutiveWins: number; // vitórias seguidas desde o último erro (a cada 5 -> +1 coração até máx 3)
  bestStreak: number; // recorde histórico para [animeSlug + mode]
  isGameOver: boolean;
}

function getSurvivalKey(animeSlug: string, mode: string): string {
  const normMode = mode === 'exclusive' ? 'ability' : mode;
  return `animedle_survival_v1_${animeSlug}_${normMode}`;
}

export function getSurvivalState(animeSlug: string, mode: string): SurvivalState {
  const defaultState: SurvivalState = {
    active: false,
    hearts: 3,
    streak: 0,
    consecutiveWins: 0,
    bestStreak: 0,
    isGameOver: false,
  };

  try {
    const raw = localStorage.getItem(getSurvivalKey(animeSlug, mode));
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        active: Boolean(parsed.active),
        hearts: typeof parsed.hearts === 'number' ? Math.min(3, Math.max(0, parsed.hearts)) : 3,
        streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
        consecutiveWins: typeof parsed.consecutiveWins === 'number' ? parsed.consecutiveWins : 0,
        bestStreak: typeof parsed.bestStreak === 'number' ? parsed.bestStreak : 0,
        isGameOver: Boolean(parsed.isGameOver),
      };
    }
  } catch {
    // ignore
  }
  return defaultState;
}

export function saveSurvivalState(animeSlug: string, mode: string, state: SurvivalState): SurvivalState {
  const clamped: SurvivalState = {
    ...state,
    hearts: Math.min(3, Math.max(0, state.hearts)),
    bestStreak: Math.max(state.bestStreak, state.streak),
  };
  try {
    localStorage.setItem(getSurvivalKey(animeSlug, mode), JSON.stringify(clamped));
  } catch {
    // ignore
  }
  return clamped;
}

export function toggleSurvivalMode(animeSlug: string, mode: string, active: boolean): SurvivalState {
  const current = getSurvivalState(animeSlug, mode);
  if (active && current.isGameOver) {
    // Se estava em Game Over ao ativar, inicia uma nova run limpa com 3 corações
    return saveSurvivalState(animeSlug, mode, {
      ...current,
      active: true,
      hearts: 3,
      streak: 0,
      consecutiveWins: 0,
      isGameOver: false,
    });
  }
  return saveSurvivalState(animeSlug, mode, {
    ...current,
    active,
  });
}

export function recordSurvivalWin(
  animeSlug: string,
  mode: string
): { state: SurvivalState; healedHeart: boolean } {
  const current = getSurvivalState(animeSlug, mode);
  if (!current.active || current.isGameOver) {
    return { state: current, healedHeart: false };
  }

  const nextStreak = current.streak + 1;
  const nextConsecutive = current.consecutiveWins + 1;
  let nextHearts = current.hearts;
  let healedHeart = false;

  // Regra definida pelo usuário: a cada 5 acertos consecutivos recupera 1 vida,
  // mas caso já tenha 3, continua com 3 (nunca fica com 4).
  if (nextConsecutive > 0 && nextConsecutive % 5 === 0) {
    if (nextHearts < 3) {
      nextHearts = Math.min(3, nextHearts + 1);
      healedHeart = true;
    }
  }

  const updated = saveSurvivalState(animeSlug, mode, {
    ...current,
    hearts: nextHearts,
    streak: nextStreak,
    consecutiveWins: nextConsecutive,
    bestStreak: Math.max(current.bestStreak, nextStreak),
    isGameOver: false,
  });

  return { state: updated, healedHeart };
}

export function recordSurvivalLoss(
  animeSlug: string,
  mode: string
): { state: SurvivalState; lostLastHeart: boolean } {
  const current = getSurvivalState(animeSlug, mode);
  if (!current.active || current.isGameOver) {
    return { state: current, lostLastHeart: false };
  }

  const nextHearts = Math.max(0, current.hearts - 1);
  const isGameOver = nextHearts <= 0;

  const updated = saveSurvivalState(animeSlug, mode, {
    ...current,
    hearts: nextHearts,
    consecutiveWins: 0,
    isGameOver,
  });

  return { state: updated, lostLastHeart: isGameOver };
}

export function resetSurvivalRun(animeSlug: string, mode: string): SurvivalState {
  const current = getSurvivalState(animeSlug, mode);
  return saveSurvivalState(animeSlug, mode, {
    ...current,
    active: true,
    hearts: 3,
    streak: 0,
    consecutiveWins: 0,
    isGameOver: false,
  });
}

// ============================================================================
// F2: DESAFIAR UM AMIGO VIA LINK COM CÓDIGO (SEED) + 1v1 + REVANCHE
// ============================================================================

export interface FriendChallengeData {
  a: string; // animeSlug
  m: GameMode; // mode
  t?: number; // target index
  cid?: string; // target character ID or challenge ID
  g?: string; // grid seed for Grid 3x3
  s?: {
    w: number; // 1 = venceu, 0 = perdeu
    g: number; // tentativas usadas (ou acertos na Grade 0..9)
    r?: number; // média de raridade na Grade
  };
}

export function encodeFriendChallengeUrl(data: FriendChallengeData): string {
  try {
    const json = JSON.stringify(data);
    const base64 = btoa(encodeURIComponent(json))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://animedle-9og.pages.dev';
    return `${origin}/${data.a}?challenge=${base64}`;
  } catch {
    return typeof window !== 'undefined' ? window.location.href : 'https://animedle-9og.pages.dev';
  }
}

export function decodeFriendChallengeFromUrl(): FriendChallengeData | null {
  try {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('challenge');
    if (!raw) return null;
    const padded = raw.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(padded));
    const parsed = JSON.parse(json);
    if (parsed && typeof parsed.a === 'string' && typeof parsed.m === 'string') {
      return parsed as FriendChallengeData;
    }
  } catch {
    // ignore malformed challenge code
  }
  return null;
}

export function clearChallengeQueryParam(): void {
  try {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (url.searchParams.has('challenge')) {
      url.searchParams.delete('challenge');
      window.history.replaceState({}, '', url.pathname + url.search);
    }
  } catch {
    // ignore
  }
}
