import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Character } from '../types/anime';
import { CharacterSearchInput } from './CharacterSearchInput';
import { ObfuscatedMysteryAvatar } from './ObfuscatedMysteryAvatar';
import { Timer, Zap, Trophy, FastForward, Play, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import { awardAnimeXp } from '../utils/featuresManager';

interface SpeedrunArenaProps {
  characters: Character[];
  animeSlug: string;
  animeTitle: string;
  themeColor: string;
  onExitSpeedrun?: () => void;
}

export const SpeedrunArena: React.FC<SpeedrunArenaProps> = ({
  characters,
  animeSlug,
  animeTitle,
  themeColor,
}) => {
  const bestKey = `animedle_speedrun_best_${animeSlug}`;
  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem(bestKey) || '0', 10) || 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      setBestScore(parseInt(localStorage.getItem(bestKey) || '0', 10) || 0);
    } catch {
      setBestScore(0);
    }
  }, [bestKey]);

  const [phase, setPhase] = useState<'ready' | 'running' | 'finished'>('ready');
  const [timeLeftMs, setTimeLeftMs] = useState<number>(60000);
  const [score, setScore] = useState<number>(0);
  const [solvedChars, setSolvedChars] = useState<Character[]>([]);
  const [wrongGuessIds, setWrongGuessIds] = useState<string[]>([]);
  const [charElapsedSec, setCharElapsedSec] = useState<number>(0);
  const [bonusBanner, setBonusBanner] = useState<string | null>(null);

  // Embaralha os personagens para a run atual
  const [deck, setDeck] = useState<Character[]>([]);
  const [deckIdx, setDeckIdx] = useState<number>(0);

  const lastTickRef = useRef<number>(Date.now());
  const charStartRef = useRef<number>(Date.now());

  const buildShuffledDeck = () => {
    const arr = [...characters];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const handleStart = () => {
    const newDeck = buildShuffledDeck();
    setDeck(newDeck);
    setDeckIdx(0);
    setScore(0);
    setSolvedChars([]);
    setWrongGuessIds([]);
    setTimeLeftMs(60000);
    setCharElapsedSec(0);
    setBonusBanner(null);
    lastTickRef.current = Date.now();
    charStartRef.current = Date.now();
    setPhase('running');
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('animedle_focus_search_input'));
    }, 80);
  };

  // Loop de alta precisão do cronômetro (atualiza a cada 100ms)
  useEffect(() => {
    if (phase !== 'running') return;

    lastTickRef.current = Date.now();
    const interval = window.setInterval(() => {
      const now = Date.now();
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;

      setCharElapsedSec(Math.floor((now - charStartRef.current) / 1000));

      setTimeLeftMs((prev) => {
        const next = prev - delta;
        if (next <= 0) {
          setPhase('finished');
          return 0;
        }
        return next;
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, [phase]);

  const currentTarget = useMemo(() => {
    if (deck.length === 0) return characters[0];
    return deck[deckIdx % deck.length];
  }, [deck, deckIdx, characters]);

  // N5 Opção A: Foto borrada que vai limpando sozinha a cada 2 segundos + dicas rápidas progressivas
  const stage = Math.min(4, Math.floor(charElapsedSec / 2) + wrongGuessIds.length);
  const blurLevels = [18, 13, 8, 3, 0];
  const currentBlur = blurLevels[Math.min(4, stage)];

  const advanceToNextTarget = () => {
    setDeckIdx((prev) => prev + 1);
    setWrongGuessIds([]);
    charStartRef.current = Date.now();
    setCharElapsedSec(0);
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('animedle_focus_search_input'));
    }, 50);
  };

  const handleGuessCharacter = (guessed: Character) => {
    if (phase !== 'running' || !currentTarget) return;

    if (guessed.id === currentTarget.id) {
      const nextScore = score + 1;
      setScore(nextScore);
      setSolvedChars((prev) => [...prev, currentTarget]);
      setTimeLeftMs((prev) => Math.min(90000, prev + 5000)); // +5s de bônus
      setBonusBanner('+5.0s! ⚡');
      window.setTimeout(() => setBonusBanner(null), 1100);

      // S3: Recompensa com +15 XP de Maestria por acerto no Speedrun
      awardAnimeXp(animeSlug, 15);

      if (nextScore > bestScore) {
        setBestScore(nextScore);
        try {
          localStorage.setItem(bestKey, String(nextScore));
        } catch {}
      }

      advanceToNextTarget();
    } else {
      setWrongGuessIds((prev) => [...prev, guessed.id]);
      setTimeLeftMs((prev) => Math.max(0, prev - 2000)); // -2s por erro
      setBonusBanner('-2.0s ❌');
      window.setTimeout(() => setBonusBanner(null), 900);
    }
  };

  const handleSkip = () => {
    if (phase !== 'running') return;
    setTimeLeftMs((prev) => Math.max(0, prev - 4000));
    setBonusBanner('Pulou (-4.0s)');
    window.setTimeout(() => setBonusBanner(null), 900);
    advanceToNextTarget();
  };

  const secondsDisplay = (timeLeftMs / 1000).toFixed(1);
  const pctLeft = Math.min(100, Math.max(0, (timeLeftMs / 60000) * 100));

  const affiliationText = currentTarget
    ? Array.isArray(currentTarget.affiliation)
      ? currentTarget.affiliation.join(', ')
      : currentTarget.affiliation || 'Independente'
    : '';

  const powerText = currentTarget
    ? currentTarget.styleOrPower && currentTarget.styleOrPower !== 'Nenhum'
      ? currentTarget.styleOrPower
      : currentTarget.combatType || 'Combate Direto'
    : '';

  return (
    <div className="max-w-2xl mx-auto my-6 p-5 sm:p-6 bg-[#0b1120] border border-[#22304d] rounded-3xl shadow-2xl relative overflow-hidden animate-fadeIn">
      {/* Cabeçalho do Speedrun */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1e2b45]">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
            style={{ backgroundColor: themeColor }}
          >
            <Timer size={20} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>⚡ Speedrun — Contra o Relógio (60s)</span>
            </h3>
            <p className="text-xs text-slate-400">
              A foto clareia e novas dicas surgem a cada 2 segundos! Acerte para ganhar +5s!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black">
            <Zap size={14} className="text-emerald-400" />
            <span>Acertos: {score}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black">
            <Trophy size={14} className="text-amber-400" />
            <span>Recorde: {bestScore}</span>
          </div>
        </div>
      </div>

      {phase === 'ready' && (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
            <Timer size={32} />
          </div>
          <h4 className="text-xl font-black text-white">Pronto para o Desafio de 60 Segundos em {animeTitle}?</h4>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            A imagem do personagem começa borrada e se revela automaticamente a cada <strong>2 segundos</strong> junto com pistas de <strong>Espécie, Arco, Afiliação e Poder</strong>. Cada acerto concede <strong>+5s de bônus</strong> e <strong>+15 XP de Maestria</strong>!
          </p>
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Play size={18} className="fill-black" />
            <span>Iniciar Speedrun (60s)</span>
          </button>
        </div>
      )}

      {phase === 'running' && currentTarget && (
        <div className="space-y-5">
          {/* Barra de Cronômetro Digital */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-400" />
                <span>Estágio de Revelação: {Math.min(4, stage) + 1}/5</span>
              </span>
              <div className="flex items-center gap-2">
                {bonusBanner && (
                  <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black animate-bounce">
                    {bonusBanner}
                  </span>
                )}
                <span
                  className={`text-lg font-black tabular-nums ${
                    timeLeftMs <= 10000 ? 'text-rose-400 animate-pulse' : 'text-amber-400'
                  }`}
                >
                  ⏱️ {secondsDisplay}s
                </span>
              </div>
            </div>
            <div className="w-full h-2.5 bg-[#121c33] rounded-full overflow-hidden border border-[#223254]">
              <div
                className={`h-full transition-all duration-100 ${
                  timeLeftMs <= 10000
                    ? 'bg-gradient-to-r from-rose-600 to-red-400'
                    : 'bg-gradient-to-r from-emerald-500 via-amber-400 to-orange-500'
                }`}
                style={{ width: `${pctLeft}%` }}
              />
            </div>
          </div>

          {/* Arena Central: Foto com Desfoque Automático + Pistas Progressivas (2s em 2s) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#111a2e] border border-[#223252] rounded-2xl p-4">
            <div className="sm:col-span-5 flex flex-col items-center justify-center">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-amber-400/60 bg-[#0a1020] shadow-xl relative">
                <ObfuscatedMysteryAvatar
                  avatarUrl={currentTarget.avatar}
                  mode="wanted"
                  blurAmount={currentBlur}
                  isRevealed={currentBlur === 0}
                  className="w-full h-full"
                />
              </div>
              <span className="mt-2 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300">
                {currentBlur === 0 ? 'Nitidez: 100% Revelada' : `Borrão Automático: ${currentBlur}px`}
              </span>
            </div>

            <div className="sm:col-span-7 grid grid-cols-1 gap-2 text-left">
              <div className="p-2.5 rounded-xl bg-[#0b1222] border border-[#1e2c4a] flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400">1. Espécie / Gênero</span>
                <span className="text-xs font-extrabold text-white">
                  {currentTarget.species} • {currentTarget.gender}
                </span>
              </div>

              <div
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                  stage >= 1
                    ? 'bg-[#0b1222] border-sky-500/40 text-white'
                    : 'bg-[#090e1a]/60 border-[#182238] text-slate-600'
                }`}
              >
                <span className="text-[10px] font-black uppercase text-slate-400">2. Arco de Estreia (2s)</span>
                <span className="text-xs font-extrabold">
                  {stage >= 1 ? currentTarget.debutArc : 'Revela em instantes...'}
                </span>
              </div>

              <div
                className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                  stage >= 2
                    ? 'bg-[#0b1222] border-amber-500/40 text-amber-200'
                    : 'bg-[#090e1a]/60 border-[#182238] text-slate-600'
                }`}
              >
                <span className="text-[10px] font-black uppercase text-slate-400 shrink-0">3. Afiliação (4s)</span>
                <span className="text-xs font-extrabold truncate">
                  {stage >= 2 ? affiliationText : 'Revela em instantes...'}
                </span>
              </div>

              <div
                className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                  stage >= 3
                    ? 'bg-[#0b1222] border-purple-500/40 text-purple-200'
                    : 'bg-[#090e1a]/60 border-[#182238] text-slate-600'
                }`}
              >
                <span className="text-[10px] font-black uppercase text-slate-400 shrink-0">4. Poder / Combate (6s)</span>
                <span className="text-xs font-extrabold truncate">
                  {stage >= 3 ? powerText : 'Revela em instantes...'}
                </span>
              </div>

              {stage >= 4 && (
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-400/50 flex items-center justify-between text-emerald-300 animate-fadeIn">
                  <span className="text-[10px] font-black uppercase">5. Inicial do Nome (8s)</span>
                  <span className="text-xs font-black">
                    Começa com &ldquo;{currentTarget.name.charAt(0).toUpperCase()}&rdquo;
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Barra de Busca + Botão Pular */}
          <div className="space-y-2">
            <CharacterSearchInput
              characters={characters}
              guessedCharacterIds={wrongGuessIds}
              onSelectCharacter={handleGuessCharacter}
              themeColor={themeColor}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSkip}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600/60 text-slate-300 hover:text-white text-xs font-bold transition-all active:scale-95"
              >
                <FastForward size={13} />
                <span>Pular Personagem (-4s)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {phase === 'finished' && (
        <div className="text-center py-6 space-y-5 animate-fadeIn">
          <Trophy size={42} className="text-amber-400 mx-auto" />
          <div>
            <h4 className="text-2xl font-black text-white">Tempo Esgotado!</h4>
            <p className="text-xs text-slate-400 mt-1">
              O último personagem na tela era <strong className="text-amber-300">{currentTarget?.name}</strong>.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="px-5 py-3 rounded-2xl bg-[#111a2e] border border-[#223252]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Personagens Acertados</span>
              <span className="text-xl font-black text-emerald-400">⚡ {score}</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-[#111a2e] border border-[#223252]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Recorde em {animeTitle}</span>
              <span className="text-xl font-black text-amber-400">🏆 {bestScore}</span>
            </div>
          </div>

          {solvedChars.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-[#0e1629] border border-[#1d2b4a] text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                Personagens Identificados nesta Run ({solvedChars.length}):
              </span>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar">
                {solvedChars.map((c, idx) => (
                  <div
                    key={`${c.id}-${idx}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#15223d] border border-emerald-500/30 text-xs font-bold text-slate-200"
                  >
                    <img src={c.avatar} alt={c.name} className="w-4 h-4 rounded-full object-cover" />
                    <span>{c.name}</span>
                    <CheckCircle2 size={11} className="text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
          >
            <RotateCcw size={15} />
            <span>Jogar Speedrun Novamente</span>
          </button>
        </div>
      )}
    </div>
  );
};
