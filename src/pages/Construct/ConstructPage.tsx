import { Container, Box, Paper, Button } from '@mui/material';
import { type JSX } from 'react';

import Guardrail from '@/components/Guardrail/Guardrail';
import DeckContainer from '@/containers/DeckContainer/DeckContainer';
import PoolConstructContainer from '@/containers/PoolConstructContainer/PoolConstructContainer';
import RuneContainer from '@/containers/RuneContainer/RuneContainer';
import useConstructPage from './useConstructPage';

import './ConstructPage.css';

const ConstructPage = (): JSX.Element => {
  // Hooks
  const { hasAccess } = useConstructPage();

  return (
    <Guardrail canAccess={hasAccess} redirectTo="/">
      <Container className="construct-page">
        <Box className="construct-deck-grid">
          {/* Row 1, Col 1: Runes */}
          <Box className="construct-deck-runes-grid">
            <RuneContainer />
          </Box>
          {/* Row 1, Col 2: buttons only in the right column */}
          <Box className="construct-deck-buttons-cell">
            <Box className="construct-deck-buttons-row">
              <Button variant="contained">Export Pool</Button>
              <Button variant="contained" color="primary">
                Export Deck
              </Button>
            </Box>
          </Box>

          {/* Row 2, Col 1: Pool of cards */}
          <Paper className="construct-deck-section construct-deck-pool">
            <PoolConstructContainer />
          </Paper>

          {/* Row 2, Col 2: Deck list */}
          <Paper className="construct-deck-section construct-deck-list">
            <DeckContainer />
          </Paper>
        </Box>
      </Container>
    </Guardrail>
  );
};

export default ConstructPage;
