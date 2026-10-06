export type MatchStatus = 'correct' | 'partial' | 'incorrect';
export type ArrowDirection = 'up' | 'down' | 'none';

export interface Character {
  id: string;
  name: string;
  gender: 'Masculino' | 'Feminino' | 'Sem Gênero';
  species: string;
  affiliation: string[];
  styleOrPower: string;
  debutArc: string;
  status: string;
  avatar: string;
  origin?: string;
  quote?: string;
  ability?: string;
  combatType?: string;
  hairColor?: string;
  roleOrArchetype?: string;
  grade?: string;
  era?: string;
  techniqueType?: string;
  domainExpansion?: string | null;
  fruitType?: string;
  haki?: string;
  bounty?: number;
  techniques?: string[];
  natureTypes?: string | string[];
  jutsuTypes?: string | string[];
  kekkeiGenkai?: string | string[];
  attributes?: string | string[];
  // Solo Leveling
  rank?: string;
  hunterClass?: string;
  country?: string;
  faction?: string;
  // Record of Ragnarok
  pantheonOrOrigin?: string;
  weapon?: string;
  round?: string;
  // Blue Lock
  position?: string;
  // Bleach
  maxRelease?: string;
  // JoJo
  stand?: string;
  // Dandadan
  powerNature?: string;
  // Tensura
  disasterRank?: string;
  // Black Clover
  magicAttribute?: string;
  // Haikyuu
  school?: string;
  year?: string;
  styleOrPlay?: string;
  // Hunter x Hunter
  nenType?: string;
  // Naruto
  village?: string;
  clan?: string;
  // Cyberpunk & Akame & Others
  role?: string;
  cyberware?: string;
  teigu?: string;
  // Witch Hat Atelier
  magicRole?: string;
  magicSpecialty?: string;
  // Shangri-La Frontier
  gameClass?: string;
  // Nanatsu no Taizai
  sacredTreasure?: string;
  magicOrPower?: string;
  rankOrTitle?: string;
  // My Hero Academia
  quirk?: string;
  // Tokyo Ghoul
  rcTypeOrQuinque?: string;
  // Romance Crossover
  archetype?: string;
}

export interface AttributeColumn {
  key: keyof Character;
  label: string;
  type: 'exact' | 'array' | 'status' | 'arc' | 'bounty';
}

export interface MangaCoverage {
  chapter: string | number;
  status: 'Em Lançamento' | 'Finalizado' | 'Em Lançamento (hiatus frequente)';
  source: string;
  officialPublisher: string;
  lastUpdated: string;
  notes: string;
}

export interface AnimeConfig {
  slug: string;
  title: string;
  subtitle: string;
  themeColor: string;
  accentColor: string;
  banner: string;
  logo?: string;
  columns: AttributeColumn[];
  arcs: string[];
  mangaCoverage?: MangaCoverage;
}

export interface MatchResultCell {
  status: MatchStatus;
  value: string | string[];
  arrow?: ArrowDirection;
}

export interface GuessResult {
  character: Character;
  matches: Record<string, MatchResultCell>;
  isCorrect: boolean;
}

export type GameMode = 'classic' | 'wanted' | 'quote' | 'ability' | 'zoom' | 'voice' | 'endless' | 'grid';

export interface VoiceChallenge {
  id: string;
  animeSlug: string;
  characterId: string;
  characterName: string;
  audioUrl: string;
  category: 'risada' | 'ataque' | 'bordao' | 'fala';
  subtitle?: string; // transcrição em japonês/português opcional revelada na vitória
}

export interface GameStats {
  played: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>;
}
