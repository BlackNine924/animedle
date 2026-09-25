import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const ANIMES = [
  'blue-lock',
  'demon-slayer',
  'jujutsu-kaisen',
  'naruto',
  'one-piece',
  'record-of-ragnarok',
  'solo-leveling'
];

// Canon rules for One Piece
const OP_KNOWN_CHECKS = {
  foxyPirates: {
    members: ['foxy', 'porche', 'hamburg', 'pickles', 'big-pan', 'capote', 'monda'],
    expectedArc: 'Long Ring Long Land',
    warning: 'Membro dos Piratas do Foxy deve ter estreia canônica em "Long Ring Long Land"'
  },
  blackbeardOG: {
    members: ['marshall-d-teach', 'jesus-burgess', 'van-augur', 'doc-q', 'lafitte'],
    expectedArc: 'Skypiea',
    warning: 'Membro fundador do Barba Negra estreou na saga Skypiea (Jaya)'
  },
  blackbeardImpelDown: {
    members: ['shiryu', 'avalo-pizarro', 'catarina-devon', 'sanjuan-wolf', 'vasco-shot'],
    expectedArc: 'Summit War (Marineford)',
    warning: 'Membro recrutado em Impel Down estreou na saga Summit War (Marineford)'
  },
  caesar: {
    members: ['caesar-clown'],
    expectedArc: 'Dressrosa / Punk Hazard',
    warning: 'Caesar Clown estreou na saga Dressrosa / Punk Hazard'
  }
};

async function auditLore() {
  console.log('\n================================================================');
  console.log('       📜 AUDITORIA AUTOMÁTICA DE LORE E INFORMAÇÕES CANÔNICAS   ');
  console.log('================================================================\n');

  let totalCharacters = 0;
  let totalLoreErrors = 0;
  let totalLoreWarnings = 0;

  for (const anime of ANIMES) {
    const jsonPath = path.join(rootDir, 'src', 'data', 'animes', anime, 'characters.json');
    if (!fs.existsSync(jsonPath)) continue;

    const characters = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const configPath = path.join(rootDir, 'src', 'data', 'animes', 'config.ts');
    const configRaw = fs.readFileSync(configPath, 'utf-8');

    // Extract valid arcs for this anime from config.ts
    const animeBlockMatch = configRaw.match(new RegExp(`['"]${anime}['"]\\s*:\\s*{[\\s\\S]*?arcs\\s*:\\s*\\[([\\s\\S]*?)\\]`, 'm'));
    const validArcs = animeBlockMatch 
      ? [...animeBlockMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1])
      : [];

    const errors = [];
    const warnings = [];

    const seenNames = new Map();

    for (const char of characters) {
      totalCharacters++;

      // 1. Duplicates check
      const normName = char.name.toLowerCase().trim();
      if (seenNames.has(normName)) {
        errors.push(`[${char.id}] Duplicata de nome encontrada com ID "${seenNames.get(normName)}": "${char.name}"`);
      } else {
        seenNames.set(normName, char.id);
      }

      // 2. Arc validation
      if (!char.debutArc) {
        errors.push(`[${char.id}] ${char.name}: Arco de estreia não definido!`);
      } else if (validArcs.length > 0 && !validArcs.includes(char.debutArc)) {
        errors.push(`[${char.id}] ${char.name}: Arco de estreia inválido ("${char.debutArc}"). Arcos válidos: [${validArcs.join(', ')}]`);
      }

      // 3. Status validation
      const validStatuses = anime === 'blue-lock'
        ? ['Ativo / Sobrevivente', 'Eliminado', 'Profissional / Convidado']
        : ['Vivo', 'Viva', 'Falecido', 'Falecida', 'Morto', 'Morta', 'Selado', 'Selada', 'Desconhecido'];
      if (!char.status || !validStatuses.includes(char.status)) {
        warnings.push(`[${char.id}] ${char.name}: Status fora do padrão ("${char.status}")`);
      }

      // 4. Affiliation validation
      if (anime === 'record-of-ragnarok') {
        if (!char.pantheonOrOrigin) {
          errors.push(`[${char.id}] ${char.name}: Panteão / Origem ausente`);
        }
      } else {
        if (!Array.isArray(char.affiliation) || char.affiliation.length === 0) {
          errors.push(`[${char.id}] ${char.name}: Afiliação ausente ou não é array`);
        }
      }

      // 5. Gender validation
      const validGenders = ['Masculino', 'Feminino', 'Outro', 'Desconhecido'];
      if (!char.gender || !validGenders.includes(char.gender)) {
        errors.push(`[${char.id}] ${char.name}: Gênero inválido ("${char.gender}")`);
      }

      // 6. One Piece specific lore validations
      if (anime === 'one-piece') {
        // Bounty check
        if (typeof char.bounty !== 'number' || isNaN(char.bounty) || char.bounty < 0) {
          errors.push(`[${char.id}] ${char.name}: Recompensa (Berries) inválida ("${char.bounty}")`);
        }

        // Fruit type check
        const validFruitTypes = ['Logia', 'Paramecia', 'Zoan', 'Zoan Mítica', 'Zoan Ancestral', 'Nenhuma', 'Logia & Paramecia'];
        if (char.fruitType && !validFruitTypes.includes(char.fruitType)) {
          warnings.push(`[${char.id}] ${char.name}: Tipo de Akuma no Mi fora do padrão ("${char.fruitType}")`);
        }

        // Check specific canon affiliations/arcs
        for (const [key, rule] of Object.entries(OP_KNOWN_CHECKS)) {
          if (rule.members.includes(char.id)) {
            if (char.debutArc !== rule.expectedArc) {
              errors.push(`[${char.id}] ${char.name}: ${rule.warning}. Atual: "${char.debutArc}"`);
            }
          }
        }
      }

      // 7. Blue Lock specific lore validations
      if (anime === 'blue-lock') {
        if (typeof char.bounty !== 'number' || isNaN(char.bounty) || char.bounty < 0) {
          errors.push(`[${char.id}] ${char.name}: Oferta da NEL (bounty) inválida ("${char.bounty}")`);
        }
        if (!char.position) {
          errors.push(`[${char.id}] ${char.name}: Posição / Função ausente`);
        }
        if (!char.country) {
          errors.push(`[${char.id}] ${char.name}: Nacionalidade ausente`);
        }
      }
    }

    console.log(`📌 Anime: [${anime}]`);
    console.log(`   - Personagens analisados: ${characters.length}`);
    console.log(`   - Falhas canônicas/erros: ${errors.length}`);
    console.log(`   - Avisos/inconsistências: ${warnings.length}`);

    if (errors.length > 0) {
      console.log(`   ❌ Erros detectados:`);
      errors.slice(0, 10).forEach(e => console.log(`      * ${e}`));
      if (errors.length > 10) console.log(`      ... e mais ${errors.length - 10} erros.`);
    }

    if (warnings.length > 0) {
      console.log(`   ⚠️ Avisos detectados:`);
      warnings.slice(0, 5).forEach(w => console.log(`      * ${w}`));
      if (warnings.length > 5) console.log(`      ... e mais ${warnings.length - 5} avisos.`);
    }

    console.log('----------------------------------------------------------------');
    totalLoreErrors += errors.length;
    totalLoreWarnings += warnings.length;
  }

  console.log('\n📊 RESUMO GERAL DE LORE:');
  console.log(`   Total de personagens validados: ${totalCharacters}`);
  console.log(`   Total de inconsistências canônicas: ${totalLoreErrors}`);
  console.log(`   Total de avisos de formatação: ${totalLoreWarnings}`);
  console.log('================================================================\n');
}

auditLore();
