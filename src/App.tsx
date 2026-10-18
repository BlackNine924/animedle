import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { GameModeTabs } from './components/GameModeTabs';
import { CharacterSearchInput } from './components/CharacterSearchInput';
import { ClassicGrid } from './components/ClassicGrid';
import { SimpleGuessList } from './components/SimpleGuessList';
import { VictoryModal } from './components/VictoryModal';
import { HintBox } from './components/HintBox';
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
import { Sparkles, Eye, Zap, ZoomIn, Volume2, Film, LayoutGrid, BookOpen, Swords, Award } from 'lucide-react';
import { SpeedrunArena } from './components/SpeedrunArena';

// T1: Lazy Loading de Modais e Modos Pesados para reduzir drasticamente o bundle inicial (index.js)
const HowToPlayModal = React.lazy(() => import('./components/HowToPlayModal').then((m) => ({ default: m.HowToPlayModal })));
const StatsModal = React.lazy(() => import('./components/StatsModal').then((m) => ({ default: m.StatsModal })));
const MangaCoverageModal = React.lazy(() => import('./components/MangaCoverageModal').then((m) => ({ default: m.MangaCoverageModal })));
const SceneGalleryModal = React.lazy(() => import('./components/SceneGalleryModal').then((m) => ({ default: m.SceneGalleryModal })));
const ExclusiveAnimeMode = React.lazy(() => import('./components/ExclusiveAnimeMode').then((m) => ({ default: m.ExclusiveAnimeMode })));
const AnimeGridMode = React.lazy(() => import('./components/AnimeGridMode').then((m) => ({ default: m.AnimeGridMode })));
const HigherOrLowerModal = React.lazy(() => import('./components/HigherOrLowerModal').then((m) => ({ default: m.HigherOrLowerModal })));
const AnimeConnectionsMode = React.lazy(() => import('./components/AnimeConnectionsMode').then((m) => ({ default: m.AnimeConnectionsMode })));
const MasteryModal = React.lazy(() => import('./components/MasteryModal').then((m) => ({ default: m.MasteryModal })));
import {
  SurvivalState,
  getSurvivalState,
  toggleSurvivalMode,
  recordSurvivalWin,
  recordSurvivalLoss,
  resetSurvivalRun,
  FriendChallengeData,
  encodeFriendChallengeUrl,
  decodeFriendChallengeFromUrl,
  clearChallengeQueryParam,
  getAnimeMastery,
  awardAnimeXp,
  AnimeMasteryInfo,
} from './utils/featuresManager';


