import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi"; // Icon for closing the modal
import "../../Style/ReservationStyle/MCFR.css"; // Stylesheet specific to the Modify Common Facility Reservation (MCFR) modal
import { Reservation } from "./MyReservation"; // Type definitions for the reservation data

// TypeScript interface for props expected by the MCFR component
interface MCFRProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
  availableFacilities: string[];
  onReservationUpdate: (updatedReservation: Reservation) => void; // Add this line
}

// The MCFR functional component
const MCFR: React.FC<MCFRProps> = ({
  isOpen,
  onClose,
  reservation,
  availableFacilities,
  onReservationUpdate, // This prop is used to update the reservation list
}) => {
  // State hooks for form fields
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  // Effect hook to update form fields when the modal opens or the reservation changes
  useEffect(() => {
    if (reservation) {
      // Pre-fill the form with the current reservation data
      setSelectedFacility(reservation.location);
      setSelectedDate(reservation.date);
      setSelectedStartTime(reservation.startTime);
      setSelectedEndTime(reservation.endTime);
    }
  }, [reservation]);

  // Event handler for form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reservation || reservation.id === undefined) {
      // Safety check to ensure we have all the data needed for an update
      console.error("Cannot update reservation without an id.");
      return;
    }

    // Constructs the updated reservation object from form field states
    const updatedReservation: Reservation = {
      id: reservation.id,
      location: selectedFacility,
      date: selectedDate,
      startTime: `${selectedStartTime}`,
      endTime: `${selectedEndTime}`,
    };
    // Passes the updated reservation back to parent
    onReservationUpdate(updatedReservation);
    // Closes the modal
    onClose();
  };

  // Conditional rendering based on `isOpen` state
  if (!isOpen) return null; // If not open, do not render anything

  // Render the modal content
  return (
    <div
      className="modal-overlay"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="modal">
        <div className="modal-header">
          <h2>Modify Common Facility Reservation</h2>
          <button onClick={onClose} className="close-button">
            <FiX /> {/* Icon for closing the modal */}
          </button>
        </div>
        <form className="modal-content" onSubmit={handleSubmit}>
          {/* Form fields for reservation data */}
          <label htmlFor="facility">Facility:</label>
          <select
            id="facility"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            required
          >
            {availableFacilities.map((facility) => (
              <option key={facility} value={facility}>
                {facility}
              </option>
            ))}
          </select>

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />

          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={selectedStartTime}
            onChange={(e) => setSelectedStartTime(e.target.value)}
            className="custom-time-input"
            required
          />

          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={selectedEndTime}
            onChange={(e) => setSelectedEndTime(e.target.value)}
            className="custom-time-input"
            required
          />

          {/* Modal action buttons */}
          <div className="modal-actions">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export the MCFR component to be used in other parts of the application
export default MCFR;
