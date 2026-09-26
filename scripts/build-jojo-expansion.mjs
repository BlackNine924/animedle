import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'jojos-bizarre-adventure');
const dataDir = path.join(rootDir, 'src', 'data', 'animes', 'jojos-bizarre-adventure');

export const NEW_JOJO_CHARACTERS = [
  // ==========================================
  // PARTE 1: PHANTOM BLOOD (7)
  // ==========================================
  {
    id: 'tonpetty',
    name: 'Tonpetty',
    fandomTitle: 'Tonpetty',
    gender: 'Masculino',
    species: 'Usuário de Hamon',
    affiliation: ['Mestres de Hamon', 'Templo Tibetano'],
    origin: 'Tíbet',
    stand: 'Nenhum',
    styleOrPower: 'Hamon (Ondulação) e Clarividência',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'Eu vejo o destino gravado nas linhas da sua mão, William Zeppeli.',
    techniques: ['Previsão do Destino', 'Hamon Healing', 'Ondulação Profunda']
  },
  {
    id: 'straizo-p1',
    name: 'Straizo (Parte 1)',
    jojoWikiTitle: 'Straizo',
    gender: 'Masculino',
    species: 'Usuário de Hamon',
    affiliation: ['Mestres de Hamon', 'Grupo Joestar'],
    origin: 'Tíbet',
    stand: 'Nenhum',
    styleOrPower: 'Hamon (Ondulação)',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Vivo',
    quote: 'Nós viemos para purificar estas terras do mal de Dio!',
    techniques: ['Hamon Overdrive', 'Chute de Hamon']
  },
  {
    id: 'poco',
    name: 'Poco',
    fandomTitle: 'Poco',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Aliados Joestar'],
    origin: 'Inglaterra',
    stand: 'Nenhum',
    styleOrPower: 'Nenhuma',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Vivo',
    quote: 'Amanhã é hoje! Eu tenho que ser corajoso agora!',
    techniques: ['Coragem Inabalável', 'Infiltração Pequena']
  },
  {
    id: 'wang-chan',
    name: 'Wang Chan',
    fandomTitle: 'Wang Chan',
    gender: 'Masculino',
    species: 'Zumbi',
    affiliation: ['Seguidores de Dio'],
    origin: 'China',
    stand: 'Nenhum',
    styleOrPower: 'Garras e Mordida Zumbi',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'Lorde Dio, este é o veneno oriental indetectável que o senhor pediu.',
    techniques: ['Agilidade Sobrenatural', 'Ataque com Garras']
  },
  {
    id: 'george-joestar-i',
    name: 'George Joestar I',
    fandomTitle: 'George Joestar I',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Família Joestar'],
    origin: 'Inglaterra',
    stand: 'Nenhum',
    styleOrPower: 'Nenhuma',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'Jonathan, perdoe seu irmão Dio... seja um nobre cavalheiro.',
    techniques: ['Amor Paternal', 'Nobreza Britânica']
  },
  {
    id: 'jack-the-ripper',
    name: 'Jack, o Estripador',
    fandomTitle: 'Jack the Ripper',
    gender: 'Masculino',
    species: 'Zumbi',
    affiliation: ['Seguidores de Dio'],
    origin: 'Inglaterra',
    stand: 'Nenhum',
    styleOrPower: 'Facas Cirúrgicas Ocultas no Corpo',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'Vou estripá-los de dentro para fora com minhas lâminas!',
    techniques: ['Lâminas Corporais Ocultas', 'Ataque Furtivo']
  },
  {
    id: 'doobie',
    name: 'Doobie',
    fandomTitle: 'Doobie',
    gender: 'Masculino',
    species: 'Zumbi',
    affiliation: ['Seguidores de Dio'],
    origin: 'Inglaterra',
    stand: 'Nenhum',
    styleOrPower: 'Ninho de Víboras Faciais',
    debutArc: 'Parte 1: Phantom Blood',
    status: 'Morto',
    quote: 'Venham, minhas queridas cobras, saboreiem a carne dessa garota!',
    techniques: ['Liberação de Víboras Venenosas']
  },

  // ==========================================
  // PARTE 2: BATTLE TENDENCY (7)
  // ==========================================
  {
    id: 'straizo-vampire',
    name: 'Straizo (Vampiro)',
    fandomTitle: 'Straizo',
    gender: 'Masculino',
    species: 'Vampiro',
    affiliation: ['Antagonistas'],
    origin: 'Tíbet',
    stand: 'Nenhum',
    styleOrPower: 'Poderes Vampíricos e Hamon Residual',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Morto',
    quote: 'Eu não queria envelhecer como mestre Tonpetty! Eu desejava a juventude eterna de Dio!',
    techniques: ['Space Ripper Stingy Eyes', 'Auto-destruição por Hamon']
  },
  {
    id: 'loggins',
    name: 'Loggins',
    fandomTitle: 'Loggins',
    gender: 'Masculino',
    species: 'Usuário de Hamon',
    affiliation: ['Mestres de Hamon', 'Grupo Lisa Lisa'],
    origin: 'Itália',
    stand: 'Nenhum',
    styleOrPower: 'Hamon (Ondulação)',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Morto',
    quote: 'Joseph, se sua respiração falhar um segundo sequer, o pilar de óleo irá esmagá-lo!',
    techniques: ['Hamon Overdrive', 'Treinamento Rigoroso']
  },
  {
    id: 'messina',
    name: 'Messina',
    fandomTitle: 'Messina',
    gender: 'Masculino',
    species: 'Usuário de Hamon',
    affiliation: ['Mestres de Hamon', 'Grupo Lisa Lisa'],
    origin: 'Itália',
    stand: 'Nenhum',
    styleOrPower: 'Hamon (Ondulação)',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Vivo',
    quote: 'Caesar, seu domínio sobre a ondulação das bolhas está quase completo.',
    techniques: ['Hamon Overdrive', 'Guarda de Lisa Lisa']
  },
  {
    id: 'donovan',
    name: 'Donovan',
    fandomTitle: 'Donovan',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Exército Alemão'],
    origin: 'Alemanha',
    stand: 'Nenhum',
    styleOrPower: 'Combate de Comando e Armas Brancas',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Morto',
    quote: 'Eu sou o capitão Donovan dos comandos especiais alemães!',
    techniques: ['Facas de Arremesso', 'Emboscada no Deserto']
  },
  {
    id: 'mark',
    name: 'Mark',
    jojoWikiTitle: 'Mark',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Exército Alemão', 'Aliados de Caesar'],
    origin: 'Alemanha',
    stand: 'Nenhum',
    styleOrPower: 'Nenhuma',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Morto',
    quote: 'Caesar... eu ia me casar na próxima semana... por favor, acabe com minha dor...',
    techniques: ['Condução Veicular']
  },
  {
    id: 'wired-beck',
    name: 'Wired Beck',
    fandomTitle: 'Wired Beck',
    gender: 'Masculino',
    species: 'Vampiro',
    affiliation: ['Servos dos Homens do Pilar'],
    origin: 'Alemanha',
    stand: 'Nenhum',
    styleOrPower: 'Espinhos de Arame Carnosos',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Morto',
    quote: 'Eu sou Wired Beck! Meu corpo produz espinhos capazes de perfurar qualquer um!',
    techniques: ['Espinhos Corporais', 'Vampirismo']
  },
  {
    id: 'mario-zeppeli',
    name: 'Mario Zeppeli',
    fandomTitle: 'Mario Zeppeli',
    gender: 'Masculino',
    species: 'Usuário de Hamon',
    affiliation: ['Família Zeppeli'],
    origin: 'Itália',
    stand: 'Nenhum',
    styleOrPower: 'Hamon (Ondulação)',
    debutArc: 'Parte 2: Battle Tendency',
    status: 'Morto',
    quote: 'Garoto, fique longe dessa parede! Viva sua vida em paz!',
    techniques: ['Hamon Overdrive', 'Sacrifício Heroico']
  },

  // ==========================================
  // PARTE 3: STARDUST CRUSADERS (14)
  // ==========================================
  {
    id: 'gray-fly',
    name: 'Gray Fly',
    fandomTitle: 'Gray Fly',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO', 'Tarô Divinatório'],
    origin: 'Estados Unidos',
    stand: 'Tower of Gray',
    styleOrPower: 'Besouro Assassino Hipersônico',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Tower of Gray voa mais rápido que uma bala e rasga línguas!',
    techniques: ['Tower of Gray', 'Arremesso de Língua Secundária', 'Voo Hipersônico']
  },
  {
    id: 'fake-captain-tennille',
    name: 'Falso Capitão Tennille',
    fandomTitle: 'Impostor Captain Tennille',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO', 'Tarô Divinatório'],
    origin: 'Desconhecida',
    stand: 'Dark Blue Moon',
    styleOrPower: 'Stand Anfíbio Cortante e Cracas Sugadoras',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Na água ninguém é páreo para o meu Dark Blue Moon!',
    techniques: ['Dark Blue Moon', 'Cracas Drenadoras de Energia', 'Escamas Cortantes']
  },
  {
    id: 'forever',
    name: 'Forever',
    fandomTitle: 'Forever',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO', 'Tarô Divinatório'],
    origin: 'Desconhecida',
    stand: 'Strength',
    styleOrPower: 'Controle Total de Cargueiro Naval',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: '*Grunhidos inteligentes de soberba superior aos humanos*',
    techniques: ['Strength', 'Manipulação Estrutural de Navio', 'Guindastes e Paredes Vivas']
  },
  {
    id: 'devo-the-cursed',
    name: 'Devo, o Amaldiçoado',
    fandomTitle: 'Devo',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO', 'Tarô Divinatório'],
    origin: 'Estados Unidos',
    stand: 'Ebony Devil',
    styleOrPower: 'Stand Movido a Ódio e Possessão de Boneco',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Quanto mais você me machuca, maior é o rancor que alimenta o Ebony Devil!',
    techniques: ['Ebony Devil', 'Possessão Vodu', 'Ataque com Navalha e Arpão']
  },
  {
    id: 'rubber-soul',
    name: 'Rubber Soul',
    fandomTitle: 'Rubber Soul',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO', 'Tarô Divinatório'],
    origin: 'Estados Unidos',
    stand: 'Yellow Temperance',
    styleOrPower: 'Slime Ácido Copiador de Aparências',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Derrotado',
    quote: 'Do-you-under-stand?! Meu Yellow Temperance não tem fraquezas!',
    techniques: ['Yellow Temperance', 'Dissolução Ácida', 'Mimetismo Físico Perfeito']
  },
  {
    id: 'nena',
    name: 'Nena',
    fandomTitle: 'Nena',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO', 'Tarô Divinatório'],
    origin: 'Índia',
    stand: 'Empress',
    styleOrPower: 'Stand Parasita de Crescimento Cutâneo',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Eu nasci de uma gota do seu sangue e logo devorarei seu corpo, Joseph Joestar!',
    techniques: ['Empress', 'Parasitismo Físico', 'Crescimento Acelerado de Membros']
  },
  {
    id: 'zz',
    name: 'ZZ',
    fandomTitle: 'ZZ',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO', 'Tarô Divinatório'],
    origin: 'Estados Unidos',
    stand: 'Wheel of Fortune',
    styleOrPower: 'Carro Monstro Blindado com Gasolina Pressurizada',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Derrotado',
    quote: 'Parte 3 finalizada! O vencedor é ZZ com o Wheel of Fortune!',
    techniques: ['Wheel of Fortune', 'Disparo de Gasolina Pressurizada', 'Transformação Todo-Terreno']
  },
  {
    id: 'arabia-fats',
    name: 'Arabia Fats',
    fandomTitle: 'Arabia Fats',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO', 'Tarô Divinatório'],
    origin: 'Arábia Saudita',
    stand: 'The Sun',
    styleOrPower: 'Sol Artificial Escaldante e Raios Térmicos',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Derrotado',
    quote: 'Morram no calor de 70 graus do meu pequeno sol!',
    techniques: ['The Sun', 'Disparos de Energia Térmica', 'Camuflagem de Espelhos']
  },
  {
    id: 'mannish-boy',
    name: 'Mannish Boy',
    fandomTitle: 'Mannish Boy',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO', 'Tarô Divinatório'],
    origin: 'Egito',
    stand: 'Death Thirteen',
    styleOrPower: 'Parque dos Sonhos Macabro e Foice Dimensional',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Derrotado',
    quote: 'Lali-ho! No mundo dos sonhos, você não pode invocar o seu Stand!',
    techniques: ['Death Thirteen', 'Domínio Onírico', 'Manipulação Psíquica de Sonhos']
  },
  {
    id: 'cameo',
    name: 'Cameo',
    fandomTitle: 'Cameo',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO', 'Tarô Divinatório'],
    origin: 'Estados Unidos',
    stand: 'Judgement',
    styleOrPower: 'Gênio dos Desejos Moldado em Argila',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Derrotado',
    quote: 'HAIL 2 U! Seu desejo é uma ordem... com consequências fúnebres!',
    techniques: ['Judgement', 'Materialização em Argila', 'Criação de Clones Falsos']
  },
  {
    id: 'midler',
    name: 'Midler',
    fandomTitle: 'Midler',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de DIO', 'Tarô Divinatório'],
    origin: 'Egito',
    stand: 'High Priestess',
    styleOrPower: 'Mimetismo Mineral e Dentes Duros como Diamante',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Derrotado',
    quote: 'Toda a costa do Mar Vermelho é o meu rosto de pedra!',
    techniques: ['High Priestess', 'Fusão com Minerais e Metais', 'Mandíbula de Diamante']
  },
  {
    id: 'anubis',
    name: 'Anubis',
    fandomTitle: 'Anubis',
    gender: 'Sem Gênero',
    species: 'Usuário de Stand',
    affiliation: ['9 Deuses Egípcios da Glória', 'Assassinos de DIO'],
    origin: 'Egito Antigo',
    stand: 'Anubis',
    styleOrPower: 'Espada Amaldiçoada com Aprendizado e Corte Dimensional',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Derrotado',
    quote: 'Eu sou o Stand Anubis! Quanto mais você luta contra mim, mais rápido eu fico e memorizo seus golpes!',
    techniques: ['Anubis', 'Possessão de Portador', 'Adaptação e Corte Através de Objetos']
  },
  {
    id: 'nukesaku',
    name: 'Nukesaku',
    fandomTitle: 'Nukesaku',
    gender: 'Masculino',
    species: 'Vampiro',
    affiliation: ['Servos de DIO'],
    origin: 'Egito',
    stand: 'Nenhum',
    styleOrPower: 'Rosto Feminino Traseiro e Regeneração Fraca',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Morto',
    quote: 'Socorro, sou apenas uma moça indefesa... rá, enganei vocês!',
    techniques: ['Rosto Duplo Dissimulado', 'Regeneração Vampírica Menor']
  },
  {
    id: 'holy-kujo',
    name: 'Holy Kujo',
    fandomTitle: 'Holy Kujo',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Família Joestar'],
    origin: 'Japão',
    stand: 'Stand Desconhecido (Vinha Espinhosa)',
    styleOrPower: 'Vinhas Espinhosas com Flores',
    debutArc: 'Parte 3: Stardust Crusaders',
    status: 'Vivo',
    quote: 'Jotaro é um bom menino, ele só é um pouco tímido para demonstrar carinho.',
    techniques: ['Amor Maternal', 'Despertar Espiritual Involuntário']
  },

  // ==========================================
  // PARTE 4: DIAMOND IS UNBREAKABLE (9)
  // ==========================================
  {
    id: 'tamami-kobayashi',
    name: 'Tamami Kobayashi',
    fandomTitle: 'Tamami Kobayashi',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Moradores de Morioh', 'Aliados de Koichi'],
    origin: 'Japão',
    stand: 'The Lock',
    styleOrPower: 'Cadeados de Culpa Psicológica e Detecção de Mentiras',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'Se você sente um pingo de culpa no coração, meu cadeado pesará uma tonelada!',
    techniques: ['The Lock', 'Amplificação de Culpa', 'Indução de Suicídio por Desespero']
  },
  {
    id: 'toshikazu-hazamada',
    name: 'Toshikazu Hazamada',
    fandomTitle: 'Toshikazu Hazamada',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Moradores de Morioh'],
    origin: 'Japão',
    stand: 'Surface',
    styleOrPower: 'Boneco de Madeira Copiador e Controle Corporal',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'Quando meu Surface toca em você, ele copia seu rosto e comanda todos os seus movimentos!',
    techniques: ['Surface', 'Controle de Movimento Sincronizado', 'Cópia Facial e Vocal']
  },
  {
    id: 'anjuro-katagiri',
    name: 'Anjuro Katagiri (Angelo)',
    fandomTitle: 'Anjuro Katagiri',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Antagonistas'],
    origin: 'Japão',
    stand: 'Aqua Necklace',
    styleOrPower: 'Líquido Assassino Infiltrador em Vias Aéreas',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Incapacitado',
    quote: 'Eu sou o assassino Angelo! Ninguém escapa do meu Aqua Necklace dentro d água!',
    techniques: ['Aqua Necklace', 'Infiltração Interna em Fluídos', 'Fusão com Vapor de Água']
  },
  {
    id: 'shizuka-joestar',
    name: 'Shizuka Joestar',
    fandomTitle: 'Shizuka Joestar',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Família Joestar'],
    origin: 'Japão',
    stand: 'Achtung Baby',
    styleOrPower: 'Invisibilidade Pessoal e de Objetos ao Redor',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: '*Risadinhas e choro de bebê desaparecendo no ar*',
    techniques: ['Achtung Baby', 'Invisibilidade Reativa por Estresse', 'Transparência de Toque']
  },
  {
    id: 'yoshihiro-kira',
    name: 'Yoshihiro Kira',
    fandomTitle: 'Yoshihiro Kira',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Família Kira'],
    origin: 'Japão',
    stand: 'Atom Heart Father',
    styleOrPower: 'Fantasma Fotográfico com Manipulação Espacial',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Morto',
    quote: 'Eu protegerei meu querido Yoshikage para todo o sempre com a Flecha de Stand!',
    techniques: ['Atom Heart Father', 'Prisão Fotográfica de Realidade', 'Disparo da Flecha']
  },
  {
    id: 'ken-oyanagi',
    name: 'Ken Oyanagi',
    fandomTitle: 'Ken Oyanagi',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Moradores de Morioh'],
    origin: 'Japão',
    stand: 'Boy II Man',
    styleOrPower: 'Absorção Gradual de Stands através de Jokenpô',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'Janken-poi! Se eu vencer mais uma rodada, Heaven s Door será meu!',
    techniques: ['Boy II Man', 'Roubo de Energia Espiritual em 5 Rodadas', 'Buraco na Bochecha']
  },
  {
    id: 'toyohiro-kanedaichi',
    name: 'Toyohiro Kanedaichi',
    fandomTitle: 'Toyohiro Kanedaichi',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Moradores de Morioh'],
    origin: 'Japão',
    stand: 'Super Fly',
    styleOrPower: 'Torre Elétrica Prisão com Reflexão Total de Dano',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Vivo',
    quote: 'Qualquer energia ou soco disparado contra a torre é refletido na mesma intensidade!',
    techniques: ['Super Fly', 'Reflexão Cinética Perfeita', 'Metamorfose em Ferro']
  },
  {
    id: 'terunosuke-miyamoto',
    name: 'Terunosuke Miyamoto',
    fandomTitle: 'Terunosuke Miyamoto',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Antagonistas'],
    origin: 'Japão',
    stand: 'Enigma',
    styleOrPower: 'Selamento de Alvos e Objetos em Papel através do Medo',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Incapacitado',
    quote: 'Quando você demonstra seu tique nervoso de pavor, Enigma dobra você em papel!',
    techniques: ['Enigma', 'Aprisionamento em Papel Dobrado', 'Ocultação de Armas em Folhas']
  },
  {
    id: 'masazo-kinoto',
    name: 'Masazo Kinoto',
    fandomTitle: 'Masazo Kinoto',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Moradores de Morioh'],
    origin: 'Japão',
    stand: 'Cheap Trick',
    styleOrPower: 'Stand Parasita de Costas que Mata ao Ser Visto',
    debutArc: 'Parte 4: Diamond is Unbreakable',
    status: 'Morto',
    quote: 'Por favor, não olhe para as minhas costas! Nunca olhe para as minhas costas!',
    techniques: ['Cheap Trick', 'Fixação Espinhal', 'Sussurro Psicológico Incessante']
  },

  // ==========================================
  // PARTE 5: GOLDEN WIND (8)
  // ==========================================
  {
    id: 'polpo',
    name: 'Polpo',
    fandomTitle: 'Polpo',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione (Capos)'],
    origin: 'Itália',
    stand: 'Black Sabbath',
    styleOrPower: 'Stand das Sombras Automático com Flecha de Stand',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'A coisa mais importante no mundo não é o dinheiro, é a confiança entre irmãos de sangue.',
    techniques: ['Black Sabbath', 'Movimentação pelas Sombras', 'Perfuração de Alma com Flecha']
  },
  {
    id: 'mario-zucchero',
    name: 'Mario Zucchero',
    fandomTitle: 'Mario Zucchero',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione'],
    origin: 'Itália',
    stand: 'Soft Machine',
    styleOrPower: 'Esvaziamento e Desinflamento de Matéria com Florete',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Incapacitado',
    quote: 'Com meu florete, eu furo e desinflo você como uma bexiga de borracha!',
    techniques: ['Soft Machine', 'Desinflar Corpos e Barcos', 'Esconderijo sob Superfícies Desinfladas']
  },
  {
    id: 'sale',
    name: 'Sale',
    fandomTitle: 'Sale',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione'],
    origin: 'Itália',
    stand: 'Kraft Work',
    styleOrPower: 'Fixação Absoluta no Espaço e Acúmulo de Energia Cinética',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Incapacitado',
    quote: 'Kraft Work pode travar qualquer projétil no ar e dispará-lo com força multiplicada!',
    techniques: ['Kraft Work', 'Fixação Vetorial no Espaço', 'Tap-Tap de Acúmulo Cinético']
  },
  {
    id: 'squalo',
    name: 'Squalo',
    jojoWikiTitle: 'Squalo',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione (Guarda Especial)'],
    origin: 'Itália',
    stand: 'Clash',
    styleOrPower: 'Tubarão Teletransportador que Nada em Qualquer Líquido',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Tiziano! Deixe comigo, meu Clash vai arrancar a garganta deles em qualquer gota d água!',
    techniques: ['Clash', 'Salto entre Líquidos', 'Adaptação de Tamanho Conforme Volume']
  },
  {
    id: 'tiziano',
    name: 'Tiziano',
    jojoWikiTitle: 'Tizzano',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione (Guarda Especial)'],
    origin: 'Itália',
    stand: 'Talking Head',
    styleOrPower: 'Parasita Bucal que Força a Vítima a Mentir',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Squalo... confie no seu instinto! Meu Talking Head já causou discórdia entre eles!',
    techniques: ['Talking Head', 'Inversão Forçada da Verdade', 'Manipulação de Língua']
  },
  {
    id: 'carne',
    name: 'Carne',
    fandomTitle: 'Carne',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Passione (Guarda Especial)'],
    origin: 'Itália',
    stand: 'Notorious B.I.G.',
    styleOrPower: 'Monstro Imortal de Velocidade e Matéria Ativado Pós-Morte',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: '*Aproxima-se em silêncio com sorriso sádico para liberar seu Stand após a morte*',
    techniques: ['Notorious B.I.G.', 'Perseguição do Objeto Mais Rápido', 'Consumo Infinito de Matéria']
  },
  {
    id: 'scolippi',
    name: 'Scolippi',
    fandomTitle: 'Scolippi',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Civis de Nápoles'],
    origin: 'Itália',
    stand: 'Rolling Stones',
    styleOrPower: 'Escultura de Pedra Predestinada com Morte Indolor',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Vivo',
    quote: 'Nós somos todos escravos do destino... mas há significado em marchar para a frente.',
    techniques: ['Rolling Stones', 'Profecia da Morte Esculpida', 'Eutanásia Predestinada']
  },
  {
    id: 'pericolo',
    name: 'Pericolo',
    fandomTitle: 'Pericolo',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Passione (Capos)'],
    origin: 'Itália',
    stand: 'Nenhum',
    styleOrPower: 'Lealdade Absoluta à Passione',
    debutArc: 'Parte 5: Golden Wind',
    status: 'Morto',
    quote: 'Esta é a minha missão final em nome do Chefe. Queime esta chave após a leitura!',
    techniques: ['Segredo de Estado', 'Sacrifício por Lealdade']
  },

  // ==========================================
  // PARTE 6: STONE OCEAN (8)
  // ==========================================
  {
    id: 'gwess',
    name: 'Gwess',
    fandomTitle: 'Gwess',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Green Dolphin Street'],
    origin: 'Estados Unidos',
    stand: 'Goo Goo Dolls',
    styleOrPower: 'Encolhimento Corporal de Vítimas para Tamanho de Rato',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Vivo',
    quote: 'Você é o meu passarinho agora, Jolyne! Vai obedecer todas as minhas ordens!',
    techniques: ['Goo Goo Dolls', 'Redução de Escala Corporal', 'Fantasia de Animal']
  },
  {
    id: 'lang-rangler',
    name: 'Lang Rangler',
    fandomTitle: 'Lang Rangler',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Green Dolphin Street', 'Seguidores de Pucci'],
    origin: 'Estados Unidos',
    stand: 'Jumpin\' Jack Flash',
    styleOrPower: 'Vácuo e Gravidade Zero Absoluta por Contato',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Uma vez tocado pela minha saliva, todo o ar e gravidade ao seu redor desaparecem!',
    techniques: ['Jumpin\' Jack Flash', 'Gravidade Zero Progressiva', 'Disparo de Parafusos Centrífugos']
  },
  {
    id: 'viviano-westwood',
    name: 'Viviano Westwood',
    fandomTitle: 'Viviano Westwood',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Green Dolphin Street (Guardas)'],
    origin: 'Estados Unidos',
    stand: 'Planet Waves',
    styleOrPower: 'Atração Gravitacional de Meteoritos Incandescentes',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Incapacitado',
    quote: 'Eu sou o guarda mais casca-grossa daqui! Os próprios meteoros do espaço caem para me ajudar!',
    techniques: ['Planet Waves', 'Atração Balística de Meteoros', 'Luta Corpo a Corpo Brutal']
  },
  {
    id: 'kenzou',
    name: 'Kenzou',
    fandomTitle: 'Kenzou',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Green Dolphin Street (Culto)'],
    origin: 'Estados Unidos',
    stand: 'Dragon\'s Dream',
    styleOrPower: 'Bússola de Feng Shui e Ponto Cego Letal Neutro',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Derrotado',
    quote: 'O dragão nunca toma partido! Ele apenas aponta o ponto auspicioso de vitória inexorável!',
    techniques: ['Dragon\'s Dream', 'Leitura de Feng Shui Assassino', 'Golpes nos Pontos Vitais']
  },
  {
    id: 'd-an-g',
    name: 'D an G',
    fandomTitle: 'D an G',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Green Dolphin Street', 'Seguidores de Pucci'],
    origin: 'Estados Unidos',
    stand: 'Yo-Yo Ma',
    styleOrPower: 'Stand Automático Dissimulado com Saliva Ácida Tóxica',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Yo-Yo Ma é um Stand obediente que viaja com você... até derreter sua carne!',
    techniques: ['Yo-Yo Ma', 'Digestão Ácida Silenciosa', 'Stand Automático Indestrutível']
  },
  {
    id: 'guccio',
    name: 'Guccio',
    fandomTitle: 'Guccio',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Green Dolphin Street', 'Seguidores de Pucci'],
    origin: 'Estados Unidos',
    stand: 'Survivor',
    styleOrPower: 'Estímulo Elétrico que Libera Fúria Assassina Incontrolável',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Morto',
    quote: 'Pucci disse que meu Survivor é o Stand mais fraco do mundo... mas causa um massacre!',
    techniques: ['Survivor', 'Transmissão Elétrica em Água', 'Indução de Instinto Primitivo Assassino']
  },
  {
    id: 'miu-miu',
    name: 'Miu Miu (Miuccia Miuller)',
    fandomTitle: 'Miuccia Miuller',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Green Dolphin Street (Chefe de Guarda)'],
    origin: 'Estados Unidos',
    stand: 'Jail House Lock',
    styleOrPower: 'Amnésia Retrógrada Bloqueada em 3 Memórias Consecutivas',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Incapacitado',
    quote: 'Se você tentar memorizar um quarto fato, o primeiro é completamente deletado!',
    techniques: ['Jail House Lock', 'Restrição Mnemônica a 3 Fatos', 'Manipulação Psicológica']
  },
  {
    id: 'romeo-jisso',
    name: 'Romeo Jisso',
    fandomTitle: 'Romeo Jisso',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Civis de West Palm Beach'],
    origin: 'Estados Unidos',
    stand: 'Nenhum',
    styleOrPower: 'Nenhuma',
    debutArc: 'Parte 6: Stone Ocean',
    status: 'Vivo',
    quote: 'Jolyne, me desculpe! Meu pai tem muito dinheiro, você tem que assumir a culpa do volante!',
    techniques: ['Status Social e Riqueza', 'Apoio com Helicóptero Tardio']
  },

  // ==========================================
  // PARTE 7: STEEL BALL RUN (13)
  // ==========================================
  {
    id: 'sandman',
    name: 'Sandman (Soundman)',
    fandomTitle: 'Sandman',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Tribo Nativa Americana', 'Corredores da SBR'],
    origin: 'Estados Unidos',
    stand: 'In a Silent Way',
    styleOrPower: 'Solidificação de Efeitos Sonoros Físicos Letais',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Meu nome verdadeiro é Soundman. Eu corro com os sons da própria terra!',
    techniques: ['In a Silent Way', 'Solidificação Sonora', 'Velocidade Extrema a Pé']
  },
  {
    id: 'pocoloco',
    name: 'Pocoloco',
    fandomTitle: 'Pocoloco',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Corredores da SBR'],
    origin: 'Estados Unidos',
    stand: 'Hey Ya!',
    styleOrPower: 'Sorte Extrema de Um em Um Bilhão e Incentivo Moral',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Vivo',
    quote: 'Hey Ya! me disse que eu sou o cara mais sortudo do universo nos próximos dois meses!',
    techniques: ['Hey Ya!', 'Otimismo e Encorajamento', 'Sorte Cósmica Passiva']
  },
  {
    id: 'oyecomova',
    name: 'Oyecomova',
    fandomTitle: 'Oyecomova',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Terroristas de Nápoles'],
    origin: 'Itália',
    stand: 'Boku no Rhythm wo Kiitekure',
    styleOrPower: 'Colocação de Pinos Relógio Explosivos em Qualquer Matéria',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Ouça o meu ritmo! Qualquer coisa que eu toque vira uma bomba de relógio!',
    techniques: ['Boku no Rhythm wo Kiitekure', 'Pinos Explosivos', 'Detonação em Fumaça e Água']
  },
  {
    id: 'pork-pie-hat-kid',
    name: 'Pork Pie Hat Kid',
    fandomTitle: 'Pork Pie Hat Kid',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos do Presidente Valentine'],
    origin: 'Estados Unidos',
    stand: 'Wired',
    styleOrPower: 'Anzóis Dimensionais com Iscas através de Prato de Água',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Peguei uma mordida! Meu Wired pesca de qualquer lugar usando penas como isca!',
    techniques: ['Wired', 'Iscas Dimensionais', 'Pesca Aérea de Alvos']
  },
  {
    id: 'dr-ferdinand',
    name: 'Dr. Ferdinand',
    fandomTitle: 'Dr. Ferdinand',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Cientistas', 'Assassinos de Valentine'],
    origin: 'Estados Unidos',
    stand: 'Scary Monsters',
    styleOrPower: 'Metamorfose e Controle de Dinossauros Fósseis',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'O poder dos répteis extintos dominará esta nova era das trevas!',
    techniques: ['Scary Monsters Original', 'Infecção Dinossáurica', 'Camuflagem Fóssil']
  },
  {
    id: 'fritz-von-stroheim',
    name: 'Fritz von Stroheim',
    directUrl: 'https://static.wikia.nocookie.net/jjba/images/3/33/FVStroheim.png/revision/latest?cb=20150105043856',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Corredores da SBR', 'Terroristas'],
    origin: 'Alemanha',
    stand: 'Nenhum',
    styleOrPower: 'Metralhadora Embutida na Mão Mecânica',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'A tecnologia e o poder do ferro alemão conquistarão esta corrida!',
    techniques: ['Prótese Mecânica com Metralhadora', 'Montaria Veloz']
  },
  {
    id: 'eleven-men',
    name: 'Eleven Men',
    fandomTitle: 'Eleven Men',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos do Presidente Valentine'],
    origin: 'Estados Unidos',
    stand: 'Tattoo You!',
    styleOrPower: 'Teletransporte Sincronizado através de Tatuagens nas Costas',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Nós somos onze corpos que dividem a mesma tatuagem e os mesmos tiros!',
    techniques: ['Tattoo You!', 'Troca Corporal Instantânea', 'Fogo Cruzado com Revólveres']
  },
  {
    id: 'mike-o',
    name: 'Mike O.',
    fandomTitle: 'Mike O.',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Guarda Presidencial'],
    origin: 'Estados Unidos',
    stand: 'Tubular Bells',
    styleOrPower: 'Escultura de Balões Metálicos Explosivos com Fôlego',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Ao soprar através do metal, eu crio cães de balão que farejam sangue nas paredes!',
    techniques: ['Tubular Bells', 'Cães de Balão Metálico', 'Infiltração Cutânea Explosiva']
  },
  {
    id: 'magenta-magenta',
    name: 'Magenta Magenta',
    jojoWikiTitle: 'Magent Magent',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de Valentine', 'Dupla com Wekapipo'],
    origin: 'Estados Unidos',
    stand: '20th Century Boy',
    styleOrPower: 'Armadura de Invulnerabilidade Total com Redirecionamento ao Solo',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Incapacitado',
    quote: 'Enquanto eu mantiver meus joelhos no chão, nem mesmo uma dinamite arranha meu corpo!',
    techniques: ['20th Century Boy', 'Invulnerabilidade Absoluta', 'Deflexão de Dano para o Solo']
  },
  {
    id: 'axl-ro',
    name: 'Axl RO',
    fandomTitle: 'Axl RO',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de Valentine'],
    origin: 'Estados Unidos',
    stand: 'Civil War',
    styleOrPower: 'Materialização de Pecados, Culpas e Coisas Abandonadas',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Tudo o que você descartou ou se arrependeu voltará como um fantasma para esmagá-lo!',
    techniques: ['Civil War', 'Manifestação de Culpa e Pecado', 'Transferência Kármica de Morte']
  },
  {
    id: 'd-i-s-c-o',
    name: 'D-I-S-C-O',
    fandomTitle: 'D-I-S-C-O',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Assassinos de Valentine'],
    origin: 'Estados Unidos',
    stand: 'Chocolate Disco',
    styleOrPower: 'Grade Cartesiana de Coordenadas de Teletransporte Físico',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Derrotado',
    quote: 'Chocolate Disco... é só isso que você precisa ouvir.',
    techniques: ['Chocolate Disco', 'Grade Cartesiana de Impacto', 'Teletransporte de Ácido e Agulhas']
  },
  {
    id: 'scarlet-valentine',
    name: 'Scarlet Valentine',
    fandomTitle: 'Scarlet Valentine',
    gender: 'Feminino',
    species: 'Humano Comum',
    affiliation: ['Governo dos Estados Unidos'],
    origin: 'Estados Unidos',
    stand: 'Nenhum',
    styleOrPower: 'Influência da Primeira-Dama',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Eu sou a esposa do Presidente Funny Valentine, meu luxo e segredos não têm limites.',
    techniques: ['Intriga Política', 'Sedução e Conspiração']
  },
  {
    id: 'norisuke-higashikata-i',
    name: 'Norisuke Higashikata I',
    fandomTitle: 'Norisuke Higashikata I',
    gender: 'Masculino',
    species: 'Humano Comum',
    affiliation: ['Corredores da SBR', 'Família Higashikata'],
    origin: 'Japão',
    stand: 'Nenhum',
    styleOrPower: 'Dois Umbigos e Determinação Comercial',
    debutArc: 'Parte 7: Steel Ball Run',
    status: 'Morto',
    quote: 'Com meu segundo lugar na corrida, fundarei a maior empresa de frutas do Japão!',
    techniques: ['Montaria Resistente', 'Visão Empreendedora']
  },

  // ==========================================
  // PARTE 8: JOJOLION (15)
  // ==========================================
  {
    id: 'kei-nijimura',
    name: 'Kei Nijimura',
    fandomTitle: 'Kei Nijimura',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Família Higashikata', 'Família Kira'],
    origin: 'Japão',
    stand: 'Born This Way',
    styleOrPower: 'Motoqueiro Congelante Automático Ativado ao Abrir Portas',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'Eu sou a filha de Holy e irmã de Kira. Meu Born This Way persegue quem abre qualquer fechadura!',
    techniques: ['Born This Way', 'Nevasca e Rajadas Congelantes', 'Invocação ao Abrir Objetos']
  },
  {
    id: 'tsurugi-higashikata',
    name: 'Tsurugi Higashikata',
    fandomTitle: 'Tsurugi Higashikata',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Família Higashikata'],
    origin: 'Japão',
    stand: 'Paper Moon King',
    styleOrPower: 'Origamis Ilusionistas que Embaralham Rostos e Textos',
    debutArc: 'Parte 8: JoJolion',
    status: 'Vivo',
    quote: 'Com meu origami, você não reconhecerá a cara de ninguém nem saberá ler placas!',
    techniques: ['Paper Moon King', 'Distorção Perceptiva e Ilusão', 'Animar Dobraduras de Papel']
  },
  {
    id: 'mitsuba-higashikata',
    name: 'Mitsuba Higashikata',
    fandomTitle: 'Mitsuba Higashikata',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Família Higashikata'],
    origin: 'Japão',
    stand: 'Awaking III Leaves',
    styleOrPower: 'Vetores de Flechas que Empurram Força e Energia',
    debutArc: 'Parte 8: JoJolion',
    status: 'Vivo',
    quote: 'As flechas das minhas folhas empurram toda a gravidade e impacto para onde eu mandar!',
    techniques: ['Awaking III Leaves', 'Manipulação Vetorial', 'Defesa contra Pressão']
  },
  {
    id: 'holy-joestar-kira',
    name: 'Holy Joestar-Kira',
    fandomTitle: 'Holy Joestar-Kira',
    gender: 'Feminino',
    species: 'Humano Comum',
    affiliation: ['Família Joestar', 'Família Kira'],
    origin: 'Japão',
    stand: 'Nenhum',
    styleOrPower: 'Medicina e Oftalmologia',
    debutArc: 'Parte 8: JoJolion',
    status: 'Vivo',
    quote: 'Josefumi, Kira... protejam o fruto de Locacaca e salvem nossa família...',
    techniques: ['Medicina Avançada', 'Vínculo Materno']
  },
  {
    id: 'josefumi-kujo',
    name: 'Josefumi Kujo',
    fandomTitle: 'Josefumi Kujo',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Aliados de Kira', 'Família Joestar'],
    origin: 'Japão',
    stand: 'Soft & Wet',
    styleOrPower: 'Bolhas de Sabão com Propriedade de Plunder (Roubo Físico)',
    debutArc: 'Parte 8: JoJolion',
    status: 'Fundido',
    quote: 'Eu darei minha vida e comerei a fruta para salvar o Kira e retribuir a dona Holy!',
    techniques: ['Soft & Wet Original', 'Plunder de Propriedades', 'Enxerto da Nova Locacaca']
  },
  {
    id: 'yoshikage-kira-part-8',
    name: 'Yoshikage Kira (Parte 8)',
    fandomTitle: 'Yoshikage Kira (JoJolion)',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Família Joestar', 'Família Kira'],
    origin: 'Japão',
    stand: 'Killer Queen',
    styleOrPower: 'Bombas em Bolhas e Sheer Heart Attack Médico',
    debutArc: 'Parte 8: JoJolion',
    status: 'Fundido',
    quote: 'Eu sou um cirurgião naval. Nós vamos colher o fruto de Locacaca e curar minha mãe!',
    techniques: ['Killer Queen (Parte 8)', 'Sheer Heart Attack Direcionado', 'Bolhas Explosivas']
  },
  {
    id: 'karera-sakunami',
    name: 'Karera Sakunami',
    fandomTitle: 'Karera Sakunami',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['Amigos de Josefumi'],
    origin: 'Japão',
    stand: 'Love Love Deluxe',
    styleOrPower: 'Crescimento Espontâneo e Incendiário de Cabelos por Toque',
    debutArc: 'Parte 8: JoJolion',
    status: 'Vivo',
    quote: 'Josefumi! Eu finalmente te achei... mas você parece um pouco diferente agora, hein?',
    techniques: ['Love Love Deluxe', 'Germinação Rápida de Cabelo', 'Geração de Chamas com Cabelo']
  },
  {
    id: 'ojiro-sasame',
    name: 'Ojiro Sasame',
    fandomTitle: 'Ojiro Sasame',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Antagonistas'],
    origin: 'Japão',
    stand: 'Fun Fun Fun',
    styleOrPower: 'Controle Corporal de Vítimas Marcadas Posicionadas Abaixo Dele',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'Se você tiver quatro ferimentos nas pontas dos membros e ficar embaixo de mim, vira minha marionete!',
    techniques: ['Fun Fun Fun', 'Marionetismo Biológico', 'Surf e Agilidade']
  },
  {
    id: 'aisho-dainenjiyama',
    name: 'Aisho Dainenjiyama',
    fandomTitle: 'Aisho Dainenjiyama',
    gender: 'Masculino',
    species: 'Rocha Humana',
    affiliation: ['Organização de Locacaca (Homens de Pedra)'],
    origin: 'Japão',
    stand: 'Doobie Wah!',
    styleOrPower: 'Tornado Teleguiado Ativado pela Respiração do Alvo',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'Toda vez que você respira, meu Doobie Wah! localiza seus pulmões e gera um vórtice cortante!',
    techniques: ['Doobie Wah!', 'Tornado Teleguiado Respiratório', 'Fisiologia de Rocha Humana']
  },
  {
    id: 'a-phex-brothers',
    name: 'Irmãos A. Phex',
    fandomTitle: 'A. Phex Brothers',
    gender: 'Masculino',
    species: 'Rocha Humana',
    affiliation: ['Organização de Locacaca (Homens de Pedra)'],
    origin: 'Japão',
    stand: 'Schott Key No. 1 & No. 2',
    styleOrPower: 'Transmissão de Rocha pela Mão e Gás Tóxico em Bola de Futebol',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'Nós jogamos em equipe! Um passa a matéria pela mão e o outro chuta o gás venenoso!',
    techniques: ['Schott Key No. 1', 'Schott Key No. 2', 'Gás Corrosivo', 'Fisiologia de Rocha Humana']
  },
  {
    id: 'urban-guerrilla',
    name: 'Urban Guerrilla',
    fandomTitle: 'Urban Guerrilla',
    gender: 'Masculino',
    species: 'Rocha Humana',
    affiliation: ['Organização de Locacaca (Homens de Pedra)'],
    origin: 'Japão',
    stand: 'Brain Storm',
    styleOrPower: 'Micróbios Espinhosos de Stand que Derretem Tecido Humano',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'Meu Brain Storm penetra pelos poros da pele e liquefaz todas as suas células!',
    techniques: ['Brain Storm', 'Lise Celular Cutânea', 'Montaria no Mascote Doberman de Pedra Doremifasolati Do']
  },
  {
    id: 'poor-tom',
    name: 'Poor Tom',
    fandomTitle: 'Poor Tom',
    gender: 'Masculino',
    species: 'Rocha Humana',
    affiliation: ['Organização de Locacaca (Homens de Pedra)'],
    origin: 'Japão',
    stand: 'Ozon Baby',
    styleOrPower: 'Despressurização Mortal em Área Ativada por Casa de Brinquedo Enterrada',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'Ao enterrar minha casinha no pomar, Ozon Baby ferve seu sangue por despressurização!',
    techniques: ['Ozon Baby', 'Despressurização Atmosférica Mortal', 'Ilusões Corporais']
  },
  {
    id: 'wu-tomoki',
    name: 'Wu Tomoki',
    fandomTitle: 'Wu Tomoki',
    gender: 'Masculino',
    species: 'Rocha Humana',
    affiliation: ['Hospital Universitário TG', 'Homens de Pedra'],
    origin: 'Japão',
    stand: 'Doctor Wu',
    styleOrPower: 'Desintegração Corporal em Poeira de Silício Infiltradora',
    debutArc: 'Parte 8: JoJolion',
    status: 'Morto',
    quote: 'Wu Tomoki nunca falha. Meu corpo de pedra se desfaz em minúsculos grãos que invadem suas artérias!',
    techniques: ['Doctor Wu', 'Fragmentação Silicosa', 'Controle Interno de Órgãos Alheios']
  },
  {
    id: 'dolomite',
    name: 'Dolomite',
    fandomTitle: 'Dolomite',
    gender: 'Masculino',
    species: 'Rocha Humana',
    affiliation: ['Homens de Pedra'],
    origin: 'Japão',
    stand: 'Blue Hawaii',
    styleOrPower: 'Infecção Zumbi em Linha Reta por Contato Físico de Sangue/Saliva',
    debutArc: 'Parte 8: JoJolion',
    status: 'Incapacitado',
    quote: 'Qualquer um infectado pelo Blue Hawaii marchará em linha reta sem parar até tocar no Josuke!',
    techniques: ['Blue Hawaii', 'Zumbificação em Linha Reta Teleguiada', 'Sensação Térmica em Lagoa']
  },
  {
    id: 'satoru-akefu',
    name: 'Satoru Akefu',
    fandomTitle: 'Satoru Akefu',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['Hospital Universitário TG'],
    origin: 'Japão',
    stand: 'Wonder of U',
    styleOrPower: 'Fluxo de Calamidade Cósmica contra Perseguidores',
    debutArc: 'Parte 8: JoJolion',
    status: 'Destruído',
    quote: 'Você tem certeza de que deseja me perseguir? A própria ordem da calamidade cairá sobre você.',
    techniques: ['Wonder of U', 'Fluxo da Calamidade', 'Passagem através de Matéria Sólida']
  },

  // ==========================================
  // PARTE 9: THE JOJOLANDS (3)
  // ==========================================
  {
    id: 'lulu',
    name: 'Lulu',
    directUrl: 'https://static.jojowiki.com/images/thumb/5/5e/latest/20250223154816/Lulu_Infobox_Manga.png/800px-Lulu_Infobox_Manga.png',
    gender: 'Feminino',
    species: 'Usuário de Stand',
    affiliation: ['HOWLER Company'],
    origin: 'Estados Unidos',
    stand: 'Bags Groove',
    styleOrPower: 'Micro-Stands que Causam Aneurismas e Edemas Pulmonares',
    debutArc: 'Parte 9: The JOJOLands',
    status: 'Vivo',
    quote: 'Bags Groove entra pela sua respiração e entope suas artérias sem você nem perceber!',
    techniques: ['Bags Groove', 'Infiltração Vascular Microscópica', 'Indução de Aneurisma']
  },
  {
    id: 'ningbo',
    name: 'Ningbo',
    directUrl: 'https://static.jojowiki.com/images/thumb/7/7b/latest/20260318200533/Ningbo_Infobox_Manga.png/800px-Ningbo_Infobox_Manga.png',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['HOWLER Company'],
    origin: 'Estados Unidos',
    stand: 'King Amber',
    styleOrPower: 'Manipulação Geológica e Rocha Sob a Pele',
    debutArc: 'Parte 9: The JOJOLands',
    status: 'Morto',
    quote: 'Ningbo e King Amber protegem os segredos da HOWLER a qualquer custo!',
    techniques: ['King Amber', 'Cristalização Terrestre', 'Resistência Rochosa']
  },
  {
    id: 'acca-howler',
    name: 'Acca Howler',
    directUrl: 'https://static.jojowiki.com/images/9/9a/latest/20240418195823/HOWLERAv.png',
    gender: 'Masculino',
    species: 'Usuário de Stand',
    affiliation: ['HOWLER Company'],
    origin: 'Estados Unidos',
    stand: 'Stand Desconhecido',
    styleOrPower: 'Poder Financeiro e Conexão com Terras de Lava do Havaí',
    debutArc: 'Parte 9: The JOJOLands',
    status: 'Vivo',
    quote: 'As terras vulcânicas do Havaí e todos os títulos de valor pertencem à Howler Company.',
    techniques: ['Controle Corporativo de Infraestrutura', 'Influência Política Havaiana']
  }
];

