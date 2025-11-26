import { createSelector } from '@reduxjs/toolkit';

import {
  selectCardEntities,
  selectCardEntryById,
} from '@/redux/cards/cardsSelectors';
import { poolAdapter } from '@/redux/pool/poolSlice';
import type { RootState } from '@/redux/store';

const selectPoolState = (state: RootState) => state.pool;

export const {
  selectAll: selectAllPoolEntries,
  selectById: selectPoolEntryById,
  selectEntities: selectPoolEntities,
} = poolAdapter.getSelectors(selectPoolState);

export const selectAllCardsInPool = createSelector(
  [selectAllPoolEntries, selectCardEntities],
  (poolEntries, cardEntities) =>
    poolEntries
      .map((poolEntry) => cardEntities[poolEntry.cardId])
      .filter(Boolean),
);

/**
 * So that the UI can display the cards not yet added to the deck (cards remaining in pool).
 * It will also serve as the sideboard.
 */
export const selectAllCardsRemainingInPool = createSelector(
  [selectAllPoolEntries, selectCardEntities],
  (poolEntries, cardEntities) =>
    poolEntries
      .filter((poolEntry) => !poolEntry.addedToDeck)
      .map((poolEntry) => cardEntities[poolEntry.cardId])
      .filter(Boolean),
);

export const selectCardByPoolId = (state: RootState, poolId: string) => {
  const poolEntity = selectPoolEntryById(state, poolId);
  if (!poolEntity) return null;

  return selectCardEntryById(state, poolEntity.cardId);
};
