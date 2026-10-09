import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { GameModeTabs } from './components/GameModeTabs';
import { CharacterSearchInput } from './components/CharacterSearchInput';
import { ClassicGrid } from './components/ClassicGrid';
import { SimpleGuessList } from './components/SimpleGuessList';
import { VictoryModal } from './components/VictoryModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { StatsModal } from './components/StatsModal';
import { HintBox } from './components/HintBox';
import { MangaCoverageModal } from './components/MangaCoverageModal';
import { ExclusiveAnimeMode } from './components/ExclusiveAnimeMode';
import { AnimeGridMode } from './components/AnimeGridMode';
import { AchievementToast } from './components/AchievementToast';
import { ObfuscatedMysteryAvatar } from './components/ObfuscatedMysteryAvatar';
import { VoicePlayerCard } from './components/VoicePlayerCard';
import { ScenePlayerCard } from './components/ScenePlayerCard';
import { ModeHeaderCard } from './components/ModeHeaderCard';
import { SurrenderConfirmModal } from './components/SurrenderConfirmModal';
import { unlockAchievement, updateGlobalStatsOnOutcome } from './data/achievements';
import { getVoiceChallengesForAnime } from './data/voices/voiceChallenges';
import { getSceneChallengesForAnime } from './data/scenes/sceneChallenges';

import { ANIMES_CONFIG } from './data/animes/config';
import { NARUTO_EXCLUSIVE_JUTSUS } from './data/animes/naruto/exclusiveJutsus';
import { Character, GameMode, GuessResult, GameStats, VoiceChallenge, SceneChallenge } from './types/anime';
import { getDailyCharacterIndex, evaluateGuess, getDailyDateString } from './utils/dailySeed';
import { getOrAdvanceEndlessIndex } from './utils/endlessDeck';
import { Sparkles, Eye, Zap, ZoomIn, Volume2, Film, LayoutGrid, BookOpen } from 'lucide-react';


