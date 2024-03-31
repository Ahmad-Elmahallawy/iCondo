import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface EventCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (eventData: { title: string; date: string }) => void;
  defaultDate: string;
}

const ReservationModal: React.FC<EventCreationDialogProps> = ({ open, onClose, onSubmit, defaultDate }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    onSubmit({ title, date: defaultDate });
    setTitle('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Event Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Event</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReservationModal;
