const fs = require('fs');

const officialNodes = JSON.parse(fs.readFileSync('scratch/official_ds_nodes.json', 'utf8'));

console.log(`=== OFFICIAL DEMON SLAYER (MEDIA 101922) NODES (${officialNodes.length}) ===`);
officialNodes.forEach(node => {
  console.log(`ID ${node.id}: "${node.name.full}" (${node.name.native || ''}) -> ${node.image ? node.image.large : 'NO IMAGE'}`);
});
