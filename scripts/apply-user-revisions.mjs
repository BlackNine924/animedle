import fs from 'fs';
import path from 'path';

console.log('=== INICIANDO REVISÃO COMPLETA DOS ANISOFTWARES/DATASETS ===\n');

// 1. BLUE LOCK: Separar "Profissional / Convidado" em "Profissional" vs "Staff"
const blPath = path.resolve('src/data/animes/blue-lock/characters.json');
if (fs.existsSync(blPath)) {
  const blChars = JSON.parse(fs.readFileSync(blPath, 'utf8'));
  const staffNames = new Set([
    'Jinpachi Ego',
    'Anri Teieri',
    'Hirotoshi Buratsuta',
    'Yasumori Hoichi',
    'Coach Gambari',
    'Yu Bachira',
    'Issei Isagi',
    'Iyo Isagi'
  ]);

  let blModified = 0;
  blChars.forEach(c => {
    if (c.status === 'Profissional / Convidado') {
      if (staffNames.has(c.name)) {
        c.status = 'Staff';
      } else {
        c.status = 'Profissional';
      }
      blModified++;
    }
  });
  fs.writeFileSync(blPath, JSON.stringify(blChars, null, 2), 'utf8');
  console.log(`[Blue Lock] ${blModified} personagens atualizados (Profissional vs Staff).`);
}

// 2. STATUS EM TODOS OS ANIMES: Falecido -> Morto / Falecida -> Morta
const animesDir = path.resolve('src/data/animes');
let totalStatusFixed = 0;

fs.readdirSync(animesDir).forEach(dir => {
  const charJson = path.join(animesDir, dir, 'characters.json');
  if (fs.existsSync(charJson)) {
    const chars = JSON.parse(fs.readFileSync(charJson, 'utf8'));
    let changed = 0;
    chars.forEach(c => {
      if (c.status === 'Falecido') {
        c.status = 'Morto';
        changed++;
      } else if (c.status === 'Falecida') {
        c.status = 'Morta';
        changed++;
      }
    });
    if (changed > 0) {
      fs.writeFileSync(charJson, JSON.stringify(chars, null, 2), 'utf8');
      console.log(`[${dir}] Status corrigidos: ${changed} (Falecido -> Morto).`);
      totalStatusFixed += changed;
    }
  }
});
console.log(`Total geral de status Falecido corrigidos: ${totalStatusFixed}\n`);

// 3. HUNTER X HUNTER: Espécies amplas (Formiga Quimera, Humano)
const hxhPath = path.resolve('src/data/animes/hunter-x-hunter/characters.json');
if (fs.existsSync(hxhPath)) {
  const hxhChars = JSON.parse(fs.readFileSync(hxhPath, 'utf8'));
  let hxhChanged = 0;
  hxhChars.forEach(c => {
    if (c.species && c.species.startsWith('Formiga Quimera')) {
      if (c.species !== 'Formiga Quimera') {
        c.species = 'Formiga Quimera';
        hxhChanged++;
      }
    } else if (c.species && c.species.startsWith('Humano (')) {
      c.species = 'Humano';
      hxhChanged++;
    }
  });
  fs.writeFileSync(hxhPath, JSON.stringify(hxhChars, null, 2), 'utf8');
  console.log(`[Hunter x Hunter] ${hxhChanged} espécies simplificadas para Formiga Quimera ou Humano.`);
}

