import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import React from 'react';
import { Routes, Route } from 'react-router';

import CardList from './containers/CardList';
import ConstructPage from './pages/Construct/ConstructPage';
import HomePage from './pages/Home/HomePage';
import UnpackPage from './pages/Unpack/UnpackPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },

  // custom breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200, // you can leave this
      xl: 1600, // <- make xl 1600px
    },
  },

  // make all <Container /> default to this width
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl', // <- use the 1600px breakpoint
      },
    },
  },
});

const App = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Riftbound Sealed
          </Typography>
        </Toolbar>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab label="Home" />
          <Tab label="Cards" />
        </Tabs>
      </AppBar>
      <Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cards" element={<CardList />} />
          <Route path="/unpack" element={<UnpackPage />} />
          <Route path="/construct" element={<ConstructPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