export const App: React.FC<{
  animeSlug: string;
  charactersData: Character[];
  onNavigateHome: () => void;
  onNavigateToAnime: (slug: string) => void;
}> = ({ animeSlug: currentAnimeSlug, charactersData, onNavigateHome, onNavigateToAnime }) => {
  // F2: Detecta código de desafio de amigo na URL (?challenge=...)
  const [activeFriendChallenge, setActiveFriendChallenge] = useState<FriendChallengeData | null>(() => {
    const decoded = decodeFriendChallengeFromUrl();
    if (decoded && decoded.a === currentAnimeSlug) {
      return decoded;
    }
    return null;
  });

  const [currentMode, setCurrentMode] = useState<GameMode>(() => {
    const decoded = decodeFriendChallengeFromUrl();
    if (decoded && decoded.a === currentAnimeSlug && decoded.m) {
      return decoded.m;
    }
    const pendingMode = sessionStorage.getItem('animedle_pending_initial_mode') as GameMode | null;
    if (pendingMode) {
      sessionStorage.removeItem('animedle_pending_initial_mode');
      return pendingMode;
    }
    return 'classic';
  });

  // Controle de Modo Infinito por Modo de Jogo
  const [endlessByMode, setEndlessByMode] = useState<Record<GameMode, boolean>>(() => {
    const decoded = decodeFriendChallengeFromUrl();
    const initialMode = decoded && decoded.a === currentAnimeSlug ? decoded.m : null;
    return {
      classic: initialMode === 'classic',
      wanted: initialMode === 'wanted',
      ability: initialMode === 'ability',
      zoom: initialMode === 'zoom',
      voice: initialMode === 'voice',
      grid: initialMode === 'grid',
      scene: initialMode === 'scene',
      higherlower: false,
      connections: initialMode === 'connections',
    };
  });

  const isCurrentEndless = endlessByMode[currentMode] || false;

  // N5: Controle de Sub-modo Speedrun por Modo de Jogo
  const [speedrunByMode, setSpeedrunByMode] = useState<Record<GameMode, boolean>>({
    classic: false,
    wanted: false,
    ability: false,
    zoom: false,
    voice: false,
    grid: false,
    scene: false,
    higherlower: false,
    connections: false,
  });

  const isCurrentSpeedrun = speedrunByMode[currentMode] || false;

  // S3: Estado do Nível de Maestria do Anime
  const [masteryInfo, setMasteryInfo] = useState<AnimeMasteryInfo>(() =>
    getAnimeMastery(currentAnimeSlug)
  );

  useEffect(() => {
    setMasteryInfo(getAnimeMastery(currentAnimeSlug));
    const handleMasteryUpdated = () => setMasteryInfo(getAnimeMastery(currentAnimeSlug));
    window.addEventListener('animedle_mastery_updated', handleMasteryUpdated);
    return () => window.removeEventListener('animedle_mastery_updated', handleMasteryUpdated);
  }, [currentAnimeSlug]);

  // U2: Atalhos Rápidos de Teclado (/ ou S para focar na barra de busca de personagem)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }
      if (e.key === '/' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('animedle_focus_search_input'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // E2: Estado do Modo Sobrevivência para o modo ativo
  const [survivalState, setSurvivalState] = useState<SurvivalState>(() =>
    getSurvivalState(currentAnimeSlug, currentMode)
  );
  const [survivalHealed, setSurvivalHealed] = useState<boolean>(false);

  useEffect(() => {
    setSurvivalState(getSurvivalState(currentAnimeSlug, currentMode));
    setSurvivalHealed(false);
  }, [currentAnimeSlug, currentMode]);

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
    higherlower: 0,
    connections: 0,
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

  // Sincroniza o índice do Modo Infinito via baralho persistente sem repetição (ou Desafio de Amigo F2)
  React.useEffect(() => {
    if (targetPoolSize > 0) {
      if (activeFriendChallenge && activeFriendChallenge.a === currentAnimeSlug && activeFriendChallenge.m === currentMode) {
        if (activeFriendChallenge.cid) {
          if (currentMode === 'scene') {
            const idx = sceneChallenges.findIndex((s) => s.id === activeFriendChallenge.cid || s.characterId === activeFriendChallenge.cid);
            if (idx >= 0) {
              setEndlessTargetIndex(idx);
              return;
            }
          } else if (currentMode === 'voice') {
            const idx = voiceChallenges.findIndex((v) => v.id === activeFriendChallenge.cid || v.characterId === activeFriendChallenge.cid);
            if (idx >= 0) {
              setEndlessTargetIndex(idx);
              return;
            }
          } else {
            const idx = characters.findIndex((c) => c.id === activeFriendChallenge.cid);
            if (idx >= 0) {
              setEndlessTargetIndex(idx);
              return;
            }
          }
        }
        setEndlessTargetIndex((activeFriendChallenge.t ?? 0) % targetPoolSize);
        return;
      }
      const currentIdx = getOrAdvanceEndlessIndex(currentAnimeSlug, currentMode, targetPoolSize, false);
      setEndlessTargetIndex(currentIdx);
    }
  }, [currentAnimeSlug, currentMode, targetPoolSize, activeFriendChallenge, characters, sceneChallenges, voiceChallenges]);

  // A4: Listener para navegação automática do botão "Próximo Modo Pendente" / "Próximo Anime"
  useEffect(() => {
    const handleNavigateDest = (e: Event) => {
      const detail = (e as CustomEvent<{ type: 'mode' | 'anime' | 'home'; mode?: GameMode; animeSlug?: string }>).detail;
      if (!detail) return;
      setShowVictoryModal(false);
      if (detail.type === 'mode' && detail.mode) {
        setEndlessByMode((prev) => ({ ...prev, [detail.mode!]: false }));
        setCurrentMode(detail.mode);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (detail.type === 'anime' && detail.animeSlug) {
        if (detail.mode) {
          sessionStorage.setItem('animedle_pending_initial_mode', detail.mode);
        }
        handleSelectAnime(detail.animeSlug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (detail.type === 'home') {
        onNavigateHome();
      }
    };
    window.addEventListener('animedle_navigate_destination', handleNavigateDest);
    return () => window.removeEventListener('animedle_navigate_destination', handleNavigateDest);
  }, [currentAnimeSlug, onNavigateHome]);
  
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


  // T2: Smart Background Prefetch de Mídia (Avatar do Personagem Secreto e Cena do Dia)
  useEffect(() => {
    const urlsToPrefetch: string[] = [];
    if (targetCharacter?.avatar) {
      urlsToPrefetch.push(targetCharacter.avatar);
    }
    const dailyScene = sceneChallenges.length > 0 ? sceneChallenges[dailyIndex % sceneChallenges.length] : null;
    if (dailyScene?.videoUrl) {
      urlsToPrefetch.push(dailyScene.videoUrl);
    }
    urlsToPrefetch.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [currentAnimeSlug, targetCharacter?.avatar, sceneChallenges, dailyIndex]);

  // Armazenamento de estado independente por modo no Modo Diário
  const [dailyModeStates, setDailyModeStates] = useState<Record<GameMode, { guesses: GuessResult[]; isWon: boolean; isSurrendered?: boolean; isLost?: boolean }>>({
    classic: { guesses: [], isWon: false },
    wanted: { guesses: [], isWon: false },
    ability: { guesses: [], isWon: false },
    zoom: { guesses: [], isWon: false },
    voice: { guesses: [], isWon: false },
    grid: { guesses: [], isWon: false },
    scene: { guesses: [], isWon: false },
    higherlower: { guesses: [], isWon: false },
    connections: { guesses: [], isWon: false },
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
    higherlower: { guesses: [], isWon: false },
    connections: { guesses: [], isWon: false },
  });

  const modeStates = isCurrentEndless ? endlessModeStates : dailyModeStates;
  const setModeStates = isCurrentEndless ? setEndlessModeStates : setDailyModeStates;

  // Modais
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showSurrenderConfirm, setShowSurrenderConfirm] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [showMangaCoverage, setShowMangaCoverage] = useState<boolean>(false);
  const [showSceneGallery, setShowSceneGallery] = useState<boolean>(false);
  const [showMasteryModal, setShowMasteryModal] = useState<boolean>(false);

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
      higherlower: { guesses: [], isWon: false },
      connections: { guesses: [], isWon: false },
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
            isSurrendered: parsed.isLost ? false : (parsed.isSurrendered || false),
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

    // No modo procurado (Wanted) e no modo Zoom, a imagem fica 100% revelada no 4º erro (4 palpites errados).
    // A partir daí restam 3 chances (4 erros -> 3 de 3, 5 erros -> 2 de 3, 6 erros -> 1 de 3), com derrota no 7º erro!
    const isWantedLoss = currentMode === 'wanted' && !isCorrect && currentGuesses.length >= 6;
    const isZoomLoss = currentMode === 'zoom' && !isCorrect && currentGuesses.length >= 6;
    // No modo cena, o borrão zera no 4º erro (0px). Dica 1 no 2º erro, Dica 2 no 4º erro e Dica 3 no 6º erro. Derrota apenas no 8º erro!
    const isSceneLoss = currentMode === 'scene' && !isCorrect && currentGuesses.length >= 7;
    // No Modo Sobrevivência (E2) dentro do Modo Clássico ou Voz, há limite de 10 erros por rodada para contar perda de 1 ❤️
    const isSurvivalClassicOrVoiceLoss =
      isCurrentEndless &&
      survivalState.active &&
      (currentMode === 'classic' || currentMode === 'voice') &&
      !isCorrect &&
      currentGuesses.length >= 9;
    const isDefeat = isWantedLoss || isZoomLoss || isSceneLoss || isSurvivalClassicOrVoiceLoss;
    const isSurrenderedState = false;

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
      awardAnimeXp(
        currentAnimeSlug,
        isCurrentEndless ? 20 : 35,
        !isCurrentEndless ? `daily_${currentAnimeSlug}_${currentMode}_${getDailyDateString()}` : undefined
      );
      if (isCurrentEndless) {
        setEndlessStreak((s) => {
          const next = s + 1;
          localStorage.setItem(`animedle_endless_streak_${currentAnimeSlug}`, next.toString());
          if (next >= 5) unlockAchievement('endless_streak_5');
          if (next >= 10) unlockAchievement('endless_streak_10');
          return next;
        });
        if (survivalState.active) {
          const { state: nextSurv, healedHeart: healed } = recordSurvivalWin(currentAnimeSlug, currentMode);
          setSurvivalState(nextSurv);
          setSurvivalHealed(healed);
        }
      }

      setShowVictoryModal(true);

      if (!isCurrentEndless) {
        const updated = updateGlobalStatsOnOutcome('win');
        setStats(updated);
      }
    } else if (isDefeat) {
      if (isCurrentEndless) {
        setEndlessStreak(0);
        localStorage.setItem(`animedle_endless_streak_${currentAnimeSlug}`, '0');
        if (survivalState.active) {
          const { state: nextSurv } = recordSurvivalLoss(currentAnimeSlug, currentMode);
          setSurvivalState(nextSurv);
          setSurvivalHealed(false);
        }
      } else {
        const updated = updateGlobalStatsOnOutcome('defeat');
        setStats(updated);
      }
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
      if (survivalState.active) {
        const { state: nextSurv } = recordSurvivalLoss(currentAnimeSlug, currentMode);
        setSurvivalState(nextSurv);
        setSurvivalHealed(false);
      }
    }

    setModeStates((prev) => ({
      ...prev,
      [currentMode]: {
        ...prev[currentMode],
        isWon: false,
        isSurrendered: true,
        isLost: false,
      },
    }));

    if (!isCurrentEndless) {
      const todayStr = getDailyDateString();
      const savedKey = `animedle_progress_${currentAnimeSlug}_${currentMode}_${todayStr}`;
      localStorage.setItem(
        savedKey,
        JSON.stringify({ guesses: currentGuesses, isWon: false, isSurrendered: true, isLost: false })
      );

      // Reseta estritamente a sequência para 0 e incrementa partidas jogadas (sem vitória!)
      const updated = updateGlobalStatsOnOutcome('surrender');
      setStats(updated);
    }

    setShowVictoryModal(true);
  };

  // Próximo desafio no Modo Treino/Infinito consumindo baralho persistente sem repetição
  const handleNextEndlessChallenge = () => {
    setSurvivalHealed(false);
    if (activeFriendChallenge) {
      setActiveFriendChallenge(null);
      clearChallengeQueryParam();
    }
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
        [currentMode]: { guesses: [], isWon: false, isSurrendered: false, isLost: false },
      }));
      setShowVictoryModal(false);
      return;
    }

    const nextIdx = getOrAdvanceEndlessIndex(currentAnimeSlug, currentMode, poolSize, true);
    setEndlessTargetIndex(nextIdx);
    setModeStates((prev) => ({
      ...prev,
      [currentMode]: { guesses: [], isWon: false, isSurrendered: false, isLost: false },
    }));
    setShowVictoryModal(false);

    // 10.4: Foco automático no input ao avançar no Modo Infinito
    window.dispatchEvent(new CustomEvent('animedle_focus_search_input'));
  };

  const handleToggleEndless = (mode: GameMode, val: boolean) => {
    setSpeedrunByMode((prev) => ({ ...prev, [mode]: false }));
    setEndlessByMode((prev) => ({
      ...prev,
      [mode]: val,
    }));
    setShowVictoryModal(false);
    if (!val && survivalState.active) {
      const nextSurv = toggleSurvivalMode(currentAnimeSlug, mode, false);
      setSurvivalState(nextSurv);
      setSurvivalHealed(false);
    }

    if (val) {
      // Temporário: Sempre avança para o próximo desafio ao ligar/clicar no modo infinito, facilitando a navegação
      handleNextEndlessChallenge();
    }
  };

  const handleToggleSurvival = (mode: GameMode, active: boolean) => {
    setSpeedrunByMode((prev) => ({ ...prev, [mode]: false }));
    if (active && !endlessByMode[mode]) {
      setEndlessByMode((prev) => ({ ...prev, [mode]: true }));
    }
    const nextSurv = toggleSurvivalMode(currentAnimeSlug, mode, active);
    setSurvivalState(nextSurv);
    setSurvivalHealed(false);
    setShowVictoryModal(false);
    if (active) {
      handleNextEndlessChallenge();
    }
  };

  const handleToggleSpeedrun = (mode: GameMode, active: boolean) => {
    setSpeedrunByMode((prev) => ({ ...prev, [mode]: active }));
    setShowVictoryModal(false);
  };

  const handleRestartSurvival = () => {
    const fresh = resetSurvivalRun(currentAnimeSlug, currentMode);
    setSurvivalState(fresh);
    setSurvivalHealed(false);
    handleNextEndlessChallenge();
  };

  // F2: Gera URL de Desafio de Amigo para o desafio atual
  const handleChallengeFriend = (): string => {
    const currentIdx = isCurrentEndless ? endlessTargetIndex : dailyIndex;
    const cid =
      currentMode === 'scene' && currentSceneChallenge
        ? currentSceneChallenge.id
        : currentMode === 'voice' && currentVoiceChallenge
        ? currentVoiceChallenge.id
        : targetCharacter?.id;

    return encodeFriendChallengeUrl({
      a: currentAnimeSlug,
      m: currentMode,
      t: currentIdx,
      cid,
      s: isFinished
        ? {
            w: currentIsWon ? 1 : 0,
            g: currentGuesses.length,
          }
        : undefined,
    });
  };

  const handleSendRevenge = () => {
    const poolSize =
      currentMode === 'scene'
        ? sceneChallenges.length
        : currentMode === 'voice'
        ? voiceChallenges.length
        : characters.length;
    const nextIdx = getOrAdvanceEndlessIndex(currentAnimeSlug, currentMode, Math.max(1, poolSize), true);
    setEndlessByMode((prev) => ({ ...prev, [currentMode]: true }));
    setEndlessTargetIndex(nextIdx);
    setActiveFriendChallenge(null);
    clearChallengeQueryParam();
    setModeStates((prev) => ({
      ...prev,
      [currentMode]: { guesses: [], isWon: false, isSurrendered: false, isLost: false },
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
        isLost: false,
      },
    }));
    setShowVictoryModal(false);
  };

  // Nível de Desfoco no Modo Procurado (zera no 4º erro)
  const blurAmount = Math.max(0, 24 - currentGuesses.length * 6);

  // Nível de Zoom no Modo Olhos/Zoom (atinge 1x no 4º erro, igualando o ciclo de 3 chances finais ao Procurado)
  const zoomScale = isFinished ? 1 : Math.max(1, 3.5 - currentGuesses.length * 0.625);

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
        onOpenSceneGallery={() => setShowSceneGallery(true)}
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
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
            {/* S3: Badge Clicável de Nível de Maestria por Anime com Título Canônico e Barra de XP */}
            <button
              type="button"
              onClick={() => setShowMasteryModal(true)}
              className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0d1426]/95 hover:bg-[#131d36] border border-amber-500/35 hover:border-amber-400/70 text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
              title={`Clique para ver todos os títulos canônicos de ${animeConfig.title} • Nível ${masteryInfo.level} (${masteryInfo.title})`}
            >
              <Award size={14} className="text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-amber-300 font-black">Nv.{masteryInfo.level}</span>
              <span className="text-white font-bold group-hover:text-amber-200 transition-colors">{masteryInfo.title}</span>
              <div className="w-14 sm:w-16 h-1.5 bg-[#162138] rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${masteryInfo.progressPct}%`, backgroundColor: animeConfig.themeColor }}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-200">
                {masteryInfo.currentLevelXp}/{masteryInfo.nextLevelXp} XP
              </span>
            </button>

            {animeConfig.mangaCoverage && (
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
            )}
          </div>
        </div>

        {/* Abas de Modos de Jogo */}
        <GameModeTabs
          currentMode={currentMode}
          onSelectMode={handleSelectMode}
          themeColor={animeConfig.themeColor}
          currentAnimeSlug={currentAnimeSlug}
        />

        {/* Card Padrão de Cabeçalho do Modo (Nome, Ícone, Descrição e Alternador Diário / Infinito / Sobrevivência / Speedrun) */}
        {currentMode === 'classic' && (
          <ModeHeaderCard
            title="Modo Clássico"
            description={
              isCurrentEndless && survivalState.active
                ? 'Modo Sobrevivência Ativo: Acerte o personagem em até 10 palpites para manter suas 3 Vidas (❤️❤️❤️)!'
                : 'Adivinhe o personagem misterioso recebendo pistas sobre seus atributos a cada tentativa.'
            }
            icon={<Sparkles size={20} />}
            themeColor={animeConfig.themeColor}
            isEndless={isCurrentEndless}
            onToggleEndless={(val) => handleToggleEndless('classic', val)}
            onNextEndless={handleNextEndlessChallenge}
            survivalState={survivalState}
            onToggleSurvival={(act) => handleToggleSurvival('classic', act)}
            isSpeedrun={isCurrentSpeedrun}
            onToggleSpeedrun={(act) => handleToggleSpeedrun('classic', act)}
            healedBanner={survivalHealed}
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
            onNextEndless={handleNextEndlessChallenge}
            survivalState={survivalState}
            onToggleSurvival={(act) => handleToggleSurvival('wanted', act)}
            isSpeedrun={isCurrentSpeedrun}
            onToggleSpeedrun={(act) => handleToggleSpeedrun('wanted', act)}
            healedBanner={survivalHealed}
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
            onNextEndless={handleNextEndlessChallenge}
            survivalState={survivalState}
            onToggleSurvival={(act) => handleToggleSurvival('scene', act)}
            isSpeedrun={isCurrentSpeedrun}
            onToggleSpeedrun={(act) => handleToggleSpeedrun('scene', act)}
            healedBanner={survivalHealed}
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
            onNextEndless={handleNextEndlessChallenge}
            survivalState={survivalState}
            onToggleSurvival={(act) => handleToggleSurvival('voice', act)}
            isSpeedrun={isCurrentSpeedrun}
            onToggleSpeedrun={(act) => handleToggleSpeedrun('voice', act)}
            healedBanner={survivalHealed}
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
            onNextEndless={handleNextEndlessChallenge}
            survivalState={survivalState}
            onToggleSurvival={(act) => handleToggleSurvival('zoom', act)}
            isSpeedrun={isCurrentSpeedrun}
            onToggleSpeedrun={(act) => handleToggleSpeedrun('zoom', act)}
            healedBanner={survivalHealed}
          />
        )}

        {/* N5: Arena Speedrun 60s adaptada ao modo selecionado (Clássico, Procurado, Cena, Zoom, etc.) */}
        {isCurrentSpeedrun &&
          ['classic', 'wanted', 'scene', 'voice', 'zoom'].includes(currentMode) && (
            <SpeedrunArena
              characters={characters}
              animeSlug={currentAnimeSlug}
              animeTitle={animeConfig.title}
              themeColor={animeConfig.themeColor}
              mode={currentMode}
              onExitSpeedrun={() => handleToggleSpeedrun(currentMode, false)}
            />
          )}

        {/* Quadro de Dicas & Botão Desistir */}
        {!isCurrentSpeedrun &&
          currentMode !== 'ability' &&
          currentMode !== 'grid' &&
          currentMode !== 'higherlower' &&
          currentMode !== 'connections' && (
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
        {!isCurrentSpeedrun &&
          isFinished &&
          !showVictoryModal &&
          currentMode !== 'ability' &&
          currentMode !== 'grid' &&
          currentMode !== 'higherlower' &&
          currentMode !== 'connections' && (
            <div className="max-w-md mx-auto my-4 flex items-center justify-center gap-3 animate-fadeIn flex-wrap">
              <button
                onClick={() => setShowVictoryModal(true)}
                style={{ backgroundColor: animeConfig.themeColor }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-xs font-black rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 hover:opacity-90"
              >
                <span>{currentIsWon ? '🏆 Ver Painel de Vitória' : '💀 Ver Personagem Secreto'}</span>
              </button>
              {isCurrentEndless && (
                <button
                  onClick={survivalState.active && survivalState.hearts <= 0 ? handleRestartSurvival : handleNextEndlessChallenge}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 hover:brightness-110"
                >
                  <span>{survivalState.active && survivalState.hearts <= 0 ? '🔥 Reiniciar Sobrevivência' : '⏩ Próximo Desafio'}</span>
                </button>
              )}
            </div>
          )}

        {/* MODO CLÁSSICO */}
        {currentMode === 'classic' && !isCurrentSpeedrun && (
          <div>
            {isCurrentEndless && survivalState.active && !isFinished && (
              <div className="max-w-md mx-auto mb-3 text-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-black">
                  🔥 Palpites na Rodada: {currentGuesses.length} / 10
                </span>
              </div>
            )}
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
        {currentMode === 'wanted' && !isCurrentSpeedrun && (
          <div>
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

              {blurAmount === 0 && !isFinished && (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-black mb-3 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.25)]">
                  <span>🚨 Imagem 100% nítida! Restam {Math.min(3, Math.max(1, 7 - currentGuesses.length))} de 3 chances antes da derrota!</span>
                </div>
              )}

              <div className={`w-48 h-48 mx-auto my-4 rounded-full overflow-hidden border-4 border-[#202b43] bg-[#111a2d] relative flex items-center justify-center shadow-2xl transition-all duration-300 ${
                blurAmount === 0 && !isFinished ? 'ring-4 ring-rose-500/80 shadow-[0_0_30px_rgba(244,63,94,0.4)] animate-pulse' : ''
              }`}>
                <ObfuscatedMysteryAvatar
                  avatarUrl={targetCharacter.avatar}
                  mode="wanted"
                  blurAmount={blurAmount}
                  isRevealed={isFinished}
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="max-w-2xl mx-auto my-6">
              <CharacterSearchInput
                characters={characters}
                guessedCharacterIds={currentGuesses.map((g) => g.character.id)}
                onSelectCharacter={handleSelectCharacter}
                disabled={isFinished}
                themeColor={animeConfig.themeColor}
              />

              <SimpleGuessList guesses={currentGuesses} targetCharacter={targetCharacter} animeSlug={currentAnimeSlug} currentMode={currentMode} />
            </div>
          </div>
        )}

        {/* MODO CENA & JUTSU */}
        {currentMode === 'scene' && currentSceneChallenge && !isCurrentSpeedrun && (
          <div>
            <div className="max-w-xl mx-auto text-center my-6">
              <ScenePlayerCard
                challenge={currentSceneChallenge}
                guessCount={currentGuesses.length}
                isWon={isFinished}
                themeColor={animeConfig.themeColor}
              />
            </div>

            <div className="max-w-2xl mx-auto my-6">
              <CharacterSearchInput
                characters={characters}
                guessedCharacterIds={currentGuesses.map((g) => g.character.id)}
                onSelectCharacter={handleSelectCharacter}
                disabled={isFinished}
                themeColor={animeConfig.themeColor}
              />

              <SimpleGuessList guesses={currentGuesses} targetCharacter={targetCharacter} animeSlug={currentAnimeSlug} currentMode={currentMode} />
            </div>
          </div>
        )}

        {/* MODO VOZ & SOM */}
        {currentMode === 'voice' && currentVoiceChallenge && !isCurrentSpeedrun && (
          <div>
            <div className="max-w-xl mx-auto text-center my-6">
              <VoicePlayerCard
                challenge={currentVoiceChallenge}
                isWon={isFinished}
                themeColor={animeConfig.themeColor}
              />
            </div>

            <div className="max-w-2xl mx-auto my-6">
              <CharacterSearchInput
                characters={characters}
                guessedCharacterIds={currentGuesses.map((g) => g.character.id)}
                onSelectCharacter={handleSelectCharacter}
                disabled={isFinished}
                themeColor={animeConfig.themeColor}
              />

              <SimpleGuessList guesses={currentGuesses} targetCharacter={targetCharacter} animeSlug={currentAnimeSlug} currentMode={currentMode} />
            </div>
          </div>
        )}

        {/* MODO HABILIDADE / MODOS EXCLUSIVOS */}
        {currentMode === 'ability' && (
          <Suspense fallback={<div className="text-center py-12 text-slate-400 text-xs">Carregando Modo Exclusivo...</div>}>
            <ExclusiveAnimeMode
              key={`${currentAnimeSlug}-${currentMode}`}
              animeSlug={currentAnimeSlug}
              animeTitle={animeConfig.title}
              characters={characters}
              themeColor={animeConfig.themeColor}
              onGlobalStatsChange={(newStats) => setStats(newStats)}
              initialFriendChallenge={activeFriendChallenge && activeFriendChallenge.m === 'ability' ? activeFriendChallenge : null}
              onClearFriendChallenge={() => {
                setActiveFriendChallenge(null);
                clearChallengeQueryParam();
              }}
            />
          </Suspense>
        )}

        {/* MODO ZOOM / OLHOS */}
        {currentMode === 'zoom' && !isCurrentSpeedrun && (
          <div>
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
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black mb-3 animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                  <span>🚨 Zoom Máximo Alcançado (1x) - Últimas chances! Restam {Math.min(3, Math.max(1, 7 - currentGuesses.length))} de 3 tentativas antes da derrota!</span>
                </div>
              )}
              
              <div className={`w-52 h-52 mx-auto my-4 rounded-full overflow-hidden border-4 border-[#202b43] bg-[#111a2d] relative flex items-center justify-center shadow-2xl transition-all duration-500 ${
                zoomScale === 1 && !isFinished ? 'ring-4 ring-rose-500/80 shadow-[0_0_35px_rgba(244,63,94,0.45)] animate-pulse' : ''
              }`}>
                <ObfuscatedMysteryAvatar
                  avatarUrl={targetCharacter.avatar}
                  mode="zoom"
                  zoomScale={zoomScale}
                  isRevealed={isFinished}
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="max-w-2xl mx-auto my-6">
              <CharacterSearchInput
                characters={characters}
                guessedCharacterIds={currentGuesses.map((g) => g.character.id)}
                onSelectCharacter={handleSelectCharacter}
                disabled={isFinished}
                themeColor={animeConfig.themeColor}
              />

              <SimpleGuessList guesses={currentGuesses} targetCharacter={targetCharacter} animeSlug={currentAnimeSlug} currentMode={currentMode} />
            </div>
          </div>
        )}

        {/* MODO GRID 3x3 */}
        {currentMode === 'grid' && (
          <Suspense fallback={<div className="text-center py-12 text-slate-400 text-xs">Carregando Grade 3×3...</div>}>
            <AnimeGridMode
              key={`grid-${currentAnimeSlug}`}
              characters={characters}
              themeColor={animeConfig.themeColor}
              animeTitle={animeConfig.title}
              animeSlug={currentAnimeSlug}
              initialFriendChallenge={activeFriendChallenge && activeFriendChallenge.m === 'grid' ? activeFriendChallenge : null}
              onClearFriendChallenge={() => {
                setActiveFriendChallenge(null);
                clearChallengeQueryParam();
              }}
            />
          </Suspense>
        )}

        {/* MODO MAIOR OU MENOR */}
        {currentMode === 'higherlower' && (
          <Suspense fallback={<div className="text-center py-12 text-slate-400 text-xs">Carregando Modo Maior ou Menor...</div>}>
            <HigherOrLowerModal
              key={`hol-${currentAnimeSlug}`}
              characters={characters}
              arcs={animeConfig.arcs}
              animeSlug={currentAnimeSlug}
              animeTitle={animeConfig.title}
              themeColor={animeConfig.themeColor}
              inline
            />
          </Suspense>
        )}

        {/* N4: MODO CONEXÕES 4x4 (ESTILO POKENNECTION.COM) */}
        {currentMode === 'connections' && (
          <Suspense fallback={<div className="text-center py-12 text-slate-400 text-xs">Carregando Modo Conexões...</div>}>
            <AnimeConnectionsMode
              key={`connections-${currentAnimeSlug}`}
              characters={characters}
              animeSlug={currentAnimeSlug}
              animeTitle={animeConfig.title}
              themeColor={animeConfig.themeColor}
              initialFriendChallenge={activeFriendChallenge && activeFriendChallenge.m === 'connections' ? activeFriendChallenge : null}
              onClearFriendChallenge={() => {
                setActiveFriendChallenge(null);
                clearChallengeQueryParam();
              }}
            />
          </Suspense>
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
          isEndless={isCurrentEndless}
          survivalState={isCurrentEndless && survivalState.active ? survivalState : undefined}
          survivalHealed={survivalHealed}
          onRestartSurvival={handleRestartSurvival}
          friendChallenge={activeFriendChallenge && activeFriendChallenge.m === currentMode ? activeFriendChallenge : null}
          challengeTargetPayload={{
            a: currentAnimeSlug,
            m: currentMode,
            t: isCurrentEndless ? endlessTargetIndex : dailyIndex,
            cid:
              currentMode === 'scene' && currentSceneChallenge
                ? currentSceneChallenge.id
                : currentMode === 'voice' && currentVoiceChallenge
                ? currentVoiceChallenge.id
                : targetCharacter?.id,
          }}
          onSendRevenge={handleSendRevenge}
        />
      )}

      <Suspense fallback={null}>
        {showHowToPlay && (
          <HowToPlayModal
            onClose={() => setShowHowToPlay(false)}
            currentMode={currentMode}
            currentAnimeSlug={currentAnimeSlug}
            animeConfig={animeConfig}
          />
        )}
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
        {showSceneGallery && (
          <SceneGalleryModal
            initialAnimeSlug={currentAnimeSlug}
            onClose={() => setShowSceneGallery(false)}
          />
        )}
        {showMasteryModal && (
          <MasteryModal
            isOpen={showMasteryModal}
            onClose={() => setShowMasteryModal(false)}
            animeTitle={animeConfig.title}
            themeColor={animeConfig.themeColor}
            masteryInfo={masteryInfo}
          />
        )}
      </Suspense>

      {/* Notificação Flutuante de Conquistas */}
      <AchievementToast />
    </div>
  );
};

export default App;
