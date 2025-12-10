import { selectAllCardsInDeck } from '@/redux/deck/deckSelectors';
import { removeDeckEntry } from '@/redux/deck/deckSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removePoolEntryFromDeck } from '@/redux/pool/poolSlice';

const useDeckContainer = () => {
  const dispatch = useAppDispatch();

  // cardsInDeck
  const cardsInDeck = useAppSelector(selectAllCardsInDeck);

  // removeFromDeck handler
  const handleRemoveFromDeck = (deckId: string, poolId: string | null) => {
    dispatch(removeDeckEntry({ id: deckId }));
    if (poolId) {
      dispatch(removePoolEntryFromDeck({ id: poolId }));
    }
  };

  return { cardsInDeck, handleRemoveFromDeck };
};

export default useDeckContainer;
