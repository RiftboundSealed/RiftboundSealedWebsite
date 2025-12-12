import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useState, type JSX } from 'react';
import { Link as RouterLink } from 'react-router';

import DialogExportCardsText from '@/components/DialogExportCardsText/DialogExportCardsText';
import Guardrail from '@/components/Guardrail/Guardrail';
import PanelCards from '@/components/PanelCards/PanelCards';
import PanelUnopenedPacks from '@/components/PanelUnopenedPacks/PanelUnopenedPacks';
import { NUMBER_PACKS_TO_OPEN } from '@/consts/set';
import PoolStaticContainer from '@/containers/PoolStaticContainer/PoolStaticContainer';
import { unpackCards } from '@/services/cards/cardsGenerate';
import type { CardDto } from '@/types/card';
import useUnpackPage from './useUnpackPage';

import './UnpackPage.css';

const UnpackPage = (): JSX.Element => {
  // Constants
  const PACK_PANEL_HEIGHT_PX = 450;

  // State
  const [numOfUnopenedPacks, setNumOfUnopenedPacks] =
    useState<number>(NUMBER_PACKS_TO_OPEN);
  const [unpackedCards, setUnpackedCards] = useState<CardDto[]>([]);
  const [exportDialogOpen, setExportDialogOpen] = useState<boolean>(false);

  // Hooks
  const { hasAccess, selectedSet, allCardsInPool, handleAddCardsToPool } =
    useUnpackPage();

  // Event Handlers
  const onClickPack = async () => {
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
  const onClickOpenDialogExport = () => setExportDialogOpen(true);
  const onClickCloseDialogExport = () => setExportDialogOpen(false);

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
              minmax(${PACK_PANEL_HEIGHT_PX}px, auto)
              minmax(80px, auto)
              minmax(0, auto)
            `,
          }}
        >
          {/* Row 1, col 1: packs*/}
          <Paper className="unpack-section unpack-packs">
            <PanelUnopenedPacks
              unopenedPacksCount={numOfUnopenedPacks}
              packImageUrl={selectedSet?.packImageUrl}
              onClick={onClickPack}
            />
          </Paper>

          {/* Row 1, col 2: unveiled cards */}
          <Paper className="unpack-section unpack-opened-cards">
            {unpackedCards.length > 0 ? (
              <PanelCards
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
                onClick={onClickOpenDialogExport}
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
      <DialogExportCardsText
        open={exportDialogOpen}
        onClose={onClickCloseDialogExport}
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
