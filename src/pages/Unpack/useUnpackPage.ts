import { useAppSelector } from '@/redux/hooks';
import {
  selectAllSetEntries,
  selectHasSetData,
} from '@/redux/sets/setsSelectors';

const useUnpackPage = () => {
  // hasAccess
  const hasSetData = useAppSelector(selectHasSetData);
  const hasAccess = hasSetData;

  // selectedSet
  const selectedSet = useAppSelector(selectAllSetEntries)[0] || null;

  return { hasAccess, selectedSet };
};

export default useUnpackPage;
