import { Character, MatchStatus, MatchResultCell, AttributeColumn, ArrowDirection, GameMode } from '../types/anime';

/**
 * Função hashing determinística que inclui o slug do animé E o modo de jogo.
 * Isso faz com que cada modo (Clássico, Procurado, Citação, Habilidade) tenha um personagem MISTERIOSO DIFERENTE por dia!
 */
export function getDailyCharacterIndex(animeSlug: string, mode: GameMode, totalCharacters: number): number {
  const today = new Date().toISOString().split('T')[0]; // Ex: "2026-09-22"
  const seedString = `${animeSlug}-${mode}-${today}`;

  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    const char = seedString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Converte para inteiro de 32 bits
  }

  const positiveHash = Math.abs(hash);
  return positiveHash % totalCharacters;
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

      const formatBounty = (val: number) => {
        if (val === 0) return 'Sem Recompensa';
        if (val >= 1000000000) return `฿${(val / 1000000000).toLocaleString('pt-BR')} Bi`;
        if (val >= 1000000) return `฿${(val / 1000000).toLocaleString('pt-BR')} Mi`;
        return `฿${val.toLocaleString('pt-BR')}`;
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
    } else if (col.type === 'status') {
      const gStr = (guessedVal as string) || '';
      const tStr = (targetVal as string) || '';

      const isBothDead = gStr.startsWith('Morto') && tStr.startsWith('Morto');
      const isBothAlive = gStr.startsWith('Vivo') && tStr.startsWith('Vivo');
      const isExact = gStr === tStr || isBothDead || isBothAlive;

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
