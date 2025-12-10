import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import './DialogError.css';

interface DialogErrorProps {
  value: string;
  open: boolean;
  title?: string;
  onClose: () => void;
}

const DialogError: React.FC<DialogErrorProps> = ({
  value,
  open,
  title = 'Error',
  onClose,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="dialog-error-title"
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: { className: 'dialog-error__paper' },
        }}
      >
        <DialogTitle id="dialog-error-title">{title}</DialogTitle>
        <DialogContent dividers>
          <TextField
            className="dialog-error__textbox"
            value={value}
            aria-label="Error text"
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
      </Dialog>
    </>
  );
};

export default DialogError;
