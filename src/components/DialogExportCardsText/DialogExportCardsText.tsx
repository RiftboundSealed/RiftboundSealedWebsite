import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useMemo, useState } from 'react';

import './DialogExportCardsText.css';

type CardData = {
  id: string;
  name: string;
};

interface DialogExportCardsTextProps {
  cardsMainDeck: CardData[];
  cardsSideboard?: CardData[];
  open: boolean;
  title?: string;
  onClose: () => void;
}

const DialogExportCardsText: React.FC<DialogExportCardsTextProps> = ({
  cardsMainDeck,
  cardsSideboard = [],
  open,
  title = 'Export Cards as Text',
  onClose,
}) => {
  // State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );
  const [snackbarMessage, setSnackbarMessage] = useState('Copied!');

  // Locals
  // Build the export text:
  // - de-duplicate by id
  // - sort by id
  // - format "count name" per line
  const exportText = useMemo(() => {
    const sortedList = (cards: CardData[]) => {
      // Map of id -> { name, count }
      const byId = new Map<string, { name: string; count: number }>();

      for (const { id, name } of cards) {
        const existing = byId.get(id);
        if (existing) {
          existing.count += 1;
        } else {
          byId.set(id, { name, count: 1 });
        }
      }
      const sortedEntries = Array.from(byId.entries()).sort(([idA], [idB]) =>
        idA.localeCompare(idB, undefined, { numeric: true }),
      );

      return sortedEntries
        .map(([, { name, count }]) => `${count} ${name}`)
        .join('\n');
    };

    return `${sortedList(cardsMainDeck)}${
      cardsSideboard.length > 0
        ? `\n\nSideboard:\n${sortedList(cardsSideboard)}`
        : ''
    }`;
  }, [cardsMainDeck, cardsSideboard]);

  // Event Handlers
  const onClickCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setSnackbarSeverity('success');
      setSnackbarMessage('Copied card list to clipboard');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to copy export text:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to copy. Please copy manually.');
      setSnackbarOpen(true);
    }
  };
  const onCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="dialog-export-cards-title"
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: { className: 'dialog-export-cards__paper' },
        }}
      >
        <DialogTitle id="dialog-export-cards-title">{title}</DialogTitle>

        <DialogContent dividers>
          <TextField
            className="dialog-export-cards__textbox"
            value={exportText}
            aria-label="Exported card list"
            multiline
            minRows={10}
            maxRows={16}
            fullWidth
            variant="outlined"
            slotProps={{
              htmlInput: { readOnly: true },
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
          <Button onClick={onClickCopy} variant="contained">
            Copy
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for copy feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={onCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={onCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DialogExportCardsText;
