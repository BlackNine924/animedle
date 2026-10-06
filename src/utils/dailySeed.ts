import { Character, MatchStatus, MatchResultCell, AttributeColumn, ArrowDirection, GameMode } from '../types/anime';

function hashString(seedString: string): number {
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    const char = seedString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Converte para inteiro de 32 bits
  }
  return Math.abs(hash);
}

/**
 * Retorna a data no formato YYYY-MM-DD sincronizada com o Horário de Brasília (America/Sao_Paulo).
 * Garante que a transição de dia aconteça pontualmente à meia-noite (00:00) brasileira.
 */
export function getDailyDateString(): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(new Date());
  } catch {
    const now = new Date();
    const brDate = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    return brDate.toISOString().split('T')[0];
  }
}

/**
 * Converte data YYYY-MM-DD em número de dias corridos desde época UTC.
 */
function getDayNumberFromDateString(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return Math.floor(date.getTime() / (24 * 60 * 60 * 1000));
}

// Marco zero para cálculo de ciclos diários sem repetição (2026-10-06)
const BASE_EPOCH_DAY = 20733;

/**
 * Embaralha um array de forma determinística utilizando uma semente pseudo-aleatória (LCG).
 */
function shuffleArrayWithSeed<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Retorna o índice sorteado de uma permutação cíclica completa.
 * Garante que TODOS os itens do pool (0 até totalItems - 1) sejam jogados
 * exatamente uma vez antes de qualquer repetição acontecer (Ciclo 100% sem repetição).
 */
export function getCyclePermutationIndex(
  animeSlug: string,
  mode: GameMode,
  totalItems: number,
  dayNum: number
): number {
  if (totalItems <= 1) return 0;

  const daysSinceEpoch = Math.max(0, dayNum - BASE_EPOCH_DAY);
  const cycleNumber = Math.floor(daysSinceEpoch / totalItems);
  const positionInCycle = daysSinceEpoch % totalItems;

  const cycleHash = hashString(`${animeSlug}-${mode}-cycle-${cycleNumber}`);
  const baseOrder = Array.from({ length: totalItems }, (_, i) => i);
  const permuted = shuffleArrayWithSeed(baseOrder, cycleHash);

  return permuted[positionInCycle];
}

/**
 * Retorna os índices diários para os modos ('classic', 'wanted', 'zoom')
 * garantindo:
 * 1. Todos os personagens são jogados antes de qualquer repetição (Ciclo fechado).
 * 2. Personagens 100% distintos no mesmo dia entre os modos clássico, procurado e zoom.
 */
export function getDailyDistinctIndices(
  animeSlug: string,
  totalCharacters: number,
  todayStr?: string
): Record<'classic' | 'wanted' | 'zoom', number> {
  const today = todayStr || getDailyDateString();
  if (totalCharacters <= 1) {
    return { classic: 0, wanted: 0, zoom: 0 };
  }

  const currentDayNum = getDayNumberFromDateString(today);

  // Permutação cíclica individual para cada modo
  const classic = getCyclePermutationIndex(animeSlug, 'classic', totalCharacters, currentDayNum);

  let wanted = getCyclePermutationIndex(animeSlug, 'wanted', totalCharacters, currentDayNum);
  if (totalCharacters >= 2 && wanted === classic) {
    let offset = 1;
    while (offset < totalCharacters && (wanted + offset) % totalCharacters === classic) {
      offset++;
    }
    wanted = (wanted + offset) % totalCharacters;
  }

  let zoom = getCyclePermutationIndex(animeSlug, 'zoom', totalCharacters, currentDayNum);
  if (totalCharacters >= 3) {
    let offset = 1;
    while (
      offset < totalCharacters &&
      ((zoom + offset) % totalCharacters === classic || (zoom + offset) % totalCharacters === wanted)
    ) {
      offset++;
    }
    zoom = (zoom + offset) % totalCharacters;
  }

  return { classic, wanted, zoom };
}

/**
 * Retorna o índice do personagem/desafio diário para qualquer modo.
 * Garante que todas as vozes/habilidades/personagens sejam jogadas antes de qualquer repetição.
 */
export function getDailyCharacterIndex(animeSlug: string, mode: GameMode, totalCharacters: number): number {
  if (totalCharacters <= 0) return 0;
  const today = getDailyDateString();

  if (mode === 'classic' || mode === 'wanted' || mode === 'zoom') {
    const distinct = getDailyDistinctIndices(animeSlug, totalCharacters, today);
    return distinct[mode];
  }

  const currentDayNum = getDayNumberFromDateString(today);
  return getCyclePermutationIndex(animeSlug, mode, totalCharacters, currentDayNum);
}

