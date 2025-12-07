import { Button, Typography } from '@mui/material';
import type React from 'react';

import './RemoveButton.css';

type RemoveButtonProps = {
  maxHeight?: number;
  onRemoveFromDeckClick?: () => void;
};

const RemoveButton: React.FC<RemoveButtonProps> = ({
  maxHeight = 36,
  onRemoveFromDeckClick,
}) => {
  return (
    <Button
      size="small"
      color="error"
      variant="text"
      className="remove-button--button"
      onClick={onRemoveFromDeckClick}
      style={{ maxHeight: `${maxHeight}px` }}
    >
      <Typography variant="h3" className="remove-button--text">
        -
      </Typography>
    </Button>
  );
};

export default RemoveButton;
