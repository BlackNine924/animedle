import fs from 'fs';

const animes = fs.readdirSync('src/data/animes').filter(f => fs.statSync('src/data/animes/' + f).isDirectory());

const report = {};

for (const anime of animes) {
  const charsPath = `src/data/animes/${anime}/characters.json`;
  if (!fs.existsSync(charsPath)) continue;
  const chars = JSON.parse(fs.readFileSync(charsPath, 'utf-8'));
  const counts = {};
  for (const c of chars) {
    counts[c.hairColor] = (counts[c.hairColor] || 0) + 1;
  }
  report[anime] = { total: chars.length, counts };
}

console.log(JSON.stringify(report, null, 2));
