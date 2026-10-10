/**
 * Utilitário de Fila Anti-Repetição Persistente para o Modo Treino / Infinito.
 * Garante que 100% dos desafios (cenas, vozes, personagens) sejam sorteados SEM REPETIÇÃO
 * até que todo o catálogo daquele anime e modo seja esgotado no ciclo atual.
 *
 * Além disso:
 * - Persiste o progresso no localStorage por anime e modo.
 * - Suporta adição de novas cenas sem resetar o histórico.
 * - Ao reiniciar um ciclo completo, nunca repete o último desafio jogado.
 */

interface SavedEndlessState {
  current: number;
  played: number[];
  lastPoolSize: number;
}

/**
 * Obtém o índice atual ou avança para um novo desafio não repetido no Modo Infinito.
 * @param animeSlug Slug do anime (ex: 'one-piece', 'naruto', 'jujutsu-kaisen')
 * @param mode Modo de jogo (ex: 'scene', 'classic', 'voice')
 * @param poolSize Total de desafios disponíveis no catálogo
 * @param advance Se deve consumir e avançar para o próximo desafio
 */
export function getOrAdvanceEndlessIndex(
  animeSlug: string,
  mode: string,
  poolSize: number,
  advance: boolean = false
): number {
  if (poolSize <= 0) return 0;
  if (poolSize === 1) return 0;

  const storageKey = `animedle_endless_deck_v2_${animeSlug}_${mode}`;
  let state: SavedEndlessState | null = null;

  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      state = JSON.parse(raw);
    }
  } catch (e) {
    state = null;
  }

  // Validação básica do estado carregado
  if (
    !state ||
    typeof state.current !== 'number' ||
    !Array.isArray(state.played) ||
    state.current < 0 ||
    state.current >= poolSize
  ) {
    // Inicialização de primeira execução
    const firstIdx = Math.floor(Math.random() * poolSize);
    state = {
      current: firstIdx,
      played: [firstIdx],
      lastPoolSize: poolSize,
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (e) {}

    return state.current;
  }

  // Se o usuário só quer ler o índice atual sem avançar
  if (!advance) {
    return state.current;
  }

  // Filtrar os índices já jogados que ainda são válidos para o poolSize atual
  const validPlayed = state.played.filter((idx) => typeof idx === 'number' && idx >= 0 && idx < poolSize);

  // Lista de índices que AINDA NÃO FORAM JOGADOS no ciclo atual
  const playedSet = new Set(validPlayed);
  let unplayed: number[] = [];
  for (let i = 0; i < poolSize; i++) {
    if (!playedSet.has(i)) {
      unplayed.push(i);
    }
  }

  // Se esgotou todas as opções do catálogo, reinicia um novo ciclo completo
  if (unplayed.length === 0) {
    const lastPlayed = state.current;
    // Permite todas exceto a última jogada para evitar repetição consecutiva no recomeço
    for (let i = 0; i < poolSize; i++) {
      if (i !== lastPlayed) {
        unplayed.push(i);
      }
    }
    // Caso de borda poolSize === 1
    if (unplayed.length === 0) {
      unplayed = [0];
    }
    // Limpa a lista de jogados para o novo ciclo
    validPlayed.length = 0;
  }

  // Sorteia aleatoriamente entre as opções restantes não jogadas
  const chosenIdx = unplayed[Math.floor(Math.random() * unplayed.length)];
  validPlayed.push(chosenIdx);

  state = {
    current: chosenIdx,
    played: validPlayed,
    lastPoolSize: poolSize,
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (e) {}

  return state.current;
}
