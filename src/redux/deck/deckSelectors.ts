import { createSelector } from '@reduxjs/toolkit';

import { MAIN_DECK_CARD_TYPE_CHECKS } from '@/consts/card';
import {
  selectCardEntities,
  selectCardEntryById,
} from '@/redux/cards/cardsSelectors';
import { deckAdapter } from '@/redux/deck/deckSlice';
import type { RootState } from '@/redux/store';
import type { CardType, Domain } from '@/types/card';

const selectDeckState = (state: RootState) => state.deck;

export const {
  selectAll: selectAllDeckEntries,
  selectById: selectDeckEntryById,
  selectEntities: selectDeckEntities,
} = deckAdapter.getSelectors(selectDeckState);

export const selectDeckError = (state: RootState) => state.deck.error;
export const selectHasDeckData = (state: RootState): boolean => {
  return state.deck.ids.length > 0;
};

export const selectAllCardsInDeck = createSelector(
  [selectAllDeckEntries, selectCardEntities],
  (deckEntries, cardEntities) =>
    deckEntries
      .map((deckEntry) => {
        const card = cardEntities[deckEntry.cardId];
        return card
          ? { ...card, deckId: deckEntry.id, poolId: deckEntry.poolId }
          : null;
      })
      .filter((c) => c !== null),
);

export const selectLegendsInDeck = createSelector(
  [selectAllCardsInDeck],
  (cardsInDeck) => cardsInDeck.filter((card) => card.type === 'Legend'),
);

export const selectSignatureCardsInDeck = createSelector(
  [selectAllCardsInDeck],
  (cardsInDeck) =>
    cardsInDeck.filter(
      (card) =>
        card.type === 'Signature Spell' || card.type === 'Signature Gear',
    ),
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

export const selectDomainIdentitiesInMainDeck = createSelector(
  [
    selectAllDeckEntries,
    selectCardEntities,
    (_state: RootState, withSignature: boolean) => withSignature,
  ],
  (deckEntries, cardEntities, withSignature) => {
    return Array.from(
      new Set<Domain>(
        deckEntries
          .map((deckEntry) => {
            const card = cardEntities[deckEntry.cardId];
            return card || null;
          })
          .filter((d) => d !== null)
          .filter((card) => MAIN_DECK_CARD_TYPE_CHECKS.includes(card.type))
          .filter((card) =>
            withSignature
              ? true
              : card.type !== 'Signature Spell' &&
                card.type !== 'Signature Gear',
          )
          .map((card) => card.domain)
          .flat(),
      ),
    );
  },
);

export const selectDomainIdentitiesInRuneDeck = createSelector(
  [selectAllDeckEntries, selectCardEntities],
  (deckEntries, cardEntities) => {
    return Array.from(
      new Set<Domain>(
        deckEntries
          .map((deckEntry) => {
            const card = cardEntities[deckEntry.cardId];
            return card || null;
          })
          .filter((d) => d !== null)
          .filter((card) => card.type === 'Rune')
          .map((card) => card.domain)
          .flat(),
      ),
    );
  },
);
