import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Character, GameMode, SceneChallenge } from '../types/anime';
import { ANIMES_CONFIG } from '../data/animes/config';
import { getSceneChallengesForAnime } from '../data/scenes/sceneChallenges';
import { CharacterSearchInput } from './CharacterSearchInput';
import { ObfuscatedMysteryAvatar } from './ObfuscatedMysteryAvatar';
import {
  Timer,
  Zap,
  Trophy,
  FastForward,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Eye,
  ZoomIn,
  Film,
  LayoutGrid,
  Puzzle,
  Flame,
} from 'lucide-react';
import { awardAnimeXp } from '../utils/featuresManager';

interface SpeedrunArenaProps {
  characters: Character[];
  targetPool?: Character[];
  animeSlug: string;
  animeTitle: string;
  themeColor: string;
  mode?: GameMode;
  exclusiveLabel?: string;
  onExitSpeedrun?: () => void;
}

function maskCharacterNameInText(text: string, charName: string): string {
  if (!text || !charName) return text;
  let result = text;
  const parts = charName
    .replace(/[()]/g, ' ')
    .split(/\s+/)
    .filter((p) => p.length >= 3 && !/^(dos|das|del|von|van|the|and|rei|dom|sir|don)$/i.test(p));
  for (const part of parts) {
    const escaped = part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(escaped, 'gi'), '???');
  }
  return result;
}

function getDeterministicZoomOrigin(charId: string): string {
  let h = 0;
  for (let i = 0; i < charId.length; i++) {
    h = (h * 31 + charId.charCodeAt(i)) >>> 0;
  }
  const xOptions = [32, 40, 50, 60, 68];
  const yOptions = [25, 32, 40, 48, 55];
  const x = xOptions[h % xOptions.length];
  const y = yOptions[(h >>> 3) % yOptions.length];
  return `${x}% ${y}%`;
}

