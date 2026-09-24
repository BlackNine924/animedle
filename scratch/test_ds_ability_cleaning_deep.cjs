const fs = require('fs');

const dsPath = 'src/data/animes/demon-slayer/characters.json';
const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

function cleanDSTechnique(str) {
  if (!str || str === 'Nenhum' || str === 'Nenhuma') return '';

  let clean = str;

  // 1. Remove "Respiração ..." prefixes (e.g. Respiração das Chamas - Nona Forma: Rengoku -> Rengoku)
  clean = clean.replace(/^Respiração [^\-\:]+(?:(?:\s*-\s*|\s*:\s*)[^\:\-]+\s*(?:Forma|Presa|Dança)[^\:\-]*\s*\:\s*|\s*:\s*|\s*-\s*)/i, '');
  clean = clean.replace(/^Respiração [^\:\-\(\)]+:\s*/i, '');
  clean = clean.replace(/^Respiração [^\:\-\(\)]+\s*\(([^)]+)\)/i, '$1');

  // 2. Remove "Kekkijutsu: " or "Kekkijutsu - "
  clean = clean.replace(/^Kekkijutsu\s*[\:\-]\s*/i, '');

  // 3. Remove leftover words "Respiração", "Forma", "Presa", "Kekkijutsu", "Arte Demoníaca" if any remain at start
  clean = clean.replace(/^(?:Respiração|Kekkijutsu|Forma|Arte Demoníaca)\s*[\:\-]?\s*/i, '');

  return clean.trim();
}

console.log('=== TESTING DS ABILITY CLEANING ===');
chars.forEach(c => {
  if (c.styleOrPower && c.styleOrPower !== 'Nenhum' && c.styleOrPower !== 'Nenhuma') {
    const cleaned = cleanDSTechnique(c.styleOrPower);
    console.log(`[${c.id}]`);
    console.log(`   BEFORE: "${c.styleOrPower}"`);
    console.log(`   AFTER : "${cleaned}"\n`);
  }
});
