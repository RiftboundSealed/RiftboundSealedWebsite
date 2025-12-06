import { Typography } from '@mui/material';
import { type JSX } from 'react';

import CardsPanel from '@/components/CardsPanel/CardsPanel';
import usePoolStaticContainer from './usePoolStaticContainer';

const PoolStaticContainer = (): JSX.Element => {
  // State / Hooks
  const { allCardsInPool } = usePoolStaticContainer();

  return (
    <>
      {allCardsInPool.length > 0 ? (
        <CardsPanel
          cardImageUrls={allCardsInPool.map((card) => ({
            id: card.poolId,
            cardId: card.id,
            imageUrl: card.thumbnailUrl,
            name: card.name,
          }))}
          sortByCardId={true}
        />
      ) : (
        <Typography variant="h4" align="center">
          No cards in pool
        </Typography>
      )}
    </>
  );
};

export default PoolStaticContainer;
