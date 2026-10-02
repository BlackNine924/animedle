import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('src/data/exclusiveChallenges.ts', 'utf8');
const start = content.indexOf(' = [') + 3;
const end = content.lastIndexOf('];');
const jsonStr = content.slice(start, end + 1);
const challenges = JSON.parse(jsonStr);

console.log('Total challenges:', challenges.length);

const animeDirs = fs.readdirSync('src/data/animes');
const animeChars = {};
for (const dir of animeDirs) {
  const p = path.join('src/data/animes', dir, 'characters.json');
  if (fs.existsSync(p)) {
    animeChars[dir] = JSON.parse(fs.readFileSync(p, 'utf8'));
  }
}

const mismatches = [];
const countsPerAnime = {};

for (const ch of challenges) {
  countsPerAnime[ch.animeSlug] = (countsPerAnime[ch.animeSlug] || 0) + 1;
  const chars = animeChars[ch.animeSlug] || [];
  const found = chars.find((c) => c.id === ch.targetCharacterId);
  if (!found) {
    const foundByName = chars.find((c) => c.name.toLowerCase().trim() === ch.targetCharacterName.toLowerCase().trim());
    mismatches.push({
      challengeId: ch.id,
      slug: ch.animeSlug,
      targetId: ch.targetCharacterId,
      targetName: ch.targetCharacterName,
      foundByNameId: foundByName ? foundByName.id : 'NOT_FOUND',
    });
  }
}

console.log('Challenges per anime:', countsPerAnime);
console.log('Mismatches count:', mismatches.length);
if (mismatches.length > 0) {
  console.log('Mismatches:', mismatches);
}
