import { Box } from '@mui/material';
import React from 'react';

import './PanelCards.css';

export interface CardPanelData {
  id: string; // Most likely the pool ID, but can be any ID
  cardId: string;
  imageUrl: string;
  name: string;
}

interface PanelCardsProps {
  cardImageUrls: CardPanelData[];
  cardWidth?: number;
  cardHeight?: number;
  maxHeight?: number;
  gap?: number;
  sortByCardId?: boolean;
  onCardClick?: (card: CardPanelData) => void;
}

const DEFAULT_CARD_WIDTH_PX = 175;
const DEFAULT_CARD_HEIGHT_PX = 245;
const DEFAULT_CARD_PANEL_MAX_HEIGHT_PX = 600;
const DEFAULT_CARD_PANEL_GAP_PX = 8;

const PanelCards: React.FC<PanelCardsProps> = ({
  cardImageUrls,
  cardWidth = DEFAULT_CARD_WIDTH_PX,
  cardHeight = DEFAULT_CARD_HEIGHT_PX,
  maxHeight = DEFAULT_CARD_PANEL_MAX_HEIGHT_PX,
  gap = DEFAULT_CARD_PANEL_GAP_PX,
  sortByCardId = false,
  onCardClick,
}) => {
  // Sort cardImageUrls if sortByCardId is true
  const displayCards = sortByCardId
    ? [...cardImageUrls].sort((a, b) => a.cardId.localeCompare(b.cardId))
    : cardImageUrls;

  return (
    <Box
      className="opened-panel-cards"
      style={{
        gap: `${gap}px`,
        gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, auto))`,
        maxHeight: `${maxHeight}px`,
      }}
    >
      {displayCards.map((card, index) => (
        <div
          className="opened-panel-cards__cell"
          key={`opened-card-${index}-${card.id}`}
          onClick={() => onCardClick?.(card)}
          role="button"
          aria-label={card.name}
        >
          <img
            style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
            src={card.imageUrl}
            alt={card.name}
            className="opened-panel-cards__image"
          />
        </div>
      ))}
    </Box>
  );
};

export default PanelCards;
