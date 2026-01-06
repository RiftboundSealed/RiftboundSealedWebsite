import { Box, Container, Paper, Typography } from '@mui/material';
import { useEffect, type JSX } from 'react';

import SelectSetContainer from '@/containers/SelectSetContainer/SelectSetContainer';
import useHomePage from './useHomePage';
import './HomePage.css';

const HomePage = (): JSX.Element => {
  const { resetState } = useHomePage();

  // Run only once when the page mounts
  useEffect(() => {
    resetState();
  }, [resetState]);

  return (
    <Container className="home-page" disableGutters>
      <Paper elevation={3} className="home-page-paper">
        <Box className="home-page-grid">
          <Box className="home-page-welcome">
            <Typography variant="h2" component="h1" gutterBottom>
              Riftbound Sealed
            </Typography>

            <Typography variant="body1" component="p" gutterBottom>
              Simulate and practice for your sealed deck competitions! Choose
              your set below to get started.
            </Typography>
          </Box>
          <Box className="home-page-select-set-container">
            <SelectSetContainer />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
