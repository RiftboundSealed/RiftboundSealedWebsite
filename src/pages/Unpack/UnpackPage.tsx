import { Box, Button, Container, Paper } from '@mui/material';
import { useState, type JSX } from 'react';
import { Link as RouterLink } from 'react-router';

import Guardrail from '@/components/Guardrail/Guardrail';
import OpenedCardsPanel from '@/components/OpenedCardsPanel/OpenedCardsPanel';
import UnopenedPacksPanel from '@/components/UnopenedPacksPanel/UnopenedPacksPanel';
import PoolContainer from '@/containers/PoolContainer/PoolContainer';
import { unpackCards } from '@/services/cards/cardsGenerate';
import type { CardDto } from '@/types/card';
import useUnpackPage from './useUnpackPage';

import './UnpackPage.css';

const UnpackPage = (): JSX.Element => {
  const INITIAL_UNOPENED_PACKS_COUNT = 6;
  const [numOfUnopenedPacks, setNumOfUnopenedPacks] = useState<number>(
    INITIAL_UNOPENED_PACKS_COUNT,
  );
  const [unpackedCards, setUnpackedCards] = useState<CardDto[]>([]);
  const { hasAccess, selectedSet } = useUnpackPage();

  const handlePackClick = async () => {
    setNumOfUnopenedPacks((prev) => Math.max(0, prev - 1));
    setUnpackedCards(await unpackCards(selectedSet?.id));
  };

  return (
    <Guardrail canAccess={hasAccess} redirectTo="/">
      <Container className="unpack-page">
        <Box className="unpack-grid">
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
            <OpenedCardsPanel
              cardImageUrls={unpackedCards.map((card) => card.thumbnailUrl)}
            />
          </Paper>

          {/* Row 2: buttons (span both columns) */}
          <Box className="unpack-buttons-cell">
            <Box className="unpack-buttons-row">
              <Button
                variant="contained"
                color="primary"
                disabled={numOfUnopenedPacks > 0}
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
            <PoolContainer />
          </Paper>
        </Box>
      </Container>
    </Guardrail>
  );
};

export default UnpackPage;
