import { setsAdapter } from '@/redux/sets/setsSlice';
import type { RootState } from '@/redux/store';

const setsState = (state: RootState) => state.sets;

export const {
  selectAll: selectAllSetEntries,
  selectById: selectSetEntryById,
  selectEntities: selectSetEntities,
} = setsAdapter.getSelectors(setsState);

export const selectHasSetData = (state: RootState): boolean => {
  return state.sets.ids.length > 0;
};
