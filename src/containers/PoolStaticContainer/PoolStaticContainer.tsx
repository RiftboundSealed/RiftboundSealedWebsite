import { Typography } from '@mui/material';
import { type JSX } from 'react';

import PanelCards from '@/components/PanelCards/PanelCards';
import usePoolStaticContainer from './usePoolStaticContainer';

const PoolStaticContainer = (): JSX.Element => {
  // State

  // Hooks
  const { allCardsInPool } = usePoolStaticContainer();

  return (
    <>
      {allCardsInPool.length > 0 ? (
        <PanelCards
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
