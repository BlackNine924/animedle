import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const characters = [
  {
    id: 'innocent-onazi',
    name: 'Innocent Onazi',
    gender: 'Masculino',
    country: 'Nigéria',
    position: 'Atacante',
    affiliation: ['Nigéria Sub-20'],
    bounty: 0,
    styleOrPower: 'Referência Ofensiva & Liderança da Nigéria',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'Nós carregamos os sonhos de toda a África nesta Copa do Mundo Sub-20!',
    wikiPath: '5/52/Onazi_Headshot.png'
  },
  {
    id: 'godwin-kuso',
    name: 'Godwin Kuso',
    gender: 'Masculino',
    country: 'Nigéria',
    position: 'Atacante',
    affiliation: ['Nigéria Sub-20'],
    bounty: 0,
    styleOrPower: 'Ataque Rápido & Explosão Física',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'Nossa velocidade e garra vão superar qualquer tática egoísta do Japão!',
    wikiPath: '2/27/KusoPortrait.png'
  },
  {
    id: 'oboabona',
    name: 'Oboabona',
    gender: 'Masculino',
    country: 'Nigéria',
    position: 'Defensor',
    affiliation: ['Nigéria Sub-20'],
    bounty: 0,
    styleOrPower: 'Bloqueio Defensivo & Força Aérea',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'Nenhum atacante japonês vai passar pela muralha verde da Nigéria.',
    wikiPath: '8/8a/OboabonaHeadshot.png'
  },
  {
    id: 'bello',
    name: 'Bello',
    gender: 'Masculino',
    country: 'Nigéria',
    position: 'Meio-campista',
    affiliation: ['Nigéria Sub-20'],
    bounty: 0,
    styleOrPower: 'Combate no Meio-Campo & Desarme',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'O meio de campo pertence aos guerreiros da África. Lutaremos até o fim!',
    wikiPath: '0/0b/Bello.png'
  },
  {
    id: 'coach-gambari',
    name: 'Coach Gambari',
    gender: 'Masculino',
    country: 'Nigéria',
    position: 'Comissão / Mestre',
    affiliation: ['Nigéria Sub-20'],
    bounty: 0,
    styleOrPower: 'Comando Tático & Estrutura Africana',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Profissional / Convidado',
    quote: 'Honrem a bandeira nigeriana com disciplina, garra e união inabalável!',
    wikiPath: 'c/ce/Gambari.png'
  },
  {
    id: 'vivian-hugo',
    name: 'Vivian Hugo',
    gender: 'Masculino',
    country: 'França',
    position: 'Meio-campista',
    affiliation: ['França Sub-20', 'Nova Geração Mundial 11'],
    bounty: 0,
    styleOrPower: 'Metavisão & Regência da New Generation 11',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'O futebol é uma partitura elegante... e eu sou o maestro que dita cada compasso da França.',
    wikiPath: '0/02/Hugo.png'
  },
  {
    id: 'camus',
    name: 'Camus',
    gender: 'Masculino',
    country: 'França',
    position: 'Atacante',
    affiliation: ['França Sub-20'],
    bounty: 0,
    styleOrPower: 'Drible de Linha de Fundo & Cruzamentos Rápidos',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'Na ponta direita francesa, velocidade e técnica andam sempre lado a lado.',
    wikiPath: 'a/ad/Camus.png'
  },
  {
    id: 'bats',
    name: 'Bats',
    gender: 'Masculino',
    country: 'França',
    position: 'Meio-campista',
    affiliation: ['França Sub-20'],
    bounty: 0,
    styleOrPower: 'Distribuição Ofensiva & Pressão no Meio',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'Conectar a defesa aos nossos atacantes mundiais é a minha especialidade.',
    wikiPath: '1/11/Bats.png'
  },
  {
    id: 'gabin',
    name: 'Gabin',
    gender: 'Masculino',
    country: 'França',
    position: 'Defensor',
    affiliation: ['França Sub-20', 'Paris X Gen'],
    bounty: 0,
    styleOrPower: 'Marcação Individual & Cobertura Física',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'A zaga da França não tem espaço para hesitações ou falhas de concentração.',
    wikiPath: 'e/e7/Gabon.png'
  },
  {
    id: 'chapa',
    name: 'Chapa',
    gender: 'Masculino',
    country: 'França',
    position: 'Defensor',
    affiliation: ['França Sub-20', 'Paris X Gen'],
    bounty: 0,
    styleOrPower: 'Apoio pela Lateral Esquerda & Desarme Rápido',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'Pela lateral esquerda do PXG e da França, ninguém cria perigo impunemente.',
    wikiPath: 'a/a8/Chapa_PXG.png'
  },
  {
    id: 'renoir',
    name: 'Renoir',
    gender: 'Masculino',
    country: 'França',
    position: 'Goleiro',
    affiliation: ['França Sub-20'],
    bounty: 0,
    styleOrPower: 'Reflexos Apurados & Posicionamento sob as Traves',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'O gol da França Sub-20 está sob a minha custódia e proteção total.',
    wikiPath: 'b/b5/Renoir.png'
  },
  {
    id: 'arthur',
    name: 'Arthur',
    gender: 'Masculino',
    country: 'Inglaterra',
    position: 'Defensor',
    affiliation: ['Inglaterra Sub-20', 'Manshine City'],
    bounty: 0,
    styleOrPower: 'Avanço pelas Laterais & Suporte Ofensivo',
    debutArc: 'Liga Neo Egoísta (NEL)',
    status: 'Ativo / Sobrevivente',
    quote: 'O estilo do Manshine City exige intensidade física máxima de ponta a ponta.',
    wikiPath: '5/50/Arthur.png'
  },
  {
    id: 'young',
    name: 'Young',
    gender: 'Masculino',
    country: 'Inglaterra',
    position: 'Atacante',
    affiliation: ['Inglaterra Sub-20', 'Manshine City'],
    bounty: 0,
    styleOrPower: 'Movimentação Sem Bola & Apoio pelo Centro',
    debutArc: 'Liga Neo Egoísta (NEL)',
    status: 'Ativo / Sobrevivente',
    quote: 'Trabalhar as transições rápidas é a chave para o ataque da Inglaterra.',
    wikiPath: 'd/d2/Young.png'
  },
  {
    id: 'niang',
    name: 'Niang',
    gender: 'Masculino',
    country: 'Inglaterra',
    position: 'Defensor',
    affiliation: ['Inglaterra Sub-20'],
    bounty: 0,
    styleOrPower: 'Interceptação & Potência Física',
    debutArc: 'Copa do Mundo Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'Na zaga inglesa, impomos nosso poder físico para anular qualquer jogada.',
    wikiPath: '7/7c/Niang.png'
  },
  {
    id: 'busby',
    name: 'Busby',
    gender: 'Masculino',
    country: 'Inglaterra',
    position: 'Defensor',
    affiliation: ['Inglaterra Sub-20', 'Manshine City'],
    bounty: 0,
    styleOrPower: 'Combate Aéreo & Linha Defensiva',
    debutArc: 'Liga Neo Egoísta (NEL)',
    status: 'Ativo / Sobrevivente',
    quote: 'Segurança e disciplina na linha de trás: essa é a base do futebol inglês.',
    wikiPath: 'a/a7/Busby.png'
  },
  {
    id: 'ken-shimura',
    name: 'Ken Andatte Shimura',
    gender: 'Masculino',
    country: 'Japão',
    position: 'Atacante',
    affiliation: ['Japão Sub-20'],
    bounty: 0,
    styleOrPower: 'Finalização Reserva & Posicionamento',
    debutArc: 'Partida contra a Seleção Japão Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'Mesmo no banco, estou pronto para provar meu valor pelo futebol japonês!',
    wikiPath: '8/8d/Andatte_Ken_Shimura.png'
  },
  {
    id: 'beita-tsuru',
    name: 'Beita Tsuru',
    gender: 'Masculino',
    country: 'Japão',
    position: 'Defensor',
    affiliation: ['Japão Sub-20'],
    bounty: 0,
    styleOrPower: 'Desarme Tático & Cobertura de Zaga',
    debutArc: 'Partida contra a Seleção Japão Sub-20',
    status: 'Ativo / Sobrevivente',
    quote: 'A defesa do Japão Sub-20 é unida e luta até o último apito.',
    wikiPath: 'b/b6/Beita_Tsuru.png'
  },
  {
    id: 'yu-bachira',
    name: 'Yu Bachira',
    gender: 'Feminino',
    country: 'Japão',
    position: 'Comissão / Mestre',
    affiliation: ['Família Bachira'],
    bounty: 0,
    styleOrPower: 'Pintura Artística & Inspiração do "Monstro"',
    debutArc: 'Primeira Seleção',
    status: 'Profissional / Convidado',
    quote: 'Se ninguém te entender, Meguru, continue ouvindo o seu monstro e dance com a bola!',
    wikiPath: '5/54/Yu_Bachira.png'
  },
  {
    id: 'issei-isagi',
    name: 'Issei Isagi',
    gender: 'Masculino',
    country: 'Japão',
    position: 'Comissão / Mestre',
    affiliation: ['Família Isagi'],
    bounty: 0,
    styleOrPower: 'Apoio Paternal & Torcida Incondicional',
    debutArc: 'Primeira Seleção',
    status: 'Profissional / Convidado',
    quote: 'Vá com tudo, Yoichi! Seu pai sempre vai torcer por você em qualquer lugar do mundo!',
    wikiPath: 'a/a0/Issei_Isagi.png'
  },
  {
    id: 'iyo-isagi',
    name: 'Iyo Isagi',
    gender: 'Feminino',
    country: 'Japão',
    position: 'Comissão / Mestre',
    affiliation: ['Família Isagi'],
    bounty: 0,
    styleOrPower: 'Culinária Caseira & Cuidado Materno',
    debutArc: 'Primeira Seleção',
    status: 'Profissional / Convidado',
    quote: 'Coma bastante para ficar forte, Yoichi! Sua mãe está torcendo pelo seu sucesso!',
    wikiPath: 'e/ea/Iyo_Isagi.png'
  },
  {
    id: 'tomoya-tada',
    name: 'Tomonori Tada',
    gender: 'Masculino',
    country: 'Japão',
    position: 'Atacante',
    affiliation: ['Colégio Ichinan'],
    bounty: 0,
    styleOrPower: 'Companheirismo Colegial & Finalização em Equipe',
    debutArc: 'Primeira Seleção',
    status: 'Eliminado',
    quote: 'Desculpa ter perdido aquele gol, Isagi... Nós éramos "um por todos e todos por um"!',
    wikiPath: '4/49/Tama.png'
  }
];

