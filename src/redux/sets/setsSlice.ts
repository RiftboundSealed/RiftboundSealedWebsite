import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { SetDto } from '@/types/set';

export const setsAdapter = createEntityAdapter<SetDto>();
const initialState = setsAdapter.getInitialState();

const setsSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {
    setsToggled(state, action: PayloadAction<SetDto>) {
      const { id } = action.payload;
      const exists = state.ids.includes(id);
      if (exists) {
        setsAdapter.removeOne(state, id);
      } else {
        setsAdapter.addOne(state, action.payload);
      }
    },
    setsCleared(state) {
      setsAdapter.removeAll(state);
    },
  },
});

export const { setsToggled, setsCleared } = setsSlice.actions;

export default setsSlice.reducer;
