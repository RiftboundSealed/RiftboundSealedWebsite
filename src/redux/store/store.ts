import { configureStore } from '@reduxjs/toolkit';

import cardsReducer from '../slices/cardSlice';
import deckReducer from '../slices/deckSlice';
import exampleReducer from '../slices/exampleSlice';
import poolReducer from '../slices/poolSlice';
import setsReducer from '../slices/setSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer, // Remove after example is deleted
    sets: setsReducer,
    cards: cardsReducer,
    pool: poolReducer,
    deck: deckReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
