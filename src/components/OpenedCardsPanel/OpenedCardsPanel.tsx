import React from 'react';

import './OpenedCardsPanel.css';

interface OpenedCardsPanelProps {
  cardImageUrls: { id: string; imageUrl: string }[];
}

const OpenedCardsPanel: React.FC<OpenedCardsPanelProps> = ({
  cardImageUrls,
}) => {
  return (
    <div className="opened-cards-panel">
      {cardImageUrls.map(({ id, imageUrl }, index) => (
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
    </div>
  );
};

export default OpenedCardsPanel;
