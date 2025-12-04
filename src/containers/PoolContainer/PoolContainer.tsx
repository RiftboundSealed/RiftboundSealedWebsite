import { Typography } from '@mui/material';
import { type JSX } from 'react';

import CardsPanel from '@/components/CardsPanel/CardsPanel';
import usePoolContainer from './usePoolContainer';

const PoolContainer = (): JSX.Element => {
  const { cardsInPool } = usePoolContainer();

  return (
    <>
      {cardsInPool.length > 0 ? (
        <CardsPanel
          cardImageUrls={cardsInPool.map((card) => ({
            id: card.id,
            imageUrl: card.thumbnailUrl,
          }))}
          sortById={true}
        />
      ) : (
        <Typography variant="h4" align="center">
          No cards in pool
        </Typography>
      )}
    </>
  );
};

export default PoolContainer;
