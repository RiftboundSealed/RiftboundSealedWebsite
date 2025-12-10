import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useState, type JSX } from 'react';
import { Link as RouterLink } from 'react-router';

import CardsPanel from '@/components/CardsPanel/CardsPanel';
import ExportCardsTextDialog from '@/components/ExportCardsTextDialog/ExportCardsTextDialog';
import Guardrail from '@/components/Guardrail/Guardrail';
import UnopenedPacksPanel from '@/components/UnopenedPacksPanel/UnopenedPacksPanel';
import PoolStaticContainer from '@/containers/PoolStaticContainer/PoolStaticContainer';
import { unpackCards } from '@/services/cards/cardsGenerate';
import type { CardDto } from '@/types/card';
import useUnpackPage from './useUnpackPage';

import './UnpackPage.css';

const UnpackPage = (): JSX.Element => {
  // Constants
  const INITIAL_UNOPENED_PACKS_COUNT = 6;
  const PACK_PANEL_HEIGHT = 450;

  // State
  const [numOfUnopenedPacks, setNumOfUnopenedPacks] = useState<number>(
    INITIAL_UNOPENED_PACKS_COUNT,
  );
  const [unpackedCards, setUnpackedCards] = useState<CardDto[]>([]);
  const [exportDialogOpen, setExportDialogOpen] = useState<boolean>(false);

  // Hooks
  const { hasAccess, selectedSet, allCardsInPool, handleAddCardsToPool } =
    useUnpackPage();

  // Locals
  const handlePackClick = async () => {
    try {
      if (numOfUnopenedPacks > 0 && selectedSet?.id) {
        setNumOfUnopenedPacks((prev) => Math.max(0, prev - 1));
        const cardsUnpacked = await unpackCards(selectedSet?.id);
        setUnpackedCards(cardsUnpacked);
        handleAddCardsToPool(cardsUnpacked);
      }
    } catch (error) {
      console.error('Error unpacking cards:', error);
    }
  };
  const handleOpenExportDialog = () => setExportDialogOpen(true);
  const handleCloseExportDialog = () => setExportDialogOpen(false);

  return (
    <Guardrail canAccess={hasAccess} redirectTo="/">
      <Container className="unpack-page" disableGutters>
        <Box
          className="unpack-grid"
          style={{
            // 3 rows:
            // 1) packs & opened cards
            // 2) buttons (span both columns)
            // 3) pool of cards (span both columns)
            gridTemplateRows: `
              minmax(${PACK_PANEL_HEIGHT}px, auto)
              minmax(80px, auto)
              minmax(0, auto)
            `,
          }}
        >
          {/* Row 1, col 1: packs*/}
          <Paper className="unpack-section unpack-packs">
            <UnopenedPacksPanel
              unopenedPacksCount={numOfUnopenedPacks}
              packImageUrl={selectedSet?.packImageUrl}
              onClick={handlePackClick}
            />
          </Paper>

          {/* Row 1, col 2: unveiled cards */}
          <Paper className="unpack-section unpack-opened-cards">
            {unpackedCards.length > 0 ? (
              <CardsPanel
                cardImageUrls={unpackedCards.map((card) => ({
                  id: card.id,
                  cardId: card.id,
                  imageUrl: card.thumbnailUrl,
                  name: card.name,
                }))}
                cardWidth={150}
                cardHeight={210}
              />
            ) : (
              <Typography variant="h4" align="center">
                Unpacked cards go here
              </Typography>
            )}
          </Paper>

          {/* Row 2: buttons (span both columns) */}
          <Box className="unpack-buttons-cell">
            <Box className="unpack-buttons-row">
              <Button
                variant="contained"
                color="primary"
                disabled={numOfUnopenedPacks > 0}
                onClick={handleOpenExportDialog}
              >
                Export Pool
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/construct"
                disabled={numOfUnopenedPacks > 0}
              >
                Construct
              </Button>
            </Box>
          </Box>

          {/* Row 3: pool of cards (span both columns) */}
          <Paper className="unpack-section unpack-pool">
            <PoolStaticContainer />
          </Paper>
        </Box>
      </Container>
      {/* Export Dialog */}
      <ExportCardsTextDialog
        open={exportDialogOpen}
        onClose={handleCloseExportDialog}
        cardsMainDeck={allCardsInPool.map((card) => ({
          id: card.id,
          name: card.name,
        }))}
        title="Export Pool as Text"
      />
    </Guardrail>
  );
};

export default UnpackPage;
