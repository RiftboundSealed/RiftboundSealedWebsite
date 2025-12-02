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
    clearDeck(state) {
      deckAdapter.removeAll(state);
      state.error = null;
    },
    addDeckEntry(state, action: PayloadAction<DeckEntity>) {
      deckAdapter.addOne(state, action.payload);
      state.error = null;
    },
    removeDeckEntry(state, action: PayloadAction<{ id: string }>) {
      deckAdapter.removeOne(state, action.payload.id);
      state.error = null;
    },
    addDeckErrorMessage(state, action: PayloadAction<{ message: string }>) {
      state.error = action.payload.message;
    },
    clearDeckErrorMessage(state) {
      state.error = null;
    },
  },
});

export const {
  clearDeck,
  addDeckEntry,
  removeDeckEntry,
  addDeckErrorMessage,
  clearDeckErrorMessage,
} = deckSlice.actions;

export default deckSlice.reducer;
