const fs = require('fs');

const allSeasonsNodes = JSON.parse(fs.readFileSync('scratch/all_ds_seasons_nodes.json', 'utf8'));

console.log(`=== ALL DEMON SLAYER SEASONS NODES (${allSeasonsNodes.length}) ===`);

const targets = [
  'nakime', 'douma', 'doma', 'karaku', 'sekido', 'urogi', 'aizetsu', 'zohakuten',
  'daki', 'gyuutarou', 'gyutaro', 'giyuu', 'giyu', 'gyoumei', 'gyomei',
  'kaigaku', 'kumo', 'mother', 'father', 'makio', 'suma', 'hinatsuru', 'tanjuurou', 'tanjuro', 'nezuko'
];

allSeasonsNodes.forEach(node => {
  const nameLower = (node.name.full + ' ' + (node.name.userPreferred || '') + ' ' + (node.name.alternative || []).join(' ')).toLowerCase();
  for (let t of targets) {
    if (nameLower.includes(t)) {
      console.log(`Node ID ${node.id}: "${node.name.full}" => ${node.image.large}`);
      break;
    }
  }
});
