import React from "react";
import "../../Style/AuthenticationStyle/LogOutStyle.css";

interface LogoutConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <h2>Logout Confirmation</h2>
        <p>Are you sure you want to log out?</p>
        <div className="logout-modal-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
