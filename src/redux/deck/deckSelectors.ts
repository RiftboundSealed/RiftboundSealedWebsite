import { createSelector } from '@reduxjs/toolkit';

import {
  selectCardEntities,
  selectCardEntryById,
} from '@/redux/cards/cardsSelectors';
import { deckAdapter } from '@/redux/deck/deckSlice';
import type { RootState } from '@/redux/store';
import type { CardType } from '@/types/card';

const selectDeckState = (state: RootState) => state.deck;

export const {
  selectAll: selectAllDeckEntries,
  selectById: selectDeckEntryById,
  selectEntities: selectDeckEntities,
} = deckAdapter.getSelectors(selectDeckState);

export const selectDeckError = (state: RootState) => state.deck.error;

export const selectAllCardsInDeck = createSelector(
  [selectAllDeckEntries, selectCardEntities],
  (deckEntries, cardEntities) =>
    deckEntries
      .map((deckEntry) => cardEntities[deckEntry.cardId])
      .filter(Boolean),
);

export const selectCardByDeckId = (state: RootState, deckId: string) => {
  const deckEntity = selectDeckEntryById(state, deckId);
  if (!deckEntity) return null;

  return selectCardEntryById(state, deckEntity.cardId);
};

export const selectCardTypeCountInDeck = createSelector(
  [
    selectAllDeckEntries,
    selectCardEntities,
    (_state: RootState, cardType: CardType) => cardType,
  ],
  (deckEntries, cardEntities, cardType) =>
    deckEntries.reduce((count, deckEntry) => {
      const card = cardEntities[deckEntry.cardId];
      if (card && card.type === cardType) {
        return count + 1;
      }
      return count;
    }, 0),
);
