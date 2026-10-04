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
import { MangaCoverageModal } from './components/MangaCoverageModal';
import { ExclusiveAnimeMode } from './components/ExclusiveAnimeMode';
import { AnimeGridMode } from './components/AnimeGridMode';
import { AchievementToast } from './components/AchievementToast';
import { unlockAchievement, updateGlobalStatsOnOutcome } from './data/achievements';

import { ANIMES_CONFIG } from './data/animes/config';
import demonSlayerCharacters from './data/animes/demon-slayer/characters.json';
import jujutsuKaisenCharacters from './data/animes/jujutsu-kaisen/characters.json';
import onePieceCharacters from './data/animes/one-piece/characters.json';
import narutoCharacters from './data/animes/naruto/characters.json';
import soloLevelingCharacters from './data/animes/solo-leveling/characters.json';
import recordOfRagnarokCharacters from './data/animes/record-of-ragnarok/characters.json';
import blueLockCharacters from './data/animes/blue-lock/characters.json';
import bleachCharacters from './data/animes/bleach/characters.json';
import dragonBallCharacters from './data/animes/dragon-ball/characters.json';
import jojosBizarreAdventureCharacters from './data/animes/jojos-bizarre-adventure/characters.json';
import dandadanCharacters from './data/animes/dandadan/characters.json';
import tenseiShitaraSlimeCharacters from './data/animes/tensei-shitara-slime-datta-ken/characters.json';
import attackOnTitanCharacters from './data/animes/attack-on-titan/characters.json';
import blackCloverCharacters from './data/animes/black-clover/characters.json';
import berserkCharacters from './data/animes/berserk/characters.json';
import chainsawManCharacters from './data/animes/chainsaw-man/characters.json';
import fairyTailCharacters from './data/animes/fairy-tail/characters.json';
import frierenCharacters from './data/animes/frieren/characters.json';
import fullmetalAlchemistCharacters from './data/animes/fullmetal-alchemist/characters.json';
import haikyuuCharacters from './data/animes/haikyuu/characters.json';
import hunterXHunterCharacters from './data/animes/hunter-x-hunter/characters.json';
import kaijuNo8Characters from './data/animes/kaiju-no-8/characters.json';
import akameGaKillCharacters from './data/animes/akame-ga-kill/characters.json';
import cyberpunkCharacters from './data/animes/cyberpunk-edgerunners/characters.json';
import myHeroAcademiaCharacters from './data/animes/my-hero-academia/characters.json';
import nanatsuNoTaizaiCharacters from './data/animes/nanatsu-no-taizai/characters.json';
import shangriLaCharacters from './data/animes/shangri-la-frontier/characters.json';
import witchHatAtelierCharacters from './data/animes/witch-hat-atelier/characters.json';
import onePunchManCharacters from './data/animes/one-punch-man/characters.json';
import tokyoGhoulCharacters from './data/animes/tokyo-ghoul/characters.json';
import swordArtOnlineCharacters from './data/animes/sword-art-online/characters.json';
import romanceCharacters from './data/animes/romance/characters.json';
import { NARUTO_EXCLUSIVE_JUTSUS } from './data/animes/naruto/exclusiveJutsus';
import { Character, GameMode, GuessResult, GameStats } from './types/anime';
import { getDailyCharacterIndex, evaluateGuess } from './utils/dailySeed';
import { Sparkles, Eye, MessageSquare, Zap, ZoomIn, Infinity as InfinityIcon, RefreshCw, Flame, BookOpen } from 'lucide-react';


