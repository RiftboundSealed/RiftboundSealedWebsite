import { useAppDispatch } from '@/redux/hooks';
import { addSets } from '@/redux/sets/setsSlice';
import { fetchSetDataById } from '@/services/sets/setsApi';

const useSelectSetContainer = () => {
  const dispatch = useAppDispatch();

  // setSealedDeck
  const setSealedDeck = async (selectedSetId: string | null) => {
    if (!selectedSetId) return;
    const set = await fetchSetDataById(selectedSetId);
    if (set) {
      dispatch(addSets([set]));
    } else {
      console.error(`Set with id ${selectedSetId} not found.`);
    }
  };

  return { setSealedDeck };
};

export default useSelectSetContainer;
