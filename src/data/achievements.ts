import { GameStats } from '../types/anime';
import { getDailyDateString } from '../utils/dailySeed';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'modo' | 'streak' | 'geral';
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_win',
    title: 'Primeira Vitória',
    description: 'Acerte o primeiro personagem secreto em qualquer modo.',
    icon: '/icons/achievements/first_win.png',
    category: 'geral',
  },
  {
    id: 'grid_master',
    title: 'Mestre da Grade',
    description: 'Complete uma partida no Modo Grid 3×3 com 9/9 acertos.',
    icon: '/icons/achievements/grid_master.png',
    category: 'modo',
  },
  {
    id: 'eagle_eye',
    title: 'Olho de Águia',
    description: 'Acerte o personagem de primeira (1 tentativa) no Modo Zoom.',
    icon: '/icons/achievements/eagle_eye.png',
    category: 'modo',
  },
  {
    id: 'detective',
    title: 'Detetive Noturno',
    description: 'Acerte de primeira no Modo Procurado com o borrão máximo.',
    icon: '/icons/achievements/detective.png',
    category: 'modo',
  },
  {
    id: 'quote_master',
    title: 'Ouvido Absoluto',
    description: 'Acerte o personagem no Modo Voz em 2 tentativas ou menos.',
    icon: '/icons/achievements/quote_master.png',
    category: 'modo',
  },
  {
    id: 'endless_streak_5',
    title: 'Guerreiro Sem Fim',
    description: 'Alcance uma sequência de 5 vitórias no Modo Infinito.',
    icon: '/icons/achievements/endless_streak_5.png',
    category: 'modo',
  },
  {
    id: 'endless_streak_10',
    title: 'Enciclopédia Ambulante',
    description: 'Alcance uma sequência de 10 vitórias no Modo Infinito.',
    icon: '/icons/achievements/endless_streak_10.png',
    category: 'modo',
  },
  {
    id: 'multi_anime',
    title: 'Otaku Versátil',
    description: 'Jogue desafios em pelo menos 5 animes diferentes.',
    icon: '/icons/achievements/multi_anime.png',
    category: 'geral',
  },
  {
    id: 'streak_3',
    title: 'Frequência Lendária',
    description: 'Jogue e vença por 3 dias consecutivos.',
    icon: '/icons/achievements/streak_3.png',
    category: 'streak',
  },
  {
    id: 'streak_7',
    title: 'Devoção Absoluta',
    description: 'Mantenha um streak diário perfeito de 7 dias.',
    icon: '/icons/achievements/streak_7.png',
    category: 'streak',
  },
  {
    id: 'iron_will',
    title: 'Determinação de Ferro',
    description: 'Jogue 10 partidas sem desistir de nenhuma.',
    icon: '/icons/achievements/iron_will.png',
    category: 'geral',
  },
  {
    id: 'protagonist_comeback',
    title: 'Virada de Protagonista',
    description: 'Vencer na última tentativa disponível em um modo com limite de tentativas.',
    icon: '/icons/achievements/protagonist_comeback.png',
    category: 'modo',
  },
  {
    id: 'analytical_mind',
    title: 'Mente Analítica',
    description: 'Vencer o Modo Clássico em 3 tentativas ou menos.',
    icon: '/icons/achievements/analytical_mind.png',
    category: 'modo',
  },
  {
    id: 'pure_knowledge',
    title: 'Conhecimento Puro',
    description: 'Vencer uma rodada no Modo Exclusivo sem revelar nenhuma pista.',
    icon: '/icons/achievements/pure_knowledge.png',
    category: 'modo',
  },
  {
    id: 'confirmed_identity',
    title: 'Identidade Confirmada',
    description: 'Acertar o mesmo personagem em 3 modos diferentes ao longo das partidas.',
    icon: '/icons/achievements/confirmed_identity.png',
    category: 'geral',
  },
  {
    id: 'universe_mastery',
    title: 'Domínio do Universo',
    description: 'Vencer Clássico, Grid, Zoom, Procurado e Citação em um mesmo anime.',
    icon: '/icons/achievements/universe_mastery.png',
    category: 'geral',
  },
  {
    id: 'hero_revenge',
    title: 'Revanche de Herói',
    description: 'Vencer a partida imediatamente seguinte no mesmo modo e anime após uma derrota.',
    icon: '/icons/achievements/hero_revenge.png',
    category: 'geral',
  },
  {
    id: 'multiverse_echoes',
    title: 'Ecos do Multiverso',
    description: 'Acertar pelo menos 1 citação no Modo Citação em 5 animes diferentes.',
    icon: '/icons/achievements/multiverse_echoes.png',
    category: 'geral',
  },
  {
    id: 'animedle_veteran',
    title: 'Veterano do AnimeDLE',
    description: 'Alcançar 25 vitórias no total somando todos os modos e animes.',
    icon: '/icons/achievements/animedle_veteran.png',
    category: 'geral',
  },
  {
    id: 'complete_collection',
    title: 'Coleção Completa',
    description: 'Desbloquear todas as outras 19 conquistas.',
    icon: '/icons/achievements/complete_collection.png',
    category: 'geral',
  },
];

