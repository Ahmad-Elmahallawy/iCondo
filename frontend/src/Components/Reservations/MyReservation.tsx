import React from "react";
import "../../Style/ReservationStyle/MyReservation.css";
import ReservationModal from "./ReservationModal";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FiEdit, FiX } from "react-icons/fi"; // FiEdit is the edit icon from Feather icons, which is included in react-icons

interface Reservation {
  id: number;
  location: string;
  date: string;
  time: string;
}

const MyReservations: React.FC = () => {
  // Sample data for reservations
  const reservations: Reservation[] = [
    {
      id: 1,
      location: "Sky Lounge",
      date: "April 24, 2024",
      time: "20:00-21:00",
    },
    {
      id: 2,
      location: "Sky Fitness",
      date: "April 4, 2024",
      time: "10:00-11:00",
    },
    {
      id: 3,
      location: "Sky Lounge",
      date: "April 26, 2024",
      time: "20:00-21:00",
    },
  ];

  // You would replace these handlers with actual functionality
  const handleEdit = (id: number) => {
    console.log("Edit reservation with id:", id);
  };

  const handleCancel = (id: number) => {
    console.log("Cancel reservation with id:", id);
  };

  return (
    <div className="reservations-wrapper">
      <h1>My Reservations</h1>
      <div className="my-reservations">
        <div className="reservations-list">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="reservation">
              <p>
                Reservation booked for {reservation.location} on{" "}
                {reservation.date} at {reservation.time}
              </p>
              <div className="actions">
                {/* These buttons now use icon placeholders */}
                <button
                  className="edit"
                  onClick={() => handleEdit(reservation.id)}
                >
                  <FiEdit />
                </button>

                <button
                  className="cancel"
                  onClick={() => handleCancel(reservation.id)}
                >
                  <FiX />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReservations;
