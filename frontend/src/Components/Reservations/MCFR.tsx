import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "../../Style/ReservationStyle/MCFR.css"; // This file should contain the styles for your modal
import { Reservation } from "./MyReservation";

interface MCFRProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
  availableFacilities: string[]; // Assuming you pass this as a prop
}

const MCFR: React.FC<MCFRProps> = ({
  isOpen,
  onClose,
  reservation,
  availableFacilities,
}) => {
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Update state when the modal opens or when `reservation` changes
  useEffect(() => {
    if (reservation && isOpen) {
      // This condition won't violate the rules of hooks
      setSelectedFacility(reservation.location);
      setSelectedDate(reservation.date);
      setSelectedTime(reservation.time);
    }
  }, [reservation, isOpen]); // Including isOpen in the dependency array

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You'd handle updating the reservation here
    console.log({
      facility: selectedFacility,
      date: selectedDate,
      time: selectedTime,
    });
    onClose(); // Close the modal
  };

  if (!isOpen || !reservation) return null;
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

          <label htmlFor="time">Time:</label>
          <select
            id="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          >
            {/* Populate with options */}
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