/**
 * Compara um palpite com o personagem misterioso e retorna o status de cada coluna,
 * incluindo setas de direção (⬆️ / ⬇️) para arcos cronológicos.
 */
export function evaluateGuess(
  guessed: Character,
  target: Character,
  columns: AttributeColumn[],
  arcsList: string[] = []
): Record<string, MatchResultCell> {
  const matches: Record<string, MatchResultCell> = {};

  for (const col of columns) {
    const key = col.key as keyof Character;
    const guessedVal = guessed[key];
    const targetVal = target[key];

    if (col.type === 'arc') {
      const guessedArcStr = (guessedVal as string) || '';
      const targetArcStr = (targetVal as string) || '';

      const guessedIdx = arcsList.indexOf(guessedArcStr);
      const targetIdx = arcsList.indexOf(targetArcStr);

      let status: MatchStatus = 'incorrect';
      let arrow: ArrowDirection = 'none';

      if (guessedIdx === targetIdx && guessedIdx !== -1) {
        status = 'correct';
        arrow = 'none';
      } else if (guessedIdx !== -1 && targetIdx !== -1) {
        status = 'incorrect';
        // Se o arco do palpite vem ANTES do arco do alvo na ordem cronológica, o alvo está DEPOIS/MAIS RECENTE -> Seta para cima ⬆️
        if (guessedIdx < targetIdx) {
          arrow = 'up';
        } else {
          // Se o arco do palpite vem DEPOIS do alvo, o alvo está ANTES/MAIS ANTIGO -> Seta para baixo ⬇️
          arrow = 'down';
        }
      }

      matches[col.key] = {
        status,
        value: guessedArcStr,
        arrow,
      };
    } else if (col.key === 'grade') {
      const gGrade = (guessedVal as string) || '';
      const tGrade = (targetVal as string) || '';

      const gradeRanks: Record<string, number> = {
        'Grau Especial': 7,
        'Grau 1': 6,
        'Semi-Grau 1': 5,
        'Grau 2': 4,
        'Semi-Grau 2': 3,
        'Grau 3': 2,
        'Grau 4': 1,
        'Não Classificado': 0
      };

      const gRank = gradeRanks[gGrade] ?? -1;
      const tRank = gradeRanks[tGrade] ?? -1;

      if (gGrade === tGrade && gGrade !== '') {
        matches[col.key] = { status: 'correct', value: gGrade };
      } else if (gRank !== -1 && tRank !== -1) {
        matches[col.key] = {
          status: 'incorrect',
          value: gGrade,
          arrow: gRank < tRank ? 'up' : 'down'
        };
      } else {
        matches[col.key] = { status: 'incorrect', value: gGrade || 'N/A' };
      }
    } else if (col.key === 'species') {
      const gSpec = (guessedVal as string) || '';
      const tSpec = (targetVal as string) || '';

      const extractSpeciesTokens = (s: string) => {
        return s
          .toLowerCase()
          .replace(/híbrido|hibrido/g, '')
          .split(/[\/\(\),]/)
          .map((t) => t.trim())
          .filter((t) => t.length > 2);
      };

      if (gSpec.toLowerCase().trim() === tSpec.toLowerCase().trim()) {
        matches[col.key] = { status: 'correct', value: gSpec };
      } else {
        const gTokens = extractSpeciesTokens(gSpec);
        const tTokens = extractSpeciesTokens(tSpec);

        const hasOverlap = gTokens.some((gt) =>
          tTokens.some((tt) => gt.includes(tt) || tt.includes(gt))
        );

        matches[col.key] = {
          status: hasOverlap ? 'partial' : 'incorrect',
          value: gSpec,
        };
      }
    } else if (col.key === 'styleOrPower') {
      const gPower = (guessedVal as string) || '';
      const tPower = (targetVal as string) || '';

      if ('fruitType' in guessed && 'fruitType' in target) {
        const normalizeFruitCategory = (ft: string): string[] => {
          const types: string[] = [];
          if (/logia/i.test(ft)) types.push('Logia');
          if (/paramecia/i.test(ft)) types.push('Paramecia');
          if (/zoan/i.test(ft)) types.push('Zoan');
          if (types.length === 0 || /nenhuma/i.test(ft)) return ['Nenhuma'];
          return types;
        };

        const gFruitType = (guessed.fruitType as string) || '';
        const tFruitType = (target.fruitType as string) || '';

        const gTypes = normalizeFruitCategory(gFruitType);
        const tTypes = normalizeFruitCategory(tFruitType);
        const gVal = gTypes.join(' & ');

        let status: MatchStatus = 'incorrect';
        const exactMatch =
          gTypes.length === tTypes.length &&
          gTypes.every((t) => tTypes.includes(t));
        const hasOverlap = gTypes.some(
          (t) => t !== 'Nenhuma' && tTypes.includes(t)
        );

        if (exactMatch) {
          status = 'correct';
        } else if (hasOverlap) {
          status = 'partial';
        } else {
          status = 'incorrect';
        }

        matches[col.key] = { status, value: gVal };
      } else {
        if (gPower === tPower) {
          matches[col.key] = { status: 'correct', value: gPower };
        } else {
          const gIsResp = gPower.startsWith('Respiração');
          const tIsResp = tPower.startsWith('Respiração');
          const gIsKek = gPower.startsWith('Kekkijutsu');
          const tIsKek = tPower.startsWith('Kekkijutsu');

          const sharesType = (gIsResp && tIsResp) || (gIsKek && tIsKek);
          const sharesWord = gPower.split(' ').some((w) => w.length > 3 && tPower.includes(w));

          matches[col.key] = {
            status: sharesType || sharesWord ? 'partial' : 'incorrect',
            value: gPower,
          };
        }
      }
    } else if (col.type === 'bounty' || col.key === 'bounty') {
      const gBounty = typeof guessedVal === 'number' ? guessedVal : Number(guessedVal) || 0;
      const tBounty = typeof targetVal === 'number' ? targetVal : Number(targetVal) || 0;

      const isNEL = col.label.includes('NEL') || col.label.includes('¥');
      const formatBounty = (val: number) => {
        if (val === 0) return isNEL ? 'Sem Oferta' : 'Sem Recompensa';
        const symbol = isNEL ? '¥' : '฿';
        if (val >= 1000000000) return `${symbol}${(val / 1000000000).toLocaleString('pt-BR')} Bi`;
        if (val >= 1000000) return `${symbol}${(val / 1000000).toLocaleString('pt-BR')} Mi`;
        return `${symbol}${val.toLocaleString('pt-BR')}`;
      };

      if (gBounty === tBounty) {
        matches[col.key] = { status: 'correct', value: formatBounty(gBounty) };
      } else {
        matches[col.key] = {
          status: 'incorrect',
          value: formatBounty(gBounty),
          arrow: gBounty < tBounty ? 'up' : 'down'
        };
      }
    } else if (col.type === 'status' || col.key === 'status') {
      const gStr = (guessedVal as string) || '';
      const tStr = (targetVal as string) || '';

      const normalizeStatusVal = (s: string) => {
        const lower = s.trim().toLowerCase();
        if (lower.startsWith('viv')) return 'vivo';
        if (lower.startsWith('mort') || lower.startsWith('falec')) return 'morto';
        if (lower.startsWith('eliminad')) return 'eliminado';
        if (lower.startsWith('ativ')) return 'ativo';
        if (lower.startsWith('pres')) return 'preso';
        if (lower.startsWith('incapacitad')) return 'incapacitado';
        if (lower.startsWith('curad')) return 'curado';
        if (lower.startsWith('selad')) return 'selado';
        if (lower.startsWith('profission')) return 'profissional';
        if (lower.startsWith('staff')) return 'staff';
        return lower;
      };

      const gNorm = normalizeStatusVal(gStr);
      const tNorm = normalizeStatusVal(tStr);

      const isExact = gStr.trim().toLowerCase() === tStr.trim().toLowerCase() || (gNorm !== '' && gNorm === tNorm);

      matches[col.key] = {
        status: isExact ? 'correct' : 'incorrect',
        value: gStr || 'N/A',
      };
    } else if (col.type === 'exact') {
      const gStr = (guessedVal as string) || '';
      const tStr = (targetVal as string) || '';
      const gClean = gStr.trim().toLowerCase();
      const tClean = tStr.trim().toLowerCase();

      // Normalização de sinônimos idênticos (ex: EUA e Estados Unidos)
      const normalizeSynonyms = (val: string) => {
        if (val === 'eua' || val === 'estados unidos' || val === 'estados unidos da américa' || val === 'usa') {
          return 'estados unidos';
        }
        return val;
      };

      const isMatch = gClean === tClean || normalizeSynonyms(gClean) === normalizeSynonyms(tClean);

      const genericValues = ['nenhum', 'nenhuma', 'n/a', 'humano', 'masculino', 'feminino'];
      const isPartialStatus =
        !isMatch &&
        gClean !== '' &&
        tClean !== '' &&
        !genericValues.includes(gClean) &&
        !genericValues.includes(tClean) &&
        (gClean.includes(tClean) || tClean.includes(gClean));

      matches[col.key] = {
        status: isMatch ? 'correct' : isPartialStatus ? 'partial' : 'incorrect',
        value: gStr || 'N/A',
      };
    } else if (col.type === 'array') {
      const guessedArr = Array.isArray(guessedVal) ? guessedVal : [guessedVal as string];
      const targetArr = Array.isArray(targetVal) ? targetVal : [targetVal as string];

      const cleanGuessed = guessedArr.map(s => String(s).trim()).filter(Boolean);
      const cleanTarget = targetArr.map(s => String(s).trim()).filter(Boolean);

      // Helper: normalize Kizuki entries to group label for matching
      // e.g. "Doze Kizuki (Lua Superior 1)" -> "Doze Kizuki"
      const normalizeKizuki = (s: string) =>
        s.startsWith('Doze Kizuki') ? 'Doze Kizuki' : s;

      const normGuessed = cleanGuessed.map(normalizeKizuki);
      const normTarget = cleanTarget.map(normalizeKizuki);

      // Exact match: same arrays (using normalized values for Kizuki)
      const exactMatch =
        cleanGuessed.length === cleanTarget.length &&
        cleanGuessed.every((item) => cleanTarget.includes(item));

      // Kizuki group match: both are in Doze Kizuki regardless of rank
      const kizukiGroupMatch =
        !exactMatch &&
        normGuessed.includes('Doze Kizuki') &&
        normTarget.includes('Doze Kizuki');

      // Extrai o grupo/família base removendo papéis ou títulos entre parênteses (ex: "Família Kamado (Caçula)" -> "Família Kamado")
      const getBaseAffiliation = (s: string) => s.replace(/\s*\(.*?\)/g, '').trim().toLowerCase();

      const partialMatch = !exactMatch && !kizukiGroupMatch && cleanGuessed.some((item) =>
        cleanTarget.some((tItem) => {
          const iLow = item.toLowerCase();
          const tLow = tItem.toLowerCase();
          if (iLow === tLow) return true;
          if (item.length > 3 && tItem.length > 3 && (item.includes(tItem) || tItem.includes(item))) return true;
          const baseG = getBaseAffiliation(item);
          const baseT = getBaseAffiliation(tItem);
          if (baseG.length > 3 && baseT.length > 3 && baseG === baseT) return true;
          return false;
        })
      );

      let status: MatchStatus = 'incorrect';
      if (exactMatch || kizukiGroupMatch) status = 'correct';
      else if (partialMatch) status = 'partial';

      matches[col.key] = {
        status,
        value: guessedArr,
      };
    }
  }

  return matches;
}

/**
 * Formata o tempo restante até a próxima meia-noite no Horário de Brasília (America/Sao_Paulo).
 */
export function getTimeUntilNextReset(): string {
  const now = new Date();
  let spDate: Date;
  try {
    const spTimeString = now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });
    spDate = new Date(spTimeString);
  } catch {
    spDate = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  }

  const nextReset = new Date(spDate);
  nextReset.setHours(24, 0, 0, 0);

  const diffMs = Math.max(0, nextReset.getTime() - spDate.getTime());
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Remove registros de progresso diário do localStorage com mais de `keepDays` dias.
 * Mantém estatísticas globais, conquistas e sequências do treino 100% intactas.
 */
export function purgeOldLocalStorage(keepDays = 7): void {
  try {
    const now = new Date();
    const cutoffTime = now.getTime() - keepDays * 24 * 60 * 60 * 1000;
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      const dateMatch = key.match(/_(\d{4}-\d{2}-\d{2})$/);
      if (dateMatch && dateMatch[1]) {
        const keyDate = new Date(dateMatch[1] + 'T12:00:00');
        if (!isNaN(keyDate.getTime()) && keyDate.getTime() < cutoffTime) {
          keysToRemove.push(key);
        }
      }
    }

    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}
