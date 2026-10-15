/**
 * Utilitário de Busca Inteligente de Personagens (Animedle)
 * Implementa Categoria 1:
 * - 1.2 Tolerância a pequenos erros de digitação (Levenshtein)
 * - 1.2 Busca por apelidos famosos, siglas e grafias alternativas
 */

import { Character } from '../types/anime';

// Normaliza strings removendo acentos, pontuações, hífens e espaços extras
export function normalizeSearchText(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacríticos/acentos
    .replace(/['"´`\.\-\_\,\:\;\(\)\[\]\{\}\/\\\|]/g, ' ') // pontuações viram espaço
    .replace(/\s+/g, ' ') // consolida múltiplos espaços
    .trim();
}

// Remove todos os espaços e pontuações para comparações contínuas (ex: "waterlaw" ou "sungjinwoo")
export function compactSearchText(str: string): string {
  return normalizeSearchText(str).replace(/\s+/g, '');
}

// Distância de Levenshtein para medir proximidade entre palavras
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const row: number[] = [];
  for (let i = 0; i <= b.length; i++) {
    row[i] = i;
  }

  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const val = a[i - 1] === b[j - 1] ? row[j - 1] : Math.min(row[j - 1], prev, row[j]) + 1;
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }

  return row[b.length];
}

// Dicionário canônico de apelidos, alcunhas e siglas populares
// Mapeia apelidos populares para nomes canônicos ou trechos-chave de identificação
export const POPULAR_ALIASES: Record<string, string[]> = {
  // One Piece
  'zoro': ['Roronoa Zoro'],
  'luffy': ['Monkey D. Luffy', 'Luffy'],
  'law': ['Trafalgar D. Water Law', 'Trafalgar Law'],
  'trafalgar law': ['Trafalgar D. Water Law'],
  'barba branca': ['Edward Newgate', 'Barba Branca'],
  'whitebeard': ['Edward Newgate'],
  'barba negra': ['Marshall D. Teach', 'Kurohige'],
  'blackbeard': ['Marshall D. Teach'],
  'kurohige': ['Marshall D. Teach'],
  'ruivo': ['Shanks'],
  'shanks': ['Shanks'],
  'katakuri': ['Charlotte Katakuri'],
  'doflamingo': ['Donquixote Doflamingo'],
  'bon clay': ['Bentham (Bon Clay)'],
  'mr 2': ['Bentham (Bon Clay)'],
  'usopp': ['Usopp', 'Sogeking'],
  'sogeking': ['Usopp', 'Sogeking'],
  'wyper': ['Wyper', 'Wiper'],
  'wiper': ['Wyper'],

  // Naruto
  'kakashe': ['Kakashi Hatake'],
  'kakashi': ['Kakashi Hatake'],
  'ero sennin': ['Jiraiya'],
  'sabio tarado': ['Jiraiya'],
  'relampago amarelo': ['Minato Namikaze'],
  'tobi': ['Obito Uchiha', 'Tobi'],
  'pain': ['Nagato', 'Pain'],
  'itachi': ['Itachi Uchiha'],
  'sasuke': ['Sasuke Uchiha'],
  'naruto': ['Naruto Uzumaki'],
  'gaara': ['Gaara'],

  // Jujutsu Kaisen
  'gojo': ['Satoru Gojo'],
  'sukuna': ['Ryomen Sukuna'],
  'itadori': ['Yuji Itadori'],
  'megumi': ['Megumi Fushiguro'],
  'nobara': ['Nobara Kugisaki'],
  'nanami': ['Kento Nanami'],
  'geto': ['Suguru Geto'],
  'yuta': ['Yuta Okkotsu'],
  'toji': ['Toji Fushiguro'],

  // My Hero Academia / Boku no Hero
  'mha': ['Izuku Midoriya', 'Katsuki Bakugo', 'Shoto Todoroki', 'All Might'],
  'deku': ['Izuku Midoriya'],
  'kacchan': ['Katsuki Bakugo'],
  'bakugo': ['Katsuki Bakugo'],
  'bakugou': ['Katsuki Bakugo'],
  'shoto': ['Shoto Todoroki'],
  'todoroki': ['Shoto Todoroki'],
  'all might': ['Toshinori Yagi (All Might)'],
  'eraser head': ['Shota Aizawa'],
  'aizawa': ['Shota Aizawa'],
  'hawks': ['Keigo Takami (Hawks)'],
  'endeavor': ['Enji Todoroki (Endeavor)'],
  'dabi': ['Toya Todoroki (Dabi)'],
  'suneater': ['Tamaki Amajiki'],

  // Demon Slayer / Kimetsu no Yaiba
  'tanjiro': ['Tanjiro Kamado'],
  'nezuko': ['Nezuko Kamado'],
  'zenitsu': ['Zenitsu Agatsuma'],
  'inosuke': ['Inosuke Hashibira'],
  'rengoku': ['Kyojuro Rengoku'],
  'giyu': ['Giyu Tomioka'],
  'muzan': ['Muzan Kibutsuji'],
  'akaza': ['Akaza'],
  'kokushibo': ['Kokushibo'],
  'douma': ['Doma', 'Douma'],

  // Attack on Titan / Shingeki no Kyojin
  'snk': ['Eren Yeager', 'Levi Ackerman', 'Mikasa Ackerman'],
  'eren': ['Eren Yeager'],
  'levi': ['Levi Ackerman', 'Rivaille'],
  'rivaille': ['Levi Ackerman'],
  'mikasa': ['Mikasa Ackerman'],
  'armin': ['Armin Arlert'],
  'erwin': ['Erwin Smith'],

  // Bleach
  'ichigo': ['Ichigo Kurosaki'],
  'aizen': ['Sosuke Aizen'],
  'rukia': ['Rukia Kuchiki'],
  'byakuya': ['Byakuya Kuchiki'],
  'kenpachi': ['Kenpachi Zaraki'],
  'hitsugaya': ['Toshiro Hitsugaya'],

  // Dragon Ball
  'goku': ['Son Goku', 'Goku'],
  'kakarotto': ['Son Goku'],
  'vegeta': ['Vegeta'],
  'gohan': ['Son Gohan'],
  'trunks': ['Trunks'],
  'piccolo': ['Piccolo'],

  // Hunter x Hunter
  'gon': ['Gon Freecss'],
  'killua': ['Killua Zoldyck'],
  'kurapika': ['Kurapika'],
  'hisoka': ['Hisoka Morow'],
  'chrollo': ['Chrollo Lucilfer'],
  'meruem': ['Meruem'],

  // Solo Leveling
  'jinwoo': ['Sung Jin-Woo', 'Sung Jinwoo'],
  'sung jinwoo': ['Sung Jin-Woo'],
  'haein': ['Cha Hae-In'],
  'cha haein': ['Cha Hae-In'],

  // Blue Lock
  'isagi': ['Yoichi Isagi'],
  'bachira': ['Meguru Bachira'],
  'nagi': ['Seishiro Nagi'],
  'barou': ['Shoei Barou'],
  'rin': ['Rin Itoshi'],
  'sae': ['Sae Itoshi'],
  'chigiri': ['Hyoma Chigiri'],

  // Fullmetal Alchemist
  'edward': ['Edward Elric'],
  'ed': ['Edward Elric'],
  'alphonse': ['Alphonse Elric'],
  'al': ['Alphonse Elric'],
  'mustang': ['Roy Mustang'],

  // Cyberpunk Edgerunners
  'david': ['David Martinez'],
  'lucy': ['Lucyna Kushinada (Lucy)'],
  'rebecca': ['Rebecca'],

  // Dandadan
  'okarun': ['Ken Takakura (Okarun)'],
  'momo': ['Momo Ayase'],

  // Frieren
  'frieren': ['Frieren'],
  'fern': ['Fern'],
  'stark': ['Stark'],
  'himmel': ['Himmel'],

  // Black Clover
  'asta': ['Asta'],
  'yuno': ['Yuno Grinberryall'],
  'yami': ['Yami Sukehiro'],

  // One Punch Man
  'saitama': ['Saitama'],
  'careca de capa': ['Saitama'],
  'genos': ['Genos'],
  'tatsumaki': ['Tatsumaki'],

  // JoJo
  'jotaro': ['Jotaro Kujo'],
  'dio': ['Dio Brando'],
  'giorno': ['Giorno Giovanna'],
  'josuke': ['Josuke Higashikata'],
  'jolyne': ['Jolyne Cujoh'],
};

