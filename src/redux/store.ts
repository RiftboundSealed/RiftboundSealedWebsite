import { configureStore } from '@reduxjs/toolkit';

import cardsReducer from '@/redux/cards/cardsSlice';
import deckReducer from '@/redux/deck/deckSlice';
import exampleReducer from '@/redux/example/exampleSlice';
import poolReducer from '@/redux/pool/poolSlice';
import setsReducer from '@/redux/sets/setsSlice';

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
