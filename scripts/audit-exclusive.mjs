import fs from 'fs';

const content = fs.readFileSync('src/data/exclusiveChallenges.ts', 'utf8');
const badges = new Set();
for (const m of content.matchAll(/"badgeTitle":\s*"([^"]+)"/g)) {
  badges.add(m[1]);
}
console.log('Unique badges:', Array.from(badges));

// Check anime counts
const animeCounts = {};
for (const m of content.matchAll(/"animeSlug":\s*"([^"]+)"/g)) {
  animeCounts[m[1]] = (animeCounts[m[1]] || 0) + 1;
}
console.log('Challenges per anime:', animeCounts);
