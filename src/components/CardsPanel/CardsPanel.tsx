import { Box } from '@mui/material';
import React from 'react';

import './CardsPanel.css';

interface CardsPanelProps {
  cardImageUrls: { id: string; imageUrl: string }[];
  gap?: number;
  sortById?: boolean;
}

const CardsPanel: React.FC<CardsPanelProps> = ({
  cardImageUrls,
  gap = 12,
  sortById = false,
}) => {
  // Sort cardImageUrls if sortById is true
  const displayCards = sortById
    ? [...cardImageUrls].sort((a, b) =>
        a.id.localeCompare(b.id, undefined, {
          numeric: true,
          sensitivity: 'base',
        }),
      )
    : cardImageUrls;

  return (
    <Box className="opened-cards-panel" style={{ gap: `${gap}px` }}>
      {displayCards.map(({ id, imageUrl }, index) => (
        <div
          className="opened-cards-panel__cell"
          key={`opened-card-${index}-${id}`}
        >
          <img
            src={imageUrl}
            alt={`Opened card ${index + 1}`}
            className="opened-cards-panel__image"
          />
        </div>
      ))}
    </Box>
  );
};

export default CardsPanel;
