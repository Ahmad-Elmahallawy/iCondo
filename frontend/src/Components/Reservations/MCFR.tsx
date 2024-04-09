import React from "react";
import { FiX } from "react-icons/fi";
import "../../Style/ReservationStyle/MCFR.css"; // This file should contain the styles for your modal
import { Reservation } from "./MyReservation";

interface MCFRProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
}

const MCFR: React.FC<MCFRProps> = ({ isOpen, onClose, reservation }) => {
  if (!isOpen || !reservation) return null;

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would handle the reservation data update
    // This would typically involve setting state or making an API call
    console.log("Form submitted for reservation:", reservation.id);
    // Close the modal after submit
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Modify Common Facility Reservation</h2>
          <button onClick={onClose} className="close-button">
            <FiX />
          </button>
        </div>
        <form className="modal-content" onSubmit={handleSubmit}>
          <label htmlFor="facility">Facility:</label>
          <select id="facility" defaultValue={reservation.location} required>
            {/* Add options here */}
          </select>

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            defaultValue={reservation.date}
            required
          />

          <label htmlFor="time">Time:</label>
          <select id="time" defaultValue={reservation.time} required>
            {/* Add options here */}
          </select>

          <div className="modal-actions">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MCFR;
