// DEPRECATED: Remove after example components are deleted.
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface ExampleState {
  value: number;
  text: string;
}

const initialState: ExampleState = {
  value: 0,
  text: 'Hello World',
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, setText } =
  exampleSlice.actions;

// Selectors
export const selectValue = (state: RootState) => state.example.value;
export const selectText = (state: RootState) => state.example.text;

export default exampleSlice.reducer;