export const App: React.FC<{
  animeSlug: string;
  onNavigateHome: () => void;
  onNavigateToAnime: (slug: string) => void;
}> = ({ animeSlug: currentAnimeSlug, onNavigateHome, onNavigateToAnime }) => {
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
    : currentAnimeSlug === 'bleach'
    ? bleachCharacters
    : currentAnimeSlug === 'dragon-ball'
    ? dragonBallCharacters
    : currentAnimeSlug === 'jojos-bizarre-adventure'
    ? jojosBizarreAdventureCharacters
    : currentAnimeSlug === 'dandadan'
    ? dandadanCharacters
    : currentAnimeSlug === 'tensei-shitara-slime-datta-ken'
    ? tenseiShitaraSlimeCharacters
    : currentAnimeSlug === 'attack-on-titan'
    ? attackOnTitanCharacters
    : currentAnimeSlug === 'black-clover'
    ? blackCloverCharacters
    : currentAnimeSlug === 'berserk'
    ? berserkCharacters
    : currentAnimeSlug === 'chainsaw-man'
    ? chainsawManCharacters
    : currentAnimeSlug === 'fairy-tail'
    ? fairyTailCharacters
    : currentAnimeSlug === 'frieren'
    ? frierenCharacters
    : currentAnimeSlug === 'fullmetal-alchemist'
    ? fullmetalAlchemistCharacters
    : currentAnimeSlug === 'haikyuu'
    ? haikyuuCharacters
    : currentAnimeSlug === 'hunter-x-hunter'
    ? hunterXHunterCharacters
    : currentAnimeSlug === 'kaiju-no-8'
    ? kaijuNo8Characters
    : currentAnimeSlug === 'akame-ga-kill'
    ? akameGaKillCharacters
    : currentAnimeSlug === 'cyberpunk-edgerunners'
    ? cyberpunkCharacters
    : currentAnimeSlug === 'my-hero-academia'
    ? myHeroAcademiaCharacters
    : currentAnimeSlug === 'nanatsu-no-taizai'
    ? nanatsuNoTaizaiCharacters
    : currentAnimeSlug === 'shangri-la-frontier'
    ? shangriLaCharacters
    : currentAnimeSlug === 'witch-hat-atelier'
    ? witchHatAtelierCharacters
    : currentAnimeSlug === 'one-punch-man'
    ? onePunchManCharacters
    : currentAnimeSlug === 'tokyo-ghoul'
    ? tokyoGhoulCharacters
    : currentAnimeSlug === 'sword-art-online'
    ? swordArtOnlineCharacters
    : currentAnimeSlug === 'romance'
    ? romanceCharacters
    : demonSlayerCharacters) as Character[];

  const characters = React.useMemo(() => {
    return [...rawCharacters].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [rawCharacters]);

  const animeConfig = ANIMES_CONFIG[currentAnimeSlug] || ANIMES_CONFIG['demon-slayer'];

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

  // Garante que animes sem o modo citação permaneçam no modo clássico
  React.useEffect(() => {
    const ANIMES_WITH_QUOTE = [
      'one-piece',
      'naruto',
      'demon-slayer',
      'jujutsu-kaisen',
      'bleach',
      'dragon-ball',
      'attack-on-titan',
      'hunter-x-hunter',
      'chainsaw-man',
      'frieren',
      'fullmetal-alchemist',
      'romance',
      'solo-leveling',
      'my-hero-academia',
      'tokyo-ghoul',
      'berserk',
    ];
    if (!ANIMES_WITH_QUOTE.includes(currentAnimeSlug) && currentMode === 'quote') {
      setCurrentMode('classic');
    }
  }, [currentAnimeSlug, currentMode]);

  // Dev Offset Shift Map para trocar de resposta ao clicar no Resetar(dev)
  const [devOffsets, setDevOffsets] = useState<Record<GameMode, number>>({
    classic: 0,
    wanted: 0,
    quote: 0,
    ability: 0,
    zoom: 0,
    endless: 0,
    grid: 0,
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
  const [modeStates, setModeStates] = useState<Record<GameMode, { guesses: GuessResult[]; isWon: boolean; isSurrendered?: boolean; isLost?: boolean }>>({
    classic: { guesses: [], isWon: false },
    wanted: { guesses: [], isWon: false },
    quote: { guesses: [], isWon: false },
    ability: { guesses: [], isWon: false },
    zoom: { guesses: [], isWon: false },
    endless: { guesses: [], isWon: false },
    grid: { guesses: [], isWon: false },
  });

  // Modais
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
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
    const todayStr = new Date().toISOString().split('T')[0];
    const modesList: GameMode[] = ['classic', 'wanted', 'quote', 'ability', 'zoom'];
    const newStates: Record<GameMode, { guesses: GuessResult[]; isWon: boolean; isSurrendered?: boolean; isLost?: boolean }> = {
      classic: { guesses: [], isWon: false },
      wanted: { guesses: [], isWon: false },
      quote: { guesses: [], isWon: false },
      ability: { guesses: [], isWon: false },
      zoom: { guesses: [], isWon: false },
      endless: { guesses: [], isWon: false },
      grid: { guesses: [], isWon: false },
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

    setModeStates(newStates);
    setShowVictoryModal(false);
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
    const isDefeat = isWantedLoss || isZoomLoss;
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

    if (currentMode !== 'endless') {
      const todayStr = new Date().toISOString().split('T')[0];
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

    if (isCorrect) {
      if (currentMode === 'endless') {
        setEndlessStreak((s) => {
          const next = s + 1;
          localStorage.setItem(`animedle_endless_streak_${currentAnimeSlug}`, next.toString());
          if (next >= 5) unlockAchievement('endless_streak_5');
          if (next >= 10) unlockAchievement('endless_streak_10');
          return next;
        });
      }

      setShowVictoryModal(true);

      if (currentMode !== 'endless') {
        const updated = updateGlobalStatsOnOutcome('win');
        setStats(updated);
      }
    } else if (isDefeat) {
      const updated = updateGlobalStatsOnOutcome('defeat');
      setStats(updated);
      setShowVictoryModal(true);
    }
  };

  // Função ao Clicar em Desistir
  const handleSurrender = () => {
    if (isFinished) return;

    if (currentMode === 'endless') {
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

    if (currentMode !== 'endless') {
      const todayStr = new Date().toISOString().split('T')[0];
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
    let randomOffset = Math.floor(Math.random() * poolSize);

    // Se for modo sem repetição ('classic', 'wanted', 'zoom'), evitar colisão com os outros modos vinculados
    if (['classic', 'wanted', 'zoom'].includes(currentMode) && validCharactersForMode.length >= 3) {
      const otherModes = (['classic', 'wanted', 'zoom'] as GameMode[]).filter(m => m !== currentMode);
      const otherIndices = otherModes.map(m => {
        const base = getDailyCharacterIndex(currentAnimeSlug, m, validCharactersForMode.length);
        return (base + (devOffsets[m] || 0)) % validCharactersForMode.length;
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
    <div className="min-h-screen bg-transparent text-[#F5F7FF] flex flex-col font-sans selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
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

          {currentMode === 'endless' && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111a2d] border border-[#202b43] text-slate-300 text-xs font-bold mb-3 shadow-sm">
              <InfinityIcon size={14} className="text-amber-400" />
              <span>Modo Infinito</span>
            </div>
          )}
          <div className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl bg-[#060b18]/75 backdrop-blur-md border border-white/10 shadow-2xl mb-1 mt-1 max-w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Adivinhe o Personagem de{' '}
              <span
                style={{
                  color: animeConfig.themeColor,
                  textShadow: `0 0 20px ${animeConfig.themeColor}88, 0 2px 4px rgba(0,0,0,0.95)`,
                  filter: 'brightness(1.25) contrast(1.15)',
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
        {currentMode !== 'ability' && currentMode !== 'grid' && (
          <HintBox
            targetCharacter={targetCharacter}
            guessCount={currentGuesses.length}
            isWon={isFinished}
            onSurrender={handleSurrender}
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
          <div className="max-w-xl mx-auto text-center my-6 p-6 bg-[#0d1426] border border-[#202b43] rounded-3xl shadow-xl">
            <h3 className="font-extrabold text-base text-white flex items-center justify-center gap-2 mb-1.5">
              <ZoomIn size={18} style={{ color: animeConfig.themeColor }} /> Modo Zoom (Olhos & Detalhes)
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              A foto do personagem está com zoom extremo! O zoom diminui a cada erro.
            </p>
            {zoomScale === 1 && !isFinished && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-black mb-3 animate-pulse">
                <span>⚠️ Zoom 1x atingido! Restam {Math.max(0, 8 - currentGuesses.length)} de 3 chances antes da derrota!</span>
              </div>
            )}
            
            <div className="w-52 h-52 mx-auto my-4 rounded-full overflow-hidden border-4 border-[#202b43] bg-[#111a2d] relative flex items-center justify-center shadow-2xl">
              <img
                key={`zoom-img-${targetCharacter.id}`}
                src={targetCharacter.avatar}
                alt="Zoom Detalhe"
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: '50% 36%',
                  transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="w-full h-full object-cover select-none pointer-events-none"
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
          isLost={currentIsLost}
          onClose={() => setShowVictoryModal(false)}
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
