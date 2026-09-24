const fs = require('fs');
const path = 'src/data/animes/one-piece/characters.json';
const chars = JSON.parse(fs.readFileSync(path, 'utf8'));

// Strictly iconic quotes for One Piece
const STRICTLY_ICONIC_QUOTES = {
  'monkey-d-luffy': 'Eu vou ser o Rei dos Piratas!',
  'nico-robin': 'Eu quero viver!',
  'roronoa-zoro': 'Nada aconteceu...',
  'franky': 'SUUUUPER!',
  'sanji': 'A cozinha é sagrada!',
  'tony-tony-chopper': 'Elogios não me deixam feliz, seu idiota!',
  'nami': 'Eu vou desenhar um mapa de todo o mundo!',
  'usopp': 'Eu sou o Capitão Usopp!',
  'brook': 'Poderia me mostrar sua calcinha?',
  'jinbe': 'Eu sou um homem que deseja servir o futuro Rei dos Piratas!',
  'buggy': 'Eu sou o lendário Capitão Buggy, Gyahahaha!',
  'nefertari-vivi': 'Se nos reencontrarmos um dia, vocês ainda me chamarão de companheira?',
  'shanks': 'Não perdoo ninguém que machuque meus amigos!',
  'enel': 'Eu sou o Deus!',
  'dracule-mihawk': 'Descubra seu verdadeiro eu, torne-se forte!',
  'portgas-d-ace': 'Obrigado por me amarem!',
  'crocodile': 'Confiança é a palavra mais inútil deste mundo.',
  'edward-newgate-barba-branca': 'O One Piece é real!',
  'kuzan': 'Justiça Preguiçosa.',
  'donquixote-doflamingo': 'Os vencedores ditarão o que é a justiça!',
  'rob-lucci': 'Minha única motivação é a matança em nome da Justiça.',
  'bartholomew-kuma': 'Se você fosse fazer uma viagem... para onde gostaria de ir?',
  'garp': 'Punho do Amor!',
  'boa-hancock': 'Eu serei perdoada porque sou linda!',
  'silvers-rayleigh': 'Existir neste mundo significa viver sem se arrepender de nada.',
  'borsalino': 'Você já levou um chute na velocidade da luz?',
  'charlotte-katakuri': 'Eu não acho que você seja inferior a mim.',
  'charlotte-linlin': 'Ma-ma-ma-ma! Vida ou Licença?!',
  'kaidou': 'A força das armas é tudo o que importa no mundo!',
  'yamato': 'Eu sou Kozuki Oden! E eu vou proteger este país!',
  'kozuki-oden': 'Eu sou Oden! E eu nasci para ferver!',
  'kozuki-momonosuke': 'Meu nome é Kozuki Momonosuke! O homem que se tornará o Xogum de Wano!',
  'sabo': 'Se o Luffy precisar de mim, estarei lá em qualquer lugar do mundo!',
  'emporio-ivankov': 'Milagres só acontecem para aqueles que nunca desistem!',
  'corazon': 'Eu te amo, Law!',
  'kuina': 'Zoro, prometemos! Um de nós se tornará o maior espadachim do mundo!',
  'sakazuki': 'A justiça absoluta não tolera o mal!'
};

chars.forEach(c => {
  if (STRICTLY_ICONIC_QUOTES[c.id]) {
    c.quote = STRICTLY_ICONIC_QUOTES[c.id];
  } else {
    c.quote = '';
  }
});

fs.writeFileSync(path, JSON.stringify(chars, null, 2));
console.log(`Saved ${Object.keys(STRICTLY_ICONIC_QUOTES).length} strictly iconic quotes! Remaining characters cleared from quote mode.`);
