import fs from 'fs';
import path from 'path';

const data = JSON.parse(fs.readFileSync('scripts/audit-data-issues.json', 'utf8'));
for (const [k, v] of Object.entries(data)) {
  console.log(`\n### ${k} (${v.length} problemas)`);
  for (const i of v) {
    console.log(`- **${i.name}** [campo: \`${i.field}\`]: valor atual = \`${i.value}\` (${i.issue})`);
  }
}
