import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import React from 'react';
import { Routes, Route } from 'react-router';

import ApplicationBar from '@/components/ApplicationBar/ApplicationBar';
import ConstructPage from './pages/Construct/ConstructPage';
import HomePage from './pages/Home/HomePage';
import UnpackPage from './pages/Unpack/UnpackPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#084a6d', // Riftbound blue - AppBar, buttons, etc.
    },
    secondary: {
      main: '#e38412', // Golden bell - Buttons
    },

    background: {
      paper: '#034f76', // Body background - Regal blue
      default: '#084a6d', // Paper background
    },

    divider: '#e38412', // Golden bell used as default divider/border color
  },

  // custom breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#e38412',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // base styles shared by all variants
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },

        // contained buttons
        contained: {
          backgroundColor: '#e38412',
          color: '#000', // dark text on gold
          '&:hover': {
            backgroundColor: '#c56a0f', // slightly darker golden bell
          },
          '&:disabled': {
            backgroundColor: 'rgba(227, 132, 18, 0.4)',
            color: 'rgba(0, 0, 0, 0.4)',
          },
        },
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
      <ApplicationBar
        title="Riftbound Sealed"
        tabValue={tabValue}
        onTabChange={handleTabChange}
      />
      <Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/unpack" element={<UnpackPage />} />
          <Route path="/construct" element={<ConstructPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
