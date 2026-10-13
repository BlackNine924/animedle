import React, { useState } from 'react';
import { X, Check, Minus, Film, Eye, Flame, Award, HelpCircle, BookOpen, Sparkles } from 'lucide-react';
import { GameMode, AnimeConfig } from '../types/anime';

interface HowToPlayModalProps {
  onClose: () => void;
  currentMode?: GameMode;
  currentAnimeSlug?: string;
  animeConfig?: AnimeConfig;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  onClose,
  currentMode = 'classic',
  currentAnimeSlug = 'one-piece',
  animeConfig
}) => {
  const [activeTab, setActiveTab] = useState<'current' | 'anime' | 'colors' | 'all-modes'>('current');

  const modeDescriptions: Record<string, { title: string; subtitle: string; icon: string; rules: string[]; tips: string }> = {
    classic: {
      title: 'Modo Clássico (Grid de Atributos)',
      subtitle: 'Descubra o personagem misterioso pelas características!',
      icon: '🎯',
      rules: [
        'A cada palpite, os atributos do seu personagem são comparados com os do personagem secreto.',
        'Verde indica acerto exato, Amarelo indica correspondência parcial ou proximidade cronológica de arco/ano, e Vermelho indica erro.',
        'Em One Piece, a coluna Akuma no Mi compara a categoria da fruta: Logia, Paramecia, Zoan ou "Nenhum" (não usuário).',
        'Pistas adicionais são liberadas a cada número fixo de tentativas erradas (ou podem ser ocultadas clicando no botão de olho).'
      ],
      tips: 'Comece com personagens centrais de sagas intermediárias para eliminar várias afiliações e épocas de uma vez!'
    },
    wanted: {
      title: 'Modo Procurado (Silhueta Obscura)',
      subtitle: 'Identifique o personagem observando a silhueta misteriosa!',
      icon: '👤',
      rules: [
        'O personagem secreto está oculto sob uma silhueta de sombra escura.',
        'A cada erro, o nível de contraste, iluminação e bordas da imagem é gradualmente revelado.',
        'Você pode usar os palpites para testar o formato do cabelo, chapéus, armas ou roupas características.',
        'Restam 8 chances no total antes da derrota.'
      ],
      tips: 'Preste atenção nos contornos de acessórios, armas, orelhas, chapéus e silhueta do cabelo!'
    },
    ability: {
      title: 'Modo Exclusivo por Anime (Habilidades & Temas)',
      subtitle: 'Minigames temáticos com mecânicas únicas do universo!',
      icon: '⚡',
      rules: [
        'One Piece: Adivinhe a Recompensa em Berries (com pistas de Tripulação, Akuma no Mi e Status).',
        'Jujutsu Kaisen: Classificação de Xamã / Maldição e Energia Amaldiçoada.',
        'Naruto: Vilas Ocultas, Classificação Ninja e Técnicas Secretas.',
        'Ao gastar pontos nas dicas, mudar para o modo infinito e voltar ao diário, as dicas e pontos continuam salvos!'
      ],
      tips: 'Economize pontos nas pistas mais óbvias para garantir a pontuação máxima de 1000 pontos!'
    },
    scene: {
      title: 'Modo Cenas Animadas',
      subtitle: 'Adivinhe quem está na cena animada!',
      icon: '🎬',
      rules: [
        'Um clipe animado oficial em tomada única contínua é exibido em loop.',
        'O clipe retrata exclusivamente o personagem secreto executando uma ação ou golpe clássico.',
        'Identifique o personagem a partir da fluidez, cenário, efeitos visuais ou postura de combate.'
      ],
      tips: 'Observe as cores da aura, o estilo de animação de cada saga e a arma empunhada na tomada contínua.'
    },
    zoom: {
      title: 'Modo Zoom (Olhos & Detalhes)',
      subtitle: 'Adivinhe pela foto em aproximação extrema!',
      icon: '🔍',
      rules: [
        'A foto oficial do personagem começa com um zoom extremo (macro de um olho, detalhe facial ou acessório).',
        'A cada palpite incorreto, o campo de visão se afasta progressivamente (10x -> 8x -> 6x -> 4x -> 2.5x -> 1.5x -> 1x).',
        'Ao atingir o zoom 1x, você terá apenas 3 chances finais antes de ser derrotado!'
      ],
      tips: 'Cicatrizes, íris coloridas, formato das sobrancelhas e sombras na pele são as melhores pistas nos primeiros palpites.'
    },
    grid: {
      title: 'Modo Grid 3x3 (Cruzadinha de Animes)',
      subtitle: 'Encontre personagens que satisfaçam a interseção das duas categorias!',
      icon: '🧩',
      rules: [
        'Preencha cada uma das 9 células com um personagem que atenda simultaneamente aos critérios da linha e da coluna.',
        'Você tem 9 palpites ao todo — cada erro consome uma chance.',
        'Personagens mais raros concedem maior pontuação de raridade!'
      ],
      tips: 'Pense em personagens secundários ou menos óbvios para maximizar o percentual de raridade.'
    }
  };

  const currentModeInfo = modeDescriptions[currentMode] || modeDescriptions.classic;
  const animeTitle = animeConfig?.title || 'Anime';
  const themeColor = animeConfig?.themeColor || '#e11d48';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative text-left max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#202b43]">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{currentModeInfo.icon}</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                Como Jogar — <span style={{ color: themeColor }}>{animeTitle}</span>
              </h2>
              <p className="text-[11px] text-slate-400">Guia de regras e feedback do jogo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#111a2d] border border-transparent hover:border-[#202b43] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs de Navegação */}
        <div className="flex items-center gap-1.5 pt-3 pb-2 border-b border-[#202b43]/60 overflow-x-auto scrollbar-none text-xs font-bold">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'current'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles size={13} />
            <span>Modo Atual ({currentMode.toUpperCase()})</span>
          </button>

          <button
            onClick={() => setActiveTab('anime')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'anime'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen size={13} />
            <span>Regras de {animeTitle}</span>
          </button>

          <button
            onClick={() => setActiveTab('colors')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'colors'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Check size={13} />
            <span>Cores & Feedback</span>
          </button>

          <button
            onClick={() => setActiveTab('all-modes')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'all-modes'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <HelpCircle size={13} />
            <span>Todos os Modos</span>
          </button>
        </div>

        {/* Conteúdo Dinâmico */}
        <div className="my-3 space-y-4 text-xs text-slate-300 leading-relaxed overflow-y-auto pr-1 flex-1">
          {activeTab === 'current' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="p-3.5 bg-[#111a2d] border border-[#202b43] rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5 text-white font-extrabold text-sm">
                  <span>{currentModeInfo.icon}</span>
                  <span>{currentModeInfo.title}</span>
                </div>
                <p className="text-slate-300 text-xs mb-3 font-medium">
                  {currentModeInfo.subtitle}
                </p>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">
                    Como Funciona:
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                    {currentModeInfo.rules.map((rule, idx) => (
                      <li key={idx} className="leading-snug">
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#202b43]/60 flex items-start gap-2 text-amber-300 text-[11px] font-medium bg-amber-950/20 p-2.5 rounded-xl border border-amber-900/30">
                  <span className="text-sm">💡</span>
                  <span><strong>Dica Estratégica:</strong> {currentModeInfo.tips}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'anime' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="p-3.5 bg-[#111a2d] border border-[#202b43] rounded-2xl">
                <h3 className="text-sm font-extrabold text-white mb-2 flex items-center gap-2">
                  <span>⚓</span> Regras Específicas de {animeTitle}
                </h3>
                {currentAnimeSlug === 'one-piece' ? (
                  <div className="space-y-2.5 text-slate-300">
                    <p>
                      Em <strong>One Piece</strong>, os personagens possuem atributos de grande precisão canônica:
                    </p>
                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-[#202b43] space-y-1.5">
                      <strong className="text-amber-400 block font-bold text-xs">Fruta / Akuma no Mi:</strong>
                      <span className="text-slate-400 text-[11px] block">
                        Compara exclusivamente a categoria de fruto do diabo (<strong>Logia, Paramecia, Zoan, Zoan Ancestral, Zoan Mítica</strong> ou <strong>Nenhum</strong>).
                      </span>
                      <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                        <li>Se o personagem secreto tiver fruta e você chutar alguém sem fruta (Nenhum), fica <span className="text-rose-400 font-bold">Vermelho</span>.</li>
                        <li>Se você chutar alguém com outro tipo de fruta (ex: Paramecia vs Logia), fica <span className="text-amber-400 font-bold">Amarelo</span> (Parcial).</li>
                        <li>Se acertar o tipo exato (ex: Logia vs Logia), fica <span className="text-emerald-400 font-bold">Verde</span>.</li>
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-[#202b43] space-y-1">
                      <strong className="text-sky-400 block font-bold text-xs">Saga de Estreia:</strong>
                      <span className="text-slate-400 text-[11px] block">
                        Indica o arco em que o personagem fez sua primeira aparição na história (ex: Punk Hazard, Dressrosa, Water 7, Wano). Setas indicam se o personagem secreto estreou antes (⬆️) ou depois (⬇️).
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-[#202b43] space-y-1">
                      <strong className="text-emerald-400 block font-bold text-xs">Afiliações & Facções:</strong>
                      <span className="text-slate-400 text-[11px] block">
                        Compara tripulações piratas, Marinha, Governo Mundial, Exército Revolucionário ou reinos.
                      </span>
                    </div>
                  </div>
                ) : currentAnimeSlug === 'naruto' ? (
                  <div className="space-y-2.5 text-slate-300">
                    <p>
                      Em <strong>Naruto</strong>, as colunas analisam a linhagem e estilo do shinobi:
                    </p>
                    <ul className="space-y-1.5 text-[11px] list-disc list-inside">
                      <li><strong>Vila / Origem:</strong> Konohagakure, Sunagakure, Kirigakure, Akatsuki, etc.</li>
                      <li><strong>Kekkei Genkai:</strong> Sharingan, Byakugan, Rinnegan, Estilo Madeira ou "Nenhum".</li>
                      <li><strong>Natureza de Chakra:</strong> Fogo, Vento, Relâmpago, Terra, Água, Yin/Yang.</li>
                      <li><strong>Classificação Ninja:</strong> Genin, Chuunin, Jounin, Kage, Nukenin.</li>
                    </ul>
                  </div>
                ) : currentAnimeSlug === 'jujutsu-kaisen' ? (
                  <div className="space-y-2.5 text-slate-300">
                    <p>
                      Em <strong>Jujutsu Kaisen</strong>, o sistema avalia o nível e manipulação de energia:
                    </p>
                    <ul className="space-y-1.5 text-[11px] list-disc list-inside">
                      <li><strong>Grau de Feiticeiro / Maldição:</strong> Grau Especial, 1º Grau, Semi-1º Grau, 2º Grau, etc.</li>
                      <li><strong>Afiliação:</strong> Escola Técnica de Tóquio, Kyoto, Grupo de Geto, Usuários de Maldição.</li>
                      <li><strong>Técnica Inata & Domínio:</strong> Presença de expansão de domínio e natureza do feitiço.</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2 text-slate-300">
                    <p>
                      Neste anime, cada personagem é catalogado com suas afiliações canônicas, arcos de estreia, status de vida e poderes marcantes.
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      Use as dicas liberadas após tentativas para filtrar rapidamente opções!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-2.5 animate-fadeIn">
              <h4 className="font-extrabold text-slate-200 uppercase tracking-wider text-[10px]">
                Legenda de Cores de Palpite
              </h4>

              <div className="flex items-center gap-3 p-3 bg-[#111a2d] border border-emerald-500/40 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center flex-shrink-0 font-extrabold">
                  <Check size={16} />
                </div>
                <div>
                  <strong className="text-emerald-400 block text-xs font-bold">Verde (Correspondência Exata)</strong>
                  <span className="text-[11px] text-slate-400">O atributo do palpite bate 100% com o personagem secreto.</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#111a2d] border border-amber-500/40 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/50 flex items-center justify-center flex-shrink-0 font-extrabold">
                  <Minus size={16} />
                </div>
                <div>
                  <strong className="text-amber-400 block text-xs font-bold">Amarelo (Correspondência Parcial / Setas)</strong>
                  <span className="text-[11px] text-slate-400">
                    Sobreposição parcial (ex: mesma categoria geral de fruto/poder, ou uma das múltiplas afiliações bate), ou indicação direcional de arco (estreou antes ⬆️ ou depois ⬇️).
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#111a2d] border border-rose-900/40 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center flex-shrink-0 font-extrabold">
                  <X size={16} />
                </div>
                <div>
                  <strong className="text-rose-400 block text-xs font-bold">Vermelho (Sem Correspondência)</strong>
                  <span className="text-[11px] text-slate-400">O atributo do palpite é completamente diferente do personagem secreto.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'all-modes' && (
            <div className="space-y-2.5 animate-fadeIn">
              {(Object.keys(modeDescriptions) as GameMode[]).map((modeKey) => {
                const info = modeDescriptions[modeKey];
                const isSelected = modeKey === currentMode;
                return (
                  <div
                    key={modeKey}
                    className={`p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-rose-950/25 border-rose-500/50'
                        : 'bg-[#111a2d]/60 border-[#202b43]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{info.icon}</span>
                      <strong className="text-white text-xs font-bold">{info.title}</strong>
                      {isSelected && (
                        <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase font-black">
                          Atual
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">{info.subtitle}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#202b43] mt-auto">
          <button
            onClick={onClose}
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-rose-950/30 active:scale-98"
          >
            Entendido, Continuar Jogando!
          </button>
        </div>
      </div>
    </div>
  );
};
