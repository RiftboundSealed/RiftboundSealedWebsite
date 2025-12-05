import { useSelector } from 'react-redux';

import { selectHasCardData } from '@/redux/cards/cardsSelectors';
import { useAppSelector } from '@/redux/hooks';
import {
  selectAllCardsInPool,
  selectHasPoolData,
} from '@/redux/pool/poolSelectors';
import { selectHasSetData } from '@/redux/sets/setsSelectors';

const useConstructPage = () => {
  // hasAccess
  const hasSetData = useSelector(selectHasSetData);
  const hasCardData = useSelector(selectHasCardData);
  const hasPoolData = useSelector(selectHasPoolData);
  const hasAccess = hasSetData && hasCardData && hasPoolData;

  // allCardsInPool
  const allCardsInPool = useAppSelector(selectAllCardsInPool);

  return { hasAccess, allCardsInPool };
};

export default useConstructPage;
