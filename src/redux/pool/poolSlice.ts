import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { PoolEntity } from '@/types/pool';

export const poolAdapter = createEntityAdapter<PoolEntity>();
const initialState = poolAdapter.getInitialState();

const poolSlice = createSlice({
  name: 'pool',
  initialState,
  reducers: {
    addPoolEntries(state, action: PayloadAction<PoolEntity[]>) {
      poolAdapter.upsertMany(state, action.payload);
    },
    addPoolEntryToDeck(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const entry = state.entities[id];
      if (entry) {
        entry.addedToDeck = true;
      }
    },
    removePoolEntryFromDeck(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const entry = state.entities[id];
      if (entry) {
        entry.addedToDeck = false;
      }
    },
    clearPool(state) {
      poolAdapter.removeAll(state);
    },
  },
});

export const {
  addPoolEntries,
  addPoolEntryToDeck,
  removePoolEntryFromDeck,
  clearPool,
} = poolSlice.actions;

export default poolSlice.reducer;
