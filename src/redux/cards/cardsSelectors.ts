import { cardsAdapter } from '@/redux/cards/cardsSlice';
import type { RootState } from '@/redux/store';

const selectCardsState = (state: RootState) => state.cards;

export const {
  selectAll: selectAllCardEntries,
  selectById: selectCardEntryById,
  selectEntities: selectCardEntities,
} = cardsAdapter.getSelectors(selectCardsState);

export const selectHasCardData = (state: RootState): boolean => {
  return state.cards.ids.length > 0;
};
