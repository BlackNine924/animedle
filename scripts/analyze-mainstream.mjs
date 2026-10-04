import fs from 'fs';

const candidates = JSON.parse(fs.readFileSync('scripts/audit-candidates-all.json', 'utf8'));

const mainstream = [
  'attack-on-titan', 'chainsaw-man', 'demon-slayer', 'dragon-ball',
  'fairy-tail', 'frieren', 'fullmetal-alchemist', 'haikyuu',
  'hunter-x-hunter', 'jojos-bizarre-adventure', 'jujutsu-kaisen',
  'my-hero-academia', 'nanatsu-no-taizai', 'naruto', 'one-piece',
  'one-punch-man', 'romance', 'solo-leveling', 'tokyo-ghoul'
];

const selected = candidates.filter(c => mainstream.includes(c.anime));
const grouped = {};
for (const c of selected) {
  if (!grouped[c.anime]) grouped[c.anime] = [];
  grouped[c.anime].push(c);
}

for (const [anime, list] of Object.entries(grouped)) {
  console.log(`\n=== ${anime} (${list.length}) ===`);
  for (const item of list) {
    console.log(`  - [${item.issue}] ${item.name} (${item.avatar})`);
  }
}