// 4. ONE PIECE: Espécies (Tritão / Sereia, Anão) + Frutas em Japonês + Remoção de poderes fakes
const opPath = path.resolve('src/data/animes/one-piece/characters.json');
if (fs.existsSync(opPath)) {
  const opChars = JSON.parse(fs.readFileSync(opPath, 'utf8'));
  let opChanged = 0;

  // Dicionário de padronização de Akuma no Mi para japonês canônico
  const fruitReplacements = [
    { regex: /Soot Soot no Mi/gi, replacement: 'Susu Susu no Mi' },
    { regex: /Ice Ice no Mi/gi, replacement: 'Hie Hie no Mi' },
    { regex: /String String no Mi/gi, replacement: 'Ito Ito no Mi' },
    { regex: /Sand Sand no Mi/gi, replacement: 'Suna Suna no Mi' },
    { regex: /Flame Flame no Mi/gi, replacement: 'Mera Mera no Mi' },
    { regex: /Mag Mag no Mi/gi, replacement: 'Magu Magu no Mi' },
    { regex: /Dark Dark no Mi/gi, replacement: 'Yami Yami no Mi' },
    { regex: /Quake Quake no Mi/gi, replacement: 'Gura Gura no Mi' },
    { regex: /Clear Clear no Mi/gi, replacement: 'Suke Suke no Mi' },
    { regex: /Paw Paw no Mi/gi, replacement: 'Nikyu Nikyu no Mi' },
    { regex: /Shadow Shadow no Mi/gi, replacement: 'Kage Kage no Mi' },
    { regex: /Hollow Hollow no Mi/gi, replacement: 'Horo Horo no Mi' },
    { regex: /Chop Chop no Mi/gi, replacement: 'Bara Bara no Mi' },
    { regex: /Flower Flower no Mi/gi, replacement: 'Hana Hana no Mi' },
    { regex: /Rumble Rumble no Mi/gi, replacement: 'Goro Goro no Mi' },
    { regex: /Spring Spring no Mi/gi, replacement: 'Bane Bane no Mi' },
    { regex: /Smoke Smoke no Mi/gi, replacement: 'Moku Moku no Mi' },
    { regex: /Wax Wax no Mi/gi, replacement: 'Doru Doru no Mi' },
    { regex: /Clone Clone no Mi/gi, replacement: 'Mane Mane no Mi' },
    { regex: /Smooth Smooth no Mi/gi, replacement: 'Sube Sube no Mi' },
    { regex: /Bomb Bomb no Mi/gi, replacement: 'Bomu Bomu no Mi' },
    { regex: /Munch Munch no Mi/gi, replacement: 'Baku Baku no Mi' },
    { regex: /Bubble Bubble no Mi/gi, replacement: 'Awa Awa no Mi' },
    { regex: /Op Op no Mi/gi, replacement: 'Ope Ope no Mi' },
    { regex: /Glint Glint no Mi/gi, replacement: 'Pika Pika no Mi' },
    { regex: /Soul Soul no Mi/gi, replacement: 'Soru Soru no Mi' },
    { regex: /Lick Lick no Mi/gi, replacement: 'Pero Pero no Mi' },
    { regex: /Biscuit Biscuit no Mi/gi, replacement: 'Bisu Bisu no Mi' },
    { regex: /Juice Juice no Mi/gi, replacement: 'Shibo Shibo no Mi' },
    { regex: /Memo Memo no Mi/gi, replacement: 'Memo Memo no Mi' },
    { regex: /Fish Fish no Mi/gi, replacement: 'Uo Uo no Mi' },
    { regex: /Bird Bird no Mi/gi, replacement: 'Tori Tori no Mi' },
    { regex: /Cat Cat no Mi/gi, replacement: 'Neko Neko no Mi' },
    { regex: /Dog Dog no Mi/gi, replacement: 'Inu Inu no Mi' },
    { regex: /Dragon Dragon no Mi/gi, replacement: 'Ryu Ryu no Mi' },
    { regex: /Elephant Elephant no Mi/gi, replacement: 'Zou Zou no Mi' },
    { regex: /Ox Ox no Mi/gi, replacement: 'Ushi Ushi no Mi' },
    { regex: /Snake Snake no Mi/gi, replacement: 'Hebi Hebi no Mi' },
    { regex: /Human Human no Mi/gi, replacement: 'Hito Hito no Mi' },
    { regex: /Spider Spider no Mi/gi, replacement: 'Kumo Kumo no Mi' },
    { regex: /Bug Bug no Mi/gi, replacement: 'Mushi Mushi no Mi' },
  ];

  opChars.forEach(c => {
    // 4.1 Espécies
    if (c.species) {
      if (c.species.includes('Tritão') || c.species.includes('Sereia') || c.species.includes('Homem-Peixe')) {
        c.species = 'Tritão / Sereia';
        opChanged++;
      } else if (c.species === 'Anão (Tontatta)') {
        c.species = 'Anão';
        opChanged++;
      } else if (c.species === 'Zumbi (Humano)') {
        c.species = 'Zumbi';
        opChanged++;
      } else if (c.species === 'Nobre Mundial (Tenryuubito)') {
        c.species = 'Humano';
        opChanged++;
      }
    }

    // 4.2 Donquixote Mjosgard - remover poder inventado
    if (c.id === 'donquixote-mjosgard') {
      c.styleOrPower = 'Nenhum';
      c.fruitType = 'Nenhuma';
      opChanged++;
    }

    // 4.3 Frutas em japonês no styleOrPower
    if (c.styleOrPower) {
      fruitReplacements.forEach(({ regex, replacement }) => {
        if (regex.test(c.styleOrPower)) {
          c.styleOrPower = c.styleOrPower.replace(regex, replacement);
          opChanged++;
        }
      });
    }

    // 4.4 Frutas em japonês no fruitType se houver
    if (c.fruitType) {
      fruitReplacements.forEach(({ regex, replacement }) => {
        if (regex.test(c.fruitType)) {
          c.fruitType = c.fruitType.replace(regex, replacement);
          opChanged++;
        }
      });
    }

    // 4.5 Limpeza de técnicas / poderes inventados
    if (c.techniques) {
      c.techniques = c.techniques.filter(t => !/clube dos tritões|defensor dos homens-peixe/i.test(t));
    }
  });

  fs.writeFileSync(opPath, JSON.stringify(opChars, null, 2), 'utf8');
  console.log(`[One Piece] ${opChanged} atributos corrigidos (Tritão / Sereia, Susu Susu no Mi, Mjosgard).`);
}

