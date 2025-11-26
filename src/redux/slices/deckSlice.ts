import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { DeckEntity } from '@/types/deck';

export const deckAdapter = createEntityAdapter<DeckEntity>();
type DeckState = ReturnType<typeof deckAdapter.getInitialState> & {
  error: string | null;
};
const initialState: DeckState = {
  ...deckAdapter.getInitialState(),
  error: null,
};

const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    deckCleared(state) {
      deckAdapter.removeAll(state);
      state.error = null;
    },
    deckEntryAdded(state, action: PayloadAction<DeckEntity>) {
      deckAdapter.addOne(state, action.payload);
      state.error = null;
    },
    deckEntryRemoved(state, action: PayloadAction<{ id: string }>) {
      deckAdapter.removeOne(state, action.payload.id);
      state.error = null;
    },
    deckAddRejected(state, action: PayloadAction<{ message: string }>) {
      state.error = action.payload.message;
    },
    deckErrorCleared(state) {
      state.error = null;
    },
  },
});

export const {
  deckCleared,
  deckEntryAdded,
  deckEntryRemoved,
  deckAddRejected,
  deckErrorCleared,
} = deckSlice.actions;

export default deckSlice.reducer;
