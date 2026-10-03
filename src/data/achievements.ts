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
    title: 'Citações Memoráveis',
    description: 'Acerte o personagem no Modo Citação em 2 tentativas ou menos.',
    icon: '/icons/achievements/quote_master.png',
    category: 'modo',
  },
  {
    id: 'endless_streak_5',
    title: 'Guerreiro Sem Fim',
    description: 'Alcance uma sequência de 5 acertos no Modo Treino.',
    icon: '/icons/achievements/endless_streak_5.png',
    category: 'modo',
  },
  {
    id: 'endless_streak_10',
    title: 'Enciclopédia Ambulante',
    description: 'Alcance uma sequência de 10 acertos consecutivos no Modo Treino.',
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
      return true;
    }
  } catch (e) {
    // ignore
  }
  return false;
};

// Registra dia jogado para o calendário de atividade
export const logDailyActivity = (): void => {
  try {
    const today = new Date().toISOString().split('T')[0];
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
