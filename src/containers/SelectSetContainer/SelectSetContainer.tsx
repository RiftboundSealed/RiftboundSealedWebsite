import { Box, Button } from '@mui/material';
import { useEffect, useState, type JSX } from 'react';
import { Link as RouterLink } from 'react-router';

import SetRadioGroup from '@/components/SetRadioGroup/SetRadioGroup';
import { fetchSetsData } from '@/services/sets/setsApi';
import type { SetDto } from '@/types/set';
import './SelectSetContainer.css';
import useSelectSetContainer from './useSelectSetContainer';

const SelectSetContainer = (): JSX.Element => {
  const [sets, setSets] = useState<SetDto[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);

  const { handleBeginSealedDeck } = useSelectSetContainer();

  useEffect(() => {
    (async () => {
      const data = await fetchSetsData();
      setSets(data);
    })();
  }, []);

  return (
    <>
      <Box className="select-set-counter-section">
        <SetRadioGroup
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
          onClick={() => handleBeginSealedDeck(selectedSetId)}
        >
          Begin Sealed Deck
        </Button>
      </Box>
    </>
  );
};

export default SelectSetContainer;
