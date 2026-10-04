import fs from 'fs';
import path from 'path';

const dirs = fs.readdirSync('src/data/animes');

const allIssues = {
  avatars: {},
  hairColors: {},
  genders: {},
  swappedOrCopied: [],
  otherData: {}
};

// Check candidate raw from earlier
const candidatesRaw = JSON.parse(fs.readFileSync('scripts/audit-candidates-raw.json', 'utf8'));
for (const item of candidatesRaw) {
  if (!allIssues.avatars[item.anime]) allIssues.avatars[item.anime] = [];
  allIssues.avatars[item.anime].push({
    id: item.id,
    name: item.name,
    type: item.type,
    avatar: item.avatar
  });
}

// Data checks
const validGenders = new Set(['Masculino', 'Feminino', 'Sem Gênero']);
const standardHairColors = new Set([
  'Cabelo Preto',
  'Cabelo Castanho',
  'Cabelo Loiro / Dourado',
  'Cabelo Branco / Prateado',
  'Cabelo Vermelho',
  'Cabelo Azul',
  'Cabelo Verde',
  'Cabelo Rosa',
  'Cabelo Roxo / Violeta',
  'Cabelo Laranja',
  'Cabelo Colorido / Marcante',
  'Cabelo Careca / Sem Cabelo'
]);

for (const d of dirs) {
  const p = path.join('src/data/animes', d, 'characters.json');
  if (!fs.existsSync(p)) continue;
  const chars = JSON.parse(fs.readFileSync(p, 'utf8'));

  for (const c of chars) {
    // Non-standard hair strings
    if (!standardHairColors.has(c.hairColor)) {
      if (!allIssues.hairColors[d]) allIssues.hairColors[d] = [];
      allIssues.hairColors[d].push({
        id: c.id,
        name: c.name,
        current: c.hairColor,
        reason: 'String fora do padrão (ex: Careca / Sem Cabelo, Cabelo Ruivo / Vermelho)'
      });
    }

    // Gender check
    if (!validGenders.has(c.gender)) {
      if (!allIssues.genders[d]) allIssues.genders[d] = [];
      allIssues.genders[d].push({
        id: c.id,
        name: c.name,
        current: c.gender,
        reason: 'Gênero inválido (deve ser Masculino, Feminino ou Sem Gênero)'
      });
    }

    // Specific known hair color errors
    if (d === 'fairy-tail') {
      if (c.id === 'meredy' && c.hairColor !== 'Cabelo Rosa') {
        if (!allIssues.hairColors[d]) allIssues.hairColors[d] = [];
        allIssues.hairColors[d].push({ id: c.id, name: c.name, current: c.hairColor, suggested: 'Cabelo Rosa', reason: 'Cabelo rosa canônico' });
      }
      if (c.id === 'gajeel-redfox' && c.hairColor !== 'Cabelo Preto') {
        if (!allIssues.hairColors[d]) allIssues.hairColors[d] = [];
        allIssues.hairColors[d].push({ id: c.id, name: c.name, current: c.hairColor, suggested: 'Cabelo Preto', reason: 'Cabelo preto canônico' });
      }
    }
    if (d === 'dragon-ball') {
      if (c.id === 'comandante-red' && c.hairColor !== 'Cabelo Vermelho') {
        if (!allIssues.hairColors[d]) allIssues.hairColors[d] = [];
        allIssues.hairColors[d].push({ id: c.id, name: c.name, current: c.hairColor, suggested: 'Cabelo Vermelho', reason: 'Cabelo ruivo canônico' });
      }
    }
    if (d === 'fullmetal-alchemist') {
      if (c.id === 'heymans-breda' && c.hairColor !== 'Cabelo Vermelho') {
        if (!allIssues.hairColors[d]) allIssues.hairColors[d] = [];
        allIssues.hairColors[d].push({ id: c.id, name: c.name, current: c.hairColor, suggested: 'Cabelo Vermelho', reason: 'Cabelo ruivo/castanho-avermelhado canônico' });
      }
    }
    if (d === 'my-hero-academia') {
      if (c.id === 'toru-hagakure' && c.hairColor === 'Careca / Sem Cabelo') {
        if (!allIssues.hairColors[d]) allIssues.hairColors[d] = [];
        allIssues.hairColors[d].push({ id: c.id, name: c.name, current: c.hairColor, suggested: 'Cabelo Colorido / Marcante', reason: 'Invisível / ondulado, não careca' });
      }
      if (c.id === 'kurogiri' && c.hairColor === 'Careca / Sem Cabelo') {
        if (!allIssues.hairColors[d]) allIssues.hairColors[d] = [];
        allIssues.hairColors[d].push({ id: c.id, name: c.name, current: c.hairColor, suggested: 'Cabelo Colorido / Marcante', reason: 'Névoa roxa/negra, não careca' });
      }
    }
    if (d === 'romance') {
      if (c.id === 'miwa-mikadono' && c.hairColor === 'Cabelo Preto') {
        if (!allIssues.hairColors[d]) allIssues.hairColors[d] = [];
        allIssues.hairColors[d].push({ id: c.id, name: c.name, current: c.hairColor, suggested: 'Cabelo Loiro / Dourado', reason: 'Miwa tem cabelos loiros compridos (trocada com Niko)' });
      }
      if (c.id === 'niko-mikadono' && c.hairColor === 'Cabelo Rosa') {
        if (!allIssues.hairColors[d]) allIssues.hairColors[d] = [];
        allIssues.hairColors[d].push({ id: c.id, name: c.name, current: c.hairColor, suggested: 'Cabelo Verde', reason: 'Niko tem cabelos verdes curtos e presas (trocada com Miwa)' });
      }
    }
  }
}

// Swapped or copied avatars detected
allIssues.swappedOrCopied.push({
  anime: 'romance',
  characters: ['Miwa Mikadono', 'Niko Mikadono'],
  issue: 'Imagens e atributos trocados entre si: miwa-mikadono.png contém o rosto de Niko (cabelo verde e presas) e niko-mikadono.png contém o rosto de Miwa (cabelo loiro comprido).'
});
allIssues.swappedOrCopied.push({
  anime: 'romance',
  characters: ['Saori (saori-mikadono)'],
  issue: 'A imagem atual /avatars/romance/saori-mikadono.png é de Saori Takebe do anime Girls und Panzer, e não de Mikadono Sisters.'
});

fs.writeFileSync('scripts/comprehensive-audit.json', JSON.stringify(allIssues, null, 2));
console.log('Comprehensive audit written to scripts/comprehensive-audit.json');