async function main() {
  const avatarsDir = path.resolve('public/avatars/blue-lock');
  if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir, { recursive: true });
  }

  const charactersJsonPath = path.resolve('src/data/animes/blue-lock/characters.json');
  const existingChars = JSON.parse(fs.readFileSync(charactersJsonPath, 'utf8'));

  for (const c of characters) {
    const avatarFilename = `${c.id}.png`;
    const targetAvatarPath = path.join(avatarsDir, avatarFilename);
    const wsrvUrl = `https://wsrv.nl/?url=static.wikia.nocookie.net/bluelock/images/${encodeURIComponent(c.wikiPath)}`;

    console.log(`Downloading ${c.name} (${c.id})...`);
    try {
      const res = await fetch(wsrvUrl);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Process with sharp: crop to square centered on face, resize to 256x256
      const image = sharp(buffer);
      const meta = await image.metadata();

      const size = Math.min(meta.width, meta.height);
      const left = Math.floor((meta.width - size) / 2);
      // Top slightly higher than center to focus face
      let top = Math.floor((meta.height - size) * 0.25);
      if (top < 0) top = 0;
      if (top + size > meta.height) top = meta.height - size;

      await sharp(buffer)
        .extract({ left, top, width: size, height: size })
        .resize(256, 256)
        .png({ quality: 90 })
        .toFile(targetAvatarPath);

      console.log(`  ✓ Saved ${avatarFilename}`);
    } catch (e) {
      console.error(`  ❌ Failed ${c.name}: ${e.message}`);
    }

    // Add to existing characters if not present
    if (!existingChars.find(x => x.id === c.id)) {
      existingChars.push({
        id: c.id,
        name: c.name,
        gender: c.gender,
        species: 'Humano',
        country: c.country,
        position: c.position,
        affiliation: c.affiliation,
        bounty: c.bounty,
        styleOrPower: c.styleOrPower,
        debutArc: c.debutArc,
        status: c.status,
        quote: c.quote,
        avatar: `/avatars/blue-lock/${avatarFilename}`
      });
    }
  }

  fs.writeFileSync(charactersJsonPath, JSON.stringify(existingChars, null, 2), 'utf8');
  console.log(`Updated ${charactersJsonPath} successfully! Total characters: ${existingChars.length}`);
}

main().catch(console.error);
