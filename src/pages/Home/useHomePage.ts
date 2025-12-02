import { clearCards } from '@/redux/cards/cardsSlice';
import { clearDeck } from '@/redux/deck/deckSlice';
import { useAppDispatch } from '@/redux/hooks';
import { clearPool } from '@/redux/pool/poolSlice';
import { clearSets } from '@/redux/sets/setsSlice';

const useHomePage = () => {
  const dispatch = useAppDispatch();

  const handleResetState = () => {
    dispatch(clearSets());
    dispatch(clearCards());
    dispatch(clearPool());
    dispatch(clearDeck());
  };

  return { handleResetState };
};

export default useHomePage;
