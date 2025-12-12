import { Typography } from '@mui/material';
import React from 'react';

import './PanelUnopenedPacks.css';

interface PanelUnopenedPacksProps {
  unopenedPacksCount: number;
  packImageUrl: string | null;
  onClick?: () => void;
}

const PACK_WIDTH = 200;
const PACK_HEIGHT = 280;
const PACK_OVERLAP_RATIO = 0.85; // each pack covers a percentage of the one to its left
const PACK_VISIBLE_OFFSET = PACK_WIDTH * (1 - PACK_OVERLAP_RATIO); // remaining width visible

const PanelUnopenedPacks: React.FC<PanelUnopenedPacksProps> = ({
  unopenedPacksCount,
  packImageUrl,
  onClick,
}) => {
  const count = Math.max(0, unopenedPacksCount);

  const stackWidth = PACK_WIDTH + Math.max(count - 1, 0) * PACK_VISIBLE_OFFSET;

  return unopenedPacksCount > 0 ? (
    <div
      className={`panel-unopened-packs ${
        onClick ? 'panel-unopened-packs--clickable' : ''
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
          className="panel-unopened-packs__image"
          style={{
            width: PACK_WIDTH,
            height: PACK_HEIGHT,
            left: index * PACK_VISIBLE_OFFSET,
            top: 0,
            zIndex: index + 1, // rightmost pack appears on top
          }}
        />
      ))}
    </div>
  ) : (
    <div className="panel-unopened-packs-empty">
      <Typography variant="h4" align="center">
        All packs opened!
      </Typography>
    </div>
  );
};

export default PanelUnopenedPacks;
