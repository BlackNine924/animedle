import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function auditAllAnimes() {
  const dirs = fs.readdirSync('src/data/animes');
  const results = {};

  for (const slug of dirs) {
    const jsonPath = path.join('src/data/animes', slug, 'characters.json');
    if (!fs.existsSync(jsonPath)) continue;
    const chars = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    const list = [];
    for (const c of chars) {
      if (!c.avatar) continue;
      const fullPath = path.join('public', c.avatar.replace(/^\//, ''));
      if (!fs.existsSync(fullPath)) {
        list.push({ id: c.id, name: c.name, type: 'missing' });
        continue;
      }
      try {
        const stats = await sharp(fullPath).stats();
        const isGreyscale = stats.isOpaque &&
          Math.abs(stats.channels[0].mean - stats.channels[1].mean) < 2 &&
          Math.abs(stats.channels[1].mean - stats.channels[2].mean) < 2;

        if (!stats.isOpaque) {
          list.push({ id: c.id, name: c.name, type: 'transparent' });
        } else if (isGreyscale) {
          list.push({ id: c.id, name: c.name, type: 'greyscale_manga' });
        }
      } catch (err) {
        list.push({ id: c.id, name: c.name, type: 'corrupt' });
      }
    }

    if (list.length > 0) {
      results[slug] = list;
    }
  }

  console.log('=== AUDIT RESULTS SUMMARY ===');
  let totalIssues = 0;
  for (const [slug, items] of Object.entries(results)) {
    const trans = items.filter(i => i.type === 'transparent').length;
    const grey = items.filter(i => i.type === 'greyscale_manga').length;
    const miss = items.filter(i => i.type === 'missing').length;
    totalIssues += items.length;
    console.log(`${slug}: total ${items.length} issues (trans: ${trans}, grey: ${grey}, miss: ${miss})`);
  }
  console.log(`\nTotal characters needing attention: ${totalIssues}`);

  fs.writeFileSync('scripts/audit-all-issues.json', JSON.stringify(results, null, 2));
}

auditAllAnimes();
