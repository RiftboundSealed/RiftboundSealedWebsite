// DEPRECATE: This file is only for demonstration purposes and should be removed once real data and components are in place.
import { Card, CardContent, Typography, Chip } from '@mui/material';
import React from 'react';

import type { Card as CardType } from '../types';

interface CardItemProps {
  card: CardType;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 1 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {card.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {card.type}
        </Typography>
        <Chip label={card.rarity} size="small" color="primary" sx={{ mr: 1 }} />
        {card.manaCost && (
          <Chip label={card.manaCost} size="small" variant="outlined" />
        )}
      </CardContent>
    </Card>
  );
};

export default CardItem;
