import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { type JSX } from 'react';
import { Link as RouterLink } from 'react-router';

import Counter from '@/components/Counter';

import './SelectSetContainer.css';

const SelectSetContainer = (): JSX.Element => {
  return (
    <Container className="select-set-container">
      <Paper elevation={3} className="select-set-paper">
        <Typography variant="h2" component="h1" gutterBottom>
          Riftbound Sealed Website
        </Typography>

        <Typography variant="body1" paragraph>
          A website that simulates the deck registration and construction
          experience for players to practice the sealed deck format.
        </Typography>

        <Box className="select-set-counter-section">
          <Typography variant="h4" gutterBottom>
            Redux Counter Example
          </Typography>
          <Counter />
        </Box>

        <Box className="select-set-button-row">
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/unpack"
          >
            Begin Sealed Deck
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SelectSetContainer;
