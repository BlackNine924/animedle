import fs from 'fs';
import path from 'path';

const chars = JSON.parse(fs.readFileSync('src/data/animes/romance/characters.json', 'utf8'));

const cards = chars.map(c => {
  const relPath = '../public' + c.avatar;
  return `
    <div class="card">
      <img src="${relPath}" loading="lazy" />
      <div class="name">${c.name}</div>
      <div class="id">${c.id}</div>
    </div>
  `;
}).join('\n');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Romance Avatars Gallery</title>
  <style>
    body { background: #121212; color: #eee; font-family: system-ui, sans-serif; margin: 0; padding: 20px; }
    h1 { font-size: 20px; margin-bottom: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; }
    .card { background: #1e1e1e; border: 1px solid #333; border-radius: 8px; padding: 8px; text-align: center; }
    img { width: 110px; height: 110px; object-fit: cover; border-radius: 6px; border: 1px solid #444; }
    .name { font-size: 12px; font-weight: 600; margin-top: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .id { font-size: 10px; color: #888; margin-top: 2px; }
  </style>
</head>
<body>
  <h1>Romance Avatars (${chars.length})</h1>
  <div class="grid">
    ${cards}
  </div>
</body>
</html>`;

fs.writeFileSync('scripts/romance-gallery.html', html, 'utf8');
console.log(`Generated romance-gallery.html with ${chars.length} characters.`);
