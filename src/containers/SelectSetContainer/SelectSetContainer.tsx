import { Box, Button } from '@mui/material';
import { useEffect, useState, type JSX } from 'react';
import { Link as RouterLink } from 'react-router';

import RadioGroupSet from '@/components/RadioGroupSet/RadioGroupSet';
import { fetchSetsData } from '@/services/sets/setsApi';
import type { SetDto } from '@/types/set';
import './SelectSetContainer.css';
import useSelectSetContainer from './useSelectSetContainer';

const SelectSetContainer = (): JSX.Element => {
  // State
  const [sets, setSets] = useState<SetDto[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);

  // Hooks
  const { setSealedDeck } = useSelectSetContainer();
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSetsData();
        setSets(data);
      } catch (error) {
        console.error('Error fetching sets data:', error);
      }
    })();
  }, []);

  // Event Handlers
  const handleBeginSealedDeckButtonClick = () => {
    if (selectedSetId) {
      setSealedDeck(selectedSetId);
    }
  };

  return (
    <>
      <Box className="select-set-counter-section">
        <RadioGroupSet
          sets={sets}
          value={selectedSetId}
          onChange={setSelectedSetId}
        />
      </Box>
      <Box className="select-set-button-row">
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/unpack"
          disabled={!selectedSetId}
          onClick={handleBeginSealedDeckButtonClick}
        >
          Begin Sealed Deck
        </Button>
      </Box>
    </>
  );
};

export default SelectSetContainer;
