import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "../../Style/ReservationStyle/MCFR.css";
import { Reservation } from "./MyReservation";
import axios from "axios";

interface MCFRProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
  availableFacilities: { name: string; id: string }[]; // Update this line
  onReservationUpdate: (updatedReservation: Reservation) => void;
}

const MCFR: React.FC<MCFRProps> = ({
  isOpen,
  onClose,
  reservation,
  availableFacilities,
  onReservationUpdate,
}) => {
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    if (reservation) {
      console.log(reservation);

      setSelectedFacility(reservation.location);
      setSelectedDate(reservation.date);

      // Since the time is already in 12-hour format with AM/PM, we don't need to format it.
      const initialTimeSlot = `${reservation.startTime} - ${reservation.endTime}`;
      setSelectedTimeSlot(initialTimeSlot);
    }
  }, [reservation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reservation || reservation.id === undefined) {
      console.error("Cannot update reservation without an id.");
      return;
    }

    const [startTime, endTime] = selectedTimeSlot.split(" - ");
    console.log(selectedFacility, selectedDate, startTime, endTime);

    const patchedData = {
      notes: `${user.username} - ${selectedFacility} at ${selectedTimeSlot}`,
      availablity: `${selectedDate}T${selectedTimeSlot}`,
    };

    const updatedReservation: Reservation = {
      id: reservation.id,
      location: selectedFacility,
      date: selectedDate,
      startTime: startTime,
      endTime: endTime,
      name: undefined,
    };

    // Perform PATCH request
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/reservations/${reservation.id}`,
        patchedData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      console.log("Update successful", response.data);
      onClose();
      if (onReservationUpdate) {
        onReservationUpdate(updatedReservation);
      }
    } catch (error) {
      console.error("Failed to update reservation", error);
    }
    onClose();
  };
  function formatTimeSlot(hour: number): string {
    let period = "AM";
    let formattedHour = hour;

    if (hour === 0 || hour === 12) {
      formattedHour = 12; // midnight or noon
      period = hour === 0 ? "AM" : "PM";
    } else if (hour > 12) {
      formattedHour = hour - 12;
      period = "PM";
    }

    return `${formattedHour}:00 ${period}`;
  }
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
        <form className="modal-content" onSubmit={handleSubmit}>
          <label htmlFor="facility">Facility:</label>
          <select
            id="facility"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            required
          >
            {availableFacilities.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
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

          <label htmlFor="time">Time Slot:</label>
          <select
            id="time"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            required
          >
            {Array.from({ length: 12 }, (_, index) => {
              const startHour = 8 + index; // Starting from 8AM
              const endHour = startHour + 1;

              // Here we format the hours to create the dropdown options.
              const startTimeSlot = formatTimeSlot(startHour);
              const endTimeSlot = formatTimeSlot(endHour);
              const timeSlotValue = `${startTimeSlot} - ${endTimeSlot}`;

              return (
                <option key={timeSlotValue} value={timeSlotValue}>
                  {timeSlotValue}
                </option>
              );
            })}
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
