import {
  AppBar,
  Toolbar,
  Container,
  type ContainerProps,
  Box,
  Button,
  Stack,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router';

import './ApplicationBar.css';
import { VITE_CDN_BASE_URL } from '@/consts/env';

interface AppBarProps {
  maxWidth?: ContainerProps['maxWidth'];
}

const ApplicationBar: React.FC<AppBarProps> = ({ maxWidth = 'xl' }) => {
  return (
    <AppBar position="static" className="application-bar">
      <Container maxWidth={maxWidth}>
        <Toolbar disableGutters>
          {/* Logo (clickable -> home) */}
          <Box
            component={RouterLink}
            to="/"
            aria-label="Go to home"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              mr: 2,
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={`${VITE_CDN_BASE_URL}/favicon/favicon.svg`}
              alt="Riftbound Sealed"
              sx={{
                width: 40,
                height: 40,
                display: 'block',
              }}
            />
          </Box>
          {/* Navigation buttons */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              key="home"
              component={RouterLink}
              to="/"
              size="small"
              variant="text"
              className="app-bar-nav-btn"
            >
              HOME
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ApplicationBar;
