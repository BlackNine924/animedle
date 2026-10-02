import fs from 'fs';

let content = fs.readFileSync('src/data/exclusiveChallenges.ts', 'utf8');

// Replace parentheses in Titan target titles
content = content
  .replace(/"targetTitle":\s*"Titã Colossal \(60 Metros\)"/g, '"targetTitle": "Titã Colossal"')
  .replace(/"targetTitle":\s*"Titã Colossal \(Colossus Titan\)"/g, '"targetTitle": "Titã Colossal"')
  .replace(/"targetTitle":\s*"Titã Mandíbula \(Máscara Óssea\)"/g, '"targetTitle": "Titã Mandíbula"')
  .replace(/"targetTitle":\s*"Titã Quadrúpede \(Cart Titan\)"/g, '"targetTitle": "Titã Quadrúpede"')
  .replace(/"targetTitle":\s*"Titã Bestial \(17 Metros\)"/g, '"targetTitle": "Titã Bestial"')
  .replace(/"targetTitle":\s*"Titã Bestial \(Beast Titan\)"/g, '"targetTitle": "Titã Bestial"')
  .replace(/"targetTitle":\s*"Titã Blindado \(Armored Titan\)"/g, '"targetTitle": "Titã Blindado"');

// Fix targetCharacterId for bang and yuuki
content = content
  .replace(/"targetCharacterId":\s*"silver-fang"/g, '"targetCharacterId": "bang"')
  .replace(/"targetCharacterId":\s*"yuuki-konno"/g, '"targetCharacterId": "yuuki"');

fs.writeFileSync('src/data/exclusiveChallenges.ts', content, 'utf8');
console.log('Cleaned titan titles and fixed character IDs in exclusiveChallenges.ts');
