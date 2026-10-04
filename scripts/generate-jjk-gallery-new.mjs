import fs from 'fs';
import path from 'path';

const jjk = JSON.parse(fs.readFileSync('src/data/animes/jujutsu-kaisen/characters.json', 'utf8'));

let html = `<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<title>Galeria Atualizada Jujutsu Kaisen (90 Personagens)</title>
<style>
  body { background: #0f131f; color: #fff; font-family: sans-serif; padding: 20px; }
  h1 { text-align: center; color: #f43f5e; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; margin-top: 20px; }
  .card { background: #1a2035; border: 1px solid #2d3754; border-radius: 8px; padding: 10px; text-align: center; }
  .card img { width: 140px; height: 140px; object-fit: cover; border-radius: 6px; background: #0b0e17; }
  .name { font-weight: bold; font-size: 14px; margin: 8px 0 4px; }
  .meta { font-size: 11px; color: #94a3b8; }
  .hair { color: #38bdf8; font-size: 11px; margin-top: 4px; }
</style>
</head>
<body>
<h1>Galeria Canônica Jujutsu Kaisen - 90 Personagens Atualizados</h1>
<div class='grid'>
`;

for (const c of jjk) {
  html += `
  <div class='card'>
    <img src='../public${c.avatar}' alt='${c.name}'>
    <div class='name'>${c.name}</div>
    <div class='meta'>${c.id} | ${c.gender}</div>
    <div class='hair'>${c.hairColor}</div>
  </div>`;
}

html += `</div></body></html>`;
fs.writeFileSync('scripts/jjk-gallery-new.html', html);
console.log('Generated scripts/jjk-gallery-new.html');
