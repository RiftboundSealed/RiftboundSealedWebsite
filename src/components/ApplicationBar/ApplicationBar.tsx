import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Container,
  type ContainerProps,
  Box,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router';

import './ApplicationBar.css';
import { VITE_CDN_BASE_URL } from '@/consts/env';

interface AppBarProps {
  tabValue: number;
  onChangeTab?: (_event: React.SyntheticEvent, newValue: number) => void;
  maxWidth?: ContainerProps['maxWidth'];
}

const ApplicationBar: React.FC<AppBarProps> = ({
  tabValue,
  onChangeTab,
  maxWidth = 'xl',
}) => {
  // Event handler
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    onChangeTab?.(_event, newValue);
  };

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
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab
              label="Home"
              component={RouterLink}
              to="/"
              value={0}
              aria-label="Navigate to home page"
            />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ApplicationBar;
