import { useAppSelector } from '@/redux/hooks';
import {
  selectAllSetEntries,
  selectHasSetData,
} from '@/redux/sets/setsSelectors';

const useUnpackPage = () => {
  // hasAccess
  const hasSetData = useAppSelector(selectHasSetData);
  const hasAccess = hasSetData;

  // useSelectedSet
  const useSelectedSet = () => useAppSelector(selectAllSetEntries)[0] || null;

  return { hasAccess, useSelectedSet };
};

export default useUnpackPage;
