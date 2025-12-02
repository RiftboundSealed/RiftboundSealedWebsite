/**
 * File will be mainly used to fetch data. Currently, data is mocked.
 */

import type { SetDto } from '@/types/set';
import mockSets from '../../mockData/sets.json';

export const fetchSetsData = async (): Promise<SetDto[]> => {
  return mockSets as SetDto[];
};

export const fetchSetDataById = async (id: string): Promise<SetDto | null> => {
  const getSetData = mockSets.find((set) => set.id === id);
  return getSetData ? (getSetData as SetDto) : null;
};
