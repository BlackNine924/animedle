import fs from 'fs';
import sharp from 'sharp';

const chars = JSON.parse(fs.readFileSync('src/data/animes/romance/characters.json'));

async function inspectRomanceAvatars() {
  const issues = [];
  for (const c of chars) {
    const p = 'public' + c.avatar;
    if (!fs.existsSync(p)) {
      issues.push({ id: c.id, name: c.name, origin: c.origin, issue: 'missing' });
      continue;
    }
    const stats = await sharp(p).stats();
    if (!stats.isOpaque) {
      issues.push({ id: c.id, name: c.name, origin: c.origin, issue: 'transparent' });
    }
  }
  console.log(`Found ${issues.length} romance characters with transparency issues:`);
  console.log(JSON.stringify(issues, null, 2));
}

inspectRomanceAvatars();
