import React, { useState, useMemo, useEffect } from 'react';
import { Character } from '../types/anime';
import { X, Flame, Trophy, ArrowUp, ArrowDown, RotateCcw, Swords, Coins, Clock, ShieldCheck } from 'lucide-react';
import { awardAnimeXp } from '../utils/featuresManager';

interface HigherOrLowerModalProps {
  characters: Character[];
  arcs: string[];
  animeSlug: string;
  animeTitle: string;
  themeColor: string;
  onClose?: () => void;
  inline?: boolean;
}

type ComparisonMetric = 'bounty' | 'timeline';

interface ScoredCharacter {
  char: Character;
  value: number;
  displayValue: string;
  subLabel: string;
  tier?: number;
}

function parseBountyToNumber(bountyStr?: string | number): number | null {
  if (bountyStr === undefined || bountyStr === null) return null;
  if (typeof bountyStr === 'number') {
    return bountyStr > 0 ? bountyStr : null;
  }
  const clean = bountyStr.trim();
  if (!clean || /^(nenhuma|nenhum|desconhecid[oa]|sem recompensa|n\/a|-|0)$/i.test(clean)) return null;
  const digits = clean.replace(/[^\d]/g, '');
  if (!digits) return null;
  const val = parseInt(digits, 10);
  return isNaN(val) || val <= 0 ? null : val;
}

function formatBountyDisplay(val: number): string {
  return `฿ ${val.toLocaleString('pt-BR')}`;
}

/**
 * Sistema 2 de Balanceamento de Recompensas:
 * Classifica cada recompensa em 5 Tiers Canônicos de Ameaça para impedir duelos absurdos
 * (ex: Bepo com 500 Berries contra Kaido com 4,6 Bilhões).
 */
function getBountyThreatTier(val: number): number {
  if (val < 100_000) return 0; // Mascotes / Recompensas Simbólicas (Chopper, Bepo, etc.)
  if (val < 30_000_000) return 1; // East Blue / Início da Grand Line
  if (val < 300_000_000) return 2; // Supernovas / Meio da Grand Line
  if (val < 1_200_000_000) return 3; // Comandantes de Yonkou / Novo Mundo
  return 4; // Yonkou, Almirantes & Lendas dos Mares
}

/**
 * Seleciona um desafiante balanceado combinando dois sistemas:
 * - Sistema 1 (Janela de Proximidade no Ranking Ordenado): Escolhe o oponente em uma janela de índices próximos
 *   na lista ordenada por valor, estreitando a janela conforme a sequência (streak) do jogador aumenta.
 * - Sistema 2 (Filtro Anti-Abismo & Guardião de Tiers): Impede que Mascotes (<100k) enfrentem piratas >15M
 *   e limita a proporção máxima (ratio) entre as duas recompensas para manter a dúvida genuína.
 */
function pickBalancedChallengerIndex(
  list: ScoredCharacter[],
  refIdx: number,
  currentStreak: number,
  metric: ComparisonMetric
): number {
  if (list.length < 2) return 0;

  const refItem = list[refIdx];
  if (!refItem) return 0;

  if (metric === 'bounty') {
    // Sistema 1: Raio de proximidade no ranking ordenado (diminui conforme o streak sobe)
    const pctWindow = currentStreak >= 7 ? 0.10 : currentStreak >= 3 ? 0.15 : 0.22;
    const maxRadius = Math.max(5, Math.floor(list.length * pctWindow));

    // Sistema 2: Limite de proporção máxima (ratio) e trava de Tier
    const maxRatio = currentStreak >= 7 ? 3.2 : currentStreak >= 3 ? 4.8 : 7.5;
    const refTier = refItem.tier ?? getBountyThreatTier(refItem.value);

    const strictCandidates: number[] = [];
    const relaxedCandidates: number[] = [];

    for (let i = 0; i < list.length; i++) {
      if (i === refIdx) continue;
      const cand = list[i];
      if (cand.value === refItem.value) continue;

      const rankDist = Math.abs(i - refIdx);
      const candTier = cand.tier ?? getBountyThreatTier(cand.value);
      const tierDiff = Math.abs(candTier - refTier);

      const high = Math.max(cand.value, refItem.value);
      const low = Math.max(1, Math.min(cand.value, refItem.value));
      const ratio = high / low;

      // Trava anti-mascote vs lenda: se um dos dois for mascote (<100k), o outro nunca pode passar de 15M
      const isMascotMismatch =
        (refTier === 0 && cand.value > 15_000_000) || (candTier === 0 && refItem.value > 15_000_000);
      if (isMascotMismatch) continue;

      if (rankDist <= maxRadius && tierDiff <= 1 && ratio <= maxRatio) {
        strictCandidates.push(i);
      } else if (rankDist <= maxRadius * 1.6 && tierDiff <= 1) {
        relaxedCandidates.push(i);
      }
    }

    if (strictCandidates.length > 0) {
      return strictCandidates[Math.floor(Math.random() * strictCandidates.length)];
    }
    if (relaxedCandidates.length > 0) {
      return relaxedCandidates[Math.floor(Math.random() * relaxedCandidates.length)];
    }

    // Fallback seguro: vizinho mais próximo com valor diferente
    for (let offset = 1; offset < list.length; offset++) {
      if (refIdx + offset < list.length && list[refIdx + offset].value !== refItem.value) {
        return refIdx + offset;
      }
      if (refIdx - offset >= 0 && list[refIdx - offset].value !== refItem.value) {
        return refIdx - offset;
      }
    }
  }

  // Para timeline: evita comparar o mesmo arco exatamente, preferindo arcos distintos
  const diffValueIndices: number[] = [];
  for (let i = 0; i < list.length; i++) {
    if (i !== refIdx && list[i].value !== refItem.value) {
      diffValueIndices.push(i);
    }
  }
  if (diffValueIndices.length > 0) {
    return diffValueIndices[Math.floor(Math.random() * diffValueIndices.length)];
  }

  return (refIdx + 1) % list.length;
}

