import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { PoolEntity } from '@/types/pool';
import { selectCardEntities, selectCardEntryById } from '../slices/cardSlice';
import type { RootState } from '../store/store';

const poolAdapter = createEntityAdapter<PoolEntity>();
const initialState = poolAdapter.getInitialState();

const poolSlice = createSlice({
  name: 'pool',
  initialState,
  reducers: {
    poolEntryLoaded(state, action: PayloadAction<PoolEntity[]>) {
      poolAdapter.upsertMany(state, action.payload);
    },
    poolEntryAddedToDeck(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const entry = state.entities[id];
      if (entry) {
        entry.addedToDeck = true;
      }
    },
    poolEntryRemovedFromDeck(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const entry = state.entities[id];
      if (entry) {
        entry.addedToDeck = false;
      }
    },
    poolCleared(state) {
      poolAdapter.removeAll(state);
    },
  },
});

export const {
  poolEntryLoaded,
  poolEntryAddedToDeck,
  poolEntryRemovedFromDeck,
  poolCleared,
} = poolSlice.actions;

export default poolSlice.reducer;

// Selectors
const selectPoolState = (state: RootState) => state.pool;

export const {
  selectAll: selectAllPoolEntries,
  selectById: selectPoolEntryById,
  selectEntities: selectPoolEntities,
} = poolAdapter.getSelectors(selectPoolState);

export const selectAllCardsInPool = createSelector(
  [selectAllPoolEntries, selectCardEntities],
  (poolEntries, cardEntities) =>
    poolEntries.map((poolEntry) => cardEntities[poolEntry.cardId]),
);

export const selectAllCardsRemainingInPool = createSelector(
  [selectAllPoolEntries, selectCardEntities],
  (poolEntries, cardEntities) =>
    poolEntries
      .filter((poolEntry) => !poolEntry.addedToDeck)
      .map((poolEntry) => cardEntities[poolEntry.cardId]),
);

export const selectAllCardsInDeck = createSelector(
  [selectAllPoolEntries, selectCardEntities],
  (poolEntries, cardEntities) =>
    poolEntries
      .filter((poolEntry) => poolEntry.addedToDeck)
      .map((poolEntry) => cardEntities[poolEntry.cardId]),
);

export const selectCardByPoolId = (state: RootState, poolId: string) => {
  const poolEntity = selectPoolEntryById(state, poolId);
  if (!poolEntity) return null;

  return selectCardEntryById(state, poolEntity.cardId);
};
