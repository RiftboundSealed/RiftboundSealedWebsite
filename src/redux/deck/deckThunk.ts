import { nanoid } from '@reduxjs/toolkit';

import { MAIN_DECK_CARD_TYPES } from '@/consts/card';
import {
  MAX_BATTLEFIELD_COUNT,
  MAIN_DECK_SIZE,
  RUNE_DECK_SIZE,
  MAX_DOMAIN_TYPES,
  MAX_LEGEND_COUNT,
} from '@/consts/deck';
import { selectCardEntryById } from '@/redux/cards/cardsSelectors';
import {
  selectCardTypeCountInDeck,
  selectDomainTypesInMainDeck,
  selectDomainTypesInRuneDeck,
  selectLegendsInDeck,
  selectSignatureSpellsInDeck,
} from '@/redux/deck/deckSelectors';
import {
  addDeckErrorMessage,
  addDeckEntry,
  clearDeckErrorMessage,
} from '@/redux/deck/deckSlice';
import { addPoolEntryToDeck } from '@/redux/pool/poolSlice';
import type { RootState, AppDispatch } from '@/redux/store';

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

    // Allowed -> Add to deck
    dispatch(addDeckEntry({ id: nanoid(), cardId: card.id, poolId }));
    if (poolId) {
      dispatch(addPoolEntryToDeck({ id: poolId }));
    }
  };

/**
 * Checks if the current deck is legal according to game rules.
 * If illegal, dispatches error messages to the deck state.
 * Returns true if the deck is legal, false otherwise.
 */
export const checkLegalDeck =
  () =>
  (dispatch: AppDispatch, getState: () => RootState): boolean => {
    const state = getState();
    const errors: string[] = [];

    // Check if the deck has exactly the required main deck cards (excluding Runes)
    const mainDeckCount = MAIN_DECK_CARD_TYPES.reduce(
      (acc, type) => acc + selectCardTypeCountInDeck(state, type),
      0,
    );
    if (mainDeckCount !== MAIN_DECK_SIZE) {
      errors.push(
        `- Main deck must have exactly ${MAIN_DECK_SIZE} [Current: ${mainDeckCount}] cards (excluding Runes).`,
      );
    }

    // Check if the rune deck has exactly 12 runes
    const runeCount = selectCardTypeCountInDeck(state, 'Rune');
    if (runeCount !== RUNE_DECK_SIZE) {
      errors.push(
        `- Rune deck must have exactly ${RUNE_DECK_SIZE} cards [Current: ${runeCount}].`,
      );
    }

    // Check if there is more than 1 legend
    const legendCount = selectCardTypeCountInDeck(state, 'Legend');
    if (legendCount > MAX_LEGEND_COUNT) {
      errors.push(
        `- You can only have up to ${MAX_LEGEND_COUNT} Legend [Current: ${legendCount}] in your deck.`,
      );
    }

    // Check if there are more than 3 battlefields
    const battlefieldCount = selectCardTypeCountInDeck(state, 'Battlefield');
    if (battlefieldCount > MAX_BATTLEFIELD_COUNT) {
      errors.push(
        `- You can only have up to ${MAX_BATTLEFIELD_COUNT} Battlefields [Current: ${battlefieldCount}] in your deck.`,
      );
    }

    // Check that the main deck has up to 3 domain types
    const domainIdentities = selectDomainTypesInMainDeck(state);
    if (domainIdentities.length > MAX_DOMAIN_TYPES) {
      errors.push(
        `- Main deck can only have up to ${MAX_DOMAIN_TYPES} domains [Current: ${domainIdentities.join(', ')}].`,
      );
    }

    // Check that the rune deck has up to 3 domain types
    const runeDomains = selectDomainTypesInRuneDeck(state);
    if (runeDomains.length > MAX_DOMAIN_TYPES) {
      errors.push(
        `- Rune deck can only have up to ${MAX_DOMAIN_TYPES} domains [Current: ${runeDomains.join(', ')}].`,
      );
    }

    // Check to make sure that the rune deck domains are a subset of the main deck domain identities
    if (
      domainIdentities.length <= MAX_DOMAIN_TYPES &&
      runeDomains.length <= MAX_DOMAIN_TYPES
    ) {
      const isSubset = runeDomains.every((domain) =>
        domainIdentities.includes(domain),
      );
      if (!isSubset) {
        errors.push(
          `- Rune deck domains [${runeDomains.join(', ')}] must be a subset of the main deck domain identities [${domainIdentities.join(', ')}].`,
        );
      }
    }

    // If a legend was selected, make sure the two colors are a subset of the main deck domain identities
    const legendCards = selectLegendsInDeck(state);
    if (domainIdentities.length <= MAX_DOMAIN_TYPES && legendCards.length > 0) {
      legendCards.forEach((legend) => {
        if (!legend) return;
        const legendDomains = legend.domain;
        const isSubset = legendDomains.every((domain) =>
          domainIdentities.includes(domain),
        );
        if (!isSubset) {
          errors.push(
            `- Legend "${legend.name}" domains [${legendDomains.join(', ')}] must be a subset of the main deck domain identities [${domainIdentities.join(', ')}].`,
          );
        }
      });
    }

    // Make sure that all signature spells correspond to the domain identities
    const signatureSpells = selectSignatureSpellsInDeck(state);
    if (
      domainIdentities.length <= MAX_DOMAIN_TYPES &&
      signatureSpells.length > 0
    ) {
      signatureSpells.forEach((spell) => {
        if (!spell) return;
        const spellDomains = spell.domain;
        const isSubset = spellDomains.every((domain) =>
          domainIdentities.includes(domain),
        );
        if (!isSubset) {
          errors.push(
            `- Signature spell "${spell.name}" domains [${spellDomains.join(', ')}] must be a subset of the main deck domain identities [${domainIdentities.join(', ')}].`,
          );
        }
      });
    }

    if (errors.length > 0) {
      dispatch(
        addDeckErrorMessage({
          message: errors.join('\n'),
        }),
      );
      return false;
    } else {
      dispatch(clearDeckErrorMessage());
      return true;
    }
  };
