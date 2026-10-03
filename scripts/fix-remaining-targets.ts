import { EXCLUSIVE_CHALLENGES } from '../src/data/exclusiveChallenges';
import fs from 'fs';

const opChars = JSON.parse(fs.readFileSync('src/data/animes/one-piece/characters.json', 'utf-8'));
const opSet = new Set(opChars.map((c: any) => c.id));

const aotChars = JSON.parse(fs.readFileSync('src/data/animes/attack-on-titan/characters.json', 'utf-8'));
const aotSet = new Set(aotChars.map((c: any) => c.id));

const dsChars = JSON.parse(fs.readFileSync('src/data/animes/demon-slayer/characters.json', 'utf-8'));
const dsSet = new Set(dsChars.map((c: any) => c.id));

console.log('Total challenges:', EXCLUSIVE_CHALLENGES.length);

let fixedCount = 0;

for (const ch of EXCLUSIVE_CHALLENGES) {
  // AOT Mandibula
  if (ch.animeSlug === 'attack-on-titan' && ch.validCharacterIds?.includes('ymir')) {
    ch.validCharacterIds = ch.validCharacterIds.map(id => id === 'ymir' ? 'ymir-104' : id);
    if (ch.targetCharacterId === 'ymir') ch.targetCharacterId = 'ymir-104';
    fixedCount++;
  }

  // Demon Slayer Trovao
  if (ch.animeSlug === 'demon-slayer' && ch.validCharacterIds?.includes('kaigaku')) {
    ch.validCharacterIds = ch.validCharacterIds.filter(id => id !== 'kaigaku');
    ch.validCharacterIds.push('kaigaku-human', 'kaigaku-demon');
    if (ch.targetCharacterId === 'kaigaku') ch.targetCharacterId = 'kaigaku-demon';
    fixedCount++;
  }

  // One piece
  if (ch.animeSlug === 'one-piece') {
    // teach
    if (ch.targetCharacterId === 'marshall-d-teach-barba-negra') {
      ch.targetCharacterId = 'marshall-d-teach';
      fixedCount++;
    }
    if (ch.validCharacterIds?.includes('marshall-d-teach-barba-negra')) {
      ch.validCharacterIds = ch.validCharacterIds.map(id => id === 'marshall-d-teach-barba-negra' ? 'marshall-d-teach' : id);
      fixedCount++;
    }
    // kanjuro
    if (ch.targetCharacterId === 'kanjuro') {
      ch.targetCharacterId = 'kurozumi-kanjuro';
      fixedCount++;
    }
    if (ch.validCharacterIds?.includes('kanjuro')) {
      ch.validCharacterIds = ch.validCharacterIds.map(id => id === 'kanjuro' ? 'kurozumi-kanjuro' : id);
      fixedCount++;
    }
    // filter out non-existent character IDs from validCharacterIds if they aren't in characters.json
    if (ch.validCharacterIds) {
      ch.validCharacterIds = ch.validCharacterIds.filter(id => opSet.has(id));
    }
  }
}

// Check if any OP challenge has a targetCharacterId not in opSet
for (let i = EXCLUSIVE_CHALLENGES.length - 1; i >= 0; i--) {
  const ch = EXCLUSIVE_CHALLENGES[i];
  if (ch.animeSlug === 'one-piece' && !opSet.has(ch.targetCharacterId)) {
    console.log(`OP Challenge still missing target: ${ch.id} -> ${ch.targetCharacterId} (${ch.targetTitle})`);
  }
}

// Write back to src/data/exclusiveChallenges.ts
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

export const EXCLUSIVE_CHALLENGES: ExclusiveChallenge[] = ${JSON.stringify(EXCLUSIVE_CHALLENGES, null, 2)};
`;

fs.writeFileSync('src/data/exclusiveChallenges.ts', newFileContent, 'utf-8');
console.log('Saved exclusiveChallenges.ts! Fixed count:', fixedCount);
