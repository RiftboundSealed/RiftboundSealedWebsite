import { nanoid } from '@reduxjs/toolkit';

import { upsertCards } from '@/redux/cards/cardsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAllCardsInPool } from '@/redux/pool/poolSelectors';
import { addPoolEntries } from '@/redux/pool/poolSlice';
import {
  selectAllSetEntries,
  selectHasSetData,
} from '@/redux/sets/setsSelectors';
import type { CardDto } from '@/types/card';

const useUnpackPage = () => {
  const dispatch = useAppDispatch();

  // hasAccess
  const hasSetData = useAppSelector(selectHasSetData);
  const hasAccess = hasSetData;

  // selectedSet
  const selectedSet = useAppSelector(selectAllSetEntries)[0] || null;

  // addCardsToPool
  const addCardsToPool = (cards: CardDto[]) => {
    dispatch(upsertCards(cards));
    dispatch(
      addPoolEntries(
        cards.map((card) => ({
          id: nanoid(),
          cardId: card.id,
          addedToDeck: false,
        })),
      ),
    );
  };

  // allCardsInPool
  const allCardsInPool = useAppSelector(selectAllCardsInPool);

  return { hasAccess, selectedSet, addCardsToPool, allCardsInPool };
};

export default useUnpackPage;