export const App: React.FC<{
  animeSlug: string;
  charactersData: Character[];
  onNavigateHome: () => void;
  onNavigateToAnime: (slug: string) => void;
}> = ({ animeSlug: currentAnimeSlug, charactersData, onNavigateHome, onNavigateToAnime }) => {
  const [currentMode, setCurrentMode] = useState<GameMode>('classic');

  // Controle de Modo Infinito por Modo de Jogo
  const [endlessByMode, setEndlessByMode] = useState<Record<GameMode, boolean>>({
    classic: false,
    wanted: false,
    ability: false,
    zoom: false,
    voice: false,
    grid: false,
    scene: false,
  });

  const isCurrentEndless = endlessByMode[currentMode] || false;

  const handleToggleEndless = (mode: GameMode, val: boolean) => {
    setEndlessByMode((prev) => ({
      ...prev,
      [mode]: val,
    }));
    setShowVictoryModal(false);
    if (val && endlessModeStates[mode]?.guesses?.length === 0 && !endlessModeStates[mode]?.isWon) {
      setEndlessTargetIndex(Math.floor(Math.random() * characters.length));
    }
  };

  // Ordena a lista de personagens recebida em ordem alfabética (A-Z)
  const characters = React.useMemo(() => {
    return [...charactersData].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [charactersData]);

  const animeConfig = ANIMES_CONFIG[currentAnimeSlug] || ANIMES_CONFIG['demon-slayer'];

  // Atualiza a cor de seleção de texto (Ctrl+A ou clique duplo) dinamicamente para o anime atual
  useEffect(() => {
    if (animeConfig?.themeColor) {
      document.documentElement.style.setProperty('--selection-bg', animeConfig.themeColor);
    }
    return () => {
      document.documentElement.style.setProperty('--selection-bg', '#2150e5');
    };
  }, [animeConfig?.themeColor]);

  // Troca de anime via navegação por URL (componente remonta automaticamente)
  const handleSelectAnime = (newAnimeSlug: string) => {
    setShowVictoryModal(false);
    if (newAnimeSlug !== currentAnimeSlug) {
      setEndlessStreak(0);
      localStorage.setItem(`animedle_endless_streak_${currentAnimeSlug}`, '0');
      localStorage.setItem(`animedle_endless_streak_${newAnimeSlug}`, '0');
      localStorage.setItem('animedle_last_endless_anime', newAnimeSlug);
    }
    onNavigateToAnime(newAnimeSlug);
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
    ability: 0,
    zoom: 0,
    voice: 0,
    grid: 0,
    scene: 0,
  });

  // Modo Treino (Infinito): Personagem Aleatório e Contador de Sequência
  const [endlessTargetIndex, setEndlessTargetIndex] = useState<number>(() =>
    Math.floor(Math.random() * characters.length)
  );
  const [endlessStreak, setEndlessStreak] = useState<number>(() => {
    const lastAnime = localStorage.getItem('animedle_last_endless_anime');
    if (lastAnime && lastAnime !== currentAnimeSlug) {
      localStorage.setItem(`animedle_endless_streak_${lastAnime}`, '0');
      localStorage.setItem(`animedle_endless_streak_${currentAnimeSlug}`, '0');
      localStorage.setItem('animedle_last_endless_anime', currentAnimeSlug);
      return 0;
    }
    localStorage.setItem('animedle_last_endless_anime', currentAnimeSlug);
    const saved = localStorage.getItem(`animedle_endless_streak_${currentAnimeSlug}`);
    return saved ? parseInt(saved, 10) || 0 : 0;
  });

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
        const exclusiveList = NARUTO_EXCLUSIVE_JUTSUS[c.id];
        if (exclusiveList && exclusiveList.length > 0) {
          exclusiveList.forEach((j, idx) => {
            items.push({
              id: `${c.id}-exclusive-jutsu-${idx}`,
              character: c,
              abilityType: 'technique',
              title: j.title,
              text: j.text,
            });
          });
        }
      });
      return items;
    }

    if (currentAnimeSlug === 'bleach') {
      characters.forEach((c) => {
        const techList = (c.techniques && c.techniques.length > 0) ? c.techniques : (c.styleOrPower ? [c.styleOrPower] : []);
        techList.forEach((tech, idx) => {
          if (tech && tech !== 'Nenhum' && tech !== 'Nenhuma') {
            const badgeTitle = c.maxRelease === 'Bankai'
              ? 'Bankai / Liberação de Zanpakutō'
              : c.maxRelease === 'Resurrección'
              ? 'Resurrección / Técnica Arrancar'
              : c.maxRelease === 'Vollständig'
              ? 'Vollständig / Técnica Quincy'
              : 'Técnica / Habilidade';

            items.push({
              id: `${c.id}-bleach-tech-${idx}`,
              character: c,
              abilityType: 'technique',
              title: badgeTitle,
              text: tech,
            });
          }
        });
      });
      return items;
    }

    if (currentAnimeSlug === 'dragon-ball') {
      characters.forEach((c) => {
        const techList = (c.techniques && c.techniques.length > 0) ? c.techniques : (c.styleOrPower ? [c.styleOrPower] : []);
        techList.forEach((tech, idx) => {
          if (tech && tech !== 'Nenhum' && tech !== 'Nenhuma') {
            items.push({
              id: `${c.id}-db-tech-${idx}`,
              character: c,
              abilityType: 'technique',
              title: 'Técnica de Ki / Golpe Especial',
              text: tech,
            });
          }
        });
      });
      return items;
    }

    if (currentAnimeSlug === 'jojos-bizarre-adventure') {
      characters.forEach((c) => {
        if (c.stand && c.stand !== 'Nenhum' && c.stand !== 'Nenhuma') {
          items.push({
            id: `${c.id}-stand`,
            character: c,
            abilityType: 'technique',
            title: 'Nome do Stand',
            text: c.stand,
          });
        }
      });
      return items;
    }

    if (currentAnimeSlug === 'dandadan') {
      characters.forEach((c) => {
        const techList = (c.techniques && c.techniques.length > 0) ? c.techniques : (c.styleOrPower ? [c.styleOrPower] : []);
        techList.forEach((tech, idx) => {
          if (tech && tech !== 'Nenhum' && tech !== 'Nenhuma') {
            const badgeTitle = c.powerNature?.includes('Sobrenatural')
              ? 'Poder Sobrenatural / Youkai'
              : c.powerNature?.includes('Extraterrestre')
              ? 'Poder Extraterrestre / Sci-Fi'
              : c.powerNature?.includes('Misto')
              ? 'Poder Misto (Youkai & Sci-Fi)'
              : 'Poder / Habilidade';

            items.push({
              id: `${c.id}-dandadan-power-${idx}`,
              character: c,
              abilityType: 'technique',
              title: badgeTitle,
              text: tech,
            });
          }
        });
      });
      return items;
    }

    if (currentAnimeSlug === 'tensei-shitara-slime-datta-ken') {
      characters.forEach((c) => {
        const techList = (c.techniques && c.techniques.length > 0) ? c.techniques : (c.styleOrPower ? [c.styleOrPower] : []);
        techList.forEach((tech, idx) => {
          if (tech && tech !== 'Nenhum' && tech !== 'Nenhuma') {
            const isUltimate = tech.includes('(') || tech.includes('Senhor') || tech.includes('Lorde') || tech.includes('Senhora');
            const badgeTitle = isUltimate
              ? 'Ultimate Skill / Habilidade Suprema'
              : 'Habilidade / Técnica Especial';

            items.push({
              id: `${c.id}-tensura-skill-${idx}`,
              character: c,
              abilityType: 'technique',
              title: badgeTitle,
              text: tech,
            });
          }
        });
      });
      return items;
    }

    if (currentAnimeSlug === 'attack-on-titan') {
      characters.forEach((c) => {
        const techList = (c.techniques && c.techniques.length > 0) ? c.techniques : (c.styleOrPower ? [c.styleOrPower] : []);
        techList.forEach((tech, idx) => {
          if (tech && tech !== 'Nenhum' && tech !== 'Nenhuma') {
            const isTitan = tech.includes('Titã') || tech.includes('Estrondo') || tech.includes('Coordenada') || tech.includes('Fundador') || tech.includes('Ackerman');
            const badgeTitle = isTitan
              ? 'Poder de Titã / Linhagem Especial'
              : 'Técnica / Especialidade Militar';

            items.push({
              id: `${c.id}-aot-titan-${idx}`,
              character: c,
              abilityType: 'technique',
              title: badgeTitle,
              text: tech,
            });
          }
        });
      });
      return items;
    }

    if (currentAnimeSlug === 'black-clover') {
      characters.forEach((c) => {
        const techList = (c.techniques && c.techniques.length > 0) ? c.techniques : (c.styleOrPower ? [c.styleOrPower] : []);
        techList.forEach((tech, idx) => {
          if (tech && tech !== 'Nenhum' && tech !== 'Nenhuma') {
            const isSupreme = tech.includes('União') || tech.includes('Suprema') || tech.includes('Chrono') || tech.includes('Corte Dimensional') || tech.includes('Valquíria');
            const badgeTitle = isSupreme
              ? 'Magia Suprema / Feitiço Lendário'
              : 'Magia / Feitiço Especial';

            items.push({
              id: `${c.id}-bc-magic-${idx}`,
              character: c,
              abilityType: 'technique',
              title: badgeTitle,
              text: tech,
            });
          }
        });
      });
      return items;
    }

    if (currentAnimeSlug === 'berserk') {
      characters.forEach((c) => {
        const techList = (c.techniques && c.techniques.length > 0) ? c.techniques : (c.styleOrPower ? [c.styleOrPower] : []);
        techList.forEach((tech, idx) => {
          if (tech && tech !== 'Nenhum' && tech !== 'Nenhuma') {
            const isApostleOrRelic = tech.includes('Dragon Slayer') || tech.includes('Berserker') || tech.includes('Apóstolo') || tech.includes('God Hand') || tech.includes('Behelit') || tech.includes('Espada Sílfica') || tech.includes('Correntes');
            const badgeTitle = isApostleOrRelic
              ? 'Arma Lendária / Poder de Apóstolo'
              : 'Técnica de Combate / Habilidade';

            items.push({
              id: `${c.id}-berserk-power-${idx}`,
              character: c,
              abilityType: 'technique',
              title: badgeTitle,
              text: tech,
            });
          }
        });
      });
      return items;
    }

    if (currentAnimeSlug === 'chainsaw-man') {
      characters.forEach((c) => {
        const techList = (c.techniques && c.techniques.length > 0) ? c.techniques : (c.styleOrPower ? [c.styleOrPower] : []);
        techList.forEach((tech, idx) => {
          if (tech && tech !== 'Nenhum' && tech !== 'Nenhuma') {
            const isPrimalOrHorseman = tech.includes('Primordial') || tech.includes('Apocalipse') || tech.includes('Herói do Inferno') || tech.includes('Bang') || tech.includes('Trevas') || tech.includes('Controle') || tech.includes('Guerra') || tech.includes('Fome') || tech.includes('Morte') || tech.includes('Queda') || tech.includes('Escuridão') || tech.includes('Envelhecimento');
            const isHybrid = tech.includes('Chainsaw') || tech.includes('Motosserra') || tech.includes('Bomba') || tech.includes('Katana') || tech.includes('Lança-Chamas') || tech.includes('Espada') || tech.includes('Lança') || tech.includes('Chicote') || tech.includes('Besta');
            const badgeTitle = isPrimalOrHorseman
              ? 'Demônio Primordial / Quatro Cavaleiros'
              : isHybrid
              ? 'Poder Híbrido / Arma Humana'
              : 'Poder Demoníaco / Contrato';

            items.push({
              id: `${c.id}-csm-power-${idx}`,
              character: c,
              abilityType: 'technique',
              title: badgeTitle,
              text: tech,
            });
          }
        });
      });
      return items;
    }

    if (currentAnimeSlug === 'fairy-tail') {
      characters.forEach((c) => {
        const techList = (c.techniques && c.techniques.length > 0) ? c.techniques : (c.styleOrPower ? [c.styleOrPower] : []);
        techList.forEach((tech, idx) => {
          if (tech && tech !== 'Nenhum' && tech !== 'Nenhuma') {
            const isDragonSlayerOrSupreme = tech.includes('Dragão') || tech.includes('Dragon') || tech.includes('Fairy Law') || tech.includes('Fairy Glitter') || tech.includes('Fairy Sphere') || tech.includes('Ars Magia') || tech.includes('Universe One') || tech.includes('Deus Sema') || tech.includes('Sema') || tech.includes('Iced Shell');
            const isDemonOrCurse = tech.includes('Maldição') || tech.includes('Demon') || tech.includes('Demônio') || tech.includes('Etherious') || tech.includes('Memento Mori') || tech.includes('Ankhseram');
            const badgeTitle = isDragonSlayerOrSupreme
              ? 'Magia de Dragon Slayer / Grande Magia das Fadas'
              : isDemonOrCurse
              ? 'Maldição Demoníaca / Magia Negra de Zeref'
              : 'Magia / Feitiço Especial';

            items.push({
              id: `${c.id}-ft-magic-${idx}`,
              character: c,
              abilityType: 'technique',
              title: badgeTitle,
              text: tech,
            });
          }
        });
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

  // Desafios de Voz do anime atual
  const voiceChallenges = React.useMemo(() => {
    return getVoiceChallengesForAnime(currentAnimeSlug);
  }, [currentAnimeSlug]);

  // Desafios do Modo Cena do anime atual
  const sceneChallenges = React.useMemo(() => {
    return getSceneChallengesForAnime(currentAnimeSlug);
  }, [currentAnimeSlug]);

  // Calcula o tamanho do pool de alvos do modo ativo
  const targetPoolSize =
    currentMode === 'ability'
      ? abilityPool.length
      : currentMode === 'voice'
      ? voiceChallenges.length
      : currentMode === 'scene'
      ? sceneChallenges.length
      : characters.length;

  // Calcula o índice do alvo diário aplicando a variação dev
  const baseDailyIndex = getDailyCharacterIndex(currentAnimeSlug, currentMode, targetPoolSize);
  const dailyIndex = (baseDailyIndex + (devOffsets[currentMode] || 0)) % targetPoolSize;

  // Sincroniza o índice do Modo Infinito via baralho persistente sem repetição
  React.useEffect(() => {
    if (targetPoolSize > 0) {
      const currentIdx = getOrAdvanceEndlessIndex(currentAnimeSlug, currentMode, targetPoolSize, false);
      setEndlessTargetIndex(currentIdx);
    }
  }, [currentAnimeSlug, currentMode, targetPoolSize]);
  
  // Habilidade/Domínio ativa do modo habilidade
  const currentAbilityItem = currentMode === 'ability' && abilityPool.length > 0
    ? (isCurrentEndless
        ? abilityPool[endlessTargetIndex % abilityPool.length]
        : abilityPool[dailyIndex % abilityPool.length])
    : null;

  // Desafio de voz ativo no modo voz
  const currentVoiceChallenge = currentMode === 'voice' && voiceChallenges.length > 0
    ? (isCurrentEndless
        ? voiceChallenges[endlessTargetIndex % voiceChallenges.length]
        : voiceChallenges[dailyIndex % voiceChallenges.length])
    : null;

  // Desafio de cena ativo no modo cena
  const currentSceneChallenge = currentMode === 'scene' && sceneChallenges.length > 0
    ? (isCurrentEndless
        ? sceneChallenges[endlessTargetIndex % sceneChallenges.length]
        : sceneChallenges[dailyIndex % sceneChallenges.length])
    : null;

  // Personagem secreto do desafio ativo
  const targetCharacter = currentMode === 'ability' && currentAbilityItem
    ? currentAbilityItem.character
    : currentMode === 'voice' && currentVoiceChallenge
    ? (characters.find((c) => c.id === currentVoiceChallenge.characterId) || characters[0])
    : currentMode === 'scene' && currentSceneChallenge
    ? (characters.find((c) => c.id === currentSceneChallenge.characterId) || characters[0])
    : (isCurrentEndless
        ? characters[endlessTargetIndex % characters.length]
        : characters[dailyIndex % characters.length]);

  // Armazenamento de estado independente por modo no Modo Diário
  const [dailyModeStates, setDailyModeStates] = useState<Record<GameMode, { guesses: GuessResult[]; isWon: boolean; isSurrendered?: boolean; isLost?: boolean }>>({
    classic: { guesses: [], isWon: false },
    wanted: { guesses: [], isWon: false },
    ability: { guesses: [], isWon: false },
    zoom: { guesses: [], isWon: false },
    voice: { guesses: [], isWon: false },
    grid: { guesses: [], isWon: false },
    scene: { guesses: [], isWon: false },
  });

  // Armazenamento de estado independente por modo no Modo Treino / Infinito
  const [endlessModeStates, setEndlessModeStates] = useState<Record<GameMode, { guesses: GuessResult[]; isWon: boolean; isSurrendered?: boolean; isLost?: boolean }>>({
    classic: { guesses: [], isWon: false },
    wanted: { guesses: [], isWon: false },
    ability: { guesses: [], isWon: false },
    zoom: { guesses: [], isWon: false },
    voice: { guesses: [], isWon: false },
    grid: { guesses: [], isWon: false },
    scene: { guesses: [], isWon: false },
  });

  const modeStates = isCurrentEndless ? endlessModeStates : dailyModeStates;
  const setModeStates = isCurrentEndless ? setEndlessModeStates : setDailyModeStates;

  // Modais
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showSurrenderConfirm, setShowSurrenderConfirm] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [showMangaCoverage, setShowMangaCoverage] = useState<boolean>(false);

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

  // Salva estatísticas globais com proteção contra sobrescrita de estado antigo
  useEffect(() => {
    try {
      const saved = localStorage.getItem('animedle_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        if ((stats.played || 0) >= (parsed.played || 0)) {
          localStorage.setItem('animedle_stats', JSON.stringify(stats));
        }
      } else {
        localStorage.setItem('animedle_stats', JSON.stringify(stats));
      }
    } catch {
      localStorage.setItem('animedle_stats', JSON.stringify(stats));
    }
  }, [stats]);

  // Listener para sincronização instantânea das estatísticas por eventos globais
  useEffect(() => {
    const handleStatsUpdated = (e: Event) => {
      const detail = (e as CustomEvent<GameStats>).detail;
      if (detail) {
        setStats(detail);
      } else {
        const saved = localStorage.getItem('animedle_stats');
        if (saved) {
          try {
            setStats(JSON.parse(saved));
          } catch (err) {}
        }
      }
    };
    window.addEventListener('animedle_stats_updated', handleStatsUpdated);
    return () => window.removeEventListener('animedle_stats_updated', handleStatsUpdated);
  }, []);

  // Carrega progresso independente de CADA MODO do localStorage ao trocar de modo/anime
  useEffect(() => {
    const todayStr = getDailyDateString();
    const modesList: GameMode[] = ['classic', 'wanted', 'ability', 'zoom', 'voice', 'scene'];
    const newStates: Record<GameMode, { guesses: GuessResult[]; isWon: boolean; isSurrendered?: boolean; isLost?: boolean }> = {
      classic: { guesses: [], isWon: false },
      wanted: { guesses: [], isWon: false },
      ability: { guesses: [], isWon: false },
      zoom: { guesses: [], isWon: false },
      voice: { guesses: [], isWon: false },
      grid: { guesses: [], isWon: false },
      scene: { guesses: [], isWon: false },
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
            isLost: parsed.isLost || false,
          };
        } catch (e) {
          // ignore
        }
      }
    });

    setDailyModeStates(newStates);
    setShowVictoryModal(false);
    setShowSurrenderConfirm(false);
    setEndlessTargetIndex(Math.floor(Math.random() * characters.length));

    // Se mudou de anime, reseta a sequência do modo treino. Se recarregou/voltou ao mesmo, mantém.
    const lastAnime = localStorage.getItem('animedle_last_endless_anime');
    if (lastAnime && lastAnime !== currentAnimeSlug) {
      setEndlessStreak(0);
      localStorage.setItem(`animedle_endless_streak_${lastAnime}`, '0');
      localStorage.setItem(`animedle_endless_streak_${currentAnimeSlug}`, '0');
      localStorage.setItem('animedle_last_endless_anime', currentAnimeSlug);
    } else {
      localStorage.setItem('animedle_last_endless_anime', currentAnimeSlug);
      const saved = localStorage.getItem(`animedle_endless_streak_${currentAnimeSlug}`);
      setEndlessStreak(saved ? parseInt(saved, 10) || 0 : 0);
    }
  }, [currentAnimeSlug]);

  // Palpites do modo ativo atual
  const currentGuesses = modeStates[currentMode]?.guesses || [];
  const currentIsWon = modeStates[currentMode]?.isWon || false;
  const currentIsSurrendered = modeStates[currentMode]?.isSurrendered || false;
  const currentIsLost = modeStates[currentMode]?.isLost || false;
  const isFinished = currentIsWon || currentIsSurrendered || currentIsLost;

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
    // No modo zoom, o zoom atinge 1x na 5ª tentativa (zoomScale = 1.0). A partir de 1x, o 3º erro consecutivo no zoom 1x causa derrota!
    const isZoomLoss = currentMode === 'zoom' && !isCorrect && currentGuesses.length >= 7;
    // No modo cena, o borrão zera no 4º erro (0px). Se errar 3 vezes com a cena 100% nítida (6 erros no total), o jogador perde!
    const isSceneLoss = currentMode === 'scene' && !isCorrect && currentGuesses.length >= 6;
    const isDefeat = isWantedLoss || isZoomLoss || isSceneLoss;
    const isSurrenderedState = isDefeat;

    setModeStates((prev) => ({
      ...prev,
      [currentMode]: {
        guesses: updatedGuesses,
        isWon: isCorrect,
        isSurrendered: isSurrenderedState,
        isLost: isDefeat,
      },
    }));

    if (!isCurrentEndless) {
      const todayStr = getDailyDateString();
      const savedKey = `animedle_progress_${currentAnimeSlug}_${currentMode}_${todayStr}`;
      localStorage.setItem(
        savedKey,
        JSON.stringify({
          guesses: updatedGuesses,
          isWon: isCorrect,
          isSurrendered: isSurrenderedState,
          isLost: isDefeat,
        })
      );
    }

    // --- AVALIAÇÃO DE CONQUISTAS SECRETAS EM TEMPO REAL ---
    // 1. Cego pelo Hype: Chutar o protagonista no primeiro palpite em 3 partidas diferentes
    if (currentGuesses.length === 0) {
      const protagonistMap: Record<string, string[]> = {
        'one-piece': ['monkey-d-luffy'],
        'jujutsu-kaisen': ['yuji-itadori'],
        'naruto': ['naruto-uzumaki'],
        'demon-slayer': ['tanjiro-kamado-human', 'tanjiro-kamado-demon-king'],
        'bleach': ['ichigo-kurosaki'],
        'hunter-x-hunter': ['gon-freecss'],
        'dragon-ball': ['son-goku'],
        'black-clover': ['asta'],
        'fairy-tail': ['natsu-dragneel'],
        'boku-no-hero': ['izuku-midoriya'],
        'my-hero-academia': ['izuku-midoriya'],
        'tokyo-ghoul': ['ken-kaneki'],
        'attack-on-titan': ['eren-yeager'],
        'solo-leveling': ['sung-jinwoo'],
      };
      const allowedProtagonists = protagonistMap[currentAnimeSlug] || [];
      if (allowedProtagonists.includes(guessedChar.id)) {
        const key = 'animedle_protagonist_first_guesses';
        const currentCount = parseInt(localStorage.getItem(key) || '0', 10) + 1;
        localStorage.setItem(key, currentCount.toString());
        if (currentCount >= 3) {
          unlockAchievement('secret_hype_blind');
        }
      }
    }

    // 2. Na Trave: Chutar um personagem que compartilha quase todos os atributos com o alvo (não sendo ele mesmo)
    if (!isCorrect && currentMode === 'classic') {
      const matchEntries = Object.values(matches);
      if (matchEntries.length >= 3) {
        const correctCount = matchEntries.filter((m) => m.status === 'correct').length;
        const requiredCorrect = Math.max(2, matchEntries.length - 2);
        if (correctCount >= requiredCorrect) {
          unlockAchievement('secret_hit_post');
        }
      }
    }

    // 3. Puro Caos: Realizar 2 palpites consecutivos onde todas as características deram vermelho (0% de acerto)
    if (!isCorrect && currentMode === 'classic') {
      const matchEntries = Object.values(matches);
      const isAllRed = matchEntries.length > 0 && matchEntries.every((m) => m.status === 'incorrect');
      const redStreakKey = 'animedle_consecutive_all_red_guesses';
      if (isAllRed) {
        const streak = parseInt(sessionStorage.getItem(redStreakKey) || '0', 10) + 1;
        sessionStorage.setItem(redStreakKey, streak.toString());
        if (streak >= 2) {
          unlockAchievement('secret_pure_chaos');
        }
      } else {
        sessionStorage.setItem(redStreakKey, '0');
      }
    }

    if (isCorrect) {
      if (isCurrentEndless) {
        setEndlessStreak((s) => {
          const next = s + 1;
          localStorage.setItem(`animedle_endless_streak_${currentAnimeSlug}`, next.toString());
          if (next >= 5) unlockAchievement('endless_streak_5');
          if (next >= 10) unlockAchievement('endless_streak_10');
          return next;
        });
      }

      setShowVictoryModal(true);

      if (!isCurrentEndless) {
        const updated = updateGlobalStatsOnOutcome('win');
        setStats(updated);
      }
    } else if (isDefeat) {
      const updated = updateGlobalStatsOnOutcome('defeat');
      setStats(updated);
      setShowVictoryModal(true);
    }
  };

  // Solicita confirmação antes de desistir
  const handleRequestSurrender = () => {
    if (isFinished) return;
    setShowSurrenderConfirm(true);
  };

  // Função ao Confirmar Desistência
  const handleConfirmSurrender = () => {
    if (isFinished) return;
    setShowSurrenderConfirm(false);

    if (isCurrentEndless) {
      setEndlessStreak(0);
      localStorage.setItem(`animedle_endless_streak_${currentAnimeSlug}`, '0');
    }

    setModeStates((prev) => ({
      ...prev,
      [currentMode]: {
        ...prev[currentMode],
        isWon: false,
        isSurrendered: true,
      },
    }));

    if (!isCurrentEndless) {
      const todayStr = getDailyDateString();
      const savedKey = `animedle_progress_${currentAnimeSlug}_${currentMode}_${todayStr}`;
      localStorage.setItem(
        savedKey,
        JSON.stringify({ guesses: currentGuesses, isWon: false, isSurrendered: true })
      );

      // Reseta estritamente a sequência para 0 e incrementa partidas jogadas (sem vitória!)
      const updated = updateGlobalStatsOnOutcome('surrender');
      setStats(updated);
    }

    setShowVictoryModal(true);
  };

  // Próximo desafio no Modo Treino/Infinito consumindo baralho persistente sem repetição
  const handleNextEndlessChallenge = () => {
    const poolSize = currentMode === 'ability'
      ? abilityPool.length
      : currentMode === 'voice'
      ? voiceChallenges.length
      : currentMode === 'scene'
      ? sceneChallenges.length
      : characters.length;

    if (poolSize <= 1) {
      setEndlessTargetIndex(0);
      setModeStates((prev) => ({
        ...prev,
        [currentMode]: { guesses: [], isWon: false, isSurrendered: false },
      }));
      setShowVictoryModal(false);
      return;
    }

    const nextIdx = getOrAdvanceEndlessIndex(currentAnimeSlug, currentMode, poolSize, true);
    setEndlessTargetIndex(nextIdx);
    setModeStates((prev) => ({
      ...prev,
      [currentMode]: { guesses: [], isWon: false, isSurrendered: false },
    }));
    setShowVictoryModal(false);
  };

  // Resetar (dev)
  const handleResetDaily = () => {
    if (isCurrentEndless) {
      handleNextEndlessChallenge();
      return;
    }

    const todayStr = getDailyDateString();
    const savedKey = `animedle_progress_${currentAnimeSlug}_${currentMode}_${todayStr}`;
    localStorage.removeItem(savedKey);

    const poolSize = currentMode === 'ability'
      ? abilityPool.length
      : currentMode === 'voice'
      ? voiceChallenges.length
      : currentMode === 'scene'
      ? sceneChallenges.length
      : characters.length;
    let randomOffset = Math.floor(Math.random() * poolSize);

    // Se for modo sem repetição ('classic', 'wanted', 'zoom'), evitar colisão com os outros modos vinculados
    if (['classic', 'wanted', 'zoom'].includes(currentMode) && characters.length >= 3) {
      const otherModes = (['classic', 'wanted', 'zoom'] as GameMode[]).filter(m => m !== currentMode);
      const otherIndices = otherModes.map(m => {
        const base = getDailyCharacterIndex(currentAnimeSlug, m, characters.length);
        return (base + (devOffsets[m] || 0)) % characters.length;
      });

      let attempts = 0;
      let candidateIndex = (baseDailyIndex + randomOffset) % poolSize;
      while (otherIndices.includes(candidateIndex) && attempts < poolSize) {
        randomOffset = (randomOffset + 1) % poolSize;
        candidateIndex = (baseDailyIndex + randomOffset) % poolSize;
        attempts++;
      }
    }

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
    <div className="min-h-screen bg-transparent text-[#F5F7FF] flex flex-col font-sans relative overflow-x-hidden">
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
        onGoHome={onNavigateHome}
        onOpenHowToPlay={() => setShowHowToPlay(true)}
        onOpenStats={() => setShowStats(true)}
        onResetDaily={handleResetDaily}
      />

      {/* Conteúdo Principal — Largura Otimizada (max-w-[1440px]) */}
      <main className="flex-1 max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto py-8 pb-36 z-10">
        
        {/* Hero Header com a Logo Oficial do Anime */}
        <div className="text-center my-4 flex flex-col items-center">
          {/* Logo Oficial do Anime da pasta /logos/ */}
          <div className="mb-2 flex justify-center items-center">
            <picture className="flex justify-center items-center">
              <source srcSet={`/logos/${currentAnimeSlug}.webp`} type="image/webp" />
              <img
                src={`/logos/${currentAnimeSlug}.png`}
                alt={`${animeConfig.title} Logo`}
                fetchPriority="high"
                decoding="async"
                className="h-24 sm:h-28 md:h-36 w-auto max-w-[280px] sm:max-w-[360px] object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  if (animeConfig.logo && (e.currentTarget as HTMLImageElement).src !== animeConfig.logo) {
                    (e.currentTarget as HTMLImageElement).src = animeConfig.logo;
                  } else {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }
                }}
              />
            </picture>
          </div>

          <div className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl bg-[#060b18]/75 backdrop-blur-md border border-white/10 shadow-2xl mb-1 mt-1 max-w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Adivinhe o Personagem de{' '}
              <span
                style={{
                  color: animeConfig.themeColor,
                  textShadow: `0 0 20px ${animeConfig.themeColor}88, 0 2px 4px rgba(0,0,0,0.95)`,
                }}
              >
                {animeConfig.title}
              </span>
            </h2>
          </div>
          {animeConfig.mangaCoverage && (
            <div className="mt-2.5 flex items-center justify-center">
              <button
                onClick={() => setShowMangaCoverage(true)}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1426]/90 hover:bg-[#111a2d] border border-[#202b43] hover:border-slate-500/50 text-slate-300 hover:text-white text-xs font-semibold shadow-md transition-all active:scale-95"
                title="Ver detalhes de canonicidade e cobertura do mangá"
              >
                <BookOpen size={13} style={{ color: animeConfig.themeColor }} />
                <span>
                  {animeConfig.mangaCoverage.status === 'Finalizado'
                    ? `Mangá Finalizado • Cap. ${animeConfig.mangaCoverage.chapter}`
                    : `Atualizado até o Cap. ${animeConfig.mangaCoverage.chapter}`}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 group-hover:text-slate-200">
                  Canônico
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Abas de Modos de Jogo */}
        <GameModeTabs
          currentMode={currentMode}
          onSelectMode={handleSelectMode}
          themeColor={animeConfig.themeColor}
          currentAnimeSlug={currentAnimeSlug}
        />

        {/* Card Padrão de Cabeçalho do Modo (Nome, Ícone, Descrição e Alternador Diário / Infinito) */}
        {currentMode === 'classic' && (
          <ModeHeaderCard
            title="Modo Clássico"
            description="Adivinhe o personagem misterioso recebendo pistas sobre seus atributos a cada tentativa."
            icon={<Sparkles size={20} />}
            themeColor={animeConfig.themeColor}
            isEndless={isCurrentEndless}
            onToggleEndless={(val) => handleToggleEndless('classic', val)}
          />
        )}

        {currentMode === 'wanted' && (
          <ModeHeaderCard
            title="Modo Procurado"
            description="Quem é este personagem? A foto fica mais nítida a cada tentativa errada!"
            icon={<Eye size={20} />}
            themeColor={animeConfig.themeColor}
            isEndless={isCurrentEndless}
            onToggleEndless={(val) => handleToggleEndless('wanted', val)}
          />
        )}

        {currentMode === 'scene' && (
          <ModeHeaderCard
            title="Modo Cena"
            description="Quem é o personagem executando esta técnica? A cena desfoque a cada tentativa errada!"
            icon={<Film size={20} />}
            themeColor={animeConfig.themeColor}
            isEndless={isCurrentEndless}
            onToggleEndless={(val) => handleToggleEndless('scene', val)}
          />
        )}

        {currentMode === 'voice' && (
          <ModeHeaderCard
            title="Modo Voz & Som"
            description="Ouça a atuação vocal e adivinhe o dono da voz original do anime!"
            icon={<Volume2 size={20} />}
            themeColor={animeConfig.themeColor}
            isEndless={isCurrentEndless}
            onToggleEndless={(val) => handleToggleEndless('voice', val)}
          />
        )}

        {currentMode === 'zoom' && (
          <ModeHeaderCard
            title="Modo Zoom (Olhos & Detalhes)"
            description="A foto do personagem está com zoom extremo! O zoom diminui a cada erro."
            icon={<ZoomIn size={20} />}
            themeColor={animeConfig.themeColor}
            isEndless={isCurrentEndless}
            onToggleEndless={(val) => handleToggleEndless('zoom', val)}
          />
        )}

        {/* Quadro de Dicas & Botão Desistir */}
        {currentMode !== 'ability' && currentMode !== 'grid' && (
          <HintBox
            targetCharacter={targetCharacter}
            guessCount={currentGuesses.length}
            isWon={isFinished}
            onSurrender={handleRequestSurrender}
            disabled={isFinished}
            currentMode={currentMode}
            currentAnimeSlug={currentAnimeSlug}
          />
        )}

        {/* Botão Discreto para Reabrir o Modal de Resultado quando fechado */}
        {isFinished && !showVictoryModal && currentMode !== 'ability' && currentMode !== 'grid' && (
          <div className="max-w-md mx-auto my-4 text-center animate-fadeIn">
            <button
              onClick={() => setShowVictoryModal(true)}
              style={{ backgroundColor: animeConfig.themeColor }}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-white text-xs font-black rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 hover:opacity-90"
            >
              <span>{currentIsWon ? '🏆 Ver Painel de Vitória' : '💀 Ver Personagem Secreto'}</span>
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
          <div className="max-w-xl mx-auto text-center my-6 p-6 bg-[#0d1426] border border-[#202b43] rounded-3xl shadow-xl relative overflow-hidden">
            {/* Brilho decorativo no fundo */}
            <div
              className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: animeConfig.themeColor }}
            />

            {/* Cabeçalho do Card Centralizado */}
            <div className="flex flex-col items-center justify-center text-center mb-5 relative">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                  style={{ backgroundColor: animeConfig.themeColor }}
                >
                  <Eye size={18} />
                </div>
                <span className="text-sm uppercase font-black tracking-wider text-white">
                  Modo Procurado
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium max-w-md mx-auto">
                Quem é este personagem? A foto fica mais nítida a cada tentativa errada!
              </p>
            </div>

            <div className="w-48 h-48 mx-auto my-4 rounded-full overflow-hidden border-4 border-[#202b43] bg-[#111a2d] relative flex items-center justify-center shadow-2xl">
              <ObfuscatedMysteryAvatar
                avatarUrl={targetCharacter.avatar}
                mode="wanted"
                blurAmount={blurAmount}
                isRevealed={isFinished}
                className="w-full h-full"
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

        {/* MODO CENA & JUTSU */}
        {currentMode === 'scene' && currentSceneChallenge && (
          <div className="max-w-xl mx-auto text-center my-6">
            <ScenePlayerCard
              challenge={currentSceneChallenge}
              guessCount={currentGuesses.length}
              isWon={isFinished}
              themeColor={animeConfig.themeColor}
            />

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

        {/* MODO VOZ & SOM */}
        {currentMode === 'voice' && currentVoiceChallenge && (
          <div className="max-w-xl mx-auto text-center my-6">
            <VoicePlayerCard
              challenge={currentVoiceChallenge}
              isWon={isFinished}
              themeColor={animeConfig.themeColor}
            />

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

        {/* MODO HABILIDADE / MODOS EXCLUSIVOS */}
        {currentMode === 'ability' && (
          <ExclusiveAnimeMode
            key={`${currentAnimeSlug}-${currentMode}`}
            animeSlug={currentAnimeSlug}
            animeTitle={animeConfig.title}
            characters={characters}
            themeColor={animeConfig.themeColor}
            onGlobalStatsChange={(newStats) => setStats(newStats)}
          />
        )}

        {/* MODO ZOOM / OLHOS */}
        {currentMode === 'zoom' && (
          <div className="max-w-xl mx-auto text-center my-6 p-6 bg-[#0d1426] border border-[#202b43] rounded-3xl shadow-xl relative overflow-hidden">
            {/* Brilho decorativo no fundo */}
            <div
              className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: animeConfig.themeColor }}
            />

            {/* Cabeçalho do Card Centralizado */}
            <div className="flex flex-col items-center justify-center text-center mb-5 relative">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                  style={{ backgroundColor: animeConfig.themeColor }}
                >
                  <ZoomIn size={18} />
                </div>
                <span className="text-sm uppercase font-black tracking-wider text-white">
                  Modo Zoom (Olhos & Detalhes)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium max-w-md mx-auto">
                A foto do personagem está com zoom extremo! O zoom diminui a cada erro.
              </p>
            </div>

            {zoomScale === 1 && !isFinished && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-black mb-3 animate-pulse">
                <span>⚠️ Zoom 1x atingido! Restam {Math.max(0, 8 - currentGuesses.length)} de 3 chances antes da derrota!</span>
              </div>
            )}
            
            <div className="w-52 h-52 mx-auto my-4 rounded-full overflow-hidden border-4 border-[#202b43] bg-[#111a2d] relative flex items-center justify-center shadow-2xl">
              <ObfuscatedMysteryAvatar
                avatarUrl={targetCharacter.avatar}
                mode="zoom"
                zoomScale={zoomScale}
                isRevealed={isFinished}
                className="w-full h-full"
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

        {/* MODO GRID 3x3 */}
        {currentMode === 'grid' && (
          <AnimeGridMode
            key={`grid-${currentAnimeSlug}`}
            characters={characters}
            themeColor={animeConfig.themeColor}
            animeTitle={animeConfig.title}
            animeSlug={currentAnimeSlug}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#202b43]/60 py-6 text-center text-xs text-slate-500 relative z-0">
        <p>AnimeDLE © 2026 • Feito por Reskalla</p>
      </footer>

      {/* Modal Universal de Confirmação de Desistência */}
      <SurrenderConfirmModal
        isOpen={showSurrenderConfirm}
        onClose={() => setShowSurrenderConfirm(false)}
        onConfirm={handleConfirmSurrender}
        modeName={
          currentMode === 'classic'
            ? 'Modo Clássico'
            : currentMode === 'wanted'
            ? 'Modo Procurado'
            : currentMode === 'voice'
            ? 'Modo Voz'
            : currentMode === 'zoom'
            ? 'Modo Zoom'
            : 'Desafio'
        }
      />

      {/* Modais */}
      {showVictoryModal && (
        <VictoryModal
          targetCharacter={targetCharacter}
          totalGuesses={currentGuesses.length}
          stats={stats}
          isSurrendered={currentIsSurrendered}
          isLost={currentIsLost}
          onClose={() => setShowVictoryModal(false)}
          onNext={isCurrentEndless ? handleNextEndlessChallenge : undefined}
          nextButtonLabel={isFinished ? 'Próximo Personagem' : undefined}
          themeColor={animeConfig.themeColor}
          animeTitle={animeConfig.title}
          animeSlug={currentAnimeSlug}
          currentMode={currentMode}
        />
      )}

      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
      {showStats && (
        <StatsModal
          stats={(() => {
            try {
              const s = localStorage.getItem('animedle_stats');
              return s ? JSON.parse(s) : stats;
            } catch {
              return stats;
            }
          })()}
          onClose={() => setShowStats(false)}
          themeColor={animeConfig.themeColor}
        />
      )}
      {showMangaCoverage && (
        <MangaCoverageModal
          animeConfig={animeConfig}
          onClose={() => setShowMangaCoverage(false)}
        />
      )}

      {/* Notificação Flutuante de Conquistas */}
      <AchievementToast />
    </div>
  );
};

export default App;
