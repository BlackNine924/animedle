import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const ANIMES = [
  'bleach',
  'blue-lock',
  'demon-slayer',
  'dragon-ball',
  'jojos-bizarre-adventure',
  'jujutsu-kaisen',
  'naruto',
  'one-piece',
  'record-of-ragnarok',
  'solo-leveling'
];

async function checkUrl(url) {
  if (!url) return { ok: false, error: 'URL vazia ou inexistente' };
  
  // Local file check
  if (url.startsWith('/')) {
    const localPath = path.join(rootDir, 'public', url.slice(1));
    if (!fs.existsSync(localPath)) {
      return { ok: false, error: `Arquivo local inexistente: public/${url.slice(1)}` };
    }
    const stats = fs.statSync(localPath);
    if (stats.size < 500) {
      return { ok: false, error: `Arquivo local muito pequeno ou corrompido (${stats.size} bytes)` };
    }
    return { ok: true, type: 'local', size: stats.size };
  }

  // Known risky patterns
  if (url.includes('images.weserv.nl') || url.includes('nocookie.net')) {
    return { ok: false, error: 'URL externa não confiável (Wikia/weserv suscetível a bloqueio 403)' };
  }

  // External network check
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      return { ok: true, type: 'remote', status: res.status };
    }
    return { ok: false, error: `HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, error: err.name === 'AbortError' ? 'Timeout (4s)' : err.message };
  }
}

async function runAudit() {
  console.log('\n======================================================');
  console.log('       🔍 AUDITORIA AUTOMÁTICA GERAL DO ANIMEDLE       ');
  console.log('======================================================\n');

  let totalCharacters = 0;
  let totalErrors = 0;
  let totalWarnings = 0;
  const animeResults = {};

  for (const anime of ANIMES) {
    const jsonPath = path.join(rootDir, 'src', 'data', 'animes', anime, 'characters.json');
    if (!fs.existsSync(jsonPath)) {
      console.log(`❌ [${anime}] characters.json NÃO ENCONTRADO!`);
      totalErrors++;
      continue;
    }

    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    let characters = [];
    try {
      characters = JSON.parse(rawData);
    } catch (e) {
      console.log(`❌ [${anime}] Erro de parse no JSON:`, e.message);
      totalErrors++;
      continue;
    }

    const seenIds = new Set();
    const seenNames = new Set();
    const issues = [];
    const imageIssues = [];

    for (const char of characters) {
      totalCharacters++;

      // ID check
      if (!char.id || typeof char.id !== 'string') {
        issues.push({ char: char.name || 'Desconhecido', type: 'error', msg: 'ID ausente ou inválido' });
      } else if (seenIds.has(char.id)) {
        issues.push({ char: char.name, id: char.id, type: 'error', msg: `ID duplicado: ${char.id}` });
      } else {
        seenIds.add(char.id);
      }

      // Name check
      if (!char.name || typeof char.name !== 'string') {
        issues.push({ id: char.id, type: 'error', msg: 'Nome ausente' });
      } else if (seenNames.has(char.name.toLowerCase())) {
        issues.push({ char: char.name, id: char.id, type: 'warning', msg: `Nome possivelmente duplicado: ${char.name}` });
      } else {
        seenNames.add(char.name.toLowerCase());
      }

      // Gender check
      if (!char.gender || !['Masculino', 'Feminino'].includes(char.gender)) {
        issues.push({ char: char.name, id: char.id, type: 'warning', msg: `Gênero fora do padrão: ${char.gender}` });
      }

      // Debut Arc check
      if (!char.debutArc) {
        issues.push({ char: char.name, id: char.id, type: 'error', msg: 'Arco de estreia ausente' });
      }

      // Affiliation check
      if (!char.affiliation || !Array.isArray(char.affiliation) || char.affiliation.length === 0) {
        issues.push({ char: char.name, id: char.id, type: 'warning', msg: 'Afiliação vazia ou não é array' });
      }

      // Avatar check
      const imgCheck = await checkUrl(char.avatar);
      if (!imgCheck.ok) {
        imageIssues.push({
          id: char.id,
          name: char.name,
          avatar: char.avatar,
          error: imgCheck.error
        });
      }
    }

    animeResults[anime] = {
      count: characters.length,
      issues,
      imageIssues
    };

    const errCount = issues.filter(i => i.type === 'error').length + imageIssues.length;
    const warnCount = issues.filter(i => i.type === 'warning').length;
    totalErrors += errCount;
    totalWarnings += warnCount;

    console.log(`📌 Anime: [${anime}]`);
    console.log(`   - Total personagens: ${characters.length}`);
    console.log(`   - Imagens com problema: ${imageIssues.length}`);
    console.log(`   - Erros de atributos: ${issues.filter(i => i.type === 'error').length}`);
    console.log(`   - Avisos: ${warnCount}`);

    if (imageIssues.length > 0) {
      console.log(`   ⚠️ Problemas de imagem detectados:`);
      imageIssues.slice(0, 8).forEach(img => {
        console.log(`      * [${img.id}] ${img.name}: ${img.error}`);
      });
      if (imageIssues.length > 8) {
        console.log(`      ... e mais ${imageIssues.length - 8} imagens com problemas.`);
      }
    }
    console.log('------------------------------------------------------');
  }

  console.log('\n📊 RESUMO GERAL:');
  console.log(`   Total de personagens analisados: ${totalCharacters}`);
  console.log(`   Total de falhas/erros: ${totalErrors}`);
  console.log(`   Total de avisos: ${totalWarnings}`);
  console.log('======================================================\n');
}

runAudit();
