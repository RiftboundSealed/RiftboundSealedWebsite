import { useAppSelector } from '@/redux/hooks';
import { selectAllCardsInPool } from '@/redux/pool/poolSelectors';

const usePoolStaticContainer = () => {
  // allCardsInPool
  const allCardsInPool = useAppSelector(selectAllCardsInPool);

  return { allCardsInPool };
};

export default usePoolStaticContainer;
