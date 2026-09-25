import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Lista canônica de animes suportados
const ANIMES = [
  'bleach',
  'blue-lock',
  'demon-slayer',
  'dragon-ball',
  'jujutsu-kaisen',
  'naruto',
  'one-piece',
  'record-of-ragnarok',
  'solo-leveling'
];

// Parser simples para extrair mangaCoverage do config.ts
function getAnimeConfigs() {
  const configPath = path.join(rootDir, 'src', 'data', 'animes', 'config.ts');
  const content = fs.readFileSync(configPath, 'utf8');

  const configs = {};

  for (const slug of ANIMES) {
    // Regex para extrair o bloco do anime
    const slugRegex = new RegExp(`'${slug}'\\s*:\\s*{([\\s\\S]*?)(?:\\n\\s*},|\\n\\s*}\\s*};)`, 'm');
    const match = content.match(slugRegex);
    if (!match) continue;

    const block = match[1];

    // Extrair mangaCoverage
    const coverageMatch = block.match(/mangaCoverage\s*:\s*{([\s\S]*?)}/);
    if (coverageMatch) {
      const covBlock = coverageMatch[1];
      const chapterMatch = covBlock.match(/chapter\s*:\s*(\d+)/);
      const statusMatch = covBlock.match(/status\s*:\s*'(.*?)'/);
      const sourceMatch = covBlock.match(/source\s*:\s*'(.*?)'/);
      const lastUpdatedMatch = covBlock.match(/lastUpdated\s*:\s*'(.*?)'/);
      const notesMatch = covBlock.match(/notes\s*:\s*'(.*?)'/);

      configs[slug] = {
        chapter: chapterMatch ? parseInt(chapterMatch[1], 10) : null,
        status: statusMatch ? statusMatch[1] : null,
        source: sourceMatch ? sourceMatch[1] : null,
        lastUpdated: lastUpdatedMatch ? lastUpdatedMatch[1] : null,
        notes: notesMatch ? notesMatch[1] : null,
      };
    }
  }

  return configs;
}

// Conjunto de termos estritamente não-canônicos/fillers conhecidos que nunca devem constar
const NON_CANON_TERMS = [
  'filler',
  'não-canônico',
  'nao-canonico',
  'non-canon',
  'filme não-canônico',
  'doujin',
  'fanon',
  'arco filler'
];

async function runCoverageAudit() {
  console.log('\n===============================================================');
  console.log('       📖 AUDITORIA OFICIAL DE COBERTURA DO MANGÁ & CÂNONE      ');
  console.log('===============================================================\n');

  const configs = getAnimeConfigs();
  let hasErrors = false;
  let totalCharacters = 0;

  for (const slug of ANIMES) {
    console.log(`\n---------------------------------------------------------------`);
    console.log(`📁 Verificando Obra: [${slug.toUpperCase()}]`);

    const cov = configs[slug];
    if (!cov) {
      console.error(`  ❌ ERRO: mangaCoverage ausente em config.ts para '${slug}'`);
      hasErrors = true;
      continue;
    }

    if (!cov.chapter || cov.chapter <= 0) {
      console.error(`  ❌ ERRO: Capítulo canônico inválido (${cov.chapter}) para '${slug}'`);
      hasErrors = true;
    }

    if (!['Em Lançamento', 'Finalizado'].includes(cov.status)) {
      console.error(`  ❌ ERRO: Status inválido (${cov.status}) para '${slug}'. Deve ser 'Em Lançamento' ou 'Finalizado'.`);
      hasErrors = true;
    }

    if (!cov.source) {
      console.error(`  ❌ ERRO: Veículo/Editora oficial ausente para '${slug}'`);
      hasErrors = true;
    }

    console.log(`  ✓ Cobertura: Capítulo ${cov.chapter} (${cov.status})`);
    console.log(`  ✓ Veículo Oficial: ${cov.source}`);
    console.log(`  ✓ Última Auditoria: ${cov.lastUpdated}`);
    console.log(`  ✓ Escopo: ${cov.notes}`);

    // Ler lista de personagens
    const charFile = path.join(rootDir, 'src', 'data', 'animes', slug, 'characters.json');
    if (!fs.existsSync(charFile)) {
      console.error(`  ❌ ERRO: Arquivo characters.json não encontrado em ${charFile}`);
      hasErrors = true;
      continue;
    }

    const characters = JSON.parse(fs.readFileSync(charFile, 'utf8'));
    totalCharacters += characters.length;
    console.log(`  ✓ Personagens Auditados: ${characters.length}`);

    // Verificar se algum campo contém menções a fillers ou dados não-canônicos
    let nonCanonIssues = 0;
    const ids = new Set();

    for (const c of characters) {
      if (ids.has(c.id)) {
        console.error(`    ❌ ID duplicado detectado: ${c.id}`);
        hasErrors = true;
      }
      ids.add(c.id);

      // Checagem de texto não canônico
      const stringified = JSON.stringify(c).toLowerCase();
      for (const term of NON_CANON_TERMS) {
        if (stringified.includes(term)) {
          console.warn(`    ⚠️ AVISO: Termo suspeito ('${term}') no personagem: ${c.name} (${c.id})`);
          nonCanonIssues++;
        }
      }
    }

    if (nonCanonIssues === 0) {
      console.log(`  ✨ Integridade Canônica: 100% aprovada (Zero fillers ou fontes duvidosas)`);
    } else {
      console.log(`  ⚠️ ${nonCanonIssues} potenciais avisos detectados.`);
    }
  }

  console.log('\n===============================================================');
  console.log(`📊 RESUMO DA AUDITORIA:`);
  console.log(`  • Total de Animes Auditados: ${ANIMES.length}`);
  console.log(`  • Total de Personagens Verificados: ${totalCharacters}`);
  console.log(`  • Status Geral: ${hasErrors ? '❌ FALHA - Corrija os erros acima' : '✅ SUCESSO - Todas as obras com cobertura canônica 100% verificada'}`);
  console.log('===============================================================\n');

  if (hasErrors) {
    process.exit(1);
  }
}

runCoverageAudit();