export const HigherOrLowerModal: React.FC<HigherOrLowerModalProps> = ({
  characters,
  arcs,
  animeSlug,
  animeTitle,
  themeColor,
  onClose,
  inline = true,
}) => {
  const hasBountyPool = useMemo(() => {
    if (animeSlug !== 'one-piece') return false;
    const valid = characters.filter((c) => parseBountyToNumber(c.bounty) !== null);
    return valid.length >= 8;
  }, [characters, animeSlug]);

  const [metric, setMetric] = useState<ComparisonMetric>(() => (hasBountyPool ? 'bounty' : 'timeline'));

  // Garante sincronia da métrica ao trocar de anime
  useEffect(() => {
    setMetric(hasBountyPool ? 'bounty' : 'timeline');
  }, [hasBountyPool, animeSlug]);

  // Constrói o pool de personagens pontuados de acordo com a métrica ativa
  const pool = useMemo<ScoredCharacter[]>(() => {
    if (metric === 'bounty') {
      const items = characters
        .map<ScoredCharacter | null>((char) => {
          const val = parseBountyToNumber(char.bounty);
          if (val === null) return null;
          return {
            char,
            value: val,
            displayValue: formatBountyDisplay(val),
            subLabel: 'Recompensa Oficial',
            tier: getBountyThreatTier(val),
          };
        })
        .filter((x): x is ScoredCharacter => x !== null);

      // Sistema 1: Ordena por valor de recompensa para permitir pareamento por proximidade de ranking
      return items.sort((a, b) => a.value - b.value);
    }

    // metric === 'timeline': Exibe o NOME DO ARCO em vez de "1º Arco, 2º Arco"
    return characters
      .map<ScoredCharacter | null>((char) => {
        const arcName = (char.debutArc || '').trim();
        const idx = arcs.findIndex((a) => a.toLowerCase() === arcName.toLowerCase());
        const resolvedIdx = idx >= 0 ? idx + 1 : null;
        if (resolvedIdx === null) return null;
        return {
          char,
          value: resolvedIdx,
          displayValue: arcName,
          subLabel: 'Arco de Estreia Canônico',
        };
      })
      .filter((x): x is ScoredCharacter => x !== null);
  }, [characters, arcs, metric]);

  const bestKey = `animedle_hol_best_${animeSlug}_${metric}`;
  const [bestStreak, setBestStreak] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem(bestKey) || '0', 10) || 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      setBestStreak(parseInt(localStorage.getItem(bestKey) || '0', 10) || 0);
    } catch {
      setBestStreak(0);
    }
  }, [bestKey]);

  const [streak, setStreak] = useState<number>(0);
  const [leftIdx, setLeftIdx] = useState<number>(0);
  const [rightIdx, setRightIdx] = useState<number>(1);
  const [revealState, setRevealState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Sorteia par inicial balanceado sempre que trocar de métrica ou reiniciar
  const pickInitialPair = (list: ScoredCharacter[], currentMetric: ComparisonMetric) => {
    if (list.length < 2) return [0, 0];
    const a = Math.floor(Math.random() * list.length);
    const b = pickBalancedChallengerIndex(list, a, 0, currentMetric);
    return [a, b];
  };

  useEffect(() => {
    const [a, b] = pickInitialPair(pool, metric);
    setLeftIdx(a);
    setRightIdx(b);
    setStreak(0);
    setRevealState('idle');
    setIsGameOver(false);
  }, [pool, metric]);

  const leftItem = pool[leftIdx] || pool[0];
  const rightItem = pool[rightIdx] || pool[1] || pool[0];

  const handleGuess = (choice: 'higher' | 'lower') => {
    if (revealState !== 'idle' || isGameOver || !leftItem || !rightItem) return;

    // Para timeline: 'lower' = Estreou Antes (arco menor ou igual), 'higher' = Estreou Depois (arco maior ou igual)
    const isCorrect =
      choice === 'higher' ? rightItem.value >= leftItem.value : rightItem.value <= leftItem.value;

    setRevealState(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      // S3: Concede +10 XP de Maestria no anime a cada acerto no Maior ou Menor
      awardAnimeXp(animeSlug, 10);

      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
        try {
          localStorage.setItem(bestKey, String(nextStreak));
        } catch {}
      }

      window.setTimeout(() => {
        const newLeft = rightIdx;
        const nextRight = pickBalancedChallengerIndex(pool, newLeft, nextStreak, metric);
        setLeftIdx(newLeft);
        setRightIdx(nextRight);
        setRevealState('idle');
      }, 1100);
    } else {
      window.setTimeout(() => {
        setIsGameOver(true);
      }, 1200);
    }
  };

  // U2: Atalhos de Teclado no Modo Maior ou Menor (Seta Cima / Seta Baixo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleGuess(metric === 'timeline' ? 'lower' : 'higher');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleGuess(metric === 'timeline' ? 'higher' : 'lower');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [revealState, isGameOver, leftIdx, rightIdx, metric, streak]);

  const handleRestart = () => {
    const [a, b] = pickInitialPair(pool, metric);
    setLeftIdx(a);
    setRightIdx(b);
    setStreak(0);
    setRevealState('idle');
    setIsGameOver(false);
  };

  if (!leftItem || !rightItem) return null;

  const contentCard = (
    <div
      className="bg-[#0b1120] border border-[#22304d] rounded-3xl max-w-3xl w-full mx-auto p-4 sm:p-6 shadow-2xl relative overflow-hidden animate-fadeIn"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1e2b45]">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
            style={{ backgroundColor: themeColor }}
          >
            <Swords size={20} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white leading-tight">
              Modo Maior ou Menor ({animeTitle})
            </h2>
            <p className="text-xs text-slate-400">
              Compare os personagens em 1 clique e acumule a maior sequência possível!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-black">
            <Flame size={14} className="text-orange-400" />
            <span>Streak: {streak}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black">
            <Trophy size={14} className="text-amber-400" />
            <span>Recorde: {bestStreak}</span>
          </div>
          {!inline && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Seletor de Categoria de Comparação (Apenas Recompensa e Quem Estreou Primeiro) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
        {hasBountyPool && (
          <button
            type="button"
            onClick={() => setMetric('bounty')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all ${
              metric === 'bounty'
                ? 'bg-amber-500 text-black border-amber-400 shadow-lg'
                : 'bg-[#111a2e] text-slate-300 border-[#202d47] hover:text-white'
            }`}
          >
            <Coins size={14} />
            <span>💰 Maior Recompensa</span>
          </button>
        )}
        <button
          type="button"
          onClick={() => setMetric('timeline')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all ${
            metric === 'timeline'
              ? 'bg-sky-500 text-black border-sky-400 shadow-lg'
              : 'bg-[#111a2e] text-slate-300 border-[#202d47] hover:text-white'
          }`}
        >
          <Clock size={14} />
          <span>⏳ Quem Estreou Primeiro?</span>
        </button>

        {metric === 'bounty' && (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold"
            title="Pareamento inteligente por Faixa de Ameaça e Proximidade de Ranking ativado"
          >
            <ShieldCheck size={12} />
            <span>Matchmaking Balanceado</span>
          </span>
        )}
      </div>

      {/* Arena 1v1 */}
      {!isGameOver ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative items-stretch">
          {/* Card Esquerdo (Conhecido) */}
          <div className="p-5 rounded-3xl bg-[#111a2e] border border-[#223252] flex flex-col items-center justify-center text-center shadow-xl">
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">
              Referência Atual
            </span>
            <img
              src={leftItem.char.avatar}
              alt={leftItem.char.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-amber-400/80 shadow-xl mb-3"
            />
            <h3 className="text-base sm:text-lg font-black text-white mb-1">{leftItem.char.name}</h3>
            <p className="text-[11px] text-slate-400 mb-3">{leftItem.subLabel}</p>

            <div className="px-4 py-2 rounded-2xl bg-[#0a101f] border border-amber-500/40 text-amber-300 font-black text-sm sm:text-lg shadow-inner">
              {leftItem.displayValue}
            </div>
          </div>

          {/* Badge Central VS */}
          <div
            className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center font-black text-xs border-4 shadow-2xl transition-all ${
              revealState === 'correct'
                ? 'bg-emerald-500 text-black border-emerald-300 scale-110'
                : revealState === 'wrong'
                ? 'bg-rose-600 text-white border-rose-300 scale-110'
                : 'bg-[#0b1120] text-white border-[#22304d]'
            }`}
          >
            {revealState === 'correct' ? '✓' : revealState === 'wrong' ? '✕' : 'VS'}
          </div>

          {/* Card Direito (Desafiante) */}
          <div
            className={`p-5 rounded-3xl border flex flex-col items-center justify-center text-center shadow-xl transition-all ${
              revealState === 'correct'
                ? 'bg-emerald-950/30 border-emerald-500/60'
                : revealState === 'wrong'
                ? 'bg-rose-950/30 border-rose-500/60'
                : 'bg-[#111a2e] border-[#223252]'
            }`}
          >
            <span className="text-[10px] uppercase font-black tracking-widest text-sky-400 mb-2">
              Desafiante
            </span>
            <img
              src={rightItem.char.avatar}
              alt={rightItem.char.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-sky-400/80 shadow-xl mb-3"
            />
            <h3 className="text-base sm:text-lg font-black text-white mb-1">{rightItem.char.name}</h3>
            <p className="text-[11px] text-slate-400 mb-3">
              {revealState === 'idle'
                ? metric === 'timeline'
                  ? 'Estreou antes ou depois na obra?'
                  : rightItem.subLabel
                : rightItem.subLabel}
            </p>

            {revealState === 'idle' ? (
              <div className="w-full flex flex-col sm:flex-row gap-2.5 mt-1">
                {metric === 'timeline' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleGuess('lower')}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all active:scale-95"
                    >
                      <ArrowUp size={15} />
                      <span>Estreou ANTES / Igual</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGuess('higher')}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all active:scale-95"
                    >
                      <ArrowDown size={15} />
                      <span>Estreou DEPOIS / Igual</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleGuess('higher')}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all active:scale-95"
                    >
                      <ArrowUp size={15} />
                      <span>MAIOR (ou Igual)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGuess('lower')}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all active:scale-95"
                    >
                      <ArrowDown size={15} />
                      <span>MENOR (ou Igual)</span>
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div
                className={`px-4 py-2 rounded-2xl font-black text-sm sm:text-lg border animate-fadeIn ${
                  revealState === 'correct'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-rose-500/20 border-rose-400 text-rose-300'
                }`}
              >
                {rightItem.displayValue}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Tela de Fim de Jogo do Modo Maior ou Menor */
        <div className="p-6 rounded-3xl bg-[#111a2e] border border-[#223252] text-center">
          <Trophy size={40} className="text-amber-400 mx-auto mb-2" />
          <h3 className="text-xl font-black text-white mb-1">Fim da Sequência!</h3>
          <p className="text-xs text-slate-300 mb-4">
            <strong>{rightItem.char.name}</strong> ({rightItem.subLabel}:{' '}
            <strong className="text-amber-300">{rightItem.displayValue}</strong>) contra{' '}
            <strong className="text-sky-300">{leftItem.displayValue}</strong> de <strong>{leftItem.char.name}</strong>.
          </p>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="px-4 py-2 rounded-2xl bg-[#0a101f] border border-[#1e2b45]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Sua Sequência</span>
              <span className="text-lg font-black text-orange-400">🔥 {streak}</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-[#0a101f] border border-[#1e2b45]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Recorde Pessoal</span>
              <span className="text-lg font-black text-amber-400">🏆 {bestStreak}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
          >
            <RotateCcw size={15} />
            <span>Jogar Novamente</span>
          </button>
        </div>
      )}
    </div>
  );

  if (inline) {
    return <div className="my-6">{contentCard}</div>;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {contentCard}
    </div>
  );
};

