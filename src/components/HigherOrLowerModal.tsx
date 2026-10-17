import React, { useState, useMemo, useEffect } from 'react';
import { Character } from '../types/anime';
import { X, Flame, Trophy, ArrowUp, ArrowDown, RotateCcw, Swords, Coins, Clock, Zap } from 'lucide-react';

interface HigherOrLowerModalProps {
  characters: Character[];
  arcs: string[];
  animeSlug: string;
  animeTitle: string;
  themeColor: string;
  onClose: () => void;
}

type ComparisonMetric = 'bounty' | 'timeline' | 'power';

interface ScoredCharacter {
  char: Character;
  value: number;
  displayValue: string;
  subLabel: string;
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

function computePowerArsenalScore(c: Character): { score: number; label: string } {
  let score = 100;
  const techCount = Array.isArray(c.techniques) ? c.techniques.length : 0;
  score += techCount * 85;

  const roleStr = `${c.roleOrArchetype || ''} ${c.role || ''} ${c.archetype || ''}`.toLowerCase();
  if (roleStr.includes('protagonista') || roleStr.includes('vilão principal') || roleStr.includes('antagonista principal')) {
    score += 320;
  } else if (roleStr.includes('deuteragonista') || roleStr.includes('antagonista') || roleStr.includes('vilão') || roleStr.includes('mentor')) {
    score += 210;
  } else if (roleStr.includes('aliado') || roleStr.includes('coadjuvante')) {
    score += 110;
  }

  if (c.domainExpansion && !/^(nenhum|nenhuma|não possui)$/i.test(c.domainExpansion)) {
    score += 260;
  }
  if (Array.isArray(c.haki) && c.haki.length > 0) {
    score += c.haki.length * 120;
  }
  if (Array.isArray(c.natureTypes) && c.natureTypes.length > 0) {
    score += c.natureTypes.length * 55;
  }
  if (c.styleOrPower && !/^(nenhum|nenhuma|desconhecid[oa])$/i.test(c.styleOrPower)) {
    score += 90;
  }

  // Determinístico suave baseado no ID para evitar empates excessivos mantendo consistência
  let hash = 0;
  for (let i = 0; i < c.id.length; i++) {
    hash = (hash * 31 + c.id.charCodeAt(i)) % 45;
  }
  score += hash;

  return {
    score,
    label: `${score.toLocaleString('pt-BR')} pts`,
  };
}

export const HigherOrLowerModal: React.FC<HigherOrLowerModalProps> = ({
  characters,
  arcs,
  animeSlug,
  animeTitle,
  themeColor,
  onClose,
}) => {
  const hasBountyPool = useMemo(() => {
    if (animeSlug !== 'one-piece') return false;
    const valid = characters.filter((c) => parseBountyToNumber(c.bounty) !== null);
    return valid.length >= 8;
  }, [characters, animeSlug]);

  const [metric, setMetric] = useState<ComparisonMetric>(() => (hasBountyPool ? 'bounty' : 'timeline'));

  // Constrói o pool de personagens pontuados de acordo com a métrica ativa
  const pool = useMemo<ScoredCharacter[]>(() => {
    if (metric === 'bounty') {
      return characters
        .map((char) => {
          const val = parseBountyToNumber(char.bounty);
          if (val === null) return null;
          return {
            char,
            value: val,
            displayValue: formatBountyDisplay(val),
            subLabel: 'Recompensa Oficial',
          };
        })
        .filter((x): x is ScoredCharacter => x !== null);
    }

    if (metric === 'timeline') {
      return characters
        .map((char) => {
          const arcName = (char.debutArc || '').trim();
          const idx = arcs.findIndex((a) => a.toLowerCase() === arcName.toLowerCase());
          const resolvedIdx = idx >= 0 ? idx + 1 : null;
          if (resolvedIdx === null) return null;
          return {
            char,
            value: resolvedIdx,
            displayValue: `${resolvedIdx}º Arco`,
            subLabel: arcName,
          };
        })
        .filter((x): x is ScoredCharacter => x !== null);
    }

    // metric === 'power'
    return characters.map((char) => {
      const { score, label } = computePowerArsenalScore(char);
      return {
        char,
        value: score,
        displayValue: label,
        subLabel: char.styleOrPower || char.combatType || 'Índice de Arsenal & Poder',
      };
    });
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

  // Sorteia par inicial sempre que trocar de métrica ou reiniciar
  const pickRandomPair = (list: ScoredCharacter[]) => {
    if (list.length < 2) return [0, 0];
    const a = Math.floor(Math.random() * list.length);
    let b = Math.floor(Math.random() * list.length);
    let guard = 0;
    while ((b === a || list[b].value === list[a].value) && guard < 25) {
      b = Math.floor(Math.random() * list.length);
      guard++;
    }
    if (b === a) b = (a + 1) % list.length;
    return [a, b];
  };

  useEffect(() => {
    const [a, b] = pickRandomPair(pool);
    setLeftIdx(a);
    setRightIdx(b);
    setStreak(0);
    setRevealState('idle');
    setIsGameOver(false);
  }, [pool]);

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
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
        try {
          localStorage.setItem(bestKey, String(nextStreak));
        } catch {}
      }

      window.setTimeout(() => {
        const newLeft = rightIdx;
        let nextRight = Math.floor(Math.random() * pool.length);
        let guard = 0;
        while ((nextRight === newLeft || pool[nextRight].value === pool[newLeft].value) && guard < 25) {
          nextRight = Math.floor(Math.random() * pool.length);
          guard++;
        }
        if (nextRight === newLeft) nextRight = (newLeft + 1) % pool.length;
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

  const handleRestart = () => {
    const [a, b] = pickRandomPair(pool);
    setLeftIdx(a);
    setRightIdx(b);
    setStreak(0);
    setRevealState('idle');
    setIsGameOver(false);
  };

  if (!leftItem || !rightItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#0b1120] border border-[#22304d] rounded-3xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto custom-scrollbar"
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
                Minigame: Maior ou Menor ({animeTitle})
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
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Seletor de Categoria de Comparação */}
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
          <button
            type="button"
            onClick={() => setMetric('power')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all ${
              metric === 'power'
                ? 'bg-purple-500 text-white border-purple-400 shadow-lg'
                : 'bg-[#111a2e] text-slate-300 border-[#202d47] hover:text-white'
            }`}
          >
            <Zap size={14} />
            <span>⚔️ Poder & Arsenal</span>
          </button>
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

              <div className="px-4 py-2 rounded-2xl bg-[#0a101f] border border-amber-500/40 text-amber-300 font-black text-base sm:text-xl shadow-inner">
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
                    ? 'Em qual momento da obra estreou?'
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
                  className={`px-4 py-2 rounded-2xl font-black text-base sm:text-xl border animate-fadeIn ${
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
          /* Tela de Fim de Jogo do Minigame */
          <div className="p-6 rounded-3xl bg-[#111a2e] border border-[#223252] text-center">
            <Trophy size={40} className="text-amber-400 mx-auto mb-2" />
            <h3 className="text-xl font-black text-white mb-1">Fim da Sequência!</h3>
            <p className="text-xs text-slate-300 mb-4">
              <strong>{rightItem.char.name}</strong> tinha{' '}
              <strong className="text-amber-300">{rightItem.displayValue}</strong> ({rightItem.subLabel}), contra{' '}
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
    </div>
  );
};
