// DEPRECATE: This file is only for demonstration purposes and should be removed once real data and components are in place.
import { Button, Typography, Box } from '@mui/material';
import React from 'react';

import {
  increment,
  decrement,
  selectValue,
} from '../redux/example/exampleSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Counter: React.FC = () => {
  const count = useAppSelector(selectValue);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
      <Button variant="contained" onClick={() => dispatch(decrement())}>
        -
      </Button>
      <Typography variant="h4">{count}</Typography>
      <Button variant="contained" onClick={() => dispatch(increment())}>
        +
      </Button>
    </Box>
  );
};

export default Counter;
