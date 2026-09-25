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
 * Retorna os índices diários para os modos sem repetição ('classic', 'wanted', 'zoom').
 * Garante que os personagens escolhidos para esses três modos sejam totalmente distintos no mesmo dia!
 */
export function getDailyDistinctIndices(
  animeSlug: string,
  totalCharacters: number,
  todayStr?: string
): Record<'classic' | 'wanted' | 'zoom', number> {
  const today = todayStr || new Date().toISOString().split('T')[0];
  if (totalCharacters <= 1) {
    return { classic: 0, wanted: 0, zoom: 0 };
  }

  // 1. Classic target:
  const classicIdx = hashString(`${animeSlug}-classic-${today}`) % totalCharacters;

  // 2. Wanted target (garantido diferente do classic):
  let wantedIdx = hashString(`${animeSlug}-wanted-${today}`) % totalCharacters;
  let attempts = 0;
  while (wantedIdx === classicIdx && attempts < totalCharacters) {
    wantedIdx = (wantedIdx + 1) % totalCharacters;
    attempts++;
  }

  // 3. Zoom target (garantido diferente do classic e do wanted):
  let zoomIdx = hashString(`${animeSlug}-zoom-${today}`) % totalCharacters;
  attempts = 0;
  while ((zoomIdx === classicIdx || zoomIdx === wantedIdx) && attempts < totalCharacters) {
    zoomIdx = (zoomIdx + 1) % totalCharacters;
    attempts++;
  }

  return { classic: classicIdx, wanted: wantedIdx, zoom: zoomIdx };
}

/**
 * Função hashing determinística que inclui o slug do animé E o modo de jogo.
 * Para os modos 'classic', 'wanted' e 'zoom', garante ausência de repetição no mesmo dia.
 * Para 'quote' e 'ability', opera de maneira independente.
 */
export function getDailyCharacterIndex(animeSlug: string, mode: GameMode, totalCharacters: number): number {
  if (totalCharacters <= 0) return 0;
  const today = new Date().toISOString().split('T')[0];

  if (mode === 'classic' || mode === 'wanted' || mode === 'zoom') {
    const distinct = getDailyDistinctIndices(animeSlug, totalCharacters, today);
    return distinct[mode];
  }

  return hashString(`${animeSlug}-${mode}-${today}`) % totalCharacters;
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

      if (gSpec === tSpec) {
        matches[col.key] = { status: 'correct', value: gSpec };
      } else {
        const gHasHuman = gSpec.includes('Humano');
        const tHasHuman = tSpec.includes('Humano');
        const gHasOni = gSpec.includes('Oni');
        const tHasOni = tSpec.includes('Oni');

        const isPartial = (gHasHuman && tHasHuman) || (gHasOni && tHasOni);
        matches[col.key] = {
          status: isPartial ? 'partial' : 'incorrect',
          value: gSpec,
        };
      }
    } else if (col.key === 'styleOrPower') {
      const gPower = (guessedVal as string) || '';
      const tPower = (targetVal as string) || '';

      if ('fruitType' in guessed && 'fruitType' in target) {
        const gFruitType = guessed.fruitType as string;
        const tFruitType = target.fruitType as string;
        
        // Apenas frutas devem entrar:
        const gVal = gFruitType === 'Nenhuma' ? 'Nenhuma' : gPower;
        const tVal = tFruitType === 'Nenhuma' ? 'Nenhuma' : tPower;
        
        let status = 'incorrect';
        
        if (gVal === tVal) {
          status = 'correct';
        } else if (gVal !== 'Nenhuma' && tVal !== 'Nenhuma') {
          status = 'partial';
        } else {
          status = 'incorrect';
        }
        
        matches[col.key] = { status: status as MatchStatus, value: gVal };
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
        if (lower.startsWith('mort')) return 'morto';
        if (lower.startsWith('eliminad')) return 'eliminado';
        if (lower.startsWith('ativ')) return 'ativo';
        if (lower.startsWith('pres')) return 'preso';
        if (lower.startsWith('incapacitad')) return 'incapacitado';
        if (lower.startsWith('curad')) return 'curado';
        if (lower.startsWith('selad')) return 'selado';
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

      const isMatch = gClean === tClean;

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

      const partialMatch = !exactMatch && !kizukiGroupMatch && cleanGuessed.some((item) =>
        cleanTarget.some((tItem) => item.toLowerCase() === tItem.toLowerCase() || (item.length > 3 && tItem.length > 3 && (item.includes(tItem) || tItem.includes(item))))
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
 * Formata o tempo restante até a próxima meia-noite (UTC/Local).
 */
export function getTimeUntilNextReset(): string {
  const now = new Date();
  const nextReset = new Date();
  nextReset.setHours(24, 0, 0, 0);

  const diffMs = nextReset.getTime() - now.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
