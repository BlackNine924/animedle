import React, { useState, useMemo, useEffect } from 'react';
import { Character, GameStats } from '../types/anime';
import { ModeHeaderCard } from './ModeHeaderCard';
import { SpeedrunArena } from './SpeedrunArena';
import {
  Shuffle,
  XCircle,
  Send,
  Sparkles,
  Trophy,
  RotateCcw,
  AlertTriangle,
  Puzzle,
  ArrowRight,
  Flag,
} from 'lucide-react';
import { getDailyDateString } from '../utils/dailySeed';
import { updateGlobalStatsOnOutcome } from '../data/achievements';
import {
  SurvivalState,
  getSurvivalState,
  toggleSurvivalMode,
  recordSurvivalWin,
  recordSurvivalLoss,
  resetSurvivalRun,
  FriendChallengeData,
  encodeFriendChallengeUrl,
  getNextPendingDestination,
  awardAnimeXp,
} from '../utils/featuresManager';

interface AnimeConnectionsModeProps {
  characters: Character[];
  animeSlug: string;
  animeTitle: string;
  themeColor: string;
  initialFriendChallenge?: FriendChallengeData | null;
  onClearFriendChallenge?: () => void;
}

export interface ConnectionCategory {
  id: string;
  title: string;
  difficulty: 1 | 2 | 3 | 4; // 1=Amarelo, 2=Verde, 3=Azul, 4=Roxo
  characters: Character[];
  matcher: (c: Character) => boolean;
}

