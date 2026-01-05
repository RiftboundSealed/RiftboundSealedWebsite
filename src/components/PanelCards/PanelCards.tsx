import { Box } from '@mui/material';
import React from 'react';

import './PanelCards.css';

export interface CardPanelData {
  poolId: string | null;
  cardId: string;
  cardCode: string | null;
  imageUrl: string;
  name: string;
  isBattlefield: boolean;
}

interface PanelCardsProps {
  cardImageUrls: CardPanelData[];
  cardWidth?: number;
  cardHeight?: number;
  maxHeight?: number;
  gap?: number;
  sortByCardCode?: boolean;
  onClickCard?: (card: CardPanelData) => void;
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
  sortByCardCode = false,
  onClickCard,
}) => {
  // Sort cardImageUrls if sortByCardCode is true
  const displayCards = sortByCardCode
    ? [...cardImageUrls].sort((a, b) =>
        (a.cardCode ?? '').localeCompare(b.cardCode ?? ''),
      )
    : cardImageUrls;

  // Event Handlers
  const handleCardClick = (card: CardPanelData) => {
    onClickCard?.(card);
  };

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
          key={`opened-card-${index}-${card.poolId}`}
          onClick={() => handleCardClick(card)}
          role="button"
          aria-label={card.name}
        >
          <img
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              transform: `rotate(${card.isBattlefield ? 90 : 0}deg)`,
            }}
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
