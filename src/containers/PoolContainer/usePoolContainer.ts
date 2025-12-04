import { useAppSelector } from '@/redux/hooks';
import { selectAllCardsRemainingInPool } from '@/redux/pool/poolSelectors';

const usePoolContainer = () => {
  //cardsInPool
  const cardsInPool = useAppSelector(selectAllCardsRemainingInPool);

  return { cardsInPool };
};

export default usePoolContainer;