function seededRandom(seedStr: string): () => number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithRng<T>(arr: T[], rng: () => number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const INVALID_VALUES = new Set([
  '',
  'nenhum',
  'nenhuma',
  'desconhecido',
  'desconhecida',
  'n/a',
  '-',
  'não possui',
  'sem fruta',
  'sem akuma no mi',
]);

function isValidAttrValue(v?: string | null): boolean {
  if (!v) return false;
  return !INVALID_VALUES.has(v.trim().toLowerCase());
}

function normalizeHairForConnections(raw?: string | null): string | null {
  if (!raw) return null;
  const s = raw.toLowerCase().trim();
  if (!s || INVALID_VALUES.has(s)) return null;
  if (s.includes('careca') || s.includes('sem cabelo')) return 'Careca / Sem Cabelo';
  if (s.includes('loiro') || s.includes('dourad') || s.includes('blond')) return 'Cabelo Loiro';
  if (s.includes('preto') || s.includes('negro') || s.includes('black')) return 'Cabelo Preto';
  if (s.includes('castanho') || s.includes('marrom') || s.includes('brown')) return 'Cabelo Castanho';
  if (s.includes('branco') || s.includes('pratead') || s.includes('grisalh') || s.includes('cinza') || s.includes('white') || s.includes('silver')) return 'Cabelo Branco / Grisalho';
  if (s.includes('ruivo') || s.includes('vermelh') || s.includes('laranja') || s.includes('red') || s.includes('orange')) return 'Cabelo Ruivo / Laranja';
  if (s.includes('azul') || s.includes('verde') || s.includes('blue') || s.includes('green') || s.includes('ciano')) return 'Cabelo Azul / Verde';
  if (s.includes('rosa') || s.includes('pink')) return 'Cabelo Rosa';
  if (s.includes('roxo') || s.includes('lilás') || s.includes('violet') || s.includes('purple')) return 'Cabelo Roxo / Lilás';
  return raw.trim();
}

function normalizeCombatForConnections(raw?: string | null): string | null {
  if (!raw) return null;
  const s = raw.trim();
  if (!s || INVALID_VALUES.has(s.toLowerCase())) return null;
  if (s === 'Usuário de Espada / Lâmina' || s === 'Armas Brancas / Espadachim') return 'Armas Brancas / Espadachim';
  if (s === 'Corpo a Corpo' || s === 'Combate Corpo a Corpo') return 'Combate Corpo a Corpo';
  if (s === 'Longo Alcance / Projéteis' || s === 'Ataque à Distância / Projéteis') return 'Ataque à Distância / Projéteis';
  return s;
}

function matchesCombatForConnections(c: Character, targetLabel: string): boolean {
  const primary = normalizeCombatForConnections(c.combatType);
  if (primary === targetLabel) return true;
  const rawAny = c as unknown as Record<string, string | undefined>;
  const powerText = [c.styleOrPower, rawAny.zanpakuto, rawAny.breathing, rawAny.weapon, c.teigu].filter(Boolean).join(' ').toLowerCase();
  if (targetLabel === 'Armas Brancas / Espadachim') {
    return /(espadachim|espada|katana|lâmina|kenjutsu|foice|lança|adaga|machado|clava|kanabo|bisento|tridente|respiração|zanpakut)/i.test(powerText);
  }
  if (targetLabel === 'Ataque à Distância / Projéteis') {
    return /(atirador|franco-atirador|arco|arma de fogo|pistola|rifle|estilingue|projéteis|canhão|artilharia)/i.test(powerText);
  }
  return false;
}

/**
 * Gera um tabuleiro 4x4 (16 personagens divididos em 4 categorias de 4) no estilo Pokennection.com,
 * priorizando grupos canônicos verificados e garantindo zero sobreposição ambígua entre os 4 grupos.
 */
function generateConnectionsBoard(characters: Character[], seedStr: string): ConnectionCategory[] {
  const rng = seededRandom(seedStr);

  interface CandidateGroup {
    id: string;
    title: string;
    baseDifficulty: 1 | 2 | 3 | 4;
    matcher: (c: Character) => boolean;
    pool: Character[];
  }

  const rawCandidates: Omit<CandidateGroup, 'pool'>[] = [];

  // Coleta valores únicos presentes no elenco
  const affiliations = new Set<string>();
  const arcs = new Set<string>();
  const combatTypes = new Set<string>();
  const hairColors = new Set<string>();
  const roles = new Map<string, number>();
  const speciesSet = new Set<string>();
  const fruitTypes = new Set<string>();
  const powers = new Set<string>();
  const villages = new Set<string>();
  const ranks = new Set<string>();
  const grades = new Set<string>();
  const natureTypes = new Set<string>();
  const nenTypes = new Set<string>();
  const schools = new Set<string>();
  const positions = new Set<string>();
  const countries = new Set<string>();
  const origins = new Set<string>();

  characters.forEach((c) => {
    if (Array.isArray(c.affiliation)) {
      c.affiliation.forEach((a) => {
        if (isValidAttrValue(a)) affiliations.add(a.trim());
      });
    }
    const arcVal = (c.debutArc || '').trim();
    if (isValidAttrValue(arcVal)) arcs.add(arcVal);

    const ctVal = normalizeCombatForConnections(c.combatType);
    if (ctVal) combatTypes.add(ctVal);

    const hcVal = normalizeHairForConnections(c.hairColor);
    if (hcVal) hairColors.add(hcVal);

    if (isValidAttrValue(c.roleOrArchetype)) {
      const r = c.roleOrArchetype!.trim();
      roles.set(r, (roles.get(r) || 0) + 1);
    }
    if (isValidAttrValue(c.species)) speciesSet.add(c.species.trim());
    if (isValidAttrValue(c.fruitType)) fruitTypes.add(c.fruitType!.trim());
    if (isValidAttrValue(c.styleOrPower) && !c.styleOrPower.includes('(')) {
      powers.add(c.styleOrPower.trim());
    }
    if (isValidAttrValue(c.village)) villages.add(c.village!.trim());
    if (isValidAttrValue(c.rank)) ranks.add(c.rank!.trim());
    if (isValidAttrValue(c.grade)) grades.add(c.grade!.trim());
    if (Array.isArray(c.natureTypes)) {
      c.natureTypes.forEach((nt) => {
        if (isValidAttrValue(nt)) natureTypes.add(nt.trim());
      });
    }
    if (isValidAttrValue(c.nenType)) nenTypes.add(c.nenType!.trim());
    if (isValidAttrValue(c.school)) schools.add(c.school!.trim());
    if (isValidAttrValue(c.position)) positions.add(c.position!.trim());
    if (isValidAttrValue(c.country)) countries.add(c.country!.trim());
    if (isValidAttrValue(c.origin)) origins.add(c.origin!.trim());
  });

  // Nível 1 (Amarelo - Fácil): Afiliação, Vila, Escola, Obra & Espécie
  affiliations.forEach((aff) => {
    rawCandidates.push({
      id: `aff:${aff}`,
      title: `Afiliação: ${aff}`,
      baseDifficulty: 1,
      matcher: (c) => Array.isArray(c.affiliation) && c.affiliation.some((a) => a.trim() === aff),
    });
  });

  villages.forEach((vil) => {
    rawCandidates.push({
      id: `vil:${vil}`,
      title: `Vila / Origem: ${vil}`,
      baseDifficulty: 1,
      matcher: (c) => c.village?.trim() === vil,
    });
  });

  schools.forEach((sch) => {
    rawCandidates.push({
      id: `sch:${sch}`,
      title: `Escola / Time: ${sch}`,
      baseDifficulty: 1,
      matcher: (c) => c.school?.trim() === sch,
    });
  });

  origins.forEach((orig) => {
    rawCandidates.push({
      id: `orig:${orig}`,
      title: `Obra: ${orig}`,
      baseDifficulty: 1,
      matcher: (c) => c.origin?.trim() === orig,
    });
  });

  speciesSet.forEach((sp) => {
    rawCandidates.push({
      id: `sp:${sp}`,
      title: `Espécie / Raça: ${sp}`,
      baseDifficulty: 1,
      matcher: (c) => c.species?.trim() === sp,
    });
  });

  // Nível 2 (Verde - Médio): Arco de Estreia, Patente/Rank, Grau, Posição, País & Papel na Obra
  arcs.forEach((arc) => {
    rawCandidates.push({
      id: `arc:${arc}`,
      title: `Estrearam no Arco: ${arc}`,
      baseDifficulty: 2,
      matcher: (c) => (c.debutArc || '').trim() === arc,
    });
  });

  ranks.forEach((rk) => {
    rawCandidates.push({
      id: `rk:${rk}`,
      title: `Rank / Patente: ${rk}`,
      baseDifficulty: 2,
      matcher: (c) => c.rank?.trim() === rk,
    });
  });

  grades.forEach((gr) => {
    rawCandidates.push({
      id: `gr:${gr}`,
      title: `Grau / Classe: ${gr}`,
      baseDifficulty: 2,
      matcher: (c) => c.grade?.trim() === gr,
    });
  });

  positions.forEach((pos) => {
    rawCandidates.push({
      id: `pos:${pos}`,
      title: `Posição em Campo: ${pos}`,
      baseDifficulty: 2,
      matcher: (c) => c.position?.trim() === pos,
    });
  });

  countries.forEach((cnt) => {
    rawCandidates.push({
      id: `cnt:${cnt}`,
      title: `País / Nacionalidade: ${cnt}`,
      baseDifficulty: 2,
      matcher: (c) => c.country?.trim() === cnt,
    });
  });

  roles.forEach((count, role) => {
    // Ignora o fallback genérico caso mais de 40% do elenco o tenha
    if (role === 'Aliado / Membro de Equipe' && count > characters.length * 0.4) return;
    rawCandidates.push({
      id: `role:${role}`,
      title: `Papel na Obra: ${role}`,
      baseDifficulty: 2,
      matcher: (c) => c.roleOrArchetype?.trim() === role,
    });
  });

  // Nível 3 (Azul - Difícil): Estilo de Combate, Poder, Tipo de Fruta, Elemento & Nen
  combatTypes.forEach((ct) => {
    rawCandidates.push({
      id: `ct:${ct}`,
      title: `Estilo de Combate: ${ct}`,
      baseDifficulty: 3,
      matcher: (c) => matchesCombatForConnections(c, ct),
    });
  });

  fruitTypes.forEach((ft) => {
    rawCandidates.push({
      id: `ft:${ft}`,
      title: `Usuários de Akuma no Mi: ${ft}`,
      baseDifficulty: 3,
      matcher: (c) => c.fruitType?.trim() === ft,
    });
  });

  natureTypes.forEach((nt) => {
    rawCandidates.push({
      id: `nt:${nt}`,
      title: `Liberação da Natureza: ${nt}`,
      baseDifficulty: 3,
      matcher: (c) => Array.isArray(c.natureTypes) && c.natureTypes.some((n) => n.trim() === nt),
    });
  });

  nenTypes.forEach((nen) => {
    rawCandidates.push({
      id: `nen:${nen}`,
      title: `Tipo de Nen: ${nen}`,
      baseDifficulty: 3,
      matcher: (c) => c.nenType?.trim() === nen,
    });
  });

  powers.forEach((pw) => {
    rawCandidates.push({
      id: `pw:${pw}`,
      title: `Poder / Energia: ${pw}`,
      baseDifficulty: 3,
      matcher: (c) => c.styleOrPower?.trim() === pw,
    });
  });

  // Nível 4 (Roxo - Especial / Detalhe Visual & Haki & Status Confirmado)
  hairColors.forEach((hc) => {
    rawCandidates.push({
      id: `hc:${hc}`,
      title: `Característica Visual: ${hc}`,
      baseDifficulty: 4,
      matcher: (c) => normalizeHairForConnections(c.hairColor) === hc,
    });
  });

  // Status Canônico: apenas Morto / Morta confirmado (nunca Desconhecido)
  rawCandidates.push({
    id: `st:morto`,
    title: `Status Canônico: Morto(a)`,
    baseDifficulty: 4,
    matcher: (c) => {
      const s = (c.status || '').trim().toLowerCase();
      return s === 'morto' || s === 'morta' || s === 'falecido' || s === 'falecida';
    },
  });

  // Especial One Piece: Haki do Conquistador / Rei (suporta array ou string)
  rawCandidates.push({
    id: `haki:conq`,
    title: `Possuem Haki do Rei (Conquistador)`,
    baseDifficulty: 4,
    matcher: (c) =>
      Array.isArray(c.haki)
        ? c.haki.some((h) => /rei|conquistador/i.test(h))
        : typeof c.haki === 'string' && /rei|conquistador/i.test(c.haki),
  });

  // Filtra grupos que possuem pelo menos 4 personagens válidos
  const validGroups: CandidateGroup[] = rawCandidates
    .map((cand) => ({
      ...cand,
      pool: shuffleWithRng(characters.filter(cand.matcher), rng),
    }))
    .filter((g) => g.pool.length >= 4 && g.pool.length <= Math.max(14, Math.floor(characters.length * 0.5)));

  const shuffledGroups = shuffleWithRng(validGroups, rng);

  // Tenta montar 4 grupos de 4 personagens sem colisão de IDs e com ZERO sobreposição cruzada
  const chosenCategories: ConnectionCategory[] = [];
  const usedCharIds = new Set<string>();
  const usedPrefixes = new Set<string>();

  // Passada 1A: Estrita com prefixos distintos (máxima variedade e zero ambiguidade)
  for (const cand of shuffledGroups) {
    if (chosenCategories.length >= 4) break;
    const prefix = cand.id.split(':')[0];
    if (usedPrefixes.has(prefix) && shuffledGroups.length > 8) continue;

    const exclusiveChars = cand.pool.filter(
      (c) =>
        !usedCharIds.has(c.id) &&
        chosenCategories.every((existing) => !existing.matcher(c))
    );

    if (exclusiveChars.length >= 4) {
      const picked4 = exclusiveChars.slice(0, 4);
      const reverseClean = chosenCategories.every((existing) =>
        existing.characters.every((ec) => !cand.matcher(ec))
      );
      if (reverseClean) {
        picked4.forEach((c) => usedCharIds.add(c.id));
        usedPrefixes.add(prefix);
        chosenCategories.push({
          id: cand.id,
          title: cand.title,
          difficulty: (chosenCategories.length + 1) as 1 | 2 | 3 | 4,
          characters: picked4,
          matcher: cand.matcher,
        });
      }
    }
  }

  // Passada 1B: Estrita permitindo mesmo prefixo (ainda 100% livre de sobreposição cruzada)
  if (chosenCategories.length < 4) {
    for (const cand of shuffledGroups) {
      if (chosenCategories.length >= 4) break;
      if (chosenCategories.some((c) => c.id === cand.id)) continue;

      const exclusiveChars = cand.pool.filter(
        (c) =>
          !usedCharIds.has(c.id) &&
          chosenCategories.every((existing) => !existing.matcher(c))
      );

      if (exclusiveChars.length >= 4) {
        const picked4 = exclusiveChars.slice(0, 4);
        const reverseClean = chosenCategories.every((existing) =>
          existing.characters.every((ec) => !cand.matcher(ec))
        );
        if (reverseClean) {
          picked4.forEach((c) => usedCharIds.add(c.id));
          chosenCategories.push({
            id: cand.id,
            title: cand.title,
            difficulty: (chosenCategories.length + 1) as 1 | 2 | 3 | 4,
            characters: picked4,
            matcher: cand.matcher,
          });
        }
      }
    }
  }

  // Passada 2: Fallback de segurança mantendo 16 personagens únicos
  if (chosenCategories.length < 4) {
    for (const cand of shuffledGroups) {
      if (chosenCategories.length >= 4) break;
      if (chosenCategories.some((c) => c.id === cand.id)) continue;

      const available = cand.pool.filter((c) => !usedCharIds.has(c.id));
      if (available.length >= 4) {
        const picked4 = available.slice(0, 4);
        picked4.forEach((c) => usedCharIds.add(c.id));
        chosenCategories.push({
          id: cand.id,
          title: cand.title,
          difficulty: (chosenCategories.length + 1) as 1 | 2 | 3 | 4,
          characters: picked4,
          matcher: cand.matcher,
        });
      }
    }
  }

  // Ordena pelas dificuldades base (1=Amarelo, 2=Verde, 3=Azul, 4=Roxo)
  return chosenCategories
    .sort((a, b) => a.difficulty - b.difficulty)
    .map((cat, idx) => ({
      ...cat,
      difficulty: (idx + 1) as 1 | 2 | 3 | 4,
    }));
}

const DIFFICULTY_STYLES: Record<
  1 | 2 | 3 | 4,
  { label: string; bannerClass: string; badgeClass: string; dotColor: string }
> = {
  1: {
    label: 'Nível 1 • Fácil',
    bannerClass: 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 border-amber-200',
    badgeClass: 'bg-black/15 text-slate-950',
    dotColor: '🟨',
  },
  2: {
    label: 'Nível 2 • Médio',
    bannerClass: 'bg-gradient-to-r from-emerald-500 to-green-400 text-slate-950 border-emerald-200',
    badgeClass: 'bg-black/15 text-slate-950',
    dotColor: '🟩',
  },
  3: {
    label: 'Nível 3 • Difícil',
    bannerClass: 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 border-sky-200',
    badgeClass: 'bg-black/15 text-slate-950',
    dotColor: '🟦',
  },
  4: {
    label: 'Nível 4 • Mestre',
    bannerClass: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white border-purple-300',
    badgeClass: 'bg-white/20 text-white',
    dotColor: '🟪',
  },
};

export const AnimeConnectionsMode: React.FC<AnimeConnectionsModeProps> = ({
  characters,
  animeSlug,
  animeTitle,
  themeColor,
  initialFriendChallenge,
  onClearFriendChallenge,
}) => {
  const todayStr = getDailyDateString();

  const [isEndless, setIsEndless] = useState<boolean>(() => Boolean(initialFriendChallenge));
  const [isSpeedrun, setIsSpeedrun] = useState<boolean>(false);
  const [endlessRound, setEndlessRound] = useState<number>(() => initialFriendChallenge?.t ?? 1);

  const [survivalState, setSurvivalState] = useState<SurvivalState>(() =>
    getSurvivalState(animeSlug, 'connections')
  );
  const [survivalHealed, setSurvivalHealed] = useState<boolean>(false);

  const seedStr = useMemo(() => {
    if (isEndless) {
      return `conn_endless_${animeSlug}_${endlessRound}`;
    }
    return `conn_daily_${animeSlug}_${todayStr}`;
  }, [isEndless, animeSlug, endlessRound, todayStr]);

  const categories = useMemo(
    () => generateConnectionsBoard(characters, seedStr),
    [characters, seedStr]
  );

  // Estado salvo para o modo Diário
  const storageKey = `animedle_connections_${seedStr}`;

  const [solvedCategoryIds, setSolvedCategoryIds] = useState<string[]>(() => {
    if (isEndless) return [];
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed.solvedIds) ? parsed.solvedIds : [];
      }
    } catch {}
    return [];
  });

  const [mistakesLeft, setMistakesLeft] = useState<number>(() => {
    if (isEndless) return 4;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.mistakesLeft === 'number' ? parsed.mistakesLeft : 4;
      }
    } catch {}
    return 4;
  });

  const [isSurrendered, setIsSurrendered] = useState<boolean>(() => {
    if (isEndless) return false;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.isSurrendered);
      }
    } catch {}
    return false;
  });

  const [selectedCharIds, setSelectedCharIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'info' | 'warn' | 'error' | 'success' } | null>(null);
  const [tileOrder, setTileOrder] = useState<string[]>([]);

  // Inicializa / atualiza ordem das 16 peças ao mudar de tabuleiro
  useEffect(() => {
    const allChars = categories.flatMap((c) => c.characters);
    const rng = seededRandom(`${seedStr}_shuffle`);
    setTileOrder(shuffleWithRng(allChars.map((c) => c.id), rng));
    setSelectedCharIds([]);
    setToastMessage(null);

    if (!isEndless) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          setSolvedCategoryIds(Array.isArray(parsed.solvedIds) ? parsed.solvedIds : []);
          setMistakesLeft(typeof parsed.mistakesLeft === 'number' ? parsed.mistakesLeft : 4);
          setIsSurrendered(Boolean(parsed.isSurrendered));
          return;
        }
      } catch {}
    }
    setSolvedCategoryIds([]);
    setMistakesLeft(4);
    setIsSurrendered(false);
  }, [categories, seedStr, isEndless, storageKey]);

  // Persiste estado diário
  useEffect(() => {
    if (!isEndless && categories.length === 4) {
      const isWon = solvedCategoryIds.length === 4;
      const isLost = mistakesLeft <= 0 || isSurrendered;
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            solvedIds: solvedCategoryIds,
            mistakesLeft,
            isSurrendered,
            isWon,
            isLost,
          })
        );
        // Também salva em animedle_progress_${animeSlug}_connections_${todayStr} para compatibilidade global
        localStorage.setItem(
          `animedle_progress_${animeSlug}_connections_${todayStr}`,
          JSON.stringify({
            guesses: [],
            isWon,
            isLost,
            isSurrendered,
          })
        );
      } catch {}
    }
  }, [solvedCategoryIds, mistakesLeft, isSurrendered, isEndless, categories.length, storageKey, animeSlug, todayStr]);

  const isWon = solvedCategoryIds.length === 4 && categories.length === 4;
  const isLost = !isWon && (mistakesLeft <= 0 || isSurrendered);
  const isFinished = isWon || isLost;

  const showToast = (text: string, type: 'info' | 'warn' | 'error' | 'success' = 'info') => {
    setToastMessage({ text, type });
    window.setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 2800);
  };

  const handleToggleChar = (charId: string) => {
    if (isFinished) return;
    setSelectedCharIds((prev) => {
      if (prev.includes(charId)) {
        return prev.filter((id) => id !== charId);
      }
      if (prev.length >= 4) return prev;
      return [...prev, charId];
    });
  };

  const handleShuffleTiles = () => {
    setTileOrder((prev) => shuffleWithRng(prev, () => Math.random()));
  };

  const handleDeselectAll = () => {
    setSelectedCharIds([]);
  };

  const handleSubmitGroup = () => {
    if (selectedCharIds.length !== 4 || isFinished) return;

    const unsolved = categories.filter((c) => !solvedCategoryIds.includes(c.id));

    // Verifica quantos dos 4 selecionados pertencem a cada categoria ainda não resolvida
    let bestMatchCategory: ConnectionCategory | null = null;
    let maxOverlap = 0;

    for (const cat of unsolved) {
      const catCharIds = new Set(cat.characters.map((c) => c.id));
      const overlap = selectedCharIds.filter((id) => catCharIds.has(id)).length;
      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        bestMatchCategory = cat;
      }
    }

    if (maxOverlap === 4 && bestMatchCategory) {
      const nextSolved = [...solvedCategoryIds, bestMatchCategory.id];
      setSolvedCategoryIds(nextSolved);
      setSelectedCharIds([]);

      if (nextSolved.length === 4) {
        showToast('🎉 Perfeito! Você conectou os 4 grupos de personagens!', 'success');
        // S3: Recompensa de XP de Maestria (+80 XP no Diário, +35 XP no Infinito)
        awardAnimeXp(animeSlug, isEndless ? 35 : 80, isEndless ? undefined : `conn_${todayStr}`);

        if (!isEndless) {
          const updated = updateGlobalStatsOnOutcome('win');
          window.dispatchEvent(new CustomEvent('animedle_stats_updated', { detail: updated }));
        } else if (survivalState.active) {
          const res = recordSurvivalWin(animeSlug, 'connections');
          setSurvivalState(res.state);
          if (res.healedHeart) {
            setSurvivalHealed(true);
            window.setTimeout(() => setSurvivalHealed(false), 3500);
          }
        }
      } else {
        showToast(`✅ Grupo encontrado: ${bestMatchCategory.title}!`, 'success');
      }
    } else {
      const nextMistakes = Math.max(0, mistakesLeft - 1);
      setMistakesLeft(nextMistakes);

      if (nextMistakes <= 0) {
        showToast('💀 Suas 4 tentativas acabaram! Veja as conexões corretas.', 'error');
        if (!isEndless) {
          const updated = updateGlobalStatsOnOutcome('defeat');
          window.dispatchEvent(new CustomEvent('animedle_stats_updated', { detail: updated }));
        } else if (survivalState.active) {
          const res = recordSurvivalLoss(animeSlug, 'connections');
          setSurvivalState(res.state);
        }
      } else if (maxOverlap === 3) {
        // Feedback clássico do Pokennection / NYT Connections!
        showToast('🔥 A apenas 1 de distância! (3 dos 4 personagens pertencem ao mesmo grupo)', 'warn');
      } else {
        showToast('❌ Esses 4 personagens não formam uma conexão exata.', 'error');
      }
    }
  };

  const handleSurrender = () => {
    if (isFinished) return;
    setIsSurrendered(true);
    setSelectedCharIds([]);
    if (isEndless && survivalState.active) {
      const res = recordSurvivalLoss(animeSlug, 'connections');
      setSurvivalState(res.state);
    }
  };

  const handleNewEndlessBoard = () => {
    setEndlessRound((r) => r + 1);
    onClearFriendChallenge?.();
  };

  const handleChallengeFriend = () => {
    const url = encodeFriendChallengeUrl({
      a: animeSlug,
      m: 'connections',
      t: endlessRound,
    });
    navigator.clipboard.writeText(url).catch(() => {});
    return url;
  };

  // Mapeia todos os 16 personagens do tabuleiro por ID
  const charById = useMemo(() => {
    const map: Record<string, Character> = {};
    categories.forEach((cat) => {
      cat.characters.forEach((c) => {
        map[c.id] = c;
      });
    });
    return map;
  }, [categories]);

  // Categorias resolvidas (ou todas reveladas quando o jogo termina)
  const displayedCategories = useMemo(() => {
    if (isFinished) {
      const solved = solvedCategoryIds
        .map((id) => categories.find((c) => c.id === id))
        .filter((c): c is ConnectionCategory => Boolean(c));
      const remaining = categories.filter((c) => !solvedCategoryIds.includes(c.id));
      return [...solved, ...remaining];
    }
    return solvedCategoryIds
      .map((id) => categories.find((c) => c.id === id))
      .filter((c): c is ConnectionCategory => Boolean(c));
  }, [categories, solvedCategoryIds, isFinished]);

  const solvedCharIdSet = useMemo(() => {
    const set = new Set<string>();
    displayedCategories.forEach((cat) => {
      cat.characters.forEach((c) => set.add(c.id));
    });
    return set;
  }, [displayedCategories]);

  const remainingTiles = useMemo(() => {
    return tileOrder
      .filter((id) => !solvedCharIdSet.has(id))
      .map((id) => charById[id])
      .filter((c): c is Character => Boolean(c));
  }, [tileOrder, solvedCharIdSet, charById]);

  const nextDest = useMemo(
    () => (!isEndless && isFinished ? getNextPendingDestination(animeSlug, 'connections', todayStr) : null),
    [isEndless, isFinished, animeSlug, todayStr]
  );

  return (
    <div className="max-w-3xl mx-auto my-6">
      <ModeHeaderCard
        title="Modo Conexões (4×4)"
        description="Agrupe os 16 personagens em 4 categorias secretas de 4 integrantes cada (estilo Pokennection)!"
        icon={<Puzzle size={20} />}
        themeColor={themeColor}
        isEndless={isEndless}
        onToggleEndless={(val) => {
          setIsEndless(val);
        }}
        survivalState={survivalState}
        onToggleSurvival={(act) => {
          const updated = toggleSurvivalMode(animeSlug, 'connections', act);
          setSurvivalState(updated);
        }}
        healedBanner={survivalHealed}
      />

      {(
        <div className="bg-[#0b1120] border border-[#22304d] rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
          {/* Toast de Feedback ("A 1 de distância!", Acerto ou Erro) */}
          {toastMessage && (
            <div
              className={`mb-4 px-4 py-2.5 rounded-2xl text-xs font-black text-center border shadow-lg animate-fadeIn flex items-center justify-center gap-2 ${
                toastMessage.type === 'warn'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                  : toastMessage.type === 'success'
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                  : toastMessage.type === 'error'
                  ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                  : 'bg-sky-500/20 border-sky-400 text-sky-200'
              }`}
            >
              {toastMessage.type === 'warn' && <AlertTriangle size={15} className="text-amber-400 shrink-0" />}
              <span>{toastMessage.text}</span>
            </div>
          )}

          {/* Faixas Horizontais das Categorias já Resolvidas (ou Reveladas no Fim) */}
          {displayedCategories.length > 0 && (
            <div className="space-y-2.5 mb-3">
              {displayedCategories.map((cat) => {
                const style = DIFFICULTY_STYLES[cat.difficulty];
                const wasSolvedByPlayer = solvedCategoryIds.includes(cat.id);
                return (
                  <div
                    key={cat.id}
                    className={`p-3.5 sm:p-4 rounded-2xl border-2 shadow-lg transition-all animate-fadeIn ${style.bannerClass}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
                        {style.dotColor} {cat.title}
                      </span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${style.badgeClass}`}>
                        {wasSolvedByPlayer ? style.label : `${style.label} (Revelado)`}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {cat.characters.map((c) => (
                        <div
                          key={c.id}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-black/20 backdrop-blur-sm"
                        >
                          <img
                            src={c.avatar}
                            alt={c.name}
                            className="w-7 h-7 rounded-full object-cover border border-white/40 shrink-0"
                          />
                          <span className="text-[11px] font-extrabold leading-tight break-words">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Grade 4x4 dos Personagens Restantes (Estilo Pokennection) */}
          {remainingTiles.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 my-2">
              {remainingTiles.map((char) => {
                const isSelected = selectedCharIds.includes(char.id);
                return (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => handleToggleChar(char.id)}
                    className={`group relative p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all duration-200 select-none ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 scale-[1.03] shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                        : 'bg-[#111a2e] hover:bg-[#16223b] border-[#223252] hover:border-slate-500'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-400 text-black text-[10px] font-black flex items-center justify-center shadow">
                        ✓
                      </span>
                    )}
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 mb-2 transition-transform group-hover:scale-105 ${
                        isSelected ? 'border-amber-300' : 'border-[#2b3f66]'
                      }`}
                    >
                      <img
                        src={char.avatar}
                        alt={char.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span
                      className={`text-xs font-black leading-tight break-words ${
                        isSelected ? 'text-amber-200' : 'text-slate-100'
                      }`}
                    >
                      {char.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Barra Inferior: Tentativas Restantes + Controles do Pokennection */}
          {!isFinished ? (
            <div className="mt-5 pt-4 border-t border-[#1e2b45] flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Indicador de 4 Tentativas (Bolinhas) */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Erros Restantes:
                </span>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                        i < mistakesLeft
                          ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)] scale-100'
                          : 'bg-slate-800 border border-slate-700 scale-75'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Botões: Embaralhar, Desmarcar, Desistir e Enviar (X/4) */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleShuffleTiles}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111a2e] hover:bg-[#192540] border border-[#243557] text-slate-200 text-xs font-bold transition-all active:scale-95"
                >
                  <Shuffle size={14} />
                  <span>Embaralhar</span>
                </button>

                <button
                  type="button"
                  onClick={handleDeselectAll}
                  disabled={selectedCharIds.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111a2e] hover:bg-[#192540] border border-[#243557] text-slate-200 text-xs font-bold transition-all active:scale-95 disabled:opacity-40"
                >
                  <XCircle size={14} />
                  <span>Desmarcar</span>
                </button>

                <button
                  type="button"
                  onClick={handleSurrender}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-bold transition-all active:scale-95"
                >
                  <Flag size={13} />
                  <span>Revelar</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitGroup}
                  disabled={selectedCharIds.length !== 4}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-black uppercase tracking-wider shadow-lg transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                  <span>Enviar ({selectedCharIds.length}/4)</span>
                </button>
              </div>
            </div>
          ) : (
            /* Resumo de Vitória / Fim de Jogo do Modo Conexões */
            <div className="mt-5 pt-5 border-t border-[#1e2b45] text-center space-y-4 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-black">
                <Trophy size={15} />
                <span>
                  {isWon
                    ? `Vitória nas Conexões de ${animeTitle}! (${4 - mistakesLeft} ${
                        4 - mistakesLeft === 1 ? 'erro' : 'erros'
                      })`
                    : 'Fim de Jogo — Todas as 4 Conexões foram reveladas acima!'}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {isEndless ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (survivalState.active && survivalState.isGameOver) {
                        setSurvivalState(resetSurvivalRun(animeSlug, 'connections'));
                      }
                      handleNewEndlessBoard();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
                  >
                    <RotateCcw size={15} />
                    <span>
                      {survivalState.active && survivalState.isGameOver
                        ? '🔥 Reiniciar Sobrevivência'
                        : '⏩ Nova Grade de Conexões'}
                    </span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEndless(true);
                        handleNewEndlessBoard();
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all"
                    >
                      <Sparkles size={15} />
                      <span>Jogar no Modo Infinito</span>
                    </button>

                    {nextDest && nextDest.type !== 'home' && (
                      <button
                        type="button"
                        onClick={() => {
                          window.dispatchEvent(
                            new CustomEvent('animedle_navigate_destination', {
                              detail: {
                                type: nextDest.type,
                                mode: nextDest.nextMode,
                                animeSlug: nextDest.nextAnimeSlug,
                              },
                            })
                          );
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-black text-xs uppercase tracking-wider shadow-lg transition-all"
                      >
                        <span>
                          {nextDest.type === 'mode'
                            ? `Próximo Modo: ${nextDest.nextModeLabel}`
                            : `Próximo Anime: ${nextDest.nextAnimeName}`}
                        </span>
                        <ArrowRight size={15} />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
