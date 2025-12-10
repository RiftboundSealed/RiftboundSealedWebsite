import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Container,
  type ContainerProps,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router';

interface AppBarProps {
  title: string;
  tabValue: number;
  onTabChange: (_event: React.SyntheticEvent, newValue: number) => void;
  maxWidth?: ContainerProps['maxWidth'];
}

const ApplicationBar: React.FC<AppBarProps> = ({
  title,
  tabValue,
  onTabChange,
  maxWidth = 'xl',
}) => {
  return (
    <AppBar position="static">
      <Container maxWidth={maxWidth} disableGutters>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ mr: 4 }}>
            {title}
          </Typography>
          <Tabs
            value={tabValue}
            onChange={onTabChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Home" component={RouterLink} to="/" />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ApplicationBar;
