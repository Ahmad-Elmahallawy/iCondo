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
  // Split the reservation time into start and end times
  const initialStartTime = reservation?.time.split(" - ")[0] || "";
  const initialEndTime = reservation?.time.split(" - ")[1] || "";

  const [selectedFacility, setSelectedFacility] = useState(
    reservation?.location || ""
  );
  const [selectedDate, setSelectedDate] = useState(reservation?.date || "");
  const [selectedStartTime, setSelectedStartTime] = useState(initialStartTime);
  const [selectedEndTime, setSelectedEndTime] = useState(initialEndTime);

  // Update state when the modal opens or when `reservation` changes
  useEffect(() => {
    if (reservation) {
      setSelectedFacility(reservation.location);
      setSelectedDate(reservation.date);
      setSelectedStartTime(reservation.time.split(" - ")[0]);
      setSelectedEndTime(reservation.time.split(" - ")[1]);
    }
  }, [reservation]);
  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Construct the time range back into a single string
    const timeRange = `${selectedStartTime} - ${selectedEndTime}`;
    console.log({
      facility: selectedFacility,
      date: selectedDate,
      time: timeRange,
    });
    // Handle updating the reservation here...
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div
      className="modal-overlay"
      style={{ display: isOpen ? "flex" : "none" }}
    >
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

          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={selectedStartTime}
            onChange={(e) => setSelectedStartTime(e.target.value)}
            required
          />

          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            value={selectedEndTime}
            onChange={(e) => setSelectedEndTime(e.target.value)}
            required
          />

          <div className="modal-actions">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MCFR;
