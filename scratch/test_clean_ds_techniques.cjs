const fs = require('fs');
const chars = JSON.parse(fs.readFileSync('src/data/animes/demon-slayer/characters.json', 'utf8'));

function extractCleanDSTechniqueName(str) {
  if (!str || str === 'Nenhum') return '';
  let clean = str;
  // Remove "Respiração ... - ... Forma: " or "Respiração ... : "
  clean = clean.replace(/^Respiração [^-]+ - [^:]+:\s*/i, '');
  clean = clean.replace(/^Respiração [^:]+:\s*/i, '');
  clean = clean.replace(/^Kekkijutsu:\s*/i, '');
  clean = clean.replace(/^Kekkijutsu\s*-\s*/i, '');
  return clean.trim();
}

chars.forEach(c => {
  if (c.styleOrPower && c.styleOrPower !== 'Nenhum') {
    const cleaned = extractCleanDSTechniqueName(c.styleOrPower);
    console.log(`[${c.id}] ORIGINAL: "${c.styleOrPower}" => CLEAN: "${cleaned}"`);
  }
});