export const SpeedrunArena: React.FC<SpeedrunArenaProps> = ({
  characters,
  targetPool,
  animeSlug,
  animeTitle,
  themeColor,
  mode = 'classic',
  exclusiveLabel,
}) => {
  const animeConfig = ANIMES_CONFIG[animeSlug];
  const sceneChallenges = useMemo<SceneChallenge[]>(
    () => (mode === 'scene' ? getSceneChallengesForAnime(animeSlug) : []),
    [animeSlug, mode]
  );

  // Pool efetivo de personagens para a modalidade selecionada
  const effectivePool = useMemo(() => {
    if (mode === 'scene' && sceneChallenges.length > 0) {
      const charMap = new Map(characters.map((c) => [c.id, c]));
      const sceneChars = sceneChallenges
        .map((sc) => charMap.get(sc.characterId))
        .filter((c): c is Character => Boolean(c));
      if (sceneChars.length > 0) return sceneChars;
    }
    return targetPool && targetPool.length > 0 ? targetPool : characters;
  }, [targetPool, characters, mode, sceneChallenges]);

  const bestKey = `animedle_speedrun_best_${animeSlug}_${mode}`;
  const legacyBestKey = `animedle_speedrun_best_${animeSlug}`;

  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      const val =
        parseInt(localStorage.getItem(bestKey) || '0', 10) ||
        parseInt(localStorage.getItem(legacyBestKey) || '0', 10) ||
        0;
      return val;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      const val =
        parseInt(localStorage.getItem(bestKey) || '0', 10) ||
        parseInt(localStorage.getItem(legacyBestKey) || '0', 10) ||
        0;
      setBestScore(val);
    } catch {
      setBestScore(0);
    }
  }, [bestKey, legacyBestKey]);

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
    const arr = [...effectivePool];
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

  // Loop de alta precisão do cronômetro (atualiza a cada 100ms, trava máxima em 60.0s)
  useEffect(() => {
    if (phase !== 'running') return;

    lastTickRef.current = Date.now();
    const interval = window.setInterval(() => {
      const now = Date.now();
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;

      setCharElapsedSec(Math.floor((now - charStartRef.current) / 1000));

      setTimeLeftMs((prev) => {
        const next = Math.min(60000, prev - delta);
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
    if (deck.length === 0) return effectivePool[0] || characters[0];
    return deck[deckIdx % deck.length];
  }, [deck, deckIdx, effectivePool, characters]);

  const currentScene = useMemo<SceneChallenge | null>(() => {
    if (mode !== 'scene' || !currentTarget || sceneChallenges.length === 0) return null;
    return sceneChallenges.find((sc) => sc.characterId === currentTarget.id) || sceneChallenges[deckIdx % sceneChallenges.length] || null;
  }, [mode, currentTarget, sceneChallenges, deckIdx]);

  // Estágio de revelação avança a cada 2 segundos ou a cada erro
  const stage = Math.min(4, Math.floor(charElapsedSec / 2) + wrongGuessIds.length);

  // Parâmetros visuais específicos por modo
  const wantedBlurLevels = [22, 15, 9, 4, 0];
  const currentBlur = wantedBlurLevels[Math.min(4, stage)];

  const zoomScaleLevels = [4.2, 3.2, 2.3, 1.6, 1.0];
  const currentZoomScale = zoomScaleLevels[Math.min(4, stage)];
  const zoomOrigin = useMemo(
    () => (currentTarget ? getDeterministicZoomOrigin(currentTarget.id) : '50% 35%'),
    [currentTarget]
  );

  const sceneBlurLevels = [16, 10, 5, 2, 0];
  const currentSceneBlur = sceneBlurLevels[Math.min(4, stage)];

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
      // Trava estrita: impossível ultrapassar 60.0 segundos (60000ms)
      setTimeLeftMs((prev) => Math.min(60000, prev + 5000));
      setBonusBanner('+5.0s! ⚡ (Máx 60s)');
      window.setTimeout(() => setBonusBanner(null), 1100);

      // S3: Recompensa com +15 XP de Maestria por acerto no Speedrun
      awardAnimeXp(animeSlug, 15);

      if (nextScore > bestScore) {
        setBestScore(nextScore);
        try {
          localStorage.setItem(bestKey, String(nextScore));
          localStorage.setItem(legacyBestKey, String(nextScore));
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

  const secondsDisplay = (Math.min(60000, timeLeftMs) / 1000).toFixed(1);
  const pctLeft = Math.min(100, Math.max(0, (timeLeftMs / 60000) * 100));

  const affiliationText = currentTarget
    ? Array.isArray(currentTarget.affiliation)
      ? currentTarget.affiliation.join(', ')
      : currentTarget.affiliation || 'Independente'
    : '';

  const powerText = currentTarget
    ? currentTarget.styleOrPower &&
      currentTarget.styleOrPower !== 'Nenhum' &&
      currentTarget.styleOrPower !== 'Nenhuma'
      ? maskCharacterNameInText(currentTarget.styleOrPower, currentTarget.name)
      : animeSlug === 'one-piece'
      ? `Sem Akuma no Mi (${currentTarget.combatType || 'Combate Direto'})`
      : currentTarget.combatType || 'Combate Direto'
    : '';

  // Atributos específicos configurados para o anime no Modo Clássico / Exclusivo
  const animeSpecificPairs = useMemo(() => {
    if (!currentTarget || !animeConfig?.columns) return [];
    const rawRecord = currentTarget as unknown as Record<string, unknown>;
    return animeConfig.columns
      .map((col) => {
        const val = rawRecord[col.key];
        if (val === undefined || val === null || val === '') return null;
        const formatted = Array.isArray(val) ? val.join(', ') : String(val);
        if (!formatted.trim()) return null;
        return {
          label: col.label,
          value: maskCharacterNameInText(formatted, currentTarget.name),
        };
      })
      .filter((item): item is { label: string; value: string } => Boolean(item));
  }, [currentTarget, animeConfig]);

  // Metadados visuais e textos adaptados ao modo ativo
  const modeMeta = useMemo(() => {
    switch (mode) {
      case 'wanted':
        return {
          title: '⚡ Speedrun — Modo Procurado (60s)',
          subtitle: 'O cartaz de procurado fica mais nítido a cada 2 segundos! Acerte para ganhar +5s (máx 60s)!',
          readyDesc:
            'O retrato no Cartaz de Procurado começa com desfoque pesado e vai ficando nítido automaticamente a cada 2 segundos junto com pistas de Recompensa/Status, Arco, Afiliação e Poder.',
          icon: <Eye size={20} />,
        };
      case 'zoom':
        return {
          title: '⚡ Speedrun — Modo Zoom (60s)',
          subtitle: 'A câmera afasta o super-zoom automaticamente a cada 2 segundos! Acerte para ganhar +5s!',
          readyDesc:
            'A imagem começa em Super Zoom (4.2×) focado em um detalhe do personagem e vai afastando sozinha a cada 2 segundos junto com pistas visuais e canônicas.',
          icon: <ZoomIn size={20} />,
        };
      case 'scene':
        return {
          title: '⚡ Speedrun — Modo Cena (60s)',
          subtitle: 'A cena em vídeo perde o desfoque a cada 2 segundos! Identifique quem executa a cena!',
          readyDesc:
            'Assista à cena do anime com desfoque que diminui automaticamente a cada 2 segundos, acompanhada do Arco da Cena, Afiliação e técnica executada.',
          icon: <Film size={20} />,
        };
      case 'ability':
        return {
          title: `⚡ Speedrun — Modo ${exclusiveLabel || 'Poder Exclusivo'} (60s)`,
          subtitle: 'Identifique o dono do poder/habilidade exclusiva antes do tempo acabar!',
          readyDesc: `O poder exclusivo (${exclusiveLabel || 'Habilidade'}) aparece em destaque desde o início e novas pistas canônicas destravam a cada 2 segundos!`,
          icon: <Zap size={20} />,
        };
      case 'grid':
        return {
          title: '⚡ Speedrun — Modo Grid (Cruzamento 60s)',
          subtitle: 'Descubra o personagem através do cruzamento de critérios da Grade!',
          readyDesc:
            'Analise os critérios cruzados (Linha × Coluna) que o personagem secreto preenche simultaneamente, com novos cruzamentos revelados a cada 2 segundos!',
          icon: <LayoutGrid size={20} />,
        };
      case 'connections':
        return {
          title: '⚡ Speedrun — Modo Conexões (Elos 60s)',
          subtitle: 'Descubra o personagem conectando os 4 elos canônicos revelados a cada 2 segundos!',
          readyDesc:
            'Veja os 4 elos temáticos (Amarelo, Verde, Azul e Roxo) que definem o personagem secreto e acerte o máximo possível antes do relógio zerar!',
          icon: <Puzzle size={20} />,
        };
      case 'higherlower':
        return {
          title: '⚡ Speedrun — Maior ou Menor (Dossiê 60s)',
          subtitle: 'Identifique o personagem pelo seu patamar de Recompensa / Estreia e pistas rápidas!',
          readyDesc:
            'Use os dados de Recompensa / Nível e Arco de Estreia do personagem combinados com dicas progressivas a cada 2 segundos!',
          icon: <Flame size={20} />,
        };
      case 'classic':
      default:
        return {
          title: '⚡ Speedrun — Modo Clássico (60s)',
          subtitle: 'Os atributos da tabela clássica do personagem destravam a cada 2 segundos! Acerte para ganhar +5s!',
          readyDesc:
            'A ficha de atributos clássicos do personagem (Espécie, Gênero, Arco de Estreia, Afiliação e Colunas Exclusivas da Obra) se revela a cada 2 segundos!',
          icon: <Sparkles size={20} />,
        };
    }
  }, [mode, exclusiveLabel, animeConfig]);

  // Renderizador de linha de dica SEM truncamento (...) — exibe 100% do texto
  const renderClueRow = (
    stepLabel: string,
    valueText: string,
    unlocked: boolean,
    accentBorderClass: string = 'border-sky-500/40',
    accentTextClass: string = 'text-white'
  ) => (
    <div
      className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3 transition-all ${
        unlocked
          ? `bg-[#0b1222] ${accentBorderClass} ${accentTextClass}`
          : 'bg-[#090e1a]/60 border-[#182238] text-slate-600'
      }`}
    >
      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0">
        {stepLabel}
      </span>
      <span className="text-xs font-extrabold break-words whitespace-normal sm:text-right leading-relaxed">
        {unlocked ? valueText : 'Revela em instantes...'}
      </span>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto my-6 p-5 sm:p-6 bg-[#0b1120] border border-[#22304d] rounded-3xl shadow-2xl relative overflow-hidden animate-fadeIn">
      {/* Cabeçalho do Speedrun adaptado ao modo */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1e2b45]">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
            style={{ backgroundColor: themeColor }}
          >
            {modeMeta.icon}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>{modeMeta.title}</span>
            </h3>
            <p className="text-xs text-slate-400">{modeMeta.subtitle}</p>
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
          <div
            className="w-16 h-16 rounded-3xl border flex items-center justify-center mx-auto shadow-lg"
            style={{
              backgroundColor: `${themeColor}20`,
              borderColor: `${themeColor}60`,
              color: themeColor,
            }}
          >
            <Timer size={32} />
          </div>
          <h4 className="text-xl font-black text-white">
            Pronto para o Speedrun de 60s em {animeTitle}?
          </h4>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            {modeMeta.readyDesc} Cada acerto concede <strong>+5s de bônus (limite máximo de 60s)</strong> e{' '}
            <strong>+15 XP de Maestria</strong>!
          </p>
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white font-black text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all"
            style={{ backgroundColor: themeColor }}
          >
            <Play size={18} className="fill-white" />
            <span>Iniciar Speedrun (60s)</span>
          </button>
        </div>
      )}

      {phase === 'running' && currentTarget && (
        <div className="space-y-5">
          {/* Barra de Cronômetro Digital (Trava estrita em 60.0s) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={13} style={{ color: themeColor }} />
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

          {/* ================================================================
              LAYOUT 1: MODO CLÁSSICO (FICHA CANÔNICA COMPLETA SEM CORTES)
             ================================================================ */}
          {mode === 'classic' && (
            <div className="bg-[#111a2e] border border-[#223252] rounded-2xl p-4 space-y-2.5 text-left">
              <div className="flex items-center justify-between border-b border-[#1e2c4a] pb-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles size={14} /> Ficha de Atributos Clássicos ({animeTitle})
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  Destrava a cada 2s
                </span>
              </div>

              {renderClueRow(
                '1. Espécie / Gênero / Status (0s)',
                `${currentTarget.species} • ${currentTarget.gender} • Status: ${currentTarget.status}`,
                true,
                'border-emerald-500/40',
                'text-white'
              )}

              {renderClueRow(
                '2. Arco de Estreia (2s)',
                currentTarget.debutArc || 'Arco Inicial',
                stage >= 1,
                'border-sky-500/40',
                'text-sky-100'
              )}

              {renderClueRow(
                '3. Afiliação / Grupo (4s)',
                affiliationText,
                stage >= 2,
                'border-amber-500/40',
                'text-amber-200'
              )}

              {renderClueRow(
                '4. Atributos da Obra & Poder (6s)',
                animeSpecificPairs.length > 0
                  ? `${animeSpecificPairs.map((p) => `${p.label}: ${p.value}`).join(' • ')} • Poder: ${powerText}`
                  : powerText,
                stage >= 3,
                'border-purple-500/40',
                'text-purple-200'
              )}

              {stage >= 4 && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-300 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-400/60 shrink-0 bg-[#090e1a]">
                      <ObfuscatedMysteryAvatar
                        avatarUrl={currentTarget.avatar}
                        mode="wanted"
                        blurAmount={6}
                        isRevealed={false}
                        className="w-full h-full"
                      />
                    </div>
                    <span className="text-[11px] font-black uppercase">5. Dica Final + Retrato (8s)</span>
                  </div>
                  <span className="text-xs font-black break-words whitespace-normal">
                    Inicial do Nome: &ldquo;{currentTarget.name.charAt(0).toUpperCase()}&rdquo; • Cabelo:{' '}
                    {currentTarget.hairColor || 'Canônico'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* ================================================================
              LAYOUT 2: MODO PROCURADO (CARTAZ WANTED + DESFOQUE PROGRESSIVO)
             ================================================================ */}
          {mode === 'wanted' && (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#111a2e] border border-[#223252] rounded-2xl p-4">
              <div className="sm:col-span-5 flex flex-col items-center justify-center">
                <div className="w-44 p-3 rounded-2xl bg-gradient-to-b from-[#d8b888] via-[#c7a26b] to-[#a9824c] border-2 border-[#7b5828] shadow-2xl text-center">
                  <span className="block text-[13px] font-serif font-black tracking-[0.22em] text-[#2b1a08] uppercase mb-1">
                    WANTED
                  </span>
                  <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-[#3e270f] bg-[#0a1020] relative">
                    <ObfuscatedMysteryAvatar
                      avatarUrl={currentTarget.avatar}
                      mode="wanted"
                      blurAmount={currentBlur}
                      isRevealed={currentBlur === 0}
                      className="w-full h-full"
                    />
                  </div>
                  <span className="block text-[9px] font-serif font-extrabold tracking-widest text-[#2b1a08] uppercase mt-1.5">
                    DEAD OR ALIVE
                  </span>
                </div>
                <span className="mt-2 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-amber-300">
                  {currentBlur === 0 ? 'Cartaz 100% Nítido' : `Desfoque do Cartaz: ${currentBlur}px`}
                </span>
              </div>

              <div className="sm:col-span-7 grid grid-cols-1 gap-2 text-left">
                {renderClueRow(
                  '1. Espécie / Gênero / Status (0s)',
                  `${currentTarget.species} • ${currentTarget.gender} (${currentTarget.status})`,
                  true,
                  'border-amber-500/40',
                  'text-white'
                )}
                {renderClueRow(
                  '2. Arco de Estreia (2s)',
                  currentTarget.debutArc || 'Arco Inicial',
                  stage >= 1,
                  'border-sky-500/40',
                  'text-white'
                )}
                {renderClueRow(
                  '3. Afiliação / Bando (4s)',
                  affiliationText,
                  stage >= 2,
                  'border-amber-500/40',
                  'text-amber-200'
                )}
                {renderClueRow(
                  '4. Poder / Combate (6s)',
                  powerText,
                  stage >= 3,
                  'border-purple-500/40',
                  'text-purple-200'
                )}
                {stage >= 4 &&
                  renderClueRow(
                    '5. Inicial do Nome (8s)',
                    `Começa com "${currentTarget.name.charAt(0).toUpperCase()}"`,
                    true,
                    'border-emerald-400/50',
                    'text-emerald-300'
                  )}
              </div>
            </div>
          )}

          {/* ================================================================
              LAYOUT 3: MODO ZOOM (SUPER ZOOM QUE AFASTA A CADA 2 SEGUNDOS)
             ================================================================ */}
          {mode === 'zoom' && (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#111a2e] border border-[#223252] rounded-2xl p-4">
              <div className="sm:col-span-5 flex flex-col items-center justify-center">
                <div
                  className="w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 bg-[#0a1020] shadow-xl relative"
                  style={{ borderColor: themeColor }}
                >
                  <ObfuscatedMysteryAvatar
                    avatarUrl={currentTarget.avatar}
                    mode="zoom"
                    zoomScale={currentZoomScale}
                    isRevealed={currentZoomScale <= 1.05}
                    className="w-full h-full"
                  />
                </div>
                <span className="mt-2 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-sky-300">
                  {currentZoomScale <= 1.05
                    ? 'Zoom: 1.0× (Imagem Completa)'
                    : `Super Zoom Atual: ${currentZoomScale.toFixed(1)}×`}
                </span>
              </div>

              <div className="sm:col-span-7 grid grid-cols-1 gap-2 text-left">
                {renderClueRow(
                  '1. Detalhe Visual & Espécie (0s)',
                  `${currentTarget.hairColor || 'Visual Canônico'} • ${currentTarget.species} (${currentTarget.gender})`,
                  true,
                  'border-sky-500/40',
                  'text-white'
                )}
                {renderClueRow(
                  '2. Arco de Estreia (2s)',
                  currentTarget.debutArc || 'Arco Inicial',
                  stage >= 1,
                  'border-sky-500/40',
                  'text-white'
                )}
                {renderClueRow(
                  '3. Afiliação (4s)',
                  affiliationText,
                  stage >= 2,
                  'border-amber-500/40',
                  'text-amber-200'
                )}
                {renderClueRow(
                  '4. Poder / Combate (6s)',
                  powerText,
                  stage >= 3,
                  'border-purple-500/40',
                  'text-purple-200'
                )}
                {stage >= 4 &&
                  renderClueRow(
                    '5. Inicial do Nome (8s)',
                    `Começa com "${currentTarget.name.charAt(0).toUpperCase()}"`,
                    true,
                    'border-emerald-400/50',
                    'text-emerald-300'
                  )}
              </div>
            </div>
          )}

          {/* ================================================================
              LAYOUT 4: MODO CENA (VÍDEO DA CENA COM DESFOQUE PROGRESSIVO)
             ================================================================ */}
          {mode === 'scene' && (
            <div className="bg-[#111a2e] border border-[#223252] rounded-2xl p-4 space-y-3 text-left">
              {currentScene ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-[#263859] bg-black shadow-xl">
                  <video
                    key={currentScene.id}
                    src={currentScene.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{
                      filter: `blur(${currentSceneBlur}px) ${stage < 2 ? 'grayscale(45%)' : 'grayscale(0%)'}`,
                      transform: currentSceneBlur > 0 ? 'scale(1.06)' : 'scale(1)',
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 border border-white/15 text-[10px] font-black uppercase text-amber-300">
                    {currentSceneBlur === 0 ? 'Cena 100% Nítida' : `Desfoque da Cena: ${currentSceneBlur}px`}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center py-2">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#090e1a]">
                    <ObfuscatedMysteryAvatar
                      avatarUrl={currentTarget.avatar}
                      mode="wanted"
                      blurAmount={currentBlur}
                      isRevealed={currentBlur === 0}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-2">
                {renderClueRow(
                  '1. Arco de Estreia & Contexto (0s)',
                  currentTarget.debutArc || 'Arco Canônico',
                  true,
                  'border-sky-500/40',
                  'text-white'
                )}
                {renderClueRow(
                  '2. Espécie & Gênero (2s)',
                  `${currentTarget.species} • ${currentTarget.gender}`,
                  stage >= 1,
                  'border-emerald-500/40',
                  'text-white'
                )}
                {renderClueRow(
                  '3. Afiliação (4s)',
                  affiliationText,
                  stage >= 2,
                  'border-amber-500/40',
                  'text-amber-200'
                )}
                {renderClueRow(
                  '4. Técnica / Descrição da Cena (6s)',
                  currentScene?.description
                    ? maskCharacterNameInText(currentScene.description, currentTarget.name)
                    : powerText,
                  stage >= 3,
                  'border-purple-500/40',
                  'text-purple-200'
                )}
                {stage >= 4 &&
                  renderClueRow(
                    '5. Inicial do Nome (8s)',
                    `Começa com "${currentTarget.name.charAt(0).toUpperCase()}"`,
                    true,
                    'border-emerald-400/50',
                    'text-emerald-300'
                  )}
              </div>
            </div>
          )}

          {/* ================================================================
              LAYOUT 5: MODO EXCLUSIVO / HABILIDADE (AKUMA NO MI, JUTSU, ETC.)
             ================================================================ */}
          {mode === 'ability' && (
            <div className="bg-[#111a2e] border border-[#223252] rounded-2xl p-4 space-y-3 text-left">
              <div
                className="p-4 rounded-2xl bg-[#090f1d] border-2 shadow-lg"
                style={{ borderColor: `${themeColor}80` }}
              >
                <span
                  className="text-[10px] font-black uppercase tracking-widest block mb-1"
                  style={{ color: themeColor }}
                >
                  ⚡ {exclusiveLabel || 'Poder / Habilidade Exclusiva'} Misteriosa
                </span>
                <p className="text-sm sm:text-base font-black text-white break-words whitespace-normal leading-relaxed">
                  {powerText}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {renderClueRow(
                  '1. Classificação & Estilo de Combate (0s)',
                  [
                    currentTarget.fruitType && currentTarget.fruitType !== 'Nenhum'
                      ? `Tipo: ${currentTarget.fruitType}`
                      : null,
                    currentTarget.combatType ? `Combate: ${currentTarget.combatType}` : null,
                    `Espécie: ${currentTarget.species}`,
                  ]
                    .filter(Boolean)
                    .join(' • '),
                  true,
                  'border-amber-500/40',
                  'text-white'
                )}
                {renderClueRow(
                  '2. Arco de Estreia (2s)',
                  currentTarget.debutArc || 'Arco Inicial',
                  stage >= 1,
                  'border-sky-500/40',
                  'text-white'
                )}
                {renderClueRow(
                  '3. Afiliação / Organização (4s)',
                  affiliationText,
                  stage >= 2,
                  'border-amber-500/40',
                  'text-amber-200'
                )}
                {renderClueRow(
                  '4. Detalhes Extras da Obra (6s)',
                  animeSpecificPairs.length > 0
                    ? animeSpecificPairs.map((p) => `${p.label}: ${p.value}`).join(' • ')
                    : `${currentTarget.gender} • Status: ${currentTarget.status}`,
                  stage >= 3,
                  'border-purple-500/40',
                  'text-purple-200'
                )}
                {stage >= 4 && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/50 flex items-center justify-between gap-3 text-emerald-300 animate-fadeIn">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-emerald-400 shrink-0">
                        <ObfuscatedMysteryAvatar
                          avatarUrl={currentTarget.avatar}
                          mode="wanted"
                          blurAmount={4}
                          isRevealed={false}
                          className="w-full h-full"
                        />
                      </div>
                      <span className="text-[10px] font-black uppercase">5. Retrato & Inicial (8s)</span>
                    </div>
                    <span className="text-xs font-black">
                      Começa com &ldquo;{currentTarget.name.charAt(0).toUpperCase()}&rdquo;
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================
              LAYOUT 6: MODOS GRID, CONEXÕES, MAIOR/MENOR E VOZ
             ================================================================ */}
          {!['classic', 'wanted', 'zoom', 'scene', 'ability'].includes(mode) && (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#111a2e] border border-[#223252] rounded-2xl p-4">
              <div className="sm:col-span-4 flex flex-col items-center justify-center">
                <div
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 bg-[#0a1020] shadow-xl relative"
                  style={{ borderColor: themeColor }}
                >
                  <ObfuscatedMysteryAvatar
                    avatarUrl={currentTarget.avatar}
                    mode="wanted"
                    blurAmount={currentBlur}
                    isRevealed={currentBlur === 0}
                    className="w-full h-full"
                  />
                </div>
                <span className="mt-2 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300">
                  {mode === 'grid'
                    ? 'Alvo da Grade'
                    : mode === 'connections'
                    ? 'Elo Misterioso'
                    : 'Dossiê Rápido'}
                </span>
              </div>

              <div className="sm:col-span-8 grid grid-cols-1 gap-2 text-left">
                {renderClueRow(
                  mode === 'grid'
                    ? '1. Critério Linha 1 — Espécie & Gênero (0s)'
                    : mode === 'connections'
                    ? '🟨 Elo 1 — Espécie & Status (0s)'
                    : '1. Espécie / Gênero / Status (0s)',
                  `${currentTarget.species} • ${currentTarget.gender} • ${currentTarget.status}`,
                  true,
                  'border-amber-500/40',
                  'text-white'
                )}
                {renderClueRow(
                  mode === 'grid'
                    ? '2. Critério Coluna 1 — Arco de Estreia (2s)'
                    : mode === 'connections'
                    ? '🟩 Elo 2 — Arco de Estreia (2s)'
                    : '2. Arco de Estreia (2s)',
                  currentTarget.debutArc || 'Arco Inicial',
                  stage >= 1,
                  'border-emerald-500/40',
                  'text-emerald-200'
                )}
                {renderClueRow(
                  mode === 'grid'
                    ? '3. Critério Linha 2 — Afiliação (4s)'
                    : mode === 'connections'
                    ? '🟦 Elo 3 — Afiliação / Grupo (4s)'
                    : '3. Afiliação (4s)',
                  affiliationText,
                  stage >= 2,
                  'border-sky-500/40',
                  'text-sky-200'
                )}
                {renderClueRow(
                  mode === 'grid'
                    ? '4. Critério Coluna 2 — Combate & Poder (6s)'
                    : mode === 'connections'
                    ? '🟪 Elo 4 — Combate, Poder & Visual (6s)'
                    : '4. Poder & Estilo de Combate (6s)',
                  `${powerText}${currentTarget.hairColor ? ` • ${currentTarget.hairColor}` : ''}`,
                  stage >= 3,
                  'border-purple-500/40',
                  'text-purple-200'
                )}
                {stage >= 4 &&
                  renderClueRow(
                    '5. Inicial do Nome (8s)',
                    `Começa com "${currentTarget.name.charAt(0).toUpperCase()}"`,
                    true,
                    'border-emerald-400/50',
                    'text-emerald-300'
                  )}
              </div>
            </div>
          )}

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
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Recorde ({animeTitle})</span>
              <span className="text-xl font-black text-amber-400">🏆 {bestScore}</span>
            </div>
          </div>

          {solvedChars.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-[#0e1629] border border-[#1d2b4a] text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                Personagens Identificados nesta Run ({solvedChars.length}):
              </span>
              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto custom-scrollbar">
                {solvedChars.map((c, idx) => (
                  <div
                    key={`${c.id}-${idx}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#15223d] border border-emerald-500/30 text-xs font-bold text-slate-200"
                  >
                    <img src={c.avatar} alt={c.name} className="w-4 h-4 rounded-full object-cover" />
                    <span className="break-words whitespace-normal">{c.name}</span>
                    <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
            style={{ backgroundColor: themeColor }}
          >
            <RotateCcw size={15} />
            <span>Jogar Speedrun Novamente</span>
          </button>
        </div>
      )}
    </div>
  );
};
