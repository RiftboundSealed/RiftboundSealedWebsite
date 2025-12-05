import { Box } from '@mui/material';
import React from 'react';

import './CardsPanel.css';

export interface CardPanelData {
  id: string; // Most likely the pool ID, but can be any ID
  cardId: string;
  imageUrl: string;
  name: string;
}

interface CardsPanelProps {
  cardImageUrls: CardPanelData[];
  cardWidth?: number;
  cardHeight?: number;
  maxHeight?: number;
  gap?: number;
  sortByCardId?: boolean;
  onCardClick?: (card: CardPanelData) => void;
}

const CardsPanel: React.FC<CardsPanelProps> = ({
  cardImageUrls,
  cardWidth = 175,
  cardHeight = 245,
  maxHeight = 600,
  gap = 8,
  sortByCardId = false,
  onCardClick,
}) => {
  // Sort cardImageUrls if sortById is true
  const displayCards = sortByCardId
    ? [...cardImageUrls].sort((a, b) => a.cardId.localeCompare(b.cardId))
    : cardImageUrls;

  return (
    <Box
      className="opened-cards-panel"
      style={{
        gap: `${gap}px`,
        gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, auto))`,
        maxHeight: `${maxHeight}px`,
      }}
    >
      {displayCards.map((card, index) => (
        <div
          className="opened-cards-panel__cell"
          key={`opened-card-${index}-${card.id}`}
          onClick={() => onCardClick?.(card)}
          role="button"
        >
          <img
            style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
            src={card.imageUrl}
            alt={`Opened card ${index + 1}`}
            className="opened-cards-panel__image"
          />
        </div>
      ))}
    </Box>
  );
};

export default CardsPanel;
