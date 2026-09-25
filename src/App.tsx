import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { GameModeTabs } from './components/GameModeTabs';
import { CharacterSearchInput } from './components/CharacterSearchInput';
import { ClassicGrid } from './components/ClassicGrid';
import { SimpleGuessList } from './components/SimpleGuessList';
import { VictoryModal } from './components/VictoryModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { StatsModal } from './components/StatsModal';
import { HintBox } from './components/HintBox';

import { ANIMES_CONFIG } from './data/animes/config';
import demonSlayerCharacters from './data/animes/demon-slayer/characters.json';
import jujutsuKaisenCharacters from './data/animes/jujutsu-kaisen/characters.json';
import onePieceCharacters from './data/animes/one-piece/characters.json';
import narutoCharacters from './data/animes/naruto/characters.json';
import soloLevelingCharacters from './data/animes/solo-leveling/characters.json';
import recordOfRagnarokCharacters from './data/animes/record-of-ragnarok/characters.json';
import blueLockCharacters from './data/animes/blue-lock/characters.json';
import { Character, GameMode, GuessResult, GameStats } from './types/anime';
import { getDailyCharacterIndex, evaluateGuess } from './utils/dailySeed';
import { Sparkles, Eye, MessageSquare, Zap, ZoomIn, Infinity as InfinityIcon, RefreshCw, Flame } from 'lucide-react';

