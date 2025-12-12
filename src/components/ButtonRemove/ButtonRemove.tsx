import { Button, Typography } from '@mui/material';
import type React from 'react';

import './ButtonRemove.css';

type ButtonRemoveProps = {
  maxHeight?: number;
  onClick?: () => void;
};

const DEFAULT_BUTTON_MAX_HEIGHT = 36;

const ButtonRemove: React.FC<ButtonRemoveProps> = ({
  maxHeight = DEFAULT_BUTTON_MAX_HEIGHT,
  onClick,
}) => {
  // Event handler
  const handleClick = () => {
    onClick?.();
  };

  return (
    <Button
      size="small"
      color="error"
      variant="text"
      className="button-remove--button"
      onClick={handleClick}
      style={{ maxHeight: `${maxHeight}px` }}
    >
      <Typography variant="h3" className="button-remove--text">
        -
      </Typography>
    </Button>
  );
};

export default ButtonRemove;