async function fetchFandomImage(title) {
  try {
    const pageUrl = `https://jojo.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`;
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://jojo.fandom.com/'
      },
      signal: AbortSignal.timeout(6000)
    });
    if (!res.ok) return null;
    const data = await res.json();
    const page = Object.values(data?.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (err) {
    return null;
  }
}

async function fetchJojoWikiImage(title) {
  try {
    const pageUrl = `https://jojowiki.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`;
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://jojowiki.com/'
      },
      signal: AbortSignal.timeout(6000)
    });
    if (!res.ok) return null;
    const data = await res.json();
    const page = Object.values(data?.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (err) {
    return null;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function processImage(buffer, localImgPath) {
  const meta = await sharp(buffer).metadata();
  const width = meta.width;
  const height = meta.height;

  // Se a imagem for vertical (corpo inteiro ou 3/4), o rosto fica no terço superior.
  if (height > width * 1.15) {
    const size = Math.round(width * 0.95);
    const top = Math.round(height * 0.04);
    const left = Math.round((width - size) / 2);

    await sharp(buffer)
      .extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: Math.min(size, width),
        height: Math.min(size, height - top)
      })
      .resize(240, 240, { fit: 'cover' })
      .png({ quality: 90 })
      .toFile(localImgPath);
  } else {
    // Para imagens quadradas ou horizontais, foco central no rosto
    await sharp(buffer)
      .resize(240, 240, { fit: 'cover', position: 'center' })
      .png({ quality: 90 })
      .toFile(localImgPath);
  }
}

