import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import React from 'react';

import './RadioGroupSet.css';
import type { SetDto } from '@/types/set';

interface RadioGroupSetProps {
  sets: SetDto[];
  value: string | null; // currently selected set id
  onChange?: (setId: string) => void; // notify parent
}

const RadioGroupSet: React.FC<RadioGroupSetProps> = ({
  sets,
  value,
  onChange,
}) => {
  // Event Handler
  const handleChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    newValue: string,
  ) => {
    onChange?.(newValue);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        name="set-selection"
        value={value ?? ''}
        onChange={handleChange}
        className="radio-group-set"
      >
        {sets.map((set) => {
          const isSelected = value === set.id;
          return (
            <FormControlLabel
              key={set.id}
              value={set.id}
              className={`set-option-root ${
                isSelected ? 'set-option-root--selected' : ''
              }`}
              control={<Radio className="set-option-radio" />}
              labelPlacement="top"
              label={
                <Box className="set-option-card">
                  <Box className="set-option-card__image-wrapper">
                    <Box
                      component="img"
                      width={360}
                      height={180}
                      src={set.setImageUrl}
                      alt={set.name}
                      className="set-option-card__image"
                    />
                  </Box>
                  <Box className="set-option-card__label">
                    <Typography
                      component="span"
                      variant="h5"
                      className="set-option-card__label-text"
                    >
                      {set.name}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupSet;