// 5. FAIRY TAIL: Espírito Celestial amplo
const ftPath = path.resolve('src/data/animes/fairy-tail/characters.json');
if (fs.existsSync(ftPath)) {
  const ftChars = JSON.parse(fs.readFileSync(ftPath, 'utf8'));
  let ftChanged = 0;
  ftChars.forEach(c => {
    if (c.species && c.species.startsWith('Espírito Celestial (')) {
      c.species = 'Espírito Celestial';
      ftChanged++;
    }
  });
  fs.writeFileSync(ftPath, JSON.stringify(ftChars, null, 2), 'utf8');
  console.log(`[Fairy Tail] ${ftChanged} espécies de Espírito Celestial simplificadas.`);
}

// 6. SOLO LEVELING: Monstro amplo
const slPath = path.resolve('src/data/animes/solo-leveling/characters.json');
if (fs.existsSync(slPath)) {
  const slChars = JSON.parse(fs.readFileSync(slPath, 'utf8'));
  let slChanged = 0;
  slChars.forEach(c => {
    if (c.species && c.species.startsWith('Monstro (')) {
      c.species = 'Monstro';
      slChanged++;
    }
  });
  fs.writeFileSync(slPath, JSON.stringify(slChars, null, 2), 'utf8');
  console.log(`[Solo Leveling] ${slChanged} espécies de Monstro simplificadas.`);
}

// 7. DRAGON BALL: Divindades amplas (mantendo Híbrido (Saiyajin / Humano))
const dbPath = path.resolve('src/data/animes/dragon-ball/characters.json');
if (fs.existsSync(dbPath)) {
  const dbChars = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  let dbChanged = 0;
  dbChars.forEach(c => {
    if (c.species && c.species.startsWith('Divindade (')) {
      c.species = 'Divindade';
      dbChanged++;
    } else if (c.species === 'Humano (Descendente de Três Olhos)') {
      c.species = 'Humano';
      dbChanged++;
    }
  });
  fs.writeFileSync(dbPath, JSON.stringify(dbChars, null, 2), 'utf8');
  console.log(`[Dragon Ball] ${dbChanged} espécies simplificadas (mantidos híbridos saiyajin/humano).`);
}

