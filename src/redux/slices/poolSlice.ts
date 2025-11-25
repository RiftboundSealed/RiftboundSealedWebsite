import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { PoolEntity } from '@/types/pool';

export const poolAdapter = createEntityAdapter<PoolEntity>();
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
