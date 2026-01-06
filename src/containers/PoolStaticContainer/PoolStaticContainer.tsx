import { Typography } from '@mui/material';
import { type JSX } from 'react';

import PanelCards, {
  type CardPanelData,
} from '@/components/PanelCards/PanelCards';
import { VITE_CDN_BASE_URL } from '@/consts/env';
import usePoolStaticContainer from './usePoolStaticContainer';

const PoolStaticContainer = (): JSX.Element => {
  // State

  // Hooks
  const { allCardsInPool } = usePoolStaticContainer();

  // Locals
  const cardImagePanels: CardPanelData[] = allCardsInPool.map((card) => ({
    poolId: card.poolId,
    cardId: card.id,
    cardCode: card.code,
    imageUrl: `${VITE_CDN_BASE_URL}/cards/${card.code}.webp`,
    name: card.name,
  }));

  return (
    <>
      {allCardsInPool.length > 0 ? (
        <PanelCards cardImageUrls={cardImagePanels} sortByCardCode={true} />
      ) : (
        <Typography variant="h4" align="center">
          No cards in pool
        </Typography>
      )}
    </>
  );
};

export default PoolStaticContainer;
