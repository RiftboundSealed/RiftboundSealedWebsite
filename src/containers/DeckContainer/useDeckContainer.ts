import {
  selectAllCardsInDeck,
  selectDeckError,
} from '@/redux/deck/deckSelectors';
import { removeDeckEntry } from '@/redux/deck/deckSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removePoolEntryFromDeck } from '@/redux/pool/poolSlice';

const useDeckContainer = () => {
  const dispatch = useAppDispatch();

  // cardsInDeck
  const cardsInDeck = useAppSelector(selectAllCardsInDeck);

  // deckErrorMessage
  const deckErrorMessage = useAppSelector(selectDeckError);

  // removeFromDeck handler
  const removeFromDeck = (deckId: string, poolId: string | null) => {
    dispatch(removeDeckEntry({ id: deckId }));
    if (poolId) {
      dispatch(removePoolEntryFromDeck({ id: poolId }));
    }
  };

  return { cardsInDeck, deckErrorMessage, removeFromDeck };
};

export default useDeckContainer;
