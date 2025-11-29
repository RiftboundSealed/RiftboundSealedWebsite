import { useSelector } from 'react-redux';

import { selectHasCardData } from '@/redux/cards/cardsSelectors';
import { selectHasDeckData } from '@/redux/deck/deckSelectors';
import { selectHasPoolData } from '@/redux/pool/poolSelectors';
import { selectHasSetData } from '@/redux/sets/setsSelectors';

const useUnpackPage = () => {
  const hasSetData = useSelector(selectHasSetData);
  const hasCardData = useSelector(selectHasCardData);
  const hasPoolData = useSelector(selectHasPoolData);
  const hasDeckData = useSelector(selectHasDeckData);
  const hasAccess = hasSetData && !hasCardData && !hasPoolData && !hasDeckData;

  return { hasAccess };
};

export default useUnpackPage;
