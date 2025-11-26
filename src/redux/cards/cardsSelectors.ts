import { cardsAdapter } from '@/redux/cards/cardsSlice';
import type { RootState } from '@/redux/store';

const selectCardsState = (state: RootState) => state.cards;

export const {
  selectAll: selectAllCardEntries,
  selectById: selectCardEntryById,
  selectEntities: selectCardEntities,
} = cardsAdapter.getSelectors(selectCardsState);