// 8. NARUTO: Separação de Vila e Clã
const narutoPath = path.resolve('src/data/animes/naruto/characters.json');
if (fs.existsSync(narutoPath)) {
  const narutoChars = JSON.parse(fs.readFileSync(narutoPath, 'utf8'));

  // Mapeamento das Vilas sem sufixo -gakure:
  // Konoha (Vila Oculta da Folha), Suna (Vila Oculta da Areia), Kiri (Vila Oculta da Névoa), etc.
  const villageMap = {
    'konoha': 'Konoha (Vila Oculta da Folha)',
    'suna': 'Suna (Vila Oculta da Areia)',
    'kiri': 'Kiri (Vila Oculta da Névoa)',
    'kumo': 'Kumo (Vila Oculta da Nuvem)',
    'iwa': 'Iwa (Vila Oculta da Pedra)',
    'ame': 'Ame (Vila Oculta da Chuva)',
    'otogakure': 'Oto (Vila Oculta do Som)',
    'kusa': 'Kusa (Vila Oculta da Grama)',
    'takigakure': 'Taki (Vila Oculta da Cachoeira)',
    'yugakure': 'Yu (Vila Oculta das Fontes Termais)',
    'monte myoboku': 'Monte Myoboku',
    'caverna ryuchi': 'Caverna Ryuchi',
    'floresta shikkotsu': 'Floresta Shikkotsu',
  };

  // Mapeamento específico de vilas de origem para renegados / personagens especiais:
  const originOverrides = {
    'Itachi Uchiha': 'Konoha (Vila Oculta da Folha)',
    'Kisame Hoshigaki': 'Kiri (Vila Oculta da Névoa)',
    'Orochimaru': 'Konoha (Vila Oculta da Folha)',
    'Pain (Nagato)': 'Ame (Vila Oculta da Chuva)',
    'Konan': 'Ame (Vila Oculta da Chuva)',
    'Deidara': 'Iwa (Vila Oculta da Pedra)',
    'Sasori': 'Suna (Vila Oculta da Areia)',
    'Hidan': 'Yu (Vila Oculta das Fontes Termais)',
    'Kakuzu': 'Taki (Vila Oculta da Cachoeira)',
    'Obito Uchiha': 'Konoha (Vila Oculta da Folha)',
    'Zabuza Momochi': 'Kiri (Vila Oculta da Névoa)',
    'Haku': 'Kiri (Vila Oculta da Névoa)',
    'Suigetsu Hozuki': 'Kiri (Vila Oculta da Névoa)',
    'Karin Uzumaki': 'Kusa (Vila Oculta da Grama)',
    'Jugo': 'Nenhuma',
    'Kabuto Yakushi': 'Konoha (Vila Oculta da Folha)',
    'Kimimaro': 'Kiri (Vila Oculta da Névoa)',
    'Sasuke Uchiha': 'Konoha (Vila Oculta da Folha)',
    'Yahiko': 'Ame (Vila Oculta da Chuva)',
    'Juzo Biwa': 'Kiri (Vila Oculta da Névoa)',
    'Utakata': 'Kiri (Vila Oculta da Névoa)',
    'Roshi': 'Iwa (Vila Oculta da Pedra)',
    'Han': 'Iwa (Vila Oculta da Pedra)',
    'Fuu': 'Taki (Vila Oculta da Cachoeira)',
    'Yugito Nii': 'Kumo (Vila Oculta da Nuvem)',
  };

  let narutoCount = 0;
  narutoChars.forEach(c => {
    const rawAff = Array.isArray(c.affiliation) ? c.affiliation : [c.affiliation].filter(Boolean);

    // Extrair clã se houver
    let clan = 'Nenhum';
    const clanItem = rawAff.find(a => a && a.startsWith('Clã '));
    if (clanItem) {
      clan = clanItem;
    } else if (rawAff.includes('Yamanaka')) {
      clan = 'Clã Yamanaka';
    } else if (c.name.includes('Uchiha')) {
      clan = 'Clã Uchiha';
    } else if (c.name.includes('Senju')) {
      clan = 'Clã Senju';
    } else if (c.name.includes('Hyuuga')) {
      clan = 'Clã Hyuuga';
    } else if (c.name.includes('Uzumaki')) {
      clan = 'Clã Uzumaki';
    } else if (c.name.includes('Otsutsuki')) {
      clan = 'Clã Otsutsuki';
    }

    // Extrair vila
    let village = 'Nenhuma';
    if (originOverrides[c.name]) {
      village = originOverrides[c.name];
    } else {
      for (const item of rawAff) {
        const lower = item.toLowerCase();
        if (villageMap[lower]) {
          village = villageMap[lower];
          break;
        }
      }
      if (village === 'Nenhuma') {
        if (c.name.includes('Otsutsuki') || c.name === 'Zetsu' || c.name.includes('Dez-Caudas') || c.name === 'Baku') {
          village = 'Nenhuma';
        }
      }
    }

    c.village = village;
    c.clan = clan;
    narutoCount++;
  });

  fs.writeFileSync(narutoPath, JSON.stringify(narutoChars, null, 2), 'utf8');
  console.log(`[Naruto] ${narutoCount} personagens atualizados com Vila (sem sufixo + tradução) e Clã separados.`);
}

console.log('\n=== REVISÕES APLICADAS COM SUCESSO! ===');
