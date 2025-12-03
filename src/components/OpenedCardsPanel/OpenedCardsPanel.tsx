import React from 'react';

import './OpenedCardsPanel.css';

interface OpenedCardsPanelProps {
  cardImageUrls: string[];
}

const OpenedCardsPanel: React.FC<OpenedCardsPanelProps> = ({
  cardImageUrls,
}) => {
  return (
    <div className="opened-cards-panel">
      {cardImageUrls.map((url, index) => (
        <div className="opened-cards-panel__cell" key={`${url}-${index}`}>
          <img
            src={url}
            alt={`Opened card ${index + 1}`}
            className="opened-cards-panel__image"
          />
        </div>
      ))}
    </div>
  );
};

export default OpenedCardsPanel;