export const App: React.FC = () => {
  const [currentAnimeSlug, setCurrentAnimeSlug] = useState<string>('demon-slayer');
  const [currentMode, setCurrentMode] = useState<GameMode>('classic');

  // Seleciona dinamicamente a lista de personagens com base no anime selecionado e ordena em ordem alfabética (A-Z)
  const rawCharacters = (currentAnimeSlug === 'jujutsu-kaisen'
    ? jujutsuKaisenCharacters
    : currentAnimeSlug === 'one-piece'
    ? onePieceCharacters
    : currentAnimeSlug === 'naruto'
    ? narutoCharacters
    : currentAnimeSlug === 'solo-leveling'
    ? soloLevelingCharacters
    : currentAnimeSlug === 'record-of-ragnarok'
    ? recordOfRagnarokCharacters
    : currentAnimeSlug === 'blue-lock'
    ? blueLockCharacters
    : demonSlayerCharacters) as Character[];

  const characters = React.useMemo(() => {
    return [...rawCharacters].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [rawCharacters]);

  const animeConfig = ANIMES_CONFIG[currentAnimeSlug] || ANIMES_CONFIG['demon-slayer'];

  // Troca de anime garantindo fechamento de modal de vitória anterior
  const handleSelectAnime = (newAnimeSlug: string) => {
    setCurrentAnimeSlug(newAnimeSlug);
    if (newAnimeSlug === 'solo-leveling' && (currentMode === 'quote' || currentMode === 'ability')) {
      setCurrentMode('classic');
    }
    setShowVictoryModal(false);
  };

  // Troca de modo de jogo garantindo fechamento de modal de vitória do modo anterior
  const handleSelectMode = (newMode: GameMode) => {
    setCurrentMode(newMode);
    setShowVictoryModal(false);
  };

  // Dev Offset Shift Map para trocar de resposta ao clicar no Resetar(dev)
  const [devOffsets, setDevOffsets] = useState<Record<GameMode, number>>({
    classic: 0,
    wanted: 0,
    quote: 0,
    ability: 0,
    zoom: 0,
    endless: 0,
  });

  // Modo Treino (Infinito): Personagem Aleatório e Contador de Sequência
  const [endlessTargetIndex, setEndlessTargetIndex] = useState<number>(() =>
    Math.floor(Math.random() * characters.length)
  );
  const [endlessStreak, setEndlessStreak] = useState<number>(0);

  // Gera a lista de habilidades/domínios para o modo Habilidade (cada técnica e expansão de domínio é um desafio 100% individual)
  const abilityPool = React.useMemo(() => {
    const items: {
      id: string;
      character: Character;
      abilityType: 'technique' | 'domain';
      title: string;
      text: string;
    }[] = [];

    if (currentAnimeSlug === 'one-piece') {
      characters.forEach((c) => {
        const hasFruit =
          c.fruitType &&
          c.fruitType !== 'Nenhuma' &&
          c.fruitType !== 'Nenhum' &&
          c.styleOrPower &&
          c.styleOrPower !== 'Nenhum' &&
          c.styleOrPower !== 'Nenhuma';

        if (hasFruit) {
          let fruitName = c.styleOrPower;
          const match = c.styleOrPower.match(/\(([^)]+)\)/);
          if (match) {
            fruitName = match[1];
          }
          items.push({
            id: `${c.id}-fruit`,
            character: c,
            abilityType: 'technique',
            title: 'Akuma no Mi (Fruta)',
            text: fruitName,
          });
        }
      });
      return items;
    }

    if (currentAnimeSlug === 'naruto') {
      characters.forEach((c) => {
        if (c.styleOrPower && c.styleOrPower !== 'Nenhuma' && c.styleOrPower !== 'Nenhum') {
          items.push({
            id: `${c.id}-jutsu`,
            character: c,
            abilityType: 'technique',
            title: 'Jutsu / Técnica',
            text: c.styleOrPower,
          });
        }
      });
      return items;
    }

    if (currentAnimeSlug === 'demon-slayer') {
      characters.forEach((c) => {
        const hasValidStyle =
          c.styleOrPower &&
          c.styleOrPower !== 'Nenhum' &&
          c.styleOrPower !== 'Nenhuma' &&
          !c.styleOrPower.includes('Sem Técnica') &&
          !c.styleOrPower.includes('Sem Akuma');

        if (!hasValidStyle) return;

        const isKekkijutsu = c.styleOrPower.includes('Kekkijutsu');
        const techList = (c.techniques && c.techniques.length > 0) ? c.techniques : [c.styleOrPower];

        techList.forEach((tech, idx) => {
          let cleanText = tech;
          cleanText = cleanText.replace(/^(?:Primeira|Segunda|Terceira|Quarta|Quinta|Sexta|Sétima|Oitava|Nona|Décima|\d+ª|\w+)\s+(?:Forma|Presa|Dança)\s*[\:\-]?\s*/i, '');
          cleanText = cleanText.replace(/^Respiração [^\-\:]+(?:(?:\s*-\s*|\s*:\s*)[^\:\-]+\s*(?:Forma|Presa|Dança)[^\:\-]*\s*\:\s*|\s*:\s*|\s*-\s*)/i, '');
          cleanText = cleanText.replace(/^Respiração [^\:\-\(\)]+:\s*/i, '');
          cleanText = cleanText.replace(/^Respiração [^\:\-\(\)]+\s*\(([^)]+)\)/i, '$1');
          cleanText = cleanText.replace(/^Kekkijutsu\s*[\:\-]\s*/i, '');
          cleanText = cleanText.replace(/^(?:Respiração|Kekkijutsu|Forma|Arte Demoníaca)\s*[\:\-]?\s*/i, '');
          cleanText = cleanText.trim();

          if (cleanText && cleanText !== 'Nenhum' && cleanText !== 'Nenhuma') {
            items.push({
              id: `${c.id}-ds-technique-${idx}`,
              character: c,
              abilityType: 'technique',
              title: isKekkijutsu ? 'Kekkijutsu (Arte Demoníaca)' : 'Forma de Respiração / Técnica',
              text: cleanText,
            });
          }
        });
      });
      return items;
    }

    const isValidPower = (val?: string) => {
      if (!val) return false;
      const t = val.trim();
      if (t === '' || t === 'Nenhum' || t === 'Nenhuma') return false;
      if (t.includes('Sem Técnica') || t.includes('Sem Akuma')) return false;
      return true;
    };

    characters.forEach((c) => {
      // 1. Desafio de Habilidade / Técnica
      const validPower = isValidPower(c.styleOrPower) ? c.styleOrPower : (isValidPower(c.ability) ? c.ability : null);

      if (validPower) {
        const badgeTitle =
          currentAnimeSlug === 'jujutsu-kaisen'
            ? 'Técnica Inata / Habilidade'
            : currentAnimeSlug === 'demon-slayer'
            ? 'Respiração / Arte Demoníaca'
            : 'Habilidade';

        items.push({
          id: `${c.id}-technique`,
          character: c,
          abilityType: 'technique',
          title: badgeTitle,
          text: validPower,
        });
      }

      // 2. Desafio de Expansão de Domínio (Totalmente separado e desconexo da técnica base)
      if (c.domainExpansion && c.domainExpansion.trim() !== '' && c.domainExpansion !== 'Nenhum' && c.domainExpansion !== 'Nenhuma') {
        items.push({
          id: `${c.id}-domain`,
          character: c,
          abilityType: 'domain',
          title: 'Expansão de Domínio',
          text: c.domainExpansion,
        });
      }
    });

    return items;
  }, [characters, currentAnimeSlug]);

  // Filtra apenas os personagens válidos para o modo atual (ex: modo citação exige citação real e não-genérica)
  const validCharactersForMode = React.useMemo(() => {
    if (currentMode === 'quote') {
      return characters.filter(
        (c) =>
          c.quote &&
          c.quote.trim() !== '' &&
          c.quote !== 'Nenhum' &&
          c.quote !== 'Nenhuma' &&
          !c.quote.includes('Eu serei o maior livre dos mares') &&
          !c.quote.includes('Uma frase inesquecível')
      );
    }
    return characters;
  }, [characters, currentMode]);

  // Calcula o tamanho do pool de alvos do modo ativo
  const targetPoolSize = currentMode === 'ability' ? abilityPool.length : validCharactersForMode.length;

  // Calcula o índice do alvo diário aplicando a variação dev
  const baseDailyIndex = getDailyCharacterIndex(currentAnimeSlug, currentMode, targetPoolSize);
  const dailyIndex = (baseDailyIndex + (devOffsets[currentMode] || 0)) % targetPoolSize;
  
  // Habilidade/Domínio ativa do modo habilidade
  const currentAbilityItem = currentMode === 'ability' && abilityPool.length > 0
    ? abilityPool[dailyIndex % abilityPool.length]
    : null;

  // Personagem secreto do desafio ativo
  const targetCharacter = currentMode === 'ability' && currentAbilityItem
    ? currentAbilityItem.character
    : (currentMode === 'endless'
        ? validCharactersForMode[endlessTargetIndex % validCharactersForMode.length]
        : validCharactersForMode[dailyIndex % validCharactersForMode.length]);

  // Armazenamento de estado independente por modo
  const [modeStates, setModeStates] = useState<Record<GameMode, { guesses: GuessResult[]; isWon: boolean; isSurrendered?: boolean }>>({
    classic: { guesses: [], isWon: false },
    wanted: { guesses: [], isWon: false },
    quote: { guesses: [], isWon: false },
    ability: { guesses: [], isWon: false },
    zoom: { guesses: [], isWon: false },
    endless: { guesses: [], isWon: false },
  });

  // Modais
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);

  // Estatísticas Globais do Jogador
  const [stats, setStats] = useState<GameStats>(() => {
    const saved = localStorage.getItem('animedle_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return { played: 0, wins: 0, currentStreak: 0, maxStreak: 0, guessDistribution: {} };
  });

  // Salva estatísticas globais
  useEffect(() => {
    localStorage.setItem('animedle_stats', JSON.stringify(stats));
  }, [stats]);

  // Carrega progresso independente de CADA MODO do localStorage ao trocar de modo/anime
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const modesList: GameMode[] = ['classic', 'wanted', 'quote', 'ability', 'zoom'];
    const newStates: Record<GameMode, { guesses: GuessResult[]; isWon: boolean; isSurrendered?: boolean }> = {
      classic: { guesses: [], isWon: false },
      wanted: { guesses: [], isWon: false },
      quote: { guesses: [], isWon: false },
      ability: { guesses: [], isWon: false },
      zoom: { guesses: [], isWon: false },
      endless: { guesses: [], isWon: false },
    };

    modesList.forEach((mode) => {
      const savedKey = `animedle_progress_${currentAnimeSlug}_${mode}_${todayStr}`;
      const saved = localStorage.getItem(savedKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          newStates[mode] = {
            guesses: parsed.guesses || [],
            isWon: parsed.isWon || false,
            isSurrendered: parsed.isSurrendered || false,
          };
        } catch (e) {
          // ignore
        }
      }
    });

    setModeStates(newStates);
    setEndlessTargetIndex(Math.floor(Math.random() * characters.length));
  }, [currentAnimeSlug]);

  // Palpites do modo ativo atual
  const currentGuesses = modeStates[currentMode]?.guesses || [];
  const currentIsWon = modeStates[currentMode]?.isWon || false;
  const currentIsSurrendered = modeStates[currentMode]?.isSurrendered || false;
  const isFinished = currentIsWon || currentIsSurrendered;

  // Função ao realizar um palpite no modo ativo
  const handleSelectCharacter = (guessedChar: Character) => {
    if (isFinished) return;

    const matches = evaluateGuess(guessedChar, targetCharacter, animeConfig.columns, animeConfig.arcs);
    let isCorrect = guessedChar.id === targetCharacter.id;

    if (!isCorrect && currentMode === 'ability' && currentAnimeSlug === 'demon-slayer' && currentAbilityItem) {
      if (guessedChar.techniques && guessedChar.techniques.length > 0) {
        const targetTechClean = currentAbilityItem.text.toLowerCase().trim();
        const guessedHasTech = guessedChar.techniques.some((t) => {
          let cleanT = t
            .replace(/^(?:Primeira|Segunda|Terceira|Quarta|Quinta|Sexta|Sétima|Oitava|Nona|Décima|\d+ª|\w+)\s+(?:Forma|Presa|Dança)\s*[\:\-]?\s*/i, '')
            .replace(/^Respiração [^\-\:]+(?:(?:\s*-\s*|\s*:\s*)[^\:\-]+\s*(?:Forma|Presa|Dança)[^\:\-]*\s*\:\s*|\s*:\s*|\s*-\s*)/i, '')
            .replace(/^Respiração [^\:\-\(\)]+:\s*/i, '')
            .replace(/^Respiração [^\:\-\(\)]+\s*\(([^)]+)\)/i, '$1')
            .replace(/^Kekkijutsu\s*[\:\-]\s*/i, '')
            .replace(/^(?:Respiração|Kekkijutsu|Forma|Arte Demoníaca)\s*[\:\-]?\s*/i, '')
            .trim()
            .toLowerCase();
          return cleanT === targetTechClean;
        });

        if (guessedHasTech) {
          isCorrect = true;
        }
      }
    }

    const newGuess: GuessResult = {
      character: guessedChar,
      matches,
      isCorrect,
    };

    const updatedGuesses = [newGuess, ...currentGuesses];

    // No modo procurado (Wanted), se o palpite for feito com a foto totalmente sem blur (0px / 5ª tentativa ou mais) e for incorreto, o jogador perde!
    const isWantedLoss = currentMode === 'wanted' && !isCorrect && currentGuesses.length >= 4;
    const isSurrenderedState = isWantedLoss;

    setModeStates((prev) => ({
      ...prev,
      [currentMode]: {
        guesses: updatedGuesses,
        isWon: isCorrect,
        isSurrendered: isSurrenderedState,
      },
    }));

    if (currentMode !== 'endless') {
      const todayStr = new Date().toISOString().split('T')[0];
      const savedKey = `animedle_progress_${currentAnimeSlug}_${currentMode}_${todayStr}`;
      localStorage.setItem(
        savedKey,
        JSON.stringify({ guesses: updatedGuesses, isWon: isCorrect, isSurrendered: isSurrenderedState })
      );
    }

    if (isCorrect) {
      if (currentMode === 'endless') {
        setEndlessStreak((s) => s + 1);
      }

      setShowVictoryModal(true);

      setStats((prev) => {
        const newWins = prev.wins + 1;
        const newStreak = prev.currentStreak + 1;
        const newMax = Math.max(prev.maxStreak, newStreak);
        return {
          ...prev,
          played: prev.played + 1,
          wins: newWins,
          currentStreak: newStreak,
          maxStreak: newMax,
        };
      });
    } else if (isWantedLoss) {
      setShowVictoryModal(true);
    }
  };

  // Função ao Clicar em Desistir
  const handleSurrender = () => {
    if (isFinished) return;

    setModeStates((prev) => ({
      ...prev,
      [currentMode]: {
        ...prev[currentMode],
        isWon: false,
        isSurrendered: true,
      },
    }));

    if (currentMode !== 'endless') {
      const todayStr = new Date().toISOString().split('T')[0];
      const savedKey = `animedle_progress_${currentAnimeSlug}_${currentMode}_${todayStr}`;
      localStorage.setItem(
        savedKey,
        JSON.stringify({ guesses: currentGuesses, isWon: false, isSurrendered: true })
      );
    }

    setShowVictoryModal(true);
  };

  // Próximo desafio no Modo Treino
  const handleNextEndlessChallenge = () => {
    const poolSize = currentMode === 'ability' ? abilityPool.length : validCharactersForMode.length;
    let nextIdx = Math.floor(Math.random() * poolSize);
    if (nextIdx === endlessTargetIndex) {
      nextIdx = (nextIdx + 1) % poolSize;
    }
    setEndlessTargetIndex(nextIdx);
    setModeStates((prev) => ({
      ...prev,
      endless: { guesses: [], isWon: false, isSurrendered: false },
    }));
    setShowVictoryModal(false);
  };

  // Resetar (dev)
  const handleResetDaily = () => {
    if (currentMode === 'endless') {
      handleNextEndlessChallenge();
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const savedKey = `animedle_progress_${currentAnimeSlug}_${currentMode}_${todayStr}`;
    localStorage.removeItem(savedKey);

    const poolSize = currentMode === 'ability' ? abilityPool.length : validCharactersForMode.length;
    const randomOffset = Math.floor(Math.random() * poolSize);
    setDevOffsets((prev) => ({
      ...prev,
      [currentMode]: randomOffset,
    }));

    setModeStates((prev) => ({
      ...prev,
      [currentMode]: {
        guesses: [],
        isWon: false,
        isSurrendered: false,
      },
    }));
    setShowVictoryModal(false);
  };

  // Nível de Desfoco no Modo Procurado
  const blurAmount = Math.max(0, 24 - currentGuesses.length * 6);

  // Nível de Zoom no Modo Olhos/Zoom
  const zoomScale = isFinished ? 1 : Math.max(1, 3.5 - currentGuesses.length * 0.5);

  return (
    <div className="min-h-screen bg-[#030712] text-[#F5F7FF] flex flex-col font-sans selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
      {/* Background Radial Glow Imperceptível adaptado ao Accent do Anime */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${animeConfig.themeColor}15, transparent 50%)`,
        }}
      />
      
      {/* Navbar Header */}
      <Navbar
        currentAnimeSlug={currentAnimeSlug}
        onSelectAnime={handleSelectAnime}
        onOpenHowToPlay={() => setShowHowToPlay(true)}
        onOpenStats={() => setShowStats(true)}
        onResetDaily={handleResetDaily}
      />

      {/* Conteúdo Principal — Largura Otimizada (max-w-[1440px]) */}
      <main className="flex-1 max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto py-8 pb-36 z-10">
        
        {/* Hero Header sem o texto "Desafio Diário #" */}
        <div className="text-center my-4">
          {currentMode === 'endless' && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111a2d] border border-[#202b43] text-slate-300 text-xs font-bold mb-3 shadow-sm">
              <InfinityIcon size={14} className="text-amber-400" />
              <span>Modo Treino (Ilimitado)</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Adivinhe o Personagem de <span style={{ color: animeConfig.themeColor }}>{animeConfig.title}</span>
          </h2>
          {currentMode === 'endless' && (
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-lg mx-auto">
              Treine sem limites! Adivinhe quantos personagens conseguir em sequência.
            </p>
          )}
        </div>

        {/* Abas de Modos de Jogo */}
        <GameModeTabs
          currentMode={currentMode}
          onSelectMode={handleSelectMode}
          themeColor={animeConfig.themeColor}
          currentAnimeSlug={currentAnimeSlug}
        />

        {/* Quadro de Dicas & Botão Desistir (Dica 2 Inteligente no modo Citação) */}
        <HintBox
          targetCharacter={targetCharacter}
          guessCount={currentGuesses.length}
          isWon={isFinished}
          onSurrender={handleSurrender}
          disabled={isFinished}
          currentMode={currentMode}
          currentAnimeSlug={currentAnimeSlug}
        />

        {/* Card do Personagem Revelado (Exibido ao Acertar ou Desistir em qualquer modo) */}
        {isFinished && (
          <div
            style={{ borderColor: `${animeConfig.themeColor}50` }}
            className="max-w-2xl mx-auto my-6 p-4 sm:p-5 bg-[#0d1426] border rounded-2xl shadow-xl shadow-black/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div
                style={{ borderColor: `${animeConfig.themeColor}60` }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#111a2d] border-2 overflow-hidden flex-shrink-0 shadow-md"
              >
                <img
                  src={targetCharacter.avatar}
                  alt={targetCharacter.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    currentIsWon
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}>
                    {currentIsWon
                      ? `✓ Acertou em ${currentGuesses.length} ${currentGuesses.length === 1 ? 'tentativa' : 'tentativas'}!`
                      : '🚩 Desistência'}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">Personagem Secreto</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white truncate">{targetCharacter.name}</h3>
                <p className="text-xs text-slate-300 font-medium truncate mt-0.5">
                  {targetCharacter.species} • {Array.isArray(targetCharacter.affiliation) ? targetCharacter.affiliation.join(', ') : targetCharacter.affiliation}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowVictoryModal(true)}
              style={{ backgroundColor: animeConfig.themeColor }}
              className="flex-shrink-0 w-full sm:w-auto px-4 py-2.5 text-white text-xs font-bold rounded-xl shadow-md transition-all hover:opacity-90 active:scale-95"
            >
              Ver Estatísticas & Compartilhar
            </button>
          </div>
        )}

        {/* MODO CLÁSSICO */}
        {currentMode === 'classic' && (
          <div>
            <CharacterSearchInput
              characters={characters}
              guessedCharacterIds={currentGuesses.map((g) => g.character.id)}
              onSelectCharacter={handleSelectCharacter}
              disabled={isFinished}
              themeColor={animeConfig.themeColor}
            />

            <ClassicGrid columns={animeConfig.columns} guesses={currentGuesses} animeSlug={currentAnimeSlug} />
          </div>
        )}

        {/* MODO PROCURADO */}
        {currentMode === 'wanted' && (
          <div className="max-w-xl mx-auto text-center my-6 p-6 bg-[#0d1426] border border-[#202b43] rounded-3xl shadow-xl">
            <h3 className="font-extrabold text-base text-white flex items-center justify-center gap-2 mb-1.5">
              <Eye size={18} style={{ color: animeConfig.themeColor }} /> Modo Procurado
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Quem é este personagem? A foto fica mais nítida a cada tentativa errada!
            </p>
            
            <div className="w-48 h-48 mx-auto my-4 rounded-full overflow-hidden border-4 border-[#202b43] bg-[#111a2d] relative flex items-center justify-center shadow-2xl">
              <img
                key={`wanted-img-${targetCharacter.id}`}
                src={targetCharacter.avatar}
                alt="Mistério"
                style={{ filter: isFinished ? 'none' : `blur(${blurAmount}px)` }}
                className="w-full h-full object-cover"
              />
            </div>

            <CharacterSearchInput
              characters={characters}
              guessedCharacterIds={currentGuesses.map((g) => g.character.id)}
              onSelectCharacter={handleSelectCharacter}
              disabled={isFinished}
              themeColor={animeConfig.themeColor}
            />

            <SimpleGuessList guesses={currentGuesses} targetCharacter={targetCharacter} />
          </div>
        )}

        {/* MODO CITAÇÃO */}
        {currentMode === 'quote' && (
          <div className="max-w-xl mx-auto text-center my-6 p-6 bg-[#0d1426] border border-[#202b43] rounded-3xl shadow-xl">
            <h3 className="font-extrabold text-base text-white flex items-center justify-center gap-2 mb-2">
              <MessageSquare size={18} style={{ color: animeConfig.themeColor }} /> Quem disse esta frase marcante?
            </h3>
            
            <blockquote
              style={{ borderLeftColor: animeConfig.themeColor }}
              className="p-4 bg-[#111a2d] border-l-4 rounded-r-2xl italic text-sm text-slate-200 my-4 shadow-inner text-left"
            >
              "{targetCharacter.quote || 'Uma frase inesquecível...'}"
            </blockquote>

            <CharacterSearchInput
              characters={characters}
              guessedCharacterIds={currentGuesses.map((g) => g.character.id)}
              onSelectCharacter={handleSelectCharacter}
              disabled={isFinished}
              themeColor={animeConfig.themeColor}
            />

            <SimpleGuessList guesses={currentGuesses} targetCharacter={targetCharacter} />
          </div>
        )}

        {/* MODO HABILIDADE */}
        {currentMode === 'ability' && (
          currentAbilityItem ? (
            <div className="max-w-xl mx-auto text-center my-6 p-6 bg-[#0d1426] border border-[#202b43] rounded-3xl shadow-xl">
              <h3 className="font-extrabold text-base text-white flex items-center justify-center gap-2 mb-2">
                <Zap size={18} style={{ color: animeConfig.themeColor }} />
                {currentAnimeSlug === 'naruto'
                  ? 'A quem pertence este jutsu?'
                  : `A quem pertence esta ${currentAbilityItem.abilityType === 'domain' ? 'expansão de domínio' : 'técnica'}?`}
              </h3>
              
              <div className="p-5 bg-[#111a2d] border border-[#202b43] rounded-2xl text-[#F5F7FF] my-4 shadow-inner flex flex-col items-center justify-center min-h-[100px]">
                <span className={`text-[11px] uppercase tracking-wider font-extrabold mb-1.5 px-3 py-0.5 rounded-full border ${
                  currentAbilityItem.abilityType === 'domain'
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                    : 'bg-purple-500/15 border-purple-500/40 text-purple-300'
                }`}>
                  {currentAbilityItem.abilityType === 'domain' ? '🌌 Expansão de Domínio' : currentAnimeSlug === 'naruto' ? '🌀 Jutsu / Técnica' : `✨ ${currentAbilityItem.title}`}
                </span>
                <p className="text-base sm:text-lg font-black text-white text-center mt-1">
                  "{currentAbilityItem.text}"
                </p>
              </div>

              <CharacterSearchInput
                characters={characters}
                guessedCharacterIds={currentGuesses.map((g) => g.character.id)}
                onSelectCharacter={handleSelectCharacter}
                disabled={isFinished}
                themeColor={animeConfig.themeColor}
              />

              <SimpleGuessList guesses={currentGuesses} targetCharacter={targetCharacter} />
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center my-6 p-6 bg-[#0d1426] border border-[#202b43] rounded-3xl shadow-xl">
              <p className="text-slate-400 text-sm">Nenhum jutsu/habilidade disponível para este anime ainda.</p>
            </div>
          )
        )}

        {/* MODO ZOOM / OLHOS */}
        {currentMode === 'zoom' && (
          <div className="max-w-xl mx-auto text-center my-6 p-6 bg-[#0d1426] border border-[#202b43] rounded-3xl shadow-xl">
            <h3 className="font-extrabold text-base text-white flex items-center justify-center gap-2 mb-1.5">
              <ZoomIn size={18} style={{ color: animeConfig.themeColor }} /> Modo Zoom (Olhos & Detalhes)
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              A foto do personagem está com zoom extremo! O zoom diminui a cada erro.
            </p>
            
            <div className="w-52 h-52 mx-auto my-4 rounded-full overflow-hidden border-4 border-[#202b43] bg-[#111a2d] relative flex items-center justify-center shadow-2xl">
              <img
                key={`zoom-img-${targetCharacter.id}`}
                src={targetCharacter.avatar}
                alt="Zoom Detalhe"
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: 'center center',
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <CharacterSearchInput
              characters={characters}
              guessedCharacterIds={currentGuesses.map((g) => g.character.id)}
              onSelectCharacter={handleSelectCharacter}
              disabled={isFinished}
              themeColor={animeConfig.themeColor}
            />

            <SimpleGuessList guesses={currentGuesses} targetCharacter={targetCharacter} />
          </div>
        )}

        {/* MODO TREINO (INFINITO) */}
        {currentMode === 'endless' && (
          <div>
            <div className="max-w-2xl mx-auto mb-4 p-4 bg-[#0d1426] border border-[#202b43] rounded-2xl flex items-center justify-between text-xs shadow-lg">
              <div className="flex items-center gap-2 font-bold text-sm" style={{ color: animeConfig.themeColor }}>
                <Flame size={18} className="text-amber-400" />
                <span>Sequência no Treino: <strong className="text-amber-400 text-base">{endlessStreak}</strong> acertos</span>
              </div>
              {isFinished && (
                <button
                  onClick={handleNextEndlessChallenge}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-xl shadow-lg transition-all transform hover:scale-105"
                >
                  <RefreshCw size={14} />
                  <span>Próximo Personagem</span>
                </button>
              )}
            </div>

            <CharacterSearchInput
              characters={characters}
              guessedCharacterIds={currentGuesses.map((g) => g.character.id)}
              onSelectCharacter={handleSelectCharacter}
              disabled={isFinished}
              themeColor={animeConfig.themeColor}
            />

            <ClassicGrid columns={animeConfig.columns} guesses={currentGuesses} animeSlug={currentAnimeSlug} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#202b43]/60 py-6 text-center text-xs text-slate-500 relative z-0">
        <p>AnimeDLE © 2026 • Feito por Reskalla</p>
      </footer>

      {/* Modais */}
      {showVictoryModal && (
        <VictoryModal
          targetCharacter={targetCharacter}
          totalGuesses={currentGuesses.length}
          stats={stats}
          isSurrendered={currentIsSurrendered}
          onClose={() => setShowVictoryModal(false)}
          themeColor={animeConfig.themeColor}
          animeTitle={animeConfig.title}
        />
      )}

      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
      {showStats && <StatsModal stats={stats} onClose={() => setShowStats(false)} />}
    </div>
  );
};

export default App;
