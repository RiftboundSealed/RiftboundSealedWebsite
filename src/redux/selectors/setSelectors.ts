import { setsAdapter } from '../slices/setSlice';
import type { RootState } from '../store/store';

const setsState = (state: RootState) => state.sets;

export const {
  selectAll: selectAllSetEntries,
  selectById: selectSetEntryById,
  selectEntities: selectSetEntities,
} = setsAdapter.getSelectors(setsState);
