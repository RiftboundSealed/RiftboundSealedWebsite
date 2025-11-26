import { nanoid } from '@reduxjs/toolkit';

import { selectCardEntryById } from '../selectors/cardSelectors';
import { selectCardTypeCountInDeck } from '../selectors/deckSelectors';
import { deckAddRejected, deckEntryAdded } from '../slices/deckSlice';
import { poolEntryAddedToDeck } from '../slices/poolSlice';
import type { RootState, AppDispatch } from '../store/store';

export const tryAddCardToDeck =
  (cardId: string, poolId: string | null) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const card = selectCardEntryById(state, cardId);
    if (!card) {
      console.error(`Card with ID ${cardId} not found in card state.`);
      dispatch(
        deckAddRejected({ message: 'Card not found. Reach out to support.' }),
      );
      return;
    }

    // Check if adding more than 1 legend
    const legendCount = selectCardTypeCountInDeck(state, 'Legend');
    if (card.type === 'Legend' && legendCount >= 1) {
      dispatch(
        deckAddRejected({
          message: 'You can only have 1 Legend in your deck.',
        }),
      );
      return;
    }

    // Check if adding more than 12 runes
    const runeCount = selectCardTypeCountInDeck(state, 'Rune');
    if (card.type === 'Rune' && runeCount >= 12) {
      dispatch(
        deckAddRejected({
          message: 'You can only have 12 Runes in your deck.',
        }),
      );
      return;
    }

    // Check if adding more than 3 battlefields
    const battlefieldCount = selectCardTypeCountInDeck(state, 'Battlefield');
    if (card.type === 'Battlefield' && battlefieldCount >= 3) {
      dispatch(
        deckAddRejected({
          message: 'You can only have 3 Battlefields in your deck.',
        }),
      );
      return;
    }

    // Allowed -> Add to deck
    dispatch(deckEntryAdded({ id: nanoid(), cardId: card.id, poolId }));
    if (poolId) {
      dispatch(poolEntryAddedToDeck({ id: poolId! }));
    }
  };
