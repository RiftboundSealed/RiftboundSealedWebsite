import { Typography } from '@mui/material';
import { type JSX } from 'react';

import PanelCards, {
  type CardPanelData,
} from '@/components/PanelCards/PanelCards';
import usePoolConstructContainer from './usePoolConstructContainer';

const PoolConstructContainer = (): JSX.Element => {
  // State / Hooks
  const { cardsRemainingInPool, handleAddToDeck } = usePoolConstructContainer();

  // Event Handlers
  const onClickCard = (cardPanel: CardPanelData) => {
    handleAddToDeck(cardPanel.cardId, cardPanel.id);
  };

  return (
    <>
      {cardsRemainingInPool.length > 0 ? (
        <PanelCards
          cardImageUrls={cardsRemainingInPool.map((card) => ({
            id: card.poolId,
            cardId: card.id,
            imageUrl: card.thumbnailUrl,
            name: card.name,
          }))}
          sortByCardId={true}
          onClickCard={onClickCard}
        />
      ) : (
        <Typography variant="h4" align="center">
          No cards in pool
        </Typography>
      )}
    </>
  );
};

export default PoolConstructContainer;
