import React from "react";
import { FiX } from "react-icons/fi";
import "./ReservationEditModal.css"; // This file should contain the styles for your modal
import ReservationModal from "./ReservationModal"; // Importing a modal component, possibly used for creating/editing reservations
import { Reservation } from "./MyReservation";

interface ReservationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null; // Assuming Reservation is the same interface as before
}

const ReservationEditModal: React.FC<ReservationEditModalProps> = ({
  isOpen,
  onClose,
  reservation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Modify Common Facility Reservation</h2>
          <button onClick={onClose} className="close-button">
            <FiX />
          </button>
        </div>
        <div className="modal-content">
          <label htmlFor="facility">Facility:</label>
          <select id="facility" defaultValue={reservation?.location}>
            {/* Option elements here */}
          </select>

          <label htmlFor="date">Date:</label>
          <input type="date" id="date" defaultValue={reservation?.date} />

          <label htmlFor="time">Time:</label>
          <select id="time" defaultValue={reservation?.time}>
            {/* Option elements here */}
          </select>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationEditModal;
