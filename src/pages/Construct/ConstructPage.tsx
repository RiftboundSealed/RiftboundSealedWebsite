import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { type JSX } from 'react';

import Guardrail from '@/components/Guardrail/Guardrail';
import PoolContainer from '@/containers/PoolContainer/PoolContainer';
import useConstructPage from './useConstructPage';
import './ConstructPage.css';

const ConstructPage = (): JSX.Element => {
  const { hasAccess } = useConstructPage();

  return (
    <Guardrail canAccess={hasAccess} redirectTo="/">
      <Container className="construct-deck-container">
        <Box className="construct-deck-grid">
          {/* Row 1, Col 1: Pool of cards */}
          <Paper className="construct-deck-section construct-deck-pool">
            <PoolContainer />
          </Paper>

          {/* Row 1, Col 2: Deck list */}
          <Paper className="construct-deck-section construct-deck-list">
            <Typography variant="h5" gutterBottom>
              DeckComponent
            </Typography>
          </Paper>

          {/* Row 2, Col 2: buttons only in the right column */}
          <Box className="construct-deck-buttons-cell">
            <div className="construct-deck-buttons-row">
              <Button variant="contained">Export Pool</Button>
              <Button variant="contained" color="primary">
                Export Deck
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </Guardrail>
  );
};

export default ConstructPage;
