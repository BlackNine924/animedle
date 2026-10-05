import fs from 'fs';

const content = fs.readFileSync('src/data/exclusiveChallenges.ts', 'utf8');
const opChars = JSON.parse(fs.readFileSync('src/data/animes/one-piece/characters.json', 'utf8'));
const opMap = new Map(opChars.map(c => [c.id, c]));

// Parse the array in exclusiveChallenges.ts
// We can find all blocks with "animeSlug": "one-piece"
const blocks = content.split(/\{\s*\"id\":\s*\"exc-op-/).slice(1);

const issues = [];
for (const b of blocks) {
  const idMatch = b.match(/^([^\"]+)\"/);
  const targetTitleMatch = b.match(/\"targetTitle\":\s*\"([^\"]+)\"/);
  const targetCharMatch = b.match(/\"targetCharacterId\":\s*\"([^\"]+)\"/);
  const targetCharNameMatch = b.match(/\"targetCharacterName\":\s*\"([^\"]+)\"/);

  if (idMatch && targetTitleMatch && targetCharMatch) {
    const id = 'exc-op-' + idMatch[1];
    const fruit = targetTitleMatch[1];
    const charId = targetCharMatch[1];
    const char = opMap.get(charId);

    if (!char) {
      issues.push({ id, fruit, charId, error: 'Character not found' });
    } else {
      const power = (char.styleOrPower || '').toLowerCase();
      // Check if the fruit name (e.g., "goro goro", "moku moku", "doku doku") appears in power
      const fruitWords = fruit.toLowerCase().match(/[a-z]{3,}\s+[a-z]{3,}\s+no\s+mi/);
      const fruitKey = fruitWords ? fruitWords[0] : fruit.toLowerCase();
      if (!power.includes(fruitKey)) {
        issues.push({ id, fruit, charId, charName: char.name, power: char.styleOrPower });
      }
    }
  }
}

console.log('Total One Piece challenges checked:', blocks.length);
console.log('Mismatched challenges count:', issues.length);
for (const i of issues) {
  console.log(`${i.id} | Fruit: "${i.fruit}" | Assigned: ${i.charName} (${i.charId}) | Actual Power: "${i.power}"`);
}