/**
 * Avalia se um personagem combina com a consulta do usuário.
 * Retorna uma pontuação (menor é melhor; null significa que não combina).
 * Pontuações:
 * 0: Nome exato
 * 1: Começa com a busca
 * 2: Contém a palavra buscada como token inicial
 * 3: Substring direta no nome
 * 4: Correspondência por apelido registrado
 * 5: Compactado (ex: sem espaços ou hífens) bate
 * 6: Tolerância de digitação (Levenshtein distância <= 1 ou <= 2)
 */
export function matchCharacterScore(character: Character, rawQuery: string): number | null {
  const normQ = normalizeSearchText(rawQuery);
  if (!normQ) return null;

  const compactQ = compactSearchText(rawQuery);
  const normName = normalizeSearchText(character.name);
  const compactName = compactSearchText(character.name);

  // 1. Nome exato
  if (normName === normQ || compactName === compactQ) return 0;

  // 2. Nome começa com a busca
  if (normName.startsWith(normQ)) return 1;

  // 3. Uma das palavras do nome começa com a busca (ex: "Zoro" em "Roronoa Zoro")
  const nameTokens = normName.split(' ');
  if (nameTokens.some(t => t.startsWith(normQ))) return 2;

  // 4. Substring direta no nome
  if (normName.includes(normQ)) return 3;

  // 5. Apelidos cadastrados no objeto do personagem (se houver)
  const charAliases = (character as any).aliases as string[] | undefined;
  if (charAliases && Array.isArray(charAliases)) {
    for (const alias of charAliases) {
      const normAlias = normalizeSearchText(alias);
      if (normAlias === normQ) return 1.5;
      if (normAlias.includes(normQ)) return 3.5;
    }
  }

  // 6. Apelidos globais populares
  const popularMatches = POPULAR_ALIASES[normQ];
  if (popularMatches) {
    const isTarget = popularMatches.some(m => {
      const normM = normalizeSearchText(m);
      return normName.includes(normM) || normM.includes(normName);
    });
    if (isTarget) return 2.5;
  }

  // 7. Comparação sem espaços/hífens (ex: "waterlaw" em "trafalgardwaterlaw")
  if (compactName.includes(compactQ)) return 4;

  // 8. Tolerância a pequenos erros de digitação (Levenshtein)
  // Permitido se a consulta tiver pelo menos 4 letras
  if (normQ.length >= 4) {
    const maxDistance = normQ.length >= 7 ? 2 : 1;

    // Compara a consulta com o nome completo (se comprimentos próximos)
    if (Math.abs(normName.length - normQ.length) <= maxDistance) {
      const dist = levenshteinDistance(normName, normQ);
      if (dist <= maxDistance) return 6 + dist * 0.1;
    }

    // Compara com cada palavra individual do nome (ex: "Kakashe" com "Kakashi")
    for (const token of nameTokens) {
      if (token.length >= 3 && Math.abs(token.length - normQ.length) <= maxDistance) {
        const dist = levenshteinDistance(token, normQ);
        if (dist <= maxDistance) return 6 + dist * 0.1;
      }
    }

    // Compara com apelidos populares
    for (const [aliasKey, targets] of Object.entries(POPULAR_ALIASES)) {
      if (aliasKey.length >= 4 && Math.abs(aliasKey.length - normQ.length) <= 1) {
        const dist = levenshteinDistance(aliasKey, normQ);
        if (dist <= 1) {
          const isTarget = targets.some(m => {
            const normM = normalizeSearchText(m);
            return normName.includes(normM) || normM.includes(normName);
          });
          if (isTarget) return 6.5;
        }
      }
    }
  }

  return null;
}

/**
 * Filtra e ordena personagens de acordo com a pontuação de relevância.
 */
export function filterAndRankCharacters(
  availableCharacters: Character[],
  query: string
): Character[] {
  const trimmed = query.trim();
  if (!trimmed) return availableCharacters;

  const scored: { char: Character; score: number }[] = [];

  for (const char of availableCharacters) {
    const score = matchCharacterScore(char, trimmed);
    if (score !== null) {
      scored.push({ char, score });
    }
  }

  // Ordena prioritariamente por pontuação de relevância (menor score = melhor correspondência)
  // Em caso de empate, mantém ordem alfabética
  scored.sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    return a.char.name.localeCompare(b.char.name, 'pt-BR');
  });

  return scored.map(s => s.char);
}
