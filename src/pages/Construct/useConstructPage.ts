import { selectHasCardData } from '@/redux/cards/cardsSelectors';
import { useAppSelector } from '@/redux/hooks';
import {
  selectAllCardsInPool,
  selectHasPoolData,
} from '@/redux/pool/poolSelectors';
import { selectHasSetData } from '@/redux/sets/setsSelectors';

const useConstructPage = () => {
  // hasAccess
  const hasSetData = useAppSelector(selectHasSetData);
  const hasCardData = useAppSelector(selectHasCardData);
  const hasPoolData = useAppSelector(selectHasPoolData);
  const hasAccess = hasSetData && hasCardData && hasPoolData;

  // allCardsInPool
  const allCardsInPool = useAppSelector(selectAllCardsInPool);

  return { hasAccess, allCardsInPool };
};

export default useConstructPage;
