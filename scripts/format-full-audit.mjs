import fs from 'fs';

const audit = JSON.parse(fs.readFileSync('scripts/comprehensive-audit.json', 'utf8'));

console.log('### Tabela 1: Resumo Geral de Avatares por Anime (Total: 32 Animes)');
console.log('| Anime | Fundo Escuro (#121A2D) | Fundo Branco Plano | Mangá P&B | Total flagged |');
console.log('| :--- | :---: | :---: | :---: | :---: |');

let totalDark = 0, totalWhite = 0, totalManga = 0, totalOverall = 0;
for (const [anime, items] of Object.entries(audit.avatars)) {
  const flatDark = items.filter(x => x.type === 'FLAT_DARK_BG_121A2D').length;
  const flatWhite = items.filter(x => x.type === 'FLAT_WHITE_BG').length;
  const manga = items.filter(x => x.type === 'GREYSCALE_MANGA').length;
  totalDark += flatDark;
  totalWhite += flatWhite;
  totalManga += manga;
  totalOverall += items.length;
  console.log(`| **${anime}** | ${flatDark} | ${flatWhite} | ${manga} | **${items.length}** |`);
}
console.log(`| **TOTAL** | **${totalDark}** | **${totalWhite}** | **${totalManga}** | **${totalOverall}** |`);
