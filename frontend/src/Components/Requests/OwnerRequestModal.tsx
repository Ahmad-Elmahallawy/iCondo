// OwnerRequestModal.tsx

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import "../../Style/RequestsStyle/OwnerRequestModalStyle.css";
import { StyledEngineProvider } from "@mui/material/styles";
import SelectSubjectRequest from "./SelectSubjectRequest";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
interface OwnerRequestModalProps {
  open: boolean;
  onClose: () => void;
}

const OwnerRequestModal: React.FC<OwnerRequestModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <Dialog
        className="owner-request-modal-container"
        open={open}
        onClose={onClose}
      >
        <DialogTitle className="owner-request-modal-title">
          New Request
        </DialogTitle>
        <DialogContent>
          <p>Subject:</p>
          <SelectSubjectRequest />
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button onClick={onClose} className="owner-request-modal-btn">
            Submit
          </Button>
          <IconButton
            onClick={onClose}
            className="owner-request-modal-btn"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </StyledEngineProvider>
  );
};

export default OwnerRequestModal;
