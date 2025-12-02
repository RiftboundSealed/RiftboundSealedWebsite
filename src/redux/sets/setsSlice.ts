import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { SetDto } from '@/types/set';

export const setsAdapter = createEntityAdapter<SetDto>();
const initialState = setsAdapter.getInitialState();

const setsSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {
    addSets(state, action: PayloadAction<SetDto[]>) {
      setsAdapter.addMany(state, action.payload);
    },
    clearSets(state) {
      setsAdapter.removeAll(state);
    },
  },
});

export const { addSets, clearSets } = setsSlice.actions;

export default setsSlice.reducer;