export interface UnlockedAchievement {
  id: string;
  unlockedAt: string;
}

export const getUnlockedAchievements = (): Record<string, string> => {
  try {
    const saved = localStorage.getItem('animedle_achievements');
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
};

export const unlockAchievement = (id: string): boolean => {
  try {
    const current = getUnlockedAchievements();
    if (!current[id]) {
      current[id] = new Date().toISOString();
      localStorage.setItem('animedle_achievements', JSON.stringify(current));
      
      // Despacha evento para notificação em tempo real
      window.dispatchEvent(
        new CustomEvent('animedle_achievement_unlocked', {
          detail: { id, info: ACHIEVEMENTS_LIST.find((a) => a.id === id) },
        })
      );

      // Checa se todas as outras 19 conquistas foram desbloqueadas para liberar Coleção Completa!
      if (id !== 'complete_collection') {
        const other19 = ACHIEVEMENTS_LIST.filter(a => a.id !== 'complete_collection').map(a => a.id);
        const allUnlocked = other19.every(reqId => !!current[reqId]);
        if (allUnlocked) {
          unlockAchievement('complete_collection');
        }
      }

      return true;
    }
  } catch (e) {
    // ignore
  }
  return false;
};

export const recordVictory = (animeSlug: string, mode: string, characterId?: string): void => {
  try {
    // 1. Total victories -> animedle_veteran
    const totalWins = parseInt(localStorage.getItem('animedle_total_victories') || '0', 10) + 1;
    localStorage.setItem('animedle_total_victories', totalWins.toString());
    if (totalWins >= 25) {
      unlockAchievement('animedle_veteran');
    }

    // 2. Modes won per anime -> universe_mastery (Classic, Grid, Zoom, Wanted, Quote)
    const animeModesRaw = localStorage.getItem('animedle_anime_modes_won');
    const animeModes: Record<string, string[]> = animeModesRaw ? JSON.parse(animeModesRaw) : {};
    if (!animeModes[animeSlug]) {
      animeModes[animeSlug] = [];
    }
    if (!animeModes[animeSlug].includes(mode)) {
      animeModes[animeSlug].push(mode);
      localStorage.setItem('animedle_anime_modes_won', JSON.stringify(animeModes));
    }
    const coreModes = ['classic', 'grid', 'zoom', 'wanted', 'voice'];
    if (coreModes.every((m) => animeModes[animeSlug].includes(m))) {
      unlockAchievement('universe_mastery');
    }

    // 3. Character modes won -> confirmed_identity (same character in 3 different modes)
    if (characterId) {
      const charModesRaw = localStorage.getItem('animedle_char_modes_won');
      const charModes: Record<string, string[]> = charModesRaw ? JSON.parse(charModesRaw) : {};
      if (!charModes[characterId]) {
        charModes[characterId] = [];
      }
      if (!charModes[characterId].includes(mode)) {
        charModes[characterId].push(mode);
        localStorage.setItem('animedle_char_modes_won', JSON.stringify(charModes));
      }
      if (charModes[characterId].length >= 3) {
        unlockAchievement('confirmed_identity');
      }
    }

    // 4. Voice mode across 5 different animes -> multiverse_echoes
    if (mode === 'voice') {
      const quoteAnimesRaw = localStorage.getItem('animedle_quote_animes_won');
      const quoteAnimes: string[] = quoteAnimesRaw ? JSON.parse(quoteAnimesRaw) : [];
      if (!quoteAnimes.includes(animeSlug)) {
        quoteAnimes.push(animeSlug);
        localStorage.setItem('animedle_quote_animes_won', JSON.stringify(quoteAnimes));
      }
      if (quoteAnimes.length >= 5) {
        unlockAchievement('multiverse_echoes');
      }
    }

    // 5. Hero revenge -> win immediately after defeat in same anime and mode
    const lastResultRaw = localStorage.getItem('animedle_last_match_result');
    if (lastResultRaw) {
      const lastResult = JSON.parse(lastResultRaw);
      if (lastResult.animeSlug === animeSlug && lastResult.mode === mode && lastResult.isDefeat) {
        unlockAchievement('hero_revenge');
      }
    }
    // Update last match as won
    localStorage.setItem(
      'animedle_last_match_result',
      JSON.stringify({ animeSlug, mode, isDefeat: false, timestamp: Date.now() })
    );

    // 6. Multi anime -> played in 5 different animes
    const playedAnimes: string[] = JSON.parse(localStorage.getItem('animedle_played_animes') || '[]');
    if (!playedAnimes.includes(animeSlug)) {
      playedAnimes.push(animeSlug);
      localStorage.setItem('animedle_played_animes', JSON.stringify(playedAnimes));
    }
    if (playedAnimes.length >= 5) {
      unlockAchievement('multi_anime');
    }

    // 7. Iron will -> 10 matches without surrendering
    const noSurrender = parseInt(localStorage.getItem('animedle_no_surrender_streak') || '0', 10) + 1;
    localStorage.setItem('animedle_no_surrender_streak', noSurrender.toString());
    if (noSurrender >= 10) {
      unlockAchievement('iron_will');
    }
  } catch (e) {
    // ignore
  }
};

export const recordDefeat = (animeSlug: string, mode: string): void => {
  try {
    localStorage.setItem(
      'animedle_last_match_result',
      JSON.stringify({ animeSlug, mode, isDefeat: true, timestamp: Date.now() })
    );

    // Multi anime tracking even on defeat
    const playedAnimes: string[] = JSON.parse(localStorage.getItem('animedle_played_animes') || '[]');
    if (!playedAnimes.includes(animeSlug)) {
      playedAnimes.push(animeSlug);
      localStorage.setItem('animedle_played_animes', JSON.stringify(playedAnimes));
    }
    if (playedAnimes.length >= 5) {
      unlockAchievement('multi_anime');
    }

    // Matches without surrender also counts completed defeats that weren't surrendered!
    const noSurrender = parseInt(localStorage.getItem('animedle_no_surrender_streak') || '0', 10) + 1;
    localStorage.setItem('animedle_no_surrender_streak', noSurrender.toString());
    if (noSurrender >= 10) {
      unlockAchievement('iron_will');
    }
  } catch (e) {
    // ignore
  }
};

export const updateGlobalStatsOnOutcome = (outcome: 'win' | 'defeat' | 'surrender'): GameStats => {
  try {
    const raw = localStorage.getItem('animedle_stats');
    const prev: GameStats = raw
      ? JSON.parse(raw)
      : { played: 0, wins: 0, currentStreak: 0, maxStreak: 0, guessDistribution: {} };

    const played = (prev.played || 0) + 1;
    let wins = prev.wins || 0;
    let currentStreak = 0;
    let maxStreak = prev.maxStreak || 0;

    if (outcome === 'win') {
      wins += 1;
      currentStreak = (prev.currentStreak || 0) + 1;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      // Perda ou desistência: SEMPRE zera a sequência atual!
      currentStreak = 0;
    }

    const updated: GameStats = {
      ...prev,
      played,
      wins,
      currentStreak,
      maxStreak,
    };

    localStorage.setItem('animedle_stats', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('animedle_stats_updated', { detail: updated }));
    return updated;
  } catch (e) {
    return { played: 0, wins: 0, currentStreak: 0, maxStreak: 0, guessDistribution: {} };
  }
};

export const recordSurrender = (animeSlug: string, mode: string): void => {
  try {
    localStorage.setItem('animedle_no_surrender_streak', '0');
    localStorage.setItem(
      'animedle_last_match_result',
      JSON.stringify({ animeSlug, mode, isDefeat: true, isSurrendered: true, timestamp: Date.now() })
    );

    // Multi anime tracking even on surrender
    const playedAnimes: string[] = JSON.parse(localStorage.getItem('animedle_played_animes') || '[]');
    if (!playedAnimes.includes(animeSlug)) {
      playedAnimes.push(animeSlug);
      localStorage.setItem('animedle_played_animes', JSON.stringify(playedAnimes));
    }
    if (playedAnimes.length >= 5) {
      unlockAchievement('multi_anime');
    }
  } catch (e) {
    // ignore
  }
};

// Registra dia jogado para o calendário de atividade
export const logDailyActivity = (): void => {
  try {
    const today = getDailyDateString();
    const saved = localStorage.getItem('animedle_activity_days');
    const days: string[] = saved ? JSON.parse(saved) : [];
    if (!days.includes(today)) {
      days.push(today);
      localStorage.setItem('animedle_activity_days', JSON.stringify(days));
    }
  } catch (e) {
    // ignore
  }
};

export const getActivityDays = (): string[] => {
  try {
    const saved = localStorage.getItem('animedle_activity_days');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};
