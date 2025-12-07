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

  // handleAddRuneCardsToState
  const handleAddRuneCardsToState = useCallback(async () => {
    const cardsData = await fetchCardsData();
    const runeCards = cardsData.filter((card) => card.type === 'Rune');
    dispatch(upsertCards(runeCards));
  }, [dispatch]);

  // handleAddRuneToDeck
  const handleAddRuneToDeck = (cardId: string) => {
    dispatch(tryAddCardToDeck(cardId, null));
  };

  return { runeCardsData, handleAddRuneCardsToState, handleAddRuneToDeck };
};

export default useRuneContainer;
