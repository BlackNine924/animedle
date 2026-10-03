import { EXCLUSIVE_CHALLENGES } from '../src/data/exclusiveChallenges';
import fs from 'fs';

let total = 0;
let missing = 0;
const cachedChars = new Map<string, { set: Set<string>, list: any[] }>();

for (const ch of EXCLUSIVE_CHALLENGES) {
  total++;
  const slug = ch.animeSlug;
  if (!cachedChars.has(slug)) {
    const charsPath = `src/data/animes/${slug}/characters.json`;
    if (!fs.existsSync(charsPath)) {
      console.log(`No chars file for anime ${slug} at ${charsPath}`);
      cachedChars.set(slug, { set: new Set(), list: [] });
    } else {
      const chars = JSON.parse(fs.readFileSync(charsPath, 'utf-8'));
      cachedChars.set(slug, { set: new Set(chars.map((c: any) => c.id)), list: chars });
    }
  }

  const { set: charIds, list: chars } = cachedChars.get(slug)!;
  const allTargets = Array.from(new Set([ch.targetCharacterId, ...(ch.validCharacterIds || [])]));

  for (const tid of allTargets) {
    if (!charIds.has(tid)) {
      console.log(`[${slug}] Challenge '${ch.targetTitle || ch.questionTitle}' targets missing id: '${tid}'`);
      missing++;
    }
  }
}

console.log(`\nAudited ${total} challenges across all animes.`);
console.log(`Missing targets: ${missing}`);
