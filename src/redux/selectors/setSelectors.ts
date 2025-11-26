import { setsAdapter } from '@/redux/slices/setSlice';
import type { RootState } from '@/redux/store/store';

const setsState = (state: RootState) => state.sets;

export const {
  selectAll: selectAllSetEntries,
  selectById: selectSetEntryById,
  selectEntities: selectSetEntities,
} = setsAdapter.getSelectors(setsState);
