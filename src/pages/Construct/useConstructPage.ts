import { useSelector } from 'react-redux';

import { selectHasCardData } from '@/redux/cards/cardsSelectors';
import { selectHasDeckData } from '@/redux/deck/deckSelectors';
import { selectHasPoolData } from '@/redux/pool/poolSelectors';
import { selectHasSetData } from '@/redux/sets/setsSelectors';

export const useHasAccess = () => {
  const hasSetData = useSelector(selectHasSetData);
  const hasCardData = useSelector(selectHasCardData);
  const hasPoolData = useSelector(selectHasPoolData);
  const hasDeckData = useSelector(selectHasDeckData);

  return hasSetData && hasCardData && hasPoolData && !hasDeckData;
};
