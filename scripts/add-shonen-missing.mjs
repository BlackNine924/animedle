import fs from 'fs';
import path from 'path';

function loadChars(slug) {
  const p = path.join('src/data/animes', slug, 'characters.json');
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function saveChars(slug, chars) {
  const p = path.join('src/data/animes', slug, 'characters.json');
  fs.writeFileSync(p, JSON.stringify(chars, null, 2), 'utf8');
}

function appendMissing(slug, candidates) {
  const chars = loadChars(slug);
  const existingIds = new Set(chars.map(c => c.id.toLowerCase()));
  const existingNames = new Set(chars.map(c => c.name.toLowerCase()));
  let added = 0;

  for (const c of candidates) {
    const normId = c.id.toLowerCase();
    const normName = c.name.toLowerCase();
    if (existingIds.has(normId) || existingNames.has(normName)) {
      continue;
    }
    // ensure avatar path
    if (!c.avatar) {
      c.avatar = `/avatars/${slug}/${c.id}.png`;
    }
    chars.push(c);
    existingIds.add(normId);
    existingNames.add(normName);
    added++;
  }

  saveChars(slug, chars);
  console.log(`[${slug}] Adicionados ${added} personagens. Total agora: ${chars.length}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. ONE PIECE
// ─────────────────────────────────────────────────────────────────────────────
const OP_MISSING = [
  {
    id: "fullbody",
    name: "Fullbody (Punho de Ferro)",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Marinha - Quartel General", "Tropa da Hina"],
    rank: "Tenente da Marinha",
    styleOrPower: "Estilo de Boxe com Soqueiras de Ferro",
    debutArc: "Arco do Baratie",
    status: "Vivo",
    quote: "Um cavalheiro sabe apreciar um vinho tinto de qualidade... Garçom, tem uma mosca na minha sopa!",
    techniques: ["Soco Direto de Soqueira", "Dança Sincronizada com Jango"],
    combatType: "Corpo a Corpo",
    roleOrArchetype: "Antagonista / Suporte Cômico",
    hairColor: "Loiro"
  },
  {
    id: "patty",
    name: "Patty",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Restaurante Baratie"],
    rank: "Cozinheiro de Combate",
    styleOrPower: "Combate com Bazuca de Carne e Pratos",
    debutArc: "Arco do Baratie",
    status: "Vivo",
    quote: "Bem-vindo ao Baratie, seu desgraçado! Coma tudo ou enfio essa frigideira na sua goela!",
    techniques: ["Meatball Cannon (Canhão Almôndega)", "Arremesso de Cutelo"],
    combatType: "Longo Alcance / Projéteis",
    roleOrArchetype: "Suporte Cômico",
    hairColor: "Preto"
  },
  {
    id: "carne",
    name: "Carne",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Restaurante Baratie"],
    rank: "Cozinheiro de Carnes",
    styleOrPower: "Estilo de Facas Duplas de Açougueiro",
    debutArc: "Arco do Baratie",
    status: "Vivo",
    quote: "Aqui no Baratie nós servimos boa comida e socos na cara de piratas caloteiros!",
    techniques: ["Malabarismo Cortante de Facas", "Desossa Rápida de Monstros"],
    combatType: "Armas Brancas / Espadachim",
    roleOrArchetype: "Suporte Cômico",
    hairColor: "Castanho"
  },
  {
    id: "pearl",
    name: "Pearl (O Intocável)",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Piratas da Armada de Krieg"],
    rank: "Comandante de Defesa",
    styleOrPower: "Escudos de Ferro Corporais & Fogo",
    debutArc: "Arco do Baratie",
    status: "Vivo",
    quote: "Eu nunca perdi uma gota de sangue em combate! Se eu sangrar, a selva inteira pega fogo!",
    techniques: ["Fire Pearl Present", "Defesa Absoluta de Placas de Ferro"],
    combatType: "Magia / Sobrenatural",
    roleOrArchetype: "Antagonista",
    hairColor: "Castanho"
  },
  {
    id: "capitao-nezumi",
    name: "Capitão Nezumi",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Marinha - 16ª Divisão"],
    rank: "Capitão Corrupto da Marinha",
    styleOrPower: "Armas de Fogo & Corrupção",
    debutArc: "Arco de Arlong Park",
    status: "Vivo",
    quote: "Chichi! Confisque todo o tesouro da ladra Nami em nome da justiça da Marinha!",
    techniques: ["Tiro Covarde de Pistola", "Conluio Financeiro com Homens-Peixe"],
    combatType: "Longo Alcance / Projéteis",
    roleOrArchetype: "Antagonista",
    hairColor: "Castanho"
  },
  {
    id: "buchi",
    name: "Buchi (Irmãos Nyaban)",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Piratas do Gato Preto"],
    rank: "Combatente do Bando",
    styleOrPower: "Garras de Gato e Salto Hipnótico Esmagador",
    debutArc: "Arco da Vila Syrup",
    status: "Vivo",
    quote: "Quando o Jango me hipnotiza, meu corpo fica dez vezes mais pesado e destrói rochas!",
    techniques: ["Cat Attack Esmagador", "Garras Cortantes de Felino"],
    combatType: "Corpo a Corpo",
    roleOrArchetype: "Antagonista",
    hairColor: "Preto"
  },
  {
    id: "chaka",
    name: "Chaka (O Chacal)",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Reino de Alabasta", "Guarda Real"],
    rank: "Comandante da Guarda Real de Alabasta",
    styleOrPower: "Inu Inu no Mi: Modelo Chacal (Zoan)",
    debutArc: "Arco de Alabasta",
    status: "Vivo",
    quote: "Eu sou o Deus Guardião de Alabasta! Enquanto eu respirar, Crocodile não tomará o palácio!",
    techniques: ["Transformação em Chacal Veloz", "Corte Rápido de Espada Zoan"],
    combatType: "Armas Brancas / Espadachim",
    roleOrArchetype: "Suporte",
    hairColor: "Preto"
  },
  {
    id: "koza",
    name: "Koza",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Exército Rebelde de Alabasta"],
    rank: "Líder dos Rebeldes",
    styleOrPower: "Esgrima com Sabre de Deserto",
    debutArc: "Arco de Alabasta",
    status: "Vivo",
    quote: "Nós não estamos lutando por ganância, estamos lutando pela água e pela sobrevivência do nosso povo!",
    techniques: ["Investida Rebelde do Deserto", "Liderança Militar Popular"],
    combatType: "Armas Brancas / Espadachim",
    roleOrArchetype: "Suporte",
    hairColor: "Loiro"
  },
  {
    id: "wiper",
    name: "Wiper (O Demônio da Guerra)",
    gender: "Masculino",
    species: "Humano (Shandia)",
    affiliation: ["Povo Shandia de Skypiea", "Guarda de Deus"],
    rank: "Líder Guerreiro de Shandia",
    styleOrPower: "Burn Bazooka & Reject Dial de Triplo Impacto",
    debutArc: "Arco de Skypiea",
    status: "Vivo",
    quote: "Pela luz de Shandora! Eu acenderei o Fogo de Shandora nem que meu corpo se desintegre pelo Reject Dial!",
    techniques: ["Reject Dial Suicida", "Burn Bazooka de Chamas Azuis"],
    combatType: "Longo Alcance / Projéteis",
    roleOrArchetype: "Rival / Suporte",
    hairColor: "Castanho"
  },
  {
    id: "kokoro",
    name: "Kokoro",
    gender: "Feminino",
    species: "Tritão / Sereia (Icefish)",
    affiliation: ["Companhia do Trem Marinho Shift", "Tom's Workers"],
    rank: "Condutora do Rocketman",
    styleOrPower: "Natação de Sereia & Condução Ferroviária",
    debutArc: "Arco de Water 7",
    status: "Vivo",
    quote: "Nagagaga! Segurem-se firme, porque o Rocketman não tem freios nem trilhos!",
    techniques: ["Condução Suicida de Trem Marinho", "Nado Rápido de Resgate"],
    combatType: "Não-Combatente",
    roleOrArchetype: "Suporte",
    hairColor: "Verde"
  },
  {
    id: "zambai",
    name: "Zambai",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Franky Family"],
    rank: "Líder Operacional da Franky Family",
    styleOrPower: "Bazucas e Katana de Demolição",
    debutArc: "Arco de Water 7",
    status: "Vivo",
    quote: "Aniki! Nós daremos a nossa vida para resgatar o Franky-aniki de Enies Lobby!",
    techniques: ["Disparo de Míssil da Família", "Corte de Demolição com Katana"],
    combatType: "Longo Alcance / Projéteis",
    roleOrArchetype: "Suporte",
    hairColor: "Preto"
  },
  {
    id: "hyouzou",
    name: "Hyouzou",
    gender: "Masculino",
    species: "Tritão (Polvo de Anéis Azuis)",
    affiliation: ["Novos Piratas Tritões"],
    rank: "Espadachim Chefe Mercenário",
    styleOrPower: "Estilo das Oito Espadas Bêbadas & Veneno Letal",
    debutArc: "Arco da Ilha dos Tritões",
    status: "Derrotado",
    quote: "Hic... O dinheiro compra a minha espada, mas o saquê dita o ritmo dos meus oito tentáculos!",
    techniques: ["Kagetsu Hachijyuu (Oito Espadas Venenosas)", "Embriaguez com Energy Steroids"],
    combatType: "Armas Brancas / Espadachim",
    roleOrArchetype: "Antagonista",
    hairColor: "Verde"
  },
  {
    id: "wadatsumi",
    name: "Wadatsumi",
    gender: "Masculino",
    species: "Tritão Gigante (Peixe-Tigre)",
    affiliation: ["Piratas do Sol", "Piratas Voadores"],
    rank: "Combatente Colossal",
    styleOrPower: "Força Muscular Titânica & Inflar Corpo",
    debutArc: "Arco da Ilha dos Tritões",
    status: "Vivo",
    quote: "Eu não sou bobo! Eu fico gigante que nem uma montanha submarina!",
    techniques: ["Mega Soco Colossal", "Mega Balão Submarino"],
    combatType: "Corpo a Corpo",
    roleOrArchetype: "Suporte",
    hairColor: "Ruivo"
  },
  {
    id: "yasuie",
    name: "Shimotsuki Yasuie (Tonoyasu)",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Família Shimotsuki de Wano", "Vila Ebisu"],
    rank: "Ex-Daimyo de Hakumai",
    styleOrPower: "Sorriso Eterno do SMILE & Sacrifício Nobre",
    debutArc: "Arco do País de Wano",
    status: "Morto",
    quote: "Hahaha! O povo de Ebisu ri para não chorar! Eu morrerei sorrindo para proteger a rebelião dos Nove Bainhas!",
    techniques: ["Retórica Nobre de Daimyo", "Desvio das Suspeitas de Orochi"],
    combatType: "Não-Combatente",
    roleOrArchetype: "Mentor / Suporte",
    hairColor: "Azul"
  }
];

appendMissing('one-piece', OP_MISSING);

// ─────────────────────────────────────────────────────────────────────────────
// 2. BLEACH
// ─────────────────────────────────────────────────────────────────────────────
const BLEACH_MISSING = [
  {
    id: "hanataro-yamada",
    name: "Hanataro Yamada",
    gender: "Masculino",
    species: "Shinigami",
    affiliation: ["Gotei 13 - 4ª Divisão"],
    rank: "7º Oficial da 4ª Divisão",
    styleOrPower: "Zanpakuto Hisagomaru (Absorção de Ferimentos e Disparo)",
    debutArc: "Arco da Sociedade das Almas",
    status: "Vivo",
    quote: "Eu sou apenas um membro da divisão de alívio médico... mas jurei ajudar a Kuchiki-san e o Kurosaki-san!",
    techniques: ["Curativo Espiritual Kaido", "Ategaki de Energia Curativa Convertida em Golpe"],
    combatType: "Magia / Sobrenatural",
    roleOrArchetype: "Suporte Cômico",
    hairColor: "Preto"
  },
  {
    id: "jidanbo-ikkanzaka",
    name: "Jidanbo Ikkanzaka",
    gender: "Masculino",
    species: "Alma / Guardião Gigante",
    affiliation: ["Seireitei - Portão Hakutomon"],
    rank: "Guardião do Portão Oeste",
    styleOrPower: "Machados Gêmeos Gigantescos & Força Bruta",
    debutArc: "Arco da Sociedade das Almas",
    status: "Vivo",
    quote: "Ninguém passa pelo Portão Hakutomon sem permissão! Esse é o meu dever há trezentos anos!",
    techniques: ["Jidanbo Strike de Machados", "Abertura dos Portões de Sekiseki"],
    combatType: "Armas Brancas / Espadachim",
    roleOrArchetype: "Suporte",
    hairColor: "Preto"
  },
  {
    id: "ganju-shiba",
    name: "Ganju Shiba",
    gender: "Masculino",
    species: "Alma / Clã Nobre Shiba",
    affiliation: ["Família Shiba de Rukongai"],
    rank: "Líder dos Rebeldes de Rukongai",
    styleOrPower: "Manipulação de Areia (Seppa) & Montaria de Javali",
    debutArc: "Arco da Sociedade das Almas",
    status: "Vivo",
    quote: "Eu odiava os Shinigami pela morte do meu irmão Kaien... mas você me mostrou o verdadeiro significado de coragem, Ichigo!",
    techniques: ["Seppa (Transformação de Pedra em Areia)", "Fogos de Artifício Explosivos Shiba"],
    combatType: "Magia / Sobrenatural",
    roleOrArchetype: "Rival / Suporte",
    hairColor: "Castanho"
  },
  {
    id: "kukaku-shiba",
    name: "Kukaku Shiba",
    gender: "Feminino",
    species: "Alma / Clã Nobre Shiba",
    affiliation: ["Família Shiba de Rukongai"],
    rank: "Líder do Clã Shiba / Mestre em Pirotecnia",
    styleOrPower: "Canhão Espiritual Flor de Lótus & Kido de Nível Alto",
    debutArc: "Arco da Sociedade das Almas",
    status: "Vivo",
    quote: "Eu vou disparar vocês direto no coração da Seireitei com o meu canhão de fogos! Aguentem firme a esfera de reishi!",
    techniques: ["Canhão Pirotécnico de Seireitei", "Kido sem Encantamento Destrutivo"],
    combatType: "Magia / Sobrenatural",
    roleOrArchetype: "Mentor / Suporte",
    hairColor: "Preto"
  },
  {
    id: "tessai-tsukabishi",
    name: "Tessai Tsukabishi",
    gender: "Masculino",
    species: "Shinigami",
    affiliation: ["Loja Urahara", "Corpo Kido"],
    rank: "Ex-Grande Comandante do Corpo Kido",
    styleOrPower: "Kidos Proibidos de Espaço-Tempo & Bakudo Mestre",
    debutArc: "Arco do Shinigami Substituto",
    status: "Vivo",
    quote: "Na Loja Urahara nós vendemos doces e itens espirituais... mas se ameaçarem nossos amigos, liberarei Hadou de nível 99!",
    techniques: ["Jikanteishi (Parada Temporal)", "Kuukan Teni (Teletransporte Espacial)"],
    combatType: "Magia / Sobrenatural",
    roleOrArchetype: "Mentor / Suporte",
    hairColor: "Preto"
  },
  {
    id: "dordoni-alessandro",
    name: "Dordoni Alessandro Del Socaccio",
    gender: "Masculino",
    species: "Arrancar (Privaron Espada)",
    affiliation: ["Las Noches - Exército de Aizen"],
    rank: "Privaron Espada Nº 103",
    styleOrPower: "Resurrección Giralda (Ciclones de Chutes de Pássaro)",
    debutArc: "Arco do Hueco Mundo",
    status: "Morto",
    quote: "Bebê! Mostre-me sua Bankai e sua máscara Hollow completas! Eu quero lutar com honra de guerreiro contra você!",
    techniques: ["El Uno Chute Tornado", "Cero Barocan"],
    combatType: "Corpo a Corpo",
    roleOrArchetype: "Antagonista",
    hairColor: "Preto"
  },
  {
    id: "cirucci-sanderwicci",
    name: "Cirucci Sanderwicci",
    gender: "Feminino",
    species: "Arrancar (Privaron Espada)",
    affiliation: ["Las Noches - Exército de Aizen"],
    rank: "Privaron Espada Nº 105",
    styleOrPower: "Resurrección Golondrina (Chicote de Disco Vibratório Cortante)",
    debutArc: "Arco do Hueco Mundo",
    status: "Vivo",
    quote: "Quincy impertinente! Minhas lâminas de Reishi giratórias vão fatiar todas as suas flechas antes de você piscar!",
    techniques: ["Ala de Andorinha Cortante", "Lâminas de Plumas Telecinéticas"],
    combatType: "Armas Brancas / Espadachim",
    roleOrArchetype: "Antagonista",
    hairColor: "Roxo"
  }
];

appendMissing('bleach', BLEACH_MISSING);

// ─────────────────────────────────────────────────────────────────────────────
// 3. BOKU NO HERO ACADEMIA
// ─────────────────────────────────────────────────────────────────────────────
const MHA_MISSING = [
  {
    id: "vlad-king",
    name: "Vlad King (Sekijiro Kan)",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Colégio U.A. - Turma 1-B", "Pró-Heróis"],
    rank: "Professor Conselheiro da Turma 1-B",
    styleOrPower: "Quirk: Bloodcurdle / Manipulação e Endurecimento de Próprio Sangue",
    debutArc: "Arco do Festival Esportivo da U.A.",
    status: "Vivo",
    quote: "A Turma 1-B não fica atrás da 1-A em nada! Mostrem o fruto do treinamento diário de vocês!",
    techniques: ["Prisão de Sangue Coagulado", "Lâminas de Sangue Endurecido"],
    combatType: "Magia / Sobrenatural",
    roleOrArchetype: "Mentor",
    hairColor: "Branco"
  },
  {
    id: "hound-dog",
    name: "Hound Dog (Ryo Inui)",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Colégio U.A.", "Pró-Heróis"],
    rank: "Conselheiro de Orientação Estudantil",
    styleOrPower: "Quirk: Dog (Sentidos Caninos Hiper-Apurados & Fúria Selvagem)",
    debutArc: "Arco do Festival Esportivo da U.A.",
    status: "Vivo",
    quote: "Grrr! Woof! Vocês precisam seguir as regras de convivência do campus!",
    techniques: ["Faro Rastreador Infalível", "Rugido Intimidatório de Advertência"],
    combatType: "Corpo a Corpo",
    roleOrArchetype: "Mentor / Suporte Cômico",
    hairColor: "Castanho"
  },
  {
    id: "ectoplasm",
    name: "Ectoplasm",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Colégio U.A.", "Pró-Heróis"],
    rank: "Professor de Matemática da U.A.",
    styleOrPower: "Quirk: Clones de Ectoplasma Sólido (Até 30 Clones Simultâneos)",
    debutArc: "Arco do Ataque à USJ",
    status: "Vivo",
    quote: "Trinta de mim ao mesmo tempo é o teste padrão para avaliar o trabalho em equipe dos estudantes.",
    techniques: ["Clone Gigante Ectoplasmático", "Chutes com Próteses Metálicas"],
    combatType: "Magia / Sobrenatural",
    roleOrArchetype: "Mentor",
    hairColor: "Preto"
  },
  {
    id: "eri",
    name: "Eri",
    gender: "Feminino",
    species: "Humano",
    affiliation: ["Aliança de Proteção da U.A.", "Família Shie Hassaikai"],
    rank: "Protegida de Deku e Mirio",
    styleOrPower: "Quirk: Rewind (Rebobinar Estado Biológico no Tempo)",
    debutArc: "Arco do Estágio & Shie Hassaikai",
    status: "Vivo",
    quote: "Deku-san... segure a minha mão! Eu vou rebobinar os seus ferimentos para que você possa lutar a 100%!",
    techniques: ["Chifre Espiral de Luz Reversa", "Cura e Restauração de Individualidades"],
    combatType: "Magia / Sobrenatural",
    roleOrArchetype: "Suporte",
    hairColor: "Branco"
  },
  {
    id: "kota-izumi",
    name: "Kota Izumi",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Família Water Hose", "Acampamento Florestal da U.A."],
    rank: "Menino Salvo por Deku",
    styleOrPower: "Quirk: Jatos de Água das Palmas das Mãos",
    debutArc: "Arco do Acampamento de Treinamento",
    status: "Vivo",
    quote: "Eu odiava os heróis porque meus pais morreram em serviço... Mas o Deku quase perdeu a vida para me salvar.",
    techniques: ["Disparo de Água Distrator", "Chute de Fuga Infantil"],
    combatType: "Longo Alcance / Projéteis",
    roleOrArchetype: "Suporte",
    hairColor: "Preto"
  },
  {
    id: "rock-lock",
    name: "Rock Lock (Ken Takagi)",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Pró-Heróis"],
    rank: "Pró-Herói de Suporte Tático",
    styleOrPower: "Quirk: Lock Down (Fixar Objetos Inertes no Espaço Tridimensional)",
    debutArc: "Arco do Estágio & Shie Hassaikai",
    status: "Vivo",
    quote: "Se eu fixar esse bloco no ar, nem dez homens conseguem movê-lo um centímetro!",
    techniques: ["Fixação Espacial de Superfície", "Plataformas Flutuantes Instantâneas"],
    combatType: "Magia / Sobrenatural",
    roleOrArchetype: "Suporte",
    hairColor: "Preto"
  }
];

appendMissing('my-hero-academia', MHA_MISSING);

// ─────────────────────────────────────────────────────────────────────────────
// 4. KAIJU NO. 8
// ─────────────────────────────────────────────────────────────────────────────
const KAIJU_MISSING = [
  {
    id: "kaiju-no-9",
    name: "Kaiju No. 9",
    gender: "Masculino",
    species: "Kaiju Identificado Humanoide",
    affiliation: ["Kaijus Primordiais"],
    rank: "Principal Antagonista da Força de Defesa",
    styleOrPower: "Metamorfose, Absorção de Consciências Humanas & Projéteis Orgânicos",
    debutArc: "Arco da Base Sagamihara",
    status: "Vivo",
    quote: "Os humanos são criaturas fascinantes... Depois que absorvo o seu cérebro, todas as suas memórias viram minhas armas.",
    techniques: ["Disparo de Dedos Perfuradores Fônicos", "Absorção Celular de Isao Shinomiya"],
    combatType: "Magia / Sobrenatural",
    roleOrArchetype: "Antagonista / Vilão",
    hairColor: "Branco"
  },
  {
    id: "kaiju-no-10",
    name: "Kaiju No. 10",
    gender: "Masculino",
    species: "Kaiju Identificado Gladiador",
    affiliation: ["Armamento Especial de Hoshina"],
    rank: "Líder de Ataque à Base Tachikawa",
    styleOrPower: "Combate de Corpo Gigantesco, Força Bruta & Cauda de Impacto",
    debutArc: "Arco da Invasão da Base Tachikawa",
    status: "Capturado (Virou Arma Numerada)",
    quote: "Lute comigo sozinho, vice-capitão das espadas! Eu quero sentir o gosto de um duelo verdadeiro!",
    techniques: ["Esmagamento de Cauda Dorsal", "Grito de Convocação de Wyverns Voadores"],
    combatType: "Corpo a Corpo",
    roleOrArchetype: "Rival / Antagonista",
    hairColor: "Preto"
  }
];

appendMissing('kaiju-no-8', KAIJU_MISSING);

// ─────────────────────────────────────────────────────────────────────────────
// 5. FRIEREN
// ─────────────────────────────────────────────────────────────────────────────
const FRIEREN_MISSING = [
  {
    id: "stoltz",
    name: "Stoltz",
    gender: "Masculino",
    species: "Humano",
    affiliation: ["Aldeia dos Guerreiros"],
    rank: "Irmão Mais Velho de Stark",
    styleOrPower: "Técnica da Túnica Imaculada & Machado Pesado",
    debutArc: "Arco da Travessia do Norte",
    status: "Morto",
    quote: "Stark... mesmo que seu casaco fique sujo de lama e sangue, você ainda é o meu irmão mais novo precioso.",
    techniques: ["Corte Preciso Sem Sujar a Roupa", "Golpe Rompe-Chão de Machado"],
    combatType: "Armas Brancas / Espadachim",
    roleOrArchetype: "Mentor / Suporte",
    hairColor: "Ruivo"
  }
];

appendMissing('frieren', FRIEREN_MISSING);

console.log("=== ADIÇÃO DE PERSONAGENS SHONEN CONCLUÍDA COM SUCESSO! ===");
