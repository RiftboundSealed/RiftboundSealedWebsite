import { tryAddCardToDeck } from '@/redux/deck/deckThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectAllCardsRemainingInPool,
  selectAllCardsInPool,
} from '@/redux/pool/poolSelectors';

const usePoolConstructContainer = () => {
  const dispatch = useAppDispatch();

  // cardsRemainingInPool
  const cardsRemainingInPool = useAppSelector(selectAllCardsRemainingInPool);

  // allCardsInPool
  const allCardsInPool = useAppSelector(selectAllCardsInPool);

  // addToDeck function
  const handleAddToDeck = (cardId: string, poolId: string) => {
    dispatch(tryAddCardToDeck(cardId, poolId));
  };

  return { cardsRemainingInPool, allCardsInPool, handleAddToDeck };
};

export default usePoolConstructContainer;
