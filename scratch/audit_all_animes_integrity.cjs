const fs = require('fs');

const files = {
  'one-piece': 'src/data/animes/one-piece/characters.json',
  'demon-slayer': 'src/data/animes/demon-slayer/characters.json',
  'jujutsu-kaisen': 'src/data/animes/jujutsu-kaisen/characters.json'
};

Object.entries(files).forEach(([slug, filePath]) => {
  console.log(`\n=================== AUDITING ${slug.toUpperCase()} ===================`);
  const chars = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`Total characters: ${chars.length}`);

  let undefCount = 0;
  chars.forEach((c, idx) => {
    const missingKeys = [];
    Object.entries(c).forEach(([key, val]) => {
      if (val === undefined || val === null) {
        missingKeys.push(key);
      }
    });
    if (missingKeys.length > 0) {
      console.log(`[UNDEFINED KEY] ${c.id} (${c.name}): missing ${missingKeys.join(', ')}`);
      undefCount++;
    }
  });

  if (undefCount === 0) {
    console.log(`✓ No undefined keys in ${slug}!`);
  }
});
