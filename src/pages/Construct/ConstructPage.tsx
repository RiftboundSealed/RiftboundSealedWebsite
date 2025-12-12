import { Container, Box, Paper, Button } from '@mui/material';
import { useState, type JSX } from 'react';

import DialogError from '@/components/DialogError/DialogError';
import DialogExportCardsText from '@/components/DialogExportCardsText/DialogExportCardsText';
import Guardrail from '@/components/Guardrail/Guardrail';
import DeckContainer from '@/containers/DeckContainer/DeckContainer';
import PoolConstructContainer from '@/containers/PoolConstructContainer/PoolConstructContainer';
import RuneContainer from '@/containers/RuneContainer/RuneContainer';
import useConstructPage from './useConstructPage';

import './ConstructPage.css';

const ConstructPage = (): JSX.Element => {
  // State
  const [exportCardsDialogOpen, setExportCardsDialogOpen] =
    useState<boolean>(false);
  const [dialogErrorOpen, setDialogErrorOpen] = useState<boolean>(false);
  const [exportType, setExportType] = useState<'pool' | 'deck'>('pool');

  // Hooks
  const {
    hasAccess,
    allCardsInPool,
    allCardsInDeck,
    cardsRemainingInPool,
    deckErrorMessage,
    isDeckLegal,
  } = useConstructPage();

  // Event Handlers
  const handleExportPoolButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.currentTarget.blur(); // Remove focus from button after click
    setExportType('pool');
    setExportCardsDialogOpen(true);
  };
  const handleExportDeckButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.currentTarget.blur(); // Remove focus from button after click
    const isLegal = isDeckLegal();
    if (isLegal) {
      setExportType('deck');
      setExportCardsDialogOpen(true);
    } else {
      setDialogErrorOpen(true);
    }
  };
  const handleExportDialogClose = () => setExportCardsDialogOpen(false);
  const handleErrorDialogClose = () => setDialogErrorOpen(false);

  return (
    <Guardrail canAccess={hasAccess} redirectTo="/">
      <Container className="construct-page" disableGutters>
        <Box className="construct-deck-grid">
          {/* Row 1, Col 1: Runes */}
          <Box className="construct-deck-runes-grid">
            <RuneContainer />
          </Box>
          {/* Row 1, Col 2: buttons only in the right column */}
          <Box className="construct-deck-buttons-cell">
            <Box className="construct-deck-buttons-row">
              <Button
                variant="contained"
                color="primary"
                onClick={handleExportPoolButtonClick}
              >
                Export Pool
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleExportDeckButtonClick}
              >
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
      {/* Export Dialog */}
      <DialogExportCardsText
        open={exportCardsDialogOpen}
        onClose={handleExportDialogClose}
        cardsMainDeck={
          exportType === 'pool'
            ? allCardsInPool.map((card) => ({
                id: card.id,
                name: card.name,
              }))
            : allCardsInDeck.map((card) => ({
                id: card.id,
                name: card.name,
              }))
        }
        cardsSideboard={
          exportType === 'deck'
            ? cardsRemainingInPool.map((card) => ({
                id: card.id,
                name: card.name,
              }))
            : []
        }
        title={
          exportType === 'pool' ? 'Export Pool as Text' : 'Export Deck as Text'
        }
      />
      {/* Dialog Error for illegal deck */}
      <DialogError
        value={deckErrorMessage || ''}
        open={dialogErrorOpen}
        onClose={handleErrorDialogClose}
        title={'Illegal Deck'}
      />
    </Guardrail>
  );
};

export default ConstructPage;
