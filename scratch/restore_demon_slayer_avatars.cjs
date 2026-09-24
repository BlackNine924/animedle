const fs = require('fs');

const dsPath = 'src/data/animes/demon-slayer/characters.json';
const dsChars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));
const anilistDS = JSON.parse(fs.readFileSync('scratch/anilist_ds_chars.json', 'utf8'));

function normalize(str) {
  if (!str) return '';
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getAniListNames(node) {
  const names = [];
  if (node.name.full) names.push(normalize(node.name.full));
  if (node.name.native) names.push(normalize(node.name.native));
  if (node.name.userPreferred) names.push(normalize(node.name.userPreferred));
  if (node.name.alternative) {
    node.name.alternative.forEach(alt => names.push(normalize(alt)));
  }
  return names;
}

let restoredCount = 0;
let unmatched = [];

dsChars.forEach(c => {
  const cNorm = normalize(c.name);
  const cClean = normalize(c.name.split('(')[0]);

  let match = anilistDS.find(node => {
    const nodeNames = getAniListNames(node);
    return nodeNames.includes(cNorm) || nodeNames.includes(cClean);
  });

  if (match && match.image && match.image.large) {
    c.avatar = match.image.large;
    restoredCount++;
  } else {
    unmatched.push(c);
  }
});

console.log(`Restored ${restoredCount} out of ${dsChars.length} Demon Slayer avatars!`);
if (unmatched.length > 0) {
  console.log(`Unmatched characters (${unmatched.length}):`);
  unmatched.forEach(u => console.log(` - ${u.id}: "${u.name}"`));
}

fs.writeFileSync(dsPath, JSON.stringify(dsChars, null, 2));