async function runExpansion() {
  console.log(`\n=== INICIANDO EXPANSÃO DE JOJO: ${NEW_JOJO_CHARACTERS.length} NOVOS PERSONAGENS ===\n`);

  for (let i = 0; i < NEW_JOJO_CHARACTERS.length; i++) {
    const item = NEW_JOJO_CHARACTERS[i];
    const localImgName = `${item.id}.png`;
    const localImgPath = path.join(avatarsDir, localImgName);

    console.log(`[${i + 1}/${NEW_JOJO_CHARACTERS.length}] Processando ${item.name} (${item.id})...`);

    const fileExists = fs.existsSync(localImgPath) && fs.statSync(localImgPath).size > 1000;

    if (!fileExists) {
      await sleep(250);

      let remoteUrl = item.directUrl || null;

      if (!remoteUrl && item.jojoWikiTitle) {
        remoteUrl = await fetchJojoWikiImage(item.jojoWikiTitle);
      }
      if (!remoteUrl && item.fandomTitle) {
        remoteUrl = await fetchFandomImage(item.fandomTitle);
      }
      if (!remoteUrl) {
        remoteUrl = await fetchFandomImage(item.name);
      }
      if (!remoteUrl) {
        remoteUrl = await fetchJojoWikiImage(item.name);
      }

      if (remoteUrl) {
        try {
          const referer = remoteUrl.includes('jojowiki.com') ? 'https://jojowiki.com/' : 'https://jojo.fandom.com/';
          const imgRes = await fetch(remoteUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Referer': referer
            },
            signal: AbortSignal.timeout(8000)
          });

          if (imgRes.ok) {
            const buffer = Buffer.from(await imgRes.arrayBuffer());
            await processImage(buffer, localImgPath);
            console.log(`   ✓ Avatar salvo: ${localImgName}`);
          } else {
            console.warn(`   ⚠️ Erro HTTP ao baixar: ${imgRes.status}`);
          }
        } catch (err) {
          console.warn(`   ⚠️ Falha ao salvar imagem local: ${err.message}`);
        }
      } else {
        console.warn(`   ❌ Imagem remota não encontrada para: ${item.name}`);
      }
    } else {
      console.log(`   ✓ Avatar já existe localmente.`);
    }
  }

  // Agora vamos mesclar com a base existente de 111 personagens
  const charactersJsonPath = path.join(dataDir, 'characters.json');
  const existingCharacters = JSON.parse(fs.readFileSync(charactersJsonPath, 'utf8'));

  const existingIds = new Set(existingCharacters.map(c => c.id));
  const charactersToAdd = [];

  for (const item of NEW_JOJO_CHARACTERS) {
    if (existingIds.has(item.id)) {
      console.warn(`Aviso: ID duplicado encontrado: ${item.id}, pulando inclusão.`);
      continue;
    }

    const { fandomTitle, jojoWikiTitle, directUrl, ...charData } = item;
    charactersToAdd.push({
      ...charData,
      avatar: `/avatars/jojos-bizarre-adventure/${item.id}.png`
    });
  }

  const merged = [...existingCharacters, ...charactersToAdd];
  fs.writeFileSync(charactersJsonPath, JSON.stringify(merged, null, 2), 'utf8');

  console.log(`\n🎉 SUCESSO! Base atualizada de ${existingCharacters.length} para ${merged.length} personagens em ${charactersJsonPath}!\n`);
}

runExpansion();
