// OwnerRequestModal.tsx

import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

interface OwnerRequestModalProps {
  open: boolean;
  onClose: () => void;
}

const OwnerRequestModal: React.FC<OwnerRequestModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Logout Confirmation</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to log out?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Log Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OwnerRequestModal;
