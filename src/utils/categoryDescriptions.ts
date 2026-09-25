export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Personagem': 'Identificação e avatar do personagem palpitado.',
  'Gênero': 'Gênero biológico ou identidade do personagem (Masculino ou Feminino).',
  'Espécie': 'Espécie do personagem (ex: Humano ou Oni).',
  'Raça / Espécie': 'Raça, linhagem ou espécie biológica do personagem (ex: Humano, Tritão, Gigante, Lunarier, Ciborgue).',
  'Origem / Natureza': 'Natureza biológica ou espiritual do ser (ex: Humano Desperto, Sombra, Monarca, Governante, Besta Mágica).',
  'Afiliação': 'Grupo, organização ou facção à qual o personagem pertence (ex: Caçadores de Onis, Doze Luas Demoníacas, Escola Jujutsu).',
  'Bando / Afiliação': 'Tripulação pirata, frota, organização, marinha ou facção a que o personagem é filiado.',
  'Vila / Clã': 'Vila oculta de origem, clã ninja ou organização a qual pertence (ex: Konohagakure, Uchiha, Akatsuki).',
  'Guilda / Grupo': 'Guilda de caçadores, comitê ou facção a que pertence (ex: Guilda Ahjin, Hunters, Monarcas).',
  'Lado / Facção': 'Facção representada pelo personagem no torneio do Ragnarok (Humanidade ou Deuses).',
  'Panteão / Origem': 'Panteão mitológico, religião divina ou nacionalidade histórica do combatente (ex: Nórdico, Grego, História Humana).',
  'Arma Divina / Völundr': 'Arma divina empunhada por um deus ou Völundr formado pela fusão com uma Valquíria.',
  'Rodada / Função': 'Rodada específica do torneio em que combateu ou seu papel no evento (ex: Lutador, Valquíria, Árbitro).',
  'Grau': 'Classificação oficial de graduação e força do xamã ou espírito amaldiçoado (ex: Grau Especial, Grau 1, Grau 2).',
  'Era / Origem': 'Período histórico ou época em que o personagem viveu ou se originou (ex: Era Moderna, Era Heian).',
  'Tipo de Técnica': 'Classificação do poder amaldiçoado (ex: Técnica Inata, Técnica Herdada, Sem Técnica).',
  'Técnica Amaldiçoada': 'Nome da técnica amaldiçoada principal ou habilidade inata característica do xamã/maldição.',
  'Respiração / Arte': 'Estilo de Respiração do Caçador ou Arte Demoníaca de Sangue (Kekkijutsu) do Oni.',
  'Akuma no Mi': 'Fruta do Diabo consumida pelo personagem, detalhando seu nome e classe (Paramecia, Zoan, Logia).',
  'Técnica / Habilidade': 'Principal estilo de luta corporal, técnica marcial, feitiço ou poder sobrenatural divino.',
  'Especialidade': 'Classe de combate de caçador ou poder primordial exercido (ex: Mago, Assassino, Necromancia, Espadachim).',
  'Tipos de Natureza': 'Transformações da natureza básica ou avançada de chakra dominadas (Fogo, Vento, Raio, Terra, Água, Yin/Yang).',
  'Tipos de Jutsu': 'Categorias e disciplinas de jutsus dominadas pelo ninja (Ninjutsu, Taijutsu, Genjutsu, Fuinjutsu, Senjutsu).',
  'Kekkei Genkai': 'Habilidade genética hereditária rara transmitida na linhagem sanguínea (ex: Sharingan, Byakugan, Mokuton).',
  'Atributos': 'Títulos de grande relevância, cargos e condições especiais do ninja (ex: Kage, Jinchuuriki, Sannin, ANBU).',
  'Tipo de Haki': 'Tipos e avanços de Haki despertados (Armamento, Observação, Conquistador ou Nenhum).',
  'Recompensa (Berries)': 'Valor da recompensa estipulada pela Marinha e Governo Mundial por sua captura, em Berries (฿).',
  'Rank / Título': 'Classificação de poder atribuída pela Associação de Caçadores (ex: Rank S, Rank Nacional, Rank A, Monarca).',
  'Nacionalidade / Dimensão': 'País de origem na Terra ou dimensão espacial de procedência do ser.',
  'Arco de Estreia': 'Primeiro arco da história em que o personagem faz sua aparição canônica inicial.',
  'Saga de Estreia': 'Saga principal da narrativa em que o personagem é introduzido pela primeira vez.',
  'Status': 'Condição vital do personagem no momento canônico atual da narrativa (ex: Vivo, Morto, Preso, Selado).',
  'Status Final': 'Condição vital do personagem ao final de sua participação ou término da história (Vivo ou Morto).'
};

export function getCategoryDescription(label: string): string {
  return CATEGORY_DESCRIPTIONS[label] || `Explicação sobre a categoria ${label}.`;
}
