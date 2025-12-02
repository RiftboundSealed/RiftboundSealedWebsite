import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { CardDto } from '@/types/card';

export const cardsAdapter = createEntityAdapter<CardDto>();
const initialState = cardsAdapter.getInitialState();

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    upsertCards(state, action: PayloadAction<CardDto[]>) {
      cardsAdapter.upsertMany(state, action.payload);
    },
    clearCards(state) {
      cardsAdapter.removeAll(state);
    },
  },
});

export const { upsertCards, clearCards } = cardsSlice.actions;

export default cardsSlice.reducer;
