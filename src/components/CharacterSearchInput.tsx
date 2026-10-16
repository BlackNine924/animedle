import React, { useState, useRef, useEffect } from 'react';
import { Character } from '../types/anime';
import { Search, Send, X } from 'lucide-react';
import { filterAndRankCharacters } from '../utils/characterSearch';

interface CharacterSearchInputProps {
  characters: Character[];
  guessedCharacterIds: string[];
  onSelectCharacter: (character: Character) => void;
  disabled?: boolean;
  themeColor?: string;
}

export const CharacterSearchInput: React.FC<CharacterSearchInputProps> = ({
  characters,
  guessedCharacterIds,
  onSelectCharacter,
  disabled = false,
  themeColor = '#dc2626',
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Garante que a lista de personagens esteja sempre ordenada em ordem alfabética (A-Z)
  const sortedCharacters = [...characters].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR')
  );

  // Filtra os personagens que ainda não foram palpitados
  const availableCharacters = sortedCharacters.filter(
    (c) => !guessedCharacterIds.includes(c.id)
  );

  // Busca inteligente com tolerância a erros (Levenshtein) e apelidos
  const filteredCharacters = filterAndRankCharacters(availableCharacters, query);

  // Fecha a lista ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reseta o item selecionado por teclado quando a consulta muda
  useEffect(() => {
    setSelectedIndex(-1);
    itemRefs.current = [];
  }, [query]);

  // Rola suavemente para o item ativo quando navega com setas do teclado
  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const handleSelect = (character: Character) => {
    onSelectCharacter(character);
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setQuery('');
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setSelectedIndex(0);
        return;
      }
      if (filteredCharacters.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filteredCharacters.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setSelectedIndex(filteredCharacters.length - 1);
        return;
      }
      if (filteredCharacters.length > 0) {
        setSelectedIndex((prev) =>
          prev <= 0 ? filteredCharacters.length - 1 : prev - 1
        );
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCharacters.length > 0) {
        const target =
          selectedIndex >= 0 && selectedIndex < filteredCharacters.length
            ? filteredCharacters[selectedIndex]
            : filteredCharacters[0];
        handleSelect(target);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto my-6 z-40" ref={dropdownRef}>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center justify-center">
          <Search size={18} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          disabled={disabled}
          placeholder={disabled ? "Você já adivinhou o personagem de hoje!" : "Pesquisar personagem por nome, apelido..."}
          className="w-full bg-[#0d1426] border border-[#202b43] focus:border-amber-500/60 rounded-2xl py-3.5 pl-11 pr-24 text-sm text-[#F5F7FF] placeholder-slate-500 outline-none transition-all shadow-lg shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {/* Botão de limpeza rápida (X) e Confirmação */}
        <div className="absolute right-2.5 flex items-center gap-1.5">
          {query.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-[#1a253c] transition-colors active:scale-90"
              title="Limpar pesquisa (X)"
            >
              <X size={16} />
            </button>
          )}

          {query.trim() !== '' && filteredCharacters.length > 0 && (
            <button
              type="button"
              onClick={() => {
                const target =
                  selectedIndex >= 0 && selectedIndex < filteredCharacters.length
                    ? filteredCharacters[selectedIndex]
                    : filteredCharacters[0];
                handleSelect(target);
              }}
              disabled={disabled}
              style={{ backgroundColor: themeColor }}
              className="p-2 text-white rounded-xl transition-all shadow-md active:scale-95 hover:opacity-90 flex items-center justify-center"
              title="Confirmar Palpite (Enter)"
            >
              <Send size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown List com Navegação Iluminada */}
      {isOpen && filteredCharacters.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-[#0d1426] border border-[#202b43] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] max-h-72 overflow-y-auto custom-scrollbar divide-y divide-[#202b43]/50 z-[9999] animate-fadeIn">
          {filteredCharacters.map((character, idx) => {
            const isHighlighted = idx === selectedIndex;
            return (
              <button
                key={character.id}
                ref={(el) => { itemRefs.current[idx] = el; }}
                onClick={() => handleSelect(character)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center gap-3 p-3 text-left transition-all group ${
                  isHighlighted
                    ? 'bg-[#16233d] border-l-4 border-l-amber-400 shadow-[inset_0_0_12px_rgba(245,158,11,0.15)]'
                    : 'hover:bg-[#111a2d] border-l-4 border-l-transparent'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full bg-[#111a2d] border overflow-hidden flex-shrink-0 flex items-center justify-center shadow-sm transition-transform ${
                    isHighlighted ? 'border-amber-400/80 scale-105' : 'border-[#202b43]'
                  }`}
                >
                  {character.avatar ? (
                    <img src={character.avatar} alt={character.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-slate-400">{character.name[0]}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-bold transition-colors truncate ${
                      isHighlighted ? 'text-amber-300' : 'text-[#F5F7FF]'
                    }`}
                  >
                    {character.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {isOpen && query.trim() !== '' && filteredCharacters.length === 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-[#0d1426] border border-[#202b43] rounded-2xl p-4 text-center text-xs text-slate-400 shadow-xl">
          Nenhum personagem encontrado com "{query}"
        </div>
      )}
    </div>
  );
};

