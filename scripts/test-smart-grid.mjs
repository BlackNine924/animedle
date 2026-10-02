import fs from 'fs';
import path from 'path';

const animesDir = 'src/data/animes';

function smartGridSolver(slug) {
  const chars = JSON.parse(fs.readFileSync(path.join(animesDir, slug, 'characters.json'), 'utf8'));
  const cleanStatus = (s) => (s || '').replace(/^Status:\s*/i, '').trim();
  const list = [];

  const genders = Array.from(new Set(chars.map((c) => (c.gender || '').trim()).filter(Boolean)));
  genders.forEach((g) => {
    const count = chars.filter((c) => (c.gender || '').trim() === g).length;
    if (count >= 2) list.push({ id: 'gender_' + g, label: g, category: 'Gênero', count, test: (c) => (c.gender || '').trim() === g });
  });

  const statuses = Array.from(new Set(chars.map((c) => cleanStatus(c.status || '')).filter(Boolean)));
  statuses.forEach((s) => {
    const count = chars.filter((c) => cleanStatus(c.status || '') === s).length;
    if (count >= 2) list.push({ id: 'status_' + s, label: s, category: 'Status', count, test: (c) => cleanStatus(c.status || '') === s });
  });

  const affMap = {};
  chars.forEach((c) => {
    if (Array.isArray(c.affiliation)) {
      c.affiliation.forEach((a) => {
        if (a && a.length > 2) affMap[a] = (affMap[a] || 0) + 1;
      });
    }
  });
  Object.entries(affMap).forEach(([aff, count]) => {
    if (count >= 2) list.push({ id: 'aff_' + aff, label: aff, category: 'Afiliação', count, test: (c) => Array.isArray(c.affiliation) && c.affiliation.includes(aff) });
  });

  const combatMap = {};
  chars.forEach((c) => {
    if (c.combatType) combatMap[c.combatType] = (combatMap[c.combatType] || 0) + 1;
  });
  Object.entries(combatMap).forEach(([ct, count]) => {
    if (count >= 2) list.push({ id: 'combat_' + ct, label: ct, category: 'Tipo de Combate', count, test: (c) => c.combatType === ct });
  });

  const hairMap = {};
  chars.forEach((c) => {
    if (c.hairColor) hairMap[c.hairColor] = (hairMap[c.hairColor] || 0) + 1;
  });
  Object.entries(hairMap).forEach(([hc, count]) => {
    if (count >= 2) list.push({ id: 'hair_' + hc, label: hc, category: 'Cor de Cabelo', count, test: (c) => c.hairColor === hc });
  });

  const roleMap = {};
  chars.forEach((c) => {
    const r = c.roleOrArchetype || c.role || c.archetype;
    if (r) roleMap[r] = (roleMap[r] || 0) + 1;
  });
  Object.entries(roleMap).forEach(([r, count]) => {
    if (count >= 2) list.push({ id: 'role_' + r, label: r, category: 'Papel na Trama', count, test: (c) => (c.roleOrArchetype === r || c.role === r || c.archetype === r) });
  });

  const specMap = {};
  chars.forEach((c) => {
    if (c.species) specMap[c.species] = (specMap[c.species] || 0) + 1;
  });
  Object.entries(specMap).forEach(([sp, count]) => {
    if (count >= 2) list.push({ id: 'spec_' + sp, label: sp, category: 'Espécie / Natureza', count, test: (c) => c.species === sp });
  });

  const originMap = {};
  chars.forEach((c) => {
    if (c.origin) originMap[c.origin] = (originMap[c.origin] || 0) + 1;
  });
  Object.entries(originMap).forEach(([orig, count]) => {
    if (count >= 2) list.push({ id: 'orig_' + orig, label: orig, category: 'Obra de Origem', count, test: (c) => c.origin === orig });
  });

  const arcMap = {};
  chars.forEach((c) => {
    if (c.debutArc && c.debutArc.trim().length > 2) {
      const arc = c.debutArc.trim();
      arcMap[arc] = (arcMap[arc] || 0) + 1;
    }
  });
  Object.entries(arcMap).forEach(([arc, count]) => {
    if (count >= 2) list.push({ id: 'arc_' + arc, label: arc, category: 'Arco de Estreia', count, test: (c) => (c.debutArc || '').trim() === arc });
  });

  const seedStr = 'daily_' + slug + '_2026-10-02';
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const pseudoRandom = () => {
    hash = Math.sin(hash++) * 10000;
    return hash - Math.floor(hash);
  };

  const shuffled = [...list].sort(() => pseudoRandom() - 0.5);

  for (let i = 0; i < shuffled.length; i++) {
    const r1 = shuffled[i];
    for (let j = i + 1; j < shuffled.length; j++) {
      const r2 = shuffled[j];
      if (r2.category === r1.category) continue;
      for (let k = j + 1; k < Math.min(shuffled.length, j + 30); k++) {
        const r3 = shuffled[k];
        if (r3.category === r1.category || r3.category === r2.category) continue;
        const rows = [r1, r2, r3];
        const rowCats = new Set([r1.category, r2.category, r3.category]);
        const rowIds = new Set([r1.id, r2.id, r3.id]);

        const validCols = list.filter((col) => {
          if (rowIds.has(col.id)) return false;
          return chars.some((c) => r1.test(c) && col.test(c)) &&
                 chars.some((c) => r2.test(c) && col.test(c)) &&
                 chars.some((c) => r3.test(c) && col.test(c));
        });

        // 1. Tenta achar 3 colunas com 3 categorias distintas entre si e das 3 linhas (6 categorias 100% distintas)
        const distinctCols = validCols.filter((col) => !rowCats.has(col.category));
        for (let c1Idx = 0; c1Idx < distinctCols.length; c1Idx++) {
          const c1 = distinctCols[c1Idx];
          for (let c2Idx = c1Idx + 1; c2Idx < distinctCols.length; c2Idx++) {
            const c2 = distinctCols[c2Idx];
            if (c2.category === c1.category) continue;
            for (let c3Idx = c2Idx + 1; c3Idx < distinctCols.length; c3Idx++) {
              const c3 = distinctCols[c3Idx];
              if (c3.category === c1.category || c3.category === c2.category) continue;
              return { success: true, mode: '6 CATEGORIAS DISTINTAS', rows: rows.map(r => r.label), cols: [c1.label, c2.label, c3.label] };
            }
          }
        }

        // 2. Se não achou 6 categorias distintas, tenta achar 3 colunas distintas entre si (3 nas linhas + 3 nas colunas)
        for (let c1Idx = 0; c1Idx < validCols.length; c1Idx++) {
          const c1 = validCols[c1Idx];
          for (let c2Idx = c1Idx + 1; c2Idx < validCols.length; c2Idx++) {
            const c2 = validCols[c2Idx];
            if (c2.category === c1.category) continue;
            for (let c3Idx = c2Idx + 1; c3Idx < validCols.length; c3Idx++) {
              const c3 = validCols[c3Idx];
              if (c3.category === c1.category || c3.category === c2.category) continue;
              return { success: true, mode: '3+3 CATEGORIAS DISTINTAS', rows: rows.map(r => r.label), cols: [c1.label, c2.label, c3.label] };
            }
          }
        }
      }
    }
  }

  return { success: false };
}

let passed = 0;
for (const dir of fs.readdirSync(animesDir)) {
  if (!fs.existsSync(path.join(animesDir, dir, 'characters.json'))) continue;
  const res = smartGridSolver(dir);
  if (res.success) {
    passed++;
    console.log(`[OK] ${dir.padEnd(30)} -> ${res.mode}`);
  } else {
    console.log(`[FALHA] ${dir}`);
  }
}
console.log(`\nTaxa de Sucesso: ${passed}/32 animes geraram Grid 3x3 válido!`);
