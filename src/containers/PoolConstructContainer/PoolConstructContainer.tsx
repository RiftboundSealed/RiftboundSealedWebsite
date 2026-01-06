import { Typography } from '@mui/material';
import { type JSX } from 'react';

import PanelCards, {
  type CardPanelData,
} from '@/components/PanelCards/PanelCards';
import { VITE_CDN_BASE_URL } from '@/consts/env';
import usePoolConstructContainer from './usePoolConstructContainer';

const PoolConstructContainer = (): JSX.Element => {
  // State / Hooks
  const { cardsRemainingInPool, addCardToDeck } = usePoolConstructContainer();

  // Event Handlers
  const handleCardClick = (cardPanel: CardPanelData) => {
    addCardToDeck(cardPanel.cardId, cardPanel.poolId!);
  };

  // Locals
  const cardImagePanels: CardPanelData[] = cardsRemainingInPool.map((card) => ({
    poolId: card.poolId,
    cardId: card.id,
    cardCode: card.code,
    imageUrl: `${VITE_CDN_BASE_URL}/cards/${card.code}.webp`,
    name: card.name,
  }));

  return (
    <>
      {cardsRemainingInPool.length > 0 ? (
        <PanelCards
          cardImageUrls={cardImagePanels}
          sortByCardCode={true}
          onClickCard={handleCardClick}
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
