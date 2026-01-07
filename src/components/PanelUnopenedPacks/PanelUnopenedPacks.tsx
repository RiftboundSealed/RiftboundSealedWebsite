import { Typography } from '@mui/material';
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

import './PanelUnopenedPacks.css';

interface PanelUnopenedPacksProps {
  unopenedPacksCount: number;
  packImageUrl: string | null;
  onClick?: () => void;
}

const PACK_WIDTH = 200;
const PACK_HEIGHT = 280;

// "preferred" overlap (used when there is plenty of room)
const DEFAULT_OVERLAP_RATIO = 0.97;
const DEFAULT_VISIBLE_OFFSET = PACK_WIDTH * (1 - DEFAULT_OVERLAP_RATIO);

const PanelUnopenedPacks: React.FC<PanelUnopenedPacksProps> = ({
  unopenedPacksCount,
  packImageUrl,
  onClick,
}) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [availableWidth, setAvailableWidth] = useState<number>(0);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setAvailableWidth(w);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleClick = () => onClick?.();
  const count = Math.max(0, unopenedPacksCount);

  const { visibleOffset, overlapRatio, stackWidth } = useMemo(() => {
    if (count <= 1) {
      return { visibleOffset: 0, overlapRatio: 1, stackWidth: PACK_WIDTH };
    }

    // If we don't know width yet, fall back to default overlap
    if (availableWidth <= 0) {
      const stackW = PACK_WIDTH + (count - 1) * DEFAULT_VISIBLE_OFFSET;
      return {
        visibleOffset: DEFAULT_VISIBLE_OFFSET,
        overlapRatio: DEFAULT_OVERLAP_RATIO,
        stackWidth: stackW,
      };
    }

    // Max offset that still allows the whole stack to fit in the available width
    const maxOffsetToFit = (availableWidth - PACK_WIDTH) / (count - 1);

    // We only *increase overlap* when we must (smaller offset).
    // If there's plenty of space, keep your default look.
    const offset = Math.max(
      0,
      Math.min(DEFAULT_VISIBLE_OFFSET, maxOffsetToFit),
    );

    const ratio = 1 - offset / PACK_WIDTH;
    const stackW = PACK_WIDTH + (count - 1) * offset;

    return { visibleOffset: offset, overlapRatio: ratio, stackWidth: stackW };
  }, [availableWidth, count]);

  if (unopenedPacksCount <= 0) {
    return (
      <div className="panel-unopened-packs-empty">
        <Typography variant="h4" align="center">
          All packs opened!
        </Typography>
      </div>
    );
  }

  return (
    // wrapper takes full column width
    <div ref={wrapRef} className="panel-unopened-packs-wrap">
      <div
        className={`panel-unopened-packs ${
          onClick ? 'panel-unopened-packs--clickable' : ''
        }`}
        style={{ width: stackWidth, height: PACK_HEIGHT }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Open a pack (${unopenedPacksCount} remaining)`}
        data-overlap-ratio={overlapRatio} // optional: handy for debugging
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
              left: index * visibleOffset,
              top: 0,
              zIndex: index + 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PanelUnopenedPacks;
