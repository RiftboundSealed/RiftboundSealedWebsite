import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { type JSX } from 'react';
import { Link as RouterLink } from 'react-router';

import Guardrail from '@/components/Guardrail/Guardrail';
import PoolContainer from '@/containers/PoolContainer/PoolContainer';
import useUnpackPage from './useUnpackPage';
import './UnpackPage.css';

const UnpackPage = (): JSX.Element => {
  const { hasAccess } = useUnpackPage();

  return (
    <Guardrail canAccess={hasAccess} redirectTo="/">
      <Container className="unpack-page">
        <Box className="unpack-grid">
          {/* Row 1: packs (spans both columns) */}
          <Paper className="unpack-section unpack-packs">
            <Typography variant="h6" gutterBottom>
              PacksComponent
            </Typography>
          </Paper>

          {/* Row 2, col 1: pool of cards */}
          <Paper className="unpack-section unpack-pool">
            <PoolContainer />
          </Paper>

          {/* Row 2, col 2: unveiled cards */}
          <Paper className="unpack-section unpack-unpacked">
            <Typography variant="h6" gutterBottom>
              UnpackedCardsComponent
            </Typography>
          </Paper>

          {/* Row 3: buttons (span both columns) */}
          <Box className="unpack-buttons-cell">
            <Box className="unpack-buttons-row">
              <Button variant="contained">Export</Button>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/construct"
              >
                Construct
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Guardrail>
  );
};

export default UnpackPage;
