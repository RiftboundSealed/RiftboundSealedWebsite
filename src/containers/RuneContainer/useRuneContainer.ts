import { useCallback } from 'react';

import { selectRuneCards } from '@/redux/cards/cardsSelectors';
import { upsertCards } from '@/redux/cards/cardsSlice';
import { tryAddCardToDeck } from '@/redux/deck/deckThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCardsData } from '@/services/cards/cardsApi';

const useRuneContainer = () => {
  const dispatch = useAppDispatch();

  // runeCards
  const runeCardsData = useAppSelector(selectRuneCards);

  // addRuneCardsToState
  const addRuneCardsToState = useCallback(async () => {
    const cardsData = await fetchCardsData();
    const runeCards = cardsData.filter(
      (card) => card.type === 'Rune' && !card.isAlternateArt,
    );
    dispatch(upsertCards(runeCards));
  }, [dispatch]);

  // addRuneToDeck
  const addRuneToDeck = (cardId: string) => {
    dispatch(tryAddCardToDeck(cardId, null));
  };

  return { runeCardsData, addRuneCardsToState, addRuneToDeck };
};

export default useRuneContainer;
