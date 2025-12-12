import { useEffect, type JSX } from 'react';

import BodyRuneImage from '@/assets/Body.webp';
import CalmRuneImage from '@/assets/Calm.webp';
import ChaosRuneImage from '@/assets/Chaos.webp';
import FuryRuneImage from '@/assets/Fury.webp';
import MindRuneImage from '@/assets/Mind.webp';
import OrderRuneImage from '@/assets/Order.webp';
import type { Domain } from '@/types/card';
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
  const determineImage = (domain: Domain): string => {
    switch (domain) {
      case 'Fury':
        return FuryRuneImage;
      case 'Calm':
        return CalmRuneImage;
      case 'Mind':
        return MindRuneImage;
      case 'Body':
        return BodyRuneImage;
      case 'Chaos':
        return ChaosRuneImage;
      case 'Order':
        return OrderRuneImage;
      default:
        return '';
    }
  };
  const runes: RuneConfig[] = runeCardsData.map((card) => ({
    id: card.id,
    label: card.name,
    src: determineImage(card.domain[0] ?? 'Fury'),
  }));

  return (
    <div className="rune-container">
      <div className="rune-container__label">Add Runes</div>
      {runes.map(makeRuneImage)}
    </div>
  );
};

export default RuneContainer;
