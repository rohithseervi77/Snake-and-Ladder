import React, { useState, useMemo } from 'react';
import { X, BookOpen, Search, Filter, Clock, HardDrive, CheckCircle2 } from 'lucide-react';
import { ALGORITHM_CARDS, AlgorithmCard } from '../../data/algorithmCards';

interface AlgorithmCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlgorithmCardsModal: React.FC<AlgorithmCardsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCO, setSelectedCO] = useState<string>('All');

  const categories = ['All', 'Searching', 'Sorting', 'Trees', 'Graphs'];
  const courseOutcomes = ['All', 'CO1', 'CO2', 'CO3', 'CO4'];

  const filteredCards = useMemo(() => {
    return ALGORITHM_CARDS.filter(card => {
      const matchesSearch = 
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.keyInvariant.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
      const matchesCO = selectedCO === 'All' || card.co === selectedCO;
      return matchesSearch && matchesCategory && matchesCO;
    });
  }, [searchQuery, selectedCategory, selectedCO]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--border-subtle)] bg-[var(--header-bg)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border border-[var(--color-indigo-border)]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[var(--text-primary)] tracking-tight">
                DSA Algorithm Study Cards
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Essential revision reference for University DSA curriculum exams and lab viva
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-secondary-bg)] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search algorithm, purpose, invariant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--color-indigo)]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-[var(--text-secondary)] flex items-center gap-1">
              <Filter className="w-3 h-3" /> Topic:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--color-indigo)] text-white shadow-sm'
                    : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* CO Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[var(--text-secondary)]">CO:</span>
            {courseOutcomes.map(co => (
              <button
                key={co}
                onClick={() => setSelectedCO(co)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                  selectedCO === co
                    ? 'bg-[var(--color-cyan)] text-white shadow-sm'
                    : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                {co}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCards.length === 0 ? (
            <div className="col-span-full py-12 text-center text-[var(--text-secondary)]">
              No algorithm flashcards matched your search criteria.
            </div>
          ) : (
            filteredCards.map(card => (
              <div
                key={card.id}
                className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] hover:border-[var(--color-indigo-border)] transition-all shadow-sm flex flex-col justify-between gap-3"
              >
                <div>
                  {/* Card Title & Badges */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)] m-0">
                        {card.name}
                      </h3>
                      <span className="text-[10px] text-[var(--text-secondary)] font-medium">
                        {card.category}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--color-cyan-light)] text-[var(--color-cyan)] border border-[var(--color-cyan-border)]">
                      {card.co}
                    </span>
                  </div>

                  {/* Purpose */}
                  <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
                    {card.purpose}
                  </p>

                  {/* Complexities */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[11px] mb-3">
                    <div className="flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--color-amber)] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-[var(--text-primary)]">Time Complexity</div>
                        <div className="text-[10px] text-[var(--text-secondary)] font-mono">
                          Best: <span className="text-[var(--color-emerald)]">{card.timeComplexity.best}</span>
                        </div>
                        <div className="text-[10px] text-[var(--text-secondary)] font-mono">
                          Avg: <span className="text-[var(--color-amber)]">{card.timeComplexity.average}</span>
                        </div>
                        <div className="text-[10px] text-[var(--text-secondary)] font-mono">
                          Worst: <span className="text-[var(--color-rose)]">{card.timeComplexity.worst}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-[var(--color-cyan)] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-[var(--text-primary)]">Aux Space</div>
                        <div className="text-[10px] text-[var(--color-cyan)] font-mono">
                          {card.spaceComplexity}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* When to use */}
                  <div className="text-[11px] text-[var(--text-secondary)] mb-1">
                    <span className="font-bold text-[var(--text-primary)]">Application: </span>
                    {card.whenToUse}
                  </div>
                </div>

                {/* Key Invariant */}
                <div className="p-2 rounded-lg bg-[var(--color-indigo-light)] border border-[var(--color-indigo-border)] text-[11px] text-[var(--color-indigo)] flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Key Invariant: </span>
                    {card.keyInvariant}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--header-bg)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>Showing {filteredCards.length} of {ALGORITHM_CARDS.length} syllabus reference cards</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[var(--card-secondary-bg)] hover:bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
