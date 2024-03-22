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
  onSubmit: (subject: string) => void; // Define onSubmit prop
}

const OwnerRequestModal: React.FC<OwnerRequestModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [selectedSubject, setSelectedSubject] = React.useState<string>("");

  const handleSubmit = () => {
    onSubmit(selectedSubject); // Call the onSubmit prop with the selected subject
  };

  return (
    <StyledEngineProvider injectFirst>
      <Dialog
        data-testid="new-request-modal"
        className="owner-request-modal-container"
        open={open}
        onClose={onClose}
      >
        <DialogTitle className="owner-request-modal-title">
          New Request
        </DialogTitle>
        <DialogContent>
          <p>Subject:</p>
          <SelectSubjectRequest
            onSelect={(subject: string) => setSelectedSubject(subject)} // Update selected subject
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button onClick={handleSubmit} className="owner-request-modal-btn">
            Submit
          </Button>
          <IconButton
            onClick={onClose}
            className="owner-request-modal-btn"
            aria-label="delete"
            data-testid="close-modal-button"
          >
            <DeleteIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </StyledEngineProvider>
  );
};

export default OwnerRequestModal;
