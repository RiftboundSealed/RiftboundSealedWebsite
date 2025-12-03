import React from 'react';

import './UnopenedPacksPanel.css';

interface UnopenedPacksPanelProps {
  unopenedPacksCount: number;
  packImageUrl: string | null;
  onClick?: () => void;
}

const PACK_WIDTH = 120;
const PACK_HEIGHT = 240;
const OVERLAP_RATIO = 0.7; // each pack covers 70% of the one to its left
const VISIBLE_OFFSET = PACK_WIDTH * (1 - OVERLAP_RATIO); // 30% of the width visible

const UnopenedPacksPanel: React.FC<UnopenedPacksPanelProps> = ({
  unopenedPacksCount,
  packImageUrl,
  onClick,
}) => {
  const count = Math.max(0, unopenedPacksCount);

  const stackWidth = PACK_WIDTH + Math.max(count - 1, 0) * VISIBLE_OFFSET;

  return (
    <div
      className={`unopened-packs-panel ${
        onClick ? 'unopened-packs-panel--clickable' : ''
      }`}
      style={{ width: stackWidth, height: PACK_HEIGHT }}
      onClick={onClick}
      role={'button'}
      tabIndex={0}
    >
      {Array.from({ length: count }, (_, index) => (
        <img
          key={index}
          src={packImageUrl ?? undefined}
          alt="Unopened pack"
          className="unopened-packs-panel__image"
          style={{
            left: index * VISIBLE_OFFSET,
            top: 0,
            zIndex: index + 1, // rightmost pack appears on top
          }}
        />
      ))}
    </div>
  );
};

export default UnopenedPacksPanel;
