import { Button, Typography } from '@mui/material';
import type React from 'react';

import './ButtonRemove.css';

type ButtonRemoveProps = {
  maxHeight?: number;
  onRemoveFromDeckClick?: () => void;
};

const ButtonRemove: React.FC<ButtonRemoveProps> = ({
  maxHeight = 36,
  onRemoveFromDeckClick,
}) => {
  return (
    <Button
      size="small"
      color="error"
      variant="text"
      className="button-remove--button"
      onClick={onRemoveFromDeckClick}
      style={{ maxHeight: `${maxHeight}px` }}
    >
      <Typography variant="h3" className="button-remove--text">
        -
      </Typography>
    </Button>
  );
};

export default ButtonRemove;
