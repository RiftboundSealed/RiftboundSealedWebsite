import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { CardDto } from '@/types/card';
import type { RootState } from '../store/store';

const cardsAdapter = createEntityAdapter<CardDto>();
const initialState = cardsAdapter.getInitialState();

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    cardsUpserted(state, action: PayloadAction<CardDto[]>) {
      cardsAdapter.upsertMany(state, action.payload);
    },
    cardsCleared(state) {
      cardsAdapter.removeAll(state);
    },
  },
});

export const { cardsUpserted, cardsCleared } = cardsSlice.actions;

export default cardsSlice.reducer;

// Selectors
const selectCardsState = (state: RootState) => state.cards;

export const {
  selectAll: selectAllCardEntries,
  selectById: selectCardEntryById,
  selectEntities: selectCardEntities,
} = cardsAdapter.getSelectors(selectCardsState);
