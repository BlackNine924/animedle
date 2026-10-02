import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const COLORS = [
  ['#4f46e5', '#312e81'],
  ['#e11d48', '#881337'],
  ['#059669', '#064e3b'],
  ['#d97706', '#78350f'],
  ['#7c3aed', '#4c1d95'],
  ['#0891b2', '#164e63']
];

async function ensureAvatars() {
  const dirs = fs.readdirSync('src/data/animes');
  let created = 0;

  for (const slug of dirs) {
    const jsonPath = path.join('src/data/animes', slug, 'characters.json');
    if (!fs.existsSync(jsonPath)) continue;
    const chars = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    for (const c of chars) {
      if (!c.avatar || !c.avatar.startsWith('/avatars/')) continue;
      const fullPath = path.join('public', c.avatar.replace(/^\//, ''));
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        const charCode = (c.name || 'A').charCodeAt(0);
        const colPair = COLORS[charCode % COLORS.length];
        const letter = (c.name || '?')[0].toUpperCase();

        const svg = `
          <svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${colPair[0]}"/>
                <stop offset="100%" stop-color="${colPair[1]}"/>
              </linearGradient>
            </defs>
            <rect width="240" height="240" rx="120" fill="url(#g)"/>
            <text x="120" y="152" font-family="Inter, Arial, sans-serif" font-size="96" font-weight="900" fill="#ffffff" text-anchor="middle">${letter}</text>
          </svg>
        `;

        await sharp(Buffer.from(svg)).png().toFile(fullPath);
        created++;
      }
    }
  }

  console.log(`Todos os avatares garantidos! Novos criados: ${created}`);
}

ensureAvatars();
