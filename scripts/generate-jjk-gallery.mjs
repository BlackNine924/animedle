import fs from 'fs';

const chars = JSON.parse(fs.readFileSync('src/data/animes/jujutsu-kaisen/characters.json', 'utf8'));

let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Jujutsu Kaisen Avatar Audit</title>
  <style>
    body { font-family: sans-serif; background: #0b0f19; color: #fff; padding: 20px; }
    h1 { text-align: center; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .card { background: #161f30; border-radius: 8px; padding: 12px; text-align: center; border: 1px solid #2d3748; }
    img { width: 150px; height: 150px; object-fit: cover; border-radius: 6px; border: 2px solid #4a5568; }
    .name { font-weight: bold; margin-top: 8px; font-size: 14px; }
    .id { font-size: 11px; color: #a0aec0; }
    .hair { font-size: 12px; color: #cbd5e0; margin-top: 4px; }
  </style>
</head>
<body>
  <h1>Jujutsu Kaisen Avatar Audit (90 Personagens)</h1>
  <div class="grid">
`;

for (const c of chars) {
  const imgSrc = `../public${c.avatar}`;
  html += `
    <div class="card">
      <img src="${imgSrc}" alt="${c.name}">
      <div class="name">${c.name}</div>
      <div class="id">${c.id}</div>
      <div class="hair">${c.hairColor} | ${c.gender}</div>
    </div>
  `;
}

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync('scripts/jjk-gallery.html', html);
console.log('JJK Gallery written to scripts/jjk-gallery.html');
