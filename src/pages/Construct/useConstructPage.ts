import { selectHasCardData } from '@/redux/cards/cardsSelectors';
import {
  selectAllCardsInDeck,
  selectDeckError,
} from '@/redux/deck/deckSelectors';
import { checkLegalDeck } from '@/redux/deck/deckThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectAllCardsInPool,
  selectAllCardsRemainingInPool,
  selectHasPoolData,
} from '@/redux/pool/poolSelectors';
import { selectHasSetData } from '@/redux/sets/setsSelectors';

const useConstructPage = () => {
  const dispatch = useAppDispatch();

  // hasAccess
  const hasSetData = useAppSelector(selectHasSetData);
  const hasCardData = useAppSelector(selectHasCardData);
  const hasPoolData = useAppSelector(selectHasPoolData);
  const hasAccess = hasSetData && hasCardData && hasPoolData;

  // allCardsInPool
  const allCardsInPool = useAppSelector(selectAllCardsInPool);

  // allCardsInDeck
  const allCardsInDeck = useAppSelector(selectAllCardsInDeck);

  // cardsRemainingInPool
  const cardsRemainingInPool = useAppSelector(selectAllCardsRemainingInPool);

  // deckErrorMessage
  const deckErrorMessage = useAppSelector(selectDeckError);

  // handleCheckLegalDeck
  const handleCheckLegalDeck = () => dispatch(checkLegalDeck());

  return {
    hasAccess,
    allCardsInPool,
    allCardsInDeck,
    cardsRemainingInPool,
    deckErrorMessage,
    handleCheckLegalDeck,
  };
};

export default useConstructPage;
