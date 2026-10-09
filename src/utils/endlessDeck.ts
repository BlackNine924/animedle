/**
 * Utilitário de Baralho Cíclico Persistente (Fisher-Yates Deck) para o Modo Treino / Infinito.
 * Garante que 100% dos desafios (cenas, vozes, personagens) sejam sorteados sem repetição
 * até que todo o catálogo daquele anime e modo seja esgotado, persistindo o progresso no localStorage.
 */

function shuffleDeck(array: number[]): number[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface SavedDeck {
  deck: number[];
  currentIndex: number;
}

/**
 * Obtém o índice atual ou avança para o próximo desafio do baralho persistente.
 * @param animeSlug Slug do anime ativo (ex: 'one-piece', 'naruto', 'jujutsu-kaisen')
 * @param mode Modo de jogo ativo (ex: 'scene', 'classic', 'voice')
 * @param poolSize Quantidade total de desafios disponíveis
 * @param advance Se deve consumir a carta e avançar para a próxima
 */
export function getOrAdvanceEndlessIndex(
  animeSlug: string,
  mode: string,
  poolSize: number,
  advance: boolean = false
): number {
  if (poolSize <= 0) return 0;
  if (poolSize === 1) return 0;

  const storageKey = `animedle_endless_deck_${animeSlug}_${mode}`;
  let saved: SavedDeck | null = null;

  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      saved = JSON.parse(raw);
    }
  } catch (e) {
    saved = null;
  }

  // Se não existir ou o tamanho do catálogo mudou (ex: novas cenas adicionadas), inicializa novo baralho
  if (!saved || !Array.isArray(saved.deck) || saved.deck.length !== poolSize || typeof saved.currentIndex !== 'number') {
    const baseIndices = Array.from({ length: poolSize }, (_, i) => i);
    saved = {
      deck: shuffleDeck(baseIndices),
      currentIndex: 0,
    };
  }

  // Avança o ponteiro quando o jogador pede o próximo desafio
  if (advance) {
    saved.currentIndex += 1;
    // Se esgotou todo o baralho, reembaralha para um novo ciclo completo
    if (saved.currentIndex >= saved.deck.length) {
      const lastItem = saved.deck[saved.deck.length - 1];
      const baseIndices = Array.from({ length: poolSize }, (_, i) => i);
      let newDeck = shuffleDeck(baseIndices);
      // Evita repetição imediata entre o fim de um ciclo e o início do próximo
      if (poolSize > 1 && newDeck[0] === lastItem) {
        const swapIdx = Math.floor(Math.random() * (poolSize - 1)) + 1;
        [newDeck[0], newDeck[swapIdx]] = [newDeck[swapIdx], newDeck[0]];
      }
      saved = {
        deck: newDeck,
        currentIndex: 0,
      };
    }
  }

  if (saved.currentIndex >= saved.deck.length) {
    saved.currentIndex = 0;
  }

  try {
    localStorage.setItem(storageKey, JSON.stringify(saved));
  } catch (e) {
    // QuotaExceeded fallback
  }

  return saved.deck[saved.currentIndex];
}
