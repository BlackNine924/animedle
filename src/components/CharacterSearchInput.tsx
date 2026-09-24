import React, { useState, useRef, useEffect } from 'react';
import { Character } from '../types/anime';
import { Search, Send } from 'lucide-react';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Garante que a lista de personagens esteja sempre ordenada em ordem alfabética (A-Z)
  const sortedCharacters = [...characters].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR')
  );

  // Filtra os personagens que ainda não foram palpitados
  const availableCharacters = sortedCharacters.filter(
    (c) => !guessedCharacterIds.includes(c.id)
  );

  const filteredCharacters = query.trim() === ''
    ? availableCharacters
    : availableCharacters.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      );

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

  const handleSelect = (character: Character) => {
    onSelectCharacter(character);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative max-w-2xl mx-auto my-6 z-40" ref={dropdownRef}>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center justify-center">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          disabled={disabled}
          placeholder={disabled ? "Você já adivinhou o personagem de hoje!" : "Pesquisar personagem por nome..."}
          className="w-full bg-[#0d1426] border border-[#202b43] focus:border-slate-500 rounded-2xl py-3.5 pl-11 pr-12 text-sm text-[#F5F7FF] placeholder-slate-500 outline-none transition-all shadow-lg shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {query.trim() !== '' && filteredCharacters.length > 0 && (
          <button
            onClick={() => handleSelect(filteredCharacters[0])}
            disabled={disabled}
            style={{ backgroundColor: themeColor }}
            className="absolute right-3.5 p-2 text-white rounded-xl transition-all shadow-md active:scale-95 hover:opacity-90"
            title="Confirmar Palpite"
          >
            <Send size={15} />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && filteredCharacters.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-[#0d1426] border border-[#202b43] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] max-h-72 overflow-y-auto custom-scrollbar divide-y divide-[#202b43]/50 z-[9999] animate-fadeIn">
          {filteredCharacters.map((character) => (
            <button
              key={character.id}
              onClick={() => handleSelect(character)}
              className="w-full flex items-center gap-3 p-3 hover:bg-[#111a2d] text-left transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-[#111a2d] border border-[#202b43] overflow-hidden flex-shrink-0 flex items-center justify-center shadow-sm">
                {character.avatar ? (
                  <img src={character.avatar} alt={character.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-slate-400">{character.name[0]}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#F5F7FF] transition-colors truncate">
                  {character.name}
                </p>
              </div>
            </button>
          ))}
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
