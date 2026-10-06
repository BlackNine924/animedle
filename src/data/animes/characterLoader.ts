import { Character } from '../../types/anime';

// Mapeamento de imports dinâmicos do Vite para cada anime (Code Splitting granular)
const LOADERS: Record<string, () => Promise<{ default: any[] }>> = {
  'akame-ga-kill': () => import('./akame-ga-kill/characters.json'),
  'attack-on-titan': () => import('./attack-on-titan/characters.json'),
  'berserk': () => import('./berserk/characters.json'),
  'black-clover': () => import('./black-clover/characters.json'),
  'bleach': () => import('./bleach/characters.json'),
  'blue-lock': () => import('./blue-lock/characters.json'),
  'chainsaw-man': () => import('./chainsaw-man/characters.json'),
  'cyberpunk-edgerunners': () => import('./cyberpunk-edgerunners/characters.json'),
  'dandadan': () => import('./dandadan/characters.json'),
  'demon-slayer': () => import('./demon-slayer/characters.json'),
  'dragon-ball': () => import('./dragon-ball/characters.json'),
  'fairy-tail': () => import('./fairy-tail/characters.json'),
  'frieren': () => import('./frieren/characters.json'),
  'fullmetal-alchemist': () => import('./fullmetal-alchemist/characters.json'),
  'haikyuu': () => import('./haikyuu/characters.json'),
  'hunter-x-hunter': () => import('./hunter-x-hunter/characters.json'),
  'jojos-bizarre-adventure': () => import('./jojos-bizarre-adventure/characters.json'),
  'jujutsu-kaisen': () => import('./jujutsu-kaisen/characters.json'),
  'kaiju-no-8': () => import('./kaiju-no-8/characters.json'),
  'my-hero-academia': () => import('./my-hero-academia/characters.json'),
  'nanatsu-no-taizai': () => import('./nanatsu-no-taizai/characters.json'),
  'naruto': () => import('./naruto/characters.json'),
  'one-piece': () => import('./one-piece/characters.json'),
  'one-punch-man': () => import('./one-punch-man/characters.json'),
  'record-of-ragnarok': () => import('./record-of-ragnarok/characters.json'),
  'romance': () => import('./romance/characters.json'),
  'shangri-la-frontier': () => import('./shangri-la-frontier/characters.json'),
  'solo-leveling': () => import('./solo-leveling/characters.json'),
  'sword-art-online': () => import('./sword-art-online/characters.json'),
  'tensei-shitara-slime-datta-ken': () => import('./tensei-shitara-slime-datta-ken/characters.json'),
  'tokyo-ghoul': () => import('./tokyo-ghoul/characters.json'),
  'witch-hat-atelier': () => import('./witch-hat-atelier/characters.json'),
};

const charactersCache: Record<string, Character[]> = {};

/**
 * Carrega a base de dados de personagens sob demanda (lazy-loading).
 * Garante que apenas o JSON do anime atual seja baixado pelo navegador.
 */
export async function loadAnimeCharacters(slug: string): Promise<Character[]> {
  if (charactersCache[slug]) {
    return charactersCache[slug];
  }

  const loader = LOADERS[slug] || LOADERS['demon-slayer'];
  const module = await loader();
  const data = (module.default || module) as Character[];

  charactersCache[slug] = data;
  return data;
}
