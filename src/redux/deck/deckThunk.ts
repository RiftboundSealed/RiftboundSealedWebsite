import { nanoid } from '@reduxjs/toolkit';

import { selectCardEntryById } from '@/redux/cards/cardsSelectors';
import { selectCardTypeCountInDeck } from '@/redux/deck/deckSelectors';
import { addDeckErrorMessage, addDeckEntry } from '@/redux/deck/deckSlice';
import { addPoolEntryToDeck } from '@/redux/pool/poolSlice';
import type { RootState, AppDispatch } from '@/redux/store';
import type { CardType } from '@/types/card';

export const tryAddCardToDeck =
  (cardId: string, poolId: string | null) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const card = selectCardEntryById(state, cardId);
    if (!card) {
      console.error(`Card with ID ${cardId} not found in card state.`);
      dispatch(
        addDeckErrorMessage({
          message: 'Card not found. Reach out to support.',
        }),
      );
      return;
    }

    // Check if adding more than 1 legend
    const legendCount = selectCardTypeCountInDeck(state, 'Legend');
    if (card.type === 'Legend' && legendCount >= 1) {
      dispatch(
        addDeckErrorMessage({
          message: 'You can only have 1 Legend in your deck.',
        }),
      );
      return;
    }

    // Check if adding more than 12 runes
    const runeCount = selectCardTypeCountInDeck(state, 'Rune');
    if (card.type === 'Rune' && runeCount >= 12) {
      dispatch(
        addDeckErrorMessage({
          message: 'You can only have 12 Runes in your deck.',
        }),
      );
      return;
    }

    // Check if adding more than 3 battlefields
    const battlefieldCount = selectCardTypeCountInDeck(state, 'Battlefield');
    if (card.type === 'Battlefield' && battlefieldCount >= 3) {
      dispatch(
        addDeckErrorMessage({
          message: 'You can only have 3 Battlefields in your deck.',
        }),
      );
      return;
    }

    // Check if adding more than 25 main deck cards (excluding Runes)
    const MAIN_DECK_CARD_TYPES: CardType[] = [
      'Unit',
      'Champion Unit',
      'Spell',
      'Signature Spell',
      'Gear',
    ];
    const isMainDeckCardType = (cardType: CardType): boolean => {
      return MAIN_DECK_CARD_TYPES.includes(cardType);
    };
    // Calculate main deck count using the helper
    const mainDeckCount = MAIN_DECK_CARD_TYPES.reduce(
      (acc, type) => acc + selectCardTypeCountInDeck(state, type),
      0,
    );
    if (isMainDeckCardType(card.type)) {
      if (mainDeckCount >= 25) {
        dispatch(
          addDeckErrorMessage({
            message: 'Main deck can only have 25 cards (excluding Runes).',
          }),
        );
        return;
      }
    }

    // Allowed -> Add to deck
    dispatch(addDeckEntry({ id: nanoid(), cardId: card.id, poolId }));
    if (poolId) {
      dispatch(addPoolEntryToDeck({ id: poolId }));
    }
  };
