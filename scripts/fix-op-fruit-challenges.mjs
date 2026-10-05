import fs from 'fs';

const removeIds = new Set([
  'exc-op-16-very-good',
  'exc-op-18-sharinguru',
  'exc-op-41-kelly-funk',
  'exc-op-117-kabu',
  'exc-op-118-bian',
  'exc-op-119-smiley',
  'exc-op-120-spandam',
  'exc-op-121-mr-4',
  'exc-op-126-charlotte-newshi',
  'exc-op-129-charlotte-snack',
  'exc-op-130-stronger',
  'exc-op-131-pierre',
  'exc-op-132-minotauros',
  'exc-op-133-onigumo'
]);

let content = fs.readFileSync('src/data/exclusiveChallenges.ts', 'utf8');

const opPath = 'src/data/animes/one-piece/characters.json';
const opChars = JSON.parse(fs.readFileSync(opPath, 'utf8'));
const mont = opChars.find(c => c.id === 'charlotte-mont-dor');
if (mont) {
  mont.styleOrPower = 'Paramecia (Buku Buku no Mi / Hon Hon no Mi)';
  fs.writeFileSync(opPath, JSON.stringify(opChars, null, 2));
  console.log("Updated Mont-d'or styleOrPower");
}

let removedCount = 0;
for (const id of removeIds) {
  const marker = '"id": "' + id + '"';
  const pos = content.indexOf(marker);
  if (pos !== -1) {
    // Find the opening brace before pos
    const openBrace = content.lastIndexOf('{', pos);
    // Find the matching closing brace
    let depth = 0;
    let closeBrace = -1;
    for (let i = openBrace; i < content.length; i++) {
      if (content[i] === '{') depth++;
      else if (content[i] === '}') {
        depth--;
        if (depth === 0) {
          closeBrace = i;
          break;
        }
      }
    }
    if (closeBrace !== -1) {
      // Also consume trailing comma and whitespace if present
      let endPos = closeBrace + 1;
      while (endPos < content.length && (content[endPos] === ' ' || content[endPos] === '\t' || content[endPos] === '\r' || content[endPos] === '\n')) {
        endPos++;
      }
      if (content[endPos] === ',') {
        endPos++;
      }
      content = content.slice(0, openBrace) + content.slice(endPos);
      removedCount++;
      console.log('Successfully removed:', id);
    }
  } else {
    console.log('Not found:', id);
  }
}

fs.writeFileSync('src/data/exclusiveChallenges.ts', content, 'utf8');
console.log('Done! Removed total:', removedCount);
