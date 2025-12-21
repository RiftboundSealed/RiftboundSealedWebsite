import { useEffect, type JSX } from 'react';

import { VITE_CDN_BASE_URL } from '@/consts/env';
import useRuneContainer from './useRuneContainer';

import './RuneContainer.css';

interface RuneConfig {
  id: string;
  label: string;
  src: string;
}

const RuneContainer = (): JSX.Element => {
  // Hooks
  const { runeCardsData, addRuneCardsToState, addRuneToDeck } =
    useRuneContainer();
  // Fetch rune cards on mount
  useEffect(() => {
    void addRuneCardsToState();
  }, [addRuneCardsToState]);

  // Event handlers
  const handleAddRuneToDeck = (cardId: string) => {
    addRuneToDeck(cardId);
  };

  // Locals
  const makeRuneImage = (rune: RuneConfig) => (
    <button
      key={rune.id}
      type="button"
      className="rune-container__cell"
      onClick={() => handleAddRuneToDeck(rune.id)}
    >
      <img src={rune.src} alt={rune.label} className="rune-container__image" />
    </button>
  );
  const runes: RuneConfig[] = runeCardsData.map((card) => ({
    id: card.id,
    label: card.name,
    src: `${VITE_CDN_BASE_URL}/runes/${card.domain[0] ?? 'Fury'}.webp`,
  }));

  return (
    <div className="rune-container">
      <div className="rune-container__label">Add Runes</div>
      {runes.map(makeRuneImage)}
    </div>
  );
};

export default RuneContainer;
