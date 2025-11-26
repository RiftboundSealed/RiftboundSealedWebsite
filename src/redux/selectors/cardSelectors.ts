import { cardsAdapter } from '@/redux/slices/cardSlice';
import type { RootState } from '@/redux/store/store';

const selectCardsState = (state: RootState) => state.cards;

export const {
  selectAll: selectAllCardEntries,
  selectById: selectCardEntryById,
  selectEntities: selectCardEntities,
} = cardsAdapter.getSelectors(selectCardsState);
