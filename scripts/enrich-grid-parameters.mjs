import fs from 'fs';
import path from 'path';

const animesDir = 'src/data/animes';

// Regras e inferências canônicas por padrão de palavras
function inferCombatType(c, animeSlug) {
  if (c.combatType) return c.combatType;
  const text = `${c.styleOrPower || ''} ${c.weapon || ''} ${c.rank || ''} ${c.role || ''} ${c.quote || ''}`.toLowerCase();
  
  if (animeSlug === 'haikyuu' || animeSlug === 'blue-lock' || animeSlug === 'kuroko-no-basket') {
    return 'Esportista / Atleta';
  }
  if (animeSlug === 'romance') {
    return 'Vida Escolar / Cotidiano';
  }
  
  if (/espada|katana|lâmina|nichirin|zanpakuto|sword|blade|esgrima|sabre/i.test(text)) {
    return 'Usuário de Espada / Lâmina';
  }
  if (/fogo|chama|gelo|magia|grimório|relâmpago|trovão|raio|feitiço|brux|maldição|feitiçaria|nen|ki |chakra|stand|jutsu/i.test(text)) {
    return 'Magia / Poder Sobrenatural';
  }
  if (/tiro|sniper|pistola|fuzil|bala|arco|flecha|canhão|projétil|distância|metralhadora/i.test(text)) {
    return 'Ataque à Distância / Projéteis';
  }
  if (/estratég|médic|suporte|cura|cientista|inteligên|navega|cozinh|analis/i.test(text)) {
    return 'Suporte / Estratégia';
  }
  return 'Combate Corpo a Corpo';
}

function inferHairColor(c) {
  if (c.hairColor) return c.hairColor;
  const name = (c.name || '').toLowerCase();
  const id = (c.id || '').toLowerCase();
  
  // Dourado / Loiro
  if (/loiro|dourad|blond|yellow|naruto|zenitsu|armin|erwin|gilgamesh|dio|kurapika|sanji|denji|all-might|bakugo|historia|edward-elric/i.test(id + ' ' + name)) {
    return 'Cabelo Loiro / Dourado';
  }
  // Branco / Prateado
  if (/branco|prata|white|silver|gojo|kakashi|jiraiya|toshiro|killua|kaneki|inuyasha|frieren|gintoki|garou|near|tanjuro|sukuna|itadori/i.test(id + ' ' + name)) {
    return 'Cabelo Branco / Prateado';
  }
  // Colorido (Azul, Rosa, Verde, Vermelho, Laranja)
  if (/tanjiro|rengoku|shanks|ichigo|midoriya|deku|zoro|hinata|saiki|ram|rem|anya|chika|aqua|megumin|power|nobara/i.test(id + ' ' + name)) {
    return 'Cabelo Colorido / Marcante';
  }
  // Castanho
  if (/castanho|brown|light|eren|levi|mikasa|gohan|luffy|sasuke|vegeta|goku|law/i.test(id + ' ' + name)) {
    if (/luffy|sasuke|vegeta|goku|levi|mikasa/i.test(id)) return 'Cabelo Preto';
    return 'Cabelo Castanho';
  }
  
  // Fallback baseado no charCode para consistência determinística e equilibrada
  const code = (c.name || 'A').charCodeAt(0);
  const colors = [
    'Cabelo Preto',
    'Cabelo Castanho',
    'Cabelo Loiro / Dourado',
    'Cabelo Preto',
    'Cabelo Colorido / Marcante',
    'Cabelo Branco / Prateado'
  ];
  return colors[code % colors.length];
}

function inferRole(c) {
  if (c.roleOrArchetype) return c.roleOrArchetype;
  if (c.role && c.role.length > 2) return c.role;
  const text = `${c.rank || ''} ${c.archetype || ''} ${c.origin || ''} ${c.status || ''}`.toLowerCase();
  
  if (/protagonista|principal|herói|hero|capitão|líder/i.test(text)) {
    return 'Protagonista / Líder';
  }
  if (/vilão|antagonista|inimigo|ameaça|renegado|terrorista/i.test(text)) {
    return 'Antagonista / Vilão';
  }
  if (/mentor|mestre|professor|treinador|sensei|comandante|pilar|capitão/i.test(text)) {
    return 'Mentor / Mestre / Autoridade';
  }
  if (/rival|competidor/i.test(text)) {
    return 'Rival / Concorrente';
  }
  return 'Aliado / Membro de Equipe';
}

function inferSpecies(c, animeSlug) {
  if (c.species && c.species.trim().length > 2) return c.species.trim();
  const text = `${c.styleOrPower || ''} ${c.rank || ''}`.toLowerCase();
  
  if (/demônio|oni|curse|maldição|ghoul|hollow|arrancar|espada/i.test(text)) {
    return 'Demônio / Maldição / Sobrenatural';
  }
  if (/ciborgue|robô|androide|máquina/i.test(text)) {
    return 'Ciborgue / Androide';
  }
  if (/deus|divindade|anjo|valquíria/i.test(text)) {
    return 'Divindade / Ser Celestial';
  }
  if (/titã/i.test(text)) {
    return 'Portador de Titã / Humano';
  }
  return 'Humano';
}

let totalUpdated = 0;

for (const dir of fs.readdirSync(animesDir)) {
  const charFile = path.join(animesDir, dir, 'characters.json');
  if (!fs.existsSync(charFile)) continue;
  
  const chars = JSON.parse(fs.readFileSync(charFile, 'utf-8'));
  let modified = false;

  for (const c of chars) {
    const cType = inferCombatType(c, dir);
    const hColor = inferHairColor(c);
    const rRole = inferRole(c);
    const spec = inferSpecies(c, dir);

    if (!c.combatType || c.combatType !== cType) {
      c.combatType = cType;
      modified = true;
    }
    if (!c.hairColor || c.hairColor !== hColor) {
      c.hairColor = hColor;
      modified = true;
    }
    if (!c.roleOrArchetype || c.roleOrArchetype !== rRole) {
      c.roleOrArchetype = rRole;
      modified = true;
    }
    if (!c.species || c.species === 'Humano' && spec !== 'Humano') {
      c.species = spec;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(charFile, JSON.stringify(chars, null, 2), 'utf-8');
    totalUpdated++;
    console.log(`Enriquecido: ${dir} (${chars.length} personagens)`);
  }
}

console.log(`\nConcluído! ${totalUpdated} arquivos de animes foram enriquecidos com combatType, hairColor, roleOrArchetype e species.`);
