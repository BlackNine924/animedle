import { EXCLUSIVE_CHALLENGES } from '../src/data/exclusiveChallenges';
import fs from 'fs';

const opChars = JSON.parse(fs.readFileSync('src/data/animes/one-piece/characters.json', 'utf-8'));
const opSet = new Set(opChars.map((c: any) => c.id));

const filtered = EXCLUSIVE_CHALLENGES.filter(ch => {
  if (ch.id === 'exc-op-17-shu' || ch.id === 'exc-op-116-bunbuku') {
    return false;
  }
  return true;
});

const newFileContent = `export interface ExclusiveChallenge {
  id: string;
  animeSlug: string;
  category: string;
  questionTitle: string;
  targetTitle: string;
  badgeTitle: string;
  targetCharacterId: string;
  targetCharacterName: string;
  validCharacterIds?: string[];
  clues: { label: string; value: string }[];
  contextExplanation?: string;
}

export const EXCLUSIVE_CHALLENGES: ExclusiveChallenge[] = ${JSON.stringify(filtered, null, 2)};
`;

fs.writeFileSync('src/data/exclusiveChallenges.ts', newFileContent, 'utf-8');
console.log('Filtered challenges count:', filtered.length);
